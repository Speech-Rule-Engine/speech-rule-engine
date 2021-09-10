//
// Copyright 2013 Google Inc.
// Copyright 2014-21 Volker Sorge
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Implementation of the speech rule engine.
 *
 * The speech rule engine chooses and applies speech rules. Rules are chosen
 * from a set of rule stores wrt. their applicability to a node in a particular
 * markup type such as MathML or HTML. Rules are dispatched either by
 * recursively computing new nodes and applicable rules or, if no further rule
 * is applicable to a current node, by computing a speech object in the form of
 * an array of auditory descriptions.
 *
 * Consequently the rule engine is parameterizable wrt. rule stores and
 * evaluator function.
 * @author sorge@google.com (Volker Sorge)
 */

import {AuditoryDescription} from '../audio/auditory_description';
import {Span} from '../audio/span';
import {Debugger} from '../common/debugger';
import * as DomUtil from '../common/dom_util';
import {Engine, EngineConst} from '../common/engine';
import XpathUtil from '../common/xpath_util';
import {ClearspeakPreferences} from '../speech_rules/clearspeak_preferences';
import SpeechRules from '../speech_rules/speech_rules';
import * as SpeechRuleStores from '../speech_rules/speech_rule_stores';
import {BaseRuleStore} from './base_rule_store';
import {RulesJson} from './base_rule_store';
import {BrailleStore} from './braille_store';
import {Axis, AxisMap, DynamicCstr} from './dynamic_cstr';
import {Grammar, State as GrammarState} from './grammar';
import {MathStore} from './math_store';
import {ActionType, SpeechRule} from './speech_rule';
import {SpeechRuleContext} from './speech_rule_context';

import {Trie} from '../indexing/trie';

export class SpeechRuleEngine {

  // TODO (TS): Keeping this as a singleton for the time being.
  private static instance: SpeechRuleEngine;

  /**
   * Trie for indexing speech rules in this store.
   */
  public trie: Trie = null;

  /**
   * Flag indicating if the engine is ready. Not ready while it is updating!
   */
  private ready_: boolean = true;

  /**
   * Default evaluators collated by locale and modality.
   */
  private evaluators_:
      {[key: string]: {[key: string]: (p1: Node) => AuditoryDescription[]}} = {};

  /**
   * @return The Engine object.
   */
  public static getInstance(): SpeechRuleEngine {
    SpeechRuleEngine.instance = SpeechRuleEngine.instance || new SpeechRuleEngine();
    return SpeechRuleEngine.instance;
  }


  /**
   * Test the precondition of a speech rule in debugging mode.
   * @param rule A speech rule.
   * @param node DOM node to test applicability of the rule.
   */
  public static debugSpeechRule(rule: SpeechRule, node: Node) {
    let prec = rule.precondition;
    let queryResult = rule.context.applyQuery(node, prec.query);
    Debugger.getInstance().output(
        prec.query, queryResult ? queryResult.toString() : queryResult);
    prec.constraints.forEach(cstr =>
      Debugger.getInstance().output(
        cstr, rule.context.applyConstraint(node, cstr)));
  }


  /**
   * Test the precondition of a speech rule in debugging mode.
   * @param name Rule to debug.
   * @param node DOM node to test applicability of the rule.
   */
  public static debugNamedSpeechRule(name: string, node: Node) {
    let rules = SpeechRuleEngine.getInstance().trie.collectRules();
    let allRules = rules.filter(rule => rule.name == name);
    for (let i = 0, rule; rule = allRules[i]; i++) {
      Debugger.getInstance().output(
        'Rule', name, 'DynamicCstr:', rule.dynamicCstr.toString(), 'number',
        i);
      SpeechRuleEngine.debugSpeechRule(rule, node);
    }
  }


  /**
   * Updates the evaluator method for the document of the given node. This is
   * particular important for XML documents in Firefox that generates a novel
   * object (plus evaluate method) for every document.
   *
   * @param node The target node that is to be evaluated.
   */
  private static updateEvaluator(node: Element) {
    let parent = node as any as Document;
    while (parent && !parent.evaluate) {
      parent = parent.parentNode as Document;
    }
    if (parent.evaluate) {
      XpathUtil.currentDocument = /** @type{Document} */(parent);
    }
  }


  // Dispatch functionality.
  // The timing function is temporary until the MOSS deliverable is done.
  /**
   * Computes a speech object for a given node. Returns the empty list if
   * no node is given.
   * @param node The node to be evaluated.
   * @return A list of auditory descriptions
   *   for that node.
   */
  public evaluateNode(node: Element): AuditoryDescription[] {
    if (Engine.getInstance().mode === EngineConst.Mode.HTTP) {
      SpeechRuleEngine.updateEvaluator(node);
    }
    let timeIn = (new Date()).getTime();
    let result: AuditoryDescription[] = [];
    try {
      result = this.evaluateNode_(node);
    } catch (err) {
      console.error('Something went wrong computing speech.');
      Debugger.getInstance().output(err);
    }
    let timeOut = (new Date()).getTime();
    Debugger.getInstance().output('Time:', timeOut - timeIn);
    return result;
  }


  /**
   * Prints the list of all current rules in ChromeVox to the console.
   * @return A textual representation of all rules in the speech rule
   *     engine.
   */
  public toString(): string {
    let allRules = this.trie.collectRules();
    return allRules.map(rule => rule.toString()).join('\n');
  }


  // TODO (TS): Rewrite engine to use a feature vector and save the settings
  //            this way. Currently we mess about with a lot of casting!
  /**
   * Runs a function in the temporary context of the speech rule engine.
   * @param settings The temporary settings for the speech rule
   *     engine. They can contain the usual features.
   * @param callback The runnable
   *     function that computes speech results.
   * @return The result of the callback.
   */
  public runInSetting(settings: {[feature: string]: string|boolean},
               callback: () => AuditoryDescription[]):
  AuditoryDescription[] {
    let engine = Engine.getInstance() as any;
    let save: {[feature: string]: string|boolean} = {};
    for (let key in settings) {
      save[key] = engine[key];
      engine[key] = settings[key];
    }
    engine.setDynamicCstr();
    let result = callback();
    for (let key in save) {
      engine[key] = save[key];
    }
    engine.setDynamicCstr();
    return result;
  }


  /**
   * Adds a speech rule store to the speech rule engine. This method is called
   * when loading a rule set.
   * @param set The definition of a speech rule set.
   */
  public addStore(set: RulesJson) {
    // This line is important to setup the context functions for stores.
    // It has to run __before__ the first speech rule store is added.
    let store = StoreFactory.get(set);
    if (store.kind !== 'abstract') {
      store.getSpeechRules().forEach(x => this.trie.addRule(x));
    }
    this.addEvaluator(store);
  }


  /**
   * Processes the grammar annotations of a rule.
   * @param context The function context in which to
   *     evaluate the grammar expression.
   * @param node The node to which the rule is applied.
   * @param grammar The grammar annotations.
   */
  public processGrammar(
      context: SpeechRuleContext, node: Node, grammar: GrammarState) {
    let assignment: GrammarState = {};
    for (let key in grammar) {
      let value = grammar[key];
      assignment[key] = typeof value === 'string' ?
          // TODO (TS): This could be a span!
          context.constructString(node, value) as string :
          value;
    }
    Grammar.getInstance().pushState(assignment);
  }


  /**
   * Adds an evaluation method by locale and modality.
   * @param store The store whose evaluation method is
   *     added.
   */
  public addEvaluator(store: BaseRuleStore) {
    let fun = store.evaluateDefault.bind(store);
    let loc = this.evaluators_[store.locale];
    if (loc) {
      loc[store.modality] = fun;
      return;
    }
    let mod: {[key: string]: (p1: Node) => AuditoryDescription[]} = {};
    mod[store.modality] = fun;
    this.evaluators_[store.locale] = mod;
  }


  /**
   * Selects a default evaluation method by locale and modality. If none exists
   * it takes the default evaluation method of the active combined store.
   * @param locale The locale.
   * @param modality The modality.
   * @return The evaluation
   *     method.
   */
  public getEvaluator(locale: string, modality: string):
      (p1: Node) => AuditoryDescription[] {
    let loc = this.evaluators_[locale] ||
      this.evaluators_[DynamicCstr.DEFAULT_VALUES[Axis.LOCALE]];
    return loc[modality] || loc[DynamicCstr.DEFAULT_VALUES[Axis.MODALITY]];
  }


  /**
   * Collates information on dynamic constraint values of the current state of
   * the trie of the engine.
   * 
   * @param opt_info Initial dynamic constraint information.
   * @return The collated information.
   */
  public enumerate(opt_info?: Object): Object {
    return this.trie.enumerate(opt_info);
  }

  private constructor() {
    /**
     * Initialised the trie.
     */
    this.trie = new Trie();
    Engine.registerTest(() => this.ready_);
  }


  /**
   * Computes a speech object for a given node. Returns the empty list if
   * no node is given.
   * @param node The node to be evaluated.
   * @return A list of auditory descriptions
   *   for that node.
   */
  private evaluateNode_(node: Element): AuditoryDescription[] {
    if (!node) {
      return [];
    }
    // Update the preferences of the dynamic constraint.
    this.updateConstraint_();
    return this.evaluateTree_(node);
  }


  /**
   * Applies rules recursively to compute the final speech object.
   * @param node Node to apply the speech rule to.
   * @return A list of Auditory descriptions.
   */
  private evaluateTree_(node: Element): AuditoryDescription[] {
    let engine = Engine.getInstance();
    let result: AuditoryDescription[];
    Debugger.getInstance().output(
        engine.mode !== EngineConst.Mode.HTTP ? node.toString() : node);
    Grammar.getInstance().setAttribute(node);
    let rule = this.lookupRule(node, engine.dynamicCstr);
    if (!rule) {
      if (engine.strict) {
        return [];
      }
      result = this.getEvaluator(engine.locale, engine.modality)(node);
      if (node.attributes) {
        this.addPersonality_(result, {}, false, node);
      }
      return result;
    }
    Debugger.getInstance().generateOutput(() => [
        'Apply Rule:', rule.name, rule.dynamicCstr.toString(),
        (engine.mode !== EngineConst.Mode.HTTP ? node : node).toString()
    ]);
    let context = rule.context;
    let components = rule.action.components;
    result = [];
    for (let i = 0, component; component = components[i]; i++) {
      let descrs: AuditoryDescription[] = [];
      let content = component.content || '';
      let attributes = component.attributes || {};
      let multi = false;
      if (component.grammar) {
        this.processGrammar(context, node, component.grammar);
      }
      let saveEngine = null;
      // Retooling the engine
      if (attributes.engine) {
        saveEngine = Engine.getInstance().dynamicCstr.getComponents();
        let features = Grammar.parseInput(attributes.engine);
        Engine.getInstance().setDynamicCstr(features as AxisMap);
      }
      switch (component.type) {
        case ActionType.NODE:
          let selected = context.applyQuery(node, content) as Element;
          if (selected) {
            descrs = this.evaluateTree_(selected);
          }
          break;
        case ActionType.MULTI:
          multi = true;
          let selects = context.applySelector(node, content) as Element[];
          if (selects.length > 0) {
            descrs = this.evaluateNodeList_(
                context, selects, attributes['sepFunc'],
                // TODO (span): Sort out those types better.
                (context.constructString(node, attributes['separator']) as
                 string),
                attributes['ctxtFunc'],
                (context.constructString(node, attributes['context']) as
                 string));
          }
          break;
        case ActionType.TEXT:
          // TODO (span): We need the span concept here as a parameter with
          // xpath.
          let xpath = attributes['span'];
          let attrs: {[key: string]: string} = {};
          if (xpath) {
            let nodes = XpathUtil.evalXPath(xpath, node);
            // TODO: Those could be multiple nodes!
            //       We need the right xpath expression and combine their
            //       attributes.
            // Generalise the following:
            if (nodes.length) {
              attrs.extid = (nodes[0] as Element).getAttribute('extid');
            }
          }
          let str = context.constructString(node, content) as string|Span[];
          if (str) {
            if (Array.isArray(str)) {
              descrs = str.map(function(span) {
                return AuditoryDescription.create(
                    {text: span.speech, attributes: span.attributes},
                    {adjust: true});
              });
            } else {
              descrs = [AuditoryDescription.create(
                  {text: str, attributes: attrs}, {adjust: true})];
            }
          }
          break;
        case ActionType.PERSONALITY:
        default:
          descrs = [AuditoryDescription.create({text: content})];
      }
      // Adding overall context and annotation if they exist.
      if (descrs[0] && !multi) {
        if (attributes['context']) {
          descrs[0]['context'] =
              context.constructString(node, attributes['context']) +
              (descrs[0]['context'] || '');
        }
        if (attributes['annotation']) {
          descrs[0]['annotation'] = attributes['annotation'];
        }
      }
      this.addLayout(descrs, attributes, multi);
      if (component.grammar) {
        Grammar.getInstance().popState();
      }
      // Adding personality to the auditory descriptions.
      result =
          result.concat(this.addPersonality_(descrs, attributes, multi, node));
      if (saveEngine) {
        Engine.getInstance().setDynamicCstr(saveEngine);
      }
    }
    return result;
  }


  /**
   * Evaluates a list of nodes into a list of auditory descriptions.
   * @param context The function context in which to
   *     evaluate the nodes.
   * @param nodes Array of nodes.
   * @param sepFunc Name of a function used to compute a separator
   *     between every element.
   * @param sepStr A string that is used as argument to the sepFunc or
   *     interspersed directly between each node if sepFunc is not supplied.
   * @param ctxtFunc Name of a function applied to compute the context
   *     for every element in the list.
   * @param ctxtStr Additional context string that is given to the
   *     ctxtFunc function or used directly if ctxtFunc is not supplied.
   * @return A list of Auditory descriptions.
   */
  private evaluateNodeList_(
      context: SpeechRuleContext, nodes: Element[], sepFunc: string,
      sepStr: string, ctxtFunc: string,
      ctxtStr: string): AuditoryDescription[] {
    if (nodes === []) {
      return [];
    }
    let sep = sepStr || '';
    let cont = ctxtStr || '';
    let cFunc = context.contextFunctions.lookup(ctxtFunc);
    let ctxtClosure = cFunc ? cFunc(nodes, cont) : function() {
      return cont;
    };
    let sFunc = context.contextFunctions.lookup(sepFunc);
    let sepClosure = sFunc ? sFunc(nodes, sep) : function() {
      return [AuditoryDescription.create({text: sep}, {translate: true})];
    };
    let result: AuditoryDescription[] = [];
    for (let i = 0, node; node = nodes[i]; i++) {
      let descrs = this.evaluateTree_(node);
      if (descrs.length > 0) {
        descrs[0]['context'] = ctxtClosure() + (descrs[0]['context'] || '');
        result = result.concat(descrs);
        if (i < nodes.length - 1) {
          let text = sepClosure() as AuditoryDescription[];
          result = result.concat(text);
        }
      }
    }
    return result;
  }


  /**
   * Adds layout annotations to the auditory descriptions
   * @param descrs The auditory descriptions.
   * @param props The properties.
   * @param _multi Is is a multi node component. Currently ignored.
   */
  private addLayout(
    descrs: AuditoryDescription[], props: {[key: string]: string},
    _multi: boolean) {
    let layout = props.layout;
    if (!layout) {
      return;
    }
    if (layout.match(/^begin/)) {
      descrs.unshift(new AuditoryDescription({text: '', layout: layout}));
      return;
    }
    if (layout.match(/^end/)) {
      descrs.push(new AuditoryDescription({text: '', layout: layout}));
      return;
    }
    descrs.unshift(new AuditoryDescription(
      {text: '', layout: `begin${layout}`}));
    descrs.push(new AuditoryDescription({text: '', layout: `end${layout}`}));
  }


  /**
   * Adds personality to every Auditory Descriptions in input list.
   * @param descrs A list of Auditory
   *     descriptions.
   * @param props Property dictionary.
   * @param multi Multinode flag.
   * @param node The original XML node.
   * @return The modified array.
   */
  private addPersonality_(
    descrs: AuditoryDescription[], props: {[key: string]: string},
    multi: boolean, node: Node): AuditoryDescription[] {
    let personality: {[key: string]: string|number} = {};
    let pause = null;
    for (let key of EngineConst.personalityPropList) {
      let value = props[key];
      if (typeof value === 'undefined') {
        continue;
      }
      let numeral = parseFloat(value);
      // if (!isNaN(numeral)) {
      //   personality[sre.Engine.personalityProps[key]] = numeral;
      // }
      let realValue = isNaN(numeral) ?
          value.charAt(0) === '"' ? value.slice(1, -1) : value :
          numeral;
      if (key === EngineConst.personalityProps.PAUSE) {
        pause = realValue;
      } else {
        personality[key] = realValue;
      }
    }
    // TODO: Deal with non-numeric values for personalities here.
    //       Possibly use simply an overwrite mechanism without adding.
    for (let i = 0, descr; descr = descrs[i]; i++) {
      this.addRelativePersonality_(descr, personality as {[key: string]: string});
      this.addExternalAttributes_(descr, node as Element);
    }
    // Removes the last joiner in a multi node element.
    if (multi && descrs.length) {
      delete descrs[descrs.length - 1]
          .personality[EngineConst.personalityProps.JOIN];
    }
    // Adds pause if there was one.
    if (pause && descrs.length) {
      let last = descrs[descrs.length - 1];
      if (last.text || Object.keys(last.personality).length) {
        descrs.push(AuditoryDescription.create(
            {text: '', personality: {pause: pause as string}}));
      } else {
        last.personality[EngineConst.personalityProps.PAUSE] = pause as string;
      }
    }
    return descrs;
  }


  /**
   * Adds external attributes if some are in the node
   * @param descr An Auditory descriptions.
   * @param node The XML node.
   */
  private addExternalAttributes_(descr: AuditoryDescription, node: Element) {
    if (node.hasAttributes()) {
      let attrs = node.attributes;
      for (let i = attrs.length - 1; i >= 0; i--) {
        let key = attrs[i].name;
        if (!descr.attributes[key] && key.match(/^ext/)) {
          descr.attributes[key] = attrs[i].value;
        }
      }
    }
  }


  /**
   * Adds relative personality entries to the personality of a Auditory
   * Description.
   * @param descr Auditory Description.
   * @param personality Dictionary with relative personality entries.
   * @return Updated description.
   */
  private addRelativePersonality_(
      descr: AuditoryDescription, personality: {[key: string]: string}): AuditoryDescription {
    if (!descr['personality']) {
      descr['personality'] = personality;
      return descr;
    }
    let descrPersonality = descr['personality'];
    for (let p in personality) {
      // This could be capped by some upper and lower bound.
      if (descrPersonality[p] && typeof descrPersonality[p] == 'number' &&
          typeof personality[p] == 'number') {
        descrPersonality[p] = descrPersonality[p] + personality[p];
      } else if (!descrPersonality[p]) {
        descrPersonality[p] = personality[p];
      }
    }
    return descr;
  }


  /**
   * Enriches the dynamic constraint with default properties.
   */
  // TODO: Exceptions and ordering between locale and modality?
  //       E.g, missing clearspeak defaults to mathspeak.
  //       What if there is no default for a particular locale or modality?
  //       We need a default constraint specification somewhere that defines the
  //       orders.
  //       Try to make this dependent on the order of the dynamicCstr.
  private updateConstraint_() {
    let dynamic = Engine.getInstance().dynamicCstr;
    let strict = Engine.getInstance().strict;
    let trie = this.trie;
    let props: {[key: string]: string[]} = {};
    let locale = dynamic.getValue(Axis.LOCALE);
    let modality = dynamic.getValue(Axis.MODALITY);
    let domain = dynamic.getValue(Axis.DOMAIN);
    if (!trie.hasSubtrie([locale, modality, domain])) {
      domain = DynamicCstr.DEFAULT_VALUES[Axis.DOMAIN];
      if (!trie.hasSubtrie([locale, modality, domain])) {
        modality = DynamicCstr.DEFAULT_VALUES[Axis.MODALITY];
        if (!trie.hasSubtrie([locale, modality, domain])) {
          locale = DynamicCstr.DEFAULT_VALUES[Axis.LOCALE];
        }
      }
    }
    props[Axis.LOCALE] = [locale];
    // Normally modality cannot be mixed. But summary allows fallback to speech
    // if an expression can not be summarised.
    props[Axis.MODALITY] =
        [modality !== 'summary' ?
             modality :
             DynamicCstr.DEFAULT_VALUES[Axis.MODALITY]];
    // For speech we do not want rule leaking across rule sets.
    props[Axis.DOMAIN] =
        [modality !== 'speech' ?
             DynamicCstr.DEFAULT_VALUES[Axis.DOMAIN] :
             domain];
    let order = dynamic.getOrder();
    for (let i = 0, axis; axis = order[i]; i++) {
      if (!props[axis]) {
        let value = dynamic.getValue(axis);
        let valueSet =
            this.makeSet_(value, (dynamic as ClearspeakPreferences).preference);
        let def = DynamicCstr.DEFAULT_VALUES[axis];
        if (!strict && value !== def) {
          valueSet.push(def);
        }
        props[axis] = valueSet;
      }
    }
    dynamic.updateProperties(props);
  }


  /**
   * Splits preference form style names into set of preference settings.
   * @param value The value of the style setting.
   * @param preferences Set of Clearspeak preferences or null.
   * @return The style settings. Either a single element or a
   *      pair associating a Clearspeak preference with a value.
   */
  private makeSet_(value: string, preferences: {[key: string]: string}|null):
      string[] {
    if (!preferences || !Object.keys(preferences).length) {
      return [value];
    }
    return value.split(':');
  }


  /**
   * Retrieves a rule for the given node if one exists.
   * @param node A node.
   * @param dynamic Additional dynamic
   *     constraints. These are matched against properties of a rule.
   * @return The speech rule if an applicable one exists.
   */
  public lookupRule(node: Node, dynamic: DynamicCstr) {
    if (!node ||
        node.nodeType !== DomUtil.NodeType.ELEMENT_NODE &&
            node.nodeType !== DomUtil.NodeType.TEXT_NODE) {
      return null;
    }
    let matchingRules = this.lookupRules(node, dynamic);
    return matchingRules.length > 0 ?
        this.pickMostConstraint_(dynamic, matchingRules) :
        null;
  }


  /**
   * Retrieves a list of applicable rule for the given node.
   * @param node A node.
   * @param dynamic Additional dynamic
   *     constraints. These are matched against properties of a rule.
   * @return All applicable speech rules.
   */
  public lookupRules(node: Node, dynamic: DynamicCstr): SpeechRule[] {
    return this.trie.lookupRules(node, dynamic.allProperties());
  }

  
  /**
   * Picks the result of the most constraint rule by prefering those:
   * 1) that best match the dynamic constraints.
   * 2) with the most additional constraints.
   * @param dynamic Dynamic constraints.
   * @param rules An array of rules.
   * @return The most constraint rule.
   */
  private pickMostConstraint_(_dynamic: DynamicCstr, rules: SpeechRule[]):
      SpeechRule {
    let comparator = Engine.getInstance().comparator;
    rules.sort(function(r1, r2) {
      return comparator.compare(r1.dynamicCstr, r2.dynamicCstr) ||
          // When same number of dynamic constraint attributes matches for
          // both rules, compare
          // 1. Computed priority value
          // 2. length of static constraints,
          // 3. Rank in the definition. Note that later rules
          //    supersede earlier ones. 
          r2.precondition.priority - r1.precondition.priority ||
          r2.precondition.constraints.length -
          r1.precondition.constraints.length ||
          r2.precondition.rank - r1.precondition.rank;
    });
    Debugger.getInstance().generateOutput((() => {
      return rules.map((x) => x.name + '(' + x.dynamicCstr.toString() + ')');
    }).bind(this));
    return rules[0];
  }

}


export namespace StoreFactory {

  const stores: Map<string, BaseRuleStore> = new Map();

  /**
   * Factory method for generating rule stores by modality.
   * @param modality The modality.
   * @return The generated rule store.
   */
  function factory(modality: string): BaseRuleStore {
    // TODO (TS): Not sure how to get the constructors directly
    // let constructors = {braille: BrailleStore, speech: MathStore};
    // return new (constructors[modality] || MathStore)();
    if (modality === 'braille') {
      return new BrailleStore();
    }
    return new MathStore();
  }


  export function get(set: RulesJson) {
    let name = `${set.locale}.${set.modality}.${set.domain}`;
    if (set.kind === 'actions') {
      let store = stores.get(name);
      store.parse(set);
      return store;
    }
    SpeechRuleStores.init();
    if (set && !set.functions) {
      set.functions = SpeechRules.getStore(
        set.locale, set.modality, set.domain);
    }
    let store = factory(set.modality);
    stores.set(name, store);
    if (set.inherits) {
      store.inherits = stores.get(
        `${set.inherits}.${set.modality}.${set.domain}`);
    }
    store.parse(set);
    store.initialize();
    return store;
  }

}

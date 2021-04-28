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
import {Debugger} from '../common/debugger';
import * as EngineExports from '../common/engine';
import {Engine} from '../common/engine';
import * as ClearspeakPreferencesExports from '../speech_rules/clearspeak_preferences';
import {ClearspeakPreferences} from '../speech_rules/clearspeak_preferences';
import {MathMap} from '../speech_rules/math_map';
import * as SpeechRuleStores from '../speech_rules/speech_rule_stores';

import {BaseRuleStore} from './base_rule_store';
import {BrailleStore} from './braille_store';
import * as DynamicCstrExports from './dynamic_cstr';
import {DynamicCstr} from './dynamic_cstr';
import {MathStore} from './math_store';
import {SpeechRule} from './speech_rule';
import {SpeechRuleContext} from './speech_rule_context';
import {SpeechRuleEvaluator} from './speech_rule_evaluator';



export class SpeechRuleEngine {
  private activeStore_: BaseRuleStore;

  /**
   * Flag indicating if the engine is ready. Not ready while it is updating!
   */
  private ready_: boolean = true;

  /**
   * Default evaluators collated by locale and modality.
   */
  private evaluators_:
      {[key: string]: {[key: string]: (p1: Node) => AuditoryDescription[]}} = {};

  prune = true;
  constructor() {
    /**
     * The currently active speech rule store.
     */
    this.activeStore_ = new MathStore();

    Engine.registerTest(goog.bind(function(x) {
      return this.ready_;
    }, this));
  }


  /**
   * Factory method for generating rule stores by modality.
   * @param modality The modality.
   * @return The generated rule store.
   */
  private storeFactory_(modality: string): BaseRuleStore {
    let constructors = {braille: BrailleStore, speech: MathStore};
    return new (constructors[modality] || MathStore)();
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
  evaluateNode(node: Node): AuditoryDescription[] {
    let timeIn = (new Date()).getTime();
    let result = this.evaluateNode_(node);
    let timeOut = (new Date()).getTime();
    Debugger.getInstance().output('Time:', timeOut - timeIn);
    return result;
  }


  /**
   * Computes a speech object for a given node. Returns the empty list if
   * no node is given.
   * @param node The node to be evaluated.
   * @return A list of auditory descriptions
   *   for that node.
   */
  private evaluateNode_(node: Node): AuditoryDescription[] {
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
  private evaluateTree_(node: Node): AuditoryDescription[] {
    let engine = Engine.getInstance();
    Debugger.getInstance().output(
        engine.mode !== EngineExports.Mode.HTTP ? node.toString() : node);
    sre.Grammar.getInstance().setAttribute(node);
    let rule = this.activeStore_.lookupRule(node, engine.dynamicCstr);
    if (!rule) {
      if (engine.strict) {
        return [];
      }
      let result = this.getEvaluator(engine.locale, engine.modality)(node);
      if (node.attributes) {
        this.addPersonality_(result, {}, false, node);
      }
      return result;
    }
    Debugger.getInstance().generateOutput(goog.bind(function() {
      return [
        'Apply Rule:', rule.name, rule.dynamicCstr.toString(),
        engine.mode !== EngineExports.Mode.HTTP ? node.toString() : node
      ];
    }, this));
    let context = rule.context || this.activeStore_.context;
    let components = rule.action.components;
    result = [];
    for (let i = 0, component; component = components[i]; i++) {
      let descrs = [];
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
        let features = sre.Grammar.parseInput(attributes.engine);
        Engine.getInstance().setDynamicCstr(features);
      }
      switch (component.type) {
        case SpeechRule.Type.NODE:
          let selected = context.applyQuery(node, content);
          if (selected) {
            descrs = this.evaluateTree_(selected);
          }
          break;
        case SpeechRule.Type.MULTI:
          multi = true;
          selected = context.applySelector(node, content);
          if (selected.length > 0) {
            descrs = this.evaluateNodeList_(
                context, selected, attributes['sepFunc'],
                // TODO (span): Sort out those types better.
                (context.constructString(node, attributes['separator']) as
                 string),
                attributes['ctxtFunc'],
                (context.constructString(node, attributes['context']) as
                 string));
          }
          break;
        case SpeechRule.Type.TEXT:
          // TODO (span): We need the span concept here as a parameter with
          // xpath.
          let xpath = attributes['span'];
          let attrs = {};
          if (xpath) {
            let nodes = sre.XpathUtil.evalXPath(xpath, node);
            // TODO: Those could be multiple nodes!
            //       We need the right xpath expression and combine their
            //       attributes.
            // Generalise the following:
            if (nodes.length) {
              attrs.extid = nodes[0].getAttribute('extid');
            }
          }
          selected = context.constructString(node, content);
          if (selected) {
            if (Array.isArray(selected)) {
              descrs = selected.map(function(span) {
                return AuditoryDescription.create(
                    {text: span.string, attributes: span.attributes},
                    {adjust: true});
              });
            } else {
              descrs = [AuditoryDescription.create(
                  {text: selected, attributes: attrs}, {adjust: true})];
            }
          }
          break;
        case SpeechRule.Type.PERSONALITY:
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
      if (component.grammar) {
        sre.Grammar.getInstance().popState();
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
      context: SpeechRuleContext, nodes: Node[], sepFunc: string,
      sepStr: string, ctxtFunc: string,
      ctxtStr: string): AuditoryDescription[] {
    if (nodes == []) {
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
      return AuditoryDescription.create({text: sep}, {translate: true});
    };
    let result = [];
    for (let i = 0, node; node = nodes[i]; i++) {
      let descrs = this.evaluateTree_(node);
      if (descrs.length > 0) {
        descrs[0]['context'] = ctxtClosure() + (descrs[0]['context'] || '');
        result = result.concat(descrs);
        if (i < nodes.length - 1) {
          let text = sepClosure();
          result = result.concat(text);
        }
      }
    }
    return result;
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
      descrs: AuditoryDescription[], props: Object, multi: boolean,
      node: Node): AuditoryDescription[] {
    let personality = {};
    let pause = null;
    for (let key in Engine.personalityProps) {
      let value = props[Engine.personalityProps[key]];
      if (typeof value === 'undefined') {
        continue;
      }
      let numeral = parseFloat(value);
      // if (!isNaN(numeral)) {
      //   personality[sre.Engine.personalityProps[key]] = numeral;
      // }
      let realValue = isNaN(numeral) ?
          value.charAt(0) == '"' ? value.slice(1, -1) : value :
          numeral;
      if (Engine.personalityProps[key] === Engine.personalityProps.PAUSE) {
        pause = realValue;
      } else {
        personality[Engine.personalityProps[key]] = realValue;
      }
    }
    // TODO: Deal with non-numeric values for personalities here.
    //       Possibly use simply an overwrite mechanism without adding.
    for (let i = 0, descr; descr = descrs[i]; i++) {
      this.addRelativePersonality_(descr, personality);
      this.addExternalAttributes_(descr, node);
    }
    // Removes the last joiner in a multi node element.
    if (multi && descrs.length) {
      delete descrs[descrs.length - 1]
          .personality[Engine.personalityProps.JOIN];
    }
    // Adds pause if there was one.
    if (pause && descrs.length) {
      let last = descrs[descrs.length - 1];
      if (last.text || Object.keys(last.personality).length) {
        descrs.push(AuditoryDescription.create(
            {text: '', personality: {pause: pause}}));
      } else {
        last.personality[Engine.personalityProps.PAUSE] = pause;
      }
    }
    return descrs;
  }


  /**
   * Adds external attributes if some are in the node
   * @param descr An Auditory descriptions.
   * @param node The XML node.
   */
  private addExternalAttributes_(descr: AuditoryDescription, node: Node) {
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
      descr: AuditoryDescription, personality: Object): AuditoryDescription {
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
      } else {
        descrPersonality[p] = personality[p];
      }
    }
    return descr;
  }


  /**
   * Prints the list of all current rules in ChromeVox to the console.
   * @return A textual representation of all rules in the speech rule
   *     engine.
   */
  toString(): string {
    let allRules = this.activeStore_.findAllRules(function(x) {
      return true;
    });
    return allRules
        .map(function(rule) {
          return rule.toString();
        })
        .join('\n');
  }


  /**
   * Test the precondition of a speech rule in debugging mode.
   * @param rule A speech rule.
   * @param node DOM node to test applicability of the rule.
   */
  static debugSpeechRule(rule: SpeechRule, node: Node) {
    let store = SpeechRuleEngine.getInstance().activeStore_;
    if (store) {
      store.debugSpeechRule(rule, node);
    }
  }


  /**
   * Test the precondition of a speech rule in debugging mode.
   * @param name Rule to debug.
   * @param node DOM node to test applicability of the rule.
   */
  static debugNamedSpeechRule(name: string, node: Node) {
    let store = SpeechRuleEngine.getInstance().activeStore_;
    if (store) {
      let allRules = store.findAllRules(function(rule) {
        return rule.name == name;
      });
      for (let i = 0, rule; rule = allRules[i]; i++) {
        Debugger.getInstance().output(
            'Rule', name, 'DynamicCstr:', rule.dynamicCstr.toString(), 'number',
            i);
        store.debugSpeechRule(rule, node);
      }
    }
  }


  /**
   * Runs a function in the temporary context of the speech rule engine.
   * @param settings The temporary settings for the speech rule
   *     engine. They can contain the usual features.
   * @param callback The runnable
   *     function that computes speech results.
   * @return The result of the callback.
   */
  runInSetting(settings: Object, callback: () => AuditoryDescription[]):
      AuditoryDescription[] {
    let engine = Engine.getInstance();
    let save = {};
    for (let key in settings) {
      save[key] = engine[key];
      engine[key] = settings[key];
    }
    engine.setDynamicCstr();
    let result = callback();
    for (key in save) {
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
  addStore(set: {[key: string]: string|any[]}) {
    // This line is important to setup the context functions for stores.
    // It has to run __before__ the first speech rule store is added.
    SpeechRuleStores.init();
    if (set && !set.functions) {
      set.functions = sre.SpeechRules.getInstance().getStore(
          set.locale, set.modality, set.domain);
    }
    let store = this.storeFactory_(set.modality);
    store.parse(set);
    store.initialize();
    store.getSpeechRules().forEach(goog.bind(function(x) {
      this.activeStore_.trie.addRule(x);
    }, this));
    this.addEvaluator(store);
    this.activeStore_.setSpeechRules(this.activeStore_.trie.collectRules());
  }


  /**
   * Updates adminstrative info in the base Engine.
   * During update the engine is not ready!
   */
  updateEngine() {
    this.ready_ = true;
    let maps = MathMap.getInstance();
    if (!Engine.isReady()) {
      this.ready_ = false;
      setTimeout(goog.bind(this.updateEngine, this), 250);
      return;
    }
    if (this.prune) {
      this.prune = false;
      this.adjustEngine();
    }
    Engine.getInstance().evaluator =
        goog.bind(maps.store.lookupString, maps.store);
  }


  /**
   * Adjust Engine with local rule files.
   */
  adjustEngine() {
    let engine = Engine.getInstance();
    if (engine.prune) {
      let cstr = engine.prune.split('.');
      this.activeStore_.prune(cstr);
    }
    if (engine.rules) {
      // TODO: This needs to be made more robust.
      let path =
          sre.SystemExternal.jsonPath.replace('/lib/mathmaps', '/src/mathmaps');
      let parse = function(json) {
        return MathMap.getInstance().parseMaps(
            '{"' + engine.rules + '":' + json + '}');
      };
      MathMap.getInstance().retrieveFiles(path + engine.rules, parse);
    }
    setTimeout(goog.bind(this.updateEngine, this), 100);
  }


  /**
   * Processes the grammar annotations of a rule.
   * @param context The function context in which to
   *     evaluate the grammar expression.
   * @param node The node to which the rule is applied.
   * @param grammar The grammar annotations.
   */
  processGrammar(
      context: SpeechRuleContext, node: Node, grammar: Grammar.State) {
    let assignment = {};
    for (let key in grammar) {
      let value = grammar[key];
      assignment[key] = typeof value === 'string' ?
          context.constructString(node, value) :
          value;
    }
    sre.Grammar.getInstance().pushState(assignment);
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
    let trie = this.activeStore_.trie;
    let props = {};
    let locale = dynamic.getValue(DynamicCstrExports.Axis.LOCALE);
    let modality = dynamic.getValue(DynamicCstrExports.Axis.MODALITY);
    let domain = dynamic.getValue(DynamicCstrExports.Axis.DOMAIN);
    if (!trie.hasSubtrie([locale, modality, domain])) {
      domain = DynamicCstr.DEFAULT_VALUES[DynamicCstrExports.Axis.DOMAIN];
      if (!trie.hasSubtrie([locale, modality, domain])) {
        modality = DynamicCstr.DEFAULT_VALUES[DynamicCstrExports.Axis.MODALITY];
        if (!trie.hasSubtrie([locale, modality, domain])) {
          locale = DynamicCstr.DEFAULT_VALUES[DynamicCstrExports.Axis.LOCALE];
        }
      }
    }
    props[DynamicCstrExports.Axis.LOCALE] = [locale];
    // Normally modality cannot be mixed. But summary allows fallback to speech
    // if an expression can not be summarised.
    props[DynamicCstrExports.Axis.MODALITY] =
        [modality !== 'summary' ?
             modality :
             DynamicCstr.DEFAULT_VALUES[DynamicCstrExports.Axis.MODALITY]];
    // For speech we do not want rule leaking across rule sets.
    props[DynamicCstrExports.Axis.DOMAIN] =
        [modality !== 'speech' ?
             DynamicCstr.DEFAULT_VALUES[DynamicCstrExports.Axis.DOMAIN] :
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
   * Adds an evaluation method by locale and modality.
   * @param store The store whose evaluation method is
   *     added.
   */
  addEvaluator(store: SpeechRuleEvaluator) {
    let fun = goog.bind(store.evaluateDefault, store);
    let loc = this.evaluators_[store.locale];
    if (loc) {
      loc[store.modality] = fun;
      return;
    }
    let mod = {};
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
  getEvaluator(locale: string, modality: string):
      (p1: Node) => AuditoryDescription[] {
    let loc = this.evaluators_[locale];
    let fun = loc ? loc[modality] : null;
    return fun ?
        fun :
        goog.bind(this.activeStore_.evaluateDefault, this.activeStore_);
  }


  /**
   * Collates information on dynamic constraint values of the currently active
   * trie of the engine.
   * @param opt_info Initial dynamic constraint information.
   * @return The collated information.
   */
  enumerate(opt_info?: Object): Object {
    return this.activeStore_.trie.enumerate(opt_info);
  }
}

goog.addSingletonGetter(SpeechRuleEngine);

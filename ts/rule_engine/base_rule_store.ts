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
 * @fileoverview Abstract base class for all speech rule stores.
 *
 * The base rule store implements some basic functionality that is common to
 * most speech rule stores.
 * @author sorge@google.com (Volker Sorge)
 */


import {AuditoryDescription} from '../audio/auditory_description';
import {Debugger} from '../common/debugger';
import * as DomUtil from '../common/dom_util';
import {Engine} from '../common/engine';
import {Trie} from '../indexing/trie';
import {Axis, AxisOrder, DynamicCstr, DynamicCstrParser} from './dynamic_cstr';
import {Action, Precondition, SpeechRule} from './speech_rule';
import {SpeechRuleContext} from './speech_rule_context';
import {SpeechRuleEvaluator} from './speech_rule_evaluator';
import {SpeechRuleStore} from './speech_rule_store';


export abstract class BaseRuleStore implements SpeechRuleEvaluator, SpeechRuleStore {

  /**
   * Context for custom functions of this rule store.
   */
  public context: SpeechRuleContext = new SpeechRuleContext();

  /**
   * Trie for indexing speech rules in this store.
   */
  public trie: Trie = null;

  /**
   * A priority list of dynamic constraint attributes.
   */
  public parseOrder: AxisOrder = DynamicCstr.DEFAULT_ORDER;

  /**
   * A dynamic constraint parser.
   */
  public parser: DynamicCstrParser = new DynamicCstrParser(this.parseOrder);

  /**
   * Default locale.
   */
  public locale: string = DynamicCstr.DEFAULT_VALUES[Axis.LOCALE];

  /**
   * Default modality.
   */
  public modality: string = DynamicCstr.DEFAULT_VALUES[Axis.MODALITY];

  /**
   * Default domain.
   */
  public domain: string = '';

  // TODO (TS): Sort out this type!
  /**
   * Mapping for parse methods.
   */
  public parseMethods: any;

  /**
   * Initialisation flag.
   */
  public initialized: boolean = false;


  /**
   * Local transcriptions for special characters.
   */
  public customTranscriptions: {[key: string]: string} = {};

  /**
   * Set of speech rules in the store.
   */
  private speechRules_: SpeechRule[] = [];

  private rank: number = 0;

  // TODO (sorge) Define the following methods directly on the precondition
  //     classes.
  /**
   * Compares two static constraints (i.e., lists of precondition constraints)
   * and returns true if they are equal.
   * @param cstr1 First static constraints.
   * @param cstr2 Second static constraints.
   * @return True if the static constraints are equal.
   */
  private static compareStaticConstraints_(cstr1: string[], cstr2: string[]):
      boolean {
    if (cstr1.length !== cstr2.length) {
      return false;
    }
    for (let i = 0, cstr; cstr = cstr1[i]; i++) {
      if (cstr2.indexOf(cstr) === -1) {
        return false;
      }
    }
    return true;
  }


  /**
   * Compares the preconditions of two speech rules.
   * @param rule1 The first speech rule.
   * @param rule2 The second speech rule.
   * @return True if the preconditions are equal.
   */
  private static comparePreconditions_(rule1: SpeechRule, rule2: SpeechRule):
      boolean {
    let prec1 = rule1.precondition;
    let prec2 = rule2.precondition;
    if (prec1.query !== prec2.query) {
      return false;
    }
    return BaseRuleStore.compareStaticConstraints_(
        prec1.constraints, prec2.constraints);
  }


  /**
   * Compares priority of two rules.
   * @param rule1 The first speech rule.
   * @param rule2 The second speech rule.
   * @return -1, 0, 1 depending on the comparison.
   */
  private static priority_(rule1: SpeechRule, rule2: SpeechRule): number {
    let priority1 = rule1.precondition.priority;
    let priority2 = rule2.precondition.priority;
    return priority1 === priority2 ? 0 : priority1 > priority2 ? -1 : 1;
  }


  /**
   * @override
   */
  constructor() {
    this.parseMethods = {
      'Rule': this.defineRule,
      'Generator': this.generateRules
    };
  }


  /**
   * @override
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
   * @override
   */
  public defineRule(name: string, dynamic: string, action: string,
             prec: string, ...args: string[]) {
    let rule;
    try {
      // TODO: Have a parser that respects generators.
      let postc = Action.fromString(action);
      let fullPrec = this.parsePrecondition(prec, args);
      let dynamicCstr = this.parseCstr(dynamic);
      rule = new SpeechRule(name, dynamicCstr, fullPrec, postc);
    } catch (err) {
      if (err.name === 'RuleError') {
        console.error('Rule Error ', prec, '(' + dynamic + '):', err.message);
        return null;
      } else {
        throw err;
      }
    }
    rule.precondition.rank = this.rank++;
    this.addRule(rule);
    return rule;
  }


  /**
   * @override
   */
  public addRule(rule: SpeechRule) {
    rule.context = this.context;
    // this.trie.addRule(rule);
    this.speechRules_.unshift(rule);
  }


  /**
   * @override
   */
  public deleteRule(rule: SpeechRule) {
    let index = this.speechRules_.indexOf(rule);
    if (index !== -1) {
      this.speechRules_.splice(index, 1);
    }
  }


  /**
   * @override
   */
  public findRule(pred: (rule: SpeechRule) => boolean) {
    for (let i = 0, rule; rule = this.speechRules_[i]; i++) {
      if (pred(rule)) {
        return rule;
      }
    }
    return null;
  }


  /**
   * @override
   */
  public findAllRules(pred: (rule: SpeechRule) => boolean) {
    return this.speechRules_.filter(pred);
  }


  /**
   * @override
   */
  public evaluateDefault(node: Node) {
    let rest = node.textContent.slice(0);
    if (rest.match(/^\s+$/)) {
      // Nothing but whitespace: Ignore.
      return this.evaluateWhitespace(rest);
    }
    return this.evaluateString(rest);
  }


  /**
   * @override
   */
  public evaluateWhitespace(_str: string): AuditoryDescription[] {
    return [];
  }


  /**
   * @override
   */
  public evaluateCustom(str: string) {
    let trans = this.customTranscriptions[str];
    return trans !== undefined ?
        AuditoryDescription.create(
            {'text': trans}, {adjust: true, translate: false}) :
        null;
  }


  /**
   * @override
   */
  public evaluateCharacter(str: string) {
    return this.evaluateCustom(str) ||
        AuditoryDescription.create(
            {'text': str}, {adjust: true, translate: true});
  }


  /**
   * @override
   */
  public abstract evaluateString(str: string): AuditoryDescription[];

  /**
   * Function to initialize the store with speech rules. It is called by the
   * speech rule engine upon parametrization with this store. The function
   * allows us to define sets of rules in separate files while depending on
   * functionality that is defined in the rule store.  Essentially it is a way
   * of getting around dependencies.
   */
  public abstract initialize(): void;


  /**
   * Test the applicability of a speech rule in debugging mode.
   * @param rule Rule to debug.
   * @param node DOM node to test applicability of given rule.
   */
  public debugSpeechRule(rule: SpeechRule, node: Node) {
    let prec = rule.precondition;
    let queryResult = rule.context.applyQuery(node, prec.query);
    Debugger.getInstance().output(
        prec.query, queryResult ? queryResult.toString() : queryResult);
    prec.constraints.forEach(cstr =>
      Debugger.getInstance().output(
        cstr, rule.context.applyConstraint(node, cstr)));
  }


  /**
   * Removes duplicates of the given rule from the rule store. Thereby
   * duplicates are identified by having the same precondition and dynamic
   * constraint.
   * @param rule The rule.
   */
  public removeDuplicates(rule: SpeechRule) {
    for (let i = this.speechRules_.length - 1, oldRule;
         oldRule = this.speechRules_[i]; i--) {
      if (oldRule !== rule && rule.dynamicCstr.equal(oldRule.dynamicCstr) &&
          BaseRuleStore.comparePreconditions_(oldRule, rule)) {
        this.speechRules_.splice(i, 1);
      }
    }
  }

  /**
   * @return Set of all speech rules in the store.
   */
  public getSpeechRules(): SpeechRule[] {
    return this.speechRules_;
  }


  /**
   * Sets the speech rule set of the store.
   * @param rules New rule set.
   */
  public setSpeechRules(rules: SpeechRule[]) {
    this.speechRules_ = rules;
  }


  /**
   * Default constraint parser that adds the locale to the rest constraint
   * (generally, domain.style).
   * @param cstr The constraint string.
   * @return The parsed constraint including locale.
   */
  public parseCstr(cstr: string): DynamicCstr {
    return this.parser.parse(
        this.locale + '.' + this.modality +
        (this.domain ? '.' + this.domain : '') + '.' + cstr);
  }


  /**
   * Parses precondition by resolving generator rules.
   * @param query The query constraint.
   * @param rest The rest constraints.
   * @return The new precondition.
   */
  public parsePrecondition(query: string, rest: string[]): Precondition {
    let queryCstr = this.parsePrecondition_(query);
    query = queryCstr[0];
    let restCstr = queryCstr.slice(1);
    for (let cstr of rest) {
      restCstr = restCstr.concat(this.parsePrecondition_(cstr));
    }
    return new Precondition(query, ...restCstr);
  }


  /**
   * Parses a rule set definition.
   * @param ruleSet The
   *     definition object.
   */
  public parse(ruleSet: RulesJson) {
    this.modality = ruleSet.modality || this.modality;
    this.locale = ruleSet.locale || this.locale;
    this.domain = ruleSet.domain || this.domain;
    // TODO (TS): Fix this to avoid casting!
    this.context.parse(ruleSet.functions as any || []);
    this.parseRules(ruleSet.rules || []);
  }


  /**
   * Parse a list of rules, each given as a list of strings.
   * @param rules The list of rules.
   */
  public parseRules(rules: string[][]) {
    for (let i = 0, rule; rule = rules[i]; i++) {
      let type = rule[0];
      let method = this.parseMethods[type];
      if (type && method) {
        method.apply(this, rule.slice(1))
      }
    }
  }


  /**
   * Parses rules generated by the given generator function.
   * @param generator Name of the generator function.
   */
  public generateRules(generator: string) {
    let method = this.context.customGenerators.lookup(generator);
    if (method) {
      method(this);
    }
  }


  /**
   * Prunes the trie of the store for a given constraint.
   * @param constraints A list of constraints.
   */
  public prune(constraints: string[]) {
    let last = constraints.pop();
    let parent = this.trie.byConstraint(constraints);
    if (parent) {
      parent.removeChild(last);
    }
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
          // both rules, compare length of static constraints.
          // sre.BaseRuleStore.strongQuery_(r1, r2) ||
          BaseRuleStore.priority_(r1, r2) ||
          r2.precondition.constraints.length -
          r1.precondition.constraints.length ||
          r2.precondition.rank - r1.precondition.rank;
    });
    Debugger.getInstance().generateOutput((() => {
      return rules.map((x) => x.name + '(' + x.dynamicCstr.toString() + ')');
    }).bind(this));
    return rules[0];
  }


  /**
   * Resolves a single precondition constraint.
   * @param cstr The precondition constraint.
   * @return Array of constraints, possibly generated.
   */
  private parsePrecondition_(cstr: string): string[] {
    let generator = this.context.customGenerators.lookup(cstr);
    return generator ? generator() : [cstr];
  }

}

export interface RulesJson {
  modality?: string;
  domain?: string;
  locale?: string;
  functions?: {[key: string]: Function};
  rules?: any[];
  annotators?: any[];
}

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
   * @override
   */
  constructor() {
    this.parseMethods = {
      'Rule': this.defineRule,
      'Generator': this.generateRules,
      'Action': this.defineAction,
      'Precondition': this.definePrecondition,
      'PAlias': this.defineAlias,
      'PAliases': this.defineAliases
    };
  }


  /**
   * @override
   */
  public defineRule(name: string, dynamic: string, action: string,
             prec: string, ...args: string[]) {
    let postc = this.parseAction(action);
    let fullPrec = this.parsePrecondition(prec, args);
    let dynamicCstr = this.parseCstr(dynamic);
    if (!(postc && fullPrec && dynamicCstr)) {
      console.error(`Rule Error: ${prec}, (${dynamic}): ${action}`);
      return null;
    }
    let rule = new SpeechRule(name, dynamicCstr, fullPrec, postc);
    rule.precondition.rank = this.rank++;
    this.addRule(rule);
    return rule;
  }


  /**
   * @override
   */
  public addRule(rule: SpeechRule) {
    rule.context = this.context;
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
    try {
      // TODO: Have a parser that respects generators.
      return this.parser.parse(
        this.locale + '.' + this.modality +
          (this.domain ? '.' + this.domain : '') + '.' + cstr);
    } catch (err) {
      if (err.name === 'RuleError') {
        console.error(
          'Rule Error ', `Illegal Dynamic Constraint: ${cstr}.`, err.message);
        return null;
      } else {
        throw err;
      }
    }
  }


  /**
   * Parses precondition by resolving generator rules.
   * @param query The query constraint.
   * @param rest The rest constraints.
   * @return The new precondition.
   */
  public parsePrecondition(query: string, rest: string[]): Precondition {
    try {
      let queryCstr = this.parsePrecondition_(query);
      query = queryCstr[0];
      let restCstr = queryCstr.slice(1);
      for (let cstr of rest) {
        restCstr = restCstr.concat(this.parsePrecondition_(cstr));
      }
      return new Precondition(query, ...restCstr);
    } catch (err) {
      if (err.name === 'RuleError') {
        console.error('Rule Error ',
                      `Illegal preconditions: ${query}, ${rest}.`, err.message);
        return null;
      } else {
        throw err;
      }
    }
  }


  /**
   * Parses a speech rule action.
   * @param action The action string.
   * @return The new action.
   */
  public parseAction(action: string) {
    try {
      return Action.fromString(action);
    } catch (err) {
      if (err.name === 'RuleError') {
        console.error('Rule Error ',
                      `Illegal action: ${action}.`, err.message);
        return null;
      } else {
        throw err;
      }
    }
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
        method.apply(this, rule.slice(1));
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
   * Resolves a single precondition constraint.
   * @param cstr The precondition constraint.
   * @return Array of constraints, possibly generated.
   */
  private parsePrecondition_(cstr: string): string[] {
    let generator = this.context.customGenerators.lookup(cstr);
    return generator ? generator() : [cstr];
  }

  /**
   * @override
   */
  public defineAction(name: string, action: string) {
    let postc: Action;
    try {
      // TODO: Have a parser that respects generators.
      postc = Action.fromString(action);
    } catch (err) {
      if (err.name === 'RuleError') {
        console.error('Action Error ', action, err.message);
        return;
      } else {
        throw err;
      }
    }
    let prec = this.preconditions.get(name);
    if (!prec) {
      console.error(`Action Error: No precondition for action ${name}`);
      return;
    }
    prec.conditions.forEach(([dynamic, prec]) =>
      this.addRule(new SpeechRule(name, dynamic, prec, postc)));
  }


  /**
   * Set of Preconditions
   */
  private preconditions: Map<string, Condition> = new Map();


  /**
   * @override
   */
  public definePrecondition(name: string, dynamic: string,
                            prec: string, ...args: string[]) {
    let fullPrec = this.parsePrecondition(prec, args);
    let dynamicCstr = this.parseCstr(dynamic);
    if (!(fullPrec && dynamicCstr)) {
      console.error(`Precondition Error: ${prec}, (${dynamic})`);
      return;
    }
    fullPrec.rank = this.rank++;
    this.preconditions.set(name, new Condition(dynamicCstr, fullPrec));
    // TODO: Maybe return something?
  }

  public defineAlias(name: string, prec: string, ...args: string[]) {
    let fullPrec = this.parsePrecondition(prec, args);
    if (!fullPrec) {
      console.error(`Precondition Error: ${prec} ${args}`);
      return;
    }
    let condition = this.preconditions.get(name);
    if (!condition) {
      console.error(`Alias Error: No precondition by the name of ${name}`);
      return;
    }
    condition.addBaseCondition(fullPrec);
  }


  public defineAliases(name: string, prec: string, ...args: string[]) {
    let fullPrec = this.parsePrecondition(prec, args);
    if (!fullPrec) {
      console.error(`Precondition Error: ${prec} ${args}`);
      return;
    }
    let condition = this.preconditions.get(name);
    if (!condition) {
      console.error(`Aliases Error: No precondition by the name of ${name}`);
      return;
    }
    condition.addFullCondition(fullPrec);
  }
  
  public defineSpecialized(name: string, _old: string, dynamic: string) {
    let cstr = this.parseCstr(dynamic);
    if (!cstr) {
      console.error(`Dynamic Constraint Error: ${dynamic}`);
      return;
    }
    let condition = this.preconditions.get(name);
    if (!condition) {
      console.error(`Alias Error: No precondition by the name of ${name}`);
      return;
    }
    condition.addConstraint(cstr);
  }

}

export class Condition {

  private _conditions: [DynamicCstr, Precondition][] = [];

  private constraints: DynamicCstr[] = [];

  private allCstr: {[cond: string]: boolean} = {};

  /**
   *
   * @param {DynamicCstr} dynamic
   * @param {Precondition} condition
   */
  constructor(private base: DynamicCstr, condition: Precondition) {
    this.constraints.push(base);
    this.addCondition(base, condition);
  }

  public get conditions() {
    return this._conditions;
  }

  /**
   *
   * @param {DynamicCstr} dynamic
   */
  public addConstraint(dynamic: DynamicCstr) {
    if (this.constraints.filter(cstr => cstr.equal(dynamic)).length) {
      return;
    }
    this.constraints.push(dynamic);
    let newConds: [DynamicCstr, Precondition][] = [];
    for (let [dyn, pre] of this.conditions) {
      if (this.base.equal(dyn)) {
        newConds.push([dynamic, pre]);
      }
    }
    this._conditions = this._conditions.concat(newConds);
  }

  public addBaseCondition(cond: Precondition) {
    this.addCondition(this.base, cond);
  }

  public addFullCondition(cond: Precondition) {
    this.constraints.forEach(cstr =>
      this.addCondition(cstr, cond));
  }

  private addCondition(dynamic: DynamicCstr, cond: Precondition) {
    let condStr = dynamic.toString() + ' ' + cond.toString();
    if (this.allCstr.condStr) {
      return;
    }
    this.allCstr[condStr] = true;
    this._conditions.push([dynamic, cond]);
  }

}

export interface RulesJson {
  modality?: string;
  domain?: string;
  locale?: string;
  kind?: string;
  functions?: {[key: string]: Function};
  rules?: any[];
  annotators?: any[];
}

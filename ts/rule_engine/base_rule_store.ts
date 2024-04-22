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
 * @file Abstract base class for all speech rule stores.
 *
 * The base rule store implements some basic functionality that is common to
 * most speech rule stores.
 * @author sorge@google.com (Volker Sorge)
 */

import * as EngineConst from '../engine/engine_const.js';
import { EngineFeatures } from '../engine/engine_features.js';
import { AuditoryDescription } from '../audio/auditory_description.js';
import {
  AxisOrder,
  DynamicCstr,
  DynamicCstrParser
} from './dynamic_cstr.js';
import { Action, Precondition, SpeechRule } from './speech_rule.js';
import { SpeechRuleContext } from './speech_rule_context.js';
import { SpeechRuleEvaluator } from './speech_rule_evaluator.js';
import { SpeechRuleFunction } from './speech_rule_functions.js';
import { SpeechRuleStore } from './speech_rule_store.js';

export abstract class BaseRuleStore
  implements SpeechRuleEvaluator, SpeechRuleStore
{
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
  public parser: DynamicCstrParser = new DynamicCstrParser(
    DynamicCstr.DEFAULT_ORDER
  );

  /**
   * Default locale.
   */
  public locale: string = EngineFeatures.getDefaultString(EngineConst.Axis.LOCALE);

  /**
   * Default modality.
   */
  public modality: string = EngineFeatures.getDefaultString(EngineConst.Axis.MODALITY);

  /**
   * Default domain.
   */
  public domain = '';

  // TODO (TS): Sort out this type!
  /**
   * Mapping for parse methods.
   */
  public parseMethods: any;

  /**
   * Initialisation flag.
   */
  public initialized = false;

  /**
   * Inheritance store. None if null.
   */
  public inherits: BaseRuleStore = null;

  /**
   * Type of rule store: standard, abstract, actions.
   */
  public kind = 'standard';

  /**
   * Local transcriptions for special characters.
   */
  public customTranscriptions: { [key: string]: string } = {};

  /**
   * Set of Preconditions
   */
  protected preconditions: Map<string, Condition> = new Map();

  /**
   * Set of speech rules in the store.
   */
  private speechRules_: SpeechRule[] = [];

  /**
   * Rank in the rule store definition. This informs the secondary rank for
   * speech rules and takes order of definitions into account.
   */
  private rank = 0;

  // TODO (sorge) Define the following methods directly on the precondition
  //     classes.
  /**
   * Compares two static constraints (i.e., lists of precondition constraints)
   * and returns true if they are equal.
   *
   * @param cstr1 First static constraints.
   * @param cstr2 Second static constraints.
   * @returns True if the static constraints are equal.
   */
  private static compareStaticConstraints_(
    cstr1: string[],
    cstr2: string[]
  ): boolean {
    if (cstr1.length !== cstr2.length) {
      return false;
    }
    for (let i = 0, cstr: string; (cstr = cstr1[i]); i++) {
      if (cstr2.indexOf(cstr) === -1) {
        return false;
      }
    }
    return true;
  }

  /**
   * Compares the preconditions of two speech rules.
   *
   * @param rule1 The first speech rule.
   * @param rule2 The second speech rule.
   * @returns True if the preconditions are equal.
   */
  private static comparePreconditions_(
    rule1: SpeechRule,
    rule2: SpeechRule
  ): boolean {
    const prec1 = rule1.precondition;
    const prec2 = rule2.precondition;
    if (prec1.query !== prec2.query) {
      return false;
    }
    return BaseRuleStore.compareStaticConstraints_(
      prec1.constraints,
      prec2.constraints
    );
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
      'Ignore': this.ignoreRules
    };
  }

  /**
   * @override
   */
  public defineRule(
    name: string,
    dynamic: string,
    action: string,
    prec: string,
    ...args: string[]
  ) {
    const postc = this.parseAction(action);
    const fullPrec = this.parsePrecondition(prec, args);
    const dynamicCstr = this.parseCstr(dynamic);
    if (!(postc && fullPrec && dynamicCstr)) {
      console.error(`Rule Error: ${prec}, (${dynamic}): ${action}`);
      return null;
    }
    const rule = new SpeechRule(name, dynamicCstr, fullPrec, postc);
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
    const index = this.speechRules_.indexOf(rule);
    if (index !== -1) {
      this.speechRules_.splice(index, 1);
    }
  }

  /**
   * @override
   */
  public findRule(pred: (rule: SpeechRule) => boolean) {
    for (let i = 0, rule; (rule = this.speechRules_[i]); i++) {
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
    const rest = node.textContent.slice(0);
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
    const trans = this.customTranscriptions[str];
    return trans !== undefined
      ? AuditoryDescription.create(
          { text: trans },
          { adjust: true, translate: false }
        )
      : null;
  }

  /**
   * @override
   */
  public evaluateCharacter(str: string) {
    return (
      this.evaluateCustom(str) ||
      AuditoryDescription.create(
        { text: str },
        { adjust: true, translate: true }
      )
    );
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
   *
   * @param rule The rule.
   */
  public removeDuplicates(rule: SpeechRule) {
    for (
      let i = this.speechRules_.length - 1, oldRule;
      (oldRule = this.speechRules_[i]);
      i--
    ) {
      if (
        oldRule !== rule &&
        rule.dynamicCstr.equal(oldRule.dynamicCstr) &&
        BaseRuleStore.comparePreconditions_(oldRule, rule)
      ) {
        this.speechRules_.splice(i, 1);
      }
    }
  }

  /**
   * @returns Set of all speech rules in the store.
   */
  public getSpeechRules(): SpeechRule[] {
    return this.speechRules_;
  }

  /**
   * Sets the speech rule set of the store.
   *
   * @param rules New rule set.
   */
  public setSpeechRules(rules: SpeechRule[]) {
    this.speechRules_ = rules;
  }

  /**
   * @returns All preconditions in the rule store. For analysis purposes.
   */
  public getPreconditions(): Map<string, Condition> {
    return this.preconditions;
  }

  /**
   * Default constraint parser that adds the locale to the rest constraint
   * (generally, domain.style).
   *
   * @param cstr The constraint string.
   * @returns The parsed constraint including locale.
   */
  public parseCstr(cstr: string): DynamicCstr {
    try {
      // TODO: Have a parser that respects generators.
      return this.parser.parse(
        this.locale +
          '.' +
          this.modality +
          (this.domain ? '.' + this.domain : '') +
          '.' +
          cstr
      );
    } catch (err) {
      if (err.name === 'RuleError') {
        console.error(
          'Rule Error ',
          `Illegal Dynamic Constraint: ${cstr}.`,
          err.message
        );
        return null;
      } else {
        throw err;
      }
    }
  }

  /**
   * Parses precondition by resolving generator rules.
   *
   * @param query The query constraint.
   * @param rest The rest constraints.
   * @returns The new precondition.
   */
  public parsePrecondition(query: string, rest: string[]): Precondition {
    try {
      const queryCstr = this.parsePrecondition_(query);
      query = queryCstr[0];
      let restCstr = queryCstr.slice(1);
      for (const cstr of rest) {
        restCstr = restCstr.concat(this.parsePrecondition_(cstr));
      }
      return new Precondition(query, ...restCstr);
    } catch (err) {
      if (err.name === 'RuleError') {
        console.error(
          'Rule Error ',
          `Illegal preconditions: ${query}, ${rest}.`,
          err.message
        );
        return null;
      } else {
        throw err;
      }
    }
  }

  /**
   * Parses a speech rule action.
   *
   * @param action The action string.
   * @returns The new action.
   */
  public parseAction(action: string) {
    try {
      return Action.fromString(action);
    } catch (err) {
      if (err.name === 'RuleError') {
        console.error('Rule Error ', `Illegal action: ${action}.`, err.message);
        return null;
      } else {
        throw err;
      }
    }
  }

  /**
   * Parses a rule set definition.
   *
   * @param ruleSet The
   *     definition object.
   */
  public parse(ruleSet: RulesJson) {
    this.modality = ruleSet.modality || this.modality;
    this.locale = ruleSet.locale || this.locale;
    this.domain = ruleSet.domain || this.domain;
    // TODO (TS): Fix this to avoid casting!
    this.context.parse((ruleSet.functions as any) || []);
    if (ruleSet.kind !== 'actions') {
      this.kind = ruleSet.kind || this.kind;
      this.inheritRules();
    }
    this.parseRules(ruleSet.rules || []);
  }

  /**
   * Parse a list of rules, each given as a list of strings.
   *
   * @param rules The list of rules.
   */
  public parseRules(rules: string[][]) {
    for (let i = 0, rule; (rule = rules[i]); i++) {
      const type = rule[0];
      const method = this.parseMethods[type];
      if (type && method) {
        method.apply(this, rule.slice(1));
      }
    }
  }

  /**
   * Parses rules generated by the given generator function.
   *
   * @param generator Name of the generator function.
   */
  public generateRules(generator: string) {
    const method = this.context.customGenerators.lookup(generator);
    if (method) {
      method(this);
    }
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
    const prec = this.getFullPreconditions(name);
    if (!prec) {
      console.error(`Action Error: No precondition for action ${name}`);
      return;
    }
    // Overwrite previously defined rules!
    this.ignoreRules(name);
    const regexp = new RegExp(
      '^\\w+\\.\\w+\\.' + (this.domain ? '\\w+\\.' : '')
    );
    prec.conditions.forEach(([dynamic, prec]) => {
      // TODO: Work this out wrt. domain.
      const newDynamic = this.parseCstr(dynamic.toString().replace(regexp, ''));
      this.addRule(new SpeechRule(name, newDynamic, prec, postc));
    });
  }

  /**
   * Returns a precondition from this or an inherited store, if one exists.
   *
   * @param name The name of the condition.
   * @returns The condition.
   */
  public getFullPreconditions(name: string): Condition {
    const prec = this.preconditions.get(name);
    if (prec || !this.inherits) {
      return prec;
    }
    return this.inherits.getFullPreconditions(name);
  }

  /**
   * @override
   */
  public definePrecondition(
    name: string,
    dynamic: string,
    prec: string,
    ...args: string[]
  ) {
    const fullPrec = this.parsePrecondition(prec, args);
    const dynamicCstr = this.parseCstr(dynamic);
    if (!(fullPrec && dynamicCstr)) {
      console.error(`Precondition Error: ${prec}, (${dynamic})`);
      return;
    }
    fullPrec.rank = this.rank++;
    this.preconditions.set(name, new Condition(dynamicCstr, fullPrec));
  }

  /**
   * Implements rule inheritance.
   */
  public inheritRules() {
    if (!this.inherits || !this.inherits.getSpeechRules().length) {
      return;
    }
    const regexp = new RegExp(
      '^\\w+\\.\\w+\\.' + (this.domain ? '\\w+\\.' : '')
    );
    this.inherits.getSpeechRules().forEach((rule) => {
      // TODO: Work this out wrt. domain.
      const newDynamic = this.parseCstr(
        rule.dynamicCstr.toString().replace(regexp, '')
      );
      this.addRule(
        new SpeechRule(rule.name, newDynamic, rule.precondition, rule.action)
      );
    });
  }

  /**
   * Deletes rules from the current store. This is important for omitting
   * inherited elements.
   *
   * @param name The name of the rule to be deleted.
   * @param cstrs The rest constraints of the rule.
   */
  public ignoreRules(name: string, ...cstrs: string[]) {
    let rules = this.findAllRules((r: SpeechRule) => r.name === name);
    if (!cstrs.length) {
      rules.forEach(this.deleteRule.bind(this));
      return;
    }
    let rest = [];
    for (const cstr of cstrs) {
      const dynamic = this.parseCstr(cstr);
      for (const rule of rules) {
        if (dynamic.equal(rule.dynamicCstr)) {
          this.deleteRule(rule);
        } else {
          rest.push(rule);
        }
      }
      rules = rest;
      rest = [];
    }
  }

  /**
   * Resolves a single precondition constraint.
   *
   * @param cstr The precondition constraint.
   * @returns Array of constraints, possibly generated.
   */
  private parsePrecondition_(cstr: string): string[] {
    const generator = this.context.customGenerators.lookup(cstr);
    return generator ? (generator() as string[]) : [cstr];
  }
}

// Conditions are clusters of preconditions that are used to define rules via
// actions.
class Condition {
  private _conditions: [DynamicCstr, Precondition][] = [];

  private constraints: DynamicCstr[] = [];

  private allCstr: { [cond: string]: boolean } = {};

  /**
   * Constructs a rule condition.
   *
   * @param base The dynamic base constraint.
   * @param condition The remaining precondition constraints.
   */
  constructor(
    private base: DynamicCstr,
    condition: Precondition
  ) {
    this.constraints.push(base);
    this.addCondition(base, condition);
  }

  public get conditions() {
    return this._conditions;
  }

  /**
   * Adds a dynamic constraint to a condition. This simply inherits the already
   * given preconditions.
   *
   * @param dynamic The dynamic constraint.
   */
  public addConstraint(dynamic: DynamicCstr) {
    if (this.constraints.filter((cstr) => cstr.equal(dynamic)).length) {
      return;
    }
    this.constraints.push(dynamic);
    const newConds: [DynamicCstr, Precondition][] = [];
    for (const [dyn, pre] of this.conditions) {
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
    this.constraints.forEach((cstr) => this.addCondition(cstr, cond));
  }

  private addCondition(dynamic: DynamicCstr, cond: Precondition) {
    const condStr = dynamic.toString() + ' ' + cond.toString();
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
  inherits?: string;
  functions?: { [key: string]: SpeechRuleFunction };
  rules?: any[];
  annotators?: any[];
}

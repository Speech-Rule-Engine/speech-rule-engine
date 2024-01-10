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
 * @file Rule store for math syntax tree nodes.
 * @author sorge@google.com (Volker Sorge)
 */

import { AuditoryDescription } from '../audio/auditory_description.js';
import * as BaseUtil from '../common/base_util.js';
import { LOCALE } from '../l10n/locale.js';
import { activate } from '../semantic_tree/semantic_annotations.js';
import { BaseRuleStore, RulesJson } from './base_rule_store.js';
import { Action, OutputError, SpeechRule } from './speech_rule.js';

export class MathStore extends BaseRuleStore {
  /**
   * A list of annotators and visitors.
   */
  public annotators: string[] = [];

  /**
   * A store for Math rules.
   */
  constructor() {
    super();

    this.parseMethods['Alias'] = this.defineAlias;
    this.parseMethods['SpecializedRule'] = this.defineSpecializedRule;
    this.parseMethods['Specialized'] = this.defineSpecialized;
  }

  /**
   * @override
   */
  public initialize() {
    if (this.initialized) {
      return;
    }
    this.annotations();
    this.initialized = true;
  }

  /**
   * Activates annotators.
   */
  public annotations() {
    for (let i = 0, annotator; (annotator = this.annotators[i]); i++) {
      activate(this.domain, annotator);
    }
  }

  /**
   * Adds an alias for an existing precondition.
   *
   * @param name The name of the precondition.
   * @param prec Precondition query of the rule.
   * @param args Additional static precondition constraints.
   */
  public defineAlias(name: string, prec: string, ...args: string[]) {
    const fullPrec = this.parsePrecondition(prec, args);
    if (!fullPrec) {
      console.error(`Precondition Error: ${prec} ${args}`);
      return;
    }
    const condition = this.preconditions.get(name);
    if (!condition) {
      console.error(`Alias Error: No precondition by the name of ${name}`);
      return;
    }
    condition.addFullCondition(fullPrec);
  }

  /**
   * Adds an alias for an existing rule.
   *
   * @param name The name of the rule.
   * @param query Precondition query of the rule.
   * @param args Additional static precondition constraints.
   */
  public defineRulesAlias(name: string, query: string, ...args: string[]) {
    const rules = this.findAllRules(function (rule) {
      return rule.name === name;
    });
    if (rules.length === 0) {
      throw new OutputError('Rule with name ' + name + ' does not exist.');
    }
    const keep: { cstr: string; action: string }[] = [];
    const findKeep = (rule: SpeechRule) => {
      const cstr = rule.dynamicCstr.toString();
      const action = rule.action.toString();
      for (let i = 0, k; (k = keep[i]); i++) {
        if (k.action === action && k.cstr === cstr) {
          return false;
        }
      }
      keep.push({ cstr: cstr, action: action });
      return true;
    };
    rules.forEach((rule) => {
      if (findKeep(rule)) {
        this.addAlias_(rule, query, args);
      }
    });
  }

  /**
   * Duplicates a speech rule for the old dynamic constraint for a new dynamic
   * constraint, keeping the same precondition, while possibly adding a new
   * action.
   *
   * @param name The name of the rule.
   * @param oldDynamic The old math domain and style assignment.
   * @param newDynamic The new math domain and style assignment.
   * @param opt_action String version of the speech rule.
   */
  public defineSpecializedRule(
    name: string,
    oldDynamic: string,
    newDynamic: string,
    opt_action?: string
  ) {
    const dynamicCstr = this.parseCstr(oldDynamic);
    const rule = this.findRule(
      (rule) => rule.name === name && dynamicCstr.equal(rule.dynamicCstr)
    );
    const newCstr = this.parseCstr(newDynamic);
    if (!rule && opt_action) {
      throw new OutputError(
        'Rule named ' + name + ' with style ' + oldDynamic + ' does not exist.'
      );
    }
    const action = opt_action ? Action.fromString(opt_action) : rule.action;
    const newRule = new SpeechRule(
      rule.name,
      newCstr,
      rule.precondition,
      action
    );
    this.addRule(newRule);
  }

  /**
   * Adds a specialization for a given precondition.
   *
   * @param name The name of the rule.
   * @param _old The old dynamic constraint.
   * @param dynamic The new dynamic constraint.
   */
  public defineSpecialized(name: string, _old: string, dynamic: string) {
    const cstr = this.parseCstr(dynamic);
    if (!cstr) {
      console.error(`Dynamic Constraint Error: ${dynamic}`);
      return;
    }
    const condition = this.preconditions.get(name);
    if (!condition) {
      console.error(`Alias Error: No precondition by the name of ${name}`);
      return;
    }
    condition.addConstraint(cstr);
  }

  // Evaluator
  /**
   * Evaluates a single string of a math expressions. The method splits the
   * given string into components such as single characters, function names or
   * words, numbers, etc. and creates the appropriate auditory descriptions.
   *
   * @override
   */
  public evaluateString(str: string) {
    const descs: AuditoryDescription[] = [];
    if (str.match(/^\s+$/)) {
      // Nothing but whitespace: Ignore.
      return descs;
    }
    // Case of numbers with whitespace for separation.
    let num = this.matchNumber(str);
    if (num && num.length === str.length) {
      descs.push(this.evaluateCharacter(num.number));
      return descs;
    }
    const split = BaseUtil.removeEmpty(str.replace(/\s/g, ' ').split(' '));
    for (let i = 0, s; (s = split[i]); i++) {
      if (s.length === 1) {
        descs.push(this.evaluateCharacter(s));
      } else if (
        s.match(new RegExp('^[' + LOCALE.MESSAGES.regexp.TEXT + ']+$'))
      ) {
        descs.push(this.evaluateCharacter(s));
      } else {
        // Break up string even further wrt. symbols vs alphanum substrings.
        let rest = s;
        while (rest) {
          num = this.matchNumber(rest);
          const alpha = rest.match(
            new RegExp('^[' + LOCALE.MESSAGES.regexp.TEXT + ']+')
          );
          if (num) {
            descs.push(this.evaluateCharacter(num.number));
            rest = rest.substring(num.length);
          } else if (alpha) {
            descs.push(this.evaluateCharacter(alpha[0]));
            rest = rest.substring(alpha[0].length);
          } else {
            const chars = Array.from(rest);
            const chr = chars[0];
            descs.push(this.evaluateCharacter(chr));
            rest = chars.slice(1).join('');
          }
        }
      }
    }
    return descs;
  }

  /**
   * @override
   */
  public parse(ruleSet: RulesJson) {
    super.parse(ruleSet);
    this.annotators = ruleSet['annotators'] || ([] as string[]);
  }

  /**
   * Adds a new speech rule as alias of the given rule.
   *
   * @param rule The existing rule.
   * @param query Precondition query of the rule.
   * @param cstrList List of additional constraints.
   */
  private addAlias_(rule: SpeechRule, query: string, cstrList: string[]) {
    const prec = this.parsePrecondition(query, cstrList);
    const newRule = new SpeechRule(
      rule.name,
      rule.dynamicCstr,
      prec,
      rule.action
    );
    newRule.name = rule.name;
    this.addRule(newRule);
  }

  static regexp = {
    'NUMBER': '((\\d{1,3})(?=(,| ))((,| )\\d{3})*(\\.\\d+)?)|^\\d*\\.\\d+|^\\d+',
    'DECIMAL_MARK': '\\.',
    'DIGIT_GROUP': ','
  };

  /**
   * Matches a number with respect to locale. If it discovers it is a number in
   * English writing, it will attempt to translate it.
   *
   * @param str The string to match.
   * @returns The number and its length.
   */
  protected matchNumber(str: string): { number: string; length: number } | null {
    const locNum = str.match(new RegExp('^' + LOCALE.MESSAGES.regexp['NUMBER']));
    const enNum = str.match(new RegExp('^' + MathStore.regexp.NUMBER));
    if (!locNum && !enNum) {
      return null;
    }
    const isEn = enNum && enNum[0] === str;
    const isLoc = (locNum && locNum[0] === str) || !isEn;
    if (isLoc) {
      return locNum ? { number: locNum[0], length: locNum[0].length } : null;
    }
    const num = enNum[0]
      .replace(new RegExp(MathStore.regexp.DIGIT_GROUP, 'g'), 'X')
      .replace(
        new RegExp(MathStore.regexp.DECIMAL_MARK, 'g'),
        LOCALE.MESSAGES.regexp['DECIMAL_MARK']
      )
      .replace(/X/g, LOCALE.MESSAGES.regexp['DIGIT_GROUP'].replace(/\\/g, ''));
    return { number: num, length: enNum[0].length };
  }
}

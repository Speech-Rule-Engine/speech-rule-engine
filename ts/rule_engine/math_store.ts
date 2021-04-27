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
 * @fileoverview Rule store for math syntax tree nodes.
 * @author sorge@google.com (Volker Sorge)
 */


import * as BaseUtil from '../common/base_util';
import {en} from '../l10n/locale_en';
import * as Messages from '../l10n/messages';

import {BaseRuleStore} from './base_rule_store';
import {SpeechRule} from './speech_rule';



/**
 * A store for Math rules.
 */
export class MathStore extends sre.BaseRuleStore {
  annotators: string[] = [];
  initialized: any;
  constructor() {
    super();

    this.parseMethods['Alias'] = goog.bind(this.defineRuleAlias, this);
    this.parseMethods['Aliases'] = goog.bind(this.defineRulesAlias, this);
    this.parseMethods['UniqueAlias'] =
        goog.bind(this.defineUniqueRuleAlias, this);
    this.parseMethods['SpecializedRule'] =
        goog.bind(this.defineSpecialisedRule, this);
  }


  /**
   * @override
   */
  initialize() {
    if (this.initialized) {
      return;
    }
    this.annotations();
    this.setSpeechRules(this.trie.collectRules());
    this.initialized = true;
  }


  /**
   * Activates annotators.
   */
  annotations() {
    for (let i = 0, annotator; annotator = this.annotators[i]; i++) {
      sre.SemanticAnnotations.getInstance().activate(this.domain, annotator);
    }
  }


  /**
   * Adds an alias for an existing rule.
   * @param name The name of the rule.
   * @param dynamic A math domain and style assignment.
   * @param query Precondition query of the rule.
   * @param var_args Additional static precondition constraints.
   */
  defineUniqueRuleAlias(
      name: string, dynamic: string, query: string, ...var_args: string[]) {
    let dynamicCstr = this.parseCstr(dynamic);
    let rule = this.findRule(goog.bind(function(rule) {
      return rule.name == name && dynamicCstr.equal(rule.dynamicCstr);
    }, this));
    if (!rule) {
      throw new SpeechRule.OutputError(
          'Rule named ' + name + ' with style ' + dynamic + ' does not exist.');
    }
    this.addAlias_(rule, query, Array.prototype.slice.call(arguments, 3));
  }


  // TODO: Possibly defines a number of duplicate rules.
  // (E.g., superscript-baseline in Mathspeak)
  // These are automatically discarded in the Trie, but might still be
  // worthwhile looking into the definition methods.
  /**
   * Adds an alias for an existing rule.
   * @param name The name of the rule.
   * @param query Precondition query of the rule.
   * @param var_args Additional static precondition constraints.
   */
  defineRuleAlias(name: string, query: string, ...var_args: string[]) {
    let rule = this.findRule(function(rule) {
      return rule.name == name;
    });
    if (!rule) {
      throw new SpeechRule.OutputError(
          'Rule with named ' + name + ' does not exist.');
    }
    this.addAlias_(rule, query, Array.prototype.slice.call(arguments, 2));
  }


  /**
   * Adds an alias for an existing rule.
   * @param name The name of the rule.
   * @param query Precondition query of the rule.
   * @param var_args Additional static precondition constraints.
   */
  defineRulesAlias(name: string, query: string, ...var_args: string[]) {
    let rules = this.findAllRules(function(rule) {
      return rule.name == name;
    });
    if (rules.length == 0) {
      throw new SpeechRule.OutputError(
          'Rule with name ' + name + ' does not exist.');
    }
    let cstrList = Array.prototype.slice.call(arguments, 2);
    let keep = [];
    let findKeep = function(rule) {
      let cstr = rule.dynamicCstr.toString();
      let action = rule.action.toString();
      for (let i = 0, k; k = keep[i]; i++) {
        if (k.action === action && k.cstr === cstr) {
          return false;
        }
      }
      keep.push({cstr: cstr, action: action});
      return true;
    };
    rules.forEach(goog.bind(function(rule) {
      if (findKeep(rule)) {
        this.addAlias_(rule, query, cstrList);
      }
    }, this));
  }


  /**
   * Adds a new speech rule as alias of the given rule.
   * @param rule The existing rule.
   * @param query Precondition query of the rule.
   * @param cstrList List of additional constraints.
   */
  private addAlias_(rule: SpeechRule, query: string, cstrList: string[]) {
    let prec = this.parsePrecondition(query, cstrList);
    let newRule =
        new SpeechRule(rule.name, rule.dynamicCstr, prec, rule.action);
    newRule.name = rule.name;
    this.addRule(newRule);
  }


  /**
   * Duplicates a speech rule for the old dynamic constraint for a new dynamic
   * constraint, keeping the same precondition, while possibly adding a new
   * action.
   * @param name The name of the rule.
   * @param oldDynamic The old math domain and style assignment.
   * @param newDynamic The new math domain and style assignment.
   * @param opt_action String version of the speech rule.
   */
  defineSpecialisedRule(
      name: string, oldDynamic: string, newDynamic: string,
      opt_action?: string) {
    let dynamicCstr = this.parseCstr(oldDynamic);
    let rule = this.findRule(goog.bind(function(rule) {
      return rule.name == name && dynamicCstr.equal(rule.dynamicCstr);
    }, this));
    if (!rule) {
      throw new SpeechRule.OutputError(
          'Rule named ' + name + ' with style ' + oldDynamic +
          ' does not exist.');
    }
    let newCstr = this.parseCstr(newDynamic);
    let action =
        opt_action ? SpeechRule.Action.fromString(opt_action) : rule.action;
    let newRule = new SpeechRule(rule.name, newCstr, rule.precondition, action);
    this.addRule(newRule);
  }


  // Evaluator
  /**
   * Evaluates a single string of a math expressions. The method splits the
   * given string into components such as single characters, function names or
   * words, numbers, etc. and creates the appropriate auditory descriptions.
   * @override
   */
  evaluateString(str) {
    let descs = new Array();
    if (str.match(/^\s+$/)) {
      // Nothing but whitespace: Ignore.
      return descs;
    }
    // Case of numbers with whitespace for separation.
    let num = this.matchNumber_(str);
    if (num && num.length === str.length) {
      descs.push(this.evaluateCharacter(num.number));
      return descs;
    }
    let split = BaseUtil.removeEmpty(str.replace(/\s/g, ' ').split(' '));
    for (let i = 0, s; s = split[i]; i++) {
      if (s.length == 1) {
        descs.push(this.evaluateCharacter(s));
      } else if (s.match(new RegExp('^[' + Messages.REGEXP.TEXT + ']+$'))) {
        descs.push(this.evaluateCharacter(s));
      } else {
        // Break up string even further wrt. symbols vs alphanum substrings.
        let rest = s;
        while (rest) {
          num = this.matchNumber_(rest);
          let alpha =
              rest.match(new RegExp('^[' + Messages.REGEXP.TEXT + ']+'));
          if (num) {
            descs.push(this.evaluateCharacter(num.number));
            rest = rest.substring(num.length);
          } else if (alpha) {
            descs.push(this.evaluateCharacter(alpha[0]));
            rest = rest.substring(alpha[0].length);
          } else {
            let chars = Array.from(rest);
            let chr = chars[0];
            descs.push(this.evaluateCharacter(chr));
            rest = chars.slice(1).join('');
          }
        }
      }
    }
    return descs;
  }


  /**
   * Matches a number with respect to locale. If it discovers it is a number in
   * English writing, it will attempt to translate it.
   * @param str The string to match.
   * @return The number and its length.
   */
  private matchNumber_(str: string): {number: string, length: number}|null {
    let locNum = str.match(new RegExp('^' + Messages.REGEXP.NUMBER));
    let enNum = str.match(new RegExp('^' + en.REGEXP.NUMBER));
    if (!locNum && !enNum) {
      return null;
    }
    let isEn = enNum && enNum[0] === str;
    let isLoc = locNum && locNum[0] === str || !isEn;
    if (isLoc) {
      return locNum ? {number: locNum[0], length: locNum[0].length} : null;
    }
    let number =
        enNum[0]
            .replace(new RegExp(en.REGEXP.DIGIT_GROUP, 'g'), 'X')
            .replace(
                new RegExp(en.REGEXP.DECIMAL_MARK, 'g'),
                Messages.REGEXP.DECIMAL_MARK)
            .replace(/X/g, Messages.REGEXP.DIGIT_GROUP.replace(/\\/g, ''));
    return {number: number, length: enNum[0].length};
  }


  /**
   * @override
   */
  parse(ruleSet) {
    super.parse(ruleSet);
    this.annotators = (ruleSet['annotators'] || [] as string[]);
  }
}

goog.inherits(MathStore, BaseRuleStore);

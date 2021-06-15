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
import {en} from '../l10n/locales/locale_en';
import {LOCALE} from '../l10n/locale';
import {SemanticAnnotations} from '../semantic_tree/semantic_annotations';
import {BaseRuleStore, RulesJson} from './base_rule_store';
import {Action, OutputError, SpeechRule} from './speech_rule';


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

    this.parseMethods['Alias'] = this.defineRuleAlias.bind(this);
    this.parseMethods['Aliases'] = this.defineRulesAlias.bind(this);
    this.parseMethods['UniqueAlias'] = this.defineUniqueRuleAlias.bind(this);
    this.parseMethods['SpecializedRule'] =
      this.defineSpecialisedRule.bind(this);
  }


  /**
   * @override
   */
  public initialize() {
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
  public annotations() {
    for (let i = 0, annotator; annotator = this.annotators[i]; i++) {
      SemanticAnnotations.activate(this.domain, annotator);
    }
  }


  /**
   * Adds an alias for an existing rule.
   * @param name The name of the rule.
   * @param dynamic A math domain and style assignment.
   * @param query Precondition query of the rule.
   * @param args Additional static precondition constraints.
   */
  public defineUniqueRuleAlias(
      name: string, dynamic: string, query: string, ...args: string[]) {
    let dynamicCstr = this.parseCstr(dynamic);
    let rule = this.findRule(
        rule => rule.name === name && dynamicCstr.equal(rule.dynamicCstr));
    if (!rule) {
      throw new OutputError(
          'Rule named ' + name + ' with style ' + dynamic + ' does not exist.');
    }
    this.addAlias_(rule, query, args);
  }


  // TODO: Possibly defines a number of duplicate rules.
  // (E.g., superscript-baseline in Mathspeak)
  // These are automatically discarded in the Trie, but might still be
  // worthwhile looking into the definition methods.
  /**
   * Adds an alias for an existing rule.
   * @param name The name of the rule.
   * @param query Precondition query of the rule.
   * @param args Additional static precondition constraints.
   */
  public defineRuleAlias(name: string, query: string, ...args: string[]) {
    let rule = this.findRule(function(rule) {
      return rule.name === name;
    });
    if (!rule) {
      throw new OutputError(
          'Rule with named ' + name + ' does not exist.');
    }
    this.addAlias_(rule, query, args);
  }


  /**
   * Adds an alias for an existing rule.
   * @param name The name of the rule.
   * @param query Precondition query of the rule.
   * @param args Additional static precondition constraints.
   */
  public defineRulesAlias(name: string, query: string, ...args: string[]) {
    let rules = this.findAllRules(function(rule) {
      return rule.name === name;
    });
    if (rules.length === 0) {
      throw new OutputError(
          'Rule with name ' + name + ' does not exist.');
    }
    let keep: {cstr: string, action: string}[] = [];
    let findKeep = (rule: SpeechRule) => {
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
   * @param name The name of the rule.
   * @param oldDynamic The old math domain and style assignment.
   * @param newDynamic The new math domain and style assignment.
   * @param opt_action String version of the speech rule.
   */
  public defineSpecialisedRule(
      name: string, oldDynamic: string, newDynamic: string,
      opt_action?: string) {
    let dynamicCstr = this.parseCstr(oldDynamic);
    let rule = this.findRule(
      rule => rule.name === name && dynamicCstr.equal(rule.dynamicCstr));
    if (!rule) {
      throw new OutputError(
          'Rule named ' + name + ' with style ' + oldDynamic +
          ' does not exist.');
    }
    let newCstr = this.parseCstr(newDynamic);
    let action =
        opt_action ? Action.fromString(opt_action) : rule.action;
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
  public evaluateString(str: string) {
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
      if (s.length === 1) {
        descs.push(this.evaluateCharacter(s));
      } else if (s.match(new RegExp('^[' + LOCALE.MESSAGES.regexp.TEXT + ']+$'))) {
        descs.push(this.evaluateCharacter(s));
      } else {
        // Break up string even further wrt. symbols vs alphanum substrings.
        let rest = s;
        while (rest) {
          num = this.matchNumber_(rest);
          let alpha =
              rest.match(new RegExp('^[' + LOCALE.MESSAGES.regexp.TEXT + ']+'));
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
   * @override
   */
  public parse(ruleSet: RulesJson) {
    super.parse(ruleSet);
    this.annotators = (ruleSet['annotators'] || [] as string[]);
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
   * Matches a number with respect to locale. If it discovers it is a number in
   * English writing, it will attempt to translate it.
   * @param str The string to match.
   * @return The number and its length.
   */
  private matchNumber_(str: string): {number: string, length: number}|null {
    let locNum = str.match(new RegExp('^' + LOCALE.MESSAGES.regexp.NUMBER));
    let enNum = str.match(new RegExp('^' + en.MESSAGES.regexp.NUMBER));
    if (!locNum && !enNum) {
      return null;
    }
    let isEn = enNum && enNum[0] === str;
    let isLoc = locNum && locNum[0] === str || !isEn;
    if (isLoc) {
      return locNum ? {number: locNum[0], length: locNum[0].length} : null;
    }
    let num =
        enNum[0]
            .replace(new RegExp(en.MESSAGES.regexp.DIGIT_GROUP, 'g'), 'X')
            .replace(
                new RegExp(en.MESSAGES.regexp.DECIMAL_MARK, 'g'),
                LOCALE.MESSAGES.regexp.DECIMAL_MARK)
            .replace(/X/g, LOCALE.MESSAGES.regexp.DIGIT_GROUP.replace(/\\/g, ''));
    return {number: num, length: enNum[0].length};
  }

}


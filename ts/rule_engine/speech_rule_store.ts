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
 * @file Base interface for all speech rule stores.
 *
 * A speech rule store exposes the minimal set of methods a speech rule
 * author needs for a particular markup type such as MathML or HTML
 * (definition). A rule provider also acts as the permanent and authoritative
 * store for all rules for such markup (lookup).
 * @author dtseng@google.com (David Tseng)
 */

import { SpeechRule } from './speech_rule.js';
import { SpeechRuleContext } from './speech_rule_context.js';

export interface SpeechRuleStore {
  /**
   * Context for custom functions of this rule store.
   */
  context: SpeechRuleContext;

  /**
   * Adds a new speech rule.
   *
   * @param rule The speech rule to be added.
   */
  addRule(rule: SpeechRule): void;

  /**
   * Deletes a speech rule if it exists.
   *
   * @param rule The speech rule to be deleted.
   */
  deleteRule(rule: SpeechRule): void;

  /**
   * Retrieves the first rule satisfying a given predicate.
   *
   * @param pred A predicate on speech rules.
   * @returns The first speech rule in the store satisfying pred.
   */
  findRule(pred: (rule: SpeechRule) => boolean): SpeechRule;

  /**
   * Retrieves all rules satisfying a given predicate.
   *
   * @param pred A predicate on speech rules.
   * @returns All speech rules in the store satisfying
   *     pred.
   */
  findAllRules(pred: (rule: SpeechRule) => boolean): SpeechRule[];

  /**
   * Defines a new speech rule from given components.
   *
   * @param name Name of the rule. It does not have to be unique.
   * @param dynamic Dynamic constraint annotation of the rule.
   * @param action String version of the speech rule.
   * @param pre Precondition of the rule.
   * @param args Additional constraints.
   * @returns The newly defined rule.
   */
  defineRule(
    name: string,
    dynamic: string,
    action: string,
    pre: string,
    ...args: string[]
  ): SpeechRule;
}

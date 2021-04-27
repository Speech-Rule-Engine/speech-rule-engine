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
 * @fileoverview Base interface for all speech rule stores.
 *
 * A speech rule store exposes the minimal set of methods a speech rule
 * author needs for a particular markup type such as MathML or HTML
 * (definition). A rule provider also acts as the permanent and authoritative
 * store for all rules for such markup (lookup).
 * @author dtseng@google.com (David Tseng)
 */


export interface SpeechRuleStore {
  addRule: any;


  deleteRule: any;


  findRule: any;


  findAllRules: any;


  lookupRule: any;


  defineRule: any;
}
/**
 * Adds a new speech rule.
 * @param rule The speech rule to be added.
 */
SpeechRuleStore.prototype.addRule = goog.abstractMethod;
/**
 * Deletes a speech rule if it exists.
 * @param rule The speech rule to be deleted.
 */
SpeechRuleStore.prototype.deleteRule = goog.abstractMethod;
/**
 * Retrieves the first rule satisfying a given predicate.
 * @param pred A predicate on speech rules.
 * @return The first speech rule in the store satisfying pred.
 */
SpeechRuleStore.prototype.findRule = goog.abstractMethod;
/**
 * Retrieves all rules satisfying a given predicate.
 * @param pred A predicate on speech rules.
 * @return All speech rules in the store satisfying
 *     pred.
 */
SpeechRuleStore.prototype.findAllRules = goog.abstractMethod;
/**
 * Retrieves a rule for the given node if one exists.
 * @param node A node.
 * @param dynamic Additional dynamic
 *     constraints. These are matched against properties of a rule.
 * @return The speech rule if an applicable one exists.
 */
SpeechRuleStore.prototype.lookupRule = goog.abstractMethod;
/**
 * Defines a new speech rule from given components.
 * @param name Name of the rule. It does not have to be unique.
 * @param dynamic Dynamic constraint annotation of the rule.
 * @param action String version of the speech rule.
 * @param prec Precondition of the rule.
 * @param var_args Additional constraints.
 * @return The newly defined rule.
 */
SpeechRuleStore.prototype.defineRule = goog.abstractMethod;

// Copyright 2013 Google Inc.
// Copyright 2014 Volker Sorge
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

goog.provide('sre.SpeechRuleStore');



/**
 * @interface
 */
sre.SpeechRuleStore = goog.abstractMethod;


/**
 * Adds a new speech rule.
 * @param {sre.SpeechRule} rule The speech rule to be added.
 */
sre.SpeechRuleStore.prototype.addRule = goog.abstractMethod;


/**
 * Deletes a speech rule if it exists.
 * @param {sre.SpeechRule} rule The speech rule to be deleted.
 */
sre.SpeechRuleStore.prototype.deleteRule = goog.abstractMethod;


/**
 * Retrieves the first rule satisfying a given predicate.
 * @param {function(sre.SpeechRule): boolean} pred A predicate on speech rules.
 * @return {sre.SpeechRule} The first speech rule in the store satisfying pred.
 */
sre.SpeechRuleStore.prototype.findRule = goog.abstractMethod;


/**
 * Retrieves all rules satisfying a given predicate.
 * @param {function(sre.SpeechRule): boolean} pred A predicate on speech rules.
 * @return {Array.<sre.SpeechRule>} All speech rules in the store satisfying
 *     pred.
 */
sre.SpeechRuleStore.prototype.findAllRules = goog.abstractMethod;


/**
 * Retrieves a rule for the given node if one exists.
 * @param {Node} node A node.
 * @param {!sre.SpeechRule.DynamicCstr} dynamic Additional dynamic
 *     constraints. These are matched against properties of a rule.
 * @return {sre.SpeechRule} The actions of the speech rule if it exists.
 */
sre.SpeechRuleStore.prototype.lookupRule = goog.abstractMethod;


// TODO(sorge): Propagate this documentation *everywhere* once these
// args/descriptions are hardened/cleared up.
/**
 * Defines a new speech rule from given components.
 * @param {string} name Name of the rule. It does not have to be unique.
 * @param {string} dynamic Dynamic constraint annotation of the rule.
 * @param {string} action String version of the speech rule.
 * @param {string} prec Precondition of the rule.
 * @param {...string} var_args Additional constraints.
 * @return {sre.SpeechRule} The newly defined rule.
 */
sre.SpeechRuleStore.prototype.defineRule = goog.abstractMethod;

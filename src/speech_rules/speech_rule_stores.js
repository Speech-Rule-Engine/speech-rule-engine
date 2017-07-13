// Copyright 2016 Volker Sorge
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
 * @fileoverview Combines all implemented and available speech rules.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.SpeechRuleStores');

goog.require('sre.AbstractionRules');
goog.require('sre.BaseRuleStore');
goog.require('sre.ClearspeakRules');
goog.require('sre.EmacspeakRules');
goog.require('sre.MathmlStoreRules');
goog.require('sre.MathspeakRules');
goog.require('sre.PrefixRules');
goog.require('sre.SemanticTreeRules');


/**
 * @type {!Object.<sre.BaseRuleStore>}
 * @private
 */
sre.SpeechRuleStores.RULE_SETS_ = {
  'MathmlStoreRules': sre.MathmlStoreRules,
  'SemanticTreeRules': sre.SemanticTreeRules,
  'MathspeakRules': sre.MathspeakRules,
  'ClearspeakRules': sre.ClearspeakRules,
  'EmacspeakRules': sre.EmacspeakRules,
  'AbstractionRules': sre.AbstractionRules,
  'PrefixRules': sre.PrefixRules
};


/**
 * @return {Array.<string>} A list of all rule set names.
 */
sre.SpeechRuleStores.availableSets = function() {
  return Object.keys(sre.SpeechRuleStores.RULE_SETS_);
};


/**
 * Retrieves a constructor of a valid rule set.
 * @param {string} name The name of the rule set.
 * @return {sre.BaseRuleStore} The constructor of the rule store.
 */
sre.SpeechRuleStores.getConstructor = function(name) {
  var set = sre.SpeechRuleStores.RULE_SETS_[name];
  return set ? set : null;
};

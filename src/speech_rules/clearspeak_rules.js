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
 * @fileoverview Clearspeak rules.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.ClearspeakRules');

goog.require('sre.MathStore');
goog.require('sre.MathmlStore');
goog.require('sre.StoreUtil');


/**
 * Rule initialization.
 * @constructor
 */
sre.ClearspeakRules = function() {
  // sre.ClearspeakRules.initCustomFunctions_();
  sre.ClearspeakRules.initClearspeakRules_();
};
goog.addSingletonGetter(sre.ClearspeakRules);


/**
 * @type {sre.MathStore}
 */
sre.ClearspeakRules.mathStore = sre.MathmlStore.getInstance();


/** @private */
sre.ClearspeakRules.defineRule_ = goog.bind(
    sre.ClearspeakRules.mathStore.defineRule,
    sre.ClearspeakRules.mathStore);



goog.scope(function() {
var defineRule = sre.ClearspeakRules.defineRule_;
/**
 * Clearspeak rules.
 * @private
*/
sre.ClearspeakRules.initClearspeakRules_ = function() {
    defineRule(
      'fraction', 'mathspeak.clearspeak',
      '[t] "the fraction with numerator"; [n] children/*[1];' +
          ' [t] "and denominator"; [n] children/*[2]',
      'self::fraction');
  defineRule(
      'sqrt', 'mathspeak.clearspeak',
      '[t] "the square root of"; [n] children/*[1]; [p] (pause:100)',
      'self::sqrt');

};

});  // goog.scope

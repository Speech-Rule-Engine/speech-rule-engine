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



//TODO: (MOSS) WP 2.2
// * Turn into a proper rule store rather than a mathspeak style
// * Implement rules from http://www.dessci.com/en/reference/ies-ets/
// * Implement preference settings
//
/**
 * Rule initialization.
 * @constructor
 * @extends {sre.MathStore}
 */
sre.ClearspeakRules = function() {
  sre.ClearspeakRules.base(this, 'constructor');
};
goog.inherits(sre.ClearspeakRules, sre.MathStore);
goog.addSingletonGetter(sre.ClearspeakRules);


/**
 * @type {sre.MathStore}
 */
sre.ClearspeakRules.mathStore = sre.ClearspeakRules.getInstance();


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

  // Initial rule
  defineRule(
      'stree', 'clearspeak.default',
      '[n] ./*[1]', 'self::stree');

  defineRule(
      'fraction', 'clearspeak.default',
      '[t] "the fraction with numerator"; [n] children/*[1]; [p] (pause:300);' +
          ' [t] "and denominator"; [n] children/*[2]; [p] (pause:500)',
      'self::fraction');
  defineRule(
      'sqrt', 'clearspeak.default',
      '[t] "the square root of"; [n] children/*[1]; [p] (pause:500)',
    'self::sqrt');

  // Named sets
  defineRule(
    'real-number', 'clearspeak.default',
    '[t] "the real numbers"', 'self::identifier',
    'text()="\u211D" or (text()="R" and @font="double-struck")');
  defineRule(
    'complex-number', 'clearspeak.default',
    '[t] "the complex numbers"', 'self::identifier',
    'text()="\u2102" or (text()="C" and @font="double-struck")');


  defineRule(
    'real-number-super', 'clearspeak.default',
    '[t] "r-"; [n] children/*[2]',
    'self::superscript', 'children/*[1]/text()="\u211D"' +
      ' or (children/*[1]/text()="R" and @font="double-struck")');
};

});  // goog.scope


sre.ClearspeakRules.getInstance().initializer = [
  // sre.ClearspeakRules.initCustomFunctions_();
  sre.ClearspeakRules.initClearspeakRules_
];

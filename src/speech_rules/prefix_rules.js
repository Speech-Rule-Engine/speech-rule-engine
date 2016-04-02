// Copyright 2016 Volker Sorge
// Copyright (c) 2016 The MathJax Consortium
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
 * @fileoverview Prefix rules.
 * @author v.sorge@mathjax.com (Volker Sorge)
 */

goog.provide('sre.PrefixRules');

goog.require('sre.MathStore');
goog.require('sre.MathmlStore');
goog.require('sre.StoreUtil');



/**
 * Rule initialization.
 * @constructor
 */
sre.PrefixRules = function() {
  // sre.PrefixRules.initCustomFunctions_();
  sre.PrefixRules.initPrefixRules_();
};
goog.addSingletonGetter(sre.PrefixRules);


/**
 * @type {sre.MathStore}
 */
sre.PrefixRules.mathStore = sre.MathmlStore.getInstance();


/** @private */
sre.PrefixRules.defineRule_ = goog.bind(
    sre.PrefixRules.mathStore.defineRule,
    sre.PrefixRules.mathStore);



goog.scope(function() {
var defineRule = sre.PrefixRules.defineRule_;


/**
 * Prefix rules.
 * @private
*/
sre.PrefixRules.initPrefixRules_ = function() {
  defineRule(
      'numerator', 'prefix.default',
      '[t] "numerator"; [p] (pause:200)',
      'self::*', 'parent::*/parent::fraction',
      'count(preceding-sibling::*)=0');
  defineRule(
      'denominator', 'prefix.default',
      '[t] "denominator"; [p] (pause:200)',
      'self::*', 'parent::*/parent::fraction',
      'count(preceding-sibling::*)=1');
  defineRule(
      'base', 'prefix.default',
      '[t] "base"; [p] (pause:200)',
      'self::*', 'parent::*/parent::superscript or parent::*/parent::subscript',
      'count(preceding-sibling::*)=0');
  defineRule(
      'exponent', 'prefix.default',
      '[t] "exponent"; [p] (pause:200)',
      'self::*', 'parent::*/parent::superscript',
      'count(preceding-sibling::*)=1');
  defineRule(
      'index', 'prefix.default',
      '[t] "subscript"; [p] (pause:200)',
      'self::*', 'parent::*/parent::subscript',
      'count(preceding-sibling::*)=1');
  defineRule(
      'sqrt', 'prefix.default',
      '[t] "the square root of"; [n] children/*[1]; [p] (pause:500)',
      'self::*', 'self::sqrt');

};

});  // goog.scope

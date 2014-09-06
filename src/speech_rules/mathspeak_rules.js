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
 * @fileoverview Mathspeak rules.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.MathspeakRules');

goog.require('sre.MathStore');
goog.require('sre.MathmlStore');
goog.require('sre.StoreUtil');



/**
 * Rule initialization.
 * @constructor
 */
sre.MathspeakRules = function() {
  sre.MathspeakRules.initMathspeakRules_();
};
goog.addSingletonGetter(sre.MathspeakRules);


/**
 * @type {sre.MathStore}
 */
sre.MathspeakRules.mathStore = sre.MathmlStore.getInstance();


/** @private */
sre.MathspeakRules.defineRule_ = goog.bind(
    sre.MathspeakRules.mathStore.defineRule,
    sre.MathspeakRules.mathStore);


/** @private */
sre.MathspeakRules.defineRuleAlias_ = goog.bind(
    sre.MathspeakRules.mathStore.defineRuleAlias,
    sre.MathspeakRules.mathStore);


/** @private */
sre.MathspeakRules.addContextFunction_ = goog.bind(
    sre.MathspeakRules.mathStore.contextFunctions.add,
    sre.MathspeakRules.mathStore.contextFunctions);


goog.scope(function() {
var defineRule = sre.MathspeakRules.defineRule_;
var defineRuleAlias = sre.MathspeakRules.defineRuleAlias_;

var addCTXF = sre.MathspeakRules.addContextFunction_;


/**
 * Initialize the custom functions.
 * @private
 */
sre.MathspeakRules.initCustomFunctions_ = function() {
  addCTXF('CTXFnodeCounter', sre.StoreUtil.nodeCounter);
  addCTXF('CTXFcontentIterator', sre.MathmlStoreUtil.contentIterator);
};


/**
 * Semantic rules.
 * @private
*/
sre.MathspeakRules.initMathspeakRules_ = function() {
  // Initial rule
  defineRule(
      'number', 'mathspeak.default',
      '[n] text()', 'self::number');

};

});  // goog.scope


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
  // Number rules
  defineRule(
      'number', 'mathspeak.default', '[n] text()', 'self::number');

  defineRule(
      'number-with-chars', 'mathspeak.default',
      '[t] "Number"; [n] text()', 'self::number',
      '"" != translate(text(), "0123456789", "")');

  defineRule(
      'number-with-chars', 'mathspeak.brief',
      '[t] "Num"; [n] text()', 'self::number',
      '"" != translate(text(), "0123456789", "")');

  defineRule(
      'number-with-chars', 'mathspeak.sbrief',
      '[t] "Num"; [n] text()', 'self::number',
      '"" != translate(text(), "0123456789", "")');

  defineRule(
      'number-as-upper-word', 'mathspeak.default',
      '[t] "UpperWord"; [n] text()', 'self::number',
      'string-length(text())>1', 'text()=translate(text(), ' +
      '"abcdefghijklmnopqrstuvwxyz\u03B1\u03B2\u03B3\u03B4' +
      '\u03B5\u03B6\u03B7\u03B8\u03B9\u03BA\u03BB\u03BC\u03BD\u03BE\u03BF' +
      '\u03C0\u03C1\u03C2\u03C3\u03C4\u03C5\u03C6\u03C7\u03C8\u03C9", ' +
      '"ABCDEFGHIJKLMNOPQRSTUVWXYZ\u0391\u0392\u0393\u0394' +
      '\u0395\u0396\u0397\u0398\u0399\u039A\u039B\u039C\u039D\u039E\u039F' +
      '\u03A0\u03A1\u03A3\u03A3\u03A4\u03A5\u03A6\u03A7\u03A8\u03A9")',
      '""=translate(text(), "ABCDEFGHIJKLMNOPQRSTUVWXYZ\u0391\u0392\u0393' +
      '\u0394\u0395\u0396\u0397\u0398\u0399\u039A\u039B\u039C\u039D\u039E' +
      '\u039F\u03A0\u03A1\u03A3\u03A3\u03A4\u03A5\u03A6\u03A7\u03A8\u03A9",' +
      '"")');

  defineRule(
      'binary-operation', 'mathspeak.default',
      '[m] children/* (separator:text());', 'self::infixop');

};

});  // goog.scope


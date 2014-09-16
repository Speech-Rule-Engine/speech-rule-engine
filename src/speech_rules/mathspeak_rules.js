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
goog.require('sre.MathspeakUtil');
goog.require('sre.StoreUtil');



/**
 * Rule initialization.
 * @constructor
 */
sre.MathspeakRules = function() {
  sre.MathspeakRules.initCustomFunctions_();
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


/** @private */
sre.MathspeakRules.addCustomQuery_ = goog.bind(
    sre.MathspeakRules.mathStore.customQueries.add,
    sre.MathspeakRules.mathStore.customQueries);


/** @private */
sre.MathspeakRules.addCustomString_ = goog.bind(
    sre.MathspeakRules.mathStore.customStrings.add,
    sre.MathspeakRules.mathStore.customStrings);


goog.scope(function() {
var defineRule = sre.MathspeakRules.defineRule_;
var defineRuleAlias = sre.MathspeakRules.defineRuleAlias_;

var addCQF = sre.MathspeakRules.addCustomQuery_;
var addCSF = sre.MathspeakRules.addCustomString_;
var addCTXF = sre.MathspeakRules.addContextFunction_;


/**
 * Initialize the custom functions.
 * @private
 */
sre.MathspeakRules.initCustomFunctions_ = function() {
  addCQF('CQFspaceoutNumber', sre.MathspeakUtil.spaceoutNumber);

  addCSF('CSFspaceoutText', sre.MathspeakUtil.spaceoutText);
};


/**
 * Semantic rules.
 * @private
*/
sre.MathspeakRules.initMathspeakRules_ = function() {
  // Dummy rules
  defineRule(
      'unknown', 'mathspeak.default', '[n] text()',
      'self::unknown');

  defineRule(
      'protected', 'mathspeak.default', '[t] text()',
      'self::*', '@role="protected"');


  // Number rules
  defineRule(
      'number', 'mathspeak.default', '[n] text()', 'self::number');

  defineRule(
      'number-with-chars', 'mathspeak.default',
      '[t] "Number"; [m] CQFspaceoutNumber', 'self::number',
      '"" != translate(text(), "0123456789.,", "")',
      'text() != translate(text(), "0123456789.,", "")');

  defineRule(
      'number-with-chars', 'mathspeak.brief',
      '[t] "Num"; [m] CQFspaceoutNumber', 'self::number',
      '"" != translate(text(), "0123456789.,", "")',
      'text() != translate(text(), "0123456789.,", "")');

  defineRule(
      'number-with-chars', 'mathspeak.sbrief',
      '[t] "Num"; [m] CQFspaceoutNumber', 'self::number',
      '"" != translate(text(), "0123456789.,", "")',
      'text() != translate(text(), "0123456789.,", "")');

  defineRule(
      'number-as-upper-word', 'mathspeak.default',
      '[t] "UpperWord"; [t] CSFspaceoutText', 'self::number',
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


  // Operator rules
  defineRule(
      'binary-operation', 'mathspeak.default',
      '[m] children/* (separator:text());', 'self::infixop');

  defineRule('subtraction', 'mathspeak.default',
             '[m] children/* (separator:"minus");', 'self::infixop',
             '@role="subtraction"');

  // Function rules
  defineRule(
      'function-unknown', 'mathspeak.default',
      '[n] children/*[1]; [n] children/*[2]',
      'self::appl', 'children/*[1][@role="unknown"]'
  );


  // Fences rules
  defineRule(
      'fences-open-close', 'mathspeak.default',
      '[n] content/*[1]; [n] children/*[1]; [n] content/*[2]',
      'self::fenced', '@role="leftright"');

  defineRule(
      'fences-neutral', 'mathspeak.default',
      '[t] "StartAbsoluteValue"; [n] children/*[1]; [t] "EndAbsoluteValue"',
      'self::fenced', 'self::fenced[@role="neutral"]');

  defineRule(
      'fences-neutral', 'mathspeak.sbrief',
      '[t] "AbsoluteValue"; [n] children/*[1]; [t] "EndAbsoluteValue"',
      'self::fenced', 'self::fenced[@role="neutral"]');

  // TODO (sorge) Maybe promote this to default.default?
  // Maybe check for punctuated element and singleton?
  defineRule(
      'fences-set', 'mathspeak.default',
      '[t] "StartSet"; [n] children/*[1]; [t] "EndSet"',
      'self::fenced[@role="leftright"]', 'content/*[1][text()]="{"',
      'content/*[2][text()]="}"', 'count(children/*)=1');

  defineRule(
      'fences-Set', 'mathspeak.sbrief',
      '[t] "Set"; [n] children/*[1]; [t] "EndSet"',
      'self::fenced[@role="leftright"]', 'content/*[1][text()]="{"',
      'content/*[2][text()]="}"', 'count(children/*)=1');


  // Text rules
  defineRule(
      'text', 'mathspeak.default', '[n] text()', 'self::text');


  // Fraction rules

  defineRule(
      'fraction', 'default.default',
      '[t] "StartFraction"; [n] children/*[1];' +
          ' [t] "Over"; [n] children/*[2]; [t] "EndFraction"',
      'self::fraction');

  defineRule(
      'fraction', 'default.brief',
      '[t] "StartFrac"; [n] children/*[1];' +
          ' [t] "Over"; [n] children/*[2]; [t] "EndFrac"',
      'self::fraction');

  defineRule(
      'fraction', 'default.sbrief',
      '[t] "Frac"; [n] children/*[1];' +
          ' [t] "Over"; [n] children/*[2]; [t] "EndFrac"',
      'self::fraction');

};

});  // goog.scope


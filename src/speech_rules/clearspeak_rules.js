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

goog.require('sre.ClearspeakUtil');
goog.require('sre.Grammar');
goog.require('sre.MathStore');
goog.require('sre.StoreUtil');



//TODO: (MOSS) WP 2.2
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


/** @private */
sre.ClearspeakRules.addContextFunction_ = goog.bind(
    sre.ClearspeakRules.mathStore.contextFunctions.add,
    sre.ClearspeakRules.mathStore.contextFunctions);


goog.scope(function() {
var defineRule = sre.ClearspeakRules.defineRule_;

var addCTXF = sre.ClearspeakRules.addContextFunction_;

sre.ClearspeakRules.addAnnotators_ = function() {
  sre.SemanticAnnotations.getInstance().register(sre.ClearspeakUtil.simpleExpression());
};

/**
 * Initialize the custom functions.
 * @private
 */
sre.ClearspeakRules.initCustomFunctions_ = function() {
  addCTXF('CTXFpauseSeparator', sre.StoreUtil.pauseSeparator);
  addCTXF('CTXFnodeCounter', sre.ClearspeakUtil.nodeCounter);
  addCTXF('CTXFcontentIterator', sre.MathmlStoreUtil.contentIterator);
};


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

  // Operator rules
  defineRule(
      'prefix', 'clearspeak.default',
      '[n] text(); [n] children/*[1]',
      'self::prefixop');
  defineRule(
      'postfix', 'clearspeak.default',
      '[n] children/*[1]; [n] text()',
      'self::postfixop');

  defineRule(
      'binary-operation', 'clearspeak.default',
      '[m] children/* (sepFunc:CTXFcontentIterator);', 'self::infixop');

  // Relations
  defineRule(
      'relseq', 'clearspeak.default',
      '[m] children/* (sepFunc:CTXFcontentIterator)',
      'self::relseq');

  defineRule(
      'equality', 'clearspeak.default',
      '[n] children/*[1]; [n] content/*[1]; [n] children/*[2]',
      'self::relseq', '@role="equality"', 'count(./children/*)=2');

  defineRule(
      'multi-equality', 'clearspeak.default',
      '[m] ./children/* (sepFunc:CTXFcontentIterator)',
      'self::relseq', '@role="equality"', 'count(./children/*)>2');

  defineRule(
      'multrel', 'clearspeak.default',
      '[m] children/* (sepFunc:CTXFcontentIterator)',
      'self::multirel');

  // Named sets
  defineRule(
    'natural-numbers', 'clearspeak.default',
    '[t] "the natural numbers"', 'self::identifier',
    'text()="\u2115" or (text()="N" and @font="double-struck")');
  defineRule(
    'integers', 'clearspeak.default',
    '[t] "the integers"', 'self::identifier',
    'text()="\u2124" or (text()="Z" and @font="double-struck")');
  defineRule(
    'rational-numbers', 'clearspeak.default',
    '[t] "the rational numbers"', 'self::identifier',
    'text()="\u211A" or (text()="Q" and @font="double-struck")');
  defineRule(
    'real-numbers', 'clearspeak.default',
    '[t] "the real numbers"', 'self::identifier',
    'text()="\u211D" or (text()="R" and @font="double-struck")');
  defineRule(
    'complex-numbers', 'clearspeak.default',
    '[t] "the complex numbers"', 'self::identifier',
    'text()="\u2102" or (text()="C" and @font="double-struck")');

  // Named sets with superscripts
  defineRule(
    'natural-numbers-super', 'clearspeak.default',
    '[t] "n" (join: "-"); [n] children/*[2] (grammar:numbers2alpha)',
    'self::superscript', 'children/*[1]/text()="\u2115"' +
      ' or (children/*[1]/text()="N" and @font="double-struck")');
  defineRule(
    'integers-super', 'clearspeak.default',
    '[t] "z" (join: "-"); [n] children/*[2] (grammar:numbers2alpha)',
    'self::superscript', 'children/*[1]/text()="\u2124"' +
      ' or (children/*[1]/text()="Z" and @font="double-struck")');
  defineRule(
    'rational-numbers-super', 'clearspeak.default',
    '[t] "q" (join: "-"); [n] children/*[2] (grammar:numbers2alpha)',
    'self::superscript', 'children/*[1]/text()="\u211A"' +
      ' or (children/*[1]/text()="Q" and @font="double-struck")');
  defineRule(
    'real-numbers-super', 'clearspeak.default',
    '[t] "r" (join:"-"); [n] children/*[2] (grammar:numbers2alpha)',
    'self::superscript', 'children/*[1]/text()="\u211D"' +
      ' or (children/*[1]/text()="R" and @font="double-struck")');
  defineRule(
    'complex-numbers-super', 'clearspeak.default',
    '[t] "c" (join:"-"); [n] children/*[2] (grammar:numbers2alpha)',
    'self::superscript', 'children/*[1]/text()="\u2102"' +
      ' or (children/*[1]/text()="C" and @font="double-struck")');

  // Partial named sets.
  defineRule(
    'natural-numbers-with-zero', 'clearspeak.default',
    '[t] "the natural numbers with zero"',
    'self::subscript', 'children/*[1]/text()="\u2115"' +
      ' or (children/*[1]/text()="N" and @font="double-struck")',
    'children/*[2]/text()="0"');
  defineRule(
    'positive-integers', 'clearspeak.default',
    '[t] "the positive integers"',
    'self::superscript', 'children/*[1]/text()="\u2124"' +
      ' or (children/*[1]/text()="Z" and @font="double-struck")',
    'children/*[2]/text()="+"');
  defineRule(
    'positive-integers', 'clearspeak.default',
    '[t] "the negative integers"',
    'self::superscript', 'children/*[1]/text()="\u2124"' +
      ' or (children/*[1]/text()="Z" and @font="double-struck")',
    'children/*[2]/text()="-"');
  defineRule(
    'positive-rational-numbers', 'clearspeak.default',
    '[t] "the positive rational numbers"',
    'self::superscript', 'children/*[1]/text()="\u211A"' +
      ' or (children/*[1]/text()="Q" and @font="double-struck")',
    'children/*[2]/text()="+"');
  defineRule(
    'negative-rational-numbers', 'clearspeak.default',
    '[t] "the negative rational numbers"',
    'self::superscript', 'children/*[1]/text()="\u211A"' +
      ' or (children/*[1]/text()="Q" and @font="double-struck")',
    'children/*[2]/text()="-"');
  // TODO: Do we need positive and negative real numbers. Usually they are more
  //       complex notation!

  // Absolute Values
  defineRule(
    'fences-neutral', 'clearspeak.default',
    '[p] (pause:short); [t] "the absolute value of"; ' +
      '[n] children/*[1]; [p] (pause: short)',
    'self::fenced', '@role="neutral"',
    'content/*[1][text()]="|" or content/*[1][text()]="❘" or' +
      ' content/*[1][text()]="｜"');
  defineRule(
    'fences-neutral', 'clearspeak.AbsoluteValue_AbsEnd',
    '[p] (pause:short); [t] "the absolute value of"; ' +
      '[n] children/*[1]; [p] (pause: short); ' +
      '[t] "end absolute value"; [p] (pause: short)',
    'self::fenced', '@role="neutral"',
    'content/*[1][text()]="|" or content/*[1][text()]="❘" or' +
      ' content/*[1][text()]="｜"');

  // Determinant
  defineRule(
      'determinant', 'clearspeak.default',
      '[t] "the determinant of the"; [t] count(children/*);  [t] "by";' +
      '[t] count(children/*[1]/children/*); [t] "matrix"; [p] (pause:long);' +
      ' [m] children/* (ctxtFunc:CTXFnodeCounter,context:"Row");' +
      ' [p] (pause:long)',
      'self::matrix', '@role="determinant"');
  defineRule(
      'matrix-row', 'clearspeak.default',
      '[m] children/* (sepFunc:CTXFpauseSeparator,separator:"short")',
      'self::row');
  defineRule(
      'matrix-cell', 'clearspeak.default',
      '[n] children/*[1]', 'self::cell');



};

});  // goog.scope


sre.ClearspeakRules.getInstance().initializer = [
  sre.ClearspeakRules.initCustomFunctions_,
  sre.ClearspeakRules.initClearspeakRules_,
  sre.ClearspeakRules.addAnnotators_
];


sre.Grammar.getInstance().setPreprocessor('numbers2alpha',
                                          sre.ClearspeakUtil.numbersToAlpha);

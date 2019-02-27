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
 * @fileoverview Speech rules for semantic tree.
 * @author sorge@google.com (Volker Sorge)
 */

goog.provide('sre.EmacspeakRules');

goog.require('sre.MathStore');
goog.require('sre.MathmlStoreUtil');
goog.require('sre.MathspeakUtil');
goog.require('sre.StoreUtil');



/**
 * Rule initialization.
 * @constructor
 * @extends {sre.MathStore}
 */
sre.EmacspeakRules = function() {
  sre.EmacspeakRules.base(this, 'constructor');
};
goog.inherits(sre.EmacspeakRules, sre.MathStore);
goog.addSingletonGetter(sre.EmacspeakRules);


/**
 * @type {sre.MathStore}
 */
sre.EmacspeakRules.mathStore = sre.EmacspeakRules.getInstance();


/** @private */
sre.EmacspeakRules.defineRule_ = goog.bind(
    sre.EmacspeakRules.mathStore.defineRule,
    sre.EmacspeakRules.mathStore);


/** @private */
sre.EmacspeakRules.defineRuleAlias_ = goog.bind(
    sre.EmacspeakRules.mathStore.defineRuleAlias,
    sre.EmacspeakRules.mathStore);


/** @private */
sre.EmacspeakRules.addContextFunction_ = goog.bind(
    sre.EmacspeakRules.mathStore.contextFunctions.add,
    sre.EmacspeakRules.mathStore.contextFunctions);


/** @private */
sre.EmacspeakRules.addCustomQuery_ = goog.bind(
    sre.EmacspeakRules.mathStore.customQueries.add,
    sre.EmacspeakRules.mathStore.customQueries);


/** @private */
sre.EmacspeakRules.addCustomString_ = goog.bind(
    sre.EmacspeakRules.mathStore.customStrings.add,
    sre.EmacspeakRules.mathStore.customStrings);


goog.scope(function() {
var defineRule = sre.EmacspeakRules.defineRule_;
var defineRuleAlias = sre.EmacspeakRules.defineRuleAlias_;

var addCQF = sre.EmacspeakRules.addCustomQuery_;
var addCSF = sre.EmacspeakRules.addCustomString_;
var addCTXF = sre.EmacspeakRules.addContextFunction_;


/**
 * Initialize the custom functions.
 * @private
 */
sre.EmacspeakRules.initCustomFunctions_ = function() {
  addCTXF('CTXFnodeCounter', sre.StoreUtil.nodeCounter);
  addCTXF('CTXFcontentIterator', sre.MathmlStoreUtil.contentIterator);

  addCQF('CQFvulgarFractionSmall', sre.MathspeakUtil.isSmallVulgarFraction);

  addCSF('CSFvulgarFraction', sre.NumbersUtil.vulgarFraction);
};


/**
 * Semantic rules.
 * @private
*/
sre.EmacspeakRules.initSemanticRules_ = function() {
  // Initial rule
  defineRule(
      'stree', 'emacspeak.default',
      '[n] ./*[1]', 'self::stree');

  defineRule(
      'multrel', 'emacspeak.default',
      '[t] "multirelation"; [m] children/* (sepFunc:CTXFcontentIterator)',
      'self::multirel');

  defineRule(
      'variable-equality', 'emacspeak.default',
      '[t] "equation sequence"; [m] children/* ' +
          '(context:"part",ctxtFunc:CTXFnodeCounter,' +
          'sepFunc:CTXFcontentIterator)',
      'self::relseq[@role="equality"]', 'count(./children/*)>2',
      './children/punctuation[@role="ellipsis"]');// Make that better!

  defineRule(
      'multi-equality', 'emacspeak.default',
      '[t] "equation sequence"; [m] children/* ' +
          '(context:"part",ctxtFunc:CTXFnodeCounter,' +
          'sepFunc:CTXFcontentIterator)',
      'self::relseq[@role="equality"]', 'count(./children/*)>2');

  defineRule(
      'multi-equality', 'emacspeak.short',
      '[t] "equation sequence"; [m] children/* ' +
          '(sepFunc:CTXFcontentIterator)',
      'self::relseq[@role="equality"]', 'count(./children/*)>2');

  defineRule(
      'equality', 'emacspeak.default',
      '[t] "equation"; [t] "left hand side"; [n] children/*[1];' +
          '[p] (pause:200); [n] content/*[1] (pause:200);' +
          '[t] "right hand side"; [n] children/*[2]',
      'self::relseq[@role="equality"]', 'count(./children/*)=2');

  defineRule(
      'simple-equality', 'emacspeak.default',
      '[n] children/*[1]; [p] (pause:200); [n] content/*[1] (pause:200);' +
          '[n] children/*[2]',
      'self::relseq[@role="equality"]', 'count(./children/*)=2',
      './children/identifier or ./children/number');

  defineRule(
      'simple-equality2', 'emacspeak.default',
      '[n] children/*[1]; [p] (pause:200); [n] content/*[1] (pause:200);' +
          '[n] children/*[2]',
      'self::relseq[@role="equality"]', 'count(./children/*)=2',
      './children/function or ./children/appl');

  defineRule(
      'relseq', 'emacspeak.default',
      '[m] children/* (sepFunc:CTXFcontentIterator)',
      'self::relseq');

  defineRule(
      'implicit', 'emacspeak.default',
      '[m] children/*', 'self::infixop', '@role="implicit"',
      'children/*[1][@role="latinletter"] or ' +
      'children/*[1][@role="greekletter"] or ' +
      'children/*[1][@role="otherletter"] or ' +
      'name(children/*[1])="number"',
      'children/*[2][@role="latinletter"] or ' +
      'children/*[2][@role="greekletter"] or ' +
      'children/*[2][@role="otherletter"] or ' +
      'name(children/*[2])="number"'
  );

  defineRule(
      'binary-operation', 'emacspeak.default',
      '[p] (pause:100); [m] children/* (sepFunc:CTXFcontentIterator);' +
      ' [p] (pause:100);',
      'self::infixop');

  defineRule(
      'variable-addition', 'emacspeak.default',
      '[t] "sum with variable number of summands";' +
          '[p] (pause:400); [m] children/* (sepFunc:CTXFcontentIterator)',
      'self::infixop[@role="addition"]', 'count(children/*)>2',
      'children/punctuation[@role="ellipsis"]');// Make that better!

  // Prefix Operator
  defineRule(
      'prefix', 'emacspeak.default',
      '[t] "prefix"; [n] text(); [t] "of" (pause 150);' +
      '[n] children/*[1]',
      'self::prefixop');

  defineRule(
      'negative', 'emacspeak.default',
      '[t] "negative"; [n] children/*[1]',
      'self::prefixop', 'self::prefixop[@role="negative"]');

  // Postfix Operator
  defineRule(
      'postfix', 'emacspeak.default',
      '[n] children/*[1]; [t] "postfix"; [n] text() (pause 300)',
      'self::postfixop');

  defineRule(
      'identifier', 'emacspeak.default',
      '[n] text()', 'self::identifier');

  defineRule(
      'number', 'emacspeak.default',
      '[n] text()', 'self::number');

  // Font rules
  defineRule(
      'font', 'mathspeak.default',
      '[t] @font; [n] . (grammar:ignoreFont=@font)',
      'self::*', '@font', 'not(contains(@grammar, "ignoreFont"))',
      '@font!="normal"');

  defineRule(
      'font-identifier-short', 'emacspeak.default',
      '[t] @font; [n] CQFhideFont; [t] CSFshowFont',
      'self::identifier', 'string-length(text())=1',
      '@font', '@font="normal"', '""=translate(text(), ' +
      '"abcdefghijklmnopqrstuvwxyz\u03B1\u03B2\u03B3\u03B4' +
      '\u03B5\u03B6\u03B7\u03B8\u03B9\u03BA\u03BB\u03BC\u03BD\u03BE\u03BF' +
      '\u03C0\u03C1\u03C2\u03C3\u03C4\u03C5\u03C6\u03C7\u03C8\u03C9' +
      'ABCDEFGHIJKLMNOPQRSTUVWXYZ\u0391\u0392\u0393\u0394' +
      '\u0395\u0396\u0397\u0398\u0399\u039A\u039B\u039C\u039D\u039E\u039F' +
      '\u03A0\u03A1\u03A3\u03A3\u03A4\u03A5\u03A6\u03A7\u03A8\u03A9", "")',
      '@role!="unit"');

  defineRule(
      'font-identifier', 'mathspeak.default',
      '[t] @font; [n] . (grammar:ignoreFont=@font)',
      'self::identifier', 'string-length(text())=1',
      '@font', '@font="normal"', 'not(contains(@grammar, "ignoreFont"))',
      '@role!="unit"');

  defineRule(
      'omit-font', 'mathspeak.default',
      '[n] . (grammar:ignoreFont=@font)',
      'self::identifier', 'string-length(text())=1', '@font',
      'not(contains(@grammar, "ignoreFont"))', '@font="italic"');

  // Fraction
  defineRule(
      'simple-fraction', 'emacspeak.default',
      '[p] (pause:100); [n] children/*[1] (rate:0.35); [t] "over"; ' +
          ' [n] children/*[2] (rate:-0.35); [p] (pause:100)',
      'self::fraction',
      'name(children/*[1])="number" or name(children/*[1])="identifier"',
      'name(children/*[2])="number" or name(children/*[2])="identifier"');
  defineRule(
      'vulgar-fraction', 'emacspeak.default',
      '[t] CSFvulgarFraction',
      'self::fraction', '@role="vulgar"', 'CQFvulgarFractionSmall');
  defineRule(
      'fraction', 'emacspeak.default',
      '[p] (pause:250); [n] children/*[1] (rate:0.35); [p] (pause:250);' +
          ' [t] "divided by"; [p] (pause:250); ' +
          ' [n] children/*[2] (rate:-0.35); [p] (pause:250)',
      'self::fraction');

  defineRule(
      'superscript', 'emacspeak.default',
      '[n] children/*[1]; [t] "super"; [n] children/*[2] (pitch:0.35);' +
      '[p] (pause:300)',
      'self::superscript');
  defineRule(
      'subscript', 'emacspeak.default',
      '[n] children/*[1]; [t] "sub"; [n] children/*[2] (pitch:-0.35);' +
      '[p] (pause:300)',
      'self::subscript');

  defineRule(
      'ellipsis', 'emacspeak.default',
      '[p] (pause:200); [t] "ellipsis"; [p] (pause:300)',
      'self::punctuation', 'self::punctuation[@role="ellipsis"]');

  defineRule(
      'fence-single', 'emacspeak.default',
      '[n] text()',
      'self::punctuation', 'self::punctuation[@role="openfence"]');
  defineRuleAlias('fence-single', 'self::punctuation',
                  'self::punctuation[@role="closefence"]');
  defineRuleAlias('fence-single', 'self::punctuation',
                  'self::punctuation[@role="vbar"]');
  defineRuleAlias('fence-single', 'self::punctuation',
                  'self::punctuation[@role="application"]');

  defineRule(
      'omit-empty', 'emacspeak.default',
      '[p] (pause:100)',
      'self::empty');

  defineRule(
      'fences-open-close', 'emacspeak.default',
      '[p] (pause:200); [n] children/*[1] (rate:0.35); [p] (pause:200)',
      'self::fenced', '@role="leftright"');

  defineRule(
      'fences-open-close-in-appl', 'emacspeak.default',
      '[p] (pause:200); [n] children/*[1]; [p] (pause:200);',
      'self::fenced[@role="leftright"]', './parent::children/parent::appl');

  defineRule(
      'fences-neutral', 'emacspeak.default',
      '[p] (pause:100); [t] "absolute value of"; [n] children/*[1];' +
      '[p] (pause:350);',
      'self::fenced', 'self::fenced[@role="neutral"]');

  defineRule(
      'omit-fences', 'emacspeak.default',
      '[p] (pause:500); [n] children/*[1]; [p] (pause:200);',
      'self::fenced');

  // Matrix rules.
  defineRule(
      'matrix', 'emacspeak.default',
      '[t] "matrix"; [m] children/* ' +
      '(ctxtFunc:CTXFnodeCounter,context:"row",pause:100)',
      'self::matrix');

  defineRule(
      'matrix-row', 'emacspeak.default',
      '[m] children/* (ctxtFunc:CTXFnodeCounter,context:"column",pause:100)',
      'self::row[@role="matrix"]');

  defineRule(
      'matrix-cell', 'emacspeak.default',
      '[n] children/*[1]', 'self::cell[@role="matrix"]');

  // Vector rules.
  defineRule(
      'vector', 'emacspeak.default',
      '[t] "vector"; [m] children/* ' +
      '(ctxtFunc:CTXFnodeCounter,context:"element",pause:100)',
      'self::vector');

  // Cases rules.
  defineRule(
      'cases', 'emacspeak.default',
      '[t] "case statement"; [m] children/* ' +
      '(ctxtFunc:CTXFnodeCounter,context:"case",pause:100)',
      'self::cases');

  defineRule(
      'cases-row', 'emacspeak.default',
      '[m] children/*', 'self::row[@role="cases"]');

  defineRule(
      'cases-cell', 'emacspeak.default',
      '[n] children/*[1]', 'self::cell[@role="cases"]');

  defineRule(
      'row', 'emacspeak.default',
      '[m] ./* (ctxtFunc:CTXFnodeCounter,context:"column",pause:100)',
      'self::row');

  defineRule(
      'cases-end', 'emacspeak.default',
      '[t] "case statement"; ' +
      '[m] children/* (ctxtFunc:CTXFnodeCounter,context:"case",pause:100);' +
      '[t] "end cases"',
      'self::cases', 'following-sibling::*');

  // Multiline rules.
  defineRule(
      'multiline', 'emacspeak.default',
      '[t] "multiline equation";' +
      '[m] children/* (ctxtFunc:CTXFnodeCounter,context:"line",pause:100)',
      'self::multiline');

  defineRule(
      'line', 'emacspeak.default',
      '[m] children/*', 'self::line');

  // Table rules.
  defineRule(
      'table', 'emacspeak.default',
      '[t] "multiline equation";' +
      '[m] children/* (ctxtFunc:CTXFnodeCounter,context:"row",pause:200)',
      'self::table');

  defineRule(
      'table-row', 'emacspeak.default',
      '[m] children/* (pause:100)', 'self::row[@role="table"]');

  defineRuleAlias(
      'cases-cell', 'self::cell[@role="table"]');


  // Rules for punctuated expressions.
  defineRule(
      'end-punct', 'emacspeak.default',
      '[m] children/*; [p] (pause:300)',
      'self::punctuated', '@role="endpunct"');

  defineRule(
      'start-punct', 'emacspeak.default',
      '[n] content/*[1]; [p] (pause:200); [m] children/*[position()>1]',
      'self::punctuated', '@role="startpunct"');

  defineRule(
      'integral-punct', 'emacspeak.default',
      '[n] children/*[1] (rate:0.2); [n] children/*[3] (rate:0.2)',
      'self::punctuated', '@role="integral"');

  defineRule(
      'punctuated', 'emacspeak.default',
      '[m] children/* (pause:100)',
      'self::punctuated');

  // Function rules
  defineRule(
      'function', 'emacspeak.default',
      '[n] text()', 'self::function');

  defineRule(
      'appl', 'emacspeak.default',
      '[n] children/*[1]; [n] content/*[1]; [n] children/*[2]', 'self::appl');

  // Limit operator rules
  defineRule(
      'sum-only', 'emacspeak.default',
      '[n] children/*[1]; [t] "from"; [n] children/*[2]; [t] "to";' +
      '[n] children/*[3]', 'self::limboth', '@role="sum" or @role="integral"');

  defineRule(
      'limboth', 'emacspeak.default',
      '[n] children/*[1]; [p] (pause 100); [t] "over"; [n] children/*[2];' +
      '[t] "under"; [n] children/*[3]; [p] (pause 250);',
      'self::limboth');

  defineRule(
      'limlower', 'emacspeak.default',
      '[n] children/*[1]; [t] "over"; [n] children/*[2];', 'self::limlower');

  defineRule(
      'limupper', 'emacspeak.default',
      '[n] children/*[1]; [t] "under"; [n] children/*[2];', 'self::limupper');

  // Bigoperator rules
  defineRule(
      'largeop', 'emacspeak.default',
      '[n] text()', 'self::largeop');

  defineRule(
      'bigop', 'emacspeak.default',
      '[n] children/*[1]; [p] (pause 100); [t] "over"; [n] children/*[2];' +
      '[p] (pause 250);',
      'self::bigop');


  // Integral rules
  defineRule(
      'integral', 'emacspeak.default',
      '[n] children/*[1]; [p] (pause 100); [n] children/*[2];' +
      '[p] (pause 200); [n] children/*[3] (rate:0.35);', 'self::integral');


  defineRule(
      'sqrt', 'emacspeak.default',
      '[t] "Square root of"; [n] children/*[1] (rate:0.35); [p] (pause:400)',
      'self::sqrt');

  defineRule(
      'square', 'emacspeak.default',
      '[n] children/*[1]; [t] "squared" (pitch:0.35); [p] (pause:200)',
      'self::superscript', 'children/*[2][text()=2]',
      'name(./children/*[1])!="text"');

  defineRule(
      'cube', 'emacspeak.default',
      '[n] children/*[1]; [t] "cubed" (pitch:0.35); [p] (pause:200)',
      'self::superscript', 'children/*[2][text()=3]',
      'name(./children/*[1])!="text"');

  defineRule(
      'root', 'emacspeak.default',
      '[t] "root of order"; [n] children/*[1];' +
          '[t] "over"; [n] children/*[1] (rate:0.35); [p] (pause:400)',
      'self::root');

  // TODO (sorge) This is probably unnecessary now!
  defineRule(
      'text-no-mult', 'emacspeak.default',
      '[n] children/*[1]; [p] (pause:200); [n] children/*[2]',
      'self::infixop', 'children/text');

  defineRule(
      'text', 'emacspeak.default',
      '[n] text(); [p] (pause:200)',
      'self::text');

  defineRule(
      'unit', 'emacspeak.default',
      '[t] text() (annotation:unit, preprocess)',
      'self::identifier', '@role="unit"');
  defineRule(
      'unit-square', 'emacspeak.default',
      '[t] "square"; [n] children/*[1]',
      'self::superscript', '@role="unit"', 'children/*[2][text()=2]',
      'name(children/*[1])="identifier"');

  defineRule(
      'unit-cubic', 'emacspeak.default',
      '[t] "cubic"; [n] children/*[1]',
      'self::superscript', '@role="unit"', 'children/*[2][text()=3]',
      'name(children/*[1])="identifier"');
  defineRule(
      'reciprocal', 'emacspeak.default',
      '[t] "reciprocal"; [n] children/*[1]',
      'self::superscript', '@role="unit"', 'name(children/*[1])="identifier"',
      'name(children/*[2])="prefixop"', 'children/*[2][@role="negative"]',
      'children/*[2]/children/*[1][text()=1]',
      'count(preceding-sibling::*)=0 or preceding-sibling::*[@role!="unit"]');
  defineRule(
      'reciprocal', 'emacspeak.default',
      '[t] "per"; [n] children/*[1]',
      'self::superscript', '@role="unit"', 'name(children/*[1])="identifier"',
      'name(children/*[2])="prefixop"', 'children/*[2][@role="negative"]',
      'children/*[2]/children/*[1][text()=1]',
      'preceding-sibling::*[@role="unit"]');
  defineRule(
      'unit-combine', 'emacspeak.default',
      '[m] children/*', 'self::infixop', '@role="unit"');
  defineRule(
      'unit-divide', 'emacspeak.default',
      '[n] children/*[1] (pitch:0.3); [t] "per";' +
      ' [n] children/*[2] (pitch:-0.3)',
      'self::fraction', '@role="unit"');

};

});  // goog.scope


sre.EmacspeakRules.getInstance().initializer = [
  sre.EmacspeakRules.initCustomFunctions_,
  sre.EmacspeakRules.initSemanticRules_
];

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

goog.provide('sre.MathspeakSpanish');

goog.require('sre.MathStore');
goog.require('sre.MathmlStoreUtil');
goog.require('sre.MathspeakSpanishUtil');
goog.require('sre.MathspeakUtil');
goog.require('sre.SystemExternal');



/**
 * Rule initialization.
 * @constructor
 * @extends {sre.MathStore}
 */
sre.MathspeakSpanish = function() {
  sre.MathspeakSpanish.base(this, 'constructor');

  this.locale = 'es';
};
goog.inherits(sre.MathspeakSpanish, sre.MathStore);
goog.addSingletonGetter(sre.MathspeakSpanish);


/**
 * @type {sre.MathStore}
 */
sre.MathspeakSpanish.mathStore = sre.MathspeakSpanish.getInstance();


/** @private */
sre.MathspeakSpanish.defineRule_ = goog.bind(
    sre.MathspeakSpanish.mathStore.defineRule,
    sre.MathspeakSpanish.mathStore);


/** @private */
sre.MathspeakSpanish.defineRuleAlias_ = goog.bind(
    sre.MathspeakSpanish.mathStore.defineRulesAlias,
    sre.MathspeakSpanish.mathStore);


/** @private */
sre.MathspeakSpanish.defineSpecialisedRule_ = goog.bind(
    sre.MathspeakSpanish.mathStore.defineSpecialisedRule,
    sre.MathspeakSpanish.mathStore);


/** @private */
sre.MathspeakSpanish.addContextFunction_ = goog.bind(
    sre.MathspeakSpanish.mathStore.contextFunctions.add,
    sre.MathspeakSpanish.mathStore.contextFunctions);


/** @private */
sre.MathspeakSpanish.addCustomQuery_ = goog.bind(
    sre.MathspeakSpanish.mathStore.customQueries.add,
    sre.MathspeakSpanish.mathStore.customQueries);


/** @private */
sre.MathspeakSpanish.addCustomString_ = goog.bind(
    sre.MathspeakSpanish.mathStore.customStrings.add,
    sre.MathspeakSpanish.mathStore.customStrings);


goog.scope(function() {
var defineRule = sre.MathspeakSpanish.defineRule_;
var defineRuleAlias = sre.MathspeakSpanish.defineRuleAlias_;
var defineSpecialisedRule = sre.MathspeakSpanish.defineSpecialisedRule_;

var addCQF = sre.MathspeakSpanish.addCustomQuery_;
var addCSF = sre.MathspeakSpanish.addCustomString_;
var addCTXF = sre.MathspeakSpanish.addContextFunction_;


/**
 * Initialize the custom functions.
 * @private
 */
sre.MathspeakSpanish.initCustomFunctions_ = function() {
  addCQF('CQFspaceoutNumber', sre.MathspeakUtil.spaceoutNumber);
  addCQF('CQFspaceoutIdentifier', sre.MathspeakUtil.spaceoutIdentifier);

  addCSF('CSFspaceoutText', sre.MathspeakUtil.spaceoutText);
  // Fraction function.
  addCSF('CSFopenFracVerbose', sre.MathspeakUtil.openingFractionVerbose);
  addCSF('CSFcloseFracVerbose', sre.MathspeakUtil.closingFractionVerbose);
  addCSF('CSFoverFracVerbose', sre.MathspeakUtil.overFractionVerbose);
  addCSF('CSFopenFracBrief', sre.MathspeakUtil.openingFractionBrief);
  addCSF('CSFcloseFracBrief', sre.MathspeakUtil.closingFractionBrief);
  addCSF('CSFopenFracSbrief', sre.MathspeakUtil.openingFractionSbrief);
  addCSF('CSFcloseFracSbrief', sre.MathspeakUtil.closingFractionSbrief);
  addCSF('CSFoverFracSbrief', sre.MathspeakUtil.overFractionSbrief);

  // Radical function.
  addCSF('CSFopenRadicalVerbose', sre.MathspeakUtil.openingRadicalVerbose);
  addCSF('CSFcloseRadicalVerbose', sre.MathspeakUtil.closingRadicalVerbose);
  addCSF('CSFindexRadicalVerbose', sre.MathspeakUtil.indexRadicalVerbose);
  addCSF('CSFopenRadicalBrief', sre.MathspeakUtil.openingRadicalBrief);
  addCSF('CSFcloseRadicalBrief', sre.MathspeakUtil.closingRadicalBrief);
  addCSF('CSFindexRadicalBrief', sre.MathspeakUtil.indexRadicalBrief);
  addCSF('CSFopenRadicalSbrief', sre.MathspeakUtil.openingRadicalSbrief);
  addCSF('CSFindexRadicalSbrief', sre.MathspeakUtil.indexRadicalSbrief);
  addCQF('CQFisSmallRoot', sre.MathspeakSpanishUtil.smallRoot);

  // Sub- Superscript.
  addCSF('CSFsuperscriptVerbose', sre.MathspeakUtil.superscriptVerbose);
  addCSF('CSFsuperscriptBrief', sre.MathspeakUtil.superscriptBrief);
  addCSF('CSFsubscriptVerbose', sre.MathspeakUtil.subscriptVerbose);
  addCSF('CSFsubscriptBrief', sre.MathspeakUtil.subscriptBrief);
  addCSF('CSFbaselineVerbose', sre.MathspeakUtil.baselineVerbose);
  addCSF('CSFbaselineBrief', sre.MathspeakUtil.baselineBrief);

  // Over- Underscore.
  addCSF('CSFunderscript', sre.MathspeakUtil.nestedUnderscore);
  addCSF('CSFoverscript', sre.MathspeakUtil.nestedOverscore);

  addCTXF('CTXFordinalCounterEs', sre.MathspeakSpanishUtil.ordinalCounter);
  addCTXF('CTXFcontentIterator', sre.MathmlStoreUtil.contentIterator);
  addCTXF('CTXFunitMultipliers', sre.MathspeakSpanishUtil.unitMultipliers);

  // Layout related.
  addCQF('CQFdetIsSimple', sre.MathspeakUtil.determinantIsSimple);
  addCSF('CSFRemoveParens', sre.MathspeakUtil.removeParens);

  addCQF('CQFoneLeft', sre.MathspeakSpanishUtil.oneLeft);

  // Dummy.
  addCQF('CQFresetNesting', sre.MathspeakUtil.resetNestingDepth);

};


/**
 * Mathspeak rules.
 * @private
*/
sre.MathspeakSpanish.initMathspeakSpanish_ = function() {
  // Initial rule
  defineRule(
      'stree', 'mathspeak.default',
      '[n] ./*[1]', 'self::stree', 'CQFresetNesting');

  // Dummy rules
  defineRule(
      'unknown', 'mathspeak.default', '[n] text()',
      'self::unknown');

  defineRule(
      'protected', 'mathspeak.default', '[t] text()',
      'self::number', 'contains(@grammar, "protected")');

  defineRule(
      'omit-empty', 'mathspeak.default',
      '[p] (pause:100)', // Pause necessary to voice separators between empty.
      'self::empty');
  defineRule(
      'blank-empty', 'mathspeak.default',
      '[t] "espacio"', 'self::empty', 'count(../*)=1',
      'name(../..)="cell" or name(../..)="line"');

  // Font rules
  defineRule(
      'font', 'mathspeak.default',
      '[t] @font (grammar:localFont); [n] . (grammar:ignoreFont=@font)',
      'self::*', '@font', 'not(contains(@grammar, "ignoreFont"))',
      '@font!="normal"');

  defineRule(
      'font-identifier-short', 'mathspeak.default',
      '[t] @font (grammar:localFont); [n] . (grammar:ignoreFont=@font)',
      'self::identifier', 'string-length(text())=1',
      '@font', 'not(contains(@grammar, "ignoreFont"))', '@font="normal"',
      '""=translate(text(), ' +
      '"abcdefghijklmnopqrstuvwxyz\u03B1\u03B2\u03B3\u03B4' +
      '\u03B5\u03B6\u03B7\u03B8\u03B9\u03BA\u03BB\u03BC\u03BD\u03BE\u03BF' +
      '\u03C0\u03C1\u03C2\u03C3\u03C4\u03C5\u03C6\u03C7\u03C8\u03C9' +
      'ABCDEFGHIJKLMNOPQRSTUVWXYZ\u0391\u0392\u0393\u0394' +
      '\u0395\u0396\u0397\u0398\u0399\u039A\u039B\u039C\u039D\u039E\u039F' +
      '\u03A0\u03A1\u03A3\u03A3\u03A4\u03A5\u03A6\u03A7\u03A8\u03A9", "")',
      '@role!="unit"');

  defineRule(
      'font-identifier', 'mathspeak.default',
      '[t] @font (grammar:localFont); [n] . (grammar:ignoreFont=@font)',
      'self::identifier', 'string-length(text())=1',
      '@font', '@font="normal"', 'not(contains(@grammar, "ignoreFont"))',
      '@role!="unit"');

  defineRule(
      'omit-font', 'mathspeak.default',
      '[n] . (grammar:ignoreFont=@font)',
      'self::identifier', 'string-length(text())=1', '@font',
      'not(contains(@grammar, "ignoreFont"))', '@font="italic"');

  // Number rules
  defineRule(
      'number', 'mathspeak.default', '[n] text() (grammar:euroNum)',
      'self::number');

  defineRule(
      'mixed-number', 'mathspeak.default',
      '[n] children/*[1]; [t] "más"; [n] children/*[2]; ',
      'self::number', '@role="mixed"');

  defineRule(
      'number-with-chars', 'mathspeak.default',
      '[t] "número"; [m] CQFspaceoutNumber (grammar:protected)',
      'self::number', '@role="othernumber"',
       '"" != translate(text(), "0123456789.,", "")',
      'not(contains(@grammar, "protected"))');

  defineSpecialisedRule(
      'number-with-chars', 'mathspeak.default', 'mathspeak.brief',
      '[t] "núm"; [m] CQFspaceoutNumber (grammar:protected)');
  defineSpecialisedRule(
      'number-with-chars', 'mathspeak.brief', 'mathspeak.sbrief');

  // Maybe duplicate this rule for self::text
  defineRule(
      'number-as-upper-word', 'mathspeak.default',
      '[t] "mayúscula"; [t] CSFspaceoutText', 'self::number',
      'string-length(text())>1',
      'text()=translate(text(), ' +
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
  defineSpecialisedRule(
      'number-as-upper-word', 'mathspeak.default', 'mathspeak.brief');
  defineSpecialisedRule(
      'number-as-upper-word', 'mathspeak.default', 'mathspeak.sbrief');

  defineRule(
      'number-baseline', 'mathspeak.default',
      '[t] "línea base"; [n] text()',
      'self::number', 'not(contains(@grammar, "ignoreFont"))',
      'preceding-sibling::identifier',
      'preceding-sibling::*[1][@role="latinletter" or @role="greekletter" or' +
      ' @role="otherletter"]',
      'parent::*/parent::infixop[@role="implicit"]');
  defineSpecialisedRule(
      'number-baseline', 'mathspeak.default', 'mathspeak.brief',
      '[t] "base"; [n] text()');
  defineSpecialisedRule(
      'number-baseline', 'mathspeak.brief', 'mathspeak.sbrief');


  defineRule(
      'number-baseline-font', 'mathspeak.default',
      '[t] "línea base"; [t] @font (grammar:localFont); [n] .' +
      ' (grammar:ignoreFont=@font)',
      'self::number', '@font', 'not(contains(@grammar, "ignoreFont"))',
      '@font!="normal"', 'preceding-sibling::identifier',
      'preceding-sibling::*[@role="latinletter" or @role="greekletter" or' +
      ' @role="otherletter"]',
      'parent::*/parent::infixop[@role="implicit"]');
  defineSpecialisedRule(
      'number-baseline-font', 'mathspeak.default', 'mathspeak.brief',
      '[t] "base"; [n] text()');
  defineSpecialisedRule(
      'number-baseline-font', 'mathspeak.brief', 'mathspeak.sbrief');

  // identifier
  defineRule(
      'identifier', 'mathspeak.default', '[m] CQFspaceoutIdentifier',
      'self::identifier', 'string-length(text())>1', '@role!="unit"',
      'not(@font) or @font="normal" or contains(@grammar, "ignoreFont")',
      'text()!=translate(text(), ' +
      '"abcdefghijklmnopqrstuvwxyz\u03B1\u03B2\u03B3\u03B4' +
      '\u03B5\u03B6\u03B7\u03B8\u03B9\u03BA\u03BB\u03BC\u03BD\u03BE\u03BF' +
      '\u03C0\u03C1\u03C2\u03C3\u03C4\u03C5\u03C6\u03C7\u03C8\u03C9' +
      'ABCDEFGHIJKLMNOPQRSTUVWXYZ\u0391\u0392\u0393' +
      '\u0394\u0395\u0396\u0397\u0398\u0399\u039A\u039B\u039C\u039D\u039E' +
      '\u039F\u03A0\u03A1\u03A3\u03A3\u03A4\u03A5\u03A6\u03A7\u03A8\u03A9", ' +
      '"")');

  defineRule(
      'identifier', 'mathspeak.default', '[n] text()', 'self::identifier');

  // minus sign
  defineRule(
      'negative', 'mathspeak.default',
      '[t] "menos"; [n] children/*[1]',
      'self::prefixop', '@role="negative"', 'children/identifier');
  defineRuleAlias(
      'negative',
      'self::prefixop', '@role="negative"', 'children/number');
  defineRuleAlias(
      'negative',
      'self::prefixop', '@role="negative"',
      'children/fraction[@role="vulgar"]');

  defineRule(
      'negative', 'mathspeak.default',
      '[t] "menos"; [n] children/*[1]',
      'self::prefixop', '@role="negative"');

  // Operator rules
  defineRule(
      'prefix', 'mathspeak.default',
      '[n] text(); [n] children/*[1]',
      'self::prefixop');
  defineRule(
      'postfix', 'mathspeak.default',
      '[n] children/*[1]; [n] text()',
      'self::postfixop');

  defineRule(
      'binary-operation', 'mathspeak.default',
      '[m] children/* (sepFunc:CTXFcontentIterator);', 'self::infixop');

  // Implicit times is currently ignored!
  defineRule(
      'implicit', 'mathspeak.default',
      '[m] children/*', 'self::infixop', '@role="implicit"');
  defineRuleAlias(
      'implicit', 'self::infixop', '@role="leftsuper" or' +
      ' @role="leftsub" or @role="rightsuper" or @role="rightsub"');

  defineRule('subtraction', 'mathspeak.default',
             '[m] children/* (separator:"menos");', 'self::infixop',
             '@role="subtraction"');

  // Function rules
  defineRule(
      'function-unknown', 'mathspeak.default',
      '[n] children/*[1]; [n] children/*[2]',
      'self::appl');

  defineRule(
      'function-prefix', 'mathspeak.default',
      '[n] children/*[1]; [n] children/*[2]',
      'self::appl', 'children/*[1][@role="prefix function"]');


  // Fences rules
  defineRule(
      'fences-open-close', 'mathspeak.default',
      '[n] content/*[1]; [n] children/*[1]; [n] content/*[2]',
      'self::fenced', '@role="leftright"');

  defineRule(
      'fences-neutral', 'mathspeak.default',
      '[t] "empezar valor absoluto"; [n] children/*[1]; [t] "finalizar' +
      ' valor absoluto"',
      'self::fenced', '@role="neutral"',
      'content/*[1][text()]="|" or content/*[1][text()]="❘" or' +
      ' content/*[1][text()]="｜"');
  defineSpecialisedRule(
      'fences-neutral', 'mathspeak.default', 'mathspeak.sbrief',
      '[t] "valor absoluto"; [n] children/*[1]; [t] "finalizar valor' +
      ' absoluto"');
  defineRule(
      'fences-neutral', 'mathspeak.default',
      '[n] content/*[1]; [n] children/*[1]; [n] content/*[2]',
      'self::fenced', '@role="neutral"');


  // TODO (sorge) Maybe check for punctuated element and singleton?
  defineRule(
      'fences-set', 'mathspeak.default',
      '[t] "empezar llave"; [n] children/*[1]; [t] "finalizar llave"',
      'self::fenced', '@role="set empty" or @role="set extended"' +
      ' or @role="set singleton" or @role="set collection"',
      // 'self::fenced', '@role="leftright"', 'content/*[1][text()]="{"',
      // 'content/*[2][text()]="}"', 'count(children/*)=1',
      'not(name(../..)="appl")');
  defineSpecialisedRule(
      'fences-set', 'mathspeak.default', 'mathspeak.sbrief',
      '[t] "llave"; [n] children/*[1]; [t] "finalizar llave"');


  // Text rules
  defineRule(
      'text', 'mathspeak.default', '[n] text() (grammar:noTranslateText)',
      'self::text');

  // Special symbols
  defineRule(
      'factorial', 'mathspeak.default', '[t] "factorial"', 'self::punctuation',
      'text()="!"', 'name(preceding-sibling::*[1])!="text"');
  defineRule(
      'minus', 'mathspeak.default', '[t] "menos"',
      'self::operator', 'text()="\u002D"');

  defineRule(
      'single-prime', 'mathspeak.default', '[t] "prima"',
      'self::punctuated', '@role="prime"', 'count(children/*)=1');
  defineRule(
      'double-prime', 'mathspeak.default', '[t] "doble prima"',
      'self::punctuated', '@role="prime"', 'count(children/*)=2');
  defineRule(
      'triple-prime', 'mathspeak.default', '[t] "triple prima"',
      'self::punctuated', '@role="prime"', 'count(children/*)=3');
  defineRule(
      'quadruple-prime', 'mathspeak.default', '[t] "cuadruplicar prima"',
      'self::punctuated', '@role="prime"', 'count(children/*)=4');
  defineRule(
      'counted-prime', 'mathspeak.default',
      '[t] count(children/*); [t] "prime"',
      'self::punctuated', '@role="prime"');

  // Fraction rules
  defineRule(
      'fraction', 'mathspeak.default',
      '[t] CSFopenFracVerbose; [n] children/*[1];' +
          ' [t] CSFoverFracVerbose; [n] children/*[2]; [t] CSFcloseFracVerbose',
      'self::fraction');

  defineRule(
      'fraction', 'mathspeak.brief',
      '[t] CSFopenFracBrief; [n] children/*[1];' +
          ' [t] CSFoverFracVerbose; [n] children/*[2]; [t] CSFcloseFracBrief',
      'self::fraction');

  defineRule(
      'fraction', 'mathspeak.sbrief',
      '[t] CSFopenFracSbrief; [n] children/*[1];' +
          ' [t] CSFoverFracSbrief; [n] children/*[2]; [t] CSFcloseFracSbrief',
      'self::fraction');

  defineRule(
      'continued-fraction-outer', 'mathspeak.default',
      '[t] "fracción continua"; [n] children/*[1];' +
      '[t] "entre"; [n] children/*[2]',
      'self::fraction', 'not(ancestor::fraction)',
      'children/*[2]/descendant-or-self::*[@role="ellipsis" and ' +
      'not(following-sibling::*)]');
  defineSpecialisedRule(
      'continued-fraction-outer', 'mathspeak.default', 'mathspeak.brief',
      '[t] "frac continua"; [n] children/*[1];' +
      '[t] "entre"; [n] children/*[2]');
  defineSpecialisedRule(
      'continued-fraction-outer', 'mathspeak.brief', 'mathspeak.sbrief');

  defineRule(
      'continued-fraction-inner', 'mathspeak.default',
      '[t] "empezar fracción"; [n] children/*[1];' +
      '[t] "entre"; [n] children/*[2]',
      'self::fraction', 'ancestor::fraction',
      'children/*[2]/descendant-or-self::*[@role="ellipsis" and ' +
      'not(following-sibling::*)]');
  defineSpecialisedRule(
      'continued-fraction-inner', 'mathspeak.default', 'mathspeak.brief',
      '[t] "empezar frac"; [n] children/*[1];' +
      '[t] "entre"; [n] children/*[2]');
  defineSpecialisedRule(
      'continued-fraction-inner', 'mathspeak.brief', 'mathspeak.sbrief',
      '[t] "frac"; [n] children/*[1];' +
      '[t] "entre"; [n] children/*[2]');

  // Radical rules

  defineRule(
      'sqrt', 'mathspeak.default',
      '[t] CSFopenRadicalVerbose; [n] children/*[1];' +
          ' [t] CSFcloseRadicalVerbose',
      'self::sqrt');

  defineRule(
      'sqrt', 'mathspeak.brief',
      '[t] CSFopenRadicalBrief; [n] children/*[1];' +
          ' [t] CSFcloseRadicalBrief',
      'self::sqrt');

  defineRule(
      'sqrt', 'mathspeak.sbrief',
      '[t] CSFopenRadicalSbrief; [n] children/*[1];' +
          ' [t] CSFcloseRadicalBrief',
      'self::sqrt');

  defineRule(
      'root-small', 'mathspeak.default',
      '[t] CSFopenRadicalVerbose; [n] children/*[2];' +
          ' [t] CSFcloseRadicalVerbose',
      'self::root', 'CQFisSmallRoot');

  defineRule(
      'root-small', 'mathspeak.brief',
      '[t] CSFopenRadicalBrief; [n] children/*[2];' +
          ' [t] CSFcloseRadicalBrief',
      'self::root', 'CQFisSmallRoot');

  defineRule(
      'root-small', 'mathspeak.sbrief',
      '[t] CSFopenRadicalSbrief; [n] children/*[2];' +
          ' [t] CSFcloseRadicalBrief',
      'self::root', 'CQFisSmallRoot');

  defineRule(
      'root', 'mathspeak.default',
      '[t] CSFindexRadicalVerbose; [n] children/*[1];' +
          '[t] CSFopenRadicalVerbose; [n] children/*[2];' +
          ' [t] CSFcloseRadicalVerbose',
      'self::root');

  defineRule(
      'root', 'mathspeak.brief',
      '[t] CSFindexRadicalBrief; [n] children/*[1];' +
          '[t] CSFopenRadicalBrief; [n] children/*[2];' +
          ' [t] CSFcloseRadicalBrief',
      'self::root');

  defineRule(
      'root', 'mathspeak.sbrief',
      '[t] CSFindexRadicalSbrief; [n] children/*[1];' +
          '[t] CSFopenRadicalSbrief; [n] children/*[2];' +
          ' [t] CSFcloseRadicalBrief',
      'self::root');

  // Limits
  defineRule(
      'limboth', 'mathspeak.default',
      '[n] children/*[1]; [t] CSFunderscript; [n] children/*[2];' +
      '[t] CSFoverscript; [n] children/*[3]',
      'self::limboth', 'name(../..)="underscore" or name(../..)="overscore"',
      'following-sibling::*[@role!="underaccent" and @role!="overaccent"]');
  defineRule(
      'limlower', 'mathspeak.default',
      '[n] children/*[1]; [t] CSFunderscript; [n] children/*[2];',
      'self::limlower', 'name(../..)="underscore" or name(../..)="overscore"',
      'following-sibling::*[@role!="underaccent" and @role!="overaccent"]');
  defineRule(
      'limupper', 'mathspeak.default',
      '[n] children/*[1]; [t] CSFoverscript; [n] children/*[2];',
      'self::limupper', 'name(../..)="underscore" or name(../..)="overscore"',
      'following-sibling::*[@role!="underaccent" and @role!="overaccent"]');
  defineRuleAlias(
      'limlower', 'self::underscore', '@role="limit function"',
      'name(../..)="underscore" or name(../..)="overscore"',
      'following-sibling::*[@role!="underaccent" and @role!="overaccent"]');
  defineRuleAlias(
      'limlower', 'self::underscore', 'children/*[2][@role!="underaccent"]',
      'name(../..)="underscore" or name(../..)="overscore"',
      'following-sibling::*[@role!="underaccent" and @role!="overaccent"]');
  defineRuleAlias(
      'limupper', 'self::overscore', 'children/*[2][@role!="overaccent"]',
      'name(../..)="underscore" or name(../..)="overscore"',
      'following-sibling::*[@role!="underaccent" and @role!="overaccent"]');

  defineRule(
      'limboth-end', 'mathspeak.default',
      '[n] children/*[1]; [t] CSFunderscript; [n] children/*[2];' +
      '[t] CSFoverscript; [n] children/*[3]; [t] "finalizar índices"',
      'self::limboth');
  defineRule(
      'limlower-end', 'mathspeak.default',
      '[n] children/*[1]; [t] CSFunderscript; [n] children/*[2];' +
      ' [t] "finalizar índices"',
      'self::limlower');
  defineRule(
      'limupper-end', 'mathspeak.default',
      '[n] children/*[1]; [t] CSFoverscript; [n] children/*[2];' +
      ' [t] "finalizar índices"',
      'self::limupper');
  defineRuleAlias(
      'limlower-end', 'self::underscore', '@role="limit function"');
  defineRuleAlias(
      'limlower-end', 'self::underscore');
  defineRuleAlias(
      'limupper-end', 'self::overscore');

  // Integral rules
  defineRule(
      'integral', 'mathspeak.default',
      '[n] children/*[1]; [n] children/*[2]; [n] children/*[3];',
      'self::integral');
  defineRule(
      'integral', 'mathspeak.default',
      '[n] children/*[1]; [t] "definida"; [t] "subíndice"; [n] children/*[2];' +
      '[t] "superíndice"; [n] children/*[3]; [t] "línea base";',
      'self::limboth', '@role="integral"');
  defineSpecialisedRule(
      'integral', 'mathspeak.default', 'mathspeak.brief',
      '[n] children/*[1]; [t] "Sub"; [n] children/*[2];' +
      '[t] "Sup"; [n] children/*[3]; [t] "Base";');
  defineSpecialisedRule(
      'integral', 'mathspeak.brief', 'mathspeak.sbrief');

  defineRule(
      'bigop', 'mathspeak.default',
      '[n] children/*[1]; [n] children/*[2];',
      'self::bigop');



  // Relations
  defineRule(
      'relseq', 'mathspeak.default',
      '[m] children/* (sepFunc:CTXFcontentIterator)',
      'self::relseq');

  defineRule(
      'equality', 'mathspeak.default',
      '[n] children/*[1]; [n] content/*[1]; [n] children/*[2]',
      'self::relseq', '@role="equality"', 'count(./children/*)=2');

  defineRule(
      'multi-equality', 'mathspeak.default',
      '[m] children/* (sepFunc:CTXFcontentIterator)',
      'self::relseq', '@role="equality"', 'count(./children/*)>2');

  defineRule(
      'multrel', 'mathspeak.default',
      '[m] children/* (sepFunc:CTXFcontentIterator)',
      'self::multirel');

  // Subscripts
  defineRule(
      'subscript', 'mathspeak.default',
      '[n] children/*[1]; [t] CSFsubscriptVerbose; [n] children/*[2]',
      'self::subscript');
  defineRule(
      'subscript', 'mathspeak.brief',
      '[n] children/*[1]; [t] CSFsubscriptBrief; [n] children/*[2]',
      'self::subscript');
  defineSpecialisedRule(
      'subscript', 'mathspeak.brief', 'mathspeak.sbrief');

  defineRule(
      'subscript-baseline', 'mathspeak.default',
      '[n] children/*[1]; [t] CSFsubscriptVerbose; [n] children/*[2];' +
      ' [t] CSFbaselineVerbose',
      'self::subscript', 'following-sibling::*',
      'not(name(following-sibling::subscript/children/*[1])="empty" or ' +
      '(name(following-sibling::infixop[@role="implicit"]/children/*[1])=' +
      '"subscript" and ' +
      'name(following-sibling::*/children/*[1]/children/*[1])="empty")) and ' +
      '@role!="subsup"',
      'not(following-sibling::*[@role="rightsuper" or @role="rightsub"' +
      ' or @role="leftsub" or @role="leftsub"])');
  defineSpecialisedRule(
      'subscript-baseline', 'mathspeak.default', 'mathspeak.brief',
      '[n] children/*[1]; [t] CSFsubscriptBrief; [n] children/*[2];' +
      ' [t] CSFbaselineBriefS');
  defineSpecialisedRule(
      'subscript-baseline', 'mathspeak.brief', 'mathspeak.sbrief');
  defineRuleAlias(
      'subscript-baseline',
      'self::subscript', 'not(following-sibling::*)',
      'ancestor::fenced|ancestor::root|ancestor::sqrt|ancestor::punctuated|' +
      'ancestor::fraction',
      'not(ancestor::punctuated[@role="leftsuper" or @role="rightsub"' +
      ' or @role="rightsuper" or @role="rightsub"])');
  defineRuleAlias(
      'subscript-baseline',
      'self::subscript', 'not(following-sibling::*)',
      'ancestor::relseq|ancestor::multirel',
      sre.MathspeakUtil.generateBaselineConstraint());
  defineRuleAlias(
      'subscript-baseline',
      'self::subscript', 'not(following-sibling::*)',
      '@embellished');

  defineRule(
      'subscript-empty-sup', 'mathspeak.default',
      '[n] children/*[1]; [n] children/*[2]',
      'self::subscript',
      'name(children/*[2])="infixop"',
      'name(children/*[2][@role="implicit"]/children/*[1])="superscript"',
      'name(children/*[2]/children/*[1]/children/*[1])="empty"');
  defineSpecialisedRule(
      'subscript-empty-sup', 'mathspeak.default', 'mathspeak.brief');
  defineSpecialisedRule(
      'subscript-empty-sup', 'mathspeak.brief', 'mathspeak.sbrief');
  defineRuleAlias(
      'subscript-empty-sup', 'self::subscript',
      'name(children/*[2])="superscript"',
      'name(children/*[2]/children/*[1])="empty"');


  // Superscripts
  defineRule(
      'superscript', 'mathspeak.default',
      '[n] children/*[1]; [t] CSFsuperscriptVerbose; [n] children/*[2]',
      'self::superscript');
  defineSpecialisedRule(
      'superscript', 'mathspeak.default', 'mathspeak.brief',
      '[n] children/*[1]; [t] CSFsuperscriptBrief; [n] children/*[2]');
  defineSpecialisedRule(
      'superscript', 'mathspeak.brief', 'mathspeak.sbrief');


  defineRule(
      'superscript-baseline', 'mathspeak.default',
      '[n] children/*[1]; [t] CSFsuperscriptVerbose; [n] children/*[2];' +
      '[t] CSFbaselineVerbose',
      'self::superscript', 'following-sibling::*',
      'not(name(following-sibling::superscript/children/*[1])="empty" or ' +
      '(name(following-sibling::infixop[@role="implicit"]/children/*[1])=' +
      '"superscript" and ' +
      'name(following-sibling::*/children/*[1]/children/*[1])="empty")) and ' +
      'not(following-sibling::*[@role="rightsuper" or @role="rightsub"' +
      ' or @role="leftsub" or @role="leftsub"])');
  defineSpecialisedRule(
      'superscript-baseline', 'mathspeak.default', 'mathspeak.brief',
      '[n] children/*[1]; [t] CSFsuperscriptBrief; [n] children/*[2];' +
      '[t] CSFbaselineBriefS');
  defineSpecialisedRule(
      'superscript-baseline', 'mathspeak.brief', 'mathspeak.sbrief');
  defineRuleAlias(
      'superscript-baseline',
      'self::superscript', 'not(following-sibling::*)',
      'ancestor::punctuated',
      'ancestor::*/following-sibling::* and ' +
      'not(ancestor::punctuated[@role="leftsuper" or @role="rightsub"' +
      ' or @role="rightsuper" or @role="rightsub"])');
  defineRuleAlias(
      'superscript-baseline',
      'self::superscript', 'not(following-sibling::*)',
      'ancestor::fraction|ancestor::fenced|ancestor::root|ancestor::sqrt');
  defineRuleAlias(
      'superscript-baseline',
      'self::superscript', 'not(following-sibling::*)',
      'ancestor::relseq|ancestor::multirel',
      'not(@embellished)',
      sre.MathspeakUtil.generateBaselineConstraint());
  defineRuleAlias(
      'superscript-baseline',
      'self::superscript', 'not(following-sibling::*)',
      '@embellished', 'not(children/*[2][@role="prime"])');


  defineRule(
      'superscript-empty-sub', 'mathspeak.default',
      '[n] children/*[1]; [n] children/*[2]',
      'self::superscript',
      'name(children/*[2])="infixop"',
      'name(children/*[2][@role="implicit"]/children/*[1])="subscript"',
      'name(children/*[2]/children/*[1]/children/*[1])="empty"');
  defineSpecialisedRule(
      'superscript-empty-sub', 'mathspeak.default', 'mathspeak.brief');
  defineSpecialisedRule(
      'superscript-empty-sub', 'mathspeak.brief', 'mathspeak.sbrief');
  defineRuleAlias(
      'superscript-empty-sub', 'self::superscript',
      'name(children/*[2])="subscript"',
      'name(children/*[2]/children/*[1])="empty"');

  // Square
  defineRule(
      'square', 'mathspeak.default',
      '[n] children/*[1]; [t] "al cuadrado"',
      'self::superscript', 'children/*[2]',
      'children/*[2][text()=2]',
      'name(children/*[1])!="text" or ' +
      // Special exception dealing with footnotes.
      'not(name(children/*[1])="text" and ' +
      '(name(../../../punctuated[@role="text"]/..)="stree" ' +
      'or name(..)="stree"))',
      'name(children/*[1])!="subscript" or (' +
      // Keep squared if we have a simple subscript.
      'name(children/*[1])="subscript" and ' +
      'name(children/*[1]/children/*[1])="identifier" and ' +
      'name(children/*[1]/children/*[2])="number" and ' +
      'children/*[1]/children/*[2][@role!="mixed"] and ' +
      'children/*[1]/children/*[2][@role!="othernumber"])',
      'not(@embellished)');
  defineSpecialisedRule(
      'square', 'mathspeak.default', 'mathspeak.brief');
  defineSpecialisedRule(
      'square', 'mathspeak.default', 'mathspeak.sbrief');

  // Cube
  defineRule(
      'cube', 'mathspeak.default',
      '[n] children/*[1]; [t] "al cubo"',
      'self::superscript', 'children/*[2]',
      'children/*[2][text()=3]',
      'name(children/*[1])!="text" or ' +
      // Special exception dealing with footnotes.
      'not(name(children/*[1])="text" and ' +
      '(name(../../../punctuated[@role="text"]/..)="stree" ' +
      'or name(..)="stree"))',
      'name(children/*[1])!="subscript" or (' +
      // Keep cubed if we have a simple subscript.
      'name(children/*[1])="subscript" and ' +
      'name(children/*[1]/children/*[1])="identifier" and ' +
      'name(children/*[1]/children/*[2])="number" and ' +
      'children/*[1]/children/*[2][@role!="mixed"] and ' +
      'children/*[1]/children/*[2][@role!="othernumber"])',
      'not(@embellished)');
  defineSpecialisedRule(
      'cube', 'mathspeak.default', 'mathspeak.brief');
  defineSpecialisedRule(
      'cube', 'mathspeak.default', 'mathspeak.sbrief');

  // Primes
  // This rule uses some redundancy for ordering!
  defineRule(
      'prime', 'mathspeak.default',
      '[n] children/*[1]; [n] children/*[2]',
      'self::superscript', 'children/*[2]', 'children/*[2][@role="prime"]');
  defineSpecialisedRule(
      'prime', 'mathspeak.default', 'mathspeak.brief');
  defineSpecialisedRule(
      'prime', 'mathspeak.default', 'mathspeak.sbrief');

  defineRule(
      'prime-subscript', 'mathspeak.default',
      '[n] children/*[1]/children/*[1]; [n] children/*[2];' +
      ' [t] CSFsubscriptVerbose; [n] children/*[1]/children/*[2]',
      'self::superscript', 'children/*[2][@role="prime"]',
      'name(children/*[1])="subscript"', 'not(following-sibling::*)');
  defineSpecialisedRule(
      'prime-subscript', 'mathspeak.default', 'mathspeak.brief',
      '[n] children/*[1]/children/*[1]; [n] children/*[2];' +
      ' [t] CSFsubscriptBrief; [n] children/*[1]/children/*[2]');
  defineSpecialisedRule(
      'prime-subscript', 'mathspeak.brief', 'mathspeak.sbrief');

  defineRule(
      'prime-subscript-baseline', 'mathspeak.default',
      '[n] children/*[1]/children/*[1]; [n] children/*[2];' +
      ' [t] CSFsubscriptVerbose; [n] children/*[1]/children/*[2];' +
      ' [t] CSFbaselineVerbose',
      'self::superscript', 'children/*[2][@role="prime"]',
      'name(children/*[1])="subscript"', 'following-sibling::*');
  defineSpecialisedRule(
      'prime-subscript-baseline', 'mathspeak.default', 'mathspeak.brief',
      '[n] children/*[1]/children/*[1]; [n] children/*[2];' +
      ' [t] CSFsubscriptBrief; [n] children/*[1]/children/*[2];' +
      ' [t] CSFbaselineBriefS');
  defineSpecialisedRule(
      'prime-subscript-baseline', 'mathspeak.brief', 'mathspeak.sbrief');
  defineRuleAlias(
      'prime-subscript-baseline',
      'self::superscript', 'children/*[2][@role="prime"]',
      'name(children/*[1])="subscript"', 'not(following-sibling::*)',
      '@embellished');

  // Modifiers
  defineRule(
      'overscore', 'mathspeak.default',
      '[t] "modificando superior"; [n] children/*[1]; [t] "con"; [n]' +
      ' children/*[2]',
      'self::overscore', 'children/*[2][@role="overaccent"]'
  );
  defineSpecialisedRule(
      'overscore', 'mathspeak.default', 'mathspeak.brief',
      '[t] "mod superior"; [n] children/*[1]; [t] "con"; [n] children/*[2]'
  );
  defineSpecialisedRule(
      'overscore', 'mathspeak.brief', 'mathspeak.sbrief');

  defineRule(
      'double-overscore', 'mathspeak.default',
      '[t] "modificando superior superior"; [n] children/*[1]; [t] "con";' +
      ' [n] children/*[2]',
      'self::overscore', 'children/*[2][@role="overaccent"]',
      'name(children/*[1])="overscore"',
      'children/*[1]/children/*[2][@role="overaccent"]'
  );
  defineSpecialisedRule(
      'double-overscore', 'mathspeak.default', 'mathspeak.brief',
      '[t] "mod superior superior"; [n] children/*[1]; [t] "con"; [n]' +
      ' children/*[2]'
  );
  defineSpecialisedRule(
      'double-overscore', 'mathspeak.brief', 'mathspeak.sbrief');

  defineRule(
      'underscore', 'mathspeak.default',
      '[t] "modificando inferior"; [n] children/*[1]; [t] "con"; [n]' +
      ' children/*[2]',
      'self::underscore', 'children/*[2][@role="underaccent"]'
  );
  defineSpecialisedRule(
      'underscore', 'mathspeak.default', 'mathspeak.brief',
      '[t] "mod inferior"; [n] children/*[1]; [t] "con"; [n] children/*[2]'
  );
  defineSpecialisedRule(
      'underscore', 'mathspeak.brief', 'mathspeak.sbrief');

  defineRule(
      'double-underscore', 'mathspeak.default',
      '[t] "modificando inferior inferior"; [n] children/*[1]; [t] "con";' +
      ' [n] children/*[2]',
      'self::underscore', 'children/*[2][@role="underaccent"]',
      'name(children/*[1])="underscore"',
      'children/*[1]/children/*[2][@role="underaccent"]');
  defineSpecialisedRule(
      'double-underscore', 'mathspeak.default', 'mathspeak.brief',
      '[t] "mod inferior inferior"; [n] children/*[1]; [t] "con"; [n]' +
      ' children/*[2]'
  );
  defineSpecialisedRule(
      'double-underscore', 'mathspeak.brief', 'mathspeak.sbrief');

  defineRule(
      'overbar', 'mathspeak.default',
      '[n] children/*[1]; [t] "barra"',
      'self::overscore',
      '@role="latinletter" or @role="greekletter" or @role="otherletter"',
      'children/*[2][@role="overaccent"]',   // redundancy
      'children/*[2][text()="\u00AF" or text()="\uFFE3" or text()="\uFF3F"' +
      ' or text()="\u005F" or text()="\u203E"]'
  );
  defineSpecialisedRule(
      'overbar', 'mathspeak.default', 'mathspeak.brief',
      '[n] children/*[1]; [t] "barra"'
  );
  defineSpecialisedRule(
      'overbar', 'mathspeak.brief', 'mathspeak.sbrief');

  defineRule(
      'underbar', 'mathspeak.default',
      '[n] children/*[1]; [t] "subbarra"',
      'self::underscore',
      '@role="latinletter" or @role="greekletter" or @role="otherletter"',
      'children/*[2][@role="underaccent"]',   // redundancy
      'children/*[2][text()="\u00AF" or text()="\uFFE3" or text()="\uFF3F"' +
      ' or text()="\u005F" or text()="\u203E"]'
  );
  defineSpecialisedRule(
      'underbar', 'mathspeak.default', 'mathspeak.brief',
      '[n] children/*[1]; [t] "subbarra"'
  );
  defineSpecialisedRule(
      'underbar', 'mathspeak.brief', 'mathspeak.sbrief');

  defineRule(
      'overtilde', 'mathspeak.default',
      '[n] children/*[1]; [t] "tilde"',
      'self::overscore',
      'children/*[2][@role="overaccent"]',   // redundancy
      '@role="latinletter" or @role="greekletter" or @role="otherletter"',
      'children/*[2][text()="\u007E" or text()="\u02DC" or text()="\u223C"' +
      ' or text()="\uFF5E"]'
  );
  defineSpecialisedRule(
      'overtilde', 'mathspeak.default', 'mathspeak.brief',
      '[n] children/*[1]; [t] "tilde"'
  );
  defineSpecialisedRule(
      'overtilde', 'mathspeak.brief', 'mathspeak.sbrief');

  defineRule(
      'undertilde', 'mathspeak.default',
      '[n] children/*[1]; [t] "subtilde"',
      'self::underscore',
      '@role="latinletter" or @role="greekletter" or @role="otherletter"',
      'children/*[2][@role="underaccent"]',   // redundancy
      'children/*[2][text()="\u007E" or text()="\u02DC" or text()="\u223C"' +
      ' or text()="\uFF5E"]'
  );
  defineSpecialisedRule(
      'undertilde', 'mathspeak.default', 'mathspeak.brief',
      '[n] children/*[1]; [t] "subtilde"'
  );
  defineSpecialisedRule(
      'undertilde', 'mathspeak.brief', 'mathspeak.sbrief');

  // Layout Elements
  defineRule(
      'matrix-fence', 'mathspeak.default',
      '[n] children/*[1];',
      'self::fenced', 'count(children/*)=1', 'name(children/*[1])="matrix"');

  defineRule(
      'matrix', 'mathspeak.default',
      '[t] "empezar matriz"; [t] count(children/*);  [t] "por";' +
      '[t] count(children/*[1]/children/*); ' +
      '[m] children/* (ctxtFunc:CTXFordinalCounterEs,context:"fila ");' +
      ' [t] "finalizar matriz"',
      'self::matrix');
  defineRule(
      'matrix', 'mathspeak.sbrief',
      '[t] "matriz"; [t] count(children/*);  [t] "por";' +
      '[t] count(children/*[1]/children/*); ' +
      '[m] children/* (ctxtFunc:CTXFordinalCounterEs,context:" ");' +
      ' [t] "finalizar matriz"', 'self::matrix');
  defineRuleAlias(
      'matrix', 'self::vector');

  defineRule(
      'matrix-row', 'mathspeak.default',
      '[m] children/* (ctxtFunc:CTXFordinalCounterEs,context:"columna");' +
      '[p] (pause: 200)',
      'self::row');
  defineRule(
      'row-with-label', 'mathspeak.default',
      '[t] "con etiqueta"; [n] content/*[1]; ' +
      '[t] "finalizar etiqueta" (pause: 200); ' +
      '[m] children/* (ctxtFunc:CTXFordinalCounterEs,context:"columna")',
      'self::row', 'content');
  defineRule(
      'row-with-label', 'mathspeak.brief',
      '[t] "etiqueta"; [n] content/*[1]; ' +
      '[m] children/* (ctxtFunc:CTXFordinalCounterEs,context:"columna")',
      'self::row', 'content');
  defineSpecialisedRule(
      'row-with-label', 'mathspeak.brief', 'mathspeak.sbrief');
  defineRule(
      'row-with-text-label', 'mathspeak.sbrief',
      '[t] "etiqueta"; [t] CSFRemoveParens;' +
      '[m] children/* (ctxtFunc:CTXFordinalCounterEs,context:"columna")',
      'self::row', 'content', 'name(content/cell/children/*[1])="text"');
  defineRule(
      'empty-row', 'mathspeak.default',
      '[t] "espacio"', 'self::row', 'count(children/*)=0');

  defineRule(
      'matrix-cell', 'mathspeak.default',
      '[n] children/*[1]; [p] (pause: 300)', 'self::cell');

  defineRule(
      'empty-cell', 'mathspeak.default',
      '[t] "espacio"; [p] (pause: 300)', 'self::cell', 'count(children/*)=0');


  defineRule(
      'determinant', 'mathspeak.default',
      '[t] "empezar determinante"; [t] count(children/*);  [t] "por";' +
      '[t] count(children/*[1]/children/*);' +
      ' [m] children/* (ctxtFunc:CTXFordinalCounterEs,context:"fila ");' +
      ' [t] "finalizar determinante"',
      'self::matrix', '@role="determinant"');
  defineSpecialisedRule(
      'determinant', 'mathspeak.default', 'mathspeak.sbrief',
      '[t] "determinante"; [t] count(children/*);  [t] "por";' +
      '[t] count(children/*[1]/children/*);' +
      ' [m] children/* (ctxtFunc:CTXFordinalCounterEs,context:"fila ");' +
      ' [t] "finalizar determinante"');

  defineRule(
      'determinant-simple', 'mathspeak.default',
      '[t] "empezar determinante"; [t] count(children/*);  [t] "por";' +
      '[t] count(children/*[1]/children/*);' +
      ' [m] children/* (ctxtFunc:CTXFordinalCounterEs,context:"fila",' +
      'grammar:simpleDet); [t] "finalizar determinante"',
      'self::matrix', '@role="determinant"', 'CQFdetIsSimple');
  defineSpecialisedRule(
      'determinant-simple', 'mathspeak.default', 'mathspeak.sbrief',
      '[t] "determinante"; [t] count(children/*);  [t] "por";' +
      '[t] count(children/*[1]/children/*);' +
      ' [m] children/* (ctxtFunc:CTXFordinalCounterEs,context:"fila",' +
      'grammar:simpleDet); [t] "finalizar determinante"');
  defineRule(
      'row-simple', 'mathspeak.default',
      '[m] children/*;',
      'self::row', '@role="determinant"', 'contains(@grammar, "simpleDet")');

  defineRule(
      'layout', 'mathspeak.default', '[t] "empezar esquema"; ' +
      '[m] children/* (ctxtFunc:CTXFordinalCounterEs,context:"fila ");' +
      ' [t] "finalizar esquema"', 'self::table');
  defineRule(
      'layout', 'mathspeak.sbrief', '[t] "esquema"; ' +
      '[m] children/* (ctxtFunc:CTXFordinalCounterEs,context:"fila ");' +
      ' [t] "finalizar esquema"', 'self::table');

  defineRule(
      'binomial', 'mathspeak.default',
      '[t] "empezar binomial"; [n] children/*[1]/children/*[1]; ' +
      '[t] "en"; [n] children/*[2]/children/*[1]; ' +
      ' [t] "finalizar binomial"',
      'self::vector', '@role="binomial"');
  defineRule(
      'binomial', 'mathspeak.sbrief',
      '[t] "binomial"; [n] children/*[1]/children/*[1]; ' +
      '[t] "en"; [n] children/*[2]/children/*[1]; ' +
      ' [t] "finalizar binomial"',
      'self::vector', '@role="binomial"');

  defineRule(
      'cases', 'mathspeak.default', '[t] "empezar esquema"; ' +
      '[n] content/*[1]; [t] "alargada"; ' +
      '[m] children/* (ctxtFunc:CTXFordinalCounterEs,context:"fila ");' +
      ' [t] "finalizar esquema"', 'self::cases');
  defineRule(
      'cases', 'mathspeak.sbrief', '[t] "esquema"; ' +
      '[n] content/*[1]; [t] "alargada"; ' +
      '[m] children/* (ctxtFunc:CTXFordinalCounterEs,context:"fila ");' +
      ' [t] "finalizar esquema"', 'self::cases');

  // Multiline rules.
  defineRuleAlias(
      'layout', 'self::multiline');

  defineRule(
      'line', 'mathspeak.default',
      '[m] children/*', 'self::line');
  defineRule(
      'line-with-label', 'mathspeak.default',
      '[t] "con etiqueta"; [n] content/*[1]; ' +
      '[t] "finalizar etiqueta" (pause: 200); ' +
      '[m] children/*',
      'self::line', 'content');
  defineSpecialisedRule(
      'line-with-label', 'mathspeak.default', 'mathspeak.brief',
      '[t] "etiqueta"; [n] content/*[1] (pause: 200); [m] children/*');
  defineSpecialisedRule(
      'line-with-label', 'mathspeak.brief', 'mathspeak.sbrief');
  defineRule(
      'line-with-text-label', 'mathspeak.sbrief',
      '[t] "etiqueta"; [t] CSFRemoveParens; [m] children/*',
      'self::line', 'content', 'name(content/cell/children/*[1])="text"');
  defineRule(
      'empty-line', 'mathspeak.default',
      '[t] "espacio"', 'self::line', 'count(children/*)=0', 'not(content)');
  defineSpecialisedRule('empty-line', 'mathspeak.default', 'mathspeak.brief');
  defineSpecialisedRule('empty-line', 'mathspeak.brief', 'mathspeak.sbrief');
  defineRule(
      'empty-line-with-label', 'mathspeak.default',
      '[t] "con etiqueta"; [n] content/*[1]; ' +
      '[t] "finalizar etiqueta" (pause: 200); ' +
      '[t] "espacio"', 'self::line', 'count(children/*)=0', 'content');
  defineSpecialisedRule(
      'empty-line-with-label', 'mathspeak.default', 'mathspeak.brief',
      '[t] "etiqueta"; [n] content/*[1] (pause: 200); [t] "espacio"');
  defineSpecialisedRule(
      'empty-line-with-label', 'mathspeak.brief', 'mathspeak.sbrief');

  // Enclose
  defineRule(
      'enclose', 'mathspeak.default',
      '[t] "empezar rodear"; [t] @role (grammar:localEnclose); ' +
      '[n] children/*[1]; [t] "finalizar rodear"',
      'self::enclose');
  defineRuleAlias(
      'overbar', 'self::enclose', '@role="top"');
  defineRuleAlias(
      'underbar', 'self::enclose', '@role="bottom"');
  defineRule(
      'leftbar', 'mathspeak.default',
      '[t] "barra vertical"; [n] children/*[1]',
      'self::enclose', '@role="left"');
  defineRule(
      'rightbar', 'mathspeak.default',
      '[n] children/*[1]; [t] "barra vertical"',
      'self::enclose', '@role="right"');

  // Crossout
  defineRule(
      'crossout', 'mathspeak.default',
      '[t] "tachado"; [n] children/*[1]; [t] "finalizar tachado"',
      'self::enclose', '@role="updiagonalstrike" or' +
      ' @role="downdiagonalstrike" or @role="horizontalstrike"');
  defineRule(
      'cancel', 'mathspeak.default',
      '[t] "tachado"; [n] children/*[1]/children/*[1]; [t] "con";' +
      ' [n] children/*[2]; [t] "finalizar tachado"',
      'self::overscore', '@role="updiagonalstrike" or' +
      ' @role="downdiagonalstrike" or @role="horizontalstrike"');
  defineSpecialisedRule(
      'cancel', 'mathspeak.default', 'mathspeak.brief');
  defineSpecialisedRule(
      'cancel', 'mathspeak.default', 'mathspeak.sbrief');
  defineRuleAlias('cancel',
      'self::underscore', '@role="updiagonalstrike" or' +
      ' @role="downdiagonalstrike" or @role="horizontalstrike"');
  defineRule(
      'cancel-reverse', 'mathspeak.default',
      '[t] "tachado"; [n] children/*[2]/children/*[1]; [t] "con";' +
      ' [n] children/*[1]; [t] "finalizar tachado"',
      'self::overscore', 'name(children/*[2])="enclose"',
      'children/*[2][@role="updiagonalstrike" or' +
      ' @role="downdiagonalstrike" or @role="horizontalstrike"]');
  defineSpecialisedRule(
      'cancel-reverse', 'mathspeak.default', 'mathspeak.brief');
  defineSpecialisedRule(
      'cancel-reverse', 'mathspeak.default', 'mathspeak.sbrief');
  defineRuleAlias('cancel-reverse',
      'self::underscore', 'name(children/*[2])="enclose"',
      'children/*[2][@role="updiagonalstrike" or' +
      ' @role="downdiagonalstrike" or @role="horizontalstrike"]');

  // Rules for punctuated expressions.
  defineRule(
      'end-punct', 'mathspeak.default',
      '[m] children/*',
      'self::punctuated', '@role="endpunct"');

  defineRule(
      'start-punct', 'mathspeak.default',
      '[n] content/*[1]; [m] children/*[position()>1]',
      'self::punctuated', '@role="startpunct"');

  defineRule(
      'integral-punct', 'mathspeak.default',
      '[n] children/*[1]; [n] children/*[3]',
      'self::punctuated', '@role="integral"');

  defineRule(
      'punctuated', 'mathspeak.default',
      '[m] children/*',
      'self::punctuated');

  // Unit rules.
  defineRule(
      'unit', 'mathspeak.default',
      '[t] text() (grammar:annotation="unit":translate)',
      'self::identifier', '@role="unit"');
  defineRule(
      'unit', 'mathspeak.default',
      '[t] text() (grammar:annotation="unit":translate:plural)',
      'self::identifier', '@role="unit"',
      'not(contains(@grammar, "singularUnit"))');
  defineRule(
      'unit-square', 'mathspeak.default',
      '[t] "square"; [n] children/*[1]',
      'self::superscript', '@role="unit"', 'children/*[2][text()=2]',
      'name(children/*[1])="identifier"');

  defineRule(
      'unit-cubic', 'mathspeak.default',
      '[t] "cubic"; [n] children/*[1]',
      'self::superscript', '@role="unit"', 'children/*[2][text()=3]',
      'name(children/*[1])="identifier"');
  defineRule(
      'reciprocal', 'mathspeak.default',
      '[t] "reciprocal"; [n] children/*[1]',
      'self::superscript', '@role="unit"', 'name(children/*[1])="identifier"',
      'name(children/*[2])="prefixop"', 'children/*[2][@role="negative"]',
      'children/*[2]/children/*[1][text()=1]',
      'count(preceding-sibling::*)=0 or preceding-sibling::*[@role!="unit"]');
  defineRule(
      'reciprocal', 'mathspeak.default',
      '[t] "per"; [n] children/*[1]',
      'self::superscript', '@role="unit"', 'name(children/*[1])="identifier"',
      'name(children/*[2])="prefixop"', 'children/*[2][@role="negative"]',
      'children/*[2]/children/*[1][text()=1]',
      'preceding-sibling::*[@role="unit"]');
  defineRule(
      'unit-combine', 'mathspeak.default',
      '[m] children/* (sepFunc:CTXFunitMultipliers)',
      'self::infixop', '@role="unit"');
  defineRule(
      'unit-combine', 'mathspeak.default',
      '[m] children/* (sepFunc:CTXFunitMultipliers);',
      'self::infixop', '@role="multiplication" or @role="implicit"',
      'children/*[@role="unit"]');
  defineRule(
      'unit-combine', 'mathspeak.default',
      '[n] . (grammar:singularUnit);',
      'self::infixop', '@role="multiplication" or @role="implicit"',
      'children/*[@role="unit"]',
      'not(contains(@grammar, "singularUnit"))', 'CQFoneLeft');
  defineRule(
      'unit-divide', 'mathspeak.default',
      '[n] children/*[1]; [t] "per"; [n] children/*[2]',
      'self::fraction', '@role="unit"');

};


// TODO (localise): Adapt by language. Get this from MathspeakRules or a general
// utility function.
/**
 * Component strings for tensor speech rules.
 * @enum {string}
 * @private
 */
sre.MathspeakSpanish.componentString_ = {
  2 : 'CSFbaseline',
  1 : 'CSFsubscript',
  0 : 'CSFsuperscript'
};


/**
 * Child number translation for tensor speech rules.
 * @enum {number}
 * @private
 */
sre.MathspeakSpanish.childNumber_ = {
  4 : 2,
  3 : 3,
  2 : 1,
  1 : 4,
  0 : 5
};


/**
 * Generates the rule strings and constraints for tensor rules.
 * @param {string} constellation Bitvector representing of possible tensor
 *     constellation.
 * @return {Array.<string>} A list consisting of additional constraints for the
 *     tensor rule, plus the strings for the verbose and brief rule, in that
 *     order.
 * @private
 */
sre.MathspeakSpanish.generateTensorRuleStrings_ = function(constellation) {
  var constraints = [];
  var verbString = '';
  var briefString = '';
  var constel = parseInt(constellation, 2);

  for (var i = 0; i < 5; i++) {
    var childString = 'children/*[' +
        sre.MathspeakSpanish.childNumber_[i] + ']';
    if (constel & 1) {
      var compString = sre.MathspeakSpanish.componentString_[i % 3];
      verbString = '[t] ' + compString + 'Verbose; [n] ' + childString + ';' +
          verbString;
      briefString = '[t] ' + compString + 'Brief; [n] ' + childString + ';' +
          briefString;
    } else {
      constraints.unshift('name(' + childString + ')="empty"');
    }
    constel >>= 1;
  }
  constraints.push(verbString);
  constraints.push(briefString);
  return constraints;
};


/**
 * Generator for tensor speech rules.
 * @private
 */
sre.MathspeakSpanish.generateMathspeakTensorRules_ = function() {
  // Constellations are built as bitvectors with the meaning:
  //
  //  lsub lsuper base rsub rsuper
  var constellations = ['11111', '11110', '11101', '11100',
                        '10111', '10110', '10101', '10100',
                        '01111', '01110', '01101', '01100'
  ];
  for (var i = 0, constel; constel = constellations[i]; i++) {
    var name = 'tensor' + constel;
    var components = sre.MathspeakSpanish.generateTensorRuleStrings_(constel);
    var briefStr = components.pop();
    var verbStr = components.pop();
    var verbList = [name, 'mathspeak.default', verbStr, 'self::tensor'].
        concat(components);
    var briefList = [name, 'mathspeak.brief', briefStr, 'self::tensor'].
        concat(components);
    // Rules without neighbour.
    defineRule.apply(null, verbList);
    defineRule.apply(null, briefList);
    defineSpecialisedRule(name, 'mathspeak.brief', 'mathspeak.sbrief');
    // Rules with baseline.
    var baselineStr = sre.MathspeakSpanish.componentString_[2];
    verbStr += '; [t]' + baselineStr + 'Verbose';
    briefStr += '; [t]' + baselineStr + 'Brief';
    name = name + '-baseline';
    verbList = [name, 'mathspeak.default', verbStr, 'self::tensor',
                'following-sibling::*'].
        concat(components);
    briefList = [name, 'mathspeak.brief', briefStr, 'self::tensor',
                 'following-sibling::*'].
        concat(components);
    defineRule.apply(null, verbList);
    defineRule.apply(null, briefList);
    defineSpecialisedRule(name, 'mathspeak.brief', 'mathspeak.sbrief');
    // Rules without neighbour but baseline.
    var aliasList = [name, 'self::tensor', 'not(following-sibling::*)',
                     'ancestor::fraction|ancestor::punctuated|' +
                     'ancestor::fenced|ancestor::root|ancestor::sqrt|' +
                     'ancestor::relseq|ancestor::multirel|' +
                     '@embellished'].
        concat(components);
    defineRuleAlias.apply(null, aliasList);
  }
};

});  // goog.scope


sre.MathspeakSpanish.getInstance().initializer = [
  sre.MathspeakSpanish.initCustomFunctions_,
  sre.MathspeakSpanish.initMathspeakSpanish_,
  sre.MathspeakSpanish.generateMathspeakTensorRules_
];

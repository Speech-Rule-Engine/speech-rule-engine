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



/**
 * Rule initialization.
 * @constructor
 * @extends {sre.MathStore}
 */
sre.MathspeakSpanish = function() {
  sre.MathspeakSpanish.base(this, 'constructor');
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
  // addCSF('CSFvulgarFraction', sre.MathspeakUtil.vulgarFraction);
  // addCQF('CQFvulgarFractionSmall', sre.MathspeakUtil.isSmallVulgarFraction);

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

  addCQF('CQFoneLeft', sre.MathspeakSpanishUtil.oneLeft);

  // Dummy.
  addCQF('CQFresetNesting', sre.MathspeakUtil.resetNestingDepth);

  // DIAGRAM: Temporary for testing:
  addCSF('CSFRemoveParens', sre.MathspeakUtil.removeParens);
};


/**
 * Mathspeak rules.
 * @private
*/
sre.MathspeakSpanish.initMathspeakSpanish_ = function() {
  // Initial rule
  defineRule(
      'stree', 'mathspeak.spanish',
      '[n] ./*[1]', 'self::stree', 'CQFresetNesting');


  // Dummy rules
  defineRule(
      'unknown', 'mathspeak.spanish', '[n] text()',
      'self::unknown');

  defineRule(
      'protected', 'mathspeak.spanish', '[t] text()',
      'self::*', '@role="protected"');

  defineRule(
      'omit-empty', 'mathspeak.spanish',
      '',
      'self::empty');
  defineRule(
      'blank-empty', 'mathspeak.spanish',
      '[t] "espacio"', 'self::empty', 'count(../*)=1',
      'name(../..)="cell" or name(../..)="line"');

  // Font rules
  defineRule(
      'font', 'mathspeak.spanish',
      '[t] @font (grammar:localFont); [n] self::* (grammar:ignoreFont=@font)',
      'self::*', '@font', 'not(contains(@grammar, "ignoreFont"))',
      '@font!="normal"');

  defineRule(
      'font-identifier-short', 'mathspeak.spanish',
      '[t] @font (grammar:localFont); [n] self::* (grammar:ignoreFont=@font)',
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
      'font-identifier', 'mathspeak.spanish',
      '[t] @font (grammar:localFont); [n] self::* (grammar:ignoreFont=@font)',
      'self::identifier', 'string-length(text())=1',
      '@font', '@font="normal"', 'not(contains(@grammar, "ignoreFont"))',
      '@role!="unit"');

  defineRule(
      'omit-font', 'mathspeak.spanish',
      '[n] self::* (grammar:ignoreFont=@font)',
      'self::identifier', 'string-length(text())=1', '@font',
      'not(contains(@grammar, "ignoreFont"))', '@font="italic"');

  // Number rules
  defineRule(
      'number', 'mathspeak.spanish', '[n] text() (grammar:euroNum)',
      'self::number');

  defineRule(
      'mixed-number', 'mathspeak.spanish',
      '[n] children/*[1]; [t] "más"; [n] children/*[2]; ',
      'self::number', '@role="mixed"');

  defineRule(
      'number-with-chars', 'mathspeak.spanish',
      '[t] "número"; [m] CQFspaceoutNumber', 'self::number',
      '"" != translate(text(), "0123456789.,", "")',
      'text() != translate(text(), "0123456789.,", "")');

  defineSpecialisedRule(
      'number-with-chars', 'mathspeak.spanish', 'mathspeak.brief',
      '[t] "núm"; [m] CQFspaceoutNumber');
  defineSpecialisedRule(
      'number-with-chars', 'mathspeak.brief', 'mathspeak.sbrief');

  // Maybe duplicate this rule for self::text
  defineRule(
      'number-as-upper-word', 'mathspeak.spanish',
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

  defineRule(
      'number-baseline', 'mathspeak.spanish',
      '[t] "línea base"; [n] text()',
      'self::number', 'not(contains(@grammar, "ignoreFont"))',
      'preceding-sibling::identifier',
      'preceding-sibling::*[1][@role="latinletter" or @role="greekletter" or' +
      ' @role="otherletter"]',
      'parent::*/parent::infixop[@role="implicit"]');
  defineSpecialisedRule(
      'number-baseline', 'mathspeak.spanish', 'mathspeak.brief',
      '[t] "base"; [n] text()');
  defineSpecialisedRule(
      'number-baseline', 'mathspeak.brief', 'mathspeak.sbrief');


  defineRule(
      'number-baseline-font', 'mathspeak.spanish',
      '[t] "línea base"; [t] @font (grammar:localFont); [n] self::* (grammar:ignoreFont=@font)',
      'self::number', '@font', 'not(contains(@grammar, "ignoreFont"))',
      '@font!="normal"', 'preceding-sibling::identifier',
      'preceding-sibling::*[@role="latinletter" or @role="greekletter" or' +
      ' @role="otherletter"]',
      'parent::*/parent::infixop[@role="implicit"]');
  defineSpecialisedRule(
      'number-baseline-font', 'mathspeak.spanish', 'mathspeak.brief',
      '[t] "base"; [n] text()');
  defineSpecialisedRule(
      'number-baseline-font', 'mathspeak.brief', 'mathspeak.sbrief');

  // identifier
  defineRule(
      'identifier', 'mathspeak.spanish', '[m] CQFspaceoutIdentifier',
      'self::identifier', 'string-length(text())>1', '@role!="unit"',
      '@role!="protected"',
      'not(@font) or @font="normal" or contains(@grammar, "ignoreFont")');

  defineRule(
      'identifier', 'mathspeak.spanish', '[n] text()',
      'self::identifier', '@role="protected"');

  // minus sign
  defineRule(
      'negative', 'mathspeak.spanish',
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
      'negative', 'mathspeak.spanish',
      '[t] "menos"; [n] children/*[1]',
      'self::prefixop', '@role="negative"');

  // Operator rules
  defineRule(
      'prefix', 'mathspeak.spanish',
      '[n] text(); [n] children/*[1]',
      'self::prefixop');
  defineRule(
      'postfix', 'mathspeak.spanish',
      '[n] children/*[1]; [n] text()',
      'self::postfixop');

  defineRule(
      'binary-operation', 'mathspeak.spanish',
      '[m] children/* (sepFunc:CTXFcontentIterator);', 'self::infixop');

  // Implicit times is currently ignored!
  defineRule(
      'implicit', 'mathspeak.spanish',
      '[m] children/*', 'self::infixop', '@role="implicit"');
  defineRuleAlias(
      'implicit', 'self::infixop', '@role="leftsuper" or' +
      ' @role="leftsub" or @role="rightsuper" or @role="rightsub"');

  defineRule('subtraction', 'mathspeak.spanish',
             '[m] children/* (separator:"menos");', 'self::infixop',
             '@role="subtraction"');

  // Function rules
  defineRule(
      'function-unknown', 'mathspeak.spanish',
      '[n] children/*[1]; [n] children/*[2]',
      'self::appl');

  defineRule(
      'function-prefix', 'mathspeak.spanish',
      '[n] children/*[1]; [n] children/*[2]',
      'self::appl', 'children/*[1][@role="prefix function"]');


  // Fences rules
  defineRule(
      'fences-open-close', 'mathspeak.spanish',
      '[n] content/*[1]; [n] children/*[1]; [n] content/*[2]',
      'self::fenced', '@role="leftright"');

  defineRule(
      'fences-neutral', 'mathspeak.spanish',
      '[t] "empezar valor absoluto"; [n] children/*[1]; [t] "finalizar valor absoluto"',
      'self::fenced', '@role="neutral"',
      'content/*[1][text()]="|" or content/*[1][text()]="❘" or' +
      ' content/*[1][text()]="｜"');
  defineSpecialisedRule(
      'fences-neutral', 'mathspeak.spanish', 'mathspeak.sbrief',
      '[t] "valor absoluto"; [n] children/*[1]; [t] "finalizar valor absoluto"');
  defineRule(
      'fences-neutral', 'mathspeak.spanish',
      '[n] content/*[1]; [n] children/*[1]; [n] content/*[2]',
      'self::fenced', '@role="neutral"');


  // TODO (sorge) Maybe check for punctuated element and singleton?
  defineRule(
      'fences-set', 'mathspeak.spanish',
      '[t] "empezar llave"; [n] children/*[1]; [t] "finalizar llave"',
      'self::fenced', '@role="leftright"', 'content/*[1][text()]="{"',
      'content/*[2][text()]="}"', 'count(children/*)=1',
      'not(name(../..)="appl")');
  defineSpecialisedRule(
      'fences-set', 'mathspeak.spanish', 'mathspeak.sbrief',
      '[t] "llave"; [n] children/*[1]; [t] "finalizar llave"');


  // Text rules
  defineRule(
      'text', 'mathspeak.spanish', '[n] text()', 'self::text');

  // Special symbols
  defineRule(
      'factorial', 'mathspeak.spanish', '[t] "factorial"', 'self::punctuation',
      'text()="!"', 'name(preceding-sibling::*[1])!="text"');
  defineRule(
      'minus', 'mathspeak.spanish', '[t] "menos"',
      'self::operator', 'text()="\u002D"');

  defineRule(
      'single-prime', 'mathspeak.spanish', '[t] "prima"',
      'self::punctuated', '@role="prime"', 'count(children/*)=1');
  defineRule(
      'double-prime', 'mathspeak.spanish', '[t] "doble prima"',
      'self::punctuated', '@role="prime"', 'count(children/*)=2');
  defineRule(
      'triple-prime', 'mathspeak.spanish', '[t] "triple prima"',
      'self::punctuated', '@role="prime"', 'count(children/*)=3');
  defineRule(
      'quadruple-prime', 'mathspeak.spanish', '[t] "cuadruplicar prima"',
      'self::punctuated', '@role="prime"', 'count(children/*)=4');
  defineRule(
      'counted-prime', 'mathspeak.spanish',
      '[t] count(children/*); [t] "prime"',
      'self::punctuated', '@role="prime"');

  // Fraction rules

  defineRule(
      'fraction', 'mathspeak.spanish',
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

  // defineRule(
  //     'vulgar-fraction', 'mathspeak.spanish',
  //     '[t] CSFvulgarFraction',
  //     '[t] "empezar fracción"; [n] children/*[1];' +
  //     '[t] "entre"; [n] children/*[2]; [t] "finalizar fracción"',
  //     'self::fraction', '@role="vulgar"');
  // defineSpecialisedRule(
  //     'vulgar-fraction', 'mathspeak.spanish', 'mathspeak.brief');
  // defineSpecialisedRule(
  //     'vulgar-fraction', 'mathspeak.spanish', 'mathspeak.sbrief');

  defineRule(
      'continued-fraction-outer', 'mathspeak.spanish',
      '[t] "fracción continua"; [n] children/*[1];' +
      '[t] "entre"; [n] children/*[2]',
      'self::fraction', 'not(ancestor::fraction)',
      'children/*[2]/descendant-or-self::*[@role="ellipsis" and ' +
      'not(following-sibling::*)]');
  defineSpecialisedRule(
      'continued-fraction-outer', 'mathspeak.spanish', 'mathspeak.brief',
      '[t] "ContinuedFrac"; [n] children/*[1];' +
      '[t] "entre"; [n] children/*[2]');
  defineSpecialisedRule(
      'continued-fraction-outer', 'mathspeak.brief', 'mathspeak.sbrief');

  defineRule(
      'continued-fraction-inner', 'mathspeak.spanish',
      '[t] "empezar fracción"; [n] children/*[1];' +
      '[t] "entre"; [n] children/*[2]',
      'self::fraction', 'ancestor::fraction',
      'children/*[2]/descendant-or-self::*[@role="ellipsis" and ' +
      'not(following-sibling::*)]');
  defineSpecialisedRule(
      'continued-fraction-inner', 'mathspeak.spanish', 'mathspeak.brief',
      '[t] "StartFrac"; [n] children/*[1];' +
      '[t] "entre"; [n] children/*[2]');
  defineSpecialisedRule(
      'continued-fraction-inner', 'mathspeak.brief', 'mathspeak.sbrief',
      '[t] "Frac"; [n] children/*[1];' +
      '[t] "entre"; [n] children/*[2]');

  // Radical rules

  defineRule(
      'sqrt', 'mathspeak.spanish',
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
      'root-small', 'mathspeak.spanish',
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
      'root', 'mathspeak.spanish',
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
      'limboth', 'mathspeak.spanish',
      '[n] children/*[1]; [t] CSFunderscript; [n] children/*[2];' +
      '[t] CSFoverscript; [n] children/*[3]',
      'self::limboth', 'name(../..)="underscore" or name(../..)="overscore"',
      'following-sibling::*[@role!="underaccent" and @role!="overaccent"]');
  defineRule(
      'limlower', 'mathspeak.spanish',
      '[n] children/*[1]; [t] CSFunderscript; [n] children/*[2];',
      'self::limlower', 'name(../..)="underscore" or name(../..)="overscore"',
      'following-sibling::*[@role!="underaccent" and @role!="overaccent"]');
  defineRule(
      'limupper', 'mathspeak.spanish',
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
      'limboth-end', 'mathspeak.spanish',
      '[n] children/*[1]; [t] CSFunderscript; [n] children/*[2];' +
      '[t] CSFoverscript; [n] children/*[3]; [t] "finalizar índices"',
      'self::limboth');
  defineRule(
      'limlower-end', 'mathspeak.spanish',
      '[n] children/*[1]; [t] CSFunderscript; [n] children/*[2];' +
      ' [t] "finalizar índices"',
      'self::limlower');
  defineRule(
      'limupper-end', 'mathspeak.spanish',
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
      'integral', 'mathspeak.spanish',
      '[n] children/*[1]; [n] children/*[2]; [n] children/*[3];',
      'self::integral');
  defineRule(
      'integral', 'mathspeak.spanish',
      '[n] children/*[1]; [t] "definida"; [t] "subíndice"; [n] children/*[2];' +
      '[t] "superíndice"; [n] children/*[3]; [t] "línea base";',
      'self::limboth', '@role="integral"');
  defineSpecialisedRule(
      'integral', 'mathspeak.spanish', 'mathspeak.brief',
      '[n] children/*[1]; [t] "Sub"; [n] children/*[2];' +
      '[t] "Sup"; [n] children/*[3]; [t] "Base";');
  defineSpecialisedRule(
      'integral', 'mathspeak.brief', 'mathspeak.sbrief');

  defineRule(
      'bigop', 'mathspeak.spanish',
      '[n] children/*[1]; [n] children/*[2];',
      'self::bigop');



  // Relations
  defineRule(
      'relseq', 'mathspeak.spanish',
      '[m] children/* (sepFunc:CTXFcontentIterator)',
      'self::relseq');

  defineRule(
      'equality', 'mathspeak.spanish',
      '[n] children/*[1]; [n] content/*[1]; [n] children/*[2]',
      'self::relseq', '@role="equality"', 'count(./children/*)=2');

  defineRule(
      'multi-equality', 'mathspeak.spanish',
      '[m] ./children/* (sepFunc:CTXFcontentIterator)',
      'self::relseq', '@role="equality"', 'count(./children/*)>2');

  defineRule(
      'multrel', 'mathspeak.spanish',
      '[m] children/* (sepFunc:CTXFcontentIterator)',
      'self::multirel');

  // Subscripts
  defineRule(
      'subscript', 'mathspeak.spanish',
      '[n] children/*[1]; [t] CSFsubscriptVerbose; [n] children/*[2]',
      'self::subscript');
  defineRule(
      'subscript', 'mathspeak.brief',
      '[n] children/*[1]; [t] CSFsubscriptBrief; [n] children/*[2]',
      'self::subscript');
  defineSpecialisedRule(
      'subscript', 'mathspeak.brief', 'mathspeak.sbrief');

  // defineRule(
  //     'subscript-simple', 'mathspeak.spanish',
  //     '[n] children/*[1]; [n] children/*[2]',
  //     'self::subscript',
  //     'name(./children/*[1])="identifier"',
  //     // Second child is a number but not mixed or other.
  //     'name(./children/*[2])="number"',
  //     './children/*[2][@role!="mixed"]',
  //     './children/*[2][@role!="othernumber"]');
  // defineSpecialisedRule(
  //     'subscript-simple', 'mathspeak.spanish', 'mathspeak.brief');
  // defineSpecialisedRule(
  //     'subscript-simple', 'mathspeak.spanish', 'mathspeak.sbrief');

  defineRule(
      'subscript-baseline', 'mathspeak.spanish',
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
      'subscript-baseline', 'mathspeak.spanish', 'mathspeak.brief',
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
      'subscript-empty-sup', 'mathspeak.spanish',
      '[n] children/*[1]; [n] children/*[2]',
      'self::subscript',
      'name(children/*[2])="infixop"',
      'name(children/*[2][@role="implicit"]/children/*[1])="superscript"',
      'name(children/*[2]/children/*[1]/children/*[1])="empty"');
  defineSpecialisedRule(
      'subscript-empty-sup', 'mathspeak.spanish', 'mathspeak.brief');
  defineSpecialisedRule(
      'subscript-empty-sup', 'mathspeak.brief', 'mathspeak.sbrief');
  defineRuleAlias(
      'subscript-empty-sup', 'self::subscript',
      'name(children/*[2])="superscript"',
      'name(children/*[2]/children/*[1])="empty"');


  // Superscripts
  defineRule(
      'superscript', 'mathspeak.spanish',
      '[n] children/*[1]; [t] CSFsuperscriptVerbose; [n] children/*[2]',
      'self::superscript');
  defineSpecialisedRule(
      'superscript', 'mathspeak.spanish', 'mathspeak.brief',
      '[n] children/*[1]; [t] CSFsuperscriptBrief; [n] children/*[2]');
  defineSpecialisedRule(
      'superscript', 'mathspeak.brief', 'mathspeak.sbrief');


  defineRule(
      'superscript-baseline', 'mathspeak.spanish',
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
      'superscript-baseline', 'mathspeak.spanish', 'mathspeak.brief',
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
      'superscript-empty-sub', 'mathspeak.spanish',
      '[n] children/*[1]; [n] children/*[2]',
      'self::superscript',
      'name(children/*[2])="infixop"',
      'name(children/*[2][@role="implicit"]/children/*[1])="subscript"',
      'name(children/*[2]/children/*[1]/children/*[1])="empty"');
  defineSpecialisedRule(
      'superscript-empty-sub', 'mathspeak.spanish', 'mathspeak.brief');
  defineSpecialisedRule(
      'superscript-empty-sub', 'mathspeak.brief', 'mathspeak.sbrief');
  defineRuleAlias(
      'superscript-empty-sub', 'self::superscript',
      'name(children/*[2])="subscript"',
      'name(children/*[2]/children/*[1])="empty"');

  // Square
  defineRule(
      'square', 'mathspeak.spanish',
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
      'square', 'mathspeak.spanish', 'mathspeak.brief');
  defineSpecialisedRule(
      'square', 'mathspeak.spanish', 'mathspeak.sbrief');

  // Cube
  defineRule(
      'cube', 'mathspeak.spanish',
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
      'cube', 'mathspeak.spanish', 'mathspeak.brief');
  defineSpecialisedRule(
      'cube', 'mathspeak.spanish', 'mathspeak.sbrief');

  // Primes
  // This rule uses some redundancy for ordering!
  defineRule(
      'prime', 'mathspeak.spanish',
      '[n] children/*[1]; [n] children/*[2]',
      'self::superscript', 'children/*[2]', 'children/*[2][@role="prime"]');
  defineSpecialisedRule(
      'prime', 'mathspeak.spanish', 'mathspeak.brief');
  defineSpecialisedRule(
      'prime', 'mathspeak.spanish', 'mathspeak.sbrief');

  defineRule(
      'prime-subscript', 'mathspeak.spanish',
      '[n] children/*[1]/children/*[1]; [n] children/*[2];' +
      ' [t] CSFsubscriptVerbose; [n] children/*[1]/children/*[2]',
      'self::superscript', 'children/*[2][@role="prime"]',
      'name(children/*[1])="subscript"', 'not(following-sibling::*)');
  defineSpecialisedRule(
      'prime-subscript', 'mathspeak.spanish', 'mathspeak.brief',
      '[n] children/*[1]/children/*[1]; [n] children/*[2];' +
      ' [t] CSFsubscriptBrief; [n] children/*[1]/children/*[2]');
  defineSpecialisedRule(
      'prime-subscript', 'mathspeak.brief', 'mathspeak.sbrief');

  defineRule(
      'prime-subscript-baseline', 'mathspeak.spanish',
      '[n] children/*[1]/children/*[1]; [n] children/*[2];' +
      ' [t] CSFsubscriptVerbose; [n] children/*[1]/children/*[2];' +
      ' [t] CSFbaselineVerbose',
      'self::superscript', 'children/*[2][@role="prime"]',
      'name(children/*[1])="subscript"', 'following-sibling::*');
  defineSpecialisedRule(
      'prime-subscript-baseline', 'mathspeak.spanish', 'mathspeak.brief',
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

  defineRule(
      'prime-subscript-simple', 'mathspeak.spanish',
      '[n] children/*[1]/children/*[1]; [n] children/*[2];' +
      '[n] children/*[1]/children/*[2]',
      'self::superscript', 'children/*[2][@role="prime"]',
      'name(children/*[1])="subscript"',
      'name(children/*[1]/children/*[1])="identifier"',
      // Second child is a number but not mixed or other.
      'name(children/*[1]/children/*[2])="number"',
      'children/*[1]/children/*[2][@role!="mixed"]',
      'children/*[1]/children/*[2][@role!="othernumber"]'
  );
  defineSpecialisedRule(
      'prime-subscript-simple', 'mathspeak.spanish', 'mathspeak.brief');
  defineSpecialisedRule(
      'prime-subscript-simple', 'mathspeak.spanish', 'mathspeak.sbrief');

  // Modifiers
  defineRule(
      'overscore', 'mathspeak.spanish',
      '[t] "modificando superior"; [n] children/*[1]; [t] "con"; [n] children/*[2]',
      'self::overscore', 'children/*[2][@role="overaccent"]'
  );
  defineSpecialisedRule(
      'overscore', 'mathspeak.spanish', 'mathspeak.brief',
      '[t] "ModAbove"; [n] children/*[1]; [t] "con"; [n] children/*[2]'
  );
  defineSpecialisedRule(
      'overscore', 'mathspeak.brief', 'mathspeak.sbrief');

  defineRule(
      'double-overscore', 'mathspeak.spanish',
      '[t] "modificando superior superior"; [n] children/*[1]; [t] "con";' +
      ' [n] children/*[2]',
      'self::overscore', 'children/*[2][@role="overaccent"]',
      'name(children/*[1])="overscore"',
      'children/*[1]/children/*[2][@role="overaccent"]'
  );
  defineSpecialisedRule(
      'double-overscore', 'mathspeak.spanish', 'mathspeak.brief',
      '[t] "ModAbove Above"; [n] children/*[1]; [t] "con"; [n] children/*[2]'
  );
  defineSpecialisedRule(
      'double-overscore', 'mathspeak.brief', 'mathspeak.sbrief');

  defineRule(
      'underscore', 'mathspeak.spanish',
      '[t] "modificando inferior"; [n] children/*[1]; [t] "con"; [n] children/*[2]',
      'self::underscore', 'children/*[2][@role="underaccent"]'
  );
  defineSpecialisedRule(
      'underscore', 'mathspeak.spanish', 'mathspeak.brief',
      '[t] "ModBelow"; [n] children/*[1]; [t] "con"; [n] children/*[2]'
  );
  defineSpecialisedRule(
      'underscore', 'mathspeak.brief', 'mathspeak.sbrief');

  defineRule(
      'double-underscore', 'mathspeak.spanish',
      '[t] "modificando inferior inferior"; [n] children/*[1]; [t] "con";' +
      ' [n] children/*[2]',
      'self::underscore', 'children/*[2][@role="underaccent"]',
      'name(children/*[1])="underscore"',
      'children/*[1]/children/*[2][@role="underaccent"]');
  defineSpecialisedRule(
      'double-underscore', 'mathspeak.spanish', 'mathspeak.brief',
      '[t] "ModBelow Below"; [n] children/*[1]; [t] "con"; [n] children/*[2]'
  );
  defineSpecialisedRule(
      'double-underscore', 'mathspeak.brief', 'mathspeak.sbrief');

  defineRule(
      'overbar', 'mathspeak.spanish',
      '[n] children/*[1]; [t] "barra"',
      'self::overscore',
      '@role="latinletter" or @role="greekletter" or @role="otherletter"',
      'children/*[2][@role="overaccent"]',   // redundancy
      'children/*[2][text()="\u00AF" or text()="\uFFE3" or text()="\uFF3F"' +
      ' or text()="\u005F" or text()="\u203E"]'
  );
  defineSpecialisedRule(
      'overbar', 'mathspeak.spanish', 'mathspeak.brief',
      '[n] children/*[1]; [t] "barra"'
  );
  defineSpecialisedRule(
      'overbar', 'mathspeak.brief', 'mathspeak.sbrief');

  defineRule(
      'underbar', 'mathspeak.spanish',
      '[n] children/*[1]; [t] "subbarra"',
      'self::underscore',
      '@role="latinletter" or @role="greekletter" or @role="otherletter"',
      'children/*[2][@role="underaccent"]',   // redundancy
      'children/*[2][text()="\u00AF" or text()="\uFFE3" or text()="\uFF3F"' +
      ' or text()="\u005F" or text()="\u203E"]'
  );
  defineSpecialisedRule(
      'underbar', 'mathspeak.spanish', 'mathspeak.brief',
      '[n] children/*[1]; [t] "subbarra"'
  );
  defineSpecialisedRule(
      'underbar', 'mathspeak.brief', 'mathspeak.sbrief');

  defineRule(
      'overtilde', 'mathspeak.spanish',
      '[n] children/*[1]; [t] "tilde"',
      'self::overscore',
      'children/*[2][@role="overaccent"]',   // redundancy
      '@role="latinletter" or @role="greekletter" or @role="otherletter"',
      'children/*[2][text()="\u007E" or text()="\u02DC" or text()="\u223C"' +
      ' or text()="\uFF5E"]'
  );
  defineSpecialisedRule(
      'overtilde', 'mathspeak.spanish', 'mathspeak.brief',
      '[n] children/*[1]; [t] "tilde"'
  );
  defineSpecialisedRule(
      'overtilde', 'mathspeak.brief', 'mathspeak.sbrief');

  defineRule(
      'undertilde', 'mathspeak.spanish',
      '[n] children/*[1]; [t] "subtilde"',
      'self::underscore',
      '@role="latinletter" or @role="greekletter" or @role="otherletter"',
      'children/*[2][@role="underaccent"]',   // redundancy
      'children/*[2][text()="\u007E" or text()="\u02DC" or text()="\u223C"' +
      ' or text()="\uFF5E"]'
  );
  defineSpecialisedRule(
      'undertilde', 'mathspeak.spanish', 'mathspeak.brief',
      '[n] children/*[1]; [t] "subtilde"'
  );
  defineSpecialisedRule(
      'undertilde', 'mathspeak.brief', 'mathspeak.sbrief');

  // Layout Elements
  defineRule(
      'matrix-fence', 'mathspeak.spanish',
      '[n] children/*[1];',
      'self::fenced', 'count(children/*)=1', 'name(children/*[1])="matrix"');

  defineRule(
      'matrix', 'mathspeak.spanish',
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
      'matrix-row', 'mathspeak.spanish',
      '[m] children/* (ctxtFunc:CTXFordinalCounterEs,context:"columna");' +
      '[p] (pause: 200)',
      'self::row');
  defineRule(
      'row-with-label', 'mathspeak.spanish',
      '[t] "con etiqueta"; [n] content/*[1]; ' +
      '[t] "finalizar etiqueta" (pause: 200); ' +
      '[m] children/* (ctxtFunc:CTXFordinalCounterEs,context:"columna")',
      'self::row', 'content');
  // DIAGRAM: Next three rules are temporary for testing:
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
      'empty-row', 'mathspeak.spanish',
      '[t] "espacio"', 'self::row', 'count(children/*)=0');

  defineRule(
      'matrix-cell', 'mathspeak.spanish',
      '[n] children/*[1]; [p] (pause: 300)', 'self::cell');

  // defineRule(
  //     'empty-cell', 'mathspeak.spanish',
  //     '[t] "espacio"', 'self::cell', 'count(children/*)=1', 'children/empty');
  defineRule(
      'empty-cell', 'mathspeak.spanish',
      '[t] "espacio"; [p] (pause: 300)', 'self::cell', 'count(children/*)=0');


  defineRule(
      'determinant', 'mathspeak.spanish',
      '[t] "empezar determinante"; [t] count(children/*);  [t] "por";' +
      '[t] count(children/*[1]/children/*);' +
      ' [m] children/* (ctxtFunc:CTXFordinalCounterEs,context:"fila ");' +
      ' [t] "finalizar determinante"',
      'self::matrix', '@role="determinant"');
  defineSpecialisedRule(
      'determinant', 'mathspeak.spanish', 'mathspeak.sbrief',
      '[t] "determinante"; [t] count(children/*);  [t] "por";' +
      '[t] count(children/*[1]/children/*);' +
      ' [m] children/* (ctxtFunc:CTXFordinalCounterEs,context:"fila ");' +
      ' [t] "finalizar determinante"');

  defineRule(
      'determinant-simple', 'mathspeak.spanish',
      '[t] "empezar determinante"; [t] count(children/*);  [t] "por";' +
      '[t] count(children/*[1]/children/*);' +
      ' [m] children/* (ctxtFunc:CTXFordinalCounterEs,context:"fila",' +
      'grammar:simpleDet); [t] "finalizar determinante"',
      'self::matrix', '@role="determinant"', 'CQFdetIsSimple');
  defineSpecialisedRule(
      'determinant-simple', 'mathspeak.spanish', 'mathspeak.sbrief',
      '[t] "determinante"; [t] count(children/*);  [t] "por";' +
      '[t] count(children/*[1]/children/*);' +
      ' [m] children/* (ctxtFunc:CTXFordinalCounterEs,context:"fila",' +
      'grammar:simpleDet); [t] "finalizar determinante"');
  defineRule(
      'row-simple', 'mathspeak.spanish',
      '[m] children/*;',
      'self::row', '@role="determinant"', 'contains(@grammar, "simpleDet")');

  defineRule(
      'layout', 'mathspeak.spanish', '[t] "empezar esquema"; ' +
      '[m] children/* (ctxtFunc:CTXFordinalCounterEs,context:"fila ");' +
      ' [t] "finalizar esquema"', 'self::table');
  defineRule(
      'layout', 'mathspeak.sbrief', '[t] "esquema"; ' +
      '[m] children/* (ctxtFunc:CTXFordinalCounterEs,context:"fila ");' +
      ' [t] "finalizar esquema"', 'self::table');

  defineRule(
      'binomial', 'mathspeak.spanish',
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
      'cases', 'mathspeak.spanish', '[t] "empezar esquema"; ' +
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
  // For testing:
  //
  // defineRule(
  //     'multiline', 'mathspeak.spanish',
  //     '[t] "multiline equation";' +
  //     '[m] children/* (ctxtFunc:CTXFordinalCounterEs,context:"line")',
  //     'self::multiline');

  defineRule(
      'line', 'mathspeak.spanish',
      '[m] children/*', 'self::line');
  defineRule(
      'line-with-label', 'mathspeak.spanish',
      '[t] "with Label"; [n] content/*[1]; [t] "EndLabel"(pause: 200); ' +
      '[m] children/*',
      'self::line', 'content');
  // DIAGRAM: Next three rules are temporary for testing:
  defineRule(
      'line-with-label', 'mathspeak.brief',
      '[t] "Label"; [n] content/*[1]; ' +
      '[m] children/*',
      'self::line', 'content');
  defineSpecialisedRule(
      'line-with-label', 'mathspeak.brief', 'mathspeak.sbrief');
  defineRule(
      'line-with-text-label', 'mathspeak.sbrief',
      '[t] "Label"; [t] CSFRemoveParens;' +
      '[m] children/*',
      'self::line', 'content', 'name(content/cell/children/*[1])="text"');
  defineRule(
      'empty-line', 'mathspeak.spanish',
      '[t] "espacio"', 'self::line', 'count(children/*)=0');
  defineRule(
      'empty-line-with-label', 'mathspeak.spanish',
      '[t] "with Label"; [n] content/*[1]; [t] "EndLabel"(pause: 200); ' +
      '[t] "espacio"', 'self::line', 'count(children/*)=0');

  // Enclose
  defineRule(
      'enclose', 'mathspeak.spanish',
      '[t] "StartEnclose"; [t] @role; [n] children/*[1]; [t] "EndEnclose"',
      'self::enclose');
  defineRuleAlias(
      'overbar', 'self::enclose', '@role="top"');
  defineRuleAlias(
      'underbar', 'self::enclose', '@role="bottom"');
  defineRule(
      'leftbar', 'mathspeak.spanish',
      '[t] "vertical-bar"; [n] children/*[1]',
      'self::enclose', '@role="left"');
  defineRule(
      'rightbar', 'mathspeak.spanish',
      '[t] "vertical-bar"; [n] children/*[1]',
      'self::enclose', '@role="right"');

  // Crossout
  defineRule(
      'crossout', 'mathspeak.spanish',
      '[t] "tachado"; [n] children/*[1]; [t] "finalizar tachado"',
      'self::enclose', '@role="updiagonalstrike" or' +
      ' @role="downdiagonalstrike" or @role="horizontalstrike"');
  defineRule(
      'cancel', 'mathspeak.spanish',
      '[t] "tachado"; [n] children/*[1]/children/*[1]; [t] "con";' +
      ' [n] children/*[2]; [t] "finalizar tachado"',
      'self::overscore', '@role="updiagonalstrike" or' +
      ' @role="downdiagonalstrike" or @role="horizontalstrike"');
  defineSpecialisedRule(
      'cancel', 'mathspeak.spanish', 'mathspeak.brief');
  defineSpecialisedRule(
      'cancel', 'mathspeak.spanish', 'mathspeak.sbrief');
  defineRuleAlias('cancel',
      'self::underscore', '@role="updiagonalstrike" or' +
      ' @role="downdiagonalstrike" or @role="horizontalstrike"');
  defineRule(
      'cancel-reverse', 'mathspeak.spanish',
      '[t] "tachado"; [n] children/*[2]/children/*[1]; [t] "con";' +
      ' [n] children/*[1]; [t] "finalizar tachado"',
      'self::overscore', 'name(children/*[2])="enclose"',
      'children/*[2][@role="updiagonalstrike" or' +
      ' @role="downdiagonalstrike" or @role="horizontalstrike"]');
  defineSpecialisedRule(
      'cancel-reverse', 'mathspeak.spanish', 'mathspeak.brief');
  defineSpecialisedRule(
      'cancel-reverse', 'mathspeak.spanish', 'mathspeak.sbrief');
  defineRuleAlias('cancel-reverse',
      'self::underscore', 'name(children/*[2])="enclose"',
      'children/*[2][@role="updiagonalstrike" or' +
      ' @role="downdiagonalstrike" or @role="horizontalstrike"]');

  // Rules for punctuated expressions.
  defineRule(
      'end-punct', 'mathspeak.spanish',
      '[m] children/*',
      'self::punctuated', '@role="endpunct"');

  defineRule(
      'start-punct', 'mathspeak.spanish',
      '[n] content/*[1]; [m] children/*[position()>1]',
      'self::punctuated', '@role="startpunct"');

  defineRule(
      'integral-punct', 'mathspeak.spanish',
      '[n] children/*[1]; [n] children/*[3]',
      'self::punctuated', '@role="integral"');

  defineRule(
      'punctuated', 'mathspeak.spanish',
      '[m] children/*',
      'self::punctuated');

  // Unit rules.
  defineRule(
      'unit', 'mathspeak.spanish',
      '[t] text() (grammar:annotation="unit":translate)',
      'self::identifier', '@role="unit"');
  defineRule(
      'unit', 'mathspeak.spanish',
      '[t] text() (grammar:annotation="unit":translate:plural)',
      'self::identifier', '@role="unit"',
      'not(contains(@grammar, "singularUnit"))');
  defineRule(
      'unit-square', 'mathspeak.spanish',
      '[t] "square"; [n] children/*[1]',
      'self::superscript', '@role="unit"', 'children/*[2][text()=2]',
      'name(children/*[1])="identifier"');

  defineRule(
      'unit-cubic', 'mathspeak.spanish',
      '[t] "cubic"; [n] children/*[1]',
      'self::superscript', '@role="unit"', 'children/*[2][text()=3]',
      'name(children/*[1])="identifier"');
  defineRule(
      'reciprocal', 'mathspeak.spanish',
      '[t] "reciprocal"; [n] children/*[1]',
      'self::superscript', '@role="unit"', 'name(children/*[1])="identifier"',
      'name(children/*[2])="prefixop"', 'children/*[2][@role="negative"]',
      'children/*[2]/children/*[1][text()=1]',
      'count(preceding-sibling::*)=0 or preceding-sibling::*[@role!="unit"]');
  defineRule(
      'reciprocal', 'mathspeak.spanish',
      '[t] "per"; [n] children/*[1]',
      'self::superscript', '@role="unit"', 'name(children/*[1])="identifier"',
      'name(children/*[2])="prefixop"', 'children/*[2][@role="negative"]',
      'children/*[2]/children/*[1][text()=1]',
      'preceding-sibling::*[@role="unit"]');
  defineRule(
      'unit-combine', 'mathspeak.spanish',
      '[m] children/*', 'self::infixop', '@role="unit"');
  defineRule(
      'unit-combine', 'mathspeak.spanish',
      '[m] children/* (sepFunc:CTXFunitMultipliers);',
      'self::infixop', '@role="multiplication" or @role="implicit"',
      'children/*[@role="unit"]');
  defineRule(
      'unit-combine', 'mathspeak.spanish',
      '[n] self::* (grammar:singularUnit);',
      'self::infixop', '@role="multiplication" or @role="implicit"',
      'children/*[@role="unit"]',
      'not(contains(@grammar, "singularUnit"))', 'CQFoneLeft'); // 'children/*[1][text()=1]');
  defineRule(
      'unit-divide', 'mathspeak.spanish',
      '[n] children/*[1]; [t] "per"; [n] children/*[2]',
      'self::fraction', '@role="unit"');

  
  // DIAGRAM: For testing.
  // defineRule(
  //   'repeat-initial', 'mathspeak.spanish',
  //   '[t] "Thus"; [n] ../../../../children/*[1]/children/*[1]',
  //   'self::cell', 'count(children/*)=0',
  //   '../../../parent::table[@role="equality"]'
  // );

};

  // TODO (sorge): Adapt by language. Get this from MathspeakRules or a general
  // utility file. (TextHelp)
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
    var childString = 'children/*[' + sre.MathspeakSpanish.childNumber_[i] + ']';
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
    var verbList = [name, 'mathspeak.spanish', verbStr, 'self::tensor'].
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
    verbList = [name, 'mathspeak.spanish', verbStr, 'self::tensor',
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

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
 * @fileoverview Nemeth rules.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.NemethRules');

goog.require('sre.MathStore');
goog.require('sre.MathmlStoreUtil');
goog.require('sre.MathspeakUtil');
goog.require('sre.NemethUtil');



/**
 * Rule initialization.
 * @constructor
 * @extends {sre.MathStore}
 */
sre.NemethRules = function() {
  sre.NemethRules.base(this, 'constructor');

  this.locale = 'nemeth';
};
goog.inherits(sre.NemethRules, sre.MathStore);
goog.addSingletonGetter(sre.NemethRules);


/**
 * @type {sre.MathStore}
 */
sre.NemethRules.mathStore = sre.NemethRules.getInstance();


/** @private */
sre.NemethRules.defineRule_ = goog.bind(
    sre.NemethRules.mathStore.defineRule,
    sre.NemethRules.mathStore);


/** @private */
sre.NemethRules.defineRuleAlias_ = goog.bind(
    sre.NemethRules.mathStore.defineRulesAlias,
    sre.NemethRules.mathStore);


/** @private */
sre.NemethRules.defineSpecialisedRule_ = goog.bind(
    sre.NemethRules.mathStore.defineSpecialisedRule,
    sre.NemethRules.mathStore);


/** @private */
sre.NemethRules.addContextFunction_ = goog.bind(
    sre.NemethRules.mathStore.contextFunctions.add,
    sre.NemethRules.mathStore.contextFunctions);


/** @private */
sre.NemethRules.addCustomQuery_ = goog.bind(
    sre.NemethRules.mathStore.customQueries.add,
    sre.NemethRules.mathStore.customQueries);


/** @private */
sre.NemethRules.addCustomString_ = goog.bind(
    sre.NemethRules.mathStore.customStrings.add,
    sre.NemethRules.mathStore.customStrings);


goog.scope(function() {
var defineRule = sre.NemethRules.defineRule_;
var defineRuleAlias = sre.NemethRules.defineRuleAlias_;
var defineSpecialisedRule = sre.NemethRules.defineSpecialisedRule_;

var addCQF = sre.NemethRules.addCustomQuery_;
var addCSF = sre.NemethRules.addCustomString_;
var addCTXF = sre.NemethRules.addContextFunction_;


/**
 * Initialize the custom functions.
 * @private
 */
sre.NemethRules.initCustomFunctions_ = function() {
  addCQF('CQFspaceoutNumber', sre.MathspeakUtil.spaceoutNumber);
  addCQF('CQFspaceoutIdentifier', sre.MathspeakUtil.spaceoutIdentifier);

  addCSF('CSFspaceoutText', sre.MathspeakUtil.spaceoutText);
  // Fraction function.
  addCSF('CSFopenFracVerbose', sre.NemethUtil.openingFraction);
  addCSF('CSFcloseFracVerbose', sre.NemethUtil.closingFraction);
  addCSF('CSFoverFracVerbose', sre.NemethUtil.overFraction);
  addCSF('CSFvulgarFraction', sre.MathspeakUtil.vulgarFraction);
  addCQF('CQFvulgarFractionSmall', sre.MathspeakUtil.isSmallVulgarFraction);

  // Radical function.
  addCSF('CSFopenRadicalVerbose', sre.NemethUtil.openingRadical);
  addCSF('CSFcloseRadicalVerbose', sre.NemethUtil.closingRadical);
  addCSF('CSFindexRadicalVerbose', sre.NemethUtil.indexRadical);

  // Sub- Superscript.
  addCSF('CSFsuperscriptVerbose', sre.MathspeakUtil.superscriptVerbose);
  addCSF('CSFsubscriptVerbose', sre.MathspeakUtil.subscriptVerbose);
  addCSF('CSFbaselineVerbose', sre.MathspeakUtil.baselineVerbose);

  // Over- Underscore.
  addCSF('CSFunderscript', sre.MathspeakUtil.nestedUnderscore);
  addCSF('CSFoverscript', sre.MathspeakUtil.nestedOverscore);

  addCTXF('CTXFordinalCounter', sre.MathspeakUtil.ordinalCounter);
  addCTXF('CTXFcontentIterator', sre.MathmlStoreUtil.contentIterator);

  // Layout related.
  addCQF('CQFdetIsSimple', sre.MathspeakUtil.determinantIsSimple);
  addCSF('CSFRemoveParens', sre.MathspeakUtil.removeParens);

  // Dummy.
  addCQF('CQFresetNesting', sre.MathspeakUtil.resetNestingDepth);

};


/**
 * Nemeth rules.
 * @private
*/
sre.NemethRules.initNemethRules_ = function() {
  // Initial rule
  defineRule(
      'stree', 'default.default',
      '[n] ./*[1]', 'self::stree', 'CQFresetNesting');


  // Dummy rules
  defineRule(
      'unknown', 'default.default', '[n] text()',
      'self::unknown');

  defineRule(
      'protected', 'default.default', '[t] text()',
      'self::*', '@role="protected"');

  defineRule(
      'omit-empty', 'default.default',
      '[p] (pause:100)', // Pause necessary to voice separators between empty.
      'self::empty');
  defineRule(
      'blank-empty', 'default.default',
      '[t] "Blank"', 'self::empty', 'count(../*)=1',
      'name(../..)="cell" or name(../..)="line"');

  // Font rules
  defineRule(
      'font', 'default.default',
      '[t] @font (grammar:localFont); [n] . (grammar:ignoreFont=@font)',
       'self::*', '@font', 'not(contains(@grammar, "ignoreFont"))',
      '@font!="normal"');

  defineRule(
      'font-identifier-short', 'default.default',
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
      'font-identifier', 'default.default',
      '[t] @font (grammar:localFont); [n] . (grammar:ignoreFont=@font)',
      'self::identifier', 'string-length(text())=1',
      '@font', '@font="normal"', 'not(contains(@grammar, "ignoreFont"))',
      '@role!="unit"');

  defineRule(
      'omit-font', 'default.default',
      '[n] . (grammar:ignoreFont=@font)',
      'self::identifier', 'string-length(text())=1', '@font',
      'not(contains(@grammar, "ignoreFont"))', '@font="italic"');

  // defineRule(
  //     'german-font', 'default.default',
  //     '[t] "German"; [n] . (grammar:ignoreFont=@font)',
  //     'self::*', '@font', 'not(contains(@grammar, "ignoreFont"))',
  //     '@font="fraktur"');

  // defineRule(
  //     'german-font', 'default.default',
  //     '[t] "bold German"; [n] . (grammar:ignoreFont=@font)',
  //     'self::*', '@font', 'not(contains(@grammar, "ignoreFont"))',
  //     '@font="bold-fraktur"');

  // Number rules
  defineRule(
      'number', 'default.default', '[n] text()', 'self::number');

  defineRule(
      'mixed-number', 'default.default',
      '[n] children/*[1]; [t] "and"; [n] children/*[2]; ',
      'self::number', '@role="mixed"');

  defineRule(
      'number-with-chars', 'default.default',
      '[t] "Number"; [m] CQFspaceoutNumber', 'self::number',
      '"" != translate(text(), "0123456789.,", "")',
      'text() != translate(text(), "0123456789.,", "")');

  defineSpecialisedRule(
      'number-with-chars', 'default.default', 'nemeth.brief',
      '[t] "Num"; [m] CQFspaceoutNumber');
  defineSpecialisedRule(
      'number-with-chars', 'nemeth.brief', 'nemeth.sbrief');

  // Maybe duplicate this rule for self::text
  defineRule(
      'number-as-upper-word', 'default.default',
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

  defineRule(
      'number-baseline', 'default.default',
      '[t] "Baseline"; [n] text()',
      'self::number', 'not(contains(@grammar, "ignoreFont"))',
      'preceding-sibling::identifier',
      'preceding-sibling::*[1][@role="latinletter" or @role="greekletter" or' +
      ' @role="otherletter"]',
      'parent::*/parent::infixop[@role="implicit"]');
  defineSpecialisedRule(
      'number-baseline', 'default.default', 'nemeth.brief',
      '[t] "Base"; [n] text()');
  defineSpecialisedRule(
      'number-baseline', 'nemeth.brief', 'nemeth.sbrief');


  defineRule(
      'number-baseline-font', 'default.default',
      '[t] "Baseline"; [t] @font; [n] . (grammar:ignoreFont=@font)',
      'self::number', '@font', 'not(contains(@grammar, "ignoreFont"))',
      '@font!="normal"', 'preceding-sibling::identifier',
      'preceding-sibling::*[@role="latinletter" or @role="greekletter" or' +
      ' @role="otherletter"]',
      'parent::*/parent::infixop[@role="implicit"]');
  defineSpecialisedRule(
      'number-baseline-font', 'default.default', 'nemeth.brief',
      '[t] "Base"; [n] text()');
  defineSpecialisedRule(
      'number-baseline-font', 'nemeth.brief', 'nemeth.sbrief');

  // identifier
  defineRule(
      'identifier', 'default.default', '[m] CQFspaceoutIdentifier',
      'self::identifier', 'string-length(text())>1', '@role!="unit"',
      '@role!="protected"',
      'not(@font) or @font="normal" or contains(@grammar, "ignoreFont")');

  defineRule(
      'identifier', 'default.default', '[n] text()',
      'self::identifier', '@role="protected"');

  // minus sign
  // defineRule(
  //     'negative', 'default.default',
  //     '[t] "negative"; [n] children/*[1]',
  //     'self::prefixop', '@role="negative"', 'children/identifier');
  // defineRuleAlias(
  //     'negative',
  //     'self::prefixop', '@role="negative"', 'children/number');
  // defineRuleAlias(
  //     'negative',
  //     'self::prefixop', '@role="negative"',
  //     'children/fraction[@role="vulgar"]');

  // defineRule(
  //     'negative', 'default.default',
  //     '[t] "minus"; [n] children/*[1]',
  //     'self::prefixop', '@role="negative"');

  // Operator rules
  defineRule(
      'prefix', 'default.default',
      '[n] text(); [n] children/*[1]',
      'self::prefixop');
  defineRule(
      'postfix', 'default.default',
      '[n] children/*[1]; [n] text()',
      'self::postfixop');

  defineRule(
      'binary-operation', 'default.default',
      '[m] children/* (sepFunc:CTXFcontentIterator);', 'self::infixop');

  // Implicit times is currently ignored!
  defineRule(
      'implicit', 'default.default',
      '[m] children/*', 'self::infixop', '@role="implicit"');
  defineRuleAlias(
      'implicit', 'self::infixop', '@role="leftsuper" or' +
      ' @role="leftsub" or @role="rightsuper" or @role="rightsub"');

  // defineRule('subtraction', 'default.default',
  //            '[m] children/* (separator:"minus");', 'self::infixop',
  //            '@role="subtraction"');

  // Function rules
  defineRule(
      'function-unknown', 'default.default',
      '[n] children/*[1]; [n] children/*[2]',
      'self::appl');

  defineRule(
      'function-prefix', 'default.default',
      '[n] children/*[1]; [n] children/*[2]',
      'self::appl', 'children/*[1][@role="prefix function"]');


  // Fences rules
  defineRule(
      'fences-open-close', 'default.default',
      '[n] content/*[1]; [n] children/*[1]; [n] content/*[2]',
      'self::fenced', '@role="leftright"');

  // defineRule(
  //     'fences-neutral', 'default.default',
  //     '[t] "StartAbsoluteValue"; [n] children/*[1]; [t] "EndAbsoluteValue"',
  //     'self::fenced', '@role="neutral"',
  //     'content/*[1][text()]="|" or content/*[1][text()]="❘" or' +
  //     ' content/*[1][text()]="｜"');
  // defineSpecialisedRule(
  //     'fences-neutral', 'default.default', 'nemeth.sbrief',
  //     '[t] "AbsoluteValue"; [n] children/*[1]; [t] "EndAbsoluteValue"');
  defineRule(
      'fences-neutral', 'default.default',
      '[n] content/*[1]; [n] children/*[1]; [n] content/*[2]',
      'self::fenced', '@role="neutral"');


  // TODO (sorge) Maybe check for punctuated element and singleton?
  defineRule(
      'fences-set', 'default.default',
      '[t] "StartSet"; [n] children/*[1]; [t] "EndSet"',
      'self::fenced', '@role="set empty" or @role="set extended"' +
      ' or @role="set singleton" or @role="set collection"',
      // 'self::fenced', '@role="leftright"', 'content/*[1][text()]="{"',
      // 'content/*[2][text()]="}"', 'count(children/*)=1',
      'not(name(../..)="appl")');
  defineSpecialisedRule(
      'fences-set', 'default.default', 'nemeth.sbrief',
      '[t] "Set"; [n] children/*[1]; [t] "EndSet"');


  // Text rules
  defineRule(
      'text', 'default.default', '[n] text()', 'self::text');

  // Special symbols
  defineRule(
      'factorial', 'default.default', '[t] "⠯"', 'self::punctuation',
      'text()="!"', 'name(preceding-sibling::*[1])!="text"');
  // defineRule(
  //     'minus', 'default.default', '[t] "minus"',
  //     'self::operator', 'text()="\u002D"');

  defineRule(
      'single-prime', 'default.default', '[t] "prime"',
      'self::punctuated', '@role="prime"', 'count(children/*)=1');
  defineRule(
      'double-prime', 'default.default', '[t] "double-prime"',
      'self::punctuated', '@role="prime"', 'count(children/*)=2');
  defineRule(
      'triple-prime', 'default.default', '[t] "triple-prime"',
      'self::punctuated', '@role="prime"', 'count(children/*)=3');
  defineRule(
      'quadruple-prime', 'default.default', '[t] "quadruple-prime"',
      'self::punctuated', '@role="prime"', 'count(children/*)=4');
  defineRule(
      'counted-prime', 'default.default',
      '[t] count(children/*); [t] "prime"',
      'self::punctuated', '@role="prime"');

  // Fraction rules

  defineRule(
      'fraction', 'default.default',
      '[t] CSFopenFracVerbose; [n] children/*[1];' +
          ' [t] CSFoverFracVerbose; [n] children/*[2]; [t] CSFcloseFracVerbose',
      'self::fraction');

  defineRule(
      'fraction', 'nemeth.brief',
      '[t] CSFopenFracBrief; [n] children/*[1];' +
          ' [t] CSFoverFracVerbose; [n] children/*[2]; [t] CSFcloseFracBrief',
      'self::fraction');

  defineRule(
      'fraction', 'nemeth.sbrief',
      '[t] CSFopenFracSbrief; [n] children/*[1];' +
          ' [t] CSFoverFracSbrief; [n] children/*[2]; [t] CSFcloseFracSbrief',
      'self::fraction');

  defineRule(
      'vulgar-fraction', 'default.default',
      '[t] CSFvulgarFraction',
      'self::fraction', '@role="vulgar"', 'CQFvulgarFractionSmall');
  defineSpecialisedRule(
      'vulgar-fraction', 'default.default', 'nemeth.brief');
  defineSpecialisedRule(
      'vulgar-fraction', 'default.default', 'nemeth.sbrief');

  defineRule(
      'continued-fraction-outer', 'default.default',
      '[t] "ContinuedFraction"; [n] children/*[1];' +
      '[t] "Over"; [n] children/*[2]',
      'self::fraction', 'not(ancestor::fraction)',
      'children/*[2]/descendant-or-self::*[@role="ellipsis" and ' +
      'not(following-sibling::*)]');
  defineSpecialisedRule(
      'continued-fraction-outer', 'default.default', 'nemeth.brief',
      '[t] "ContinuedFrac"; [n] children/*[1];' +
      '[t] "Over"; [n] children/*[2]');
  defineSpecialisedRule(
      'continued-fraction-outer', 'nemeth.brief', 'nemeth.sbrief');

  defineRule(
      'continued-fraction-inner', 'default.default',
      '[t] "StartFraction"; [n] children/*[1];' +
      '[t] "Over"; [n] children/*[2]',
      'self::fraction', 'ancestor::fraction',
      'children/*[2]/descendant-or-self::*[@role="ellipsis" and ' +
      'not(following-sibling::*)]');
  defineSpecialisedRule(
      'continued-fraction-inner', 'default.default', 'nemeth.brief',
      '[t] "StartFrac"; [n] children/*[1];' +
      '[t] "Over"; [n] children/*[2]');
  defineSpecialisedRule(
      'continued-fraction-inner', 'nemeth.brief', 'nemeth.sbrief',
      '[t] "Frac"; [n] children/*[1];' +
      '[t] "Over"; [n] children/*[2]');

  // Radical rules

  defineRule(
      'sqrt', 'default.default',
      '[t] CSFopenRadicalVerbose; [n] children/*[1];' +
          ' [t] CSFcloseRadicalVerbose',
      'self::sqrt');

  defineRule(
      'sqrt', 'nemeth.brief',
      '[t] CSFopenRadicalBrief; [n] children/*[1];' +
          ' [t] CSFcloseRadicalBrief',
      'self::sqrt');

  defineRule(
      'sqrt', 'nemeth.sbrief',
      '[t] CSFopenRadicalSbrief; [n] children/*[1];' +
          ' [t] CSFcloseRadicalBrief',
      'self::sqrt');

  defineRule(
      'root', 'default.default',
      '[t] CSFindexRadicalVerbose; [n] children/*[1];' +
          '[t] CSFopenRadicalVerbose; [n] children/*[2];' +
          ' [t] CSFcloseRadicalVerbose',
      'self::root');

  defineRule(
      'root', 'nemeth.brief',
      '[t] CSFindexRadicalBrief; [n] children/*[1];' +
          '[t] CSFopenRadicalBrief; [n] children/*[2];' +
          ' [t] CSFcloseRadicalBrief',
      'self::root');

  defineRule(
      'root', 'nemeth.sbrief',
      '[t] CSFindexRadicalSbrief; [n] children/*[1];' +
          '[t] CSFopenRadicalSbrief; [n] children/*[2];' +
          ' [t] CSFcloseRadicalBrief',
      'self::root');

  // Limits
  defineRule(
      'limboth', 'default.default',
      '[t] "⠐"; [n] children/*[1]; [t] CSFunderscript; [n] children/*[2];' +
      '[t] CSFoverscript; [n] children/*[3]',
      'self::limboth', 'name(../..)="underscore" or name(../..)="overscore"',
      'following-sibling::*[@role!="underaccent" and @role!="overaccent"]');
  defineRule(
      'limlower', 'default.default',
      '[t] "⠐"; [n] children/*[1]; [t] CSFunderscript; [n] children/*[2];',
      'self::limlower', 'name(../..)="underscore" or name(../..)="overscore"',
      'following-sibling::*[@role!="underaccent" and @role!="overaccent"]');
  defineRule(
      'limupper', 'default.default',
      '[t] "⠐"; [n] children/*[1]; [t] CSFoverscript; [n] children/*[2];',
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
      'limboth-end', 'default.default',
      '[t] "⠐"; [n] children/*[1]; [t] CSFunderscript; [n] children/*[2];' +
      '[t] CSFoverscript; [n] children/*[3]; [t] "⠻"',
      'self::limboth');
  defineRule(
      'limlower-end', 'default.default',
      '[t] "⠐"; [n] children/*[1]; [t] CSFunderscript; [n] children/*[2];' +
      ' [t] "⠻"',
      'self::limlower');
  defineRule(
      'limupper-end', 'default.default',
      '[t] "⠐"; [n] children/*[1]; [t] CSFoverscript; [n] children/*[2];' +
      ' [t] "⠻"',
      'self::limupper');
  defineRuleAlias(
      'limlower-end', 'self::underscore', '@role="limit function"');
  defineRuleAlias(
      'limlower-end', 'self::underscore');
  defineRuleAlias(
      'limupper-end', 'self::overscore');

  // Integral rules
  defineRule(
      'integral', 'default.default',
      '[n] children/*[1]; [n] children/*[2]; [n] children/*[3];',
      'self::integral');
  defineRule(
      'integral', 'default.default',
      '[n] children/*[1]; [t] "Subscript"; [n] children/*[2];' +
      '[t] "Superscript"; [n] children/*[3]; [t] "Baseline";',
      'self::limboth', '@role="integral"');
  defineSpecialisedRule(
      'integral', 'default.default', 'nemeth.brief',
      '[n] children/*[1]; [t] "Sub"; [n] children/*[2];' +
      '[t] "Sup"; [n] children/*[3]; [t] "Base";');
  defineSpecialisedRule(
      'integral', 'nemeth.brief', 'nemeth.sbrief');

  defineRule(
      'bigop', 'default.default',
      '[n] children/*[1]; [n] children/*[2];',
      'self::bigop');



  // Relations
  defineRule(
      'relseq', 'default.default',
      '[m] children/* (sepFunc:CTXFcontentIterator)',
      'self::relseq');

  defineRule(
      'equality', 'default.default',
      '[n] children/*[1]; [n] content/*[1]; [n] children/*[2]',
      'self::relseq', '@role="equality"', 'count(./children/*)=2');

  defineRule(
      'multi-equality', 'default.default',
      '[m] children/* (sepFunc:CTXFcontentIterator)',
      'self::relseq', '@role="equality"', 'count(./children/*)>2');

  defineRule(
      'multrel', 'default.default',
      '[m] children/* (sepFunc:CTXFcontentIterator)',
      'self::multirel');

  // Subscripts
  defineRule(
      'subscript', 'default.default',
      '[n] children/*[1]; [t] CSFsubscriptVerbose; [n] children/*[2]',
      'self::subscript');
  defineRule(
      'subscript', 'nemeth.brief',
      '[n] children/*[1]; [t] CSFsubscriptBrief; [n] children/*[2]',
      'self::subscript');
  defineSpecialisedRule(
      'subscript', 'nemeth.brief', 'nemeth.sbrief');

  defineRule(
      'subscript-simple', 'default.default',
      '[n] children/*[1]; [n] children/*[2]',
      'self::subscript',
      'name(./children/*[1])="identifier"',
      // Second child is a number but not mixed or other.
      'name(./children/*[2])="number"',
      './children/*[2][@role!="mixed"]',
      './children/*[2][@role!="othernumber"]');
  defineSpecialisedRule(
      'subscript-simple', 'default.default', 'nemeth.brief');
  defineSpecialisedRule(
      'subscript-simple', 'default.default', 'nemeth.sbrief');

  defineRule(
      'subscript-baseline', 'default.default',
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
      'subscript-baseline', 'default.default', 'nemeth.brief',
      '[n] children/*[1]; [t] CSFsubscriptBrief; [n] children/*[2];' +
      ' [t] CSFbaselineBrief');
  defineSpecialisedRule(
      'subscript-baseline', 'nemeth.brief', 'nemeth.sbrief');
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
      'subscript-empty-sup', 'default.default',
      '[n] children/*[1]; [n] children/*[2]',
      'self::subscript',
      'name(children/*[2])="infixop"',
      'name(children/*[2][@role="implicit"]/children/*[1])="superscript"',
      'name(children/*[2]/children/*[1]/children/*[1])="empty"');
  defineSpecialisedRule(
      'subscript-empty-sup', 'default.default', 'nemeth.brief');
  defineSpecialisedRule(
      'subscript-empty-sup', 'nemeth.brief', 'nemeth.sbrief');
  defineRuleAlias(
      'subscript-empty-sup', 'self::subscript',
      'name(children/*[2])="superscript"',
      'name(children/*[2]/children/*[1])="empty"');


  // Superscripts
  defineRule(
      'superscript', 'default.default',
      '[n] children/*[1]; [t] CSFsuperscriptVerbose; [n] children/*[2]',
      'self::superscript');
  defineSpecialisedRule(
      'superscript', 'default.default', 'nemeth.brief',
      '[n] children/*[1]; [t] CSFsuperscriptBrief; [n] children/*[2]');
  defineSpecialisedRule(
      'superscript', 'nemeth.brief', 'nemeth.sbrief');


  defineRule(
      'superscript-baseline', 'default.default',
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
      'superscript-baseline', 'default.default', 'nemeth.brief',
      '[n] children/*[1]; [t] CSFsuperscriptBrief; [n] children/*[2];' +
      '[t] CSFbaselineBrief');
  defineSpecialisedRule(
      'superscript-baseline', 'nemeth.brief', 'nemeth.sbrief');
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
      'superscript-empty-sub', 'default.default',
      '[n] children/*[1]; [n] children/*[2]',
      'self::superscript',
      'name(children/*[2])="infixop"',
      'name(children/*[2][@role="implicit"]/children/*[1])="subscript"',
      'name(children/*[2]/children/*[1]/children/*[1])="empty"');
  defineSpecialisedRule(
      'superscript-empty-sub', 'default.default', 'nemeth.brief');
  defineSpecialisedRule(
      'superscript-empty-sub', 'nemeth.brief', 'nemeth.sbrief');
  defineRuleAlias(
      'superscript-empty-sub', 'self::superscript',
      'name(children/*[2])="subscript"',
      'name(children/*[2]/children/*[1])="empty"');

  // Square
  // defineRule(
  //     'square', 'default.default',
  //     '[n] children/*[1]; [t] "squared"',
  //     'self::superscript', 'children/*[2]',
  //     'children/*[2][text()=2]',
  //     'name(children/*[1])!="text" or ' +
  //     // Special exception dealing with footnotes.
  //     'not(name(children/*[1])="text" and ' +
  //     '(name(../../../punctuated[@role="text"]/..)="stree" ' +
  //     'or name(..)="stree"))',
  //     'name(children/*[1])!="subscript" or (' +
  //     // Keep squared if we have a simple subscript.
  //     'name(children/*[1])="subscript" and ' +
  //     'name(children/*[1]/children/*[1])="identifier" and ' +
  //     'name(children/*[1]/children/*[2])="number" and ' +
  //     'children/*[1]/children/*[2][@role!="mixed"] and ' +
  //     'children/*[1]/children/*[2][@role!="othernumber"])',
  //     'not(@embellished)');
  // defineSpecialisedRule(
  //     'square', 'default.default', 'nemeth.brief');
  // defineSpecialisedRule(
  //     'square', 'default.default', 'nemeth.sbrief');

  // Cube
  // defineRule(
  //     'cube', 'default.default',
  //     '[n] children/*[1]; [t] "cubed"',
  //     'self::superscript', 'children/*[2]',
  //     'children/*[2][text()=3]',
  //     'name(children/*[1])!="text" or ' +
  //     // Special exception dealing with footnotes.
  //     'not(name(children/*[1])="text" and ' +
  //     '(name(../../../punctuated[@role="text"]/..)="stree" ' +
  //     'or name(..)="stree"))',
  //     'name(children/*[1])!="subscript" or (' +
  //     // Keep cubed if we have a simple subscript.
  //     'name(children/*[1])="subscript" and ' +
  //     'name(children/*[1]/children/*[1])="identifier" and ' +
  //     'name(children/*[1]/children/*[2])="number" and ' +
  //     'children/*[1]/children/*[2][@role!="mixed"] and ' +
  //     'children/*[1]/children/*[2][@role!="othernumber"])',
  //     'not(@embellished)');
  // defineSpecialisedRule(
  //     'cube', 'default.default', 'nemeth.brief');
  // defineSpecialisedRule(
  //     'cube', 'default.default', 'nemeth.sbrief');

  // Primes
  // This rule uses some redundancy for ordering!
  defineRule(
      'prime', 'default.default',
      '[n] children/*[1]; [n] children/*[2]',
      'self::superscript', 'children/*[2]', 'children/*[2][@role="prime"]');
  defineSpecialisedRule(
      'prime', 'default.default', 'nemeth.brief');
  defineSpecialisedRule(
      'prime', 'default.default', 'nemeth.sbrief');

  defineRule(
      'prime-subscript', 'default.default',
      '[n] children/*[1]/children/*[1]; [n] children/*[2];' +
      ' [t] CSFsubscriptVerbose; [n] children/*[1]/children/*[2]',
      'self::superscript', 'children/*[2][@role="prime"]',
      'name(children/*[1])="subscript"', 'not(following-sibling::*)');
  defineSpecialisedRule(
      'prime-subscript', 'default.default', 'nemeth.brief',
      '[n] children/*[1]/children/*[1]; [n] children/*[2];' +
      ' [t] CSFsubscriptBrief; [n] children/*[1]/children/*[2]');
  defineSpecialisedRule(
      'prime-subscript', 'nemeth.brief', 'nemeth.sbrief');

  defineRule(
      'prime-subscript-baseline', 'default.default',
      '[n] children/*[1]/children/*[1]; [n] children/*[2];' +
      ' [t] CSFsubscriptVerbose; [n] children/*[1]/children/*[2];' +
      ' [t] CSFbaselineVerbose',
      'self::superscript', 'children/*[2][@role="prime"]',
      'name(children/*[1])="subscript"', 'following-sibling::*');
  defineSpecialisedRule(
      'prime-subscript-baseline', 'default.default', 'nemeth.brief',
      '[n] children/*[1]/children/*[1]; [n] children/*[2];' +
      ' [t] CSFsubscriptBrief; [n] children/*[1]/children/*[2];' +
      ' [t] CSFbaselineBrief');
  defineSpecialisedRule(
      'prime-subscript-baseline', 'nemeth.brief', 'nemeth.sbrief');
  defineRuleAlias(
      'prime-subscript-baseline',
      'self::superscript', 'children/*[2][@role="prime"]',
      'name(children/*[1])="subscript"', 'not(following-sibling::*)',
      '@embellished');

  defineRule(
      'prime-subscript-simple', 'default.default',
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
      'prime-subscript-simple', 'default.default', 'nemeth.brief');
  defineSpecialisedRule(
      'prime-subscript-simple', 'default.default', 'nemeth.sbrief');

  // Modifiers
  defineRule(
      'overscore', 'default.default',
      '[t] "ModifyingAbove"; [n] children/*[1]; [t] "With"; [n] children/*[2]',
      'self::overscore', 'children/*[2][@role="overaccent"]'
  );
  defineSpecialisedRule(
      'overscore', 'default.default', 'nemeth.brief',
      '[t] "ModAbove"; [n] children/*[1]; [t] "With"; [n] children/*[2]'
  );
  defineSpecialisedRule(
      'overscore', 'nemeth.brief', 'nemeth.sbrief');

  defineRule(
      'double-overscore', 'default.default',
      '[t] "ModifyingAbove Above"; [n] children/*[1]; [t] "With";' +
      ' [n] children/*[2]',
      'self::overscore', 'children/*[2][@role="overaccent"]',
      'name(children/*[1])="overscore"',
      'children/*[1]/children/*[2][@role="overaccent"]'
  );
  defineSpecialisedRule(
      'double-overscore', 'default.default', 'nemeth.brief',
      '[t] "ModAbove Above"; [n] children/*[1]; [t] "With"; [n] children/*[2]'
  );
  defineSpecialisedRule(
      'double-overscore', 'nemeth.brief', 'nemeth.sbrief');

  defineRule(
      'underscore', 'default.default',
      '[t] "ModifyingBelow"; [n] children/*[1]; [t] "With"; [n] children/*[2]',
      'self::underscore', 'children/*[2][@role="underaccent"]'
  );
  defineSpecialisedRule(
      'underscore', 'default.default', 'nemeth.brief',
      '[t] "ModBelow"; [n] children/*[1]; [t] "With"; [n] children/*[2]'
  );
  defineSpecialisedRule(
      'underscore', 'nemeth.brief', 'nemeth.sbrief');

  defineRule(
      'double-underscore', 'default.default',
      '[t] "ModifyingBelow Below"; [n] children/*[1]; [t] "With";' +
      ' [n] children/*[2]',
      'self::underscore', 'children/*[2][@role="underaccent"]',
      'name(children/*[1])="underscore"',
      'children/*[1]/children/*[2][@role="underaccent"]');
  defineSpecialisedRule(
      'double-underscore', 'default.default', 'nemeth.brief',
      '[t] "ModBelow Below"; [n] children/*[1]; [t] "With"; [n] children/*[2]'
  );
  defineSpecialisedRule(
      'double-underscore', 'nemeth.brief', 'nemeth.sbrief');

  defineRule(
      'overbar', 'default.default',
      '[n] children/*[1]; [t] "overbar"',
      'self::overscore',
      '@role="latinletter" or @role="greekletter" or @role="otherletter"',
      'children/*[2][@role="overaccent"]',   // redundancy
      'children/*[2][text()="\u00AF" or text()="\uFFE3" or text()="\uFF3F"' +
      ' or text()="\u005F" or text()="\u203E"]'
  );
  defineSpecialisedRule(
      'overbar', 'default.default', 'nemeth.brief',
      '[n] children/*[1]; [t] "overBar"'
  );
  defineSpecialisedRule(
      'overbar', 'nemeth.brief', 'nemeth.sbrief');

  defineRule(
      'underbar', 'default.default',
      '[n] children/*[1]; [t] "underbar"',
      'self::underscore',
      '@role="latinletter" or @role="greekletter" or @role="otherletter"',
      'children/*[2][@role="underaccent"]',   // redundancy
      'children/*[2][text()="\u00AF" or text()="\uFFE3" or text()="\uFF3F"' +
      ' or text()="\u005F" or text()="\u203E"]'
  );
  defineSpecialisedRule(
      'underbar', 'default.default', 'nemeth.brief',
      '[n] children/*[1]; [t] "underBar"'
  );
  defineSpecialisedRule(
      'underbar', 'nemeth.brief', 'nemeth.sbrief');

  defineRule(
      'overtilde', 'default.default',
      '[n] children/*[1]; [t] "overTilde"',
      'self::overscore',
      'children/*[2][@role="overaccent"]',   // redundancy
      '@role="latinletter" or @role="greekletter" or @role="otherletter"',
      'children/*[2][text()="\u007E" or text()="\u02DC" or text()="\u223C"' +
      ' or text()="\uFF5E"]'
  );
  defineSpecialisedRule(
      'overtilde', 'default.default', 'nemeth.brief',
      '[n] children/*[1]; [t] "overtilde"'
  );
  defineSpecialisedRule(
      'overtilde', 'nemeth.brief', 'nemeth.sbrief');

  defineRule(
      'undertilde', 'default.default',
      '[n] children/*[1]; [t] "underTilde"',
      'self::underscore',
      '@role="latinletter" or @role="greekletter" or @role="otherletter"',
      'children/*[2][@role="underaccent"]',   // redundancy
      'children/*[2][text()="\u007E" or text()="\u02DC" or text()="\u223C"' +
      ' or text()="\uFF5E"]'
  );
  defineSpecialisedRule(
      'undertilde', 'default.default', 'nemeth.brief',
      '[n] children/*[1]; [t] "undertilde"'
  );
  defineSpecialisedRule(
      'undertilde', 'nemeth.brief', 'nemeth.sbrief');

  // Layout Elements
  defineRule(
      'matrix-fence', 'default.default',
      '[n] children/*[1];',
      'self::fenced', 'count(children/*)=1', 'name(children/*[1])="matrix"');

  defineRule(
      'matrix', 'default.default',
      '[t] "Start"; [t] count(children/*);  [t] "By";' +
      '[t] count(children/*[1]/children/*); [t] "Matrix"; ' +
      '[m] children/* (ctxtFunc:CTXFordinalCounter,context:"Row ");' +
      ' [t] "EndMatrix"',
      'self::matrix');
  defineRule(
      'matrix', 'nemeth.sbrief',
      '[t] count(children/*);  [t] "By";' +
      '[t] count(children/*[1]/children/*); [t] "Matrix"; ' +
      '[m] children/* (ctxtFunc:CTXFordinalCounter,context:"Row ");' +
      ' [t] "EndMatrix"', 'self::matrix');
  defineRuleAlias(
      'matrix', 'self::vector');

  defineRule(
      'matrix-row', 'default.default',
      '[m] children/* (ctxtFunc:CTXFordinalCounter,context:"Column");' +
      '[p] (pause: 200)',
      'self::row');
  defineRule(
      'row-with-label', 'default.default',
      '[t] "with Label"; [n] content/*[1]; [t] "EndLabel"(pause: 200); ' +
      '[m] children/* (ctxtFunc:CTXFordinalCounter,context:"Column")',
      'self::row', 'content');
  defineRule(
      'row-with-label', 'nemeth.brief',
      '[t] "Label"; [n] content/*[1]; ' +
      '[m] children/* (ctxtFunc:CTXFordinalCounter,context:"Column")',
      'self::row', 'content');
  defineSpecialisedRule(
      'row-with-label', 'nemeth.brief', 'nemeth.sbrief');
  defineRule(
      'row-with-text-label', 'nemeth.sbrief',
      '[t] "Label"; [t] CSFRemoveParens;' +
      '[m] children/* (ctxtFunc:CTXFordinalCounter,context:"Column")',
      'self::row', 'content', 'name(content/cell/children/*[1])="text"');
  defineRule(
      'empty-row', 'default.default',
      '[t] "Blank"', 'self::row', 'count(children/*)=0');

  defineRule(
      'matrix-cell', 'default.default',
      '[n] children/*[1]; [p] (pause: 300)', 'self::cell');

  // defineRule(
  //     'empty-cell', 'default.default',
  //     '[t] "Blank"', 'self::cell', 'count(children/*)=1', 'children/empty');
  defineRule(
      'empty-cell', 'default.default',
      '[t] "Blank"; [p] (pause: 300)', 'self::cell', 'count(children/*)=0');


  defineRule(
      'determinant', 'default.default',
      '[t] "Start"; [t] count(children/*);  [t] "By";' +
      '[t] count(children/*[1]/children/*); [t] "Determinant";' +
      ' [m] children/* (ctxtFunc:CTXFordinalCounter,context:"Row ");' +
      ' [t] "EndDeterminant"',
      'self::matrix', '@role="determinant"');
  defineSpecialisedRule(
      'determinant', 'default.default', 'nemeth.sbrief',
      '[t] count(children/*);  [t] "By";' +
      '[t] count(children/*[1]/children/*); [t] "Determinant";' +
      ' [m] children/* (ctxtFunc:CTXFordinalCounter,context:"Row ");' +
      ' [t] "EndDeterminant"');

  defineRule(
      'determinant-simple', 'default.default',
      '[t] "Start"; [t] count(children/*);  [t] "By";' +
      '[t] count(children/*[1]/children/*); [t] "Determinant";' +
      ' [m] children/* (ctxtFunc:CTXFordinalCounter,context:"Row",' +
      'grammar:simpleDet); [t] "EndDeterminant"',
      'self::matrix', '@role="determinant"', 'CQFdetIsSimple');
  defineSpecialisedRule(
      'determinant-simple', 'default.default', 'nemeth.sbrief',
      '[t] count(children/*);  [t] "By";' +
      '[t] count(children/*[1]/children/*); [t] "Determinant";' +
      ' [m] children/* (ctxtFunc:CTXFordinalCounter,context:"Row",' +
      'grammar:simpleDet); [t] "EndDeterminant"');
  defineRule(
      'row-simple', 'default.default',
      '[m] children/*;',
      'self::row', '@role="determinant"', 'contains(@grammar, "simpleDet")');

  defineRule(
      'layout', 'default.default', '[t] "StartLayout"; ' +
      '[m] children/* (ctxtFunc:CTXFordinalCounter,context:"Row ");' +
      ' [t] "EndLayout"', 'self::table');
  defineRule(
      'layout', 'nemeth.sbrief', '[t] "Layout"; ' +
      '[m] children/* (ctxtFunc:CTXFordinalCounter,context:"Row ");' +
      ' [t] "EndLayout"', 'self::table');

  defineRule(
      'binomial', 'default.default',
      '[t] "StartBinomialOrMatrix"; [n] children/*[1]/children/*[1]; ' +
      '[t] "Choose"; [n] children/*[2]/children/*[1]; ' +
      ' [t] "EndBinomialOrMatrix"',
      'self::vector', '@role="binomial"');
  defineRule(
      'binomial', 'nemeth.sbrief',
      '[t] "BinomialOrMatrix"; [n] children/*[1]/children/*[1]; ' +
      '[t] "Choose"; [n] children/*[2]/children/*[1]; ' +
      ' [t] "EndBinomialOrMatrix"',
      'self::vector', '@role="binomial"');

  defineRule(
      'cases', 'default.default', '[t] "StartLayout"; ' +
      '[t] "Enlarged"; [n] content/*[1];' +
      '[m] children/* (ctxtFunc:CTXFordinalCounter,context:"Row ");' +
      ' [t] "EndLayout"', 'self::cases');
  defineRule(
      'cases', 'nemeth.sbrief', '[t] "Layout"; ' +
      '[t] "Enlarged"; [n] content/*[1];' +
      '[m] children/* (ctxtFunc:CTXFordinalCounter,context:"Row ");' +
      ' [t] "EndLayout"', 'self::cases');

  // Multiline rules.
  defineRuleAlias(
      'layout', 'self::multiline');

  defineRule(
      'line', 'default.default',
      '[m] children/*', 'self::line');
  defineRule(
      'line-with-label', 'default.default',
      '[t] "with Label"; [n] content/*[1]; [t] "EndLabel" (pause: 200); ' +
      '[m] children/*',
      'self::line', 'content');
  defineSpecialisedRule(
      'line-with-label', 'default.default', 'nemeth.brief',
      '[t] "Label"; [n] content/*[1] (pause: 200); [m] children/*');
  defineSpecialisedRule(
      'line-with-label', 'nemeth.brief', 'nemeth.sbrief');
  defineRule(
      'line-with-text-label', 'nemeth.sbrief',
      '[t] "Label"; [t] CSFRemoveParens; [m] children/*',
      'self::line', 'content', 'name(content/cell/children/*[1])="text"');
  defineRule(
      'empty-line', 'default.default',
      '[t] "Blank"', 'self::line', 'count(children/*)=0', 'not(content)');
  defineSpecialisedRule('empty-line', 'default.default', 'nemeth.brief');
  defineSpecialisedRule('empty-line', 'nemeth.brief', 'nemeth.sbrief');
  defineRule(
      'empty-line-with-label', 'default.default',
      '[t] "with Label"; [n] content/*[1]; [t] "EndLabel"(pause: 200); ' +
      '[t] "Blank"', 'self::line', 'count(children/*)=0', 'content');
  defineSpecialisedRule(
      'empty-line-with-label', 'default.default', 'nemeth.brief',
      '[t] "Label"; [n] content/*[1] (pause: 200); [t] "Blank"');
  defineSpecialisedRule(
      'empty-line-with-label', 'nemeth.brief', 'nemeth.sbrief');

  // Enclose
  defineRule(
      'enclose', 'default.default',
      '[t] "StartEnclose"; [t] @role (grammar:localEnclose);' +
      ' [n] children/*[1]; [t] "EndEnclose"',
      'self::enclose');
  defineRuleAlias(
      'overbar', 'self::enclose', '@role="top"');
  defineRuleAlias(
      'underbar', 'self::enclose', '@role="bottom"');
  defineRule(
      'leftbar', 'default.default',
      '[t] "vertical-bar"; [n] children/*[1]',
      'self::enclose', '@role="left"');
  defineRule(
      'rightbar', 'default.default',
      '[n] children/*[1]; [t] "vertical-bar"',
      'self::enclose', '@role="right"');

  // Crossout
  defineRule(
      'crossout', 'default.default',
      '[t] "CrossOut"; [n] children/*[1]; [t] "EndCrossOut"',
      'self::enclose', '@role="updiagonalstrike" or' +
      ' @role="downdiagonalstrike" or @role="horizontalstrike"');
  defineRule(
      'cancel', 'default.default',
      '[t] "CrossOut"; [n] children/*[1]/children/*[1]; [t] "With";' +
      ' [n] children/*[2]; [t] "EndCrossOut"',
      'self::overscore', '@role="updiagonalstrike" or' +
      ' @role="downdiagonalstrike" or @role="horizontalstrike"');
  defineSpecialisedRule(
      'cancel', 'default.default', 'nemeth.brief');
  defineSpecialisedRule(
      'cancel', 'default.default', 'nemeth.sbrief');
  defineRuleAlias('cancel',
      'self::underscore', '@role="updiagonalstrike" or' +
      ' @role="downdiagonalstrike" or @role="horizontalstrike"');
  defineRule(
      'cancel-reverse', 'default.default',
      '[t] "CrossOut"; [n] children/*[2]/children/*[1]; [t] "With";' +
      ' [n] children/*[1]; [t] "EndCrossOut"',
      'self::overscore', 'name(children/*[2])="enclose"',
      'children/*[2][@role="updiagonalstrike" or' +
      ' @role="downdiagonalstrike" or @role="horizontalstrike"]');
  defineSpecialisedRule(
      'cancel-reverse', 'default.default', 'nemeth.brief');
  defineSpecialisedRule(
      'cancel-reverse', 'default.default', 'nemeth.sbrief');
  defineRuleAlias('cancel-reverse',
      'self::underscore', 'name(children/*[2])="enclose"',
      'children/*[2][@role="updiagonalstrike" or' +
      ' @role="downdiagonalstrike" or @role="horizontalstrike"]');

  // Rules for punctuated expressions.
  defineRule(
      'end-punct', 'default.default',
      '[m] children/*',
      'self::punctuated', '@role="endpunct"');

  defineRule(
      'start-punct', 'default.default',
      '[n] content/*[1]; [m] children/*[position()>1]',
      'self::punctuated', '@role="startpunct"');

  defineRule(
      'integral-punct', 'default.default',
      '[n] children/*[1]; [n] children/*[3]',
      'self::punctuated', '@role="integral"');

  defineRule(
      'punctuated', 'default.default',
      '[m] children/*',
      'self::punctuated');

  // Unit rules.
  defineRule(
      'unit', 'default.default',
      '[t] text() (grammar:annotation="unit":translate)',
      'self::identifier', '@role="unit"');
  defineRule(
      'unit-square', 'default.default',
      '[t] "square"; [n] children/*[1]',
      'self::superscript', '@role="unit"', 'children/*[2][text()=2]',
      'name(children/*[1])="identifier"');

  defineRule(
      'unit-cubic', 'default.default',
      '[t] "cubic"; [n] children/*[1]',
      'self::superscript', '@role="unit"', 'children/*[2][text()=3]',
      'name(children/*[1])="identifier"');
  defineRule(
      'reciprocal', 'default.default',
      '[t] "reciprocal"; [n] children/*[1]',
      'self::superscript', '@role="unit"', 'name(children/*[1])="identifier"',
      'name(children/*[2])="prefixop"', 'children/*[2][@role="negative"]',
      'children/*[2]/children/*[1][text()=1]',
      'count(preceding-sibling::*)=0 or preceding-sibling::*[@role!="unit"]');
  defineRule(
      'reciprocal', 'default.default',
      '[t] "per"; [n] children/*[1]',
      'self::superscript', '@role="unit"', 'name(children/*[1])="identifier"',
      'name(children/*[2])="prefixop"', 'children/*[2][@role="negative"]',
      'children/*[2]/children/*[1][text()=1]',
      'preceding-sibling::*[@role="unit"]');
  defineRule(
      'unit-combine', 'default.default',
      '[m] children/*', 'self::infixop', '@role="unit"');
  defineRule(
      'unit-divide', 'default.default',
      '[n] children/*[1]; [t] "per"; [n] children/*[2]',
      'self::fraction', '@role="unit"');

};


/**
 * Component strings for tensor speech rules.
 * @enum {string}
 * @private
 */
sre.NemethRules.componentString_ = {
  2 : 'CSFbaseline',
  1 : 'CSFsubscript',
  0 : 'CSFsuperscript'
};


/**
 * Child number translation for tensor speech rules.
 * @enum {number}
 * @private
 */
sre.NemethRules.childNumber_ = {
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
sre.NemethRules.generateTensorRuleStrings_ = function(constellation) {
  var constraints = [];
  var verbString = '';
  var briefString = '';
  var constel = parseInt(constellation, 2);

  for (var i = 0; i < 5; i++) {
    var childString = 'children/*[' + sre.NemethRules.childNumber_[i] + ']';
    if (constel & 1) {
      var compString = sre.NemethRules.componentString_[i % 3];
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
sre.NemethRules.generateNemethTensorRules_ = function() {
  // Constellations are built as bitvectors with the meaning:
  //
  //  lsub lsuper base rsub rsuper
  var constellations = ['11111', '11110', '11101', '11100',
                        '10111', '10110', '10101', '10100',
                        '01111', '01110', '01101', '01100'
  ];
  for (var i = 0, constel; constel = constellations[i]; i++) {
    var name = 'tensor' + constel;
    var components = sre.NemethRules.generateTensorRuleStrings_(constel);
    var briefStr = components.pop();
    var verbStr = components.pop();
    var verbList = [name, 'default.default', verbStr, 'self::tensor'].
        concat(components);
    var briefList = [name, 'nemeth.brief', briefStr, 'self::tensor'].
        concat(components);
    // Rules without neighbour.
    defineRule.apply(null, verbList);
    defineRule.apply(null, briefList);
    defineSpecialisedRule(name, 'nemeth.brief', 'nemeth.sbrief');
    // Rules with baseline.
    var baselineStr = sre.NemethRules.componentString_[2];
    verbStr += '; [t]' + baselineStr + 'Verbose';
    briefStr += '; [t]' + baselineStr + 'Brief';
    name = name + '-baseline';
    verbList = [name, 'default.default', verbStr, 'self::tensor',
                'following-sibling::*'].
        concat(components);
    briefList = [name, 'nemeth.brief', briefStr, 'self::tensor',
                 'following-sibling::*'].
        concat(components);
    defineRule.apply(null, verbList);
    defineRule.apply(null, briefList);
    defineSpecialisedRule(name, 'nemeth.brief', 'nemeth.sbrief');
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



sre.NemethRules.getInstance().initializer = [
  sre.NemethRules.initCustomFunctions_,
  sre.NemethRules.initNemethRules_,
  sre.NemethRules.generateNemethTensorRules_
];

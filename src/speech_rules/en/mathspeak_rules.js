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

goog.require('sre.MathspeakUtil');


/**
 * Mathspeak rules.
 */
sre.MathspeakRules = {
  functions: [
    ['CQF', 'CQFspaceoutNumber', sre.MathspeakUtil.spaceoutNumber],
    ['CQF', 'CQFspaceoutIdentifier', sre.MathspeakUtil.spaceoutIdentifier],

    ['CSF', 'CSFspaceoutText', sre.MathspeakUtil.spaceoutText],
    // Fraction function.
    ['CSF', 'CSFopenFracVerbose', sre.MathspeakUtil.openingFractionVerbose],
    ['CSF', 'CSFcloseFracVerbose', sre.MathspeakUtil.closingFractionVerbose],
    ['CSF', 'CSFoverFracVerbose', sre.MathspeakUtil.overFractionVerbose],
    ['CSF', 'CSFopenFracBrief', sre.MathspeakUtil.openingFractionBrief],
    ['CSF', 'CSFcloseFracBrief', sre.MathspeakUtil.closingFractionBrief],
    ['CSF', 'CSFopenFracSbrief', sre.MathspeakUtil.openingFractionSbrief],
    ['CSF', 'CSFcloseFracSbrief', sre.MathspeakUtil.closingFractionSbrief],
    ['CSF', 'CSFoverFracSbrief', sre.MathspeakUtil.overFractionSbrief],
    ['CSF', 'CSFvulgarFraction', sre.NumbersUtil.vulgarFraction],
    ['CQF', 'CQFvulgarFractionSmall', sre.MathspeakUtil.isSmallVulgarFraction],

    // Radical function.
    ['CSF', 'CSFopenRadicalVerbose', sre.MathspeakUtil.openingRadicalVerbose],
    ['CSF', 'CSFcloseRadicalVerbose', sre.MathspeakUtil.closingRadicalVerbose],
    ['CSF', 'CSFindexRadicalVerbose', sre.MathspeakUtil.indexRadicalVerbose],
    ['CSF', 'CSFopenRadicalBrief', sre.MathspeakUtil.openingRadicalBrief],
    ['CSF', 'CSFcloseRadicalBrief', sre.MathspeakUtil.closingRadicalBrief],
    ['CSF', 'CSFindexRadicalBrief', sre.MathspeakUtil.indexRadicalBrief],
    ['CSF', 'CSFopenRadicalSbrief', sre.MathspeakUtil.openingRadicalSbrief],
    ['CSF', 'CSFindexRadicalSbrief', sre.MathspeakUtil.indexRadicalSbrief],

    // Sub- Superscript.
    ['CSF', 'CSFsuperscriptVerbose', sre.MathspeakUtil.superscriptVerbose],
    ['CSF', 'CSFsuperscriptBrief', sre.MathspeakUtil.superscriptBrief],
    ['CSF', 'CSFsubscriptVerbose', sre.MathspeakUtil.subscriptVerbose],
    ['CSF', 'CSFsubscriptBrief', sre.MathspeakUtil.subscriptBrief],
    ['CSF', 'CSFbaselineVerbose', sre.MathspeakUtil.baselineVerbose],
    ['CSF', 'CSFbaselineBrief', sre.MathspeakUtil.baselineBrief],
    // Tensor specific.
    ['CSF', 'CSFleftsuperscriptVerbose', sre.MathspeakUtil.superscriptVerbose],
    ['CSF', 'CSFleftsubscriptVerbose', sre.MathspeakUtil.subscriptVerbose],
    ['CSF', 'CSFrightsuperscriptVerbose', sre.MathspeakUtil.superscriptVerbose],
    ['CSF', 'CSFrightsubscriptVerbose', sre.MathspeakUtil.subscriptVerbose],
    ['CSF', 'CSFleftsuperscriptBrief', sre.MathspeakUtil.superscriptBrief],
    ['CSF', 'CSFleftsubscriptBrief', sre.MathspeakUtil.subscriptBrief],
    ['CSF', 'CSFrightsuperscriptBrief', sre.MathspeakUtil.superscriptBrief],
    ['CSF', 'CSFrightsubscriptBrief', sre.MathspeakUtil.subscriptBrief],

    // Over- Underscore.
    ['CSF', 'CSFunderscript', sre.MathspeakUtil.nestedUnderscore],
    ['CSF', 'CSFoverscript', sre.MathspeakUtil.nestedOverscore],

    ['CTXF', 'CTXFordinalCounter', sre.NumbersUtil.ordinalCounter],
    ['CTXF', 'CTXFcontentIterator', sre.StoreUtil.contentIterator],

    // Layout related.
    ['CQF', 'CQFdetIsSimple', sre.MathspeakUtil.determinantIsSimple],
    ['CSF', 'CSFRemoveParens', sre.MathspeakUtil.removeParens],

    // Dummy.
    ['CQF', 'CQFresetNesting', sre.MathspeakUtil.resetNestingDepth]
  ],
  rules: [
    // TODO: This needs to be prioritized!
    ['Rule',
     'collapsed', 'mathspeak.default',
     '[t] "collapsed"; [n] . (engine:modality=summary,grammar:collapsed)',
     'self::*', '@alternative', 'not(contains(@grammar, "collapsed"))',
     'self::*', 'self::*', 'self::*', 'self::*', 'self::*'
    ],
    ['SpecializedRule',
     'collapsed', 'mathspeak.default', 'mathspeak.brief'],
    ['SpecializedRule',
     'collapsed', 'mathspeak.brief', 'mathspeak.sbrief'],

    // Initial rule
    ['Rule',
     'stree', 'mathspeak.default',
     '[n] ./*[1]', 'self::stree', 'CQFresetNesting'],

    // Dummy rules
    ['Rule',
     'unknown', 'mathspeak.default', '[n] text()',
     'self::unknown'],

    ['Rule',
     'protected', 'mathspeak.default', '[t] text()',
     'self::number', 'contains(@grammar, "protected")'],

    ['Rule',
     'omit-empty', 'mathspeak.default',
     '[p] (pause:100)', // Pause necessary to voice separators between empty.
     'self::empty'],
    ['Rule',
     'blank-empty', 'mathspeak.default',
     '[t] "Blank"', 'self::empty', 'count(../*)=1',
     'name(../..)="cell" or name(../..)="line"'],

    // Font rules
    ['Rule',
     'font', 'mathspeak.default',
     '[t] @font (grammar:localFont); [n] . (grammar:ignoreFont=@font)',
     'self::*', '@font', 'not(contains(@grammar, "ignoreFont"))',
     '@font!="normal"'],

    ['Rule',
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
     '@role!="unit"'],

    ['Rule',
     'font-identifier', 'mathspeak.default',
     '[t] @font (grammar:localFont); [n] . (grammar:ignoreFont=@font)',
     'self::identifier', 'string-length(text())=1',
     '@font', '@font="normal"', 'not(contains(@grammar, "ignoreFont"))',
     '@role!="unit"'],

    ['Rule',
     'omit-font', 'mathspeak.default',
     '[n] . (grammar:ignoreFont=@font)',
     'self::identifier', 'string-length(text())=1', '@font',
     'not(contains(@grammar, "ignoreFont"))', '@font="italic"'],

    ['Rule',
     'german-font', 'mathspeak.default',
     '[t] "German"; [n] . (grammar:ignoreFont=@font)',
     'self::*', '@font', 'not(contains(@grammar, "ignoreFont"))',
     '@font="fraktur"'],

    ['Rule',
     'german-font', 'mathspeak.default',
     '[t] "bold German"; [n] . (grammar:ignoreFont=@font)',
     'self::*', '@font', 'not(contains(@grammar, "ignoreFont"))',
     '@font="bold-fraktur"'],

    // Number rules
    ['Rule',
     'number', 'mathspeak.default', '[n] text()', 'self::number'],

    ['Rule',
     'mixed-number', 'mathspeak.default',
     '[n] children/*[1]; [t] "and"; [n] children/*[2]; ',
     'self::number', '@role="mixed"'],

    ['Rule',
     'number-with-chars', 'mathspeak.default',
     '[t] "Number"; [m] CQFspaceoutNumber (grammar:protected)',
     'self::number', '@role="othernumber"',
     '"" != translate(text(), "0123456789.,", "")',
     'not(contains(@grammar, "protected"))'],

    ['SpecializedRule',
     'number-with-chars', 'mathspeak.default', 'mathspeak.brief',
     '[t] "Num"; [m] CQFspaceoutNumber (grammar:protected)'],
    ['SpecializedRule',
     'number-with-chars', 'mathspeak.brief', 'mathspeak.sbrief'],

    // Maybe duplicate this rule for self::text
    ['Rule',
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
     '"")'],
    ['SpecializedRule',
     'number-as-upper-word', 'mathspeak.default', 'mathspeak.brief'],
    ['SpecializedRule',
     'number-as-upper-word', 'mathspeak.default', 'mathspeak.sbrief'],

    ['Rule',
     'number-baseline', 'mathspeak.default',
     '[t] "Baseline"; [n] . (grammar:baseline)',
     'self::number', 'not(contains(@grammar, "ignoreFont"))',
     'preceding-sibling::identifier', 'not(contains(@grammar, "baseline"))',
     'preceding-sibling::*[1][@role="latinletter" or @role="greekletter" or' +
     ' @role="otherletter"]',
     'parent::*/parent::infixop[@role="implicit"]'],
    ['SpecializedRule',
     'number-baseline', 'mathspeak.default', 'mathspeak.brief',
     '[t] "Base"; [n] . (grammar:baseline)'],
    ['SpecializedRule',
     'number-baseline', 'mathspeak.brief', 'mathspeak.sbrief'],


    ['Rule',
     'number-baseline-font', 'mathspeak.default',
     '[t] "Baseline"; [t] @font; [n] . (grammar:ignoreFont=@font)',
     'self::number', '@font', 'not(contains(@grammar, "ignoreFont"))',
     '@font!="normal"', 'preceding-sibling::identifier',
     'preceding-sibling::*[@role="latinletter" or @role="greekletter" or' +
     ' @role="otherletter"]',
     'parent::*/parent::infixop[@role="implicit"]'],
    ['SpecializedRule',
     'number-baseline-font', 'mathspeak.default', 'mathspeak.brief',
     '[t] "Base"; [t] @font; [n] . (grammar:ignoreFont=@font)'],
    ['SpecializedRule',
     'number-baseline-font', 'mathspeak.brief', 'mathspeak.sbrief'],

    ['Rule',
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
     '"")'],

    ['Rule',
     'identifier', 'mathspeak.default', '[n] text()', 'self::identifier'],

    // minus sign
    ['Rule',
     'negative', 'mathspeak.default',
     '[t] "negative"; [n] children/*[1]',
     'self::prefixop', '@role="negative"', 'children/identifier'],
    ['Aliases',
     'negative',
     'self::prefixop', '@role="negative"', 'children/number'],
    ['Aliases',
     'negative',
     'self::prefixop', '@role="negative"',
     'children/fraction[@role="vulgar"]'],

    ['Rule',
     'negative', 'mathspeak.default',
     '[t] "minus"; [n] children/*[1]',
     'self::prefixop', '@role="negative"'],

    // Operator rules
    ['Rule',
     'prefix', 'mathspeak.default',
     '[m] content/*; [n] children/*[1]',
     'self::prefixop'],
    ['Rule',
     'postfix', 'mathspeak.default',
     '[n] children/*[1]; [m] content/*',
     'self::postfixop'],

    ['Rule',
     'binary-operation', 'mathspeak.default',
     '[m] children/* (sepFunc:CTXFcontentIterator);', 'self::infixop'],

    // Implicit times is currently ignored!
    ['Rule',
     'implicit', 'mathspeak.default',
     '[m] children/*', 'self::infixop', '@role="implicit"'],
    ['Aliases',
     'implicit', 'self::infixop', '@role="leftsuper" or' +
     ' @role="leftsub" or @role="rightsuper" or @role="rightsub"'],

    ['Rule','subtraction', 'mathspeak.default',
     '[m] children/* (separator:"minus");', 'self::infixop',
     '@role="subtraction"'],

    // Function rules
    ['Rule',
     'function-unknown', 'mathspeak.default',
     '[n] children/*[1]; [n] children/*[2]',
     'self::appl'],

    ['Rule',
     'function-prefix', 'mathspeak.default',
     '[n] children/*[1]; [n] children/*[2]',
     'self::appl', 'children/*[1][@role="prefix function"]'],


    // Fences rules
    ['Rule',
     'fences-open-close', 'mathspeak.default',
     '[n] content/*[1]; [n] children/*[1]; [n] content/*[2]',
     'self::fenced', '@role="leftright"'],

    ['Rule',
     'fences-neutral', 'mathspeak.default',
     '[t] "StartAbsoluteValue"; [n] children/*[1]; [t] "EndAbsoluteValue"',
     'self::fenced', '@role="neutral"',
     'content/*[1][text()]="|" or content/*[1][text()]="❘" or' +
     ' content/*[1][text()]="｜"'],
    ['SpecializedRule',
     'fences-neutral', 'mathspeak.default', 'mathspeak.sbrief',
     '[t] "AbsoluteValue"; [n] children/*[1]; [t] "EndAbsoluteValue"'],
    ['Rule',
     'fences-neutral', 'mathspeak.default',
     '[n] content/*[1]; [n] children/*[1]; [n] content/*[2]',
     'self::fenced', '@role="neutral"'],


    // TODO (sorge) Maybe check for punctuated element and singleton?
    ['Rule',
     'fences-set', 'mathspeak.default',
     '[t] "StartSet"; [n] children/*[1]; [t] "EndSet"',
     'self::fenced', '@role="set empty" or @role="set extended"' +
     ' or @role="set singleton" or @role="set collection"',
     // 'self::fenced', '@role="leftright"', 'content/*[1][text()]="{"',
     // 'content/*[2][text()]="}"', 'count(children/*)=1',
     'not(name(../..)="appl")'],
    ['SpecializedRule',
     'fences-set', 'mathspeak.default', 'mathspeak.sbrief',
     '[t] "Set"; [n] children/*[1]; [t] "EndSet"'],


    // Text rules
    ['Rule',
     'text', 'mathspeak.default', '[n] text()', 'self::text'],

    // Special symbols
    ['Rule',
     'factorial', 'mathspeak.default', '[t] "factorial"', 'self::punctuation',
     'text()="!"', 'name(preceding-sibling::*[1])!="text"'],
    ['Rule',
     'minus', 'mathspeak.default', '[t] "minus"',
     'self::operator', 'text()="\u002D"'],

    ['Rule',
     'single-prime', 'mathspeak.default', '[t] "prime"',
     'self::punctuated', '@role="prime"', 'count(children/*)=1'],
    ['Rule',
     'double-prime', 'mathspeak.default', '[t] "double prime"',
     'self::punctuated', '@role="prime"', 'count(children/*)=2'],
    ['Rule',
     'triple-prime', 'mathspeak.default', '[t] "triple prime"',
     'self::punctuated', '@role="prime"', 'count(children/*)=3'],
    ['Rule',
     'quadruple-prime', 'mathspeak.default', '[t] "quadruple prime"',
     'self::punctuated', '@role="prime"', 'count(children/*)=4'],
    ['Rule',
     'counted-prime', 'mathspeak.default',
     '[t] count(children/*); [t] "prime"',
     'self::punctuated', '@role="prime"'],

    // Fraction rules

    ['Rule',
     'fraction', 'mathspeak.default',
     '[t] CSFopenFracVerbose; [n] children/*[1];' +
     ' [t] CSFoverFracVerbose; [n] children/*[2]; [t] CSFcloseFracVerbose',
     'self::fraction'],

    ['Rule',
     'fraction', 'mathspeak.brief',
     '[t] CSFopenFracBrief; [n] children/*[1];' +
     ' [t] CSFoverFracVerbose; [n] children/*[2]; [t] CSFcloseFracBrief',
     'self::fraction'],

    ['Rule',
     'fraction', 'mathspeak.sbrief',
     '[t] CSFopenFracSbrief; [n] children/*[1];' +
     ' [t] CSFoverFracSbrief; [n] children/*[2]; [t] CSFcloseFracSbrief',
     'self::fraction'],

    ['Rule',
     'vulgar-fraction', 'mathspeak.default',
     '[t] CSFvulgarFraction',
     'self::fraction', '@role="vulgar"', 'CQFvulgarFractionSmall'],
    ['SpecializedRule',
     'vulgar-fraction', 'mathspeak.default', 'mathspeak.brief'],
    ['SpecializedRule',
     'vulgar-fraction', 'mathspeak.default', 'mathspeak.sbrief'],

    ['Rule',
     'continued-fraction-outer', 'mathspeak.default',
     '[t] "ContinuedFraction"; [n] children/*[1];' +
     '[t] "Over"; [n] children/*[2]',
     'self::fraction', 'not(ancestor::fraction)',
     'children/*[2]/descendant-or-self::*[@role="ellipsis" and ' +
     'not(following-sibling::*)]'],
    ['SpecializedRule',
     'continued-fraction-outer', 'mathspeak.default', 'mathspeak.brief',
     '[t] "ContinuedFrac"; [n] children/*[1];' +
     '[t] "Over"; [n] children/*[2]'],
    ['SpecializedRule',
     'continued-fraction-outer', 'mathspeak.brief', 'mathspeak.sbrief'],

    ['Rule',
     'continued-fraction-inner', 'mathspeak.default',
     '[t] "StartFraction"; [n] children/*[1];' +
     '[t] "Over"; [n] children/*[2]',
     'self::fraction', 'ancestor::fraction',
     'children/*[2]/descendant-or-self::*[@role="ellipsis" and ' +
     'not(following-sibling::*)]'],
    ['SpecializedRule',
     'continued-fraction-inner', 'mathspeak.default', 'mathspeak.brief',
     '[t] "StartFrac"; [n] children/*[1];' +
     '[t] "Over"; [n] children/*[2]'],
    ['SpecializedRule',
     'continued-fraction-inner', 'mathspeak.brief', 'mathspeak.sbrief',
     '[t] "Frac"; [n] children/*[1];' +
     '[t] "Over"; [n] children/*[2]'],

    // Radical rules

    ['Rule',
     'sqrt', 'mathspeak.default',
     '[t] CSFopenRadicalVerbose; [n] children/*[1];' +
     ' [t] CSFcloseRadicalVerbose',
     'self::sqrt'],

    ['Rule',
     'sqrt', 'mathspeak.brief',
     '[t] CSFopenRadicalBrief; [n] children/*[1];' +
     ' [t] CSFcloseRadicalBrief',
     'self::sqrt'],

    ['Rule',
     'sqrt', 'mathspeak.sbrief',
     '[t] CSFopenRadicalSbrief; [n] children/*[1];' +
     ' [t] CSFcloseRadicalBrief',
     'self::sqrt'],

    ['Rule',
     'root', 'mathspeak.default',
     '[t] CSFindexRadicalVerbose; [n] children/*[1];' +
     '[t] CSFopenRadicalVerbose; [n] children/*[2];' +
     ' [t] CSFcloseRadicalVerbose',
     'self::root'],

    ['Rule',
     'root', 'mathspeak.brief',
     '[t] CSFindexRadicalBrief; [n] children/*[1];' +
     '[t] CSFopenRadicalBrief; [n] children/*[2];' +
     ' [t] CSFcloseRadicalBrief',
     'self::root'],

    ['Rule',
     'root', 'mathspeak.sbrief',
     '[t] CSFindexRadicalSbrief; [n] children/*[1];' +
     '[t] CSFopenRadicalSbrief; [n] children/*[2];' +
     ' [t] CSFcloseRadicalBrief',
     'self::root'],

    // Limits
    ['Rule',
     'limboth', 'mathspeak.default',
     '[n] children/*[1]; [t] CSFunderscript; [n] children/*[2];' +
     '[t] CSFoverscript; [n] children/*[3]',
     'self::limboth', 'name(../..)="underscore" or name(../..)="overscore"',
     'following-sibling::*[@role!="underaccent" and @role!="overaccent"]'],
    ['Rule',
     'limlower', 'mathspeak.default',
     '[n] children/*[1]; [t] CSFunderscript; [n] children/*[2];',
     'self::limlower', 'name(../..)="underscore" or name(../..)="overscore"',
     'following-sibling::*[@role!="underaccent" and @role!="overaccent"]'],
    ['Rule',
     'limupper', 'mathspeak.default',
     '[n] children/*[1]; [t] CSFoverscript; [n] children/*[2];',
     'self::limupper', 'name(../..)="underscore" or name(../..)="overscore"',
     'following-sibling::*[@role!="underaccent" and @role!="overaccent"]'],
    ['Aliases',
     'limlower', 'self::underscore', '@role="limit function"',
     'name(../..)="underscore" or name(../..)="overscore"',
     'following-sibling::*[@role!="underaccent" and @role!="overaccent"]'],
    ['Aliases',
     'limlower', 'self::underscore', 'children/*[2][@role!="underaccent"]',
     'name(../..)="underscore" or name(../..)="overscore"',
     'following-sibling::*[@role!="underaccent" and @role!="overaccent"]'],
    ['Aliases',
     'limupper', 'self::overscore', 'children/*[2][@role!="overaccent"]',
     'name(../..)="underscore" or name(../..)="overscore"',
     'following-sibling::*[@role!="underaccent" and @role!="overaccent"]'],

    ['Rule',
     'limboth-end', 'mathspeak.default',
     '[n] children/*[1]; [t] CSFunderscript; [n] children/*[2];' +
     '[t] CSFoverscript; [n] children/*[3]; [t] "Endscripts"',
     'self::limboth'],
    ['Rule',
     'limlower-end', 'mathspeak.default',
     '[n] children/*[1]; [t] CSFunderscript; [n] children/*[2];' +
     ' [t] "Endscripts"',
     'self::limlower'],
    ['Rule',
     'limupper-end', 'mathspeak.default',
     '[n] children/*[1]; [t] CSFoverscript; [n] children/*[2];' +
     ' [t] "Endscripts"',
     'self::limupper'],
    ['Aliases',
     'limlower-end', 'self::underscore', '@role="limit function"'],
    ['Aliases',
     'limlower-end', 'self::underscore'],
    ['Aliases',
     'limupper-end', 'self::overscore'],

    // Integral rules
    ['Rule',
     'integral', 'mathspeak.default',
     '[n] children/*[1]; [n] children/*[2]; [n] children/*[3];',
     'self::integral'],
    ['Rule',
     'integral', 'mathspeak.default',
     '[n] children/*[1]; [t] "Subscript"; [n] children/*[2];' +
     '[t] "Superscript"; [n] children/*[3]; [t] "Baseline";',
     'self::limboth', '@role="integral"'],
    ['SpecializedRule',
     'integral', 'mathspeak.default', 'mathspeak.brief',
     '[n] children/*[1]; [t] "Sub"; [n] children/*[2];' +
     '[t] "Sup"; [n] children/*[3]; [t] "Base";'],
    ['SpecializedRule',
     'integral', 'mathspeak.brief', 'mathspeak.sbrief'],

    ['Rule',
     'bigop', 'mathspeak.default',
     '[n] children/*[1]; [n] children/*[2];',
     'self::bigop'],



    // Relations
    ['Rule',
     'relseq', 'mathspeak.default',
     '[m] children/* (sepFunc:CTXFcontentIterator)',
     'self::relseq'],

    ['Rule',
     'equality', 'mathspeak.default',
     '[n] children/*[1]; [n] content/*[1]; [n] children/*[2]',
     'self::relseq', '@role="equality"', 'count(./children/*)=2'],

    ['Rule',
     'multi-equality', 'mathspeak.default',
     '[m] children/* (sepFunc:CTXFcontentIterator)',
     'self::relseq', '@role="equality"', 'count(./children/*)>2'],

    ['Rule',
     'multrel', 'mathspeak.default',
     '[m] children/* (sepFunc:CTXFcontentIterator)',
     'self::multirel'],

    // Subscripts
    ['Rule',
     'subscript', 'mathspeak.default',
     '[n] children/*[1]; [t] CSFsubscriptVerbose; [n] children/*[2]',
     'self::subscript'],
    ['Rule',
     'subscript', 'mathspeak.brief',
     '[n] children/*[1]; [t] CSFsubscriptBrief; [n] children/*[2]',
     'self::subscript'],
    ['SpecializedRule',
     'subscript', 'mathspeak.brief', 'mathspeak.sbrief'],

    ['Rule',
     'subscript-simple', 'mathspeak.default',
     '[n] children/*[1]; [n] children/*[2]',
     'self::subscript',
     'name(./children/*[1])="identifier"',
     // Second child is a number but not mixed or other.
     'name(./children/*[2])="number"',
     './children/*[2][@role!="mixed"]',
     './children/*[2][@role!="othernumber"]'],
    ['SpecializedRule',
     'subscript-simple', 'mathspeak.default', 'mathspeak.brief'],
    ['SpecializedRule',
     'subscript-simple', 'mathspeak.default', 'mathspeak.sbrief'],

    ['Rule',
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
     ' or @role="leftsub" or @role="leftsub"])'],
    ['SpecializedRule',
     'subscript-baseline', 'mathspeak.default', 'mathspeak.brief',
     '[n] children/*[1]; [t] CSFsubscriptBrief; [n] children/*[2];' +
     ' [t] CSFbaselineBrief'],
    ['SpecializedRule',
     'subscript-baseline', 'mathspeak.brief', 'mathspeak.sbrief'],
    ['Aliases',
     'subscript-baseline',
     'self::subscript', 'not(following-sibling::*)',
     'ancestor::fenced|ancestor::root|ancestor::sqrt|ancestor::punctuated|' +
     'ancestor::fraction',
     'not(ancestor::punctuated[@role="leftsuper" or @role="rightsub"' +
     ' or @role="rightsuper" or @role="rightsub"])'],
    ['Aliases',
     'subscript-baseline',
     'self::subscript', 'not(following-sibling::*)',
     'ancestor::relseq|ancestor::multirel',
     sre.MathspeakUtil.generateBaselineConstraint()],
    ['Aliases',
     'subscript-baseline',
     'self::subscript', 'not(following-sibling::*)',
     '@embellished'],

    ['Rule',
     'subscript-empty-sup', 'mathspeak.default',
     '[n] children/*[1]; [n] children/*[2]',
     'self::subscript',
     'name(children/*[2])="infixop"',
     'name(children/*[2][@role="implicit"]/children/*[1])="superscript"',
     'name(children/*[2]/children/*[1]/children/*[1])="empty"'],
    ['SpecializedRule',
     'subscript-empty-sup', 'mathspeak.default', 'mathspeak.brief'],
    ['SpecializedRule',
     'subscript-empty-sup', 'mathspeak.brief', 'mathspeak.sbrief'],
    ['Aliases',
     'subscript-empty-sup', 'self::subscript',
     'name(children/*[2])="superscript"',
     'name(children/*[2]/children/*[1])="empty"'],


    // Superscripts
    ['Rule',
     'superscript', 'mathspeak.default',
     '[n] children/*[1]; [t] CSFsuperscriptVerbose; [n] children/*[2]',
     'self::superscript'],
    ['SpecializedRule',
     'superscript', 'mathspeak.default', 'mathspeak.brief',
     '[n] children/*[1]; [t] CSFsuperscriptBrief; [n] children/*[2]'],
    ['SpecializedRule',
     'superscript', 'mathspeak.brief', 'mathspeak.sbrief'],


    ['Rule',
     'superscript-baseline', 'mathspeak.default',
     '[n] children/*[1]; [t] CSFsuperscriptVerbose; [n] children/*[2];' +
     '[t] CSFbaselineVerbose',
     'self::superscript', 'following-sibling::*',
     'not(name(following-sibling::superscript/children/*[1])="empty" or ' +
     '(name(following-sibling::infixop[@role="implicit"]/children/*[1])=' +
     '"superscript" and ' +
     'name(following-sibling::*/children/*[1]/children/*[1])="empty")) and ' +
     'not(following-sibling::*[@role="rightsuper" or @role="rightsub"' +
     ' or @role="leftsub" or @role="leftsub"])'],
    ['SpecializedRule',
     'superscript-baseline', 'mathspeak.default', 'mathspeak.brief',
     '[n] children/*[1]; [t] CSFsuperscriptBrief; [n] children/*[2];' +
     '[t] CSFbaselineBrief'],
    ['SpecializedRule',
     'superscript-baseline', 'mathspeak.brief', 'mathspeak.sbrief'],
    ['Aliases',
     'superscript-baseline',
     'self::superscript', 'not(following-sibling::*)',
     'ancestor::punctuated',
     'ancestor::*/following-sibling::* and ' +
     'not(ancestor::punctuated[@role="leftsuper" or @role="rightsub"' +
     ' or @role="rightsuper" or @role="rightsub"])'],
    ['Aliases',
     'superscript-baseline',
     'self::superscript', 'not(following-sibling::*)',
     'ancestor::fraction|ancestor::fenced|ancestor::root|ancestor::sqrt'],
    ['Aliases',
     'superscript-baseline',
     'self::superscript', 'not(following-sibling::*)',
     'ancestor::relseq|ancestor::multirel',
     'not(@embellished)',
     sre.MathspeakUtil.generateBaselineConstraint()],
    ['Aliases',
     'superscript-baseline',
     'self::superscript', 'not(following-sibling::*)',
     '@embellished', 'not(children/*[2][@role="prime"])'],


    ['Rule',
     'superscript-empty-sub', 'mathspeak.default',
     '[n] children/*[1]; [n] children/*[2]',
     'self::superscript',
     'name(children/*[2])="infixop"',
     'name(children/*[2][@role="implicit"]/children/*[1])="subscript"',
     'name(children/*[2]/children/*[1]/children/*[1])="empty"'],
    ['SpecializedRule',
     'superscript-empty-sub', 'mathspeak.default', 'mathspeak.brief'],
    ['SpecializedRule',
     'superscript-empty-sub', 'mathspeak.brief', 'mathspeak.sbrief'],
    ['Aliases',
     'superscript-empty-sub', 'self::superscript',
     'name(children/*[2])="subscript"',
     'name(children/*[2]/children/*[1])="empty"'],

    // Square
    ['Rule',
     'square', 'mathspeak.default',
     '[n] children/*[1]; [t] "squared"',
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
     'not(@embellished)'],
    ['SpecializedRule',
     'square', 'mathspeak.default', 'mathspeak.brief'],
    ['SpecializedRule',
     'square', 'mathspeak.default', 'mathspeak.sbrief'],
    ['Aliases',
     'square', 'self::superscript', 'children/*[2]',
     'children/*[2][text()=2]', '@embellished',
     'children/*[1][@role="prefix operator"]'],

    // Cube
    ['Rule',
     'cube', 'mathspeak.default',
     '[n] children/*[1]; [t] "cubed"',
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
     'not(@embellished)'],
    ['SpecializedRule',
     'cube', 'mathspeak.default', 'mathspeak.brief'],
    ['SpecializedRule',
     'cube', 'mathspeak.default', 'mathspeak.sbrief'],
    ['Aliases',
     'cube', 'self::superscript', 'children/*[2]',
     'children/*[2][text()=3]', '@embellished',
     'children/*[1][@role="prefix operator"]'],

    // Primes
    // This rule uses some redundancy for ordering!
    ['Rule',
     'prime', 'mathspeak.default',
     '[n] children/*[1]; [n] children/*[2]',
     'self::superscript', 'children/*[2]', 'children/*[2][@role="prime"]'],
    ['SpecializedRule',
     'prime', 'mathspeak.default', 'mathspeak.brief'],
    ['SpecializedRule',
     'prime', 'mathspeak.default', 'mathspeak.sbrief'],

    ['Rule',
     'prime-subscript', 'mathspeak.default',
     '[n] children/*[1]/children/*[1]; [n] children/*[2];' +
     ' [t] CSFsubscriptVerbose; [n] children/*[1]/children/*[2]',
     'self::superscript', 'children/*[2][@role="prime"]',
     'name(children/*[1])="subscript"', 'not(following-sibling::*)'],
    ['SpecializedRule',
     'prime-subscript', 'mathspeak.default', 'mathspeak.brief',
     '[n] children/*[1]/children/*[1]; [n] children/*[2];' +
     ' [t] CSFsubscriptBrief; [n] children/*[1]/children/*[2]'],
    ['SpecializedRule',
     'prime-subscript', 'mathspeak.brief', 'mathspeak.sbrief'],

    ['Rule',
     'prime-subscript-baseline', 'mathspeak.default',
     '[n] children/*[1]/children/*[1]; [n] children/*[2];' +
     ' [t] CSFsubscriptVerbose; [n] children/*[1]/children/*[2];' +
     ' [t] CSFbaselineVerbose',
     'self::superscript', 'children/*[2][@role="prime"]',
     'name(children/*[1])="subscript"', 'following-sibling::*'],
    ['SpecializedRule',
     'prime-subscript-baseline', 'mathspeak.default', 'mathspeak.brief',
     '[n] children/*[1]/children/*[1]; [n] children/*[2];' +
     ' [t] CSFsubscriptBrief; [n] children/*[1]/children/*[2];' +
     ' [t] CSFbaselineBrief'],
    ['SpecializedRule',
     'prime-subscript-baseline', 'mathspeak.brief', 'mathspeak.sbrief'],
    ['Aliases',
     'prime-subscript-baseline',
     'self::superscript', 'children/*[2][@role="prime"]',
     'name(children/*[1])="subscript"', 'not(following-sibling::*)',
     '@embellished'],

    ['Rule',
     'prime-subscript-simple', 'mathspeak.default',
     '[n] children/*[1]/children/*[1]; [n] children/*[2];' +
     '[n] children/*[1]/children/*[2]',
     'self::superscript', 'children/*[2][@role="prime"]',
     'name(children/*[1])="subscript"',
     'name(children/*[1]/children/*[1])="identifier"',
     // Second child is a number but not mixed or other.
     'name(children/*[1]/children/*[2])="number"',
     'children/*[1]/children/*[2][@role!="mixed"]',
     'children/*[1]/children/*[2][@role!="othernumber"]'
    ],
    ['SpecializedRule',
     'prime-subscript-simple', 'mathspeak.default', 'mathspeak.brief'],
    ['SpecializedRule',
     'prime-subscript-simple', 'mathspeak.default', 'mathspeak.sbrief'],

    // Modifiers
    ['Rule',
     'overscore', 'mathspeak.default',
     '[t] "ModifyingAbove"; [n] children/*[1]; [t] "With"; [n] children/*[2]',
     'self::overscore', 'children/*[2][@role="overaccent"]'
    ],
    ['SpecializedRule',
     'overscore', 'mathspeak.default', 'mathspeak.brief',
     '[t] "ModAbove"; [n] children/*[1]; [t] "With"; [n] children/*[2]'
    ],
    ['SpecializedRule',
     'overscore', 'mathspeak.brief', 'mathspeak.sbrief'],

    ['Rule',
     'double-overscore', 'mathspeak.default',
     '[t] "ModifyingAbove Above"; [n] children/*[1]; [t] "With";' +
     ' [n] children/*[2]',
     'self::overscore', 'children/*[2][@role="overaccent"]',
     'name(children/*[1])="overscore"',
     'children/*[1]/children/*[2][@role="overaccent"]'
    ],
    ['SpecializedRule',
     'double-overscore', 'mathspeak.default', 'mathspeak.brief',
     '[t] "ModAbove Above"; [n] children/*[1]; [t] "With"; [n] children/*[2]'
    ],
    ['SpecializedRule',
     'double-overscore', 'mathspeak.brief', 'mathspeak.sbrief'],

    ['Rule',
     'underscore', 'mathspeak.default',
     '[t] "ModifyingBelow"; [n] children/*[1]; [t] "With"; [n] children/*[2]',
     'self::underscore', 'children/*[2][@role="underaccent"]'
    ],
    ['SpecializedRule',
     'underscore', 'mathspeak.default', 'mathspeak.brief',
     '[t] "ModBelow"; [n] children/*[1]; [t] "With"; [n] children/*[2]'
    ],
    ['SpecializedRule',
     'underscore', 'mathspeak.brief', 'mathspeak.sbrief'],

    ['Rule',
     'double-underscore', 'mathspeak.default',
     '[t] "ModifyingBelow Below"; [n] children/*[1]; [t] "With";' +
     ' [n] children/*[2]',
     'self::underscore', 'children/*[2][@role="underaccent"]',
     'name(children/*[1])="underscore"',
     'children/*[1]/children/*[2][@role="underaccent"]'],
    ['SpecializedRule',
     'double-underscore', 'mathspeak.default', 'mathspeak.brief',
     '[t] "ModBelow Below"; [n] children/*[1]; [t] "With"; [n] children/*[2]'
    ],
    ['SpecializedRule',
     'double-underscore', 'mathspeak.brief', 'mathspeak.sbrief'],

    ['Rule',
     'overbar', 'mathspeak.default',
     '[n] children/*[1]; [t] "overbar"',
     'self::overscore',
     '@role="latinletter" or @role="greekletter" or @role="otherletter"',
     'children/*[2][@role="overaccent"]',   // redundancy
     'children/*[2][text()="\u00AF" or text()="\uFFE3" or text()="\uFF3F"' +
     ' or text()="\u005F" or text()="\u203E"]'
    ],
    ['SpecializedRule',
     'overbar', 'mathspeak.default', 'mathspeak.brief',
     '[n] children/*[1]; [t] "overBar"'
    ],
    ['SpecializedRule',
     'overbar', 'mathspeak.brief', 'mathspeak.sbrief'],

    ['Rule',
     'underbar', 'mathspeak.default',
     '[n] children/*[1]; [t] "underbar"',
     'self::underscore',
     '@role="latinletter" or @role="greekletter" or @role="otherletter"',
     'children/*[2][@role="underaccent"]',   // redundancy
     'children/*[2][text()="\u00AF" or text()="\uFFE3" or text()="\uFF3F"' +
     ' or text()="\u005F" or text()="\u203E"]'
    ],
    ['SpecializedRule',
     'underbar', 'mathspeak.default', 'mathspeak.brief',
     '[n] children/*[1]; [t] "underBar"'
    ],
    ['SpecializedRule',
     'underbar', 'mathspeak.brief', 'mathspeak.sbrief'],

    ['Rule',
     'overtilde', 'mathspeak.default',
     '[n] children/*[1]; [t] "overTilde"',
     'self::overscore',
     'children/*[2][@role="overaccent"]',   // redundancy
     '@role="latinletter" or @role="greekletter" or @role="otherletter"',
     'children/*[2][text()="\u007E" or text()="\u02DC" or text()="\u223C"' +
     ' or text()="\uFF5E"]'
    ],
    ['SpecializedRule',
     'overtilde', 'mathspeak.default', 'mathspeak.brief',
     '[n] children/*[1]; [t] "overtilde"'
    ],
    ['SpecializedRule',
     'overtilde', 'mathspeak.brief', 'mathspeak.sbrief'],

    ['Rule',
     'undertilde', 'mathspeak.default',
     '[n] children/*[1]; [t] "underTilde"',
     'self::underscore',
     '@role="latinletter" or @role="greekletter" or @role="otherletter"',
     'children/*[2][@role="underaccent"]',   // redundancy
     'children/*[2][text()="\u007E" or text()="\u02DC" or text()="\u223C"' +
     ' or text()="\uFF5E"]'
    ],
    ['SpecializedRule',
     'undertilde', 'mathspeak.default', 'mathspeak.brief',
     '[n] children/*[1]; [t] "undertilde"'
    ],
    ['SpecializedRule',
     'undertilde', 'mathspeak.brief', 'mathspeak.sbrief'],

    // Layout Elements
    ['Rule',
     'matrix-fence', 'mathspeak.default',
     '[n] children/*[1];',
     'self::fenced', 'count(children/*)=1', 'name(children/*[1])="matrix"'],

    ['Rule',
     'matrix', 'mathspeak.default',
     '[t] "Start"; [t] count(children/*);  [t] "By";' +
     '[t] count(children/*[1]/children/*); [t] "Matrix"; ' +
     '[m] children/* (ctxtFunc:CTXFordinalCounter,context:"Row ");' +
     ' [t] "EndMatrix"',
     'self::matrix'],
    ['Rule',
     'matrix', 'mathspeak.sbrief',
     '[t] count(children/*);  [t] "By";' +
     '[t] count(children/*[1]/children/*); [t] "Matrix"; ' +
     '[m] children/* (ctxtFunc:CTXFordinalCounter,context:"Row ");' +
     ' [t] "EndMatrix"', 'self::matrix'],
    ['Aliases',
     'matrix', 'self::vector'],

    ['Rule',
     'matrix-row', 'mathspeak.default',
     '[m] children/* (ctxtFunc:CTXFordinalCounter,context:"Column");' +
     '[p] (pause: 200)',
     'self::row'],
    ['Rule',
     'row-with-label', 'mathspeak.default',
     '[t] "with Label"; [n] content/*[1]; [t] "EndLabel"(pause: 200); ' +
     '[m] children/* (ctxtFunc:CTXFordinalCounter,context:"Column")',
     'self::row', 'content'],
    ['Rule',
     'row-with-label', 'mathspeak.brief',
     '[t] "Label"; [n] content/*[1]; ' +
     '[m] children/* (ctxtFunc:CTXFordinalCounter,context:"Column")',
     'self::row', 'content'],
    ['SpecializedRule',
     'row-with-label', 'mathspeak.brief', 'mathspeak.sbrief'],
    ['Rule',
     'row-with-text-label', 'mathspeak.sbrief',
     '[t] "Label"; [t] CSFRemoveParens;' +
     '[m] children/* (ctxtFunc:CTXFordinalCounter,context:"Column")',
     'self::row', 'content', 'name(content/cell/children/*[1])="text"'],
    ['Rule',
     'empty-row', 'mathspeak.default',
     '[t] "Blank"', 'self::row', 'count(children/*)=0'],

    ['Rule',
     'matrix-cell', 'mathspeak.default',
     '[n] children/*[1]; [p] (pause: 300)', 'self::cell'],

    // ['Rule',
    //     'empty-cell', 'mathspeak.default',
    //     '[t] "Blank"', 'self::cell', 'count(children/*)=1', 'children/empty'],
    ['Rule',
     'empty-cell', 'mathspeak.default',
     '[t] "Blank"; [p] (pause: 300)', 'self::cell', 'count(children/*)=0'],


    ['Rule',
     'determinant', 'mathspeak.default',
     '[t] "Start"; [t] count(children/*);  [t] "By";' +
     '[t] count(children/*[1]/children/*); [t] "Determinant";' +
     ' [m] children/* (ctxtFunc:CTXFordinalCounter,context:"Row ");' +
     ' [t] "EndDeterminant"',
     'self::matrix', '@role="determinant"'],
    ['SpecializedRule',
     'determinant', 'mathspeak.default', 'mathspeak.sbrief',
     '[t] count(children/*);  [t] "By";' +
     '[t] count(children/*[1]/children/*); [t] "Determinant";' +
     ' [m] children/* (ctxtFunc:CTXFordinalCounter,context:"Row ");' +
     ' [t] "EndDeterminant"'],

    ['Rule',
     'determinant-simple', 'mathspeak.default',
     '[t] "Start"; [t] count(children/*);  [t] "By";' +
     '[t] count(children/*[1]/children/*); [t] "Determinant";' +
     ' [m] children/* (ctxtFunc:CTXFordinalCounter,context:"Row",' +
     'grammar:simpleDet); [t] "EndDeterminant"',
     'self::matrix', '@role="determinant"', 'CQFdetIsSimple'],
    ['SpecializedRule',
     'determinant-simple', 'mathspeak.default', 'mathspeak.sbrief',
     '[t] count(children/*);  [t] "By";' +
     '[t] count(children/*[1]/children/*); [t] "Determinant";' +
     ' [m] children/* (ctxtFunc:CTXFordinalCounter,context:"Row",' +
     'grammar:simpleDet); [t] "EndDeterminant"'],
    ['Rule',
     'row-simple', 'mathspeak.default',
     '[m] children/*;',
     'self::row', '@role="determinant"', 'contains(@grammar, "simpleDet")'],

    ['Rule',
     'layout', 'mathspeak.default', '[t] "StartLayout"; ' +
     '[m] children/* (ctxtFunc:CTXFordinalCounter,context:"Row ");' +
     ' [t] "EndLayout"', 'self::table'],
    ['Rule',
     'layout', 'mathspeak.sbrief', '[t] "Layout"; ' +
     '[m] children/* (ctxtFunc:CTXFordinalCounter,context:"Row ");' +
     ' [t] "EndLayout"', 'self::table'],

    ['Rule',
     'binomial', 'mathspeak.default',
     '[t] "StartBinomialOrMatrix"; [n] children/*[1]/children/*[1]; ' +
     '[t] "Choose"; [n] children/*[2]/children/*[1]; ' +
     ' [t] "EndBinomialOrMatrix"',
     'self::vector', '@role="binomial"'],
    ['Rule',
     'binomial', 'mathspeak.sbrief',
     '[t] "BinomialOrMatrix"; [n] children/*[1]/children/*[1]; ' +
     '[t] "Choose"; [n] children/*[2]/children/*[1]; ' +
     ' [t] "EndBinomialOrMatrix"',
     'self::vector', '@role="binomial"'],

    ['Rule',
     'cases', 'mathspeak.default', '[t] "StartLayout"; ' +
     '[t] "Enlarged"; [n] content/*[1];' +
     '[m] children/* (ctxtFunc:CTXFordinalCounter,context:"Row ");' +
     ' [t] "EndLayout"', 'self::cases'],
    ['Rule',
     'cases', 'mathspeak.sbrief', '[t] "Layout"; ' +
     '[t] "Enlarged"; [n] content/*[1];' +
     '[m] children/* (ctxtFunc:CTXFordinalCounter,context:"Row ");' +
     ' [t] "EndLayout"', 'self::cases'],

    // Multiline rules.
    ['Aliases',
     'layout', 'self::multiline'],

    ['Rule',
     'line', 'mathspeak.default',
     '[m] children/*', 'self::line'],
    ['Rule',
     'line-with-label', 'mathspeak.default',
     '[t] "with Label"; [n] content/*[1]; [t] "EndLabel" (pause: 200); ' +
     '[m] children/*',
     'self::line', 'content'],
    ['SpecializedRule',
     'line-with-label', 'mathspeak.default', 'mathspeak.brief',
     '[t] "Label"; [n] content/*[1] (pause: 200); [m] children/*'],
    ['SpecializedRule',
     'line-with-label', 'mathspeak.brief', 'mathspeak.sbrief'],
    ['Rule',
     'line-with-text-label', 'mathspeak.sbrief',
     '[t] "Label"; [t] CSFRemoveParens; [m] children/*',
     'self::line', 'content', 'name(content/cell/children/*[1])="text"'],
    ['Rule',
     'empty-line', 'mathspeak.default',
     '[t] "Blank"', 'self::line', 'count(children/*)=0', 'not(content)'],
    ['SpecializedRule','empty-line', 'mathspeak.default', 'mathspeak.brief'],
    ['SpecializedRule','empty-line', 'mathspeak.brief', 'mathspeak.sbrief'],
    ['Rule',
     'empty-line-with-label', 'mathspeak.default',
     '[t] "with Label"; [n] content/*[1]; [t] "EndLabel"(pause: 200); ' +
     '[t] "Blank"', 'self::line', 'count(children/*)=0', 'content'],
    ['SpecializedRule',
     'empty-line-with-label', 'mathspeak.default', 'mathspeak.brief',
     '[t] "Label"; [n] content/*[1] (pause: 200); [t] "Blank"'],
    ['SpecializedRule',
     'empty-line-with-label', 'mathspeak.brief', 'mathspeak.sbrief'],

    // Enclose
    ['Rule',
     'enclose', 'mathspeak.default',
     '[t] "StartEnclose"; [t] @role (grammar:localEnclose);' +
     ' [n] children/*[1]; [t] "EndEnclose"',
     'self::enclose'],
    ['Aliases',
     'overbar', 'self::enclose', '@role="top"'],
    ['Aliases',
     'underbar', 'self::enclose', '@role="bottom"'],
    ['Rule',
     'leftbar', 'mathspeak.default',
     '[t] "vertical bar"; [n] children/*[1]',
     'self::enclose', '@role="left"'],
    ['Rule',
     'rightbar', 'mathspeak.default',
     '[n] children/*[1]; [t] "vertical bar"',
     'self::enclose', '@role="right"'],

    // Crossout
    ['Rule',
     'crossout', 'mathspeak.default',
     '[t] "CrossOut"; [n] children/*[1]; [t] "EndCrossOut"',
     'self::enclose', '@role="updiagonalstrike" or' +
     ' @role="downdiagonalstrike" or @role="horizontalstrike"'],
    ['Rule',
     'cancel', 'mathspeak.default',
     '[t] "CrossOut"; [n] children/*[1]/children/*[1]; [t] "With";' +
     ' [n] children/*[2]; [t] "EndCrossOut"',
     'self::overscore', '@role="updiagonalstrike" or' +
     ' @role="downdiagonalstrike" or @role="horizontalstrike"'],
    ['SpecializedRule',
     'cancel', 'mathspeak.default', 'mathspeak.brief'],
    ['SpecializedRule',
     'cancel', 'mathspeak.default', 'mathspeak.sbrief'],
    ['Aliases','cancel',
     'self::underscore', '@role="updiagonalstrike" or' +
     ' @role="downdiagonalstrike" or @role="horizontalstrike"'],
    ['Rule',
     'cancel-reverse', 'mathspeak.default',
     '[t] "CrossOut"; [n] children/*[2]/children/*[1]; [t] "With";' +
     ' [n] children/*[1]; [t] "EndCrossOut"',
     'self::overscore', 'name(children/*[2])="enclose"',
     'children/*[2][@role="updiagonalstrike" or' +
     ' @role="downdiagonalstrike" or @role="horizontalstrike"]'],
    ['SpecializedRule',
     'cancel-reverse', 'mathspeak.default', 'mathspeak.brief'],
    ['SpecializedRule',
     'cancel-reverse', 'mathspeak.default', 'mathspeak.sbrief'],
    ['Aliases','cancel-reverse',
     'self::underscore', 'name(children/*[2])="enclose"',
     'children/*[2][@role="updiagonalstrike" or' +
     ' @role="downdiagonalstrike" or @role="horizontalstrike"]'],

    // Rules for punctuated expressions.
    ['Rule',
     'end-punct', 'mathspeak.default',
     '[m] children/*',
     'self::punctuated', '@role="endpunct"'],

    ['Rule',
     'start-punct', 'mathspeak.default',
     '[n] content/*[1]; [m] children/*[position()>1]',
     'self::punctuated', '@role="startpunct"'],

    ['Rule',
     'integral-punct', 'mathspeak.default',
     '[n] children/*[1]; [n] children/*[3]',
     'self::punctuated', '@role="integral"'],

    ['Rule',
     'punctuated', 'mathspeak.default',
     '[m] children/*',
     'self::punctuated'],

    // Unit rules.
    ['Rule',
     'unit', 'mathspeak.default',
     '[t] text() (grammar:annotation="unit":translate:plural)',
     'self::identifier', '@role="unit"'],

    ['Rule',
     'unit-combine', 'mathspeak.default',
     '[m] children/*', 'self::infixop', '@role="unit"'],
    ['Rule',
     'unit-divide', 'mathspeak.default',
     '[n] children/*[1]; [t] "per"; [n] children/*[2]',
     'self::fraction', '@role="unit"'],

    // Inference rules
    ['Rule',
     'inference', 'mathspeak.default',
     '[t] "inference rule"; [m] content/*; [t] "with conclusion"; ' +
     '[n] children/*[1]; [t] "and"; [t] count(children/*[2]/children/*); ' +
     '[t] "premises"',
     'self::inference'],
    ['Rule',
     'inference', 'mathspeak.default',
     '[t] "inference rule"; ; [m] content/*; [t] "with conclusion"; ' +
     '[n] children/*[1]; [t] "and"; [t] count(children/*[2]/children/*); ' +
     '[t] "premise"',
     'self::inference', 'count(children/*[2]/children/*)<2'],
    ['Rule',
     'premise', 'mathspeak.default',
     '[m] children/* (ctxtFunc:CTXFordinalCounter,context:"premise ");',
     'self::premises'],
    ['Rule',
     'conclusion', 'mathspeak.default',
     '[n] children/*[1]', 'self::conclusion'],
    ['Rule',
     'label', 'mathspeak.default',
     '[t] "label"; [n] children/*[1]',
     'self::rulelabel'],
    ['Rule',
     'axiom', 'mathspeak.default',
     '[t] "axiom"; [m] children/*[1];',
     'self::inference', '@role="axiom"'],
    ['Rule',
     'axiom', 'mathspeak.default',
     '[t] "empty axiom";',
     'self::empty', '@role="axiom"']
  ],
  initialize: [sre.MathspeakUtil.generateTensorRules]
};

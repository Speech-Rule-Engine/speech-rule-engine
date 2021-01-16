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
 *               Sponsored by BTAA (Big Ten Academic Alliance).
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.NemethRules');

goog.require('sre.MathspeakUtil');
goog.require('sre.NemethUtil');


/**
 * Nemeth Rules.
 */
sre.NemethRules = {
  locale: 'nemeth',
  modality: 'braille',
  domain: 'default',
  functions: [
    ['CQFspaceoutNumber', sre.MathspeakUtil.spaceoutNumber],
    ['CQFspaceoutIdentifier', sre.MathspeakUtil.spaceoutIdentifier],

    ['CSFspaceoutText', sre.MathspeakUtil.spaceoutText],
    // Fraction function.
    ['CSFopenFraction', sre.NemethUtil.openingFraction],
    ['CSFcloseFraction', sre.NemethUtil.closingFraction],
    ['CSFoverFraction', sre.NemethUtil.overFraction],
    ['CSFoverBevFraction', sre.NemethUtil.overBevelledFraction],

    // Radical function.
    ['CSFopenRadicalVerbose', sre.NemethUtil.openingRadical],
    ['CSFcloseRadicalVerbose', sre.NemethUtil.closingRadical],
    ['CSFindexRadicalVerbose', sre.NemethUtil.indexRadical],

    // Sub- Superscript.
    ['CSFsuperscriptVerbose', sre.MathspeakUtil.superscriptVerbose],
    ['CSFsubscriptVerbose', sre.MathspeakUtil.subscriptVerbose],
    ['CSFbaselineVerbose', sre.MathspeakUtil.baselineVerbose],

    // Over- Underscore.
    ['CSFunderscript', sre.MathspeakUtil.nestedUnderscore],
    ['CSFoverscript', sre.MathspeakUtil.nestedOverscore],

    ['CTFordinalCounter', sre.NumbersUtil.ordinalCounter],
    ['CTFcontentIterator', sre.StoreUtil.contentIterator],

    // Layout related.
    ['CQFdetIsSimple', sre.MathspeakUtil.determinantIsSimple],
    ['CSFRemoveParens', sre.MathspeakUtil.removeParens],

    // Dummy.
    ['CQFresetNesting', sre.MathspeakUtil.resetNestingDepth]
  ],
  rules: [
    // Initial rule
    ['Rule',
     'stree', 'default',
     '[n] ./*[1]', 'self::stree', 'CQFresetNesting'],


    // Dummy rules
    ['Rule',
     'unknown', 'default', '[n] text()',
     'self::unknown'],

    ['Rule',
     'protected', 'default', '[t] text()',
     'self::*', '@role="protected"'],

    ['Rule',
     'omit-empty', 'default',
     '[p] (pause:100)', // Pause necessary to voice separators between empty.
     'self::empty'],
    ['Rule',
     'blank-empty', 'default',
     '[t] "⠀"', 'self::empty', 'count(../*)=1',
     'name(../..)="cell" or name(../..)="line"'],

    // Font rules
    ['Rule',
     'font', 'default',
     '[t] @font (grammar:localFont); [n] . (grammar:ignoreFont=@font)',
     'self::*', '@font', 'not(contains(@grammar, "ignoreFont"))',
     '@font!="normal"'],

    ['Rule',
     'font-identifier-short', 'default',
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
     'font-identifier', 'default',
     '[t] @font (grammar:localFont); [n] . (grammar:ignoreFont=@font)',
     'self::identifier', 'string-length(text())=1',
     '@font', '@font="normal"', 'not(contains(@grammar, "ignoreFont"))',
     '@role!="unit"'],

    ['Rule',
     'omit-font', 'default',
     '[n] . (grammar:ignoreFont=@font)',
     'self::identifier', 'string-length(text())=1', '@font',
     '@role!="greekletter"',
     'not(contains(@grammar, "ignoreFont"))', '@font="italic"'],

    // Number rules
    ['Rule',
     'number-indicator', 'default', '[t] "⠼"; [n] text() (pause:10)',
     'self::number', 'contains(@annotation, "nemeth:number")',
     'not(ancestor::sqrt)', 'not(ancestor::root)', 'not(ancestor::fraction)'],


    ['Rule',
     'number', 'default', '[n] text()',
     'self::number'],

    // ['Rule',
    //     'number', 'default', '[t] "⠼"; [n] text()',
    //     'self::number', 'name(../..)="cell"'],

    // ['Rule',
    //     'number', 'default', '[t] "⠼"; [n] text()',
    //     'self::number', 'name(../..)="punctuated"',
    //     'not(ancestor::fenced)'],

    ['Rule',
     // TODO: Write tests to check that open/close frac is not repeated.
     'mixed-number', 'default',
     '[n] children/*[1]; [t] "⠸⠹"; [n] children/*[2]/children/*[1]; [t] "⠌";' +
     ' [n] children/*[2]/children/*[2]; [t] "⠸⠼"',
     'self::number', '@role="mixed"'],

    ['Rule',
     // TODO: Fix this with multipurpose indicator.
     'number-with-chars', 'default',
     '[t] "⠼"; [m] CQFspaceoutNumber', 'self::number',
     '"" != translate(text(), "0123456789.,", "")',
     'text() != translate(text(), "0123456789.,", "")'],


    // Maybe duplicate this rule for self::text
    ['Rule',
     'number-as-upper-word', 'default',
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

    ['Rule',
     'number-baseline', 'default',
     '[t] "⠐"; [n] text()',
     'self::number', 'not(contains(@grammar, "ignoreFont"))',
     'preceding-sibling::identifier',
     'preceding-sibling::*[1][@role="latinletter" or @role="greekletter" or' +
     ' @role="otherletter"]',
     'parent::*/parent::infixop[@role="implicit"]'],
    // TODO: Not sure about that baseline at the beginning.


    ['Rule',
     'number-baseline-font', 'default',
     '[t] "⠐"; [t] @font; [n] . (grammar:ignoreFont=@font)',
     'self::number', '@font', 'not(contains(@grammar, "ignoreFont"))',
     '@font!="normal"', 'preceding-sibling::identifier',
     'preceding-sibling::*[@role="latinletter" or @role="greekletter" or' +
     ' @role="otherletter"]',
     'parent::*/parent::infixop[@role="implicit"]'],
    // TODO: Not sure about that baseline at the beginning.

    ['Rule',
     'identifier', 'default', '[n] text()',
     'self::identifier', '@role="protected"'],

    // minus sign
    // ['Rule',
    //  'negative', 'default',
    //  '[n] "⠤"; [n] children/*[1]',
    //  'self::prefixop', '@role="negative"', 'string-length(text())=1'],


    // Operator rules
    ['Rule',
     'prefix', 'default',
     '[n] text(); [n] children/*[1]',
     'self::prefixop'],
    ['Rule',
     'postfix', 'default',
     '[n] children/*[1]; [n] text()',
     'self::postfixop'],

    ['Rule',
     'binary-operation', 'default',
     '[m] children/* (sepFunc:CTFcontentIterator);', 'self::infixop'],

    // Implicit times is currently ignored!
    ['Rule',
     'implicit', 'default',
     '[m] children/*', 'self::infixop', '@role="implicit"'],
    ['Aliases',
     'implicit', 'self::infixop', '@role="leftsuper" or' +
     ' @role="leftsub" or @role="rightsuper" or @role="rightsub"'],

    // ['Rule','subtraction', 'default',
    //            '[m] children/* (separator:"minus");', 'self::infixop',
    //            '@role="subtraction"'],

    // Function rules
    ['Rule',
     'function-named', 'default',
     '[n] children/*[1]; [t] "⠀"; [n] children/*[2]',
     'self::appl'],
    ['Rule',
     'function-prefix', 'default',
     '[n] content/*[1]; [t] "⠀"; [n] children/*[1]',
     'self::prefixop', 'content/*[1][@role="infix function"]'],
    ['Rule',
     'function-infix', 'default',
     '[n] children/*[1]; [n] content/*[1]; [t] "⠀"; [n] children/*[2]',
     'self::infixop', '@role="infix function"'],

    ['Rule',
     'function-simple', 'default',
     '[n] children/*[1]; [n] children/*[2]',
     'self::appl', 'children/*[1][@role="simple function"]'],


    // Fences rules
    ['Rule',
     'fences-open-close', 'default',
     '[n] content/*[1]; [n] children/*[1]; [n] content/*[2]',
     'self::fenced'],

    ['Rule',
     'fences-neutral', 'default',
     '[n] content/*[1]; [n] children/*[1]; [n] content/*[2]',
     'self::fenced', '@role="neutral"'],


    // Text rules
    ['Rule',
     'text', 'default', '[n] text()', 'self::text'],

    // Special symbols
    ['Rule',
     'factorial', 'default', '[t] "⠯"', 'self::punctuation',
     'text()="!"', 'name(preceding-sibling::*[1])!="text"'],

    ['Rule',
     'single-prime', 'default', '[t] "⠄"',
     'self::punctuated', '@role="prime"', 'count(children/*)=1'],
    ['Rule',
     'double-prime', 'default', '[t] "⠄⠄"',
     'self::punctuated', '@role="prime"', 'count(children/*)=2'],
    ['Rule',
     'triple-prime', 'default', '[t] "⠄⠄⠄"',
     'self::punctuated', '@role="prime"', 'count(children/*)=3'],
    ['Rule',
     'quadruple-prime', 'default', '[t] "⠄⠄⠄⠄"',
     'self::punctuated', '@role="prime"', 'count(children/*)=4'],

    // Fraction rules

    ['Rule',
     'fraction', 'default',
     '[t] CSFopenFraction; [n] children/*[1];' +
     ' [t] CSFoverFraction; [n] children/*[2]; [t] CSFcloseFraction',
     'self::fraction'],

    ['Rule',
     'bevelled-fraction', 'default',
     '[t] CSFopenFraction; [n] children/*[1];' +
     ' [t] CSFoverBevFraction; [n] children/*[2]; [t] CSFcloseFraction',
     'self::fraction', 'contains(@annotation, "general:bevelled")'],

    // Continued Fractions are currently literally transcribed in linear format!
    //
    // ['Rule',
    //     'continued-fraction-outer', 'default',
    //     '[t] "ContinuedFraction"; [n] children/*[1];' +
    //     '[t] "Over"; [n] children/*[2]',
    //     'self::fraction', 'not(ancestor::fraction)',
    //     'children/*[2]/descendant-or-self::*[@role="ellipsis" and ' +
    //     'not(following-sibling::*)]'],

    // ['Rule',
    //     'continued-fraction-inner', 'default',
    //     '[t] "StartFraction"; [n] children/*[1];' +
    //     '[t] "Over"; [n] children/*[2]',
    //     'self::fraction', 'ancestor::fraction',
    //     'children/*[2]/descendant-or-self::*[@role="ellipsis" and ' +
    //     'not(following-sibling::*)]'],

    // Radical rules

    ['Rule',
     'sqrt', 'default',
     '[t] CSFopenRadicalVerbose; [n] children/*[1];' +
     ' [t] CSFcloseRadicalVerbose',
     'self::sqrt'],

    ['Rule',
     'root', 'default',
     '[t] CSFindexRadicalVerbose; [n] children/*[1];' +
     '[t] "⠜"; [n] children/*[2];' +
     ' [t] CSFcloseRadicalVerbose',
     'self::root'],

    // Limits
    ['Rule',
     'limboth', 'default',
     '[t] "⠐"; [n] children/*[1]; [t] CSFunderscript; [n] children/*[2];' +
     '[t] CSFoverscript; [n] children/*[3]',
     'self::limboth', 'name(../..)="underscore" or name(../..)="overscore"',
     'following-sibling::*[@role!="underaccent" and @role!="overaccent"]'],
    ['Rule',
     'limlower', 'default',
     '[t] "⠐"; [n] children/*[1]; [t] CSFunderscript; [n] children/*[2];',
     'self::limlower', 'name(../..)="underscore" or name(../..)="overscore"',
     'following-sibling::*[@role!="underaccent" and @role!="overaccent"]'],
    ['Rule',
     'limupper', 'default',
     '[t] "⠐"; [n] children/*[1]; [t] CSFoverscript; [n] children/*[2];',
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
     'limboth-end', 'default',
     '[t] "⠐"; [n] children/*[1]; [t] CSFunderscript; [n] children/*[2];' +
     '[t] CSFoverscript; [n] children/*[3]; [t] "⠻"',
     'self::limboth'],
    ['Rule',
     'limlower-end', 'default',
     '[t] "⠐"; [n] children/*[1]; [t] CSFunderscript; [n] children/*[2];' +
     ' [t] "⠻"',
     'self::limlower'],
    ['Rule',
     'limupper-end', 'default',
     '[t] "⠐"; [n] children/*[1]; [t] CSFoverscript; [n] children/*[2];' +
     ' [t] "⠻"',
     'self::limupper'],
    ['Aliases',
     'limlower-end', 'self::underscore', '@role="limit function"'],
    ['Aliases',
     'limlower-end', 'self::underscore'],
    ['Aliases',
     'limupper-end', 'self::overscore'],

    // Integral rules
    ['Rule',
     'integral', 'default',
     '[n] children/*[1]; [n] children/*[2]; [n] children/*[3];',
     'self::integral'],
    ['Rule',
     'integral', 'default',
     '[n] children/*[1]; [t] "⠰"; [n] children/*[2];' +
     '[t] "⠘"; [n] children/*[3]; [t] "⠐"',
     'self::limboth', '@role="integral"'],
    // TODO: Not sure about the indicators and that baseline at the end.

    ['Rule',
     'bigop', 'default',
     '[n] children/*[1]; [n] children/*[2];',
     'self::bigop'],



    // Relations
    ['Rule',
     'relseq', 'default',
     '[m] children/* (sepFunc:CTFcontentIterator)',
     'self::relseq'],

    ['Rule',
     'equality', 'default',
     '[n] children/*[1]; [n] content/*[1]; [n] children/*[2]',
     'self::relseq', '@role="equality"', 'count(./children/*)=2'],

    ['Rule',
     'multi-equality', 'default',
     '[m] children/* (sepFunc:CTFcontentIterator)',
     'self::relseq', '@role="equality"', 'count(./children/*)>2'],

    ['Rule',
     'multrel', 'default',
     '[m] children/* (sepFunc:CTFcontentIterator)',
     'self::multirel'],

    // Subscripts
    ['Rule',
     'subscript', 'default',
     '[n] children/*[1]; [t] CSFsubscriptVerbose; [n] children/*[2]',
     'self::subscript'],

    ['Rule',
     'subscript-simple', 'default',
     '[n] children/*[1]; [n] children/*[2]',
     'self::subscript',
     'name(./children/*[1])="identifier"',
     // Second child is a number but not mixed or other.
     'name(./children/*[2])="number"',
     './children/*[2][@role!="mixed"]',
     './children/*[2][@role!="othernumber"]',
     'self::*'
    ],


    ['Rule',
     'subscript-baseline', 'default',
     '[n] children/*[1]; [t] CSFsubscriptVerbose; [n] children/*[2];' +
     ' [t] CSFbaselineVerbose',
     'self::subscript', 'following-sibling::*',
     '@role!="prefix function"',
     'not(name(following-sibling::subscript/children/*[1])="empty" or ' +
     '(name(following-sibling::infixop[@role="implicit"]/children/*[1])=' +
     '"subscript" and ' +
     'name(following-sibling::*/children/*[1]/children/*[1])="empty")) and ' +
     '@role!="subsup"',
     'not(following-sibling::*[@role="rightsuper" or @role="rightsub"' +
     ' or @role="leftsub" or @role="leftsub"])'],
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
     'subscript-empty-sup', 'default',
     '[n] children/*[1]; [n] children/*[2]',
     'self::subscript',
     'name(children/*[2])="infixop"',
     'name(children/*[2][@role="implicit"]/children/*[1])="superscript"',
     'name(children/*[2]/children/*[1]/children/*[1])="empty"'],
    ['Aliases',
     'subscript-empty-sup', 'self::subscript',
     'name(children/*[2])="superscript"',
     'name(children/*[2]/children/*[1])="empty"'],


    // Superscripts
    ['Rule',
     'superscript', 'default',
     '[n] children/*[1]; [t] CSFsuperscriptVerbose; [n] children/*[2]',
     'self::superscript'],


    ['Rule',
     'superscript-baseline', 'default',
     '[n] children/*[1]; [t] CSFsuperscriptVerbose; [n] children/*[2];' +
     '[t] CSFbaselineVerbose',
     'self::superscript', 'following-sibling::*',
     '@role!="prefix function"',
     'not(name(following-sibling::superscript/children/*[1])="empty" or ' +
     '(name(following-sibling::infixop[@role="implicit"]/children/*[1])=' +
     '"superscript" and ' +
     'name(following-sibling::*/children/*[1]/children/*[1])="empty")) and ' +
     'not(following-sibling::*[@role="rightsuper" or @role="rightsub"' +
     ' or @role="leftsub" or @role="leftsub"])'],
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
     'superscript-empty-sub', 'default',
     '[n] children/*[1]; [n] children/*[2]',
     'self::superscript',
     'name(children/*[2])="infixop"',
     'name(children/*[2][@role="implicit"]/children/*[1])="subscript"',
     'name(children/*[2]/children/*[1]/children/*[1])="empty"'],
    ['Aliases',
     'superscript-empty-sub', 'self::superscript',
     'name(children/*[2])="subscript"',
     'name(children/*[2]/children/*[1])="empty"'],


    // Primes
    // This rule uses some redundancy for ordering!
    ['Rule',
     'prime', 'default',
     '[n] children/*[1]; [n] children/*[2]',
     'self::superscript', 'children/*[2]', 'children/*[2][@role="prime"]'],

    ['Rule',
     'prime-subscript', 'default',
     '[n] children/*[1]/children/*[1]; [n] children/*[2];' +
     ' [t] CSFsubscriptVerbose; [n] children/*[1]/children/*[2]',
     'self::superscript', 'children/*[2][@role="prime"]',
     'name(children/*[1])="subscript"', 'not(following-sibling::*)'],

    ['Rule',
     'prime-subscript-baseline', 'default',
     '[n] children/*[1]/children/*[1]; [n] children/*[2];' +
     ' [t] CSFsubscriptVerbose; [n] children/*[1]/children/*[2];' +
     ' [t] CSFbaselineVerbose',
     'self::superscript', 'children/*[2][@role="prime"]',
     'name(children/*[1])="subscript"', 'following-sibling::*'],
    ['Aliases',
     'prime-subscript-baseline',
     'self::superscript', 'children/*[2][@role="prime"]',
     'name(children/*[1])="subscript"', 'not(following-sibling::*)',
     '@embellished'],

    ['Rule',
     'prime-subscript-simple', 'default',
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

    // Modifiers
    ['Rule',
     'overscore', 'default',
     '[t] "⠐"; [n] children/*[1]; [t] "⠣"; [n] children/*[2]; [t] "⠻"',
     'self::overscore', 'children/*[2][@role="overaccent"]'
    ],
    ['Rule',
     'overscore', 'default',
     '[n] children/*[1]; [t] "⠣"; [n] children/*[2]',
     'self::overscore', 'children/*[2][@role="overaccent"]',
     'contains(@grammar, "modified")'
    ],

    ['Rule',
     'double-overscore', 'default',
     '[t] "⠐"; [n] children/*[1] (grammar:"modified"); [t] "⠣";' +
     ' [n] children/*[2]; [t] "⠻"',
     'self::overscore', 'children/*[2][@role="overaccent"]',
     'name(children/*[1])="overscore"',
     'children/*[1]/children/*[2][@role="overaccent"]'
    ],

    ['Rule',
     'underscore', 'default',
     '[t] "⠐"; [n] children/*[1]; [t] "⠩"; [n] children/*[2]; [t] "⠻"',
     'self::underscore', 'children/*[2][@role="underaccent"]'
    ],
    ['Rule',
     'underscore', 'default',
     '[n] children/*[1]; [t] "⠩"; [n] children/*[2]',
     'self::underscore', 'children/*[2][@role="underaccent"]',
     'contains(@grammar, "modified")'
    ],

    ['Rule',
     'double-underscore', 'default',
     '[t] "⠐"; [n] children/*[1] (grammar:"modified"); [t] "⠩";' +
     ' [n] children/*[2]; [t] "⠻"',
     'self::underscore', 'children/*[2][@role="underaccent"]',
     'name(children/*[1])="underscore"',
     'children/*[1]/children/*[2][@role="underaccent"]'],

    // Layout Elements
    ['Rule',
     'matrix-fence', 'default',
     '[n] children/*[1];',
     'self::fenced', 'count(children/*)=1', 'name(children/*[1])="matrix"'],

    ['Rule',
     'matrix', 'default',
     '[m] children/* (separator:"⠀", join:"");',
     'self::matrix'],
    ['Aliases',
     'matrix', 'self::vector'],

    ['Rule',
     'matrix-row', 'default',
     '[n] ../../content/*[1] (grammar:enlargeFence); [m] children/*' +
     ' (separator:"⠀"); ' +
     '[n] ../../content/*[2] (grammar:enlargeFence); ',
     'self::row'],
    ['Aliases',
     'matrix-row', 'self::line', '@role="vector"'],
    ['Aliases',
     'matrix-row', 'self::line', '@role="binomial"'],
    ['Rule',
     'row-with-label', 'default',
     '[t] "with Label"; [n] content/*[1]; [t] "EndLabel"(pause: 200); ' +
     '[m] children/* (ctxtFunc:CTFordinalCounter,context:"Column")',
     'self::row', 'content'],
    ['Rule',
     'empty-row', 'default',
     '[t] "⠀" (pause:300)', 'self::row', 'count(children/*)=0'],

    ['Rule',
     'matrix-cell', 'default',
     '[n] children/*[1]', 'self::cell'],
    ['Rule',
     'empty-cell', 'default',
     '[t] "⠀" (pause: 300)', 'self::cell', 'count(children/*)=0'],


    // ['Rule',
    //     'determinant', 'default',
    //     '[m] children/* (separator:"\n", join:"");',
    //     'self::matrix', '@role="determinant"'],
    // ['Rule',
    //     'row-simple', 'default',
    //     '[n] ../../content/*[1] (grammar:enlargeFence); [m] children/*' +
    //     ' (separator:"⠀"); ' +
    //     '[n] ../../content/*[2] (grammar:enlargeFence); ',
    //     'self::row', '@role="determinant"'],

    ['Rule',
     'layout', 'default', '[m] children/* (separator:"⠀", join:"");',
     'self::table'],

    // ['Rule',
    //     'binomial', 'default',
    //     '[t] "StartBinomialOrMatrix"; [n] children/*[1]/children/*[1]; ' +
    //     '[t] "Choose"; [n] children/*[2]/children/*[1]; ' +
    //     ' [t] "EndBinomialOrMatrix"',
    //     'self::vector', '@role="binomial"'],

    ['Rule',
     'cases', 'default',
     '[n] ../../content/*[1] (grammar:enlargeFence); [m] children/*' +
     ' (separator:"⠀"); [t] "⠐"',
     'self::cases'],  // TODO: Not sure about that baseline at the end.

    // Multiline rules.
    ['Aliases',
     'layout', 'self::multiline'],

    ['Rule',
     'line', 'default',
     '[m] children/*', 'self::line'],
    ['Rule',
     'line-with-label', 'default',
     '[t] "with Label"; [n] content/*[1]; [t] "EndLabel" (pause: 200); ' +
     '[m] children/*',
     'self::line', 'content'],

    ['Rule',
     'empty-line', 'default',
     '[t] "⠀"', 'self::line', 'count(children/*)=0', 'not(content)'],

    ['Rule',
     'empty-line-with-label', 'default',
     '[t] "with Label"; [n] content/*[1]; [t] "EndLabel"(pause: 200); ' +
     '[t] "Blank"', 'self::line', 'count(children/*)=0', 'content'],

    // Enclose
    ['Rule', // TODO: Localise the roles.
     'enclose', 'default',
     '[t] "StartEnclose"; [t] @role (grammar:localEnclose);' +
     ' [n] children/*[1]; [t] "EndEnclose"',
     'self::enclose'],

    // TODO: Possibly modify with (grammar: "modified")
    ['Rule',
     'overbar', 'default',
     '[t] "⠐"; [n] children/*[1]; [t] "⠣⠱⠻"',
     'self::enclose', '@role="top"'],
    ['Rule',
     'underbar', 'default',
     '[t] "⠐"; [n] children/*[1]; [t] "⠩⠱⠻"',
     'self::enclose', '@role="bottom"'],

    ['Rule',
     'leftbar', 'default',
     '[t] "⠳"; [n] children/*[1]',
     'self::enclose', '@role="left"'],
    ['Rule',
     'rightbar', 'default',
     '[n] children/*[1]; [t] "⠳"',
     'self::enclose', '@role="right"'],

    // Crossout
    ['Rule',
     'crossout', 'default',
     '[t] "⠪"; [n] children/*[1]; [t] "⠻"',
     'self::enclose', '@role="updiagonalstrike" or' +
     ' @role="downdiagonalstrike" or @role="horizontalstrike"'],
    ['Rule',
     // TODO: Q: How to deal with "With" linearly. Currently we are
     // repeating the opening.
     'cancel', 'default',
     '[t] "⠪"; [n] children/*[1]/children/*[1]; [t] "⠪";' +
     ' [n] children/*[2]; [t] "⠻"',
     'self::overscore', '@role="updiagonalstrike" or' +
     ' @role="downdiagonalstrike" or @role="horizontalstrike"'],
    ['Aliases', 'cancel',
     'self::underscore', '@role="updiagonalstrike" or' +
     ' @role="downdiagonalstrike" or @role="horizontalstrike"'],
    ['Rule',
     'cancel-reverse', 'default',
     '[t] "⠪"; [n] children/*[2]/children/*[1]; [t] "⠪";' +
     ' [n] children/*[1]; [t] "⠻"',
     'self::overscore', 'name(children/*[2])="enclose"',
     'children/*[2][@role="updiagonalstrike" or' +
     ' @role="downdiagonalstrike" or @role="horizontalstrike"]'],
    ['Aliases', 'cancel-reverse',
     'self::underscore', 'name(children/*[2])="enclose"',
     'children/*[2][@role="updiagonalstrike" or' +
     ' @role="downdiagonalstrike" or @role="horizontalstrike"]'],

    // Rules for punctuated expressions.
    ['Rule',
     'end-punct', 'default',
     '[m] children/*',
     'self::punctuated', '@role="endpunct"'],
    // TODO: use punctuation indicator: "⠸" and "⠲"

    ['Rule',
     'start-punct', 'default',
     '[n] content/*[1]; [m] children/*[position()>1]',
     'self::punctuated', '@role="startpunct"'],

    ['Rule',
     'punctuation', 'default', '[n] text(); [t] "⠐"',
     'self::punctuation', '@role="fullstop"',
     'contains(@annotation, "nemeth:number")'],

    ['Rule',
     'punctuated', 'default',
     '[m] children/*',
     'self::punctuated'],

    ['Rule',
     'punctuation-comma', 'default', '[n] text(); [t] "⠀"',
     'self::punctuation' , 'parent::*/parent::punctuated',
     'following-sibling::*', '@role!="fullstop"', '@role!="vbar"'
    ],

    ['Rule',
     'punctuation-ellipses', 'default',
     '[t] "⠀"; [n] text(); [t] "⠀"',
     'self::punctuation' , 'parent::*/parent::punctuated',
     'following-sibling::*', '@role="ellipsis"',
     'name(preceding-sibling::*[1])!="punctuation"'
    ],
    ['Rule',
     'punctuation-ellipses', 'default',
     '[t] "⠀"; [n] text();',
     'self::punctuation' , 'parent::*/parent::punctuated',
     '@role="ellipsis"', 'name(preceding-sibling::*[1])!="punctuation"'
    ],

    // Unit rules.
    // ['Rule',
    //  'unit', 'default',
    //  '[t] text() (grammar:annotation="unit":translate)',
    //  'self::identifier', '@role="unit"'],
    // ['Rule',
    //  'unit-square', 'default',
    //  '[t] "square"; [n] children/*[1]',
    //  'self::superscript', '@role="unit"', 'children/*[2][text()=2]',
    //  'name(children/*[1])="identifier"'],

    // ['Rule',
    //  'unit-cubic', 'default',
    //  '[t] "cubic"; [n] children/*[1]',
    //  'self::superscript', '@role="unit"', 'children/*[2][text()=3]',
    //  'name(children/*[1])="identifier"'],
    // ['Rule',
    //  'reciprocal', 'default',
    //  '[t] "reciprocal"; [n] children/*[1]',
    //  'self::superscript', '@role="unit"', 'name(children/*[1])="identifier"',
    //  'name(children/*[2])="prefixop"', 'children/*[2][@role="negative"]',
    //  'children/*[2]/children/*[1][text()=1]',
    //  'count(preceding-sibling::*)=0 or preceding-sibling::*[@role!="unit"]'],
    // ['Rule',
    //  'reciprocal', 'default',
    //  '[t] "per"; [n] children/*[1]',
    //  'self::superscript', '@role="unit"', 'name(children/*[1])="identifier"',
    //  'name(children/*[2])="prefixop"', 'children/*[2][@role="negative"]',
    //  'children/*[2]/children/*[1][text()=1]',
    //  'preceding-sibling::*[@role="unit"]'],
    // ['Rule',
    //  'unit-combine', 'default',
    //  '[m] children/*', 'self::infixop', '@role="unit"'],
    // ['Rule',
    //  'unit-divide', 'default',
    //  '[n] children/*[1]; [t] "per"; [n] children/*[2]',
    //  'self::fraction', '@role="unit"'],

    // TODO: Add a semantical role for reference signs/footnotes.
    //       Fix the number rule so that a footnote number is indicated.
    ['Rule',
     'reference-sign', 'default',
     '[n] children/*[1]; [n] children/*[2]',
     'self::superscript', 'name(children/*[1])="text" or ' +
     '(name(children/*[1])="punctuated" and children/*[1][@role="text"])',
     'name(children/*[2])="operator" or name(children/*[2])="punctuation"'
    ],
    ['Rule',
     'reference-number', 'default',
     '[n] children/*[1]; [t] "⠈⠻"; [n] children/*[2]; [t] "⠐"',
     'self::superscript', 'name(children/*[1])="text" or ' +
     '(name(children/*[1])="punctuated" and children/*[1][@role="text"])',
     'name(children/*[2])="number"', 'children/*[2][@role="integer"]'
    ]
  ],
  initialize: [
    sre.NemethUtil.generateTensorRules,
    sre.NemethUtil.addAnnotators
  ]
};

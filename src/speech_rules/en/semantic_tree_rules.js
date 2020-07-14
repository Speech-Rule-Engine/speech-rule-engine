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

goog.provide('sre.SemanticTreeRules');

goog.require('sre.StoreUtil');

sre.SemanticTreeRules = {
  functions : [
    // Context functions
    ['CTXF', 'CTXFnodeCounter', sre.StoreUtil.nodeCounter],
    ['CTXF', 'CTXFcontentIterator', sre.StoreUtil.contentIterator],
  ],
  rules : [
    //
    // Rules
    //
    ['Rule',
      'collapsed', 'default.default',
      '[t] "collapsed"; [n] . (engine:modality=summary,grammar:collapsed)',
      'self::*', '@alternative', 'not(contains(@grammar, "collapsed"))',
      'self::*', 'self::*', 'self::*', 'self::*', 'self::*'
    ],
  // Initial rule
  ['Rule',
      'stree', 'default.default',
      '[n] ./*[1]', 'self::stree'],

  ['Rule',
      'factorial', 'default.default', '[t] "factorial"', 'self::punctuation',
      'text()="!"', 'name(preceding-sibling::*[1])!="text"'],

  ['Rule',
      'multrel', 'default.default',
      '[t] "multirelation"; [m] children/* (sepFunc:CTXFcontentIterator)',
      'self::multirel'],

  ['Rule',
      'variable-equality', 'default.default',
      '[t] "equation sequence"; [m] children/* ' +
          '(context:"part",ctxtFunc:CTXFnodeCounter,' +
          'sepFunc:CTXFcontentIterator)',
      'self::relseq[@role="equality"]', 'count(./children/*)>2',
      './children/punctuation[@role="ellipsis"]'],// Make that better!

  ['Rule',
      'multi-equality', 'default.default',
      '[t] "equation sequence"; [m] children/* ' +
          '(context:"part",ctxtFunc:CTXFnodeCounter,' +
          'sepFunc:CTXFcontentIterator)',
      'self::relseq[@role="equality"]', 'count(./children/*)>2'],

  ['Rule',
      'equality', 'default.default',
      '[n] children/*[1]; [p] (pause:200); [n] content/*[1] (pause:200);' +
          '[n] children/*[2]',
      'self::relseq[@role="equality"]', 'count(./children/*)=2'],

  ['Rule',
      'simple-equality', 'default.default',
      '[n] children/*[1]; [p] (pause:200); [n] content/*[1] (pause:200);' +
          '[n] children/*[2]',
      'self::relseq[@role="equality"]', 'count(./children/*)=2',
      './children/identifier or ./children/number'],

  ['Rule',
      'simple-equality2', 'default.default',
      '[n] children/*[1]; [p] (pause:200); [n] content/*[1] (pause:200);' +
          '[n] children/*[2]',
      'self::relseq[@role="equality"]', 'count(./children/*)=2',
      './children/function or ./children/appl'],

  ['Rule',
      'relseq', 'default.default',
      '[m] children/* (sepFunc:CTXFcontentIterator)',
      'self::relseq'],

  ['Rule',
      'binary-operation', 'default.default',
      '[m] children/* (sepFunc:CTXFcontentIterator);',
      'self::infixop'],

  ['Rule',
      'variable-addition', 'default.default',
      '[t] "sum with variable number of summands";' +
          '[p] (pause:400); [m] children/* (sepFunc:CTXFcontentIterator)',
      'self::infixop[@role="addition"]', 'count(children/*)>2',
      'children/punctuation[@role="ellipsis"]'],// Make that better!

  ['Rule',
      'multi-addition', 'default.default',
      '[t] "sum with"; [t] count(./children/*); [t] "summands";' +
          '[p] (pause:400); [m] children/* (sepFunc:CTXFcontentIterator)',
      'self::infixop[@role="addition"]', 'count(./children/*)>2'],

  // Prefix Operator
  ['Rule',
      'prefix', 'default.default',
      '[t] "prefix"; [m] content/* (pause 150);' +
      '[n] children/*[1]',
      'self::prefixop'],

  ['Rule',
      'negative', 'default.default',
      '[t] "negative"; [n] children/*[1]',
      'self::prefixop', 'self::prefixop[@role="negative"]'],

  // Postfix Operator
  ['Rule',
      'postfix', 'default.default',
      '[n] children/*[1]; [t] "postfix"; [m] content/* (pause 300)',
      'self::postfixop'],

  ['Rule',
      'identifier', 'default.default',
      '[n] text()', 'self::identifier'],

  ['Rule',
      'number', 'default.default',
      '[n] text()', 'self::number'],

  ['Rule',
      'mixed-number', 'default.default',
      '[n] children/*[1]; [t] "and"; [n] children/*[2]; ',
      'self::number', '@role="mixed"'],

  // Font rules
  ['Rule',
      'font', 'default.default',
      '[t] @font (grammar:localFont); [n] . (grammar:ignoreFont=@font)',
      'self::*', '@font', 'not(contains(@grammar, "ignoreFont"))',
      '@font!="normal"'],

  ['Rule',
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
      '@role!="unit"'],

  ['Rule',
      'font-identifier', 'default.default',
      '[t] @font (grammar:localFont); [n] . (grammar:ignoreFont=@font)',
      'self::identifier', 'string-length(text())=1',
      '@font', '@font="normal"', 'not(contains(@grammar, "ignoreFont"))',
      '@role!="unit"'],

  ['Rule',
      'omit-font', 'default.default',
      '[n] . (grammar:ignoreFont=@font)',
      'self::identifier', 'string-length(text())=1', '@font',
      'not(contains(@grammar, "ignoreFont"))', '@font="italic"'],

  // Fraction
  ['Rule',
      'fraction', 'default.default',
      '[p] (pause:250); [n] children/*[1] (rate:0.35); [p] (pause:250);' +
          ' [t] "divided by"; [n] children/*[2] (rate:-0.35); [p] (pause:400)',
      'self::fraction'],

  ['Rule',
      'superscript', 'default.default',
      '[n] children/*[1]; [t] "super"; [n] children/*[2] (pitch:0.35);' +
      '[p] (pause:300)',
      'self::superscript'],
  ['Rule',
      'subscript', 'default.default',
      '[n] children/*[1]; [t] "sub"; [n] children/*[2] (pitch:-0.35);' +
      '[p] (pause:300)',
      'self::subscript'],

  ['Rule',
      'ellipsis', 'default.default',
      '[p] (pause:200); [t] "ellipsis"; [p] (pause:300)',
      'self::punctuation', 'self::punctuation[@role="ellipsis"]'],

  ['Rule',
      'fence-single', 'default.default',
      '[n] text()',
   'self::punctuation', 'self::punctuation[@role="openfence"]'],
  ['defineRuleAlias', 'fence-single', 'self::punctuation',
                  'self::punctuation[@role="closefence"]'],
  ['defineRuleAlias', 'fence-single', 'self::punctuation',
                  'self::punctuation[@role="vbar"]'],
  ['defineRuleAlias', 'fence-single', 'self::punctuation',
                  'self::punctuation[@role="application"]'],

  ['Rule',
      'omit-empty', 'default.default',
      '[p] (pause:100)',
      'self::empty'],

  // Fences rules.
  ['Rule',
      'fences-open-close', 'default.default',
      '[p] (pause:100); [n] content/*[1]; ' +
      '[n] children/*[1]; [n] content/*[2]; [p] (pause:100)',
      'self::fenced', '@role="leftright"'],

  ['Rule',
      'fences-open-close-in-appl', 'default.default',
      '[p] (pause:200); [n] children/*[1]; [p] (pause:200);',
      'self::fenced[@role="leftright"]', './parent::children/parent::appl'],

  ['Rule',
      'fences-neutral', 'default.default',
      '[p] (pause:100); [t] "absolute value of"; [n] children/*[1];' +
      '[p] (pause:350);',
      'self::fenced', 'self::fenced[@role="neutral"]'],

  ['Rule',
      'omit-fences', 'default.default',
      '[p] (pause:500); [n] children/*[1]; [p] (pause:200);',
      'self::fenced'],

  // Matrix rules.
  ['Rule',
      'matrix', 'default.default',
      '[t] "matrix"; [m] children/* ' +
      '(ctxtFunc:CTXFnodeCounter,context:"row",pause:100)',
      'self::matrix'],

  ['Rule',
      'matrix-row', 'default.default',
      '[m] children/* (ctxtFunc:CTXFnodeCounter,context:"column",pause:100)',
      'self::row[@role="matrix"]'],

  ['Rule',
      'matrix-cell', 'default.default',
      '[n] children/*[1]', 'self::cell[@role="matrix"]'],

  // Vector rules.
  ['Rule',
      'vector', 'default.default',
      '[t] "vector"; [m] children/* ' +
      '(ctxtFunc:CTXFnodeCounter,context:"element",pause:100)',
      'self::vector'],

  // Cases rules.
  ['Rule',
      'cases', 'default.default',
      '[t] "case statement"; [m] children/* ' +
      '(ctxtFunc:CTXFnodeCounter,context:"case",pause:100)',
      'self::cases'],

  ['Rule',
      'cases-row', 'default.default',
      '[m] children/*', 'self::row[@role="cases"]'],

  ['Rule',
      'cases-cell', 'default.default',
      '[n] children/*[1]', 'self::cell[@role="cases"]'],

  ['Rule',
      'row', 'default.default',
      '[m] ./* (ctxtFunc:CTXFnodeCounter,context:"column",pause:100)',
      'self::row'],

  ['Rule',
      'cases-end', 'default.default',
      '[t] "case statement"; ' +
      '[m] children/* (ctxtFunc:CTXFnodeCounter,context:"case",pause:100);' +
      '[t] "end cases"',
      'self::cases', 'following-sibling::*'],

  // Multiline rules.
  ['Rule',
      'multiline', 'default.default',
      '[t] "multiline equation";' +
      '[m] children/* (ctxtFunc:CTXFnodeCounter,context:"line",pause:100)',
      'self::multiline'],

  ['Rule',
      'multiline-ineq', 'default.default',
      '[t] "multiline inequality";' +
      '[m] children/* (ctxtFunc:CTXFnodeCounter,context:"row",pause:100)',
      'self::multiline', '@role="inequality"'],

  ['Rule',
      'line', 'default.default',
      '[m] children/*', 'self::line'],

  // Table rules.
  ['Rule',
      'table', 'default.default',
      '[t] "multiline equation";' +
      '[m] children/* (ctxtFunc:CTXFnodeCounter,context:"row",pause:200)',
      'self::table'],

  ['Rule',
      'table-ineq', 'default.default',
      '[t] "multiline inequality";' +
      '[m] children/* (ctxtFunc:CTXFnodeCounter,context:"row",pause:200)',
      'self::table', '@role="inequality"'],

  ['Rule',
      'table-row', 'default.default',
      '[m] children/* (pause:100)', 'self::row[@role="table"]'],

  ['defineRuleAlias',
      'cases-cell', 'self::cell[@role="table"]'],

  ['Rule',
      'empty-cell', 'default.default',
      '[t] "Blank"', 'self::cell', 'count(children/*)=0'],

  // Rules for punctuated expressions.
  ['Rule',
      'end-punct', 'default.default',
      '[m] children/*; [p] (pause:300)',
      'self::punctuated', '@role="endpunct"'],

  ['Rule',
      'start-punct', 'default.default',
      '[n] content/*[1]; [p] (pause:200); [m] children/*[position()>1]',
      'self::punctuated', '@role="startpunct"'],

  ['Rule',
      'integral-punct', 'default.default',
      '[n] children/*[1] (rate:0.2); [n] children/*[3] (rate:0.2)',
      'self::punctuated', '@role="integral"'],

  ['Rule',
      'punctuated', 'default.default',
      '[m] children/* (pause:100)',
      'self::punctuated'],

  // Function rules
  ['Rule',
      'function', 'default.default',
      '[n] text()', 'self::function'],

  ['Rule',
      'appl', 'default.default',
      '[n] children/*[1]; [n] content/*[1]; [n] children/*[2]', 'self::appl'],

  // Limit operator rules
  ['Rule',
      'sum-only', 'default.default',
      '[n] children/*[1]; [t] "from"; [n] children/*[2]; [t] "to";' +
      '[n] children/*[3]', 'self::limboth', 'self::limboth[@role="sum"]'],

  ['Rule',
      'limboth', 'default.default',
      '[n] children/*[1]; [p] (pause 100); [t] "over"; [n] children/*[2];' +
      '[t] "under"; [n] children/*[3]; [p] (pause 250);',
      'self::limboth'],

  ['Rule',
      'limlower', 'default.default',
      '[n] children/*[1]; [t] "over"; [n] children/*[2];', 'self::limlower'],

  ['Rule',
      'limupper', 'default.default',
      '[n] children/*[1]; [t] "under"; [n] children/*[2];', 'self::limupper'],

  // Bigoperator rules
  ['Rule',
      'largeop', 'default.default',
      '[n] text()', 'self::largeop'],

  ['Rule',
      'bigop', 'default.default',
      '[n] children/*[1]; [p] (pause 100); [t] "over"; [n] children/*[2];' +
      '[p] (pause 250);',
      'self::bigop'],


  // Integral rules
  ['Rule',
      'integral', 'default.default',
      '[n] children/*[1]; [p] (pause 100); [n] children/*[2];' +
      '[p] (pause 200); [n] children/*[3] (rate:0.35);', 'self::integral'],


  ['Rule',
      'sqrt', 'default.default',
      '[t] "Square root of"; [n] children/*[1] (rate:0.35); [p] (pause:400)',
      'self::sqrt'],

  ['Rule',
      'square', 'default.default',
      '[n] children/*[1]; [t] "squared" (pitch:0.35); [p] (pause:300)',
      'self::superscript', 'children/*[2][text()=2]',
      'name(./children/*[1])!="text"'],

  ['Rule',
      'cube', 'default.default',
      '[n] children/*[1]; [t] "cubed" (pitch:0.35); [p] (pause:300)',
      'self::superscript', 'children/*[2][text()=3]',
      'name(./children/*[1])!="text"'],

  ['Rule',
      'root', 'default.default',
      '[t] "root of order"; [n] children/*[1];' +
          '[t] "over"; [n] children/*[2] (rate:0.35); [p] (pause:400)',
      'self::root'],

  ['Rule',
      'text', 'default.default',
      '[n] text(); [p] (pause:200)',
      'self::text'],

  ['Rule',
      'unit', 'default.default',
      '[t] text() (grammar:annotation="unit":translate:plural)',
      'self::identifier', '@role="unit"'],
  ['Rule',
      'unit-square', 'default.default',
      '[t] "square"; [n] children/*[1]',
      'self::superscript', '@role="unit"', 'children/*[2][text()=2]',
      'name(children/*[1])="identifier"'],

  ['Rule',
      'unit-cubic', 'default.default',
      '[t] "cubic"; [n] children/*[1]',
      'self::superscript', '@role="unit"', 'children/*[2][text()=3]',
      'name(children/*[1])="identifier"'],
  ['Rule',
      'reciprocal', 'default.default',
      '[t] "reciprocal"; [n] children/*[1]',
      'self::superscript', '@role="unit"', 'name(children/*[1])="identifier"',
      'name(children/*[2])="prefixop"', 'children/*[2][@role="negative"]',
      'children/*[2]/children/*[1][text()=1]',
      'count(preceding-sibling::*)=0 or preceding-sibling::*[@role!="unit"]'],
  ['Rule',
      'reciprocal', 'default.default',
      '[t] "per"; [n] children/*[1]',
      'self::superscript', '@role="unit"', 'name(children/*[1])="identifier"',
      'name(children/*[2])="prefixop"', 'children/*[2][@role="negative"]',
      'children/*[2]/children/*[1][text()=1]',
      'preceding-sibling::*[@role="unit"]'],
  ['Rule',
      'unit-combine', 'default.default',
      '[m] children/*', 'self::infixop', '@role="unit"'],
  ['Rule',
      'unit-divide', 'default.default',
      '[n] children/*[1] (pitch:0.3); [t] "per";' +
      ' [n] children/*[2] (pitch:-0.3)',
   'self::fraction', '@role="unit"']
  ]
};

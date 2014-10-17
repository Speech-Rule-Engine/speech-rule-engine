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

goog.require('sre.MathStore');
goog.require('sre.MathmlStore');
goog.require('sre.MathmlStoreUtil');
goog.require('sre.StoreUtil');



/**
 * Rule initialization.
 * @constructor
 */
sre.SemanticTreeRules = function() {
  sre.SemanticTreeRules.initCustomFunctions_();
  sre.SemanticTreeRules.initSemanticRules_();
};
goog.addSingletonGetter(sre.SemanticTreeRules);


/**
 * @type {sre.MathStore}
 */
sre.SemanticTreeRules.mathStore = sre.MathmlStore.getInstance();


/** @private */
sre.SemanticTreeRules.defineRule_ = goog.bind(
    sre.SemanticTreeRules.mathStore.defineRule,
    sre.SemanticTreeRules.mathStore);


/** @private */
sre.SemanticTreeRules.defineRuleAlias_ = goog.bind(
    sre.SemanticTreeRules.mathStore.defineRuleAlias,
    sre.SemanticTreeRules.mathStore);


/** @private */
sre.SemanticTreeRules.addContextFunction_ = goog.bind(
    sre.SemanticTreeRules.mathStore.contextFunctions.add,
    sre.SemanticTreeRules.mathStore.contextFunctions);


/** @private */
sre.SemanticTreeRules.addCustomQuery_ = goog.bind(
    sre.SemanticTreeRules.mathStore.customQueries.add,
    sre.SemanticTreeRules.mathStore.customQueries);


/** @private */
sre.SemanticTreeRules.addCustomString_ = goog.bind(
    sre.SemanticTreeRules.mathStore.customStrings.add,
    sre.SemanticTreeRules.mathStore.customStrings);


goog.scope(function() {
var defineRule = sre.SemanticTreeRules.defineRule_;
var defineRuleAlias = sre.SemanticTreeRules.defineRuleAlias_;

var addCQF = sre.SemanticTreeRules.addCustomQuery_;
var addCSF = sre.SemanticTreeRules.addCustomString_;
var addCTXF = sre.SemanticTreeRules.addContextFunction_;


/**
 * Initialize the custom functions.
 * @private
 */
sre.SemanticTreeRules.initCustomFunctions_ = function() {
  addCTXF('CTXFnodeCounter', sre.StoreUtil.nodeCounter);
  addCTXF('CTXFcontentIterator', sre.MathmlStoreUtil.contentIterator);

  addCQF('CQFhideFont', sre.MathmlStoreUtil.hideFont);
  addCSF('CSFshowFont', sre.MathmlStoreUtil.showFont);
};


/**
 * Semantic rules.
 * @private
*/
sre.SemanticTreeRules.initSemanticRules_ = function() {
  // Initial rule
  defineRule(
      'stree', 'default.default',
      '[n] ./*[1]', 'self::stree');

  defineRule(
      'multrel', 'default.default',
      '[t] "multirelation"; [m] children/* (sepFunc:CTXFcontentIterator)',
      'self::multirel');

  defineRule(
      'variable-equality', 'default.default',
      '[t] "equation sequence"; [m] ./children/* ' +
          '(context:"part",ctxtFunc:CTXFnodeCounter,separator:./text())',
      'self::relseq[@role="equality"]', 'count(./children/*)>2',
      './children/punct[@role="ellipsis"]');// Make that better!

  defineRule(
      'multi-equality', 'default.default',
      '[t] "equation sequence"; [m] ./children/* ' +
          '(context:"part",ctxtFunc:CTXFnodeCounter,separator:./text())',
      'self::relseq[@role="equality"]', 'count(./children/*)>2');

  defineRule(
      'multi-equality', 'default.short',
      '[t] "equation sequence"; [m] ./children/* ' +
          '(separator:./text())',
      'self::relseq[@role="equality"]', 'count(./children/*)>2');

  defineRule(
      'equality', 'default.default',
      '[t] "equation"; [t] "left hand side"; [n] children/*[1];' +
          '[p] (pause:200); [n] text() (pause:200);' +
          '[t] "right hand side"; [n] children/*[2]',
      'self::relseq[@role="equality"]', 'count(./children/*)=2');

  defineRule(
      'simple-equality', 'default.default',
      '[n] children/*[1]; [p] (pause:200); [n] text() (pause:200);' +
          '[n] children/*[2]',
      'self::relseq[@role="equality"]', 'count(./children/*)=2',
      './children/identifier or ./children/number');

  defineRule(
      'simple-equality2', 'default.default',
      '[n] children/*[1]; [p] (pause:200); [n] text() (pause:200);' +
          '[n] children/*[2]',
      'self::relseq[@role="equality"]', 'count(./children/*)=2',
      './children/function or ./children/appl');

  defineRule(
      'relseq', 'default.default',
      '[m] children/* (separator:./text())',
      'self::relseq');

  defineRule(
      'binary-operation', 'default.default',
      '[m] children/* (separator:text());',
      'self::infixop');

  defineRule(
      'variable-addition', 'default.default',
      '[t] "sum with variable number of summands";' +
          '[p] (pause:400); [m] children/* (separator:./text())',
      'self::infixop[@role="addition"]', 'count(children/*)>2',
      'children/punct[@role="ellipsis"]');// Make that better!

  defineRule(
      'multi-addition', 'default.default',
      '[t] "sum with,"; [t] count(./children/*); [t] ", summands";' +
          '[p] (pause:400); [m] ./children/* (separator:./text())',
      'self::infixop[@role="addition"]', 'count(./children/*)>2');

  // Prefix Operator
  defineRule(
      'prefix', 'default.default',
      '[t] "prefix"; [n] text(); [t] "of" (pause 150);' +
      '[n] children/*[1]',
      'self::prefixop');

  defineRule(
      'negative', 'default.default',
      '[t] "negative"; [n] children/*[1]',
      'self::prefixop', 'self::prefixop[@role="negative"]');

  // Postfix Operator
  defineRule(
      'postfix', 'default.default',
      '[n] children/*[1]; [t] "postfix"; [n] text() (pause 300)',
      'self::postfixop');

  defineRule(
      'identifier', 'default.default',
      '[n] text()', 'self::identifier');

  defineRule(
      'number', 'default.default',
      '[n] text()', 'self::number');

  defineRule(
      'font', 'default.default',
      '[t] @font; [n] CQFhideFont; [t] CSFshowFont',
      'self::*', '@font', '@font!="normal"');

  defineRule(
      'fraction', 'default.default',
      '[p] (pause:250); [n] children/*[1] (pitch:0.3); [p] (pause:250);' +
          ' [t] "divided by"; [n] children/*[2] (pitch:-0.3); [p] (pause:400)',
      'self::fraction');

  defineRule(
      'superscript', 'default.default',
      '[n] children/*[1]; [t] "super"; [n] children/*[2] (pitch:0.35);' +
      '[p] (pause:300)',
      'self::superscript');
  defineRule(
      'subscript', 'default.default',
      '[n] children/*[1]; [t] "sub"; [n] children/*[2] (pitch:-0.35);' +
      '[p] (pause:300)',
      'self::subscript');

  defineRule(
      'ellipsis', 'default.default',
      '[p] (pause:200); [t] "dot dot dot"; [p] (pause:300)',
      'self::punct', 'self::punct[@role="ellipsis"]');

  defineRule(
      'fence-single', 'default.default',
      '[n] text()',
      'self::punct', 'self::punct[@role="openfence"]');
  defineRuleAlias('fence-single', 'self::punct',
                  'self::punct[@role="closefence"]');
  defineRuleAlias('fence-single', 'self::punct',
                  'self::punct[@role="vbar"]');
  defineRuleAlias('fence-single', 'self::punct',
                  'self::punct[@role="application"]');

  // TODO (sorge) Refine punctuations further.
  defineRule(
      'omit-punct', 'default.default',
      '[p] (pause:200);',
      'self::punct');

  defineRule(
      'omit-empty', 'default.default',
      '',
      'self::empty');

  // Fences rules.
  defineRule(
      'fences-open-close', 'default.default',
      '[p] (pause:100); [t] "open"; [n] children/*[1]; [p] (pause:200);' +
      '[t] "close"',
      'self::fenced', '@role="leftright"');

  defineRule(
      'fences-open-close-in-appl', 'default.default',
      '[p] (pause:100); [n] children/*[1]; [p] (pause:200);',
      'self::fenced[@role="leftright"]', './parent::children/parent::appl');

  defineRule(
      'fences-neutral', 'default.default',
      '[p] (pause:100); [t] "absolute value of"; [n] children/*[1];' +
      '[p] (pause:350);',
      'self::fenced', 'self::fenced[@role="neutral"]');

  defineRule(
      'omit-fences', 'default.default',
      '[p] (pause:500); [n] children/*[1]; [p] (pause:200);',
      'self::fenced');

  // Matrix rules.
  defineRule(
      'matrix', 'default.default',
      '[t] "matrix"; [m] children/* ' +
      '(ctxtFunc:CTXFnodeCounter,context:"row",pause:100)',
      'self::matrix');

  defineRule(
      'matrix-row', 'default.default',
      '[m] children/* (ctxtFunc:CTXFnodeCounter,context:"column",pause:100)',
      'self::row[@role="matrix"]');

  defineRule(
      'matrix-cell', 'default.default',
      '[n] children/*[1]', 'self::cell[@role="matrix"]');

  // Vector rules.
  defineRule(
      'vector', 'default.default',
      '[t] "vector"; [m] children/* ' +
      '(ctxtFunc:CTXFnodeCounter,context:"element",pause:100)',
      'self::vector');

  // Cases rules.
  defineRule(
      'cases', 'default.default',
      '[t] "case statement"; [m] children/* ' +
      '(ctxtFunc:CTXFnodeCounter,context:"case",pause:100)',
      'self::cases');

  defineRule(
      'cases-row', 'default.default',
      '[m] children/*', 'self::row[@role="cases"]');

  defineRule(
      'cases-cell', 'default.default',
      '[n] children/*[1]', 'self::cell[@role="cases"]');

  defineRule(
      'row', 'default.default',
      '[m] ./* (ctxtFunc:CTXFnodeCounter,context:"column",pause:100)',
      'self::row');

  defineRule(
      'cases-end', 'default.default',
      '[t] "case statement"; ' +
      '[m] children/* (ctxtFunc:CTXFnodeCounter,context:"case",pause:100);' +
      '[t] "end cases"',
      'self::cases', 'following-sibling::*');

  // Multiline rules.
  defineRule(
      'multiline', 'default.default',
      '[t] "multiline equation";' +
      '[m] children/* (ctxtFunc:CTXFnodeCounter,context:"line",pause:100)',
      'self::multiline');

  defineRule(
      'line', 'default.default',
      '[m] children/*', 'self::line');

  // Table rules.
  defineRule(
      'table', 'default.default',
      '[t] "multiline equation";' +
      '[m] children/* (ctxtFunc:CTXFnodeCounter,context:"row",pause:200)',
      'self::table');

  defineRule(
      'table-row', 'default.default',
      '[m] children/* (pause:100)', 'self::row[@role="table"]');

  defineRuleAlias(
      'cases-cell', 'self::cell[@role="table"]');


  // Rules for punctuated expressions.
  defineRule(
      'end-punct', 'default.default',
      '[m] children/*; [p] (pause:300)',
      'self::punctuated', '@role="endpunct"');

  defineRule(
      'start-punct', 'default.default',
      '[n] content/*[1]; [p] (pause:200); [m] children/*',
      'self::punctuated', '@role="startpunct"');

  defineRule(
      'integral-punct', 'default.default',
      '[n] children/*[1] (rate:0.2); [n] children/*[3] (rate:0.2)',
      'self::punctuated', '@role="integral"');

  defineRule(
      'punctuated', 'default.default',
      '[m] children/* (pause:100)',
      'self::punctuated');

  // Function rules
  defineRule(
      'function', 'default.default',
      '[n] text()', 'self::function');

  defineRule(
      'appl', 'default.default',
      '[n] children/*[1]; [n] content/*[1]; [n] children/*[2]', 'self::appl');

  // Limit operator rules
  defineRule(
      'sum-only', 'default.default',
      '[n] children/*[1]; [t] "from"; [n] children/*[2]; [t] "to";' +
      '[n] children/*[3]', 'self::limboth', 'self::limboth[@role="sum"]');

  defineRule(
      'limboth', 'default.default',
      '[n] children/*[1]; [p] (pause 100); [t] "over"; [n] children/*[2];' +
      '[t] "under"; [n] children/*[3]; [p] (pause 250);',
      'self::limboth');

  defineRule(
      'limlower', 'default.default',
      '[n] children/*[1]; [t] "over"; [n] children/*[2];', 'self::limlower');

  defineRule(
      'limupper', 'default.default',
      '[n] children/*[1]; [t] "under"; [n] children/*[2];', 'self::limupper');

  // Bigoperator rules
  defineRule(
      'largeop', 'default.default',
      '[n] text()', 'self::largeop');

  defineRule(
      'bigop', 'default.default',
      '[n] children/*[1]; [p] (pause 100); [t] "over"; [n] children/*[2];' +
      '[p] (pause 250);',
      'self::bigop');


  // Integral rules
  defineRule(
      'integral', 'default.default',
      '[n] children/*[1]; [p] (pause 100); [n] children/*[2];' +
      '[p] (pause 200); [n] children/*[3] (rate:0.35);', 'self::integral');


  defineRule(
      'sqrt', 'default.default',
      '[t] "Square root of"; [n] children/*[1] (rate:0.2); [p] (pause:400)',
      'self::sqrt');

  defineRule(
      'square', 'default.default',
      '[n] children/*[1]; [t] "squared" (pitch:0.35); [p] (pause:300)',
      'self::superscript', 'children/*[2][text()=2]',
      'name(./children/*[1])!="text"');

  defineRule(
      'cube', 'default.default',
      '[n] children/*[1]; [t] "cubed" (pitch:0.35); [p] (pause:300)',
      'self::superscript', 'children/*[2][text()=3]',
      'name(./children/*[1])!="text"');

  defineRule(
      'root', 'default.default',
      '[t] "root of order"; [n] children/*[1];' +
          '[t] "over"; [n] children/*[1] (rate:0.2); [p] (pause:400)',
      'self::root');

  // TODO (sorge) This is probably unnecessary now!
  defineRule(
      'text-no-mult', 'default.default',
      '[n] children/*[1]; [p] (pause:200); [n] children/*[2]',
      'self::infixop', 'children/text');

  defineRule(
      'text', 'default.default',
      '[n] text(); [p] (pause:200)',
      'self::text');

  defineRule(
      'unit', 'default.default',
      '[n] text() (annotation:unit)', 'self::identifier', '@role="unit"');

};

});  // goog.scope

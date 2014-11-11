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
 * @fileoverview Speech rules for mathml and mathjax nodes.
 * @author sorge@google.com (Volker Sorge)
 */

goog.provide('sre.MathmlStoreRules');

goog.require('sre.MathStore');
goog.require('sre.MathmlStore');
goog.require('sre.MathmlStoreUtil');
goog.require('sre.StoreUtil');



/**
 * Rule initialization.
 * @constructor
 */
sre.MathmlStoreRules = function() {
  // Custom functions used in the rules.
  sre.MathmlStoreRules.initCustomFunctions_();
  sre.MathmlStoreRules.initDefaultRules_(); // MathML rules.
  sre.MathmlStoreRules.initMathjaxRules_(); // MathJax Rules
  sre.MathmlStoreRules.initAliases_(); // MathJax Aliases for MathML rules.
  sre.MathmlStoreRules.initSpecializationRules_(); // Square, cube, etc.
};
goog.addSingletonGetter(sre.MathmlStoreRules);


/**
 * @type {sre.MathStore}
 */
sre.MathmlStoreRules.mathStore = sre.MathmlStore.getInstance();


// These are used to work around Closure's rules for aliasing.
/** @private */
sre.MathmlStoreRules.defineDefaultMathmlRule_ = goog.bind(
    sre.MathmlStoreRules.mathStore.defineDefaultMathmlRule,
    sre.MathmlStoreRules.mathStore);


/** @private */
sre.MathmlStoreRules.defineRule_ = goog.bind(
    sre.MathmlStoreRules.mathStore.defineRule,
    sre.MathmlStoreRules.mathStore);


/** @private */
sre.MathmlStoreRules.defineRuleAlias_ = goog.bind(
    sre.MathmlStoreRules.mathStore.defineRuleAlias,
    sre.MathmlStoreRules.mathStore);


/** @private */
sre.MathmlStoreRules.addContextFunction_ = goog.bind(
    sre.MathmlStoreRules.mathStore.contextFunctions.add,
    sre.MathmlStoreRules.mathStore.contextFunctions);


/** @private */
sre.MathmlStoreRules.addCustomQuery_ = goog.bind(
    sre.MathmlStoreRules.mathStore.customQueries.add,
    sre.MathmlStoreRules.mathStore.customQueries);

goog.scope(function() {
var defineDefaultMathmlRule = sre.MathmlStoreRules.defineDefaultMathmlRule_;
var defineRule = sre.MathmlStoreRules.defineRule_;
var defineRuleAlias = sre.MathmlStoreRules.defineRuleAlias_;

var addCTXF = sre.MathmlStoreRules.addContextFunction_;
var addCQF = sre.MathmlStoreRules.addCustomQuery_;


/**
 * Initialize the custom functions.
 * @private
 */
sre.MathmlStoreRules.initCustomFunctions_ = function() {
  addCTXF('CTXFnodeCounter', sre.StoreUtil.nodeCounter);
  addCTXF('CTXFmfSeparators', sre.MathmlStoreUtil.mfencedSeparators);

  addCQF('CQFextender', sre.MathmlStoreUtil.retrieveMathjaxExtender);
  addCQF('CQFmathmlmunder', sre.MathmlStoreUtil.checkMathjaxMunder);
  addCQF('CQFmathmlmover', sre.MathmlStoreUtil.checkMathjaxMover);
  addCQF('CQFmathmlmsub', sre.MathmlStoreUtil.checkMathjaxMsub);
  addCQF('CQFmathmlmsup', sre.MathmlStoreUtil.checkMathjaxMsup);
  addCQF('CQFlookupleaf', sre.MathmlStoreUtil.retrieveMathjaxLeaf);

};


/**
 * Initialize the default mathrules.
 * @private
 */
sre.MathmlStoreRules.initDefaultRules_ = function() {
  // Initial rule
  defineDefaultMathmlRule('math', '[m] ./*');
  defineDefaultMathmlRule('semantics', '[n] ./*[1]');

  // Space elements
  defineDefaultMathmlRule('mspace', '[p] (pause:250)');
  defineDefaultMathmlRule('mstyle', '[m] ./*');
  defineDefaultMathmlRule('mpadded', '[m] ./*');
  defineDefaultMathmlRule('merror', '[m] ./*');
  defineDefaultMathmlRule('mphantom', '[m] ./*');

  // Token elements.
  defineDefaultMathmlRule('mtext', '[t] text(); [p] (pause:200)');
  defineDefaultMathmlRule('mi', '[n] text()');
  defineDefaultMathmlRule('mo', '[n] text() (rate:-0.1)');
  defineDefaultMathmlRule('mn', '[n] text()');

  // Dealing with fonts.
  defineRule('mtext-variant', 'default.default',
      '[t] "begin"; [t] @mathvariant (pause:150);' +
          '[t] text() (pause:150); [t] "end"; ' +
          '[t] @mathvariant (pause:200)',
      'self::mathml:mtext', '@mathvariant', '@mathvariant!="normal"');

  defineRule('mi-variant', 'default.default',
      '[t] @mathvariant; [n] text()',
      'self::mathml:mi', '@mathvariant', '@mathvariant!="normal"');

  defineRuleAlias('mi-variant', 'self::mathml:mn',  // mn
      '@mathvariant', '@mathvariant!="normal"');

  defineRule('mo-variant', 'default.default',
      '[t] @mathvariant; [n] text() (rate:-0.1)',
      'self::mathml:mo', '@mathvariant', '@mathvariant!="normal"');

  defineDefaultMathmlRule(
      'ms',
      '[t] "string" (pitch:0.5, rate:0.5); [t] text()');

  defineRule('unit', 'default.default',
      '[t] text() (annotation:unit, preprocess)',
      'self::mathml:mi', '@class="MathML-Unit"');

  // Script elements.
  defineDefaultMathmlRule(
      'msup', '[n] ./*[1]; [t] "super";' +
          '[n] ./*[2] (pitch:0.35); [p] (pause:300)');
  defineDefaultMathmlRule(
      'msubsup',
      '[n] ./*[1]; [t] "sub"; [n] ./*[2] (pitch:-0.35); [p] (pause:200);' +
          '[t] "super"; [n] ./*[3] (pitch:0.35); [p] (pause:300)'
  );
  defineDefaultMathmlRule(
      'msub',
      '[n] ./*[1]; [t] "sub"; [n] ./*[2] (pitch:-0.35); [p] (pause:300)');
  defineDefaultMathmlRule(
      'mover', '[n] ./*[2] (pitch:0.35); [p] (pause:200);' +
          ' [t] "over"; [n] ./*[1]; [p] (pause:400)');
  defineDefaultMathmlRule(
      'munder',
      '[n] ./*[2] (pitch:-0.35); [t] "under"; [n] ./*[1]; [p] (pause:400)');
  defineDefaultMathmlRule(
      'munderover',
      '[n] ./*[2] (pitch:-0.35); [t] "under and"; [n] ./*[3] (pitch:0.35);' +
          ' [t] "over"; [n] ./*[1]; [p] (pause:400)');

  // Layout elements.
  defineDefaultMathmlRule('mrow', '[m] ./*');
  defineDefaultMathmlRule(
      'msqrt', '[t] "Square root of"; [m] ./* (rate:0.2); [p] (pause:400)');
  defineDefaultMathmlRule(
      'mroot', '[t] "root of order"; [n] ./*[2]; [t] "of";' +
          '[n] ./*[1] (rate:0.2); [p] (pause:400)');
  defineDefaultMathmlRule(
      'mfrac', ' [p] (pause:400); [n] ./*[1] (pitch:0.3);' +
          ' [t] "divided by"; [n] ./*[2] (pitch:-0.3); [p] (pause:400)');
  defineRule(
      'mfrac', 'default.short', '[p] (pause:200); [t] "start frac";' +
          '[n] ./*[1] (pitch:0.3); [t] "over"; ' +
          '[n] ./*[2] (pitch:-0.3); [p] (pause:400); [t] "end frac"',
      'self::mathml:mfrac');

  // TODO (sorge) Consider problem with open and close spaces. Maybe use Xpath
  //     translate transform spaces into empty.
  defineRule(
      'mfenced-single', 'default.default',
      '[t] concat(substring(@open, 0 div boolean(@open)), ' +
          'substring("(", 0 div not(boolean(@open)))) (context:"opening"); ' +
          '[m] ./* (separator:@separators); ' +
          '[t] concat(substring(@close, 0 div boolean(@close)), ' +
          'substring(")", 0 div not(boolean(@close)))) (context:"closing")',
      'self::mathml:mfenced', 'string-length(string(@separators))=1');

  defineRule(
      'mfenced-omit', 'default.default',
      '[t] concat(substring(@open, 0 div boolean(@open)), ' +
          'substring("(", 0 div not(boolean(@open)))) (context:"opening"); ' +
          '[m] ./*; ' +
          '[t] concat(substring(@close, 0 div boolean(@close)), ' +
          'substring(")", 0 div not(boolean(@close)))) (context:"closing")',
      'self::mathml:mfenced', '@separators',
      'string-length(string(@separators))=0', 'string(@separators)=""');

  defineRule(
      'mfenced-empty', 'default.default',
      '[t] concat(substring(@open, 0 div boolean(@open)), ' +
          'substring("(", 0 div not(boolean(@open)))) (context:"opening"); ' +
          '[m] ./*;' +
          '[t] concat(substring(@close, 0 div boolean(@close)), ' +
          'substring(")", 0 div not(boolean(@close)))) (context:"closing")',
      'self::mathml:mfenced', 'string-length(string(@separators))=1',
      'string(@separators)=" "');

  defineRule(
      'mfenced-comma', 'default.default',
      '[t] concat(substring(@open, 0 div boolean(@open)), ' +
          'substring("(", 0 div not(boolean(@open)))) (context:"opening"); ' +
          '[m] ./* (separator:"comma");' +
          '[t] concat(substring(@close, 0 div boolean(@close)), ' +
          'substring(")", 0 div not(boolean(@close)))) (context:"closing")',
      'self::mathml:mfenced');

  defineRule(
      'mfenced-multi', 'default.default',
      '[t] concat(substring(@open, 0 div boolean(@open)), ' +
          'substring("(", 0 div not(boolean(@open)))) (context:"opening"); ' +
          '[m] ./* (sepFunc:CTXFmfSeparators, separator:@separators); ' +
          '[t] concat(substring(@close, 0 div boolean(@close)), ' +
          'substring(")", 0 div not(boolean(@close)))) (context:"closing")',
      'self::mathml:mfenced', 'string-length(string(@separators))>1');

  // Mtable rules.
  defineRule(
      'mtable', 'default.default',
      '[t] "matrix"; [m] ./* (ctxtFunc:CTXFnodeCounter,' +
          'context:"row",pause:100)',
      'self::mathml:mtable');

  defineRule(
      'mtr', 'default.default',
      '[m] ./* (ctxtFunc:CTXFnodeCounter,context:"column",pause:100)',
      'self::mathml:mtr');

  defineRule(
      'mtd', 'default.default',
      '[m] ./*', 'self::mathml:mtd');

  // Mtable superbrief rules.
  defineRule(
      'mtable', 'default.superbrief',
      '[t] count(child::mathml:mtr);  [t] "by";' +
          '[t] count(child::mathml:mtr[1]/mathml:mtd); [t] "matrix";',
      'self::mathml:mtable');

  // Mtable short rules.
  defineRule(
      'mtable', 'default.short',
      '[t] "matrix"; [m] ./*',
      'self::mathml:mtable');

  defineRule(
      'mtr', 'default.short',
      '[m] ./*', 'self::mathml:mtr');

  defineRule(
      'mtd', 'default.short',
      '[t] "Element"; [t] count(./preceding-sibling::mathml:mtd)+1;' +
          '[t] count(./parent::mathml:mtr/preceding-sibling::mathml:mtr)+1;' +
              '[p] (pause:500); [m] ./*',
      'self::mathml:mtd');

  // Mmultiscripts rules.
  defineRule(
      'mmultiscripts-4', 'default.default',
      '[n] ./*[1]; [p] (pause:200);' +
      '[t] "left sub"; [n] ./*[5] (pitch:-0.35); [p] (pause:200);' +
      '[t] "left super"; [n] ./*[6] (pitch:0.35); [p] (pause:200);' +
      '[t] "right sub"; [n] ./*[2] (pitch:-0.35); [p] (pause:200);' +
      '[t] "right super"; [n] ./*[3] (pitch:0.35); [p] (pause:300);',
      'self::mathml:mmultiscripts');
  defineRule(
      'mmultiscripts-3-1', 'default.default',
      '[n] ./*[1]; [p] (pause:200);' +
      '[t] "left sub"; [n] ./*[5] (pitch:-0.35); [p] (pause:200);' +
      '[t] "left super"; [n] ./*[6] (pitch:0.35); [p] (pause:200);' +
      '[t] "right super"; [n] ./*[3] (pitch:0.35); [p] (pause:300);',
      'self::mathml:mmultiscripts', './mathml:none=./*[2]',
      './mathml:mprescripts=./*[4]');
  defineRule(
      'mmultiscripts-3-2', 'default.default',
      '[n] ./*[1]; [p] (pause:200);' +
      '[t] "left sub"; [n] ./*[5] (pitch:-0.35); [p] (pause:200);' +
      '[t] "left super"; [n] ./*[6] (pitch:0.35); [p] (pause:200);' +
      '[t] "right sub"; [n] ./*[2] (pitch:-0.35); [p] (pause:200);',
      'self::mathml:mmultiscripts', './mathml:none=./*[3]',
      './mathml:mprescripts=./*[4]');
  defineRule(
      'mmultiscripts-3-3', 'default.default',
      '[n] ./*[1]; [p] (pause:200);' +
      '[t] "left super"; [n] ./*[6] (pitch:0.35); [p] (pause:200);' +
      '[t] "right sub"; [n] ./*[2] (pitch:-0.35); [p] (pause:200);' +
      '[t] "right super"; [n] ./*[3] (pitch:0.35); [p] (pause:300);',
      'self::mathml:mmultiscripts', './mathml:none=./*[5]',
      './mathml:mprescripts=./*[4]');
  defineRule(
      'mmultiscripts-3-4', 'default.default',
      '[n] ./*[1]; [p] (pause:200);' +
      '[t] "left sub"; [n] ./*[5] (pitch:-0.35); [p] (pause:200);' +
      '[t] "right sub"; [n] ./*[2] (pitch:-0.35); [p] (pause:200);' +
      '[t] "right super"; [n] ./*[3] (pitch:0.35); [p] (pause:300);',
      'self::mathml:mmultiscripts', './mathml:none=./*[6]',
      './mathml:mprescripts=./*[4]');
  defineRule(
      'mmultiscripts-2-1', 'default.default',
      '[n] ./*[1]; [p] (pause:200);' +
      '[t] "left sub"; [n] ./*[5] (pitch:-0.35); [p] (pause:200);' +
      '[t] "left super"; [n] ./*[6] (pitch:0.35); [p] (pause:300);',
      'self::mathml:mmultiscripts', './mathml:none=./*[2]',
      './mathml:none=./*[3]', './mathml:mprescripts=./*[4]');
  defineRule(
      'mmultiscripts-1-1', 'default.default',
      '[n] ./*[1]; [p] (pause:200);' +
      '[t] "left super"; [n] ./*[6] (pitch:0.35); [p] (pause:300);',
      'self::mathml:mmultiscripts', './mathml:none=./*[2]',
      './mathml:none=./*[3]', './mathml:mprescripts=./*[4]',
      './mathml:none=./*[5]');
  defineRule(
      'mmultiscripts-1-2', 'default.default',
      '[n] ./*[1]; [p] (pause:200);' +
      '[t] "left sub"; [n] ./*[5] (pitch:-0.35); [p] (pause:200);',
      'self::mathml:mmultiscripts', './mathml:none=./*[2]',
      './mathml:none=./*[3]', './mathml:mprescripts=./*[4]',
      './mathml:none=./*[6]');
};


/**
 * Initialize mathJax Rules
 * @private
 */
sre.MathmlStoreRules.initMathjaxRules_ = function() {
  // Initial rule
  defineRule('mj-math', 'default.default',
             '[n] ./*[1]/*[1]/*[1]', 'self::span[@class="math"]');

  // Token Elements
  defineRule(
      'mj-leaf', 'default.default',
      '[n] CQFlookupleaf', 'self::span[@class="mi"]');
  defineRuleAlias('mj-leaf', 'self::span[@class="mo"]');
  defineRuleAlias('mj-leaf', 'self::span[@class="mn"]');
  defineRuleAlias('mj-leaf', 'self::span[@class="mtext"]');
  defineRule(
      'mj-mo-ext', 'default.default',
      '[n] CQFextender', 'self::span[@class="mo"]',
      './*[1]/*[1]/text()', './*[1]/*[2]/text()');
  defineRule(
      'mj-texatom', 'default.default',
      '[n] ./*[1]', 'self::span[@class="texatom"]');

  // Script elements.
  defineRule(
      'mj-msubsup', 'default.default',
      '[n] ./*[1]/*[1]/*[1]; [t] "sub"; [n] ./*[1]/*[3]/*[1] (pitch:-0.35);' +
      '[p] (pause:200); [t] "super"; [n] ./*[1]/*[2]/*[1] (pitch:0.35);' +
      '[p] (pause:300)',
      'self::span[@class="msubsup"]');
  defineRule(
      'mj-msub', 'default.default',
      '[n] ./*[1]/*[1]/*[1]; [t] "sub";' +
          '[n] ./*[1]/*[2]/*[1] (pitch:-0.35); [p] (pause:300)',
      'self::span[@class="msub"]');
  defineRule(
      'mj-msup', 'default.default',
      '[n] ./*[1]/*[1]/*[1]; [t] "super";' +
          '[n] ./*[1]/*[2]/*[1] (pitch:0.35); [p] (pause:300)',
      'self::span[@class="msup"]');
  defineRule(
      'mj-munderover', 'default.default',
      '[n] ./*[1]/*[2]/*[1] (pitch:0.35); [t] "under and";' +
          '[n] ./*[1]/*[3]/*[1] (pitch:-0.35); [t] "over";' +
              '[n] ./*[1]/*[1]/*[1]; [p] (pause:400)',
      'self::span[@class="munderover"]');
  defineRule(
      'mj-munder', 'default.default',
      '[n] ./*[1]/*[2]/*[1] (pitch:0.35); [t] "under";' +
          '[n] ./*[1]/*[1]/*[1]; [p] (pause:400)',
      'self::span[@class="munder"]');
  defineRule(
      'mj-mover', 'default.default',
      '[n] ./*[1]/*[2]/*[1] (pitch:0.35); [t] "over";' +
          '[n] ./*[1]/*[1]/*[1]; [p] (pause:400)',
      'self::span[@class="mover"]');


  // Layout elements.
  defineRule(
      'mj-mfrac', 'default.default',
      '[p] (pause:250); [n] ./*[1]/*[1]/*[1] (pitch:0.3); [p] (pause:250);' +
          ' [t] "divided by"; [n] ./*[1]/*[2]/*[1] (pitch:-0.3);' +
              '[p] (pause:400)',
      'self::span[@class="mfrac"]');
  defineRule(
      'mj-msqrt', 'default.default',
      '[t] "Square root of";' +
          '[n] ./*[1]/*[1]/*[1] (rate:0.2); [p] (pause:400)',
      'self::span[@class="msqrt"]');
  defineRule(
      'mj-mroot', 'default.default',
      '[t] "root of order"; [n] ./*[1]/*[4]/*[1]; [t] "of";' +
          '[n] ./*[1]/*[1]/*[1] (rate:0.2); [p] (pause:400)',
      'self::span[@class="mroot"]');

  defineRule(
      'mj-mfenced', 'default.default',
      '[t] "opening"; [n] ./*[1]; ' +
          '[m] ./*[position()>1 and position()<last()];' +
              ' [t] "closing"; [n] ./*[last()]',
      'self::span[@class="mfenced"]');

  // Mtable short rules.
  defineRuleAlias('mj-leaf', 'self::span[@class="mtable"]');
  // Mmultiscripts rules.
  defineRuleAlias('mj-leaf', 'self::span[@class="mmultiscripts"]');
};


/**
 * Initialize mathJax Aliases
 * @private
 */
sre.MathmlStoreRules.initAliases_ = function() {
  // Space elements
  defineRuleAlias('mspace', 'self::span[@class="mspace"]');
  defineRuleAlias('mstyle', 'self::span[@class="mstyle"]');
  defineRuleAlias('mpadded', 'self::span[@class="mpadded"]');
  defineRuleAlias('merror', 'self::span[@class="merror"]');
  defineRuleAlias('mphantom', 'self::span[@class="mphantom"]');

  // Token elements.
  defineRuleAlias('ms', 'self::span[@class="ms"]');

  // Layout elements.
  defineRuleAlias('mrow', 'self::span[@class="mrow"]');

  // The following rules fix bugs in MathJax's LaTeX translation.
  defineRuleAlias(
      'mj-msub', 'self::span[@class="msubsup"]', 'CQFmathmlmsub');

  defineRuleAlias(
      'mj-msup', 'self::span[@class="msubsup"]', 'CQFmathmlmsup');

  defineRuleAlias(
      'mj-munder', 'self::span[@class="munderover"]', 'CQFmathmlmunder');

  defineRuleAlias(
      'mj-mover', 'self::span[@class="munderover"]', 'CQFmathmlmover');
};


/**
 * Initialize specializations wrt. content of nodes.
 * @private
 */
sre.MathmlStoreRules.initSpecializationRules_ = function() {
  // Some special nodes for square and cube.
  // MathML
  defineRule(
      'square', 'default.default',
      '[n] ./*[1]; [t] "square" (pitch:0.35); [p] (pause:300)',
      'self::mathml:msup', './*[2][text()=2]');
  defineRuleAlias(
      'square', 'self::mathml:msup',
      './mathml:mrow=./*[2]', 'count(./*[2]/*)=1', './*[2]/*[1][text()=2]');

  defineRule(
      'cube', 'default.default',
      '[n] ./*[1]; [t] "cube" (pitch:0.35); [p] (pause:300)',
      'self::mathml:msup', './*[2][text()=3]');
  defineRuleAlias(
      'cube', 'self::mathml:msup',
      './mathml:mrow=./*[2]', 'count(./*[2]/*)=1', './*[2]/*[1][text()=3]');

  defineRule(
      'square-sub', 'default.default',
      '[n] ./*[1]; [t] "sub"; [n] ./*[2] (pitch:-0.35);' +
          '[p] (pause:300); [t] "square" (pitch:0.35); [p] (pause:400)',
      'self::mathml:msubsup', './*[3][text()=2]');
  defineRuleAlias(
      'square-sub', 'self::mathml:msubsup',
      './mathml:mrow=./*[3]', 'count(./*[3]/*)=1', './*[3]/*[1][text()=2]');

  defineRule(
      'cube-sub', 'default.default',
      '[n] ./*[1]; [t] "sub"; [n] ./*[2] (pitch:-0.35);' +
          '[p] (pause:300); [t] "cube" (pitch:0.35); [p] (pause:400)',
      'self::mathml:msubsup', './*[3][text()=3]');
  defineRuleAlias(
      'cube-sub', 'self::mathml:msubsup',
      './mathml:mrow=./*[3]', 'count(./*[3]/*)=1', './*[3]/*[1][text()=3]');

  // MathJax
  defineRule(
      'mj-square', 'default.default',
      '[n] ./*[1]/*[1]/*[1]; [t] "square" (pitch:0.35); [p] (pause:300)',
      'self::span[@class="msup"]', './*[1]/*[2]/*[1][text()=2]');
  defineRuleAlias(
      'mj-square', 'self::span[@class="msup"]',
      './*[1]/*[2]/*[1]=./*[1]/*[2]/span[@class="mrow"]',
      'count(./*[1]/*[2]/*[1]/*)=1', './*[1]/*[2]/*[1]/*[1][text()=2]');
  defineRuleAlias(
      'mj-square', 'self::span[@class="msubsup"]', 'CQFmathmlmsup',
      './*[1]/*[2]/*[1][text()=2]');
  defineRuleAlias(
      'mj-square', 'self::span[@class="msubsup"]', 'CQFmathmlmsup',
      './*[1]/*[2]/*[1]=./*[1]/*[2]/span[@class="mrow"]',
      'count(./*[1]/*[2]/*[1]/*)=1', './*[1]/*[2]/*[1]/*[1][text()=2]');

  defineRule(
      'mj-cube', 'default.default',
      '[n] ./*[1]/*[1]/*[1]; [t] "cube" (pitch:0.35); [p] (pause:300)',
      'self::span[@class="msup"]', './*[1]/*[2]/*[1][text()=3]');
  defineRuleAlias(
      'mj-cube', 'self::span[@class="msup"]',
      './*[1]/*[2]/*[1]=./*[1]/*[2]/span[@class="mrow"]',
      'count(./*[1]/*[2]/*[1]/*)=1', './*[1]/*[2]/*[1]/*[1][text()=3]');
  defineRuleAlias(
      'mj-cube', 'self::span[@class="msubsup"]', 'CQFmathmlmsup',
      './*[1]/*[2]/*[1][text()=3]');
  defineRuleAlias(
      'mj-cube', 'self::span[@class="msubsup"]', 'CQFmathmlmsup',
      './*[1]/*[2]/*[1]=./*[1]/*[2]/span[@class="mrow"]',
      'count(./*[1]/*[2]/*[1]/*)=1', './*[1]/*[2]/*[1]/*[1][text()=3]');

  defineRule(
      'mj-square-sub', 'default.default',
      '[n] ./*[1]/*[1]/*[1]; [t] "sub"; [n] ./*[1]/*[3]/*[1] (pitch:-0.35); ' +
          '[p] (pause:300); [t] "square" (pitch:0.35); [p] (pause:400)',
      'self::span[@class="msubsup"]', './*[1]/*[2]/*[1][text()=2]');
  defineRuleAlias(
      'mj-square-sub', 'self::span[@class="msubsup"]',
      './*[1]/*[2]/*[1]=./*[1]/*[2]/span[@class="mrow"]',
      'count(./*[1]/*[2]/*[1]/*)=1', './*[1]/*[2]/*[1]/*[1][text()=2]');

  defineRule(
      'mj-cube-sub', 'default.default',
      '[n] ./*[1]/*[1]/*[1]; [t] "sub"; [n] ./*[1]/*[3]/*[1] (pitch:-0.35); ' +
          '[p] (pause:300); [t] "cube" (pitch:0.35); [p] (pause:400)',
      'self::span[@class="msubsup"]', './*[1]/*[2]/*[1][text()=3]');
  defineRuleAlias(
      'mj-cube-sub', 'self::span[@class="msubsup"]',
      './*[1]/*[2]/*[1]=./*[1]/*[2]/span[@class="mrow"]',
      'count(./*[1]/*[2]/*[1]/*)=1', './*[1]/*[2]/*[1]/*[1][text()=3]');
};

});  // goog.scope

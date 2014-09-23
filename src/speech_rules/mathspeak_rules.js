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

goog.require('sre.MathStore');
goog.require('sre.MathmlStore');
goog.require('sre.MathspeakUtil');
goog.require('sre.StoreUtil');



/**
 * Rule initialization.
 * @constructor
 */
sre.MathspeakRules = function() {
  sre.MathspeakRules.initCustomFunctions_();
  sre.MathspeakRules.initMathspeakRules_();
};
goog.addSingletonGetter(sre.MathspeakRules);


/**
 * @type {sre.MathStore}
 */
sre.MathspeakRules.mathStore = sre.MathmlStore.getInstance();


/** @private */
sre.MathspeakRules.defineRule_ = goog.bind(
    sre.MathspeakRules.mathStore.defineRule,
    sre.MathspeakRules.mathStore);


/** @private */
sre.MathspeakRules.defineRuleAlias_ = goog.bind(
    sre.MathspeakRules.mathStore.defineRulesAlias,
    sre.MathspeakRules.mathStore);


/** @private */
sre.MathspeakRules.addContextFunction_ = goog.bind(
    sre.MathspeakRules.mathStore.contextFunctions.add,
    sre.MathspeakRules.mathStore.contextFunctions);


/** @private */
sre.MathspeakRules.addCustomQuery_ = goog.bind(
    sre.MathspeakRules.mathStore.customQueries.add,
    sre.MathspeakRules.mathStore.customQueries);


/** @private */
sre.MathspeakRules.addCustomString_ = goog.bind(
    sre.MathspeakRules.mathStore.customStrings.add,
    sre.MathspeakRules.mathStore.customStrings);


goog.scope(function() {
var defineRule = sre.MathspeakRules.defineRule_;
var defineRuleAlias = sre.MathspeakRules.defineRuleAlias_;

var addCQF = sre.MathspeakRules.addCustomQuery_;
var addCSF = sre.MathspeakRules.addCustomString_;
var addCTXF = sre.MathspeakRules.addContextFunction_;


/**
 * Initialize the custom functions.
 * @private
 */
sre.MathspeakRules.initCustomFunctions_ = function() {
  addCQF('CQFspaceoutNumber', sre.MathspeakUtil.spaceoutNumber);

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
  addCSF('CSFvulgarFraction', sre.MathspeakUtil.vulgarFraction);
  addCQF('CQFvulgarFractionSmall', sre.MathspeakUtil.isSmallVulgarFraction);
  
  addCSF('CSFsuperscriptVerbose', sre.MathspeakUtil.superscriptVerbose);
  addCSF('CSFsuperscriptBrief', sre.MathspeakUtil.superscriptBrief);
  addCSF('CSFsubscriptVerbose', sre.MathspeakUtil.subscriptVerbose);
  addCSF('CSFsubscriptBrief', sre.MathspeakUtil.subscriptBrief);
  addCSF('CSFbaselineVerbose', sre.MathspeakUtil.baselineVerbose);
  addCSF('CSFbaselineBrief', sre.MathspeakUtil.baselineBrief);
};


/**
 * Semantic rules.
 * @private
*/
sre.MathspeakRules.initMathspeakRules_ = function() {
  // Dummy rules
  defineRule(
      'unknown', 'mathspeak.default', '[n] text()',
      'self::unknown');

  defineRule(
      'protected', 'mathspeak.default', '[t] text()',
      'self::*', '@role="protected"');


  // Number rules
  defineRule(
      'number', 'mathspeak.default', '[n] text()', 'self::number');

  defineRule(
      'mixed-number', 'mathspeak.default',
      '[n] children/*[1]; [t] "and"; [n] children/*[2]; ',
      'self::number', '@role="mixed"');

  defineRule(
      'number-with-chars', 'mathspeak.default',
      '[t] "Number"; [m] CQFspaceoutNumber', 'self::number',
      '"" != translate(text(), "0123456789.,", "")',
      'text() != translate(text(), "0123456789.,", "")');

  defineRule(
      'number-with-chars', 'mathspeak.brief',
      '[t] "Num"; [m] CQFspaceoutNumber', 'self::number',
      '"" != translate(text(), "0123456789.,", "")',
      'text() != translate(text(), "0123456789.,", "")');

  defineRule(
      'number-with-chars', 'mathspeak.sbrief',
      '[t] "Num"; [m] CQFspaceoutNumber', 'self::number',
      '"" != translate(text(), "0123456789.,", "")',
      'text() != translate(text(), "0123456789.,", "")');

  defineRule(
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
      '"")');

  defineRule(
      'number-baseline', 'mathspeak.default',
      '[t] "Baseline"; [n] text()',
      'self::number', 'preceding-sibling::identifier', 
      'preceding-sibling::*[@role="latinletter"] or' +
      ' preceding-sibling::*[@role="greekletter"] or' +
      ' preceding-sibling::*[@role="otherletter"]',
      'parent::*/parent::infixop[@role="implicit"]'
  );

  defineRule(
      'number-baseline', 'mathspeak.brief',
      '[t] "Base"; [n] text()',
      'self::number', 'preceding-sibling::identifier', 
      'preceding-sibling::*[@role="latinletter"] or' +
      ' preceding-sibling::*[@role="greekletter"] or' +
      ' preceding-sibling::*[@role="otherletter"]',
      'parent::*/parent::infixop[@role="implicit"]'
  );

  defineRule(
      'number-baseline', 'mathspeak.sbrief',
      '[t] "Base"; [n] text()',
      'self::number', 'preceding-sibling::identifier', 
      'preceding-sibling::*[@role="latinletter"] or' +
      ' preceding-sibling::*[@role="greekletter"] or' +
      ' preceding-sibling::*[@role="otherletter"]',
      'parent::*/parent::infixop[@role="implicit"]'
  );

  
  // minus sign
  defineRule(
      'negative', 'mathspeak.default',
      '[t] "negative"; [n] children/*[1]',
      'self::prefixop', '@role="negative"', 'children/identifier');

  defineRule(
      'negative', 'mathspeak.default',
      '[t] "negative"; [n] children/*[1]',
      'self::prefixop', '@role="negative"', 'children/number');

  defineRule(
      'negative', 'mathspeak.default',
      '[t] "minus"; [n] children/*[1]',
      'self::prefixop', '@role="negative"');

  // Operator rules
  defineRule(
      'prefix', 'mathspeak.default',
      '[t] "prefix"; [n] text(); [n] children/*[1]',
      'self::prefixop');

  defineRule(
      'binary-operation', 'mathspeak.default',
      '[m] children/* (separator:text());', 'self::infixop');

  // Implicit times is currently ignored!
  defineRule(
      'implicit', 'mathspeak.default',
      '[m] children/*', 'self::infixop', '@role="implicit"');

  defineRule('subtraction', 'mathspeak.default',
             '[m] children/* (separator:"minus");', 'self::infixop',
             '@role="subtraction"');

  // Function rules
  defineRule(
      'function-unknown', 'mathspeak.default',
      '[n] children/*[1]; [n] children/*[2]',
      'self::appl', 'children/*[1][@role="unknown"]'
  );

  defineRule(
      'function-prefix', 'mathspeak.default',
      '[n] children/*[1]; [n] children/*[2]',
      'self::appl', 'children/*[1][@role="prefix function"]'
  );


  // Fences rules
  defineRule(
      'fences-open-close', 'mathspeak.default',
      '[n] content/*[1]; [n] children/*[1]; [n] content/*[2]',
      'self::fenced', '@role="leftright"');

  defineRule(
      'fences-neutral', 'mathspeak.default',
      '[t] "StartAbsoluteValue"; [n] children/*[1]; [t] "EndAbsoluteValue"',
      'self::fenced', 'self::fenced[@role="neutral"]');

  defineRule(
      'fences-neutral', 'mathspeak.sbrief',
      '[t] "AbsoluteValue"; [n] children/*[1]; [t] "EndAbsoluteValue"',
      'self::fenced', 'self::fenced[@role="neutral"]');

  // TODO (sorge) Maybe promote this to default.default?
  // Maybe check for punctuated element and singleton?
  defineRule(
      'fences-set', 'mathspeak.default',
      '[t] "StartSet"; [n] children/*[1]; [t] "EndSet"',
      'self::fenced[@role="leftright"]', 'content/*[1][text()]="{"',
      'content/*[2][text()]="}"', 'count(children/*)=1');

  defineRule(
      'fences-Set', 'mathspeak.sbrief',
      '[t] "Set"; [n] children/*[1]; [t] "EndSet"',
      'self::fenced[@role="leftright"]', 'content/*[1][text()]="{"',
      'content/*[2][text()]="}"', 'count(children/*)=1');


  // Text rules
  defineRule(
      'text', 'mathspeak.default', '[n] text()', 'self::text');


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
      'vulgar-fraction', 'mathspeak.default',
      '[t] CSFvulgarFraction',
      'self::fraction', '@role="vulgar"', 'CQFvulgarFractionSmall');

  defineRule(
      'vulgar-fraction', 'mathspeak.sbrief',
      '[t] CSFvulgarFraction',
      'self::fraction', '@role="vulgar"', 'CQFvulgarFractionSmall');

  defineRule(
      'vulgar-fraction', 'mathspeak.brief',
      '[t] CSFvulgarFraction',
      'self::fraction', '@role="vulgar"', 'CQFvulgarFractionSmall');

  // Limits

  defineRule(
      'limboth', 'mathspeak.default',
      '[n] children/*[1]; [t] "Underscript"; [n] children/*[2];' +
      '[t] "Overscript"; [n] children/*[3]; [t] "Endscripts";',
      'self::limboth');

  defineRule(
      'integral', 'mathspeak.default',
      '[n] children/*[1]; [t] "Subscript"; [n] children/*[2];' +
      '[t] "Superscript"; [n] children/*[3]; [t] "Baseline";',
      'self::limboth', '@role="integral"');

  defineRule(
      'integral', 'mathspeak.brief',
      '[n] children/*[1]; [t] "Sub"; [n] children/*[2];' +
      '[t] "Sup"; [n] children/*[3]; [t] "Base";',
      'self::limboth', '@role="integral"');

  defineRule(
      'integral', 'mathspeak.sbrief',
      '[n] children/*[1]; [t] "Sub"; [n] children/*[2];' +
      '[t] "Sup"; [n] children/*[3]; [t] "Base";',
      'self::limboth', '@role="integral"');

  defineRule(
      'bigop', 'mathspeak.default',
      '[n] children/*[1]; [n] children/*[2];',
      'self::bigop');



  // Relations

  defineRule(
      'equality', 'mathspeak.default',
      '[n] children/*[1]; [n] text(); [n] children/*[2]',
      'self::relseq[@role="equality"]', 'count(./children/*)=2');

  // Subscripts
  defineRule(
      'subscript', 'mathspeak.default',
      '[n] children/*[1]; [t] CSFsubscriptVerbose; [n] children/*[2]',
      'self::subscript');

  defineRule(
      'subscript', 'mathspeak.brief',
      '[n] children/*[1]; [t] CSFsubscriptBrief; [n] children/*[2]',
      'self::subscript');

  defineRule(
      'subscript', 'mathspeak.sbrief',
      '[n] children/*[1]; [t] CSFsubscriptBrief; [n] children/*[2]',
      'self::subscript');

  defineRule(
      'subscript-simple', 'mathspeak.default',
      '[n] children/*[1]; [n] children/*[2]',
      'self::subscript',
      // First child is a single letter.
      'name(./children/*[1])="identifier"',
      // Second child is a number but not mixed or other.
      'name(./children/*[2])="number"',
      './children/*[2][@role!="mixed"]',
      './children/*[2][@role!="othernumber"]'
  );

  defineRule(
      'subscript-simple', 'mathspeak.brief',
      '[n] children/*[1]; [n] children/*[2]',
      'self::subscript',
      // First child is a single letter.
      'name(./children/*[1])="identifier"',
      // Second child is a number but not mixed or other.
      'name(./children/*[2])="number"',
      './children/*[2][@role!="mixed"]',
      './children/*[2][@role!="othernumber"]'
  );

  defineRule(
      'subscript-simple', 'mathspeak.sbrief',
      '[n] children/*[1]; [n] children/*[2]',
      'self::subscript',
      // First child is a single letter.
      'name(./children/*[1])="identifier"',
      // Second child is a number but not mixed or other.
      'name(./children/*[2])="number"',
      './children/*[2][@role!="mixed"]',
      './children/*[2][@role!="othernumber"]'
  );


  defineRule(
      'subscript-baseline', 'mathspeak.default',
      '[n] children/*[1]; [t] CSFsubscriptVerbose; [n] children/*[2]; [t] CSFbaselineVerbose',
      'self::subscript', 'following-sibling::*');

  defineRule(
      'subscript-baseline', 'mathspeak.brief',
      '[n] children/*[1]; [t] CSFsubscriptBrief; [n] children/*[2]; [t] CSFbaselineBrief',
      'self::subscript', 'following-sibling::*');

  defineRule(
      'subscript-baseline', 'mathspeak.sbrief',
      '[n] children/*[1]; [t] CSFsubscriptBrief; [n] children/*[2]; [t] CSFbaselineBrief',
      'self::subscript', 'following-sibling::*');

  defineRuleAlias(
    'subscript-baseline',
    'self::subscript', 'not(following-sibling::*)', 'ancestor::fenced'
  ); // This rule might be too simple.
  

  // Superscripts
  defineRule(
      'superscript', 'mathspeak.default',
      '[n] children/*[1]; [t] CSFsuperscriptVerbose; [n] children/*[2]',
      'self::superscript');

  defineRule(
      'superscript', 'mathspeak.brief',
      '[n] children/*[1]; [t] CSFsuperscriptBrief; [n] children/*[2]',
      'self::superscript');

  defineRule(
      'superscript', 'mathspeak.sbrief',
      '[n] children/*[1]; [t] CSFsuperscriptBrief; [n] children/*[2]',
      'self::superscript');


  defineRule(
      'superscript-baseline', 'mathspeak.default',
      '[n] children/*[1]; [t] CSFsuperscriptVerbose; [n] children/*[2];' +
      '[t] CSFbaselineVerbose',
      'self::superscript', 'following-sibling::*');

  defineRule(
      'superscript-baseline', 'mathspeak.brief',
      '[n] children/*[1]; [t] CSFsuperscriptBrief; [n] children/*[2];' +
      '[t] CSFbaselineBrief',
      'self::superscript', 'following-sibling::*');

  defineRule(
      'superscript-baseline', 'mathspeak.sbrief',
      '[n] children/*[1]; [t] CSFsuperscriptBrief; [n] children/*[2];' +
      '[t] CSFbaselineBrief',
      'self::superscript', 'following-sibling::*');

  defineRuleAlias(
    'superscript-baseline',
    'self::superscript', 'not(following-sibling::*)', 'ancestor::fenced'
  );  // This rule might be too simple.
  
  // defineRule(
  //     'superscript-empty', 'mathspeak.default',
  //     '[n] children/*[2]; [t] CSFbaselineVerbose',
  //     'self::superscript', 'following-sibling::*', 'name(children/*[1])="empty"');

  // defineRule(
  //     'superscript-empty', 'mathspeak.brief',
  //     '[n] children/*[2]; [t] CSFbaselineBrief',
  //     'self::superscript', 'following-sibling::*', 'name(children/*[1])="empty"');

  // defineRule(
  //     'superscript-empty', 'mathspeak.sbrief',
  //     '[n] children/*[2]; [t] CSFbaselineBrief',
  //     'self::superscript', 'following-sibling::*', 'name(children/*[1])="empty"');


  // Square
  defineRule(
      'square', 'mathspeak.default',
      '[n] children/*[1]; [t] "squared"',
      'self::superscript', 'children/*[2][text()=2]',
      'name(./children/*[1])!="text"');

  defineRule(
      'square', 'mathspeak.brief',
      '[n] children/*[1]; [t] "squared"',
      'self::superscript', 'children/*[2][text()=2]',
      'name(./children/*[1])!="text"');

  defineRule(
      'square', 'mathspeak.sbrief',
      '[n] children/*[1]; [t] "squared"',
      'self::superscript', 'children/*[2][text()=2]',
      'name(./children/*[1])!="text"');

  // Cube
  defineRule(
      'cube', 'mathspeak.default',
      '[n] children/*[1]; [t] "cubed"',
      'self::superscript', 'children/*[2][text()=3]',
      'name(./children/*[1])!="text"');

  defineRule(
      'cube', 'mathspeak.brief',
      '[n] children/*[1]; [t] "cubed"',
      'self::superscript', 'children/*[2][text()=3]',
      'name(./children/*[1])!="text"');

  defineRule(
      'cube', 'mathspeak.sbrief',
      '[n] children/*[1]; [t] "cubed"',
      'self::superscript', 'children/*[2][text()=3]',
      'name(./children/*[1])!="text"');


};

});  // goog.scope


// Copyright 2016 Volker Sorge
// Copyright (c) 2016 The MathJax Consortium
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
 * @fileoverview Abstraction rules for collapsed elements.
 * @author v.sorge@mathjax.com (Volker Sorge)
 */

goog.provide('sre.AbstractionRules');

goog.require('sre.MathStore');
goog.require('sre.MathmlStore');
goog.require('sre.MathspeakUtil');
goog.require('sre.StoreUtil');



/**
 * Rule initialization.
 * @constructor
 */
sre.AbstractionRules = function() {
  sre.AbstractionRules.initAbstractionRules_();
};
goog.addSingletonGetter(sre.AbstractionRules);


/**
 * @type {sre.MathStore}
 */
sre.AbstractionRules.mathStore = sre.MathmlStore.getInstance();


/** @private */
sre.AbstractionRules.defineRule_ = goog.bind(
    sre.AbstractionRules.mathStore.defineRule,
    sre.AbstractionRules.mathStore);


/** @private */
sre.AbstractionRules.defineRuleAlias_ = goog.bind(
    sre.AbstractionRules.mathStore.defineRulesAlias,
    sre.AbstractionRules.mathStore);


/** @private */
sre.AbstractionRules.defineSpecialisedRule_ = goog.bind(
    sre.AbstractionRules.mathStore.defineSpecialisedRule,
    sre.AbstractionRules.mathStore);


goog.scope(function() {
var defineRule = sre.AbstractionRules.defineRule_;
var defineRuleAlias = sre.AbstractionRules.defineRuleAlias_;
var defineSpecialisedRule = sre.AbstractionRules.defineSpecialisedRule_;

/**
 * Abstraction rules.
 * @private
*/
sre.AbstractionRules.initAbstractionRules_ = function() {
  //TODO: Need some means to prioritise these rules over other rules.
  defineRule(
    'abstr-identifier', 'mathspeak.default',
    '[t] "collapsed long identifier"',
    'self::identifier[@alternative]',
    'self::*', 'self::*', 'self::*', 'self::*', 'self::*'
  );
  defineRule(
    'abstr-identifier', 'mathspeak.brief',
    '[t] "collapsed identifier"',
    'self::identifier[@alternative]',
    'self::*', 'self::*', 'self::*', 'self::*', 'self::*'
  );

  defineRule(
    'abstr-number', 'mathspeak.default',
    '[t] "collapsed long number"',
    'self::number[@alternative]'
  );
  defineRule(
    'abstr-number', 'mathspeak.brief',
    '[t] "collapsed number"',
    'self::number[@alternative]'
  );
  defineRule(
    'abstr-mixed-number', 'mathspeak.default',
    '[t] "collapsed long mixed number"',
    'self::number[@alternative]', '@role="mixed"'
  );
  defineRule(
    'abstr-mixed-number', 'mathspeak.brief',
    '[t] "collapsed mixed number"',
    'self::number[@alternative]', '@role="mixed"'
  );

  defineRule(
    'abstr-text', 'mathspeak.default',
    '[t] "collapsed text"',
    'self::text[@alternative]'
  );

  defineRule(
    'abstr-function', 'mathspeak.default',
    '[t] "collapsed functional expression"',
    'self::function[@alternative]',
    'self::*', 'self::*'
  );
  defineRule(
    'abstr-function', 'mathspeak.brief',
    '[t] "collapsed function"',
    'self::function[@alternative]',
    'self::*', 'self::*'
  );

  defineRule(
    'abstr-lim', 'mathspeak.default',
    '[t] "collapsed limit function"',
    'self::function[@alternative]', '@role="limit function"'
  );
  defineRule(
    'abstr-lim', 'mathspeak.brief',
    '[t] "collapsed lim"',
    'self::function[@alternative]', '@role="limit function"'
  );


  defineRule(
    'abstr-fraction', 'mathspeak.default',
    '[t] "collapsed fraction"',
    'self::fraction[@alternative]'
  );
  defineRule(
    'abstr-fraction', 'mathspeak.brief',
    '[t] "collapsed frac"',
    'self::fraction[@alternative]'
  );

  
  defineRule(
    'abstr-continued-fraction', 'mathspeak.default',
    '[t] "collapsed continued fraction"',
    'self::fraction[@alternative]',
    'children/*[2]/descendant-or-self::*[@role="ellipsis"]',
    'self::*', 'self::*'
  );
  defineRule(
    'abstr-continued-fraction', 'mathspeak.brief',
    '[t] "collapsed continued frac"',
    'self::fraction[@alternative]',
    'children/*[2]/descendant-or-self::*[@role="ellipsis"]',
    'self::*', 'self::*'
  );
  
  defineRule(
    'abstr-sqrt', 'mathspeak.default',
    '[t] "collapsed square root"',
    'self::sqrt[@alternative]'
  );
  defineRule(
    'abstr-sqrt', 'mathspeak.default',
    '[t] "collapsed nested square root"',
    'self::sqrt[@alternative]',
    'children/*/descendant::sqrt or children/*/descendant::root'
  );
  defineRule(
    'abstr-root', 'mathspeak.default',
    '[t] "collapsed root of index"; [n] children/*[1]; [t] "endindex"',
    'self::root[@alternative]',
    'following-sibling::* or ancestor::*/following-sibling::*'
  );
  defineRule(
    'abstr-root', 'mathspeak.brief',
    '[t] "collapsed root"',
    'self::root[@alternative]'
  );
  defineRule(
    'abstr-root', 'mathspeak.default',
    '[t] "collapsed nested root of index"; [n] children/*[1]',
    'self::root[@alternative]',
    'children/*/descendant::sqrt or children/*/descendant::root'
  );
  defineRule(
    'abstr-root', 'mathspeak.default',
    '[t] "collapsed nested root of index"; [n] children/*[1]; [t] "endindex"',
    'self::root[@alternative]',
    'children/*/descendant::sqrt or children/*/descendant::root',
    'following-sibling::* or ancestor::*/following-sibling::*'
  );
  defineRule(
    'abstr-root', 'mathspeak.brief',
    '[t] "collapsed nested root"',
    'self::root[@alternative]',
    'children/*/descendant::sqrt or children/*/descendant::root'
  );

  defineRule(
    'abstr-superscript', 'mathspeak.default',
    '[t] "collapsed power"',
    'self::superscript[@alternative]',
    'self::*', 'self::*', 'self::*', 'self::*'
  );
  defineRule(
    'abstr-subscript', 'mathspeak.default',
    '[t] "collapsed subscript"',
    'self::subscript[@alternative]',
    'self::*', 'self::*', 'self::*', 'self::*'
  );
  defineRule(
    'abstr-subsup', 'mathspeak.default',
    '[t] "collapsed power with subscript"',
    'self::superscript[@alternative]',
    'name(children/*[1])="subscript"',
    'self::*', 'self::*', 'self::*', 'self::*'
  );

  defineRule(
    'abstr-infixop', 'mathspeak.default',
    '[t] "collapsed"; [t] @role; [t] "with"; [t] count(./children/*);' +
      ' [t] "elements"',
    'self::infixop[@alternative]', 'self::*'
  );
  defineRule(
    'abstr-infixop', 'mathspeak.brief',
    '[t] "collapsed"; [t] @role',
    'self::infixop[@alternative]', 'self::*'
  );
  
  defineRule(
    'abstr-addition', 'mathspeak.default',
    '[t] "collapsed sum with"; [t] count(./children/*); [t] "summands"',
    'self::infixop[@alternative]', '@role="addition"'
  );
  defineRule(
    'abstr-addition', 'mathspeak.brief',
    '[t] "collapsed sum"',
    'self::infixop[@alternative]', '@role="addition"'
  );

  defineRule(
    'abstr-multiplication', 'mathspeak.default',
    '[t] "collapsed product with"; [t] count(./children/*); [t] "factors"',
    'self::infixop[@alternative]', '@role="multiplication"'
  );
  defineRule(
    'abstr-multiplication', 'mathspeak.brief',
    '[t] "collapsed product"',
    'self::infixop[@alternative]', '@role="multiplication"'
  );
  defineRuleAlias(
    'abstr-multiplication',
    'self::infixop[@alternative]', '@role="implicit"'
  );

  defineRule(
    'abstr-vector', 'mathspeak.default',
    '[t] "collapsed"; [t] count(./children/*) ; [t] "dimensional vector"',
    'self::vector[@alternative]'
  );
  defineRule(
    'abstr-vector', 'mathspeak.brief',
    '[t] "collapsed vector"',
    'self::vector[@alternative]'
  );

  defineRule(
    'abstr-binomial', 'mathspeak.default',
    '[t] "collapsed binomial"',
    'self::vector[@alternative]', '@role="binomial"'
  );
  defineSpecialisedRule(
    'abstr-binomial', 'mathspeak.default', 'mathspeak.brief');

  defineRule(
    'abstr-determinant', 'mathspeak.default',
    '[t] "collapsed" ; [t] count(./children/*); [t] "dimensional determinant"',
    'self::matrix[@alternative]', '@role="determinant"'
  );
  defineRule(
    'abstr-determinant', 'mathspeak.brief',
    '[t] "collapsed determinant"',
    'self::matrix[@alternative]', '@role="determinant"'
  );

  defineRule(
    'abstr-squarematrix', 'mathspeak.default',
    '[t] "collapsed" ; [t] count(./children/*);' +
      ' [t] "dimensional square matrix"',
    'self::matrix[@alternative]', '@role="squarematrix"'
  );
  defineRule(
    'abstr-squarematrix', 'mathspeak.brief',
    '[t] "collapsed square matrix"',
    'self::matrix[@alternative]', '@role="squarematrix"'
  );

  defineRule(
    'abstr-rowvector', 'mathspeak.default',
    '[t] "collapsed" ; [t] count(./children/*); [t] "dimensional row vector"',
    'self::matrix[@alternative]', '@role="rowvector"'
  );
  defineRule(
    'abstr-rowvector', 'mathspeak.brief',
    '[t] "collapsed row vector"',
    'self::matrix[@alternative]', '@role="rowvector"'
  );

  defineRule(
    'abstr-matrix', 'mathspeak.default',
    '[t] "collapsed"; [t] count(children/*);  [t] "by";' +
      '[t] count(children/*[1]/children/*); [t] "matrix"',
    'self::matrix[@alternative]'
  );
  defineRule(
    'abstr-matrix', 'mathspeak.brief',
    '[t] "collapsed matrix"',
    'self::matrix[@alternative]'
  );
  //TODO: Add rules for elements containing ellipses.
  
  // To here!
  defineRule(
    'abstr-cases', 'mathspeak.default',
    '[t] "collapsed cases"',
    'self::cases[@alternative]'
  );

  defineRule(
    'abstr-punctuated', 'mathspeak.default',
    '[t] "collapsed punctuated"',
    'self::punctuated[@alternative]'
  );
  defineRule(
    'abstr-text', 'mathspeak.default',
    '[t] "collapsed text"',
    'self::text[@alternative]'
  );
  defineRule(
    'abstr-default', 'mathspeak.default',
    '[t] "collapsed default"',
    'self::default[@alternative]'
  );
  
};
  
});  // goog.scope

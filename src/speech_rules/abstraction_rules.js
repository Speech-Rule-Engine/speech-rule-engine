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
goog.require('sre.MathspeakUtil');
goog.require('sre.StoreUtil');



/**
 * Rule initialization.
 * @constructor
 * @extends {sre.MathStore}
 */
sre.AbstractionRules = function() {
  goog.base(this);
};
goog.inherits(sre.AbstractionRules, sre.MathStore);
goog.addSingletonGetter(sre.AbstractionRules);


/**
 * @type {sre.MathStore}
 */
sre.AbstractionRules.mathStore = sre.AbstractionRules.getInstance();


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
  // Identifier
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
  defineSpecialisedRule(
      'abstr-identifier', 'mathspeak.brief', 'mathspeak.sbrief'
  );

  // Numbers
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
  defineSpecialisedRule(
      'abstr-number', 'mathspeak.brief', 'mathspeak.sbrief'
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
  defineSpecialisedRule(
      'abstr-mixed-number', 'mathspeak.brief', 'mathspeak.sbrief'
  );

  // Text
  defineRule(
      'abstr-text', 'mathspeak.default',
      '[t] "collapsed text"',
      'self::text[@alternative]'
  );

  // Functions
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
  defineSpecialisedRule(
      'abstr-function', 'mathspeak.brief', 'mathspeak.sbrief'
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
  defineSpecialisedRule(
      'abstr-lim', 'mathspeak.brief', 'mathspeak.sbrief'
  );


  // Fraction
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
  defineSpecialisedRule(
      'abstr-fraction', 'mathspeak.brief', 'mathspeak.sbrief'
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
  defineSpecialisedRule(
      'abstr-continued-fraction', 'mathspeak.brief', 'mathspeak.sbrief'
  );


  // Roots
  defineRule(
      'abstr-sqrt', 'mathspeak.default',
      '[t] "collapsed square root"',
      'self::sqrt[@alternative]'
  );
  defineSpecialisedRule(
      'abstr-sqrt', 'mathspeak.default', 'mathspeak.brief'
  );
  defineSpecialisedRule(
      'abstr-sqrt', 'mathspeak.brief', 'mathspeak.sbrief'
  );
  defineRule(
      'abstr-sqrt-nested', 'mathspeak.default',
      '[t] "collapsed nested square root"',
      'self::sqrt[@alternative]',
      'children/*/descendant::sqrt or children/*/descendant::root'
  );
  defineSpecialisedRule(
      'abstr-sqrt-nested', 'mathspeak.default', 'mathspeak.brief'
  );
  defineSpecialisedRule(
      'abstr-sqrt-nested', 'mathspeak.brief', 'mathspeak.sbrief'
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
  defineSpecialisedRule(
      'abstr-root', 'mathspeak.brief', 'mathspeak.sbrief'
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
  defineSpecialisedRule(
      'abstr-root', 'mathspeak.brief', 'mathspeak.sbrief'
  );


  // Superscript
  defineRule(
      'abstr-superscript', 'mathspeak.default',
      '[t] "collapsed power"',
      'self::superscript[@alternative]',
      'self::*', 'self::*', 'self::*', 'self::*'
  );
  defineSpecialisedRule(
      'abstr-superscript', 'mathspeak.default', 'mathspeak.brief'
  );
  defineSpecialisedRule(
      'abstr-superscript', 'mathspeak.brief', 'mathspeak.sbrief'
  );


  // Subscript
  defineRule(
      'abstr-subscript', 'mathspeak.default',
      '[t] "collapsed subscript"',
      'self::subscript[@alternative]',
      'self::*', 'self::*', 'self::*', 'self::*'
  );
  defineSpecialisedRule(
      'abstr-subscript', 'mathspeak.default', 'mathspeak.brief'
  );
  defineSpecialisedRule(
      'abstr-subscript', 'mathspeak.brief', 'mathspeak.sbrief'
  );


  // Subsuperscript
  defineRule(
      'abstr-subsup', 'mathspeak.default',
      '[t] "collapsed power with subscript"',
      'self::superscript[@alternative]',
      'name(children/*[1])="subscript"',
      'self::*', 'self::*', 'self::*', 'self::*'
  );
  defineSpecialisedRule(
      'abstr-subsup', 'mathspeak.default', 'mathspeak.brief'
  );
  defineSpecialisedRule(
      'abstr-subsup', 'mathspeak.brief', 'mathspeak.sbrief'
  );


  // Infixop
  defineRule(
      'abstr-infixop', 'mathspeak.default',
      '[t] "collapsed"; [t] @role; [t] "with"; [t] count(./children/*);' +
      ' [t] "elements"',
      'self::infixop[@alternative]', 'self::*'
  );
  defineRule(
      'abstr-infixop', 'mathspeak.default',
      '[t] "collapsed"; [t] @role; [t] "with variable number of elements"',
      'self::infixop[@alternative]', 'count(./children/*)>2',
      './children/punctuation[@role="ellipsis"]', 'self::*'
  );
  defineRule(
      'abstr-infixop', 'mathspeak.brief',
      '[t] "collapsed"; [t] @role',
      'self::infixop[@alternative]', 'self::*'
  );
  defineSpecialisedRule(
      'abstr-infixop', 'mathspeak.brief', 'mathspeak.sbrief'
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
  defineSpecialisedRule(
      'abstr-addition', 'mathspeak.brief', 'mathspeak.sbrief'
  );
  defineRule(
      'abstr-var-addition', 'mathspeak.default',
      '[t] "collapsed sum with variable number of summands"',
      'self::infixop[@alternative]', '@role="addition"',
      'count(./children/*)>2', './children/punctuation[@role="ellipsis"]'
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
  defineSpecialisedRule(
      'abstr-multiplication', 'mathspeak.brief', 'mathspeak.sbrief'
  );
  defineRuleAlias(
      'abstr-multiplication',
      'self::infixop[@alternative]', '@role="implicit"'
  );
  defineRule(
      'abstr-var-multiplication', 'mathspeak.default',
      '[t] "collapsed product with variable number of factors"',
      'self::infixop[@alternative]', '@role="multiplication"',
      'count(./children/*)>2', './children/punctuation[@role="ellipsis"]'
  );
  defineRuleAlias(
      'abstr-var-multiplication',
      'self::infixop[@alternative]', '@role="implicit"',
      'count(./children/*)>2', './children/punctuation[@role="ellipsis"]'
  );


  // Vector
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
  defineSpecialisedRule(
      'abstr-vector', 'mathspeak.brief', 'mathspeak.sbrief'
  );
  defineRule(
      'abstr-var-vector', 'mathspeak.default',
      '[t] "collapsed n dimensional vector"',
      'self::vector[@alternative]',
      './children/*/children/punctuation[@role="ellipsis"]'
  );

  defineRule(
      'abstr-binomial', 'mathspeak.default',
      '[t] "collapsed binomial"',
      'self::vector[@alternative]', '@role="binomial"'
  );
  defineSpecialisedRule(
      'abstr-binomial', 'mathspeak.default', 'mathspeak.brief');
  defineSpecialisedRule(
      'abstr-binomial', 'mathspeak.default', 'mathspeak.sbrief');


  // Matrix
  defineRule(
      'abstr-determinant', 'mathspeak.default',
      '[t] "collapsed" ; [t] count(./children/*);' +
      ' [t] "dimensional determinant"',
      'self::matrix[@alternative]', '@role="determinant"', 'self::*'
  );
  defineRule(
      'abstr-determinant', 'mathspeak.brief',
      '[t] "collapsed determinant"',
      'self::matrix[@alternative]', '@role="determinant"', 'self::*'
  );
  defineSpecialisedRule(
      'abstr-determinant', 'mathspeak.brief', 'mathspeak.sbrief'
  );
  defineRule(
      'abstr-var-determinant', 'mathspeak.default',
      '[t] "collapsed n dimensional determinant"',
      'self::matrix[@alternative]', '@role="determinant"',
      './children/*/children/*/children/punctuation[@role="ellipsis"]'
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
  defineSpecialisedRule(
      'abstr-squarematrix', 'mathspeak.brief', 'mathspeak.sbrief'
  );

  defineRule(
      'abstr-rowvector', 'mathspeak.default',
      '[t] "collapsed" ; [t] count(./children/row/children/*); ' +
      '[t] "dimensional row vector"',
      'self::matrix[@alternative]', '@role="rowvector"'
  );
  defineRule(
      'abstr-rowvector', 'mathspeak.brief',
      '[t] "collapsed row vector"',
      'self::matrix[@alternative]', '@role="rowvector"'
  );
  defineSpecialisedRule(
      'abstr-rowvector', 'mathspeak.brief', 'mathspeak.sbrief'
  );
  defineRule(
      'abstr-var-matrix', 'mathspeak.default',
      '[t] "collapsed n dimensional row vector"',
      'self::matrix[@alternative]', '@role="rowvector"',
      './children/*/children/*/children/punctuation[@role="ellipsis"]'
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
  defineSpecialisedRule(
      'abstr-matrix', 'mathspeak.brief', 'mathspeak.sbrief'
  );
  defineRule(
      'abstr-var-matrix', 'mathspeak.default',
      '[t] "collapsed n by m dimensional matrix"',
      'self::matrix[@alternative]',
      './children/*/children/*/children/punctuation[@role="ellipsis"]'
  );


  // Cases
  defineRule(
      'abstr-cases', 'mathspeak.default',
      '[t] "collapsed case statement";' +
      '[t] "with"; [t] count(children/*); [t] "cases"',
      'self::cases[@alternative]'
  );
  defineRule(
      'abstr-cases', 'mathspeak.brief',
      '[t] "collapsed case statement"',
      'self::cases[@alternative]'
  );
  defineSpecialisedRule(
      'abstr-cases', 'mathspeak.brief', 'mathspeak.sbrief'
  );
  defineRule(
      'abstr-var-cases', 'mathspeak.default',
      '[t] "collapsed case statement with variable number of cases"',
      'self::cases[@alternative]',
      './children/row/children/cell/children/punctuation[@role="ellipsis"]' +
      'or ./children/line/children/punctuation[@role="ellipsis"]'
  );


  // Punctuated
  defineRule(
      'abstr-punctuated', 'mathspeak.default',
      '[t] "collapsed"; [n] content/*[1]; [t] "separated list";' +
      '[t] "of length"; [t] count(children/*) - count(content/*)',
      'self::punctuated[@alternative]'
  );
  defineRule(
      'abstr-punctuated', 'mathspeak.brief',
      '[t] "collapsed"; [n] content/*[1]; [t] "separated list"',
      'self::punctuated[@alternative]'
  );
  defineSpecialisedRule(
      'abstr-punctuated', 'mathspeak.brief', 'mathspeak.sbrief'
  );
  defineRule(
      'abstr-var-punctuated', 'mathspeak.default',
      '[t] "collapsed"; [n] content/*[1]; [t] "separated list";' +
      '[t] "of variable length"',
      'self::punctuated[@alternative]',
      './children/punctuation[@role="ellipsis"]'
  );


  defineRule(
      'abstr-bigop', 'mathspeak.default',
      '[t] "collapsed"; [n] content/*[1]',
      'self::bigop[@alternative]', 'self::*'
  );

  defineRule(
      'abstr-integral', 'mathspeak.default',
      '[t] "collapsed integral"',
      'self::*[@alternative]', '@role="integral"', 'self::*'
  );

  //TODO: What about embellished operators/relations?
  defineRule(
      'abstr-relation', 'mathspeak.default',
      '[t] "collapsed"; [n] @role;',
      'self::relseq[@alternative]', 'count(./children/*)=2'
  );
  defineSpecialisedRule(
      'abstr-relation', 'mathspeak.default', 'mathspeak.brief'
  );
  defineSpecialisedRule(
      'abstr-relation', 'mathspeak.brief', 'mathspeak.sbrief'
  );

  defineRule(
      'abstr-relation', 'mathspeak.default',
      '[t] "collapsed"; [n] @role; [t] "sequence";' +
      ' [t] "with"; [t] count(./children/*); [t] "elements"',
      'self::relseq[@alternative]', 'count(./children/*)>2'
  );
  defineRule(
      'abstr-relation', 'mathspeak.brief',
      '[t] "collapsed"; [n] @role; [t] "sequence"',
      'self::relseq[@alternative]', 'count(./children/*)>2'
  );
  defineSpecialisedRule(
      'abstr-relation', 'mathspeak.brief', 'mathspeak.sbrief'
  );
  defineRule(
      'abstr-var-relation', 'mathspeak.default',
      '[t] "collapsed"; [n] @role; [t] "sequence";' +
      ' [t] "with variable number of elements"',
      'self::relseq[@alternative]', 'count(./children/*)>2',
      './children/punctuation[@role="ellipsis"]'
  );

  defineRuleAlias(
      'abstr-relation',
      'self::multirel[@alternative]',
      '@role!="unknown"', 'count(./children/*)>2'
  );
  defineRuleAlias(
      'abstr-var-relation',
      'self::multirel[@alternative]', '@role!="unknown"',
      'count(./children/*)>2', './children/punctuation[@role="ellipsis"]'
  );

  defineRule(
      'abstr-multirel', 'mathspeak.default',
      '[t] "collapsed relation sequence";' +
      ' [t] "with"; [t] count(./children/*); [t] "elements"',
      'self::multirel[@alternative]', 'count(./children/*)>2'
  );
  defineRule(
      'abstr-multirel', 'mathspeak.brief',
      '[t] "collapsed relation sequence"',
      'self::multirel[@alternative]', 'count(./children/*)>2'
  );
  defineSpecialisedRule(
      'abstr-multirel', 'mathspeak.brief', 'mathspeak.sbrief'
  );
  defineRule(
      'abstr-var-multirel', 'mathspeak.default',
      '[t] "collapsed relation sequence with variable number of elements"',
      'self::multirel[@alternative]', 'count(./children/*)>2',
      './children/punctuation[@role="ellipsis"]'
  );

};

});  // goog.scope


sre.AbstractionRules.getInstance().initializer = [
  sre.AbstractionRules.initAbstractionRules_
];

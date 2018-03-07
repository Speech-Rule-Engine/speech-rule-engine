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



/**
 * Rule initialization.
 * @constructor
 * @extends {sre.MathStore}
 */
sre.AbstractionRules = function() {
  sre.AbstractionRules.base(this, 'constructor');
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


/** @private */
sre.AbstractionRules.defineUniqueRuleAlias_ = goog.bind(
    sre.AbstractionRules.mathStore.defineUniqueRuleAlias,
    sre.AbstractionRules.mathStore);


goog.scope(function() {
var defineRule = sre.AbstractionRules.defineRule_;
var defineRuleAlias = sre.AbstractionRules.defineRuleAlias_;
var defineSpecialisedRule = sre.AbstractionRules.defineSpecialisedRule_;
var defineUniqueRuleAlias = sre.AbstractionRules.defineUniqueRuleAlias_;


/**
 * Abstraction rules.
 * @private
*/
sre.AbstractionRules.initAbstractionRules_ = function() {
  //TODO: Need some means to prioritise these rules over other rules.
  // Collapsed prefix
  defineRule(
      'abstr-collapsed', 'mathspeak.default',
      '[t] "collapsed"; [n] . (grammar:collapsed)',
      'self::*', '@alternative', 'not(@alternative="summary")',
      'not(contains(@grammar, "collapsed"))'
  );

  // Identifier
  defineRule(
      'abstr-identifier', 'mathspeak.default',
      '[t] "long identifier"',
      'self::identifier', '@alternative',
      'self::*', 'self::*', 'self::*', 'self::*'
  );
  defineRule(
      'abstr-identifier', 'mathspeak.default',
      '[t] "identifier"',
      'self::identifier', '@alternative="summary"', '@alternative',
      'self::*', 'self::*', 'self::*', 'self::*'
  );
  defineRule(
      'abstr-identifier', 'mathspeak.brief',
      '[t] "identifier"',
      'self::identifier', '@alternative',
      'self::*', 'self::*', 'self::*', 'self::*'
  );
  defineSpecialisedRule(
      'abstr-identifier', 'mathspeak.brief', 'mathspeak.sbrief'
  );

  // Numbers
  defineRule(
      'abstr-number', 'mathspeak.default',
      '[t] "long number"',
      'self::number', '@alternative'
  );
  defineRule(
      'abstr-number', 'mathspeak.default',
      '[t] "number"',
      'self::number', '@alternative', '@alternative="summary"'
  );
  defineRule(
      'abstr-number', 'mathspeak.brief',
      '[t] "number"',
      'self::number', '@alternative'
  );
  defineSpecialisedRule(
      'abstr-number', 'mathspeak.brief', 'mathspeak.sbrief'
  );

  defineRule(
      'abstr-mixed-number', 'mathspeak.default',
      '[t] "long mixed number"',
      'self::number', '@alternative', '@role="mixed"'
  );
  defineRule(
      'abstr-mixed-number', 'mathspeak.brief',
      '[t] "mixed number"',
      'self::number', '@alternative', '@role="mixed"'
  );
  defineSpecialisedRule(
      'abstr-mixed-number', 'mathspeak.brief', 'mathspeak.sbrief'
  );

  // Text
  defineRule(
      'abstr-text', 'mathspeak.default',
      '[t] "text"',
      'self::text', '@alternative'
  );

  // Functions
  defineRule(
      'abstr-function', 'mathspeak.default',
      '[t] "functional expression"',
      'self::function', '@alternative',
      'self::*'
  );
  defineRule(
      'abstr-function', 'mathspeak.brief',
      '[t] "function"',
      'self::function', '@alternative',
      'self::*'
  );
  defineSpecialisedRule(
      'abstr-function', 'mathspeak.brief', 'mathspeak.sbrief'
  );

  defineRule(
      'abstr-lim', 'mathspeak.default',
      '[t] "limit function"',
      'self::function', '@alternative', '@role="limit function"'
  );
  defineRule(
      'abstr-lim', 'mathspeak.brief',
      '[t] "lim"',
      'self::function', '@alternative', '@role="limit function"'
  );
  defineSpecialisedRule(
      'abstr-lim', 'mathspeak.brief', 'mathspeak.sbrief'
  );


  // Fraction
  defineRule(
      'abstr-fraction', 'mathspeak.default',
      '[t] "fraction"',
      'self::fraction', '@alternative'
  );
  defineRule(
      'abstr-fraction', 'mathspeak.brief',
      '[t] "frac"',
      'self::fraction', '@alternative'
  );
  defineSpecialisedRule(
      'abstr-fraction', 'mathspeak.brief', 'mathspeak.sbrief'
  );

  defineRule(
      'abstr-continued-fraction', 'mathspeak.default',
      '[t] "continued fraction"',
      'self::fraction', '@alternative',
      'children/*[2]/descendant-or-self::*[@role="ellipsis"]',
      'self::*', 'self::*'
  );
  defineRule(
      'abstr-continued-fraction', 'mathspeak.brief',
      '[t] "continued frac"',
      'self::fraction', '@alternative',
      'children/*[2]/descendant-or-self::*[@role="ellipsis"]',
      'self::*', 'self::*'
  );
  defineSpecialisedRule(
      'abstr-continued-fraction', 'mathspeak.brief', 'mathspeak.sbrief'
  );


  // Roots
  defineRule(
      'abstr-sqrt', 'mathspeak.default',
      '[t] "square root"',
      'self::sqrt', '@alternative'
  );
  defineSpecialisedRule(
      'abstr-sqrt', 'mathspeak.default', 'mathspeak.brief'
  );
  defineSpecialisedRule(
      'abstr-sqrt', 'mathspeak.brief', 'mathspeak.sbrief'
  );
  defineRule(
      'abstr-sqrt-nested', 'mathspeak.default',
      '[t] "nested square root"',
      'self::sqrt', '@alternative',
      'children/*/descendant-or-self::sqrt or' +
      ' children/*/descendant-or-self::root'
  );
  defineSpecialisedRule(
      'abstr-sqrt-nested', 'mathspeak.default', 'mathspeak.brief'
  );
  defineSpecialisedRule(
      'abstr-sqrt-nested', 'mathspeak.brief', 'mathspeak.sbrief'
  );

  // Content following the root expression.
  defineRule(
      'abstr-root', 'mathspeak.default',
      '[t] "root of index"; [n] children/*[1]; [t] "endindex"',
      'self::root', '@alternative',
      'following-sibling::* or ancestor::*/following-sibling::*'
  );
  defineRule(
      'abstr-root', 'mathspeak.brief',
      '[t] "root"',
      'self::root', '@alternative'
  );
  defineSpecialisedRule(
      'abstr-root', 'mathspeak.brief', 'mathspeak.sbrief'
  );
  defineRule(
      'abstr-root-nested', 'mathspeak.default',
      '[t] "nested root of index"; [n] children/*[1]',
      'self::root', '@alternative',
      'children/*/descendant-or-self::sqrt or' +
      ' children/*/descendant-or-self::root'
  );
  // Content following the root expression.
  defineRule(
      'abstr-root-nested', 'mathspeak.default',
      '[t] "nested root of index"; [n] children/*[1]; [t] "endindex"',
      'self::root', '@alternative',
      'children/*/descendant-or-self::sqrt or' +
      ' children/*/descendant-or-self::root',
      'following-sibling::* or ancestor::*/following-sibling::*'
  );
  defineRule(
      'abstr-root-nested', 'mathspeak.brief',
      '[t] "nested root"',
      'self::root', '@alternative',
      'children/*/descendant-or-self::sqrt or ' +
      'children/*/descendant-or-self::root'
  );
  defineSpecialisedRule(
      'abstr-root-nested', 'mathspeak.brief', 'mathspeak.sbrief'
  );


  // Superscript
  defineRule(
      'abstr-superscript', 'mathspeak.default',
      '[t] "power"',
      'self::superscript', '@alternative',
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
      '[t] "subscript"',
      'self::subscript', '@alternative',
      'self::*', 'self::*', 'self::*'
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
      '[t] "power with subscript"',
      'self::superscript', '@alternative',
      'name(children/*[1])="subscript"',
      'self::*', 'self::*', 'self::*'
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
      '[t] @role (grammar:localRole); [t] "with"; [t] count(./children/*);' +
      ' [t] "elements"',
      'self::infixop', '@alternative'
  );
  defineRule(
      'abstr-infixop', 'mathspeak.default',
      '[t] @role (grammar:localRole); [t] "with variable number of elements"',
      'self::infixop', '@alternative', 'count(./children/*)>2',
      './children/punctuation[@role="ellipsis"]'
  );
  defineRule(
      'abstr-infixop', 'mathspeak.brief',
      '[t] @role (grammar:localRole)',
      'self::infixop', '@alternative'
  );
  defineSpecialisedRule(
      'abstr-infixop', 'mathspeak.brief', 'mathspeak.sbrief'
  );

  defineRule(
      'abstr-addition', 'mathspeak.default',
      '[t] "sum with"; [t] count(./children/*); [t] "summands"',
      'self::infixop', '@alternative', '@role="addition"'
  );
  defineRule(
      'abstr-addition', 'mathspeak.brief',
      '[t] "sum"',
      'self::infixop', '@alternative', '@role="addition"'
  );
  defineSpecialisedRule(
      'abstr-addition', 'mathspeak.brief', 'mathspeak.sbrief'
  );
  defineRule(
      'abstr-var-addition', 'mathspeak.default',
      '[t] "sum with variable number of summands"',
      'self::infixop', '@alternative', '@role="addition"',
      'count(./children/*)>2', './children/punctuation[@role="ellipsis"]'
  );

  defineRule(
      'abstr-multiplication', 'mathspeak.default',
      '[t] "product with"; [t] count(./children/*); [t] "factors"',
      'self::infixop', '@alternative', '@role="multiplication"'
  );
  defineRule(
      'abstr-multiplication', 'mathspeak.brief',
      '[t] "product"',
      'self::infixop', '@alternative', '@role="multiplication"'
  );
  defineSpecialisedRule(
      'abstr-multiplication', 'mathspeak.brief', 'mathspeak.sbrief'
  );
  defineRuleAlias(
      'abstr-multiplication',
      'self::infixop', '@alternative', '@role="implicit"'
  );
  defineRule(
      'abstr-var-multiplication', 'mathspeak.default',
      '[t] "product with variable number of factors"',
      'self::infixop', '@alternative', '@role="multiplication"',
      'count(./children/*)>2', './children/punctuation[@role="ellipsis"]'
  );
  defineRuleAlias(
      'abstr-var-multiplication',
      'self::infixop', '@alternative', '@role="implicit"',
      'count(./children/*)>2', './children/punctuation[@role="ellipsis"]'
  );


  // Vector
  defineRule(
      'abstr-vector', 'mathspeak.default',
      '[t] count(./children/*) ; [t] "dimensional vector"',
      'self::vector', '@alternative'
  );
  defineRule(
      'abstr-vector', 'mathspeak.brief',
      '[t] "vector"',
      'self::vector', '@alternative'
  );
  defineSpecialisedRule(
      'abstr-vector', 'mathspeak.brief', 'mathspeak.sbrief'
  );
  defineRule(
      'abstr-var-vector', 'mathspeak.default',
      '[t] "n dimensional vector"',
      'self::vector', '@alternative',
      './children/*/children/punctuation[@role="ellipsis"]'
  );

  defineRule(
      'abstr-binomial', 'mathspeak.default',
      '[t] "binomial"',
      'self::vector', '@alternative', '@role="binomial"'
  );
  defineSpecialisedRule(
      'abstr-binomial', 'mathspeak.default', 'mathspeak.brief');
  defineSpecialisedRule(
      'abstr-binomial', 'mathspeak.default', 'mathspeak.sbrief');


  // Matrix
  defineRule(
      'abstr-determinant', 'mathspeak.default',
      '[t] count(./children/*);' +
      ' [t] "dimensional determinant"',
      'self::matrix', '@alternative', '@role="determinant"', 'self::*'
  );
  defineRule(
      'abstr-determinant', 'mathspeak.brief',
      '[t] "determinant"',
      'self::matrix', '@alternative', '@role="determinant"', 'self::*'
  );
  defineSpecialisedRule(
      'abstr-determinant', 'mathspeak.brief', 'mathspeak.sbrief'
  );
  defineRule(
      'abstr-var-determinant', 'mathspeak.default',
      '[t] "n dimensional determinant"',
      'self::matrix', '@alternative', '@role="determinant"',
      './children/*/children/*/children/punctuation[@role="ellipsis"]'
  );

  defineRule(
      'abstr-squarematrix', 'mathspeak.default',
      '[t] count(./children/*);' +
      ' [t] "dimensional square matrix"',
      'self::matrix', '@alternative', '@role="squarematrix"'
  );
  defineRule(
      'abstr-squarematrix', 'mathspeak.brief',
      '[t] "square matrix"',
      'self::matrix', '@alternative', '@role="squarematrix"'
  );
  defineSpecialisedRule(
      'abstr-squarematrix', 'mathspeak.brief', 'mathspeak.sbrief'
  );

  defineRule(
      'abstr-rowvector', 'mathspeak.default',
      '[t] count(./children/row/children/*); ' +
      '[t] "dimensional row vector"',
      'self::matrix', '@alternative', '@role="rowvector"'
  );
  defineRule(
      'abstr-rowvector', 'mathspeak.brief',
      '[t] "row vector"',
      'self::matrix', '@alternative', '@role="rowvector"'
  );
  defineSpecialisedRule(
      'abstr-rowvector', 'mathspeak.brief', 'mathspeak.sbrief'
  );
  defineRule(
      'abstr-var-matrix', 'mathspeak.default',
      '[t] "n dimensional row vector"',
      'self::matrix', '@alternative', '@role="rowvector"',
      './children/*/children/*/children/punctuation[@role="ellipsis"]'
  );

  defineRule(
      'abstr-matrix', 'mathspeak.default',
      '[t] count(children/*);  [t] "by";' +
      '[t] count(children/*[1]/children/*); [t] "matrix"',
      'self::matrix', '@alternative'
  );
  defineRule(
      'abstr-matrix', 'mathspeak.brief',
      '[t] "matrix"',
      'self::matrix', '@alternative'
  );
  defineSpecialisedRule(
      'abstr-matrix', 'mathspeak.brief', 'mathspeak.sbrief'
  );
  defineRule(
      'abstr-var-matrix', 'mathspeak.default',
      '[t] "n by m dimensional matrix"',
      'self::matrix', '@alternative',
      './children/*/children/*/children/punctuation[@role="ellipsis"]'
  );


  // Cases
  defineRule(
      'abstr-cases', 'mathspeak.default',
      '[t] "case statement";' +
      '[t] "with"; [t] count(children/*); [t] "cases"',
      'self::cases', '@alternative'
  );
  defineRule(
      'abstr-cases', 'mathspeak.brief',
      '[t] "case statement"',
      'self::cases', '@alternative'
  );
  defineSpecialisedRule(
      'abstr-cases', 'mathspeak.brief', 'mathspeak.sbrief'
  );
  defineRule(
      'abstr-var-cases', 'mathspeak.default',
      '[t] "case statement with variable number of cases"',
      'self::cases', '@alternative',
      './children/row/children/cell/children/punctuation[@role="ellipsis"]' +
      'or ./children/line/children/punctuation[@role="ellipsis"]'
  );


  // Punctuated
  defineRule(
      'abstr-punctuated', 'mathspeak.default',
      '[n] content/*[1]; [t] "separated list";' +
      '[t] "of length"; [t] count(children/*) - count(content/*)',
      'self::punctuated', '@alternative'
  );
  defineRule(
      'abstr-punctuated', 'mathspeak.brief',
      '[n] content/*[1]; [t] "separated list"',
      'self::punctuated', '@alternative'
  );
  defineSpecialisedRule(
      'abstr-punctuated', 'mathspeak.brief', 'mathspeak.sbrief'
  );
  defineRule(
      'abstr-var-punctuated', 'mathspeak.default',
      '[n] content/*[1]; [t] "separated list";' +
      '[t] "of variable length"',
      'self::punctuated', '@alternative',
      './children/punctuation[@role="ellipsis"]'
  );


  defineRule(
      'abstr-bigop', 'mathspeak.default',
      '[n] content/*[1]',
      'self::bigop', '@alternative', 'self::*'
  );

  defineRule(
      'abstr-integral', 'mathspeak.default',
      '[t] "integral"',
      'self::*', '@alternative', '@role="integral"'
  );

  defineRule(
      'abstr-relation', 'mathspeak.default',
      '[t] @role (grammar:localRole);',
      'self::relseq', '@alternative', 'count(./children/*)=2'
  );
  defineSpecialisedRule(
      'abstr-relation', 'mathspeak.default', 'mathspeak.brief'
  );
  defineSpecialisedRule(
      'abstr-relation', 'mathspeak.brief', 'mathspeak.sbrief'
  );

  defineRule(
      'abstr-relation', 'mathspeak.default',
      '[t] @role (grammar:localRole); [t] "sequence";' +
      ' [t] "with"; [t] count(./children/*); [t] "elements"',
      'self::relseq', '@alternative', 'count(./children/*)>2'
  );
  defineRule(
      'abstr-relation', 'mathspeak.brief',
      '[t] @role (grammar:localRole); [t] "sequence"',
      'self::relseq', '@alternative', 'count(./children/*)>2'
  );
  defineSpecialisedRule(
      'abstr-relation', 'mathspeak.brief', 'mathspeak.sbrief'
  );
  defineRule(
      'abstr-var-relation', 'mathspeak.default',
      '[t] @role (grammar:localRole); [t] "sequence";' +
      ' [t] "with variable number of elements"',
      'self::relseq', '@alternative', 'count(./children/*)>2',
      './children/punctuation[@role="ellipsis"]'
  );

  defineUniqueRuleAlias(
      'abstr-relation', 'mathspeak.default',
      'self::multirel', '@alternative',
      '@role!="unknown"', 'count(./children/*)>2'
  );
  defineUniqueRuleAlias(
      'abstr-relation', 'mathspeak.brief', 'self::multirel', '@alternative',
      '@role!="unknown"', 'count(./children/*)>2'
  );
  defineSpecialisedRule(
      'abstr-relation', 'mathspeak.brief', 'mathspeak.sbrief'
  );
  defineRuleAlias(
      'abstr-var-relation',
      'self::multirel', '@alternative', '@role!="unknown"',
      'count(./children/*)>2', './children/punctuation[@role="ellipsis"]'
  );

  defineRule(
      'abstr-multirel', 'mathspeak.default',
      '[t] "relation sequence";' +
      ' [t] "with"; [t] count(./children/*); [t] "elements"',
      'self::multirel', '@alternative', 'count(./children/*)>2'
  );
  defineRule(
      'abstr-multirel', 'mathspeak.brief',
      '[t] "relation sequence"',
      'self::multirel', '@alternative', 'count(./children/*)>2'
  );
  defineSpecialisedRule(
      'abstr-multirel', 'mathspeak.brief', 'mathspeak.sbrief'
  );
  defineRule(
      'abstr-var-multirel', 'mathspeak.default',
      '[t] "relation sequence with variable number of elements"',
      'self::multirel', '@alternative', 'count(./children/*)>2',
      './children/punctuation[@role="ellipsis"]'
  );

  defineRule(
      'abstr-table', 'mathspeak.default',
      '[t] "table with"; ' +
      '[t] count(children/*); [t] "rows and";' +
      '[t] count(children/*[1]/children/*); [t] "columns"',
      'self::table', '@alternative'
  );
  defineSpecialisedRule(
      'abstr-table', 'mathspeak.default', 'mathspeak.brief'
  );
  defineSpecialisedRule(
      'abstr-table', 'mathspeak.brief', 'mathspeak.sbrief'
  );
  defineRule(
      'abstr-line', 'mathspeak.default',
      '[t] "in"; [t] @role (grammar:localRole);',
      'self::line', '@alternative'
  );
  defineRule(
      'abstr-row', 'mathspeak.default',
      '[t] "in"; [t] @role (grammar:localRole);' +
      '[t] count(preceding-sibling::..); [t] "with";' +
      '[t] count(children/*); [t] "columns"',
      'self::row', '@alternative', '*'
  );
  defineSpecialisedRule(
      'abstr-row', 'mathspeak.default', 'mathspeak.brief'
  );
  defineSpecialisedRule(
      'abstr-row', 'mathspeak.default', 'mathspeak.sbrief'
  );
  defineRule(
      'abstr-cell', 'mathspeak.default',
      '[t] "in"; [t] @role (grammar:localRole);',
      'self::cell', '@alternative'
  );

};

});  // goog.scope


sre.AbstractionRules.getInstance().initializer = [
  sre.AbstractionRules.initAbstractionRules_
];

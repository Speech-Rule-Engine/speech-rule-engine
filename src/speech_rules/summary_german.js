// Copyright 2020 Volker Sorge
// Copyright (c) 2020 The MathJax Consortium
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

//
// This work was sponsored by ETH Zurich
//

/**
 * @fileoverview Summary rules for collapsed elements in German.
 * @author v.sorge@mathjax.com (Volker Sorge)
 */

goog.provide('sre.SummaryGerman');

goog.require('sre.MathStore');



/**
 * Rule initialization.
 * @constructor
 * @extends {sre.MathStore}
 */
sre.SummaryGerman = function() {
  sre.SummaryGerman.base(this, 'constructor');
  this.modality = 'summary';
  this.locale = 'de';
};
goog.inherits(sre.SummaryGerman, sre.MathStore);
goog.addSingletonGetter(sre.SummaryGerman);


/**
 * @type {sre.MathStore}
 */
sre.SummaryGerman.mathStore = sre.SummaryGerman.getInstance();


/** @private */
sre.SummaryGerman.defineRule_ = goog.bind(
    sre.SummaryGerman.mathStore.defineRule,
    sre.SummaryGerman.mathStore);


/** @private */
sre.SummaryGerman.defineRuleAlias_ = goog.bind(
    sre.SummaryGerman.mathStore.defineRulesAlias,
    sre.SummaryGerman.mathStore);


/** @private */
sre.SummaryGerman.defineSpecialisedRule_ = goog.bind(
    sre.SummaryGerman.mathStore.defineSpecialisedRule,
    sre.SummaryGerman.mathStore);


/** @private */
sre.SummaryGerman.defineUniqueRuleAlias_ = goog.bind(
    sre.SummaryGerman.mathStore.defineUniqueRuleAlias,
    sre.SummaryGerman.mathStore);


goog.scope(function() {
var defineRule = sre.SummaryGerman.defineRule_;
var defineRuleAlias = sre.SummaryGerman.defineRuleAlias_;
var defineSpecialisedRule = sre.SummaryGerman.defineSpecialisedRule_;
var defineUniqueRuleAlias = sre.SummaryGerman.defineUniqueRuleAlias_;


/**
 * Summary rules.
 * @private
*/
sre.SummaryGerman.initSummaryGerman_ = function() {

  // Identifier
  defineRule(
      'abstr-identifier', 'default.default',
      '[t] "langer Bezeichner"',
      'self::identifier', 'contains(@grammar, "collapsed")'
  );
  defineRule(
      'abstr-identifier', 'default.default',
      '[t] "Bezeichner"',
      'self::identifier'
  );

  // Numbers
  defineRule(
      'abstr-number', 'default.default',
      '[t] "lange Zahl"',
      'self::number', 'contains(@grammar, "collapsed")'
  );
  defineRule(
      'abstr-number', 'default.default',
      '[t] "Zahl"',
      'self::number'
  );

  defineRule(
      'abstr-mixed-number', 'default.default',
      '[t] "langer gemischter Bruch"',
      'self::number', '@role="mixed"', 'contains(@grammar, "collapsed")'
  );
  defineRule(
      'abstr-mixed-number', 'default.default',
      '[t] "gemischter Bruch"',
      'self::number', '@role="mixed"'
  );

  // Text
  defineRule(
      'abstr-text', 'default.default',
      '[t] "Text"',
      'self::text'
  );

  // Functions
  defineRule(
      'abstr-function', 'default.default',
      '[t] "Funktionsausdruck"',
      'self::function'
  );
  defineRule(
      'abstr-function', 'mathspeak.brief',
      '[t] "Funktion"',
      'self::function'
  );
  defineSpecialisedRule(
      'abstr-function', 'mathspeak.brief', 'mathspeak.sbrief'
  );

  defineRule(
      'abstr-lim', 'default.default',
      '[t] "Grenzwertfunktion"',
      'self::function', '@role="limit function"'
  );
  defineRule(
      'abstr-lim', 'mathspeak.brief',
      '[t] "Grenzwert"',
      'self::function', '@role="limit function"'
  );
  defineSpecialisedRule(
      'abstr-lim', 'mathspeak.brief', 'mathspeak.sbrief'
  );
  // TODO: Missing simple function
  // TODO: Application

  // Fraction
  defineRule(
      'abstr-fraction', 'default.default',
      '[t] "Bruch"',
      'self::fraction'
  );

  defineRule(
      'abstr-continued-fraction', 'default.default',
      '[t] "Kettenbruch"',
      'self::fraction',
      'children/*[2]/descendant-or-self::*[@role="ellipsis"]'
  );


  // Roots
  defineRule(
      'abstr-sqrt', 'default.default',
      '[t] "Quadratwurzel"',
      'self::sqrt'
  );

  defineRule(
      'abstr-sqrt-nested', 'default.default',
      '[t] "verschachtelte Quadratwurzel"',
      'self::sqrt',
      'children/*/descendant-or-self::sqrt or' +
      ' children/*/descendant-or-self::root'
  );

  // Content following the root expression.
  defineRule(
      'abstr-root', 'default.default',
      '[t] "Wurzel mit Exponent"; [n] children/*[1] (engine:modality=speech);' +
      ' [t] "Exponentende"',
      'self::root', 'contains(@grammar, "collapsed")',
      'following-sibling::* or ancestor::*/following-sibling::*'
  );
  defineRule(
      'abstr-root', 'default.default',
      '[t] "Wurzel mit Exponent"; [n] children/*[1] (engine:modality=speech)',
      'self::root'
  );
  defineRule(
      'abstr-root', 'mathspeak.brief',
      '[t] "Wurzel"',
      'self::root'
  );
  defineSpecialisedRule(
      'abstr-root', 'mathspeak.brief', 'mathspeak.sbrief'
  );
  // Content following the root expression.
  defineRule(
      'abstr-root-nested', 'default.default',
      '[t] "verschachtelte Wurzel mit Wurzelexponent"; ' +
      '[n] children/*[1] (engine:modality="speech"); [t] "Ende Wurzelexponent"',
      'self::root', 'contains(@grammar, "collapsed")',
      'children/*/descendant-or-self::sqrt or' +
      ' children/*/descendant-or-self::root',
      'following-sibling::* or ancestor::*/following-sibling::*'
  );
  defineRule(
      'abstr-root-nested', 'default.default',
      '[t] "verschachtelte Wurzel mit Exponent"; ' +
      '[n] children/*[1] (engine:modality="speech")',
      'self::root', 'children/*/descendant-or-self::sqrt or' +
      ' children/*/descendant-or-self::root'
  );
  defineRule(
      'abstr-root-nested', 'mathspeak.brief',
      '[t] "verschachtelte Wurzel"',
      'self::root', 'children/*/descendant-or-self::sqrt or ' +
      'children/*/descendant-or-self::root'
  );
  defineSpecialisedRule(
      'abstr-root-nested', 'mathspeak.brief', 'mathspeak.sbrief'
  );

  // Superscript
  defineRule(
      'abstr-superscript', 'default.default',
      '[t] "Potenz"',
      'self::superscript'
  );

  // Subscript
  defineRule(
      'abstr-subscript', 'default.default',
      '[t] "Index"',
      'self::subscript'
  );

  // Subsuperscript
  defineRule(
      'abstr-subsup', 'default.default',
      '[t] "Potenz mit Index"',
      'self::superscript',
      'name(children/*[1])="subscript"'
  );

  // Infixop
  defineRule(
      'abstr-infixop', 'default.default',
      '[t] @role (grammar:localRole); [t] "mit"; [t] count(./children/*);' +
      ' [t] "Elementen"',
      'self::infixop'
  );
  defineRule(
      'abstr-infixop', 'default.default',
      '[t] @role (grammar:localRole); ' +
      '[t] "mit veränderlicher Anzahl an Elementen"',
      'self::infixop', 'count(./children/*)>2',
      './children/punctuation[@role="ellipsis"]'
  );
  defineRule(
      'abstr-infixop', 'mathspeak.brief',
      '[t] @role (grammar:localRole)',
      'self::infixop'
  );
  defineSpecialisedRule(
      'abstr-infixop', 'mathspeak.brief', 'mathspeak.sbrief'
  );

  defineRule(
      'abstr-addition', 'default.default',
      '[t] "Summe mit"; [t] count(./children/*); [t] "Summanden"',
      'self::infixop', '@role="addition"'
  );
  defineRule(
      'abstr-addition', 'mathspeak.brief',
      '[t] "Summe"',
      'self::infixop', '@role="addition"'
  );
  defineSpecialisedRule(
      'abstr-addition', 'mathspeak.brief', 'mathspeak.sbrief'
  );
  defineRule(
      'abstr-var-addition', 'default.default',
      '[t] "Summe mit veränderlicher Anzahl an Summanden"',
      'self::infixop', '@role="addition"',
      'count(./children/*)>2', './children/punctuation[@role="ellipsis"]'
  );

  defineRule(
      'abstr-multiplication', 'default.default',
      '[t] "Produkt mit"; [t] count(./children/*); [t] "Faktoren"',
      'self::infixop', '@role="multiplication"'
  );
  defineRule(
      'abstr-multiplication', 'mathspeak.brief',
      '[t] "Produkt"',
      'self::infixop', '@role="multiplication"'
  );
  defineSpecialisedRule(
      'abstr-multiplication', 'mathspeak.brief', 'mathspeak.sbrief'
  );
  defineRuleAlias(
      'abstr-multiplication',
      'self::infixop', '@role="implicit"'
  );
  defineRule(
      'abstr-var-multiplication', 'default.default',
      '[t] "Produkt mit veränderlicher Anzahl an Faktoren"',
      'self::infixop', '@role="multiplication"',
      'count(./children/*)>2', './children/punctuation[@role="ellipsis"]'
  );
  defineRuleAlias(
      'abstr-var-multiplication',
      'self::infixop', '@role="implicit"',
      'count(./children/*)>2', './children/punctuation[@role="ellipsis"]'
  );


  // Vector
  defineRule(
      'abstr-vector', 'default.default',
      '[t] count(./children/*) ; [t] "dimensionaler Vektor"',
      'self::vector'
  );
  defineRule(
      'abstr-vector', 'mathspeak.brief',
      '[t] "Vektor"',
      'self::vector'
  );
  defineSpecialisedRule(
      'abstr-vector', 'mathspeak.brief', 'mathspeak.sbrief'
  );
  defineRule(
      'abstr-var-vector', 'default.default',
      '[t] "n dimensionaler Vektor"',
      'self::vector',
      './children/*/children/punctuation[@role="ellipsis"]'
  );

  defineRule(
      'abstr-binomial', 'default.default',
      '[t] "Binomialkoeffizient"',
      'self::vector', '@role="binomial"'
  );
  // These two are needed to avoid the vector rule firing.
  defineSpecialisedRule(
      'abstr-binomial', 'default.default', 'mathspeak.brief');
  defineSpecialisedRule(
      'abstr-binomial', 'default.default', 'mathspeak.sbrief');


  // Matrix
  defineRule(
      'abstr-determinant', 'default.default',
      '[t] count(./children/*); [t] "dimensionale Determinante"',
      'self::matrix', '@role="determinant"'
  );
  defineRule(
      'abstr-determinant', 'mathspeak.brief',
      '[t] "Determinante"',
      'self::matrix', '@role="determinant"'
  );
  defineSpecialisedRule(
      'abstr-determinant', 'mathspeak.brief', 'mathspeak.sbrief'
  );
  defineRule(
      'abstr-var-determinant', 'default.default',
      '[t] "n dimensionale Determinante"',
      'self::matrix', '@role="determinant"',
      './children/*/children/*/children/punctuation[@role="ellipsis"]'
  );

  defineRule(
      'abstr-squarematrix', 'default.default',
      '[t] count(./children/*); [t] "dimensionale quadratische Matrize"',
      'self::matrix', '@role="squarematrix"'
  );
  defineRule(
      'abstr-squarematrix', 'mathspeak.brief',
      '[t] "quadratische Matrize"',
      'self::matrix', '@role="squarematrix"'
  );
  defineSpecialisedRule(
      'abstr-squarematrix', 'mathspeak.brief', 'mathspeak.sbrief'
  );

  defineRule(
      'abstr-rowvector', 'default.default',
      '[t] count(./children/row/children/*); [t] "dimensionaler Zeilenvektor"',
      'self::matrix', '@role="rowvector"'
  );
  defineRule(
      'abstr-rowvector', 'mathspeak.brief',
      '[t] "Zeilenvektor"',
      'self::matrix', '@role="rowvector"'
  );
  defineSpecialisedRule(
      'abstr-rowvector', 'mathspeak.brief', 'mathspeak.sbrief'
  );
  defineRule(
      'abstr-var-matrix', 'default.default',
      '[t] "n dimensionaler Zeilenvektor"',
      'self::matrix', '@role="rowvector"',
      './children/*/children/*/children/punctuation[@role="ellipsis"]'
  );

  defineRule(
      'abstr-matrix', 'default.default',
      '[t] count(children/*);  [t] "mal";' +
      '[t] count(children/*[1]/children/*); [t] "Matrize"',
      'self::matrix'
  );
  defineRule(
      'abstr-matrix', 'mathspeak.brief',
      '[t] "Matrize"',
      'self::matrix'
  );
  defineSpecialisedRule(
      'abstr-matrix', 'mathspeak.brief', 'mathspeak.sbrief'
  );
  defineRule(
      'abstr-var-matrix', 'default.default',
      '[t] "n mal m dimensionale Matrize"',
      'self::matrix',
      './children/*/children/*/children/punctuation[@role="ellipsis"]'
  );


  // Cases
  defineRule(
      'abstr-cases', 'default.default',
      '[t] "Fallunterscheidung";' +
      '[t] "mit"; [t] count(children/*); [t] "Fällen"',
      'self::cases'
  );
  defineRule(
      'abstr-cases', 'mathspeak.brief',
      '[t] "Fallunterscheidung"',
      'self::cases'
  );
  defineSpecialisedRule(
      'abstr-cases', 'mathspeak.brief', 'mathspeak.sbrief'
  );
  defineRule(
      'abstr-var-cases', 'default.default',
      '[t] "Fallunterscheidung mit veränderlicher Anzahl an Fällen"',
      'self::cases',
      './children/row/children/cell/children/punctuation[@role="ellipsis"]' +
      'or ./children/line/children/punctuation[@role="ellipsis"]'
  );


  // Punctuated
  defineRule(
      'abstr-punctuated', 'default.default',
      '[t] "mit"; [n] content/*[1]; [t] "getrennte Liste der Länge"; ' +
      '[t] count(children/*) - count(content/*)',
      'self::punctuated'
  );
  defineRule(
      'abstr-punctuated', 'mathspeak.brief',
      '[t] "mit"; [n] content/*[1]; [t] "getrennte Liste";',
      'self::punctuated'
  );
  defineSpecialisedRule(
      'abstr-punctuated', 'mathspeak.brief', 'mathspeak.sbrief'
  );
  defineRule(
      'abstr-var-punctuated', 'default.default',
      '[t] "mit"; [n] content/*[1]; [t] "getrennte Liste";' +
      '[t] "veränderlicher Länge"',
      'self::punctuated',
      './children/punctuation[@role="ellipsis"]'
  );


  defineRule(
      'abstr-bigop', 'default.default',
      '[n] content/*[1]',
      'self::bigop'
  );

  defineRule(
      'abstr-integral', 'default.default',
      '[t] "Integral"',
      '@role="integral"'
  );

  defineRule(
      'abstr-relation', 'default.default',
      '[t] @role (grammar:localRole);',
      'self::relseq', 'count(./children/*)=2'
  );

  defineRule(
      'abstr-relation-seq', 'default.default',
      '[t] @role (grammar:localRole, join:""); [t] "ssequenz";' +
      ' [t] "mit"; [t] count(./children/*); [t] "Elementen"',
      'self::relseq', 'count(./children/*)>2'
  );
  defineRule(
      'abstr-relation-seq', 'mathspeak.brief',
      '[t] @role (grammar:localRole, join:""); [t] "ssequenz"',
      'self::relseq', 'count(./children/*)>2'
  );
  defineSpecialisedRule(
      'abstr-relation-seq', 'mathspeak.brief', 'mathspeak.sbrief'
  );
  defineRule(
      'abstr-var-relation', 'default.default',
      '[t] @role (grammar:localRole, join:""); [t] "ssequenz";' +
      '[t] "mit veränderlicher Anzahl an Elementen"',
      'self::relseq', 'count(./children/*)>2',
      './children/punctuation[@role="ellipsis"]'
  );

  defineUniqueRuleAlias(
      'abstr-relation', 'default.default',
      'self::multirel',
      '@role!="unknown"', 'count(./children/*)>2'
  );
  defineRuleAlias(
      'abstr-var-relation',
      'self::multirel', '@role!="unknown"',
      'count(./children/*)>2', './children/punctuation[@role="ellipsis"]'
  );

  defineRule(
      'abstr-multirel', 'default.default',
      '[t] "Relationsequenz";' +
      ' [t] "mit"; [t] count(./children/*); [t] "Elementen"',
      'self::multirel', 'count(./children/*)>2'
  );
  defineRule(
      'abstr-multirel', 'mathspeak.brief',
      '[t] "Relationsequenz"',
      'self::multirel', 'count(./children/*)>2'
  );
  defineSpecialisedRule(
      'abstr-multirel', 'mathspeak.brief', 'mathspeak.sbrief'
  );
  defineRule(
      'abstr-var-multirel', 'default.default',
      '[t] "Relationsequenz mit veränderlicher Anzahl an Elementen"',
      'self::multirel', 'count(./children/*)>2',
      './children/punctuation[@role="ellipsis"]'
  );

  defineRule(
      'abstr-table', 'default.default',
      '[t] "Tabelle mit"; ' +
      '[t] count(children/*); [t] "Zeilen und";' +
      '[t] count(children/*[1]/children/*); [t] "Spalten"',
      'self::table'
  );
  defineRule(
      'abstr-line', 'default.default',
      '[t] "in"; [t] @role (grammar:localRole);',
      'self::line'
  );
  defineRule(
      'abstr-row', 'default.default',
      '[t] "in"; [t] @role (grammar:localRole);' +
      '[t] count(preceding-sibling::..); [t] "mit";' +
      '[t] count(children/*); [t] "Spalten"',
      'self::row'
  );
  defineRule(
      'abstr-cell', 'default.default',
      '[t] "in"; [t] @role (grammar:localRole);',
      'self::cell'
  );

};

});  // goog.scope


sre.SummaryGerman.getInstance().initializer = [
  sre.SummaryGerman.initSummaryGerman_
];

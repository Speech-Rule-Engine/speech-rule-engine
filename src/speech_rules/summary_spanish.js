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
 * @fileoverview Summary rules for collapsed elements.
 * @author v.sorge@mathjax.com (Volker Sorge)
 */

goog.provide('sre.SummarySpanish');

goog.require('sre.MathStore');



/**
 * Rule initialization.
 * @constructor
 * @extends {sre.MathStore}
 */
sre.SummarySpanish = function() {
  sre.SummarySpanish.base(this, 'constructor');

  this.locale = 'es';
};
goog.inherits(sre.SummarySpanish, sre.MathStore);
goog.addSingletonGetter(sre.SummarySpanish);


/**
 * @type {sre.MathStore}
 */
sre.SummarySpanish.mathStore = sre.SummarySpanish.getInstance();


/** @private */
sre.SummarySpanish.defineRule_ = goog.bind(
    sre.SummarySpanish.mathStore.defineRule,
    sre.SummarySpanish.mathStore);


/** @private */
sre.SummarySpanish.defineRuleAlias_ = goog.bind(
    sre.SummarySpanish.mathStore.defineRulesAlias,
    sre.SummarySpanish.mathStore);


/** @private */
sre.SummarySpanish.defineSpecialisedRule_ = goog.bind(
    sre.SummarySpanish.mathStore.defineSpecialisedRule,
    sre.SummarySpanish.mathStore);


/** @private */
sre.SummarySpanish.defineUniqueRuleAlias_ = goog.bind(
    sre.SummarySpanish.mathStore.defineUniqueRuleAlias,
    sre.SummarySpanish.mathStore);


goog.scope(function() {
var defineRule = sre.SummarySpanish.defineRule_;
var defineRuleAlias = sre.SummarySpanish.defineRuleAlias_;
var defineSpecialisedRule = sre.SummarySpanish.defineSpecialisedRule_;
var defineUniqueRuleAlias = sre.SummarySpanish.defineUniqueRuleAlias_;


/**
 * Summary rules.
 * @private
*/
sre.SummarySpanish.initSummarySpanish_ = function() {
  //TODO: Need some means to prioritise these rules over other rules.
  // Collapsed prefix
  defineRule(
      'abstr-collapsed', 'mathspeak.default',
      '[n] . (grammar:collapsed); [t] "plegado"',
      'self::*', '@alternative', 'not(@alternative="summary")',
      'not(contains(@grammar, "collapsed"))'
  );

  // Identifier
  defineRule(
      'abstr-identifier', 'mathspeak.default',
      '[t] "identificador largo"',
      'self::identifier', '@alternative',
      'self::*', 'self::*', 'self::*', 'self::*'
  );
  defineRule(
      'abstr-identifier', 'mathspeak.default',
      '[t] "identificador"',
      'self::identifier', '@alternative="summary"', '@alternative',
      'self::*', 'self::*', 'self::*', 'self::*'
  );
  defineRule(
      'abstr-identifier', 'mathspeak.brief',
      '[t] "identificador"',
      'self::identifier', '@alternative',
      'self::*', 'self::*', 'self::*', 'self::*'
  );
  defineSpecialisedRule(
      'abstr-identifier', 'mathspeak.brief', 'mathspeak.sbrief'
  );

  // Numbers
  defineRule(
      'abstr-number', 'mathspeak.default',
      '[t] "número largo"',
      'self::number', '@alternative'
  );
  defineRule(
      'abstr-number', 'mathspeak.default',
      '[t] "número"',
      'self::number', '@alternative', '@alternative="summary"'
  );
  defineRule(
      'abstr-number', 'mathspeak.brief',
      '[t] "número"',
      'self::number', '@alternative'
  );
  defineSpecialisedRule(
      'abstr-number', 'mathspeak.brief', 'mathspeak.sbrief'
  );

  defineRule(
      'abstr-mixed-number', 'mathspeak.default',
      '[t] "número largo mixto"',
      'self::number', '@alternative', '@role="mixed"'
  );
  defineRule(
      'abstr-mixed-number', 'mathspeak.brief',
      '[t] "numero mixto"',
      'self::number', '@alternative', '@role="mixed"'
  );
  defineSpecialisedRule(
      'abstr-mixed-number', 'mathspeak.brief', 'mathspeak.sbrief'
  );

  // Text
  defineRule(
      'abstr-text', 'mathspeak.default',
      '[t] "texto"',
      'self::text', '@alternative'
  );

  // Functions
  defineRule(
      'abstr-function', 'mathspeak.default',
      '[t] "expresión funcional"',
      'self::function', '@alternative',
      'self::*'
  );
  defineRule(
      'abstr-function', 'mathspeak.brief',
      '[t] "función"',
      'self::function', '@alternative',
      'self::*'
  );
  defineSpecialisedRule(
      'abstr-function', 'mathspeak.brief', 'mathspeak.sbrief'
  );

  defineRule(
      'abstr-lim', 'mathspeak.default',
      '[t] "función de límite"',
      'self::function', '@alternative', '@role="limit function"'
  );
  defineRule(
      'abstr-lim', 'mathspeak.brief',
      '[t] "límite"',
      'self::function', '@alternative', '@role="limit function"'
  );
  defineSpecialisedRule(
      'abstr-lim', 'mathspeak.brief', 'mathspeak.sbrief'
  );


  // Fraction
  defineRule(
      'abstr-fraction', 'mathspeak.default',
      '[t] "fracción"',
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
      '[t] "fracción continua"',
      'self::fraction', '@alternative',
      'children/*[2]/descendant-or-self::*[@role="ellipsis"]',
      'self::*', 'self::*'
  );
  defineRule(
      'abstr-continued-fraction', 'mathspeak.brief',
      '[t] "frac continua"',
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
      '[t] "raíz cuadrada"',
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
      '[t] "raíz cuadrada anidada"',
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

  defineRule(
      'abstr-root', 'mathspeak.default',
      '[t] "raíz del índice"; [n] children/*[1]; [t] "finalizar de índice"',
      'self::root', '@alternative',
      'following-sibling::* or ancestor::*/following-sibling::*'
  );
  defineRule(
      'abstr-root', 'mathspeak.brief',
      '[t] "raíz"',
      'self::root', '@alternative'
  );
  defineSpecialisedRule(
      'abstr-root', 'mathspeak.brief', 'mathspeak.sbrief'
  );
  defineRule(
      'abstr-root-nested', 'mathspeak.default',
      '[t] "raíz anidada del índice"; [n] children/*[1]',
      'self::root', '@alternative',
      'children/*/descendant-or-self::sqrt or' +
      ' children/*/descendant-or-self::root'
  );
  // Content following the root expression.
  defineRule(
      'abstr-root-nested', 'mathspeak.default',
      '[t] "raíz anidada del índice"; [n] children/*[1];' +
      ' [t] "finalizar de índice"',
      'self::root', '@alternative',
      'children/*/descendant-or-self::sqrt or' +
      ' children/*/descendant-or-self::root',
      'following-sibling::* or ancestor::*/following-sibling::*'
  );
  defineRule(
      'abstr-root-nested', 'mathspeak.brief',
      '[t] "raíz anidada"',
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
      '[t] "potencia"',
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
      '[t] "subíndice"',
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
      '[t] "potencia con subíndice"',
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
      '[t] @role (grammar:localRole); [t] "con"; [t] count(./children/*);' +
      ' [t] "elementos"',
      'self::infixop', '@alternative'
  );
  defineRule(
      'abstr-infixop', 'mathspeak.default',
      '[t] @role (grammar:localRole); [t] "con una cantidad variable de' +
      ' elementos"',
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
      '[t] "suma con"; [t] count(./children/*); [t] "sumandos"',
      'self::infixop', '@alternative', '@role="addition"'
  );
  defineRule(
      'abstr-addition', 'mathspeak.brief',
      '[t] "suma"',
      'self::infixop', '@alternative', '@role="addition"'
  );
  defineSpecialisedRule(
      'abstr-addition', 'mathspeak.brief', 'mathspeak.sbrief'
  );
  defineRule(
      'abstr-var-addition', 'mathspeak.default',
      '[t] "suma con número variable de sumandos"',
      'self::infixop', '@alternative', '@role="addition"',
      'count(./children/*)>2', './children/punctuation[@role="ellipsis"]'
  );

  defineRule(
      'abstr-multiplication', 'mathspeak.default',
      '[t] "producto con"; [t] count(./children/*); [t] "factores"',
      'self::infixop', '@alternative', '@role="multiplication"'
  );
  defineRule(
      'abstr-multiplication', 'mathspeak.brief',
      '[t] "producto"',
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
      '[t] "producto con una cantidad variable de factores"',
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
      '[t] "vector de dimensión"; [t] count(./children/*)',
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
      '[t] "vector de dimensión n"',
      'self::vector', '@alternative',
      './children/*/children/punctuation[@role="ellipsis"]'
  );

  defineRule(
      'abstr-binomial', 'mathspeak.default',
      '[t] "binomio"',
      'self::vector', '@alternative', '@role="binomial"'
  );
  defineSpecialisedRule(
      'abstr-binomial', 'mathspeak.default', 'mathspeak.brief');
  defineSpecialisedRule(
      'abstr-binomial', 'mathspeak.default', 'mathspeak.sbrief');


  // Matrix
  defineRule(
      'abstr-determinant', 'mathspeak.default',
      '[t] "determinante de dimensión"; [t] count(./children/*)',
      'self::matrix', '@alternative', '@role="determinant"', 'self::*'
  );
  defineRule(
      'abstr-determinant', 'mathspeak.brief',
      '[t] "determinante"',
      'self::matrix', '@alternative', '@role="determinant"', 'self::*'
  );
  defineSpecialisedRule(
      'abstr-determinant', 'mathspeak.brief', 'mathspeak.sbrief'
  );
  defineRule(
      'abstr-var-determinant', 'mathspeak.default',
      '[t] "determinante de dimensión n"',
      'self::matrix', '@alternative', '@role="determinant"',
      './children/*/children/*/children/punctuation[@role="ellipsis"]'
  );

  defineRule(
      'abstr-squarematrix', 'mathspeak.default',
      '[t] "matriz cuadrada de dimensión"; [t] count(./children/*)',
      'self::matrix', '@alternative', '@role="squarematrix"'
  );
  defineRule(
      'abstr-squarematrix', 'mathspeak.brief',
      '[t] "matriz cuadrada"',
      'self::matrix', '@alternative', '@role="squarematrix"'
  );
  defineSpecialisedRule(
      'abstr-squarematrix', 'mathspeak.brief', 'mathspeak.sbrief'
  );

  defineRule(
      'abstr-rowvector', 'mathspeak.default',
      '[t] "vector fila de dimensión"; [t] count(./children/row/children/*) ',
      'self::matrix', '@alternative', '@role="rowvector"'
  );
  defineRule(
      'abstr-rowvector', 'mathspeak.brief',
      '[t] "vector fila"',
      'self::matrix', '@alternative', '@role="rowvector"'
  );
  defineSpecialisedRule(
      'abstr-rowvector', 'mathspeak.brief', 'mathspeak.sbrief'
  );
  defineRule(
      'abstr-var-matrix', 'mathspeak.default',
      '[t] "vector fila de dimensión n"',
      'self::matrix', '@alternative', '@role="rowvector"',
      './children/*/children/*/children/punctuation[@role="ellipsis"]'
  );

  defineRule(
      'abstr-matrix', 'mathspeak.default',
      '[t] count(children/*);  [t] "por";' +
      '[t] count(children/*[1]/children/*); [t] "matriz"',
      'self::matrix', '@alternative'
  );
  defineRule(
      'abstr-matrix', 'mathspeak.brief',
      '[t] "matriz"',
      'self::matrix', '@alternative'
  );
  defineSpecialisedRule(
      'abstr-matrix', 'mathspeak.brief', 'mathspeak.sbrief'
  );
  defineRule(
      'abstr-var-matrix', 'mathspeak.default',
      '[t] "matriz de dimensión n por m"',
      'self::matrix', '@alternative',
      './children/*/children/*/children/punctuation[@role="ellipsis"]'
  );


  // Cases
  defineRule(
      'abstr-cases', 'mathspeak.default',
      '[t] "declaración de caso";' +
      '[t] "con"; [t] count(children/*); [t] "casos"',
      'self::cases', '@alternative'
  );
  defineRule(
      'abstr-cases', 'mathspeak.brief',
      '[t] "declaración de caso"',
      'self::cases', '@alternative'
  );
  defineSpecialisedRule(
      'abstr-cases', 'mathspeak.brief', 'mathspeak.sbrief'
  );
  defineRule(
      'abstr-var-cases', 'mathspeak.default',
      '[t] "declaración de caso con número variable de casos"',
      'self::cases', '@alternative',
      './children/row/children/cell/children/punctuation[@role="ellipsis"]' +
      'or ./children/line/children/punctuation[@role="ellipsis"]'
  );


  // Punctuated
  defineRule(
      'abstr-punctuated', 'mathspeak.default',
      '[t] "lista separada por"; [n] content/*[1]; ' +
      '[t] "de longitud"; [t] count(children/*) - count(content/*)',
      'self::punctuated', '@alternative'
  );
  defineRule(
      'abstr-punctuated', 'mathspeak.brief',
      '[t] "lista separada por"; [n] content/*[1]',
      'self::punctuated', '@alternative'
  );
  defineSpecialisedRule(
      'abstr-punctuated', 'mathspeak.brief', 'mathspeak.sbrief'
  );
  defineRule(
      'abstr-var-punctuated', 'mathspeak.default',
      '[t] "lista separada por"; [n] content/*[1]',
      '[t] "de longitud variable"',
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
      '[t] "secuencia de"; [t] @role (grammar:localRole);' +
      ' [t] "con"; [t] count(./children/*); [t] "elementos"',
      'self::relseq', '@alternative', 'count(./children/*)>2'
  );
  defineRule(
      'abstr-relation', 'mathspeak.brief',
      '[t] "secuencia de"; [t] @role (grammar:localRole)',
      'self::relseq', '@alternative', 'count(./children/*)>2'
  );
  defineSpecialisedRule(
      'abstr-relation', 'mathspeak.brief', 'mathspeak.sbrief'
  );
  defineRule(
      'abstr-var-relation', 'mathspeak.default',
      '[t] "secuencia de"; [t] @role (grammar:localRole);' +
      ' [t] "con una cantidad variable de elementos"',
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
      '[t] "secuencia de relación";' +
      ' [t] "con"; [t] count(./children/*); [t] "elementos"',
      'self::multirel', '@alternative', 'count(./children/*)>2'
  );
  defineRule(
      'abstr-multirel', 'mathspeak.brief',
      '[t] "secuencia de relación"',
      'self::multirel', '@alternative', 'count(./children/*)>2'
  );
  defineSpecialisedRule(
      'abstr-multirel', 'mathspeak.brief', 'mathspeak.sbrief'
  );
  defineRule(
      'abstr-var-multirel', 'mathspeak.default',
      '[t] "secuencia de relación con número variable de elementos"',
      'self::multirel', '@alternative', 'count(./children/*)>2',
      './children/punctuation[@role="ellipsis"]'
  );

  defineRule(
      'abstr-table', 'mathspeak.default',
      '[t] "mesa con"; ' +
      '[t] count(children/*); [t] "filas y";' +
      '[t] count(children/*[1]/children/*); [t] "columnas"',
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
      '[t] "en"; [t] @role (grammar:localRole);',
      'self::line', '@alternative'
  );
  defineRule(
      'abstr-row', 'mathspeak.default',
      '[t] "en"; [t] @role (grammar:localRole);' +
      '[t] count(preceding-sibling::..); [t] "con";' +
      '[t] count(children/*); [t] "columnas"',
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
      '[t] "en"; [t] @role (grammar:localRole);',
      'self::cell', '@alternative'
  );

};

});  // goog.scope


sre.SummarySpanish.getInstance().initializer = [
  sre.SummarySpanish.initSummarySpanish_
];

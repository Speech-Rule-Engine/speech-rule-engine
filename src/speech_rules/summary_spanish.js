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
  this.modality = 'summary';
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

  // Initial rule
  defineRule(
      'stree', 'default.default',
      '[n] ./*[1]', 'self::stree');

  // Identifier
  defineRule(
      'abstr-identifier', 'default.default',
      '[t] "identificador largo"',
      'self::identifier', 'contains(@grammar, "collapsed")'
  );
  defineRule(
      'abstr-identifier', 'default.default',
      '[t] "identificador"',
      'self::identifier'
  );

  // Numbers
  defineRule(
      'abstr-number', 'default.default',
      '[t] "número largo"',
      'self::number', 'contains(@grammar, "collapsed")'
  );
  defineRule(
      'abstr-number', 'default.default',
      '[t] "número"',
      'self::number'
  );

  defineRule(
      'abstr-mixed-number', 'default.default',
      '[t] "número largo mixto"',
      'self::number', '@role="mixed"', 'contains(@grammar, "collapsed")'
  );
  defineRule(
      'abstr-mixed-number', 'default.default',
      '[t] "número mixto"',
      'self::number', '@role="mixed"'
  );

  // Text
  defineRule(
      'abstr-text', 'default.default',
      '[t] "texto"',
      'self::text'
  );

  // Functions
  defineRule(
      'abstr-function', 'default.default',
      '[t] "expresión funcional"',
      'self::function'
  );
  defineRule(
      'abstr-function', 'mathspeak.brief',
      '[t] "función"',
      'self::function'
  );
  defineSpecialisedRule(
      'abstr-function', 'mathspeak.brief', 'mathspeak.sbrief'
  );

  defineRule(
      'abstr-lim', 'default.default',
      '[t] "función de límite"',
      'self::function', '@role="limit function"'
  );
  defineRule(
      'abstr-lim', 'mathspeak.brief',
      '[t] "límite"',
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
      '[t] "fracción"',
      'self::fraction'
  );
  defineRule(
      'abstr-fraction', 'mathspeak.brief',
      '[t] "frac"',
      'self::fraction'
  );
  defineSpecialisedRule(
      'abstr-fraction', 'mathspeak.brief', 'mathspeak.sbrief'
  );

  defineRule(
      'abstr-continued-fraction', 'default.default',
      '[t] "fracción continua"',
      'self::fraction',
      'children/*[2]/descendant-or-self::*[@role="ellipsis"]'
  );
  defineRule(
      'abstr-continued-fraction', 'mathspeak.brief',
      '[t] "frac continua"',
      'self::fraction',
      'children/*[2]/descendant-or-self::*[@role="ellipsis"]'
  );
  defineSpecialisedRule(
      'abstr-continued-fraction', 'mathspeak.brief', 'mathspeak.sbrief'
  );


  // Roots
  defineRule(
      'abstr-sqrt', 'default.default',
      '[t] "raíz cuadrada"',
      'self::sqrt'
  );

  defineRule(
      'abstr-sqrt-nested', 'default.default',
      '[t] "raíz cuadrada anidada"',
      'self::sqrt',
      'children/*/descendant-or-self::sqrt or' +
      ' children/*/descendant-or-self::root'
  );

  // Content following the root expression.
  defineRule(
      'abstr-root', 'default.default',
      '[t] "raíz del índice"; [n] children/*[1] (engine:modality="speech");' +
      ' [t] "finalizar de índice"',
      'self::root', 'contains(@grammar, "collapsed")',
      'following-sibling::* or ancestor::*/following-sibling::*'
  );
  defineRule(
      'abstr-root', 'default.default',
      '[t] "raíz del índice"; [n] children/*[1] (engine:modality=speech)',
      'self::root'
  );
  defineRule(
      'abstr-root', 'mathspeak.brief',
      '[t] "raíz"',
      'self::root'
  );
  defineSpecialisedRule(
      'abstr-root', 'mathspeak.brief', 'mathspeak.sbrief'
  );
  // Content following the root expression.
  defineRule(
      'abstr-root-nested', 'default.default',
      '[t] "raíz anidada del índice"; ' +
      '[n] children/*[1] (engine:modality="speech"); [t] "finalizar de índice"',
      'self::root', 'contains(@grammar, "collapsed")',
      'children/*/descendant-or-self::sqrt or' +
      ' children/*/descendant-or-self::root',
      'following-sibling::* or ancestor::*/following-sibling::*'
  );
  defineRule(
      'abstr-root-nested', 'default.default',
      '[t] "raíz anidada del índice"; ' +
      '[n] children/*[1] (engine:modality="speech")',
      'self::root', 'children/*/descendant-or-self::sqrt or' +
      ' children/*/descendant-or-self::root'
  );
  defineRule(
      'abstr-root-nested', 'mathspeak.brief',
      '[t] "raíz anidada"',
      'self::root', 'children/*/descendant-or-self::sqrt or ' +
      'children/*/descendant-or-self::root'
  );
  defineSpecialisedRule(
      'abstr-root-nested', 'mathspeak.brief', 'mathspeak.sbrief'
  );

  // Superscript
  defineRule(
      'abstr-superscript', 'default.default',
      '[t] "potencia"',
      'self::superscript'
  );

  // Subscript
  defineRule(
      'abstr-subscript', 'default.default',
      '[t] "subíndice"',
      'self::subscript'
  );

  // Subsuperscript
  defineRule(
      'abstr-subsup', 'default.default',
      '[t] "potencia con subíndice"',
      'self::superscript',
      'name(children/*[1])="subscript"'
  );

  // Infixop
  defineRule(
      'abstr-infixop', 'default.default',
      '[t] @role (grammar:localRole); [t] "con"; [t] count(./children/*);' +
      ' [t] "elementos"',
      'self::infixop'
  );
  defineRule(
      'abstr-infixop', 'default.default',
      '[t] @role (grammar:localRole); [t] "con una cantidad variable de' +
      ' elementos"',
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
      '[t] "suma con"; [t] count(./children/*); [t] "sumandos"',
      'self::infixop', '@role="addition"'
  );
  defineRule(
      'abstr-addition', 'mathspeak.brief',
      '[t] "suma"',
      'self::infixop', '@role="addition"'
  );
  defineSpecialisedRule(
      'abstr-addition', 'mathspeak.brief', 'mathspeak.sbrief'
  );
  defineRule(
      'abstr-var-addition', 'default.default',
      '[t] "suma con número variable de sumandos"',
      'self::infixop', '@role="addition"',
      'count(./children/*)>2', './children/punctuation[@role="ellipsis"]'
  );

  defineRule(
      'abstr-multiplication', 'default.default',
      '[t] "producto con"; [t] count(./children/*); [t] "factores"',
      'self::infixop', '@role="multiplication"'
  );
  defineRule(
      'abstr-multiplication', 'mathspeak.brief',
      '[t] "producto"',
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
      '[t] "producto con una cantidad variable de factores"',
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
      '[t] "vector de dimensión"; [t] count(./children/*)',
      'self::vector'
  );
  defineRule(
      'abstr-vector', 'mathspeak.brief',
      '[t] "vector"',
      'self::vector'
  );
  defineSpecialisedRule(
      'abstr-vector', 'mathspeak.brief', 'mathspeak.sbrief'
  );
  defineRule(
      'abstr-var-vector', 'default.default',
      '[t] "vector de dimensión n"',
      'self::vector',
      './children/*/children/punctuation[@role="ellipsis"]'
  );

  defineRule(
      'abstr-binomial', 'default.default',
      '[t] "binomio"',
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
      '[t] "determinante de dimensión"; [t] count(./children/*)',
      'self::matrix', '@role="determinant"'
  );
  defineRule(
      'abstr-determinant', 'mathspeak.brief',
      '[t] "determinante"',
      'self::matrix', '@role="determinant"'
  );
  defineSpecialisedRule(
      'abstr-determinant', 'mathspeak.brief', 'mathspeak.sbrief'
  );
  defineRule(
      'abstr-var-determinant', 'default.default',
      '[t] "determinante de dimensión n"',
      'self::matrix', '@role="determinant"',
      './children/*/children/*/children/punctuation[@role="ellipsis"]'
  );

  defineRule(
      'abstr-squarematrix', 'default.default',
      '[t] "matriz cuadrada de dimensión"; [t] count(./children/*)',
      'self::matrix', '@role="squarematrix"'
  );
  defineRule(
      'abstr-squarematrix', 'mathspeak.brief',
      '[t] "matriz cuadrada"',
      'self::matrix', '@role="squarematrix"'
  );
  defineSpecialisedRule(
      'abstr-squarematrix', 'mathspeak.brief', 'mathspeak.sbrief'
  );

  defineRule(
      'abstr-rowvector', 'default.default',
      '[t] "vector fila de dimensión"; [t] count(./children/row/children/*)',
      'self::matrix', '@role="rowvector"'
  );
  defineRule(
      'abstr-rowvector', 'mathspeak.brief',
      '[t] "vector fila"',
      'self::matrix', '@role="rowvector"'
  );
  defineSpecialisedRule(
      'abstr-rowvector', 'mathspeak.brief', 'mathspeak.sbrief'
  );
  defineRule(
      'abstr-var-matrix', 'default.default',
      '[t] "vector fila de dimensión n"',
      'self::matrix', '@role="rowvector"',
      './children/*/children/*/children/punctuation[@role="ellipsis"]'
  );

  defineRule(
      'abstr-matrix', 'default.default',
      '[t] count(children/*);  [t] "por";' +
      '[t] count(children/*[1]/children/*); [t] "matriz"',
      'self::matrix'
  );
  defineRule(
      'abstr-matrix', 'mathspeak.brief',
      '[t] "matriz"',
      'self::matrix'
  );
  defineSpecialisedRule(
      'abstr-matrix', 'mathspeak.brief', 'mathspeak.sbrief'
  );
  defineRule(
      'abstr-var-matrix', 'default.default',
      '[t] "matriz de dimensión n por m"',
      'self::matrix',
      './children/*/children/*/children/punctuation[@role="ellipsis"]'
  );


  // Cases
  defineRule(
      'abstr-cases', 'default.default',
      '[t] "declaración de caso";' +
      '[t] "con"; [t] count(children/*); [t] "casos"',
      'self::cases'
  );
  defineRule(
      'abstr-cases', 'mathspeak.brief',
      '[t] "declaración de caso"',
      'self::cases'
  );
  defineSpecialisedRule(
      'abstr-cases', 'mathspeak.brief', 'mathspeak.sbrief'
  );
  defineRule(
      'abstr-var-cases', 'default.default',
      '[t] "declaración de caso con número variable de casos"',
      'self::cases',
      './children/row/children/cell/children/punctuation[@role="ellipsis"]' +
      'or ./children/line/children/punctuation[@role="ellipsis"]'
  );


  // Punctuated
  defineRule(
      'abstr-punctuated', 'default.default',
      '[t] "lista separada por"; [n] content/*[1]; ' +
      '[t] "de longitud"; [t] count(children/*) - count(content/*)',
      'self::punctuated'
  );
  defineRule(
      'abstr-punctuated', 'mathspeak.brief',
      '[t] "lista separada por"; [n] content/*[1]',
      'self::punctuated'
  );
  defineSpecialisedRule(
      'abstr-punctuated', 'mathspeak.brief', 'mathspeak.sbrief'
  );
  defineRule(
      'abstr-var-punctuated', 'default.default',
      '[t] "lista separada por"; [n] content/*[1]',
      '[t] "de longitud variable"',
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
      '[t] "integral"',
      '@role="integral"'
  );

  defineRule(
      'abstr-relation', 'default.default',
      '[t] @role (grammar:localRole);',
      'self::relseq', 'count(./children/*)=2'
  );

  defineRule(
      'abstr-relation-seq', 'default.default',
      '[t] "secuencia de"; [t] @role (grammar:localRole);' +
      ' [t] "con"; [t] count(./children/*); [t] "elementos"',
      'self::relseq', 'count(./children/*)>2'
  );
  defineRule(
      'abstr-relation-seq', 'mathspeak.brief',
      '[t] "secuencia de"; [t] @role (grammar:localRole)',
      'self::relseq', 'count(./children/*)>2'
  );
  defineSpecialisedRule(
      'abstr-relation-seq', 'mathspeak.brief', 'mathspeak.sbrief'
  );
  defineRule(
      'abstr-var-relation', 'default.default',
      '[t] "secuencia de"; [t] @role (grammar:localRole);' +
      ' [t] "con una cantidad variable de elementos"',
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
      '[t] "secuencia de relación";' +
      ' [t] "con"; [t] count(./children/*); [t] "elementos"',
      'self::multirel', 'count(./children/*)>2'
  );
  defineRule(
      'abstr-multirel', 'mathspeak.brief',
      '[t] "secuencia de relación"',
      'self::multirel', 'count(./children/*)>2'
  );
  defineSpecialisedRule(
      'abstr-multirel', 'mathspeak.brief', 'mathspeak.sbrief'
  );
  defineRule(
      'abstr-var-multirel', 'default.default',
      '[t] "secuencia de relación con número variable de elementos"',
      'self::multirel', 'count(./children/*)>2',
      './children/punctuation[@role="ellipsis"]'
  );

  defineRule(
      'abstr-table', 'default.default',
      '[t] "mesa con"; ' +
      '[t] count(children/*); [t] "filas y";' +
      '[t] count(children/*[1]/children/*); [t] "columnas"',
      'self::table'
  );
  defineRule(
      'abstr-line', 'default.default',
      '[t] "en"; [t] @role (grammar:localRole);',
      'self::line'
  );
  defineRule(
      'abstr-row', 'default.default',
      '[t] "en"; [t] @role (grammar:localRole);' +
      '[t] count(preceding-sibling::..); [t] "con";' +
      '[t] count(children/*); [t] "columnas"',
      'self::row'
  );
  defineRule(
      'abstr-cell', 'default.default',
      '[t] "en"; [t] @role (grammar:localRole);',
      'self::cell'
  );

};

});  // goog.scope


sre.SummarySpanish.getInstance().initializer = [
  sre.SummarySpanish.initSummarySpanish_
];

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
 * @fileoverview Spanish summary rules for collapsed elements.
 * @author v.sorge@mathjax.com (Volker Sorge)
 */

goog.provide('sre.SummarySpanish');


/**
 * Spanish summary rules.
 */
sre.SummarySpanish = {
  locale: 'es',
  modality: 'summary',
  rules: [
    // Initial rule
    ['Rule',
     'stree', 'default.default',
     '[n] ./*[1]', 'self::stree'],

    // Identifier
    ['Rule',
     'abstr-identifier', 'default.default',
     '[t] "identificador largo"',
     'self::identifier', 'contains(@grammar, "collapsed")'
    ],
    ['Rule',
     'abstr-identifier', 'default.default',
     '[t] "identificador"',
     'self::identifier'
    ],

    // Numbers
    ['Rule',
     'abstr-number', 'default.default',
     '[t] "número largo"',
     'self::number', 'contains(@grammar, "collapsed")'
    ],
    ['Rule',
     'abstr-number', 'default.default',
     '[t] "número"',
     'self::number'
    ],

    ['Rule',
     'abstr-mixed-number', 'default.default',
     '[t] "número largo mixto"',
     'self::number', '@role="mixed"', 'contains(@grammar, "collapsed")'
    ],
    ['Rule',
     'abstr-mixed-number', 'default.default',
     '[t] "número mixto"',
     'self::number', '@role="mixed"'
    ],

    // Text
    ['Rule',
     'abstr-text', 'default.default',
     '[t] "texto"',
     'self::text'
    ],

    // Functions
    ['Rule',
     'abstr-function', 'default.default',
     '[t] "expresión funcional"',
     'self::function'
    ],
    ['Rule',
     'abstr-function', 'mathspeak.brief',
     '[t] "función"',
     'self::function'
    ],
    ['SpecializedRule',
     'abstr-function', 'mathspeak.brief', 'mathspeak.sbrief'
    ],

    ['Rule',
     'abstr-lim', 'default.default',
     '[t] "función de límite"',
     'self::function', '@role="limit function"'
    ],
    ['Rule',
     'abstr-lim', 'mathspeak.brief',
     '[t] "límite"',
     'self::function', '@role="limit function"'
    ],
    ['SpecializedRule',
     'abstr-lim', 'mathspeak.brief', 'mathspeak.sbrief'
    ],
    // TODO: Missing simple function
    // TODO: Application

    // Fraction
    ['Rule',
     'abstr-fraction', 'default.default',
     '[t] "fracción"',
     'self::fraction'
    ],
    ['Rule',
     'abstr-fraction', 'mathspeak.brief',
     '[t] "frac"',
     'self::fraction'
    ],
    ['SpecializedRule',
     'abstr-fraction', 'mathspeak.brief', 'mathspeak.sbrief'
    ],

    ['Rule',
     'abstr-continued-fraction', 'default.default',
     '[t] "fracción continua"',
     'self::fraction',
     'children/*[2]/descendant-or-self::*[@role="ellipsis"]'
    ],
    ['Rule',
     'abstr-continued-fraction', 'mathspeak.brief',
     '[t] "frac continua"',
     'self::fraction',
     'children/*[2]/descendant-or-self::*[@role="ellipsis"]'
    ],
    ['SpecializedRule',
     'abstr-continued-fraction', 'mathspeak.brief', 'mathspeak.sbrief'
    ],


    // Roots
    ['Rule',
     'abstr-sqrt', 'default.default',
     '[t] "raíz cuadrada"',
     'self::sqrt'
    ],

    ['Rule',
     'abstr-sqrt-nested', 'default.default',
     '[t] "raíz cuadrada anidada"',
     'self::sqrt',
     'children/*/descendant-or-self::sqrt or' +
     ' children/*/descendant-or-self::root'
    ],

    /**
     * @override
     */
    ['Rule',
     'abstr-root', 'default.default',
     '[t] "raíz del índice"; [n] children/*[1] (engine:modality=speech)',
     'self::root'
    ],
    ['Rule',
     'abstr-root', 'mathspeak.brief',
     '[t] "raíz"',
     'self::root'
    ],
    ['SpecializedRule',
     'abstr-root', 'mathspeak.brief', 'mathspeak.sbrief'
    ],
    ['Rule',
     'abstr-root-nested', 'default.default',
     '[t] "raíz anidada del índice"; ' +
     '[n] children/*[1] (engine:modality="speech")',
     'self::root', 'children/*/descendant-or-self::sqrt or' +
     ' children/*/descendant-or-self::root'
    ],
    ['Rule',
     'abstr-root-nested', 'mathspeak.brief',
     '[t] "raíz anidada"',
     'self::root', 'children/*/descendant-or-self::sqrt or ' +
     'children/*/descendant-or-self::root'
    ],
    ['SpecializedRule',
     'abstr-root-nested', 'mathspeak.brief', 'mathspeak.sbrief'
    ],

    // Superscript
    ['Rule',
     'abstr-superscript', 'default.default',
     '[t] "potencia"',
     'self::superscript'
    ],

    // Subscript
    ['Rule',
     'abstr-subscript', 'default.default',
     '[t] "subíndice"',
     'self::subscript'
    ],

    // Subsuperscript
    ['Rule',
     'abstr-subsup', 'default.default',
     '[t] "potencia con subíndice"',
     'self::superscript',
     'name(children/*[1])="subscript"'
    ],

    // Infixop
    ['Rule',
     'abstr-infixop', 'default.default',
     '[t] @role (grammar:localRole); [t] "con"; [t] count(./children/*);' +
     ' [t] "elementos"',
     'self::infixop'
    ],
    ['Rule',
     'abstr-infixop', 'default.default',
     '[t] @role (grammar:localRole); [t] "con una cantidad variable de' +
     ' elementos"',
     'self::infixop', 'count(./children/*)>2',
     './children/punctuation[@role="ellipsis"]'
    ],
    ['Rule',
     'abstr-infixop', 'mathspeak.brief',
     '[t] @role (grammar:localRole)',
     'self::infixop'
    ],
    ['SpecializedRule',
     'abstr-infixop', 'mathspeak.brief', 'mathspeak.sbrief'
    ],

    ['Rule',
     'abstr-addition', 'default.default',
     '[t] "suma con"; [t] count(./children/*); [t] "sumandos"',
     'self::infixop', '@role="addition"'
    ],
    ['Rule',
     'abstr-addition', 'mathspeak.brief',
     '[t] "suma"',
     'self::infixop', '@role="addition"'
    ],
    ['SpecializedRule',
     'abstr-addition', 'mathspeak.brief', 'mathspeak.sbrief'
    ],
    ['Rule',
     'abstr-var-addition', 'default.default',
     '[t] "suma con número variable de sumandos"',
     'self::infixop', '@role="addition"',
     'count(./children/*)>2', './children/punctuation[@role="ellipsis"]'
    ],

    ['Rule',
     'abstr-multiplication', 'default.default',
     '[t] "producto con"; [t] count(./children/*); [t] "factores"',
     'self::infixop', '@role="multiplication"'
    ],
    ['Rule',
     'abstr-multiplication', 'mathspeak.brief',
     '[t] "producto"',
     'self::infixop', '@role="multiplication"'
    ],
    ['SpecializedRule',
     'abstr-multiplication', 'mathspeak.brief', 'mathspeak.sbrief'
    ],
    ['Aliases',
     'abstr-multiplication',
     'self::infixop', '@role="implicit"'
    ],
    ['Rule',
     'abstr-var-multiplication', 'default.default',
     '[t] "producto con una cantidad variable de factores"',
     'self::infixop', '@role="multiplication"',
     'count(./children/*)>2', './children/punctuation[@role="ellipsis"]'
    ],
    ['Aliases',
     'abstr-var-multiplication',
     'self::infixop', '@role="implicit"',
     'count(./children/*)>2', './children/punctuation[@role="ellipsis"]'
    ],


    // Vector
    ['Rule',
     'abstr-vector', 'default.default',
     '[t] "vector de dimensión"; [t] count(./children/*)',
     'self::vector'
    ],
    ['Rule',
     'abstr-vector', 'mathspeak.brief',
     '[t] "vector"',
     'self::vector'
    ],
    ['SpecializedRule',
     'abstr-vector', 'mathspeak.brief', 'mathspeak.sbrief'
    ],
    ['Rule',
     'abstr-var-vector', 'default.default',
     '[t] "vector de dimensión n"',
     'self::vector',
     './children/*/children/punctuation[@role="ellipsis"]'
    ],

    ['Rule',
     'abstr-binomial', 'default.default',
     '[t] "binomio"',
     'self::vector', '@role="binomial"'
    ],
    // These two are needed to avoid the vector rule firing.
    ['SpecializedRule',
     'abstr-binomial', 'default.default', 'mathspeak.brief'],
    ['SpecializedRule',
     'abstr-binomial', 'default.default', 'mathspeak.sbrief'],


    // Matrix
    ['Rule',
     'abstr-determinant', 'default.default',
     '[t] "determinante de dimensión"; [t] count(./children/*)',
     'self::matrix', '@role="determinant"'
    ],
    ['Rule',
     'abstr-determinant', 'mathspeak.brief',
     '[t] "determinante"',
     'self::matrix', '@role="determinant"'
    ],
    ['SpecializedRule',
     'abstr-determinant', 'mathspeak.brief', 'mathspeak.sbrief'
    ],
    ['Rule',
     'abstr-var-determinant', 'default.default',
     '[t] "determinante de dimensión n"',
     'self::matrix', '@role="determinant"',
     './children/*/children/*/children/punctuation[@role="ellipsis"]'
    ],

    ['Rule',
     'abstr-squarematrix', 'default.default',
     '[t] "matriz cuadrada de dimensión"; [t] count(./children/*)',
     'self::matrix', '@role="squarematrix"'
    ],
    ['Rule',
     'abstr-squarematrix', 'mathspeak.brief',
     '[t] "matriz cuadrada"',
     'self::matrix', '@role="squarematrix"'
    ],
    ['SpecializedRule',
     'abstr-squarematrix', 'mathspeak.brief', 'mathspeak.sbrief'
    ],

    ['Rule',
     'abstr-rowvector', 'default.default',
     '[t] "vector fila de dimensión"; [t] count(./children/row/children/*)',
     'self::matrix', '@role="rowvector"'
    ],
    ['Rule',
     'abstr-rowvector', 'mathspeak.brief',
     '[t] "vector fila"',
     'self::matrix', '@role="rowvector"'
    ],
    ['SpecializedRule',
     'abstr-rowvector', 'mathspeak.brief', 'mathspeak.sbrief'
    ],
    ['Rule',
     'abstr-var-matrix', 'default.default',
     '[t] "vector fila de dimensión n"',
     'self::matrix', '@role="rowvector"',
     './children/*/children/*/children/punctuation[@role="ellipsis"]'
    ],

    ['Rule',
     'abstr-matrix', 'default.default',
     '[t] count(children/*);  [t] "por";' +
     '[t] count(children/*[1]/children/*); [t] "matriz"',
     'self::matrix'
    ],
    ['Rule',
     'abstr-matrix', 'mathspeak.brief',
     '[t] "matriz"',
     'self::matrix'
    ],
    ['SpecializedRule',
     'abstr-matrix', 'mathspeak.brief', 'mathspeak.sbrief'
    ],
    ['Rule',
     'abstr-var-matrix', 'default.default',
     '[t] "matriz de dimensión n por m"',
     'self::matrix',
     './children/*/children/*/children/punctuation[@role="ellipsis"]'
    ],


    // Cases
    ['Rule',
     'abstr-cases', 'default.default',
     '[t] "declaración de caso";' +
     '[t] "con"; [t] count(children/*); [t] "casos"',
     'self::cases'
    ],
    ['Rule',
     'abstr-cases', 'mathspeak.brief',
     '[t] "declaración de caso"',
     'self::cases'
    ],
    ['SpecializedRule',
     'abstr-cases', 'mathspeak.brief', 'mathspeak.sbrief'
    ],
    ['Rule',
     'abstr-var-cases', 'default.default',
     '[t] "declaración de caso con número variable de casos"',
     'self::cases',
     './children/row/children/cell/children/punctuation[@role="ellipsis"]' +
     'or ./children/line/children/punctuation[@role="ellipsis"]'
    ],


    // Punctuated
    ['Rule',
     'abstr-punctuated', 'default.default',
     '[t] "lista separada por"; [n] content/*[1]; ' +
     '[t] "de longitud"; [t] count(children/*) - count(content/*)',
     'self::punctuated'
    ],
    ['Rule',
     'abstr-punctuated', 'mathspeak.brief',
     '[t] "lista separada por"; [n] content/*[1]',
     'self::punctuated'
    ],
    ['SpecializedRule',
     'abstr-punctuated', 'mathspeak.brief', 'mathspeak.sbrief'
    ],
    ['Rule',
     'abstr-var-punctuated', 'default.default',
     '[t] "lista separada por"; [n] content/*[1]',
     '[t] "de longitud variable"',
     'self::punctuated',
     './children/punctuation[@role="ellipsis"]'
    ],


    ['Rule',
     'abstr-bigop', 'default.default',
     '[n] content/*[1]',
     'self::bigop'
    ],

    ['Rule',
     'abstr-integral', 'default.default',
     '[t] "integral"',
     '@role="integral"'
    ],

    ['Rule',
     'abstr-relation', 'default.default',
     '[t] @role (grammar:localRole);',
     'self::relseq', 'count(./children/*)=2'
    ],

    ['Rule',
     'abstr-relation-seq', 'default.default',
     '[t] "secuencia de"; [t] @role (grammar:localRole);' +
     ' [t] "con"; [t] count(./children/*); [t] "elementos"',
     'self::relseq', 'count(./children/*)>2'
    ],
    ['Rule',
     'abstr-relation-seq', 'mathspeak.brief',
     '[t] "secuencia de"; [t] @role (grammar:localRole)',
     'self::relseq', 'count(./children/*)>2'
    ],
    ['SpecializedRule',
     'abstr-relation-seq', 'mathspeak.brief', 'mathspeak.sbrief'
    ],
    ['Rule',
     'abstr-var-relation', 'default.default',
     '[t] "secuencia de"; [t] @role (grammar:localRole);' +
     ' [t] "con una cantidad variable de elementos"',
     'self::relseq', 'count(./children/*)>2',
     './children/punctuation[@role="ellipsis"]'
    ],

    ['UniqueAlias',
     'abstr-relation', 'default.default',
     'self::multirel',
     '@role!="unknown"', 'count(./children/*)>2'
    ],
    ['Aliases',
     'abstr-var-relation',
     'self::multirel', '@role!="unknown"',
     'count(./children/*)>2', './children/punctuation[@role="ellipsis"]'
    ],

    ['Rule',
     'abstr-multirel', 'default.default',
     '[t] "secuencia de relación";' +
     ' [t] "con"; [t] count(./children/*); [t] "elementos"',
     'self::multirel', 'count(./children/*)>2'
    ],
    ['Rule',
     'abstr-multirel', 'mathspeak.brief',
     '[t] "secuencia de relación"',
     'self::multirel', 'count(./children/*)>2'
    ],
    ['SpecializedRule',
     'abstr-multirel', 'mathspeak.brief', 'mathspeak.sbrief'
    ],
    ['Rule',
     'abstr-var-multirel', 'default.default',
     '[t] "secuencia de relación con número variable de elementos"',
     'self::multirel', 'count(./children/*)>2',
     './children/punctuation[@role="ellipsis"]'
    ],

    ['Rule',
     'abstr-table', 'default.default',
     '[t] "mesa con"; ' +
     '[t] count(children/*); [t] "filas y";' +
     '[t] count(children/*[1]/children/*); [t] "columnas"',
     'self::table'
    ],
    ['Rule',
     'abstr-line', 'default.default',
     '[t] "en"; [t] @role (grammar:localRole);',
     'self::line'
    ],
    ['Rule',
     'abstr-row', 'default.default',
     '[t] "en"; [t] @role (grammar:localRole);' +
     '[t] count(preceding-sibling::..); [t] "con";' +
     '[t] count(children/*); [t] "columnas"',
     'self::row'
    ],
    ['Rule',
     'abstr-cell', 'default.default',
     '[t] "en"; [t] @role (grammar:localRole);',
     'self::cell'
    ]
  ]
};


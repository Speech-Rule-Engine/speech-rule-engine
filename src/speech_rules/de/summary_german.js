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


/**
 * German Summary rules.
 */
sre.SummaryGerman = {
  modality: 'summary',
  locale: 'de',
  rules: [
    // Identifier
    ['Rule',
      'abstr-identifier', 'default.default',
      '[t] "langer Bezeichner"',
      'self::identifier', 'contains(@grammar, "collapsed")'
    ],
    ['Rule',
      'abstr-identifier', 'default.default',
      '[t] "Bezeichner"',
      'self::identifier'
    ],

    // Numbers
    ['Rule',
      'abstr-number', 'default.default',
      '[t] "lange Zahl"',
      'self::number', 'contains(@grammar, "collapsed")'
    ],
    ['Rule',
      'abstr-number', 'default.default',
      '[t] "Zahl"',
      'self::number'
    ],

    ['Rule',
      'abstr-mixed-number', 'default.default',
      '[t] "langer gemischter Bruch"',
      'self::number', '@role="mixed"', 'contains(@grammar, "collapsed")'
    ],
    ['Rule',
      'abstr-mixed-number', 'default.default',
      '[t] "gemischter Bruch"',
      'self::number', '@role="mixed"'
    ],

    // Text
    ['Rule',
      'abstr-text', 'default.default',
      '[t] "Text"',
      'self::text'
    ],

    // Functions
    ['Rule',
      'abstr-function', 'default.default',
      '[t] "Funktionsausdruck"',
      'self::function'
    ],
    ['Rule',
      'abstr-function', 'mathspeak.brief',
      '[t] "Funktion"',
      'self::function'
    ],
    ['SpecializedRule',
      'abstr-function', 'mathspeak.brief', 'mathspeak.sbrief'
    ],

    ['Rule',
      'abstr-lim', 'default.default',
      '[t] "Grenzwertfunktion"',
      'self::function', '@role="limit function"'
    ],
    ['Rule',
      'abstr-lim', 'mathspeak.brief',
      '[t] "Grenzwert"',
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
      '[t] "Bruch"',
      'self::fraction'
    ],

    ['Rule',
      'abstr-continued-fraction', 'default.default',
      '[t] "Kettenbruch"',
      'self::fraction',
      'children/*[2]/descendant-or-self::*[@role="ellipsis"]'
    ],


    // Roots
    ['Rule',
      'abstr-sqrt', 'default.default',
      '[t] "Quadratwurzel"',
      'self::sqrt'
    ],

    ['Rule',
      'abstr-sqrt-nested', 'default.default',
      '[t] "verschachtelte Quadratwurzel"',
      'self::sqrt',
      'children/*/descendant-or-self::sqrt or' +
     ' children/*/descendant-or-self::root'
    ],

    // Content following the root expression.
    ['Rule',
      'abstr-root', 'default.default',
      '[t] "Wurzel mit Exponent"; [n] children/*[1] (engine:modality=speech);' +
     ' [t] "Exponentende"',
      'self::root', 'contains(@grammar, "collapsed")',
      'following-sibling::* or ancestor::*/following-sibling::*'
    ],
    ['Rule',
      'abstr-root', 'default.default',
      '[t] "Wurzel mit Exponent"; [n] children/*[1] (engine:modality=speech)',
      'self::root'
    ],
    ['Rule',
      'abstr-root', 'mathspeak.brief',
      '[t] "Wurzel"',
      'self::root'
    ],
    ['SpecializedRule',
      'abstr-root', 'mathspeak.brief', 'mathspeak.sbrief'
    ],
    // Content following the root expression.
    ['Rule',
      'abstr-root-nested', 'default.default',
      '[t] "verschachtelte Wurzel mit Wurzelexponent"; ' +
     '[n] children/*[1] (engine:modality="speech"); [t] "Ende Wurzelexponent"',
      'self::root', 'contains(@grammar, "collapsed")',
      'children/*/descendant-or-self::sqrt or' +
     ' children/*/descendant-or-self::root',
      'following-sibling::* or ancestor::*/following-sibling::*'
    ],
    ['Rule',
      'abstr-root-nested', 'default.default',
      '[t] "verschachtelte Wurzel mit Exponent"; ' +
     '[n] children/*[1] (engine:modality="speech")',
      'self::root', 'children/*/descendant-or-self::sqrt or' +
     ' children/*/descendant-or-self::root'
    ],
    ['Rule',
      'abstr-root-nested', 'mathspeak.brief',
      '[t] "verschachtelte Wurzel"',
      'self::root', 'children/*/descendant-or-self::sqrt or ' +
     'children/*/descendant-or-self::root'
    ],
    ['SpecializedRule',
      'abstr-root-nested', 'mathspeak.brief', 'mathspeak.sbrief'
    ],

    // Superscript
    ['Rule',
      'abstr-superscript', 'default.default',
      '[t] "Potenz"',
      'self::superscript'
    ],

    // Subscript
    ['Rule',
      'abstr-subscript', 'default.default',
      '[t] "Index"',
      'self::subscript'
    ],

    // Subsuperscript
    ['Rule',
      'abstr-subsup', 'default.default',
      '[t] "Potenz mit Index"',
      'self::superscript',
      'name(children/*[1])="subscript"'
    ],

    // Infixop
    ['Rule',
      'abstr-infixop', 'default.default',
      '[t] @role (grammar:localRole); [t] "mit"; [t] count(./children/*);' +
     ' [t] "Elementen"',
      'self::infixop'
    ],
    ['Rule',
      'abstr-infixop', 'default.default',
      '[t] @role (grammar:localRole); ' +
     '[t] "mit veränderlicher Anzahl an Elementen"',
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
      '[t] "Summe mit"; [t] count(./children/*); [t] "Summanden"',
      'self::infixop', '@role="addition"'
    ],
    ['Rule',
      'abstr-addition', 'mathspeak.brief',
      '[t] "Summe"',
      'self::infixop', '@role="addition"'
    ],
    ['SpecializedRule',
      'abstr-addition', 'mathspeak.brief', 'mathspeak.sbrief'
    ],
    ['Rule',
      'abstr-var-addition', 'default.default',
      '[t] "Summe mit veränderlicher Anzahl an Summanden"',
      'self::infixop', '@role="addition"',
      'count(./children/*)>2', './children/punctuation[@role="ellipsis"]'
    ],

    ['Rule',
      'abstr-multiplication', 'default.default',
      '[t] "Produkt mit"; [t] count(./children/*); [t] "Faktoren"',
      'self::infixop', '@role="multiplication"'
    ],
    ['Rule',
      'abstr-multiplication', 'mathspeak.brief',
      '[t] "Produkt"',
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
      '[t] "Produkt mit veränderlicher Anzahl an Faktoren"',
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
      '[t] count(./children/*) ; [t] "dimensionaler Vektor"',
      'self::vector'
    ],
    ['Rule',
      'abstr-vector', 'mathspeak.brief',
      '[t] "Vektor"',
      'self::vector'
    ],
    ['SpecializedRule',
      'abstr-vector', 'mathspeak.brief', 'mathspeak.sbrief'
    ],
    ['Rule',
      'abstr-var-vector', 'default.default',
      '[t] "n dimensionaler Vektor"',
      'self::vector',
      './children/*/children/punctuation[@role="ellipsis"]'
    ],

    ['Rule',
      'abstr-binomial', 'default.default',
      '[t] "Binomialkoeffizient"',
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
      '[t] count(./children/*); [t] "dimensionale Determinante"',
      'self::matrix', '@role="determinant"'
    ],
    ['Rule',
      'abstr-determinant', 'mathspeak.brief',
      '[t] "Determinante"',
      'self::matrix', '@role="determinant"'
    ],
    ['SpecializedRule',
      'abstr-determinant', 'mathspeak.brief', 'mathspeak.sbrief'
    ],
    ['Rule',
      'abstr-var-determinant', 'default.default',
      '[t] "n dimensionale Determinante"',
      'self::matrix', '@role="determinant"',
      './children/*/children/*/children/punctuation[@role="ellipsis"]'
    ],

    ['Rule',
      'abstr-squarematrix', 'default.default',
      '[t] count(./children/*); [t] "dimensionale quadratische Matrize"',
      'self::matrix', '@role="squarematrix"'
    ],
    ['Rule',
      'abstr-squarematrix', 'mathspeak.brief',
      '[t] "quadratische Matrize"',
      'self::matrix', '@role="squarematrix"'
    ],
    ['SpecializedRule',
      'abstr-squarematrix', 'mathspeak.brief', 'mathspeak.sbrief'
    ],

    ['Rule',
      'abstr-rowvector', 'default.default',
      '[t] count(./children/row/children/*); [t] "dimensionaler Zeilenvektor"',
      'self::matrix', '@role="rowvector"'
    ],
    ['Rule',
      'abstr-rowvector', 'mathspeak.brief',
      '[t] "Zeilenvektor"',
      'self::matrix', '@role="rowvector"'
    ],
    ['SpecializedRule',
      'abstr-rowvector', 'mathspeak.brief', 'mathspeak.sbrief'
    ],
    ['Rule',
      'abstr-var-matrix', 'default.default',
      '[t] "n dimensionaler Zeilenvektor"',
      'self::matrix', '@role="rowvector"',
      './children/*/children/*/children/punctuation[@role="ellipsis"]'
    ],

    ['Rule',
      'abstr-matrix', 'default.default',
      '[t] count(children/*);  [t] "mal";' +
     '[t] count(children/*[1]/children/*); [t] "Matrize"',
      'self::matrix'
    ],
    ['Rule',
      'abstr-matrix', 'mathspeak.brief',
      '[t] "Matrize"',
      'self::matrix'
    ],
    ['SpecializedRule',
      'abstr-matrix', 'mathspeak.brief', 'mathspeak.sbrief'
    ],
    ['Rule',
      'abstr-var-matrix', 'default.default',
      '[t] "n mal m dimensionale Matrize"',
      'self::matrix',
      './children/*/children/*/children/punctuation[@role="ellipsis"]'
    ],


    // Cases
    ['Rule',
      'abstr-cases', 'default.default',
      '[t] "Fallunterscheidung";' +
     '[t] "mit"; [t] count(children/*); [t] "Fällen"',
      'self::cases'
    ],
    ['Rule',
      'abstr-cases', 'mathspeak.brief',
      '[t] "Fallunterscheidung"',
      'self::cases'
    ],
    ['SpecializedRule',
      'abstr-cases', 'mathspeak.brief', 'mathspeak.sbrief'
    ],
    ['Rule',
      'abstr-var-cases', 'default.default',
      '[t] "Fallunterscheidung mit veränderlicher Anzahl an Fällen"',
      'self::cases',
      './children/row/children/cell/children/punctuation[@role="ellipsis"]' +
     'or ./children/line/children/punctuation[@role="ellipsis"]'
    ],


    // Punctuated
    ['Rule',
      'abstr-punctuated', 'default.default',
      '[t] "mit"; [n] content/*[1]; [t] "getrennte Liste der Länge"; ' +
     '[t] count(children/*) - count(content/*)',
      'self::punctuated'
    ],
    ['Rule',
      'abstr-punctuated', 'mathspeak.brief',
      '[t] "mit"; [n] content/*[1]; [t] "getrennte Liste";',
      'self::punctuated'
    ],
    ['SpecializedRule',
      'abstr-punctuated', 'mathspeak.brief', 'mathspeak.sbrief'
    ],
    ['Rule',
      'abstr-var-punctuated', 'default.default',
      '[t] "mit"; [n] content/*[1]; [t] "getrennte Liste";' +
     '[t] "veränderlicher Länge"',
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
      '[t] "Integral"',
      '@role="integral"'
    ],

    ['Rule',
      'abstr-relation', 'default.default',
      '[t] @role (grammar:localRole);',
      'self::relseq', 'count(./children/*)=2'
    ],

    ['Rule',
      'abstr-relation-seq', 'default.default',
      '[t] @role (grammar:localRole, join:""); [t] "ssequenz";' +
     ' [t] "mit"; [t] count(./children/*); [t] "Elementen"',
      'self::relseq', 'count(./children/*)>2'
    ],
    ['Rule',
      'abstr-relation-seq', 'mathspeak.brief',
      '[t] @role (grammar:localRole, join:""); [t] "ssequenz"',
      'self::relseq', 'count(./children/*)>2'
    ],
    ['SpecializedRule',
      'abstr-relation-seq', 'mathspeak.brief', 'mathspeak.sbrief'
    ],
    ['Rule',
      'abstr-var-relation', 'default.default',
      '[t] @role (grammar:localRole, join:""); [t] "ssequenz";' +
     '[t] "mit veränderlicher Anzahl an Elementen"',
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
      '[t] "Relationsequenz";' +
     ' [t] "mit"; [t] count(./children/*); [t] "Elementen"',
      'self::multirel', 'count(./children/*)>2'
    ],
    ['Rule',
      'abstr-multirel', 'mathspeak.brief',
      '[t] "Relationsequenz"',
      'self::multirel', 'count(./children/*)>2'
    ],
    ['SpecializedRule',
      'abstr-multirel', 'mathspeak.brief', 'mathspeak.sbrief'
    ],
    ['Rule',
      'abstr-var-multirel', 'default.default',
      '[t] "Relationsequenz mit veränderlicher Anzahl an Elementen"',
      'self::multirel', 'count(./children/*)>2',
      './children/punctuation[@role="ellipsis"]'
    ],

    ['Rule',
      'abstr-table', 'default.default',
      '[t] "Tabelle mit"; ' +
     '[t] count(children/*); [t] "Zeilen und";' +
     '[t] count(children/*[1]/children/*); [t] "Spalten"',
      'self::table'
    ],
    ['Rule',
      'abstr-line', 'default.default',
      '[t] "in"; [t] @role (grammar:localRole);',
      'self::line'
    ],
    ['Rule',
      'abstr-row', 'default.default',
      '[t] "in"; [t] @role (grammar:localRole);' +
     '[t] count(preceding-sibling::..); [t] "mit";' +
     '[t] count(children/*); [t] "Spalten"',
      'self::row'
    ],
    ['Rule',
      'abstr-cell', 'default.default',
      '[t] "in"; [t] @role (grammar:localRole);',
      'self::cell'
    ]
  ]
};

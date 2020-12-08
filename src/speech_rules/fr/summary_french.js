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
 * @fileoverview French summary rules for collapsed elements.
 * @author v.sorge@mathjax.com (Volker Sorge)
 */

goog.provide('sre.SummaryFrench');


/**
 * French summary rules.
 */
sre.SummaryFrench = {
  locale: 'fr',
  modality: 'summary',
  rules: [
    // Collapsed output
    ['Rule',
     'collapsed-masculine', 'default.default',
     '[t] "compressé"', 'self::*[@grammar]',
     'contains(@grammar, "gender:male")', 'contains(@grammar, "collapsed")'],
    ['SpecializedRule',
     'collapsed-masculine', 'default.default', 'mathspeak.brief'
    ],
    ['SpecializedRule',
     'collapsed-masculine', 'default.default', 'mathspeak.sbrief'
    ],
    ['Rule',
     'collapsed-feminine', 'default.default',
     '[t] "compressée"', 'self::*[@grammar]',
     'contains(@grammar, "gender:female")', 'contains(@grammar, "collapsed")'],
    ['SpecializedRule',
     'collapsed-feminine', 'default.default', 'mathspeak.brief'
    ],
    ['SpecializedRule',
     'collapsed-feminine', 'default.default', 'mathspeak.sbrief'
    ],
    ['Rule',
     'no-collapsed', 'default.default',
     '[t] ""', 'self::*[@grammar]', 'contains(@grammar, "gender")',
     'not(contains(@grammar, "collapsed"))'],
    ['SpecializedRule',
     'no-collapsed', 'default.default', 'mathspeak.brief'
    ],
    ['SpecializedRule',
     'no-collapsed', 'default.default', 'mathspeak.sbrief'
    ],

    // Initial rule
    ['Rule',
     'stree', 'default.default',
     '[n] ./*[1]', 'self::stree'],

    // Identifier
    ['Rule',
     'abstr-identifier', 'default.default',
     '[t] "identifiant long"; [n] . (grammar:gender="male")',
     'self::identifier', 'contains(@grammar, "collapsed")'
    ],
    ['Rule',
     'abstr-identifier', 'default.default',
     '[t] "identifiant"; [n] . (grammar:gender="male")',
     'self::identifier'
    ],

    // Numbers
    ['Rule',
     'abstr-number', 'default.default',
     '[t] "nombre long"; [n] . (grammar:gender="male")',
     'self::number', 'contains(@grammar, "collapsed")'
    ],
    ['Rule',
     'abstr-number', 'default.default',
     '[t] "nombre"; [n] . (grammar:gender="male")',
     'self::number',
    ],

    ['Rule',
     'abstr-mixed-number', 'default.default',
     '[t] "nombre fractionnaire long"; [n] . (grammar:gender="male")',
     'self::number', '@role="mixed"', 'contains(@grammar, "collapsed")'
    ],
    ['Rule',
     'abstr-mixed-number', 'default.default',
     '[t] "nombre fractionnaire"; [n] . (grammar:gender="male")',
     'self::number', '@role="mixed"'
    ],

    // Text
    ['Rule',
     'abstr-text', 'default.default',
     '[t] "texte"; [n] . (grammar:gender="male")',
     'self::text'
    ],

    // Functions
    ['Rule',
     'abstr-function', 'default.default',
     '[t] "expression fonctionnelle"; [n] . (grammar:gender="female")',
     'self::function'
    ],
    ['Rule',
     'abstr-function', 'mathspeak.brief',
     '[t] "fonction"; [n] . (grammar:gender="female")',
     'self::function'
    ],
    ['SpecializedRule',
     'abstr-function', 'mathspeak.brief', 'mathspeak.sbrief'
    ],

    ['Rule',
     'abstr-lim', 'default.default',
     '[t] "fonction de limitation"; [n] . (grammar:gender="female")',
     'self::function', '@role="limit function"'
    ],
    ['Rule',
     'abstr-lim', 'mathspeak.brief',
     '[t] "lim"; [n] . (grammar:gender="female")',
     'self::function', '@role="limit function"'
    ],
    ['SpecializedRule',
     'abstr-lim', 'mathspeak.brief', 'mathspeak.sbrief'
    ],


    // Fraction
    ['Rule',
     'abstr-fraction', 'default.default',
     '[t] "fraction"; [n] . (grammar:gender="female")',
     'self::fraction',
    ],
    ['Rule',
     'abstr-fraction', 'mathspeak.brief',
     '[t] "frac"; [n] . (grammar:gender="female")',
     'self::fraction'
    ],
    ['SpecializedRule',
     'abstr-fraction', 'mathspeak.brief', 'mathspeak.sbrief'
    ],

    ['Rule',
     'abstr-continued-fraction', 'default.default',
     '[t] "fraction continue"; [n] . (grammar:gender="female")',
     'self::fraction',
     'children/*[2]/descendant-or-self::*[@role="ellipsis"]'
    ],
    ['Rule',
     'abstr-continued-fraction', 'mathspeak.brief',
     '[t] "frac continue"; [n] . (grammar:gender="female")',
     'self::fraction',
     'children/*[2]/descendant-or-self::*[@role="ellipsis"]'
    ],
    ['SpecializedRule',
     'abstr-continued-fraction', 'mathspeak.brief', 'mathspeak.sbrief'
    ],


    // Roots
    ['Rule',
     'abstr-sqrt', 'default.default',
     '[t] "racine carrée"; [n] . (grammar:gender="female")',
     'self::sqrt'
    ],

    ['Rule',
     'abstr-sqrt-nested', 'default.default',
     '[t] "racine carrée imbriquée"; [n] . (grammar:gender="female")',
     'self::sqrt',
     'children/*/descendant-or-self::sqrt or' +
     ' children/*/descendant-or-self::root'
    ],

    ['Rule',
     'abstr-root', 'default.default',
     '[t] "racine d\'indice"; [n] children/*[1] (engine:modality=speech); ' +
     '[n] . (grammar:gender="female")',
     'self::root'
    ],
    ['Rule',
     'abstr-root', 'mathspeak.brief',
     '[t] "racine"; [n] . (grammar:gender="female")',
     'self::root'
    ],
    ['SpecializedRule',
     'abstr-root', 'mathspeak.brief', 'mathspeak.sbrief'
    ],
    ['Rule',
     'abstr-root-nested', 'default.default',
     '[t] "racine imbriquée d\'indice"; ' +
     '[n] children/*[1] (engine:modality=speech); ' +
     '[n] . (grammar:gender="female")',
     'self::root', 'children/*/descendant-or-self::sqrt or' +
     ' children/*/descendant-or-self::root'
    ],
    ['Rule',
     'abstr-root-nested', 'mathspeak.brief',
     '[t] "racine imbriquée"; [n] . (grammar:gender="female")',
     'self::root', 'children/*/descendant-or-self::sqrt or ' +
     'children/*/descendant-or-self::root'
    ],
    ['SpecializedRule',
     'abstr-root-nested', 'mathspeak.brief', 'mathspeak.sbrief'
    ],

    // Superscript
    ['Rule',
     'abstr-superscript', 'default.default',
     '[t] "puissance"; [n] . (grammar:gender="female")',
     'self::superscript'
    ],

    // Subscript
    ['Rule',
     'abstr-subscript', 'default.default',
     '[t] "indice"; [n] . (grammar:gender="male")',
     'self::subscript'
    ],

    // Subsuperscript
    ['Rule',
     'abstr-subsup', 'default.default',
     '[t] "puissance avec index"; [n] . (grammar:gender="female")',
     'self::superscript',
     'name(children/*[1])="subscript"'
    ],

    // Infixop
    ['Rule',
     'abstr-infixop', 'default.default',
     '[t] @role (grammar:localRole); [t] "avec"; [t] count(./children/*);' +
     ' [t] "éléments"; [n] . (grammar:gender="male")',
     'self::infixop'
    ],
    ['Rule',
     'abstr-infixop', 'default.default',
     '[t] @role (grammar:localRole); [t] "avec un nombre d\'éléments' +
     ' variable"; [n] . (grammar:gender="male")',
     'self::infixop', 'count(./children/*)>2',
     './children/punctuation[@role="ellipsis"]'
    ],
    ['Rule',
     'abstr-infixop', 'mathspeak.brief',
     '[t] @role (grammar:localRole); [n] . (grammar:gender="male")',
     'self::infixop'
    ],
    ['SpecializedRule',
     'abstr-infixop', 'mathspeak.brief', 'mathspeak.sbrief'
    ],

    ['Rule',
     'abstr-addition', 'default.default',
     '[t] "somme avec"; [t] count(./children/*); ' +
     '[t] "opérandes"; [n] . (grammar:gender="female")',
     'self::infixop', '@role="addition"'
    ],
    ['Rule',
     'abstr-addition', 'mathspeak.brief',
     '[t] "somme"; [n] . (grammar:gender="female")',
     'self::infixop', '@role="addition"'
    ],
    ['SpecializedRule',
     'abstr-addition', 'mathspeak.brief', 'mathspeak.sbrief'
    ],
    ['Rule',
     'abstr-var-addition', 'default.default',
     '[t] "somme avec un nombre variable d\'opérandes"; ' +
     '[n] . (grammar:gender="female")',
     'self::infixop', '@role="addition"',
     'count(./children/*)>2', './children/punctuation[@role="ellipsis"]'
    ],

    ['Rule',
     'abstr-multiplication', 'default.default',
     '[t] "produit avec"; [t] count(./children/*);' +
     ' [t] "facteurs"; [n] . (grammar:gender="male");',
     'self::infixop', '@role="multiplication"'
    ],
    ['Rule',
     'abstr-multiplication', 'mathspeak.brief',
     '[t] "produit"; [n] . (grammar:gender="male")',
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
     '[t] "produit avec un nombre de facteurs variable";' +
     ' [n] . (grammar:gender="male")',
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
     '[t] "vecteur de dimension"; [t] count(./children/*);' +
     ' [n] . (grammar:gender="male")',
     'self::vector'
    ],
    ['Rule',
     'abstr-vector', 'mathspeak.brief',
     '[t] "vecteur"; [n] . (grammar:gender="male")',
     'self::vector'
    ],
    ['SpecializedRule',
     'abstr-vector', 'mathspeak.brief', 'mathspeak.sbrief'
    ],
    ['Rule',
     'abstr-var-vector', 'default.default',
     '[t] "vecteur colonne de dimension n"; [n] . (grammar:gender="male")',
     'self::vector',
     './children/*/children/punctuation[@role="ellipsis"]'
    ],

    ['Rule',
     'abstr-binomial', 'default.default',
     '[t] "binomial"; [n] . (grammar:gender="male")',
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
     '[t] "déterminant de dimension"; [t] count(./children/*);' +
     ' [n] . (grammar:gender="male")',
     'self::matrix', '@role="determinant"'
    ],
    ['Rule',
     'abstr-determinant', 'mathspeak.brief',
     '[t] "déterminant"; [n] . (grammar:gender="male")',
     'self::matrix', '@role="determinant"'
    ],
    ['SpecializedRule',
     'abstr-determinant', 'mathspeak.brief', 'mathspeak.sbrief'
    ],
    ['Rule',
     'abstr-var-determinant', 'default.default',
     '[t] "déterminant de dimension n"; [n] . (grammar:gender="male")',
     'self::matrix', '@role="determinant"',
     './children/*/children/*/children/punctuation[@role="ellipsis"]'
    ],

    ['Rule',
     'abstr-squarematrix', 'default.default',
     '[t] "matrice carrée de dimension"; [t] count(./children/*); ' +
     '[n] . (grammar:gender="female")',
     'self::matrix', '@role="squarematrix"'
    ],
    ['Rule',
     'abstr-squarematrix', 'mathspeak.brief',
     '[t] "matrice carrée"; [n] . (grammar:gender="female")',
     'self::matrix', '@role="squarematrix"'
    ],
    ['SpecializedRule',
     'abstr-squarematrix', 'mathspeak.brief', 'mathspeak.sbrief'
    ],

    ['Rule',
     'abstr-rowvector', 'default.default',
     '[t] "vecteur ligne de dimension"; ' +
     '[t] count(./children/row/children/*); ' +
     '[n] . (grammar:gender="male")',
     'self::matrix', '@role="rowvector"'
    ],
    ['Rule',
     'abstr-rowvector', 'mathspeak.brief',
     '[t] "vecteur ligne"; [n] . (grammar:gender="male")',
     'self::matrix', '@role="rowvector"'
    ],
    ['SpecializedRule',
     'abstr-rowvector', 'mathspeak.brief', 'mathspeak.sbrief'
    ],
    ['Rule',
     'abstr-var-matrix', 'default.default',
     '[t] "vecteur ligne de dimension n"',
     'self::matrix', '@role="rowvector"',
     './children/*/children/*/children/punctuation[@role="ellipsis"]'
    ],

    ['Rule',
     'abstr-matrix', 'default.default',
     '[t] "matrice"; [t] count(children/*);  [t] "par";' +
     '[t] count(children/*[1]/children/*); [n] . (grammar:gender="female")',
     'self::matrix'
    ],
    ['Rule',
     'abstr-matrix', 'mathspeak.brief',
     '[t] "matrice"; [n] . (grammar:gender="female")',
     'self::matrix'
    ],
    ['SpecializedRule',
     'abstr-matrix', 'mathspeak.brief', 'mathspeak.sbrief'
    ],
    ['Rule',
     'abstr-var-matrix', 'default.default',
     '[t] "matrice de dimension n par m"; [n] . (grammar:gender="female")',
     'self::matrix',
     './children/*/children/*/children/punctuation[@role="ellipsis"]'
    ],


    // Cases
    ['Rule',
     'abstr-cases', 'default.default',
     '[t] "déclaration de cas";' +
     '[t] "avec"; [t] count(children/*); [t] "cas";' +
     ' [n] . (grammar:gender="female")',
     'self::cases'
    ],
    ['Rule',
     'abstr-cases', 'mathspeak.brief',
     '[t] "déclaration de cas"; [n] . (grammar:gender="female")',
     'self::cases'
    ],
    ['SpecializedRule',
     'abstr-cases', 'mathspeak.brief', 'mathspeak.sbrief'
    ],
    ['Rule',
     'abstr-var-cases', 'default.default',
     '[t] "déclaration de cas variable"; [n] . (grammar:gender="female")',
     'self::cases',
     './children/row/children/cell/children/punctuation[@role="ellipsis"]' +
     'or ./children/line/children/punctuation[@role="ellipsis"]'
    ],


    // Punctuated
    ['Rule',
     'abstr-punctuated', 'default.default',
     '[t] "liste de longueur"; [t] count(children/*) - count(content/*);' +
     ' [t] "séparée par des"; [n] content/*[1] (join:""); [t] "s";' +
     ' [n] . (grammar:gender="female")',
     'self::punctuated'
    ],
    ['Rule',
     'abstr-punctuated', 'mathspeak.brief',
     '[t] "liste séparée par des"; [n] content/*[1] (join:""); [t] "s";' +
     ' [n] . (grammar:gender="female")',
     'self::punctuated'
    ],
    ['SpecializedRule',
     'abstr-punctuated', 'mathspeak.brief', 'mathspeak.sbrief'
    ],
    ['Rule',
     'abstr-var-punctuated', 'default.default',
     '[t] "liste de longueur variable séparée par des"; ' +
     '[n] content/*[1] (join:""); [t] "s"; [n] . (grammar:gender="female")',
     'self::punctuated',
     './children/punctuation[@role="ellipsis"]'
    ],


    ['Rule',
     'abstr-bigop', 'default.default',
     '[n] content/*[1]; [n] . (grammar:gender="male")',
     'self::bigop'
    ],

    ['Rule',
     'abstr-integral', 'default.default',
     '[t] "intégrale"; [n] . (grammar:gender="female")',
     'self::*', '@role="integral"'
    ],

    ['Rule',
     'abstr-relation', 'default.default',
     '[t] @role (grammar:localRole); [n] . (grammar:gender="male");',
     'self::relseq', 'count(./children/*)=2'
    ],

    ['Rule',
     'abstr-relation-seq', 'default.default',
     '[t] @role (grammar:localRole); [t] "séquence";' +
     ' [t] "avec"; [t] count(./children/*); [t] "éléments";' +
     ' [n] . (grammar:gender="female")',
     'self::relseq', 'count(./children/*)>2'
    ],
    ['Rule',
     'abstr-relation-seq', 'mathspeak.brief',
     '[t] @role (grammar:localRole); [t] "séquence";' +
     ' [n] . (grammar:gender="female")',
     'self::relseq', 'count(./children/*)>2'
    ],
    ['SpecializedRule',
     'abstr-relation-seq', 'mathspeak.brief', 'mathspeak.sbrief'
    ],
    ['Rule',
     'abstr-var-relation', 'default.default',
     '[t] @role (grammar:localRole); [t] "séquence";' +
     ' [t] "avec un nombre de éléments variable";' +
     ' [n] . (grammar:gender="female")',
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
     '[t] "séquence de relation";' +
     ' [t] "avec"; [t] count(./children/*); [t] "éléments";' +
     ' [n] . (grammar:gender="female")',
     'self::multirel', 'count(./children/*)>2'
    ],
    ['Rule',
     'abstr-multirel', 'mathspeak.brief',
     '[t] "séquence de relation"; [n] . (grammar:gender="female")',
     'self::multirel', 'count(./children/*)>2'
    ],
    ['SpecializedRule',
     'abstr-multirel', 'mathspeak.brief', 'mathspeak.sbrief'
    ],
    ['Rule',
     'abstr-var-multirel', 'default.default',
     '[t] "séquence de relation avec un nombre de éléments variable";' +
     ' [n] . (grammar:gender="female")',
     'self::multirel', 'count(./children/*)>2',
     './children/punctuation[@role="ellipsis"]'
    ],

    ['Rule',
     'abstr-table', 'default.default',
     '[t] "table avec"; ' +
     '[t] count(children/*); [t] "lignes et";' +
     '[t] count(children/*[1]/children/*); ' +
     '[t] "colonnes"; [n] . (grammar:gender="female");',
     'self::table'
    ],
    ['Rule',
     'abstr-line', 'default.default',
     '[t] "dans"; [t] @role (grammar:localRole);' +
     ' [n] . (grammar:gender="male")',
     'self::line'
    ],
    ['Rule',
     'abstr-row', 'default.default',
     '[t] "dans"; [t] @role (grammar:localRole);' +
     '[t] count(preceding-sibling::..); [t] "avec";' +
     '[t] count(children/*); [t] "colonnes"; [n] . (grammar:gender="female")',
     'self::row'
    ],
    ['Rule',
     'abstr-cell', 'default.default',
     '[t] "dans"; [t] @role (grammar:localRole); ' +
     '[n] . (grammar:gender="female");',
     'self::cell'
    ]
  ]
};

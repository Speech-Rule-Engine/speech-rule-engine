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

goog.provide('sre.SummaryFrench');

goog.require('sre.MathStore');



/**
 * Rule initialization.
 * @constructor
 * @extends {sre.MathStore}
 */
sre.SummaryFrench = function() {
  sre.SummaryFrench.base(this, 'constructor');
  this.locale = 'fr';
  this.modality = 'summary';
};
goog.inherits(sre.SummaryFrench, sre.MathStore);
goog.addSingletonGetter(sre.SummaryFrench);


/**
 * @type {sre.MathStore}
 */
sre.SummaryFrench.mathStore = sre.SummaryFrench.getInstance();


/** @private */
sre.SummaryFrench.defineRule_ = goog.bind(
    sre.SummaryFrench.mathStore.defineRule,
    sre.SummaryFrench.mathStore);


/** @private */
sre.SummaryFrench.defineRuleAlias_ = goog.bind(
    sre.SummaryFrench.mathStore.defineRulesAlias,
    sre.SummaryFrench.mathStore);


/** @private */
sre.SummaryFrench.defineSpecialisedRule_ = goog.bind(
    sre.SummaryFrench.mathStore.defineSpecialisedRule,
    sre.SummaryFrench.mathStore);


/** @private */
sre.SummaryFrench.defineUniqueRuleAlias_ = goog.bind(
    sre.SummaryFrench.mathStore.defineUniqueRuleAlias,
    sre.SummaryFrench.mathStore);


goog.scope(function() {
var defineRule = sre.SummaryFrench.defineRule_;
var defineRuleAlias = sre.SummaryFrench.defineRuleAlias_;
var defineSpecialisedRule = sre.SummaryFrench.defineSpecialisedRule_;
var defineUniqueRuleAlias = sre.SummaryFrench.defineUniqueRuleAlias_;


/**
 * Summary rules.
 * @private
*/
sre.SummaryFrench.initSummaryFrench_ = function() {
  // Collapsed output
  defineRule(
      'collapsed-masculine', 'default.masculine',
      '[t] "compressé"',
      'contains(@grammar, "collapsed")');
  defineRule(
      'collapsed-feminine', 'default.feminine',
      '[t] "compressée"',
      'contains(@grammar, "collapsed")');
  defineRule(
      'no-collapsed', 'default.masculine',
      '[t] ""', 'not(contains(@grammar, "collapsed"))');
  defineRule(
      'no-collapsed', 'default.feminine',
      '[t] ""', 'not(contains(@grammar, "collapsed"))');

  // Initial rule
  defineRule(
      'stree', 'default.default',
      '[n] ./*[1]', 'self::stree');

  // Identifier
  defineRule(
      'abstr-identifier', 'default.default',
      '[t] "identifiant long"; [n] . (engine:style=masculine)',
      'self::identifier', 'contains(@grammar, "collapsed")'
  );
  defineRule(
      'abstr-identifier', 'default.default',
      '[t] "identifiant"; [n] . (engine:style=masculine)',
      'self::identifier'
  );

  // Numbers
  defineRule(
      'abstr-number', 'default.default',
      '[t] "nombre long"; [n] . (engine:style=masculine)',
      'self::number', 'contains(@grammar, "collapsed")'
  );
  defineRule(
      'abstr-number', 'default.default',
      '[t] "nombre"; [n] . (engine:style=masculine)',
      'self::number',
  );

  defineRule(
      'abstr-mixed-number', 'default.default',
      '[t] "nombre fractionnaire long"; [n] . (engine:style=masculine)',
      'self::number', '@role="mixed"', 'contains(@grammar, "collapsed")'
  );
  defineRule(
      'abstr-mixed-number', 'default.default',
      '[t] "nombre fractionnaire"; [n] . (engine:style=masculine)',
      'self::number', '@role="mixed"'
  );

  // Text
  defineRule(
      'abstr-text', 'default.default',
      '[t] "texte"; [n] . (engine:style=masculine)',
      'self::text'
  );

  // Functions
  defineRule(
      'abstr-function', 'default.default',
      '[t] "expression fonctionnelle"; [n] . (engine:style=feminine)',
      'self::function'
  );
  defineRule(
      'abstr-function', 'mathspeak.brief',
      '[t] "fonction"; [n] . (engine:style=feminine)',
      'self::function'
  );
  defineSpecialisedRule(
      'abstr-function', 'mathspeak.brief', 'mathspeak.sbrief'
  );

  defineRule(
      'abstr-lim', 'default.default',
      '[t] "fonction de limitation"; [n] . (engine:style=feminine)',
      'self::function', '@role="limit function"'
  );
  defineRule(
      'abstr-lim', 'mathspeak.brief',
      '[t] "lim"; [n] . (engine:style=feminine)',
      'self::function', '@role="limit function"'
  );
  defineSpecialisedRule(
      'abstr-lim', 'mathspeak.brief', 'mathspeak.sbrief'
  );


  // Fraction
  defineRule(
      'abstr-fraction', 'default.default',
      '[t] "fraction"; [n] . (engine:style=feminine)',
      'self::fraction',
  );
  defineRule(
      'abstr-fraction', 'mathspeak.brief',
      '[t] "frac"; [n] . (engine:style=feminine)',
      'self::fraction'
  );
  defineSpecialisedRule(
      'abstr-fraction', 'mathspeak.brief', 'mathspeak.sbrief'
  );

  defineRule(
      'abstr-continued-fraction', 'default.default',
      '[t] "fraction continue"; [n] . (engine:style=feminine)',
      'self::fraction',
      'children/*[2]/descendant-or-self::*[@role="ellipsis"]'
  );
  defineRule(
      'abstr-continued-fraction', 'mathspeak.brief',
      '[t] "frac continue"; [n] . (engine:style=feminine)',
      'self::fraction',
      'children/*[2]/descendant-or-self::*[@role="ellipsis"]'
  );
  defineSpecialisedRule(
      'abstr-continued-fraction', 'mathspeak.brief', 'mathspeak.sbrief'
  );


  // Roots
  defineRule(
      'abstr-sqrt', 'default.default',
      '[t] "racine carrée"; [n] . (engine:style=feminine)',
      'self::sqrt'
  );

  defineRule(
      'abstr-sqrt-nested', 'default.default',
      '[t] "racine carrée imbriquée"; [n] . (engine:style=feminine)',
      'self::sqrt',
      'children/*/descendant-or-self::sqrt or' +
      ' children/*/descendant-or-self::root'
  );

  // Content following the root expression.
  defineRule(
      'abstr-root', 'default.default',
      '[t] "racine d\'indice"; ' +
      '[n] children/*[1] (engine:modality="speech"); [t] "fin indice"; ' +
      '[n] . (engine:style=feminine);',
      'self::root', 'contains(@grammar, "collapsed")',
      'following-sibling::* or ancestor::*/following-sibling::*'
  );
  defineRule(
      'abstr-root', 'default.default',
      '[t] "racine d\'indice";' +
      '[n] children/*[1] (engine:modality=speech);  [n] . (engine:style=feminine)',
      'self::root'
  );
  defineRule(
      'abstr-root', 'mathspeak.brief',
      '[t] "racine"; [n] . (engine:style=feminine)',
      'self::root'
  );
  defineSpecialisedRule(
      'abstr-root', 'mathspeak.brief', 'mathspeak.sbrief'
  );
  // Content following the root expression.
  defineRule(
      'abstr-root-nested', 'default.default',
      '[t] "racine imbriquée d\'indice"; [n] children/*[1] (engine:modality=speech);' +
      ' [t] "fin indice"; [n] . (engine:style=feminine);',
      'self::root', 'contains(@grammar, "collapsed")',
      'children/*/descendant-or-self::sqrt or' +
      ' children/*/descendant-or-self::root',
      'following-sibling::* or ancestor::*/following-sibling::*'
  );
  defineRule(
      'abstr-root-nested', 'default.default',
      '[t] "racine imbriquée d\'indice"; ' +
      '[n] children/*[1] (engine:modality=speech);  [n] . (engine:style=feminine)',
      'self::root', 'children/*/descendant-or-self::sqrt or' +
      ' children/*/descendant-or-self::root'
  );
  defineRule(
      'abstr-root-nested', 'mathspeak.brief',
      '[t] "racine imbriquée"; [n] . (engine:style=feminine)',
      'self::root', 'children/*/descendant-or-self::sqrt or ' +
      'children/*/descendant-or-self::root'
  );
  defineSpecialisedRule(
      'abstr-root-nested', 'mathspeak.brief', 'mathspeak.sbrief'
  );

  // Superscript
  defineRule(
      'abstr-superscript', 'default.default',
      '[t] "puissance"; [n] . (engine:style=feminine)',
      'self::superscript'
  );

  // Subscript
  defineRule(
      'abstr-subscript', 'default.default',
      '[t] "indice"; [n] . (engine:style=masculine)',
      'self::subscript'
  );

  // Subsuperscript
  defineRule(
      'abstr-subsup', 'default.default',
      '[t] "puissance avec index"; [n] . (engine:style=feminine)',
      'self::superscript',
      'name(children/*[1])="subscript"'
  );

  // Infixop
  defineRule(
      'abstr-infixop', 'default.default',
      '[t] @role (grammar:localRole); [t] "avec"; [t] count(./children/*);' +
      ' [t] "éléments"; [n] . (engine:style=masculine)',
      'self::infixop'
  );
  defineRule(
      'abstr-infixop', 'default.default',
      '[t] @role (grammar:localRole); [t] "avec un nombre d\'éléments' +
      ' variable"; [n] . (engine:style=masculine)',
      'self::infixop', 'count(./children/*)>2',
      './children/punctuation[@role="ellipsis"]'
  );
  defineRule(
      'abstr-infixop', 'mathspeak.brief',
      '[t] @role (grammar:localRole); [n] . (engine:style=masculine)',
      'self::infixop'
  );
  defineSpecialisedRule(
      'abstr-infixop', 'mathspeak.brief', 'mathspeak.sbrief'
  );

  defineRule(
      'abstr-addition', 'default.default',
      '[t] "somme avec"; [t] count(./children/*); ' +
      '[t] "opérandes"; [n] . (engine:style=feminine)',
      'self::infixop', '@role="addition"'
  );
  defineRule(
      'abstr-addition', 'mathspeak.brief',
      '[t] "somme"; [n] . (engine:style=feminine)',
      'self::infixop', '@role="addition"'
  );
  defineSpecialisedRule(
      'abstr-addition', 'mathspeak.brief', 'mathspeak.sbrief'
  );
  defineRule(
      'abstr-var-addition', 'default.default',
      '[t] "somme avec un nombre variable d\'opérandes"; [n] . (engine:style=feminine)',
      'self::infixop', '@role="addition"',
      'count(./children/*)>2', './children/punctuation[@role="ellipsis"]'
  );

  defineRule(
      'abstr-multiplication', 'default.default',
      '[t] "produit avec"; [t] count(./children/*);' +
      ' [t] "facteurs"; [n] . (engine:style=masculine);',
      'self::infixop', '@role="multiplication"'
  );
  defineRule(
      'abstr-multiplication', 'mathspeak.brief',
      '[t] "produit"; [n] . (engine:style=masculine)',
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
      '[t] "produit avec un nombre de facteurs variable";' +
      ' [n] . (engine:style=masculine)',
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
      '[t] "vecteur de dimension"; [t] count(./children/*);' +
      ' [n] . (engine:style=masculine)',
      'self::vector'
  );
  defineRule(
      'abstr-vector', 'mathspeak.brief',
      '[t] "vecteur"; [n] . (engine:style=masculine)',
      'self::vector'
  );
  defineSpecialisedRule(
      'abstr-vector', 'mathspeak.brief', 'mathspeak.sbrief'
  );
  defineRule(
      'abstr-var-vector', 'default.default',
      '[t] "vecteur colonne de dimension n"; [n] . (engine:style=masculine)',
      'self::vector',
      './children/*/children/punctuation[@role="ellipsis"]'
  );

  defineRule(
      'abstr-binomial', 'default.default',
      '[t] "binomial"; [n] . (engine:style=masculine)',
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
      '[t] "déterminant de dimension"; [t] count(./children/*);' +
      ' [n] . (engine:style=masculine)',
      'self::matrix', '@role="determinant"'
  );
  defineRule(
      'abstr-determinant', 'mathspeak.brief',
      '[t] "déterminant"; [n] . (engine:style=masculine)',
      'self::matrix', '@role="determinant"'
  );
  defineSpecialisedRule(
      'abstr-determinant', 'mathspeak.brief', 'mathspeak.sbrief'
  );
  defineRule(
      'abstr-var-determinant', 'default.default',
      '[t] "déterminant de dimension n"; [n] . (engine:style=masculine)',
      'self::matrix', '@role="determinant"',
      './children/*/children/*/children/punctuation[@role="ellipsis"]'
  );

  defineRule(
      'abstr-squarematrix', 'default.default',
      '[t] "matrice carrée de dimension"; [t] count(./children/*); ' +
      '[n] . (engine:style=feminine)',
      'self::matrix', '@role="squarematrix"'
  );
  defineRule(
      'abstr-squarematrix', 'mathspeak.brief',
      '[t] "matrice carrée"; [n] . (engine:style=feminine)',
      'self::matrix', '@role="squarematrix"'
  );
  defineSpecialisedRule(
      'abstr-squarematrix', 'mathspeak.brief', 'mathspeak.sbrief'
  );

  defineRule(
      'abstr-rowvector', 'default.default',
      '[t] "vecteur ligne de dimension"; [t] count(./children/row/children/*); ' +
      '[n] . (engine:style=masculine)',
      'self::matrix', '@role="rowvector"'
  );
  defineRule(
      'abstr-rowvector', 'mathspeak.brief',
      '[t] "vecteur ligne"; [n] . (engine:style=masculine)',
      'self::matrix', '@role="rowvector"'
  );
  defineSpecialisedRule(
      'abstr-rowvector', 'mathspeak.brief', 'mathspeak.sbrief'
  );
  defineRule(
      'abstr-var-matrix', 'default.default',
      '[t] "vecteur ligne de dimension n"',
      'self::matrix', '@role="rowvector"',
      './children/*/children/*/children/punctuation[@role="ellipsis"]'
  );

  defineRule(
      'abstr-matrix', 'default.default',
      '[t] "matrice"; [t] count(children/*);  [t] "par";' +
      '[t] count(children/*[1]/children/*); [n] . (engine:style=feminine)',
      'self::matrix'
  );
  defineRule(
      'abstr-matrix', 'mathspeak.brief',
      '[t] "matrice"; [n] . (engine:style=feminine)',
      'self::matrix'
  );
  defineSpecialisedRule(
      'abstr-matrix', 'mathspeak.brief', 'mathspeak.sbrief'
  );
  defineRule(
      'abstr-var-matrix', 'default.default',
      '[t] "matrice de dimension n par m"; [n] . (engine:style=feminine)',
      'self::matrix',
      './children/*/children/*/children/punctuation[@role="ellipsis"]'
  );


  // Cases
  defineRule(
      'abstr-cases', 'default.default',
      '[t] "déclaration de cas";' +
      '[t] "avec"; [t] count(children/*); [t] "cas";' +
      ' [n] . (engine:style=feminine)',
      'self::cases'
  );
  defineRule(
      'abstr-cases', 'mathspeak.brief',
      '[t] "déclaration de cas"; [n] . (engine:style=feminine)',
      'self::cases'
  );
  defineSpecialisedRule(
      'abstr-cases', 'mathspeak.brief', 'mathspeak.sbrief'
  );
  defineRule(
      'abstr-var-cases', 'default.default',
      '[t] "déclaration de cas variable"; [n] . (engine:style=feminine)',
      'self::cases',
      './children/row/children/cell/children/punctuation[@role="ellipsis"]' +
      'or ./children/line/children/punctuation[@role="ellipsis"]'
  );


  // Punctuated
  defineRule(
      'abstr-punctuated', 'default.default',
      '[t] "liste de longueur"; [t] count(children/*) - count(content/*);' +
      ' [t] "séparée par des"; [n] content/*[1] (join:""); [t] "s";' +
      ' [n] . (engine:style=feminine)',
      'self::punctuated'
  );
  defineRule(
      'abstr-punctuated', 'mathspeak.brief',
      '[t] "liste séparée par des"; [n] content/*[1] (join:""); [t] "s";' +
      ' [n] . (engine:style=feminine)',
      'self::punctuated'
  );
  defineSpecialisedRule(
      'abstr-punctuated', 'mathspeak.brief', 'mathspeak.sbrief'
  );
  defineRule(
      'abstr-var-punctuated', 'default.default',
      '[t] "liste de longueur variable séparée par des"; ' +
      '[n] content/*[1] (join:""); [t] "s"; [n] . (engine:style=feminine)',
      'self::punctuated',
      './children/punctuation[@role="ellipsis"]'
  );


  defineRule(
      'abstr-bigop', 'default.default',
      '[n] content/*[1]; [n] . (engine:style=masculine)',
      'self::bigop'
  );

  defineRule(
      'abstr-integral', 'default.default',
      '[t] "intégrale"; [n] . (engine:style=feminine)',
      '@role="integral"'
  );

  defineRule(
      'abstr-relation', 'default.default',
      '[t] @role (grammar:localRole); [n] . (engine:style=masculine);',
      'self::relseq', 'count(./children/*)=2'
  );

  defineRule(
      'abstr-relation-seq', 'default.default',
      '[t] @role (grammar:localRole); [t] "séquence";' +
      ' [t] "avec"; [t] count(./children/*); [t] "éléments";' +
      ' [n] . (engine:style=feminine)',
      'self::relseq', 'count(./children/*)>2'
  );
  defineRule(
      'abstr-relation-seq', 'mathspeak.brief',
      '[t] @role (grammar:localRole); [t] "séquence";'
      + ' [n] . (engine:style=feminine)',
      'self::relseq', 'count(./children/*)>2'
  );
  defineSpecialisedRule(
      'abstr-relation-seq', 'mathspeak.brief', 'mathspeak.sbrief'
  );
  defineRule(
      'abstr-var-relation', 'default.default',
      '[t] @role (grammar:localRole); [t] "séquence";' +
      ' [t] "avec un nombre de éléments variable";' +
      ' [n] . (engine:style=feminine)',
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
      '[t] "séquence de relation";' +
      ' [t] "avec"; [t] count(./children/*); [t] "éléments";' +
      ' [n] . (engine:style=feminine)',
      'self::multirel', 'count(./children/*)>2'
  );
  defineRule(
      'abstr-multirel', 'mathspeak.brief',
      '[t] "séquence de relation"; [n] . (engine:style=feminine)',
      'self::multirel', 'count(./children/*)>2'
  );
  defineSpecialisedRule(
      'abstr-multirel', 'mathspeak.brief', 'mathspeak.sbrief'
  );
  defineRule(
      'abstr-var-multirel', 'default.default',
      '[t] "séquence de relation avec un nombre de éléments variable";' +
      ' [n] . (engine:style=feminine)',
      'self::multirel', 'count(./children/*)>2',
      './children/punctuation[@role="ellipsis"]'
  );

  defineRule(
      'abstr-table', 'default.default',
      '[t] "table avec"; ' +
      '[t] count(children/*); [t] "lignes et";' +
      '[t] count(children/*[1]/children/*); ' +
      '[t] "colonnes"; [n] . (engine:style=feminine);',
      'self::table'
  );
  defineRule(
      'abstr-line', 'default.default',
      '[t] "dans"; [t] @role (grammar:localRole);' +
      ' [n] . (engine:style=masculine)',
      'self::line'
  );
  defineRule(
      'abstr-row', 'default.default',
      '[t] "dans"; [t] @role (grammar:localRole);' +
      '[t] count(preceding-sibling::..); [t] "avec";' +
      '[t] count(children/*); [t] "colonnes"; [n] . (engine:style=feminine)',
      'self::row'
  );
  defineRule(
      'abstr-cell', 'default.default',
      '[t] "dans"; [t] @role (grammar:localRole); [n] . (engine:style=feminine);',
      'self::cell'
  );

};

});  // goog.scope


sre.SummaryFrench.getInstance().initializer = [
  sre.SummaryFrench.initSummaryFrench_
];

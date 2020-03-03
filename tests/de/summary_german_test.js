// Copyright (c) 2020 Volker Sorge
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
 * @fileoverview Testcases for summary speech generation.
 *
 * @author v.sorge@mathjax.org (Volker Sorge)
 */

goog.provide('sre.SummaryGermanTest');

goog.require('sre.SummaryRuleTest');



/**
 * @constructor
 * @extends {sre.SummaryRuleTest}
 */
sre.SummaryGermanTest = function() {
  sre.SummaryGermanTest.base(this, 'constructor');

  /**
   * @override
   */
  this.information = 'Summary German tests.';
  this.locale = 'de';
  this.setActive('SummaryGerman');
};
goog.inherits(sre.SummaryGermanTest, sre.SummaryRuleTest);


/**
 * Testing Summary Rule for abstr-addition.
 */
sre.SummaryGermanTest.prototype.testAbstrAddition = function() {
  var mml = '<mi>a</mi><mo>+</mo><mi>b</mi>';
  this.executeRuleTest(mml, 'somme avec 2 opérandes', 'default');
  this.executeRuleTest(mml, 'somme', 'brief');
  this.executeRuleTest(mml, 'somme', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-bigop.
 */
sre.SummaryGermanTest.prototype.testAbstrBigop = function() {
  var mml = '<mo>&#x2211;</mo><mi>x</mi>';
  this.executeRuleTest(mml, 'sommation', 'default');
  this.executeRuleTest(mml, 'sommation', 'brief');
  this.executeRuleTest(mml, 'sommation', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-binomial.
 */
sre.SummaryGermanTest.prototype.testAbstrBinomial = function() {
  var mml = '<mfenced open="(" close=")"><mtable><mtr><mtd><mi>x</mi></mtd>' +
      '</mtr><mtr><mtd><mi>y</mi></mtd></mtr></mtable></mfenced>';
  this.executeRuleTest(mml, 'binomial', 'default');
  this.executeRuleTest(mml, 'binomial', 'brief');
  this.executeRuleTest(mml, 'binomial', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-cases.
 */
sre.SummaryGermanTest.prototype.testAbstrCases = function() {
  var mml = '<mfenced separators="" open="{" close=""><mtable>' +
      '<mtr><mtd><mi>y</mi></mtd><mtd><mn>0</mn></mtd></mtr>' +
      '<mtr><mtd><mi>y</mi></mtd><mtd><mn>2</mn></mtd></mtr>' +
      '</mtable></mfenced>';
  this.executeRuleTest(mml, 'déclaration de cas avec 2 cas', 'default');
  this.executeRuleTest(mml, 'déclaration de cas', 'brief');
  this.executeRuleTest(mml, 'déclaration de cas', 'sbrief');
};


// TODO
/**
 * Testing Summary Rule for abstr-cell.
 */
sre.SummaryGermanTest.prototype.testAbstrCell = function() {
  var mml = '<mtable><mtr><mtd><mi>a</mi></mtd>' +
      '<mtd><mi>b</mi></mtd></mtr></mtable>';
  this.steps = ['DOWN', 'DOWN'];
  this.executeRuleTest(mml, '1re colonne dans tableau', 'default');
  this.executeRuleTest(mml, '1re colonne dans tableau', 'brief');
  this.executeRuleTest(mml, '1re colonne dans tableau', 'sbrief');
  this.steps = null;
};


/**
 * Testing Summary Rule for abstr-continued-fraction.
 */
sre.SummaryGermanTest.prototype.testAbstrContinuedFraction = function() {
  var mml = '<mfrac><msub>' +
      '<mi>b</mi><mn>1</mn></msub><mrow><msub><mi>a</mi><mn>1</mn></msub>' +
      '<mo>+</mo><mfrac><msub><mi>b</mi><mn>2</mn></msub><mrow><msub>' +
      '<mi>a</mi><mn>2</mn></msub><mo>+</mo><mfrac><msub><mi>b</mi>' +
      '<mn>3</mn></msub><mrow><msub><mi>a</mi><mn>3</mn></msub><mo>+</mo>' +
      '<mo>&#x2026;</mo></mrow></mfrac></mrow></mfrac></mrow></mfrac>';
  this.executeRuleTest(mml, 'fraction continue', 'default');
  this.executeRuleTest(mml, 'frac continue', 'brief');
  this.executeRuleTest(mml, 'frac continue', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-determinant.
 */
sre.SummaryGermanTest.prototype.testAbstrDeterminant = function() {
  var mml = '<mfenced open="|" close="|"><mtable>' +
      '<mtr><mtd><mi>a</mi></mtd><mtd><mi>b</mi></mtd></mtr>' +
      '<mtr><mtd><mi>c</mi></mtd><mtd><mi>d</mi></mtd></mtr>' +
      '</mtable></mfenced>';
  this.executeRuleTest(mml, 'déterminant de dimension 2', 'default');
  this.executeRuleTest(mml, 'déterminant', 'brief');
  this.executeRuleTest(mml, 'déterminant', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-fraction.
 */
sre.SummaryGermanTest.prototype.testAbstrFraction = function() {
  var mml = '<mfrac><mn>1</mn><mi>x</mi></mfrac>';
  this.executeRuleTest(mml, 'fraction', 'default');
  this.executeRuleTest(mml, 'frac', 'brief');
  this.executeRuleTest(mml, 'frac', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-function.
 */
sre.SummaryGermanTest.prototype.testAbstrFunction = function() {
  // var mml = '<mi>sin</mi><mi>x</mi>';
  var mml = '<mi>sin</mi>';
  this.executeRuleTest(mml, 'expression fonctionnelle', 'default');
  this.executeRuleTest(mml, 'fonction', 'brief');
  this.executeRuleTest(mml, 'fonction', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-identifier.
 */
sre.SummaryGermanTest.prototype.testAbstrIdentifier = function() {
  var mml = '<mi>a</mi>';
  this.executeRuleTest(mml, 'identifiant', 'default');
  this.executeRuleTest(mml, 'identifiant', 'brief');
  this.executeRuleTest(mml, 'identifiant', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-infixop.
 */
sre.SummaryGermanTest.prototype.testAbstrInfixop = function() {
  var mml = '<mi>a</mi><mo>/</mo><mi>b</mi>';
  this.executeRuleTest(mml, 'division avec 2 éléments', 'default');
  this.executeRuleTest(mml, 'division', 'brief');
  this.executeRuleTest(mml, 'division', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-integral.
 */
sre.SummaryGermanTest.prototype.testAbstrIntegral = function() {
  var mml = '<mo>∮</mo><mi>E</mi><mo>·</mo><mi>d</mi>' +
      '<mi mathvariant="bold">l</mi>';
  this.executeRuleTest(mml, 'intégrale', 'default');
  this.executeRuleTest(mml, 'intégrale', 'brief');
  this.executeRuleTest(mml, 'intégrale', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-lim.
 */
sre.SummaryGermanTest.prototype.testAbstrLim = function() {
  var mml = '<mi>lim</mi>';
  this.executeRuleTest(mml, 'fonction de limitation', 'default');
  this.executeRuleTest(mml, 'lim', 'brief');
  this.executeRuleTest(mml, 'lim', 'sbrief');
};


// TODO
/**
 * Testing Summary Rule for abstr-line.
 */
sre.SummaryGermanTest.prototype.testAbstrLine = function() {
  var mml = '<mtable><mtr><mtd><mi>a</mi></mtd></mtr></mtable>';
  this.steps = ['DOWN'];
  this.executeRuleTest(mml, '1re rangée dans multi-ligne', 'default');
  this.executeRuleTest(mml, '1re rangée dans multi-ligne', 'brief');
  this.executeRuleTest(mml, '1re rangée dans multi-ligne', 'sbrief');
  this.steps = null;
};


/**
 * Testing Summary Rule for abstr-matrix.
 */
sre.SummaryGermanTest.prototype.testAbstrMatrix = function() {
  var mml = '<mfenced open="[" close="]"><mtable>' +
      '<mtr><mtd><mi>a</mi></mtd><mtd><mi>b</mi></mtd></mtr>' +
      '<mtr><mtd><mi>c</mi></mtd><mtd><mi>d</mi></mtd></mtr>' +
      '<mtr><mtd><mi>e</mi></mtd><mtd><mi>f</mi></mtd></mtr>' +
      '</mtable></mfenced>';
  this.executeRuleTest(mml, 'matrice 3 par 2', 'default');
  this.executeRuleTest(mml, 'matrice', 'brief');
  this.executeRuleTest(mml, 'matrice', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-mixed-number.
 */
sre.SummaryGermanTest.prototype.testAbstrMixedNumber = function() {
  var mml = '<mn>1</mn><mfrac><mn>2</mn><mn>3</mn></mfrac>';
  this.executeRuleTest(mml, 'nombre fractionnaire', 'default');
  this.executeRuleTest(mml, 'nombre fractionnaire', 'brief');
  this.executeRuleTest(mml, 'nombre fractionnaire', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-multiplication.
 */
sre.SummaryGermanTest.prototype.testAbstrMultiplication = function() {
  var mml = '<mi>a</mi><mo>*</mo><mi>b</mi>';
  this.executeRuleTest(mml, 'produit avec 2 facteurs', 'default');
  this.executeRuleTest(mml, 'produit', 'brief');
  this.executeRuleTest(mml, 'produit', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-multirel.
 */
sre.SummaryGermanTest.prototype.testAbstrMultirel = function() {
  var mml = '<mi>a</mi><mo>=</mo><mi>b</mi><mo>&#x2264;</mo><mi>b</mi>';
  this.executeRuleTest(mml, 'séquence de relation avec 3 éléments', 'default');
  this.executeRuleTest(mml, 'séquence de relation', 'brief');
  this.executeRuleTest(mml, 'séquence de relation', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-number.
 */
sre.SummaryGermanTest.prototype.testAbstrNumber = function() {
  var mml = '<mn>123456</mn>';
  this.executeRuleTest(mml, 'nombre', 'default');
  this.executeRuleTest(mml, 'nombre', 'brief');
  this.executeRuleTest(mml, 'nombre', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-punctuated.
 */
sre.SummaryGermanTest.prototype.testAbstrPunctuated = function() {
  var mml = '<mi>a</mi><mo>,</mo><mi>b</mi><mo>,</mo><mi>c</mi>';
  this.executeRuleTest(mml, 'liste de longueur 3 séparée par des virgules', 'default');
  this.executeRuleTest(mml, 'liste séparée par des virgules', 'brief');
  this.executeRuleTest(mml, 'liste séparée par des virgules', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-relation.
 */
sre.SummaryGermanTest.prototype.testAbstrRelation = function() {
  var mml = '<mi>a</mi><mo>=</mo><mi>b</mi>';
  this.executeRuleTest(mml, 'égalité', 'default');
  this.executeRuleTest(mml, 'égalité', 'brief');
  this.executeRuleTest(mml, 'égalité', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-relation-seq.
 */
sre.SummaryGermanTest.prototype.testAbstrRelationSeq = function() {
  var mml = '<mi>a</mi><mo>=</mo><mi>b</mi><mo>=</mo><mi>b</mi>';
  this.executeRuleTest(mml, 'égalité séquence avec 3 éléments', 'default');
  this.executeRuleTest(mml, 'égalité séquence', 'brief');
  this.executeRuleTest(mml, 'égalité séquence', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-root.
 */
sre.SummaryGermanTest.prototype.testAbstrRoot = function() {
  var mml = '<mroot><mi>x</mi><mn>3</mn></mroot>';
  this.executeRuleTest(mml, 'racine d\'indice 3', 'default');
  this.executeRuleTest(mml, 'racine', 'brief');
  this.executeRuleTest(mml, 'racine', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-root-nested.
 */
sre.SummaryGermanTest.prototype.testAbstrRootNested = function() {
  var mml = '<mroot><mrow><mroot><mi>x</mi><mn>4</mn></mroot>' +
      '<mo>+</mo><mi>x</mi></mrow><mn>3</mn></mroot>';
  this.executeRuleTest(mml, 'racine imbriquée d\'indice 3', 'default');
  this.executeRuleTest(mml, 'racine imbriquée', 'brief');
  this.executeRuleTest(mml, 'racine imbriquée', 'sbrief');
};


// TODO
/**
 * Testing Summary Rule for abstr-row.
 */
sre.SummaryGermanTest.prototype.testAbstrRow = function() {
  var mml = '<mtable><mtr><mtd><mi>a</mi></mtd>' +
      '<mtd><mi>b</mi></mtd></mtr></mtable>';
  this.steps = ['DOWN'];
  this.executeRuleTest(mml, '1re rangée dans tableau avec 2 colonnes', 'default');
  this.executeRuleTest(mml, '1re rangée dans tableau avec 2 colonnes', 'brief');
  this.executeRuleTest(mml, '1re rangée dans tableau avec 2 colonnes', 'sbrief');
  this.steps = null;
};


/**
 * Testing Summary Rule for abstr-rowvector.
 */
sre.SummaryGermanTest.prototype.testAbstrRowvector = function() {
  var mml = '<mfenced open="[" close="]"><mtable>' +
      '<mtr><mtd><mi>a</mi></mtd><mtd><mi>b</mi></mtd></mtr>' +
      '</mtable></mfenced>';
  this.executeRuleTest(mml, 'vecteur ligne de dimension 2', 'default');
  this.executeRuleTest(mml, 'vecteur ligne', 'brief');
  this.executeRuleTest(mml, 'vecteur ligne', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-sqrt.
 */
sre.SummaryGermanTest.prototype.testAbstrSqrt = function() {
  var mml = '<msqrt><mn>2</mn></msqrt>';
  this.executeRuleTest(mml, 'racine carrée', 'default');
  this.executeRuleTest(mml, 'racine carrée', 'brief');
  this.executeRuleTest(mml, 'racine carrée', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-sqrt-nested.
 */
sre.SummaryGermanTest.prototype.testAbstrSqrtNested = function() {
  var mml = '<msqrt><mn>2</mn><msqrt><mn>2</mn></msqrt></msqrt>';
  this.executeRuleTest(mml, 'racine carrée imbriquée', 'default');
  this.executeRuleTest(mml, 'racine carrée imbriquée', 'brief');
  this.executeRuleTest(mml, 'racine carrée imbriquée', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-squarematrix.
 */
sre.SummaryGermanTest.prototype.testAbstrSquarematrix = function() {
  var mml = '<mfenced open="[" close="]"><mtable>' +
      '<mtr><mtd><mi>a</mi></mtd><mtd><mi>b</mi></mtd></mtr>' +
      '<mtr><mtd><mi>c</mi></mtd><mtd><mi>d</mi></mtd></mtr>' +
      '</mtable></mfenced>';
  this.executeRuleTest(mml, 'matrice carrée de dimension 2', 'default');
  this.executeRuleTest(mml, 'matrice carrée', 'brief');
  this.executeRuleTest(mml, 'matrice carrée', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-subscript.
 */
sre.SummaryGermanTest.prototype.testAbstrSubscript = function() {
  var mml = '<msub><mi>a</mi><mi>b</mi></msub>';
  this.executeRuleTest(mml, 'indice', 'default');
  this.executeRuleTest(mml, 'indice', 'brief');
  this.executeRuleTest(mml, 'indice', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-subsup.
 */
sre.SummaryGermanTest.prototype.testAbstrSubsup = function() {
  var mml = '<msubsup><mi>a</mi><mi>c</mi><mi>b</mi></msubsup>';
  this.executeRuleTest(mml, 'puissance avec index', 'default');
  this.executeRuleTest(mml, 'puissance avec index', 'brief');
  this.executeRuleTest(mml, 'puissance avec index', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-superscript.
 */
sre.SummaryGermanTest.prototype.testAbstrSuperscript = function() {
  var mml = '<msup><mi>a</mi><mi>b</mi></msup>';
  this.executeRuleTest(mml, 'puissance', 'default');
  this.executeRuleTest(mml, 'puissance', 'brief');
  this.executeRuleTest(mml, 'puissance', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-table.
 */
sre.SummaryGermanTest.prototype.testAbstrTable = function() {
  var mml = '<mtable><mtr><mtd><mi>a</mi></mtd><mtd><mi>b</mi></mtd></mtr>' +
      '<mtr><mtd><mi>c</mi></mtd><mtd><mi>d</mi></mtd></mtr></mtable>';
  this.executeRuleTest(mml, 'table avec 2 lignes et 2 colonnes', 'default');
  this.executeRuleTest(mml, 'table avec 2 lignes et 2 colonnes', 'brief');
  this.executeRuleTest(mml, 'table avec 2 lignes et 2 colonnes', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-text.
 */
sre.SummaryGermanTest.prototype.testAbstrText = function() {
  var mml = '<mtext>a b c</mtext>';
  this.executeRuleTest(mml, 'texte', 'default');
  this.executeRuleTest(mml, 'texte', 'brief');
  this.executeRuleTest(mml, 'texte', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-var-addition.
 */
sre.SummaryGermanTest.prototype.testAbstrVarAddition = function() {
  var mml = '<mi>a</mi><mo>+</mo><mi>&#x2026;</mi><mo>+</mo><mi>b</mi>';
  this.executeRuleTest(mml, 'somme avec un nombre variable d\'opérandes', 'default');
  this.executeRuleTest(mml, 'somme', 'brief');
  this.executeRuleTest(mml, 'somme', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-var-cases.
 */
sre.SummaryGermanTest.prototype.testAbstrVarCases = function() {
  var mml = '<mo>{</mo><mtable><mtr><mtd><mi>a</mi></mtd></mtr><mtr><mtd>' +
      '<mo>&#x2026;</mo></mtd></mtr><mtr><mtd><mi>b</mi></mtd></mtr></mtable>';
  this.executeRuleTest(
      mml, 'déclaration de cas variable', 'default');
  this.executeRuleTest(mml, 'déclaration de cas', 'brief');
  this.executeRuleTest(mml, 'déclaration de cas', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-var-determinant.
 */
sre.SummaryGermanTest.prototype.testAbstrVarDeterminant = function() {
  var mml = '<mo>|</mo><mtable><mtr><mtd><mi>a</mi></mtd><mtd><mi>b</mi>' +
      '</mtd><mtd><mi>e</mi></mtd></mtr><mtr><mtd />' +
      '<mtd><mo>&#x22EF;</mo></mtd><mtd /></mtr><mtr><mtd><mi>c</mi></mtd>' +
      '<mtd><mi>d</mi></mtd><mtd><mi>f</mi></mtd></mtr></mtable><mo>|</mo>';
  this.executeRuleTest(mml, 'déterminant de dimension n', 'default');
  this.executeRuleTest(mml, 'déterminant', 'brief');
  this.executeRuleTest(mml, 'déterminant', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-var-matrix.
 */
sre.SummaryGermanTest.prototype.testAbstrVarMatrix = function() {
  var mml = '<mo>(</mo><mtable><mtr><mtd><mi>a</mi></mtd><mtd><mi>b</mi>' +
      '</mtd><mtd><mi>e</mi></mtd></mtr><mtr><mtd />' +
      '<mtd><mo>&#x22EF;</mo></mtd><mtd /></mtr><mtr><mtd><mi>c</mi></mtd>' +
      '<mtd><mi>d</mi></mtd><mtd><mi>f</mi></mtd></mtr></mtable><mo>)</mo>';
  this.executeRuleTest(mml, 'matrice de dimension n par m', 'default');
  this.executeRuleTest(mml, 'matrice carrée', 'brief');
  this.executeRuleTest(mml, 'matrice carrée', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-var-multiplication.
 */
sre.SummaryGermanTest.prototype.testAbstrVarMultiplication = function() {
  var mml = '<mi>a</mi><mo>*</mo><mo>&#x2026;</mo><mo>*</mo><mi>b</mi>';
  this.executeRuleTest(
      mml, 'produit avec un nombre de facteurs variable', 'default');
  this.executeRuleTest(mml, 'produit', 'brief');
  this.executeRuleTest(mml, 'produit', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-var-multirel.
 */
sre.SummaryGermanTest.prototype.testAbstrVarMultirel = function() {
  var mml = '<mi>a</mi><mo>=</mo><mo>&#x2026;</mo><mo>&#x2264;</mo><mi>b</mi>';
  this.executeRuleTest(
      mml, 'séquence de relation avec un nombre de éléments variable', 'default');
  this.executeRuleTest(mml, 'séquence de relation', 'brief');
  this.executeRuleTest(mml, 'séquence de relation', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-var-punctuated.
 */
sre.SummaryGermanTest.prototype.testAbstrVarPunctuated = function() {
  var mml = '<mi>a</mi><mo>,</mo><mo>&#x2026;</mo><mo>,</mo><mi>b</mi>';
  this.executeRuleTest(
      mml, 'liste de longueur variable séparée par des virgules', 'default');
  this.executeRuleTest(mml, 'liste séparée par des virgules', 'brief');
  this.executeRuleTest(mml, 'liste séparée par des virgules', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-var-relation.
 */
sre.SummaryGermanTest.prototype.testAbstrVarRelation = function() {
  var mml = '<mi>a</mi><mo>=</mo><mo>&#x2026;</mo><mo>=</mo><mi>b</mi>';
  this.executeRuleTest(
      mml, 'égalité séquence avec un nombre de éléments variable', 'default');
  this.executeRuleTest(mml, 'égalité séquence', 'brief');
  this.executeRuleTest(mml, 'égalité séquence', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-var-vector.
 */
sre.SummaryGermanTest.prototype.testAbstrVarVector = function() {
  var mml = '<mfenced open="[" close="]"><mtable>' +
      '<mtr><mtd><mi>a</mi></mtd></mtr>' +
      '<mtr><mtd><mo>&#x22EE;</mo></mtd></mtr>' +
      '<mtr><mtd><mi>c</mi></mtd></mtr>' +
      '<mtr><mtd><mi>d</mi></mtd></mtr>' +
      '</mtable></mfenced>';
  this.executeRuleTest(mml, 'vecteur colonne de dimension n', 'default');
  this.executeRuleTest(mml, 'vecteur', 'brief');
  this.executeRuleTest(mml, 'vecteur', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-vector.
 */
sre.SummaryGermanTest.prototype.testAbstrVector = function() {
  var mml = '<mfenced open="[" close="]"><mtable>' +
      '<mtr><mtd><mi>a</mi></mtd></mtr>' +
      '<mtr><mtd><mi>c</mi></mtd></mtr>' +
      '<mtr><mtd><mi>e</mi></mtd></mtr>' +
      '</mtable></mfenced>';
  this.executeRuleTest(mml, 'vecteur de dimension 3', 'default');
  this.executeRuleTest(mml, 'vecteur', 'brief');
  this.executeRuleTest(mml, 'vecteur', 'sbrief');
};

// Copyright (c) 2019 Volker Sorge
// Copyright (c) 2019 The MathJax Consortium
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
 * @fileoverview Testcases for collapse speech generation.
 *
 * @author v.sorge@mathjax.org (Volker Sorge)
 */

goog.provide('sre.CollapseFrenchTest');

goog.require('sre.CollapseRuleTest');



/**
 * @constructor
 * @extends {sre.CollapseRuleTest}
 */
sre.CollapseFrenchTest = function() {
  sre.CollapseFrenchTest.base(this, 'constructor');

  /**
   * @override
   */
  this.information = 'Collapse French tests.';

  this.domain = 'mathspeak';
  this.locale = 'fr';
  this.setActive('CollapseFrench');
};
goog.inherits(sre.CollapseFrenchTest, sre.CollapseRuleTest);


/**
 * Testing Collapse Rule for abstr-addition.
 */
sre.CollapseFrenchTest.prototype.testCollapsedAddition = function() {
  var mml = '<mi>a</mi><mo>+</mo><mi>b</mi>';
  this.executeRuleTest(mml, 'somme avec 2 opérandes compressée', 'default');
  this.executeRuleTest(mml, 'somme compressée', 'brief');
  this.executeRuleTest(mml, 'somme compressée', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-bigop.
 */
sre.CollapseFrenchTest.prototype.testCollapsedBigop = function() {
  var mml = '<mo>&#x2211;</mo><mi>x</mi>';
  this.executeRuleTest(mml, 'sommation compressé', 'default');
  this.executeRuleTest(mml, 'sommation compressé', 'brief');
  this.executeRuleTest(mml, 'sommation compressé', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-binomial.
 */
sre.CollapseFrenchTest.prototype.testCollapsedBinomial = function() {
  var mml = '<mfenced open="(" close=")"><mtable><mtr><mtd><mi>x</mi></mtd>' +
      '</mtr><mtr><mtd><mi>y</mi></mtd></mtr></mtable></mfenced>';
  this.executeRuleTest(mml, 'binomial compressé', 'default');
  this.executeRuleTest(mml, 'binomial compressé', 'brief');
  this.executeRuleTest(mml, 'binomial compressé', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-cases.
 */
sre.CollapseFrenchTest.prototype.testCollapsedCases = function() {
  var mml = '<mfenced separators="" open="{" close=""><mtable>' +
      '<mtr><mtd><mi>y</mi></mtd><mtd><mn>0</mn></mtd></mtr>' +
      '<mtr><mtd><mi>y</mi></mtd><mtd><mn>2</mn></mtd></mtr>' +
      '</mtable></mfenced>';
  this.executeRuleTest(mml, 'déclaration de cas avec 2 cas compressée', 'default');
  this.executeRuleTest(mml, 'déclaration de cas compressée', 'brief');
  this.executeRuleTest(mml, 'déclaration de cas compressée', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-continued-fraction.
 */
sre.CollapseFrenchTest.prototype.testCollapsedContinuedFraction = function() {
  var mml = '<mfrac><msub>' +
      '<mi>b</mi><mn>1</mn></msub><mrow><msub><mi>a</mi><mn>1</mn></msub>' +
      '<mo>+</mo><mfrac><msub><mi>b</mi><mn>2</mn></msub><mrow><msub>' +
      '<mi>a</mi><mn>2</mn></msub><mo>+</mo><mfrac><msub><mi>b</mi>' +
      '<mn>3</mn></msub><mrow><msub><mi>a</mi><mn>3</mn></msub><mo>+</mo>' +
      '<mo>&#x2026;</mo></mrow></mfrac></mrow></mfrac></mrow></mfrac>';
  this.executeRuleTest(mml, 'fraction continue compressée', 'default');
  this.executeRuleTest(mml, 'frac continue compressée', 'brief');
  this.executeRuleTest(mml, 'frac continue compressée', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-determinant.
 */
sre.CollapseFrenchTest.prototype.testCollapsedDeterminant = function() {
  var mml = '<mfenced open="|" close="|"><mtable>' +
      '<mtr><mtd><mi>a</mi></mtd><mtd><mi>b</mi></mtd></mtr>' +
      '<mtr><mtd><mi>c</mi></mtd><mtd><mi>d</mi></mtd></mtr>' +
      '</mtable></mfenced>';
  this.executeRuleTest(mml, 'déterminant de dimension 2 compressé', 'default');
  this.executeRuleTest(mml, 'déterminant compressé', 'brief');
  this.executeRuleTest(mml, 'déterminant compressé', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-fraction.
 */
sre.CollapseFrenchTest.prototype.testCollapsedFraction = function() {
  var mml = '<mfrac><mn>1</mn><mi>x</mi></mfrac>';
  this.executeRuleTest(mml, 'fraction compressée', 'default');
  this.executeRuleTest(mml, 'frac compressée', 'brief');
  this.executeRuleTest(mml, 'frac compressée', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-function.
 */
sre.CollapseFrenchTest.prototype.testCollapsedFunction = function() {
  // var mml = '<mi>sin</mi><mi>x</mi>';
  var mml = '<mi>sin</mi>';
  this.executeRuleTest(mml, 'expression fonctionnelle compressée', 'default');
  this.executeRuleTest(mml, 'fonction compressée', 'brief');
  this.executeRuleTest(mml, 'fonction compressée', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-identifier.
 */
sre.CollapseFrenchTest.prototype.testCollapsedIdentifier = function() {
  var mml = '<mi>a</mi>';
  this.executeRuleTest(mml, 'identifiant long compressé', 'default');
  this.executeRuleTest(mml, 'identifiant long compressé', 'brief');
  this.executeRuleTest(mml, 'identifiant long compressé', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-infixop.
 */
sre.CollapseFrenchTest.prototype.testCollapsedInfixop = function() {
  var mml = '<mi>a</mi><mo>/</mo><mi>b</mi>';
  this.executeRuleTest(mml, 'division avec 2 éléments compressé', 'default');
  this.executeRuleTest(mml, 'division compressé', 'brief');
  this.executeRuleTest(mml, 'division compressé', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-integral.
 */
sre.CollapseFrenchTest.prototype.testCollapsedIntegral = function() {
  var mml = '<mo>∮</mo><mi>E</mi><mo>·</mo><mi>d</mi>' +
      '<mi mathvariant="bold">l</mi>';
  this.executeRuleTest(mml, 'intégrale compressée', 'default');
  this.executeRuleTest(mml, 'intégrale compressée', 'brief');
  this.executeRuleTest(mml, 'intégrale compressée', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-lim.
 */
sre.CollapseFrenchTest.prototype.testCollapsedLim = function() {
  var mml = '<mi>lim</mi>';
  this.executeRuleTest(mml, 'fonction de limitation compressée', 'default');
  this.executeRuleTest(mml, 'lim compressée', 'brief');
  this.executeRuleTest(mml, 'lim compressée', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-matrix.
 */
sre.CollapseFrenchTest.prototype.testCollapsedMatrix = function() {
  var mml = '<mfenced open="[" close="]"><mtable>' +
      '<mtr><mtd><mi>a</mi></mtd><mtd><mi>b</mi></mtd></mtr>' +
      '<mtr><mtd><mi>c</mi></mtd><mtd><mi>d</mi></mtd></mtr>' +
      '<mtr><mtd><mi>e</mi></mtd><mtd><mi>f</mi></mtd></mtr>' +
      '</mtable></mfenced>';
  this.executeRuleTest(mml, 'matrice 3 par 2 compressée', 'default');
  this.executeRuleTest(mml, 'matrice compressée', 'brief');
  this.executeRuleTest(mml, 'matrice compressée', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-mixed-number.
 */
sre.CollapseFrenchTest.prototype.testCollapsedMixedNumber = function() {
  var mml = '<mn>1</mn><mfrac><mn>2</mn><mn>3</mn></mfrac>';
  this.executeRuleTest(mml, 'nombre fractionnaire long compressé', 'default');
  this.executeRuleTest(mml, 'nombre fractionnaire long compressé', 'brief');
  this.executeRuleTest(mml, 'nombre fractionnaire long compressé', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-multiplication.
 */
sre.CollapseFrenchTest.prototype.testCollapsedMultiplication = function() {
  var mml = '<mi>a</mi><mo>*</mo><mi>b</mi>';
  this.executeRuleTest(mml, 'produit avec 2 facteurs compressé', 'default');
  this.executeRuleTest(mml, 'produit compressé', 'brief');
  this.executeRuleTest(mml, 'produit compressé', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-multirel.
 */
sre.CollapseFrenchTest.prototype.testCollapsedMultirel = function() {
  var mml = '<mi>a</mi><mo>=</mo><mi>b</mi><mo>&#x2264;</mo><mi>b</mi>';
  this.executeRuleTest(mml, 'séquence de relation avec 3 éléments compressée', 'default');
  this.executeRuleTest(mml, 'séquence de relation compressée', 'brief');
  this.executeRuleTest(mml, 'séquence de relation compressée', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-number.
 */
sre.CollapseFrenchTest.prototype.testCollapsedNumber = function() {
  var mml = '<mn>123456</mn>';
  this.executeRuleTest(mml, 'nombre long compressé', 'default');
  this.executeRuleTest(mml, 'nombre long compressé', 'brief');
  this.executeRuleTest(mml, 'nombre long compressé', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-punctuated.
 */
sre.CollapseFrenchTest.prototype.testCollapsedPunctuated = function() {
  var mml = '<mi>a</mi><mo>,</mo><mi>b</mi><mo>,</mo><mi>c</mi>';
  this.executeRuleTest(mml, 'liste de longueur 3 séparée par des virgules compressée', 'default');
  this.executeRuleTest(mml, 'liste séparée par des virgules compressée', 'brief');
  this.executeRuleTest(mml, 'liste séparée par des virgules compressée', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-relation.
 */
sre.CollapseFrenchTest.prototype.testCollapsedRelation = function() {
  var mml = '<mi>a</mi><mo>=</mo><mi>b</mi>';
  this.executeRuleTest(mml, 'égalité compressé', 'default');
  this.executeRuleTest(mml, 'égalité compressé', 'brief');
  this.executeRuleTest(mml, 'égalité compressé', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-relation-seq.
 */
sre.CollapseFrenchTest.prototype.testCollapsedRelationSeq = function() {
  var mml = '<mi>a</mi><mo>=</mo><mi>b</mi><mo>=</mo><mi>b</mi>';
  this.executeRuleTest(mml, 'égalité séquence avec 3 éléments compressée', 'default');
  this.executeRuleTest(mml, 'égalité séquence compressée', 'brief');
  this.executeRuleTest(mml, 'égalité séquence compressée', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-root.
 */
sre.CollapseFrenchTest.prototype.testCollapsedRoot = function() {
  var mml = '<mroot><mi>x</mi><mn>3</mn></mroot>';
  this.executeRuleTest(mml, 'racine d\'indice 3 compressée', 'default');
  this.executeRuleTest(mml, 'racine compressée', 'brief');
  this.executeRuleTest(mml, 'racine compressée', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-root-nested.
 */
sre.CollapseFrenchTest.prototype.testCollapsedRootNested = function() {
  var mml = '<mroot><mrow><mroot><mi>x</mi><mn>4</mn></mroot>' +
      '<mo>+</mo><mi>x</mi></mrow><mn>3</mn></mroot>';
  this.executeRuleTest(mml, 'racine imbriquée d\'indice 3 compressée', 'default');
  this.executeRuleTest(mml, 'racine imbriquée compressée', 'brief');
  this.executeRuleTest(mml, 'racine imbriquée compressée', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-rowvector.
 */
sre.CollapseFrenchTest.prototype.testCollapsedRowvector = function() {
  var mml = '<mfenced open="[" close="]"><mtable>' +
      '<mtr><mtd><mi>a</mi></mtd><mtd><mi>b</mi></mtd></mtr>' +
      '</mtable></mfenced>';
  this.executeRuleTest(mml, 'vecteur ligne de dimension 2 compressé', 'default');
  this.executeRuleTest(mml, 'vecteur ligne compressé', 'brief');
  this.executeRuleTest(mml, 'vecteur ligne compressé', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-sqrt.
 */
sre.CollapseFrenchTest.prototype.testCollapsedSqrt = function() {
  var mml = '<msqrt><mn>2</mn></msqrt>';
  this.executeRuleTest(mml, 'racine carrée compressée', 'default');
  this.executeRuleTest(mml, 'racine carrée compressée', 'brief');
  this.executeRuleTest(mml, 'racine carrée compressée', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-sqrt-nested.
 */
sre.CollapseFrenchTest.prototype.testCollapsedSqrtNested = function() {
  var mml = '<msqrt><mn>2</mn><msqrt><mn>2</mn></msqrt></msqrt>';
  this.executeRuleTest(mml, 'racine carrée imbriquée compressée', 'default');
  this.executeRuleTest(mml, 'racine carrée imbriquée compressée', 'brief');
  this.executeRuleTest(mml, 'racine carrée imbriquée compressée', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-squarematrix.
 */
sre.CollapseFrenchTest.prototype.testCollapsedSquarematrix = function() {
  var mml = '<mfenced open="[" close="]"><mtable>' +
      '<mtr><mtd><mi>a</mi></mtd><mtd><mi>b</mi></mtd></mtr>' +
      '<mtr><mtd><mi>c</mi></mtd><mtd><mi>d</mi></mtd></mtr>' +
      '</mtable></mfenced>';
  this.executeRuleTest(mml, 'matrice carrée de dimension 2 compressée', 'default');
  this.executeRuleTest(mml, 'matrice carrée compressée', 'brief');
  this.executeRuleTest(mml, 'matrice carrée compressée', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-subscript.
 */
sre.CollapseFrenchTest.prototype.testCollapsedSubscript = function() {
  var mml = '<msub><mi>a</mi><mi>b</mi></msub>';
  this.executeRuleTest(mml, 'indice compressé', 'default');
  this.executeRuleTest(mml, 'indice compressé', 'brief');
  this.executeRuleTest(mml, 'indice compressé', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-subsup.
 */
sre.CollapseFrenchTest.prototype.testCollapsedSubsup = function() {
  var mml = '<msubsup><mi>a</mi><mi>c</mi><mi>b</mi></msubsup>';
  this.executeRuleTest(mml, 'puissance avec index compressée', 'default');
  this.executeRuleTest(mml, 'puissance avec index compressée', 'brief');
  this.executeRuleTest(mml, 'puissance avec index compressée', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-superscript.
 */
sre.CollapseFrenchTest.prototype.testCollapsedSuperscript = function() {
  var mml = '<msup><mi>a</mi><mi>b</mi></msup>';
  this.executeRuleTest(mml, 'puissance compressée', 'default');
  this.executeRuleTest(mml, 'puissance compressée', 'brief');
  this.executeRuleTest(mml, 'puissance compressée', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-table.
 */
sre.CollapseFrenchTest.prototype.testCollapsedTable = function() {
  var mml = '<mtable><mtr><mtd><mi>a</mi></mtd><mtd><mi>b</mi></mtd></mtr>' +
      '<mtr><mtd><mi>c</mi></mtd><mtd><mi>d</mi></mtd></mtr></mtable>';
  this.executeRuleTest(mml, 'table avec 2 lignes et 2 colonnes compressée', 'default');
  this.executeRuleTest(mml, 'table avec 2 lignes et 2 colonnes compressée', 'brief');
  this.executeRuleTest(mml, 'table avec 2 lignes et 2 colonnes compressée', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-text.
 */
sre.CollapseFrenchTest.prototype.testCollapsedText = function() {
  var mml = '<mtext>a b c</mtext>';
  this.executeRuleTest(mml, 'texte compressé', 'default');
  this.executeRuleTest(mml, 'texte compressé', 'brief');
  this.executeRuleTest(mml, 'texte compressé', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-var-addition.
 */
sre.CollapseFrenchTest.prototype.testCollapsedVarAddition = function() {
  var mml = '<mi>a</mi><mo>+</mo><mi>&#x2026;</mi><mo>+</mo><mi>b</mi>';
  this.executeRuleTest(mml, 'somme avec un nombre variable d\'opérandes compressée', 'default');
  this.executeRuleTest(mml, 'somme compressée', 'brief');
  this.executeRuleTest(mml, 'somme compressée', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-var-cases.
 */
sre.CollapseFrenchTest.prototype.testCollapsedVarCases = function() {
  var mml = '<mo>{</mo><mtable><mtr><mtd><mi>a</mi></mtd></mtr><mtr><mtd>' +
      '<mo>&#x2026;</mo></mtd></mtr><mtr><mtd><mi>b</mi></mtd></mtr></mtable>';
  this.executeRuleTest(
      mml, 'déclaration de cas variable compressée', 'default');
  this.executeRuleTest(mml, 'déclaration de cas compressée', 'brief');
  this.executeRuleTest(mml, 'déclaration de cas compressée', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-var-determinant.
 */
sre.CollapseFrenchTest.prototype.testCollapsedVarDeterminant = function() {
  var mml = '<mo>|</mo><mtable><mtr><mtd><mi>a</mi></mtd><mtd><mi>b</mi>' +
      '</mtd><mtd><mi>e</mi></mtd></mtr><mtr><mtd />' +
      '<mtd><mo>&#x22EF;</mo></mtd><mtd /></mtr><mtr><mtd><mi>c</mi></mtd>' +
      '<mtd><mi>d</mi></mtd><mtd><mi>f</mi></mtd></mtr></mtable><mo>|</mo>';
  this.executeRuleTest(mml, 'déterminant de dimension n compressé', 'default');
  this.executeRuleTest(mml, 'déterminant compressé', 'brief');
  this.executeRuleTest(mml, 'déterminant compressé', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-var-matrix.
 */
sre.CollapseFrenchTest.prototype.testCollapsedVarMatrix = function() {
  var mml = '<mo>(</mo><mtable><mtr><mtd><mi>a</mi></mtd><mtd><mi>b</mi>' +
      '</mtd><mtd><mi>e</mi></mtd></mtr><mtr><mtd />' +
      '<mtd><mo>&#x22EF;</mo></mtd><mtd /></mtr><mtr><mtd><mi>c</mi></mtd>' +
      '<mtd><mi>d</mi></mtd><mtd><mi>f</mi></mtd></mtr></mtable><mo>)</mo>';
  this.executeRuleTest(mml, 'matrice de dimension n par m compressée', 'default');
  this.executeRuleTest(mml, 'matrice carrée compressée', 'brief');
  this.executeRuleTest(mml, 'matrice carrée compressée', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-var-multiplication.
 */
sre.CollapseFrenchTest.prototype.testCollapsedVarMultiplication = function() {
  var mml = '<mi>a</mi><mo>*</mo><mo>&#x2026;</mo><mo>*</mo><mi>b</mi>';
  this.executeRuleTest(
      mml, 'produit avec un nombre de facteurs variable compressé', 'default');
  this.executeRuleTest(mml, 'produit compressé', 'brief');
  this.executeRuleTest(mml, 'produit compressé', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-var-multirel.
 */
sre.CollapseFrenchTest.prototype.testCollapsedVarMultirel = function() {
  var mml = '<mi>a</mi><mo>=</mo><mo>&#x2026;</mo><mo>&#x2264;</mo><mi>b</mi>';
  this.executeRuleTest(
      mml, 'séquence de relation avec un nombre de éléments variable compressée', 'default');
  this.executeRuleTest(mml, 'séquence de relation compressée', 'brief');
  this.executeRuleTest(mml, 'séquence de relation compressée', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-var-punctuated.
 */
sre.CollapseFrenchTest.prototype.testCollapsedVarPunctuated = function() {
  var mml = '<mi>a</mi><mo>,</mo><mo>&#x2026;</mo><mo>,</mo><mi>b</mi>';
  this.executeRuleTest(
      mml, 'liste de longueur variable séparée par des virgules compressée', 'default');
  this.executeRuleTest(mml, 'liste séparée par des virgules compressée', 'brief');
  this.executeRuleTest(mml, 'liste séparée par des virgules compressée', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-var-relation.
 */
sre.CollapseFrenchTest.prototype.testCollapsedVarRelation = function() {
  var mml = '<mi>a</mi><mo>=</mo><mo>&#x2026;</mo><mo>=</mo><mi>b</mi>';
  this.executeRuleTest(
      mml, 'égalité séquence avec un nombre de éléments variable compressée', 'default');
  this.executeRuleTest(mml, 'égalité séquence compressée', 'brief');
  this.executeRuleTest(mml, 'égalité séquence compressée', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-var-vector.
 */
sre.CollapseFrenchTest.prototype.testCollapsedVarVector = function() {
  var mml = '<mfenced open="[" close="]"><mtable>' +
      '<mtr><mtd><mi>a</mi></mtd></mtr>' +
      '<mtr><mtd><mo>&#x22EE;</mo></mtd></mtr>' +
      '<mtr><mtd><mi>c</mi></mtd></mtr>' +
      '<mtr><mtd><mi>d</mi></mtd></mtr>' +
      '</mtable></mfenced>';
  this.executeRuleTest(mml, 'vecteur colonne de dimension n compressé', 'default');
  this.executeRuleTest(mml, 'vecteur compressé', 'brief');
  this.executeRuleTest(mml, 'vecteur compressé', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-vector.
 */
sre.CollapseFrenchTest.prototype.testCollapsedVector = function() {
  var mml = '<mfenced open="[" close="]"><mtable>' +
      '<mtr><mtd><mi>a</mi></mtd></mtr>' +
      '<mtr><mtd><mi>c</mi></mtd></mtr>' +
      '<mtr><mtd><mi>e</mi></mtd></mtr>' +
      '</mtable></mfenced>';
  this.executeRuleTest(mml, 'vecteur de dimension 3 compressé', 'default');
  this.executeRuleTest(mml, 'vecteur compressé', 'brief');
  this.executeRuleTest(mml, 'vecteur compressé', 'sbrief');
};

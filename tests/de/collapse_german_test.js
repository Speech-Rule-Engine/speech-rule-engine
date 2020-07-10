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
 * @fileoverview Testcases for collapse speech generation.
 *
 * @author v.sorge@mathjax.org (Volker Sorge)
 */

goog.provide('sre.CollapseGermanTest');

goog.require('sre.CollapseRuleTest');



/**
 * @constructor
 * @extends {sre.CollapseRuleTest}
 */
sre.CollapseGermanTest = function() {
  sre.CollapseGermanTest.base(this, 'constructor');

  /**
   * @override
   */
  this.information = 'Collapse German tests.';

  this.domain = 'mathspeak';
  this.locale = 'de';
  this.setActive('CollapseGerman');
};
goog.inherits(sre.CollapseGermanTest, sre.CollapseRuleTest);


/**
 * Testing Collapse Rule for abstr-addition.
 */
sre.CollapseGermanTest.prototype.testCollapsedAddition = function() {
  var mml = '<mi>a</mi><mo>+</mo><mi>b</mi>';
  this.executeRuleTest(mml, 'Summe mit 2 Summanden kollabiert', 'default');
  this.executeRuleTest(mml, 'Summe kollabiert', 'brief');
  this.executeRuleTest(mml, 'Summe kollabiert', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-bigop.
 */
sre.CollapseGermanTest.prototype.testCollapsedBigop = function() {
  var mml = '<mo>&#x2211;</mo><mi>x</mi>';
  this.executeRuleTest(mml, 'Summe kollabiert', 'default');
  this.executeRuleTest(mml, 'Summe kollabiert', 'brief');
  this.executeRuleTest(mml, 'Summe kollabiert', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-binomial.
 */
sre.CollapseGermanTest.prototype.testCollapsedBinomial = function() {
  var mml = '<mfenced open="(" close=")"><mtable><mtr><mtd><mi>x</mi></mtd>' +
      '</mtr><mtr><mtd><mi>y</mi></mtd></mtr></mtable></mfenced>';
  this.executeRuleTest(mml, 'Binomialkoeffizient kollabiert', 'default');
  this.executeRuleTest(mml, 'Binomialkoeffizient kollabiert', 'brief');
  this.executeRuleTest(mml, 'Binomialkoeffizient kollabiert', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-cases.
 */
sre.CollapseGermanTest.prototype.testCollapsedCases = function() {
  var mml = '<mfenced separators="" open="{" close=""><mtable>' +
      '<mtr><mtd><mi>y</mi></mtd><mtd><mn>0</mn></mtd></mtr>' +
      '<mtr><mtd><mi>y</mi></mtd><mtd><mn>2</mn></mtd></mtr>' +
      '</mtable></mfenced>';
  this.executeRuleTest(mml, 'Fallunterscheidung mit 2 Fällen kollabiert', 'default');
  this.executeRuleTest(mml, 'Fallunterscheidung kollabiert', 'brief');
  this.executeRuleTest(mml, 'Fallunterscheidung kollabiert', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-continued-fraction.
 */
sre.CollapseGermanTest.prototype.testCollapsedContinuedFraction = function() {
  var mml = '<mfrac><msub>' +
      '<mi>b</mi><mn>1</mn></msub><mrow><msub><mi>a</mi><mn>1</mn></msub>' +
      '<mo>+</mo><mfrac><msub><mi>b</mi><mn>2</mn></msub><mrow><msub>' +
      '<mi>a</mi><mn>2</mn></msub><mo>+</mo><mfrac><msub><mi>b</mi>' +
      '<mn>3</mn></msub><mrow><msub><mi>a</mi><mn>3</mn></msub><mo>+</mo>' +
      '<mo>&#x2026;</mo></mrow></mfrac></mrow></mfrac></mrow></mfrac>';
  this.executeRuleTest(mml, 'Kettenbruch kollabiert', 'default');
  this.executeRuleTest(mml, 'Kettenbruch kollabiert', 'brief');
  this.executeRuleTest(mml, 'Kettenbruch kollabiert', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-determinant.
 */
sre.CollapseGermanTest.prototype.testCollapsedDeterminant = function() {
  var mml = '<mfenced open="|" close="|"><mtable>' +
      '<mtr><mtd><mi>a</mi></mtd><mtd><mi>b</mi></mtd></mtr>' +
      '<mtr><mtd><mi>c</mi></mtd><mtd><mi>d</mi></mtd></mtr>' +
      '</mtable></mfenced>';
  this.executeRuleTest(mml, '2 dimensionale Determinante kollabiert', 'default');
  this.executeRuleTest(mml, 'Determinante kollabiert', 'brief');
  this.executeRuleTest(mml, 'Determinante kollabiert', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-fraction.
 */
sre.CollapseGermanTest.prototype.testCollapsedFraction = function() {
  var mml = '<mfrac><mn>1</mn><mi>x</mi></mfrac>';
  this.executeRuleTest(mml, 'Bruch kollabiert', 'default');
  this.executeRuleTest(mml, 'Bruch kollabiert', 'brief');
  this.executeRuleTest(mml, 'Bruch kollabiert', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-function.
 */
sre.CollapseGermanTest.prototype.testCollapsedFunction = function() {
  // var mml = '<mi>sin</mi><mi>x</mi>';
  var mml = '<mi>sin</mi>';
  this.executeRuleTest(mml, 'Funktionsausdruck kollabiert', 'default');
  this.executeRuleTest(mml, 'Funktion kollabiert', 'brief');
  this.executeRuleTest(mml, 'Funktion kollabiert', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-identifier.
 */
sre.CollapseGermanTest.prototype.testCollapsedIdentifier = function() {
  var mml = '<mi>a</mi>';
  this.executeRuleTest(mml, 'langer Bezeichner kollabiert', 'default');
  this.executeRuleTest(mml, 'langer Bezeichner kollabiert', 'brief');
  this.executeRuleTest(mml, 'langer Bezeichner kollabiert', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-infixop.
 */
sre.CollapseGermanTest.prototype.testCollapsedInfixop = function() {
  var mml = '<mi>a</mi><mo>/</mo><mi>b</mi>';
  this.executeRuleTest(mml, 'Division mit 2 Elementen kollabiert', 'default');
  this.executeRuleTest(mml, 'Division kollabiert', 'brief');
  this.executeRuleTest(mml, 'Division kollabiert', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-integral.
 */
sre.CollapseGermanTest.prototype.testCollapsedIntegral = function() {
  var mml = '<mo>∮</mo><mi>E</mi><mo>·</mo><mi>d</mi>' +
      '<mi mathvariant="bold">l</mi>';
  this.executeRuleTest(mml, 'Integral kollabiert', 'default');
  this.executeRuleTest(mml, 'Integral kollabiert', 'brief');
  this.executeRuleTest(mml, 'Integral kollabiert', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-lim.
 */
sre.CollapseGermanTest.prototype.testCollapsedLim = function() {
  var mml = '<mi>lim</mi>';
  this.executeRuleTest(mml, 'Grenzwertfunktion kollabiert', 'default');
  this.executeRuleTest(mml, 'Grenzwert kollabiert', 'brief');
  this.executeRuleTest(mml, 'Grenzwert kollabiert', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-matrix.
 */
sre.CollapseGermanTest.prototype.testCollapsedMatrix = function() {
  var mml = '<mfenced open="[" close="]"><mtable>' +
      '<mtr><mtd><mi>a</mi></mtd><mtd><mi>b</mi></mtd></mtr>' +
      '<mtr><mtd><mi>c</mi></mtd><mtd><mi>d</mi></mtd></mtr>' +
      '<mtr><mtd><mi>e</mi></mtd><mtd><mi>f</mi></mtd></mtr>' +
      '</mtable></mfenced>';
  this.executeRuleTest(mml, '3 mal 2 Matrize kollabiert', 'default');
  this.executeRuleTest(mml, 'Matrize kollabiert', 'brief');
  this.executeRuleTest(mml, 'Matrize kollabiert', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-mixed-number.
 */
sre.CollapseGermanTest.prototype.testCollapsedMixedNumber = function() {
  var mml = '<mn>1</mn><mfrac><mn>2</mn><mn>3</mn></mfrac>';
  this.executeRuleTest(mml, 'langer gemischter Bruch kollabiert', 'default');
  this.executeRuleTest(mml, 'langer gemischter Bruch kollabiert', 'brief');
  this.executeRuleTest(mml, 'langer gemischter Bruch kollabiert', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-multiplication.
 */
sre.CollapseGermanTest.prototype.testCollapsedMultiplication = function() {
  var mml = '<mi>a</mi><mo>*</mo><mi>b</mi>';
  this.executeRuleTest(mml, 'Produkt mit 2 Faktoren kollabiert', 'default');
  this.executeRuleTest(mml, 'Produkt kollabiert', 'brief');
  this.executeRuleTest(mml, 'Produkt kollabiert', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-multirel.
 */
sre.CollapseGermanTest.prototype.testCollapsedMultirel = function() {
  var mml = '<mi>a</mi><mo>=</mo><mi>b</mi><mo>&#x2264;</mo><mi>b</mi>';
  this.executeRuleTest(mml, 'Relationsequenz mit 3 Elementen kollabiert', 'default');
  this.executeRuleTest(mml, 'Relationsequenz kollabiert', 'brief');
  this.executeRuleTest(mml, 'Relationsequenz kollabiert', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-number.
 */
sre.CollapseGermanTest.prototype.testCollapsedNumber = function() {
  var mml = '<mn>123456</mn>';
  this.executeRuleTest(mml, 'lange Zahl kollabiert', 'default');
  this.executeRuleTest(mml, 'lange Zahl kollabiert', 'brief');
  this.executeRuleTest(mml, 'lange Zahl kollabiert', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-punctuated.
 */
sre.CollapseGermanTest.prototype.testCollapsedPunctuated = function() {
  var mml = '<mi>a</mi><mo>,</mo><mi>b</mi><mo>,</mo><mi>c</mi>';
  this.executeRuleTest(mml, 'mit Komma getrennte Liste der Länge 3 kollabiert', 'default');
  this.executeRuleTest(mml, 'mit Komma getrennte Liste kollabiert', 'brief');
  this.executeRuleTest(mml, 'mit Komma getrennte Liste kollabiert', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-relation.
 */
sre.CollapseGermanTest.prototype.testCollapsedRelation = function() {
  var mml = '<mi>a</mi><mo>=</mo><mi>b</mi>';
  this.executeRuleTest(mml, 'Gleichung kollabiert', 'default');
  this.executeRuleTest(mml, 'Gleichung kollabiert', 'brief');
  this.executeRuleTest(mml, 'Gleichung kollabiert', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-relation-seq.
 */
sre.CollapseGermanTest.prototype.testCollapsedRelationSeq = function() {
  var mml = '<mi>a</mi><mo>=</mo><mi>b</mi><mo>=</mo><mi>b</mi>';
  this.executeRuleTest(mml, 'Gleichungssequenz mit 3 Elementen kollabiert', 'default');
  this.executeRuleTest(mml, 'Gleichungssequenz kollabiert', 'brief');
  this.executeRuleTest(mml, 'Gleichungssequenz kollabiert', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-root.
 */
sre.CollapseGermanTest.prototype.testCollapsedRoot = function() {
  var mml = '<mroot><mi>x</mi><mn>3</mn></mroot>';
  this.executeRuleTest(mml, 'Wurzel mit Exponent 3 kollabiert', 'default');
  this.executeRuleTest(mml, 'Wurzel kollabiert', 'brief');
  this.executeRuleTest(mml, 'Wurzel kollabiert', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-root-nested.
 */
sre.CollapseGermanTest.prototype.testCollapsedRootNested = function() {
  var mml = '<mroot><mrow><mroot><mi>x</mi><mn>4</mn></mroot>' +
      '<mo>+</mo><mi>x</mi></mrow><mn>3</mn></mroot>';
  this.executeRuleTest(mml, 'verschachtelte Wurzel mit Exponent 3 kollabiert', 'default');
  this.executeRuleTest(mml, 'verschachtelte Wurzel kollabiert', 'brief');
  this.executeRuleTest(mml, 'verschachtelte Wurzel kollabiert', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-rowvector.
 */
sre.CollapseGermanTest.prototype.testCollapsedRowvector = function() {
  var mml = '<mfenced open="[" close="]"><mtable>' +
      '<mtr><mtd><mi>a</mi></mtd><mtd><mi>b</mi></mtd></mtr>' +
      '</mtable></mfenced>';
  this.executeRuleTest(mml, '2 dimensionaler Zeilenvektor kollabiert', 'default');
  this.executeRuleTest(mml, 'Zeilenvektor kollabiert', 'brief');
  this.executeRuleTest(mml, 'Zeilenvektor kollabiert', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-sqrt.
 */
sre.CollapseGermanTest.prototype.testCollapsedSqrt = function() {
  var mml = '<msqrt><mn>2</mn></msqrt>';
  this.executeRuleTest(mml, 'Quadratwurzel kollabiert', 'default');
  this.executeRuleTest(mml, 'Quadratwurzel kollabiert', 'brief');
  this.executeRuleTest(mml, 'Quadratwurzel kollabiert', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-sqrt-nested.
 */
sre.CollapseGermanTest.prototype.testCollapsedSqrtNested = function() {
  var mml = '<msqrt><mn>2</mn><msqrt><mn>2</mn></msqrt></msqrt>';
  this.executeRuleTest(mml, 'verschachtelte Quadratwurzel kollabiert', 'default');
  this.executeRuleTest(mml, 'verschachtelte Quadratwurzel kollabiert', 'brief');
  this.executeRuleTest(mml, 'verschachtelte Quadratwurzel kollabiert', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-squarematrix.
 */
sre.CollapseGermanTest.prototype.testCollapsedSquarematrix = function() {
  var mml = '<mfenced open="[" close="]"><mtable>' +
      '<mtr><mtd><mi>a</mi></mtd><mtd><mi>b</mi></mtd></mtr>' +
      '<mtr><mtd><mi>c</mi></mtd><mtd><mi>d</mi></mtd></mtr>' +
      '</mtable></mfenced>';
  this.executeRuleTest(mml, '2 dimensionale quadratische Matrize kollabiert', 'default');
  this.executeRuleTest(mml, 'quadratische Matrize kollabiert', 'brief');
  this.executeRuleTest(mml, 'quadratische Matrize kollabiert', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-subscript.
 */
sre.CollapseGermanTest.prototype.testCollapsedSubscript = function() {
  var mml = '<msub><mi>a</mi><mi>b</mi></msub>';
  this.executeRuleTest(mml, 'Index kollabiert', 'default');
  this.executeRuleTest(mml, 'Index kollabiert', 'brief');
  this.executeRuleTest(mml, 'Index kollabiert', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-subsup.
 */
sre.CollapseGermanTest.prototype.testCollapsedSubsup = function() {
  var mml = '<msubsup><mi>a</mi><mi>c</mi><mi>b</mi></msubsup>';
  this.executeRuleTest(mml, 'Potenz mit Index kollabiert', 'default');
  this.executeRuleTest(mml, 'Potenz mit Index kollabiert', 'brief');
  this.executeRuleTest(mml, 'Potenz mit Index kollabiert', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-superscript.
 */
sre.CollapseGermanTest.prototype.testCollapsedSuperscript = function() {
  var mml = '<msup><mi>a</mi><mi>b</mi></msup>';
  this.executeRuleTest(mml, 'Potenz kollabiert', 'default');
  this.executeRuleTest(mml, 'Potenz kollabiert', 'brief');
  this.executeRuleTest(mml, 'Potenz kollabiert', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-table.
 */
sre.CollapseGermanTest.prototype.testCollapsedTable = function() {
  var mml = '<mtable><mtr><mtd><mi>a</mi></mtd><mtd><mi>b</mi></mtd></mtr>' +
      '<mtr><mtd><mi>c</mi></mtd><mtd><mi>d</mi></mtd></mtr></mtable>';
  this.executeRuleTest(mml, 'Tabelle mit 2 Zeilen und 2 Spalten kollabiert', 'default');
  this.executeRuleTest(mml, 'Tabelle mit 2 Zeilen und 2 Spalten kollabiert', 'brief');
  this.executeRuleTest(mml, 'Tabelle mit 2 Zeilen und 2 Spalten kollabiert', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-text.
 */
sre.CollapseGermanTest.prototype.testCollapsedText = function() {
  var mml = '<mtext>a b c</mtext>';
  this.executeRuleTest(mml, 'Text kollabiert', 'default');
  this.executeRuleTest(mml, 'Text kollabiert', 'brief');
  this.executeRuleTest(mml, 'Text kollabiert', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-var-addition.
 */
sre.CollapseGermanTest.prototype.testCollapsedVarAddition = function() {
  var mml = '<mi>a</mi><mo>+</mo><mi>&#x2026;</mi><mo>+</mo><mi>b</mi>';
  this.executeRuleTest(mml, 'Summe mit veränderlicher Anzahl an Summanden kollabiert', 'default');
  this.executeRuleTest(mml, 'Summe kollabiert', 'brief');
  this.executeRuleTest(mml, 'Summe kollabiert', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-var-cases.
 */
sre.CollapseGermanTest.prototype.testCollapsedVarCases = function() {
  var mml = '<mo>{</mo><mtable><mtr><mtd><mi>a</mi></mtd></mtr><mtr><mtd>' +
      '<mo>&#x2026;</mo></mtd></mtr><mtr><mtd><mi>b</mi></mtd></mtr></mtable>';
  this.executeRuleTest(
      mml, 'Fallunterscheidung mit veränderlicher Anzahl an Fällen kollabiert', 'default');
  this.executeRuleTest(mml, 'Fallunterscheidung kollabiert', 'brief');
  this.executeRuleTest(mml, 'Fallunterscheidung kollabiert', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-var-determinant.
 */
sre.CollapseGermanTest.prototype.testCollapsedVarDeterminant = function() {
  var mml = '<mo>|</mo><mtable><mtr><mtd><mi>a</mi></mtd><mtd><mi>b</mi>' +
      '</mtd><mtd><mi>e</mi></mtd></mtr><mtr><mtd />' +
      '<mtd><mo>&#x22EF;</mo></mtd><mtd /></mtr><mtr><mtd><mi>c</mi></mtd>' +
      '<mtd><mi>d</mi></mtd><mtd><mi>f</mi></mtd></mtr></mtable><mo>|</mo>';
  this.executeRuleTest(mml, 'n dimensionale Determinante kollabiert', 'default');
  this.executeRuleTest(mml, 'Determinante kollabiert', 'brief');
  this.executeRuleTest(mml, 'Determinante kollabiert', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-var-matrix.
 */
sre.CollapseGermanTest.prototype.testCollapsedVarMatrix = function() {
  var mml = '<mo>(</mo><mtable><mtr><mtd><mi>a</mi></mtd><mtd><mi>b</mi>' +
      '</mtd><mtd><mi>e</mi></mtd></mtr><mtr><mtd />' +
      '<mtd><mo>&#x22EF;</mo></mtd><mtd /></mtr><mtr><mtd><mi>c</mi></mtd>' +
      '<mtd><mi>d</mi></mtd><mtd><mi>f</mi></mtd></mtr></mtable><mo>)</mo>';
  this.executeRuleTest(mml, 'n mal m dimensionale Matrize kollabiert', 'default');
  this.executeRuleTest(mml, 'quadratische Matrize kollabiert', 'brief');
  this.executeRuleTest(mml, 'quadratische Matrize kollabiert', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-var-multiplication.
 */
sre.CollapseGermanTest.prototype.testCollapsedVarMultiplication = function() {
  var mml = '<mi>a</mi><mo>*</mo><mo>&#x2026;</mo><mo>*</mo><mi>b</mi>';
  this.executeRuleTest(
      mml, 'Produkt mit veränderlicher Anzahl an Faktoren kollabiert', 'default');
  this.executeRuleTest(mml, 'Produkt kollabiert', 'brief');
  this.executeRuleTest(mml, 'Produkt kollabiert', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-var-multirel.
 */
sre.CollapseGermanTest.prototype.testCollapsedVarMultirel = function() {
  var mml = '<mi>a</mi><mo>=</mo><mo>&#x2026;</mo><mo>&#x2264;</mo><mi>b</mi>';
  this.executeRuleTest(
      mml, 'Relationsequenz mit veränderlicher Anzahl an Elementen kollabiert', 'default');
  this.executeRuleTest(mml, 'Relationsequenz kollabiert', 'brief');
  this.executeRuleTest(mml, 'Relationsequenz kollabiert', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-var-punctuated.
 */
sre.CollapseGermanTest.prototype.testCollapsedVarPunctuated = function() {
  var mml = '<mi>a</mi><mo>,</mo><mo>&#x2026;</mo><mo>,</mo><mi>b</mi>';
  this.executeRuleTest(
      mml, 'mit Komma getrennte Liste veränderlicher Länge kollabiert', 'default');
  this.executeRuleTest(mml, 'mit Komma getrennte Liste kollabiert', 'brief');
  this.executeRuleTest(mml, 'mit Komma getrennte Liste kollabiert', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-var-relation.
 */
sre.CollapseGermanTest.prototype.testCollapsedVarRelation = function() {
  var mml = '<mi>a</mi><mo>=</mo><mo>&#x2026;</mo><mo>=</mo><mi>b</mi>';
  this.executeRuleTest(
      mml, 'Gleichungssequenz mit veränderlicher Anzahl an Elementen kollabiert', 'default');
  this.executeRuleTest(mml, 'Gleichungssequenz kollabiert', 'brief');
  this.executeRuleTest(mml, 'Gleichungssequenz kollabiert', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-var-vector.
 */
sre.CollapseGermanTest.prototype.testCollapsedVarVector = function() {
  var mml = '<mfenced open="[" close="]"><mtable>' +
      '<mtr><mtd><mi>a</mi></mtd></mtr>' +
      '<mtr><mtd><mo>&#x22EE;</mo></mtd></mtr>' +
      '<mtr><mtd><mi>c</mi></mtd></mtr>' +
      '<mtr><mtd><mi>d</mi></mtd></mtr>' +
      '</mtable></mfenced>';
  this.executeRuleTest(mml, 'n dimensionaler Vektor kollabiert', 'default');
  this.executeRuleTest(mml, 'Vektor kollabiert', 'brief');
  this.executeRuleTest(mml, 'Vektor kollabiert', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-vector.
 */
sre.CollapseGermanTest.prototype.testCollapsedVector = function() {
  var mml = '<mfenced open="[" close="]"><mtable>' +
      '<mtr><mtd><mi>a</mi></mtd></mtr>' +
      '<mtr><mtd><mi>c</mi></mtd></mtr>' +
      '<mtr><mtd><mi>e</mi></mtd></mtr>' +
      '</mtable></mfenced>';
  this.executeRuleTest(mml, '3 dimensionaler Vektor kollabiert', 'default');
  this.executeRuleTest(mml, 'Vektor kollabiert', 'brief');
  this.executeRuleTest(mml, 'Vektor kollabiert', 'sbrief');
};

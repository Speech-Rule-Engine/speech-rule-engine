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
  this.executeRuleTest(mml, 'Summe mit 2 Summanden', 'default');
  this.executeRuleTest(mml, 'Summe', 'brief');
  this.executeRuleTest(mml, 'Summe', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-bigop.
 */
sre.SummaryGermanTest.prototype.testAbstrBigop = function() {
  var mml = '<mo>&#x2211;</mo><mi>x</mi>';
  this.executeRuleTest(mml, 'Summe', 'default');
  this.executeRuleTest(mml, 'Summe', 'brief');
  this.executeRuleTest(mml, 'Summe', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-binomial.
 */
sre.SummaryGermanTest.prototype.testAbstrBinomial = function() {
  var mml = '<mfenced open="(" close=")"><mtable><mtr><mtd><mi>x</mi></mtd>' +
      '</mtr><mtr><mtd><mi>y</mi></mtd></mtr></mtable></mfenced>';
  this.executeRuleTest(mml, 'Binomialkoeffizient', 'default');
  this.executeRuleTest(mml, 'Binomialkoeffizient', 'brief');
  this.executeRuleTest(mml, 'Binomialkoeffizient', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-cases.
 */
sre.SummaryGermanTest.prototype.testAbstrCases = function() {
  var mml = '<mfenced separators="" open="{" close=""><mtable>' +
      '<mtr><mtd><mi>y</mi></mtd><mtd><mn>0</mn></mtd></mtr>' +
      '<mtr><mtd><mi>y</mi></mtd><mtd><mn>2</mn></mtd></mtr>' +
      '</mtable></mfenced>';
  this.executeRuleTest(mml, 'Fallunterscheidung mit 2 Fällen', 'default');
  this.executeRuleTest(mml, 'Fallunterscheidung', 'brief');
  this.executeRuleTest(mml, 'Fallunterscheidung', 'sbrief');
};


// TODO
/**
 * Testing Summary Rule for abstr-cell.
 */
sre.SummaryGermanTest.prototype.testAbstrCell = function() {
  var mml = '<mtable><mtr><mtd><mi>a</mi></mtd>' +
      '<mtd><mi>b</mi></mtd></mtr></mtable>';
  this.steps = ['DOWN', 'DOWN'];
  this.executeRuleTest(mml, '1. Spalte in Tabelle', 'default');
  this.executeRuleTest(mml, '1. Spalte in Tabelle', 'brief');
  this.executeRuleTest(mml, '1. Spalte in Tabelle', 'sbrief');
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
  this.executeRuleTest(mml, 'Kettenbruch', 'default');
  this.executeRuleTest(mml, 'Kettenbruch', 'brief');
  this.executeRuleTest(mml, 'Kettenbruch', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-determinant.
 */
sre.SummaryGermanTest.prototype.testAbstrDeterminant = function() {
  var mml = '<mfenced open="|" close="|"><mtable>' +
      '<mtr><mtd><mi>a</mi></mtd><mtd><mi>b</mi></mtd></mtr>' +
      '<mtr><mtd><mi>c</mi></mtd><mtd><mi>d</mi></mtd></mtr>' +
      '</mtable></mfenced>';
  this.executeRuleTest(mml, '2 dimensionale Determinante', 'default');
  this.executeRuleTest(mml, 'Determinante', 'brief');
  this.executeRuleTest(mml, 'Determinante', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-fraction.
 */
sre.SummaryGermanTest.prototype.testAbstrFraction = function() {
  var mml = '<mfrac><mn>1</mn><mi>x</mi></mfrac>';
  this.executeRuleTest(mml, 'Bruch', 'default');
  this.executeRuleTest(mml, 'Bruch', 'brief');
  this.executeRuleTest(mml, 'Bruch', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-function.
 */
sre.SummaryGermanTest.prototype.testAbstrFunction = function() {
  // var mml = '<mi>sin</mi><mi>x</mi>';
  var mml = '<mi>sin</mi>';
  this.executeRuleTest(mml, 'Funktionsausdruck', 'default');
  this.executeRuleTest(mml, 'Funktion', 'brief');
  this.executeRuleTest(mml, 'Funktion', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-identifier.
 */
sre.SummaryGermanTest.prototype.testAbstrIdentifier = function() {
  var mml = '<mi>a</mi>';
  this.executeRuleTest(mml, 'Bezeichner', 'default');
  this.executeRuleTest(mml, 'Bezeichner', 'brief');
  this.executeRuleTest(mml, 'Bezeichner', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-infixop.
 */
sre.SummaryGermanTest.prototype.testAbstrInfixop = function() {
  var mml = '<mi>a</mi><mo>/</mo><mi>b</mi>';
  this.executeRuleTest(mml, 'Division mit 2 Elementen', 'default');
  this.executeRuleTest(mml, 'Division', 'brief');
  this.executeRuleTest(mml, 'Division', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-integral.
 */
sre.SummaryGermanTest.prototype.testAbstrIntegral = function() {
  var mml = '<mo>∮</mo><mi>E</mi><mo>·</mo><mi>d</mi>' +
      '<mi mathvariant="bold">l</mi>';
  this.executeRuleTest(mml, 'Integral', 'default');
  this.executeRuleTest(mml, 'Integral', 'brief');
  this.executeRuleTest(mml, 'Integral', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-lim.
 */
sre.SummaryGermanTest.prototype.testAbstrLim = function() {
  var mml = '<mi>lim</mi>';
  this.executeRuleTest(mml, 'Grenzwertfunktion', 'default');
  this.executeRuleTest(mml, 'Grenzwert', 'brief');
  this.executeRuleTest(mml, 'Grenzwert', 'sbrief');
};


// TODO
/**
 * Testing Summary Rule for abstr-line.
 */
sre.SummaryGermanTest.prototype.testAbstrLine = function() {
  var mml = '<mtable><mtr><mtd><mi>a</mi></mtd></mtr></mtable>';
  this.steps = ['DOWN'];
  this.executeRuleTest(mml, '1. Zeile in mehrzeiligem Ausdruck', 'default');
  this.executeRuleTest(mml, '1. Zeile in mehrzeiligem Ausdruck', 'brief');
  this.executeRuleTest(mml, '1. Zeile in mehrzeiligem Ausdruck', 'sbrief');
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
  this.executeRuleTest(mml, '3 mal 2 Matrize', 'default');
  this.executeRuleTest(mml, 'Matrize', 'brief');
  this.executeRuleTest(mml, 'Matrize', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-mixed-number.
 */
sre.SummaryGermanTest.prototype.testAbstrMixedNumber = function() {
  var mml = '<mn>1</mn><mfrac><mn>2</mn><mn>3</mn></mfrac>';
  this.executeRuleTest(mml, 'gemischter Bruch', 'default');
  this.executeRuleTest(mml, 'gemischter Bruch', 'brief');
  this.executeRuleTest(mml, 'gemischter Bruch', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-multiplication.
 */
sre.SummaryGermanTest.prototype.testAbstrMultiplication = function() {
  var mml = '<mi>a</mi><mo>*</mo><mi>b</mi>';
  this.executeRuleTest(mml, 'Produkt mit 2 Faktoren', 'default');
  this.executeRuleTest(mml, 'Produkt', 'brief');
  this.executeRuleTest(mml, 'Produkt', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-multirel.
 */
sre.SummaryGermanTest.prototype.testAbstrMultirel = function() {
  var mml = '<mi>a</mi><mo>=</mo><mi>b</mi><mo>&#x2264;</mo><mi>b</mi>';
  this.executeRuleTest(mml, 'Relationsequenz mit 3 Elementen', 'default');
  this.executeRuleTest(mml, 'Relationsequenz', 'brief');
  this.executeRuleTest(mml, 'Relationsequenz', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-number.
 */
sre.SummaryGermanTest.prototype.testAbstrNumber = function() {
  var mml = '<mn>123456</mn>';
  this.executeRuleTest(mml, 'Zahl', 'default');
  this.executeRuleTest(mml, 'Zahl', 'brief');
  this.executeRuleTest(mml, 'Zahl', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-punctuated.
 */
sre.SummaryGermanTest.prototype.testAbstrPunctuated = function() {
  var mml = '<mi>a</mi><mo>,</mo><mi>b</mi><mo>,</mo><mi>c</mi>';
  this.executeRuleTest(mml, 'mit Komma getrennte Liste der Länge 3', 'default');
  this.executeRuleTest(mml, 'mit Komma getrennte Liste', 'brief');
  this.executeRuleTest(mml, 'mit Komma getrennte Liste', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-relation.
 */
sre.SummaryGermanTest.prototype.testAbstrRelation = function() {
  var mml = '<mi>a</mi><mo>=</mo><mi>b</mi>';
  this.executeRuleTest(mml, 'Gleichung', 'default');
  this.executeRuleTest(mml, 'Gleichung', 'brief');
  this.executeRuleTest(mml, 'Gleichung', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-relation-seq.
 */
sre.SummaryGermanTest.prototype.testAbstrRelationSeq = function() {
  var mml = '<mi>a</mi><mo>=</mo><mi>b</mi><mo>=</mo><mi>b</mi>';
  this.executeRuleTest(mml, 'Gleichungssequenz mit 3 Elementen', 'default');
  this.executeRuleTest(mml, 'Gleichungssequenz', 'brief');
  this.executeRuleTest(mml, 'Gleichungssequenz', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-root.
 */
sre.SummaryGermanTest.prototype.testAbstrRoot = function() {
  var mml = '<mroot><mi>x</mi><mn>3</mn></mroot>';
  this.executeRuleTest(mml, 'Wurzel mit Exponent 3', 'default');
  this.executeRuleTest(mml, 'Wurzel', 'brief');
  this.executeRuleTest(mml, 'Wurzel', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-root-nested.
 */
sre.SummaryGermanTest.prototype.testAbstrRootNested = function() {
  var mml = '<mroot><mrow><mroot><mi>x</mi><mn>4</mn></mroot>' +
      '<mo>+</mo><mi>x</mi></mrow><mn>3</mn></mroot>';
  this.executeRuleTest(mml, 'verschachtelte Wurzel mit Exponent 3', 'default');
  this.executeRuleTest(mml, 'verschachtelte Wurzel', 'brief');
  this.executeRuleTest(mml, 'verschachtelte Wurzel', 'sbrief');
};


// TODO
/**
 * Testing Summary Rule for abstr-row.
 */
sre.SummaryGermanTest.prototype.testAbstrRow = function() {
  var mml = '<mtable><mtr><mtd><mi>a</mi></mtd>' +
      '<mtd><mi>b</mi></mtd></mtr></mtable>';
  this.steps = ['DOWN'];
  this.executeRuleTest(mml, '1. Zeile in Tabelle mit 2 Spalten', 'default');
  this.executeRuleTest(mml, '1. Zeile in Tabelle mit 2 Spalten', 'brief');
  this.executeRuleTest(mml, '1. Zeile in Tabelle mit 2 Spalten', 'sbrief');
  this.steps = null;
};


/**
 * Testing Summary Rule for abstr-rowvector.
 */
sre.SummaryGermanTest.prototype.testAbstrRowvector = function() {
  var mml = '<mfenced open="[" close="]"><mtable>' +
      '<mtr><mtd><mi>a</mi></mtd><mtd><mi>b</mi></mtd></mtr>' +
      '</mtable></mfenced>';
  this.executeRuleTest(mml, '2 dimensionaler Zeilenvektor', 'default');
  this.executeRuleTest(mml, 'Zeilenvektor', 'brief');
  this.executeRuleTest(mml, 'Zeilenvektor', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-sqrt.
 */
sre.SummaryGermanTest.prototype.testAbstrSqrt = function() {
  var mml = '<msqrt><mn>2</mn></msqrt>';
  this.executeRuleTest(mml, 'Quadratwurzel', 'default');
  this.executeRuleTest(mml, 'Quadratwurzel', 'brief');
  this.executeRuleTest(mml, 'Quadratwurzel', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-sqrt-nested.
 */
sre.SummaryGermanTest.prototype.testAbstrSqrtNested = function() {
  var mml = '<msqrt><mn>2</mn><msqrt><mn>2</mn></msqrt></msqrt>';
  this.executeRuleTest(mml, 'verschachtelte Quadratwurzel', 'default');
  this.executeRuleTest(mml, 'verschachtelte Quadratwurzel', 'brief');
  this.executeRuleTest(mml, 'verschachtelte Quadratwurzel', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-squarematrix.
 */
sre.SummaryGermanTest.prototype.testAbstrSquarematrix = function() {
  var mml = '<mfenced open="[" close="]"><mtable>' +
      '<mtr><mtd><mi>a</mi></mtd><mtd><mi>b</mi></mtd></mtr>' +
      '<mtr><mtd><mi>c</mi></mtd><mtd><mi>d</mi></mtd></mtr>' +
      '</mtable></mfenced>';
  this.executeRuleTest(mml, '2 dimensionale quadratische Matrize', 'default');
  this.executeRuleTest(mml, 'quadratische Matrize', 'brief');
  this.executeRuleTest(mml, 'quadratische Matrize', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-subscript.
 */
sre.SummaryGermanTest.prototype.testAbstrSubscript = function() {
  var mml = '<msub><mi>a</mi><mi>b</mi></msub>';
  this.executeRuleTest(mml, 'Index', 'default');
  this.executeRuleTest(mml, 'Index', 'brief');
  this.executeRuleTest(mml, 'Index', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-subsup.
 */
sre.SummaryGermanTest.prototype.testAbstrSubsup = function() {
  var mml = '<msubsup><mi>a</mi><mi>c</mi><mi>b</mi></msubsup>';
  this.executeRuleTest(mml, 'Potenz mit Index', 'default');
  this.executeRuleTest(mml, 'Potenz mit Index', 'brief');
  this.executeRuleTest(mml, 'Potenz mit Index', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-superscript.
 */
sre.SummaryGermanTest.prototype.testAbstrSuperscript = function() {
  var mml = '<msup><mi>a</mi><mi>b</mi></msup>';
  this.executeRuleTest(mml, 'Potenz', 'default');
  this.executeRuleTest(mml, 'Potenz', 'brief');
  this.executeRuleTest(mml, 'Potenz', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-table.
 */
sre.SummaryGermanTest.prototype.testAbstrTable = function() {
  var mml = '<mtable><mtr><mtd><mi>a</mi></mtd><mtd><mi>b</mi></mtd></mtr>' +
      '<mtr><mtd><mi>c</mi></mtd><mtd><mi>d</mi></mtd></mtr></mtable>';
  this.executeRuleTest(mml, 'Tabelle mit 2 Zeilen und 2 Spalten', 'default');
  this.executeRuleTest(mml, 'Tabelle mit 2 Zeilen und 2 Spalten', 'brief');
  this.executeRuleTest(mml, 'Tabelle mit 2 Zeilen und 2 Spalten', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-text.
 */
sre.SummaryGermanTest.prototype.testAbstrText = function() {
  var mml = '<mtext>a b c</mtext>';
  this.executeRuleTest(mml, 'Text', 'default');
  this.executeRuleTest(mml, 'Text', 'brief');
  this.executeRuleTest(mml, 'Text', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-var-addition.
 */
sre.SummaryGermanTest.prototype.testAbstrVarAddition = function() {
  var mml = '<mi>a</mi><mo>+</mo><mi>&#x2026;</mi><mo>+</mo><mi>b</mi>';
  this.executeRuleTest(mml, 'Summe mit veränderlicher Anzahl an Summanden', 'default');
  this.executeRuleTest(mml, 'Summe', 'brief');
  this.executeRuleTest(mml, 'Summe', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-var-cases.
 */
sre.SummaryGermanTest.prototype.testAbstrVarCases = function() {
  var mml = '<mo>{</mo><mtable><mtr><mtd><mi>a</mi></mtd></mtr><mtr><mtd>' +
      '<mo>&#x2026;</mo></mtd></mtr><mtr><mtd><mi>b</mi></mtd></mtr></mtable>';
  this.executeRuleTest(
      mml, 'Fallunterscheidung mit veränderlicher Anzahl an Fällen', 'default');
  this.executeRuleTest(mml, 'Fallunterscheidung', 'brief');
  this.executeRuleTest(mml, 'Fallunterscheidung', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-var-determinant.
 */
sre.SummaryGermanTest.prototype.testAbstrVarDeterminant = function() {
  var mml = '<mo>|</mo><mtable><mtr><mtd><mi>a</mi></mtd><mtd><mi>b</mi>' +
      '</mtd><mtd><mi>e</mi></mtd></mtr><mtr><mtd />' +
      '<mtd><mo>&#x22EF;</mo></mtd><mtd /></mtr><mtr><mtd><mi>c</mi></mtd>' +
      '<mtd><mi>d</mi></mtd><mtd><mi>f</mi></mtd></mtr></mtable><mo>|</mo>';
  this.executeRuleTest(mml, 'n dimensionale Determinante', 'default');
  this.executeRuleTest(mml, 'Determinante', 'brief');
  this.executeRuleTest(mml, 'Determinante', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-var-matrix.
 */
sre.SummaryGermanTest.prototype.testAbstrVarMatrix = function() {
  var mml = '<mo>(</mo><mtable><mtr><mtd><mi>a</mi></mtd><mtd><mi>b</mi>' +
      '</mtd><mtd><mi>e</mi></mtd></mtr><mtr><mtd />' +
      '<mtd><mo>&#x22EF;</mo></mtd><mtd /></mtr><mtr><mtd><mi>c</mi></mtd>' +
      '<mtd><mi>d</mi></mtd><mtd><mi>f</mi></mtd></mtr></mtable><mo>)</mo>';
  this.executeRuleTest(mml, 'n mal m dimensionale Matrize', 'default');
  this.executeRuleTest(mml, 'quadratische Matrize', 'brief');
  this.executeRuleTest(mml, 'quadratische Matrize', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-var-multiplication.
 */
sre.SummaryGermanTest.prototype.testAbstrVarMultiplication = function() {
  var mml = '<mi>a</mi><mo>*</mo><mo>&#x2026;</mo><mo>*</mo><mi>b</mi>';
  this.executeRuleTest(
      mml, 'Produkt mit veränderlicher Anzahl an Faktoren', 'default');
  this.executeRuleTest(mml, 'Produkt', 'brief');
  this.executeRuleTest(mml, 'Produkt', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-var-multirel.
 */
sre.SummaryGermanTest.prototype.testAbstrVarMultirel = function() {
  var mml = '<mi>a</mi><mo>=</mo><mo>&#x2026;</mo><mo>&#x2264;</mo><mi>b</mi>';
  this.executeRuleTest(
      mml, 'Relationsequenz mit veränderlicher Anzahl an Elementen', 'default');
  this.executeRuleTest(mml, 'Relationsequenz', 'brief');
  this.executeRuleTest(mml, 'Relationsequenz', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-var-punctuated.
 */
sre.SummaryGermanTest.prototype.testAbstrVarPunctuated = function() {
  var mml = '<mi>a</mi><mo>,</mo><mo>&#x2026;</mo><mo>,</mo><mi>b</mi>';
  this.executeRuleTest(
      mml, 'mit Komma getrennte Liste veränderlicher Länge', 'default');
  this.executeRuleTest(mml, 'mit Komma getrennte Liste', 'brief');
  this.executeRuleTest(mml, 'mit Komma getrennte Liste', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-var-relation.
 */
sre.SummaryGermanTest.prototype.testAbstrVarRelation = function() {
  var mml = '<mi>a</mi><mo>=</mo><mo>&#x2026;</mo><mo>=</mo><mi>b</mi>';
  this.executeRuleTest(
      mml, 'Gleichungssequenz mit veränderlicher Anzahl an Elementen', 'default');
  this.executeRuleTest(mml, 'Gleichungssequenz', 'brief');
  this.executeRuleTest(mml, 'Gleichungssequenz', 'sbrief');
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
  this.executeRuleTest(mml, 'n dimensionaler Vektor', 'default');
  this.executeRuleTest(mml, 'Vektor', 'brief');
  this.executeRuleTest(mml, 'Vektor', 'sbrief');
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
  this.executeRuleTest(mml, '3 dimensionaler Vektor', 'default');
  this.executeRuleTest(mml, 'Vektor', 'brief');
  this.executeRuleTest(mml, 'Vektor', 'sbrief');
};

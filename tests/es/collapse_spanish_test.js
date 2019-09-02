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

goog.provide('sre.CollapseSpanishTest');

goog.require('sre.CollapseRuleTest');



/**
 * @constructor
 * @extends {sre.CollapseRuleTest}
 */
sre.CollapseSpanishTest = function() {
  sre.CollapseSpanishTest.base(this, 'constructor');

  /**
   * @override
   */
  this.information = 'Collapse Spanish tests.';

  this.locale = 'es';
  this.setActive('CollapseSpanish');
};
goog.inherits(sre.CollapseSpanishTest, sre.CollapseRuleTest);


/**
 * Testing Collapse Rule for abstr-addition.
 */
sre.CollapseSpanishTest.prototype.testCollapsedAddition = function() {
  var mml = '<mi>a</mi><mo>+</mo><mi>b</mi>';
  this.executeRuleTest(mml, 'suma con 2 sumandos plegado', 'default');
  this.executeRuleTest(mml, 'suma plegado', 'brief');
  this.executeRuleTest(mml, 'suma plegado', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-bigop.
 */
sre.CollapseSpanishTest.prototype.testCollapsedBigop = function() {
  var mml = '<mo>&#x2211;</mo><mi>x</mi>';
  this.executeRuleTest(mml, 'sumatorio plegado', 'default');
  this.executeRuleTest(mml, 'sumatorio plegado', 'brief');
  this.executeRuleTest(mml, 'sumatorio plegado', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-binomial.
 */
sre.CollapseSpanishTest.prototype.testCollapsedBinomial = function() {
  var mml = '<mfenced open="(" close=")"><mtable><mtr><mtd><mi>x</mi></mtd>' +
      '</mtr><mtr><mtd><mi>y</mi></mtd></mtr></mtable></mfenced>';
  this.executeRuleTest(mml, 'binomio plegado', 'default');
  this.executeRuleTest(mml, 'binomio plegado', 'brief');
  this.executeRuleTest(mml, 'binomio plegado', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-cases.
 */
sre.CollapseSpanishTest.prototype.testCollapsedCases = function() {
  var mml = '<mfenced separators="" open="{" close=""><mtable>' +
      '<mtr><mtd><mi>y</mi></mtd><mtd><mn>0</mn></mtd></mtr>' +
      '<mtr><mtd><mi>y</mi></mtd><mtd><mn>2</mn></mtd></mtr>' +
      '</mtable></mfenced>';
  this.executeRuleTest(mml, 'declaración de caso con 2 casos plegado', 'default');
  this.executeRuleTest(mml, 'declaración de caso plegado', 'brief');
  this.executeRuleTest(mml, 'declaración de caso plegado', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-continued-fraction.
 */
sre.CollapseSpanishTest.prototype.testCollapsedContinuedFraction = function() {
  var mml = '<mfrac><msub>' +
      '<mi>b</mi><mn>1</mn></msub><mrow><msub><mi>a</mi><mn>1</mn></msub>' +
      '<mo>+</mo><mfrac><msub><mi>b</mi><mn>2</mn></msub><mrow><msub>' +
      '<mi>a</mi><mn>2</mn></msub><mo>+</mo><mfrac><msub><mi>b</mi>' +
      '<mn>3</mn></msub><mrow><msub><mi>a</mi><mn>3</mn></msub><mo>+</mo>' +
      '<mo>&#x2026;</mo></mrow></mfrac></mrow></mfrac></mrow></mfrac>';
  this.executeRuleTest(mml, 'fracción continua plegado', 'default');
  this.executeRuleTest(mml, 'frac continua plegado', 'brief');
  this.executeRuleTest(mml, 'frac continua plegado', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-determinant.
 */
sre.CollapseSpanishTest.prototype.testCollapsedDeterminant = function() {
  var mml = '<mfenced open="|" close="|"><mtable>' +
      '<mtr><mtd><mi>a</mi></mtd><mtd><mi>b</mi></mtd></mtr>' +
      '<mtr><mtd><mi>c</mi></mtd><mtd><mi>d</mi></mtd></mtr>' +
      '</mtable></mfenced>';
  this.executeRuleTest(mml, 'determinante de dimensión 2 plegado', 'default');
  this.executeRuleTest(mml, 'determinante plegado', 'brief');
  this.executeRuleTest(mml, 'determinante plegado', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-fraction.
 */
sre.CollapseSpanishTest.prototype.testCollapsedFraction = function() {
  var mml = '<mfrac><mn>1</mn><mi>x</mi></mfrac>';
  this.executeRuleTest(mml, 'fracción plegado', 'default');
  this.executeRuleTest(mml, 'frac plegado', 'brief');
  this.executeRuleTest(mml, 'frac plegado', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-function.
 */
sre.CollapseSpanishTest.prototype.testCollapsedFunction = function() {
  // var mml = '<mi>sin</mi><mi>x</mi>';
  var mml = '<mi>sin</mi>';
  this.executeRuleTest(mml, 'expresión funcional plegado', 'default');
  this.executeRuleTest(mml, 'función plegado', 'brief');
  this.executeRuleTest(mml, 'función plegado', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-identifier.
 */
sre.CollapseSpanishTest.prototype.testCollapsedIdentifier = function() {
  var mml = '<mi>a</mi>';
  this.executeRuleTest(mml, 'identificador largo plegado', 'default');
  this.executeRuleTest(mml, 'identificador largo plegado', 'brief');
  this.executeRuleTest(mml, 'identificador largo plegado', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-infixop.
 */
sre.CollapseSpanishTest.prototype.testCollapsedInfixop = function() {
  var mml = '<mi>a</mi><mo>/</mo><mi>b</mi>';
  this.executeRuleTest(mml, 'división con 2 elementos plegado', 'default');
  this.executeRuleTest(mml, 'división plegado', 'brief');
  this.executeRuleTest(mml, 'división plegado', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-integral.
 */
sre.CollapseSpanishTest.prototype.testCollapsedIntegral = function() {
  var mml = '<mo>∮</mo><mi>E</mi><mo>·</mo><mi>d</mi>' +
      '<mi mathvariant="bold">l</mi>';
  this.executeRuleTest(mml, 'integral plegado', 'default');
  this.executeRuleTest(mml, 'integral plegado', 'brief');
  this.executeRuleTest(mml, 'integral plegado', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-lim.
 */
sre.CollapseSpanishTest.prototype.testCollapsedLim = function() {
  var mml = '<mi>lim</mi>';
  this.executeRuleTest(mml, 'función de límite plegado', 'default');
  this.executeRuleTest(mml, 'límite plegado', 'brief');
  this.executeRuleTest(mml, 'límite plegado', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-matrix.
 */
sre.CollapseSpanishTest.prototype.testCollapsedMatrix = function() {
  var mml = '<mfenced open="[" close="]"><mtable>' +
      '<mtr><mtd><mi>a</mi></mtd><mtd><mi>b</mi></mtd></mtr>' +
      '<mtr><mtd><mi>c</mi></mtd><mtd><mi>d</mi></mtd></mtr>' +
      '<mtr><mtd><mi>e</mi></mtd><mtd><mi>f</mi></mtd></mtr>' +
      '</mtable></mfenced>';
  this.executeRuleTest(mml, '3 por 2 matriz plegado', 'default');
  this.executeRuleTest(mml, 'matriz plegado', 'brief');
  this.executeRuleTest(mml, 'matriz plegado', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-mixed-number.
 */
sre.CollapseSpanishTest.prototype.testCollapsedMixedNumber = function() {
  var mml = '<mn>1</mn><mfrac><mn>2</mn><mn>3</mn></mfrac>';
  this.executeRuleTest(mml, 'número largo mixto plegado', 'default');
  this.executeRuleTest(mml, 'número largo mixto plegado', 'brief');
  this.executeRuleTest(mml, 'número largo mixto plegado', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-multiplication.
 */
sre.CollapseSpanishTest.prototype.testCollapsedMultiplication = function() {
  var mml = '<mi>a</mi><mo>*</mo><mi>b</mi>';
  this.executeRuleTest(mml, 'producto con 2 factores plegado', 'default');
  this.executeRuleTest(mml, 'producto plegado', 'brief');
  this.executeRuleTest(mml, 'producto plegado', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-multirel.
 */
sre.CollapseSpanishTest.prototype.testCollapsedMultirel = function() {
  var mml = '<mi>a</mi><mo>=</mo><mi>b</mi><mo>&#x2264;</mo><mi>b</mi>';
  this.executeRuleTest(mml, 'secuencia de relación con 3 elementos plegado', 'default');
  this.executeRuleTest(mml, 'secuencia de relación plegado', 'brief');
  this.executeRuleTest(mml, 'secuencia de relación plegado', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-number.
 */
sre.CollapseSpanishTest.prototype.testCollapsedNumber = function() {
  var mml = '<mn>123456</mn>';
  this.executeRuleTest(mml, 'número largo plegado', 'default');
  this.executeRuleTest(mml, 'número largo plegado', 'brief');
  this.executeRuleTest(mml, 'número largo plegado', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-punctuated.
 */
sre.CollapseSpanishTest.prototype.testCollapsedPunctuated = function() {
  var mml = '<mi>a</mi><mo>,</mo><mi>b</mi><mo>,</mo><mi>c</mi>';
  this.executeRuleTest(mml, 'lista separada por coma de longitud 3 plegado', 'default');
  this.executeRuleTest(mml, 'lista separada por coma plegado', 'brief');
  this.executeRuleTest(mml, 'lista separada por coma plegado', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-relation.
 */
sre.CollapseSpanishTest.prototype.testCollapsedRelation = function() {
  var mml = '<mi>a</mi><mo>=</mo><mi>b</mi>';
  this.executeRuleTest(mml, 'igualdad plegado', 'default');
  this.executeRuleTest(mml, 'igualdad plegado', 'brief');
  this.executeRuleTest(mml, 'igualdad plegado', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-relation-seq.
 */
sre.CollapseSpanishTest.prototype.testCollapsedRelationSeq = function() {
  var mml = '<mi>a</mi><mo>=</mo><mi>b</mi><mo>=</mo><mi>b</mi>';
  this.executeRuleTest(mml, 'secuencia de igualdad con 3 elementos plegado', 'default');
  this.executeRuleTest(mml, 'secuencia de igualdad plegado', 'brief');
  this.executeRuleTest(mml, 'secuencia de igualdad plegado', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-root.
 */
sre.CollapseSpanishTest.prototype.testCollapsedRoot = function() {
  var mml = '<mroot><mi>x</mi><mn>3</mn></mroot>';
  this.executeRuleTest(mml, 'raíz del índice 3 plegado', 'default');
  this.executeRuleTest(mml, 'raíz plegado', 'brief');
  this.executeRuleTest(mml, 'raíz plegado', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-root-nested.
 */
sre.CollapseSpanishTest.prototype.testCollapsedRootNested = function() {
  var mml = '<mroot><mrow><mroot><mi>x</mi><mn>4</mn></mroot>' +
      '<mo>+</mo><mi>x</mi></mrow><mn>3</mn></mroot>';
  this.executeRuleTest(mml, 'raíz anidada del índice 3 plegado', 'default');
  this.executeRuleTest(mml, 'raíz anidada plegado', 'brief');
  this.executeRuleTest(mml, 'raíz anidada plegado', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-rowvector.
 */
sre.CollapseSpanishTest.prototype.testCollapsedRowvector = function() {
  var mml = '<mfenced open="[" close="]"><mtable>' +
      '<mtr><mtd><mi>a</mi></mtd><mtd><mi>b</mi></mtd></mtr>' +
      '</mtable></mfenced>';
  this.executeRuleTest(mml, 'vector fila de dimensión 2 plegado', 'default');
  this.executeRuleTest(mml, 'vector fila plegado', 'brief');
  this.executeRuleTest(mml, 'vector fila plegado', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-sqrt.
 */
sre.CollapseSpanishTest.prototype.testCollapsedSqrt = function() {
  var mml = '<msqrt><mn>2</mn></msqrt>';
  this.executeRuleTest(mml, 'raíz cuadrada plegado', 'default');
  this.executeRuleTest(mml, 'raíz cuadrada plegado', 'brief');
  this.executeRuleTest(mml, 'raíz cuadrada plegado', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-sqrt-nested.
 */
sre.CollapseSpanishTest.prototype.testCollapsedSqrtNested = function() {
  var mml = '<msqrt><mn>2</mn><msqrt><mn>2</mn></msqrt></msqrt>';
  this.executeRuleTest(mml, 'raíz cuadrada anidada plegado', 'default');
  this.executeRuleTest(mml, 'raíz cuadrada anidada plegado', 'brief');
  this.executeRuleTest(mml, 'raíz cuadrada anidada plegado', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-squarematrix.
 */
sre.CollapseSpanishTest.prototype.testCollapsedSquarematrix = function() {
  var mml = '<mfenced open="[" close="]"><mtable>' +
      '<mtr><mtd><mi>a</mi></mtd><mtd><mi>b</mi></mtd></mtr>' +
      '<mtr><mtd><mi>c</mi></mtd><mtd><mi>d</mi></mtd></mtr>' +
      '</mtable></mfenced>';
  this.executeRuleTest(mml, 'matriz cuadrada de dimensión 2 plegado', 'default');
  this.executeRuleTest(mml, 'matriz cuadrada plegado', 'brief');
  this.executeRuleTest(mml, 'matriz cuadrada plegado', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-subscript.
 */
sre.CollapseSpanishTest.prototype.testCollapsedSubscript = function() {
  var mml = '<msub><mi>a</mi><mi>b</mi></msub>';
  this.executeRuleTest(mml, 'subíndice plegado', 'default');
  this.executeRuleTest(mml, 'subíndice plegado', 'brief');
  this.executeRuleTest(mml, 'subíndice plegado', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-subsup.
 */
sre.CollapseSpanishTest.prototype.testCollapsedSubsup = function() {
  var mml = '<msubsup><mi>a</mi><mi>c</mi><mi>b</mi></msubsup>';
  this.executeRuleTest(mml, 'potencia con subíndice plegado', 'default');
  this.executeRuleTest(mml, 'potencia con subíndice plegado', 'brief');
  this.executeRuleTest(mml, 'potencia con subíndice plegado', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-superscript.
 */
sre.CollapseSpanishTest.prototype.testCollapsedSuperscript = function() {
  var mml = '<msup><mi>a</mi><mi>b</mi></msup>';
  this.executeRuleTest(mml, 'potencia plegado', 'default');
  this.executeRuleTest(mml, 'potencia plegado', 'brief');
  this.executeRuleTest(mml, 'potencia plegado', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-table.
 */
sre.CollapseSpanishTest.prototype.testCollapsedTable = function() {
  var mml = '<mtable><mtr><mtd><mi>a</mi></mtd><mtd><mi>b</mi></mtd></mtr>' +
      '<mtr><mtd><mi>c</mi></mtd><mtd><mi>d</mi></mtd></mtr></mtable>';
  this.executeRuleTest(mml, 'mesa con 2 filas y 2 columnas plegado', 'default');
  this.executeRuleTest(mml, 'mesa con 2 filas y 2 columnas plegado', 'brief');
  this.executeRuleTest(mml, 'mesa con 2 filas y 2 columnas plegado', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-text.
 */
sre.CollapseSpanishTest.prototype.testCollapsedText = function() {
  var mml = '<mtext>a b c</mtext>';
  this.executeRuleTest(mml, 'texto plegado', 'default');
  this.executeRuleTest(mml, 'texto plegado', 'brief');
  this.executeRuleTest(mml, 'texto plegado', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-var-addition.
 */
sre.CollapseSpanishTest.prototype.testCollapsedVarAddition = function() {
  var mml = '<mi>a</mi><mo>+</mo><mi>&#x2026;</mi><mo>+</mo><mi>b</mi>';
  this.executeRuleTest(mml, 'suma con número variable de sumandos plegado', 'default');
  this.executeRuleTest(mml, 'suma plegado', 'brief');
  this.executeRuleTest(mml, 'suma plegado', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-var-cases.
 */
sre.CollapseSpanishTest.prototype.testCollapsedVarCases = function() {
  var mml = '<mo>{</mo><mtable><mtr><mtd><mi>a</mi></mtd></mtr><mtr><mtd>' +
      '<mo>&#x2026;</mo></mtd></mtr><mtr><mtd><mi>b</mi></mtd></mtr></mtable>';
  this.executeRuleTest(
      mml, 'declaración de caso con número variable de casos plegado', 'default');
  this.executeRuleTest(mml, 'declaración de caso plegado', 'brief');
  this.executeRuleTest(mml, 'declaración de caso plegado', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-var-determinant.
 */
sre.CollapseSpanishTest.prototype.testCollapsedVarDeterminant = function() {
  var mml = '<mo>|</mo><mtable><mtr><mtd><mi>a</mi></mtd><mtd><mi>b</mi>' +
      '</mtd><mtd><mi>e</mi></mtd></mtr><mtr><mtd />' +
      '<mtd><mo>&#x22EF;</mo></mtd><mtd /></mtr><mtr><mtd><mi>c</mi></mtd>' +
      '<mtd><mi>d</mi></mtd><mtd><mi>f</mi></mtd></mtr></mtable><mo>|</mo>';
  this.executeRuleTest(mml, 'determinante de dimensión n plegado', 'default');
  this.executeRuleTest(mml, 'determinante plegado', 'brief');
  this.executeRuleTest(mml, 'determinante plegado', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-var-matrix.
 */
sre.CollapseSpanishTest.prototype.testCollapsedVarMatrix = function() {
  var mml = '<mo>(</mo><mtable><mtr><mtd><mi>a</mi></mtd><mtd><mi>b</mi>' +
      '</mtd><mtd><mi>e</mi></mtd></mtr><mtr><mtd />' +
      '<mtd><mo>&#x22EF;</mo></mtd><mtd /></mtr><mtr><mtd><mi>c</mi></mtd>' +
      '<mtd><mi>d</mi></mtd><mtd><mi>f</mi></mtd></mtr></mtable><mo>)</mo>';
  this.executeRuleTest(mml, 'matriz de dimensión n por m plegado', 'default');
  this.executeRuleTest(mml, 'matriz cuadrada plegado', 'brief');
  this.executeRuleTest(mml, 'matriz cuadrada plegado', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-var-multiplication.
 */
sre.CollapseSpanishTest.prototype.testCollapsedVarMultiplication = function() {
  var mml = '<mi>a</mi><mo>*</mo><mo>&#x2026;</mo><mo>*</mo><mi>b</mi>';
  this.executeRuleTest(
      mml, 'producto con una cantidad variable de factores plegado', 'default');
  this.executeRuleTest(mml, 'producto plegado', 'brief');
  this.executeRuleTest(mml, 'producto plegado', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-var-multirel.
 */
sre.CollapseSpanishTest.prototype.testCollapsedVarMultirel = function() {
  var mml = '<mi>a</mi><mo>=</mo><mo>&#x2026;</mo><mo>&#x2264;</mo><mi>b</mi>';
  this.executeRuleTest(
      mml, 'secuencia de relación con número variable de elementos plegado', 'default');
  this.executeRuleTest(mml, 'secuencia de relación plegado', 'brief');
  this.executeRuleTest(mml, 'secuencia de relación plegado', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-var-punctuated.
 */
sre.CollapseSpanishTest.prototype.testCollapsedVarPunctuated = function() {
  var mml = '<mi>a</mi><mo>,</mo><mo>&#x2026;</mo><mo>,</mo><mi>b</mi>';
  this.executeRuleTest(
      mml, 'lista separada por coma de longitud 3 plegado', 'default');
  this.executeRuleTest(mml, 'lista separada por coma plegado', 'brief');
  this.executeRuleTest(mml, 'lista separada por coma plegado', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-var-relation.
 */
sre.CollapseSpanishTest.prototype.testCollapsedVarRelation = function() {
  var mml = '<mi>a</mi><mo>=</mo><mo>&#x2026;</mo><mo>=</mo><mi>b</mi>';
  this.executeRuleTest(
      mml, 'secuencia de igualdad con una cantidad variable de elementos plegado', 'default');
  this.executeRuleTest(mml, 'secuencia de igualdad plegado', 'brief');
  this.executeRuleTest(mml, 'secuencia de igualdad plegado', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-var-vector.
 */
sre.CollapseSpanishTest.prototype.testCollapsedVarVector = function() {
  var mml = '<mfenced open="[" close="]"><mtable>' +
      '<mtr><mtd><mi>a</mi></mtd></mtr>' +
      '<mtr><mtd><mo>&#x22EE;</mo></mtd></mtr>' +
      '<mtr><mtd><mi>c</mi></mtd></mtr>' +
      '<mtr><mtd><mi>d</mi></mtd></mtr>' +
      '</mtable></mfenced>';
  this.executeRuleTest(mml, 'vector de dimensión n plegado', 'default');
  this.executeRuleTest(mml, 'vector plegado', 'brief');
  this.executeRuleTest(mml, 'vector plegado', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-vector.
 */
sre.CollapseSpanishTest.prototype.testCollapsedVector = function() {
  var mml = '<mfenced open="[" close="]"><mtable>' +
      '<mtr><mtd><mi>a</mi></mtd></mtr>' +
      '<mtr><mtd><mi>c</mi></mtd></mtr>' +
      '<mtr><mtd><mi>e</mi></mtd></mtr>' +
      '</mtable></mfenced>';
  this.executeRuleTest(mml, 'vector de dimensión 3 plegado', 'default');
  this.executeRuleTest(mml, 'vector plegado', 'brief');
  this.executeRuleTest(mml, 'vector plegado', 'sbrief');
};

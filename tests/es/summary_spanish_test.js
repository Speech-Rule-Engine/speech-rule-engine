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
 * @fileoverview Testcases for summary speech generation.
 *
 * @author v.sorge@mathjax.org (Volker Sorge)
 */

goog.provide('sre.SummarySpanishTest');

goog.require('sre.SummaryRuleTest');



/**
 * @constructor
 * @extends {sre.SummaryRuleTest}
 */
sre.SummarySpanishTest = function() {
  sre.SummarySpanishTest.base(this, 'constructor');

  /**
   * @override
   */
  this.information = 'Summary Spanish tests.';

  this.locale = 'es';
  this.setActive('SummarySpanish');
};
goog.inherits(sre.SummarySpanishTest, sre.SummaryRuleTest);


/**
 * Testing Summary Rule for abstr-addition.
 */
sre.SummarySpanishTest.prototype.testAbstrAddition = function() {
  var mml = '<mi>a</mi><mo>+</mo><mi>b</mi>';
  this.executeRuleTest(mml, 'suma con 2 sumandos', 'default');
  this.executeRuleTest(mml, 'suma', 'brief');
  this.executeRuleTest(mml, 'suma', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-bigop.
 */
sre.SummarySpanishTest.prototype.testAbstrBigop = function() {
  var mml = '<mo>&#x2211;</mo><mi>x</mi>';
  this.executeRuleTest(mml, 'sumatorio', 'default');
  this.executeRuleTest(mml, 'sumatorio', 'brief');
  this.executeRuleTest(mml, 'sumatorio', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-binomial.
 */
sre.SummarySpanishTest.prototype.testAbstrBinomial = function() {
  var mml = '<mfenced open="(" close=")"><mtable><mtr><mtd><mi>x</mi></mtd>' +
      '</mtr><mtr><mtd><mi>y</mi></mtd></mtr></mtable></mfenced>';
  this.executeRuleTest(mml, 'binomio', 'default');
  this.executeRuleTest(mml, 'binomio', 'brief');
  this.executeRuleTest(mml, 'binomio', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-cases.
 */
sre.SummarySpanishTest.prototype.testAbstrCases = function() {
  var mml = '<mfenced separators="" open="{" close=""><mtable>' +
      '<mtr><mtd><mi>y</mi></mtd><mtd><mn>0</mn></mtd></mtr>' +
      '<mtr><mtd><mi>y</mi></mtd><mtd><mn>2</mn></mtd></mtr>' +
      '</mtable></mfenced>';
  this.executeRuleTest(mml, 'declaración de caso con 2 casos', 'default');
  this.executeRuleTest(mml, 'declaración de caso', 'brief');
  this.executeRuleTest(mml, 'declaración de caso', 'sbrief');
};


// TODO
/**
 * Testing Summary Rule for abstr-cell.
 */
sre.SummarySpanishTest.prototype.testAbstrCell = function() {
  var mml = '<mtable><mtr><mtd><mi>a</mi></mtd>' +
      '<mtd><mi>b</mi></mtd></mtr></mtable>';
  this.steps = ['DOWN', 'DOWN'];
  this.executeRuleTest(mml, '1a columna en mesa', 'default');
  this.executeRuleTest(mml, '1a columna en mesa', 'brief');
  this.executeRuleTest(mml, '1a columna en mesa', 'sbrief');
  this.steps = null;
};


/**
 * Testing Summary Rule for abstr-continued-fraction.
 */
sre.SummarySpanishTest.prototype.testAbstrContinuedFraction = function() {
  var mml = '<mfrac><msub>' +
      '<mi>b</mi><mn>1</mn></msub><mrow><msub><mi>a</mi><mn>1</mn></msub>' +
      '<mo>+</mo><mfrac><msub><mi>b</mi><mn>2</mn></msub><mrow><msub>' +
      '<mi>a</mi><mn>2</mn></msub><mo>+</mo><mfrac><msub><mi>b</mi>' +
      '<mn>3</mn></msub><mrow><msub><mi>a</mi><mn>3</mn></msub><mo>+</mo>' +
      '<mo>&#x2026;</mo></mrow></mfrac></mrow></mfrac></mrow></mfrac>';
  this.executeRuleTest(mml, 'fracción continua', 'default');
  this.executeRuleTest(mml, 'frac continua', 'brief');
  this.executeRuleTest(mml, 'frac continua', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-determinant.
 */
sre.SummarySpanishTest.prototype.testAbstrDeterminant = function() {
  var mml = '<mfenced open="|" close="|"><mtable>' +
      '<mtr><mtd><mi>a</mi></mtd><mtd><mi>b</mi></mtd></mtr>' +
      '<mtr><mtd><mi>c</mi></mtd><mtd><mi>d</mi></mtd></mtr>' +
      '</mtable></mfenced>';
  this.executeRuleTest(mml, 'determinante de dimensión 2', 'default');
  this.executeRuleTest(mml, 'determinante', 'brief');
  this.executeRuleTest(mml, 'determinante', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-fraction.
 */
sre.SummarySpanishTest.prototype.testAbstrFraction = function() {
  var mml = '<mfrac><mn>1</mn><mi>x</mi></mfrac>';
  this.executeRuleTest(mml, 'fracción', 'default');
  this.executeRuleTest(mml, 'frac', 'brief');
  this.executeRuleTest(mml, 'frac', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-function.
 */
sre.SummarySpanishTest.prototype.testAbstrFunction = function() {
  // var mml = '<mi>sin</mi><mi>x</mi>';
  var mml = '<mi>sin</mi>';
  this.executeRuleTest(mml, 'expresión funcional', 'default');
  this.executeRuleTest(mml, 'función', 'brief');
  this.executeRuleTest(mml, 'función', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-identifier.
 */
sre.SummarySpanishTest.prototype.testAbstrIdentifier = function() {
  var mml = '<mi>a</mi>';
  this.executeRuleTest(mml, 'identificador', 'default');
  this.executeRuleTest(mml, 'identificador', 'brief');
  this.executeRuleTest(mml, 'identificador', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-infixop.
 */
sre.SummarySpanishTest.prototype.testAbstrInfixop = function() {
  var mml = '<mi>a</mi><mo>/</mo><mi>b</mi>';
  this.executeRuleTest(mml, 'división con 2 elementos', 'default');
  this.executeRuleTest(mml, 'división', 'brief');
  this.executeRuleTest(mml, 'división', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-integral.
 */
sre.SummarySpanishTest.prototype.testAbstrIntegral = function() {
  var mml = '<mo>∮</mo><mi>E</mi><mo>·</mo><mi>d</mi>' +
      '<mi mathvariant="bold">l</mi>';
  this.executeRuleTest(mml, 'integral', 'default');
  this.executeRuleTest(mml, 'integral', 'brief');
  this.executeRuleTest(mml, 'integral', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-lim.
 */
sre.SummarySpanishTest.prototype.testAbstrLim = function() {
  var mml = '<mi>lim</mi>';
  this.executeRuleTest(mml, 'función de límite', 'default');
  this.executeRuleTest(mml, 'límite', 'brief');
  this.executeRuleTest(mml, 'límite', 'sbrief');
};


// TODO
/**
 * Testing Summary Rule for abstr-line.
 */
sre.SummarySpanishTest.prototype.testAbstrLine = function() {
  var mml = '<mtable><mtr><mtd><mi>a</mi></mtd></mtr></mtable>';
  this.steps = ['DOWN'];
  this.executeRuleTest(mml, '1a fila en líneas múltiples', 'default');
  this.executeRuleTest(mml, '1a fila en líneas múltiples', 'brief');
  this.executeRuleTest(mml, '1a fila en líneas múltiples', 'sbrief');
  this.steps = null;
};


/**
 * Testing Summary Rule for abstr-matrix.
 */
sre.SummarySpanishTest.prototype.testAbstrMatrix = function() {
  var mml = '<mfenced open="[" close="]"><mtable>' +
      '<mtr><mtd><mi>a</mi></mtd><mtd><mi>b</mi></mtd></mtr>' +
      '<mtr><mtd><mi>c</mi></mtd><mtd><mi>d</mi></mtd></mtr>' +
      '<mtr><mtd><mi>e</mi></mtd><mtd><mi>f</mi></mtd></mtr>' +
      '</mtable></mfenced>';
  this.executeRuleTest(mml, '3 por 2 matriz', 'default');
  this.executeRuleTest(mml, 'matriz', 'brief');
  this.executeRuleTest(mml, 'matriz', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-mixed-number.
 */
sre.SummarySpanishTest.prototype.testAbstrMixedNumber = function() {
  var mml = '<mn>1</mn><mfrac><mn>2</mn><mn>3</mn></mfrac>';
  this.executeRuleTest(mml, 'número mixto', 'default');
  this.executeRuleTest(mml, 'número mixto', 'brief');
  this.executeRuleTest(mml, 'número mixto', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-multiplication.
 */
sre.SummarySpanishTest.prototype.testAbstrMultiplication = function() {
  var mml = '<mi>a</mi><mo>*</mo><mi>b</mi>';
  this.executeRuleTest(mml, 'producto con 2 factores', 'default');
  this.executeRuleTest(mml, 'producto', 'brief');
  this.executeRuleTest(mml, 'producto', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-multirel.
 */
sre.SummarySpanishTest.prototype.testAbstrMultirel = function() {
  var mml = '<mi>a</mi><mo>=</mo><mi>b</mi><mo>&#x2264;</mo><mi>b</mi>';
  this.executeRuleTest(mml, 'secuencia de relación con 3 elementos', 'default');
  this.executeRuleTest(mml, 'secuencia de relación', 'brief');
  this.executeRuleTest(mml, 'secuencia de relación', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-number.
 */
sre.SummarySpanishTest.prototype.testAbstrNumber = function() {
  var mml = '<mn>123456</mn>';
  this.executeRuleTest(mml, 'número', 'default');
  this.executeRuleTest(mml, 'número', 'brief');
  this.executeRuleTest(mml, 'número', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-punctuated.
 */
sre.SummarySpanishTest.prototype.testAbstrPunctuated = function() {
  var mml = '<mi>a</mi><mo>,</mo><mi>b</mi><mo>,</mo><mi>c</mi>';
  this.executeRuleTest(mml, 'lista separada por coma de longitud 3', 'default');
  this.executeRuleTest(mml, 'lista separada por coma', 'brief');
  this.executeRuleTest(mml, 'lista separada por coma', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-relation.
 */
sre.SummarySpanishTest.prototype.testAbstrRelation = function() {
  var mml = '<mi>a</mi><mo>=</mo><mi>b</mi>';
  this.executeRuleTest(mml, 'igualdad', 'default');
  this.executeRuleTest(mml, 'igualdad', 'brief');
  this.executeRuleTest(mml, 'igualdad', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-relation-seq.
 */
sre.SummarySpanishTest.prototype.testAbstrRelationSeq = function() {
  var mml = '<mi>a</mi><mo>=</mo><mi>b</mi><mo>=</mo><mi>b</mi>';
  this.executeRuleTest(mml, 'secuencia de igualdad con 3 elementos', 'default');
  this.executeRuleTest(mml, 'secuencia de igualdad', 'brief');
  this.executeRuleTest(mml, 'secuencia de igualdad', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-root.
 */
sre.SummarySpanishTest.prototype.testAbstrRoot = function() {
  var mml = '<mroot><mi>x</mi><mn>3</mn></mroot>';
  this.executeRuleTest(mml, 'raíz del índice 3', 'default');
  this.executeRuleTest(mml, 'raíz', 'brief');
  this.executeRuleTest(mml, 'raíz', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-root-nested.
 */
sre.SummarySpanishTest.prototype.testAbstrRootNested = function() {
  var mml = '<mroot><mrow><mroot><mi>x</mi><mn>4</mn></mroot>' +
      '<mo>+</mo><mi>x</mi></mrow><mn>3</mn></mroot>';
  this.executeRuleTest(mml, 'raíz anidada del índice 3', 'default');
  this.executeRuleTest(mml, 'raíz anidada', 'brief');
  this.executeRuleTest(mml, 'raíz anidada', 'sbrief');
};


// TODO
/**
 * Testing Summary Rule for abstr-row.
 */
sre.SummarySpanishTest.prototype.testAbstrRow = function() {
  var mml = '<mtable><mtr><mtd><mi>a</mi></mtd>' +
      '<mtd><mi>b</mi></mtd></mtr></mtable>';
  this.steps = ['DOWN'];
  this.executeRuleTest(mml, '1a fila en mesa con 2 columnas', 'default');
  this.executeRuleTest(mml, '1a fila en mesa con 2 columnas', 'brief');
  this.executeRuleTest(mml, '1a fila en mesa con 2 columnas', 'sbrief');
  this.steps = null;
};


/**
 * Testing Summary Rule for abstr-rowvector.
 */
sre.SummarySpanishTest.prototype.testAbstrRowvector = function() {
  var mml = '<mfenced open="[" close="]"><mtable>' +
      '<mtr><mtd><mi>a</mi></mtd><mtd><mi>b</mi></mtd></mtr>' +
      '</mtable></mfenced>';
  this.executeRuleTest(mml, 'vector fila de dimensión 2', 'default');
  this.executeRuleTest(mml, 'vector fila', 'brief');
  this.executeRuleTest(mml, 'vector fila', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-sqrt.
 */
sre.SummarySpanishTest.prototype.testAbstrSqrt = function() {
  var mml = '<msqrt><mn>2</mn></msqrt>';
  this.executeRuleTest(mml, 'raíz cuadrada', 'default');
  this.executeRuleTest(mml, 'raíz cuadrada', 'brief');
  this.executeRuleTest(mml, 'raíz cuadrada', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-sqrt-nested.
 */
sre.SummarySpanishTest.prototype.testAbstrSqrtNested = function() {
  var mml = '<msqrt><mn>2</mn><msqrt><mn>2</mn></msqrt></msqrt>';
  this.executeRuleTest(mml, 'raíz cuadrada anidada', 'default');
  this.executeRuleTest(mml, 'raíz cuadrada anidada', 'brief');
  this.executeRuleTest(mml, 'raíz cuadrada anidada', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-squarematrix.
 */
sre.SummarySpanishTest.prototype.testAbstrSquarematrix = function() {
  var mml = '<mfenced open="[" close="]"><mtable>' +
      '<mtr><mtd><mi>a</mi></mtd><mtd><mi>b</mi></mtd></mtr>' +
      '<mtr><mtd><mi>c</mi></mtd><mtd><mi>d</mi></mtd></mtr>' +
      '</mtable></mfenced>';
  this.executeRuleTest(mml, 'matriz cuadrada de dimensión 2', 'default');
  this.executeRuleTest(mml, 'matriz cuadrada', 'brief');
  this.executeRuleTest(mml, 'matriz cuadrada', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-subscript.
 */
sre.SummarySpanishTest.prototype.testAbstrSubscript = function() {
  var mml = '<msub><mi>a</mi><mi>b</mi></msub>';
  this.executeRuleTest(mml, 'subíndice', 'default');
  this.executeRuleTest(mml, 'subíndice', 'brief');
  this.executeRuleTest(mml, 'subíndice', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-subsup.
 */
sre.SummarySpanishTest.prototype.testAbstrSubsup = function() {
  var mml = '<msubsup><mi>a</mi><mi>c</mi><mi>b</mi></msubsup>';
  this.executeRuleTest(mml, 'potencia con subíndice', 'default');
  this.executeRuleTest(mml, 'potencia con subíndice', 'brief');
  this.executeRuleTest(mml, 'potencia con subíndice', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-superscript.
 */
sre.SummarySpanishTest.prototype.testAbstrSuperscript = function() {
  var mml = '<msup><mi>a</mi><mi>b</mi></msup>';
  this.executeRuleTest(mml, 'potencia', 'default');
  this.executeRuleTest(mml, 'potencia', 'brief');
  this.executeRuleTest(mml, 'potencia', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-table.
 */
sre.SummarySpanishTest.prototype.testAbstrTable = function() {
  var mml = '<mtable><mtr><mtd><mi>a</mi></mtd><mtd><mi>b</mi></mtd></mtr>' +
      '<mtr><mtd><mi>c</mi></mtd><mtd><mi>d</mi></mtd></mtr></mtable>';
  this.executeRuleTest(mml, 'mesa con 2 filas y 2 columnas', 'default');
  this.executeRuleTest(mml, 'mesa con 2 filas y 2 columnas', 'brief');
  this.executeRuleTest(mml, 'mesa con 2 filas y 2 columnas', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-text.
 */
sre.SummarySpanishTest.prototype.testAbstrText = function() {
  var mml = '<mtext>a b c</mtext>';
  this.executeRuleTest(mml, 'texto', 'default');
  this.executeRuleTest(mml, 'texto', 'brief');
  this.executeRuleTest(mml, 'texto', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-var-addition.
 */
sre.SummarySpanishTest.prototype.testAbstrVarAddition = function() {
  var mml = '<mi>a</mi><mo>+</mo><mi>&#x2026;</mi><mo>+</mo><mi>b</mi>';
  this.executeRuleTest(mml, 'suma con número variable de sumandos', 'default');
  this.executeRuleTest(mml, 'suma', 'brief');
  this.executeRuleTest(mml, 'suma', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-var-cases.
 */
sre.SummarySpanishTest.prototype.testAbstrVarCases = function() {
  var mml = '<mo>{</mo><mtable><mtr><mtd><mi>a</mi></mtd></mtr><mtr><mtd>' +
      '<mo>&#x2026;</mo></mtd></mtr><mtr><mtd><mi>b</mi></mtd></mtr></mtable>';
  this.executeRuleTest(
      mml, 'declaración de caso con número variable de casos', 'default');
  this.executeRuleTest(mml, 'declaración de caso', 'brief');
  this.executeRuleTest(mml, 'declaración de caso', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-var-determinant.
 */
sre.SummarySpanishTest.prototype.testAbstrVarDeterminant = function() {
  var mml = '<mo>|</mo><mtable><mtr><mtd><mi>a</mi></mtd><mtd><mi>b</mi>' +
      '</mtd><mtd><mi>e</mi></mtd></mtr><mtr><mtd />' +
      '<mtd><mo>&#x22EF;</mo></mtd><mtd /></mtr><mtr><mtd><mi>c</mi></mtd>' +
      '<mtd><mi>d</mi></mtd><mtd><mi>f</mi></mtd></mtr></mtable><mo>|</mo>';
  this.executeRuleTest(mml, 'determinante de dimensión n', 'default');
  this.executeRuleTest(mml, 'determinante', 'brief');
  this.executeRuleTest(mml, 'determinante', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-var-matrix.
 */
sre.SummarySpanishTest.prototype.testAbstrVarMatrix = function() {
  var mml = '<mo>(</mo><mtable><mtr><mtd><mi>a</mi></mtd><mtd><mi>b</mi>' +
      '</mtd><mtd><mi>e</mi></mtd></mtr><mtr><mtd />' +
      '<mtd><mo>&#x22EF;</mo></mtd><mtd /></mtr><mtr><mtd><mi>c</mi></mtd>' +
      '<mtd><mi>d</mi></mtd><mtd><mi>f</mi></mtd></mtr></mtable><mo>)</mo>';
  this.executeRuleTest(mml, 'matriz de dimensión n por m', 'default');
  this.executeRuleTest(mml, 'matriz cuadrada', 'brief');
  this.executeRuleTest(mml, 'matriz cuadrada', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-var-multiplication.
 */
sre.SummarySpanishTest.prototype.testAbstrVarMultiplication = function() {
  var mml = '<mi>a</mi><mo>*</mo><mo>&#x2026;</mo><mo>*</mo><mi>b</mi>';
  this.executeRuleTest(
      mml, 'producto con una cantidad variable de factores', 'default');
  this.executeRuleTest(mml, 'producto', 'brief');
  this.executeRuleTest(mml, 'producto', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-var-multirel.
 */
sre.SummarySpanishTest.prototype.testAbstrVarMultirel = function() {
  var mml = '<mi>a</mi><mo>=</mo><mo>&#x2026;</mo><mo>&#x2264;</mo><mi>b</mi>';
  this.executeRuleTest(
      mml, 'secuencia de relación con número variable de elementos', 'default');
  this.executeRuleTest(mml, 'secuencia de relación', 'brief');
  this.executeRuleTest(mml, 'secuencia de relación', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-var-punctuated.
 */
sre.SummarySpanishTest.prototype.testAbstrVarPunctuated = function() {
  var mml = '<mi>a</mi><mo>,</mo><mo>&#x2026;</mo><mo>,</mo><mi>b</mi>';
  this.executeRuleTest(
      mml, 'lista separada por coma de longitud 3', 'default');
  this.executeRuleTest(mml, 'lista separada por coma', 'brief');
  this.executeRuleTest(mml, 'lista separada por coma', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-var-relation.
 */
sre.SummarySpanishTest.prototype.testAbstrVarRelation = function() {
  var mml = '<mi>a</mi><mo>=</mo><mo>&#x2026;</mo><mo>=</mo><mi>b</mi>';
  this.executeRuleTest(
      mml, 'secuencia de igualdad con una cantidad variable de elementos', 'default');
  this.executeRuleTest(mml, 'secuencia de igualdad', 'brief');
  this.executeRuleTest(mml, 'secuencia de igualdad', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-var-vector.
 */
sre.SummarySpanishTest.prototype.testAbstrVarVector = function() {
  var mml = '<mfenced open="[" close="]"><mtable>' +
      '<mtr><mtd><mi>a</mi></mtd></mtr>' +
      '<mtr><mtd><mo>&#x22EE;</mo></mtd></mtr>' +
      '<mtr><mtd><mi>c</mi></mtd></mtr>' +
      '<mtr><mtd><mi>d</mi></mtd></mtr>' +
      '</mtable></mfenced>';
  this.executeRuleTest(mml, 'vector de dimensión n', 'default');
  this.executeRuleTest(mml, 'vector', 'brief');
  this.executeRuleTest(mml, 'vector', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-vector.
 */
sre.SummarySpanishTest.prototype.testAbstrVector = function() {
  var mml = '<mfenced open="[" close="]"><mtable>' +
      '<mtr><mtd><mi>a</mi></mtd></mtr>' +
      '<mtr><mtd><mi>c</mi></mtd></mtr>' +
      '<mtr><mtd><mi>e</mi></mtd></mtr>' +
      '</mtable></mfenced>';
  this.executeRuleTest(mml, 'vector de dimensión 3', 'default');
  this.executeRuleTest(mml, 'vector', 'brief');
  this.executeRuleTest(mml, 'vector', 'sbrief');
};

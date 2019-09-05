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

goog.provide('sre.SummaryEnglishTest');

goog.require('sre.SummaryRuleTest');



/**
 * @constructor
 * @extends {sre.SummaryRuleTest}
 */
sre.SummaryEnglishTest = function() {
  sre.SummaryEnglishTest.base(this, 'constructor');

  /**
   * @override
   */
  this.information = 'Summary English tests.';

  this.setActive('SummaryEnglish');
};
goog.inherits(sre.SummaryEnglishTest, sre.SummaryRuleTest);


/**
 * Testing Summary Rule for abstr-addition.
 */
sre.SummaryEnglishTest.prototype.testAbstrAddition = function() {
  var mml = '<mi>a</mi><mo>+</mo><mi>b</mi>';
  this.executeRuleTest(mml, 'sum with 2 summands', 'default');
  this.executeRuleTest(mml, 'sum', 'brief');
  this.executeRuleTest(mml, 'sum', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-bigop.
 */
sre.SummaryEnglishTest.prototype.testAbstrBigop = function() {
  var mml = '<mo>&#x2211;</mo><mi>x</mi>';
  this.executeRuleTest(mml, 'sigma-summation', 'default');
  this.executeRuleTest(mml, 'sigma-summation', 'brief');
  this.executeRuleTest(mml, 'sigma-summation', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-binomial.
 */
sre.SummaryEnglishTest.prototype.testAbstrBinomial = function() {
  var mml = '<mfenced open="(" close=")"><mtable><mtr><mtd><mi>x</mi></mtd>' +
      '</mtr><mtr><mtd><mi>y</mi></mtd></mtr></mtable></mfenced>';
  this.executeRuleTest(mml, 'binomial', 'default');
  this.executeRuleTest(mml, 'binomial', 'brief');
  this.executeRuleTest(mml, 'binomial', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-cases.
 */
sre.SummaryEnglishTest.prototype.testAbstrCases = function() {
  var mml = '<mfenced separators="" open="{" close=""><mtable>' +
      '<mtr><mtd><mi>y</mi></mtd><mtd><mn>0</mn></mtd></mtr>' +
      '<mtr><mtd><mi>y</mi></mtd><mtd><mn>2</mn></mtd></mtr>' +
      '</mtable></mfenced>';
  this.executeRuleTest(mml, 'case statement with 2 cases', 'default');
  this.executeRuleTest(mml, 'case statement', 'brief');
  this.executeRuleTest(mml, 'case statement', 'sbrief');
};


// TODO
/**
 * Testing Summary Rule for abstr-cell.
 */
sre.SummaryEnglishTest.prototype.testAbstrCell = function() {
  var mml = '<mtable><mtr><mtd><mi>a</mi></mtd>' +
      '<mtd><mi>b</mi></mtd></mtr></mtable>';
  this.steps = ['DOWN', 'DOWN'];
  this.executeRuleTest(mml, '1st Column in table', 'default');
  this.executeRuleTest(mml, '1st Column in table', 'brief');
  this.executeRuleTest(mml, '1st Column in table', 'sbrief');
  this.steps = null;
};


/**
 * Testing Summary Rule for abstr-continued-fraction.
 */
sre.SummaryEnglishTest.prototype.testAbstrContinuedFraction = function() {
  var mml = '<mfrac><msub>' +
      '<mi>b</mi><mn>1</mn></msub><mrow><msub><mi>a</mi><mn>1</mn></msub>' +
      '<mo>+</mo><mfrac><msub><mi>b</mi><mn>2</mn></msub><mrow><msub>' +
      '<mi>a</mi><mn>2</mn></msub><mo>+</mo><mfrac><msub><mi>b</mi>' +
      '<mn>3</mn></msub><mrow><msub><mi>a</mi><mn>3</mn></msub><mo>+</mo>' +
      '<mo>&#x2026;</mo></mrow></mfrac></mrow></mfrac></mrow></mfrac>';
  this.executeRuleTest(mml, 'continued fraction', 'default');
  this.executeRuleTest(mml, 'continued frac', 'brief');
  this.executeRuleTest(mml, 'continued frac', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-determinant.
 */
sre.SummaryEnglishTest.prototype.testAbstrDeterminant = function() {
  var mml = '<mfenced open="|" close="|"><mtable>' +
      '<mtr><mtd><mi>a</mi></mtd><mtd><mi>b</mi></mtd></mtr>' +
      '<mtr><mtd><mi>c</mi></mtd><mtd><mi>d</mi></mtd></mtr>' +
      '</mtable></mfenced>';
  this.executeRuleTest(mml, '2 dimensional determinant', 'default');
  this.executeRuleTest(mml, 'determinant', 'brief');
  this.executeRuleTest(mml, 'determinant', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-fraction.
 */
sre.SummaryEnglishTest.prototype.testAbstrFraction = function() {
  var mml = '<mfrac><mn>1</mn><mi>x</mi></mfrac>';
  this.executeRuleTest(mml, 'fraction', 'default');
  this.executeRuleTest(mml, 'frac', 'brief');
  this.executeRuleTest(mml, 'frac', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-function.
 */
sre.SummaryEnglishTest.prototype.testAbstrFunction = function() {
  // var mml = '<mi>sin</mi><mi>x</mi>';
  var mml = '<mi>sin</mi>';
  this.executeRuleTest(mml, 'functional expression', 'default');
  this.executeRuleTest(mml, 'function', 'brief');
  this.executeRuleTest(mml, 'function', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-identifier.
 */
sre.SummaryEnglishTest.prototype.testAbstrIdentifier = function() {
  var mml = '<mi>a</mi>';
  this.executeRuleTest(mml, 'identifier', 'default');
  this.executeRuleTest(mml, 'identifier', 'brief');
  this.executeRuleTest(mml, 'identifier', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-infixop.
 */
sre.SummaryEnglishTest.prototype.testAbstrInfixop = function() {
  var mml = '<mi>a</mi><mo>/</mo><mi>b</mi>';
  this.executeRuleTest(mml, 'division with 2 elements', 'default');
  this.executeRuleTest(mml, 'division', 'brief');
  this.executeRuleTest(mml, 'division', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-integral.
 */
sre.SummaryEnglishTest.prototype.testAbstrIntegral = function() {
  var mml = '<mo>∮</mo><mi>E</mi><mo>·</mo><mi>d</mi>' +
      '<mi mathvariant="bold">l</mi>';
  this.executeRuleTest(mml, 'integral', 'default');
  this.executeRuleTest(mml, 'integral', 'brief');
  this.executeRuleTest(mml, 'integral', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-lim.
 */
sre.SummaryEnglishTest.prototype.testAbstrLim = function() {
  var mml = '<mi>lim</mi>';
  this.executeRuleTest(mml, 'limit function', 'default');
  this.executeRuleTest(mml, 'lim', 'brief');
  this.executeRuleTest(mml, 'lim', 'sbrief');
};


// TODO
/**
 * Testing Summary Rule for abstr-line.
 */
sre.SummaryEnglishTest.prototype.testAbstrLine = function() {
  var mml = '<mtable><mtr><mtd><mi>a</mi></mtd></mtr></mtable>';
  this.steps = ['DOWN'];
  this.executeRuleTest(mml, '1st Row in multiple lines', 'default');
  this.executeRuleTest(mml, '1st Row in multiple lines', 'brief');
  this.executeRuleTest(mml, '1st Row in multiple lines', 'sbrief');
  this.steps = null;
};


/**
 * Testing Summary Rule for abstr-matrix.
 */
sre.SummaryEnglishTest.prototype.testAbstrMatrix = function() {
  var mml = '<mfenced open="[" close="]"><mtable>' +
      '<mtr><mtd><mi>a</mi></mtd><mtd><mi>b</mi></mtd></mtr>' +
      '<mtr><mtd><mi>c</mi></mtd><mtd><mi>d</mi></mtd></mtr>' +
      '<mtr><mtd><mi>e</mi></mtd><mtd><mi>f</mi></mtd></mtr>' +
      '</mtable></mfenced>';
  this.executeRuleTest(mml, '3 by 2 matrix', 'default');
  this.executeRuleTest(mml, 'matrix', 'brief');
  this.executeRuleTest(mml, 'matrix', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-mixed-number.
 */
sre.SummaryEnglishTest.prototype.testAbstrMixedNumber = function() {
  var mml = '<mn>1</mn><mfrac><mn>2</mn><mn>3</mn></mfrac>';
  this.executeRuleTest(mml, 'mixed number', 'default');
  this.executeRuleTest(mml, 'mixed number', 'brief');
  this.executeRuleTest(mml, 'mixed number', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-multiplication.
 */
sre.SummaryEnglishTest.prototype.testAbstrMultiplication = function() {
  var mml = '<mi>a</mi><mo>*</mo><mi>b</mi>';
  this.executeRuleTest(mml, 'product with 2 factors', 'default');
  this.executeRuleTest(mml, 'product', 'brief');
  this.executeRuleTest(mml, 'product', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-multirel.
 */
sre.SummaryEnglishTest.prototype.testAbstrMultirel = function() {
  var mml = '<mi>a</mi><mo>=</mo><mi>b</mi><mo>&#x2264;</mo><mi>b</mi>';
  this.executeRuleTest(mml, 'relation sequence with 3 elements', 'default');
  this.executeRuleTest(mml, 'relation sequence', 'brief');
  this.executeRuleTest(mml, 'relation sequence', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-number.
 */
sre.SummaryEnglishTest.prototype.testAbstrNumber = function() {
  var mml = '<mn>123456</mn>';
  this.executeRuleTest(mml, 'number', 'default');
  this.executeRuleTest(mml, 'number', 'brief');
  this.executeRuleTest(mml, 'number', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-punctuated.
 */
sre.SummaryEnglishTest.prototype.testAbstrPunctuated = function() {
  var mml = '<mi>a</mi><mo>,</mo><mi>b</mi><mo>,</mo><mi>c</mi>';
  this.executeRuleTest(mml, 'comma separated list of length 3', 'default');
  this.executeRuleTest(mml, 'comma separated list', 'brief');
  this.executeRuleTest(mml, 'comma separated list', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-relation.
 */
sre.SummaryEnglishTest.prototype.testAbstrRelation = function() {
  var mml = '<mi>a</mi><mo>=</mo><mi>b</mi>';
  this.executeRuleTest(mml, 'equality', 'default');
  this.executeRuleTest(mml, 'equality', 'brief');
  this.executeRuleTest(mml, 'equality', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-relation-seq.
 */
sre.SummaryEnglishTest.prototype.testAbstrRelationSeq = function() {
  var mml = '<mi>a</mi><mo>=</mo><mi>b</mi><mo>=</mo><mi>b</mi>';
  this.executeRuleTest(mml, 'equality sequence with 3 elements', 'default');
  this.executeRuleTest(mml, 'equality sequence', 'brief');
  this.executeRuleTest(mml, 'equality sequence', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-root.
 */
sre.SummaryEnglishTest.prototype.testAbstrRoot = function() {
  var mml = '<mroot><mi>x</mi><mn>3</mn></mroot>';
  this.executeRuleTest(mml, 'root of index 3', 'default');
  this.executeRuleTest(mml, 'root', 'brief');
  this.executeRuleTest(mml, 'root', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-root-nested.
 */
sre.SummaryEnglishTest.prototype.testAbstrRootNested = function() {
  var mml = '<mroot><mrow><mroot><mi>x</mi><mn>4</mn></mroot>' +
      '<mo>+</mo><mi>x</mi></mrow><mn>3</mn></mroot>';
  this.executeRuleTest(mml, 'nested root of index 3', 'default');
  this.executeRuleTest(mml, 'nested root', 'brief');
  this.executeRuleTest(mml, 'nested root', 'sbrief');
};


// TODO
/**
 * Testing Summary Rule for abstr-row.
 */
sre.SummaryEnglishTest.prototype.testAbstrRow = function() {
  var mml = '<mtable><mtr><mtd><mi>a</mi></mtd>' +
      '<mtd><mi>b</mi></mtd></mtr></mtable>';
  this.steps = ['DOWN'];
  this.executeRuleTest(mml, '1st Row in table with 2 columns', 'default');
  this.executeRuleTest(mml, '1st Row in table with 2 columns', 'brief');
  this.executeRuleTest(mml, '1st Row in table with 2 columns', 'sbrief');
  this.steps = null;
};


/**
 * Testing Summary Rule for abstr-rowvector.
 */
sre.SummaryEnglishTest.prototype.testAbstrRowvector = function() {
  var mml = '<mfenced open="[" close="]"><mtable>' +
      '<mtr><mtd><mi>a</mi></mtd><mtd><mi>b</mi></mtd></mtr>' +
      '</mtable></mfenced>';
  this.executeRuleTest(mml, '2 dimensional row vector', 'default');
  this.executeRuleTest(mml, 'row vector', 'brief');
  this.executeRuleTest(mml, 'row vector', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-sqrt.
 */
sre.SummaryEnglishTest.prototype.testAbstrSqrt = function() {
  var mml = '<msqrt><mn>2</mn></msqrt>';
  this.executeRuleTest(mml, 'square root', 'default');
  this.executeRuleTest(mml, 'square root', 'brief');
  this.executeRuleTest(mml, 'square root', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-sqrt-nested.
 */
sre.SummaryEnglishTest.prototype.testAbstrSqrtNested = function() {
  var mml = '<msqrt><mn>2</mn><msqrt><mn>2</mn></msqrt></msqrt>';
  this.executeRuleTest(mml, 'nested square root', 'default');
  this.executeRuleTest(mml, 'nested square root', 'brief');
  this.executeRuleTest(mml, 'nested square root', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-squarematrix.
 */
sre.SummaryEnglishTest.prototype.testAbstrSquarematrix = function() {
  var mml = '<mfenced open="[" close="]"><mtable>' +
      '<mtr><mtd><mi>a</mi></mtd><mtd><mi>b</mi></mtd></mtr>' +
      '<mtr><mtd><mi>c</mi></mtd><mtd><mi>d</mi></mtd></mtr>' +
      '</mtable></mfenced>';
  this.executeRuleTest(mml, '2 dimensional square matrix', 'default');
  this.executeRuleTest(mml, 'square matrix', 'brief');
  this.executeRuleTest(mml, 'square matrix', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-subscript.
 */
sre.SummaryEnglishTest.prototype.testAbstrSubscript = function() {
  var mml = '<msub><mi>a</mi><mi>b</mi></msub>';
  this.executeRuleTest(mml, 'subscript', 'default');
  this.executeRuleTest(mml, 'subscript', 'brief');
  this.executeRuleTest(mml, 'subscript', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-subsup.
 */
sre.SummaryEnglishTest.prototype.testAbstrSubsup = function() {
  var mml = '<msubsup><mi>a</mi><mi>c</mi><mi>b</mi></msubsup>';
  this.executeRuleTest(mml, 'power with subscript', 'default');
  this.executeRuleTest(mml, 'power with subscript', 'brief');
  this.executeRuleTest(mml, 'power with subscript', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-superscript.
 */
sre.SummaryEnglishTest.prototype.testAbstrSuperscript = function() {
  var mml = '<msup><mi>a</mi><mi>b</mi></msup>';
  this.executeRuleTest(mml, 'power', 'default');
  this.executeRuleTest(mml, 'power', 'brief');
  this.executeRuleTest(mml, 'power', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-table.
 */
sre.SummaryEnglishTest.prototype.testAbstrTable = function() {
  var mml = '<mtable><mtr><mtd><mi>a</mi></mtd><mtd><mi>b</mi></mtd></mtr>' +
      '<mtr><mtd><mi>c</mi></mtd><mtd><mi>d</mi></mtd></mtr></mtable>';
  this.executeRuleTest(mml, 'table with 2 rows and 2 columns', 'default');
  this.executeRuleTest(mml, 'table with 2 rows and 2 columns', 'brief');
  this.executeRuleTest(mml, 'table with 2 rows and 2 columns', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-text.
 */
sre.SummaryEnglishTest.prototype.testAbstrText = function() {
  var mml = '<mtext>a b c</mtext>';
  this.executeRuleTest(mml, 'text', 'default');
  this.executeRuleTest(mml, 'text', 'brief');
  this.executeRuleTest(mml, 'text', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-var-addition.
 */
sre.SummaryEnglishTest.prototype.testAbstrVarAddition = function() {
  var mml = '<mi>a</mi><mo>+</mo><mi>&#x2026;</mi><mo>+</mo><mi>b</mi>';
  this.executeRuleTest(mml, 'sum with variable number of summands', 'default');
  this.executeRuleTest(mml, 'sum', 'brief');
  this.executeRuleTest(mml, 'sum', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-var-cases.
 */
sre.SummaryEnglishTest.prototype.testAbstrVarCases = function() {
  var mml = '<mo>{</mo><mtable><mtr><mtd><mi>a</mi></mtd></mtr><mtr><mtd>' +
      '<mo>&#x2026;</mo></mtd></mtr><mtr><mtd><mi>b</mi></mtd></mtr></mtable>';
  this.executeRuleTest(
      mml, 'case statement with variable number of cases', 'default');
  this.executeRuleTest(mml, 'case statement', 'brief');
  this.executeRuleTest(mml, 'case statement', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-var-determinant.
 */
sre.SummaryEnglishTest.prototype.testAbstrVarDeterminant = function() {
  var mml = '<mo>|</mo><mtable><mtr><mtd><mi>a</mi></mtd><mtd><mi>b</mi>' +
      '</mtd><mtd><mi>e</mi></mtd></mtr><mtr><mtd />' +
      '<mtd><mo>&#x22EF;</mo></mtd><mtd /></mtr><mtr><mtd><mi>c</mi></mtd>' +
      '<mtd><mi>d</mi></mtd><mtd><mi>f</mi></mtd></mtr></mtable><mo>|</mo>';
  this.executeRuleTest(mml, 'n dimensional determinant', 'default');
  this.executeRuleTest(mml, 'determinant', 'brief');
  this.executeRuleTest(mml, 'determinant', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-var-matrix.
 */
sre.SummaryEnglishTest.prototype.testAbstrVarMatrix = function() {
  var mml = '<mo>(</mo><mtable><mtr><mtd><mi>a</mi></mtd><mtd><mi>b</mi>' +
      '</mtd><mtd><mi>e</mi></mtd></mtr><mtr><mtd />' +
      '<mtd><mo>&#x22EF;</mo></mtd><mtd /></mtr><mtr><mtd><mi>c</mi></mtd>' +
      '<mtd><mi>d</mi></mtd><mtd><mi>f</mi></mtd></mtr></mtable><mo>)</mo>';
  this.executeRuleTest(mml, 'n by m dimensional matrix', 'default');
  this.executeRuleTest(mml, 'square matrix', 'brief');
  this.executeRuleTest(mml, 'square matrix', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-var-multiplication.
 */
sre.SummaryEnglishTest.prototype.testAbstrVarMultiplication = function() {
  var mml = '<mi>a</mi><mo>*</mo><mo>&#x2026;</mo><mo>*</mo><mi>b</mi>';
  this.executeRuleTest(
      mml, 'product with variable number of factors', 'default');
  this.executeRuleTest(mml, 'product', 'brief');
  this.executeRuleTest(mml, 'product', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-var-multirel.
 */
sre.SummaryEnglishTest.prototype.testAbstrVarMultirel = function() {
  var mml = '<mi>a</mi><mo>=</mo><mo>&#x2026;</mo><mo>&#x2264;</mo><mi>b</mi>';
  this.executeRuleTest(
      mml, 'relation sequence with variable number of elements', 'default');
  this.executeRuleTest(mml, 'relation sequence', 'brief');
  this.executeRuleTest(mml, 'relation sequence', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-var-punctuated.
 */
sre.SummaryEnglishTest.prototype.testAbstrVarPunctuated = function() {
  var mml = '<mi>a</mi><mo>,</mo><mo>&#x2026;</mo><mo>,</mo><mi>b</mi>';
  this.executeRuleTest(
      mml, 'comma separated list of variable length', 'default');
  this.executeRuleTest(mml, 'comma separated list', 'brief');
  this.executeRuleTest(mml, 'comma separated list', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-var-relation.
 */
sre.SummaryEnglishTest.prototype.testAbstrVarRelation = function() {
  var mml = '<mi>a</mi><mo>=</mo><mo>&#x2026;</mo><mo>=</mo><mi>b</mi>';
  this.executeRuleTest(
      mml, 'equality sequence with variable number of elements', 'default');
  this.executeRuleTest(mml, 'equality sequence', 'brief');
  this.executeRuleTest(mml, 'equality sequence', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-var-vector.
 */
sre.SummaryEnglishTest.prototype.testAbstrVarVector = function() {
  var mml = '<mfenced open="[" close="]"><mtable>' +
      '<mtr><mtd><mi>a</mi></mtd></mtr>' +
      '<mtr><mtd><mo>&#x22EE;</mo></mtd></mtr>' +
      '<mtr><mtd><mi>c</mi></mtd></mtr>' +
      '<mtr><mtd><mi>d</mi></mtd></mtr>' +
      '</mtable></mfenced>';
  this.executeRuleTest(mml, 'n dimensional vector', 'default');
  this.executeRuleTest(mml, 'vector', 'brief');
  this.executeRuleTest(mml, 'vector', 'sbrief');
};


/**
 * Testing Summary Rule for abstr-vector.
 */
sre.SummaryEnglishTest.prototype.testAbstrVector = function() {
  var mml = '<mfenced open="[" close="]"><mtable>' +
      '<mtr><mtd><mi>a</mi></mtd></mtr>' +
      '<mtr><mtd><mi>c</mi></mtd></mtr>' +
      '<mtr><mtd><mi>e</mi></mtd></mtr>' +
      '</mtable></mfenced>';
  this.executeRuleTest(mml, '3 dimensional vector', 'default');
  this.executeRuleTest(mml, 'vector', 'brief');
  this.executeRuleTest(mml, 'vector', 'sbrief');
};

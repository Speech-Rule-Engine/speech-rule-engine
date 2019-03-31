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

goog.provide('sre.CollapseEnglishTest');

goog.require('sre.CollapseRuleTest');



/**
 * @constructor
 * @extends {sre.CollapseRuleTest}
 */
sre.CollapseEnglishTest = function() {
  sre.CollapseEnglishTest.base(this, 'constructor');

  /**
   * @override
   */
  this.information = 'Collapse English tests.';

  this.domain = 'mathspeak';

  /**
   * @override
   */
  this.semantics = true;

    
  this.setActive('CollapseEnglish');
};
goog.inherits(sre.CollapseEnglishTest, sre.CollapseRuleTest);


/**
 * Testing Collapse Rule for abstr-addition.
 */
sre.CollapseEnglishTest.prototype.testCollapsedAddition = function() {
  var mml = '<mi>a</mi><mo>+</mo><mi>b</mi>';
  this.executeRuleTest(mml, 'collapsed sum with 2 summands', 'default');
  this.executeRuleTest(mml, 'collapsed sum', 'brief');
  this.executeRuleTest(mml, 'collapsed sum', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-bigop.
 */
sre.CollapseEnglishTest.prototype.testCollapsedBigop = function() {
  var mml = '<mo>&#x2211;</mo><mi>x</mi>';
  this.executeRuleTest(mml, 'collapsed sigma-summation', 'default');
  this.executeRuleTest(mml, 'collapsed sigma-summation', 'brief');
  this.executeRuleTest(mml, 'collapsed sigma-summation', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-binomial.
 */
sre.CollapseEnglishTest.prototype.testCollapsedBinomial = function() {
  var mml = '<mfenced open="(" close=")"><mtable><mtr><mtd><mi>x</mi></mtd>' +
      '</mtr><mtr><mtd><mi>y</mi></mtd></mtr></mtable></mfenced>';
  this.executeRuleTest(mml, 'collapsed binomial', 'default');
  this.executeRuleTest(mml, 'collapsed binomial', 'brief');
  this.executeRuleTest(mml, 'collapsed binomial', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-cases.
 */
sre.CollapseEnglishTest.prototype.testCollapsedCases = function() {
  var mml = '<mfenced separators="" open="{" close=""><mtable>'
      + '<mtr><mtd><mi>y</mi></mtd><mtd><mn>0</mn></mtd></mtr>' +
      '<mtr><mtd><mi>y</mi></mtd><mtd><mn>2</mn></mtd></mtr>' +
      '</mtable></mfenced>';
  this.executeRuleTest(mml, 'collapsed case statement with 2 cases', 'default');
  this.executeRuleTest(mml, 'collapsed case statement', 'brief');
  this.executeRuleTest(mml, 'collapsed case statement', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-continued-fraction.
 */
sre.CollapseEnglishTest.prototype.testCollapsedContinuedFraction = function() {
  var mml = '<mfrac><msub>' +
      '<mi>b</mi><mn>1</mn></msub><mrow><msub><mi>a</mi><mn>1</mn></msub>' +
      '<mo>+</mo><mfrac><msub><mi>b</mi><mn>2</mn></msub><mrow><msub>' +
      '<mi>a</mi><mn>2</mn></msub><mo>+</mo><mfrac><msub><mi>b</mi>' +
      '<mn>3</mn></msub><mrow><msub><mi>a</mi><mn>3</mn></msub><mo>+</mo>' +
      '<mo>&#x2026;</mo></mrow></mfrac></mrow></mfrac></mrow></mfrac>';
  this.executeRuleTest(mml, 'collapsed continued fraction', 'default');
  this.executeRuleTest(mml, 'collapsed continued frac', 'brief');
  this.executeRuleTest(mml, 'collapsed continued frac', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-determinant.
 */
sre.CollapseEnglishTest.prototype.testCollapsedDeterminant = function() {
  var mml = '<mfenced open="|" close="|"><mtable>' +
      '<mtr><mtd><mi>a</mi></mtd><mtd><mi>b</mi></mtd></mtr>' +
      '<mtr><mtd><mi>c</mi></mtd><mtd><mi>d</mi></mtd></mtr>' +
      '</mtable></mfenced>';
  this.executeRuleTest(mml, 'collapsed 2 dimensional determinant', 'default');
  this.executeRuleTest(mml, 'collapsed determinant', 'brief');
  this.executeRuleTest(mml, 'collapsed determinant', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-fraction.
 */
sre.CollapseEnglishTest.prototype.testCollapsedFraction = function() {
  var mml = '<mfrac><mn>1</mn><mi>x</mi></mfrac>';
  this.executeRuleTest(mml, 'collapsed fraction', 'default');
  this.executeRuleTest(mml, 'collapsed frac', 'brief');
  this.executeRuleTest(mml, 'collapsed frac', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-function.
 */
sre.CollapseEnglishTest.prototype.testCollapsedFunction = function() {
  // var mml = '<mi>sin</mi><mi>x</mi>';
  var mml = '<mi>sin</mi>';
  this.executeRuleTest(mml, 'collapsed functional expression', 'default');
  this.executeRuleTest(mml, 'collapsed function', 'brief');
  this.executeRuleTest(mml, 'collapsed function', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-identifier.
 */
sre.CollapseEnglishTest.prototype.testCollapsedIdentifier = function() {
  var mml = '<mi>a</mi>';
  this.executeRuleTest(mml, 'collapsed long identifier', 'default');
  this.executeRuleTest(mml, 'collapsed long identifier', 'brief');
  this.executeRuleTest(mml, 'collapsed long identifier', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-infixop.
 */
sre.CollapseEnglishTest.prototype.testCollapsedInfixop = function() {
  var mml = '<mi>a</mi><mo>/</mo><mi>b</mi>';
  this.executeRuleTest(mml, 'collapsed division with 2 elements', 'default');
  this.executeRuleTest(mml, 'collapsed division', 'brief');
  this.executeRuleTest(mml, 'collapsed division', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-integral.
 */
sre.CollapseEnglishTest.prototype.testCollapsedIntegral = function() {
  var mml = '<mo>∮</mo><mi>E</mi><mo>·</mo><mi>d</mi>' +
      '<mi mathvariant="bold">l</mi>';
  this.executeRuleTest(mml, 'collapsed integral', 'default');
  this.executeRuleTest(mml, 'collapsed integral', 'brief');
  this.executeRuleTest(mml, 'collapsed integral', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-lim.
 */
sre.CollapseEnglishTest.prototype.testCollapsedLim = function() {
  var mml = '<mi>lim</mi>';
  this.executeRuleTest(mml, 'collapsed limit function', 'default');
  this.executeRuleTest(mml, 'collapsed lim', 'brief');
  this.executeRuleTest(mml, 'collapsed lim', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-matrix.
 */
sre.CollapseEnglishTest.prototype.testCollapsedMatrix = function() {
  var mml = '<mfenced open="[" close="]"><mtable>' +
      '<mtr><mtd><mi>a</mi></mtd><mtd><mi>b</mi></mtd></mtr>' +
      '<mtr><mtd><mi>c</mi></mtd><mtd><mi>d</mi></mtd></mtr>' +
      '<mtr><mtd><mi>e</mi></mtd><mtd><mi>f</mi></mtd></mtr>' +
      '</mtable></mfenced>';
  this.executeRuleTest(mml, 'collapsed 3 by 2 matrix', 'default');
  this.executeRuleTest(mml, 'collapsed matrix', 'brief');
  this.executeRuleTest(mml, 'collapsed matrix', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-mixed-number.
 */
sre.CollapseEnglishTest.prototype.testCollapsedMixedNumber = function() {
  var mml = '<mn>1</mn><mfrac><mn>2</mn><mn>3</mn></mfrac>';
  this.executeRuleTest(mml, 'collapsed long mixed number', 'default');
  this.executeRuleTest(mml, 'collapsed long mixed number', 'brief');
  this.executeRuleTest(mml, 'collapsed long mixed number', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-multiplication.
 */
sre.CollapseEnglishTest.prototype.testCollapsedMultiplication = function() {
  var mml = '<mi>a</mi><mo>*</mo><mi>b</mi>';
  this.executeRuleTest(mml, 'collapsed product with 2 factors', 'default');
  this.executeRuleTest(mml, 'collapsed product', 'brief');
  this.executeRuleTest(mml, 'collapsed product', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-multirel.
 */
sre.CollapseEnglishTest.prototype.testCollapsedMultirel = function() {
  var mml = '<mi>a</mi><mo>=</mo><mi>b</mi><mo>&#x2264;</mo><mi>b</mi>';
  this.executeRuleTest(mml, 'collapsed relation sequence with 3 elements', 'default');
  this.executeRuleTest(mml, 'collapsed relation sequence', 'brief');
  this.executeRuleTest(mml, 'collapsed relation sequence', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-number.
 */
sre.CollapseEnglishTest.prototype.testCollapsedNumber = function() {
  var mml = '<mn>123456</mn>';
  this.executeRuleTest(mml, 'collapsed long number', 'default');
  this.executeRuleTest(mml, 'collapsed long number', 'brief');
  this.executeRuleTest(mml, 'collapsed long number', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-punctuated.
 */
sre.CollapseEnglishTest.prototype.testCollapsedPunctuated = function() {
  var mml = '<mi>a</mi><mo>,</mo><mi>b</mi><mo>,</mo><mi>c</mi>';
  this.executeRuleTest(mml, 'collapsed comma separated list of length 3', 'default');
  this.executeRuleTest(mml, 'collapsed comma separated list', 'brief');
  this.executeRuleTest(mml, 'collapsed comma separated list', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-relation.
 */
sre.CollapseEnglishTest.prototype.testCollapsedRelation = function() {
  var mml = '<mi>a</mi><mo>=</mo><mi>b</mi>';
  this.executeRuleTest(mml, 'collapsed equality', 'default');
  this.executeRuleTest(mml, 'collapsed equality', 'brief');
  this.executeRuleTest(mml, 'collapsed equality', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-relation-seq.
 */
sre.CollapseEnglishTest.prototype.testCollapsedRelationSeq = function() {
  var mml = '<mi>a</mi><mo>=</mo><mi>b</mi><mo>=</mo><mi>b</mi>';
  this.executeRuleTest(mml, 'collapsed equality sequence with 3 elements', 'default');
  this.executeRuleTest(mml, 'collapsed equality sequence', 'brief');
  this.executeRuleTest(mml, 'collapsed equality sequence', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-root.
 */
sre.CollapseEnglishTest.prototype.testCollapsedRoot = function() {
  var mml = '<mroot><mi>x</mi><mn>3</mn></mroot>';
  this.executeRuleTest(mml, 'collapsed root of index 3', 'default');
  this.executeRuleTest(mml, 'collapsed root', 'brief');
  this.executeRuleTest(mml, 'collapsed root', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-root-nested.
 */
sre.CollapseEnglishTest.prototype.testCollapsedRootNested = function() {
  var mml = '<mroot><mrow><mroot><mi>x</mi><mn>4</mn></mroot>' +
      '<mo>+</mo><mi>x</mi></mrow><mn>3</mn></mroot>';
  this.executeRuleTest(mml, 'collapsed nested root of index 3', 'default');
  this.executeRuleTest(mml, 'collapsed nested root', 'brief');
  this.executeRuleTest(mml, 'collapsed nested root', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-rowvector.
 */
sre.CollapseEnglishTest.prototype.testCollapsedRowvector = function() {
  var mml = '<mfenced open="[" close="]"><mtable>' +
      '<mtr><mtd><mi>a</mi></mtd><mtd><mi>b</mi></mtd></mtr>' +
      '</mtable></mfenced>';
  this.executeRuleTest(mml, 'collapsed 2 dimensional row vector', 'default');
  this.executeRuleTest(mml, 'collapsed row vector', 'brief');
  this.executeRuleTest(mml, 'collapsed row vector', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-sqrt.
 */
sre.CollapseEnglishTest.prototype.testCollapsedSqrt = function() {
  var mml = '<msqrt><mn>2</mn></msqrt>';
  this.executeRuleTest(mml, 'collapsed square root', 'default');
  this.executeRuleTest(mml, 'collapsed square root', 'brief');
  this.executeRuleTest(mml, 'collapsed square root', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-sqrt-nested.
 */
sre.CollapseEnglishTest.prototype.testCollapsedSqrtNested = function() {
  var mml = '<msqrt><mn>2</mn><msqrt><mn>2</mn></msqrt></msqrt>';
  this.executeRuleTest(mml, 'collapsed nested square root', 'default');
  this.executeRuleTest(mml, 'collapsed nested square root', 'brief');
  this.executeRuleTest(mml, 'collapsed nested square root', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-squarematrix.
 */
sre.CollapseEnglishTest.prototype.testCollapsedSquarematrix = function() {
  var mml = '<mfenced open="[" close="]"><mtable>' +
      '<mtr><mtd><mi>a</mi></mtd><mtd><mi>b</mi></mtd></mtr>' +
      '<mtr><mtd><mi>c</mi></mtd><mtd><mi>d</mi></mtd></mtr>' +
      '</mtable></mfenced>';
  this.executeRuleTest(mml, 'collapsed 2 dimensional square matrix', 'default');
  this.executeRuleTest(mml, 'collapsed square matrix', 'brief');
  this.executeRuleTest(mml, 'collapsed square matrix', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-subscript.
 */
sre.CollapseEnglishTest.prototype.testCollapsedSubscript = function() {
  var mml = '<msub><mi>a</mi><mi>b</mi></msub>';
  this.executeRuleTest(mml, 'collapsed subscript', 'default');
  this.executeRuleTest(mml, 'collapsed subscript', 'brief');
  this.executeRuleTest(mml, 'collapsed subscript', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-subsup.
 */
sre.CollapseEnglishTest.prototype.testCollapsedSubsup = function() {
  var mml = '<msubsup><mi>a</mi><mi>c</mi><mi>b</mi></msubsup>';
  this.executeRuleTest(mml, 'collapsed power with subscript', 'default');
  this.executeRuleTest(mml, 'collapsed power with subscript', 'brief');
  this.executeRuleTest(mml, 'collapsed power with subscript', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-superscript.
 */
sre.CollapseEnglishTest.prototype.testCollapsedSuperscript = function() {
  var mml = '<msup><mi>a</mi><mi>b</mi></msup>';
  this.executeRuleTest(mml, 'collapsed power', 'default');
  this.executeRuleTest(mml, 'collapsed power', 'brief');
  this.executeRuleTest(mml, 'collapsed power', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-table.
 */
sre.CollapseEnglishTest.prototype.testCollapsedTable = function() {
  var mml = '<mtable><mtr><mtd><mi>a</mi></mtd><mtd><mi>b</mi></mtd></mtr>' +
      '<mtr><mtd><mi>c</mi></mtd><mtd><mi>d</mi></mtd></mtr></mtable>';
  this.executeRuleTest(mml, 'collapsed table with 2 rows and 2 columns', 'default');
  this.executeRuleTest(mml, 'collapsed table with 2 rows and 2 columns', 'brief');
  this.executeRuleTest(mml, 'collapsed table with 2 rows and 2 columns', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-text.
 */
sre.CollapseEnglishTest.prototype.testCollapsedText = function() {
  var mml = '<mtext>a b c</mtext>';
  this.executeRuleTest(mml, 'collapsed text', 'default');
  this.executeRuleTest(mml, 'collapsed text', 'brief');
  this.executeRuleTest(mml, 'collapsed text', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-var-addition.
 */
sre.CollapseEnglishTest.prototype.testCollapsedVarAddition = function() {
  var mml = '<mi>a</mi><mo>+</mo><mi>&#x2026;</mi><mo>+</mo><mi>b</mi>';
  this.executeRuleTest(mml, 'collapsed sum with variable number of summands',
                       'default');
  this.executeRuleTest(mml, 'collapsed sum', 'brief');
  this.executeRuleTest(mml, 'collapsed sum', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-var-cases.
 */
sre.CollapseEnglishTest.prototype.testCollapsedVarCases = function() {
  var mml = '<mo>{</mo><mtable><mtr><mtd><mi>a</mi></mtd></mtr><mtr><mtd>' +
      '<mo>&#x2026;</mo></mtd></mtr><mtr><mtd><mi>b</mi></mtd></mtr></mtable>';
  this.executeRuleTest(
      mml, 'collapsed case statement with variable number of cases', 'default');
  this.executeRuleTest(mml, 'collapsed case statement', 'brief');
  this.executeRuleTest(mml, 'collapsed case statement', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-var-determinant.
 */
sre.CollapseEnglishTest.prototype.testCollapsedVarDeterminant = function() {
  var mml = '<mo>|</mo><mtable><mtr><mtd><mi>a</mi></mtd><mtd><mi>b</mi>' +
      '</mtd><mtd><mi>e</mi></mtd></mtr><mtr><mtd />' +
      '<mtd><mo>&#x22EF;</mo></mtd><mtd /></mtr><mtr><mtd><mi>c</mi></mtd>' +
      '<mtd><mi>d</mi></mtd><mtd><mi>f</mi></mtd></mtr></mtable><mo>|</mo>';
  this.executeRuleTest(mml, 'collapsed n dimensional determinant', 'default');
  this.executeRuleTest(mml, 'collapsed determinant', 'brief');
  this.executeRuleTest(mml, 'collapsed determinant', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-var-matrix.
 */
sre.CollapseEnglishTest.prototype.testCollapsedVarMatrix = function() {
  var mml = '<mo>(</mo><mtable><mtr><mtd><mi>a</mi></mtd><mtd><mi>b</mi>' +
      '</mtd><mtd><mi>e</mi></mtd></mtr><mtr><mtd />' +
      '<mtd><mo>&#x22EF;</mo></mtd><mtd /></mtr><mtr><mtd><mi>c</mi></mtd>' +
      '<mtd><mi>d</mi></mtd><mtd><mi>f</mi></mtd></mtr></mtable><mo>)</mo>';
  this.executeRuleTest(mml, 'collapsed n by m dimensional matrix', 'default');
  this.executeRuleTest(mml, 'collapsed square matrix', 'brief');
  this.executeRuleTest(mml, 'collapsed square matrix', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-var-multiplication.
 */
sre.CollapseEnglishTest.prototype.testCollapsedVarMultiplication = function() {
  var mml = '<mi>a</mi><mo>*</mo><mo>&#x2026;</mo><mo>*</mo><mi>b</mi>';
  this.executeRuleTest(
      mml, 'collapsed product with variable number of factors', 'default');
  this.executeRuleTest(mml, 'collapsed product', 'brief');
  this.executeRuleTest(mml, 'collapsed product', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-var-multirel.
 */
sre.CollapseEnglishTest.prototype.testCollapsedVarMultirel = function() {
  var mml = '<mi>a</mi><mo>=</mo><mo>&#x2026;</mo><mo>&#x2264;</mo><mi>b</mi>';
  this.executeRuleTest(
    mml, 'collapsed relation sequence with variable number of elements',
    'default');
  this.executeRuleTest(mml, 'collapsed relation sequence', 'brief');
  this.executeRuleTest(mml, 'collapsed relation sequence', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-var-punctuated.
 */
sre.CollapseEnglishTest.prototype.testCollapsedVarPunctuated = function() {
  var mml = '<mi>a</mi><mo>,</mo><mo>&#x2026;</mo><mo>,</mo><mi>b</mi>';
  this.executeRuleTest(
      mml, 'collapsed comma separated list of variable length', 'default');
  this.executeRuleTest(mml, 'collapsed comma separated list', 'brief');
  this.executeRuleTest(mml, 'collapsed comma separated list', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-var-relation.
 */
sre.CollapseEnglishTest.prototype.testCollapsedVarRelation = function() {
  var mml = '<mi>a</mi><mo>=</mo><mo>&#x2026;</mo><mo>=</mo><mi>b</mi>';
  this.executeRuleTest(
    mml, 'collapsed equality sequence with variable number of elements',
    'default');
  this.executeRuleTest(mml, 'collapsed equality sequence', 'brief');
  this.executeRuleTest(mml, 'collapsed equality sequence', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-var-vector.
 */
sre.CollapseEnglishTest.prototype.testCollapsedVarVector = function() {
  var mml = '<mfenced open="[" close="]"><mtable>' +
      '<mtr><mtd><mi>a</mi></mtd></mtr>' +
      '<mtr><mtd><mo>&#x22EE;</mo></mtd></mtr>' +
      '<mtr><mtd><mi>c</mi></mtd></mtr>' +
      '<mtr><mtd><mi>d</mi></mtd></mtr>' +
      '</mtable></mfenced>';
  this.executeRuleTest(mml, 'collapsed n dimensional vector', 'default');
  this.executeRuleTest(mml, 'collapsed vector', 'brief');
  this.executeRuleTest(mml, 'collapsed vector', 'sbrief');
};


/**
 * Testing Collapse Rule for abstr-vector.
 */
sre.CollapseEnglishTest.prototype.testCollapsedVector = function() {
  var mml = '<mfenced open="[" close="]"><mtable>' +
      '<mtr><mtd><mi>a</mi></mtd></mtr>' +
      '<mtr><mtd><mi>c</mi></mtd></mtr>' +
      '<mtr><mtd><mi>e</mi></mtd></mtr>' +
      '</mtable></mfenced>';
  this.executeRuleTest(mml, 'collapsed 3 dimensional vector', 'default');
  this.executeRuleTest(mml, 'collapsed vector', 'brief');
  this.executeRuleTest(mml, 'collapsed vector', 'sbrief');
};

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

goog.provide('sre.AbstractionEnglishTest');

goog.require('sre.AbstractRuleTest');



/**
 * @constructor
 * @extends {sre.AbstractRuleTest}
 */
sre.AbstractionEnglishTest = function() {
  sre.AbstractionEnglishTest.base(this, 'constructor');

  /**
   * @override
   */
  this.information = 'Abstraction English tests.';

  /**
   * @override
   */
  this.domain = 'mathspeak';

  /**
   * @override
   */
  this.semantics = true;

  this.actual = true;
  
  this.setActive('AbstractionEnglish');
};
goog.inherits(sre.AbstractionEnglishTest, sre.AbstractRuleTest);


/**
 * @override
 */
sre.AbstractionEnglishTest.prototype.executeRuleTest = function(mml, expected,
                                                                opt_style) {
  var style = opt_style || this.style;
  sre.System.getInstance().setupEngine(
      {semantics: this.semantics, domain: this.domain, style: style,
       locale: this.locale});
  var mathMl = '<math xmlns="http://www.w3.org/1998/Math/MathML">' +
      mml + '</math>';
  sre.ProcessorFactory.process('walker', mathMl);
  var actual = sre.ProcessorFactory.process('move', sre.EventUtil.KeyCode['X']);
  this.compareResult(mathMl, actual, expected, style);
};


/**
 * Testing Abstraction Rule for abstr-addition.
 */
sre.AbstractionEnglishTest.prototype.testAbstrAddition = function() {
  var mml = '<mi>a</mi><mo>+</mo><mi>b</mi>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Abstraction Rule for abstr-bigop.
 */
sre.AbstractionEnglishTest.prototype.testAbstrBigop = function() {
  var mml = '<mo>&#x2211;</mo><mi>x</mi>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Abstraction Rule for abstr-binomial.
 */
sre.AbstractionEnglishTest.prototype.testAbstrBinomial = function() {
  var mml = '<mfenced open="(" close=")"><mtable><mtr><mtd><mi>x</mi></mtd>' +
      '</mtr><mtr><mtd><mi>y</mi></mtd></mtr></mtable></mfenced>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Abstraction Rule for abstr-cases.
 */
sre.AbstractionEnglishTest.prototype.testAbstrCases = function() {
  var mml = '<mrow><mi>x</mi><mo>=</mo>' +
      '<mfenced separators="" open="{" close=""><mtable><mtr><mtd><mrow>' +
      '<mi>y</mi><mo>&lt;</mo><mn>0</mn></mrow></mtd><mtd><mn>0</mn></mtd>' +
      '</mtr><mtr><mtd><mrow><mi>y</mi><mo>≥</mo><mn>0</mn></mrow></mtd>' +
      '<mtd><mrow><mn>2</mn><mi>y</mi></mrow></mtd></mtr></mtable>' +
      '</mfenced></mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


// TODO
/**
 * Testing Abstraction Rule for abstr-cell.
 */
sre.AbstractionEnglishTest.prototype.testAbstrCell = function() {
  var mml = '';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Abstraction Rule for abstr-continued-fraction.
 */
sre.AbstractionEnglishTest.prototype.testAbstrContinuedFraction = function() {
  var mml = '<mrow><msub><mi>a</mi><mn>0</mn></msub><mo>+</mo><mfrac><msub>' +
      '<mi>b</mi><mn>1</mn></msub><mrow><msub><mi>a</mi><mn>1</mn></msub>' +
      '<mo>+</mo><mfrac><msub><mi>b</mi><mn>2</mn></msub><mrow><msub>' +
      '<mi>a</mi><mn>2</mn></msub><mo>+</mo><mfrac><msub><mi>b</mi>' +
      '<mn>3</mn></msub><mrow><msub><mi>a</mi><mn>3</mn></msub><mo>+</mo>' +
      '<mo>&#x2026;</mo></mrow></mfrac></mrow></mfrac></mrow></mfrac>' +
      '<mo>=</mo><msub><mi>a</mi><mn>0</mn></msub><mo>+</mo><mfrac><msub>' +
      '<mi>b</mi><mn>1</mn></msub><msub><mi>a</mi><mn>1</mn></msub></mfrac>' +
      '<mo>+</mo><mfrac><msub><mi>b</mi><mn>2</mn></msub><msub><mi>a</mi>' +
      '<mn>2</mn></msub></mfrac><mo>+</mo><mo>&#x2026;</mo></mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Abstraction Rule for abstr-determinant.
 */
sre.AbstractionEnglishTest.prototype.testAbstrDeterminant = function() {
  var mml = '<mfenced open="|" close="|"><mtable>' +
      '<mtr><mtd><mi>a</mi></mtd><mtd><mi>b</mi></mtd></mtr>' +
      '<mtr><mtd><mi>c</mi></mtd><mtd><mi>d</mi></mtd></mtr>' +
      '</mtable></mfenced>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Abstraction Rule for abstr-fraction.
 */
sre.AbstractionEnglishTest.prototype.testAbstrFraction = function() {
  var mml = '<mfrac><mn>1</mn><mi>x</mi></mfrac>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


// TODO
/**
 * Testing Abstraction Rule for abstr-function.
 */
sre.AbstractionEnglishTest.prototype.testAbstrFunction = function() {
  var mml = '';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Abstraction Rule for abstr-identifier.
 */
sre.AbstractionEnglishTest.prototype.testAbstrIdentifier = function() {
  var mml = '<mi>a</mi>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Abstraction Rule for abstr-infixop.
 */
sre.AbstractionEnglishTest.prototype.testAbstrInfixop = function() {
  var mml = '<mi>a</mi><mo>*</mo><mi>b</mi>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Abstraction Rule for abstr-integral.
 */
sre.AbstractionEnglishTest.prototype.testAbstrIntegral = function() {
  var mml = '<mrow><mo>∮</mo><mi>E</mi><mo>·</mo><mi>d</mi>' +
      '<mi mathvariant="bold">l</mi><mo>=</mo><mo>-</mo><mfrac><mrow>' +
      '<mi>d</mi><mi>Φ</mi><mi>B</mi></mrow><mrow><mi>d</mi><mi>t</mi>' +
      '</mrow></mfrac></mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Abstraction Rule for abstr-lim.
 */
sre.AbstractionEnglishTest.prototype.testAbstrLim = function() {
  var mml = '<mi>lim</mi><mi>x</mi>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


// TODO
/**
 * Testing Abstraction Rule for abstr-line.
 */
sre.AbstractionEnglishTest.prototype.testAbstrLine = function() {
  var mml = '<mi>a</mi><mo>=</mo><mi>b</mi>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Abstraction Rule for abstr-matrix.
 */
sre.AbstractionEnglishTest.prototype.testAbstrMatrix = function() {
  var mml = '<mfenced open="[" close="]"><mtable>' +
      '<mtr><mtd><mi>a</mi></mtd><mtd><mi>b</mi></mtd></mtr>' +
      '<mtr><mtd><mi>c</mi></mtd><mtd><mi>d</mi></mtd></mtr>' +
      '<mtr><mtd><mi>e</mi></mtd><mtd><mi>f</mi></mtd></mtr>' +
      '</mtable></mfenced>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Abstraction Rule for abstr-mixed-number.
 */
sre.AbstractionEnglishTest.prototype.testAbstrMixedNumber = function() {
  var mml = '<mn>1</mn><mfrac><mn>2</mn><mn>3</mn></mfrac>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Abstraction Rule for abstr-multiplication.
 */
sre.AbstractionEnglishTest.prototype.testAbstrMultiplication = function() {
  var mml = '<mi>a</mi><mo>*</mo><mi>b</mi>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Abstraction Rule for abstr-multirel.
 */
sre.AbstractionEnglishTest.prototype.testAbstrMultirel = function() {
  var mml = '<mi>a</mi><mo>=</mo><mi>b</mi><mo>&#x2264;</mo><mi>b</mi>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Abstraction Rule for abstr-number.
 */
sre.AbstractionEnglishTest.prototype.testAbstrNumber = function() {
  var mml = '<mn>123456</mn>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Abstraction Rule for abstr-punctuated.
 */
sre.AbstractionEnglishTest.prototype.testAbstrPunctuated = function() {
  var mml = '<mi>a</mi><mo>,</mo><mi>b</mi><mo>,</mo><mi>c</mi>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Abstraction Rule for abstr-relation.
 */
sre.AbstractionEnglishTest.prototype.testAbstrRelation = function() {
  var mml = '<mi>a</mi><mo>=</mo><mi>b</mi><mo>=</mo><mi>b</mi>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Abstraction Rule for abstr-root.
 */
sre.AbstractionEnglishTest.prototype.testAbstrRoot = function() {
  var mml = '<mroot><mi>x</mi><mn>3</mn></mroot>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Abstraction Rule for abstr-root-nested.
 */
sre.AbstractionEnglishTest.prototype.testAbstrRootNested = function() {
  var mml = '<mroot><mrow><mroot><mi>x</mi><mn>4</mn></mroot>' +
      '<mo>+</mo><mi>x</mi></mrow><mn>3</mn></mroot>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


// TODO
/**
 * Testing Abstraction Rule for abstr-row.
 */
sre.AbstractionEnglishTest.prototype.testAbstrRow = function() {
  var mml = '';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Abstraction Rule for abstr-rowvector.
 */
sre.AbstractionEnglishTest.prototype.testAbstrRowvector = function() {
  var mml = '<mfenced open="[" close="]"><mtable>' +
      '<mtr><mtd><mi>a</mi></mtd><mtd><mi>b</mi></mtd></mtr>' +
      '</mtable></mfenced>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Abstraction Rule for abstr-sqrt.
 */
sre.AbstractionEnglishTest.prototype.testAbstrSqrt = function() {
  var mml = '<msqrt><mn>2</mn></msqrt>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Abstraction Rule for abstr-sqrt-nested.
 */
sre.AbstractionEnglishTest.prototype.testAbstrSqrtNested = function() {
  var mml = '<msqrt><mn>2</mn><msqrt><mn>2</mn></msqrt></msqrt>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Abstraction Rule for abstr-squarematrix.
 */
sre.AbstractionEnglishTest.prototype.testAbstrSquarematrix = function() {
  var mml = '<mfenced open="[" close="]"><mtable>' +
      '<mtr><mtd><mi>a</mi></mtd><mtd><mi>b</mi></mtd></mtr>' +
      '<mtr><mtd><mi>c</mi></mtd><mtd><mi>d</mi></mtd></mtr>' +
      '</mtable></mfenced>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Abstraction Rule for abstr-subscript.
 */
sre.AbstractionEnglishTest.prototype.testAbstrSubscript = function() {
  var mml = '<msub><mi>a</mi><mi>b</mi></msub>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Abstraction Rule for abstr-subsup.
 */
sre.AbstractionEnglishTest.prototype.testAbstrSubsup = function() {
  var mml = '<msubsup><mi>a</mi><mi>c</mi><mi>b</mi></msubsup>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Abstraction Rule for abstr-superscript.
 */
sre.AbstractionEnglishTest.prototype.testAbstrSuperscript = function() {
  var mml = '<msup><mi>a</mi><mi>b</mi></msup>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Abstraction Rule for abstr-table.
 */
sre.AbstractionEnglishTest.prototype.testAbstrTable = function() {
  var mml = '<mtable><mtr><mtd><mi>a</mi></mtd><mtd><mi>b</mi></mtd></mtr>' +
      '<mtr><mtd><mi>c</mi></mtd><mtd><mi>d</mi></mtd></mtr></mtable>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Abstraction Rule for abstr-text.
 */
sre.AbstractionEnglishTest.prototype.testAbstrText = function() {
  var mml = '<mtext>a b c</mtext>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Abstraction Rule for abstr-var-addition.
 */
sre.AbstractionEnglishTest.prototype.testAbstrVarAddition = function() {
  var mml = '<mi>a</mi><mo>+</mo><mi>&#x2026;</mi><mo>+</mo><mi>b</mi>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Abstraction Rule for abstr-var-cases.
 */
sre.AbstractionEnglishTest.prototype.testAbstrVarCases = function() {
  var mml = '';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Abstraction Rule for abstr-var-determinant.
 */
sre.AbstractionEnglishTest.prototype.testAbstrVarDeterminant = function() {
  var mml = '<mo>|</mo><mtable><mtr><mtd><mi>a</mi></mtd><mtd><mi>b</mi>' +
      '</mtd><mtd><mi>e</mi></mtd></mtr><mtr><mtd />' +
      '<mtd><mo>&#x22EF;</mo></mtd><mtd /></mtr><mtr><mtd><mi>c</mi></mtd>' +
      '<mtd><mi>d</mi></mtd><mtd><mi>f</mi></mtd></mtr></mtable><mo>|</mo>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Abstraction Rule for abstr-var-matrix.
 */
sre.AbstractionEnglishTest.prototype.testAbstrVarMatrix = function() {
  var mml = '<mo>(</mo><mtable><mtr><mtd><mi>a</mi></mtd><mtd><mi>b</mi>' +
      '</mtd><mtd><mi>e</mi></mtd></mtr><mtr><mtd />' +
      '<mtd><mo>&#x22EF;</mo></mtd><mtd /></mtr><mtr><mtd><mi>c</mi></mtd>' +
      '<mtd><mi>d</mi></mtd><mtd><mi>f</mi></mtd></mtr></mtable><mo>)</mo>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Abstraction Rule for abstr-var-multiplication.
 */
sre.AbstractionEnglishTest.prototype.testAbstrVarMultiplication = function() {
  var mml = '<mi>a</mi><mo>*</mo><mo>&#x2026;</mo><mo>*</mo><mi>b</mi>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Abstraction Rule for abstr-var-multirel.
 */
sre.AbstractionEnglishTest.prototype.testAbstrVarMultirel = function() {
  var mml = '<mi>a</mi><mo>=</mo><mo>&#x2026;</mo><mo>&#x2264;</mo><mi>b</mi>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Abstraction Rule for abstr-var-punctuated.
 */
sre.AbstractionEnglishTest.prototype.testAbstrVarPunctuated = function() {
  var mml = '<mi>a</mi><mo>,</mo><mo>&#x2026;</mo><mo>,</mo><mi>b</mi>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Abstraction Rule for abstr-var-relation.
 */
sre.AbstractionEnglishTest.prototype.testAbstrVarRelation = function() {
  var mml = '<mi>a</mi><mo>=</mo><mo>&#x2026;</mo><mo>=</mo><mi>b</mi>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Abstraction Rule for abstr-var-vector.
 */
sre.AbstractionEnglishTest.prototype.testAbstrVarVector = function() {
  var mml = '<mfenced open="[" close="]"><mtable>' +
      '<mtr><mtd><mi>a</mi></mtd></mtr>' +
      '<mtr><mtd><mo>&#x22EE;</mo></mtd></mtr>' +
      '<mtr><mtd><mi>c</mi></mtd></mtr>' +
      '<mtr><mtd><mi>d</mi></mtd></mtr>' +
      '</mtable></mfenced>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Abstraction Rule for abstr-vector.
 */
sre.AbstractionEnglishTest.prototype.testAbstrVector = function() {
  var mml = '<mfenced open="[" close="]"><mtable>' +
      '<mtr><mtd><mi>a</mi></mtd></mtr>' +
      '<mtr><mtd><mi>c</mi></mtd></mtr>' +
      '<mtr><mtd><mi>e</mi></mtd></mtr>' +
      '</mtable></mfenced>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};

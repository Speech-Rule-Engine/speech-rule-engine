// Copyright 2014 Volker Sorge
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
 * @fileoverview Testcases resulting from Mathml Cloud project.
 * @author Volker.Sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.MathmlCloudTest');

goog.require('sre.AbstractRuleTest');



/**
 * @constructor
 * @extends {sre.AbstractRuleTest}
 */
sre.MathmlCloudTest = function() {
  goog.base(this);

  /**
   * @override
   */
  this.information = 'Mathml Cloud tests.';

  /**
   * @override
   */
  this.domain = 'mathspeak';

  /**
   * @override
   */
  this.semantics = true;
};
goog.inherits(sre.MathmlCloudTest, sre.AbstractRuleTest);


/**
 * Testing Parenthesis with Superscript.
 * Simplified test case for expression 95.
 */
sre.MathmlCloudTest.prototype.testParenSuper = function() {
  var mml = '<mo>(</mo><mi>a</mi><msup><mo>)</mo><mn>2</mn></msup>';
  this.executeRuleTest(mml, 'left-parenthesis a right-parenthesis squared',
                       'default');
  this.executeRuleTest(mml, 'left-p\'ren a right-p\'ren squared', 'brief');
  this.executeRuleTest(mml, 'L p\'ren a R p\'ren squared', 'sbrief');
};


/**
 * Testing Parenthesis with convoluted operator.
 * Simplified test case for expression 98.
 */
sre.MathmlCloudTest.prototype.testParenConvoluted = function() {
  var mml = '<mo>(</mo><mo>-</mo><msup><mi>x</mi><mn>2</mn></msup>' +
          '<mo>/2)</mo>';
  this.executeRuleTest(mml, 'left-parenthesis minus x squared slash' +
                       ' 2 right-parenthesis', 'default');
  this.executeRuleTest(mml, 'left-p\'ren minus x squared slash 2 right-p\'ren',
                       'brief');
  this.executeRuleTest(mml, 'L p\'ren minus x squared slash 2 R p\'ren',
                       'sbrief');
};


/**
 * Testing Superscript Baseline expression in relation-sequence
 * Simplified test case for expression 62.
 */
sre.MathmlCloudTest.prototype.testSupBaseRelseq = function() {
  var mml = '<mrow><msub><mrow><mi>c</mi></mrow><mrow><mn>1</mn></mrow>' +
      '</msub><msup><mrow><mi>h</mi></mrow><mrow><mn>4</mn><mo>-</mo>' +
      '<mn>2</mn><mi>s</mi></mrow></msup><mo>&#x2264;</mo><mfrac>' +
      '<mrow><mn>1</mn></mrow><mrow><mn>2</mn><mi>T</mi></mrow></mfrac>' +
      '<mo>&#x2264;</mo><msub><mrow><mi>c</mi></mrow><mrow><mn>2</mn>' +
      '</mrow></msub><msup><mrow><mi>h</mi></mrow><mrow><mn>4</mn>' +
      '<mo>-</mo><mn>2</mn><mi>s</mi></mrow></msup></mrow>';
  this.executeRuleTest(mml, 'c 1 h Superscript 4 minus 2 s Baseline' +
                       ' less-than-or-equal-to StartFraction 1 Over 2' +
                       ' upper T EndFraction less-than-or-equal-to c 2 h' +
                       ' Superscript 4 minus 2 s', 'default');
  this.executeRuleTest(mml, 'c 1 h Sup 4 minus 2 s Base' +
                       ' less-than-or-equal-to StartFrac 1 Over 2 upper T' +
                       ' EndFrac less-than-or-equal-to c 2 h Sup 4 minus 2 s',
                       'brief');
  this.executeRuleTest(mml, 'c 1 h Sup 4 minus 2 s Base less-than-or-equal-to' +
                       ' Frac 1 Over 2 upper T EndFrac less-than-or-equal-to' +
                       ' c 2 h Sup 4 minus 2 s', 'sbrief');
};


/**
 * Testing Superscript Baseline expression in multi-relation.
 * Simplified test case similar to expression 62.
 */
sre.MathmlCloudTest.prototype.testSupBaseMultirel = function() {
  var mml = '<mrow><msub><mrow><mi>c</mi></mrow><mrow><mn>1</mn></mrow>' +
      '</msub><msup><mrow><mi>h</mi></mrow><mrow><mn>4</mn><mo>-</mo>' +
      '<mn>2</mn><mi>s</mi></mrow></msup><mo>&#x2264;</mo><mfrac><mrow>' +
      '<mn>1</mn></mrow><mrow><mn>2</mn><mi>T</mi></mrow></mfrac><mo>=</mo>' +
      '<msub><mrow><mi>c</mi></mrow><mrow><mn>2</mn></mrow></msub><msup>' +
      '<mrow><mi>h</mi></mrow><mrow><mn>4</mn><mo>-</mo><mn>2</mn>' +
      '<mi>s</mi></mrow></msup></mrow>';
  this.executeRuleTest(mml, 'c 1 h Superscript 4 minus 2 s Baseline' +
                       ' less-than-or-equal-to StartFraction 1 Over 2 upper T' +
                       ' EndFraction equals c 2 h Superscript 4 minus 2 s',
                       'default');
  this.executeRuleTest(mml, 'c 1 h Sup 4 minus 2 s Base less-than-or-equal-to' +
                       ' StartFrac 1 Over 2 upper T EndFrac equals c 2 h Sup' +
                       ' 4 minus 2 s', 'brief');
  this.executeRuleTest(mml, 'c 1 h Sup 4 minus 2 s Base' +
                       ' less-than-or-equal-to Frac 1 Over 2 upper T EndFrac' +
                       ' equals c 2 h Sup 4 minus 2 s', 'sbrief');

};


/**
 * Testing Subscript Baseline expression in relation-sequence
 * Simplified test case for expressions similar to 62.
 */
sre.MathmlCloudTest.prototype.testSubBaseRelseq = function() {
  var mml = '<msub><mi>h</mi><mi>s</mi></msub><mo>&#x2264;</mo>' +
      '<mfrac><mn>1</mn><mrow><mn>2</mn><mi>T</mi></mrow></mfrac>' +
      '<mo>&#x2264;</mo><msub><mi>h</mi><mi>s</mi></msub>';
  this.executeRuleTest(mml, 'h Subscript s Baseline less-than-or-equal-to' +
                       ' StartFraction 1 Over 2 upper T EndFraction' +
                       ' less-than-or-equal-to h Subscript s', 'default');
  this.executeRuleTest(mml, 'h Sub s Base less-than-or-equal-to StartFrac' +
                       ' 1 Over 2 upper T EndFrac less-than-or-equal-to h' +
                       ' Sub s', 'brief');
  this.executeRuleTest(mml, 'h Sub s Base less-than-or-equal-to Frac 1 Over' +
                       ' 2 upper T EndFrac less-than-or-equal-to h Sub s',
                       'sbrief');
};



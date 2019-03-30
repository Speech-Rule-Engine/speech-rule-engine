// Copyright (c) 2016 Volker Sorge
// Copyright (c) 2016 The MathJax Consortium
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
 * @fileoverview Testcases for prefix speech generation in MathML enrichment.
 *
 * @author v.sorge@mathjax.org (Volker Sorge)
 */

goog.provide('sre.PrefixEnglishTest');

goog.require('sre.AbstractRuleTest');
goog.require('sre.AuralRendering');
goog.require('sre.DynamicCstr');
goog.require('sre.Semantic');
goog.require('sre.SpeechGeneratorUtil');



/**
 * @constructor
 * @extends {sre.AbstractRuleTest}
 */
sre.PrefixEnglishTest = function() {
  sre.PrefixEnglishTest.base(this, 'constructor');

  /**
   * @override
   */
  this.information = 'Prefix rule tests.';

  /**
   * @override
   */
  this.modality = 'prefix';

  /**
   * @type {number}
   */
  this.id = 0;
  this.subExpr = null;

  this.setActive('PrefixEnglish');
};
goog.inherits(sre.PrefixEnglishTest, sre.AbstractRuleTest);


/**
 * Executes the prefix rule tests.
 * @param {string} expr The semantic tree as an XML string.
 * @param {number} id The id of the node to be considered.
 * @param {string} result The expected result.
 */
sre.PrefixEnglishTest.prototype.executeTest = function(expr, id, result) {
  this.id = id;
  this.executeRuleTest(expr, result);
};


/**
 * @override
 */
sre.PrefixEnglishTest.prototype.getSpeech = function(mml) {
  var stree = sre.Semantic.getTreeFromString(mml);
  var node = stree.root.querySelectorAll(x => x.id === this.id)[0];
  this.subExpr = node.mathmlTree;
  if (!node) {
    this.assert.fail();
    return '';
  }
  return sre.SpeechGeneratorUtil.retrievePrefix(node);
};


/**
 * @override
 */
sre.PrefixEnglishTest.prototype.appendRuleExample = function(
    input, output, style, rest) {
  var sub = this.subExpr ? '<math>' + this.subExpr.toString() + '</math>' : '';
  sre.PrefixEnglishTest.base(
    this, 'appendRuleExample', input, output, style, [sub]);
};


/**
 * Testing sub/superscripts.
 */
sre.PrefixEnglishTest.prototype.testSubSuper = function() {
  var subscript = '<msub><mi>a</mi><mi>b</mi></msub>';
  this.executeTest(subscript, 0, 'Base');
  this.executeTest(subscript, 1, 'Subscript');
  this.executeTest(subscript, 2, '');
  var superscript = '<msup><mi>a</mi><mi>b</mi></msup>';
  this.executeTest(superscript, 0, 'Base');
  this.executeTest(superscript, 1, 'Exponent');
  this.executeTest(superscript, 2, '');
};


/**
 * Testing over/underscripts.
 */
sre.PrefixEnglishTest.prototype.testOverUnder = function() {
  var overscore = '<mover><mi>a</mi><mi>b</mi></mover>';
  this.executeTest(overscore, 0, 'Base');
  this.executeTest(overscore, 1, 'Overscript');
  this.executeTest(overscore, 2, '');
  var underscore = '<munder><mi>a</mi><mi>b</mi></munder>';
  this.executeTest(underscore, 0, 'Base');
  this.executeTest(underscore, 1, 'Underscript');
  this.executeTest(underscore, 2, '');
};


/**
 * Testing fractions.
 */
sre.PrefixEnglishTest.prototype.testFractions = function() {
  var fraction = '<mfrac><mi>a</mi><mi>b</mi></mfrac>';
  this.executeTest(fraction, 0, 'Numerator');
  this.executeTest(fraction, 1, 'Denominator');
  this.executeTest(fraction, 2, '');
};


/**
 * Testing roots.
 */
sre.PrefixEnglishTest.prototype.testRoots = function() {
  var sqrt = '<msqrt><mi>a</mi></msqrt>';
  this.executeTest(sqrt, 0, 'Radicand');
  this.executeTest(sqrt, 1, '');
  var root = '<mroot><mi>a</mi><mi>b</mi></mroot>';
  this.executeTest(root, 1, 'Radicand');
  this.executeTest(root, 0, 'Index');
  this.executeTest(root, 2, '');
};


/**
 * Testing simple tensors.
 */
sre.PrefixEnglishTest.prototype.testSimpleTensors = function() {
  var tensor = '<mmultiscripts><mi>A</mi><mn>1</mn><mn>2</mn><mprescripts/>' +
      '<mn>3</mn><mn>4</mn></mmultiscripts>';
  this.executeTest(tensor, 0, 'Base');
  this.executeTest(tensor, 1, 'Left Subscript');
  this.executeTest(tensor, 2, 'Left Superscript');
  this.executeTest(tensor, 3, 'Right Subscript');
  this.executeTest(tensor, 4, 'Right Superscript');
};


/**
 * Testing complex tensors.
 */
sre.PrefixEnglishTest.prototype.testComplexTensors = function() {
  var tensor =
      '<mmultiscripts><mi>A</mi><mn>3</mn><mn>4</mn><mi>k</mi><mi>l</mi>' +
      '<mprescripts/><mn>1</mn><mn>2</mn><mi>i</mi><mi>j</mi></mmultiscripts>';
  this.executeTest(tensor, 0, 'Base');
  this.executeTest(tensor, 1, '1st Left Subscript');
  this.executeTest(tensor, 2, '2nd Left Subscript');
  this.executeTest(tensor, 3, '1st Left Superscript');
  this.executeTest(tensor, 4, '2nd Left Superscript');
  this.executeTest(tensor, 5, '1st Right Subscript');
  this.executeTest(tensor, 6, '2nd Right Subscript');
  this.executeTest(tensor, 7, '1st Right Superscript');
  this.executeTest(tensor, 8, '2nd Right Superscript');
  this.executeTest(tensor, 17, '');
};


/**
 * Testing binomial coefficients.
 */
sre.PrefixEnglishTest.prototype.testBinomials = function() {
  var binomial = '<mfenced open="(" close=")"><mfrac linethickness="0">' +
      '<mi>n</mi><mi>k</mi></mfrac></mfenced>';
  this.executeTest(binomial, 2, 'Choice Quantity');
  this.executeTest(binomial, 3, 'Selection Quantity');
  this.executeTest(binomial, 0, '');
  this.executeTest(binomial, 4, '');
  this.executeTest(binomial, 5, '');
};


/**
 * Testing vectors.
 */
sre.PrefixEnglishTest.prototype.testVectors = function() {
  var vector = '<mfenced open="[" close="]"><mtable>' +
      '<mtr><mtd><mn>1</mn></mtd></mtr>' +
      '<mtr><mtd><mn>2</mn></mtd></mtr>' +
      '<mtr><mtd><mn>3</mn></mtd></mtr>' +
      '</mtable></mfenced>';
  this.executeTest(vector, 2, '1st Row');
  this.executeTest(vector, 5, '2nd Row');
  this.executeTest(vector, 8, '3rd Row');
  this.executeTest(vector, 0, '');
  this.executeTest(vector, 6, '');
  this.executeTest(vector, 10, '');
};


/**
 * Testing matrices.
 */
sre.PrefixEnglishTest.prototype.testMatrices = function() {
  var matrix = '<mfenced open="[" close="]"><mtable>' +
      '<mtr><mtd><mn>0</mn></mtd><mtd><mn>1</mn></mtd></mtr>' +
      '<mtr><mtd><mn>2</mn></mtd><mtd><mn>3</mn></mtd></mtr>' +
      '</mtable></mfenced>';
  this.executeTest(matrix, 4, '1st Row');
  this.executeTest(matrix, 1, '1st Column');
  this.executeTest(matrix, 3, '2nd Column');
  this.executeTest(matrix, 9, '2nd Row');
  this.executeTest(matrix, 6, '1st Column');
  this.executeTest(matrix, 8, '2nd Column');
  this.executeTest(matrix, 2, '');
  this.executeTest(matrix, 7, '');
  this.executeTest(matrix, 12, '');
};

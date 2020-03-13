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
 * @fileoverview Testcases for prefix speech generation in MathML enrichment.
 *
 * @author v.sorge@mathjax.org (Volker Sorge)
 */

goog.provide('sre.PrefixGermanTest');

goog.require('sre.PrefixRuleTest');



/**
 * @constructor
 * @extends {sre.PrefixRuleTest}
 */
sre.PrefixGermanTest = function() {
  sre.PrefixGermanTest.base(this, 'constructor');

  /**
   * @override
   */
  this.information = 'Prefix German rule tests.';

  this.locale = 'de';
  this.setActive('PrefixGerman');
};
goog.inherits(sre.PrefixGermanTest, sre.PrefixRuleTest);


/**
 * Testing sub/superscripts.
 */
sre.PrefixGermanTest.prototype.testSubSuper = function() {
  var subscript = '<msub><mi>a</mi><mi>b</mi></msub>';
  this.executeTest(subscript, 0, 'Basis');
  this.executeTest(subscript, 1, 'Index');
  this.executeTest(subscript, 2, '');
  var superscript = '<msup><mi>a</mi><mi>b</mi></msup>';
  this.executeTest(superscript, 0, 'Basis');
  this.executeTest(superscript, 1, 'Exponent');
  this.executeTest(superscript, 2, '');
};


/**
 * Testing over/underscripts.
 */
sre.PrefixGermanTest.prototype.testOverUnder = function() {
  var overscore = '<mover><mi>a</mi><mi>b</mi></mover>';
  this.executeTest(overscore, 0, 'Basis');
  this.executeTest(overscore, 1, 'Oberer Grenzwert');
  this.executeTest(overscore, 2, '');
  var underscore = '<munder><mi>a</mi><mi>b</mi></munder>';
  this.executeTest(underscore, 0, 'Basis');
  this.executeTest(underscore, 1, 'Unterer Grenzwert');
  this.executeTest(underscore, 2, '');
};


/**
 * Testing fractions.
 */
sre.PrefixGermanTest.prototype.testFractions = function() {
  var fraction = '<mfrac><mi>a</mi><mi>b</mi></mfrac>';
  this.executeTest(fraction, 0, 'Zähler');
  this.executeTest(fraction, 1, 'Nenner');
  this.executeTest(fraction, 2, '');
};


/**
 * Testing roots.
 */
sre.PrefixGermanTest.prototype.testRoots = function() {
  var sqrt = '<msqrt><mi>a</mi></msqrt>';
  this.executeTest(sqrt, 0, 'Radikand');
  this.executeTest(sqrt, 1, '');
  var root = '<mroot><mi>a</mi><mi>b</mi></mroot>';
  this.executeTest(root, 1, 'Radikand');
  this.executeTest(root, 0, 'Wurzelexponent');
  this.executeTest(root, 2, '');
};


/**
 * Testing simple tensors.
 */
sre.PrefixGermanTest.prototype.testSimpleTensors = function() {
  var tensor = '<mmultiscripts><mi>A</mi><mn>1</mn><mn>2</mn><mprescripts/>' +
      '<mn>3</mn><mn>4</mn></mmultiscripts>';
  this.executeTest(tensor, 0, 'Basis');
  this.executeTest(tensor, 1, 'linker unterer Index');
  this.executeTest(tensor, 2, 'linker oberer Index');
  this.executeTest(tensor, 3, 'rechter unterer Index');
  this.executeTest(tensor, 4, 'rechter oberer Index');
};


/**
 * Testing complex tensors.
 */
sre.PrefixGermanTest.prototype.testComplexTensors = function() {
  var tensor = '<mmultiscripts><mi>A</mi><mn>3</mn><mn>4</mn><mi>k</mi><mi>l</mi>' +
      '<mprescripts/><mn>1</mn><mn>2</mn><mi>i</mi><mi>j</mi></mmultiscripts>';
  this.executeTest(tensor, 0, 'Basis');
  this.executeTest(tensor, 1, '1. linker unterer Index');
  this.executeTest(tensor, 2, '2. linker unterer Index');
  this.executeTest(tensor, 3, '1. linker oberer Index');
  this.executeTest(tensor, 4, '2. linker oberer Index');
  this.executeTest(tensor, 5, '1. rechter unterer Index');
  this.executeTest(tensor, 6, '2. rechter unterer Index');
  this.executeTest(tensor, 7, '1. rechter oberer Index');
  this.executeTest(tensor, 8, '2. rechter oberer Index');
  this.executeTest(tensor, 17, '');
};


/**
 * Testing binomial coefficients.
 */
sre.PrefixGermanTest.prototype.testBinomials = function() {
  var binomial = '<mfenced open="(" close=")"><mfrac linethickness="0">' +
      '<mi>n</mi><mi>k</mi></mfrac></mfenced>';
  this.executeTest(binomial, 2, 'Grundgesamtheit');
  this.executeTest(binomial, 3, 'Stichprobengröße');
  this.executeTest(binomial, 0, '');
  this.executeTest(binomial, 4, '');
  this.executeTest(binomial, 5, '');
};


/**
 * Testing vectors.
 */
sre.PrefixGermanTest.prototype.testVectors = function() {
  var vector = '<mfenced open="[" close="]"><mtable>' +
      '<mtr><mtd><mn>1</mn></mtd></mtr>' +
      '<mtr><mtd><mn>2</mn></mtd></mtr>' +
      '<mtr><mtd><mn>3</mn></mtd></mtr>' +
      '</mtable></mfenced>';
  this.executeTest(vector, 2, '1. Zeile');
  this.executeTest(vector, 5, '2. Zeile');
  this.executeTest(vector, 8, '3. Zeile');
  this.executeTest(vector, 0, '');
  this.executeTest(vector, 6, '');
  this.executeTest(vector, 10, '');
};


/**
 * Testing matrices.
 */
sre.PrefixGermanTest.prototype.testMatrices = function() {
  var matrix = '<mfenced open="[" close="]"><mtable>' +
      '<mtr><mtd><mn>0</mn></mtd><mtd><mn>1</mn></mtd></mtr>' +
      '<mtr><mtd><mn>2</mn></mtd><mtd><mn>3</mn></mtd></mtr>' +
      '</mtable></mfenced>';
  this.executeTest(matrix, 4, '1. Zeile');
  this.executeTest(matrix, 1, '1. Spalte');
  this.executeTest(matrix, 3, '2. Spalte');
  this.executeTest(matrix, 9, '2. Zeile');
  this.executeTest(matrix, 6, '1. Spalte');
  this.executeTest(matrix, 8, '2. Spalte');
  this.executeTest(matrix, 2, '');
  this.executeTest(matrix, 7, '');
  this.executeTest(matrix, 12, '');
};

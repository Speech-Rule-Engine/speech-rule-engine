// Copyright 2019 Volker Sorge
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
 * @fileoverview Basic Testcases for Nemeth
 *
 * @author Volker.Sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.Nemeth72Test');

goog.require('sre.AbstractRuleTest');



/**
 * @constructor
 * @extends {sre.AbstractRuleTest}
 */
sre.Nemeth72Test = function() {
  sre.Nemeth72Test.base(this, 'constructor');

  /**
   * @override
   */
  this.information = 'Testcases from the Nemeth book.';

  /**
   * @override
   */
  this.domain = 'default';

  /**
   * @override
   */
  this.locale = 'nemeth';

  /**
   * @override
   */
  this.modality = 'braille';

  this.setActive('Nemeth72Test');
  this.actual = false;
};
goog.inherits(sre.Nemeth72Test, sre.AbstractRuleTest);


// /**
//  *
//  */
// sre.Nemeth72Test.prototype.test = function() {
// };


/**
 * page 10.14
 */
sre.Nemeth72Test.prototype.test_10_14 = function() {
  var nemeth = '⠤⠼⠂';
  var mml = '<mo>-</mo><mn>1</mn>';
  this.executeRuleTest(mml, nemeth);
};


/**
 * page 10.15
 */
sre.Nemeth72Test.prototype.test_10_15 = function() {
  var nemeth = '⠤⠼⠨⠒';
  var mml = '<mo>-</mo><mn>.3</mn>';
  this.executeRuleTest(mml, nemeth);
};


/**
 * page 156.169(1)
 */
sre.Nemeth72Test.prototype.test_156_169_1 = function() {
  var nemeth = '⠝⠯';
  var mml = '<mi>n</mi><mo>!</mo>';
  this.executeRuleTest(mml, nemeth);
};


// Number indicator
/**
 * Number indicator Paragraph 8 a
 */
sre.Nemeth72Test.prototype.test_number_para_8_a = function() {
  this.executeRuleTest('<mn>1,378</mn>', '⠼⠂⠠⠒⠶⠦');
  // Continental 
  // this.executeRuleTest('<mn>1.378</mn>', '');
  this.executeRuleTest('<mn>3.76</mn>', '⠼⠒⠨⠶⠖');
  // Continental 
  // this.executeRuleTest('<mn>3,76</mn>', '');
};


/**
 * Number indicator Paragraph 8 b
 */
sre.Nemeth72Test.prototype.test_number_para_8_b = function() {
  this.executeRuleTest('<mn>1,478</mn>', '⠼⠂⠠⠲⠶⠦');
  this.executeRuleTest(
    '<mn>100</mn><mo>,</mo><mn>200</mn><mo>,</mo><mn>300</mn>',
    '⠼⠂⠴⠴⠠⠀⠼⠆⠴⠴⠠⠀⠼⠒⠴⠴');
};


/**
 * Number indicator Paragraph 8 c
 */
sre.Nemeth72Test.prototype.test_number_para_8_c = function() {
  this.executeRuleTest('<mn>.35</mn>', '⠼⠨⠒⠢');
  this.executeRuleTest('<mn>3.14</mn>', '⠼⠒⠨⠂⠲');
  this.executeRuleTest(
    '<mn>.2</mn><msub><mi>a</mi><mn>1</mn></msub>' +
      '<msub><mi>a</mi><mn>2</mn></msub><msub><mi>a</mi><mn>3</mn></msub>',
    '⠼⠨⠆⠁⠂⠁⠆⠁⠒');
  this.executeRuleTest(
    '<mn>.</mn><msub><mi>a</mi><mn>1</mn></msub>' +
      '<msub><mi>a</mi><mn>2</mn></msub><msub><mi>a</mi><mn>3</mn></msub>',
    '⠨⠐⠁⠂⠁⠆⠁⠒');
  this.executeRuleTest(
    '<mn>.1</mn><mo>+</mo><mn>.2</mn><mo>=</mo><mo>.</mo><mo>----</mo>',
    '⠼⠨⠂⠬⠨⠆⠀⠨⠅⠀⠨⠐⠤⠤⠤⠤');
};


/**
 * Number indicator Paragraph 9 a
 */
sre.Nemeth72Test.prototype.test_number_para_9_a = function() {
  this.executeRuleTest('<mn>27</mn>', '⠼⠆⠶');
  // Ignored (2)
  this.executeRuleTest(
    '<mn>1</mn><mo>+</mo><mi>x</mi><mo>+</mo><mi>y</mi><mo>=</mo><mn>0</mn>',
    '⠼⠂⠬⠭⠬⠽⠀⠨⠅⠀⠼⠴');
  this.executeRuleTest(
    '<mi>y</mi><mo>=</mo><mn>2</mn><mi>sin</mi><mo>&#x2061;</mo><mi>x</mi>',
    '⠽⠀⠨⠅⠀⠼⠆⠎⠊⠝⠀⠭');
  this.executeRuleTest(
    '<mi>sin</mi><mo>&#x2061;</mo><mn>1</mn>',
    '⠎⠊⠝⠀⠼⠂');
  this.executeRuleTest(
    '<msup><mi>sin</mi><mn>2</mn></msup><mo>&#x2061;</mo><mn>2</mn><mi>x</mi>',
    '⠎⠊⠝⠘⠆⠀⠼⠆⠭');
  this.executeRuleTest(
    '<mn>0.333</mn><mo>&#x2026;</mo><mn>3</mn><mo>&#x2026;</mo>',
    '⠼⠴⠨⠒⠒⠒⠀⠄⠄⠄⠀⠼⠒⠀⠄⠄⠄');
  this.executeRuleTest(
    '<msub><mi>log</mi><mrow><mn>10</mn></mrow></msub><mo>&#x2061;</mo><mn>2</mn>',
    '⠇⠕⠛⠰⠂⠴⠀⠼⠆'); //  Additional ⠰, as we indicate the 10 subscript!
  // Ignored (9) for now
  this.executeRuleTest(
    '<mo>(</mo><mi>x</mi><mo>=</mo><mn>0</mn><mo>)</mo>',
    '⠷⠭⠀⠨⠅⠀⠼⠴⠾');
  this.executeRuleTest(
    '<mfrac><mn>11</mn><mn>5</mn></mfrac>',
    '⠹⠂⠂⠌⠢⠼');
  // Note that 11 differs from the book as we linearise fractions.
  // Ignored (12, 13)
  this.executeRuleTest(
    '<mo>-</mo><mn>1</mn>',
    '⠤⠼⠂');
  this.executeRuleTest(
    '<mo>-</mo><mn>.3</mn>',
    '⠤⠼⠨⠒');
};


/**
 * Number indicator Paragraph 9 b
 */
sre.Nemeth72Test.prototype.test_number_para_9_b = function() {
  this.executeRuleTest(
    '<mtext>&#8220;</mtext><mn>3</mn><mtext>&#8195;dogs&#8221;</mtext>',
    '⠦⠼⠒⠀⠙⠕⠛⠎⠴');
  this.executeRuleTest(
    '<mtext>Probability</mtext><mo>--</mo><mn>0</mn>',
    '⠠⠏⠗⠕⠃⠁⠃⠊⠇⠊⠞⠽⠤⠤⠼⠴'
  ); // (2) Note this is uncontracted Grade 1
  this.executeRuleTest(
    '<mtext>&#8220;</mtext><mn>.5</mn>',
    '⠦⠼⠨⠢');
  this.executeRuleTest(
    '<mtext>&#8220;</mtext><mo>-</mo><mn>4</mn>',
    '⠦⠤⠼⠲');
};


// Rule XII - Fractions (Page 75ff.)
/**
 * Paragraph 66
 * 
 * Number indicator + Fractions
 */
sre.Nemeth72Test.prototype.test_para_66 = function() {
  this.executeRuleTest(
    '<mfrac><mfrac><mn>3</mn><mn>8</mn></mfrac><mn>5</mn></mfrac>',
    '⠠⠹⠹⠒⠌⠦⠼⠠⠌⠢⠠⠼'
  );
  this.executeRuleTest(
    '<mfrac><mrow><mn>1</mn><mrow><mo>/</mo></mrow><mn>2</mn></mrow><mrow><mn>2</mn><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mfrac>',
    '⠠⠹⠂⠸⠌⠆⠠⠌⠆⠸⠹⠆⠌⠒⠸⠼⠠⠼'
  );
  // this.executeRuleTest(
  //   // '<mfrac><mfrac bevelled="true"><mn>2</mn><mn>3</mn></mfrac><mfrac bevelled="true"><mn>3</mn><mn>2</mn></mfrac></mfrac>',
  //   '<mfrac><mrow><mn>2</mn><mo>/</mo><mn>3</mn></mrow><mrow><mn>3</mn><mo>/</mo><mn>2</mn></mrow></mfrac>',
  //   '⠠⠹⠆⠸⠌⠒⠠⠌⠒⠸⠌⠆⠠⠼'
  // ); // Need to consider regular division operator for complex (but not hypercomplex!) fraction.
  //    // Extend to nesting depth computation to work with type/role pairs.
  this.executeRuleTest(
    '<mfrac><mn>5</mn><mrow><mn>4</mn><mfrac><mn>3</mn><mn>8</mn></mfrac></mrow></mfrac>',
    '⠠⠹⠢⠠⠌⠲⠸⠹⠒⠌⠦⠸⠼⠠⠼'
  );
  // this.executeRuleTest(
  //   '<mfrac><mrow><mn>3</mn><mo>/</mo><mn>4</mn></mrow><mn>5</mn></mfrac>',
  //   '⠠⠹⠒⠸⠌⠲⠠⠌⠢⠠⠼'
  // ); // Need to consider regular division operator for complex (but not hypercomplex!) fraction.
  this.executeRuleTest(
    '<mfrac bevelled="true"><mfrac><mn>1</mn><mn>2</mn></mfrac><mfrac><mn>3</mn><mn>4</mn></mfrac></mfrac>',
    '⠠⠹⠹⠂⠌⠆⠼⠠⠸⠌⠹⠒⠌⠲⠼⠠⠼'
  );
};


/**
 * Paragraph 67
 */
sre.Nemeth72Test.prototype.test_para_67 = function() {
  this.executeRuleTest(
    '<mfrac><mi>a</mi><msup><mi>b</mi><mrow><mfrac><mfrac><mn>3</mn><mn>4</mn></mfrac><mfrac><mn>5</mn><mn>6</mn></mfrac></mfrac></mrow></msup></mfrac>',
    '⠹⠁⠌⠃⠘⠠⠹⠹⠒⠌⠲⠼⠠⠌⠹⠢⠌⠖⠼⠠⠼⠐⠼'
  );
};


/**
 * Paragraph 68
 */
sre.Nemeth72Test.prototype.test_para_68 = function() {
  // (1) linearized
  this.executeRuleTest(
    '<mfrac><mfrac><mrow><mn>1</mn><mfrac><mn>1</mn><mn>4</mn></mfrac></mrow><mrow><mn>1</mn><mfrac><mn>3</mn><mn>5</mn></mfrac></mrow></mfrac><mn>5</mn></mfrac>',
    '⠠⠠⠹⠠⠹⠂⠸⠹⠂⠌⠲⠸⠼⠠⠌⠂⠸⠹⠒⠌⠢⠸⠼⠠⠼⠠⠠⠌⠢⠠⠠⠼' 
  );
  // (4)
  this.executeRuleTest(
    '<mfrac><mfrac><mrow><mo stretchy="false">(</mo><mn>1</mn><mo>&#x2212;</mo><mi>x</mi><mo stretchy="false">)</mo><mfrac><mi>d</mi><mi>dx</mi></mfrac><mo stretchy="false">(</mo><mn>2</mn><mi>x</mi><mo stretchy="false">)</mo><mo>&#x2212;</mo><mn>2</mn><mi>x</mi><mfrac><mi>d</mi><mi>dx</mi></mfrac><mo stretchy="false">(</mo><mn>1</mn><mo>&#x2212;</mo><mi>x</mi><mo stretchy="false">)</mo></mrow><mrow><mo stretchy="false">(</mo><mn>1</mn><mo>&#x2212;</mo><mi>x</mi><msup><mo stretchy="false">)</mo><mn>2</mn></msup></mrow></mfrac><mrow><mn>1</mn><mo>+</mo><msup><mrow data-mjx-texclass="INNER"><mo data-mjx-texclass="OPEN">(</mo><mfrac><mrow><mn>2</mn><mi>x</mi></mrow><mrow><mn>1</mn><mo>&#x2212;</mo><mi>x</mi></mrow></mfrac><mo data-mjx-texclass="CLOSE">)</mo></mrow><mn>2</mn></msup></mrow></mfrac>',
    '⠠⠠⠹⠠⠹⠷⠂⠤⠭⠾⠹⠙⠌⠙⠭⠼⠷⠆⠭⠾⠤⠆⠭⠹⠙⠌⠙⠭⠼⠷⠂⠤⠭⠾⠠⠌⠷⠂⠤⠭⠾⠘⠆⠐⠠⠼⠠⠠⠌⠂⠬⠷⠹⠆⠭⠌⠂⠤⠭⠼⠾⠘⠆⠐⠠⠠⠼'
  );
};


/**
 * Paragraph 69
 */
sre.Nemeth72Test.prototype.test_para_69 = function() {
  // (1) continued Fraction linearized
  this.executeRuleTest(
    '<msqrt><mn>2</mn></msqrt><mo>=</mo><mrow><mn>1</mn><mo>+</mo><mfrac><mn>1</mn><mrow><mn>2</mn><mo>+</mo><mfrac><mn>1</mn><mrow><mn>2</mn><mo>+</mo><mfrac><mn>1</mn><mrow><mn>2</mn><mo>+</mo><mfrac><mn>1</mn><mrow><mn>2</mn><mo>+</mo><mo>&#x2026;</mo></mrow></mfrac></mrow></mfrac></mrow></mfrac></mrow></mfrac></mrow>',
    '⠜⠆⠻⠀⠨⠅⠀⠼⠂⠬⠠⠠⠠⠹⠂⠠⠠⠠⠌⠆⠬⠠⠠⠹⠂⠠⠠⠌⠆⠬⠠⠹⠂⠠⠌⠆⠬⠹⠂⠌⠆⠬⠄⠄⠄⠼⠠⠼⠠⠠⠼⠠⠠⠠⠼'
  );
};


// Rule XV
/**
 * Paragraph 103 (a)
 */
sre.Nemeth72Test.prototype.test_para_103_a = function() {
  this.executeRuleTest(
    '<msqrt><mn>2</mn></msqrt>',
    '⠜⠆⠻'
  );
  this.executeRuleTest(
    '<msqrt><mi>x</mi><mo>+</mo><mi>y</mi></msqrt>',
    '⠜⠭⠬⠽⠻'
  );
  this.executeRuleTest(
    '<msqrt><msup><mi>x</mi><mn>2</mn></msup><mo>+</mo><mn>1</mn></msqrt>',
    '⠜⠭⠘⠆⠐⠬⠂⠻'
  );
  this.executeRuleTest(
    '<msqrt><msup><mi>x</mi><mn>2</mn></msup><mo>+</mo><msup><mi>y</mi><mn>2</mn></msup></msqrt>',
    '⠜⠭⠘⠆⠐⠬⠽⠘⠆⠐⠻'
  );
  this.executeRuleTest(
    '<msqrt><mfrac><mi>x</mi><mi>y</mi></mfrac></msqrt>',
    '⠜⠹⠭⠌⠽⠼⠻'
  );
  this.executeRuleTest(
    '<mn>3</mn><msqrt><mi>a</mi></msqrt>',
    '⠼⠒⠜⠁⠻'
  );
  this.executeRuleTest(
    '<msup><msqrt><mi>x</mi></msqrt><mn>3</mn></msup>',
    '⠜⠭⠻⠘⠒'
  );
};


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
 * Number indicator page 8
 */
sre.Nemeth72Test.prototype.test_number_8 = function() {
  this.executeRuleTest('<mn>1,378</mn>', '⠼⠂⠠⠒⠶⠦');
  // Continental 
  // this.executeRuleTest('<mn>1.378</mn>', '');
  this.executeRuleTest('<mn>3.76</mn>', '⠼⠒⠨⠶⠖');
  // Continental 
  // this.executeRuleTest('<mn>3,76</mn>', '');
  this.executeRuleTest('<mn>1,478</mn>', '⠼⠂⠠⠲⠶⠦');
  this.executeRuleTest(
    '<mn>100</mn><mo>,</mo><mn>200</mn><mo>,</mo><mn>300</mn>',
    '⠼⠂⠴⠴⠠⠀⠼⠆⠴⠴⠠⠀⠼⠒⠴⠴');
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
 * Number indicator page 9
 */
sre.Nemeth72Test.prototype.test_number_9 = function() {
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
    '⠎⠊⠝⠘⠆⠀⠼⠆⠭'); // End baseline is not needed
  this.executeRuleTest(
    '<mn>0.333</mn><mo>&#x2026;</mo><mn>3</mn><mo>&#x2026;</mo>',
    '⠼⠴⠨⠒⠒⠒⠀⠄⠄⠄⠀⠒⠀⠼⠄⠄⠄'); // Spacing is missing, number indicator is missing
  this.executeRuleTest(
    '<msub><mi>log</mi><mrow><mn>10</mn></mrow></msub><mo>&#x2061;</mo><mn>2</mn>',
    '⠇⠕⠛⠂⠴⠀⠼⠆'); //  Additional ⠰ + no need for baseline ⠐
  // Ignored (9) for now
  this.executeRuleTest(
    '<mo>(</mo><mi>x</mi><mo>=</mo><mn>0</mn><mo>)</mo>',
    '⠷⠭⠀⠨⠅⠀⠼⠴⠾');
  this.executeRuleTest(
    '<mfrac><mn>11</mn><mn>5</mn></mfrac>',
    '⠹⠼⠂⠂⠌⠢⠼');
    // Note that this differes from the book as we linearise fractions.
};

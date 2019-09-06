// Copyright 2017 Volker Sorge
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
// With support from the Mozilla Foundation under a MOSS grant.
//


goog.provide('sre.ClearspeakEnglishAbsoluteValue');

goog.require('sre.ClearspeakEnglishRuleTest');



/**
* @constructor
* @extends {sre.ClearspeakEnglishRuleTest}
*/
sre.ClearspeakEnglishAbsoluteValue = function() {
  sre.ClearspeakEnglishAbsoluteValue.base(this, 'constructor');

  /**
* @override
  */
  this.information = 'ClearspeakEnglishAbsoluteValue rule tests.';

};
goog.inherits(sre.ClearspeakEnglishAbsoluteValue, sre.ClearspeakEnglishRuleTest);



//
// Absolute Value
//


/**
 * Testing ClearspeakEnglishAbsoluteValue Example Abs01
 */
sre.ClearspeakEnglishAbsoluteValue.prototype.testAbs01 = function() {
  var preference = 'AbsoluteValue_Auto';
  var mathml = '<mrow><mrow><mo>|</mo><mi>x</mi><mo>|</mo></mrow></mrow>';
  var speech = 'the absolute value of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishAbsoluteValue Example Abs02
 */
sre.ClearspeakEnglishAbsoluteValue.prototype.testAbs02 = function() {
  var preference = 'AbsoluteValue_Auto';
  var mathml = '<mrow><mrow><mo>|</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn>' +
      '</mrow><mo>|</mo></mrow></mrow>';
  var speech = 'the absolute value of x plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishAbsoluteValue Example Abs03
 */
sre.ClearspeakEnglishAbsoluteValue.prototype.testAbs03 = function() {
  var preference = 'AbsoluteValue_Auto';
  var mathml = '<mrow><mrow><mo>|</mo><mi>x</mi><mo>|</mo></mrow><mo>+</mo>' +
      '<mn>1</mn></mrow>';
  var speech = 'the absolute value of x, plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishAbsoluteValue Example Abs04
 */
sre.ClearspeakEnglishAbsoluteValue.prototype.testAbs04 = function() {
  var preference = 'AbsoluteValue_Auto';
  var mathml = '<mrow><mrow><mo>|</mo><mi>x</mi><mo>|</mo></mrow><mo>+</mo>' +
      '<mrow><mo>|</mo><mi>y</mi><mo>|</mo></mrow><mo>≥</mo><mrow><mo>|' +
      '</mo><mi>z</mi><mo>|</mo></mrow></mrow>';
  var speech = 'the absolute value of x, plus, the absolute value of y, is' +
      ' greater than or equal to, the absolute value of z';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishAbsoluteValue Example AbsEnd01
 */
sre.ClearspeakEnglishAbsoluteValue.prototype.testAbsEnd01 = function() {
  var preference = 'AbsoluteValue_AbsEnd';
  var mathml = '<mrow><mrow><mo>|</mo><mi>x</mi><mo>|</mo></mrow></mrow>';
  var speech = 'the absolute value of x, end absolute value';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishAbsoluteValue Example AbsEnd02
 */
sre.ClearspeakEnglishAbsoluteValue.prototype.testAbsEnd02 = function() {
  var preference = 'AbsoluteValue_AbsEnd';
  var mathml = '<mrow><mrow><mo>|</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn>' +
      '</mrow><mo>|</mo></mrow></mrow>';
  var speech = 'the absolute value of x plus 1, end absolute value';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishAbsoluteValue Example AbsEnd03
 */
sre.ClearspeakEnglishAbsoluteValue.prototype.testAbsEnd03 = function() {
  var preference = 'AbsoluteValue_AbsEnd';
  var mathml = '<mrow><mrow><mo>|</mo><mi>x</mi><mo>|</mo></mrow><mo>+</mo>' +
      '<mn>1</mn></mrow>';
  var speech = 'the absolute value of x, end absolute value, plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishAbsoluteValue Example AbsEnd04
 */
sre.ClearspeakEnglishAbsoluteValue.prototype.testAbsEnd04 = function() {
  var preference = 'AbsoluteValue_AbsEnd';
  var mathml = '<mrow><mrow><mo>|</mo><mi>x</mi><mo>|</mo></mrow><mo>+</mo>' +
      '<mrow><mo>|</mo><mi>y</mi><mo>|</mo></mrow><mo>≥</mo><mrow><mo>|' +
      '</mo><mi>z</mi><mo>|</mo></mrow></mrow>';
  var speech = 'the absolute value of x, end absolute value, plus, the' +
      ' absolute value of y, end absolute value, is greater than or equal' +
      ' to, the absolute value of z, end absolute value';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishAbsoluteValue Example Card01
 */
sre.ClearspeakEnglishAbsoluteValue.prototype.testCard01 = function() {
  var preference = 'AbsoluteValue_Cardinality';
  var mathml = '<mrow><mrow><mo>|</mo><mi>S</mi><mo>|</mo></mrow></mrow>';
  var speech = 'the cardinality of S';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishAbsoluteValue Example Determinant01
 */
sre.ClearspeakEnglishAbsoluteValue.prototype.testDeterminant01 = function() {
  var preference = 'AbsoluteValue_Determinant';
  var mathml = '<mrow><mrow><mo>|</mo><mi>M</mi><mo>|</mo></mrow></mrow>';
  var speech = 'the determinant of M';
  this.executeRuleTest(mathml, speech, preference);
};


//
// Absolute Value (Determinants)
//


/**
 * Testing ClearspeakEnglishAbsoluteValue Example AbsDet01
 */
sre.ClearspeakEnglishAbsoluteValue.prototype.testAbsDet01 = function() {
  var preference = 'AbsoluteValue_Auto';
  var mathml = '<mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>2</mn>' +
      '</mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd>' +
      '<mn>5</mn></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishAbsoluteValue Example AbsDet02
 */
sre.ClearspeakEnglishAbsoluteValue.prototype.testAbsDet02 = function() {
  var preference = 'AbsoluteValue_Auto';
  var mathml = '<mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>2</mn>' +
      '</mtd><mtd><mn>4</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd>' +
      '<mn>3</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>2</mn></mtd></mtr>' +
      '<mtr><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>7</mn>' +
      '</mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow>';
  var speech = 'the determinant of the 3 by 3 matrix. Row 1: 2, 4, 1 Row 2:' +
      ' 3, 5, 2 Row 3: 1, 4, 7';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishAbsoluteValue Example AbsDet03
 */
sre.ClearspeakEnglishAbsoluteValue.prototype.testAbsDet03 = function() {
  var preference = 'AbsoluteValue_Auto';
  var mathml = '<mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>0</mn>' +
      '</mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>3</mn>' +
      '</mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd><mtd>' +
      '<mn>0</mn></mtd><mtd><mn>9</mn></mtd></mtr><mtr><mtd><mn>3</mn>' +
      '</mtd><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>1</mn>' +
      '</mtd></mtr><mtr><mtd><mn>6</mn></mtd><mtd><mn>2</mn></mtd><mtd>' +
      '<mn>9</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow><mo>|' +
      '</mo></mrow></mrow>';
  var speech = 'the determinant of the 4 by 4 matrix. Row 1: Column 1, 0;' +
      ' Column 2, 3; Column 3, 4; Column 4, 3. Row 2: Column 1, 2; Column' +
      ' 2, 1; Column 3, 0; Column 4, 9. Row 3: Column 1, 3; Column 2, 0;' +
      ' Column 3, 2; Column 4, 1. Row 4: Column 1, 6; Column 2, 2; Column' +
      ' 3, 9; Column 4, 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishAbsoluteValue Example AbsDet04
 */
sre.ClearspeakEnglishAbsoluteValue.prototype.testAbsDet04 = function() {
  var preference = 'AbsoluteValue_Auto';
  var mathml = '<mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>2</mn>' +
      '</mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd>' +
      '<mrow><mn>5</mn><mo>+</mo><mi>x</mi></mrow></mtd></mtr></mtable>' +
      '</mrow><mo>|</mo></mrow></mrow>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: Column 1, 2;' +
      ' Column 2, 1. Row 2: Column 1, 7; Column 2, 5 plus x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishAbsoluteValue Example AbsDet05
 */
sre.ClearspeakEnglishAbsoluteValue.prototype.testAbsDet05 = function() {
  var preference = 'AbsoluteValue_Auto';
  var mathml = '<mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mrow><mn>2' +
      '</mn><mi>x</mi></mrow></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd>' +
      '<mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>|' +
      '</mo></mrow></mrow>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2 x, 1 Row 2:' +
      ' 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishAbsoluteValue Example AbsDet06
 */
sre.ClearspeakEnglishAbsoluteValue.prototype.testAbsDet06 = function() {
  var preference = 'AbsoluteValue_Auto';
  var mathml = '<mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mrow><mn>2' +
      '</mn><mi>x</mi></mrow></mtd><mtd><mi>y</mi></mtd></mtr><mtr><mtd>' +
      '<mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow>' +
      '<mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr></mtable>' +
      '</mrow><mo>|</mo></mrow></mrow>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2 x, y Row 2:' +
      ' one half, two thirds';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishAbsoluteValue Example AbsDet07
 */
sre.ClearspeakEnglishAbsoluteValue.prototype.testAbsDet07 = function() {
  var preference = 'AbsoluteValue_Auto';
  var mathml = '<mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mrow><mfrac>' +
      '<mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>2' +
      '</mn><mn>3</mn></mfrac></mrow></mtd></mtr><mtr><mtd><mrow><mfrac>' +
      '<mn>3</mn><mn>4</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>1' +
      '</mn><mn>5</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>|</mo>' +
      '</mrow></mrow>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: one half, two' +
      ' thirds Row 2: three fourths, one fifth';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishAbsoluteValue Example AbsDet08
 */
sre.ClearspeakEnglishAbsoluteValue.prototype.testAbsDet08 = function() {
  var preference = 'AbsoluteValue_AbsEnd';
  var mathml = '<mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>2</mn>' +
      '</mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd>' +
      '<mn>5</mn></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishAbsoluteValue Example AbsDet09
 */
sre.ClearspeakEnglishAbsoluteValue.prototype.testAbsDet09 = function() {
  var preference = 'AbsoluteValue_AbsEnd';
  var mathml = '<mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>2</mn>' +
      '</mtd><mtd><mn>4</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd>' +
      '<mn>3</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>2</mn></mtd></mtr>' +
      '<mtr><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>7</mn></mtd>' +
      '</mtr></mtable></mrow><mo>|</mo></mrow></mrow>';
  var speech = 'the determinant of the 3 by 3 matrix. Row 1: 2, 4, 1 Row 2:' +
      ' 3, 5, 2 Row 3: 1, 4, 7';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishAbsoluteValue Example AbsDet10
 */
sre.ClearspeakEnglishAbsoluteValue.prototype.testAbsDet10 = function() {
  var preference = 'AbsoluteValue_AbsEnd';
  var mathml = '<mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>0</mn>' +
      '</mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>3</mn>' +
      '</mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd><mtd>' +
      '<mn>0</mn></mtd><mtd><mn>9</mn></mtd></mtr><mtr><mtd><mn>3</mn>' +
      '</mtd><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>1</mn>' +
      '</mtd></mtr><mtr><mtd><mn>6</mn></mtd><mtd><mn>2</mn></mtd><mtd>' +
      '<mn>9</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow><mo>|' +
      '</mo></mrow></mrow>';
  var speech = 'the determinant of the 4 by 4 matrix. Row 1: Column 1, 0;' +
      ' Column 2, 3; Column 3, 4; Column 4, 3. Row 2: Column 1, 2; Column' +
      ' 2, 1; Column 3, 0; Column 4, 9. Row 3: Column 1, 3; Column 2, 0;' +
      ' Column 3, 2; Column 4, 1. Row 4: Column 1, 6; Column 2, 2; Column' +
      ' 3, 9; Column 4, 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishAbsoluteValue Example AbsDet11
 */
sre.ClearspeakEnglishAbsoluteValue.prototype.testAbsDet11 = function() {
  var preference = 'AbsoluteValue_AbsEnd';
  var mathml = '<mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>2</mn>' +
      '</mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd>' +
      '<mrow><mn>5</mn><mo>+</mo><mi>x</mi></mrow></mtd></mtr></mtable>' +
      '</mrow><mo>|</mo></mrow></mrow>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: Column 1, 2;' +
      ' Column 2, 1. Row 2: Column 1, 7; Column 2, 5 plus x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishAbsoluteValue Example AbsDet12
 */
sre.ClearspeakEnglishAbsoluteValue.prototype.testAbsDet12 = function() {
  var preference = 'AbsoluteValue_AbsEnd';
  var mathml = '<mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mrow><mn>2' +
      '</mn><mi>x</mi></mrow></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd>' +
      '<mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>|' +
      '</mo></mrow></mrow>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2 x, 1 Row 2:' +
      ' 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishAbsoluteValue Example AbsDet13
 */
sre.ClearspeakEnglishAbsoluteValue.prototype.testAbsDet13 = function() {
  var preference = 'AbsoluteValue_AbsEnd';
  var mathml = '<mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mrow><mn>2' +
      '</mn><mi>x</mi></mrow></mtd><mtd><mi>y</mi></mtd></mtr><mtr><mtd>' +
      '<mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow>' +
      '<mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr></mtable>' +
      '</mrow><mo>|</mo></mrow></mrow>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2 x, y Row 2:' +
      ' one half, two thirds';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishAbsoluteValue Example AbsDet14
 */
sre.ClearspeakEnglishAbsoluteValue.prototype.testAbsDet14 = function() {
  var preference = 'AbsoluteValue_AbsEnd';
  var mathml = '<mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mrow><mfrac>' +
      '<mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>2' +
      '</mn><mn>3</mn></mfrac></mrow></mtd></mtr><mtr><mtd><mrow><mfrac>' +
      '<mn>3</mn><mn>4</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>1' +
      '</mn><mn>5</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>|</mo>' +
      '</mrow></mrow>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: one half, two' +
      ' thirds Row 2: three fourths, one fifth';
  this.executeRuleTest(mathml, speech, preference);
};

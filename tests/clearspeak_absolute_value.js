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


goog.provide('sre.ClearspeakAbsoluteValue');

goog.require('sre.ClearspeakRuleTest');



/**
* @constructor
* @extends {sre.ClearspeakRuleTest}
*/
sre.ClearspeakAbsoluteValue = function() {
sre.ClearspeakAbsoluteValue.base(this, 'constructor');

/**
* @override
*/
this.information = 'ClearspeakAbsoluteValue rule tests.';

};
goog.inherits(sre.ClearspeakAbsoluteValue, sre.ClearspeakRuleTest);



//
// Absolute Value
//


/**
 * Testing ClearspeakAbsoluteValue Example Abs01
 */
sre.ClearspeakAbsoluteValue.prototype.testAbs01 = function() {
  var preference = 'AbsoluteValue_Auto';
  var mathml = '<mrow><mrow><mo>|</mo><mi>x</mi><mo>|</mo></mrow></mrow>';
  var speech = 'the absolute value of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakAbsoluteValue Example Abs02
 */
sre.ClearspeakAbsoluteValue.prototype.testAbs02 = function() {
  var preference = 'AbsoluteValue_Auto';
  var mathml = '<mrow><mrow><mo>|</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn>' +
        '</mrow><mo>|</mo></mrow></mrow>';
  var speech = 'the absolute value of x plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakAbsoluteValue Example Abs03
 */
sre.ClearspeakAbsoluteValue.prototype.testAbs03 = function() {
  var preference = 'AbsoluteValue_Auto';
  var mathml = '<mrow><mrow><mo>|</mo><mi>x</mi><mo>|</mo></mrow><mo>+</mo>' +
        '<mn>1</mn></mrow>';
  var speech = 'the absolute value of x, plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakAbsoluteValue Example Abs04
 */
sre.ClearspeakAbsoluteValue.prototype.testAbs04 = function() {
  var preference = 'AbsoluteValue_Auto';
  var mathml = '<mrow><mrow><mo>|</mo><mi>x</mi><mo>|</mo></mrow><mo>+</mo>' +
        '<mrow><mo>|</mo><mi>y</mi><mo>|</mo></mrow><mo>≥</mo><mrow><mo>|' +
        '</mo><mi>z</mi><mo>|</mo></mrow></mrow>';
  var speech = 'the absolute value of x, plus, the absolute value of y, is' +
        ' greater than or equal to, the absolute value of z';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakAbsoluteValue Example AbsEnd01
 */
sre.ClearspeakAbsoluteValue.prototype.testAbsEnd01 = function() {
  var preference = 'AbsoluteValue_AbsEnd';
  var mathml = '<mrow><mrow><mo>|</mo><mi>x</mi><mo>|</mo></mrow></mrow>';
  var speech = 'the absolute value of x, end absolute value';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakAbsoluteValue Example AbsEnd02
 */
sre.ClearspeakAbsoluteValue.prototype.testAbsEnd02 = function() {
  var preference = 'AbsoluteValue_AbsEnd';
  var mathml = '<mrow><mrow><mo>|</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn>' +
        '</mrow><mo>|</mo></mrow></mrow>';
  var speech = 'the absolute value of x plus 1, end absolute value';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakAbsoluteValue Example AbsEnd03
 */
sre.ClearspeakAbsoluteValue.prototype.testAbsEnd03 = function() {
  var preference = 'AbsoluteValue_AbsEnd';
  var mathml = '<mrow><mrow><mo>|</mo><mi>x</mi><mo>|</mo></mrow><mo>+</mo>' +
        '<mn>1</mn></mrow>';
  var speech = 'the absolute value of x, end absolute value, plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakAbsoluteValue Example AbsEnd04
 */
sre.ClearspeakAbsoluteValue.prototype.testAbsEnd04 = function() {
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
 * Testing ClearspeakAbsoluteValue Example Card01
 */
sre.ClearspeakAbsoluteValue.prototype.untestCard01 = function() {
  var preference = 'AbsoluteValue_Cardinality';
  var mathml = '<mrow><mrow><mo>|</mo><mi>S</mi><mo>|</mo></mrow></mrow>';
  var speech = 'The cardinality of S';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakAbsoluteValue Example Determinant01
 */
sre.ClearspeakAbsoluteValue.prototype.untestDeterminant01 = function() {
  var preference = 'AbsoluteValue_Determinant';
  var mathml = '<mrow><mrow><mo>|</mo><mi>M</mi><mo>|</mo></mrow></mrow>';
  var speech = 'The determinant of M';
  this.executeRuleTest(mathml, speech, preference);
};


//
// Absolute Value (Determinants)
//


/**
 * Testing ClearspeakAbsoluteValue Example AbsDet01
 */
sre.ClearspeakAbsoluteValue.prototype.testAbsDet01 = function() {
  var preference = 'AbsoluteValue_Auto';
  var mathml = '<mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>2</mn>' +
        '</mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd>' +
        '<mn>5</mn></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakAbsoluteValue Example AbsDet02
 */
sre.ClearspeakAbsoluteValue.prototype.testAbsDet02 = function() {
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
 * Testing ClearspeakAbsoluteValue Example AbsDet03
 */
sre.ClearspeakAbsoluteValue.prototype.testAbsDet03 = function() {
  var preference = 'AbsoluteValue_Auto';
  var mathml = '<mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>0</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>9</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>9</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow>';
  var speech = 'the determinant of the 4 by 4 matrix. Row 1: Column 1, 0; Column 2, 3; Column 3, 4; Column 4, 3. Row 2: Column 1, 2; Column 2, 1; Column 3, 0; Column 4, 9. Row 3: Column 1, 3; Column 2, 0; Column 3, 2; Column 4, 1. Row 4: Column 1, 6; Column 2, 2; Column 3, 9; Column 4, 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakAbsoluteValue Example AbsDet04
 */
sre.ClearspeakAbsoluteValue.prototype.testAbsDet04 = function() {
  var preference = 'AbsoluteValue_Auto';
  var mathml = '<mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mrow><mn>5</mn><mo>+</mo><mi>x</mi></mrow></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: Column 1, 2; Column 2, 1. Row 2: Column 1, 7; Column 2, 5 plus x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakAbsoluteValue Example AbsDet05
 */
sre.ClearspeakAbsoluteValue.prototype.testAbsDet05 = function() {
  var preference = 'AbsoluteValue_Auto';
  var mathml = '<mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2x, 1 Row 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakAbsoluteValue Example AbsDet06
 */
sre.ClearspeakAbsoluteValue.prototype.testAbsDet06 = function() {
  var preference = 'AbsoluteValue_Auto';
  var mathml = '<mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mi>y</mi></mtd></mtr><mtr><mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2x, y Row 2: one half, two thirds';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakAbsoluteValue Example AbsDet07
 */
sre.ClearspeakAbsoluteValue.prototype.testAbsDet07 = function() {
  var preference = 'AbsoluteValue_Auto';
  var mathml = '<mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr><mtr><mtd><mrow><mfrac><mn>3</mn><mn>4</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>1</mn><mn>5</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: one half, two thirds Row 2: three fourths, one fifth';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakAbsoluteValue Example AbsDet08
 */
sre.ClearspeakAbsoluteValue.prototype.testAbsDet08 = function() {
  var preference = 'AbsoluteValue_AbsEnd';
  var mathml = '<mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2, 1 Row 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakAbsoluteValue Example AbsDet09
 */
sre.ClearspeakAbsoluteValue.prototype.testAbsDet09 = function() {
  var preference = 'AbsoluteValue_AbsEnd';
  var mathml = '<mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>7</mn></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow>';
  var speech = 'the determinant of the 3 by 3 matrix. Row 1: 2, 4, 1 Row 2: 3, 5, 2 Row 3: 1, 4, 7';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakAbsoluteValue Example AbsDet10
 */
sre.ClearspeakAbsoluteValue.prototype.testAbsDet10 = function() {
  var preference = 'AbsoluteValue_AbsEnd';
  var mathml = '<mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>0</mn></mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>9</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>6</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>9</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow>';
  var speech = 'the determinant of the 4 by 4 matrix. Row 1: Column 1, 0; Column 2, 3; Column 3, 4; Column 4, 3. Row 2: Column 1, 2; Column 2, 1; Column 3, 0; Column 4, 9. Row 3: Column 1, 3; Column 2, 0; Column 3, 2; Column 4, 1. Row 4: Column 1, 6; Column 2, 2; Column 3, 9; Column 4, 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakAbsoluteValue Example AbsDet11
 */
sre.ClearspeakAbsoluteValue.prototype.testAbsDet11 = function() {
  var preference = 'AbsoluteValue_AbsEnd';
  var mathml = '<mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mrow><mn>5</mn><mo>+</mo><mi>x</mi></mrow></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: Column 1, 2; Column 2, 1. Row 2: Column 1, 7; Column 2, 5 plus x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakAbsoluteValue Example AbsDet12
 */
sre.ClearspeakAbsoluteValue.prototype.testAbsDet12 = function() {
  var preference = 'AbsoluteValue_AbsEnd';
  var mathml = '<mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2x, 1 Row 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakAbsoluteValue Example AbsDet13
 */
sre.ClearspeakAbsoluteValue.prototype.testAbsDet13 = function() {
  var preference = 'AbsoluteValue_AbsEnd';
  var mathml = '<mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mrow><mn>2</mn><mi>x</mi></mrow></mtd><mtd><mi>y</mi></mtd></mtr><mtr><mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: 2x, y Row 2: one half, two thirds';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakAbsoluteValue Example AbsDet14
 */
sre.ClearspeakAbsoluteValue.prototype.testAbsDet14 = function() {
  var preference = 'AbsoluteValue_AbsEnd';
  var mathml = '<mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr><mtr><mtd><mrow><mfrac><mn>3</mn><mn>4</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>1</mn><mn>5</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow>';
  var speech = 'the determinant of the 2 by 2 matrix. Row 1: one half, two thirds Row 2: three fourths, one fifth';
  this.executeRuleTest(mathml, speech, preference);
};

// Copyright 2020 Volker Sorge
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

goog.provide('sre.ClearspeakGermanAbsoluteValue');

goog.require('sre.ClearspeakGermanRuleTest');



/**
* @constructor
* @extends {sre.ClearspeakGermanRuleTest}
*/
sre.ClearspeakGermanAbsoluteValue = function() {
  sre.ClearspeakGermanAbsoluteValue.base(this, 'constructor');

  /**
   * @override
   */
  this.information = 'ClearspeakGermanAbsoluteValue rule tests.';

};
goog.inherits(sre.ClearspeakGermanAbsoluteValue, sre.ClearspeakGermanRuleTest);



//
// Absolute Value
//


/**
 * Testing ClearspeakGermanAbsoluteValue Example Abs01
 */
sre.ClearspeakGermanAbsoluteValue.prototype.testAbs01 = function() {
  var preference = 'AbsoluteValue_Auto';
  var mathml = '<mrow><mrow><mo>|</mo><mi>x</mi><mo>|</mo></mrow></mrow>';
  var speech = 'der Betrag von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanAbsoluteValue Example Abs02
 */
sre.ClearspeakGermanAbsoluteValue.prototype.testAbs02 = function() {
  var preference = 'AbsoluteValue_Auto';
  var mathml = '<mrow><mrow><mo>|</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn>' +
      '</mrow><mo>|</mo></mrow></mrow>';
  var speech = 'der Betrag von x plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanAbsoluteValue Example Abs03
 */
sre.ClearspeakGermanAbsoluteValue.prototype.testAbs03 = function() {
  var preference = 'AbsoluteValue_Auto';
  var mathml = '<mrow><mrow><mo>|</mo><mi>x</mi><mo>|</mo></mrow><mo>+</mo>' +
      '<mn>1</mn></mrow>';
  var speech = 'der Betrag von x, plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanAbsoluteValue Example Abs04
 */
sre.ClearspeakGermanAbsoluteValue.prototype.testAbs04 = function() {
  var preference = 'AbsoluteValue_Auto';
  var mathml = '<mrow><mrow><mo>|</mo><mi>x</mi><mo>|</mo></mrow><mo>+</mo>' +
      '<mrow><mo>|</mo><mi>y</mi><mo>|</mo></mrow><mo>≥</mo><mrow><mo>|' +
      '</mo><mi>z</mi><mo>|</mo></mrow></mrow>';
  var speech = 'der Betrag von x, plus, der Betrag von y, größer oder gleich, der Betrag von z';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanAbsoluteValue Example AbsEnd01
 */
sre.ClearspeakGermanAbsoluteValue.prototype.testAbsEnd01 = function() {
  var preference = 'AbsoluteValue_AbsEnd';
  var mathml = '<mrow><mrow><mo>|</mo><mi>x</mi><mo>|</mo></mrow></mrow>';
  var speech = 'der Betrag von x, Ende Betrag';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanAbsoluteValue Example AbsEnd02
 */
sre.ClearspeakGermanAbsoluteValue.prototype.testAbsEnd02 = function() {
  var preference = 'AbsoluteValue_AbsEnd';
  var mathml = '<mrow><mrow><mo>|</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn>' +
      '</mrow><mo>|</mo></mrow></mrow>';
  var speech = 'der Betrag von x plus 1, Ende Betrag';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanAbsoluteValue Example AbsEnd03
 */
sre.ClearspeakGermanAbsoluteValue.prototype.testAbsEnd03 = function() {
  var preference = 'AbsoluteValue_AbsEnd';
  var mathml = '<mrow><mrow><mo>|</mo><mi>x</mi><mo>|</mo></mrow><mo>+</mo>' +
      '<mn>1</mn></mrow>';
  var speech = 'der Betrag von x, Ende Betrag, plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanAbsoluteValue Example AbsEnd04
 */
sre.ClearspeakGermanAbsoluteValue.prototype.testAbsEnd04 = function() {
  var preference = 'AbsoluteValue_AbsEnd';
  var mathml = '<mrow><mrow><mo>|</mo><mi>x</mi><mo>|</mo></mrow><mo>+</mo>' +
      '<mrow><mo>|</mo><mi>y</mi><mo>|</mo></mrow><mo>≥</mo><mrow><mo>|' +
      '</mo><mi>z</mi><mo>|</mo></mrow></mrow>';
  var speech = 'der Betrag von x, Ende Betrag, plus, der Betrag von y, Ende Betrag, größer oder gleich, der Betrag von z, Ende Betrag';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanAbsoluteValue Example Card01
 */
sre.ClearspeakGermanAbsoluteValue.prototype.testCard01 = function() {
  var preference = 'AbsoluteValue_Cardinality';
  var mathml = '<mrow><mrow><mo>|</mo><mi>S</mi><mo>|</mo></mrow></mrow>';
  var speech = 'die Mächtigkeit der Menge S';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanAbsoluteValue Example Determinant01
 */
sre.ClearspeakGermanAbsoluteValue.prototype.testDeterminant01 = function() {
  var preference = 'AbsoluteValue_Determinant';
  var mathml = '<mrow><mrow><mo>|</mo><mi>M</mi><mo>|</mo></mrow></mrow>';
  var speech = 'die Determinante von M';
  this.executeRuleTest(mathml, speech, preference);
};


//
// Absolute Value (Determinants)
//


/**
 * Testing ClearspeakGermanAbsoluteValue Example AbsDet01
 */
sre.ClearspeakGermanAbsoluteValue.prototype.testAbsDet01 = function() {
  var preference = 'AbsoluteValue_Auto';
  var mathml = '<mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>2</mn>' +
      '</mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd>' +
      '<mn>5</mn></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow>';
  var speech = 'die Determinante der 2 mal 2 Matrize. Zeile 1: 2, 1 Zeile 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanAbsoluteValue Example AbsDet02
 */
sre.ClearspeakGermanAbsoluteValue.prototype.testAbsDet02 = function() {
  var preference = 'AbsoluteValue_Auto';
  var mathml = '<mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>2</mn>' +
      '</mtd><mtd><mn>4</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd>' +
      '<mn>3</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>2</mn></mtd></mtr>' +
      '<mtr><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>7</mn>' +
      '</mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow>';
  var speech = 'die Determinante der 3 mal 3 Matrize. Zeile 1: 2, 4, 1 Zeile 2: 3, 5, 2 Zeile 3: 1, 4, 7';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanAbsoluteValue Example AbsDet03
 */
sre.ClearspeakGermanAbsoluteValue.prototype.testAbsDet03 = function() {
  var preference = 'AbsoluteValue_Auto';
  var mathml = '<mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>0</mn>' +
      '</mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>3</mn>' +
      '</mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd><mtd>' +
      '<mn>0</mn></mtd><mtd><mn>9</mn></mtd></mtr><mtr><mtd><mn>3</mn>' +
      '</mtd><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>1</mn>' +
      '</mtd></mtr><mtr><mtd><mn>6</mn></mtd><mtd><mn>2</mn></mtd><mtd>' +
      '<mn>9</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow><mo>|' +
      '</mo></mrow></mrow>';
  var speech = 'die Determinante der 4 mal 4 Matrize. Zeile 1: Spalte 1, 0; Spalte 2, 3; Spalte 3, 4; Spalte 4, 3. Zeile 2: Spalte 1, 2; Spalte 2, 1; Spalte 3, 0; Spalte 4, 9. Zeile 3: Spalte 1, 3; Spalte 2, 0; Spalte 3, 2; Spalte 4, 1. Zeile 4: Spalte 1, 6; Spalte 2, 2; Spalte 3, 9; Spalte 4, 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanAbsoluteValue Example AbsDet04
 */
sre.ClearspeakGermanAbsoluteValue.prototype.testAbsDet04 = function() {
  var preference = 'AbsoluteValue_Auto';
  var mathml = '<mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>2</mn>' +
      '</mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd>' +
      '<mrow><mn>5</mn><mo>+</mo><mi>x</mi></mrow></mtd></mtr></mtable>' +
      '</mrow><mo>|</mo></mrow></mrow>';
  var speech = 'die Determinante der 2 mal 2 Matrize. Zeile 1: Spalte 1, 2; Spalte 2, 1. Zeile 2: Spalte 1, 7; Spalte 2, 5 plus x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanAbsoluteValue Example AbsDet05
 */
sre.ClearspeakGermanAbsoluteValue.prototype.testAbsDet05 = function() {
  var preference = 'AbsoluteValue_Auto';
  var mathml = '<mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mrow><mn>2' +
      '</mn><mi>x</mi></mrow></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd>' +
      '<mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>|' +
      '</mo></mrow></mrow>';
  var speech = 'die Determinante der 2 mal 2 Matrize. Zeile 1: 2 x, 1 Zeile 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanAbsoluteValue Example AbsDet06
 */
sre.ClearspeakGermanAbsoluteValue.prototype.testAbsDet06 = function() {
  var preference = 'AbsoluteValue_Auto';
  var mathml = '<mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mrow><mn>2' +
      '</mn><mi>x</mi></mrow></mtd><mtd><mi>y</mi></mtd></mtr><mtr><mtd>' +
      '<mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow>' +
      '<mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr></mtable>' +
      '</mrow><mo>|</mo></mrow></mrow>';
  var speech = 'die Determinante der 2 mal 2 Matrize. Zeile 1: 2 x, y Zeile 2: ein halb, zwei drittel';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanAbsoluteValue Example AbsDet07
 */
sre.ClearspeakGermanAbsoluteValue.prototype.testAbsDet07 = function() {
  var preference = 'AbsoluteValue_Auto';
  var mathml = '<mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mrow><mfrac>' +
      '<mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>2' +
      '</mn><mn>3</mn></mfrac></mrow></mtd></mtr><mtr><mtd><mrow><mfrac>' +
      '<mn>3</mn><mn>4</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>1' +
      '</mn><mn>5</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>|</mo>' +
      '</mrow></mrow>';
  var speech = 'die Determinante der 2 mal 2 Matrize. Zeile 1: ein halb, zwei drittel Zeile 2: drei viertel, ein fünftel';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanAbsoluteValue Example AbsDet08
 */
sre.ClearspeakGermanAbsoluteValue.prototype.testAbsDet08 = function() {
  var preference = 'AbsoluteValue_AbsEnd';
  var mathml = '<mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>2</mn>' +
      '</mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd>' +
      '<mn>5</mn></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow>';
  var speech = 'die Determinante der 2 mal 2 Matrize. Zeile 1: 2, 1 Zeile 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanAbsoluteValue Example AbsDet09
 */
sre.ClearspeakGermanAbsoluteValue.prototype.testAbsDet09 = function() {
  var preference = 'AbsoluteValue_AbsEnd';
  var mathml = '<mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>2</mn>' +
      '</mtd><mtd><mn>4</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd>' +
      '<mn>3</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>2</mn></mtd></mtr>' +
      '<mtr><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>7</mn></mtd>' +
      '</mtr></mtable></mrow><mo>|</mo></mrow></mrow>';
  var speech = 'die Determinante der 3 mal 3 Matrize. Zeile 1: 2, 4, 1 Zeile 2: 3, 5, 2 Zeile 3: 1, 4, 7';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanAbsoluteValue Example AbsDet10
 */
sre.ClearspeakGermanAbsoluteValue.prototype.testAbsDet10 = function() {
  var preference = 'AbsoluteValue_AbsEnd';
  var mathml = '<mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>0</mn>' +
      '</mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>3</mn>' +
      '</mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd><mtd>' +
      '<mn>0</mn></mtd><mtd><mn>9</mn></mtd></mtr><mtr><mtd><mn>3</mn>' +
      '</mtd><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>1</mn>' +
      '</mtd></mtr><mtr><mtd><mn>6</mn></mtd><mtd><mn>2</mn></mtd><mtd>' +
      '<mn>9</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow><mo>|' +
      '</mo></mrow></mrow>';
  var speech = 'die Determinante der 4 mal 4 Matrize. Zeile 1: Spalte 1, 0; Spalte 2, 3; Spalte 3, 4; Spalte 4, 3. Zeile 2: Spalte 1, 2; Spalte 2, 1; Spalte 3, 0; Spalte 4, 9. Zeile 3: Spalte 1, 3; Spalte 2, 0; Spalte 3, 2; Spalte 4, 1. Zeile 4: Spalte 1, 6; Spalte 2, 2; Spalte 3, 9; Spalte 4, 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanAbsoluteValue Example AbsDet11
 */
sre.ClearspeakGermanAbsoluteValue.prototype.testAbsDet11 = function() {
  var preference = 'AbsoluteValue_AbsEnd';
  var mathml = '<mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>2</mn>' +
      '</mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd>' +
      '<mrow><mn>5</mn><mo>+</mo><mi>x</mi></mrow></mtd></mtr></mtable>' +
      '</mrow><mo>|</mo></mrow></mrow>';
  var speech = 'die Determinante der 2 mal 2 Matrize. Zeile 1: Spalte 1, 2; Spalte 2, 1. Zeile 2: Spalte 1, 7; Spalte 2, 5 plus x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanAbsoluteValue Example AbsDet12
 */
sre.ClearspeakGermanAbsoluteValue.prototype.testAbsDet12 = function() {
  var preference = 'AbsoluteValue_AbsEnd';
  var mathml = '<mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mrow><mn>2' +
      '</mn><mi>x</mi></mrow></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd>' +
      '<mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>|' +
      '</mo></mrow></mrow>';
  var speech = 'die Determinante der 2 mal 2 Matrize. Zeile 1: 2 x, 1 Zeile 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanAbsoluteValue Example AbsDet13
 */
sre.ClearspeakGermanAbsoluteValue.prototype.testAbsDet13 = function() {
  var preference = 'AbsoluteValue_AbsEnd';
  var mathml = '<mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mrow><mn>2' +
      '</mn><mi>x</mi></mrow></mtd><mtd><mi>y</mi></mtd></mtr><mtr><mtd>' +
      '<mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow>' +
      '<mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr></mtable>' +
      '</mrow><mo>|</mo></mrow></mrow>';
  var speech = 'die Determinante der 2 mal 2 Matrize. Zeile 1: 2 x, y Zeile 2: ein halb, zwei drittel';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanAbsoluteValue Example AbsDet14
 */
sre.ClearspeakGermanAbsoluteValue.prototype.testAbsDet14 = function() {
  var preference = 'AbsoluteValue_AbsEnd';
  var mathml = '<mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mrow><mfrac>' +
      '<mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>2' +
      '</mn><mn>3</mn></mfrac></mrow></mtd></mtr><mtr><mtd><mrow><mfrac>' +
      '<mn>3</mn><mn>4</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>1' +
      '</mn><mn>5</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>|</mo>' +
      '</mrow></mrow>';
  var speech = 'die Determinante der 2 mal 2 Matrize. Zeile 1: ein halb, zwei drittel Zeile 2: drei viertel, ein fünftel';
  this.executeRuleTest(mathml, speech, preference);
};

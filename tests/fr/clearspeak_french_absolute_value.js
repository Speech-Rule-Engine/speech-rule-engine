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


goog.provide('sre.ClearspeakFrenchAbsoluteValue');

goog.require('sre.ClearspeakFrenchRuleTest');



/**
* @constructor
* @extends {sre.ClearspeakFrenchRuleTest}
*/
sre.ClearspeakFrenchAbsoluteValue = function() {
  sre.ClearspeakFrenchAbsoluteValue.base(this, 'constructor');

  /**
* @override
  */
  this.information = 'ClearspeakFrenchAbsoluteValue rule tests.';

};
goog.inherits(sre.ClearspeakFrenchAbsoluteValue, sre.ClearspeakFrenchRuleTest);



//
// Absolute Value
//


/**
 * Testing ClearspeakFrenchAbsoluteValue Example Abs01
 */
sre.ClearspeakFrenchAbsoluteValue.prototype.testAbs01 = function() {
  var preference = 'AbsoluteValue_Auto';
  var mathml = '<mrow><mrow><mo>|</mo><mi>x</mi><mo>|</mo></mrow></mrow>';
  var speech = 'la valeur absolue de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchAbsoluteValue Example Abs02
 */
sre.ClearspeakFrenchAbsoluteValue.prototype.testAbs02 = function() {
  var preference = 'AbsoluteValue_Auto';
  var mathml = '<mrow><mrow><mo>|</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn>' +
      '</mrow><mo>|</mo></mrow></mrow>';
  var speech = 'la valeur absolue de x plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchAbsoluteValue Example Abs03
 */
sre.ClearspeakFrenchAbsoluteValue.prototype.testAbs03 = function() {
  var preference = 'AbsoluteValue_Auto';
  var mathml = '<mrow><mrow><mo>|</mo><mi>x</mi><mo>|</mo></mrow><mo>+</mo>' +
      '<mn>1</mn></mrow>';
  var speech = 'la valeur absolue de x, plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchAbsoluteValue Example Abs04
 */
sre.ClearspeakFrenchAbsoluteValue.prototype.testAbs04 = function() {
  var preference = 'AbsoluteValue_Auto';
  var mathml = '<mrow><mrow><mo>|</mo><mi>x</mi><mo>|</mo></mrow><mo>+</mo>' +
      '<mrow><mo>|</mo><mi>y</mi><mo>|</mo></mrow><mo>≥</mo><mrow><mo>|' +
      '</mo><mi>z</mi><mo>|</mo></mrow></mrow>';
  var speech = 'la valeur absolue de x, plus, la valeur absolue de y, plus grand ou égal à, la valeur absolue de z';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchAbsoluteValue Example AbsEnd01
 */
sre.ClearspeakFrenchAbsoluteValue.prototype.testAbsEnd01 = function() {
  var preference = 'AbsoluteValue_AbsEnd';
  var mathml = '<mrow><mrow><mo>|</mo><mi>x</mi><mo>|</mo></mrow></mrow>';
  var speech = 'la valeur absolue de x, fin de valeur absolue';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchAbsoluteValue Example AbsEnd02
 */
sre.ClearspeakFrenchAbsoluteValue.prototype.testAbsEnd02 = function() {
  var preference = 'AbsoluteValue_AbsEnd';
  var mathml = '<mrow><mrow><mo>|</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn>' +
      '</mrow><mo>|</mo></mrow></mrow>';
  var speech = 'la valeur absolue de x plus 1, fin de valeur absolue';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchAbsoluteValue Example AbsEnd03
 */
sre.ClearspeakFrenchAbsoluteValue.prototype.testAbsEnd03 = function() {
  var preference = 'AbsoluteValue_AbsEnd';
  var mathml = '<mrow><mrow><mo>|</mo><mi>x</mi><mo>|</mo></mrow><mo>+</mo>' +
      '<mn>1</mn></mrow>';
  var speech = 'la valeur absolue de x, fin de valeur absolue, plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchAbsoluteValue Example AbsEnd04
 */
sre.ClearspeakFrenchAbsoluteValue.prototype.testAbsEnd04 = function() {
  var preference = 'AbsoluteValue_AbsEnd';
  var mathml = '<mrow><mrow><mo>|</mo><mi>x</mi><mo>|</mo></mrow><mo>+</mo>' +
      '<mrow><mo>|</mo><mi>y</mi><mo>|</mo></mrow><mo>≥</mo><mrow><mo>|' +
      '</mo><mi>z</mi><mo>|</mo></mrow></mrow>';
  var speech = 'la valeur absolue de x, fin de valeur absolue, plus, la valeur absolue de y, fin de valeur absolue, plus grand ou égal à, la valeur absolue de z, fin de valeur absolue';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchAbsoluteValue Example Card01
 */
sre.ClearspeakFrenchAbsoluteValue.prototype.testCard01 = function() {
  var preference = 'AbsoluteValue_Cardinality';
  var mathml = '<mrow><mrow><mo>|</mo><mi>S</mi><mo>|</mo></mrow></mrow>';
  var speech = 'la cardinalité de S';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchAbsoluteValue Example Determinant01
 */
sre.ClearspeakFrenchAbsoluteValue.prototype.testDeterminant01 = function() {
  var preference = 'AbsoluteValue_Determinant';
  var mathml = '<mrow><mrow><mo>|</mo><mi>M</mi><mo>|</mo></mrow></mrow>';
  var speech = 'le déterminant de M';
  this.executeRuleTest(mathml, speech, preference);
};


//
// Absolute Value (Determinants)
//


/**
 * Testing ClearspeakFrenchAbsoluteValue Example AbsDet01
 */
sre.ClearspeakFrenchAbsoluteValue.prototype.testAbsDet01 = function() {
  var preference = 'AbsoluteValue_Auto';
  var mathml = '<mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>2</mn>' +
      '</mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd>' +
      '<mn>5</mn></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow>';
  var speech = 'le déterminant de la matrice de dimension 2 par 2. rangée 1: 2, 1 rangée 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchAbsoluteValue Example AbsDet02
 */
sre.ClearspeakFrenchAbsoluteValue.prototype.testAbsDet02 = function() {
  var preference = 'AbsoluteValue_Auto';
  var mathml = '<mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>2</mn>' +
      '</mtd><mtd><mn>4</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd>' +
      '<mn>3</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>2</mn></mtd></mtr>' +
      '<mtr><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>7</mn>' +
      '</mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow>';
  var speech = 'le déterminant de la matrice de dimension 3 par 3. rangée 1: 2, 4, 1 rangée 2: 3, 5, 2 rangée 3: 1, 4, 7';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchAbsoluteValue Example AbsDet03
 */
sre.ClearspeakFrenchAbsoluteValue.prototype.testAbsDet03 = function() {
  var preference = 'AbsoluteValue_Auto';
  var mathml = '<mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>0</mn>' +
      '</mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>3</mn>' +
      '</mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd><mtd>' +
      '<mn>0</mn></mtd><mtd><mn>9</mn></mtd></mtr><mtr><mtd><mn>3</mn>' +
      '</mtd><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>1</mn>' +
      '</mtd></mtr><mtr><mtd><mn>6</mn></mtd><mtd><mn>2</mn></mtd><mtd>' +
      '<mn>9</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow><mo>|' +
      '</mo></mrow></mrow>';
  var speech = 'le déterminant de la matrice de dimension 4 par 4. rangée 1: colonne 1, 0; colonne 2, 3; colonne 3, 4; colonne 4, 3. rangée 2: colonne 1, 2; colonne 2, 1; colonne 3, 0; colonne 4, 9. rangée 3: colonne 1, 3; colonne 2, 0; colonne 3, 2; colonne 4, 1. rangée 4: colonne 1, 6; colonne 2, 2; colonne 3, 9; colonne 4, 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchAbsoluteValue Example AbsDet04
 */
sre.ClearspeakFrenchAbsoluteValue.prototype.testAbsDet04 = function() {
  var preference = 'AbsoluteValue_Auto';
  var mathml = '<mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>2</mn>' +
      '</mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd>' +
      '<mrow><mn>5</mn><mo>+</mo><mi>x</mi></mrow></mtd></mtr></mtable>' +
      '</mrow><mo>|</mo></mrow></mrow>';
  var speech = 'le déterminant de la matrice de dimension 2 par 2. rangée 1: colonne 1, 2; colonne 2, 1. rangée 2: colonne 1, 7; colonne 2, 5 plus x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchAbsoluteValue Example AbsDet05
 */
sre.ClearspeakFrenchAbsoluteValue.prototype.testAbsDet05 = function() {
  var preference = 'AbsoluteValue_Auto';
  var mathml = '<mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mrow><mn>2' +
      '</mn><mi>x</mi></mrow></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd>' +
      '<mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>|' +
      '</mo></mrow></mrow>';
  var speech = 'le déterminant de la matrice de dimension 2 par 2. rangée 1: 2 x, 1 rangée 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchAbsoluteValue Example AbsDet06
 */
sre.ClearspeakFrenchAbsoluteValue.prototype.testAbsDet06 = function() {
  var preference = 'AbsoluteValue_Auto';
  var mathml = '<mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mrow><mn>2' +
      '</mn><mi>x</mi></mrow></mtd><mtd><mi>y</mi></mtd></mtr><mtr><mtd>' +
      '<mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow>' +
      '<mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr></mtable>' +
      '</mrow><mo>|</mo></mrow></mrow>';
  var speech = 'le déterminant de la matrice de dimension 2 par 2. rangée 1: 2 x, y rangée 2: un-demi, deux-tiers';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchAbsoluteValue Example AbsDet07
 */
sre.ClearspeakFrenchAbsoluteValue.prototype.testAbsDet07 = function() {
  var preference = 'AbsoluteValue_Auto';
  var mathml = '<mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mrow><mfrac>' +
      '<mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>2' +
      '</mn><mn>3</mn></mfrac></mrow></mtd></mtr><mtr><mtd><mrow><mfrac>' +
      '<mn>3</mn><mn>4</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>1' +
      '</mn><mn>5</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>|</mo>' +
      '</mrow></mrow>';
  var speech = 'le déterminant de la matrice de dimension 2 par 2. rangée 1: un-demi, deux-tiers rangée 2: trois-quarts, un-cinquième';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchAbsoluteValue Example AbsDet08
 */
sre.ClearspeakFrenchAbsoluteValue.prototype.testAbsDet08 = function() {
  var preference = 'AbsoluteValue_AbsEnd';
  var mathml = '<mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>2</mn>' +
      '</mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd>' +
      '<mn>5</mn></mtd></mtr></mtable></mrow><mo>|</mo></mrow></mrow>';
  var speech = 'le déterminant de la matrice de dimension 2 par 2. rangée 1: 2, 1 rangée 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchAbsoluteValue Example AbsDet09
 */
sre.ClearspeakFrenchAbsoluteValue.prototype.testAbsDet09 = function() {
  var preference = 'AbsoluteValue_AbsEnd';
  var mathml = '<mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>2</mn>' +
      '</mtd><mtd><mn>4</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd>' +
      '<mn>3</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>2</mn></mtd></mtr>' +
      '<mtr><mtd><mn>1</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>7</mn></mtd>' +
      '</mtr></mtable></mrow><mo>|</mo></mrow></mrow>';
  var speech = 'le déterminant de la matrice de dimension 3 par 3. rangée 1: 2, 4, 1 rangée 2: 3, 5, 2 rangée 3: 1, 4, 7';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchAbsoluteValue Example AbsDet10
 */
sre.ClearspeakFrenchAbsoluteValue.prototype.testAbsDet10 = function() {
  var preference = 'AbsoluteValue_AbsEnd';
  var mathml = '<mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>0</mn>' +
      '</mtd><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd><mtd><mn>3</mn>' +
      '</mtd></mtr><mtr><mtd><mn>2</mn></mtd><mtd><mn>1</mn></mtd><mtd>' +
      '<mn>0</mn></mtd><mtd><mn>9</mn></mtd></mtr><mtr><mtd><mn>3</mn>' +
      '</mtd><mtd><mn>0</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>1</mn>' +
      '</mtd></mtr><mtr><mtd><mn>6</mn></mtd><mtd><mn>2</mn></mtd><mtd>' +
      '<mn>9</mn></mtd><mtd><mn>0</mn></mtd></mtr></mtable></mrow><mo>|' +
      '</mo></mrow></mrow>';
  var speech = 'le déterminant de la matrice de dimension 4 par 4. rangée 1: colonne 1, 0; colonne 2, 3; colonne 3, 4; colonne 4, 3. rangée 2: colonne 1, 2; colonne 2, 1; colonne 3, 0; colonne 4, 9. rangée 3: colonne 1, 3; colonne 2, 0; colonne 3, 2; colonne 4, 1. rangée 4: colonne 1, 6; colonne 2, 2; colonne 3, 9; colonne 4, 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchAbsoluteValue Example AbsDet11
 */
sre.ClearspeakFrenchAbsoluteValue.prototype.testAbsDet11 = function() {
  var preference = 'AbsoluteValue_AbsEnd';
  var mathml = '<mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mn>2</mn>' +
      '</mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd>' +
      '<mrow><mn>5</mn><mo>+</mo><mi>x</mi></mrow></mtd></mtr></mtable>' +
      '</mrow><mo>|</mo></mrow></mrow>';
  var speech = 'le déterminant de la matrice de dimension 2 par 2. rangée 1: colonne 1, 2; colonne 2, 1. rangée 2: colonne 1, 7; colonne 2, 5 plus x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchAbsoluteValue Example AbsDet12
 */
sre.ClearspeakFrenchAbsoluteValue.prototype.testAbsDet12 = function() {
  var preference = 'AbsoluteValue_AbsEnd';
  var mathml = '<mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mrow><mn>2' +
      '</mn><mi>x</mi></mrow></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd>' +
      '<mn>7</mn></mtd><mtd><mn>5</mn></mtd></mtr></mtable></mrow><mo>|' +
      '</mo></mrow></mrow>';
  var speech = 'le déterminant de la matrice de dimension 2 par 2. rangée 1: 2 x, 1 rangée 2: 7, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchAbsoluteValue Example AbsDet13
 */
sre.ClearspeakFrenchAbsoluteValue.prototype.testAbsDet13 = function() {
  var preference = 'AbsoluteValue_AbsEnd';
  var mathml = '<mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mrow><mn>2' +
      '</mn><mi>x</mi></mrow></mtd><mtd><mi>y</mi></mtd></mtr><mtr><mtd>' +
      '<mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow>' +
      '<mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mtd></mtr></mtable>' +
      '</mrow><mo>|</mo></mrow></mrow>';
  var speech = 'le déterminant de la matrice de dimension 2 par 2. rangée 1: 2 x, y rangée 2: un-demi, deux-tiers';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchAbsoluteValue Example AbsDet14
 */
sre.ClearspeakFrenchAbsoluteValue.prototype.testAbsDet14 = function() {
  var preference = 'AbsoluteValue_AbsEnd';
  var mathml = '<mrow><mrow><mo>|</mo><mrow><mtable><mtr><mtd><mrow><mfrac>' +
      '<mn>1</mn><mn>2</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>2' +
      '</mn><mn>3</mn></mfrac></mrow></mtd></mtr><mtr><mtd><mrow><mfrac>' +
      '<mn>3</mn><mn>4</mn></mfrac></mrow></mtd><mtd><mrow><mfrac><mn>1' +
      '</mn><mn>5</mn></mfrac></mrow></mtd></mtr></mtable></mrow><mo>|</mo>' +
      '</mrow></mrow>';
  var speech = 'le déterminant de la matrice de dimension 2 par 2. rangée 1: un-demi, deux-tiers rangée 2: trois-quarts, un-cinquième';
  this.executeRuleTest(mathml, speech, preference);
};

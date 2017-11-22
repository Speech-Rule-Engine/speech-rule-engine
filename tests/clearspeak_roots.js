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


goog.provide('sre.ClearspeakRoots');

goog.require('sre.ClearspeakRuleTest');



/**
* @constructor
* @extends {sre.ClearspeakRuleTest}
*/
sre.ClearspeakRoots = function() {
sre.ClearspeakRoots.base(this, 'constructor');

/**
* @override
*/
this.information = 'ClearspeakRoots rule tests.';

};
goog.inherits(sre.ClearspeakRoots, sre.ClearspeakRuleTest);



//
// Roots
//


/**
 * Testing ClearspeakRoots Example Root001
 */
sre.ClearspeakRoots.prototype.testRoot001 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<mrow><msqrt><mn>2</mn></msqrt></mrow>';
  var speech = 'the square root of 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root002
 */
sre.ClearspeakRoots.prototype.testRoot002 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mn>3</mn><mo>+</mo><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = '3 plus the square root of 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root003
 */
sre.ClearspeakRoots.prototype.testRoot003 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mn>3</mn><mo>±</mo><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = '3 plus or minus the square root of 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root004
 */
sre.ClearspeakRoots.prototype.testRoot004 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mn>3</mn><mo>∓</mo><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = '3 minus or plus the square root of 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root005
 */
sre.ClearspeakRoots.prototype.testRoot005 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mo>−</mo><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = 'the negative square root of 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root006
 */
sre.ClearspeakRoots.prototype.testRoot006 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mn>3</mn><mo>−</mo><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = '3 minus the square root of 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root007
 */
sre.ClearspeakRoots.prototype.testRoot007 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mn>3</mn><mo>+</mo><mo>−</mo><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = '3 plus the negative square root of 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root008
 */
sre.ClearspeakRoots.prototype.testRoot008 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mn>3</mn><mo>−</mo><mo>−</mo><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = '3 minus the negative square root of 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root009
 */
sre.ClearspeakRoots.prototype.testRoot009 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mn>3</mn><mo>+</mo><mrow><mo>(</mo><mrow><mo>−</mo><msqrt><mn>2</mn></msqrt></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '3 plus, open paren, the negative square root of 2, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root010
 */
sre.ClearspeakRoots.prototype.testRoot010 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mn>3</mn><mo>−</mo><mrow><mo>(</mo><mrow><mo>−</mo><msqrt><mn>2</mn></msqrt></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '3 minus, open paren, the negative square root of 2, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root011
 */
sre.ClearspeakRoots.prototype.testRoot011 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><msqrt><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow></msqrt></mrow></math>';
  var speech = 'the square root of x plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root011a
 */
sre.ClearspeakRoots.prototype.testRoot011a = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><msqrt><mi>x</mi></msqrt><mo>+</mo><mn>1</mn></mrow></math>';
  var speech = 'the square root of x, plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root012
 */
sre.ClearspeakRoots.prototype.testRoot012 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mo>−</mo><msqrt><mi>x</mi></msqrt></mrow></math>';
  var speech = 'the negative square root of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root013
 */
sre.ClearspeakRoots.prototype.testRoot013 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><msqrt><mi>x</mi></msqrt></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup></mrow></math>';
  var speech = 'open paren, the square root of x, close paren, squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root014
 */
sre.ClearspeakRoots.prototype.testRoot014 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mo>−</mo><msup><mrow><mrow><mo>(</mo><mrow><msqrt><mi>x</mi></msqrt></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup></mrow></math>';
  var speech = 'negative, open paren, the square root of x, close paren, squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root015
 */
sre.ClearspeakRoots.prototype.testRoot015 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><msup><mrow><msqrt><mi>x</mi></msqrt></mrow><mn>2</mn></msup></mrow></math>';
  var speech = 'the square root of x, squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root016
 */
sre.ClearspeakRoots.prototype.testRoot016 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><msqrt><mrow><msup><mi>x</mi><mn>2</mn></msup></mrow></msqrt></mrow></math>';
  var speech = 'the square root of x squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root017
 */
sre.ClearspeakRoots.prototype.testRoot017 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><msqrt><mrow><msup><mi>x</mi><mn>2</mn></msup><mo>+</mo><msup><mi>y</mi><mn>2</mn></msup></mrow></msqrt></mrow></math>';
  var speech = 'the square root of x squared plus y squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root018
 */
sre.ClearspeakRoots.prototype.testRoot018 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><msqrt><mrow><msub><mi>x</mi><mn>1</mn></msub><msup><mrow/><mn>2</mn></msup><mo>+</mo><msub><mi>x</mi><mn>2</mn></msub><msup><mrow/><mn>2</mn></msup></mrow></msqrt></mrow></math>';
  var speech = 'the square root of, x sub 1, squared plus, x sub 2, squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root019
 */
sre.ClearspeakRoots.prototype.testRoot019 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><msqrt><mrow><msup><mrow><mrow><mo>(</mo><mrow><msub><mi>x</mi><mn>2</mn></msub><mo>−</mo><msub><mi>x</mi><mn>1</mn></msub></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup><mo>+</mo><msup><mrow><mrow><mo>(</mo><mrow><msub><mi>y</mi><mn>2</mn></msub><mo>−</mo><msub><mi>y</mi><mn>1</mn></msub></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup></mrow></msqrt></mrow></math>';
  var speech = 'the square root of, open paren, x sub 2, minus, x sub 1, close paren, squared plus, open paren, y sub 2, minus, y sub 1, close paren, squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root020
 */
sre.ClearspeakRoots.prototype.testRoot020 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><msqrt><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></msqrt></mrow></math>';
  var speech = 'the square root of one half';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root021
 */
sre.ClearspeakRoots.prototype.testRoot021 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><msqrt><mrow><mfrac><mrow><mn>23</mn></mrow><mrow><mn>66</mn></mrow></mfrac></mrow></msqrt></mrow></math>';
  var speech = 'the square root of, 23 over 66';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root022
 */
sre.ClearspeakRoots.prototype.testRoot022 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><msqrt><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>5</mn></mrow></mfrac></mrow></msqrt></mrow></math>';
  var speech = 'the square root of, the fraction with numerator x plus 1, and denominator 2 x, plus 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root023
 */
sre.ClearspeakRoots.prototype.testRoot023 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mo>−</mo><mi>b</mi><mo>±</mo><msqrt><mrow><msup><mi>b</mi><mn>2</mn></msup><mo>−</mo><mn>4</mn><mi>a</mi><mi>c</mi></mrow></msqrt></mrow><mrow><mn>2</mn><mi>a</mi></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator negative b plus or minus the square root of b squared minus 4 a c, and denominator 2 a';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root024
 */
sre.ClearspeakRoots.prototype.testRoot024 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = 'the positive square root of 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root025
 */
sre.ClearspeakRoots.prototype.testRoot025 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mn>3</mn><mo>+</mo><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = '3 plus the positive square root of 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root026
 */
sre.ClearspeakRoots.prototype.testRoot026 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mn>3</mn><mo>±</mo><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = '3 plus or minus the square root of 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root027
 */
sre.ClearspeakRoots.prototype.testRoot027 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mn>3</mn><mo>∓</mo><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = '3 minus or plus the square root of 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root028
 */
sre.ClearspeakRoots.prototype.testRoot028 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mo>−</mo><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = 'the negative square root of 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root029
 */
sre.ClearspeakRoots.prototype.testRoot029 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mn>3</mn><mo>−</mo><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = '3 minus the positive square root of 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root030
 */
sre.ClearspeakRoots.prototype.testRoot030 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mn>3</mn><mo>+</mo><mo>−</mo><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = '3 plus the negative square root of 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root031
 */
sre.ClearspeakRoots.prototype.testRoot031 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mn>3</mn><mo>−</mo><mo>−</mo><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = '3 minus the negative square root of 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root032
 */
sre.ClearspeakRoots.prototype.testRoot032 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mn>3</mn><mo>+</mo><mrow><mo>(</mo><mrow><mo>−</mo><msqrt><mn>2</mn></msqrt></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '3 plus, open paren, the negative square root of 2, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root033
 */
sre.ClearspeakRoots.prototype.testRoot033 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mn>3</mn><mo>−</mo><mrow><mo>(</mo><mrow><mo>−</mo><msqrt><mn>2</mn></msqrt></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '3 minus, open paren, the negative square root of 2, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root034
 */
sre.ClearspeakRoots.prototype.testRoot034 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><msqrt><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow></msqrt></mrow></math>';
  var speech = 'the positive square root of x plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root034a
 */
sre.ClearspeakRoots.prototype.testRoot034a = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><msqrt><mi>x</mi></msqrt><mo>+</mo><mn>1</mn></mrow></math>';
  var speech = 'the positive square root of x, plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root035
 */
sre.ClearspeakRoots.prototype.testRoot035 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mo>−</mo><msqrt><mi>x</mi></msqrt></mrow></math>';
  var speech = 'the negative square root of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root036
 */
sre.ClearspeakRoots.prototype.testRoot036 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><msqrt><mi>x</mi></msqrt></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup></mrow></math>';
  var speech = 'open paren, the positive square root of x, close paren, squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root037
 */
sre.ClearspeakRoots.prototype.testRoot037 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mo>−</mo><msqrt><mi>x</mi></msqrt></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup></mrow></math>';
  var speech = 'open paren, the negative square root of x, close paren, squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root038
 */
sre.ClearspeakRoots.prototype.testRoot038 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mo>−</mo><msup><mrow><mrow><mo>(</mo><mrow><msqrt><mi>x</mi></msqrt></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup></mrow></math>';
  var speech = 'negative, open paren, the positive square root of x, close paren, squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root039
 */
sre.ClearspeakRoots.prototype.testRoot039 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><msup><mrow><msqrt><mi>x</mi></msqrt></mrow><mn>2</mn></msup></mrow></math>';
  var speech = 'the positive square root of x, squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root040
 */
sre.ClearspeakRoots.prototype.testRoot040 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><msqrt><mrow><msup><mi>x</mi><mn>2</mn></msup></mrow></msqrt></mrow></math>';
  var speech = 'the positive square root of x squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root041
 */
sre.ClearspeakRoots.prototype.testRoot041 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><msqrt><mrow><msup><mi>x</mi><mn>2</mn></msup><mo>+</mo><msup><mi>y</mi><mn>2</mn></msup></mrow></msqrt></mrow></math>';
  var speech = 'the positive square root of x squared plus y squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root042
 */
sre.ClearspeakRoots.prototype.testRoot042 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><msqrt><mrow><msub><mi>x</mi><mn>1</mn></msub><msup><mrow/><mn>2</mn></msup><mo>+</mo><msub><mi>x</mi><mn>2</mn></msub><msup><mrow/><mn>2</mn></msup></mrow></msqrt></mrow></math>';
  var speech = 'the positive square root of, x sub 1, squared plus, x sub 2, squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root043
 */
sre.ClearspeakRoots.prototype.testRoot043 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><msqrt><mrow><msup><mrow><mrow><mo>(</mo><mrow><msub><mi>x</mi><mn>2</mn></msub><mo>−</mo><msub><mi>x</mi><mn>1</mn></msub></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup><mo>+</mo><msup><mrow><mrow><mo>(</mo><mrow><msub><mi>y</mi><mn>2</mn></msub><mo>−</mo><msub><mi>y</mi><mn>1</mn></msub></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup></mrow></msqrt></mrow></math>';
  var speech = 'the positive square root of, open paren, x sub 2, minus, x sub 1, close paren, squared plus, open paren, y sub 2, minus, y sub 1, close paren, squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root044
 */
sre.ClearspeakRoots.prototype.testRoot044 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><msqrt><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></msqrt></mrow></math>';
  var speech = 'the positive square root of one half';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root045
 */
sre.ClearspeakRoots.prototype.testRoot045 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><msqrt><mrow><mfrac><mrow><mn>23</mn></mrow><mrow><mn>66</mn></mrow></mfrac></mrow></msqrt></mrow></math>';
  var speech = 'the positive square root of, 23 over 66';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root046
 */
sre.ClearspeakRoots.prototype.testRoot046 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><msqrt><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>5</mn></mrow></mfrac></mrow></msqrt></mrow></math>';
  var speech = 'the positive square root of, the fraction with numerator x plus 1, and denominator 2 x, plus 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root047
 */
sre.ClearspeakRoots.prototype.testRoot047 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mfrac><mrow><mo>−</mo><mi>b</mi><mo>±</mo><msqrt><mrow><msup><mi>b</mi><mn>2</mn></msup><mo>−</mo><mn>4</mn><mi>a</mi><mi>c</mi></mrow></msqrt></mrow><mrow><mn>2</mn><mi>a</mi></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator negative b plus or minus the square root of b squared minus 4 a c, and denominator 2 a';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root048
 */
sre.ClearspeakRoots.prototype.testRoot048 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = 'the square root of 2, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root049
 */
sre.ClearspeakRoots.prototype.testRoot049 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mn>3</mn><mo>+</mo><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = '3 plus the square root of 2, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root050
 */
sre.ClearspeakRoots.prototype.testRoot050 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mn>3</mn><mo>±</mo><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = '3 plus or minus the square root of 2, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root051
 */
sre.ClearspeakRoots.prototype.testRoot051 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mn>3</mn><mo>∓</mo><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = '3 minus or plus the square root of 2, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root052
 */
sre.ClearspeakRoots.prototype.testRoot052 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mo>−</mo><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = 'the negative square root of 2, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root053
 */
sre.ClearspeakRoots.prototype.testRoot053 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mn>3</mn><mo>−</mo><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = '3 minus the square root of 2, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root054
 */
sre.ClearspeakRoots.prototype.testRoot054 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mn>3</mn><mo>+</mo><mo>−</mo><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = '3 plus the negative square root of 2, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root055
 */
sre.ClearspeakRoots.prototype.testRoot055 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mn>3</mn><mo>−</mo><mo>−</mo><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = '3 minus the negative square root of 2, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root056
 */
sre.ClearspeakRoots.prototype.testRoot056 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mn>3</mn><mo>+</mo><mrow><mo>(</mo><mrow><mo>−</mo><msqrt><mn>2</mn></msqrt></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '3 plus, open paren, the negative square root of 2, end root, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root057
 */
sre.ClearspeakRoots.prototype.testRoot057 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mn>3</mn><mo>−</mo><mrow><mo>(</mo><mrow><mo>−</mo><msqrt><mn>2</mn></msqrt></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '3 minus, open paren, the negative square root of 2, end root, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root058
 */
sre.ClearspeakRoots.prototype.testRoot058 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><msqrt><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow></msqrt></mrow></math>';
  var speech = 'the square root of x plus 1, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root058a
 */
sre.ClearspeakRoots.prototype.testRoot058a = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><msqrt><mi>x</mi></msqrt><mo>+</mo><mn>1</mn></mrow></math>';
  var speech = 'the square root of x, end root, plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root059
 */
sre.ClearspeakRoots.prototype.testRoot059 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mo>−</mo><msqrt><mi>x</mi></msqrt></mrow></math>';
  var speech = 'the negative square root of x, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root060
 */
sre.ClearspeakRoots.prototype.testRoot060 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><msqrt><mi>x</mi></msqrt></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup></mrow></math>';
  var speech = 'open paren, the square root of x, end root, close paren, squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root061
 */
sre.ClearspeakRoots.prototype.testRoot061 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mo>−</mo><msup><mrow><mrow><mo>(</mo><mrow><msqrt><mi>x</mi></msqrt></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup></mrow></math>';
  var speech = 'negative, open paren, the square root of x, end root, close paren, squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root062
 */
sre.ClearspeakRoots.prototype.testRoot062 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><msup><mrow><msqrt><mi>x</mi></msqrt></mrow><mn>2</mn></msup></mrow></math>';
  var speech = 'the square root of x, end root, squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root063
 */
sre.ClearspeakRoots.prototype.testRoot063 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><msqrt><mrow><msup><mi>x</mi><mn>2</mn></msup></mrow></msqrt></mrow></math>';
  var speech = 'the square root of x squared, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root064
 */
sre.ClearspeakRoots.prototype.testRoot064 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><msqrt><mrow><msup><mi>x</mi><mn>2</mn></msup><mo>+</mo><msup><mi>y</mi><mn>2</mn></msup></mrow></msqrt></mrow></math>';
  var speech = 'the square root of x squared plus y squared, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root065
 */
sre.ClearspeakRoots.prototype.testRoot065 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><msqrt><mrow><msub><mi>x</mi><mn>1</mn></msub><msup><mrow/><mn>2</mn></msup><mo>+</mo><msub><mi>x</mi><mn>2</mn></msub><msup><mrow/><mn>2</mn></msup></mrow></msqrt></mrow></math>';
  var speech = 'the square root of, x sub 1, squared plus, x sub 2, squared, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root066
 */
sre.ClearspeakRoots.prototype.testRoot066 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><msqrt><mrow><msup><mrow><mrow><mo>(</mo><mrow><msub><mi>x</mi><mn>2</mn></msub><mo>−</mo><msub><mi>x</mi><mn>1</mn></msub></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup><mo>+</mo><msup><mrow><mrow><mo>(</mo><mrow><msub><mi>y</mi><mn>2</mn></msub><mo>−</mo><msub><mi>y</mi><mn>1</mn></msub></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup></mrow></msqrt></mrow></math>';
  var speech = 'the square root of, open paren, x sub 2, minus, x sub 1, close paren, squared plus, open paren, y sub 2, minus, y sub 1, close paren, squared, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root067
 */
sre.ClearspeakRoots.prototype.testRoot067 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><msqrt><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></msqrt></mrow></math>';
  var speech = 'the square root of one half, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root068
 */
sre.ClearspeakRoots.prototype.testRoot068 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><msqrt><mrow><mfrac><mrow><mn>23</mn></mrow><mrow><mn>66</mn></mrow></mfrac></mrow></msqrt></mrow></math>';
  var speech = 'the square root of, 23 over 66, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root069
 */
sre.ClearspeakRoots.prototype.testRoot069 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><msqrt><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>5</mn></mrow></mfrac></mrow></msqrt></mrow></math>';
  var speech = 'the square root of, the fraction with numerator x plus 1, and denominator 2 x, plus 5, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root070
 */
sre.ClearspeakRoots.prototype.testRoot070 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mfrac><mrow><mo>−</mo><mi>b</mi><mo>±</mo><msqrt><mrow><msup><mi>b</mi><mn>2</mn></msup><mo>−</mo><mn>4</mn><mi>a</mi><mi>c</mi></mrow></msqrt></mrow><mrow><mn>2</mn><mi>a</mi></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator negative b plus or minus the square root of b squared minus 4 a c, end root, and denominator 2 a';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root071
 */
sre.ClearspeakRoots.prototype.testRoot071 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = 'the positive square root of 2, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root072
 */
sre.ClearspeakRoots.prototype.testRoot072 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mn>3</mn><mo>+</mo><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = '3 plus the positive square root of 2, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root073
 */
sre.ClearspeakRoots.prototype.testRoot073 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mn>3</mn><mo>±</mo><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = '3 plus or minus the square root of 2, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root074
 */
sre.ClearspeakRoots.prototype.testRoot074 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mn>3</mn><mo>∓</mo><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = '3 minus or plus the square root of 2, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root075
 */
sre.ClearspeakRoots.prototype.testRoot075 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mo>−</mo><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = 'the negative square root of 2, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root076
 */
sre.ClearspeakRoots.prototype.testRoot076 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mn>3</mn><mo>−</mo><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = '3 minus the positive square root of 2, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root077
 */
sre.ClearspeakRoots.prototype.testRoot077 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mn>3</mn><mo>+</mo><mo>−</mo><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = '3 plus the negative square root of 2, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root078
 */
sre.ClearspeakRoots.prototype.testRoot078 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mn>3</mn><mo>−</mo><mo>−</mo><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = '3 minus the negative square root of 2, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root079
 */
sre.ClearspeakRoots.prototype.testRoot079 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mn>3</mn><mo>+</mo><mrow><mo>(</mo><mrow><mo>−</mo><msqrt><mn>2</mn></msqrt></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '3 plus, open paren, the negative square root of 2, end root, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root080
 */
sre.ClearspeakRoots.prototype.testRoot080 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mn>3</mn><mo>−</mo><mrow><mo>(</mo><mrow><mo>−</mo><msqrt><mn>2</mn></msqrt></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '3 minus, open paren, the negative square root of 2, end root, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root081
 */
sre.ClearspeakRoots.prototype.testRoot081 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><msqrt><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow></msqrt></mrow></math>';
  var speech = 'the positive square root of x plus 1, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root081a
 */
sre.ClearspeakRoots.prototype.testRoot081a = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><msqrt><mi>x</mi></msqrt><mo>+</mo><mn>1</mn></mrow></math>';
  var speech = 'the positive square root of x, end root, plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root082
 */
sre.ClearspeakRoots.prototype.testRoot082 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mo>−</mo><msqrt><mi>x</mi></msqrt></mrow></math>';
  var speech = 'the negative square root of x, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root083
 */
sre.ClearspeakRoots.prototype.testRoot083 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><msqrt><mi>x</mi></msqrt></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup></mrow></math>';
  var speech = 'open paren, the positive square root of x, end root, close paren, squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root084
 */
sre.ClearspeakRoots.prototype.testRoot084 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mo>−</mo><msqrt><mi>x</mi></msqrt></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup></mrow></math>';
  var speech = 'open paren, the negative square root of x, end root, close paren, squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root085
 */
sre.ClearspeakRoots.prototype.testRoot085 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><msup><mrow><msqrt><mi>x</mi></msqrt></mrow><mn>2</mn></msup></mrow></math>';
  var speech = 'the positive square root of x, end root, squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root086
 */
sre.ClearspeakRoots.prototype.testRoot086 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><msqrt><mrow><msup><mi>x</mi><mn>2</mn></msup></mrow></msqrt></mrow></math>';
  var speech = 'the positive square root of x squared, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root087
 */
sre.ClearspeakRoots.prototype.testRoot087 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><msqrt><mrow><msup><mi>x</mi><mn>2</mn></msup><mo>+</mo><msup><mi>y</mi><mn>2</mn></msup></mrow></msqrt></mrow></math>';
  var speech = 'the positive square root of x squared plus y squared, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root088
 */
sre.ClearspeakRoots.prototype.testRoot088 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><msqrt><mrow><msub><mi>x</mi><mn>1</mn></msub><msup><mrow/><mn>2</mn></msup><mo>+</mo><msub><mi>x</mi><mn>2</mn></msub><msup><mrow/><mn>2</mn></msup></mrow></msqrt></mrow></math>';
  var speech = 'the positive square root of, x sub 1, squared plus, x sub 2, squared, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root089
 */
sre.ClearspeakRoots.prototype.testRoot089 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><msqrt><mrow><msup><mrow><mrow><mo>(</mo><mrow><msub><mi>x</mi><mn>2</mn></msub><mo>−</mo><msub><mi>x</mi><mn>1</mn></msub></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup><mo>+</mo><msup><mrow><mrow><mo>(</mo><mrow><msub><mi>y</mi><mn>2</mn></msub><mo>−</mo><msub><mi>y</mi><mn>1</mn></msub></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup></mrow></msqrt></mrow></math>';
  var speech = 'the positive square root of, open paren, x sub 2, minus, x sub 1, close paren, squared plus, open paren, y sub 2, minus, y sub 1, close paren, squared, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root090
 */
sre.ClearspeakRoots.prototype.testRoot090 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><msqrt><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></msqrt></mrow></math>';
  var speech = 'the positive square root of one half, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root091
 */
sre.ClearspeakRoots.prototype.testRoot091 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><msqrt><mrow><mfrac><mrow><mn>23</mn></mrow><mrow><mn>66</mn></mrow></mfrac></mrow></msqrt></mrow></math>';
  var speech = 'the positive square root of, 23 over 66, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root092
 */
sre.ClearspeakRoots.prototype.testRoot092 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><msqrt><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>5</mn></mrow></mfrac></mrow></msqrt></mrow></math>';
  var speech = 'the positive square root of, the fraction with numerator x plus 1, and denominator 2 x, plus 5, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root093
 */
sre.ClearspeakRoots.prototype.testRoot093 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mfrac><mrow><mo>−</mo><mi>b</mi><mo>±</mo><msqrt><mrow><msup><mi>b</mi><mn>2</mn></msup><mo>−</mo><mn>4</mn><mi>a</mi><mi>c</mi></mrow></msqrt></mrow><mrow><mn>2</mn><mi>a</mi></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator negative b plus or minus the square root of b squared minus 4 a c, end root, and denominator 2 a';
  this.executeRuleTest(mathml, speech, preference);
};


//
// Higher order roots
//


/**
 * Testing ClearspeakRoots Example HighRoot001
 */
sre.ClearspeakRoots.prototype.testHighRoot001 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mroot><mi>y</mi><mn>3</mn></mroot></mrow></math>';
  var speech = 'the cube root of y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot002
 */
sre.ClearspeakRoots.prototype.testHighRoot002 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mroot><mi>n</mi><mn>4</mn></mroot></mrow></math>';
  var speech = 'the fourth root of n';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot003
 */
sre.ClearspeakRoots.prototype.testHighRoot003 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mroot><mrow><mn>35</mn></mrow><mn>5</mn></mroot></mrow></math>';
  var speech = 'the fifth root of 35';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot004
 */
sre.ClearspeakRoots.prototype.testHighRoot004 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mroot><mrow><mn>146</mn></mrow><mn>9</mn></mroot></mrow></math>';
  var speech = 'the ninth root of 146';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot005
 */
sre.ClearspeakRoots.prototype.testHighRoot005 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mroot><mi>d</mi><mi>n</mi></mroot></mrow></math>';
  var speech = 'the nth root of d';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot006
 */
sre.ClearspeakRoots.prototype.testHighRoot006 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mroot><mrow><mn>243</mn></mrow><mi>m</mi></mroot></mrow></math>';
  var speech = 'the mth root of 243';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot007
 */
sre.ClearspeakRoots.prototype.testHighRoot007 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mroot><mrow><msup><mn>2</mn><mi>i</mi></msup></mrow><mi>i</mi></mroot></mrow></math>';
  var speech = 'the ith root of 2 to the ith power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot008
 */
sre.ClearspeakRoots.prototype.testHighRoot008 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mroot><mrow><mn>125</mn></mrow><mi>j</mi></mroot></mrow></math>';
  var speech = 'the jth root of 125';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot009
 */
sre.ClearspeakRoots.prototype.testHighRoot009 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mo>−</mo><mroot><mi>y</mi><mn>3</mn></mroot></mrow></math>';
  var speech = 'negative the cube root of y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot010
 */
sre.ClearspeakRoots.prototype.testHighRoot010 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mo>−</mo><mroot><mi>n</mi><mn>4</mn></mroot></mrow></math>';
  var speech = 'negative the fourth root of n';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot011
 */
sre.ClearspeakRoots.prototype.testHighRoot011 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mroot><mi>y</mi><mn>3</mn></mroot></mrow></math>';
  var speech = 'the cube root of y, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot012
 */
sre.ClearspeakRoots.prototype.testHighRoot012 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mroot><mi>n</mi><mn>4</mn></mroot></mrow></math>';
  var speech = 'the fourth root of n, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot013
 */
sre.ClearspeakRoots.prototype.testHighRoot013 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mroot><mrow><mn>35</mn></mrow><mn>5</mn></mroot></mrow></math>';
  var speech = 'the fifth root of 35, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot014
 */
sre.ClearspeakRoots.prototype.testHighRoot014 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mroot><mrow><mn>146</mn></mrow><mn>9</mn></mroot></mrow></math>';
  var speech = 'the ninth root of 146, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot015
 */
sre.ClearspeakRoots.prototype.testHighRoot015 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mroot><mi>d</mi><mi>n</mi></mroot></mrow></math>';
  var speech = 'the nth root of d, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot016
 */
sre.ClearspeakRoots.prototype.testHighRoot016 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mroot><mrow><mn>243</mn></mrow><mi>m</mi></mroot></mrow></math>';
  var speech = 'the mth root of 243, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot017
 */
sre.ClearspeakRoots.prototype.testHighRoot017 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mroot><mrow><msup><mn>2</mn><mi>i</mi></msup></mrow><mi>i</mi></mroot></mrow></math>';
  var speech = 'the ith root of 2 to the ith power, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot018
 */
sre.ClearspeakRoots.prototype.testHighRoot018 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mroot><mrow><mn>125</mn></mrow><mi>j</mi></mroot></mrow></math>';
  var speech = 'the jth root of 125, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot019
 */
sre.ClearspeakRoots.prototype.testHighRoot019 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mo>−</mo><mroot><mi>y</mi><mn>3</mn></mroot></mrow></math>';
  var speech = 'negative the cube root of y, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot020
 */
sre.ClearspeakRoots.prototype.testHighRoot020 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mo>−</mo><mroot><mi>n</mi><mn>4</mn></mroot></mrow></math>';
  var speech = 'negative the fourth root of n, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot021
 */
sre.ClearspeakRoots.prototype.testHighRoot021 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mroot><mi>y</mi><mn>3</mn></mroot></mrow></math>';
  var speech = 'the cube root of y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot022
 */
sre.ClearspeakRoots.prototype.testHighRoot022 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mroot><mi>n</mi><mn>4</mn></mroot></mrow></math>';
  var speech = 'the fourth root of n';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot023
 */
sre.ClearspeakRoots.prototype.testHighRoot023 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mroot><mrow><mn>35</mn></mrow><mn>5</mn></mroot></mrow></math>';
  var speech = 'the fifth root of 35';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot024
 */
sre.ClearspeakRoots.prototype.testHighRoot024 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mroot><mrow><mn>146</mn></mrow><mn>9</mn></mroot></mrow></math>';
  var speech = 'the ninth root of 146';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot025
 */
sre.ClearspeakRoots.prototype.testHighRoot025 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mroot><mi>d</mi><mi>n</mi></mroot></mrow></math>';
  var speech = 'the nth root of d';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot026
 */
sre.ClearspeakRoots.prototype.testHighRoot026 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mroot><mrow><mn>243</mn></mrow><mi>m</mi></mroot></mrow></math>';
  var speech = 'the mth root of 243';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot027
 */
sre.ClearspeakRoots.prototype.testHighRoot027 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mroot><mrow><msup><mn>2</mn><mi>i</mi></msup></mrow><mi>i</mi></mroot></mrow></math>';
  var speech = 'the ith root of 2 to the ith power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot028
 */
sre.ClearspeakRoots.prototype.testHighRoot028 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mroot><mrow><mn>125</mn></mrow><mi>j</mi></mroot></mrow></math>';
  var speech = 'the jth root of 125';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot029
 */
sre.ClearspeakRoots.prototype.testHighRoot029 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mo>−</mo><mroot><mi>y</mi><mn>3</mn></mroot></mrow></math>';
  var speech = 'negative the cube root of y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot030
 */
sre.ClearspeakRoots.prototype.testHighRoot030 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mo>−</mo><mroot><mi>n</mi><mn>4</mn></mroot></mrow></math>';
  var speech = 'negative the fourth root of n';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot031
 */
sre.ClearspeakRoots.prototype.testHighRoot031 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mroot><mi>y</mi><mn>3</mn></mroot></mrow></math>';
  var speech = 'the cube root of y, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot032
 */
sre.ClearspeakRoots.prototype.testHighRoot032 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mroot><mi>n</mi><mn>4</mn></mroot></mrow></math>';
  var speech = 'the fourth root of n, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot033
 */
sre.ClearspeakRoots.prototype.testHighRoot033 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mroot><mrow><mn>35</mn></mrow><mn>5</mn></mroot></mrow></math>';
  var speech = 'the fifth root of 35, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot034
 */
sre.ClearspeakRoots.prototype.testHighRoot034 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mroot><mrow><mn>146</mn></mrow><mn>9</mn></mroot></mrow></math>';
  var speech = 'the ninth root of 146, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot035
 */
sre.ClearspeakRoots.prototype.testHighRoot035 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mroot><mi>d</mi><mi>n</mi></mroot></mrow></math>';
  var speech = 'the nth root of d, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot036
 */
sre.ClearspeakRoots.prototype.testHighRoot036 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mroot><mrow><mn>243</mn></mrow><mi>m</mi></mroot></mrow></math>';
  var speech = 'the mth root of 243, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot037
 */
sre.ClearspeakRoots.prototype.testHighRoot037 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mroot><mrow><msup><mn>2</mn><mi>i</mi></msup></mrow><mi>i</mi></mroot></mrow></math>';
  var speech = 'the ith root of 2 to the ith power, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot038
 */
sre.ClearspeakRoots.prototype.testHighRoot038 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mroot><mrow><mn>125</mn></mrow><mi>j</mi></mroot></mrow></math>';
  var speech = 'the jth root of 125, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot039
 */
sre.ClearspeakRoots.prototype.testHighRoot039 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mo>−</mo><mroot><mi>y</mi><mn>3</mn></mroot></mrow></math>';
  var speech = 'negative the cube root of y, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot040
 */
sre.ClearspeakRoots.prototype.testHighRoot040 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mo>−</mo><mroot><mi>n</mi><mn>4</mn></mroot></mrow></math>';
  var speech = 'negative the fourth root of n, end root';
  this.executeRuleTest(mathml, speech, preference);
};

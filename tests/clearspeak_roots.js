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
sre.ClearspeakRoots.prototype.untestRoot001 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = 'The square root of 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root002
 */
sre.ClearspeakRoots.prototype.untestRoot002 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mn>3</mn><mo>+</mo><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = '3 plus the square root of 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root003
 */
sre.ClearspeakRoots.prototype.untestRoot003 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mn>3</mn><mo>±</mo><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = '3 plus or minus the square root of 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root004
 */
sre.ClearspeakRoots.prototype.untestRoot004 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mn>3</mn><mo>∓</mo><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = '3 minus or plus the square root of 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root005
 */
sre.ClearspeakRoots.prototype.untestRoot005 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mo>−</mo><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = 'the negative square root of 2.';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root006
 */
sre.ClearspeakRoots.prototype.untestRoot006 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mn>3</mn><mo>−</mo><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = '3 minus the square root of 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root007
 */
sre.ClearspeakRoots.prototype.untestRoot007 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mn>3</mn><mo>+</mo><mo>−</mo><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = '3 plus the negative square root of 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root008
 */
sre.ClearspeakRoots.prototype.untestRoot008 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mn>3</mn><mo>−</mo><mo>−</mo><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = '3 minus the negative square root of 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root009
 */
sre.ClearspeakRoots.prototype.untestRoot009 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mn>3</mn><mo>+</mo><mrow><mo>(</mo><mrow><mo>−</mo><msqrt><mn>2</mn></msqrt></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '3 plus, open paren, the negative square root of 2, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root010
 */
sre.ClearspeakRoots.prototype.untestRoot010 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mn>3</mn><mo>−</mo><mrow><mo>(</mo><mrow><mo>−</mo><msqrt><mn>2</mn></msqrt></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '3 minus, open paren, the negative square root of 2, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root011
 */
sre.ClearspeakRoots.prototype.untestRoot011 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><msqrt><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow></msqrt></mrow></math>';
  var speech = 'The square root of x + 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root011a
 */
sre.ClearspeakRoots.prototype.untestRoot011a = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><msqrt><mi>x</mi></msqrt><mo>+</mo><mn>1</mn></mrow></math>';
  var speech = 'The square root of x, + 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root012
 */
sre.ClearspeakRoots.prototype.untestRoot012 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mo>−</mo><msqrt><mi>x</mi></msqrt></mrow></math>';
  var speech = 'the negative square root of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root013
 */
sre.ClearspeakRoots.prototype.untestRoot013 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><msqrt><mi>x</mi></msqrt></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup></mrow></math>';
  var speech = 'Open paren, the square root of x, close paren, squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root014
 */
sre.ClearspeakRoots.prototype.untestRoot014 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mo>−</mo><msup><mrow><mrow><mo>(</mo><mrow><msqrt><mi>x</mi></msqrt></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup></mrow></math>';
  var speech = 'Negative, open paren, the square root of x, close paren, squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root015
 */
sre.ClearspeakRoots.prototype.untestRoot015 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><msup><mrow><msqrt><mi>x</mi></msqrt></mrow><mn>2</mn></msup></mrow></math>';
  var speech = 'The square root of x, squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root016
 */
sre.ClearspeakRoots.prototype.untestRoot016 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><msqrt><mrow><msup><mi>x</mi><mn>2</mn></msup></mrow></msqrt></mrow></math>';
  var speech = 'The square root of, x squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root017
 */
sre.ClearspeakRoots.prototype.untestRoot017 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><msqrt><mrow><msup><mi>x</mi><mn>2</mn></msup><mo>+</mo><msup><mi>y</mi><mn>2</mn></msup></mrow></msqrt></mrow></math>';
  var speech = 'The square root of x squared plus y squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root018
 */
sre.ClearspeakRoots.prototype.untestRoot018 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><msqrt><mrow><msub><mi>x</mi><mn>1</mn></msub><msup><mrow/><mn>2</mn></msup><mo>+</mo><msub><mi>x</mi><mn>2</mn></msub><msup><mrow/><mn>2</mn></msup></mrow></msqrt></mrow></math>';
  var speech = 'The square root of x sub 1 squared plus x sub 2 squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root019
 */
sre.ClearspeakRoots.prototype.untestRoot019 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><msqrt><mrow><msup><mrow><mrow><mo>(</mo><mrow><msub><mi>x</mi><mn>2</mn></msub><mo>−</mo><msub><mi>x</mi><mn>1</mn></msub></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup><mo>+</mo><msup><mrow><mrow><mo>(</mo><mrow><msub><mi>y</mi><mn>2</mn></msub><mo>−</mo><msub><mi>y</mi><mn>1</mn></msub></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup></mrow></msqrt></mrow></math>';
  var speech = 'The square root of, open paren, x sub 2 minus x sub 1, close paren, squared plus open paren, y xub 2 minus y sub 1, close paren, squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root020
 */
sre.ClearspeakRoots.prototype.untestRoot020 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><msqrt><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></msqrt></mrow></math>';
  var speech = 'The square root of one half';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root021
 */
sre.ClearspeakRoots.prototype.untestRoot021 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><msqrt><mrow><mfrac><mrow><mn>23</mn></mrow><mrow><mn>66</mn></mrow></mfrac></mrow></msqrt></mrow></math>';
  var speech = 'The square root of 23 over 66';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root022
 */
sre.ClearspeakRoots.prototype.untestRoot022 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><msqrt><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>5</mn></mrow></mfrac></mrow></msqrt></mrow></math>';
  var speech = 'The square root of the fraction with numerator x plus 1, and denominator 2x plus 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root023
 */
sre.ClearspeakRoots.prototype.untestRoot023 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mo>−</mo><mi>b</mi><mo>±</mo><msqrt><mrow><msup><mi>b</mi><mn>2</mn></msup><mo>−</mo><mn>4</mn><mi>a</mi><mi>c</mi></mrow></msqrt></mrow><mrow><mn>2</mn><mi>a</mi></mrow></mfrac></mrow></math>';
  var speech = 'The fraction with numerator, negative b plus or minus the square root of b squared minus 4 a c, and denominator 2 a';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root024
 */
sre.ClearspeakRoots.prototype.untestRoot024 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = 'The positive square root of 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root025
 */
sre.ClearspeakRoots.prototype.untestRoot025 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mn>3</mn><mo>+</mo><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = '3 plus the positive square root of 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root026
 */
sre.ClearspeakRoots.prototype.untestRoot026 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mn>3</mn><mo>±</mo><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = '3 plus or minus the square root of 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root027
 */
sre.ClearspeakRoots.prototype.untestRoot027 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mn>3</mn><mo>∓</mo><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = '3 minus or plus the square root of 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root028
 */
sre.ClearspeakRoots.prototype.untestRoot028 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mo>−</mo><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = 'The negative square root of 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root029
 */
sre.ClearspeakRoots.prototype.untestRoot029 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mn>3</mn><mo>−</mo><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = '3 minus the positive square root of 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root030
 */
sre.ClearspeakRoots.prototype.untestRoot030 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mn>3</mn><mo>+</mo><mo>−</mo><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = '3 plus the negative square root of 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root031
 */
sre.ClearspeakRoots.prototype.untestRoot031 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mn>3</mn><mo>−</mo><mo>−</mo><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = '2 minus the negative square root of 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root032
 */
sre.ClearspeakRoots.prototype.untestRoot032 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mn>3</mn><mo>+</mo><mrow><mo>(</mo><mrow><mo>−</mo><msqrt><mn>2</mn></msqrt></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '3 plus the negative square root of 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root033
 */
sre.ClearspeakRoots.prototype.untestRoot033 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mn>3</mn><mo>−</mo><mrow><mo>(</mo><mrow><mo>−</mo><msqrt><mn>2</mn></msqrt></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '3 minus the negative square root of 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root034
 */
sre.ClearspeakRoots.prototype.untestRoot034 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><msqrt><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow></msqrt></mrow></math>';
  var speech = 'The positive square root of, x plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root034a
 */
sre.ClearspeakRoots.prototype.untestRoot034a = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><msqrt><mi>x</mi></msqrt><mo>+</mo><mn>1</mn></mrow></math>';
  var speech = 'The positive square root of x, plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root035
 */
sre.ClearspeakRoots.prototype.untestRoot035 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mo>−</mo><msqrt><mi>x</mi></msqrt></mrow></math>';
  var speech = 'The negative square root of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root036
 */
sre.ClearspeakRoots.prototype.untestRoot036 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><msqrt><mi>x</mi></msqrt></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup></mrow></math>';
  var speech = 'Open paren, the positive square root of x, close paren, squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root037
 */
sre.ClearspeakRoots.prototype.untestRoot037 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mo>−</mo><msqrt><mi>x</mi></msqrt></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup></mrow></math>';
  var speech = 'Open paren, the negative square root of x, close paren, squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root038
 */
sre.ClearspeakRoots.prototype.untestRoot038 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mo>−</mo><msup><mrow><mrow><mo>(</mo><mrow><msqrt><mi>x</mi></msqrt></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup></mrow></math>';
  var speech = 'Negative, open paren, the positive square root of x, close paren, squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root039
 */
sre.ClearspeakRoots.prototype.untestRoot039 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><msup><mrow><msqrt><mi>x</mi></msqrt></mrow><mn>2</mn></msup></mrow></math>';
  var speech = 'The positive square root of x, squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root040
 */
sre.ClearspeakRoots.prototype.untestRoot040 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><msqrt><mrow><msup><mi>x</mi><mn>2</mn></msup></mrow></msqrt></mrow></math>';
  var speech = 'The positive square root of, x squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root041
 */
sre.ClearspeakRoots.prototype.untestRoot041 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><msqrt><mrow><msup><mi>x</mi><mn>2</mn></msup><mo>+</mo><msup><mi>y</mi><mn>2</mn></msup></mrow></msqrt></mrow></math>';
  var speech = 'The positive square root of x squared plus y squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root042
 */
sre.ClearspeakRoots.prototype.untestRoot042 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><msqrt><mrow><msub><mi>x</mi><mn>1</mn></msub><msup><mrow/><mn>2</mn></msup><mo>+</mo><msub><mi>x</mi><mn>2</mn></msub><msup><mrow/><mn>2</mn></msup></mrow></msqrt></mrow></math>';
  var speech = 'The positive square root of x sub 1 squared plus x sub 2 squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root043
 */
sre.ClearspeakRoots.prototype.untestRoot043 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><msqrt><mrow><msup><mrow><mrow><mo>(</mo><mrow><msub><mi>x</mi><mn>2</mn></msub><mo>−</mo><msub><mi>x</mi><mn>1</mn></msub></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup><mo>+</mo><msup><mrow><mrow><mo>(</mo><mrow><msub><mi>y</mi><mn>2</mn></msub><mo>−</mo><msub><mi>y</mi><mn>1</mn></msub></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup></mrow></msqrt></mrow></math>';
  var speech = 'The positive square root of, open paren, x sub 2 minus x sub 1, close paren, squared plus open paren, y xub 2 minus y sub 1, close paren, squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root044
 */
sre.ClearspeakRoots.prototype.untestRoot044 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><msqrt><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></msqrt></mrow></math>';
  var speech = 'The positive square root of one half';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root045
 */
sre.ClearspeakRoots.prototype.untestRoot045 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><msqrt><mrow><mfrac><mrow><mn>23</mn></mrow><mrow><mn>66</mn></mrow></mfrac></mrow></msqrt></mrow></math>';
  var speech = 'The positive square root of 23 over 66';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root046
 */
sre.ClearspeakRoots.prototype.untestRoot046 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><msqrt><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>5</mn></mrow></mfrac></mrow></msqrt></mrow></math>';
  var speech = 'The positive square root of the fraction with numerator x plus 1, and denominator 2x plus 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root047
 */
sre.ClearspeakRoots.prototype.untestRoot047 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mfrac><mrow><mo>−</mo><mi>b</mi><mo>±</mo><msqrt><mrow><msup><mi>b</mi><mn>2</mn></msup><mo>−</mo><mn>4</mn><mi>a</mi><mi>c</mi></mrow></msqrt></mrow><mrow><mn>2</mn><mi>a</mi></mrow></mfrac></mrow></math>';
  var speech = 'The fraction with numerator, negative b plus or minus the square root of b squared minus 4 a c, and denominator 2 a';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root048
 */
sre.ClearspeakRoots.prototype.untestRoot048 = function() {
  var preference = 'Roots_Root End';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = 'The square root of 2, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root049
 */
sre.ClearspeakRoots.prototype.untestRoot049 = function() {
  var preference = 'Roots_Root End';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mn>3</mn><mo>+</mo><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = '3 plus the square root of 2, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root050
 */
sre.ClearspeakRoots.prototype.untestRoot050 = function() {
  var preference = 'Roots_Root End';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mn>3</mn><mo>±</mo><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = '3 plus or minus the square root of 2, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root051
 */
sre.ClearspeakRoots.prototype.untestRoot051 = function() {
  var preference = 'Roots_Root End';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mn>3</mn><mo>∓</mo><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = '3 minus or plus the square root of 2, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root052
 */
sre.ClearspeakRoots.prototype.untestRoot052 = function() {
  var preference = 'Roots_Root End';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mo>−</mo><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = 'the negative square root of 2, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root053
 */
sre.ClearspeakRoots.prototype.untestRoot053 = function() {
  var preference = 'Roots_Root End';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mn>3</mn><mo>−</mo><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = '3 minus the square root of 2, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root054
 */
sre.ClearspeakRoots.prototype.untestRoot054 = function() {
  var preference = 'Roots_Root End';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mn>3</mn><mo>+</mo><mo>−</mo><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = '3 plus the negative square root of 2 end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root055
 */
sre.ClearspeakRoots.prototype.untestRoot055 = function() {
  var preference = 'Roots_Root End';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mn>3</mn><mo>−</mo><mo>−</mo><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = '3 minus the negative square root of 2 end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root056
 */
sre.ClearspeakRoots.prototype.untestRoot056 = function() {
  var preference = 'Roots_Root End';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mn>3</mn><mo>+</mo><mrow><mo>(</mo><mrow><mo>−</mo><msqrt><mn>2</mn></msqrt></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '3 plus, open paren, the negative square root of two, end root, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root057
 */
sre.ClearspeakRoots.prototype.untestRoot057 = function() {
  var preference = 'Roots_Root End';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mn>3</mn><mo>−</mo><mrow><mo>(</mo><mrow><mo>−</mo><msqrt><mn>2</mn></msqrt></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '3 minus, open paren, the negative square root of two, end root, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root058
 */
sre.ClearspeakRoots.prototype.untestRoot058 = function() {
  var preference = 'Roots_Root End';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><msqrt><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow></msqrt></mrow></math>';
  var speech = 'The square root of x plus 1, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root058a
 */
sre.ClearspeakRoots.prototype.untestRoot058a = function() {
  var preference = 'Roots_Root End';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><msqrt><mi>x</mi></msqrt><mo>+</mo><mn>1</mn></mrow></math>';
  var speech = 'The square root of x, end root, plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root059
 */
sre.ClearspeakRoots.prototype.untestRoot059 = function() {
  var preference = 'Roots_Root End';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mo>−</mo><msqrt><mi>x</mi></msqrt></mrow></math>';
  var speech = 'negative square root of x. end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root060
 */
sre.ClearspeakRoots.prototype.untestRoot060 = function() {
  var preference = 'Roots_Root End';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><msqrt><mi>x</mi></msqrt></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup></mrow></math>';
  var speech = 'Open paren, the square root of x, end root, close paren, squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root061
 */
sre.ClearspeakRoots.prototype.untestRoot061 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mo>−</mo><msup><mrow><mrow><mo>(</mo><mrow><msqrt><mi>x</mi></msqrt></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup></mrow></math>';
  var speech = 'Negative, open paren, the square root of x end root, close paren, squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root062
 */
sre.ClearspeakRoots.prototype.untestRoot062 = function() {
  var preference = 'Roots_Root End';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><msup><mrow><msqrt><mi>x</mi></msqrt></mrow><mn>2</mn></msup></mrow></math>';
  var speech = 'the square root of x, end root, squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root063
 */
sre.ClearspeakRoots.prototype.untestRoot063 = function() {
  var preference = 'Roots_Root End';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><msqrt><mrow><msup><mi>x</mi><mn>2</mn></msup></mrow></msqrt></mrow></math>';
  var speech = 'the square root of x squared, end root,';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root064
 */
sre.ClearspeakRoots.prototype.untestRoot064 = function() {
  var preference = 'Roots_Root End';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><msqrt><mrow><msup><mi>x</mi><mn>2</mn></msup><mo>+</mo><msup><mi>y</mi><mn>2</mn></msup></mrow></msqrt></mrow></math>';
  var speech = 'The square root of x squared plus y squared, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root065
 */
sre.ClearspeakRoots.prototype.untestRoot065 = function() {
  var preference = 'Roots_Root End';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><msqrt><mrow><msub><mi>x</mi><mn>1</mn></msub><msup><mrow/><mn>2</mn></msup><mo>+</mo><msub><mi>x</mi><mn>2</mn></msub><msup><mrow/><mn>2</mn></msup></mrow></msqrt></mrow></math>';
  var speech = 'The square root of x sub 1 squared plus x sub 2 squared, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root066
 */
sre.ClearspeakRoots.prototype.untestRoot066 = function() {
  var preference = 'Roots_Root End';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><msqrt><mrow><msup><mrow><mrow><mo>(</mo><mrow><msub><mi>x</mi><mn>2</mn></msub><mo>−</mo><msub><mi>x</mi><mn>1</mn></msub></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup><mo>+</mo><msup><mrow><mrow><mo>(</mo><mrow><msub><mi>y</mi><mn>2</mn></msub><mo>−</mo><msub><mi>y</mi><mn>1</mn></msub></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup></mrow></msqrt></mrow></math>';
  var speech = 'The square root of, open paren, x sub 2 minus x sub 1, close paren, squared plus open paren, y xub 2, end root minus y sub 1, close paren, squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root067
 */
sre.ClearspeakRoots.prototype.untestRoot067 = function() {
  var preference = 'Roots_Root End';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><msqrt><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></msqrt></mrow></math>';
  var speech = 'The square root of one half, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root068
 */
sre.ClearspeakRoots.prototype.untestRoot068 = function() {
  var preference = 'Roots_Root End';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><msqrt><mrow><mfrac><mrow><mn>23</mn></mrow><mrow><mn>66</mn></mrow></mfrac></mrow></msqrt></mrow></math>';
  var speech = 'The square root of 23 over 66, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root069
 */
sre.ClearspeakRoots.prototype.untestRoot069 = function() {
  var preference = 'Roots_Root End';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><msqrt><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>5</mn></mrow></mfrac></mrow></msqrt></mrow></math>';
  var speech = 'The square root of the fraction with numerator x plus 1, and denominator 2x plus 5, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root070
 */
sre.ClearspeakRoots.prototype.untestRoot070 = function() {
  var preference = 'Roots_Root End';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mfrac><mrow><mo>−</mo><mi>b</mi><mo>±</mo><msqrt><mrow><msup><mi>b</mi><mn>2</mn></msup><mo>−</mo><mn>4</mn><mi>a</mi><mi>c</mi></mrow></msqrt></mrow><mrow><mn>2</mn><mi>a</mi></mrow></mfrac></mrow></math>';
  var speech = 'The fraction with numerator, negative b plus or minus the square root of b squared minus 4 a c, end root and denominator 2 a';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root071
 */
sre.ClearspeakRoots.prototype.untestRoot071 = function() {
  var preference = 'Roots_PosNegSRootEnd';
  var mathml = '<math><mrow><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = 'The positive square root of 2, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root072
 */
sre.ClearspeakRoots.prototype.untestRoot072 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mn>3</mn><mo>+</mo><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = '3 plus the positive square root of 2, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root073
 */
sre.ClearspeakRoots.prototype.untestRoot073 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mn>3</mn><mo>±</mo><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = '3 plus or minus the square root of 2 end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root074
 */
sre.ClearspeakRoots.prototype.untestRoot074 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mn>3</mn><mo>∓</mo><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = '3 minus or plus the square root of 2 end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root075
 */
sre.ClearspeakRoots.prototype.untestRoot075 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mo>−</mo><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = 'the negative square root of 2. end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root076
 */
sre.ClearspeakRoots.prototype.untestRoot076 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mn>3</mn><mo>−</mo><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = '3 minus the positive square root of 2, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root077
 */
sre.ClearspeakRoots.prototype.untestRoot077 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mn>3</mn><mo>+</mo><mo>−</mo><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = '3 plus the negative square root of 2, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root078
 */
sre.ClearspeakRoots.prototype.untestRoot078 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mn>3</mn><mo>−</mo><mo>−</mo><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = '3 minus the negative square root of 2, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root079
 */
sre.ClearspeakRoots.prototype.untestRoot079 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mn>3</mn><mo>+</mo><mrow><mo>(</mo><mrow><mo>−</mo><msqrt><mn>2</mn></msqrt></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '3 plus, open parenthesis, the negative square root of 2, end root.';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root080
 */
sre.ClearspeakRoots.prototype.untestRoot080 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mn>3</mn><mo>−</mo><mrow><mo>(</mo><mrow><mo>−</mo><msqrt><mn>2</mn></msqrt></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '3 minus, open parenthesis, the negative square root of 2, end root.';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root081
 */
sre.ClearspeakRoots.prototype.untestRoot081 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><msqrt><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow></msqrt></mrow></math>';
  var speech = 'The positive square root of x plus 1, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root081a
 */
sre.ClearspeakRoots.prototype.untestRoot081a = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><msqrt><mi>x</mi></msqrt><mo>+</mo><mn>1</mn></mrow></math>';
  var speech = 'The positive square root of x, end root, plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root082
 */
sre.ClearspeakRoots.prototype.untestRoot082 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mo>−</mo><msqrt><mi>x</mi></msqrt></mrow></math>';
  var speech = 'the negative square root ox x. end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root083
 */
sre.ClearspeakRoots.prototype.untestRoot083 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><msqrt><mi>x</mi></msqrt></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup></mrow></math>';
  var speech = 'Open paren, the positive square root of x, end root, squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root084
 */
sre.ClearspeakRoots.prototype.untestRoot084 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mo>−</mo><msqrt><mi>x</mi></msqrt></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup></mrow></math>';
  var speech = 'open parenthesis, the negative square root of x, end root. close parenthesis, squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root085
 */
sre.ClearspeakRoots.prototype.untestRoot085 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><msup><mrow><msqrt><mi>x</mi></msqrt></mrow><mn>2</mn></msup></mrow></math>';
  var speech = 'The positive square root of x, end root, squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root086
 */
sre.ClearspeakRoots.prototype.untestRoot086 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><msqrt><mrow><msup><mi>x</mi><mn>2</mn></msup></mrow></msqrt></mrow></math>';
  var speech = 'The positive square root of x squared, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root087
 */
sre.ClearspeakRoots.prototype.untestRoot087 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><msqrt><mrow><msup><mi>x</mi><mn>2</mn></msup><mo>+</mo><msup><mi>y</mi><mn>2</mn></msup></mrow></msqrt></mrow></math>';
  var speech = 'The positive square root of x squared plus y squared, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root088
 */
sre.ClearspeakRoots.prototype.untestRoot088 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><msqrt><mrow><msub><mi>x</mi><mn>1</mn></msub><msup><mrow/><mn>2</mn></msup><mo>+</mo><msub><mi>x</mi><mn>2</mn></msub><msup><mrow/><mn>2</mn></msup></mrow></msqrt></mrow></math>';
  var speech = 'The positive square root of x sub 1 squared plus x sub 2 squared, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root089
 */
sre.ClearspeakRoots.prototype.untestRoot089 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><msqrt><mrow><msup><mrow><mrow><mo>(</mo><mrow><msub><mi>x</mi><mn>2</mn></msub><mo>−</mo><msub><mi>x</mi><mn>1</mn></msub></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup><mo>+</mo><msup><mrow><mrow><mo>(</mo><mrow><msub><mi>y</mi><mn>2</mn></msub><mo>−</mo><msub><mi>y</mi><mn>1</mn></msub></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup></mrow></msqrt></mrow></math>';
  var speech = 'The positive square root of, open paren, x sub 2 minus x sub 1, close paren, squared plus open paren, y sub 2, end root minus y sub 1, close paren, squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root090
 */
sre.ClearspeakRoots.prototype.untestRoot090 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><msqrt><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></msqrt></mrow></math>';
  var speech = 'The positive square root of one half, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root091
 */
sre.ClearspeakRoots.prototype.untestRoot091 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><msqrt><mrow><mfrac><mrow><mn>23</mn></mrow><mrow><mn>66</mn></mrow></mfrac></mrow></msqrt></mrow></math>';
  var speech = 'The positive square root of 23 over 66, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root092
 */
sre.ClearspeakRoots.prototype.untestRoot092 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><msqrt><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>5</mn></mrow></mfrac></mrow></msqrt></mrow></math>';
  var speech = 'The positive square root of the fraction with numerator x plus 1, and denominator 2x plus 5, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example Root093
 */
sre.ClearspeakRoots.prototype.untestRoot093 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mfrac><mrow><mo>−</mo><mi>b</mi><mo>±</mo><msqrt><mrow><msup><mi>b</mi><mn>2</mn></msup><mo>−</mo><mn>4</mn><mi>a</mi><mi>c</mi></mrow></msqrt></mrow><mrow><mn>2</mn><mi>a</mi></mrow></mfrac></mrow></math>';
  var speech = 'The fraction with numerator, negative b plus or minus the square root of b squared minus 4 a c, end root, and denominator 2 a';
  this.executeRuleTest(mathml, speech, preference);
};


//
// Higher order roots
//


/**
 * Testing ClearspeakRoots Example HighRoot001
 */
sre.ClearspeakRoots.prototype.untestHighRoot001 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mroot><mi>y</mi><mn>3</mn></mroot></mrow></math>';
  var speech = 'The cube root of y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot002
 */
sre.ClearspeakRoots.prototype.untestHighRoot002 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mroot><mi>n</mi><mn>4</mn></mroot></mrow></math>';
  var speech = 'The fourth root of n';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot003
 */
sre.ClearspeakRoots.prototype.untestHighRoot003 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mroot><mrow><mn>35</mn></mrow><mn>5</mn></mroot></mrow></math>';
  var speech = 'The fifth root of 35';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot004
 */
sre.ClearspeakRoots.prototype.untestHighRoot004 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mroot><mrow><mn>146</mn></mrow><mn>9</mn></mroot></mrow></math>';
  var speech = 'The ninth root of 146';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot005
 */
sre.ClearspeakRoots.prototype.untestHighRoot005 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mroot><mi>d</mi><mi>n</mi></mroot></mrow></math>';
  var speech = 'The nth root of d';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot006
 */
sre.ClearspeakRoots.prototype.untestHighRoot006 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mroot><mrow><mn>243</mn></mrow><mi>m</mi></mroot></mrow></math>';
  var speech = 'The mth root of 243';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot007
 */
sre.ClearspeakRoots.prototype.untestHighRoot007 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mroot><mrow><msup><mn>2</mn><mi>i</mi></msup></mrow><mi>i</mi></mroot></mrow></math>';
  var speech = 'The ith root of 2 raised to the power i';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot008
 */
sre.ClearspeakRoots.prototype.untestHighRoot008 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mroot><mrow><mn>125</mn></mrow><mi>j</mi></mroot></mrow></math>';
  var speech = 'The jth root of 125';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot009
 */
sre.ClearspeakRoots.prototype.untestHighRoot009 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mo>−</mo><mroot><mi>y</mi><mn>3</mn></mroot></mrow></math>';
  var speech = 'Negative the cube root of y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot010
 */
sre.ClearspeakRoots.prototype.untestHighRoot010 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mo>−</mo><mroot><mi>n</mi><mn>4</mn></mroot></mrow></math>';
  var speech = 'Negative the fourth root of n';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot011
 */
sre.ClearspeakRoots.prototype.untestHighRoot011 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mroot><mi>y</mi><mn>3</mn></mroot></mrow></math>';
  var speech = 'The cube root of y, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot012
 */
sre.ClearspeakRoots.prototype.untestHighRoot012 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mroot><mi>n</mi><mn>4</mn></mroot></mrow></math>';
  var speech = 'The fourth root of n, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot013
 */
sre.ClearspeakRoots.prototype.untestHighRoot013 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mroot><mrow><mn>35</mn></mrow><mn>5</mn></mroot></mrow></math>';
  var speech = 'The fifth root of 35, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot014
 */
sre.ClearspeakRoots.prototype.untestHighRoot014 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mroot><mrow><mn>146</mn></mrow><mn>9</mn></mroot></mrow></math>';
  var speech = 'The ninth root of 146, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot015
 */
sre.ClearspeakRoots.prototype.untestHighRoot015 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mroot><mi>d</mi><mi>n</mi></mroot></mrow></math>';
  var speech = 'The nth root of d, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot016
 */
sre.ClearspeakRoots.prototype.untestHighRoot016 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mroot><mrow><mn>243</mn></mrow><mi>m</mi></mroot></mrow></math>';
  var speech = 'The mth root of 243, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot017
 */
sre.ClearspeakRoots.prototype.untestHighRoot017 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mroot><mrow><msup><mn>2</mn><mi>i</mi></msup></mrow><mi>i</mi></mroot></mrow></math>';
  var speech = 'The ith root of 2 raised to the power i, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot018
 */
sre.ClearspeakRoots.prototype.untestHighRoot018 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mroot><mrow><mn>125</mn></mrow><mi>j</mi></mroot></mrow></math>';
  var speech = 'The jth root of 125, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot019
 */
sre.ClearspeakRoots.prototype.untestHighRoot019 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mo>−</mo><mroot><mi>y</mi><mn>3</mn></mroot></mrow></math>';
  var speech = 'Negative the cube root of y, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot020
 */
sre.ClearspeakRoots.prototype.untestHighRoot020 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mo>−</mo><mroot><mi>n</mi><mn>4</mn></mroot></mrow></math>';
  var speech = 'Negative the fourth root of n, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot021
 */
sre.ClearspeakRoots.prototype.untestHighRoot021 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mroot><mi>y</mi><mn>3</mn></mroot></mrow></math>';
  var speech = 'The cube root of y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot022
 */
sre.ClearspeakRoots.prototype.untestHighRoot022 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mroot><mi>n</mi><mn>4</mn></mroot></mrow></math>';
  var speech = 'The fourth root of n';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot023
 */
sre.ClearspeakRoots.prototype.untestHighRoot023 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mroot><mrow><mn>35</mn></mrow><mn>5</mn></mroot></mrow></math>';
  var speech = 'The fifth root of 35';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot024
 */
sre.ClearspeakRoots.prototype.untestHighRoot024 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mroot><mrow><mn>146</mn></mrow><mn>9</mn></mroot></mrow></math>';
  var speech = 'The ninth root of 146';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot025
 */
sre.ClearspeakRoots.prototype.untestHighRoot025 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mroot><mi>d</mi><mi>n</mi></mroot></mrow></math>';
  var speech = 'The nth root of d';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot026
 */
sre.ClearspeakRoots.prototype.untestHighRoot026 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mroot><mrow><mn>243</mn></mrow><mi>m</mi></mroot></mrow></math>';
  var speech = 'The mth root of 243';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot027
 */
sre.ClearspeakRoots.prototype.untestHighRoot027 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mroot><mrow><msup><mn>2</mn><mi>i</mi></msup></mrow><mi>i</mi></mroot></mrow></math>';
  var speech = 'The ith root of 2 raised to the power i';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot028
 */
sre.ClearspeakRoots.prototype.untestHighRoot028 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mroot><mrow><mn>125</mn></mrow><mi>j</mi></mroot></mrow></math>';
  var speech = 'The jth root of 125';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot029
 */
sre.ClearspeakRoots.prototype.untestHighRoot029 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mo>−</mo><mroot><mi>y</mi><mn>3</mn></mroot></mrow></math>';
  var speech = 'Negative the cube root of y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot030
 */
sre.ClearspeakRoots.prototype.untestHighRoot030 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mo>−</mo><mroot><mi>n</mi><mn>4</mn></mroot></mrow></math>';
  var speech = 'Negative the fourth root of n';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot031
 */
sre.ClearspeakRoots.prototype.untestHighRoot031 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mroot><mi>y</mi><mn>3</mn></mroot></mrow></math>';
  var speech = 'The cube root of y, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot032
 */
sre.ClearspeakRoots.prototype.untestHighRoot032 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mroot><mi>n</mi><mn>4</mn></mroot></mrow></math>';
  var speech = 'The fourth root of n, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot033
 */
sre.ClearspeakRoots.prototype.untestHighRoot033 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mroot><mrow><mn>35</mn></mrow><mn>5</mn></mroot></mrow></math>';
  var speech = 'The fifth root of 35, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot034
 */
sre.ClearspeakRoots.prototype.untestHighRoot034 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mroot><mrow><mn>146</mn></mrow><mn>9</mn></mroot></mrow></math>';
  var speech = 'The ninth root of 146, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot035
 */
sre.ClearspeakRoots.prototype.untestHighRoot035 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mroot><mi>d</mi><mi>n</mi></mroot></mrow></math>';
  var speech = 'The nth root of d , end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot036
 */
sre.ClearspeakRoots.prototype.untestHighRoot036 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mroot><mrow><mn>243</mn></mrow><mi>m</mi></mroot></mrow></math>';
  var speech = 'The mth root of 243, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot037
 */
sre.ClearspeakRoots.prototype.untestHighRoot037 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mroot><mrow><msup><mn>2</mn><mi>i</mi></msup></mrow><mi>i</mi></mroot></mrow></math>';
  var speech = 'The ith root of 2 raised to the power i, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot038
 */
sre.ClearspeakRoots.prototype.untestHighRoot038 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mroot><mrow><mn>125</mn></mrow><mi>j</mi></mroot></mrow></math>';
  var speech = 'The jth root of 125, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot039
 */
sre.ClearspeakRoots.prototype.untestHighRoot039 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mo>−</mo><mroot><mi>y</mi><mn>3</mn></mroot></mrow></math>';
  var speech = 'Negative the cube root of y, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakRoots Example HighRoot040
 */
sre.ClearspeakRoots.prototype.untestHighRoot040 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mo>−</mo><mroot><mi>n</mi><mn>4</mn></mroot></mrow></math>';
  var speech = 'Negative the fourth root of n, end root';
  this.executeRuleTest(mathml, speech, preference);
};
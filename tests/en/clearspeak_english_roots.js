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


goog.provide('sre.ClearspeakEnglishRoots');

goog.require('sre.ClearspeakEnglishRuleTest');



/**
* @constructor
* @extends {sre.ClearspeakEnglishRuleTest}
*/
sre.ClearspeakEnglishRoots = function() {
  sre.ClearspeakEnglishRoots.base(this, 'constructor');

  /**
* @override
  */
  this.information = 'ClearspeakEnglishRoots rule tests.';

};
goog.inherits(sre.ClearspeakEnglishRoots, sre.ClearspeakEnglishRuleTest);



//
// Roots
//


/**
 * Testing ClearspeakEnglishRoots Example Root001
 */
sre.ClearspeakEnglishRoots.prototype.testRoot001 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<mrow><msqrt><mn>2</mn></msqrt></mrow>';
  var speech = 'the square root of 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root002
 */
sre.ClearspeakEnglishRoots.prototype.testRoot002 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mn>3</mn><mo>+</mo><msqrt><mn>2</mn></msqrt>' +
      '</mrow></math>';
  var speech = '3 plus the square root of 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root003
 */
sre.ClearspeakEnglishRoots.prototype.testRoot003 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mn>3</mn><mo>±</mo><msqrt><mn>2</mn></msqrt>' +
      '</mrow></math>';
  var speech = '3 plus or minus the square root of 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root004
 */
sre.ClearspeakEnglishRoots.prototype.testRoot004 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mn>3</mn><mo>∓</mo><msqrt><mn>2</mn></msqrt>' +
      '</mrow></math>';
  var speech = '3 minus or plus the square root of 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root005
 */
sre.ClearspeakEnglishRoots.prototype.testRoot005 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mo>−</mo><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = 'the negative square root of 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root006
 */
sre.ClearspeakEnglishRoots.prototype.testRoot006 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mn>3</mn><mo>−</mo><msqrt><mn>2</mn></msqrt>' +
      '</mrow></math>';
  var speech = '3 minus the square root of 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root007
 */
sre.ClearspeakEnglishRoots.prototype.testRoot007 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mn>3</mn><mo>+</mo><mo>−</mo><msqrt><mn>2</mn>' +
      '</msqrt></mrow></math>';
  var speech = '3 plus the negative square root of 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root008
 */
sre.ClearspeakEnglishRoots.prototype.testRoot008 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mn>3</mn><mo>−</mo><mo>−</mo><msqrt><mn>2</mn>' +
      '</msqrt></mrow></math>';
  var speech = '3 minus the negative square root of 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root009
 */
sre.ClearspeakEnglishRoots.prototype.testRoot009 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mn>3</mn><mo>+</mo><mrow><mo>(</mo><mrow><mo>−' +
      '</mo><msqrt><mn>2</mn></msqrt></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '3 plus, open paren, the negative square root of 2, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root010
 */
sre.ClearspeakEnglishRoots.prototype.testRoot010 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mn>3</mn><mo>−</mo><mrow><mo>(</mo><mrow><mo>−' +
      '</mo><msqrt><mn>2</mn></msqrt></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '3 minus, open paren, the negative square root of 2, close' +
      ' paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root011
 */
sre.ClearspeakEnglishRoots.prototype.testRoot011 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><msqrt><mrow><mi>x</mi><mo>+</mo><mn>1</mn>' +
      '</mrow></msqrt></mrow></math>';
  var speech = 'the square root of x plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root011a
 */
sre.ClearspeakEnglishRoots.prototype.testRoot011a = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><msqrt><mi>x</mi></msqrt><mo>+</mo><mn>1</mn>' +
      '</mrow></math>';
  var speech = 'the square root of x, plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root012
 */
sre.ClearspeakEnglishRoots.prototype.testRoot012 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mo>−</mo><msqrt><mi>x</mi></msqrt></mrow></math>';
  var speech = 'the negative square root of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root013
 */
sre.ClearspeakEnglishRoots.prototype.testRoot013 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><msqrt><mi>x' +
      '</mi></msqrt></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup></mrow>' +
      '</math>';
  var speech = 'open paren, the square root of x, close paren, squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root014
 */
sre.ClearspeakEnglishRoots.prototype.testRoot014 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mo>−</mo><msup><mrow><mrow><mo>(</mo><mrow>' +
      '<msqrt><mi>x</mi></msqrt></mrow><mo>)</mo></mrow></mrow><mn>2</mn>' +
      '</msup></mrow></math>';
  var speech = 'negative, open paren, the square root of x, close paren,' +
      ' squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root015
 */
sre.ClearspeakEnglishRoots.prototype.testRoot015 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><msup><mrow><msqrt><mi>x</mi></msqrt></mrow>' +
      '<mn>2</mn></msup></mrow></math>';
  var speech = 'the square root of x, squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root016
 */
sre.ClearspeakEnglishRoots.prototype.testRoot016 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><msqrt><mrow><msup><mi>x</mi><mn>2</mn></msup>' +
      '</mrow></msqrt></mrow></math>';
  var speech = 'the square root of x squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root017
 */
sre.ClearspeakEnglishRoots.prototype.testRoot017 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><msqrt><mrow><msup><mi>x</mi><mn>2</mn></msup>' +
      '<mo>+</mo><msup><mi>y</mi><mn>2</mn></msup></mrow></msqrt></mrow>' +
      '</math>';
  var speech = 'the square root of x squared plus y squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root018
 */
sre.ClearspeakEnglishRoots.prototype.testRoot018 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><msqrt><mrow><msub><mi>x</mi><mn>1</mn></msub>' +
      '<msup><mrow/><mn>2</mn></msup><mo>+</mo><msub><mi>x</mi><mn>2</mn>' +
      '</msub><msup><mrow/><mn>2</mn></msup></mrow></msqrt></mrow></math>';
  var speech = 'the square root of, x sub 1, squared plus, x sub 2, squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root019
 */
sre.ClearspeakEnglishRoots.prototype.testRoot019 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><msqrt><mrow><msup><mrow><mrow><mo>(</mo><mrow>' +
      '<msub><mi>x</mi><mn>2</mn></msub><mo>−</mo><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup><mo>+' +
      '</mo><msup><mrow><mrow><mo>(</mo><mrow><msub><mi>y</mi><mn>2</mn>' +
      '</msub><mo>−</mo><msub><mi>y</mi><mn>1</mn></msub></mrow><mo>)</mo>' +
      '</mrow></mrow><mn>2</mn></msup></mrow></msqrt></mrow></math>';
  var speech = 'the square root of, open paren, x sub 2, minus, x sub 1,' +
      ' close paren, squared plus, open paren, y sub 2, minus, y sub 1,' +
      ' close paren, squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root020
 */
sre.ClearspeakEnglishRoots.prototype.testRoot020 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><msqrt><mrow><mfrac><mn>1</mn><mn>2</mn>' +
      '</mfrac></mrow></msqrt></mrow></math>';
  var speech = 'the square root of one half';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root021
 */
sre.ClearspeakEnglishRoots.prototype.testRoot021 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><msqrt><mrow><mfrac><mrow><mn>23</mn></mrow>' +
      '<mrow><mn>66</mn></mrow></mfrac></mrow></msqrt></mrow></math>';
  var speech = 'the square root of, 23 over 66';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root022
 */
sre.ClearspeakEnglishRoots.prototype.testRoot022 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><msqrt><mrow><mfrac><mrow><mi>x</mi><mo>+</mo>' +
      '<mn>1</mn></mrow><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>5</mn>' +
      '</mrow></mfrac></mrow></msqrt></mrow></math>';
  var speech = 'the square root of, the fraction with numerator x plus 1,' +
      ' and denominator 2 x, plus 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root023
 */
sre.ClearspeakEnglishRoots.prototype.testRoot023 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mo>−</mo><mi>b</mi><mo>±</mo>' +
      '<msqrt><mrow><msup><mi>b</mi><mn>2</mn></msup><mo>−</mo><mn>4</mn>' +
      '<mi>a</mi><mi>c</mi></mrow></msqrt></mrow><mrow><mn>2</mn><mi>a</mi>' +
      '</mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator negative b plus or minus the' +
      ' square root of b squared minus 4 a c, and denominator 2 a';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root024
 */
sre.ClearspeakEnglishRoots.prototype.testRoot024 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = 'the positive square root of 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root025
 */
sre.ClearspeakEnglishRoots.prototype.testRoot025 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mn>3</mn><mo>+</mo><msqrt><mn>2</mn></msqrt>' +
      '</mrow></math>';
  var speech = '3 plus the positive square root of 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root026
 */
sre.ClearspeakEnglishRoots.prototype.testRoot026 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mn>3</mn><mo>±</mo><msqrt><mn>2</mn></msqrt>' +
      '</mrow></math>';
  var speech = '3 plus or minus the square root of 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root027
 */
sre.ClearspeakEnglishRoots.prototype.testRoot027 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mn>3</mn><mo>∓</mo><msqrt><mn>2</mn></msqrt>' +
      '</mrow></math>';
  var speech = '3 minus or plus the square root of 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root028
 */
sre.ClearspeakEnglishRoots.prototype.testRoot028 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mo>−</mo><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = 'the negative square root of 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root029
 */
sre.ClearspeakEnglishRoots.prototype.testRoot029 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mn>3</mn><mo>−</mo><msqrt><mn>2</mn></msqrt>' +
      '</mrow></math>';
  var speech = '3 minus the positive square root of 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root030
 */
sre.ClearspeakEnglishRoots.prototype.testRoot030 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mn>3</mn><mo>+</mo><mo>−</mo><msqrt><mn>2</mn>' +
      '</msqrt></mrow></math>';
  var speech = '3 plus the negative square root of 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root031
 */
sre.ClearspeakEnglishRoots.prototype.testRoot031 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mn>3</mn><mo>−</mo><mo>−</mo><msqrt><mn>2</mn>' +
      '</msqrt></mrow></math>';
  var speech = '3 minus the negative square root of 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root032
 */
sre.ClearspeakEnglishRoots.prototype.testRoot032 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mn>3</mn><mo>+</mo><mrow><mo>(</mo><mrow><mo>−' +
      '</mo><msqrt><mn>2</mn></msqrt></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '3 plus, open paren, the negative square root of 2, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root033
 */
sre.ClearspeakEnglishRoots.prototype.testRoot033 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mn>3</mn><mo>−</mo><mrow><mo>(</mo><mrow><mo>−' +
      '</mo><msqrt><mn>2</mn></msqrt></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '3 minus, open paren, the negative square root of 2, close' +
      ' paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root034
 */
sre.ClearspeakEnglishRoots.prototype.testRoot034 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><msqrt><mrow><mi>x</mi><mo>+</mo><mn>1</mn>' +
      '</mrow></msqrt></mrow></math>';
  var speech = 'the positive square root of x plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root034a
 */
sre.ClearspeakEnglishRoots.prototype.testRoot034a = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><msqrt><mi>x</mi></msqrt><mo>+</mo><mn>1</mn>' +
      '</mrow></math>';
  var speech = 'the positive square root of x, plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root035
 */
sre.ClearspeakEnglishRoots.prototype.testRoot035 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mo>−</mo><msqrt><mi>x</mi></msqrt></mrow></math>';
  var speech = 'the negative square root of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root036
 */
sre.ClearspeakEnglishRoots.prototype.testRoot036 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><msqrt><mi>x' +
      '</mi></msqrt></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup></mrow>' +
      '</math>';
  var speech = 'open paren, the positive square root of x, close paren,' +
      ' squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root037
 */
sre.ClearspeakEnglishRoots.prototype.testRoot037 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mo>−</mo>' +
      '<msqrt><mi>x</mi></msqrt></mrow><mo>)</mo></mrow></mrow><mn>2</mn>' +
      '</msup></mrow></math>';
  var speech = 'open paren, the negative square root of x, close paren,' +
      ' squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root038
 */
sre.ClearspeakEnglishRoots.prototype.testRoot038 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mo>−</mo><msup><mrow><mrow><mo>(</mo><mrow>' +
      '<msqrt><mi>x</mi></msqrt></mrow><mo>)</mo></mrow></mrow><mn>2</mn>' +
      '</msup></mrow></math>';
  var speech = 'negative, open paren, the positive square root of x, close' +
      ' paren, squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root039
 */
sre.ClearspeakEnglishRoots.prototype.testRoot039 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><msup><mrow><msqrt><mi>x</mi></msqrt></mrow>' +
      '<mn>2</mn></msup></mrow></math>';
  var speech = 'the positive square root of x, squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root040
 */
sre.ClearspeakEnglishRoots.prototype.testRoot040 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><msqrt><mrow><msup><mi>x</mi><mn>2</mn></msup>' +
      '</mrow></msqrt></mrow></math>';
  var speech = 'the positive square root of x squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root041
 */
sre.ClearspeakEnglishRoots.prototype.testRoot041 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><msqrt><mrow><msup><mi>x</mi><mn>2</mn></msup>' +
      '<mo>+</mo><msup><mi>y</mi><mn>2</mn></msup></mrow></msqrt></mrow>' +
      '</math>';
  var speech = 'the positive square root of x squared plus y squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root042
 */
sre.ClearspeakEnglishRoots.prototype.testRoot042 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><msqrt><mrow><msub><mi>x</mi><mn>1</mn></msub>' +
      '<msup><mrow/><mn>2</mn></msup><mo>+</mo><msub><mi>x</mi><mn>2</mn>' +
      '</msub><msup><mrow/><mn>2</mn></msup></mrow></msqrt></mrow></math>';
  var speech = 'the positive square root of, x sub 1, squared plus, x sub' +
      ' 2, squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root043
 */
sre.ClearspeakEnglishRoots.prototype.testRoot043 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><msqrt><mrow><msup><mrow><mrow><mo>(</mo><mrow>' +
      '<msub><mi>x</mi><mn>2</mn></msub><mo>−</mo><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup><mo>+' +
      '</mo><msup><mrow><mrow><mo>(</mo><mrow><msub><mi>y</mi><mn>2</mn>' +
      '</msub><mo>−</mo><msub><mi>y</mi><mn>1</mn></msub></mrow><mo>)</mo>' +
      '</mrow></mrow><mn>2</mn></msup></mrow></msqrt></mrow></math>';
  var speech = 'the positive square root of, open paren, x sub 2, minus, x' +
      ' sub 1, close paren, squared plus, open paren, y sub 2, minus, y sub' +
      ' 1, close paren, squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root044
 */
sre.ClearspeakEnglishRoots.prototype.testRoot044 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><msqrt><mrow><mfrac><mn>1</mn><mn>2</mn>' +
      '</mfrac></mrow></msqrt></mrow></math>';
  var speech = 'the positive square root of one half';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root045
 */
sre.ClearspeakEnglishRoots.prototype.testRoot045 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><msqrt><mrow><mfrac><mrow><mn>23</mn></mrow>' +
      '<mrow><mn>66</mn></mrow></mfrac></mrow></msqrt></mrow></math>';
  var speech = 'the positive square root of, 23 over 66';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root046
 */
sre.ClearspeakEnglishRoots.prototype.testRoot046 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><msqrt><mrow><mfrac><mrow><mi>x</mi><mo>+</mo>' +
      '<mn>1</mn></mrow><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>5</mn>' +
      '</mrow></mfrac></mrow></msqrt></mrow></math>';
  var speech = 'the positive square root of, the fraction with numerator x' +
      ' plus 1, and denominator 2 x, plus 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root047
 */
sre.ClearspeakEnglishRoots.prototype.testRoot047 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mfrac><mrow><mo>−</mo><mi>b</mi><mo>±</mo>' +
      '<msqrt><mrow><msup><mi>b</mi><mn>2</mn></msup><mo>−</mo><mn>4</mn>' +
      '<mi>a</mi><mi>c</mi></mrow></msqrt></mrow><mrow><mn>2</mn><mi>a</mi>' +
      '</mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator negative b plus or minus the' +
      ' square root of b squared minus 4 a c, and denominator 2 a';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root048
 */
sre.ClearspeakEnglishRoots.prototype.testRoot048 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = 'the square root of 2, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root049
 */
sre.ClearspeakEnglishRoots.prototype.testRoot049 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mn>3</mn><mo>+</mo><msqrt><mn>2</mn></msqrt>' +
      '</mrow></math>';
  var speech = '3 plus the square root of 2, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root050
 */
sre.ClearspeakEnglishRoots.prototype.testRoot050 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mn>3</mn><mo>±</mo><msqrt><mn>2</mn></msqrt>' +
      '</mrow></math>';
  var speech = '3 plus or minus the square root of 2, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root051
 */
sre.ClearspeakEnglishRoots.prototype.testRoot051 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mn>3</mn><mo>∓</mo><msqrt><mn>2</mn></msqrt>' +
      '</mrow></math>';
  var speech = '3 minus or plus the square root of 2, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root052
 */
sre.ClearspeakEnglishRoots.prototype.testRoot052 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mo>−</mo><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = 'the negative square root of 2, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root053
 */
sre.ClearspeakEnglishRoots.prototype.testRoot053 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mn>3</mn><mo>−</mo><msqrt><mn>2</mn></msqrt>' +
      '</mrow></math>';
  var speech = '3 minus the square root of 2, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root054
 */
sre.ClearspeakEnglishRoots.prototype.testRoot054 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mn>3</mn><mo>+</mo><mo>−</mo><msqrt><mn>2</mn>' +
      '</msqrt></mrow></math>';
  var speech = '3 plus the negative square root of 2, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root055
 */
sre.ClearspeakEnglishRoots.prototype.testRoot055 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mn>3</mn><mo>−</mo><mo>−</mo><msqrt><mn>2</mn>' +
      '</msqrt></mrow></math>';
  var speech = '3 minus the negative square root of 2, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root056
 */
sre.ClearspeakEnglishRoots.prototype.testRoot056 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mn>3</mn><mo>+</mo><mrow><mo>(</mo><mrow><mo>−' +
      '</mo><msqrt><mn>2</mn></msqrt></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '3 plus, open paren, the negative square root of 2, end' +
      ' root, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root057
 */
sre.ClearspeakEnglishRoots.prototype.testRoot057 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mn>3</mn><mo>−</mo><mrow><mo>(</mo><mrow><mo>−' +
      '</mo><msqrt><mn>2</mn></msqrt></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '3 minus, open paren, the negative square root of 2, end' +
      ' root, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root058
 */
sre.ClearspeakEnglishRoots.prototype.testRoot058 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><msqrt><mrow><mi>x</mi><mo>+</mo><mn>1</mn>' +
      '</mrow></msqrt></mrow></math>';
  var speech = 'the square root of x plus 1, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root058a
 */
sre.ClearspeakEnglishRoots.prototype.testRoot058a = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><msqrt><mi>x</mi></msqrt><mo>+</mo><mn>1</mn>' +
      '</mrow></math>';
  var speech = 'the square root of x, end root, plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root059
 */
sre.ClearspeakEnglishRoots.prototype.testRoot059 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mo>−</mo><msqrt><mi>x</mi></msqrt></mrow></math>';
  var speech = 'the negative square root of x, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root060
 */
sre.ClearspeakEnglishRoots.prototype.testRoot060 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><msqrt><mi>x' +
      '</mi></msqrt></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup></mrow>' +
      '</math>';
  var speech = 'open paren, the square root of x, end root, close paren,' +
      ' squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root061
 */
sre.ClearspeakEnglishRoots.prototype.testRoot061 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mo>−</mo><msup><mrow><mrow><mo>(</mo><mrow>' +
      '<msqrt><mi>x</mi></msqrt></mrow><mo>)</mo></mrow></mrow><mn>2</mn>' +
      '</msup></mrow></math>';
  var speech = 'negative, open paren, the square root of x, end root, close' +
      ' paren, squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root062
 */
sre.ClearspeakEnglishRoots.prototype.testRoot062 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><msup><mrow><msqrt><mi>x</mi></msqrt></mrow>' +
      '<mn>2</mn></msup></mrow></math>';
  var speech = 'the square root of x, end root, squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root063
 */
sre.ClearspeakEnglishRoots.prototype.testRoot063 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><msqrt><mrow><msup><mi>x</mi><mn>2</mn></msup>' +
      '</mrow></msqrt></mrow></math>';
  var speech = 'the square root of x squared, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root064
 */
sre.ClearspeakEnglishRoots.prototype.testRoot064 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><msqrt><mrow><msup><mi>x</mi><mn>2</mn></msup>' +
      '<mo>+</mo><msup><mi>y</mi><mn>2</mn></msup></mrow></msqrt></mrow>' +
      '</math>';
  var speech = 'the square root of x squared plus y squared, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root065
 */
sre.ClearspeakEnglishRoots.prototype.testRoot065 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><msqrt><mrow><msub><mi>x</mi><mn>1</mn></msub>' +
      '<msup><mrow/><mn>2</mn></msup><mo>+</mo><msub><mi>x</mi><mn>2</mn>' +
      '</msub><msup><mrow/><mn>2</mn></msup></mrow></msqrt></mrow></math>';
  var speech = 'the square root of, x sub 1, squared plus, x sub 2,' +
      ' squared, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root066
 */
sre.ClearspeakEnglishRoots.prototype.testRoot066 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><msqrt><mrow><msup><mrow><mrow><mo>(</mo><mrow>' +
      '<msub><mi>x</mi><mn>2</mn></msub><mo>−</mo><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup><mo>+' +
      '</mo><msup><mrow><mrow><mo>(</mo><mrow><msub><mi>y</mi><mn>2</mn>' +
      '</msub><mo>−</mo><msub><mi>y</mi><mn>1</mn></msub></mrow><mo>)</mo>' +
      '</mrow></mrow><mn>2</mn></msup></mrow></msqrt></mrow></math>';
  var speech = 'the square root of, open paren, x sub 2, minus, x sub 1,' +
      ' close paren, squared plus, open paren, y sub 2, minus, y sub 1,' +
      ' close paren, squared, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root067
 */
sre.ClearspeakEnglishRoots.prototype.testRoot067 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><msqrt><mrow><mfrac><mn>1</mn><mn>2</mn>' +
      '</mfrac></mrow></msqrt></mrow></math>';
  var speech = 'the square root of one half, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root068
 */
sre.ClearspeakEnglishRoots.prototype.testRoot068 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><msqrt><mrow><mfrac><mrow><mn>23</mn></mrow>' +
      '<mrow><mn>66</mn></mrow></mfrac></mrow></msqrt></mrow></math>';
  var speech = 'the square root of, 23 over 66, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root069
 */
sre.ClearspeakEnglishRoots.prototype.testRoot069 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><msqrt><mrow><mfrac><mrow><mi>x</mi><mo>+</mo>' +
      '<mn>1</mn></mrow><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>5</mn>' +
      '</mrow></mfrac></mrow></msqrt></mrow></math>';
  var speech = 'the square root of, the fraction with numerator x plus 1,' +
      ' and denominator 2 x, plus 5, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root070
 */
sre.ClearspeakEnglishRoots.prototype.testRoot070 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mfrac><mrow><mo>−</mo><mi>b</mi><mo>±</mo>' +
      '<msqrt><mrow><msup><mi>b</mi><mn>2</mn></msup><mo>−</mo><mn>4</mn>' +
      '<mi>a</mi><mi>c</mi></mrow></msqrt></mrow><mrow><mn>2</mn><mi>a</mi>' +
      '</mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator negative b plus or minus the' +
      ' square root of b squared minus 4 a c, end root, and denominator 2 a';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root071
 */
sre.ClearspeakEnglishRoots.prototype.testRoot071 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = 'the positive square root of 2, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root072
 */
sre.ClearspeakEnglishRoots.prototype.testRoot072 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mn>3</mn><mo>+</mo><msqrt><mn>2</mn></msqrt>' +
      '</mrow></math>';
  var speech = '3 plus the positive square root of 2, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root073
 */
sre.ClearspeakEnglishRoots.prototype.testRoot073 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mn>3</mn><mo>±</mo><msqrt><mn>2</mn></msqrt>' +
      '</mrow></math>';
  var speech = '3 plus or minus the square root of 2, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root074
 */
sre.ClearspeakEnglishRoots.prototype.testRoot074 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mn>3</mn><mo>∓</mo><msqrt><mn>2</mn></msqrt>' +
      '</mrow></math>';
  var speech = '3 minus or plus the square root of 2, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root075
 */
sre.ClearspeakEnglishRoots.prototype.testRoot075 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mo>−</mo><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = 'the negative square root of 2, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root076
 */
sre.ClearspeakEnglishRoots.prototype.testRoot076 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mn>3</mn><mo>−</mo><msqrt><mn>2</mn></msqrt>' +
      '</mrow></math>';
  var speech = '3 minus the positive square root of 2, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root077
 */
sre.ClearspeakEnglishRoots.prototype.testRoot077 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mn>3</mn><mo>+</mo><mo>−</mo><msqrt><mn>2</mn>' +
      '</msqrt></mrow></math>';
  var speech = '3 plus the negative square root of 2, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root078
 */
sre.ClearspeakEnglishRoots.prototype.testRoot078 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mn>3</mn><mo>−</mo><mo>−</mo><msqrt><mn>2</mn>' +
      '</msqrt></mrow></math>';
  var speech = '3 minus the negative square root of 2, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root079
 */
sre.ClearspeakEnglishRoots.prototype.testRoot079 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mn>3</mn><mo>+</mo><mrow><mo>(</mo><mrow><mo>−' +
      '</mo><msqrt><mn>2</mn></msqrt></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '3 plus, open paren, the negative square root of 2, end' +
      ' root, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root080
 */
sre.ClearspeakEnglishRoots.prototype.testRoot080 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mn>3</mn><mo>−</mo><mrow><mo>(</mo><mrow><mo>−' +
      '</mo><msqrt><mn>2</mn></msqrt></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '3 minus, open paren, the negative square root of 2, end' +
      ' root, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root081
 */
sre.ClearspeakEnglishRoots.prototype.testRoot081 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><msqrt><mrow><mi>x</mi><mo>+</mo><mn>1</mn>' +
      '</mrow></msqrt></mrow></math>';
  var speech = 'the positive square root of x plus 1, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root081a
 */
sre.ClearspeakEnglishRoots.prototype.testRoot081a = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><msqrt><mi>x</mi></msqrt><mo>+</mo><mn>1</mn>' +
      '</mrow></math>';
  var speech = 'the positive square root of x, end root, plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root082
 */
sre.ClearspeakEnglishRoots.prototype.testRoot082 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mo>−</mo><msqrt><mi>x</mi></msqrt></mrow></math>';
  var speech = 'the negative square root of x, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root083
 */
sre.ClearspeakEnglishRoots.prototype.testRoot083 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><msqrt><mi>x' +
      '</mi></msqrt></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup></mrow>' +
      '</math>';
  var speech = 'open paren, the positive square root of x, end root, close' +
      ' paren, squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root084
 */
sre.ClearspeakEnglishRoots.prototype.testRoot084 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mo>−</mo>' +
      '<msqrt><mi>x</mi></msqrt></mrow><mo>)</mo></mrow></mrow><mn>2</mn>' +
      '</msup></mrow></math>';
  var speech = 'open paren, the negative square root of x, end root, close' +
      ' paren, squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root085
 */
sre.ClearspeakEnglishRoots.prototype.testRoot085 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><msup><mrow><msqrt><mi>x</mi></msqrt></mrow>' +
      '<mn>2</mn></msup></mrow></math>';
  var speech = 'the positive square root of x, end root, squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root086
 */
sre.ClearspeakEnglishRoots.prototype.testRoot086 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><msqrt><mrow><msup><mi>x</mi><mn>2</mn></msup>' +
      '</mrow></msqrt></mrow></math>';
  var speech = 'the positive square root of x squared, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root087
 */
sre.ClearspeakEnglishRoots.prototype.testRoot087 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><msqrt><mrow><msup><mi>x</mi><mn>2</mn></msup>' +
      '<mo>+</mo><msup><mi>y</mi><mn>2</mn></msup></mrow></msqrt></mrow>' +
      '</math>';
  var speech = 'the positive square root of x squared plus y squared, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root088
 */
sre.ClearspeakEnglishRoots.prototype.testRoot088 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><msqrt><mrow><msub><mi>x</mi><mn>1</mn></msub>' +
      '<msup><mrow/><mn>2</mn></msup><mo>+</mo><msub><mi>x</mi><mn>2</mn>' +
      '</msub><msup><mrow/><mn>2</mn></msup></mrow></msqrt></mrow></math>';
  var speech = 'the positive square root of, x sub 1, squared plus, x sub' +
      ' 2, squared, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root089
 */
sre.ClearspeakEnglishRoots.prototype.testRoot089 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><msqrt><mrow><msup><mrow><mrow><mo>(</mo><mrow>' +
      '<msub><mi>x</mi><mn>2</mn></msub><mo>−</mo><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup><mo>+' +
      '</mo><msup><mrow><mrow><mo>(</mo><mrow><msub><mi>y</mi><mn>2</mn>' +
      '</msub><mo>−</mo><msub><mi>y</mi><mn>1</mn></msub></mrow><mo>)</mo>' +
      '</mrow></mrow><mn>2</mn></msup></mrow></msqrt></mrow></math>';
  var speech = 'the positive square root of, open paren, x sub 2, minus, x' +
      ' sub 1, close paren, squared plus, open paren, y sub 2, minus, y sub' +
      ' 1, close paren, squared, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root090
 */
sre.ClearspeakEnglishRoots.prototype.testRoot090 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><msqrt><mrow><mfrac><mn>1</mn><mn>2</mn>' +
      '</mfrac></mrow></msqrt></mrow></math>';
  var speech = 'the positive square root of one half, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root091
 */
sre.ClearspeakEnglishRoots.prototype.testRoot091 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><msqrt><mrow><mfrac><mrow><mn>23</mn></mrow>' +
      '<mrow><mn>66</mn></mrow></mfrac></mrow></msqrt></mrow></math>';
  var speech = 'the positive square root of, 23 over 66, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root092
 */
sre.ClearspeakEnglishRoots.prototype.testRoot092 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><msqrt><mrow><mfrac><mrow><mi>x</mi><mo>+</mo>' +
      '<mn>1</mn></mrow><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>5</mn>' +
      '</mrow></mfrac></mrow></msqrt></mrow></math>';
  var speech = 'the positive square root of, the fraction with numerator x' +
      ' plus 1, and denominator 2 x, plus 5, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example Root093
 */
sre.ClearspeakEnglishRoots.prototype.testRoot093 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mfrac><mrow><mo>−</mo><mi>b</mi><mo>±</mo>' +
      '<msqrt><mrow><msup><mi>b</mi><mn>2</mn></msup><mo>−</mo><mn>4</mn>' +
      '<mi>a</mi><mi>c</mi></mrow></msqrt></mrow><mrow><mn>2</mn><mi>a</mi>' +
      '</mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator negative b plus or minus the' +
      ' square root of b squared minus 4 a c, end root, and denominator 2 a';
  this.executeRuleTest(mathml, speech, preference);
};


//
// Higher order roots
//


/**
 * Testing ClearspeakEnglishRoots Example HighRoot001
 */
sre.ClearspeakEnglishRoots.prototype.testHighRoot001 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mroot><mi>y</mi><mn>3</mn></mroot></mrow></math>';
  var speech = 'the cube root of y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example HighRoot002
 */
sre.ClearspeakEnglishRoots.prototype.testHighRoot002 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mroot><mi>n</mi><mn>4</mn></mroot></mrow></math>';
  var speech = 'the fourth root of n';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example HighRoot003
 */
sre.ClearspeakEnglishRoots.prototype.testHighRoot003 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mroot><mrow><mn>35</mn></mrow><mn>5</mn>' +
      '</mroot></mrow></math>';
  var speech = 'the fifth root of 35';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example HighRoot004
 */
sre.ClearspeakEnglishRoots.prototype.testHighRoot004 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mroot><mrow><mn>146</mn></mrow><mn>9</mn>' +
      '</mroot></mrow></math>';
  var speech = 'the ninth root of 146';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example HighRoot005
 */
sre.ClearspeakEnglishRoots.prototype.testHighRoot005 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mroot><mi>d</mi><mi>n</mi></mroot></mrow></math>';
  var speech = 'the nth root of d';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example HighRoot006
 */
sre.ClearspeakEnglishRoots.prototype.testHighRoot006 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mroot><mrow><mn>243</mn></mrow><mi>m</mi>' +
      '</mroot></mrow></math>';
  var speech = 'the mth root of 243';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example HighRoot007
 */
sre.ClearspeakEnglishRoots.prototype.testHighRoot007 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mroot><mrow><msup><mn>2</mn><mi>i</mi></msup>' +
      '</mrow><mi>i</mi></mroot></mrow></math>';
  var speech = 'the ith root of 2 to the ith power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example HighRoot008
 */
sre.ClearspeakEnglishRoots.prototype.testHighRoot008 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mroot><mrow><mn>125</mn></mrow><mi>j</mi>' +
      '</mroot></mrow></math>';
  var speech = 'the jth root of 125';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example HighRoot009
 */
sre.ClearspeakEnglishRoots.prototype.testHighRoot009 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mo>−</mo><mroot><mi>y</mi><mn>3</mn></mroot>' +
      '</mrow></math>';
  var speech = 'negative the cube root of y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example HighRoot010
 */
sre.ClearspeakEnglishRoots.prototype.testHighRoot010 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mo>−</mo><mroot><mi>n</mi><mn>4</mn></mroot>' +
      '</mrow></math>';
  var speech = 'negative the fourth root of n';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example HighRoot011
 */
sre.ClearspeakEnglishRoots.prototype.testHighRoot011 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mroot><mi>y</mi><mn>3</mn></mroot></mrow></math>';
  var speech = 'the cube root of y, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example HighRoot012
 */
sre.ClearspeakEnglishRoots.prototype.testHighRoot012 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mroot><mi>n</mi><mn>4</mn></mroot></mrow></math>';
  var speech = 'the fourth root of n, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example HighRoot013
 */
sre.ClearspeakEnglishRoots.prototype.testHighRoot013 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mroot><mrow><mn>35</mn></mrow><mn>5</mn>' +
      '</mroot></mrow></math>';
  var speech = 'the fifth root of 35, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example HighRoot014
 */
sre.ClearspeakEnglishRoots.prototype.testHighRoot014 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mroot><mrow><mn>146</mn></mrow><mn>9</mn>' +
      '</mroot></mrow></math>';
  var speech = 'the ninth root of 146, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example HighRoot015
 */
sre.ClearspeakEnglishRoots.prototype.testHighRoot015 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mroot><mi>d</mi><mi>n</mi></mroot></mrow></math>';
  var speech = 'the nth root of d, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example HighRoot016
 */
sre.ClearspeakEnglishRoots.prototype.testHighRoot016 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mroot><mrow><mn>243</mn></mrow><mi>m</mi>' +
      '</mroot></mrow></math>';
  var speech = 'the mth root of 243, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example HighRoot017
 */
sre.ClearspeakEnglishRoots.prototype.testHighRoot017 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mroot><mrow><msup><mn>2</mn><mi>i</mi></msup>' +
      '</mrow><mi>i</mi></mroot></mrow></math>';
  var speech = 'the ith root of 2 to the ith power, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example HighRoot018
 */
sre.ClearspeakEnglishRoots.prototype.testHighRoot018 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mroot><mrow><mn>125</mn></mrow><mi>j</mi>' +
      '</mroot></mrow></math>';
  var speech = 'the jth root of 125, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example HighRoot019
 */
sre.ClearspeakEnglishRoots.prototype.testHighRoot019 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mo>−</mo><mroot><mi>y</mi><mn>3</mn></mroot>' +
      '</mrow></math>';
  var speech = 'negative the cube root of y, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example HighRoot020
 */
sre.ClearspeakEnglishRoots.prototype.testHighRoot020 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mo>−</mo><mroot><mi>n</mi><mn>4</mn></mroot>' +
      '</mrow></math>';
  var speech = 'negative the fourth root of n, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example HighRoot021
 */
sre.ClearspeakEnglishRoots.prototype.testHighRoot021 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mroot><mi>y</mi><mn>3</mn></mroot></mrow></math>';
  var speech = 'the cube root of y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example HighRoot022
 */
sre.ClearspeakEnglishRoots.prototype.testHighRoot022 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mroot><mi>n</mi><mn>4</mn></mroot></mrow></math>';
  var speech = 'the fourth root of n';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example HighRoot023
 */
sre.ClearspeakEnglishRoots.prototype.testHighRoot023 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mroot><mrow><mn>35</mn></mrow><mn>5</mn>' +
      '</mroot></mrow></math>';
  var speech = 'the fifth root of 35';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example HighRoot024
 */
sre.ClearspeakEnglishRoots.prototype.testHighRoot024 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mroot><mrow><mn>146</mn></mrow><mn>9</mn>' +
      '</mroot></mrow></math>';
  var speech = 'the ninth root of 146';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example HighRoot025
 */
sre.ClearspeakEnglishRoots.prototype.testHighRoot025 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mroot><mi>d</mi><mi>n</mi></mroot></mrow></math>';
  var speech = 'the nth root of d';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example HighRoot026
 */
sre.ClearspeakEnglishRoots.prototype.testHighRoot026 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mroot><mrow><mn>243</mn></mrow><mi>m</mi>' +
      '</mroot></mrow></math>';
  var speech = 'the mth root of 243';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example HighRoot027
 */
sre.ClearspeakEnglishRoots.prototype.testHighRoot027 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mroot><mrow><msup><mn>2</mn><mi>i</mi></msup>' +
      '</mrow><mi>i</mi></mroot></mrow></math>';
  var speech = 'the ith root of 2 to the ith power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example HighRoot028
 */
sre.ClearspeakEnglishRoots.prototype.testHighRoot028 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mroot><mrow><mn>125</mn></mrow><mi>j</mi>' +
      '</mroot></mrow></math>';
  var speech = 'the jth root of 125';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example HighRoot029
 */
sre.ClearspeakEnglishRoots.prototype.testHighRoot029 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mo>−</mo><mroot><mi>y</mi><mn>3</mn></mroot>' +
      '</mrow></math>';
  var speech = 'negative the cube root of y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example HighRoot030
 */
sre.ClearspeakEnglishRoots.prototype.testHighRoot030 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mo>−</mo><mroot><mi>n</mi><mn>4</mn></mroot>' +
      '</mrow></math>';
  var speech = 'negative the fourth root of n';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example HighRoot031
 */
sre.ClearspeakEnglishRoots.prototype.testHighRoot031 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mroot><mi>y</mi><mn>3</mn></mroot></mrow></math>';
  var speech = 'the cube root of y, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example HighRoot032
 */
sre.ClearspeakEnglishRoots.prototype.testHighRoot032 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mroot><mi>n</mi><mn>4</mn></mroot></mrow></math>';
  var speech = 'the fourth root of n, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example HighRoot033
 */
sre.ClearspeakEnglishRoots.prototype.testHighRoot033 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mroot><mrow><mn>35</mn></mrow><mn>5</mn>' +
      '</mroot></mrow></math>';
  var speech = 'the fifth root of 35, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example HighRoot034
 */
sre.ClearspeakEnglishRoots.prototype.testHighRoot034 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mroot><mrow><mn>146</mn></mrow><mn>9</mn>' +
      '</mroot></mrow></math>';
  var speech = 'the ninth root of 146, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example HighRoot035
 */
sre.ClearspeakEnglishRoots.prototype.testHighRoot035 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mroot><mi>d</mi><mi>n</mi></mroot></mrow></math>';
  var speech = 'the nth root of d, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example HighRoot036
 */
sre.ClearspeakEnglishRoots.prototype.testHighRoot036 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mroot><mrow><mn>243</mn></mrow><mi>m</mi>' +
      '</mroot></mrow></math>';
  var speech = 'the mth root of 243, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example HighRoot037
 */
sre.ClearspeakEnglishRoots.prototype.testHighRoot037 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mroot><mrow><msup><mn>2</mn><mi>i</mi></msup>' +
      '</mrow><mi>i</mi></mroot></mrow></math>';
  var speech = 'the ith root of 2 to the ith power, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example HighRoot038
 */
sre.ClearspeakEnglishRoots.prototype.testHighRoot038 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mroot><mrow><mn>125</mn></mrow><mi>j</mi>' +
      '</mroot></mrow></math>';
  var speech = 'the jth root of 125, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example HighRoot039
 */
sre.ClearspeakEnglishRoots.prototype.testHighRoot039 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mo>−</mo><mroot><mi>y</mi><mn>3</mn></mroot>' +
      '</mrow></math>';
  var speech = 'negative the cube root of y, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishRoots Example HighRoot040
 */
sre.ClearspeakEnglishRoots.prototype.testHighRoot040 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mo>−</mo><mroot><mi>n</mi><mn>4</mn></mroot>' +
      '</mrow></math>';
  var speech = 'negative the fourth root of n, end root';
  this.executeRuleTest(mathml, speech, preference);
};

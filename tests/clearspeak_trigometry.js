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


goog.provide('sre.ClearspeakTrigometry');

goog.require('sre.ClearspeakRuleTest');



/**
* @constructor
* @extends {sre.ClearspeakRuleTest}
*/
sre.ClearspeakTrigometry = function() {
sre.ClearspeakTrigometry.base(this, 'constructor');

/**
* @override
*/
this.information = 'ClearspeakTrigometry rule tests.';

};
goog.inherits(sre.ClearspeakTrigometry, sre.ClearspeakRuleTest);



//
// Trigonometry
//


//
// Table 1: Basic Trigonometric Functions
//


/**
 * Testing ClearspeakTrigometry Example Trig001
 */
sre.ClearspeakTrigometry.prototype.untestTrig001 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>sin</mi><mi>x</mi></mrow></math>';
  var speech = 'Sine x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example Trig002
 */
sre.ClearspeakTrigometry.prototype.untestTrig002 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>cos</mi><mi>x</mi></mrow></math>';
  var speech = 'Cosine x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example Trig003
 */
sre.ClearspeakTrigometry.prototype.untestTrig003 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>tan</mi><mi>θ</mi></mrow></math>';
  var speech = 'Tangent theta';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example Trig004
 */
sre.ClearspeakTrigometry.prototype.untestTrig004 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>sec</mi><mi>θ</mi></mrow></math>';
  var speech = 'Secant theta';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example Trig005
 */
sre.ClearspeakTrigometry.prototype.untestTrig005 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>csc</mi><mi>x</mi></mrow></math>';
  var speech = 'Cosecant x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example Trig006
 */
sre.ClearspeakTrigometry.prototype.untestTrig006 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>cot</mi><mi>x</mi></mrow></math>';
  var speech = 'Cotangent x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example Trig007
 */
sre.ClearspeakTrigometry.prototype.untestTrig007 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mn>2</mn></msup><mi>x</mi></mrow></math>';
  var speech = 'Sine squared x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example Trig008
 */
sre.ClearspeakTrigometry.prototype.untestTrig008 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>cos</mi></mrow><mn>3</mn></msup><mi>x</mi></mrow></math>';
  var speech = 'Cosine cubed x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example Trig009
 */
sre.ClearspeakTrigometry.prototype.untestTrig009 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>tan</mi></mrow><mn>2</mn></msup><mi>x</mi></mrow></math>';
  var speech = 'Tangent squared x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example Trig010
 */
sre.ClearspeakTrigometry.prototype.untestTrig010 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>sec</mi></mrow><mn>3</mn></msup><mi>x</mi></mrow></math>';
  var speech = 'Secant cubed x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example Trig011
 */
sre.ClearspeakTrigometry.prototype.untestTrig011 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>csc</mi></mrow><mn>2</mn></msup><mi>x</mi></mrow></math>';
  var speech = 'Cosecant squared x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example Trig012
 */
sre.ClearspeakTrigometry.prototype.untestTrig012 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>cot</mi></mrow><mn>2</mn></msup><mi>x</mi></mrow></math>';
  var speech = 'Cotangent squared x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example Trig013
 */
sre.ClearspeakTrigometry.prototype.untestTrig013 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>sin</mi><mn>2</mn><mi>π</mi></mrow></math>';
  var speech = 'Sine 2 pi';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example Trig014
 */
sre.ClearspeakTrigometry.prototype.untestTrig014 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><mi>π</mi><mi>k</mi><mo>+</mo><mfrac><mi>π</mi><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'The sine of, open paren pi k plus pi over 2, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example Trig015
 */
sre.ClearspeakTrigometry.prototype.untestTrig015 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>cos</mi><mfrac><mi>π</mi><mn>2</mn></mfrac></mrow></math>';
  var speech = 'The cosine of pi over 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example Trig016
 */
sre.ClearspeakTrigometry.prototype.untestTrig016 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>sin</mi><mfrac><mi>π</mi><mn>2</mn></mfrac></mrow></math>';
  var speech = 'The sine of pi over 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example Trig017
 */
sre.ClearspeakTrigometry.prototype.untestTrig017 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>sin</mi><mi>π</mi></mrow><mn>2</mn></mfrac></mrow></math>';
  var speech = 'sine pi over 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example Trig018
 */
sre.ClearspeakTrigometry.prototype.untestTrig018 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mfrac><mn>2</mn><mrow><mi>sin</mi><mi>π</mi></mrow></mfrac></mrow></math>';
  var speech = '2 over sine pi';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example Trig019
 */
sre.ClearspeakTrigometry.prototype.untestTrig019 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>sin</mi><mfrac><mi>π</mi><mn>2</mn></mfrac></mrow><mn>3</mn></mfrac></mrow></math>';
  var speech = 'The fraction with numerator, the sine of pi over 2, and denominator 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example Trig020
 */
sre.ClearspeakTrigometry.prototype.untestTrig020 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>tan</mi><mrow><mo>(</mo><mrow><mo>−</mo><mi>π</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'tangent negative pi';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example Trig021
 */
sre.ClearspeakTrigometry.prototype.untestTrig021 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mi>π</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'The sine of, open paren x plus pi, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example Trig022
 */
sre.ClearspeakTrigometry.prototype.untestTrig022 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>cos</mi><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mfrac><mi>π</mi><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'The cosine of, open paren, x plus, pi over 2, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example Trig023
 */
sre.ClearspeakTrigometry.prototype.untestTrig023 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>cos</mi><mrow><mo>(</mo><mrow><mfrac><mi>π</mi><mn>2</mn></mfrac><mo>+</mo><mi>x</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'The cosine of, open paren, pi over 2, plus x, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example Trig024
 */
sre.ClearspeakTrigometry.prototype.untestTrig024 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mn>2</mn></msup><mi>x</mi><mo>+</mo><msup><mrow><mi>cos</mi></mrow><mn>2</mn></msup><mi>x</mi><mo>=</mo><mn>1</mn></mrow></math>';
  var speech = 'Sine squared x, plus, cosine squared x equals 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example Trig025
 */
sre.ClearspeakTrigometry.prototype.untestTrig025 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mn>4</mn></msup><mi>x</mi></mrow></math>';
  var speech = 'The fourth power of sine x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example Trig026
 */
sre.ClearspeakTrigometry.prototype.untestTrig026 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>cos</mi></mrow><mn>5</mn></msup><mi>x</mi></mrow></math>';
  var speech = 'The fifth power of cosine x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example Trig027
 */
sre.ClearspeakTrigometry.prototype.untestTrig027 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>tan</mi></mrow><mi>n</mi></msup><mi>x</mi></mrow></math>';
  var speech = 'The nth power of tangent x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example Trig028
 */
sre.ClearspeakTrigometry.prototype.untestTrig028 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>sin</mi><mi>x</mi></mrow><mrow><mi>cos</mi><mi>x</mi></mrow></mfrac></mrow></math>';
  var speech = 'Sine x over cosine x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example Trig029
 */
sre.ClearspeakTrigometry.prototype.untestTrig029 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>tan</mi><mn>35</mn><mo>°</mo></mrow></math>';
  var speech = 'Tangent 35 degrees';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example Trig030
 */
sre.ClearspeakTrigometry.prototype.untestTrig030 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><mn>45</mn><mo>°</mo><mo>+</mo><mn>30</mn><mo>°</mo></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'The sine of, open paren, 45 degrees plus 30 degrees, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example Trig031
 */
sre.ClearspeakTrigometry.prototype.untestTrig031 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>tan</mi><mrow><mo>(</mo><mrow><mo>∠</mo><mi>D</mi><mi>E</mi><mi>F</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'The tangent of, open paren, angle DEF, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example Trig032
 */
sre.ClearspeakTrigometry.prototype.untestTrig032 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>tan</mi><mrow><mo>(</mo><mrow><mo>∠</mo><mi>D</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'The tangent of, open paren, angle D, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example Trig033
 */
sre.ClearspeakTrigometry.prototype.untestTrig033 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>sin</mi><mo stretchy="false">(</mo><mi>x</mi><mo>+</mo><mi>y</mi><mo stretchy="false">)</mo><mo>=</mo><mi>sin</mi><mi>x</mi><mi>cos</mi><mi>y</mi><mo>+</mo><mi>cos</mi><mi>x</mi><mi>sin</mi><mi>y</mi></mrow></math>';
  var speech = 'The Sine of, open paren, x plus y, close paren, equals, sine x cosine y, plus, cosine x sine y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example Trig034
 */
sre.ClearspeakTrigometry.prototype.untestTrig034 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>cos</mi><mo stretchy="false">(</mo><mi>x</mi><mo>+</mo><mi>y</mi><mo stretchy="false">)</mo><mo>=</mo><mi>cos</mi><mi>x</mi><mi>cos</mi><mi>y</mi><mo>−</mo><mi>sin</mi><mi>x</mi><mi>sin</mi><mi>y</mi></mrow></math>';
  var speech = 'The Cosine of, open paren, x plus y,close paren, equals cosine x cosine y, minus, sine x sine y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example Trig035
 */
sre.ClearspeakTrigometry.prototype.untestTrig035 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>tan</mi><mo stretchy="false">(</mo><mi>x</mi><mo>+</mo><mi>y</mi><mo stretchy="false">)</mo><mo>=</mo><mfrac><mrow><mi>tan</mi><mi>x</mi><mo>−</mo><mi>tan</mi><mi>y</mi></mrow><mrow><mn>1</mn><mo>−</mo><mi>tan</mi><mi>x</mi><mi>tan</mi><mi>y</mi></mrow></mfrac></mrow></math>';
  var speech = 'The tangent of, open paren, x plus y, close paren, equals, the fraction with numerator tangent x minus tangent y, and denominator 1 minus tangent x tangent y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example Trig036
 */
sre.ClearspeakTrigometry.prototype.untestTrig036 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>sin</mi><mn>30</mn><mo>°</mo><mi>cos</mi><mn>15</mn><mo>°</mo><mo>+</mo><mi>cos</mi><mn>30</mn><mo>°</mo><mi>sin</mi><mn>15</mn><mo>°</mo></mrow></math>';
  var speech = 'Sine 30 degrees cosine 15 degrees, plus, cosine 30 degrees sine 15 degrees';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example Trig037
 */
sre.ClearspeakTrigometry.prototype.untestTrig037 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>tan</mi><mrow><mo>(</mo><mrow><mfrac><mi>π</mi><mn>6</mn></mfrac><mo>+</mo><mfrac><mrow><mn>2</mn><mi>π</mi></mrow><mn>3</mn></mfrac></mrow><mo>)</mo></mrow><mo>=</mo><mfrac><mrow><mi>tan</mi><mfrac><mi>π</mi><mn>6</mn></mfrac><mo>−</mo><mi>tan</mi><mfrac><mrow><mn>2</mn><mi>π</mi></mrow><mn>3</mn></mfrac></mrow><mrow><mn>1</mn><mo>−</mo><mi>tan</mi><mfrac><mi>π</mi><mn>6</mn></mfrac><mi>tan</mi><mfrac><mrow><mn>2</mn><mi>π</mi></mrow><mn>3</mn></mfrac></mrow></mfrac></mrow></math>';
  var speech = '<p>The tangent of, open paren, pi over 6, plus, 2 pi over 3, close paren</p><p>equals</p><p>the fraction with numerator, the tangent of, pi over 6, minus, the tangent of 2 pi over 3,</p><p>and denominator, 1 minus, the tangent of pi over 6 the tangent of 2 pi over 3</p>';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example Trig038
 */
sre.ClearspeakTrigometry.prototype.untestTrig038 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>tan</mi><mn>2</mn><mi>x</mi><mo>=</mo><mfrac><mrow><mn>2</mn><mi>tan</mi><mi>x</mi></mrow><mrow><mn>1</mn><mo>−</mo><msup><mrow><mi>tan</mi></mrow><mn>2</mn></msup><mi>x</mi></mrow></mfrac></mrow></math>';
  var speech = 'Tangent 2x, equals, the fraction with numerator 2 tangent x, and denominator 1 minus tangent squared x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example Trig039
 */
sre.ClearspeakTrigometry.prototype.untestTrig039 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>cos</mi><mn>2</mn><mi>x</mi><mo>=</mo><mn>2</mn><msup><mrow><mi>cos</mi></mrow><mn>2</mn></msup><mi>x</mi><mo>−</mo><mn>1</mn></mrow></math>';
  var speech = 'Cosine 2x, equals, 2 cosine squared x, minus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example Trig040
 */
sre.ClearspeakTrigometry.prototype.untestTrig040 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>sin</mi><mfrac><mi>x</mi><mn>2</mn></mfrac><mo>=</mo><mo>±</mo><msqrt><mrow><mfrac><mrow><mn>1</mn><mo>−</mo><mi>cos</mi><mi>x</mi></mrow><mn>2</mn></mfrac></mrow></msqrt></mrow></math>';
  var speech = 'The sine of x over 2 equals plus or minus the square root of the fraction with numerator 1 minus cosine x, and denominator 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example Trig041
 */
sre.ClearspeakTrigometry.prototype.untestTrig041 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>tan</mi><mfrac><mi>x</mi><mn>2</mn></mfrac><mo>=</mo><mo>±</mo><msqrt><mrow><mfrac><mrow><mn>1</mn><mo>−</mo><mi>cos</mi><mi>x</mi></mrow><mrow><mn>1</mn><mo>+</mo><mi>cos</mi><mi>x</mi></mrow></mfrac></mrow></msqrt></mrow></math>';
  var speech = 'The tangent of x over 2 equals plus or minus the square root of the fraction with numerator 1 minus cosine x, and denominator 1 plus cosine x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example Trig042
 */
sre.ClearspeakTrigometry.prototype.untestTrig042 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>cos</mi><mi>x</mi><mi>cos</mi><mi>y</mi><mo>=</mo><mn>2</mn><mi>cos</mi><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mn>2</mn></mfrac><mi>cos</mi><mfrac><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow><mn>2</mn></mfrac></mrow></math>';
  var speech = 'Cosine x cosine y equals 2 the cosine of the fraction with numerator x plus y, and denominator 2, the cosine of the fraction with numerator x minus y, and denominator 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example Trig043
 */
sre.ClearspeakTrigometry.prototype.untestTrig043 = function() {
  var preference = 'Trig_Auto(The Root Preference RootEnd is also set)';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><mo>−</mo><mfrac><mi>π</mi><mn>8</mn></mfrac></mrow><mo>)</mo></mrow><mo>=</mo><mo>−</mo><mfrac><mn>1</mn><mn>2</mn></mfrac><msqrt><mrow><mn>2</mn><mo>−</mo><msqrt><mn>2</mn></msqrt></mrow></msqrt></mrow></math>';
  var speech = 'The sine of, open paren, negative pi over 8, close paren, equals, negative one half times the square root of 2 minus the square root of 2, end root, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example Trig044
 */
sre.ClearspeakTrigometry.prototype.untestTrig044 = function() {
  var preference = 'Trig_Auto(The Root Preference RootEnd is also set)';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mi>tan</mi><mfrac><mrow><mn>3</mn><mi>π</mi></mrow><mn>8</mn></mfrac><mo>=</mo><mfrac><mrow><msqrt><mrow><msqrt><mn>2</mn></msqrt><mo>+</mo><mn>1</mn></mrow></msqrt></mrow><mrow><msqrt><mrow><msqrt><mn>2</mn></msqrt><mo>−</mo><mn>1</mn></mrow></msqrt></mrow></mfrac></mrow></math>';
  var speech = '<p>The tangent of, 3 pi over 8, equals,</p><p>the fraction with numerator, the square root of, the square root of 2, end root, plus 1, end root,</p><p>and denominator,</p><p>the square root of, the square root of, 2, end root, minus 1, end root</p>';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example Trig045
 */
sre.ClearspeakTrigometry.prototype.untestTrig045 = function() {
  var preference = 'Trig_Auto(The Root Preference RootEnd is also set)';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mi>tan</mi><mfrac><mi>π</mi><mrow><mn>12</mn></mrow></mfrac><mo>=</mo><mfrac><mn>1</mn><mn>2</mn></mfrac><msqrt><mrow><mn>2</mn><mo>−</mo><msqrt><mn>3</mn></msqrt></mrow></msqrt></mrow></math>';
  var speech = 'The tangent of, pi over 12, equals, one half times the square root of 2 minus the square root of 3, end root, end root';
  this.executeRuleTest(mathml, speech, preference);
};


//
// Table 2: Inverse Trigonometric Functions
//


/**
 * Testing ClearspeakTrigometry Example TrigInvAuto001
 */
sre.ClearspeakTrigometry.prototype.untestTrigInvAuto001 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'The inverse sine of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example TrigInvAuto002
 */
sre.ClearspeakTrigometry.prototype.untestTrigInvAuto002 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>cos</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'The inverse cosine of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example TrigInvAuto003
 */
sre.ClearspeakTrigometry.prototype.untestTrigInvAuto003 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'The inverse tangent of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example TrigInvAuto004
 */
sre.ClearspeakTrigometry.prototype.untestTrigInvAuto004 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>cot</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'The inverse cotangent of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example TrigInvAuto005
 */
sre.ClearspeakTrigometry.prototype.untestTrigInvAuto005 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>sec</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'The inverse secant of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example TrigInvAuto006
 */
sre.ClearspeakTrigometry.prototype.untestTrigInvAuto006 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>csc</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'The inverse cosecant of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example TrigInvAuto007
 */
sre.ClearspeakTrigometry.prototype.untestTrigInvAuto007 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mfrac><mrow><msqrt><mn>2</mn></msqrt></mrow><mn>2</mn></mfrac></mrow></math>';
  var speech = 'The inverse sine of the fraction with numerator the square root of 2, and denominator 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example TrigInvAuto008
 */
sre.ClearspeakTrigometry.prototype.untestTrigInvAuto008 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>cos</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></math>';
  var speech = 'The inverse cosine of one half';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example TrigInvAuto009
 */
sre.ClearspeakTrigometry.prototype.untestTrigInvAuto009 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mn>17</mn></mrow></math>';
  var speech = 'The inverse tangent of 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example TrigInvAuto010
 */
sre.ClearspeakTrigometry.prototype.untestTrigInvAuto010 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>cot</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mn>32</mn></mrow></math>';
  var speech = 'The inverse cotangent of 32';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example TrigInvAuto011
 */
sre.ClearspeakTrigometry.prototype.untestTrigInvAuto011 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>sec</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mn>100</mn></mrow></math>';
  var speech = 'The inverse secant of 100';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example TrigInvAuto012
 */
sre.ClearspeakTrigometry.prototype.untestTrigInvAuto012 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>csc</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mn>85</mn></mrow></math>';
  var speech = 'The inverse cosecant of 85';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example TrigInvAuto013
 */
sre.ClearspeakTrigometry.prototype.untestTrigInvAuto013 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mo>−</mo><mi>x</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'The inverse sine of negative x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example TrigInvAuto014
 */
sre.ClearspeakTrigometry.prototype.untestTrigInvAuto014 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>cos</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mo>−</mo><mi>x</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'The inverse cosine of negative x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example TrigInvAuto015
 */
sre.ClearspeakTrigometry.prototype.untestTrigInvAuto015 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mo>−</mo><mi>x</mi><mo>+</mo><mn>12</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'The inverse tangent of, open paren, negative x plus 12, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example TrigInvAuto016
 */
sre.ClearspeakTrigometry.prototype.untestTrigInvAuto016 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>cot</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mo>−</mo><mi>x</mi><mo>−</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'The inverse cotangent of, open paren, negative x minus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example TrigInvAuto017
 */
sre.ClearspeakTrigometry.prototype.untestTrigInvAuto017 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>sin</mi><mn>0</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'The inverse sine of sine zero';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example TrigInvAuto018
 */
sre.ClearspeakTrigometry.prototype.untestTrigInvAuto018 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>csc</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>csc</mi><mi>x</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'The inverse cosecant of cosecant x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example TrigInvAuto019
 */
sre.ClearspeakTrigometry.prototype.untestTrigInvAuto019 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>cos</mi><mrow><mo>(</mo><mrow><msup><mrow><mi>cos</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mo>−</mo><mfrac><mrow><msqrt><mn>2</mn></msqrt></mrow><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'The cosine of, open paren, the inverse cosine of, open paren, negative, the fraction with numerator, the square root of 2 and denominator 2, close paren, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example TrigInvAuto020
 */
sre.ClearspeakTrigometry.prototype.untestTrigInvAuto020 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>cos</mi><mrow><mo>(</mo><mrow><mo>−</mo><msup><mrow><mi>cos</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mfrac><mrow><msqrt><mn>2</mn></msqrt></mrow><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'The cosine of, open paren, negative the inverse cosine of, open paren, the fraction with numerator, the square root of 2, and denominator 2, close paren, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example TrigInvAuto021
 */
sre.ClearspeakTrigometry.prototype.untestTrigInvAuto021 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>cos</mi><mfrac><mi>π</mi><mn>4</mn></mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'The inverse sine of, open paren the cosine of pi over 4, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example TrigInvAuto022
 */
sre.ClearspeakTrigometry.prototype.untestTrigInvAuto022 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><msup><mrow><mi>cos</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'Sine, the inverse cosine of one half';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example TrigInvAuto023
 */
sre.ClearspeakTrigometry.prototype.untestTrigInvAuto023 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'Sine, the inverse tangent of 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example TrigInvAuto024
 */
sre.ClearspeakTrigometry.prototype.untestTrigInvAuto024 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><mo>−</mo><msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'The sine of, open paren, negative the inverse tangent of 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example TrigInvAuto025
 */
sre.ClearspeakTrigometry.prototype.untestTrigInvAuto025 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><mo>−</mo><msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mo>−</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'The sine of, open paren, negative, the inverse tangent of negative 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example TrigInvAuto026
 */
sre.ClearspeakTrigometry.prototype.untestTrigInvAuto026 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>sec</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>sec</mi><mi>x</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'The inverse secant of secant x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example TrigInverse001
 */
sre.ClearspeakTrigometry.prototype.untestTrigInverse001 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'Sine inverse of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example TrigInverse002
 */
sre.ClearspeakTrigometry.prototype.untestTrigInverse002 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>cos</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'Cosine inverse of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example TrigInverse003
 */
sre.ClearspeakTrigometry.prototype.untestTrigInverse003 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'Tangent inverse of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example TrigInverse004
 */
sre.ClearspeakTrigometry.prototype.untestTrigInverse004 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>cot</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'Cotangent inverse of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example TrigInverse005
 */
sre.ClearspeakTrigometry.prototype.untestTrigInverse005 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>sec</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'Secant inverse of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example TrigInverse006
 */
sre.ClearspeakTrigometry.prototype.untestTrigInverse006 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>csc</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'Cosecant inverse of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example TrigInverse007
 */
sre.ClearspeakTrigometry.prototype.untestTrigInverse007 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mfrac><mrow><msqrt><mn>2</mn></msqrt></mrow><mn>2</mn></mfrac></mrow></math>';
  var speech = 'Sine inverse of, the fraction with numerator square root of 2, and denominator 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example TrigInverse008
 */
sre.ClearspeakTrigometry.prototype.untestTrigInverse008 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>cos</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></math>';
  var speech = 'Cosine inverse of one half';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example TrigInverse009
 */
sre.ClearspeakTrigometry.prototype.untestTrigInverse009 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mn>17</mn></mrow></math>';
  var speech = 'Tangent inverse of 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example TrigInverse010
 */
sre.ClearspeakTrigometry.prototype.untestTrigInverse010 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>cot</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mn>32</mn></mrow></math>';
  var speech = 'Cotangent inverse of 32';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example TrigInverse011
 */
sre.ClearspeakTrigometry.prototype.untestTrigInverse011 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>sec</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mn>100</mn></mrow></math>';
  var speech = 'Secant inverse of 100';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example TrigInverse012
 */
sre.ClearspeakTrigometry.prototype.untestTrigInverse012 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>csc</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mn>85</mn></mrow></math>';
  var speech = 'Cosecant inverse of 85';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example TrigInverse013
 */
sre.ClearspeakTrigometry.prototype.untestTrigInverse013 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mo>−</mo><mi>x</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'Sine inverse of negative x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example TrigInverse014
 */
sre.ClearspeakTrigometry.prototype.untestTrigInverse014 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>cos</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mo>−</mo><mi>x</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'Cosine inverse of negative x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example TrigInverse015
 */
sre.ClearspeakTrigometry.prototype.untestTrigInverse015 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mo>−</mo><mi>x</mi><mo>+</mo><mn>12</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'Tangent inverse of, open paren, negative x plus 12, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example TrigInverse016
 */
sre.ClearspeakTrigometry.prototype.untestTrigInverse016 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>cot</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mo>−</mo><mi>x</mi><mo>−</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'Cotangent inverse of, open paren, negative x minus x, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example TrigInverse017
 */
sre.ClearspeakTrigometry.prototype.untestTrigInverse017 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>sin</mi><mn>0</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'Sin inverse of sine 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example TrigInverse018
 */
sre.ClearspeakTrigometry.prototype.untestTrigInverse018 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>csc</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>csc</mi><mi>x</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'Cosecant inverse of cosecant x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example TrigInverse019
 */
sre.ClearspeakTrigometry.prototype.untestTrigInverse019 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><mi>cos</mi><mrow><mo>(</mo><mrow><msup><mrow><mi>cos</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mo>−</mo><mfrac><mrow><msqrt><mn>2</mn></msqrt></mrow><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'The cosine of, open paren, cosine inverse of, open paren, negative the fraction with numerator, the square root of 2, and denominator 2, close paren, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example TrigInverse020
 */
sre.ClearspeakTrigometry.prototype.untestTrigInverse020 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><mi>cos</mi><mrow><mo>(</mo><mrow><mo>−</mo><msup><mrow><mi>cos</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mfrac><mrow><msqrt><mn>2</mn></msqrt></mrow><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'The cosine of, open paren, negative, cosine inverse of, open paren, the fraction with numerator the square root of 2, and denominator 2, close paren, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example TrigInverse021
 */
sre.ClearspeakTrigometry.prototype.untestTrigInverse021 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>cos</mi><mfrac><mi>π</mi><mn>4</mn></mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'Sine inverse of, open paren, the cosine of pi over 4, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example TrigInverse022
 */
sre.ClearspeakTrigometry.prototype.untestTrigInverse022 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><msup><mrow><mi>cos</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'Sine, cosine inverse of one half';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example TrigInverse023
 */
sre.ClearspeakTrigometry.prototype.untestTrigInverse023 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'Sine, tangent inverse of 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example TrigInverse024
 */
sre.ClearspeakTrigometry.prototype.untestTrigInverse024 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><mo>−</mo><msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'The sine of, open paren, negative, tangent inverse of 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example TrigInverse025
 */
sre.ClearspeakTrigometry.prototype.untestTrigInverse025 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><mo>−</mo><msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mo>−</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'The sine of, open paren, negative, tangent inverse of negative 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example TrigInverse026
 */
sre.ClearspeakTrigometry.prototype.untestTrigInverse026 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>sec</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>sec</mi><mi>x</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'Secant inverse of secant x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example ArcTrig001
 */
sre.ClearspeakTrigometry.prototype.untestArcTrig001 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'Arc Sine x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example ArcTrig002
 */
sre.ClearspeakTrigometry.prototype.untestArcTrig002 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>cos</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'Arc Cosine x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example ArcTrig003
 */
sre.ClearspeakTrigometry.prototype.untestArcTrig003 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'Arc Tangent x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example ArcTrig004
 */
sre.ClearspeakTrigometry.prototype.untestArcTrig004 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>cot</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'Arc Cotangent x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example ArcTrig005
 */
sre.ClearspeakTrigometry.prototype.untestArcTrig005 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>sec</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'Arc Secant x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example ArcTrig006
 */
sre.ClearspeakTrigometry.prototype.untestArcTrig006 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>csc</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'Arc Cosecant x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example ArcTrig007
 */
sre.ClearspeakTrigometry.prototype.untestArcTrig007 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mfrac><mrow><msqrt><mn>2</mn></msqrt></mrow><mn>2</mn></mfrac></mrow></math>';
  var speech = 'Arc Sine of the fraction with numerator the square root of 2, and denominator 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example ArcTrig008
 */
sre.ClearspeakTrigometry.prototype.untestArcTrig008 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>cos</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></math>';
  var speech = 'Arc Cosine one half';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example ArcTrig009
 */
sre.ClearspeakTrigometry.prototype.untestArcTrig009 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mn>17</mn></mrow></math>';
  var speech = 'Arc Tangent 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example ArcTrig010
 */
sre.ClearspeakTrigometry.prototype.untestArcTrig010 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>cot</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mn>32</mn></mrow></math>';
  var speech = 'Arc Cotangent 32';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example ArcTrig011
 */
sre.ClearspeakTrigometry.prototype.untestArcTrig011 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>sec</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mn>100</mn></mrow></math>';
  var speech = 'Arc Secant of 100';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example ArcTrig012
 */
sre.ClearspeakTrigometry.prototype.untestArcTrig012 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>csc</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mn>85</mn></mrow></math>';
  var speech = 'Arc Cosecant 85';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example ArcTrig013
 */
sre.ClearspeakTrigometry.prototype.untestArcTrig013 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mo>−</mo><mi>x</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'Arc Sine negative x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example ArcTrig014
 */
sre.ClearspeakTrigometry.prototype.untestArcTrig014 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>cos</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mo>−</mo><mi>x</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'Arc Cosine negative x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example ArcTrig015
 */
sre.ClearspeakTrigometry.prototype.untestArcTrig015 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mo>−</mo><mi>x</mi><mo>+</mo><mn>12</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'Arc Tangent of, open paren, negative x plus 12, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example ArcTrig016
 */
sre.ClearspeakTrigometry.prototype.untestArcTrig016 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>cot</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mo>−</mo><mi>x</mi><mo>−</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'Arc Cotangent of, open paren, negative x minus x, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example ArcTrig017
 */
sre.ClearspeakTrigometry.prototype.untestArcTrig017 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>sin</mi><mn>0</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'Arc Sin, sine 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example ArcTrig018
 */
sre.ClearspeakTrigometry.prototype.untestArcTrig018 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>csc</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>csc</mi><mi>x</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'Arc Cosecant, cosecant x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example ArcTrig019
 */
sre.ClearspeakTrigometry.prototype.untestArcTrig019 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><mi>cos</mi><mrow><mo>(</mo><mrow><msup><mrow><mi>cos</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mo>−</mo><mfrac><mrow><msqrt><mn>2</mn></msqrt></mrow><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'The cosine of, open paren, Arc cosine of, open paren, negative, the fraction with numerator the square root of 2, and denominator 2, close paren, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example ArcTrig020
 */
sre.ClearspeakTrigometry.prototype.untestArcTrig020 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><mi>cos</mi><mrow><mo>(</mo><mrow><mo>−</mo><msup><mrow><mi>cos</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mfrac><mrow><msqrt><mn>2</mn></msqrt></mrow><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'The cosine of, open paren, negative, arc cosine of, open paren, the fraction with numerator the square root of 2 and denominator 2, close paren, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example ArcTrig021
 */
sre.ClearspeakTrigometry.prototype.untestArcTrig021 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>cos</mi><mfrac><mi>π</mi><mn>4</mn></mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'Arc Sine of, open paren, the cosine of pi over 4, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example ArcTrig022
 */
sre.ClearspeakTrigometry.prototype.untestArcTrig022 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><msup><mrow><mi>cos</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'Sine, arc cosine one half';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example ArcTrig023
 */
sre.ClearspeakTrigometry.prototype.untestArcTrig023 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'Sine, arc tangent 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example ArcTrig024
 */
sre.ClearspeakTrigometry.prototype.untestArcTrig024 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><mo>−</mo><msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'The sine of, open paren, negative, arc tangent 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example ArcTrig025
 */
sre.ClearspeakTrigometry.prototype.untestArcTrig025 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><mo>−</mo><msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mo>−</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'The sine of, open paren, negative, arc tangent, negative 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example ArcTrig026
 */
sre.ClearspeakTrigometry.prototype.untestArcTrig026 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>sec</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>sec</mi><mi>x</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'Arc Secant, secant x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example AllTrig01
 */
sre.ClearspeakTrigometry.prototype.untestAllTrig01 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>arcsin</mi><mi>x</mi></mrow></math>';
  var speech = 'Arc sin x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example AllTrig02
 */
sre.ClearspeakTrigometry.prototype.untestAllTrig02 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>arccos</mi><mi>x</mi></mrow></math>';
  var speech = 'Arc cosine x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example AllTrig03
 */
sre.ClearspeakTrigometry.prototype.untestAllTrig03 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>arctan</mi><mi>x</mi></mrow></math>';
  var speech = 'Arc tan x';
  this.executeRuleTest(mathml, speech, preference);
};


//
// Table 3: Hyperbolic Trigonometric Functions
//


/**
 * Testing ClearspeakTrigometry Example HypTrig001
 */
sre.ClearspeakTrigometry.prototype.untestHypTrig001 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>sinh</mi><mi>x</mi></mrow></math>';
  var speech = 'hyperbolic sine of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example HypTrig002
 */
sre.ClearspeakTrigometry.prototype.untestHypTrig002 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>cosh</mi><mi>x</mi></mrow></math>';
  var speech = 'hyperbolic cosine of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example HypTrig003
 */
sre.ClearspeakTrigometry.prototype.untestHypTrig003 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>tanh</mi><mi>x</mi></mrow></math>';
  var speech = 'hyperbolic tangent of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example HypTrig004
 */
sre.ClearspeakTrigometry.prototype.untestHypTrig004 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>coth</mi><mi>x</mi></mrow></math>';
  var speech = 'hyperbolic cotangent of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example HypTrig005
 */
sre.ClearspeakTrigometry.prototype.untestHypTrig005 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>sech</mi><mi>x</mi></mrow></math>';
  var speech = 'hyperbolic secant of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example HypTrig006
 */
sre.ClearspeakTrigometry.prototype.untestHypTrig006 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>csch</mi><mi>x</mi></mrow></math>';
  var speech = 'hyperbolic cosecant of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example HypTrig007
 */
sre.ClearspeakTrigometry.prototype.untestHypTrig007 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>sinh</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'The inverse hyperbolic sine of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example HypTrig008
 */
sre.ClearspeakTrigometry.prototype.untestHypTrig008 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>cosh</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'The inverse hyperbolic cosine of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example HypTrig009
 */
sre.ClearspeakTrigometry.prototype.untestHypTrig009 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>tanh</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'The inverse hyperbolic tangent of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example HypTrig010
 */
sre.ClearspeakTrigometry.prototype.untestHypTrig010 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>coth</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'The inverse hyperbolic cotangent of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example HypTrig011
 */
sre.ClearspeakTrigometry.prototype.untestHypTrig011 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>sech</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'The inverse hyperbolic secant of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example HypTrig012
 */
sre.ClearspeakTrigometry.prototype.untestHypTrig012 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>csch</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'The inverse hyperbolic cosecant of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example HypTrig013
 */
sre.ClearspeakTrigometry.prototype.untestHypTrig013 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>sinh</mi><mrow><mo>(</mo><mrow><msup><mrow><mi>sinh</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mi>x</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'hyperbolic sine of, the inverse hyperbolic sine of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example HypTrig014
 */
sre.ClearspeakTrigometry.prototype.untestHypTrig014 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>cosh</mi><mrow><mo>(</mo><mrow><msup><mrow><mi>cosh</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mi>x</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'hyperbolic cosine of, the inverse hyperbolic cosine of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example HypTrig015
 */
sre.ClearspeakTrigometry.prototype.untestHypTrig015 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>tanh</mi><mrow><mo>(</mo><mrow><msup><mrow><mi>tanh</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mi>x</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'hyperbolic tangent of, the inverse hyperbolic tangent of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example HypTrig016
 */
sre.ClearspeakTrigometry.prototype.untestHypTrig016 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>coth</mi><mrow><mo>(</mo><mrow><msup><mrow><mi>coth</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mi>x</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'hyperbolic cotangent, of the inverse hyperbolic cotangent of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example HypTrig017
 */
sre.ClearspeakTrigometry.prototype.untestHypTrig017 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>sinh</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>sinh</mi><mi>x</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'The inverse hyperbolic sine of, hyperbolic sine of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example HypTrig018
 */
sre.ClearspeakTrigometry.prototype.untestHypTrig018 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>cosh</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>cosh</mi><mi>x</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'The inverse hyperbolic cosine of, hyperbolic cosine of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example HypTrig019
 */
sre.ClearspeakTrigometry.prototype.untestHypTrig019 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>tanh</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>tanh</mi><mi>x</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'The inverse hyperbolic tangent of, hyperbolic tangent of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakTrigometry Example HypTrig020
 */
sre.ClearspeakTrigometry.prototype.untestHypTrig020 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>coth</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>coth</mi><mi>x</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'The inverse hyperbolic cotangent of, hyperbolic cotangent of x';
  this.executeRuleTest(mathml, speech, preference);
};

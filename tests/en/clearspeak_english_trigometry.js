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


goog.provide('sre.ClearspeakEnglishTrigometry');

goog.require('sre.ClearspeakEnglishRuleTest');



/**
* @constructor
* @extends {sre.ClearspeakEnglishRuleTest}
*/
sre.ClearspeakEnglishTrigometry = function() {
  sre.ClearspeakEnglishTrigometry.base(this, 'constructor');

  /**
* @override
  */
  this.information = 'ClearspeakEnglishTrigometry rule tests.';

};
goog.inherits(sre.ClearspeakEnglishTrigometry, sre.ClearspeakEnglishRuleTest);



//
// Trigonometry
//


//
// Table 1: Basic Trigonometric Functions
//


/**
 * Testing ClearspeakEnglishTrigometry Example Trig001
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrig001 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>sin</mi><mi>x</mi></mrow></math>';
  var speech = 'sine x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example Trig002
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrig002 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>cos</mi><mi>x</mi></mrow></math>';
  var speech = 'cosine x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example Trig003
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrig003 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>tan</mi><mi>θ</mi></mrow></math>';
  var speech = 'tangent theta';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example Trig004
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrig004 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>sec</mi><mi>θ</mi></mrow></math>';
  var speech = 'secant theta';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example Trig005
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrig005 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>csc</mi><mi>x</mi></mrow></math>';
  var speech = 'cosecant x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example Trig006
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrig006 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>cot</mi><mi>x</mi></mrow></math>';
  var speech = 'cotangent x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example Trig007
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrig007 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mn>2</mn>' +
      '</msup><mi>x</mi></mrow></math>';
  var speech = 'sine squared x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example Trig008
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrig008 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>cos</mi></mrow><mn>3</mn>' +
      '</msup><mi>x</mi></mrow></math>';
  var speech = 'cosine cubed x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example Trig009
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrig009 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>tan</mi></mrow><mn>2</mn>' +
      '</msup><mi>x</mi></mrow></math>';
  var speech = 'tangent squared x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example Trig010
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrig010 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>sec</mi></mrow><mn>3</mn>' +
      '</msup><mi>x</mi></mrow></math>';
  var speech = 'secant cubed x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example Trig011
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrig011 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>csc</mi></mrow><mn>2</mn>' +
      '</msup><mi>x</mi></mrow></math>';
  var speech = 'cosecant squared x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example Trig012
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrig012 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>cot</mi></mrow><mn>2</mn>' +
      '</msup><mi>x</mi></mrow></math>';
  var speech = 'cotangent squared x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example Trig013
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrig013 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>sin</mi><mn>2</mn><mi>π</mi></mrow></math>';
  var speech = 'sine 2 pi';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example Trig014
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrig014 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><mi>π</mi>' +
      '<mi>k</mi><mo>+</mo><mfrac><mi>π</mi><mn>2</mn></mfrac></mrow><mo>)' +
      '</mo></mrow></mrow></math>';
  var speech = 'the sine of, open paren, pi k, plus, pi over 2, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example Trig015
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrig015 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>cos</mi><mfrac><mi>π</mi><mn>2</mn></mfrac>' +
      '</mrow></math>';
  var speech = 'the cosine of, pi over 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example Trig016
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrig016 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>sin</mi><mfrac><mi>π</mi><mn>2</mn></mfrac>' +
      '</mrow></math>';
  var speech = 'the sine of, pi over 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example Trig017
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrig017 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>sin</mi><mi>π</mi></mrow><mn>2' +
      '</mn></mfrac></mrow></math>';
  var speech = 'sine pi over 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example Trig018
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrig018 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mfrac><mn>2</mn><mrow><mi>sin</mi><mi>π</mi>' +
      '</mrow></mfrac></mrow></math>';
  var speech = '2 over sine pi';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example Trig019
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrig019 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>sin</mi><mfrac><mi>π</mi><mn>2' +
      '</mn></mfrac></mrow><mn>3</mn></mfrac></mrow></math>';
  var speech = 'the fraction with numerator, the sine of, pi over 2, and' +
      ' denominator 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example Trig020
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrig020 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>tan</mi><mrow><mo>(</mo><mrow><mo>−</mo>' +
      '<mi>π</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'tangent negative pi';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example Trig021
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrig021 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><mi>x</mi>' +
      '<mo>+</mo><mi>π</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the sine of, open paren, x plus pi, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example Trig022
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrig022 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>cos</mi><mrow><mo>(</mo><mrow><mi>x</mi>' +
      '<mo>+</mo><mfrac><mi>π</mi><mn>2</mn></mfrac></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'the cosine of, open paren, x plus, pi over 2, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example Trig023
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrig023 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>cos</mi><mrow><mo>(</mo><mrow><mfrac><mi>π' +
      '</mi><mn>2</mn></mfrac><mo>+</mo><mi>x</mi></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'the cosine of, open paren, pi over 2, plus x, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example Trig024
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrig024 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mn>2</mn>' +
      '</msup><mi>x</mi><mo>+</mo><msup><mrow><mi>cos</mi></mrow><mn>2</mn>' +
      '</msup><mi>x</mi><mo>=</mo><mn>1</mn></mrow></math>';
  var speech = 'sine squared x, plus, cosine squared x, equals 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example Trig025
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrig025 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mn>4</mn>' +
      '</msup><mi>x</mi></mrow></math>';
  var speech = 'the fourth power of sine x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example Trig026
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrig026 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>cos</mi></mrow><mn>5</mn>' +
      '</msup><mi>x</mi></mrow></math>';
  var speech = 'the fifth power of cosine x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example Trig027
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrig027 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>tan</mi></mrow><mi>n</mi>' +
      '</msup><mi>x</mi></mrow></math>';
  var speech = 'the n-th power of tangent x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example Trig028
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrig028 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>sin</mi><mi>x</mi></mrow>' +
      '<mrow><mi>cos</mi><mi>x</mi></mrow></mfrac></mrow></math>';
  var speech = 'sine x over cosine x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example Trig029
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrig029 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>tan</mi><mn>35</mn><mo>°</mo></mrow></math>';
  var speech = 'tangent 35 degrees';
  this.executeRuleTest(mathml, speech, preference);
};


// TODO: (Simons) Handles degrees as a postfix function.
/**
 * Testing ClearspeakEnglishTrigometry Example Trig030
 */
sre.ClearspeakEnglishTrigometry.prototype.untestTrig030 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><mn>45</mn>' +
      '<mo>°</mo><mo>+</mo><mn>30</mn><mo>°</mo></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'the sine of, open paren, 45 degrees plus 30 degrees, close' +
      ' paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example Trig031
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrig031 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>tan</mi><mrow><mo>(</mo><mrow><mo>∠</mo>' +
      '<mi>D</mi><mi>E</mi><mi>F</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the tangent of, open paren, angle D E F, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example Trig032
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrig032 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>tan</mi><mrow><mo>(</mo><mrow><mo>∠</mo>' +
      '<mi>D</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the tangent of, open paren, angle D, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example Trig033
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrig033 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>sin</mi><mo stretchy="false">(</mo><mi>x' +
      '</mi><mo>+</mo><mi>y</mi><mo stretchy="false">)</mo><mo>=</mo>' +
      '<mi>sin</mi><mi>x</mi><mi>cos</mi><mi>y</mi><mo>+</mo><mi>cos</mi>' +
      '<mi>x</mi><mi>sin</mi><mi>y</mi></mrow></math>';
  var speech = 'the sine of, open paren, x plus y, close paren, equals,' +
      ' sine x cosine y, plus, cosine x sine y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example Trig034
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrig034 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>cos</mi><mo stretchy="false">(</mo><mi>x' +
      '</mi><mo>+</mo><mi>y</mi><mo stretchy="false">)</mo><mo>=</mo>' +
      '<mi>cos</mi><mi>x</mi><mi>cos</mi><mi>y</mi><mo>−</mo><mi>sin</mi>' +
      '<mi>x</mi><mi>sin</mi><mi>y</mi></mrow></math>';
  var speech = 'the cosine of, open paren, x plus y, close paren, equals,' +
      ' cosine x cosine y, minus, sine x sine y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example Trig035
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrig035 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>tan</mi><mo stretchy="false">(</mo><mi>x' +
      '</mi><mo>+</mo><mi>y</mi><mo stretchy="false">)</mo><mo>=</mo>' +
      '<mfrac><mrow><mi>tan</mi><mi>x</mi><mo>−</mo><mi>tan</mi><mi>y</mi>' +
      '</mrow><mrow><mn>1</mn><mo>−</mo><mi>tan</mi><mi>x</mi><mi>tan</mi>' +
      '<mi>y</mi></mrow></mfrac></mrow></math>';
  var speech = 'the tangent of, open paren, x plus y, close paren, equals,' +
      ' the fraction with numerator tangent x minus tangent y, and' +
      ' denominator 1 minus, tangent x tangent y';
  this.executeRuleTest(mathml, speech, preference);
};


// TODO: (Simons) Handle degrees as a postfix function.
/**
 * Testing ClearspeakEnglishTrigometry Example Trig036
 */
sre.ClearspeakEnglishTrigometry.prototype.untestTrig036 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>sin</mi><mn>30</mn><mo>°</mo><mi>cos</mi>' +
      '<mn>15</mn><mo>°</mo><mo>+</mo><mi>cos</mi><mn>30</mn><mo>°</mo>' +
      '<mi>sin</mi><mn>15</mn><mo>°</mo></mrow></math>';
  var speech = 'sine 30 degrees cosine 15 degrees, plus, cosine 30 degrees' +
      ' sine 15 degrees';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example Trig037
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrig037 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>tan</mi><mrow><mo>(</mo><mrow><mfrac><mi>π' +
      '</mi><mn>6</mn></mfrac><mo>+</mo><mfrac><mrow><mn>2</mn><mi>π</mi>' +
      '</mrow><mn>3</mn></mfrac></mrow><mo>)</mo></mrow><mo>=</mo><mfrac>' +
      '<mrow><mi>tan</mi><mfrac><mi>π</mi><mn>6</mn></mfrac><mo>−</mo>' +
      '<mi>tan</mi><mfrac><mrow><mn>2</mn><mi>π</mi></mrow><mn>3</mn>' +
      '</mfrac></mrow><mrow><mn>1</mn><mo>−</mo><mi>tan</mi><mfrac><mi>π' +
      '</mi><mn>6</mn></mfrac><mi>tan</mi><mfrac><mrow><mn>2</mn><mi>π</mi>' +
      '</mrow><mn>3</mn></mfrac></mrow></mfrac></mrow></math>';
  var speech = 'the tangent of, open paren, pi over 6, plus, 2 pi over 3,' +
      ' close paren, equals, the fraction with numerator, the tangent of,' +
      ' pi over 6, minus, the tangent of, 2 pi over 3, and denominator 1' +
      ' minus, the tangent of, pi over 6, the tangent of, 2 pi over 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example Trig038
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrig038 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>tan</mi><mn>2</mn><mi>x</mi><mo>=</mo>' +
      '<mfrac><mrow><mn>2</mn><mi>tan</mi><mi>x</mi></mrow><mrow><mn>1</mn>' +
      '<mo>−</mo><msup><mrow><mi>tan</mi></mrow><mn>2</mn></msup><mi>x</mi>' +
      '</mrow></mfrac></mrow></math>';
  var speech = 'tangent 2 x, equals, the fraction with numerator 2 tangent' +
      ' x, and denominator 1 minus, tangent squared x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example Trig039
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrig039 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>cos</mi><mn>2</mn><mi>x</mi><mo>=</mo><mn>2' +
      '</mn><msup><mrow><mi>cos</mi></mrow><mn>2</mn></msup><mi>x</mi><mo>−' +
      '</mo><mn>1</mn></mrow></math>';
  var speech = 'cosine 2 x, equals 2, cosine squared x, minus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example Trig040
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrig040 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>sin</mi><mfrac><mi>x</mi><mn>2</mn></mfrac>' +
      '<mo>=</mo><mo>±</mo><msqrt><mrow><mfrac><mrow><mn>1</mn><mo>−</mo>' +
      '<mi>cos</mi><mi>x</mi></mrow><mn>2</mn></mfrac></mrow></msqrt>' +
      '</mrow></math>';
  var speech = 'the sine of, x over 2, equals plus or minus the square root' +
      ' of, the fraction with numerator 1 minus cosine x, and denominator 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example Trig041
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrig041 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>tan</mi><mfrac><mi>x</mi><mn>2</mn></mfrac>' +
      '<mo>=</mo><mo>±</mo><msqrt><mrow><mfrac><mrow><mn>1</mn><mo>−</mo>' +
      '<mi>cos</mi><mi>x</mi></mrow><mrow><mn>1</mn><mo>+</mo><mi>cos</mi>' +
      '<mi>x</mi></mrow></mfrac></mrow></msqrt></mrow></math>';
  var speech = 'the tangent of, x over 2, equals plus or minus the square' +
      ' root of, the fraction with numerator 1 minus cosine x, and' +
      ' denominator 1 plus cosine x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example Trig042
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrig042 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>cos</mi><mi>x</mi><mi>cos</mi><mi>y</mi>' +
      '<mo>=</mo><mn>2</mn><mi>cos</mi><mfrac><mrow><mi>x</mi><mo>+</mo>' +
      '<mi>y</mi></mrow><mn>2</mn></mfrac><mi>cos</mi><mfrac><mrow><mi>x' +
      '</mi><mo>−</mo><mi>y</mi></mrow><mn>2</mn></mfrac></mrow></math>';
  var speech = 'cosine x cosine y, equals 2, the cosine of, the fraction' +
      ' with numerator x plus y, and denominator 2, the cosine of, the' +
      ' fraction with numerator x minus y, and denominator 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example Trig043
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrig043 = function() {
  var preference = 'Trig_Auto:Roots_RootEnd';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><mo>−</mo>' +
      '<mfrac><mi>π</mi><mn>8</mn></mfrac></mrow><mo>)</mo></mrow><mo>=' +
      '</mo><mo>−</mo><mfrac><mn>1</mn><mn>2</mn></mfrac><msqrt><mrow><mn>2' +
      '</mn><mo>−</mo><msqrt><mn>2</mn></msqrt></mrow></msqrt></mrow></math>';
  var speech = 'the sine of, open paren, negative, pi over 8, close paren,' +
      ' equals negative one half the square root of 2 minus the square root' +
      ' of 2, end root, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example Trig044
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrig044 = function() {
  var preference = 'Trig_Auto:Roots_RootEnd';
  var mathml = '<math><mrow><mi>tan</mi><mfrac><mrow><mn>3</mn><mi>π</mi>' +
      '</mrow><mn>8</mn></mfrac><mo>=</mo><mfrac><mrow><msqrt><mrow><msqrt>' +
      '<mn>2</mn></msqrt><mo>+</mo><mn>1</mn></mrow></msqrt></mrow><mrow>' +
      '<msqrt><mrow><msqrt><mn>2</mn></msqrt><mo>−</mo><mn>1</mn></mrow>' +
      '</msqrt></mrow></mfrac></mrow></math>';
  var speech = 'the tangent of, 3 pi over 8, equals, the fraction with' +
      ' numerator the square root of, the square root of 2, end root, plus' +
      ' 1, end root, and denominator the square root of, the square root of' +
      ' 2, end root, minus 1, end root';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example Trig045
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrig045 = function() {
  var preference = 'Trig_Auto:Roots_RootEnd';
  var mathml = '<math><mrow><mi>tan</mi><mfrac><mi>π</mi><mrow><mn>12</mn>' +
      '</mrow></mfrac><mo>=</mo><mfrac><mn>1</mn><mn>2</mn></mfrac><msqrt>' +
      '<mrow><mn>2</mn><mo>−</mo><msqrt><mn>3</mn></msqrt></mrow></msqrt>' +
      '</mrow></math>';
  var speech = 'the tangent of, pi over 12, equals one half the square root' +
      ' of 2 minus the square root of 3, end root, end root';
  this.executeRuleTest(mathml, speech, preference);
};


//
// Table 2: Inverse Trigonometric Functions
//


/**
 * Testing ClearspeakEnglishTrigometry Example TrigInvAuto001
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrigInvAuto001 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'the inverse sine of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example TrigInvAuto002
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrigInvAuto002 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>cos</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'the inverse cosine of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example TrigInvAuto003
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrigInvAuto003 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'the inverse tangent of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example TrigInvAuto004
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrigInvAuto004 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>cot</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'the inverse cotangent of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example TrigInvAuto005
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrigInvAuto005 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>sec</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'the inverse secant of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example TrigInvAuto006
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrigInvAuto006 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>csc</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'the inverse cosecant of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example TrigInvAuto007
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrigInvAuto007 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mfrac><mrow><msqrt><mn>2</mn></msqrt>' +
      '</mrow><mn>2</mn></mfrac></mrow></math>';
  var speech = 'the inverse sine of, the fraction with numerator the square' +
      ' root of 2, and denominator 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example TrigInvAuto008
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrigInvAuto008 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>cos</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow>' +
      '</math>';
  var speech = 'the inverse cosine of one half';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example TrigInvAuto009
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrigInvAuto009 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mn>17</mn></mrow></math>';
  var speech = 'the inverse tangent of 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example TrigInvAuto010
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrigInvAuto010 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>cot</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mn>32</mn></mrow></math>';
  var speech = 'the inverse cotangent of 32';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example TrigInvAuto011
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrigInvAuto011 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>sec</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mn>100</mn></mrow></math>';
  var speech = 'the inverse secant of 100';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example TrigInvAuto012
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrigInvAuto012 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>csc</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mn>85</mn></mrow></math>';
  var speech = 'the inverse cosecant of 85';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example TrigInvAuto013
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrigInvAuto013 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mo>−</mo><mi>x</mi>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the inverse sine of negative x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example TrigInvAuto014
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrigInvAuto014 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>cos</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mo>−</mo><mi>x</mi>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the inverse cosine of negative x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example TrigInvAuto015
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrigInvAuto015 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mo>−</mo><mi>x</mi>' +
      '<mo>+</mo><mn>12</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the inverse tangent of, open paren, negative x plus 12,' +
      ' close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example TrigInvAuto016
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrigInvAuto016 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>cot</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mo>−</mo><mi>x</mi>' +
      '<mo>−</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the inverse cotangent of, open paren, negative x minus 1,' +
      ' close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example TrigInvAuto017
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrigInvAuto017 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>sin</mi><mn>0</mn>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the inverse sine of sine 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example TrigInvAuto018
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrigInvAuto018 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>csc</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>csc</mi><mi>x</mi>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the inverse cosecant of cosecant x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example TrigInvAuto019
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrigInvAuto019 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>cos</mi><mrow><mo>(</mo><mrow><msup><mrow>' +
      '<mi>cos</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow>' +
      '<mo>(</mo><mrow><mo>−</mo><mfrac><mrow><msqrt><mn>2</mn></msqrt>' +
      '</mrow><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'the cosine of, open paren, the inverse cosine of, open' +
      ' paren, negative, the fraction with numerator the square root of 2,' +
      ' and denominator 2, close paren, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example TrigInvAuto020
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrigInvAuto020 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>cos</mi><mrow><mo>(</mo><mrow><mo>−</mo>' +
      '<msup><mrow><mi>cos</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow>' +
      '</msup><mrow><mo>(</mo><mrow><mfrac><mrow><msqrt><mn>2</mn></msqrt>' +
      '</mrow><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'the cosine of, open paren, negative, the inverse cosine of,' +
      ' open paren, the fraction with numerator the square root of 2, and' +
      ' denominator 2, close paren, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example TrigInvAuto021
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrigInvAuto021 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>cos</mi><mfrac>' +
      '<mi>π</mi><mn>4</mn></mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the inverse sine of, open paren, the cosine of, pi over 4,' +
      ' close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example TrigInvAuto022
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrigInvAuto022 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><msup><mrow>' +
      '<mi>cos</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mfrac>' +
      '<mn>1</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'sine, the inverse cosine of one half';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example TrigInvAuto023
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrigInvAuto023 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><msup><mrow>' +
      '<mi>tan</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mn>1' +
      '</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'sine, the inverse tangent of 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example TrigInvAuto024
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrigInvAuto024 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><mo>−</mo>' +
      '<msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow>' +
      '</msup><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the sine of, open paren, negative, the inverse tangent of' +
      ' 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example TrigInvAuto025
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrigInvAuto025 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><mo>−</mo>' +
      '<msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow>' +
      '</msup><mrow><mo>(</mo><mrow><mo>−</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the sine of, open paren, negative, the inverse tangent of' +
      ' negative 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example TrigInvAuto026
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrigInvAuto026 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>sec</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>sec</mi><mi>x</mi>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the inverse secant of secant x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example TrigInverse001
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrigInverse001 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'sine inverse of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example TrigInverse002
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrigInverse002 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>cos</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'cosine inverse of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example TrigInverse003
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrigInverse003 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'tangent inverse of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example TrigInverse004
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrigInverse004 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>cot</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'cotangent inverse of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example TrigInverse005
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrigInverse005 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>sec</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'secant inverse of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example TrigInverse006
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrigInverse006 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>csc</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'cosecant inverse of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example TrigInverse007
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrigInverse007 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mfrac><mrow><msqrt><mn>2</mn></msqrt>' +
      '</mrow><mn>2</mn></mfrac></mrow></math>';
  var speech = 'sine inverse of, the fraction with numerator the square' +
      ' root of 2, and denominator 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example TrigInverse008
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrigInverse008 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>cos</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow>' +
      '</math>';
  var speech = 'cosine inverse of one half';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example TrigInverse009
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrigInverse009 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mn>17</mn></mrow></math>';
  var speech = 'tangent inverse of 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example TrigInverse010
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrigInverse010 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>cot</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mn>32</mn></mrow></math>';
  var speech = 'cotangent inverse of 32';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example TrigInverse011
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrigInverse011 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>sec</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mn>100</mn></mrow></math>';
  var speech = 'secant inverse of 100';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example TrigInverse012
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrigInverse012 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>csc</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mn>85</mn></mrow></math>';
  var speech = 'cosecant inverse of 85';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example TrigInverse013
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrigInverse013 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mo>−</mo><mi>x</mi>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'sine inverse of negative x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example TrigInverse014
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrigInverse014 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>cos</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mo>−</mo><mi>x</mi>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'cosine inverse of negative x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example TrigInverse015
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrigInverse015 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mo>−</mo><mi>x</mi>' +
      '<mo>+</mo><mn>12</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'tangent inverse of, open paren, negative x plus 12, close' +
      ' paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example TrigInverse016
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrigInverse016 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>cot</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mo>−</mo><mi>x</mi>' +
      '<mo>−</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'cotangent inverse of, open paren, negative x minus 1, close' +
      ' paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example TrigInverse017
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrigInverse017 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>sin</mi><mn>0</mn>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'sine inverse of sine 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example TrigInverse018
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrigInverse018 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>csc</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>csc</mi><mi>x</mi>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'cosecant inverse of cosecant x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example TrigInverse019
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrigInverse019 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><mi>cos</mi><mrow><mo>(</mo><mrow><msup><mrow>' +
      '<mi>cos</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow>' +
      '<mo>(</mo><mrow><mo>−</mo><mfrac><mrow><msqrt><mn>2</mn></msqrt>' +
      '</mrow><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'the cosine of, open paren, cosine inverse of, open paren,' +
      ' negative, the fraction with numerator the square root of 2, and' +
      ' denominator 2, close paren, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example TrigInverse020
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrigInverse020 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><mi>cos</mi><mrow><mo>(</mo><mrow><mo>−</mo>' +
      '<msup><mrow><mi>cos</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow>' +
      '</msup><mrow><mo>(</mo><mrow><mfrac><mrow><msqrt><mn>2</mn></msqrt>' +
      '</mrow><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'the cosine of, open paren, negative, cosine inverse of,' +
      ' open paren, the fraction with numerator the square root of 2, and' +
      ' denominator 2, close paren, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example TrigInverse021
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrigInverse021 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>cos</mi><mfrac>' +
      '<mi>π</mi><mn>4</mn></mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'sine inverse of, open paren, the cosine of, pi over 4,' +
      ' close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example TrigInverse022
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrigInverse022 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><msup><mrow>' +
      '<mi>cos</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mfrac>' +
      '<mn>1</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'sine, cosine inverse of one half';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example TrigInverse023
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrigInverse023 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><msup><mrow>' +
      '<mi>tan</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mn>1' +
      '</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'sine, tangent inverse of 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example TrigInverse024
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrigInverse024 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><mo>−</mo>' +
      '<msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow>' +
      '</msup><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the sine of, open paren, negative, tangent inverse of 1,' +
      ' close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example TrigInverse025
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrigInverse025 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><mo>−</mo>' +
      '<msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow>' +
      '</msup><mrow><mo>(</mo><mrow><mo>−</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the sine of, open paren, negative, tangent inverse of' +
      ' negative 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example TrigInverse026
 */
sre.ClearspeakEnglishTrigometry.prototype.testTrigInverse026 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>sec</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>sec</mi><mi>x</mi>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'secant inverse of secant x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example ArcTrig001
 */
sre.ClearspeakEnglishTrigometry.prototype.testArcTrig001 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'arc sine x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example ArcTrig002
 */
sre.ClearspeakEnglishTrigometry.prototype.testArcTrig002 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>cos</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'arc cosine x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example ArcTrig003
 */
sre.ClearspeakEnglishTrigometry.prototype.testArcTrig003 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'arc tangent x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example ArcTrig004
 */
sre.ClearspeakEnglishTrigometry.prototype.testArcTrig004 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>cot</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'arc cotangent x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example ArcTrig005
 */
sre.ClearspeakEnglishTrigometry.prototype.testArcTrig005 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>sec</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'arc secant x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example ArcTrig006
 */
sre.ClearspeakEnglishTrigometry.prototype.testArcTrig006 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>csc</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'arc cosecant x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example ArcTrig007
 */
sre.ClearspeakEnglishTrigometry.prototype.testArcTrig007 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mfrac><mrow><msqrt><mn>2</mn></msqrt>' +
      '</mrow><mn>2</mn></mfrac></mrow></math>';
  var speech = 'arc sine of, the fraction with numerator the square root of' +
      ' 2, and denominator 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example ArcTrig008
 */
sre.ClearspeakEnglishTrigometry.prototype.testArcTrig008 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>cos</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow>' +
      '</math>';
  var speech = 'arc cosine one half';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example ArcTrig009
 */
sre.ClearspeakEnglishTrigometry.prototype.testArcTrig009 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mn>17</mn></mrow></math>';
  var speech = 'arc tangent 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example ArcTrig010
 */
sre.ClearspeakEnglishTrigometry.prototype.testArcTrig010 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>cot</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mn>32</mn></mrow></math>';
  var speech = 'arc cotangent 32';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example ArcTrig011
 */
sre.ClearspeakEnglishTrigometry.prototype.testArcTrig011 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>sec</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mn>100</mn></mrow></math>';
  var speech = 'arc secant 100';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example ArcTrig012
 */
sre.ClearspeakEnglishTrigometry.prototype.testArcTrig012 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>csc</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mn>85</mn></mrow></math>';
  var speech = 'arc cosecant 85';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example ArcTrig013
 */
sre.ClearspeakEnglishTrigometry.prototype.testArcTrig013 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mo>−</mo><mi>x</mi>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'arc sine negative x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example ArcTrig014
 */
sre.ClearspeakEnglishTrigometry.prototype.testArcTrig014 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>cos</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mo>−</mo><mi>x</mi>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'arc cosine negative x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example ArcTrig015
 */
sre.ClearspeakEnglishTrigometry.prototype.testArcTrig015 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mo>−</mo><mi>x</mi>' +
      '<mo>+</mo><mn>12</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'arc tangent of, open paren, negative x plus 12, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example ArcTrig016
 */
sre.ClearspeakEnglishTrigometry.prototype.testArcTrig016 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>cot</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mo>−</mo><mi>x</mi>' +
      '<mo>−</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'arc cotangent of, open paren, negative x minus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example ArcTrig017
 */
sre.ClearspeakEnglishTrigometry.prototype.testArcTrig017 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>sin</mi><mn>0</mn>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'arc sine, sine 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example ArcTrig018
 */
sre.ClearspeakEnglishTrigometry.prototype.testArcTrig018 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>csc</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>csc</mi><mi>x</mi>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'arc cosecant, cosecant x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example ArcTrig019
 */
sre.ClearspeakEnglishTrigometry.prototype.testArcTrig019 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><mi>cos</mi><mrow><mo>(</mo><mrow><msup><mrow>' +
      '<mi>cos</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow>' +
      '<mo>(</mo><mrow><mo>−</mo><mfrac><mrow><msqrt><mn>2</mn></msqrt>' +
      '</mrow><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'the cosine of, open paren, arc cosine of, open paren,' +
      ' negative, the fraction with numerator the square root of 2, and' +
      ' denominator 2, close paren, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example ArcTrig020
 */
sre.ClearspeakEnglishTrigometry.prototype.testArcTrig020 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><mi>cos</mi><mrow><mo>(</mo><mrow><mo>−</mo>' +
      '<msup><mrow><mi>cos</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow>' +
      '</msup><mrow><mo>(</mo><mrow><mfrac><mrow><msqrt><mn>2</mn></msqrt>' +
      '</mrow><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'the cosine of, open paren, negative, arc cosine of, open' +
      ' paren, the fraction with numerator the square root of 2, and' +
      ' denominator 2, close paren, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example ArcTrig021
 */
sre.ClearspeakEnglishTrigometry.prototype.testArcTrig021 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>cos</mi><mfrac>' +
      '<mi>π</mi><mn>4</mn></mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'arc sine of, open paren, the cosine of, pi over 4, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example ArcTrig022
 */
sre.ClearspeakEnglishTrigometry.prototype.testArcTrig022 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><msup><mrow>' +
      '<mi>cos</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mfrac>' +
      '<mn>1</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'sine, arc cosine one half';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example ArcTrig023
 */
sre.ClearspeakEnglishTrigometry.prototype.testArcTrig023 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><msup><mrow>' +
      '<mi>tan</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mn>1' +
      '</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'sine, arc tangent 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example ArcTrig024
 */
sre.ClearspeakEnglishTrigometry.prototype.testArcTrig024 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><mo>−</mo>' +
      '<msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow>' +
      '</msup><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the sine of, open paren, negative, arc tangent 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example ArcTrig025
 */
sre.ClearspeakEnglishTrigometry.prototype.testArcTrig025 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><mo>−</mo>' +
      '<msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow>' +
      '</msup><mrow><mo>(</mo><mrow><mo>−</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the sine of, open paren, negative, arc tangent negative 1,' +
      ' close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example ArcTrig026
 */
sre.ClearspeakEnglishTrigometry.prototype.testArcTrig026 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>sec</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>sec</mi><mi>x</mi>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'arc secant, secant x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example AllTrig01
 */
sre.ClearspeakEnglishTrigometry.prototype.testAllTrig01 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>arcsin</mi><mi>x</mi></mrow></math>';
  var speech = 'arc sine x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example AllTrig02
 */
sre.ClearspeakEnglishTrigometry.prototype.testAllTrig02 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>arccos</mi><mi>x</mi></mrow></math>';
  var speech = 'arc cosine x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example AllTrig03
 */
sre.ClearspeakEnglishTrigometry.prototype.testAllTrig03 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>arctan</mi><mi>x</mi></mrow></math>';
  var speech = 'arc tangent x';
  this.executeRuleTest(mathml, speech, preference);
};


//
// Table 3: Hyperbolic Trigonometric Functions
//


/**
 * Testing ClearspeakEnglishTrigometry Example HypTrig001
 */
sre.ClearspeakEnglishTrigometry.prototype.testHypTrig001 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>sinh</mi><mi>x</mi></mrow></math>';
  var speech = 'hyperbolic sine of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example HypTrig002
 */
sre.ClearspeakEnglishTrigometry.prototype.testHypTrig002 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>cosh</mi><mi>x</mi></mrow></math>';
  var speech = 'hyperbolic cosine of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example HypTrig003
 */
sre.ClearspeakEnglishTrigometry.prototype.testHypTrig003 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>tanh</mi><mi>x</mi></mrow></math>';
  var speech = 'hyperbolic tangent of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example HypTrig004
 */
sre.ClearspeakEnglishTrigometry.prototype.testHypTrig004 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>coth</mi><mi>x</mi></mrow></math>';
  var speech = 'hyperbolic cotangent of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example HypTrig005
 */
sre.ClearspeakEnglishTrigometry.prototype.testHypTrig005 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>sech</mi><mi>x</mi></mrow></math>';
  var speech = 'hyperbolic secant of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example HypTrig006
 */
sre.ClearspeakEnglishTrigometry.prototype.testHypTrig006 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>csch</mi><mi>x</mi></mrow></math>';
  var speech = 'hyperbolic cosecant of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example HypTrig007
 */
sre.ClearspeakEnglishTrigometry.prototype.testHypTrig007 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>sinh</mi></mrow><mrow><mo>−' +
      '</mo><mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'the inverse hyperbolic sine of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example HypTrig008
 */
sre.ClearspeakEnglishTrigometry.prototype.testHypTrig008 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>cosh</mi></mrow><mrow><mo>−' +
      '</mo><mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'the inverse hyperbolic cosine of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example HypTrig009
 */
sre.ClearspeakEnglishTrigometry.prototype.testHypTrig009 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>tanh</mi></mrow><mrow><mo>−' +
      '</mo><mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'the inverse hyperbolic tangent of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example HypTrig010
 */
sre.ClearspeakEnglishTrigometry.prototype.testHypTrig010 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>coth</mi></mrow><mrow><mo>−' +
      '</mo><mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'the inverse hyperbolic cotangent of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example HypTrig011
 */
sre.ClearspeakEnglishTrigometry.prototype.testHypTrig011 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>sech</mi></mrow><mrow><mo>−' +
      '</mo><mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'the inverse hyperbolic secant of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example HypTrig012
 */
sre.ClearspeakEnglishTrigometry.prototype.testHypTrig012 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>csch</mi></mrow><mrow><mo>−' +
      '</mo><mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'the inverse hyperbolic cosecant of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example HypTrig013
 */
sre.ClearspeakEnglishTrigometry.prototype.testHypTrig013 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>sinh</mi><mrow><mo>(</mo><mrow><msup><mrow>' +
      '<mi>sinh</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mi>x' +
      '</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'hyperbolic sine of, the inverse hyperbolic sine of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example HypTrig014
 */
sre.ClearspeakEnglishTrigometry.prototype.testHypTrig014 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>cosh</mi><mrow><mo>(</mo><mrow><msup><mrow>' +
      '<mi>cosh</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mi>x' +
      '</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'hyperbolic cosine of, the inverse hyperbolic cosine of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example HypTrig015
 */
sre.ClearspeakEnglishTrigometry.prototype.testHypTrig015 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>tanh</mi><mrow><mo>(</mo><mrow><msup><mrow>' +
      '<mi>tanh</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mi>x' +
      '</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'hyperbolic tangent of, the inverse hyperbolic tangent of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example HypTrig016
 */
sre.ClearspeakEnglishTrigometry.prototype.testHypTrig016 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>coth</mi><mrow><mo>(</mo><mrow><msup><mrow>' +
      '<mi>coth</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mi>x' +
      '</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'hyperbolic cotangent of, the inverse hyperbolic cotangent of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example HypTrig017
 */
sre.ClearspeakEnglishTrigometry.prototype.testHypTrig017 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>sinh</mi></mrow><mrow><mo>−' +
      '</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>sinh</mi>' +
      '<mi>x</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the inverse hyperbolic sine of, hyperbolic sine of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example HypTrig018
 */
sre.ClearspeakEnglishTrigometry.prototype.testHypTrig018 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>cosh</mi></mrow><mrow><mo>−' +
      '</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>cosh</mi>' +
      '<mi>x</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the inverse hyperbolic cosine of, hyperbolic cosine of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example HypTrig019
 */
sre.ClearspeakEnglishTrigometry.prototype.testHypTrig019 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>tanh</mi></mrow><mrow><mo>−' +
      '</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>tanh</mi>' +
      '<mi>x</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the inverse hyperbolic tangent of, hyperbolic tangent of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishTrigometry Example HypTrig020
 */
sre.ClearspeakEnglishTrigometry.prototype.testHypTrig020 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>coth</mi></mrow><mrow><mo>−' +
      '</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>coth</mi>' +
      '<mi>x</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the inverse hyperbolic cotangent of, hyperbolic cotangent of x';
  this.executeRuleTest(mathml, speech, preference);
};

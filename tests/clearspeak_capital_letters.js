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


goog.provide('sre.ClearspeakCapitalLetters');

goog.require('sre.ClearspeakRuleTest');



/**
* @constructor
* @extends {sre.ClearspeakRuleTest}
*/
sre.ClearspeakCapitalLetters = function() {
sre.ClearspeakCapitalLetters.base(this, 'constructor');

/**
* @override
*/
this.information = 'ClearspeakCapitalLetters rule tests.';

};
goog.inherits(sre.ClearspeakCapitalLetters, sre.ClearspeakRuleTest);



//
// Capital Letters
//


/**
 * Testing ClearspeakCapitalLetters Example Cap001
 */
sre.ClearspeakCapitalLetters.prototype.untestCap001 = function() {
  var preference = 'Caps_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>sin</mi><mi>A</mi></mrow><mi>a</mi></mfrac><mo>=</mo><mfrac><mrow><mi>sin</mi><mi>B</mi></mrow><mi>b</mi></mfrac></mrow></math>';
  var speech = 'The fraction with numerator sine A, and denominator a = the fraction with numerator sine B, and denominator b';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakCapitalLetters Example Cap002
 */
sre.ClearspeakCapitalLetters.prototype.untestCap002 = function() {
  var preference = 'Caps_Auto';
  var mathml = '<math><mrow><msup><mi>c</mi><mn>2</mn></msup><mo>=</mo><msup><mi>a</mi><mn>2</mn></msup><mo>+</mo><msup><mi>b</mi><mn>2</mn></msup><mo>−</mo><mn>2</mn><mi>a</mi><mi>b</mi><mi>cos</mi><mi>C</mi></mrow></math>';
  var speech = 'C squared equals a squared plus b squared minus 2 a b cosine C';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakCapitalLetters Example Cap003
 */
sre.ClearspeakCapitalLetters.prototype.untestCap003 = function() {
  var preference = 'Caps_Auto';
  var mathml = '<math><mrow><mi>tan</mi><mi>A</mi><mo>=</mo><mfrac><mi>a</mi><mi>b</mi></mfrac></mrow></math>';
  var speech = 'Tangent A equals a over b';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakCapitalLetters Example Cap004
 */
sre.ClearspeakCapitalLetters.prototype.untestCap004 = function() {
  var preference = 'Caps_Auto';
  var mathml = '<math><mrow><mi>A</mi><mi>B</mi></mrow></math>';
  var speech = 'AB';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakCapitalLetters Example Cap005
 */
sre.ClearspeakCapitalLetters.prototype.untestCap005 = function() {
  var preference = 'Caps_Auto';
  var mathml = '<math><mrow><mi>a</mi><mi>A</mi></mrow></math>';
  var speech = 'A, A';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakCapitalLetters Example Cap006
 */
sre.ClearspeakCapitalLetters.prototype.untestCap006 = function() {
  var preference = 'Caps_Auto';
  var mathml = '<math><mrow><mi>b</mi><mi>A</mi></mrow></math>';
  var speech = 'B, A';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakCapitalLetters Example Cap007
 */
sre.ClearspeakCapitalLetters.prototype.untestCap007 = function() {
  var preference = 'Caps_Auto';
  var mathml = '<math><mrow><mi>B</mi><mi>a</mi></mrow></math>';
  var speech = 'B A';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakCapitalLetters Example Cap008
 */
sre.ClearspeakCapitalLetters.prototype.untestCap008 = function() {
  var preference = 'Caps_Auto';
  var mathml = '<math><mrow><mo>∠</mo><mi>A</mi><mi>B</mi><mi>C</mi></mrow></math>';
  var speech = 'Angle ABC';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakCapitalLetters Example Cap009
 */
sre.ClearspeakCapitalLetters.prototype.untestCap009 = function() {
  var preference = 'Caps_Auto';
  var mathml = '<math><mrow><mi>m</mi><mo>∠</mo><mi>A</mi><mi>B</mi><mi>C</mi></mrow></math>';
  var speech = 'The measure of angle ABC';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakCapitalLetters Example Cap010
 */
sre.ClearspeakCapitalLetters.prototype.untestCap010 = function() {
  var preference = 'Caps_Auto';
  var mathml = '<math><mrow><mi>m</mi><mo>∠</mo><mi>A</mi></mrow></math>';
  var speech = 'The measure of angle A';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakCapitalLetters Example Cap011
 */
sre.ClearspeakCapitalLetters.prototype.untestCap011 = function() {
  var preference = 'Caps_SayCaps';
  var mathml = '<math><mrow><mfrac><mrow><mi>sin</mi><mi>A</mi></mrow><mi>a</mi></mfrac><mo>=</mo><mfrac><mrow><mi>sin</mi><mi>B</mi></mrow><mi>b</mi></mfrac></mrow></math>';
  var speech = 'The fraction with numerator sine cap A, and denominator a = the fraction with numerator sine cap B, and denominator b';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakCapitalLetters Example Cap012
 */
sre.ClearspeakCapitalLetters.prototype.untestCap012 = function() {
  var preference = 'Caps_SayCaps';
  var mathml = '<math><mrow><msup><mi>c</mi><mn>2</mn></msup><mo>=</mo><msup><mi>a</mi><mn>2</mn></msup><mo>+</mo><msup><mi>b</mi><mn>2</mn></msup><mo>−</mo><mn>2</mn><mi>a</mi><mi>b</mi><mi>cos</mi><mi>C</mi></mrow></math>';
  var speech = 'C squared equals a squared plus b squared minus 2 a b cosine cap C';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakCapitalLetters Example Cap013
 */
sre.ClearspeakCapitalLetters.prototype.untestCap013 = function() {
  var preference = 'Caps_SayCaps';
  var mathml = '<math><mrow><mi>tan</mi><mi>A</mi><mo>=</mo><mfrac><mi>a</mi><mi>b</mi></mfrac></mrow></math>';
  var speech = 'Tangent cap A equals a over b';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakCapitalLetters Example Cap014
 */
sre.ClearspeakCapitalLetters.prototype.untestCap014 = function() {
  var preference = 'Caps_SayCaps';
  var mathml = '<math><mrow><mi>A</mi><mi>B</mi></mrow></math>';
  var speech = 'Cap A, cap B';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakCapitalLetters Example Cap015
 */
sre.ClearspeakCapitalLetters.prototype.untestCap015 = function() {
  var preference = 'Caps_SayCaps';
  var mathml = '<math><mrow><mi>a</mi><mi>A</mi></mrow></math>';
  var speech = 'A, cap A';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakCapitalLetters Example Cap016
 */
sre.ClearspeakCapitalLetters.prototype.untestCap016 = function() {
  var preference = 'Caps_SayCaps';
  var mathml = '<math><mrow><mi>b</mi><mi>A</mi></mrow></math>';
  var speech = 'B, cap A';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakCapitalLetters Example Cap017
 */
sre.ClearspeakCapitalLetters.prototype.untestCap017 = function() {
  var preference = 'Caps_SayCaps';
  var mathml = '<math><mrow><mi>B</mi><mi>a</mi></mrow></math>';
  var speech = 'Cap B, A';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakCapitalLetters Example Cap018
 */
sre.ClearspeakCapitalLetters.prototype.untestCap018 = function() {
  var preference = 'Caps_SayCaps';
  var mathml = '<math><mrow><mo>∠</mo><mi>A</mi><mi>B</mi><mi>C</mi></mrow></math>';
  var speech = 'Angle cap A, cap B, cap C';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakCapitalLetters Example Cap019
 */
sre.ClearspeakCapitalLetters.prototype.untestCap019 = function() {
  var preference = 'Caps_SayCaps';
  var mathml = '<math><mrow><mi>m</mi><mo>∠</mo><mi>A</mi><mi>B</mi><mi>C</mi></mrow></math>';
  var speech = 'The measure of angle cap A, cap B, cap C';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakCapitalLetters Example Cap020
 */
sre.ClearspeakCapitalLetters.prototype.untestCap020 = function() {
  var preference = 'Caps_SayCaps';
  var mathml = '<math><mrow><mi>m</mi><mo>∠</mo><mi>A</mi></mrow></math>';
  var speech = 'The measure of angle cap A';
  this.executeRuleTest(mathml, speech, preference);
};
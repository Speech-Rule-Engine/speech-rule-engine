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


goog.provide('sre.ClearspeakFrenchCapitalLetters');

goog.require('sre.ClearspeakFrenchRuleTest');



/**
* @constructor
* @extends {sre.ClearspeakFrenchRuleTest}
*/
sre.ClearspeakFrenchCapitalLetters = function() {
  sre.ClearspeakFrenchCapitalLetters.base(this, 'constructor');
  /**
   * @override
   */
  this.information = 'ClearspeakFrenchCapitalLetters rule tests.';

};
goog.inherits(sre.ClearspeakFrenchCapitalLetters, sre.ClearspeakFrenchRuleTest);



//
// Capital Letters
//


// TODO: (QUESTION) This is does not seem to follow the fraction rules.
/**
 * Testing ClearspeakFrenchCapitalLetters Example Cap001
 */
sre.ClearspeakFrenchCapitalLetters.prototype.testCap001 = function() {
  var preference = 'Caps_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>sin</mi><mi>A</mi></mrow><mi>a' +
      '</mi></mfrac><mo>=</mo><mfrac><mrow><mi>sin</mi><mi>B</mi></mrow>' +
      '<mi>b</mi></mfrac></mrow></math>';
  // var speech = 'the fraction with numerator sine A, and denominator a,
  // equals, the fraction with numerator sine B, and denominator b';
  var speech = 'sine A over a, equals, sine B over b';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchCapitalLetters Example Cap002
 */
sre.ClearspeakFrenchCapitalLetters.prototype.testCap002 = function() {
  var preference = 'Caps_Auto';
  var mathml = '<math><mrow><msup><mi>c</mi><mn>2</mn></msup><mo>=</mo>' +
      '<msup><mi>a</mi><mn>2</mn></msup><mo>+</mo><msup><mi>b</mi><mn>2' +
      '</mn></msup><mo>−</mo><mn>2</mn><mi>a</mi><mi>b</mi><mi>cos</mi>' +
      '<mi>C</mi></mrow></math>';
  var speech = 'c squared equals a squared plus b squared minus 2 a b cosine C';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchCapitalLetters Example Cap003
 */
sre.ClearspeakFrenchCapitalLetters.prototype.testCap003 = function() {
  var preference = 'Caps_Auto';
  var mathml = '<math><mrow><mi>tan</mi><mi>A</mi><mo>=</mo><mfrac><mi>a' +
      '</mi><mi>b</mi></mfrac></mrow></math>';
  var speech = 'tangent A equals, a over b';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchCapitalLetters Example Cap004
 */
sre.ClearspeakFrenchCapitalLetters.prototype.testCap004 = function() {
  var preference = 'Caps_Auto';
  var mathml = '<math><mrow><mi>A</mi><mi>B</mi></mrow></math>';
  var speech = 'A B';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchCapitalLetters Example Cap005
 */
sre.ClearspeakFrenchCapitalLetters.prototype.testCap005 = function() {
  var preference = 'Caps_Auto';
  var mathml = '<math><mrow><mi>a</mi><mi>A</mi></mrow></math>';
  var speech = 'a A';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchCapitalLetters Example Cap006
 */
sre.ClearspeakFrenchCapitalLetters.prototype.testCap006 = function() {
  var preference = 'Caps_Auto';
  var mathml = '<math><mrow><mi>b</mi><mi>A</mi></mrow></math>';
  var speech = 'b A';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchCapitalLetters Example Cap007
 */
sre.ClearspeakFrenchCapitalLetters.prototype.testCap007 = function() {
  var preference = 'Caps_Auto';
  var mathml = '<math><mrow><mi>B</mi><mi>a</mi></mrow></math>';
  var speech = 'B a';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchCapitalLetters Example Cap008
 */
sre.ClearspeakFrenchCapitalLetters.prototype.testCap008 = function() {
  var preference = 'Caps_Auto';
  var mathml = '<math><mrow><mo>∠</mo><mi>A</mi><mi>B</mi><mi>C</mi></mrow>' +
      '</math>';
  var speech = 'angle A B C';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchCapitalLetters Example Cap009
 */
sre.ClearspeakFrenchCapitalLetters.prototype.testCap009 = function() {
  var preference = 'Caps_Auto';
  var mathml = '<math><mrow><mi>m</mi><mo>∠</mo><mi>A</mi><mi>B</mi><mi>C' +
      '</mi></mrow></math>';
  var speech = 'the measure of angle A B C';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchCapitalLetters Example Cap010
 */
sre.ClearspeakFrenchCapitalLetters.prototype.testCap010 = function() {
  var preference = 'Caps_Auto';
  var mathml = '<math><mrow><mi>m</mi><mo>∠</mo><mi>A</mi></mrow></math>';
  var speech = 'the measure of angle A';
  this.executeRuleTest(mathml, speech, preference);
};


// TODO: (QUESTION) This is does not seem to follow the fraction rules.
/**
 * Testing ClearspeakFrenchCapitalLetters Example Cap011
 */
sre.ClearspeakFrenchCapitalLetters.prototype.testCap011 = function() {
  var preference = 'Caps_SayCaps';
  var mathml = '<math><mrow><mfrac><mrow><mi>sin</mi><mi>A</mi></mrow><mi>a' +
      '</mi></mfrac><mo>=</mo><mfrac><mrow><mi>sin</mi><mi>B</mi></mrow>' +
      '<mi>b</mi></mfrac></mrow></math>';
  // var speech = 'the fraction with numerator sine cap A, and denominator a,
  // equals, the fraction with numerator sine cap B, and denominator b';
  var speech = 'sine cap A over a, equals, sine cap B over b';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchCapitalLetters Example Cap012
 */
sre.ClearspeakFrenchCapitalLetters.prototype.testCap012 = function() {
  var preference = 'Caps_SayCaps';
  var mathml = '<math><mrow><msup><mi>c</mi><mn>2</mn></msup><mo>=</mo>' +
      '<msup><mi>a</mi><mn>2</mn></msup><mo>+</mo><msup><mi>b</mi><mn>2' +
      '</mn></msup><mo>−</mo><mn>2</mn><mi>a</mi><mi>b</mi><mi>cos</mi>' +
      '<mi>C</mi></mrow></math>';
  var speech = 'c squared equals a squared plus b squared minus 2 a b' +
      ' cosine cap C';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchCapitalLetters Example Cap013
 */
sre.ClearspeakFrenchCapitalLetters.prototype.testCap013 = function() {
  var preference = 'Caps_SayCaps';
  var mathml = '<math><mrow><mi>tan</mi><mi>A</mi><mo>=</mo><mfrac><mi>a' +
      '</mi><mi>b</mi></mfrac></mrow></math>';
  var speech = 'tangent cap A equals, a over b';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchCapitalLetters Example Cap014
 */
sre.ClearspeakFrenchCapitalLetters.prototype.testCap014 = function() {
  var preference = 'Caps_SayCaps';
  var mathml = '<math><mrow><mi>A</mi><mi>B</mi></mrow></math>';
  var speech = 'cap A, cap B';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchCapitalLetters Example Cap015
 */
sre.ClearspeakFrenchCapitalLetters.prototype.testCap015 = function() {
  var preference = 'Caps_SayCaps';
  var mathml = '<math><mrow><mi>a</mi><mi>A</mi></mrow></math>';
  var speech = 'a, cap A';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchCapitalLetters Example Cap016
 */
sre.ClearspeakFrenchCapitalLetters.prototype.testCap016 = function() {
  var preference = 'Caps_SayCaps';
  var mathml = '<math><mrow><mi>b</mi><mi>A</mi></mrow></math>';
  var speech = 'b, cap A';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchCapitalLetters Example Cap017
 */
sre.ClearspeakFrenchCapitalLetters.prototype.testCap017 = function() {
  var preference = 'Caps_SayCaps';
  var mathml = '<math><mrow><mi>B</mi><mi>a</mi></mrow></math>';
  var speech = 'cap B, a';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchCapitalLetters Example Cap018
 */
sre.ClearspeakFrenchCapitalLetters.prototype.testCap018 = function() {
  var preference = 'Caps_SayCaps';
  var mathml = '<math><mrow><mo>∠</mo><mi>A</mi><mi>B</mi><mi>C</mi></mrow>' +
      '</math>';
  var speech = 'angle cap A, cap B, cap C';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchCapitalLetters Example Cap019
 */
sre.ClearspeakFrenchCapitalLetters.prototype.testCap019 = function() {
  var preference = 'Caps_SayCaps';
  var mathml = '<math><mrow><mi>m</mi><mo>∠</mo><mi>A</mi><mi>B</mi><mi>C' +
      '</mi></mrow></math>';
  var speech = 'the measure of angle cap A, cap B, cap C';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchCapitalLetters Example Cap020
 */
sre.ClearspeakFrenchCapitalLetters.prototype.testCap020 = function() {
  var preference = 'Caps_SayCaps';
  var mathml = '<math><mrow><mi>m</mi><mo>∠</mo><mi>A</mi></mrow></math>';
  var speech = 'the measure of angle cap A';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchCapitalLetters Example Cap020 (extra)
 */
sre.ClearspeakFrenchCapitalLetters.prototype.testCap020a = function() {
  var preference = 'Caps_SayCaps';
  var mathml = '<math><mrow><mo>∠</mo><mi>A</mi></mrow></math>';
  var speech = 'angle cap A';
  this.executeRuleTest(mathml, speech, preference);
};


// /**
//  * Testing ClearspeakFrenchCapitalLetters Example Cap020 (extra)
//  */
// sre.ClearspeakFrenchCapitalLetters.prototype.testCap020b = function() {
//   var preference = 'Caps_SayCaps';
//   var mathml = '<math><mrow><mi>h</mi><mo>∠</mo><mi>A</mi></mrow></math>';
//   var speech = 'angle cap A';
//   this.executeRuleTest(mathml, speech, preference);
// };

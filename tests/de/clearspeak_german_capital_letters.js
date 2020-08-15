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

goog.provide('sre.ClearspeakGermanCapitalLetters');

goog.require('sre.ClearspeakGermanRuleTest');



/**
* @constructor
* @extends {sre.ClearspeakGermanRuleTest}
*/
sre.ClearspeakGermanCapitalLetters = function() {
  sre.ClearspeakGermanCapitalLetters.base(this, 'constructor');
  /**
   * @override
   */
  this.information = 'ClearspeakGermanCapitalLetters rule tests.';

};
goog.inherits(sre.ClearspeakGermanCapitalLetters, sre.ClearspeakGermanRuleTest);



//
// Capital Letters
//


// TODO: (QUESTION) This is does not seem to follow the fraction rules.
/**
 * Testing ClearspeakGermanCapitalLetters Example Cap001
 */
sre.ClearspeakGermanCapitalLetters.prototype.testCap001 = function() {
  var preference = 'Caps_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>sin</mi><mi>A</mi></mrow><mi>a' +
      '</mi></mfrac><mo>=</mo><mfrac><mrow><mi>sin</mi><mi>B</mi></mrow>' +
      '<mi>b</mi></mfrac></mrow></math>';
  var speech = 'Sinus A geteilt durch a, ist gleich, Sinus B geteilt durch b';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanCapitalLetters Example Cap002
 */
sre.ClearspeakGermanCapitalLetters.prototype.testCap002 = function() {
  var preference = 'Caps_Auto';
  var mathml = '<math><mrow><msup><mi>c</mi><mn>2</mn></msup><mo>=</mo>' +
      '<msup><mi>a</mi><mn>2</mn></msup><mo>+</mo><msup><mi>b</mi><mn>2' +
      '</mn></msup><mo>−</mo><mn>2</mn><mi>a</mi><mi>b</mi><mi>cos</mi>' +
      '<mi>C</mi></mrow></math>';
  var speech = 'c Quadrat ist gleich a Quadrat plus b Quadrat minus 2 a b Kosinus C';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanCapitalLetters Example Cap003
 */
sre.ClearspeakGermanCapitalLetters.prototype.testCap003 = function() {
  var preference = 'Caps_Auto';
  var mathml = '<math><mrow><mi>tan</mi><mi>A</mi><mo>=</mo><mfrac><mi>a' +
      '</mi><mi>b</mi></mfrac></mrow></math>';
  var speech = 'Tangens A ist gleich, a geteilt durch b';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanCapitalLetters Example Cap004
 */
sre.ClearspeakGermanCapitalLetters.prototype.testCap004 = function() {
  var preference = 'Caps_Auto';
  var mathml = '<math><mrow><mi>A</mi><mi>B</mi></mrow></math>';
  var speech = 'A B';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanCapitalLetters Example Cap005
 */
sre.ClearspeakGermanCapitalLetters.prototype.testCap005 = function() {
  var preference = 'Caps_Auto';
  var mathml = '<math><mrow><mi>a</mi><mi>A</mi></mrow></math>';
  var speech = 'a A';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanCapitalLetters Example Cap006
 */
sre.ClearspeakGermanCapitalLetters.prototype.testCap006 = function() {
  var preference = 'Caps_Auto';
  var mathml = '<math><mrow><mi>b</mi><mi>A</mi></mrow></math>';
  var speech = 'b A';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanCapitalLetters Example Cap007
 */
sre.ClearspeakGermanCapitalLetters.prototype.testCap007 = function() {
  var preference = 'Caps_Auto';
  var mathml = '<math><mrow><mi>B</mi><mi>a</mi></mrow></math>';
  var speech = 'B a';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanCapitalLetters Example Cap008
 */
sre.ClearspeakGermanCapitalLetters.prototype.testCap008 = function() {
  var preference = 'Caps_Auto';
  var mathml = '<math><mrow><mo>∠</mo><mi>A</mi><mi>B</mi><mi>C</mi></mrow>' +
      '</math>';
  var speech = 'Winkel A B C';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanCapitalLetters Example Cap009
 */
sre.ClearspeakGermanCapitalLetters.prototype.testCap009 = function() {
  var preference = 'Caps_Auto';
  var mathml = '<math><mrow><mi>m</mi><mo>∠</mo><mi>A</mi><mi>B</mi><mi>C' +
      '</mi></mrow></math>';
  var speech = 'das Maß des Winkels A B C';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanCapitalLetters Example Cap010
 */
sre.ClearspeakGermanCapitalLetters.prototype.testCap010 = function() {
  var preference = 'Caps_Auto';
  var mathml = '<math><mrow><mi>m</mi><mo>∠</mo><mi>A</mi></mrow></math>';
  var speech = 'das Maß des Winkels A';
  this.executeRuleTest(mathml, speech, preference);
};


// TODO: (QUESTION) This is does not seem to follow the fraction rules.
/**
 * Testing ClearspeakGermanCapitalLetters Example Cap011
 */
sre.ClearspeakGermanCapitalLetters.prototype.testCap011 = function() {
  var preference = 'Caps_SayCaps';
  var mathml = '<math><mrow><mfrac><mrow><mi>sin</mi><mi>A</mi></mrow><mi>a' +
      '</mi></mfrac><mo>=</mo><mfrac><mrow><mi>sin</mi><mi>B</mi></mrow>' +
      '<mi>b</mi></mfrac></mrow></math>';
  var speech = 'Sinus großes A geteilt durch a, ist gleich, Sinus großes B geteilt durch b';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanCapitalLetters Example Cap012
 */
sre.ClearspeakGermanCapitalLetters.prototype.testCap012 = function() {
  var preference = 'Caps_SayCaps';
  var mathml = '<math><mrow><msup><mi>c</mi><mn>2</mn></msup><mo>=</mo>' +
      '<msup><mi>a</mi><mn>2</mn></msup><mo>+</mo><msup><mi>b</mi><mn>2' +
      '</mn></msup><mo>−</mo><mn>2</mn><mi>a</mi><mi>b</mi><mi>cos</mi>' +
      '<mi>C</mi></mrow></math>';
  var speech = 'c Quadrat ist gleich a Quadrat plus b Quadrat minus 2 a b Kosinus großes C';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanCapitalLetters Example Cap013
 */
sre.ClearspeakGermanCapitalLetters.prototype.testCap013 = function() {
  var preference = 'Caps_SayCaps';
  var mathml = '<math><mrow><mi>tan</mi><mi>A</mi><mo>=</mo><mfrac><mi>a' +
      '</mi><mi>b</mi></mfrac></mrow></math>';
  var speech = 'Tangens großes A ist gleich, a geteilt durch b';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanCapitalLetters Example Cap014
 */
sre.ClearspeakGermanCapitalLetters.prototype.testCap014 = function() {
  var preference = 'Caps_SayCaps';
  var mathml = '<math><mrow><mi>A</mi><mi>B</mi></mrow></math>';
  var speech = 'großes A, großes B';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanCapitalLetters Example Cap015
 */
sre.ClearspeakGermanCapitalLetters.prototype.testCap015 = function() {
  var preference = 'Caps_SayCaps';
  var mathml = '<math><mrow><mi>a</mi><mi>A</mi></mrow></math>';
  var speech = 'a, großes A';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanCapitalLetters Example Cap016
 */
sre.ClearspeakGermanCapitalLetters.prototype.testCap016 = function() {
  var preference = 'Caps_SayCaps';
  var mathml = '<math><mrow><mi>b</mi><mi>A</mi></mrow></math>';
  var speech = 'b, großes A';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanCapitalLetters Example Cap017
 */
sre.ClearspeakGermanCapitalLetters.prototype.testCap017 = function() {
  var preference = 'Caps_SayCaps';
  var mathml = '<math><mrow><mi>B</mi><mi>a</mi></mrow></math>';
  var speech = 'großes B, a';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanCapitalLetters Example Cap018
 */
sre.ClearspeakGermanCapitalLetters.prototype.testCap018 = function() {
  var preference = 'Caps_SayCaps';
  var mathml = '<math><mrow><mo>∠</mo><mi>A</mi><mi>B</mi><mi>C</mi></mrow>' +
      '</math>';
  var speech = 'Winkel großes A, großes B, großes C';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanCapitalLetters Example Cap019
 */
sre.ClearspeakGermanCapitalLetters.prototype.testCap019 = function() {
  var preference = 'Caps_SayCaps';
  var mathml = '<math><mrow><mi>m</mi><mo>∠</mo><mi>A</mi><mi>B</mi><mi>C' +
      '</mi></mrow></math>';
  var speech = 'das Maß des Winkels großes A, großes B, großes C';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanCapitalLetters Example Cap020
 */
sre.ClearspeakGermanCapitalLetters.prototype.testCap020 = function() {
  var preference = 'Caps_SayCaps';
  var mathml = '<math><mrow><mi>m</mi><mo>∠</mo><mi>A</mi></mrow></math>';
  var speech = 'das Maß des Winkels großes A';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanCapitalLetters Example Cap020 (extra)
 */
sre.ClearspeakGermanCapitalLetters.prototype.testCap020a = function() {
  var preference = 'Caps_SayCaps';
  var mathml = '<math><mrow><mo>∠</mo><mi>A</mi></mrow></math>';
  var speech = 'Winkel großes A';
  this.executeRuleTest(mathml, speech, preference);
};

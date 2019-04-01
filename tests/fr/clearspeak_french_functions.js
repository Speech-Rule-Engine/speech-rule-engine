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


goog.provide('sre.ClearspeakFrenchFunctions');

goog.require('sre.ClearspeakFrenchRuleTest');



/**
* @constructor
* @extends {sre.ClearspeakFrenchRuleTest}
*/
sre.ClearspeakFrenchFunctions = function() {
  sre.ClearspeakFrenchFunctions.base(this, 'constructor');

  /**
* @override
  */
  this.information = 'ClearspeakFrenchFunctions rule tests.';

};
goog.inherits(sre.ClearspeakFrenchFunctions, sre.ClearspeakFrenchRuleTest);



//
// Functions
//


/**
 * Testing ClearspeakFrenchFunctions Example Function001
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction001 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'f de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function002
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction002 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>g</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'g de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function003
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction003 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>h</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'h de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function004
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction004 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mn>2</mn><mi>x' +
      '</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f de 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function005
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction005 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>g</mi><mrow><mo>(</mo><mrow><mo>−</mo><mn>2' +
      '</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g de négatif 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function006
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction006 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>h</mi><mrow><mo>(</mo><mrow><mfrac><mn>1' +
      '</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'h de un-demi';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function007
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction007 = function() {
  // TODO: This throws a test exception.
  // var preference = 'Functions_Auto:Fraction_Over';
  var preference = 'Fraction_Over';
  var mathml = '<math><mrow><mi>h</mi><mrow><mo>(</mo><mrow><mfrac><mn>1' +
      '</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'h de, parenthèse gauche, 1 sur 2, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function008
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction008 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mi>x</mi><mo>+' +
      '</mo><mn>1</mn></mrow><mo>)</mo></mrow><mo>=</mo><mi>f</mi><mrow>' +
      '<mo>(</mo><mi>x</mi><mo>)</mo></mrow><mo>+</mo><mn>1</mn></mrow></math>';
  var speech = 'f de, parenthèse gauche, x plus 1, parenthèse droite, égale f de x, plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function009
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction009 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>g</mi><mrow><mo>(</mo><mrow><mn>2</mn><mi>x' +
      '</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g de, parenthèse gauche, 2 x, plus 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function010
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction010 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>g</mi><mrow><mo>(</mo><mrow><msup><mi>x' +
      '</mi><mn>2</mn></msup></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g de, parenthèse gauche, x au carré, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function011
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction011 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>f</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f inverse de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function012
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction012 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>g</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'g inverse de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function013
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction013 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>h</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'h inverse de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function014
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction014 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>f</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mn>2</mn><mi>x</mi></mrow><mo>)' +
      '</mo></mrow></mrow></math>';
  var speech = 'f inverse de 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function015
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction015 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>g</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mo>−</mo><mn>2</mn><mi>x</mi>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g inverse de négatif 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function016
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction016 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>f</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mn>3</mn><mi>x</mi><mo>−</mo>' +
      '<mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f inverse de, parenthèse gauche, 3 x, moins 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function017
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction017 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>g</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><msup><mi>x</mi><mn>2</mn>' +
      '</msup></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g inverse de, parenthèse gauche, x au carré, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function018
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction018 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>h</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mfrac><mn>1</mn><mn>2</mn>' +
      '</mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'h inverse de un-demi';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function019
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction019 = function() {
  // TODO: This throws a test exception.
  // var preference = 'Functions_Auto:Fraction_Over';
  var preference = 'Fraction_Over';
  var mathml = '<math><mrow><msup><mi>h</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mfrac><mn>1</mn><mn>2</mn>' +
      '</mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'h inverse de, parenthèse gauche, 1 sur 2, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function020
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction020 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>f</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mi>f</mi><mrow><mo>(</mo><mi>x' +
      '</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f inverse de, f de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function021
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction021 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>g</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mi>g</mi><mrow><mo>(</mo><mi>x' +
      '</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g inverse de, g de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function022
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction022 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>h</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mi>h</mi><mrow><mo>(</mo><mi>x' +
      '</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'h inverse de, h de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function023
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction023 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>f</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mi>f</mi><mrow><mo>(</mo><mrow>' +
      '<mn>2</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'f inverse de, f de 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function024
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction024 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>g</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mi>g</mi><mrow><mo>(</mo><mrow>' +
      '<mo>−</mo><mn>2</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow><mo>)' +
      '</mo></mrow></mrow></math>';
  var speech = 'g inverse de, g de négatif 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function025
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction025 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>h</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mi>h</mi><mrow><mo>(</mo><mrow>' +
      '<mfrac><mn>1</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'h inverse de, h de un-demi';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function026
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction026 = function() {
  // TODO: This throws a test exception.
  // var preference = 'Functions_Auto:Fraction_Over';
  var preference = 'Fraction_Over';
  var mathml = '<math><mrow><msup><mi>h</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mi>h</mi><mrow><mo>(</mo><mrow>' +
      '<mfrac><mn>1</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'h inverse de, parenthèse gauche, h de, parenthèse gauche, 1 sur 2, parenthèse droite, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function027
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction027 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>f</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mi>f</mi><mrow><mo>(</mo><mrow>' +
      '<mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow><mo>)' +
      '</mo></mrow><mo>=</mo><mi>x</mi><mo>+</mo><mn>1</mn></mrow></math>';
  var speech = 'f inverse de, parenthèse gauche, f de, parenthèse gauche, x plus 1, parenthèse droite, parenthèse droite, égale x plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function028
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction028 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>g</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mi>g</mi><mrow><mo>(</mo><mrow>' +
      '<mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g inverse de, parenthèse gauche, g de, parenthèse gauche, 2 x, plus 1, parenthèse droite, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function029
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction029 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>g</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mi>g</mi><mrow><mo>(</mo><mrow>' +
      '<msup><mi>x</mi><mn>2</mn></msup></mrow><mo>)</mo></mrow></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'g inverse de, parenthèse gauche, g de, parenthèse gauche, x au carré, parenthèse droite, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function030
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction030 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><msup><mi>f' +
      '</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mi>x' +
      '</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f de, f inverse de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function031
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction031 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>g</mi><mrow><mo>(</mo><mrow><msup><mi>g' +
      '</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mi>x' +
      '</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g de, g inverse de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function032
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction032 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>h</mi><mrow><mo>(</mo><mrow><msup><mi>h' +
      '</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mi>x' +
      '</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'h de, h inverse de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function033
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction033 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><msup><mi>f' +
      '</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow>' +
      '<mn>2</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'f de, f inverse de 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function034
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction034 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>g</mi><mrow><mo>(</mo><mrow><msup><mi>g' +
      '</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow>' +
      '<mo>−</mo><mn>2</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow><mo>)' +
      '</mo></mrow></mrow></math>';
  var speech = 'g de, g inverse de négatif 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function035
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction035 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><msup><mi>f' +
      '</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow>' +
      '<mn>3</mn><mi>x</mi><mo>−</mo><mn>1</mn></mrow><mo>)</mo></mrow>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f de, parenthèse gauche, f inverse de, parenthèse gauche, 3 x, moins 1, parenthèse droite, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function036
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction036 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>g</mi><mrow><mo>(</mo><mrow><msup><mi>g' +
      '</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow>' +
      '<msup><mi>x</mi><mn>2</mn></msup></mrow><mo>)</mo></mrow></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'g de, g inverse de, parenthèse gauche, x au carré, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function037
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction037 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>h</mi><mrow><mo>(</mo><mrow><msup><mi>h' +
      '</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow>' +
      '<mfrac><mn>1</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'h de, h inverse de un-demi';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function038
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction038 = function() {
  // TODO: This throws a test exception.
  // var preference = 'Functions_Auto:Fraction_FracOver';
  var preference = 'Fraction_FracOver';
  var mathml = '<math><mrow><mi>h</mi><mrow><mo>(</mo><mrow><msup><mi>h' +
      '</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow>' +
      '<mfrac><mn>1</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'h de, h inverse de, parenthèse gauche, fraction 1 sur 2, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function039
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction039 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mi>g</mi>' +
      '<mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'f de, g de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function040
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction040 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mi>g</mi>' +
      '<mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)' +
      '</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f de, parenthèse gauche, g de, parenthèse gauche, x plus 1, parenthèse droite, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function041
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction041 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>h</mi><mrow><mo>(</mo><mrow><mi>g</mi>' +
      '<mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'h de, g de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function042
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction042 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>h</mi><mrow><mo>(</mo><mrow><mi>g</mi>' +
      '<mrow><mo>(</mo><mrow><mfrac><mi>x</mi><mrow><mi>x</mi><mo>+</mo>' +
      '<mn>1</mn></mrow></mfrac></mrow><mo>)</mo></mrow></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'h de, parenthèse gauche, g de, parenthèse gauche, fraction avec numérateur x, et dénominateur x plus 1, parenthèse droite, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function043
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction043 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mi>f</mi><mo>+</mo><mi>g' +
      '</mi></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow><mo>=</mo><mi>f</mi><mo stretchy="false">(</mo><mi>x</mi><mo' +
      ' stretchy="false">)</mo><mo>+</mo><mi>g</mi><mo stretchy="false">(' +
      '</mo><mi>x</mi><mo stretchy="false">)</mo></mrow></math>';
  var speech = 'parenthèse gauche, f plus g, parenthèse droite, de x, égale f de x, plus g de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function044
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction044 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mi>f</mi><mo>+</mo><mi>g' +
      '</mi></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mi>x</mi><mo>+' +
      '</mo><mn>1</mn></mrow><mo>)</mo></mrow><mo>=</mo><mi>f</mi><mrow>' +
      '<mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow><mo>+</mo><mi>g</mi><mrow><mo>(</mo><mrow><mi>x</mi><mo>+' +
      '</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'parenthèse gauche, f plus g, parenthèse droite, de, parenthèse gauche, x plus 1, parenthèse droite, égale f de, parenthèse gauche, x plus 1, parenthèse droite, plus g de, parenthèse gauche, x plus 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function045
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction045 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mi>f</mi><mo>⋅</mo><mi>g' +
      '</mi></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'parenthèse gauche, f opérateur point g, parenthèse droite, de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function046
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction046 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mi>f</mi><mo>⋅</mo><mi>g' +
      '</mi></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mn>2</mn><mi>x' +
      '</mi><mo>+</mo><mn>5</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'parenthèse gauche, f opérateur point g, parenthèse droite, de, parenthèse gauche, 2 x, plus 5, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function047
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction047 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mfrac><mi>f</mi><mi>g' +
      '</mi></mfrac></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mi>x</mi><mo>)' +
      '</mo></mrow><mo>=</mo><mfrac><mrow><mi>f</mi><mrow><mo>(</mo><mi>x' +
      '</mi><mo>)</mo></mrow></mrow><mrow><mi>g</mi><mrow><mo>(</mo><mi>x' +
      '</mi><mo>)</mo></mrow></mrow></mfrac></mrow></math>';
  var speech = 'parenthèse gauche, f sur g, parenthèse droite, de x, égale, f de x, sur g de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function048
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction048 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mfrac><mi>f</mi><mi>g' +
      '</mi></mfrac></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mn>2' +
      '</mn><mi>x</mi><mo>+</mo><mn>5</mn></mrow><mo>)</mo></mrow><mo>=' +
      '</mo><mfrac><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mn>2</mn><mi>x' +
      '</mi><mo>+</mo><mn>5</mn></mrow><mo>)</mo></mrow></mrow><mrow><mi>g' +
      '</mi><mrow><mo>(</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>5</mn>' +
      '</mrow><mo>)</mo></mrow></mrow></mfrac></mrow></math>';
  var speech = 'parenthèse gauche, f sur g, parenthèse droite, de, parenthèse gauche, 2 x, plus 5, parenthèse droite, égale, fraction avec numérateur f de, parenthèse gauche, 2 x, plus 5, parenthèse droite, et dénominateur g de, parenthèse gauche, 2 x, plus 5, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function049
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction049 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mi>f</mi><mo>∘</mo><mi>g' +
      '</mi></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow><mo>=</mo><mi>f</mi><mrow><mo>(</mo><mrow><mi>g</mi><mrow>' +
      '<mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow>' +
      '</math>';
  var speech = 'parenthèse gauche, f opérateur rond g, parenthèse droite, de x, égale f de, g de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function050
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction050 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mn>2</mn><mi>f</mi><mrow><mo>(</mo><mi>x</mi>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = '2 f de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function051
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction051 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>c</mi><mi>f</mi><mrow><mo>(</mo><mi>x</mi>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'c f de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function052
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction052 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>2</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f au carré de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function053
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction053 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>2</mn></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'f au carré de, parenthèse gauche, 2 x, plus 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function054
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction054 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>3</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f au cube de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function055
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction055 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>3</mn></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'f au cube de, parenthèse gauche, 2 x, plus 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function056
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction056 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>4</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f à la puissance 4; de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function057
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction057 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>4</mn></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'f à la puissance 4; de, parenthèse gauche, 2 x, plus 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function058
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction058 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>5</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f à la puissance 5; de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function059
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction059 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>5</mn></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'f à la puissance 5; de, parenthèse gauche, 2 x, plus 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function060
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction060 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>f</mi><mi>n</mi></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f à la puissance n; de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function061
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction061 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>f</mi><mi>n</mi></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'f à la puissance n; de, parenthèse gauche, 2 x, plus 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function062
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction062 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>g</mi><mn>2</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'g au carré de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function063
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction063 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>g</mi><mn>2</mn></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'g au carré de, parenthèse gauche, 2 x, plus 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function064
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction064 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>h</mi><mn>3</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'h au cube de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function065
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction065 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>h</mi><mn>3</mn></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'h au cube de, parenthèse gauche, 2 x, plus 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function066
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction066 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>g</mi><mn>4</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'g à la puissance 4; de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function067
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction067 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>g</mi><mn>4</mn></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'g à la puissance 4; de, parenthèse gauche, 2 x, plus 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function068
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction068 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>h</mi><mn>5</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'h à la puissance 5; de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function069
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction069 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>h</mi><mn>5</mn></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'h à la puissance 5; de, parenthèse gauche, 2 x, plus 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function070
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction070 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>g</mi><mi>n</mi></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'g à la puissance n; de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function071
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction071 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>g</mi><mi>n</mi></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'g à la puissance n; de, parenthèse gauche, 2 x, plus 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function072
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction072 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msub><mi>f</mi><mn>1</mn></msub><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f sub 1, de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function073
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction073 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msub><mi>g</mi><mn>2</mn></msub><mrow><mo>(' +
      '</mo><mrow><msup><mi>x</mi><mn>3</mn></msup></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'g sub 2, de, parenthèse gauche, x au cube, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function074
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction074 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msub><mi>h</mi><mi>n</mi></msub><mrow><mo>(' +
      '</mo><mrow><mn>3</mn><mi>x</mi><mo>−</mo><mn>2</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'h sub n, de, parenthèse gauche, 3 x, moins 2, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function075
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction075 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msubsup><mi>f</mi><mn>1</mn><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msubsup><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'f sub 1, inverse de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function076
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction076 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msubsup><mi>g</mi><mn>2</mn><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msubsup><mrow><mo>(</mo><mrow><mn>2</mn><mi>x' +
      '</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g sub 2, inverse de, parenthèse gauche, 2 x, plus 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function077
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction077 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msubsup><mi>h</mi><mi>n</mi><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msubsup><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'h sub n, inverse de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function078
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction078 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msubsup><mi>g</mi><mn>1</mn><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msubsup><mrow><mo>(</mo><mrow><msub><mi>g</mi>' +
      '<mn>2</mn></msub><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'g sub 1, inverse de, g sub 2, de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function079
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction079 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msub><mi>f</mi><mn>1</mn></msub><mrow><mo>(' +
      '</mo><mrow><msubsup><mi>g</mi><mn>2</mn><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msubsup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'f sub 1, de, g sub 2, inverse de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function080
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction080 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mi>x</mi><mo>,' +
      '</mo><mi>y</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f de, parenthèse gauche, x virgule y, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function081
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction081 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mi>x</mi><mo>,' +
      '</mo><mi>y</mi><mo>,</mo><mi>z</mi></mrow><mo>)</mo></mrow></mrow>' +
      '</math>';
  var speech = 'f de, parenthèse gauche, x virgule y virgule z, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function082
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction082 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mi>x</mi><mo>+' +
      '</mo><mn>1</mn><mo>,</mo><mn>2</mn><mi>y</mi></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'f de, parenthèse gauche, x plus 1, virgule, 2 y, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function083
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction083 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mn>2</mn><mi>x' +
      '</mi><mo>,</mo><mi>x</mi><mo>+</mo><mn>1</mn><mo>,</mo><msup><mi>x' +
      '</mi><mn>2</mn></msup></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f de, parenthèse gauche, 2 x, virgule, x plus 1, virgule, x au carré, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function084
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction084 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'f fois x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function085
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction085 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>g</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'g fois x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function086
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction086 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>h</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'h fois x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function087
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction087 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mn>2</mn><mi>x' +
      '</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f fois 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function088
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction088 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>g</mi><mrow><mo>(</mo><mrow><mo>−</mo><mn>2' +
      '</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g fois négatif 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function089
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction089 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>h</mi><mrow><mo>(</mo><mrow><mfrac><mn>1' +
      '</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'h fois un-demi';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function090
 */
sre.ClearspeakFrenchFunctions.prototype.untestFunction090 = function() {
  var preference = 'Functions_None:Fraction_Over';
  var mathml = '<math><mrow><mi>h</mi><mrow><mo>(</mo><mrow><mfrac><mn>1' +
      '</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'XXXX';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function091
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction091 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mi>x</mi><mo>+' +
      '</mo><mn>1</mn></mrow><mo>)</mo></mrow><mo>=</mo><mi>f</mi><mrow>' +
      '<mo>(</mo><mi>x</mi><mo>)</mo></mrow><mo>+</mo><mn>1</mn></mrow></math>';
  var speech = 'f fois, parenthèse gauche, x plus 1, parenthèse droite, égale, f fois x, plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function092
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction092 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>g</mi><mrow><mo>(</mo><mrow><mn>2</mn><mi>x' +
      '</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g fois, parenthèse gauche, 2 x, plus 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function093
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction093 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>g</mi><mrow><mo>(</mo><mrow><msup><mi>x' +
      '</mi><mn>2</mn></msup></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g fois, parenthèse gauche, x au carré, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function094
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction094 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>f</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f à la puissance négatif 1; fois x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function095
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction095 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>g</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'g à la puissance négatif 1; fois x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function096
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction096 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>h</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'h à la puissance négatif 1; fois x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function097
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction097 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>f</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mn>2</mn><mi>x</mi></mrow><mo>)' +
      '</mo></mrow></mrow></math>';
  var speech = 'f à la puissance négatif 1; fois 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function098
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction098 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>g</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mo>−</mo><mn>2</mn><mi>x</mi>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g à la puissance négatif 1; fois négatif 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function099
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction099 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>f</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mn>3</mn><mi>x</mi><mo>−</mo>' +
      '<mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f à la puissance négatif 1; fois, parenthèse gauche, 3 x, moins 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function100
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction100 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>g</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><msup><mi>x</mi><mn>2</mn>' +
      '</msup></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g à la puissance négatif 1; fois, parenthèse gauche, x au carré, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function101
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction101 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>h</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mfrac><mn>1</mn><mn>2</mn>' +
      '</mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'h à la puissance négatif 1; fois un-demi';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function102
 */
sre.ClearspeakFrenchFunctions.prototype.untestFunction102 = function() {
  var preference = 'Functions_None:Fraction_Over';
  var mathml = '<math><mrow><msup><mi>h</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mfrac><mn>1</mn><mn>2</mn>' +
      '</mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'XXXX';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function103
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction103 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>f</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mi>f</mi><mrow><mo>(</mo><mi>x' +
      '</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f à la puissance négatif 1; fois, f fois x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function104
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction104 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>g</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mi>g</mi><mrow><mo>(</mo><mi>x' +
      '</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g à la puissance négatif 1; fois, g fois x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function105
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction105 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>h</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mi>h</mi><mrow><mo>(</mo><mi>x' +
      '</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'h à la puissance négatif 1; fois, h fois x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function106
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction106 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>f</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mi>f</mi><mrow><mo>(</mo><mrow>' +
      '<mn>2</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'f à la puissance négatif 1; fois, f fois 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function107
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction107 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>g</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mi>g</mi><mrow><mo>(</mo><mrow>' +
      '<mo>−</mo><mn>2</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow><mo>)' +
      '</mo></mrow></mrow></math>';
  var speech = 'g à la puissance négatif 1; fois, g fois négatif 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function108
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction108 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>h</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mi>h</mi><mrow><mo>(</mo><mrow>' +
      '<mfrac><mn>1</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'h à la puissance négatif 1; fois, h fois un-demi';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function109
 */
sre.ClearspeakFrenchFunctions.prototype.untestFunction109 = function() {
  var preference = 'Functions_None:Fraction_Over';
  var mathml = '<math><mrow><msup><mi>h</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mi>h</mi><mrow><mo>(</mo><mrow>' +
      '<mfrac><mn>1</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'XXXX';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function110
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction110 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>f</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mi>f</mi><mrow><mo>(</mo><mrow>' +
      '<mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow><mo>)' +
      '</mo></mrow><mo>=</mo><mi>x</mi><mo>+</mo><mn>1</mn></mrow></math>';
  var speech = 'f à la puissance négatif 1; fois, parenthèse gauche, f fois, parenthèse gauche, x plus 1, parenthèse droite, parenthèse droite, égale x plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function111
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction111 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>g</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mi>g</mi><mrow><mo>(</mo><mrow>' +
      '<mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g à la puissance négatif 1; fois, parenthèse gauche, g fois, parenthèse gauche, 2 x, plus 1, parenthèse droite, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function112
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction112 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>g</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mi>g</mi><mrow><mo>(</mo><mrow>' +
      '<msup><mi>x</mi><mn>2</mn></msup></mrow><mo>)</mo></mrow></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'g à la puissance négatif 1; fois, parenthèse gauche, g fois, parenthèse gauche, x au carré, parenthèse droite, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function113
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction113 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><msup><mi>f' +
      '</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mi>x' +
      '</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f fois, parenthèse gauche, f à la puissance négatif 1; fois x, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function114
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction114 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>g</mi><mrow><mo>(</mo><mrow><msup><mi>g' +
      '</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mi>x' +
      '</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g fois, parenthèse gauche, g à la puissance négatif 1; fois x, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function115
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction115 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>h</mi><mrow><mo>(</mo><mrow><msup><mi>h' +
      '</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mi>x' +
      '</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'h fois, parenthèse gauche, h à la puissance négatif 1; fois x, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function116
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction116 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><msup><mi>f' +
      '</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow>' +
      '<mn>2</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'f fois, parenthèse gauche, f à la puissance négatif 1; fois 2 x, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function117
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction117 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>g</mi><mrow><mo>(</mo><mrow><msup><mi>g' +
      '</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow>' +
      '<mo>−</mo><mn>2</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow><mo>)' +
      '</mo></mrow></mrow></math>';
  var speech = 'g fois, parenthèse gauche, g à la puissance négatif 1; fois négatif 2 x, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function118
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction118 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><msup><mi>f' +
      '</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow>' +
      '<mn>3</mn><mi>x</mi><mo>−</mo><mn>1</mn></mrow><mo>)</mo></mrow>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f fois, parenthèse gauche, f à la puissance négatif 1; fois, parenthèse gauche, 3 x, moins 1, parenthèse droite, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function119
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction119 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>g</mi><mrow><mo>(</mo><mrow><msup><mi>g' +
      '</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow>' +
      '<msup><mi>x</mi><mn>2</mn></msup></mrow><mo>)</mo></mrow></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'g fois, parenthèse gauche, g à la puissance négatif 1; fois, parenthèse gauche, x au carré, parenthèse droite, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function120
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction120 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>h</mi><mrow><mo>(</mo><mrow><msup><mi>h' +
      '</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow>' +
      '<mfrac><mn>1</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'h fois, parenthèse gauche, h à la puissance négatif 1; fois un-demi, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function121
 */
sre.ClearspeakFrenchFunctions.prototype.untestFunction121 = function() {
  var preference = 'Functions_None:Fraction_Over';
  var mathml = '<math><mrow><mi>h</mi><mrow><mo>(</mo><mrow><msup><mi>h' +
      '</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow>' +
      '<mfrac><mn>1</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'XXXX';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function122
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction122 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mi>g</mi>' +
      '<mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'f fois, g fois x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function123
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction123 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mi>g</mi>' +
      '<mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)' +
      '</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f fois, parenthèse gauche, g fois, parenthèse gauche, x plus 1, parenthèse droite, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function124
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction124 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>h</mi><mrow><mo>(</mo><mrow><mi>g</mi>' +
      '<mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'h fois, g fois x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function125
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction125 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>h</mi><mrow><mo>(</mo><mrow><mi>g</mi>' +
      '<mrow><mo>(</mo><mrow><mfrac><mi>x</mi><mrow><mi>x</mi><mo>+</mo>' +
      '<mn>1</mn></mrow></mfrac></mrow><mo>)</mo></mrow></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'h fois, parenthèse gauche, g fois, parenthèse gauche, fraction avec numérateur x, et dénominateur x plus 1, parenthèse droite, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function126
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction126 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mi>f</mi><mo>+</mo><mi>g' +
      '</mi></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow><mo>=</mo><mi>f</mi><mo stretchy="false">(</mo><mi>x</mi><mo' +
      ' stretchy="false">)</mo><mo>+</mo><mi>g</mi><mo stretchy="false">(' +
      '</mo><mi>x</mi><mo stretchy="false">)</mo></mrow></math>';
  var speech = 'parenthèse gauche, f plus g, parenthèse droite, fois x, égale, f fois x, plus, g fois x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function127
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction127 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mi>f</mi><mo>+</mo><mi>g' +
      '</mi></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mi>x</mi><mo>+' +
      '</mo><mn>1</mn></mrow><mo>)</mo></mrow><mo>=</mo><mi>f</mi><mrow>' +
      '<mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow><mo>+</mo><mi>g</mi><mrow><mo>(</mo><mrow><mi>x</mi><mo>+' +
      '</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'parenthèse gauche, f plus g, parenthèse droite, fois, parenthèse gauche, x plus 1, parenthèse droite, égale, f fois, parenthèse gauche, x plus 1, parenthèse droite, plus, g fois, parenthèse gauche, x plus 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function128
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction128 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mi>f</mi><mo>⋅</mo><mi>g' +
      '</mi></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'parenthèse gauche, f opérateur point g, parenthèse droite, fois x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function129
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction129 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mi>f</mi><mo>⋅</mo><mi>g' +
      '</mi></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mn>2</mn><mi>x' +
      '</mi><mo>+</mo><mn>5</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'parenthèse gauche, f opérateur point g, parenthèse droite, fois, parenthèse gauche, 2 x, plus 5, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function130
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction130 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mfrac><mi>f</mi><mi>g' +
      '</mi></mfrac></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mi>x</mi><mo>)' +
      '</mo></mrow><mo>=</mo><mfrac><mrow><mi>f</mi><mrow><mo>(</mo><mi>x' +
      '</mi><mo>)</mo></mrow></mrow><mrow><mi>g</mi><mrow><mo>(</mo><mi>x' +
      '</mi><mo>)</mo></mrow></mrow></mfrac></mrow></math>';
  var speech = 'parenthèse gauche, f sur g, parenthèse droite, fois x, égale, fraction avec numérateur, f fois x, et dénominateur, g fois x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function131
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction131 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mfrac><mi>f</mi><mi>g' +
      '</mi></mfrac></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mn>2' +
      '</mn><mi>x</mi><mo>+</mo><mn>5</mn></mrow><mo>)</mo></mrow><mo>=' +
      '</mo><mfrac><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mn>2</mn><mi>x' +
      '</mi><mo>+</mo><mn>5</mn></mrow><mo>)</mo></mrow></mrow><mrow><mi>g' +
      '</mi><mrow><mo>(</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>5</mn>' +
      '</mrow><mo>)</mo></mrow></mrow></mfrac></mrow></math>';
  var speech = 'parenthèse gauche, f sur g, parenthèse droite, fois, parenthèse gauche, 2 x, plus 5, parenthèse droite, égale, fraction avec numérateur, f fois, parenthèse gauche, 2 x, plus 5, parenthèse droite, et dénominateur, g fois, parenthèse gauche, 2 x, plus 5, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function132
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction132 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mn>2</mn><mi>f</mi><mrow><mo>(</mo><mi>x</mi>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = '2, f fois x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function133
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction133 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>c</mi><mi>f</mi><mrow><mo>(</mo><mi>x</mi>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'c, f fois x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function134
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction134 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>2</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f au carré fois x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function135
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction135 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>2</mn></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'f au carré fois, parenthèse gauche, 2 x, plus 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function136
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction136 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>3</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f au cube fois x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function137
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction137 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>3</mn></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'f au cube fois, parenthèse gauche, 2 x, plus 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function138
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction138 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>4</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f à la puissance 4; fois x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function139
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction139 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>4</mn></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'f à la puissance 4; fois, parenthèse gauche, 2 x, plus 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function140
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction140 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>5</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f à la puissance 5; fois x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function141
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction141 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>5</mn></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'f à la puissance 5; fois, parenthèse gauche, 2 x, plus 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function142
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction142 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>f</mi><mi>n</mi></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f à la puissance n; fois x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function143
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction143 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>f</mi><mi>n</mi></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'f à la puissance n; fois, parenthèse gauche, 2 x, plus 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function144
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction144 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>g</mi><mn>2</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'g au carré fois x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function145
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction145 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>g</mi><mn>2</mn></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'g au carré fois, parenthèse gauche, 2 x, plus 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function146
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction146 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>h</mi><mn>3</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'h au cube fois x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function147
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction147 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>h</mi><mn>3</mn></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'h au cube fois, parenthèse gauche, 2 x, plus 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function148
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction148 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>g</mi><mn>4</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'g à la puissance 4; fois x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function149
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction149 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>g</mi><mn>4</mn></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'g à la puissance 4; fois, parenthèse gauche, 2 x, plus 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function150
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction150 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>h</mi><mn>5</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'h à la puissance 5; fois x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function151
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction151 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>h</mi><mn>5</mn></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'h à la puissance 5; fois, parenthèse gauche, 2 x, plus 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function152
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction152 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>g</mi><mi>n</mi></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'g à la puissance n; fois x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function153
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction153 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>g</mi><mi>n</mi></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'g à la puissance n; fois, parenthèse gauche, 2 x, plus 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function154
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction154 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msub><mi>f</mi><mn>1</mn></msub><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f sub 1, fois x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function156
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction156 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msub><mi>g</mi><mn>2</mn></msub><mrow><mo>(' +
      '</mo><mrow><msup><mi>x</mi><mn>3</mn></msup></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'g sub 2, fois, parenthèse gauche, x au cube, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function157
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction157 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msub><mi>h</mi><mi>n</mi></msub><mrow><mo>(' +
      '</mo><mrow><mn>3</mn><mi>x</mi><mo>−</mo><mn>2</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'h sub n, fois, parenthèse gauche, 3 x, moins 2, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function158
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction158 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msubsup><mi>f</mi><mn>1</mn><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msubsup><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'f sub 1, à la puissance négatif 1; fois x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function159
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction159 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msubsup><mi>g</mi><mn>2</mn><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msubsup><mrow><mo>(</mo><mrow><mn>2</mn><mi>x' +
      '</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g sub 2, à la puissance négatif 1; fois, parenthèse gauche, 2 x, plus 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function160
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction160 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msubsup><mi>h</mi><mi>n</mi><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msubsup><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'h sub n, à la puissance négatif 1; fois x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function161
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction161 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msubsup><mi>g</mi><mn>1</mn><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msubsup><mrow><mo>(</mo><mrow><msub><mi>g</mi>' +
      '<mn>2</mn></msub><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'g sub 1, à la puissance négatif 1; fois, parenthèse gauche, g sub 2, fois x, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function162
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction162 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msub><mi>f</mi><mn>1</mn></msub><mrow><mo>(' +
      '</mo><mrow><msubsup><mi>g</mi><mn>2</mn><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msubsup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'f sub 1, fois, parenthèse gauche, g sub 2, à la puissance négatif 1; fois x, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function163
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction163 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mi>x</mi><mo>,' +
      '</mo><mi>y</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f fois, parenthèse gauche, x virgule y, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function164
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction164 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mi>x</mi><mo>,' +
      '</mo><mi>y</mi><mo>,</mo><mi>z</mi></mrow><mo>)</mo></mrow></mrow>' +
      '</math>';
  var speech = 'f fois, parenthèse gauche, x virgule y virgule z, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function165
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction165 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mi>x</mi><mo>+' +
      '</mo><mn>1</mn><mo>,</mo><mn>2</mn><mi>y</mi></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'f fois, parenthèse gauche, x plus 1, virgule, 2 y, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function166
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction166 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mn>2</mn><mi>x' +
      '</mi><mo>,</mo><mi>x</mi><mo>+</mo><mn>1</mn><mo>,</mo><msup><mi>x' +
      '</mi><mn>2</mn></msup></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f fois, parenthèse gauche, 2 x, virgule, x plus 1, virgule, x au carré, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


// NEW: Reciprocal


/**
 * Testing ClearspeakFrenchFunctions Example Function011
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction011b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>f</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'la reciproque de f de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function012
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction012b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>g</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'la reciproque de g de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function013
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction013b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>h</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'la reciproque de h de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function014
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction014b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>f</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mn>2</mn><mi>x</mi></mrow><mo>)' +
      '</mo></mrow></mrow></math>';
  var speech = 'la reciproque de f de 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function015
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction015b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>g</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mo>−</mo><mn>2</mn><mi>x</mi>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'la reciproque de g de négatif 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function016
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction016b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>f</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mn>3</mn><mi>x</mi><mo>−</mo>' +
      '<mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'la reciproque de f de, parenthèse gauche, 3 x, moins 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function017
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction017b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>g</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><msup><mi>x</mi><mn>2</mn>' +
      '</msup></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'la reciproque de g de, parenthèse gauche, x au carré, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function018
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction018b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>h</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mfrac><mn>1</mn><mn>2</mn>' +
      '</mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'la reciproque de h de un-demi';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function019
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction019b = function() {
  // TODO: This throws a test exception.
  // var preference = 'Functions_Auto:Fraction_Over';
  var preference = 'Fraction_Over:Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>h</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mfrac><mn>1</mn><mn>2</mn>' +
      '</mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'la reciproque de h de, 1 sur 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function020
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction020b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>f</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mi>f</mi><mrow><mo>(</mo><mi>x' +
      '</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'la reciproque de f de, f de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function021
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction021b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>g</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mi>g</mi><mrow><mo>(</mo><mi>x' +
      '</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'la reciproque de g de, g de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function022
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction022b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>h</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mi>h</mi><mrow><mo>(</mo><mi>x' +
      '</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'la reciproque de h de, h de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function023
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction023b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>f</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mi>f</mi><mrow><mo>(</mo><mrow>' +
      '<mn>2</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'la reciproque de f de, f de 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function024
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction024b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>g</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mi>g</mi><mrow><mo>(</mo><mrow>' +
      '<mo>−</mo><mn>2</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow><mo>)' +
      '</mo></mrow></mrow></math>';
  var speech = 'la reciproque de g de, g de négatif 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function025
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction025b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>h</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mi>h</mi><mrow><mo>(</mo><mrow>' +
      '<mfrac><mn>1</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'la reciproque de h de, h de un-demi';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function026
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction026b = function() {
  // TODO: This throws a test exception.
  // var preference = 'Functions_Auto:Fraction_Over';
  var preference = 'Fraction_Over:Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>h</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mi>h</mi><mrow><mo>(</mo><mrow>' +
      '<mfrac><mn>1</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'la reciproque de h de, h de, 1 sur 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function027
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction027b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>f</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mi>f</mi><mrow><mo>(</mo><mrow>' +
      '<mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow><mo>)' +
      '</mo></mrow><mo>=</mo><mi>x</mi><mo>+</mo><mn>1</mn></mrow></math>';
  var speech = 'la reciproque de f de, parenthèse gauche, f de, parenthèse gauche, x plus 1, parenthèse droite, parenthèse droite, égale x plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function028
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction028b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>g</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mi>g</mi><mrow><mo>(</mo><mrow>' +
      '<mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'la reciproque de g de, parenthèse gauche, g de, parenthèse gauche, 2 x, plus 1, parenthèse droite, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function029
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction029b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>g</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mi>g</mi><mrow><mo>(</mo><mrow>' +
      '<msup><mi>x</mi><mn>2</mn></msup></mrow><mo>)</mo></mrow></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'la reciproque de g de, parenthèse gauche, g de, parenthèse gauche, x au carré, parenthèse droite, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function030
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction030b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><msup><mi>f' +
      '</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mi>x' +
      '</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f de, la reciproque de f de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function031
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction031b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><mi>g</mi><mrow><mo>(</mo><mrow><msup><mi>g' +
      '</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mi>x' +
      '</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g de, la reciproque de g de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function032
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction032b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><mi>h</mi><mrow><mo>(</mo><mrow><msup><mi>h' +
      '</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mi>x' +
      '</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'h de, la reciproque de h de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function033
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction033b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><msup><mi>f' +
      '</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow>' +
      '<mn>2</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'f de, la reciproque de f de 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function034
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction034b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><mi>g</mi><mrow><mo>(</mo><mrow><msup><mi>g' +
      '</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow>' +
      '<mo>−</mo><mn>2</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow><mo>)' +
      '</mo></mrow></mrow></math>';
  var speech = 'g de, la reciproque de g de négatif 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function035
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction035b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><msup><mi>f' +
      '</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow>' +
      '<mn>3</mn><mi>x</mi><mo>−</mo><mn>1</mn></mrow><mo>)</mo></mrow>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f de, parenthèse gauche, la reciproque de f de, parenthèse gauche, 3 x, moins 1, parenthèse droite, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function036
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction036b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><mi>g</mi><mrow><mo>(</mo><mrow><msup><mi>g' +
      '</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow>' +
      '<msup><mi>x</mi><mn>2</mn></msup></mrow><mo>)</mo></mrow></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'g de, la reciproque de g de, parenthèse gauche, x au carré, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function037
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction037b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><mi>h</mi><mrow><mo>(</mo><mrow><msup><mi>h' +
      '</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow>' +
      '<mfrac><mn>1</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'h de, la reciproque de h de un-demi';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function038
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction038b = function() {
  // TODO: This throws a test exception.
  // var preference = 'Functions_Auto:Fraction_FracOver';
  var preference = 'Fraction_FracOver:Functions_Reciprocal';
  var mathml = '<math><mrow><mi>h</mi><mrow><mo>(</mo><mrow><msup><mi>h' +
      '</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow>' +
      '<mfrac><mn>1</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'h de, la reciproque de h de, fraction 1 sur 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function039
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction039b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mi>g</mi>' +
      '<mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'f de, g de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function040
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction040b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mi>g</mi>' +
      '<mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)' +
      '</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f de, parenthèse gauche, g de, parenthèse gauche, x plus 1, parenthèse droite, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function041
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction041b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><mi>h</mi><mrow><mo>(</mo><mrow><mi>g</mi>' +
      '<mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'h de, g de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function042
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction042b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><mi>h</mi><mrow><mo>(</mo><mrow><mi>g</mi>' +
      '<mrow><mo>(</mo><mrow><mfrac><mi>x</mi><mrow><mi>x</mi><mo>+</mo>' +
      '<mn>1</mn></mrow></mfrac></mrow><mo>)</mo></mrow></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'h de, parenthèse gauche, g de, parenthèse gauche, fraction avec numérateur x, et dénominateur x plus 1, parenthèse droite, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function043
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction043b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mi>f</mi><mo>+</mo><mi>g' +
      '</mi></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow><mo>=</mo><mi>f</mi><mo stretchy="false">(</mo><mi>x</mi><mo' +
      ' stretchy="false">)</mo><mo>+</mo><mi>g</mi><mo stretchy="false">(' +
      '</mo><mi>x</mi><mo stretchy="false">)</mo></mrow></math>';
  var speech = 'parenthèse gauche, f plus g, parenthèse droite, de x, égale f de x, plus g de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function044
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction044b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mi>f</mi><mo>+</mo><mi>g' +
      '</mi></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mi>x</mi><mo>+' +
      '</mo><mn>1</mn></mrow><mo>)</mo></mrow><mo>=</mo><mi>f</mi><mrow>' +
      '<mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow><mo>+</mo><mi>g</mi><mrow><mo>(</mo><mrow><mi>x</mi><mo>+' +
      '</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'parenthèse gauche, f plus g, parenthèse droite, de, parenthèse gauche, x plus 1, parenthèse droite, égale f de, parenthèse gauche, x plus 1, parenthèse droite, plus g de, parenthèse gauche, x plus 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function045
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction045b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mi>f</mi><mo>⋅</mo><mi>g' +
      '</mi></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'parenthèse gauche, f opérateur point g, parenthèse droite, de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function046
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction046b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mi>f</mi><mo>⋅</mo><mi>g' +
      '</mi></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mn>2</mn><mi>x' +
      '</mi><mo>+</mo><mn>5</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'parenthèse gauche, f opérateur point g, parenthèse droite, de, parenthèse gauche, 2 x, plus 5, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function047
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction047b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mfrac><mi>f</mi><mi>g' +
      '</mi></mfrac></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mi>x</mi><mo>)' +
      '</mo></mrow><mo>=</mo><mfrac><mrow><mi>f</mi><mrow><mo>(</mo><mi>x' +
      '</mi><mo>)</mo></mrow></mrow><mrow><mi>g</mi><mrow><mo>(</mo><mi>x' +
      '</mi><mo>)</mo></mrow></mrow></mfrac></mrow></math>';
  var speech = 'parenthèse gauche, f sur g, parenthèse droite, de x, égale, f de x, sur g de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function048
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction048b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mfrac><mi>f</mi><mi>g' +
      '</mi></mfrac></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mn>2' +
      '</mn><mi>x</mi><mo>+</mo><mn>5</mn></mrow><mo>)</mo></mrow><mo>=' +
      '</mo><mfrac><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mn>2</mn><mi>x' +
      '</mi><mo>+</mo><mn>5</mn></mrow><mo>)</mo></mrow></mrow><mrow><mi>g' +
      '</mi><mrow><mo>(</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>5</mn>' +
      '</mrow><mo>)</mo></mrow></mrow></mfrac></mrow></math>';
  var speech = 'parenthèse gauche, f sur g, parenthèse droite, de, parenthèse gauche, 2 x, plus 5, parenthèse droite, égale, fraction avec numérateur f de, parenthèse gauche, 2 x, plus 5, parenthèse droite, et dénominateur g de, parenthèse gauche, 2 x, plus 5, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function049
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction049b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mi>f</mi><mo>∘</mo><mi>g' +
      '</mi></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow><mo>=</mo><mi>f</mi><mrow><mo>(</mo><mrow><mi>g</mi><mrow>' +
      '<mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow>' +
      '</math>';
  var speech = 'parenthèse gauche, f opérateur rond g, parenthèse droite, de x, égale f de, g de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function050
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction050b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><mn>2</mn><mi>f</mi><mrow><mo>(</mo><mi>x</mi>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = '2 f de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function051
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction051b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><mi>c</mi><mi>f</mi><mrow><mo>(</mo><mi>x</mi>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'c f de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function052
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction052b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>2</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f au carré de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function053
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction053b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>2</mn></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'f au carré de, parenthèse gauche, 2 x, plus 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function054
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction054b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>3</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f au cube de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function055
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction055b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>3</mn></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'f au cube de, parenthèse gauche, 2 x, plus 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function056
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction056b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>4</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f à la puissance 4; de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function057
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction057b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>4</mn></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'f à la puissance 4; de, parenthèse gauche, 2 x, plus 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function058
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction058b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>5</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f à la puissance 5; de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function059
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction059b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>5</mn></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'f à la puissance 5; de, parenthèse gauche, 2 x, plus 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function060
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction060b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>f</mi><mi>n</mi></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f à la puissance n; de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function061
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction061b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>f</mi><mi>n</mi></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'f à la puissance n; de, parenthèse gauche, 2 x, plus 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function062
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction062b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>g</mi><mn>2</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'g au carré de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function063
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction063b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>g</mi><mn>2</mn></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'g au carré de, parenthèse gauche, 2 x, plus 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function064
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction064b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>h</mi><mn>3</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'h au cube de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function065
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction065b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>h</mi><mn>3</mn></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'h au cube de, parenthèse gauche, 2 x, plus 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function066
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction066b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>g</mi><mn>4</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'g à la puissance 4; de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function067
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction067b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>g</mi><mn>4</mn></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'g à la puissance 4; de, parenthèse gauche, 2 x, plus 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function068
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction068b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>h</mi><mn>5</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'h à la puissance 5; de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function069
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction069b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>h</mi><mn>5</mn></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'h à la puissance 5; de, parenthèse gauche, 2 x, plus 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function070
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction070b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>g</mi><mi>n</mi></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'g à la puissance n; de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function071
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction071b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>g</mi><mi>n</mi></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'g à la puissance n; de, parenthèse gauche, 2 x, plus 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function072
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction072b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msub><mi>f</mi><mn>1</mn></msub><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f sub 1, de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function073
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction073b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msub><mi>g</mi><mn>2</mn></msub><mrow><mo>(' +
      '</mo><mrow><msup><mi>x</mi><mn>3</mn></msup></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'g sub 2, de, parenthèse gauche, x au cube, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function074
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction074b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msub><mi>h</mi><mi>n</mi></msub><mrow><mo>(' +
      '</mo><mrow><mn>3</mn><mi>x</mi><mo>−</mo><mn>2</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'h sub n, de, parenthèse gauche, 3 x, moins 2, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function075
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction075b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msubsup><mi>f</mi><mn>1</mn><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msubsup><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'la reciproque de, f sub 1, de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function076
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction076b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msubsup><mi>g</mi><mn>2</mn><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msubsup><mrow><mo>(</mo><mrow><mn>2</mn><mi>x' +
      '</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'la reciproque de, g sub 2, de, parenthèse gauche, 2 x, plus 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function077
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction077b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msubsup><mi>h</mi><mi>n</mi><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msubsup><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'la reciproque de, h sub n, de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function078
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction078b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msubsup><mi>g</mi><mn>1</mn><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msubsup><mrow><mo>(</mo><mrow><msub><mi>g</mi>' +
      '<mn>2</mn></msub><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'la reciproque de, g sub 1, de, g sub 2, de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function079
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction079b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msub><mi>f</mi><mn>1</mn></msub><mrow><mo>(' +
      '</mo><mrow><msubsup><mi>g</mi><mn>2</mn><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msubsup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'f sub 1, de, la reciproque de, g sub 2, de x';
  this.executeRuleTest(mathml, speech, preference);
};

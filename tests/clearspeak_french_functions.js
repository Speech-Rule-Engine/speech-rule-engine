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
  var speech = 'f of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function002
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction002 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>g</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'g of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function003
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction003 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>h</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'h of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function004
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction004 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mn>2</mn><mi>x' +
      '</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f of 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function005
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction005 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>g</mi><mrow><mo>(</mo><mrow><mo>−</mo><mn>2' +
      '</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g of negative 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function006
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction006 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>h</mi><mrow><mo>(</mo><mrow><mfrac><mn>1' +
      '</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'h of one half';
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
  var speech = 'h of, open paren, 1 over 2, close paren';
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
  var speech = 'f of, open paren, x plus 1, close paren, equals f of x, plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function009
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction009 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>g</mi><mrow><mo>(</mo><mrow><mn>2</mn><mi>x' +
      '</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g of, open paren, 2 x, plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function010
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction010 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>g</mi><mrow><mo>(</mo><mrow><msup><mi>x' +
      '</mi><mn>2</mn></msup></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g of, open paren, x squared, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function011
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction011 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>f</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f inverse of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function012
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction012 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>g</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'g inverse of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function013
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction013 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>h</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'h inverse of x';
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
  var speech = 'f inverse of 2 x';
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
  var speech = 'g inverse of negative 2 x';
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
  var speech = 'f inverse of, open paren, 3 x, minus 1, close paren';
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
  var speech = 'g inverse of, open paren, x squared, close paren';
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
  var speech = 'h inverse of one half';
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
  var speech = 'h inverse of, open paren, 1 over 2, close paren';
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
  var speech = 'f inverse of, f of x';
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
  var speech = 'g inverse of, g of x';
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
  var speech = 'h inverse of, h of x';
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
  var speech = 'f inverse of, f of 2 x';
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
  var speech = 'g inverse of, g of negative 2 x';
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
  var speech = 'h inverse of, h of one half';
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
  var speech = 'h inverse of, open paren, h of, open paren, 1 over 2, close' +
      ' paren, close paren';
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
  var speech = 'f inverse of, open paren, f of, open paren, x plus 1, close' +
      ' paren, close paren, equals x plus 1';
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
  var speech = 'g inverse of, open paren, g of, open paren, 2 x, plus 1,' +
      ' close paren, close paren';
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
  var speech = 'g inverse of, open paren, g of, open paren, x squared,' +
      ' close paren, close paren';
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
  var speech = 'f of, f inverse of x';
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
  var speech = 'g of, g inverse of x';
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
  var speech = 'h of, h inverse of x';
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
  var speech = 'f of, f inverse of 2 x';
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
  var speech = 'g of, g inverse of negative 2 x';
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
  var speech = 'f of, open paren, f inverse of, open paren, 3 x, minus 1,' +
      ' close paren, close paren';
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
  var speech = 'g of, g inverse of, open paren, x squared, close paren';
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
  var speech = 'h of, h inverse of one half';
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
  var speech = 'h of, h inverse of, open paren, the fraction 1 over 2,' +
      ' close paren';
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
  var speech = 'f of, g of x';
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
  var speech = 'f of, open paren, g of, open paren, x plus 1, close paren,' +
      ' close paren';
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
  var speech = 'h of, g of x';
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
  var speech = 'h of, open paren, g of, open paren, the fraction with' +
      ' numerator x, and denominator x plus 1, close paren, close paren';
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
  var speech = 'open paren, f plus g, close paren, of x, equals f of x,' +
      ' plus g of x';
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
  var speech = 'open paren, f plus g, close paren, of, open paren, x plus' +
      ' 1, close paren, equals f of, open paren, x plus 1, close paren,' +
      ' plus g of, open paren, x plus 1, close paren';
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
  var speech = 'open paren, f times g, close paren, of x';
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
  var speech = 'open paren, f times g, close paren, of, open paren, 2 x,' +
      ' plus 5, close paren';
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
  var speech = 'open paren, f over g, close paren, of x, equals, f of x,' +
      ' over g of x';
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
  var speech = 'open paren, f over g, close paren, of, open paren, 2 x,' +
      ' plus 5, close paren, equals, the fraction with numerator f of, open' +
      ' paren, 2 x, plus 5, close paren, and denominator g of, open paren,' +
      ' 2 x, plus 5, close paren';
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
  var speech = 'open paren, f composed with g, close paren, of x, equals f' +
      ' of, g of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function050
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction050 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mn>2</mn><mi>f</mi><mrow><mo>(</mo><mi>x</mi>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = '2 f of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function051
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction051 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>c</mi><mi>f</mi><mrow><mo>(</mo><mi>x</mi>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'c f of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function052
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction052 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>2</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f squared of x';
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
  var speech = 'f squared of, open paren, 2 x, plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function054
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction054 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>3</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f cubed of x';
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
  var speech = 'f cubed of, open paren, 2 x, plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function056
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction056 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>4</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'the fourth power of, f of x';
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
  var speech = 'the fourth power of, f of, open paren, 2 x, plus 1, close' +
      ' paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function058
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction058 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>5</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'the fifth power of, f of x';
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
  var speech = 'the fifth power of, f of, open paren, 2 x, plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function060
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction060 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>f</mi><mi>n</mi></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'the nth power of, f of x';
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
  var speech = 'the nth power of, f of, open paren, 2 x, plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function062
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction062 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>g</mi><mn>2</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'g squared of x';
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
  var speech = 'g squared of, open paren, 2 x, plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function064
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction064 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>h</mi><mn>3</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'h cubed of x';
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
  var speech = 'h cubed of, open paren, 2 x, plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function066
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction066 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>g</mi><mn>4</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'the fourth power of, g of x';
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
  var speech = 'the fourth power of, g of, open paren, 2 x, plus 1, close' +
      ' paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function068
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction068 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>h</mi><mn>5</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'the fifth power of, h of x';
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
  var speech = 'the fifth power of, h of, open paren, 2 x, plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function070
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction070 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>g</mi><mi>n</mi></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'the nth power of, g of x';
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
  var speech = 'the nth power of, g of, open paren, 2 x, plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function072
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction072 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msub><mi>f</mi><mn>1</mn></msub><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f sub 1, of x';
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
  var speech = 'g sub 2, of, open paren, x cubed, close paren';
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
  var speech = 'h sub n, of, open paren, 3 x, minus 2, close paren';
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
  var speech = 'f sub 1, inverse of x';
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
  var speech = 'g sub 2, inverse of, open paren, 2 x, plus 1, close paren';
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
  var speech = 'h sub n, inverse of x';
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
  var speech = 'g sub 1, inverse of, g sub 2, of x';
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
  var speech = 'f sub 1, of, g sub 2, inverse of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function080
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction080 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mi>x</mi><mo>,' +
      '</mo><mi>y</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f of, open paren, x comma y, close paren';
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
  var speech = 'f of, open paren, x comma y comma z, close paren';
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
  var speech = 'f of, open paren, x plus 1, comma, 2 y, close paren';
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
  var speech = 'f of, open paren, 2 x, comma, x plus 1, comma, x squared,' +
      ' close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function084
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction084 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'f times x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function085
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction085 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>g</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'g times x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function086
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction086 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>h</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'h times x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function087
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction087 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mn>2</mn><mi>x' +
      '</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f times 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function088
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction088 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>g</mi><mrow><mo>(</mo><mrow><mo>−</mo><mn>2' +
      '</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g times negative 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function089
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction089 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>h</mi><mrow><mo>(</mo><mrow><mfrac><mn>1' +
      '</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'h times one half';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function090
 */
sre.ClearspeakFrenchFunctions.prototype.untestFunction090 = function() {
  var preference = 'Functions_None:Fraction_Over';
  var mathml = '<math><mrow><mi>h</mi><mrow><mo>(</mo><mrow><mfrac><mn>1' +
      '</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'h times, open paren, 1 over 2, close paren';
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
  var speech = 'f times, open paren, x plus 1, close paren, equals, f times' +
      ' x, plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function092
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction092 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>g</mi><mrow><mo>(</mo><mrow><mn>2</mn><mi>x' +
      '</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g times, open paren, 2 x, plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function093
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction093 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>g</mi><mrow><mo>(</mo><mrow><msup><mi>x' +
      '</mi><mn>2</mn></msup></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g times, open paren, x squared, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function094
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction094 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>f</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f to the negative 1 power, times x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function095
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction095 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>g</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'g to the negative 1 power, times x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function096
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction096 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>h</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'h to the negative 1 power, times x';
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
  var speech = 'f to the negative 1 power, times 2 x';
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
  var speech = 'g to the negative 1 power, times negative 2 x';
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
  var speech = 'f to the negative 1 power, times, open paren, 3 x, minus 1,' +
      ' close paren';
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
  var speech = 'g to the negative 1 power, times, open paren, x squared,' +
      ' close paren';
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
  var speech = 'h to the negative 1 power, times one half';
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
  var speech = 'h to the negative 1 power, times, open paren, 1 over 2,' +
      ' close paren';
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
  var speech = 'f to the negative 1 power, times, f times x';
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
  var speech = 'g to the negative 1 power, times, g times x';
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
  var speech = 'h to the negative 1 power, times, h times x';
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
  var speech = 'f to the negative 1 power, times, f times 2 x';
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
  var speech = 'g to the negative 1 power, times, g times negative 2 x';
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
  var speech = 'h to the negative 1 power, times, h times one half';
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
  var speech = 'h to the negative 1 power, times, open paren, h times, open' +
      ' paren, 1 over 2, close paren, close paren';
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
  var speech = 'f to the negative 1 power, times, open paren, f times, open' +
      ' paren, x plus 1, close paren, close paren, equals x plus 1';
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
  var speech = 'g to the negative 1 power, times, open paren, g times, open' +
      ' paren, 2 x, plus 1, close paren, close paren';
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
  var speech = 'g to the negative 1 power, times, open paren, g times, open' +
      ' paren, x squared, close paren, close paren';
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
  var speech = 'f times, open paren, f to the negative 1 power, times x,' +
      ' close paren';
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
  var speech = 'g times, open paren, g to the negative 1 power, times x,' +
      ' close paren';
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
  var speech = 'h times, open paren, h to the negative 1 power, times x,' +
      ' close paren';
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
  var speech = 'f times, open paren, f to the negative 1 power, times 2 x,' +
      ' close paren';
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
  var speech = 'g times, open paren, g to the negative 1 power, times' +
      ' negative 2 x, close paren';
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
  var speech = 'f times, open paren, f to the negative 1 power, times, open' +
      ' paren, 3 x, minus 1, close paren, close paren';
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
  var speech = 'g times, open paren, g to the negative 1 power, times, open' +
      ' paren, x squared, close paren, close paren';
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
  var speech = 'h times, open paren, h to the negative 1 power, times one' +
      ' half, close paren';
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
  var speech = 'h times, open paren, h to the negative 1 power, times, open' +
      ' paren, 1 over 2, close paren, close paren';
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
  var speech = 'f times, g times x';
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
  var speech = 'f times, open paren, g times, open paren, x plus 1, close' +
      ' paren, close paren';
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
  var speech = 'h times, g times x';
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
  var speech = 'h times, open paren, g times, open paren, the fraction with' +
      ' numerator x, and denominator x plus 1, close paren, close paren';
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
  var speech = 'open paren, f plus g, close paren, times x, equals, f times' +
      ' x, plus, g times x';
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
  var speech = 'open paren, f plus g, close paren, times, open paren, x' +
      ' plus 1, close paren, equals, f times, open paren, x plus 1, close' +
      ' paren, plus, g times, open paren, x plus 1, close paren';
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
  var speech = 'open paren, f times g, close paren, times x';
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
  var speech = 'open paren, f times g, close paren, times, open paren, 2 x,' +
      ' plus 5, close paren';
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
  var speech = 'open paren, f over g, close paren, times x, equals, the' +
      ' fraction with numerator, f times x, and denominator, g times x';
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
  var speech = 'open paren, f over g, close paren, times, open paren, 2 x,' +
      ' plus 5, close paren, equals, the fraction with numerator, f times,' +
      ' open paren, 2 x, plus 5, close paren, and denominator, g times,' +
      ' open paren, 2 x, plus 5, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function132
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction132 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mn>2</mn><mi>f</mi><mrow><mo>(</mo><mi>x</mi>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = '2, f times x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function133
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction133 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>c</mi><mi>f</mi><mrow><mo>(</mo><mi>x</mi>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'c, f times x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function134
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction134 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>2</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f squared times x';
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
  var speech = 'f squared times, open paren, 2 x, plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function136
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction136 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>3</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f cubed times x';
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
  var speech = 'f cubed times, open paren, 2 x, plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function138
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction138 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>4</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f to the fourth power, times x';
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
  var speech = 'f to the fourth power, times, open paren, 2 x, plus 1,' +
      ' close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function140
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction140 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>5</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f to the fifth power, times x';
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
  var speech = 'f to the fifth power, times, open paren, 2 x, plus 1, close' +
      ' paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function142
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction142 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>f</mi><mi>n</mi></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f to the nth power, times x';
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
  var speech = 'f to the nth power, times, open paren, 2 x, plus 1, close' +
      ' paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function144
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction144 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>g</mi><mn>2</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'g squared times x';
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
  var speech = 'g squared times, open paren, 2 x, plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function146
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction146 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>h</mi><mn>3</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'h cubed times x';
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
  var speech = 'h cubed times, open paren, 2 x, plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function148
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction148 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>g</mi><mn>4</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'g to the fourth power, times x';
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
  var speech = 'g to the fourth power, times, open paren, 2 x, plus 1,' +
      ' close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function150
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction150 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>h</mi><mn>5</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'h to the fifth power, times x';
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
  var speech = 'h to the fifth power, times, open paren, 2 x, plus 1, close' +
      ' paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function152
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction152 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>g</mi><mi>n</mi></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'g to the nth power, times x';
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
  var speech = 'g to the nth power, times, open paren, 2 x, plus 1, close' +
      ' paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function154
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction154 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msub><mi>f</mi><mn>1</mn></msub><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f sub 1, times x';
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
  var speech = 'g sub 2, times, open paren, x cubed, close paren';
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
  var speech = 'h sub n, times, open paren, 3 x, minus 2, close paren';
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
  var speech = 'f sub 1, to the negative 1 power, times x';
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
  var speech = 'g sub 2, to the negative 1 power, times, open paren, 2 x,' +
      ' plus 1, close paren';
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
  var speech = 'h sub n, to the negative 1 power, times x';
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
  var speech = 'g sub 1, to the negative 1 power, times, open paren, g sub' +
      ' 2, times x, close paren';
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
  var speech = 'f sub 1, times, open paren, g sub 2, to the negative 1' +
      ' power, times x, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function163
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction163 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mi>x</mi><mo>,' +
      '</mo><mi>y</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f times, open paren, x comma y, close paren';
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
  var speech = 'f times, open paren, x comma y comma z, close paren';
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
  var speech = 'f times, open paren, x plus 1, comma, 2 y, close paren';
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
  var speech = 'f times, open paren, 2 x, comma, x plus 1, comma, x' +
      ' squared, close paren';
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
  var speech = 'f inverse of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function012
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction012b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>g</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'g inverse of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function013
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction013b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>h</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'h inverse of x';
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
  var speech = 'f inverse of 2 x';
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
  var speech = 'g inverse of negative 2 x';
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
  var speech = 'f inverse of, open paren, 3 x, minus 1, close paren';
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
  var speech = 'g inverse of, open paren, x squared, close paren';
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
  var speech = 'h inverse of one half';
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
  var speech = 'h inverse of, open paren, 1 over 2, close paren';
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
  var speech = 'f inverse of, f of x';
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
  var speech = 'g inverse of, g of x';
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
  var speech = 'h inverse of, h of x';
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
  var speech = 'f inverse of, f of 2 x';
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
  var speech = 'g inverse of, g of negative 2 x';
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
  var speech = 'h inverse of, h of one half';
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
  var speech = 'h inverse of, open paren, h of, open paren, 1 over 2, close' +
      ' paren, close paren';
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
  var speech = 'f inverse of, open paren, f of, open paren, x plus 1, close' +
      ' paren, close paren, equals x plus 1';
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
  var speech = 'g inverse of, open paren, g of, open paren, 2 x, plus 1,' +
      ' close paren, close paren';
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
  var speech = 'g inverse of, open paren, g of, open paren, x squared,' +
      ' close paren, close paren';
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
  var speech = 'f of, f inverse of x';
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
  var speech = 'g of, g inverse of x';
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
  var speech = 'h of, h inverse of x';
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
  var speech = 'f of, f inverse of 2 x';
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
  var speech = 'g of, g inverse of negative 2 x';
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
  var speech = 'f of, open paren, f inverse of, open paren, 3 x, minus 1,' +
      ' close paren, close paren';
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
  var speech = 'g of, g inverse of, open paren, x squared, close paren';
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
  var speech = 'h of, h inverse of one half';
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
  var speech = 'h of, h inverse of, open paren, the fraction 1 over 2,' +
      ' close paren';
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
  var speech = 'f of, g of x';
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
  var speech = 'f of, open paren, g of, open paren, x plus 1, close paren,' +
      ' close paren';
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
  var speech = 'h of, g of x';
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
  var speech = 'h of, open paren, g of, open paren, the fraction with' +
      ' numerator x, and denominator x plus 1, close paren, close paren';
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
  var speech = 'open paren, f plus g, close paren, of x, equals f of x,' +
      ' plus g of x';
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
  var speech = 'open paren, f plus g, close paren, of, open paren, x plus' +
      ' 1, close paren, equals f of, open paren, x plus 1, close paren,' +
      ' plus g of, open paren, x plus 1, close paren';
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
  var speech = 'open paren, f times g, close paren, of x';
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
  var speech = 'open paren, f times g, close paren, of, open paren, 2 x,' +
      ' plus 5, close paren';
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
  var speech = 'open paren, f over g, close paren, of x, equals, f of x,' +
      ' over g of x';
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
  var speech = 'open paren, f over g, close paren, of, open paren, 2 x,' +
      ' plus 5, close paren, equals, the fraction with numerator f of, open' +
      ' paren, 2 x, plus 5, close paren, and denominator g of, open paren,' +
      ' 2 x, plus 5, close paren';
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
  var speech = 'open paren, f composed with g, close paren, of x, equals f' +
      ' of, g of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function050
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction050b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><mn>2</mn><mi>f</mi><mrow><mo>(</mo><mi>x</mi>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = '2 f of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function051
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction051b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><mi>c</mi><mi>f</mi><mrow><mo>(</mo><mi>x</mi>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'c f of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function052
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction052b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>2</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f squared of x';
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
  var speech = 'f squared of, open paren, 2 x, plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function054
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction054b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>3</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f cubed of x';
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
  var speech = 'f cubed of, open paren, 2 x, plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function056
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction056b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>4</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'the fourth power of, f of x';
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
  var speech = 'the fourth power of, f of, open paren, 2 x, plus 1, close' +
      ' paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function058
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction058b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>5</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'the fifth power of, f of x';
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
  var speech = 'the fifth power of, f of, open paren, 2 x, plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function060
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction060b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>f</mi><mi>n</mi></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'the nth power of, f of x';
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
  var speech = 'the nth power of, f of, open paren, 2 x, plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function062
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction062b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>g</mi><mn>2</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'g squared of x';
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
  var speech = 'g squared of, open paren, 2 x, plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function064
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction064b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>h</mi><mn>3</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'h cubed of x';
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
  var speech = 'h cubed of, open paren, 2 x, plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function066
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction066b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>g</mi><mn>4</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'the fourth power of, g of x';
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
  var speech = 'the fourth power of, g of, open paren, 2 x, plus 1, close' +
      ' paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function068
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction068b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>h</mi><mn>5</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'the fifth power of, h of x';
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
  var speech = 'the fifth power of, h of, open paren, 2 x, plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function070
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction070b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>g</mi><mi>n</mi></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'the nth power of, g of x';
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
  var speech = 'the nth power of, g of, open paren, 2 x, plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchFunctions Example Function072
 */
sre.ClearspeakFrenchFunctions.prototype.testFunction072b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msub><mi>f</mi><mn>1</mn></msub><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f sub 1, of x';
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
  var speech = 'g sub 2, of, open paren, x cubed, close paren';
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
  var speech = 'h sub n, of, open paren, 3 x, minus 2, close paren';
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
  var speech = 'f sub 1, inverse of x';
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
  var speech = 'g sub 2, inverse of, open paren, 2 x, plus 1, close paren';
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
  var speech = 'h sub n, inverse of x';
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
  var speech = 'g sub 1, inverse of, g sub 2, of x';
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
  var speech = 'f sub 1, of, g sub 2, inverse of x';
  this.executeRuleTest(mathml, speech, preference);
};



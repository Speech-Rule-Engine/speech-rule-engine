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


goog.provide('sre.ClearspeakEnglishFunctions');

goog.require('sre.ClearspeakEnglishRuleTest');



/**
* @constructor
* @extends {sre.ClearspeakEnglishRuleTest}
*/
sre.ClearspeakEnglishFunctions = function() {
  sre.ClearspeakEnglishFunctions.base(this, 'constructor');

  /**
   * @override
   */
  this.information = 'ClearspeakEnglishFunctions rule tests.';

};
goog.inherits(sre.ClearspeakEnglishFunctions, sre.ClearspeakEnglishRuleTest);



//
// Functions
//


/**
 * Testing ClearspeakEnglishFunctions Example Function001
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction001 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'f of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function002
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction002 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>g</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'g of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function003
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction003 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>h</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'h of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function004
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction004 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mn>2</mn><mi>x' +
      '</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f of 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function005
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction005 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>g</mi><mrow><mo>(</mo><mrow><mo>−</mo><mn>2' +
      '</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g of negative 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function006
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction006 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>h</mi><mrow><mo>(</mo><mrow><mfrac><mn>1' +
      '</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'h of one half';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function007
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction007 = function() {
  // TODO: This throws a test exception.
  // var preference = 'Functions_Auto:Fraction_Over';
  var preference = 'Fraction_Over';
  var mathml = '<math><mrow><mi>h</mi><mrow><mo>(</mo><mrow><mfrac><mn>1' +
      '</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'h of, open paren, 1 over 2, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function008
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction008 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mi>x</mi><mo>+' +
      '</mo><mn>1</mn></mrow><mo>)</mo></mrow><mo>=</mo><mi>f</mi><mrow>' +
      '<mo>(</mo><mi>x</mi><mo>)</mo></mrow><mo>+</mo><mn>1</mn></mrow></math>';
  var speech = 'f of, open paren, x plus 1, close paren, equals f of x, plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function009
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction009 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>g</mi><mrow><mo>(</mo><mrow><mn>2</mn><mi>x' +
      '</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g of, open paren, 2 x, plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function010
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction010 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>g</mi><mrow><mo>(</mo><mrow><msup><mi>x' +
      '</mi><mn>2</mn></msup></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g of, open paren, x squared, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function011
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction011 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>f</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f inverse of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function012
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction012 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>g</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'g inverse of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function013
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction013 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>h</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'h inverse of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function014
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction014 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>f</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mn>2</mn><mi>x</mi></mrow><mo>)' +
      '</mo></mrow></mrow></math>';
  var speech = 'f inverse of 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function015
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction015 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>g</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mo>−</mo><mn>2</mn><mi>x</mi>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g inverse of negative 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function016
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction016 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>f</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mn>3</mn><mi>x</mi><mo>−</mo>' +
      '<mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f inverse of, open paren, 3 x, minus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function017
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction017 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>g</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><msup><mi>x</mi><mn>2</mn>' +
      '</msup></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g inverse of, open paren, x squared, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function018
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction018 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>h</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mfrac><mn>1</mn><mn>2</mn>' +
      '</mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'h inverse of one half';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function019
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction019 = function() {
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
 * Testing ClearspeakEnglishFunctions Example Function020
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction020 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>f</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mi>f</mi><mrow><mo>(</mo><mi>x' +
      '</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f inverse of, f of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function021
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction021 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>g</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mi>g</mi><mrow><mo>(</mo><mi>x' +
      '</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g inverse of, g of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function022
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction022 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>h</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mi>h</mi><mrow><mo>(</mo><mi>x' +
      '</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'h inverse of, h of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function023
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction023 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>f</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mi>f</mi><mrow><mo>(</mo><mrow>' +
      '<mn>2</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'f inverse of, f of 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function024
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction024 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>g</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mi>g</mi><mrow><mo>(</mo><mrow>' +
      '<mo>−</mo><mn>2</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow><mo>)' +
      '</mo></mrow></mrow></math>';
  var speech = 'g inverse of, g of negative 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function025
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction025 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>h</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mi>h</mi><mrow><mo>(</mo><mrow>' +
      '<mfrac><mn>1</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'h inverse of, h of one half';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function026
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction026 = function() {
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
 * Testing ClearspeakEnglishFunctions Example Function027
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction027 = function() {
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
 * Testing ClearspeakEnglishFunctions Example Function028
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction028 = function() {
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
 * Testing ClearspeakEnglishFunctions Example Function029
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction029 = function() {
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
 * Testing ClearspeakEnglishFunctions Example Function030
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction030 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><msup><mi>f' +
      '</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mi>x' +
      '</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f of, f inverse of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function031
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction031 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>g</mi><mrow><mo>(</mo><mrow><msup><mi>g' +
      '</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mi>x' +
      '</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g of, g inverse of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function032
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction032 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>h</mi><mrow><mo>(</mo><mrow><msup><mi>h' +
      '</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mi>x' +
      '</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'h of, h inverse of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function033
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction033 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><msup><mi>f' +
      '</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow>' +
      '<mn>2</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'f of, f inverse of 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function034
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction034 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>g</mi><mrow><mo>(</mo><mrow><msup><mi>g' +
      '</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow>' +
      '<mo>−</mo><mn>2</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow><mo>)' +
      '</mo></mrow></mrow></math>';
  var speech = 'g of, g inverse of negative 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function035
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction035 = function() {
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
 * Testing ClearspeakEnglishFunctions Example Function036
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction036 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>g</mi><mrow><mo>(</mo><mrow><msup><mi>g' +
      '</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow>' +
      '<msup><mi>x</mi><mn>2</mn></msup></mrow><mo>)</mo></mrow></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'g of, g inverse of, open paren, x squared, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function037
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction037 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>h</mi><mrow><mo>(</mo><mrow><msup><mi>h' +
      '</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow>' +
      '<mfrac><mn>1</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'h of, h inverse of one half';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function038
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction038 = function() {
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
 * Testing ClearspeakEnglishFunctions Example Function039
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction039 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mi>g</mi>' +
      '<mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'f of, g of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function040
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction040 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mi>g</mi>' +
      '<mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)' +
      '</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f of, open paren, g of, open paren, x plus 1, close paren,' +
      ' close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function041
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction041 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>h</mi><mrow><mo>(</mo><mrow><mi>g</mi>' +
      '<mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'h of, g of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function042
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction042 = function() {
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
 * Testing ClearspeakEnglishFunctions Example Function043
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction043 = function() {
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
 * Testing ClearspeakEnglishFunctions Example Function044
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction044 = function() {
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
 * Testing ClearspeakEnglishFunctions Example Function045
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction045 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mi>f</mi><mo>⋅</mo><mi>g' +
      '</mi></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'open paren, f times g, close paren, of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function046
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction046 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mi>f</mi><mo>⋅</mo><mi>g' +
      '</mi></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mn>2</mn><mi>x' +
      '</mi><mo>+</mo><mn>5</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'open paren, f times g, close paren, of, open paren, 2 x,' +
      ' plus 5, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function047
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction047 = function() {
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
 * Testing ClearspeakEnglishFunctions Example Function048
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction048 = function() {
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
 * Testing ClearspeakEnglishFunctions Example Function049
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction049 = function() {
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
 * Testing ClearspeakEnglishFunctions Example Function050
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction050 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mn>2</mn><mi>f</mi><mrow><mo>(</mo><mi>x</mi>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = '2 f of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function051
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction051 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>c</mi><mi>f</mi><mrow><mo>(</mo><mi>x</mi>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'c f of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function052
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction052 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>2</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f squared of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function053
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction053 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>2</mn></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'f squared of, open paren, 2 x, plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function054
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction054 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>3</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f cubed of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function055
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction055 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>3</mn></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'f cubed of, open paren, 2 x, plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function056
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction056 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>4</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'the fourth power of, f of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function057
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction057 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>4</mn></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'the fourth power of, f of, open paren, 2 x, plus 1, close' +
      ' paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function058
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction058 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>5</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'the fifth power of, f of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function059
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction059 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>5</mn></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'the fifth power of, f of, open paren, 2 x, plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function060
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction060 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>f</mi><mi>n</mi></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'the nth power of, f of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function061
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction061 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>f</mi><mi>n</mi></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'the nth power of, f of, open paren, 2 x, plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function062
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction062 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>g</mi><mn>2</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'g squared of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function063
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction063 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>g</mi><mn>2</mn></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'g squared of, open paren, 2 x, plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function064
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction064 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>h</mi><mn>3</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'h cubed of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function065
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction065 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>h</mi><mn>3</mn></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'h cubed of, open paren, 2 x, plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function066
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction066 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>g</mi><mn>4</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'the fourth power of, g of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function067
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction067 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>g</mi><mn>4</mn></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'the fourth power of, g of, open paren, 2 x, plus 1, close' +
      ' paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function068
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction068 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>h</mi><mn>5</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'the fifth power of, h of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function069
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction069 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>h</mi><mn>5</mn></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'the fifth power of, h of, open paren, 2 x, plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function070
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction070 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>g</mi><mi>n</mi></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'the nth power of, g of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function071
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction071 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>g</mi><mi>n</mi></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'the nth power of, g of, open paren, 2 x, plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function072
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction072 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msub><mi>f</mi><mn>1</mn></msub><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f sub 1, of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function073
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction073 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msub><mi>g</mi><mn>2</mn></msub><mrow><mo>(' +
      '</mo><mrow><msup><mi>x</mi><mn>3</mn></msup></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'g sub 2, of, open paren, x cubed, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function074
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction074 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msub><mi>h</mi><mi>n</mi></msub><mrow><mo>(' +
      '</mo><mrow><mn>3</mn><mi>x</mi><mo>−</mo><mn>2</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'h sub n, of, open paren, 3 x, minus 2, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function075
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction075 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msubsup><mi>f</mi><mn>1</mn><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msubsup><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'f sub 1, inverse of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function076
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction076 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msubsup><mi>g</mi><mn>2</mn><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msubsup><mrow><mo>(</mo><mrow><mn>2</mn><mi>x' +
      '</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g sub 2, inverse of, open paren, 2 x, plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function077
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction077 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msubsup><mi>h</mi><mi>n</mi><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msubsup><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'h sub n, inverse of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function078
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction078 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msubsup><mi>g</mi><mn>1</mn><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msubsup><mrow><mo>(</mo><mrow><msub><mi>g</mi>' +
      '<mn>2</mn></msub><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'g sub 1, inverse of, g sub 2, of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function079
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction079 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msub><mi>f</mi><mn>1</mn></msub><mrow><mo>(' +
      '</mo><mrow><msubsup><mi>g</mi><mn>2</mn><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msubsup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'f sub 1, of, g sub 2, inverse of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function080
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction080 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mi>x</mi><mo>,' +
      '</mo><mi>y</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f of, open paren, x comma y, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function081
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction081 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mi>x</mi><mo>,' +
      '</mo><mi>y</mi><mo>,</mo><mi>z</mi></mrow><mo>)</mo></mrow></mrow>' +
      '</math>';
  var speech = 'f of, open paren, x comma y comma z, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function082
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction082 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mi>x</mi><mo>+' +
      '</mo><mn>1</mn><mo>,</mo><mn>2</mn><mi>y</mi></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'f of, open paren, x plus 1, comma, 2 y, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function083
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction083 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mn>2</mn><mi>x' +
      '</mi><mo>,</mo><mi>x</mi><mo>+</mo><mn>1</mn><mo>,</mo><msup><mi>x' +
      '</mi><mn>2</mn></msup></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f of, open paren, 2 x, comma, x plus 1, comma, x squared,' +
      ' close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function084
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction084 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'f times x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function085
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction085 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>g</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'g times x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function086
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction086 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>h</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'h times x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function087
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction087 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mn>2</mn><mi>x' +
      '</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f times 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function088
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction088 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>g</mi><mrow><mo>(</mo><mrow><mo>−</mo><mn>2' +
      '</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g times negative 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function089
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction089 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>h</mi><mrow><mo>(</mo><mrow><mfrac><mn>1' +
      '</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'h times one half';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function090
 */
sre.ClearspeakEnglishFunctions.prototype.untestFunction090 = function() {
  var preference = 'Functions_None:Fraction_Over';
  var mathml = '<math><mrow><mi>h</mi><mrow><mo>(</mo><mrow><mfrac><mn>1' +
      '</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'h times, open paren, 1 over 2, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function091
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction091 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mi>x</mi><mo>+' +
      '</mo><mn>1</mn></mrow><mo>)</mo></mrow><mo>=</mo><mi>f</mi><mrow>' +
      '<mo>(</mo><mi>x</mi><mo>)</mo></mrow><mo>+</mo><mn>1</mn></mrow></math>';
  var speech = 'f times, open paren, x plus 1, close paren, equals, f times' +
      ' x, plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function092
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction092 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>g</mi><mrow><mo>(</mo><mrow><mn>2</mn><mi>x' +
      '</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g times, open paren, 2 x, plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function093
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction093 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>g</mi><mrow><mo>(</mo><mrow><msup><mi>x' +
      '</mi><mn>2</mn></msup></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g times, open paren, x squared, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function094
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction094 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>f</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f to the negative 1 power, times x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function095
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction095 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>g</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'g to the negative 1 power, times x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function096
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction096 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>h</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'h to the negative 1 power, times x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function097
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction097 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>f</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mn>2</mn><mi>x</mi></mrow><mo>)' +
      '</mo></mrow></mrow></math>';
  var speech = 'f to the negative 1 power, times 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function098
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction098 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>g</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mo>−</mo><mn>2</mn><mi>x</mi>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g to the negative 1 power, times negative 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function099
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction099 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>f</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mn>3</mn><mi>x</mi><mo>−</mo>' +
      '<mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f to the negative 1 power, times, open paren, 3 x, minus 1,' +
      ' close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function100
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction100 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>g</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><msup><mi>x</mi><mn>2</mn>' +
      '</msup></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g to the negative 1 power, times, open paren, x squared,' +
      ' close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function101
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction101 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>h</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mfrac><mn>1</mn><mn>2</mn>' +
      '</mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'h to the negative 1 power, times one half';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function102
 */
sre.ClearspeakEnglishFunctions.prototype.untestFunction102 = function() {
  var preference = 'Functions_None:Fraction_Over';
  var mathml = '<math><mrow><msup><mi>h</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mfrac><mn>1</mn><mn>2</mn>' +
      '</mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'h to the negative 1 power, times, open paren, 1 over 2,' +
      ' close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function103
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction103 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>f</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mi>f</mi><mrow><mo>(</mo><mi>x' +
      '</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f to the negative 1 power, times, f times x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function104
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction104 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>g</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mi>g</mi><mrow><mo>(</mo><mi>x' +
      '</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g to the negative 1 power, times, g times x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function105
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction105 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>h</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mi>h</mi><mrow><mo>(</mo><mi>x' +
      '</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'h to the negative 1 power, times, h times x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function106
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction106 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>f</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mi>f</mi><mrow><mo>(</mo><mrow>' +
      '<mn>2</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'f to the negative 1 power, times, f times 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function107
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction107 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>g</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mi>g</mi><mrow><mo>(</mo><mrow>' +
      '<mo>−</mo><mn>2</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow><mo>)' +
      '</mo></mrow></mrow></math>';
  var speech = 'g to the negative 1 power, times, g times negative 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function108
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction108 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>h</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mi>h</mi><mrow><mo>(</mo><mrow>' +
      '<mfrac><mn>1</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'h to the negative 1 power, times, h times one half';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function109
 */
sre.ClearspeakEnglishFunctions.prototype.untestFunction109 = function() {
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
 * Testing ClearspeakEnglishFunctions Example Function110
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction110 = function() {
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
 * Testing ClearspeakEnglishFunctions Example Function111
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction111 = function() {
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
 * Testing ClearspeakEnglishFunctions Example Function112
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction112 = function() {
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
 * Testing ClearspeakEnglishFunctions Example Function113
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction113 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><msup><mi>f' +
      '</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mi>x' +
      '</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f times, open paren, f to the negative 1 power, times x,' +
      ' close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function114
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction114 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>g</mi><mrow><mo>(</mo><mrow><msup><mi>g' +
      '</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mi>x' +
      '</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g times, open paren, g to the negative 1 power, times x,' +
      ' close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function115
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction115 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>h</mi><mrow><mo>(</mo><mrow><msup><mi>h' +
      '</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mi>x' +
      '</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'h times, open paren, h to the negative 1 power, times x,' +
      ' close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function116
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction116 = function() {
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
 * Testing ClearspeakEnglishFunctions Example Function117
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction117 = function() {
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
 * Testing ClearspeakEnglishFunctions Example Function118
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction118 = function() {
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
 * Testing ClearspeakEnglishFunctions Example Function119
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction119 = function() {
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
 * Testing ClearspeakEnglishFunctions Example Function120
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction120 = function() {
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
 * Testing ClearspeakEnglishFunctions Example Function121
 */
sre.ClearspeakEnglishFunctions.prototype.untestFunction121 = function() {
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
 * Testing ClearspeakEnglishFunctions Example Function122
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction122 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mi>g</mi>' +
      '<mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'f times, g times x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function123
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction123 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mi>g</mi>' +
      '<mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)' +
      '</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f times, open paren, g times, open paren, x plus 1, close' +
      ' paren, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function124
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction124 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>h</mi><mrow><mo>(</mo><mrow><mi>g</mi>' +
      '<mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'h times, g times x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function125
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction125 = function() {
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
 * Testing ClearspeakEnglishFunctions Example Function126
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction126 = function() {
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
 * Testing ClearspeakEnglishFunctions Example Function127
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction127 = function() {
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
 * Testing ClearspeakEnglishFunctions Example Function128
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction128 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mi>f</mi><mo>⋅</mo><mi>g' +
      '</mi></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'open paren, f times g, close paren, times x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function129
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction129 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mi>f</mi><mo>⋅</mo><mi>g' +
      '</mi></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mn>2</mn><mi>x' +
      '</mi><mo>+</mo><mn>5</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'open paren, f times g, close paren, times, open paren, 2 x,' +
      ' plus 5, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function130
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction130 = function() {
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
 * Testing ClearspeakEnglishFunctions Example Function131
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction131 = function() {
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
 * Testing ClearspeakEnglishFunctions Example Function132
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction132 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mn>2</mn><mi>f</mi><mrow><mo>(</mo><mi>x</mi>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = '2, f times x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function133
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction133 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>c</mi><mi>f</mi><mrow><mo>(</mo><mi>x</mi>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'c, f times x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function134
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction134 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>2</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f squared times x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function135
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction135 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>2</mn></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'f squared times, open paren, 2 x, plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function136
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction136 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>3</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f cubed times x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function137
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction137 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>3</mn></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'f cubed times, open paren, 2 x, plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function138
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction138 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>4</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f to the fourth power, times x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function139
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction139 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>4</mn></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'f to the fourth power, times, open paren, 2 x, plus 1,' +
      ' close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function140
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction140 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>5</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f to the fifth power, times x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function141
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction141 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>5</mn></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'f to the fifth power, times, open paren, 2 x, plus 1, close' +
      ' paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function142
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction142 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>f</mi><mi>n</mi></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f to the nth power, times x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function143
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction143 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>f</mi><mi>n</mi></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'f to the nth power, times, open paren, 2 x, plus 1, close' +
      ' paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function144
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction144 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>g</mi><mn>2</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'g squared times x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function145
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction145 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>g</mi><mn>2</mn></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'g squared times, open paren, 2 x, plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function146
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction146 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>h</mi><mn>3</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'h cubed times x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function147
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction147 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>h</mi><mn>3</mn></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'h cubed times, open paren, 2 x, plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function148
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction148 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>g</mi><mn>4</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'g to the fourth power, times x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function149
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction149 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>g</mi><mn>4</mn></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'g to the fourth power, times, open paren, 2 x, plus 1,' +
      ' close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function150
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction150 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>h</mi><mn>5</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'h to the fifth power, times x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function151
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction151 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>h</mi><mn>5</mn></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'h to the fifth power, times, open paren, 2 x, plus 1, close' +
      ' paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function152
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction152 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>g</mi><mi>n</mi></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'g to the nth power, times x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function153
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction153 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>g</mi><mi>n</mi></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'g to the nth power, times, open paren, 2 x, plus 1, close' +
      ' paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function154
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction154 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msub><mi>f</mi><mn>1</mn></msub><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f sub 1, times x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function156
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction156 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msub><mi>g</mi><mn>2</mn></msub><mrow><mo>(' +
      '</mo><mrow><msup><mi>x</mi><mn>3</mn></msup></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'g sub 2, times, open paren, x cubed, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function157
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction157 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msub><mi>h</mi><mi>n</mi></msub><mrow><mo>(' +
      '</mo><mrow><mn>3</mn><mi>x</mi><mo>−</mo><mn>2</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'h sub n, times, open paren, 3 x, minus 2, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function158
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction158 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msubsup><mi>f</mi><mn>1</mn><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msubsup><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'f sub 1, to the negative 1 power, times x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function159
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction159 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msubsup><mi>g</mi><mn>2</mn><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msubsup><mrow><mo>(</mo><mrow><mn>2</mn><mi>x' +
      '</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g sub 2, to the negative 1 power, times, open paren, 2 x,' +
      ' plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function160
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction160 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msubsup><mi>h</mi><mi>n</mi><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msubsup><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'h sub n, to the negative 1 power, times x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function161
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction161 = function() {
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
 * Testing ClearspeakEnglishFunctions Example Function162
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction162 = function() {
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
 * Testing ClearspeakEnglishFunctions Example Function163
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction163 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mi>x</mi><mo>,' +
      '</mo><mi>y</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f times, open paren, x comma y, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function164
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction164 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mi>x</mi><mo>,' +
      '</mo><mi>y</mi><mo>,</mo><mi>z</mi></mrow><mo>)</mo></mrow></mrow>' +
      '</math>';
  var speech = 'f times, open paren, x comma y comma z, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function165
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction165 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mi>x</mi><mo>+' +
      '</mo><mn>1</mn><mo>,</mo><mn>2</mn><mi>y</mi></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'f times, open paren, x plus 1, comma, 2 y, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFunctions Example Function166
 */
sre.ClearspeakEnglishFunctions.prototype.testFunction166 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mn>2</mn><mi>x' +
      '</mi><mo>,</mo><mi>x</mi><mo>+</mo><mn>1</mn><mo>,</mo><msup><mi>x' +
      '</mi><mn>2</mn></msup></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f times, open paren, 2 x, comma, x plus 1, comma, x' +
      ' squared, close paren';
  this.executeRuleTest(mathml, speech, preference);
};

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


goog.provide('sre.ClearspeakFunctions');

goog.require('sre.ClearspeakRuleTest');



/**
* @constructor
* @extends {sre.ClearspeakRuleTest}
*/
sre.ClearspeakFunctions = function() {
sre.ClearspeakFunctions.base(this, 'constructor');

/**
* @override
*/
this.information = 'ClearspeakFunctions rule tests.';

};
goog.inherits(sre.ClearspeakFunctions, sre.ClearspeakRuleTest);



//
// Functions 
//


/**
 * Testing ClearspeakFunctions Example Function001
 */
sre.ClearspeakFunctions.prototype.untestFunction001 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function002
 */
sre.ClearspeakFunctions.prototype.untestFunction002 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>g</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'g of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function003
 */
sre.ClearspeakFunctions.prototype.untestFunction003 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>h</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'h of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function004
 */
sre.ClearspeakFunctions.prototype.untestFunction004 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mn>2</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f of 2x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function005
 */
sre.ClearspeakFunctions.prototype.untestFunction005 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>g</mi><mrow><mo>(</mo><mrow><mo>−</mo><mn>2</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g of negative 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function006
 */
sre.ClearspeakFunctions.prototype.untestFunction006 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>h</mi><mrow><mo>(</mo><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'h of one half';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function007
 */
sre.ClearspeakFunctions.prototype.untestFunction007 = function() {
  var preference = 'Functions_Auto(Fraction Preference Over is also set)';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mi>h</mi><mrow><mo>(</mo><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'h of, open paren, one over 2, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function008
 */
sre.ClearspeakFunctions.prototype.untestFunction008 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow><mo>=</mo><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow><mo>+</mo><mn>1</mn></mrow></math>';
  var speech = 'f of, open paren, x plus 1, close paren, equals f of x, plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function009
 */
sre.ClearspeakFunctions.prototype.untestFunction009 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>g</mi><mrow><mo>(</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g of, open paren, 2x plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function010
 */
sre.ClearspeakFunctions.prototype.untestFunction010 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>g</mi><mrow><mo>(</mo><mrow><msup><mi>x</mi><mn>2</mn></msup></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g of, open paren, x squared, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function011
 */
sre.ClearspeakFunctions.prototype.untestFunction011 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>f</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f inverse of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function012
 */
sre.ClearspeakFunctions.prototype.untestFunction012 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>g</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'g inverse of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function013
 */
sre.ClearspeakFunctions.prototype.untestFunction013 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>h</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'h inverse of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function014
 */
sre.ClearspeakFunctions.prototype.untestFunction014 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>f</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mn>2</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f inverse of 2x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function015
 */
sre.ClearspeakFunctions.prototype.untestFunction015 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>g</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mo>−</mo><mn>2</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g inverse of negative 2x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function016
 */
sre.ClearspeakFunctions.prototype.untestFunction016 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>f</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mn>3</mn><mi>x</mi><mo>−</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f inverse of, open paren, 3x minus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function017
 */
sre.ClearspeakFunctions.prototype.untestFunction017 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>g</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><msup><mi>x</mi><mn>2</mn></msup></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g inverse of, open paren, x squared, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function018
 */
sre.ClearspeakFunctions.prototype.untestFunction018 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>h</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'h inverse of one half';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function019
 */
sre.ClearspeakFunctions.prototype.untestFunction019 = function() {
  var preference = 'Functions_Auto(Fraction Preference Over is also set)';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><msup><mi>h</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'h inverse of, open paren, 1 over 2, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function020
 */
sre.ClearspeakFunctions.prototype.untestFunction020 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>f</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f inverse of, f of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function021
 */
sre.ClearspeakFunctions.prototype.untestFunction021 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>g</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>g</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g inverse of, g of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function022
 */
sre.ClearspeakFunctions.prototype.untestFunction022 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>h</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>h</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'h inverse of, h of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function023
 */
sre.ClearspeakFunctions.prototype.untestFunction023 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>f</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mn>2</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f inverse of, f of 2x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function024
 */
sre.ClearspeakFunctions.prototype.untestFunction024 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>g</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>g</mi><mrow><mo>(</mo><mrow><mo>−</mo><mn>2</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g inverse of, g of negative 2x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function025
 */
sre.ClearspeakFunctions.prototype.untestFunction025 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>h</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>h</mi><mrow><mo>(</mo><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'h inverse of, h of one half';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function026
 */
sre.ClearspeakFunctions.prototype.untestFunction026 = function() {
  var preference = 'Functions_Auto(Fraction Preference Over is also set)';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><msup><mi>h</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>h</mi><mrow><mo>(</mo><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'h inverse of, open paren, h of, open paren, one over 2, close paren, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function027
 */
sre.ClearspeakFunctions.prototype.untestFunction027 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>f</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow><mo>=</mo><mi>x</mi><mo>+</mo><mn>1</mn></mrow></math>';
  var speech = 'f inverse of, open paren, f of, open paren, x plus 1, close paren, close paren, equals x, plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function028
 */
sre.ClearspeakFunctions.prototype.untestFunction028 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>g</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>g</mi><mrow><mo>(</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g inverse of, open paren, g of, open paren, 2x plus 1, close paren, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function029
 */
sre.ClearspeakFunctions.prototype.untestFunction029 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>g</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>g</mi><mrow><mo>(</mo><mrow><msup><mi>x</mi><mn>2</mn></msup></mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g inverse of, open paren, g of, open paren, x squared, close paren, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function030
 */
sre.ClearspeakFunctions.prototype.untestFunction030 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><msup><mi>f</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f of, f inverse of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function031
 */
sre.ClearspeakFunctions.prototype.untestFunction031 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>g</mi><mrow><mo>(</mo><mrow><msup><mi>g</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g of, g inverse of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function032
 */
sre.ClearspeakFunctions.prototype.untestFunction032 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>h</mi><mrow><mo>(</mo><mrow><msup><mi>h</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'h of, h inverse of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function033
 */
sre.ClearspeakFunctions.prototype.untestFunction033 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><msup><mi>f</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mn>2</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'h of, h inverse of 2x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function034
 */
sre.ClearspeakFunctions.prototype.untestFunction034 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>g</mi><mrow><mo>(</mo><mrow><msup><mi>g</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mo>−</mo><mn>2</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'h of, h inverse of negative 2x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function035
 */
sre.ClearspeakFunctions.prototype.untestFunction035 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><msup><mi>f</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mn>3</mn><mi>x</mi><mo>−</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f of, open paren, f inverse of, open paren, 3x minus 1, close paren, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function036
 */
sre.ClearspeakFunctions.prototype.untestFunction036 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>g</mi><mrow><mo>(</mo><mrow><msup><mi>g</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><msup><mi>x</mi><mn>2</mn></msup></mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g of, g inverse of, open paren, x squared, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function037
 */
sre.ClearspeakFunctions.prototype.untestFunction037 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>h</mi><mrow><mo>(</mo><mrow><msup><mi>h</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'h of, h inverse of one half';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function038
 */
sre.ClearspeakFunctions.prototype.untestFunction038 = function() {
  var preference = 'Functions_Auto(Fraction Preference FracOver is also set)';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mi>h</mi><mrow><mo>(</mo><mrow><msup><mi>h</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'h of, h inverse of, open paren, the fraction 1 over 2, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function039
 */
sre.ClearspeakFunctions.prototype.untestFunction039 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mi>g</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f of, g of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function040
 */
sre.ClearspeakFunctions.prototype.untestFunction040 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mi>g</mi><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f of, open paren, g of, open paren, x plus 1, close paren, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function041
 */
sre.ClearspeakFunctions.prototype.untestFunction041 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>h</mi><mrow><mo>(</mo><mrow><mi>g</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'h of, g of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function042
 */
sre.ClearspeakFunctions.prototype.untestFunction042 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>h</mi><mrow><mo>(</mo><mrow><mi>g</mi><mrow><mo>(</mo><mrow><mfrac><mi>x</mi><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow></mfrac></mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'h of, open paren, g of the fraction with numerator x, and denominator x plus 1, close paren, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function043
 */
sre.ClearspeakFunctions.prototype.untestFunction043 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mi>f</mi><mo>+</mo><mi>g</mi></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow><mo>=</mo><mi>f</mi><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo><mo>+</mo><mi>g</mi><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo></mrow></math>';
  var speech = 'Open paren, f plus g, close, paren, of x, equals f of x, plus, g of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function044
 */
sre.ClearspeakFunctions.prototype.untestFunction044 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mi>f</mi><mo>+</mo><mi>g</mi></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow><mo>=</mo><mi>f</mi><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow><mo>+</mo><mi>g</mi><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'Open paren, f plus g, close paren, of, open paren, x plus 1, close paren equals f of, open paren, x plus 1, close paren, plus, g of, open paren, x plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function045
 */
sre.ClearspeakFunctions.prototype.untestFunction045 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mi>f</mi><mo>⋅</mo><mi>g</mi></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'Open paren, f times g, close paren, of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function046
 */
sre.ClearspeakFunctions.prototype.untestFunction046 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mi>f</mi><mo>⋅</mo><mi>g</mi></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>5</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'Open paren, f times g, close paren, of, open paren, 2x plus 5, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function047
 */
sre.ClearspeakFunctions.prototype.untestFunction047 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mfrac><mi>f</mi><mi>g</mi></mfrac></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow><mo>=</mo><mfrac><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mrow><mi>g</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></mfrac></mrow></math>';
  var speech = 'Open paren, f over g, close paren, of x, equals f of x over g of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function048
 */
sre.ClearspeakFunctions.prototype.untestFunction048 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mfrac><mi>f</mi><mi>g</mi></mfrac></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>5</mn></mrow><mo>)</mo></mrow><mo>=</mo><mfrac><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>5</mn></mrow><mo>)</mo></mrow></mrow><mrow><mi>g</mi><mrow><mo>(</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>5</mn></mrow><mo>)</mo></mrow></mrow></mfrac></mrow></math>';
  var speech = 'Open paren, f over g, close paren, of, open paren, 2x plus 5, close paren equals the fraction with numerator f of, open paren, 2x plus 5, close paren, and denominator, g of, open paren, 2x plus 5, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function049
 */
sre.ClearspeakFunctions.prototype.untestFunction049 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mi>f</mi><mo>∘</mo><mi>g</mi></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow><mo>=</mo><mi>f</mi><mrow><mo>(</mo><mrow><mi>g</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'Open paren, f composed with g, close paren, of x, equals, f of g of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function050
 */
sre.ClearspeakFunctions.prototype.untestFunction050 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mn>2</mn><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = '2 f of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function051
 */
sre.ClearspeakFunctions.prototype.untestFunction051 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>c</mi><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'c f of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function052
 */
sre.ClearspeakFunctions.prototype.untestFunction052 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>2</mn></msup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f squared of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function053
 */
sre.ClearspeakFunctions.prototype.untestFunction053 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>2</mn></msup><mrow><mo>(</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f squared of, open paren, 2 x plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function054
 */
sre.ClearspeakFunctions.prototype.untestFunction054 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>3</mn></msup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f cubed of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function055
 */
sre.ClearspeakFunctions.prototype.untestFunction055 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>3</mn></msup><mrow><mo>(</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f cubed of, open paren, 2x plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function056
 */
sre.ClearspeakFunctions.prototype.untestFunction056 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>4</mn></msup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'The fourth power of, f of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function057
 */
sre.ClearspeakFunctions.prototype.untestFunction057 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>4</mn></msup><mrow><mo>(</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'The fourth power of, f of, open paren, 2x plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function058
 */
sre.ClearspeakFunctions.prototype.untestFunction058 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>5</mn></msup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'The fifth power of, f of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function059
 */
sre.ClearspeakFunctions.prototype.untestFunction059 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>5</mn></msup><mrow><mo>(</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'The fifth power of, f of, open paren, 2x plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function060
 */
sre.ClearspeakFunctions.prototype.untestFunction060 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>f</mi><mi>n</mi></msup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'The nth power of, f of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function061
 */
sre.ClearspeakFunctions.prototype.untestFunction061 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>f</mi><mi>n</mi></msup><mrow><mo>(</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'The nth power of ,f of, open paren, 2 x plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function062
 */
sre.ClearspeakFunctions.prototype.untestFunction062 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>g</mi><mn>2</mn></msup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'g squared of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function063
 */
sre.ClearspeakFunctions.prototype.untestFunction063 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>g</mi><mn>2</mn></msup><mrow><mo>(</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g squared of, open paren, 2 x plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function064
 */
sre.ClearspeakFunctions.prototype.untestFunction064 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>h</mi><mn>3</mn></msup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'h cubed of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function065
 */
sre.ClearspeakFunctions.prototype.untestFunction065 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>h</mi><mn>3</mn></msup><mrow><mo>(</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'h cubed of, open paren, 2x plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function066
 */
sre.ClearspeakFunctions.prototype.untestFunction066 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>g</mi><mn>4</mn></msup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'The fourth power of g of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function067
 */
sre.ClearspeakFunctions.prototype.untestFunction067 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>g</mi><mn>4</mn></msup><mrow><mo>(</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'The fourth power of, g of, open paren, 2x plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function068
 */
sre.ClearspeakFunctions.prototype.untestFunction068 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>h</mi><mn>5</mn></msup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'The fifth power of, h of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function069
 */
sre.ClearspeakFunctions.prototype.untestFunction069 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>h</mi><mn>5</mn></msup><mrow><mo>(</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'The fifth power of, h of, open paren, 2x plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function070
 */
sre.ClearspeakFunctions.prototype.untestFunction070 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>g</mi><mi>n</mi></msup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'The nth power of, g of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function071
 */
sre.ClearspeakFunctions.prototype.untestFunction071 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>g</mi><mi>n</mi></msup><mrow><mo>(</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'The nth power of, g of, open paren, 2 x plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function072
 */
sre.ClearspeakFunctions.prototype.untestFunction072 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msub><mi>f</mi><mn>1</mn></msub><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f sub 1 of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function073
 */
sre.ClearspeakFunctions.prototype.untestFunction073 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msub><mi>g</mi><mn>2</mn></msub><mrow><mo>(</mo><mrow><msup><mi>x</mi><mn>3</mn></msup></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g sub 2 of, open paren, x cubed, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function074
 */
sre.ClearspeakFunctions.prototype.untestFunction074 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msub><mi>h</mi><mi>n</mi></msub><mrow><mo>(</mo><mrow><mn>3</mn><mi>x</mi><mo>−</mo><mn>2</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'h sub n of, open paren 3x minus 2, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function075
 */
sre.ClearspeakFunctions.prototype.untestFunction075 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msubsup><mi>f</mi><mn>1</mn><mrow><mo>−</mo><mn>1</mn></mrow></msubsup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f sub 1 inverse of, x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function076
 */
sre.ClearspeakFunctions.prototype.untestFunction076 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msubsup><mi>g</mi><mn>2</mn><mrow><mo>−</mo><mn>1</mn></mrow></msubsup><mrow><mo>(</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g sub 2 inverse of, 2 x plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function077
 */
sre.ClearspeakFunctions.prototype.untestFunction077 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msubsup><mi>h</mi><mi>n</mi><mrow><mo>−</mo><mn>1</mn></mrow></msubsup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'h sub n inverse of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function078
 */
sre.ClearspeakFunctions.prototype.untestFunction078 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msubsup><mi>g</mi><mn>1</mn><mrow><mo>−</mo><mn>1</mn></mrow></msubsup><mrow><mo>(</mo><mrow><msub><mi>g</mi><mn>2</mn></msub><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g sub 1 inverse of, g sub 2 of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function079
 */
sre.ClearspeakFunctions.prototype.untestFunction079 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msub><mi>f</mi><mn>1</mn></msub><mrow><mo>(</mo><mrow><msubsup><mi>g</mi><mn>2</mn><mrow><mo>−</mo><mn>1</mn></mrow></msubsup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f sub 1 of, g sub 2 inverse of, x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function080
 */
sre.ClearspeakFunctions.prototype.untestFunction080 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mi>x</mi><mo>,</mo><mi>y</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f of, open paren, x comma y, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function081
 */
sre.ClearspeakFunctions.prototype.untestFunction081 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mi>x</mi><mo>,</mo><mi>y</mi><mo>,</mo><mi>z</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f of, open paren, x comma y comma z, close';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function082
 */
sre.ClearspeakFunctions.prototype.untestFunction082 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn><mo>,</mo><mn>2</mn><mi>y</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f of, open paren, x plus 1, comma, 2y, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function083
 */
sre.ClearspeakFunctions.prototype.untestFunction083 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mn>2</mn><mi>x</mi><mo>,</mo><mi>x</mi><mo>+</mo><mn>1</mn><mo>,</mo><msup><mi>x</mi><mn>2</mn></msup></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f of, open paren, 2x, comma, x plus 1, comma, x squared, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function084
 */
sre.ClearspeakFunctions.prototype.untestFunction084 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f times x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function085
 */
sre.ClearspeakFunctions.prototype.untestFunction085 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>g</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'g times x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function086
 */
sre.ClearspeakFunctions.prototype.untestFunction086 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>h</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'h times x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function087
 */
sre.ClearspeakFunctions.prototype.untestFunction087 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mn>2</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f times 2x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function088
 */
sre.ClearspeakFunctions.prototype.untestFunction088 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>g</mi><mrow><mo>(</mo><mrow><mo>−</mo><mn>2</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g times negative 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function089
 */
sre.ClearspeakFunctions.prototype.untestFunction089 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>h</mi><mrow><mo>(</mo><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'h times one half';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function090
 */
sre.ClearspeakFunctions.prototype.untestFunction090 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>h</mi><mrow><mo>(</mo><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'h times, open paren, one over 2, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function091
 */
sre.ClearspeakFunctions.prototype.untestFunction091 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow><mo>=</mo><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow><mo>+</mo><mn>1</mn></mrow></math>';
  var speech = 'f times, open paren, x plus 1, close paren, equals f times x, plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function092
 */
sre.ClearspeakFunctions.prototype.untestFunction092 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>g</mi><mrow><mo>(</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g times, open paren, 2x plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function093
 */
sre.ClearspeakFunctions.prototype.untestFunction093 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>g</mi><mrow><mo>(</mo><mrow><msup><mi>x</mi><mn>2</mn></msup></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g times, open paren, x squared, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function094
 */
sre.ClearspeakFunctions.prototype.untestFunction094 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>f</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f to the negative 1 power, times x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function095
 */
sre.ClearspeakFunctions.prototype.untestFunction095 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>g</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'g to the negative 1 power, times x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function096
 */
sre.ClearspeakFunctions.prototype.untestFunction096 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>h</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'h to the negative 1 power, times x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function097
 */
sre.ClearspeakFunctions.prototype.untestFunction097 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>f</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mn>2</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f to the negative 1 power, times 2x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function098
 */
sre.ClearspeakFunctions.prototype.untestFunction098 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>g</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mo>−</mo><mn>2</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g to the negative 1 power, times negative 2x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function099
 */
sre.ClearspeakFunctions.prototype.untestFunction099 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>f</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mn>3</mn><mi>x</mi><mo>−</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f to the negative 1 power, times open paren, 3x minus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function100
 */
sre.ClearspeakFunctions.prototype.untestFunction100 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>g</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><msup><mi>x</mi><mn>2</mn></msup></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g to the negative 1 power, times open paren, x squared, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function101
 */
sre.ClearspeakFunctions.prototype.untestFunction101 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>h</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'h to the negative 1 power, times one half';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function102
 */
sre.ClearspeakFunctions.prototype.untestFunction102 = function() {
  var preference = 'Functions_None(Fraction Preference Over is also set)';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><msup><mi>h</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'h to the negative 1 power, times, open paren, 1 over 2, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function103
 */
sre.ClearspeakFunctions.prototype.untestFunction103 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>f</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f to the negative 1 power, times, f, times x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function104
 */
sre.ClearspeakFunctions.prototype.untestFunction104 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>g</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>g</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g to the negative 1 power, times, g times x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function105
 */
sre.ClearspeakFunctions.prototype.untestFunction105 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>h</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>h</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'h to the negative 1 power, times, h times x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function106
 */
sre.ClearspeakFunctions.prototype.untestFunction106 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>f</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mn>2</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f to the negative 1 power, times, f times 2x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function107
 */
sre.ClearspeakFunctions.prototype.untestFunction107 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>g</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>g</mi><mrow><mo>(</mo><mrow><mo>−</mo><mn>2</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g to the negative 1 power, times, g times negative 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function108
 */
sre.ClearspeakFunctions.prototype.untestFunction108 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>h</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>h</mi><mrow><mo>(</mo><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'h to the negative 1 power, times, h times one half';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function109
 */
sre.ClearspeakFunctions.prototype.untestFunction109 = function() {
  var preference = 'Functions_None(Fraction Preference Over is also set)';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><msup><mi>h</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>h</mi><mrow><mo>(</mo><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'h to the negative 1 power, times, open paren, h times, open paren, one over 2, close paren, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function110
 */
sre.ClearspeakFunctions.prototype.untestFunction110 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>f</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow><mo>=</mo><mi>x</mi><mo>+</mo><mn>1</mn></mrow></math>';
  var speech = 'f to the negative 1 power, times, open paren, f times, open paren, x plus 1, close paren, close paren, equals x plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function111
 */
sre.ClearspeakFunctions.prototype.untestFunction111 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>g</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>g</mi><mrow><mo>(</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g to the negative 1 power, times, open paren, g times, open paren, 2x plus 1, close paren, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function112
 */
sre.ClearspeakFunctions.prototype.untestFunction112 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>g</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>g</mi><mrow><mo>(</mo><mrow><msup><mi>x</mi><mn>2</mn></msup></mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g to the negative 1 power, times, open paren, g times, open paren, x squared, close paren, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function113
 */
sre.ClearspeakFunctions.prototype.untestFunction113 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><msup><mi>f</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f times, open paren, f to the negative 1 power, times x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function114
 */
sre.ClearspeakFunctions.prototype.untestFunction114 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>g</mi><mrow><mo>(</mo><mrow><msup><mi>g</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g times, open paren, g to the negative 1 power, times x, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function115
 */
sre.ClearspeakFunctions.prototype.untestFunction115 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>h</mi><mrow><mo>(</mo><mrow><msup><mi>h</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'h times, open paren, h to the negative 1 power, times x, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function116
 */
sre.ClearspeakFunctions.prototype.untestFunction116 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><msup><mi>f</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mn>2</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f times, open paren, f to the negative 1 power, times 2x, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function117
 */
sre.ClearspeakFunctions.prototype.untestFunction117 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>g</mi><mrow><mo>(</mo><mrow><msup><mi>g</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mo>−</mo><mn>2</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g times, open paren, g to the negative 1 power, times negative 2x, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function118
 */
sre.ClearspeakFunctions.prototype.untestFunction118 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><msup><mi>f</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mn>3</mn><mi>x</mi><mo>−</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f times, open paren, f to the negative 1 power, times open paren, 3x minus 1, close paren, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function119
 */
sre.ClearspeakFunctions.prototype.untestFunction119 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>g</mi><mrow><mo>(</mo><mrow><msup><mi>g</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><msup><mi>x</mi><mn>2</mn></msup></mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g times, open paren, g to the negative 1 power, times, open paren, x squared, close paren, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function120
 */
sre.ClearspeakFunctions.prototype.untestFunction120 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>h</mi><mrow><mo>(</mo><mrow><msup><mi>h</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'h times, open paren, H to the negative 1 power, times one half, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function121
 */
sre.ClearspeakFunctions.prototype.untestFunction121 = function() {
  var preference = 'Functions_None(Fraction Preference Over is also set)';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mi>h</mi><mrow><mo>(</mo><mrow><msup><mi>h</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'h times, open paren, H to the negative 1 power, times, open paren, 1 over 2, close paren, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function122
 */
sre.ClearspeakFunctions.prototype.untestFunction122 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mi>g</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f times, g times x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function123
 */
sre.ClearspeakFunctions.prototype.untestFunction123 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mi>g</mi><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f times, open paren, g times, open paren, x plus 1, close paren, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function124
 */
sre.ClearspeakFunctions.prototype.untestFunction124 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>h</mi><mrow><mo>(</mo><mrow><mi>g</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'h times g times x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function125
 */
sre.ClearspeakFunctions.prototype.untestFunction125 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>h</mi><mrow><mo>(</mo><mrow><mi>g</mi><mrow><mo>(</mo><mrow><mfrac><mi>x</mi><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow></mfrac></mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'h times open paren, g times, open paren, the fraction with numerator x, and denominator x plus 1, close paren, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function126
 */
sre.ClearspeakFunctions.prototype.untestFunction126 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mi>f</mi><mo>+</mo><mi>g</mi></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow><mo>=</mo><mi>f</mi><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo><mo>+</mo><mi>g</mi><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo></mrow></math>';
  var speech = 'Open paren, f plus g, close, paren, times x equals f times x, plus, g times x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function127
 */
sre.ClearspeakFunctions.prototype.untestFunction127 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mi>f</mi><mo>+</mo><mi>g</mi></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow><mo>=</mo><mi>f</mi><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow><mo>+</mo><mi>g</mi><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'Open paren, f plus g, close paren, times, open paren, x plus 1, close paren equals f times, open paren, x plus 1, close paren, plus, g times, open paren, x plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function128
 */
sre.ClearspeakFunctions.prototype.untestFunction128 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mi>f</mi><mo>⋅</mo><mi>g</mi></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'Open paren, f times g, close paren, times x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function129
 */
sre.ClearspeakFunctions.prototype.untestFunction129 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mi>f</mi><mo>⋅</mo><mi>g</mi></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>5</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'Open paren, f times g, close paren, times, open paren, 2x plus 5, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function130
 */
sre.ClearspeakFunctions.prototype.untestFunction130 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mfrac><mi>f</mi><mi>g</mi></mfrac></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow><mo>=</mo><mfrac><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mrow><mi>g</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></mfrac></mrow></math>';
  var speech = 'Open paren, f over g, close paren, times x equals the fraction with numerator f times x, and denominator g times x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function131
 */
sre.ClearspeakFunctions.prototype.untestFunction131 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mfrac><mi>f</mi><mi>g</mi></mfrac></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>5</mn></mrow><mo>)</mo></mrow><mo>=</mo><mfrac><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>5</mn></mrow><mo>)</mo></mrow></mrow><mrow><mi>g</mi><mrow><mo>(</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>5</mn></mrow><mo>)</mo></mrow></mrow></mfrac></mrow></math>';
  var speech = 'Open paren, f over g, close paren, times, open paren, 2x plus 5, close paren equals the fraction with numerator f times, open paren, 2x plus 5, close paren, and denominator, g times, open paren, 2x plus 5, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function132
 */
sre.ClearspeakFunctions.prototype.untestFunction132 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mn>2</mn><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = '2 f times x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function133
 */
sre.ClearspeakFunctions.prototype.untestFunction133 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>c</mi><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'c f times x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function134
 */
sre.ClearspeakFunctions.prototype.untestFunction134 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>2</mn></msup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f squared times x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function135
 */
sre.ClearspeakFunctions.prototype.untestFunction135 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>2</mn></msup><mrow><mo>(</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f squared times, open paren, 2 x plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function136
 */
sre.ClearspeakFunctions.prototype.untestFunction136 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>3</mn></msup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f cubed times x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function137
 */
sre.ClearspeakFunctions.prototype.untestFunction137 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>3</mn></msup><mrow><mo>(</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f cubed times, open paren, 2x plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function138
 */
sre.ClearspeakFunctions.prototype.untestFunction138 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>4</mn></msup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f to the fourth power, times x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function139
 */
sre.ClearspeakFunctions.prototype.untestFunction139 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>4</mn></msup><mrow><mo>(</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f to the fourth power, times, open paren, 2x plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function140
 */
sre.ClearspeakFunctions.prototype.untestFunction140 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>5</mn></msup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f to the fifth power, times x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function141
 */
sre.ClearspeakFunctions.prototype.untestFunction141 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>5</mn></msup><mrow><mo>(</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f to the fifth power, times, open paren, 2x plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function142
 */
sre.ClearspeakFunctions.prototype.untestFunction142 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>f</mi><mi>n</mi></msup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f to the nth power, times x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function143
 */
sre.ClearspeakFunctions.prototype.untestFunction143 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>f</mi><mi>n</mi></msup><mrow><mo>(</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f to the nth power, times, open paren, 2 x plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function144
 */
sre.ClearspeakFunctions.prototype.untestFunction144 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>g</mi><mn>2</mn></msup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'g squared timesx';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function145
 */
sre.ClearspeakFunctions.prototype.untestFunction145 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>g</mi><mn>2</mn></msup><mrow><mo>(</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g squared times open paren, 2 x plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function146
 */
sre.ClearspeakFunctions.prototype.untestFunction146 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>h</mi><mn>3</mn></msup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'h cubed times x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function147
 */
sre.ClearspeakFunctions.prototype.untestFunction147 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>h</mi><mn>3</mn></msup><mrow><mo>(</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'h cubed times, open paren, 2x plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function148
 */
sre.ClearspeakFunctions.prototype.untestFunction148 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>g</mi><mn>4</mn></msup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'g to the fourth power, times x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function149
 */
sre.ClearspeakFunctions.prototype.untestFunction149 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>g</mi><mn>4</mn></msup><mrow><mo>(</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g to the fourth power times, open paren, 2x plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function150
 */
sre.ClearspeakFunctions.prototype.untestFunction150 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>h</mi><mn>5</mn></msup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'h to the fifth power, times x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function151
 */
sre.ClearspeakFunctions.prototype.untestFunction151 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>h</mi><mn>5</mn></msup><mrow><mo>(</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'h to the fifth power, times, open paren, 2x plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function152
 */
sre.ClearspeakFunctions.prototype.untestFunction152 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>g</mi><mi>n</mi></msup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'g to the nth power, times x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function153
 */
sre.ClearspeakFunctions.prototype.untestFunction153 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>g</mi><mi>n</mi></msup><mrow><mo>(</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g to the nth power, times, open paren, 2 x plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function154
 */
sre.ClearspeakFunctions.prototype.untestFunction154 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msub><mi>f</mi><mn>1</mn></msub><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f sub 1 times x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function156
 */
sre.ClearspeakFunctions.prototype.untestFunction156 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msub><mi>g</mi><mn>2</mn></msub><mrow><mo>(</mo><mrow><msup><mi>x</mi><mn>3</mn></msup></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g sub 2 times, open paren, x cubed, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function157
 */
sre.ClearspeakFunctions.prototype.untestFunction157 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msub><mi>h</mi><mi>n</mi></msub><mrow><mo>(</mo><mrow><mn>3</mn><mi>x</mi><mo>−</mo><mn>2</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'h sub n times, open paren 3x minus 2, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function158
 */
sre.ClearspeakFunctions.prototype.untestFunction158 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msubsup><mi>f</mi><mn>1</mn><mrow><mo>−</mo><mn>1</mn></mrow></msubsup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f sub 1, to the negative 1 power, times x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function159
 */
sre.ClearspeakFunctions.prototype.untestFunction159 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msubsup><mi>g</mi><mn>2</mn><mrow><mo>−</mo><mn>1</mn></mrow></msubsup><mrow><mo>(</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g sub 2, to the negative 1 power, times, open paren, 2x plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function160
 */
sre.ClearspeakFunctions.prototype.untestFunction160 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msubsup><mi>h</mi><mi>n</mi><mrow><mo>−</mo><mn>1</mn></mrow></msubsup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'h sub n, to the negative 1 power, times x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function161
 */
sre.ClearspeakFunctions.prototype.untestFunction161 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msubsup><mi>g</mi><mn>1</mn><mrow><mo>−</mo><mn>1</mn></mrow></msubsup><mrow><mo>(</mo><mrow><msub><mi>g</mi><mn>2</mn></msub><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g sub 1, to the negative 1 power, times, open paren, g sub 2, times x, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function162
 */
sre.ClearspeakFunctions.prototype.untestFunction162 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msub><mi>f</mi><mn>1</mn></msub><mrow><mo>(</mo><mrow><msubsup><mi>g</mi><mn>2</mn><mrow><mo>−</mo><mn>1</mn></mrow></msubsup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f sub 1, times, open paren, g sub 2, to the negative 1 power, times x, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function163
 */
sre.ClearspeakFunctions.prototype.untestFunction163 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mi>x</mi><mo>,</mo><mtext></mtext><mtext></mtext><mi>y</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f times, open paren, x comma y, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function164
 */
sre.ClearspeakFunctions.prototype.untestFunction164 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mi>x</mi><mo>,</mo><mtext></mtext><mtext></mtext><mi>y</mi><mo>,</mo><mtext></mtext><mtext></mtext><mi>z</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f times, open paren, x comma y comma z, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function165
 */
sre.ClearspeakFunctions.prototype.untestFunction165 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn><mo>,</mo><mtext></mtext><mtext></mtext><mn>2</mn><mi>y</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f times, open paren, x plus 1, comma, 2y, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFunctions Example Function166
 */
sre.ClearspeakFunctions.prototype.untestFunction166 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mn>2</mn><mi>x</mi><mo>,</mo><mtext></mtext><mtext></mtext><mi>x</mi><mo>+</mo><mn>1</mn><mo>,</mo><mtext></mtext><mtext></mtext><msup><mi>x</mi><mn>2</mn></msup></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f times, open paren, 2x, comma, x plus 1, comma, x squared, close paren';
  this.executeRuleTest(mathml, speech, preference);
};
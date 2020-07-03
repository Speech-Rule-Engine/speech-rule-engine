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


goog.provide('sre.ClearspeakGermanFunctions');

goog.require('sre.ClearspeakGermanRuleTest');



/**
* @constructor
* @extends {sre.ClearspeakGermanRuleTest}
*/
sre.ClearspeakGermanFunctions = function() {
  sre.ClearspeakGermanFunctions.base(this, 'constructor');

  /**
* @override
  */
  this.information = 'ClearspeakGermanFunctions rule tests.';

};
goog.inherits(sre.ClearspeakGermanFunctions, sre.ClearspeakGermanRuleTest);



//
// Functions
//


/**
 * Testing ClearspeakGermanFunctions Example Function001
 */
sre.ClearspeakGermanFunctions.prototype.testFunction001 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'f von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function002
 */
sre.ClearspeakGermanFunctions.prototype.testFunction002 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>g</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'g von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function003
 */
sre.ClearspeakGermanFunctions.prototype.testFunction003 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>h</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'h von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function004
 */
sre.ClearspeakGermanFunctions.prototype.testFunction004 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mn>2</mn><mi>x' +
      '</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f von 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function005
 */
sre.ClearspeakGermanFunctions.prototype.testFunction005 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>g</mi><mrow><mo>(</mo><mrow><mo>−</mo><mn>2' +
      '</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g von minus 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function006
 */
sre.ClearspeakGermanFunctions.prototype.testFunction006 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>h</mi><mrow><mo>(</mo><mrow><mfrac><mn>1' +
      '</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'h von ein halb';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function007
 */
sre.ClearspeakGermanFunctions.prototype.testFunction007 = function() {
  // TODO: This throws a test exception.
  // var preference = 'Functions_Auto:Fraction_Over';
  var preference = 'Fraction_Over';
  var mathml = '<math><mrow><mi>h</mi><mrow><mo>(</mo><mrow><mfrac><mn>1' +
      '</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'h von, Klammer auf, 1 geteilt durch 2, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function008
 */
sre.ClearspeakGermanFunctions.prototype.testFunction008 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mi>x</mi><mo>+' +
      '</mo><mn>1</mn></mrow><mo>)</mo></mrow><mo>=</mo><mi>f</mi><mrow>' +
      '<mo>(</mo><mi>x</mi><mo>)</mo></mrow><mo>+</mo><mn>1</mn></mrow></math>';
  var speech = 'f von, Klammer auf, x plus 1, Klammer zu, ist gleich f von x, plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function009
 */
sre.ClearspeakGermanFunctions.prototype.testFunction009 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>g</mi><mrow><mo>(</mo><mrow><mn>2</mn><mi>x' +
      '</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g von, Klammer auf, 2 x, plus 1, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function010
 */
sre.ClearspeakGermanFunctions.prototype.testFunction010 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>g</mi><mrow><mo>(</mo><mrow><msup><mi>x' +
      '</mi><mn>2</mn></msup></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g von, Klammer auf, x Quadrat, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function011
 */
sre.ClearspeakGermanFunctions.prototype.testFunction011 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>f</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f invers von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function012
 */
sre.ClearspeakGermanFunctions.prototype.testFunction012 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>g</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'g invers von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function013
 */
sre.ClearspeakGermanFunctions.prototype.testFunction013 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>h</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'h invers von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function014
 */
sre.ClearspeakGermanFunctions.prototype.testFunction014 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>f</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mn>2</mn><mi>x</mi></mrow><mo>)' +
      '</mo></mrow></mrow></math>';
  var speech = 'f invers von 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function015
 */
sre.ClearspeakGermanFunctions.prototype.testFunction015 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>g</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mo>−</mo><mn>2</mn><mi>x</mi>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g invers von minus 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function016
 */
sre.ClearspeakGermanFunctions.prototype.testFunction016 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>f</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mn>3</mn><mi>x</mi><mo>−</mo>' +
      '<mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f invers von, Klammer auf, 3 x, minus 1, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function017
 */
sre.ClearspeakGermanFunctions.prototype.testFunction017 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>g</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><msup><mi>x</mi><mn>2</mn>' +
      '</msup></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g invers von, Klammer auf, x Quadrat, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function018
 */
sre.ClearspeakGermanFunctions.prototype.testFunction018 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>h</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mfrac><mn>1</mn><mn>2</mn>' +
      '</mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'h invers von ein halb';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function019
 */
sre.ClearspeakGermanFunctions.prototype.testFunction019 = function() {
  // TODO: This throws a test exception.
  // var preference = 'Functions_Auto:Fraction_Over';
  var preference = 'Fraction_Over';
  var mathml = '<math><mrow><msup><mi>h</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mfrac><mn>1</mn><mn>2</mn>' +
      '</mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'h invers von, Klammer auf, 1 geteilt durch 2, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function020
 */
sre.ClearspeakGermanFunctions.prototype.testFunction020 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>f</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mi>f</mi><mrow><mo>(</mo><mi>x' +
      '</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f invers von, f von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function021
 */
sre.ClearspeakGermanFunctions.prototype.testFunction021 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>g</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mi>g</mi><mrow><mo>(</mo><mi>x' +
      '</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g invers von, g von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function022
 */
sre.ClearspeakGermanFunctions.prototype.testFunction022 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>h</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mi>h</mi><mrow><mo>(</mo><mi>x' +
      '</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'h invers von, h von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function023
 */
sre.ClearspeakGermanFunctions.prototype.testFunction023 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>f</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mi>f</mi><mrow><mo>(</mo><mrow>' +
      '<mn>2</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'f invers von, f von 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function024
 */
sre.ClearspeakGermanFunctions.prototype.testFunction024 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>g</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mi>g</mi><mrow><mo>(</mo><mrow>' +
      '<mo>−</mo><mn>2</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow><mo>)' +
      '</mo></mrow></mrow></math>';
  var speech = 'g invers von, g von minus 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function025
 */
sre.ClearspeakGermanFunctions.prototype.testFunction025 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>h</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mi>h</mi><mrow><mo>(</mo><mrow>' +
      '<mfrac><mn>1</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'h invers von, h von ein halb';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function026
 */
sre.ClearspeakGermanFunctions.prototype.testFunction026 = function() {
  // TODO: This throws a test exception.
  // var preference = 'Functions_Auto:Fraction_Over';
  var preference = 'Fraction_Over';
  var mathml = '<math><mrow><msup><mi>h</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mi>h</mi><mrow><mo>(</mo><mrow>' +
      '<mfrac><mn>1</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'h invers von, Klammer auf, h von, Klammer auf, 1 geteilt durch 2, Klammer zu, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function027
 */
sre.ClearspeakGermanFunctions.prototype.testFunction027 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>f</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mi>f</mi><mrow><mo>(</mo><mrow>' +
      '<mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow><mo>)' +
      '</mo></mrow><mo>=</mo><mi>x</mi><mo>+</mo><mn>1</mn></mrow></math>';
  var speech = 'f invers von, Klammer auf, f von, Klammer auf, x plus 1, Klammer zu, Klammer zu, ist gleich x plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function028
 */
sre.ClearspeakGermanFunctions.prototype.testFunction028 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>g</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mi>g</mi><mrow><mo>(</mo><mrow>' +
      '<mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g invers von, Klammer auf, g von, Klammer auf, 2 x, plus 1, Klammer zu, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function029
 */
sre.ClearspeakGermanFunctions.prototype.testFunction029 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>g</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mi>g</mi><mrow><mo>(</mo><mrow>' +
      '<msup><mi>x</mi><mn>2</mn></msup></mrow><mo>)</mo></mrow></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'g invers von, Klammer auf, g von, Klammer auf, x Quadrat, Klammer zu, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function030
 */
sre.ClearspeakGermanFunctions.prototype.testFunction030 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><msup><mi>f' +
      '</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mi>x' +
      '</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f von, f invers von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function031
 */
sre.ClearspeakGermanFunctions.prototype.testFunction031 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>g</mi><mrow><mo>(</mo><mrow><msup><mi>g' +
      '</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mi>x' +
      '</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g von, g invers von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function032
 */
sre.ClearspeakGermanFunctions.prototype.testFunction032 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>h</mi><mrow><mo>(</mo><mrow><msup><mi>h' +
      '</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mi>x' +
      '</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'h von, h invers von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function033
 */
sre.ClearspeakGermanFunctions.prototype.testFunction033 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><msup><mi>f' +
      '</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow>' +
      '<mn>2</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'f von, f invers von 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function034
 */
sre.ClearspeakGermanFunctions.prototype.testFunction034 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>g</mi><mrow><mo>(</mo><mrow><msup><mi>g' +
      '</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow>' +
      '<mo>−</mo><mn>2</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow><mo>)' +
      '</mo></mrow></mrow></math>';
  var speech = 'g von, g invers von minus 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function035
 */
sre.ClearspeakGermanFunctions.prototype.testFunction035 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><msup><mi>f' +
      '</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow>' +
      '<mn>3</mn><mi>x</mi><mo>−</mo><mn>1</mn></mrow><mo>)</mo></mrow>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f von, Klammer auf, f invers von, Klammer auf, 3 x, minus 1, Klammer zu, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function036
 */
sre.ClearspeakGermanFunctions.prototype.testFunction036 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>g</mi><mrow><mo>(</mo><mrow><msup><mi>g' +
      '</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow>' +
      '<msup><mi>x</mi><mn>2</mn></msup></mrow><mo>)</mo></mrow></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'g von, g invers von, Klammer auf, x Quadrat, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function037
 */
sre.ClearspeakGermanFunctions.prototype.testFunction037 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>h</mi><mrow><mo>(</mo><mrow><msup><mi>h' +
      '</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow>' +
      '<mfrac><mn>1</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'h von, h invers von ein halb';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function038
 */
sre.ClearspeakGermanFunctions.prototype.testFunction038 = function() {
  // TODO: This throws a test exception.
  // var preference = 'Functions_Auto:Fraction_FracOver';
  var preference = 'Fraction_FracOver';
  var mathml = '<math><mrow><mi>h</mi><mrow><mo>(</mo><mrow><msup><mi>h' +
      '</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow>' +
      '<mfrac><mn>1</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'h von, h invers von, Klammer auf, Bruch 1 geteilt durch 2, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function039
 */
sre.ClearspeakGermanFunctions.prototype.testFunction039 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mi>g</mi>' +
      '<mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'f von, g von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function040
 */
sre.ClearspeakGermanFunctions.prototype.testFunction040 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mi>g</mi>' +
      '<mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)' +
      '</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f von, Klammer auf, g von, Klammer auf, x plus 1, Klammer zu, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function041
 */
sre.ClearspeakGermanFunctions.prototype.testFunction041 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>h</mi><mrow><mo>(</mo><mrow><mi>g</mi>' +
      '<mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'h von, g von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function042
 */
sre.ClearspeakGermanFunctions.prototype.testFunction042 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>h</mi><mrow><mo>(</mo><mrow><mi>g</mi>' +
      '<mrow><mo>(</mo><mrow><mfrac><mi>x</mi><mrow><mi>x</mi><mo>+</mo>' +
      '<mn>1</mn></mrow></mfrac></mrow><mo>)</mo></mrow></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'h von, Klammer auf, g von, Klammer auf, Bruch mit Zähler x, und Nenner x plus 1, Klammer zu, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function043
 */
sre.ClearspeakGermanFunctions.prototype.testFunction043 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mi>f</mi><mo>+</mo><mi>g' +
      '</mi></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow><mo>=</mo><mi>f</mi><mo stretchy="false">(</mo><mi>x</mi><mo' +
      ' stretchy="false">)</mo><mo>+</mo><mi>g</mi><mo stretchy="false">(' +
      '</mo><mi>x</mi><mo stretchy="false">)</mo></mrow></math>';
  var speech = 'Klammer auf, f plus g, Klammer zu, von x, ist gleich f von x, plus g von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function044
 */
sre.ClearspeakGermanFunctions.prototype.testFunction044 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mi>f</mi><mo>+</mo><mi>g' +
      '</mi></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mi>x</mi><mo>+' +
      '</mo><mn>1</mn></mrow><mo>)</mo></mrow><mo>=</mo><mi>f</mi><mrow>' +
      '<mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow><mo>+</mo><mi>g</mi><mrow><mo>(</mo><mrow><mi>x</mi><mo>+' +
      '</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'Klammer auf, f plus g, Klammer zu, von, Klammer auf, x plus 1, Klammer zu, ist gleich f von, Klammer auf, x plus 1, Klammer zu, plus g von, Klammer auf, x plus 1, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function045
 */
sre.ClearspeakGermanFunctions.prototype.testFunction045 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mi>f</mi><mo>⋅</mo><mi>g' +
      '</mi></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'Klammer auf, f mal g, Klammer zu, von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function046
 */
sre.ClearspeakGermanFunctions.prototype.testFunction046 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mi>f</mi><mo>⋅</mo><mi>g' +
      '</mi></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mn>2</mn><mi>x' +
      '</mi><mo>+</mo><mn>5</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'Klammer auf, f mal g, Klammer zu, von, Klammer auf, 2 x, plus 5, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function047
 */
sre.ClearspeakGermanFunctions.prototype.testFunction047 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mfrac><mi>f</mi><mi>g' +
      '</mi></mfrac></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mi>x</mi><mo>)' +
      '</mo></mrow><mo>=</mo><mfrac><mrow><mi>f</mi><mrow><mo>(</mo><mi>x' +
      '</mi><mo>)</mo></mrow></mrow><mrow><mi>g</mi><mrow><mo>(</mo><mi>x' +
      '</mi><mo>)</mo></mrow></mrow></mfrac></mrow></math>';
  var speech = 'Klammer auf, f geteilt durch g, Klammer zu, von x, ist gleich, f von x, geteilt durch g von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function048
 */
sre.ClearspeakGermanFunctions.prototype.testFunction048 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mfrac><mi>f</mi><mi>g' +
      '</mi></mfrac></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mn>2' +
      '</mn><mi>x</mi><mo>+</mo><mn>5</mn></mrow><mo>)</mo></mrow><mo>=' +
      '</mo><mfrac><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mn>2</mn><mi>x' +
      '</mi><mo>+</mo><mn>5</mn></mrow><mo>)</mo></mrow></mrow><mrow><mi>g' +
      '</mi><mrow><mo>(</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>5</mn>' +
      '</mrow><mo>)</mo></mrow></mrow></mfrac></mrow></math>';
  var speech = 'Klammer auf, f geteilt durch g, Klammer zu, von, Klammer auf, 2 x, plus 5, Klammer zu, ist gleich, Bruch mit Zähler f von, Klammer auf, 2 x, plus 5, Klammer zu, und Nenner g von, Klammer auf, 2 x, plus 5, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function049
 */
sre.ClearspeakGermanFunctions.prototype.testFunction049 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mi>f</mi><mo>∘</mo><mi>g' +
      '</mi></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow><mo>=</mo><mi>f</mi><mrow><mo>(</mo><mrow><mi>g</mi><mrow>' +
      '<mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow>' +
      '</math>';
  var speech = 'Klammer auf, f verknüpft mit g, Klammer zu, von x, ist gleich f von, g von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function050
 */
sre.ClearspeakGermanFunctions.prototype.testFunction050 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mn>2</mn><mi>f</mi><mrow><mo>(</mo><mi>x</mi>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = '2 f von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function051
 */
sre.ClearspeakGermanFunctions.prototype.testFunction051 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>c</mi><mi>f</mi><mrow><mo>(</mo><mi>x</mi>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'c f von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function052
 */
sre.ClearspeakGermanFunctions.prototype.testFunction052 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>2</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f Quadrat von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function053
 */
sre.ClearspeakGermanFunctions.prototype.testFunction053 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>2</mn></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'f Quadrat von, Klammer auf, 2 x, plus 1, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function054
 */
sre.ClearspeakGermanFunctions.prototype.testFunction054 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>3</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f Kubik von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function055
 */
sre.ClearspeakGermanFunctions.prototype.testFunction055 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>3</mn></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'f Kubik von, Klammer auf, 2 x, plus 1, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function056
 */
sre.ClearspeakGermanFunctions.prototype.testFunction056 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>4</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f hoch 4, von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function057
 */
sre.ClearspeakGermanFunctions.prototype.testFunction057 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>4</mn></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'f hoch 4, von, Klammer auf, 2 x, plus 1, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function058
 */
sre.ClearspeakGermanFunctions.prototype.testFunction058 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>5</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f hoch 5, von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function059
 */
sre.ClearspeakGermanFunctions.prototype.testFunction059 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>5</mn></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'f hoch 5, von, Klammer auf, 2 x, plus 1, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function060
 */
sre.ClearspeakGermanFunctions.prototype.testFunction060 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>f</mi><mi>n</mi></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f hoch n, von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function061
 */
sre.ClearspeakGermanFunctions.prototype.testFunction061 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>f</mi><mi>n</mi></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'f hoch n, von, Klammer auf, 2 x, plus 1, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function062
 */
sre.ClearspeakGermanFunctions.prototype.testFunction062 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>g</mi><mn>2</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'g Quadrat von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function063
 */
sre.ClearspeakGermanFunctions.prototype.testFunction063 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>g</mi><mn>2</mn></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'g Quadrat von, Klammer auf, 2 x, plus 1, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function064
 */
sre.ClearspeakGermanFunctions.prototype.testFunction064 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>h</mi><mn>3</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'h Kubik von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function065
 */
sre.ClearspeakGermanFunctions.prototype.testFunction065 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>h</mi><mn>3</mn></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'h Kubik von, Klammer auf, 2 x, plus 1, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function066
 */
sre.ClearspeakGermanFunctions.prototype.testFunction066 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>g</mi><mn>4</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'g hoch 4, von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function067
 */
sre.ClearspeakGermanFunctions.prototype.testFunction067 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>g</mi><mn>4</mn></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'g hoch 4, von, Klammer auf, 2 x, plus 1, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function068
 */
sre.ClearspeakGermanFunctions.prototype.testFunction068 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>h</mi><mn>5</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'h hoch 5, von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function069
 */
sre.ClearspeakGermanFunctions.prototype.testFunction069 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>h</mi><mn>5</mn></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'h hoch 5, von, Klammer auf, 2 x, plus 1, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function070
 */
sre.ClearspeakGermanFunctions.prototype.testFunction070 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>g</mi><mi>n</mi></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'g hoch n, von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function071
 */
sre.ClearspeakGermanFunctions.prototype.testFunction071 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msup><mi>g</mi><mi>n</mi></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'g hoch n, von, Klammer auf, 2 x, plus 1, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function072
 */
sre.ClearspeakGermanFunctions.prototype.testFunction072 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msub><mi>f</mi><mn>1</mn></msub><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f Index 1, von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function073
 */
sre.ClearspeakGermanFunctions.prototype.testFunction073 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msub><mi>g</mi><mn>2</mn></msub><mrow><mo>(' +
      '</mo><mrow><msup><mi>x</mi><mn>3</mn></msup></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'g Index 2, von, Klammer auf, x Kubik, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function074
 */
sre.ClearspeakGermanFunctions.prototype.testFunction074 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msub><mi>h</mi><mi>n</mi></msub><mrow><mo>(' +
      '</mo><mrow><mn>3</mn><mi>x</mi><mo>−</mo><mn>2</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'h Index n, von, Klammer auf, 3 x, minus 2, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function075
 */
sre.ClearspeakGermanFunctions.prototype.testFunction075 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msubsup><mi>f</mi><mn>1</mn><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msubsup><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'f Index 1, invers von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function076
 */
sre.ClearspeakGermanFunctions.prototype.testFunction076 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msubsup><mi>g</mi><mn>2</mn><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msubsup><mrow><mo>(</mo><mrow><mn>2</mn><mi>x' +
      '</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g Index 2, invers von, Klammer auf, 2 x, plus 1, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function077
 */
sre.ClearspeakGermanFunctions.prototype.testFunction077 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msubsup><mi>h</mi><mi>n</mi><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msubsup><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'h Index n, invers von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function078
 */
sre.ClearspeakGermanFunctions.prototype.testFunction078 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msubsup><mi>g</mi><mn>1</mn><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msubsup><mrow><mo>(</mo><mrow><msub><mi>g</mi>' +
      '<mn>2</mn></msub><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'g Index 1, invers von, g Index 2, von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function079
 */
sre.ClearspeakGermanFunctions.prototype.testFunction079 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><msub><mi>f</mi><mn>1</mn></msub><mrow><mo>(' +
      '</mo><mrow><msubsup><mi>g</mi><mn>2</mn><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msubsup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'f Index 1, von, g Index 2, invers von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function080
 */
sre.ClearspeakGermanFunctions.prototype.testFunction080 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mi>x</mi><mo>,' +
      '</mo><mi>y</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f von, Klammer auf, x Komma y, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function081
 */
sre.ClearspeakGermanFunctions.prototype.testFunction081 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mi>x</mi><mo>,' +
      '</mo><mi>y</mi><mo>,</mo><mi>z</mi></mrow><mo>)</mo></mrow></mrow>' +
      '</math>';
  var speech = 'f von, Klammer auf, x Komma y Komma z, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function082
 */
sre.ClearspeakGermanFunctions.prototype.testFunction082 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mi>x</mi><mo>+' +
      '</mo><mn>1</mn><mo>,</mo><mn>2</mn><mi>y</mi></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'f von, Klammer auf, x plus 1, Komma, 2 y, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function083
 */
sre.ClearspeakGermanFunctions.prototype.testFunction083 = function() {
  var preference = 'Functions_Auto';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mn>2</mn><mi>x' +
      '</mi><mo>,</mo><mi>x</mi><mo>+</mo><mn>1</mn><mo>,</mo><msup><mi>x' +
      '</mi><mn>2</mn></msup></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f von, Klammer auf, 2 x, Komma, x plus 1, Komma, x Quadrat, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function084
 */
sre.ClearspeakGermanFunctions.prototype.testFunction084 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'f mal x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function085
 */
sre.ClearspeakGermanFunctions.prototype.testFunction085 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>g</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'g mal x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function086
 */
sre.ClearspeakGermanFunctions.prototype.testFunction086 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>h</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'h mal x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function087
 */
sre.ClearspeakGermanFunctions.prototype.testFunction087 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mn>2</mn><mi>x' +
      '</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f mal 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function088
 */
sre.ClearspeakGermanFunctions.prototype.testFunction088 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>g</mi><mrow><mo>(</mo><mrow><mo>−</mo><mn>2' +
      '</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g mal minus 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function089
 */
sre.ClearspeakGermanFunctions.prototype.testFunction089 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>h</mi><mrow><mo>(</mo><mrow><mfrac><mn>1' +
      '</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'h mal ein halb';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function090
 */
sre.ClearspeakGermanFunctions.prototype.untestFunction090 = function() {
  var preference = 'Functions_None:Fraction_Over';
  var mathml = '<math><mrow><mi>h</mi><mrow><mo>(</mo><mrow><mfrac><mn>1' +
      '</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'XXX';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function091
 */
sre.ClearspeakGermanFunctions.prototype.testFunction091 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mi>x</mi><mo>+' +
      '</mo><mn>1</mn></mrow><mo>)</mo></mrow><mo>=</mo><mi>f</mi><mrow>' +
      '<mo>(</mo><mi>x</mi><mo>)</mo></mrow><mo>+</mo><mn>1</mn></mrow></math>';
  var speech = 'f mal, Klammer auf, x plus 1, Klammer zu, ist gleich, f mal x, plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function092
 */
sre.ClearspeakGermanFunctions.prototype.testFunction092 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>g</mi><mrow><mo>(</mo><mrow><mn>2</mn><mi>x' +
      '</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g mal, Klammer auf, 2 x, plus 1, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function093
 */
sre.ClearspeakGermanFunctions.prototype.testFunction093 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>g</mi><mrow><mo>(</mo><mrow><msup><mi>x' +
      '</mi><mn>2</mn></msup></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g mal, Klammer auf, x Quadrat, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function094
 */
sre.ClearspeakGermanFunctions.prototype.testFunction094 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>f</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f hoch minus 1, mal x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function095
 */
sre.ClearspeakGermanFunctions.prototype.testFunction095 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>g</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'g hoch minus 1, mal x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function096
 */
sre.ClearspeakGermanFunctions.prototype.testFunction096 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>h</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'h hoch minus 1, mal x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function097
 */
sre.ClearspeakGermanFunctions.prototype.testFunction097 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>f</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mn>2</mn><mi>x</mi></mrow><mo>)' +
      '</mo></mrow></mrow></math>';
  var speech = 'f hoch minus 1, mal 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function098
 */
sre.ClearspeakGermanFunctions.prototype.testFunction098 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>g</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mo>−</mo><mn>2</mn><mi>x</mi>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g hoch minus 1, mal minus 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function099
 */
sre.ClearspeakGermanFunctions.prototype.testFunction099 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>f</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mn>3</mn><mi>x</mi><mo>−</mo>' +
      '<mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f hoch minus 1, mal, Klammer auf, 3 x, minus 1, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function100
 */
sre.ClearspeakGermanFunctions.prototype.testFunction100 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>g</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><msup><mi>x</mi><mn>2</mn>' +
      '</msup></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g hoch minus 1, mal, Klammer auf, x Quadrat, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function101
 */
sre.ClearspeakGermanFunctions.prototype.testFunction101 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>h</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mfrac><mn>1</mn><mn>2</mn>' +
      '</mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'h hoch minus 1, mal ein halb';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function102
 */
sre.ClearspeakGermanFunctions.prototype.untestFunction102 = function() {
  var preference = 'Functions_None:Fraction_Over';
  var mathml = '<math><mrow><msup><mi>h</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mfrac><mn>1</mn><mn>2</mn>' +
      '</mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'XXX';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function103
 */
sre.ClearspeakGermanFunctions.prototype.testFunction103 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>f</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mi>f</mi><mrow><mo>(</mo><mi>x' +
      '</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f hoch minus 1, mal, f mal x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function104
 */
sre.ClearspeakGermanFunctions.prototype.testFunction104 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>g</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mi>g</mi><mrow><mo>(</mo><mi>x' +
      '</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g hoch minus 1, mal, g mal x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function105
 */
sre.ClearspeakGermanFunctions.prototype.testFunction105 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>h</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mi>h</mi><mrow><mo>(</mo><mi>x' +
      '</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'h hoch minus 1, mal, h mal x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function106
 */
sre.ClearspeakGermanFunctions.prototype.testFunction106 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>f</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mi>f</mi><mrow><mo>(</mo><mrow>' +
      '<mn>2</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'f hoch minus 1, mal, f mal 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function107
 */
sre.ClearspeakGermanFunctions.prototype.testFunction107 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>g</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mi>g</mi><mrow><mo>(</mo><mrow>' +
      '<mo>−</mo><mn>2</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow><mo>)' +
      '</mo></mrow></mrow></math>';
  var speech = 'g hoch minus 1, mal, g mal minus 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function108
 */
sre.ClearspeakGermanFunctions.prototype.testFunction108 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>h</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mi>h</mi><mrow><mo>(</mo><mrow>' +
      '<mfrac><mn>1</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'h hoch minus 1, mal, h mal ein halb';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function109
 */
sre.ClearspeakGermanFunctions.prototype.untestFunction109 = function() {
  var preference = 'Functions_None:Fraction_Over';
  var mathml = '<math><mrow><msup><mi>h</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mi>h</mi><mrow><mo>(</mo><mrow>' +
      '<mfrac><mn>1</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'XXX';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function110
 */
sre.ClearspeakGermanFunctions.prototype.testFunction110 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>f</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mi>f</mi><mrow><mo>(</mo><mrow>' +
      '<mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow><mo>)' +
      '</mo></mrow><mo>=</mo><mi>x</mi><mo>+</mo><mn>1</mn></mrow></math>';
  var speech = 'f hoch minus 1, mal, Klammer auf, f mal, Klammer auf, x plus 1, Klammer zu, Klammer zu, ist gleich x plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function111
 */
sre.ClearspeakGermanFunctions.prototype.testFunction111 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>g</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mi>g</mi><mrow><mo>(</mo><mrow>' +
      '<mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g hoch minus 1, mal, Klammer auf, g mal, Klammer auf, 2 x, plus 1, Klammer zu, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function112
 */
sre.ClearspeakGermanFunctions.prototype.testFunction112 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>g</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mi>g</mi><mrow><mo>(</mo><mrow>' +
      '<msup><mi>x</mi><mn>2</mn></msup></mrow><mo>)</mo></mrow></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'g hoch minus 1, mal, Klammer auf, g mal, Klammer auf, x Quadrat, Klammer zu, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function113
 */
sre.ClearspeakGermanFunctions.prototype.testFunction113 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><msup><mi>f' +
      '</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mi>x' +
      '</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f mal, Klammer auf, f hoch minus 1, mal x, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function114
 */
sre.ClearspeakGermanFunctions.prototype.testFunction114 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>g</mi><mrow><mo>(</mo><mrow><msup><mi>g' +
      '</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mi>x' +
      '</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g mal, Klammer auf, g hoch minus 1, mal x, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function115
 */
sre.ClearspeakGermanFunctions.prototype.testFunction115 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>h</mi><mrow><mo>(</mo><mrow><msup><mi>h' +
      '</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mi>x' +
      '</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'h mal, Klammer auf, h hoch minus 1, mal x, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function116
 */
sre.ClearspeakGermanFunctions.prototype.testFunction116 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><msup><mi>f' +
      '</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow>' +
      '<mn>2</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'f mal, Klammer auf, f hoch minus 1, mal 2 x, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function117
 */
sre.ClearspeakGermanFunctions.prototype.testFunction117 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>g</mi><mrow><mo>(</mo><mrow><msup><mi>g' +
      '</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow>' +
      '<mo>−</mo><mn>2</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow><mo>)' +
      '</mo></mrow></mrow></math>';
  var speech = 'g mal, Klammer auf, g hoch minus 1, mal minus 2 x, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function118
 */
sre.ClearspeakGermanFunctions.prototype.testFunction118 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><msup><mi>f' +
      '</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow>' +
      '<mn>3</mn><mi>x</mi><mo>−</mo><mn>1</mn></mrow><mo>)</mo></mrow>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f mal, Klammer auf, f hoch minus 1, mal, Klammer auf, 3 x, minus 1, Klammer zu, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function119
 */
sre.ClearspeakGermanFunctions.prototype.testFunction119 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>g</mi><mrow><mo>(</mo><mrow><msup><mi>g' +
      '</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow>' +
      '<msup><mi>x</mi><mn>2</mn></msup></mrow><mo>)</mo></mrow></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'g mal, Klammer auf, g hoch minus 1, mal, Klammer auf, x Quadrat, Klammer zu, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function120
 */
sre.ClearspeakGermanFunctions.prototype.testFunction120 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>h</mi><mrow><mo>(</mo><mrow><msup><mi>h' +
      '</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow>' +
      '<mfrac><mn>1</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'h mal, Klammer auf, h hoch minus 1, mal ein halb, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function121
 */
sre.ClearspeakGermanFunctions.prototype.untestFunction121 = function() {
  var preference = 'Functions_None:Fraction_Over';
  var mathml = '<math><mrow><mi>h</mi><mrow><mo>(</mo><mrow><msup><mi>h' +
      '</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow>' +
      '<mfrac><mn>1</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'XXX';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function122
 */
sre.ClearspeakGermanFunctions.prototype.testFunction122 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mi>g</mi>' +
      '<mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'f mal, g mal x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function123
 */
sre.ClearspeakGermanFunctions.prototype.testFunction123 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mi>g</mi>' +
      '<mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)' +
      '</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f mal, Klammer auf, g mal, Klammer auf, x plus 1, Klammer zu, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function124
 */
sre.ClearspeakGermanFunctions.prototype.testFunction124 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>h</mi><mrow><mo>(</mo><mrow><mi>g</mi>' +
      '<mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'h mal, g mal x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function125
 */
sre.ClearspeakGermanFunctions.prototype.testFunction125 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>h</mi><mrow><mo>(</mo><mrow><mi>g</mi>' +
      '<mrow><mo>(</mo><mrow><mfrac><mi>x</mi><mrow><mi>x</mi><mo>+</mo>' +
      '<mn>1</mn></mrow></mfrac></mrow><mo>)</mo></mrow></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'h mal, Klammer auf, g mal, Klammer auf, Bruch mit Zähler x, und Nenner x plus 1, Klammer zu, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function126
 */
sre.ClearspeakGermanFunctions.prototype.testFunction126 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mi>f</mi><mo>+</mo><mi>g' +
      '</mi></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow><mo>=</mo><mi>f</mi><mo stretchy="false">(</mo><mi>x</mi><mo' +
      ' stretchy="false">)</mo><mo>+</mo><mi>g</mi><mo stretchy="false">(' +
      '</mo><mi>x</mi><mo stretchy="false">)</mo></mrow></math>';
  var speech = 'Klammer auf, f plus g, Klammer zu, mal x, ist gleich, f mal x, plus, g mal x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function127
 */
sre.ClearspeakGermanFunctions.prototype.testFunction127 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mi>f</mi><mo>+</mo><mi>g' +
      '</mi></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mi>x</mi><mo>+' +
      '</mo><mn>1</mn></mrow><mo>)</mo></mrow><mo>=</mo><mi>f</mi><mrow>' +
      '<mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow><mo>+</mo><mi>g</mi><mrow><mo>(</mo><mrow><mi>x</mi><mo>+' +
      '</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'Klammer auf, f plus g, Klammer zu, mal, Klammer auf, x plus 1, Klammer zu, ist gleich, f mal, Klammer auf, x plus 1, Klammer zu, plus, g mal, Klammer auf, x plus 1, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function128
 */
sre.ClearspeakGermanFunctions.prototype.testFunction128 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mi>f</mi><mo>⋅</mo><mi>g' +
      '</mi></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'Klammer auf, f mal g, Klammer zu, mal x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function129
 */
sre.ClearspeakGermanFunctions.prototype.testFunction129 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mi>f</mi><mo>⋅</mo><mi>g' +
      '</mi></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mn>2</mn><mi>x' +
      '</mi><mo>+</mo><mn>5</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'Klammer auf, f mal g, Klammer zu, mal, Klammer auf, 2 x, plus 5, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function130
 */
sre.ClearspeakGermanFunctions.prototype.testFunction130 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mfrac><mi>f</mi><mi>g' +
      '</mi></mfrac></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mi>x</mi><mo>)' +
      '</mo></mrow><mo>=</mo><mfrac><mrow><mi>f</mi><mrow><mo>(</mo><mi>x' +
      '</mi><mo>)</mo></mrow></mrow><mrow><mi>g</mi><mrow><mo>(</mo><mi>x' +
      '</mi><mo>)</mo></mrow></mrow></mfrac></mrow></math>';
  var speech = 'Klammer auf, f geteilt durch g, Klammer zu, mal x, ist gleich, Bruch mit Zähler, f mal x, und Nenner, g mal x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function131
 */
sre.ClearspeakGermanFunctions.prototype.testFunction131 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mfrac><mi>f</mi><mi>g' +
      '</mi></mfrac></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mn>2' +
      '</mn><mi>x</mi><mo>+</mo><mn>5</mn></mrow><mo>)</mo></mrow><mo>=' +
      '</mo><mfrac><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mn>2</mn><mi>x' +
      '</mi><mo>+</mo><mn>5</mn></mrow><mo>)</mo></mrow></mrow><mrow><mi>g' +
      '</mi><mrow><mo>(</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>5</mn>' +
      '</mrow><mo>)</mo></mrow></mrow></mfrac></mrow></math>';
  var speech = 'Klammer auf, f geteilt durch g, Klammer zu, mal, Klammer auf, 2 x, plus 5, Klammer zu, ist gleich, Bruch mit Zähler, f mal, Klammer auf, 2 x, plus 5, Klammer zu, und Nenner, g mal, Klammer auf, 2 x, plus 5, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function132
 */
sre.ClearspeakGermanFunctions.prototype.testFunction132 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mn>2</mn><mi>f</mi><mrow><mo>(</mo><mi>x</mi>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = '2, f mal x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function133
 */
sre.ClearspeakGermanFunctions.prototype.testFunction133 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>c</mi><mi>f</mi><mrow><mo>(</mo><mi>x</mi>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'c, f mal x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function134
 */
sre.ClearspeakGermanFunctions.prototype.testFunction134 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>2</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f Quadrat mal x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function135
 */
sre.ClearspeakGermanFunctions.prototype.testFunction135 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>2</mn></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'f Quadrat mal, Klammer auf, 2 x, plus 1, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function136
 */
sre.ClearspeakGermanFunctions.prototype.testFunction136 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>3</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f Kubik mal x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function137
 */
sre.ClearspeakGermanFunctions.prototype.testFunction137 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>3</mn></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'f Kubik mal, Klammer auf, 2 x, plus 1, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function138
 */
sre.ClearspeakGermanFunctions.prototype.testFunction138 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>4</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f hoch 4, mal x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function139
 */
sre.ClearspeakGermanFunctions.prototype.testFunction139 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>4</mn></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'f hoch 4, mal, Klammer auf, 2 x, plus 1, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function140
 */
sre.ClearspeakGermanFunctions.prototype.testFunction140 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>5</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f hoch 5, mal x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function141
 */
sre.ClearspeakGermanFunctions.prototype.testFunction141 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>5</mn></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'f hoch 5, mal, Klammer auf, 2 x, plus 1, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function142
 */
sre.ClearspeakGermanFunctions.prototype.testFunction142 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>f</mi><mi>n</mi></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f hoch n, mal x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function143
 */
sre.ClearspeakGermanFunctions.prototype.testFunction143 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>f</mi><mi>n</mi></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'f hoch n, mal, Klammer auf, 2 x, plus 1, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function144
 */
sre.ClearspeakGermanFunctions.prototype.testFunction144 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>g</mi><mn>2</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'g Quadrat mal x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function145
 */
sre.ClearspeakGermanFunctions.prototype.testFunction145 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>g</mi><mn>2</mn></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'g Quadrat mal, Klammer auf, 2 x, plus 1, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function146
 */
sre.ClearspeakGermanFunctions.prototype.testFunction146 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>h</mi><mn>3</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'h Kubik mal x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function147
 */
sre.ClearspeakGermanFunctions.prototype.testFunction147 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>h</mi><mn>3</mn></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'h Kubik mal, Klammer auf, 2 x, plus 1, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function148
 */
sre.ClearspeakGermanFunctions.prototype.testFunction148 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>g</mi><mn>4</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'g hoch 4, mal x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function149
 */
sre.ClearspeakGermanFunctions.prototype.testFunction149 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>g</mi><mn>4</mn></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'g hoch 4, mal, Klammer auf, 2 x, plus 1, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function150
 */
sre.ClearspeakGermanFunctions.prototype.testFunction150 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>h</mi><mn>5</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'h hoch 5, mal x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function151
 */
sre.ClearspeakGermanFunctions.prototype.testFunction151 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>h</mi><mn>5</mn></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'h hoch 5, mal, Klammer auf, 2 x, plus 1, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function152
 */
sre.ClearspeakGermanFunctions.prototype.testFunction152 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>g</mi><mi>n</mi></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'g hoch n, mal x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function153
 */
sre.ClearspeakGermanFunctions.prototype.testFunction153 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msup><mi>g</mi><mi>n</mi></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'g hoch n, mal, Klammer auf, 2 x, plus 1, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function154
 */
sre.ClearspeakGermanFunctions.prototype.testFunction154 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msub><mi>f</mi><mn>1</mn></msub><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f Index 1, mal x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function156
 */
sre.ClearspeakGermanFunctions.prototype.testFunction156 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msub><mi>g</mi><mn>2</mn></msub><mrow><mo>(' +
      '</mo><mrow><msup><mi>x</mi><mn>3</mn></msup></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'g Index 2, mal, Klammer auf, x Kubik, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function157
 */
sre.ClearspeakGermanFunctions.prototype.testFunction157 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msub><mi>h</mi><mi>n</mi></msub><mrow><mo>(' +
      '</mo><mrow><mn>3</mn><mi>x</mi><mo>−</mo><mn>2</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'h Index n, mal, Klammer auf, 3 x, minus 2, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function158
 */
sre.ClearspeakGermanFunctions.prototype.testFunction158 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msubsup><mi>f</mi><mn>1</mn><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msubsup><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'f Index 1, hoch minus 1, mal x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function159
 */
sre.ClearspeakGermanFunctions.prototype.testFunction159 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msubsup><mi>g</mi><mn>2</mn><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msubsup><mrow><mo>(</mo><mrow><mn>2</mn><mi>x' +
      '</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g Index 2, hoch minus 1, mal, Klammer auf, 2 x, plus 1, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function160
 */
sre.ClearspeakGermanFunctions.prototype.testFunction160 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msubsup><mi>h</mi><mi>n</mi><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msubsup><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'h Index n, hoch minus 1, mal x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function161
 */
sre.ClearspeakGermanFunctions.prototype.testFunction161 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msubsup><mi>g</mi><mn>1</mn><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msubsup><mrow><mo>(</mo><mrow><msub><mi>g</mi>' +
      '<mn>2</mn></msub><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'g Index 1, hoch minus 1, mal, Klammer auf, g Index 2, mal x, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function162
 */
sre.ClearspeakGermanFunctions.prototype.testFunction162 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><msub><mi>f</mi><mn>1</mn></msub><mrow><mo>(' +
      '</mo><mrow><msubsup><mi>g</mi><mn>2</mn><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msubsup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'f Index 1, mal, Klammer auf, g Index 2, hoch minus 1, mal x, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function163
 */
sre.ClearspeakGermanFunctions.prototype.testFunction163 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mi>x</mi><mo>,' +
      '</mo><mi>y</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f mal, Klammer auf, x Komma y, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function164
 */
sre.ClearspeakGermanFunctions.prototype.testFunction164 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mi>x</mi><mo>,' +
      '</mo><mi>y</mi><mo>,</mo><mi>z</mi></mrow><mo>)</mo></mrow></mrow>' +
      '</math>';
  var speech = 'f mal, Klammer auf, x Komma y Komma z, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function165
 */
sre.ClearspeakGermanFunctions.prototype.testFunction165 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mi>x</mi><mo>+' +
      '</mo><mn>1</mn><mo>,</mo><mn>2</mn><mi>y</mi></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'f mal, Klammer auf, x plus 1, Komma, 2 y, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function166
 */
sre.ClearspeakGermanFunctions.prototype.testFunction166 = function() {
  var preference = 'Functions_None';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mn>2</mn><mi>x' +
      '</mi><mo>,</mo><mi>x</mi><mo>+</mo><mn>1</mn><mo>,</mo><msup><mi>x' +
      '</mi><mn>2</mn></msup></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f mal, Klammer auf, 2 x, Komma, x plus 1, Komma, x Quadrat, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


// NEW: Reciprocal


/**
 * Testing ClearspeakGermanFunctions Example Function011
 */
sre.ClearspeakGermanFunctions.prototype.testFunction011b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>f</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f invers von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function012
 */
sre.ClearspeakGermanFunctions.prototype.testFunction012b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>g</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'g invers von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function013
 */
sre.ClearspeakGermanFunctions.prototype.testFunction013b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>h</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'h invers von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function014
 */
sre.ClearspeakGermanFunctions.prototype.testFunction014b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>f</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mn>2</mn><mi>x</mi></mrow><mo>)' +
      '</mo></mrow></mrow></math>';
  var speech = 'f invers von 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function015
 */
sre.ClearspeakGermanFunctions.prototype.testFunction015b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>g</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mo>−</mo><mn>2</mn><mi>x</mi>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g invers von minus 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function016
 */
sre.ClearspeakGermanFunctions.prototype.testFunction016b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>f</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mn>3</mn><mi>x</mi><mo>−</mo>' +
      '<mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f invers von, Klammer auf, 3 x, minus 1, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function017
 */
sre.ClearspeakGermanFunctions.prototype.testFunction017b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>g</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><msup><mi>x</mi><mn>2</mn>' +
      '</msup></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g invers von, Klammer auf, x Quadrat, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function018
 */
sre.ClearspeakGermanFunctions.prototype.testFunction018b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>h</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mfrac><mn>1</mn><mn>2</mn>' +
      '</mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'h invers von ein halb';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function019
 */
sre.ClearspeakGermanFunctions.prototype.testFunction019b = function() {
  // TODO: This throws a test exception.
  // var preference = 'Functions_Auto:Fraction_Over';
  var preference = 'Fraction_Over:Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>h</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mfrac><mn>1</mn><mn>2</mn>' +
      '</mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'h invers von, 1 geteilt durch 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function020
 */
sre.ClearspeakGermanFunctions.prototype.testFunction020b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>f</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mi>f</mi><mrow><mo>(</mo><mi>x' +
      '</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f invers von, f von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function021
 */
sre.ClearspeakGermanFunctions.prototype.testFunction021b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>g</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mi>g</mi><mrow><mo>(</mo><mi>x' +
      '</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g invers von, g von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function022
 */
sre.ClearspeakGermanFunctions.prototype.testFunction022b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>h</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mi>h</mi><mrow><mo>(</mo><mi>x' +
      '</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'h invers von, h von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function023
 */
sre.ClearspeakGermanFunctions.prototype.testFunction023b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>f</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mi>f</mi><mrow><mo>(</mo><mrow>' +
      '<mn>2</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'f invers von, f von 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function024
 */
sre.ClearspeakGermanFunctions.prototype.testFunction024b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>g</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mi>g</mi><mrow><mo>(</mo><mrow>' +
      '<mo>−</mo><mn>2</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow><mo>)' +
      '</mo></mrow></mrow></math>';
  var speech = 'g invers von, g von minus 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function025
 */
sre.ClearspeakGermanFunctions.prototype.testFunction025b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>h</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mi>h</mi><mrow><mo>(</mo><mrow>' +
      '<mfrac><mn>1</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'h invers von, h von ein halb';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function026
 */
sre.ClearspeakGermanFunctions.prototype.testFunction026b = function() {
  // TODO: This throws a test exception.
  // var preference = 'Functions_Auto:Fraction_Over';
  var preference = 'Fraction_Over:Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>h</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mi>h</mi><mrow><mo>(</mo><mrow>' +
      '<mfrac><mn>1</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'h invers von, h von, 1 geteilt durch 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function027
 */
sre.ClearspeakGermanFunctions.prototype.testFunction027b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>f</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mi>f</mi><mrow><mo>(</mo><mrow>' +
      '<mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow><mo>)' +
      '</mo></mrow><mo>=</mo><mi>x</mi><mo>+</mo><mn>1</mn></mrow></math>';
  var speech = 'f invers von, Klammer auf, f von, Klammer auf, x plus 1, Klammer zu, Klammer zu, ist gleich x plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function028
 */
sre.ClearspeakGermanFunctions.prototype.testFunction028b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>g</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mi>g</mi><mrow><mo>(</mo><mrow>' +
      '<mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g invers von, Klammer auf, g von, Klammer auf, 2 x, plus 1, Klammer zu, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function029
 */
sre.ClearspeakGermanFunctions.prototype.testFunction029b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>g</mi><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msup><mrow><mo>(</mo><mrow><mi>g</mi><mrow><mo>(</mo><mrow>' +
      '<msup><mi>x</mi><mn>2</mn></msup></mrow><mo>)</mo></mrow></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'g invers von, Klammer auf, g von, Klammer auf, x Quadrat, Klammer zu, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function030
 */
sre.ClearspeakGermanFunctions.prototype.testFunction030b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><msup><mi>f' +
      '</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mi>x' +
      '</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f von, f invers von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function031
 */
sre.ClearspeakGermanFunctions.prototype.testFunction031b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><mi>g</mi><mrow><mo>(</mo><mrow><msup><mi>g' +
      '</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mi>x' +
      '</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g von, g invers von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function032
 */
sre.ClearspeakGermanFunctions.prototype.testFunction032b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><mi>h</mi><mrow><mo>(</mo><mrow><msup><mi>h' +
      '</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mi>x' +
      '</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'h von, h invers von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function033
 */
sre.ClearspeakGermanFunctions.prototype.testFunction033b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><msup><mi>f' +
      '</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow>' +
      '<mn>2</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'f von, f invers von 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function034
 */
sre.ClearspeakGermanFunctions.prototype.testFunction034b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><mi>g</mi><mrow><mo>(</mo><mrow><msup><mi>g' +
      '</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow>' +
      '<mo>−</mo><mn>2</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow><mo>)' +
      '</mo></mrow></mrow></math>';
  var speech = 'g von, g invers von minus 2 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function035
 */
sre.ClearspeakGermanFunctions.prototype.testFunction035b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><msup><mi>f' +
      '</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow>' +
      '<mn>3</mn><mi>x</mi><mo>−</mo><mn>1</mn></mrow><mo>)</mo></mrow>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f von, Klammer auf, f invers von, Klammer auf, 3 x, minus 1, Klammer zu, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function036
 */
sre.ClearspeakGermanFunctions.prototype.testFunction036b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><mi>g</mi><mrow><mo>(</mo><mrow><msup><mi>g' +
      '</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow>' +
      '<msup><mi>x</mi><mn>2</mn></msup></mrow><mo>)</mo></mrow></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'g von, g invers von, Klammer auf, x Quadrat, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function037
 */
sre.ClearspeakGermanFunctions.prototype.testFunction037b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><mi>h</mi><mrow><mo>(</mo><mrow><msup><mi>h' +
      '</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow>' +
      '<mfrac><mn>1</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'h von, h invers von ein halb';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function038
 */
sre.ClearspeakGermanFunctions.prototype.testFunction038b = function() {
  // TODO: This throws a test exception.
  // var preference = 'Functions_Auto:Fraction_FracOver';
  var preference = 'Fraction_FracOver:Functions_Reciprocal';
  var mathml = '<math><mrow><mi>h</mi><mrow><mo>(</mo><mrow><msup><mi>h' +
      '</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow>' +
      '<mfrac><mn>1</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'h von, h invers von, Bruch 1 geteilt durch 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function039
 */
sre.ClearspeakGermanFunctions.prototype.testFunction039b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mi>g</mi>' +
      '<mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'f von, g von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function040
 */
sre.ClearspeakGermanFunctions.prototype.testFunction040b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mi>g</mi>' +
      '<mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)' +
      '</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f von, Klammer auf, g von, Klammer auf, x plus 1, Klammer zu, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function041
 */
sre.ClearspeakGermanFunctions.prototype.testFunction041b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><mi>h</mi><mrow><mo>(</mo><mrow><mi>g</mi>' +
      '<mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'h von, g von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function042
 */
sre.ClearspeakGermanFunctions.prototype.testFunction042b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><mi>h</mi><mrow><mo>(</mo><mrow><mi>g</mi>' +
      '<mrow><mo>(</mo><mrow><mfrac><mi>x</mi><mrow><mi>x</mi><mo>+</mo>' +
      '<mn>1</mn></mrow></mfrac></mrow><mo>)</mo></mrow></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'h von, Klammer auf, g von, Klammer auf, Bruch mit Zähler x, und Nenner x plus 1, Klammer zu, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function043
 */
sre.ClearspeakGermanFunctions.prototype.testFunction043b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mi>f</mi><mo>+</mo><mi>g' +
      '</mi></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow><mo>=</mo><mi>f</mi><mo stretchy="false">(</mo><mi>x</mi><mo' +
      ' stretchy="false">)</mo><mo>+</mo><mi>g</mi><mo stretchy="false">(' +
      '</mo><mi>x</mi><mo stretchy="false">)</mo></mrow></math>';
  var speech = 'Klammer auf, f plus g, Klammer zu, von x, ist gleich f von x, plus g von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function044
 */
sre.ClearspeakGermanFunctions.prototype.testFunction044b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mi>f</mi><mo>+</mo><mi>g' +
      '</mi></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mi>x</mi><mo>+' +
      '</mo><mn>1</mn></mrow><mo>)</mo></mrow><mo>=</mo><mi>f</mi><mrow>' +
      '<mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow><mo>+</mo><mi>g</mi><mrow><mo>(</mo><mrow><mi>x</mi><mo>+' +
      '</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'Klammer auf, f plus g, Klammer zu, von, Klammer auf, x plus 1, Klammer zu, ist gleich f von, Klammer auf, x plus 1, Klammer zu, plus g von, Klammer auf, x plus 1, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function045
 */
sre.ClearspeakGermanFunctions.prototype.testFunction045b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mi>f</mi><mo>⋅</mo><mi>g' +
      '</mi></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'Klammer auf, f mal g, Klammer zu, von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function046
 */
sre.ClearspeakGermanFunctions.prototype.testFunction046b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mi>f</mi><mo>⋅</mo><mi>g' +
      '</mi></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mn>2</mn><mi>x' +
      '</mi><mo>+</mo><mn>5</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'Klammer auf, f mal g, Klammer zu, von, Klammer auf, 2 x, plus 5, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function047
 */
sre.ClearspeakGermanFunctions.prototype.testFunction047b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mfrac><mi>f</mi><mi>g' +
      '</mi></mfrac></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mi>x</mi><mo>)' +
      '</mo></mrow><mo>=</mo><mfrac><mrow><mi>f</mi><mrow><mo>(</mo><mi>x' +
      '</mi><mo>)</mo></mrow></mrow><mrow><mi>g</mi><mrow><mo>(</mo><mi>x' +
      '</mi><mo>)</mo></mrow></mrow></mfrac></mrow></math>';
  var speech = 'Klammer auf, f geteilt durch g, Klammer zu, von x, ist gleich, f von x, geteilt durch g von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function048
 */
sre.ClearspeakGermanFunctions.prototype.testFunction048b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mfrac><mi>f</mi><mi>g' +
      '</mi></mfrac></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mn>2' +
      '</mn><mi>x</mi><mo>+</mo><mn>5</mn></mrow><mo>)</mo></mrow><mo>=' +
      '</mo><mfrac><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mn>2</mn><mi>x' +
      '</mi><mo>+</mo><mn>5</mn></mrow><mo>)</mo></mrow></mrow><mrow><mi>g' +
      '</mi><mrow><mo>(</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>5</mn>' +
      '</mrow><mo>)</mo></mrow></mrow></mfrac></mrow></math>';
  var speech = 'Klammer auf, f geteilt durch g, Klammer zu, von, Klammer auf, 2 x, plus 5, Klammer zu, ist gleich, Bruch mit Zähler f von, Klammer auf, 2 x, plus 5, Klammer zu, und Nenner g von, Klammer auf, 2 x, plus 5, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function049
 */
sre.ClearspeakGermanFunctions.prototype.testFunction049b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mi>f</mi><mo>∘</mo><mi>g' +
      '</mi></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow><mo>=</mo><mi>f</mi><mrow><mo>(</mo><mrow><mi>g</mi><mrow>' +
      '<mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow>' +
      '</math>';
  var speech = 'Klammer auf, f verknüpft mit g, Klammer zu, von x, ist gleich f von, g von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function050
 */
sre.ClearspeakGermanFunctions.prototype.testFunction050b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><mn>2</mn><mi>f</mi><mrow><mo>(</mo><mi>x</mi>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = '2 f von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function051
 */
sre.ClearspeakGermanFunctions.prototype.testFunction051b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><mi>c</mi><mi>f</mi><mrow><mo>(</mo><mi>x</mi>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'c f von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function052
 */
sre.ClearspeakGermanFunctions.prototype.testFunction052b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>2</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f Quadrat von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function053
 */
sre.ClearspeakGermanFunctions.prototype.testFunction053b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>2</mn></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'f Quadrat von, Klammer auf, 2 x, plus 1, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function054
 */
sre.ClearspeakGermanFunctions.prototype.testFunction054b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>3</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f Kubik von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function055
 */
sre.ClearspeakGermanFunctions.prototype.testFunction055b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>3</mn></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'f Kubik von, Klammer auf, 2 x, plus 1, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function056
 */
sre.ClearspeakGermanFunctions.prototype.testFunction056b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>4</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f hoch 4, von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function057
 */
sre.ClearspeakGermanFunctions.prototype.testFunction057b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>4</mn></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'f hoch 4, von, Klammer auf, 2 x, plus 1, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function058
 */
sre.ClearspeakGermanFunctions.prototype.testFunction058b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>5</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f hoch 5, von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function059
 */
sre.ClearspeakGermanFunctions.prototype.testFunction059b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>f</mi><mn>5</mn></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'f hoch 5, von, Klammer auf, 2 x, plus 1, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function060
 */
sre.ClearspeakGermanFunctions.prototype.testFunction060b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>f</mi><mi>n</mi></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f hoch n, von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function061
 */
sre.ClearspeakGermanFunctions.prototype.testFunction061b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>f</mi><mi>n</mi></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'f hoch n, von, Klammer auf, 2 x, plus 1, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function062
 */
sre.ClearspeakGermanFunctions.prototype.testFunction062b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>g</mi><mn>2</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'g Quadrat von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function063
 */
sre.ClearspeakGermanFunctions.prototype.testFunction063b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>g</mi><mn>2</mn></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'g Quadrat von, Klammer auf, 2 x, plus 1, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function064
 */
sre.ClearspeakGermanFunctions.prototype.testFunction064b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>h</mi><mn>3</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'h Kubik von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function065
 */
sre.ClearspeakGermanFunctions.prototype.testFunction065b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>h</mi><mn>3</mn></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'h Kubik von, Klammer auf, 2 x, plus 1, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function066
 */
sre.ClearspeakGermanFunctions.prototype.testFunction066b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>g</mi><mn>4</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'g hoch 4, von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function067
 */
sre.ClearspeakGermanFunctions.prototype.testFunction067b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>g</mi><mn>4</mn></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'g hoch 4, von, Klammer auf, 2 x, plus 1, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function068
 */
sre.ClearspeakGermanFunctions.prototype.testFunction068b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>h</mi><mn>5</mn></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'h hoch 5, von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function069
 */
sre.ClearspeakGermanFunctions.prototype.testFunction069b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>h</mi><mn>5</mn></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'h hoch 5, von, Klammer auf, 2 x, plus 1, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function070
 */
sre.ClearspeakGermanFunctions.prototype.testFunction070b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>g</mi><mi>n</mi></msup><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'g hoch n, von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function071
 */
sre.ClearspeakGermanFunctions.prototype.testFunction071b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msup><mi>g</mi><mi>n</mi></msup><mrow><mo>(' +
      '</mo><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'g hoch n, von, Klammer auf, 2 x, plus 1, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function072
 */
sre.ClearspeakGermanFunctions.prototype.testFunction072b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msub><mi>f</mi><mn>1</mn></msub><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'f Index 1, von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function073
 */
sre.ClearspeakGermanFunctions.prototype.testFunction073b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msub><mi>g</mi><mn>2</mn></msub><mrow><mo>(' +
      '</mo><mrow><msup><mi>x</mi><mn>3</mn></msup></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'g Index 2, von, Klammer auf, x Kubik, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function074
 */
sre.ClearspeakGermanFunctions.prototype.testFunction074b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msub><mi>h</mi><mi>n</mi></msub><mrow><mo>(' +
      '</mo><mrow><mn>3</mn><mi>x</mi><mo>−</mo><mn>2</mn></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'h Index n, von, Klammer auf, 3 x, minus 2, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function075
 */
sre.ClearspeakGermanFunctions.prototype.testFunction075b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msubsup><mi>f</mi><mn>1</mn><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msubsup><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'f Index 1, invers von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function076
 */
sre.ClearspeakGermanFunctions.prototype.testFunction076b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msubsup><mi>g</mi><mn>2</mn><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msubsup><mrow><mo>(</mo><mrow><mn>2</mn><mi>x' +
      '</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'g Index 2, invers von, Klammer auf, 2 x, plus 1, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function077
 */
sre.ClearspeakGermanFunctions.prototype.testFunction077b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msubsup><mi>h</mi><mi>n</mi><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msubsup><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'h Index n, invers von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function078
 */
sre.ClearspeakGermanFunctions.prototype.testFunction078b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msubsup><mi>g</mi><mn>1</mn><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msubsup><mrow><mo>(</mo><mrow><msub><mi>g</mi>' +
      '<mn>2</mn></msub><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'g Index 1, invers von, g Index 2, von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFunctions Example Function079
 */
sre.ClearspeakGermanFunctions.prototype.testFunction079b = function() {
  var preference = 'Functions_Reciprocal';
  var mathml = '<math><mrow><msub><mi>f</mi><mn>1</mn></msub><mrow><mo>(' +
      '</mo><mrow><msubsup><mi>g</mi><mn>2</mn><mrow><mo>−</mo><mn>1</mn>' +
      '</mrow></msubsup><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'f Index 1, von, g Index 2, invers von x';
  this.executeRuleTest(mathml, speech, preference);
};

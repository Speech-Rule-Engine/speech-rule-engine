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


goog.provide('sre.ClearspeakFrenchExponents');

goog.require('sre.ClearspeakFrenchRuleTest');



/**
* @constructor
* @extends {sre.ClearspeakFrenchRuleTest}
*/
sre.ClearspeakFrenchExponents = function() {
  sre.ClearspeakFrenchExponents.base(this, 'constructor');

  /**
* @override
  */
  this.information = 'ClearspeakFrenchExponents rule tests.';

};
goog.inherits(sre.ClearspeakFrenchExponents, sre.ClearspeakFrenchRuleTest);



//
// Exponents
//


/**
 * Testing ClearspeakFrenchExponents Example Exp001
 */
sre.ClearspeakFrenchExponents.prototype.testExp001 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mn>2</mn></msup></mrow></math>';
  var speech = '3 squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp002a
 */
sre.ClearspeakFrenchExponents.prototype.testExp002a = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mn>3</mn></msup></mrow></math>';
  var speech = '3 cubed';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp003
 */
sre.ClearspeakFrenchExponents.prototype.testExp003 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mn>5</mn></msup></mrow></math>';
  var speech = '3 to the fifth power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp004
 */
sre.ClearspeakFrenchExponents.prototype.testExp004 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mn>1</mn></msup></mrow></math>';
  var speech = '3 to the first power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp005
 */
sre.ClearspeakFrenchExponents.prototype.testExp005 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mi>b</mi><mn>1</mn></msup></mrow></math>';
  var speech = 'b to the first power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp006
 */
sre.ClearspeakFrenchExponents.prototype.testExp006 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><mn>5.0</mn></mrow>' +
      '</msup></mrow></math>';
  var speech = '3 raised to the 5.0 power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp007
 */
sre.ClearspeakFrenchExponents.prototype.testExp007 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mn>0</mn></msup></mrow></math>';
  var speech = '3 to the 0 power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp008
 */
sre.ClearspeakFrenchExponents.prototype.testExp008 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>4</mn><mrow><mn>11</mn></mrow></msup>' +
      '</mrow></math>';
  var speech = '4 to the 11th power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp009
 */
sre.ClearspeakFrenchExponents.prototype.testExp009 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><mo>−</mo><mn>2</mn>' +
      '</mrow></msup></mrow></math>';
  var speech = '3 to the negative 2 power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp010a
 */
sre.ClearspeakFrenchExponents.prototype.testExp010a = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><mo>−</mo><mn>2.0</mn>' +
      '</mrow></msup></mrow></math>';
  var speech = '3 raised to the negative 2.0 power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp011
 */
sre.ClearspeakFrenchExponents.prototype.testExp011 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>4</mn><mi>x</mi></msup></mrow></math>';
  var speech = '4 to the xth power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp012
 */
sre.ClearspeakFrenchExponents.prototype.testExp012 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><mi>y</mi><mo>+</mo><mn>2' +
      '</mn></mrow></msup></mrow></math>';
  var speech = '3 raised to the y plus 2 power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp013
 */
sre.ClearspeakFrenchExponents.prototype.testExp013 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mn>2</mn>' +
      '<mi>y</mi><mo>−</mo><mn>3</mn></mrow><mo>)</mo></mrow></mrow><mrow>' +
      '<mn>3</mn><mi>z</mi><mo>+</mo><mn>8</mn></mrow></msup></mrow></math>';
  var speech = 'open paren, 2 y, minus 3, close paren, raised to the 3 z,' +
      ' plus 8 power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp014
 */
sre.ClearspeakFrenchExponents.prototype.testExp014 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msubsup><mi>p</mi><mn>1</mn><mn>2</mn>' +
      '</msubsup></mrow></math>';
  var speech = 'p sub 1, squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp015
 */
sre.ClearspeakFrenchExponents.prototype.testExp015 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msubsup><mi>p</mi><mn>1</mn><mn>3</mn>' +
      '</msubsup></mrow></math>';
  var speech = 'p sub 1, cubed';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp016
 */
sre.ClearspeakFrenchExponents.prototype.testExp016 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msubsup><mi>p</mi><mn>1</mn><mn>4</mn>' +
      '</msubsup></mrow></math>';
  var speech = 'p sub 1, to the fourth power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp017
 */
sre.ClearspeakFrenchExponents.prototype.testExp017 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msubsup><mi>p</mi><mn>1</mn><mrow><mn>10</mn>' +
      '</mrow></msubsup></mrow></math>';
  var speech = 'p sub 1, to the tenth power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp018
 */
sre.ClearspeakFrenchExponents.prototype.testExp018 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msubsup><mi>p</mi><mn>1</mn><mrow><mi>x</mi>' +
      '<mo>+</mo><mn>1</mn></mrow></msubsup></mrow></math>';
  var speech = 'p sub 1, raised to the x plus 1 power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp019
 */
sre.ClearspeakFrenchExponents.prototype.testExp019 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msubsup><mi>p</mi><mrow><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow><mn>2</mn></msubsup></mrow></math>';
  var speech = 'p sub, x sub 1, squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp010b
 */
sre.ClearspeakFrenchExponents.prototype.testExp010b = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msubsup><mi>p</mi><mrow><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow><mn>3</mn></msubsup></mrow></math>';
  var speech = 'p sub, x sub 1, cubed';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp011b
 */
sre.ClearspeakFrenchExponents.prototype.testExp011b = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msubsup><mi>p</mi><mrow><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow><mn>4</mn></msubsup></mrow></math>';
  var speech = 'p sub, x sub 1, to the fourth power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp012b
 */
sre.ClearspeakFrenchExponents.prototype.testExp012b = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msubsup><mi>p</mi><mrow><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow><mrow><mn>10</mn></mrow></msubsup></mrow></math>';
  var speech = 'p sub, x sub 1, to the tenth power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp013b
 */
sre.ClearspeakFrenchExponents.prototype.testExp013b = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msubsup><mi>p</mi><mrow><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow><mrow><mi>y</mi><mo>+</mo><mn>1</mn></mrow>' +
      '</msubsup></mrow></math>';
  var speech = 'p sub, x sub 1, raised to the y plus 1 power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp014b
 */
sre.ClearspeakFrenchExponents.prototype.testExp014b = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>2</mn><mn>2' +
      '</mn></msup></mrow></msup></mrow></math>';
  var speech = '3 raised to the 2 squared power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp015b
 */
sre.ClearspeakFrenchExponents.prototype.testExp015b = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><mn>2</mn><msup><mi>x' +
      '</mi><mn>2</mn></msup></mrow></msup></mrow></math>';
  var speech = '3 raised to the 2 x squared power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp016b
 */
sre.ClearspeakFrenchExponents.prototype.testExp016b = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>5</mn><mrow><msup><mn>2</mn><mn>3' +
      '</mn></msup></mrow></msup></mrow></math>';
  var speech = '5 raised to the 2 cubed power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp017b
 */
sre.ClearspeakFrenchExponents.prototype.testExp017b = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>5</mn><mrow><mn>2</mn><msup><mi>x' +
      '</mi><mn>3</mn></msup></mrow></msup></mrow></math>';
  var speech = '5 raised to the 2 x cubed power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp018b
 */
sre.ClearspeakFrenchExponents.prototype.testExp018b = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>2</mn><mn>2' +
      '</mn></msup><mo>+</mo><mn>1</mn></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, 2 squared plus 1, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp019b
 */
sre.ClearspeakFrenchExponents.prototype.testExp019b = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>2</mn><mn>2' +
      '</mn></msup></mrow></msup><mo>+</mo><mn>1</mn></mrow></math>';
  var speech = '3 raised to the 2 squared power, plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp020
 */
sre.ClearspeakFrenchExponents.prototype.testExp020 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>2</mn><mrow><msup><mi>x</mi><mn>2' +
      '</mn></msup><mo>+</mo><mn>3</mn><msup><mi>x</mi><mn>3</mn></msup>' +
      '</mrow></msup></mrow></math>';
  var speech = '2 raised to the exponent, x squared plus 3 x cubed, end' +
      ' exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp021
 */
sre.ClearspeakFrenchExponents.prototype.testExp021 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mn>4' +
      '</mn></msup></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, 3 to the fourth power, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp022
 */
sre.ClearspeakFrenchExponents.prototype.testExp022 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mn>4' +
      '</mn></msup><mo>+</mo><mn>2</mn></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, 3 to the fourth power, plus 2,' +
      ' end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp023
 */
sre.ClearspeakFrenchExponents.prototype.testExp023 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mn>4' +
      '</mn></msup></mrow></msup><mo>+</mo><mn>2</mn></mrow></math>';
  var speech = '3 raised to the exponent, 3 to the fourth power, end' +
      ' exponent, plus 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp024
 */
sre.ClearspeakFrenchExponents.prototype.testExp024 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>2</mn><mrow><msup><mi>x</mi><mn>4' +
      '</mn></msup></mrow></msup></mrow></math>';
  var speech = '2 raised to the exponent, x to the fourth power, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp025
 */
sre.ClearspeakFrenchExponents.prototype.testExp025 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>2</mn><mrow><msup><mrow><mn>10</mn>' +
      '</mrow><mrow><mi>x</mi><mo>+</mo><mn>3</mn></mrow></msup></mrow>' +
      '</msup></mrow></math>';
  var speech = '2 raised to the exponent, 10 raised to the x plus 3 power,' +
      ' end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp026
 */
sre.ClearspeakFrenchExponents.prototype.testExp026 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mrow>' +
      '<mn>10</mn></mrow></msup></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, 3 to the tenth power, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp027
 */
sre.ClearspeakFrenchExponents.prototype.testExp027 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mrow>' +
      '<mn>10</mn></mrow></msup><mo>+</mo><mn>1</mn></mrow></msup></mrow>' +
      '</math>';
  var speech = '3 raised to the exponent, 3 to the tenth power, plus 1, end' +
      ' exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp028
 */
sre.ClearspeakFrenchExponents.prototype.testExp028 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mrow>' +
      '<mn>10</mn></mrow></msup></mrow></msup><mo>+</mo><mn>1</mn></mrow>' +
      '</math>';
  var speech = '3 raised to the exponent, 3 to the tenth power, end' +
      ' exponent, plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp029
 */
sre.ClearspeakFrenchExponents.prototype.testExp029 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mrow><mrow><mo>(' +
      '</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow>' +
      '</mrow><mn>2</mn></msup></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, open paren, x plus 1, close' +
      ' paren, squared, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp030
 */
sre.ClearspeakFrenchExponents.prototype.testExp030 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mrow><mrow><mo>(' +
      '</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow>' +
      '</mrow><mrow><mn>10</mn></mrow></msup></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, open paren, x plus 1, close' +
      ' paren, to the tenth power, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp031
 */
sre.ClearspeakFrenchExponents.prototype.testExp031 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mrow><mrow><mo>(' +
      '</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow>' +
      '</mrow><mrow><mi>y</mi><mo>+</mo><mn>2</mn></mrow></msup></mrow>' +
      '</msup></mrow></math>';
  var speech = '3 raised to the exponent, open paren, x plus 1, close' +
      ' paren, raised to the y plus 2 power, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp032
 */
sre.ClearspeakFrenchExponents.prototype.testExp032 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mrow><mrow><mo>(' +
      '</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow>' +
      '</mrow><mi>y</mi></msup><mo>+</mo><mn>2</mn></mrow></msup></mrow>' +
      '</math>';
  var speech = '3 raised to the exponent, open paren, x plus 1, close' +
      ' paren, to the yth power, plus 2, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp033
 */
sre.ClearspeakFrenchExponents.prototype.testExp033 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mrow><mrow><mo>(' +
      '</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow>' +
      '</mrow><mi>y</mi></msup></mrow></msup><mo>+</mo><mn>2</mn></mrow>' +
      '</math>';
  var speech = '3 raised to the exponent, open paren, x plus 1, close' +
      ' paren, to the yth power, end exponent, plus 2';
  this.executeRuleTest(mathml, speech, preference);
};


// TODO: (Simons) This does not work as semantically we have a -(xy) rather than
//       (-x)(y).
/**
 * Testing ClearspeakFrenchExponents Example Exp034
 */
sre.ClearspeakFrenchExponents.prototype.untestExp034 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mi>e</mi><mrow><mo>−</mo><mfrac><mn>1' +
      '</mn><mn>2</mn></mfrac><msup><mi>x</mi><mn>2</mn></msup></mrow>' +
      '</msup></mrow></math>';
  var speech = 'e raised to the negative one half, x squared power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp035
 */
sre.ClearspeakFrenchExponents.prototype.testExp035 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mi>e</mi><mrow><mo>−</mo><mfrac><mn>1' +
      '</mn><mn>2</mn></mfrac><msup><mrow><mrow><mo>(</mo><mrow><mfrac>' +
      '<mrow><mi>x</mi><mo>−</mo><mi>μ</mi></mrow><mi>σ</mi></mfrac></mrow>' +
      '<mo>)</mo></mrow></mrow><mn>2</mn></msup></mrow></msup></mrow></math>';
  var speech = 'e raised to the exponent, negative one half times, open' +
      ' paren, the fraction with numerator x minus mu, and denominator' +
      ' sigma, close paren, squared, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp036
 */
sre.ClearspeakFrenchExponents.prototype.testExp036 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>2</mn><mi>n</mi></msup></mrow></math>';
  var speech = '2 to the nth power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp037
 */
sre.ClearspeakFrenchExponents.prototype.testExp037 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>2</mn><mi>m</mi></msup></mrow></math>';
  var speech = '2 to the mth power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp038
 */
sre.ClearspeakFrenchExponents.prototype.testExp038 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>2</mn><mi>i</mi></msup></mrow></math>';
  var speech = '2 to the ith power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp039
 */
sre.ClearspeakFrenchExponents.prototype.testExp039 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>2</mn><mi>j</mi></msup></mrow></math>';
  var speech = '2 to the jth power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp40
 */
sre.ClearspeakFrenchExponents.prototype.testExp40 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>2</mn><mi>a</mi></msup></mrow></math>';
  var speech = '2 to the ath power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp041
 */
sre.ClearspeakFrenchExponents.prototype.testExp041 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mn>2</mn></msup></mrow></math>';
  var speech = '3 to the second';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp042
 */
sre.ClearspeakFrenchExponents.prototype.testExp042 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mn>3</mn></msup></mrow></math>';
  var speech = '3 to the third';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp043
 */
sre.ClearspeakFrenchExponents.prototype.testExp043 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mn>0</mn></msup></mrow></math>';
  var speech = '3 to the zero';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp044
 */
sre.ClearspeakFrenchExponents.prototype.testExp044 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mn>1</mn></msup></mrow></math>';
  var speech = '3 to the first';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp045
 */
sre.ClearspeakFrenchExponents.prototype.testExp045 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mn>5</mn></msup></mrow></math>';
  var speech = '3 to the fifth';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp046
 */
sre.ClearspeakFrenchExponents.prototype.testExp046 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>4</mn><mrow><mn>3.0</mn></mrow>' +
      '</msup></mrow></math>';
  var speech = '4 raised to the 3.0 power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp047
 */
sre.ClearspeakFrenchExponents.prototype.testExp047 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>4</mn><mrow><mn>11</mn></mrow></msup>' +
      '</mrow></math>';
  var speech = '4 to the eleventh';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp048
 */
sre.ClearspeakFrenchExponents.prototype.testExp048 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><mo>−</mo><mn>2</mn>' +
      '</mrow></msup></mrow></math>';
  var speech = '3 to the negative 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp049
 */
sre.ClearspeakFrenchExponents.prototype.testExp049 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><mo>−</mo><mn>2.0</mn>' +
      '</mrow></msup></mrow></math>';
  var speech = '3 raised to the negative 2.0 power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp050
 */
sre.ClearspeakFrenchExponents.prototype.testExp050 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>4</mn><mi>x</mi></msup></mrow></math>';
  var speech = '4 to the xth';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp051
 */
sre.ClearspeakFrenchExponents.prototype.testExp051 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><mi>y</mi><mo>+</mo><mn>2' +
      '</mn></mrow></msup></mrow></math>';
  var speech = '3 raised to the y plus 2 power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp052
 */
sre.ClearspeakFrenchExponents.prototype.testExp052 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mn>2</mn>' +
      '<mi>y</mi><mo>−</mo><mn>3</mn></mrow><mo>)</mo></mrow></mrow><mrow>' +
      '<mn>3</mn><mi>z</mi><mo>+</mo><mn>8</mn></mrow></msup></mrow></math>';
  var speech = 'open paren, 2 y, minus 3, close paren, raised to the 3 z,' +
      ' plus 8 power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp053
 */
sre.ClearspeakFrenchExponents.prototype.testExp053 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msub><mi>p</mi><mn>1</mn></msub><msup><mrow/>' +
      '<mn>2</mn></msup></mrow></math>';
  var speech = 'p sub 1, to the second';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp054
 */
sre.ClearspeakFrenchExponents.prototype.testExp054 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msub><mi>p</mi><mn>1</mn></msub><msup><mrow/>' +
      '<mn>3</mn></msup></mrow></math>';
  var speech = 'p sub 1, to the third';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp055
 */
sre.ClearspeakFrenchExponents.prototype.testExp055 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msub><mi>p</mi><mn>1</mn></msub><msup><mrow/>' +
      '<mn>4</mn></msup></mrow></math>';
  var speech = 'p sub 1, to the fourth';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp056
 */
sre.ClearspeakFrenchExponents.prototype.testExp056 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msub><mi>p</mi><mn>1</mn></msub><msup><mrow/>' +
      '<mrow><mn>10</mn></mrow></msup></mrow></math>';
  var speech = 'p sub 1, to the tenth';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp057
 */
sre.ClearspeakFrenchExponents.prototype.testExp057 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msub><mi>p</mi><mn>1</mn></msub><msup><mrow/>' +
      '<mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow></msup></mrow></math>';
  var speech = 'p sub 1, raised to the x plus 1 power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp058
 */
sre.ClearspeakFrenchExponents.prototype.testExp058 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msub><mi>p</mi><mrow><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow></msub><msup><mrow/><mn>2</mn></msup></mrow></math>';
  var speech = 'p sub, x sub 1, to the second';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp059
 */
sre.ClearspeakFrenchExponents.prototype.testExp059 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msub><mi>p</mi><mrow><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow></msub><msup><mrow/><mn>3</mn></msup></mrow></math>';
  var speech = 'p sub, x sub 1, to the third';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp060
 */
sre.ClearspeakFrenchExponents.prototype.testExp060 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msub><mi>p</mi><mrow><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow></msub><msup><mrow/><mn>4</mn></msup></mrow></math>';
  var speech = 'p sub, x sub 1, to the fourth';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp061
 */
sre.ClearspeakFrenchExponents.prototype.testExp061 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msub><mi>p</mi><mrow><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow></msub><msup><mrow/><mrow><mn>10</mn></mrow>' +
      '</msup></mrow></math>';
  var speech = 'p sub, x sub 1, to the tenth';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp062
 */
sre.ClearspeakFrenchExponents.prototype.testExp062 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msub><mi>p</mi><mrow><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow></msub><msup><mrow/><mrow><mi>y</mi><mo>+</mo>' +
      '<mn>1</mn></mrow></msup></mrow></math>';
  var speech = 'p sub, x sub 1, raised to the y plus 1 power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp063
 */
sre.ClearspeakFrenchExponents.prototype.testExp063 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>2</mn><mn>2' +
      '</mn></msup></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, 2 to the second, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp064
 */
sre.ClearspeakFrenchExponents.prototype.testExp064 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><mn>2</mn><msup><mi>x' +
      '</mi><mn>2</mn></msup></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, 2 x to the second, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp065
 */
sre.ClearspeakFrenchExponents.prototype.testExp065 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>5</mn><mrow><msup><mn>2</mn><mn>3' +
      '</mn></msup></mrow></msup></mrow></math>';
  var speech = '5 raised to the exponent, 2 to the third, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp066
 */
sre.ClearspeakFrenchExponents.prototype.testExp066 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>5</mn><mrow><mn>2</mn><msup><mi>x' +
      '</mi><mn>3</mn></msup></mrow></msup></mrow></math>';
  var speech = '5 raised to the exponent, 2 x to the third, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp067
 */
sre.ClearspeakFrenchExponents.prototype.testExp067 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>2</mn><mn>2' +
      '</mn></msup><mo>+</mo><mn>1</mn></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, 2 to the second, plus 1, end' +
      ' exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp068
 */
sre.ClearspeakFrenchExponents.prototype.testExp068 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>2</mn><mn>2' +
      '</mn></msup></mrow></msup><mo>+</mo><mn>1</mn></mrow></math>';
  var speech = '3 raised to the exponent, 2 to the second, end exponent,' +
      ' plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp069
 */
sre.ClearspeakFrenchExponents.prototype.testExp069 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>2</mn><mrow><msup><mi>x</mi><mn>2' +
      '</mn></msup><mo>+</mo><mn>3</mn><msup><mi>x</mi><mn>3</mn></msup>' +
      '</mrow></msup></mrow></math>';
  var speech = '2 raised to the exponent, x to the second, plus 3 x to the' +
      ' third, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp070
 */
sre.ClearspeakFrenchExponents.prototype.testExp070 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mn>4' +
      '</mn></msup></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, 3 to the fourth, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp071
 */
sre.ClearspeakFrenchExponents.prototype.testExp071 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mn>4' +
      '</mn></msup><mo>+</mo><mn>2</mn></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, 3 to the fourth, plus 2, end' +
      ' exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp072
 */
sre.ClearspeakFrenchExponents.prototype.testExp072 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mn>4' +
      '</mn></msup></mrow></msup><mo>+</mo><mn>2</mn></mrow></math>';
  var speech = '3 raised to the exponent, 3 to the fourth, end exponent,' +
      ' plus 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp073
 */
sre.ClearspeakFrenchExponents.prototype.testExp073 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>2</mn><mrow><msup><mi>x</mi><mn>4' +
      '</mn></msup></mrow></msup></mrow></math>';
  var speech = '2 raised to the exponent, x to the fourth, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp074
 */
sre.ClearspeakFrenchExponents.prototype.testExp074 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>2</mn><mrow><msup><mrow><mn>10</mn>' +
      '</mrow><mrow><mi>x</mi><mo>+</mo><mn>3</mn></mrow></msup></mrow>' +
      '</msup></mrow></math>';
  var speech = '2 raised to the exponent, 10 raised to the x plus 3 power,' +
      ' end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp075
 */
sre.ClearspeakFrenchExponents.prototype.testExp075 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mrow>' +
      '<mn>10</mn></mrow></msup></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, 3 to the tenth, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp076
 */
sre.ClearspeakFrenchExponents.prototype.testExp076 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mrow>' +
      '<mn>10</mn></mrow></msup><mo>+</mo><mn>1</mn></mrow></msup></mrow>' +
      '</math>';
  var speech = '3 raised to the exponent, 3 to the tenth, plus 1, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp077
 */
sre.ClearspeakFrenchExponents.prototype.testExp077 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mrow>' +
      '<mn>10</mn></mrow></msup></mrow></msup><mo>+</mo><mn>1</mn></mrow>' +
      '</math>';
  var speech = '3 raised to the exponent, 3 to the tenth, end exponent, plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp078
 */
sre.ClearspeakFrenchExponents.prototype.testExp078 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mrow><mrow><mo>(' +
      '</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow>' +
      '</mrow><mn>2</mn></msup></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, open paren, x plus 1, close' +
      ' paren, to the second, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp079
 */
sre.ClearspeakFrenchExponents.prototype.testExp079 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mrow><mrow><mo>(' +
      '</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow>' +
      '</mrow><mrow><mn>10</mn></mrow></msup></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, open paren, x plus 1, close' +
      ' paren, to the tenth, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp080
 */
sre.ClearspeakFrenchExponents.prototype.testExp080 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mrow><mrow><mo>(' +
      '</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow>' +
      '</mrow><mrow><mi>y</mi><mo>+</mo><mn>2</mn></mrow></msup></mrow>' +
      '</msup></mrow></math>';
  var speech = '3 raised to the exponent, open paren, x plus 1, close' +
      ' paren, raised to the y plus 2 power, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp081
 */
sre.ClearspeakFrenchExponents.prototype.testExp081 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mrow><mrow><mo>(' +
      '</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow>' +
      '</mrow><mi>y</mi></msup><mo>+</mo><mn>2</mn></mrow></msup></mrow>' +
      '</math>';
  var speech = '3 raised to the exponent, open paren, x plus 1, close' +
      ' paren, to the yth, plus 2, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp082
 */
sre.ClearspeakFrenchExponents.prototype.testExp082 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mrow><mrow><mo>(' +
      '</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow>' +
      '</mrow><mi>y</mi></msup></mrow></msup><mo>+</mo><mn>2</mn></mrow>' +
      '</math>';
  var speech = '3 raised to the exponent, open paren, x plus 1, close' +
      ' paren, to the yth, end exponent, plus 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp083
 */
sre.ClearspeakFrenchExponents.prototype.testExp083 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mi>e</mi><mrow><mo>−</mo><mfrac><mn>1' +
      '</mn><mn>2</mn></mfrac><msup><mi>x</mi><mn>2</mn></msup></mrow>' +
      '</msup></mrow></math>';
  var speech = 'e raised to the exponent, negative one half x to the' +
      ' second, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp084
 */
sre.ClearspeakFrenchExponents.prototype.testExp084 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mi>e</mi><mrow><mo>−</mo><mfrac><mn>1' +
      '</mn><mn>2</mn></mfrac><msup><mrow><mrow><mo>(</mo><mrow><mfrac>' +
      '<mrow><mi>x</mi><mo>−</mo><mi>μ</mi></mrow><mi>σ</mi></mfrac></mrow>' +
      '<mo>)</mo></mrow></mrow><mn>2</mn></msup></mrow></msup></mrow></math>';
  var speech = 'e raised to the exponent, negative one half times, open' +
      ' paren, the fraction with numerator x minus mu, and denominator' +
      ' sigma, close paren, to the second, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};




/**
 * Testing ClearspeakFrenchExponents Example Exp036
 */
sre.ClearspeakFrenchExponents.prototype.testExp036a = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>2</mn><mi>n</mi></msup></mrow></math>';
  var speech = '2 to the nth power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp037
 */
sre.ClearspeakFrenchExponents.prototype.testExp037a = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>2</mn><mi>m</mi></msup></mrow></math>';
  var speech = '2 to the mth power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp038
 */
sre.ClearspeakFrenchExponents.prototype.testExp038a = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>2</mn><mi>i</mi></msup></mrow></math>';
  var speech = '2 to the ith power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp039
 */
sre.ClearspeakFrenchExponents.prototype.testExp039a = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>2</mn><mi>j</mi></msup></mrow></math>';
  var speech = '2 to the jth power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp40
 */
sre.ClearspeakFrenchExponents.prototype.testExp40a = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>2</mn><mi>a</mi></msup></mrow></math>';
  var speech = '2 to the ath power';
  this.executeRuleTest(mathml, speech, preference);
};

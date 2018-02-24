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


goog.provide('sre.ClearspeakExponents');

goog.require('sre.ClearspeakRuleTest');



/**
* @constructor
* @extends {sre.ClearspeakRuleTest}
*/
sre.ClearspeakExponents = function() {
  sre.ClearspeakExponents.base(this, 'constructor');

  /**
* @override
  */
  this.information = 'ClearspeakExponents rule tests.';

};
goog.inherits(sre.ClearspeakExponents, sre.ClearspeakRuleTest);



//
// Exponents
//


/**
 * Testing ClearspeakExponents Example Exp001
 */
sre.ClearspeakExponents.prototype.testExp001 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mn>2</mn></msup></mrow></math>';
  var speech = '3 squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp002a
 */
sre.ClearspeakExponents.prototype.testExp002a = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mn>3</mn></msup></mrow></math>';
  var speech = '3 cubed';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp003
 */
sre.ClearspeakExponents.prototype.testExp003 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mn>5</mn></msup></mrow></math>';
  var speech = '3 to the fifth power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp004
 */
sre.ClearspeakExponents.prototype.testExp004 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mn>1</mn></msup></mrow></math>';
  var speech = '3 to the first power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp005
 */
sre.ClearspeakExponents.prototype.testExp005 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mi>b</mi><mn>1</mn></msup></mrow></math>';
  var speech = 'b to the first power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp006
 */
sre.ClearspeakExponents.prototype.testExp006 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><mn>5.0</mn></mrow>' +
      '</msup></mrow></math>';
  var speech = '3 raised to the 5.0 power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp007
 */
sre.ClearspeakExponents.prototype.testExp007 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mn>0</mn></msup></mrow></math>';
  var speech = '3 to the 0 power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp008
 */
sre.ClearspeakExponents.prototype.testExp008 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>4</mn><mrow><mn>11</mn></mrow></msup>' +
      '</mrow></math>';
  var speech = '4 to the 11th power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp009
 */
sre.ClearspeakExponents.prototype.testExp009 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><mo>−</mo><mn>2</mn>' +
      '</mrow></msup></mrow></math>';
  var speech = '3 to the negative 2 power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp010a
 */
sre.ClearspeakExponents.prototype.testExp010a = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><mo>−</mo><mn>2.0</mn>' +
      '</mrow></msup></mrow></math>';
  var speech = '3 raised to the negative 2.0 power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp011
 */
sre.ClearspeakExponents.prototype.testExp011 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>4</mn><mi>x</mi></msup></mrow></math>';
  var speech = '4 to the xth power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp012
 */
sre.ClearspeakExponents.prototype.testExp012 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><mi>y</mi><mo>+</mo><mn>2' +
      '</mn></mrow></msup></mrow></math>';
  var speech = '3 raised to the y plus 2 power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp013
 */
sre.ClearspeakExponents.prototype.testExp013 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mn>2</mn>' +
      '<mi>y</mi><mo>−</mo><mn>3</mn></mrow><mo>)</mo></mrow></mrow><mrow>' +
      '<mn>3</mn><mi>z</mi><mo>+</mo><mn>8</mn></mrow></msup></mrow></math>';
  var speech = 'open paren, 2 y, minus 3, close paren, raised to the 3 z,' +
      ' plus 8 power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp014
 */
sre.ClearspeakExponents.prototype.testExp014 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msubsup><mi>p</mi><mn>1</mn><mn>2</mn>' +
      '</msubsup></mrow></math>';
  var speech = 'p sub 1, squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp015
 */
sre.ClearspeakExponents.prototype.testExp015 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msubsup><mi>p</mi><mn>1</mn><mn>3</mn>' +
      '</msubsup></mrow></math>';
  var speech = 'p sub 1, cubed';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp016
 */
sre.ClearspeakExponents.prototype.testExp016 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msubsup><mi>p</mi><mn>1</mn><mn>4</mn>' +
      '</msubsup></mrow></math>';
  var speech = 'p sub 1, to the fourth power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp017
 */
sre.ClearspeakExponents.prototype.testExp017 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msubsup><mi>p</mi><mn>1</mn><mrow><mn>10</mn>' +
      '</mrow></msubsup></mrow></math>';
  var speech = 'p sub 1, to the tenth power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp018
 */
sre.ClearspeakExponents.prototype.testExp018 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msubsup><mi>p</mi><mn>1</mn><mrow><mi>x</mi>' +
      '<mo>+</mo><mn>1</mn></mrow></msubsup></mrow></math>';
  var speech = 'p sub 1, raised to the x plus 1 power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp019
 */
sre.ClearspeakExponents.prototype.testExp019 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msubsup><mi>p</mi><mrow><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow><mn>2</mn></msubsup></mrow></math>';
  var speech = 'p sub, x sub 1, squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp010b
 */
sre.ClearspeakExponents.prototype.testExp010b = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msubsup><mi>p</mi><mrow><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow><mn>3</mn></msubsup></mrow></math>';
  var speech = 'p sub, x sub 1, cubed';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp011b
 */
sre.ClearspeakExponents.prototype.testExp011b = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msubsup><mi>p</mi><mrow><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow><mn>4</mn></msubsup></mrow></math>';
  var speech = 'p sub, x sub 1, to the fourth power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp012b
 */
sre.ClearspeakExponents.prototype.testExp012b = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msubsup><mi>p</mi><mrow><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow><mrow><mn>10</mn></mrow></msubsup></mrow></math>';
  var speech = 'p sub, x sub 1, to the tenth power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp013b
 */
sre.ClearspeakExponents.prototype.testExp013b = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msubsup><mi>p</mi><mrow><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow><mrow><mi>y</mi><mo>+</mo><mn>1</mn></mrow>' +
      '</msubsup></mrow></math>';
  var speech = 'p sub, x sub 1, raised to the y plus 1 power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp014b
 */
sre.ClearspeakExponents.prototype.testExp014b = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>2</mn><mn>2' +
      '</mn></msup></mrow></msup></mrow></math>';
  var speech = '3 raised to the 2 squared power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp015b
 */
sre.ClearspeakExponents.prototype.testExp015b = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><mn>2</mn><msup><mi>x' +
      '</mi><mn>2</mn></msup></mrow></msup></mrow></math>';
  var speech = '3 raised to the 2 x squared power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp016b
 */
sre.ClearspeakExponents.prototype.testExp016b = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>5</mn><mrow><msup><mn>2</mn><mn>3' +
      '</mn></msup></mrow></msup></mrow></math>';
  var speech = '5 raised to the 2 cubed power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp017b
 */
sre.ClearspeakExponents.prototype.testExp017b = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>5</mn><mrow><mn>2</mn><msup><mi>x' +
      '</mi><mn>3</mn></msup></mrow></msup></mrow></math>';
  var speech = '5 raised to the 2 x cubed power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp018b
 */
sre.ClearspeakExponents.prototype.testExp018b = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>2</mn><mn>2' +
      '</mn></msup><mo>+</mo><mn>1</mn></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, 2 squared plus 1, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp019b
 */
sre.ClearspeakExponents.prototype.testExp019b = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>2</mn><mn>2' +
      '</mn></msup></mrow></msup><mo>+</mo><mn>1</mn></mrow></math>';
  var speech = '3 raised to the 2 squared power, plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp020
 */
sre.ClearspeakExponents.prototype.testExp020 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>2</mn><mrow><msup><mi>x</mi><mn>2' +
      '</mn></msup><mo>+</mo><mn>3</mn><msup><mi>x</mi><mn>3</mn></msup>' +
      '</mrow></msup></mrow></math>';
  var speech = '2 raised to the exponent, x squared plus 3 x cubed, end' +
      ' exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp021
 */
sre.ClearspeakExponents.prototype.testExp021 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mn>4' +
      '</mn></msup></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, 3 to the fourth power, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp022
 */
sre.ClearspeakExponents.prototype.testExp022 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mn>4' +
      '</mn></msup><mo>+</mo><mn>2</mn></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, 3 to the fourth power, plus 2,' +
      ' end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp023
 */
sre.ClearspeakExponents.prototype.testExp023 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mn>4' +
      '</mn></msup></mrow></msup><mo>+</mo><mn>2</mn></mrow></math>';
  var speech = '3 raised to the exponent, 3 to the fourth power, end' +
      ' exponent, plus 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp024
 */
sre.ClearspeakExponents.prototype.testExp024 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>2</mn><mrow><msup><mi>x</mi><mn>4' +
      '</mn></msup></mrow></msup></mrow></math>';
  var speech = '2 raised to the exponent, x to the fourth power, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp025
 */
sre.ClearspeakExponents.prototype.testExp025 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>2</mn><mrow><msup><mrow><mn>10</mn>' +
      '</mrow><mrow><mi>x</mi><mo>+</mo><mn>3</mn></mrow></msup></mrow>' +
      '</msup></mrow></math>';
  var speech = '2 raised to the exponent, 10 raised to the x plus 3 power,' +
      ' end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp026
 */
sre.ClearspeakExponents.prototype.testExp026 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mrow>' +
      '<mn>10</mn></mrow></msup></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, 3 to the tenth power, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp027
 */
sre.ClearspeakExponents.prototype.testExp027 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mrow>' +
      '<mn>10</mn></mrow></msup><mo>+</mo><mn>1</mn></mrow></msup></mrow>' +
      '</math>';
  var speech = '3 raised to the exponent, 3 to the tenth power, plus 1, end' +
      ' exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp028
 */
sre.ClearspeakExponents.prototype.testExp028 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mrow>' +
      '<mn>10</mn></mrow></msup></mrow></msup><mo>+</mo><mn>1</mn></mrow>' +
      '</math>';
  var speech = '3 raised to the exponent, 3 to the tenth power, end' +
      ' exponent, plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp029
 */
sre.ClearspeakExponents.prototype.testExp029 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mrow><mrow><mo>(' +
      '</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow>' +
      '</mrow><mn>2</mn></msup></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, open paren, x plus 1, close' +
      ' paren, squared, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp030
 */
sre.ClearspeakExponents.prototype.testExp030 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mrow><mrow><mo>(' +
      '</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow>' +
      '</mrow><mrow><mn>10</mn></mrow></msup></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, open paren, x plus 1, close' +
      ' paren, to the tenth power, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp031
 */
sre.ClearspeakExponents.prototype.testExp031 = function() {
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
 * Testing ClearspeakExponents Example Exp032
 */
sre.ClearspeakExponents.prototype.testExp032 = function() {
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
 * Testing ClearspeakExponents Example Exp033
 */
sre.ClearspeakExponents.prototype.testExp033 = function() {
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
 * Testing ClearspeakExponents Example Exp034
 */
sre.ClearspeakExponents.prototype.untestExp034 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mi>e</mi><mrow><mo>−</mo><mfrac><mn>1' +
      '</mn><mn>2</mn></mfrac><msup><mi>x</mi><mn>2</mn></msup></mrow>' +
      '</msup></mrow></math>';
  var speech = 'e raised to the negative one half, x squared power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp035
 */
sre.ClearspeakExponents.prototype.testExp035 = function() {
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
 * Testing ClearspeakExponents Example Exp036
 */
sre.ClearspeakExponents.prototype.testExp036 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>2</mn><mi>n</mi></msup></mrow></math>';
  var speech = '2 to the nth power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp037
 */
sre.ClearspeakExponents.prototype.testExp037 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>2</mn><mi>m</mi></msup></mrow></math>';
  var speech = '2 to the mth power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp038
 */
sre.ClearspeakExponents.prototype.testExp038 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>2</mn><mi>i</mi></msup></mrow></math>';
  var speech = '2 to the ith power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp039
 */
sre.ClearspeakExponents.prototype.testExp039 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>2</mn><mi>j</mi></msup></mrow></math>';
  var speech = '2 to the jth power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp40
 */
sre.ClearspeakExponents.prototype.testExp40 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>2</mn><mi>a</mi></msup></mrow></math>';
  var speech = '2 to the ath power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp041
 */
sre.ClearspeakExponents.prototype.testExp041 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mn>2</mn></msup></mrow></math>';
  var speech = '3 to the second';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp042
 */
sre.ClearspeakExponents.prototype.testExp042 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mn>3</mn></msup></mrow></math>';
  var speech = '3 to the third';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp043
 */
sre.ClearspeakExponents.prototype.testExp043 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mn>0</mn></msup></mrow></math>';
  var speech = '3 to the zero';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp044
 */
sre.ClearspeakExponents.prototype.testExp044 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mn>1</mn></msup></mrow></math>';
  var speech = '3 to the first';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp045
 */
sre.ClearspeakExponents.prototype.testExp045 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mn>5</mn></msup></mrow></math>';
  var speech = '3 to the fifth';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp046
 */
sre.ClearspeakExponents.prototype.testExp046 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>4</mn><mrow><mn>3.0</mn></mrow>' +
      '</msup></mrow></math>';
  var speech = '4 raised to the 3.0 power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp047
 */
sre.ClearspeakExponents.prototype.testExp047 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>4</mn><mrow><mn>11</mn></mrow></msup>' +
      '</mrow></math>';
  var speech = '4 to the eleventh';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp048
 */
sre.ClearspeakExponents.prototype.testExp048 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><mo>−</mo><mn>2</mn>' +
      '</mrow></msup></mrow></math>';
  var speech = '3 to the negative 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp049
 */
sre.ClearspeakExponents.prototype.testExp049 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><mo>−</mo><mn>2.0</mn>' +
      '</mrow></msup></mrow></math>';
  var speech = '3 raised to the negative 2.0 power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp050
 */
sre.ClearspeakExponents.prototype.testExp050 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>4</mn><mi>x</mi></msup></mrow></math>';
  var speech = '4 to the xth';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp051
 */
sre.ClearspeakExponents.prototype.testExp051 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><mi>y</mi><mo>+</mo><mn>2' +
      '</mn></mrow></msup></mrow></math>';
  var speech = '3 raised to the y plus 2 power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp052
 */
sre.ClearspeakExponents.prototype.testExp052 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mn>2</mn>' +
      '<mi>y</mi><mo>−</mo><mn>3</mn></mrow><mo>)</mo></mrow></mrow><mrow>' +
      '<mn>3</mn><mi>z</mi><mo>+</mo><mn>8</mn></mrow></msup></mrow></math>';
  var speech = 'open paren, 2 y, minus 3, close paren, raised to the 3 z,' +
      ' plus 8 power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp053
 */
sre.ClearspeakExponents.prototype.testExp053 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msub><mi>p</mi><mn>1</mn></msub><msup><mrow/>' +
      '<mn>2</mn></msup></mrow></math>';
  var speech = 'p sub 1, to the second';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp054
 */
sre.ClearspeakExponents.prototype.testExp054 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msub><mi>p</mi><mn>1</mn></msub><msup><mrow/>' +
      '<mn>3</mn></msup></mrow></math>';
  var speech = 'p sub 1, to the third';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp055
 */
sre.ClearspeakExponents.prototype.testExp055 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msub><mi>p</mi><mn>1</mn></msub><msup><mrow/>' +
      '<mn>4</mn></msup></mrow></math>';
  var speech = 'p sub 1, to the fourth';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp056
 */
sre.ClearspeakExponents.prototype.testExp056 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msub><mi>p</mi><mn>1</mn></msub><msup><mrow/>' +
      '<mrow><mn>10</mn></mrow></msup></mrow></math>';
  var speech = 'p sub 1, to the tenth';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp057
 */
sre.ClearspeakExponents.prototype.testExp057 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msub><mi>p</mi><mn>1</mn></msub><msup><mrow/>' +
      '<mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow></msup></mrow></math>';
  var speech = 'p sub 1, raised to the x plus 1 power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp058
 */
sre.ClearspeakExponents.prototype.testExp058 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msub><mi>p</mi><mrow><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow></msub><msup><mrow/><mn>2</mn></msup></mrow></math>';
  var speech = 'p sub, x sub 1, to the second';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp059
 */
sre.ClearspeakExponents.prototype.testExp059 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msub><mi>p</mi><mrow><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow></msub><msup><mrow/><mn>3</mn></msup></mrow></math>';
  var speech = 'p sub, x sub 1, to the third';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp060
 */
sre.ClearspeakExponents.prototype.testExp060 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msub><mi>p</mi><mrow><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow></msub><msup><mrow/><mn>4</mn></msup></mrow></math>';
  var speech = 'p sub, x sub 1, to the fourth';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp061
 */
sre.ClearspeakExponents.prototype.testExp061 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msub><mi>p</mi><mrow><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow></msub><msup><mrow/><mrow><mn>10</mn></mrow>' +
      '</msup></mrow></math>';
  var speech = 'p sub, x sub 1, to the tenth';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp062
 */
sre.ClearspeakExponents.prototype.testExp062 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msub><mi>p</mi><mrow><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow></msub><msup><mrow/><mrow><mi>y</mi><mo>+</mo>' +
      '<mn>1</mn></mrow></msup></mrow></math>';
  var speech = 'p sub, x sub 1, raised to the y plus 1 power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp063
 */
sre.ClearspeakExponents.prototype.testExp063 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>2</mn><mn>2' +
      '</mn></msup></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, 2 to the second, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp064
 */
sre.ClearspeakExponents.prototype.testExp064 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><mn>2</mn><msup><mi>x' +
      '</mi><mn>2</mn></msup></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, 2 x to the second, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp065
 */
sre.ClearspeakExponents.prototype.testExp065 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>5</mn><mrow><msup><mn>2</mn><mn>3' +
      '</mn></msup></mrow></msup></mrow></math>';
  var speech = '5 raised to the exponent, 2 to the third, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp066
 */
sre.ClearspeakExponents.prototype.testExp066 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>5</mn><mrow><mn>2</mn><msup><mi>x' +
      '</mi><mn>3</mn></msup></mrow></msup></mrow></math>';
  var speech = '5 raised to the exponent, 2 x to the third, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp067
 */
sre.ClearspeakExponents.prototype.testExp067 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>2</mn><mn>2' +
      '</mn></msup><mo>+</mo><mn>1</mn></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, 2 to the second, plus 1, end' +
      ' exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp068
 */
sre.ClearspeakExponents.prototype.testExp068 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>2</mn><mn>2' +
      '</mn></msup></mrow></msup><mo>+</mo><mn>1</mn></mrow></math>';
  var speech = '3 raised to the exponent, 2 to the second, end exponent,' +
      ' plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp069
 */
sre.ClearspeakExponents.prototype.testExp069 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>2</mn><mrow><msup><mi>x</mi><mn>2' +
      '</mn></msup><mo>+</mo><mn>3</mn><msup><mi>x</mi><mn>3</mn></msup>' +
      '</mrow></msup></mrow></math>';
  var speech = '2 raised to the exponent, x to the second, plus 3 x to the' +
      ' third, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp070
 */
sre.ClearspeakExponents.prototype.testExp070 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mn>4' +
      '</mn></msup></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, 3 to the fourth, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp071
 */
sre.ClearspeakExponents.prototype.testExp071 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mn>4' +
      '</mn></msup><mo>+</mo><mn>2</mn></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, 3 to the fourth, plus 2, end' +
      ' exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp072
 */
sre.ClearspeakExponents.prototype.testExp072 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mn>4' +
      '</mn></msup></mrow></msup><mo>+</mo><mn>2</mn></mrow></math>';
  var speech = '3 raised to the exponent, 3 to the fourth, end exponent,' +
      ' plus 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp073
 */
sre.ClearspeakExponents.prototype.testExp073 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>2</mn><mrow><msup><mi>x</mi><mn>4' +
      '</mn></msup></mrow></msup></mrow></math>';
  var speech = '2 raised to the exponent, x to the fourth, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp074
 */
sre.ClearspeakExponents.prototype.testExp074 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>2</mn><mrow><msup><mrow><mn>10</mn>' +
      '</mrow><mrow><mi>x</mi><mo>+</mo><mn>3</mn></mrow></msup></mrow>' +
      '</msup></mrow></math>';
  var speech = '2 raised to the exponent, 10 raised to the x plus 3 power,' +
      ' end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp075
 */
sre.ClearspeakExponents.prototype.testExp075 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mrow>' +
      '<mn>10</mn></mrow></msup></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, 3 to the tenth, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp076
 */
sre.ClearspeakExponents.prototype.testExp076 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mrow>' +
      '<mn>10</mn></mrow></msup><mo>+</mo><mn>1</mn></mrow></msup></mrow>' +
      '</math>';
  var speech = '3 raised to the exponent, 3 to the tenth, plus 1, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp077
 */
sre.ClearspeakExponents.prototype.testExp077 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mrow>' +
      '<mn>10</mn></mrow></msup></mrow></msup><mo>+</mo><mn>1</mn></mrow>' +
      '</math>';
  var speech = '3 raised to the exponent, 3 to the tenth, end exponent, plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp078
 */
sre.ClearspeakExponents.prototype.testExp078 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mrow><mrow><mo>(' +
      '</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow>' +
      '</mrow><mn>2</mn></msup></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, open paren, x plus 1, close' +
      ' paren, to the second, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp079
 */
sre.ClearspeakExponents.prototype.testExp079 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mrow><mrow><mo>(' +
      '</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow>' +
      '</mrow><mrow><mn>10</mn></mrow></msup></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, open paren, x plus 1, close' +
      ' paren, to the tenth, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp080
 */
sre.ClearspeakExponents.prototype.testExp080 = function() {
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
 * Testing ClearspeakExponents Example Exp081
 */
sre.ClearspeakExponents.prototype.testExp081 = function() {
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
 * Testing ClearspeakExponents Example Exp082
 */
sre.ClearspeakExponents.prototype.testExp082 = function() {
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
 * Testing ClearspeakExponents Example Exp083
 */
sre.ClearspeakExponents.prototype.testExp083 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mi>e</mi><mrow><mo>−</mo><mfrac><mn>1' +
      '</mn><mn>2</mn></mfrac><msup><mi>x</mi><mn>2</mn></msup></mrow>' +
      '</msup></mrow></math>';
  var speech = 'e raised to the exponent, negative one half x to the' +
      ' second, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp084
 */
sre.ClearspeakExponents.prototype.testExp084 = function() {
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
 * Testing ClearspeakExponents Example Exp085
 */
sre.ClearspeakExponents.prototype.testExp085 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mn>2</mn></msup></mrow></math>';
  var speech = '3 to the second power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp086
 */
sre.ClearspeakExponents.prototype.testExp086 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mn>3</mn></msup></mrow></math>';
  var speech = '3 to the third power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp087
 */
sre.ClearspeakExponents.prototype.testExp087 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mn>0</mn></msup></mrow></math>';
  var speech = '3 to the zero power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp088
 */
sre.ClearspeakExponents.prototype.testExp088 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mn>1</mn></msup></mrow></math>';
  var speech = '3 to the first power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp089
 */
sre.ClearspeakExponents.prototype.testExp089 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mn>5</mn></msup></mrow></math>';
  var speech = '3 to the fifth power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp090
 */
sre.ClearspeakExponents.prototype.testExp090 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><mn>5.0</mn></mrow>' +
      '</msup></mrow></math>';
  var speech = '3 raised to the 5.0 power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp091
 */
sre.ClearspeakExponents.prototype.testExp091 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>4</mn><mrow><mn>11</mn></mrow></msup>' +
      '</mrow></math>';
  var speech = '4 to the eleventh power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp092
 */
sre.ClearspeakExponents.prototype.testExp092 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><mo>−</mo><mn>2</mn>' +
      '</mrow></msup></mrow></math>';
  var speech = '3 to the negative 2 power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp093
 */
sre.ClearspeakExponents.prototype.testExp093 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><mo>−</mo><mn>2.0</mn>' +
      '</mrow></msup></mrow></math>';
  var speech = '3 raised to the negative 2.0 power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp094
 */
sre.ClearspeakExponents.prototype.testExp094 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>4</mn><mi>x</mi></msup></mrow></math>';
  var speech = '4 to the xth power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp095
 */
sre.ClearspeakExponents.prototype.testExp095 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><mi>y</mi><mo>+</mo><mn>2' +
      '</mn></mrow></msup></mrow></math>';
  var speech = '3 raised to the y plus 2 power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp096
 */
sre.ClearspeakExponents.prototype.testExp096 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mn>2</mn>' +
      '<mi>y</mi><mo>−</mo><mn>3</mn></mrow><mo>)</mo></mrow></mrow><mrow>' +
      '<mn>3</mn><mi>z</mi><mo>+</mo><mn>8</mn></mrow></msup></mrow></math>';
  var speech = 'open paren, 2 y, minus 3, close paren, raised to the 3 z,' +
      ' plus 8 power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp097
 */
sre.ClearspeakExponents.prototype.testExp097 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msub><mi>p</mi><mn>1</mn></msub><msup><mrow/>' +
      '<mn>2</mn></msup></mrow></math>';
  var speech = 'p sub 1, to the second power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp098
 */
sre.ClearspeakExponents.prototype.testExp098 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msub><mi>p</mi><mn>1</mn></msub><msup><mrow/>' +
      '<mn>3</mn></msup></mrow></math>';
  var speech = 'p sub 1, to the third power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp099
 */
sre.ClearspeakExponents.prototype.testExp099 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msub><mi>p</mi><mn>1</mn></msub><msup><mrow/>' +
      '<mn>4</mn></msup></mrow></math>';
  var speech = 'p sub 1, to the fourth power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp100
 */
sre.ClearspeakExponents.prototype.testExp100 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msub><mi>p</mi><mn>1</mn></msub><msup><mrow/>' +
      '<mrow><mn>10</mn></mrow></msup></mrow></math>';
  var speech = 'p sub 1, to the tenth power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp101
 */
sre.ClearspeakExponents.prototype.testExp101 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msub><mi>p</mi><mn>1</mn></msub><msup><mrow/>' +
      '<mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow></msup></mrow></math>';
  var speech = 'p sub 1, raised to the x plus 1 power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp102
 */
sre.ClearspeakExponents.prototype.testExp102 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msub><mi>p</mi><mrow><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow></msub><msup><mrow/><mn>2</mn></msup></mrow></math>';
  var speech = 'p sub, x sub 1, to the second power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp103
 */
sre.ClearspeakExponents.prototype.testExp103 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msub><mi>p</mi><mrow><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow></msub><msup><mrow/><mn>3</mn></msup></mrow></math>';
  var speech = 'p sub, x sub 1, to the third power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp104
 */
sre.ClearspeakExponents.prototype.testExp104 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msub><mi>p</mi><mrow><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow></msub><msup><mrow/><mn>4</mn></msup></mrow></math>';
  var speech = 'p sub, x sub 1, to the fourth power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp105
 */
sre.ClearspeakExponents.prototype.testExp105 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msub><mi>p</mi><mrow><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow></msub><msup><mrow/><mrow><mn>10</mn></mrow>' +
      '</msup></mrow></math>';
  var speech = 'p sub, x sub 1, to the tenth power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp106
 */
sre.ClearspeakExponents.prototype.testExp106 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msub><mi>p</mi><mrow><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow></msub><msup><mrow/><mrow><mi>y</mi><mo>+</mo>' +
      '<mn>1</mn></mrow></msup></mrow></math>';
  var speech = 'p sub, x sub 1, raised to the y plus 1 power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp107
 */
sre.ClearspeakExponents.prototype.testExp107 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>2</mn><mn>2' +
      '</mn></msup></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, 2 to the second power, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp108
 */
sre.ClearspeakExponents.prototype.testExp108 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><mn>2</mn><msup><mi>x' +
      '</mi><mn>2</mn></msup></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, 2 x to the second power, end' +
      ' exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp109
 */
sre.ClearspeakExponents.prototype.testExp109 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>5</mn><mrow><msup><mn>2</mn><mn>3' +
      '</mn></msup></mrow></msup></mrow></math>';
  var speech = '5 raised to the exponent, 2 to the third power, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp110
 */
sre.ClearspeakExponents.prototype.testExp110 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>5</mn><mrow><mn>2</mn><msup><mi>x' +
      '</mi><mn>3</mn></msup></mrow></msup></mrow></math>';
  var speech = '5 raised to the exponent, 2 x to the third power, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp111
 */
sre.ClearspeakExponents.prototype.testExp111 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>2</mn><mn>2' +
      '</mn></msup><mo>+</mo><mn>1</mn></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, 2 to the second power, plus 1,' +
      ' end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp112
 */
sre.ClearspeakExponents.prototype.testExp112 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>2</mn><mn>2' +
      '</mn></msup></mrow></msup><mo>+</mo><mn>1</mn></mrow></math>';
  var speech = '3 raised to the exponent, 2 to the second power, end' +
      ' exponent, plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp113
 */
sre.ClearspeakExponents.prototype.testExp113 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>2</mn><mrow><msup><mi>x</mi><mn>2' +
      '</mn></msup><mo>+</mo><mn>3</mn><msup><mi>x</mi><mn>3</mn></msup>' +
      '</mrow></msup></mrow></math>';
  var speech = '2 raised to the exponent, x to the second power, plus 3 x' +
      ' to the third power, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp114
 */
sre.ClearspeakExponents.prototype.testExp114 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mn>4' +
      '</mn></msup></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, 3 to the fourth power, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp115
 */
sre.ClearspeakExponents.prototype.testExp115 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mn>4' +
      '</mn></msup><mo>+</mo><mn>2</mn></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, 3 to the fourth power, plus 2,' +
      ' end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp116
 */
sre.ClearspeakExponents.prototype.testExp116 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mn>4' +
      '</mn></msup></mrow></msup><mo>+</mo><mn>2</mn></mrow></math>';
  var speech = '3 raised to the exponent, 3 to the fourth power, end' +
      ' exponent, plus 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp117
 */
sre.ClearspeakExponents.prototype.testExp117 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>2</mn><mrow><msup><mi>x</mi><mn>4' +
      '</mn></msup></mrow></msup></mrow></math>';
  var speech = '2 raised to the exponent, x to the fourth power, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp118
 */
sre.ClearspeakExponents.prototype.testExp118 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>2</mn><mrow><msup><mrow><mn>10</mn>' +
      '</mrow><mrow><mi>x</mi><mo>+</mo><mn>3</mn></mrow></msup></mrow>' +
      '</msup></mrow></math>';
  var speech = '2 raised to the exponent, 10 raised to the x plus 3 power,' +
      ' end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp119
 */
sre.ClearspeakExponents.prototype.testExp119 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mrow>' +
      '<mn>10</mn></mrow></msup></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, 3 to the tenth power, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp120
 */
sre.ClearspeakExponents.prototype.testExp120 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mrow>' +
      '<mn>10</mn></mrow></msup><mo>+</mo><mn>1</mn></mrow></msup></mrow>' +
      '</math>';
  var speech = '3 raised to the exponent, 3 to the tenth power, plus 1, end' +
      ' exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp121
 */
sre.ClearspeakExponents.prototype.testExp121 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mrow>' +
      '<mn>10</mn></mrow></msup></mrow></msup><mo>+</mo><mn>1</mn></mrow>' +
      '</math>';
  var speech = '3 raised to the exponent, 3 to the tenth power, end' +
      ' exponent, plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp122
 */
sre.ClearspeakExponents.prototype.testExp122 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mrow><mrow><mo>(' +
      '</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow>' +
      '</mrow><mn>2</mn></msup></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, open paren, x plus 1, close' +
      ' paren, to the second power, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp123
 */
sre.ClearspeakExponents.prototype.testExp123 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mrow><mrow><mo>(' +
      '</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow>' +
      '</mrow><mrow><mn>10</mn></mrow></msup></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, open paren, x plus 1, close' +
      ' paren, to the tenth power, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp124
 */
sre.ClearspeakExponents.prototype.testExp124 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mrow><mrow><mo>(' +
      '</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow>' +
      '</mrow><mrow><mi>y</mi><mo>+</mo><mn>2</mn></mrow></msup></mrow>' +
      '</msup></mrow></math>';
  var speech = '3 raised to the exponent, open paren, x plus 1, close' +
      ' paren, raised to the y plus 2 power, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp125
 */
sre.ClearspeakExponents.prototype.testExp125 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mrow><mrow><mo>(' +
      '</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow>' +
      '</mrow><mi>y</mi></msup><mo>+</mo><mn>2</mn></mrow></msup></mrow>' +
      '</math>';
  var speech = '3 raised to the exponent, open paren, x plus 1, close' +
      ' paren, to the yth power, plus 2, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp126
 */
sre.ClearspeakExponents.prototype.testExp126 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mrow><mrow><mo>(' +
      '</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow>' +
      '</mrow><mi>y</mi></msup></mrow></msup><mo>+</mo><mn>2</mn></mrow>' +
      '</math>';
  var speech = '3 raised to the exponent, open paren, x plus 1, close' +
      ' paren, to the yth power, end exponent, plus 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp127
 */
sre.ClearspeakExponents.prototype.testExp127 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mi>e</mi><mrow><mo>−</mo><mfrac><mn>1' +
      '</mn><mn>2</mn></mfrac><msup><mi>x</mi><mn>2</mn></msup></mrow>' +
      '</msup></mrow></math>';
  var speech = 'e raised to the exponent, negative one half x to the second' +
      ' power, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp128
 */
sre.ClearspeakExponents.prototype.testExp128 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mi>e</mi><mrow><mo>−</mo><mfrac><mn>1' +
      '</mn><mn>2</mn></mfrac><msup><mrow><mrow><mo>(</mo><mrow><mfrac>' +
      '<mrow><mi>x</mi><mo>−</mo><mi>μ</mi></mrow><mi>σ</mi></mfrac></mrow>' +
      '<mo>)</mo></mrow></mrow><mn>2</mn></msup></mrow></msup></mrow></math>';
  var speech = 'e raised to the exponent, negative one half times, open' +
      ' paren, the fraction with numerator x minus mu, and denominator' +
      ' sigma, close paren, to the second power, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp129
 */
sre.ClearspeakExponents.prototype.testExp129 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mn>2</mn></msup></mrow></math>';
  var speech = '3 raised to the power 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp130
 */
sre.ClearspeakExponents.prototype.testExp130 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mn>3</mn></msup></mrow></math>';
  var speech = '3 raised to the power 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp131
 */
sre.ClearspeakExponents.prototype.testExp131 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mn>1</mn></msup></mrow></math>';
  var speech = '3 raised to the power 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp132b
 */
sre.ClearspeakExponents.prototype.testExp132b = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mn>0</mn></msup></mrow></math>';
  var speech = '3 raised to the power 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp133
 */
sre.ClearspeakExponents.prototype.testExp133 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mn>5</mn></msup></mrow></math>';
  var speech = '3 raised to the power 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp134
 */
sre.ClearspeakExponents.prototype.testExp134 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><mn>5.0</mn></mrow>' +
      '</msup></mrow></math>';
  var speech = '3 raised to the power 5.0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp135
 */
sre.ClearspeakExponents.prototype.testExp135 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msup><mn>4</mn><mrow><mn>11</mn></mrow></msup>' +
      '</mrow></math>';
  var speech = '4 raised to the power 11';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp136
 */
sre.ClearspeakExponents.prototype.testExp136 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><mo>−</mo><mn>2</mn>' +
      '</mrow></msup></mrow></math>';
  var speech = '3 raised to the power negative 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp137
 */
sre.ClearspeakExponents.prototype.testExp137 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><mo>−</mo><mn>2.0</mn>' +
      '</mrow></msup></mrow></math>';
  var speech = '3 raised to the power negative 2.0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp138
 */
sre.ClearspeakExponents.prototype.testExp138 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msup><mn>4</mn><mi>x</mi></msup></mrow></math>';
  var speech = '4 raised to the power x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp139
 */
sre.ClearspeakExponents.prototype.testExp139 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><mi>y</mi><mo>+</mo><mn>2' +
      '</mn></mrow></msup></mrow></math>';
  var speech = '3 raised to the power y plus 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp140
 */
sre.ClearspeakExponents.prototype.testExp140 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mn>2</mn>' +
      '<mi>y</mi><mo>−</mo><mn>3</mn></mrow><mo>)</mo></mrow></mrow><mrow>' +
      '<mn>3</mn><mi>z</mi><mo>+</mo><mn>8</mn></mrow></msup></mrow></math>';
  var speech = 'open paren, 2 y, minus 3, close paren, raised to the power' +
      ' 3 z plus 8';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp141
 */
sre.ClearspeakExponents.prototype.testExp141 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msub><mi>p</mi><mn>1</mn></msub><msup><mrow/>' +
      '<mn>2</mn></msup></mrow></math>';
  var speech = 'p sub 1, raised to the power 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp142
 */
sre.ClearspeakExponents.prototype.testExp142 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msub><mi>p</mi><mn>1</mn></msub><msup><mrow/>' +
      '<mn>3</mn></msup></mrow></math>';
  var speech = 'p sub 1, raised to the power 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp143
 */
sre.ClearspeakExponents.prototype.testExp143 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msub><mi>p</mi><mn>1</mn></msub><msup><mrow/>' +
      '<mn>4</mn></msup></mrow></math>';
  var speech = 'p sub 1, raised to the power 4';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp144
 */
sre.ClearspeakExponents.prototype.testExp144 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msub><mi>p</mi><mn>1</mn></msub><msup><mrow/>' +
      '<mrow><mn>10</mn></mrow></msup></mrow></math>';
  var speech = 'p sub 1, raised to the power 10';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp145
 */
sre.ClearspeakExponents.prototype.testExp145 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msub><mi>p</mi><mn>1</mn></msub><msup><mrow/>' +
      '<mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow></msup></mrow></math>';
  var speech = 'p sub 1, raised to the power x plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp146
 */
sre.ClearspeakExponents.prototype.testExp146 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msub><mi>p</mi><mrow><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow></msub><msup><mrow/><mn>2</mn></msup></mrow></math>';
  var speech = 'p sub, x sub 1, raised to the power 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp147
 */
sre.ClearspeakExponents.prototype.testExp147 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msub><mi>p</mi><mrow><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow></msub><msup><mrow/><mn>3</mn></msup></mrow></math>';
  var speech = 'p sub, x sub 1, raised to the power 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp148
 */
sre.ClearspeakExponents.prototype.testExp148 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msub><mi>p</mi><mrow><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow></msub><msup><mrow/><mn>4</mn></msup></mrow></math>';
  var speech = 'p sub, x sub 1, raised to the power 4';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp149
 */
sre.ClearspeakExponents.prototype.testExp149 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msub><mi>p</mi><mrow><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow></msub><msup><mrow/><mrow><mn>10</mn></mrow>' +
      '</msup></mrow></math>';
  var speech = 'p sub, x sub 1, raised to the power 10';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp150
 */
sre.ClearspeakExponents.prototype.testExp150 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msub><mi>p</mi><mrow><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow></msub><msup><mrow/><mrow><mi>y</mi><mo>+</mo>' +
      '<mn>1</mn></mrow></msup></mrow></math>';
  var speech = 'p sub, x sub 1, raised to the power y plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp151
 */
sre.ClearspeakExponents.prototype.testExp151 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>2</mn><mn>2' +
      '</mn></msup></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, 2 raised to the power 2, end' +
      ' exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp152
 */
sre.ClearspeakExponents.prototype.testExp152 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><mn>2</mn><msup><mi>x' +
      '</mi><mn>2</mn></msup></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, 2 x raised to the power 2, end' +
      ' exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp153
 */
sre.ClearspeakExponents.prototype.testExp153 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>2</mn><mn>2' +
      '</mn></msup></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, 2 raised to the power 2, end' +
      ' exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp154
 */
sre.ClearspeakExponents.prototype.testExp154 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><mn>2</mn><msup><mi>x' +
      '</mi><mn>2</mn></msup></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, 2 x raised to the power 2, end' +
      ' exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp155
 */
sre.ClearspeakExponents.prototype.testExp155 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msup><mn>5</mn><mrow><msup><mn>2</mn><mn>3' +
      '</mn></msup></mrow></msup></mrow></math>';
  var speech = '5 raised to the exponent, 2 raised to the power 3, end' +
      ' exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp156
 */
sre.ClearspeakExponents.prototype.testExp156 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msup><mn>5</mn><mrow><mn>2</mn><msup><mi>x' +
      '</mi><mn>3</mn></msup></mrow></msup></mrow></math>';
  var speech = '5 raised to the exponent, 2 x raised to the power 3, end' +
      ' exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp157
 */
sre.ClearspeakExponents.prototype.testExp157 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>2</mn><mn>2' +
      '</mn></msup><mo>+</mo><mn>1</mn></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, 2 raised to the power 2, plus 1,' +
      ' end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp158
 */
sre.ClearspeakExponents.prototype.testExp158 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>2</mn><mn>2' +
      '</mn></msup></mrow></msup><mo>+</mo><mn>1</mn></mrow></math>';
  var speech = '3 raised to the exponent, 2 raised to the power 2, end' +
      ' exponent, plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp159
 */
sre.ClearspeakExponents.prototype.testExp159 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msup><mn>2</mn><mrow><msup><mi>x</mi><mn>2' +
      '</mn></msup><mo>+</mo><mn>3</mn><msup><mi>x</mi><mn>3</mn></msup>' +
      '</mrow></msup></mrow></math>';
  var speech = '2 raised to the exponent, x raised to the power 2, plus 3 x' +
      ' raised to the power 3, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp160
 */
sre.ClearspeakExponents.prototype.testExp160 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mn>4' +
      '</mn></msup></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, 3 raised to the power 4, end' +
      ' exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp161
 */
sre.ClearspeakExponents.prototype.testExp161 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mn>4' +
      '</mn></msup><mo>+</mo><mn>2</mn></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, 3 raised to the power 4, plus 2,' +
      ' end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp162
 */
sre.ClearspeakExponents.prototype.testExp162 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mn>4' +
      '</mn></msup></mrow></msup><mo>+</mo><mn>2</mn></mrow></math>';
  var speech = '3 raised to the exponent, 3 raised to the power 4, end' +
      ' exponent, plus 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp163
 */
sre.ClearspeakExponents.prototype.testExp163 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msup><mn>2</mn><mrow><msup><mi>x</mi><mn>4' +
      '</mn></msup></mrow></msup></mrow></math>';
  var speech = '2 raised to the exponent, x raised to the power 4, end' +
      ' exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp164
 */
sre.ClearspeakExponents.prototype.testExp164 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msup><mn>2</mn><mrow><msup><mrow><mn>10</mn>' +
      '</mrow><mrow><mi>x</mi><mo>+</mo><mn>3</mn></mrow></msup></mrow>' +
      '</msup></mrow></math>';
  var speech = '2 raised to the exponent, 10 raised to the power x plus 3,' +
      ' end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp165
 */
sre.ClearspeakExponents.prototype.testExp165 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mrow>' +
      '<mn>10</mn></mrow></msup></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, 3 raised to the power 10, end' +
      ' exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp166
 */
sre.ClearspeakExponents.prototype.testExp166 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mrow>' +
      '<mn>10</mn></mrow></msup><mo>+</mo><mn>1</mn></mrow></msup></mrow>' +
      '</math>';
  var speech = '3 raised to the exponent, 3 raised to the power 10, plus 1,' +
      ' end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp167
 */
sre.ClearspeakExponents.prototype.testExp167 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mrow>' +
      '<mn>10</mn></mrow></msup></mrow></msup><mo>+</mo><mn>1</mn></mrow>' +
      '</math>';
  var speech = '3 raised to the exponent, 3 raised to the power 10, end' +
      ' exponent, plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp168
 */
sre.ClearspeakExponents.prototype.testExp168 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mrow><mrow><mo>(' +
      '</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow>' +
      '</mrow><mn>2</mn></msup></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, open paren, x plus 1, close' +
      ' paren, raised to the power 2, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp169
 */
sre.ClearspeakExponents.prototype.testExp169 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mrow><mrow><mo>(' +
      '</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow>' +
      '</mrow><mrow><mn>10</mn></mrow></msup></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, open paren, x plus 1, close' +
      ' paren, raised to the power 10, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp170
 */
sre.ClearspeakExponents.prototype.testExp170 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mrow><mrow><mo>(' +
      '</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow>' +
      '</mrow><mrow><mi>y</mi><mo>+</mo><mn>2</mn></mrow></msup></mrow>' +
      '</msup></mrow></math>';
  var speech = '3 raised to the exponent, open paren, x plus 1, close' +
      ' paren, raised to the power y plus 2, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp171
 */
sre.ClearspeakExponents.prototype.testExp171 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mrow><mrow><mo>(' +
      '</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow>' +
      '</mrow><mi>y</mi></msup><mo>+</mo><mn>2</mn></mrow></msup></mrow>' +
      '</math>';
  var speech = '3 raised to the exponent, open paren, x plus 1, close' +
      ' paren, raised to the power y, plus 2, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp172
 */
sre.ClearspeakExponents.prototype.testExp172 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mrow><mrow><mo>(' +
      '</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow>' +
      '</mrow><mi>y</mi></msup></mrow></msup><mo>+</mo><mn>2</mn></mrow>' +
      '</math>';
  var speech = '3 raised to the exponent, open paren, x plus 1, close' +
      ' paren, raised to the power y, end exponent, plus 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp173
 */
sre.ClearspeakExponents.prototype.testExp173 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msup><mi>e</mi><mrow><mo>−</mo><mfrac><mn>1' +
      '</mn><mn>2</mn></mfrac><msup><mi>x</mi><mn>2</mn></msup></mrow>' +
      '</msup></mrow></math>';
  var speech = 'e raised to the exponent, negative one half x raised to the' +
      ' power 2, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakExponents Example Exp174
 */
sre.ClearspeakExponents.prototype.testExp174 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msup><mi>e</mi><mrow><mo>−</mo><mfrac><mn>1' +
      '</mn><mn>2</mn></mfrac><msup><mrow><mrow><mo>(</mo><mrow><mfrac>' +
      '<mrow><mi>x</mi><mo>−</mo><mi>μ</mi></mrow><mi>σ</mi></mfrac></mrow>' +
      '<mo>)</mo></mrow></mrow><mn>2</mn></msup></mrow></msup></mrow></math>';
  var speech = 'e raised to the exponent, negative one half times, open' +
      ' paren, the fraction with numerator x minus mu, and denominator' +
      ' sigma, close paren, raised to the power 2, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};

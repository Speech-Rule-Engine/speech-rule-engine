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


goog.provide('sre.ClearspeakEnglishExponents');

goog.require('sre.ClearspeakEnglishRuleTest');



/**
* @constructor
* @extends {sre.ClearspeakEnglishRuleTest}
*/
sre.ClearspeakEnglishExponents = function() {
  sre.ClearspeakEnglishExponents.base(this, 'constructor');

  /**
* @override
  */
  this.information = 'ClearspeakEnglishExponents rule tests.';

};
goog.inherits(sre.ClearspeakEnglishExponents, sre.ClearspeakEnglishRuleTest);



//
// Exponents
//


/**
 * Testing ClearspeakEnglishExponents Example Exp001
 */
sre.ClearspeakEnglishExponents.prototype.testExp001 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mn>2</mn></msup></mrow></math>';
  var speech = '3 squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp002a
 */
sre.ClearspeakEnglishExponents.prototype.testExp002a = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mn>3</mn></msup></mrow></math>';
  var speech = '3 cubed';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp003
 */
sre.ClearspeakEnglishExponents.prototype.testExp003 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mn>5</mn></msup></mrow></math>';
  var speech = '3 to the fifth power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp004
 */
sre.ClearspeakEnglishExponents.prototype.testExp004 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mn>1</mn></msup></mrow></math>';
  var speech = '3 to the first power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp005
 */
sre.ClearspeakEnglishExponents.prototype.testExp005 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mi>b</mi><mn>1</mn></msup></mrow></math>';
  var speech = 'b to the first power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp006
 */
sre.ClearspeakEnglishExponents.prototype.testExp006 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><mn>5.0</mn></mrow>' +
      '</msup></mrow></math>';
  var speech = '3 raised to the 5.0 power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp007
 */
sre.ClearspeakEnglishExponents.prototype.testExp007 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mn>0</mn></msup></mrow></math>';
  var speech = '3 to the 0 power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp008
 */
sre.ClearspeakEnglishExponents.prototype.testExp008 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>4</mn><mrow><mn>11</mn></mrow></msup>' +
      '</mrow></math>';
  var speech = '4 to the 11th power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp009
 */
sre.ClearspeakEnglishExponents.prototype.testExp009 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><mo>−</mo><mn>2</mn>' +
      '</mrow></msup></mrow></math>';
  var speech = '3 to the negative 2 power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp010a
 */
sre.ClearspeakEnglishExponents.prototype.testExp010a = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><mo>−</mo><mn>2.0</mn>' +
      '</mrow></msup></mrow></math>';
  var speech = '3 raised to the negative 2.0 power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp011
 */
sre.ClearspeakEnglishExponents.prototype.testExp011 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>4</mn><mi>x</mi></msup></mrow></math>';
  var speech = '4 to the x-th power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp012
 */
sre.ClearspeakEnglishExponents.prototype.testExp012 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><mi>y</mi><mo>+</mo><mn>2' +
      '</mn></mrow></msup></mrow></math>';
  var speech = '3 raised to the y plus 2 power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp013
 */
sre.ClearspeakEnglishExponents.prototype.testExp013 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mn>2</mn>' +
      '<mi>y</mi><mo>−</mo><mn>3</mn></mrow><mo>)</mo></mrow></mrow><mrow>' +
      '<mn>3</mn><mi>z</mi><mo>+</mo><mn>8</mn></mrow></msup></mrow></math>';
  var speech = 'open paren, 2 y, minus 3, close paren, raised to the 3 z,' +
      ' plus 8 power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp014
 */
sre.ClearspeakEnglishExponents.prototype.testExp014 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msubsup><mi>p</mi><mn>1</mn><mn>2</mn>' +
      '</msubsup></mrow></math>';
  var speech = 'p sub 1, squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp015
 */
sre.ClearspeakEnglishExponents.prototype.testExp015 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msubsup><mi>p</mi><mn>1</mn><mn>3</mn>' +
      '</msubsup></mrow></math>';
  var speech = 'p sub 1, cubed';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp016
 */
sre.ClearspeakEnglishExponents.prototype.testExp016 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msubsup><mi>p</mi><mn>1</mn><mn>4</mn>' +
      '</msubsup></mrow></math>';
  var speech = 'p sub 1, to the fourth power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp017
 */
sre.ClearspeakEnglishExponents.prototype.testExp017 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msubsup><mi>p</mi><mn>1</mn><mrow><mn>10</mn>' +
      '</mrow></msubsup></mrow></math>';
  var speech = 'p sub 1, to the tenth power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp018
 */
sre.ClearspeakEnglishExponents.prototype.testExp018 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msubsup><mi>p</mi><mn>1</mn><mrow><mi>x</mi>' +
      '<mo>+</mo><mn>1</mn></mrow></msubsup></mrow></math>';
  var speech = 'p sub 1, raised to the x plus 1 power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp019
 */
sre.ClearspeakEnglishExponents.prototype.testExp019 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msubsup><mi>p</mi><mrow><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow><mn>2</mn></msubsup></mrow></math>';
  var speech = 'p sub, x sub 1, squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp010b
 */
sre.ClearspeakEnglishExponents.prototype.testExp010b = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msubsup><mi>p</mi><mrow><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow><mn>3</mn></msubsup></mrow></math>';
  var speech = 'p sub, x sub 1, cubed';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp011b
 */
sre.ClearspeakEnglishExponents.prototype.testExp011b = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msubsup><mi>p</mi><mrow><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow><mn>4</mn></msubsup></mrow></math>';
  var speech = 'p sub, x sub 1, to the fourth power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp012b
 */
sre.ClearspeakEnglishExponents.prototype.testExp012b = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msubsup><mi>p</mi><mrow><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow><mrow><mn>10</mn></mrow></msubsup></mrow></math>';
  var speech = 'p sub, x sub 1, to the tenth power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp013b
 */
sre.ClearspeakEnglishExponents.prototype.testExp013b = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msubsup><mi>p</mi><mrow><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow><mrow><mi>y</mi><mo>+</mo><mn>1</mn></mrow>' +
      '</msubsup></mrow></math>';
  var speech = 'p sub, x sub 1, raised to the y plus 1 power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp014b
 */
sre.ClearspeakEnglishExponents.prototype.testExp014b = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>2</mn><mn>2' +
      '</mn></msup></mrow></msup></mrow></math>';
  var speech = '3 raised to the 2 squared power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp015b
 */
sre.ClearspeakEnglishExponents.prototype.testExp015b = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><mn>2</mn><msup><mi>x' +
      '</mi><mn>2</mn></msup></mrow></msup></mrow></math>';
  var speech = '3 raised to the 2 x squared power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp016b
 */
sre.ClearspeakEnglishExponents.prototype.testExp016b = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>5</mn><mrow><msup><mn>2</mn><mn>3' +
      '</mn></msup></mrow></msup></mrow></math>';
  var speech = '5 raised to the 2 cubed power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp017b
 */
sre.ClearspeakEnglishExponents.prototype.testExp017b = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>5</mn><mrow><mn>2</mn><msup><mi>x' +
      '</mi><mn>3</mn></msup></mrow></msup></mrow></math>';
  var speech = '5 raised to the 2 x cubed power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp018b
 */
sre.ClearspeakEnglishExponents.prototype.testExp018b = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>2</mn><mn>2' +
      '</mn></msup><mo>+</mo><mn>1</mn></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, 2 squared plus 1, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp019b
 */
sre.ClearspeakEnglishExponents.prototype.testExp019b = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>2</mn><mn>2' +
      '</mn></msup></mrow></msup><mo>+</mo><mn>1</mn></mrow></math>';
  var speech = '3 raised to the 2 squared power, plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp020
 */
sre.ClearspeakEnglishExponents.prototype.testExp020 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>2</mn><mrow><msup><mi>x</mi><mn>2' +
      '</mn></msup><mo>+</mo><mn>3</mn><msup><mi>x</mi><mn>3</mn></msup>' +
      '</mrow></msup></mrow></math>';
  var speech = '2 raised to the exponent, x squared plus 3 x cubed, end' +
      ' exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp021
 */
sre.ClearspeakEnglishExponents.prototype.testExp021 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mn>4' +
      '</mn></msup></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, 3 to the fourth power, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp022
 */
sre.ClearspeakEnglishExponents.prototype.testExp022 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mn>4' +
      '</mn></msup><mo>+</mo><mn>2</mn></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, 3 to the fourth power, plus 2,' +
      ' end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp023
 */
sre.ClearspeakEnglishExponents.prototype.testExp023 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mn>4' +
      '</mn></msup></mrow></msup><mo>+</mo><mn>2</mn></mrow></math>';
  var speech = '3 raised to the exponent, 3 to the fourth power, end' +
      ' exponent, plus 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp024
 */
sre.ClearspeakEnglishExponents.prototype.testExp024 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>2</mn><mrow><msup><mi>x</mi><mn>4' +
      '</mn></msup></mrow></msup></mrow></math>';
  var speech = '2 raised to the exponent, x to the fourth power, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp025
 */
sre.ClearspeakEnglishExponents.prototype.testExp025 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>2</mn><mrow><msup><mrow><mn>10</mn>' +
      '</mrow><mrow><mi>x</mi><mo>+</mo><mn>3</mn></mrow></msup></mrow>' +
      '</msup></mrow></math>';
  var speech = '2 raised to the exponent, 10 raised to the x plus 3 power,' +
      ' end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp026
 */
sre.ClearspeakEnglishExponents.prototype.testExp026 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mrow>' +
      '<mn>10</mn></mrow></msup></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, 3 to the tenth power, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp027
 */
sre.ClearspeakEnglishExponents.prototype.testExp027 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mrow>' +
      '<mn>10</mn></mrow></msup><mo>+</mo><mn>1</mn></mrow></msup></mrow>' +
      '</math>';
  var speech = '3 raised to the exponent, 3 to the tenth power, plus 1, end' +
      ' exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp028
 */
sre.ClearspeakEnglishExponents.prototype.testExp028 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mrow>' +
      '<mn>10</mn></mrow></msup></mrow></msup><mo>+</mo><mn>1</mn></mrow>' +
      '</math>';
  var speech = '3 raised to the exponent, 3 to the tenth power, end' +
      ' exponent, plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp029
 */
sre.ClearspeakEnglishExponents.prototype.testExp029 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mrow><mrow><mo>(' +
      '</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow>' +
      '</mrow><mn>2</mn></msup></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, open paren, x plus 1, close' +
      ' paren, squared, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp030
 */
sre.ClearspeakEnglishExponents.prototype.testExp030 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mrow><mrow><mo>(' +
      '</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow>' +
      '</mrow><mrow><mn>10</mn></mrow></msup></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, open paren, x plus 1, close' +
      ' paren, to the tenth power, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp031
 */
sre.ClearspeakEnglishExponents.prototype.testExp031 = function() {
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
 * Testing ClearspeakEnglishExponents Example Exp032
 */
sre.ClearspeakEnglishExponents.prototype.testExp032 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mrow><mrow><mo>(' +
      '</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow>' +
      '</mrow><mi>y</mi></msup><mo>+</mo><mn>2</mn></mrow></msup></mrow>' +
      '</math>';
  var speech = '3 raised to the exponent, open paren, x plus 1, close' +
      ' paren, to the y-th power, plus 2, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp033
 */
sre.ClearspeakEnglishExponents.prototype.testExp033 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mrow><mrow><mo>(' +
      '</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow>' +
      '</mrow><mi>y</mi></msup></mrow></msup><mo>+</mo><mn>2</mn></mrow>' +
      '</math>';
  var speech = '3 raised to the exponent, open paren, x plus 1, close' +
      ' paren, to the y-th power, end exponent, plus 2';
  this.executeRuleTest(mathml, speech, preference);
};


// TODO: (Simons) This does not work as semantically we have a -(xy) rather than
//       (-x)(y).
/**
 * Testing ClearspeakEnglishExponents Example Exp034
 */
sre.ClearspeakEnglishExponents.prototype.untestExp034 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mi>e</mi><mrow><mo>−</mo><mfrac><mn>1' +
      '</mn><mn>2</mn></mfrac><msup><mi>x</mi><mn>2</mn></msup></mrow>' +
      '</msup></mrow></math>';
  var speech = 'e raised to the negative one half, x squared power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp035
 */
sre.ClearspeakEnglishExponents.prototype.testExp035 = function() {
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
 * Testing ClearspeakEnglishExponents Example Exp036
 */
sre.ClearspeakEnglishExponents.prototype.testExp036 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>2</mn><mi>n</mi></msup></mrow></math>';
  var speech = '2 to the n-th power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp037
 */
sre.ClearspeakEnglishExponents.prototype.testExp037 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>2</mn><mi>m</mi></msup></mrow></math>';
  var speech = '2 to the m-th power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp038
 */
sre.ClearspeakEnglishExponents.prototype.testExp038 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>2</mn><mi>i</mi></msup></mrow></math>';
  var speech = '2 to the i-th power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp039
 */
sre.ClearspeakEnglishExponents.prototype.testExp039 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>2</mn><mi>j</mi></msup></mrow></math>';
  var speech = '2 to the j-th power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp40
 */
sre.ClearspeakEnglishExponents.prototype.testExp40 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>2</mn><mi>a</mi></msup></mrow></math>';
  var speech = '2 to the a-th power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp041
 */
sre.ClearspeakEnglishExponents.prototype.testExp041 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mn>2</mn></msup></mrow></math>';
  var speech = '3 to the second';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp042
 */
sre.ClearspeakEnglishExponents.prototype.testExp042 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mn>3</mn></msup></mrow></math>';
  var speech = '3 to the third';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp043
 */
sre.ClearspeakEnglishExponents.prototype.testExp043 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mn>0</mn></msup></mrow></math>';
  var speech = '3 to the zero';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp044
 */
sre.ClearspeakEnglishExponents.prototype.testExp044 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mn>1</mn></msup></mrow></math>';
  var speech = '3 to the first';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp045
 */
sre.ClearspeakEnglishExponents.prototype.testExp045 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mn>5</mn></msup></mrow></math>';
  var speech = '3 to the fifth';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp046
 */
sre.ClearspeakEnglishExponents.prototype.testExp046 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>4</mn><mrow><mn>3.0</mn></mrow>' +
      '</msup></mrow></math>';
  var speech = '4 raised to the 3.0 power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp047
 */
sre.ClearspeakEnglishExponents.prototype.testExp047 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>4</mn><mrow><mn>11</mn></mrow></msup>' +
      '</mrow></math>';
  var speech = '4 to the eleventh';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp048
 */
sre.ClearspeakEnglishExponents.prototype.testExp048 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><mo>−</mo><mn>2</mn>' +
      '</mrow></msup></mrow></math>';
  var speech = '3 to the negative 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp049
 */
sre.ClearspeakEnglishExponents.prototype.testExp049 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><mo>−</mo><mn>2.0</mn>' +
      '</mrow></msup></mrow></math>';
  var speech = '3 raised to the negative 2.0 power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp050
 */
sre.ClearspeakEnglishExponents.prototype.testExp050 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>4</mn><mi>x</mi></msup></mrow></math>';
  var speech = '4 to the x-th';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp051
 */
sre.ClearspeakEnglishExponents.prototype.testExp051 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><mi>y</mi><mo>+</mo><mn>2' +
      '</mn></mrow></msup></mrow></math>';
  var speech = '3 raised to the y plus 2 power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp052
 */
sre.ClearspeakEnglishExponents.prototype.testExp052 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mn>2</mn>' +
      '<mi>y</mi><mo>−</mo><mn>3</mn></mrow><mo>)</mo></mrow></mrow><mrow>' +
      '<mn>3</mn><mi>z</mi><mo>+</mo><mn>8</mn></mrow></msup></mrow></math>';
  var speech = 'open paren, 2 y, minus 3, close paren, raised to the 3 z,' +
      ' plus 8 power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp053
 */
sre.ClearspeakEnglishExponents.prototype.testExp053 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msub><mi>p</mi><mn>1</mn></msub><msup><mrow/>' +
      '<mn>2</mn></msup></mrow></math>';
  var speech = 'p sub 1, to the second';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp054
 */
sre.ClearspeakEnglishExponents.prototype.testExp054 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msub><mi>p</mi><mn>1</mn></msub><msup><mrow/>' +
      '<mn>3</mn></msup></mrow></math>';
  var speech = 'p sub 1, to the third';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp055
 */
sre.ClearspeakEnglishExponents.prototype.testExp055 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msub><mi>p</mi><mn>1</mn></msub><msup><mrow/>' +
      '<mn>4</mn></msup></mrow></math>';
  var speech = 'p sub 1, to the fourth';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp056
 */
sre.ClearspeakEnglishExponents.prototype.testExp056 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msub><mi>p</mi><mn>1</mn></msub><msup><mrow/>' +
      '<mrow><mn>10</mn></mrow></msup></mrow></math>';
  var speech = 'p sub 1, to the tenth';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp057
 */
sre.ClearspeakEnglishExponents.prototype.testExp057 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msub><mi>p</mi><mn>1</mn></msub><msup><mrow/>' +
      '<mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow></msup></mrow></math>';
  var speech = 'p sub 1, raised to the x plus 1 power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp058
 */
sre.ClearspeakEnglishExponents.prototype.testExp058 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msub><mi>p</mi><mrow><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow></msub><msup><mrow/><mn>2</mn></msup></mrow></math>';
  var speech = 'p sub, x sub 1, to the second';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp059
 */
sre.ClearspeakEnglishExponents.prototype.testExp059 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msub><mi>p</mi><mrow><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow></msub><msup><mrow/><mn>3</mn></msup></mrow></math>';
  var speech = 'p sub, x sub 1, to the third';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp060
 */
sre.ClearspeakEnglishExponents.prototype.testExp060 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msub><mi>p</mi><mrow><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow></msub><msup><mrow/><mn>4</mn></msup></mrow></math>';
  var speech = 'p sub, x sub 1, to the fourth';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp061
 */
sre.ClearspeakEnglishExponents.prototype.testExp061 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msub><mi>p</mi><mrow><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow></msub><msup><mrow/><mrow><mn>10</mn></mrow>' +
      '</msup></mrow></math>';
  var speech = 'p sub, x sub 1, to the tenth';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp062
 */
sre.ClearspeakEnglishExponents.prototype.testExp062 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msub><mi>p</mi><mrow><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow></msub><msup><mrow/><mrow><mi>y</mi><mo>+</mo>' +
      '<mn>1</mn></mrow></msup></mrow></math>';
  var speech = 'p sub, x sub 1, raised to the y plus 1 power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp063
 */
sre.ClearspeakEnglishExponents.prototype.testExp063 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>2</mn><mn>2' +
      '</mn></msup></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, 2 to the second, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp064
 */
sre.ClearspeakEnglishExponents.prototype.testExp064 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><mn>2</mn><msup><mi>x' +
      '</mi><mn>2</mn></msup></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, 2 x to the second, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp065
 */
sre.ClearspeakEnglishExponents.prototype.testExp065 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>5</mn><mrow><msup><mn>2</mn><mn>3' +
      '</mn></msup></mrow></msup></mrow></math>';
  var speech = '5 raised to the exponent, 2 to the third, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp066
 */
sre.ClearspeakEnglishExponents.prototype.testExp066 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>5</mn><mrow><mn>2</mn><msup><mi>x' +
      '</mi><mn>3</mn></msup></mrow></msup></mrow></math>';
  var speech = '5 raised to the exponent, 2 x to the third, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp067
 */
sre.ClearspeakEnglishExponents.prototype.testExp067 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>2</mn><mn>2' +
      '</mn></msup><mo>+</mo><mn>1</mn></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, 2 to the second, plus 1, end' +
      ' exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp068
 */
sre.ClearspeakEnglishExponents.prototype.testExp068 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>2</mn><mn>2' +
      '</mn></msup></mrow></msup><mo>+</mo><mn>1</mn></mrow></math>';
  var speech = '3 raised to the exponent, 2 to the second, end exponent,' +
      ' plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp069
 */
sre.ClearspeakEnglishExponents.prototype.testExp069 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>2</mn><mrow><msup><mi>x</mi><mn>2' +
      '</mn></msup><mo>+</mo><mn>3</mn><msup><mi>x</mi><mn>3</mn></msup>' +
      '</mrow></msup></mrow></math>';
  var speech = '2 raised to the exponent, x to the second, plus 3 x to the' +
      ' third, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp070
 */
sre.ClearspeakEnglishExponents.prototype.testExp070 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mn>4' +
      '</mn></msup></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, 3 to the fourth, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp071
 */
sre.ClearspeakEnglishExponents.prototype.testExp071 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mn>4' +
      '</mn></msup><mo>+</mo><mn>2</mn></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, 3 to the fourth, plus 2, end' +
      ' exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp072
 */
sre.ClearspeakEnglishExponents.prototype.testExp072 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mn>4' +
      '</mn></msup></mrow></msup><mo>+</mo><mn>2</mn></mrow></math>';
  var speech = '3 raised to the exponent, 3 to the fourth, end exponent,' +
      ' plus 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp073
 */
sre.ClearspeakEnglishExponents.prototype.testExp073 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>2</mn><mrow><msup><mi>x</mi><mn>4' +
      '</mn></msup></mrow></msup></mrow></math>';
  var speech = '2 raised to the exponent, x to the fourth, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp074
 */
sre.ClearspeakEnglishExponents.prototype.testExp074 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>2</mn><mrow><msup><mrow><mn>10</mn>' +
      '</mrow><mrow><mi>x</mi><mo>+</mo><mn>3</mn></mrow></msup></mrow>' +
      '</msup></mrow></math>';
  var speech = '2 raised to the exponent, 10 raised to the x plus 3 power,' +
      ' end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp075
 */
sre.ClearspeakEnglishExponents.prototype.testExp075 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mrow>' +
      '<mn>10</mn></mrow></msup></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, 3 to the tenth, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp076
 */
sre.ClearspeakEnglishExponents.prototype.testExp076 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mrow>' +
      '<mn>10</mn></mrow></msup><mo>+</mo><mn>1</mn></mrow></msup></mrow>' +
      '</math>';
  var speech = '3 raised to the exponent, 3 to the tenth, plus 1, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp077
 */
sre.ClearspeakEnglishExponents.prototype.testExp077 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mrow>' +
      '<mn>10</mn></mrow></msup></mrow></msup><mo>+</mo><mn>1</mn></mrow>' +
      '</math>';
  var speech = '3 raised to the exponent, 3 to the tenth, end exponent, plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp078
 */
sre.ClearspeakEnglishExponents.prototype.testExp078 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mrow><mrow><mo>(' +
      '</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow>' +
      '</mrow><mn>2</mn></msup></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, open paren, x plus 1, close' +
      ' paren, to the second, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp079
 */
sre.ClearspeakEnglishExponents.prototype.testExp079 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mrow><mrow><mo>(' +
      '</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow>' +
      '</mrow><mrow><mn>10</mn></mrow></msup></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, open paren, x plus 1, close' +
      ' paren, to the tenth, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp080
 */
sre.ClearspeakEnglishExponents.prototype.testExp080 = function() {
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
 * Testing ClearspeakEnglishExponents Example Exp081
 */
sre.ClearspeakEnglishExponents.prototype.testExp081 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mrow><mrow><mo>(' +
      '</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow>' +
      '</mrow><mi>y</mi></msup><mo>+</mo><mn>2</mn></mrow></msup></mrow>' +
      '</math>';
  var speech = '3 raised to the exponent, open paren, x plus 1, close' +
      ' paren, to the y-th, plus 2, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp082
 */
sre.ClearspeakEnglishExponents.prototype.testExp082 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mrow><mrow><mo>(' +
      '</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow>' +
      '</mrow><mi>y</mi></msup></mrow></msup><mo>+</mo><mn>2</mn></mrow>' +
      '</math>';
  var speech = '3 raised to the exponent, open paren, x plus 1, close' +
      ' paren, to the y-th, end exponent, plus 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp083
 */
sre.ClearspeakEnglishExponents.prototype.testExp083 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mi>e</mi><mrow><mo>−</mo><mfrac><mn>1' +
      '</mn><mn>2</mn></mfrac><msup><mi>x</mi><mn>2</mn></msup></mrow>' +
      '</msup></mrow></math>';
  var speech = 'e raised to the exponent, negative one half x to the' +
      ' second, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp084
 */
sre.ClearspeakEnglishExponents.prototype.testExp084 = function() {
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
 * Testing ClearspeakEnglishExponents Example Exp085
 */
sre.ClearspeakEnglishExponents.prototype.testExp085 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mn>2</mn></msup></mrow></math>';
  var speech = '3 to the second power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp086
 */
sre.ClearspeakEnglishExponents.prototype.testExp086 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mn>3</mn></msup></mrow></math>';
  var speech = '3 to the third power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp087
 */
sre.ClearspeakEnglishExponents.prototype.testExp087 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mn>0</mn></msup></mrow></math>';
  var speech = '3 to the zero power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp088
 */
sre.ClearspeakEnglishExponents.prototype.testExp088 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mn>1</mn></msup></mrow></math>';
  var speech = '3 to the first power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp089
 */
sre.ClearspeakEnglishExponents.prototype.testExp089 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mn>5</mn></msup></mrow></math>';
  var speech = '3 to the fifth power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp090
 */
sre.ClearspeakEnglishExponents.prototype.testExp090 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><mn>5.0</mn></mrow>' +
      '</msup></mrow></math>';
  var speech = '3 raised to the 5.0 power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp091
 */
sre.ClearspeakEnglishExponents.prototype.testExp091 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>4</mn><mrow><mn>11</mn></mrow></msup>' +
      '</mrow></math>';
  var speech = '4 to the eleventh power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp092
 */
sre.ClearspeakEnglishExponents.prototype.testExp092 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><mo>−</mo><mn>2</mn>' +
      '</mrow></msup></mrow></math>';
  var speech = '3 to the negative 2 power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp093
 */
sre.ClearspeakEnglishExponents.prototype.testExp093 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><mo>−</mo><mn>2.0</mn>' +
      '</mrow></msup></mrow></math>';
  var speech = '3 raised to the negative 2.0 power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp094
 */
sre.ClearspeakEnglishExponents.prototype.testExp094 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>4</mn><mi>x</mi></msup></mrow></math>';
  var speech = '4 to the x-th power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp095
 */
sre.ClearspeakEnglishExponents.prototype.testExp095 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><mi>y</mi><mo>+</mo><mn>2' +
      '</mn></mrow></msup></mrow></math>';
  var speech = '3 raised to the y plus 2 power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp096
 */
sre.ClearspeakEnglishExponents.prototype.testExp096 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mn>2</mn>' +
      '<mi>y</mi><mo>−</mo><mn>3</mn></mrow><mo>)</mo></mrow></mrow><mrow>' +
      '<mn>3</mn><mi>z</mi><mo>+</mo><mn>8</mn></mrow></msup></mrow></math>';
  var speech = 'open paren, 2 y, minus 3, close paren, raised to the 3 z,' +
      ' plus 8 power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp097
 */
sre.ClearspeakEnglishExponents.prototype.testExp097 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msub><mi>p</mi><mn>1</mn></msub><msup><mrow/>' +
      '<mn>2</mn></msup></mrow></math>';
  var speech = 'p sub 1, to the second power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp098
 */
sre.ClearspeakEnglishExponents.prototype.testExp098 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msub><mi>p</mi><mn>1</mn></msub><msup><mrow/>' +
      '<mn>3</mn></msup></mrow></math>';
  var speech = 'p sub 1, to the third power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp099
 */
sre.ClearspeakEnglishExponents.prototype.testExp099 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msub><mi>p</mi><mn>1</mn></msub><msup><mrow/>' +
      '<mn>4</mn></msup></mrow></math>';
  var speech = 'p sub 1, to the fourth power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp100
 */
sre.ClearspeakEnglishExponents.prototype.testExp100 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msub><mi>p</mi><mn>1</mn></msub><msup><mrow/>' +
      '<mrow><mn>10</mn></mrow></msup></mrow></math>';
  var speech = 'p sub 1, to the tenth power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp101
 */
sre.ClearspeakEnglishExponents.prototype.testExp101 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msub><mi>p</mi><mn>1</mn></msub><msup><mrow/>' +
      '<mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow></msup></mrow></math>';
  var speech = 'p sub 1, raised to the x plus 1 power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp102
 */
sre.ClearspeakEnglishExponents.prototype.testExp102 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msub><mi>p</mi><mrow><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow></msub><msup><mrow/><mn>2</mn></msup></mrow></math>';
  var speech = 'p sub, x sub 1, to the second power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp103
 */
sre.ClearspeakEnglishExponents.prototype.testExp103 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msub><mi>p</mi><mrow><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow></msub><msup><mrow/><mn>3</mn></msup></mrow></math>';
  var speech = 'p sub, x sub 1, to the third power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp104
 */
sre.ClearspeakEnglishExponents.prototype.testExp104 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msub><mi>p</mi><mrow><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow></msub><msup><mrow/><mn>4</mn></msup></mrow></math>';
  var speech = 'p sub, x sub 1, to the fourth power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp105
 */
sre.ClearspeakEnglishExponents.prototype.testExp105 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msub><mi>p</mi><mrow><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow></msub><msup><mrow/><mrow><mn>10</mn></mrow>' +
      '</msup></mrow></math>';
  var speech = 'p sub, x sub 1, to the tenth power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp106
 */
sre.ClearspeakEnglishExponents.prototype.testExp106 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msub><mi>p</mi><mrow><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow></msub><msup><mrow/><mrow><mi>y</mi><mo>+</mo>' +
      '<mn>1</mn></mrow></msup></mrow></math>';
  var speech = 'p sub, x sub 1, raised to the y plus 1 power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp107
 */
sre.ClearspeakEnglishExponents.prototype.testExp107 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>2</mn><mn>2' +
      '</mn></msup></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, 2 to the second power, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp108
 */
sre.ClearspeakEnglishExponents.prototype.testExp108 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><mn>2</mn><msup><mi>x' +
      '</mi><mn>2</mn></msup></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, 2 x to the second power, end' +
      ' exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp109
 */
sre.ClearspeakEnglishExponents.prototype.testExp109 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>5</mn><mrow><msup><mn>2</mn><mn>3' +
      '</mn></msup></mrow></msup></mrow></math>';
  var speech = '5 raised to the exponent, 2 to the third power, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp110
 */
sre.ClearspeakEnglishExponents.prototype.testExp110 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>5</mn><mrow><mn>2</mn><msup><mi>x' +
      '</mi><mn>3</mn></msup></mrow></msup></mrow></math>';
  var speech = '5 raised to the exponent, 2 x to the third power, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp111
 */
sre.ClearspeakEnglishExponents.prototype.testExp111 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>2</mn><mn>2' +
      '</mn></msup><mo>+</mo><mn>1</mn></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, 2 to the second power, plus 1,' +
      ' end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp112
 */
sre.ClearspeakEnglishExponents.prototype.testExp112 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>2</mn><mn>2' +
      '</mn></msup></mrow></msup><mo>+</mo><mn>1</mn></mrow></math>';
  var speech = '3 raised to the exponent, 2 to the second power, end' +
      ' exponent, plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp113
 */
sre.ClearspeakEnglishExponents.prototype.testExp113 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>2</mn><mrow><msup><mi>x</mi><mn>2' +
      '</mn></msup><mo>+</mo><mn>3</mn><msup><mi>x</mi><mn>3</mn></msup>' +
      '</mrow></msup></mrow></math>';
  var speech = '2 raised to the exponent, x to the second power, plus 3 x' +
      ' to the third power, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp114
 */
sre.ClearspeakEnglishExponents.prototype.testExp114 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mn>4' +
      '</mn></msup></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, 3 to the fourth power, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp115
 */
sre.ClearspeakEnglishExponents.prototype.testExp115 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mn>4' +
      '</mn></msup><mo>+</mo><mn>2</mn></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, 3 to the fourth power, plus 2,' +
      ' end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp116
 */
sre.ClearspeakEnglishExponents.prototype.testExp116 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mn>4' +
      '</mn></msup></mrow></msup><mo>+</mo><mn>2</mn></mrow></math>';
  var speech = '3 raised to the exponent, 3 to the fourth power, end' +
      ' exponent, plus 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp117
 */
sre.ClearspeakEnglishExponents.prototype.testExp117 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>2</mn><mrow><msup><mi>x</mi><mn>4' +
      '</mn></msup></mrow></msup></mrow></math>';
  var speech = '2 raised to the exponent, x to the fourth power, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp118
 */
sre.ClearspeakEnglishExponents.prototype.testExp118 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>2</mn><mrow><msup><mrow><mn>10</mn>' +
      '</mrow><mrow><mi>x</mi><mo>+</mo><mn>3</mn></mrow></msup></mrow>' +
      '</msup></mrow></math>';
  var speech = '2 raised to the exponent, 10 raised to the x plus 3 power,' +
      ' end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp119
 */
sre.ClearspeakEnglishExponents.prototype.testExp119 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mrow>' +
      '<mn>10</mn></mrow></msup></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, 3 to the tenth power, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp120
 */
sre.ClearspeakEnglishExponents.prototype.testExp120 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mrow>' +
      '<mn>10</mn></mrow></msup><mo>+</mo><mn>1</mn></mrow></msup></mrow>' +
      '</math>';
  var speech = '3 raised to the exponent, 3 to the tenth power, plus 1, end' +
      ' exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp121
 */
sre.ClearspeakEnglishExponents.prototype.testExp121 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mrow>' +
      '<mn>10</mn></mrow></msup></mrow></msup><mo>+</mo><mn>1</mn></mrow>' +
      '</math>';
  var speech = '3 raised to the exponent, 3 to the tenth power, end' +
      ' exponent, plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp122
 */
sre.ClearspeakEnglishExponents.prototype.testExp122 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mrow><mrow><mo>(' +
      '</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow>' +
      '</mrow><mn>2</mn></msup></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, open paren, x plus 1, close' +
      ' paren, to the second power, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp123
 */
sre.ClearspeakEnglishExponents.prototype.testExp123 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mrow><mrow><mo>(' +
      '</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow>' +
      '</mrow><mrow><mn>10</mn></mrow></msup></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, open paren, x plus 1, close' +
      ' paren, to the tenth power, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp124
 */
sre.ClearspeakEnglishExponents.prototype.testExp124 = function() {
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
 * Testing ClearspeakEnglishExponents Example Exp125
 */
sre.ClearspeakEnglishExponents.prototype.testExp125 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mrow><mrow><mo>(' +
      '</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow>' +
      '</mrow><mi>y</mi></msup><mo>+</mo><mn>2</mn></mrow></msup></mrow>' +
      '</math>';
  var speech = '3 raised to the exponent, open paren, x plus 1, close' +
      ' paren, to the y-th power, plus 2, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp126
 */
sre.ClearspeakEnglishExponents.prototype.testExp126 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mrow><mrow><mo>(' +
      '</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow>' +
      '</mrow><mi>y</mi></msup></mrow></msup><mo>+</mo><mn>2</mn></mrow>' +
      '</math>';
  var speech = '3 raised to the exponent, open paren, x plus 1, close' +
      ' paren, to the y-th power, end exponent, plus 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp127
 */
sre.ClearspeakEnglishExponents.prototype.testExp127 = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mi>e</mi><mrow><mo>−</mo><mfrac><mn>1' +
      '</mn><mn>2</mn></mfrac><msup><mi>x</mi><mn>2</mn></msup></mrow>' +
      '</msup></mrow></math>';
  var speech = 'e raised to the exponent, negative one half x to the second' +
      ' power, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp128
 */
sre.ClearspeakEnglishExponents.prototype.testExp128 = function() {
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
 * Testing ClearspeakEnglishExponents Example Exp129
 */
sre.ClearspeakEnglishExponents.prototype.testExp129 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mn>2</mn></msup></mrow></math>';
  var speech = '3 raised to the power 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp130
 */
sre.ClearspeakEnglishExponents.prototype.testExp130 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mn>3</mn></msup></mrow></math>';
  var speech = '3 raised to the power 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp131
 */
sre.ClearspeakEnglishExponents.prototype.testExp131 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mn>1</mn></msup></mrow></math>';
  var speech = '3 raised to the power 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp132b
 */
sre.ClearspeakEnglishExponents.prototype.testExp132b = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mn>0</mn></msup></mrow></math>';
  var speech = '3 raised to the power 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp133
 */
sre.ClearspeakEnglishExponents.prototype.testExp133 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mn>5</mn></msup></mrow></math>';
  var speech = '3 raised to the power 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp134
 */
sre.ClearspeakEnglishExponents.prototype.testExp134 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><mn>5.0</mn></mrow>' +
      '</msup></mrow></math>';
  var speech = '3 raised to the power 5.0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp135
 */
sre.ClearspeakEnglishExponents.prototype.testExp135 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msup><mn>4</mn><mrow><mn>11</mn></mrow></msup>' +
      '</mrow></math>';
  var speech = '4 raised to the power 11';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp136
 */
sre.ClearspeakEnglishExponents.prototype.testExp136 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><mo>−</mo><mn>2</mn>' +
      '</mrow></msup></mrow></math>';
  var speech = '3 raised to the power negative 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp137
 */
sre.ClearspeakEnglishExponents.prototype.testExp137 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><mo>−</mo><mn>2.0</mn>' +
      '</mrow></msup></mrow></math>';
  var speech = '3 raised to the power negative 2.0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp138
 */
sre.ClearspeakEnglishExponents.prototype.testExp138 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msup><mn>4</mn><mi>x</mi></msup></mrow></math>';
  var speech = '4 raised to the power x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp139
 */
sre.ClearspeakEnglishExponents.prototype.testExp139 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><mi>y</mi><mo>+</mo><mn>2' +
      '</mn></mrow></msup></mrow></math>';
  var speech = '3 raised to the power y plus 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp140
 */
sre.ClearspeakEnglishExponents.prototype.testExp140 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mn>2</mn>' +
      '<mi>y</mi><mo>−</mo><mn>3</mn></mrow><mo>)</mo></mrow></mrow><mrow>' +
      '<mn>3</mn><mi>z</mi><mo>+</mo><mn>8</mn></mrow></msup></mrow></math>';
  var speech = 'open paren, 2 y, minus 3, close paren, raised to the power' +
      ' 3 z plus 8';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp141
 */
sre.ClearspeakEnglishExponents.prototype.testExp141 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msub><mi>p</mi><mn>1</mn></msub><msup><mrow/>' +
      '<mn>2</mn></msup></mrow></math>';
  var speech = 'p sub 1, raised to the power 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp142
 */
sre.ClearspeakEnglishExponents.prototype.testExp142 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msub><mi>p</mi><mn>1</mn></msub><msup><mrow/>' +
      '<mn>3</mn></msup></mrow></math>';
  var speech = 'p sub 1, raised to the power 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp143
 */
sre.ClearspeakEnglishExponents.prototype.testExp143 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msub><mi>p</mi><mn>1</mn></msub><msup><mrow/>' +
      '<mn>4</mn></msup></mrow></math>';
  var speech = 'p sub 1, raised to the power 4';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp144
 */
sre.ClearspeakEnglishExponents.prototype.testExp144 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msub><mi>p</mi><mn>1</mn></msub><msup><mrow/>' +
      '<mrow><mn>10</mn></mrow></msup></mrow></math>';
  var speech = 'p sub 1, raised to the power 10';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp145
 */
sre.ClearspeakEnglishExponents.prototype.testExp145 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msub><mi>p</mi><mn>1</mn></msub><msup><mrow/>' +
      '<mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow></msup></mrow></math>';
  var speech = 'p sub 1, raised to the power x plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp146
 */
sre.ClearspeakEnglishExponents.prototype.testExp146 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msub><mi>p</mi><mrow><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow></msub><msup><mrow/><mn>2</mn></msup></mrow></math>';
  var speech = 'p sub, x sub 1, raised to the power 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp147
 */
sre.ClearspeakEnglishExponents.prototype.testExp147 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msub><mi>p</mi><mrow><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow></msub><msup><mrow/><mn>3</mn></msup></mrow></math>';
  var speech = 'p sub, x sub 1, raised to the power 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp148
 */
sre.ClearspeakEnglishExponents.prototype.testExp148 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msub><mi>p</mi><mrow><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow></msub><msup><mrow/><mn>4</mn></msup></mrow></math>';
  var speech = 'p sub, x sub 1, raised to the power 4';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp149
 */
sre.ClearspeakEnglishExponents.prototype.testExp149 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msub><mi>p</mi><mrow><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow></msub><msup><mrow/><mrow><mn>10</mn></mrow>' +
      '</msup></mrow></math>';
  var speech = 'p sub, x sub 1, raised to the power 10';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp150
 */
sre.ClearspeakEnglishExponents.prototype.testExp150 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msub><mi>p</mi><mrow><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow></msub><msup><mrow/><mrow><mi>y</mi><mo>+</mo>' +
      '<mn>1</mn></mrow></msup></mrow></math>';
  var speech = 'p sub, x sub 1, raised to the power y plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp151
 */
sre.ClearspeakEnglishExponents.prototype.testExp151 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>2</mn><mn>2' +
      '</mn></msup></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, 2 raised to the power 2, end' +
      ' exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp152
 */
sre.ClearspeakEnglishExponents.prototype.testExp152 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><mn>2</mn><msup><mi>x' +
      '</mi><mn>2</mn></msup></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, 2 x raised to the power 2, end' +
      ' exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp153
 */
sre.ClearspeakEnglishExponents.prototype.testExp153 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>2</mn><mn>2' +
      '</mn></msup></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, 2 raised to the power 2, end' +
      ' exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp154
 */
sre.ClearspeakEnglishExponents.prototype.testExp154 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><mn>2</mn><msup><mi>x' +
      '</mi><mn>2</mn></msup></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, 2 x raised to the power 2, end' +
      ' exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp155
 */
sre.ClearspeakEnglishExponents.prototype.testExp155 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msup><mn>5</mn><mrow><msup><mn>2</mn><mn>3' +
      '</mn></msup></mrow></msup></mrow></math>';
  var speech = '5 raised to the exponent, 2 raised to the power 3, end' +
      ' exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp156
 */
sre.ClearspeakEnglishExponents.prototype.testExp156 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msup><mn>5</mn><mrow><mn>2</mn><msup><mi>x' +
      '</mi><mn>3</mn></msup></mrow></msup></mrow></math>';
  var speech = '5 raised to the exponent, 2 x raised to the power 3, end' +
      ' exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp157
 */
sre.ClearspeakEnglishExponents.prototype.testExp157 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>2</mn><mn>2' +
      '</mn></msup><mo>+</mo><mn>1</mn></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, 2 raised to the power 2, plus 1,' +
      ' end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp158
 */
sre.ClearspeakEnglishExponents.prototype.testExp158 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>2</mn><mn>2' +
      '</mn></msup></mrow></msup><mo>+</mo><mn>1</mn></mrow></math>';
  var speech = '3 raised to the exponent, 2 raised to the power 2, end' +
      ' exponent, plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp159
 */
sre.ClearspeakEnglishExponents.prototype.testExp159 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msup><mn>2</mn><mrow><msup><mi>x</mi><mn>2' +
      '</mn></msup><mo>+</mo><mn>3</mn><msup><mi>x</mi><mn>3</mn></msup>' +
      '</mrow></msup></mrow></math>';
  var speech = '2 raised to the exponent, x raised to the power 2, plus 3 x' +
      ' raised to the power 3, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp160
 */
sre.ClearspeakEnglishExponents.prototype.testExp160 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mn>4' +
      '</mn></msup></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, 3 raised to the power 4, end' +
      ' exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp161
 */
sre.ClearspeakEnglishExponents.prototype.testExp161 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mn>4' +
      '</mn></msup><mo>+</mo><mn>2</mn></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, 3 raised to the power 4, plus 2,' +
      ' end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp162
 */
sre.ClearspeakEnglishExponents.prototype.testExp162 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mn>4' +
      '</mn></msup></mrow></msup><mo>+</mo><mn>2</mn></mrow></math>';
  var speech = '3 raised to the exponent, 3 raised to the power 4, end' +
      ' exponent, plus 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp163
 */
sre.ClearspeakEnglishExponents.prototype.testExp163 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msup><mn>2</mn><mrow><msup><mi>x</mi><mn>4' +
      '</mn></msup></mrow></msup></mrow></math>';
  var speech = '2 raised to the exponent, x raised to the power 4, end' +
      ' exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp164
 */
sre.ClearspeakEnglishExponents.prototype.testExp164 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msup><mn>2</mn><mrow><msup><mrow><mn>10</mn>' +
      '</mrow><mrow><mi>x</mi><mo>+</mo><mn>3</mn></mrow></msup></mrow>' +
      '</msup></mrow></math>';
  var speech = '2 raised to the exponent, 10 raised to the power x plus 3,' +
      ' end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp165
 */
sre.ClearspeakEnglishExponents.prototype.testExp165 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mrow>' +
      '<mn>10</mn></mrow></msup></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, 3 raised to the power 10, end' +
      ' exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp166
 */
sre.ClearspeakEnglishExponents.prototype.testExp166 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mrow>' +
      '<mn>10</mn></mrow></msup><mo>+</mo><mn>1</mn></mrow></msup></mrow>' +
      '</math>';
  var speech = '3 raised to the exponent, 3 raised to the power 10, plus 1,' +
      ' end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp167
 */
sre.ClearspeakEnglishExponents.prototype.testExp167 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mrow>' +
      '<mn>10</mn></mrow></msup></mrow></msup><mo>+</mo><mn>1</mn></mrow>' +
      '</math>';
  var speech = '3 raised to the exponent, 3 raised to the power 10, end' +
      ' exponent, plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp168
 */
sre.ClearspeakEnglishExponents.prototype.testExp168 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mrow><mrow><mo>(' +
      '</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow>' +
      '</mrow><mn>2</mn></msup></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, open paren, x plus 1, close' +
      ' paren, raised to the power 2, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp169
 */
sre.ClearspeakEnglishExponents.prototype.testExp169 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mrow><mrow><mo>(' +
      '</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow>' +
      '</mrow><mrow><mn>10</mn></mrow></msup></mrow></msup></mrow></math>';
  var speech = '3 raised to the exponent, open paren, x plus 1, close' +
      ' paren, raised to the power 10, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp170
 */
sre.ClearspeakEnglishExponents.prototype.testExp170 = function() {
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
 * Testing ClearspeakEnglishExponents Example Exp171
 */
sre.ClearspeakEnglishExponents.prototype.testExp171 = function() {
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
 * Testing ClearspeakEnglishExponents Example Exp172
 */
sre.ClearspeakEnglishExponents.prototype.testExp172 = function() {
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
 * Testing ClearspeakEnglishExponents Example Exp173
 */
sre.ClearspeakEnglishExponents.prototype.testExp173 = function() {
  var preference = 'Exponent_AfterPower';
  var mathml = '<math><mrow><msup><mi>e</mi><mrow><mo>−</mo><mfrac><mn>1' +
      '</mn><mn>2</mn></mfrac><msup><mi>x</mi><mn>2</mn></msup></mrow>' +
      '</msup></mrow></math>';
  var speech = 'e raised to the exponent, negative one half x raised to the' +
      ' power 2, end exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishExponents Example Exp174
 */
sre.ClearspeakEnglishExponents.prototype.testExp174 = function() {
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

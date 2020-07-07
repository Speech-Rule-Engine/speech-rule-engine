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


goog.provide('sre.ClearspeakGermanExponents');

goog.require('sre.ClearspeakGermanRuleTest');



/**
* @constructor
* @extends {sre.ClearspeakGermanRuleTest}
*/
sre.ClearspeakGermanExponents = function() {

  sre.ClearspeakGermanExponents.base(this, 'constructor');

  /**
   * @override
   */
  this.information = 'ClearspeakGermanExponents rule tests.';

};
goog.inherits(sre.ClearspeakGermanExponents, sre.ClearspeakGermanRuleTest);



//
// Exponents
//


/**
 * Testing ClearspeakGermanExponents Example Exp001
 */
sre.ClearspeakGermanExponents.prototype.testExp001 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mn>2</mn></msup></mrow></math>';
  var speech = '3 Quadrat';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp002a
 */
sre.ClearspeakGermanExponents.prototype.testExp002a = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mn>3</mn></msup></mrow></math>';
  var speech = '3 Kubik';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp003
 */
sre.ClearspeakGermanExponents.prototype.testExp003 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mn>5</mn></msup></mrow></math>';
  var speech = '3 hoch 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp004
 */
sre.ClearspeakGermanExponents.prototype.testExp004 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mn>1</mn></msup></mrow></math>';
  var speech = '3 hoch 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp005
 */
sre.ClearspeakGermanExponents.prototype.testExp005 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mi>b</mi><mn>1</mn></msup></mrow></math>';
  var speech = 'b hoch 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp006
 */
sre.ClearspeakGermanExponents.prototype.testExp006 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><mn>5.0</mn></mrow>' +
      '</msup></mrow></math>';
  var speech = '3 hoch 5\\,0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp007
 */
sre.ClearspeakGermanExponents.prototype.testExp007 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mn>0</mn></msup></mrow></math>';
  var speech = '3 hoch 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp008
 */
sre.ClearspeakGermanExponents.prototype.testExp008 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>4</mn><mrow><mn>11</mn></mrow></msup>' +
      '</mrow></math>';
  var speech = '4 hoch 11';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp009
 */
sre.ClearspeakGermanExponents.prototype.testExp009 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><mo>−</mo><mn>2</mn>' +
      '</mrow></msup></mrow></math>';
  var speech = '3 hoch minus 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp010a
 */
sre.ClearspeakGermanExponents.prototype.testExp010a = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><mo>−</mo><mn>2.0</mn>' +
      '</mrow></msup></mrow></math>';
  var speech = '3 hoch minus 2\\,0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp011
 */
sre.ClearspeakGermanExponents.prototype.testExp011 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>4</mn><mi>x</mi></msup></mrow></math>';
  var speech = '4 hoch x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp012
 */
sre.ClearspeakGermanExponents.prototype.testExp012 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><mi>y</mi><mo>+</mo><mn>2' +
      '</mn></mrow></msup></mrow></math>';
  var speech = '3 hoch y plus 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp013
 */
sre.ClearspeakGermanExponents.prototype.testExp013 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mn>2</mn>' +
      '<mi>y</mi><mo>−</mo><mn>3</mn></mrow><mo>)</mo></mrow></mrow><mrow>' +
      '<mn>3</mn><mi>z</mi><mo>+</mo><mn>8</mn></mrow></msup></mrow></math>';
  var speech = 'Klammer auf, 2 y, minus 3, Klammer zu, hoch 3 z, plus 8';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp014
 */
sre.ClearspeakGermanExponents.prototype.testExp014 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msubsup><mi>p</mi><mn>1</mn><mn>2</mn>' +
      '</msubsup></mrow></math>';
  var speech = 'p Index 1, Quadrat';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp015
 */
sre.ClearspeakGermanExponents.prototype.testExp015 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msubsup><mi>p</mi><mn>1</mn><mn>3</mn>' +
      '</msubsup></mrow></math>';
  var speech = 'p Index 1, Kubik';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp016
 */
sre.ClearspeakGermanExponents.prototype.testExp016 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msubsup><mi>p</mi><mn>1</mn><mn>4</mn>' +
      '</msubsup></mrow></math>';
  var speech = 'p Index 1, hoch 4';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp017
 */
sre.ClearspeakGermanExponents.prototype.testExp017 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msubsup><mi>p</mi><mn>1</mn><mrow><mn>10</mn>' +
      '</mrow></msubsup></mrow></math>';
  var speech = 'p Index 1, hoch 10';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp018
 */
sre.ClearspeakGermanExponents.prototype.testExp018 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msubsup><mi>p</mi><mn>1</mn><mrow><mi>x</mi>' +
      '<mo>+</mo><mn>1</mn></mrow></msubsup></mrow></math>';
  var speech = 'p Index 1, hoch x plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp019
 */
sre.ClearspeakGermanExponents.prototype.testExp019 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msubsup><mi>p</mi><mrow><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow><mn>2</mn></msubsup></mrow></math>';
  var speech = 'p Index, x Index 1, Quadrat';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp010b
 */
sre.ClearspeakGermanExponents.prototype.testExp010b = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msubsup><mi>p</mi><mrow><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow><mn>3</mn></msubsup></mrow></math>';
  var speech = 'p Index, x Index 1, Kubik';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp011b
 */
sre.ClearspeakGermanExponents.prototype.testExp011b = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msubsup><mi>p</mi><mrow><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow><mn>4</mn></msubsup></mrow></math>';
  var speech = 'p Index, x Index 1, hoch 4';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp012b
 */
sre.ClearspeakGermanExponents.prototype.testExp012b = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msubsup><mi>p</mi><mrow><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow><mrow><mn>10</mn></mrow></msubsup></mrow></math>';
  var speech = 'p Index, x Index 1, hoch 10';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp013b
 */
sre.ClearspeakGermanExponents.prototype.testExp013b = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msubsup><mi>p</mi><mrow><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow><mrow><mi>y</mi><mo>+</mo><mn>1</mn></mrow>' +
      '</msubsup></mrow></math>';
  var speech = 'p Index, x Index 1, hoch y plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp014b
 */
sre.ClearspeakGermanExponents.prototype.testExp014b = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>2</mn><mn>2' +
      '</mn></msup></mrow></msup></mrow></math>';
  var speech = '3 hoch 2 Quadrat';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp015b
 */
sre.ClearspeakGermanExponents.prototype.testExp015b = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><mn>2</mn><msup><mi>x' +
      '</mi><mn>2</mn></msup></mrow></msup></mrow></math>';
  var speech = '3 hoch 2 x Quadrat';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp016b
 */
sre.ClearspeakGermanExponents.prototype.testExp016b = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>5</mn><mrow><msup><mn>2</mn><mn>3' +
      '</mn></msup></mrow></msup></mrow></math>';
  var speech = '5 hoch 2 Kubik';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp017b
 */
sre.ClearspeakGermanExponents.prototype.testExp017b = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>5</mn><mrow><mn>2</mn><msup><mi>x' +
      '</mi><mn>3</mn></msup></mrow></msup></mrow></math>';
  var speech = '5 hoch 2 x Kubik';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp018b
 */
sre.ClearspeakGermanExponents.prototype.testExp018b = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>2</mn><mn>2' +
      '</mn></msup><mo>+</mo><mn>1</mn></mrow></msup></mrow></math>';
  var speech = '3 mit Exponent, 2 Quadrat plus 1, Ende Exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp019b
 */
sre.ClearspeakGermanExponents.prototype.testExp019b = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>2</mn><mn>2' +
      '</mn></msup></mrow></msup><mo>+</mo><mn>1</mn></mrow></math>';
  var speech = '3 hoch 2 Quadrat, plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp020
 */
sre.ClearspeakGermanExponents.prototype.testExp020 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>2</mn><mrow><msup><mi>x</mi><mn>2' +
      '</mn></msup><mo>+</mo><mn>3</mn><msup><mi>x</mi><mn>3</mn></msup>' +
      '</mrow></msup></mrow></math>';
  var speech = '2 mit Exponent, x Quadrat plus 3 x Kubik, Ende Exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp021
 */
sre.ClearspeakGermanExponents.prototype.testExp021 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mn>4' +
      '</mn></msup></mrow></msup></mrow></math>';
  var speech = '3 mit Exponent, 3 hoch 4, Ende Exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp022
 */
sre.ClearspeakGermanExponents.prototype.testExp022 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mn>4' +
      '</mn></msup><mo>+</mo><mn>2</mn></mrow></msup></mrow></math>';
  var speech = '3 mit Exponent, 3 hoch 4, plus 2, Ende Exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp023
 */
sre.ClearspeakGermanExponents.prototype.testExp023 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mn>4' +
      '</mn></msup></mrow></msup><mo>+</mo><mn>2</mn></mrow></math>';
  var speech = '3 mit Exponent, 3 hoch 4, Ende Exponent, plus 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp024
 */
sre.ClearspeakGermanExponents.prototype.testExp024 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>2</mn><mrow><msup><mi>x</mi><mn>4' +
      '</mn></msup></mrow></msup></mrow></math>';
  var speech = '2 mit Exponent, x hoch 4, Ende Exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp025
 */
sre.ClearspeakGermanExponents.prototype.testExp025 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>2</mn><mrow><msup><mrow><mn>10</mn>' +
      '</mrow><mrow><mi>x</mi><mo>+</mo><mn>3</mn></mrow></msup></mrow>' +
      '</msup></mrow></math>';
  var speech = '2 mit Exponent, 10 hoch x plus 3, Ende Exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp026
 */
sre.ClearspeakGermanExponents.prototype.testExp026 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mrow>' +
      '<mn>10</mn></mrow></msup></mrow></msup></mrow></math>';
  var speech = '3 mit Exponent, 3 hoch 10, Ende Exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp027
 */
sre.ClearspeakGermanExponents.prototype.testExp027 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mrow>' +
      '<mn>10</mn></mrow></msup><mo>+</mo><mn>1</mn></mrow></msup></mrow>' +
      '</math>';
  var speech = '3 mit Exponent, 3 hoch 10, plus 1, Ende Exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp028
 */
sre.ClearspeakGermanExponents.prototype.testExp028 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mrow>' +
      '<mn>10</mn></mrow></msup></mrow></msup><mo>+</mo><mn>1</mn></mrow>' +
      '</math>';
  var speech = '3 mit Exponent, 3 hoch 10, Ende Exponent, plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp029
 */
sre.ClearspeakGermanExponents.prototype.testExp029 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mrow><mrow><mo>(' +
      '</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow>' +
      '</mrow><mn>2</mn></msup></mrow></msup></mrow></math>';
  var speech = '3 mit Exponent, Klammer auf, x plus 1, Klammer zu, Quadrat, Ende Exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp030
 */
sre.ClearspeakGermanExponents.prototype.testExp030 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mrow><mrow><mo>(' +
      '</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow>' +
      '</mrow><mrow><mn>10</mn></mrow></msup></mrow></msup></mrow></math>';
  var speech = '3 mit Exponent, Klammer auf, x plus 1, Klammer zu, hoch 10, Ende Exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp031
 */
sre.ClearspeakGermanExponents.prototype.testExp031 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mrow><mrow><mo>(' +
      '</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow>' +
      '</mrow><mrow><mi>y</mi><mo>+</mo><mn>2</mn></mrow></msup></mrow>' +
      '</msup></mrow></math>';
  var speech = '3 mit Exponent, Klammer auf, x plus 1, Klammer zu, hoch y plus 2, Ende Exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp032
 */
sre.ClearspeakGermanExponents.prototype.testExp032 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mrow><mrow><mo>(' +
      '</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow>' +
      '</mrow><mi>y</mi></msup><mo>+</mo><mn>2</mn></mrow></msup></mrow>' +
      '</math>';
  var speech = '3 mit Exponent, Klammer auf, x plus 1, Klammer zu, hoch y, plus 2, Ende Exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp033
 */
sre.ClearspeakGermanExponents.prototype.testExp033 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mrow><mrow><mo>(' +
      '</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow>' +
      '</mrow><mi>y</mi></msup></mrow></msup><mo>+</mo><mn>2</mn></mrow>' +
      '</math>';
  var speech = '3 mit Exponent, Klammer auf, x plus 1, Klammer zu, hoch y, Ende Exponent, plus 2';
  this.executeRuleTest(mathml, speech, preference);
};


// TODO: (Simons) This does not work as semantically we have a -(xy) rather than
//       (-x)(y).
/**
 * Testing ClearspeakGermanExponents Example Exp034
 */
sre.ClearspeakGermanExponents.prototype.untestExp034 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mi>e</mi><mrow><mo>−</mo><mfrac><mn>1' +
      '</mn><mn>2</mn></mfrac><msup><mi>x</mi><mn>2</mn></msup></mrow>' +
      '</msup></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp035
 */
sre.ClearspeakGermanExponents.prototype.testExp035 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mi>e</mi><mrow><mo>−</mo><mfrac><mn>1' +
      '</mn><mn>2</mn></mfrac><msup><mrow><mrow><mo>(</mo><mrow><mfrac>' +
      '<mrow><mi>x</mi><mo>−</mo><mi>μ</mi></mrow><mi>σ</mi></mfrac></mrow>' +
      '<mo>)</mo></mrow></mrow><mn>2</mn></msup></mrow></msup></mrow></math>';
  var speech = 'e mit Exponent, minus ein halb  , Klammer auf, Bruch mit Zähler x minus my, und Nenner sigma, Klammer zu, Quadrat, Ende Exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp036
 */
sre.ClearspeakGermanExponents.prototype.testExp036 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>2</mn><mi>n</mi></msup></mrow></math>';
  var speech = '2 hoch n';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp037
 */
sre.ClearspeakGermanExponents.prototype.testExp037 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>2</mn><mi>m</mi></msup></mrow></math>';
  var speech = '2 hoch m';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp038
 */
sre.ClearspeakGermanExponents.prototype.testExp038 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>2</mn><mi>i</mi></msup></mrow></math>';
  var speech = '2 hoch i';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp039
 */
sre.ClearspeakGermanExponents.prototype.testExp039 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>2</mn><mi>j</mi></msup></mrow></math>';
  var speech = '2 hoch j';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp40
 */
sre.ClearspeakGermanExponents.prototype.testExp40 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>2</mn><mi>a</mi></msup></mrow></math>';
  var speech = '2 hoch a';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp085
 */
sre.ClearspeakGermanExponents.prototype.testExp085n = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mn>2</mn></msup></mrow></math>';
  var speech = '3 zur zweiten Potenz';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp086
 */
sre.ClearspeakGermanExponents.prototype.testExp086n = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mn>3</mn></msup></mrow></math>';
  var speech = '3 zur dritten Potenz';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp087
 */
sre.ClearspeakGermanExponents.prototype.testExp087n = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mn>0</mn></msup></mrow></math>';
  var speech = '3 zur nullten Potenz';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp088
 */
sre.ClearspeakGermanExponents.prototype.testExp088n = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mn>1</mn></msup></mrow></math>';
  var speech = '3 zur ersten Potenz';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp089
 */
sre.ClearspeakGermanExponents.prototype.testExp089n = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mn>5</mn></msup></mrow></math>';
  var speech = '3 zur fünften Potenz';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp090
 */
sre.ClearspeakGermanExponents.prototype.testExp090n = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><mn>5.0</mn></mrow>' +
      '</msup></mrow></math>';
  var speech = '3 potenziert mit 5\\,0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp091
 */
sre.ClearspeakGermanExponents.prototype.testExp091n = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>4</mn><mrow><mn>11</mn></mrow></msup>' +
      '</mrow></math>';
  var speech = '4 zur elften Potenz';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp092
 */
sre.ClearspeakGermanExponents.prototype.testExp092n = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><mo>−</mo><mn>2</mn>' +
      '</mrow></msup></mrow></math>';
  var speech = '3 zur negativ zweiten Potenz';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp093
 */
sre.ClearspeakGermanExponents.prototype.testExp093n = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><mo>−</mo><mn>2.0</mn>' +
      '</mrow></msup></mrow></math>';
  var speech = '3 potenziert mit minus 2\\,0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp094
 */
sre.ClearspeakGermanExponents.prototype.testExp094n = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>4</mn><mi>x</mi></msup></mrow></math>';
  var speech = '4 zur xten Potenz';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp095
 */
sre.ClearspeakGermanExponents.prototype.testExp095n = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><mi>y</mi><mo>+</mo><mn>2' +
      '</mn></mrow></msup></mrow></math>';
  var speech = '3 potenziert mit y plus 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp096
 */
sre.ClearspeakGermanExponents.prototype.testExp096n = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mn>2</mn>' +
      '<mi>y</mi><mo>−</mo><mn>3</mn></mrow><mo>)</mo></mrow></mrow><mrow>' +
      '<mn>3</mn><mi>z</mi><mo>+</mo><mn>8</mn></mrow></msup></mrow></math>';
  var speech = 'Klammer auf, 2 y, minus 3, Klammer zu, potenziert mit 3 z, plus 8';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp097
 */
sre.ClearspeakGermanExponents.prototype.testExp097n = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msub><mi>p</mi><mn>1</mn></msub><msup><mrow/>' +
      '<mn>2</mn></msup></mrow></math>';
  var speech = 'p Index 1, zur zweiten Potenz';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp098
 */
sre.ClearspeakGermanExponents.prototype.testExp098n = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msub><mi>p</mi><mn>1</mn></msub><msup><mrow/>' +
      '<mn>3</mn></msup></mrow></math>';
  var speech = 'p Index 1, zur dritten Potenz';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp099
 */
sre.ClearspeakGermanExponents.prototype.testExp099n = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msub><mi>p</mi><mn>1</mn></msub><msup><mrow/>' +
      '<mn>4</mn></msup></mrow></math>';
  var speech = 'p Index 1, zur vierten Potenz';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp100
 */
sre.ClearspeakGermanExponents.prototype.testExp100n = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msub><mi>p</mi><mn>1</mn></msub><msup><mrow/>' +
      '<mrow><mn>10</mn></mrow></msup></mrow></math>';
  var speech = 'p Index 1, zur zehnten Potenz';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp101
 */
sre.ClearspeakGermanExponents.prototype.testExp101n = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msub><mi>p</mi><mn>1</mn></msub><msup><mrow/>' +
      '<mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow></msup></mrow></math>';
  var speech = 'p Index 1, potenziert mit x plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp102
 */
sre.ClearspeakGermanExponents.prototype.testExp102n = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msub><mi>p</mi><mrow><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow></msub><msup><mrow/><mn>2</mn></msup></mrow></math>';
  var speech = 'p Index, x Index 1, zur zweiten Potenz';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp103
 */
sre.ClearspeakGermanExponents.prototype.testExp103n = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msub><mi>p</mi><mrow><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow></msub><msup><mrow/><mn>3</mn></msup></mrow></math>';
  var speech = 'p Index, x Index 1, zur dritten Potenz';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp104
 */
sre.ClearspeakGermanExponents.prototype.testExp104n = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msub><mi>p</mi><mrow><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow></msub><msup><mrow/><mn>4</mn></msup></mrow></math>';
  var speech = 'p Index, x Index 1, zur vierten Potenz';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp105
 */
sre.ClearspeakGermanExponents.prototype.testExp105n = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msub><mi>p</mi><mrow><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow></msub><msup><mrow/><mrow><mn>10</mn></mrow>' +
      '</msup></mrow></math>';
  var speech = 'p Index, x Index 1, zur zehnten Potenz';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp106
 */
sre.ClearspeakGermanExponents.prototype.testExp106n = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msub><mi>p</mi><mrow><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow></msub><msup><mrow/><mrow><mi>y</mi><mo>+</mo>' +
      '<mn>1</mn></mrow></msup></mrow></math>';
  var speech = 'p Index, x Index 1, potenziert mit y plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp107
 */
sre.ClearspeakGermanExponents.prototype.testExp107n = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>2</mn><mn>2' +
      '</mn></msup></mrow></msup></mrow></math>';
  var speech = '3 potenziert mit 2 zur zweiten Potenz';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp108
 */
sre.ClearspeakGermanExponents.prototype.testExp108n = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><mn>2</mn><msup><mi>x' +
      '</mi><mn>2</mn></msup></mrow></msup></mrow></math>';
  var speech = '3 potenziert mit 2 x zur zweiten Potenz';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp109
 */
sre.ClearspeakGermanExponents.prototype.testExp109n = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>5</mn><mrow><msup><mn>2</mn><mn>3' +
      '</mn></msup></mrow></msup></mrow></math>';
  var speech = '5 potenziert mit 2 zur dritten Potenz';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp110
 */
sre.ClearspeakGermanExponents.prototype.testExp110n = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>5</mn><mrow><mn>2</mn><msup><mi>x' +
      '</mi><mn>3</mn></msup></mrow></msup></mrow></math>';
  var speech = '5 potenziert mit 2 x zur dritten Potenz';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp111
 */
sre.ClearspeakGermanExponents.prototype.testExp111n = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>2</mn><mn>2' +
      '</mn></msup><mo>+</mo><mn>1</mn></mrow></msup></mrow></math>';
  var speech = '3 mit Exponent, 2 zur zweiten Potenz, plus 1, Ende Exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp112
 */
sre.ClearspeakGermanExponents.prototype.testExp112n = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>2</mn><mn>2' +
      '</mn></msup></mrow></msup><mo>+</mo><mn>1</mn></mrow></math>';
  var speech = '3 potenziert mit 2 zur zweiten Potenz, plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp113
 */
sre.ClearspeakGermanExponents.prototype.testExp113n = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>2</mn><mrow><msup><mi>x</mi><mn>2' +
      '</mn></msup><mo>+</mo><mn>3</mn><msup><mi>x</mi><mn>3</mn></msup>' +
      '</mrow></msup></mrow></math>';
  var speech = '2 mit Exponent, x zur zweiten Potenz, plus 3 x zur dritten Potenz, Ende Exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp114
 */
sre.ClearspeakGermanExponents.prototype.testExp114n = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mn>4' +
      '</mn></msup></mrow></msup></mrow></math>';
  var speech = '3 mit Exponent, 3 zur vierten Potenz, Ende Exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp115
 */
sre.ClearspeakGermanExponents.prototype.testExp115n = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mn>4' +
      '</mn></msup><mo>+</mo><mn>2</mn></mrow></msup></mrow></math>';
  var speech = '3 mit Exponent, 3 zur vierten Potenz, plus 2, Ende Exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp116
 */
sre.ClearspeakGermanExponents.prototype.testExp116n = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mn>4' +
      '</mn></msup></mrow></msup><mo>+</mo><mn>2</mn></mrow></math>';
  var speech = '3 mit Exponent, 3 zur vierten Potenz, Ende Exponent, plus 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp117
 */
sre.ClearspeakGermanExponents.prototype.testExp117n = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>2</mn><mrow><msup><mi>x</mi><mn>4' +
      '</mn></msup></mrow></msup></mrow></math>';
  var speech = '2 mit Exponent, x zur vierten Potenz, Ende Exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp118
 */
sre.ClearspeakGermanExponents.prototype.testExp118n = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>2</mn><mrow><msup><mrow><mn>10</mn>' +
      '</mrow><mrow><mi>x</mi><mo>+</mo><mn>3</mn></mrow></msup></mrow>' +
      '</msup></mrow></math>';
  var speech = '2 mit Exponent, 10 potenziert mit x plus 3, Ende Exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp119
 */
sre.ClearspeakGermanExponents.prototype.testExp119n = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mrow>' +
      '<mn>10</mn></mrow></msup></mrow></msup></mrow></math>';
  var speech = '3 mit Exponent, 3 zur zehnten Potenz, Ende Exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp120
 */
sre.ClearspeakGermanExponents.prototype.testExp120n = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mrow>' +
      '<mn>10</mn></mrow></msup><mo>+</mo><mn>1</mn></mrow></msup></mrow>' +
      '</math>';
  var speech = '3 mit Exponent, 3 zur zehnten Potenz, plus 1, Ende Exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp121
 */
sre.ClearspeakGermanExponents.prototype.testExp121n = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mrow>' +
      '<mn>10</mn></mrow></msup></mrow></msup><mo>+</mo><mn>1</mn></mrow>' +
      '</math>';
  var speech = '3 mit Exponent, 3 zur zehnten Potenz, Ende Exponent, plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp122
 */
sre.ClearspeakGermanExponents.prototype.testExp122n = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mrow><mrow><mo>(' +
      '</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow>' +
      '</mrow><mn>2</mn></msup></mrow></msup></mrow></math>';
  var speech = '3 mit Exponent, Klammer auf, x plus 1, Klammer zu, zur zweiten Potenz, Ende Exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp123
 */
sre.ClearspeakGermanExponents.prototype.testExp123n = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mrow><mrow><mo>(' +
      '</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow>' +
      '</mrow><mrow><mn>10</mn></mrow></msup></mrow></msup></mrow></math>';
  var speech = '3 mit Exponent, Klammer auf, x plus 1, Klammer zu, zur zehnten Potenz, Ende Exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp124
 */
sre.ClearspeakGermanExponents.prototype.testExp124n = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mrow><mrow><mo>(' +
      '</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow>' +
      '</mrow><mrow><mi>y</mi><mo>+</mo><mn>2</mn></mrow></msup></mrow>' +
      '</msup></mrow></math>';
  var speech = '3 mit Exponent, Klammer auf, x plus 1, Klammer zu, potenziert mit y plus 2, Ende Exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp125
 */
sre.ClearspeakGermanExponents.prototype.testExp125n = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mrow><mrow><mo>(' +
      '</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow>' +
      '</mrow><mi>y</mi></msup><mo>+</mo><mn>2</mn></mrow></msup></mrow>' +
      '</math>';
  var speech = '3 mit Exponent, Klammer auf, x plus 1, Klammer zu, zur yten Potenz, plus 2, Ende Exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp126
 */
sre.ClearspeakGermanExponents.prototype.testExp126n = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mrow><mrow><mo>(' +
      '</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow>' +
      '</mrow><mi>y</mi></msup></mrow></msup><mo>+</mo><mn>2</mn></mrow>' +
      '</math>';
  var speech = '3 mit Exponent, Klammer auf, x plus 1, Klammer zu, zur yten Potenz, Ende Exponent, plus 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp127
 */
sre.ClearspeakGermanExponents.prototype.testExp127n = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mi>e</mi><mrow><mo>−</mo><mfrac><mn>1' +
      '</mn><mn>2</mn></mfrac><msup><mi>x</mi><mn>2</mn></msup></mrow>' +
      '</msup></mrow></math>';
  var speech = 'e mit Exponent, minus ein halb x zur zweiten Potenz, Ende Exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp128
 */
sre.ClearspeakGermanExponents.prototype.testExp128n = function() {
  var preference = 'Exponent_OrdinalPower';
  var mathml = '<math><mrow><msup><mi>e</mi><mrow><mo>−</mo><mfrac><mn>1' +
      '</mn><mn>2</mn></mfrac><msup><mrow><mrow><mo>(</mo><mrow><mfrac>' +
      '<mrow><mi>x</mi><mo>−</mo><mi>μ</mi></mrow><mi>σ</mi></mfrac></mrow>' +
      '<mo>)</mo></mrow></mrow><mn>2</mn></msup></mrow></msup></mrow></math>';
  var speech = 'e mit Exponent, minus ein halb  , Klammer auf, Bruch mit Zähler x minus my, und Nenner sigma, Klammer zu, zur zweiten Potenz, Ende Exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp129
 */
sre.ClearspeakGermanExponents.prototype.testExp129m = function() {
  var preference = 'Exponent_Exponent';
  var mathml = '<math><mrow><msup><mn>3</mn><mn>2</mn></msup></mrow></math>';
  var speech = '3 mit Exponent 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp130
 */
sre.ClearspeakGermanExponents.prototype.testExp130m = function() {
  var preference = 'Exponent_Exponent';
  var mathml = '<math><mrow><msup><mn>3</mn><mn>3</mn></msup></mrow></math>';
  var speech = '3 mit Exponent 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp131
 */
sre.ClearspeakGermanExponents.prototype.testExp131m = function() {
  var preference = 'Exponent_Exponent';
  var mathml = '<math><mrow><msup><mn>3</mn><mn>1</mn></msup></mrow></math>';
  var speech = '3 mit Exponent 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp132b
 */
sre.ClearspeakGermanExponents.prototype.testExp132bm = function() {
  var preference = 'Exponent_Exponent';
  var mathml = '<math><mrow><msup><mn>3</mn><mn>0</mn></msup></mrow></math>';
  var speech = '3 mit Exponent 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp133
 */
sre.ClearspeakGermanExponents.prototype.testExp133m = function() {
  var preference = 'Exponent_Exponent';
  var mathml = '<math><mrow><msup><mn>3</mn><mn>5</mn></msup></mrow></math>';
  var speech = '3 mit Exponent 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp134
 */
sre.ClearspeakGermanExponents.prototype.testExp134m = function() {
  var preference = 'Exponent_Exponent';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><mn>5.0</mn></mrow>' +
      '</msup></mrow></math>';
  var speech = '3 mit Exponent 5\\,0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp135
 */
sre.ClearspeakGermanExponents.prototype.testExp135m = function() {
  var preference = 'Exponent_Exponent';
  var mathml = '<math><mrow><msup><mn>4</mn><mrow><mn>11</mn></mrow></msup>' +
      '</mrow></math>';
  var speech = '4 mit Exponent 11';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp136
 */
sre.ClearspeakGermanExponents.prototype.testExp136m = function() {
  var preference = 'Exponent_Exponent';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><mo>−</mo><mn>2</mn>' +
      '</mrow></msup></mrow></math>';
  var speech = '3 mit Exponent minus 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp137
 */
sre.ClearspeakGermanExponents.prototype.testExp137m = function() {
  var preference = 'Exponent_Exponent';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><mo>−</mo><mn>2.0</mn>' +
      '</mrow></msup></mrow></math>';
  var speech = '3 mit Exponent minus 2\\,0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp138
 */
sre.ClearspeakGermanExponents.prototype.testExp138m = function() {
  var preference = 'Exponent_Exponent';
  var mathml = '<math><mrow><msup><mn>4</mn><mi>x</mi></msup></mrow></math>';
  var speech = '4 mit Exponent x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp139
 */
sre.ClearspeakGermanExponents.prototype.testExp139m = function() {
  var preference = 'Exponent_Exponent';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><mi>y</mi><mo>+</mo><mn>2' +
      '</mn></mrow></msup></mrow></math>';
  var speech = '3 mit Exponent y plus 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp140
 */
sre.ClearspeakGermanExponents.prototype.testExp140m = function() {
  var preference = 'Exponent_Exponent';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mn>2</mn>' +
      '<mi>y</mi><mo>−</mo><mn>3</mn></mrow><mo>)</mo></mrow></mrow><mrow>' +
      '<mn>3</mn><mi>z</mi><mo>+</mo><mn>8</mn></mrow></msup></mrow></math>';
  var speech = 'Klammer auf, 2 y, minus 3, Klammer zu, mit Exponent 3 z, plus 8';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp141
 */
sre.ClearspeakGermanExponents.prototype.testExp141m = function() {
  var preference = 'Exponent_Exponent';
  var mathml = '<math><mrow><msub><mi>p</mi><mn>1</mn></msub><msup><mrow/>' +
      '<mn>2</mn></msup></mrow></math>';
  var speech = 'p Index 1, mit Exponent 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp142
 */
sre.ClearspeakGermanExponents.prototype.testExp142m = function() {
  var preference = 'Exponent_Exponent';
  var mathml = '<math><mrow><msub><mi>p</mi><mn>1</mn></msub><msup><mrow/>' +
      '<mn>3</mn></msup></mrow></math>';
  var speech = 'p Index 1, mit Exponent 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp143
 */
sre.ClearspeakGermanExponents.prototype.testExp143m = function() {
  var preference = 'Exponent_Exponent';
  var mathml = '<math><mrow><msub><mi>p</mi><mn>1</mn></msub><msup><mrow/>' +
      '<mn>4</mn></msup></mrow></math>';
  var speech = 'p Index 1, mit Exponent 4';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp144
 */
sre.ClearspeakGermanExponents.prototype.testExp144m = function() {
  var preference = 'Exponent_Exponent';
  var mathml = '<math><mrow><msub><mi>p</mi><mn>1</mn></msub><msup><mrow/>' +
      '<mrow><mn>10</mn></mrow></msup></mrow></math>';
  var speech = 'p Index 1, mit Exponent 10';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp145
 */
sre.ClearspeakGermanExponents.prototype.testExp145m = function() {
  var preference = 'Exponent_Exponent';
  var mathml = '<math><mrow><msub><mi>p</mi><mn>1</mn></msub><msup><mrow/>' +
      '<mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow></msup></mrow></math>';
  var speech = 'p Index 1, mit Exponent x plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp146
 */
sre.ClearspeakGermanExponents.prototype.testExp146m = function() {
  var preference = 'Exponent_Exponent';
  var mathml = '<math><mrow><msub><mi>p</mi><mrow><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow></msub><msup><mrow/><mn>2</mn></msup></mrow></math>';
  var speech = 'p Index, x Index 1, mit Exponent 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp147
 */
sre.ClearspeakGermanExponents.prototype.testExp147m = function() {
  var preference = 'Exponent_Exponent';
  var mathml = '<math><mrow><msub><mi>p</mi><mrow><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow></msub><msup><mrow/><mn>3</mn></msup></mrow></math>';
  var speech = 'p Index, x Index 1, mit Exponent 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp148
 */
sre.ClearspeakGermanExponents.prototype.testExp148m = function() {
  var preference = 'Exponent_Exponent';
  var mathml = '<math><mrow><msub><mi>p</mi><mrow><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow></msub><msup><mrow/><mn>4</mn></msup></mrow></math>';
  var speech = 'p Index, x Index 1, mit Exponent 4';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp149
 */
sre.ClearspeakGermanExponents.prototype.testExp149m = function() {
  var preference = 'Exponent_Exponent';
  var mathml = '<math><mrow><msub><mi>p</mi><mrow><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow></msub><msup><mrow/><mrow><mn>10</mn></mrow>' +
      '</msup></mrow></math>';
  var speech = 'p Index, x Index 1, mit Exponent 10';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp150
 */
sre.ClearspeakGermanExponents.prototype.testExp150m = function() {
  var preference = 'Exponent_Exponent';
  var mathml = '<math><mrow><msub><mi>p</mi><mrow><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow></msub><msup><mrow/><mrow><mi>y</mi><mo>+</mo>' +
      '<mn>1</mn></mrow></msup></mrow></math>';
  var speech = 'p Index, x Index 1, mit Exponent y plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp151
 */
sre.ClearspeakGermanExponents.prototype.testExp151m = function() {
  var preference = 'Exponent_Exponent';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>2</mn><mn>2' +
      '</mn></msup></mrow></msup></mrow></math>';
  var speech = '3 mit Exponent 2 mit Exponent 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp152
 */
sre.ClearspeakGermanExponents.prototype.testExp152m = function() {
  var preference = 'Exponent_Exponent';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><mn>2</mn><msup><mi>x' +
      '</mi><mn>2</mn></msup></mrow></msup></mrow></math>';
  var speech = '3 mit Exponent 2 x mit Exponent 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp153
 */
sre.ClearspeakGermanExponents.prototype.testExp153m = function() {
  var preference = 'Exponent_Exponent';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>2</mn><mn>2' +
      '</mn></msup></mrow></msup></mrow></math>';
  var speech = '3 mit Exponent 2 mit Exponent 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp154
 */
sre.ClearspeakGermanExponents.prototype.testExp154m = function() {
  var preference = 'Exponent_Exponent';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><mn>2</mn><msup><mi>x' +
      '</mi><mn>2</mn></msup></mrow></msup></mrow></math>';
  var speech = '3 mit Exponent 2 x mit Exponent 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp155
 */
sre.ClearspeakGermanExponents.prototype.testExp155m = function() {
  var preference = 'Exponent_Exponent';
  var mathml = '<math><mrow><msup><mn>5</mn><mrow><msup><mn>2</mn><mn>3' +
      '</mn></msup></mrow></msup></mrow></math>';
  var speech = '5 mit Exponent 2 mit Exponent 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp156
 */
sre.ClearspeakGermanExponents.prototype.testExp156m = function() {
  var preference = 'Exponent_Exponent';
  var mathml = '<math><mrow><msup><mn>5</mn><mrow><mn>2</mn><msup><mi>x' +
      '</mi><mn>3</mn></msup></mrow></msup></mrow></math>';
  var speech = '5 mit Exponent 2 x mit Exponent 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp157
 */
sre.ClearspeakGermanExponents.prototype.testExp157m = function() {
  var preference = 'Exponent_Exponent';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>2</mn><mn>2' +
      '</mn></msup><mo>+</mo><mn>1</mn></mrow></msup></mrow></math>';
  var speech = '3 mit Exponent, 2 mit Exponent 2, plus 1, Ende Exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp158
 */
sre.ClearspeakGermanExponents.prototype.testExp158m = function() {
  var preference = 'Exponent_Exponent';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>2</mn><mn>2' +
      '</mn></msup></mrow></msup><mo>+</mo><mn>1</mn></mrow></math>';
  var speech = '3 mit Exponent 2 mit Exponent 2, plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp159
 */
sre.ClearspeakGermanExponents.prototype.testExp159m = function() {
  var preference = 'Exponent_Exponent';
  var mathml = '<math><mrow><msup><mn>2</mn><mrow><msup><mi>x</mi><mn>2' +
      '</mn></msup><mo>+</mo><mn>3</mn><msup><mi>x</mi><mn>3</mn></msup>' +
      '</mrow></msup></mrow></math>';
  var speech = '2 mit Exponent, x mit Exponent 2, plus 3 x mit Exponent 3, Ende Exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp160
 */
sre.ClearspeakGermanExponents.prototype.testExp160m = function() {
  var preference = 'Exponent_Exponent';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mn>4' +
      '</mn></msup></mrow></msup></mrow></math>';
  var speech = '3 mit Exponent, 3 mit Exponent 4, Ende Exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp161
 */
sre.ClearspeakGermanExponents.prototype.testExp161m = function() {
  var preference = 'Exponent_Exponent';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mn>4' +
      '</mn></msup><mo>+</mo><mn>2</mn></mrow></msup></mrow></math>';
  var speech = '3 mit Exponent, 3 mit Exponent 4, plus 2, Ende Exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp162
 */
sre.ClearspeakGermanExponents.prototype.testExp162m = function() {
  var preference = 'Exponent_Exponent';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mn>4' +
      '</mn></msup></mrow></msup><mo>+</mo><mn>2</mn></mrow></math>';
  var speech = '3 mit Exponent, 3 mit Exponent 4, Ende Exponent, plus 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp163
 */
sre.ClearspeakGermanExponents.prototype.testExp163m = function() {
  var preference = 'Exponent_Exponent';
  var mathml = '<math><mrow><msup><mn>2</mn><mrow><msup><mi>x</mi><mn>4' +
      '</mn></msup></mrow></msup></mrow></math>';
  var speech = '2 mit Exponent, x mit Exponent 4, Ende Exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp164
 */
sre.ClearspeakGermanExponents.prototype.testExp164m = function() {
  var preference = 'Exponent_Exponent';
  var mathml = '<math><mrow><msup><mn>2</mn><mrow><msup><mrow><mn>10</mn>' +
      '</mrow><mrow><mi>x</mi><mo>+</mo><mn>3</mn></mrow></msup></mrow>' +
      '</msup></mrow></math>';
  var speech = '2 mit Exponent, 10 mit Exponent x plus 3, Ende Exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp165
 */
sre.ClearspeakGermanExponents.prototype.testExp165m = function() {
  var preference = 'Exponent_Exponent';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mrow>' +
      '<mn>10</mn></mrow></msup></mrow></msup></mrow></math>';
  var speech = '3 mit Exponent, 3 mit Exponent 10, Ende Exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp166
 */
sre.ClearspeakGermanExponents.prototype.testExp166m = function() {
  var preference = 'Exponent_Exponent';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mrow>' +
      '<mn>10</mn></mrow></msup><mo>+</mo><mn>1</mn></mrow></msup></mrow>' +
      '</math>';
  var speech = '3 mit Exponent, 3 mit Exponent 10, plus 1, Ende Exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp167
 */
sre.ClearspeakGermanExponents.prototype.testExp167m = function() {
  var preference = 'Exponent_Exponent';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mrow>' +
      '<mn>10</mn></mrow></msup></mrow></msup><mo>+</mo><mn>1</mn></mrow>' +
      '</math>';
  var speech = '3 mit Exponent, 3 mit Exponent 10, Ende Exponent, plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp168
 */
sre.ClearspeakGermanExponents.prototype.testExp168m = function() {
  var preference = 'Exponent_Exponent';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mrow><mrow><mo>(' +
      '</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow>' +
      '</mrow><mn>2</mn></msup></mrow></msup></mrow></math>';
  var speech = '3 mit Exponent, Klammer auf, x plus 1, Klammer zu, mit Exponent 2, Ende Exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp169
 */
sre.ClearspeakGermanExponents.prototype.testExp169m = function() {
  var preference = 'Exponent_Exponent';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mrow><mrow><mo>(' +
      '</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow>' +
      '</mrow><mrow><mn>10</mn></mrow></msup></mrow></msup></mrow></math>';
  var speech = '3 mit Exponent, Klammer auf, x plus 1, Klammer zu, mit Exponent 10, Ende Exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp170
 */
sre.ClearspeakGermanExponents.prototype.testExp170m = function() {
  var preference = 'Exponent_Exponent';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mrow><mrow><mo>(' +
      '</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow>' +
      '</mrow><mrow><mi>y</mi><mo>+</mo><mn>2</mn></mrow></msup></mrow>' +
      '</msup></mrow></math>';
  var speech = '3 mit Exponent, Klammer auf, x plus 1, Klammer zu, mit Exponent y plus 2, Ende Exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp171
 */
sre.ClearspeakGermanExponents.prototype.testExp171m = function() {
  var preference = 'Exponent_Exponent';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mrow><mrow><mo>(' +
      '</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow>' +
      '</mrow><mi>y</mi></msup><mo>+</mo><mn>2</mn></mrow></msup></mrow>' +
      '</math>';
  var speech = '3 mit Exponent, Klammer auf, x plus 1, Klammer zu, mit Exponent y, plus 2, Ende Exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp172
 */
sre.ClearspeakGermanExponents.prototype.testExp172m = function() {
  var preference = 'Exponent_Exponent';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mrow><mrow><mo>(' +
      '</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow>' +
      '</mrow><mi>y</mi></msup></mrow></msup><mo>+</mo><mn>2</mn></mrow>' +
      '</math>';
  var speech = '3 mit Exponent, Klammer auf, x plus 1, Klammer zu, mit Exponent y, Ende Exponent, plus 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp173
 */
sre.ClearspeakGermanExponents.prototype.testExp173m = function() {
  var preference = 'Exponent_Exponent';
  var mathml = '<math><mrow><msup><mi>e</mi><mrow><mo>−</mo><mfrac><mn>1' +
      '</mn><mn>2</mn></mfrac><msup><mi>x</mi><mn>2</mn></msup></mrow>' +
      '</msup></mrow></math>';
  var speech = 'e mit Exponent, minus ein halb x mit Exponent 2, Ende Exponent';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanExponents Example Exp174
 */
sre.ClearspeakGermanExponents.prototype.testExp174m = function() {
  var preference = 'Exponent_Exponent';
  var mathml = '<math><mrow><msup><mi>e</mi><mrow><mo>−</mo><mfrac><mn>1' +
      '</mn><mn>2</mn></mfrac><msup><mrow><mrow><mo>(</mo><mrow><mfrac>' +
      '<mrow><mi>x</mi><mo>−</mo><mi>μ</mi></mrow><mi>σ</mi></mfrac></mrow>' +
      '<mo>)</mo></mrow></mrow><mn>2</mn></msup></mrow></msup></mrow></math>';
  var speech = 'e mit Exponent, minus ein halb  , Klammer auf, Bruch mit Zähler x minus my, und Nenner sigma, Klammer zu, mit Exponent 2, Ende Exponent';
  this.executeRuleTest(mathml, speech, preference);
};

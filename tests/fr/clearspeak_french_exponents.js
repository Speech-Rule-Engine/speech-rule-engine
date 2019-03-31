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
  var speech = '3 au carré';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp002a
 */
sre.ClearspeakFrenchExponents.prototype.testExp002a = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mn>3</mn></msup></mrow></math>';
  var speech = '3 au cube';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp003
 */
sre.ClearspeakFrenchExponents.prototype.testExp003 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mn>5</mn></msup></mrow></math>';
  var speech = '3 à la puissance 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp004
 */
sre.ClearspeakFrenchExponents.prototype.testExp004 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mn>1</mn></msup></mrow></math>';
  var speech = '3 à la puissance 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp005
 */
sre.ClearspeakFrenchExponents.prototype.testExp005 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mi>b</mi><mn>1</mn></msup></mrow></math>';
  var speech = 'b à la puissance 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp006
 */
sre.ClearspeakFrenchExponents.prototype.testExp006 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><mn>5.0</mn></mrow>' +
      '</msup></mrow></math>';
  var speech = '3 à la puissance 5,0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp007
 */
sre.ClearspeakFrenchExponents.prototype.testExp007 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mn>0</mn></msup></mrow></math>';
  var speech = '3 à la puissance 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp008
 */
sre.ClearspeakFrenchExponents.prototype.testExp008 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>4</mn><mrow><mn>11</mn></mrow></msup>' +
      '</mrow></math>';
  var speech = '4 à la puissance 11';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp009
 */
sre.ClearspeakFrenchExponents.prototype.testExp009 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><mo>−</mo><mn>2</mn>' +
      '</mrow></msup></mrow></math>';
  var speech = '3 à la puissance négatif 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp010a
 */
sre.ClearspeakFrenchExponents.prototype.testExp010a = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><mo>−</mo><mn>2.0</mn>' +
      '</mrow></msup></mrow></math>';
  var speech = '3 à la puissance négatif 2,0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp011
 */
sre.ClearspeakFrenchExponents.prototype.testExp011 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>4</mn><mi>x</mi></msup></mrow></math>';
  var speech = '4 à la puissance x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp012
 */
sre.ClearspeakFrenchExponents.prototype.testExp012 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><mi>y</mi><mo>+</mo><mn>2' +
      '</mn></mrow></msup></mrow></math>';
  var speech = '3 à la puissance y plus 2';
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
  var speech = 'parenthèse gauche, 2 y, moins 3, parenthèse droite, à la puissance 3 z, plus 8';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp014
 */
sre.ClearspeakFrenchExponents.prototype.testExp014 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msubsup><mi>p</mi><mn>1</mn><mn>2</mn>' +
      '</msubsup></mrow></math>';
  var speech = 'p sub 1, au carré';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp015
 */
sre.ClearspeakFrenchExponents.prototype.testExp015 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msubsup><mi>p</mi><mn>1</mn><mn>3</mn>' +
      '</msubsup></mrow></math>';
  var speech = 'p sub 1, au cube';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp016
 */
sre.ClearspeakFrenchExponents.prototype.testExp016 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msubsup><mi>p</mi><mn>1</mn><mn>4</mn>' +
      '</msubsup></mrow></math>';
  var speech = 'p sub 1, à la puissance 4';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp017
 */
sre.ClearspeakFrenchExponents.prototype.testExp017 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msubsup><mi>p</mi><mn>1</mn><mrow><mn>10</mn>' +
      '</mrow></msubsup></mrow></math>';
  var speech = 'p sub 1, à la puissance 10';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp018
 */
sre.ClearspeakFrenchExponents.prototype.testExp018 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msubsup><mi>p</mi><mn>1</mn><mrow><mi>x</mi>' +
      '<mo>+</mo><mn>1</mn></mrow></msubsup></mrow></math>';
  var speech = 'p sub 1, à la puissance x plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp019
 */
sre.ClearspeakFrenchExponents.prototype.testExp019 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msubsup><mi>p</mi><mrow><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow><mn>2</mn></msubsup></mrow></math>';
  var speech = 'p sub, x sub 1, au carré';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp010b
 */
sre.ClearspeakFrenchExponents.prototype.testExp010b = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msubsup><mi>p</mi><mrow><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow><mn>3</mn></msubsup></mrow></math>';
  var speech = 'p sub, x sub 1, au cube';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp011b
 */
sre.ClearspeakFrenchExponents.prototype.testExp011b = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msubsup><mi>p</mi><mrow><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow><mn>4</mn></msubsup></mrow></math>';
  var speech = 'p sub, x sub 1, à la puissance 4';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp012b
 */
sre.ClearspeakFrenchExponents.prototype.testExp012b = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msubsup><mi>p</mi><mrow><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow><mrow><mn>10</mn></mrow></msubsup></mrow></math>';
  var speech = 'p sub, x sub 1, à la puissance 10';
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
  var speech = 'p sub, x sub 1, à la puissance y plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp014b
 */
sre.ClearspeakFrenchExponents.prototype.testExp014b = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>2</mn><mn>2' +
      '</mn></msup></mrow></msup></mrow></math>';
  var speech = '3 à la puissance 2 au carré';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp015b
 */
sre.ClearspeakFrenchExponents.prototype.testExp015b = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><mn>2</mn><msup><mi>x' +
      '</mi><mn>2</mn></msup></mrow></msup></mrow></math>';
  var speech = '3 à la puissance 2 x au carré';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp016b
 */
sre.ClearspeakFrenchExponents.prototype.testExp016b = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>5</mn><mrow><msup><mn>2</mn><mn>3' +
      '</mn></msup></mrow></msup></mrow></math>';
  var speech = '5 à la puissance 2 au cube';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp017b
 */
sre.ClearspeakFrenchExponents.prototype.testExp017b = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>5</mn><mrow><mn>2</mn><msup><mi>x' +
      '</mi><mn>3</mn></msup></mrow></msup></mrow></math>';
  var speech = '5 à la puissance 2 x au cube';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp018b
 */
sre.ClearspeakFrenchExponents.prototype.testExp018b = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>2</mn><mn>2' +
      '</mn></msup><mo>+</mo><mn>1</mn></mrow></msup></mrow></math>';
  var speech = '3 à l\'exposant, 2 au carré plus 1, fin exposant';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp019b
 */
sre.ClearspeakFrenchExponents.prototype.testExp019b = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>2</mn><mn>2' +
      '</mn></msup></mrow></msup><mo>+</mo><mn>1</mn></mrow></math>';
  var speech = '3 à la puissance 2 au carré; plus 1';
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
  var speech = '2 à l\'exposant, x au carré plus 3 x au cube, fin exposant';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp021
 */
sre.ClearspeakFrenchExponents.prototype.testExp021 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mn>4' +
      '</mn></msup></mrow></msup></mrow></math>';
  var speech = '3 à l\'exposant, 3 à la puissance 4; fin exposant';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp022
 */
sre.ClearspeakFrenchExponents.prototype.testExp022 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mn>4' +
      '</mn></msup><mo>+</mo><mn>2</mn></mrow></msup></mrow></math>';
  var speech = '3 à l\'exposant, 3 à la puissance 4; plus 2, fin exposant';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp023
 */
sre.ClearspeakFrenchExponents.prototype.testExp023 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mn>4' +
      '</mn></msup></mrow></msup><mo>+</mo><mn>2</mn></mrow></math>';
  var speech = '3 à l\'exposant, 3 à la puissance 4; fin exposant, plus 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp024
 */
sre.ClearspeakFrenchExponents.prototype.testExp024 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>2</mn><mrow><msup><mi>x</mi><mn>4' +
      '</mn></msup></mrow></msup></mrow></math>';
  var speech = '2 à l\'exposant, x à la puissance 4; fin exposant';
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
  var speech = '2 à l\'exposant, 10 à la puissance x plus 3; fin exposant';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp026
 */
sre.ClearspeakFrenchExponents.prototype.testExp026 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mrow>' +
      '<mn>10</mn></mrow></msup></mrow></msup></mrow></math>';
  var speech = '3 à l\'exposant, 3 à la puissance 10; fin exposant';
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
  var speech = '3 à l\'exposant, 3 à la puissance 10; plus 1, fin exposant';
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
  var speech = '3 à l\'exposant, 3 à la puissance 10; fin exposant, plus 1';
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
  var speech = '3 à l\'exposant, parenthèse gauche, x plus 1, parenthèse droite, au carré, fin exposant';
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
  var speech = '3 à l\'exposant, parenthèse gauche, x plus 1, parenthèse droite, à la puissance 10; fin exposant';
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
  var speech = '3 à l\'exposant, parenthèse gauche, x plus 1, parenthèse droite, à la puissance y plus 2; fin exposant';
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
  var speech = '3 à l\'exposant, parenthèse gauche, x plus 1, parenthèse droite, à la puissance y; plus 2, fin exposant';
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
  var speech = '3 à l\'exposant, parenthèse gauche, x plus 1, parenthèse droite, à la puissance y; fin exposant, plus 2';
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
  var speech = 'XXXXX';
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
  var speech = 'e à l\'exposant, négatif un-demi  , parenthèse gauche, fraction avec numérateur x moins mû, et dénominateur sigma, parenthèse droite, au carré, fin exposant';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp036
 */
sre.ClearspeakFrenchExponents.prototype.testExp036 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>2</mn><mi>n</mi></msup></mrow></math>';
  var speech = '2 à la puissance n';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp037
 */
sre.ClearspeakFrenchExponents.prototype.testExp037 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>2</mn><mi>m</mi></msup></mrow></math>';
  var speech = '2 à la puissance m';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp038
 */
sre.ClearspeakFrenchExponents.prototype.testExp038 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>2</mn><mi>i</mi></msup></mrow></math>';
  var speech = '2 à la puissance i';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp039
 */
sre.ClearspeakFrenchExponents.prototype.testExp039 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>2</mn><mi>j</mi></msup></mrow></math>';
  var speech = '2 à la puissance j';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp40
 */
sre.ClearspeakFrenchExponents.prototype.testExp40 = function() {
  var preference = 'Exponent_Auto';
  var mathml = '<math><mrow><msup><mn>2</mn><mi>a</mi></msup></mrow></math>';
  var speech = '2 à la puissance a';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp041
 */
sre.ClearspeakFrenchExponents.prototype.testExp041 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mn>2</mn></msup></mrow></math>';
  var speech = '3 au carré';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp042
 */
sre.ClearspeakFrenchExponents.prototype.testExp042 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mn>3</mn></msup></mrow></math>';
  var speech = '3 au cube';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp043
 */
sre.ClearspeakFrenchExponents.prototype.testExp043 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mn>0</mn></msup></mrow></math>';
  var speech = '3 à la puissance 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp044
 */
sre.ClearspeakFrenchExponents.prototype.testExp044 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mn>1</mn></msup></mrow></math>';
  var speech = '3 à la puissance 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp045
 */
sre.ClearspeakFrenchExponents.prototype.testExp045 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mn>5</mn></msup></mrow></math>';
  var speech = '3 à la puissance 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp046
 */
sre.ClearspeakFrenchExponents.prototype.testExp046 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>4</mn><mrow><mn>3.0</mn></mrow>' +
      '</msup></mrow></math>';
  var speech = '4 à la puissance 3,0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp047
 */
sre.ClearspeakFrenchExponents.prototype.testExp047 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>4</mn><mrow><mn>11</mn></mrow></msup>' +
      '</mrow></math>';
  var speech = '4 à la puissance 11';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp048
 */
sre.ClearspeakFrenchExponents.prototype.testExp048 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><mo>−</mo><mn>2</mn>' +
      '</mrow></msup></mrow></math>';
  var speech = '3 à la puissance négatif 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp049
 */
sre.ClearspeakFrenchExponents.prototype.testExp049 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><mo>−</mo><mn>2.0</mn>' +
      '</mrow></msup></mrow></math>';
  var speech = '3 à la puissance négatif 2,0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp050
 */
sre.ClearspeakFrenchExponents.prototype.testExp050 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>4</mn><mi>x</mi></msup></mrow></math>';
  var speech = '4 à la x-ième puissance';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp051
 */
sre.ClearspeakFrenchExponents.prototype.testExp051 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><mi>y</mi><mo>+</mo><mn>2' +
      '</mn></mrow></msup></mrow></math>';
  var speech = '3 à la puissance y plus 2';
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
  var speech = 'parenthèse gauche, 2 y, moins 3, parenthèse droite, à la puissance 3 z, plus 8';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp053
 */
sre.ClearspeakFrenchExponents.prototype.testExp053 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msub><mi>p</mi><mn>1</mn></msub><msup><mrow/>' +
      '<mn>2</mn></msup></mrow></math>';
  var speech = 'p sub 1, au carré';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp054
 */
sre.ClearspeakFrenchExponents.prototype.testExp054 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msub><mi>p</mi><mn>1</mn></msub><msup><mrow/>' +
      '<mn>3</mn></msup></mrow></math>';
  var speech = 'p sub 1, au cube';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp055
 */
sre.ClearspeakFrenchExponents.prototype.testExp055 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msub><mi>p</mi><mn>1</mn></msub><msup><mrow/>' +
      '<mn>4</mn></msup></mrow></math>';
  var speech = 'p sub 1, à la puissance 4';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp056
 */
sre.ClearspeakFrenchExponents.prototype.testExp056 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msub><mi>p</mi><mn>1</mn></msub><msup><mrow/>' +
      '<mrow><mn>10</mn></mrow></msup></mrow></math>';
  var speech = 'p sub 1, à la puissance 10';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp057
 */
sre.ClearspeakFrenchExponents.prototype.testExp057 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msub><mi>p</mi><mn>1</mn></msub><msup><mrow/>' +
      '<mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow></msup></mrow></math>';
  var speech = 'p sub 1, à la puissance x plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp058
 */
sre.ClearspeakFrenchExponents.prototype.testExp058 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msub><mi>p</mi><mrow><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow></msub><msup><mrow/><mn>2</mn></msup></mrow></math>';
  var speech = 'p sub, x sub 1, au carré';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp059
 */
sre.ClearspeakFrenchExponents.prototype.testExp059 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msub><mi>p</mi><mrow><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow></msub><msup><mrow/><mn>3</mn></msup></mrow></math>';
  var speech = 'p sub, x sub 1, au cube';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp060
 */
sre.ClearspeakFrenchExponents.prototype.testExp060 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msub><mi>p</mi><mrow><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow></msub><msup><mrow/><mn>4</mn></msup></mrow></math>';
  var speech = 'p sub, x sub 1, à la puissance 4';
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
  var speech = 'p sub, x sub 1, à la puissance 10';
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
  var speech = 'p sub, x sub 1, à la puissance y plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp063
 */
sre.ClearspeakFrenchExponents.prototype.testExp063 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>2</mn><mn>2' +
      '</mn></msup></mrow></msup></mrow></math>';
  var speech = '3 à la puissance 2 au carré';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp064
 */
sre.ClearspeakFrenchExponents.prototype.testExp064 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><mn>2</mn><msup><mi>x' +
      '</mi><mn>2</mn></msup></mrow></msup></mrow></math>';
  var speech = '3 à la puissance 2 x au carré';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp065
 */
sre.ClearspeakFrenchExponents.prototype.testExp065 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>5</mn><mrow><msup><mn>2</mn><mn>3' +
      '</mn></msup></mrow></msup></mrow></math>';
  var speech = '5 à la puissance 2 au cube';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp066
 */
sre.ClearspeakFrenchExponents.prototype.testExp066 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>5</mn><mrow><mn>2</mn><msup><mi>x' +
      '</mi><mn>3</mn></msup></mrow></msup></mrow></math>';
  var speech = '5 à la puissance 2 x au cube';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp067
 */
sre.ClearspeakFrenchExponents.prototype.testExp067 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>2</mn><mn>2' +
      '</mn></msup><mo>+</mo><mn>1</mn></mrow></msup></mrow></math>';
  var speech = '3 à l\'exposant, 2 au carré plus 1, fin exposant';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp068
 */
sre.ClearspeakFrenchExponents.prototype.testExp068 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>2</mn><mn>2' +
      '</mn></msup></mrow></msup><mo>+</mo><mn>1</mn></mrow></math>';
  var speech = '3 à la puissance 2 au carré; plus 1';
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
  var speech = '2 à l\'exposant, x au carré plus 3 x au cube, fin exposant';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp070
 */
sre.ClearspeakFrenchExponents.prototype.testExp070 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mn>4' +
      '</mn></msup></mrow></msup></mrow></math>';
  var speech = '3 à l\'exposant, 3 à la puissance 4; fin exposant';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp071
 */
sre.ClearspeakFrenchExponents.prototype.testExp071 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mn>4' +
      '</mn></msup><mo>+</mo><mn>2</mn></mrow></msup></mrow></math>';
  var speech = '3 à l\'exposant, 3 à la puissance 4; plus 2, fin exposant';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp072
 */
sre.ClearspeakFrenchExponents.prototype.testExp072 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mn>4' +
      '</mn></msup></mrow></msup><mo>+</mo><mn>2</mn></mrow></math>';
  var speech = '3 à l\'exposant, 3 à la puissance 4; fin exposant, plus 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp073
 */
sre.ClearspeakFrenchExponents.prototype.testExp073 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>2</mn><mrow><msup><mi>x</mi><mn>4' +
      '</mn></msup></mrow></msup></mrow></math>';
  var speech = '2 à l\'exposant, x à la puissance 4; fin exposant';
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
  var speech = '2 à l\'exposant, 10 à la puissance x plus 3; fin exposant';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp075
 */
sre.ClearspeakFrenchExponents.prototype.testExp075 = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>3</mn><mrow><msup><mn>3</mn><mrow>' +
      '<mn>10</mn></mrow></msup></mrow></msup></mrow></math>';
  var speech = '3 à l\'exposant, 3 à la puissance 10; fin exposant';
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
  var speech = '3 à l\'exposant, 3 à la puissance 10; plus 1, fin exposant';
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
  var speech = '3 à l\'exposant, 3 à la puissance 10; fin exposant, plus 1';
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
  var speech = '3 à l\'exposant, parenthèse gauche, x plus 1, parenthèse droite, au carré, fin exposant';
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
  var speech = '3 à l\'exposant, parenthèse gauche, x plus 1, parenthèse droite, à la puissance 10; fin exposant';
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
  var speech = '3 à l\'exposant, parenthèse gauche, x plus 1, parenthèse droite, à la puissance y plus 2; fin exposant';
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
  var speech = '3 à l\'exposant, parenthèse gauche, x plus 1, parenthèse droite, à la y-ième puissance; plus 2, fin exposant';
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
  var speech = '3 à l\'exposant, parenthèse gauche, x plus 1, parenthèse droite, à la y-ième puissance; fin exposant, plus 2';
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
  var speech = 'e à l\'exposant, négatif un-demi x au carré, fin exposant';
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
  var speech = 'e à l\'exposant, négatif un-demi  , parenthèse gauche, fraction avec numérateur x moins mû, et dénominateur sigma, parenthèse droite, au carré, fin exposant';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp036
 */
sre.ClearspeakFrenchExponents.prototype.testExp036a = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>2</mn><mi>n</mi></msup></mrow></math>';
  var speech = '2 à la n-ième puissance';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp037
 */
sre.ClearspeakFrenchExponents.prototype.testExp037a = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>2</mn><mi>m</mi></msup></mrow></math>';
  var speech = '2 à la m-ième puissance';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp038
 */
sre.ClearspeakFrenchExponents.prototype.testExp038a = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>2</mn><mi>i</mi></msup></mrow></math>';
  var speech = '2 à la i-ième puissance';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp039
 */
sre.ClearspeakFrenchExponents.prototype.testExp039a = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>2</mn><mi>j</mi></msup></mrow></math>';
  var speech = '2 à la j-ième puissance';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchExponents Example Exp40
 */
sre.ClearspeakFrenchExponents.prototype.testExp40a = function() {
  var preference = 'Exponent_Ordinal';
  var mathml = '<math><mrow><msup><mn>2</mn><mi>a</mi></msup></mrow></math>';
  var speech = '2 à la a-ième puissance';
  this.executeRuleTest(mathml, speech, preference);
};

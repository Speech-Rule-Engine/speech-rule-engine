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


goog.provide('sre.ClearspeakGermanRoots');

goog.require('sre.ClearspeakGermanRuleTest');



/**
* @constructor
* @extends {sre.ClearspeakGermanRuleTest}
*/
sre.ClearspeakGermanRoots = function() {
  sre.ClearspeakGermanRoots.base(this, 'constructor');

  /**
* @override
  */
  this.information = 'ClearspeakGermanRoots rule tests.';

};
goog.inherits(sre.ClearspeakGermanRoots, sre.ClearspeakGermanRuleTest);



//
// Roots
//


/**
 * Testing ClearspeakGermanRoots Example Root001
 */
sre.ClearspeakGermanRoots.prototype.testRoot001 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<mrow><msqrt><mn>2</mn></msqrt></mrow>';
  var speech = 'Quadratwurzel aus 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root002
 */
sre.ClearspeakGermanRoots.prototype.testRoot002 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mn>3</mn><mo>+</mo><msqrt><mn>2</mn></msqrt>' +
      '</mrow></math>';
  var speech = '3 plus Quadratwurzel aus 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root003
 */
sre.ClearspeakGermanRoots.prototype.testRoot003 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mn>3</mn><mo>±</mo><msqrt><mn>2</mn></msqrt>' +
      '</mrow></math>';
  var speech = '3 plus minus Quadratwurzel aus 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root004
 */
sre.ClearspeakGermanRoots.prototype.testRoot004 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mn>3</mn><mo>∓</mo><msqrt><mn>2</mn></msqrt>' +
      '</mrow></math>';
  var speech = '3 minus plus Quadratwurzel aus 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root005
 */
sre.ClearspeakGermanRoots.prototype.testRoot005 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mo>−</mo><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = 'negative Quadratwurzel aus 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root006
 */
sre.ClearspeakGermanRoots.prototype.testRoot006 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mn>3</mn><mo>−</mo><msqrt><mn>2</mn></msqrt>' +
      '</mrow></math>';
  var speech = '3 minus Quadratwurzel aus 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root007
 */
sre.ClearspeakGermanRoots.prototype.testRoot007 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mn>3</mn><mo>+</mo><mo>−</mo><msqrt><mn>2</mn>' +
      '</msqrt></mrow></math>';
  var speech = '3 plus negative Quadratwurzel aus 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root008
 */
sre.ClearspeakGermanRoots.prototype.testRoot008 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mn>3</mn><mo>−</mo><mo>−</mo><msqrt><mn>2</mn>' +
      '</msqrt></mrow></math>';
  var speech = '3 minus negative Quadratwurzel aus 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root009
 */
sre.ClearspeakGermanRoots.prototype.testRoot009 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mn>3</mn><mo>+</mo><mrow><mo>(</mo><mrow><mo>−' +
      '</mo><msqrt><mn>2</mn></msqrt></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '3 plus, Klammer auf, negative Quadratwurzel aus 2, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root010
 */
sre.ClearspeakGermanRoots.prototype.testRoot010 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mn>3</mn><mo>−</mo><mrow><mo>(</mo><mrow><mo>−' +
      '</mo><msqrt><mn>2</mn></msqrt></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '3 minus, Klammer auf, negative Quadratwurzel aus 2, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root011
 */
sre.ClearspeakGermanRoots.prototype.testRoot011 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><msqrt><mrow><mi>x</mi><mo>+</mo><mn>1</mn>' +
      '</mrow></msqrt></mrow></math>';
  var speech = 'Quadratwurzel aus x plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root011a
 */
sre.ClearspeakGermanRoots.prototype.testRoot011a = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><msqrt><mi>x</mi></msqrt><mo>+</mo><mn>1</mn>' +
      '</mrow></math>';
  var speech = 'Quadratwurzel aus x, plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root012
 */
sre.ClearspeakGermanRoots.prototype.testRoot012 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mo>−</mo><msqrt><mi>x</mi></msqrt></mrow></math>';
  var speech = 'negative Quadratwurzel aus x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root013
 */
sre.ClearspeakGermanRoots.prototype.testRoot013 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><msqrt><mi>x' +
      '</mi></msqrt></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup></mrow>' +
      '</math>';
  var speech = 'Klammer auf, Quadratwurzel aus x, Klammer zu, Quadrat';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root014
 */
sre.ClearspeakGermanRoots.prototype.testRoot014 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mo>−</mo><msup><mrow><mrow><mo>(</mo><mrow>' +
      '<msqrt><mi>x</mi></msqrt></mrow><mo>)</mo></mrow></mrow><mn>2</mn>' +
      '</msup></mrow></math>';
  var speech = 'negativ, Klammer auf, Quadratwurzel aus x, Klammer zu, Quadrat';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root015
 */
sre.ClearspeakGermanRoots.prototype.testRoot015 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><msup><mrow><msqrt><mi>x</mi></msqrt></mrow>' +
      '<mn>2</mn></msup></mrow></math>';
  var speech = 'Quadratwurzel aus x, Quadrat';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root016
 */
sre.ClearspeakGermanRoots.prototype.testRoot016 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><msqrt><mrow><msup><mi>x</mi><mn>2</mn></msup>' +
      '</mrow></msqrt></mrow></math>';
  var speech = 'Quadratwurzel aus x Quadrat';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root017
 */
sre.ClearspeakGermanRoots.prototype.testRoot017 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><msqrt><mrow><msup><mi>x</mi><mn>2</mn></msup>' +
      '<mo>+</mo><msup><mi>y</mi><mn>2</mn></msup></mrow></msqrt></mrow>' +
      '</math>';
  var speech = 'Quadratwurzel aus x Quadrat plus y Quadrat';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root018
 */
sre.ClearspeakGermanRoots.prototype.testRoot018 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><msqrt><mrow><msub><mi>x</mi><mn>1</mn></msub>' +
      '<msup><mrow/><mn>2</mn></msup><mo>+</mo><msub><mi>x</mi><mn>2</mn>' +
      '</msub><msup><mrow/><mn>2</mn></msup></mrow></msqrt></mrow></math>';
  var speech = 'Quadratwurzel aus, x Index 1, Quadrat plus, x Index 2, Quadrat';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root019
 */
sre.ClearspeakGermanRoots.prototype.testRoot019 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><msqrt><mrow><msup><mrow><mrow><mo>(</mo><mrow>' +
      '<msub><mi>x</mi><mn>2</mn></msub><mo>−</mo><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup><mo>+' +
      '</mo><msup><mrow><mrow><mo>(</mo><mrow><msub><mi>y</mi><mn>2</mn>' +
      '</msub><mo>−</mo><msub><mi>y</mi><mn>1</mn></msub></mrow><mo>)</mo>' +
      '</mrow></mrow><mn>2</mn></msup></mrow></msqrt></mrow></math>';
  var speech = 'Quadratwurzel aus, Klammer auf, x Index 2, minus, x Index 1, Klammer zu, Quadrat plus, Klammer auf, y Index 2, minus, y Index 1, Klammer zu, Quadrat';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root020
 */
sre.ClearspeakGermanRoots.prototype.testRoot020 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><msqrt><mrow><mfrac><mn>1</mn><mn>2</mn>' +
      '</mfrac></mrow></msqrt></mrow></math>';
  var speech = 'Quadratwurzel aus ein halb';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root021
 */
sre.ClearspeakGermanRoots.prototype.testRoot021 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><msqrt><mrow><mfrac><mrow><mn>23</mn></mrow>' +
      '<mrow><mn>66</mn></mrow></mfrac></mrow></msqrt></mrow></math>';
  var speech = 'Quadratwurzel aus, 23 geteilt durch 66';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root022
 */
sre.ClearspeakGermanRoots.prototype.testRoot022 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><msqrt><mrow><mfrac><mrow><mi>x</mi><mo>+</mo>' +
      '<mn>1</mn></mrow><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>5</mn>' +
      '</mrow></mfrac></mrow></msqrt></mrow></math>';
  var speech = 'Quadratwurzel aus, Bruch mit Zähler x plus 1, und Nenner 2 x, plus 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root023
 */
sre.ClearspeakGermanRoots.prototype.testRoot023 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mo>−</mo><mi>b</mi><mo>±</mo>' +
      '<msqrt><mrow><msup><mi>b</mi><mn>2</mn></msup><mo>−</mo><mn>4</mn>' +
      '<mi>a</mi><mi>c</mi></mrow></msqrt></mrow><mrow><mn>2</mn><mi>a</mi>' +
      '</mrow></mfrac></mrow></math>';
  var speech = 'Bruch mit Zähler negativ b plus minus Quadratwurzel aus b Quadrat minus 4 a c, und Nenner 2 a';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root024
 */
sre.ClearspeakGermanRoots.prototype.testRoot024 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = 'positive Quadratwurzel aus 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root025
 */
sre.ClearspeakGermanRoots.prototype.testRoot025 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mn>3</mn><mo>+</mo><msqrt><mn>2</mn></msqrt>' +
      '</mrow></math>';
  var speech = '3 plus positive Quadratwurzel aus 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root026
 */
sre.ClearspeakGermanRoots.prototype.testRoot026 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mn>3</mn><mo>±</mo><msqrt><mn>2</mn></msqrt>' +
      '</mrow></math>';
  var speech = '3 plus minus Quadratwurzel aus 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root027
 */
sre.ClearspeakGermanRoots.prototype.testRoot027 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mn>3</mn><mo>∓</mo><msqrt><mn>2</mn></msqrt>' +
      '</mrow></math>';
  var speech = '3 minus plus Quadratwurzel aus 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root028
 */
sre.ClearspeakGermanRoots.prototype.testRoot028 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mo>−</mo><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = 'negative Quadratwurzel aus 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root029
 */
sre.ClearspeakGermanRoots.prototype.testRoot029 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mn>3</mn><mo>−</mo><msqrt><mn>2</mn></msqrt>' +
      '</mrow></math>';
  var speech = '3 minus positive Quadratwurzel aus 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root030
 */
sre.ClearspeakGermanRoots.prototype.testRoot030 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mn>3</mn><mo>+</mo><mo>−</mo><msqrt><mn>2</mn>' +
      '</msqrt></mrow></math>';
  var speech = '3 plus negative Quadratwurzel aus 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root031
 */
sre.ClearspeakGermanRoots.prototype.testRoot031 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mn>3</mn><mo>−</mo><mo>−</mo><msqrt><mn>2</mn>' +
      '</msqrt></mrow></math>';
  var speech = '3 minus negative Quadratwurzel aus 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root032
 */
sre.ClearspeakGermanRoots.prototype.testRoot032 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mn>3</mn><mo>+</mo><mrow><mo>(</mo><mrow><mo>−' +
      '</mo><msqrt><mn>2</mn></msqrt></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '3 plus, Klammer auf, negative Quadratwurzel aus 2, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root033
 */
sre.ClearspeakGermanRoots.prototype.testRoot033 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mn>3</mn><mo>−</mo><mrow><mo>(</mo><mrow><mo>−' +
      '</mo><msqrt><mn>2</mn></msqrt></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '3 minus, Klammer auf, negative Quadratwurzel aus 2, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root034
 */
sre.ClearspeakGermanRoots.prototype.testRoot034 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><msqrt><mrow><mi>x</mi><mo>+</mo><mn>1</mn>' +
      '</mrow></msqrt></mrow></math>';
  var speech = 'positive Quadratwurzel aus x plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root034a
 */
sre.ClearspeakGermanRoots.prototype.testRoot034a = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><msqrt><mi>x</mi></msqrt><mo>+</mo><mn>1</mn>' +
      '</mrow></math>';
  var speech = 'positive Quadratwurzel aus x, plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root035
 */
sre.ClearspeakGermanRoots.prototype.testRoot035 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mo>−</mo><msqrt><mi>x</mi></msqrt></mrow></math>';
  var speech = 'negative Quadratwurzel aus x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root036
 */
sre.ClearspeakGermanRoots.prototype.testRoot036 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><msqrt><mi>x' +
      '</mi></msqrt></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup></mrow>' +
      '</math>';
  var speech = 'Klammer auf, positive Quadratwurzel aus x, Klammer zu, Quadrat';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root037
 */
sre.ClearspeakGermanRoots.prototype.testRoot037 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mo>−</mo>' +
      '<msqrt><mi>x</mi></msqrt></mrow><mo>)</mo></mrow></mrow><mn>2</mn>' +
      '</msup></mrow></math>';
  var speech = 'Klammer auf, negative Quadratwurzel aus x, Klammer zu, Quadrat';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root038
 */
sre.ClearspeakGermanRoots.prototype.testRoot038 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mo>−</mo><msup><mrow><mrow><mo>(</mo><mrow>' +
      '<msqrt><mi>x</mi></msqrt></mrow><mo>)</mo></mrow></mrow><mn>2</mn>' +
      '</msup></mrow></math>';
  var speech = 'negativ, Klammer auf, positive Quadratwurzel aus x, Klammer zu, Quadrat';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root039
 */
sre.ClearspeakGermanRoots.prototype.testRoot039 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><msup><mrow><msqrt><mi>x</mi></msqrt></mrow>' +
      '<mn>2</mn></msup></mrow></math>';
  var speech = 'positive Quadratwurzel aus x, Quadrat';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root040
 */
sre.ClearspeakGermanRoots.prototype.testRoot040 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><msqrt><mrow><msup><mi>x</mi><mn>2</mn></msup>' +
      '</mrow></msqrt></mrow></math>';
  var speech = 'positive Quadratwurzel aus x Quadrat';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root041
 */
sre.ClearspeakGermanRoots.prototype.testRoot041 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><msqrt><mrow><msup><mi>x</mi><mn>2</mn></msup>' +
      '<mo>+</mo><msup><mi>y</mi><mn>2</mn></msup></mrow></msqrt></mrow>' +
      '</math>';
  var speech = 'positive Quadratwurzel aus x Quadrat plus y Quadrat';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root042
 */
sre.ClearspeakGermanRoots.prototype.testRoot042 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><msqrt><mrow><msub><mi>x</mi><mn>1</mn></msub>' +
      '<msup><mrow/><mn>2</mn></msup><mo>+</mo><msub><mi>x</mi><mn>2</mn>' +
      '</msub><msup><mrow/><mn>2</mn></msup></mrow></msqrt></mrow></math>';
  var speech = 'positive Quadratwurzel aus, x Index 1, Quadrat plus, x Index 2, Quadrat';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root043
 */
sre.ClearspeakGermanRoots.prototype.testRoot043 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><msqrt><mrow><msup><mrow><mrow><mo>(</mo><mrow>' +
      '<msub><mi>x</mi><mn>2</mn></msub><mo>−</mo><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup><mo>+' +
      '</mo><msup><mrow><mrow><mo>(</mo><mrow><msub><mi>y</mi><mn>2</mn>' +
      '</msub><mo>−</mo><msub><mi>y</mi><mn>1</mn></msub></mrow><mo>)</mo>' +
      '</mrow></mrow><mn>2</mn></msup></mrow></msqrt></mrow></math>';
  var speech = 'positive Quadratwurzel aus, Klammer auf, x Index 2, minus, x Index 1, Klammer zu, Quadrat plus, Klammer auf, y Index 2, minus, y Index 1, Klammer zu, Quadrat';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root044
 */
sre.ClearspeakGermanRoots.prototype.testRoot044 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><msqrt><mrow><mfrac><mn>1</mn><mn>2</mn>' +
      '</mfrac></mrow></msqrt></mrow></math>';
  var speech = 'positive Quadratwurzel aus ein halb';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root045
 */
sre.ClearspeakGermanRoots.prototype.testRoot045 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><msqrt><mrow><mfrac><mrow><mn>23</mn></mrow>' +
      '<mrow><mn>66</mn></mrow></mfrac></mrow></msqrt></mrow></math>';
  var speech = 'positive Quadratwurzel aus, 23 geteilt durch 66';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root046
 */
sre.ClearspeakGermanRoots.prototype.testRoot046 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><msqrt><mrow><mfrac><mrow><mi>x</mi><mo>+</mo>' +
      '<mn>1</mn></mrow><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>5</mn>' +
      '</mrow></mfrac></mrow></msqrt></mrow></math>';
  var speech = 'positive Quadratwurzel aus, Bruch mit Zähler x plus 1, und Nenner 2 x, plus 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root047
 */
sre.ClearspeakGermanRoots.prototype.testRoot047 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mfrac><mrow><mo>−</mo><mi>b</mi><mo>±</mo>' +
      '<msqrt><mrow><msup><mi>b</mi><mn>2</mn></msup><mo>−</mo><mn>4</mn>' +
      '<mi>a</mi><mi>c</mi></mrow></msqrt></mrow><mrow><mn>2</mn><mi>a</mi>' +
      '</mrow></mfrac></mrow></math>';
  var speech = 'Bruch mit Zähler negativ b plus minus Quadratwurzel aus b Quadrat minus 4 a c, und Nenner 2 a';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root048
 */
sre.ClearspeakGermanRoots.prototype.testRoot048 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = 'Quadratwurzel aus 2, Wurzel Ende';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root049
 */
sre.ClearspeakGermanRoots.prototype.testRoot049 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mn>3</mn><mo>+</mo><msqrt><mn>2</mn></msqrt>' +
      '</mrow></math>';
  var speech = '3 plus Quadratwurzel aus 2, Wurzel Ende';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root050
 */
sre.ClearspeakGermanRoots.prototype.testRoot050 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mn>3</mn><mo>±</mo><msqrt><mn>2</mn></msqrt>' +
      '</mrow></math>';
  var speech = '3 plus minus Quadratwurzel aus 2, Wurzel Ende';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root051
 */
sre.ClearspeakGermanRoots.prototype.testRoot051 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mn>3</mn><mo>∓</mo><msqrt><mn>2</mn></msqrt>' +
      '</mrow></math>';
  var speech = '3 minus plus Quadratwurzel aus 2, Wurzel Ende';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root052
 */
sre.ClearspeakGermanRoots.prototype.testRoot052 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mo>−</mo><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = 'negative Quadratwurzel aus 2, Wurzel Ende';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root053
 */
sre.ClearspeakGermanRoots.prototype.testRoot053 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mn>3</mn><mo>−</mo><msqrt><mn>2</mn></msqrt>' +
      '</mrow></math>';
  var speech = '3 minus Quadratwurzel aus 2, Wurzel Ende';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root054
 */
sre.ClearspeakGermanRoots.prototype.testRoot054 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mn>3</mn><mo>+</mo><mo>−</mo><msqrt><mn>2</mn>' +
      '</msqrt></mrow></math>';
  var speech = '3 plus negative Quadratwurzel aus 2, Wurzel Ende';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root055
 */
sre.ClearspeakGermanRoots.prototype.testRoot055 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mn>3</mn><mo>−</mo><mo>−</mo><msqrt><mn>2</mn>' +
      '</msqrt></mrow></math>';
  var speech = '3 minus negative Quadratwurzel aus 2, Wurzel Ende';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root056
 */
sre.ClearspeakGermanRoots.prototype.testRoot056 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mn>3</mn><mo>+</mo><mrow><mo>(</mo><mrow><mo>−' +
      '</mo><msqrt><mn>2</mn></msqrt></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '3 plus, Klammer auf, negative Quadratwurzel aus 2, Wurzel Ende, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root057
 */
sre.ClearspeakGermanRoots.prototype.testRoot057 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mn>3</mn><mo>−</mo><mrow><mo>(</mo><mrow><mo>−' +
      '</mo><msqrt><mn>2</mn></msqrt></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '3 minus, Klammer auf, negative Quadratwurzel aus 2, Wurzel Ende, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root058
 */
sre.ClearspeakGermanRoots.prototype.testRoot058 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><msqrt><mrow><mi>x</mi><mo>+</mo><mn>1</mn>' +
      '</mrow></msqrt></mrow></math>';
  var speech = 'Quadratwurzel aus x plus 1, Wurzel Ende';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root058a
 */
sre.ClearspeakGermanRoots.prototype.testRoot058a = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><msqrt><mi>x</mi></msqrt><mo>+</mo><mn>1</mn>' +
      '</mrow></math>';
  var speech = 'Quadratwurzel aus x, Wurzel Ende, plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root059
 */
sre.ClearspeakGermanRoots.prototype.testRoot059 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mo>−</mo><msqrt><mi>x</mi></msqrt></mrow></math>';
  var speech = 'negative Quadratwurzel aus x, Wurzel Ende';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root060
 */
sre.ClearspeakGermanRoots.prototype.testRoot060 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><msqrt><mi>x' +
      '</mi></msqrt></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup></mrow>' +
      '</math>';
  var speech = 'Klammer auf, Quadratwurzel aus x, Wurzel Ende, Klammer zu, Quadrat';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root061
 */
sre.ClearspeakGermanRoots.prototype.testRoot061 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mo>−</mo><msup><mrow><mrow><mo>(</mo><mrow>' +
      '<msqrt><mi>x</mi></msqrt></mrow><mo>)</mo></mrow></mrow><mn>2</mn>' +
      '</msup></mrow></math>';
  var speech = 'negativ, Klammer auf, Quadratwurzel aus x, Wurzel Ende, Klammer zu, Quadrat';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root062
 */
sre.ClearspeakGermanRoots.prototype.testRoot062 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><msup><mrow><msqrt><mi>x</mi></msqrt></mrow>' +
      '<mn>2</mn></msup></mrow></math>';
  var speech = 'Quadratwurzel aus x, Wurzel Ende, Quadrat';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root063
 */
sre.ClearspeakGermanRoots.prototype.testRoot063 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><msqrt><mrow><msup><mi>x</mi><mn>2</mn></msup>' +
      '</mrow></msqrt></mrow></math>';
  var speech = 'Quadratwurzel aus x Quadrat, Wurzel Ende';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root064
 */
sre.ClearspeakGermanRoots.prototype.testRoot064 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><msqrt><mrow><msup><mi>x</mi><mn>2</mn></msup>' +
      '<mo>+</mo><msup><mi>y</mi><mn>2</mn></msup></mrow></msqrt></mrow>' +
      '</math>';
  var speech = 'Quadratwurzel aus x Quadrat plus y Quadrat, Wurzel Ende';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root065
 */
sre.ClearspeakGermanRoots.prototype.testRoot065 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><msqrt><mrow><msub><mi>x</mi><mn>1</mn></msub>' +
      '<msup><mrow/><mn>2</mn></msup><mo>+</mo><msub><mi>x</mi><mn>2</mn>' +
      '</msub><msup><mrow/><mn>2</mn></msup></mrow></msqrt></mrow></math>';
  var speech = 'Quadratwurzel aus, x Index 1, Quadrat plus, x Index 2, Quadrat, Wurzel Ende';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root066
 */
sre.ClearspeakGermanRoots.prototype.testRoot066 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><msqrt><mrow><msup><mrow><mrow><mo>(</mo><mrow>' +
      '<msub><mi>x</mi><mn>2</mn></msub><mo>−</mo><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup><mo>+' +
      '</mo><msup><mrow><mrow><mo>(</mo><mrow><msub><mi>y</mi><mn>2</mn>' +
      '</msub><mo>−</mo><msub><mi>y</mi><mn>1</mn></msub></mrow><mo>)</mo>' +
      '</mrow></mrow><mn>2</mn></msup></mrow></msqrt></mrow></math>';
  var speech = 'Quadratwurzel aus, Klammer auf, x Index 2, minus, x Index 1, Klammer zu, Quadrat plus, Klammer auf, y Index 2, minus, y Index 1, Klammer zu, Quadrat, Wurzel Ende';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root067
 */
sre.ClearspeakGermanRoots.prototype.testRoot067 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><msqrt><mrow><mfrac><mn>1</mn><mn>2</mn>' +
      '</mfrac></mrow></msqrt></mrow></math>';
  var speech = 'Quadratwurzel aus ein halb, Wurzel Ende';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root068
 */
sre.ClearspeakGermanRoots.prototype.testRoot068 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><msqrt><mrow><mfrac><mrow><mn>23</mn></mrow>' +
      '<mrow><mn>66</mn></mrow></mfrac></mrow></msqrt></mrow></math>';
  var speech = 'Quadratwurzel aus, 23 geteilt durch 66, Wurzel Ende';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root069
 */
sre.ClearspeakGermanRoots.prototype.testRoot069 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><msqrt><mrow><mfrac><mrow><mi>x</mi><mo>+</mo>' +
      '<mn>1</mn></mrow><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>5</mn>' +
      '</mrow></mfrac></mrow></msqrt></mrow></math>';
  var speech = 'Quadratwurzel aus, Bruch mit Zähler x plus 1, und Nenner 2 x, plus 5, Wurzel Ende';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root070
 */
sre.ClearspeakGermanRoots.prototype.testRoot070 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mfrac><mrow><mo>−</mo><mi>b</mi><mo>±</mo>' +
      '<msqrt><mrow><msup><mi>b</mi><mn>2</mn></msup><mo>−</mo><mn>4</mn>' +
      '<mi>a</mi><mi>c</mi></mrow></msqrt></mrow><mrow><mn>2</mn><mi>a</mi>' +
      '</mrow></mfrac></mrow></math>';
  var speech = 'Bruch mit Zähler negativ b plus minus Quadratwurzel aus b Quadrat minus 4 a c, Wurzel Ende, und Nenner 2 a';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root071
 */
sre.ClearspeakGermanRoots.prototype.testRoot071 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = 'positive Quadratwurzel aus 2, Wurzel Ende';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root072
 */
sre.ClearspeakGermanRoots.prototype.testRoot072 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mn>3</mn><mo>+</mo><msqrt><mn>2</mn></msqrt>' +
      '</mrow></math>';
  var speech = '3 plus positive Quadratwurzel aus 2, Wurzel Ende';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root073
 */
sre.ClearspeakGermanRoots.prototype.testRoot073 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mn>3</mn><mo>±</mo><msqrt><mn>2</mn></msqrt>' +
      '</mrow></math>';
  var speech = '3 plus minus Quadratwurzel aus 2, Wurzel Ende';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root074
 */
sre.ClearspeakGermanRoots.prototype.testRoot074 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mn>3</mn><mo>∓</mo><msqrt><mn>2</mn></msqrt>' +
      '</mrow></math>';
  var speech = '3 minus plus Quadratwurzel aus 2, Wurzel Ende';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root075
 */
sre.ClearspeakGermanRoots.prototype.testRoot075 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mo>−</mo><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = 'negative Quadratwurzel aus 2, Wurzel Ende';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root076
 */
sre.ClearspeakGermanRoots.prototype.testRoot076 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mn>3</mn><mo>−</mo><msqrt><mn>2</mn></msqrt>' +
      '</mrow></math>';
  var speech = '3 minus positive Quadratwurzel aus 2, Wurzel Ende';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root077
 */
sre.ClearspeakGermanRoots.prototype.testRoot077 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mn>3</mn><mo>+</mo><mo>−</mo><msqrt><mn>2</mn>' +
      '</msqrt></mrow></math>';
  var speech = '3 plus negative Quadratwurzel aus 2, Wurzel Ende';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root078
 */
sre.ClearspeakGermanRoots.prototype.testRoot078 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mn>3</mn><mo>−</mo><mo>−</mo><msqrt><mn>2</mn>' +
      '</msqrt></mrow></math>';
  var speech = '3 minus negative Quadratwurzel aus 2, Wurzel Ende';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root079
 */
sre.ClearspeakGermanRoots.prototype.testRoot079 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mn>3</mn><mo>+</mo><mrow><mo>(</mo><mrow><mo>−' +
      '</mo><msqrt><mn>2</mn></msqrt></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '3 plus, Klammer auf, negative Quadratwurzel aus 2, Wurzel Ende, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root080
 */
sre.ClearspeakGermanRoots.prototype.testRoot080 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mn>3</mn><mo>−</mo><mrow><mo>(</mo><mrow><mo>−' +
      '</mo><msqrt><mn>2</mn></msqrt></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '3 minus, Klammer auf, negative Quadratwurzel aus 2, Wurzel Ende, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root081
 */
sre.ClearspeakGermanRoots.prototype.testRoot081 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><msqrt><mrow><mi>x</mi><mo>+</mo><mn>1</mn>' +
      '</mrow></msqrt></mrow></math>';
  var speech = 'positive Quadratwurzel aus x plus 1, Wurzel Ende';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root081a
 */
sre.ClearspeakGermanRoots.prototype.testRoot081a = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><msqrt><mi>x</mi></msqrt><mo>+</mo><mn>1</mn>' +
      '</mrow></math>';
  var speech = 'positive Quadratwurzel aus x, Wurzel Ende, plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root082
 */
sre.ClearspeakGermanRoots.prototype.testRoot082 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mo>−</mo><msqrt><mi>x</mi></msqrt></mrow></math>';
  var speech = 'negative Quadratwurzel aus x, Wurzel Ende';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root083
 */
sre.ClearspeakGermanRoots.prototype.testRoot083 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><msqrt><mi>x' +
      '</mi></msqrt></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup></mrow>' +
      '</math>';
  var speech = 'Klammer auf, positive Quadratwurzel aus x, Wurzel Ende, Klammer zu, Quadrat';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root084
 */
sre.ClearspeakGermanRoots.prototype.testRoot084 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mo>−</mo>' +
      '<msqrt><mi>x</mi></msqrt></mrow><mo>)</mo></mrow></mrow><mn>2</mn>' +
      '</msup></mrow></math>';
  var speech = 'Klammer auf, negative Quadratwurzel aus x, Wurzel Ende, Klammer zu, Quadrat';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root085
 */
sre.ClearspeakGermanRoots.prototype.testRoot085 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><msup><mrow><msqrt><mi>x</mi></msqrt></mrow>' +
      '<mn>2</mn></msup></mrow></math>';
  var speech = 'positive Quadratwurzel aus x, Wurzel Ende, Quadrat';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root086
 */
sre.ClearspeakGermanRoots.prototype.testRoot086 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><msqrt><mrow><msup><mi>x</mi><mn>2</mn></msup>' +
      '</mrow></msqrt></mrow></math>';
  var speech = 'positive Quadratwurzel aus x Quadrat, Wurzel Ende';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root087
 */
sre.ClearspeakGermanRoots.prototype.testRoot087 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><msqrt><mrow><msup><mi>x</mi><mn>2</mn></msup>' +
      '<mo>+</mo><msup><mi>y</mi><mn>2</mn></msup></mrow></msqrt></mrow>' +
      '</math>';
  var speech = 'positive Quadratwurzel aus x Quadrat plus y Quadrat, Wurzel Ende';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root088
 */
sre.ClearspeakGermanRoots.prototype.testRoot088 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><msqrt><mrow><msub><mi>x</mi><mn>1</mn></msub>' +
      '<msup><mrow/><mn>2</mn></msup><mo>+</mo><msub><mi>x</mi><mn>2</mn>' +
      '</msub><msup><mrow/><mn>2</mn></msup></mrow></msqrt></mrow></math>';
  var speech = 'positive Quadratwurzel aus, x Index 1, Quadrat plus, x Index 2, Quadrat, Wurzel Ende';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root089
 */
sre.ClearspeakGermanRoots.prototype.testRoot089 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><msqrt><mrow><msup><mrow><mrow><mo>(</mo><mrow>' +
      '<msub><mi>x</mi><mn>2</mn></msub><mo>−</mo><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup><mo>+' +
      '</mo><msup><mrow><mrow><mo>(</mo><mrow><msub><mi>y</mi><mn>2</mn>' +
      '</msub><mo>−</mo><msub><mi>y</mi><mn>1</mn></msub></mrow><mo>)</mo>' +
      '</mrow></mrow><mn>2</mn></msup></mrow></msqrt></mrow></math>';
  var speech = 'positive Quadratwurzel aus, Klammer auf, x Index 2, minus, x Index 1, Klammer zu, Quadrat plus, Klammer auf, y Index 2, minus, y Index 1, Klammer zu, Quadrat, Wurzel Ende';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root090
 */
sre.ClearspeakGermanRoots.prototype.testRoot090 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><msqrt><mrow><mfrac><mn>1</mn><mn>2</mn>' +
      '</mfrac></mrow></msqrt></mrow></math>';
  var speech = 'positive Quadratwurzel aus ein halb, Wurzel Ende';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root091
 */
sre.ClearspeakGermanRoots.prototype.testRoot091 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><msqrt><mrow><mfrac><mrow><mn>23</mn></mrow>' +
      '<mrow><mn>66</mn></mrow></mfrac></mrow></msqrt></mrow></math>';
  var speech = 'positive Quadratwurzel aus, 23 geteilt durch 66, Wurzel Ende';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root092
 */
sre.ClearspeakGermanRoots.prototype.testRoot092 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><msqrt><mrow><mfrac><mrow><mi>x</mi><mo>+</mo>' +
      '<mn>1</mn></mrow><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>5</mn>' +
      '</mrow></mfrac></mrow></msqrt></mrow></math>';
  var speech = 'positive Quadratwurzel aus, Bruch mit Zähler x plus 1, und Nenner 2 x, plus 5, Wurzel Ende';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example Root093
 */
sre.ClearspeakGermanRoots.prototype.testRoot093 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mfrac><mrow><mo>−</mo><mi>b</mi><mo>±</mo>' +
      '<msqrt><mrow><msup><mi>b</mi><mn>2</mn></msup><mo>−</mo><mn>4</mn>' +
      '<mi>a</mi><mi>c</mi></mrow></msqrt></mrow><mrow><mn>2</mn><mi>a</mi>' +
      '</mrow></mfrac></mrow></math>';
  var speech = 'Bruch mit Zähler negativ b plus minus Quadratwurzel aus b Quadrat minus 4 a c, Wurzel Ende, und Nenner 2 a';
  this.executeRuleTest(mathml, speech, preference);
};


//
// Higher order roots
//


/**
 * Testing ClearspeakGermanRoots Example HighRoot001
 */
sre.ClearspeakGermanRoots.prototype.testHighRoot001 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mroot><mi>y</mi><mn>3</mn></mroot></mrow></math>';
  var speech = 'Kubikwurzel aus y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example HighRoot002
 */
sre.ClearspeakGermanRoots.prototype.testHighRoot002 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mroot><mi>n</mi><mn>4</mn></mroot></mrow></math>';
  var speech = 'die 4 Wurzel aus n';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example HighRoot003
 */
sre.ClearspeakGermanRoots.prototype.testHighRoot003 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mroot><mrow><mn>35</mn></mrow><mn>5</mn>' +
      '</mroot></mrow></math>';
  var speech = 'die 5 Wurzel aus 35';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example HighRoot004
 */
sre.ClearspeakGermanRoots.prototype.testHighRoot004 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mroot><mrow><mn>146</mn></mrow><mn>9</mn>' +
      '</mroot></mrow></math>';
  var speech = 'die 9 Wurzel aus 146';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example HighRoot005
 */
sre.ClearspeakGermanRoots.prototype.testHighRoot005 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mroot><mi>d</mi><mi>n</mi></mroot></mrow></math>';
  var speech = 'die n Wurzel aus d';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example HighRoot006
 */
sre.ClearspeakGermanRoots.prototype.testHighRoot006 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mroot><mrow><mn>243</mn></mrow><mi>m</mi>' +
      '</mroot></mrow></math>';
  var speech = 'die m Wurzel aus 243';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example HighRoot007
 */
sre.ClearspeakGermanRoots.prototype.testHighRoot007 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mroot><mrow><msup><mn>2</mn><mi>i</mi></msup>' +
      '</mrow><mi>i</mi></mroot></mrow></math>';
  var speech = 'die i Wurzel aus 2 hoch i';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example HighRoot008
 */
sre.ClearspeakGermanRoots.prototype.testHighRoot008 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mroot><mrow><mn>125</mn></mrow><mi>j</mi>' +
      '</mroot></mrow></math>';
  var speech = 'die j Wurzel aus 125';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example HighRoot009
 */
sre.ClearspeakGermanRoots.prototype.testHighRoot009 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mo>−</mo><mroot><mi>y</mi><mn>3</mn></mroot>' +
      '</mrow></math>';
  var speech = 'negativ Kubikwurzel aus y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example HighRoot010
 */
sre.ClearspeakGermanRoots.prototype.testHighRoot010 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mo>−</mo><mroot><mi>n</mi><mn>4</mn></mroot>' +
      '</mrow></math>';
  var speech = 'negativ die 4 Wurzel aus n';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example HighRoot011
 */
sre.ClearspeakGermanRoots.prototype.testHighRoot011 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mroot><mi>y</mi><mn>3</mn></mroot></mrow></math>';
  var speech = 'Kubikwurzel aus y, Wurzel Ende';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example HighRoot012
 */
sre.ClearspeakGermanRoots.prototype.testHighRoot012 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mroot><mi>n</mi><mn>4</mn></mroot></mrow></math>';
  var speech = 'die 4 Wurzel aus n, Wurzel Ende';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example HighRoot013
 */
sre.ClearspeakGermanRoots.prototype.testHighRoot013 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mroot><mrow><mn>35</mn></mrow><mn>5</mn>' +
      '</mroot></mrow></math>';
  var speech = 'die 5 Wurzel aus 35, Wurzel Ende';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example HighRoot014
 */
sre.ClearspeakGermanRoots.prototype.testHighRoot014 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mroot><mrow><mn>146</mn></mrow><mn>9</mn>' +
      '</mroot></mrow></math>';
  var speech = 'die 9 Wurzel aus 146, Wurzel Ende';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example HighRoot015
 */
sre.ClearspeakGermanRoots.prototype.testHighRoot015 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mroot><mi>d</mi><mi>n</mi></mroot></mrow></math>';
  var speech = 'die n Wurzel aus d, Wurzel Ende';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example HighRoot016
 */
sre.ClearspeakGermanRoots.prototype.testHighRoot016 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mroot><mrow><mn>243</mn></mrow><mi>m</mi>' +
      '</mroot></mrow></math>';
  var speech = 'die m Wurzel aus 243, Wurzel Ende';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example HighRoot017
 */
sre.ClearspeakGermanRoots.prototype.testHighRoot017 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mroot><mrow><msup><mn>2</mn><mi>i</mi></msup>' +
      '</mrow><mi>i</mi></mroot></mrow></math>';
  var speech = 'die i Wurzel aus 2 hoch i, Wurzel Ende';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example HighRoot018
 */
sre.ClearspeakGermanRoots.prototype.testHighRoot018 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mroot><mrow><mn>125</mn></mrow><mi>j</mi>' +
      '</mroot></mrow></math>';
  var speech = 'die j Wurzel aus 125, Wurzel Ende';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example HighRoot019
 */
sre.ClearspeakGermanRoots.prototype.testHighRoot019 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mo>−</mo><mroot><mi>y</mi><mn>3</mn></mroot>' +
      '</mrow></math>';
  var speech = 'negativ Kubikwurzel aus y, Wurzel Ende';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example HighRoot020
 */
sre.ClearspeakGermanRoots.prototype.testHighRoot020 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mo>−</mo><mroot><mi>n</mi><mn>4</mn></mroot>' +
      '</mrow></math>';
  var speech = 'negativ die 4 Wurzel aus n, Wurzel Ende';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example HighRoot021
 */
sre.ClearspeakGermanRoots.prototype.testHighRoot021 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mroot><mi>y</mi><mn>3</mn></mroot></mrow></math>';
  var speech = 'Kubikwurzel aus y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example HighRoot022
 */
sre.ClearspeakGermanRoots.prototype.testHighRoot022 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mroot><mi>n</mi><mn>4</mn></mroot></mrow></math>';
  var speech = 'die 4 Wurzel aus n';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example HighRoot023
 */
sre.ClearspeakGermanRoots.prototype.testHighRoot023 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mroot><mrow><mn>35</mn></mrow><mn>5</mn>' +
      '</mroot></mrow></math>';
  var speech = 'die 5 Wurzel aus 35';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example HighRoot024
 */
sre.ClearspeakGermanRoots.prototype.testHighRoot024 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mroot><mrow><mn>146</mn></mrow><mn>9</mn>' +
      '</mroot></mrow></math>';
  var speech = 'die 9 Wurzel aus 146';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example HighRoot025
 */
sre.ClearspeakGermanRoots.prototype.testHighRoot025 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mroot><mi>d</mi><mi>n</mi></mroot></mrow></math>';
  var speech = 'die n Wurzel aus d';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example HighRoot026
 */
sre.ClearspeakGermanRoots.prototype.testHighRoot026 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mroot><mrow><mn>243</mn></mrow><mi>m</mi>' +
      '</mroot></mrow></math>';
  var speech = 'die m Wurzel aus 243';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example HighRoot027
 */
sre.ClearspeakGermanRoots.prototype.testHighRoot027 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mroot><mrow><msup><mn>2</mn><mi>i</mi></msup>' +
      '</mrow><mi>i</mi></mroot></mrow></math>';
  var speech = 'die i Wurzel aus 2 hoch i';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example HighRoot028
 */
sre.ClearspeakGermanRoots.prototype.testHighRoot028 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mroot><mrow><mn>125</mn></mrow><mi>j</mi>' +
      '</mroot></mrow></math>';
  var speech = 'die j Wurzel aus 125';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example HighRoot029
 */
sre.ClearspeakGermanRoots.prototype.testHighRoot029 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mo>−</mo><mroot><mi>y</mi><mn>3</mn></mroot>' +
      '</mrow></math>';
  var speech = 'negativ Kubikwurzel aus y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example HighRoot030
 */
sre.ClearspeakGermanRoots.prototype.testHighRoot030 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mo>−</mo><mroot><mi>n</mi><mn>4</mn></mroot>' +
      '</mrow></math>';
  var speech = 'negativ die 4 Wurzel aus n';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example HighRoot031
 */
sre.ClearspeakGermanRoots.prototype.testHighRoot031 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mroot><mi>y</mi><mn>3</mn></mroot></mrow></math>';
  var speech = 'Kubikwurzel aus y, Wurzel Ende';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example HighRoot032
 */
sre.ClearspeakGermanRoots.prototype.testHighRoot032 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mroot><mi>n</mi><mn>4</mn></mroot></mrow></math>';
  var speech = 'die 4 Wurzel aus n, Wurzel Ende';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example HighRoot033
 */
sre.ClearspeakGermanRoots.prototype.testHighRoot033 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mroot><mrow><mn>35</mn></mrow><mn>5</mn>' +
      '</mroot></mrow></math>';
  var speech = 'die 5 Wurzel aus 35, Wurzel Ende';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example HighRoot034
 */
sre.ClearspeakGermanRoots.prototype.testHighRoot034 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mroot><mrow><mn>146</mn></mrow><mn>9</mn>' +
      '</mroot></mrow></math>';
  var speech = 'die 9 Wurzel aus 146, Wurzel Ende';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example HighRoot035
 */
sre.ClearspeakGermanRoots.prototype.testHighRoot035 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mroot><mi>d</mi><mi>n</mi></mroot></mrow></math>';
  var speech = 'die n Wurzel aus d, Wurzel Ende';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example HighRoot036
 */
sre.ClearspeakGermanRoots.prototype.testHighRoot036 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mroot><mrow><mn>243</mn></mrow><mi>m</mi>' +
      '</mroot></mrow></math>';
  var speech = 'die m Wurzel aus 243, Wurzel Ende';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example HighRoot037
 */
sre.ClearspeakGermanRoots.prototype.testHighRoot037 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mroot><mrow><msup><mn>2</mn><mi>i</mi></msup>' +
      '</mrow><mi>i</mi></mroot></mrow></math>';
  var speech = 'die i Wurzel aus 2 hoch i, Wurzel Ende';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example HighRoot038
 */
sre.ClearspeakGermanRoots.prototype.testHighRoot038 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mroot><mrow><mn>125</mn></mrow><mi>j</mi>' +
      '</mroot></mrow></math>';
  var speech = 'die j Wurzel aus 125, Wurzel Ende';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example HighRoot039
 */
sre.ClearspeakGermanRoots.prototype.testHighRoot039 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mo>−</mo><mroot><mi>y</mi><mn>3</mn></mroot>' +
      '</mrow></math>';
  var speech = 'negativ Kubikwurzel aus y, Wurzel Ende';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanRoots Example HighRoot040
 */
sre.ClearspeakGermanRoots.prototype.testHighRoot040 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mo>−</mo><mroot><mi>n</mi><mn>4</mn></mroot>' +
      '</mrow></math>';
  var speech = 'negativ die 4 Wurzel aus n, Wurzel Ende';
  this.executeRuleTest(mathml, speech, preference);
};

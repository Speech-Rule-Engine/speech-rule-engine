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


goog.provide('sre.ClearspeakFrenchRoots');

goog.require('sre.ClearspeakFrenchRuleTest');



/**
* @constructor
* @extends {sre.ClearspeakFrenchRuleTest}
*/
sre.ClearspeakFrenchRoots = function() {
  sre.ClearspeakFrenchRoots.base(this, 'constructor');

  /**
* @override
  */
  this.information = 'ClearspeakFrenchRoots rule tests.';

};
goog.inherits(sre.ClearspeakFrenchRoots, sre.ClearspeakFrenchRuleTest);



//
// Roots
//


/**
 * Testing ClearspeakFrenchRoots Example Root001
 */
sre.ClearspeakFrenchRoots.prototype.testRoot001 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<mrow><msqrt><mn>2</mn></msqrt></mrow>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root002
 */
sre.ClearspeakFrenchRoots.prototype.testRoot002 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mn>3</mn><mo>+</mo><msqrt><mn>2</mn></msqrt>' +
      '</mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root003
 */
sre.ClearspeakFrenchRoots.prototype.testRoot003 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mn>3</mn><mo>±</mo><msqrt><mn>2</mn></msqrt>' +
      '</mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root004
 */
sre.ClearspeakFrenchRoots.prototype.testRoot004 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mn>3</mn><mo>∓</mo><msqrt><mn>2</mn></msqrt>' +
      '</mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root005
 */
sre.ClearspeakFrenchRoots.prototype.testRoot005 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mo>−</mo><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root006
 */
sre.ClearspeakFrenchRoots.prototype.testRoot006 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mn>3</mn><mo>−</mo><msqrt><mn>2</mn></msqrt>' +
      '</mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root007
 */
sre.ClearspeakFrenchRoots.prototype.testRoot007 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mn>3</mn><mo>+</mo><mo>−</mo><msqrt><mn>2</mn>' +
      '</msqrt></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root008
 */
sre.ClearspeakFrenchRoots.prototype.testRoot008 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mn>3</mn><mo>−</mo><mo>−</mo><msqrt><mn>2</mn>' +
      '</msqrt></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root009
 */
sre.ClearspeakFrenchRoots.prototype.testRoot009 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mn>3</mn><mo>+</mo><mrow><mo>(</mo><mrow><mo>−' +
      '</mo><msqrt><mn>2</mn></msqrt></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root010
 */
sre.ClearspeakFrenchRoots.prototype.testRoot010 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mn>3</mn><mo>−</mo><mrow><mo>(</mo><mrow><mo>−' +
      '</mo><msqrt><mn>2</mn></msqrt></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root011
 */
sre.ClearspeakFrenchRoots.prototype.testRoot011 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><msqrt><mrow><mi>x</mi><mo>+</mo><mn>1</mn>' +
      '</mrow></msqrt></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root011a
 */
sre.ClearspeakFrenchRoots.prototype.testRoot011a = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><msqrt><mi>x</mi></msqrt><mo>+</mo><mn>1</mn>' +
      '</mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root012
 */
sre.ClearspeakFrenchRoots.prototype.testRoot012 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mo>−</mo><msqrt><mi>x</mi></msqrt></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root013
 */
sre.ClearspeakFrenchRoots.prototype.testRoot013 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><msqrt><mi>x' +
      '</mi></msqrt></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup></mrow>' +
      '</math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root014
 */
sre.ClearspeakFrenchRoots.prototype.testRoot014 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mo>−</mo><msup><mrow><mrow><mo>(</mo><mrow>' +
      '<msqrt><mi>x</mi></msqrt></mrow><mo>)</mo></mrow></mrow><mn>2</mn>' +
      '</msup></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root015
 */
sre.ClearspeakFrenchRoots.prototype.testRoot015 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><msup><mrow><msqrt><mi>x</mi></msqrt></mrow>' +
      '<mn>2</mn></msup></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root016
 */
sre.ClearspeakFrenchRoots.prototype.testRoot016 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><msqrt><mrow><msup><mi>x</mi><mn>2</mn></msup>' +
      '</mrow></msqrt></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root017
 */
sre.ClearspeakFrenchRoots.prototype.testRoot017 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><msqrt><mrow><msup><mi>x</mi><mn>2</mn></msup>' +
      '<mo>+</mo><msup><mi>y</mi><mn>2</mn></msup></mrow></msqrt></mrow>' +
      '</math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root018
 */
sre.ClearspeakFrenchRoots.prototype.testRoot018 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><msqrt><mrow><msub><mi>x</mi><mn>1</mn></msub>' +
      '<msup><mrow/><mn>2</mn></msup><mo>+</mo><msub><mi>x</mi><mn>2</mn>' +
      '</msub><msup><mrow/><mn>2</mn></msup></mrow></msqrt></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root019
 */
sre.ClearspeakFrenchRoots.prototype.testRoot019 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><msqrt><mrow><msup><mrow><mrow><mo>(</mo><mrow>' +
      '<msub><mi>x</mi><mn>2</mn></msub><mo>−</mo><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup><mo>+' +
      '</mo><msup><mrow><mrow><mo>(</mo><mrow><msub><mi>y</mi><mn>2</mn>' +
      '</msub><mo>−</mo><msub><mi>y</mi><mn>1</mn></msub></mrow><mo>)</mo>' +
      '</mrow></mrow><mn>2</mn></msup></mrow></msqrt></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root020
 */
sre.ClearspeakFrenchRoots.prototype.testRoot020 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><msqrt><mrow><mfrac><mn>1</mn><mn>2</mn>' +
      '</mfrac></mrow></msqrt></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root021
 */
sre.ClearspeakFrenchRoots.prototype.testRoot021 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><msqrt><mrow><mfrac><mrow><mn>23</mn></mrow>' +
      '<mrow><mn>66</mn></mrow></mfrac></mrow></msqrt></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root022
 */
sre.ClearspeakFrenchRoots.prototype.testRoot022 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><msqrt><mrow><mfrac><mrow><mi>x</mi><mo>+</mo>' +
      '<mn>1</mn></mrow><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>5</mn>' +
      '</mrow></mfrac></mrow></msqrt></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root023
 */
sre.ClearspeakFrenchRoots.prototype.testRoot023 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mo>−</mo><mi>b</mi><mo>±</mo>' +
      '<msqrt><mrow><msup><mi>b</mi><mn>2</mn></msup><mo>−</mo><mn>4</mn>' +
      '<mi>a</mi><mi>c</mi></mrow></msqrt></mrow><mrow><mn>2</mn><mi>a</mi>' +
      '</mrow></mfrac></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root024
 */
sre.ClearspeakFrenchRoots.prototype.testRoot024 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root025
 */
sre.ClearspeakFrenchRoots.prototype.testRoot025 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mn>3</mn><mo>+</mo><msqrt><mn>2</mn></msqrt>' +
      '</mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root026
 */
sre.ClearspeakFrenchRoots.prototype.testRoot026 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mn>3</mn><mo>±</mo><msqrt><mn>2</mn></msqrt>' +
      '</mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root027
 */
sre.ClearspeakFrenchRoots.prototype.testRoot027 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mn>3</mn><mo>∓</mo><msqrt><mn>2</mn></msqrt>' +
      '</mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root028
 */
sre.ClearspeakFrenchRoots.prototype.testRoot028 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mo>−</mo><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root029
 */
sre.ClearspeakFrenchRoots.prototype.testRoot029 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mn>3</mn><mo>−</mo><msqrt><mn>2</mn></msqrt>' +
      '</mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root030
 */
sre.ClearspeakFrenchRoots.prototype.testRoot030 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mn>3</mn><mo>+</mo><mo>−</mo><msqrt><mn>2</mn>' +
      '</msqrt></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root031
 */
sre.ClearspeakFrenchRoots.prototype.testRoot031 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mn>3</mn><mo>−</mo><mo>−</mo><msqrt><mn>2</mn>' +
      '</msqrt></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root032
 */
sre.ClearspeakFrenchRoots.prototype.testRoot032 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mn>3</mn><mo>+</mo><mrow><mo>(</mo><mrow><mo>−' +
      '</mo><msqrt><mn>2</mn></msqrt></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root033
 */
sre.ClearspeakFrenchRoots.prototype.testRoot033 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mn>3</mn><mo>−</mo><mrow><mo>(</mo><mrow><mo>−' +
      '</mo><msqrt><mn>2</mn></msqrt></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root034
 */
sre.ClearspeakFrenchRoots.prototype.testRoot034 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><msqrt><mrow><mi>x</mi><mo>+</mo><mn>1</mn>' +
      '</mrow></msqrt></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root034a
 */
sre.ClearspeakFrenchRoots.prototype.testRoot034a = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><msqrt><mi>x</mi></msqrt><mo>+</mo><mn>1</mn>' +
      '</mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root035
 */
sre.ClearspeakFrenchRoots.prototype.testRoot035 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mo>−</mo><msqrt><mi>x</mi></msqrt></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root036
 */
sre.ClearspeakFrenchRoots.prototype.testRoot036 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><msqrt><mi>x' +
      '</mi></msqrt></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup></mrow>' +
      '</math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root037
 */
sre.ClearspeakFrenchRoots.prototype.testRoot037 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mo>−</mo>' +
      '<msqrt><mi>x</mi></msqrt></mrow><mo>)</mo></mrow></mrow><mn>2</mn>' +
      '</msup></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root038
 */
sre.ClearspeakFrenchRoots.prototype.testRoot038 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mo>−</mo><msup><mrow><mrow><mo>(</mo><mrow>' +
      '<msqrt><mi>x</mi></msqrt></mrow><mo>)</mo></mrow></mrow><mn>2</mn>' +
      '</msup></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root039
 */
sre.ClearspeakFrenchRoots.prototype.testRoot039 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><msup><mrow><msqrt><mi>x</mi></msqrt></mrow>' +
      '<mn>2</mn></msup></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root040
 */
sre.ClearspeakFrenchRoots.prototype.testRoot040 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><msqrt><mrow><msup><mi>x</mi><mn>2</mn></msup>' +
      '</mrow></msqrt></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root041
 */
sre.ClearspeakFrenchRoots.prototype.testRoot041 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><msqrt><mrow><msup><mi>x</mi><mn>2</mn></msup>' +
      '<mo>+</mo><msup><mi>y</mi><mn>2</mn></msup></mrow></msqrt></mrow>' +
      '</math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root042
 */
sre.ClearspeakFrenchRoots.prototype.testRoot042 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><msqrt><mrow><msub><mi>x</mi><mn>1</mn></msub>' +
      '<msup><mrow/><mn>2</mn></msup><mo>+</mo><msub><mi>x</mi><mn>2</mn>' +
      '</msub><msup><mrow/><mn>2</mn></msup></mrow></msqrt></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root043
 */
sre.ClearspeakFrenchRoots.prototype.testRoot043 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><msqrt><mrow><msup><mrow><mrow><mo>(</mo><mrow>' +
      '<msub><mi>x</mi><mn>2</mn></msub><mo>−</mo><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup><mo>+' +
      '</mo><msup><mrow><mrow><mo>(</mo><mrow><msub><mi>y</mi><mn>2</mn>' +
      '</msub><mo>−</mo><msub><mi>y</mi><mn>1</mn></msub></mrow><mo>)</mo>' +
      '</mrow></mrow><mn>2</mn></msup></mrow></msqrt></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root044
 */
sre.ClearspeakFrenchRoots.prototype.testRoot044 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><msqrt><mrow><mfrac><mn>1</mn><mn>2</mn>' +
      '</mfrac></mrow></msqrt></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root045
 */
sre.ClearspeakFrenchRoots.prototype.testRoot045 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><msqrt><mrow><mfrac><mrow><mn>23</mn></mrow>' +
      '<mrow><mn>66</mn></mrow></mfrac></mrow></msqrt></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root046
 */
sre.ClearspeakFrenchRoots.prototype.testRoot046 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><msqrt><mrow><mfrac><mrow><mi>x</mi><mo>+</mo>' +
      '<mn>1</mn></mrow><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>5</mn>' +
      '</mrow></mfrac></mrow></msqrt></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root047
 */
sre.ClearspeakFrenchRoots.prototype.testRoot047 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mfrac><mrow><mo>−</mo><mi>b</mi><mo>±</mo>' +
      '<msqrt><mrow><msup><mi>b</mi><mn>2</mn></msup><mo>−</mo><mn>4</mn>' +
      '<mi>a</mi><mi>c</mi></mrow></msqrt></mrow><mrow><mn>2</mn><mi>a</mi>' +
      '</mrow></mfrac></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root048
 */
sre.ClearspeakFrenchRoots.prototype.testRoot048 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root049
 */
sre.ClearspeakFrenchRoots.prototype.testRoot049 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mn>3</mn><mo>+</mo><msqrt><mn>2</mn></msqrt>' +
      '</mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root050
 */
sre.ClearspeakFrenchRoots.prototype.testRoot050 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mn>3</mn><mo>±</mo><msqrt><mn>2</mn></msqrt>' +
      '</mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root051
 */
sre.ClearspeakFrenchRoots.prototype.testRoot051 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mn>3</mn><mo>∓</mo><msqrt><mn>2</mn></msqrt>' +
      '</mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root052
 */
sre.ClearspeakFrenchRoots.prototype.testRoot052 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mo>−</mo><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root053
 */
sre.ClearspeakFrenchRoots.prototype.testRoot053 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mn>3</mn><mo>−</mo><msqrt><mn>2</mn></msqrt>' +
      '</mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root054
 */
sre.ClearspeakFrenchRoots.prototype.testRoot054 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mn>3</mn><mo>+</mo><mo>−</mo><msqrt><mn>2</mn>' +
      '</msqrt></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root055
 */
sre.ClearspeakFrenchRoots.prototype.testRoot055 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mn>3</mn><mo>−</mo><mo>−</mo><msqrt><mn>2</mn>' +
      '</msqrt></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root056
 */
sre.ClearspeakFrenchRoots.prototype.testRoot056 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mn>3</mn><mo>+</mo><mrow><mo>(</mo><mrow><mo>−' +
      '</mo><msqrt><mn>2</mn></msqrt></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root057
 */
sre.ClearspeakFrenchRoots.prototype.testRoot057 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mn>3</mn><mo>−</mo><mrow><mo>(</mo><mrow><mo>−' +
      '</mo><msqrt><mn>2</mn></msqrt></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root058
 */
sre.ClearspeakFrenchRoots.prototype.testRoot058 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><msqrt><mrow><mi>x</mi><mo>+</mo><mn>1</mn>' +
      '</mrow></msqrt></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root058a
 */
sre.ClearspeakFrenchRoots.prototype.testRoot058a = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><msqrt><mi>x</mi></msqrt><mo>+</mo><mn>1</mn>' +
      '</mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root059
 */
sre.ClearspeakFrenchRoots.prototype.testRoot059 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mo>−</mo><msqrt><mi>x</mi></msqrt></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root060
 */
sre.ClearspeakFrenchRoots.prototype.testRoot060 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><msqrt><mi>x' +
      '</mi></msqrt></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup></mrow>' +
      '</math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root061
 */
sre.ClearspeakFrenchRoots.prototype.testRoot061 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mo>−</mo><msup><mrow><mrow><mo>(</mo><mrow>' +
      '<msqrt><mi>x</mi></msqrt></mrow><mo>)</mo></mrow></mrow><mn>2</mn>' +
      '</msup></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root062
 */
sre.ClearspeakFrenchRoots.prototype.testRoot062 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><msup><mrow><msqrt><mi>x</mi></msqrt></mrow>' +
      '<mn>2</mn></msup></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root063
 */
sre.ClearspeakFrenchRoots.prototype.testRoot063 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><msqrt><mrow><msup><mi>x</mi><mn>2</mn></msup>' +
      '</mrow></msqrt></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root064
 */
sre.ClearspeakFrenchRoots.prototype.testRoot064 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><msqrt><mrow><msup><mi>x</mi><mn>2</mn></msup>' +
      '<mo>+</mo><msup><mi>y</mi><mn>2</mn></msup></mrow></msqrt></mrow>' +
      '</math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root065
 */
sre.ClearspeakFrenchRoots.prototype.testRoot065 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><msqrt><mrow><msub><mi>x</mi><mn>1</mn></msub>' +
      '<msup><mrow/><mn>2</mn></msup><mo>+</mo><msub><mi>x</mi><mn>2</mn>' +
      '</msub><msup><mrow/><mn>2</mn></msup></mrow></msqrt></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root066
 */
sre.ClearspeakFrenchRoots.prototype.testRoot066 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><msqrt><mrow><msup><mrow><mrow><mo>(</mo><mrow>' +
      '<msub><mi>x</mi><mn>2</mn></msub><mo>−</mo><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup><mo>+' +
      '</mo><msup><mrow><mrow><mo>(</mo><mrow><msub><mi>y</mi><mn>2</mn>' +
      '</msub><mo>−</mo><msub><mi>y</mi><mn>1</mn></msub></mrow><mo>)</mo>' +
      '</mrow></mrow><mn>2</mn></msup></mrow></msqrt></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root067
 */
sre.ClearspeakFrenchRoots.prototype.testRoot067 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><msqrt><mrow><mfrac><mn>1</mn><mn>2</mn>' +
      '</mfrac></mrow></msqrt></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root068
 */
sre.ClearspeakFrenchRoots.prototype.testRoot068 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><msqrt><mrow><mfrac><mrow><mn>23</mn></mrow>' +
      '<mrow><mn>66</mn></mrow></mfrac></mrow></msqrt></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root069
 */
sre.ClearspeakFrenchRoots.prototype.testRoot069 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><msqrt><mrow><mfrac><mrow><mi>x</mi><mo>+</mo>' +
      '<mn>1</mn></mrow><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>5</mn>' +
      '</mrow></mfrac></mrow></msqrt></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root070
 */
sre.ClearspeakFrenchRoots.prototype.testRoot070 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mfrac><mrow><mo>−</mo><mi>b</mi><mo>±</mo>' +
      '<msqrt><mrow><msup><mi>b</mi><mn>2</mn></msup><mo>−</mo><mn>4</mn>' +
      '<mi>a</mi><mi>c</mi></mrow></msqrt></mrow><mrow><mn>2</mn><mi>a</mi>' +
      '</mrow></mfrac></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root071
 */
sre.ClearspeakFrenchRoots.prototype.testRoot071 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root072
 */
sre.ClearspeakFrenchRoots.prototype.testRoot072 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mn>3</mn><mo>+</mo><msqrt><mn>2</mn></msqrt>' +
      '</mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root073
 */
sre.ClearspeakFrenchRoots.prototype.testRoot073 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mn>3</mn><mo>±</mo><msqrt><mn>2</mn></msqrt>' +
      '</mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root074
 */
sre.ClearspeakFrenchRoots.prototype.testRoot074 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mn>3</mn><mo>∓</mo><msqrt><mn>2</mn></msqrt>' +
      '</mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root075
 */
sre.ClearspeakFrenchRoots.prototype.testRoot075 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mo>−</mo><msqrt><mn>2</mn></msqrt></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root076
 */
sre.ClearspeakFrenchRoots.prototype.testRoot076 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mn>3</mn><mo>−</mo><msqrt><mn>2</mn></msqrt>' +
      '</mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root077
 */
sre.ClearspeakFrenchRoots.prototype.testRoot077 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mn>3</mn><mo>+</mo><mo>−</mo><msqrt><mn>2</mn>' +
      '</msqrt></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root078
 */
sre.ClearspeakFrenchRoots.prototype.testRoot078 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mn>3</mn><mo>−</mo><mo>−</mo><msqrt><mn>2</mn>' +
      '</msqrt></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root079
 */
sre.ClearspeakFrenchRoots.prototype.testRoot079 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mn>3</mn><mo>+</mo><mrow><mo>(</mo><mrow><mo>−' +
      '</mo><msqrt><mn>2</mn></msqrt></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root080
 */
sre.ClearspeakFrenchRoots.prototype.testRoot080 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mn>3</mn><mo>−</mo><mrow><mo>(</mo><mrow><mo>−' +
      '</mo><msqrt><mn>2</mn></msqrt></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root081
 */
sre.ClearspeakFrenchRoots.prototype.testRoot081 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><msqrt><mrow><mi>x</mi><mo>+</mo><mn>1</mn>' +
      '</mrow></msqrt></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root081a
 */
sre.ClearspeakFrenchRoots.prototype.testRoot081a = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><msqrt><mi>x</mi></msqrt><mo>+</mo><mn>1</mn>' +
      '</mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root082
 */
sre.ClearspeakFrenchRoots.prototype.testRoot082 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mo>−</mo><msqrt><mi>x</mi></msqrt></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root083
 */
sre.ClearspeakFrenchRoots.prototype.testRoot083 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><msqrt><mi>x' +
      '</mi></msqrt></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup></mrow>' +
      '</math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root084
 */
sre.ClearspeakFrenchRoots.prototype.testRoot084 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mo>−</mo>' +
      '<msqrt><mi>x</mi></msqrt></mrow><mo>)</mo></mrow></mrow><mn>2</mn>' +
      '</msup></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root085
 */
sre.ClearspeakFrenchRoots.prototype.testRoot085 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><msup><mrow><msqrt><mi>x</mi></msqrt></mrow>' +
      '<mn>2</mn></msup></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root086
 */
sre.ClearspeakFrenchRoots.prototype.testRoot086 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><msqrt><mrow><msup><mi>x</mi><mn>2</mn></msup>' +
      '</mrow></msqrt></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root087
 */
sre.ClearspeakFrenchRoots.prototype.testRoot087 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><msqrt><mrow><msup><mi>x</mi><mn>2</mn></msup>' +
      '<mo>+</mo><msup><mi>y</mi><mn>2</mn></msup></mrow></msqrt></mrow>' +
      '</math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root088
 */
sre.ClearspeakFrenchRoots.prototype.testRoot088 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><msqrt><mrow><msub><mi>x</mi><mn>1</mn></msub>' +
      '<msup><mrow/><mn>2</mn></msup><mo>+</mo><msub><mi>x</mi><mn>2</mn>' +
      '</msub><msup><mrow/><mn>2</mn></msup></mrow></msqrt></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root089
 */
sre.ClearspeakFrenchRoots.prototype.testRoot089 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><msqrt><mrow><msup><mrow><mrow><mo>(</mo><mrow>' +
      '<msub><mi>x</mi><mn>2</mn></msub><mo>−</mo><msub><mi>x</mi><mn>1' +
      '</mn></msub></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup><mo>+' +
      '</mo><msup><mrow><mrow><mo>(</mo><mrow><msub><mi>y</mi><mn>2</mn>' +
      '</msub><mo>−</mo><msub><mi>y</mi><mn>1</mn></msub></mrow><mo>)</mo>' +
      '</mrow></mrow><mn>2</mn></msup></mrow></msqrt></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root090
 */
sre.ClearspeakFrenchRoots.prototype.testRoot090 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><msqrt><mrow><mfrac><mn>1</mn><mn>2</mn>' +
      '</mfrac></mrow></msqrt></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root091
 */
sre.ClearspeakFrenchRoots.prototype.testRoot091 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><msqrt><mrow><mfrac><mrow><mn>23</mn></mrow>' +
      '<mrow><mn>66</mn></mrow></mfrac></mrow></msqrt></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root092
 */
sre.ClearspeakFrenchRoots.prototype.testRoot092 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><msqrt><mrow><mfrac><mrow><mi>x</mi><mo>+</mo>' +
      '<mn>1</mn></mrow><mrow><mn>2</mn><mi>x</mi><mo>+</mo><mn>5</mn>' +
      '</mrow></mfrac></mrow></msqrt></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example Root093
 */
sre.ClearspeakFrenchRoots.prototype.testRoot093 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mfrac><mrow><mo>−</mo><mi>b</mi><mo>±</mo>' +
      '<msqrt><mrow><msup><mi>b</mi><mn>2</mn></msup><mo>−</mo><mn>4</mn>' +
      '<mi>a</mi><mi>c</mi></mrow></msqrt></mrow><mrow><mn>2</mn><mi>a</mi>' +
      '</mrow></mfrac></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


//
// Higher order roots
//


/**
 * Testing ClearspeakFrenchRoots Example HighRoot001
 */
sre.ClearspeakFrenchRoots.prototype.testHighRoot001 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mroot><mi>y</mi><mn>3</mn></mroot></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example HighRoot002
 */
sre.ClearspeakFrenchRoots.prototype.testHighRoot002 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mroot><mi>n</mi><mn>4</mn></mroot></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example HighRoot003
 */
sre.ClearspeakFrenchRoots.prototype.testHighRoot003 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mroot><mrow><mn>35</mn></mrow><mn>5</mn>' +
      '</mroot></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example HighRoot004
 */
sre.ClearspeakFrenchRoots.prototype.testHighRoot004 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mroot><mrow><mn>146</mn></mrow><mn>9</mn>' +
      '</mroot></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example HighRoot005
 */
sre.ClearspeakFrenchRoots.prototype.testHighRoot005 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mroot><mi>d</mi><mi>n</mi></mroot></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example HighRoot006
 */
sre.ClearspeakFrenchRoots.prototype.testHighRoot006 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mroot><mrow><mn>243</mn></mrow><mi>m</mi>' +
      '</mroot></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example HighRoot007
 */
sre.ClearspeakFrenchRoots.prototype.testHighRoot007 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mroot><mrow><msup><mn>2</mn><mi>i</mi></msup>' +
      '</mrow><mi>i</mi></mroot></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example HighRoot008
 */
sre.ClearspeakFrenchRoots.prototype.testHighRoot008 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mroot><mrow><mn>125</mn></mrow><mi>j</mi>' +
      '</mroot></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example HighRoot009
 */
sre.ClearspeakFrenchRoots.prototype.testHighRoot009 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mo>−</mo><mroot><mi>y</mi><mn>3</mn></mroot>' +
      '</mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example HighRoot010
 */
sre.ClearspeakFrenchRoots.prototype.testHighRoot010 = function() {
  var preference = 'Roots_Auto';
  var mathml = '<math><mrow><mo>−</mo><mroot><mi>n</mi><mn>4</mn></mroot>' +
      '</mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example HighRoot011
 */
sre.ClearspeakFrenchRoots.prototype.testHighRoot011 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mroot><mi>y</mi><mn>3</mn></mroot></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example HighRoot012
 */
sre.ClearspeakFrenchRoots.prototype.testHighRoot012 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mroot><mi>n</mi><mn>4</mn></mroot></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example HighRoot013
 */
sre.ClearspeakFrenchRoots.prototype.testHighRoot013 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mroot><mrow><mn>35</mn></mrow><mn>5</mn>' +
      '</mroot></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example HighRoot014
 */
sre.ClearspeakFrenchRoots.prototype.testHighRoot014 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mroot><mrow><mn>146</mn></mrow><mn>9</mn>' +
      '</mroot></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example HighRoot015
 */
sre.ClearspeakFrenchRoots.prototype.testHighRoot015 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mroot><mi>d</mi><mi>n</mi></mroot></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example HighRoot016
 */
sre.ClearspeakFrenchRoots.prototype.testHighRoot016 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mroot><mrow><mn>243</mn></mrow><mi>m</mi>' +
      '</mroot></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example HighRoot017
 */
sre.ClearspeakFrenchRoots.prototype.testHighRoot017 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mroot><mrow><msup><mn>2</mn><mi>i</mi></msup>' +
      '</mrow><mi>i</mi></mroot></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example HighRoot018
 */
sre.ClearspeakFrenchRoots.prototype.testHighRoot018 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mroot><mrow><mn>125</mn></mrow><mi>j</mi>' +
      '</mroot></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example HighRoot019
 */
sre.ClearspeakFrenchRoots.prototype.testHighRoot019 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mo>−</mo><mroot><mi>y</mi><mn>3</mn></mroot>' +
      '</mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example HighRoot020
 */
sre.ClearspeakFrenchRoots.prototype.testHighRoot020 = function() {
  var preference = 'Roots_RootEnd';
  var mathml = '<math><mrow><mo>−</mo><mroot><mi>n</mi><mn>4</mn></mroot>' +
      '</mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example HighRoot021
 */
sre.ClearspeakFrenchRoots.prototype.testHighRoot021 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mroot><mi>y</mi><mn>3</mn></mroot></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example HighRoot022
 */
sre.ClearspeakFrenchRoots.prototype.testHighRoot022 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mroot><mi>n</mi><mn>4</mn></mroot></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example HighRoot023
 */
sre.ClearspeakFrenchRoots.prototype.testHighRoot023 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mroot><mrow><mn>35</mn></mrow><mn>5</mn>' +
      '</mroot></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example HighRoot024
 */
sre.ClearspeakFrenchRoots.prototype.testHighRoot024 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mroot><mrow><mn>146</mn></mrow><mn>9</mn>' +
      '</mroot></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example HighRoot025
 */
sre.ClearspeakFrenchRoots.prototype.testHighRoot025 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mroot><mi>d</mi><mi>n</mi></mroot></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example HighRoot026
 */
sre.ClearspeakFrenchRoots.prototype.testHighRoot026 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mroot><mrow><mn>243</mn></mrow><mi>m</mi>' +
      '</mroot></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example HighRoot027
 */
sre.ClearspeakFrenchRoots.prototype.testHighRoot027 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mroot><mrow><msup><mn>2</mn><mi>i</mi></msup>' +
      '</mrow><mi>i</mi></mroot></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example HighRoot028
 */
sre.ClearspeakFrenchRoots.prototype.testHighRoot028 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mroot><mrow><mn>125</mn></mrow><mi>j</mi>' +
      '</mroot></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example HighRoot029
 */
sre.ClearspeakFrenchRoots.prototype.testHighRoot029 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mo>−</mo><mroot><mi>y</mi><mn>3</mn></mroot>' +
      '</mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example HighRoot030
 */
sre.ClearspeakFrenchRoots.prototype.testHighRoot030 = function() {
  var preference = 'Roots_PosNegSqRoot';
  var mathml = '<math><mrow><mo>−</mo><mroot><mi>n</mi><mn>4</mn></mroot>' +
      '</mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example HighRoot031
 */
sre.ClearspeakFrenchRoots.prototype.testHighRoot031 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mroot><mi>y</mi><mn>3</mn></mroot></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example HighRoot032
 */
sre.ClearspeakFrenchRoots.prototype.testHighRoot032 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mroot><mi>n</mi><mn>4</mn></mroot></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example HighRoot033
 */
sre.ClearspeakFrenchRoots.prototype.testHighRoot033 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mroot><mrow><mn>35</mn></mrow><mn>5</mn>' +
      '</mroot></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example HighRoot034
 */
sre.ClearspeakFrenchRoots.prototype.testHighRoot034 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mroot><mrow><mn>146</mn></mrow><mn>9</mn>' +
      '</mroot></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example HighRoot035
 */
sre.ClearspeakFrenchRoots.prototype.testHighRoot035 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mroot><mi>d</mi><mi>n</mi></mroot></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example HighRoot036
 */
sre.ClearspeakFrenchRoots.prototype.testHighRoot036 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mroot><mrow><mn>243</mn></mrow><mi>m</mi>' +
      '</mroot></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example HighRoot037
 */
sre.ClearspeakFrenchRoots.prototype.testHighRoot037 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mroot><mrow><msup><mn>2</mn><mi>i</mi></msup>' +
      '</mrow><mi>i</mi></mroot></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example HighRoot038
 */
sre.ClearspeakFrenchRoots.prototype.testHighRoot038 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mroot><mrow><mn>125</mn></mrow><mi>j</mi>' +
      '</mroot></mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example HighRoot039
 */
sre.ClearspeakFrenchRoots.prototype.testHighRoot039 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mo>−</mo><mroot><mi>y</mi><mn>3</mn></mroot>' +
      '</mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchRoots Example HighRoot040
 */
sre.ClearspeakFrenchRoots.prototype.testHighRoot040 = function() {
  var preference = 'Roots_PosNegSqRootEnd';
  var mathml = '<math><mrow><mo>−</mo><mroot><mi>n</mi><mn>4</mn></mroot>' +
      '</mrow></math>';
  var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};

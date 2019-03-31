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


goog.provide('sre.ClearspeakFrenchTrigometry');

goog.require('sre.ClearspeakFrenchRuleTest');



/**
* @constructor
* @extends {sre.ClearspeakFrenchRuleTest}
*/
sre.ClearspeakFrenchTrigometry = function() {
  sre.ClearspeakFrenchTrigometry.base(this, 'constructor');

  /**
* @override
  */
  this.information = 'ClearspeakFrenchTrigometry rule tests.';

};
goog.inherits(sre.ClearspeakFrenchTrigometry, sre.ClearspeakFrenchRuleTest);



//
// Trigonometry
//


//
// Table 1: Basic Trigonometric Functions
//


/**
 * Testing ClearspeakFrenchTrigometry Example Trig001
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrig001 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>sin</mi><mi>x</mi></mrow></math>';
  var speech = 'sinus x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example Trig002
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrig002 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>cos</mi><mi>x</mi></mrow></math>';
  var speech = 'cosinus x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example Trig003
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrig003 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>tan</mi><mi>θ</mi></mrow></math>';
  var speech = 'tangente thêta';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example Trig004
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrig004 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>sec</mi><mi>θ</mi></mrow></math>';
  var speech = 'sécante thêta';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example Trig005
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrig005 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>csc</mi><mi>x</mi></mrow></math>';
  var speech = 'cosécante x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example Trig006
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrig006 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>cot</mi><mi>x</mi></mrow></math>';
  var speech = 'cotangente x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example Trig007
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrig007 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mn>2</mn>' +
      '</msup><mi>x</mi></mrow></math>';
  var speech = 'sinus au carré x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example Trig008
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrig008 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>cos</mi></mrow><mn>3</mn>' +
      '</msup><mi>x</mi></mrow></math>';
  var speech = 'cosinus au cube x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example Trig009
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrig009 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>tan</mi></mrow><mn>2</mn>' +
      '</msup><mi>x</mi></mrow></math>';
  var speech = 'tangente au carré x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example Trig010
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrig010 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>sec</mi></mrow><mn>3</mn>' +
      '</msup><mi>x</mi></mrow></math>';
  var speech = 'sécante au cube x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example Trig011
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrig011 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>csc</mi></mrow><mn>2</mn>' +
      '</msup><mi>x</mi></mrow></math>';
  var speech = 'cosécante au carré x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example Trig012
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrig012 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>cot</mi></mrow><mn>2</mn>' +
      '</msup><mi>x</mi></mrow></math>';
  var speech = 'cotangente au carré x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example Trig013
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrig013 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>sin</mi><mn>2</mn><mi>π</mi></mrow></math>';
  var speech = 'sinus 2 pi';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example Trig014
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrig014 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><mi>π</mi>' +
      '<mi>k</mi><mo>+</mo><mfrac><mi>π</mi><mn>2</mn></mfrac></mrow><mo>)' +
      '</mo></mrow></mrow></math>';
  var speech = 'sinus de, parenthèse gauche, pi k, plus, pi sur 2, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example Trig015
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrig015 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>cos</mi><mfrac><mi>π</mi><mn>2</mn></mfrac>' +
      '</mrow></math>';
  var speech = 'cosinus de, pi sur 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example Trig016
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrig016 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>sin</mi><mfrac><mi>π</mi><mn>2</mn></mfrac>' +
      '</mrow></math>';
  var speech = 'sinus de, pi sur 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example Trig017
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrig017 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>sin</mi><mi>π</mi></mrow><mn>2' +
      '</mn></mfrac></mrow></math>';
  var speech = 'sinus pi sur 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example Trig018
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrig018 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mfrac><mn>2</mn><mrow><mi>sin</mi><mi>π</mi>' +
      '</mrow></mfrac></mrow></math>';
  var speech = '2 sur sinus pi';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example Trig019
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrig019 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>sin</mi><mfrac><mi>π</mi><mn>2' +
      '</mn></mfrac></mrow><mn>3</mn></mfrac></mrow></math>';
  var speech = 'fraction avec numérateur, sinus de, pi sur 2, et dénominateur 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example Trig020
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrig020 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>tan</mi><mrow><mo>(</mo><mrow><mo>−</mo>' +
      '<mi>π</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'tangente négatif pi';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example Trig021
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrig021 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><mi>x</mi>' +
      '<mo>+</mo><mi>π</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'sinus de, parenthèse gauche, x plus pi, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example Trig022
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrig022 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>cos</mi><mrow><mo>(</mo><mrow><mi>x</mi>' +
      '<mo>+</mo><mfrac><mi>π</mi><mn>2</mn></mfrac></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'cosinus de, parenthèse gauche, x plus, pi sur 2, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example Trig023
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrig023 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>cos</mi><mrow><mo>(</mo><mrow><mfrac><mi>π' +
      '</mi><mn>2</mn></mfrac><mo>+</mo><mi>x</mi></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'cosinus de, parenthèse gauche, pi sur 2, plus x, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example Trig024
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrig024 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mn>2</mn>' +
      '</msup><mi>x</mi><mo>+</mo><msup><mrow><mi>cos</mi></mrow><mn>2</mn>' +
      '</msup><mi>x</mi><mo>=</mo><mn>1</mn></mrow></math>';
  var speech = 'sinus au carré x, plus, cosinus au carré x, égale 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example Trig025
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrig025 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mn>4</mn>' +
      '</msup><mi>x</mi></mrow></math>';
  var speech = 'sinus à la puissance 4; x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example Trig026
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrig026 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>cos</mi></mrow><mn>5</mn>' +
      '</msup><mi>x</mi></mrow></math>';
  var speech = 'cosinus à la puissance 5; x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example Trig027
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrig027 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>tan</mi></mrow><mi>n</mi>' +
      '</msup><mi>x</mi></mrow></math>';
  var speech = 'tangente à la puissance n; x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example Trig028
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrig028 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>sin</mi><mi>x</mi></mrow>' +
      '<mrow><mi>cos</mi><mi>x</mi></mrow></mfrac></mrow></math>';
  var speech = 'sinus x sur cosinus x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example Trig029
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrig029 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>tan</mi><mn>35</mn><mo>°</mo></mrow></math>';
  var speech = 'tangente 35 degrés';
  this.executeRuleTest(mathml, speech, preference);
};


// TODO: (Simons) Handles degrees as a postfix function.
/**
 * Testing ClearspeakFrenchTrigometry Example Trig030
 */
sre.ClearspeakFrenchTrigometry.prototype.untestTrig030 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><mn>45</mn>' +
      '<mo>°</mo><mo>+</mo><mn>30</mn><mo>°</mo></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'XXXX';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example Trig031
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrig031 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>tan</mi><mrow><mo>(</mo><mrow><mo>∠</mo>' +
      '<mi>D</mi><mi>E</mi><mi>F</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'tangente de, parenthèse gauche, angle D E F, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example Trig032
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrig032 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>tan</mi><mrow><mo>(</mo><mrow><mo>∠</mo>' +
      '<mi>D</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'tangente de, parenthèse gauche, angle D, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example Trig033
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrig033 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>sin</mi><mo stretchy="false">(</mo><mi>x' +
      '</mi><mo>+</mo><mi>y</mi><mo stretchy="false">)</mo><mo>=</mo>' +
      '<mi>sin</mi><mi>x</mi><mi>cos</mi><mi>y</mi><mo>+</mo><mi>cos</mi>' +
      '<mi>x</mi><mi>sin</mi><mi>y</mi></mrow></math>';
  var speech = 'sinus de, parenthèse gauche, x plus y, parenthèse droite, égale, sinus x cosinus y, plus, cosinus x sinus y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example Trig034
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrig034 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>cos</mi><mo stretchy="false">(</mo><mi>x' +
      '</mi><mo>+</mo><mi>y</mi><mo stretchy="false">)</mo><mo>=</mo>' +
      '<mi>cos</mi><mi>x</mi><mi>cos</mi><mi>y</mi><mo>−</mo><mi>sin</mi>' +
      '<mi>x</mi><mi>sin</mi><mi>y</mi></mrow></math>';
  var speech = 'cosinus de, parenthèse gauche, x plus y, parenthèse droite, égale, cosinus x cosinus y, moins, sinus x sinus y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example Trig035
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrig035 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>tan</mi><mo stretchy="false">(</mo><mi>x' +
      '</mi><mo>+</mo><mi>y</mi><mo stretchy="false">)</mo><mo>=</mo>' +
      '<mfrac><mrow><mi>tan</mi><mi>x</mi><mo>−</mo><mi>tan</mi><mi>y</mi>' +
      '</mrow><mrow><mn>1</mn><mo>−</mo><mi>tan</mi><mi>x</mi><mi>tan</mi>' +
      '<mi>y</mi></mrow></mfrac></mrow></math>';
  var speech = 'tangente de, parenthèse gauche, x plus y, parenthèse droite, égale, fraction avec numérateur tangente x moins tangente y, et dénominateur 1 moins, tangente x tangente y';
  this.executeRuleTest(mathml, speech, preference);
};


// TODO: (Simons) Handle degrees as a postfix function.
/**
 * Testing ClearspeakFrenchTrigometry Example Trig036
 */
sre.ClearspeakFrenchTrigometry.prototype.untestTrig036 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>sin</mi><mn>30</mn><mo>°</mo><mi>cos</mi>' +
      '<mn>15</mn><mo>°</mo><mo>+</mo><mi>cos</mi><mn>30</mn><mo>°</mo>' +
      '<mi>sin</mi><mn>15</mn><mo>°</mo></mrow></math>';
  var speech = 'XXXX';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example Trig037
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrig037 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>tan</mi><mrow><mo>(</mo><mrow><mfrac><mi>π' +
      '</mi><mn>6</mn></mfrac><mo>+</mo><mfrac><mrow><mn>2</mn><mi>π</mi>' +
      '</mrow><mn>3</mn></mfrac></mrow><mo>)</mo></mrow><mo>=</mo><mfrac>' +
      '<mrow><mi>tan</mi><mfrac><mi>π</mi><mn>6</mn></mfrac><mo>−</mo>' +
      '<mi>tan</mi><mfrac><mrow><mn>2</mn><mi>π</mi></mrow><mn>3</mn>' +
      '</mfrac></mrow><mrow><mn>1</mn><mo>−</mo><mi>tan</mi><mfrac><mi>π' +
      '</mi><mn>6</mn></mfrac><mi>tan</mi><mfrac><mrow><mn>2</mn><mi>π</mi>' +
      '</mrow><mn>3</mn></mfrac></mrow></mfrac></mrow></math>';
  var speech = 'tangente de, parenthèse gauche, pi sur 6, plus, 2 pi sur 3, parenthèse droite, égale, fraction avec numérateur, tangente de, pi sur 6, moins, tangente de, 2 pi sur 3, et dénominateur 1 moins, tangente de, pi sur 6, tangente de, 2 pi sur 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example Trig038
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrig038 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>tan</mi><mn>2</mn><mi>x</mi><mo>=</mo>' +
      '<mfrac><mrow><mn>2</mn><mi>tan</mi><mi>x</mi></mrow><mrow><mn>1</mn>' +
      '<mo>−</mo><msup><mrow><mi>tan</mi></mrow><mn>2</mn></msup><mi>x</mi>' +
      '</mrow></mfrac></mrow></math>';
  var speech = 'tangente 2 x, égale, fraction avec numérateur 2 tangente x, et dénominateur 1 moins, tangente au carré x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example Trig039
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrig039 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>cos</mi><mn>2</mn><mi>x</mi><mo>=</mo><mn>2' +
      '</mn><msup><mrow><mi>cos</mi></mrow><mn>2</mn></msup><mi>x</mi><mo>−' +
      '</mo><mn>1</mn></mrow></math>';
  var speech = 'cosinus 2 x, égale 2, cosinus au carré x, moins 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example Trig040
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrig040 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>sin</mi><mfrac><mi>x</mi><mn>2</mn></mfrac>' +
      '<mo>=</mo><mo>±</mo><msqrt><mrow><mfrac><mrow><mn>1</mn><mo>−</mo>' +
      '<mi>cos</mi><mi>x</mi></mrow><mn>2</mn></mfrac></mrow></msqrt>' +
      '</mrow></math>';
  var speech = 'sinus de, x sur 2, égale plus ou moins la racine carrée de, fraction avec numérateur 1 moins cosinus x, et dénominateur 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example Trig041
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrig041 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>tan</mi><mfrac><mi>x</mi><mn>2</mn></mfrac>' +
      '<mo>=</mo><mo>±</mo><msqrt><mrow><mfrac><mrow><mn>1</mn><mo>−</mo>' +
      '<mi>cos</mi><mi>x</mi></mrow><mrow><mn>1</mn><mo>+</mo><mi>cos</mi>' +
      '<mi>x</mi></mrow></mfrac></mrow></msqrt></mrow></math>';
  var speech = 'tangente de, x sur 2, égale plus ou moins la racine carrée de, fraction avec numérateur 1 moins cosinus x, et dénominateur 1 plus cosinus x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example Trig042
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrig042 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>cos</mi><mi>x</mi><mi>cos</mi><mi>y</mi>' +
      '<mo>=</mo><mn>2</mn><mi>cos</mi><mfrac><mrow><mi>x</mi><mo>+</mo>' +
      '<mi>y</mi></mrow><mn>2</mn></mfrac><mi>cos</mi><mfrac><mrow><mi>x' +
      '</mi><mo>−</mo><mi>y</mi></mrow><mn>2</mn></mfrac></mrow></math>';
  var speech = 'cosinus x cosinus y, égale 2, cosinus de, fraction avec numérateur x plus y, et dénominateur 2, cosinus de, fraction avec numérateur x moins y, et dénominateur 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example Trig043
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrig043 = function() {
  var preference = 'Trig_Auto:Roots_RootEnd';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><mo>−</mo>' +
      '<mfrac><mi>π</mi><mn>8</mn></mfrac></mrow><mo>)</mo></mrow><mo>=' +
      '</mo><mo>−</mo><mfrac><mn>1</mn><mn>2</mn></mfrac><msqrt><mrow><mn>2' +
      '</mn><mo>−</mo><msqrt><mn>2</mn></msqrt></mrow></msqrt></mrow></math>';
  var speech = 'sinus de, parenthèse gauche, négatif, pi sur 8, parenthèse droite, égale négatif un-demi la racine carrée de 2 moins la racine carrée de 2, fin racine, fin racine';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example Trig044
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrig044 = function() {
  var preference = 'Trig_Auto:Roots_RootEnd';
  var mathml = '<math><mrow><mi>tan</mi><mfrac><mrow><mn>3</mn><mi>π</mi>' +
      '</mrow><mn>8</mn></mfrac><mo>=</mo><mfrac><mrow><msqrt><mrow><msqrt>' +
      '<mn>2</mn></msqrt><mo>+</mo><mn>1</mn></mrow></msqrt></mrow><mrow>' +
      '<msqrt><mrow><msqrt><mn>2</mn></msqrt><mo>−</mo><mn>1</mn></mrow>' +
      '</msqrt></mrow></mfrac></mrow></math>';
  var speech = 'tangente de, 3 pi sur 8, égale, fraction avec numérateur la racine carrée de, la racine carrée de 2, fin racine, plus 1, fin racine, et dénominateur la racine carrée de, la racine carrée de 2, fin racine, moins 1, fin racine';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example Trig045
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrig045 = function() {
  var preference = 'Trig_Auto:Roots_RootEnd';
  var mathml = '<math><mrow><mi>tan</mi><mfrac><mi>π</mi><mrow><mn>12</mn>' +
      '</mrow></mfrac><mo>=</mo><mfrac><mn>1</mn><mn>2</mn></mfrac><msqrt>' +
      '<mrow><mn>2</mn><mo>−</mo><msqrt><mn>3</mn></msqrt></mrow></msqrt>' +
      '</mrow></math>';
  var speech = 'tangente de, pi sur 12, égale un-demi la racine carrée de 2 moins la racine carrée de 3, fin racine, fin racine';
  this.executeRuleTest(mathml, speech, preference);
};


//
// Table 2: Inverse Trigonometric Functions
//


/**
 * Testing ClearspeakFrenchTrigometry Example TrigInvAuto001
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrigInvAuto001 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'la reciproque de sinus x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example TrigInvAuto002
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrigInvAuto002 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>cos</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'la reciproque de cosinus x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example TrigInvAuto003
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrigInvAuto003 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'la reciproque de tangente x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example TrigInvAuto004
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrigInvAuto004 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>cot</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'la reciproque de cotangente x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example TrigInvAuto005
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrigInvAuto005 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>sec</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'la reciproque de sécante x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example TrigInvAuto006
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrigInvAuto006 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>csc</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'la reciproque de cosécante x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example TrigInvAuto007
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrigInvAuto007 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mfrac><mrow><msqrt><mn>2</mn></msqrt>' +
      '</mrow><mn>2</mn></mfrac></mrow></math>';
  var speech = 'la reciproque de sinus, fraction avec numérateur la racine carrée de 2, et dénominateur 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example TrigInvAuto008
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrigInvAuto008 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>cos</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow>' +
      '</math>';
  var speech = 'la reciproque de cosinus un-demi';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example TrigInvAuto009
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrigInvAuto009 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mn>17</mn></mrow></math>';
  var speech = 'la reciproque de tangente 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example TrigInvAuto010
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrigInvAuto010 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>cot</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mn>32</mn></mrow></math>';
  var speech = 'la reciproque de cotangente 32';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example TrigInvAuto011
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrigInvAuto011 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>sec</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mn>100</mn></mrow></math>';
  var speech = 'la reciproque de sécante 100';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example TrigInvAuto012
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrigInvAuto012 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>csc</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mn>85</mn></mrow></math>';
  var speech = 'la reciproque de cosécante 85';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example TrigInvAuto013
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrigInvAuto013 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mo>−</mo><mi>x</mi>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'la reciproque de sinus négatif x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example TrigInvAuto014
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrigInvAuto014 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>cos</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mo>−</mo><mi>x</mi>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'la reciproque de cosinus négatif x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example TrigInvAuto015
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrigInvAuto015 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mo>−</mo><mi>x</mi>' +
      '<mo>+</mo><mn>12</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'la reciproque de tangente, parenthèse gauche, négatif x plus 12, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example TrigInvAuto016
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrigInvAuto016 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>cot</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mo>−</mo><mi>x</mi>' +
      '<mo>−</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'la reciproque de cotangente, parenthèse gauche, négatif x moins 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example TrigInvAuto017
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrigInvAuto017 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>sin</mi><mn>0</mn>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'la reciproque de sinus sinus 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example TrigInvAuto018
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrigInvAuto018 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>csc</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>csc</mi><mi>x</mi>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'la reciproque de cosécante cosécante x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example TrigInvAuto019
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrigInvAuto019 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>cos</mi><mrow><mo>(</mo><mrow><msup><mrow>' +
      '<mi>cos</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow>' +
      '<mo>(</mo><mrow><mo>−</mo><mfrac><mrow><msqrt><mn>2</mn></msqrt>' +
      '</mrow><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'cosinus de, parenthèse gauche, la reciproque de cosinus, parenthèse gauche, négatif, fraction avec numérateur la racine carrée de 2, et dénominateur 2, parenthèse droite, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example TrigInvAuto020
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrigInvAuto020 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>cos</mi><mrow><mo>(</mo><mrow><mo>−</mo>' +
      '<msup><mrow><mi>cos</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow>' +
      '</msup><mrow><mo>(</mo><mrow><mfrac><mrow><msqrt><mn>2</mn></msqrt>' +
      '</mrow><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'cosinus de, parenthèse gauche, négatif, la reciproque de cosinus, parenthèse gauche, fraction avec numérateur la racine carrée de 2, et dénominateur 2, parenthèse droite, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example TrigInvAuto021
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrigInvAuto021 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>cos</mi><mfrac>' +
      '<mi>π</mi><mn>4</mn></mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'la reciproque de sinus, parenthèse gauche, cosinus de, pi sur 4, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example TrigInvAuto022
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrigInvAuto022 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><msup><mrow>' +
      '<mi>cos</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mfrac>' +
      '<mn>1</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'sinus, la reciproque de cosinus un-demi';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example TrigInvAuto023
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrigInvAuto023 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><msup><mrow>' +
      '<mi>tan</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mn>1' +
      '</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'sinus, la reciproque de tangente 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example TrigInvAuto024
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrigInvAuto024 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><mo>−</mo>' +
      '<msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow>' +
      '</msup><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'sinus de, parenthèse gauche, négatif, la reciproque de tangente 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example TrigInvAuto025
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrigInvAuto025 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><mo>−</mo>' +
      '<msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow>' +
      '</msup><mrow><mo>(</mo><mrow><mo>−</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'sinus de, parenthèse gauche, négatif, la reciproque de tangente négatif 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example TrigInvAuto026
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrigInvAuto026 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>sec</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>sec</mi><mi>x</mi>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'la reciproque de sécante sécante x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example TrigInverse001
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrigInverse001 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'sinus inverse de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example TrigInverse002
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrigInverse002 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>cos</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'cosinus inverse de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example TrigInverse003
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrigInverse003 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'tangente inverse de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example TrigInverse004
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrigInverse004 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>cot</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'cotangente inverse de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example TrigInverse005
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrigInverse005 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>sec</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'sécante inverse de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example TrigInverse006
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrigInverse006 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>csc</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'cosécante inverse de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example TrigInverse007
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrigInverse007 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mfrac><mrow><msqrt><mn>2</mn></msqrt>' +
      '</mrow><mn>2</mn></mfrac></mrow></math>';
  var speech = 'sinus inverse de, fraction avec numérateur la racine carrée de 2, et dénominateur 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example TrigInverse008
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrigInverse008 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>cos</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow>' +
      '</math>';
  var speech = 'cosinus inverse de un-demi';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example TrigInverse009
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrigInverse009 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mn>17</mn></mrow></math>';
  var speech = 'tangente inverse de 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example TrigInverse010
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrigInverse010 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>cot</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mn>32</mn></mrow></math>';
  var speech = 'cotangente inverse de 32';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example TrigInverse011
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrigInverse011 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>sec</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mn>100</mn></mrow></math>';
  var speech = 'sécante inverse de 100';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example TrigInverse012
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrigInverse012 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>csc</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mn>85</mn></mrow></math>';
  var speech = 'cosécante inverse de 85';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example TrigInverse013
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrigInverse013 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mo>−</mo><mi>x</mi>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'sinus inverse de négatif x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example TrigInverse014
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrigInverse014 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>cos</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mo>−</mo><mi>x</mi>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'cosinus inverse de négatif x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example TrigInverse015
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrigInverse015 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mo>−</mo><mi>x</mi>' +
      '<mo>+</mo><mn>12</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'tangente inverse de, parenthèse gauche, négatif x plus 12, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example TrigInverse016
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrigInverse016 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>cot</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mo>−</mo><mi>x</mi>' +
      '<mo>−</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'cotangente inverse de, parenthèse gauche, négatif x moins 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example TrigInverse017
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrigInverse017 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>sin</mi><mn>0</mn>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'sinus inverse de sinus 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example TrigInverse018
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrigInverse018 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>csc</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>csc</mi><mi>x</mi>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'cosécante inverse de cosécante x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example TrigInverse019
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrigInverse019 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><mi>cos</mi><mrow><mo>(</mo><mrow><msup><mrow>' +
      '<mi>cos</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow>' +
      '<mo>(</mo><mrow><mo>−</mo><mfrac><mrow><msqrt><mn>2</mn></msqrt>' +
      '</mrow><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'cosinus de, parenthèse gauche, cosinus inverse de, parenthèse gauche, négatif, fraction avec numérateur la racine carrée de 2, et dénominateur 2, parenthèse droite, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example TrigInverse020
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrigInverse020 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><mi>cos</mi><mrow><mo>(</mo><mrow><mo>−</mo>' +
      '<msup><mrow><mi>cos</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow>' +
      '</msup><mrow><mo>(</mo><mrow><mfrac><mrow><msqrt><mn>2</mn></msqrt>' +
      '</mrow><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'cosinus de, parenthèse gauche, négatif, cosinus inverse de, parenthèse gauche, fraction avec numérateur la racine carrée de 2, et dénominateur 2, parenthèse droite, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example TrigInverse021
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrigInverse021 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>cos</mi><mfrac>' +
      '<mi>π</mi><mn>4</mn></mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'sinus inverse de, parenthèse gauche, cosinus de, pi sur 4, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example TrigInverse022
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrigInverse022 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><msup><mrow>' +
      '<mi>cos</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mfrac>' +
      '<mn>1</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'sinus, cosinus inverse de un-demi';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example TrigInverse023
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrigInverse023 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><msup><mrow>' +
      '<mi>tan</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mn>1' +
      '</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'sinus, tangente inverse de 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example TrigInverse024
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrigInverse024 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><mo>−</mo>' +
      '<msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow>' +
      '</msup><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'sinus de, parenthèse gauche, négatif, tangente inverse de 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example TrigInverse025
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrigInverse025 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><mo>−</mo>' +
      '<msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow>' +
      '</msup><mrow><mo>(</mo><mrow><mo>−</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'sinus de, parenthèse gauche, négatif, tangente inverse de négatif 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example TrigInverse026
 */
sre.ClearspeakFrenchTrigometry.prototype.testTrigInverse026 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>sec</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>sec</mi><mi>x</mi>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'sécante inverse de sécante x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example ArcTrig001
 */
sre.ClearspeakFrenchTrigometry.prototype.testArcTrig001 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'arc sinus x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example ArcTrig002
 */
sre.ClearspeakFrenchTrigometry.prototype.testArcTrig002 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>cos</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'arc cosinus x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example ArcTrig003
 */
sre.ClearspeakFrenchTrigometry.prototype.testArcTrig003 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'arc tangente x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example ArcTrig004
 */
sre.ClearspeakFrenchTrigometry.prototype.testArcTrig004 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>cot</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'arc cotangente x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example ArcTrig005
 */
sre.ClearspeakFrenchTrigometry.prototype.testArcTrig005 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>sec</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'arc sécante x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example ArcTrig006
 */
sre.ClearspeakFrenchTrigometry.prototype.testArcTrig006 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>csc</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'arc cosécante x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example ArcTrig007
 */
sre.ClearspeakFrenchTrigometry.prototype.testArcTrig007 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mfrac><mrow><msqrt><mn>2</mn></msqrt>' +
      '</mrow><mn>2</mn></mfrac></mrow></math>';
  var speech = 'arc sinus de, fraction avec numérateur la racine carrée de 2, et dénominateur 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example ArcTrig008
 */
sre.ClearspeakFrenchTrigometry.prototype.testArcTrig008 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>cos</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow>' +
      '</math>';
  var speech = 'arc cosinus un-demi';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example ArcTrig009
 */
sre.ClearspeakFrenchTrigometry.prototype.testArcTrig009 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mn>17</mn></mrow></math>';
  var speech = 'arc tangente 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example ArcTrig010
 */
sre.ClearspeakFrenchTrigometry.prototype.testArcTrig010 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>cot</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mn>32</mn></mrow></math>';
  var speech = 'arc cotangente 32';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example ArcTrig011
 */
sre.ClearspeakFrenchTrigometry.prototype.testArcTrig011 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>sec</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mn>100</mn></mrow></math>';
  var speech = 'arc sécante 100';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example ArcTrig012
 */
sre.ClearspeakFrenchTrigometry.prototype.testArcTrig012 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>csc</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mn>85</mn></mrow></math>';
  var speech = 'arc cosécante 85';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example ArcTrig013
 */
sre.ClearspeakFrenchTrigometry.prototype.testArcTrig013 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mo>−</mo><mi>x</mi>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'arc sinus négatif x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example ArcTrig014
 */
sre.ClearspeakFrenchTrigometry.prototype.testArcTrig014 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>cos</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mo>−</mo><mi>x</mi>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'arc cosinus négatif x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example ArcTrig015
 */
sre.ClearspeakFrenchTrigometry.prototype.testArcTrig015 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mo>−</mo><mi>x</mi>' +
      '<mo>+</mo><mn>12</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'arc tangente de, parenthèse gauche, négatif x plus 12, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example ArcTrig016
 */
sre.ClearspeakFrenchTrigometry.prototype.testArcTrig016 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>cot</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mo>−</mo><mi>x</mi>' +
      '<mo>−</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'arc cotangente de, parenthèse gauche, négatif x moins 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example ArcTrig017
 */
sre.ClearspeakFrenchTrigometry.prototype.testArcTrig017 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>sin</mi><mn>0</mn>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'arc sinus, sinus 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example ArcTrig018
 */
sre.ClearspeakFrenchTrigometry.prototype.testArcTrig018 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>csc</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>csc</mi><mi>x</mi>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'arc cosécante, cosécante x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example ArcTrig019
 */
sre.ClearspeakFrenchTrigometry.prototype.testArcTrig019 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><mi>cos</mi><mrow><mo>(</mo><mrow><msup><mrow>' +
      '<mi>cos</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow>' +
      '<mo>(</mo><mrow><mo>−</mo><mfrac><mrow><msqrt><mn>2</mn></msqrt>' +
      '</mrow><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'cosinus de, parenthèse gauche, arc cosinus de, parenthèse gauche, négatif, fraction avec numérateur la racine carrée de 2, et dénominateur 2, parenthèse droite, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example ArcTrig020
 */
sre.ClearspeakFrenchTrigometry.prototype.testArcTrig020 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><mi>cos</mi><mrow><mo>(</mo><mrow><mo>−</mo>' +
      '<msup><mrow><mi>cos</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow>' +
      '</msup><mrow><mo>(</mo><mrow><mfrac><mrow><msqrt><mn>2</mn></msqrt>' +
      '</mrow><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'cosinus de, parenthèse gauche, négatif, arc cosinus de, parenthèse gauche, fraction avec numérateur la racine carrée de 2, et dénominateur 2, parenthèse droite, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example ArcTrig021
 */
sre.ClearspeakFrenchTrigometry.prototype.testArcTrig021 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>cos</mi><mfrac>' +
      '<mi>π</mi><mn>4</mn></mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'arc sinus de, parenthèse gauche, cosinus de, pi sur 4, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example ArcTrig022
 */
sre.ClearspeakFrenchTrigometry.prototype.testArcTrig022 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><msup><mrow>' +
      '<mi>cos</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mfrac>' +
      '<mn>1</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'sinus, arc cosinus un-demi';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example ArcTrig023
 */
sre.ClearspeakFrenchTrigometry.prototype.testArcTrig023 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><msup><mrow>' +
      '<mi>tan</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mn>1' +
      '</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'sinus, arc tangente 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example ArcTrig024
 */
sre.ClearspeakFrenchTrigometry.prototype.testArcTrig024 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><mo>−</mo>' +
      '<msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow>' +
      '</msup><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'sinus de, parenthèse gauche, négatif, arc tangente 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example ArcTrig025
 */
sre.ClearspeakFrenchTrigometry.prototype.testArcTrig025 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><mo>−</mo>' +
      '<msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow>' +
      '</msup><mrow><mo>(</mo><mrow><mo>−</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'sinus de, parenthèse gauche, négatif, arc tangente négatif 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example ArcTrig026
 */
sre.ClearspeakFrenchTrigometry.prototype.testArcTrig026 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>sec</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>sec</mi><mi>x</mi>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'arc sécante, sécante x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example AllTrig01
 */
sre.ClearspeakFrenchTrigometry.prototype.testAllTrig01 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>arcsin</mi><mi>x</mi></mrow></math>';
  var speech = 'arc sine x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example AllTrig02
 */
sre.ClearspeakFrenchTrigometry.prototype.testAllTrig02 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>arccos</mi><mi>x</mi></mrow></math>';
  var speech = 'arc cosine x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example AllTrig03
 */
sre.ClearspeakFrenchTrigometry.prototype.testAllTrig03 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>arctan</mi><mi>x</mi></mrow></math>';
  var speech = 'arc tangent x';
  this.executeRuleTest(mathml, speech, preference);
};


//
// Table 3: Hyperbolic Trigonometric Functions
//


/**
 * Testing ClearspeakFrenchTrigometry Example HypTrig001
 */
sre.ClearspeakFrenchTrigometry.prototype.testHypTrig001 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>sinh</mi><mi>x</mi></mrow></math>';
  var speech = 'sinus hyperbolique de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example HypTrig002
 */
sre.ClearspeakFrenchTrigometry.prototype.testHypTrig002 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>cosh</mi><mi>x</mi></mrow></math>';
  var speech = 'cosinus hyperbolique de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example HypTrig003
 */
sre.ClearspeakFrenchTrigometry.prototype.testHypTrig003 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>tanh</mi><mi>x</mi></mrow></math>';
  var speech = 'tangente hyperbolique de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example HypTrig004
 */
sre.ClearspeakFrenchTrigometry.prototype.testHypTrig004 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>coth</mi><mi>x</mi></mrow></math>';
  var speech = 'cotangente hyperbolique de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example HypTrig005
 */
sre.ClearspeakFrenchTrigometry.prototype.testHypTrig005 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>sech</mi><mi>x</mi></mrow></math>';
  var speech = 'sécante hyperbolique de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example HypTrig006
 */
sre.ClearspeakFrenchTrigometry.prototype.testHypTrig006 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>csch</mi><mi>x</mi></mrow></math>';
  var speech = 'cosécante hyperbolique de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example HypTrig007
 */
sre.ClearspeakFrenchTrigometry.prototype.testHypTrig007 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>sinh</mi></mrow><mrow><mo>−' +
      '</mo><mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'la reciproque de sinus hyperbolique x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example HypTrig008
 */
sre.ClearspeakFrenchTrigometry.prototype.testHypTrig008 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>cosh</mi></mrow><mrow><mo>−' +
      '</mo><mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'la reciproque de cosinus hyperbolique x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example HypTrig009
 */
sre.ClearspeakFrenchTrigometry.prototype.testHypTrig009 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>tanh</mi></mrow><mrow><mo>−' +
      '</mo><mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'la reciproque de tangente hyperbolique x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example HypTrig010
 */
sre.ClearspeakFrenchTrigometry.prototype.testHypTrig010 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>coth</mi></mrow><mrow><mo>−' +
      '</mo><mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'la reciproque de cotangente hyperbolique x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example HypTrig011
 */
sre.ClearspeakFrenchTrigometry.prototype.testHypTrig011 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>sech</mi></mrow><mrow><mo>−' +
      '</mo><mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'la reciproque de sécante hyperbolique x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example HypTrig012
 */
sre.ClearspeakFrenchTrigometry.prototype.testHypTrig012 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>csch</mi></mrow><mrow><mo>−' +
      '</mo><mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'la reciproque de cosécante hyperbolique x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example HypTrig013
 */
sre.ClearspeakFrenchTrigometry.prototype.testHypTrig013 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>sinh</mi><mrow><mo>(</mo><mrow><msup><mrow>' +
      '<mi>sinh</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mi>x' +
      '</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'sinus hyperbolique de, la reciproque de sinus hyperbolique x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example HypTrig014
 */
sre.ClearspeakFrenchTrigometry.prototype.testHypTrig014 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>cosh</mi><mrow><mo>(</mo><mrow><msup><mrow>' +
      '<mi>cosh</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mi>x' +
      '</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'cosinus hyperbolique de, la reciproque de cosinus hyperbolique x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example HypTrig015
 */
sre.ClearspeakFrenchTrigometry.prototype.testHypTrig015 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>tanh</mi><mrow><mo>(</mo><mrow><msup><mrow>' +
      '<mi>tanh</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mi>x' +
      '</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'tangente hyperbolique de, la reciproque de tangente hyperbolique x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example HypTrig016
 */
sre.ClearspeakFrenchTrigometry.prototype.testHypTrig016 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>coth</mi><mrow><mo>(</mo><mrow><msup><mrow>' +
      '<mi>coth</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mi>x' +
      '</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'cotangente hyperbolique de, la reciproque de cotangente hyperbolique x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example HypTrig017
 */
sre.ClearspeakFrenchTrigometry.prototype.testHypTrig017 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>sinh</mi></mrow><mrow><mo>−' +
      '</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>sinh</mi>' +
      '<mi>x</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'la reciproque de sinus hyperbolique, sinus hyperbolique de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example HypTrig018
 */
sre.ClearspeakFrenchTrigometry.prototype.testHypTrig018 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>cosh</mi></mrow><mrow><mo>−' +
      '</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>cosh</mi>' +
      '<mi>x</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'la reciproque de cosinus hyperbolique, cosinus hyperbolique de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example HypTrig019
 */
sre.ClearspeakFrenchTrigometry.prototype.testHypTrig019 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>tanh</mi></mrow><mrow><mo>−' +
      '</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>tanh</mi>' +
      '<mi>x</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'la reciproque de tangente hyperbolique, tangente hyperbolique de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchTrigometry Example HypTrig020
 */
sre.ClearspeakFrenchTrigometry.prototype.testHypTrig020 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>coth</mi></mrow><mrow><mo>−' +
      '</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>coth</mi>' +
      '<mi>x</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'la reciproque de cotangente hyperbolique, cotangente hyperbolique de x';
  this.executeRuleTest(mathml, speech, preference);
};

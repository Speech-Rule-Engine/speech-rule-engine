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


goog.provide('sre.ClearspeakGermanTrigometry');

goog.require('sre.ClearspeakGermanRuleTest');



/**
* @constructor
* @extends {sre.ClearspeakGermanRuleTest}
*/
sre.ClearspeakGermanTrigometry = function() {
  sre.ClearspeakGermanTrigometry.base(this, 'constructor');

  /**
* @override
  */
  this.information = 'ClearspeakGermanTrigometry rule tests.';

};
goog.inherits(sre.ClearspeakGermanTrigometry, sre.ClearspeakGermanRuleTest);



//
// Trigonometry
//


//
// Table 1: Basic Trigonometric Functions
//


/**
 * Testing ClearspeakGermanTrigometry Example Trig001
 */
sre.ClearspeakGermanTrigometry.prototype.testTrig001 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>sin</mi><mi>x</mi></mrow></math>';
  var speech = 'sinus x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example Trig002
 */
sre.ClearspeakGermanTrigometry.prototype.testTrig002 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>cos</mi><mi>x</mi></mrow></math>';
  var speech = 'cosinus x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example Trig003
 */
sre.ClearspeakGermanTrigometry.prototype.testTrig003 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>tan</mi><mi>θ</mi></mrow></math>';
  var speech = 'tangente thêta';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example Trig004
 */
sre.ClearspeakGermanTrigometry.prototype.testTrig004 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>sec</mi><mi>θ</mi></mrow></math>';
  var speech = 'sécante thêta';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example Trig005
 */
sre.ClearspeakGermanTrigometry.prototype.testTrig005 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>csc</mi><mi>x</mi></mrow></math>';
  var speech = 'cosécante x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example Trig006
 */
sre.ClearspeakGermanTrigometry.prototype.testTrig006 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>cot</mi><mi>x</mi></mrow></math>';
  var speech = 'cotangente x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example Trig007
 */
sre.ClearspeakGermanTrigometry.prototype.testTrig007 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mn>2</mn>' +
      '</msup><mi>x</mi></mrow></math>';
  var speech = 'sinus au carré x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example Trig008
 */
sre.ClearspeakGermanTrigometry.prototype.testTrig008 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>cos</mi></mrow><mn>3</mn>' +
      '</msup><mi>x</mi></mrow></math>';
  var speech = 'cosinus au cube x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example Trig009
 */
sre.ClearspeakGermanTrigometry.prototype.testTrig009 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>tan</mi></mrow><mn>2</mn>' +
      '</msup><mi>x</mi></mrow></math>';
  var speech = 'tangente au carré x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example Trig010
 */
sre.ClearspeakGermanTrigometry.prototype.testTrig010 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>sec</mi></mrow><mn>3</mn>' +
      '</msup><mi>x</mi></mrow></math>';
  var speech = 'sécante au cube x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example Trig011
 */
sre.ClearspeakGermanTrigometry.prototype.testTrig011 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>csc</mi></mrow><mn>2</mn>' +
      '</msup><mi>x</mi></mrow></math>';
  var speech = 'cosécante au carré x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example Trig012
 */
sre.ClearspeakGermanTrigometry.prototype.testTrig012 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>cot</mi></mrow><mn>2</mn>' +
      '</msup><mi>x</mi></mrow></math>';
  var speech = 'cotangente au carré x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example Trig013
 */
sre.ClearspeakGermanTrigometry.prototype.testTrig013 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>sin</mi><mn>2</mn><mi>π</mi></mrow></math>';
  var speech = 'sinus 2 pi';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example Trig014
 */
sre.ClearspeakGermanTrigometry.prototype.testTrig014 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><mi>π</mi>' +
      '<mi>k</mi><mo>+</mo><mfrac><mi>π</mi><mn>2</mn></mfrac></mrow><mo>)' +
      '</mo></mrow></mrow></math>';
  var speech = 'sinus de, parenthèse gauche, pi k, plus, pi sur 2, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example Trig015
 */
sre.ClearspeakGermanTrigometry.prototype.testTrig015 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>cos</mi><mfrac><mi>π</mi><mn>2</mn></mfrac>' +
      '</mrow></math>';
  var speech = 'cosinus de, pi sur 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example Trig016
 */
sre.ClearspeakGermanTrigometry.prototype.testTrig016 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>sin</mi><mfrac><mi>π</mi><mn>2</mn></mfrac>' +
      '</mrow></math>';
  var speech = 'sinus de, pi sur 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example Trig017
 */
sre.ClearspeakGermanTrigometry.prototype.testTrig017 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>sin</mi><mi>π</mi></mrow><mn>2' +
      '</mn></mfrac></mrow></math>';
  var speech = 'sinus pi sur 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example Trig018
 */
sre.ClearspeakGermanTrigometry.prototype.testTrig018 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mfrac><mn>2</mn><mrow><mi>sin</mi><mi>π</mi>' +
      '</mrow></mfrac></mrow></math>';
  var speech = '2 sur sinus pi';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example Trig019
 */
sre.ClearspeakGermanTrigometry.prototype.testTrig019 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>sin</mi><mfrac><mi>π</mi><mn>2' +
      '</mn></mfrac></mrow><mn>3</mn></mfrac></mrow></math>';
  var speech = 'fraction avec numérateur, sinus de, pi sur 2, et dénominateur 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example Trig020
 */
sre.ClearspeakGermanTrigometry.prototype.testTrig020 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>tan</mi><mrow><mo>(</mo><mrow><mo>−</mo>' +
      '<mi>π</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'tangente négatif pi';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example Trig021
 */
sre.ClearspeakGermanTrigometry.prototype.testTrig021 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><mi>x</mi>' +
      '<mo>+</mo><mi>π</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'sinus de, parenthèse gauche, x plus pi, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example Trig022
 */
sre.ClearspeakGermanTrigometry.prototype.testTrig022 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>cos</mi><mrow><mo>(</mo><mrow><mi>x</mi>' +
      '<mo>+</mo><mfrac><mi>π</mi><mn>2</mn></mfrac></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'cosinus de, parenthèse gauche, x plus, pi sur 2, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example Trig023
 */
sre.ClearspeakGermanTrigometry.prototype.testTrig023 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>cos</mi><mrow><mo>(</mo><mrow><mfrac><mi>π' +
      '</mi><mn>2</mn></mfrac><mo>+</mo><mi>x</mi></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'cosinus de, parenthèse gauche, pi sur 2, plus x, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example Trig024
 */
sre.ClearspeakGermanTrigometry.prototype.testTrig024 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mn>2</mn>' +
      '</msup><mi>x</mi><mo>+</mo><msup><mrow><mi>cos</mi></mrow><mn>2</mn>' +
      '</msup><mi>x</mi><mo>=</mo><mn>1</mn></mrow></math>';
  var speech = 'sinus au carré x, plus, cosinus au carré x, égale 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example Trig025
 */
sre.ClearspeakGermanTrigometry.prototype.testTrig025 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mn>4</mn>' +
      '</msup><mi>x</mi></mrow></math>';
  var speech = 'sinus à la puissance 4; x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example Trig026
 */
sre.ClearspeakGermanTrigometry.prototype.testTrig026 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>cos</mi></mrow><mn>5</mn>' +
      '</msup><mi>x</mi></mrow></math>';
  var speech = 'cosinus à la puissance 5; x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example Trig027
 */
sre.ClearspeakGermanTrigometry.prototype.testTrig027 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>tan</mi></mrow><mi>n</mi>' +
      '</msup><mi>x</mi></mrow></math>';
  var speech = 'tangente à la puissance n; x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example Trig028
 */
sre.ClearspeakGermanTrigometry.prototype.testTrig028 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>sin</mi><mi>x</mi></mrow>' +
      '<mrow><mi>cos</mi><mi>x</mi></mrow></mfrac></mrow></math>';
  var speech = 'sinus x sur cosinus x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example Trig029
 */
sre.ClearspeakGermanTrigometry.prototype.testTrig029 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>tan</mi><mn>35</mn><mo>°</mo></mrow></math>';
  var speech = 'tangente 35 degrés';
  this.executeRuleTest(mathml, speech, preference);
};


// TODO: (Simons) Handles degrees as a postfix function.
/**
 * Testing ClearspeakGermanTrigometry Example Trig030
 */
sre.ClearspeakGermanTrigometry.prototype.untestTrig030 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><mn>45</mn>' +
      '<mo>°</mo><mo>+</mo><mn>30</mn><mo>°</mo></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'XXXX';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example Trig031
 */
sre.ClearspeakGermanTrigometry.prototype.testTrig031 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>tan</mi><mrow><mo>(</mo><mrow><mo>∠</mo>' +
      '<mi>D</mi><mi>E</mi><mi>F</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'tangente de, parenthèse gauche, angle D E F, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example Trig032
 */
sre.ClearspeakGermanTrigometry.prototype.testTrig032 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>tan</mi><mrow><mo>(</mo><mrow><mo>∠</mo>' +
      '<mi>D</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'tangente de, parenthèse gauche, angle D, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example Trig033
 */
sre.ClearspeakGermanTrigometry.prototype.testTrig033 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>sin</mi><mo stretchy="false">(</mo><mi>x' +
      '</mi><mo>+</mo><mi>y</mi><mo stretchy="false">)</mo><mo>=</mo>' +
      '<mi>sin</mi><mi>x</mi><mi>cos</mi><mi>y</mi><mo>+</mo><mi>cos</mi>' +
      '<mi>x</mi><mi>sin</mi><mi>y</mi></mrow></math>';
  var speech = 'sinus de, parenthèse gauche, x plus y, parenthèse droite, égale, sinus x cosinus y, plus, cosinus x sinus y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example Trig034
 */
sre.ClearspeakGermanTrigometry.prototype.testTrig034 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>cos</mi><mo stretchy="false">(</mo><mi>x' +
      '</mi><mo>+</mo><mi>y</mi><mo stretchy="false">)</mo><mo>=</mo>' +
      '<mi>cos</mi><mi>x</mi><mi>cos</mi><mi>y</mi><mo>−</mo><mi>sin</mi>' +
      '<mi>x</mi><mi>sin</mi><mi>y</mi></mrow></math>';
  var speech = 'cosinus de, parenthèse gauche, x plus y, parenthèse droite, égale, cosinus x cosinus y, moins, sinus x sinus y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example Trig035
 */
sre.ClearspeakGermanTrigometry.prototype.testTrig035 = function() {
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
 * Testing ClearspeakGermanTrigometry Example Trig036
 */
sre.ClearspeakGermanTrigometry.prototype.untestTrig036 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>sin</mi><mn>30</mn><mo>°</mo><mi>cos</mi>' +
      '<mn>15</mn><mo>°</mo><mo>+</mo><mi>cos</mi><mn>30</mn><mo>°</mo>' +
      '<mi>sin</mi><mn>15</mn><mo>°</mo></mrow></math>';
  var speech = 'XXXX';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example Trig037
 */
sre.ClearspeakGermanTrigometry.prototype.testTrig037 = function() {
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
 * Testing ClearspeakGermanTrigometry Example Trig038
 */
sre.ClearspeakGermanTrigometry.prototype.testTrig038 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>tan</mi><mn>2</mn><mi>x</mi><mo>=</mo>' +
      '<mfrac><mrow><mn>2</mn><mi>tan</mi><mi>x</mi></mrow><mrow><mn>1</mn>' +
      '<mo>−</mo><msup><mrow><mi>tan</mi></mrow><mn>2</mn></msup><mi>x</mi>' +
      '</mrow></mfrac></mrow></math>';
  var speech = 'tangente 2 x, égale, fraction avec numérateur 2 tangente x, et dénominateur 1 moins, tangente au carré x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example Trig039
 */
sre.ClearspeakGermanTrigometry.prototype.testTrig039 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>cos</mi><mn>2</mn><mi>x</mi><mo>=</mo><mn>2' +
      '</mn><msup><mrow><mi>cos</mi></mrow><mn>2</mn></msup><mi>x</mi><mo>−' +
      '</mo><mn>1</mn></mrow></math>';
  var speech = 'cosinus 2 x, égale 2, cosinus au carré x, moins 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example Trig040
 */
sre.ClearspeakGermanTrigometry.prototype.testTrig040 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>sin</mi><mfrac><mi>x</mi><mn>2</mn></mfrac>' +
      '<mo>=</mo><mo>±</mo><msqrt><mrow><mfrac><mrow><mn>1</mn><mo>−</mo>' +
      '<mi>cos</mi><mi>x</mi></mrow><mn>2</mn></mfrac></mrow></msqrt>' +
      '</mrow></math>';
  var speech = 'sinus de, x sur 2, égale plus ou moins la racine carrée de, fraction avec numérateur 1 moins cosinus x, et dénominateur 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example Trig041
 */
sre.ClearspeakGermanTrigometry.prototype.testTrig041 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>tan</mi><mfrac><mi>x</mi><mn>2</mn></mfrac>' +
      '<mo>=</mo><mo>±</mo><msqrt><mrow><mfrac><mrow><mn>1</mn><mo>−</mo>' +
      '<mi>cos</mi><mi>x</mi></mrow><mrow><mn>1</mn><mo>+</mo><mi>cos</mi>' +
      '<mi>x</mi></mrow></mfrac></mrow></msqrt></mrow></math>';
  var speech = 'tangente de, x sur 2, égale plus ou moins la racine carrée de, fraction avec numérateur 1 moins cosinus x, et dénominateur 1 plus cosinus x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example Trig042
 */
sre.ClearspeakGermanTrigometry.prototype.testTrig042 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>cos</mi><mi>x</mi><mi>cos</mi><mi>y</mi>' +
      '<mo>=</mo><mn>2</mn><mi>cos</mi><mfrac><mrow><mi>x</mi><mo>+</mo>' +
      '<mi>y</mi></mrow><mn>2</mn></mfrac><mi>cos</mi><mfrac><mrow><mi>x' +
      '</mi><mo>−</mo><mi>y</mi></mrow><mn>2</mn></mfrac></mrow></math>';
  var speech = 'cosinus x cosinus y, égale 2, cosinus de, fraction avec numérateur x plus y, et dénominateur 2, cosinus de, fraction avec numérateur x moins y, et dénominateur 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example Trig043
 */
sre.ClearspeakGermanTrigometry.prototype.testTrig043 = function() {
  var preference = 'Trig_Auto:Roots_RootEnd';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><mo>−</mo>' +
      '<mfrac><mi>π</mi><mn>8</mn></mfrac></mrow><mo>)</mo></mrow><mo>=' +
      '</mo><mo>−</mo><mfrac><mn>1</mn><mn>2</mn></mfrac><msqrt><mrow><mn>2' +
      '</mn><mo>−</mo><msqrt><mn>2</mn></msqrt></mrow></msqrt></mrow></math>';
  var speech = 'sinus de, parenthèse gauche, négatif, pi sur 8, parenthèse droite, égale négatif un-demi la racine carrée de 2 moins la racine carrée de 2, fin racine, fin racine';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example Trig044
 */
sre.ClearspeakGermanTrigometry.prototype.testTrig044 = function() {
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
 * Testing ClearspeakGermanTrigometry Example Trig045
 */
sre.ClearspeakGermanTrigometry.prototype.testTrig045 = function() {
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
 * Testing ClearspeakGermanTrigometry Example TrigInvAuto001
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigInvAuto001 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'sinus inverse de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigInvAuto002
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigInvAuto002 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>cos</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'cosinus inverse de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigInvAuto003
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigInvAuto003 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'tangente inverse de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigInvAuto004
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigInvAuto004 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>cot</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'cotangente inverse de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigInvAuto005
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigInvAuto005 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>sec</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'sécante inverse de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigInvAuto006
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigInvAuto006 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>csc</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'cosécante inverse de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigInvAuto007
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigInvAuto007 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mfrac><mrow><msqrt><mn>2</mn></msqrt>' +
      '</mrow><mn>2</mn></mfrac></mrow></math>';
  var speech = 'sinus inverse de, fraction avec numérateur la racine carrée de 2, et dénominateur 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigInvAuto008
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigInvAuto008 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>cos</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow>' +
      '</math>';
  var speech = 'cosinus inverse de un-demi';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigInvAuto009
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigInvAuto009 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mn>17</mn></mrow></math>';
  var speech = 'tangente inverse de 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigInvAuto010
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigInvAuto010 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>cot</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mn>32</mn></mrow></math>';
  var speech = 'cotangente inverse de 32';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigInvAuto011
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigInvAuto011 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>sec</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mn>100</mn></mrow></math>';
  var speech = 'sécante inverse de 100';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigInvAuto012
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigInvAuto012 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>csc</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mn>85</mn></mrow></math>';
  var speech = 'cosécante inverse de 85';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigInvAuto013
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigInvAuto013 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mo>−</mo><mi>x</mi>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'sinus inverse de négatif x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigInvAuto014
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigInvAuto014 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>cos</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mo>−</mo><mi>x</mi>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'cosinus inverse de négatif x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigInvAuto015
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigInvAuto015 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mo>−</mo><mi>x</mi>' +
      '<mo>+</mo><mn>12</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'tangente inverse de, parenthèse gauche, négatif x plus 12, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigInvAuto016
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigInvAuto016 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>cot</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mo>−</mo><mi>x</mi>' +
      '<mo>−</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'cotangente inverse de, parenthèse gauche, négatif x moins 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigInvAuto017
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigInvAuto017 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>sin</mi><mn>0</mn>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'sinus inverse de sinus 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigInvAuto018
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigInvAuto018 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>csc</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>csc</mi><mi>x</mi>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'cosécante inverse de cosécante x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigInvAuto019
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigInvAuto019 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>cos</mi><mrow><mo>(</mo><mrow><msup><mrow>' +
      '<mi>cos</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow>' +
      '<mo>(</mo><mrow><mo>−</mo><mfrac><mrow><msqrt><mn>2</mn></msqrt>' +
      '</mrow><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'cosinus de, parenthèse gauche, cosinus inverse de, parenthèse gauche, négatif, fraction avec numérateur la racine carrée de 2, et dénominateur 2, parenthèse droite, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigInvAuto020
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigInvAuto020 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>cos</mi><mrow><mo>(</mo><mrow><mo>−</mo>' +
      '<msup><mrow><mi>cos</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow>' +
      '</msup><mrow><mo>(</mo><mrow><mfrac><mrow><msqrt><mn>2</mn></msqrt>' +
      '</mrow><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'cosinus de, parenthèse gauche, négatif, cosinus inverse de, parenthèse gauche, fraction avec numérateur la racine carrée de 2, et dénominateur 2, parenthèse droite, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigInvAuto021
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigInvAuto021 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>cos</mi><mfrac>' +
      '<mi>π</mi><mn>4</mn></mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'sinus inverse de, parenthèse gauche, cosinus de, pi sur 4, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigInvAuto022
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigInvAuto022 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><msup><mrow>' +
      '<mi>cos</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mfrac>' +
      '<mn>1</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'sinus, cosinus inverse de un-demi';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigInvAuto023
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigInvAuto023 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><msup><mrow>' +
      '<mi>tan</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mn>1' +
      '</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'sinus, tangente inverse de 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigInvAuto024
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigInvAuto024 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><mo>−</mo>' +
      '<msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow>' +
      '</msup><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'sinus de, parenthèse gauche, négatif, tangente inverse de 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigInvAuto025
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigInvAuto025 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><mo>−</mo>' +
      '<msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow>' +
      '</msup><mrow><mo>(</mo><mrow><mo>−</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'sinus de, parenthèse gauche, négatif, tangente inverse de négatif 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigInvAuto026
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigInvAuto026 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>sec</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>sec</mi><mi>x</mi>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'sécante inverse de sécante x';
  this.executeRuleTest(mathml, speech, preference);
};


// New: Reciprocal
/**
 * Testing ClearspeakGermanTrigometry Example TrigReciprocal001
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigReciprocal001 = function() {
  var preference = 'Trig_Reciprocal';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'la reciproque de sinus x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigReciprocal002
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigReciprocal002 = function() {
  var preference = 'Trig_Reciprocal';
  var mathml = '<math><mrow><msup><mrow><mi>cos</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'la reciproque de cosinus x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigReciprocal003
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigReciprocal003 = function() {
  var preference = 'Trig_Reciprocal';
  var mathml = '<math><mrow><msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'la reciproque de tangente x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigReciprocal004
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigReciprocal004 = function() {
  var preference = 'Trig_Reciprocal';
  var mathml = '<math><mrow><msup><mrow><mi>cot</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'la reciproque de cotangente x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigReciprocal005
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigReciprocal005 = function() {
  var preference = 'Trig_Reciprocal';
  var mathml = '<math><mrow><msup><mrow><mi>sec</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'la reciproque de sécante x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigReciprocal006
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigReciprocal006 = function() {
  var preference = 'Trig_Reciprocal';
  var mathml = '<math><mrow><msup><mrow><mi>csc</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'la reciproque de cosécante x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigReciprocal007
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigReciprocal007 = function() {
  var preference = 'Trig_Reciprocal';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mfrac><mrow><msqrt><mn>2</mn></msqrt>' +
      '</mrow><mn>2</mn></mfrac></mrow></math>';
  var speech = 'la reciproque de sinus, fraction avec numérateur la racine carrée de 2, et dénominateur 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigReciprocal008
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigReciprocal008 = function() {
  var preference = 'Trig_Reciprocal';
  var mathml = '<math><mrow><msup><mrow><mi>cos</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow>' +
      '</math>';
  var speech = 'la reciproque de cosinus un-demi';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigReciprocal009
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigReciprocal009 = function() {
  var preference = 'Trig_Reciprocal';
  var mathml = '<math><mrow><msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mn>17</mn></mrow></math>';
  var speech = 'la reciproque de tangente 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigReciprocal010
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigReciprocal010 = function() {
  var preference = 'Trig_Reciprocal';
  var mathml = '<math><mrow><msup><mrow><mi>cot</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mn>32</mn></mrow></math>';
  var speech = 'la reciproque de cotangente 32';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigReciprocal011
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigReciprocal011 = function() {
  var preference = 'Trig_Reciprocal';
  var mathml = '<math><mrow><msup><mrow><mi>sec</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mn>100</mn></mrow></math>';
  var speech = 'la reciproque de sécante 100';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigReciprocal012
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigReciprocal012 = function() {
  var preference = 'Trig_Reciprocal';
  var mathml = '<math><mrow><msup><mrow><mi>csc</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mn>85</mn></mrow></math>';
  var speech = 'la reciproque de cosécante 85';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigReciprocal013
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigReciprocal013 = function() {
  var preference = 'Trig_Reciprocal';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mo>−</mo><mi>x</mi>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'la reciproque de sinus, négatif x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigReciprocal014
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigReciprocal014 = function() {
  var preference = 'Trig_Reciprocal';
  var mathml = '<math><mrow><msup><mrow><mi>cos</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mo>−</mo><mi>x</mi>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'la reciproque de cosinus, négatif x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigReciprocal015
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigReciprocal015 = function() {
  var preference = 'Trig_Reciprocal';
  var mathml = '<math><mrow><msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mo>−</mo><mi>x</mi>' +
      '<mo>+</mo><mn>12</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'la reciproque de tangente, parenthèse gauche, négatif x plus 12, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigReciprocal016
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigReciprocal016 = function() {
  var preference = 'Trig_Reciprocal';
  var mathml = '<math><mrow><msup><mrow><mi>cot</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mo>−</mo><mi>x</mi>' +
      '<mo>−</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'la reciproque de cotangente, parenthèse gauche, négatif x moins 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigReciprocal017
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigReciprocal017 = function() {
  var preference = 'Trig_Reciprocal';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>sin</mi><mn>0</mn>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'la reciproque de sinus, sinus 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigReciprocal018
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigReciprocal018 = function() {
  var preference = 'Trig_Reciprocal';
  var mathml = '<math><mrow><msup><mrow><mi>csc</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>csc</mi><mi>x</mi>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'la reciproque de cosécante, cosécante x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigReciprocal019
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigReciprocal019 = function() {
  var preference = 'Trig_Reciprocal';
  var mathml = '<math><mrow><mi>cos</mi><mrow><mo>(</mo><mrow><msup><mrow>' +
      '<mi>cos</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mrow>' +
      '<mo>(</mo><mrow><mo>−</mo><mfrac><mrow><msqrt><mn>2</mn></msqrt>' +
      '</mrow><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'cosinus de, parenthèse gauche, la reciproque de cosinus, parenthèse gauche, négatif, fraction avec numérateur la racine carrée de 2, et dénominateur 2, parenthèse droite, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigReciprocal020
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigReciprocal020 = function() {
  var preference = 'Trig_Reciprocal';
  var mathml = '<math><mrow><mi>cos</mi><mrow><mo>(</mo><mrow><mo>−</mo>' +
      '<msup><mrow><mi>cos</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow>' +
      '</msup><mrow><mo>(</mo><mrow><mfrac><mrow><msqrt><mn>2</mn></msqrt>' +
      '</mrow><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'cosinus de, parenthèse gauche, négatif, la reciproque de cosinus, parenthèse gauche, fraction avec numérateur la racine carrée de 2, et dénominateur 2, parenthèse droite, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigReciprocal021
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigReciprocal021 = function() {
  var preference = 'Trig_Reciprocal';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>cos</mi><mfrac>' +
      '<mi>π</mi><mn>4</mn></mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'la reciproque de sinus, parenthèse gauche, cosinus de, pi sur 4, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigReciprocal022
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigReciprocal022 = function() {
  var preference = 'Trig_Reciprocal';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><msup><mrow>' +
      '<mi>cos</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mfrac>' +
      '<mn>1</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'sinus, la reciproque de cosinus un-demi';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigReciprocal023
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigReciprocal023 = function() {
  var preference = 'Trig_Reciprocal';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><msup><mrow>' +
      '<mi>tan</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mn>1' +
      '</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'sinus, la reciproque de tangente 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigReciprocal024
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigReciprocal024 = function() {
  var preference = 'Trig_Reciprocal';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><mo>−</mo>' +
      '<msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow>' +
      '</msup><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'sinus de, parenthèse gauche, négatif, la reciproque de tangente 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigReciprocal025
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigReciprocal025 = function() {
  var preference = 'Trig_Reciprocal';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><mo>−</mo>' +
      '<msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow>' +
      '</msup><mrow><mo>(</mo><mrow><mo>−</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'sinus de, parenthèse gauche, négatif, la reciproque de tangente, négatif 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigReciprocal026
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigReciprocal026 = function() {
  var preference = 'Trig_Reciprocal';
  var mathml = '<math><mrow><msup><mrow><mi>sec</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>sec</mi><mi>x</mi>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'la reciproque de sécante, sécante x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigInverse001
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigInverse001 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'sinus inverse de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigInverse002
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigInverse002 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>cos</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'cosinus inverse de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigInverse003
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigInverse003 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'tangente inverse de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigInverse004
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigInverse004 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>cot</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'cotangente inverse de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigInverse005
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigInverse005 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>sec</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'sécante inverse de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigInverse006
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigInverse006 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>csc</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'cosécante inverse de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigInverse007
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigInverse007 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mfrac><mrow><msqrt><mn>2</mn></msqrt>' +
      '</mrow><mn>2</mn></mfrac></mrow></math>';
  var speech = 'sinus inverse de, fraction avec numérateur la racine carrée de 2, et dénominateur 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigInverse008
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigInverse008 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>cos</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow>' +
      '</math>';
  var speech = 'cosinus inverse de un-demi';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigInverse009
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigInverse009 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mn>17</mn></mrow></math>';
  var speech = 'tangente inverse de 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigInverse010
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigInverse010 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>cot</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mn>32</mn></mrow></math>';
  var speech = 'cotangente inverse de 32';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigInverse011
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigInverse011 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>sec</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mn>100</mn></mrow></math>';
  var speech = 'sécante inverse de 100';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigInverse012
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigInverse012 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>csc</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mn>85</mn></mrow></math>';
  var speech = 'cosécante inverse de 85';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigInverse013
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigInverse013 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mo>−</mo><mi>x</mi>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'sinus inverse de négatif x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigInverse014
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigInverse014 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>cos</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mo>−</mo><mi>x</mi>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'cosinus inverse de négatif x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigInverse015
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigInverse015 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mo>−</mo><mi>x</mi>' +
      '<mo>+</mo><mn>12</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'tangente inverse de, parenthèse gauche, négatif x plus 12, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigInverse016
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigInverse016 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>cot</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mo>−</mo><mi>x</mi>' +
      '<mo>−</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'cotangente inverse de, parenthèse gauche, négatif x moins 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigInverse017
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigInverse017 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>sin</mi><mn>0</mn>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'sinus inverse de sinus 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigInverse018
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigInverse018 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>csc</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>csc</mi><mi>x</mi>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'cosécante inverse de cosécante x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigInverse019
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigInverse019 = function() {
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
 * Testing ClearspeakGermanTrigometry Example TrigInverse020
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigInverse020 = function() {
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
 * Testing ClearspeakGermanTrigometry Example TrigInverse021
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigInverse021 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>cos</mi><mfrac>' +
      '<mi>π</mi><mn>4</mn></mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'sinus inverse de, parenthèse gauche, cosinus de, pi sur 4, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigInverse022
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigInverse022 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><msup><mrow>' +
      '<mi>cos</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mfrac>' +
      '<mn>1</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'sinus, cosinus inverse de un-demi';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigInverse023
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigInverse023 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><msup><mrow>' +
      '<mi>tan</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mn>1' +
      '</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'sinus, tangente inverse de 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigInverse024
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigInverse024 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><mo>−</mo>' +
      '<msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow>' +
      '</msup><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'sinus de, parenthèse gauche, négatif, tangente inverse de 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigInverse025
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigInverse025 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><mo>−</mo>' +
      '<msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow>' +
      '</msup><mrow><mo>(</mo><mrow><mo>−</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'sinus de, parenthèse gauche, négatif, tangente inverse de négatif 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigInverse026
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigInverse026 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>sec</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>sec</mi><mi>x</mi>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'sécante inverse de sécante x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example ArcTrig001
 */
sre.ClearspeakGermanTrigometry.prototype.testArcTrig001 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'arc sinus x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example ArcTrig002
 */
sre.ClearspeakGermanTrigometry.prototype.testArcTrig002 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>cos</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'arc cosinus x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example ArcTrig003
 */
sre.ClearspeakGermanTrigometry.prototype.testArcTrig003 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'arc tangente x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example ArcTrig004
 */
sre.ClearspeakGermanTrigometry.prototype.testArcTrig004 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>cot</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'arc cotangente x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example ArcTrig005
 */
sre.ClearspeakGermanTrigometry.prototype.testArcTrig005 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>sec</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'arc sécante x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example ArcTrig006
 */
sre.ClearspeakGermanTrigometry.prototype.testArcTrig006 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>csc</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'arc cosécante x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example ArcTrig007
 */
sre.ClearspeakGermanTrigometry.prototype.testArcTrig007 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mfrac><mrow><msqrt><mn>2</mn></msqrt>' +
      '</mrow><mn>2</mn></mfrac></mrow></math>';
  var speech = 'arc sinus de, fraction avec numérateur la racine carrée de 2, et dénominateur 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example ArcTrig008
 */
sre.ClearspeakGermanTrigometry.prototype.testArcTrig008 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>cos</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow>' +
      '</math>';
  var speech = 'arc cosinus un-demi';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example ArcTrig009
 */
sre.ClearspeakGermanTrigometry.prototype.testArcTrig009 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mn>17</mn></mrow></math>';
  var speech = 'arc tangente 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example ArcTrig010
 */
sre.ClearspeakGermanTrigometry.prototype.testArcTrig010 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>cot</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mn>32</mn></mrow></math>';
  var speech = 'arc cotangente 32';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example ArcTrig011
 */
sre.ClearspeakGermanTrigometry.prototype.testArcTrig011 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>sec</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mn>100</mn></mrow></math>';
  var speech = 'arc sécante 100';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example ArcTrig012
 */
sre.ClearspeakGermanTrigometry.prototype.testArcTrig012 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>csc</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mn>85</mn></mrow></math>';
  var speech = 'arc cosécante 85';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example ArcTrig013
 */
sre.ClearspeakGermanTrigometry.prototype.testArcTrig013 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mo>−</mo><mi>x</mi>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'arc sinus négatif x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example ArcTrig014
 */
sre.ClearspeakGermanTrigometry.prototype.testArcTrig014 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>cos</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mo>−</mo><mi>x</mi>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'arc cosinus négatif x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example ArcTrig015
 */
sre.ClearspeakGermanTrigometry.prototype.testArcTrig015 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mo>−</mo><mi>x</mi>' +
      '<mo>+</mo><mn>12</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'arc tangente de, parenthèse gauche, négatif x plus 12, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example ArcTrig016
 */
sre.ClearspeakGermanTrigometry.prototype.testArcTrig016 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>cot</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mo>−</mo><mi>x</mi>' +
      '<mo>−</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'arc cotangente de, parenthèse gauche, négatif x moins 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example ArcTrig017
 */
sre.ClearspeakGermanTrigometry.prototype.testArcTrig017 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>sin</mi><mn>0</mn>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'arc sinus, sinus 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example ArcTrig018
 */
sre.ClearspeakGermanTrigometry.prototype.testArcTrig018 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>csc</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>csc</mi><mi>x</mi>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'arc cosécante, cosécante x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example ArcTrig019
 */
sre.ClearspeakGermanTrigometry.prototype.testArcTrig019 = function() {
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
 * Testing ClearspeakGermanTrigometry Example ArcTrig020
 */
sre.ClearspeakGermanTrigometry.prototype.testArcTrig020 = function() {
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
 * Testing ClearspeakGermanTrigometry Example ArcTrig021
 */
sre.ClearspeakGermanTrigometry.prototype.testArcTrig021 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>cos</mi><mfrac>' +
      '<mi>π</mi><mn>4</mn></mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'arc sinus de, parenthèse gauche, cosinus de, pi sur 4, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example ArcTrig022
 */
sre.ClearspeakGermanTrigometry.prototype.testArcTrig022 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><msup><mrow>' +
      '<mi>cos</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mfrac>' +
      '<mn>1</mn><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'sinus, arc cosinus un-demi';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example ArcTrig023
 */
sre.ClearspeakGermanTrigometry.prototype.testArcTrig023 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><msup><mrow>' +
      '<mi>tan</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mn>1' +
      '</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'sinus, arc tangente 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example ArcTrig024
 */
sre.ClearspeakGermanTrigometry.prototype.testArcTrig024 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><mo>−</mo>' +
      '<msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow>' +
      '</msup><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'sinus de, parenthèse gauche, négatif, arc tangente 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example ArcTrig025
 */
sre.ClearspeakGermanTrigometry.prototype.testArcTrig025 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><mo>−</mo>' +
      '<msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow>' +
      '</msup><mrow><mo>(</mo><mrow><mo>−</mo><mn>1</mn></mrow><mo>)</mo>' +
      '</mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'sinus de, parenthèse gauche, négatif, arc tangente négatif 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example ArcTrig026
 */
sre.ClearspeakGermanTrigometry.prototype.testArcTrig026 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>sec</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>sec</mi><mi>x</mi>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'arc sécante, sécante x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example AllTrig01
 */
sre.ClearspeakGermanTrigometry.prototype.testAllTrig01 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>arcsin</mi><mi>x</mi></mrow></math>';
  var speech = 'arc sine x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example AllTrig02
 */
sre.ClearspeakGermanTrigometry.prototype.testAllTrig02 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>arccos</mi><mi>x</mi></mrow></math>';
  var speech = 'arc cosine x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example AllTrig03
 */
sre.ClearspeakGermanTrigometry.prototype.testAllTrig03 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>arctan</mi><mi>x</mi></mrow></math>';
  var speech = 'arc tangent x';
  this.executeRuleTest(mathml, speech, preference);
};


//
// Table 3: Hyperbolic Trigonometric Functions
//


/**
 * Testing ClearspeakGermanTrigometry Example HypTrig001
 */
sre.ClearspeakGermanTrigometry.prototype.testHypTrig001 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>sinh</mi><mi>x</mi></mrow></math>';
  var speech = 'sinus hyperbolique de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example HypTrig002
 */
sre.ClearspeakGermanTrigometry.prototype.testHypTrig002 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>cosh</mi><mi>x</mi></mrow></math>';
  var speech = 'cosinus hyperbolique de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example HypTrig003
 */
sre.ClearspeakGermanTrigometry.prototype.testHypTrig003 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>tanh</mi><mi>x</mi></mrow></math>';
  var speech = 'tangente hyperbolique de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example HypTrig004
 */
sre.ClearspeakGermanTrigometry.prototype.testHypTrig004 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>coth</mi><mi>x</mi></mrow></math>';
  var speech = 'cotangente hyperbolique de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example HypTrig005
 */
sre.ClearspeakGermanTrigometry.prototype.testHypTrig005 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>sech</mi><mi>x</mi></mrow></math>';
  var speech = 'sécante hyperbolique de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example HypTrig006
 */
sre.ClearspeakGermanTrigometry.prototype.testHypTrig006 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>csch</mi><mi>x</mi></mrow></math>';
  var speech = 'cosécante hyperbolique de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example HypTrig007
 */
sre.ClearspeakGermanTrigometry.prototype.testHypTrig007 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>sinh</mi></mrow><mrow><mo>−' +
      '</mo><mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'sinus hyperbolique inverse de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example HypTrig008
 */
sre.ClearspeakGermanTrigometry.prototype.testHypTrig008 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>cosh</mi></mrow><mrow><mo>−' +
      '</mo><mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'cosinus hyperbolique inverse de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example HypTrig009
 */
sre.ClearspeakGermanTrigometry.prototype.testHypTrig009 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>tanh</mi></mrow><mrow><mo>−' +
      '</mo><mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'tangente hyperbolique inverse de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example HypTrig010
 */
sre.ClearspeakGermanTrigometry.prototype.testHypTrig010 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>coth</mi></mrow><mrow><mo>−' +
      '</mo><mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'cotangente hyperbolique inverse de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example HypTrig011
 */
sre.ClearspeakGermanTrigometry.prototype.testHypTrig011 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>sech</mi></mrow><mrow><mo>−' +
      '</mo><mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'sécante hyperbolique inverse de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example HypTrig012
 */
sre.ClearspeakGermanTrigometry.prototype.testHypTrig012 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>csch</mi></mrow><mrow><mo>−' +
      '</mo><mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'cosécante hyperbolique inverse de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example HypTrig013
 */
sre.ClearspeakGermanTrigometry.prototype.testHypTrig013 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>sinh</mi><mrow><mo>(</mo><mrow><msup><mrow>' +
      '<mi>sinh</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mi>x' +
      '</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'sinus hyperbolique de, sinus hyperbolique inverse de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example HypTrig014
 */
sre.ClearspeakGermanTrigometry.prototype.testHypTrig014 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>cosh</mi><mrow><mo>(</mo><mrow><msup><mrow>' +
      '<mi>cosh</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mi>x' +
      '</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'cosinus hyperbolique de, cosinus hyperbolique inverse de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example HypTrig015
 */
sre.ClearspeakGermanTrigometry.prototype.testHypTrig015 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>tanh</mi><mrow><mo>(</mo><mrow><msup><mrow>' +
      '<mi>tanh</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mi>x' +
      '</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'tangente hyperbolique de, tangente hyperbolique inverse de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example HypTrig016
 */
sre.ClearspeakGermanTrigometry.prototype.testHypTrig016 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>coth</mi><mrow><mo>(</mo><mrow><msup><mrow>' +
      '<mi>coth</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mi>x' +
      '</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'cotangente hyperbolique de, cotangente hyperbolique inverse de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example HypTrig017
 */
sre.ClearspeakGermanTrigometry.prototype.testHypTrig017 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>sinh</mi></mrow><mrow><mo>−' +
      '</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>sinh</mi>' +
      '<mi>x</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'sinus hyperbolique inverse de, sinus hyperbolique de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example HypTrig018
 */
sre.ClearspeakGermanTrigometry.prototype.testHypTrig018 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>cosh</mi></mrow><mrow><mo>−' +
      '</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>cosh</mi>' +
      '<mi>x</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'cosinus hyperbolique inverse de, cosinus hyperbolique de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example HypTrig019
 */
sre.ClearspeakGermanTrigometry.prototype.testHypTrig019 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>tanh</mi></mrow><mrow><mo>−' +
      '</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>tanh</mi>' +
      '<mi>x</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'tangente hyperbolique inverse de, tangente hyperbolique de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example HypTrig020
 */
sre.ClearspeakGermanTrigometry.prototype.testHypTrig020 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>coth</mi></mrow><mrow><mo>−' +
      '</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>coth</mi>' +
      '<mi>x</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'cotangente hyperbolique inverse de, cotangente hyperbolique de x';
  this.executeRuleTest(mathml, speech, preference);
};


// Reciprocal
/**
 * Testing ClearspeakGermanTrigometry Example HypTrigReciprocal001
 */
sre.ClearspeakGermanTrigometry.prototype.testHypTrigReciprocal001 = function() {
  var preference = 'Trig_Reciprocal';
  var mathml = '<math><mrow><mi>sinh</mi><mi>x</mi></mrow></math>';
  var speech = 'sinus hyperbolique de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example HypTrigReciprocal002
 */
sre.ClearspeakGermanTrigometry.prototype.testHypTrigReciprocal002 = function() {
  var preference = 'Trig_Reciprocal';
  var mathml = '<math><mrow><mi>cosh</mi><mi>x</mi></mrow></math>';
  var speech = 'cosinus hyperbolique de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example HypTrigReciprocal003
 */
sre.ClearspeakGermanTrigometry.prototype.testHypTrigReciprocal003 = function() {
  var preference = 'Trig_Reciprocal';
  var mathml = '<math><mrow><mi>tanh</mi><mi>x</mi></mrow></math>';
  var speech = 'tangente hyperbolique de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example HypTrigReciprocal004
 */
sre.ClearspeakGermanTrigometry.prototype.testHypTrigReciprocal004 = function() {
  var preference = 'Trig_Reciprocal';
  var mathml = '<math><mrow><mi>coth</mi><mi>x</mi></mrow></math>';
  var speech = 'cotangente hyperbolique de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example HypTrigReciprocal005
 */
sre.ClearspeakGermanTrigometry.prototype.testHypTrigReciprocal005 = function() {
  var preference = 'Trig_Reciprocal';
  var mathml = '<math><mrow><mi>sech</mi><mi>x</mi></mrow></math>';
  var speech = 'sécante hyperbolique de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example HypTrigReciprocal006
 */
sre.ClearspeakGermanTrigometry.prototype.testHypTrigReciprocal006 = function() {
  var preference = 'Trig_Reciprocal';
  var mathml = '<math><mrow><mi>csch</mi><mi>x</mi></mrow></math>';
  var speech = 'cosécante hyperbolique de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example HypTrigReciprocal007
 */
sre.ClearspeakGermanTrigometry.prototype.testHypTrigReciprocal007 = function() {
  var preference = 'Trig_Reciprocal';
  var mathml = '<math><mrow><msup><mrow><mi>sinh</mi></mrow><mrow><mo>−' +
      '</mo><mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'la reciproque de sinus hyperbolique x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example HypTrigReciprocal008
 */
sre.ClearspeakGermanTrigometry.prototype.testHypTrigReciprocal008 = function() {
  var preference = 'Trig_Reciprocal';
  var mathml = '<math><mrow><msup><mrow><mi>cosh</mi></mrow><mrow><mo>−' +
      '</mo><mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'la reciproque de cosinus hyperbolique x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example HypTrigReciprocal009
 */
sre.ClearspeakGermanTrigometry.prototype.testHypTrigReciprocal009 = function() {
  var preference = 'Trig_Reciprocal';
  var mathml = '<math><mrow><msup><mrow><mi>tanh</mi></mrow><mrow><mo>−' +
      '</mo><mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'la reciproque de tangente hyperbolique x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example HypTrigReciprocal010
 */
sre.ClearspeakGermanTrigometry.prototype.testHypTrigReciprocal010 = function() {
  var preference = 'Trig_Reciprocal';
  var mathml = '<math><mrow><msup><mrow><mi>coth</mi></mrow><mrow><mo>−' +
      '</mo><mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'la reciproque de cotangente hyperbolique x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example HypTrigReciprocal011
 */
sre.ClearspeakGermanTrigometry.prototype.testHypTrigReciprocal011 = function() {
  var preference = 'Trig_Reciprocal';
  var mathml = '<math><mrow><msup><mrow><mi>sech</mi></mrow><mrow><mo>−' +
      '</mo><mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'la reciproque de sécante hyperbolique x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example HypTrigReciprocal012
 */
sre.ClearspeakGermanTrigometry.prototype.testHypTrigReciprocal012 = function() {
  var preference = 'Trig_Reciprocal';
  var mathml = '<math><mrow><msup><mrow><mi>csch</mi></mrow><mrow><mo>−' +
      '</mo><mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'la reciproque de cosécante hyperbolique x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example HypTrigReciprocal013
 */
sre.ClearspeakGermanTrigometry.prototype.testHypTrigReciprocal013 = function() {
  var preference = 'Trig_Reciprocal';
  var mathml = '<math><mrow><mi>sinh</mi><mrow><mo>(</mo><mrow><msup><mrow>' +
      '<mi>sinh</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mi>x' +
      '</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'sinus hyperbolique de, la reciproque de sinus hyperbolique x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example HypTrigReciprocal014
 */
sre.ClearspeakGermanTrigometry.prototype.testHypTrigReciprocal014 = function() {
  var preference = 'Trig_Reciprocal';
  var mathml = '<math><mrow><mi>cosh</mi><mrow><mo>(</mo><mrow><msup><mrow>' +
      '<mi>cosh</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mi>x' +
      '</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'cosinus hyperbolique de, la reciproque de cosinus hyperbolique x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example HypTrigReciprocal015
 */
sre.ClearspeakGermanTrigometry.prototype.testHypTrigReciprocal015 = function() {
  var preference = 'Trig_Reciprocal';
  var mathml = '<math><mrow><mi>tanh</mi><mrow><mo>(</mo><mrow><msup><mrow>' +
      '<mi>tanh</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mi>x' +
      '</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'tangente hyperbolique de, la reciproque de tangente hyperbolique x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example HypTrigReciprocal016
 */
sre.ClearspeakGermanTrigometry.prototype.testHypTrigReciprocal016 = function() {
  var preference = 'Trig_Reciprocal';
  var mathml = '<math><mrow><mi>coth</mi><mrow><mo>(</mo><mrow><msup><mrow>' +
      '<mi>coth</mi></mrow><mrow><mo>−</mo><mn>1</mn></mrow></msup><mi>x' +
      '</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'cotangente hyperbolique de, la reciproque de cotangente hyperbolique x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example HypTrigReciprocal017
 */
sre.ClearspeakGermanTrigometry.prototype.testHypTrigReciprocal017 = function() {
  var preference = 'Trig_Reciprocal';
  var mathml = '<math><mrow><msup><mrow><mi>sinh</mi></mrow><mrow><mo>−' +
      '</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>sinh</mi>' +
      '<mi>x</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'la reciproque de sinus hyperbolique, sinus hyperbolique de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example HypTrigReciprocal018
 */
sre.ClearspeakGermanTrigometry.prototype.testHypTrigReciprocal018 = function() {
  var preference = 'Trig_Reciprocal';
  var mathml = '<math><mrow><msup><mrow><mi>cosh</mi></mrow><mrow><mo>−' +
      '</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>cosh</mi>' +
      '<mi>x</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'la reciproque de cosinus hyperbolique, cosinus hyperbolique de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example HypTrigReciprocal019
 */
sre.ClearspeakGermanTrigometry.prototype.testHypTrigReciprocal019 = function() {
  var preference = 'Trig_Reciprocal';
  var mathml = '<math><mrow><msup><mrow><mi>tanh</mi></mrow><mrow><mo>−' +
      '</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>tanh</mi>' +
      '<mi>x</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'la reciproque de tangente hyperbolique, tangente hyperbolique de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example HypTrigReciprocal020
 */
sre.ClearspeakGermanTrigometry.prototype.testHypTrigReciprocal020 = function() {
  var preference = 'Trig_Reciprocal';
  var mathml = '<math><mrow><msup><mrow><mi>coth</mi></mrow><mrow><mo>−' +
      '</mo><mn>1</mn></mrow></msup><mrow><mo>(</mo><mrow><mi>coth</mi>' +
      '<mi>x</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'la reciproque de cotangente hyperbolique, cotangente hyperbolique de x';
  this.executeRuleTest(mathml, speech, preference);
};

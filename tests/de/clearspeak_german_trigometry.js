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
  var speech = 'Sinus x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example Trig002
 */
sre.ClearspeakGermanTrigometry.prototype.testTrig002 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>cos</mi><mi>x</mi></mrow></math>';
  var speech = 'Kosinus x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example Trig003
 */
sre.ClearspeakGermanTrigometry.prototype.testTrig003 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>tan</mi><mi>θ</mi></mrow></math>';
  var speech = 'Tangens theta';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example Trig004
 */
sre.ClearspeakGermanTrigometry.prototype.testTrig004 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>sec</mi><mi>θ</mi></mrow></math>';
  var speech = 'Sekans theta';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example Trig005
 */
sre.ClearspeakGermanTrigometry.prototype.testTrig005 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>csc</mi><mi>x</mi></mrow></math>';
  var speech = 'Kosekans x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example Trig006
 */
sre.ClearspeakGermanTrigometry.prototype.testTrig006 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>cot</mi><mi>x</mi></mrow></math>';
  var speech = 'Kotangens x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example Trig007
 */
sre.ClearspeakGermanTrigometry.prototype.testTrig007 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mn>2</mn>' +
      '</msup><mi>x</mi></mrow></math>';
  var speech = 'Sinus Quadrat x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example Trig008
 */
sre.ClearspeakGermanTrigometry.prototype.testTrig008 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>cos</mi></mrow><mn>3</mn>' +
      '</msup><mi>x</mi></mrow></math>';
  var speech = 'Kosinus Kubik x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example Trig009
 */
sre.ClearspeakGermanTrigometry.prototype.testTrig009 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>tan</mi></mrow><mn>2</mn>' +
      '</msup><mi>x</mi></mrow></math>';
  var speech = 'Tangens Quadrat x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example Trig010
 */
sre.ClearspeakGermanTrigometry.prototype.testTrig010 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>sec</mi></mrow><mn>3</mn>' +
      '</msup><mi>x</mi></mrow></math>';
  var speech = 'Sekans Kubik x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example Trig011
 */
sre.ClearspeakGermanTrigometry.prototype.testTrig011 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>csc</mi></mrow><mn>2</mn>' +
      '</msup><mi>x</mi></mrow></math>';
  var speech = 'Kosekans Quadrat x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example Trig012
 */
sre.ClearspeakGermanTrigometry.prototype.testTrig012 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>cot</mi></mrow><mn>2</mn>' +
      '</msup><mi>x</mi></mrow></math>';
  var speech = 'Kotangens Quadrat x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example Trig013
 */
sre.ClearspeakGermanTrigometry.prototype.testTrig013 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>sin</mi><mn>2</mn><mi>π</mi></mrow></math>';
  var speech = 'Sinus 2 pi';
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
  var speech = 'der Sinus von, Klammer auf, pi k, plus, pi geteilt durch 2, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example Trig015
 */
sre.ClearspeakGermanTrigometry.prototype.testTrig015 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>cos</mi><mfrac><mi>π</mi><mn>2</mn></mfrac>' +
      '</mrow></math>';
  var speech = 'der Kosinus von, pi geteilt durch 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example Trig016
 */
sre.ClearspeakGermanTrigometry.prototype.testTrig016 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>sin</mi><mfrac><mi>π</mi><mn>2</mn></mfrac>' +
      '</mrow></math>';
  var speech = 'der Sinus von, pi geteilt durch 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example Trig017
 */
sre.ClearspeakGermanTrigometry.prototype.testTrig017 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>sin</mi><mi>π</mi></mrow><mn>2' +
      '</mn></mfrac></mrow></math>';
  var speech = 'Sinus pi geteilt durch 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example Trig018
 */
sre.ClearspeakGermanTrigometry.prototype.testTrig018 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mfrac><mn>2</mn><mrow><mi>sin</mi><mi>π</mi>' +
      '</mrow></mfrac></mrow></math>';
  var speech = '2 geteilt durch Sinus pi';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example Trig019
 */
sre.ClearspeakGermanTrigometry.prototype.testTrig019 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>sin</mi><mfrac><mi>π</mi><mn>2' +
      '</mn></mfrac></mrow><mn>3</mn></mfrac></mrow></math>';
  var speech = 'Bruch mit Zähler, der Sinus von, pi geteilt durch 2, und Nenner 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example Trig020
 */
sre.ClearspeakGermanTrigometry.prototype.testTrig020 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>tan</mi><mrow><mo>(</mo><mrow><mo>−</mo>' +
      '<mi>π</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'Tangens minus pi';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example Trig021
 */
sre.ClearspeakGermanTrigometry.prototype.testTrig021 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><mi>x</mi>' +
      '<mo>+</mo><mi>π</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'der Sinus von, Klammer auf, x plus pi, Klammer zu';
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
  var speech = 'der Kosinus von, Klammer auf, x plus, pi geteilt durch 2, Klammer zu';
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
  var speech = 'der Kosinus von, Klammer auf, pi geteilt durch 2, plus x, Klammer zu';
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
  var speech = 'Sinus Quadrat x, plus, Kosinus Quadrat x, ist gleich 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example Trig025
 */
sre.ClearspeakGermanTrigometry.prototype.testTrig025 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mn>4</mn>' +
      '</msup><mi>x</mi></mrow></math>';
  var speech = 'die vierte Potenz von Sinus x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example Trig026
 */
sre.ClearspeakGermanTrigometry.prototype.testTrig026 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>cos</mi></mrow><mn>5</mn>' +
      '</msup><mi>x</mi></mrow></math>';
  var speech = 'die fünfte Potenz von Kosinus x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example Trig027
 */
sre.ClearspeakGermanTrigometry.prototype.testTrig027 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>tan</mi></mrow><mi>n</mi>' +
      '</msup><mi>x</mi></mrow></math>';
  var speech = 'die nte Potenz von Tangens x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example Trig028
 */
sre.ClearspeakGermanTrigometry.prototype.testTrig028 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>sin</mi><mi>x</mi></mrow>' +
      '<mrow><mi>cos</mi><mi>x</mi></mrow></mfrac></mrow></math>';
  var speech = 'Sinus x geteilt durch Kosinus x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example Trig029
 */
sre.ClearspeakGermanTrigometry.prototype.testTrig029 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>tan</mi><mn>35</mn><mo>°</mo></mrow></math>';
  var speech = 'Tangens 35 Grad';
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
  var speech = 'XXX';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example Trig031
 */
sre.ClearspeakGermanTrigometry.prototype.testTrig031 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>tan</mi><mrow><mo>(</mo><mrow><mo>∠</mo>' +
      '<mi>D</mi><mi>E</mi><mi>F</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'der Tangens von, Klammer auf, Winkel D E F, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example Trig032
 */
sre.ClearspeakGermanTrigometry.prototype.testTrig032 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>tan</mi><mrow><mo>(</mo><mrow><mo>∠</mo>' +
      '<mi>D</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'der Tangens von, Klammer auf, Winkel D, Klammer zu';
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
  var speech = 'der Sinus von, Klammer auf, x plus y, Klammer zu, ist gleich, Sinus x Kosinus y, plus, Kosinus x Sinus y';
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
  var speech = 'der Kosinus von, Klammer auf, x plus y, Klammer zu, ist gleich, Kosinus x Kosinus y, minus, Sinus x Sinus y';
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
  var speech = 'der Tangens von, Klammer auf, x plus y, Klammer zu, ist gleich, Bruch mit Zähler Tangens x minus Tangens y, und Nenner 1 minus, Tangens x Tangens y';
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
  var speech = 'XXX';
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
  var speech = 'der Tangens von, Klammer auf, pi geteilt durch 6, plus, 2 pi geteilt durch 3, Klammer zu, ist gleich, Bruch mit Zähler, der Tangens von, pi geteilt durch 6, minus, der Tangens von, 2 pi geteilt durch 3, und Nenner 1 minus, der Tangens von, pi geteilt durch 6, der Tangens von, 2 pi geteilt durch 3';
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
  var speech = 'Tangens 2 x, ist gleich, Bruch mit Zähler 2 Tangens x, und Nenner 1 minus, Tangens Quadrat x';
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
  var speech = 'Kosinus 2 x, ist gleich 2, Kosinus Quadrat x, minus 1';
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
  var speech = 'der Sinus von, x geteilt durch 2, ist gleich plus minus Quadratwurzel aus, Bruch mit Zähler 1 minus Kosinus x, und Nenner 2';
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
  var speech = 'der Tangens von, x geteilt durch 2, ist gleich plus minus Quadratwurzel aus, Bruch mit Zähler 1 minus Kosinus x, und Nenner 1 plus Kosinus x';
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
  var speech = 'Kosinus x Kosinus y, ist gleich 2, der Kosinus von, Bruch mit Zähler x plus y, und Nenner 2, der Kosinus von, Bruch mit Zähler x minus y, und Nenner 2';
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
  var speech = 'der Sinus von, Klammer auf, minus, pi geteilt durch 8, Klammer zu, ist gleich minus ein halb Quadratwurzel aus 2 minus Quadratwurzel aus 2, Wurzel Ende, Wurzel Ende';
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
  var speech = 'der Tangens von, 3 pi geteilt durch 8, ist gleich, Bruch mit Zähler Quadratwurzel aus, Quadratwurzel aus 2, Wurzel Ende, plus 1, Wurzel Ende, und Nenner Quadratwurzel aus, Quadratwurzel aus 2, Wurzel Ende, minus 1, Wurzel Ende';
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
  var speech = 'der Tangens von, pi geteilt durch 12, ist gleich ein halb Quadratwurzel aus 2 minus Quadratwurzel aus 3, Wurzel Ende, Wurzel Ende';
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
  var speech = 'der inverse Sinus von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigInvAuto002
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigInvAuto002 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>cos</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'der inverse Kosinus von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigInvAuto003
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigInvAuto003 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'der inverse Tangens von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigInvAuto004
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigInvAuto004 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>cot</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'der inverse Kotangens von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigInvAuto005
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigInvAuto005 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>sec</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'der inverse Sekans von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigInvAuto006
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigInvAuto006 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>csc</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'der inverse Kosekans von x';
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
  var speech = 'der inverse Sinus von, Bruch mit Zähler Quadratwurzel aus 2, und Nenner 2';
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
  var speech = 'der inverse Kosinus von ein halb';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigInvAuto009
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigInvAuto009 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mn>17</mn></mrow></math>';
  var speech = 'der inverse Tangens von 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigInvAuto010
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigInvAuto010 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>cot</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mn>32</mn></mrow></math>';
  var speech = 'der inverse Kotangens von 32';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigInvAuto011
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigInvAuto011 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>sec</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mn>100</mn></mrow></math>';
  var speech = 'der inverse Sekans von 100';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigInvAuto012
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigInvAuto012 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>csc</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mn>85</mn></mrow></math>';
  var speech = 'der inverse Kosekans von 85';
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
  var speech = 'der inverse Sinus von minus x';
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
  var speech = 'der inverse Kosinus von minus x';
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
  var speech = 'der inverse Tangens von, Klammer auf, minus x plus 12, Klammer zu';
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
  var speech = 'der inverse Kotangens von, Klammer auf, minus x minus 1, Klammer zu';
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
  var speech = 'der inverse Sinus von Sinus 0';
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
  var speech = 'der inverse Kosekans von Kosekans x';
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
  var speech = 'der Kosinus von, Klammer auf, dem inversen Kosinus von, Klammer auf, minus, Bruch mit Zähler Quadratwurzel aus 2, und Nenner 2, Klammer zu, Klammer zu';
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
  var speech = 'der Kosinus von, Klammer auf, minus, dem inversen Kosinus von, Klammer auf, Bruch mit Zähler Quadratwurzel aus 2, und Nenner 2, Klammer zu, Klammer zu';
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
  var speech = 'der inverse Sinus von, Klammer auf, dem Kosinus von, pi geteilt durch 4, Klammer zu';
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
  var speech = 'Sinus, der inverse Kosinus von ein halb';
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
  var speech = 'Sinus, der inverse Tangens von 1';
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
  var speech = 'der Sinus von, Klammer auf, minus, dem inversen Tangens von 1, Klammer zu';
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
  var speech = 'der Sinus von, Klammer auf, minus, dem inversen Tangens von minus 1, Klammer zu';
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
  var speech = 'der inverse Sekans von Sekans x';
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
  var speech = 'der inverse Sinus von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigReciprocal002
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigReciprocal002 = function() {
  var preference = 'Trig_Reciprocal';
  var mathml = '<math><mrow><msup><mrow><mi>cos</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'der inverse Kosinus von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigReciprocal003
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigReciprocal003 = function() {
  var preference = 'Trig_Reciprocal';
  var mathml = '<math><mrow><msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'der inverse Tangens von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigReciprocal004
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigReciprocal004 = function() {
  var preference = 'Trig_Reciprocal';
  var mathml = '<math><mrow><msup><mrow><mi>cot</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'der inverse Kotangens von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigReciprocal005
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigReciprocal005 = function() {
  var preference = 'Trig_Reciprocal';
  var mathml = '<math><mrow><msup><mrow><mi>sec</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'der inverse Sekans von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigReciprocal006
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigReciprocal006 = function() {
  var preference = 'Trig_Reciprocal';
  var mathml = '<math><mrow><msup><mrow><mi>csc</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'der inverse Kosekans von x';
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
  var speech = 'der inverse Sinus von, Bruch mit Zähler Quadratwurzel aus 2, und Nenner 2';
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
  var speech = 'der inverse Kosinus von ein halb';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigReciprocal009
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigReciprocal009 = function() {
  var preference = 'Trig_Reciprocal';
  var mathml = '<math><mrow><msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mn>17</mn></mrow></math>';
  var speech = 'der inverse Tangens von 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigReciprocal010
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigReciprocal010 = function() {
  var preference = 'Trig_Reciprocal';
  var mathml = '<math><mrow><msup><mrow><mi>cot</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mn>32</mn></mrow></math>';
  var speech = 'der inverse Kotangens von 32';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigReciprocal011
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigReciprocal011 = function() {
  var preference = 'Trig_Reciprocal';
  var mathml = '<math><mrow><msup><mrow><mi>sec</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mn>100</mn></mrow></math>';
  var speech = 'der inverse Sekans von 100';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigReciprocal012
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigReciprocal012 = function() {
  var preference = 'Trig_Reciprocal';
  var mathml = '<math><mrow><msup><mrow><mi>csc</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mn>85</mn></mrow></math>';
  var speech = 'der inverse Kosekans von 85';
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
  var speech = 'der inverse Sinus von minus x';
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
  var speech = 'der inverse Kosinus von minus x';
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
  var speech = 'der inverse Tangens von, Klammer auf, minus x plus 12, Klammer zu';
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
  var speech = 'der inverse Kotangens von, Klammer auf, minus x minus 1, Klammer zu';
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
  var speech = 'der inverse Sinus von Sinus 0';
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
  var speech = 'der inverse Kosekans von Kosekans x';
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
  var speech = 'der Kosinus von, Klammer auf, dem inversen Kosinus von, Klammer auf, minus, Bruch mit Zähler Quadratwurzel aus 2, und Nenner 2, Klammer zu, Klammer zu';
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
  var speech = 'der Kosinus von, Klammer auf, minus, dem inversen Kosinus von, Klammer auf, Bruch mit Zähler Quadratwurzel aus 2, und Nenner 2, Klammer zu, Klammer zu';
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
  var speech = 'der inverse Sinus von, Klammer auf, dem Kosinus von, pi geteilt durch 4, Klammer zu';
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
  var speech = 'Sinus, der inverse Kosinus von ein halb';
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
  var speech = 'Sinus, der inverse Tangens von 1';
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
  var speech = 'der Sinus von, Klammer auf, minus, dem inversen Tangens von 1, Klammer zu';
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
  var speech = 'der Sinus von, Klammer auf, minus, dem inversen Tangens von minus 1, Klammer zu';
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
  var speech = 'der inverse Sekans von Sekans x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigInverse001
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigInverse001 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'Sinus invers von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigInverse002
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigInverse002 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>cos</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'Kosinus invers von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigInverse003
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigInverse003 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'Tangens invers von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigInverse004
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigInverse004 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>cot</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'Kotangens invers von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigInverse005
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigInverse005 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>sec</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'Sekans invers von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigInverse006
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigInverse006 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>csc</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'Kosekans invers von x';
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
  var speech = 'Sinus invers von, Bruch mit Zähler Quadratwurzel aus 2, und Nenner 2';
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
  var speech = 'Kosinus invers von ein halb';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigInverse009
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigInverse009 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mn>17</mn></mrow></math>';
  var speech = 'Tangens invers von 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigInverse010
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigInverse010 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>cot</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mn>32</mn></mrow></math>';
  var speech = 'Kotangens invers von 32';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigInverse011
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigInverse011 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>sec</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mn>100</mn></mrow></math>';
  var speech = 'Sekans invers von 100';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example TrigInverse012
 */
sre.ClearspeakGermanTrigometry.prototype.testTrigInverse012 = function() {
  var preference = 'Trig_TrigInverse';
  var mathml = '<math><mrow><msup><mrow><mi>csc</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mn>85</mn></mrow></math>';
  var speech = 'Kosekans invers von 85';
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
  var speech = 'Sinus invers von minus x';
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
  var speech = 'Kosinus invers von minus x';
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
  var speech = 'Tangens invers von, Klammer auf, minus x plus 12, Klammer zu';
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
  var speech = 'Kotangens invers von, Klammer auf, minus x minus 1, Klammer zu';
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
  var speech = 'Sinus invers von Sinus 0';
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
  var speech = 'Kosekans invers von Kosekans x';
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
  var speech = 'der Kosinus von, Klammer auf, Kosinus invers von, Klammer auf, minus, Bruch mit Zähler Quadratwurzel aus 2, und Nenner 2, Klammer zu, Klammer zu';
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
  var speech = 'der Kosinus von, Klammer auf, minus, Kosinus invers von, Klammer auf, Bruch mit Zähler Quadratwurzel aus 2, und Nenner 2, Klammer zu, Klammer zu';
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
  var speech = 'Sinus invers von, Klammer auf, dem Kosinus von, pi geteilt durch 4, Klammer zu';
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
  var speech = 'Sinus, Kosinus invers von ein halb';
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
  var speech = 'Sinus, Tangens invers von 1';
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
  var speech = 'der Sinus von, Klammer auf, minus, Tangens invers von 1, Klammer zu';
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
  var speech = 'der Sinus von, Klammer auf, minus, Tangens invers von minus 1, Klammer zu';
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
  var speech = 'Sekans invers von Sekans x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example ArcTrig001
 */
sre.ClearspeakGermanTrigometry.prototype.testArcTrig001 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>sin</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'Arkussinus x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example ArcTrig002
 */
sre.ClearspeakGermanTrigometry.prototype.testArcTrig002 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>cos</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'Arkuskosinus x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example ArcTrig003
 */
sre.ClearspeakGermanTrigometry.prototype.testArcTrig003 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'Arkustangens x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example ArcTrig004
 */
sre.ClearspeakGermanTrigometry.prototype.testArcTrig004 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>cot</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'Arkuskotangens x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example ArcTrig005
 */
sre.ClearspeakGermanTrigometry.prototype.testArcTrig005 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>sec</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'Arkussekans x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example ArcTrig006
 */
sre.ClearspeakGermanTrigometry.prototype.testArcTrig006 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>csc</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'Arkuskosekans x';
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
  var speech = 'Arkussinus von, Bruch mit Zähler Quadratwurzel aus 2, und Nenner 2';
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
  var speech = 'Arkuskosinus ein halb';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example ArcTrig009
 */
sre.ClearspeakGermanTrigometry.prototype.testArcTrig009 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>tan</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mn>17</mn></mrow></math>';
  var speech = 'Arkustangens 17';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example ArcTrig010
 */
sre.ClearspeakGermanTrigometry.prototype.testArcTrig010 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>cot</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mn>32</mn></mrow></math>';
  var speech = 'Arkuskotangens 32';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example ArcTrig011
 */
sre.ClearspeakGermanTrigometry.prototype.testArcTrig011 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>sec</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mn>100</mn></mrow></math>';
  var speech = 'Arkussekans 100';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example ArcTrig012
 */
sre.ClearspeakGermanTrigometry.prototype.testArcTrig012 = function() {
  var preference = 'Trig_ArcTrig';
  var mathml = '<math><mrow><msup><mrow><mi>csc</mi></mrow><mrow><mo>−</mo>' +
      '<mn>1</mn></mrow></msup><mn>85</mn></mrow></math>';
  var speech = 'Arkuskosekans 85';
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
  var speech = 'Arkussinus minus x';
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
  var speech = 'Arkuskosinus minus x';
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
  var speech = 'Arkustangens von, Klammer auf, minus x plus 12, Klammer zu';
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
  var speech = 'Arkuskotangens von, Klammer auf, minus x minus 1, Klammer zu';
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
  var speech = 'Arkussinus, Sinus 0';
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
  var speech = 'Arkuskosekans, Kosekans x';
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
  var speech = 'der Kosinus von, Klammer auf, Arkuskosinus von, Klammer auf, minus, Bruch mit Zähler Quadratwurzel aus 2, und Nenner 2, Klammer zu, Klammer zu';
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
  var speech = 'der Kosinus von, Klammer auf, minus, Arkuskosinus von, Klammer auf, Bruch mit Zähler Quadratwurzel aus 2, und Nenner 2, Klammer zu, Klammer zu';
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
  var speech = 'Arkussinus von, Klammer auf, dem Kosinus von, pi geteilt durch 4, Klammer zu';
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
  var speech = 'Sinus, Arkuskosinus ein halb';
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
  var speech = 'Sinus, Arkustangens 1';
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
  var speech = 'der Sinus von, Klammer auf, minus, Arkustangens 1, Klammer zu';
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
  var speech = 'der Sinus von, Klammer auf, minus, Arkustangens minus 1, Klammer zu';
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
  var speech = 'Arkussekans, Sekans x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example AllTrig01
 */
sre.ClearspeakGermanTrigometry.prototype.testAllTrig01 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>arcsin</mi><mi>x</mi></mrow></math>';
  var speech = 'Arkussinus x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example AllTrig02
 */
sre.ClearspeakGermanTrigometry.prototype.testAllTrig02 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>arccos</mi><mi>x</mi></mrow></math>';
  var speech = 'Arkuskosinus x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example AllTrig03
 */
sre.ClearspeakGermanTrigometry.prototype.testAllTrig03 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>arctan</mi><mi>x</mi></mrow></math>';
  var speech = 'Arkustangens x';
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
  var speech = 'Sinus hyperbolicus von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example HypTrig002
 */
sre.ClearspeakGermanTrigometry.prototype.testHypTrig002 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>cosh</mi><mi>x</mi></mrow></math>';
  var speech = 'Kosinus hyperbolicus von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example HypTrig003
 */
sre.ClearspeakGermanTrigometry.prototype.testHypTrig003 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>tanh</mi><mi>x</mi></mrow></math>';
  var speech = 'Tangens hyperbolicus von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example HypTrig004
 */
sre.ClearspeakGermanTrigometry.prototype.testHypTrig004 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>coth</mi><mi>x</mi></mrow></math>';
  var speech = 'Kotangens hyperbolicus von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example HypTrig005
 */
sre.ClearspeakGermanTrigometry.prototype.testHypTrig005 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>sech</mi><mi>x</mi></mrow></math>';
  var speech = 'Sekans hyperbolicus von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example HypTrig006
 */
sre.ClearspeakGermanTrigometry.prototype.testHypTrig006 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><mi>csch</mi><mi>x</mi></mrow></math>';
  var speech = 'Kosekans hyperbolicus von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example HypTrig007
 */
sre.ClearspeakGermanTrigometry.prototype.testHypTrig007 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>sinh</mi></mrow><mrow><mo>−' +
      '</mo><mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'der inverse Sinus hyperbolicus von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example HypTrig008
 */
sre.ClearspeakGermanTrigometry.prototype.testHypTrig008 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>cosh</mi></mrow><mrow><mo>−' +
      '</mo><mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'der inverse Kosinus hyperbolicus von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example HypTrig009
 */
sre.ClearspeakGermanTrigometry.prototype.testHypTrig009 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>tanh</mi></mrow><mrow><mo>−' +
      '</mo><mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'der inverse Tangens hyperbolicus von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example HypTrig010
 */
sre.ClearspeakGermanTrigometry.prototype.testHypTrig010 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>coth</mi></mrow><mrow><mo>−' +
      '</mo><mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'der inverse Kotangens hyperbolicus von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example HypTrig011
 */
sre.ClearspeakGermanTrigometry.prototype.testHypTrig011 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>sech</mi></mrow><mrow><mo>−' +
      '</mo><mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'der inverse Sekans hyperbolicus von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example HypTrig012
 */
sre.ClearspeakGermanTrigometry.prototype.testHypTrig012 = function() {
  var preference = 'Trig_Auto';
  var mathml = '<math><mrow><msup><mrow><mi>csch</mi></mrow><mrow><mo>−' +
      '</mo><mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'der inverse Kosekans hyperbolicus von x';
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
  var speech = 'Sinus hyperbolicus von, dem inversen Sinus hyperbolicus von x';
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
  var speech = 'Kosinus hyperbolicus von, dem inversen Kosinus hyperbolicus von x';
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
  var speech = 'Tangens hyperbolicus von, dem inversen Tangens hyperbolicus von x';
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
  var speech = 'Kotangens hyperbolicus von, dem inversen Kotangens hyperbolicus von x';
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
  var speech = 'der inverse Sinus hyperbolicus von, Sinus hyperbolicus von x';
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
  var speech = 'der inverse Kosinus hyperbolicus von, Kosinus hyperbolicus von x';
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
  var speech = 'der inverse Tangens hyperbolicus von, Tangens hyperbolicus von x';
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
  var speech = 'der inverse Kotangens hyperbolicus von, Kotangens hyperbolicus von x';
  this.executeRuleTest(mathml, speech, preference);
};


// Reciprocal
/**
 * Testing ClearspeakGermanTrigometry Example HypTrigReciprocal001
 */
sre.ClearspeakGermanTrigometry.prototype.testHypTrigReciprocal001 = function() {
  var preference = 'Trig_Reciprocal';
  var mathml = '<math><mrow><mi>sinh</mi><mi>x</mi></mrow></math>';
  var speech = 'Sinus hyperbolicus von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example HypTrigReciprocal002
 */
sre.ClearspeakGermanTrigometry.prototype.testHypTrigReciprocal002 = function() {
  var preference = 'Trig_Reciprocal';
  var mathml = '<math><mrow><mi>cosh</mi><mi>x</mi></mrow></math>';
  var speech = 'Kosinus hyperbolicus von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example HypTrigReciprocal003
 */
sre.ClearspeakGermanTrigometry.prototype.testHypTrigReciprocal003 = function() {
  var preference = 'Trig_Reciprocal';
  var mathml = '<math><mrow><mi>tanh</mi><mi>x</mi></mrow></math>';
  var speech = 'Tangens hyperbolicus von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example HypTrigReciprocal004
 */
sre.ClearspeakGermanTrigometry.prototype.testHypTrigReciprocal004 = function() {
  var preference = 'Trig_Reciprocal';
  var mathml = '<math><mrow><mi>coth</mi><mi>x</mi></mrow></math>';
  var speech = 'Kotangens hyperbolicus von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example HypTrigReciprocal005
 */
sre.ClearspeakGermanTrigometry.prototype.testHypTrigReciprocal005 = function() {
  var preference = 'Trig_Reciprocal';
  var mathml = '<math><mrow><mi>sech</mi><mi>x</mi></mrow></math>';
  var speech = 'Sekans hyperbolicus von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example HypTrigReciprocal006
 */
sre.ClearspeakGermanTrigometry.prototype.testHypTrigReciprocal006 = function() {
  var preference = 'Trig_Reciprocal';
  var mathml = '<math><mrow><mi>csch</mi><mi>x</mi></mrow></math>';
  var speech = 'Kosekans hyperbolicus von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example HypTrigReciprocal007
 */
sre.ClearspeakGermanTrigometry.prototype.testHypTrigReciprocal007 = function() {
  var preference = 'Trig_Reciprocal';
  var mathml = '<math><mrow><msup><mrow><mi>sinh</mi></mrow><mrow><mo>−' +
      '</mo><mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'der inverse Sinus hyperbolicus von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example HypTrigReciprocal008
 */
sre.ClearspeakGermanTrigometry.prototype.testHypTrigReciprocal008 = function() {
  var preference = 'Trig_Reciprocal';
  var mathml = '<math><mrow><msup><mrow><mi>cosh</mi></mrow><mrow><mo>−' +
      '</mo><mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'der inverse Kosinus hyperbolicus von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example HypTrigReciprocal009
 */
sre.ClearspeakGermanTrigometry.prototype.testHypTrigReciprocal009 = function() {
  var preference = 'Trig_Reciprocal';
  var mathml = '<math><mrow><msup><mrow><mi>tanh</mi></mrow><mrow><mo>−' +
      '</mo><mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'der inverse Tangens hyperbolicus von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example HypTrigReciprocal010
 */
sre.ClearspeakGermanTrigometry.prototype.testHypTrigReciprocal010 = function() {
  var preference = 'Trig_Reciprocal';
  var mathml = '<math><mrow><msup><mrow><mi>coth</mi></mrow><mrow><mo>−' +
      '</mo><mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'der inverse Kotangens hyperbolicus von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example HypTrigReciprocal011
 */
sre.ClearspeakGermanTrigometry.prototype.testHypTrigReciprocal011 = function() {
  var preference = 'Trig_Reciprocal';
  var mathml = '<math><mrow><msup><mrow><mi>sech</mi></mrow><mrow><mo>−' +
      '</mo><mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'der inverse Sekans hyperbolicus von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanTrigometry Example HypTrigReciprocal012
 */
sre.ClearspeakGermanTrigometry.prototype.testHypTrigReciprocal012 = function() {
  var preference = 'Trig_Reciprocal';
  var mathml = '<math><mrow><msup><mrow><mi>csch</mi></mrow><mrow><mo>−' +
      '</mo><mn>1</mn></mrow></msup><mi>x</mi></mrow></math>';
  var speech = 'der inverse Kosekans hyperbolicus von x';
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
  var speech = 'Sinus hyperbolicus von, dem inversen Sinus hyperbolicus von x';
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
  var speech = 'Kosinus hyperbolicus von, dem inversen Kosinus hyperbolicus von x';
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
  var speech = 'Tangens hyperbolicus von, dem inversen Tangens hyperbolicus von x';
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
  var speech = 'Kotangens hyperbolicus von, dem inversen Kotangens hyperbolicus von x';
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
  var speech = 'der inverse Sinus hyperbolicus von, Sinus hyperbolicus von x';
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
  var speech = 'der inverse Kosinus hyperbolicus von, Kosinus hyperbolicus von x';
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
  var speech = 'der inverse Tangens hyperbolicus von, Tangens hyperbolicus von x';
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
  var speech = 'der inverse Kotangens hyperbolicus von, Kotangens hyperbolicus von x';
  this.executeRuleTest(mathml, speech, preference);
};

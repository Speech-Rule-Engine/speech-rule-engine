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


goog.provide('sre.ClearspeakGermanLogarithms');

goog.require('sre.ClearspeakGermanRuleTest');



/**
* @constructor
* @extends {sre.ClearspeakGermanRuleTest}
*/
sre.ClearspeakGermanLogarithms = function() {
  sre.ClearspeakGermanLogarithms.base(this, 'constructor');

  /**
* @override
  */
  this.information = 'ClearspeakGermanLogarithms rule tests.';

};
goog.inherits(sre.ClearspeakGermanLogarithms, sre.ClearspeakGermanRuleTest);



//
// Logarithms
//


/**
 * Testing ClearspeakGermanLogarithms Example Log001
 */
sre.ClearspeakGermanLogarithms.prototype.testLog001 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><mi>log</mi><mi>x</mi></mrow></math>';
  var speech = 'log x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanLogarithms Example Log002
 */
sre.ClearspeakGermanLogarithms.prototype.testLog002 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><msub><mrow><mi>log</mi></mrow><mrow><mn>10' +
      '</mn></mrow></msub><mi>x</mi></mrow></math>';
  var speech = 'log base 10 de, x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanLogarithms Example Log003
 */
sre.ClearspeakGermanLogarithms.prototype.testLog003 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><msub><mrow><mi>log</mi></mrow><mi>b</mi>' +
      '</msub><mi>a</mi><mi>x</mi><mo>=</mo><msub><mrow><mi>log</mi></mrow>' +
      '<mi>b</mi></msub><mi>a</mi><mo>+</mo><msub><mrow><mi>log</mi></mrow>' +
      '<mi>b</mi></msub><mi>x</mi></mrow></math>';
  var speech = 'log base b de, a x, égale, log base b de, a, plus, log base b de, x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanLogarithms Example Log004
 */
sre.ClearspeakGermanLogarithms.prototype.testLog004 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><msub><mrow><mi>log</mi></mrow><mi>b</mi>' +
      '</msub><mfrac><mi>S</mi><mi>T</mi></mfrac><mo>=</mo><msub><mrow>' +
      '<mi>log</mi></mrow><mi>b</mi></msub><mi>S</mi><mo>−</mo><msub><mrow>' +
      '<mi>log</mi></mrow><mi>b</mi></msub><mi>T</mi></mrow></math>';
  var speech = 'log base b de, S sur T, égale, log base b de, S, moins, log base b de, T';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanLogarithms Example Log005
 */
sre.ClearspeakGermanLogarithms.prototype.testLog005 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><msub><mrow><mi>log</mi></mrow><mi>b</mi>' +
      '</msub><mrow><mo>(</mo><mrow><msup><mi>x</mi><mi>k</mi></msup>' +
      '</mrow><mo>)</mo></mrow><mo>=</mo><mi>k</mi><msub><mrow><mi>log</mi>' +
      '</mrow><mi>b</mi></msub><mi>x</mi></mrow></math>';
  var speech = 'log base b de, parenthèse gauche, x à la puissance k; parenthèse droite, égale k, log base b de, x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanLogarithms Example Log006
 */
sre.ClearspeakGermanLogarithms.prototype.testLog006 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><msup><mrow><mn>10</mn></mrow><mrow><msub>' +
      '<mrow><mi>log</mi></mrow><mrow><mn>10</mn></mrow></msub><mi>x</mi>' +
      '</mrow></msup><mo>=</mo><mi>x</mi></mrow></math>';
  var speech = '10 à la puissance log base 10 de, x; égale x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanLogarithms Example Log007
 */
sre.ClearspeakGermanLogarithms.prototype.testLog007 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><msub><mrow><mi>log</mi></mrow><mrow><mn>10' +
      '</mn></mrow></msub><msup><mrow><mn>10</mn></mrow><mi>x</mi></msup>' +
      '<mo>=</mo><mi>x</mi></mrow></math>';
  var speech = 'log base 10 de, 10 à la puissance x; égale x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanLogarithms Example Log008
 */
sre.ClearspeakGermanLogarithms.prototype.testLog008 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><msup><mrow><mn>10</mn></mrow><mrow><msub>' +
      '<mrow><mi>log</mi></mrow><mrow><mn>10</mn></mrow></msub><mn>5</mn>' +
      '</mrow></msup><mo>=</mo><mn>5</mn></mrow></math>';
  var speech = '10 à la puissance log base 10 de, 5; égale 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanLogarithms Example Log009
 */
sre.ClearspeakGermanLogarithms.prototype.testLog009 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><msub><mrow><mi>log</mi></mrow><mrow><mn>10' +
      '</mn></mrow></msub><msup><mrow><mn>10</mn></mrow><mn>3</mn></msup>' +
      '<mo>=</mo><mn>3</mn></mrow></math>';
  var speech = 'log base 10 de, 10 au cube, égale 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanLogarithms Example Log010
 */
sre.ClearspeakGermanLogarithms.prototype.testLog010 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><msub><mrow><mi>log</mi></mrow><mi>a</mi>' +
      '</msub><mi>x</mi><mo>=</mo><mfrac><mrow><msub><mrow><mi>log</mi>' +
      '</mrow><mi>b</mi></msub><mi>x</mi></mrow><mrow><msub><mrow><mi>log' +
      '</mi></mrow><mi>b</mi></msub><mi>a</mi></mrow></mfrac></mrow></math>';
  var speech = 'log base a de, x, égale, log base b de, x, sur, log base b de, a';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanLogarithms Example Log011
 */
sre.ClearspeakGermanLogarithms.prototype.testLog011 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><mfrac><mrow><msub><mrow><mi>log</mi></mrow>' +
      '<mrow><mn>10</mn></mrow></msub><mn>18</mn></mrow><mrow><msub><mrow>' +
      '<mi>log</mi></mrow><mrow><mn>10</mn></mrow></msub><mn>3</mn></mrow>' +
      '</mfrac><mo>=</mo><msub><mrow><mi>log</mi></mrow><mn>3</mn></msub>' +
      '<mn>18</mn></mrow></math>';
  var speech = 'log base 10 de, 18, sur, log base 10 de, 3, égale, log base 3 de, 18';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanLogarithms Example Log012
 */
sre.ClearspeakGermanLogarithms.prototype.testLog012 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>log</mi><mi>x</mi></mrow>' +
      '<mrow><mi>log</mi><mi>a</mi></mrow></mfrac></mrow></math>';
  var speech = 'log x sur log a';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanLogarithms Example Log013
 */
sre.ClearspeakGermanLogarithms.prototype.testLog013 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><mi>log</mi><mo stretchy="false">(</mo><mi>x' +
      '</mi><mo>+</mo><mn>1</mn><mo stretchy="false">)</mo></mrow></math>';
  var speech = 'log de, parenthèse gauche, x plus 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanLogarithms Example Log014
 */
sre.ClearspeakGermanLogarithms.prototype.testLog014 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><mi>log</mi><msup><mrow><mo stretchy="false">(' +
      '</mo><mi>x</mi><mo>+</mo><mn>1</mn><mo stretchy="false">)</mo>' +
      '</mrow><mn>2</mn></msup></mrow></math>';
  var speech = 'log de, parenthèse gauche, x plus 1, parenthèse droite, au carré';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanLogarithms Example Log015
 */
sre.ClearspeakGermanLogarithms.prototype.testLog015 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><mi>log</mi><mo stretchy="false">(</mo><mi>x' +
      '</mi><mi>y</mi><mo stretchy="false">)</mo></mrow></math>';
  var speech = 'log x y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanLogarithms Example Log016
 */
sre.ClearspeakGermanLogarithms.prototype.testLog016 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>log</mi><mrow><mo>(</mo><mrow>' +
      '<mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow><mrow>' +
      '<mi>log</mi><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>2</mn>' +
      '</mrow><mo>)</mo></mrow></mrow></mfrac></mrow></math>';
  var speech = 'fraction avec numérateur, log de, parenthèse gauche, x plus 1, parenthèse droite, et dénominateur, log de, parenthèse gauche, x plus 2, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanLogarithms Example Log017
 */
sre.ClearspeakGermanLogarithms.prototype.testLog017 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><mfrac><mrow><msub><mrow><mi>log</mi></mrow>' +
      '<mn>6</mn></msub><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>1' +
      '</mn></mrow><mo>)</mo></mrow></mrow><mrow><msub><mrow><mi>log</mi>' +
      '</mrow><mn>6</mn></msub><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo>' +
      '<mn>2</mn></mrow><mo>)</mo></mrow></mrow></mfrac></mrow></math>';
  var speech = 'fraction avec numérateur, log base 6 de, parenthèse gauche, x plus 1, parenthèse droite, et dénominateur, log base 6 de, parenthèse gauche, x plus 2, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanLogarithms Example Log018
 */
sre.ClearspeakGermanLogarithms.prototype.testLog018 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>log</mi><mn>40</mn><mo>+</mo>' +
      '<mi>log</mi><mn>60</mn></mrow><mrow><mi>log</mi><mn>5</mn></mrow>' +
      '</mfrac></mrow></math>';
  var speech = 'fraction avec numérateur log 40 plus log 60, et dénominateur log 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanLogarithms Example Log019
 */
sre.ClearspeakGermanLogarithms.prototype.testLog019 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><mfrac><mrow><msub><mrow><mi>log</mi></mrow>' +
      '<mn>3</mn></msub><mn>40</mn><mo>+</mo><msub><mrow><mi>log</mi>' +
      '</mrow><mn>3</mn></msub><mn>60</mn></mrow><mrow><msub><mrow><mi>log' +
      '</mi></mrow><mn>3</mn></msub><mn>5</mn></mrow></mfrac></mrow></math>';
  var speech = 'fraction avec numérateur, log base 3 de, 40, plus, log base 3 de, 60, et dénominateur, log base 3 de, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanLogarithms Example Log020
 */
sre.ClearspeakGermanLogarithms.prototype.testLog020 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><mi>log</mi><mo stretchy="false">(</mo><msup>' +
      '<mn>3</mn><mn>4</mn></msup><msup><mrow><mn>12</mn></mrow><mn>9</mn>' +
      '</msup><mo stretchy="false">)</mo><mo>=</mo><mn>4</mn><mi>log</mi>' +
      '<mn>3</mn><mo>+</mo><mn>9</mn><mi>log</mi><mn>12</mn></mrow></math>';
  var speech = 'log de, parenthèse gauche, 3 à la puissance 4; 12 à la puissance 9; parenthèse droite, égale 4 log 3, plus 9 log 12';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanLogarithms Example Log021
 */
sre.ClearspeakGermanLogarithms.prototype.testLog021 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><mi>log</mi><mrow><mo>(</mo><mrow><mfrac><mi>x' +
      '</mi><mi>y</mi></mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'log de, parenthèse gauche, x sur y, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanLogarithms Example Log022
 */
// TODO: Fix the vulgar fraction predicate!
sre.ClearspeakGermanLogarithms.prototype.testLog022 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><mi>log</mi><mrow><mo>(</mo><mrow><mfrac><mrow>' +
      '<msup><mn>3</mn><mn>4</mn></msup></mrow><mrow><msup><mn>8</mn><mrow>' +
      '<mn>10</mn></mrow></msup></mrow></mfrac></mrow><mo>)</mo></mrow>' +
      '<mo>=</mo><mn>4</mn><mi>log</mi><mn>3</mn><mo>−</mo><mn>10</mn>' +
      '<mi>log</mi><mn>8</mn></mrow></math>';
  var speech = 'log de, parenthèse gauche, fraction avec numérateur 3 à la puissance 4; et dénominateur 8 à la puissance 10; parenthèse droite, égale 4 log 3, moins 10 log 8';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanLogarithms Example Log023
 */
sre.ClearspeakGermanLogarithms.prototype.testLog023 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><msup><mrow><mn>10</mn></mrow><mrow><mi>log' +
      '</mi><mi>x</mi></mrow></msup></mrow></math>';
  var speech = '10 à la puissance log x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanLogarithms Example NatLog001
 */
sre.ClearspeakGermanLogarithms.prototype.testNatLog001 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><mi>ln</mi><mi>x</mi></mrow></math>';
  var speech = 'logarithme népérien x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanLogarithms Example NatLog002
 */
sre.ClearspeakGermanLogarithms.prototype.testNatLog002 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><mi>ln</mi><mi>x</mi><mo>−</mo><mi>ln</mi><mo' +
      ' stretchy="false">(</mo><mi>x</mi><mo>−</mo><mn>1</mn><mo' +
      ' stretchy="false">)</mo><mo>=</mo><mi>ln</mi><mrow><mo>(</mo><mrow>' +
      '<mfrac><mi>x</mi><mrow><mi>x</mi><mo>−</mo><mn>1</mn></mrow></mfrac>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'logarithme népérien x, moins logarithme népérien de, parenthèse gauche, x moins 1, parenthèse droite, égale logarithme népérien de, parenthèse gauche, fraction avec numérateur x, et dénominateur x moins 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanLogarithms Example NatLog003
 */
sre.ClearspeakGermanLogarithms.prototype.testNatLog003 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><mi>ln</mi><mrow><mo>(</mo><mrow><msup><mi>e' +
      '</mi><mi>x</mi></msup></mrow><mo>)</mo></mrow><mo>=</mo><mi>x</mi>' +
      '</mrow></math>';
  var speech = 'logarithme népérien de, parenthèse gauche, e à la puissance x; parenthèse droite, égale x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanLogarithms Example NatLog004
 */
sre.ClearspeakGermanLogarithms.prototype.testNatLog004 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><msup><mi>e</mi><mrow><mi>ln</mi><mi>x</mi>' +
      '</mrow></msup><mo>=</mo><mi>x</mi></mrow></math>';
  var speech = 'e à la puissance logarithme népérien x; égale x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanLogarithms Example NatLog005
 */
sre.ClearspeakGermanLogarithms.prototype.testNatLog005 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><mi>ln</mi><mrow><mo>(</mo><mrow><msup><mi>e' +
      '</mi><mi>x</mi></msup></mrow><mo>)</mo></mrow><mo>=</mo><mi>x</mi>' +
      '</mrow></math>';
  var speech = 'logarithme népérien de, parenthèse gauche, e à la puissance x; parenthèse droite, égale x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanLogarithms Example NatLog006
 */
sre.ClearspeakGermanLogarithms.prototype.testNatLog006 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><msup><mi>e</mi><mrow><mi>ln</mi><mn>4</mn>' +
      '</mrow></msup><mo>=</mo><mn>4</mn></mrow></math>';
  var speech = 'e à la puissance logarithme népérien 4; égale 4';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanLogarithms Example NatLog007
 */
sre.ClearspeakGermanLogarithms.prototype.testNatLog007 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>ln</mi><mn>40</mn></mrow>' +
      '<mrow><mi>ln</mi><mn>5</mn></mrow></mfrac><mo>=</mo><msub><mrow>' +
      '<mi>log</mi></mrow><mn>5</mn></msub><mn>40</mn></mrow></math>';
  var speech = 'logarithme népérien 40, sur logarithme népérien 5, égale, log base 5 de, 40';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanLogarithms Example NatLog008
 */
sre.ClearspeakGermanLogarithms.prototype.testNatLog008 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>ln</mi><mn>40</mn><mo>+</mo>' +
      '<mi>ln</mi><mn>60</mn></mrow><mrow><mi>ln</mi><mn>5</mn></mrow>' +
      '</mfrac></mrow></math>';
  var speech = 'fraction avec numérateur logarithme népérien 40, plus logarithme népérien 60, et dénominateur logarithme népérien 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanLogarithms Example NatLog009
 */
sre.ClearspeakGermanLogarithms.prototype.testNatLog009 = function() {
  var preference = 'Log_LnAsNaturalLog';
  var mathml = '<math><mrow><mi>ln</mi><mi>x</mi></mrow></math>';
  var speech = 'logarithme népérien x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanLogarithms Example NatLog010
 */
sre.ClearspeakGermanLogarithms.prototype.testNatLog010 = function() {
  var preference = 'Log_LnAsNaturalLog';
  var mathml = '<math><mrow><mi>ln</mi><mi>x</mi><mo>−</mo><mi>ln</mi><mo' +
      ' stretchy="false">(</mo><mi>x</mi><mo>−</mo><mn>1</mn><mo' +
      ' stretchy="false">)</mo><mo>=</mo><mi>ln</mi><mrow><mo>(</mo><mrow>' +
      '<mfrac><mi>x</mi><mrow><mi>x</mi><mo>−</mo><mn>1</mn></mrow></mfrac>' +
      '</mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'logarithme népérien x, moins, logarithme népérien de, parenthèse gauche, x moins 1, parenthèse droite, égale, logarithme népérien de, parenthèse gauche, fraction avec numérateur x, et dénominateur x moins 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanLogarithms Example NatLog011
 */
sre.ClearspeakGermanLogarithms.prototype.testNatLog011 = function() {
  var preference = 'Log_LnAsNaturalLog';
  var mathml = '<math><mrow><mi>ln</mi><mrow><mo>(</mo><mrow><msup><mi>e' +
      '</mi><mi>x</mi></msup></mrow><mo>)</mo></mrow><mo>=</mo><mi>x</mi>' +
      '</mrow></math>';
  var speech = 'logarithme népérien de, parenthèse gauche, e à la puissance x; parenthèse droite, égale x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanLogarithms Example NatLog012
 */
sre.ClearspeakGermanLogarithms.prototype.testNatLog012 = function() {
  var preference = 'Log_LnAsNaturalLog';
  var mathml = '<math><mrow><msup><mi>e</mi><mrow><mi>ln</mi><mi>x</mi>' +
      '</mrow></msup><mo>=</mo><mi>x</mi></mrow></math>';
  var speech = 'e à la puissance logarithme népérien x; égale x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanLogarithms Example NatLog013
 */
sre.ClearspeakGermanLogarithms.prototype.testNatLog013 = function() {
  var preference = 'Log_LnAsNaturalLog';
  var mathml = '<math><mrow><mi>ln</mi><mrow><mo>(</mo><mrow><msup><mi>e' +
      '</mi><mi>x</mi></msup></mrow><mo>)</mo></mrow><mo>=</mo><mi>x</mi>' +
      '</mrow></math>';
  var speech = 'logarithme népérien de, parenthèse gauche, e à la puissance x; parenthèse droite, égale x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanLogarithms Example NatLog014
 */
sre.ClearspeakGermanLogarithms.prototype.testNatLog014 = function() {
  var preference = 'Log_LnAsNaturalLog';
  var mathml = '<math><mrow><msup><mi>e</mi><mrow><mi>ln</mi><mn>4</mn>' +
      '</mrow></msup><mo>=</mo><mn>4</mn></mrow></math>';
  var speech = 'e à la puissance logarithme népérien 4; égale 4';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanLogarithms Example NatLog015
 */
sre.ClearspeakGermanLogarithms.prototype.testNatLog015 = function() {
  var preference = 'Log_LnAsNaturalLog';
  var mathml = '<math><mrow><mfrac><mrow><mi>ln</mi><mn>40</mn></mrow>' +
      '<mrow><mi>ln</mi><mn>5</mn></mrow></mfrac><mo>=</mo><msub><mrow>' +
      '<mi>log</mi></mrow><mn>5</mn></msub><mn>40</mn></mrow></math>';
  var speech = 'logarithme népérien 40, sur logarithme népérien 5, égale, log base 5 de, 40';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanLogarithms Example NatLog016
 */
sre.ClearspeakGermanLogarithms.prototype.testNatLog016 = function() {
  var preference = 'Log_LnAsNaturalLog';
  var mathml = '<math><mrow><mfrac><mrow><mi>ln</mi><mn>40</mn><mo>+</mo>' +
      '<mi>ln</mi><mn>60</mn></mrow><mrow><mi>ln</mi><mn>5</mn></mrow>' +
      '</mfrac></mrow></math>';
  var speech = 'fraction avec numérateur logarithme népérien 40, plus logarithme népérien 60, et dénominateur logarithme népérien 5';
  this.executeRuleTest(mathml, speech, preference);
};

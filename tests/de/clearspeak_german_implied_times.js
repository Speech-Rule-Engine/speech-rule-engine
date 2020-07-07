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


goog.provide('sre.ClearspeakGermanImpliedTimes');

goog.require('sre.ClearspeakGermanRuleTest');



/**
* @constructor
* @extends {sre.ClearspeakGermanRuleTest}
*/
sre.ClearspeakGermanImpliedTimes = function() {
  sre.ClearspeakGermanImpliedTimes.base(this, 'constructor');

  /**
* @override
  */
  this.information = 'ClearspeakGermanImpliedTimes rule tests.';

};
goog.inherits(sre.ClearspeakGermanImpliedTimes, sre.ClearspeakGermanRuleTest);



//
// Implied Times
//


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes001
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes001 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mn>3</mn><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = '2   3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes002
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes002 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>[</mo><mn>3</mn><mo>]</mo>' +
      '</mrow></mrow></math>';
  var speech = '2   3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes003
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes003 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><msup><mn>2</mn><mn>4</mn></msup><mrow><mo>(' +
      '</mo><mn>3</mn><mo>)</mo></mrow></mrow></math>';
  var speech = '2 hoch 4,   3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes004
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes004 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mrow><mn>3</mn><mo>+' +
      '</mo><mn>4</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2  , Klammer auf, 3 plus 4, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes005
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes005 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>[</mo><mrow><mn>3</mn><mo>+' +
      '</mo><mn>4</mn></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = '2  , eckige Klammer auf, 3 plus 4, eckige Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes006
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes006 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mn>3</mn><mo>)</mo></mrow>' +
      '<mrow><mo>(</mo><mn>2</mn><mo>)</mo></mrow></mrow></math>';
  var speech = '3   2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes007
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes007 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mn>2</mn><msup><mrow><mrow><mo>(</mo><mrow>' +
      '<mn>3</mn><mo>+</mo><mn>4</mn></mrow><mo>)</mo></mrow></mrow><mn>2' +
      '</mn></msup></mrow></math>';
  var speech = '2  , Klammer auf, 3 plus 4, Klammer zu, Quadrat';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes008
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes008 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mn>2</mn><mo>+</mo><mn>7' +
      '</mn></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mn>3</mn><mo>−' +
      '</mo><mn>6</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'Klammer auf, 2 plus 7, Klammer zu,  , Klammer auf, 3 minus 6, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes009
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes009 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mn>2</mn><mo>+</mo><mn>7' +
      '</mn></mrow><mo>]</mo></mrow><mrow><mo>[</mo><mrow><mn>3</mn><mo>−' +
      '</mo><mn>6</mn></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'eckige Klammer auf, 2 plus 7, eckige Klammer zu,  , eckige Klammer auf, 3 minus 6, eckige Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes010
 */
// TODO: (Simons) x is categorised as function!
sre.ClearspeakGermanImpliedTimes.prototype.untestImpTimes010 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mi>x</mi><mrow><mo>(</mo><mrow><mi>y</mi><mi>z' +
      '</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'XXX';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes011
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes011 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mi>x</mi><mrow><mo>(</mo><mrow><mi>y</mi><mo>+' +
      '</mo><mi>z</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'x  , Klammer auf, y plus z, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes012
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes012 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mrow><mi>y</mi><mo>+' +
      '</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2  , Klammer auf, y plus 1, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes013
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes013 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mo stretchy="false">(</mo><mn>2</mn><mo>−</mo>' +
      '<mn>1</mn><mo stretchy="false">)</mo><mi>x</mi></mrow></math>';
  var speech = 'Klammer auf, 2 minus 1, Klammer zu,   x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes014
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes014 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><msub><mi>p</mi><mn>1</mn></msub><mrow><mo>(' +
      '</mo><mrow><mn>3</mn><mo>+</mo><mn>7</mn></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'p Index 1,  , Klammer auf, 3 plus 7, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes015
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes015 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><msubsup><mi>p</mi><mn>1</mn><mrow><msub><mi>a' +
      '</mi><mn>1</mn></msub></mrow></msubsup><msubsup><mi>p</mi><mn>2</mn>' +
      '<mrow><msub><mi>a</mi><mn>2</mn></msub></mrow></msubsup></mrow></math>';
  var speech = 'p Index 1, hoch, a Index 1, p Index 2, hoch, a Index 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes016
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes016 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mi>x</mi>' +
      '<mo>+</mo><mi>y</mi></mrow><mo>)</mo></mrow></mrow><mrow><mo>−</mo>' +
      '<mn>4</mn></mrow></msup><msup><mrow><mrow><mo>(</mo><mrow><mi>x</mi>' +
      '<mo>−</mo><mi>y</mi></mrow><mo>)</mo></mrow></mrow><mrow><mo>−</mo>' +
      '<mn>4</mn></mrow></msup></mrow></math>';
  var speech = 'Klammer auf, x plus y, Klammer zu, hoch minus 4,  , Klammer auf, x minus y, Klammer zu, hoch minus 4';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes017
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes017 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><msup><mn>2</mn><mrow><mn>4</mn><mrow><mo>(' +
      '</mo><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mo>)</mo></mrow>' +
      '</mrow></msup></mrow></math>';
  var speech = '2 hoch 4  , Klammer auf, x plus y, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes018
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes018 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mi>x</mi><mi>y</mi></mrow></math>';
  var speech = 'x y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes019
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes019 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><msup><mi>x</mi><mn>2</mn></msup><msup><mi>y' +
      '</mi><mn>3</mn></msup></mrow></math>';
  var speech = 'x Quadrat, y Kubik';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes020
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes020 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><msup><mi>x</mi><mrow><mi>y</mi><mo>+</mo><mn>1' +
      '</mn></mrow></msup><msup><mi>x</mi><mrow><mi>y</mi><mo>+</mo><mn>2' +
      '</mn></mrow></msup></mrow></math>';
  var speech = 'x hoch y plus 1, x hoch y plus 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes021
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes021 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><msqrt><mi>a</mi></msqrt><msqrt><mi>b</mi>' +
      '</msqrt><mo>=</mo><msqrt><mrow><mi>a</mi><mi>b</mi></mrow></msqrt>' +
      '</mrow></math>';
  var speech = 'Quadratwurzel aus a, Quadratwurzel aus b, ist gleich Quadratwurzel aus a b';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes022
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes022 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><msqrt><mn>3</mn></msqrt><msqrt><mrow><mn>10' +
      '</mn></mrow></msqrt><mo>=</mo><msqrt><mrow><mn>30</mn></mrow>' +
      '</msqrt></mrow></math>';
  var speech = 'Quadratwurzel aus 3, Quadratwurzel aus 10, ist gleich Quadratwurzel aus 30';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes023
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes023 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mn>2</mn><msqrt><mn>3</mn></msqrt></mrow></math>';
  var speech = '2 Quadratwurzel aus 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes024
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes024 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mn>1</mn><mo>+</mo><mn>2</mn><msqrt><mn>3</mn>' +
      '</msqrt></mrow></math>';
  var speech = '1 plus 2 Quadratwurzel aus 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes025
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes025 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mi>f</mi><mo stretchy="false">(</mo><mi>x</mi>' +
      '<mo stretchy="false">)</mo><mo>=</mo><msup><mi>x</mi><mn>2</mn>' +
      '</msup><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'f von x, ist gleich x Quadrat  , Klammer auf, x plus 1, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes026
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes026 = function() {
  var preference = 'ImpliedTimes_Auto:Functions_None';
  var mathml = '<math><mrow><mi>f</mi><mo stretchy="false">(</mo><mi>x</mi>' +
      '<mo stretchy="false">)</mo><mo>=</mo><msup><mi>x</mi><mn>2</mn>' +
      '</msup><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'f mal x, ist gleich x Quadrat  , Klammer auf, x plus 1, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes027
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes027 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mi>sin</mi><mi>x</mi><mi>cos</mi><mi>y</mi>' +
      '<mo>+</mo><mi>cos</mi><mi>x</mi><mi>sin</mi><mi>y</mi></mrow></math>';
  var speech = 'Sinus x Kosinus y, plus, Kosinus x Sinus y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes027a
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes027a = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><mi>x</mi>' +
      '<mo>+</mo><mi>y</mi></mrow><mo>)</mo></mrow><mi>cos</mi><mrow><mo>(' +
      '</mo><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'der Sinus von, Klammer auf, x plus y, Klammer zu, der Kosinus von, Klammer auf, x plus y, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes028
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes028 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><msub><mrow><mi>log</mi></mrow><mrow><mn>10' +
      '</mn></mrow></msub><mi>x</mi><mi>y</mi></mrow></math>';
  var speech = 'der Logarithmus Basis 10 von, x y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes029
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes029 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mi>log</mi><mrow><mo>(</mo><mrow><mi>x</mi>' +
      '<mo>+</mo><mi>y</mi></mrow><mo>)</mo></mrow><mo>=</mo><mi>log</mi>' +
      '<mi>x</mi><mi>log</mi><mi>y</mi></mrow></math>';
  var speech = 'der Logarithmus von, Klammer auf, x plus y, Klammer zu, ist gleich, Logarithmus x Logarithmus y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes030
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes030 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>5</mn></mtd>' +
      '<mtd><mn>2</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow><mrow>' +
      '<mo>(</mo><mrow><mtable><mtr><mtd><mn>7</mn></mtd><mtd><mn>4</mn>' +
      '</mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>1</mn></mtd></mtr>' +
      '</mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'die 2 mal 2 Matrize. Zeile 1: 1, 3 Zeile 2: 5, 2.   die 2 mal 2 Matrize. Zeile 1: 7, 4 Zeile 2: 0, 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes031
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes031 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mrow><mn>3</mn>' +
      '<mrow><mo>(</mo><mrow><mrow><mo>(</mo><mrow><mn>4</mn><mo>+</mo>' +
      '<mn>5</mn></mrow><mo>)</mo></mrow><mo>+</mo><mn>6</mn></mrow><mo>)' +
      '</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2  , Klammer auf, 3  , Klammer auf, Klammer auf, 4 plus 5, Klammer zu, plus 6, Klammer zu, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes032
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes032 = function() {
  var preference = 'ImpliedTimes_Auto:Paren_SpeakNestingLevel';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mrow><mn>3</mn>' +
      '<mrow><mo>(</mo><mrow><mrow><mo>(</mo><mrow><mn>4</mn><mo>+</mo>' +
      '<mn>5</mn></mrow><mo>)</mo></mrow><mo>+</mo><mn>6</mn></mrow><mo>)' +
      '</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2  , Klammer auf, 3  , zweite Klammer auf, dritte Klammer auf, 4 plus 5, dritte Klammer zu, plus 6, zweite Klammer zu, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes033
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes033 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>[</mo><mrow><mn>3</mn>' +
      '<mrow><mo>(</mo><mrow><mrow><mo>(</mo><mrow><mn>4</mn><mo>+</mo>' +
      '<mn>5</mn></mrow><mo>)</mo></mrow><mo>+</mo><mn>6</mn></mrow><mo>)' +
      '</mo></mrow></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = '2  , eckige Klammer auf, 3  , Klammer auf, Klammer auf, 4 plus 5, Klammer zu, plus 6, Klammer zu, eckige Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes034
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes034 = function() {
  var preference = 'ImpliedTimes_Auto:Paren_SpeakNestingLevel';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>[</mo><mrow><mn>3</mn>' +
      '<mrow><mo>(</mo><mrow><mrow><mo>(</mo><mrow><mn>4</mn><mo>+</mo>' +
      '<mn>5</mn></mrow><mo>)</mo></mrow><mo>+</mo><mn>6</mn></mrow><mo>)' +
      '</mo></mrow></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = '2  , eckige Klammer auf, 3  , Klammer auf, zweite Klammer auf, 4 plus 5, zweite Klammer zu, plus 6, Klammer zu, eckige Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes035
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes035 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>|</mo><mi>x</mi><mo>|</mo>' +
      '</mrow></mrow></math>';
  var speech = '2  , der Betrag von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes036
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes036 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mrow><mo>|</mo><mi>x</mi><mo>|</mo></mrow>' +
      '<mrow><mo>|</mo><mi>y</mi><mo>|</mo></mrow></mrow></math>';
  var speech = 'der Betrag von x,  , der Betrag von y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes037
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes037 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mi>x</mi><mo>+</mo><mn>1' +
      '</mn></mrow><mo>|</mo></mrow><mrow><mo>|</mo><mrow><mi>y</mi><mo>−' +
      '</mo><mn>1</mn></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'der Betrag von x plus 1,  , der Betrag von y minus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes037a
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes037a = function() {
  var preference = 'ImpliedTimes_Auto:AbsoluteValue_AbsEnd';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mi>x</mi><mo>+</mo><mn>1' +
      '</mn></mrow><mo>|</mo></mrow><mrow><mo>|</mo><mrow><mi>y</mi><mo>−' +
      '</mo><mn>1</mn></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'der Betrag von x plus 1, Ende Betrag,  , der Betrag von y minus 1, Ende Betrag';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes038
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes038 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mi>x</mi><mo>+</mo><mn>1' +
      '</mn></mrow><mo>|</mo></mrow><mrow><mo>|</mo><mi>y</mi><mo>|</mo>' +
      '</mrow><mo>−</mo><mn>1</mn></mrow></math>';
  var speech = 'der Betrag von x plus 1,  , der Betrag von y, minus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes0381
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes0381 = function() {
  var preference = 'ImpliedTimes_Auto:AbsoluteValue_AbsEnd';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mi>x</mi><mo>+</mo><mn>1' +
      '</mn></mrow><mo>|</mo></mrow><mrow><mo>|</mo><mi>y</mi><mo>|</mo>' +
      '</mrow><mo>−</mo><mn>1</mn></mrow></math>';
  var speech = 'der Betrag von x plus 1, Ende Betrag,  , der Betrag von y, Ende Betrag, minus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes039
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes039 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mn>3</mn><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = '2   3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes040
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes040 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>[</mo><mn>3</mn><mo>]</mo>' +
      '</mrow></mrow></math>';
  var speech = '2   3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes041
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes041 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><msup><mn>2</mn><mn>4</mn></msup><mrow><mo>(' +
      '</mo><mn>3</mn><mo>)</mo></mrow></mrow></math>';
  var speech = '2 hoch 4,   3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes042
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes042 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mrow><mn>3</mn><mo>+' +
      '</mo><mn>4</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2  , Klammer auf, 3 plus 4, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes043
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes043 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>[</mo><mrow><mn>3</mn><mo>+' +
      '</mo><mn>4</mn></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = '2  , eckige Klammer auf, 3 plus 4, eckige Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes044
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes044 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mrow><mo>(</mo><mn>3</mn><mo>)</mo></mrow>' +
      '<mrow><mo>(</mo><mn>2</mn><mo>)</mo></mrow></mrow></math>';
  var speech = '3   2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes045
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes045 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mn>2</mn><msup><mrow><mrow><mo>(</mo><mrow>' +
      '<mn>3</mn><mo>+</mo><mn>4</mn></mrow><mo>)</mo></mrow></mrow><mn>2' +
      '</mn></msup></mrow></math>';
  var speech = '2  , Klammer auf, 3 plus 4, Klammer zu, Quadrat';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes046
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes046 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mn>2</mn><mo>+</mo><mn>7' +
      '</mn></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mn>3</mn><mo>−' +
      '</mo><mn>6</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'Klammer auf, 2 plus 7, Klammer zu,  , Klammer auf, 3 minus 6, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes047
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes047 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mn>2</mn><mo>+</mo><mn>7' +
      '</mn></mrow><mo>]</mo></mrow><mrow><mo>[</mo><mrow><mn>3</mn><mo>−' +
      '</mo><mn>6</mn></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'eckige Klammer auf, 2 plus 7, eckige Klammer zu,  , eckige Klammer auf, 3 minus 6, eckige Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes048
 */
// TODO: (Simons) x is categorised as function!
sre.ClearspeakGermanImpliedTimes.prototype.untestImpTimes048 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mi>x</mi><mrow><mo>(</mo><mrow><mi>y</mi><mi>z' +
      '</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'XXX';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes049
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes049 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mi>x</mi><mrow><mo>(</mo><mrow><mi>y</mi><mo>+' +
      '</mo><mi>z</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'x  , Klammer auf, y plus z, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes050
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes050 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mrow><mi>y</mi><mo>+' +
      '</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2  , Klammer auf, y plus 1, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes051
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes051 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mo stretchy="false">(</mo><mn>2</mn><mo>−</mo>' +
      '<mn>1</mn><mo stretchy="false">)</mo><mi>x</mi></mrow></math>';
  var speech = 'Klammer auf, 2 minus 1, Klammer zu,   x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes052
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes052 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><msub><mi>p</mi><mn>1</mn></msub><mrow><mo>(' +
      '</mo><mrow><mn>3</mn><mo>+</mo><mn>7</mn></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'p Index 1,  , Klammer auf, 3 plus 7, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes053
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes053 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><msubsup><mi>p</mi><mn>1</mn><mrow><msub><mi>a' +
      '</mi><mn>1</mn></msub></mrow></msubsup><msubsup><mi>p</mi><mn>2</mn>' +
      '<mrow><msub><mi>a</mi><mn>2</mn></msub></mrow></msubsup></mrow></math>';
  var speech = 'p Index 1, hoch, a Index 1,  , p Index 2, hoch, a Index 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes054
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes054 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mi>x</mi>' +
      '<mo>+</mo><mi>y</mi></mrow><mo>)</mo></mrow></mrow><mrow><mo>−</mo>' +
      '<mn>4</mn></mrow></msup><msup><mrow><mrow><mo>(</mo><mrow><mi>x</mi>' +
      '<mo>−</mo><mi>y</mi></mrow><mo>)</mo></mrow></mrow><mrow><mo>−</mo>' +
      '<mn>4</mn></mrow></msup></mrow></math>';
  var speech = 'Klammer auf, x plus y, Klammer zu, hoch minus 4,  , Klammer auf, x minus y, Klammer zu, hoch minus 4';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes055
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes055 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><msup><mn>2</mn><mrow><mn>4</mn><mrow><mo>(' +
      '</mo><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mo>)</mo></mrow>' +
      '</mrow></msup></mrow></math>';
  var speech = '2 hoch 4  , Klammer auf, x plus y, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes056
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes056 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mi>x</mi><mi>y</mi></mrow></math>';
  var speech = 'x   y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes057
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes057 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><msup><mi>x</mi><mn>2</mn></msup><msup><mi>y' +
      '</mi><mn>3</mn></msup></mrow></math>';
  var speech = 'x Quadrat   y Kubik';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes058
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes058 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><msup><mi>x</mi><mrow><mi>y</mi><mo>+</mo><mn>1' +
      '</mn></mrow></msup><msup><mi>x</mi><mrow><mi>y</mi><mo>+</mo><mn>2' +
      '</mn></mrow></msup></mrow></math>';
  var speech = 'x hoch y plus 1,   x hoch y plus 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes059
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes059 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><msqrt><mi>a</mi></msqrt><msqrt><mi>b</mi>' +
      '</msqrt><mo>=</mo><msqrt><mrow><mi>a</mi><mi>b</mi></mrow></msqrt>' +
      '</mrow></math>';
  var speech = 'Quadratwurzel aus a,   Quadratwurzel aus b, ist gleich Quadratwurzel aus a   b';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes060
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes060 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><msqrt><mn>3</mn></msqrt><msqrt><mrow><mn>10' +
      '</mn></mrow></msqrt><mo>=</mo><msqrt><mrow><mn>30</mn></mrow>' +
      '</msqrt></mrow></math>';
  var speech = 'Quadratwurzel aus 3,   Quadratwurzel aus 10, ist gleich Quadratwurzel aus 30';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes061
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes061 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mn>2</mn><msqrt><mn>3</mn></msqrt></mrow></math>';
  var speech = '2   Quadratwurzel aus 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes062
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes062 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mn>1</mn><mo>+</mo><mn>2</mn><msqrt><mn>3</mn>' +
      '</msqrt></mrow></math>';
  var speech = '1 plus 2   Quadratwurzel aus 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes063
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes063 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mi>f</mi><mo stretchy="false">(</mo><mi>x</mi>' +
      '<mo stretchy="false">)</mo><mo>=</mo><msup><mi>x</mi><mn>2</mn>' +
      '</msup><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'f von x, ist gleich x Quadrat  , Klammer auf, x plus 1, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes064
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes064 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimesAnd:Functions_None';
  var mathml = '<math><mrow><mi>f</mi><mo stretchy="false">(</mo><mi>x</mi>' +
      '<mo stretchy="false">)</mo><mo>=</mo><msup><mi>x</mi><mn>2</mn>' +
      '</msup><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'f mal x, ist gleich x Quadrat  , Klammer auf, x plus 1, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes065
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes065 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mi>sin</mi><mi>x</mi><mi>cos</mi><mi>y</mi>' +
      '<mo>+</mo><mi>cos</mi><mi>x</mi><mi>sin</mi><mi>y</mi></mrow></math>';
  var speech = 'Sinus x,   Kosinus y plus Kosinus x,   Sinus y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes065a
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes065a = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><mi>x</mi>' +
      '<mo>+</mo><mi>y</mi></mrow><mo>)</mo></mrow><mi>cos</mi><mrow><mo>(' +
      '</mo><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'der Sinus von, Klammer auf, x plus y, Klammer zu,  , der Kosinus von, Klammer auf, x plus y, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes066
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes066 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><msub><mrow><mi>log</mi></mrow><mrow><mn>10' +
      '</mn></mrow></msub><mi>x</mi><mi>y</mi></mrow></math>';
  var speech = 'der Logarithmus Basis 10 von, x   y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes067
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes067 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mi>log</mi><mrow><mo>(</mo><mrow><mi>x</mi>' +
      '<mo>+</mo><mi>y</mi></mrow><mo>)</mo></mrow><mo>=</mo><mi>log</mi>' +
      '<mi>x</mi><mi>log</mi><mi>y</mi></mrow></math>';
  var speech = 'der Logarithmus von, Klammer auf, x plus y, Klammer zu, ist gleich Logarithmus x,   Logarithmus y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes068
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes068 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>5</mn></mtd>' +
      '<mtd><mn>2</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow><mrow>' +
      '<mo>(</mo><mrow><mtable><mtr><mtd><mn>7</mn></mtd><mtd><mn>4</mn>' +
      '</mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>1</mn></mtd></mtr>' +
      '</mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'die 2 mal 2 Matrize. Zeile 1: 1, 3 Zeile 2: 5, 2.   die 2 mal 2 Matrize. Zeile 1: 7, 4 Zeile 2: 0, 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes069
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes069 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mrow><mn>3</mn>' +
      '<mrow><mo>(</mo><mrow><mrow><mo>(</mo><mrow><mn>4</mn><mo>+</mo>' +
      '<mn>5</mn></mrow><mo>)</mo></mrow><mo>+</mo><mn>6</mn></mrow><mo>)' +
      '</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2  , Klammer auf, 3  , Klammer auf, Klammer auf, 4 plus 5, Klammer zu, plus 6, Klammer zu, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes070
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes070 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes:Paren_SpeakNestingLevel';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mrow><mn>3</mn>' +
      '<mrow><mo>(</mo><mrow><mrow><mo>(</mo><mrow><mn>4</mn><mo>+</mo>' +
      '<mn>5</mn></mrow><mo>)</mo></mrow><mo>+</mo><mn>6</mn></mrow><mo>)' +
      '</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2  , Klammer auf, 3  , zweite Klammer auf, dritte Klammer auf, 4 plus 5, dritte Klammer zu, plus 6, zweite Klammer zu, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes070a
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes070a = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>[</mo><mrow><mn>3</mn>' +
      '<mrow><mo>(</mo><mrow><mrow><mo>(</mo><mrow><mn>4</mn><mo>+</mo>' +
      '<mn>5</mn></mrow><mo>)</mo></mrow><mo>+</mo><mn>6</mn></mrow><mo>)' +
      '</mo></mrow></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = '2  , eckige Klammer auf, 3  , Klammer auf, Klammer auf, 4 plus 5, Klammer zu, plus 6, Klammer zu, eckige Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes071
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes071 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes:Paren_SpeakNestingLevel';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>[</mo><mrow><mn>3</mn>' +
      '<mrow><mo>(</mo><mrow><mrow><mo>(</mo><mrow><mn>4</mn><mo>+</mo>' +
      '<mn>5</mn></mrow><mo>)</mo></mrow><mo>+</mo><mn>6</mn></mrow><mo>)' +
      '</mo></mrow></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = '2  , eckige Klammer auf, 3  , Klammer auf, zweite Klammer auf, 4 plus 5, zweite Klammer zu, plus 6, Klammer zu, eckige Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes072
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes072 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>|</mo><mi>x</mi><mo>|</mo>' +
      '</mrow></mrow></math>';
  var speech = '2  , der Betrag von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes073
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes073 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mrow><mo>|</mo><mi>x</mi><mo>|</mo></mrow>' +
      '<mrow><mo>|</mo><mi>y</mi><mo>|</mo></mrow></mrow></math>';
  var speech = 'der Betrag von x,  , der Betrag von y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes074
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes074 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mi>x</mi><mo>+</mo><mn>1' +
      '</mn></mrow><mo>|</mo></mrow><mrow><mo>|</mo><mrow><mi>y</mi><mo>−' +
      '</mo><mn>1</mn></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'der Betrag von x plus 1,  , der Betrag von y minus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes074a
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes074a = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes:AbsoluteValue_AbsEnd';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mi>x</mi><mo>+</mo><mn>1' +
      '</mn></mrow><mo>|</mo></mrow><mrow><mo>|</mo><mrow><mi>y</mi><mo>−' +
      '</mo><mn>1</mn></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'der Betrag von x plus 1, Ende Betrag,  , der Betrag von y minus 1, Ende Betrag';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes075
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes075 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mi>x</mi><mo>+</mo><mn>1' +
      '</mn></mrow><mo>|</mo></mrow><mrow><mo>|</mo><mi>y</mi><mo>|</mo>' +
      '</mrow><mo>−</mo><mn>1</mn></mrow></math>';
  var speech = 'der Betrag von x plus 1,  , der Betrag von y, minus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes076
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes076 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes:AbsoluteValue_AbsEnd';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mi>x</mi><mo>+</mo><mn>1' +
      '</mn></mrow><mo>|</mo></mrow><mrow><mo>|</mo><mi>y</mi><mo>|</mo>' +
      '</mrow><mo>−</mo><mn>1</mn></mrow></math>';
  var speech = 'der Betrag von x plus 1, Ende Betrag,  , der Betrag von y, Ende Betrag, minus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes077
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes077 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mn>3</mn><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = '2, Klammer auf, 3, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes078
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes078 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>[</mo><mn>3</mn><mo>]</mo>' +
      '</mrow></mrow></math>';
  var speech = '2, eckige Klammer auf, 3, eckige Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes079
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes079 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><msup><mn>2</mn><mn>4</mn></msup><mrow><mo>(' +
      '</mo><mn>3</mn><mo>)</mo></mrow></mrow></math>';
  var speech = '2 hoch 4, Klammer auf, 3, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes080
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes080 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mrow><mn>3</mn><mo>+' +
      '</mo><mn>4</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2, Klammer auf, 3 plus 4, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes081
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes081 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>[</mo><mrow><mn>3</mn><mo>+' +
      '</mo><mn>4</mn></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = '2, eckige Klammer auf, 3 plus 4, eckige Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes082
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes082 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mrow><mo>(</mo><mn>3</mn><mo>)</mo></mrow>' +
      '<mrow><mo>(</mo><mn>2</mn><mo>)</mo></mrow></mrow></math>';
  var speech = 'Klammer auf, 3, Klammer zu, Klammer auf, 2, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes083
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes083 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mn>2</mn><msup><mrow><mrow><mo>(</mo><mrow>' +
      '<mn>3</mn><mo>+</mo><mn>4</mn></mrow><mo>)</mo></mrow></mrow><mn>2' +
      '</mn></msup></mrow></math>';
  var speech = '2, Klammer auf, 3 plus 4, Klammer zu, Quadrat';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes084
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes084 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mn>2</mn><mo>+</mo><mn>7' +
      '</mn></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mn>3</mn><mo>−' +
      '</mo><mn>6</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'Klammer auf, 2 plus 7, Klammer zu, Klammer auf, 3 minus 6, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes085
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes085 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mn>2</mn><mo>+</mo><mn>7' +
      '</mn></mrow><mo>]</mo></mrow><mrow><mo>[</mo><mrow><mn>3</mn><mo>−' +
      '</mo><mn>6</mn></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'eckige Klammer auf, 2 plus 7, eckige Klammer zu, eckige Klammer auf, 3 minus 6, eckige Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


// TODO: (Simons) x is categorised as function!
/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes086
 */
sre.ClearspeakGermanImpliedTimes.prototype.untestImpTimes086 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mi>x</mi><mrow><mo>(</mo><mrow><mi>y</mi><mi>z' +
      '</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'XXX';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes087
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes087 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mi>x</mi><mrow><mo>(</mo><mrow><mi>y</mi><mo>+' +
      '</mo><mi>z</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'x, Klammer auf, y plus z, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes088
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes088 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mrow><mi>y</mi><mo>+' +
      '</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2, Klammer auf, y plus 1, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes089
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes089 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mo stretchy="false">(</mo><mn>2</mn><mo>−</mo>' +
      '<mn>1</mn><mo stretchy="false">)</mo><mi>x</mi></mrow></math>';
  var speech = 'Klammer auf, 2 minus 1, Klammer zu, x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes090
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes090 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><msub><mi>p</mi><mn>1</mn></msub><mrow><mo>(' +
      '</mo><mrow><mn>3</mn><mo>+</mo><mn>7</mn></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'p Index 1, Klammer auf, 3 plus 7, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes091
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes091 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><msubsup><mi>p</mi><mn>1</mn><mrow><msub><mi>a' +
      '</mi><mn>1</mn></msub></mrow></msubsup><msubsup><mi>p</mi><mn>2</mn>' +
      '<mrow><msub><mi>a</mi><mn>2</mn></msub></mrow></msubsup></mrow></math>';
  var speech = 'p Index 1, hoch, a Index 1, p Index 2, hoch, a Index 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes092
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes092 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mi>x</mi>' +
      '<mo>+</mo><mi>y</mi></mrow><mo>)</mo></mrow></mrow><mrow><mo>−</mo>' +
      '<mn>4</mn></mrow></msup><msup><mrow><mrow><mo>(</mo><mrow><mi>x</mi>' +
      '<mo>−</mo><mi>y</mi></mrow><mo>)</mo></mrow></mrow><mrow><mo>−</mo>' +
      '<mn>4</mn></mrow></msup></mrow></math>';
  var speech = 'Klammer auf, x plus y, Klammer zu, hoch minus 4, Klammer auf, x minus y, Klammer zu, hoch minus 4';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes093
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes093 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><msup><mn>2</mn><mrow><mn>4</mn><mrow><mo>(' +
      '</mo><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mo>)</mo></mrow>' +
      '</mrow></msup></mrow></math>';
  var speech = '2 hoch 4, Klammer auf, x plus y, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes094
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes094 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mi>x</mi><mi>y</mi></mrow></math>';
  var speech = 'x y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes095
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes095 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><msup><mi>x</mi><mn>2</mn></msup><msup><mi>y' +
      '</mi><mn>3</mn></msup></mrow></math>';
  var speech = 'x Quadrat y Kubik';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes096
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes096 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><msup><mi>x</mi><mrow><mi>y</mi><mo>+</mo><mn>1' +
      '</mn></mrow></msup><msup><mi>x</mi><mrow><mi>y</mi><mo>+</mo><mn>2' +
      '</mn></mrow></msup></mrow></math>';
  var speech = 'x hoch y plus 1, x hoch y plus 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes097
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes097 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><msqrt><mi>a</mi></msqrt><msqrt><mi>b</mi>' +
      '</msqrt><mo>=</mo><msqrt><mrow><mi>a</mi><mi>b</mi></mrow></msqrt>' +
      '</mrow></math>';
  var speech = 'Quadratwurzel aus a, Quadratwurzel aus b, ist gleich Quadratwurzel aus a b';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes098
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes098 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><msqrt><mn>3</mn></msqrt><msqrt><mrow><mn>10' +
      '</mn></mrow></msqrt><mo>=</mo><msqrt><mrow><mn>30</mn></mrow>' +
      '</msqrt></mrow></math>';
  var speech = 'Quadratwurzel aus 3, Quadratwurzel aus 10, ist gleich Quadratwurzel aus 30';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes099
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes099 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mn>2</mn><msqrt><mn>3</mn></msqrt></mrow></math>';
  var speech = '2 Quadratwurzel aus 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes100
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes100 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mn>1</mn><mo>+</mo><mn>2</mn><msqrt><mn>3</mn>' +
      '</msqrt></mrow></math>';
  var speech = '1 plus 2 Quadratwurzel aus 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes101
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes101 = function() {
  var preference = 'ImpliedTimes_None:Functions_Auto';
  var mathml = '<math><mrow><mi>f</mi><mo stretchy="false">(</mo><mi>x</mi>' +
      '<mo stretchy="false">)</mo><mo>=</mo><msup><mi>x</mi><mn>2</mn>' +
      '</msup><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'f von x, ist gleich x Quadrat, Klammer auf, x plus 1, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


// TODO: (Simons) Need to be able to specify excluded preferences.
/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes102
 */
sre.ClearspeakGermanImpliedTimes.prototype.untestImpTimes102 = function() {
  var preference = 'ImpliedTimes_None:Functions_None';
  var mathml = '<math><mrow><mi>f</mi><mo stretchy="false">(</mo><mi>x</mi>' +
      '<mo stretchy="false">)</mo><mo>=</mo><msup><mi>x</mi><mn>2</mn>' +
      '</msup><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'XXX';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes103
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes103 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mi>sin</mi><mi>x</mi><mi>cos</mi><mi>y</mi>' +
      '<mo>+</mo><mi>cos</mi><mi>x</mi><mi>sin</mi><mi>y</mi></mrow></math>';
  var speech = 'Sinus x Kosinus y, plus, Kosinus x Sinus y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes104
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes104 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><msub><mrow><mi>log</mi></mrow><mrow><mn>10' +
      '</mn></mrow></msub><mi>x</mi><mi>y</mi></mrow></math>';
  var speech = 'der Logarithmus Basis 10 von, x y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes105
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes105 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mi>log</mi><mrow><mo>(</mo><mrow><mi>x</mi>' +
      '<mo>+</mo><mi>y</mi></mrow><mo>)</mo></mrow><mo>=</mo><mi>log</mi>' +
      '<mi>x</mi><mi>log</mi><mi>y</mi></mrow></math>';
  var speech = 'der Logarithmus von, Klammer auf, x plus y, Klammer zu, ist gleich, Logarithmus x Logarithmus y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes106
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes106 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>5</mn></mtd>' +
      '<mtd><mn>2</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow><mrow>' +
      '<mo>(</mo><mrow><mtable><mtr><mtd><mn>7</mn></mtd><mtd><mn>4</mn>' +
      '</mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>1</mn></mtd></mtr>' +
      '</mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'die 2 mal 2 Matrize. Zeile 1: 1, 3 Zeile 2: 5, 2. die 2 mal 2 Matrize. Zeile 1: 7, 4 Zeile 2: 0, 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes107
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes107 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mrow><mn>3</mn>' +
      '<mrow><mo>(</mo><mrow><mrow><mo>(</mo><mrow><mn>4</mn><mo>+</mo>' +
      '<mn>5</mn></mrow><mo>)</mo></mrow><mo>+</mo><mn>6</mn></mrow><mo>)' +
      '</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2, Klammer auf, 3, Klammer auf, Klammer auf, 4 plus 5, Klammer zu, plus 6, Klammer zu, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes108
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes108 = function() {
  var preference = 'ImpliedTimes_None:Paren_SpeakNestingLevel';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mrow><mn>3</mn>' +
      '<mrow><mo>(</mo><mrow><mrow><mo>(</mo><mrow><mn>4</mn><mo>+</mo>' +
      '<mn>5</mn></mrow><mo>)</mo></mrow><mo>+</mo><mn>6</mn></mrow><mo>)' +
      '</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2, Klammer auf, 3, zweite Klammer auf, dritte Klammer auf, 4 plus 5, dritte Klammer zu, plus 6, zweite Klammer zu, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes109
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes109 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>[</mo><mrow><mn>3</mn>' +
      '<mrow><mo>(</mo><mrow><mrow><mo>(</mo><mrow><mn>4</mn><mo>+</mo>' +
      '<mn>5</mn></mrow><mo>)</mo></mrow><mo>+</mo><mn>6</mn></mrow><mo>)' +
      '</mo></mrow></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = '2, eckige Klammer auf, 3, Klammer auf, Klammer auf, 4 plus 5, Klammer zu, plus 6, Klammer zu, eckige Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes110
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes110 = function() {
  var preference = 'ImpliedTimes_None:Paren_SpeakNestingLevel';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>[</mo><mrow><mn>3</mn>' +
      '<mrow><mo>(</mo><mrow><mrow><mo>(</mo><mrow><mn>4</mn><mo>+</mo>' +
      '<mn>5</mn></mrow><mo>)</mo></mrow><mo>+</mo><mn>6</mn></mrow><mo>)' +
      '</mo></mrow></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = '2, eckige Klammer auf, 3, Klammer auf, zweite Klammer auf, 4 plus 5, zweite Klammer zu, plus 6, Klammer zu, eckige Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes111
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes111 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>|</mo><mi>x</mi><mo>|</mo>' +
      '</mrow></mrow></math>';
  var speech = '2, der Betrag von x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes112
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes112 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mrow><mo>|</mo><mi>x</mi><mo>|</mo></mrow>' +
      '<mrow><mo>|</mo><mi>y</mi><mo>|</mo></mrow></mrow></math>';
  var speech = 'der Betrag von x, der Betrag von y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes113
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes113 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mi>x</mi><mo>+</mo><mn>1' +
      '</mn></mrow><mo>|</mo></mrow><mrow><mo>|</mo><mrow><mi>y</mi><mo>−' +
      '</mo><mn>1</mn></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'der Betrag von x plus 1, der Betrag von y minus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimes114
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimes114 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mi>x</mi><mo>+</mo><mn>1' +
      '</mn></mrow><mo>|</mo></mrow><mrow><mo>|</mo><mi>y</mi><mo>|</mo>' +
      '</mrow><mo>−</mo><mn>1</mn></mrow></math>';
  var speech = 'der Betrag von x plus 1, der Betrag von y, minus 1';
  this.executeRuleTest(mathml, speech, preference);
};


//
// No Implied Times and Silent Parenthesis Preferences both set
//


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimesSilPar001
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimesSilPar001 = function() {
  var preference = 'ImpliedTimes_None:Paren_Silent';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mn>3</mn><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = '2, Klammer auf, 3, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimesSilPar002
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimesSilPar002 = function() {
  var preference = 'ImpliedTimes_None:Paren_Silent';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>[</mo><mn>3</mn><mo>]</mo>' +
      '</mrow></mrow></math>';
  var speech = '2, eckige Klammer auf, 3, eckige Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimesSilPar003
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimesSilPar003 = function() {
  var preference = 'ImpliedTimes_None:Paren_Silent';
  var mathml = '<math><mrow><msup><mn>2</mn><mn>4</mn></msup><mrow><mo>(' +
      '</mo><mn>3</mn><mo>)</mo></mrow></mrow></math>';
  var speech = '2 hoch 4, Klammer auf, 3, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimesSilPar004
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimesSilPar004 = function() {
  var preference = 'ImpliedTimes_None:Paren_Silent';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mrow><mn>3</mn><mo>+' +
      '</mo><mn>4</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2, Klammer auf, 3 plus 4, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimesSilPar005
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimesSilPar005 = function() {
  var preference = 'ImpliedTimes_None:Paren_Silent';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>[</mo><mrow><mn>3</mn><mo>+' +
      '</mo><mn>4</mn></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = '2, eckige Klammer auf, 3 plus 4, eckige Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimesSilPar006
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimesSilPar006 = function() {
  var preference = 'ImpliedTimes_None:Paren_Silent';
  var mathml = '<math><mrow><mrow><mo>(</mo><mn>3</mn><mo>)</mo></mrow>' +
      '<mrow><mo>(</mo><mn>2</mn><mo>)</mo></mrow></mrow></math>';
  var speech = 'Klammer auf, 3, Klammer zu, Klammer auf, 2, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimesSilPar007
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimesSilPar007 = function() {
  var preference = 'ImpliedTimes_None:Paren_Silent';
  var mathml = '<math><mrow><mn>2</mn><msup><mrow><mrow><mo>(</mo><mrow>' +
      '<mn>3</mn><mo>+</mo><mn>4</mn></mrow><mo>)</mo></mrow></mrow><mn>2' +
      '</mn></msup></mrow></math>';
  var speech = '2, Klammer auf, 3 plus 4, Klammer zu, Quadrat';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimesSilPar008
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimesSilPar008 = function() {
  var preference = 'ImpliedTimes_None:Paren_Silent';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mn>2</mn><mo>+</mo><mn>7' +
      '</mn></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mn>3</mn><mo>−' +
      '</mo><mn>6</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'Klammer auf, 2 plus 7, Klammer zu, Klammer auf, 3 minus 6, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimesSilPar009
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimesSilPar009 = function() {
  var preference = 'ImpliedTimes_None:Paren_Silent';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mn>2</mn><mo>+</mo><mn>7' +
      '</mn></mrow><mo>]</mo></mrow><mrow><mo>[</mo><mrow><mn>3</mn><mo>−' +
      '</mo><mn>6</mn></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'eckige Klammer auf, 2 plus 7, eckige Klammer zu, eckige Klammer auf, 3 minus 6, eckige Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


// TODO: (Simons) x is categorised as function!
/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimesSilPar010
 */
sre.ClearspeakGermanImpliedTimes.prototype.untestImpTimesSilPar010 = function() {
  var preference = 'ImpliedTimes_None:Paren_Silent';
  var mathml = '<math><mrow><mi>x</mi><mrow><mo>(</mo><mrow><mi>y</mi><mi>z' +
      '</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'XXX';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimesSilPar011
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimesSilPar011 = function() {
  var preference = 'ImpliedTimes_None:Paren_Silent';
  var mathml = '<math><mrow><mi>x</mi><mrow><mo>(</mo><mrow><mi>y</mi><mo>+' +
      '</mo><mi>z</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'x, Klammer auf, y plus z, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimesSilPar012
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimesSilPar012 = function() {
  var preference = 'ImpliedTimes_None:Paren_Silent';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mrow><mi>y</mi><mo>+' +
      '</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2, Klammer auf, y plus 1, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimesSilPar013
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimesSilPar013 = function() {
  var preference = 'ImpliedTimes_None:Paren_Silent';
  var mathml = '<math><mrow><mo stretchy="false">(</mo><mn>2</mn><mo>−</mo>' +
      '<mn>1</mn><mo stretchy="false">)</mo><mi>x</mi></mrow></math>';
  var speech = 'Klammer auf, 2 minus 1, Klammer zu, x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimesSilPar014
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimesSilPar014 = function() {
  var preference = 'ImpliedTimes_None:Paren_Silent';
  var mathml = '<math><mrow><msub><mi>p</mi><mn>1</mn></msub><mrow><mo>(' +
      '</mo><mrow><mn>3</mn><mo>+</mo><mn>7</mn></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'p Index 1, Klammer auf, 3 plus 7, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimesSilPar015
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimesSilPar015 = function() {
  var preference = 'ImpliedTimes_None:Paren_Silent';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mi>x</mi>' +
      '<mo>+</mo><mi>y</mi></mrow><mo>)</mo></mrow></mrow><mrow><mo>−</mo>' +
      '<mn>4</mn></mrow></msup><msup><mrow><mrow><mo>(</mo><mrow><mi>x</mi>' +
      '<mo>−</mo><mi>y</mi></mrow><mo>)</mo></mrow></mrow><mrow><mo>−</mo>' +
      '<mn>4</mn></mrow></msup></mrow></math>';
  var speech = 'Klammer auf, x plus y, Klammer zu, hoch minus 4, Klammer auf, x minus y, Klammer zu, hoch minus 4';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimesSilPar016
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimesSilPar016 = function() {
  var preference = 'ImpliedTimes_None:Paren_Silent';
  var mathml = '<math><mrow><msup><mn>2</mn><mrow><mn>4</mn><mrow><mo>(' +
      '</mo><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mo>)</mo></mrow>' +
      '</mrow></msup></mrow></math>';
  var speech = '2 hoch 4, Klammer auf, x plus y, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimesSilPar017
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimesSilPar017 = function() {
  var preference = 'ImpliedTimes_None';
  // preference = 'Paren_Silent';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mi>f</mi><mo stretchy="false">(</mo><mi>x</mi>' +
      '<mo stretchy="false">)</mo><mo>=</mo><msup><mi>x</mi><mn>2</mn>' +
      '</msup><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'f von x, ist gleich x Quadrat, Klammer auf, x plus 1, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


// TODO: (Simons) Need to be able to specify excluded preferences.
/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimesSilPar018
 */
sre.ClearspeakGermanImpliedTimes.prototype.untestImpTimesSilPar018 = function() {
  var preference = 'ImpliedTimes_None:Paren_Silent:Functions_None';
  var mathml = '<math><mrow><mi>f</mi><mo stretchy="false">(</mo><mi>x</mi>' +
      '<mo stretchy="false">)</mo><mo>=</mo><msup><mi>x</mi><mn>2</mn>' +
      '</msup><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'XXX';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimesSilPar019
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimesSilPar019 = function() {
  var preference = 'ImpliedTimes_None';
  // preference = 'Paren_Silent';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mi>log</mi><mrow><mo>(</mo><mrow><mi>x</mi>' +
      '<mo>+</mo><mi>y</mi></mrow><mo>)</mo></mrow><mo>=</mo><mi>log</mi>' +
      '<mi>x</mi><mi>log</mi><mi>y</mi></mrow></math>';
  var speech = 'der Logarithmus von, Klammer auf, x plus y, Klammer zu, ist gleich, Logarithmus x Logarithmus y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimesSilPar020
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimesSilPar020 = function() {
  var preference = 'ImpliedTimes_None:Paren_Silent';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>5</mn></mtd>' +
      '<mtd><mn>2</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow><mrow>' +
      '<mo>(</mo><mrow><mtable><mtr><mtd><mn>7</mn></mtd><mtd><mn>4</mn>' +
      '</mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>1</mn></mtd></mtr>' +
      '</mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'die 2 mal 2 Matrize. Zeile 1: 1, 3 Zeile 2: 5, 2. die 2 mal 2 Matrize. Zeile 1: 7, 4 Zeile 2: 0, 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimesSilPar021
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimesSilPar021 = function() {
  var preference = 'ImpliedTimes_None:Paren_Silent';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mrow><mn>3</mn>' +
      '<mrow><mo>(</mo><mrow><mrow><mo>(</mo><mrow><mn>4</mn><mo>+</mo>' +
      '<mn>5</mn></mrow><mo>)</mo></mrow><mo>+</mo><mn>6</mn></mrow><mo>)' +
      '</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2, Klammer auf, 3, Klammer auf, Klammer auf, 4 plus 5, Klammer zu, plus 6, Klammer zu, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimesSilPar022
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimesSilPar022 = function() {
  var preference = 'ImpliedTimes_None:Paren_SpeakNestingLevel';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mrow><mn>3</mn>' +
      '<mrow><mo>(</mo><mrow><mrow><mo>(</mo><mrow><mn>4</mn><mo>+</mo>' +
      '<mn>5</mn></mrow><mo>)</mo></mrow><mo>+</mo><mn>6</mn></mrow><mo>)' +
      '</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2, Klammer auf, 3, zweite Klammer auf, dritte Klammer auf, 4 plus 5, dritte Klammer zu, plus 6, zweite Klammer zu, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimesSilPar023
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimesSilPar023 = function() {
  var preference = 'ImpliedTimes_None:Paren_Silent';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>[</mo><mrow><mn>3</mn>' +
      '<mrow><mo>(</mo><mrow><mrow><mo>(</mo><mrow><mn>4</mn><mo>+</mo>' +
      '<mn>5</mn></mrow><mo>)</mo></mrow><mo>+</mo><mn>6</mn></mrow><mo>)' +
      '</mo></mrow></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = '2, eckige Klammer auf, 3, Klammer auf, Klammer auf, 4 plus 5, Klammer zu, plus 6, Klammer zu, eckige Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example ImpTimesSilPar024
 */
sre.ClearspeakGermanImpliedTimes.prototype.testImpTimesSilPar024 = function() {
  var preference = 'ImpliedTimes_None:Paren_SpeakNestingLevel';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>[</mo><mrow><mn>3</mn>' +
      '<mrow><mo>(</mo><mrow><mrow><mo>(</mo><mrow><mn>4</mn><mo>+</mo>' +
      '<mn>5</mn></mrow><mo>)</mo></mrow><mo>+</mo><mn>6</mn></mrow><mo>)' +
      '</mo></mrow></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = '2, eckige Klammer auf, 3, Klammer auf, zweite Klammer auf, 4 plus 5, zweite Klammer zu, plus 6, Klammer zu, eckige Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


//
// Implied Times, Functions, or Something Else
//

// TODO: QUESTION What is exact speech? From MathType?
//
//       There is no preference ImpliedTimes_Rules. Reverted to Implied
//       Times_Auto.


/**
 * Testing ClearspeakGermanImpliedTimes Example Extra001
 */
sre.ClearspeakGermanImpliedTimes.prototype.testExtra001 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mi>A</mi><mo>=</mo><mi>h</mi><mrow><mo>(</mo>' +
      '<mrow><mfrac><mrow><msub><mi>b</mi><mn>1</mn></msub><mo>+</mo><msub>' +
      '<mi>b</mi><mn>2</mn></msub></mrow><mn>2</mn></mfrac></mrow><mo>)' +
      '</mo></mrow></mrow></math>';
  var speech = 'A ist gleich h von, Klammer auf, Bruch mit Zähler, b Index 1, plus, b Index 2, und Nenner 2, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example Extra002
 */
sre.ClearspeakGermanImpliedTimes.prototype.testExtra002 = function() {
  var preference = 'ImpliedTimes_Auto:Functions_None';
  var mathml = '<math><mrow><mi>A</mi><mo>=</mo><mi>h</mi><mrow><mo>(</mo>' +
      '<mrow><mfrac><mrow><msub><mi>b</mi><mn>1</mn></msub><mo>+</mo><msub>' +
      '<mi>b</mi><mn>2</mn></msub></mrow><mn>2</mn></mfrac></mrow><mo>)' +
      '</mo></mrow></mrow></math>';
  var speech = 'A ist gleich, h mal, Klammer auf, Bruch mit Zähler, b Index 1, plus, b Index 2, und Nenner 2, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example Extra003
 */
sre.ClearspeakGermanImpliedTimes.prototype.testExtra003 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mi>a</mi><mrow><mo>(</mo><mn>0</mn><mo>)</mo>' +
      '</mrow><mo>=</mo><mn>0</mn><mrow><mo>(</mo><mi>a</mi><mo>)</mo>' +
      '</mrow><mo>=</mo><mn>0</mn></mrow></math>';
  var speech = 'a von 0, ist gleich 0   a ist gleich 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example Extra004
 */
sre.ClearspeakGermanImpliedTimes.prototype.testExtra004 = function() {
  var preference = 'ImpliedTimes_Auto:Functions_None';
  var mathml = '<math><mrow><mi>a</mi><mrow><mo>(</mo><mn>0</mn><mo>)</mo>' +
      '</mrow><mo>=</mo><mn>0</mn><mrow><mo>(</mo><mi>a</mi><mo>)</mo>' +
      '</mrow><mo>=</mo><mn>0</mn></mrow></math>';
  var speech = 'a mal 0, ist gleich 0   a ist gleich 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example Extra005
 */
sre.ClearspeakGermanImpliedTimes.prototype.testExtra005 = function() {
  var preference = 'ImpliedTimes_Auto';
  preference = 'Functions_None';
  var mathml = '<math><mrow><mi>a</mi><mrow><mo>(</mo><mrow><mo>−</mo><mn>1' +
      '</mn></mrow><mo>)</mo></mrow><mo>=</mo><mo>−</mo><mi>a</mi></mrow>' +
      '</math>';
  var speech = 'a mal minus 1, ist gleich minus a';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example Extra006
 */
sre.ClearspeakGermanImpliedTimes.prototype.testExtra006 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mi>a</mi><mrow><mo>(</mo><mrow><mo>−</mo><mn>1' +
      '</mn></mrow><mo>)</mo></mrow><mo>=</mo><mo>−</mo><mi>a</mi></mrow>' +
      '</math>';
  var speech = 'a von minus 1, ist gleich minus a';
  this.executeRuleTest(mathml, speech, preference);
};


// TODO: (Simons) a is categorised as function!
/**
 * Testing ClearspeakGermanImpliedTimes Example Extra007
 */
sre.ClearspeakGermanImpliedTimes.prototype.untestExtra007 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mi>a</mi><mrow><mo>(</mo><mrow><mi>b</mi><mi>c' +
      '</mi></mrow><mo>)</mo></mrow><mo>=</mo><mrow><mo>(</mo><mrow><mi>a' +
      '</mi><mi>b</mi></mrow><mo>)</mo></mrow><mi>c</mi></mrow></math>';
  var speech = 'XXX';
  this.executeRuleTest(mathml, speech, preference);
};


// TODO: (Simons) a is categorised as function!
/**
 * Testing ClearspeakGermanImpliedTimes Example Extra008
 */
sre.ClearspeakGermanImpliedTimes.prototype.untestExtra008 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mi>a</mi><mrow><mo>(</mo><mrow><mfrac><mn>1' +
      '</mn><mi>a</mi></mfrac></mrow><mo>)</mo></mrow><mo>=</mo><mn>1</mn>' +
      '</mrow></math>';
  var speech = 'XXX';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example Extra009
 */
sre.ClearspeakGermanImpliedTimes.prototype.testExtra009 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math style="background-color:#"> <semantics>  <mrow>   ' +
      '<mo>−</mo><mi>u</mi><mrow><mo>(</mo>    <mi>v</mi>   <mo>)</mo>' +
      '</mrow><mo>=</mo><mi>u</mi><mrow><mo>(</mo>    <mrow>     <mo>−</mo>' +
      '<mi>v</mi></mrow>   <mo>)</mo></mrow><mo>=</mo><mo>−</mo><mrow><mo>(' +
      '</mo>    <mrow>     <mi>u</mi><mi>v</mi></mrow>   <mo>)</mo></mrow>' +
      '</mrow>   </semantics></math>';
  var speech = 'minus u von v, ist gleich u von minus v, ist gleich minus u von v';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example Extra010
 */
sre.ClearspeakGermanImpliedTimes.prototype.testExtra010 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mi>B</mi><mrow><mo>(</mo><mrow><mn>2</mn><mo>,' +
      '</mo><mn>6</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'B von, Klammer auf, 2 Komma 6, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example Extra012
 */
sre.ClearspeakGermanImpliedTimes.prototype.testExtra012 = function() {
  var preference = 'ImpliedTimes_Auto:Functions_None';
  var mathml = '<math><mrow><mi>B</mi><mrow><mo>(</mo><mrow><mn>2</mn><mo>,' +
      '</mo><mn>6</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'B mal, Klammer auf, 2 Komma 6, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


// TODO: (Simons) Explore exact speech.
/**
 * Testing ClearspeakGermanImpliedTimes Example Extra013
 */
sre.ClearspeakGermanImpliedTimes.prototype.untestExtra013 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mi>B</mi><mrow><mo>(</mo><mrow><mn>2</mn><mo>,' +
      '</mo><mn>6</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'XXX';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example Extra014
 */
sre.ClearspeakGermanImpliedTimes.prototype.testExtra014 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mi>p</mi><mrow><mo>(</mo><mi>w</mi><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'p von w';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example Extra015
 */
sre.ClearspeakGermanImpliedTimes.prototype.testExtra015 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mi>x</mi><mrow><mo>(</mo><mi>t</mi><mo>)</mo>' +
      '</mrow><mo>=</mo><mn>2</mn><mi>t</mi><mo>+</mo><mn>4</mn></mrow></math>';
  var speech = 'x von t, ist gleich 2 t, plus 4';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example Extra016
 */
sre.ClearspeakGermanImpliedTimes.prototype.testExtra016 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mi>k</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow><mo>=</mo><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>3' +
      '</mn></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mi>x</mi><mo>−' +
      '</mo><mn>5</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'k von x, ist gleich, Klammer auf, x plus 3, Klammer zu,  , Klammer auf, x minus 5, Klammer zu';
  this.executeRuleTest(mathml, speech, preference);
};


// TODO: (Simons) a is categorised as function!
/**
 * Testing ClearspeakGermanImpliedTimes Example Extra017
 */
sre.ClearspeakGermanImpliedTimes.prototype.untestExtra017 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mn>3</mn><msup><mi>a</mi><mn>2</mn></msup>' +
      '<mo>−</mo><mn>12</mn><mi>a</mi><mo>=</mo><mn>3</mn><mi>a</mi><mrow>' +
      '<mo>(</mo><mi>a</mi><mo>)</mo></mrow><mo>−</mo><mn>3</mn><mi>a</mi>' +
      '<mrow><mo>(</mo><mn>4</mn><mo>)</mo></mrow></mrow></math>';
  var speech = 'XXX';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example Extra018
 */
sre.ClearspeakGermanImpliedTimes.prototype.testExtra018 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mi>T</mi><mrow><mo>(</mo><mi>t</mi><mo>)</mo>' +
      '</mrow><mo>=</mo><msub><mi>T</mi><mi>s</mi></msub><mo>+</mo><mrow>' +
      '<mo>(</mo><mrow><msub><mi>T</mi><mn>0</mn></msub><mo>−</mo><msub>' +
      '<mi>T</mi><mi>s</mi></msub></mrow><mo>)</mo></mrow><msup><mi>e</mi>' +
      '<mrow><mo>−</mo><mi>k</mi><mi>t</mi></mrow></msup></mrow></math>';
  var speech = 'T von t, ist gleich, T Index s, plus, Klammer auf, T Index 0, minus, T Index s, Klammer zu,   e hoch minus k t';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanImpliedTimes Example Extra019
 */
sre.ClearspeakGermanImpliedTimes.prototype.testExtra019 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mi>V</mi><mo>=</mo><mi mathvariant="script">l' +
      '</mi><mi>w</mi><mrow><mo>(</mo><mn>8</mn><mo>)</mo></mrow></mrow>' +
      '</math>';
  var speech = 'V ist gleich Schreibschrift l, w von 8';
  // w is considered a simple function.
  //var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


// TODO: (Simons) Explore exact speech.
/**
 * Testing ClearspeakGermanImpliedTimes Example Extra020
 */
sre.ClearspeakGermanImpliedTimes.prototype.untestExtra020 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mi>V</mi><mo>=</mo><mi mathvariant="script">l' +
      '</mi><mi>w</mi><mrow><mo>(</mo><mn>8</mn><mo>)</mo></mrow></mrow>' +
      '</math>';
  var speech = 'XXX';
  this.executeRuleTest(mathml, speech, preference);
};

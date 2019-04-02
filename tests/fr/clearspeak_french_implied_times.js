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


goog.provide('sre.ClearspeakFrenchImpliedTimes');

goog.require('sre.ClearspeakFrenchRuleTest');



/**
* @constructor
* @extends {sre.ClearspeakFrenchRuleTest}
*/
sre.ClearspeakFrenchImpliedTimes = function() {
  sre.ClearspeakFrenchImpliedTimes.base(this, 'constructor');

  /**
* @override
  */
  this.information = 'ClearspeakFrenchImpliedTimes rule tests.';

};
goog.inherits(sre.ClearspeakFrenchImpliedTimes, sre.ClearspeakFrenchRuleTest);



//
// Implied Times
//


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes001
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes001 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mn>3</mn><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = '2   3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes002
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes002 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>[</mo><mn>3</mn><mo>]</mo>' +
      '</mrow></mrow></math>';
  var speech = '2   3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes003
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes003 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><msup><mn>2</mn><mn>4</mn></msup><mrow><mo>(' +
      '</mo><mn>3</mn><mo>)</mo></mrow></mrow></math>';
  var speech = '2 à la puissance 4;   3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes004
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes004 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mrow><mn>3</mn><mo>+' +
      '</mo><mn>4</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2  , parenthèse gauche, 3 plus 4, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes005
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes005 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>[</mo><mrow><mn>3</mn><mo>+' +
      '</mo><mn>4</mn></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = '2  , crochet gauche, 3 plus 4, crochet droit';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes006
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes006 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mn>3</mn><mo>)</mo></mrow>' +
      '<mrow><mo>(</mo><mn>2</mn><mo>)</mo></mrow></mrow></math>';
  var speech = '3   2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes007
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes007 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mn>2</mn><msup><mrow><mrow><mo>(</mo><mrow>' +
      '<mn>3</mn><mo>+</mo><mn>4</mn></mrow><mo>)</mo></mrow></mrow><mn>2' +
      '</mn></msup></mrow></math>';
  var speech = '2  , parenthèse gauche, 3 plus 4, parenthèse droite, au carré';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes008
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes008 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mn>2</mn><mo>+</mo><mn>7' +
      '</mn></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mn>3</mn><mo>−' +
      '</mo><mn>6</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'parenthèse gauche, 2 plus 7, parenthèse droite,  , parenthèse gauche, 3 moins 6, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes009
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes009 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mn>2</mn><mo>+</mo><mn>7' +
      '</mn></mrow><mo>]</mo></mrow><mrow><mo>[</mo><mrow><mn>3</mn><mo>−' +
      '</mo><mn>6</mn></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'crochet gauche, 2 plus 7, crochet droit,  , crochet gauche, 3 moins 6, crochet droit';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes010
 */
// TODO: (Simons) x is categorised as function!
sre.ClearspeakFrenchImpliedTimes.prototype.untestImpTimes010 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mi>x</mi><mrow><mo>(</mo><mrow><mi>y</mi><mi>z' +
      '</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'XXXX';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes011
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes011 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mi>x</mi><mrow><mo>(</mo><mrow><mi>y</mi><mo>+' +
      '</mo><mi>z</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'x  , parenthèse gauche, y plus z, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes012
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes012 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mrow><mi>y</mi><mo>+' +
      '</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2  , parenthèse gauche, y plus 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes013
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes013 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mo stretchy="false">(</mo><mn>2</mn><mo>−</mo>' +
      '<mn>1</mn><mo stretchy="false">)</mo><mi>x</mi></mrow></math>';
  var speech = 'parenthèse gauche, 2 moins 1, parenthèse droite,   x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes014
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes014 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><msub><mi>p</mi><mn>1</mn></msub><mrow><mo>(' +
      '</mo><mrow><mn>3</mn><mo>+</mo><mn>7</mn></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'p sub 1,  , parenthèse gauche, 3 plus 7, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes015
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes015 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><msubsup><mi>p</mi><mn>1</mn><mrow><msub><mi>a' +
      '</mi><mn>1</mn></msub></mrow></msubsup><msubsup><mi>p</mi><mn>2</mn>' +
      '<mrow><msub><mi>a</mi><mn>2</mn></msub></mrow></msubsup></mrow></math>';
  var speech = 'p sub 1, à la puissance, a sub 1; p sub 2, à la puissance, a sub 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes016
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes016 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mi>x</mi>' +
      '<mo>+</mo><mi>y</mi></mrow><mo>)</mo></mrow></mrow><mrow><mo>−</mo>' +
      '<mn>4</mn></mrow></msup><msup><mrow><mrow><mo>(</mo><mrow><mi>x</mi>' +
      '<mo>−</mo><mi>y</mi></mrow><mo>)</mo></mrow></mrow><mrow><mo>−</mo>' +
      '<mn>4</mn></mrow></msup></mrow></math>';
  var speech = 'parenthèse gauche, x plus y, parenthèse droite, à la puissance négatif 4;  , parenthèse gauche, x moins y, parenthèse droite, à la puissance négatif 4';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes017
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes017 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><msup><mn>2</mn><mrow><mn>4</mn><mrow><mo>(' +
      '</mo><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mo>)</mo></mrow>' +
      '</mrow></msup></mrow></math>';
  var speech = '2 à la puissance 4  , parenthèse gauche, x plus y, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes018
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes018 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mi>x</mi><mi>y</mi></mrow></math>';
  var speech = 'x y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes019
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes019 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><msup><mi>x</mi><mn>2</mn></msup><msup><mi>y' +
      '</mi><mn>3</mn></msup></mrow></math>';
  var speech = 'x au carré, y au cube';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes020
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes020 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><msup><mi>x</mi><mrow><mi>y</mi><mo>+</mo><mn>1' +
      '</mn></mrow></msup><msup><mi>x</mi><mrow><mi>y</mi><mo>+</mo><mn>2' +
      '</mn></mrow></msup></mrow></math>';
  var speech = 'x à la puissance y plus 1; x à la puissance y plus 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes021
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes021 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><msqrt><mi>a</mi></msqrt><msqrt><mi>b</mi>' +
      '</msqrt><mo>=</mo><msqrt><mrow><mi>a</mi><mi>b</mi></mrow></msqrt>' +
      '</mrow></math>';
  var speech = 'la racine carrée de a, la racine carrée de b, égale la racine carrée de a b';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes022
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes022 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><msqrt><mn>3</mn></msqrt><msqrt><mrow><mn>10' +
      '</mn></mrow></msqrt><mo>=</mo><msqrt><mrow><mn>30</mn></mrow>' +
      '</msqrt></mrow></math>';
  var speech = 'la racine carrée de 3, la racine carrée de 10, égale la racine carrée de 30';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes023
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes023 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mn>2</mn><msqrt><mn>3</mn></msqrt></mrow></math>';
  var speech = '2 la racine carrée de 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes024
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes024 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mn>1</mn><mo>+</mo><mn>2</mn><msqrt><mn>3</mn>' +
      '</msqrt></mrow></math>';
  var speech = '1 plus 2 la racine carrée de 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes025
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes025 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mi>f</mi><mo stretchy="false">(</mo><mi>x</mi>' +
      '<mo stretchy="false">)</mo><mo>=</mo><msup><mi>x</mi><mn>2</mn>' +
      '</msup><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'f de x, égale x au carré  , parenthèse gauche, x plus 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes026
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes026 = function() {
  var preference = 'ImpliedTimes_Auto:Functions_None';
  var mathml = '<math><mrow><mi>f</mi><mo stretchy="false">(</mo><mi>x</mi>' +
      '<mo stretchy="false">)</mo><mo>=</mo><msup><mi>x</mi><mn>2</mn>' +
      '</msup><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'f fois x, égale x au carré  , parenthèse gauche, x plus 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes027
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes027 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mi>sin</mi><mi>x</mi><mi>cos</mi><mi>y</mi>' +
      '<mo>+</mo><mi>cos</mi><mi>x</mi><mi>sin</mi><mi>y</mi></mrow></math>';
  var speech = 'sinus x cosinus y, plus, cosinus x sinus y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes027a
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes027a = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><mi>x</mi>' +
      '<mo>+</mo><mi>y</mi></mrow><mo>)</mo></mrow><mi>cos</mi><mrow><mo>(' +
      '</mo><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'sinus de, parenthèse gauche, x plus y, parenthèse droite, cosinus de, parenthèse gauche, x plus y, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes028
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes028 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><msub><mrow><mi>log</mi></mrow><mrow><mn>10' +
      '</mn></mrow></msub><mi>x</mi><mi>y</mi></mrow></math>';
  var speech = 'log base 10 de, x y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes029
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes029 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mi>log</mi><mrow><mo>(</mo><mrow><mi>x</mi>' +
      '<mo>+</mo><mi>y</mi></mrow><mo>)</mo></mrow><mo>=</mo><mi>log</mi>' +
      '<mi>x</mi><mi>log</mi><mi>y</mi></mrow></math>';
  var speech = 'log de, parenthèse gauche, x plus y, parenthèse droite, égale, log x log y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes030
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes030 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>5</mn></mtd>' +
      '<mtd><mn>2</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow><mrow>' +
      '<mo>(</mo><mrow><mtable><mtr><mtd><mn>7</mn></mtd><mtd><mn>4</mn>' +
      '</mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>1</mn></mtd></mtr>' +
      '</mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'la matrice de dimension 2 par 2. rangée 1: 1, 3 rangée 2: 5, 2.   la matrice de dimension 2 par 2. rangée 1: 7, 4 rangée 2: 0, 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes031
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes031 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mrow><mn>3</mn>' +
      '<mrow><mo>(</mo><mrow><mrow><mo>(</mo><mrow><mn>4</mn><mo>+</mo>' +
      '<mn>5</mn></mrow><mo>)</mo></mrow><mo>+</mo><mn>6</mn></mrow><mo>)' +
      '</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2  , parenthèse gauche, 3  , parenthèse gauche, parenthèse gauche, 4 plus 5, parenthèse droite, plus 6, parenthèse droite, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes032
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes032 = function() {
  var preference = 'ImpliedTimes_Auto:Paren_SpeakNestingLevel';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mrow><mn>3</mn>' +
      '<mrow><mo>(</mo><mrow><mrow><mo>(</mo><mrow><mn>4</mn><mo>+</mo>' +
      '<mn>5</mn></mrow><mo>)</mo></mrow><mo>+</mo><mn>6</mn></mrow><mo>)' +
      '</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2  , parenthèse gauche, 3  , deuxième parenthèse gauche, troisième parenthèse gauche, 4 plus 5, troisième parenthèse droite, plus 6, deuxième parenthèse droite, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes033
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes033 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>[</mo><mrow><mn>3</mn>' +
      '<mrow><mo>(</mo><mrow><mrow><mo>(</mo><mrow><mn>4</mn><mo>+</mo>' +
      '<mn>5</mn></mrow><mo>)</mo></mrow><mo>+</mo><mn>6</mn></mrow><mo>)' +
      '</mo></mrow></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = '2  , crochet gauche, 3  , parenthèse gauche, parenthèse gauche, 4 plus 5, parenthèse droite, plus 6, parenthèse droite, crochet droit';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes034
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes034 = function() {
  var preference = 'ImpliedTimes_Auto:Paren_SpeakNestingLevel';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>[</mo><mrow><mn>3</mn>' +
      '<mrow><mo>(</mo><mrow><mrow><mo>(</mo><mrow><mn>4</mn><mo>+</mo>' +
      '<mn>5</mn></mrow><mo>)</mo></mrow><mo>+</mo><mn>6</mn></mrow><mo>)' +
      '</mo></mrow></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = '2  , crochet gauche, 3  , parenthèse gauche, deuxième parenthèse gauche, 4 plus 5, deuxième parenthèse droite, plus 6, parenthèse droite, crochet droit';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes035
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes035 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>|</mo><mi>x</mi><mo>|</mo>' +
      '</mrow></mrow></math>';
  var speech = '2  , la valeur absolue de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes036
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes036 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mrow><mo>|</mo><mi>x</mi><mo>|</mo></mrow>' +
      '<mrow><mo>|</mo><mi>y</mi><mo>|</mo></mrow></mrow></math>';
  var speech = 'la valeur absolue de x,  , la valeur absolue de y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes037
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes037 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mi>x</mi><mo>+</mo><mn>1' +
      '</mn></mrow><mo>|</mo></mrow><mrow><mo>|</mo><mrow><mi>y</mi><mo>−' +
      '</mo><mn>1</mn></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'la valeur absolue de x plus 1,  , la valeur absolue de y moins 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes037a
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes037a = function() {
  var preference = 'ImpliedTimes_Auto:AbsoluteValue_AbsEnd';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mi>x</mi><mo>+</mo><mn>1' +
      '</mn></mrow><mo>|</mo></mrow><mrow><mo>|</mo><mrow><mi>y</mi><mo>−' +
      '</mo><mn>1</mn></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'la valeur absolue de x plus 1, fin de valeur absolue,  , la valeur absolue de y moins 1, fin de valeur absolue';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes038
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes038 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mi>x</mi><mo>+</mo><mn>1' +
      '</mn></mrow><mo>|</mo></mrow><mrow><mo>|</mo><mi>y</mi><mo>|</mo>' +
      '</mrow><mo>−</mo><mn>1</mn></mrow></math>';
  var speech = 'la valeur absolue de x plus 1,  , la valeur absolue de y, moins 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes0381
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes0381 = function() {
  var preference = 'ImpliedTimes_Auto:AbsoluteValue_AbsEnd';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mi>x</mi><mo>+</mo><mn>1' +
      '</mn></mrow><mo>|</mo></mrow><mrow><mo>|</mo><mi>y</mi><mo>|</mo>' +
      '</mrow><mo>−</mo><mn>1</mn></mrow></math>';
  var speech = 'la valeur absolue de x plus 1, fin de valeur absolue,  , la valeur absolue de y, fin de valeur absolue, moins 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes039
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes039 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mn>3</mn><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = '2   3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes040
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes040 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>[</mo><mn>3</mn><mo>]</mo>' +
      '</mrow></mrow></math>';
  var speech = '2   3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes041
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes041 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><msup><mn>2</mn><mn>4</mn></msup><mrow><mo>(' +
      '</mo><mn>3</mn><mo>)</mo></mrow></mrow></math>';
  var speech = '2 à la puissance 4;   3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes042
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes042 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mrow><mn>3</mn><mo>+' +
      '</mo><mn>4</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2  , parenthèse gauche, 3 plus 4, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes043
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes043 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>[</mo><mrow><mn>3</mn><mo>+' +
      '</mo><mn>4</mn></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = '2  , crochet gauche, 3 plus 4, crochet droit';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes044
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes044 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mrow><mo>(</mo><mn>3</mn><mo>)</mo></mrow>' +
      '<mrow><mo>(</mo><mn>2</mn><mo>)</mo></mrow></mrow></math>';
  var speech = '3   2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes045
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes045 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mn>2</mn><msup><mrow><mrow><mo>(</mo><mrow>' +
      '<mn>3</mn><mo>+</mo><mn>4</mn></mrow><mo>)</mo></mrow></mrow><mn>2' +
      '</mn></msup></mrow></math>';
  var speech = '2  , parenthèse gauche, 3 plus 4, parenthèse droite, au carré';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes046
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes046 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mn>2</mn><mo>+</mo><mn>7' +
      '</mn></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mn>3</mn><mo>−' +
      '</mo><mn>6</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'parenthèse gauche, 2 plus 7, parenthèse droite,  , parenthèse gauche, 3 moins 6, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes047
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes047 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mn>2</mn><mo>+</mo><mn>7' +
      '</mn></mrow><mo>]</mo></mrow><mrow><mo>[</mo><mrow><mn>3</mn><mo>−' +
      '</mo><mn>6</mn></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'crochet gauche, 2 plus 7, crochet droit,  , crochet gauche, 3 moins 6, crochet droit';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes048
 */
// TODO: (Simons) x is categorised as function!
sre.ClearspeakFrenchImpliedTimes.prototype.untestImpTimes048 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mi>x</mi><mrow><mo>(</mo><mrow><mi>y</mi><mi>z' +
      '</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'XXXX';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes049
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes049 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mi>x</mi><mrow><mo>(</mo><mrow><mi>y</mi><mo>+' +
      '</mo><mi>z</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'x  , parenthèse gauche, y plus z, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes050
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes050 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mrow><mi>y</mi><mo>+' +
      '</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2  , parenthèse gauche, y plus 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes051
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes051 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mo stretchy="false">(</mo><mn>2</mn><mo>−</mo>' +
      '<mn>1</mn><mo stretchy="false">)</mo><mi>x</mi></mrow></math>';
  var speech = 'parenthèse gauche, 2 moins 1, parenthèse droite,   x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes052
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes052 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><msub><mi>p</mi><mn>1</mn></msub><mrow><mo>(' +
      '</mo><mrow><mn>3</mn><mo>+</mo><mn>7</mn></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'p sub 1,  , parenthèse gauche, 3 plus 7, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes053
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes053 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><msubsup><mi>p</mi><mn>1</mn><mrow><msub><mi>a' +
      '</mi><mn>1</mn></msub></mrow></msubsup><msubsup><mi>p</mi><mn>2</mn>' +
      '<mrow><msub><mi>a</mi><mn>2</mn></msub></mrow></msubsup></mrow></math>';
  var speech = 'p sub 1, à la puissance, a sub 1;  , p sub 2, à la puissance, a sub 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes054
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes054 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mi>x</mi>' +
      '<mo>+</mo><mi>y</mi></mrow><mo>)</mo></mrow></mrow><mrow><mo>−</mo>' +
      '<mn>4</mn></mrow></msup><msup><mrow><mrow><mo>(</mo><mrow><mi>x</mi>' +
      '<mo>−</mo><mi>y</mi></mrow><mo>)</mo></mrow></mrow><mrow><mo>−</mo>' +
      '<mn>4</mn></mrow></msup></mrow></math>';
  var speech = 'parenthèse gauche, x plus y, parenthèse droite, à la puissance négatif 4;  , parenthèse gauche, x moins y, parenthèse droite, à la puissance négatif 4';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes055
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes055 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><msup><mn>2</mn><mrow><mn>4</mn><mrow><mo>(' +
      '</mo><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mo>)</mo></mrow>' +
      '</mrow></msup></mrow></math>';
  var speech = '2 à la puissance 4  , parenthèse gauche, x plus y, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes056
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes056 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mi>x</mi><mi>y</mi></mrow></math>';
  var speech = 'x   y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes057
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes057 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><msup><mi>x</mi><mn>2</mn></msup><msup><mi>y' +
      '</mi><mn>3</mn></msup></mrow></math>';
  var speech = 'x au carré   y au cube';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes058
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes058 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><msup><mi>x</mi><mrow><mi>y</mi><mo>+</mo><mn>1' +
      '</mn></mrow></msup><msup><mi>x</mi><mrow><mi>y</mi><mo>+</mo><mn>2' +
      '</mn></mrow></msup></mrow></math>';
  var speech = 'x à la puissance y plus 1;   x à la puissance y plus 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes059
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes059 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><msqrt><mi>a</mi></msqrt><msqrt><mi>b</mi>' +
      '</msqrt><mo>=</mo><msqrt><mrow><mi>a</mi><mi>b</mi></mrow></msqrt>' +
      '</mrow></math>';
  var speech = 'la racine carrée de a,   la racine carrée de b, égale la racine carrée de a   b';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes060
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes060 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><msqrt><mn>3</mn></msqrt><msqrt><mrow><mn>10' +
      '</mn></mrow></msqrt><mo>=</mo><msqrt><mrow><mn>30</mn></mrow>' +
      '</msqrt></mrow></math>';
  var speech = 'la racine carrée de 3,   la racine carrée de 10, égale la racine carrée de 30';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes061
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes061 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mn>2</mn><msqrt><mn>3</mn></msqrt></mrow></math>';
  var speech = '2   la racine carrée de 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes062
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes062 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mn>1</mn><mo>+</mo><mn>2</mn><msqrt><mn>3</mn>' +
      '</msqrt></mrow></math>';
  var speech = '1 plus 2   la racine carrée de 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes063
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes063 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mi>f</mi><mo stretchy="false">(</mo><mi>x</mi>' +
      '<mo stretchy="false">)</mo><mo>=</mo><msup><mi>x</mi><mn>2</mn>' +
      '</msup><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'f de x, égale x au carré  , parenthèse gauche, x plus 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes064
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes064 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimesAnd:Functions_None';
  var mathml = '<math><mrow><mi>f</mi><mo stretchy="false">(</mo><mi>x</mi>' +
      '<mo stretchy="false">)</mo><mo>=</mo><msup><mi>x</mi><mn>2</mn>' +
      '</msup><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'f fois x, égale x au carré  , parenthèse gauche, x plus 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes065
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes065 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mi>sin</mi><mi>x</mi><mi>cos</mi><mi>y</mi>' +
      '<mo>+</mo><mi>cos</mi><mi>x</mi><mi>sin</mi><mi>y</mi></mrow></math>';
  var speech = 'sinus x,   cosinus y plus cosinus x,   sinus y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes065a
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes065a = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><mi>x</mi>' +
      '<mo>+</mo><mi>y</mi></mrow><mo>)</mo></mrow><mi>cos</mi><mrow><mo>(' +
      '</mo><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'sinus de, parenthèse gauche, x plus y, parenthèse droite,  , cosinus de, parenthèse gauche, x plus y, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes066
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes066 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><msub><mrow><mi>log</mi></mrow><mrow><mn>10' +
      '</mn></mrow></msub><mi>x</mi><mi>y</mi></mrow></math>';
  var speech = 'log base 10 de, x   y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes067
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes067 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mi>log</mi><mrow><mo>(</mo><mrow><mi>x</mi>' +
      '<mo>+</mo><mi>y</mi></mrow><mo>)</mo></mrow><mo>=</mo><mi>log</mi>' +
      '<mi>x</mi><mi>log</mi><mi>y</mi></mrow></math>';
  var speech = 'log de, parenthèse gauche, x plus y, parenthèse droite, égale log x,   log y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes068
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes068 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>5</mn></mtd>' +
      '<mtd><mn>2</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow><mrow>' +
      '<mo>(</mo><mrow><mtable><mtr><mtd><mn>7</mn></mtd><mtd><mn>4</mn>' +
      '</mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>1</mn></mtd></mtr>' +
      '</mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'la matrice de dimension 2 par 2. rangée 1: 1, 3 rangée 2: 5, 2.   la matrice de dimension 2 par 2. rangée 1: 7, 4 rangée 2: 0, 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes069
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes069 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mrow><mn>3</mn>' +
      '<mrow><mo>(</mo><mrow><mrow><mo>(</mo><mrow><mn>4</mn><mo>+</mo>' +
      '<mn>5</mn></mrow><mo>)</mo></mrow><mo>+</mo><mn>6</mn></mrow><mo>)' +
      '</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2  , parenthèse gauche, 3  , parenthèse gauche, parenthèse gauche, 4 plus 5, parenthèse droite, plus 6, parenthèse droite, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes070
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes070 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes:Paren_SpeakNestingLevel';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mrow><mn>3</mn>' +
      '<mrow><mo>(</mo><mrow><mrow><mo>(</mo><mrow><mn>4</mn><mo>+</mo>' +
      '<mn>5</mn></mrow><mo>)</mo></mrow><mo>+</mo><mn>6</mn></mrow><mo>)' +
      '</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2  , parenthèse gauche, 3  , deuxième parenthèse gauche, troisième parenthèse gauche, 4 plus 5, troisième parenthèse droite, plus 6, deuxième parenthèse droite, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes070a
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes070a = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>[</mo><mrow><mn>3</mn>' +
      '<mrow><mo>(</mo><mrow><mrow><mo>(</mo><mrow><mn>4</mn><mo>+</mo>' +
      '<mn>5</mn></mrow><mo>)</mo></mrow><mo>+</mo><mn>6</mn></mrow><mo>)' +
      '</mo></mrow></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = '2  , crochet gauche, 3  , parenthèse gauche, parenthèse gauche, 4 plus 5, parenthèse droite, plus 6, parenthèse droite, crochet droit';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes071
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes071 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes:Paren_SpeakNestingLevel';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>[</mo><mrow><mn>3</mn>' +
      '<mrow><mo>(</mo><mrow><mrow><mo>(</mo><mrow><mn>4</mn><mo>+</mo>' +
      '<mn>5</mn></mrow><mo>)</mo></mrow><mo>+</mo><mn>6</mn></mrow><mo>)' +
      '</mo></mrow></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = '2  , crochet gauche, 3  , parenthèse gauche, deuxième parenthèse gauche, 4 plus 5, deuxième parenthèse droite, plus 6, parenthèse droite, crochet droit';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes072
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes072 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>|</mo><mi>x</mi><mo>|</mo>' +
      '</mrow></mrow></math>';
  var speech = '2  , la valeur absolue de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes073
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes073 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mrow><mo>|</mo><mi>x</mi><mo>|</mo></mrow>' +
      '<mrow><mo>|</mo><mi>y</mi><mo>|</mo></mrow></mrow></math>';
  var speech = 'la valeur absolue de x,  , la valeur absolue de y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes074
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes074 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mi>x</mi><mo>+</mo><mn>1' +
      '</mn></mrow><mo>|</mo></mrow><mrow><mo>|</mo><mrow><mi>y</mi><mo>−' +
      '</mo><mn>1</mn></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'la valeur absolue de x plus 1,  , la valeur absolue de y moins 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes074a
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes074a = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes:AbsoluteValue_AbsEnd';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mi>x</mi><mo>+</mo><mn>1' +
      '</mn></mrow><mo>|</mo></mrow><mrow><mo>|</mo><mrow><mi>y</mi><mo>−' +
      '</mo><mn>1</mn></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'la valeur absolue de x plus 1, fin de valeur absolue,  , la valeur absolue de y moins 1, fin de valeur absolue';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes075
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes075 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mi>x</mi><mo>+</mo><mn>1' +
      '</mn></mrow><mo>|</mo></mrow><mrow><mo>|</mo><mi>y</mi><mo>|</mo>' +
      '</mrow><mo>−</mo><mn>1</mn></mrow></math>';
  var speech = 'la valeur absolue de x plus 1,  , la valeur absolue de y, moins 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes076
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes076 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes:AbsoluteValue_AbsEnd';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mi>x</mi><mo>+</mo><mn>1' +
      '</mn></mrow><mo>|</mo></mrow><mrow><mo>|</mo><mi>y</mi><mo>|</mo>' +
      '</mrow><mo>−</mo><mn>1</mn></mrow></math>';
  var speech = 'la valeur absolue de x plus 1, fin de valeur absolue,  , la valeur absolue de y, fin de valeur absolue, moins 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes077
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes077 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mn>3</mn><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = '2, parenthèse gauche, 3, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes078
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes078 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>[</mo><mn>3</mn><mo>]</mo>' +
      '</mrow></mrow></math>';
  var speech = '2, crochet gauche, 3, crochet droit';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes079
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes079 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><msup><mn>2</mn><mn>4</mn></msup><mrow><mo>(' +
      '</mo><mn>3</mn><mo>)</mo></mrow></mrow></math>';
  var speech = '2 à la puissance 4; parenthèse gauche, 3, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes080
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes080 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mrow><mn>3</mn><mo>+' +
      '</mo><mn>4</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2, parenthèse gauche, 3 plus 4, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes081
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes081 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>[</mo><mrow><mn>3</mn><mo>+' +
      '</mo><mn>4</mn></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = '2, crochet gauche, 3 plus 4, crochet droit';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes082
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes082 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mrow><mo>(</mo><mn>3</mn><mo>)</mo></mrow>' +
      '<mrow><mo>(</mo><mn>2</mn><mo>)</mo></mrow></mrow></math>';
  var speech = 'parenthèse gauche, 3, parenthèse droite, parenthèse gauche, 2, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes083
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes083 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mn>2</mn><msup><mrow><mrow><mo>(</mo><mrow>' +
      '<mn>3</mn><mo>+</mo><mn>4</mn></mrow><mo>)</mo></mrow></mrow><mn>2' +
      '</mn></msup></mrow></math>';
  var speech = '2, parenthèse gauche, 3 plus 4, parenthèse droite, au carré';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes084
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes084 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mn>2</mn><mo>+</mo><mn>7' +
      '</mn></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mn>3</mn><mo>−' +
      '</mo><mn>6</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'parenthèse gauche, 2 plus 7, parenthèse droite, parenthèse gauche, 3 moins 6, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes085
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes085 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mn>2</mn><mo>+</mo><mn>7' +
      '</mn></mrow><mo>]</mo></mrow><mrow><mo>[</mo><mrow><mn>3</mn><mo>−' +
      '</mo><mn>6</mn></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'crochet gauche, 2 plus 7, crochet droit, crochet gauche, 3 moins 6, crochet droit';
  this.executeRuleTest(mathml, speech, preference);
};


// TODO: (Simons) x is categorised as function!
/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes086
 */
sre.ClearspeakFrenchImpliedTimes.prototype.untestImpTimes086 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mi>x</mi><mrow><mo>(</mo><mrow><mi>y</mi><mi>z' +
      '</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'XXXX';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes087
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes087 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mi>x</mi><mrow><mo>(</mo><mrow><mi>y</mi><mo>+' +
      '</mo><mi>z</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'x, parenthèse gauche, y plus z, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes088
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes088 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mrow><mi>y</mi><mo>+' +
      '</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2, parenthèse gauche, y plus 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes089
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes089 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mo stretchy="false">(</mo><mn>2</mn><mo>−</mo>' +
      '<mn>1</mn><mo stretchy="false">)</mo><mi>x</mi></mrow></math>';
  var speech = 'parenthèse gauche, 2 moins 1, parenthèse droite, x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes090
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes090 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><msub><mi>p</mi><mn>1</mn></msub><mrow><mo>(' +
      '</mo><mrow><mn>3</mn><mo>+</mo><mn>7</mn></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'p sub 1, parenthèse gauche, 3 plus 7, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes091
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes091 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><msubsup><mi>p</mi><mn>1</mn><mrow><msub><mi>a' +
      '</mi><mn>1</mn></msub></mrow></msubsup><msubsup><mi>p</mi><mn>2</mn>' +
      '<mrow><msub><mi>a</mi><mn>2</mn></msub></mrow></msubsup></mrow></math>';
  var speech = 'p sub 1, à la puissance, a sub 1; p sub 2, à la puissance, a sub 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes092
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes092 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mi>x</mi>' +
      '<mo>+</mo><mi>y</mi></mrow><mo>)</mo></mrow></mrow><mrow><mo>−</mo>' +
      '<mn>4</mn></mrow></msup><msup><mrow><mrow><mo>(</mo><mrow><mi>x</mi>' +
      '<mo>−</mo><mi>y</mi></mrow><mo>)</mo></mrow></mrow><mrow><mo>−</mo>' +
      '<mn>4</mn></mrow></msup></mrow></math>';
  var speech = 'parenthèse gauche, x plus y, parenthèse droite, à la puissance négatif 4; parenthèse gauche, x moins y, parenthèse droite, à la puissance négatif 4';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes093
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes093 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><msup><mn>2</mn><mrow><mn>4</mn><mrow><mo>(' +
      '</mo><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mo>)</mo></mrow>' +
      '</mrow></msup></mrow></math>';
  var speech = '2 à la puissance 4, parenthèse gauche, x plus y, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes094
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes094 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mi>x</mi><mi>y</mi></mrow></math>';
  var speech = 'x y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes095
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes095 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><msup><mi>x</mi><mn>2</mn></msup><msup><mi>y' +
      '</mi><mn>3</mn></msup></mrow></math>';
  var speech = 'x au carré y au cube';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes096
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes096 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><msup><mi>x</mi><mrow><mi>y</mi><mo>+</mo><mn>1' +
      '</mn></mrow></msup><msup><mi>x</mi><mrow><mi>y</mi><mo>+</mo><mn>2' +
      '</mn></mrow></msup></mrow></math>';
  var speech = 'x à la puissance y plus 1; x à la puissance y plus 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes097
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes097 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><msqrt><mi>a</mi></msqrt><msqrt><mi>b</mi>' +
      '</msqrt><mo>=</mo><msqrt><mrow><mi>a</mi><mi>b</mi></mrow></msqrt>' +
      '</mrow></math>';
  var speech = 'la racine carrée de a, la racine carrée de b, égale la racine carrée de a b';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes098
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes098 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><msqrt><mn>3</mn></msqrt><msqrt><mrow><mn>10' +
      '</mn></mrow></msqrt><mo>=</mo><msqrt><mrow><mn>30</mn></mrow>' +
      '</msqrt></mrow></math>';
  var speech = 'la racine carrée de 3, la racine carrée de 10, égale la racine carrée de 30';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes099
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes099 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mn>2</mn><msqrt><mn>3</mn></msqrt></mrow></math>';
  var speech = '2 la racine carrée de 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes100
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes100 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mn>1</mn><mo>+</mo><mn>2</mn><msqrt><mn>3</mn>' +
      '</msqrt></mrow></math>';
  var speech = '1 plus 2 la racine carrée de 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes101
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes101 = function() {
  var preference = 'ImpliedTimes_None:Functions_Auto';
  var mathml = '<math><mrow><mi>f</mi><mo stretchy="false">(</mo><mi>x</mi>' +
      '<mo stretchy="false">)</mo><mo>=</mo><msup><mi>x</mi><mn>2</mn>' +
      '</msup><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'f de x, égale x au carré, parenthèse gauche, x plus 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


// TODO: (Simons) Need to be able to specify excluded preferences.
/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes102
 */
sre.ClearspeakFrenchImpliedTimes.prototype.untestImpTimes102 = function() {
  var preference = 'ImpliedTimes_None:Functions_None';
  var mathml = '<math><mrow><mi>f</mi><mo stretchy="false">(</mo><mi>x</mi>' +
      '<mo stretchy="false">)</mo><mo>=</mo><msup><mi>x</mi><mn>2</mn>' +
      '</msup><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'XXXX';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes103
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes103 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mi>sin</mi><mi>x</mi><mi>cos</mi><mi>y</mi>' +
      '<mo>+</mo><mi>cos</mi><mi>x</mi><mi>sin</mi><mi>y</mi></mrow></math>';
  var speech = 'sinus x cosinus y, plus, cosinus x sinus y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes104
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes104 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><msub><mrow><mi>log</mi></mrow><mrow><mn>10' +
      '</mn></mrow></msub><mi>x</mi><mi>y</mi></mrow></math>';
  var speech = 'log base 10 de, x y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes105
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes105 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mi>log</mi><mrow><mo>(</mo><mrow><mi>x</mi>' +
      '<mo>+</mo><mi>y</mi></mrow><mo>)</mo></mrow><mo>=</mo><mi>log</mi>' +
      '<mi>x</mi><mi>log</mi><mi>y</mi></mrow></math>';
  var speech = 'log de, parenthèse gauche, x plus y, parenthèse droite, égale, log x log y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes106
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes106 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>5</mn></mtd>' +
      '<mtd><mn>2</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow><mrow>' +
      '<mo>(</mo><mrow><mtable><mtr><mtd><mn>7</mn></mtd><mtd><mn>4</mn>' +
      '</mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>1</mn></mtd></mtr>' +
      '</mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'la matrice de dimension 2 par 2. rangée 1: 1, 3 rangée 2: 5, 2. la matrice de dimension 2 par 2. rangée 1: 7, 4 rangée 2: 0, 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes107
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes107 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mrow><mn>3</mn>' +
      '<mrow><mo>(</mo><mrow><mrow><mo>(</mo><mrow><mn>4</mn><mo>+</mo>' +
      '<mn>5</mn></mrow><mo>)</mo></mrow><mo>+</mo><mn>6</mn></mrow><mo>)' +
      '</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2, parenthèse gauche, 3, parenthèse gauche, parenthèse gauche, 4 plus 5, parenthèse droite, plus 6, parenthèse droite, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes108
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes108 = function() {
  var preference = 'ImpliedTimes_None:Paren_SpeakNestingLevel';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mrow><mn>3</mn>' +
      '<mrow><mo>(</mo><mrow><mrow><mo>(</mo><mrow><mn>4</mn><mo>+</mo>' +
      '<mn>5</mn></mrow><mo>)</mo></mrow><mo>+</mo><mn>6</mn></mrow><mo>)' +
      '</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2, parenthèse gauche, 3, deuxième parenthèse gauche, troisième parenthèse gauche, 4 plus 5, troisième parenthèse droite, plus 6, deuxième parenthèse droite, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes109
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes109 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>[</mo><mrow><mn>3</mn>' +
      '<mrow><mo>(</mo><mrow><mrow><mo>(</mo><mrow><mn>4</mn><mo>+</mo>' +
      '<mn>5</mn></mrow><mo>)</mo></mrow><mo>+</mo><mn>6</mn></mrow><mo>)' +
      '</mo></mrow></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = '2, crochet gauche, 3, parenthèse gauche, parenthèse gauche, 4 plus 5, parenthèse droite, plus 6, parenthèse droite, crochet droit';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes110
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes110 = function() {
  var preference = 'ImpliedTimes_None:Paren_SpeakNestingLevel';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>[</mo><mrow><mn>3</mn>' +
      '<mrow><mo>(</mo><mrow><mrow><mo>(</mo><mrow><mn>4</mn><mo>+</mo>' +
      '<mn>5</mn></mrow><mo>)</mo></mrow><mo>+</mo><mn>6</mn></mrow><mo>)' +
      '</mo></mrow></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = '2, crochet gauche, 3, parenthèse gauche, deuxième parenthèse gauche, 4 plus 5, deuxième parenthèse droite, plus 6, parenthèse droite, crochet droit';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes111
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes111 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>|</mo><mi>x</mi><mo>|</mo>' +
      '</mrow></mrow></math>';
  var speech = '2, la valeur absolue de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes112
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes112 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mrow><mo>|</mo><mi>x</mi><mo>|</mo></mrow>' +
      '<mrow><mo>|</mo><mi>y</mi><mo>|</mo></mrow></mrow></math>';
  var speech = 'la valeur absolue de x, la valeur absolue de y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes113
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes113 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mi>x</mi><mo>+</mo><mn>1' +
      '</mn></mrow><mo>|</mo></mrow><mrow><mo>|</mo><mrow><mi>y</mi><mo>−' +
      '</mo><mn>1</mn></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'la valeur absolue de x plus 1, la valeur absolue de y moins 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimes114
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimes114 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mi>x</mi><mo>+</mo><mn>1' +
      '</mn></mrow><mo>|</mo></mrow><mrow><mo>|</mo><mi>y</mi><mo>|</mo>' +
      '</mrow><mo>−</mo><mn>1</mn></mrow></math>';
  var speech = 'la valeur absolue de x plus 1, la valeur absolue de y, moins 1';
  this.executeRuleTest(mathml, speech, preference);
};


//
// No Implied Times and Silent Parenthesis Preferences both set
//


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimesSilPar001
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimesSilPar001 = function() {
  var preference = 'ImpliedTimes_None:Paren_Silent';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mn>3</mn><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = '2, parenthèse gauche, 3, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimesSilPar002
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimesSilPar002 = function() {
  var preference = 'ImpliedTimes_None:Paren_Silent';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>[</mo><mn>3</mn><mo>]</mo>' +
      '</mrow></mrow></math>';
  var speech = '2, crochet gauche, 3, crochet droit';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimesSilPar003
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimesSilPar003 = function() {
  var preference = 'ImpliedTimes_None:Paren_Silent';
  var mathml = '<math><mrow><msup><mn>2</mn><mn>4</mn></msup><mrow><mo>(' +
      '</mo><mn>3</mn><mo>)</mo></mrow></mrow></math>';
  var speech = '2 à la puissance 4; parenthèse gauche, 3, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimesSilPar004
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimesSilPar004 = function() {
  var preference = 'ImpliedTimes_None:Paren_Silent';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mrow><mn>3</mn><mo>+' +
      '</mo><mn>4</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2, parenthèse gauche, 3 plus 4, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimesSilPar005
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimesSilPar005 = function() {
  var preference = 'ImpliedTimes_None:Paren_Silent';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>[</mo><mrow><mn>3</mn><mo>+' +
      '</mo><mn>4</mn></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = '2, crochet gauche, 3 plus 4, crochet droit';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimesSilPar006
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimesSilPar006 = function() {
  var preference = 'ImpliedTimes_None:Paren_Silent';
  var mathml = '<math><mrow><mrow><mo>(</mo><mn>3</mn><mo>)</mo></mrow>' +
      '<mrow><mo>(</mo><mn>2</mn><mo>)</mo></mrow></mrow></math>';
  var speech = 'parenthèse gauche, 3, parenthèse droite, parenthèse gauche, 2, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimesSilPar007
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimesSilPar007 = function() {
  var preference = 'ImpliedTimes_None:Paren_Silent';
  var mathml = '<math><mrow><mn>2</mn><msup><mrow><mrow><mo>(</mo><mrow>' +
      '<mn>3</mn><mo>+</mo><mn>4</mn></mrow><mo>)</mo></mrow></mrow><mn>2' +
      '</mn></msup></mrow></math>';
  var speech = '2, parenthèse gauche, 3 plus 4, parenthèse droite, au carré';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimesSilPar008
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimesSilPar008 = function() {
  var preference = 'ImpliedTimes_None:Paren_Silent';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mn>2</mn><mo>+</mo><mn>7' +
      '</mn></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mn>3</mn><mo>−' +
      '</mo><mn>6</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'parenthèse gauche, 2 plus 7, parenthèse droite, parenthèse gauche, 3 moins 6, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimesSilPar009
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimesSilPar009 = function() {
  var preference = 'ImpliedTimes_None:Paren_Silent';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mn>2</mn><mo>+</mo><mn>7' +
      '</mn></mrow><mo>]</mo></mrow><mrow><mo>[</mo><mrow><mn>3</mn><mo>−' +
      '</mo><mn>6</mn></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'crochet gauche, 2 plus 7, crochet droit, crochet gauche, 3 moins 6, crochet droit';
  this.executeRuleTest(mathml, speech, preference);
};


// TODO: (Simons) x is categorised as function!
/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimesSilPar010
 */
sre.ClearspeakFrenchImpliedTimes.prototype.untestImpTimesSilPar010 = function() {
  var preference = 'ImpliedTimes_None:Paren_Silent';
  var mathml = '<math><mrow><mi>x</mi><mrow><mo>(</mo><mrow><mi>y</mi><mi>z' +
      '</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'XXXX';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimesSilPar011
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimesSilPar011 = function() {
  var preference = 'ImpliedTimes_None:Paren_Silent';
  var mathml = '<math><mrow><mi>x</mi><mrow><mo>(</mo><mrow><mi>y</mi><mo>+' +
      '</mo><mi>z</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'x, parenthèse gauche, y plus z, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimesSilPar012
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimesSilPar012 = function() {
  var preference = 'ImpliedTimes_None:Paren_Silent';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mrow><mi>y</mi><mo>+' +
      '</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2, parenthèse gauche, y plus 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimesSilPar013
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimesSilPar013 = function() {
  var preference = 'ImpliedTimes_None:Paren_Silent';
  var mathml = '<math><mrow><mo stretchy="false">(</mo><mn>2</mn><mo>−</mo>' +
      '<mn>1</mn><mo stretchy="false">)</mo><mi>x</mi></mrow></math>';
  var speech = 'parenthèse gauche, 2 moins 1, parenthèse droite, x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimesSilPar014
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimesSilPar014 = function() {
  var preference = 'ImpliedTimes_None:Paren_Silent';
  var mathml = '<math><mrow><msub><mi>p</mi><mn>1</mn></msub><mrow><mo>(' +
      '</mo><mrow><mn>3</mn><mo>+</mo><mn>7</mn></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'p sub 1, parenthèse gauche, 3 plus 7, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimesSilPar015
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimesSilPar015 = function() {
  var preference = 'ImpliedTimes_None:Paren_Silent';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mi>x</mi>' +
      '<mo>+</mo><mi>y</mi></mrow><mo>)</mo></mrow></mrow><mrow><mo>−</mo>' +
      '<mn>4</mn></mrow></msup><msup><mrow><mrow><mo>(</mo><mrow><mi>x</mi>' +
      '<mo>−</mo><mi>y</mi></mrow><mo>)</mo></mrow></mrow><mrow><mo>−</mo>' +
      '<mn>4</mn></mrow></msup></mrow></math>';
  var speech = 'parenthèse gauche, x plus y, parenthèse droite, à la puissance négatif 4; parenthèse gauche, x moins y, parenthèse droite, à la puissance négatif 4';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimesSilPar016
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimesSilPar016 = function() {
  var preference = 'ImpliedTimes_None:Paren_Silent';
  var mathml = '<math><mrow><msup><mn>2</mn><mrow><mn>4</mn><mrow><mo>(' +
      '</mo><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mo>)</mo></mrow>' +
      '</mrow></msup></mrow></math>';
  var speech = '2 à la puissance 4, parenthèse gauche, x plus y, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimesSilPar017
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimesSilPar017 = function() {
  var preference = 'ImpliedTimes_None';
  // preference = 'Paren_Silent';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mi>f</mi><mo stretchy="false">(</mo><mi>x</mi>' +
      '<mo stretchy="false">)</mo><mo>=</mo><msup><mi>x</mi><mn>2</mn>' +
      '</msup><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'f de x, égale x au carré, parenthèse gauche, x plus 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


// TODO: (Simons) Need to be able to specify excluded preferences.
/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimesSilPar018
 */
sre.ClearspeakFrenchImpliedTimes.prototype.untestImpTimesSilPar018 = function() {
  var preference = 'ImpliedTimes_None:Paren_Silent:Functions_None';
  var mathml = '<math><mrow><mi>f</mi><mo stretchy="false">(</mo><mi>x</mi>' +
      '<mo stretchy="false">)</mo><mo>=</mo><msup><mi>x</mi><mn>2</mn>' +
      '</msup><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'XXXX';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimesSilPar019
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimesSilPar019 = function() {
  var preference = 'ImpliedTimes_None';
  // preference = 'Paren_Silent';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mi>log</mi><mrow><mo>(</mo><mrow><mi>x</mi>' +
      '<mo>+</mo><mi>y</mi></mrow><mo>)</mo></mrow><mo>=</mo><mi>log</mi>' +
      '<mi>x</mi><mi>log</mi><mi>y</mi></mrow></math>';
  var speech = 'log de, parenthèse gauche, x plus y, parenthèse droite, égale, log x log y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimesSilPar020
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimesSilPar020 = function() {
  var preference = 'ImpliedTimes_None:Paren_Silent';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>5</mn></mtd>' +
      '<mtd><mn>2</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow><mrow>' +
      '<mo>(</mo><mrow><mtable><mtr><mtd><mn>7</mn></mtd><mtd><mn>4</mn>' +
      '</mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>1</mn></mtd></mtr>' +
      '</mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'la matrice de dimension 2 par 2. rangée 1: 1, 3 rangée 2: 5, 2. la matrice de dimension 2 par 2. rangée 1: 7, 4 rangée 2: 0, 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimesSilPar021
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimesSilPar021 = function() {
  var preference = 'ImpliedTimes_None:Paren_Silent';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mrow><mn>3</mn>' +
      '<mrow><mo>(</mo><mrow><mrow><mo>(</mo><mrow><mn>4</mn><mo>+</mo>' +
      '<mn>5</mn></mrow><mo>)</mo></mrow><mo>+</mo><mn>6</mn></mrow><mo>)' +
      '</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2, parenthèse gauche, 3, parenthèse gauche, parenthèse gauche, 4 plus 5, parenthèse droite, plus 6, parenthèse droite, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimesSilPar022
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimesSilPar022 = function() {
  var preference = 'ImpliedTimes_None:Paren_SpeakNestingLevel';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mrow><mn>3</mn>' +
      '<mrow><mo>(</mo><mrow><mrow><mo>(</mo><mrow><mn>4</mn><mo>+</mo>' +
      '<mn>5</mn></mrow><mo>)</mo></mrow><mo>+</mo><mn>6</mn></mrow><mo>)' +
      '</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2, parenthèse gauche, 3, deuxième parenthèse gauche, troisième parenthèse gauche, 4 plus 5, troisième parenthèse droite, plus 6, deuxième parenthèse droite, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimesSilPar023
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimesSilPar023 = function() {
  var preference = 'ImpliedTimes_None:Paren_Silent';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>[</mo><mrow><mn>3</mn>' +
      '<mrow><mo>(</mo><mrow><mrow><mo>(</mo><mrow><mn>4</mn><mo>+</mo>' +
      '<mn>5</mn></mrow><mo>)</mo></mrow><mo>+</mo><mn>6</mn></mrow><mo>)' +
      '</mo></mrow></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = '2, crochet gauche, 3, parenthèse gauche, parenthèse gauche, 4 plus 5, parenthèse droite, plus 6, parenthèse droite, crochet droit';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example ImpTimesSilPar024
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testImpTimesSilPar024 = function() {
  var preference = 'ImpliedTimes_None:Paren_SpeakNestingLevel';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>[</mo><mrow><mn>3</mn>' +
      '<mrow><mo>(</mo><mrow><mrow><mo>(</mo><mrow><mn>4</mn><mo>+</mo>' +
      '<mn>5</mn></mrow><mo>)</mo></mrow><mo>+</mo><mn>6</mn></mrow><mo>)' +
      '</mo></mrow></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = '2, crochet gauche, 3, parenthèse gauche, deuxième parenthèse gauche, 4 plus 5, deuxième parenthèse droite, plus 6, parenthèse droite, crochet droit';
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
 * Testing ClearspeakFrenchImpliedTimes Example Extra001
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testExtra001 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mi>A</mi><mo>=</mo><mi>h</mi><mrow><mo>(</mo>' +
      '<mrow><mfrac><mrow><msub><mi>b</mi><mn>1</mn></msub><mo>+</mo><msub>' +
      '<mi>b</mi><mn>2</mn></msub></mrow><mn>2</mn></mfrac></mrow><mo>)' +
      '</mo></mrow></mrow></math>';
  var speech = 'A égale h de, parenthèse gauche, fraction avec numérateur, b sub 1, plus, b sub 2, et dénominateur 2, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example Extra002
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testExtra002 = function() {
  var preference = 'ImpliedTimes_Auto:Functions_None';
  var mathml = '<math><mrow><mi>A</mi><mo>=</mo><mi>h</mi><mrow><mo>(</mo>' +
      '<mrow><mfrac><mrow><msub><mi>b</mi><mn>1</mn></msub><mo>+</mo><msub>' +
      '<mi>b</mi><mn>2</mn></msub></mrow><mn>2</mn></mfrac></mrow><mo>)' +
      '</mo></mrow></mrow></math>';
  var speech = 'A égale, h fois, parenthèse gauche, fraction avec numérateur, b sub 1, plus, b sub 2, et dénominateur 2, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example Extra003
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testExtra003 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mi>a</mi><mrow><mo>(</mo><mn>0</mn><mo>)</mo>' +
      '</mrow><mo>=</mo><mn>0</mn><mrow><mo>(</mo><mi>a</mi><mo>)</mo>' +
      '</mrow><mo>=</mo><mn>0</mn></mrow></math>';
  var speech = 'a de 0, égale 0   a égale 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example Extra004
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testExtra004 = function() {
  var preference = 'ImpliedTimes_Auto:Functions_None';
  var mathml = '<math><mrow><mi>a</mi><mrow><mo>(</mo><mn>0</mn><mo>)</mo>' +
      '</mrow><mo>=</mo><mn>0</mn><mrow><mo>(</mo><mi>a</mi><mo>)</mo>' +
      '</mrow><mo>=</mo><mn>0</mn></mrow></math>';
  var speech = 'a fois 0, égale 0   a égale 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example Extra005
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testExtra005 = function() {
  var preference = 'ImpliedTimes_Auto';
  preference = 'Functions_None';
  var mathml = '<math><mrow><mi>a</mi><mrow><mo>(</mo><mrow><mo>−</mo><mn>1' +
      '</mn></mrow><mo>)</mo></mrow><mo>=</mo><mo>−</mo><mi>a</mi></mrow>' +
      '</math>';
  var speech = 'a fois négatif 1, égale négatif a';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example Extra006
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testExtra006 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mi>a</mi><mrow><mo>(</mo><mrow><mo>−</mo><mn>1' +
      '</mn></mrow><mo>)</mo></mrow><mo>=</mo><mo>−</mo><mi>a</mi></mrow>' +
      '</math>';
  var speech = 'a de négatif 1, égale négatif a';
  this.executeRuleTest(mathml, speech, preference);
};


// TODO: (Simons) a is categorised as function!
/**
 * Testing ClearspeakFrenchImpliedTimes Example Extra007
 */
sre.ClearspeakFrenchImpliedTimes.prototype.untestExtra007 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mi>a</mi><mrow><mo>(</mo><mrow><mi>b</mi><mi>c' +
      '</mi></mrow><mo>)</mo></mrow><mo>=</mo><mrow><mo>(</mo><mrow><mi>a' +
      '</mi><mi>b</mi></mrow><mo>)</mo></mrow><mi>c</mi></mrow></math>';
  var speech = 'XXXX';
  this.executeRuleTest(mathml, speech, preference);
};


// TODO: (Simons) a is categorised as function!
/**
 * Testing ClearspeakFrenchImpliedTimes Example Extra008
 */
sre.ClearspeakFrenchImpliedTimes.prototype.untestExtra008 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mi>a</mi><mrow><mo>(</mo><mrow><mfrac><mn>1' +
      '</mn><mi>a</mi></mfrac></mrow><mo>)</mo></mrow><mo>=</mo><mn>1</mn>' +
      '</mrow></math>';
  var speech = 'XXXX';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example Extra009
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testExtra009 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math style="background-color:#"> <semantics>  <mrow>   ' +
      '<mo>−</mo><mi>u</mi><mrow><mo>(</mo>    <mi>v</mi>   <mo>)</mo>' +
      '</mrow><mo>=</mo><mi>u</mi><mrow><mo>(</mo>    <mrow>     <mo>−</mo>' +
      '<mi>v</mi></mrow>   <mo>)</mo></mrow><mo>=</mo><mo>−</mo><mrow><mo>(' +
      '</mo>    <mrow>     <mi>u</mi><mi>v</mi></mrow>   <mo>)</mo></mrow>' +
      '</mrow>   </semantics></math>';
  var speech = 'négatif u de v, égale u de négatif v, égale négatif u v';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example Extra010
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testExtra010 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mi>B</mi><mrow><mo>(</mo><mrow><mn>2</mn><mo>,' +
      '</mo><mn>6</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'B de, parenthèse gauche, 2 virgule 6, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example Extra012
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testExtra012 = function() {
  var preference = 'ImpliedTimes_Auto:Functions_None';
  var mathml = '<math><mrow><mi>B</mi><mrow><mo>(</mo><mrow><mn>2</mn><mo>,' +
      '</mo><mn>6</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'B fois, parenthèse gauche, 2 virgule 6, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


// TODO: (Simons) Explore exact speech.
/**
 * Testing ClearspeakFrenchImpliedTimes Example Extra013
 */
sre.ClearspeakFrenchImpliedTimes.prototype.untestExtra013 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mi>B</mi><mrow><mo>(</mo><mrow><mn>2</mn><mo>,' +
      '</mo><mn>6</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'XXXX';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example Extra014
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testExtra014 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mi>p</mi><mrow><mo>(</mo><mi>w</mi><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'p de w';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example Extra015
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testExtra015 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mi>x</mi><mrow><mo>(</mo><mi>t</mi><mo>)</mo>' +
      '</mrow><mo>=</mo><mn>2</mn><mi>t</mi><mo>+</mo><mn>4</mn></mrow></math>';
  var speech = 'x de t, égale 2 t, plus 4';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example Extra016
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testExtra016 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mi>k</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow><mo>=</mo><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>3' +
      '</mn></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mi>x</mi><mo>−' +
      '</mo><mn>5</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'k de x, égale, parenthèse gauche, x plus 3, parenthèse droite,  , parenthèse gauche, x moins 5, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


// TODO: (Simons) a is categorised as function!
/**
 * Testing ClearspeakFrenchImpliedTimes Example Extra017
 */
sre.ClearspeakFrenchImpliedTimes.prototype.untestExtra017 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mn>3</mn><msup><mi>a</mi><mn>2</mn></msup>' +
      '<mo>−</mo><mn>12</mn><mi>a</mi><mo>=</mo><mn>3</mn><mi>a</mi><mrow>' +
      '<mo>(</mo><mi>a</mi><mo>)</mo></mrow><mo>−</mo><mn>3</mn><mi>a</mi>' +
      '<mrow><mo>(</mo><mn>4</mn><mo>)</mo></mrow></mrow></math>';
  var speech = 'XXXX';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example Extra018
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testExtra018 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mi>T</mi><mrow><mo>(</mo><mi>t</mi><mo>)</mo>' +
      '</mrow><mo>=</mo><msub><mi>T</mi><mi>s</mi></msub><mo>+</mo><mrow>' +
      '<mo>(</mo><mrow><msub><mi>T</mi><mn>0</mn></msub><mo>−</mo><msub>' +
      '<mi>T</mi><mi>s</mi></msub></mrow><mo>)</mo></mrow><msup><mi>e</mi>' +
      '<mrow><mo>−</mo><mi>k</mi><mi>t</mi></mrow></msup></mrow></math>';
  var speech = 'T de t, égale, T sub s, plus, parenthèse gauche, T sub 0, moins, T sub s, parenthèse droite,   e à la puissance négatif k t';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchImpliedTimes Example Extra019
 */
sre.ClearspeakFrenchImpliedTimes.prototype.testExtra019 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mi>V</mi><mo>=</mo><mi mathvariant="script">l' +
      '</mi><mi>w</mi><mrow><mo>(</mo><mn>8</mn><mo>)</mo></mrow></mrow>' +
      '</math>';
  var speech = 'V égale l en script, w de 8';
  // w is considered a simple function.
  //var speech = '';
  this.executeRuleTest(mathml, speech, preference);
};


// TODO: (Simons) Explore exact speech.
/**
 * Testing ClearspeakFrenchImpliedTimes Example Extra020
 */
sre.ClearspeakFrenchImpliedTimes.prototype.untestExtra020 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mi>V</mi><mo>=</mo><mi mathvariant="script">l' +
      '</mi><mi>w</mi><mrow><mo>(</mo><mn>8</mn><mo>)</mo></mrow></mrow>' +
      '</math>';
  var speech = 'XXXX';
  this.executeRuleTest(mathml, speech, preference);
};

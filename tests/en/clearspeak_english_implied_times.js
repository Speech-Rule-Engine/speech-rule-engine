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


goog.provide('sre.ClearspeakEnglishImpliedTimes');

goog.require('sre.ClearspeakEnglishRuleTest');



/**
* @constructor
* @extends {sre.ClearspeakEnglishRuleTest}
*/
sre.ClearspeakEnglishImpliedTimes = function() {
  sre.ClearspeakEnglishImpliedTimes.base(this, 'constructor');

  /**
   * @override
   */
  this.information = 'ClearspeakEnglishImpliedTimes rule tests.';

};
goog.inherits(sre.ClearspeakEnglishImpliedTimes, sre.ClearspeakEnglishRuleTest);



//
// Implied Times
//


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes001
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes001 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mn>3</mn><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = '2 times 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes002
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes002 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>[</mo><mn>3</mn><mo>]</mo>' +
      '</mrow></mrow></math>';
  var speech = '2 times 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes003
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes003 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><msup><mn>2</mn><mn>4</mn></msup><mrow><mo>(' +
      '</mo><mn>3</mn><mo>)</mo></mrow></mrow></math>';
  var speech = '2 to the fourth power, times 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes004
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes004 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mrow><mn>3</mn><mo>+' +
      '</mo><mn>4</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2 times, open paren, 3 plus 4, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes005
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes005 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>[</mo><mrow><mn>3</mn><mo>+' +
      '</mo><mn>4</mn></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = '2 times, open bracket, 3 plus 4, close bracket';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes006
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes006 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mn>3</mn><mo>)</mo></mrow>' +
      '<mrow><mo>(</mo><mn>2</mn><mo>)</mo></mrow></mrow></math>';
  var speech = '3 times 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes007
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes007 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mn>2</mn><msup><mrow><mrow><mo>(</mo><mrow>' +
      '<mn>3</mn><mo>+</mo><mn>4</mn></mrow><mo>)</mo></mrow></mrow><mn>2' +
      '</mn></msup></mrow></math>';
  var speech = '2 times, open paren, 3 plus 4, close paren, squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes008
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes008 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mn>2</mn><mo>+</mo><mn>7' +
      '</mn></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mn>3</mn><mo>−' +
      '</mo><mn>6</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'open paren, 2 plus 7, close paren, times, open paren, 3' +
      ' minus 6, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes009
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes009 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mn>2</mn><mo>+</mo><mn>7' +
      '</mn></mrow><mo>]</mo></mrow><mrow><mo>[</mo><mrow><mn>3</mn><mo>−' +
      '</mo><mn>6</mn></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'open bracket, 2 plus 7, close bracket, times, open bracket,' +
      ' 3 minus 6, close bracket';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes010
 */
// TODO: (Simons) x is categorised as function!
sre.ClearspeakEnglishImpliedTimes.prototype.untestImpTimes010 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mi>x</mi><mrow><mo>(</mo><mrow><mi>y</mi><mi>z' +
      '</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'x times, y z';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes011
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes011 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mi>x</mi><mrow><mo>(</mo><mrow><mi>y</mi><mo>+' +
      '</mo><mi>z</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'x times, open paren, y plus z, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes012
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes012 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mrow><mi>y</mi><mo>+' +
      '</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2 times, open paren, y plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes013
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes013 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mo stretchy="false">(</mo><mn>2</mn><mo>−</mo>' +
      '<mn>1</mn><mo stretchy="false">)</mo><mi>x</mi></mrow></math>';
  var speech = 'open paren, 2 minus 1, close paren, times x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes014
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes014 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><msub><mi>p</mi><mn>1</mn></msub><mrow><mo>(' +
      '</mo><mrow><mn>3</mn><mo>+</mo><mn>7</mn></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'p sub 1, times, open paren, 3 plus 7, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes015
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes015 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><msubsup><mi>p</mi><mn>1</mn><mrow><msub><mi>a' +
      '</mi><mn>1</mn></msub></mrow></msubsup><msubsup><mi>p</mi><mn>2</mn>' +
      '<mrow><msub><mi>a</mi><mn>2</mn></msub></mrow></msubsup></mrow></math>';
  var speech = 'p sub 1, raised to the, a sub 1, power, p sub 2, raised to' +
      ' the, a sub 2, power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes016
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes016 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mi>x</mi>' +
      '<mo>+</mo><mi>y</mi></mrow><mo>)</mo></mrow></mrow><mrow><mo>−</mo>' +
      '<mn>4</mn></mrow></msup><msup><mrow><mrow><mo>(</mo><mrow><mi>x</mi>' +
      '<mo>−</mo><mi>y</mi></mrow><mo>)</mo></mrow></mrow><mrow><mo>−</mo>' +
      '<mn>4</mn></mrow></msup></mrow></math>';
  var speech = 'open paren, x plus y, close paren, to the negative 4 power,' +
      ' times, open paren, x minus y, close paren, to the negative 4 power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes017
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes017 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><msup><mn>2</mn><mrow><mn>4</mn><mrow><mo>(' +
      '</mo><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mo>)</mo></mrow>' +
      '</mrow></msup></mrow></math>';
  var speech = '2 raised to the 4 times, open paren, x plus y, close paren,' +
      ' power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes018
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes018 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mi>x</mi><mi>y</mi></mrow></math>';
  var speech = 'x y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes019
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes019 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><msup><mi>x</mi><mn>2</mn></msup><msup><mi>y' +
      '</mi><mn>3</mn></msup></mrow></math>';
  var speech = 'x squared, y cubed';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes020
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes020 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><msup><mi>x</mi><mrow><mi>y</mi><mo>+</mo><mn>1' +
      '</mn></mrow></msup><msup><mi>x</mi><mrow><mi>y</mi><mo>+</mo><mn>2' +
      '</mn></mrow></msup></mrow></math>';
  var speech = 'x raised to the y plus 1 power, x raised to the y plus 2 power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes021
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes021 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><msqrt><mi>a</mi></msqrt><msqrt><mi>b</mi>' +
      '</msqrt><mo>=</mo><msqrt><mrow><mi>a</mi><mi>b</mi></mrow></msqrt>' +
      '</mrow></math>';
  var speech = 'the square root of a, the square root of b, equals the' +
      ' square root of a b';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes022
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes022 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><msqrt><mn>3</mn></msqrt><msqrt><mrow><mn>10' +
      '</mn></mrow></msqrt><mo>=</mo><msqrt><mrow><mn>30</mn></mrow>' +
      '</msqrt></mrow></math>';
  var speech = 'the square root of 3, the square root of 10, equals the' +
      ' square root of 30';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes023
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes023 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mn>2</mn><msqrt><mn>3</mn></msqrt></mrow></math>';
  var speech = '2 the square root of 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes024
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes024 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mn>1</mn><mo>+</mo><mn>2</mn><msqrt><mn>3</mn>' +
      '</msqrt></mrow></math>';
  var speech = '1 plus 2 the square root of 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes025
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes025 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mi>f</mi><mo stretchy="false">(</mo><mi>x</mi>' +
      '<mo stretchy="false">)</mo><mo>=</mo><msup><mi>x</mi><mn>2</mn>' +
      '</msup><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'f of x, equals x squared times, open paren, x plus 1, close' +
      ' paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes026
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes026 = function() {
  var preference = 'ImpliedTimes_Auto:Functions_None';
  var mathml = '<math><mrow><mi>f</mi><mo stretchy="false">(</mo><mi>x</mi>' +
      '<mo stretchy="false">)</mo><mo>=</mo><msup><mi>x</mi><mn>2</mn>' +
      '</msup><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'f times x, equals x squared times, open paren, x plus 1,' +
      ' close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes027
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes027 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mi>sin</mi><mi>x</mi><mi>cos</mi><mi>y</mi>' +
      '<mo>+</mo><mi>cos</mi><mi>x</mi><mi>sin</mi><mi>y</mi></mrow></math>';
  var speech = 'sine x cosine y, plus, cosine x sine y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes027a
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes027a = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><mi>x</mi>' +
      '<mo>+</mo><mi>y</mi></mrow><mo>)</mo></mrow><mi>cos</mi><mrow><mo>(' +
      '</mo><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'the sine of, open paren, x plus y, close paren, the cosine' +
      ' of, open paren, x plus y, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes028
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes028 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><msub><mrow><mi>log</mi></mrow><mrow><mn>10' +
      '</mn></mrow></msub><mi>x</mi><mi>y</mi></mrow></math>';
  var speech = 'the log base 10 of, x y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes029
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes029 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mi>log</mi><mrow><mo>(</mo><mrow><mi>x</mi>' +
      '<mo>+</mo><mi>y</mi></mrow><mo>)</mo></mrow><mo>=</mo><mi>log</mi>' +
      '<mi>x</mi><mi>log</mi><mi>y</mi></mrow></math>';
  var speech = 'the log of, open paren, x plus y, close paren, equals, log' +
      ' x log y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes030
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes030 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>5</mn></mtd>' +
      '<mtd><mn>2</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow><mrow>' +
      '<mo>(</mo><mrow><mtable><mtr><mtd><mn>7</mn></mtd><mtd><mn>4</mn>' +
      '</mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>1</mn></mtd></mtr>' +
      '</mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: 1, 3 Row 2: 5, 2. times the 2 by' +
      ' 2 matrix. Row 1: 7, 4 Row 2: 0, 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes031
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes031 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mrow><mn>3</mn>' +
      '<mrow><mo>(</mo><mrow><mrow><mo>(</mo><mrow><mn>4</mn><mo>+</mo>' +
      '<mn>5</mn></mrow><mo>)</mo></mrow><mo>+</mo><mn>6</mn></mrow><mo>)' +
      '</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2 times, open paren, 3 times, open paren, open paren, 4' +
      ' plus 5, close paren, plus 6, close paren, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes032
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes032 = function() {
  var preference = 'ImpliedTimes_Auto:Paren_SpeakNestingLevel';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mrow><mn>3</mn>' +
      '<mrow><mo>(</mo><mrow><mrow><mo>(</mo><mrow><mn>4</mn><mo>+</mo>' +
      '<mn>5</mn></mrow><mo>)</mo></mrow><mo>+</mo><mn>6</mn></mrow><mo>)' +
      '</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2 times, open paren, 3 times, open second paren, open third' +
      ' paren, 4 plus 5, close third paren, plus 6, close second paren,' +
      ' close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes033
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes033 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>[</mo><mrow><mn>3</mn>' +
      '<mrow><mo>(</mo><mrow><mrow><mo>(</mo><mrow><mn>4</mn><mo>+</mo>' +
      '<mn>5</mn></mrow><mo>)</mo></mrow><mo>+</mo><mn>6</mn></mrow><mo>)' +
      '</mo></mrow></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = '2 times, open bracket, 3 times, open paren, open paren, 4' +
      ' plus 5, close paren, plus 6, close paren, close bracket';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes034
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes034 = function() {
  var preference = 'ImpliedTimes_Auto:Paren_SpeakNestingLevel';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>[</mo><mrow><mn>3</mn>' +
      '<mrow><mo>(</mo><mrow><mrow><mo>(</mo><mrow><mn>4</mn><mo>+</mo>' +
      '<mn>5</mn></mrow><mo>)</mo></mrow><mo>+</mo><mn>6</mn></mrow><mo>)' +
      '</mo></mrow></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = '2 times, open bracket, 3 times, open paren, open second' +
      ' paren, 4 plus 5, close second paren, plus 6, close paren, close' +
      ' bracket';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes035
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes035 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>|</mo><mi>x</mi><mo>|</mo>' +
      '</mrow></mrow></math>';
  var speech = '2 times, the absolute value of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes036
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes036 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mrow><mo>|</mo><mi>x</mi><mo>|</mo></mrow>' +
      '<mrow><mo>|</mo><mi>y</mi><mo>|</mo></mrow></mrow></math>';
  var speech = 'the absolute value of x, times, the absolute value of y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes037
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes037 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mi>x</mi><mo>+</mo><mn>1' +
      '</mn></mrow><mo>|</mo></mrow><mrow><mo>|</mo><mrow><mi>y</mi><mo>−' +
      '</mo><mn>1</mn></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the absolute value of x plus 1, times, the absolute value' +
      ' of y minus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes037a
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes037a = function() {
  var preference = 'ImpliedTimes_Auto:AbsoluteValue_AbsEnd';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mi>x</mi><mo>+</mo><mn>1' +
      '</mn></mrow><mo>|</mo></mrow><mrow><mo>|</mo><mrow><mi>y</mi><mo>−' +
      '</mo><mn>1</mn></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the absolute value of x plus 1, end absolute value, times,' +
      ' the absolute value of y minus 1, end absolute value';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes038
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes038 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mi>x</mi><mo>+</mo><mn>1' +
      '</mn></mrow><mo>|</mo></mrow><mrow><mo>|</mo><mi>y</mi><mo>|</mo>' +
      '</mrow><mo>−</mo><mn>1</mn></mrow></math>';
  var speech = 'the absolute value of x plus 1, times, the absolute value' +
      ' of y, minus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes0381
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes0381 = function() {
  var preference = 'ImpliedTimes_Auto:AbsoluteValue_AbsEnd';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mi>x</mi><mo>+</mo><mn>1' +
      '</mn></mrow><mo>|</mo></mrow><mrow><mo>|</mo><mi>y</mi><mo>|</mo>' +
      '</mrow><mo>−</mo><mn>1</mn></mrow></math>';
  var speech = 'the absolute value of x plus 1, end absolute value, times,' +
      ' the absolute value of y, end absolute value, minus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes039
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes039 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mn>3</mn><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = '2 times 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes040
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes040 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>[</mo><mn>3</mn><mo>]</mo>' +
      '</mrow></mrow></math>';
  var speech = '2 times 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes041
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes041 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><msup><mn>2</mn><mn>4</mn></msup><mrow><mo>(' +
      '</mo><mn>3</mn><mo>)</mo></mrow></mrow></math>';
  var speech = '2 to the fourth power, times 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes042
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes042 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mrow><mn>3</mn><mo>+' +
      '</mo><mn>4</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2 times, open paren, 3 plus 4, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes043
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes043 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>[</mo><mrow><mn>3</mn><mo>+' +
      '</mo><mn>4</mn></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = '2 times, open bracket, 3 plus 4, close bracket';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes044
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes044 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mrow><mo>(</mo><mn>3</mn><mo>)</mo></mrow>' +
      '<mrow><mo>(</mo><mn>2</mn><mo>)</mo></mrow></mrow></math>';
  var speech = '3 times 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes045
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes045 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mn>2</mn><msup><mrow><mrow><mo>(</mo><mrow>' +
      '<mn>3</mn><mo>+</mo><mn>4</mn></mrow><mo>)</mo></mrow></mrow><mn>2' +
      '</mn></msup></mrow></math>';
  var speech = '2 times, open paren, 3 plus 4, close paren, squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes046
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes046 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mn>2</mn><mo>+</mo><mn>7' +
      '</mn></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mn>3</mn><mo>−' +
      '</mo><mn>6</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'open paren, 2 plus 7, close paren, times, open paren, 3' +
      ' minus 6, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes047
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes047 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mn>2</mn><mo>+</mo><mn>7' +
      '</mn></mrow><mo>]</mo></mrow><mrow><mo>[</mo><mrow><mn>3</mn><mo>−' +
      '</mo><mn>6</mn></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'open bracket, 2 plus 7, close bracket, times, open bracket,' +
      ' 3 minus 6, close bracket';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes048
 */
// TODO: (Simons) x is categorised as function!
sre.ClearspeakEnglishImpliedTimes.prototype.untestImpTimes048 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mi>x</mi><mrow><mo>(</mo><mrow><mi>y</mi><mi>z' +
      '</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'x times y times z';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes049
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes049 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mi>x</mi><mrow><mo>(</mo><mrow><mi>y</mi><mo>+' +
      '</mo><mi>z</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'x times, open paren, y plus z, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes050
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes050 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mrow><mi>y</mi><mo>+' +
      '</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2 times, open paren, y plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes051
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes051 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mo stretchy="false">(</mo><mn>2</mn><mo>−</mo>' +
      '<mn>1</mn><mo stretchy="false">)</mo><mi>x</mi></mrow></math>';
  var speech = 'open paren, 2 minus 1, close paren, times x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes052
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes052 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><msub><mi>p</mi><mn>1</mn></msub><mrow><mo>(' +
      '</mo><mrow><mn>3</mn><mo>+</mo><mn>7</mn></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'p sub 1, times, open paren, 3 plus 7, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes053
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes053 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><msubsup><mi>p</mi><mn>1</mn><mrow><msub><mi>a' +
      '</mi><mn>1</mn></msub></mrow></msubsup><msubsup><mi>p</mi><mn>2</mn>' +
      '<mrow><msub><mi>a</mi><mn>2</mn></msub></mrow></msubsup></mrow></math>';
  var speech = 'p sub 1, raised to the, a sub 1, power, times, p sub 2,' +
      ' raised to the, a sub 2, power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes054
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes054 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mi>x</mi>' +
      '<mo>+</mo><mi>y</mi></mrow><mo>)</mo></mrow></mrow><mrow><mo>−</mo>' +
      '<mn>4</mn></mrow></msup><msup><mrow><mrow><mo>(</mo><mrow><mi>x</mi>' +
      '<mo>−</mo><mi>y</mi></mrow><mo>)</mo></mrow></mrow><mrow><mo>−</mo>' +
      '<mn>4</mn></mrow></msup></mrow></math>';
  var speech = 'open paren, x plus y, close paren, to the negative 4 power,' +
      ' times, open paren, x minus y, close paren, to the negative 4 power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes055
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes055 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><msup><mn>2</mn><mrow><mn>4</mn><mrow><mo>(' +
      '</mo><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mo>)</mo></mrow>' +
      '</mrow></msup></mrow></math>';
  var speech = '2 raised to the 4 times, open paren, x plus y, close paren,' +
      ' power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes056
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes056 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mi>x</mi><mi>y</mi></mrow></math>';
  var speech = 'x times y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes057
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes057 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><msup><mi>x</mi><mn>2</mn></msup><msup><mi>y' +
      '</mi><mn>3</mn></msup></mrow></math>';
  var speech = 'x squared times y cubed';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes058
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes058 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><msup><mi>x</mi><mrow><mi>y</mi><mo>+</mo><mn>1' +
      '</mn></mrow></msup><msup><mi>x</mi><mrow><mi>y</mi><mo>+</mo><mn>2' +
      '</mn></mrow></msup></mrow></math>';
  var speech = 'x raised to the y plus 1 power, times x raised to the y' +
      ' plus 2 power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes059
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes059 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><msqrt><mi>a</mi></msqrt><msqrt><mi>b</mi>' +
      '</msqrt><mo>=</mo><msqrt><mrow><mi>a</mi><mi>b</mi></mrow></msqrt>' +
      '</mrow></math>';
  var speech = 'the square root of a, times the square root of b, equals' +
      ' the square root of a times b';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes060
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes060 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><msqrt><mn>3</mn></msqrt><msqrt><mrow><mn>10' +
      '</mn></mrow></msqrt><mo>=</mo><msqrt><mrow><mn>30</mn></mrow>' +
      '</msqrt></mrow></math>';
  var speech = 'the square root of 3, times the square root of 10, equals' +
      ' the square root of 30';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes061
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes061 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mn>2</mn><msqrt><mn>3</mn></msqrt></mrow></math>';
  var speech = '2 times the square root of 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes062
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes062 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mn>1</mn><mo>+</mo><mn>2</mn><msqrt><mn>3</mn>' +
      '</msqrt></mrow></math>';
  var speech = '1 plus 2 times the square root of 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes063
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes063 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mi>f</mi><mo stretchy="false">(</mo><mi>x</mi>' +
      '<mo stretchy="false">)</mo><mo>=</mo><msup><mi>x</mi><mn>2</mn>' +
      '</msup><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'f of x, equals x squared times, open paren, x plus 1, close' +
      ' paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes064
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes064 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimesAnd:Functions_None';
  var mathml = '<math><mrow><mi>f</mi><mo stretchy="false">(</mo><mi>x</mi>' +
      '<mo stretchy="false">)</mo><mo>=</mo><msup><mi>x</mi><mn>2</mn>' +
      '</msup><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'f times x, equals x squared times, open paren, x plus 1,' +
      ' close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes065
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes065 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mi>sin</mi><mi>x</mi><mi>cos</mi><mi>y</mi>' +
      '<mo>+</mo><mi>cos</mi><mi>x</mi><mi>sin</mi><mi>y</mi></mrow></math>';
  var speech = 'sine x, times cosine y plus cosine x, times sine y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes065a
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes065a = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><mi>x</mi>' +
      '<mo>+</mo><mi>y</mi></mrow><mo>)</mo></mrow><mi>cos</mi><mrow><mo>(' +
      '</mo><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'the sine of, open paren, x plus y, close paren, times, the' +
      ' cosine of, open paren, x plus y, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes066
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes066 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><msub><mrow><mi>log</mi></mrow><mrow><mn>10' +
      '</mn></mrow></msub><mi>x</mi><mi>y</mi></mrow></math>';
  var speech = 'the log base 10 of, x times y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes067
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes067 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mi>log</mi><mrow><mo>(</mo><mrow><mi>x</mi>' +
      '<mo>+</mo><mi>y</mi></mrow><mo>)</mo></mrow><mo>=</mo><mi>log</mi>' +
      '<mi>x</mi><mi>log</mi><mi>y</mi></mrow></math>';
  var speech = 'the log of, open paren, x plus y, close paren, equals log' +
      ' x, times log y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes068
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes068 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>5</mn></mtd>' +
      '<mtd><mn>2</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow><mrow>' +
      '<mo>(</mo><mrow><mtable><mtr><mtd><mn>7</mn></mtd><mtd><mn>4</mn>' +
      '</mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>1</mn></mtd></mtr>' +
      '</mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: 1, 3 Row 2: 5, 2. times the 2 by' +
      ' 2 matrix. Row 1: 7, 4 Row 2: 0, 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes069
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes069 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mrow><mn>3</mn>' +
      '<mrow><mo>(</mo><mrow><mrow><mo>(</mo><mrow><mn>4</mn><mo>+</mo>' +
      '<mn>5</mn></mrow><mo>)</mo></mrow><mo>+</mo><mn>6</mn></mrow><mo>)' +
      '</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2 times, open paren, 3 times, open paren, open paren, 4' +
      ' plus 5, close paren, plus 6, close paren, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes070
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes070 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes:Paren_SpeakNestingLevel';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mrow><mn>3</mn>' +
      '<mrow><mo>(</mo><mrow><mrow><mo>(</mo><mrow><mn>4</mn><mo>+</mo>' +
      '<mn>5</mn></mrow><mo>)</mo></mrow><mo>+</mo><mn>6</mn></mrow><mo>)' +
      '</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2 times, open paren, 3 times, open second paren, open third' +
      ' paren, 4 plus 5, close third paren, plus 6, close second paren,' +
      ' close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes070a
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes070a = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>[</mo><mrow><mn>3</mn>' +
      '<mrow><mo>(</mo><mrow><mrow><mo>(</mo><mrow><mn>4</mn><mo>+</mo>' +
      '<mn>5</mn></mrow><mo>)</mo></mrow><mo>+</mo><mn>6</mn></mrow><mo>)' +
      '</mo></mrow></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = '2 times, open bracket, 3 times, open paren, open paren, 4' +
      ' plus 5, close paren, plus 6, close paren, close bracket';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes071
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes071 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes:Paren_SpeakNestingLevel';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>[</mo><mrow><mn>3</mn>' +
      '<mrow><mo>(</mo><mrow><mrow><mo>(</mo><mrow><mn>4</mn><mo>+</mo>' +
      '<mn>5</mn></mrow><mo>)</mo></mrow><mo>+</mo><mn>6</mn></mrow><mo>)' +
      '</mo></mrow></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = '2 times, open bracket, 3 times, open paren, open second' +
      ' paren, 4 plus 5, close second paren, plus 6, close paren, close' +
      ' bracket';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes072
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes072 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>|</mo><mi>x</mi><mo>|</mo>' +
      '</mrow></mrow></math>';
  var speech = '2 times, the absolute value of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes073
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes073 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mrow><mo>|</mo><mi>x</mi><mo>|</mo></mrow>' +
      '<mrow><mo>|</mo><mi>y</mi><mo>|</mo></mrow></mrow></math>';
  var speech = 'the absolute value of x, times, the absolute value of y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes074
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes074 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mi>x</mi><mo>+</mo><mn>1' +
      '</mn></mrow><mo>|</mo></mrow><mrow><mo>|</mo><mrow><mi>y</mi><mo>−' +
      '</mo><mn>1</mn></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the absolute value of x plus 1, times, the absolute value' +
      ' of y minus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes074a
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes074a = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes:AbsoluteValue_AbsEnd';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mi>x</mi><mo>+</mo><mn>1' +
      '</mn></mrow><mo>|</mo></mrow><mrow><mo>|</mo><mrow><mi>y</mi><mo>−' +
      '</mo><mn>1</mn></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the absolute value of x plus 1, end absolute value, times,' +
      ' the absolute value of y minus 1, end absolute value';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes075
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes075 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mi>x</mi><mo>+</mo><mn>1' +
      '</mn></mrow><mo>|</mo></mrow><mrow><mo>|</mo><mi>y</mi><mo>|</mo>' +
      '</mrow><mo>−</mo><mn>1</mn></mrow></math>';
  var speech = 'the absolute value of x plus 1, times, the absolute value' +
      ' of y, minus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes076
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes076 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes:AbsoluteValue_AbsEnd';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mi>x</mi><mo>+</mo><mn>1' +
      '</mn></mrow><mo>|</mo></mrow><mrow><mo>|</mo><mi>y</mi><mo>|</mo>' +
      '</mrow><mo>−</mo><mn>1</mn></mrow></math>';
  var speech = 'the absolute value of x plus 1, end absolute value, times,' +
      ' the absolute value of y, end absolute value, minus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes077
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes077 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mn>3</mn><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = '2, open paren, 3, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes078
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes078 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>[</mo><mn>3</mn><mo>]</mo>' +
      '</mrow></mrow></math>';
  var speech = '2, open bracket, 3, close bracket';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes079
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes079 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><msup><mn>2</mn><mn>4</mn></msup><mrow><mo>(' +
      '</mo><mn>3</mn><mo>)</mo></mrow></mrow></math>';
  var speech = '2 to the fourth power, open paren, 3, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes080
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes080 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mrow><mn>3</mn><mo>+' +
      '</mo><mn>4</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2, open paren, 3 plus 4, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes081
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes081 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>[</mo><mrow><mn>3</mn><mo>+' +
      '</mo><mn>4</mn></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = '2, open bracket, 3 plus 4, close bracket';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes082
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes082 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mrow><mo>(</mo><mn>3</mn><mo>)</mo></mrow>' +
      '<mrow><mo>(</mo><mn>2</mn><mo>)</mo></mrow></mrow></math>';
  var speech = 'open paren, 3, close paren, open paren, 2, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes083
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes083 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mn>2</mn><msup><mrow><mrow><mo>(</mo><mrow>' +
      '<mn>3</mn><mo>+</mo><mn>4</mn></mrow><mo>)</mo></mrow></mrow><mn>2' +
      '</mn></msup></mrow></math>';
  var speech = '2, open paren, 3 plus 4, close paren, squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes084
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes084 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mn>2</mn><mo>+</mo><mn>7' +
      '</mn></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mn>3</mn><mo>−' +
      '</mo><mn>6</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'open paren, 2 plus 7, close paren, open paren, 3 minus 6,' +
      ' close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes085
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes085 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mn>2</mn><mo>+</mo><mn>7' +
      '</mn></mrow><mo>]</mo></mrow><mrow><mo>[</mo><mrow><mn>3</mn><mo>−' +
      '</mo><mn>6</mn></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'open bracket, 2 plus 7, close bracket, open bracket, 3' +
      ' minus 6, close bracket';
  this.executeRuleTest(mathml, speech, preference);
};


// TODO: (Simons) x is categorised as function!
/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes086
 */
sre.ClearspeakEnglishImpliedTimes.prototype.untestImpTimes086 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mi>x</mi><mrow><mo>(</mo><mrow><mi>y</mi><mi>z' +
      '</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'x, open paren, y z, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes087
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes087 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mi>x</mi><mrow><mo>(</mo><mrow><mi>y</mi><mo>+' +
      '</mo><mi>z</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'x, open paren, y plus z, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes088
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes088 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mrow><mi>y</mi><mo>+' +
      '</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2, open paren, y plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes089
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes089 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mo stretchy="false">(</mo><mn>2</mn><mo>−</mo>' +
      '<mn>1</mn><mo stretchy="false">)</mo><mi>x</mi></mrow></math>';
  var speech = 'open paren, 2 minus 1, close paren, x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes090
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes090 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><msub><mi>p</mi><mn>1</mn></msub><mrow><mo>(' +
      '</mo><mrow><mn>3</mn><mo>+</mo><mn>7</mn></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'p sub 1, open paren, 3 plus 7, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes091
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes091 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><msubsup><mi>p</mi><mn>1</mn><mrow><msub><mi>a' +
      '</mi><mn>1</mn></msub></mrow></msubsup><msubsup><mi>p</mi><mn>2</mn>' +
      '<mrow><msub><mi>a</mi><mn>2</mn></msub></mrow></msubsup></mrow></math>';
  var speech = 'p sub 1, raised to the, a sub 1, power, p sub 2, raised to' +
      ' the, a sub 2, power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes092
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes092 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mi>x</mi>' +
      '<mo>+</mo><mi>y</mi></mrow><mo>)</mo></mrow></mrow><mrow><mo>−</mo>' +
      '<mn>4</mn></mrow></msup><msup><mrow><mrow><mo>(</mo><mrow><mi>x</mi>' +
      '<mo>−</mo><mi>y</mi></mrow><mo>)</mo></mrow></mrow><mrow><mo>−</mo>' +
      '<mn>4</mn></mrow></msup></mrow></math>';
  var speech = 'open paren, x plus y, close paren, to the negative 4 power,' +
      ' open paren, x minus y, close paren, to the negative 4 power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes093
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes093 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><msup><mn>2</mn><mrow><mn>4</mn><mrow><mo>(' +
      '</mo><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mo>)</mo></mrow>' +
      '</mrow></msup></mrow></math>';
  var speech = '2 raised to the 4, open paren, x plus y, close paren, power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes094
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes094 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mi>x</mi><mi>y</mi></mrow></math>';
  var speech = 'x y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes095
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes095 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><msup><mi>x</mi><mn>2</mn></msup><msup><mi>y' +
      '</mi><mn>3</mn></msup></mrow></math>';
  var speech = 'x squared y cubed';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes096
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes096 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><msup><mi>x</mi><mrow><mi>y</mi><mo>+</mo><mn>1' +
      '</mn></mrow></msup><msup><mi>x</mi><mrow><mi>y</mi><mo>+</mo><mn>2' +
      '</mn></mrow></msup></mrow></math>';
  var speech = 'x raised to the y plus 1 power, x raised to the y plus 2 power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes097
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes097 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><msqrt><mi>a</mi></msqrt><msqrt><mi>b</mi>' +
      '</msqrt><mo>=</mo><msqrt><mrow><mi>a</mi><mi>b</mi></mrow></msqrt>' +
      '</mrow></math>';
  var speech = 'the square root of a, the square root of b, equals the' +
      ' square root of a b';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes098
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes098 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><msqrt><mn>3</mn></msqrt><msqrt><mrow><mn>10' +
      '</mn></mrow></msqrt><mo>=</mo><msqrt><mrow><mn>30</mn></mrow>' +
      '</msqrt></mrow></math>';
  var speech = 'the square root of 3, the square root of 10, equals the' +
      ' square root of 30';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes099
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes099 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mn>2</mn><msqrt><mn>3</mn></msqrt></mrow></math>';
  var speech = '2 the square root of 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes100
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes100 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mn>1</mn><mo>+</mo><mn>2</mn><msqrt><mn>3</mn>' +
      '</msqrt></mrow></math>';
  var speech = '1 plus 2 the square root of 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes101
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes101 = function() {
  var preference = 'ImpliedTimes_None:Functions_Auto';
  var mathml = '<math><mrow><mi>f</mi><mo stretchy="false">(</mo><mi>x</mi>' +
      '<mo stretchy="false">)</mo><mo>=</mo><msup><mi>x</mi><mn>2</mn>' +
      '</msup><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'f of x, equals x squared, open paren, x plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


// TODO: (Simons) Need to be able to specify excluded preferences.
/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes102
 */
sre.ClearspeakEnglishImpliedTimes.prototype.untestImpTimes102 = function() {
  var preference = 'ImpliedTimes_None:Functions_None';
  var mathml = '<math><mrow><mi>f</mi><mo stretchy="false">(</mo><mi>x</mi>' +
      '<mo stretchy="false">)</mo><mo>=</mo><msup><mi>x</mi><mn>2</mn>' +
      '</msup><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'f, open paren, x, close paren, equals x squared, open' +
      ' paren, x plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes103
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes103 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mi>sin</mi><mi>x</mi><mi>cos</mi><mi>y</mi>' +
      '<mo>+</mo><mi>cos</mi><mi>x</mi><mi>sin</mi><mi>y</mi></mrow></math>';
  var speech = 'sine x cosine y, plus, cosine x sine y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes104
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes104 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><msub><mrow><mi>log</mi></mrow><mrow><mn>10' +
      '</mn></mrow></msub><mi>x</mi><mi>y</mi></mrow></math>';
  var speech = 'the log base 10 of, x y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes105
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes105 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mi>log</mi><mrow><mo>(</mo><mrow><mi>x</mi>' +
      '<mo>+</mo><mi>y</mi></mrow><mo>)</mo></mrow><mo>=</mo><mi>log</mi>' +
      '<mi>x</mi><mi>log</mi><mi>y</mi></mrow></math>';
  var speech = 'the log of, open paren, x plus y, close paren, equals, log' +
      ' x log y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes106
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes106 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>5</mn></mtd>' +
      '<mtd><mn>2</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow><mrow>' +
      '<mo>(</mo><mrow><mtable><mtr><mtd><mn>7</mn></mtd><mtd><mn>4</mn>' +
      '</mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>1</mn></mtd></mtr>' +
      '</mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: 1, 3 Row 2: 5, 2. the 2 by 2' +
      ' matrix. Row 1: 7, 4 Row 2: 0, 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes107
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes107 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mrow><mn>3</mn>' +
      '<mrow><mo>(</mo><mrow><mrow><mo>(</mo><mrow><mn>4</mn><mo>+</mo>' +
      '<mn>5</mn></mrow><mo>)</mo></mrow><mo>+</mo><mn>6</mn></mrow><mo>)' +
      '</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2, open paren, 3, open paren, open paren, 4 plus 5, close' +
      ' paren, plus 6, close paren, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes108
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes108 = function() {
  var preference = 'ImpliedTimes_None:Paren_SpeakNestingLevel';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mrow><mn>3</mn>' +
      '<mrow><mo>(</mo><mrow><mrow><mo>(</mo><mrow><mn>4</mn><mo>+</mo>' +
      '<mn>5</mn></mrow><mo>)</mo></mrow><mo>+</mo><mn>6</mn></mrow><mo>)' +
      '</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2, open paren, 3, open second paren, open third paren, 4' +
      ' plus 5, close third paren, plus 6, close second paren, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes109
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes109 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>[</mo><mrow><mn>3</mn>' +
      '<mrow><mo>(</mo><mrow><mrow><mo>(</mo><mrow><mn>4</mn><mo>+</mo>' +
      '<mn>5</mn></mrow><mo>)</mo></mrow><mo>+</mo><mn>6</mn></mrow><mo>)' +
      '</mo></mrow></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = '2, open bracket, 3, open paren, open paren, 4 plus 5, close' +
      ' paren, plus 6, close paren, close bracket';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes110
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes110 = function() {
  var preference = 'ImpliedTimes_None:Paren_SpeakNestingLevel';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>[</mo><mrow><mn>3</mn>' +
      '<mrow><mo>(</mo><mrow><mrow><mo>(</mo><mrow><mn>4</mn><mo>+</mo>' +
      '<mn>5</mn></mrow><mo>)</mo></mrow><mo>+</mo><mn>6</mn></mrow><mo>)' +
      '</mo></mrow></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = '2, open bracket, 3, open paren, open second paren, 4 plus' +
      ' 5, close second paren, plus 6, close paren, close bracket';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes111
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes111 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>|</mo><mi>x</mi><mo>|</mo>' +
      '</mrow></mrow></math>';
  var speech = '2, the absolute value of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes112
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes112 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mrow><mo>|</mo><mi>x</mi><mo>|</mo></mrow>' +
      '<mrow><mo>|</mo><mi>y</mi><mo>|</mo></mrow></mrow></math>';
  var speech = 'the absolute value of x, the absolute value of y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes113
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes113 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mi>x</mi><mo>+</mo><mn>1' +
      '</mn></mrow><mo>|</mo></mrow><mrow><mo>|</mo><mrow><mi>y</mi><mo>−' +
      '</mo><mn>1</mn></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the absolute value of x plus 1, the absolute value of y' +
      ' minus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimes114
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimes114 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mi>x</mi><mo>+</mo><mn>1' +
      '</mn></mrow><mo>|</mo></mrow><mrow><mo>|</mo><mi>y</mi><mo>|</mo>' +
      '</mrow><mo>−</mo><mn>1</mn></mrow></math>';
  var speech = 'the absolute value of x plus 1, the absolute value of y,' +
      ' minus 1';
  this.executeRuleTest(mathml, speech, preference);
};


//
// No Implied Times and Silent Parenthesis Preferences both set
//


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimesSilPar001
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimesSilPar001 = function() {
  var preference = 'ImpliedTimes_None:Paren_Silent';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mn>3</mn><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = '2, open paren, 3, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimesSilPar002
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimesSilPar002 = function() {
  var preference = 'ImpliedTimes_None:Paren_Silent';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>[</mo><mn>3</mn><mo>]</mo>' +
      '</mrow></mrow></math>';
  var speech = '2, open bracket, 3, close bracket';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimesSilPar003
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimesSilPar003 = function() {
  var preference = 'ImpliedTimes_None:Paren_Silent';
  var mathml = '<math><mrow><msup><mn>2</mn><mn>4</mn></msup><mrow><mo>(' +
      '</mo><mn>3</mn><mo>)</mo></mrow></mrow></math>';
  var speech = '2 to the fourth power, open paren, 3, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimesSilPar004
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimesSilPar004 = function() {
  var preference = 'ImpliedTimes_None:Paren_Silent';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mrow><mn>3</mn><mo>+' +
      '</mo><mn>4</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2, open paren, 3 plus 4, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimesSilPar005
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimesSilPar005 = function() {
  var preference = 'ImpliedTimes_None:Paren_Silent';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>[</mo><mrow><mn>3</mn><mo>+' +
      '</mo><mn>4</mn></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = '2, open bracket, 3 plus 4, close bracket';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimesSilPar006
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimesSilPar006 = function() {
  var preference = 'ImpliedTimes_None:Paren_Silent';
  var mathml = '<math><mrow><mrow><mo>(</mo><mn>3</mn><mo>)</mo></mrow>' +
      '<mrow><mo>(</mo><mn>2</mn><mo>)</mo></mrow></mrow></math>';
  var speech = 'open paren, 3, close paren, open paren, 2, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimesSilPar007
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimesSilPar007 = function() {
  var preference = 'ImpliedTimes_None:Paren_Silent';
  var mathml = '<math><mrow><mn>2</mn><msup><mrow><mrow><mo>(</mo><mrow>' +
      '<mn>3</mn><mo>+</mo><mn>4</mn></mrow><mo>)</mo></mrow></mrow><mn>2' +
      '</mn></msup></mrow></math>';
  var speech = '2, open paren, 3 plus 4, close paren, squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimesSilPar008
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimesSilPar008 = function() {
  var preference = 'ImpliedTimes_None:Paren_Silent';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mn>2</mn><mo>+</mo><mn>7' +
      '</mn></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mn>3</mn><mo>−' +
      '</mo><mn>6</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'open paren, 2 plus 7, close paren, open paren, 3 minus 6,' +
      ' close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimesSilPar009
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimesSilPar009 = function() {
  var preference = 'ImpliedTimes_None:Paren_Silent';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mn>2</mn><mo>+</mo><mn>7' +
      '</mn></mrow><mo>]</mo></mrow><mrow><mo>[</mo><mrow><mn>3</mn><mo>−' +
      '</mo><mn>6</mn></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'open bracket, 2 plus 7, close bracket, open bracket, 3' +
      ' minus 6, close bracket';
  this.executeRuleTest(mathml, speech, preference);
};


// TODO: (Simons) x is categorised as function!
/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimesSilPar010
 */
sre.ClearspeakEnglishImpliedTimes.prototype.untestImpTimesSilPar010 = function() {
  var preference = 'ImpliedTimes_None:Paren_Silent';
  var mathml = '<math><mrow><mi>x</mi><mrow><mo>(</mo><mrow><mi>y</mi><mi>z' +
      '</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'x, open paren, y z, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimesSilPar011
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimesSilPar011 = function() {
  var preference = 'ImpliedTimes_None:Paren_Silent';
  var mathml = '<math><mrow><mi>x</mi><mrow><mo>(</mo><mrow><mi>y</mi><mo>+' +
      '</mo><mi>z</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'x, open paren, y plus z, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimesSilPar012
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimesSilPar012 = function() {
  var preference = 'ImpliedTimes_None:Paren_Silent';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mrow><mi>y</mi><mo>+' +
      '</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2, open paren, y plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimesSilPar013
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimesSilPar013 = function() {
  var preference = 'ImpliedTimes_None:Paren_Silent';
  var mathml = '<math><mrow><mo stretchy="false">(</mo><mn>2</mn><mo>−</mo>' +
      '<mn>1</mn><mo stretchy="false">)</mo><mi>x</mi></mrow></math>';
  var speech = 'open paren, 2 minus 1, close paren, x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimesSilPar014
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimesSilPar014 = function() {
  var preference = 'ImpliedTimes_None:Paren_Silent';
  var mathml = '<math><mrow><msub><mi>p</mi><mn>1</mn></msub><mrow><mo>(' +
      '</mo><mrow><mn>3</mn><mo>+</mo><mn>7</mn></mrow><mo>)</mo></mrow>' +
      '</mrow></math>';
  var speech = 'p sub 1, open paren, 3 plus 7, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimesSilPar015
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimesSilPar015 = function() {
  var preference = 'ImpliedTimes_None:Paren_Silent';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mi>x</mi>' +
      '<mo>+</mo><mi>y</mi></mrow><mo>)</mo></mrow></mrow><mrow><mo>−</mo>' +
      '<mn>4</mn></mrow></msup><msup><mrow><mrow><mo>(</mo><mrow><mi>x</mi>' +
      '<mo>−</mo><mi>y</mi></mrow><mo>)</mo></mrow></mrow><mrow><mo>−</mo>' +
      '<mn>4</mn></mrow></msup></mrow></math>';
  var speech = 'open paren, x plus y, close paren, to the negative 4 power,' +
      ' open paren, x minus y, close paren, to the negative 4 power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimesSilPar016
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimesSilPar016 = function() {
  var preference = 'ImpliedTimes_None:Paren_Silent';
  var mathml = '<math><mrow><msup><mn>2</mn><mrow><mn>4</mn><mrow><mo>(' +
      '</mo><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mo>)</mo></mrow>' +
      '</mrow></msup></mrow></math>';
  var speech = '2 raised to the 4, open paren, x plus y, close paren, power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimesSilPar017
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimesSilPar017 = function() {
  var preference = 'ImpliedTimes_None';
  // preference = 'Paren_Silent';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mi>f</mi><mo stretchy="false">(</mo><mi>x</mi>' +
      '<mo stretchy="false">)</mo><mo>=</mo><msup><mi>x</mi><mn>2</mn>' +
      '</msup><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'f of x, equals x squared, open paren, x plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


// TODO: (Simons) Need to be able to specify excluded preferences.
/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimesSilPar018
 */
sre.ClearspeakEnglishImpliedTimes.prototype.untestImpTimesSilPar018 = function() {
  var preference = 'ImpliedTimes_None:Paren_Silent:Functions_None';
  var mathml = '<math><mrow><mi>f</mi><mo stretchy="false">(</mo><mi>x</mi>' +
      '<mo stretchy="false">)</mo><mo>=</mo><msup><mi>x</mi><mn>2</mn>' +
      '</msup><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow>' +
      '<mo>)</mo></mrow></mrow></math>';
  var speech = 'f, open paren, x, close paren, equals, x squared, open' +
      ' paren, x plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimesSilPar019
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimesSilPar019 = function() {
  var preference = 'ImpliedTimes_None';
  // preference = 'Paren_Silent';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mi>log</mi><mrow><mo>(</mo><mrow><mi>x</mi>' +
      '<mo>+</mo><mi>y</mi></mrow><mo>)</mo></mrow><mo>=</mo><mi>log</mi>' +
      '<mi>x</mi><mi>log</mi><mi>y</mi></mrow></math>';
  var speech = 'the log of, open paren, x plus y, close paren, equals, log' +
      ' x log y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimesSilPar020
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimesSilPar020 = function() {
  var preference = 'ImpliedTimes_None:Paren_Silent';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1' +
      '</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>5</mn></mtd>' +
      '<mtd><mn>2</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow><mrow>' +
      '<mo>(</mo><mrow><mtable><mtr><mtd><mn>7</mn></mtd><mtd><mn>4</mn>' +
      '</mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>1</mn></mtd></mtr>' +
      '</mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix. Row 1: 1, 3 Row 2: 5, 2. the 2 by 2' +
      ' matrix. Row 1: 7, 4 Row 2: 0, 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimesSilPar021
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimesSilPar021 = function() {
  var preference = 'ImpliedTimes_None:Paren_Silent';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mrow><mn>3</mn>' +
      '<mrow><mo>(</mo><mrow><mrow><mo>(</mo><mrow><mn>4</mn><mo>+</mo>' +
      '<mn>5</mn></mrow><mo>)</mo></mrow><mo>+</mo><mn>6</mn></mrow><mo>)' +
      '</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2, open paren, 3, open paren, open paren, 4 plus 5, close' +
      ' paren, plus 6, close paren, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimesSilPar022
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimesSilPar022 = function() {
  var preference = 'ImpliedTimes_None:Paren_SpeakNestingLevel';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mrow><mn>3</mn>' +
      '<mrow><mo>(</mo><mrow><mrow><mo>(</mo><mrow><mn>4</mn><mo>+</mo>' +
      '<mn>5</mn></mrow><mo>)</mo></mrow><mo>+</mo><mn>6</mn></mrow><mo>)' +
      '</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2, open paren, 3, open second paren, open third paren, 4' +
      ' plus 5, close third paren, plus 6, close second paren, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimesSilPar023
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimesSilPar023 = function() {
  var preference = 'ImpliedTimes_None:Paren_Silent';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>[</mo><mrow><mn>3</mn>' +
      '<mrow><mo>(</mo><mrow><mrow><mo>(</mo><mrow><mn>4</mn><mo>+</mo>' +
      '<mn>5</mn></mrow><mo>)</mo></mrow><mo>+</mo><mn>6</mn></mrow><mo>)' +
      '</mo></mrow></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = '2, open bracket, 3, open paren, open paren, 4 plus 5, close' +
      ' paren, plus 6, close paren, close bracket';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example ImpTimesSilPar024
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testImpTimesSilPar024 = function() {
  var preference = 'ImpliedTimes_None:Paren_SpeakNestingLevel';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>[</mo><mrow><mn>3</mn>' +
      '<mrow><mo>(</mo><mrow><mrow><mo>(</mo><mrow><mn>4</mn><mo>+</mo>' +
      '<mn>5</mn></mrow><mo>)</mo></mrow><mo>+</mo><mn>6</mn></mrow><mo>)' +
      '</mo></mrow></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = '2, open bracket, 3, open paren, open second paren, 4 plus' +
      ' 5, close second paren, plus 6, close paren, close bracket';
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
 * Testing ClearspeakEnglishImpliedTimes Example Extra001
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testExtra001 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mi>A</mi><mo>=</mo><mi>h</mi><mrow><mo>(</mo>' +
      '<mrow><mfrac><mrow><msub><mi>b</mi><mn>1</mn></msub><mo>+</mo><msub>' +
      '<mi>b</mi><mn>2</mn></msub></mrow><mn>2</mn></mfrac></mrow><mo>)' +
      '</mo></mrow></mrow></math>';
  var speech = 'A equals h of, open paren, the fraction with numerator, b' +
      ' sub 1, plus, b sub 2, and denominator 2, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example Extra002
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testExtra002 = function() {
  var preference = 'ImpliedTimes_Auto:Functions_None';
  var mathml = '<math><mrow><mi>A</mi><mo>=</mo><mi>h</mi><mrow><mo>(</mo>' +
      '<mrow><mfrac><mrow><msub><mi>b</mi><mn>1</mn></msub><mo>+</mo><msub>' +
      '<mi>b</mi><mn>2</mn></msub></mrow><mn>2</mn></mfrac></mrow><mo>)' +
      '</mo></mrow></mrow></math>';
  var speech = 'A equals, h times, open paren, the fraction with numerator,' +
      ' b sub 1, plus, b sub 2, and denominator 2, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example Extra003
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testExtra003 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mi>a</mi><mrow><mo>(</mo><mn>0</mn><mo>)</mo>' +
      '</mrow><mo>=</mo><mn>0</mn><mrow><mo>(</mo><mi>a</mi><mo>)</mo>' +
      '</mrow><mo>=</mo><mn>0</mn></mrow></math>';
  var speech = 'a of 0, equals 0 times a equals 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example Extra004
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testExtra004 = function() {
  var preference = 'ImpliedTimes_Auto:Functions_None';
  var mathml = '<math><mrow><mi>a</mi><mrow><mo>(</mo><mn>0</mn><mo>)</mo>' +
      '</mrow><mo>=</mo><mn>0</mn><mrow><mo>(</mo><mi>a</mi><mo>)</mo>' +
      '</mrow><mo>=</mo><mn>0</mn></mrow></math>';
  var speech = 'a times 0, equals 0 times a equals 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example Extra005
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testExtra005 = function() {
  var preference = 'ImpliedTimes_Auto';
  preference = 'Functions_None';
  var mathml = '<math><mrow><mi>a</mi><mrow><mo>(</mo><mrow><mo>−</mo><mn>1' +
      '</mn></mrow><mo>)</mo></mrow><mo>=</mo><mo>−</mo><mi>a</mi></mrow>' +
      '</math>';
  var speech = 'a times negative 1, equals negative a';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example Extra006
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testExtra006 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mi>a</mi><mrow><mo>(</mo><mrow><mo>−</mo><mn>1' +
      '</mn></mrow><mo>)</mo></mrow><mo>=</mo><mo>−</mo><mi>a</mi></mrow>' +
      '</math>';
  var speech = 'a of negative 1, equals negative a';
  this.executeRuleTest(mathml, speech, preference);
};


// TODO: (Simons) a is categorised as function!
/**
 * Testing ClearspeakEnglishImpliedTimes Example Extra007
 */
sre.ClearspeakEnglishImpliedTimes.prototype.untestExtra007 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mi>a</mi><mrow><mo>(</mo><mrow><mi>b</mi><mi>c' +
      '</mi></mrow><mo>)</mo></mrow><mo>=</mo><mrow><mo>(</mo><mrow><mi>a' +
      '</mi><mi>b</mi></mrow><mo>)</mo></mrow><mi>c</mi></mrow></math>';
  var speech = 'a times b c, equals, a b times c';
  this.executeRuleTest(mathml, speech, preference);
};


// TODO: (Simons) a is categorised as function!
/**
 * Testing ClearspeakEnglishImpliedTimes Example Extra008
 */
sre.ClearspeakEnglishImpliedTimes.prototype.untestExtra008 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mi>a</mi><mrow><mo>(</mo><mrow><mfrac><mn>1' +
      '</mn><mi>a</mi></mfrac></mrow><mo>)</mo></mrow><mo>=</mo><mn>1</mn>' +
      '</mrow></math>';
  var speech = 'a times, open paren, 1 over a, close paren, equals, 1';
  this.executeRuleTest(mathml, speech, preference);
};


// TODO: (Simons) a is categorised as function!
/**
 * Testing ClearspeakEnglishImpliedTimes Example Extra009
 */
sre.ClearspeakEnglishImpliedTimes.prototype.untestExtra009 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math style="background-color:#"> <semantics>  <mrow>   ' +
      '<mo>−</mo><mi>u</mi><mrow><mo>(</mo>    <mi>v</mi>   <mo>)</mo>' +
      '</mrow><mo>=</mo><mi>u</mi><mrow><mo>(</mo>    <mrow>     <mo>−</mo>' +
      '<mi>v</mi></mrow>   <mo>)</mo></mrow><mo>=</mo><mo>−</mo><mrow><mo>(' +
      '</mo>    <mrow>     <mi>u</mi><mi>v</mi></mrow>   <mo>)</mo></mrow>' +
      '</mrow>   </semantics></math>';
  var speech = 'negative u times v, equals u times negative v, equals negative u v';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example Extra010
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testExtra010 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mi>B</mi><mrow><mo>(</mo><mrow><mn>2</mn><mo>,' +
      '</mo><mn>6</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'B of, open paren, 2 comma 6, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example Extra012
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testExtra012 = function() {
  var preference = 'ImpliedTimes_Auto:Functions_None';
  var mathml = '<math><mrow><mi>B</mi><mrow><mo>(</mo><mrow><mn>2</mn><mo>,' +
      '</mo><mn>6</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'B times, open paren, 2 comma 6, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


// TODO: (Simons) Explore exact speech.
/**
 * Testing ClearspeakEnglishImpliedTimes Example Extra013
 */
sre.ClearspeakEnglishImpliedTimes.prototype.untestExtra013 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mi exact-speech="point B">B</mi><mrow><mo>(</mo><mrow><mn>2</mn><mo>,' +
      '</mo><mn>6</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'point B, open paren, 2 comma 6, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example Extra014
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testExtra014 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mi>p</mi><mrow><mo>(</mo><mi>w</mi><mo>)</mo>' +
      '</mrow></mrow></math>';
  var speech = 'p of w';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example Extra015
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testExtra015 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mi>x</mi><mrow><mo>(</mo><mi>t</mi><mo>)</mo>' +
      '</mrow><mo>=</mo><mn>2</mn><mi>t</mi><mo>+</mo><mn>4</mn></mrow></math>';
  var speech = 'x of t, equals 2 t, plus 4';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example Extra016
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testExtra016 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mi>k</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '</mrow><mo>=</mo><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>3' +
      '</mn></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mi>x</mi><mo>−' +
      '</mo><mn>5</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'k of x, equals, open paren, x plus 3, close paren, times,' +
      ' open paren, x minus 5, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


// TODO: (Simons) a is categorised as function!
/**
 * Testing ClearspeakEnglishImpliedTimes Example Extra017
 */
sre.ClearspeakEnglishImpliedTimes.prototype.untestExtra017 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mn>3</mn><msup><mi>a</mi><mn>2</mn></msup>' +
      '<mo>−</mo><mn>12</mn><mi>a</mi><mo>=</mo><mn>3</mn><mi>a</mi><mrow>' +
      '<mo>(</mo><mi>a</mi><mo>)</mo></mrow><mo>−</mo><mn>3</mn><mi>a</mi>' +
      '<mrow><mo>(</mo><mn>4</mn><mo>)</mo></mrow></mrow></math>';
  var speech = '3 a squared minus 12 a, equals, 3 a, times a, minus 3 a,' +
      ' times 4';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example Extra018
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testExtra018 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mi>T</mi><mrow><mo>(</mo><mi>t</mi><mo>)</mo>' +
      '</mrow><mo>=</mo><msub><mi>T</mi><mi>s</mi></msub><mo>+</mo><mrow>' +
      '<mo>(</mo><mrow><msub><mi>T</mi><mn>0</mn></msub><mo>−</mo><msub>' +
      '<mi>T</mi><mi>s</mi></msub></mrow><mo>)</mo></mrow><msup><mi>e</mi>' +
      '<mrow><mo>−</mo><mi>k</mi><mi>t</mi></mrow></msup></mrow></math>';
  var speech = 'T of t, equals, T sub s, plus, open paren, T sub 0, minus,' +
      ' T sub s, close paren, times e raised to the negative k t, power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishImpliedTimes Example Extra019
 */
sre.ClearspeakEnglishImpliedTimes.prototype.testExtra019 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mi>V</mi><mo>=</mo><mi mathvariant="script">l' +
      '</mi><mi>w</mi><mrow><mo>(</mo><mn>8</mn><mo>)</mo></mrow></mrow>' +
      '</math>';
  var speech = 'V equals script l, w of 8';
  // w is considered a simple function.
  //var speech = 'V, equals, script l, w, times 8';
  this.executeRuleTest(mathml, speech, preference);
};


// TODO: (Simons) Explore exact speech.
/**
 * Testing ClearspeakEnglishImpliedTimes Example Extra020
 */
sre.ClearspeakEnglishImpliedTimes.prototype.untestExtra020 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mi>V</mi><mo>=</mo><mi mathvariant="script">l' +
      '</mi><mi>w</mi><mrow exact-speech="times 8"><mo>(</mo><mn>8</mn><mo>)</mo></mrow></mrow>' +
      '</math>';
  var speech = 'V, equals, l w, times 8';
  this.executeRuleTest(mathml, speech, preference);
};

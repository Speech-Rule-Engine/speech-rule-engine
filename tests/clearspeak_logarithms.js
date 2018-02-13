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


goog.provide('sre.ClearspeakLogarithms');

goog.require('sre.ClearspeakRuleTest');



/**
* @constructor
* @extends {sre.ClearspeakRuleTest}
*/
sre.ClearspeakLogarithms = function() {
  sre.ClearspeakLogarithms.base(this, 'constructor');

  /**
* @override
  */
  this.information = 'ClearspeakLogarithms rule tests.';

};
goog.inherits(sre.ClearspeakLogarithms, sre.ClearspeakRuleTest);



//
// Logarithms
//


/**
 * Testing ClearspeakLogarithms Example Log001
 */
sre.ClearspeakLogarithms.prototype.testLog001 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><mi>log</mi><mi>x</mi></mrow></math>';
  var speech = 'log x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakLogarithms Example Log002
 */
sre.ClearspeakLogarithms.prototype.testLog002 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><msub><mrow><mi>log</mi></mrow><mrow><mn>10</mn></mrow></msub><mi>x</mi></mrow></math>';
  var speech = 'the log base 10 of, x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakLogarithms Example Log003
 */
sre.ClearspeakLogarithms.prototype.testLog003 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><msub><mrow><mi>log</mi></mrow><mi>b</mi></msub><mi>a</mi><mi>x</mi><mo>=</mo><msub><mrow><mi>log</mi></mrow><mi>b</mi></msub><mi>a</mi><mo>+</mo><msub><mrow><mi>log</mi></mrow><mi>b</mi></msub><mi>x</mi></mrow></math>';
  var speech = 'the log base b of, a x, equals, the log base b of, a, plus, the log base b of, x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakLogarithms Example Log004
 */
sre.ClearspeakLogarithms.prototype.testLog004 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><msub><mrow><mi>log</mi></mrow><mi>b</mi></msub><mfrac><mi>S</mi><mi>T</mi></mfrac><mo>=</mo><msub><mrow><mi>log</mi></mrow><mi>b</mi></msub><mi>S</mi><mo>−</mo><msub><mrow><mi>log</mi></mrow><mi>b</mi></msub><mi>T</mi></mrow></math>';
  var speech = 'the log base b of, S over T, equals, the log base b of, S, minus, the log base b of, T';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakLogarithms Example Log005
 */
sre.ClearspeakLogarithms.prototype.testLog005 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><msub><mrow><mi>log</mi></mrow><mi>b</mi></msub><mrow><mo>(</mo><mrow><msup><mi>x</mi><mi>k</mi></msup></mrow><mo>)</mo></mrow><mo>=</mo><mi>k</mi><msub><mrow><mi>log</mi></mrow><mi>b</mi></msub><mi>x</mi></mrow></math>';
  var speech = 'the log base b of, open paren, x to the kth power, close paren, equals k, the log base b of, x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakLogarithms Example Log006
 */
sre.ClearspeakLogarithms.prototype.testLog006 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><msup><mrow><mn>10</mn></mrow><mrow><msub><mrow><mi>log</mi></mrow><mrow><mn>10</mn></mrow></msub><mi>x</mi></mrow></msup><mo>=</mo><mi>x</mi></mrow></math>';
  var speech = '10 raised to the log base 10 of, x, power, equals x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakLogarithms Example Log007
 */
sre.ClearspeakLogarithms.prototype.testLog007 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><msub><mrow><mi>log</mi></mrow><mrow><mn>10</mn></mrow></msub><msup><mrow><mn>10</mn></mrow><mi>x</mi></msup><mo>=</mo><mi>x</mi></mrow></math>';
  var speech = 'the log base 10 of, 10 to the xth power, equals x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakLogarithms Example Log008
 */
sre.ClearspeakLogarithms.prototype.testLog008 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><msup><mrow><mn>10</mn></mrow><mrow><msub><mrow><mi>log</mi></mrow><mrow><mn>10</mn></mrow></msub><mn>5</mn></mrow></msup><mo>=</mo><mn>5</mn></mrow></math>';
  var speech = '10 raised to the log base 10 of, 5, power, equals 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakLogarithms Example Log009
 */
sre.ClearspeakLogarithms.prototype.testLog009 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><msub><mrow><mi>log</mi></mrow><mrow><mn>10</mn></mrow></msub><msup><mrow><mn>10</mn></mrow><mn>3</mn></msup><mo>=</mo><mn>3</mn></mrow></math>';
  var speech = 'the log base 10 of, 10 cubed, equals 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakLogarithms Example Log010
 */
sre.ClearspeakLogarithms.prototype.testLog010 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><msub><mrow><mi>log</mi></mrow><mi>a</mi></msub><mi>x</mi><mo>=</mo><mfrac><mrow><msub><mrow><mi>log</mi></mrow><mi>b</mi></msub><mi>x</mi></mrow><mrow><msub><mrow><mi>log</mi></mrow><mi>b</mi></msub><mi>a</mi></mrow></mfrac></mrow></math>';
  var speech = 'the log base a of, x, equals, the log base b of, x, over, the log base b of, a';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakLogarithms Example Log011
 */
sre.ClearspeakLogarithms.prototype.testLog011 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><mfrac><mrow><msub><mrow><mi>log</mi></mrow><mrow><mn>10</mn></mrow></msub><mn>18</mn></mrow><mrow><msub><mrow><mi>log</mi></mrow><mrow><mn>10</mn></mrow></msub><mn>3</mn></mrow></mfrac><mo>=</mo><msub><mrow><mi>log</mi></mrow><mn>3</mn></msub><mn>18</mn></mrow></math>';
  var speech = 'the log base 10 of, 18, over, the log base 10 of, 3, equals, the log base 3 of, 18';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakLogarithms Example Log012
 */
sre.ClearspeakLogarithms.prototype.testLog012 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>log</mi><mi>x</mi></mrow><mrow><mi>log</mi><mi>a</mi></mrow></mfrac></mrow></math>';
  var speech = 'log x over log a';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakLogarithms Example Log013
 */
sre.ClearspeakLogarithms.prototype.testLog013 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><mi>log</mi><mo stretchy="false">(</mo><mi>x</mi><mo>+</mo><mn>1</mn><mo stretchy="false">)</mo></mrow></math>';
  var speech = 'the log of, open paren, x plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakLogarithms Example Log014
 */
sre.ClearspeakLogarithms.prototype.testLog014 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><mi>log</mi><msup><mrow><mo stretchy="false">(</mo><mi>x</mi><mo>+</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><mn>2</mn></msup></mrow></math>';
  var speech = 'the log of, open paren, x plus 1, close paren, squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakLogarithms Example Log015
 */
sre.ClearspeakLogarithms.prototype.testLog015 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><mi>log</mi><mo stretchy="false">(</mo><mi>x</mi><mi>y</mi><mo stretchy="false">)</mo></mrow></math>';
  var speech = 'log x y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakLogarithms Example Log016
 */
sre.ClearspeakLogarithms.prototype.testLog016 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>log</mi><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow><mrow><mi>log</mi><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>2</mn></mrow><mo>)</mo></mrow></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator, the log of, open paren, x plus 1, close paren, and denominator, the log of, open paren, x plus 2, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakLogarithms Example Log017
 */
sre.ClearspeakLogarithms.prototype.testLog017 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><mfrac><mrow><msub><mrow><mi>log</mi></mrow><mn>6</mn></msub><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow><mrow><msub><mrow><mi>log</mi></mrow><mn>6</mn></msub><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>2</mn></mrow><mo>)</mo></mrow></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator, the log base 6 of, open paren, x plus 1, close paren, and denominator, the log base 6 of, open paren, x plus 2, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakLogarithms Example Log018
 */
sre.ClearspeakLogarithms.prototype.testLog018 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>log</mi><mn>40</mn><mo>+</mo><mi>log</mi><mn>60</mn></mrow><mrow><mi>log</mi><mn>5</mn></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator log 40 plus log 60, and denominator log 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakLogarithms Example Log019
 */
sre.ClearspeakLogarithms.prototype.testLog019 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><mfrac><mrow><msub><mrow><mi>log</mi></mrow><mn>3</mn></msub><mn>40</mn><mo>+</mo><msub><mrow><mi>log</mi></mrow><mn>3</mn></msub><mn>60</mn></mrow><mrow><msub><mrow><mi>log</mi></mrow><mn>3</mn></msub><mn>5</mn></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator, the log base 3 of, 40, plus, the log base 3 of, 60, and denominator, the log base 3 of, 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakLogarithms Example Log020
 */
sre.ClearspeakLogarithms.prototype.testLog020 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><mi>log</mi><mo stretchy="false">(</mo><msup><mn>3</mn><mn>4</mn></msup><msup><mrow><mn>12</mn></mrow><mn>9</mn></msup><mo stretchy="false">)</mo><mo>=</mo><mn>4</mn><mi>log</mi><mn>3</mn><mo>+</mo><mn>9</mn><mi>log</mi><mn>12</mn></mrow></math>';
  var speech = 'the log of, open paren, 3 to the fourth power, 12 to the ninth power, close paren, equals 4 log 3, plus 9 log 12';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakLogarithms Example Log021
 */
sre.ClearspeakLogarithms.prototype.testLog021 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><mi>log</mi><mrow><mo>(</mo><mrow><mfrac><mi>x</mi><mi>y</mi></mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the log of, open paren, x over y, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakLogarithms Example Log022
 */
// TODO: Fix the vulgar fraction predicate!
sre.ClearspeakLogarithms.prototype.testLog022 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><mi>log</mi><mrow><mo>(</mo><mrow><mfrac><mrow><msup><mn>3</mn><mn>4</mn></msup></mrow><mrow><msup><mn>8</mn><mrow><mn>10</mn></mrow></msup></mrow></mfrac></mrow><mo>)</mo></mrow><mo>=</mo><mn>4</mn><mi>log</mi><mn>3</mn><mo>−</mo><mn>10</mn><mi>log</mi><mn>8</mn></mrow></math>';
  var speech = 'the log of, open paren, the fraction with numerator 3 to the fourth power, and denominator 8 to the tenth power, close paren, equals 4 log 3, minus 10 log 8';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakLogarithms Example Log023
 */
sre.ClearspeakLogarithms.prototype.testLog023 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><msup><mrow><mn>10</mn></mrow><mrow><mi>log</mi><mi>x</mi></mrow></msup></mrow></math>';
  var speech = '10 raised to the log x power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakLogarithms Example NatLog001
 */
sre.ClearspeakLogarithms.prototype.testNatLog001 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><mi>ln</mi><mi>x</mi></mrow></math>';
  var speech = 'l n x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakLogarithms Example NatLog002
 */
sre.ClearspeakLogarithms.prototype.testNatLog002 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><mi>ln</mi><mi>x</mi><mo>−</mo><mi>ln</mi><mo stretchy="false">(</mo><mi>x</mi><mo>−</mo><mn>1</mn><mo stretchy="false">)</mo><mo>=</mo><mi>ln</mi><mrow><mo>(</mo><mrow><mfrac><mi>x</mi><mrow><mi>x</mi><mo>−</mo><mn>1</mn></mrow></mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'l n x, minus l n of, open paren, x minus 1, close paren, equals l n of, open paren, the fraction with numerator x, and denominator x minus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakLogarithms Example NatLog003
 */
sre.ClearspeakLogarithms.prototype.testNatLog003 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><mi>ln</mi><mrow><mo>(</mo><mrow><msup><mi>e</mi><mi>x</mi></msup></mrow><mo>)</mo></mrow><mo>=</mo><mi>x</mi></mrow></math>';
  var speech = 'l n of, open paren, e to the xth power, close paren, equals x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakLogarithms Example NatLog004
 */
sre.ClearspeakLogarithms.prototype.testNatLog004 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><msup><mi>e</mi><mrow><mi>ln</mi><mi>x</mi></mrow></msup><mo>=</mo><mi>x</mi></mrow></math>';
  var speech = 'e raised to the l n x power, equals x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakLogarithms Example NatLog005
 */
sre.ClearspeakLogarithms.prototype.testNatLog005 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><mi>ln</mi><mrow><mo>(</mo><mrow><msup><mi>e</mi><mi>x</mi></msup></mrow><mo>)</mo></mrow><mo>=</mo><mi>x</mi></mrow></math>';
  var speech = 'l n of, open paren, e to the xth power, close paren, equals x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakLogarithms Example NatLog006
 */
sre.ClearspeakLogarithms.prototype.testNatLog006 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><msup><mi>e</mi><mrow><mi>ln</mi><mn>4</mn></mrow></msup><mo>=</mo><mn>4</mn></mrow></math>';
  var speech = 'e raised to the l n 4 power, equals 4';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakLogarithms Example NatLog007
 */
sre.ClearspeakLogarithms.prototype.testNatLog007 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>ln</mi><mn>40</mn></mrow><mrow><mi>ln</mi><mn>5</mn></mrow></mfrac><mo>=</mo><msub><mrow><mi>log</mi></mrow><mn>5</mn></msub><mn>40</mn></mrow></math>';
  var speech = 'l n 40, over l n 5, equals, the log base 5 of, 40';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakLogarithms Example NatLog008
 */
sre.ClearspeakLogarithms.prototype.testNatLog008 = function() {
  var preference = 'Log_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>ln</mi><mn>40</mn><mo>+</mo><mi>ln</mi><mn>60</mn></mrow><mrow><mi>ln</mi><mn>5</mn></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator l n 40, plus l n 60, and denominator l n 5';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakLogarithms Example NatLog009
 */
sre.ClearspeakLogarithms.prototype.testNatLog009 = function() {
  var preference = 'Log_LnAsNaturalLog';
  var mathml = '<math><mrow><mi>ln</mi><mi>x</mi></mrow></math>';
  var speech = 'natural log x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakLogarithms Example NatLog010
 */
sre.ClearspeakLogarithms.prototype.testNatLog010 = function() {
  var preference = 'Log_LnAsNaturalLog';
  var mathml = '<math><mrow><mi>ln</mi><mi>x</mi><mo>−</mo><mi>ln</mi><mo stretchy="false">(</mo><mi>x</mi><mo>−</mo><mn>1</mn><mo stretchy="false">)</mo><mo>=</mo><mi>ln</mi><mrow><mo>(</mo><mrow><mfrac><mi>x</mi><mrow><mi>x</mi><mo>−</mo><mn>1</mn></mrow></mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'natural log x, minus, the natural log of, open paren, x minus 1, close paren, equals, the natural log of, open paren, the fraction with numerator x, and denominator x minus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakLogarithms Example NatLog011
 */
sre.ClearspeakLogarithms.prototype.testNatLog011 = function() {
  var preference = 'Log_LnAsNaturalLog';
  var mathml = '<math><mrow><mi>ln</mi><mrow><mo>(</mo><mrow><msup><mi>e</mi><mi>x</mi></msup></mrow><mo>)</mo></mrow><mo>=</mo><mi>x</mi></mrow></math>';
  var speech = 'the natural log of, open paren, e to the xth power, close paren, equals x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakLogarithms Example NatLog012
 */
sre.ClearspeakLogarithms.prototype.testNatLog012 = function() {
  var preference = 'Log_LnAsNaturalLog';
  var mathml = '<math><mrow><msup><mi>e</mi><mrow><mi>ln</mi><mi>x</mi></mrow></msup><mo>=</mo><mi>x</mi></mrow></math>';
  var speech = 'e raised to the natural log x power, equals x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakLogarithms Example NatLog013
 */
sre.ClearspeakLogarithms.prototype.testNatLog013 = function() {
  var preference = 'Log_LnAsNaturalLog';
  var mathml = '<math><mrow><mi>ln</mi><mrow><mo>(</mo><mrow><msup><mi>e</mi><mi>x</mi></msup></mrow><mo>)</mo></mrow><mo>=</mo><mi>x</mi></mrow></math>';
  var speech = 'the natural log of, open paren, e to the xth power, close paren, equals x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakLogarithms Example NatLog014
 */
sre.ClearspeakLogarithms.prototype.testNatLog014 = function() {
  var preference = 'Log_LnAsNaturalLog';
  var mathml = '<math><mrow><msup><mi>e</mi><mrow><mi>ln</mi><mn>4</mn></mrow></msup><mo>=</mo><mn>4</mn></mrow></math>';
  var speech = 'e raised to the natural log 4 power, equals 4';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakLogarithms Example NatLog015
 */
sre.ClearspeakLogarithms.prototype.testNatLog015 = function() {
  var preference = 'Log_LnAsNaturalLog';
  var mathml = '<math><mrow><mfrac><mrow><mi>ln</mi><mn>40</mn></mrow><mrow><mi>ln</mi><mn>5</mn></mrow></mfrac><mo>=</mo><msub><mrow><mi>log</mi></mrow><mn>5</mn></msub><mn>40</mn></mrow></math>';
  var speech = 'natural log 40, over natural log 5, equals, the log base 5 of, 40';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakLogarithms Example NatLog016
 */
sre.ClearspeakLogarithms.prototype.testNatLog016 = function() {
  var preference = 'Log_LnAsNaturalLog';
  var mathml = '<math><mrow><mfrac><mrow><mi>ln</mi><mn>40</mn><mo>+</mo><mi>ln</mi><mn>60</mn></mrow><mrow><mi>ln</mi><mn>5</mn></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator natural log 40, plus natural log 60, and denominator natural log 5';
  this.executeRuleTest(mathml, speech, preference);
};

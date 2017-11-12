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


goog.provide('sre.ClearspeakFractions');

goog.require('sre.ClearspeakRuleTest');



/**
* @constructor
* @extends {sre.ClearspeakRuleTest}
*/
sre.ClearspeakFractions = function() {
sre.ClearspeakFractions.base(this, 'constructor');

/**
* @override
*/
this.information = 'ClearspeakFractions rule tests.';

};
goog.inherits(sre.ClearspeakFractions, sre.ClearspeakRuleTest);



//
// Fractions
//


/**
 * Testing ClearspeakFractions Example Frac001
 */
sre.ClearspeakFractions.prototype.testFrac001 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></math>';
  var speech = 'one half';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac002
 */
sre.ClearspeakFractions.prototype.testFrac002 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mn>12</mn></mrow><mrow><mn>32</mn></mrow></mfrac></mrow></math>';
  var speech = '12 over 32';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac002a
 */
sre.ClearspeakFractions.prototype.testFrac002a = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mi>x</mi><mi>y</mi></mfrac></mrow></math>';
  var speech = 'x over y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac002b
 */
sre.ClearspeakFractions.prototype.testFrac002b = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mi>x</mi></mrow><mrow><mn>3</mn><mi>y</mi></mrow></mfrac></mrow></math>';
  var speech = '2 x over 3 y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac002c
 */
sre.ClearspeakFractions.prototype.testFrac002c = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mi>y</mi></mrow><mrow><mi>c</mi><mi>d</mi></mrow></mfrac></mrow></math>';
  var speech = 'x y over c d';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac002d
 */
sre.ClearspeakFractions.prototype.testFrac002d = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow><mrow><mfrac><mn>1</mn><mn>3</mn></mfrac></mrow></mfrac></mrow></math>';
  var speech = 'one half over one third';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac002e
 */
sre.ClearspeakFractions.prototype.testFrac002e = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mo>−</mo><mi>x</mi></mrow><mi>y</mi></mfrac></mrow></math>';
  var speech = 'negative x over y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac002f
 */
sre.ClearspeakFractions.prototype.testFrac002f = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mo>−</mo><mn>2</mn><mi>x</mi></mrow><mrow><mn>3</mn><mi>y</mi></mrow></mfrac></mrow></math>';
  var speech = 'negative 2 x over 3 y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac002g
 */
sre.ClearspeakFractions.prototype.testFrac002g = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mi>y</mi></mrow><mrow><mo>−</mo><mi>c</mi><mi>d</mi></mrow></mfrac></mrow></math>';
  var speech = 'x y over negative c d';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac002h
 */
sre.ClearspeakFractions.prototype.testFrac002h = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow><mrow><mo>−</mo><mfrac><mn>1</mn><mn>3</mn></mfrac></mrow></mfrac></mrow></math>';
  var speech = 'one half over negative one third';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac003
 */
sre.ClearspeakFractions.prototype.testFrac003 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mo>+</mo><mn>3</mn></mrow><mrow><mn>13</mn></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator 2 plus 3, and denominator 13';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac004
 */
sre.ClearspeakFractions.prototype.testFrac004 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mn>2</mn></mfrac></mrow></math>';
  var speech = 'the fraction with numerator x plus y, and denominator 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac005
 */
sre.ClearspeakFractions.prototype.testFrac005 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator x plus y, and denominator x minus y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac006
 */
sre.ClearspeakFractions.prototype.testFrac006 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow></mfrac><mo>+</mo><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></math>';
  var speech = 'the fraction with numerator x plus y, and denominator x minus y, plus two thirds';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac007
 */
sre.ClearspeakFractions.prototype.testFrac007 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mtext>miles</mtext></mrow><mrow><mtext>gallon</mtext></mrow></mfrac></mrow></math>';
  var speech = 'miles over gallon';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac008
 */
sre.ClearspeakFractions.prototype.testFrac008 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mtext>miles</mtext></mrow><mrow><mn>3</mn><mtext>gallons</mtext></mrow></mfrac></mrow></math>';
  var speech = '2 miles over 3 gallons';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac009
 */
sre.ClearspeakFractions.prototype.testFrac009 = function() {
  var preference = 'Fraction_Over';
  var mathml = '<math><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></math>';
  var speech = '1 over 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac010
 */
sre.ClearspeakFractions.prototype.testFrac010 = function() {
  var preference = 'Fraction_Over';
  var mathml = '<math><mrow><mfrac><mrow><mn>12</mn></mrow><mrow><mn>32</mn></mrow></mfrac></mrow></math>';
  var speech = '12 over 32';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac011
 */
sre.ClearspeakFractions.prototype.testFrac011 = function() {
  var preference = 'Fraction_Over';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mo>+</mo><mn>3</mn></mrow><mrow><mn>13</mn></mrow></mfrac></mrow></math>';
  var speech = '2 plus 3 over 13';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac012
 */
sre.ClearspeakFractions.prototype.testFrac012 = function() {
  var preference = 'Fraction_Over';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mn>2</mn></mfrac></mrow></math>';
  var speech = 'x plus y over 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac013
 */
sre.ClearspeakFractions.prototype.testFrac013 = function() {
  var preference = 'Fraction_Over';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow></mfrac></mrow></math>';
  var speech = 'x plus y over x minus y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac014
 */
sre.ClearspeakFractions.prototype.testFrac014 = function() {
  var preference = 'Fraction_Over';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow></mfrac><mo>+</mo><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></math>';
  var speech = 'x plus y over x minus y, plus, 2 over 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac015
 */
sre.ClearspeakFractions.prototype.testFrac015 = function() {
  var preference = 'Fraction_Over';
  var mathml = '<math><mrow><mfrac><mrow><mtext>miles</mtext></mrow><mrow><mtext>gallon</mtext></mrow></mfrac></mrow></math>';
  var speech = 'miles over gallon';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac016
 */
sre.ClearspeakFractions.prototype.testFrac016 = function() {
  var preference = 'Fraction_Over';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mtext>miles</mtext></mrow><mrow><mn>3</mn><mtext>gallons</mtext></mrow></mfrac></mrow></math>';
  var speech = '2 miles over 3 gallons';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac017
 */
sre.ClearspeakFractions.prototype.testFrac017 = function() {
  var preference = 'Fraction_OverEndFrac';
  var mathml = '<math><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></math>';
  var speech = '1 over 2, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac018
 */
sre.ClearspeakFractions.prototype.testFrac018 = function() {
  var preference = 'Fraction_OverEndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mn>12</mn></mrow><mrow><mn>32</mn></mrow></mfrac></mrow></math>';
  var speech = '12 over 32, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac019
 */
sre.ClearspeakFractions.prototype.testFrac019 = function() {
  var preference = 'Fraction_OverEndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mo>+</mo><mn>3</mn></mrow><mrow><mn>13</mn></mrow></mfrac></mrow></math>';
  var speech = '2 plus 3 over 13, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac020
 */
sre.ClearspeakFractions.prototype.testFrac020 = function() {
  var preference = 'Fraction_OverEndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mn>2</mn></mfrac></mrow></math>';
  var speech = 'x plus y over 2, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac021
 */
sre.ClearspeakFractions.prototype.testFrac021 = function() {
  var preference = 'Fraction_OverEndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow></mfrac></mrow></math>';
  var speech = 'x plus y over x minus y, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac022
 */
sre.ClearspeakFractions.prototype.testFrac022 = function() {
  var preference = 'Fraction_OverEndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow></mfrac><mo>+</mo><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></math>';
  var speech = 'x plus y over x minus y, end fraction, plus, 2 over 3, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac023
 */
sre.ClearspeakFractions.prototype.testFrac023 = function() {
  var preference = 'Fraction_OverEndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mtext>miles</mtext></mrow><mrow><mtext>gallons</mtext></mrow></mfrac></mrow></math>';
  var speech = 'miles over gallons, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac024
 */
sre.ClearspeakFractions.prototype.testFrac024 = function() {
  var preference = 'Fraction_OverEndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mtext>miles</mtext></mrow><mrow><mn>3</mn><mtext>gallons</mtext></mrow></mfrac></mrow></math>';
  var speech = '2 miles over 3 gallons, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac025
 */
sre.ClearspeakFractions.prototype.testFrac025 = function() {
  var preference = 'Fraction_GeneralEndFrac';
  var mathml = '<math><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></math>';
  var speech = 'the fraction with numerator 1, and denominator 2, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac026
 */
sre.ClearspeakFractions.prototype.testFrac026 = function() {
  var preference = 'Fraction_GeneralEndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mn>12</mn></mrow><mrow><mn>32</mn></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator 12, and denominator 32, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac027
 */
sre.ClearspeakFractions.prototype.testFrac027 = function() {
  var preference = 'Fraction_GeneralEndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mo>+</mo><mn>3</mn></mrow><mrow><mn>13</mn></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator 2 plus 3, and denominator 13, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac028
 */
sre.ClearspeakFractions.prototype.testFrac028 = function() {
  var preference = 'Fraction_GeneralEndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mn>2</mn></mfrac></mrow></math>';
  var speech = 'the fraction with numerator x plus y, and denominator 2, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac029
 */
sre.ClearspeakFractions.prototype.testFrac029 = function() {
  var preference = 'Fraction_GeneralEndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator x plus y, and denominator x minus y, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac030
 */
sre.ClearspeakFractions.prototype.testFrac030 = function() {
  var preference = 'Fraction_GeneralEndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow></mfrac><mo>+</mo><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></math>';
  var speech = 'the fraction with numerator x plus y, and denominator x minus y, end fraction, plus, the fraction with numerator 2, and denominator 3, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac031
 */
sre.ClearspeakFractions.prototype.testFrac031 = function() {
  var preference = 'Fraction_GeneralEndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mtext>miles</mtext></mrow><mrow><mtext>gallon</mtext></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator miles, and denominator gallon, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac032
 */
sre.ClearspeakFractions.prototype.testFrac032 = function() {
  var preference = 'Fraction_General';
  var mathml = '<math><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></math>';
  var speech = 'the fraction with numerator 1, and denominator 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac033
 */
sre.ClearspeakFractions.prototype.testFrac033 = function() {
  var preference = 'Fraction_General';
  var mathml = '<math><mrow><mfrac><mrow><mn>12</mn></mrow><mrow><mn>32</mn></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator 12, and denominator 32';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac034
 */
sre.ClearspeakFractions.prototype.testFrac034 = function() {
  var preference = 'Fraction_General';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mo>+</mo><mn>3</mn></mrow><mrow><mn>13</mn></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator 2 plus 3, and denominator 13';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac035
 */
sre.ClearspeakFractions.prototype.testFrac035 = function() {
  var preference = 'Fraction_General';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mn>2</mn></mfrac></mrow></math>';
  var speech = 'the fraction with numerator x plus y, and denominator 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac036
 */
sre.ClearspeakFractions.prototype.testFrac036 = function() {
  var preference = 'Fraction_General';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator x plus y, and denominator x minus y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac037
 */
sre.ClearspeakFractions.prototype.testFrac037 = function() {
  var preference = 'Fraction_General';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow></mfrac><mo>+</mo><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></math>';
  var speech = 'the fraction with numerator x plus y, and denominator x minus y, plus, the fraction with numerator 2, and denominator 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac038
 */
sre.ClearspeakFractions.prototype.testFrac038 = function() {
  var preference = 'Fraction_General';
  var mathml = '<math><mrow><mfrac><mrow><mtext>miles</mtext></mrow><mrow><mtext>gallon</mtext></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator miles, and denominator gallon';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac039
 */
sre.ClearspeakFractions.prototype.testFrac039 = function() {
  var preference = 'Fraction_General';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mtext>miles</mtext></mrow><mrow><mn>3</mn><mtext>gallons</mtext></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator 2 miles, and denominator 3 gallons';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac040
 */
sre.ClearspeakFractions.prototype.testFrac040 = function() {
  var preference = 'Fraction_FracOver';
  var mathml = '<math><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></math>';
  var speech = 'the fraction 1 over 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac041
 */
sre.ClearspeakFractions.prototype.testFrac041 = function() {
  var preference = 'Fraction_FracOver';
  var mathml = '<math><mrow><mfrac><mrow><mn>12</mn></mrow><mrow><mn>32</mn></mrow></mfrac></mrow></math>';
  var speech = 'the fraction 12 over 32';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac042
 */
sre.ClearspeakFractions.prototype.testFrac042 = function() {
  var preference = 'Fraction_FracOver';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mo>+</mo><mn>3</mn></mrow><mrow><mn>13</mn></mrow></mfrac></mrow></math>';
  var speech = 'the fraction 2 plus 3 over 13';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac043
 */
sre.ClearspeakFractions.prototype.testFrac043 = function() {
  var preference = 'Fraction_FracOver';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mn>2</mn></mfrac></mrow></math>';
  var speech = 'the fraction x plus y over 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac044
 */
sre.ClearspeakFractions.prototype.testFrac044 = function() {
  var preference = 'Fraction_FracOver';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow></mfrac></mrow></math>';
  var speech = 'the fraction x plus y over x minus y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac045
 */
sre.ClearspeakFractions.prototype.testFrac045 = function() {
  var preference = 'Fraction_FracOver';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow></mfrac><mo>+</mo><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></math>';
  var speech = 'the fraction x plus y over x minus y, plus, the fraction 2 over 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac046
 */
sre.ClearspeakFractions.prototype.testFrac046 = function() {
  var preference = 'Fraction_FracOver';
  var mathml = '<math><mrow><mfrac><mrow><mtext>miles</mtext></mrow><mrow><mtext>gallon</mtext></mrow></mfrac></mrow></math>';
  var speech = 'the fraction miles over gallon';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac047
 */
sre.ClearspeakFractions.prototype.testFrac047 = function() {
  var preference = 'Fraction_FracOver';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mtext>miles</mtext></mrow><mrow><mn>3</mn><mtext>gallons</mtext></mrow></mfrac></mrow></math>';
  var speech = 'the fraction 2 miles over 3 gallons';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac048
 */
sre.ClearspeakFractions.prototype.testFrac048 = function() {
  var preference = 'Fraction_Per';
  var mathml = '<math><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></math>';
  var speech = '1 per 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac049
 */
sre.ClearspeakFractions.prototype.testFrac049 = function() {
  var preference = 'Fraction_Per';
  var mathml = '<math><mrow><mfrac><mrow><mn>12</mn></mrow><mrow><mn>32</mn></mrow></mfrac></mrow></math>';
  var speech = '12 per 32';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac050
 */
sre.ClearspeakFractions.prototype.testFrac050 = function() {
  var preference = 'Fraction_Per';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mo>+</mo><mn>3</mn></mrow><mrow><mn>13</mn></mrow></mfrac></mrow></math>';
  var speech = '2 plus 3 per 13';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac051
 */
sre.ClearspeakFractions.prototype.testFrac051 = function() {
  var preference = 'Fraction_Per';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mn>2</mn></mfrac></mrow></math>';
  var speech = 'x plus y per 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac052
 */
sre.ClearspeakFractions.prototype.testFrac052 = function() {
  var preference = 'Fraction_Per';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow></mfrac></mrow></math>';
  var speech = 'x plus y per x minus y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac053
 */
sre.ClearspeakFractions.prototype.testFrac053 = function() {
  var preference = 'Fraction_Per';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow></mfrac><mo>+</mo><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></math>';
  var speech = 'x plus y per x minus y, plus, 2 per 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac054
 */
sre.ClearspeakFractions.prototype.testFrac054 = function() {
  var preference = 'Fraction_Per';
  var mathml = '<math><mrow><mfrac><mrow><mtext>miles</mtext></mrow><mrow><mtext>gallon</mtext></mrow></mfrac></mrow></math>';
  var speech = 'miles per gallon';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac055
 */
sre.ClearspeakFractions.prototype.testFrac055 = function() {
  var preference = 'Fraction_Per';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mtext>miles</mtext></mrow><mrow><mn>3</mn><mtext>gallons</mtext></mrow></mfrac></mrow></math>';
  var speech = '2 miles per 3 gallons';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac056
 */
sre.ClearspeakFractions.prototype.testFrac056 = function() {
  var preference = 'Fraction_Ordinal';
  var mathml = '<math><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></math>';
  var speech = 'one half';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac057
 */
sre.ClearspeakFractions.prototype.testFrac057 = function() {
  var preference = 'Fraction_Ordinal';
  var mathml = '<math><mrow><mfrac><mrow><mn>12</mn></mrow><mrow><mn>32</mn></mrow></mfrac></mrow></math>';
  var speech = 'twelve thirty-seconds';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac058
 */
sre.ClearspeakFractions.prototype.testFrac058 = function() {
  var preference = 'Fraction_Ordinal';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mo>+</mo><mn>3</mn></mrow><mrow><mn>13</mn></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator 2 plus 3, and denominator 13';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac059
 */
sre.ClearspeakFractions.prototype.testFrac059 = function() {
  var preference = 'Fraction_Ordinal';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mn>2</mn></mfrac></mrow></math>';
  var speech = 'the fraction with numerator x plus y, and denominator 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac060
 */
sre.ClearspeakFractions.prototype.testFrac060 = function() {
  var preference = 'Fraction_Ordinal';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator x plus y, and denominator x minus y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac061
 */
sre.ClearspeakFractions.prototype.testFrac061 = function() {
  var preference = 'Fraction_Ordinal';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow></mfrac><mo>+</mo><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></math>';
  var speech = 'the fraction with numerator x plus y, and denominator x minus y, plus two thirds';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac062
 */
sre.ClearspeakFractions.prototype.testFrac062 = function() {
  var preference = 'Fraction_Ordinal';
  var mathml = '<math><mrow><mfrac><mrow><mtext>miles</mtext></mrow><mrow><mtext>gallon</mtext></mrow></mfrac></mrow></math>';
  var speech = 'miles over gallon';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac063
 */
sre.ClearspeakFractions.prototype.testFrac063 = function() {
  var preference = 'Fraction_Ordinal';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mtext>miles</mtext></mrow><mrow><mn>3</mn><mtext>gallons</mtext></mrow></mfrac></mrow></math>';
  var speech = '2 miles over 3 gallons';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac064
 */
sre.ClearspeakFractions.prototype.testFrac064 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></math>';
  var speech = 'one half';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac065
 */
sre.ClearspeakFractions.prototype.testFrac065 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mn>12</mn></mrow><mrow><mn>32</mn></mrow></mfrac></mrow></math>';
  var speech = '12 over 32, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac066
 */
sre.ClearspeakFractions.prototype.testFrac066 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mo>+</mo><mn>3</mn></mrow><mrow><mn>13</mn></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator 2 plus 3, and denominator 13, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac067
 */
sre.ClearspeakFractions.prototype.testFrac067 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mn>2</mn></mfrac></mrow></math>';
  var speech = 'the fraction with numerator x plus y, and denominator 2, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac068
 */
sre.ClearspeakFractions.prototype.testFrac068 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator x plus y, and denominator x minus y, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac069
 */
sre.ClearspeakFractions.prototype.testFrac069 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow></mfrac><mo>+</mo><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></math>';
  var speech = 'the fraction with numerator x plus y, and denominator x minus y, end fraction, plus two thirds';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac070
 */
sre.ClearspeakFractions.prototype.testFrac070 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mtext>miles</mtext></mrow><mrow><mtext>gallons</mtext></mrow></mfrac></mrow></math>';
  var speech = 'miles over gallons';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac071
 */
sre.ClearspeakFractions.prototype.testFrac071 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mtext>miles</mtext></mrow><mrow><mn>3</mn><mtext>gallons</mtext></mrow></mfrac></mrow></math>';
  var speech = '2 miles over 3 gallons';
  this.executeRuleTest(mathml, speech, preference);
};


//
// Fraction (with Text in Numerator and/or denominator)
//


/**
 * Testing ClearspeakFractions Example FrTxt001
 */
sre.ClearspeakFractions.prototype.testFrTxt001 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mtext></mtext><mtext>miles</mtext></mrow><mrow><mn>3</mn><mtext></mtext><mtext>gallons</mtext></mrow></mfrac></mrow></math>';
  var speech = '2 miles over 3 gallons';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example FrTxt002
 */
sre.ClearspeakFractions.prototype.testFrTxt002 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mtext>rise</mtext></mrow><mrow><mtext>run</mtext></mrow></mfrac></mrow></math>';
  var speech = 'rise over run';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example FrTxt003
 */
sre.ClearspeakFractions.prototype.testFrTxt003 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mfrac><mtext>successful outcomes</mtext><mtext>total outcomes</mtext></mfrac></math>';
  var speech = 'successful outcomes over total outcomes';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example FrTxt004
 */
sre.ClearspeakFractions.prototype.testFrTxt004 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mn>6</mn><mtext>ways of rolling a 7</mtext></mrow><mrow><mn>36</mn><mtext>ways of rolling the pair of dice</mtext></mrow></mfrac></mrow></math>';
  var speech = '6 ways of rolling a 7 over 36 ways of rolling the pair of dice';
  this.executeRuleTest(mathml, speech, preference);
};


//
// Nested Fractions
//


/**
 * Testing ClearspeakFractions Example NestFrac001
 */
sre.ClearspeakFractions.prototype.testNestFrac001 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow><mrow><mfrac><mn>1</mn><mn>3</mn></mfrac></mrow></mfrac></mrow></math>';
  var speech = 'one half over one third';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example NestFrac002
 */
sre.ClearspeakFractions.prototype.testNestFrac002 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mn>1</mn><mrow><mfrac><mn>2</mn><mrow><mfrac><mn>1</mn><mn>3</mn></mfrac></mrow></mfrac></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator 1, and denominator, 2 over one third';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example NestFrac003
 */
sre.ClearspeakFractions.prototype.testNestFrac003 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow><mn>3</mn></mfrac></mrow></math>';
  var speech = 'one half over 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example NestFrac004
 */
sre.ClearspeakFractions.prototype.testNestFrac004 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mn>1</mn><mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mfrac></mrow></math>';
  var speech = '1 over two thirds';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example NestFrac005
 */
sre.ClearspeakFractions.prototype.testNestFrac005 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mfrac><mrow><mn>11</mn></mrow><mrow><mn>32</mn></mrow></mfrac></mrow><mrow><mfrac><mrow><mn>16</mn></mrow><mrow><mn>51</mn></mrow></mfrac></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator, 11 over 32, and denominator, 16 over 51';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example NestFrac006
 */
sre.ClearspeakFractions.prototype.testNestFrac006 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mn>11</mn></mrow><mrow><mfrac><mrow><mn>32</mn></mrow><mrow><mfrac><mrow><mn>16</mn></mrow><mrow><mn>51</mn></mrow></mfrac></mrow></mfrac></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator 11, and denominator, the fraction with numerator 32, and denominator, 16 over 51';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example NestFrac007
 */
sre.ClearspeakFractions.prototype.testNestFrac007 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mn>1</mn><mo>+</mo><mfrac><mn>4</mn><mi>x</mi></mfrac></mrow><mn>2</mn></mfrac></mrow></math>';
  var speech = 'the fraction with numerator 1 plus, 4 over x, and denominator 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example NestFrac008
 */
sre.ClearspeakFractions.prototype.testNestFrac008 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mn>3</mn><mrow><mn>2</mn><mo>+</mo><mfrac><mn>4</mn><mi>x</mi></mfrac></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator 3, and denominator 2 plus, 4 over x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example NestFrac009
 */
sre.ClearspeakFractions.prototype.testNestFrac009 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mfrac><mrow><mn>10</mn></mrow><mrow><mn>22</mn></mrow></mfrac></mrow><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator, 10 over 22, and denominator one half';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example NestFrac010
 */
sre.ClearspeakFractions.prototype.testNestFrac010 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mn>1</mn><mo>+</mo><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow><mrow><mn>1</mn><mo>−</mo><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator 1 plus two thirds, and denominator 1 minus two thirds';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example NestFrac011
 */
sre.ClearspeakFractions.prototype.testNestFrac011 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mn>1</mn><mo>+</mo><mfrac><mi>x</mi><mn>2</mn></mfrac></mrow><mrow><mn>1</mn><mo>−</mo><mfrac><mi>x</mi><mn>2</mn></mfrac></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator 1 plus, x over 2, and denominator 1 minus, x over 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example NestFrac012
 */
sre.ClearspeakFractions.prototype.testNestFrac012 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mrow><mi>x</mi><mo>−</mo><mn>1</mn></mrow></mfrac><mo>+</mo><mn>1</mn></mrow><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator, the fraction with numerator x plus 1, and denominator x minus 1, plus 1, and denominator x plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example NestFrac013
 */
sre.ClearspeakFractions.prototype.testNestFrac013 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mrow><mi>x</mi><mo>−</mo><mn>4</mn></mrow></mfrac><mo>+</mo><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow><mrow><mi>x</mi><mo>+</mo><mfrac><mn>1</mn><mrow><mn>16</mn></mrow></mfrac></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator, the fraction with numerator x plus 1, and denominator x minus 4, plus one half, and denominator x plus, 1 over 16';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example NestFrac014
 */
sre.ClearspeakFractions.prototype.testNestFrac014 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mn>1</mn><mo>+</mo><mfrac><mi>x</mi><mrow><mn>1</mn><mo>+</mo><mfrac><mn>2</mn><mi>x</mi></mfrac></mrow></mfrac></mrow></math>';
  var speech = '1 plus, the fraction with numerator x, and denominator 1 plus, 2 over x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example NestFrac015
 */
sre.ClearspeakFractions.prototype.testNestFrac015 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mn>1</mn><mo>+</mo><mfrac><mrow><mi>x</mi><mo>+</mo><mn>3</mn></mrow><mrow><mn>1</mn><mo>+</mo><mfrac><mn>2</mn><mrow><mi>x</mi><mo>+</mo><mn>3</mn></mrow></mfrac></mrow></mfrac></mrow></math>';
  var speech = '1 plus, the fraction with numerator x plus 3, and denominator 1 plus, the fraction with numerator 2, and denominator x plus 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example NestFrac016
 */
sre.ClearspeakFractions.prototype.testNestFrac016 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mn>1</mn><mo>+</mo><mfrac><mn>1</mn><mrow><mn>1</mn><mo>+</mo><mfrac><mn>1</mn><mrow><mn>1</mn><mo>+</mo><mfrac><mn>1</mn><mrow><mn>1</mn><mo>+</mo><mn>1</mn></mrow></mfrac></mrow></mfrac></mrow></mfrac></mrow></math>';
  var speech = '1 plus, the fraction with numerator 1, and denominator 1 plus, the fraction with numerator 1, and denominator 1 plus, the fraction with numerator 1, and denominator 1 plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example NestFrac017
 */
sre.ClearspeakFractions.prototype.testNestFrac017 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mn>1</mn><mo>+</mo><mfrac><mn>1</mn><mrow><mn>1</mn><mo>+</mo><mfrac><mn>1</mn><mrow><mn>1</mn><mo>+</mo><mfrac><mn>1</mn><mrow><mn>1</mn><mo>+</mo><mo>⋯</mo></mrow></mfrac></mrow></mfrac></mrow></mfrac></mrow></math>';
  var speech = '1 plus, the fraction with numerator 1, and denominator 1 plus, the fraction with numerator 1, and denominator 1 plus, the fraction with numerator 1, and denominator 1 plus dot dot dot';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example NestFrac018
 */
sre.ClearspeakFractions.prototype.testNestFrac018 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><msub><mi>a</mi><mn>0</mn></msub><mo>+</mo><mfrac><mn>1</mn><mrow><msub><mi>a</mi><mn>1</mn></msub><mo>+</mo><mfrac><mn>1</mn><mrow><msub><mi>a</mi><mn>2</mn></msub><mo>+</mo><mfrac><mn>1</mn><mrow><msub><mi>a</mi><mn>3</mn></msub><mo>+</mo><mo>⋯</mo></mrow></mfrac></mrow></mfrac></mrow></mfrac></mrow></math>';
  var speech = 'a sub 0, plus, the fraction with numerator 1, and denominator, a sub 1, plus, the fraction with numerator 1, and denominator, a sub 2, plus, the fraction with numerator 1, and denominator, a sub 3, plus dot dot dot';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example NestFrac019
 */
sre.ClearspeakFractions.prototype.testNestFrac019 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow><mrow><mfrac><mn>1</mn><mn>3</mn></mfrac></mrow></mfrac></mrow></math>';
  var speech = 'one half over one third';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example NestFrac020
 */
sre.ClearspeakFractions.prototype.testNestFrac020 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mn>1</mn><mrow><mfrac><mn>2</mn><mrow><mfrac><mn>1</mn><mn>3</mn></mfrac></mrow></mfrac></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator 1, and denominator, 2 over one third, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example NestFrac021
 */
sre.ClearspeakFractions.prototype.testNestFrac021 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow><mn>3</mn></mfrac></mrow></math>';
  var speech = 'one half over 3, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example NestFrac022
 */
sre.ClearspeakFractions.prototype.testNestFrac022 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mn>1</mn><mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mfrac></mrow></math>';
  var speech = '1 over two thirds, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example NestFrac023
 */
sre.ClearspeakFractions.prototype.testNestFrac023 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mfrac><mrow><mn>11</mn></mrow><mrow><mn>32</mn></mrow></mfrac></mrow><mrow><mfrac><mrow><mn>16</mn></mrow><mrow><mn>51</mn></mrow></mfrac></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator, 11 over 32, and denominator, 16 over 51, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example NestFrac024
 */
sre.ClearspeakFractions.prototype.testNestFrac024 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mn>11</mn></mrow><mrow><mfrac><mrow><mn>32</mn></mrow><mrow><mfrac><mrow><mn>16</mn></mrow><mrow><mn>51</mn></mrow></mfrac></mrow></mfrac></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator 11, and denominator, the fraction with numerator 32, and denominator, 16 over 51, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example NestFrac025
 */
sre.ClearspeakFractions.prototype.testNestFrac025 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mn>1</mn><mo>+</mo><mfrac><mn>4</mn><mi>x</mi></mfrac></mrow><mn>2</mn></mfrac></mrow></math>';
  var speech = 'the fraction with numerator 1 plus, 4 over x, and denominator 2, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example NestFrac026
 */
sre.ClearspeakFractions.prototype.testNestFrac026 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mn>3</mn><mrow><mn>2</mn><mo>+</mo><mfrac><mn>4</mn><mi>x</mi></mfrac></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator 3, and denominator 2 plus, 4 over x, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example NestFrac027
 */
sre.ClearspeakFractions.prototype.testNestFrac027 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mfrac><mrow><mn>10</mn></mrow><mrow><mn>22</mn></mrow></mfrac></mrow><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator, 10 over 22, and denominator one half, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example NestFrac028
 */
sre.ClearspeakFractions.prototype.testNestFrac028 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mn>1</mn><mo>+</mo><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow><mrow><mn>1</mn><mo>−</mo><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator 1 plus two thirds, and denominator 1 minus two thirds, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example NestFrac029
 */
sre.ClearspeakFractions.prototype.testNestFrac029 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mn>1</mn><mo>+</mo><mfrac><mi>x</mi><mn>2</mn></mfrac></mrow><mrow><mn>1</mn><mo>−</mo><mfrac><mi>x</mi><mn>2</mn></mfrac></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator 1 plus, x over 2, and denominator 1 minus, x over 2, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example NestFrac030
 */
sre.ClearspeakFractions.prototype.testNestFrac030 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mrow><mi>x</mi><mo>−</mo><mn>1</mn></mrow></mfrac><mo>+</mo><mn>1</mn></mrow><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator, the fraction with numerator x plus 1, and denominator x minus 1, plus 1, and denominator x plus 1, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example NestFrac031
 */
sre.ClearspeakFractions.prototype.testNestFrac031 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mrow><mi>x</mi><mo>−</mo><mn>4</mn></mrow></mfrac><mo>+</mo><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow><mrow><mi>x</mi><mo>+</mo><mfrac><mn>1</mn><mrow><mn>16</mn></mrow></mfrac></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator, the fraction with numerator x plus 1, and denominator x minus 4, plus one half, and denominator x plus, 1 over 16, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example NestFrac032
 */
sre.ClearspeakFractions.prototype.testNestFrac032 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mn>1</mn><mo>+</mo><mfrac><mi>x</mi><mrow><mn>1</mn><mo>+</mo><mfrac><mn>2</mn><mi>x</mi></mfrac></mrow></mfrac></mrow></math>';
  var speech = '1 plus, the fraction with numerator x, and denominator 1 plus, 2 over x, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example NestFrac033
 */
sre.ClearspeakFractions.prototype.testNestFrac033 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mn>1</mn><mo>+</mo><mfrac><mrow><mi>x</mi><mo>+</mo><mn>3</mn></mrow><mrow><mn>1</mn><mo>+</mo><mfrac><mn>2</mn><mrow><mi>x</mi><mo>+</mo><mn>3</mn></mrow></mfrac></mrow></mfrac></mrow></math>';
  var speech = '1 plus, the fraction with numerator x plus 3, and denominator 1 plus, the fraction with numerator 2, and denominator x plus 3, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example NestFrac034
 */
sre.ClearspeakFractions.prototype.testNestFrac034 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mn>1</mn><mo>+</mo><mfrac><mn>1</mn><mrow><mn>1</mn><mo>+</mo><mfrac><mn>1</mn><mrow><mn>1</mn><mo>+</mo><mfrac><mn>1</mn><mrow><mn>1</mn><mo>+</mo><mn>1</mn></mrow></mfrac></mrow></mfrac></mrow></mfrac></mrow></math>';
  var speech = '1 plus, the fraction with numerator 1, and denominator 1 plus, the fraction with numerator 1, and denominator 1 plus, the fraction with numerator 1, and denominator 1 plus 1, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example NestFrac035
 */
sre.ClearspeakFractions.prototype.testNestFrac035 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mn>1</mn><mo>+</mo><mfrac><mn>1</mn><mrow><mn>1</mn><mo>+</mo><mfrac><mn>1</mn><mrow><mn>1</mn><mo>+</mo><mfrac><mn>1</mn><mrow><mn>1</mn><mo>+</mo><mo>⋯</mo></mrow></mfrac></mrow></mfrac></mrow></mfrac></mrow></math>';
  var speech = '1 plus, the fraction with numerator 1, and denominator 1 plus, the fraction with numerator 1, and denominator 1 plus, the fraction with numerator 1, and denominator 1 plus dot dot dot, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example NestFrac036
 */
sre.ClearspeakFractions.prototype.testNestFrac036 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><msub><mi>a</mi><mn>0</mn></msub><mo>+</mo><mfrac><mn>1</mn><mrow><msub><mi>a</mi><mn>1</mn></msub><mo>+</mo><mfrac><mn>1</mn><mrow><msub><mi>a</mi><mn>2</mn></msub><mo>+</mo><mfrac><mn>1</mn><mrow><msub><mi>a</mi><mn>3</mn></msub><mo>+</mo><mo>⋯</mo></mrow></mfrac></mrow></mfrac></mrow></mfrac></mrow></math>';
  var speech = 'a sub 0, plus, the fraction with numerator 1, and denominator, a sub 1, plus, the fraction with numerator 1, and denominator, a sub 2, plus, the fraction with numerator 1, and denominator, a sub 3, plus dot dot dot, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


//
// Fractions with Functions
//


/**
 * Testing ClearspeakFractions Example Fracfunct001
 */
sre.ClearspeakFractions.prototype.testFracfunct001 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mrow><mi>g</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></mfrac></mrow></math>';
  var speech = 'f of x, over g of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Fracfunct002
 */
sre.ClearspeakFractions.prototype.testFracfunct002 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow><mo>+</mo><mi>g</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mrow><mi>g</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator f of x, plus g of x, and denominator g of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Fracfunct003
 */
sre.ClearspeakFractions.prototype.testFracfunct003 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow><mrow><mi>g</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator f of, open paren, x plus 1, close paren, and denominator g of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Fracfunct004
 */
sre.ClearspeakFractions.prototype.testFracfunct004 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mn>2</mn></mfrac></mrow></math>';
  var speech = 'f of x, over 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Fracfunct005
 */
sre.ClearspeakFractions.prototype.testFracfunct005 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mn>2</mn><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></mfrac></mrow></math>';
  var speech = '2 over f of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Fracfunct006
 */
sre.ClearspeakFractions.prototype.testFracfunct006 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mn>2</mn><mrow><mi>g</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow><mo>+</mo><mi>g</mi><mo stretchy="false">(</mo><mi>x</mi><mo>+</mo><mn>1</mn><mo stretchy="false">)</mo></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator 2, and denominator g of x, plus g of, open paren, x plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Fracfunct007
 */
sre.ClearspeakFractions.prototype.testFracfunct007 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>sin</mi><mi>x</mi></mrow><mrow><mi>cos</mi><mi>x</mi></mrow></mfrac></mrow></math>';
  var speech = 'sine x over cosine x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Fracfunct008
 * 
 * QUESTION: This is incorrect: This is the same expression as Fracfunct011, which has a
 * different speech string. Probably wrong!
 * 
 */
sre.ClearspeakFractions.prototype.untestFracfunct008 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>sin</mi><mo>(</mo><mi>x</mi><mo>+</mo><mi>y</mi><mo>)</mo></mrow><mrow><mi>cos</mi><mo>(</mo><mi>x</mi><mo>+</mo><mi>y</mi><mo>)</mo></mrow></mfrac></mrow></math>';;
  var speech = 'sine, open paren, x plus y, close paren, over, cosine, open paren, x plus y, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Fracfunct009
 */
sre.ClearspeakFractions.prototype.testFracfunct009 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>sin</mi><mi>x</mi><mo>+</mo><mi>cos</mi><mi>x</mi></mrow><mrow><mi>cos</mi><mi>x</mi></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator sine x plus cosine x, and denominator cosine x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Fracfunct010
 */
sre.ClearspeakFractions.prototype.testFracfunct010 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>sin</mi><mn>2</mn><mi>x</mi></mrow><mrow><mi>cos</mi><mn>3</mn><mi>x</mi></mrow></mfrac></mrow></math>';
  var speech = 'sine 2 x over cosine 3 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Fracfunct011
 */
sre.ClearspeakFractions.prototype.testFracfunct011 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mo>)</mo></mrow></mrow><mrow><mi>cos</mi><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mo>)</mo></mrow></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator, the sine of, open paren, x plus y, close paren, and denominator, the cosine of, open paren, x plus y, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Fracfunct012
 */
sre.ClearspeakFractions.prototype.testFracfunct012 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mn>2</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow><mrow><mi>g</mi><mrow><mo>(</mo><mrow><mn>3</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow></mfrac></mrow></math>';
  var speech = 'f of 2 x, over g of 3 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Fracfunct013
 */
sre.ClearspeakFractions.prototype.testFracfunct013 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>log</mi><mi>x</mi></mrow><mrow><mi>log</mi><mi>y</mi></mrow></mfrac></mrow></math>';
  var speech = 'log x over log y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Fracfunct014
 */
sre.ClearspeakFractions.prototype.testFracfunct014 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>log</mi><mn>2</mn><mi>x</mi></mrow><mrow><mi>log</mi><mn>3</mn><mi>y</mi></mrow></mfrac></mrow></math>';
  var speech = 'log 2 x over log 3 y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Fracfunct015
 */
sre.ClearspeakFractions.prototype.testFracfunct015 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><msub><mrow><mi>log</mi></mrow><mrow><mn>10</mn></mrow></msub><mi>x</mi></mrow><mrow><msub><mrow><mi>log</mi></mrow><mn>5</mn></msub><mi>y</mi></mrow></mfrac></mrow></math>';
  var speech = 'the log base 10 of, x, over, the log base 5 of, y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Fracfunct016
 */
sre.ClearspeakFractions.prototype.testFracfunct016 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><msub><mrow><mi>log</mi></mrow><mrow><mn>10</mn></mrow></msub><mn>2</mn><mi>x</mi></mrow><mrow><msub><mrow><mi>log</mi></mrow><mn>5</mn></msub><mn>3</mn><mi>y</mi></mrow></mfrac></mrow></math>';
  var speech = 'the log base 10 of, 2 x, over, the log base 5 of, 3 y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Fracfunct017
 */
sre.ClearspeakFractions.prototype.testFracfunct017 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>log</mi><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow><mrow><mi>log</mi><mi>y</mi></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator, the log of, open paren, x plus 1, close paren, and denominator log y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Fracfunct018
 */
sre.ClearspeakFractions.prototype.testFracfunct018 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><msub><mi>f</mi><mn>1</mn></msub><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mrow><msub><mi>g</mi><mn>1</mn></msub><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></mfrac></mrow></math>';
  var speech = 'f sub 1, of x, over, g sub 1, of x';
  this.executeRuleTest(mathml, speech, preference);
};

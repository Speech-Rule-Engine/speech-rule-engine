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
sre.ClearspeakFractions.prototype.untestFrac001 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></math>';
  var speech = 'One half';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac002
 */
sre.ClearspeakFractions.prototype.untestFrac002 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mn>12</mn></mrow><mrow><mn>32</mn></mrow></mfrac></mrow></math>';
  var speech = '12 over 32';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac002a
 */
sre.ClearspeakFractions.prototype.untestFrac002a = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mi>x</mi><mi>y</mi></mfrac></mrow></math>';
  var speech = 'x over y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac002b
 */
sre.ClearspeakFractions.prototype.untestFrac002b = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mi>x</mi></mrow><mrow><mn>3</mn><mi>y</mi></mrow></mfrac></mrow></math>';
  var speech = '2x over 3y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac002c
 */
sre.ClearspeakFractions.prototype.untestFrac002c = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mi>y</mi></mrow><mrow><mi>c</mi><mi>d</mi></mrow></mfrac></mrow></math>';
  var speech = 'xy over cd';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac002d
 */
sre.ClearspeakFractions.prototype.untestFrac002d = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow><mrow><mfrac><mn>1</mn><mn>3</mn></mfrac></mrow></mfrac></mrow></math>';
  var speech = '<p>one half</p><p>over</p><p>one third</p>';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac002e
 */
sre.ClearspeakFractions.prototype.untestFrac002e = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mo>−</mo><mi>x</mi></mrow><mi>y</mi></mfrac></mrow></math>';
  var speech = 'negative x over y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac002f
 */
sre.ClearspeakFractions.prototype.untestFrac002f = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mo>−</mo><mn>2</mn><mi>x</mi></mrow><mrow><mn>3</mn><mi>y</mi></mrow></mfrac></mrow></math>';
  var speech = 'negative 2x over 3y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac002g
 */
sre.ClearspeakFractions.prototype.untestFrac002g = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mi>y</mi></mrow><mrow><mo>−</mo><mi>c</mi><mi>d</mi></mrow></mfrac></mrow></math>';
  var speech = 'xy over negative cd';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac002h
 */
sre.ClearspeakFractions.prototype.untestFrac002h = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow><mrow><mo>−</mo><mfrac><mn>1</mn><mn>3</mn></mfrac></mrow></mfrac></mrow></math>';
  var speech = '<p>one half</p><p>over</p><p>negative one third</p>';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac003
 */
sre.ClearspeakFractions.prototype.untestFrac003 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mo>+</mo><mn>3</mn></mrow><mrow><mn>13</mn></mrow></mfrac></mrow></math>';
  var speech = 'The fraction with numerator 2 plus 3, and denominator 13';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac004
 */
sre.ClearspeakFractions.prototype.untestFrac004 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mn>2</mn></mfrac></mrow></math>';
  var speech = 'The fraction with numerator x plus y, and denominator 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac005
 */
sre.ClearspeakFractions.prototype.untestFrac005 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow></mfrac></mrow></math>';
  var speech = 'The fraction with numerator x plus y, and denominator x minus y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac006
 */
sre.ClearspeakFractions.prototype.untestFrac006 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow></mfrac><mo>+</mo><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></math>';
  var speech = '<p>The fraction with numerator x plus y, and denominator x minus y,</p><p>plus</p><p>two thirds</p>';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac007
 */
sre.ClearspeakFractions.prototype.untestFrac007 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mtext>miles</mtext></mrow><mrow><mtext>gallon</mtext></mrow></mfrac></mrow></math>';
  var speech = 'Miles over gallon';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac008
 */
sre.ClearspeakFractions.prototype.untestFrac008 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mtext> miles</mtext></mrow><mrow><mn>3</mn><mtext> gallons</mtext></mrow></mfrac></mrow></math>';
  var speech = '2 miles over 3 gallons';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac009
 */
sre.ClearspeakFractions.prototype.untestFrac009 = function() {
  var preference = 'Fraction_Over';
  var mathml = '<math><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></math>';
  var speech = '1 over 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac010
 */
sre.ClearspeakFractions.prototype.untestFrac010 = function() {
  var preference = 'Fraction_Over';
  var mathml = '<math><mrow><mfrac><mrow><mn>12</mn></mrow><mrow><mn>32</mn></mrow></mfrac></mrow></math>';
  var speech = '12 over 32';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac011
 */
sre.ClearspeakFractions.prototype.untestFrac011 = function() {
  var preference = 'Fraction_Over';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mo>+</mo><mn>3</mn></mrow><mrow><mn>13</mn></mrow></mfrac></mrow></math>';
  var speech = '2 plus 3 over 13';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac012
 */
sre.ClearspeakFractions.prototype.untestFrac012 = function() {
  var preference = 'Fraction_Over';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mn>2</mn></mfrac></mrow></math>';
  var speech = 'X plus y over 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac013
 */
sre.ClearspeakFractions.prototype.untestFrac013 = function() {
  var preference = 'Fraction_Over';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow></mfrac></mrow></math>';
  var speech = 'X plus y over x minus y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac014
 */
sre.ClearspeakFractions.prototype.untestFrac014 = function() {
  var preference = 'Fraction_Over';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow></mfrac><mo>+</mo><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></math>';
  var speech = 'X plus y over x minus y, plus, 2 over 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac015
 */
sre.ClearspeakFractions.prototype.untestFrac015 = function() {
  var preference = 'Fraction_Over';
  var mathml = '<math><mrow><mfrac><mrow><mtext>miles</mtext></mrow><mrow><mtext>gallon</mtext></mrow></mfrac></mrow></math>';
  var speech = 'Miles over gallons';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac016
 */
sre.ClearspeakFractions.prototype.untestFrac016 = function() {
  var preference = 'Fraction_Over';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mtext> miles</mtext></mrow><mrow><mn>3</mn><mtext> gallons</mtext></mrow></mfrac></mrow></math>';
  var speech = '2 miles over 3 gallons';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac017
 */
sre.ClearspeakFractions.prototype.untestFrac017 = function() {
  var preference = 'Fraction_OverEndFrac';
  var mathml = '<math><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></math>';
  var speech = '1 over 2, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac018
 */
sre.ClearspeakFractions.prototype.untestFrac018 = function() {
  var preference = 'Fraction_OverEndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mn>12</mn></mrow><mrow><mn>32</mn></mrow></mfrac></mrow></math>';
  var speech = '12 over 32, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac019
 */
sre.ClearspeakFractions.prototype.untestFrac019 = function() {
  var preference = 'Fraction_OverEndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mo>+</mo><mn>3</mn></mrow><mrow><mn>13</mn></mrow></mfrac></mrow></math>';
  var speech = '2 plus 3 over 13, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac020
 */
sre.ClearspeakFractions.prototype.untestFrac020 = function() {
  var preference = 'Fraction_OverEndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mn>2</mn></mfrac></mrow></math>';
  var speech = 'X plus y over 2, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac021
 */
sre.ClearspeakFractions.prototype.untestFrac021 = function() {
  var preference = 'Fraction_OverEndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow></mfrac></mrow></math>';
  var speech = 'X plus y over x minus y, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac022
 */
sre.ClearspeakFractions.prototype.untestFrac022 = function() {
  var preference = 'Fraction_OverEndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow></mfrac><mo>+</mo><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></math>';
  var speech = '<p>X plus y over x minus y, end fraction</p><p>plus,</p><p>2 over 3, end fraction</p>';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac023
 */
sre.ClearspeakFractions.prototype.untestFrac023 = function() {
  var preference = 'Fraction_OverEndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mtext>miles</mtext></mrow><mrow><mtext>gallons</mtext></mrow></mfrac></mrow></math>';
  var speech = 'Miles over gallons, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac024
 */
sre.ClearspeakFractions.prototype.untestFrac024 = function() {
  var preference = 'Fraction_OverEndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mtext> miles</mtext></mrow><mrow><mn>3</mn><mtext> gallons</mtext></mrow></mfrac></mrow></math>';
  var speech = '2 miles over 3 gallons, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac025
 */
sre.ClearspeakFractions.prototype.untestFrac025 = function() {
  var preference = 'Fraction_GeneralEndFrac';
  var mathml = '<math><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></math>';
  var speech = 'The fraction with numerator 1 and denominator 2, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac026
 */
sre.ClearspeakFractions.prototype.untestFrac026 = function() {
  var preference = 'Fraction_GeneralEndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mn>12</mn></mrow><mrow><mn>32</mn></mrow></mfrac></mrow></math>';
  var speech = 'The fraction with numerator 12, and denominator 32, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac027
 */
sre.ClearspeakFractions.prototype.untestFrac027 = function() {
  var preference = 'Fraction_GeneralEndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mo>+</mo><mn>3</mn></mrow><mrow><mn>13</mn></mrow></mfrac></mrow></math>';
  var speech = 'The fraction with numerator 2 plus 3, and denominator 13, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac028
 */
sre.ClearspeakFractions.prototype.untestFrac028 = function() {
  var preference = 'Fraction_GeneralEndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mn>2</mn></mfrac></mrow></math>';
  var speech = 'The fraction with numerator x plus y, and denominator 2, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac029
 */
sre.ClearspeakFractions.prototype.untestFrac029 = function() {
  var preference = 'Fraction_GeneralEndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow></mfrac></mrow></math>';
  var speech = 'The fraction with numerator x plus y, and denominator x minus y, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac030
 */
sre.ClearspeakFractions.prototype.untestFrac030 = function() {
  var preference = 'Fraction_GeneralEndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow></mfrac><mo>+</mo><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></math>';
  var speech = '<p>The fraction with numerator x plus y, and denominator x minus y, end fraction,</p><p>plus,</p><p>the fraction with numerator 2 and denominator 3, end fraction</p>';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac031
 */
sre.ClearspeakFractions.prototype.untestFrac031 = function() {
  var preference = 'Fraction_GeneralEndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mtext>miles</mtext></mrow><mrow><mtext>gallon</mtext></mrow></mfrac></mrow></math>';
  var speech = 'The fraction with numerator miles, and denominator gallon, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac032
 */
sre.ClearspeakFractions.prototype.untestFrac032 = function() {
  var preference = 'Fraction_General';
  var mathml = '<math><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></math>';
  var speech = 'The fraction with numerator 1, and denominator 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac033
 */
sre.ClearspeakFractions.prototype.untestFrac033 = function() {
  var preference = 'Fraction_General';
  var mathml = '<math><mrow><mfrac><mrow><mn>12</mn></mrow><mrow><mn>32</mn></mrow></mfrac></mrow></math>';
  var speech = 'The fraction with numerator 12, and denominator 32';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac034
 */
sre.ClearspeakFractions.prototype.untestFrac034 = function() {
  var preference = 'Fraction_General';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mo>+</mo><mn>3</mn></mrow><mrow><mn>13</mn></mrow></mfrac></mrow></math>';
  var speech = 'The fraction with numerator 2 plus 3, and denominator 13';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac035
 */
sre.ClearspeakFractions.prototype.untestFrac035 = function() {
  var preference = 'Fraction_General';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mn>2</mn></mfrac></mrow></math>';
  var speech = 'The fraction with numerator x plus y, and denominator 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac036
 */
sre.ClearspeakFractions.prototype.untestFrac036 = function() {
  var preference = 'Fraction_General';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow></mfrac></mrow></math>';
  var speech = 'The fraction with numerator x plus y, and denominator x minus y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac037
 */
sre.ClearspeakFractions.prototype.untestFrac037 = function() {
  var preference = 'Fraction_General';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow></mfrac><mo>+</mo><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></math>';
  var speech = '<p>The fraction with numerator x plus y, and denominator x minus y,</p><p>plus</p><p>the fraction with numerator 2 and denominator 3</p>';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac038
 */
sre.ClearspeakFractions.prototype.untestFrac038 = function() {
  var preference = 'Fraction_General';
  var mathml = '<math><mrow><mfrac><mrow><mtext>miles</mtext></mrow><mrow><mtext>gallon</mtext></mrow></mfrac></mrow></math>';
  var speech = 'The fraction with numerator miles and denominator gallon';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac039
 */
sre.ClearspeakFractions.prototype.untestFrac039 = function() {
  var preference = 'Fraction_General';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mtext> miles</mtext></mrow><mrow><mn>3</mn><mtext> gallons</mtext></mrow></mfrac></mrow></math>';
  var speech = 'The fraction with numerator 2 miles and denominator 3 gallons';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac040
 */
sre.ClearspeakFractions.prototype.untestFrac040 = function() {
  var preference = 'Fraction_FracOver';
  var mathml = '<math><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></math>';
  var speech = 'The fraction 1 over 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac041
 */
sre.ClearspeakFractions.prototype.untestFrac041 = function() {
  var preference = 'Fraction_FracOver';
  var mathml = '<math><mrow><mfrac><mrow><mn>12</mn></mrow><mrow><mn>32</mn></mrow></mfrac></mrow></math>';
  var speech = 'The fraction 12 over 32';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac042
 */
sre.ClearspeakFractions.prototype.untestFrac042 = function() {
  var preference = 'Fraction_FracOver';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mo>+</mo><mn>3</mn></mrow><mrow><mn>13</mn></mrow></mfrac></mrow></math>';
  var speech = 'The fraction 2 plus 3 over 13';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac043
 */
sre.ClearspeakFractions.prototype.untestFrac043 = function() {
  var preference = 'Fraction_FracOver';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mn>2</mn></mfrac></mrow></math>';
  var speech = 'The fraction x plus y over 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac044
 */
sre.ClearspeakFractions.prototype.untestFrac044 = function() {
  var preference = 'Fraction_FracOver';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow></mfrac></mrow></math>';
  var speech = 'The fraction x plus y over x minus y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac045
 */
sre.ClearspeakFractions.prototype.untestFrac045 = function() {
  var preference = 'Fraction_FracOver';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow></mfrac><mo>+</mo><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></math>';
  var speech = '<p>The fraction x plus y over x minus y</p><p>plus</p><p>the fraction 2 over 3</p>';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac046
 */
sre.ClearspeakFractions.prototype.untestFrac046 = function() {
  var preference = 'Fraction_FracOver';
  var mathml = '<math><mrow><mfrac><mrow><mtext>miles</mtext></mrow><mrow><mtext>gallon</mtext></mrow></mfrac></mrow></math>';
  var speech = 'The fraction miles over gallons';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac047
 */
sre.ClearspeakFractions.prototype.untestFrac047 = function() {
  var preference = 'Fraction_FracOver';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mtext> miles</mtext></mrow><mrow><mn>3</mn><mtext> gallons</mtext></mrow></mfrac></mrow></math>';
  var speech = 'The fraction 2 miles over 3 gallons';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac048
 */
sre.ClearspeakFractions.prototype.untestFrac048 = function() {
  var preference = 'Fraction_Per';
  var mathml = '<math><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></math>';
  var speech = '1 per 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac049
 */
sre.ClearspeakFractions.prototype.untestFrac049 = function() {
  var preference = 'Fraction_Per';
  var mathml = '<math><mrow><mfrac><mrow><mn>12</mn></mrow><mrow><mn>32</mn></mrow></mfrac></mrow></math>';
  var speech = '12 per 32';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac050
 */
sre.ClearspeakFractions.prototype.untestFrac050 = function() {
  var preference = 'Fraction_Per';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mo>+</mo><mn>3</mn></mrow><mrow><mn>13</mn></mrow></mfrac></mrow></math>';
  var speech = '2 plus 3 per 13';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac051
 */
sre.ClearspeakFractions.prototype.untestFrac051 = function() {
  var preference = 'Fraction_Per';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mn>2</mn></mfrac></mrow></math>';
  var speech = 'x plus y per 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac052
 */
sre.ClearspeakFractions.prototype.untestFrac052 = function() {
  var preference = 'Fraction_Per';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow></mfrac></mrow></math>';
  var speech = 'x plus y per x minus y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac053
 */
sre.ClearspeakFractions.prototype.untestFrac053 = function() {
  var preference = 'Fraction_Per';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow></mfrac><mo>+</mo><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></math>';
  var speech = '<p>x plus y per x minus y</p><p>plus</p><p>2 per 3</p>';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac054
 */
sre.ClearspeakFractions.prototype.untestFrac054 = function() {
  var preference = 'Fraction_Per';
  var mathml = '<math><mrow><mfrac><mrow><mtext>miles</mtext></mrow><mrow><mtext>gallon</mtext></mrow></mfrac></mrow></math>';
  var speech = 'Miles per gallon';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac055
 */
sre.ClearspeakFractions.prototype.untestFrac055 = function() {
  var preference = 'Fraction_Per';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mtext> miles</mtext></mrow><mrow><mn>3</mn><mtext> gallons</mtext></mrow></mfrac></mrow></math>';
  var speech = '2 miles per 3 gallons';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac056
 */
sre.ClearspeakFractions.prototype.untestFrac056 = function() {
  var preference = 'Fraction_Ordinal';
  var mathml = '<math><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></math>';
  var speech = 'One half';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac057
 */
sre.ClearspeakFractions.prototype.untestFrac057 = function() {
  var preference = 'Fraction_Ordinal';
  var mathml = '<math><mrow><mfrac><mrow><mn>12</mn></mrow><mrow><mn>32</mn></mrow></mfrac></mrow></math>';
  var speech = '12 thirty seconds';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac058
 */
sre.ClearspeakFractions.prototype.untestFrac058 = function() {
  var preference = 'Fraction_Ordinal';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mo>+</mo><mn>3</mn></mrow><mrow><mn>13</mn></mrow></mfrac></mrow></math>';
  var speech = 'The fraction with numerator 2 plus 3, and denominator 13';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac059
 */
sre.ClearspeakFractions.prototype.untestFrac059 = function() {
  var preference = 'Fraction_Ordinal';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mn>2</mn></mfrac></mrow></math>';
  var speech = 'The fraction with numerator X plus y, and denominator 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac060
 */
sre.ClearspeakFractions.prototype.untestFrac060 = function() {
  var preference = 'Fraction_Ordinal';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow></mfrac></mrow></math>';
  var speech = 'The fraction with numerator x plus y, and denominator x minus y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac061
 */
sre.ClearspeakFractions.prototype.untestFrac061 = function() {
  var preference = 'Fraction_Ordinal';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow></mfrac><mo>+</mo><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></math>';
  var speech = '<p>The fraction with numerator x plus y, and denominator x minus y</p><p>plus</p><p>two thirds</p>';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac062
 */
sre.ClearspeakFractions.prototype.untestFrac062 = function() {
  var preference = 'Fraction_Ordinal';
  var mathml = '<math><mrow><mfrac><mrow><mtext>miles</mtext></mrow><mrow><mtext>gallon</mtext></mrow></mfrac></mrow></math>';
  var speech = 'Miles over gallons';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac063
 */
sre.ClearspeakFractions.prototype.untestFrac063 = function() {
  var preference = 'Fraction_Ordinal';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mtext> miles</mtext></mrow><mrow><mn>3</mn><mtext> gallons</mtext></mrow></mfrac></mrow></math>';
  var speech = '2 miles over 3 gallons';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac064
 */
sre.ClearspeakFractions.prototype.untestFrac064 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></math>';
  var speech = 'One half';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac065
 */
sre.ClearspeakFractions.prototype.untestFrac065 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mn>12</mn></mrow><mrow><mn>32</mn></mrow></mfrac></mrow></math>';
  var speech = '12 over 32, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac066
 */
sre.ClearspeakFractions.prototype.untestFrac066 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mo>+</mo><mn>3</mn></mrow><mrow><mn>13</mn></mrow></mfrac></mrow></math>';
  var speech = 'The fraction with numerator 2 plus 3, and denominator 13, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac067
 */
sre.ClearspeakFractions.prototype.untestFrac067 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mn>2</mn></mfrac></mrow></math>';
  var speech = 'The fraction with numerator x plus y, and denominator 2, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac068
 */
sre.ClearspeakFractions.prototype.untestFrac068 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow></mfrac></mrow></math>';
  var speech = 'The fraction with numerator x plus y, and denominator x minus y, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac069
 */
sre.ClearspeakFractions.prototype.untestFrac069 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow></mfrac><mo>+</mo><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></math>';
  var speech = '<p>The fraction with numerator x plus y, and denominator x minus y, end fraction</p><p>plus</p><p>two thirds</p>';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac070
 */
sre.ClearspeakFractions.prototype.untestFrac070 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mtext>miles</mtext></mrow><mrow><mtext>gallons</mtext></mrow></mfrac></mrow></math>';
  var speech = 'Miles over gallons';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Frac071
 */
sre.ClearspeakFractions.prototype.untestFrac071 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mtext> miles</mtext></mrow><mrow><mn>3</mn><mtext> gallons</mtext></mrow></mfrac></mrow></math>';
  var speech = '2 miles over 3 gallons';
  this.executeRuleTest(mathml, speech, preference);
};


//
// Fraction (with Text in Numerator and/or denominator)
//


/**
 * Testing ClearspeakFractions Example FrTxt001
 */
sre.ClearspeakFractions.prototype.untestFrTxt001 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mtext></mtext><mtext>miles</mtext></mrow><mrow><mn>3</mn><mtext></mtext><mtext>gallons</mtext></mrow></mfrac></mrow></math>';
  var speech = '2 miles over 3 gallons';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example FrTxt002
 */
sre.ClearspeakFractions.prototype.untestFrTxt002 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mtext>rise</mtext></mrow><mrow><mtext>run</mtext></mrow></mfrac></mrow></math>';
  var speech = 'Rise over run';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example FrTxt003
 */
sre.ClearspeakFractions.prototype.untestFrTxt003 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow/></math>';
  var speech = 'Successful outcomes over total outcomes';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example FrTxt004
 */
sre.ClearspeakFractions.prototype.untestFrTxt004 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mn>6</mn><mtext> ways of rolling a 7</mtext></mrow><mrow><mn>36</mn><mtext> ways of rolling the pair of dice</mtext></mrow></mfrac></mrow></math>';
  var speech = 'Six ways of rolling a 7 over 36 ways of rolling the pair of dice';
  this.executeRuleTest(mathml, speech, preference);
};


//
// Nested Fractions
//


/**
 * Testing ClearspeakFractions Example NestFrac001
 */
sre.ClearspeakFractions.prototype.untestNestFrac001 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow><mrow><mfrac><mn>1</mn><mn>3</mn></mfrac></mrow></mfrac></mrow></math>';
  var speech = 'one half over one third';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example NestFrac002
 */
sre.ClearspeakFractions.prototype.untestNestFrac002 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mn>1</mn><mrow><mfrac><mn>2</mn><mrow><mfrac><mn>1</mn><mn>3</mn></mfrac></mrow></mfrac></mrow></mfrac></mrow></math>';
  var speech = '<p>the fraction with numerator 1</p><p>and</p><p>denominator 2 over one third</p>';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example NestFrac003
 */
sre.ClearspeakFractions.prototype.untestNestFrac003 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow><mn>3</mn></mfrac></mrow></math>';
  var speech = 'one half over 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example NestFrac004
 */
sre.ClearspeakFractions.prototype.untestNestFrac004 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mn>1</mn><mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mfrac></mrow></math>';
  var speech = '<p>1</p><p>over</p><p>two thirds</p>';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example NestFrac005
 */
sre.ClearspeakFractions.prototype.untestNestFrac005 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mfrac><mrow><mn>11</mn></mrow><mrow><mn>32</mn></mrow></mfrac></mrow><mrow><mfrac><mrow><mn>16</mn></mrow><mrow><mn>51</mn></mrow></mfrac></mrow></mfrac></mrow></math>';
  var speech = '<p>the fraction with numerator 11 over 32</p><p>and</p><p>denominator 16 over 51</p>';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example NestFrac006
 */
sre.ClearspeakFractions.prototype.untestNestFrac006 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mn>11</mn></mrow><mrow><mfrac><mrow><mn>32</mn></mrow><mrow><mfrac><mrow><mn>16</mn></mrow><mrow><mn>51</mn></mrow></mfrac></mrow></mfrac></mrow></mfrac></mrow></math>';
  var speech = '<p>the fraction with numerator 11</p><p>and</p><p>denominator,</p><p>the fraction with numerator 32,</p><p>and</p><p>denominator 16 over 51</p>';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example NestFrac007
 */
sre.ClearspeakFractions.prototype.untestNestFrac007 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mn>1</mn><mo>+</mo><mfrac><mn>4</mn><mi>x</mi></mfrac></mrow><mn>2</mn></mfrac></mrow></math>';
  var speech = '<p>the fraction with numerator,</p><p>1 plus,</p><p>4 over x,</p><p>And denominator 2</p>';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example NestFrac008
 */
sre.ClearspeakFractions.prototype.untestNestFrac008 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mn>3</mn><mrow><mn>2</mn><mo>+</mo><mfrac><mn>4</mn><mi>x</mi></mfrac></mrow></mfrac></mrow></math>';
  var speech = '<p>the fraction with numerator 3,</p><p>and</p><p>denominator,</p><p>2 plus,</p><p>4 over x</p>';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example NestFrac009
 */
sre.ClearspeakFractions.prototype.untestNestFrac009 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mfrac><mrow><mn>10</mn></mrow><mrow><mn>22</mn></mrow></mfrac></mrow><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mfrac></mrow></math>';
  var speech = '<p>the fraction with numerator 10 over 22</p><p>and</p><p>denominator one half</p>';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example NestFrac010
 */
sre.ClearspeakFractions.prototype.untestNestFrac010 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mn>1</mn><mo>+</mo><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow><mrow><mn>1</mn><mo>−</mo><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mfrac></mrow></math>';
  var speech = '<p>the fraction with numerator 1 plus two thirds,</p><p>and</p><p>denominator, 1 minus two thirds</p>';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example NestFrac011
 */
sre.ClearspeakFractions.prototype.untestNestFrac011 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mn>1</mn><mo>+</mo><mfrac><mi>x</mi><mn>2</mn></mfrac></mrow><mrow><mn>1</mn><mo>−</mo><mfrac><mi>x</mi><mn>2</mn></mfrac></mrow></mfrac></mrow></math>';
  var speech = '<p>the fraction with numerator</p><p>1 plus,</p><p>x over 2,</p><p>and</p><p>denominator,</p><p>1 minus,</p><p>x over 2</p>';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example NestFrac012
 */
sre.ClearspeakFractions.prototype.untestNestFrac012 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mrow><mi>x</mi><mo>−</mo><mn>1</mn></mrow></mfrac><mo>+</mo><mn>1</mn></mrow><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow></mfrac></mrow></math>';
  var speech = '<p>the fraction with numerator,</p><p>the fraction with numerator x plus 1</p><p>and</p><p>denominator,</p><p>x minus 1,</p><p>plus 1,</p><p>and</p><p>denominator x plus 1</p>';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example NestFrac013
 */
sre.ClearspeakFractions.prototype.untestNestFrac013 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mrow><mi>x</mi><mo>−</mo><mn>4</mn></mrow></mfrac><mo>+</mo><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow><mrow><mi>x</mi><mo>+</mo><mfrac><mn>1</mn><mrow><mn>16</mn></mrow></mfrac></mrow></mfrac></mrow></math>';
  var speech = '<p>the fraction with numerator</p><p>the fraction with numerator x plus 1 and</p><p>denominator x minus 4</p><p>plus,</p><p>one half,</p><p>and</p><p>denominator</p><p>x plus,</p><p>1 16th</p>';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example NestFrac014
 */
sre.ClearspeakFractions.prototype.untestNestFrac014 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mn>1</mn><mo>+</mo><mfrac><mi>x</mi><mrow><mn>1</mn><mo>+</mo><mfrac><mn>2</mn><mi>x</mi></mfrac></mrow></mfrac></mrow></math>';
  var speech = '<p>one</p><p>plus</p><p>the fraction with numerator x,</p><p>and denominator 1, plus 2 over x</p>';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example NestFrac015
 */
sre.ClearspeakFractions.prototype.untestNestFrac015 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mn>1</mn><mo>+</mo><mfrac><mrow><mi>x</mi><mo>+</mo><mn>3</mn></mrow><mrow><mn>1</mn><mo>+</mo><mfrac><mn>2</mn><mrow><mi>x</mi><mo>+</mo><mn>3</mn></mrow></mfrac></mrow></mfrac></mrow></math>';
  var speech = '<p>1</p><p>plus</p><p>the fraction with numerator x plus 3</p><p>and denominator, 1 plus</p><p>the fraction with numerator 2 and denominator x plus 3</p>';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example NestFrac016
 */
sre.ClearspeakFractions.prototype.untestNestFrac016 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mn>1</mn><mo>+</mo><mfrac><mn>1</mn><mrow><mn>1</mn><mo>+</mo><mfrac><mn>1</mn><mrow><mn>1</mn><mo>+</mo><mfrac><mn>1</mn><mrow><mn>1</mn><mo>+</mo><mn>1</mn></mrow></mfrac></mrow></mfrac></mrow></mfrac></mrow></math>';
  var speech = '<p>one</p><p>plus</p><p>the fraction with numerator 1 and denominator , 1 plus the fraction with numerator 1 and denominator 1 plus the fraction with numerator 1 and denominator, 1 plus 1</p>';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example NestFrac017
 */
sre.ClearspeakFractions.prototype.untestNestFrac017 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mn>1</mn><mo>+</mo><mfrac><mn>1</mn><mrow><mn>1</mn><mo>+</mo><mfrac><mn>1</mn><mrow><mn>1</mn><mo>+</mo><mfrac><mn>1</mn><mrow><mn>1</mn><mo>+</mo><mo>⋯</mo></mrow></mfrac></mrow></mfrac></mrow></mfrac></mrow></math>';
  var speech = '<p>one</p><p>plus</p><p>the fraction with numerator 1 and denominator 1 plus the fraction with numerator 1 and denominator 1 plus the fraction with numerator 1 and denominator 1 plus dot dot dot</p>';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example NestFrac018
 */
sre.ClearspeakFractions.prototype.untestNestFrac018 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><msub><mi>a</mi><mn>0</mn></msub><mo>+</mo><mfrac><mn>1</mn><mrow><msub><mi>a</mi><mn>1</mn></msub><mo>+</mo><mfrac><mn>1</mn><mrow><msub><mi>a</mi><mn>2</mn></msub><mo>+</mo><mfrac><mn>1</mn><mrow><msub><mi>a</mi><mn>3</mn></msub><mo>+</mo><mo>⋯</mo></mrow></mfrac></mrow></mfrac></mrow></mfrac></mrow></math>';
  var speech = '<p>a sub 0</p><p>plus</p><p>the fraction with numerator 1 and denominator a sub 1 plus the fraction with numerator 1 and denominator a sub 2 plus the fraction with numerator 1 and denominator a sub 3 plus dot dot dot</p>';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example NestFrac019
 */
sre.ClearspeakFractions.prototype.untestNestFrac019 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow><mrow><mfrac><mn>1</mn><mn>3</mn></mfrac></mrow></mfrac></mrow></math>';
  var speech = 'one half over one third';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example NestFrac020
 */
sre.ClearspeakFractions.prototype.untestNestFrac020 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mn>1</mn><mrow><mfrac><mn>2</mn><mrow><mfrac><mn>1</mn><mn>3</mn></mfrac></mrow></mfrac></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator 1, and denominator, 2 over one third, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example NestFrac021
 */
sre.ClearspeakFractions.prototype.untestNestFrac021 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow><mn>3</mn></mfrac></mrow></math>';
  var speech = 'one half over 3, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example NestFrac022
 */
sre.ClearspeakFractions.prototype.untestNestFrac022 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mn>1</mn><mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mfrac></mrow></math>';
  var speech = '1 over two thirds, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example NestFrac023
 */
sre.ClearspeakFractions.prototype.untestNestFrac023 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mfrac><mrow><mn>11</mn></mrow><mrow><mn>32</mn></mrow></mfrac></mrow><mrow><mfrac><mrow><mn>16</mn></mrow><mrow><mn>51</mn></mrow></mfrac></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator 11 over 32, and denominator, 16 over 51, end fraction.';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example NestFrac024
 */
sre.ClearspeakFractions.prototype.untestNestFrac024 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mn>11</mn></mrow><mrow><mfrac><mrow><mn>32</mn></mrow><mrow><mfrac><mrow><mn>16</mn></mrow><mrow><mn>51</mn></mrow></mfrac></mrow></mfrac></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator 11 and denominator, the fraction with numerator 32 and denominator 16 over 51, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example NestFrac025
 */
sre.ClearspeakFractions.prototype.untestNestFrac025 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mn>1</mn><mo>+</mo><mfrac><mn>4</mn><mi>x</mi></mfrac></mrow><mn>2</mn></mfrac></mrow></math>';
  var speech = 'the fraction with numerator, 1 plus 4 over x and denominator 2, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example NestFrac026
 */
sre.ClearspeakFractions.prototype.untestNestFrac026 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mn>3</mn><mrow><mn>2</mn><mo>+</mo><mfrac><mn>4</mn><mi>x</mi></mfrac></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator 3 and denominator, 2 plus 4 over x, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example NestFrac027
 */
sre.ClearspeakFractions.prototype.untestNestFrac027 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mfrac><mrow><mn>10</mn></mrow><mrow><mn>22</mn></mrow></mfrac></mrow><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator 10 over 22, and denominator one half, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example NestFrac028
 */
sre.ClearspeakFractions.prototype.untestNestFrac028 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mn>1</mn><mo>+</mo><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow><mrow><mn>1</mn><mo>−</mo><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator 1 plus two thirds, and denominator, 1 minus two thirds, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example NestFrac029
 */
sre.ClearspeakFractions.prototype.untestNestFrac029 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mn>1</mn><mo>+</mo><mfrac><mi>x</mi><mn>2</mn></mfrac></mrow><mrow><mn>1</mn><mo>−</mo><mfrac><mi>x</mi><mn>2</mn></mfrac></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator, 1 plus the x over 2, and denominator 1 minus x over 2, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example NestFrac030
 */
sre.ClearspeakFractions.prototype.untestNestFrac030 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mrow><mi>x</mi><mo>−</mo><mn>1</mn></mrow></mfrac><mo>+</mo><mn>1</mn></mrow><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator, the fraction with numerator x plus 1 and denominator x minus 1, plus 1, and denominator x plus 1, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example NestFrac031
 */
sre.ClearspeakFractions.prototype.untestNestFrac031 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mrow><mi>x</mi><mo>−</mo><mn>4</mn></mrow></mfrac><mo>+</mo><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow><mrow><mi>x</mi><mo>+</mo><mfrac><mn>1</mn><mrow><mn>16</mn></mrow></mfrac></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator the fraction with numerator x plus 1 and denominator, x minus 4 plus one half, and denominator x plus 1 over 16, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example NestFrac032
 */
sre.ClearspeakFractions.prototype.untestNestFrac032 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mn>1</mn><mo>+</mo><mfrac><mi>x</mi><mrow><mn>1</mn><mo>+</mo><mfrac><mn>2</mn><mi>x</mi></mfrac></mrow></mfrac></mrow></math>';
  var speech = 'one plus the fraction with numerator x, and denominator 1 plus 2 over x, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example NestFrac033
 */
sre.ClearspeakFractions.prototype.untestNestFrac033 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mn>1</mn><mo>+</mo><mfrac><mrow><mi>x</mi><mo>+</mo><mn>3</mn></mrow><mrow><mn>1</mn><mo>+</mo><mfrac><mn>2</mn><mrow><mi>x</mi><mo>+</mo><mn>3</mn></mrow></mfrac></mrow></mfrac></mrow></math>';
  var speech = '1 plus the fraction with numerator x plus 3 and denominator 1 plus the fraction with numerator 2 and denominator x plus 3, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example NestFrac034
 */
sre.ClearspeakFractions.prototype.untestNestFrac034 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mn>1</mn><mo>+</mo><mfrac><mn>1</mn><mrow><mn>1</mn><mo>+</mo><mfrac><mn>1</mn><mrow><mn>1</mn><mo>+</mo><mfrac><mn>1</mn><mrow><mn>1</mn><mo>+</mo><mn>1</mn></mrow></mfrac></mrow></mfrac></mrow></mfrac></mrow></math>';
  var speech = 'one plus the fraction with numerator 1 and denominator, 1 plus the fraction with numerator 1 and denominator 1 plus the fraction with numerator 1 and denominator, 1 plus 1, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example NestFrac035
 */
sre.ClearspeakFractions.prototype.untestNestFrac035 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mn>1</mn><mo>+</mo><mfrac><mn>1</mn><mrow><mn>1</mn><mo>+</mo><mfrac><mn>1</mn><mrow><mn>1</mn><mo>+</mo><mfrac><mn>1</mn><mrow><mn>1</mn><mo>+</mo><mo>⋯</mo></mrow></mfrac></mrow></mfrac></mrow></mfrac></mrow></math>';
  var speech = 'one plus the fraction with numerator 1 and denominator 1 plus the fraction with numerator 1 and denominator 1 plus the fraction with numerator 1 and denominator 1 plus dot dot dot, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example NestFrac036
 */
sre.ClearspeakFractions.prototype.untestNestFrac036 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><msub><mi>a</mi><mn>0</mn></msub><mo>+</mo><mfrac><mn>1</mn><mrow><msub><mi>a</mi><mn>1</mn></msub><mo>+</mo><mfrac><mn>1</mn><mrow><msub><mi>a</mi><mn>2</mn></msub><mo>+</mo><mfrac><mn>1</mn><mrow><msub><mi>a</mi><mn>3</mn></msub><mo>+</mo><mo>⋯</mo></mrow></mfrac></mrow></mfrac></mrow></mfrac></mrow></math>';
  var speech = 'a sub 0 plus the fraction with numerator 1 and denominator a sub 1 plus the fraction with numerator 1 and denominator a sub 2 plus the fraction with numerator 1 and denominator a sub 3 plus dot dot dot, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


//
// Fractions with Functions
//


/**
 * Testing ClearspeakFractions Example Fracfunct001
 */
sre.ClearspeakFractions.prototype.untestFracfunct001 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mrow><mi>g</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></mfrac></mrow></math>';
  var speech = 'F of x over g of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Fracfunct002
 */
sre.ClearspeakFractions.prototype.untestFracfunct002 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow><mo>+</mo><mi>g</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mrow><mi>g</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></mfrac></mrow></math>';
  var speech = 'The fraction with numerator f of x plus g of x, and denominator g of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Fracfunct003
 */
sre.ClearspeakFractions.prototype.untestFracfunct003 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow><mrow><mi>g</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator f of, open paren, x plus 1, close paren, and denominator g of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Fracfunct004
 */
sre.ClearspeakFractions.prototype.untestFracfunct004 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mn>2</mn></mfrac></mrow></math>';
  var speech = 'f of x, over 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Fracfunct005
 */
sre.ClearspeakFractions.prototype.untestFracfunct005 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mn>2</mn><mrow><mi>f</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></mfrac></mrow></math>';
  var speech = '2 over f of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Fracfunct006
 */
sre.ClearspeakFractions.prototype.untestFracfunct006 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mn>2</mn><mrow><mi>g</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow><mo>+</mo><mi>g</mi><mo stretchy="false">(</mo><mi>x</mi><mo>+</mo><mn>1</mn><mo stretchy="false">)</mo></mrow></mfrac></mrow></math>';
  var speech = 'The fraction with numerator 2, and denominator g of x plus g of, open paren, x plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Fracfunct007
 */
sre.ClearspeakFractions.prototype.untestFracfunct007 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>sin</mi><mi>x</mi></mrow><mrow><mi>cos</mi><mi>x</mi></mrow></mfrac></mrow></math>';
  var speech = 'Sine x over cosine x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Fracfunct008
 */
sre.ClearspeakFractions.prototype.untestFracfunct008 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow/></math>';
  var speech = 'Sine, open paren, x plus y, slose paren, over, cosine, open paren, x plus y, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Fracfunct009
 */
sre.ClearspeakFractions.prototype.untestFracfunct009 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>sin</mi><mi>x</mi><mo>+</mo><mi>cos</mi><mi>x</mi></mrow><mrow><mi>cos</mi><mi>x</mi></mrow></mfrac></mrow></math>';
  var speech = 'The fraction with numerator sin x plus cosine x, and denominator cosine x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Fracfunct010
 */
sre.ClearspeakFractions.prototype.untestFracfunct010 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>sin</mi><mn>2</mn><mi>x</mi></mrow><mrow><mi>cos</mi><mn>3</mn><mi>x</mi></mrow></mfrac></mrow></math>';
  var speech = 'Sine 2x, over, cosine 3x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Fracfunct011
 */
sre.ClearspeakFractions.prototype.untestFracfunct011 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mo>)</mo></mrow></mrow><mrow><mi>cos</mi><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mo>)</mo></mrow></mrow></mfrac></mrow></math>';
  var speech = 'The fraction with numerator, The sine of, open paren, x plus y, close paren, and denominator, the cosine of, open paren, x plus y, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Fracfunct012
 */
sre.ClearspeakFractions.prototype.untestFracfunct012 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>f</mi><mrow><mo>(</mo><mrow><mn>2</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow><mrow><mi>g</mi><mrow><mo>(</mo><mrow><mn>3</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow></mfrac></mrow></math>';
  var speech = 'F of 2x over g of 3x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Fracfunct013
 */
sre.ClearspeakFractions.prototype.untestFracfunct013 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>log</mi><mi>x</mi></mrow><mrow><mi>log</mi><mi>y</mi></mrow></mfrac></mrow></math>';
  var speech = 'Log x over log y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Fracfunct014
 */
sre.ClearspeakFractions.prototype.untestFracfunct014 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>log</mi><mn>2</mn><mi>x</mi></mrow><mrow><mi>log</mi><mn>3</mn><mi>y</mi></mrow></mfrac></mrow></math>';
  var speech = 'Log 2<em>x</em> over log 3<em>y</em>';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Fracfunct015
 */
sre.ClearspeakFractions.prototype.untestFracfunct015 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><msub><mrow><mi>log</mi></mrow><mrow><mn>10</mn></mrow></msub><mi>x</mi></mrow><mrow><msub><mrow><mi>log</mi></mrow><mn>5</mn></msub><mi>y</mi></mrow></mfrac></mrow></math>';
  var speech = 'The log base 10 of x over the log base 10 of y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Fracfunct016
 */
sre.ClearspeakFractions.prototype.untestFracfunct016 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><msub><mrow><mi>log</mi></mrow><mrow><mn>10</mn></mrow></msub><mn>2</mn><mi>x</mi></mrow><mrow><msub><mrow><mi>log</mi></mrow><mn>5</mn></msub><mn>3</mn><mi>y</mi></mrow></mfrac></mrow></math>';
  var speech = 'The log base 10 of 2x over the log base 5 of 3y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Fracfunct017
 */
sre.ClearspeakFractions.prototype.untestFracfunct017 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>log</mi><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow><mrow><mi>log</mi><mi>y</mi></mrow></mfrac></mrow></math>';
  var speech = 'The fraction with numerator, the log of, open paren x plus 1, close paren, and denominator log y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFractions Example Fracfunct018
 */
sre.ClearspeakFractions.prototype.untestFracfunct018 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><msub><mi>f</mi><mn>1</mn></msub><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mrow><msub><mi>g</mi><mn>1</mn></msub><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></mfrac></mrow></math>';
  var speech = 'F sub 1 of x over g sub 1 of x';
  this.executeRuleTest(mathml, speech, preference);
};
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


goog.provide('sre.ClearspeakGermanFractions');

goog.require('sre.ClearspeakGermanRuleTest');



/**
* @constructor
* @extends {sre.ClearspeakGermanRuleTest}
*/
sre.ClearspeakGermanFractions = function() {
  sre.ClearspeakGermanFractions.base(this, 'constructor');

  /**
* @override
  */
  this.information = 'ClearspeakGermanFractions rule tests.';

};
goog.inherits(sre.ClearspeakGermanFractions, sre.ClearspeakGermanRuleTest);



//
// Fractions
//


/**
 * Testing ClearspeakGermanFractions Example Frac001
 */
sre.ClearspeakGermanFractions.prototype.testFrac001 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></math>';
  var speech = 'un-demi';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac002
 */
sre.ClearspeakGermanFractions.prototype.testFrac002 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mn>12</mn></mrow><mrow><mn>32' +
      '</mn></mrow></mfrac></mrow></math>';
  var speech = '12 sur 32';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac002a
 */
sre.ClearspeakGermanFractions.prototype.testFrac002a = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mi>x</mi><mi>y</mi></mfrac></mrow></math>';
  var speech = 'x sur y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac002b
 */
sre.ClearspeakGermanFractions.prototype.testFrac002b = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mi>x</mi></mrow><mrow>' +
      '<mn>3</mn><mi>y</mi></mrow></mfrac></mrow></math>';
  var speech = '2 x sur 3 y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac002c
 */
sre.ClearspeakGermanFractions.prototype.testFrac002c = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mi>y</mi></mrow><mrow>' +
      '<mi>c</mi><mi>d</mi></mrow></mfrac></mrow></math>';
  var speech = 'x y sur c d';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac002d
 */
sre.ClearspeakGermanFractions.prototype.testFrac002d = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mfrac><mn>1</mn><mn>2</mn>' +
      '</mfrac></mrow><mrow><mfrac><mn>1</mn><mn>3</mn></mfrac></mrow>' +
      '</mfrac></mrow></math>';
  var speech = 'un-demi sur un-tiers';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac002e
 */
sre.ClearspeakGermanFractions.prototype.testFrac002e = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mo>−</mo><mi>x</mi></mrow><mi>y' +
      '</mi></mfrac></mrow></math>';
  var speech = 'négatif x sur y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac002f
 */
sre.ClearspeakGermanFractions.prototype.testFrac002f = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mo>−</mo><mn>2</mn><mi>x</mi>' +
      '</mrow><mrow><mn>3</mn><mi>y</mi></mrow></mfrac></mrow></math>';
  var speech = 'négatif 2 x sur 3 y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac002g
 */
sre.ClearspeakGermanFractions.prototype.testFrac002g = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mi>y</mi></mrow><mrow>' +
      '<mo>−</mo><mi>c</mi><mi>d</mi></mrow></mfrac></mrow></math>';
  var speech = 'x y sur négatif c d';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac002h
 */
sre.ClearspeakGermanFractions.prototype.testFrac002h = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mfrac><mn>1</mn><mn>2</mn>' +
      '</mfrac></mrow><mrow><mo>−</mo><mfrac><mn>1</mn><mn>3</mn></mfrac>' +
      '</mrow></mfrac></mrow></math>';
  var speech = 'un-demi sur négatif un-tiers';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac003
 */
sre.ClearspeakGermanFractions.prototype.testFrac003 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mo>+</mo><mn>3</mn>' +
      '</mrow><mrow><mn>13</mn></mrow></mfrac></mrow></math>';
  var speech = 'fraction avec numérateur 2 plus 3, et dénominateur 13';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac004
 */
sre.ClearspeakGermanFractions.prototype.testFrac004 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '</mrow><mn>2</mn></mfrac></mrow></math>';
  var speech = 'fraction avec numérateur x plus y, et dénominateur 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac005
 */
sre.ClearspeakGermanFractions.prototype.testFrac005 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '</mrow><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow></mfrac></mrow>' +
      '</math>';
  var speech = 'fraction avec numérateur x plus y, et dénominateur x moins y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac006
 */
sre.ClearspeakGermanFractions.prototype.testFrac006 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '</mrow><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow></mfrac><mo>+</mo>' +
      '<mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></math>';
  var speech = 'fraction avec numérateur x plus y, et dénominateur x moins y, plus deux-tiers';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac007
 */
sre.ClearspeakGermanFractions.prototype.testFrac007 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mtext>miles</mtext></mrow><mrow>' +
      '<mtext>gallon</mtext></mrow></mfrac></mrow></math>';
  var speech = 'miles sur gallon';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac008
 */
sre.ClearspeakGermanFractions.prototype.testFrac008 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mtext>miles</mtext>' +
      '</mrow><mrow><mn>3</mn><mtext>gallons</mtext></mrow></mfrac></mrow>' +
      '</math>';
  var speech = '2 miles sur 3 gallons';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac009
 */
sre.ClearspeakGermanFractions.prototype.testFrac009 = function() {
  var preference = 'Fraction_Over';
  var mathml = '<math><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></math>';
  var speech = '1 sur 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac010
 */
sre.ClearspeakGermanFractions.prototype.testFrac010 = function() {
  var preference = 'Fraction_Over';
  var mathml = '<math><mrow><mfrac><mrow><mn>12</mn></mrow><mrow><mn>32' +
      '</mn></mrow></mfrac></mrow></math>';
  var speech = '12 sur 32';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac011
 */
sre.ClearspeakGermanFractions.prototype.testFrac011 = function() {
  var preference = 'Fraction_Over';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mo>+</mo><mn>3</mn>' +
      '</mrow><mrow><mn>13</mn></mrow></mfrac></mrow></math>';
  var speech = '2 plus 3 sur 13';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac012
 */
sre.ClearspeakGermanFractions.prototype.testFrac012 = function() {
  var preference = 'Fraction_Over';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '</mrow><mn>2</mn></mfrac></mrow></math>';
  var speech = 'x plus y sur 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac013
 */
sre.ClearspeakGermanFractions.prototype.testFrac013 = function() {
  var preference = 'Fraction_Over';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '</mrow><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow></mfrac></mrow>' +
      '</math>';
  var speech = 'x plus y sur x moins y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac014
 */
sre.ClearspeakGermanFractions.prototype.testFrac014 = function() {
  var preference = 'Fraction_Over';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '</mrow><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow></mfrac><mo>+</mo>' +
      '<mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></math>';
  var speech = 'x plus y sur x moins y, plus, 2 sur 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac015
 */
sre.ClearspeakGermanFractions.prototype.testFrac015 = function() {
  var preference = 'Fraction_Over';
  var mathml = '<math><mrow><mfrac><mrow><mtext>miles</mtext></mrow><mrow>' +
      '<mtext>gallon</mtext></mrow></mfrac></mrow></math>';
  var speech = 'miles sur gallon';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac016
 */
sre.ClearspeakGermanFractions.prototype.testFrac016 = function() {
  var preference = 'Fraction_Over';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mtext>miles</mtext>' +
      '</mrow><mrow><mn>3</mn><mtext>gallons</mtext></mrow></mfrac></mrow>' +
      '</math>';
  var speech = '2 miles sur 3 gallons';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac017
 */
sre.ClearspeakGermanFractions.prototype.testFrac017 = function() {
  var preference = 'Fraction_OverEndFrac';
  var mathml = '<math><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></math>';
  var speech = '1 sur 2, fin fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac018
 */
sre.ClearspeakGermanFractions.prototype.testFrac018 = function() {
  var preference = 'Fraction_OverEndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mn>12</mn></mrow><mrow><mn>32' +
      '</mn></mrow></mfrac></mrow></math>';
  var speech = '12 sur 32, fin fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac019
 */
sre.ClearspeakGermanFractions.prototype.testFrac019 = function() {
  var preference = 'Fraction_OverEndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mo>+</mo><mn>3</mn>' +
      '</mrow><mrow><mn>13</mn></mrow></mfrac></mrow></math>';
  var speech = '2 plus 3 sur 13, fin fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac020
 */
sre.ClearspeakGermanFractions.prototype.testFrac020 = function() {
  var preference = 'Fraction_OverEndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '</mrow><mn>2</mn></mfrac></mrow></math>';
  var speech = 'x plus y sur 2, fin fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac021
 */
sre.ClearspeakGermanFractions.prototype.testFrac021 = function() {
  var preference = 'Fraction_OverEndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '</mrow><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow></mfrac></mrow>' +
      '</math>';
  var speech = 'x plus y sur x moins y, fin fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac022
 */
sre.ClearspeakGermanFractions.prototype.testFrac022 = function() {
  var preference = 'Fraction_OverEndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '</mrow><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow></mfrac><mo>+</mo>' +
      '<mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></math>';
  var speech = 'x plus y sur x moins y, fin fraction, plus, 2 sur 3, fin fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac023
 */
sre.ClearspeakGermanFractions.prototype.testFrac023 = function() {
  var preference = 'Fraction_OverEndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mtext>miles</mtext></mrow><mrow>' +
      '<mtext>gallons</mtext></mrow></mfrac></mrow></math>';
  var speech = 'miles sur gallons, fin fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac024
 */
sre.ClearspeakGermanFractions.prototype.testFrac024 = function() {
  var preference = 'Fraction_OverEndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mtext>miles</mtext>' +
      '</mrow><mrow><mn>3</mn><mtext>gallons</mtext></mrow></mfrac></mrow>' +
      '</math>';
  var speech = '2 miles sur 3 gallons, fin fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac025
 */
sre.ClearspeakGermanFractions.prototype.testFrac025 = function() {
  var preference = 'Fraction_GeneralEndFrac';
  var mathml = '<math><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></math>';
  var speech = 'fraction avec numérateur 1, et dénominateur 2, fin fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac026
 */
sre.ClearspeakGermanFractions.prototype.testFrac026 = function() {
  var preference = 'Fraction_GeneralEndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mn>12</mn></mrow><mrow><mn>32' +
      '</mn></mrow></mfrac></mrow></math>';
  var speech = 'fraction avec numérateur 12, et dénominateur 32, fin fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac027
 */
sre.ClearspeakGermanFractions.prototype.testFrac027 = function() {
  var preference = 'Fraction_GeneralEndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mo>+</mo><mn>3</mn>' +
      '</mrow><mrow><mn>13</mn></mrow></mfrac></mrow></math>';
  var speech = 'fraction avec numérateur 2 plus 3, et dénominateur 13, fin fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac028
 */
sre.ClearspeakGermanFractions.prototype.testFrac028 = function() {
  var preference = 'Fraction_GeneralEndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '</mrow><mn>2</mn></mfrac></mrow></math>';
  var speech = 'fraction avec numérateur x plus y, et dénominateur 2, fin fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac029
 */
sre.ClearspeakGermanFractions.prototype.testFrac029 = function() {
  var preference = 'Fraction_GeneralEndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '</mrow><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow></mfrac></mrow>' +
      '</math>';
  var speech = 'fraction avec numérateur x plus y, et dénominateur x moins y, fin fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac030
 */
sre.ClearspeakGermanFractions.prototype.testFrac030 = function() {
  var preference = 'Fraction_GeneralEndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '</mrow><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow></mfrac><mo>+</mo>' +
      '<mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></math>';
  var speech = 'fraction avec numérateur x plus y, et dénominateur x moins y, fin fraction, plus, fraction avec numérateur 2, et dénominateur 3, fin fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac031
 */
sre.ClearspeakGermanFractions.prototype.testFrac031 = function() {
  var preference = 'Fraction_GeneralEndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mtext>miles</mtext></mrow><mrow>' +
      '<mtext>gallon</mtext></mrow></mfrac></mrow></math>';
  var speech = 'fraction avec numérateur miles, et dénominateur gallon, fin fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac032
 */
sre.ClearspeakGermanFractions.prototype.testFrac032 = function() {
  var preference = 'Fraction_General';
  var mathml = '<math><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></math>';
  var speech = 'fraction avec numérateur 1, et dénominateur 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac033
 */
sre.ClearspeakGermanFractions.prototype.testFrac033 = function() {
  var preference = 'Fraction_General';
  var mathml = '<math><mrow><mfrac><mrow><mn>12</mn></mrow><mrow><mn>32' +
      '</mn></mrow></mfrac></mrow></math>';
  var speech = 'fraction avec numérateur 12, et dénominateur 32';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac034
 */
sre.ClearspeakGermanFractions.prototype.testFrac034 = function() {
  var preference = 'Fraction_General';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mo>+</mo><mn>3</mn>' +
      '</mrow><mrow><mn>13</mn></mrow></mfrac></mrow></math>';
  var speech = 'fraction avec numérateur 2 plus 3, et dénominateur 13';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac035
 */
sre.ClearspeakGermanFractions.prototype.testFrac035 = function() {
  var preference = 'Fraction_General';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '</mrow><mn>2</mn></mfrac></mrow></math>';
  var speech = 'fraction avec numérateur x plus y, et dénominateur 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac036
 */
sre.ClearspeakGermanFractions.prototype.testFrac036 = function() {
  var preference = 'Fraction_General';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '</mrow><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow></mfrac></mrow>' +
      '</math>';
  var speech = 'fraction avec numérateur x plus y, et dénominateur x moins y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac037
 */
sre.ClearspeakGermanFractions.prototype.testFrac037 = function() {
  var preference = 'Fraction_General';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '</mrow><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow></mfrac><mo>+</mo>' +
      '<mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></math>';
  var speech = 'fraction avec numérateur x plus y, et dénominateur x moins y, plus, fraction avec numérateur 2, et dénominateur 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac038
 */
sre.ClearspeakGermanFractions.prototype.testFrac038 = function() {
  var preference = 'Fraction_General';
  var mathml = '<math><mrow><mfrac><mrow><mtext>miles</mtext></mrow><mrow>' +
      '<mtext>gallon</mtext></mrow></mfrac></mrow></math>';
  var speech = 'fraction avec numérateur miles, et dénominateur gallon';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac039
 */
sre.ClearspeakGermanFractions.prototype.testFrac039 = function() {
  var preference = 'Fraction_General';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mtext>miles</mtext>' +
      '</mrow><mrow><mn>3</mn><mtext>gallons</mtext></mrow></mfrac></mrow>' +
      '</math>';
  var speech = 'fraction avec numérateur 2 miles, et dénominateur 3 gallons';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac040
 */
sre.ClearspeakGermanFractions.prototype.testFrac040 = function() {
  var preference = 'Fraction_FracOver';
  var mathml = '<math><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></math>';
  var speech = 'fraction 1 sur 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac041
 */
sre.ClearspeakGermanFractions.prototype.testFrac041 = function() {
  var preference = 'Fraction_FracOver';
  var mathml = '<math><mrow><mfrac><mrow><mn>12</mn></mrow><mrow><mn>32' +
      '</mn></mrow></mfrac></mrow></math>';
  var speech = 'fraction 12 sur 32';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac042
 */
sre.ClearspeakGermanFractions.prototype.testFrac042 = function() {
  var preference = 'Fraction_FracOver';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mo>+</mo><mn>3</mn>' +
      '</mrow><mrow><mn>13</mn></mrow></mfrac></mrow></math>';
  var speech = 'fraction 2 plus 3 sur 13';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac043
 */
sre.ClearspeakGermanFractions.prototype.testFrac043 = function() {
  var preference = 'Fraction_FracOver';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '</mrow><mn>2</mn></mfrac></mrow></math>';
  var speech = 'fraction x plus y sur 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac044
 */
sre.ClearspeakGermanFractions.prototype.testFrac044 = function() {
  var preference = 'Fraction_FracOver';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '</mrow><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow></mfrac></mrow>' +
      '</math>';
  var speech = 'fraction x plus y sur x moins y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac045
 */
sre.ClearspeakGermanFractions.prototype.testFrac045 = function() {
  var preference = 'Fraction_FracOver';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '</mrow><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow></mfrac><mo>+</mo>' +
      '<mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></math>';
  var speech = 'fraction x plus y sur x moins y, plus, fraction 2 sur 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac046
 */
sre.ClearspeakGermanFractions.prototype.testFrac046 = function() {
  var preference = 'Fraction_FracOver';
  var mathml = '<math><mrow><mfrac><mrow><mtext>miles</mtext></mrow><mrow>' +
      '<mtext>gallon</mtext></mrow></mfrac></mrow></math>';
  var speech = 'fraction miles sur gallon';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac047
 */
sre.ClearspeakGermanFractions.prototype.testFrac047 = function() {
  var preference = 'Fraction_FracOver';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mtext>miles</mtext>' +
      '</mrow><mrow><mn>3</mn><mtext>gallons</mtext></mrow></mfrac></mrow>' +
      '</math>';
  var speech = 'fraction 2 miles sur 3 gallons';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac048
 */
sre.ClearspeakGermanFractions.prototype.testFrac048 = function() {
  var preference = 'Fraction_Per';
  var mathml = '<math><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></math>';
  var speech = '1 par 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac049
 */
sre.ClearspeakGermanFractions.prototype.testFrac049 = function() {
  var preference = 'Fraction_Per';
  var mathml = '<math><mrow><mfrac><mrow><mn>12</mn></mrow><mrow><mn>32' +
      '</mn></mrow></mfrac></mrow></math>';
  var speech = '12 par 32';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac050
 */
sre.ClearspeakGermanFractions.prototype.testFrac050 = function() {
  var preference = 'Fraction_Per';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mo>+</mo><mn>3</mn>' +
      '</mrow><mrow><mn>13</mn></mrow></mfrac></mrow></math>';
  var speech = '2 plus 3 par 13';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac051
 */
sre.ClearspeakGermanFractions.prototype.testFrac051 = function() {
  var preference = 'Fraction_Per';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '</mrow><mn>2</mn></mfrac></mrow></math>';
  var speech = 'x plus y par 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac052
 */
sre.ClearspeakGermanFractions.prototype.testFrac052 = function() {
  var preference = 'Fraction_Per';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '</mrow><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow></mfrac></mrow>' +
      '</math>';
  var speech = 'x plus y par x moins y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac053
 */
sre.ClearspeakGermanFractions.prototype.testFrac053 = function() {
  var preference = 'Fraction_Per';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '</mrow><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow></mfrac><mo>+</mo>' +
      '<mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></math>';
  var speech = 'x plus y par x moins y, plus, 2 par 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac054
 */
sre.ClearspeakGermanFractions.prototype.testFrac054 = function() {
  var preference = 'Fraction_Per';
  var mathml = '<math><mrow><mfrac><mrow><mtext>miles</mtext></mrow><mrow>' +
      '<mtext>gallon</mtext></mrow></mfrac></mrow></math>';
  var speech = 'miles par gallon';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac055
 */
sre.ClearspeakGermanFractions.prototype.testFrac055 = function() {
  var preference = 'Fraction_Per';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mtext>miles</mtext>' +
      '</mrow><mrow><mn>3</mn><mtext>gallons</mtext></mrow></mfrac></mrow>' +
      '</math>';
  var speech = '2 miles par 3 gallons';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac056
 */
sre.ClearspeakGermanFractions.prototype.testFrac056 = function() {
  var preference = 'Fraction_Ordinal';
  var mathml = '<math><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></math>';
  var speech = 'un-demi';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac057
 */
sre.ClearspeakGermanFractions.prototype.testFrac057 = function() {
  var preference = 'Fraction_Ordinal';
  var mathml = '<math><mrow><mfrac><mrow><mn>12</mn></mrow><mrow><mn>32' +
      '</mn></mrow></mfrac></mrow></math>';
  var speech = 'douze-trente-deuxièmes';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac058
 */
sre.ClearspeakGermanFractions.prototype.testFrac058 = function() {
  var preference = 'Fraction_Ordinal';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mo>+</mo><mn>3</mn>' +
      '</mrow><mrow><mn>13</mn></mrow></mfrac></mrow></math>';
  var speech = 'fraction avec numérateur 2 plus 3, et dénominateur 13';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac059
 */
sre.ClearspeakGermanFractions.prototype.testFrac059 = function() {
  var preference = 'Fraction_Ordinal';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '</mrow><mn>2</mn></mfrac></mrow></math>';
  var speech = 'fraction avec numérateur x plus y, et dénominateur 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac060
 */
sre.ClearspeakGermanFractions.prototype.testFrac060 = function() {
  var preference = 'Fraction_Ordinal';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '</mrow><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow></mfrac></mrow>' +
      '</math>';
  var speech = 'fraction avec numérateur x plus y, et dénominateur x moins y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac061
 */
sre.ClearspeakGermanFractions.prototype.testFrac061 = function() {
  var preference = 'Fraction_Ordinal';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '</mrow><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow></mfrac><mo>+</mo>' +
      '<mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></math>';
  var speech = 'fraction avec numérateur x plus y, et dénominateur x moins y, plus deux-tiers';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac062
 */
sre.ClearspeakGermanFractions.prototype.testFrac062 = function() {
  var preference = 'Fraction_Ordinal';
  var mathml = '<math><mrow><mfrac><mrow><mtext>miles</mtext></mrow><mrow>' +
      '<mtext>gallon</mtext></mrow></mfrac></mrow></math>';
  var speech = 'miles sur gallon';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac063
 */
sre.ClearspeakGermanFractions.prototype.testFrac063 = function() {
  var preference = 'Fraction_Ordinal';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mtext>miles</mtext>' +
      '</mrow><mrow><mn>3</mn><mtext>gallons</mtext></mrow></mfrac></mrow>' +
      '</math>';
  var speech = '2 miles sur 3 gallons';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac064
 */
sre.ClearspeakGermanFractions.prototype.testFrac064 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></math>';
  var speech = 'un-demi';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac065
 */
sre.ClearspeakGermanFractions.prototype.testFrac065 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mn>12</mn></mrow><mrow><mn>32' +
      '</mn></mrow></mfrac></mrow></math>';
  var speech = '12 sur 32, fin fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac066
 */
sre.ClearspeakGermanFractions.prototype.testFrac066 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mo>+</mo><mn>3</mn>' +
      '</mrow><mrow><mn>13</mn></mrow></mfrac></mrow></math>';
  var speech = 'fraction avec numérateur 2 plus 3, et dénominateur 13, fin fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac067
 */
sre.ClearspeakGermanFractions.prototype.testFrac067 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '</mrow><mn>2</mn></mfrac></mrow></math>';
  var speech = 'fraction avec numérateur x plus y, et dénominateur 2, fin fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac068
 */
sre.ClearspeakGermanFractions.prototype.testFrac068 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '</mrow><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow></mfrac></mrow>' +
      '</math>';
  var speech = 'fraction avec numérateur x plus y, et dénominateur x moins y, fin fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac069
 */
sre.ClearspeakGermanFractions.prototype.testFrac069 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '</mrow><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow></mfrac><mo>+</mo>' +
      '<mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></math>';
  var speech = 'fraction avec numérateur x plus y, et dénominateur x moins y, fin fraction, plus deux-tiers';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac070
 */
sre.ClearspeakGermanFractions.prototype.testFrac070 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mtext>miles</mtext></mrow><mrow>' +
      '<mtext>gallons</mtext></mrow></mfrac></mrow></math>';
  var speech = 'miles sur gallons';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Frac071
 */
sre.ClearspeakGermanFractions.prototype.testFrac071 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mtext>miles</mtext>' +
      '</mrow><mrow><mn>3</mn><mtext>gallons</mtext></mrow></mfrac></mrow>' +
      '</math>';
  var speech = '2 miles sur 3 gallons';
  this.executeRuleTest(mathml, speech, preference);
};


//
// Fraction (with Text in Numerator and/or denominator)
//


/**
 * Testing ClearspeakGermanFractions Example FrTxt001
 */
sre.ClearspeakGermanFractions.prototype.testFrTxt001 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mtext></mtext>' +
      '<mtext>miles</mtext></mrow><mrow><mn>3</mn><mtext></mtext>' +
      '<mtext>gallons</mtext></mrow></mfrac></mrow></math>';
  var speech = '2 miles sur 3 gallons';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example FrTxt002
 */
sre.ClearspeakGermanFractions.prototype.testFrTxt002 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mtext>rise</mtext></mrow><mrow>' +
      '<mtext>run</mtext></mrow></mfrac></mrow></math>';
  var speech = 'rise sur run';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example FrTxt003
 */
sre.ClearspeakGermanFractions.prototype.testFrTxt003 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mfrac><mtext>successful outcomes</mtext><mtext>total' +
      ' outcomes</mtext></mfrac></math>';
  var speech = 'successful outcomes sur total outcomes';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example FrTxt004
 */
sre.ClearspeakGermanFractions.prototype.testFrTxt004 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mn>6</mn><mtext>ways of rolling a' +
      ' 7</mtext></mrow><mrow><mn>36</mn><mtext>ways of rolling the pair of' +
      ' dice</mtext></mrow></mfrac></mrow></math>';
  var speech = '6 ways of rolling a 7 sur 36 ways of rolling the pair of dice';
  this.executeRuleTest(mathml, speech, preference);
};


//
// Nested Fractions
//


/**
 * Testing ClearspeakGermanFractions Example NestFrac001
 */
sre.ClearspeakGermanFractions.prototype.testNestFrac001 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mfrac><mn>1</mn><mn>2</mn>' +
      '</mfrac></mrow><mrow><mfrac><mn>1</mn><mn>3</mn></mfrac></mrow>' +
      '</mfrac></mrow></math>';
  var speech = 'un-demi sur un-tiers';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example NestFrac002
 */
sre.ClearspeakGermanFractions.prototype.testNestFrac002 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mn>1</mn><mrow><mfrac><mn>2</mn><mrow>' +
      '<mfrac><mn>1</mn><mn>3</mn></mfrac></mrow></mfrac></mrow></mfrac>' +
      '</mrow></math>';
  var speech = 'fraction avec numérateur 1, et dénominateur, 2 sur un-tiers';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example NestFrac003
 */
sre.ClearspeakGermanFractions.prototype.testNestFrac003 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mfrac><mn>1</mn><mn>2</mn>' +
      '</mfrac></mrow><mn>3</mn></mfrac></mrow></math>';
  var speech = 'un-demi sur 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example NestFrac004
 */
sre.ClearspeakGermanFractions.prototype.testNestFrac004 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mn>1</mn><mrow><mfrac><mn>2</mn><mn>3' +
      '</mn></mfrac></mrow></mfrac></mrow></math>';
  var speech = '1 sur deux-tiers';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example NestFrac005
 */
sre.ClearspeakGermanFractions.prototype.testNestFrac005 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mfrac><mrow><mn>11</mn></mrow>' +
      '<mrow><mn>32</mn></mrow></mfrac></mrow><mrow><mfrac><mrow><mn>16' +
      '</mn></mrow><mrow><mn>51</mn></mrow></mfrac></mrow></mfrac></mrow>' +
      '</math>';
  var speech = 'fraction avec numérateur, 11 sur 32, et dénominateur, 16 sur 51';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example NestFrac006
 */
sre.ClearspeakGermanFractions.prototype.testNestFrac006 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mn>11</mn></mrow><mrow><mfrac>' +
      '<mrow><mn>32</mn></mrow><mrow><mfrac><mrow><mn>16</mn></mrow><mrow>' +
      '<mn>51</mn></mrow></mfrac></mrow></mfrac></mrow></mfrac></mrow></math>';
  var speech = 'fraction avec numérateur 11, et dénominateur, fraction avec numérateur 32, et dénominateur, 16 sur 51';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example NestFrac007
 */
sre.ClearspeakGermanFractions.prototype.testNestFrac007 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mn>1</mn><mo>+</mo><mfrac><mn>4' +
      '</mn><mi>x</mi></mfrac></mrow><mn>2</mn></mfrac></mrow></math>';
  var speech = 'fraction avec numérateur 1 plus, 4 sur x, et dénominateur 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example NestFrac008
 */
sre.ClearspeakGermanFractions.prototype.testNestFrac008 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mn>3</mn><mrow><mn>2</mn><mo>+</mo>' +
      '<mfrac><mn>4</mn><mi>x</mi></mfrac></mrow></mfrac></mrow></math>';
  var speech = 'fraction avec numérateur 3, et dénominateur 2 plus, 4 sur x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example NestFrac009
 */
sre.ClearspeakGermanFractions.prototype.testNestFrac009 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mfrac><mrow><mn>10</mn></mrow>' +
      '<mrow><mn>22</mn></mrow></mfrac></mrow><mrow><mfrac><mn>1</mn><mn>2' +
      '</mn></mfrac></mrow></mfrac></mrow></math>';
  var speech = 'fraction avec numérateur, 10 sur 22, et dénominateur un-demi';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example NestFrac010
 */
sre.ClearspeakGermanFractions.prototype.testNestFrac010 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mn>1</mn><mo>+</mo><mfrac><mn>2' +
      '</mn><mn>3</mn></mfrac></mrow><mrow><mn>1</mn><mo>−</mo><mfrac><mn>2' +
      '</mn><mn>3</mn></mfrac></mrow></mfrac></mrow></math>';
  var speech = 'fraction avec numérateur 1 plus deux-tiers, et dénominateur 1 moins deux-tiers';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example NestFrac011
 */
sre.ClearspeakGermanFractions.prototype.testNestFrac011 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mn>1</mn><mo>+</mo><mfrac><mi>x' +
      '</mi><mn>2</mn></mfrac></mrow><mrow><mn>1</mn><mo>−</mo><mfrac><mi>x' +
      '</mi><mn>2</mn></mfrac></mrow></mfrac></mrow></math>';
  var speech = 'fraction avec numérateur 1 plus, x sur 2, et dénominateur 1 moins, x sur 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example NestFrac012
 */
sre.ClearspeakGermanFractions.prototype.testNestFrac012 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mfrac><mrow><mi>x</mi><mo>+</mo>' +
      '<mn>1</mn></mrow><mrow><mi>x</mi><mo>−</mo><mn>1</mn></mrow></mfrac>' +
      '<mo>+</mo><mn>1</mn></mrow><mrow><mi>x</mi><mo>+</mo><mn>1</mn>' +
      '</mrow></mfrac></mrow></math>';
  var speech = 'fraction avec numérateur, fraction avec numérateur x plus 1, et dénominateur x moins 1, plus 1, et dénominateur x plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example NestFrac013
 */
sre.ClearspeakGermanFractions.prototype.testNestFrac013 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mfrac><mrow><mi>x</mi><mo>+</mo>' +
      '<mn>1</mn></mrow><mrow><mi>x</mi><mo>−</mo><mn>4</mn></mrow></mfrac>' +
      '<mo>+</mo><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow><mrow><mi>x</mi>' +
      '<mo>+</mo><mfrac><mn>1</mn><mrow><mn>16</mn></mrow></mfrac></mrow>' +
      '</mfrac></mrow></math>';
  var speech = 'fraction avec numérateur, fraction avec numérateur x plus 1, et dénominateur x moins 4, plus un-demi, et dénominateur x plus, 1 sur 16';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example NestFrac014
 */
sre.ClearspeakGermanFractions.prototype.testNestFrac014 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mn>1</mn><mo>+</mo><mfrac><mi>x</mi><mrow>' +
      '<mn>1</mn><mo>+</mo><mfrac><mn>2</mn><mi>x</mi></mfrac></mrow>' +
      '</mfrac></mrow></math>';
  var speech = '1 plus, fraction avec numérateur x, et dénominateur 1 plus, 2 sur x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example NestFrac015
 */
sre.ClearspeakGermanFractions.prototype.testNestFrac015 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mn>1</mn><mo>+</mo><mfrac><mrow><mi>x</mi>' +
      '<mo>+</mo><mn>3</mn></mrow><mrow><mn>1</mn><mo>+</mo><mfrac><mn>2' +
      '</mn><mrow><mi>x</mi><mo>+</mo><mn>3</mn></mrow></mfrac></mrow>' +
      '</mfrac></mrow></math>';
  var speech = '1 plus, fraction avec numérateur x plus 3, et dénominateur 1 plus, fraction avec numérateur 2, et dénominateur x plus 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example NestFrac016
 */
sre.ClearspeakGermanFractions.prototype.testNestFrac016 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mn>1</mn><mo>+</mo><mfrac><mn>1</mn><mrow>' +
      '<mn>1</mn><mo>+</mo><mfrac><mn>1</mn><mrow><mn>1</mn><mo>+</mo>' +
      '<mfrac><mn>1</mn><mrow><mn>1</mn><mo>+</mo><mn>1</mn></mrow></mfrac>' +
      '</mrow></mfrac></mrow></mfrac></mrow></math>';
  var speech = '1 plus, fraction avec numérateur 1, et dénominateur 1 plus, fraction avec numérateur 1, et dénominateur 1 plus, fraction avec numérateur 1, et dénominateur 1 plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example NestFrac017
 */
sre.ClearspeakGermanFractions.prototype.testNestFrac017 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mn>1</mn><mo>+</mo><mfrac><mn>1</mn><mrow>' +
      '<mn>1</mn><mo>+</mo><mfrac><mn>1</mn><mrow><mn>1</mn><mo>+</mo>' +
      '<mfrac><mn>1</mn><mrow><mn>1</mn><mo>+</mo><mo>⋯</mo></mrow></mfrac>' +
      '</mrow></mfrac></mrow></mfrac></mrow></math>';
  var speech = '1 plus, fraction avec numérateur 1, et dénominateur 1 plus, fraction avec numérateur 1, et dénominateur 1 plus, fraction avec numérateur 1, et dénominateur 1 plus trois points médians';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example NestFrac018
 */
sre.ClearspeakGermanFractions.prototype.testNestFrac018 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><msub><mi>a</mi><mn>0</mn></msub><mo>+</mo>' +
      '<mfrac><mn>1</mn><mrow><msub><mi>a</mi><mn>1</mn></msub><mo>+</mo>' +
      '<mfrac><mn>1</mn><mrow><msub><mi>a</mi><mn>2</mn></msub><mo>+</mo>' +
      '<mfrac><mn>1</mn><mrow><msub><mi>a</mi><mn>3</mn></msub><mo>+</mo>' +
      '<mo>⋯</mo></mrow></mfrac></mrow></mfrac></mrow></mfrac></mrow></math>';
  var speech = 'a sub 0, plus, fraction avec numérateur 1, et dénominateur, a sub 1, plus, fraction avec numérateur 1, et dénominateur, a sub 2, plus, fraction avec numérateur 1, et dénominateur, a sub 3, plus trois points médians';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example NestFrac019
 */
sre.ClearspeakGermanFractions.prototype.testNestFrac019 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mfrac><mn>1</mn><mn>2</mn>' +
      '</mfrac></mrow><mrow><mfrac><mn>1</mn><mn>3</mn></mfrac></mrow>' +
      '</mfrac></mrow></math>';
  var speech = 'un-demi sur un-tiers';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example NestFrac020
 */
sre.ClearspeakGermanFractions.prototype.testNestFrac020 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mn>1</mn><mrow><mfrac><mn>2</mn><mrow>' +
      '<mfrac><mn>1</mn><mn>3</mn></mfrac></mrow></mfrac></mrow></mfrac>' +
      '</mrow></math>';
  var speech = 'fraction avec numérateur 1, et dénominateur, 2 sur un-tiers, fin fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example NestFrac021
 */
sre.ClearspeakGermanFractions.prototype.testNestFrac021 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mfrac><mn>1</mn><mn>2</mn>' +
      '</mfrac></mrow><mn>3</mn></mfrac></mrow></math>';
  var speech = 'un-demi sur 3, fin fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example NestFrac022
 */
sre.ClearspeakGermanFractions.prototype.testNestFrac022 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mn>1</mn><mrow><mfrac><mn>2</mn><mn>3' +
      '</mn></mfrac></mrow></mfrac></mrow></math>';
  var speech = '1 sur deux-tiers, fin fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example NestFrac023
 */
sre.ClearspeakGermanFractions.prototype.testNestFrac023 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mfrac><mrow><mn>11</mn></mrow>' +
      '<mrow><mn>32</mn></mrow></mfrac></mrow><mrow><mfrac><mrow><mn>16' +
      '</mn></mrow><mrow><mn>51</mn></mrow></mfrac></mrow></mfrac></mrow>' +
      '</math>';
  var speech = 'fraction avec numérateur, 11 sur 32, et dénominateur, 16 sur 51, fin fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example NestFrac024
 */
sre.ClearspeakGermanFractions.prototype.testNestFrac024 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mn>11</mn></mrow><mrow><mfrac>' +
      '<mrow><mn>32</mn></mrow><mrow><mfrac><mrow><mn>16</mn></mrow><mrow>' +
      '<mn>51</mn></mrow></mfrac></mrow></mfrac></mrow></mfrac></mrow></math>';
  var speech = 'fraction avec numérateur 11, et dénominateur, fraction avec numérateur 32, et dénominateur, 16 sur 51, fin fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example NestFrac025
 */
sre.ClearspeakGermanFractions.prototype.testNestFrac025 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mn>1</mn><mo>+</mo><mfrac><mn>4' +
      '</mn><mi>x</mi></mfrac></mrow><mn>2</mn></mfrac></mrow></math>';
  var speech = 'fraction avec numérateur 1 plus, 4 sur x, et dénominateur 2, fin fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example NestFrac026
 */
sre.ClearspeakGermanFractions.prototype.testNestFrac026 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mn>3</mn><mrow><mn>2</mn><mo>+</mo>' +
      '<mfrac><mn>4</mn><mi>x</mi></mfrac></mrow></mfrac></mrow></math>';
  var speech = 'fraction avec numérateur 3, et dénominateur 2 plus, 4 sur x, fin fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example NestFrac027
 */
sre.ClearspeakGermanFractions.prototype.testNestFrac027 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mfrac><mrow><mn>10</mn></mrow>' +
      '<mrow><mn>22</mn></mrow></mfrac></mrow><mrow><mfrac><mn>1</mn><mn>2' +
      '</mn></mfrac></mrow></mfrac></mrow></math>';
  var speech = 'fraction avec numérateur, 10 sur 22, et dénominateur un-demi, fin fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example NestFrac028
 */
sre.ClearspeakGermanFractions.prototype.testNestFrac028 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mn>1</mn><mo>+</mo><mfrac><mn>2' +
      '</mn><mn>3</mn></mfrac></mrow><mrow><mn>1</mn><mo>−</mo><mfrac><mn>2' +
      '</mn><mn>3</mn></mfrac></mrow></mfrac></mrow></math>';
  var speech = 'fraction avec numérateur 1 plus deux-tiers, et dénominateur 1 moins deux-tiers, fin fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example NestFrac029
 */
sre.ClearspeakGermanFractions.prototype.testNestFrac029 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mn>1</mn><mo>+</mo><mfrac><mi>x' +
      '</mi><mn>2</mn></mfrac></mrow><mrow><mn>1</mn><mo>−</mo><mfrac><mi>x' +
      '</mi><mn>2</mn></mfrac></mrow></mfrac></mrow></math>';
  var speech = 'fraction avec numérateur 1 plus, x sur 2, et dénominateur 1 moins, x sur 2, fin fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example NestFrac030
 */
sre.ClearspeakGermanFractions.prototype.testNestFrac030 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mfrac><mrow><mi>x</mi><mo>+</mo>' +
      '<mn>1</mn></mrow><mrow><mi>x</mi><mo>−</mo><mn>1</mn></mrow></mfrac>' +
      '<mo>+</mo><mn>1</mn></mrow><mrow><mi>x</mi><mo>+</mo><mn>1</mn>' +
      '</mrow></mfrac></mrow></math>';
  var speech = 'fraction avec numérateur, fraction avec numérateur x plus 1, et dénominateur x moins 1, plus 1, et dénominateur x plus 1, fin fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example NestFrac031
 */
sre.ClearspeakGermanFractions.prototype.testNestFrac031 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mfrac><mrow><mi>x</mi><mo>+</mo>' +
      '<mn>1</mn></mrow><mrow><mi>x</mi><mo>−</mo><mn>4</mn></mrow></mfrac>' +
      '<mo>+</mo><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow><mrow><mi>x</mi>' +
      '<mo>+</mo><mfrac><mn>1</mn><mrow><mn>16</mn></mrow></mfrac></mrow>' +
      '</mfrac></mrow></math>';
  var speech = 'fraction avec numérateur, fraction avec numérateur x plus 1, et dénominateur x moins 4, plus un-demi, et dénominateur x plus, 1 sur 16, fin fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example NestFrac032
 */
sre.ClearspeakGermanFractions.prototype.testNestFrac032 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mn>1</mn><mo>+</mo><mfrac><mi>x</mi><mrow>' +
      '<mn>1</mn><mo>+</mo><mfrac><mn>2</mn><mi>x</mi></mfrac></mrow>' +
      '</mfrac></mrow></math>';
  var speech = '1 plus, fraction avec numérateur x, et dénominateur 1 plus, 2 sur x, fin fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example NestFrac033
 */
sre.ClearspeakGermanFractions.prototype.testNestFrac033 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mn>1</mn><mo>+</mo><mfrac><mrow><mi>x</mi>' +
      '<mo>+</mo><mn>3</mn></mrow><mrow><mn>1</mn><mo>+</mo><mfrac><mn>2' +
      '</mn><mrow><mi>x</mi><mo>+</mo><mn>3</mn></mrow></mfrac></mrow>' +
      '</mfrac></mrow></math>';
  var speech = '1 plus, fraction avec numérateur x plus 3, et dénominateur 1 plus, fraction avec numérateur 2, et dénominateur x plus 3, fin fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example NestFrac034
 */
sre.ClearspeakGermanFractions.prototype.testNestFrac034 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mn>1</mn><mo>+</mo><mfrac><mn>1</mn><mrow>' +
      '<mn>1</mn><mo>+</mo><mfrac><mn>1</mn><mrow><mn>1</mn><mo>+</mo>' +
      '<mfrac><mn>1</mn><mrow><mn>1</mn><mo>+</mo><mn>1</mn></mrow></mfrac>' +
      '</mrow></mfrac></mrow></mfrac></mrow></math>';
  var speech = '1 plus, fraction avec numérateur 1, et dénominateur 1 plus, fraction avec numérateur 1, et dénominateur 1 plus, fraction avec numérateur 1, et dénominateur 1 plus 1, fin fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example NestFrac035
 */
sre.ClearspeakGermanFractions.prototype.testNestFrac035 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mn>1</mn><mo>+</mo><mfrac><mn>1</mn><mrow>' +
      '<mn>1</mn><mo>+</mo><mfrac><mn>1</mn><mrow><mn>1</mn><mo>+</mo>' +
      '<mfrac><mn>1</mn><mrow><mn>1</mn><mo>+</mo><mo>⋯</mo></mrow></mfrac>' +
      '</mrow></mfrac></mrow></mfrac></mrow></math>';
  var speech = '1 plus, fraction avec numérateur 1, et dénominateur 1 plus, fraction avec numérateur 1, et dénominateur 1 plus, fraction avec numérateur 1, et dénominateur 1 plus trois points médians, fin fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example NestFrac036
 */
sre.ClearspeakGermanFractions.prototype.testNestFrac036 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><msub><mi>a</mi><mn>0</mn></msub><mo>+</mo>' +
      '<mfrac><mn>1</mn><mrow><msub><mi>a</mi><mn>1</mn></msub><mo>+</mo>' +
      '<mfrac><mn>1</mn><mrow><msub><mi>a</mi><mn>2</mn></msub><mo>+</mo>' +
      '<mfrac><mn>1</mn><mrow><msub><mi>a</mi><mn>3</mn></msub><mo>+</mo>' +
      '<mo>⋯</mo></mrow></mfrac></mrow></mfrac></mrow></mfrac></mrow></math>';
  var speech = 'a sub 0, plus, fraction avec numérateur 1, et dénominateur, a sub 1, plus, fraction avec numérateur 1, et dénominateur, a sub 2, plus, fraction avec numérateur 1, et dénominateur, a sub 3, plus trois points médians, fin fraction';
  this.executeRuleTest(mathml, speech, preference);
};


//
// Fractions with Functions
//


/**
 * Testing ClearspeakGermanFractions Example Fracfunct001
 */
sre.ClearspeakGermanFractions.prototype.testFracfunct001 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>f</mi><mrow><mo>(</mo><mi>x' +
      '</mi><mo>)</mo></mrow></mrow><mrow><mi>g</mi><mrow><mo>(</mo><mi>x' +
      '</mi><mo>)</mo></mrow></mrow></mfrac></mrow></math>';
  var speech = 'f de x, sur g de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Fracfunct002
 */
sre.ClearspeakGermanFractions.prototype.testFracfunct002 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>f</mi><mrow><mo>(</mo><mi>x' +
      '</mi><mo>)</mo></mrow><mo>+</mo><mi>g</mi><mrow><mo>(</mo><mi>x</mi>' +
      '<mo>)</mo></mrow></mrow><mrow><mi>g</mi><mrow><mo>(</mo><mi>x</mi>' +
      '<mo>)</mo></mrow></mrow></mfrac></mrow></math>';
  var speech = 'fraction avec numérateur f de x, plus g de x, et dénominateur g de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Fracfunct003
 */
sre.ClearspeakGermanFractions.prototype.testFracfunct003 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>f</mi><mrow><mo>(</mo><mrow>' +
      '<mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow><mrow>' +
      '<mi>g</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></mfrac>' +
      '</mrow></math>';
  var speech = 'fraction avec numérateur f de, parenthèse gauche, x plus 1, parenthèse droite, et dénominateur g de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Fracfunct004
 */
sre.ClearspeakGermanFractions.prototype.testFracfunct004 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>f</mi><mrow><mo>(</mo><mi>x' +
      '</mi><mo>)</mo></mrow></mrow><mn>2</mn></mfrac></mrow></math>';
  var speech = 'f de x, sur 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Fracfunct005
 */
sre.ClearspeakGermanFractions.prototype.testFracfunct005 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mn>2</mn><mrow><mi>f</mi><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></mfrac></mrow></math>';
  var speech = '2 sur f de x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Fracfunct006
 */
sre.ClearspeakGermanFractions.prototype.testFracfunct006 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mn>2</mn><mrow><mi>g</mi><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow><mo>+</mo><mi>g</mi><mo' +
      ' stretchy="false">(</mo><mi>x</mi><mo>+</mo><mn>1</mn><mo' +
      ' stretchy="false">)</mo></mrow></mfrac></mrow></math>';
  var speech = 'fraction avec numérateur 2, et dénominateur g de x, plus g de, parenthèse gauche, x plus 1, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Fracfunct007
 */
sre.ClearspeakGermanFractions.prototype.testFracfunct007 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>sin</mi><mi>x</mi></mrow>' +
      '<mrow><mi>cos</mi><mi>x</mi></mrow></mfrac></mrow></math>';
  var speech = 'sinus x sur cosinus x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Fracfunct008
 *
 * This is the same as 011. Mistake in Examples file.
 */
sre.ClearspeakGermanFractions.prototype.untestFracfunct008 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>sin</mi><mo>(</mo><mi>x</mi>' +
      '<mo>+</mo><mi>y</mi><mo>)</mo></mrow><mrow><mi>cos</mi><mo>(</mo>' +
      '<mi>x</mi><mo>+</mo><mi>y</mi><mo>)</mo></mrow></mfrac></mrow></math>';
  var speech = 'XXXX';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Fracfunct009
 */
sre.ClearspeakGermanFractions.prototype.testFracfunct009 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>sin</mi><mi>x</mi><mo>+</mo>' +
      '<mi>cos</mi><mi>x</mi></mrow><mrow><mi>cos</mi><mi>x</mi></mrow>' +
      '</mfrac></mrow></math>';
  var speech = 'fraction avec numérateur sinus x plus cosinus x, et dénominateur cosinus x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Fracfunct010
 */
sre.ClearspeakGermanFractions.prototype.testFracfunct010 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>sin</mi><mn>2</mn><mi>x</mi>' +
      '</mrow><mrow><mi>cos</mi><mn>3</mn><mi>x</mi></mrow></mfrac></mrow>' +
      '</math>';
  var speech = 'sinus 2 x sur cosinus 3 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Fracfunct011
 */
sre.ClearspeakGermanFractions.prototype.testFracfunct011 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>sin</mi><mrow><mo>(</mo><mrow>' +
      '<mi>x</mi><mo>+</mo><mi>y</mi></mrow><mo>)</mo></mrow></mrow><mrow>' +
      '<mi>cos</mi><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '</mrow><mo>)</mo></mrow></mrow></mfrac></mrow></math>';
  var speech = 'fraction avec numérateur, sinus de, parenthèse gauche, x plus y, parenthèse droite, et dénominateur, cosinus de, parenthèse gauche, x plus y, parenthèse droite';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Fracfunct012
 */
sre.ClearspeakGermanFractions.prototype.testFracfunct012 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>f</mi><mrow><mo>(</mo><mrow>' +
      '<mn>2</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow><mrow><mi>g</mi>' +
      '<mrow><mo>(</mo><mrow><mn>3</mn><mi>x</mi></mrow><mo>)</mo></mrow>' +
      '</mrow></mfrac></mrow></math>';
  var speech = 'f de 2 x, sur g de 3 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Fracfunct013
 */
sre.ClearspeakGermanFractions.prototype.testFracfunct013 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>log</mi><mi>x</mi></mrow>' +
      '<mrow><mi>log</mi><mi>y</mi></mrow></mfrac></mrow></math>';
  var speech = 'log x sur log y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Fracfunct014
 */
sre.ClearspeakGermanFractions.prototype.testFracfunct014 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>log</mi><mn>2</mn><mi>x</mi>' +
      '</mrow><mrow><mi>log</mi><mn>3</mn><mi>y</mi></mrow></mfrac></mrow>' +
      '</math>';
  var speech = 'log 2 x sur log 3 y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Fracfunct015
 */
sre.ClearspeakGermanFractions.prototype.testFracfunct015 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><msub><mrow><mi>log</mi></mrow>' +
      '<mrow><mn>10</mn></mrow></msub><mi>x</mi></mrow><mrow><msub><mrow>' +
      '<mi>log</mi></mrow><mn>5</mn></msub><mi>y</mi></mrow></mfrac></mrow>' +
      '</math>';
  var speech = 'log base 10 de, x, sur, log base 5 de, y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Fracfunct016
 */
sre.ClearspeakGermanFractions.prototype.testFracfunct016 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><msub><mrow><mi>log</mi></mrow>' +
      '<mrow><mn>10</mn></mrow></msub><mn>2</mn><mi>x</mi></mrow><mrow>' +
      '<msub><mrow><mi>log</mi></mrow><mn>5</mn></msub><mn>3</mn><mi>y</mi>' +
      '</mrow></mfrac></mrow></math>';
  var speech = 'log base 10 de, 2 x, sur, log base 5 de, 3 y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Fracfunct017
 */
sre.ClearspeakGermanFractions.prototype.testFracfunct017 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>log</mi><mrow><mo>(</mo><mrow>' +
      '<mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow><mrow>' +
      '<mi>log</mi><mi>y</mi></mrow></mfrac></mrow></math>';
  var speech = 'fraction avec numérateur, log de, parenthèse gauche, x plus 1, parenthèse droite, et dénominateur log y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanFractions Example Fracfunct018
 */
sre.ClearspeakGermanFractions.prototype.testFracfunct018 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><msub><mi>f</mi><mn>1</mn></msub>' +
      '<mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mrow><msub><mi>g' +
      '</mi><mn>1</mn></msub><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow>' +
      '</mrow></mfrac></mrow></math>';
  var speech = 'f sub 1, de x, sur, g sub 1, de x';
  this.executeRuleTest(mathml, speech, preference);
};

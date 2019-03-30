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


goog.provide('sre.ClearspeakEnglishFractions');

goog.require('sre.ClearspeakEnglishRuleTest');



/**
* @constructor
* @extends {sre.ClearspeakEnglishRuleTest}
*/
sre.ClearspeakEnglishFractions = function() {
  sre.ClearspeakEnglishFractions.base(this, 'constructor');

  /**
* @override
  */
  this.information = 'ClearspeakEnglishFractions rule tests.';

};
goog.inherits(sre.ClearspeakEnglishFractions, sre.ClearspeakEnglishRuleTest);



//
// Fractions
//


/**
 * Testing ClearspeakEnglishFractions Example Frac001
 */
sre.ClearspeakEnglishFractions.prototype.testFrac001 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></math>';
  var speech = 'one half';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac002
 */
sre.ClearspeakEnglishFractions.prototype.testFrac002 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mn>12</mn></mrow><mrow><mn>32' +
      '</mn></mrow></mfrac></mrow></math>';
  var speech = '12 over 32';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac002a
 */
sre.ClearspeakEnglishFractions.prototype.testFrac002a = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mi>x</mi><mi>y</mi></mfrac></mrow></math>';
  var speech = 'x over y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac002b
 */
sre.ClearspeakEnglishFractions.prototype.testFrac002b = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mi>x</mi></mrow><mrow>' +
      '<mn>3</mn><mi>y</mi></mrow></mfrac></mrow></math>';
  var speech = '2 x over 3 y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac002c
 */
sre.ClearspeakEnglishFractions.prototype.testFrac002c = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mi>y</mi></mrow><mrow>' +
      '<mi>c</mi><mi>d</mi></mrow></mfrac></mrow></math>';
  var speech = 'x y over c d';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac002d
 */
sre.ClearspeakEnglishFractions.prototype.testFrac002d = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mfrac><mn>1</mn><mn>2</mn>' +
      '</mfrac></mrow><mrow><mfrac><mn>1</mn><mn>3</mn></mfrac></mrow>' +
      '</mfrac></mrow></math>';
  var speech = 'one half over one third';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac002e
 */
sre.ClearspeakEnglishFractions.prototype.testFrac002e = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mo>−</mo><mi>x</mi></mrow><mi>y' +
      '</mi></mfrac></mrow></math>';
  var speech = 'negative x over y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac002f
 */
sre.ClearspeakEnglishFractions.prototype.testFrac002f = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mo>−</mo><mn>2</mn><mi>x</mi>' +
      '</mrow><mrow><mn>3</mn><mi>y</mi></mrow></mfrac></mrow></math>';
  var speech = 'negative 2 x over 3 y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac002g
 */
sre.ClearspeakEnglishFractions.prototype.testFrac002g = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mi>y</mi></mrow><mrow>' +
      '<mo>−</mo><mi>c</mi><mi>d</mi></mrow></mfrac></mrow></math>';
  var speech = 'x y over negative c d';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac002h
 */
sre.ClearspeakEnglishFractions.prototype.testFrac002h = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mfrac><mn>1</mn><mn>2</mn>' +
      '</mfrac></mrow><mrow><mo>−</mo><mfrac><mn>1</mn><mn>3</mn></mfrac>' +
      '</mrow></mfrac></mrow></math>';
  var speech = 'one half over negative one third';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac003
 */
sre.ClearspeakEnglishFractions.prototype.testFrac003 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mo>+</mo><mn>3</mn>' +
      '</mrow><mrow><mn>13</mn></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator 2 plus 3, and denominator 13';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac004
 */
sre.ClearspeakEnglishFractions.prototype.testFrac004 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '</mrow><mn>2</mn></mfrac></mrow></math>';
  var speech = 'the fraction with numerator x plus y, and denominator 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac005
 */
sre.ClearspeakEnglishFractions.prototype.testFrac005 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '</mrow><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow></mfrac></mrow>' +
      '</math>';
  var speech = 'the fraction with numerator x plus y, and denominator x' +
      ' minus y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac006
 */
sre.ClearspeakEnglishFractions.prototype.testFrac006 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '</mrow><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow></mfrac><mo>+</mo>' +
      '<mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></math>';
  var speech = 'the fraction with numerator x plus y, and denominator x' +
      ' minus y, plus two thirds';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac007
 */
sre.ClearspeakEnglishFractions.prototype.testFrac007 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mtext>miles</mtext></mrow><mrow>' +
      '<mtext>gallon</mtext></mrow></mfrac></mrow></math>';
  var speech = 'miles over gallon';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac008
 */
sre.ClearspeakEnglishFractions.prototype.testFrac008 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mtext>miles</mtext>' +
      '</mrow><mrow><mn>3</mn><mtext>gallons</mtext></mrow></mfrac></mrow>' +
      '</math>';
  var speech = '2 miles over 3 gallons';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac009
 */
sre.ClearspeakEnglishFractions.prototype.testFrac009 = function() {
  var preference = 'Fraction_Over';
  var mathml = '<math><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></math>';
  var speech = '1 over 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac010
 */
sre.ClearspeakEnglishFractions.prototype.testFrac010 = function() {
  var preference = 'Fraction_Over';
  var mathml = '<math><mrow><mfrac><mrow><mn>12</mn></mrow><mrow><mn>32' +
      '</mn></mrow></mfrac></mrow></math>';
  var speech = '12 over 32';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac011
 */
sre.ClearspeakEnglishFractions.prototype.testFrac011 = function() {
  var preference = 'Fraction_Over';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mo>+</mo><mn>3</mn>' +
      '</mrow><mrow><mn>13</mn></mrow></mfrac></mrow></math>';
  var speech = '2 plus 3 over 13';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac012
 */
sre.ClearspeakEnglishFractions.prototype.testFrac012 = function() {
  var preference = 'Fraction_Over';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '</mrow><mn>2</mn></mfrac></mrow></math>';
  var speech = 'x plus y over 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac013
 */
sre.ClearspeakEnglishFractions.prototype.testFrac013 = function() {
  var preference = 'Fraction_Over';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '</mrow><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow></mfrac></mrow>' +
      '</math>';
  var speech = 'x plus y over x minus y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac014
 */
sre.ClearspeakEnglishFractions.prototype.testFrac014 = function() {
  var preference = 'Fraction_Over';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '</mrow><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow></mfrac><mo>+</mo>' +
      '<mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></math>';
  var speech = 'x plus y over x minus y, plus, 2 over 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac015
 */
sre.ClearspeakEnglishFractions.prototype.testFrac015 = function() {
  var preference = 'Fraction_Over';
  var mathml = '<math><mrow><mfrac><mrow><mtext>miles</mtext></mrow><mrow>' +
      '<mtext>gallon</mtext></mrow></mfrac></mrow></math>';
  var speech = 'miles over gallon';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac016
 */
sre.ClearspeakEnglishFractions.prototype.testFrac016 = function() {
  var preference = 'Fraction_Over';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mtext>miles</mtext>' +
      '</mrow><mrow><mn>3</mn><mtext>gallons</mtext></mrow></mfrac></mrow>' +
      '</math>';
  var speech = '2 miles over 3 gallons';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac017
 */
sre.ClearspeakEnglishFractions.prototype.testFrac017 = function() {
  var preference = 'Fraction_OverEndFrac';
  var mathml = '<math><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></math>';
  var speech = '1 over 2, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac018
 */
sre.ClearspeakEnglishFractions.prototype.testFrac018 = function() {
  var preference = 'Fraction_OverEndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mn>12</mn></mrow><mrow><mn>32' +
      '</mn></mrow></mfrac></mrow></math>';
  var speech = '12 over 32, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac019
 */
sre.ClearspeakEnglishFractions.prototype.testFrac019 = function() {
  var preference = 'Fraction_OverEndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mo>+</mo><mn>3</mn>' +
      '</mrow><mrow><mn>13</mn></mrow></mfrac></mrow></math>';
  var speech = '2 plus 3 over 13, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac020
 */
sre.ClearspeakEnglishFractions.prototype.testFrac020 = function() {
  var preference = 'Fraction_OverEndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '</mrow><mn>2</mn></mfrac></mrow></math>';
  var speech = 'x plus y over 2, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac021
 */
sre.ClearspeakEnglishFractions.prototype.testFrac021 = function() {
  var preference = 'Fraction_OverEndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '</mrow><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow></mfrac></mrow>' +
      '</math>';
  var speech = 'x plus y over x minus y, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac022
 */
sre.ClearspeakEnglishFractions.prototype.testFrac022 = function() {
  var preference = 'Fraction_OverEndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '</mrow><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow></mfrac><mo>+</mo>' +
      '<mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></math>';
  var speech = 'x plus y over x minus y, end fraction, plus, 2 over 3, end' +
      ' fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac023
 */
sre.ClearspeakEnglishFractions.prototype.testFrac023 = function() {
  var preference = 'Fraction_OverEndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mtext>miles</mtext></mrow><mrow>' +
      '<mtext>gallons</mtext></mrow></mfrac></mrow></math>';
  var speech = 'miles over gallons, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac024
 */
sre.ClearspeakEnglishFractions.prototype.testFrac024 = function() {
  var preference = 'Fraction_OverEndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mtext>miles</mtext>' +
      '</mrow><mrow><mn>3</mn><mtext>gallons</mtext></mrow></mfrac></mrow>' +
      '</math>';
  var speech = '2 miles over 3 gallons, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac025
 */
sre.ClearspeakEnglishFractions.prototype.testFrac025 = function() {
  var preference = 'Fraction_GeneralEndFrac';
  var mathml = '<math><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></math>';
  var speech = 'the fraction with numerator 1, and denominator 2, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac026
 */
sre.ClearspeakEnglishFractions.prototype.testFrac026 = function() {
  var preference = 'Fraction_GeneralEndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mn>12</mn></mrow><mrow><mn>32' +
      '</mn></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator 12, and denominator 32, end' +
      ' fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac027
 */
sre.ClearspeakEnglishFractions.prototype.testFrac027 = function() {
  var preference = 'Fraction_GeneralEndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mo>+</mo><mn>3</mn>' +
      '</mrow><mrow><mn>13</mn></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator 2 plus 3, and denominator 13,' +
      ' end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac028
 */
sre.ClearspeakEnglishFractions.prototype.testFrac028 = function() {
  var preference = 'Fraction_GeneralEndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '</mrow><mn>2</mn></mfrac></mrow></math>';
  var speech = 'the fraction with numerator x plus y, and denominator 2,' +
      ' end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac029
 */
sre.ClearspeakEnglishFractions.prototype.testFrac029 = function() {
  var preference = 'Fraction_GeneralEndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '</mrow><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow></mfrac></mrow>' +
      '</math>';
  var speech = 'the fraction with numerator x plus y, and denominator x' +
      ' minus y, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac030
 */
sre.ClearspeakEnglishFractions.prototype.testFrac030 = function() {
  var preference = 'Fraction_GeneralEndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '</mrow><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow></mfrac><mo>+</mo>' +
      '<mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></math>';
  var speech = 'the fraction with numerator x plus y, and denominator x' +
      ' minus y, end fraction, plus, the fraction with numerator 2, and' +
      ' denominator 3, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac031
 */
sre.ClearspeakEnglishFractions.prototype.testFrac031 = function() {
  var preference = 'Fraction_GeneralEndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mtext>miles</mtext></mrow><mrow>' +
      '<mtext>gallon</mtext></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator miles, and denominator gallon,' +
      ' end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac032
 */
sre.ClearspeakEnglishFractions.prototype.testFrac032 = function() {
  var preference = 'Fraction_General';
  var mathml = '<math><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></math>';
  var speech = 'the fraction with numerator 1, and denominator 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac033
 */
sre.ClearspeakEnglishFractions.prototype.testFrac033 = function() {
  var preference = 'Fraction_General';
  var mathml = '<math><mrow><mfrac><mrow><mn>12</mn></mrow><mrow><mn>32' +
      '</mn></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator 12, and denominator 32';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac034
 */
sre.ClearspeakEnglishFractions.prototype.testFrac034 = function() {
  var preference = 'Fraction_General';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mo>+</mo><mn>3</mn>' +
      '</mrow><mrow><mn>13</mn></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator 2 plus 3, and denominator 13';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac035
 */
sre.ClearspeakEnglishFractions.prototype.testFrac035 = function() {
  var preference = 'Fraction_General';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '</mrow><mn>2</mn></mfrac></mrow></math>';
  var speech = 'the fraction with numerator x plus y, and denominator 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac036
 */
sre.ClearspeakEnglishFractions.prototype.testFrac036 = function() {
  var preference = 'Fraction_General';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '</mrow><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow></mfrac></mrow>' +
      '</math>';
  var speech = 'the fraction with numerator x plus y, and denominator x' +
      ' minus y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac037
 */
sre.ClearspeakEnglishFractions.prototype.testFrac037 = function() {
  var preference = 'Fraction_General';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '</mrow><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow></mfrac><mo>+</mo>' +
      '<mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></math>';
  var speech = 'the fraction with numerator x plus y, and denominator x' +
      ' minus y, plus, the fraction with numerator 2, and denominator 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac038
 */
sre.ClearspeakEnglishFractions.prototype.testFrac038 = function() {
  var preference = 'Fraction_General';
  var mathml = '<math><mrow><mfrac><mrow><mtext>miles</mtext></mrow><mrow>' +
      '<mtext>gallon</mtext></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator miles, and denominator gallon';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac039
 */
sre.ClearspeakEnglishFractions.prototype.testFrac039 = function() {
  var preference = 'Fraction_General';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mtext>miles</mtext>' +
      '</mrow><mrow><mn>3</mn><mtext>gallons</mtext></mrow></mfrac></mrow>' +
      '</math>';
  var speech = 'the fraction with numerator 2 miles, and denominator 3 gallons';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac040
 */
sre.ClearspeakEnglishFractions.prototype.testFrac040 = function() {
  var preference = 'Fraction_FracOver';
  var mathml = '<math><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></math>';
  var speech = 'the fraction 1 over 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac041
 */
sre.ClearspeakEnglishFractions.prototype.testFrac041 = function() {
  var preference = 'Fraction_FracOver';
  var mathml = '<math><mrow><mfrac><mrow><mn>12</mn></mrow><mrow><mn>32' +
      '</mn></mrow></mfrac></mrow></math>';
  var speech = 'the fraction 12 over 32';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac042
 */
sre.ClearspeakEnglishFractions.prototype.testFrac042 = function() {
  var preference = 'Fraction_FracOver';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mo>+</mo><mn>3</mn>' +
      '</mrow><mrow><mn>13</mn></mrow></mfrac></mrow></math>';
  var speech = 'the fraction 2 plus 3 over 13';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac043
 */
sre.ClearspeakEnglishFractions.prototype.testFrac043 = function() {
  var preference = 'Fraction_FracOver';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '</mrow><mn>2</mn></mfrac></mrow></math>';
  var speech = 'the fraction x plus y over 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac044
 */
sre.ClearspeakEnglishFractions.prototype.testFrac044 = function() {
  var preference = 'Fraction_FracOver';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '</mrow><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow></mfrac></mrow>' +
      '</math>';
  var speech = 'the fraction x plus y over x minus y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac045
 */
sre.ClearspeakEnglishFractions.prototype.testFrac045 = function() {
  var preference = 'Fraction_FracOver';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '</mrow><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow></mfrac><mo>+</mo>' +
      '<mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></math>';
  var speech = 'the fraction x plus y over x minus y, plus, the fraction 2' +
      ' over 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac046
 */
sre.ClearspeakEnglishFractions.prototype.testFrac046 = function() {
  var preference = 'Fraction_FracOver';
  var mathml = '<math><mrow><mfrac><mrow><mtext>miles</mtext></mrow><mrow>' +
      '<mtext>gallon</mtext></mrow></mfrac></mrow></math>';
  var speech = 'the fraction miles over gallon';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac047
 */
sre.ClearspeakEnglishFractions.prototype.testFrac047 = function() {
  var preference = 'Fraction_FracOver';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mtext>miles</mtext>' +
      '</mrow><mrow><mn>3</mn><mtext>gallons</mtext></mrow></mfrac></mrow>' +
      '</math>';
  var speech = 'the fraction 2 miles over 3 gallons';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac048
 */
sre.ClearspeakEnglishFractions.prototype.testFrac048 = function() {
  var preference = 'Fraction_Per';
  var mathml = '<math><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></math>';
  var speech = '1 per 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac049
 */
sre.ClearspeakEnglishFractions.prototype.testFrac049 = function() {
  var preference = 'Fraction_Per';
  var mathml = '<math><mrow><mfrac><mrow><mn>12</mn></mrow><mrow><mn>32' +
      '</mn></mrow></mfrac></mrow></math>';
  var speech = '12 per 32';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac050
 */
sre.ClearspeakEnglishFractions.prototype.testFrac050 = function() {
  var preference = 'Fraction_Per';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mo>+</mo><mn>3</mn>' +
      '</mrow><mrow><mn>13</mn></mrow></mfrac></mrow></math>';
  var speech = '2 plus 3 per 13';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac051
 */
sre.ClearspeakEnglishFractions.prototype.testFrac051 = function() {
  var preference = 'Fraction_Per';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '</mrow><mn>2</mn></mfrac></mrow></math>';
  var speech = 'x plus y per 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac052
 */
sre.ClearspeakEnglishFractions.prototype.testFrac052 = function() {
  var preference = 'Fraction_Per';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '</mrow><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow></mfrac></mrow>' +
      '</math>';
  var speech = 'x plus y per x minus y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac053
 */
sre.ClearspeakEnglishFractions.prototype.testFrac053 = function() {
  var preference = 'Fraction_Per';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '</mrow><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow></mfrac><mo>+</mo>' +
      '<mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></math>';
  var speech = 'x plus y per x minus y, plus, 2 per 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac054
 */
sre.ClearspeakEnglishFractions.prototype.testFrac054 = function() {
  var preference = 'Fraction_Per';
  var mathml = '<math><mrow><mfrac><mrow><mtext>miles</mtext></mrow><mrow>' +
      '<mtext>gallon</mtext></mrow></mfrac></mrow></math>';
  var speech = 'miles per gallon';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac055
 */
sre.ClearspeakEnglishFractions.prototype.testFrac055 = function() {
  var preference = 'Fraction_Per';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mtext>miles</mtext>' +
      '</mrow><mrow><mn>3</mn><mtext>gallons</mtext></mrow></mfrac></mrow>' +
      '</math>';
  var speech = '2 miles per 3 gallons';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac056
 */
sre.ClearspeakEnglishFractions.prototype.testFrac056 = function() {
  var preference = 'Fraction_Ordinal';
  var mathml = '<math><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></math>';
  var speech = 'one half';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac057
 */
sre.ClearspeakEnglishFractions.prototype.testFrac057 = function() {
  var preference = 'Fraction_Ordinal';
  var mathml = '<math><mrow><mfrac><mrow><mn>12</mn></mrow><mrow><mn>32' +
      '</mn></mrow></mfrac></mrow></math>';
  var speech = 'twelve thirty-seconds';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac058
 */
sre.ClearspeakEnglishFractions.prototype.testFrac058 = function() {
  var preference = 'Fraction_Ordinal';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mo>+</mo><mn>3</mn>' +
      '</mrow><mrow><mn>13</mn></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator 2 plus 3, and denominator 13';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac059
 */
sre.ClearspeakEnglishFractions.prototype.testFrac059 = function() {
  var preference = 'Fraction_Ordinal';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '</mrow><mn>2</mn></mfrac></mrow></math>';
  var speech = 'the fraction with numerator x plus y, and denominator 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac060
 */
sre.ClearspeakEnglishFractions.prototype.testFrac060 = function() {
  var preference = 'Fraction_Ordinal';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '</mrow><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow></mfrac></mrow>' +
      '</math>';
  var speech = 'the fraction with numerator x plus y, and denominator x' +
      ' minus y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac061
 */
sre.ClearspeakEnglishFractions.prototype.testFrac061 = function() {
  var preference = 'Fraction_Ordinal';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '</mrow><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow></mfrac><mo>+</mo>' +
      '<mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></math>';
  var speech = 'the fraction with numerator x plus y, and denominator x' +
      ' minus y, plus two thirds';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac062
 */
sre.ClearspeakEnglishFractions.prototype.testFrac062 = function() {
  var preference = 'Fraction_Ordinal';
  var mathml = '<math><mrow><mfrac><mrow><mtext>miles</mtext></mrow><mrow>' +
      '<mtext>gallon</mtext></mrow></mfrac></mrow></math>';
  var speech = 'miles over gallon';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac063
 */
sre.ClearspeakEnglishFractions.prototype.testFrac063 = function() {
  var preference = 'Fraction_Ordinal';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mtext>miles</mtext>' +
      '</mrow><mrow><mn>3</mn><mtext>gallons</mtext></mrow></mfrac></mrow>' +
      '</math>';
  var speech = '2 miles over 3 gallons';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac064
 */
sre.ClearspeakEnglishFractions.prototype.testFrac064 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow></math>';
  var speech = 'one half';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac065
 */
sre.ClearspeakEnglishFractions.prototype.testFrac065 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mn>12</mn></mrow><mrow><mn>32' +
      '</mn></mrow></mfrac></mrow></math>';
  var speech = '12 over 32, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac066
 */
sre.ClearspeakEnglishFractions.prototype.testFrac066 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mo>+</mo><mn>3</mn>' +
      '</mrow><mrow><mn>13</mn></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator 2 plus 3, and denominator 13,' +
      ' end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac067
 */
sre.ClearspeakEnglishFractions.prototype.testFrac067 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '</mrow><mn>2</mn></mfrac></mrow></math>';
  var speech = 'the fraction with numerator x plus y, and denominator 2,' +
      ' end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac068
 */
sre.ClearspeakEnglishFractions.prototype.testFrac068 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '</mrow><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow></mfrac></mrow>' +
      '</math>';
  var speech = 'the fraction with numerator x plus y, and denominator x' +
      ' minus y, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac069
 */
sre.ClearspeakEnglishFractions.prototype.testFrac069 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '</mrow><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow></mfrac><mo>+</mo>' +
      '<mfrac><mn>2</mn><mn>3</mn></mfrac></mrow></math>';
  var speech = 'the fraction with numerator x plus y, and denominator x' +
      ' minus y, end fraction, plus two thirds';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac070
 */
sre.ClearspeakEnglishFractions.prototype.testFrac070 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mtext>miles</mtext></mrow><mrow>' +
      '<mtext>gallons</mtext></mrow></mfrac></mrow></math>';
  var speech = 'miles over gallons';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Frac071
 */
sre.ClearspeakEnglishFractions.prototype.testFrac071 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mtext>miles</mtext>' +
      '</mrow><mrow><mn>3</mn><mtext>gallons</mtext></mrow></mfrac></mrow>' +
      '</math>';
  var speech = '2 miles over 3 gallons';
  this.executeRuleTest(mathml, speech, preference);
};


//
// Fraction (with Text in Numerator and/or denominator)
//


/**
 * Testing ClearspeakEnglishFractions Example FrTxt001
 */
sre.ClearspeakEnglishFractions.prototype.testFrTxt001 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mn>2</mn><mtext></mtext>' +
      '<mtext>miles</mtext></mrow><mrow><mn>3</mn><mtext></mtext>' +
      '<mtext>gallons</mtext></mrow></mfrac></mrow></math>';
  var speech = '2 miles over 3 gallons';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example FrTxt002
 */
sre.ClearspeakEnglishFractions.prototype.testFrTxt002 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mtext>rise</mtext></mrow><mrow>' +
      '<mtext>run</mtext></mrow></mfrac></mrow></math>';
  var speech = 'rise over run';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example FrTxt003
 */
sre.ClearspeakEnglishFractions.prototype.testFrTxt003 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mfrac><mtext>successful outcomes</mtext><mtext>total' +
      ' outcomes</mtext></mfrac></math>';
  var speech = 'successful outcomes over total outcomes';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example FrTxt004
 */
sre.ClearspeakEnglishFractions.prototype.testFrTxt004 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mn>6</mn><mtext>ways of rolling a' +
      ' 7</mtext></mrow><mrow><mn>36</mn><mtext>ways of rolling the pair of' +
      ' dice</mtext></mrow></mfrac></mrow></math>';
  var speech = '6 ways of rolling a 7 over 36 ways of rolling the pair of dice';
  this.executeRuleTest(mathml, speech, preference);
};


//
// Nested Fractions
//


/**
 * Testing ClearspeakEnglishFractions Example NestFrac001
 */
sre.ClearspeakEnglishFractions.prototype.testNestFrac001 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mfrac><mn>1</mn><mn>2</mn>' +
      '</mfrac></mrow><mrow><mfrac><mn>1</mn><mn>3</mn></mfrac></mrow>' +
      '</mfrac></mrow></math>';
  var speech = 'one half over one third';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example NestFrac002
 */
sre.ClearspeakEnglishFractions.prototype.testNestFrac002 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mn>1</mn><mrow><mfrac><mn>2</mn><mrow>' +
      '<mfrac><mn>1</mn><mn>3</mn></mfrac></mrow></mfrac></mrow></mfrac>' +
      '</mrow></math>';
  var speech = 'the fraction with numerator 1, and denominator, 2 over one' +
      ' third';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example NestFrac003
 */
sre.ClearspeakEnglishFractions.prototype.testNestFrac003 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mfrac><mn>1</mn><mn>2</mn>' +
      '</mfrac></mrow><mn>3</mn></mfrac></mrow></math>';
  var speech = 'one half over 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example NestFrac004
 */
sre.ClearspeakEnglishFractions.prototype.testNestFrac004 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mn>1</mn><mrow><mfrac><mn>2</mn><mn>3' +
      '</mn></mfrac></mrow></mfrac></mrow></math>';
  var speech = '1 over two thirds';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example NestFrac005
 */
sre.ClearspeakEnglishFractions.prototype.testNestFrac005 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mfrac><mrow><mn>11</mn></mrow>' +
      '<mrow><mn>32</mn></mrow></mfrac></mrow><mrow><mfrac><mrow><mn>16' +
      '</mn></mrow><mrow><mn>51</mn></mrow></mfrac></mrow></mfrac></mrow>' +
      '</math>';
  var speech = 'the fraction with numerator, 11 over 32, and denominator,' +
      ' 16 over 51';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example NestFrac006
 */
sre.ClearspeakEnglishFractions.prototype.testNestFrac006 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mn>11</mn></mrow><mrow><mfrac>' +
      '<mrow><mn>32</mn></mrow><mrow><mfrac><mrow><mn>16</mn></mrow><mrow>' +
      '<mn>51</mn></mrow></mfrac></mrow></mfrac></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator 11, and denominator, the' +
      ' fraction with numerator 32, and denominator, 16 over 51';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example NestFrac007
 */
sre.ClearspeakEnglishFractions.prototype.testNestFrac007 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mn>1</mn><mo>+</mo><mfrac><mn>4' +
      '</mn><mi>x</mi></mfrac></mrow><mn>2</mn></mfrac></mrow></math>';
  var speech = 'the fraction with numerator 1 plus, 4 over x, and' +
      ' denominator 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example NestFrac008
 */
sre.ClearspeakEnglishFractions.prototype.testNestFrac008 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mn>3</mn><mrow><mn>2</mn><mo>+</mo>' +
      '<mfrac><mn>4</mn><mi>x</mi></mfrac></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator 3, and denominator 2 plus, 4' +
      ' over x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example NestFrac009
 */
sre.ClearspeakEnglishFractions.prototype.testNestFrac009 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mfrac><mrow><mn>10</mn></mrow>' +
      '<mrow><mn>22</mn></mrow></mfrac></mrow><mrow><mfrac><mn>1</mn><mn>2' +
      '</mn></mfrac></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator, 10 over 22, and denominator' +
      ' one half';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example NestFrac010
 */
sre.ClearspeakEnglishFractions.prototype.testNestFrac010 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mn>1</mn><mo>+</mo><mfrac><mn>2' +
      '</mn><mn>3</mn></mfrac></mrow><mrow><mn>1</mn><mo>−</mo><mfrac><mn>2' +
      '</mn><mn>3</mn></mfrac></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator 1 plus two thirds, and' +
      ' denominator 1 minus two thirds';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example NestFrac011
 */
sre.ClearspeakEnglishFractions.prototype.testNestFrac011 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mn>1</mn><mo>+</mo><mfrac><mi>x' +
      '</mi><mn>2</mn></mfrac></mrow><mrow><mn>1</mn><mo>−</mo><mfrac><mi>x' +
      '</mi><mn>2</mn></mfrac></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator 1 plus, x over 2, and' +
      ' denominator 1 minus, x over 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example NestFrac012
 */
sre.ClearspeakEnglishFractions.prototype.testNestFrac012 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mfrac><mrow><mi>x</mi><mo>+</mo>' +
      '<mn>1</mn></mrow><mrow><mi>x</mi><mo>−</mo><mn>1</mn></mrow></mfrac>' +
      '<mo>+</mo><mn>1</mn></mrow><mrow><mi>x</mi><mo>+</mo><mn>1</mn>' +
      '</mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator, the fraction with numerator x' +
      ' plus 1, and denominator x minus 1, plus 1, and denominator x plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example NestFrac013
 */
sre.ClearspeakEnglishFractions.prototype.testNestFrac013 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mfrac><mrow><mi>x</mi><mo>+</mo>' +
      '<mn>1</mn></mrow><mrow><mi>x</mi><mo>−</mo><mn>4</mn></mrow></mfrac>' +
      '<mo>+</mo><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow><mrow><mi>x</mi>' +
      '<mo>+</mo><mfrac><mn>1</mn><mrow><mn>16</mn></mrow></mfrac></mrow>' +
      '</mfrac></mrow></math>';
  var speech = 'the fraction with numerator, the fraction with numerator x' +
      ' plus 1, and denominator x minus 4, plus one half, and denominator x' +
      ' plus, 1 over 16';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example NestFrac014
 */
sre.ClearspeakEnglishFractions.prototype.testNestFrac014 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mn>1</mn><mo>+</mo><mfrac><mi>x</mi><mrow>' +
      '<mn>1</mn><mo>+</mo><mfrac><mn>2</mn><mi>x</mi></mfrac></mrow>' +
      '</mfrac></mrow></math>';
  var speech = '1 plus, the fraction with numerator x, and denominator 1' +
      ' plus, 2 over x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example NestFrac015
 */
sre.ClearspeakEnglishFractions.prototype.testNestFrac015 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mn>1</mn><mo>+</mo><mfrac><mrow><mi>x</mi>' +
      '<mo>+</mo><mn>3</mn></mrow><mrow><mn>1</mn><mo>+</mo><mfrac><mn>2' +
      '</mn><mrow><mi>x</mi><mo>+</mo><mn>3</mn></mrow></mfrac></mrow>' +
      '</mfrac></mrow></math>';
  var speech = '1 plus, the fraction with numerator x plus 3, and' +
      ' denominator 1 plus, the fraction with numerator 2, and denominator' +
      ' x plus 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example NestFrac016
 */
sre.ClearspeakEnglishFractions.prototype.testNestFrac016 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mn>1</mn><mo>+</mo><mfrac><mn>1</mn><mrow>' +
      '<mn>1</mn><mo>+</mo><mfrac><mn>1</mn><mrow><mn>1</mn><mo>+</mo>' +
      '<mfrac><mn>1</mn><mrow><mn>1</mn><mo>+</mo><mn>1</mn></mrow></mfrac>' +
      '</mrow></mfrac></mrow></mfrac></mrow></math>';
  var speech = '1 plus, the fraction with numerator 1, and denominator 1' +
      ' plus, the fraction with numerator 1, and denominator 1 plus, the' +
      ' fraction with numerator 1, and denominator 1 plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example NestFrac017
 */
sre.ClearspeakEnglishFractions.prototype.testNestFrac017 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mn>1</mn><mo>+</mo><mfrac><mn>1</mn><mrow>' +
      '<mn>1</mn><mo>+</mo><mfrac><mn>1</mn><mrow><mn>1</mn><mo>+</mo>' +
      '<mfrac><mn>1</mn><mrow><mn>1</mn><mo>+</mo><mo>⋯</mo></mrow></mfrac>' +
      '</mrow></mfrac></mrow></mfrac></mrow></math>';
  var speech = '1 plus, the fraction with numerator 1, and denominator 1' +
      ' plus, the fraction with numerator 1, and denominator 1 plus, the' +
      ' fraction with numerator 1, and denominator 1 plus dot dot dot';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example NestFrac018
 */
sre.ClearspeakEnglishFractions.prototype.testNestFrac018 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><msub><mi>a</mi><mn>0</mn></msub><mo>+</mo>' +
      '<mfrac><mn>1</mn><mrow><msub><mi>a</mi><mn>1</mn></msub><mo>+</mo>' +
      '<mfrac><mn>1</mn><mrow><msub><mi>a</mi><mn>2</mn></msub><mo>+</mo>' +
      '<mfrac><mn>1</mn><mrow><msub><mi>a</mi><mn>3</mn></msub><mo>+</mo>' +
      '<mo>⋯</mo></mrow></mfrac></mrow></mfrac></mrow></mfrac></mrow></math>';
  var speech = 'a sub 0, plus, the fraction with numerator 1, and' +
      ' denominator, a sub 1, plus, the fraction with numerator 1, and' +
      ' denominator, a sub 2, plus, the fraction with numerator 1, and' +
      ' denominator, a sub 3, plus dot dot dot';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example NestFrac019
 */
sre.ClearspeakEnglishFractions.prototype.testNestFrac019 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mfrac><mn>1</mn><mn>2</mn>' +
      '</mfrac></mrow><mrow><mfrac><mn>1</mn><mn>3</mn></mfrac></mrow>' +
      '</mfrac></mrow></math>';
  var speech = 'one half over one third';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example NestFrac020
 */
sre.ClearspeakEnglishFractions.prototype.testNestFrac020 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mn>1</mn><mrow><mfrac><mn>2</mn><mrow>' +
      '<mfrac><mn>1</mn><mn>3</mn></mfrac></mrow></mfrac></mrow></mfrac>' +
      '</mrow></math>';
  var speech = 'the fraction with numerator 1, and denominator, 2 over one' +
      ' third, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example NestFrac021
 */
sre.ClearspeakEnglishFractions.prototype.testNestFrac021 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mfrac><mn>1</mn><mn>2</mn>' +
      '</mfrac></mrow><mn>3</mn></mfrac></mrow></math>';
  var speech = 'one half over 3, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example NestFrac022
 */
sre.ClearspeakEnglishFractions.prototype.testNestFrac022 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mn>1</mn><mrow><mfrac><mn>2</mn><mn>3' +
      '</mn></mfrac></mrow></mfrac></mrow></math>';
  var speech = '1 over two thirds, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example NestFrac023
 */
sre.ClearspeakEnglishFractions.prototype.testNestFrac023 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mfrac><mrow><mn>11</mn></mrow>' +
      '<mrow><mn>32</mn></mrow></mfrac></mrow><mrow><mfrac><mrow><mn>16' +
      '</mn></mrow><mrow><mn>51</mn></mrow></mfrac></mrow></mfrac></mrow>' +
      '</math>';
  var speech = 'the fraction with numerator, 11 over 32, and denominator,' +
      ' 16 over 51, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example NestFrac024
 */
sre.ClearspeakEnglishFractions.prototype.testNestFrac024 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mn>11</mn></mrow><mrow><mfrac>' +
      '<mrow><mn>32</mn></mrow><mrow><mfrac><mrow><mn>16</mn></mrow><mrow>' +
      '<mn>51</mn></mrow></mfrac></mrow></mfrac></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator 11, and denominator, the' +
      ' fraction with numerator 32, and denominator, 16 over 51, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example NestFrac025
 */
sre.ClearspeakEnglishFractions.prototype.testNestFrac025 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mn>1</mn><mo>+</mo><mfrac><mn>4' +
      '</mn><mi>x</mi></mfrac></mrow><mn>2</mn></mfrac></mrow></math>';
  var speech = 'the fraction with numerator 1 plus, 4 over x, and' +
      ' denominator 2, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example NestFrac026
 */
sre.ClearspeakEnglishFractions.prototype.testNestFrac026 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mn>3</mn><mrow><mn>2</mn><mo>+</mo>' +
      '<mfrac><mn>4</mn><mi>x</mi></mfrac></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator 3, and denominator 2 plus, 4' +
      ' over x, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example NestFrac027
 */
sre.ClearspeakEnglishFractions.prototype.testNestFrac027 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mfrac><mrow><mn>10</mn></mrow>' +
      '<mrow><mn>22</mn></mrow></mfrac></mrow><mrow><mfrac><mn>1</mn><mn>2' +
      '</mn></mfrac></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator, 10 over 22, and denominator' +
      ' one half, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example NestFrac028
 */
sre.ClearspeakEnglishFractions.prototype.testNestFrac028 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mn>1</mn><mo>+</mo><mfrac><mn>2' +
      '</mn><mn>3</mn></mfrac></mrow><mrow><mn>1</mn><mo>−</mo><mfrac><mn>2' +
      '</mn><mn>3</mn></mfrac></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator 1 plus two thirds, and' +
      ' denominator 1 minus two thirds, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example NestFrac029
 */
sre.ClearspeakEnglishFractions.prototype.testNestFrac029 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mn>1</mn><mo>+</mo><mfrac><mi>x' +
      '</mi><mn>2</mn></mfrac></mrow><mrow><mn>1</mn><mo>−</mo><mfrac><mi>x' +
      '</mi><mn>2</mn></mfrac></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator 1 plus, x over 2, and' +
      ' denominator 1 minus, x over 2, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example NestFrac030
 */
sre.ClearspeakEnglishFractions.prototype.testNestFrac030 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mfrac><mrow><mi>x</mi><mo>+</mo>' +
      '<mn>1</mn></mrow><mrow><mi>x</mi><mo>−</mo><mn>1</mn></mrow></mfrac>' +
      '<mo>+</mo><mn>1</mn></mrow><mrow><mi>x</mi><mo>+</mo><mn>1</mn>' +
      '</mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator, the fraction with numerator x' +
      ' plus 1, and denominator x minus 1, plus 1, and denominator x plus' +
      ' 1, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example NestFrac031
 */
sre.ClearspeakEnglishFractions.prototype.testNestFrac031 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mfrac><mrow><mfrac><mrow><mi>x</mi><mo>+</mo>' +
      '<mn>1</mn></mrow><mrow><mi>x</mi><mo>−</mo><mn>4</mn></mrow></mfrac>' +
      '<mo>+</mo><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow><mrow><mi>x</mi>' +
      '<mo>+</mo><mfrac><mn>1</mn><mrow><mn>16</mn></mrow></mfrac></mrow>' +
      '</mfrac></mrow></math>';
  var speech = 'the fraction with numerator, the fraction with numerator x' +
      ' plus 1, and denominator x minus 4, plus one half, and denominator x' +
      ' plus, 1 over 16, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example NestFrac032
 */
sre.ClearspeakEnglishFractions.prototype.testNestFrac032 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mn>1</mn><mo>+</mo><mfrac><mi>x</mi><mrow>' +
      '<mn>1</mn><mo>+</mo><mfrac><mn>2</mn><mi>x</mi></mfrac></mrow>' +
      '</mfrac></mrow></math>';
  var speech = '1 plus, the fraction with numerator x, and denominator 1' +
      ' plus, 2 over x, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example NestFrac033
 */
sre.ClearspeakEnglishFractions.prototype.testNestFrac033 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mn>1</mn><mo>+</mo><mfrac><mrow><mi>x</mi>' +
      '<mo>+</mo><mn>3</mn></mrow><mrow><mn>1</mn><mo>+</mo><mfrac><mn>2' +
      '</mn><mrow><mi>x</mi><mo>+</mo><mn>3</mn></mrow></mfrac></mrow>' +
      '</mfrac></mrow></math>';
  var speech = '1 plus, the fraction with numerator x plus 3, and' +
      ' denominator 1 plus, the fraction with numerator 2, and denominator' +
      ' x plus 3, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example NestFrac034
 */
sre.ClearspeakEnglishFractions.prototype.testNestFrac034 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mn>1</mn><mo>+</mo><mfrac><mn>1</mn><mrow>' +
      '<mn>1</mn><mo>+</mo><mfrac><mn>1</mn><mrow><mn>1</mn><mo>+</mo>' +
      '<mfrac><mn>1</mn><mrow><mn>1</mn><mo>+</mo><mn>1</mn></mrow></mfrac>' +
      '</mrow></mfrac></mrow></mfrac></mrow></math>';
  var speech = '1 plus, the fraction with numerator 1, and denominator 1' +
      ' plus, the fraction with numerator 1, and denominator 1 plus, the' +
      ' fraction with numerator 1, and denominator 1 plus 1, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example NestFrac035
 */
sre.ClearspeakEnglishFractions.prototype.testNestFrac035 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><mn>1</mn><mo>+</mo><mfrac><mn>1</mn><mrow>' +
      '<mn>1</mn><mo>+</mo><mfrac><mn>1</mn><mrow><mn>1</mn><mo>+</mo>' +
      '<mfrac><mn>1</mn><mrow><mn>1</mn><mo>+</mo><mo>⋯</mo></mrow></mfrac>' +
      '</mrow></mfrac></mrow></mfrac></mrow></math>';
  var speech = '1 plus, the fraction with numerator 1, and denominator 1' +
      ' plus, the fraction with numerator 1, and denominator 1 plus, the' +
      ' fraction with numerator 1, and denominator 1 plus dot dot dot, end' +
      ' fraction';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example NestFrac036
 */
sre.ClearspeakEnglishFractions.prototype.testNestFrac036 = function() {
  var preference = 'Fraction_EndFrac';
  var mathml = '<math><mrow><msub><mi>a</mi><mn>0</mn></msub><mo>+</mo>' +
      '<mfrac><mn>1</mn><mrow><msub><mi>a</mi><mn>1</mn></msub><mo>+</mo>' +
      '<mfrac><mn>1</mn><mrow><msub><mi>a</mi><mn>2</mn></msub><mo>+</mo>' +
      '<mfrac><mn>1</mn><mrow><msub><mi>a</mi><mn>3</mn></msub><mo>+</mo>' +
      '<mo>⋯</mo></mrow></mfrac></mrow></mfrac></mrow></mfrac></mrow></math>';
  var speech = 'a sub 0, plus, the fraction with numerator 1, and' +
      ' denominator, a sub 1, plus, the fraction with numerator 1, and' +
      ' denominator, a sub 2, plus, the fraction with numerator 1, and' +
      ' denominator, a sub 3, plus dot dot dot, end fraction';
  this.executeRuleTest(mathml, speech, preference);
};


//
// Fractions with Functions
//


/**
 * Testing ClearspeakEnglishFractions Example Fracfunct001
 */
sre.ClearspeakEnglishFractions.prototype.testFracfunct001 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>f</mi><mrow><mo>(</mo><mi>x' +
      '</mi><mo>)</mo></mrow></mrow><mrow><mi>g</mi><mrow><mo>(</mo><mi>x' +
      '</mi><mo>)</mo></mrow></mrow></mfrac></mrow></math>';
  var speech = 'f of x, over g of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Fracfunct002
 */
sre.ClearspeakEnglishFractions.prototype.testFracfunct002 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>f</mi><mrow><mo>(</mo><mi>x' +
      '</mi><mo>)</mo></mrow><mo>+</mo><mi>g</mi><mrow><mo>(</mo><mi>x</mi>' +
      '<mo>)</mo></mrow></mrow><mrow><mi>g</mi><mrow><mo>(</mo><mi>x</mi>' +
      '<mo>)</mo></mrow></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator f of x, plus g of x, and' +
      ' denominator g of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Fracfunct003
 */
sre.ClearspeakEnglishFractions.prototype.testFracfunct003 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>f</mi><mrow><mo>(</mo><mrow>' +
      '<mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow><mrow>' +
      '<mi>g</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></mfrac>' +
      '</mrow></math>';
  var speech = 'the fraction with numerator f of, open paren, x plus 1,' +
      ' close paren, and denominator g of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Fracfunct004
 */
sre.ClearspeakEnglishFractions.prototype.testFracfunct004 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>f</mi><mrow><mo>(</mo><mi>x' +
      '</mi><mo>)</mo></mrow></mrow><mn>2</mn></mfrac></mrow></math>';
  var speech = 'f of x, over 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Fracfunct005
 */
sre.ClearspeakEnglishFractions.prototype.testFracfunct005 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mn>2</mn><mrow><mi>f</mi><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow></mrow></mfrac></mrow></math>';
  var speech = '2 over f of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Fracfunct006
 */
sre.ClearspeakEnglishFractions.prototype.testFracfunct006 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mn>2</mn><mrow><mi>g</mi><mrow><mo>(' +
      '</mo><mi>x</mi><mo>)</mo></mrow><mo>+</mo><mi>g</mi><mo' +
      ' stretchy="false">(</mo><mi>x</mi><mo>+</mo><mn>1</mn><mo' +
      ' stretchy="false">)</mo></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator 2, and denominator g of x, plus' +
      ' g of, open paren, x plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Fracfunct007
 */
sre.ClearspeakEnglishFractions.prototype.testFracfunct007 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>sin</mi><mi>x</mi></mrow>' +
      '<mrow><mi>cos</mi><mi>x</mi></mrow></mfrac></mrow></math>';
  var speech = 'sine x over cosine x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Fracfunct008
 *
 * This is the same as 011. Mistake in Examples file.
 */
sre.ClearspeakEnglishFractions.prototype.untestFracfunct008 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>sin</mi><mo>(</mo><mi>x</mi>' +
      '<mo>+</mo><mi>y</mi><mo>)</mo></mrow><mrow><mi>cos</mi><mo>(</mo>' +
      '<mi>x</mi><mo>+</mo><mi>y</mi><mo>)</mo></mrow></mfrac></mrow></math>';
  var speech = 'sine, open paren, x plus y, close paren, over, cosine, open' +
      ' paren, x plus y, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Fracfunct009
 */
sre.ClearspeakEnglishFractions.prototype.testFracfunct009 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>sin</mi><mi>x</mi><mo>+</mo>' +
      '<mi>cos</mi><mi>x</mi></mrow><mrow><mi>cos</mi><mi>x</mi></mrow>' +
      '</mfrac></mrow></math>';
  var speech = 'the fraction with numerator sine x plus cosine x, and' +
      ' denominator cosine x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Fracfunct010
 */
sre.ClearspeakEnglishFractions.prototype.testFracfunct010 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>sin</mi><mn>2</mn><mi>x</mi>' +
      '</mrow><mrow><mi>cos</mi><mn>3</mn><mi>x</mi></mrow></mfrac></mrow>' +
      '</math>';
  var speech = 'sine 2 x over cosine 3 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Fracfunct011
 */
sre.ClearspeakEnglishFractions.prototype.testFracfunct011 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>sin</mi><mrow><mo>(</mo><mrow>' +
      '<mi>x</mi><mo>+</mo><mi>y</mi></mrow><mo>)</mo></mrow></mrow><mrow>' +
      '<mi>cos</mi><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '</mrow><mo>)</mo></mrow></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator, the sine of, open paren, x' +
      ' plus y, close paren, and denominator, the cosine of, open paren, x' +
      ' plus y, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Fracfunct012
 */
sre.ClearspeakEnglishFractions.prototype.testFracfunct012 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>f</mi><mrow><mo>(</mo><mrow>' +
      '<mn>2</mn><mi>x</mi></mrow><mo>)</mo></mrow></mrow><mrow><mi>g</mi>' +
      '<mrow><mo>(</mo><mrow><mn>3</mn><mi>x</mi></mrow><mo>)</mo></mrow>' +
      '</mrow></mfrac></mrow></math>';
  var speech = 'f of 2 x, over g of 3 x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Fracfunct013
 */
sre.ClearspeakEnglishFractions.prototype.testFracfunct013 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>log</mi><mi>x</mi></mrow>' +
      '<mrow><mi>log</mi><mi>y</mi></mrow></mfrac></mrow></math>';
  var speech = 'log x over log y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Fracfunct014
 */
sre.ClearspeakEnglishFractions.prototype.testFracfunct014 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>log</mi><mn>2</mn><mi>x</mi>' +
      '</mrow><mrow><mi>log</mi><mn>3</mn><mi>y</mi></mrow></mfrac></mrow>' +
      '</math>';
  var speech = 'log 2 x over log 3 y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Fracfunct015
 */
sre.ClearspeakEnglishFractions.prototype.testFracfunct015 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><msub><mrow><mi>log</mi></mrow>' +
      '<mrow><mn>10</mn></mrow></msub><mi>x</mi></mrow><mrow><msub><mrow>' +
      '<mi>log</mi></mrow><mn>5</mn></msub><mi>y</mi></mrow></mfrac></mrow>' +
      '</math>';
  var speech = 'the log base 10 of, x, over, the log base 5 of, y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Fracfunct016
 */
sre.ClearspeakEnglishFractions.prototype.testFracfunct016 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><msub><mrow><mi>log</mi></mrow>' +
      '<mrow><mn>10</mn></mrow></msub><mn>2</mn><mi>x</mi></mrow><mrow>' +
      '<msub><mrow><mi>log</mi></mrow><mn>5</mn></msub><mn>3</mn><mi>y</mi>' +
      '</mrow></mfrac></mrow></math>';
  var speech = 'the log base 10 of, 2 x, over, the log base 5 of, 3 y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Fracfunct017
 */
sre.ClearspeakEnglishFractions.prototype.testFracfunct017 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><mi>log</mi><mrow><mo>(</mo><mrow>' +
      '<mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow><mrow>' +
      '<mi>log</mi><mi>y</mi></mrow></mfrac></mrow></math>';
  var speech = 'the fraction with numerator, the log of, open paren, x plus' +
      ' 1, close paren, and denominator log y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishFractions Example Fracfunct018
 */
sre.ClearspeakEnglishFractions.prototype.testFracfunct018 = function() {
  var preference = 'Fraction_Auto';
  var mathml = '<math><mrow><mfrac><mrow><msub><mi>f</mi><mn>1</mn></msub>' +
      '<mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mrow><msub><mi>g' +
      '</mi><mn>1</mn></msub><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow>' +
      '</mrow></mfrac></mrow></math>';
  var speech = 'f sub 1, of x, over, g sub 1, of x';
  this.executeRuleTest(mathml, speech, preference);
};

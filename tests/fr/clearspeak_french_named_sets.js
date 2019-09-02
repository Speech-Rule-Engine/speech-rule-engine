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


goog.provide('sre.ClearspeakFrenchNamedSets');

goog.require('sre.ClearspeakFrenchRuleTest');



/**
* @constructor
* @extends {sre.ClearspeakFrenchRuleTest}
*/
sre.ClearspeakFrenchNamedSets = function() {
  sre.ClearspeakFrenchNamedSets.base(this, 'constructor');

  /**
* @override
  */
  this.information = 'ClearspeakFrenchNamedSets rule tests.';

};
goog.inherits(sre.ClearspeakFrenchNamedSets, sre.ClearspeakFrenchRuleTest);



//
// ClearSpeak Rules and Preferences Examples: Named Sets (Number Systems)
//


//
// Named Sets (Number Systems)
//


/**
 * Testing ClearspeakFrenchNamedSets Example NumSys001
 */
sre.ClearspeakFrenchNamedSets.prototype.testNumSys001 = function() {
  var preference = 'default';
  var mathml = '<mi>ℝ</mi>';
  var speech = 'les nombres réels';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchNamedSets Example NumSys001 (variant)
 */
sre.ClearspeakFrenchNamedSets.prototype.testNumSys001a = function() {
  var preference = 'default';
  var mathml = '<mi mathvariant="double-struck">R</mi>';
  var speech = 'les nombres réels';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchNamedSets Example NumSys002
 */
sre.ClearspeakFrenchNamedSets.prototype.testNumSys002 = function() {
  var preference = 'default';
  var mathml = '<mi>ℂ</mi>';
  var speech = 'les nombres complexes';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchNamedSets Example NumSys003
 */
sre.ClearspeakFrenchNamedSets.prototype.testNumSys003 = function() {
  var preference = 'default';
  var mathml = '<mi>ℤ</mi>';
  var speech = 'les nombres entiers';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchNamedSets Example NumSys004
 */
sre.ClearspeakFrenchNamedSets.prototype.testNumSys004 = function() {
  var preference = 'default';
  var mathml = '<mi>ℚ</mi>';
  var speech = 'les Nombres rationnels';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchNamedSets Example NumSys005
 */
sre.ClearspeakFrenchNamedSets.prototype.testNumSys005 = function() {
  var preference = 'default';
  var mathml = '<mi>ℕ</mi>';
  var speech = 'les nombres entier naturel';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchNamedSets Example NumSys005
 */
sre.ClearspeakFrenchNamedSets.prototype.testNumSys005a = function() {
  var preference = 'default';
  var mathml = '<msub><mi>ℕ</mi><mn>0</mn></msub>';
  var speech = 'les nombres entiers naturel avec zero';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchNamedSets Example NumSys006
 */
sre.ClearspeakFrenchNamedSets.prototype.testNumSys006 = function() {
  var preference = 'default';
  var mathml = '<mrow><msup><mi>ℤ</mi><mo>+</mo></msup></mrow>';
  var speech = 'les nombres entiers positif';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchNamedSets Example NumSys006
 */
sre.ClearspeakFrenchNamedSets.prototype.testNumSys006a = function() {
  var preference = 'default';
  var mathml = '<mrow><msup><mi>ℤ</mi><mo>-</mo></msup></mrow>';
  var speech = 'les nombres entiers négatif';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchNamedSets Example NumSys007
 */
sre.ClearspeakFrenchNamedSets.prototype.testNumSys007 = function() {
  var preference = 'default';
  var mathml = '<mrow><msup><mi>ℝ</mi><mn>2</mn></msup></mrow>';
  var speech = 'r-deux';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchNamedSets Example NumSys008
 */
sre.ClearspeakFrenchNamedSets.prototype.testNumSys008 = function() {
  var preference = 'default';
  var mathml = '<mrow><msup><mi>ℤ</mi><mn>3</mn></msup></mrow>';
  var speech = 'z-trois';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchNamedSets Example NumSys009
 */
sre.ClearspeakFrenchNamedSets.prototype.testNumSys009 = function() {
  var preference = 'default';
  var mathml = '<mrow><msup><mi>ℂ</mi><mi>n</mi></msup></mrow>';
  var speech = 'c-n';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakFrenchNamedSets Example NumSys010
 */
sre.ClearspeakFrenchNamedSets.prototype.testNumSys010 = function() {
  var preference = 'default';
  var mathml = '<mrow><msup><mi>ℝ</mi><mi>∞</mi></msup></mrow>';
  var speech = 'r-infini';
  this.executeRuleTest(mathml, speech, preference);
};

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


goog.provide('sre.ClearspeakNamedSets');

goog.require('sre.ClearspeakRuleTest');



/**
* @constructor
* @extends {sre.ClearspeakRuleTest}
*/
sre.ClearspeakNamedSets = function() {
  sre.ClearspeakNamedSets.base(this, 'constructor');

  /**
* @override
  */
  this.information = 'ClearspeakNamedSets rule tests.';

};
goog.inherits(sre.ClearspeakNamedSets, sre.ClearspeakRuleTest);



//
// ClearSpeak Rules and Preferences Examples: Named Sets (Number Systems)
//


//
// Named Sets (Number Systems)
//


/**
 * Testing ClearspeakNamedSets Example NumSys001
 */
sre.ClearspeakNamedSets.prototype.testNumSys001 = function() {
  var preference = 'default';
  var mathml = '<mi>ℝ</mi>';
  var speech = 'the real numbers';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakNamedSets Example NumSys001 (variant)
 */
sre.ClearspeakNamedSets.prototype.testNumSys001a = function() {
  var preference = 'default';
  var mathml = '<mi mathvariant="double-struck">R</mi>';
  var speech = 'the real numbers';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakNamedSets Example NumSys002
 */
sre.ClearspeakNamedSets.prototype.testNumSys002 = function() {
  var preference = 'default';
  var mathml = '<mi>ℂ</mi>';
  var speech = 'the complex numbers';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakNamedSets Example NumSys003
 */
sre.ClearspeakNamedSets.prototype.testNumSys003 = function() {
  var preference = 'default';
  var mathml = '<mi>ℤ</mi>';
  var speech = 'the integers';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakNamedSets Example NumSys004
 */
sre.ClearspeakNamedSets.prototype.testNumSys004 = function() {
  var preference = 'default';
  var mathml = '<mi>ℚ</mi>';
  var speech = 'the rational numbers';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakNamedSets Example NumSys005
 */
sre.ClearspeakNamedSets.prototype.testNumSys005 = function() {
  var preference = 'default';
  var mathml = '<mi>ℕ</mi>';
  var speech = 'the natural numbers';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakNamedSets Example NumSys005
 */
sre.ClearspeakNamedSets.prototype.testNumSys005a = function() {
  var preference = 'default';
  var mathml = '<msub><mi>ℕ</mi><mn>0</mn></msub>';
  var speech = 'the natural numbers with zero';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakNamedSets Example NumSys006
 */
sre.ClearspeakNamedSets.prototype.testNumSys006 = function() {
  var preference = 'default';
  var mathml = '<mrow><msup><mi>ℤ</mi><mo>+</mo></msup></mrow>';
  var speech = 'the positive integers';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakNamedSets Example NumSys006
 */
sre.ClearspeakNamedSets.prototype.testNumSys006a = function() {
  var preference = 'default';
  var mathml = '<mrow><msup><mi>ℤ</mi><mo>-</mo></msup></mrow>';
  var speech = 'the negative integers';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakNamedSets Example NumSys007
 */
sre.ClearspeakNamedSets.prototype.testNumSys007 = function() {
  var preference = 'default';
  var mathml = '<mrow><msup><mi>ℝ</mi><mn>2</mn></msup></mrow>';
  var speech = 'r-two';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakNamedSets Example NumSys008
 */
sre.ClearspeakNamedSets.prototype.testNumSys008 = function() {
  var preference = 'default';
  var mathml = '<mrow><msup><mi>ℤ</mi><mn>3</mn></msup></mrow>';
  var speech = 'z-three';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakNamedSets Example NumSys009
 */
sre.ClearspeakNamedSets.prototype.testNumSys009 = function() {
  var preference = 'default';
  var mathml = '<mrow><msup><mi>ℂ</mi><mi>n</mi></msup></mrow>';
  var speech = 'c-n';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakNamedSets Example NumSys010
 */
sre.ClearspeakNamedSets.prototype.testNumSys010 = function() {
  var preference = 'default';
  var mathml = '<mrow><msup><mi>ℝ</mi><mi>∞</mi></msup></mrow>';
  var speech = 'r-infinity';
  this.executeRuleTest(mathml, speech, preference);
};

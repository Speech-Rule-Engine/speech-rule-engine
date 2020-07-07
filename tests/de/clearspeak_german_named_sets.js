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


goog.provide('sre.ClearspeakGermanNamedSets');

goog.require('sre.ClearspeakGermanRuleTest');



/**
* @constructor
* @extends {sre.ClearspeakGermanRuleTest}
*/
sre.ClearspeakGermanNamedSets = function() {
  sre.ClearspeakGermanNamedSets.base(this, 'constructor');

  /**
* @override
  */
  this.information = 'ClearspeakGermanNamedSets rule tests.';

};
goog.inherits(sre.ClearspeakGermanNamedSets, sre.ClearspeakGermanRuleTest);



//
// ClearSpeak Rules and Preferences Examples: Named Sets (Number Systems)
//


//
// Named Sets (Number Systems)
//


/**
 * Testing ClearspeakGermanNamedSets Example NumSys001
 */
sre.ClearspeakGermanNamedSets.prototype.testNumSys001 = function() {
  var preference = 'default';
  var mathml = '<mi>ℝ</mi>';
  var speech = 'die reellen Zahlen';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanNamedSets Example NumSys001 (variant)
 */
sre.ClearspeakGermanNamedSets.prototype.testNumSys001a = function() {
  var preference = 'default';
  var mathml = '<mi mathvariant="double-struck">R</mi>';
  var speech = 'die reellen Zahlen';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanNamedSets Example NumSys002
 */
sre.ClearspeakGermanNamedSets.prototype.testNumSys002 = function() {
  var preference = 'default';
  var mathml = '<mi>ℂ</mi>';
  var speech = 'die komplexen Zahlen';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanNamedSets Example NumSys003
 */
sre.ClearspeakGermanNamedSets.prototype.testNumSys003 = function() {
  var preference = 'default';
  var mathml = '<mi>ℤ</mi>';
  var speech = 'die ganzen Zahlen';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanNamedSets Example NumSys004
 */
sre.ClearspeakGermanNamedSets.prototype.testNumSys004 = function() {
  var preference = 'default';
  var mathml = '<mi>ℚ</mi>';
  var speech = 'die rationalen Zahlen';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanNamedSets Example NumSys005
 */
sre.ClearspeakGermanNamedSets.prototype.testNumSys005 = function() {
  var preference = 'default';
  var mathml = '<mi>ℕ</mi>';
  var speech = 'die natürlichen Zahlen';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanNamedSets Example NumSys005
 */
sre.ClearspeakGermanNamedSets.prototype.testNumSys005a = function() {
  var preference = 'default';
  var mathml = '<msub><mi>ℕ</mi><mn>0</mn></msub>';
  var speech = 'die natürlichen Zahlen mit Null';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanNamedSets Example NumSys006
 */
sre.ClearspeakGermanNamedSets.prototype.testNumSys006 = function() {
  var preference = 'default';
  var mathml = '<mrow><msup><mi>ℤ</mi><mo>+</mo></msup></mrow>';
  var speech = 'die positiven ganzen Zahlen';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanNamedSets Example NumSys006
 */
sre.ClearspeakGermanNamedSets.prototype.testNumSys006a = function() {
  var preference = 'default';
  var mathml = '<mrow><msup><mi>ℤ</mi><mo>-</mo></msup></mrow>';
  var speech = 'die negativen ganzen Zahlen';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanNamedSets Example NumSys007
 */
sre.ClearspeakGermanNamedSets.prototype.testNumSys007 = function() {
  var preference = 'default';
  var mathml = '<mrow><msup><mi>ℝ</mi><mn>2</mn></msup></mrow>';
  var speech = 'r-zwei';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanNamedSets Example NumSys008
 */
sre.ClearspeakGermanNamedSets.prototype.testNumSys008 = function() {
  var preference = 'default';
  var mathml = '<mrow><msup><mi>ℤ</mi><mn>3</mn></msup></mrow>';
  var speech = 'z-drei';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanNamedSets Example NumSys009
 */
sre.ClearspeakGermanNamedSets.prototype.testNumSys009 = function() {
  var preference = 'default';
  var mathml = '<mrow><msup><mi>ℂ</mi><mi>n</mi></msup></mrow>';
  var speech = 'c-n';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakGermanNamedSets Example NumSys010
 */
sre.ClearspeakGermanNamedSets.prototype.testNumSys010 = function() {
  var preference = 'default';
  var mathml = '<mrow><msup><mi>ℝ</mi><mi>∞</mi></msup></mrow>';
  var speech = 'r-unendlich';
  this.executeRuleTest(mathml, speech, preference);
};

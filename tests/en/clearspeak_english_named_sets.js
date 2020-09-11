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


goog.provide('sre.ClearspeakEnglishNamedSets');

goog.require('sre.ClearspeakEnglishRuleTest');



/**
* @constructor
* @extends {sre.ClearspeakEnglishRuleTest}
*/
sre.ClearspeakEnglishNamedSets = function() {
  sre.ClearspeakEnglishNamedSets.base(this, 'constructor');

  /**
* @override
  */
  this.information = 'ClearspeakEnglishNamedSets rule tests.';

};
goog.inherits(sre.ClearspeakEnglishNamedSets, sre.ClearspeakEnglishRuleTest);



//
// ClearSpeak Rules and Preferences Examples: Named Sets (Number Systems)
//


//
// Named Sets (Number Systems)
//


/**
 * Testing ClearspeakEnglishNamedSets Example NumSys001
 */
sre.ClearspeakEnglishNamedSets.prototype.testNumSys001 = function() {
  var preference = 'default';
  var mathml = '<mi>ℝ</mi>';
  var speech = 'the real numbers';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishNamedSets Example NumSys001 (variant)
 */
sre.ClearspeakEnglishNamedSets.prototype.testNumSys001a = function() {
  var preference = 'default';
  var mathml = '<mi mathvariant="double-struck">R</mi>';
  var speech = 'the real numbers';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishNamedSets Example NumSys002
 */
sre.ClearspeakEnglishNamedSets.prototype.testNumSys002 = function() {
  var preference = 'default';
  var mathml = '<mi>ℂ</mi>';
  var speech = 'the complex numbers';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishNamedSets Example NumSys002a
 */
sre.ClearspeakEnglishNamedSets.prototype.testNumSys002a = function() {
  var preference = 'default';
  var mathml = '<mi mathvariant="double-struck">C</mi>';
  var speech = 'the complex numbers';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishNamedSets Example NumSys003
 */
sre.ClearspeakEnglishNamedSets.prototype.testNumSys003 = function() {
  var preference = 'default';
  var mathml = '<mi>ℤ</mi>';
  var speech = 'the integers';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishNamedSets Example NumSys003a
 */
sre.ClearspeakEnglishNamedSets.prototype.testNumSys003a = function() {
  var preference = 'default';
  var mathml = '<mi mathvariant="double-struck">Z</mi>';
  var speech = 'the integers';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishNamedSets Example NumSys004
 */
sre.ClearspeakEnglishNamedSets.prototype.testNumSys004 = function() {
  var preference = 'default';
  var mathml = '<mi>ℚ</mi>';
  var speech = 'the rational numbers';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishNamedSets Example NumSys004a
 */
sre.ClearspeakEnglishNamedSets.prototype.testNumSys004a = function() {
  var preference = 'default';
  var mathml = '<mi mathvariant="double-struck">Q</mi>';
  var speech = 'the rational numbers';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishNamedSets Example NumSys005
 */
sre.ClearspeakEnglishNamedSets.prototype.testNumSys005 = function() {
  var preference = 'default';
  var mathml = '<mi>ℕ</mi>';
  var speech = 'the natural numbers';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishNamedSets Example NumSys005a
 */
sre.ClearspeakEnglishNamedSets.prototype.testNumSys005a = function() {
  var preference = 'default';
  var mathml = '<mi mathvariant="double-struck">N</mi>';
  var speech = 'the natural numbers';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishNamedSets Example NumSys005
 */
sre.ClearspeakEnglishNamedSets.prototype.testNumSys005_1 = function() {
  var preference = 'default';
  var mathml = '<msub><mi>ℕ</mi><mn>0</mn></msub>';
  var speech = 'the natural numbers with zero';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishNamedSets Example NumSys005a
 */
sre.ClearspeakEnglishNamedSets.prototype.testNumSys005_1a = function() {
  var preference = 'default';
  var mathml = '<msub><mi mathvariant="double-struck">N</mi><mn>0</mn></msub>';
  var speech = 'the natural numbers with zero';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishNamedSets Example NumSys006
 */
sre.ClearspeakEnglishNamedSets.prototype.testNumSys006 = function() {
  var preference = 'default';
  var mathml = '<mrow><msup><mi>ℤ</mi><mo>+</mo></msup></mrow>';
  var speech = 'the positive integers';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishNamedSets Example NumSys006a
 */
sre.ClearspeakEnglishNamedSets.prototype.testNumSys006a = function() {
  var preference = 'default';
  var mathml = '<mrow><msup><mi mathvariant="double-struck">Z</mi><mo>+</mo></msup></mrow>';
  var speech = 'the positive integers';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishNamedSets Example NumSys006
 */
sre.ClearspeakEnglishNamedSets.prototype.testNumSys006_1 = function() {
  var preference = 'default';
  var mathml = '<mrow><msup><mi>ℤ</mi><mo>-</mo></msup></mrow>';
  var speech = 'the negative integers';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishNamedSets Example NumSys006a
 */
sre.ClearspeakEnglishNamedSets.prototype.testNumSys006_1a = function() {
  var preference = 'default';
  var mathml = '<mrow><msup><mi mathvariant="double-struck">Z</mi><mo>-</mo></msup></mrow>';
  var speech = 'the negative integers';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishNamedSets Example NumSys007
 */
sre.ClearspeakEnglishNamedSets.prototype.testNumSys007 = function() {
  var preference = 'default';
  var mathml = '<mrow><msup><mi>ℝ</mi><mn>2</mn></msup></mrow>';
  var speech = 'r-two';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishNamedSets Example NumSys007a
 */
sre.ClearspeakEnglishNamedSets.prototype.testNumSys007a = function() {
  var preference = 'default';
  var mathml = '<mrow><msup><mi mathvariant="double-struck">R</mi><mn>2</mn></msup></mrow>';
  var speech = 'r-two';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishNamedSets Example NumSys008
 */
sre.ClearspeakEnglishNamedSets.prototype.testNumSys008 = function() {
  var preference = 'default';
  var mathml = '<mrow><msup><mi>ℤ</mi><mn>3</mn></msup></mrow>';
  var speech = 'z-three';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishNamedSets Example NumSys008a
 */
sre.ClearspeakEnglishNamedSets.prototype.testNumSys008a = function() {
  var preference = 'default';
  var mathml = '<mrow><msup><mi mathvariant="double-struck">Z</mi><mn>3</mn></msup></mrow>';
  var speech = 'z-three';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishNamedSets Example NumSys009
 */
sre.ClearspeakEnglishNamedSets.prototype.testNumSys009 = function() {
  var preference = 'default';
  var mathml = '<mrow><msup><mi>ℂ</mi><mi>n</mi></msup></mrow>';
  var speech = 'c-n';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishNamedSets Example NumSys009a
 */
sre.ClearspeakEnglishNamedSets.prototype.testNumSys009a = function() {
  var preference = 'default';
  var mathml = '<mrow><msup><mi mathvariant="double-struck">C</mi><mi>n</mi></msup></mrow>';
  var speech = 'c-n';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishNamedSets Example NumSys010
 */
sre.ClearspeakEnglishNamedSets.prototype.testNumSys010 = function() {
  var preference = 'default';
  var mathml = '<mrow><msup><mi>ℝ</mi><mi>∞</mi></msup></mrow>';
  var speech = 'r-infinity';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakEnglishNamedSets Example NumSys010a
 */
sre.ClearspeakEnglishNamedSets.prototype.testNumSys010a = function() {
  var preference = 'default';
  var mathml = '<mrow><msup><mi mathvariant="double-struck">R</mi><mi>∞</mi></msup></mrow>';
  var speech = 'r-infinity';
  this.executeRuleTest(mathml, speech, preference);
};

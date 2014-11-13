// Copyright 2014 Volker Sorge
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

/**
 * @fileoverview Testcases resulting from Mathml Cloud project.
 * @author Volker.Sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.MathmlCloudTest');

goog.require('sre.MathspeakRuleTest');


/**
 * @constructor
 * @extends {sre.MathspeakRuleTest}
 */
sre.MathmlCloudTest = function() {
  goog.base(this);

  /**
   * @override
   */
  this.information = 'Mathml Cloud tests.';
};
goog.inherits(sre.MathmlCloudTest, sre.MathspeakRuleTest);


// In the following default is the verbose version of MathSpeak.
/**
 * Testing Rule 1.1, Example 1.
 */
sre.MathspeakRuleTest.prototype.testParenSuper = function() {
  var mml = '<mo>(</mo><mi>a</mi><msup><mo>)</mo><mn>2</mn></msup>';
  this.executeRuleTest(mml, 'left-parenthesis a right-parenthesis squared', 'default');
  this.executeRuleTest(mml, 'left-pren a right-pren squared', 'brief');
  this.executeRuleTest(mml, 'L pren a R pren squared', 'sbrief');
};


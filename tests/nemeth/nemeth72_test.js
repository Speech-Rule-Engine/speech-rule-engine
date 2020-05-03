// Copyright 2019 Volker Sorge
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
 * @fileoverview Basic Testcases for Nemeth
 *
 * @author Volker.Sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.Nemeth72Test');

goog.require('sre.AbstractRuleTest');



/**
 * @constructor
 * @extends {sre.AbstractRuleTest}
 */
sre.Nemeth72Test = function() {
  sre.Nemeth72Test.base(this, 'constructor');

  /**
   * @override
   */
  this.information = 'Testcases from the Nemeth book.';

  /**
   * @override
   */
  this.domain = 'default';

  /**
   * @override
   */
  this.semantics = true;

  /**
   * @override
   */
  this.locale = 'nemeth';

  /**
   * @override
   */
  this.modality = 'braille';

  this.setActive('Nemeth72Test');
  this.actual = false;
};
goog.inherits(sre.Nemeth72Test, sre.AbstractRuleTest);


/**
 *
 */
sre.Nemeth72Test.prototype.test = function() {
};


/**
 * page 10.14
 */
sre.Nemeth72Test.prototype.test_10_14 = function() {
  var nemeth = '⠤⠼⠂';
  var mml = '<mo>-</mo><mn>1</mn>';
  this.executeRuleTest(mml, nemeth);
};


/**
 * page 10.15
 */
sre.Nemeth72Test.prototype.test_10_15 = function() {
  var nemeth = '⠤⠼⠨⠒';
  var mml = '<mo>-</mo><mn>.3</mn>';
  this.executeRuleTest(mml, nemeth);
};



/**
 * page 156.169(1)
 */
sre.Nemeth72Test.prototype.test_156_169_1 = function() {
  var nemeth = '⠝⠯';
  var mml = '<mi>n</mi><mo>!</mo>';
  this.executeRuleTest(mml, nemeth);
};

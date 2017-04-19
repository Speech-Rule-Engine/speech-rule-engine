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
// Funded by the Mozilla Foundation.

/**
 * @fileoverview Testcases for mathspeak speech rules.
 * @author Volker.Sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.ClearspeakTest');

goog.require('sre.AbstractRuleTest');



/**
 * @constructor
 * @extends {sre.AbstractRuleTest}
 */
sre.ClearspeakTest = function() {
  sre.ClearspeakTest.base(this, 'constructor');

  /**
   * @override
   */
  this.information = 'Clearspeak rule tests.';

  /**
   * @override
   */
  this.domain = 'clearspeak';

  /**
   * @override
   */
  this.semantics = true;

  /**
   * @override
   */
  this.rules = ['ClearspeakRules'];

  this.setActive('ClearspeakExamples');
};
goog.inherits(sre.ClearspeakTest, sre.AbstractRuleTest);



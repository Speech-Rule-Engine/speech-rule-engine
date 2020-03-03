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

/**
 * @fileoverview Abstract class for German clearspeak rule tests.
 * @author Volker.Sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.ClearspeakGermanRuleTest');

goog.require('sre.ClearspeakRuleTest');



/**
 * @constructor
 * @extends {sre.ClearspeakRuleTest}
 */
sre.ClearspeakGermanRuleTest = function() {
  sre.ClearspeakGermanRuleTest.base(this, 'constructor');

  /**
   * @override
   */
  this.locale = 'de';

  /**
   * @override
   */
  this.domain = 'clearspeak';

  /**
   * @override
   */
  this.semantics = true;
  this.actual = true;

  this.setActive('ClearspeakGerman');
  this.startExamples();
};
goog.inherits(sre.ClearspeakGermanRuleTest, sre.ClearspeakRuleTest);

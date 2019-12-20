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
 * @fileoverview Abstract class for test cases of single characters.
 * @author Volker.Sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.AbstractCharacterTest');

goog.require('sre.AbstractRuleTest');



/**
 * @constructor
 * @extends {sre.AbstractRuleTest}
 */
sre.AbstractCharacterTest = function() {
  sre.AbstractCharacterTest.base(this, 'constructor');


  /**
   * @type {Array.<string>}
   */
  this.styles = [];

};
goog.inherits(sre.AbstractCharacterTest, sre.AbstractRuleTest);


/**
 * Tests speech translation for single characters.
 * @param {string} char The Unicode character.
 * @param {Array.<string>} answers List of expected speech translations for each
 *     available style.
 */
sre.AbstractCharacterTest.prototype.executeCharTest = function(char, answers) {
  var mtext = '<mtext>' + char + '</mtext>';  // Using mtext as it is irrelevant!
  for (var i = 0; i < answers.length; i++) {
    this.executeRuleTest(mtext, answers[i], this.styles[i]);
  }
};



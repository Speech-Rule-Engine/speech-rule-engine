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
 * @fileoverview Testcases for ChromeVox's speech rules.
 *     Abstract superclass that provides facilities to parameterize the speech
 *     rule engine and to execute rule tests on math expressions.
 * @author Volker.Sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.AbstractRuleTest');

goog.require('sre.AbstractExamples');



/**
 * @constructor
 * @extends {sre.AbstractExamples}
 */
sre.AbstractRuleTest = function() {
  goog.base(this);

  /**
   * @type {string}
   */
  this.style = 'default';

  /**
   * @type {string}
   */
  this.domain = 'default';

  /**
   * @type {boolean}
   */
  this.semantics = false;

  /**
   * Specify particular rule sets for a test. By default all available rule sets
   * are used.
   * @type {Array.<string>}
   */
  this.rules = null;
  
};
goog.inherits(sre.AbstractRuleTest, sre.AbstractExamples);


/**
 * Tests if for speech translation of a given html snippet is equal to the
 * answer provided.
 * @param {string} mml Snippet of a MathML expression.
 * @param {string} answer Expected speech translation of MathML expression.
 * @param {string=} opt_style Mathspeak style for translation.
 */
sre.AbstractRuleTest.prototype.executeRuleTest = function(mml, answer,
                                                          opt_style) {
  opt_style = opt_style || this.style;
  var mathMl = '<math xmlns="http://www.w3.org/1998/Math/MathML">' +
          mml + '</math>';
  this.appendExamples(mathMl);
  sre.SpeechRuleEngine.getInstance().clearCache();
  sre.System.getInstance().setupEngine(
    {semantics: this.semantics, domain: this.domain, style: opt_style,
     rules: this.rules});
  var result = sre.System.getInstance().toSpeech(mathMl);
  this.assert.equal(result, answer);
};



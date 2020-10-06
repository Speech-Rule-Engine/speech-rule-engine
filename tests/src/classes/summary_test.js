// Copyright (c) 2019 Volker Sorge
// Copyright (c) 2019 The MathJax Consortium
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
 * @fileoverview Testcases for summary speech generation.
 *
 * @author v.sorge@mathjax.org (Volker Sorge)
 */

goog.provide('sretest.SummaryTest');

goog.require('sretest.SpeechTest');



/**
 * @constructor
 * @extends {sretest.SpeechTest}
 */
sretest.SummaryTest = function() {
  sretest.SummaryTest.base(this, 'constructor');

  /**
   * @override
   */
  this.information = 'Summary Rule tests.';

  /**
   * @override
   */
  this.modality = 'summary';

  /**
   * Keyboard steps preceding speech computation.
   * @type {Array.<string>}
   */
  this.steps = null;

  this.pickFields.push('steps');

};
goog.inherits(sretest.SummaryTest, sretest.SpeechTest);


/**
 * @override
 */
sretest.SummaryTest.prototype.getSpeech = function(mathMl) {
  if (!this.steps) {
    return sretest.SummaryTest.base(this, 'getSpeech', mathMl);
  }
  sretest.TestExternal.sre.ProcessorFactory.process('walker', mathMl);
  this.steps.forEach(function(step) {
    sretest.TestExternal.sre.ProcessorFactory.process('move', sretest.TestExternal.sre.EventUtil.KeyCode[step]);
  });
  return sretest.TestExternal.sre.ProcessorFactory.process('move', sretest.TestExternal.sre.EventUtil.KeyCode['X']);
};


/**
 * @override
 */
sretest.SummaryTest.prototype.method = function(var_args) {
  let args = Array.prototype.slice.call(arguments, 0);
  this.steps = args[3];
  sretest.SummaryTest.base(this, 'method', args[0], args[1], args[2]);
  this.steps = null;
};


/**
 * @override
 */
sre.SummaryTest.prototype.appendRuleExample = function(
  input, output, style, rest) {
  sre.SummaryTest.base(
    this, 'appendRuleExample', input, output, style, [this.domain]);
};

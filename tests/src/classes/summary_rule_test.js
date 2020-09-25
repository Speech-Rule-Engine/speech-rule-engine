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

goog.provide('sre.SummaryRuleTest');

goog.require('sre.AbstractRuleTest');
goog.require('sre.TestRegister');



/**
 * @constructor
 * @extends {sre.AbstractRuleTest}
 */
sre.SummaryRuleTest = function() {
  sre.SummaryRuleTest.base(this, 'constructor');

  /**
   * @override
   */
  this.information = 'Summary Rule tests.';

  /**
   * @override
   */
  this.domain = 'mathspeak';

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
goog.inherits(sre.SummaryRuleTest, sre.AbstractRuleTest);


/**
 * @override
 */
sre.SummaryRuleTest.prototype.getSpeech = function(mathMl) {
  if (!this.steps) {
    return sre.SummaryRuleTest.base(this, 'getSpeech', mathMl);
  }
  sre.ProcessorFactory.process('walker', mathMl);
  this.steps.forEach(function(step) {
    sre.ProcessorFactory.process('move', sre.EventUtil.KeyCode[step]);
  });
  return sre.ProcessorFactory.process('move', sre.EventUtil.KeyCode['X']);
};


/**
 * @override
 */
sre.SummaryRuleTest.prototype.method = function(var_args) {
  let args = Array.prototype.slice.call(arguments, 0);
  this.steps = args[3];
  sre.SummaryRuleTest.base(this, 'method', args[0], args[1], args[2]);
  this.steps = null; 
};


sre.SummaryRuleTest.tests = function() {
  let files = [
    'summary_test.json'
  ];
  for (var locale of sre.Variables.LOCALES) {
    for (var file of files) {
      var test = new sre.SummaryRuleTest();
      test.jsonFile = locale + '/mathspeak/' + file;
      sre.TestRegister.add(test);
    }
  }
};

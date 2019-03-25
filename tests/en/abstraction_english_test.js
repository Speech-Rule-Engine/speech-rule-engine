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

goog.provide('sre.AbstractionEnglishTest');

goog.require('sre.AbstractRuleTest');



/**
 * @constructor
 * @extends {sre.AbstractRuleTest}
 */
sre.AbstractionEnglishTest = function() {
  sre.AbstractionEnglishTest.base(this, 'constructor');

  /**
   * @override
   */
  this.information = 'Abstraction English tests.';

  /**
   * @override
   */
  this.domain = 'mathspeak';

  /**
   * @override
   */
  this.semantics = true;

  this.setActive('AbstractionEnglish');
};
goog.inherits(sre.AbstractionEnglishTest, sre.AbstractRuleTest);


sre.AbstractionEnglishTest.prototype.executeRuleTest = function(mml, expected) {
  sre.System.getInstance().setupEngine(
      {semantics: true, locale: 'en', domain: 'mathspeak', style: 'default',
        speech: sre.Engine.Speech.NONE});
  var mathMl = '<math xmlns="http://www.w3.org/1998/Math/MathML">' +
      mml + '</math>';
  sre.ProcessorFactory.process('walker', mathMl);
  var actual = sre.ProcessorFactory.process('move', sre.EventUtil.KeyCode['X']);
  this.compareResult(mathMl, actual, expected);
};


/**
 * Testing Rule 1.1, Example 1.
 */
sre.AbstractionEnglishTest.prototype.testSample_1_1_1 = function() {
  var mml = '<mi>a</mi><mo>=</mo><mi>b</mi>';
  this.executeRuleTest(mml, 'equality');
};



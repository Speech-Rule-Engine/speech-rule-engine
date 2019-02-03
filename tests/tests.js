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
 * @fileoverview The module that initializes and runs the tests.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.Tests');

goog.require('sre.ApiTest');
goog.require('sre.ClearspeakAnnotationTest');
goog.require('sre.ClearspeakFrenchTest');
goog.require('sre.ClearspeakTest');
goog.require('sre.ColorPickerTest');
goog.require('sre.DomTest');
goog.require('sre.EnrichMathmlTest');
goog.require('sre.EnrichSpeechTest');
goog.require('sre.MarkupTest');
goog.require('sre.MathAlphabetsTest');
goog.require('sre.MathmlStoreTest');
goog.require('sre.MathspeakEmbellishFrenchTest');
goog.require('sre.MathspeakEmbellishSpanishTest');
goog.require('sre.MathspeakEmbellishTest');
goog.require('sre.MathspeakEnglishTest');
goog.require('sre.MathspeakFrenchTest');
goog.require('sre.MathspeakSpanishTest');
goog.require('sre.MmlcloudEnglishTest');
goog.require('sre.MmlcloudFrenchTest');
goog.require('sre.MmlcloudSpanishTest');
goog.require('sre.NobleEnglishTest');
goog.require('sre.NobleFrenchTest');
goog.require('sre.NobleSpanishTest');
goog.require('sre.PrefixRuleTest');
goog.require('sre.RebuildStreeTest');
goog.require('sre.SemanticApiTest');
goog.require('sre.SemanticRuleTest');
goog.require('sre.SemanticTreeTest');
goog.require('sre.SpeechRuleTest');
goog.require('sre.System');
goog.require('sre.TestRunner');
goog.require('sre.WalkerMarkupTest');
goog.require('sre.WalkerTest');



/**
 * @constructor
 */
sre.Tests = function() {
  this.runner = sre.TestRunner.getInstance();
};
goog.addSingletonGetter(sre.Tests);


/**
 * Runs the set of tests.
 */
sre.Tests.prototype.run = function() {
  var timeIn = (new Date()).getTime();
  for (var i = 0, test; test = sre.Tests.testList[i]; i++) {
    this.runner.registerTest(new test());
  }
  this.runner.runTests();
  this.runner.summary();
  var timeOut = (new Date()).getTime();
  this.runner.output('Time for tests: ' + (timeOut - timeIn) + 'ms\n');
  process.exit(this.runner.success() ? 0 : 1);
};


/**
 * List of tests to run. Add new tests here!
 * @type {Array}
 */
sre.Tests.testList = [
  sre.ApiTest,
  sre.ClearspeakAnnotationTest,
  sre.ColorPickerTest,
  sre.DomTest,
  sre.EnrichMathmlTest,
  sre.EnrichSpeechTest,
  sre.MarkupTest,
  sre.MathAlphabetsTest,
  sre.MathmlStoreTest,
  sre.MathspeakEmbellishTest,
  sre.MathspeakEmbellishFrenchTest,
  sre.MathspeakEmbellishSpanishTest,
  sre.MathspeakEnglishTest,
  sre.MathspeakFrenchTest,
  sre.MathspeakSpanishTest,
  sre.MmlcloudEnglishTest,
  sre.MmlcloudFrenchTest,
  sre.MmlcloudSpanishTest,
  sre.NobleEnglishTest,
  sre.NobleFrenchTest,
  sre.NobleSpanishTest,
  sre.PrefixRuleTest,
  sre.RebuildStreeTest,
  sre.SemanticApiTest,
  sre.SemanticRuleTest,
  sre.SemanticTreeTest,
  sre.SpeechRuleTest,
  sre.WalkerMarkupTest,
  sre.WalkerTest
];
sre.Tests.testList = sre.Tests.testList.concat(sre.ClearspeakTest.testList),
sre.Tests.testList = sre.Tests.testList.concat(sre.ClearspeakFrenchTest.testList),
// sre.Tests.testList = sre.ClearspeakTest.testList;


/**
 * Execute tests.
 */
sre.Tests.getInstance().run();

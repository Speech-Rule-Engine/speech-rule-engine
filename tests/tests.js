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

goog.require('sre.MathmlStoreTest');
goog.require('sre.SemanticTreeTest');
goog.require('sre.SpeechRuleTest');
goog.require('sre.System');
goog.require('sre.TestRunner');



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
  for (var i = 0, test; test = sre.Tests.testList[i]; i++) {
    this.runner.registerTest(new test);
  }
  this.runner.runTests();
  this.runner.summary();
};


/**
 * List of tests to run. Add new tests here!
 * @type {Array}
 */
sre.Tests.testList = [
  sre.MathmlStoreTest,
  sre.SemanticTreeTest,
  sre.SpeechRuleTest
];


/**
 * Execute tests.
 */
sre.Tests.getInstance().run();

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

goog.require('sre.BaseTests');
goog.require('sre.BrailleNemethTest');
goog.require('sre.ClearspeakRuleTest');
goog.require('sre.SpeechEnglishTest');
goog.require('sre.SpeechFrenchTest');
goog.require('sre.SpeechGermanTest');
goog.require('sre.SpeechSpanishTest');
goog.require('sre.TestRunner');

goog.require('sre.AbstractCharacterTest');
goog.require('sre.ClearspeakRuleTest');
goog.require('sre.MathspeakRuleTest');
goog.require('sre.SemanticTest');
goog.require('sre.TestRegister');


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
    var obj = new test();
    this.runner.registerTest(obj);
  }
  this.runner.runTests();
  this.runner.summary();
  var timeOut = (new Date()).getTime();
  this.runner.output('Time for tests: ' + (timeOut - timeIn) + 'ms\n');
  // sre.AbstractCharacterTest.testOutput();
  process.exit(this.runner.success() ? 0 : 1);
};


/**
 * List of tests to run. Add new tests here!
 * @type {Array}
 */
sre.Tests.testList = [];

sre.Tests.environment = {};
sre.Tests.environmentVars = ['FILE', 'FILES', 'LOCALE', 'BLOCK', 'JSON', 'VERBOSE'];
sre.Tests.getEnvironment = function(variable) {
  var env = sre.SystemExternal.process.env[variable];
  // Process here.
  if (!env) return;
  if (env === 'true' || env === 'false') {
    sre.Tests.environment[variable] = JSON.parse(env);
    return;
  }
  sre.Tests.environment[variable] = env.split(',');
};
sre.Tests.environmentVars.forEach(sre.Tests.getEnvironment);

console.log(sre.Tests.environment);

/**
 * @type {Array}
 */
sre.Tests.allTests = [];
sre.Tests.allTests = sre.Tests.allTests.concat(sre.BaseTests.testList);
sre.Tests.allTests = sre.Tests.allTests.concat(sre.SpeechEnglishTest.testList);
sre.Tests.allTests = sre.Tests.allTests.concat(sre.SpeechFrenchTest.testList);
sre.Tests.allTests = sre.Tests.allTests.concat(sre.SpeechGermanTest.testList);
sre.Tests.allTests = sre.Tests.allTests.concat(sre.SpeechSpanishTest.testList);
sre.Tests.allTests = sre.Tests.allTests.concat(sre.BrailleNemethTest.testList);

var file = sre.Tests.environment['FILE'];
var locale = sre.Tests.environment['LOCALE'];
if (file) {
  sre.Tests.testList = file.map(function(x) {return sre[x];});
}
if (locale) {
  locale = locale[0];
  // console.log(locale);
  if (locale === 'Base') {
    sre.Tests.testList = sre.Tests.testList.concat(sre.BaseTests.testList);
  } else {
    try {
      if (sre['Speech' + locale + 'Test']) {
        sre.Tests.testList =
            sre.Tests.testList.concat(sre['Speech' + locale + 'Test'].testList);
      }
      if (sre['Braille' + locale + 'Test']) {
        sre.Tests.testList =
            sre.Tests.testList.concat(sre['Braille' + locale + 'Test'].testList);
      }
    } catch (e) { }
  }
}
if (!sre.Tests.testList.length) {
  sre.Tests.testList = sre.Tests.testList.concat(sre.Tests.allTests);
}

sre.Tests.getInstance().runner.warn = sre.Tests.environment['WARN'] || 1;

sre.Tests.getInstance().runner.verbose = sre.Tests.environment['VERBOSE'];

if (sre.Tests.environment['JSON']) {
  sre.SemanticTest.tests();
  sre.ClearspeakRuleTest.tests();
  sre.MathspeakRuleTest.tests();
  sre.AbstractCharacterTest.tests();
  let files = sre.Tests.environment['FILES'] || Object.keys(sre.TestRegister.map);
  for (var key of files) {
    // let [locale, block, file] = key;
    // TODO: Filter for file or locale or category
    var test = sre.TestRegister.map[key];
    if (test) {
      sre.Tests.getInstance().runner.registerTest(test);
    }
  }
}
/**
 * Execute tests.
 */
sre.Tests.getInstance().run();

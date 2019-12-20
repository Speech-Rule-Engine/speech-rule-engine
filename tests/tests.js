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
goog.require('sre.SpeechEnglishTest');
goog.require('sre.SpeechFrenchTest');
goog.require('sre.SpeechSpanishTest');
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
  var timeIn = (new Date()).getTime();
  for (var i = 0, test; test = sre.Tests.testList[i]; i++) {
    this.runner.registerTest(new test());
  }
  this.runner.runTests();
  this.runner.summary();
  var timeOut = (new Date()).getTime();
  this.runner.output('Time for tests: ' + (timeOut - timeIn) + 'ms\n');

  
  var constraints = {
    en: {
      default: ['default', 'short', 'alternative'],
      mathspeak: ['default', 'brief', 'sbrief'],
      clearspeak: ['default']
    },
    es: {
      default: ['default'],
      mathspeak: ['default', 'brief', 'sbrief']
    },
    fr: {
      default: ['default'],
      mathspeak: ['default', 'brief', 'sbrief'],
      clearspeak: ['default']
    },
    nemeth: {
      default: ['default']
    }
  };
  var stores = sre.MathMap.getInstance().store['subStores_'];
  var allRules = {};
  sre.Variables.LOCALES.forEach(function(loc) {
    allRules[loc] = [];
  });
  var keys = Object.keys(stores);
  for (var loc of Object.keys(constraints)) {
    var modality = loc === 'nemeth' ? 'braille' : 'speech';
    for (var dom of Object.keys(constraints[loc])) {
      for (var key of keys) {
        var xml = sre.DomUtil.createTextNode(key);
        var aural = sre.AuralRendering.getInstance();
        var result = [loc, modality, dom, key];
        for (var style of constraints[loc][dom]) {
          sre.System.getInstance().setupEngine({
            domain: dom, modality: modality, locale: loc, style: style});
          var descrs = sre.SpeechGeneratorUtil.computeSpeech(xml);
          result.push(aural.finalize(aural.markup(descrs)));
          allRules[loc].push(result);
        }
        console.log(`${result[0]}, ${result[2]}, "${result.slice(3).join('", "')}"`);
      }
    }
  }

  process.exit(this.runner.success() ? 0 : 1);
};


/**
 * List of tests to run. Add new tests here!
 * @type {Array}
 */
sre.Tests.testList = [];

sre.Tests.allTests = [];
sre.Tests.allTests = sre.Tests.allTests.concat(sre.BaseTests.testList);
sre.Tests.allTests = sre.Tests.allTests.concat(sre.SpeechEnglishTest.testList);
sre.Tests.allTests = sre.Tests.allTests.concat(sre.SpeechFrenchTest.testList);
sre.Tests.allTests = sre.Tests.allTests.concat(sre.SpeechSpanishTest.testList);
sre.Tests.allTests = sre.Tests.allTests.concat(sre.BrailleNemethTest.testList);

var file = sre.SystemExternal.process.env['FILE'];
var locale = sre.SystemExternal.process.env['LOCALE'];
if (file) {
  sre.Tests.testList.push(sre[file]);
}
if (locale) {
  if (locale === 'Base') {
    sre.Tests.testList = sre.Tests.testList.concat(sre.BaseTests.testList);
  } else {
    try {
      sre.Tests.testList =
          sre.Tests.testList.concat(sre['Speech' + locale + 'Test'].testList);
    } catch (e) { }
  }
}
if (!sre.Tests.testList.length) {
  sre.Tests.testList = sre.Tests.testList.concat(sre.Tests.allTests);
}


/**
 * Execute tests.
 */
sre.Tests.getInstance().run();

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
goog.require('sre.ExampleFiles');
goog.require('sre.TestFactory');
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
    var obj = new test();
    this.runner.registerTest(obj);
  }
  this.runner.runTests();
  this.runner.summary();
  var timeOut = (new Date()).getTime();
  this.runner.outputLine(0, 'Time for tests: ' + (timeOut - timeIn) + 'ms');
  sre.ExampleFiles.closeFiles();
  process.exit(this.runner.success() ? 0 : 1);
};


/**
 * List of tests to run. Add new tests here!
 * @type {Array}
 */
sre.Tests.testList = [];

sre.Tests.environment = {
  JSON: true,
  VERBOSE: 2,
  WARN: 1
};
sre.Tests.environmentVars = ['FILE', 'FILES', 'LOCALE', 'BLOCK', 'JSON', 'VERBOSE', 'WARN'];
sre.Tests.getEnvironment = function(variable) {
  var env = sre.SystemExternal.process.env[variable];
  // Process here.
  if (!env) return;
  if (env === 'true' || env === 'false') {
    sre.Tests.environment[variable] = JSON.parse(env);
    return;
  }
  var number = parseInt(env, 10);
  if (!isNaN(number)) {
    sre.Tests.environment[variable] = number;
    return;
  }
  sre.Tests.environment[variable] = env.split(',');
};
sre.Tests.environmentVars.forEach(sre.Tests.getEnvironment);


/**
 * @type {Array}
 */
sre.Tests.allTests = [];
sre.Tests.allTests = sre.Tests.allTests.concat(sre.BaseTests.testList);

var file = sre.Tests.environment['FILE'];
var locale = sre.Tests.environment['LOCALE'];
if (file) {
  sre.Tests.testList = file.map(function(x) {return sre[x];});
}
if (locale && locale[0] === 'Base') {
  sre.Tests.testList = sre.Tests.testList.concat(sre.BaseTests.testList);
}
if (!sre.Tests.testList.length) {
  sre.Tests.testList = sre.Tests.testList.concat(sre.Tests.allTests);
}

sre.Tests.getInstance().runner.warn = sre.Tests.environment['WARN'];

sre.Tests.getInstance().runner.verbose = sre.Tests.environment['VERBOSE'];

// Load all json files from the expected directory

sre.Tests.allJson = function() {
  let json = [];
  sre.Tests.readDir_('', json);
  return json;
};


sre.Tests.readDir_ = function (path, result) {
  if (typeof path === 'undefined') return;
  let file = sre.TestUtil.path.EXPECTED + path;
  if (sre.SystemExternal.fs.lstatSync(file).isDirectory()) {
    var files = sre.SystemExternal.fs.readdirSync(file);
    files.forEach(function (x) {
      sre.Tests.readDir_(path ? path + '/' + x : x, result);
    });
    return;
  }
  if (path.match(/\.json$/)) {
    result.push(path);
  }
};


if (sre.Tests.environment['JSON']) {
  let files = sre.Tests.environment['FILES'] || sre.Tests.allJson();
  for (var key of files) {
    // TODO: Filter for file or locale or category
    // Maybe apply filter to allJson.
    // let [locale, block, file] = key.split('/');
    var test = sre.TestFactory.get(key);
    if (test) {
      sre.Tests.getInstance().runner.registerTest(test);
    }
  }
}


/**
 * Execute tests.
 */
sre.Tests.getInstance().run();

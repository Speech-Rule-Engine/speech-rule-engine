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

goog.provide('sretest.Tests');

goog.require('sretest.BaseTests');
goog.require('sretest.ExampleFiles');
goog.require('sretest.TestFactory');
goog.require('sretest.TestRunner');



/**
 * @constructor
 */
sretest.Tests = function() {
  this.runner = sretest.TestRunner.getInstance();
};
goog.addSingletonGetter(sretest.Tests);


/**
 * Runs the set of tests.
 */
sretest.Tests.prototype.run = function() {
  var timeIn = (new Date()).getTime();
  for (var i = 0, test; test = sretest.Tests.testList[i]; i++) {
    var obj = new test();
    this.runner.registerTest(obj);
  }
  this.runner.runTests();
  this.runner.summary();
  var timeOut = (new Date()).getTime();
  this.runner.outputLine(0, 'Time for tests: ' + (timeOut - timeIn) + 'ms');
  sretest.ExampleFiles.closeFiles();
  process.exit(this.runner.success() ? 0 : 1);
};


/**
 * List of tests to run. Add new tests here!
 * @type {Array}
 */
sretest.Tests.testList = [];


/**
 * @type {Object.<number|boolean|Array.<string>>}
 */
sretest.Tests.environment = {
  JSON: true,
  VERBOSE: 2,
  WARN: 1
};


/**
 * @type {Array.<string>}
 */
sretest.Tests.environmentVars = [
  'FILE', 'FILES', 'LOCALE', 'BLOCK', 'JSON', 'VERBOSE', 'WARN'];


/**
 * Fills the list of environment variables.
 * @param {string} variable The variable name.
 */
sretest.Tests.getEnvironment = function(variable) {
  var env = sretest.TestExternal.process.env[variable];
  // Process here.
  if (!env) return;
  if (env === 'true' || env === 'false') {
    sretest.Tests.environment[variable] = /** @type {boolean} */(JSON.parse(env));
    return;
  }
  var number = parseInt(env, 10);
  if (!isNaN(number)) {
    sretest.Tests.environment[variable] = number;
    return;
  }
  sretest.Tests.environment[variable] = env.split(',');
};
sretest.Tests.environmentVars.forEach(sretest.Tests.getEnvironment);


/**
 * @type {Array}
 */
sretest.Tests.allTests = [];
sretest.Tests.allTests = sretest.Tests.allTests.concat(sretest.BaseTests.testList);

var file = sretest.Tests.environment['FILE'];
var locale = sretest.Tests.environment['LOCALE'];
if (file) {
  sretest.Tests.testList = file.map(function(x) {return sre[x];});
}
if (locale && locale[0] === 'Base') {
  sretest.Tests.testList = sretest.Tests.testList.concat(sretest.BaseTests.testList);
}
if (!sretest.Tests.testList.length) {
  sretest.Tests.testList = sretest.Tests.testList.concat(sretest.Tests.allTests);
}


// This is set via string fields to please the linter!
sretest.Tests.getInstance().runner['warn'] = sretest.Tests.environment['WARN'];
sretest.Tests.getInstance().runner['verbose'] = sretest.Tests.environment['VERBOSE'];


/**
 * Load all json files from the expected directory
 * @return {Array.<string>} A list of all json file path names.
 */
sretest.Tests.allJson = function() {
  let json = [];
  sretest.Tests.readDir_('', json);
  return json;
};


/**
 * Recursively find all files with .json extension under the given path.
 * @param {string} path The top pathname.
 * @param {Array.<string>} result Accumulator for pathnames.
 * @private
 */
sretest.Tests.readDir_ = function(path, result) {
  if (typeof path === 'undefined') return;
  let file = sretest.TestUtil.path.EXPECTED + path;
  if (sretest.TestExternal.fs.lstatSync(file).isDirectory()) {
    var files = sretest.TestExternal.fs.readdirSync(file);
    files.forEach(function(x) {
      sretest.Tests.readDir_(path ? path + '/' + x : x, result);
    });
    return;
  }
  if (path.match(/\.json$/)) {
    result.push(path);
  }
};


if (sretest.Tests.environment['JSON']) {
  let files = /** @type {!Array<string>} */(
      sretest.Tests.environment['FILES'] || sretest.Tests.allJson());
  for (var key of files) {
    // TODO: Filter for file or locale or category
    // Maybe apply filter to allJson.
    // let [locale, block, file] = key.split('/');
    var test = sretest.TestFactory.get(key);
    if (test) {
      sretest.Tests.getInstance().runner.registerTest(test);
    }
  }
}


/**
 * Execute tests.
 */
sretest.Tests.getInstance().run();

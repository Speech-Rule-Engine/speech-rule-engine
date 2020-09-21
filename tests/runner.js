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
 * @fileoverview An implementation of a test runner.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.TestRunner');

goog.require('sre.TestExternal');



/**
 * @constructor
 */
sre.TestRunner = function() {

  /**
   * Overall test status.
   * @type {string}
   * @private
   */
  this.status_ = sre.TestRunner.Results.PASS;

  /**
   * List of failed tests.
   * @type {Array.<string>}
   * @private
   */
  this.failedTests_ = [];

  /**
   * List of failed tests.
   * @type {Array.<string>}
   * @private
   */
  this.succeededTests_ = [];

  /**
   * List of warnings.
   * @type {Array.<string>}
   * @private
   */
  this.warningTests_ = [];

  /**
   * Queue of test objects.
   * @type {Array.<sre.AbstractTest>}
   * @private
   */
  this.testQueue_ = [];

  /**
   * Warning level.
   * @type {number}
   */
  this.warn = sre.TestRunner.Warning.WARN;

  this.verbose = false;
  
};
goog.addSingletonGetter(sre.TestRunner);


/**
 * 
 * @enum {number}
 */
sre.TestRunner.Warning = {
  NONE: 0,
  WARN: 1,
  ERROR: 2
};


/**
 * @enum {string}
 */
sre.TestRunner.Results = {
  PASS: 'pass',
  FAIL: 'fail',
  WARN: 'warn'
};


/**
 * Success status of the runner.
 * @return {boolean} True if tests have passed.
 */
sre.TestRunner.prototype.success = function() {
  return this.status_ == sre.TestRunner.Results.PASS;
};


/**
 * Registers an test object to be run with this runner.
 * @param {sre.AbstractTest} test A test case that is added to the runner.
 */
sre.TestRunner.prototype.registerTest = function(test) {
  this.testQueue_.push(test);
};


/**
 * Test case runner.
 */
sre.TestRunner.prototype.runTests = function() {
  for (var i = 0, test; test = this.testQueue_[i]; i++) {
    if (test.jsonFile) {
      this.executeJsonTests(test);
    } else {
      this.executeTests(test);
    }
  }
};


sre.TestRunner.prototype.executeJsonTests = function(testcase) {
  try {
    testcase.prepare();
    this.output('\nRunning ' + testcase.information + '\n');
  } catch (e) {
    if (e.message.match(/Bad\ filename/)) {
      this.status_ = sre.TestRunner.Results.FAIL;
      this.failedTests_.push(e.message + ' ' + e.value);
      return;
    }
    this.output('\nRunning ' + testcase.information + '\n');
    if (this.warn) {
      for (var warn of e.value) {
        this.output('No results specified for test: ' + warn);
        this.output('\t[WARN]\n', sre.TestRunner.color_.ORANGE);
        this.warningTests_.push(warn);
      }
      if (this.warn == sre.TestRunner.Warning.ERROR) {
        this.status_ = sre.TestRunner.Results.FAIL;
      }
    }
  }
  testcase.setUpTest();
  for (var test of testcase.inputTests) {
    if (!test.test) continue;
    this.executeJsonTest(test.name, goog.bind(testcase.method, testcase), testcase.pick(test));
  }
  testcase.tearDownTest();
};

sre.TestRunner.prototype.executeJsonTest = function(name, func, args) {
  this.executeTest_(name, function() {func.apply(null, args);});
};

/**
 * Execute single tests.
 * @param {sre.AbstractTest} testcase The current test case to run.
 */
sre.TestRunner.prototype.executeTests = function(testcase) {
  this.output('\nRunning ' + testcase.information + '\n');
  testcase.setUpTest();
  for (var propertyName in testcase) {
    if (propertyName.search('test') == 0) {
      this.executeTest_(propertyName,
                        goog.bind(testcase[propertyName], testcase));
    }
  }
  testcase.tearDownTest();
};


/**
 * Execute a single tests.
 * @param {string} name Function name.
 * @param {Function} func Function to be executed.
 * @private
 */
sre.TestRunner.prototype.executeTest_ = function(name, func) {
  this.output('Testing ' + name);
  try {
    func.apply();
  } catch (e) {
    this.output('\t[FAIL]', sre.TestRunner.color_.RED);
    this.output('\nExpected: ' + (e.expected || ''));
    this.output('\nActual: ' + (e.actual || '') + '\n');
    this.status_ = sre.TestRunner.Results.FAIL;
    this.failedTests_.push(name);
    return;
  }
  this.output('\t[PASS]\n', sre.TestRunner.color_.GREEN);
  this.succeededTests_.push(name);
  return;
};


/**
 * Prints a summary of the test runs.
 */
sre.TestRunner.prototype.summary = function() {
  this.verbose = true;
  if (this.warn && this.warningTests_.length) {
    this.output('WARNING! ', sre.TestRunner.color_.ORANGE);
    this.output('The following tests produced a warning:\n');
    this.output(this.warningTests_.join(', ') + '\n');
  }
  if (!this.success()) {
    this.output('FAILURE! ', sre.TestRunner.color_.RED);
    this.output('The following tests failed:\n');
    this.output(this.failedTests_.join(', ') + '\n');
  } else {
    this.output('SUCCESS!\n', sre.TestRunner.color_.GREEN);
  }
  this.output(this.succeededTests_.length + ' tests successful.\n');
};


/**
 * Console colors.
 * @enum {string}
 * @private
 */
sre.TestRunner.color_ = {
  RED: '\u001B\u005B\u0033\u0031\u006D',
  GREEN: '\u001B\u005B\u0033\u0032\u006D',
  ORANGE: '\u001B\u005B\u0033\u0033\u006D',
  WHITE: '\u001B\u005B\u0033\u0037\u006D'
};


/**
 * Prints information to the console.
 * @param {string} output The output string.
 * @param {sre.TestRunner.color_=} opt_color An optional color argument.
 */
sre.TestRunner.prototype.output = function(output, opt_color) {
  if (!this.verbose) return;
  if (!opt_color) {
    sre.TestExternal.process.stdout.write(output);
    return;
  }
  var match = output.match(/^(\s*)([^\s]*)(\s*)$/);
  sre.TestExternal.process.stdout.write(
    match[1] + opt_color + match[2] + sre.TestRunner.color_.WHITE + match[3]);
};



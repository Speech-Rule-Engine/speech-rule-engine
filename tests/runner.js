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
  this.status_ = sre.TestRunner.PASS;

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
   * Queue of test objects.
   * @type {Array.<sre.AbstractTest>}
   * @private
   */
  this.testQueue_ = [];
};
goog.addSingletonGetter(sre.TestRunner);


/**
 * @type {string}
 * @const
 */
sre.TestRunner.PASS = 'pass';


/**
 * @type {string}
 * @const
 */
sre.TestRunner.FAIL = 'fail';


/**
 * Success status of the runner.
 * @return {boolean} True if tests have passed.
 */
sre.TestRunner.prototype.success = function() {
  return this.status_ == sre.TestRunner.PASS;
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
    this.output('\nRunning ' + test.information + '\n');
    this.executeTests(test);
    if (test.jsonFile) {
      this.executeJsonTests(test);
    }
  }
};


sre.TestRunner.prototype.executeJsonTests = function(testcase) {
  testcase.prepare();
  testcase.setUpTest();
  for (var test of testcase.jsonTests) {
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
  this.output('Running ' + name);
  try {
    func.apply();
  } catch (e)
  {
    console.log(e);
    this.output('\t[FAIL]\n', sre.TestRunner.color_.RED);
    this.status_ = sre.TestRunner.FAIL;
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
  if (!this.success()) {
    this.output('FAILURE! ', sre.TestRunner.color_.RED);
    this.output('The following tests failed:\n');
    this.output(this.failedTests_.join(', ') + '\n');
  } else {
    this.output('SUCCESS!\n', sre.TestRunner.color_.GREEN);
  }
  this.output(this.succeededTests_.length + ' test successful.\n');
};


/**
 * Console colors.
 * @enum {string}
 * @private
 */
sre.TestRunner.color_ = {
  RED: '\u001B\u005B\u0033\u0031\u006D',
  GREEN: '\u001B\u005B\u0033\u0032\u006D',
  WHITE: '\u001B\u005B\u0033\u0037\u006D'
};


/**
 * Prints information to the console.
 * @param {string} output The output string.
 * @param {sre.TestRunner.color_=} opt_color An optional color argument.
 */
sre.TestRunner.prototype.output = function(output, opt_color) {
  opt_color = opt_color || sre.TestRunner.color_.WHITE;
  sre.TestExternal.process.stdout.write(opt_color +
      output +
      sre.TestRunner.color_.WHITE);
};



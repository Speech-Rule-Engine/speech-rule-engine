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

goog.provide('sretest.TestRunner');

goog.require('sretest.TestExternal');



/**
 * @constructor
 */
sretest.TestRunner = function() {

  /**
   * Overall test status.
   * @type {string}
   * @private
   */
  this.status_ = sretest.TestRunner.Results.PASS;

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
   * @type {Array.<sretest.AbstractTest>}
   * @private
   */
  this.testQueue_ = [];

  /**
   * Warning level.
   * @type {number}
   */
  this.warn = sretest.TestRunner.Warning.WARN;

  /**
   * Verbosity level.
   * @type {number}
   */
  this.verbose = 2;

  /**
   * Strings to be output on a single line once its end is reached.
   * @type {Array.<string>}
   */
  this.outputQueue = [];
};
goog.addSingletonGetter(sretest.TestRunner);


/**
 *
 * @enum {number}
 */
sretest.TestRunner.Warning = {
  NONE: 0,
  WARN: 1,
  ERROR: 2
};


/**
 * @enum {string}
 */
sretest.TestRunner.Results = {
  PASS: 'pass',
  FAIL: 'fail',
  WARN: 'warn'
};


/**
 * Success status of the runner.
 * @return {boolean} True if tests have passed.
 */
sretest.TestRunner.prototype.success = function() {
  return this.status_ == sretest.TestRunner.Results.PASS;
};


/**
 * Registers an test object to be run with this runner.
 * @param {sretest.AbstractTest} test A test case that is added to the runner.
 */
sretest.TestRunner.prototype.registerTest = function(test) {
  this.testQueue_.push(test);
};


/**
 * Test case runner.
 */
sretest.TestRunner.prototype.runTests = function() {
  for (var i = 0, test; test = this.testQueue_[i]; i++) {
    if (test instanceof sretest.AbstractJsonTest) {
      this.executeJsonTests(test);
    } else {
      this.executeTests(test);
    }
  }
};


/**
 * Executes all Json tests provided by the test case.
 * @param {sretest.AbstractJsonTest} testcase The Json test object.
 */
sretest.TestRunner.prototype.executeJsonTests = function(testcase) {
  try {
    testcase.prepare();
  } catch (e) {
    if (e.message.match(/Bad\ filename/)) {
      this.status_ = sretest.TestRunner.Results.FAIL;
      this.failedTests_.push(e.message + ' ' + e.value);
      return;
    }
  }
  this.outputLine(1, 'Running ' + testcase.information);
  if (this.warn && testcase.warn.length) {
    for (var warn of testcase.warn) {
      this.outputStart('No results specified for test: ' + warn);
      this.outputEnd(2, '[WARN]', sretest.TestRunner.color_.ORANGE);
      this.warningTests_.push(warn);
    }
    if (this.warn == sretest.TestRunner.Warning.ERROR) {
      this.status_ = sretest.TestRunner.Results.FAIL;
    }
  }
  testcase.setUpTest();
  for (var test of testcase.inputTests) {
    if (!test.test) continue;
    this.executeJsonTest(
        test.name, goog.bind(testcase.method, testcase), testcase.pick(test));
  }
  testcase.tearDownTest();
};


/**
 * Executes a single Json test.
 * @param {string} name The name of the test.
 * @param {function(...string)} func The actual test function.
 * @param {Array.<string>} args A list of arguments.
 */
sretest.TestRunner.prototype.executeJsonTest = function(name, func, args) {
  this.executeTest_(name, function() {func.apply(null, args);});
};


/**
 * Execute single tests.
 * @param {sretest.AbstractTest} testcase The current test case to run.
 */
sretest.TestRunner.prototype.executeTests = function(testcase) {
  this.outputLine(1, 'Running ' + testcase.information);
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
sretest.TestRunner.prototype.executeTest_ = function(name, func) {
  this.outputStart('Testing ' + name);
  try {
    func.apply();
  } catch (e) {
    this.outputEnd(1, '[FAIL]', sretest.TestRunner.color_.RED);
    this.outputLine(1, 'Actual: ' + (e.actual || ''));
    this.outputLine(1, 'Expected: ' + (e.expected || ''));
    this.status_ = sretest.TestRunner.Results.FAIL;
    this.failedTests_.push(name);
    return;
  }
  this.outputEnd(2, '[PASS]', sretest.TestRunner.color_.GREEN);
  this.succeededTests_.push(name);
  return;
};


/**
 * Prints a summary of the test runs.
 */
sretest.TestRunner.prototype.summary = function() {
  if (this.warn && this.warningTests_.length) {
    this.outputLine(0, 'WARNING!', sretest.TestRunner.color_.ORANGE);
    this.outputLine(0, 'The following tests produced a warning:');
    this.outputLine(0, this.warningTests_.join(', '));
  }
  if (!this.success()) {
    this.outputLine(0, 'FAILURE!', sretest.TestRunner.color_.RED);
    this.outputLine(0, 'The following tests failed:');
    this.outputLine(0, this.failedTests_.join(', '));
  } else {
    this.outputLine(0, 'SUCCESS!', sretest.TestRunner.color_.GREEN);
  }
  this.outputLine(0, this.succeededTests_.length + ' tests successful.');
};


/**
 * Console colors.
 * @enum {string}
 * @private
 */
sretest.TestRunner.color_ = {
  RED: '\u001B\u005B\u0033\u0031\u006D',
  GREEN: '\u001B\u005B\u0033\u0032\u006D',
  ORANGE: '\u001B\u005B\u0033\u0033\u006D',
  WHITE: '\u001B\u005B\u0033\u0037\u006D'
};


/**
 * Prints information to the console if it has priority greater or equal to
 * verbosity mode.
 * @param {number} priority The output priority.
 * @param {string} output The output string.
 */
sretest.TestRunner.prototype.output = function(priority, output) {
  if (priority <= this.verbose) {
    sretest.TestExternal.process.stdout.write(output);
  }
};


/**
 * Colors information for printing.
 * @param {string} output The output string.
 * @param {sretest.TestRunner.color_|undefined} color An optional color argument.
 * @return {string} The colored string.
 */
sretest.TestRunner.prototype.outputColor = function(output, color) {
  return color ? color + output + sretest.TestRunner.color_.WHITE : output;
};


/**
 * Prints information to the console. This always forces a line, unless verbose
 * is 0.
 * @param {number} priority The output priority.
 * @param {string} output The output string.
 * @param {sretest.TestRunner.color_=} opt_color An optional color argument.
 */
sretest.TestRunner.prototype.outputLine = function(priority, output, opt_color) {
  output = this.outputColor(output, opt_color);
  var mid = 80 - output.length;
  output = output + new Array(mid > 0 ? mid + 1 : 1).join(' ');
  this.output(priority, '\r' + output + '\n');
};


/**
 * Queues information for printing.
 * @param {string} output The output string.
 * @param {sretest.TestRunner.color_=} opt_color An optional color argument.
 */
sretest.TestRunner.prototype.outputStart = function(output, opt_color) {
  this.outputQueue.push(this.outputColor(output, opt_color));
};


/**
 * Prints the queued information on a spanning line. This only forces a line,
 * when verbose is set to 2.
 * @param {number} priority The output priority.
 * @param {string} output The output string.
 * @param {sretest.TestRunner.color_=} opt_color An optional color argument.
 */
sretest.TestRunner.prototype.outputEnd = function(priority, output, opt_color) {
  output = this.outputColor(output, opt_color);
  var start = this.outputQueue.join(' ');
  var mid = 80 - (start.length + output.length);
  output = start + new Array(mid > 0 ? mid + 1 : 1).join(' ') + output;
  output = (this.verbose === 3) ? output + '\n' :
      (priority <= 1 ? '\r' + output + '\n' : '\r' + output);
  this.output(priority, output);
  this.outputQueue = [];
};

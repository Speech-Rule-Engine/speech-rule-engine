//
// Copyright 2014 Volker Sorge
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//      http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview An implementation of a test runner.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import {AbstractTest} from '../classes/abstract_test';
import {AbstractJsonTest} from '../classes/abstract_test';

enum Warning {NONE, WARN, ERROR}

enum Results {
  PASS = 'pass',
  FAIL = 'fail',
  WARN = 'warn'}

/**
 * Console colors.
 */
enum Color {
  RED = '\u001B\u005B\u0033\u0031\u006D',
  GREEN = '\u001B\u005B\u0033\u0032\u006D',
  ORANGE = '\u001B\u005B\u0033\u0033\u006D',
  WHITE = '\u001B\u005B\u0033\u0037\u006D'
}

export class TestRunner {

  /**
   * Warning level of the runner.
   */
  public warn: Warning;

  /**
   * Verbosity level.
   */
  public verbose: number = 2;

  /**
   * Strings to be output on a single line once its end is reached.
   */
  public outputQueue: string[] = [];

  private status_: string;

  /**
   * List of failed tests.
   */
  private failedTests_: string[] = [];

  /**
   * List of failed tests.
   */
  private succeededTests_: string[] = [];

  /**
   * List of warnings.
   */
  private warningTests_: string[] = [];

  /**
   * Queue of test objects.
   */
  private testQueue_: AbstractTest[] = [];
  constructor() {
    /**
     * Overall test status.
     */
    this.status_ = Results.PASS;
    /**
     * Warning level.
     */
    this.warn = Warning.WARN;
  }

  /**
   * Success status of the runner.
   * @return True if tests have passed.
   */
  public success(): boolean {
    return this.status_ == Results.PASS;
  }

  /**
   * Registers an test object to be run with this runner.
   * @param test A test case that is added to the runner.
   */
  public registerTest(test: AbstractTest) {
    this.testQueue_.push(test);
  }

  /**
   * Test case runner.
   */
  public runTests() {
    for (let i = 0, test; test = this.testQueue_[i]; i++) {
      if (test instanceof AbstractJsonTest) {
        this.executeJsonTests(test);
      } else {
        this.executeTests(test);
      }
    }
  }

  /**
   * Executes all Json tests provided by the test case.
   * @param testcase The Json test object.
   */
  public executeJsonTests(testcase: AbstractJsonTest) {
    try {
      testcase.prepare();
    } catch (e) {
      if (e.message.match(/Bad filename/)) {
        this.status_ = Results.FAIL;
        this.failedTests_.push(e.message + ' ' + e.value);
        return;
      }
    }
    this.outputLine(1, 'Running ' + testcase.information);
    if (this.warn && testcase.warn.length) {
      for (let warn of testcase.warn) {
        this.outputStart('No results specified for test: ' + warn);
        this.outputEnd(2, '[WARN]', Color.ORANGE);
        this.warningTests_.push(warn);
      }
      if (this.warn === Warning.ERROR) {
        this.status_ = Results.FAIL;
      }
    }
    testcase.setUpTest();
    for (let test of testcase.inputTests) {
      if (!test.test) {
        continue;
      }
      this.executeJsonTest(
        test.name, testcase.method.bind(testcase), testcase.pick(test));
    }
    testcase.tearDownTest();
  }

  /**
   * Executes a single Json test.
   * @param name The name of the test.
   * @param func The actual test function.
   * @param args A list of arguments.
   */
  public executeJsonTest(name: string,
                         func: (...p1: string[]) => any, args: string[]) {
    this.executeTest(name,
                      function() {
                        func.apply(null, args);
                      });
  }

  /**
   * Execute single tests.
   * @param testcase The current test case to run.
   */
  public executeTests(testcase: AbstractTest) {
    this.outputLine(1, 'Running ' + testcase.information);
    testcase.setUpTest();
    for (let propertyName in testcase) {
      if (propertyName.search('test') == 0) {
        this.executeTest(propertyName,
                          (testcase as any)[propertyName].bind(testcase));
      }
    }
    testcase.tearDownTest();
  }

  /**
   * Prints a summary of the test runs.
   */
  public summary() {
    if (this.warn && this.warningTests_.length) {
      this.outputLine(0, 'WARNING!', Color.ORANGE);
      this.outputLine(0, 'The following tests produced a warning:');
      this.outputLine(0, this.warningTests_.join(', '));
    }
    if (!this.success()) {
      this.outputLine(0, 'FAILURE!', Color.RED);
      this.outputLine(0, 'The following tests failed:');
      this.outputLine(0, this.failedTests_.join(', '));
    } else {
      this.outputLine(0, 'SUCCESS!', Color.GREEN);
    }
    this.outputLine(0, this.succeededTests_.length + ' tests successful.');
  }

  /**
   * Prints information to the console if it has priority greater or equal to
   * verbosity mode.
   * @param priority The output priority.
   * @param output The output string.
   */
  public output(priority: number, output: string) {
    if (priority <= this.verbose) {
      process.stdout.write(output);
    }
  }

  /**
   * Colors information for printing.
   * @param output The output string.
   * @param color An optional color argument.
   * @return The colored string.
   */
  public outputColor(output: string, color: Color | undefined): string {
    return color ? color + output + Color.WHITE : output;
  }

  /**
   * Prints information to the console. This always forces a line, unless
   * verbose is 0.
   * @param priority The output priority.
   * @param output The output string.
   * @param opt_color An optional color argument.
   */
  public outputLine(priority: number, output: string, opt_color?: Color) {
    output = this.outputColor(output, opt_color);
    let mid = 80 - output.length;
    output = output + (new Array(mid > 0 ? mid + 1 : 1)).join(' ');
    this.output(priority, '\r' + output + '\n');
  }

  /**
   * Queues information for printing.
   * @param output The output string.
   * @param opt_color An optional color argument.
   */
  public outputStart(output: string, opt_color?: Color) {
    this.outputQueue.push(this.outputColor(output, opt_color));
  }

  /**
   * Prints the queued information on a spanning line. This only forces a line,
   * when verbose is set to 2.
   * @param priority The output priority.
   * @param output The output string.
   * @param opt_color An optional color argument.
   */
  public outputEnd(priority: number, output: string, opt_color?: Color) {
    output = this.outputColor(output, opt_color);
    let start = this.outputQueue.join(' ');
    let mid = 80 - (start.length + output.length);
    output = start + (new Array(mid > 0 ? mid + 1 : 1)).join(' ') + output;
    output = this.verbose === 3 ? output + '\n' :
      priority <= 1 ? '\r' + output + '\n' : '\r' + output;
    this.output(priority, output);
    this.outputQueue = [];
  }

  /**
   * Execute a single tests.
   * @param name Function name.
   * @param func Function to be executed.
   */
  private executeTest(name: string, func: Function) {
    this.outputStart('Testing ' + name);
    try {
      func.apply(null);
    } catch (e) {
      this.outputEnd(1, '[FAIL]', Color.RED);
      this.outputLine(1, 'Actual: ' + (e.actual || ''));
      this.outputLine(1, 'Expected: ' + (e.expected || ''));
      this.status_ = Results.FAIL;
      this.failedTests_.push(name);
      return;
    }
    this.outputEnd(2, '[PASS]', Color.GREEN);
    this.succeededTests_.push(name);
    return;
  }

}

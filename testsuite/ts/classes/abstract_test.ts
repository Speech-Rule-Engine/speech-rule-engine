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
 * @file Abstract class of test cases.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import * as assert from 'assert';
import * as tu from '../base/test_util.js';
import * as SnapshotStore from '../base/snapshot_store.js';
import { expect } from '@jest/globals';

/**
 * The assertion methods available to a test case.
 */
export type AssertMethods = {
  equal: (expected: any, actual: any) => void;
  deepEqual: (expected: any, actual: any) => void;
  snapshot: (actual: any, name?: string) => void;
  fail: () => void;
};

export abstract class AbstractTest {

  /**
   * Jest package used?
   */
  private _jest = true;

  /**
   * Jest package usage.
   *
   * @param flag True if jest package is used.
   */
  public set jest(flag: boolean) {
    this._jest = flag;
    this.assert = this.getAssert();
  }

  /**
   * Basic information on the test case.
   */
  public information = '';

  /**
   * The assertion package.
   */
  public assert: AssertMethods = this.getAssert();

  /**
   * Sets the assertion methods for executing tests.
   */
  protected getAssert(): AssertMethods {
    return {
      equal:
      !this._jest
        ? assert.strictEqual
        : (actual: any, expected: any) => expect(actual).toEqual(expected),
      deepEqual: !this._jest
        ? assert.deepStrictEqual
        : (actual: any, expected: any) => {
          expect(actual).toEqual(expected);
        },
      snapshot: !this._jest
        ? () => {}
        : () => {
          throw new Error(
            'Snapshot assertions require AbstractJsonTest, which knows ' +
              'the fixture a testcase came from.'
          );
        },
      fail: assert.fail
    };
  }

  /**
   * Sets up the basic requirements for the test.
   */
  public async setUpTest(): Promise<string> {
    return Promise.resolve('');
  }

  /**
   * Finalises the test.
   */
  public async tearDownTest(): Promise<string> {
    return Promise.resolve('');
  }
}

/**
 * Base class for tests that load their input and expected values from json
 * input files. If a base file is provided they load their input fom a different
 * json file than the expected results.
 *
 * E.g., if rules need to be tested for all locales they can share the same
 * basic test input and only differ on the expected output.
 *
 */
export abstract class AbstractJsonTest extends AbstractTest {
  /**
   * The Json for the input from an expected file.
   */
  public jsonTests: tu.JsonFile = null;

  /**
   * The Json for the input from a base file.
   */
  public baseTests: tu.JsonFile = {};

  /**
   * The actual tests to run.
   */
  public inputTests: tu.JsonTest[] = [];

  /**
   * The elements to be picked from the test JSON.
   */
  public pickFields: string[] = ['input', 'expected'];

  /**
   * Tests with warning.
   */
  public warn: string[] = [];

  /**
   * The input fields needed for the test.
   */
  public inputFields = new Map();

  /**
   * An information string.
   */
  public information = '';

  /**
   * Whether to use snapshot mode for assertions.
   */
  public snapshotMode = false;

  /**
   * The JSON fixture this instance was built from, relative to `expected/`.
   * Set externally by the test factory. This is the stable identity used to
   * key the shared snapshot store, since the same fixture is executed from
   * several differently-shaped generated test files (json/actions/output/
   * analyse).
   */
  public jsonFile = '';

  /**
   * Name of the testcase currently executing, set by the test runner before
   * `method()` is invoked. Combined with jsonFile to key the snapshot store.
   */
  public currentTestName = '';

  /**
   * Per-testcase occurrence counters, to disambiguate multiple snapshot
   * assertions made for the same testcase name (e.g., a test class that
   * calls `executeTest()` more than once per case).
   */
  private snapshotCounters = new Map<string, number>();

  private prepared = false;
  private baseFile = '';

  /**
   * @override
   */
  protected getAssert(): AssertMethods {
    const base = super.getAssert();
    return {
      ...base,
      snapshot: (actual: any) => {
        const name = this.currentTestName || 'unnamed';
        const n = (this.snapshotCounters.get(name) || 0) + 1;
        this.snapshotCounters.set(name, n);
        SnapshotStore.assertSnapshot(this.jsonFile, `${name} ${n}`, actual);
      }
    };
  }

  /**
   * Picks arguments from a JSON element.
   *
   * @param json The JSON element.
   * @returns The array of arguments for the test method.
   */
  public pick(json: tu.JsonTest) {
    this.pickFields.forEach((x) => this.inputFields.set(x, json[x]));
  }

  /**
   * Retrieves an input field.
   *
   * @param key The key.
   * @returns The input field for that key.
   */
  public field(key: string) {
    return this.inputFields.get(key);
  }

  /**
   * Prepares the individual tests of this object. Preparation is distructive
   * and should only be carried out once.
   */
  public prepare() {
    if (this.prepared) {
      return;
    }
    this.jsonTests =
      this.jsonTests ||
      (this.jsonFile ? tu.TestUtil.loadJson(this.jsonFile) : {});
    this.information = this.jsonTests.information || 'Unnamed tests';
    this.loadBase();
    const input: tu.JsonTests = (this.baseTests['tests'] || {}) as tu.JsonTests;
    const output = this.jsonTests['tests'] || {};
    const exclude = this.jsonTests['exclude'] || [];
    const tests = tu.TestUtil.combineTests(input, output, exclude);
    this.inputTests = tests[0];
    this.warn = tests[1];
    this.prepared = true;
  }

  /**
   * Loads the base file if it exists.
   */
  public loadBase() {
    const file = this.jsonTests['base'];
    this.baseFile = tu.TestUtil.fileExists(file, tu.TestPath.INPUT);
    this.baseTests = this.baseFile ? tu.TestUtil.loadJson(this.baseFile) : {};
  }

  /**
   * The actual test method.
   */
  public abstract method(): void;
}

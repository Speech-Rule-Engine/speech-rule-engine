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
 * @fileoverview Abstract class of test cases.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import * as assert from 'assert';
import {TestPath, TestUtil} from '../base/test_util';

export abstract class AbstractTest {

  /**
   * Basic information on the test case.
   */
  public information: string = '';

  /**
   * The assertion package.
   */
  public assert: any = assert;

  /**
   * Sets up the basic requirements for the test.
   */
  public setUpTest() {
  }

  /**
   * Finalises the test.
   */
  public tearDownTest() {
  }
}

export interface JsonTest {
  test?: boolean;
  name?: string;
  input?: string;
  expected?: string;
  [propName: string]: any;
}

export interface JsonFile {
  factory?: string;
  information?: string;
  exlcude?: string[];
  base?: string;
  tests?: {[name: string]: JsonTest};
  [propName: string]: any;
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
  public jsonTests: JsonFile = null;

  /**
   * The Json for the input from a base file.
   */
  public baseTests: JsonFile = {};

  /**
   * The actual tests to run.
   */
  public inputTests: JsonTest[] = [];

  /**
   * The elements to be picked from the test JSON.
   */
  public pickFields: string[] = ['input', 'expected'];

  /**
   * Tests with warning.
   */
  public warn: string[] = [];

  /**
   * An information string.
   */
  public information: string = '';

  private jsonFile: string = '';
  private baseFile: string = '';

  /**
   * Picks arguments from a JSON element.
   * @param json The JSON element.
   * @return The array of arguments for the test method.
   */
  public pick(json: JsonTest): string[] {
    return this.pickFields.map(x => json[x]);
  }

  /**
   * Prepares the individual tests of this object.
   */
  public prepare() {
    this.jsonTests = this.jsonTests || (
      this.jsonFile ? TestUtil.loadJson(this.jsonFile) : {});
    this.information = this.jsonTests.information || 'Unnamed tests';
    let file = this.jsonTests['base'];
    this.baseFile = TestUtil.fileExists(file, TestPath.INPUT);
    this.baseTests = this.baseFile ? TestUtil.loadJson(this.baseFile) : {};
    let input = this.baseTests['tests'] || {};
    let output = this.jsonTests['tests'] || {};
    let exclude = this.jsonTests['exclude'] || [];
    let tests = TestUtil.combineTests(input, output, exclude);
    this.inputTests = tests[0];
    this.warn = tests[1];
  }

  /**
   * The actual test method.
   * @param args Arguments for the test method.
   */
  public abstract method(...args: any[]): void;

}

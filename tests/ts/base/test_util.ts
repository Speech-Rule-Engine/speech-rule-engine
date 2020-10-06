//
// Copyright 2020 Volker Sorge
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
 * @fileoverview Utillities for tests.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import * as fs from 'fs';
import {JsonTest} from '../classes/abstract_test';
import {baseDir} from './test_external';

let TestDir = baseDir;

export const TestPath: {[key: string]: string} = {
  INPUT: TestDir + 'input/',
  OUTPUT: TestDir + 'output/',
  EXPECTED: TestDir + 'expected/'
};

/**
 * The base error class for signaling Test errors.
 * @param msg The error message.
 * @param value Additional values.
 */
export class TestError extends Error {

  /**
   * @override
   */
  public name = 'SRE Test Error';

  /**
   * @constructor
   * @param message The Error message.
   * @param value An arbitrary error value to propagate.
   */
  constructor(public message: string, public value: any) {
    super();
  }
}

export namespace TestUtil {

  /**
   * Loads and parses a JSON file.
   * @param file The filename.
   * @return The parsed JSON object.
   */
  export function loadJson(file: string): Object {
    try {
      return (
        JSON.parse(fs.readFileSync(file).toString()) as Object);
    } catch (e) {
      throw new TestError('Bad filename or content', file);
    }
  }

  /**
   * Checks if a file exists. Goes through a number of possible path names.
   * @param file The filename.
   * @param opt_path An optional path name.
   * @return The actual filename with full path.
   */
  export function fileExists(file: string, opt_path?: string): string {
    if (fs.existsSync(file)) {
      return file;
    }
    if (opt_path && fs.existsSync(opt_path + file)) {
      return opt_path + file;
    }
    let newFile = TestDir + file;
    if (fs.existsSync(newFile)) {
      return newFile;
    }
    return '';
  }

  /**
   * Combines JSON tests from input test specification and expected output
   * values. For every input test it tries to pick an expected value. If non
   * exists and the test is not in the exclude list it pushes a warning.
   * Finaly all left over expected tests are added to the list of tests.
   *
   * If expected is 'ALL', all tests are taken directly.
   * @param input An association list of input test specifications.
   * @param expected A association list of test specifications
   *     with expected values.
   * @param exclude A list of tests to be excluded.
   * @return Done.
   */
  export function combineTests(input: JsonTest, expected: JsonTest | string,
                               exclude: string[]): [any[], any[]] {
    let warn = [];
    let results = [];
    if (expected === 'ALL') {
      for (let key of Object.keys(input)) {
        if (key.match(/^_/) || exclude.indexOf(key) !== -1) {
          continue;
        }
        let json = input[key];
        if (typeof json.test === 'undefined') {
          json.test = true;
        }
        json.name = key;
        results.push(json);
      }
      return [results, []];
    }
    if (typeof expected === 'string') {
      return [[], []];
    }
    for (let key of Object.keys(input)) {
      if (key.match(/^_/) || exclude.indexOf(key) !== -1) {
        continue;
      }
      let json = input[key];
      let exp = expected[key];
      if (typeof json.test === 'undefined') {
        json.test = true;
      }
      json.name = key;
      if (json.test && !exp) {
        warn.push(key);
        continue;
      }
      results.push(Object.assign(json, exp));
      delete expected[key];
    }
    for (let key of Object.keys((expected as Object))) {
      if (key.match(/^_/)) {
        continue;
      }
      let json = expected[key];
      if (typeof json.test === 'undefined') {
        json.test = true;
      }
      json.name = key;
      results.push(json);
    }
    return [results, warn];
  }

}

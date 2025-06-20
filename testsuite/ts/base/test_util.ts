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
 * @file Utillities for tests.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import * as fs from 'fs';
import * as path from 'path';
import {fileURLToPath} from 'url';

function getDir() {
  return path.dirname(fileURLToPath(import.meta.url)).replace(/js$/, '');
}
const TestDir = getDir().replace(/(dist|js\/base)$/, '');

export const TestPath: { [key: string]: string } = {
  INPUT: path.join(TestDir, 'input/'),
  OUTPUT: path.join(TestDir, 'output/'),
  EXPECTED: path.join(TestDir, 'expected/'),
  ANALYSIS: path.join(TestDir, 'analysis/'),
  VISUALISE: path.join(TestDir, 'visualise/')
};

/**
 * The base error class for signaling Test errors.
 *
 * @param msg The error message.
 * @param value Additional values.
 */
export class TestError extends Error {
  /**
   * @override
   */
  public name = 'SRE Test Error';

  /**
   * @class
   * @param message The Error message.
   * @param value An arbitrary error value to propagate.
   */
  public constructor(public message: string, public value: any) {
    super(value);
  }
}

export interface JsonTest {
  [propName: string]: any;
  test?: boolean;
  name?: string;
  input?: string;
  expected?: string | string[];
}

export declare type JsonTests = { [name: string]: JsonTest };

export interface JsonFile {
  [propName: string]: any;
  factory?: string;
  information?: string;
  exclude?: string[];
  base?: string;
  tests?: JsonTests | 'ALL';
}

export namespace TestUtil {
  /**
   * Loads and parses a JSON file.
   *
   * @param file The filename.
   * @returns The parsed JSON object.
   */
  export function loadJson(file: string): JsonFile {
    try {
      return JSON.parse(fs.readFileSync(file).toString()) as JsonFile;
    } catch (e) {
      throw new TestError('Bad filename or content', file);
    }
  }

  /**
   * Creates recursively all directories for the given file.
   *
   * @param file The filename.
   */
  export function makeDir(file: string) {
    const dir = path.dirname(file);
    fs.mkdirSync(dir, { recursive: true });
  }

  /**
   * Saves a formatted JSON object to file.
   *
   * @param {string} file The filename
   * @param {JsonFile} json The JSON output.
   */
  export function saveJson(file: string, json: JsonFile) {
    makeDir(file);
    fs.writeFileSync(file, JSON.stringify(json, null, 2) + '\n');
  }

  /**
   * Checks if a file exists. Goes through a number of possible path names.
   *
   * @param file The filename.
   * @param opt_path An optional path name.
   * @returns The actual filename with full path.
   */
  export function fileExists(file: string, opt_path?: string): string {
    if (fs.existsSync(file)) {
      return file;
    }
    if (opt_path && fs.existsSync(opt_path + file)) {
      return opt_path + file;
    }
    const newFile = TestDir + file;
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
   *
   * @param input An association list of input test specifications.
   * @param expected A association list of test specifications with expected
   *     values.
   * @param exclude A list of tests to be excluded.
   * @returns Done.
   */
  export function combineTests(
    input: JsonTests,
    expected: JsonTests | 'ALL',
    exclude: string[]
  ): [JsonTest[], string[]] {
    const warn = [];
    const results = [];
    if (expected === 'ALL') {
      for (const key of Object.keys(input)) {
        if (key.match(/^_/) || exclude.indexOf(key) !== -1) {
          continue;
        }
        const json = input[key];
        if (typeof json.test === 'undefined') {
          json.test = true;
        }
        json.name = key;
        results.push(json);
      }
      return [results, []];
    }
    for (const key of Object.keys(input)) {
      if (key.match(/^_/) || exclude.indexOf(key) !== -1) {
        delete expected[key];
        continue;
      }
      const json = input[key];
      const exp = expected[key];
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
    for (const key of Object.keys(expected as Object)) {
      if (key.match(/^_/)) {
        continue;
      }
      const json = expected[key];
      if (typeof json.test === 'undefined') {
        json.test = true;
      }
      json.name = key;
      results.push(json);
    }
    return [results, warn];
  }

  /**
   * Capitalizes the input string.
   *
   * @param str The input string.
   * @returns The capitalized string.
   */
  export function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /**
   * Recursively find all files with .json extension under the given path.
   *
   * @param dir The top pathname.
   * @param result Accumulator for pathnames.
   */
  function readDir_(dir: string, result: string[], ext: RegExp) {
    if (typeof dir === 'undefined') {
      return;
    }
    if (fs.existsSync(dir) && fs.lstatSync(dir).isDirectory()) {
      const files = fs.readdirSync(dir);
      files.forEach((x: string) =>
        readDir_(dir ? path.join(dir, x) : x, result, ext)
      );
      return;
    }
    if (dir.match(ext)) {
      result.push(dir);
    }
  }

  /**
   * Recursively find all files with .json extension under the given path.
   *
   * @param dir The top pathname.
   * @returns List of all filenames.
   */
  export function readDir(
    dir: string, base: string = TestPath.EXPECTED, ext: RegExp = /\.json$/): string[] {
    const result: string[] = [];
    let file =  base + dir;
    if (!fs.existsSync(file) || !fs.lstatSync(file).isDirectory()) {
      file = dir;
    }
    readDir_(file, result, ext);
    return result;
  }

  /**
   * Cleans a list of filenames by removing expected path.
   *
   * @param files The files.
   * @returns The cleaned up list.
   */
  export function cleanFiles(files: string[], dir = ''): string[] {
    const regexp = new RegExp(`^${TestPath.EXPECTED}` + (dir ? `${dir}/` : ''));
    return files.map((x) => x.replace(regexp, ''));
  }

  /**
   * Checks if a key represents a comment.
   * 
   * @param key The key to test.
   */
  export function isComment(key: string) {
    return key.match(/^\s*_comment/i);
  }
}

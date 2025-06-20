// Copyright 2020 Volker Sorge
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
 * @file Methods for generating missing expected values.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import { Tests } from '../base/tests.js';
import { JsonFile, JsonTests, TestPath, TestUtil } from '../base/test_util.js';
import { ExampleFiles } from '../classes/abstract_examples.js';
import { AbstractJsonTest } from '../classes/abstract_test.js';
import { get as factoryget } from '../classes/test_factory.js';

const enum TestFlag {
  ALL,
  FAILED,
  MISSING,
  REMOVE
}

/**
 * Runs all tests for the given expected file and collates the failing ones.
 *
 * @param expected Relative file name of the expected file.
 * @param flag Flag which tests to run. Values: all, failed, missing.
 * @returns A promise resolving to the Pair of JSON structure with expected
 *    output and the test object.
 */
export async function runTests(
  expected: string,
  flag: TestFlag
): Promise<[JsonTests, AbstractJsonTest]> {
  const saveOutput = ExampleFiles.noOutput;
  ExampleFiles.noOutput = true;
  const tests = factoryget(expected);
  tests.jest = false;
  tests.prepare();
  const result: JsonTests = {};
  try {
    await tests.setUpTest();
  } catch (e) {}
  const base = (
    tests.baseTests.tests && flag !== TestFlag.REMOVE
      ? tests.baseTests.tests
      : tests.jsonTests.tests
  ) as JsonTests;
  const keys = flag === TestFlag.MISSING ? tests.warn : Object.keys(base);
  for (const key of keys) {
    const test = base[key];
    if (
      key.match(/_comment/) ||
      !test.test ||
      (tests.jsonTests.exclude && tests.jsonTests.exclude.indexOf(key) !== -1)
    ) {
      if (key.match(/_comment/) && flag === TestFlag.ALL) {
        result[key] = test;
      }
      continue;
    }
    if (flag !== TestFlag.FAILED) {
      test.expected = null;
    }
    try {
      tests.method.apply(tests, tests.pick(test));
    } catch (e) {
      // TODO: Take care of non-existing actual elements.
      result[key] = { expected: e.actual };
    }
  }
  try {
    await tests.tearDownTest();
  } catch (e) {}
  ExampleFiles.noOutput = saveOutput;
  return [result, tests];
}

/**
 * Generates expected values for the flagged tests and writes them to the given
 * expected file.
 *
 * @param expected Relative file name of the expected file.
 * @param flag Flag which tests to run. Values: all, failed, missing.
 * @param dryrun Print to console instead to file.
 */
async function add(expected: string, flag: TestFlag, dryrun: boolean) {
  const [result, tests] = await runTests(expected, flag);
  if (dryrun) {
    console.log(JSON.stringify(result, null, 2));
    return;
  }
  addToFile(tests['jsonFile'], result);
}

/**
 * Adds the expected values to the file, overwriting the current ones.
 *
 * @param {string} file The file name.
 * @param {JsonTests} expected The expected values.
 */
export function addToFile(file: string, expected: JsonTests) {
  const filename = TestUtil.fileExists(file, TestPath.EXPECTED);
  const oldJson: JsonFile = TestUtil.loadJson(filename);
  const oldTests = oldJson.tests as JsonTests;
  for (const key of Object.keys(expected)) {
    if (oldTests[key]) {
      if (TestUtil.isComment(key)) continue;
      Object.assign(oldTests[key], expected[key]);
    } else {
      oldTests[key] = expected[key];
    }
  }
  TestUtil.saveJson(filename, oldJson);
}

/**
 * Generates expected values for all missing tests and writes them to the given
 * expected file.
 *
 * @param expected Relative file name of the expected file.
 * @param dryrun Print to console instead to file.
 */
export async function addMissing(expected: string, dryrun = false) {
  return add(expected, TestFlag.MISSING, dryrun);
}

/**
 * Generates actual expected values for all tests and writes them to the given
 * expected file.
 *
 * @param expected Relative file name of the expected file.
 * @param dryrun Print to console instead to file.
 */
export async function addActual(expected: string, dryrun = false) {
  return add(expected, TestFlag.ALL, dryrun);
}

/**
 * Generates all actual expected values for all tests and writes them unless the
 * dryrun flag is set.
 *
 * @param expected List of file names of the expected files.
 * @param dryrun Print to console instead to file.
 */
export async function addAll(expected: string[], dryrun = false) {
  for (let expt of expected) {
    await add(expt, TestFlag.ALL, dryrun);
  }
}

/**
 * Generates actual expected values for failed tests and writes them to the
 * given expected file.
 *
 * @param expected Relative file name of the expected file.
 * @param dryrun Print to console instead to file.
 */
export async function addFailed(expected: string, dryrun = false) {
  return add(expected, TestFlag.FAILED, dryrun);
}

/**
 * @param file
 * @param removal
 */
export function removeFromFile(file: string, removal: JsonTests) {
  const filename = TestUtil.fileExists(file, TestPath.EXPECTED);
  const oldJson: JsonFile = TestUtil.loadJson(filename);
  const tests = oldJson.tests as JsonTests;
  for (const key of Object.keys(removal)) {
    delete tests[key];
  }
  TestUtil.saveJson(filename, oldJson);
}

/**
 * Generates actual expected values for failed tests and writes them to the
 * given expected file.
 *
 * @param expected Relative file name of the expected file.
 * @param dryrun Print to console instead to file.
 */
export async function removeMissing(expected: string, dryrun = false) {
  const [result, tests] = await runTests(expected, TestFlag.REMOVE);
  if (dryrun) {
    console.log(JSON.stringify(result, null, 2));
    return;
  }
  removeFromFile(tests['jsonFile'], result);
}

/**
 * Shows the result for all missing tests. This is to inspect before adding them
 * automatically using, for example, `addMissing`.
 *
 * @param regexp A regular expression to filter output.
 * @param dryrun If false, failed tests will be replaced. True by default.
 */
export function showFailed(regexp = /./, dryrun = true) {
  const tests = new Tests();
  tests.runner
    .queryJsonTests((x) => x)
    .filter((x) => x.jsonFile.match(regexp))
    .reduce(
      (p, x) => p.then(() => {
        console.log(x.jsonFile);
        return addFailed(x.jsonFile, dryrun)
      }),
      Promise.resolve());
}

/**
 * Shows the result for all missing tests. This is to inspect before adding them
 * automatically using, for example, `addMissing`.
 *
 * @param regexp A regular expression to filter output.
 */
export function showMissing(regexp = /./, dryrun = true) {
  const tests = new Tests();
  tests.runner
    .queryJsonTests((x) => [x, x.warn])
    .filter(([x, y]) => y.length && x.jsonFile.match(regexp))
    .reduce(
      (p, [x]) => p.then(() => {
        console.log(x.jsonFile);
        return addMissing(x.jsonFile, dryrun)
      }),
      Promise.resolve());
}

/**
 * Get the files in which tests are missing. E.g., so they can be piped into a
 * method to fill them.
 *
 * @param regexp A regular expression to filter output.
 */
export function getMissing(regexp = /./) {
  const tests = new Tests();
  return tests.runner
    .queryJsonTests((x) => [x, x.warn])
    .filter(([x, y]) => y.length && x.jsonFile.match(regexp))
    .map(([x]) => x.jsonFile);
}

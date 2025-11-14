// Copyright 2025 Volker Sorge
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
 * @file Rewrite, extract and cleanup content of test files.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

// import { Tests } from '../base/tests.js';
import { Variables } from '#js/common/variables.js';
import { JsonFile, JsonTests, TestPath, TestUtil } from '../base/test_util.js';


export function extractTests(file: string, tests: string[], input = false) {
  const filename = TestUtil.fileExists(file, input ? TestPath.INPUT : TestPath.EXPECTED);
  const result: JsonTests = {};
  if (!filename) {
    console.warn(`File ${file} does not exist.`);
    return result;
  }
  const json: JsonFile = TestUtil.loadJson(filename);
  if (json.tests === 'ALL') {
    console.warn('Cannot extract from ALL tests.');
    return result;
  }
  for (const test of tests) {
    const res = json.tests[test]
    if (!res) {
      console.warn(`Test named ${test} does not exist.`);
      continue;
    }
    result[test] = res;
  }
  return result;
}

export function extractField(
  file: string,
  tests: string[],
  field: string,
  keys: {
    input: boolean,
    transform: (field: string) => string
  } = {
    input: false,
    transform: x => x
  }) {
  const extract = extractTests(file, tests, keys.input);
  const result: {[key: string]: string} = {};
  for (const [name, test] of Object.entries(extract)) {
    try {
      result[name] = keys.transform(test[field]);
    } catch (e) {
      console.warn(`Error ${e} occurred.`);
      result[name] = undefined;
    }
  }
  return result;
}

export function iterateLocales(func: (iso: string, lang: string) => void) {
  for (const [iso, lang] of Variables.LOCALES.entries()) {
    func(iso, lang);
  };
}

export function rewriteTests(
  file: string,
  tests: string[],
  field: string,
  rewrite: {[search: string]: string},
  input = false
) {
  const filename = TestUtil.fileExists(file, input ? TestPath.INPUT : TestPath.EXPECTED);
  if (!filename) {
    console.warn(`File ${file} does not exist.`);
    return;
  }
  const json: JsonFile = TestUtil.loadJson(filename);
  if (json.tests === 'ALL') {
    console.warn('Cannot rewrite ALL tests.');
    return;
  }
  for (const test of tests) {
    const res = json.tests[test]
    if (!res) {
      console.warn(`Test named ${test} does not exist.`);
      continue;
    }
    if (!res[field]) {
      console.warn(`Test ${test} does not have a field ${field}.`);
      continue;
    }
    for (const [search, replace] of Object.entries(rewrite)) {
      res[field] = res[field].replace(search, replace);
    }
  }
  TestUtil.saveJson(filename, json);
}

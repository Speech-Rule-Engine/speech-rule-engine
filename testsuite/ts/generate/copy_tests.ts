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
 * @file Methods for copying and transforming test files.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import * as path from 'path';
import {
  JsonFile,
  JsonTest,
  JsonTests,
  TestPath,
  TestUtil
} from '../base/test_util.js';
import { get as factoryget } from '../classes/test_factory.js';
import { addMissing, addActual } from './fill_tests.js';

/**
 * Copies and adapts a single test file from one locale to another.
 *
 * @param source The expected source file.
 * @param locale Destination locale (e.g., 'it').
 * @param loc1 Source locale string (e.g., "English").
 * @param loc2 Destination locale string (e.g., "Italian").
 */
export async function copyTestLocale(
  source: string,
  locale: string,
  loc1: string,
  loc2: string
) {
  const tests = factoryget(source);
  const dst = path.join(
    TestPath.EXPECTED,
    locale,
    ...source.split('/').slice(-2)
  );
  delete tests.jsonTests.tests;
  tests.jsonTests.locale = locale;
  replaceInTests(tests.jsonTests, 'name', loc1, loc2);
  replaceInTests(tests.jsonTests, 'active', loc1, loc2);
  replaceInTests(tests.jsonTests, 'information', loc1, loc2);
  tests.jsonTests['compare'] = true;
  tests.jsonTests.tests = {};
  TestUtil.saveJson(dst, tests.jsonTests);
  return addActual(dst);
}

/**
 * Copies and adapts all test file from one locale directory to another.
 *
 * @param source The expected source directory.
 * @param locale Destination locale (e.g., 'it').
 * @param loc1 Source locale string (e.g., "English").
 * @param loc2 Destination locale string (e.g., "Italian").
 */
export async function copyTestLocaleDir(
  source: string,
  locale: string,
  loc1: string,
  loc2: string
) {
  const files = TestUtil.readDir(source);
  for (const file of files) {
    await copyTestLocale(file, locale, loc1, loc2);
  }
}

/**
 * Replaces content in string field if an entry for a given key exists.
 *
 * @param {JsonFile} tests The test file structure.
 * @param {string} key The key of the field.
 * @param {string} what What should be replaced.
 * @param {string} by By what it should be replaced.
 */
function replaceInTests(
  tests: JsonFile,
  key: string,
  what: string,
  by: string
) {
  if (tests[key]) {
    tests[key] = tests[key].replace(what, by);
  }
}

//
// Some filter and inspection tooling
//

/**
 * Shows the difference in test files between two locales.
 *
 * @param {string} loc1 First locale.
 * @param {string} loc2 Second locale.
 */
export function localeDifference(loc1: string, loc2: string) {
  const tests1 = localeToBlocks(
    TestUtil.cleanFiles(TestUtil.readDir(loc1), loc1)
  );
  const tests2 = localeToBlocks(
    TestUtil.cleanFiles(TestUtil.readDir(loc2), loc2)
  );
  console.info(`Missing ${loc1}:`);
  outputDifference(tests2, tests1);
  console.info(`Missing ${loc2}:`);
  outputDifference(tests1, tests2);
}

/**
 * Computes and outputs the difference between two locale test directories.
 *
 * @param {{[name: string]: string[]}} tests1 Test files for locale 1.
 * @param {{[name: string]: string[]}} tests2 Test files for locale 2.
 */
function outputDifference(
  tests1: { [name: string]: string[] },
  tests2: { [name: string]: string[] }
) {
  for (const block of Object.keys(tests1)) {
    const block2 = tests2[block];
    console.info(`Block ${block}:`);
    if (!block2) {
      console.info(tests1[block]);
      continue;
    }
    console.info(tests1[block].filter((x) => !block2.includes(x)));
  }
}

/**
 * Collates the files of a locale into blocks corresponding to their
 * sub-directories.
 *
 * @param {string[]} files The list of all files.
 */
function localeToBlocks(files: string[]) {
  const result: { [name: string]: string[] } = {};
  for (const path of files) {
    const match = path.match(/^(\w*)\/(.*)/);
    const block = match[1];
    const file = match[2];
    if (result[block]) {
      result[block].push(file);
    } else {
      result[block] = [file];
    }
  }
  return result;
}

/* ********************************************************* */
/*
 * Get information on locale specific tests.
 */
/* ********************************************************* */

/**
 * @param loc
 * @param exclude
 */
export function showNonExpected(loc: string, exclude: string[] = []) {
  const nonExpected = getNonExpected(loc, exclude);
  const [missing, same, different] = siftNonExpected(nonExpected);
  console.info('Missing');
  for (const [file, key, value] of missing) {
    console.info(`${file} ${key}:`);
    console.info(value);
  }
  console.info('Same');
  for (const [file, key, value, base] of same) {
    console.info(`${file} ${key}:`);
    console.info(value);
    console.info(base);
  }
  console.info('Different');
  for (const [file, key, value, base] of different) {
    console.info(`${file} ${key}:`);
    console.info(value);
    console.info(base);
  }
}

/**
 * @param nonExpected
 */
function siftNonExpected(nonExpected: [string, string, JsonTest][]) {
  const missing: [string, string, JsonTest][] = [];
  const same: [string, string, JsonTest, JsonTest][] = [];
  const different: [string, string, JsonTest, JsonTest][] = [];
  for (const [file, key, value] of nonExpected) {
    const json = factoryget(file);
    json.loadBase();
    const base = json.baseTests.tests as JsonTests;
    if (!base) {
      missing.push([file, key, value]);
      continue;
    }
    const baseTest = base[key];
    if (typeof baseTest === 'undefined') {
      missing.push([file, key, value]);
      continue;
    }
    if (baseTest.input && value.input && baseTest.input === value.input) {
      same.push([file, key, value, baseTest]);
      continue;
    }
    different.push([file, key, value, baseTest]);
  }
  return [missing, same, different];
}

/**
 * @param loc
 * @param exclude
 */
function getNonExpected(
  loc: string,
  exclude: string[] = []
): [string, string, JsonTest][] {
  const result: [string, string, JsonTest][] = [];
  const tests = TestUtil.cleanFiles(TestUtil.readDir(loc));
  for (const test of tests) {
    const json = factoryget(test);
    if (exclude.indexOf(json.jsonTests.factory) !== -1) {
      continue;
    }
    for (const [key, entry] of Object.entries(json.jsonTests.tests)) {
      if (key.match(/_comment/)) {
        continue;
      }
      cleanEntry(entry);
      if (Object.keys(entry).length) {
        result.push([test, key, entry]);
      }
    }
  }
  return result;
}

/**
 * @param entry
 */
function cleanEntry(entry: JsonTest) {
  delete entry.expected;
  delete entry.test;
  Object.keys(entry)
    .filter((key) => key.match(/_comment/))
    .forEach((x) => delete entry[x]);
}

/* ********************************************************* */
/*
 * Copy semantic tests to generate the four basic test classes.
 *
 * We expect the following naming convention:
 * Input file:
 * - semantic_NAME.json, where NAME corresponds to the particular type of
 *   elements the test is for (can be empty).
 *
 * Output files:
 * - semantic_tree_NAME.json, factory: stree
 * - enrich_mathml_NAME.json, factory: enrichMathml, active: EnrichExamples
 * - enrich_speech_NAME.json, factory: enrichSpeech, tests: ALL
 * - rebuild_stree_NAME.json, factory: rebuild, tests: ALL
 */
/* ********************************************************* */

/**
 * @param base
 */
export function copySemanticTest(base: string, fill: boolean = false, targetdir?: string) {
  const filename = TestUtil.fileExists(base, TestPath.INPUT);
  if (!filename) {
    return;
  }
  const json = TestUtil.loadJson(filename);
  const info = json.information || '';
  const basename = path.basename(base);
  const sourcedir = path.dirname(base);
  targetdir = targetdir || sourcedir;
  createSemanticTestFile(sourcedir, targetdir, 'semantic_tree', basename, info, {
    factory: 'stree'
  });
  createSemanticTestFile(sourcedir, targetdir, 'enrich_mathml', basename, info, {
    factory: 'enrichMathml',
    active: 'EnrichExamples'
  });
  createSemanticTestFile(sourcedir, targetdir, 'enrich_speech', basename, info, {
    factory: 'enrichSpeech',
    tests: 'ALL'
  });
  createSemanticTestFile(sourcedir, targetdir, 'enrich_structure', basename, info, {
    factory: 'enrichStructure',
  });
  createSemanticTestFile(sourcedir, targetdir, 'deep_speech', basename, info, {
    factory: 'deepSpeech',
    tests: 'ALL'
  });
  createSemanticTestFile(sourcedir, targetdir, 'rebuild_enriched', basename, info, {
    factory: 'rebuildEnriched',
    tests: 'ALL'
  });
  createSemanticTestFile(sourcedir, targetdir, 'rebuild_stree', basename, info, {
    factory: 'rebuild',
    tests: 'ALL'
  });
  createSemanticTestFile(sourcedir, targetdir, 'semantic_xml', basename, info, {
    factory: 'semanticXml',
    tests: 'ALL'
  });
  createSemanticTestFile(sourcedir, targetdir, 'semantic_api', basename, info, {
    factory: 'semanticApi',
    tests: 'ALL'
  });
  // createSemanticTestFile(sourcedir, targetdir, 'semantic_skeleton', basename, info, {
  //   factory: 'semanticSkeleton',
  //   tests: 'ALL'
  // });
  createSemanticTestFile(sourcedir, targetdir, 'semantic_exploration', basename, info, {
    factory: 'semanticExploration'
  });
  if (fill) {
    addMissing(path.join(targetdir, 'enrich_mathml', basename));
    addMissing(path.join(targetdir, 'enrich_structure', basename));
    addMissing(path.join(targetdir, 'semantic_tree', basename));
    addMissing(path.join(targetdir, 'semantic_exploration', basename));
  }
}

/**
 * @param dir
 * @param kind
 * @param base
 * @param info
 * @param init
 */
function createSemanticTestFile(
  src: string,
  target: string,
  kind: string,
  base: string,
  info: string,
  init: JsonFile
) {
  const filename = path.join(target, kind, base);
  const file = TestUtil.fileExists(filename, TestPath.EXPECTED);
  if (file) {
    console.error(`File ${file} already exists.`);
    return;
  }
  const baseinfo = TestUtil.capitalize(kind).split('_');
  if (info) {
    baseinfo.push(info);
  } else {
    baseinfo.push(...path.basename(base, '.json').split('_'));
    baseinfo.push('tests.');
  }
  init.information = baseinfo.join(' ');
  const basefile = path.join('input', src, base);
  init.base = basefile;
  if (!init.tests) {
    init.tests = {};
  }
  TestUtil.saveJson(path.join(TestPath.EXPECTED, filename), init);
}


export function copyAllSemanticTests(base: string, fill: boolean = false) {
  const files = TestUtil.readDir(base);
  for (let file of files) {
    copySemanticTest(file.replace('input/', ''), fill, 'semantic');
  }
}

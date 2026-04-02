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
 * @file Functionality to work server side with firebase, in particular
 *     to fill, update and harvest firestore.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import * as admin from 'firebase-admin';
import * as path from 'path';
import { JsonTest, JsonTests, TestUtil } from '../base/test_util.js';
import { AbstractJsonTest } from '../classes/abstract_test.js';
import { get } from '../classes/test_factory.js';
import { addToFile } from '../generate/fill_tests.js';
import * as FC from './fire_constants.js';
import * as FU from './fire_util.js';

/**
 * Inits the firebase communication
 *
 * @param {string} credentials File with credentials.
 * @param {string} url URL of the firebase.
 */
export function initFirebase(credentials: string, url: string = FC.NemethUrl) {
  const serviceAccount = require(credentials);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: url
  });
  return admin.firestore();
}

/**
 * Uploads tests to the firebase store.
 *
 * @param {any} db The firestore.
 * @param {string} file The test file to upload.
 * @param {string} collection The collection name.
 */
export async function uploadTest(
  db: any,
  file: string,
  collection: string = FC.TestsCollection
) {
  let testcases: AbstractJsonTest = null;
  try {
    testcases = get(file);
  } catch (e) {
    console.log(`Problem loading test file ${file}: ` + e);
  }
  if (!testcases) {
    return;
  }
  testcases.prepare();
  const testMap: JsonTests = {};
  const order = testcases.inputTests.map((x) => {
    testMap[x.name] = x;
    return x.name;
  });
  FU.uploadData(db, collection, testcases['jsonFile'], {
    information: testcases.information,
    name: testcases.jsonTests.name,
    order: order,
    tests: testMap
  });
  FU.setPath(db, collection, testcases['jsonFile'], [
    testcases.jsonTests.name,
    testcases.information
  ]);
}

/**
 * @returns Promise with the list of uids.
 */
export async function getUsers() {
  const users = await admin.auth().listUsers();
  return users.users.map((y) => y.uid);
}

// This forces an update of a field for every user. Be careful!
/**
 * @param db
 * @param doc
 * @param field
 * @param value
 */
export async function updateField(
  db: any,
  doc: string,
  field: string,
  value: any
) {
  const users = await getUsers();
  for (const user of users) {
    const paths = await FU.getPaths(db, user, doc);
    for (const path of Object.keys(paths)) {
      FU.updateField(db, user, path, field, value);
    }
  }
}

/**
 * This restores a field value from tests for all users. Be careful!
 *
 * @param db The database
 * @param doc Document with full path.
 * @param field The field torestore.
 */
export async function restoreField(db: any, doc: string, field: string) {
  const users = await getUsers();
  for (const user of users) {
    await FU.restoreField(db, FC.TestsCollection, user, doc, field);
  }
  console.log('Done restoring fields');
}

/**
 * Backup the firebase.
 *
 * @param {any} db The database.
 * @param {string = '/tmp/backup'} dir The backup directory.
 */
export async function backup(db: any, dir = '/tmp/backup') {
  const users = await getUsers();
  for (const user of users) {
    await downloadUser(db, user, dir);
  }
  await downloadUser(db, FC.TestsCollection, dir);
  console.log('Firebase backup complete!');
}

/**
 * Backs up a single user.
 *
 * @param {any} db The database.
 * @param {string} user The user as a hash string.
 * @param {string = '/tmp/backup'} dir The backup directoy.
 */
export async function downloadUser(
  db: any,
  user: string,
  dir = '/tmp/backup'
) {
  const paths = await FU.getPaths(db, user, FC.NemethCollection);
  TestUtil.saveJson(`${dir}/${user}/paths.json`, paths);
  if (!paths) {
    return;
  }
  for (const path of Object.keys(paths)) {
    const data = await FU.downloadData(db, user, path);
    if (data) {
      TestUtil.saveJson(`${dir}/${user}/` + path, data);
    }
  }
}

// Missing:
// * Differences between user and original
// * Harvest user input
//

/**
 * Loads test files for a user from the local filesystem. This assumes a recent
 * backup of the firebase.
 *
 * @param {string} user The user authentication.
 * @param {string = '/tmp/backup'} dir The backup directory.
 */
export function loadUser(user: string, dir = '/tmp/backup') {
  const basepath = path.join(dir, user);
  const paths = TestUtil.loadJson(path.join(basepath, 'paths.json'));
  for (const file of Object.keys(paths)) {
    paths[file] = TestUtil.loadJson(path.join(basepath, file));
  }
  return paths;
}

declare type TestFilter = (test: JsonTest) => boolean;

const changedFilter: TestFilter = (test: JsonTest) =>
  test[FC.Interaction] === FC.Status.CHANGED;

/**
 * @param tests
 * @param filter
 */
export function filterTests(
  tests: JsonTests,
  filter: TestFilter = changedFilter
) {
  const result: JsonTests = {};
  for (const [key, test] of Object.entries(tests)) {
    if (filter(test)) {
      result[key] = test;
    }
  }
  return result;
}

/**
 * @param tests
 * @param filter
 */
export function filterFiles(
  tests: JsonTests,
  filter: TestFilter = changedFilter
) {
  const result: JsonTests = {};
  for (const [path, test] of Object.entries(tests)) {
    const changed = filterTests(test.tests, filter);
    if (Object.keys(changed).length) {
      result[path] = changed;
    }
  }
  return result;
}

/**
 * Find all tests that are changed (i.e., either changed or with some feedback).
 *
 * @param {JsonTests} tests The users tests.
 */
export function changedTests(tests: JsonTests) {
  return filterFiles(
    tests,
    (test: JsonTest) =>
      test[FC.Interaction] === FC.Status.CHANGED ||
      test[FC.FeedbackStatus] !== FC.Feedback.CORRECT
  );
}

/**
 * @param tests
 */
export function feedbackTests(tests: JsonTests) {
  return filterFiles(
    tests,
    (test: JsonTest) => test[FC.FeedbackStatus] !== FC.Feedback.CORRECT
  );
}

/**
 * @param tests
 */
export function editedTests(tests: JsonTests) {
  return filterFiles(tests);
}

/**
 * @param tests
 */
export function updateEditedTests(tests: JsonTests) {
  const edited = editedTests(tests);
  for (const [file, test] of Object.entries(edited)) {
    const expected: JsonTest = {};
    for (const [name, result] of Object.entries(test)) {
      expected[name] = { expected: result.expected };
    }
    addToFile(file, expected);
  }
}

/**
 * Updates Symbol mappings in SRE from edited Tests. The given file should be of
 * the form `default_characters_FILE.json` where `FILE.js` is a unicode mapping
 * file in SRE.
 *
 * @param {JsonTests} tests The tests.
 * @param {string} file The name of the test file.
 */
export function updateSymbolMappings(tests: JsonTests, file: string) {
  const changes: JsonTest = editedTests(tests);
  const selection: JsonTest = changes[file];
  const result: JsonTest = {};
  if (!selection) {
    return result;
  }
  for (const [key, value] of Object.entries(selection)) {
    if ([...key].length > 1) {
      continue;
    }
    const unicode = key.codePointAt(0).toString(16);
    const filler =
      4 - unicode.length <= 0
        ? unicode
        : new Array(4 - unicode.length + 1).join('0') + unicode;
    result[filler.toUpperCase()] = value.expected;
  }
  const env = path.join(process.env['SRE_JSON_PATH'], '../..', 'mathmaps');
  const mathmaps = path.join(
    env,
    path.dirname(file),
    path
      .basename(file)
      .replace(/^default_characters_/, '')
      .replace(/on$/, '')
  );
  const json = TestUtil.loadJson(mathmaps) as JsonTest[];
  for (const entry of json) {
    if (entry.mappings) {
      const replace = result[entry.key];
      if (replace !== undefined) {
        entry.mappings.default.default = replace;
      }
    }
  }
  TestUtil.saveJson(mathmaps, json);
  return json;
}

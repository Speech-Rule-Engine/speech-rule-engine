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
 * @file Utilities for firebase that work both in node and web.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import { JsonTest, JsonTests } from '../base/test_util.js';
import * as FC from './fire_constants.js';

/**
 * Verbosity flag.
 */
export const verbose = false;

/**
 * Output method for controlling verbosity.
 *
 * @param {string} str The output string.
 */
function output(str: string) {
  if (verbose) {
    console.log(str);
  }
}

/**
 * Uploads an entire data set to firebase.
 *
 * @param {any} db The database.
 * @param {string} collection The collection to add data to.
 * @param {string} doc The document to add data to.
 * @param {any} data The data to upload.
 */
export async function uploadData(
  db: any,
  collection: string,
  doc: string,
  data: any
) {
  db.collection(collection)
    .doc(doc)
    .set(data)
    .then(() => {
      output(
        `Data for document ${doc} successfully uploaded to collection ${collection}`
      );
    })
    .catch((error: Error) => {
      output(
        `Uploading data to document ${doc} in collection ${collection} failed with: ${error}`
      );
    });
}

/**
 * Updates data in a nested firebase entry.
 *
 * @param {any} db The database.
 * @param {string} collection The collection to add data to.
 * @param {string} path The path to the data to update.
 * @param {any} data The data to upload.
 * @param nesting
 */
export async function updateData(
  db: any,
  collection: string,
  path: string,
  data: any,
  nesting: string[]
) {
  const entry: JsonTest = {};
  const key = nesting.join('.');
  entry[key] = data;
  db.collection(collection)
    .doc(path)
    .update(entry)
    .then(() => {
      output(
        `Data successfully updated in collection ${collection} with path ${path}`
      );
    })
    .catch((error: Error) => {
      output(
        `Updating data in collection ${collection} with path ${path} failed with: ${error}`
      );
    });
}

/**
 * Downloads data from a document specified by a path.
 *
 * @param {any} db The database.
 * @param {string} collection The collection containing the document.
 * @param {string} path The path to the data to download.
 * @returns The data content.
 */
export async function downloadData(db: any, collection: string, path: string) {
  const doc = await db.collection(collection).doc(path).get();
  return doc.data();
}

/**
 * Sets the path Downloads data from a document specified by a path.
 *
 * @param {any} db The database.
 * @param {string} collection The collection containing the document.
 * @param {string} path The path to the data to download.
 * @param {any=} value An optional value for the path.
 */
export async function setPath(
  db: any,
  collection: string,
  path: string,
  value: any = true
) {
  const doc = path.split('/')[0];
  const paths = await db.collection(collection).doc(doc).get();
  let data = paths.data();
  if (!data) {
    data = {};
  }
  data[path] = value;
  uploadData(db, collection, doc, data);
}

/**
 * Retrieves all paths for a given document in a collection.
 *
 * @param {any} db The database.
 * @param {string} collection The collection containing the document.
 * @param {string} doc The document name.
 * @returns The paths object.
 */
export async function getPaths(db: any, collection: string, doc: string) {
  const path = doc.split('/')[0];
  const paths = await db.collection(collection).doc(path).get();
  return paths.data();
}

/**
 * Updates data in collection B from collection A for a given document.
 *
 * @param {any} db The databae.
 * @param {string} collA Source collection.
 * @param {string} collB Target collection.
 * @param {string} doc The document to update.
 * @param callback
 * @returns List of info on loaded documents.
 */
export async function updateCollection(
  db: any,
  collA: string,
  collB: string,
  doc: string,
  callback: Function = (_x: string, _y: string[]) => {}
) {
  const result: { name: string; information: string; path: string }[] = [];
  const paths = await getPaths(db, collA, doc);
  if (!paths) {
    return result;
  }
  const pathsB = await getPaths(db, collB, doc);
  for (const [path, [name, info]] of Object.entries(paths) as [
    string,
    [string, string]
  ]) {
    callback(path, Object.keys(paths));
    result.push({
      name: name,
      information: info,
      path: path
    });
    // We assume single entries in symbol sets will not change.
    if (pathsB && pathsB[path] && !path.match(/^nemeth\/rules/)) {
      continue;
    }
    const dataA = await downloadData(db, collA, path);
    const dataB = await downloadData(db, collB, path);
    if (!dataB) {
      setTestsStatus(dataA);
      setTestsFeedback(dataA);
      await uploadData(db, collB, path, dataA);
      await setPath(db, collB, path);
      continue;
    }
    // Update single entries only for documents.
    const tests = dataB.tests;
    for (const key of dataA.order) {
      if (tests[key]) {
        continue;
      }
      const entryA: JsonTest = dataA.tests[key];
      setStatus(entryA);
      setFeedback(entryA);
      await updateData(db, collB, path, entryA, ['tests', key]);
    }
    await updateData(db, collB, path, dataA.order, ['order']);
  }
  return result;
}

// Update a field in all tests entries of a collection.
/**
 * @param db
 * @param collection
 * @param path
 * @param field
 * @param value
 */
export async function updateField(
  db: any,
  collection: string,
  path: string,
  field: string,
  value: any
) {
  const data = await downloadData(db, collection, path);
  for (const key of data.order) {
    await updateData(db, collection, path, value, ['tests', key, field]);
  }
}

/**
 * Restores a data field for all test entries in collection B from collection A
 * for a given document.
 *
 * @param {any} db The databae.
 * @param {string} collA Source collection.
 * @param {string} collB Target collection.
 * @param {string} doc The document to update. This has to be the complete path.
 * @param {string} field The field name.
 */
export async function restoreField(
  db: any,
  collA: string,
  collB: string,
  doc: string,
  field: string
) {
  const dataA = await downloadData(db, collA, doc);
  const dataB = await downloadData(db, collB, doc);
  if (!dataB) {
    return;
  }
  for (const key of dataB.order) {
    const testA = dataA.tests[key];
    if (!testA) {
      continue;
    }
    const value = testA[field];
    if (typeof value === 'undefined') {
      continue;
    }
    await updateData(db, collB, doc, value, ['tests', key, field]);
  }
}

// m-3792 m-4194 m-4526
/**
 * Sets the status of all tests to new.
 *
 * @param {JsonTests} tests The tests object.
 */
function setTestsStatus(tests: JsonTests) {
  for (const entry of Object.values(tests.tests)) {
    setStatus(entry);
  }
}

/**
 * Sets the status of a single test entry to new.
 *
 * @param {JsonTest} entry The test entry.
 */
function setStatus(entry: JsonTest) {
  entry[FC.Interaction] = FC.Status.NEW;
}

/**
 * Sets the feedback of all tests to new.
 *
 * @param {JsonTests} tests The tests object.
 */
function setTestsFeedback(tests: JsonTests) {
  for (const entry of Object.values(tests.tests)) {
    setFeedback(entry);
  }
}

/**
 * Sets the feedback of a single test entry to new.
 *
 * @param {JsonTest} entry The test entry.
 */
function setFeedback(entry: JsonTest) {
  entry[FC.FeedbackStatus] = FC.Feedback.CORRECT;
}

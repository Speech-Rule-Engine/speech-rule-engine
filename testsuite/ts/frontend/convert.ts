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
 * @file Front-end methods for conversion.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import { JsonTest } from '../base/test_util.js';
import * as FC from '../firebase/fire_constants.js';
import { FireTest } from '../firebase/fire_test.js';
import * as BT from '../generate/braille_transformer.js';
import {
  harvest as harvestButtons,
  init as initButtons,
  updateAccess
} from './buttons.js';
import * as LU from './local_util.js';

const transformers: Map<string, BT.BrailleTransformer> = new Map<
  string,
  BT.BrailleTransformer
>([
  ['NABT', new BT.Nabt2Unicode()],
  ['BLDT', new BT.Bldt2Unicode()],
  ['NABT-TABLE', new BT.Nabt2UnicodeTable()],
  ['BLDT-TABLE', new BT.Bldt2UnicodeTable()],
  ['SDF/JKL', new BT.Ascii2Braille('', '')],
  ['1-6', new BT.Numeric2Braille('', '')]
]);

const backtransformers: Map<string, BT.BrailleTransformer> = new Map<
  string,
  BT.BrailleTransformer
>([
  ['NABT', new BT.Unicode2Nabt()],
  ['BLDT', new BT.Unicode2Bldt()],
  ['SDF/JKL', new BT.Braille2Ascii('', '')],
  ['1-6', new BT.Braille2Numeric('', '')]
]);

let kind = 'NABT';

/**
 *
 */
function transformer() {
  return transformers.get(kind.toUpperCase());
}

/**
 *
 */
function backtransformer() {
  console.log(8);
  console.log(kind.toUpperCase());
  return backtransformers.get(kind.toUpperCase());
}

const field: { [name: string]: Element } = {};
export let fireTest: FireTest = null;
let current = '';

declare const MathJax: any;
declare const firebase: any;

/**
 * Method for setting the test into HTML elements.
 *
 * @param {JsonTest} test The test.
 */
function setTest(test: JsonTest) {
  field.mathname.innerHTML = test.name;
  field.mathexpression.innerHTML = test.input
    ? `<math display="block">${test.input}</math>`
    : test.tex
    ? `\\[${test.tex}\\]`
    : `${test.name}`;
  field.braille.innerHTML = test.expected as string;
  // TODO: Transform here, depending on the transformation value;
  (field.input as HTMLTextAreaElement).value = backtransformer().via(
    test.expected as string
  );
  (field.input as HTMLTextAreaElement).focus();
  setReferences(test.reference);
  setStatus(test[FC.Interaction]);
  setFeedback(test[FC.FeedbackStatus]);
  if (MathJax.typeset) {
    MathJax.typeset();
  }
  updateAccess();
}

/**
 *
 */
function setReferences(references: { [id: string]: string }) {
  field.refname.innerHTML = '';
  field.references.innerHTML = '';
  if (!references) {
    return;
  }
  const keys = Object.keys(references).sort((x, y) => {
    const numX = parseInt(x.split('-')[1], 10);
    const numY = parseInt(y.split('-')[1], 10);
    return numX < numY ? -1 : numX > numY ? 1 : 0;
  });
  const size = keys.length;
  if (!size) {
    return;
  }
  field.refname.innerHTML = 'References:';
  const links = [];
  const makeRef = size > 10 ? optionReference : linkReference;
  for (const id of keys) {
    const url = references[id];
    links.push(makeRef(id, url));
  }
  if (size <= 10) {
    field.references.append(...links);
    return;
  }
  const select = document.createElement('select');
  select.setAttribute('onChange', 'window.open(this.value, "_blank")');
  select.classList.add('access');
  const option = document.createElement('option');
  option.setAttribute('disabled', '');
  option.setAttribute('selected', '');
  option.textContent = 'Select:';
  select.appendChild(option);
  select.append(...links);
  field.references.appendChild(select);
}

/**
 * @param id
 * @param url
 */
function linkReference(id: string, url: string) {
  const link = document.createElement('a');
  link.classList.add('reflink');
  link.setAttribute('href', url);
  link.setAttribute('target', '_blank');
  link.textContent = id;
  return link;
}

/**
 * @param id
 * @param url
 */
function optionReference(id: string, url: string) {
  const option = document.createElement('option');
  option.classList.add('access');
  option.textContent = id;
  option.value = url;
  return option;
}

/**
 * @param feedback
 */
function setFeedback(feedback: FC.Feedback) {
  if (feedback !== undefined) {
    (field.feedback as HTMLButtonElement).value = feedback.toString();
  }
}

/**
 * @param status
 */
function setStatus(status: FC.Status) {
  if (status !== undefined && field.statuscolor && field.statusvalue) {
    switch (status) {
      case FC.Status.NEW:
        field.statuscolor.className = 'green';
        field.statusvalue.innerHTML = 'New';
        break;
      case FC.Status.VIEWED:
        field.statuscolor.className = 'yellow';
        field.statusvalue.innerHTML = 'Viewed';
        break;
      case FC.Status.CHANGED:
        field.statuscolor.className = 'red';
        field.statusvalue.innerHTML = 'Changed';
        break;
      default:
        field.statuscolor.className = '';
        field.statusvalue.innerHTML = '';
    }
  }
}

/**
 * Method for getting tests from HTML elements.
 *
 * @returns The test fields that are harvested from the HTML.
 */
function getTest(): JsonTest {
  return { expected: field.braille.innerHTML };
}

/**
 * @param collection
 * @param file
 */
function initConversion(collection: string, file: string) {
  if (firebase) {
    initFile(collection, file);
    return;
  }
  setTimeout(initConversion, 100);
}

/**
 *
 */
export function init() {
  const path = LU.getStorage(FC.NemethProjectPath);
  const user = LU.getStorage(FC.NemethProjectUser);
  if (path && user) {
    initConversion(user, path);
  }
}

/**
 * @param collection
 * @param file
 */
async function initFile(collection: string, file: string) {
  // TODO: Sort this out properly!
  const db = firebase.app().firestore();
  fireTest = new FireTest(db, collection, file, getTest, setTest);
  await fireTest.prepareTests();
  fillField();
  initButtons(fireTest);
  fireTest.setTest(fireTest.currentTest());
}

/**
 * Automatically fills all the field elements.
 */
function fillField() {
  const nodes = document.evaluate('//*[@id]', document.body);
  for (
    let node = nodes.iterateNext() as Element;
    node;
    node = nodes.iterateNext() as Element
  ) {
    field[node.id] = node;
  }
}

/**
 * @param str
 */
function translate(str: string) {
  const [input, error] = transformer().cleanInput(str);
  return [input, transformer().via(input), error];
}

/**
 * Generates with keyboard interaction.
 */
export function generate() {
  const ip = field.input as HTMLTextAreaElement;
  if (current === ip.value) {
    return;
  }
  if (kind.toUpperCase() === 'SDF/JKL') {
    collateKeys();
  }
  processKeys();
}

let collating = false;
/**
 *
 */
function collateKeys() {
  if (collating) {
    return;
  }
  collating = true;
  setTimeout(() => {
    collating = false;
    processKeys();
    const ip = field.input as HTMLTextAreaElement;
    if (ip.value[ip.value.length - 1] !== ',') {
      ip.value = ip.value + ',';
    }
  }, 100);
}

/**
 *
 */
function processKeys() {
  const ip = field.input as HTMLTextAreaElement;
  const cursor = ip.selectionStart;
  // let length = ip.value.length;
  field.braille.innerHTML = '';
  field.error.innerHTML = '';
  let [input, output, error] = translate(ip.value);
  if (error) {
    field.error.innerHTML =
      'Unknown ' + (error.length > 1 ? 'elements ' : 'element ') + error;
  }
  // Change status to changed
  if (input !== current) {
    setStatus(FC.Status.CHANGED);
  }
  ip.value = input;
  current = input;
  output = output.split('\n').join('<br>');
  field.braille.innerHTML = output;
  ip.selectionEnd = cursor - error.length;
}

/**
 * Generates with mouse interaction (e.g., copying).
 */
export function generatem() {
  setTimeout(generate, 100);
}

/**
 * Changes the brf format.
 */
export function changeFormat() {
  fireTest.saveTest(fireTest.getTest());
  kind = (field.format as HTMLButtonElement).value;
  fireTest.setTest(fireTest.currentTest());
}

/**
 * Changes the feedback entry.
 */
export function changeFeedback() {
  const value = parseInt((field.feedback as HTMLButtonElement).value, 10);
  fireTest.currentTest()[FC.FeedbackStatus] = value;
  fireTest.saveFeedback(value);
}

// Harvesting 2D tests.
/**
 *
 */
export function harvest() {
  const path = LU.getStorage(FC.NemethProjectPath);
  const user = LU.getStorage(FC.NemethProjectUser);
  if (path && user) {
    initHarvest(user, path);
  }
}

/**
 *
 */
function clearHarvest() {
  (field.mathinput as HTMLTextAreaElement).value = '';
  (field.input as HTMLTextAreaElement).value = '';
  generateMath();
  generate();
}

/**
 * @param user
 * @param path
 */
export async function initHarvest(user: string, path: string) {
  const db = firebase.app().firestore();
  fireTest = new FireTest(db, user, path, getTest, setTest);
  await fireTest.prepareTests();
  fillField();
  harvestButtons(fireTest, clearHarvest);
  console.log(path);
  console.log(user);
}

let currentMath = '';

/**
 * Generates with keyboard interaction.
 */
export function generateMath() {
  const ip = field.mathinput as HTMLTextAreaElement;
  if (currentMath === ip.value) {
    return;
  }
  currentMath = ip.value;
  processMath(ip.value);
}

/**
 * @param math
 */
function processMath(math: string) {
  field.mathexpression.innerHTML = `\\[${math}\\]`;
  if (MathJax.typeset) {
    MathJax.typeset();
  }
}

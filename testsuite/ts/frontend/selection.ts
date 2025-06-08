// Copyright 2021 Volker Sorge
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
 * @file Front-end methods for document selection.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import * as fc from '../firebase/fire_constants.js';
import * as lu from './local_util.js';

/**
 * @param id
 * @param path
 * @param info
 * @param anchor
 */
export function addSection(
  id: string,
  path: string,
  info: string,
  anchor: Element
) {
  info = `Select ${info} to work on:`;
  const hr = document.createElement('hr');
  hr.setAttribute(
    'style',
    'width:100%;border-width:0;background-color:#B1DF84;color:#B1DF84;height:6px'
  );
  const outerDiv = document.createElement('div');
  outerDiv.classList.add('converter');
  outerDiv.id = id + 'table';
  const innerDiv = document.createElement('div');
  innerDiv.classList.add('section');
  innerDiv.textContent = info;
  const table = createTable(id, path);
  outerDiv.append(innerDiv, table);
  anchor.append(hr, outerDiv);
}

/**
 * @param id
 * @param path
 */
function createTable(id: string, path: string): Element {
  const table = document.createElement('table');
  table.id = id;
  const tr = document.createElement('tr');
  tr.classList.add('heading');
  tr.innerHTML = '<th>Name</th><th>Information</th><th>Path</th>';
  table.appendChild(tr);
  addDocuments(table, path);
  return table;
}

/**
 * Adds a collection of documents to a table. Documents are selected from the
 * local storage by matching a given regular expression.
 *
 * @param node The anchor element of the table.
 * @param path The regexp representing the path to choose the documents.
 */
export function addDocuments(node: Element, path: string) {
  const storage = lu.getStorage(fc.NemethProjectDocuments);
  if (storage) {
    const documents = JSON.parse(storage);
    createRows(
      documents.filter((doc: any) => doc.path.match(path)),
      node
    );
  }
}

/**
 * @returns The ID of the current user.
 */
export function getUid() {
  return (lu.getFirebase().auth() as any).getUid();
}

/**
 * Creates and adds rows to a table, one for each of the documents to select.
 *
 * @param documents The collection of documents.
 * @param anchor The table element where to add the rows.
 */
function createRows(documents: any, anchor: Element) {
  documents.sort((x: any, y: any) => ('' + x.name).localeCompare(y.name));
  for (const entry of documents) {
    const row = document.createElement('tr');
    row.setAttribute('tabindex', '0');
    row.classList.add('selection');
    row.innerHTML =
      `<td class="selection">${entry.name}</td>` +
      `<td>${entry.information}</td><td>${entry.path}</td>`;
    row.addEventListener('click', () => {
      lu.setStorage(fc.NemethProjectPath, entry.path);
      lu.setStorage(fc.NemethProjectUser, getUid());
      window.location.assign('brf2nemeth.html');
    });
    row.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        lu.setStorage(fc.NemethProjectPath, entry.path);
        lu.setStorage(fc.NemethProjectUser, getUid());
        window.location.assign('brf2nemeth.html');
      }
    });
    anchor.appendChild(row);
  }
}

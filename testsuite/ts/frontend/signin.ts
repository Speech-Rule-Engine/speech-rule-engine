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
 * @file Front-end methods for signing in.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import * as fc from '../firebase/fire_constants.js';
import * as fu from '../firebase/fire_util.js';
import * as lu from './local_util.js';

/**
 * @param db
 * @param collA
 * @param collB
 * @param doc
 */
async function updateFirebase(
  db: any,
  collA: string,
  collB: string,
  doc: string
) {
  let count = 0;
  const div = document.createElement('div');
  document.body.appendChild(div);
  const result = await fu.updateCollection(
    db,
    collA,
    collB,
    doc,
    (_x: string, y: string[]) => {
      const span = document.createElement('span');
      span.textContent = '.';
      document.body.insertBefore(span, div);
      div.textContent = `File (${++count}/${y.length})`;
    }
  );
  lu.setStorage(fc.NemethProjectDocuments, JSON.stringify(result));
}

/**
 * @param authResult
 */
async function update(authResult: any) {
  const div = document.createElement('span');
  div.textContent = 'Updating.';
  document.body.appendChild(div);
  await updateFirebase(
    lu.getFirebase().firestore(),
    fc.TestsCollection,
    authResult.user.uid,
    fc.NemethCollection
  );
  window.location.assign('selection.html');
}

const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult: any) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      update(authResult);
      return false;
    },
    uiShown: function () {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById('loader').style.display = 'none';
    }
  },
  // Will use popup for IDP Providers sign-in flow instead of the default,
  // redirect.
  signInSuccessUrl: 'brf2nemeth.html',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    (lu.getFirebase().auth as any).EmailAuthProvider.PROVIDER_ID
  ],
  // Terms of service url.
  tosUrl: 'privacy.html',
  // Privacy policy url.
  privacyPolicyUrl: 'privacy.html'
};

/**
 * The init method.
 *
 * @param fireui
 * @param id
 * @param config
 */
export function init(fireui: any, id: string, config = uiConfig) {
  const ui = new fireui.auth.AuthUI(lu.getFirebase().auth());
  ui.start(id, config);
}

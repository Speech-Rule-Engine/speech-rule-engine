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
 * @file Front-end methods for user handling. Relies on firebase.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

declare const firebase: any;

/**
 * Displays the UI for a signed in user.
 *
 * @param user The uid of the current user.
 * @param user.displayName
 * @param user.email
 */
export function handleSignedInUser(user: {
  displayName: string;
  email: string;
}) {
  document.getElementById('user-signed-in').style.display = 'inline';
  document.getElementById('name').textContent = user.displayName;
  document.getElementById('email').textContent = user.email;
}

/**
 * Displays the UI for a signed out user.
 */
export function handleSignedOutUser() {
  document.getElementById('user-signed-in').style.display = 'none';
  window.location.replace('.');
}

/**
 * Deletes the user's account.
 */
export function deleteAccount() {
  if (window.confirm('Are you sure you want to delete your account?')) {
    firebase
      .auth()
      .currentUser.delete()
      .catch((error: any) => {
        if (error.code === 'auth/requires-recent-login') {
          // The user's credential is too old. She needs to sign in again.
          firebase
            .auth()
            .signOut()
            .then(function () {
              // The timeout allows the message to be displayed after the UI has
              // changed to the signed out state.
              setTimeout(function () {
                alert('Please sign in again to delete your account.');
              }, 1);
            });
        }
      });
  }
}

/**
 * Adds the user span actual.
 */
export function addSpan() {
  const span = document.createElement('span');
  let inner = '<span id="user-signed-in" class="hidden">';
  inner += '<span id="user-info"><span id="name"></span>';
  inner += '(<span id="email"></span>)<div>';
  inner += '<span><button id="sign-out">Sign Out</button></span>';
  inner += '<span><button id="delete-account">Delete account</button></span>';
  inner += '</div></span></span>';
  span.innerHTML = inner;
  document.body.appendChild(span);
  document.getElementById('sign-out').addEventListener('click', function () {
    firebase.auth().signOut();
  });
  document
    .getElementById('delete-account')
    .addEventListener('click', function () {
      deleteAccount();
    });
}

/**
 * Init the user handling.
 */
export function init() {
  addSpan();
  firebase
    .auth()
    .onAuthStateChanged((user: { displayName: string; email: string }) => {
      user ? handleSignedInUser(user) : handleSignedOutUser();
    });
}

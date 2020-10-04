// Copyright 2014 Volker Sorge
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
 * @fileoverview This is the file that takes care of some of the underlying
 * system dependencies.  In particular, any dependency on NodeJS, like require
 * statements, should go in this file.  Ideally only this file should depend on
 * extern.js.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */
goog.provide('sretest.TestExternal');



/**
 * @constructor
 */
sretest.TestExternal = function() { };


/**
 * The local require function for NodeJS.
 * @param {string} library A library name.
 * @return {Object} The library object that has been loaded.
 */
sretest.TestExternal.require = function(library) {
  return require(library);
};


/**
 * Filesystem library.
 * @type {Object}
 */
sretest.TestExternal.fs = sretest.TestExternal.require('fs');


/**
 * Assert library.
 * @type {Object}
 */
sretest.TestExternal.assert = sretest.TestExternal.require('assert');


/**
 * Process library.
 * @type {Object}
 */
sretest.TestExternal.process = process;


/**
 * Path to JSON files.
 * @type {string}
 */
sretest.TestExternal.path = function() {
  return ((sretest.TestExternal.process && typeof global !== 'undefined') ?
          sretest.TestExternal.process.cwd() : '.') + '/tests/';
}();


/**
 * Xmldom library.
 * @type {Object}
 */
sretest.TestExternal.xmldom = sretest.TestExternal.require('xmldom-sre');


sretest.TestExternal.sre = sretest.TestExternal.require('./sre.js').sre;

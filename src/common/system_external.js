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
goog.provide('sre.SystemExternal');



/**
 * @constructor
 */
sre.SystemExternal = function() { };


/**
 * Check if location is already supported in this JS.
 * @return {boolean} True if location is defined.
 */
sre.SystemExternal.locationSupported = function() {
  return !(typeof(location) == 'undefined');
};


/**
 * The URL for SRE resources.
 * @const
 * @type {string}
 */
sre.SystemExternal.url =  sre.SystemExternal.locationSupported() ?
    location.protocol + '//' + 'progressiveaccess.com/content' :
    'https://progressiveaccess.com/content';


/**
 * Path to JSON files.
 * @const
 * @type {string}
 */
sre.SystemExternal.jsonPath = function() {
  return ((typeof process !== 'undefined' && typeof global !== 'undefined') ?
      (process.env.SRE_JSON_PATH || global.SRE_JSON_PATH || process.cwd()) :
          sre.SystemExternal.url + '/mathmaps')
    + '/';
}();


/**
 * The local require function for NodeJS.
 * @param {string} library A library name.
 * @return {Object} The library object that has been loaded.
 */
sre.SystemExternal.require = function(library) {
  if (typeof require !== 'undefined') {
    return require(library);
  }
  return null;
};


/**
 * Check if DOM document is already supported in this JS.
 * @return {boolean} True if document is defined.
 */
sre.SystemExternal.documentSupported = function() {
  return !(typeof(document) == 'undefined');
};


/**
 * Xmldom library.
 * @type {Object}
 */
sre.SystemExternal.xmldom = sre.SystemExternal.documentSupported() ?
    window :
    sre.SystemExternal.require('xmldom');


/**
 * DOM document implementation.
 * @type {Object}
 */
sre.SystemExternal.document = sre.SystemExternal.documentSupported() ?
    document :
    (new sre.SystemExternal.xmldom.DOMImplementation()).
        createDocument('', '', 0);


/**
 * Xpath library.
 * @type {Object}
 */
sre.SystemExternal.xpath = sre.SystemExternal.documentSupported() ?
    document : sre.SystemExternal.require('xpath');


/**
 * Commander library.
 * @type {Object}
 */
sre.SystemExternal.commander = sre.SystemExternal.documentSupported() ?
    null : sre.SystemExternal.require('commander');


/**
 * Filesystem library.
 * @type {Object}
 */
sre.SystemExternal.fs = sre.SystemExternal.documentSupported() ?
    null : sre.SystemExternal.require('fs');

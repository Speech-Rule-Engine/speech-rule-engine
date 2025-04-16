//
// Copyright 2014-21 Volker Sorge
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
 * @file This is the file that takes care of some of the underlying
 * system dependencies.  In particular, any dependency on NodeJS, like require
 * statements, should go in this file.  Ideally only this file should depend on
 * extern.js.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import { Variables } from './variables.js';
import { xpath, xmldom, document } from './lib_external.js';

declare let global: any;
declare let require: (name: string) => any;
declare let process: any;
declare const DedicatedWorkerGlobalScope: any;

const windowSupported = (() => !(typeof window === 'undefined'))();
const documentSupported = (() =>
  windowSupported && !(typeof window.document === 'undefined'))();
const webworker = (() =>
  !(typeof DedicatedWorkerGlobalScope === 'undefined'))();
const nodeRequire = () => eval('require');

export const SystemExternal: any = {
  /**
   * The local require function for NodeJS.
   *
   * @param library A library name.
   * @returns The library object that has been loaded.
   */
  extRequire(library: string) {
    if (typeof process !== 'undefined' && typeof require !== 'undefined') {
      return nodeRequire()(library);
    }
    return null;
  },

  windowSupported: windowSupported,

  /**
   * Check if DOM document is already supported in this JS.
   *
   * @returns True if document is defined.
   */
  documentSupported: documentSupported,

  /**
   * Check if webworker environment.
   *
   * @returns True if the DedicatedWorkerGlobalScope is available.
   */
  webworker: webworker,

  /**
   * Xmldom library.
   */
  xmldom: xmldom,

  /**
   * DOM document implementation.
   */
  document: document,

  /**
   * The URL for Mathmaps for IE.
   */
  mathmapsIePath:
    'https://cdn.jsdelivr.net/npm/sre-mathmaps-ie@' +
    Variables.VERSION +
    'mathmaps_ie.js',

  /**
   * Filesystem library.
   */
  fs: documentSupported || webworker ? null : nodeRequire()('fs'),

  /**
   * The URL for SRE resources.
   */
  url: Variables.url,

  /**
   * Path to JSON files.
   */
  jsonPath: (function () {
    if (documentSupported || webworker) {
      return Variables.url;
    }
    if (process.env.SRE_JSON_PATH || global.SRE_JSON_PATH) {
      return process.env.SRE_JSON_PATH || global.SRE_JSON_PATH;
    }
    try {
      const path = nodeRequire().resolve('speech-rule-engine');
      return path.replace(/sre\.js$/, '') + 'mathmaps';
    } catch (_err) {
      // continue regardless of error
    }
    try {
      const path = nodeRequire().resolve('.');
      return path.replace(/sre\.js$/, '') + 'mathmaps';
    } catch (_err) {
      // continue regardless of error
    }
    return typeof __dirname !== 'undefined'
      ? __dirname + (__dirname.match(/lib?$/) ? '/mathmaps' : '/lib/mathmaps')
      : process.cwd() + '/lib/mathmaps';
  })(),

  /**
   * Path to Xpath library file.
   */
  WGXpath: Variables.WGXpath,

  /**
   * WGXpath library.
   */
  wgxpath: null as any,

  xpath: xpath
};

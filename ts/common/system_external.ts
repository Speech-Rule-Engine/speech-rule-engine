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

declare let global: any;
declare let require: (name: string) => any;
declare let process: any;

export class SystemExternal {
  /**
   * @returns The require method in node.
   */
  public static nodeRequire() {
    return eval('require');
  }

  /**
   * The local require function for NodeJS.
   *
   * @param library A library name.
   * @returns The library object that has been loaded.
   */
  public static extRequire(library: string) {
    if (typeof process !== 'undefined' && typeof require !== 'undefined') {
      // System.external.nodeRequire = eval('require');
      return SystemExternal.nodeRequire()(library);
    }
    return null;
  }

  public static windowSupported: boolean = (() =>
    !(typeof window === 'undefined'))();

  /**
   * Check if DOM document is already supported in this JS.
   *
   * @returns True if document is defined.
   */
  public static documentSupported: boolean = (() =>
    SystemExternal.windowSupported &&
    !(typeof window.document === 'undefined'))();

  /**
   * Xmldom library.
   */
  public static xmldom = SystemExternal.documentSupported
    ? window
    : SystemExternal.extRequire('@xmldom/xmldom');

  /**
   * DOM document implementation.
   */
  public static document: Document = SystemExternal.documentSupported
    ? window.document
    : new SystemExternal.xmldom.DOMImplementation().createDocument('', '', 0);

  /**
   * Xpath library.
   */
  public static xpath: any = SystemExternal.documentSupported
    ? document
    : (function () {
        const window = { document: {}, XPathResult: {} };
        const wgx = SystemExternal.extRequire('wicked-good-xpath');
        wgx.install(window);
        (window.document as any).XPathResult = window.XPathResult;
        return window.document;
      })();

  /**
   * The URL for Mathmaps for IE.
   */
  public static mathmapsIePath =
    'https://cdn.jsdelivr.net/npm/sre-mathmaps-ie@' +
    Variables.VERSION +
    'mathmaps_ie.js';

  /**
   * Filesystem library.
   */
  public static fs = SystemExternal.documentSupported
    ? null
    : SystemExternal.extRequire('fs');

  /**
   * The URL for SRE resources.
   */
  public static url: string = Variables.url;

  /**
   * Path to JSON files.
   */
  public static jsonPath = (function () {
    if (SystemExternal.documentSupported) {
      return SystemExternal.url;
    }
    if (process.env.SRE_JSON_PATH || global.SRE_JSON_PATH) {
      return process.env.SRE_JSON_PATH || global.SRE_JSON_PATH;
    }
    try {
      const path = SystemExternal.nodeRequire().resolve('speech-rule-engine');
      return path.replace(/sre\.js$/, '') + 'mathmaps';
    } catch (_err) {
      // continue regardless of error
    }
    try {
      const path = SystemExternal.nodeRequire().resolve('.');
      return path.replace(/sre\.js$/, '') + 'mathmaps';
    } catch (_err) {
      // continue regardless of error
    }
    return typeof __dirname !== 'undefined'
      ? __dirname + (__dirname.match(/lib?$/) ? '/mathmaps' : '/lib/mathmaps')
      : process.cwd() + '/lib/mathmaps';
  })();

  /**
   * Path to Xpath library file.
   */
  public static WGXpath = Variables.WGXpath;

  /**
   * WGXpath library.
   */
  public static wgxpath: any = null;
}

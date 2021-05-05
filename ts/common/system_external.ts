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
 * @fileoverview This is the file that takes care of some of the underlying
 * system dependencies.  In particular, any dependency on NodeJS, like require
 * statements, should go in this file.  Ideally only this file should depend on
 * extern.js.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */


import {Variables} from './variables';


namespace SystemExternal {

  declare var global: any;
  declare var require: (name: string) => any;
  declare var process: any;

  /**
   * The local require function for NodeJS.
   * @param library A library name.
   * @return The library object that has been loaded.
   */
  export function extRequire(library: string): any {
    if (typeof process !== 'undefined' && typeof require !== 'undefined') {
      return require(library);
    }
    return null;
  }

  /**
   * Check if DOM document is already supported in this JS.
   * @return True if document is defined.
   */
  export const documentSupported: boolean =
    (() => !(typeof document === 'undefined'))();

  /**
   * Process library.
   */
  export const nodeProcess: any = function() {
    return SystemExternal.extRequire('process');
  }();

  /**
   * Xmldom library.
   */
  export const xmldom = SystemExternal.documentSupported ?
    window :
    SystemExternal.extRequire('xmldom-sre');

  /**
   * DOM document implementation.
   */
  export const document: Document = SystemExternal.documentSupported ?
    window.document :
    (new SystemExternal.xmldom.DOMImplementation()).createDocument('', '', 0);

  /**
   * Xpath library.
   */
  export const xpath: any =
    SystemExternal.documentSupported ? document : function() {
      let window = {document: {}, XPathResult: {}};
      let wgx = SystemExternal.extRequire('wicked-good-xpath');
      wgx.install(window);
      (window.document as any).XPathResult = window.XPathResult;
      return window.document;
    }();

  /**
   * Commander library.
   */
  export const commander = SystemExternal.documentSupported ?
    null :
    SystemExternal.extRequire('commander');

  /**
   * Filesystem library.
   */
  export const fs =
    SystemExternal.documentSupported ? null : SystemExternal.extRequire('fs');


  /**
   * The URL for SRE resources.
   */
  export const url: string = Variables.url;

  /**
   * Path to JSON files.
   */
  export let jsonPath = function() {
    return (SystemExternal.nodeProcess && typeof global !== 'undefined' ?
      SystemExternal.nodeProcess.env.SRE_JSON_PATH ||
      global.SRE_JSON_PATH || SystemExternal.nodeProcess.cwd() :
      SystemExternal.url) +
      '/';
  }();

  /**
   * Path to Xpath library file.
   */
  export let WGXpath = Variables.WGXpath;


  /**
   * WGXpath library.
   */
  export let wgxpath: any = null;


}

export default SystemExternal;

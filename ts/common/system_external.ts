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



export class SystemExternal {
  static process: Object;


  static xmldom: Object;


  static document: Object;


  static xpath: Object;


  static commander: Object;


  static fs: Object;


  /**
   * The URL for SRE resources.
   */
  static readonly url: string = Variables.url;


  static jsonPath: string;


  static WGXpath: string;


  /**
   * WGXpath library.
   */
  static wgxpath: Object = null;


  /**
   * The local require function for NodeJS.
   * @param library A library name.
   * @return The library object that has been loaded.
   */
  static require(library: string): Object {
    if (typeof process !== 'undefined' && typeof require !== 'undefined') {
      return require(library);
    }
    return null;
  }


  /**
   * Check if DOM document is already supported in this JS.
   * @return True if document is defined.
   */
  static documentSupported(): boolean {
    return !(typeof document == 'undefined');
  }
}
/**
 * Process library.
 */
SystemExternal.process = SystemExternal.require('process');
/**
 * Xmldom library.
 */
SystemExternal.xmldom = SystemExternal.documentSupported() ?
    window :
    SystemExternal.require('xmldom-sre');
/**
 * DOM document implementation.
 */
SystemExternal.document = SystemExternal.documentSupported() ?
    document :
    (new SystemExternal.xmldom.DOMImplementation()).createDocument('', '', 0);
/**
 * Xpath library.
 */
SystemExternal.xpath =
    SystemExternal.documentSupported() ? document : function() {
      let window = {document: {}, XPathResult: {}};
      let wgx = SystemExternal.require('wicked-good-xpath');
      wgx.install(window);
      window.document.XPathResult = window.XPathResult;
      return window.document;
    }();
/**
 * Commander library.
 */
SystemExternal.commander = SystemExternal.documentSupported() ?
    null :
    SystemExternal.require('commander');
/**
 * Filesystem library.
 */
SystemExternal.fs =
    SystemExternal.documentSupported() ? null : SystemExternal.require('fs');
/**
 * Path to JSON files.
 */
SystemExternal.jsonPath = function() {
  return (SystemExternal.process && typeof global !== 'undefined' ?
              SystemExternal.process.env.SRE_JSON_PATH ||
                  global.SRE_JSON_PATH || SystemExternal.process.cwd() :
              SystemExternal.url) +
      '/';
}();
/**
 * Path to Xpath library file.
 */
SystemExternal.WGXpath = Variables.WGXpath;

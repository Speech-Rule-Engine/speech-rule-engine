//
// Copyright 2014 Volker Sorge
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//      http://www.apache.org/licenses/LICENSE-2.0
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

export class TestExternal {

  public static assert: Object;

  public static path: string;

  public static xmldom: Object;

  public static sre: any;

  /**
   * The local require function for NodeJS.
   * @param library A library name.
   * @return The library object that has been loaded.
   */
  public static require(library: string): Object {
    return require(library);
  }
}
// /**
//  * Filesystem library.
//  */
// export const fs = require('fs');
/**
 * Assert library.
 */
TestExternal.assert = TestExternal.require('assert');

/**
 * Path to JSON files.
 */
TestExternal.path =  './tests/';

/**
 * Xmldom library.
 */
TestExternal.xmldom = TestExternal.require('xmldom-sre');

export const sre = require('../lib/sre.js').sre;

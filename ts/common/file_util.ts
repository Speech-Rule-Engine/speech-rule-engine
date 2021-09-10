//
// Copyright 2015-21 Volker Sorge
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
 * @fileoverview A collection of utilities dealing with file handling. These
 *     only depend on system external to handle different load methods.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */


import SystemExternal from './system_external';


/**
 * Corrects pathnames to have trailing slashes.
 * @param path The original path.
 * @return The path that has definitely a trailing slash.
 */
export function makePath(path: string): string {
  return path.match('/$') ? path : path + '/';
}


/**
 * Returns the default locale path, depending on the mode of operation.
 *
 * @param locale The locale iso.
 * @param ext An optional file extension. Defaults to json.
 */
export function localePath(locale: string, ext: string = 'json') {
  return makePath(SystemExternal.jsonPath) + locale +
    (ext.match(/^\./) ? ext : '.' + ext);
}

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
 * @file Variables for sre.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

export class Variables {
  /**
   * SRE version.
   */
  public static readonly VERSION: string = '4.0.6';

  /**
   * Locale mapping to language names.
   */
  public static readonly LOCALES: Map<string, string> = new Map([
    ['ca', 'Catalan'],
    ['da', 'Danish'],
    ['de', 'German'],
    ['en', 'English'],
    ['es', 'Spanish'],
    ['fr', 'French'],
    ['hi', 'Hindi'],
    ['it', 'Italian'],
    ['nb', 'Bokmål'],
    ['nn', 'Nynorsk'],
    ['sv', 'Swedish'],
    ['nemeth', 'Nemeth']
  ]);

  /**
   * Ensures a locale exists. If the given locale does not exist, it returns the
   * default instead.
   *
   * @param loc The locale in question.
   * @param def A default locale.
   * @returns The existing locale. The default is returned if `loc` does not
   *      exist. There is no further check on `def`, however!
   */
  public static ensureLocale(loc: string, def: string): string {
    if (!Variables.LOCALES.get(loc)) {
      console.error(
        `Locale ${loc} does not exist! Using` +
          ` ${Variables.LOCALES.get(def)} instead.`
      );
      return def;
    }
    return loc;
  }

  /**
   * MathJax version. This indicates the lowest MathJax version this version of
   * SRE is compatible with.
   */
  public static readonly mathjaxVersion: string = '3.2.1';

  /**
   * The URL for SRE resources.
   */
  public static readonly url: string =
    'https://cdn.jsdelivr.net/npm/speech-rule-engine@' +
    Variables.VERSION +
    '/lib/mathmaps';

  /**
   * Path to Xpath library file.
   */
  public static readonly WGXpath: string =
    'https://cdn.jsdelivr.net/npm/wicked-good-xpath@1.3.0/dist/wgxpath.install.js';
}

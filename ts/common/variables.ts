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
  public static readonly VERSION: string = '4.0.1';

  /**
   * List of locales to load.
   */
  public static readonly LOCALES: string[] = [
    'en',
    'ca',
    'da',
    'de',
    'fr',
    'es',
    'hi',
    'it',
    'nb',
    'nn',
    'sv',
    'nemeth'
  ];

  /**
   * MathJax version. This is useful for paths depending on MathJax
   * distribution.
   */
  public static readonly mathjaxVersion: string = '3.0.0';

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

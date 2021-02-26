// Copyright 2014-18 Volker Sorge
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
 * @fileoverview Variables for sre.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */
goog.provide('sre.Variables');



/**
 * @constructor
 */
sre.Variables = function() {};


/**
 * SRE version.
 * @const
 * @type {string}
 */
sre.Variables.VERSION = '3.2.0-beta.1';


/**
 * List of locales to load.
 * @const
 * @type {!Array.<string>}
 */
sre.Variables.LOCALES = ['en', 'de', 'fr', 'es', 'it', 'nemeth'];


/**
 * MathJax version. This is useful for paths depending on MathJax distribution.
 * @const
 * @type {string}
 */
sre.Variables.mathjaxVersion = '3.0.0';


/**
 * The URL for SRE resources.
 * @const
 * @type {string}
 */
sre.Variables.url = 'https://cdn.jsdelivr.net/npm/speech-rule-engine@' +
    sre.Variables.VERSION + '/lib/mathmaps';


/**
 * Path to Xpath library file.
 * @const
 * @type {string}
 */
sre.Variables.WGXpath =
    'https://cdn.jsdelivr.net/npm/wicked-good-xpath@1.3.0/dist/wgxpath.install.js';



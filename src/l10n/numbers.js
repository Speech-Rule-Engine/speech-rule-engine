// Copyright 2020 Volker Sorge
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
 * @fileoverview Basic types and structurs for localised numbers.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.Numbers');


/**
 * @typedef {function(number): string}
 */
sre.Numbers.NumberToString;


/**
 * @typedef {function(number, boolean): string}
 */
sre.Numbers.NumberToGrammarString;


/**
 * @typedef {{
 *   wordOrdinal: (sre.Numbers.NumberToString|undefined),
 *   simpleOrdinal: (sre.Numbers.NumberToString|undefined),
 *   numberToWords: (sre.Numbers.NumberToString|undefined),
 *   numberToOrdinal: (sre.Numbers.NumberToGrammarString|undefined),
 *   vulgarSep: string,
 *   numSep: (string|undefined)
 * }}
 */
sre.Numbers;


/**
 * A trivial translator of numbers into string.
 * @param {number} num A number.
 * @return {string} The number as a string.
 * @private
 */
sre.Numbers.identityTransformer_ = function(num) {
  return num.toString();
};


/**
 * A trivial translator of numbers with plural.
 * @param {number} num A number.
 * @param {boolean} plural A flag indicating plural.
 * @return {string} The number as a string.
 * @private
 */
sre.Numbers.pluralTransformer_ = function(num, plural) {
  return num.toString();
};


/**
 * @type {sre.Numbers}
 */
sre.Numbers.NUMBERS = {
  wordOrdinal: sre.Numbers.identityTransformer_,
  simpleOrdinal: sre.Numbers.identityTransformer_,
  numberToWords: sre.Numbers.identityTransformer_,
  numberToOrdinal: sre.Numbers.pluralTransformer_,
  vulgarSep: ' ',
  numSep: ' '
};

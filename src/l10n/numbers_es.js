// Copyright 2019 Volker Sorge
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
 * @fileoverview Translating numbers into Spanish.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.Numbers.es');

goog.require('sre.Messages');


/**
 * String representation of zero to nineteen.
 * @type {Array.<string>}
 * @private
 */
sre.Numbers.es.onesOrdinals_ = [
  'primera', 'segunda', 'tercera', 'cuarta', 'quinta', 'sexta', 'séptima',
  'octava', 'novena', 'décima', 'undécima', 'duodécima'
];


/**
 * String representation of twenty to ninety.
 * @type {Array.<string>}
 * @private
 */
sre.Numbers.es.tensOrdinals_ = [
  'décima', 'vigésima', 'trigésima', 'cuadragésima', 'quincuagésima',
  'sexagésima', 'septuagésima', 'octogésima', 'nonagésima'
];


/**
 * String representation of thousand to decillion.
 * @type {Array.<string>}
 * @private
 */
sre.Numbers.es.hundredsOrdinals_ = [
  'centésima', 'ducentésima', 'tricentésima', 'cuadringentésima',
  'quingentésima', 'sexcentésima', 'septingentésima', 'octingentésima',
  'noningentésima'
];


/**
 * Translates a number into Spanish ordinal
 * @param {number} num The number to translate.
 * @param {boolean} plural A flag indicating if the ordinal is in plural.
 * @return {string} The ordinal of the number as string.
 */
sre.Numbers.es.numberToOrdinal = function(num, plural) {
  if (num > 1999) {
    return num.toString() + 'a';
  }
  if (num <= 12) {
    return sre.Numbers.es.onesOrdinals_[num - 1];
  }
  var result = [];
  if (num > 1000) {
    num = num - 1000;
    result.push('milésima');
  }
  var pos = 0;
  pos = Math.floor(num / 100);
  if (pos > 0) {
    result.push(sre.Numbers.es.hundredsOrdinals_[pos - 1]);
    num = num % 100;
  }
  if (num <= 12) {
    result.push(sre.Numbers.es.onesOrdinals_[num - 1]);
  } else {
    pos = Math.floor(num / 10);
    if (pos > 0) {
      result.push(sre.Numbers.es.tensOrdinals_[pos - 1]);
      num = num % 10;
    }
    if (num > 0) {
      result.push(sre.Numbers.es.onesOrdinals_[num - 1]);
    }
  }
  return result.join(' ');
};


/**
 * Creates a simple ordinal string from a number.
 * @param {number} number The number to be converted.
 * @return {string} The ordinal string.
 */
sre.Numbers.es.simpleOrdinal = function(number) {
  var gender = /** @type {string} */(
      sre.Grammar.getInstance().getParameter('gender'));
  return number.toString() + (gender === 'female' ? 'a' : 'o');
};


sre.Numbers.es.NUMBERS = {
  // wordOrdinal: sre.Numbers.es.wordOrdinal,
  simpleOrdinal: sre.Numbers.es.simpleOrdinal,
  // numberToWords: sre.Numbers.es.numberToWords,
  numberToOrdinal: sre.Numbers.es.numberToOrdinal,
  vulgarSep: '-'
};

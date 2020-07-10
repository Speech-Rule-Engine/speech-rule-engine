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

//
// This work was sponsored by ETH Zurich
//

/**
 * @fileoverview Translating numbers into German.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.Numbers.de');


/**
 * String representation of zero to nineteen.
 * @type {Array.<string>}
 * @private
 */
sre.Numbers.de.onesNumbers_ = [
  '', 'eins', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben',
  'acht', 'neun', 'zehn', 'elf', 'zwölf', 'dreizehn', 'vierzehn',
  'fünfzehn', 'sechzehn', 'siebzehn', 'achtzehn', 'neunzehn'
];


/**
 * String representation of twenty to ninety.
 * @type {Array.<string>}
 * @private
 */
sre.Numbers.de.tensNumbers_ = [
  '', '', 'zwanzig', 'dreißig', 'vierzig', 'fünfzig', 'sechzig',
  'siebzig', 'achtzig', 'neunzig'
];


/**
 * String representation of thousand to decillion.
 * @type {Array.<string>}
 * @private
 */
sre.Numbers.de.largeNumbers_ = [
  '', 'tausend', 'million', 'milliarde', 'billion', 'billiarde', 'trillion',
  'trilliard', 'quadrillion', 'quadrilliard', 'quintillion', 'quintilliarde',
  'sextillion', 'sextilliarde',
];


/**
 * Changes number one 'eins' into a prefix.
 * @param {string} num number string.
 * @return {string} If it is a one, it is made into prefix.
 * @private
 */
sre.Numbers.de.onePrefix_ = function(num) {
  return num === sre.Numbers.de.onesNumbers_[1] ? 'ein' : num;
};


/**
 * Translates a number of up to twelve digits into a string representation.
 * @param {number} number The number to translate.
 * @return {string} The string representation of that number.
 * @private
 */
sre.Numbers.de.hundredsToWords_ = function(number) {
  var n = number % 1000;
  var str = '';
  var ones = sre.Numbers.de.onesNumbers_[Math.floor(n / 100)];
  str += ones ? sre.Numbers.de.onePrefix_(ones) + 'hundert' : '';
  n = n % 100;
  if (n) {
    str += str ? sre.Numbers.de.NUMBERS.numSep : '';
    ones = sre.Numbers.de.onesNumbers_[n];
    if (ones) {
      str += ones;
    } else {
      var tens = sre.Numbers.de.tensNumbers_[Math.floor(n / 10)];
      ones = sre.Numbers.de.onesNumbers_[n % 10];
      str += ones ? sre.Numbers.de.onePrefix_(ones) + 'und' + tens : tens;
    }
  }
  return str;
};


/**
 * Translates a number of up to twelve digits into a string representation.
 * @param {number} number The number to translate.
 * @return {string} The string representation of that number.
 */
sre.Numbers.de.numberToWords = function(number) {
  if (number >= Math.pow(10, 36)) {
    return number.toString();
  }
  var pos = 0;
  var str = '';
  while (number > 0) {
    var hundreds = number % 1000;
    if (hundreds) {
      var hund = sre.Numbers.de.hundredsToWords_(number % 1000);
      str = sre.Numbers.de.onePrefix_(hund) +
          (pos ? sre.Numbers.de.largeNumbers_[pos] : '') +
          str;
    }
    number = Math.floor(number / 1000);
    pos++;
  }
  return str.replace(/ein$/, 'eins');
};


/**
 * Translates a number of up to twelve digits into a string representation of
 * its ordinal.
 * @param {number} num The number to translate.
 * @param {boolean} plural A flag indicating if the ordinal is in plural.
 * @return {string} The ordinal of the number as string.
 */
sre.Numbers.de.numberToOrdinal = function(num, plural) {
  if (num === 1) {
    return 'eintel';
  }
  if (num === 2) {
    return plural ? 'halbe' : 'halb';
  }
  return sre.Numbers.de.wordOrdinal(num) + 'l';
};


/**
 * Creates a word ordinal string from a number.
 * @param {number} number The number to be converted.
 * @return {string} The ordinal string.
 */
sre.Numbers.de.wordOrdinal = function(number) {
  if (number === 1) {
    return 'erste';
  }
  if (number === 3) {
    return 'dritte';
  }
  if (number === 7) {
    return 'siebte';
  }
  if (number === 8) {
    return 'achte';
  }
  var ordinal = sre.Numbers.de.numberToWords(number);
  return ordinal + (number < 19 ? 'te' : 'ste');
};


/**
 * Creates a simple ordinal string from a number.
 * @param {number} number The number to be converted.
 * @return {string} The ordinal string.
 */
sre.Numbers.de.simpleOrdinal = function(number) {
  return number.toString() + '.';
};


/**
 * @type {sre.Numbers}
 */
sre.Numbers.de.NUMBERS = {
  wordOrdinal: sre.Numbers.de.wordOrdinal,
  simpleOrdinal: sre.Numbers.de.simpleOrdinal,
  numberToWords: sre.Numbers.de.numberToWords,
  numberToOrdinal: sre.Numbers.de.numberToOrdinal,
  vulgarSep: ' ',
  numSep: ''
};

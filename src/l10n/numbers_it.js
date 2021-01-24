// Copyright 2019-20 Volker Sorge
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
// This work was sponsored by TextHelp
//

/**
 * @fileoverview Translating numbers into Italian.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.Numbers.it');

goog.require('sre.Numbers');


/**
 * String representation of zero to nineteen.
 * @type {Array.<string>}
 * @private
 */
sre.Numbers.it.onesNumbers_ = [
  '', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
  'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen',
  'seventeen', 'eighteen', 'nineteen'
];


/**
 * String representation of twenty to ninety.
 * @type {Array.<string>}
 * @private
 */
sre.Numbers.it.tensNumbers_ = [
  '', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty',
  'ninety'
];


/**
 * String representation of thousand to decillion.
 * @type {Array.<string>}
 * @private
 */
sre.Numbers.it.largeNumbers_ = [
  '', 'thousand', 'million', 'billion', 'trillion', 'quadrillion',
  'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion',
  'decillion'
];


/**
 * Translates a number of up to twelve digits into a string representation.
 * @param {number} number The number to translate.
 * @return {string} The string representation of that number.
 * @private
 */
sre.Numbers.it.hundredsToWords_ = function(number) {
  var n = number % 1000;
  var str = '';
  str += sre.Numbers.it.onesNumbers_[Math.floor(n / 100)] ?
      sre.Numbers.it.onesNumbers_[Math.floor(n / 100)] +
      sre.Numbers.it.NUMBERS.numSep + 'hundred' : '';
  n = n % 100;
  if (n) {
    str += str ? sre.Numbers.it.NUMBERS.numSep : '';
    str += sre.Numbers.it.onesNumbers_[n] ||
        (sre.Numbers.it.tensNumbers_[Math.floor(n / 10)] +
         (n % 10 ?
          sre.Numbers.it.NUMBERS.numSep + sre.Numbers.it.onesNumbers_[n % 10] :
          ''));
  }
  return str;
};


/**
 * Translates a number of up to twelve digits into a string representation.
 * @param {number} number The number to translate.
 * @return {string} The string representation of that number.
 */
sre.Numbers.it.numberToWords = function(number) {
  if (number >= Math.pow(10, 36)) {
    return number.toString();
  }
  var pos = 0;
  var str = '';
  while (number > 0) {
    var hundreds = number % 1000;
    if (hundreds) {
      str = sre.Numbers.it.hundredsToWords_(number % 1000) +
          (pos ? '-' + sre.Numbers.it.largeNumbers_[pos] +
          '-' : '') +
          str;
    }
    number = Math.floor(number / 1000);
    pos++;
  }
  return str.replace(/-$/, '');
};


/**
 * Translates a number of up to twelve digits into a string representation of
 * its ordinal.
 * @param {number} num The number to translate.
 * @param {boolean} plural A flag indicating if the ordinal is in plural.
 * @return {string} The ordinal of the number as string.
 */
sre.Numbers.it.numberToOrdinal = function(num, plural) {
  if (num === 1) {
    return plural ? 'oneths' : 'oneth';
  }
  if (num === 2) {
    return plural ? 'halves' : 'half';
  }
  var ordinal = sre.Numbers.it.wordOrdinal(num);
  return plural ? ordinal + 's' : ordinal;
};


/**
 * Creates a word ordinal string from a number.
 * @param {number} number The number to be converted.
 * @return {string} The ordinal string.
 */
sre.Numbers.it.wordOrdinal = function(number) {
  var ordinal = sre.Numbers.it.numberToWords(number);
  if (ordinal.match(/one$/)) {
    ordinal = ordinal.slice(0, -3) + 'first';
  } else if (ordinal.match(/two$/)) {
    ordinal = ordinal.slice(0, -3) + 'second';
  } else if (ordinal.match(/three$/)) {
    ordinal = ordinal.slice(0, -5) + 'third';
  } else if (ordinal.match(/five$/)) {
    ordinal = ordinal.slice(0, -4) + 'fifth';
  } else if (ordinal.match(/eight$/)) {
    ordinal = ordinal.slice(0, -5) + 'eighth';
  } else if (ordinal.match(/nine$/)) {
    ordinal = ordinal.slice(0, -4) + 'ninth';
  } else if (ordinal.match(/twelve$/)) {
    ordinal = ordinal.slice(0, -6) + 'twelfth';
  } else if (ordinal.match(/ty$/)) {
    ordinal = ordinal.slice(0, -2) + 'tieth';
  } else {
    ordinal = ordinal + 'th';
  }
  return ordinal;
};


/**
 * Creates a simple ordinal string from a number.
 * @param {number} number The number to be converted.
 * @return {string} The ordinal string.
 */
sre.Numbers.it.simpleOrdinal = function(number) {
  var tens = number % 100;
  var numStr = number.toString();
  if (tens > 10 && tens < 20) {
    return numStr + 'th';
  }
  switch (number % 10) {
    case 1:
      return numStr + 'st';
    case 2:
      return numStr + 'nd';
    case 3:
      return numStr + 'rd';
    default:
      return numStr + 'th';
  }
};


/**
 * @type {sre.Numbers}
 */
sre.Numbers.it.NUMBERS = {
  wordOrdinal: sre.Numbers.it.wordOrdinal,
  simpleOrdinal: sre.Numbers.it.simpleOrdinal,
  numberToWords: sre.Numbers.it.numberToWords,
  numberToOrdinal: sre.Numbers.it.numberToOrdinal,
  vulgarSep: ' ',
  numSep: ' '  // TODO: For simple speech output this should be different.
};

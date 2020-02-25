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
 * @fileoverview Translating numbers into English.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.Numbers.en');


/**
 * String representation of zero to nineteen.
 * @type {Array.<string>}
 * @private
 */
sre.Numbers.en.onesNumbers_ = [
  '', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
  'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen',
  'seventeen', 'eighteen', 'nineteen'
];


/**
 * String representation of twenty to ninety.
 * @type {Array.<string>}
 * @private
 */
sre.Numbers.en.tensNumbers_ = [
  '', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty',
  'ninety'
];


/**
 * String representation of thousand to decillion.
 * @type {Array.<string>}
 * @private
 */
sre.Numbers.en.largeNumbers_ = [
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
sre.Numbers.en.hundredsToWords_ = function(number) {
  var n = number % 1000;
  var str = '';
  str += sre.Numbers.en.onesNumbers_[Math.floor(n / 100)] ?
      sre.Numbers.en.onesNumbers_[Math.floor(n / 100)] +
      sre.Numbers.en.NUMBERS.numSep + 'hundred' : '';
  n = n % 100;
  if (n) {
    str += str ? sre.Numbers.en.NUMBERS.numSep : '';
    str += sre.Numbers.en.onesNumbers_[n] ||
        (sre.Numbers.en.tensNumbers_[Math.floor(n / 10)] +
         (n % 10 ?
          sre.Numbers.en.NUMBERS.numSep + sre.Numbers.en.onesNumbers_[n % 10] :
          ''));
  }
  return str;
};


/**
 * Translates a number of up to twelve digits into a string representation.
 * @param {number} number The number to translate.
 * @return {string} The string representation of that number.
 */
sre.Numbers.en.numberToWords = function(number) {
  if (number >= Math.pow(10, 36)) {
    return number.toString();
  }
  var pos = 0;
  var str = '';
  while (number > 0) {
    var hundreds = number % 1000;
    if (hundreds) {
      str = sre.Numbers.en.hundredsToWords_(number % 1000) +
          (pos ? '-' + sre.Numbers.en.largeNumbers_[pos] +
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
sre.Numbers.en.numberToOrdinal = function(num, plural) {
  if (num === 1) {
    return plural ? 'oneths' : 'oneth';
  }
  if (num === 2) {
    return plural ? 'halves' : 'half';
  }
  var ordinal = sre.Numbers.en.wordOrdinal(num);
  return plural ? ordinal + 's' : ordinal;
};


/**
 * Creates a word ordinal string from a number.
 * @param {number} number The number to be converted.
 * @return {string} The ordinal string.
 */
sre.Numbers.en.wordOrdinal = function(number) {
  var ordinal = sre.Numbers.en.numberToWords(number);
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
sre.Numbers.en.simpleOrdinal = function(number) {
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


sre.Numbers.en.NUMBERS = {
  wordOrdinal: sre.Numbers.en.wordOrdinal,
  simpleOrdinal: sre.Numbers.en.simpleOrdinal,
  numberToWords: sre.Numbers.en.numberToWords,
  numberToOrdinal: sre.Numbers.en.numberToOrdinal,
  vulgarSep: ' ',
  numSep: ' '  // TODO: For simple speech output this should be different.
};

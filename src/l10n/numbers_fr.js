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
 * @fileoverview Translating numbers into French.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.Numbers.fr');

goog.require('sre.Numbers');


/**
 * Sub-ISO specification. Possible values: fr, be, sw.
 * @type {string}
 */
sre.Numbers.fr.SUB_ISO = 'fr';


// Numbers
/**
 * String representation of zero to nineteen.
 * @type {Array.<string>}
 * @private
 */
sre.Numbers.fr.onesNumbers_ = [
  '', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept',
  'huit', 'neuf', 'dix', 'onze', 'douze', 'treize', 'quatorze',
  'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf'
];


/**
 * String representation of twenty to ninety.
 * @type {Object.<Array.<string>>}
 * @private
 */
sre.Numbers.fr.tensNumbers_ = {
  'fr': [
    '', '', 'vingt', 'trente', 'quarante', 'cinquante',
    'soixante', 'soixante-dix', 'quatre-vingts', 'quatre-vingt-dix'
  ],
  'be': ['', '', 'vingt', 'trente', 'quarante', 'cinquante',
         'soixante', 'septante', 'quatre-vingts', 'nonante'],
  'sw': ['', '', 'vingt', 'trente', 'quarante', 'cinquante',
         'soixante', 'septante', 'huitante', 'nonante']
};


/**
 * String representation of thousand to decillion.
 * @type {Array.<string>}
 * @private
 */
sre.Numbers.fr.largeNumbers_ = [
  '', 'mille', 'millions', 'milliards', 'billions', 'mille billions',
  'trillions', 'mille trillions', 'quadrillions', 'mille quadrillions',
  'quintillions', 'mille quintillions'
];


/**
 * Translates a number of up to twelve digits into a string representation.
 * @param {number} number The number to translate.
 * @return {string} The string representation of that number.
 * @private
 */
sre.Numbers.fr.hundredsToWords_ = function(number) {
  var n = number % 1000;
  var str = '';
  str += sre.Numbers.fr.onesNumbers_[Math.floor(n / 100)] ?
      sre.Numbers.fr.onesNumbers_[Math.floor(n / 100)] + '-cent' : '';
  n = n % 100;
  if (n) {
    str += str ? '-' : '';
    var ones = sre.Numbers.fr.onesNumbers_[n];
    if (ones) {
      str += ones;
    } else {
      // -dix case!
      var tens = sre.Numbers.fr.tensNumbers_[
          sre.Numbers.fr.SUB_ISO][Math.floor(n / 10)];
      if (tens.match(/\-dix$/)) {
        ones = sre.Numbers.fr.onesNumbers_[(n % 10 + 10)];
        str += tens.replace(/\-dix$/, '') + '-' + ones;
      } else {
        str += tens +
            (n % 10 ? '-' + sre.Numbers.fr.onesNumbers_[n % 10] : '');
      }
    }
  }
  let match = str.match(/s\-\w+$/);
  return match ? str.replace(/s\-\w+$/, match[0].slice(1)) :
      str.replace(/\-un$/, '-et-un');
};


/**
 * Translates a number of up to twelve digits into a string representation.
 * @param {number} number The number to translate.
 * @return {string} The string representation of that number.
 */
sre.Numbers.fr.numberToWords = function(number) {
  if (number >= Math.pow(10, 36)) {
    return number.toString();
  }
  var pos = 0;
  var str = '';
  while (number > 0) {
    var hundreds = number % 1000;
    if (hundreds) {
      var large = sre.Numbers.fr.largeNumbers_[pos];
      var huns = sre.Numbers.fr.hundredsToWords_(hundreds);
      if (large && large.match(/^mille /)) {
        var rest = large.replace(/^mille /, '');
        if (str.match(RegExp(rest))) {
          str = huns + (pos ? '-mille-' : '') + str;
        } else if (str.match(RegExp(rest.replace(/s$/, '')))) {
          str = huns + (pos ? '-mille-' : '') +
              str.replace(rest.replace(/s$/, ''), rest);
        } else {
          str = huns + (pos ? '-' + large + '-' : '') + str;
        }
      } else {
        large = (hundreds === 1 && large) ? large.replace(/s$/, '') : large;
        str = huns + (pos ? '-' + large + '-' : '') + str;
      }
    }
    number = Math.floor(number / 1000);
    pos++;
  }
  return str.replace(/-$/, '');
};


// Ordinals
/**
 * @type {Object.<string>}
 */
sre.Numbers.fr.SMALL_ORDINAL = {
  1: 'unième',
  2: 'demi',
  3: 'tiers',
  4: 'quart'
};


/**
 * Translates a number of up to twelve digits into a string representation of
 * its ordinal.
 * @param {number} num The number to translate.
 * @param {boolean} plural A flag indicating if the ordinal is in plural.
 * @return {string} The ordinal of the number as string.
 */
sre.Numbers.fr.numberToOrdinal = function(num, plural) {
  var ordinal = sre.Numbers.fr.SMALL_ORDINAL[num] ||
      sre.Numbers.fr.wordOrdinal(num);
  return (num === 3) ? ordinal :
      (plural ? ordinal + 's' : ordinal);
};


/**
 * Creates a word ordinal string from a number.
 * @param {number} number The number to be converted.
 * @return {string} The ordinal string.
 */
sre.Numbers.fr.wordOrdinal = function(number) {
  if (number === 1) {
    return 'première';
  }
  var ordinal = sre.Numbers.fr.numberToWords(number);
  if (ordinal.match(/^neuf$/)) {
    ordinal = ordinal.slice(0, -1) + 'v';
  } else if (ordinal.match(/cinq$/)) {
    ordinal = ordinal + 'u';
  } else if (ordinal.match(/trois$/)) {
    ordinal = ordinal;
  } else if (ordinal.match(/e$/) || ordinal.match(/s$/)) {
    ordinal = ordinal.slice(0, -1);
  }
  ordinal = ordinal + 'ième';
  return ordinal;
};


/**
 * Creates a simple ordinal string from a number.
 * @param {number} number The number to be converted.
 * @return {string} The ordinal string.
 */
sre.Numbers.fr.simpleOrdinal = function(number) {
  var gender = /** @type {string} */(
      sre.Grammar.getInstance().getParameter('gender'));
  return number === 1 ?
      number.toString() + (gender === 'male' ? 'er' : 're') :
      number.toString() + 'e';
};


/**
 * @type {sre.Numbers}
 */
sre.Numbers.fr.NUMBERS = {
  wordOrdinal: sre.Numbers.fr.wordOrdinal,
  simpleOrdinal: sre.Numbers.fr.simpleOrdinal,
  numberToWords: sre.Numbers.fr.numberToWords,
  numberToOrdinal: sre.Numbers.fr.numberToOrdinal,
  vulgarSep: '-'
};

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


// Numbers
/**
 * String representation of zero to twenty-nine.
 * @type {Array.<string>}
 * @private
 */
sre.Numbers.es.onesNumbers_ = [
  '', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho',
  'nueve', 'diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis',
  'diecisiete', 'dieciocho', 'diecinueve',
  'veinte', 'veintiuno', 'veintidós', 'veintitrés', 'veinticuatro',
  'veinticinco', 'veintiséis', 'veintisiete', 'veintiocho', 'veintinueve'
];


/**
 * String representation of thirty to ninety.
 * @type {Array.<string>}
 * @private
 */
sre.Numbers.es.tensNumbers_ = [
  '', '', '', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta',
  'ochenta', 'noventa'
];


/**
 * String representation of one hundred to nine hundred.
 * @type {Array.<string>}
 * @private
 */
sre.Numbers.es.hundredsNumbers_ = [
  '', 'cien', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos',
  'seiscientos', 'setecientos', 'ochocientos', 'novecientos'
];


/**
 * String representation of thousand to decillion.
 * @type {Array.<string>}
 * @private
 */
sre.Numbers.es.largeNumbers_ = [
  '', 'mil', 'millón', 'mil millónes', 'billón', 'mil billónes', 'trillón',
  'mil trillónes', 'cuatrilló', 'mil cuatrillóes', 'quintillón',
  'mil quintillónes', 'sextillón', 'mil sextillónes', 'septillón',
  'mil septillónes', 'octillón', 'mil octillónes', 'nonillón',
  'mil nonillónes', 'decillón', 'mil decillónes'
];


sre.Numbers.es.tensToWords_ = function(number) {
  var n = number % 100;
  if (n < 30) {
    return sre.Numbers.es.onesNumbers_[n];
  }
  var tens = sre.Numbers.es.tensNumbers_[Math.floor(n / 10)];
  var ones = sre.Numbers.es.onesNumbers_[n % 10];
  return (tens && ones) ? tens + ' y ' + ones : (tens || ones);
};


/**
 * Translates a number of up to twelve digits into a string representation.
 * @param {number} number The number to translate.
 * @return {string} The string representation of that number.
 * @private
 */
sre.Numbers.es.hundredsToWords_ = function(number) {
  var n = number % 1000;
  var hundred = Math.floor(n / 100);
  var hundreds =  sre.Numbers.es.hundredsNumbers_[hundred];
  var tens = sre.Numbers.es.tensToWords_(n % 100);
  if (hundred === 1) {
    if (!tens) {
      return hundreds;
    }
    // Creates ciento.
    return hundreds + 'to' + ' ' + tens;
  }
  return (hundreds && tens) ? hundreds + ' ' + tens : (hundreds || tens);
};


/**
 * Translates a number of up to twelve digits into a string representation.
 * @param {number} number The number to translate.
 * @return {string} The string representation of that number.
 */
sre.Numbers.es.numberToWords = function(number) {
  if (number >= Math.pow(10, 36)) {
    return number.toString();
  }
  var pos = 0;
  var str = '';
  while (number > 0) {
    var hundreds = number % 1000;
    if (hundreds) {
      var large = sre.Numbers.es.largeNumbers_[pos];
      var huns = sre.Numbers.es.hundredsToWords_(hundreds);
      if (!pos) {
        str = huns;
      } else if (hundreds === 1) {
        large = large.match('/^mil( |$)/') ? large : 'un ' + large;
        str = large + (str ? ' ' + str : '');
      } else {
        large = large.replace(/ón$/, 'ones');
        str = sre.Numbers.es.hundredsToWords_(hundreds) + ' ' + large +
          (str ? ' ' + str : '');
      }
    }
    number = Math.floor(number / 1000);
    pos++;
  }
  return str;
};


// Ordinals
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
  if (num >= 1000) {
    num = num - 1000;
    result.push('milésima');
  }
  if (!num) {
    return result.join(' ');
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
  numberToWords: sre.Numbers.es.numberToWords,
  numberToOrdinal: sre.Numbers.es.numberToOrdinal,
  vulgarSep: '-'
};

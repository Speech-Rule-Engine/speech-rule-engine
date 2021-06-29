// Copyright 2019-21 Volker Sorge
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

goog.provide('sre.Numbers.ko');

goog.require('sre.Numbers');


/**
 * String representation of zero to nineteen.
 * @type {Array.<string>}
 * @private
 */
sre.Numbers.ko.onesNumbers_ = [
  '', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구',
];

sre.Numbers.ko.onesNumbers_ordinal = [
  '', '한', '두', '세', '네', '다섯', '여섯', '일곱', '여덟', '아홉'
];


/**
 * String representation of twenty to ninety.
 * @type {Array.<string>}
 * @private
 */
sre.Numbers.ko.tensNumbers_ = [
  '', '십', '이십', '삼십', '사십', '오십', '육십', '칠십', '팔십', '구십'
];

sre.Numbers.ko.tensNumbers_ordinal = [
  '', '열', '스물', '서른', '마흔', '쉰', '예순', '일흔', '여든', '아흔'
];



/**
 * String representation of thousand to decillion.
 * @type {Array.<string>}
 * @private
 */
sre.Numbers.ko.largeNumbers_ = [
  '', '만', '억', '조', '경', '해', '자', '양', '구', '간', '정', '재', '극',
  '항하사', '아승기', '나유타', '불가사의', '무량대수'
];

//천

/**
 * Translates a number of up to twelve digits into a string representation.
 * @param {number} number The number to translate.
 * @return {string} The string representation of that number.
 * @private
 */
sre.Numbers.ko.hundredsToWords_ = function (number) {
  var n = number % 10000;
  var str = '';
  str += sre.Numbers.ko.onesNumbers_[Math.floor(n / 1000)] ?
    sre.Numbers.ko.onesNumbers_[Math.floor(n / 1000)] + '천' : '';
  n = n % 1000;
  if (n) {
    str += sre.Numbers.ko.onesNumbers_[Math.floor(n / 100)] ?
      sre.Numbers.ko.onesNumbers_[Math.floor(n / 100)] + '백' : '';
    n = n % 100;

    str += sre.Numbers.ko.onesNumbers_[n] ||
      (sre.Numbers.ko.tensNumbers_[Math.floor(n / 10)] +
        (n % 10 ? sre.Numbers.ko.onesNumbers_[n % 10] : ''));
  }

  return str;
};


/**
 * Translates a number of up to twelve digits into a string representation.
 * @param {number} number The number to translate.
 * @return {string} The string representation of that number.
 */
sre.Numbers.ko.numberToWords = function (number) {
  if (number >= Math.pow(10, 36)) {
    return number.toString();
  }
  var pos = 0;
  var str = '';
  while (number > 0) {
    var hundreds = number % 10000;
    if (hundreds) {
      str = sre.Numbers.ko.hundredsToWords_(number % 10000) +
        (pos ? sre.Numbers.ko.largeNumbers_[pos] + sre.Numbers.numSep : '') + str;
    }
    number = Math.floor(number / 10000);
    pos++;
  }
  return str.replace(/ $/, '');
};


/**
 * Translates a number of up to twelve digits into a string representation of
 * its ordinal.
 * @param {number} num The number to translate.
 * @param {boolean} plural A flag indicating if the ordinal is in plural.
 * @return {string} The ordinal of the number as string.
 */
sre.Numbers.ko.numberToOrdinal = function (num, plural) {
  var ordinal = sre.Numbers.ko.wordOrdinal(num);
  return ordinal;
};


/**
 * Creates a word ordinal string from a number.
 * @param {number} number The number to be converted.
 * @return {string} The ordinal string.
 */
sre.Numbers.ko.wordOrdinal = function (number) {
  var ordinal = sre.Numbers.ko.numberToWords(number);
  var tens = sre.Numbers.ko.tensNumbers_ordinal[Math.floor(number % 100 / 10)];
  var ones = sre.Numbers.ko.onesNumbers_ordinal[Math.floor(number % 10)];

  number %= 100;
  if (number === 0) { }
  else if (number % 10 === 0) {
    if (number === 20) tens = '스무';
    ordinal = ordinal.slice(0, -2) + tens;
  }
  else if (number < 10) {
    ordinal = ordinal.slice(0, -1) + ones;
  }
  else ordinal = ordinal.slice(0, -3) + tens + ones;

  return ordinal + '번째';
};



/**
 * Creates a simple ordinal string from a number.
 * @param {number} number The number to be converted.
 * @return {string} The ordinal string.
 */

sre.Numbers.ko.simpleOrdinal = function (number) {
  sre.Numbers.ko.wordOrdinal(number);
}

/**
 *Creates a simple ordinal string from a number (in another way)
 *
 *
 
sre.Numbers.ko.hundredsToWords_ordinal = function (number) {
  var n = number % 10000;
  var str = '';
  str += sre.Numbers.ko.onesNumbers_[Math.floor(n / 1000)] ?
    sre.Numbers.ko.onesNumbers_[Math.floor(n / 1000)] + '천' : '';
  n = n % 1000;
  if (n) {
    str += sre.Numbers.ko.onesNumbers_[Math.floor(n / 100)] ?
      sre.Numbers.ko.onesNumbers_[Math.floor(n / 100)] + '백' : '';
    n = n % 100;

    str += sre.Numbers.ko.onesNumbers_ordinal[n] ||
      (sre.Numbers.ko.tensNumbers_ordinal[Math.floor(n / 10)] +
        (n % 10 ? sre.Numbers.ko.onesNumbers_ordinal[n % 10] : ''));

    str += '번째';
  }

  return str;
};

sre.Numbers.ko.simpleOrdinal = function (number) {
  var pos = -1;
  var str = '';

  var new_number = number;
  while(new_number > 0){
      new_number = Math.floor(new_number / 10000);
      pos++;
  }

  while (number > 0) {
    var hundreds = number % 10000;
    if (number < 10000){
      str += sre.Numbers.ko.hundredsToWords_ordinal(number % 10000) +
      (pos ? sre.Numbers.ko.largeNumbers_[pos] +
          sre.Numbers.ko.NUMBERS.numSep : '');
    }
    else if (hundreds) {
      str += sre.Numbers.ko.hundredsToWords_(number % 10000) +
          (pos ? sre.Numbers.ko.largeNumbers_[pos] +
              sre.Numbers.ko.NUMBERS.numSep : '');
    }
    number = Math.floor(number / 10000);
    pos--;
  }
  
  return str.replace(/-$/, '');
};
**/

/**
 * @type {sre.Numbers}
 */
sre.Numbers.ko.NUMBERS = {
  wordOrdinal: sre.Numbers.ko.wordOrdinal,
  simpleOrdinal: sre.Numbers.ko.simpleOrdinal,
  numberToWords: sre.Numbers.ko.numberToWords,
  numberToOrdinal: sre.Numbers.ko.numberToOrdinal,
  vulgarSep: ' ',
  numSep: ' '  // TODO: For simple speech output this should be different.
};

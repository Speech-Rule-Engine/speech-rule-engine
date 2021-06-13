//
// Copyright 2020-21 Volker Sorge
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
 * @fileoverview Translating numbers into German.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */
import {Numbers} from '../numbers';

//
// This work was sponsored by ETH Zurich
//

const zero_: string = 'null';

/**
 * String representation of zero to nineteen.
 */
const onesNumbers_: string[] = [
  '',         'eins',     'zwei',     'drei',     'vier',
  'fünf',     'sechs',    'sieben',   'acht',     'neun',
  'zehn',     'elf',      'zwölf',    'dreizehn', 'vierzehn',
  'fünfzehn', 'sechzehn', 'siebzehn', 'achtzehn', 'neunzehn'
];


/**
 * String representation of twenty to ninety.
 */
const tensNumbers_: string[] = [
  '', '', 'zwanzig', 'dreißig', 'vierzig', 'fünfzig', 'sechzig', 'siebzig',
  'achtzig', 'neunzig'
];


/**
 * String representation of thousand to decillion.
 */
const largeNumbers_: string[] = [
  '',
  'tausend',
  'million',
  'milliarde',
  'billion',
  'billiarde',
  'trillion',
  'trilliard',
  'quadrillion',
  'quadrilliard',
  'quintillion',
  'quintilliarde',
  'sextillion',
  'sextilliarde',
];


/**
 * Changes number one 'eins' into a prefix.
 * @param num number string.
 * @return If it is a one, it is made into prefix.
 */
function onePrefix_(num: string): string {
  return num === onesNumbers_[1] ? 'ein' : num;
}


/**
 * Translates a number of up to twelve digits into a string representation.
 * @param num The number to translate.
 * @return The string representation of that number.
 */
function hundredsToWords_(num: number): string {
  let n = num % 1000;
  let str = '';
  let ones = onesNumbers_[Math.floor(n / 100)];
  str += ones ? onePrefix_(ones) + 'hundert' : '';
  n = n % 100;
  if (n) {
    str += str ? NUMBERS.numSep : '';
    ones = onesNumbers_[n];
    if (ones) {
      str += ones;
    } else {
      let tens = tensNumbers_[Math.floor(n / 10)];
      ones = onesNumbers_[n % 10];
      str += ones ? onePrefix_(ones) + 'und' + tens : tens;
    }
  }
  return str;
}


/**
 * Translates a number of up to twelve digits into a string representation.
 * @param num The number to translate.
 * @return The string representation of that number.
 */
function numberToWords(num: number): string {
  if (num === 0) {
    return zero_;
  }
  if (num >= Math.pow(10, 36)) {
    return num.toString();
  }
  let pos = 0;
  let str = '';
  while (num > 0) {
    let hundreds = num % 1000;
    if (hundreds) {
      let hund = hundredsToWords_(num % 1000);
      str = onePrefix_(hund) + (pos ? largeNumbers_[pos] : '') + str;
    }
    num = Math.floor(num / 1000);
    pos++;
  }
  return str.replace(/ein$/, 'eins');
}


/**
 * Translates a number of up to twelve digits into a string representation of
 * its ordinal.
 * @param num The number to translate.
 * @param plural A flag indicating if the ordinal is in plural.
 * @return The ordinal of the number as string.
 */
function numberToOrdinal(num: number, plural: boolean): string {
  if (num === 1) {
    return 'eintel';
  }
  if (num === 2) {
    return plural ? 'halbe' : 'halb';
  }
  return wordOrdinal(num) + 'l';
}


/**
 * Creates a word ordinal string from a number.
 * @param number The number to be converted.
 * @return The ordinal string.
 */
function wordOrdinal(num: number): string {
  if (num === 1) {
    return 'erste';
  }
  if (num === 3) {
    return 'dritte';
  }
  if (num === 7) {
    return 'siebte';
  }
  if (num === 8) {
    return 'achte';
  }
  let ordinal = numberToWords(num);
  return ordinal + (num < 19 ? 'te' : 'ste');
}


/**
 * Creates a simple ordinal string from a number.
 * @param num The number to be converted.
 * @return The ordinal string.
 */
function simpleOrdinal(num: number): string {
  return num.toString() + '.';
}


const NUMBERS: Numbers = {
  wordOrdinal: wordOrdinal,
  simpleOrdinal: simpleOrdinal,
  numberToWords: numberToWords,
  numberToOrdinal: numberToOrdinal,
  vulgarSep: ' ',
  numSep: ''
};


export default NUMBERS;

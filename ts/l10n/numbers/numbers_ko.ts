//
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
 * @fileoverview Translating numbers into Korean.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */


import {Numbers, NUMBERS as NUMB} from '../messages';


/**
 * Translates a number of up to twelve digits into a string representation.
 * @param num The number to translate.
 * @return The string representation of that number.
 */
function hundredsToWords_(num: number): string {
  let n = num % 10000;
  let str = '';
  str += NUMBERS.ones[Math.floor(n / 1000)] ?
      NUMBERS.ones[Math.floor(n / 1000)] + '천' : '';
  n = n % 1000;
  if (n) {
    str += NUMBERS.ones[Math.floor(n / 100)] ?
      NUMBERS.ones[Math.floor(n / 100)] + '백' : '';
    n = n % 100;
    str += NUMBERS.ones[n] ||
        NUMBERS.tens[Math.floor(n / 10)] +
            (n % 10 ? NUMBERS.ones[n % 10] : '');
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
    return NUMBERS.zero;
  }
  if (num >= Math.pow(10, 36)) {
    return num.toString();
  }
  let pos = 0;
  let str = '';
  while (num > 0) {
    let hundreds = num % 10000;
    if (hundreds) {
      str = hundredsToWords_(num % 10000) +
          (pos ? NUMBERS.large[pos] + NUMBERS.numSep : '') + str;
    }
    num = Math.floor(num / 10000);
    pos++;
  }
  return str.replace(/ $/, '');
}


/**
 * Translates a number of up to twelve digits into a string representation of
 * its ordinal.
 * @param num The number to translate.
 * @param plural A flag indicating if the ordinal is in plural.
 * @return The ordinal of the number as string.
 */
function numberToOrdinal(num: number, _plural: boolean): string {
  return wordOrdinal(num) + '번째';
}


/**
 * Creates a word ordinal string from a number.
 * @param num The number to be converted.
 * @return The ordinal string.
 */
function wordOrdinal(num: number): string {
  let ordinal = numberToWords(num);
  let tens = NUMBERS.tens[10 + Math.floor(num % 100 / 10)];
  let ones = NUMBERS.ones[10 + Math.floor(num % 10)];

  if (num === 1) ones = '첫';
  else if ((num % 100) === 20) tens = '스무';
  let label: string = tens + ones;
  ordinal = label ? ordinal.slice(0, -label.length + 1) + label : label;

  return ordinal;
}


/**
 * Creates a simple ordinal string from a number.
 * @param num The number to be converted.
 * @return The ordinal string.
 */
function simpleOrdinal(num: number): string {
  return numberToOrdinal(num, false);
}

const NUMBERS: Numbers = NUMB();
NUMBERS.wordOrdinal = wordOrdinal;
NUMBERS.simpleOrdinal = simpleOrdinal;
NUMBERS.numberToWords = numberToWords;
NUMBERS.numberToOrdinal = numberToOrdinal;

export default NUMBERS;
// TODO: For simple speech output this should be different.

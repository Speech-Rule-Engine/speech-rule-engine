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
 * @file Translating numbers into Korean.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import { Numbers, NUMBERS as NUMB } from '../messages';


/**
 * Translates a number of up to twelve digits into a string representation.
 * @param num The number to translate.
 * @returns The string representation of that number.
 */
function thousandsToWords_(num: number): string {
  let n = num % 10000;
  let str = '';
  str += NUMBERS.ones[Math.floor(n / 1000)] ?
      (Math.floor(n / 1000) === 1 ? '천' : NUMBERS.ones[Math.floor(n / 1000)] + '천') : '';
  n = n % 1000;
  if (n) {
    str += NUMBERS.ones[Math.floor(n / 100)] ?
      (Math.floor(n / 100) === 1 ? '백' : NUMBERS.ones[Math.floor(n / 100)] + '백') : '';
    n = n % 100;
    str += NUMBERS.tens[Math.floor(n / 10)] + (n % 10 ? NUMBERS.ones[n % 10] : '');
  }
  return str;
}


/**
 * Translates a number of up to twelve digits into a string representation.
 * @param num The number to translate.
 * @returns The string representation of that number.
 */
function numberToWords(num: number): string {
  if (num === 0) return NUMBERS.zero;
  if (num >= Math.pow(10, 36)) return num.toString();
  let pos = 0;
  let str = '';
  while (num > 0) {
    const thousands = num % 10000;
    if (thousands) {
      str =
      thousandsToWords_(num % 10000) +
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
 * @returns The ordinal of the number as string.
 */
function numberToOrdinal(num: number, _plural: boolean): string {
  if (num === 1) return '첫번째';
  return wordOrdinal(num) + '번째';
}


/**
 * Creates a word ordinal string from a number.
 * @param num The number to be converted.
 * @returns The ordinal string.
 */
function wordOrdinal(num: number): string {
  const ordinal = numberToWords(num);
  num %= 100; const label = numberToWords(num);
  if (!label || !num) return ordinal;
  
  const tens = (num === 20) ? '스무' : NUMBERS.tens[10 + Math.floor(num / 10)];
  const ones = NUMBERS.ones[10 + Math.floor(num % 10)];
  return ordinal.slice(0, -label.length) + tens + ones;
}


/**
 * Creates a numeric ordinal string from a number.
 * @param num The number to be converted.
 * @returns The ordinal string.
 */
function numericOrdinal(num: number): string {
  return numberToOrdinal(num, false);
}

const NUMBERS: Numbers = NUMB();
NUMBERS.wordOrdinal = wordOrdinal;
NUMBERS.numericOrdinal = numericOrdinal;
NUMBERS.numberToWords = numberToWords;
NUMBERS.numberToOrdinal = numberToOrdinal;

export default NUMBERS;
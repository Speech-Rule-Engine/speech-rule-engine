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
 * @file Translating numbers into Danish.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */
import { Numbers, NUMBERS as NUMB } from '../messages';

//
// This work was sponsored by TextHelp
//

/**
 * Changes number one 'en' in a prefix to 'et'
 *
 * @param num Number string.
 * @param mill Flag indicating if this million or above.
 * @returns If it is a one, it is made into prefix.
 */
function onePrefix_(num: string, mill = false): string {
  return num === NUMBERS.ones[1] ? (mill ? 'et' : 'en') : num;
}

/**
 * Translates a number of up to twelve digits into a string representation.
 *
 * @param num The number to translate.
 * @param ordinal Are we computing an ordinal?
 * @returns The string representation of that number.
 */
function hundredsToWords_(num: number, ordinal = false): string {
  let n = num % 1000;
  let str = '';
  let ones = NUMBERS.ones[Math.floor(n / 100)];
  str += ones ? onePrefix_(ones, true) + ' hundrede' : '';
  n = n % 100;
  if (n) {
    str += str ? ' og ' : '';
    ones = ordinal ? NUMBERS.special.smallOrdinals[n] : NUMBERS.ones[n];
    if (ones) {
      str += ones;
    } else {
      const tens = ordinal
        ? NUMBERS.special.tensOrdinals[Math.floor(n / 10)]
        : NUMBERS.tens[Math.floor(n / 10)];
      ones = NUMBERS.ones[n % 10];
      str += ones ? onePrefix_(ones) + 'og' + tens : tens;
    }
  }
  return str;
}

/**
 * Translates a number of up to twelve digits into a string representation.
 *
 * @param num The number to translate.
 * @param ordinal Are we computing an ordinal?
 * @returns The string representation of that number.
 */
function numberToWords(num: number, ordinal = false): string {
  if (num === 0) {
    return NUMBERS.zero;
  }
  if (num >= Math.pow(10, 36)) {
    return num.toString();
  }
  let pos = 0;
  let str = '';
  while (num > 0) {
    const hundreds = num % 1000;
    if (hundreds) {
      const hund = hundredsToWords_(hundreds, ordinal && !pos);
      if (pos) {
        const large = NUMBERS.large[pos];
        // If this is million or above take care of the plural.
        const plural = hundreds > 1 ? 'er' : '';
        str =
          onePrefix_(hund, pos <= 1) +
          ' ' +
          large +
          plural +
          (str ? ' og ' : '') +
          str;
      } else {
        str = onePrefix_(hund) + str;
      }
    }
    num = Math.floor(num / 1000);
    pos++;
  }
  return str;
}

/**
 * Translates a number of up to twelve digits into a string representation of
 * its ordinal.
 *
 * @param num The number to translate.
 * @param plural A flag indicating if the ordinal is in plural.
 * @returns The ordinal of the number as string.
 */
function numberToOrdinal(num: number, plural: boolean): string {
  if (num === 1) {
    return plural ? 'hel' : 'hele';
  }
  if (num === 2) {
    return plural ? 'halv' : 'halve';
  }
  return wordOrdinal(num) + (plural ? 'dele' : 'del');
}

/**
 * Creates a word ordinal string from a number.
 *
 * @param num The number to be converted.
 * @returns The ordinal string.
 */
function wordOrdinal(num: number): string {
  if (num % 100) {
    return numberToWords(num, true);
  }
  const ordinal = numberToWords(num);
  return ordinal.match(/e$/) ? ordinal : ordinal + 'e';
}

/**
 * Creates a numeric ordinal string from a number.
 *
 * @param num The number to be converted.
 * @returns The ordinal string.
 */
function numericOrdinal(num: number): string {
  return num.toString() + '.';
}

const NUMBERS: Numbers = NUMB();
NUMBERS.wordOrdinal = wordOrdinal;
NUMBERS.numericOrdinal = numericOrdinal;
NUMBERS.numberToWords = numberToWords;
NUMBERS.numberToOrdinal = numberToOrdinal;

export default NUMBERS;

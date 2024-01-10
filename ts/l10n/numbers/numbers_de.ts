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
 * @file Translating numbers into German.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */
import { Numbers, NUMBERS as NUMB } from '../messages.js';

//
// This work was sponsored by ETH Zurich
//

/**
 * Changes number one 'eins' into a prefix.
 *
 * @param num Number string.
 * @param mill Flag indicating if this million or above.
 * @returns If it is a one, it is made into prefix.
 */
function onePrefix_(num: string, mill = false): string {
  return num === NUMBERS.ones[1] ? (mill ? 'eine' : 'ein') : num;
}

/**
 * Translates a number of up to twelve digits into a string representation.
 *
 * @param num The number to translate.
 * @returns The string representation of that number.
 */
function hundredsToWords_(num: number): string {
  let n = num % 1000;
  let str = '';
  let ones = NUMBERS.ones[Math.floor(n / 100)];
  str += ones ? onePrefix_(ones) + 'hundert' : '';
  n = n % 100;
  if (n) {
    str += str ? NUMBERS.numSep : '';
    ones = NUMBERS.ones[n];
    if (ones) {
      str += ones;
    } else {
      const tens = NUMBERS.tens[Math.floor(n / 10)];
      ones = NUMBERS.ones[n % 10];
      str += ones ? onePrefix_(ones) + 'und' + tens : tens;
    }
  }
  return str;
}

/**
 * Translates a number of up to twelve digits into a string representation.
 *
 * @param num The number to translate.
 * @returns The string representation of that number.
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
    const hundreds = num % 1000;
    if (hundreds) {
      const hund = hundredsToWords_(num % 1000);
      if (pos) {
        const large = NUMBERS.large[pos];
        // If this is million or above take care oaf the plural.
        const plural =
          pos > 1 && hundreds > 1 ? (large.match(/e$/) ? 'n' : 'en') : '';
        str = onePrefix_(hund, pos > 1) + large + plural + str;
      } else {
        str = onePrefix_(hund, pos > 1) + str;
      }
    }
    num = Math.floor(num / 1000);
    pos++;
  }
  return str.replace(/ein$/, 'eins');
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
    return 'eintel';
  }
  if (num === 2) {
    return plural ? 'halbe' : 'halb';
  }
  return wordOrdinal(num) + 'l';
}

/**
 * Creates a word ordinal string from a number.
 *
 * @param num The number to be converted.
 * @returns The ordinal string.
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
  const ordinal = numberToWords(num);
  return ordinal + (num < 19 ? 'te' : 'ste');
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

export const NUMBERS: Numbers = NUMB(
  {
    'wordOrdinal': wordOrdinal,
    'numericOrdinal': numericOrdinal,
    'numberToWords': numberToWords,
    'numberToOrdinal': numberToOrdinal,
  }
);

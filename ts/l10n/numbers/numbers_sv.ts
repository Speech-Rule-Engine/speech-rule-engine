//
// Copyright 2021-22 Volker Sorge
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
 * @file Translating numbers into Swedish.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import { Numbers, NUMBERS as NUMB } from '../messages';

/**
 * Translates a number of up to twelve digits into a string representation.
 *
 * @param num The number to translate.
 * @returns The string representation of that number.
 */
function hundredsToWords_(num: number): string {
  let n = num % 1000;
  let str = '';
  const hundreds = Math.floor(n / 100);
  str += NUMBERS.ones[hundreds]
    ? (hundreds === 1 ? '' : NUMBERS.ones[hundreds] + NUMBERS.numSep) + 'hundra'
    : '';
  n = n % 100;
  if (n) {
    str += str ? NUMBERS.numSep : '';
    str +=
      NUMBERS.ones[n] ||
      NUMBERS.tens[Math.floor(n / 10)] +
        (n % 10 ? NUMBERS.numSep + NUMBERS.ones[n % 10] : '');
  }
  return str;
}

/**
 * Translates a number of up to twelve digits into a string representation.
 *
 * @param num The number to translate.
 * @returns The string representation of that number.
 */
function numberToWords(num: number, ordinal: boolean = false): string {
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
      // Case 0: hundreds === 1 and pos = 0, translate
      // Case 1: hundreds === 1 and pos = 1, no space, no translate
      // Case 2: hundreds === 1 and pos > 1, space, no translate
      // Case 3: space and translate
      const large = NUMBERS.large[pos];
      const plural = (hundreds > 1 && pos > 1 && !ordinal) ? 'er' : '';
      str =
        (pos === 1 && hundreds === 1
          ? ''
          : (pos > 1 && hundreds === 1 ? 'en' : hundredsToWords_(num % 1000)) + (pos > 1 ? ' ' : '')) +
        (pos ? large + plural + (pos > 1 ? ' ' : '') : '') +
        str;
    }
    num = Math.floor(num / 1000);
    pos++;
  }
  return str.replace(/ $/, '');
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
    return plural ? 'hel' : 'hel';
  }
  if (num === 2) {
    return plural ? 'halva' : 'halv';
  }
  let ordinal = wordOrdinal(num);
  ordinal = ordinal.match(/de$/) ? ordinal.replace(/de$/, '') : ordinal;
  return ordinal + (plural ? 'delar' : 'del');
}

/**
 * Creates a word ordinal string from a number.
 *
 * @param num The number to be converted.
 * @returns The ordinal string.
 */
function wordOrdinal(num: number): string {
  let ordinal = numberToWords(num, true);
  if (ordinal.match(/^noll$/)) {
    ordinal = 'nollte';
  } else if (ordinal.match(/ett$/)) {
    ordinal = ordinal.replace(/ett$/, 'första');
  } else if (ordinal.match(/två$/)) {
    ordinal = ordinal.replace(/två$/, 'andra');
  } else if (ordinal.match(/tre$/)) {
    ordinal = ordinal.replace(/tre$/, 'tredje');
  } else if (ordinal.match(/fyra$/)) {
    ordinal = ordinal.replace(/fyra$/, 'fjärde');
  } else if (ordinal.match(/fem$/)) {
    ordinal = ordinal.replace(/fem$/, 'femte');
  } else if (ordinal.match(/sex$/)) {
    ordinal = ordinal.replace(/sex$/, 'sjätte');
  } else if (ordinal.match(/sju$/)) {
    ordinal = ordinal.replace(/sju$/, 'sjunde');
  } else if (ordinal.match(/åtta$/)) {
    ordinal = ordinal.replace(/åtta$/, 'åttonde');
  } else if (ordinal.match(/nio$/)) {
    ordinal = ordinal.replace(/nio$/, 'nionde');
  } else if (ordinal.match(/tio$/)) {
    ordinal = ordinal.replace(/tio$/, 'tionde');
  } else if (ordinal.match(/elva$/)) {
    ordinal = ordinal.replace(/elva$/, 'elfte');
  } else if (ordinal.match(/tolv$/)) {
    ordinal = ordinal.replace(/tolv$/, 'tolfte');
  } else if (ordinal.match(/tusen$/)) {
    ordinal = ordinal.replace(/tusen$/, 'tusonde');
  } else if (ordinal.match(/jard$/) || ordinal.match(/jon$/)) {
    ordinal = ordinal + 'te';
  } else {
    ordinal = ordinal + 'de';
  }
  return ordinal;
}

/**
 * Creates a numeric ordinal string from a number.
 *
 * @param num The number to be converted.
 * @returns The ordinal string.
 */
function numericOrdinal(num: number): string {
  const str = num.toString();
  if (str.match(/11$|12$/)) {
    return str + ':e';
  }
  return str + (str.match(/1$|2$/) ? ':a' : ':e');
}

const NUMBERS: Numbers = NUMB();
NUMBERS.wordOrdinal = wordOrdinal;
NUMBERS.numericOrdinal = numericOrdinal;
NUMBERS.numberToWords = numberToWords;
NUMBERS.numberToOrdinal = numberToOrdinal;

export default NUMBERS;
// TODO: For simple speech output this should be different.

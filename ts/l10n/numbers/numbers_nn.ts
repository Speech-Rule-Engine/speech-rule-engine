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
 * @file Translating numbers into Nynorsk.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import { Engine } from '../../engine/engine.js';
import * as EngineConst from '../../engine/engine_const.js';
import { Numbers, NUMBERS as NUMB } from '../messages.js';

/**
 * Translates a number of up to twelve digits into a string representation.
 *
 * @param num The number to translate.
 * @param ordinal Flag indicating if we construct an ordinal.
 * @returns The string representation of that number.
 */
function hundredsToWordsRo_(num: number, ordinal = false): string {
  let n = num % 1000;
  let str = '';
  const count = Math.floor(n / 100);
  const ones = NUMBERS.ones[count];
  str += ones ? (count === 1 ? '' : ones) + 'hundre' : '';
  n = n % 100;
  if (n) {
    str += str ? 'og' : '';
    if (ordinal) {
      const ord = NUMBERS.special['smallOrdinals'][n];
      if (ord) {
        return str + ord;
      }
      if (n % 10) {
        return (
          str +
          NUMBERS.tens[Math.floor(n / 10)] +
          NUMBERS.special['smallOrdinals'][n % 10]
        );
      }
    }
    str +=
      NUMBERS.ones[n] ||
      NUMBERS.tens[Math.floor(n / 10)] + (n % 10 ? NUMBERS.ones[n % 10] : '');
  }
  return ordinal ? replaceOrdinal(str) : str;
}

/**
 * Translates a number of up to twelve digits into a string representation.
 *
 * @param num The number to translate.
 * @param ordinal Flag indicating if we construct an ordinal.
 * @returns The string representation of that number.
 */
function numberToWordsRo(num: number, ordinal = false): string {
  if (num === 0) {
    return ordinal ? NUMBERS.special['smallOrdinals'][0] : NUMBERS.zero;
  }
  if (num >= Math.pow(10, 36)) {
    return num.toString();
  }
  let pos = 0;
  let str = '';
  while (num > 0) {
    const hundreds = num % 1000;
    if (hundreds) {
      const hund = hundredsToWordsRo_(num % 1000, pos ? false : ordinal);
      if (!pos && ordinal) {
        ordinal = !ordinal;
      }
      str =
        hund +
        (pos
          ? ' ' +
            (NUMBERS.large[pos] + (pos > 1 && hundreds > 1 ? 'er' : '')) +
            (str ? ' ' : '')
          : '') +
        str;
    }
    num = Math.floor(num / 1000);
    pos++;
  }
  return ordinal ? str + (str.match(/tusen$/) ? 'de' : 'te') : str;
}

/**
 * Translates a number of up to twelve digits into a string representation of
 * its ordinal.
 *
 * @param num The number to translate.
 * @param _plural A flag indicating if the ordinal is in plural.
 * @returns The ordinal of the number as string.
 */
function numberToOrdinal(num: number, _plural: boolean): string {
  return wordOrdinal(num);
}

/**
 * Adds the ordinal ending for numbers up to numbers < 1000.
 *
 * @param str The number.
 * @returns Number with ordinal ending.
 */
function replaceOrdinal(str: string): string {
  const letOne = NUMBERS.special['endOrdinal'][0];
  if (letOne === 'a' && str.match(/en$/)) {
    return str.slice(0, -2) + NUMBERS.special['endOrdinal'];
  }
  if (str.match(/(d|n)$/) || str.match(/hundre$/)) {
    return str + 'de';
  }
  if (str.match(/i$/)) {
    return str + NUMBERS.special['endOrdinal'];
  }
  if (letOne === 'a' && str.match(/e$/)) {
    return str.slice(0, -1) + NUMBERS.special['endOrdinal'];
  }
  if (str.match(/e$/)) {
    return str + 'nde';
  }
  return str + 'nde';
}

/**
 * Creates a word ordinal string from a number.
 *
 * @param num The number to be converted.
 * @returns The ordinal string.
 */
function wordOrdinal(num: number): string {
  const ordinal = numberToWords(num, true);
  return ordinal;
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

export const NUMBERS: Numbers = NUMB({
  'wordOrdinal': wordOrdinal,
  'numericOrdinal': numericOrdinal,
  'numberToWords': numberToWords,
  'numberToOrdinal': numberToOrdinal
});
// TODO: For simple speech output this should be different.

// Alternative Germanic style numbers:
/**
 * Changes number one 'eins' into a prefix.
 *
 * @param num Number string.
 * @param thd Flag indicating if this a thousand or above.
 * @returns If it is a one, it is made into prefix.
 */
function onePrefix_(num: string, thd = false): string {
  const numOne = NUMBERS.ones[1];
  return num === numOne ? (num === 'ein' ? 'eitt ' : thd ? 'et' : 'ett') : num;
}

/**
 * Translates a number of up to twelve digits into a string representation.
 *
 * @param num The number to translate.
 * @param ordinal Flag indicating if we construct an ordinal.
 * @returns The string representation of that number.
 */
function hundredsToWordsGe_(num: number, ordinal = false): string {
  let n = num % 1000;
  let str = '';
  let ones = NUMBERS.ones[Math.floor(n / 100)];
  str += ones ? onePrefix_(ones) + 'hundre' : '';
  n = n % 100;
  if (n) {
    str += str ? 'og' : '';
    if (ordinal) {
      const ord = NUMBERS.special['smallOrdinals'][n];
      if (ord) {
        return (str += ord);
      }
    }
    ones = NUMBERS.ones[n];
    if (ones) {
      str += ones;
    } else {
      const tens = NUMBERS.tens[Math.floor(n / 10)];
      ones = NUMBERS.ones[n % 10];
      str += ones ? ones + 'og' + tens : tens;
    }
  }
  return ordinal ? replaceOrdinal(str) : str;
}

/**
 * Translates a number of up to twelve digits into a string representation.
 *
 * @param num The number to translate.
 * @param ordinal Flag indicating if we construct an ordinal.
 * @returns The string representation of that number.
 */
function numberToWordsGe(num: number, ordinal = false): string {
  if (num === 0) {
    return ordinal ? NUMBERS.special['smallOrdinals'][0] : NUMBERS.zero;
  }
  if (num >= Math.pow(10, 36)) {
    return num.toString();
  }
  let pos = 0;
  let str = '';
  while (num > 0) {
    const hundreds = num % 1000;
    if (hundreds) {
      const hund = hundredsToWordsGe_(num % 1000, pos ? false : ordinal);
      if (!pos && ordinal) {
        ordinal = !ordinal;
      }
      str =
        (pos === 1 ? onePrefix_(hund, true) : hund) +
        (pos > 1 ? NUMBERS.numSep : '') +
        (pos
          ? // If this is million or above take care oaf the plural.
            NUMBERS.large[pos] + (pos > 1 && hundreds > 1 ? 'er' : '')
          : '') +
        (pos > 1 && str ? NUMBERS.numSep : '') +
        str;
    }
    num = Math.floor(num / 1000);
    pos++;
  }
  return ordinal ? str + (str.match(/tusen$/) ? 'de' : 'te') : str;
}

/**
 * Translates a number of up to twelve digits into a string representation.
 *
 * @param num The number to translate.
 * @param ordinal Flag indicating if we construct an ordinal.
 * @returns The string representation of that number.
 */
function numberToWords(num: number, ordinal = false): string {
  const word =
    Engine.getInstance().features.is(EngineConst.StringFeatures.SUBISO, 'alt')
      ? numberToWordsGe(num, ordinal)
      : numberToWordsRo(num, ordinal);
  return word;
}

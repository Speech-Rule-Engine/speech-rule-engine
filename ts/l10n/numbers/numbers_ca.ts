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
 * @file Translating numbers into Spanish.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import { Grammar } from '../../rule_engine/grammar.js';
import { Numbers, NUMBERS as NUMB } from '../messages.js';

//
// This work was sponsored by
//

/**
 * Turns a tens position in a number into words.
 *
 * @param num The number to translate.
 * @returns The word for the tens position.
 */
function tensToWords_(num: number): string {
  const n = num % 100;
  if (n < 20) {
    return NUMBERS.ones[n];
  }
  const ten = Math.floor(n / 10);
  const tens = NUMBERS.tens[ten];
  const ones = NUMBERS.ones[n % 10];
  return tens && ones ? tens + (ten === 2 ? '-i-' : '-') + ones : tens || ones;
}

/**
 * Translates a number of up to twelve digits into a string representation.
 *
 * @param num The number to translate.
 * @returns The string representation of that number.
 */
function hundredsToWords_(num: number): string {
  const n = num % 1000;
  const hundred = Math.floor(n / 100);
  const hundreds = hundred
    ? hundred === 1
      ? 'cent'
      : NUMBERS.ones[hundred] + '-cents'
    : '';
  const tens = tensToWords_(n % 100);
  return hundreds && tens ? hundreds + NUMBERS.numSep + tens : hundreds || tens;
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
    // For the large numbers we go in million steps as the are "mil milions",
    // "mil bilions", "mil trilions", "mil quadrilions", "mil quintilions"
    const hundreds = num % (pos > 1 ? 1000000 : 1000);
    if (hundreds) {
      let large = NUMBERS.large[pos];
      if (!pos) {
        // < 1000
        str = hundredsToWords_(hundreds);
      } else if (pos === 1) {
        // Thousands to 999999
        str =
          (hundreds === 1 ? '' : hundredsToWords_(hundreds) + NUMBERS.numSep) +
          large +
          (str ? NUMBERS.numSep + str : '');
      } else {
        const thousands = numberToWords(hundreds);
        large = hundreds === 1 ? large : large.replace(/\u00f3$/, 'ons');
        str =
          thousands +
          NUMBERS.numSep +
          large +
          (str ? NUMBERS.numSep + str : '');
      }
    }
    num = Math.floor(num / (pos > 1 ? 1000000 : 1000));
    pos++;
  }
  return str;
}

/**
 * Translates a number into Spanish ordinal
 *
 * @param num The number to translate.
 * @param _plural A flag indicating if the ordinal is in plural.
 * @returns The ordinal of the number as string.
 */
function numberToOrdinal(num: number, _plural: boolean): string {
  if (num > 1999) {
    return numericOrdinal(num);
  }
  if (num <= 10) {
    return NUMBERS.special['onesOrdinals'][num - 1];
  }
  const result = numberToWords(num);
  if (result.match(/mil$/)) {
    return result.replace(/mil$/, 'mil·lèsima');
  }
  if (result.match(/u$/)) {
    return result.replace(/u$/, 'vena');
  }
  if (result.match(/a$/)) {
    return result.replace(/a$/, 'ena');
  }
  return result + (result.match(/e$/) ? 'na' : 'ena');
}

/**
 * Creates a numeric ordinal string from a number.
 *
 * @param num The number to be converted.
 * @returns The ordinal string.
 */
function numericOrdinal(num: number): string {
  const gender = Grammar.getInstance().getParameter('gender') as string;
  return num.toString() + (gender === 'f' ? 'a' : 'n');
}

export const NUMBERS: Numbers = NUMB({
  'numericOrdinal': numericOrdinal,
  'numberToWords': numberToWords,
  'numberToOrdinal': numberToOrdinal
});

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
// This work was sponsored by TextHelp
//

/**
 * Turns a tens position in a number into words.
 *
 * @param num The number to translate.
 * @returns The word for the tens position.
 */
function tensToWords_(num: number): string {
  const n = num % 100;
  if (n < 30) {
    return NUMBERS.ones[n];
  }
  const tens = NUMBERS.tens[Math.floor(n / 10)];
  const ones = NUMBERS.ones[n % 10];
  return tens && ones ? tens + ' y ' + ones : tens || ones;
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
  const hundreds = NUMBERS.special.hundreds[hundred];
  const tens = tensToWords_(n % 100);
  if (hundred === 1) {
    if (!tens) {
      return hundreds;
    }
    // Creates ciento.
    return hundreds + 'to' + ' ' + tens;
  }
  return hundreds && tens ? hundreds + ' ' + tens : hundreds || tens;
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
      let large = NUMBERS.large[pos];
      const huns = hundredsToWords_(hundreds);
      if (!pos) {
        str = huns;
      } else if (hundreds === 1) {
        large = large.match('/^mil( |$)/') ? large : 'un ' + large;
        str = large + (str ? ' ' + str : '');
      } else {
        large = large.replace(/\u00f3n$/, 'ones');
        str = hundredsToWords_(hundreds) + ' ' + large + (str ? ' ' + str : '');
      }
    }
    num = Math.floor(num / 1000);
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
    return num.toString() + 'a';
  }
  if (num <= 12) {
    return NUMBERS.special.onesOrdinals[num - 1];
  }
  const result = [];
  if (num >= 1000) {
    num = num - 1000;
    result.push('milésima');
  }
  if (!num) {
    return result.join(' ');
  }
  let pos = 0;
  pos = Math.floor(num / 100);
  if (pos > 0) {
    result.push(NUMBERS.special.hundredsOrdinals[pos - 1]);
    num = num % 100;
  }
  if (num <= 12) {
    result.push(NUMBERS.special.onesOrdinals[num - 1]);
  } else {
    pos = Math.floor(num / 10);
    if (pos > 0) {
      result.push(NUMBERS.special.tensOrdinals[pos - 1]);
      num = num % 10;
    }
    if (num > 0) {
      result.push(NUMBERS.special.onesOrdinals[num - 1]);
    }
  }
  return result.join(' ');
}

/**
 * Creates a numeric ordinal string from a number.
 *
 * @param num The number to be converted.
 * @returns The ordinal string.
 */
function numericOrdinal(num: number): string {
  const gender = Grammar.getInstance().getParameter('gender') as string;
  return num.toString() + (gender === 'f' ? 'a' : 'o');
}

export const NUMBERS: Numbers = NUMB(
  {
    'numericOrdinal': numericOrdinal,
    'numberToWords': numberToWords,
    'numberToOrdinal': numberToOrdinal,
  }
);

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
 * @fileoverview Translating numbers into Spanish.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import {Grammar} from '../../rule_engine/grammar';
import {Numbers, NUMBERS as NUMB} from '../messages';

//
// This work was sponsored by TextHelp
//


/**
 * Turns a tens position in a number into words.
 * @param num The number to translate.
 * @return The word for the tens position.
 */
function tensToWords_(num: number): string {
  let n = num % 100;
  if (n < 30) {
    return NUMBERS.ones[n];
  }
  let tens = NUMBERS.tens[Math.floor(n / 10)];
  let ones = NUMBERS.ones[n % 10];
  return tens && ones ? tens + ' y ' + ones : tens || ones;
}


/**
 * Translates a number of up to twelve digits into a string representation.
 * @param num The number to translate.
 * @return The string representation of that number.
 */
function hundredsToWords_(num: number): string {
  let n = num % 1000;
  let hundred = Math.floor(n / 100);
  let hundreds = NUMBERS.special.hundreds[hundred];
  let tens = tensToWords_(n % 100);
  if (hundred === 1) {
    if (!tens) {
      return hundreds;
    }
    // Creates ciento.
    return hundreds + 'to' +
        ' ' + tens;
  }
  return hundreds && tens ? hundreds + ' ' + tens : hundreds || tens;
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
    let hundreds = num % 1000;
    if (hundreds) {
      let large = NUMBERS.large[pos];
      let huns = hundredsToWords_(hundreds);
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
 * @param num The number to translate.
 * @param plural A flag indicating if the ordinal is in plural.
 * @return The ordinal of the number as string.
 */
function numberToOrdinal(num: number, _plural: boolean): string {
  if (num > 1999) {
    return num.toString() + 'a';
  }
  if (num <= 12) {
    return NUMBERS.special.onesOrdinals[num - 1];
  }
  let result = [];
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
 * Creates a simple ordinal string from a number.
 * @param num The number to be converted.
 * @return The ordinal string.
 */
function simpleOrdinal(num: number): string {
  let gender = (Grammar.getInstance().getParameter('gender') as string);
  return num.toString() + (gender === 'f' ? 'a' : 'o');
}


const NUMBERS: Numbers = NUMB();
NUMBERS.simpleOrdinal = simpleOrdinal;
NUMBERS.numberToWords = numberToWords;
NUMBERS.numberToOrdinal = numberToOrdinal;


export default NUMBERS;

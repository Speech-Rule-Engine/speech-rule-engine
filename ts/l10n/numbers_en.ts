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
 * @fileoverview Translating numbers into English.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */


import {Numbers} from './numbers';


const zero_: string = 'zero';

/**
 * String representation of zero to nineteen.
 */
const onesNumbers_: string[] = [
  '',        'one',     'two',       'three',    'four',
  'five',    'six',     'seven',     'eight',    'nine',
  'ten',     'eleven',  'twelve',    'thirteen', 'fourteen',
  'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
];


/**
 * String representation of twenty to ninety.
 */
const tensNumbers_: string[] = [
  '', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty',
  'ninety'
];


/**
 * String representation of thousand to decillion.
 */
const largeNumbers_: string[] = [
  '', 'thousand', 'million', 'billion', 'trillion', 'quadrillion',
  'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion',
  'decillion'
];


/**
 * Translates a number of up to twelve digits into a string representation.
 * @param num The number to translate.
 * @return The string representation of that number.
 */
function hundredsToWords_(num: number): string {
  let n = num % 1000;
  let str = '';
  str += onesNumbers_[Math.floor(n / 100)] ?
      onesNumbers_[Math.floor(n / 100)] + NUMBERS.numSep + 'hundred' :
      '';
  n = n % 100;
  if (n) {
    str += str ? NUMBERS.numSep : '';
    str += onesNumbers_[n] ||
        tensNumbers_[Math.floor(n / 10)] +
            (n % 10 ? NUMBERS.numSep + onesNumbers_[n % 10] : '');
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
      str = hundredsToWords_(num % 1000) +
          (pos ? '-' + largeNumbers_[pos] + '-' : '') + str;
    }
    num = Math.floor(num / 1000);
    pos++;
  }
  return str.replace(/-$/, '');
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
    return plural ? 'oneths' : 'oneth';
  }
  if (num === 2) {
    return plural ? 'halves' : 'half';
  }
  let ordinal = wordOrdinal(num);
  return plural ? ordinal + 's' : ordinal;
}


/**
 * Creates a word ordinal string from a number.
 * @param num The number to be converted.
 * @return The ordinal string.
 */
function wordOrdinal(num: number): string {
  let ordinal = numberToWords(num);
  if (ordinal.match(/one$/)) {
    ordinal = ordinal.slice(0, -3) + 'first';
  } else if (ordinal.match(/two$/)) {
    ordinal = ordinal.slice(0, -3) + 'second';
  } else if (ordinal.match(/three$/)) {
    ordinal = ordinal.slice(0, -5) + 'third';
  } else if (ordinal.match(/five$/)) {
    ordinal = ordinal.slice(0, -4) + 'fifth';
  } else if (ordinal.match(/eight$/)) {
    ordinal = ordinal.slice(0, -5) + 'eighth';
  } else if (ordinal.match(/nine$/)) {
    ordinal = ordinal.slice(0, -4) + 'ninth';
  } else if (ordinal.match(/twelve$/)) {
    ordinal = ordinal.slice(0, -6) + 'twelfth';
  } else if (ordinal.match(/ty$/)) {
    ordinal = ordinal.slice(0, -2) + 'tieth';
  } else {
    ordinal = ordinal + 'th';
  }
  return ordinal;
}


/**
 * Creates a simple ordinal string from a number.
 * @param num The number to be converted.
 * @return The ordinal string.
 */
function simpleOrdinal(num: number): string {
  let tens = num % 100;
  let numStr = num.toString();
  if (tens > 10 && tens < 20) {
    return numStr + 'th';
  }
  switch (num % 10) {
    case 1:
      return numStr + 'st';
    case 2:
      return numStr + 'nd';
    case 3:
      return numStr + 'rd';
    default:
      return numStr + 'th';
  }
}


const NUMBERS: Numbers = {
  wordOrdinal: wordOrdinal,
  simpleOrdinal: simpleOrdinal,
  numberToWords: numberToWords,
  numberToOrdinal: numberToOrdinal,
  vulgarSep: ' ',
  numSep: ' '
};

export default NUMBERS;
// TODO: For simple speech output this should be different.

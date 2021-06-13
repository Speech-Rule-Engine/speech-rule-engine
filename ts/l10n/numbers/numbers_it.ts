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
 * @fileoverview Translating numbers into Italian.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

//
// This work was sponsored by TextHelp
//


import {Grammar} from '../../rule_engine/grammar';
import {Numbers} from '../numbers';


/**
 * Translates a number of up to twelve digits into a string representation.
 * @param num The number to translate.
 * @return The string representation of that number.
 */
function hundredsToWords_(num: number): string {
  let n = num % 1000;
  let str = '';
  str += NUMBERS.ones[Math.floor(n / 100)] ?
      NUMBERS.ones[Math.floor(n / 100)] + NUMBERS.numSep + 'cento' :
      '';
  n = n % 100;
  if (n) {
    str += str ? NUMBERS.numSep : '';
    let ones = NUMBERS.ones[n];
    if (ones) {
      str += ones;
    } else {
      let tens = NUMBERS.tens[Math.floor(n / 10)];
      let rest = n % 10;
      if (rest === 1 || rest === 8) {
        tens = tens.slice(0, -1);
      }
      str += tens;
      str += rest ? NUMBERS.numSep + NUMBERS.ones[n % 10] : '';
    }
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
  if (num === 1 && Grammar.getInstance().getParameter('fraction')) {
    return 'un';
  }
  let pos = 0;
  let str = '';
  while (num > 0) {
    let hundreds = num % 1000;
    if (hundreds) {
      str = hundredsToWords_(num % 1000) +
          (pos ? '-' + NUMBERS.large[pos] + '-' : '') + str;
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
  if (num === 2) {
    return plural ? 'mezzi' : 'mezzo';
  }
  let ordinal = wordOrdinal(num);
  if (!plural) {
    return ordinal;
  }
  let gender = ordinal.match(/o$/) ? 'i' : 'e';
  return ordinal.slice(0, -1) + gender;
}


/**
 * String representation of ordinals from zero to ten.
 */
const onesOrdinals_: string[] = [
  'zero', 'primo', 'secondo', 'terzo', 'quarto', 'quinto', 'sesto', 'settimo',
  'ottavo', 'nono', 'decimo'
];


/**
 * Creates a word ordinal string from a number.
 * @param num The number to be converted.
 * @return The ordinal string.
 */
function wordOrdinal(num: number): string {
  let gender = (Grammar.getInstance().getParameter('gender') as string);
  let postfix = gender === 'male' ? 'o' : 'a';
  let ordinal = onesOrdinals_[num];
  if (ordinal) {
    return ordinal.slice(0, -1) + postfix;
  }
  ordinal = numberToWords(num);
  return ordinal.slice(0, -1) + 'esim' + postfix;
}


/**
 * Creates a simple ordinal string from a number.
 * @param num The number to be converted.
 * @return The ordinal string.
 */
function simpleOrdinal(num: number): string {
  let gender = (Grammar.getInstance().getParameter('gender') as string);
  return num.toString() + (gender === 'male' ? 'o' : 'a');
}


const NUMBERS: Numbers = {
  zero: 'zero',
  ones: [
    '',         'uno',    'due',         'tre',      'quattro',
    'cinque',   'sei',    'sette',       'otto',     'nove',
    'dieci',    'undici', 'dodici',      'tredici',  'quattordici',
    'quindici', 'sedici', 'diciassette', 'diciotto', 'diciannove'
  ],
  tens: [
    '', '', 'venti', 'trenta', 'quaranta', 'cinquanta', 'sessanta', 'settanta',
    'ottanta', 'novanta'
  ],
  large: [
    '', 'mille', 'milione', 'miliardo', 'bilione', 'biliardo', 'trilione',
    'triliardo', 'quadrilione', 'quadriliardo', 'quntilione', 'quintiliardo'
  ],

  wordOrdinal: wordOrdinal,
  simpleOrdinal: simpleOrdinal,
  numberToWords: numberToWords,
  numberToOrdinal: numberToOrdinal,
  vulgarSep: ' ',
  numSep: ''
};


export default NUMBERS;

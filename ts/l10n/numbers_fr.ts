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
 * @fileoverview Translating numbers into French.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

//
// This work was sponsored by TextHelp
//


import * as NumbersExports from './numbers';
import {Numbers} from './numbers';


/**
 * Sub-ISO specification. Possible values: fr, be, sw.
 */
export const SUB_ISO: string = 'fr';


// Numbers
/**
 * String representation of zero to nineteen.
 */
export const onesNumbers_: string[] = [
  '',         'un',     'deux',  'trois',    'quatre',   'cinq',    'six',
  'sept',     'huit',   'neuf',  'dix',      'onze',     'douze',   'treize',
  'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf'
];


/**
 * String representation of twenty to ninety.
 */
export const tensNumbers_: {[key: string]: string[]} = {
  'fr': [
    '', '', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante',
    'soixante-dix', 'quatre-vingts', 'quatre-vingt-dix'
  ],
  'be': [
    '', '', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante', 'septante',
    'quatre-vingts', 'nonante'
  ],
  'sw': [
    '', '', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante', 'septante',
    'huitante', 'nonante'
  ]
};


/**
 * String representation of thousand to decillion.
 */
export const largeNumbers_: string[] = [
  '', 'mille', 'millions', 'milliards', 'billions', 'mille billions',
  'trillions', 'mille trillions', 'quadrillions', 'mille quadrillions',
  'quintillions', 'mille quintillions'
];


/**
 * Translates a number of up to twelve digits into a string representation.
 * @param number The number to translate.
 * @return The string representation of that number.
 */
export function hundredsToWords_(number: number): string {
  let n = number % 1000;
  let str = '';
  str += onesNumbers_[Math.floor(n / 100)] ?
      onesNumbers_[Math.floor(n / 100)] + '-cent' :
      '';
  n = n % 100;
  if (n) {
    str += str ? '-' : '';
    let ones = onesNumbers_[n];
    if (ones) {
      str += ones;
    } else {
      // -dix case!
      let tens = tensNumbers_[SUB_ISO][Math.floor(n / 10)];
      if (tens.match(/\-dix$/)) {
        ones = onesNumbers_[n % 10 + 10];
        str += tens.replace(/\-dix$/, '') + '-' + ones;
      } else {
        str += tens + (n % 10 ? '-' + onesNumbers_[n % 10] : '');
      }
    }
  }
  let match = str.match(/s\-\w+$/);
  return match ? str.replace(/s\-\w+$/, match[0].slice(1)) :
                 str.replace(/\-un$/, '-et-un');
}


/**
 * Translates a number of up to twelve digits into a string representation.
 * @param number The number to translate.
 * @return The string representation of that number.
 */
export function numberToWords(number: number): string {
  if (number >= Math.pow(10, 36)) {
    return number.toString();
  }
  let pos = 0;
  let str = '';
  while (number > 0) {
    let hundreds = number % 1000;
    if (hundreds) {
      let large = largeNumbers_[pos];
      let huns = hundredsToWords_(hundreds);
      if (large && large.match(/^mille /)) {
        let rest = large.replace(/^mille /, '');
        if (str.match(RegExp(rest))) {
          str = huns + (pos ? '-mille-' : '') + str;
        } else if (str.match(RegExp(rest.replace(/s$/, '')))) {
          str = huns + (pos ? '-mille-' : '') +
              str.replace(rest.replace(/s$/, ''), rest);
        } else {
          str = huns + (pos ? '-' + large + '-' : '') + str;
        }
      } else {
        large = hundreds === 1 && large ? large.replace(/s$/, '') : large;
        str = huns + (pos ? '-' + large + '-' : '') + str;
      }
    }
    number = Math.floor(number / 1000);
    pos++;
  }
  return str.replace(/-$/, '');
}


// Ordinals
export const SMALL_ORDINAL: {[key: string]: string} = {
  1: 'unième',
  2: 'demi',
  3: 'tiers',
  4: 'quart'
};


/**
 * Translates a number of up to twelve digits into a string representation of
 * its ordinal.
 * @param num The number to translate.
 * @param plural A flag indicating if the ordinal is in plural.
 * @return The ordinal of the number as string.
 */
export function numberToOrdinal(num: number, plural: boolean): string {
  let ordinal = SMALL_ORDINAL[num] || wordOrdinal(num);
  return num === 3 ? ordinal : plural ? ordinal + 's' : ordinal;
}


/**
 * Creates a word ordinal string from a number.
 * @param number The number to be converted.
 * @return The ordinal string.
 */
export function wordOrdinal(number: number): string {
  if (number === 1) {
    return 'première';
  }
  let ordinal = numberToWords(number);
  if (ordinal.match(/^neuf$/)) {
    ordinal = ordinal.slice(0, -1) + 'v';
  } else if (ordinal.match(/cinq$/)) {
    ordinal = ordinal + 'u';
  } else if (ordinal.match(/trois$/)) {
    ordinal = ordinal;
  } else if (ordinal.match(/e$/) || ordinal.match(/s$/)) {
    ordinal = ordinal.slice(0, -1);
  }
  ordinal = ordinal + 'ième';
  return ordinal;
}


/**
 * Creates a simple ordinal string from a number.
 * @param number The number to be converted.
 * @return The ordinal string.
 */
export function simpleOrdinal(number: number): string {
  let gender = (sre.Grammar.getInstance().getParameter('gender') as string);
  return number === 1 ? number.toString() + (gender === 'male' ? 'er' : 're') :
                        number.toString() + 'e';
}


export const NUMBERS: Numbers = {
  wordOrdinal: wordOrdinal,
  simpleOrdinal: simpleOrdinal,
  numberToWords: numberToWords,
  numberToOrdinal: numberToOrdinal,
  vulgarSep: '-'
};

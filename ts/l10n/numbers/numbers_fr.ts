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
 * @file Translating numbers into French.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

//
// This work was sponsored by TextHelp
//

import { Engine } from '../../engine/engine.js';
import * as EngineConst from '../../engine/engine_const.js';
import { Grammar } from '../../rule_engine/grammar.js';
import { Numbers, NUMBERS as NUMB } from '../messages.js';

/**
 * Translates a number of up to twelve digits into a string representation.
 *
 * @param num The number to translate.
 * @returns The string representation of that number.
 */
function hundredsToWords_(num: number): string {
  let n = num % 1000;
  let str = '';
  str += NUMBERS.ones[Math.floor(n / 100)]
    ? NUMBERS.ones[Math.floor(n / 100)] + '-cent'
    : '';
  n = n % 100;
  if (n) {
    str += str ? '-' : '';
    let ones = NUMBERS.ones[n];
    if (ones) {
      str += ones;
    } else {
      // -dix case!
      const tens = NUMBERS.tens[Math.floor(n / 10)];
      if (tens.match(/-dix$/)) {
        ones = NUMBERS.ones[(n % 10) + 10];
        str += tens.replace(/-dix$/, '') + '-' + ones;
      } else {
        str += tens + (n % 10 ? '-' + NUMBERS.ones[n % 10] : '');
      }
    }
  }
  const match = str.match(/s-\w+$/);
  return match
    ? str.replace(/s-\w+$/, match[0].slice(1))
    : str.replace(/-un$/, '-et-un');
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
  if (
    NUMBERS.special['tens-' + Engine.getInstance().features.getString(EngineConst.StringFeatures.SUBISO)]
  ) {
    NUMBERS.tens = NUMBERS.special[
      'tens-' + Engine.getInstance().features.getString(EngineConst.StringFeatures.SUBISO)
    ] as string[];
  }
  let pos = 0;
  let str = '';
  while (num > 0) {
    const hundreds = num % 1000;
    if (hundreds) {
      let large = NUMBERS.large[pos];
      const huns = hundredsToWords_(hundreds);
      if (large && large.match(/^mille /)) {
        const rest = large.replace(/^mille /, '');
        if (str.match(RegExp(rest))) {
          str = huns + (pos ? '-mille-' : '') + str;
        } else if (str.match(RegExp(rest.replace(/s$/, '')))) {
          str =
            huns +
            (pos ? '-mille-' : '') +
            str.replace(rest.replace(/s$/, ''), rest);
        } else {
          str = huns + (pos ? '-' + large + '-' : '') + str;
        }
      } else {
        large = hundreds === 1 && large ? large.replace(/s$/, '') : large;
        str = huns + (pos ? '-' + large + '-' : '') + str;
      }
    }
    num = Math.floor(num / 1000);
    pos++;
  }
  return str.replace(/-$/, '');
}

// Ordinals
const SMALL_ORDINAL: { [key: string]: string } = {
  1: 'unième',
  2: 'demi',
  3: 'tiers',
  4: 'quart'
};

/**
 * Translates a number of up to twelve digits into a string representation of
 * its ordinal.
 *
 * @param num The number to translate.
 * @param plural A flag indicating if the ordinal is in plural.
 * @returns The ordinal of the number as string.
 */
function numberToOrdinal(num: number, plural: boolean): string {
  const ordinal = SMALL_ORDINAL[num] || wordOrdinal(num);
  return num === 3 ? ordinal : plural ? ordinal + 's' : ordinal;
}

/**
 * Creates a word ordinal string from a number.
 *
 * @param num The number to be converted.
 * @returns The ordinal string.
 */
function wordOrdinal(num: number): string {
  if (num === 1) {
    return 'première';
  }
  let ordinal = numberToWords(num);
  if (ordinal.match(/^neuf$/)) {
    ordinal = ordinal.slice(0, -1) + 'v';
  } else if (ordinal.match(/cinq$/)) {
    ordinal = ordinal + 'u';
  } else if (ordinal.match(/trois$/)) {
    ordinal = ordinal + '';
  } else if (ordinal.match(/e$/) || ordinal.match(/s$/)) {
    ordinal = ordinal.slice(0, -1);
  }
  ordinal = ordinal + 'ième';
  return ordinal;
}

/**
 * Creates a numeric ordinal string from a number.
 *
 * @param num The number to be converted.
 * @returns The ordinal string.
 */
function numericOrdinal(num: number): string {
  const gender = Grammar.getInstance().getParameter('gender') as string;
  return num === 1
    ? num.toString() + (gender === 'm' ? 'er' : 're')
    : num.toString() + 'e';
}

export const NUMBERS: Numbers = NUMB({
  'wordOrdinal': wordOrdinal,
  'numericOrdinal': numericOrdinal,
  'numberToWords': numberToWords,
  'numberToOrdinal': numberToOrdinal
});

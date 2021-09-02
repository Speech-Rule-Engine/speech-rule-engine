//
// Copyright 2021 Volker Sorge
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
 * @fileoverview Translating numbers into Hindi.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

//
// This work was supported by British Council UKIERI SPARC Project #P1161
//


import {Grammar} from '../../rule_engine/grammar';
import {Numbers, NUMBERS as NUMB} from '../messages';


/**
 * Translates a number of up to twelve digits into a string representation.
 * @param num The number to translate.
 * @return The string representation of that number.
 */
function hundredsToWords_(num: number): string {
  let n = num % 1000;
  let str = '';
  str += NUMBERS.ones[Math.floor(n / 100)] ?
      NUMBERS.ones[Math.floor(n / 100)] + NUMBERS.numSep + NUMBERS.special.hundred :
      '';
  n = n % 100;
  if (n) {
    str += str ? NUMBERS.numSep : '';
    str += NUMBERS.ones[n];
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
  if (num >= Math.pow(10, 32)) {
    return num.toString();
  }
  let pos = 0;
  let str = '';
  let hundreds = num % 1000;
  let hundredsWords = hundredsToWords_(hundreds);
  num = Math.floor(num / 1000);
  if (!num) {
    return hundredsWords;
  }
  while (num > 0) {
    let thousands = num % 100;
    if (thousands) {
      str = NUMBERS.ones[thousands] + NUMBERS.numSep + NUMBERS.large[pos] +
          (str ? NUMBERS.numSep + str : '');
    }
    num = Math.floor(num / 100);
    pos++;
  }
  return hundredsWords ? str + NUMBERS.numSep + hundredsWords : str;
}


/**
 * Translates a number of up to twelve digits into a string representation of
 * its ordinal.
 * @param num The number to translate.
 * @param plural A flag indicating if the ordinal is in plural.
 * @return The ordinal of the number as string.
 */
function numberToOrdinal(num: number, _plural: boolean): string {
  if (num <= 10) {
    return NUMBERS.special.smallDenominators[num];
  }
  return wordOrdinal(num) + ' अंश';
}


/**
 * Creates a word ordinal string from a number.
 * @param num The number to be converted.
 * @return The ordinal string.
 */
function wordOrdinal(num: number): string {
  let gender = (Grammar.getInstance().getParameter('gender') as string);
  if (num <= 0) {
    return num.toString();
  }
  if (num < 10) {
    return gender === 'f' ? NUMBERS.special.ordinalsFeminine[num] :
                                 NUMBERS.special.ordinalsMasculine[num];
  }
  let ordinal = numberToWords(num);
  return ordinal + (gender === 'f' ? 'वीं' : 'वाँ');
}


/**
 * Creates a simple ordinal string from a number.
 * @param num The number to be converted.
 * @return The ordinal string.
 */
function simpleOrdinal(num: number): string {
  let gender = (Grammar.getInstance().getParameter('gender') as string);

  if (num > 0 && num < 10) {
    return gender === 'f' ? NUMBERS.special.simpleSmallOrdinalsFeminine[num] :
      NUMBERS.special.simpleSmallOrdinalsMasculine[num];
  }
  let ordinal = num.toString()
                    .split('')
                    .map(function(x) {
                      let num = parseInt(x, 10);
                      return isNaN(num) ? '' : NUMBERS.special.simpleNumbers[num];
                    })
                    .join('');
  return ordinal + (gender === 'f' ? 'वीं' : 'वाँ');
}


const NUMBERS: Numbers = NUMB();
NUMBERS.wordOrdinal = wordOrdinal;
NUMBERS.simpleOrdinal = simpleOrdinal;
NUMBERS.numberToWords = numberToWords;
NUMBERS.numberToOrdinal = numberToOrdinal;

export default NUMBERS;

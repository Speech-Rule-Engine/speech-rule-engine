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
import {Numbers} from './numbers';

//
// This work was sponsored by TextHelp
//


// Numbers
/**
 * String representation of zero to twenty-nine.
 */
export const onesNumbers_: string[] = [
  '',
  'uno',
  'dos',
  'tres',
  'cuatro',
  'cinco',
  'seis',
  'siete',
  'ocho',
  'nueve',
  'diez',
  'once',
  'doce',
  'trece',
  'catorce',
  'quince',
  'dieciséis',
  'diecisiete',
  'dieciocho',
  'diecinueve',
  'veinte',
  'veintiuno',
  'veintidós',
  'veintitrés',
  'veinticuatro',
  'veinticinco',
  'veintiséis',
  'veintisiete',
  'veintiocho',
  'veintinueve'
];


/**
 * String representation of thirty to ninety.
 */
export const tensNumbers_: string[] = [
  '', '', '', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta',
  'ochenta', 'noventa'
];


/**
 * String representation of one hundred to nine hundred.
 */
export const hundredsNumbers_: string[] = [
  '', 'cien', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos',
  'seiscientos', 'setecientos', 'ochocientos', 'novecientos'
];


/**
 * String representation of thousand to decillion.
 */
export const largeNumbers_: string[] = [
  '',           'mil',
  'millón',     'mil millónes',
  'billón',     'mil billónes',
  'trillón',    'mil trillónes',
  'cuatrilló',  'mil cuatrillóes',
  'quintillón', 'mil quintillónes',
  'sextillón',  'mil sextillónes',
  'septillón',  'mil septillónes',
  'octillón',   'mil octillónes',
  'nonillón',   'mil nonillónes',
  'decillón',   'mil decillónes'
];


/**
 * Turns a tens position in a number into words.
 * @param number The number to translate.
 * @return The word for the tens position.
 */
export function tensToWords_(number: number): string {
  let n = number % 100;
  if (n < 30) {
    return onesNumbers_[n];
  }
  let tens = tensNumbers_[Math.floor(n / 10)];
  let ones = onesNumbers_[n % 10];
  return tens && ones ? tens + ' y ' + ones : tens || ones;
}


/**
 * Translates a number of up to twelve digits into a string representation.
 * @param number The number to translate.
 * @return The string representation of that number.
 */
export function hundredsToWords_(number: number): string {
  let n = number % 1000;
  let hundred = Math.floor(n / 100);
  let hundreds = hundredsNumbers_[hundred];
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
    number = Math.floor(number / 1000);
    pos++;
  }
  return str;
}


// Ordinals
/**
 * String representation of zero to nineteen.
 */
export const onesOrdinals_: string[] = [
  'primera', 'segunda', 'tercera', 'cuarta', 'quinta', 'sexta', 'séptima',
  'octava', 'novena', 'décima', 'undécima', 'duodécima'
];


/**
 * String representation of twenty to ninety.
 */
export const tensOrdinals_: string[] = [
  'décima', 'vigésima', 'trigésima', 'cuadragésima', 'quincuagésima',
  'sexagésima', 'septuagésima', 'octogésima', 'nonagésima'
];


/**
 * String representation of thousand to decillion.
 */
export const hundredsOrdinals_: string[] = [
  'centésima', 'ducentésima', 'tricentésima', 'cuadringentésima',
  'quingentésima', 'sexcentésima', 'septingentésima', 'octingentésima',
  'noningentésima'
];


/**
 * Translates a number into Spanish ordinal
 * @param num The number to translate.
 * @param plural A flag indicating if the ordinal is in plural.
 * @return The ordinal of the number as string.
 */
export function numberToOrdinal(num: number, plural: boolean): string {
  if (num > 1999) {
    return num.toString() + 'a';
  }
  if (num <= 12) {
    return onesOrdinals_[num - 1];
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
    result.push(hundredsOrdinals_[pos - 1]);
    num = num % 100;
  }
  if (num <= 12) {
    result.push(onesOrdinals_[num - 1]);
  } else {
    pos = Math.floor(num / 10);
    if (pos > 0) {
      result.push(tensOrdinals_[pos - 1]);
      num = num % 10;
    }
    if (num > 0) {
      result.push(onesOrdinals_[num - 1]);
    }
  }
  return result.join(' ');
}


/**
 * Creates a simple ordinal string from a number.
 * @param number The number to be converted.
 * @return The ordinal string.
 */
export function simpleOrdinal(number: number): string {
  let gender = (sre.Grammar.getInstance().getParameter('gender') as string);
  return number.toString() + (gender === 'female' ? 'a' : 'o');
}


export const NUMBERS: Numbers = {
  // wordOrdinal: sre.Numbers.es.wordOrdinal,
  simpleOrdinal: simpleOrdinal,
  numberToWords: numberToWords,
  numberToOrdinal: numberToOrdinal,
  vulgarSep: '-'
};

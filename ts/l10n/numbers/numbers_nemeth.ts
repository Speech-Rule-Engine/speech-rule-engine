//
// Copyright 2020-21 Volker Sorge
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
 * @fileoverview Translating numbers to Nemeth.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

//
// This work was sponsored by BTAA (Big Ten Academic Alliance).
//


import {Numbers, NUMBERS as NUMB} from '../messages';


/**
 * Translates a number of into a Braille string representation.
 * @param num The number to translate.
 * @return The Braille representation of that number.
 */
function numberToWords(num: number): string {
  let digits = num.toString().split('');
  return digits
      .map(function(digit) {
        return NUMBERS.ones[parseInt(digit, 10)];
      })
      .join('');
}


const NUMBERS: Numbers = NUMB();
NUMBERS.numberToWords = numberToWords;
NUMBERS.numberToOrdinal = numberToWords;

export default NUMBERS;

// Copyright 2020 Volker Sorge
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

goog.provide('sre.Numbers.nemeth');

goog.require('sre.Numbers');


/**
 * @type {Array.<string>}
 * @private
 */
sre.Numbers.nemeth.oneNumbers_ = [
  '⠴', '⠂', '⠆', '⠒', '⠲', '⠢', '⠖', '⠶', '⠦', '⠔'
];


/**
 * Translates a number of into a Braille string representation.
 * @param {number} number The number to translate.
 * @return {string} The Braille representation of that number.
 */
sre.Numbers.nemeth.numberToWords = function(number) {
  var digits = number.toString().split('');
  return digits.map(function(digit) {
    return sre.Numbers.nemeth.oneNumbers_[parseInt(digit, 10)];
  }).join('');
};


/**
 * @type {sre.Numbers}
 */
sre.Numbers.nemeth.NUMBERS = {
  numberToWords: sre.Numbers.nemeth.numberToWords
};

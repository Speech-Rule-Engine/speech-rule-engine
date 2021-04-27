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
 * @fileoverview Basic types and structurs for localised numbers.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

type NumberToString = (p1: number) => string;
export {NumberToString};
type NumberToGrammarString = (p1: number, p2: boolean) => string;
export {NumberToGrammarString};
type Numbers = {
  wordOrdinal?: NumberToString,
  simpleOrdinal?: NumberToString,
  numberToWords?: NumberToString,
  numberToOrdinal?: NumberToGrammarString, vulgarSep: string,
  numSep?: string
};
export {Numbers};


/**
 * A trivial translator of numbers into string.
 * @param num A number.
 * @return The number as a string.
 */
export function identityTransformer_(num: number): string {
  return num.toString();
}


/**
 * A trivial translator of numbers with plural.
 * @param num A number.
 * @param plural A flag indicating plural.
 * @return The number as a string.
 */
export function pluralTransformer_(num: number, plural: boolean): string {
  return num.toString();
}


export const NUMBERS: Numbers = {
  wordOrdinal: identityTransformer_,
  simpleOrdinal: identityTransformer_,
  numberToWords: identityTransformer_,
  numberToOrdinal: pluralTransformer_,
  vulgarSep: ' ',
  numSep: ' '
};

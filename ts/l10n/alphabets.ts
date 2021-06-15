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

import {NUMBERS} from './numbers';
import {identityTransformer, Transformer, Combiner} from './transformers';

export interface Alphabets {
  /**
   * Localisable alphabets.
   */
  latinSmall: string[];
  latinCap: string[];
  greekSmall: string[];
  greekCap: string[];


  /**
   * Prefixes for alphabet rules that can be specialised by rule set.
   */
  capPrefix: {[key: string]: string};
  smallPrefix: {[key: string]: string};
  digitPrefix: {[key: string]: string};
  languagePrefix?: {[key: string]: string};

  /**
   * Transformer functions for alphabet rules that can be specialised by rule
   * set.
   */
  digitTrans: {[key: string]: Transformer};
  letterTrans: {[key: string]: Transformer};

  /**
   * A default combiner for alphabet.
   * @param letter The letter.
   * @param font The font name.
   * @param cap Capitalisation expression.
   * @return The speech string as `letter`.
   */
  combiner: Combiner;

}


export function ALPHABETS(): Alphabets {
  return {
    latinSmall: [],
    latinCap: [],
    greekSmall: [],
    greekCap: [],
    capPrefix: {default: ''},
    smallPrefix: {default: ''},
    digitPrefix: {default: ''},
    languagePrefix: {},
    digitTrans: {
      default: NUMBERS.numberToWords,
      mathspeak: identityTransformer,
      clearspeak: identityTransformer},
    letterTrans: {default: identityTransformer},
    combiner: (letter: string, _font: string, _cap: string) => {
      return letter;
    }
  }
}

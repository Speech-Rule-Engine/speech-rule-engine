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

import * as tr from './transformers';

export interface Numbers {
  /**
   * The word for zero.
   */
  zero?: string;

  /**
   * String representation of one to nineteen (or higher).
   * The zero position is generally left empty.
   */
  ones?: string[];

  /**
   * String representation of twenty to ninety.
   */
  tens?: string[];

  /**
   * String representation of thousand to decillion.
   */
  large?: string[];

  /**
   * Other special representations that are loaded via locale.
   */
  special?: {[key: string]: string|string[]};
  
  // Constructor methods
  wordOrdinal?: tr.Transformer;
  simpleOrdinal: tr.Transformer;
  numberToWords: tr.Transformer;
  numberToOrdinal?: tr.GrammarCase;

  vulgarSep?: string;
  numSep?: string;
};


export const NUMBERS: Numbers = {
  zero: 'zero',
  ones: [],
  tens: [],
  large: [],
  special: {},

  wordOrdinal: tr.identityTransformer,
  simpleOrdinal: tr.identityTransformer,
  numberToWords: tr.identityTransformer,
  numberToOrdinal: tr.pluralTransformer,
  vulgarSep: ' ',
  numSep: ' '
};

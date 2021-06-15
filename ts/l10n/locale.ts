//
// Copyright 2017-21 Volker Sorge
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
 * @fileoverview Basic message file for l10n.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import {Alphabets, ALPHABETS} from './alphabets';
import {Messages, MESSAGES} from './messages';
import {Numbers, NUMBERS} from './numbers';
import * as tr from './transformers';


// One (or more) flat message object per rule set.
export interface Locale {
  MESSAGES: Messages;
  PLURAL: tr.Transformer;
  MS_FUNC: {[key: string]: Function};
  SI: tr.SiCombiner;
  ALPHABETS: Alphabets;
  NUMBERS: Numbers;
  COMBINERS?: {[key: string]: tr.Combiner};
}


export const LOCALE: Locale = {

  /**
   * Parsing functions.
   */
  MS_FUNC: {

    /**
     * Method to determine end of nesting depth for nested fraction.
     * @param node A node.
     * @return True if current element should not be considered for
     *     nesting depth.
     */
    FRAC_NEST_DEPTH: function(_node: Element): boolean {
      return false;
    },

    /**
     * Translation for count word nesting description of radicals.
     * @param count The counting parameter.
     * @return The corresponding string.
     */
    RADICAL_NEST_DEPTH: function(_count: number): string {
      return '';
    },

    /**
     * Generates a root ending message by combining the end message (postfix)
     * with the index. Example: Start Root Cubic ... End Root Cubic.
     *
     * @param postfix The postfix.
     * @param index The index.
     * @return The combined string, postfix plus index.
     */
    COMBINE_ROOT_INDEX: function(postfix: string, _index: string): string {
      return postfix;
    }
  },

  /**
   * Function to build regular plurals for units.
   * @param unit A unit expression.
   * @return The unit in plural.
   */
  PLURAL: (unit: string) => {
    return /.*s$/.test(unit) ? unit : unit + 's';
  },


  /**
   * The units combiner.
   */
  SI: tr.siCombiner,


  /** 
   * The messages content.
   */
  MESSAGES: MESSAGES(),

  /**
   * The Alphabets content.
   */
  ALPHABETS: ALPHABETS(),

  /**
   * Localisable number computation.
   */
  NUMBERS: NUMBERS,

  COMBINERS: {}
};

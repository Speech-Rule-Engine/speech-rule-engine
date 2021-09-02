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
 * @fileoverview Basic messages for localisation.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import * as LocaleUtil from './locale_util';
import * as tr from './transformers';

/**
 * General messages for Mathspek, fonts, etc.
 */
export interface Messages {
  // Mathspeak messages
  MS: {[msg: string]: string};
  // Mathspeak root message
  MSroots: {[msg: string]: string};
  font: {[msg: string]: string | [string, string]};
  embellish: {[msg: string]: string | [string, string]};
  role: {[msg: string]: string | [string, string]};
  enclose: {[msg: string]: string | [string, string]};
  navigate: {[msg: string]: string};
  regexp: {[msg: string]: string};
  unitTimes: string;
}

/**
 * @return A basic message structure.
 */
export function MESSAGES(): Messages {
  return {
    MS: {},
    MSroots: {},
    font: {},
    embellish: {},
    role: {},
    enclose: {},
    navigate: {},
    regexp: {},
    unitTimes: ''
  };
}


/**
 * Basic types and structurs for localised numbers.
 */
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
  wordOrdinal: tr.Transformer;
  simpleOrdinal: tr.Transformer;
  numberToWords: tr.Transformer;
  numberToOrdinal: tr.GrammarCase;

  vulgarSep: string;
  numSep: string;
}


export function NUMBERS(): Numbers {
  return {
    zero: 'zero',
    ones: [],
    tens: [],
    large: [],
    special: {},

    wordOrdinal: tr.identityTransformer,
    simpleOrdinal: tr.identityTransformer,
    numberToWords: tr.identityTransformer,
    numberToOrdinal: tr.pluralCase,
    vulgarSep: ' ',
    numSep: ' '
  };
}


/**
 *  Basic types and structurs for localising alphabts.
 */
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
  digitTrans: {[key: string]: tr.Transformer};
  letterTrans: {[key: string]: tr.Transformer};

  /**
   * A default combiner for alphabet.
   * @param letter The letter.
   * @param font The font name.
   * @param cap Capitalisation expression.
   * @return The speech string as `letter`.
   */
  combiner: tr.Combiner;

}


/**
 * @return A localisable alphabet structure
 */
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
      default: tr.identityTransformer,
      mathspeak: tr.identityTransformer,
      clearspeak: tr.identityTransformer},
    letterTrans: {default: tr.identityTransformer},
    combiner: (letter: string, _font: string, _cap: string) => {
      return letter;
    }
  };
}


/**
 * Fixed functions needed for generating localised messages.
 */
export interface Functions {
    /**
     * Method to determine end of nesting depth for nested fraction.
     * @param node A node.
     * @return True if current element should not be considered for
     *     nesting depth.
     */
  fracNestDepth: (node: Element) => boolean;

    /**
     * Translation for count word nesting description of radicals.
     * @param count The counting parameter.
     * @return The corresponding string.
     */
  radicalNestDepth: (count: number) => string;

    /**
     * Generates a root ending message by combining the end message (postfix)
     * with the index. Example: Start Root Cubic ... End Root Cubic.
     *
     * @param postfix The postfix.
     * @param index The index.
     * @return The combined string, postfix plus index.
     */
  combineRootIndex: (name: string, index: string) => string;

  combineNestedFraction: tr.Combiner;
  combineNestedRadical: tr.Combiner;
  fontRegexp: (font: string) => RegExp;

  /**
   * The units combiner.
   */
  si: tr.SiCombiner;

  /**
   * Function to build regular plurals for units.
   * @param unit A unit expression.
   * @return The unit in plural.
   */
  plural: tr.Transformer;
}


export function FUNCTIONS(): Functions {
  return {
    fracNestDepth: LocaleUtil.vulgarNestingDepth,
    radicalNestDepth: LocaleUtil.nestingToString,
    combineRootIndex: function(postfix: string, _index: string) {
      return postfix;
    },
    combineNestedFraction: tr.Combiners.identityCombiner,
    combineNestedRadical: tr.Combiners.identityCombiner,
    fontRegexp: function(font: string) {
      return new RegExp('^' + font.split(/ |-/).join('( |-)') + '( |-)');
    },
    si: tr.siCombiner,
    plural: tr.identityTransformer
  };
}

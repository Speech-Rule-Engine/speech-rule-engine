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

import {Transformer} from './locale';
import * as NumbersExports from './numbers';
import {Numbers} from './numbers';


// One (or more) flat message object per rule set.
export const MS: {[key: any]: string} = {
  START: '',
  FRAC_V: '',
  FRAC_B: '',
  FRAC_S: '',
  END: '',
  FRAC_OVER: '',
  TWICE: '',
  NEST_FRAC: '',
  ENDFRAC: '',
  SUPER: '',
  SUB: '',
  SUP: '',
  SUPERSCRIPT: '',
  SUBSCRIPT: '',
  BASELINE: '',
  BASE: '',
  NESTED: '',
  NEST_ROOT: '',
  STARTROOT: '',
  ENDROOT: '',
  ROOTINDEX: '',
  ROOT: '',
  INDEX: '',
  UNDER: '',
  UNDERSCRIPT: '',
  OVER: '',
  OVERSCRIPT: ''
};


/**
 * Parsing functions.
 */

export const MS_FUNC: {[key: any]: (p1: any) => any} = {
  /**
   * Method to determine end of nesting depth for nested fraction.
   * @param node A node.
   * @return True if current element should not be considered for
   *     nesting depth.
   */
  FRAC_NEST_DEPTH: function(node: Node): boolean {
    return false;
  },
  /**
   * Translation for count word nesting description of radicals.
   * @param count The counting parameter.
   * @return The corresponding string.
   */
  RADICAL_NEST_DEPTH: function(count: number): string {
    return '';
  },
  /**
   * Generates a root ending message by combining the end message (postfix) with
   * the index. Example: Start Root Cubic ... End Root Cubic.
   * @param postfix The postfix.
   * @param index The index.
   * @return The combined string, postfix plus index.
   */
  COMBINE_ROOT_INDEX: function(postfix: string, index: string): string {
    return postfix;
  }
};

// TODO: Add new functions.



/**
 * Localised font names.
 */
export const FONT: {[key: any]: SemanticAttr.Font|SemanticAttr.Font[]} = {
  'bold': '',
  'bold-fraktur': '',
  'bold-italic': '',
  'bold-script': '',
  'caligraphic': '',
  'caligraphic-bold': '',
  'double-struck': '',
  'double-struck-italic': '',
  'fraktur': '',
  'italic': '',
  'monospace': '',
  'normal': '',
  'oldstyle': '',
  'oldstyle-bold': '',
  'script': '',
  'sans-serif': '',
  'sans-serif-italic': '',
  'sans-serif-bold': '',
  'sans-serif-bold-italic': '',
  'unknown': ''
};


/**
 * Localised embalishment names. Treated like fonts.
 */
export const EMBELLISH: {[key: any]: string|string[]} = {
  // More embellishments than fonts.
  'super': '',
  'sub': '',
  'circled': '',
  'parenthesized': '',
  'period': '',
  'negative-circled': '',
  'double-circled': '',
  'circled-sans-serif': '',
  'negative-circled-sans-serif': '',
  'blackboard': '',
  'comma': '',
  'squared': '',
  'negative-squared': ''
};


/**
 * Localised role names.
 */
export const ROLE: {[key: any]: SemanticAttr.Role} = {
  // Infixoperators
  'addition': '',
  'multiplication': '',
  'subtraction': '',
  'division': '',
  // Relations.
  'equality': '',
  'inequality': '',
  'element': '',
  'arrow': '',
  // Roles of matrices or vectors.
  'determinant': '',
  'rowvector': '',
  'binomial': '',
  'squarematrix': '',
  // Sets
  'set empty': '',
  'set extended': '',
  'set singleton': '',
  'set collection': '',
  // Roles of rows, lines, cells.
  'label': '',
  'multiline': '',
  'matrix': '',
  'vector': '',
  'cases': '',
  'table': '',
  // Unknown
  'unknown': ''
};


/**
 * Localised enclose roles.
 */
export const ENCLOSE: {[key: any]: SemanticAttr.Role} = {
  'longdiv': '',
  'actuarial': '',
  'radical': '',
  'box': '',
  'roundedbox': '',
  'circle': '',
  'left': '',
  'right': '',
  'top': '',
  'bottom': '',
  'updiagonalstrike': '',
  'downdiagonalstrike': '',
  'verticalstrike': '',
  'horizontalstrike': '',
  'madruwb': '',
  'updiagonalarrow': '',
  'phasorangle': '',
  // Unknown
  'unknown': ''
};


/**
 * Navigation messages.
 */
export const NAVIGATE: {[key: any]: string} = {
  COLLAPSIBLE: '',
  EXPANDABLE: '',
  LEVEL: ''
};


/**
 * Regular expressions for text, digits, decimal marks, etc.
 */
export const REGEXP: {[key: any]: string} = {
  TEXT: 'a-zA-Z',
  NUMBER: '',
  DECIMAL_MARK: '',
  DIGIT_GROUP: '',
  JOINER_SUBSUPER: ' '
};


/**
 * Function to build regular plurals for units.
 * @param unit A unit expression.
 * @return The unit in plural.
 */
export function PLURAL(unit: string): string {
  return /.*s$/.test(unit) ? unit : unit + 's';
}


/**
 * The times expression between units, if used.
 */
export const UNIT_TIMES: string = '';


/**
 * Localisable number computation.
 */
export const NUMBERS: Numbers = NumbersExports.NUMBERS;


/**
 * Localisable alphabets.
 */
export const ALPHABETS: {[key: any]: string[]} = {
  latinSmall: [],
  latinCap: [],
  greekSmall: [],
  greekCap: []
};


/**
 * Prefixes for alphabet rules that can be specialised by rule set.
 */
export const ALPHABET_PREFIXES: {[key: any]: {[key: any]: string}} = {
  capPrefix: {default: ''},
  smallPrefix: {default: ''},
  digitPrefix: {default: ''}
};


/**
 * A trivial transformer.
 * @param input A number or string.
 * @return The input as a string.
 */
export function identityTransformer_(input: string|number): string {
  return input.toString();
}


/**
 * Transformer functions for alphabet rules that can be specialised by rule set.
 */
export const ALPHABET_TRANSFORMERS: {[key: any]: {[key: any]: Transformer}} = {
  digit: {default: identityTransformer_},
  letter: {default: identityTransformer_}
};


/**
 * A default combiner for alphabet.
 * @param letter The letter.
 * @param font The font name.
 * @param cap Capitalisation expression.
 * @return The speech string as `letter`.
 */
export function ALPHABET_COMBINER(
    letter: string, font: string, cap: string): string {
  return letter;
}

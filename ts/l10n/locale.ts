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
import {Numbers, NUMBERS} from './numbers';
import * as tr from './transformers';


// One (or more) flat message object per rule set.
export interface Locale {
  MS: {[key: string]: string};
  MS_FUNC: {[key: string]: Function};
  MS_ROOT_INDEX: {[key: string]: string};
  FONT: {[key: string]: string|[string, tr.Combiner]};
  EMBELLISH: {[key: string]: string|[string, tr.Combiner]};
  ROLE: {[key: string]: string|[string, tr.Combiner]};
  ENCLOSE: {[key: string]: string|[string, tr.Combiner]};
  NAVIGATE: {[key: string]: string};
  REGEXP: {[key: string]: string};
  PLURAL: tr.Transformer;
  SI: tr.SiCombiner;
  UNIT_TIMES: string;
  ALPHABETS: Alphabets;
  NUMBERS: Numbers;
}


export const LOCALE: Locale = {

  MS: {
    START: '',
    FRAC_V: '',
    FRAC_B: '',
    FRAC_S: '',
    END: '',
    FRAC_OVER: '',
    ONCE: '',
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
  },

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

  // TODO: Add new functions.
  MS_ROOT_INDEX: {},

  /**
   * Localised font names.
   */
  FONT: {
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
  },


  /**
   * Localised embalishment names. Treated like fonts.
   */
  EMBELLISH: {
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
  },


  /**
   * Localised role names.
   */
   ROLE: {
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
   },


  /**
   * Localised enclose roles.
   */
  ENCLOSE: {
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
  },


  /**
   * Navigation messages.
   */
  NAVIGATE: {
    COLLAPSIBLE: '',
    EXPANDABLE: '',
    LEVEL: ''
  },


  /**
   * Regular expressions for text, digits, decimal marks, etc.
   */
  REGEXP: {
    TEXT: 'a-zA-Z',
    NUMBER: '',
    DECIMAL_MARK: '',
    DIGIT_GROUP: '',
    JOINER_SUBSUPER: ' '
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
  SI: tr.SiCombiners.siCombiner,


  /**
   * The times expression between units, if used.
   */
  UNIT_TIMES: '',


  /**
   * The Alphabets content.
   */
  ALPHABETS: ALPHABETS(),

  /**
   * Localisable number computation.
   */
  NUMBERS: NUMBERS

};

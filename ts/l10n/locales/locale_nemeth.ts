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
 * @fileoverview Nemeth message file.
 *     (This should eventually move from being a locale!)
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

//
// This work was sponsored by BTAA (Big Ten Academic Alliance).
//

import {ALPHABETS} from '../alphabets';
import {Locale} from '../locale';
import NUMBERS from '../numbers/numbers_nemeth';
import * as tr from '../transformers';


/**
 * Removes English indicator from a simple letter.
 * @param letter The letter with indicator.
 * @return The cleaned letter if it was English without font.
 */
let simpleEnglish = function(letter: string): string {
  return letter.match(
             RegExp('^' + nemeth.ALPHABETS.languagePrefix.english)) ?
      letter.slice(1) :
      letter;
};


// Note that the cap here is a number indicator as caps are already included in
// the alphabets. All we need to do is remove the English indicator in case
// there is no font indicator. For the parenthesised fonts we don't need number
// indicator either.
let postfixCombiner = function(letter: string, font: string, _number: string) {
  letter = simpleEnglish(letter);
  return font ? letter + font : letter;
};


let germanCombiner = function(letter: string, font: string, _cap: string) {
  return font + simpleEnglish(letter);
};


let embellishCombiner = function(letter: string, font: string, num: string) {
  letter = simpleEnglish(letter);
  return font + (num ? num : '') + letter + '⠻';
};


let doubleEmbellishCombiner = function(
  letter: string, font: string, num: string) {
  letter = simpleEnglish(letter);
  return font + (num ? num : '') + letter + '⠻⠻';
};


// Font is the start parenthesis.
// Number is the number indicator which is ignored.
// English characters have language indicator removed.
let parensCombiner = function(letter: string, font: string, _number: string) {
  letter = simpleEnglish(letter);
  return font + letter + '⠾';
};


export const nemeth: Locale = {
  MS: {
    FRACTION_REPEAT: '⠠',
    FRACTION_START: '⠹',
    FRAC_V: '⠹',
    FRAC_B: 'Frac',
    FRAC_S: 'Frac',
    END: '⠠',
    FRACTION_OVER: '⠌',
    TWICE: 'Twice',
    NEST_FRAC: 'Nest',
    ENDFRAC: '⠼',
    FRACTION_END: '⠼',
    SUPER: '⠘',
    SUB: '⠰',
    SUP: '⠘',
    SUPERSCRIPT: '⠘',
    SUBSCRIPT: '⠰',
    BASELINE: '⠐',
    BASE: '⠐',
    NESTED: '⠨',
    NEST_ROOT: 'Nest',
    STARTROOT: '⠜',
    ENDROOT: '⠻',
    ROOTINDEX: '⠣',
    ROOT: '⠨',
    INDEX: '⠣',
    UNDER: '⠩',
    UNDERSCRIPT: '⠩',
    OVER: '⠣',
    OVERSCRIPT: '⠣'
  },

  MS_FUNC: {
    FRAC_NEST_DEPTH: function(_node: string) {
      return false;
    },
    RADICAL_NEST_DEPTH: function(_count: string) {
      return '';
    },
    COMBINE_ROOT_INDEX: function(postfix: string, _index: string) {
      return postfix;
    },
    FONT_REGEXP: function(font: string) {
      return RegExp('^' + font);
    }
  },


  MS_ROOT_INDEX: {},
  FONT: {
    // TODO: Some font translations:
    // Caligraphic: Currently translated as script. Caligraphic bold as script
    //              bold (vs. bold-script)
    // Double Struck: Currently translated as bold. Double-struck italic is
    //                therefore the same as bold italic.
    // Oldstyle and Monospace: Currently ignored.
    // Normal: is currently just empty.
    'bold': '⠸',
    'bold-fraktur': ['⠸⠀⠸', germanCombiner],
    'bold-italic': '⠸⠨',
    'bold-script': '⠸⠈',
    'caligraphic': '⠈',
    'caligraphic-bold': '⠈⠸',
    'double-struck': '⠈',
    'double-struck-italic': '⠸⠨',
    'fraktur': ['⠸', germanCombiner],
    'fullwidth': '',
    'italic': '⠨',
    'monospace': '',
    'normal': '',
    'oldstyle': '',
    'oldstyle-bold': '⠸',
    'script': '⠈',
    'sans-serif': '⠠⠨',
    'sans-serif-italic': '⠠⠨⠨',
    'sans-serif-bold': '⠠⠨⠸',
    'sans-serif-bold-italic': '⠠⠨⠸⠨',
    'unknown': ''
  },

  EMBELLISH: {
    // Embellishments
    // TODO: Here we need specialist combiners!
    'super': ['⠘', germanCombiner],
    'sub': ['⠰', germanCombiner],
    'circled': ['⠫⠉⠸⠫', embellishCombiner],
    'parenthesized': ['⠷', parensCombiner],
    'period': ['⠸⠲', postfixCombiner],
    'negative-circled': ['⠫⠸⠉⠸⠫', embellishCombiner],
    'double-circled': ['⠫⠉⠸⠫⠫⠉⠸⠫', doubleEmbellishCombiner],
    'circled-sans-serif': ['⠫⠉⠸⠫⠠⠨', embellishCombiner],
    'negative-circled-sans-serif': ['⠫⠸⠉⠸⠫⠠⠨', embellishCombiner],
    'comma': ['⠠', postfixCombiner],
    'squared': ['⠫⠲⠸⠫', embellishCombiner],
    'negative-squared': ['⠫⠸⠲⠸⠫', embellishCombiner]
  },

  ROLE: {
    // Infixoperators
    'addition': 'addition',
    'multiplication': 'multiplication',
    'subtraction': 'subtraction',
    'division': 'division',
    // Relations.
    'equality': 'equality',
    'inequality': 'inequality',
    'element': 'element',
    'arrow': 'arrow',
    // Roles of matrices or vectors.
    'determinant': 'determinant',
    'rowvector': 'row vector',
    'binomial': 'binomial',
    'squarematrix': 'square matrix',
    // Roles of rows, lines, cells.
    'multiline': 'multiple lines',
    'matrix': 'matrix',
    'vector': 'vector',
    'cases': 'case statement',
    'table': 'table',
    // Unknown
    'unknown': 'unknown'
  },


  ENCLOSE: {
    'longdiv': 'long division',
    'actuarial': 'actuarial symbol',
    'radical': 'square root',
    'box': '⠗',
    'roundedbox': 'rounded box',
    'circle': '⠉',
    'left': 'left vertical-line',
    'right': 'right vertical-line',
    'top': 'overbar',
    'bottom': 'underbar',
    'updiagonalstrike': 'crossout',
    'downdiagonalstrike': 'crossout',
    'verticalstrike': 'vertical strikeout',
    'horizontalstrike': 'crossout',
    'madruwb': 'Arabic factorial symbol',
    'updiagonalarrow': 'diagonal arrow',
    'phasorangle': '⠪',
    // Unknown
    'unknown': 'long division'
  },

  REGEXP: {
    TEXT: 'a-zA-Z',
    NUMBER: '((\\d{1,3})(?=(,| ))((,| )\\d{3})*(\\.\\d+)?)|^\\d*\\.\\d+|^\\d+',
    DECIMAL_MARK: '.',
    DIGIT_GROUP: ',',
    JOINER_SUBSUPER: '',
    JOINER_FRAC: ''
  },

  NAVIGATE:
      {COLLAPSIBLE: 'collapsible', EXPANDABLE: 'expandable', LEVEL: 'Level'},

  PLURAL: tr.identityTransformer,
  SI: tr.identityTransformer,
  UNIT_TIMES: '',

  NUMBERS: NUMBERS,
  ALPHABETS: ALPHABETS()
};

nemeth.ALPHABETS.combiner = function(
  letter: string, font: string, num: string) {
  return font ? font + num + letter : simpleEnglish(letter);
};
nemeth.ALPHABETS.digitTrans = {default: NUMBERS.numberToWords};

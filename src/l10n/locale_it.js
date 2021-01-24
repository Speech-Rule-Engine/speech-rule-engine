// Copyright 2017 Volker Sorge
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

//
// This work was sponsored by TextHelp
//

/**
 * @fileoverview Italian message file.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */
goog.provide('sre.Locale.it');

goog.require('sre.Locale');
goog.require('sre.Numbers.it');


/**
 * @type {sre.Locale.Messages}
 */
sre.Locale.it = {

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
    // SUB: '', // Short
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

  MS_FUNC: {
    FRAC_NEST_DEPTH: function(node) { return false; },
    RADICAL_NEST_DEPTH: sre.Locale.nestingToString,
    COMBINE_ROOT_INDEX: sre.Locale.combinePostfixIndex,
    COMBINE_NESTED_FRACTION: function(a, b, c) {
      return c.replace(/ $/g, '') + b + a;},
    COMBINE_NESTED_RADICAL: function(a, b, c) {return c + ' ' + a;},
    FONT_REGEXP: function(font) {return RegExp(' (en |)' + font + '$');}
  },


  MS_ROOT_INDEX: {
    '2': '',
    '3': ''
  },

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
    'fullwidth': '',
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


  EMBELLISH: {
    // Embellishments
    // TODO: Here we need specialist combiners!
    'super': ['', sre.Locale.prefixCombiner],
    'sub': ['', sre.Locale.prefixCombiner],
    'circled': '',
    'parenthesized': '',
    'period': '',
    'negative-circled': '',
    'double-circled': '',
    'circled-sans-serif': '',
    'negative-circled-sans-serif': '',
    'comma': '',
    'squared': '',
    'negative-squared': ''
  },

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


  NAVIGATE: {
    COLLAPSIBLE: '',
    EXPANDABLE: '',
    LEVEL: ''
  },

  REGEXP: {
    TEXT: 'a-zA-ZàâæçéèêëîïôœùûüÿÀÂÆÇÉÈÊËÎÏÔŒÙÛÜŸ',
    NUMBER: '((\\d{1,3})(?=( ))(( )\\d{3})*(,\\d+)?)|^\\d*,\\d+|^\\d+',
    DECIMAL_MARK: ',',
    DIGIT_GROUP: '',
    JOINER_SUBSUPER: '-',
    JOINER_FRAC: ' '
  },

  // TODO: These!
  PLURAL_UNIT: {
    'foot': '',
    'inch': ''
  },

  SI: function(prefix, unit) {
    return prefix + unit;
  },

  NUMBERS: sre.Numbers.it.NUMBERS,

  ALPHABETS: {
    latinSmall: [
      'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
      'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
    ],
    latinCap: [
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
      'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
    ],
    greekSmall: [
      'nabla',  // This is here as it is small.
      'alpha', 'bêta', 'gamma', 'delta', 'epsilon', 'zêta', 'êta', 'thêta',
      'iota', 'kappa', 'lambda', 'mû', 'nû', 'xi', 'omicron', 'pi', 'rhô',
      'sigma final', 'sigma', 'tau', 'upsilon', 'phi', 'chi', 'psi', 'oméga',
      // Symbols below
      'dérivée partielle', 'epsilon', 'thêta', 'kappa', 'phi', 'rhô', 'pi'
    ],
    greekCap: [
      'Alpha', 'Bêta', 'Gamma', 'Delta', 'Epsilon', 'Zêta', 'Êta', 'Thêta',
      'Iota', 'Kappa', 'Lambda', 'Mû', 'Nû', 'Xi', 'Omicron', 'Pi', 'Rhô',
      'Thêta', // Theta symbol
      'Sigma', 'Tau', 'Upsilon', 'Phi', 'Chi', 'Psi', 'Oméga'
    ]
  },

  ALPHABET_TRANSFORMERS: {
    digit: {
      default: function(n) {
        return n === 0 ? 'zero' : sre.Numbers.it.numberToWords(n);},
      mathspeak: function(n) {return n.toString();},
      clearspeak: function(n) {return n.toString();}},
    letter: {
      default: function(n) {return n;}
    }
  },

  ALPHABET_PREFIXES: {
    capPrefix: {default: 'maiuscola'},
    smallPrefix: {default: ''},
    digitPrefix: {default: ''}
  },

  ALPHABET_COMBINER: function(letter, font, cap) {
    letter = cap ? letter + ' ' + cap : letter;
    return font ? letter + ' ' + font : letter;
  }

};

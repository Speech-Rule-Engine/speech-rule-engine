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
 * @fileoverview English message file.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */


import {Grammar} from '../rule_engine/grammar';
import * as Locale from './locale';
import {Messages} from './messages';
import NUMBERS from './numbers_en';
import * as tr from './transformers';


export const en: Messages = {
  MS: {
    START: 'Start',
    FRAC_V: 'Fraction',
    FRAC_B: 'Frac',
    FRAC_S: 'Frac',
    END: 'End',
    FRAC_OVER: 'Over',
    TWICE: 'Twice',
    NEST_FRAC: 'Nest',
    ENDFRAC: 'EndFrac',
    SUPER: 'Super',
    SUB: 'Sub',
    SUP: 'Sup',
    SUPERSCRIPT: 'Superscript',
    SUBSCRIPT: 'Subscript',
    BASELINE: 'Baseline',
    BASE: 'Base',
    NESTED: 'Nested',
    NEST_ROOT: 'Nest',
    STARTROOT: 'StartRoot',
    ENDROOT: 'EndRoot',
    ROOTINDEX: 'RootIndex',
    ROOT: 'Root',
    INDEX: 'Index',
    UNDER: 'Under',
    UNDERSCRIPT: 'Underscript',
    OVER: 'Over',
    OVERSCRIPT: 'Overscript'
  },

  MS_FUNC: {
    FRAC_NEST_DEPTH: Locale.vulgarNestingDepth,
    RADICAL_NEST_DEPTH: Locale.nestingToString,
    COMBINE_ROOT_INDEX: function(postfix: string, _index: string) {
      return postfix;
    },
    COMBINE_NESTED_FRACTION: function(a: string, b: string, c: string) {
      return a + b + c;
    },
    COMBINE_NESTED_RADICAL: function(a: string, b: string, c: string) {
      return a + b + c;
    },
    FONT_REGEXP: function(font: string) {
      return new RegExp('^' + font.split(/ |-/).join('( |-)') + '( |-)');
    }
  },

  MS_ROOT_INDEX: {},

  FONT: {
    'bold': 'bold',
    'bold-fraktur': 'bold fraktur',
    'bold-italic': 'bold italic',
    'bold-script': 'bold script',
    'caligraphic': 'calligraphic',
    'caligraphic-bold': 'calligraphic bold',
    'double-struck': 'double struck',
    'double-struck-italic': 'double struck italic',
    'fraktur': 'fraktur',
    'fullwidth': 'fullwidth',
    'italic': 'italic',
    'monospace': 'monospace',
    'normal': 'normal',
    'oldstyle': 'oldstyle',
    'oldstyle-bold': 'oldstyle bold',
    'script': 'script',
    'sans-serif': 'sans serif',
    'sans-serif-italic': 'sans serif italic',
    'sans-serif-bold': 'sans serif bold',
    'sans-serif-bold-italic': 'sans serif bold italic',
    'unknown': 'unknown'
  },

  EMBELLISH: {
    // Embellishments
    // TODO: Here we need specialist combiners!
    'super': 'super',
    'sub': 'sub',
    'circled': 'circled',
    'parenthesized': 'parenthesized',
    'period': ['period', tr.postfixCombiner],
    'negative-circled': 'black circled',
    'double-circled': 'double circled',
    'circled-sans-serif': 'circled sans serif',
    'negative-circled-sans-serif': 'black circled sans serif',
    'comma': ['comma', tr.postfixCombiner],
    'squared': 'squared',
    'negative-squared': 'black squared'
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
    'box': 'box',
    'roundedbox': 'rounded box',
    'circle': 'circle',
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
    'phasorangle': 'phasor angle',
    // Unknown
    'unknown': 'long division'
  },

  NAVIGATE:
      {COLLAPSIBLE: 'collapsible', EXPANDABLE: 'expandable', LEVEL: 'Level'},

  REGEXP: {
    TEXT: 'a-zA-Z',
    NUMBER: '((\\d{1,3})(?=(,| ))((,| )\\d{3})*(\\.\\d+)?)|^\\d*\\.\\d+|^\\d+',
    DECIMAL_MARK: '\\.',
    DIGIT_GROUP: ',',
    JOINER_SUBSUPER: ' ',
    JOINER_FRAC: ''
  },

  SI: function(prefix: string, unit: string) {
    let abbr: {[key: string]: string} = {
      'megaohm': 'megohm',
      'kiloohm': 'kilohm'
    };
    let si = prefix + unit;
    return abbr[si] || si;
  },

  UNIT_TIMES: '',

  PLURAL: function(unit: string) {
    return /.*s$/.test(unit) ? unit : unit + 's';
  },


  NUMBERS: NUMBERS,
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
      'alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta',
      'iota', 'kappa', 'lamda', 'mu', 'nu', 'xi', 'omicron', 'pi', 'rho',
      'final sigma', 'sigma', 'tau', 'upsilon', 'phi', 'chi', 'psi', 'omega',
      // Symbols below
      'partial differential', 'epsilon', 'theta', 'kappa', 'phi', 'rho', 'pi'
    ],
    greekCap: [
      'Alpha',   'Beta', 'Gamma',   'Delta', 'Epsilon', 'Zeta', 'Eta',
      'Theta',   'Iota', 'Kappa',   'Lamda', 'Mu',      'Nu',   'Xi',
      'Omicron', 'Pi',   'Rho',
      'Theta',  // Theta symbol
      'Sigma',   'Tau',  'Upsilon', 'Phi',   'Chi',     'Psi',  'Omega'
    ]
  },

  ALPHABET_TRANSFORMERS: {
    digit: {
      default: NUMBERS.numberToWords,
      mathspeak: function(n) {
        return n.toString();
      },
      clearspeak: function(n) {
        return n.toString();
      }
    },
    letter: {
      default: function(n) {
        return n.toString();
      }
    }
  },

  ALPHABET_PREFIXES: {
    capPrefix: {default: 'cap', mathspeak: 'upper'},
    smallPrefix: {default: ''},
    digitPrefix: {default: ''}
  },

  ALPHABET_COMBINER: tr.prefixCombiner
};


Grammar.getInstance().setCorrection('noarticle', (name: string) => {
  return Grammar.getInstance().getParameter('noArticle') ? '' : name;
});

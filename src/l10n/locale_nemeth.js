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


/**
 * @fileoverview Nemeth message file.
 *     (This should eventually move from being a locale!)
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */
goog.provide('sre.Locale.nemeth');

goog.require('sre.Locale');


/**
 * @type {sre.Locale.Messages}
 */
sre.Locale.nemeth = {

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
    FRAC_NEST_DEPTH: sre.Locale.vulgarNestingDepth,
    RADICAL_NEST_DEPTH: function(count) { return ''; },
    COMBINE_ROOT_INDEX: function(postfix, index) {return postfix;},
    FONT_REGEXP: function(font) {return RegExp('^' + font);}
  },

  MS_ROOT_INDEX: { },

  FONT: {
    // TODO: Some font translations:
    //
    // Caligraphic: Currently translated as script. Caligraphic bold as script
    //              bold (vs. bold-script)
    //
    // Double Struck: Currently translated as bold. Double-struck italic is
    //                therefore the same as bold italic.
    //
    // Oldstyle and Monospace: Currently ignored.
    // Normal: is currently just empty.
    'bold': '⠸',
    'bold-fraktur': '⠸⠀⠸',
    'bold-italic': '⠸⠨',
    'bold-script': '⠸⠈',
    'caligraphic': '⠈',
    'caligraphic-bold': '⠈⠸',
    'double-struck': '⠸',
    'double-struck-italic': '⠸⠨',
    'fraktur': '⠸',
    'italic': '⠨',
    'monospace': '',
    'normal': ' ',
    'oldstyle': '',
    'oldstyle-bold': '⠸',
    'script': '⠈',
    'sans-serif': '⠠⠨',
    'sans-serif-italic': '⠠⠨⠨',
    'sans-serif-bold': '⠠⠨⠸',
    'sans-serif-bold-italic': '⠠⠨⠸⠨',
    'unknown': ''
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

  REGEXP: {
    TEXT: 'a-zA-Z',
    NUMBER: '((\\d{1,3})(?=(,| ))((,| )\\d{3})*(\\.\\d+)?)|^\\d*\\.\\d+|^\\d+',
    DECIMAL_MARK: '.',
    DIGIT_GROUP: ',',
    JOINER_SUBSUPER: '',
    JOINER_FRAC: ''
  },

  NAVIGATE: {
    COLLAPSIBLE: 'collapsible',
    EXPANDABLE: 'expandable',
    LEVEL: 'Level'
  },

  NUMBERS: {
    // TODO: We should not need this!
    simpleOrdinal: function(x) {return x;}
  }
};

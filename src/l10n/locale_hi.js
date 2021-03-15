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
 * @fileoverview English message file.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */
goog.provide('sre.Locale.hi');

goog.require('sre.Locale');
goog.require('sre.Numbers.hi');


/**
 * @type {sre.Locale.Messages}
 */
sre.Locale.hi = {

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
    FRAC_NEST_DEPTH: sre.Locale.vulgarNestingDepth,
    RADICAL_NEST_DEPTH: sre.Locale.nestingToString,
    COMBINE_ROOT_INDEX: function(postfix, index) {return postfix;},
    COMBINE_NESTED_FRACTION: function(a, b, c) {return a + b + c;},
    COMBINE_NESTED_RADICAL: function(a, b, c) {return a + b + c;},
    FONT_REGEXP: function(font) {
      return new RegExp('^' + font.split(/ |-/).join('( |-)') + '( |-)');
    }
  },


  MS_ROOT_INDEX: { },

  FONT: {
    'bold': 'बोल्ड',
    'bold-fraktur': 'बोल्ड फ़्रेक्टुर',
    'bold-italic': 'बोल्ड इटैलिक',
    'bold-script': 'बोल्ड स्क्रिप्ट',
    'caligraphic': '',
    'caligraphic-bold': '',
    'double-struck': 'डबल-स्ट्रक',
    'double-struck-italic': 'डबल-स्ट्रक इटैलिक',
    'fraktur': 'फ़्राक्टुर',
    'fullwidth': 'पूर्णता',
    'italic': 'इटैलिक',
    'monospace': 'मोनोपेस',
    'normal': 'सामान्य',
    'oldstyle': '',
    'oldstyle-bold': '',
    'script': 'लिपि',
    'sans-serif': 'संस-सेरिफ़',
    'sans-serif-italic': 'संस-सेरिफ़ बोल्ड',
    'sans-serif-bold': 'सैंस-सेरिफ़ इटैलिक',
    'sans-serif-bold-italic': 'संस-सेरिफ़ बोल्ड इटैलिक',
    'unknown': ''
  },

  EMBELLISH: {
    // Embellishments
    // TODO: Here we need specialist combiners!
    'super': 'सुपरस्क्रिप्ट',
    'sub': 'सबस्क्रिप्ट',
    'circled': 'सर्किल',
    'parenthesized': 'कोष्ठक',
    'period': ['पूर्ण विराम', sre.Locale.postfixCombiner],
    'negative-circled': 'नेगेटिव सर्किल',
    'double-circled': 'डबल सर्किल',
    'circled-sans-serif': 'सर्किल सैंस-सेरिफ़',
    'negative-circled-sans-serif': 'नेगेटिव सर्किल सैंस-सेरिफ़',
    'comma': ['अल्प विराम', sre.Locale.postfixCombiner],
    'squared': 'चुकता',
    'negative-squared': 'नकारात्मक वर्ग'
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

  NAVIGATE: {
    COLLAPSIBLE: 'collapsible',
    EXPANDABLE: 'expandable',
    LEVEL: 'Level'
  },

  REGEXP: {
    TEXT: 'a-zA-Z',
    NUMBER: '((\\d{1,3})(?=(,| ))((,| )\\d{3})*(\\.\\d+)?)|^\\d*\\.\\d+|^\\d+',
    DECIMAL_MARK: '\\.',
    DIGIT_GROUP: ',',
    JOINER_SUBSUPER: ' ',
    JOINER_FRAC: ''
  },

  SI: function(prefix, unit) {
    return prefix + unit;
  },

  PLURAL: function(unit) {
    return unit;
  },

  NUMBERS: sre.Numbers.hi.NUMBERS,

  ALPHABETS: {
    latinSmall: [
      'ए', 'बी', 'सी', 'डी', 'ई', 'एफ', 'जी', 'एच', 'आय', 'जे', 'के', 'एल',
      'एम', 'एन', 'ओ', 'पी', 'क्यू', 'आर', 'एस', 'टी', 'यू', 'वी', 'डब्ल्यू', 'एक्स',
      'वाई', 'जेड'
    ],
    latinCap: [
      'ए', 'बी', 'सी', 'डी', 'ई', 'एफ', 'जी', 'एच', 'आय', 'जे', 'के', 'एल',
      'एम', 'एन', 'ओ', 'पी', 'क्यू', 'आर', 'एस', 'टी', 'यू', 'वी', 'डब्ल्यू', 'एक्स',
      'वाई', 'जेड'
    ],
    greekSmall: [
      'नाबला', 'आल्फा', 'बीटा', 'गामा', 'डेल्टा', 'एप्सिलॉन', 'ज़ेटा', 'एटा', 'थीटा',
      'आयोटा', 'कप्पा', 'लैम्ब्डा', 'मु', 'नू', 'ग्जाए', 'ओमिक्रॉन', 'पाइ', 'रो',
      'अंतिम सिग्मा ', 'सिग्मा', 'टाउ', 'अपसिलं', 'फाई', 'काई', 'साई', 'ओमेगा',
      'आंशिक अवकलन', 'ल्यूनेट एप्सिलॉन ', 'थीटा ', 'कप्पा ', 'फाई', 'रो ', 'पोमेगा'
      // ,nabla',  // This is here as it is small.
      // 'alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta',
      // 'iota', 'kappa', 'lamda', 'mu', 'nu', 'xi', 'omicron', 'pi', 'rho',
      // 'final sigma', 'sigma', 'tau', 'upsilon', 'phi', 'chi', 'psi', 'omega',
      // // Symbols below
      // 'partial differential', 'epsilon', 'theta', 'kappa', 'phi', 'rho', 'pi'
    ],
    greekCap: [
      'आल्फा', 'बीटा', 'गामा', 'डेल्टा', 'एप्सिलॉन', 'ज़ेटा', 'एटा', 'थीटा',
      'आयोटा', 'कप्पा', 'लैम्ब्डा', 'मु', 'नू', 'ग्जाए', 'ओमिक्रॉन', 'पाइ', 'रो',
      'थीटा',
      'सिग्मा', 'टाउ', 'अपसिलं', 'फाई', 'काई', 'साई', 'ओमेगा'
      // 'Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta',
      // 'Iota', 'Kappa', 'Lamda', 'Mu', 'Nu', 'Xi', 'Omicron', 'Pi', 'Rho',
      // 'Theta', // Theta symbol
      // 'Sigma', 'Tau', 'Upsilon', 'Phi', 'Chi', 'Psi', 'Omega'
    ]
  },

  ALPHABET_TRANSFORMERS: {
    digit: {
      default: function(n) {
        return n === 0 ? 'शून्य' : sre.Numbers.hi.numberToWords(n);},
      mathspeak: function(n) {return n.toString();},
      clearspeak: function(n) {return n.toString();}},
    letter: {
      default: function(n) {return n;}
    }
  },

  ALPHABET_PREFIXES: {
    capPrefix: {default: 'कैपिटल'},
    smallPrefix: {default: ''},
    digitPrefix: {default: ''}
  },

  ALPHABET_COMBINER: sre.Locale.prefixCombiner

};

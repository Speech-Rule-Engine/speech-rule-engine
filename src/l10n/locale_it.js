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
    START: 'Inizio',
    FRAC_V: 'Frazione',
    FRAC_B: 'Frazione',
    FRAC_S: 'Frazione',
    END: 'Fine',
    FRAC_OVER: 'fratto',
    ONCE: 'Una volta',
    TWICE: 'Due volte',
    NEST_FRAC: 'Annidamento',
    ENDFRAC: 'Fine Frazione',
    SUPER: 'Super',
    SUB: 'Sub',
    SUP: 'Sup',
    SUPERSCRIPT: 'Apice',
    SUBSCRIPT: 'Pedice',
    BASELINE: 'Linea di base',
    BASE: 'Base',
    NESTED: 'Annidato',
    NEST_ROOT: 'Annidamento',
    STARTROOT: 'Inizio Radice',
    ENDROOT: 'Fine Radice',
    ROOTINDEX: 'Indice Radice',
    ROOT: 'Radice',
    INDEX: 'Indice Radice',
    UNDER: 'Sotto',
    UNDERSCRIPT: 'Sottoscritto',
    OVER: 'Sopra',
    OVERSCRIPT: 'Soprascritto'
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
    'bold': 'grassetto',
    'bold-fraktur': 'grassetto gotico',
    'bold-italic': 'grassetto italico',
    'bold-script': 'grassetto script',
    'caligraphic': 'calligrafico',
    'caligraphic-bold': 'grassetto calligrafico',
    'double-struck': 'grassetto da lavagna',
    'double-struck-italic': 'grassetto da lavagna italico',
    'fraktur': 'gotico',
    'fullwidth': 'fullwidth',
    'italic': 'italico',
    'monospace': 'monospazio',
    'normal': 'normale',
    'oldstyle': 'vecchio stile',
    'oldstyle-bold': 'vecchio stile grassetto',
    'script': 'script',
    'sans-serif': 'senza grazie',   // Sans serif could just be sans serif
    'sans-serif-italic': 'senza grazie italico',
    'sans-serif-bold': 'senza grazie grassetto',
    'sans-serif-bold-italic': 'senza grazie grassetto italico',
    'unknown': 'sconosciuto'
  },


  EMBELLISH: {
    // Embellishments
    // TODO: Here we need specialist combiners!
    'super': ['apice', sre.Locale.prefixCombiner],
    'sub': ['pedice', sre.Locale.prefixCombiner],
    'circled': 'cerchiato',
    'parenthesized': 'tra parentesi',
    'period': 'punto',
    'negative-circled': 'cerchiato in negativo',
    'double-circled': 'doppio cerchiato',
    'circled-sans-serif': 'cerchiato senza grazie',
    'negative-circled-sans-serif': 'cerchiato in negativo senza grazie',
    'comma': 'virgola',
    'squared': 'dentro quadrato',
    'negative-squared': 'dentro quadrato in negativo'
  },

  ROLE: {
    // Infixoperators
    'addition': 'addizione',
    'multiplication': 'moltiplicazione',
    'subtraction': 'sottrazione',
    'division': 'divisione',
    // Relations.
    'equality': 'uguaglianza',
    'inequality': 'disuguaglianza',
    'element': 'elemento',
    'arrow': 'freccia',
    // Roles of matrices or vectors.
    'determinant': 'determinante',
    'rowvector': 'vettore riga',
    'binomial': 'binomiale',
    'squarematrix': 'matrice quadrata',
    // Sets
    'set empty': 'insieme vuoto',
    'set extended': 'estensione di insieme',
    'set singleton': 'singoletto',
    'set collection': 'collezione',
    // Roles of rows, lines, cells.
    'label': 'eitchetta',
    'multiline': 'linee multiple',
    'matrix': 'matrice',
    'vector': 'vettore',
    'cases': 'comando switch',
    'table': 'tavola',
    // Unknown
    'unknown': 'sconosciuto'
  },


  ENCLOSE: {
    'longdiv': 'divisione lunga',
    'actuarial': 'simbolo attuario',
    'radical': 'radice quadrata',
    'box': 'riquadro',
    'roundedbox': 'riquadro arrotondato',
    'circle': 'cerchio',
    'left': 'linea verticale sinistra',
    'right': 'linea verticale destra',
    'top': 'barra sopra',
    'bottom': 'barra sotto',
    'updiagonalstrike': 'cancellatura',
    'downdiagonalstrike': 'cancellatura',
    'verticalstrike': 'cancellatura verticale',
    'horizontalstrike': 'cancellatura',
    'madruwb': 'simbolo fattoriale arabo',
    'updiagonalarrow': 'freccia diagonale',
    'phasorangle': 'angolo fasore',
    // Unknown
    'unknown': 'divisione lunga'
  },


  NAVIGATE: {
    COLLAPSIBLE: 'collassabile',
    EXPANDABLE: 'espandibile',
    LEVEL: 'livello'
  },

  REGEXP: {
    TEXT: 'a-zA-ZàâæçéèêëîïôœùûüÿÀÂÆÇÉÈÊËÎÏÔŒÙÛÜŸ',
    NUMBER: '((\\d{1,3})(?=(.| ))((.| )\\d{3})*(\\,\\d+)?)|^\\d*\\,\\d+|^\\d+',
    DECIMAL_MARK: ',',
    DIGIT_GROUP: '\\.',
    JOINER_SUBSUPER: ' ',
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
      'nabla',  // This is here as it is small. pi greco is 3.14 o/w pi greca.
      'alfa', 'beta', 'gamma', 'delta', 'epsilon', 'zeta greca', 'eta', 'theta',
      'iota', 'kappa greca', 'lambda', 'mu', 'nu', 'xi', 'omicron', 'pi greco', 'rho',
      'sigma final', 'sigma', 'tau', 'upsilon', 'phi', 'chi', 'psi', 'omega',
      // Symbols below
      'derivata parziale', 'epsilon', 'theta', 'kappa', 'phi', 'rho', 'pi'
    ],
    greekCap: [
      'Alfa', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta greca', 'Eta', 'Theta',
      'Iota', 'Kappa greca', 'Lambda', 'Mu', 'Nu', 'Xi', 'Omicron', 'Pi greca', 'Rho',
      'Theta', // Theta symbol
      'Sigma', 'Tau', 'Upsilon', 'Phi', 'Chi', 'Psi', 'Omega'
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
    smallPrefix: {default: ''}, // minuscolo
    digitPrefix: {default: ''}
  },

  ALPHABET_COMBINER: function(letter, font, cap) {
    letter = cap ? letter + ' ' + cap : letter;
    return font ? letter + ' ' + font : letter;
  }

};

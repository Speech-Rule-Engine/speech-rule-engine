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
 * @fileoverview Italian message file.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

//
// This work was sponsored by TextHelp
//


import {combinePostfixIndex, nestingToString} from './locale';
import {Messages} from './messages';
import NUMBERS from './numbers_it';
import {prefixCombiner} from './transformers';


let italianPostfixCombiner = function(
  letter: string, font: string, cap: string) {
  if (letter.match(/^[a-zA-Z]$/)) {
    font = font.replace('cerchiato', 'cerchiata');
  }
  letter = cap ? letter + ' ' + cap : letter;
  return font ? letter + ' ' + font : letter;
};


export const it: Messages = {
  MS: {
    START: 'inizio',
    FRAC_V: 'frazione',
    FRAC_B: 'frazione',
    FRAC_S: 'frazione',
    END: 'fine',
    FRAC_OVER: 'fratto',
    ONCE: 'una volta',
    TWICE: 'due volte',
    NEST_FRAC: 'annidamento',
    ENDFRAC: 'fine frazione',
    SUPER: 'super',
    SUB: 'sub',
    SUP: 'sup',
    SUPERSCRIPT: 'apice',
    SUBSCRIPT: 'pedice',
    BASELINE: 'linea di base',
    BASE: 'base',
    NESTED: 'annidato',
    NEST_ROOT: 'annidamento',
    STARTROOT: 'inizio radice',
    ENDROOT: 'fine radice',
    ROOTINDEX: 'indice radice',
    ROOT: 'radice',
    INDEX: 'indice Radice',
    UNDER: 'sotto',
    UNDERSCRIPT: 'sottoscritto',
    OVER: 'sopra',
    OVERSCRIPT: 'soprascritto'
  },

  MS_FUNC: {
    FRAC_NEST_DEPTH: function(_node: string) {
      return false;
    },
    RADICAL_NEST_DEPTH: nestingToString,
    COMBINE_ROOT_INDEX: combinePostfixIndex,
    COMBINE_NESTED_FRACTION: function(a: string, b: string, c: string) {
      return c.replace(/ $/g, '') + b + a;
    },
    COMBINE_NESTED_RADICAL: function(a: string, _b: string, c: string) {
      return c + ' ' + a;
    },
    FONT_REGEXP: function(font: string) {
      return RegExp(' (en |)' + font + '$');
    }
  },


  MS_ROOT_INDEX: {2: '', 3: ''},

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
    'sans-serif': 'senza grazie',  // Sans serif could just be sans serif
    'sans-serif-italic': 'senza grazie italico',
    'sans-serif-bold': 'senza grazie grassetto',
    'sans-serif-bold-italic': 'senza grazie grassetto italico',
    'unknown': 'sconosciuto'
  },


  EMBELLISH: {
    // Embellishments
    'super': ['apice', prefixCombiner],
    'sub': ['pedice', prefixCombiner],
    'circled': ['cerchiato', italianPostfixCombiner],
    'parenthesized': 'tra parentesi',
    'period': 'punto',
    'negative-circled': ['cerchiato in negativo', italianPostfixCombiner],
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
    TEXT: 'a-zA-ZàèìòùéóÀ',
    NUMBER: '((\\d{1,3})(?=(.| ))((.| )\\d{3})*(\\,\\d+)?)|^\\d*\\,\\d+|^\\d+',
    DECIMAL_MARK: ',',
    DIGIT_GROUP: '\\.',
    JOINER_SUBSUPER: ' ',
    JOINER_FRAC: ' '
  },

  PLURAL: function(unit: string) {
    // TODO: Make as programmatical as possible!
    return unit;
  },

  UNIT_TIMES: '',

  SI: function(prefix, unit) {
    return prefix + unit;
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
      'nabla',  // This is here as it is small. pi greco is 3.14 o/w pi greca.
      'alfa', 'beta', 'gamma', 'delta', 'epsilon', 'zeta greca', 'eta', 'theta',
      'iota', 'kappa greca', 'lambda', 'mu', 'nu', 'xi', 'omicron', 'pi greco',
      'rho', 'sigma final', 'sigma', 'tau', 'upsilon', 'phi', 'chi', 'psi',
      'omega',
      // Symbols below
      'derivata parziale', 'epsilon', 'theta', 'kappa', 'phi', 'rho', 'pi'
    ],
    greekCap: [
      'Alfa',  'Beta',  'Gamma',   'Delta',       'Epsilon', 'Zeta greca',
      'Eta',   'Theta', 'Iota',    'Kappa greca', 'Lambda',  'Mu',
      'Nu',    'Xi',    'Omicron', 'Pi greca',    'Rho',
      'Theta',  // Theta symbol
      'Sigma', 'Tau',   'Upsilon', 'Phi',         'Chi',     'Psi',
      'Omega'
    ]
  },

  ALPHABET_TRANSFORMERS: {
    digit: {
      default: function(n) {
        return n === 0 ? 'zero' : NUMBERS.numberToWords(n);
      },
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
    capPrefix: {default: 'maiuscola'},
    smallPrefix: {default: ''},  // minuscolo
    digitPrefix: {default: ''}
  },

  ALPHABET_COMBINER: function(letter: string, font: string, cap: string) {
    letter = cap ? letter + ' ' + cap : letter;
    return font ? letter + ' ' + font : letter;
  }
};

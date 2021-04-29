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
 * @fileoverview German message file.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

//
// This work was sponsored by ETH Zurich
//

import {Grammar} from '../rule_engine/grammar';
import {localFont, vulgarNestingDepth} from './locale';
import {Messages} from './messages';
import NUMBERS from './numbers_de';


let germanPrefixCombiner = function(letter: string, font: string, cap: string) {
  if (cap === 's') {
    font = font.split(' ')
               .map(function(x) {
                 return x.replace(/s$/, '');
               })
               .join(' ');
    cap = '';
  }
  letter = cap ? cap + ' ' + letter : letter;
  return font ? font + ' ' + letter : letter;
};


let germanPostfixCombiner = function(
  letter: string, font: string, cap: string) {
  letter = !cap || cap === 's' ? letter : cap + ' ' + letter;
  return font ? letter + ' ' + font : letter;
};


export const de: Messages = {
  MS: {
    START: 'Anfang',
    FRAC_V: 'Bruch',
    FRAC_B: 'Bruch',
    FRAC_S: 'Bruch',
    END: 'Ende',
    FRAC_OVER: 'durch',
    TWICE: 'Twice',  // TODO: Do we need this?
    NEST_FRAC: 'geschachtelt',
    ENDFRAC: 'Ende Bruch',
    SUPER: 'hoch',
    SUB: 'Index',  // TODO: Maybe Index should be 'tief'?
    SUP: 'hoch',
    SUPERSCRIPT: 'hoch',
    SUBSCRIPT: 'Index',
    BASELINE: 'Grundlinie',
    BASE: 'Grund',
    NESTED: 'geschachtelte',
    NEST_ROOT: 'geschachtelte',
    STARTROOT: 'Anfang Wurzel',
    ENDROOT: 'Ende Wurzel',
    ROOTINDEX: 'Wurzelexponent',
    ROOT: 'Wurzel',
    INDEX: 'Exponent',
    UNDER: 'Unter',
    UNDERSCRIPT: 'Unterschrift',
    OVER: 'Über',
    OVERSCRIPT: 'Überschrift'
  },

  MS_FUNC: {
    FRAC_NEST_DEPTH: vulgarNestingDepth,
    RADICAL_NEST_DEPTH: function(x: number) {
      return x > 1 ? de.NUMBERS.numberToWords(x) + 'fach' : '';
    },
    COMBINE_ROOT_INDEX: function(postfix: string, index: string) {
      let root = index ? index + 'wurzel' : '';
      return postfix.replace('Wurzel', root);
    },
    COMBINE_NESTED_FRACTION: function(a: string, b: string, c: string) {
      return a + b + c;
    },
    COMBINE_NESTED_RADICAL: function(a: string, b: string, c: string) {
      a = c.match(/exponent$/) ? a + 'r' : a;
      let count = (b ? b + ' ' : '') + a;
      return c.match(/ /) ? c.replace(/ /, ' ' + count + ' ') : count + ' ' + c;
    },
    FONT_REGEXP: function(font: string) {
      font = font.split(' ')
                 .map(function(x) {
                   return x.replace(/s$/, '(|s)');
                 })
                 .join(' ');
      return new RegExp('((^' + font + ' )|( ' + font + '$))');
    }
  },


  MS_ROOT_INDEX: {2: 'Quadrat', 3: 'Kubik'},

  // TODO: Grammar of numbers vs digits! Currently grammar is wrt. letters.
  FONT: {
    'bold': 'fettes',
    'bold-fraktur': 'fettes Fraktur',
    'bold-italic': 'fettkursives',
    'bold-script': 'fettes Schreibschrift',
    'caligraphic': 'kalligrafisches',
    'caligraphic-bold': 'fettes kalligrafisches',
    'double-struck': ['mit Doppelstrich', germanPostfixCombiner],
    'double-struck-italic': ['kursiv mit Doppelstrich', germanPostfixCombiner],
    'fraktur': 'Fraktur',
    'fullwidth': 'vollbreites',
    'italic': 'kursives',
    'monospace': 'nichtproportionales',
    'normal': 'normales',
    'oldstyle': 'antiquiertes',
    'oldstyle-bold': 'antiquiertes fettes',
    'script': 'Schreibschrift',
    'sans-serif': 'serifenloses',
    'sans-serif-italic': 'serifenloses kursives',
    'sans-serif-bold': 'serifenloses fettes',
    'sans-serif-bold-italic': 'serifenloses fettkursives',
    'unknown': 'unbekannt'
  },

  EMBELLISH: {
    // Embellishments
    // TODO: Grammar of numbers vs digits!
    'super': 'hoch',
    'sub': 'Index',
    'circled': 'eingekreistes',
    'parenthesized': 'eingeklammertes',
    'period': ['Punkt', germanPostfixCombiner],
    'negative-circled': 'schwarz eingekreistes',
    'double-circled': 'doppelt eingekreistes',
    'circled-sans-serif': 'eingekreistes serifenloses',
    'negative-circled-sans-serif': 'schwarz eingekreistes serifenloses',
    'comma': ['Komma', germanPostfixCombiner],
    'squared': 'umrahmtes',
    'negative-squared': 'schwarz umrahmtes'
  },

  ROLE: {
    // Infixoperators
    'addition': 'Addition',
    'multiplication': 'Multiplikation',
    'subtraction': 'Subtraktion',
    'division': 'Division',
    // Relations.
    'equality': 'Gleichung',
    'inequality': 'Ungleichung',
    'element': 'Element',
    'arrow': 'Pfeil',
    // Roles of matrices or vectors.
    'determinant': 'Determinante',
    'rowvector': 'Zeilenvektor',
    'binomial': 'Binomialkoeffizient',
    'squarematrix': 'quadratische Matrize',
    // Roles of rows, lines, cells.
    'multiline': 'mehrzeiligem Ausdruck',
    'matrix': 'Matrize',
    'vector': 'Vektor',
    'cases': 'Fallunterscheidung',
    'table': 'Tabelle',
    // Unknown
    'unknown': 'unbekannt'
  },


  ENCLOSE: {
    'longdiv': 'langer Bruchstrich',
    'actuarial': 'Bilanzsumme',
    'radical': 'Quadratwurzel',
    'box': 'rechteckige Umrandung',
    'roundedbox': 'abgerundete rechteckige Umrandung',
    'circle': 'kreisähnliche Umrandung',
    'left': 'senkrechte Linie links',
    'right': 'senkrechte Linie rechts',
    'top': 'waagerechte Linie oberhalb',
    'bottom': 'waagerechte Linie unterhalb',
    'updiagonalstrike': 'durchgestrichen',
    'downdiagonalstrike': 'durchgestrichen',
    'verticalstrike': 'senkrecht durchgestrichen',
    'horizontalstrike': 'durchgestrichen',
    'madruwb': 'arabisches Fakultätssymbol',
    'updiagonalarrow': 'Pfeil von links unten nach rechts oben',
    'phasorangle': 'phasor angle',
    // Unknown
    'unknown': 'langer Bruchstrich'
  },

  NAVIGATE:
      {COLLAPSIBLE: 'kollabierbar', EXPANDABLE: 'ausfaltbar', LEVEL: 'Niveau'},

  REGEXP: {
    TEXT: 'a-zA-ZäöüÄÖÜß',
    NUMBER: '((\\d{1,3})(?=(.| ))((.| )\\d{3})*(\\,\\d+)?)|^\\d*\\,\\d+|^\\d+',
    DECIMAL_MARK: ',',
    DIGIT_GROUP: '\\.',
    JOINER_SUBSUPER: ' ',
    JOINER_FRAC: ' '
  },

  SI: function(prefix: string, unit: string) {
    return prefix + unit.toLowerCase();
  },

  UNIT_TIMES: '',

  PLURAL: function(unit: string) {
    return unit;
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
      'iota', 'kappa', 'lambda', 'my', 'ny', 'xi', 'omikron', 'pi', 'rho',
      'abschließendes sigma', 'sigma', 'tau', 'ypsilon', 'phi', 'chi', 'psi',
      'omega',
      // Symbols below
      'partielle Ableitung', 'epsilon', 'theta', 'kappa', 'phi', 'rho', 'pi'
    ],
    greekCap: [
      'Alpha',   'Beta', 'Gamma',   'Delta',  'Epsilon', 'Zeta', 'Eta',
      'Theta',   'Iota', 'Kappa',   'Lambda', 'My',      'Ny',   'Xi',
      'Omikron', 'Pi',   'Rho',
      'Theta',  // Theta symbol
      'Sigma',   'Tau',  'Ypsilon', 'Phi',    'Chi',     'Psi',  'Omega'
    ]
  },

  ALPHABET_TRANSFORMERS: {
    digit: {
      default: function(n: number) {
        return n === 0 ? 'null' : de.NUMBERS.numberToWords(n);
      },
      mathspeak: function(n: number) {
        return n.toString();
      },
      clearspeak: function(n: number) {
        return n.toString();
      }
    },
    letter: {
      default: function(n: number) {
        return n.toString();
      }
    }
  },

  ALPHABET_PREFIXES: {
    capPrefix: {default: 'großes'},
    smallPrefix: {default: ''},
    digitPrefix: {default: 's'}
  },

  ALPHABET_COMBINER: germanPrefixCombiner
};


Grammar.getInstance().setCorrection(
  'correctOne', (num: string) => num.replace(/^eins$/, 'ein'));

Grammar.getInstance().setCorrection('localFontNumber', (font: string) => {
  let realFont = localFont(font);
  return realFont.split(' ')
      .map(function(x) {
        return x.replace(/s$/, '');
      })
      .join(' ');
});

Grammar.getInstance().setCorrection(
  'lowercase', (name: string) => name.toLowerCase());

Grammar.getInstance().setCorrection('article', (name: string) => {
  let decl = Grammar.getInstance().getParameter('case');
  if (decl === 'dative') {
    return {'der': 'dem', 'die': 'der', 'das': 'dem'}[name];
  }
  return name;
});

Grammar.getInstance().setCorrection('masculine', (name: string) => {
  let decl = Grammar.getInstance().getParameter('case');
  if (decl === 'dative') {
    return name + 'n';
  }
  return name;
});

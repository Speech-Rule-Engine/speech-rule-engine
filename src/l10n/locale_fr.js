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
goog.provide('sre.Locale.fr');

goog.require('sre.Locale');
goog.require('sre.Numbers.fr');


/**
 * @type {sre.Locale.Messages}
 */
sre.Locale.fr = {

  MS: {
    START: 'début',
    FRAC_V: 'fraction',
    FRAC_B: 'frac',
    FRAC_S: 'frac',
    END: 'fin',
    FRAC_OVER: 'sur',
    ONCE: '1',
    TWICE: '2',
    NEST_FRAC: 'imbriquée',
    ENDFRAC: 'fin frac',
    SUPER: 'sup',
    SUB: 'sub',
    // SUB: 'inf-', // Short
    SUP: 'sup',
    SUPERSCRIPT: 'exposant',
    SUBSCRIPT: 'indice',
    BASELINE: 'position de base',
    BASE: 'position de base',
    NESTED: 'imbriquée',
    NEST_ROOT: 'imbriquée',
    STARTROOT: 'début racine',
    ENDROOT: 'fin racine',
    ROOTINDEX: 'indice du radical',
    ROOT: 'racine',
    INDEX: 'indice',
    UNDER: 'sous',
    UNDERSCRIPT: 'souscript',
    OVER: 'sus',
    OVERSCRIPT: 'suscript'
  },

  MS_FUNC: {
    FRAC_NEST_DEPTH: function(node) { return false; },
    RADICAL_NEST_DEPTH: sre.Locale.nestingToString,
    COMBINE_ROOT_INDEX: sre.Locale.combinePostfixIndex,
    COMBINE_NESTED_FRACTION: function(a, b, c) {return c.replace(/ $/g, '') + b + a;},
    COMBINE_NESTED_RADICAL: function(a, b, c) {return c + ' ' + a;},
    FONT_REGEXP: function(font) {return RegExp(' (en |)' + font + '$');}
  },


  MS_ROOT_INDEX: {
    '2': 'carrée',
    '3': 'cubique'
  },

  FONT: {
    'bold': 'en gras',
    'bold-fraktur': 'en gothique gras',
    'bold-italic': 'en italique gras',
    'bold-script': 'de ronde en gras',
    'caligraphic': 'en calligraphique',
    'caligraphic-bold': 'en calligraphique gras',
    'double-struck': 'ajouré',
    'double-struck-italic': 'ajouré en italique',
    'fraktur': 'en gothique',
    'fullwidth': 'en pleine largeur',
    'italic': 'en italique',
    'monospace': 'en chasse fixe',
    'normal': 'en normal',
    'oldstyle': 'en ancien',
    'oldstyle-bold': 'en ancien gras',
    'script': 'de ronde',
    'sans-serif': 'sans empattement',
    'sans-serif-italic': 'en italique sans empattement',
    'sans-serif-bold': 'en gras sans empattement',
    'sans-serif-bold-italic': 'en italique gras sans empattement',
    'unknown': 'inconnu'
  },


  EMBELLISH: {
    // Embellishments
    // TODO: Here we need specialist combiners!
    'super': ['exposant', sre.Locale.prefixCombiner],
    'sub': ['indice', sre.Locale.prefixCombiner],
    'circled': 'encerclé',
    'parenthesized': 'entre parenthèses',
    'period': 'un point',
    'negative-circled': 'encerclé noir',
    'double-circled': 'encerclé double',
    'circled-sans-serif': 'sans empattement encerclé',
    'negative-circled-sans-serif': 'sans empattement encerclé noir',
    'comma': 'virgule',
    'squared': 'encadré',
    'negative-squared': 'encadré inverse'
  },

  ROLE: {
    // Infixoperators
    'addition': 'addition',
    'multiplication': 'multiplication',
    'subtraction': 'soustraction',
    'division': 'division',
    // Relations.
    'equality': 'égalité',
    'inequality': 'inégalité',
    'element': 'élément',
    'arrow': 'flèche',
    // Roles of matrices or vectors.
    'determinant': 'déterminant',
    'rowvector': 'vecteur-rangée',
    'binomial': 'binomial',
    'squarematrix': 'matrice carrée',
    // Sets
    'set empty': 'ensemble vide',
    'set extended': 'extension',
    'set singleton': 'singleton',
    'set collection': 'collection',
    // Roles of rows, lines, cells.
    'label': 'étiquette',
    'multiline': 'multi-ligne',
    'matrix': 'matrice',
    'vector': 'vecteur',
    'cases': 'déclaration de cas',
    'table': 'tableau',
    // Unknown
    'unknown': 'inconnu'
  },


  ENCLOSE: {
    'longdiv': 'longue division',
    'actuarial': 'notation actuarielle',
    'radical': 'radical',
    'box': 'boîte',
    'roundedbox': 'boîte arrondie',
    'circle': 'cercle',
    'left': 'barre verticale gauche',
    'right': 'barre verticale droite',
    'top': 'trait suscrit',
    'bottom': 'trait souscrit',
    'updiagonalstrike': 'texte biffé diagonal montant',
    'downdiagonalstrike': 'texte biffé diagonal descendant',
    'verticalstrike': 'texte biffé vertical',
    'horizontalstrike': 'texte biffé horizontal',
    'madruwb': 'symbole factorielle arabe',
    'updiagonalarrow': 'flèche diagonale montante',
    'phasorangle': 'angle de phase',
    // Unknown
    'unknown': 'division longue'
  },


  NAVIGATE: {
    COLLAPSIBLE: 'compressible',
    EXPANDABLE: 'décompressible',
    LEVEL: 'niveau'
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
    'foot': 'feet',
    'inch': 'inches'
  },

  NUMBERS: sre.Numbers.fr.NUMBERS,

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
        return n === 0 ? 'zero' : sre.Numbers.fr.numberToWords(n);},
      mathspeak: function(n) {return n.toString();},
      clearspeak: function(n) {return n.toString();}},
    letter: {
      default: function(n) {return n;}
    }
  },

  ALPHABET_PREFIXES: {
    capPrefix: {default: 'majuscule'},
    smallPrefix: {default: ''},
    digitPrefix: {default: ''}
  },

  ALPHABET_COMBINER: function(letter, font, cap) {
    letter = cap ? letter + ' ' + cap : letter;
    return font ? letter + ' ' + font : letter;
  }

};

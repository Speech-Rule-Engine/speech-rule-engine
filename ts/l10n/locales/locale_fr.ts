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
 * @fileoverview French message file.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

//
// This work was sponsored by TextHelp
//

import {combinePostfixIndex, nestingToString} from '../locale_util';
import {Locale} from '../locale';
import {ALPHABETS} from '../alphabets';
import NUMBERS from '../numbers/numbers_fr';
import {Combiners, SiCombiners} from '../transformers';


export const fr: Locale = {
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


  MS_ROOT_INDEX: {2: 'carrée', 3: 'cubique'},

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
    'super': ['exposant', Combiners.prefixCombiner],
    'sub': ['indice', Combiners.prefixCombiner],
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

  SI: SiCombiners.siCombiner,

  UNIT_TIMES: '',

  PLURAL: function(unit: string) {
    return /.*s$/.test(unit) ? unit : unit + 's';
  },


  NUMBERS: NUMBERS,
  ALPHABETS: ALPHABETS()

};

fr.ALPHABETS.combiner = function(letter, font, cap) {
  letter = cap ? letter + ' ' + cap : letter;
  return font ? letter + ' ' + font : letter;
};


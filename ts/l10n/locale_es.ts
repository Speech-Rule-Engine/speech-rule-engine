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
 * @fileoverview Spanish message file.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

//
// This work was sponsored by TextHelp
//

import {combinePostfixIndex} from './locale';
import {ALPHABETS} from './alphabets';
import {Messages} from './messages';
import NUMBERS from './numbers/numbers_es';
import {postfixCombiner, prefixCombiner} from './transformers';


let sansserifCombiner = function(letter: string, font: string, cap: string) {
  letter = 'sans serif ' + (cap ? cap + ' ' + letter : letter);
  return font ? letter + ' ' + font : letter;
};


export const es: Messages = {
  MS: {
    START: 'empezar',
    FRAC_V: 'fracción',
    FRAC_B: 'frac',
    FRAC_S: 'frac',
    // TODO (localize): Could be problematic with space separators. Might need
    // to trim.
    END: 'finalizar',
    FRAC_OVER: 'entre',
    TWICE: '',
    NEST_FRAC: '',
    ENDFRAC: '',
    SUPER: 'super',
    SUB: 'sub',
    SUP: 'sup',
    SUPERSCRIPT: 'superíndice',
    SUBSCRIPT: 'subíndice',
    BASELINE: 'línea base',
    BASE: 'base',
    NESTED: '',
    NEST_ROOT: '',
    STARTROOT: 'empezar raíz',
    ENDROOT: 'finalizar raíz',
    ROOTINDEX: 'índice de raíz',
    ROOT: 'raíz',
    INDEX: '',
    UNDER: 'bajo',
    UNDERSCRIPT: 'bajoíndice',
    OVER: 'sobre',
    OVERSCRIPT: 'sobreíndice'
  },

  MS_FUNC: {
    FRAC_NEST_DEPTH: function(_node: string) {
      return false;
    },
    RADICAL_NEST_DEPTH: function(_count: string) {
      return '';
    },
    COMBINE_ROOT_INDEX: combinePostfixIndex,
    COMBINE_NESTED_FRACTION: function(a: string, b: string, c: string) {
      return a + b + c;
    },
    COMBINE_NESTED_RADICAL: function(a: string, _b: string, c: string) {
      return a + c;
    },
    FONT_REGEXP: function(font: string) {
      return RegExp('^' + font + ' ');
    }
  },

  //  That is female ending!
  MS_ROOT_INDEX: {
    2: 'cuadrada',
    3: 'cúbica',
    4: 'a la cuarta',
    5: 'a la quinta',
    6: 'a la sexta',
    7: 'a la séptima',
    8: 'a la octava',
    9: 'a la novena',
    10: 'a la décima'
  },

  FONT: {
    'bold': 'negrita',
    'bold-fraktur': 'negrita Fraktur',
    'bold-italic': 'negrita cursiva',
    'bold-script': 'negrita script',
    'caligraphic': 'caligráfica',
    'caligraphic-bold': 'caligráfica negrita',
    'double-struck': 'negrita de pizarra',
    'double-struck-italic': 'negrita de pizarra cursiva',
    'fraktur': 'Fraktur',
    'fullwidth': 'ancho completo',
    'italic': 'cursiva',
    'monospace': 'monoespacio',
    'normal': 'normal',
    'oldstyle': 'estilo antiguo',
    'oldstyle-bold': 'estilo antiguo negrita',
    'script': 'script',
    'sans-serif': 'sans serif',
    'sans-serif-italic': 'sans serif cursiva',
    'sans-serif-bold': 'sans serif negrita',
    'sans-serif-bold-italic': 'sans serif negrita cursiva',
    'unknown': 'desconocida'
  },

  ROLE: {
    // Infixoperators
    'addition': 'adición',
    'multiplication': 'multiplicación',
    'subtraction': 'resta',
    'division': 'división',
    // Relations.
    'equality': 'igualdad',
    'inequality': 'desigualdad',
    'element': 'elemento',
    'arrow': 'flecha',
    // Roles of matrices or vectors.
    'determinant': 'determinante',
    'rowvector': 'fila vector',
    'binomial': 'binomial',
    'squarematrix': 'matriz cuadrada',
    // Roles of rows, lines, cells.
    'multiline': 'líneas múltiples',
    'matrix': 'matriz',
    'vector': 'vector',
    'cases': 'declaración de caso',
    'table': 'mesa',
    // Unknown
    'unknown': 'desconocida'
  },


  ENCLOSE: {
    'longdiv': 'división larga',
    'actuarial': 'símbolo actuarial',
    'radical': 'raíz cuadrada',
    'box': 'caja',
    'roundedbox': 'caja redondeada',
    'circle': 'círculo',
    'left': 'barra vertical izquierda',
    'right': 'barra vertical derecha',
    'top': 'barra',
    'bottom': 'subbarra',
    'updiagonalstrike': 'tachadura',
    'downdiagonalstrike': 'tachadura',
    'verticalstrike': 'ponchado vertical',
    'horizontalstrike': 'cruce',
    'madruwb': 'símbolo factorial árabe',
    'updiagonalarrow': 'flecha diagonal',
    'phasorangle': 'ángulo de fasores',
    // Unknown
    'unknown': 'división larga'
  },

  EMBELLISH: {
    // Embellishments
    // TODO: Here we need specialist combiners!
    'super': 'superíndice',
    'sub': 'subíndice',
    'circled': ['en circulo', postfixCombiner],
    'parenthesized': ['entre paréntesis', postfixCombiner],
    'period': ['punto', postfixCombiner],
    'negative-circled': ['en circulo negro', postfixCombiner],
    'double-circled': ['en doble circulo', postfixCombiner],
    'circled-sans-serif': ['en circulo', sansserifCombiner],
    'negative-circled-sans-serif': ['en circulo negro', sansserifCombiner],
    'comma': ['coma', postfixCombiner],
    'squared': ['en cuadrado', postfixCombiner],
    'negative-squared': ['en cuadrado negro', postfixCombiner]
  },

  NAVIGATE: {COLLAPSIBLE: 'plegable', EXPANDABLE: 'ampliable', LEVEL: 'nivel'},

  REGEXP: {
    TEXT: 'a-zA-ZáéíóúñÁÉÍÓÚÑ',
    NUMBER: '((\\d{1,3})(?=( ))(( )\\d{3})*(,\\d+)?)|^\\d*,\\d+|^\\d+',
    DECIMAL_MARK: ',',
    DIGIT_GROUP: '',
    JOINER_SUBSUPER: ' ',
    JOINER_FRAC: ' '
  },

  PLURAL: function(unit: string) {
    if (/.*(a|e|i|o|u)$/.test(unit)) {
      return unit + 's';
    }
    if (/.*z$/.test(unit)) {
      return unit.slice(0, -1) + 'ces';
    }
    if (/.*c$/.test(unit)) {
      return unit.slice(0, -1) + 'ques';
    }
    if (/.*g$/.test(unit)) {
      return unit + 'ues';
    }
    if (/.*\u00f3n$/.test(unit)) {
      return unit.slice(0, -2) + 'ones';
    }
    return unit + 'es';
  },

  SI: function(prefix: string, unit: string) {
    if (unit.match(/^metro/)) {
      prefix = prefix.replace(/a$/, 'á').replace(/o$/, 'ó').replace(/i$/, 'í');
    }
    return prefix + unit;
  },


  UNIT_TIMES: 'por',

  NUMBERS: NUMBERS,
  ALPHABETS: ALPHABETS()
};

es.ALPHABETS.combiner = prefixCombiner;

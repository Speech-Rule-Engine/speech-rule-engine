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

//
// This work was sponsored by TextHelp
//

/**
 * @fileoverview Spanish message file.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */
goog.provide('sre.Locale.es');

goog.require('sre.Locale');
goog.require('sre.Numbers.es');


var sansserifCombiner = function(letter, font, cap) {
  letter = 'sans serif ' + (cap ? cap + ' ' + letter : letter);
  return font ? letter + ' ' + font : letter;
};


/**
 * @type {sre.Locale.Messages}
 */
sre.Locale.es = {

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
    FRAC_NEST_DEPTH: function(node) { return false; },
    RADICAL_NEST_DEPTH: function(count) { return ''; },
    COMBINE_ROOT_INDEX: sre.Locale.combinePostfixIndex,
    COMBINE_NESTED_FRACTION: function(a, b, c) {return a + b + c;},
    COMBINE_NESTED_RADICAL: function(a, b, c) {return a + c;},
    FONT_REGEXP: function(font) {return RegExp('^' + font + ' ');}
  },

  //  That is female ending!
  MS_ROOT_INDEX: {
    '2': 'cuadrada',
    '3': 'cúbica',
    '4': 'a la cuarta',
    '5': 'a la quinta',
    '6': 'a la sexta',
    '7': 'a la séptima',
    '8': 'a la octava',
    '9': 'a la novena',
    '10': 'a la décima'
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
    'circled': ['en circulo', sre.Locale.postfixCombiner],
    'parenthesized': ['entre paréntesis', sre.Locale.postfixCombiner],
    'period': ['punto', sre.Locale.postfixCombiner],
    'negative-circled': ['en circulo negro', sre.Locale.postfixCombiner],
    'double-circled': ['en doble circulo', sre.Locale.postfixCombiner],
    'circled-sans-serif': ['en circulo', sansserifCombiner],
    'negative-circled-sans-serif': ['en circulo negro', sansserifCombiner],
    'comma': ['coma', sre.Locale.postfixCombiner],
    'squared': ['en cuadrado', sre.Locale.postfixCombiner],
    'negative-squared': ['en cuadrado negro', sre.Locale.postfixCombiner]
  },

  NAVIGATE: {
    COLLAPSIBLE: 'plegable',
    EXPANDABLE: 'ampliable',
    LEVEL: 'nivel'
  },

  REGEXP: {
    TEXT: 'a-zA-ZáéíóúñÁÉÍÓÚÑ',
    NUMBER: '((\\d{1,3})(?=( ))(( )\\d{3})*(,\\d+)?)|^\\d*,\\d+|^\\d+',
    DECIMAL_MARK: ',',
    DIGIT_GROUP: '',
    JOINER_SUBSUPER: ' ',
    JOINER_FRAC: ' '
  },

  PLURAL: function(unit) {
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
    if (/.*ón$/.test(unit)) {
      return unit.slice(0, -2) + 'ones';
    }
    return unit + 'es';
  },

  SI: function(prefix, unit) {
    if (unit.match(/^metro/)) {
      prefix = prefix.replace(/a$/, 'á').replace(/o$/, 'ó').replace(/i$/, 'í');
    }
    return prefix + unit;
  },

  NUMBERS: sre.Numbers.es.NUMBERS,

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
      'alfa', 'beta', 'gamma', 'delta', 'épsilon', 'zeta', 'eta', 'theta',
      'iota', 'kappa', 'lambda', 'mi', 'ni', 'xi', 'ómicron', 'pi', 'rho',
      'sigma final', 'sigma', 'tau', 'ípsilon', 'phi', 'ji', 'psi', 'omega',
      // Symbols below
      'diferencial parcial', 'épsilon', 'theta', 'kappa', 'phi', 'rho', 'pi'
    ],
    greekCap: [
      'Alfa', 'Beta', 'Gamma', 'Delta', 'Épsilon', 'Zeta', 'Eta', 'Theta',
      'Iota', 'Kappa', 'Lambda', 'Mi', 'Ni', 'Xi', 'Ómicron', 'Pi', 'Rho',
      'Theta', // Theta symbol
      'Sigma', 'Tau', 'Ípsilon', 'Phi', 'Ji', 'Psi', 'Omega'
    ]
  },

  ALPHABET_TRANSFORMERS: {
    digit: {
      default: function(n) {
        return n === 0 ? 'cero' : sre.Numbers.es.numberToWords(n);},
      mathspeak: function(n) {return n.toString();},
      clearspeak: function(n) {return n.toString();}},
    letter: {
      default: function(n) {return n;}
    }
  },

  ALPHABET_PREFIXES: {
    capPrefix: {default: 'mayúscula'},
    smallPrefix: {default: ''},
    digitPrefix: {default: ''}
  },

  ALPHABET_COMBINER: sre.Locale.prefixCombiner,

  UNIT_TIMES: 'por'

};

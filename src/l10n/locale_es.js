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
 * @fileoverview Spanish message file.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */
goog.provide('sre.Locale.es');

goog.require('sre.Locale');


sre.Locale.es = {};

sre.Locale.es.MS = {
  START: 'empezar ',
  FRAC_V: 'fracción',
  FRAC_B: '',
  FRAC_S: '',
  END: 'finalizar ',
  FRAC_OVER: 'entre ', // Could be problematic with space separators. Might need
                      // to trim.
  TWICE: '',
  NEST_FRAC: '',
  ENDFRAC: '',
  SUPER: 'super',
  SUB: 'sub',
  SUP: 'sup',
  SUPERSCRIPT: 'superíndice',
  SUBSCRIPT: 'subíndice',
  BASELINE: 'línea base',
  BASE: '',
  NESTED: '',
  NEST_ROOT: '',
  STARTROOT: 'empezar raíz',
  ENDROOT: 'finalizar raíz',
  ROOTINDEX: 'índice de raíz',
  ROOT: 'raíz',
  INDEX: '',
  UNDER: '',
  UNDERSCRIPT: 'bajoíndice',
  OVER: '',
  OVERSCRIPT: 'sobreíndice'
};


sre.Locale.es.MS_FUNC = {
  FRAC_NEST_DEPTH: function(node) { return false; },
  RADICAL_NEST_DEPTH: function(count) { return ''; },
  COMBINE_ROOT_INDEX: function(postfix, index) {
    return (postfix === sre.Locale.es.MS.ROOTINDEX ||
            postfix === sre.Locale.es.MS.INDEX) ?
      postfix : postfix + ' ' + index;}
};


//  That is female ending!
sre.Locale.es.MS_ROOT_INDEX = {
  '2': 'cuadrada',
  '3': 'cúbica',
  '4': 'a la cuarta',
  '5': 'a la quinta',
  '6': 'a la sexta',
  '7': 'a la séptima',
  '8': 'a la octava',
  '9': 'a la novena',
  '10': 'a la décima'
};


sre.Locale.es.FONT = {
  'bold': 'negrita',
  'bold-fraktur': 'negrita Fraktur',
  'bold-italic': 'negrita cursiva',
  'bold-script': 'negrita script',
  'caligraphic': 'caligráfica',
  'caligraphic-bold': 'caligráfica negrita',
  'double-struck': 'negrita de pizarra',
  'double-struck-italic': 'negrita de pizarra cursiva',
  'fraktur': 'Fraktur',
  'italic': 'cursiva',
  'monospace': 'monoespacio',
  'normal': 'normal',
  'oldstyle': 'estilo antiguo',
  'oldstyle-bold': 'estilo antiguo negrita',
  'script': 'script',
  'sans-serif': 'sans-serif',
  'sans-serif-italic': 'sans-serif cursiva',
  'sans-serif-bold': 'sans-serif negrita',
  'sans-serif-bold-italic': 'sans-serif negrita cursiva',
  'unknown': 'desconocida'
};

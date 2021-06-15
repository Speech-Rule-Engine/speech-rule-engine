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

import {combinePostfixIndex} from '../locale_util';
import {ALPHABETS} from '../alphabets';
import {MESSAGES} from '../messages';
import {Locale} from '../locale';
import NUMBERS from '../numbers/numbers_es';
import {Combiners} from '../transformers';


let sansserifCombiner = function(letter: string, font: string, cap: string) {
  letter = 'sans serif ' + (cap ? cap + ' ' + letter : letter);
  return font ? letter + ' ' + font : letter;
};


export const es: Locale = {
  COMBINERS: {
    'sansserif': sansserifCombiner
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

  MESSAGES: MESSAGES(),
  NUMBERS: NUMBERS,
  ALPHABETS: ALPHABETS()
};

es.ALPHABETS.combiner = Combiners.prefixCombiner;

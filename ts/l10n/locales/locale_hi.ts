//
// Copyright 2021 Volker Sorge
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
 * @fileoverview Hindi message file.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */


//
// This work was supported by British Council UKIERI SPARC Project #P1161
//

import {nestingToString, vulgarNestingDepth} from '../locale_util';
import {ALPHABETS} from '../alphabets';
import {MESSAGES} from '../messages';
import {Locale} from '../locale';
import NUMBERS from '../numbers/numbers_hi';
import {Combiners} from '../transformers';


export const hi: Locale = {
  MS_FUNC: {
    FRAC_NEST_DEPTH: vulgarNestingDepth,
    RADICAL_NEST_DEPTH: nestingToString,
    COMBINE_ROOT_INDEX: function(postfix: string, _index: string) {
      return postfix;
    },
    COMBINE_NESTED_FRACTION: function(a: string, b: string, c: string) {
      return a + b + c;
    },
    COMBINE_NESTED_RADICAL: function(a: string, b: string, c: string) {
      return a + b + c;
    },
    FONT_REGEXP: function(font: string) {
      return new RegExp('^' + font.split(/ |-/).join('( |-)') + '( |-)');
    }
  },
  SI: function(prefix: string, unit: string) {
    return prefix + unit;
  },

  PLURAL: function(unit: string) {
    return unit;
  },

  MESSAGES: MESSAGES(),
  NUMBERS: NUMBERS,
  ALPHABETS: ALPHABETS()

};

hi.ALPHABETS.combiner = Combiners.prefixCombiner;

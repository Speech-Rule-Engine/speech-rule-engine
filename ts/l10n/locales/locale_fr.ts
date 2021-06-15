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
import {MESSAGES} from '../messages';
import NUMBERS from '../numbers/numbers_fr';
import {Combiners, siCombiner} from '../transformers';


export const fr: Locale = {
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

  SI: siCombiner,

  PLURAL: function(unit: string) {
    return /.*s$/.test(unit) ? unit : unit + 's';
  },

  MESSAGES: MESSAGES(),
  NUMBERS: NUMBERS,
  ALPHABETS: ALPHABETS()

};

fr.ALPHABETS.combiner = Combiners.romanceCombiner;


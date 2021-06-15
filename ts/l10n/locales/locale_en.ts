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
 * @fileoverview English message file.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */


import {Grammar} from '../../rule_engine/grammar';
import * as LocaleUtil from '../locale_util';
import {ALPHABETS} from '../alphabets';
import {MESSAGES} from '../messages';
import {Locale} from '../locale';
import NUMBERS from '../numbers/numbers_en';
import * as tr from '../transformers';


export const en: Locale = {
  MS_FUNC: {
    FRAC_NEST_DEPTH: LocaleUtil.vulgarNestingDepth,
    RADICAL_NEST_DEPTH: LocaleUtil.nestingToString,
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
    let abbr: {[key: string]: string} = {
      'megaohm': 'megohm',
      'kiloohm': 'kilohm'
    };
    let si = prefix + unit;
    return abbr[si] || si;
  },

  PLURAL: function(unit: string) {
    return /.*s$/.test(unit) ? unit : unit + 's';
  },

  MESSAGES: MESSAGES(),
  NUMBERS: NUMBERS,
  ALPHABETS: ALPHABETS()
};

en.ALPHABETS.combiner = tr.Combiners.prefixCombiner;
en.ALPHABETS.digitTrans.default = NUMBERS.numberToWords;

Grammar.getInstance().setCorrection('noarticle', (name: string) => {
  return Grammar.getInstance().getParameter('noArticle') ? '' : name;
});

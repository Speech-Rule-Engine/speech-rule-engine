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

import {Grammar} from '../../rule_engine/grammar';
import {localFont, vulgarNestingDepth} from '../locale_util';
import {ALPHABETS} from '../alphabets';
import {MESSAGES} from '../messages';
import {Locale} from '../locale';
import NUMBERS from '../numbers/numbers_de';


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


export const de: Locale = {
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


  COMBINERS: {
    'germanPostfix': germanPostfixCombiner
  },
  
  SI: function(prefix: string, unit: string) {
    return prefix + unit.toLowerCase();
  },

  PLURAL: function(unit: string) {
    return unit;
  },

  MESSAGES: MESSAGES(),
  NUMBERS: NUMBERS,
  ALPHABETS: ALPHABETS()

};

de.ALPHABETS.combiner = germanPrefixCombiner;
de.ALPHABETS.digitTrans.default = NUMBERS.numberToWords;

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

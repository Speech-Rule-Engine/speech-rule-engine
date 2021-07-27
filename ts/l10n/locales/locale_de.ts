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
import {localFont} from '../locale_util';
import {createLocale, Locale} from '../locale';
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


let locale: Locale = null;

export function de(): Locale {
  if (!locale) {
    locale = create();
  }
  // TODO: Initialise the grammar methods here?
  return locale;
}

function create(): Locale {
  let loc = createLocale();
  loc.NUMBERS = NUMBERS;
  loc.COMBINERS['germanPostfix'] = germanPostfixCombiner;
  loc.ALPHABETS.combiner = germanPrefixCombiner;
  loc.FUNCTIONS.radicalNestDepth = (x: number) => {
    return x > 1 ? loc.NUMBERS.numberToWords(x) + 'fach' : '';
  };
  loc.FUNCTIONS.combineRootIndex = (postfix: string, index: string) => {
    let root = index ? index + 'wurzel' : '';
    return postfix.replace('Wurzel', root);
  };
  loc.FUNCTIONS.combineNestedRadical = (a: string, b: string, c: string) => {
    a = c.match(/exponent$/) ? a + 'r' : a;
    let count = (b ? b + ' ' : '') + a;
    return c.match(/ /) ? c.replace(/ /, ' ' + count + ' ') : count + ' ' + c;
  };
  loc.FUNCTIONS.fontRegexp = function(font: string) {
    font = font.split(' ')
      .map(function(x) {
        return x.replace(/s$/, '(|s)');
      })
      .join(' ');
    return new RegExp('((^' + font + ' )|( ' + font + '$))');
  };
  loc.CORRECTIONS.correctOne = (num: string) => num.replace(/^eins$/, 'ein');
  loc.CORRECTIONS.localFontNumber = (font: string) => {
    let realFont = localFont(font);
    return realFont.split(' ')
      .map(function(x) {
        return x.replace(/s$/, '');
      })
      .join(' ');
  };
  loc.CORRECTIONS.lowercase = (name: string) => name.toLowerCase();
  loc.CORRECTIONS.article = (name: string) => {
    let decl = Grammar.getInstance().getParameter('case');
    if (decl === 'dative') {
      return {'der': 'dem', 'die': 'der', 'das': 'dem'}[name];
    }
    return name;
  };
  loc.CORRECTIONS.masculine = (name: string) => {
    let decl = Grammar.getInstance().getParameter('case');
    if (decl === 'dative') {
      return name + 'n';
    }
    return name;
  };
  return loc;
}

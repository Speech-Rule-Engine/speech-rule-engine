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

import {createLocale, Locale} from '../locale';
import {combinePostfixIndex} from '../locale_util';
import NUMBERS from '../numbers/numbers_es';
import {Combiners} from '../transformers';


let sansserifCombiner = function(letter: string, font: string, cap: string) {
  letter = 'sans serif ' + (cap ? cap + ' ' + letter : letter);
  return font ? letter + ' ' + font : letter;
};


let locale: Locale = null;

export function es(): Locale {
  if (!locale) {
    locale = create();
  }
  // TODO: Initialise the grammar methods here?
  return locale;
}

function create(): Locale {
  let loc = createLocale();
  loc.NUMBERS = NUMBERS;

  loc.COMBINERS['sansserif'] = sansserifCombiner;

  loc.FUNCTIONS.fracNestDepth = _node => false;
  loc.FUNCTIONS.radicalNestDepth = _count => '';
  loc.FUNCTIONS.combineRootIndex = combinePostfixIndex,
  loc.FUNCTIONS.combineNestedRadical = (a, _b, c) => a + c;
  loc.FUNCTIONS.fontRegexp = font => RegExp('^' + font + ' ');
  loc.FUNCTIONS.plural = (unit: string) => {
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
  loc.FUNCTIONS.si = (prefix: string, unit: string) => {
    if (unit.match(/^metro/)) {
      prefix = prefix.replace(/a$/, 'á').replace(/o$/, 'ó').replace(/i$/, 'í');
    }
    return prefix + unit;
  };

  loc.ALPHABETS.combiner = Combiners.prefixCombiner;

  return loc;
};


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
 * @fileoverview Catalan message file.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

//
// This work was sponsored by
//

import {createLocale, Locale} from '../locale';
import {combinePostfixIndex} from '../locale_util';
import NUMBERS from '../numbers/numbers_ca';
import {Combiners} from '../transformers';


let sansserifCombiner = function(letter: string, font: string, cap: string) {
  letter = 'sans serif ' + (cap ? cap + ' ' + letter : letter);
  return font ? letter + ' ' + font : letter;
};


let locale: Locale = null;

export function ca(): Locale {
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
  loc.FUNCTIONS.si = (prefix: string, unit: string) => {
    if (unit.match(/^metre/)) {
      prefix = prefix.replace(/a$/, 'à').replace(/o$/, 'ò').replace(/i$/, 'í');
    }
    return prefix + unit;
  };

  loc.ALPHABETS.combiner = Combiners.prefixCombiner;

  return loc;
}

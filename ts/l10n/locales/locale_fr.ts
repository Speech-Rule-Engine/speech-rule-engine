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

import {Grammar} from '../../rule_engine/grammar';
import {createLocale, Locale} from '../locale';
import {combinePostfixIndex} from '../locale_util';
import NUMBERS from '../numbers/numbers_fr';
import {Combiners} from '../transformers';


let locale: Locale = null;

export function fr(): Locale {
  if (!locale) {
    locale = create();
  }
  // TODO: Initialise the grammar methods here?
  return locale;
}

function create(): Locale {
  let loc = createLocale();
  loc.NUMBERS = NUMBERS;

  loc.FUNCTIONS.fracNestDepth = _node => false;
  loc.FUNCTIONS.combineRootIndex = combinePostfixIndex;
  loc.FUNCTIONS.combineNestedFraction =
      (a, b, c) => c.replace(/ $/g, '') + b + a;
  loc.FUNCTIONS.combineNestedRadical = (a, _b, c) => c + ' ' + a;
  loc.FUNCTIONS.fontRegexp = font => RegExp(' (en |)' + font + '$');
  loc.FUNCTIONS.plural = (unit: string) => {
    return /.*s$/.test(unit) ? unit : unit + 's';
  };
  loc.CORRECTIONS.article = (name: string) => {
    return Grammar.getInstance().getParameter('noArticle') ? '' : name;
  };
  loc.ALPHABETS.combiner = Combiners.romanceCombiner;

  return loc;
};



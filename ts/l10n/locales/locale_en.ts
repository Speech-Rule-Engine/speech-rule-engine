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
 * @file English message file.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import { Grammar } from '../../rule_engine/grammar.js';
import { createLocale, Locale } from '../locale.js';
import { nestingToString } from '../locale_util.js';
import { NUMBERS } from '../numbers/numbers_en.js';
import * as tr from '../transformers.js';

let locale: Locale = null;

/**
 * @returns The English locale.
 */
export function en(): Locale {
  if (!locale) {
    locale = create();
  }
  // TODO: Initialise the grammar methods here?
  return locale;
}

/**
 * @returns The English locale.
 */
function create(): Locale {
  const loc = createLocale();
  loc.NUMBERS = NUMBERS;
  loc.FUNCTIONS.radicalNestDepth = nestingToString;
  loc.FUNCTIONS.plural = (unit: string) => {
    return /.*s$/.test(unit) ? unit : unit + 's';
  };
  loc.ALPHABETS.combiner = tr.Combiners.prefixCombiner;
  loc.ALPHABETS.digitTrans.default = NUMBERS.numberToWords;
  loc.CORRECTIONS.article = (name: string) => {
    return Grammar.getInstance().getParameter('noArticle') ? '' : name;
  };
  return loc;
}

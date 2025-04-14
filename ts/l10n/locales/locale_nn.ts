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
 * @file Norsk Nynorsk message file.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

//
// This work was sponsored by TextHelp
//

import { createLocale, Locale } from '../locale.js';
import { nestingToString } from '../locale_util.js';
import { NUMBERS } from '../numbers/numbers_nn.js';
import * as tr from '../transformers.js';

let locale: Locale = null;

/**
 * @returns The Nynorsk locale.
 */
export function nn(): Locale {
  if (!locale) {
    locale = create();
  }
  // TODO: Initialise the grammar methods here?
  return locale;
}

/**
 * @returns The Nynorsk locale.
 */
function create(): Locale {
  const loc = createLocale();
  loc.NUMBERS = NUMBERS;
  loc.ALPHABETS.combiner = tr.Combiners.prefixCombiner;
  loc.ALPHABETS.digitTrans.default = NUMBERS.numberToWords;
  loc.FUNCTIONS.radicalNestDepth = nestingToString;
  loc.SUBISO = {
    default: '',
    current: '',
    all: ['', 'alt']
  };
  return loc;
}

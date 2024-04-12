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
 * @file Italian message file.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

//
// This work was sponsored by TextHelp
//

import { combinePostfixIndex, nestingToString } from '../locale_util.js';
import { createLocale, Locale } from '../locale.js';
import { NUMBERS } from '../numbers/numbers_it.js';
import { Combiners } from '../transformers.js';

const italianPostfixCombiner = function (
  letter: string,
  font: string,
  cap: string
) {
  if (letter.match(/^[a-zA-Z]$/)) {
    font = font.replace('cerchiato', 'cerchiata');
  }
  letter = cap ? letter + ' ' + cap : letter;
  return font ? letter + ' ' + font : letter;
};

let locale: Locale = null;

/**
 * @returns The Italian Locale.
 */
export function it(): Locale {
  if (!locale) {
    locale = create();
  }
  // TODO: Initialise the grammar methods here?
  return locale;
}

/**
 * @returns The Italian Locale.
 */
function create(): Locale {
  const loc = createLocale();
  loc.NUMBERS = NUMBERS;

  loc.COMBINERS['italianPostfix'] = italianPostfixCombiner;

  // loc.FUNCTIONS.fracNestDepth = (_node) => false;
  loc.FUNCTIONS['radicalNestDepth'] = nestingToString;
  loc.FUNCTIONS['combineRootIndex'] = combinePostfixIndex;
  loc.FUNCTIONS['combineNestedFraction'] = (a, b, c) =>
    c.replace(/ $/g, '') + b + a;
  loc.FUNCTIONS['combineNestedRadical'] = (a, _b, c) => c + ' ' + a;
  loc.FUNCTIONS['fontRegexp'] = (font) => RegExp(' (en |)' + font + '$');

  loc.ALPHABETS['combiner'] = Combiners['romanceCombiner'];

  return loc;
}

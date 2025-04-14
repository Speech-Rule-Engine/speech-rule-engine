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
 * @file Basic locale file providing namespace and utilities.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import { LOCALE } from './locale.js';
import { Combiner, Combiners } from './transformers.js';

/**
 * Translation for count word in superbrief nesting description.
 *
 * @param count The counting parameter.
 * @returns The corresponding string.
 */
export function nestingToString(count: number): string {
  switch (count) {
    case 1:
      return LOCALE.MESSAGES.MS.ONCE || '';
    case 2:
      return LOCALE.MESSAGES.MS.TWICE;
    default:
      return count.toString();
  }
}

/**
 * Generates a root ending message by combining the end message (postfix) with
 * the index. Example: Start Root Cubic ... End Root Cubic.
 *
 * @param postfix The postfix.
 * @param index The index.
 * @returns The combined string, postfix plus index.
 */
export function combinePostfixIndex(postfix: string, index: string): string {
  return postfix === LOCALE.MESSAGES.MS.ROOTINDEX ||
    postfix === LOCALE.MESSAGES.MS.INDEX
    ? postfix
    : postfix + ' ' + index;
}

/**
 * Localizes the font name.
 *
 * @param font The font name.
 * @returns The localized font name.
 */
export function localFont(font: string): string {
  return extractString(LOCALE.MESSAGES.font[font], font);
}

/**
 * Localizes the role name.
 *
 * @param role The role name.
 * @returns The localized role name.
 */
export function localRole(role: string): string {
  return extractString(LOCALE.MESSAGES.role[role], role);
}

/**
 * Localizes the enclose name.
 *
 * @param enclose The enclose name.
 * @returns The localized enclose name.
 */
export function localEnclose(enclose: string): string {
  return extractString(LOCALE.MESSAGES.enclose[enclose], enclose);
}

/**
 * Extracts a string from a combined message entry.
 *
 * @param combiner The combined message
 * @param fallback The fallback if no string can be extracted.
 * @returns The name.
 */
function extractString(combiner: string | [string, string], fallback: string) {
  if (combiner === undefined) {
    return fallback;
  }
  return typeof combiner === 'string' ? combiner : combiner[0];
}

/**
 * Retrieves font value and combiner for the current locale.
 *
 * @param font The font of an alphabet.
 * @returns The localised font value plus a combiner.
 */
export function localeFontCombiner(font: string | [string, string]): {
  font: string;
  combiner: Combiner;
} {
  return typeof font === 'string'
    ? { font: font, combiner: LOCALE.ALPHABETS.combiner }
    : {
        font: font[0],
        combiner:
          LOCALE.COMBINERS[font[1]] ||
          Combiners[font[1]] ||
          LOCALE.ALPHABETS.combiner
      };
}

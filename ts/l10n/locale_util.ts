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
 * @fileoverview Basic locale file providing namespace and utilities.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */


import * as MathspeakUtil from '../speech_rules/mathspeak_util';
import {LOCALE} from './locale';
import {Combiner, Processor} from './transformers';


/**
 * Translation for count word in superbrief nesting description.
 * @param count The counting parameter.
 * @return The corresponding string.
 */
export function nestingToString(count: number): string {
  switch (count) {
    case 1:
      return LOCALE.MS.ONCE || '';
    case 2:
      return LOCALE.MS.TWICE;
    default:
      return count.toString();
  }
}


/**
 * Sets the nesting depth of a fraction to end at vulgar fraction.
 * @param node The node to check.
 * @return True if a vulgar fraction.
 */
export function vulgarNestingDepth(node: Element): boolean {
  return !!MathspeakUtil.isSmallVulgarFraction(node).length;
}


/**
 * Generates a root ending message by combining the end message (postfix) with
 * the index. Example: Start Root Cubic ... End Root Cubic.
 * @param postfix The postfix.
 * @param index The index.
 * @return The combined string, postfix plus index.
 */
export function combinePostfixIndex(postfix: string, index: string): string {
  return postfix === LOCALE.MS.ROOTINDEX || postfix === LOCALE.MS.INDEX ?
      postfix :
      postfix + ' ' + index;
}


/**
 * Localizes the font name.
 * @param font The font name.
 * @return The localized font name.
 */
export function localFont(font: string): string {
  return extractString(LOCALE.FONT[font], font);
}


/**
 * Localizes the role name.
 * @param role The role name.
 * @return The localized role name.
 */
export function localRole(role: string): string {
  return extractString(LOCALE.ROLE[role], role);
}


/**
 * Localizes the enclose name.
 * @param enclose The enclose name.
 * @return The localized enclose name.
 */
export function localEnclose(enclose: string): string {
  return extractString(LOCALE.ENCLOSE[enclose], enclose);
}


/**
 * Extracts a string from a combined message entry.
 * @param combiner The combined message
 * @return The name
 */
export function extractString(combiner: string | [string, Processor],
                              fallback: string) {
  if (combiner === undefined) {
    return fallback;
  }
  return (typeof combiner === 'string') ? combiner : combiner[0];
}


/**
 * Retrieves font value and combiner for the current locale.
 * @param font The font of an alphabet.
 * @return The localised font value plus a combiner.
 */
export function localeFontCombiner(
  font: string | [string, Combiner]): {font: string, combiner: Combiner} {
  return typeof font === 'string' ?
    {font: font, combiner: LOCALE.ALPHABETS.combiner} :
    {font: font[0], combiner: font[1]};
}

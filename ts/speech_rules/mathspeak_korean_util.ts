//
// Copyright 2019-21 Volker Sorge
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
 * @fileoverview Utility functions for mathspeak rules.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

//
// This work was sponsored by TextHelp
//

import * as MathspeakUtil from './mathspeak_util';
import * as DomUtil from '../common/dom_util';
import {LOCALE} from '../l10n/locale';


namespace MathspeakKoreanUtil {

/**
 * Computes disambiguations for nested fractions.
 * @param node The fraction node.
 * @param expr The disambiguating expression.
 * @param opt_end Optional end expression.
 * @return The disambiguating string.
 */
export function nestedFraction( node: Element, expr: string, opt_end?: string): string {
  let depth = MathspeakUtil.fractionNestingDepth(node);
  let annotation = Array.apply(null, Array(depth)).map((_x: string) => expr);
  if (opt_end) {
    annotation.unshift(opt_end);
  }
  return annotation.join(LOCALE.MESSAGES.regexp.JOINER_FRAC);
}

/**
 * Opening string for fractions in Mathspeak verbose mode.
 * @param node The fraction node.
 * @return The opening string.
 */
export function openingFractionVerbose(node: Element): string {
  return nestedFraction(node, LOCALE.MESSAGES.MS.START, LOCALE.MESSAGES.MS.FRAC_V);
}


/**
 * Closing string for fractions in Mathspeak verbose mode.
 * @param node The fraction node.
 * @return The closing string.
 */
export function closingFractionVerbose(node: Element): string {
  return nestedFraction(node, LOCALE.MESSAGES.MS.END, LOCALE.MESSAGES.MS.FRAC_V);
}


/**
 * Opening string for fractions in Mathspeak brief mode.
 * @param node The fraction node.
 * @return The opening string.
 */
export function openingFractionBrief(node: Element): string {
  return nestedFraction(node, LOCALE.MESSAGES.MS.START, LOCALE.MESSAGES.MS.FRAC_B);
}


/**
 * Closing string for fractions in Mathspeak brief mode.
 * @param node The fraction node.
 * @return The closing string.
 */
export function closingFractionBrief(node: Element): string {
  return nestedFraction(node, LOCALE.MESSAGES.MS.END, LOCALE.MESSAGES.MS.FRAC_B);
}


/**
 * Middle string for fractions in Mathspeak verbose mode.
 * @param node The fraction node.
 * @return The middle string.
 *
export function overFractionVerbose(node: Element): string {
  return nestedFraction(node, LOCALE.MESSAGES.MS.FRAC_OVER);
}*/


/**
 * Middle string for fractions in Mathspeak superbrief mode.
 * @param node The fraction node.
 * @return The middle string.
 *
export function overFractionSbrief(node: Element): string {
  let depth = fractionNestingDepth(node);
  if (depth === 1) {
    return LOCALE.MESSAGES.MS.FRAC_OVER;
  }
  return LOCALE.FUNCTIONS.combineNestedFraction(
      LOCALE.MESSAGES.MS.NEST_FRAC, LOCALE.FUNCTIONS.radicalNestDepth(depth - 1),
      LOCALE.MESSAGES.MS.FRAC_OVER);
}*/


export function nestedRadical(
    node: Element, prefix: string, postfix: string): string {
  let depth = MathspeakUtil.radicalNestingDepth(node);
  let index = MathspeakUtil.getRootIndex(node);
  if (index === '3' || index === '4') {
  index = (index === '3') ? '세': '네';
  } 
  postfix = index ? LOCALE.FUNCTIONS.combineRootIndex(index, postfix) : postfix;
  if (depth === 1) {
    return postfix;
  }
  return LOCALE.FUNCTIONS.combineNestedRadical(
      LOCALE.FUNCTIONS.radicalNestDepth(depth - 1), prefix, postfix);
}


/**
 * Opening string for radicals in Mathspeak verbose mode.
 * @param node The radical node.
 * @return The opening string.
 */
export function openingRadicalVerbose(node: Element): string {
  return nestedRadical(node, LOCALE.MESSAGES.MS.NESTED, LOCALE.MESSAGES.MS.STARTROOT);
}


/**
 * Closing string for radicals in Mathspeak verbose mode.
 * @param node The radical node.
 * @return The closing string.
 */
export function closingRadicalVerbose(node: Element): string {
  return nestedRadical(node, LOCALE.MESSAGES.MS.NESTED, LOCALE.MESSAGES.MS.ENDROOT);
}


/**
 * Middle string for radicals in Mathspeak verbose mode.
 * @param node The radical node.
 * @return The middle string.
 */
export function indexRadicalVerbose(node: Element): string {
  return nestedRadical(node, LOCALE.MESSAGES.MS.NESTED, LOCALE.MESSAGES.MS.ROOTINDEX);
}


/**
 * Opening string for radicals in Mathspeak brief mode.
 * @param node The radical node.
 * @return The opening string.
 */
export function openingRadicalBrief(node: Element): string {
  return nestedRadical(node, LOCALE.MESSAGES.MS.NEST_ROOT, LOCALE.MESSAGES.MS.STARTROOT);
}


/**
 * Closing string for radicals in Mathspeak brief mode.
 * @param node The radical node.
 * @return The closing string.
 */
export function closingRadicalBrief(node: Element): string {
  return nestedRadical(node, LOCALE.MESSAGES.MS.NEST_ROOT, LOCALE.MESSAGES.MS.ENDROOT);
}


/**
 * Middle string for radicals in Mathspeak superbrief mode.
 * @param node The radical node.
 * @return The middle string.
 */
export function indexRadicalBrief(node: Element): string {
  return nestedRadical(node, LOCALE.MESSAGES.MS.NEST_ROOT, LOCALE.MESSAGES.MS.ROOTINDEX);
}


/**
 * Opening string for radicals in Mathspeak superbrief mode.
 * @param node The radical node.
 * @return The opening string.
 */
export function openingRadicalSbrief(node: Element): string {
  return nestedRadical(node, LOCALE.MESSAGES.MS.NEST_ROOT, LOCALE.MESSAGES.MS.ROOT);
}


/**
 * Middle string for radicals in Mathspeak superbrief mode.
 * @param node The radical node.
 * @return The middle string.
 */
export function indexRadicalSbrief(node: Element): string {
  return nestedRadical(node, LOCALE.MESSAGES.MS.NEST_ROOT, LOCALE.MESSAGES.MS.INDEX);
}


/**
 * String function to turn a child position into an ordinal.
 * @param node The node for the string function.
 * @return The ordinal string corresponding to the child position of
 *     the node.
 */
 export function ordinalPosition(node: Node): string {
  let children = DomUtil.toArray(node.parentNode.childNodes);
  return LOCALE.NUMBERS.numberToOrdinal(children.indexOf(node) + 1, false).toString();
}

/**
 * String function to turn a child position into an ordinal.
 * @param node The node for the string function.
 * @return The ordinal string corresponding to the child position of
 *     the node.
 */
 export function ordinalNumber(node: Node): string {
  let children = DomUtil.toArray(node.parentNode.childNodes);
  let index = children.length;
  return LOCALE.NUMBERS.wordOrdinal(index).toString();
}

}
export default MathspeakKoreanUtil;

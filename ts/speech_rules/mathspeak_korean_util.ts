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

//import * as DomUtil from '../common/dom_util';
//import * as Semantic from '../semantic_tree/semantic';
import * as MathspeakUtil from './mathspeak_util';
import XpathUtil from '../common/xpath_util';
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
 * Opening string for fractions in Mathspeak superbrief mode.
 * @param node The fraction node.
 * @return The opening string.
 */
 export function openingFractionSbrief(node: Element): string {
  let depth = MathspeakUtil.fractionNestingDepth(node);
  if (depth === 1) {
    return LOCALE.MESSAGES.MS.FRAC_S;
  }
  return LOCALE.FUNCTIONS.combineNestedFraction(
      LOCALE.FUNCTIONS.radicalNestDepth(depth - 1), LOCALE.MESSAGES.MS.NEST_FRAC,
      LOCALE.MESSAGES.MS.FRAC_S);
}


/**
 * Closing string for fractions in Mathspeak superbrief mode.
 * @param node The fraction node.
 * @return The closing string.
 */
export function closingFractionSbrief(node: Element): string {
  let depth = MathspeakUtil.fractionNestingDepth(node);
  if (depth === 1) {
    return LOCALE.MESSAGES.MS.ENDFRAC;
  }
  return LOCALE.FUNCTIONS.combineNestedFraction(
      LOCALE.FUNCTIONS.radicalNestDepth(depth - 1), LOCALE.MESSAGES.MS.NEST_FRAC,
      LOCALE.MESSAGES.MS.ENDFRAC);
}


/**
 * Middle string for fractions in Mathspeak superbrief mode.
 * @param node The fraction node.
 * @return The middle string.
 */
export function overFractionSbrief(node: Element): string {
  let depth = MathspeakUtil.fractionNestingDepth(node);
  if (depth === 1) {
    return LOCALE.MESSAGES.MS.FRAC_OVER;
  }
  return LOCALE.FUNCTIONS.combineNestedFraction(
      LOCALE.FUNCTIONS.radicalNestDepth(depth - 1), LOCALE.MESSAGES.MS.NEST_FRAC,
      LOCALE.MESSAGES.MS.FRAC_OVER);
}

/**
 * Query function that Checks if we have a simple determinant in the sense that
 * every cell only contains single letters or numbers.
 * @param node The determinant node.
 * @return List containing input node if true.
 */
export function IsSimpleIndex(node: Element): Element[] {
  let index = XpathUtil.evalXPath('children/*[1]', node)[0].toString().match(/[^>⁢>]+<\/[^>]*>/g);

  return (index.length === 1) ?  [node] : [];
}


/**
 * A string indexing the root.
 * @param node The radical node.
 * @return The localised indexing string if it exists.
 */
export function getRootIndex(node: Element): string {
  //let children = XpathUtil.evalXPath('children/*[1]', node)[0];
  let content = node.tagName === 'sqrt' ? '' :  // TODO (sorge): Make that safer?
    XpathUtil.evalXPath('children/*[1]', node)[0].textContent.trim();

  return LOCALE.MESSAGES.MSroots[content] || content;

  /*
  let list = children.toString().match(/[^>⁢>]+<\/[^>]*>/g);
  if (list.length === 1) return LOCALE.MESSAGES.MSroots[content] || content;

  let result = []; let i = 0; let wasElement = false;
  while (list.length > 0) {

    if (!wasElement) {
      wasElement = list.some((element: string) => {
        if (element.includes('number') || element.includes('identifier')) {
          return (i = list.indexOf(element));
        } return false;
      });
      if (i <= 0 && list.length > i + 1) return content;
    }
    else { wasElement = false; i--; }
    result.push(list.splice(i, 1).toString().replace(/<\/.*>/g, ''));
  }

  return list.length ? content : result.join(" ");
  */
}


export function nestedRadical(
    node: Element, prefix: string, postfix: string, fence: boolean): string {
  let depth = MathspeakUtil.radicalNestingDepth(node);
  let index = getRootIndex(node);
  postfix = (index && fence) ? LOCALE.FUNCTIONS.combineRootIndex(index, postfix) : postfix;

  if (depth === 1) { return postfix; }
  return LOCALE.FUNCTIONS.combineNestedRadical(
      LOCALE.FUNCTIONS.radicalNestDepth(depth - 1), prefix, postfix);
}


/**
 * Opening string for radicals in Mathspeak verbose mode.
 * @param node The radical node.
 * @return The opening string.
 */
export function openingRadicalVerbose(node: Element): string {
  return nestedRadical(node, LOCALE.MESSAGES.MS.NESTED, LOCALE.MESSAGES.MS.STARTROOT, false);
}


/**
 * Closing string for radicals in Mathspeak verbose mode.
 * @param node The radical node.
 * @return The closing string.
 */
export function closingRadicalVerbose(node: Element): string {
  return nestedRadical(node, LOCALE.MESSAGES.MS.NESTED, LOCALE.MESSAGES.MS.ENDROOT, false);
}


/**
 * Middle string for radicals in Mathspeak verbose mode.
 * @param node The radical node.
 * @return The middle string.
 */
export function indexRadicalVerbose(node: Element): string {
  return nestedRadical(node, LOCALE.MESSAGES.MS.NESTED, LOCALE.MESSAGES.MS.ROOTINDEX, true);
}


/**
 * Opening string for radicals in Mathspeak brief mode.
 * @param node The radical node.
 * @return The opening string.
 */
export function openingRadicalBrief(node: Element): string {
  return nestedRadical(node, LOCALE.MESSAGES.MS.NEST_ROOT, LOCALE.MESSAGES.MS.STARTROOT, false);
}


/**
 * Closing string for radicals in Mathspeak brief mode.
 * @param node The radical node.
 * @return The closing string.
 */
export function closingRadicalBrief(node: Element): string {
  return nestedRadical(node, LOCALE.MESSAGES.MS.NEST_ROOT, LOCALE.MESSAGES.MS.ENDROOT, false);
}


/**
 * Middle string for radicals in Mathspeak superbrief mode.
 * @param node The radical node.
 * @return The middle string.
 */
export function indexRadicalBrief(node: Element): string {
  return nestedRadical(node, LOCALE.MESSAGES.MS.NEST_ROOT, LOCALE.MESSAGES.MS.ROOTINDEX, true);
}


/**
 * Opening string for radicals in Mathspeak superbrief mode.
 * @param node The radical node.
 * @return The opening string.
 */
export function openingRadicalSbrief(node: Element): string {
  return nestedRadical(node, LOCALE.MESSAGES.MS.NEST_ROOT, LOCALE.MESSAGES.MS.ROOT, false);
}


/**
 * Middle string for radicals in Mathspeak superbrief mode.
 * @param node The radical node.
 * @return The middle string.
 */
export function indexRadicalSbrief(node: Element): string {
  return nestedRadical(node, LOCALE.MESSAGES.MS.NEST_ROOT, LOCALE.MESSAGES.MS.INDEX, true);
}

/**
 * String function to turn a child position into an ordinal.
 * @param node The node for the string function.
 * @return The ordinal string corresponding to the child position of
 *     the node.
 */
export function ordinalNumber(count: number): string {
  return LOCALE.NUMBERS.wordOrdinal(count);
}

}
export default MathspeakKoreanUtil;

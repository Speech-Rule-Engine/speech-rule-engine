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
 * @file Utility functions for mathspeak rules.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

//
// This work was sponsored by TextHelp
//

import { Span } from '../audio/span.js';
import * as MathspeakUtil from './mathspeak_util.js';
import { LOCALE } from '../l10n/locale.js';
import * as XpathUtil from '../common/xpath_util.js';

/**
 * Computes disambiguations for nested fractions.
 *
 * @param node The fraction node.
 * @param expr The disambiguating expression.
 * @param opt_end Optional end expression.
 * @returns The disambiguating string.
 */
export function nestedFraction(
  node: Element,
  expr: string,
  opt_end?: string
): string {
  const depth = MathspeakUtil.fractionNestingDepth(node);
  const annotation = Array.apply(null, Array(depth)).map((_x: string) => expr);
  if (opt_end) {
    annotation.unshift(opt_end);
  }
  return annotation.join(LOCALE.MESSAGES.regexp['JOINER_FRAC']);
}

/**
 * Opening string for fractions in Mathspeak verbose mode.
 *
 * @param node The fraction node.
 * @returns The opening string.
 */
export function openingFractionVerbose(node: Element): Span[] {
  return Span.singleton(
    nestedFraction(
      node,
      LOCALE.MESSAGES.MS['START'],
      LOCALE.MESSAGES.MS['FRAC_V']
    )
  );
}

/**
 * Closing string for fractions in Mathspeak verbose mode.
 *
 * @param node The fraction node.
 * @returns The closing string.
 */
export function closingFractionVerbose(node: Element): Span[] {
  return Span.singleton(
    nestedFraction(
      node,
      LOCALE.MESSAGES.MS['END'],
      LOCALE.MESSAGES.MS['FRAC_V']
    )
  );
}

/**
 * Opening string for fractions in Mathspeak brief mode.
 *
 * @param node The fraction node.
 * @returns The opening string.
 */
export function openingFractionBrief(node: Element): Span[] {
  return Span.singleton(
    nestedFraction(
      node,
      LOCALE.MESSAGES.MS['START'],
      LOCALE.MESSAGES.MS['FRAC_B']
    )
  );
}

/**
 * Closing string for fractions in Mathspeak brief mode.
 *
 * @param node The fraction node.
 * @returns The closing string.
 */
export function closingFractionBrief(node: Element): Span[] {
  return Span.singleton(
    nestedFraction(
      node,
      LOCALE.MESSAGES.MS['END'],
      LOCALE.MESSAGES.MS['FRAC_B']
    )
  );
}

/**
 * Opening string for fractions in Mathspeak superbrief mode.
 *
 * @param node The fraction node.
 * @returns The opening string.
 */
export function openingFractionSbrief(node: Element): Span[] {
  const depth = MathspeakUtil.fractionNestingDepth(node);
  if (depth === 1) {
    return Span.singleton(LOCALE.MESSAGES.MS['FRAC_S']);
  }
  return Span.singleton(
    LOCALE.FUNCTIONS.combineNestedFraction(
      LOCALE.FUNCTIONS.radicalNestDepth(depth - 1),
      LOCALE.MESSAGES.MS['NEST_FRAC'],
      LOCALE.MESSAGES.MS['FRAC_S']
    )
  );
}

/**
 * Closing string for fractions in Mathspeak superbrief mode.
 *
 * @param node The fraction node.
 * @returns The closing string.
 */
export function closingFractionSbrief(node: Element): Span[] {
  const depth = MathspeakUtil.fractionNestingDepth(node);
  if (depth === 1) {
    return Span.singleton(LOCALE.MESSAGES.MS['ENDFRAC']);
  }
  return Span.singleton(
    LOCALE.FUNCTIONS.combineNestedFraction(
      LOCALE.FUNCTIONS.radicalNestDepth(depth - 1),
      LOCALE.MESSAGES.MS['NEST_FRAC'],
      LOCALE.MESSAGES.MS['ENDFRAC']
    )
  );
}

/**
 * Middle string for fractions in Mathspeak superbrief mode.
 *
 * @param node The fraction node.
 * @returns The middle string.
 */
export function overFractionSbrief(node: Element): Span[] {
  const depth = MathspeakUtil.fractionNestingDepth(node);
  if (depth === 1) {
    return Span.singleton(LOCALE.MESSAGES.MS['FRAC_OVER']);
  }
  return Span.singleton(
    LOCALE.FUNCTIONS.combineNestedFraction(
      LOCALE.FUNCTIONS.radicalNestDepth(depth - 1),
      LOCALE.MESSAGES.MS['NEST_FRAC'],
      LOCALE.MESSAGES.MS['FRAC_OVER']
    )
  );
}

/**
 * Query function that checks if we have a simple index in the sense that
 * every cell only contains single letters or numbers.
 *
 * @param node The root node.
 * @returns List containing input node if true.
 */
export function isSimpleIndex(node: Element): Element[] {
  const index = XpathUtil.evalXPath('children/*[1]', node)[0]
    .toString()
    .match(/[^>⁢>]+<\/[^>]*>/g);

  return index.length === 1 ? [node] : [];
}

/**
 * Nested string for radicals in Mathspeak mode putting together the nesting
 * depth with a pre/postfix string that depends on the speech style.
 *
 * @param node The radical node.
 * @param prefix A prefix string.
 * @param postfix A postfix string.
 * @returns The opening string.
 */
export function nestedRadical(
  node: Element,
  prefix: string,
  postfix: string
): string {
  const depth = MathspeakUtil.radicalNestingDepth(node);
  if (depth === 1) return postfix;

  return LOCALE.FUNCTIONS.combineNestedRadical(
    LOCALE.FUNCTIONS.radicalNestDepth(depth - 1),
    prefix,
    postfix
  );
}

/**
 * Opening string for radicals in Mathspeak verbose mode.
 *
 * @param node The radical node.
 * @returns The opening string.
 */
export function openingRadicalVerbose(node: Element): Span[] {
  return Span.singleton(
    nestedRadical(
      node,
      LOCALE.MESSAGES.MS['NESTED'],
      LOCALE.MESSAGES.MS['STARTROOT']
    )
  );
}

/**
 * Closing string for radicals in Mathspeak verbose mode.
 *
 * @param node The radical node.
 * @returns The closing string.
 */
export function closingRadicalVerbose(node: Element): Span[] {
  return Span.singleton(
    nestedRadical(
      node,
      LOCALE.MESSAGES.MS['NESTED'],
      LOCALE.MESSAGES.MS['ENDROOT']
    )
  );
}

/**
 * Opening string for radicals in Mathspeak brief mode.
 *
 * @param node The radical node.
 * @returns The opening string.
 */
export function openingRadicalBrief(node: Element): Span[] {
  return Span.singleton(
    nestedRadical(
      node,
      LOCALE.MESSAGES.MS['NEST_ROOT'],
      LOCALE.MESSAGES.MS['STARTROOT']
    )
  );
}

/**
 * Closing string for radicals in Mathspeak brief mode.
 *
 * @param node The radical node.
 * @returns The closing string.
 */
export function closingRadicalBrief(node: Element): Span[] {
  return Span.singleton(
    nestedRadical(
      node,
      LOCALE.MESSAGES.MS['NEST_ROOT'],
      LOCALE.MESSAGES.MS['ENDROOT']
    )
  );
}

/**
 * Opening string for radicals in Mathspeak superbrief mode.
 *
 * @param node The radical node.
 * @returns The opening string.
 */
export function openingRadicalSbrief(node: Element): Span[] {
  return Span.singleton(
    nestedRadical(
      node,
      LOCALE.MESSAGES.MS['NEST_ROOT'],
      LOCALE.MESSAGES.MS['ROOT']
    )
  );
}

/**
 * A string indexing the root.
 *
 * @param node The radical node.
 * @returns The localised indexing string.
 */
export function getRootIndex(node: Element): string {
  const content = XpathUtil.evalXPath(
    'children/*[1]',
    node
  )[0].textContent.trim();
  return LOCALE.MESSAGES.MSroots[content] || content + '제곱근';
}

/**
 * Indexing string for radicals in Mathspeak mode putting together.
 *
 * @param node The radical node.
 * @param postfix A postfix string.
 * @returns The indexing string.
 */
export function indexRadical(node: Element, postfix: string): string {
  const index = getRootIndex(node);
  return index ? index : postfix;
}

/**
 * Non-simple indexing string for radicals in Mathspeak verbose mode.
 *
 * @param node The radical node.
 * @returns The indexing string.
 */
export function indexRadicalVerbose(node: Element): Span[] {
  return Span.singleton(indexRadical(node, LOCALE.MESSAGES.MS['ROOTINDEX']));
}

/**
 * Non-simple indexing string for radicals in Mathspeak brief mode.
 *
 * @param node The radical node.
 * @returns The indexing string.
 */
export function indexRadicalBrief(node: Element): Span[] {
  return Span.singleton(indexRadical(node, LOCALE.MESSAGES.MS['ROOTINDEX']));
}

/**
 * Non-simple indexing string for radicals in Mathspeak superbrief mode.
 *
 * @param node The radical node.
 * @returns The indexing string.
 */
export function indexRadicalSbrief(node: Element): Span[] {
  return Span.singleton(indexRadical(node, LOCALE.MESSAGES.MS['INDEX']));
}

/**
 * String function to turn a child position into an ordinal.
 *
 * @param node The node for the string function.
 * @returns The ordinal string corresponding to the child position of
 *     the node.
 */
export function ordinalConversion(node: Element): Span[] {
  const children = XpathUtil.evalXPath('children/*', node) as Element[];
  return Span.singleton(LOCALE.NUMBERS.wordOrdinal(children.length));
}

/**
 * String function to convert a child position into an ordinal.
 *
 * @param node The node for the string function.
 * @returns The ordinal string corresponding to the child position of
 *     the node.
 */
export function decreasedOrdinalConversion(node: Element): Span[] {
  const children = XpathUtil.evalXPath('children/*', node) as Element[];
  return Span.singleton(LOCALE.NUMBERS.wordOrdinal(children.length - 1));
}

/**
 * String function to convert a child position into an ordinal.
 *
 * @param node The node for the string function.
 * @returns The ordinal string corresponding to the child position of
 *     the node.
 */
export function listOrdinalConversion(node: Element): Span[] {
  const children = XpathUtil.evalXPath('children/*', node) as Element[];
  const content = XpathUtil.evalXPath('content/*', node) as Element[];
  return Span.singleton(
    LOCALE.NUMBERS.wordOrdinal(children.length - content.length)
  );
}

/**
 * Query function to check if the child depth of the current node
 * is above a certain standard value.
 *
 * @param node The root node.
 * @returns List containing input node if true.
 */
export function checkDepth(node: Element): Element[] {
  // additional option to check the number of roles.
  const roleList: string[] = [];
  const depth = getDepthValue(node, roleList);
  // TODO: determine the standard value.
  return depth > 3 ? [] : [node];
}
//TODO: use as a custom function if needed.

/**
 * DFS function to calculate the child depth of the current node
 * and determine the number of roles.
 *
 * @param node The root node.
 * @param roleList The list of role.
 * @returns The child depth.
 */
export function getDepthValue(node: Element, roleList: string[]): number {
  const role = node.getAttribute('role');
  const index = roleList.indexOf(role) > -1;
  if (!index) {
    roleList.push(role);
  }
  const children = XpathUtil.evalXPath('children/*', node) as Element[];
  let max = 0,
    cur = 0;
  if (children.length) {
    children.forEach((child) => {
      cur = getDepthValue(child, roleList);
      cur > max ? (max = cur) : max;
    });
    return max + 1;
  }
  return 0;
}

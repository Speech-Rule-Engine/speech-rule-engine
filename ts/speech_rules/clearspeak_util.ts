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
 * @file Utility functions for clearspeak rules.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import { Span } from '../audio/span.js';
import * as DomUtil from '../common/dom_util.js';
import * as XpathUtil from '../common/xpath_util.js';
import { LOCALE } from '../l10n/locale.js';
import { vulgarFractionSmall } from '../l10n/transformers.js';
import { Grammar } from '../rule_engine/grammar.js';
import * as StoreUtil from '../rule_engine/store_util.js';
import { isMatchingFence } from '../semantic_tree/semantic_attr.js';
import {
  SemanticRole,
  SemanticType
} from '../semantic_tree/semantic_meaning.js';

/**
 * Count list of nodes and combine this according to the formatted context
 * string. Formatting can consist of up to three, dash separated parts:
 *
 * Part 1 is the regular context string that is passed to the context
 * function. For example context:"Column" returns `Column 1`, `Column 2`, ...
 *
 * Part 2 is a separator that is concatenated at the end of the computed
 * context. For example context:"Column-:" returns `Column 1:`, `Column 2:`, ...
 *
 * Part 3 is a initial string that is prefixed only to the very first context
 * string. For example context: "Column-:-Start " returns `Start Column 1:`,
 * `Column 2:`, ...
 *
 * Returns a closure with a local state.
 *
 * @param nodes A node array.
 * @param context The formatted context string.
 * @returns A function returning a string.
 */
export function nodeCounter(
  nodes: Element[],
  context: string | null
): () => string {
  const split = context.split('-');
  const func = StoreUtil.nodeCounter(nodes, split[0] || '');
  const sep = split[1] || '';
  const init = split[2] || '';
  let first = true;
  return function () {
    const result = func();
    if (first) {
      first = false;
      return init + result + sep;
    } else {
      return result + sep;
    }
  };
}

/**
 * Decides if node has markup of simple node in clearspeak.
 *
 * @param node The node in question.
 * @returns True if the node has a annotation entry of simple.
 */
function simpleNode(node: Element): boolean {
  if (!node.hasAttribute('annotation')) {
    return false;
  }
  const annotation = node.getAttribute('annotation');
  return !!/clearspeak:simple$|clearspeak:simple;/.exec(annotation);
}

/**
 * Predicate to decide if a node is a simple cell in a table.
 *
 * @param node The node in question.
 * @returns True if the node is a simple cell.
 */
function simpleCell_(node: Element): boolean {
  if (simpleNode(node)) {
    return true;
  }
  // TODO: (Simons) This is a special case that has to be removed by rewriting
  // certain indices from implicit multiplication to punctuation. For clearspeak
  // this should yield a simple expression then. And have a subscript with index
  // role.
  if (node.tagName !== SemanticType.SUBSCRIPT) {
    return false;
  }
  const children = node.childNodes[0].childNodes;
  const index = children[1] as Element;
  return (
    (children[0] as Element).tagName === SemanticType.IDENTIFIER &&
    (isInteger_(index) ||
      (index.tagName === SemanticType.INFIXOP &&
        index.hasAttribute('role') &&
        index.getAttribute('role') === SemanticRole.IMPLICIT &&
        allIndices_(index)))
  );
}

/**
 * Decides if a node is an integer.
 *
 * @param node The node in question.
 * @returns True if the node is an integer.
 */
function isInteger_(node: Element): boolean {
  return (
    node.tagName === SemanticType.NUMBER &&
    node.hasAttribute('role') &&
    node.getAttribute('role') === SemanticRole.INTEGER
  );
}

/**
 * Decides if a node is an index structure, i.e., identifier or integer.
 *
 * @param node The node in question.
 * @returns True if the node is an index.
 */
function allIndices_(node: Element): boolean {
  const nodes = XpathUtil.evalXPath('children/*', node);
  return nodes.every(
    (x: Element) => isInteger_(x) || x.tagName === SemanticType.IDENTIFIER
  );
}

/**
 * Query function that decides if a table has only simple cells.
 *
 * @param node The table node.
 * @returns The node if the table only has simple cells.
 */
export function allCellsSimple(node: Element): Element[] {
  const xpath =
    node.tagName === SemanticType.MATRIX
      ? 'children/row/children/cell/children/*'
      : 'children/line/children/*';
  const nodes = XpathUtil.evalXPath(xpath, node);
  const result = nodes.every(simpleCell_);
  return result ? [node] : [];
}

/**
 * Custom query function to check if a vulgar fraction is small enough to be
 * spoken as numbers in MathSpeak.
 *
 * @param node Fraction node to be tested.
 * @returns List containing the node if it is eligible. Otherwise
 *     empty.
 */
export function isSmallVulgarFraction(node: Element): Element[] {
  return vulgarFractionSmall(node, 20, 11) ? [node] : [];
}

/**
 * Translates a node into a word for an ordinal exponent.
 *
 * @param node The node to translate.
 * @returns The ordinal exponent as a word.
 */
export function ordinalExponent(node: Element): Span[] {
  const num = parseInt(node.textContent, 10);
  return [
    Span.stringEmpty(
      isNaN(num)
        ? node.textContent
        : num > 10
          ? LOCALE.NUMBERS.numericOrdinal(num)
          : LOCALE.NUMBERS.wordOrdinal(num)
    )
  ];
}

let NESTING_DEPTH: string | null = null;

/**
 * Computes the nesting depth of a fenced expressions.
 *
 * @param node The fenced node.
 * @returns The nesting depth as an ordinal number.
 */
export function nestingDepth(node: Element): Span[] {
  let count = 0;
  const fence = (node as Element).textContent;
  const index = node.getAttribute('role') === 'open' ? 0 : 1;
  let parent = node.parentNode as Element;
  while (parent) {
    if (
      parent.tagName === SemanticType.FENCED &&
      parent.childNodes[0].childNodes[index].textContent === fence
    ) {
      count++;
    }
    parent = parent.parentNode as Element;
  }
  NESTING_DEPTH = count > 1 ? LOCALE.NUMBERS.wordOrdinal(count) : '';
  return [Span.stringEmpty(NESTING_DEPTH)];
}

/**
 * Query function for matching fences.
 *
 * @param node The node to test.
 * @returns The node if it has matching fences.
 */
export function matchingFences(node: Element): Element[] {
  const sibling = node.previousSibling;
  let left, right;
  if (sibling) {
    left = sibling;
    right = node;
  } else {
    left = node;
    right = node.nextSibling;
  }
  if (!right) {
    // this case should not happen!
    return [];
  }
  return isMatchingFence(left.textContent, right.textContent) ? [node] : [];
}

/**
 * Correction function for inserting nesting depth (second, third, etc.) between
 * open and close fence indicator.
 *
 * @param text The original text, e.g., open paren, close paren.
 * @param correction The nesting depth as correction text.
 * @returns The corrected text. E.g., open second paren.
 */
function insertNesting(text: string, correction: string): string {
  if (!correction || !text) {
    return text;
  }
  const start = text.match(/^(open|close) /);
  if (!start) {
    return correction + ' ' + text;
  }
  return start[0] + correction + ' ' + text.substring(start[0].length);
}

Grammar.getInstance().setCorrection('insertNesting', insertNesting);

/**
 * Query function that decides for an implicit times node, if it has fenced
 * arguments only.
 *
 * @param node The implicit times node.
 * @returns The node if it has fenced arguments only.
 */
export function fencedArguments(node: Element): Element[] {
  const content = DomUtil.toArray(node.parentNode.childNodes);
  const children = XpathUtil.evalXPath('../../children/*', node) as Element[];
  const index = content.indexOf(node);
  return fencedFactor_(children[index]) || fencedFactor_(children[index + 1])
    ? [node]
    : [];
}
/**
 * Query function that decides for an implicit times node, if it has simple (in
 * the clearspeak sense) arguments only.
 *
 * @param node The implicit times node.
 * @returns The node if it has at most three simple arguments.
 */
export function simpleArguments(node: Element): Element[] {
  const content = DomUtil.toArray(node.parentNode.childNodes);
  const children = XpathUtil.evalXPath('../../children/*', node) as Element[];
  const index = content.indexOf(node);
  return simpleFactor_(children[index]) &&
    children[index + 1] &&
    (simpleFactor_(children[index + 1]) ||
      children[index + 1].tagName === SemanticType.ROOT ||
      children[index + 1].tagName === SemanticType.SQRT ||
      (children[index + 1].tagName === SemanticType.SUPERSCRIPT &&
        children[index + 1].childNodes[0].childNodes[0] &&
        ((children[index + 1].childNodes[0].childNodes[0] as Element)
          .tagName === SemanticType.NUMBER ||
          (children[index + 1].childNodes[0].childNodes[0] as Element)
            .tagName === SemanticType.IDENTIFIER) &&
        (children[index + 1].childNodes[0].childNodes[1].textContent === '2' ||
          children[index + 1].childNodes[0].childNodes[1].textContent === '3')))
    ? [node]
    : [];
}
/**
 * Decides if node has a simple factor.
 *
 * @param node The node in question.
 * @returns True if the node is a number, identifier, function or
 *     applicatio or a fraction.
 */
function simpleFactor_(node: Element): boolean {
  return (
    !!node &&
    (node.tagName === SemanticType.NUMBER ||
      node.tagName === SemanticType.IDENTIFIER ||
      node.tagName === SemanticType.FUNCTION ||
      node.tagName === SemanticType.APPL ||
      // This works as fractions take care of their own
      // surrounding pauses!
      node.tagName === SemanticType.FRACTION)
  );
}

/**
 * Decides if node has a fenced factor expression.
 *
 * @param node The node in question.
 * @returns True if the node is a fenced on both sides or a matrix or
 *     vector.
 */
function fencedFactor_(node: Element): boolean {
  return (
    node &&
    (node.tagName === SemanticType.FENCED ||
      (node.hasAttribute('role') &&
        node.getAttribute('role') === SemanticRole.LEFTRIGHT) ||
      layoutFactor_(node))
  );
}

/**
 * Decides if node has a layout factor, i.e., matrix or vector.
 *
 * @param node The node in question.
 * @returns True if the node is a matrix or vector.
 */
function layoutFactor_(node: Element): boolean {
  return (
    !!node &&
    (node.tagName === SemanticType.MATRIX ||
      node.tagName === SemanticType.VECTOR)
  );
}

// TODO: Move this into the number utils.
/**
 * Translates a node into a word for an ordinal number.
 *
 * @param node The node to translate.
 * @returns The ordinal as a word.
 */
export function wordOrdinal(node: Element): Span[] {
  return [
    Span.stringEmpty(LOCALE.NUMBERS.wordOrdinal(parseInt(node.textContent, 10)))
  ];
}

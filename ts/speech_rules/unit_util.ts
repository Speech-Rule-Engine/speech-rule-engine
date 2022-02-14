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
 * @file Utility functions for dealing with units.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import { AuditoryDescription } from '../audio/auditory_description.js';
import * as XpathUtil from '../common/xpath_util.js';
import { LOCALE } from '../l10n/locale.js';
import { SemanticType } from '../semantic_tree/semantic_meaning.js';

/**
 * Iterates over the list of content nodes of a multiplication of units and
 * ensures that a multiplication operator is put between proper unit
 * expressions.
 *
 * @param nodes A node array.
 * @param _context A context string.
 * @returns A closure that returns
 *     the unit multiplied between two proper unit expressions, otherwise the
 *     empty string.
 */
export function unitMultipliers(
  nodes: Element[],
  _context: string
): () => AuditoryDescription[] {
  const children = nodes;
  let counter = 0;
  return function () {
    const descr = AuditoryDescription.create(
      {
        text:
          rightMostUnit(children[counter]) &&
          leftMostUnit(children[counter + 1])
            ? LOCALE.MESSAGES.unitTimes
            : ''
      },
      {}
    );
    counter++;
    return [descr];
  };
}

const SCRIPT_ELEMENTS: string[] = [
  SemanticType.SUPERSCRIPT,
  SemanticType.SUBSCRIPT,
  SemanticType.OVERSCORE,
  SemanticType.UNDERSCORE
];

/**
 * Tests if node is a right most unit element in a sub-expression.
 *
 * @param node The node to test.
 * @returns True if it is the right most unit in that subtree.
 */
export function rightMostUnit(node: Element): boolean {
  while (node) {
    if (node.getAttribute('role') === 'unit') {
      return true;
    }
    const tag = node.tagName;
    const children = XpathUtil.evalXPath('children/*', node);
    node = (
      SCRIPT_ELEMENTS.indexOf(tag) !== -1
        ? children[0]
        : children[children.length - 1]
    ) as Element;
  }
  return false;
}
/**
 * Tests if node is a left most unit element in a sub-expression.
 *
 * @param node The node to test.
 * @returns True if it is the left most unit in that subtree.
 */
export function leftMostUnit(node: Element): boolean {
  while (node) {
    if (node.getAttribute('role') === 'unit') {
      return true;
    }
    const children = XpathUtil.evalXPath('children/*', node);
    node = children[0] as Element;
  }
  return false;
}
/**
 * Checks if a given node is preceded by a 1. This is useful to decide if the
 * next text element is singular or plural.
 *
 * @param node The base node.
 * @returns List with the base node if the preceding node (the
 *     next left in the subexpression containing node) is 1. Otherwise empty
 *     list.
 */
export function oneLeft(node: Element): Element[] {
  while (node) {
    if (node.tagName === 'number' && node.textContent === '1') {
      return [node];
    }
    if (
      node.tagName !== 'infixop' ||
      (node.getAttribute('role') !== 'multiplication' &&
        node.getAttribute('role') !== 'implicit')
    ) {
      return [];
    }
    node = XpathUtil.evalXPath('children/*', node)[0] as Element;
  }
  return [];
}

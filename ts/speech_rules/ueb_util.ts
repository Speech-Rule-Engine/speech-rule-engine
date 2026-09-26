//
// Copyright 2026 Volker Sorge
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
 * @file Utility functions for UEB Braille rules.
 * @author v.sorge@mathjax.org (Volker Sorge)
 */

import { AuditoryDescription } from '../audio/auditory_description.js';
import * as DomUtil from '../common/dom_util.js';
import { Engine } from '../common/engine.js';
import * as XpathUtil from '../common/xpath_util.js';

/**
 * Iterates over content nodes. UEB spaces comparison operators, but ordinary
 * binary operators are not spaced.
 *
 * @param nodes A node array.
 * @param context A context string.
 * @returns A closure that returns the next content node.
 */
export function contentIterator(
  nodes: Element[],
  context: string
): () => AuditoryDescription[] {
  let contentNodes: Element[];
  if (nodes.length > 0) {
    contentNodes = XpathUtil.evalXPath(
      '../../content/*',
      nodes[0]
    ) as Element[];
  } else {
    contentNodes = [];
  }
  const parent = nodes[0]?.parentNode?.parentNode as Element;
  const scriptParent = parent?.parentNode?.parentNode as Element;
  const scriptParentTag = scriptParent?.tagName
    ? DomUtil.tagName(scriptParent)
    : '';
  const inLimitScript =
    scriptParent &&
    ['LIMBOTH', 'LIMLOWER', 'LIMUPPER'].indexOf(scriptParentTag) !== -1;
  const spaced =
    parent &&
    !inLimitScript &&
    (['RELSEQ', 'MULTIREL'].indexOf(DomUtil.tagName(parent)) !== -1 ||
      parent.getAttribute('role') === 'element');
  let childIndex = 0;
  return function () {
    const content = contentNodes.shift();
    const leftNode = nodes[childIndex];
    const nextNode = nodes[childIndex + 1];
    childIndex++;
    const nextIsEmpty = nextNode && DomUtil.tagName(nextNode) === 'EMPTY';
    const contextDescr = context
      ? [AuditoryDescription.create({ text: context }, { translate: true })]
      : [];
    if (!content) {
      return contextDescr;
    }
    const descrs = Engine.evaluateNode(content);
    const unspaced = content.getAttribute('role') === 'geometry';
    if (
      parent?.getAttribute('role') === 'implicit' &&
      ((content.getAttribute('role') === 'space' &&
        isLeftPrescript(nextNode)) ||
        spacesImplicitProduct(leftNode, nextNode) ||
        spacesChemicalState(leftNode, nextNode))
    ) {
      return contextDescr.concat([
        AuditoryDescription.create({ text: 'W' }, { translate: false })
      ]);
    }
    return spaced && !unspaced
      ? contextDescr.concat(
          [AuditoryDescription.create({ text: 'W' }, { translate: false })],
          descrs,
          nextIsEmpty
            ? []
            : [AuditoryDescription.create({ text: 'W' }, { translate: false })]
        )
      : contextDescr.concat(descrs);
  };
}

/**
 * Separates function application children when UEB needs a blank to avoid
 * forming a different letter sequence.
 *
 * @param nodes A node array.
 * @param context A context string.
 * @returns A closure that returns the next separator.
 */
export function applicationIterator(
  nodes: Element[],
  context: string
): () => AuditoryDescription[] {
  let childIndex = 0;
  return function () {
    const leftNode = nodes[childIndex];
    const rightNode = nodes[childIndex + 1];
    childIndex++;
    const contextDescr = context
      ? [AuditoryDescription.create({ text: context }, { translate: true })]
      : [];
    return spacesFunctionApplication(leftNode, rightNode) ||
      spacesChemicalState(leftNode, rightNode)
      ? contextDescr.concat([
          AuditoryDescription.create({ text: 'W' }, { translate: false })
        ])
      : contextDescr;
  };
}

/**
 * Tests whether a node is an empty-base superscript used as a left prescript.
 *
 * @param node The node to test.
 * @returns True if the node is a left prescript.
 */
function isLeftPrescript(node: Element): boolean {
  return !!(
    node &&
    DomUtil.tagName(node) === 'SUPERSCRIPT' &&
    XpathUtil.evalXPath('./children/*[1][self::empty]', node).length
  );
}

/**
 * Tests whether a chemical state follows a chemical term.
 *
 * @param leftNode The chemical term.
 * @param rightNode The possible state annotation.
 * @returns True if UEB needs a blank before the state annotation.
 */
function spacesChemicalState(leftNode: Element, rightNode: Element): boolean {
  return isChemicalTerm(leftNode) && isChemicalState(rightNode);
}

/**
 * Tests whether a node is a chemical term that can take a state annotation.
 *
 * @param node The node to test.
 * @returns True if the node is a chemical term.
 */
function isChemicalTerm(node: Element): boolean {
  if (!node) {
    return false;
  }
  if (DomUtil.tagName(node) === 'IDENTIFIER') {
    return (
      node.getAttribute('font') === 'normal' &&
      /^[A-Z][A-Za-z]*$/.test(node.textContent || '')
    );
  }
  if (['SUBSCRIPT', 'SUPERSCRIPT'].indexOf(DomUtil.tagName(node)) === -1) {
    return false;
  }
  const base = XpathUtil.evalXPath('./children/*[1]', node)[0] as Element;
  return isChemicalTerm(base);
}

/**
 * Tests whether a fenced node is a chemical state such as (g) or (aq).
 *
 * @param node The node to test.
 * @returns True if the node is a chemical state.
 */
function isChemicalState(node: Element): boolean {
  if (!node || DomUtil.tagName(node) !== 'FENCED') {
    return false;
  }
  const children = XpathUtil.evalXPath('./children/*', node) as Element[];
  return !!(
    children.length === 1 &&
    DomUtil.tagName(children[0]) === 'IDENTIFIER' &&
    children[0].getAttribute('font') === 'normal' &&
    /^(?:aq|g|l|s)$/.test(children[0].textContent || '')
  );
}

/**
 * Tests whether an implicit product needs an intervening UEB blank.
 *
 * @param leftNode The node before the implicit operator.
 * @param rightNode The node after the implicit operator.
 * @returns True if UEB needs an intervening blank.
 */
function spacesImplicitProduct(leftNode: Element, rightNode: Element): boolean {
  if (!leftNode || !rightNode || DomUtil.tagName(leftNode) === 'NUMBER') {
    return false;
  }
  if (isMultiLetterIdentifier(leftNode) && isLowercaseLatinLetter(rightNode)) {
    return true;
  }
  if (isLowercaseFunctionApplication(rightNode)) {
    return !hasGreekArgument(rightNode);
  }
  return false;
}

/**
 * Tests whether a node is a multi-letter identifier.
 *
 * @param node The node to test.
 * @returns True if the node is a multi-letter identifier.
 */
function isMultiLetterIdentifier(node: Element): boolean {
  return (
    DomUtil.tagName(node) === 'IDENTIFIER' &&
    (node.textContent || '').length > 1
  );
}

/**
 * Tests whether a node is a lowercase Latin letter.
 *
 * @param node The node to test.
 * @returns True if the node is a lowercase Latin letter.
 */
function isLowercaseLatinLetter(node: Element): boolean {
  return (
    DomUtil.tagName(node) === 'IDENTIFIER' &&
    node.getAttribute('role') === 'latinletter' &&
    /^[a-z]$/.test(node.textContent || '')
  );
}

/**
 * Tests whether a semantic application has a Greek-letter argument.
 *
 * @param node The application node.
 * @returns True if the argument is a Greek letter.
 */
function hasGreekArgument(node: Element): boolean {
  const children = XpathUtil.evalXPath('./children/*', node) as Element[];
  return !!(
    children[1] &&
    DomUtil.tagName(children[1]) === 'IDENTIFIER' &&
    children[1].getAttribute('role') === 'greekletter'
  );
}

/**
 * Tests whether a function application needs an intervening UEB blank.
 *
 * @param leftNode The function node.
 * @param rightNode The argument node.
 * @returns True if UEB needs an intervening blank.
 */
function spacesFunctionApplication(
  leftNode: Element,
  rightNode: Element
): boolean {
  if (!leftNode || !rightNode || !isLowercaseFunction(leftNode)) {
    return false;
  }
  return (
    DomUtil.tagName(rightNode) === 'IDENTIFIER' &&
    rightNode.getAttribute('role') === 'latinletter' &&
    /^[a-z]$/.test(rightNode.textContent || '')
  );
}

/**
 * Tests whether a node is a lowercase function application.
 *
 * @param node The node to test.
 * @returns True if the node is an application headed by a lowercase function.
 */
function isLowercaseFunctionApplication(node: Element): boolean {
  if (DomUtil.tagName(node) !== 'APPL') {
    return false;
  }
  const children = XpathUtil.evalXPath('./children/*', node) as Element[];
  return isLowercaseFunction(children[0]);
}

/**
 * Tests whether a node is a lowercase semantic function.
 *
 * @param node The node to test.
 * @returns True if the node is a lowercase function node.
 */
function isLowercaseFunction(node: Element): boolean {
  return (
    !!node &&
    ['FUNCTION', 'IDENTIFIER'].indexOf(DomUtil.tagName(node)) !== -1 &&
    /^[a-z]/.test(node.textContent || '')
  );
}

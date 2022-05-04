//
// Copyright 2013 Google Inc.
// Copyright 2014-21 Volker Sorge
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
 * @file Predicates collection for semantic tree generation.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import * as SemanticAttr from './semantic_attr';
import { SemanticRole, SemanticType } from './semantic_meaning';
import { SemanticNode } from './semantic_node';
import { getEmbellishedInner } from './semantic_util';

/**
 * Checks if a node is of the given type.
 *
 * @param node The node.
 * @param attr The type attribute.
 * @returns True if node has that type.
 */
export function isType(node: SemanticNode, attr: SemanticType): boolean {
  return node.type === attr;
}

/**
 * Checks if a node is of the given embellished type.
 *
 * @param node The node.
 * @param attr The embellished attribute.
 * @returns True if node has that embellished type.
 */
export function embellishedType(
  node: SemanticNode,
  attr: SemanticType
): boolean {
  return node.embellished === attr;
}

/**
 * Checks if a node is of the given role.
 *
 * @param node The node.
 * @param attr The role attribute.
 * @returns True if node has that role.
 */
export function isRole(node: SemanticNode, attr: SemanticRole): boolean {
  return node.role === attr;
}

/**
 * Checks whether a character can be considered as accent.
 *
 * @param node The node to be tested.
 * @returns True if the node is a punctuation, fence or operator.
 */
export function isAccent(node: SemanticNode): boolean {
  const inftyReg = new RegExp('∞|᪲');
  return (
    isType(node, SemanticType.FENCE) ||
    isType(node, SemanticType.PUNCTUATION) ||
    // TODO (sorge) Simplify this once meaning of all characters is fully
    // defined. Improve dealing with Infinity.
    (isType(node, SemanticType.OPERATOR) &&
      !node.textContent.match(inftyReg)) ||
    isType(node, SemanticType.RELATION) ||
    (isType(node, SemanticType.IDENTIFIER) &&
      isRole(node, SemanticRole.UNKNOWN) &&
      !node.textContent.match(SemanticAttr.allLettersRegExp) &&
      !node.textContent.match(inftyReg))
  );
}

/**
 * Predicate implementing the boundary criteria for detecting simple functions:
 * 1. No arguments, e.g., f()
 * 2. Any arguments with the exception of:
 *  - Infix operations other than implicit multiplication.
 *
 * @param node A semantic node of type fenced.
 * @returns True if the node meets the boundary criteria.
 */
export function isSimpleFunctionScope(node: SemanticNode): boolean {
  const children = node.childNodes;
  if (children.length === 0) {
    return true;
  }
  if (children.length > 1) {
    return false;
  }
  const child = children[0];
  if (child.type === SemanticType.INFIXOP) {
    if (child.role !== SemanticRole.IMPLICIT) {
      return false;
    }
    if (child.childNodes.some((x) => isType(x, SemanticType.INFIXOP))) {
      return false;
    }
  }
  return true;
}

/**
 * Predicate implementing the boundary criteria for prefix functions.
 * 1. an explicit operator,
 * 2. another function application,
 * 3. a relation symbol, or
 * 4. some punctuation.
 *
 * @param node A semantic node.
 * @returns True if the node meets the boundary criteria.
 */
export function isPrefixFunctionBoundary(node: SemanticNode): boolean {
  return (
    (isOperator(node) && !isRole(node, SemanticRole.DIVISION)) ||
    isType(node, SemanticType.APPL) ||
    isGeneralFunctionBoundary(node)
  );
}

/**
 * Predicate implementing the boundary criteria for big operators:
 * 1. an explicit operator,
 * 2. a relation symbol, or
 * 3. some punctuation.
 *
 * @param node A semantic node.
 * @returns True if the node meets the boundary criteria.
 */
export function isBigOpBoundary(node: SemanticNode): boolean {
  return isOperator(node) || isGeneralFunctionBoundary(node);
}

/**
 * Predicate implementing the boundary criteria for integrals dx on two nodes.
 *
 * @param firstNode A semantic node.
 * @param secondNode The direct neighbour of first
 *     Node.
 * @returns True if the second node exists and the first node is a 'd'.
 */
export function isIntegralDxBoundary(
  firstNode: SemanticNode,
  secondNode: SemanticNode
): boolean {
  return (
    !!secondNode &&
    isType(secondNode, SemanticType.IDENTIFIER) &&
    SemanticAttr.lookupSecondary('d', firstNode.textContent)
  );
}

/**
 * Predicate implementing the boundary criteria for integrals dx on a single
 * node.
 *
 * @param node A semantic node.
 * @returns True if the node meets the boundary criteria.
 */
export function isIntegralDxBoundarySingle(node: SemanticNode): boolean {
  if (isType(node, SemanticType.IDENTIFIER)) {
    const firstChar = node.textContent[0];
    return (
      firstChar &&
      node.textContent[1] &&
      SemanticAttr.lookupSecondary('d', firstChar)
    );
  }
  return false;
}

/**
 * Predicate implementing the general boundary criteria for function operators:
 * 1. a relation symbol,
 * 2. some punctuation.
 *
 * @param node A semantic node.
 * @returns True if the node meets the boundary criteria.
 */
export function isGeneralFunctionBoundary(node: SemanticNode): boolean {
  return isRelation(node) || isPunctuation(node);
}

/**
 * Determines if a node is embellished and returns its type in case it is.
 *
 * @param node A node to test.
 * @returns The type of the node that is embellished.
 */
export function isEmbellished(node: SemanticNode): SemanticType | null {
  if (node.embellished) {
    return node.embellished;
  }
  if (SemanticAttr.isEmbellishedType(node.type)) {
    return node.type;
  }
  return null;
}

/**
 * Determines if a node is an operator, regular or embellished.
 *
 * @param node A node to test.
 * @returns True if the node is considered as operator.
 */
export function isOperator(node: SemanticNode): boolean {
  return (
    isType(node, SemanticType.OPERATOR) ||
    embellishedType(node, SemanticType.OPERATOR)
  );
}

/**
 * Determines if a node is an relation, regular or embellished.
 *
 * @param node A node to test.
 * @returns True if the node is considered as relation.
 */
export function isRelation(node: SemanticNode): boolean {
  return (
    isType(node, SemanticType.RELATION) ||
    embellishedType(node, SemanticType.RELATION)
  );
}

/**
 * Determines if a node is an punctuation, regular or embellished.
 *
 * @param node A node to test.
 * @returns True if the node is considered as punctuation.
 */
export function isPunctuation(node: SemanticNode): boolean {
  return (
    isType(node, SemanticType.PUNCTUATION) ||
    embellishedType(node, SemanticType.PUNCTUATION)
  );
}

/**
 * Determines if a node is an fence, regular or embellished.
 *
 * @param node A node to test.
 * @returns True if the node is considered as fence.
 */
export function isFence(node: SemanticNode): boolean {
  return (
    isType(node, SemanticType.FENCE) ||
    embellishedType(node, SemanticType.FENCE)
  );
}

/**
 * Determines if a fence is eligible.
 *
 * Currently fences are not eligible if they are opening fences with right
 * indices, closing fences with left indices or fences with both left and right
 * indices.
 *
 * @param node A node to test.
 * @returns True if the node is considered as fence.
 */
export function isElligibleEmbellishedFence(node: SemanticNode): boolean {
  if (!node || !isFence(node)) {
    return false;
  }
  if (!node.embellished) {
    return true;
  }
  return recurseBaseNode(node);
}

/**
 * Predicate to check if indexes either side of a tensor node are empty.
 *
 * @param node The tensor node.
 * @returns True if tensor node with both sides having content.
 */
function bothSide(node: SemanticNode): boolean {
  return (
    isType(node, SemanticType.TENSOR) &&
    (!isType(node.childNodes[1], SemanticType.EMPTY) ||
      !isType(node.childNodes[2], SemanticType.EMPTY)) &&
    (!isType(node.childNodes[3], SemanticType.EMPTY) ||
      !isType(node.childNodes[4], SemanticType.EMPTY))
  );
}

/**
 * Recursively checks a node if it is an eligible fence node.
 *
 * @param node The tensor node.
 * @returns True if it is a legitimate fence node.
 */
function recurseBaseNode(node: SemanticNode): boolean {
  if (!node.embellished) {
    return true;
  }
  if (bothSide(node)) {
    return false;
  }
  if (isRole(node, SemanticRole.CLOSE) && isType(node, SemanticType.TENSOR)) {
    return false;
  }
  if (
    isRole(node, SemanticRole.OPEN) &&
    (isType(node, SemanticType.SUBSCRIPT) ||
      isType(node, SemanticType.SUPERSCRIPT))
  ) {
    return false;
  }
  return recurseBaseNode(node.childNodes[0]);
}

/**
 * Decides if a node is a table or multiline element.
 *
 * @param node A node.
 * @returns True if node is either table or multiline.
 */
export function isTableOrMultiline(node: SemanticNode): boolean {
  return (
    !!node &&
    (isType(node, SemanticType.TABLE) || isType(node, SemanticType.MULTILINE))
  );
}

/**
 * Heuristic to decide if we have a matrix: An expression fenced on both sides
 * without any other content is considered a fenced node.
 *
 * @param node A node.
 * @returns True if we believe we have a matrix.
 */
export function tableIsMatrixOrVector(node: SemanticNode): boolean {
  return (
    !!node && isFencedElement(node) && isTableOrMultiline(node.childNodes[0])
  );
}

/**
 * Decides if a node is a single, simply fenced element.
 *
 * @param node A node.
 * @returns True if the node is fence left right or neutral with a
 *     single contained element.
 */
export function isFencedElement(node: SemanticNode): boolean {
  return (
    !!node &&
    isType(node, SemanticType.FENCED) &&
    (isRole(node, SemanticRole.LEFTRIGHT) || isNeutralFence(node)) &&
    node.childNodes.length === 1
  );
}

/**
 * Heuristic to decide if we have a case statement: An expression with a
 * singular open fence before it.
 *
 * @param _table A table node.
 * @param prevNodes A list of previous nodes.
 * @returns True if we believe we have a case statement.
 */
export function tableIsCases(
  _table: SemanticNode,
  prevNodes: SemanticNode[]
): boolean {
  return (
    prevNodes.length > 0 &&
    isRole(prevNodes[prevNodes.length - 1], SemanticRole.OPENFENCE)
  );
}

/**
 * Heuristic to decide if we have a multiline formula. A table is considered a
 * multiline formula if it does not have any separate cells.
 *
 * @param table A table node.
 * @returns True if we believe we have a mulitline formula.
 */
export function tableIsMultiline(table: SemanticNode): boolean {
  return table.childNodes.every(function (row) {
    const length = row.childNodes.length;
    return length <= 1;
  });
}

/**
 * Determines if this is a labelled line.
 *
 * @param line The line element.
 * @returns True if the element is a line and has a label as a content node.
 */
export function lineIsLabelled(line: SemanticNode): boolean {
  return (
    isType(line, SemanticType.LINE) &&
    line.contentNodes.length &&
    isRole(line.contentNodes[0], SemanticRole.LABEL)
  );
}

/**
 * Heuristic to decide if a table has a binomial form.
 *
 * @param table A table node.
 * @returns True if it is a binomial form.
 */
export function isBinomial(table: SemanticNode): boolean {
  return table.childNodes.length === 2;
}

/**
 * Heuristic to decide if a node is a suitable center of a limit node.
 *
 * @param node The center node.
 * @returns True if node is a large operator, already a limit node or a
 *    limit function.
 */
export function isLimitBase(node: SemanticNode): boolean {
  return (
    isType(node, SemanticType.LARGEOP) ||
    isType(node, SemanticType.LIMBOTH) ||
    isType(node, SemanticType.LIMLOWER) ||
    isType(node, SemanticType.LIMUPPER) ||
    (isType(node, SemanticType.FUNCTION) &&
      isRole(node, SemanticRole.LIMFUNC)) ||
    ((isType(node, SemanticType.OVERSCORE) ||
      isType(node, SemanticType.UNDERSCORE)) &&
      isLimitBase(node.childNodes[0] as SemanticNode))
  );
}

/**
 * Predicate deciding whether a symbol is the head of a simple function.
 *
 * @param node A semantic node.
 * @returns True if node is an identifier or a simple letter.
 */
export function isSimpleFunctionHead(node: SemanticNode): boolean {
  return (
    node.type === SemanticType.IDENTIFIER ||
    node.role === SemanticRole.LATINLETTER ||
    node.role === SemanticRole.GREEKLETTER ||
    node.role === SemanticRole.OTHERLETTER
  );
}

/**
 * Given a list of punctuated node and their containing puncutations, decides if
 * there is exactly one punctuation, which is at the given position. Will
 * therefore return false if the puncutation is a dummy in a text sequence.
 *
 * @param nodes A list of punctuated nodes.
 * @param puncts The associated punctuations.
 * @param position The position in nodes to test for puncutation.
 * @returns True if puncts is a singleton and is the indeed the
 *     punctuation at the given position.
 */
export function singlePunctAtPosition(
  nodes: SemanticNode[],
  puncts: SemanticNode[],
  position: number
): boolean {
  return (
    puncts.length === 1 &&
    (nodes[position].type === SemanticType.PUNCTUATION ||
      nodes[position].embellished === SemanticType.PUNCTUATION) &&
    nodes[position] === puncts[0]
  );
}

/**
 * Is the node a simple function?
 *
 * @param node The node.
 * @returns True if node is an identifier with role simple function.
 */
export function isSimpleFunction(node: SemanticNode): boolean {
  return (
    isType(node, SemanticType.IDENTIFIER) &&
    isRole(node, SemanticRole.SIMPLEFUNC)
  );
}

/**
 * Is the node a left brace?
 *
 * @param node The node.
 * @returns True if the node is a left brace.
 */
export function isLeftBrace(node: SemanticNode): boolean {
  const leftBrace = ['{', '﹛', '｛'];
  // ['0x007B', '0xFE5B', '0xFF5B'];
  return !!node && leftBrace.indexOf(node.textContent) !== -1;
}

/**
 * Is the node a right brace?
 *
 * @param node The node.
 * @returns True if the node is a right brace.
 */
export function isRightBrace(node: SemanticNode): boolean {
  const rightBrace = ['}', '﹜', '｝'];
  // ['0x007D', '0xFE5C', '0xFF5D'];
  return !!node && rightBrace.indexOf(node.textContent) !== -1;
}

/**
 * Is the node a set like node, i.e., a fenced node with braces.
 *
 * @param node The node.
 * @returns True if the node is a set.
 */
export function isSetNode(node: SemanticNode): boolean {
  return (
    isLeftBrace(node.contentNodes[0]) && isRightBrace(node.contentNodes[1])
  );
}

// TODO: Rewrite as dictionary or map!
export const illegalSingleton_: SemanticType[] = [
  SemanticType.PUNCTUATION,
  SemanticType.PUNCTUATED,
  SemanticType.RELSEQ,
  SemanticType.MULTIREL,
  SemanticType.TABLE,
  SemanticType.MULTILINE,
  SemanticType.CASES,
  SemanticType.INFERENCE
];

export const scriptedElement_: SemanticType[] = [
  SemanticType.LIMUPPER,
  SemanticType.LIMLOWER,
  SemanticType.LIMBOTH,
  SemanticType.SUBSCRIPT,
  SemanticType.SUPERSCRIPT,
  SemanticType.UNDERSCORE,
  SemanticType.OVERSCORE,
  SemanticType.TENSOR
];

/**
 * Is the node a likely candidate for a singleton set element.
 *
 * @param node The node.
 * @returns True if the node is a set.
 */
export function isSingletonSetContent(node: SemanticNode): boolean {
  const type = node.type;
  if (
    illegalSingleton_.indexOf(type) !== -1 ||
    (type === SemanticType.INFIXOP && node.role !== SemanticRole.IMPLICIT)
  ) {
    return false;
  }
  if (type === SemanticType.FENCED) {
    return node.role === SemanticRole.LEFTRIGHT
      ? isSingletonSetContent(node.childNodes[0])
      : true;
  }
  if (scriptedElement_.indexOf(type) !== -1) {
    return isSingletonSetContent(node.childNodes[0]);
  }
  return true;
}

/**
 * Tests if a number an integer or a decimal.
 *
 * @param node The semantic node.
 * @returns True if the number is an integer or a decimal.
 */
export function isNumber(node: SemanticNode): boolean {
  return (
    node.type === SemanticType.NUMBER &&
    (node.role === SemanticRole.INTEGER || node.role === SemanticRole.FLOAT)
  );
}

/**
 * Tests if a node is elligible as a unit counter. I.e., an integer or a
 * decimal, a vulgar fraction or a mixed number.
 *
 * Note, that minus prefixes become negative sign of the entire unit expression.
 *
 * @param node The semantic node.
 * @returns True if the number is an integer or a decimal.
 */
export function isUnitCounter(node: SemanticNode): boolean {
  return (
    isNumber(node) ||
    node.role === SemanticRole.VULGAR ||
    node.role === SemanticRole.MIXED
  );
}

/**
 * Tests if a node is pure unit, i.e., a singleton unit or a unit expression
 * without a counter.
 *
 * @param node The semantic node.
 * @returns True if the node is a pure unit expression.
 */
export function isPureUnit(node: SemanticNode): boolean {
  const children = node.childNodes;
  return (
    node.role === SemanticRole.UNIT &&
    (!children.length || children[0].role === SemanticRole.UNIT)
  );
}

/**
 * Tests if a node is an implicit node or a unit node representing an implicit
 * node.
 *
 * @param node The semantic node.
 * @returns True if the node is considered an implicit node.
 */
export function isImplicit(node: SemanticNode): boolean {
  return (
    node.role === SemanticRole.IMPLICIT ||
    (node.role === SemanticRole.UNIT &&
      !!node.contentNodes.length &&
      node.contentNodes[0].textContent === SemanticAttr.invisibleTimes())
  );
}

/**
 * Tests if a node is an implicit operator node only.
 *
 * @param node The semantic node.
 * @returns True if the node is a true implicit operator node.
 */
export function isImplicitOp(node: SemanticNode): boolean {
  return (
    node.type === SemanticType.INFIXOP && node.role === SemanticRole.IMPLICIT
  );
}

/**
 * Determines if a fence is a neutral fence.
 *
 * @param fence Closing fence.
 * @returns True if the fence is neutral or metric.
 */
export function isNeutralFence(fence: SemanticNode): boolean {
  return (
    fence.role === SemanticRole.NEUTRAL || fence.role === SemanticRole.METRIC
  );
}

/**
 * Comparison operation for neutral fences depending on textual equality of the
 * (innermost for embellished) fences.
 *
 * @param fence1 First fence to compare.
 * @param fence2 Second fence to compare.
 * @returns True if both fences are neutral and have same textual
 *     content.
 */
export function compareNeutralFences(
  fence1: SemanticNode,
  fence2: SemanticNode
): boolean {
  return (
    isNeutralFence(fence1) &&
    isNeutralFence(fence2) &&
    getEmbellishedInner(fence1).textContent ===
      getEmbellishedInner(fence2).textContent
  );
}

/**
 * Fence is ellibigle as a left neutral fence, if it is either not embellished
 * or all its embellishments are to the left.
 *
 * @param fence The neutral fence to check.
 * @returns True if fence is elligible.
 */
export function elligibleLeftNeutral(fence: SemanticNode): boolean {
  if (!isNeutralFence(fence)) {
    return false;
  }
  if (!fence.embellished) {
    return true;
  }
  if (
    fence.type === SemanticType.SUPERSCRIPT ||
    fence.type === SemanticType.SUBSCRIPT
  ) {
    return false;
  }
  if (
    fence.type === SemanticType.TENSOR &&
    (fence.childNodes[3].type !== SemanticType.EMPTY ||
      fence.childNodes[4].type !== SemanticType.EMPTY)
  ) {
    return false;
  }
  return true;
}

/**
 * Fence is ellibigle as a right neutral fence, if it is either not embellished
 * or all its embellishments are to the right.
 *
 * @param fence The neutral fence to check.
 * @returns True if fence is elligible.
 */
export function elligibleRightNeutral(fence: SemanticNode): boolean {
  if (!isNeutralFence(fence)) {
    return false;
  }
  if (!fence.embellished) {
    return true;
  }
  if (
    fence.type === SemanticType.TENSOR &&
    (fence.childNodes[1].type !== SemanticType.EMPTY ||
      fence.childNodes[2].type !== SemanticType.EMPTY)
  ) {
    return false;
  }
  return true;
}

/**
 * Tests if the node is a membership relation, i.e., has some
 * element/non-element role.
 *
 * @param element The node to test.
 * @returns True if the role is an element role.
 */
export function isMembership(element: SemanticNode): boolean {
  return [
    SemanticRole.ELEMENT,
    SemanticRole.NONELEMENT,
    SemanticRole.REELEMENT,
    SemanticRole.RENONELEMENT
  ].includes(element.role);
}

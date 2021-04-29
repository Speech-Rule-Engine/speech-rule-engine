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
 * @fileoverview Predicates collection for semantic tree generation.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import {SemanticAttr} from './semantic_attr';
import {SemanticNode} from './semantic_node';


/**
 * Constructs a predicate to check the semantic attribute of a node.
 * @param prop The property of a node.
 * @param attr The attribute.
 * @return The predicate.
 */
export function isAttribute(prop: string, attr: string): (p1: SemanticNode) =>
    boolean {
  let getAttr = function(prop) {
    switch (prop) {
      case 'role':
        return SemanticAttr.Role[attr];
      case 'font':
        return SemanticAttr.Font[attr];
      case 'embellished':
      case 'type':
      default:
        return SemanticAttr.Type[attr];
    }
  };

  return function(node) {
    return node[prop] === getAttr(prop);
  };
}


/**
 * Checks whether a character can be considered as accent.
 * @param node The node to be tested.
 * @return True if the node is a punctuation, fence or operator.
 */
export function isAccent(node: SemanticNode): boolean {
  return isAttribute('type', 'FENCE')(node) ||
      isAttribute('type', 'PUNCTUATION')(node) ||
      // TODO (sorge) Simplify this once meaning of all characters is fully
      // defined. Improve dealing with Infinity.
      isAttribute('type', 'OPERATOR')(node) &&
      !node.textContent.match(new RegExp('∞|᪲')) ||
      isAttribute('type', 'RELATION')(node) ||
      isAttribute('type', 'IDENTIFIER')(node) &&
      isAttribute('role', 'UNKNOWN')(node) &&
      !node.textContent.match(new RegExp(
          SemanticAttr.getInstance().allLetters.join('|') + '|∞|᪲'));
}


/**
 * Predicate implementing the boundary criteria for detecting simple functions:
 * 1. No arguments, e.g., f()
 * 2. Any arguments with the exception of:
 *  - Infix operations other than implicit multiplication.
 *
 * @param node A semantic node of type fenced.
 * @return True if the node meets the boundary criteria.
 */
export function isSimpleFunctionScope(node: SemanticNode): boolean {
  let children = node.childNodes;
  if (children.length === 0) {
    return true;
  }
  if (children.length > 1) {
    return false;
  }
  let child = children[0];
  if (child.type === SemanticAttr.Type.INFIXOP) {
    if (child.role !== SemanticAttr.Role.IMPLICIT) {
      return false;
    }
    if (child.childNodes.some(isAttribute('type', 'INFIXOP'))) {
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
 * @param node A semantic node.
 * @return True if the node meets the boundary criteria.
 */
export function isPrefixFunctionBoundary(node: SemanticNode): boolean {
  return isOperator(node) && !isAttribute('role', 'DIVISION')(node) ||
      isAttribute('type', 'APPL')(node) || isGeneralFunctionBoundary(node);
}


/**
 * Predicate implementing the boundary criteria for big operators:
 * 1. an explicit operator,
 * 2. a relation symbol, or
 * 3. some punctuation.
 * @param node A semantic node.
 * @return True if the node meets the boundary criteria.
 */
export function isBigOpBoundary(node: SemanticNode): boolean {
  return isOperator(node) || isGeneralFunctionBoundary(node);
}


/**
 * Predicate implementing the boundary criteria for integrals dx on two nodes.
 * @param firstNode A semantic node.
 * @param secondNode The direct neighbour of first
 *     Node.
 * @return True if the second node exists and the first node is a 'd'.
 */
export function isIntegralDxBoundary(
    firstNode: SemanticNode, secondNode: SemanticNode): boolean {
  return !!secondNode && isAttribute('type', 'IDENTIFIER')(secondNode) &&
      SemanticAttr.isCharacterD(firstNode.textContent);
}


/**
 * Predicate implementing the boundary criteria for integrals dx on a single
 * node.
 * @param node A semantic node.
 * @return True if the node meets the boundary criteria.
 */
export function isIntegralDxBoundarySingle(node: SemanticNode): boolean {
  if (isAttribute('type', 'IDENTIFIER')(node)) {
    let firstChar = node.textContent[0];
    return firstChar && node.textContent[1] &&
        SemanticAttr.isCharacterD(firstChar);
  }
  return false;
}


/**
 * Predicate implementing the general boundary criteria for function operators:
 * 1. a relation symbol,
 * 2. some punctuation.
 * @param node A semantic node.
 * @return True if the node meets the boundary criteria.
 */
export function isGeneralFunctionBoundary(node: SemanticNode): boolean {
  return isRelation(node) || isPunctuation(node);
}


/**
 * Determines if a node is embellished and returns its type in case it is.
 * @param node A node to test.
 * @return The type of the node that is embellished.
 */
export function isEmbellished(node: SemanticNode): SemanticAttr.Type|null {
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
 * @param node A node to test.
 * @return True if the node is considered as operator.
 */
export function isOperator(node: SemanticNode): boolean {
  return isAttribute('type', 'OPERATOR')(node) ||
      isAttribute('embellished', 'OPERATOR')(node);
}


/**
 * Determines if a node is an relation, regular or embellished.
 * @param node A node to test.
 * @return True if the node is considered as relation.
 */
export function isRelation(node: SemanticNode): boolean {
  return isAttribute('type', 'RELATION')(node) ||
      isAttribute('embellished', 'RELATION')(node);
}


/**
 * Determines if a node is an punctuation, regular or embellished.
 * @param node A node to test.
 * @return True if the node is considered as punctuation.
 */
export function isPunctuation(node: SemanticNode): boolean {
  return isAttribute('type', 'PUNCTUATION')(node) ||
      isAttribute('embellished', 'PUNCTUATION')(node);
}


/**
 * Determines if a node is an fence, regular or embellished.
 * @param node A node to test.
 * @return True if the node is considered as fence.
 */
export function isFence(node: SemanticNode): boolean {
  return isAttribute('type', 'FENCE')(node) ||
      isAttribute('embellished', 'FENCE')(node);
}


/**
 * Determines if a fence is eligible.
 *
 * Currently fences are not eligible if they are opening fences with right
 * indices, closing fences with left indices or fences with both left and right
 * indices.
 * @param node A node to test.
 * @return True if the node is considered as fence.
 */
export function isElligibleEmbellishedFence(node: SemanticNode): boolean {
  if (!node || !isFence(node)) {
    return false;
  }
  if (!node.embellished) {
    return true;
  }
  let bothSide = function(node) {
    return isAttribute('type', 'TENSOR')(node) &&
        (!isAttribute('type', 'EMPTY')(node.childNodes[1]) ||
         !isAttribute('type', 'EMPTY')(node.childNodes[2])) &&
        (!isAttribute('type', 'EMPTY')(node.childNodes[3]) ||
         !isAttribute('type', 'EMPTY')(node.childNodes[4]));
  };
  let recurseBaseNode = function(node) {
    if (!node.embellished) {
      return true;
    }
    if (bothSide(node)) {
      return false;
    }
    if (isAttribute('role', 'CLOSE')(node) &&
        isAttribute('type', 'TENSOR')(node)) {
      return false;
    }
    if (isAttribute('role', 'OPEN')(node) &&
        (isAttribute('type', 'SUBSCRIPT')(node) ||
         isAttribute('type', 'SUPERSCRIPT')(node))) {
      return false;
    }
    return recurseBaseNode(node.childNodes[0]);
  };
  return recurseBaseNode(node);
}


/**
 * Decides if a node is a table or multiline element.
 * @param node A node.
 * @return True if node is either table or multiline.
 */
export function isTableOrMultiline(node: SemanticNode): boolean {
  return !!node &&
      (isAttribute('type', 'TABLE')(node) ||
       isAttribute('type', 'MULTILINE')(node));
}


/**
 * Heuristic to decide if we have a matrix: An expression fenced on both sides
 * without any other content is considered a fenced node.
 * @param node A node.
 * @return True if we believe we have a matrix.
 */
export function tableIsMatrixOrVector(node: SemanticNode): boolean {
  return !!node && isFencedElement(node) &&
      isTableOrMultiline(node.childNodes[0]);
}


/**
 * Decides if a node is a single, simply fenced element.
 * @param node A node.
 * @return True if the node is fence left right or neutral with a
 *     single contained element.
 */
export function isFencedElement(node: SemanticNode): boolean {
  return !!node && isAttribute('type', 'FENCED')(node) &&
      (isAttribute('role', 'LEFTRIGHT')(node) ||
       isAttribute('role', 'NEUTRAL')(node)) &&
      node.childNodes.length === 1;
}


/**
 * Heuristic to decide if we have a case statement: An expression with a
 * singular open fence before it.
 * @param table A table node.
 * @param prevNodes A list of previous nodes.
 * @return True if we believe we have a case statement.
 */
export function tableIsCases(
    table: SemanticNode, prevNodes: SemanticNode[]): boolean {
  return prevNodes.length > 0 &&
      isAttribute('role', 'OPENFENCE')(prevNodes[prevNodes.length - 1]);
}


/**
 * Heuristic to decide if we have a multiline formula. A table is considered a
 * multiline formula if it does not have any separate cells.
 * @param table A table node.
 * @return True if we believe we have a mulitline formula.
 */
export function tableIsMultiline(table: SemanticNode): boolean {
  return table.childNodes.every(function(row) {
    let length = row.childNodes.length;
    return length <= 1;
  });
}


/**
 * Heuristic to decide if a table has a binomial form.
 * @param table A table node.
 * @return True if it is a binomial form.
 */
export function isBinomial(table: SemanticNode): boolean {
  return table.childNodes.length === 2;
}


/**
 * Heuristic to decide if a node is a suitable center of a limit node.
 * @param node The center node.
 * @return True if node is a large operator, already a limit node or a
 *    limit function.
 */
export function isLimitBase(node: SemanticNode): boolean {
  return isAttribute('type', 'LARGEOP')(node) ||
      isAttribute('type', 'LIMBOTH')(node) ||
      isAttribute('type', 'LIMLOWER')(node) ||
      isAttribute('type', 'LIMUPPER')(node) ||
      isAttribute('type', 'FUNCTION')(node) &&
      isAttribute('role', 'LIMFUNC')(node) ||
      (isAttribute('type', 'OVERSCORE')(node) ||
       isAttribute('type', 'UNDERSCORE')(node)) &&
      isLimitBase((node.childNodes[0] as SemanticNode));
}


/**
 * Predicate deciding whether a symbol is the head of a simple function.
 * @param node A semantic node.
 * @return True if node is an identifier or a simple letter.
 */
export function isSimpleFunctionHead(node: SemanticNode): boolean {
  return node.type === SemanticAttr.Type.IDENTIFIER ||
      node.role === SemanticAttr.Role.LATINLETTER ||
      node.role === SemanticAttr.Role.GREEKLETTER ||
      node.role === SemanticAttr.Role.OTHERLETTER;
}


/**
 * Given a list of punctuated node and their containing puncutations, decides if
 * there is exactly one punctuation, which is at the given position. Will
 * therefore return false if the puncutation is a dummy in a text sequence.
 * @param nodes A list of punctuated nodes.
 * @param puncts The associated punctuations.
 * @param position The position in nodes to test for puncutation.
 * @return True if puncts is a singleton and is the indeed the
 *     punctuation at the given position.
 */
export function singlePunctAtPosition(
    nodes: SemanticNode[], puncts: SemanticNode[], position: number): boolean {
  return puncts.length === 1 &&
      (nodes[position].type === SemanticAttr.Type.PUNCTUATION ||
       nodes[position].embellished === SemanticAttr.Type.PUNCTUATION) &&
      nodes[position] === puncts[0];
}


/**
 * Is the node a simple function?
 * @param node The node.
 * @return True if node is an identifier with role simple function.
 */
export function isSimpleFunction(node: SemanticNode): boolean {
  return isAttribute('type', 'IDENTIFIER')(node) &&
      isAttribute('role', 'SIMPLEFUNC')(node);
}


/**
 * Is the node a left brace?
 * @param node The node.
 * @return True if the node is a left brace.
 */
export function isLeftBrace(node: SemanticNode): boolean {
  let leftBrace = ['{', '﹛', '｛'];
  // ['0x007B', '0xFE5B', '0xFF5B'];
  return !!node && leftBrace.indexOf(node.textContent) !== -1;
}


/**
 * Is the node a right brace?
 * @param node The node.
 * @return True if the node is a right brace.
 */
export function isRightBrace(node: SemanticNode): boolean {
  let rightBrace = ['}', '﹜', '｝'];
  // ['0x007D', '0xFE5C', '0xFF5D'];
  return !!node && rightBrace.indexOf(node.textContent) !== -1;
}


/**
 * Is the node a set like node, i.e., a fenced node with braces.
 * @param node The node.
 * @return True if the node is a set.
 */
export function isSetNode(node: SemanticNode): boolean {
  return isLeftBrace(node.contentNodes[0]) &&
      isRightBrace(node.contentNodes[1]);
}


// TODO: Rewrite as dictionary or map!
export const illegalSingleton_: SemanticAttr.Type[] = [
  SemanticAttr.Type.PUNCTUATION, SemanticAttr.Type.PUNCTUATED,
  SemanticAttr.Type.RELSEQ, SemanticAttr.Type.MULTIREL, SemanticAttr.Type.TABLE,
  SemanticAttr.Type.MULTILINE, SemanticAttr.Type.CASES,
  SemanticAttr.Type.INFERENCE
];


export const scriptedElement_: SemanticAttr.Type[] = [
  SemanticAttr.Type.LIMUPPER, SemanticAttr.Type.LIMLOWER,
  SemanticAttr.Type.LIMBOTH, SemanticAttr.Type.SUBSCRIPT,
  SemanticAttr.Type.SUPERSCRIPT, SemanticAttr.Type.UNDERSCORE,
  SemanticAttr.Type.OVERSCORE, SemanticAttr.Type.TENSOR
];


/**
 * Is the node a likely candidate for a singleton set element.
 * @param node The node.
 * @return True if the node is a set.
 */
export function isSingletonSetContent(node: SemanticNode): boolean {
  let type = node.type;
  if (illegalSingleton_.indexOf(type) !== -1 ||
      type === SemanticAttr.Type.INFIXOP &&
          node.role !== SemanticAttr.Role.IMPLICIT) {
    return false;
  }
  if (type === SemanticAttr.Type.FENCED) {
    return node.role === SemanticAttr.Role.LEFTRIGHT ?
        isSingletonSetContent(node.childNodes[0]) :
        true;
  }
  if (scriptedElement_.indexOf(type) !== -1) {
    return isSingletonSetContent(node.childNodes[0]);
  }
  return true;
}


/**
 * Tests if a number an integer or a decimal.
 * @param node The semantic node.
 * @return True if the number is an integer or a decimal.
 */
export function isNumber(node: SemanticNode): boolean {
  return node.type === SemanticAttr.Type.NUMBER &&
      (node.role === SemanticAttr.Role.INTEGER ||
       node.role === SemanticAttr.Role.FLOAT);
}


/**
 * Tests if a node is elligible as a unit counter. I.e., an integer or a
 * decimal, a vulgar fraction or a mixed number.
 *
 * Note, that minus prefixes become negative sign of the entire unit expression.
 * @param node The semantic node.
 * @return True if the number is an integer or a decimal.
 */
export function isUnitCounter(node: SemanticNode): boolean {
  return isNumber(node) || node.role === SemanticAttr.Role.VULGAR ||
      node.role === SemanticAttr.Role.MIXED;
}


/**
 * Tests if a node is pure unit, i.e., a singleton unit or a unit expression
 * without a counter.
 * @param node The semantic node.
 * @return True if the node is a pure unit expression.
 */
export function isPureUnit(node: SemanticNode): boolean {
  let children = node.childNodes;
  return node.role === SemanticAttr.Role.UNIT &&
      (!children.length || children[0].role === SemanticAttr.Role.UNIT);
}


/**
 * Tests if a node is an implicit node or a unit node representing an implicit
 * node.
 * @param node The semantic node.
 * @return True if the node is considered an implicit node.
 */
export function isImplicit(node: SemanticNode): boolean {
  return node.role === SemanticAttr.Role.IMPLICIT ||
      node.role === SemanticAttr.Role.UNIT && !!node.contentNodes.length &&
      node.contentNodes[0].textContent === SemanticAttr.invisibleTimes();
}


/**
 * Tests if a node is an implicit operator node only.
 * @param node The semantic node.
 * @return True if the node is a true implicit operator node.
 */
export function isImplicitOp(node: SemanticNode): boolean {
  return node.type === SemanticAttr.Type.INFIXOP &&
      node.role === SemanticAttr.Role.IMPLICIT;
}


/**
 * Comparison operation for neutral fences depending on textual equality of the
 * (innermost for embellished) fences.
 * @param fence1 First fence to compare.
 * @param fence2 Second fence to compare.
 * @return True if both fences are neutral and have same textual
 *     content.
 */
export function compareNeutralFences(
    fence1: SemanticNode, fence2: SemanticNode): boolean {
  return fence1.role === SemanticAttr.Role.NEUTRAL &&
      fence2.role === SemanticAttr.Role.NEUTRAL &&
      sre.SemanticUtil.getEmbellishedInner(fence1).textContent ==
      sre.SemanticUtil.getEmbellishedInner(fence2).textContent;
}


/**
 * Fence is ellibigle as a left neutral fence, if it is either not embellished
 * or all its embellishments are to the left.
 * @param fence The neutral fence to check.
 * @return True if fence is elligible.
 */
export function elligibleLeftNeutral(fence: SemanticNode): boolean {
  if (fence.role !== SemanticAttr.Role.NEUTRAL) {
    return false;
  }
  if (!fence.embellished) {
    return true;
  }
  if (fence.type === SemanticAttr.Type.SUPERSCRIPT ||
      fence.type === SemanticAttr.Type.SUBSCRIPT) {
    return false;
  }
  if (fence.type === SemanticAttr.Type.TENSOR &&
      (fence.childNodes[3].type !== SemanticAttr.Type.EMPTY ||
       fence.childNodes[4].type !== SemanticAttr.Type.EMPTY)) {
    return false;
  }
  return true;
}


/**
 * Fence is ellibigle as a right neutral fence, if it is either not embellished
 * or all its embellishments are to the right.
 * @param fence The neutral fence to check.
 * @return True if fence is elligible.
 */
export function elligibleRightNeutral(fence: SemanticNode): boolean {
  if (fence.role !== SemanticAttr.Role.NEUTRAL) {
    return false;
  }
  if (!fence.embellished) {
    return true;
  }
  if (fence.type === SemanticAttr.Type.TENSOR &&
      (fence.childNodes[1].type !== SemanticAttr.Type.EMPTY ||
       fence.childNodes[2].type !== SemanticAttr.Type.EMPTY)) {
    return false;
  }
  return true;
}

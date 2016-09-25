// Copyright 2013 Google Inc.
// Copyright 2014-16 Volker Sorge
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

goog.provide('sre.SemanticPred');

goog.require('sre.SemanticAttr');
goog.require('sre.SemanticUtil');


/**
 * Constructs a predicate to check the semantic attribute of a node.
 * @param {!string} prop The property of a node.
 * @param {!string} attr The attribute.
 * @return {function(sre.SemanticNode): boolean} The predicate.
 */

sre.SemanticPred.isAttribute = function(prop, attr) {
  var getAttr = function(prop) {
    switch (prop) {
      case 'role': return sre.SemanticAttr.Role[attr];
      case 'font': return sre.SemanticAttr.Font[attr];
      case 'embellished':
      case 'type':
      default: return sre.SemanticAttr.Type[attr];
    }
  };

  return function(node) {return node[prop] === getAttr(prop);};
};


/**
 * Checks whether a character can be considered as accent.
 * @param {!sre.SemanticNode} node The node to be tested.
 * @return {boolean} True if the node is a punctuation, fence or operator.
 */
sre.SemanticPred.isAccent = function(node) {
  return sre.SemanticPred.isAttribute('type', 'FENCE')(node) ||
      sre.SemanticPred.isAttribute('type', 'PUNCTUATION')(node) ||
      sre.SemanticPred.isAttribute('type', 'OPERATOR')(node) ||
      sre.SemanticPred.isAttribute('type', 'RELATION')(node) ||
      // TODO (sorge) Simplify this once meaning of all characters is fully
      // defined.
      (sre.SemanticPred.isAttribute('type', 'IDENTIFIER')(node) &&
      sre.SemanticPred.isAttribute('role', 'UNKNOWN')(node) &&
      !node.textContent.match(new RegExp(
         (sre.SemanticAttr.getInstance()).allLetters.join('|'))));
};


/**
 * Predicate implementing the boundary criteria for simple functions:
 *
 * @param {!sre.SemanticNode} node A semantic node of type fenced.
 * @return {boolean} True if the node meets the boundary criteria.
 */
sre.SemanticPred.isSimpleFunction = function(node) {
  var children = node.childNodes;
  if (children.length === 0) {
    return true;
  }
  if (children.length > 1) {
    return false;
  }
  var child = children[0];
  if (child.type === sre.SemanticAttr.Type.INFIXOP) {
    if (child.role !== sre.SemanticAttr.Role.IMPLICIT) {
      return false;
    }
    if (child.childNodes.some(
      sre.SemanticPred.isAttribute('type', 'INFIXOP'))) {
      return false;
    }
  }
  return true;
};


/**
 * Predicate implementing the boundary criteria for prefix functions and big
 * operators:
 * 1. an explicit operator,
 * 2. a relation symbol, or
 * 3. some punctuation.
 * @param {sre.SemanticNode} node A semantic node.
 * @return {boolean} True if the node meets the boundary criteria.
 */
sre.SemanticPred.isPrefixFunctionBoundary = function(node) {
  return sre.SemanticPred.isOperator(node) ||
      sre.SemanticPred.isGeneralFunctionBoundary(node);
};


/**
 * Predicate implementing the boundary criteria for integrals dx on two nodes.
 * @param {sre.SemanticNode} firstNode A semantic node.
 * @param {sre.SemanticNode} secondNode The direct neighbour of first
 *     Node.
 * @return {boolean} True if the second node exists and the first node is a 'd'.
 */
sre.SemanticPred.isIntegralDxBoundary = function(
    firstNode, secondNode) {
  return !!secondNode &&
      sre.SemanticPred.isAttribute('type', 'IDENTIFIER')(secondNode) &&
          sre.SemanticAttr.isCharacterD(firstNode.textContent);
};


/**
 * Predicate implementing the boundary criteria for integrals dx on a single
 * node.
 * @param {sre.SemanticNode} node A semantic node.
 * @return {boolean} True if the node meets the boundary criteria.
 */
sre.SemanticPred.isIntegralDxBoundarySingle = function(node) {
  if (sre.SemanticPred.isAttribute('type', 'IDENTIFIER')(node)) {
    var firstChar = node.textContent[0];
    return firstChar && node.textContent[1] &&
        sre.SemanticAttr.isCharacterD(firstChar);
  }
  return false;
};


/**
 * Predicate implementing the general boundary criteria for function operators:
 * 1. a relation symbol,
 * 2. some punctuation.
 * @param {sre.SemanticNode} node A semantic node.
 * @return {boolean} True if the node meets the boundary criteria.
 */
sre.SemanticPred.isGeneralFunctionBoundary = function(node) {
  return sre.SemanticPred.isRelation(node) ||
      sre.SemanticPred.isPunctuation(node);
};


/**
 * Determines if a node is embellished and returns its type in case it is.
 * @param {sre.SemanticNode} node A node to test.
 * @return {?sre.SemanticAttr.Type} The type of the node that is embellished.
 */
sre.SemanticPred.isEmbellished = function(node) {
  if (node.embellished) {
    return node.embellished;
  }
  if (sre.SemanticAttr.isEmbellishedType(node.type)) {
    return node.type;
  }
  return null;
};


/**
 * Determines if a node is an operator, regular or embellished.
 * @param {sre.SemanticNode} node A node to test.
 * @return {boolean} True if the node is considered as operator.
 */
sre.SemanticPred.isOperator = function(node) {
  return sre.SemanticPred.isAttribute('type', 'OPERATOR')(node) ||
      sre.SemanticPred.isAttribute('embellished', 'OPERATOR')(node);
};


/**
 * Determines if a node is an relation, regular or embellished.
 * @param {sre.SemanticNode} node A node to test.
 * @return {boolean} True if the node is considered as relation.
 */
sre.SemanticPred.isRelation = function(node) {
  return sre.SemanticPred.isAttribute('type', 'RELATION')(node) ||
      sre.SemanticPred.isAttribute('embellished', 'RELATION')(node);
};


/**
 * Determines if a node is an punctuation, regular or embellished.
 * @param {sre.SemanticNode} node A node to test.
 * @return {boolean} True if the node is considered as punctuation.
 */
sre.SemanticPred.isPunctuation = function(node) {
  return sre.SemanticPred.isAttribute('type', 'PUNCTUATION')(node) ||
      sre.SemanticPred.isAttribute('embellished', 'PUNCTUATION')(node);
};


/**
 * Determines if a node is an fence, regular or embellished.
 * @param {sre.SemanticNode} node A node to test.
 * @return {boolean} True if the node is considered as fence.
 */
sre.SemanticPred.isFence = function(node) {
  return sre.SemanticPred.isAttribute('type', 'FENCE')(node) ||
      sre.SemanticPred.isAttribute('embellished', 'FENCE')(node);
};


/**
 * Determines if a fence is eligible.
 *
 * Currently fences are not eligible if they are opening fences with right
 * indices, closing fences with left indices or fences with both left and right
 * indices.
 * @param {sre.SemanticNode} node A node to test.
 * @return {boolean} True if the node is considered as fence.
 */
sre.SemanticPred.isElligibleEmbellishedFence = function(node) {
  if (!node || !sre.SemanticPred.isFence(node)) {
    return false;
  }
  if (!node.embellished) {
    return true;
  }
  var bothSide = function(node) {
    return sre.SemanticPred.isAttribute('type', 'TENSOR')(node) &&
        (!sre.SemanticPred.isAttribute('type', 'EMPTY')(node.childNodes[1]) ||
         !sre.SemanticPred.isAttribute('type', 'EMPTY')(node.childNodes[2])) &&
        (!sre.SemanticPred.isAttribute('type', 'EMPTY')(node.childNodes[3]) ||
         !sre.SemanticPred.isAttribute('type', 'EMPTY')(node.childNodes[4]));
  };
  var recurseBaseNode = function(node) {
    if (!node.embellished) {
      return true;
    }
    if (bothSide(node)) {
      return false;
    }
    if (sre.SemanticPred.isAttribute('role', 'CLOSE')(node) &&
        sre.SemanticPred.isAttribute('type', 'TENSOR')(node)) {
      return false;
    }
    if (sre.SemanticPred.isAttribute('role', 'OPEN')(node) &&
        (sre.SemanticPred.isAttribute('type', 'SUBSCRIPT')(node) ||
         sre.SemanticPred.isAttribute('type', 'SUPERSCRIPT')(node))) {
      return false;
    }
    return recurseBaseNode(node.childNodes[0]);
  };
  return recurseBaseNode(node);
};

// Copyright 2020 Volker Sorge
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
 * @fileoverview Utility functions for dealing with units.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.UnitUtil');

goog.require('sre.Messages');
goog.require('sre.SemanticAttr');
goog.require('sre.XpathUtil');
goog.require('sre.AuditoryDescription');


/**
 * Iterates over the list of content nodes of a multiplication of units and
 * ensures that a multiplication operator is put between proper unit
 * expressions.
 * @param {Array.<Node>} nodes A node array.
 * @param {string} context A context string.
 * @return {function(): Array.<sre.AuditoryDescription>} A closure that returns
 *     the unit multiplied between two proper unit expressions, otherwise the
 *     empty string.
 */
sre.UnitUtil.unitMultipliers = function(nodes, context) {
  var children = nodes;
  var counter = 0;
  return function() {
    console.log(counter);
    console.log(children[counter].toString());
    console.log(children[counter+1].toString());
    var descr = sre.AuditoryDescription.create({
      text: (sre.UnitUtil.rightMostUnit(children[counter]) &&
             sre.UnitUtil.leftMostUnit(children[counter + 1])) ?
        sre.Messages.UNIT_TIMES : ''}, {});
    counter++;
    return [descr];
  };
};


/**
 * @type {Array.<sre.SemanticAttr.Type>}
 */
sre.UnitUtil.SCRIPT_ELEMENTS = [
  sre.SemanticAttr.Type.SUPERSCRIPT,
  sre.SemanticAttr.Type.SUBSCRIPT,
  sre.SemanticAttr.Type.OVERSCORE,
  sre.SemanticAttr.Type.UNDERSCORE
];


/**
 * Tests if node is a right most unit element in a sub-expression.
 * @param {Node} node The node to test.
 * @return {boolean} True if it is the right most unit in that subtree.
 */
sre.UnitUtil.rightMostUnit = function(node) {
  while (node) {
    if (node.getAttribute('role') === 'unit') {
      return true;
    }
    var tag = node.tagName;
    var children = sre.XpathUtil.evalXPath('children/*', node);
    node = (sre.UnitUtil.SCRIPT_ELEMENTS.indexOf(tag) !== -1) ?
        children[0] : children[children.length - 1];
  }
  return false;
};


/**
 * Tests if node is a left most unit element in a sub-expression.
 * @param {Node} node The node to test.
 * @return {boolean} True if it is the left most unit in that subtree.
 */
sre.UnitUtil.leftMostUnit = function(node) {
  while (node) {
    if (node.getAttribute('role') === 'unit') {
      return true;
    }
    var children = sre.XpathUtil.evalXPath('children/*', node);
    node = children[0];
  }
  return false;
};


/**
 * Checks if a given node is preceded by a 1. This is useful to decide if the
 * next text element is singular or plural.
 * @param {Node} node The base node.
 * @return {Array.<Node>} List with the base node if the preceding node (the
 *     next left in the subexpression containing node) is 1. Otherwise empty
 *     list.
 */
sre.UnitUtil.oneLeft = function(node) {
  while (node) {
    if (node.tagName === 'number' && node.textContent === '1') {
      return [node];
    }
    if (node.tagName !== 'infixop' ||
        (node.getAttribute('role') !== 'multiplication' &&
         node.getAttribute('role') !== 'implicit')) {
      return [];
    }
    node = sre.XpathUtil.evalXPath('children/*', node)[0];
  }
  return [];
};

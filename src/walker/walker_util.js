// Copyright 2015 Volker Sorge
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
 * @fileoverview Utility functions for walkers.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.WalkerUtil');

goog.require('sre.BaseUtil');
goog.require('sre.EnrichMathml');
goog.require('sre.SemanticAttr');


/**
 * A comma separated list of attribute values.
 * @param {?string} attr The attribute value.
 * @return {!Array.<string>} A list of values.
 */
sre.WalkerUtil.splitAttribute = function(attr) {
  return !attr ? [] : attr.split(/,/);
};


/**
 * Combines content and children lists depending on semantic type and role.
 * @param {!sre.SemanticAttr.Type} type The semantic type.
 * @param {!sre.SemanticAttr.Role} role The semantic role.
 * @param {!Array.<string>} content The list of content nodes.
 * @param {!Array.<string>} children The list of child nodes.
 * @return {!Array.<string>} The combined list.
 */
sre.WalkerUtil.combineContentChildren = function(
    type, role, content, children) {
  switch (type) {
    case sre.SemanticAttr.Type.RELSEQ:
    case sre.SemanticAttr.Type.INFIXOP:
    case sre.SemanticAttr.Type.MULTIREL:
      return sre.BaseUtil.interleaveLists(children, content);
    case sre.SemanticAttr.Type.PREFIXOP:
      return content.concat(children);
    case sre.SemanticAttr.Type.POSTFIXOP:
      return children.concat(content);
    case sre.SemanticAttr.Type.MATRIX:
    case sre.SemanticAttr.Type.VECTOR:
    case sre.SemanticAttr.Type.FENCED:
      children.unshift(content[0]);
      children.push(content[1]);
      return children;
    case sre.SemanticAttr.Type.CASES:
      children.unshift(content[0]);
      return children;
    case sre.SemanticAttr.Type.PUNCTUATED:
      if (role === sre.SemanticAttr.Role.TEXT) {
        return sre.BaseUtil.interleaveLists(children, content);
      }
      return children;
    case sre.SemanticAttr.Type.APPL:
      return [children[0], content[0], children[1]];
    case sre.SemanticAttr.Type.ROOT:
      return [children[1], children[0]];
    default:
      return children;
  }
};


/**
 * Transforms a data attribute name into its camel cased version.
 * @param {!sre.EnrichMathml.Attribute} attr Micro data attributes.
 * @return {!string} The camel cased attribute.
 */
sre.WalkerUtil.dataAttribute = function(attr) {
  return attr.substr(5).replace(/-([a-z])/g, function(letter, index) {
    return index.toUpperCase();});
};


/**
 * Retrieves a data attribute from a given node. Tries using microdata access if
 * possible.
 * @param {!Node} node A DOM node.
 * @param {!sre.EnrichMathml.Attribute} attr The semantic data attribute.
 * @return {!string} The value for that attribute.
 */
sre.WalkerUtil.getAttribute = function(node, attr) {
  return sre.DomUtil.getDataAttribute(node, sre.WalkerUtil.dataAttribute(attr));
};

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
goog.require('sre.DomUtil');
goog.require('sre.EnrichMathml');
goog.require('sre.SemanticAttr');
goog.require('sre.XpathUtil');


/**
 * A comma separated list of attribute values.
 * @param {?string} attr The attribute value.
 * @return {!Array.<string>} A list of values.
 */
sre.WalkerUtil.splitAttribute = function(attr) {
  return !attr ? [] : attr.split(/,/);
};


/**
 * Retrieves a data attribute from a given node. Tries using microdata access if
 * possible.
 * @param {!Node} node A DOM node.
 * @param {!sre.EnrichMathml.Attribute} attr The semantic data attribute.
 * @return {!string} The value for that attribute.
 */
sre.WalkerUtil.getAttribute = function(node, attr) {
  return sre.DomUtil.getDataAttribute(node, attr);
};


/**
 * Retrieves the node containing the embedding of the root of a semantic tree.
 * @param {!Node} node The math node.
 * @return {!Node} The node with the embedded root. If we cannot find one, the
 *     input node is returned.
 */
sre.WalkerUtil.getSemanticRoot = function(node) {
  if (node.hasAttribute(sre.EnrichMathml.Attribute.TYPE) &&
      !node.hasAttribute(sre.EnrichMathml.Attribute.PARENT)) {
    return node;
  }

  var semanticNodes = sre.DomUtil.querySelectorAllByAttr(
      node, sre.EnrichMathml.Attribute.TYPE);
  for (var i = 0, semanticNode; semanticNode = semanticNodes[i]; i++) {
    if (!semanticNode.hasAttribute(sre.EnrichMathml.Attribute.PARENT)) {
      return semanticNode;
    }
  }
  return node;
};


/**
 * Retrieves a node containing a given semantic id starting from the given root.
 * @param {!Node} root Root node for the query.
 * @param {string} id The id of a semantic node.
 * @return {Node} The node for that id.
 */
sre.WalkerUtil.getBySemanticId = function(root, id) {
  if (root.getAttribute(sre.EnrichMathml.Attribute.ID) === id) {
    return root;
  }
  return sre.DomUtil.querySelectorAllByAttrValue(
    root, sre.EnrichMathml.Attribute.ID, id)[0];
};

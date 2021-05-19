// Copyright 2015-21 Volker Sorge
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
 * @fileoverview Focus elements contain a collection of focused nodes and
 *     additional information, like colors etc.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.Focus');



/**
 * @constructor
 * @param {!Array.<!sre.SemanticNode>} nodes The semantic nodes of the focus.
 * @param {!sre.SemanticNode} primary The primary component of the focus.
 */
sre.Focus = function(nodes, primary) {

  /**
   * @type {!Array.<!sre.SemanticNode>}
   * @private
   */
  this.semanticNodes_ = nodes;

  /**
   * @type {!sre.SemanticNode}
   * @private
   */
  this.semanticPrimary_ = primary;

  /**
   * The DOM nodes of the focus.
   * @type {!Array.<?Node>}
   * @private
   */
  this.domNodes_ = [];

  /**
   * The primary DOM component of the focus.
   * @type {Node}
   * @private
   */
  this.domPrimary_ = null;

  /**
   * The DOM nodes of the focus.
   * @type {!Array.<?Node>}
   * @private
   */
  this.allNodes_ = [];

};


/**
 * @return {!sre.SemanticNode} The nodes of the focus.
 */
sre.Focus.prototype.getSemanticPrimary = function() {
  return this.semanticPrimary_;
};


/**
 * @return {!Array.<!sre.SemanticNode>} The nodes of the focus.
 */
sre.Focus.prototype.getSemanticNodes = function() {
  return this.semanticNodes_;
};


/**
 * @return {!Array.<Node>} The nodes of the focus.
 */
sre.Focus.prototype.getNodes = function() {
  return this.allNodes_;
};


/**
 * @return {!Array.<?Node>} The nodes of the focus.
 */
sre.Focus.prototype.getDomNodes = function() {
  return this.domNodes_;
};


/**
 * @return {Node} The primary node of the focus. Can be empty.
 */
sre.Focus.prototype.getDomPrimary = function() {
  return this.domPrimary_;
};


/**
 * @override
 */
sre.Focus.prototype.toString = function() {
  return 'Primary:' + this.domPrimary_ + ' Nodes:' + this.domNodes_;
};


/**
 * Clones the focus.
 * @return {!sre.Focus} The new focus, containing the same component as this.
 */
sre.Focus.prototype.clone = function() {
  var focus = new sre.Focus(this.semanticNodes_, this.semanticPrimary_);
  focus.domNodes_ = this.domNodes_;
  focus.domPrimary_ = this.domPrimary_;
  focus.allNodes_ = this.allNodes_;
  return focus;
};


/**
 * Factory method to create focus structures from semantic and DOM nodes.
 * @param {string} primaryId The semantic id of the primary node.
 * @param {!Array.<string>} nodeIds The semantic ids of the node list.
 * @param {!sre.RebuildStree} rebuilt A rebuilt semantic tree structure.
 * @param {!Node} dom The original DOM node.
 * @return {!sre.Focus} The new focus.
 */
sre.Focus.factory = function(primaryId, nodeIds, rebuilt, dom) {
  var idFunc = function(id) {return sre.WalkerUtil.getBySemanticId(dom, id);};
  var dict = rebuilt.nodeDict;
  var node = idFunc(primaryId);
  var nodes = nodeIds.map(idFunc);
  var snodes = nodeIds.map(
      function(primaryId) {return dict[primaryId];});
  var focus = new sre.Focus(snodes, dict[primaryId]);
  focus.domNodes_ = nodes;
  focus.domPrimary_ = node;
  focus.allNodes_ = sre.Focus.generateAllVisibleNodes_(
      nodeIds, nodes, dict, dom);
  return focus;
};


/**
 * Generates all existing nodes in the DOM structure corresponding to the
 * semantic ids.
 * @param {!Array.<string>} ids The semantic ids.
 * @param {!Array.<?Node>} nodes The DOM nodes corresponding to the ids, some of
 *      which might not exist.
 * @param {!Object.<!sre.SemanticNode>} dict A semantic node dictionary.
 * @param {!Node} domNode The original DOM node.
 * @return {!Array.<Node>} The list of existing nodes in the DOM tree.
 * @private
 */
sre.Focus.generateAllVisibleNodes_ = function(ids, nodes, dict, domNode) {
  var idFunc = function(id) {
    return sre.WalkerUtil.getBySemanticId(domNode, id);
  };
  var result = [];
  for (var i = 0, l = ids.length; i < l; i++) {
    if (nodes[i]) {
      result.push(nodes[i]);
      continue;
    }
    var virtual = dict[ids[i]];
    if (!virtual) continue;
    var childIds = virtual.childNodes.map(
        function(x) {return x.id.toString();});
    var children = childIds.map(idFunc);
    result = result.concat(
        sre.Focus.generateAllVisibleNodes_(childIds, children, dict, domNode));
  }
  return result;
};

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
 * @fileoverview Factory for semantic nodes.
 *
 * Basic functionality to create different types of semantic nodes and keep an
 * active counter. Every semantic tree has its own node factory.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.SemanticNodeFactory');

goog.require('sre.SemanticAttr');
goog.require('sre.SemanticDefault');
goog.require('sre.SemanticMeaningCollator');
goog.require('sre.SemanticNode');
goog.require('sre.SemanticNodeCollator');



/**
 * @constructor
 */
sre.SemanticNodeFactory = function() {

  /** ID counter.
   * @type {number}
   * @private
   */
  this.idCounter_ = -1;

  /**
   * @type {sre.SemanticNodeCollator}
   */
  this.leafMap = new sre.SemanticNodeCollator();

  // /**
  //  * @type {sre.SemanticMeaningCollator}
  //  */
  // this.leafMeaning = new sre.SemanticMeaningCollator();

  /**
   * @type {sre.SemanticDefault}
   */
  this.defaultMap = new sre.SemanticDefault();

};

/**
 * Creates a new node object.
 * @param {number=} opt_id Optional ID. It will be maxed with the current id.
 * @return {!sre.SemanticNode} The newly created node.
 * @private
 */
sre.SemanticNodeFactory.prototype.createNode_ = function(opt_id) {
  if (typeof opt_id !== 'undefined') {
    var id = opt_id;
    this.idCounter_ = Math.max(this.idCounter_, id);
  } else {
    id = ++this.idCounter_;
  }
  return new sre.SemanticNode(id);
};


/**
 * Creates a new node object with a given id.
 * @param {number} id The node id.
 * @return {!sre.SemanticNode} The newly created node.
 */
sre.SemanticNodeFactory.prototype.makeNode = function(id) {
  return this.createNode_(id);
};


/**
 * Create a node that is to be processed at a later point in time.
 * @param {Node} mml The MathML tree.
 * @return {!sre.SemanticNode} The new node.
 */
sre.SemanticNodeFactory.prototype.makeUnprocessed = function(mml) {
  var node = this.createNode_();
  node.mathml = [mml];
  return node;
};


/**
 * Create an empty leaf node.
 * @return {!sre.SemanticNode} The new node.
 */
sre.SemanticNodeFactory.prototype.makeEmptyNode = function() {
  var node = this.createNode_();
  node.type = sre.SemanticAttr.Type.EMPTY;
  return node;
};


/**
 * Create a node with the given text content. The content is semantically
 * interpreted.
 * @param {string} content The text content of the node.
 * @return {!sre.SemanticNode} The new node.
 */
sre.SemanticNodeFactory.prototype.makeContentNode = function(content) {
  var node = this.createNode_();
  node.updateContent(content);
  return node;
};


/**
 * Create a list of content nodes all with the same content.
 * @param {number} num The number of nodes to create.
 * @param {string} content The text content of the node.
 * @return {!Array.<sre.SemanticNode>} The list of new nodes.
 */
sre.SemanticNodeFactory.prototype.makeMultipleContentNodes = function(
    num, content) {
  var nodes = [];
  for (var i = 0; i < num; i++) {
    nodes.push(this.makeContentNode(content));
  }
  return nodes;
};


/**
 * Create a leaf node.
 * @param {string} content The MathML tree.
 * @param {sre.SemanticAttr.Font} font The font name.
 * @return {!sre.SemanticNode} The new node.
 */
sre.SemanticNodeFactory.prototype.makeLeafNode = function(content, font) {
  if (!content) {
    return this.makeEmptyNode();
  }
  var node = this.makeContentNode(content);
  node.font = font || node.font;
  // Lookup alternative meaning here!
  var meaning = this.defaultMap.retrieveNode(node);
  if (meaning) {
    node.type = meaning.type;
    node.role = meaning.role;
    node.font = meaning.font;
  }
  this.leafMap.addNode(node);
  return node;
};


/**
 * Create a branching node.
 * @param {!sre.SemanticAttr.Type} type The type of the node.
 * @param {!Array.<sre.SemanticNode>} children The child nodes.
 * @param {!Array.<sre.SemanticNode>} contentNodes The content Nodes.
 * @param {string=} opt_content Content string if there is any.
 * @return {!sre.SemanticNode} The new node.
 */
sre.SemanticNodeFactory.prototype.makeBranchNode = function(
    type, children, contentNodes, opt_content) {
  var node = this.createNode_();
  if (opt_content) {
    node.updateContent(opt_content);
  }
  node.type = type;
  node.childNodes = children;
  node.contentNodes = contentNodes;
  children.concat(contentNodes).forEach(
      function(x) {
        x.parent = node;
        node.addMathmlNodes(x.mathml);
      });
  return node;
};

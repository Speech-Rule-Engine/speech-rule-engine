// Copyright 2013 Google Inc.
// Copyright 2014-2016 Volker Sorge
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
 * @fileoverview A semantic tree for MathML expressions.
 *
 * This file contains functionality to compute a semantic interpretation from a
 * given MathML expression. This is a very heuristic approach that assumes a
 * fairly simple default semantic which is suitable for K-12 and simple UG
 * mathematics.
 *
 * @author sorge@google.com (Volker Sorge)
 */

goog.provide('sre.SemanticTree');

goog.require('sre.DomUtil');
goog.require('sre.MathUtil');
goog.require('sre.SemanticAnnotations');
goog.require('sre.SemanticMathml');
goog.require('sre.SemanticNode');
goog.require('sre.SystemExternal');



/**
 * Create an initial semantic tree.
 * @param {!Element} mml The original MathML node.
 * @constructor
 */
sre.SemanticTree = function(mml) {

  /** Original MathML tree.
   * @type {Node}
   */
  this.mathml = mml;

  /**
   * @type {sre.SemanticParser}
   */
  this.parser = new sre.SemanticMathml();

  /** @type {!sre.SemanticNode} */
  this.root = this.parser.parse(mml);

  sre.SemanticAnnotations.getInstance().annotate(this.root);

};


/**
 * Generate an empty semantic tree.
 * @return {sre.SemanticTree} The empty semantic tree.
 */
sre.SemanticTree.empty = function() {
  var empty = sre.DomUtil.parseInput('<math/>');
  var stree = new sre.SemanticTree(empty);
  stree.mathml = empty;
  return stree;
};


/**
 * Generate a semantic tree for a given node.
 * @param {!sre.SemanticNode} semantic The semantic node that will become
 *     the root.
 * @param {Element=} opt_mathml Optionally a MathML node corresponding to the
 *     semantic node.
 * @return {!sre.SemanticTree} The empty semantic tree.
 */
sre.SemanticTree.fromNode = function(semantic, opt_mathml) {
  var stree = sre.SemanticTree.empty();
  stree.root = semantic;
  if (opt_mathml) {
    stree.mathml = opt_mathml;
  }
  return stree;
};


/**
 * Generate a semantic tree for a given node
 * @param {!sre.SemanticNode} semantic The semantic node that will become
 *     the root.
 * @param {Element=} opt_mathml Optionally a MathML node corresponding to the
 *     semantic node.
 * @return {sre.SemanticTree} The empty semantic tree.
 */
sre.SemanticTree.fromRoot = function(semantic, opt_mathml) {
  var root = semantic;
  while (root.parent) {
    root = root.parent;
  }
  var stree = sre.SemanticTree.fromNode(root);
  if (opt_mathml) {
    stree.mathml = opt_mathml;
  }
  return stree;
};


/**
  * Returns an XML representation of the tree.
  * @param {boolean=} opt_brief If set attributes are omitted.
  * @return {!Node} The XML representation of the tree.
  */
sre.SemanticTree.prototype.xml = function(opt_brief) {
  var xml = sre.DomUtil.parseInput('<stree></stree>');
  var xmlRoot = this.root.xml(xml.ownerDocument, opt_brief);
  xml.appendChild(xmlRoot);
  return xml;
};


/**
  * Serializes the XML representation of the tree.
  * @param {boolean=} opt_brief If set attributes are omitted.
 * @return {string} Serialized string.
 */
sre.SemanticTree.prototype.toString = function(opt_brief) {
  var xmls = new sre.SystemExternal.xmldom.XMLSerializer();
  return xmls.serializeToString(this.xml(opt_brief));
};


/**
 * Pretty print the XML representation of the tree.
 * @param {boolean=} opt_brief If set attributes are omitted.
 * @return {string} The formatted string.
 */
sre.SemanticTree.prototype.formatXml = function(opt_brief) {
  var xml = this.toString(opt_brief);
  return sre.DomUtil.formatXml(xml);
};


/**
 * Convenience method to display the whole tree and its elements.
 */
sre.SemanticTree.prototype.displayTree = function() {
  this.root.displayTree();
};


/**
 * Replaces a node in the tree. Updates the root node if necessary.
 * @param {!sre.SemanticNode} oldNode The node to be replaced.
 * @param {!sre.SemanticNode} newNode The new node.
 */
sre.SemanticTree.prototype.replaceNode = function(oldNode, newNode) {
  var parent = oldNode.parent;
  if (!parent) {
    this.root = newNode;
    return;
  }
  parent.replaceChild(oldNode, newNode);
};


/**
 * Turns tree into JSON format.
 * @return {JSONType} The JSON object for the tree. 
 */
sre.SemanticTree.prototype.toJson = function() {
  var json = /** @type {JSONType} */({});
  json['stree'] = this.root.toJson();
  return json;
};

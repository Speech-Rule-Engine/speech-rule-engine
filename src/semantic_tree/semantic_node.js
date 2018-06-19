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
 * @fileoverview Nodes in the semantic tree.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.SemanticNode');

goog.require('sre.SemanticAttr');
goog.require('sre.SystemExternal');



/**
 * @param {number} id Node id.
 * @constructor
 */
sre.SemanticNode = function(id) {
  /** @type {number} */
  this.id = id;

  /** @type {Array.<Element>} */
  this.mathml = [];

  /** @type {sre.SemanticNode} */
  this.parent = null;

  /** @type {sre.SemanticAttr.Type} */
  this.type = sre.SemanticAttr.Type.UNKNOWN;

  /** @type {sre.SemanticAttr.Role} */
  this.role = sre.SemanticAttr.Role.UNKNOWN;

  /** @type {sre.SemanticAttr.Font} */
  this.font = sre.SemanticAttr.Font.UNKNOWN;

  /** @type {?sre.SemanticAttr.Type} */
  this.embellished = null;

  /** @type {string} */
  this.fencePointer = '';

  /** @type {!Array.<sre.SemanticNode>} */
  this.childNodes = [];

  /** @type {string} */
  this.textContent = '';

  /**
   * The complete mml belonging to this node.
   * @type {Element}
   */
  this.mathmlTree = null;

  /**
   * Branch nodes can store additional nodes that can be useful.
   * E.g. a node of type FENCED can have the opening and closing fences here.
   * @type {!Array.<sre.SemanticNode>}
   */
  this.contentNodes = [];
};


/**
 * Retrieve all subnodes (including the node itself) that satisfy a given
 * predicate.
 * @param {function(sre.SemanticNode): boolean} pred The predicate.
 * @return {!Array.<sre.SemanticNode>} The nodes in the tree for which the
 *     predicate holds.
 */
sre.SemanticNode.prototype.querySelectorAll = function(pred) {
  var result = [];
  for (var i = 0, child; child = this.childNodes[i]; i++) {
    result = result.concat(child.querySelectorAll(pred));
  }
  if (pred(this)) {
    result.unshift(this);
  }
  return result;
};


/**
  * An XML tree representation of the current node.
  * @param {Document} xml The XML document.
  * @param {boolean=} opt_brief If set attributes are omitted.
  * @return {Node} The XML representation of the node.
  */
sre.SemanticNode.prototype.xml = function(xml, opt_brief) {
  /**
    * Translates a list of nodes into XML representation.
    * @param {string} tag Name of the enclosing tag.
    * @param {!Array.<!sre.SemanticNode>} nodes A list of nodes.
    * @return {Node} An XML representation of the node list.
    */
  var xmlNodeList = function(tag, nodes) {
    var xmlNodes = nodes.map(function(x) {return x.xml(xml, opt_brief);});
    var tagNode = xml.createElementNS('', tag);
    for (var i = 0, child; child = xmlNodes[i]; i++) {
      tagNode.appendChild(child);
    }
    return tagNode;
  };
  var node = xml.createElementNS('', this.type);
  if (!opt_brief) {
    this.xmlAttributes_(node);
  }
  node.textContent = this.textContent;
  if (this.contentNodes.length > 0) {
    node.appendChild(xmlNodeList('content', this.contentNodes));
  }
  if (this.childNodes.length > 0) {
    node.appendChild(xmlNodeList('children', this.childNodes));
  }
  return node;
};


/**
 * Serializes the XML representation of a node.
 * @param {boolean=} opt_brief If attributes are to be omitted.
 * @return {string} Serialized string.
 */
sre.SemanticNode.prototype.toString = function(opt_brief) {
  var xmls = new sre.SystemExternal.xmldom.XMLSerializer();
  var dp = new sre.SystemExternal.xmldom.DOMParser();
  var xml = dp.parseFromString('', 'text/xml');
  return xmls.serializeToString(this.xml(xml, opt_brief));
};


/**
 * Adds attributes to the XML representation of the current node.
 * @param {Node} node The XML node.
 * @private
 */
sre.SemanticNode.prototype.xmlAttributes_ = function(node) {
  node.setAttribute('role', this.role);
  if (this.font != sre.SemanticAttr.Font.UNKNOWN) {
    node.setAttribute('font', this.font);
  }
  if (this.embellished) {
    node.setAttribute('embellished', this.embellished);
  }
  if (this.fencePointer) {
    node.setAttribute('fencepointer', this.fencePointer);
  }
  node.setAttribute('id', this.id);
};


/**
 * Updates the content of the node thereby possibly changing type and role.
 * @param {string} content The new content string.
 */
sre.SemanticNode.prototype.updateContent = function(content) {
  // Remove superfluous whitespace only if it is not the only content!
  var newContent = content.trim();
  content = (content && !newContent) ? content : newContent;
  if (this.textContent == content) {
    return;
  }
  var meaning = sre.SemanticAttr.lookupMeaning(content);
  this.textContent = content;
  this.role = meaning.role;
  this.type = meaning.type;
  this.font = meaning.font;
};


/**
 * Adds MathML nodes to the node's store of MathML nodes if necessary only, as
 * we can not necessarily assume that the MathML of the content nodes and
 * children are all disjoint.
 * @param {Array.<Element>} mmlNodes List of MathML nodes.
 */
sre.SemanticNode.prototype.addMathmlNodes = function(mmlNodes) {
  for (var i = 0, mml; mml = mmlNodes[i]; i++) {
    if (this.mathml.indexOf(mml) == -1) {
      this.mathml.push(mml);
    }
  }
};


/**
 * Removes MathML nodes from the node's store of MathML nodes.
 * @param {Array.<Element>} mmlNodes List of MathML nodes.
 * @private
 */
sre.SemanticNode.prototype.removeMathmlNodes_ = function(mmlNodes) {
  var mmlList = this.mathml;
  for (var i = 0, mml; mml = mmlNodes[i]; i++) {
    var index = mmlList.indexOf(mml);
    if (index != -1) {
      mmlList.splice(index, 1);
    }
  }
  this.mathml = mmlList;
};


/**
 * Appends a child to the node.
 * @param {sre.SemanticNode} child The new child.
 */
sre.SemanticNode.prototype.appendChild = function(child) {
  this.childNodes.push(child);
  this.addMathmlNodes(child.mathml);
  child.parent = this;
};


/**
 * Replaces a child node of the node.
 * @param {!sre.SemanticNode} oldNode The node to be replaced.
 * @param {!sre.SemanticNode} newNode The new node.
 */
sre.SemanticNode.prototype.replaceChild = function(oldNode, newNode) {
  var index = this.childNodes.indexOf(oldNode);
  if (index == -1) {
    return;
  }
  oldNode.parent = null;
  newNode.parent = this;
  this.childNodes[index] = newNode;
  // To not mess up the order of MathML elements more than necessary, we only
  // remove and add difference lists. The hope is that we might end up with
  // little change.
  var removeMathml = oldNode.mathml.filter(
      function(x) {return newNode.mathml.indexOf(x) == -1;});
  var addMathml = newNode.mathml.filter(
      function(x) {return oldNode.mathml.indexOf(x) == -1;});
  this.removeMathmlNodes_(removeMathml);
  this.addMathmlNodes(addMathml);
};


/**
 * Appends a content node to the node.
 * @param {sre.SemanticNode} node The new content node.
 */
sre.SemanticNode.prototype.appendContentNode = function(node) {
  if (node) {
    this.contentNodes.push(node);
    this.addMathmlNodes(node.mathml);
    node.parent = this;
  }
};


/**
 * Removes a content node from the node.
 * @param {sre.SemanticNode} node The content node to be removed.
 */
sre.SemanticNode.prototype.removeContentNode = function(node) {
  if (node) {
    var index = this.contentNodes.indexOf(node);
    if (index != -1) {
      this.contentNodes.slice(index, 1);
    }
  }
};


/**
 * Tests if node is equal to the given node. Two nodes are considered equal if
 * they have the same type, role, content and all its children are equal.
 * @param {sre.SemanticNode} node The node to test against.
 * @return {boolean} True if nodes are equal wrt. structure and content.
 */
sre.SemanticNode.prototype.equals = function(node) {
  if (!node) {
    return false;
  }
  if (this.type !== node.type || this.role !== node.role ||
      this.textContent !== node.textContent ||
      this.childNodes.length !== node.childNodes.length ||
      this.contentNodes.length !== node.contentNodes.length) {
    return false;
  }
  for (var i = 0, node1, node2;
       node1 = this.childNodes[i], node2 = node.childNodes[i]; i++) {
    if (!node1.equals(node2)) {
      return false;
    }
  }
  for (i = 0;
       node1 = this.contentNodes[i], node2 = node.contentNodes[i]; i++) {
    if (!node1.equals(node2)) {
      return false;
    }
  }
  return true;
};


/**
 * Convenience method to display the whole tree and its elements.
 * @param {number} depth The depth of the tree.
 */
sre.SemanticNode.prototype.displayTree = function(depth) {
  depth++;
  var depthString = Array(depth).join('  ');
  console.log(depthString + this.toString());
  console.log(depthString + 'MathmlTree:');
  console.log(depthString + this.mathmlTreeString_());
  console.log(depthString + 'MathML:');
  for (var i = 0, mml; mml = this.mathml[i]; i++) {
    console.log(depthString + mml.toString());
  }
  console.log(depthString + 'Begin Content');
  this.contentNodes.forEach(function(x) {x.displayTree(depth);});
  console.log(depthString + 'End Content');
  console.log(depthString + 'Begin Children');
  this.childNodes.forEach(function(x) {x.displayTree(depth);});
  console.log(depthString + 'End Children');
};


/**
 * Returns a display version of the node's associated MathML tree.
 * @return {string} The MathML tree as string or EMPTY.
 * @private
 */
sre.SemanticNode.prototype.mathmlTreeString_ = function() {
  return this.mathmlTree ? this.mathmlTree.toString() : 'EMPTY';
};



// Copyright 2013 Google Inc.
// Copyright 2014 Volker Sorge
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
goog.provide('sre.SemanticTree.Node');

goog.require('sre.DomUtil');
goog.require('sre.MathUtil');
goog.require('sre.SemanticAttr');
goog.require('sre.SemanticUtil');
goog.require('sre.SystemExternal');



/**
 * Create an initial semantic tree.
 * @param {!Element} mml The original MathML node.
 * @constructor
 */
sre.SemanticTree = function(mml) {
  /** ID counter.
   * @type {number}
   * @private
   */
  this.idCounter_ = 0;

  /** Original MathML tree.
   * @type {Node}
   */
  this.mathml = mml;

  /** @type {!sre.SemanticTree.Node} */
  this.root = this.parseMathml_(mml);
};



/**
 * @param {number} id Node id.
 * @constructor
 */
sre.SemanticTree.Node = function(id) {
  /** @type {number} */
  this.id = id;

  /** @type {Array.<Element>} */
  this.mathml = [];

  /** @type {sre.SemanticTree.Node} */
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

  /** @type {!Array.<sre.SemanticTree.Node>} */
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
   * @type {!Array.<sre.SemanticTree.Node>}
   */
  this.contentNodes = [];
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
 * @param {!sre.SemanticTree.Node} semantic The semantic node that will become
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
 * @param {!sre.SemanticTree.Node} semantic The semantic node that will become
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
 * Retrieve all subnodes (including the node itself) that satisfy a given
 * predicate.
 * @param {function(sre.SemanticTree.Node): boolean} pred The predicate.
 * @return {!Array.<sre.SemanticTree.Node>} The nodes in the tree for which the
 *     predicate holds.
 */
sre.SemanticTree.Node.prototype.querySelectorAll = function(pred) {
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
  * An XML tree representation of the current node.
  * @param {Document} xml The XML document.
  * @param {boolean=} opt_brief If set attributes are omitted.
  * @return {Node} The XML representation of the node.
  */
sre.SemanticTree.Node.prototype.xml = function(xml, opt_brief) {
  /**
    * Translates a list of nodes into XML representation.
    * @param {string} tag Name of the enclosing tag.
    * @param {!Array.<!sre.SemanticTree.Node>} nodes A list of nodes.
    * @return {Node} An XML representation of the node list.
    */
  var xmlNodeList = function(tag, nodes) {
    var xmlNodes = nodes.map(function(x) {return x.xml(xml, opt_brief);});
    var tagNode = xml.createElement(tag);
    for (var i = 0, child; child = xmlNodes[i]; i++) {
      tagNode.appendChild(child);
    }
    return tagNode;
  };
  var node = xml.createElement(this.type);
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
 * Serializes the XML representation of a node.
 * @param {boolean=} opt_brief If attributes are to be omitted.
 * @return {string} Serialized string.
 */
sre.SemanticTree.Node.prototype.toString = function(opt_brief) {
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
sre.SemanticTree.Node.prototype.xmlAttributes_ = function(node) {
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


/** Creates a new node object.
 * @return {sre.SemanticTree.Node} The newly created node.
 * @private
 */
sre.SemanticTree.prototype.createNode_ = function() {
  return new sre.SemanticTree.Node(this.idCounter_++);
};


/**
 * Replaces a node in the tree. Updates the root node if necessary.
 * @param {!sre.SemanticTree.Node} oldNode The node to be replaced.
 * @param {!sre.SemanticTree.Node} newNode The new node.
 */
sre.SemanticTree.prototype.replaceNode = function(oldNode, newNode) {
  var parent = oldNode.parent;
  if (!parent) {
    this.root = newNode;
    return;
  }
  parent.replaceChild_(oldNode, newNode);
};


/**
 * Updates the content of the node thereby possibly changing type and role.
 * @param {string} content The new content string.
 * @private
 */
sre.SemanticTree.Node.prototype.updateContent_ = function(content) {
  // Remove superfluous whitespace!
  content = content.trim();
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
 * @private
 */
sre.SemanticTree.Node.prototype.addMathmlNodes_ = function(mmlNodes) {
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
sre.SemanticTree.Node.prototype.removeMathmlNodes_ = function(mmlNodes) {
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
 * @param {sre.SemanticTree.Node} child The new child.
 * @private
 */
sre.SemanticTree.Node.prototype.appendChild_ = function(child) {
  this.childNodes.push(child);
  this.addMathmlNodes_(child.mathml);
  child.parent = this;
};


/**
 * Replaces a child node of the node.
 * @param {!sre.SemanticTree.Node} oldNode The node to be replaced.
 * @param {!sre.SemanticTree.Node} newNode The new node.
 * @private
 */
sre.SemanticTree.Node.prototype.replaceChild_ = function(oldNode, newNode) {
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
  this.addMathmlNodes_(addMathml);
};


/**
 * Appends a content node to the node.
 * @param {sre.SemanticTree.Node} node The new content node.
 * @private
 */
sre.SemanticTree.Node.prototype.appendContentNode_ = function(node) {
  if (node) {
    this.contentNodes.push(node);
    this.addMathmlNodes_(node.mathml);
    node.parent = this;
  }
};


/**
 * Removes a content node from the node.
 * @param {sre.SemanticTree.Node} node The content node to be removed.
 */
sre.SemanticTree.Node.prototype.removeContentNode = function(node) {
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
 * @param {sre.SemanticTree.Node} node The node to test against.
 * @return {boolean} True if nodes are equal wrt. structure and content.
 */
sre.SemanticTree.Node.prototype.equals = function(node) {
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
 * This is the main function that creates the semantic tree by recursively
 * parsing the initial MathML tree and bottom up assembling the tree.
 * @param {!Element} mml The MathML tree.
 * @return {!sre.SemanticTree.Node} The root of the new tree.
 * @private
 */
sre.SemanticTree.prototype.parseMathml_ = function(mml) {
  var children = sre.DomUtil.toArray(mml.childNodes);
  var newNode;
  switch (sre.SemanticUtil.tagName(mml)) {
    case 'SEMANTICS':
      if (children.length > 0) {
        newNode = this.parseMathml_(/** @type {!Element} */(children[0]));
        break;
      }
    case 'MATH':
    case 'MROW':
    case 'MPADDED':
    case 'MSTYLE':
      children = sre.SemanticUtil.purgeNodes(children);
      // Single child node, i.e. the row is meaningless.
      if (children.length == 1) {
        newNode = this.parseMathml_(/** @type {!Element} */(children[0]));
      } else {
        // Case of a 'meaningful' row, even if they are empty.
        newNode = this.processRow_(this.parseMathmlChildren_(children));
      }
      newNode.mathml.unshift(mml);
      return newNode;
    case 'MFRAC':
      if (sre.SemanticUtil.isZeroLength(mml.getAttribute('linethickness'))) {
        var child0 = this.makeBranchNode_(
            sre.SemanticAttr.Type.LINE, [this.parseMathml_(children[0])], []);
        var child1 = this.makeBranchNode_(
            sre.SemanticAttr.Type.LINE, [this.parseMathml_(children[1])], []);
        newNode = this.makeBranchNode_(
            sre.SemanticAttr.Type.MULTILINE, [child0, child1], []);
      } else {
        newNode = this.makeFractionNode_(this.parseMathml_(children[0]),
                                         this.parseMathml_(children[1]));
      }
      break;
    case 'MSUB':
    case 'MSUP':
    case 'MSUBSUP':
    case 'MOVER':
    case 'MUNDER':
    case 'MUNDEROVER':
      newNode = this.makeLimitNode_(sre.SemanticUtil.tagName(mml),
                                    this.parseMathmlChildren_(children));
      break;
    case 'MROOT':
      newNode = this.makeBranchNode_(
          sre.SemanticAttr.Type.ROOT,
          [this.parseMathml_(children[1]), this.parseMathml_(children[0])],
          []);
      break;
    case 'MSQRT':
      children = this.parseMathmlChildren_(
          sre.SemanticUtil.purgeNodes(children));
      newNode = this.makeBranchNode_(
          sre.SemanticAttr.Type.SQRT, [this.processRow_(children)], []);
      break;
    case 'MTABLE':
      newNode = this.makeBranchNode_(
          sre.SemanticAttr.Type.TABLE,
          this.parseMathmlChildren_(children), []);
      if (sre.SemanticTree.tableIsMultiline_(newNode)) {
        this.tableToMultiline_(newNode);
      }
      break;
    case 'MTR':
      newNode = this.makeBranchNode_(
          sre.SemanticAttr.Type.ROW,
          this.parseMathmlChildren_(children), []);
      newNode.role = sre.SemanticAttr.Role.TABLE;
      break;
    case 'MTD':
      children = this.parseMathmlChildren_(
          sre.SemanticUtil.purgeNodes(children));
      newNode = this.makeBranchNode_(
          sre.SemanticAttr.Type.CELL, [this.processRow_(children)], []);
      newNode.role = sre.SemanticAttr.Role.TABLE;
      break;
    case 'MS':
    case 'MTEXT':
    case 'ANNOTATION-XML':
      newNode = this.makeLeafNode_(mml);
      newNode.type = sre.SemanticAttr.Type.TEXT;
      if (sre.SemanticUtil.tagName(mml) === 'MS') {
        newNode.role = sre.SemanticAttr.Role.STRING;
      }
      sre.SemanticTree.exprFont_(newNode);
      break;
    // TODO (sorge) Role and font of multi-character and digits unicode strings.
    // TODO (sorge) Reclassify wrongly tagged numbers or identifiers more
    //              systematically.
    // TODO (sorge) Put this all in a single clean reclassification method.
    case 'MI':
      newNode = this.makeIdentifierNode_(mml);
      break;
    case 'MN':
      newNode = this.makeLeafNode_(mml);
      if (newNode.type == sre.SemanticAttr.Type.UNKNOWN ||
          // In case of latin numbers etc.
          newNode.type == sre.SemanticAttr.Type.IDENTIFIER) {
        newNode.type = sre.SemanticAttr.Type.NUMBER;
      }
      sre.SemanticTree.numberRole_(newNode);
      sre.SemanticTree.exprFont_(newNode);
      break;
    case 'MO':
      newNode = this.makeLeafNode_(mml);
      if (newNode.type == sre.SemanticAttr.Type.UNKNOWN) {
        newNode.type = sre.SemanticAttr.Type.OPERATOR;
      }
      break;
    case 'MFENCED':
      newNode = this.processMfenced_(
          mml, this.parseMathmlChildren_(
          sre.SemanticUtil.purgeNodes(children)));
      var nodes = this.processTablesInRow_([newNode]);
      newNode = nodes[0];
      break;
    case 'MENCLOSE':
      children = this.parseMathmlChildren_(
          sre.SemanticUtil.purgeNodes(children));
      newNode = this.makeBranchNode_(
          sre.SemanticAttr.Type.ENCLOSE, [this.processRow_(children)], []);
      newNode.role =
          /** @type {!sre.SemanticAttr.Role} */(mml.getAttribute('notation')) ||
          sre.SemanticAttr.Role.UNKNOWN;
      break;
    case 'MMULTISCRIPTS':
      newNode = this.processMultiScript_(children);
      break;
    case 'ANNOTATION':
    case 'NONE':
      newNode = this.makeEmptyNode_();
      break;
    case 'MACTION':
      // This here is currently geared towards our collapse actions!
      if (children.length > 1) {
        newNode = this.parseMathml_(children[1]);
      } else {
        newNode = this.makeUnprocessed_(mml);
      }
      break;
    // TODO (sorge) Do something useful with error and phantom symbols.
    default:
      // Ordinarilly at this point we should not get any other tag.
      newNode = this.makeUnprocessed_(mml);
      break;
  }
  newNode.mathml.unshift(mml);
  newNode.mathmlTree = mml;
  return newNode;
};


/**
 * Parse a list of MathML nodes into the semantic tree.
 * @param {Array.<Element>} mmls A list of MathML nodes.
 * @return {!Array.<sre.SemanticTree.Node>} The list of resulting semantic
 *     node.
 * @private
 */
sre.SemanticTree.prototype.parseMathmlChildren_ = function(mmls) {
  var result = [];
  for (var i = 0, mml; mml = mmls[i]; i++) {
    result.push(this.parseMathml_(mml));
  }
  return result;
};


/**
 * Create a node that is to be processed at a later point in time.
 * @param {Node} mml The MathML tree.
 * @return {!sre.SemanticTree.Node} The new node.
 * @private
 */
sre.SemanticTree.prototype.makeUnprocessed_ = function(mml) {
  var node = this.createNode_();
  node.mathml = [mml];
  return node;
};


/**
 * Create an empty leaf node.
 * @return {!sre.SemanticTree.Node} The new node.
 * @private
 */
sre.SemanticTree.prototype.makeEmptyNode_ = function() {
  var node = this.createNode_();
  node.type = sre.SemanticAttr.Type.EMPTY;
  return node;
};


/**
 * Create a node with the given text content. The content is semantically
 * interpreted.
 * @param {string} content The text content of the node.
 * @return {!sre.SemanticTree.Node} The new node.
 * @private
 */
sre.SemanticTree.prototype.makeContentNode_ = function(content) {
  var node = this.createNode_();
  node.updateContent_(content);
  return node;
};


/**
 * Create a list of content nodes all with the same content.
 * @param {number} num The number of nodes to create.
 * @param {string} content The text content of the node.
 * @return {!Array.<sre.SemanticTree.Node>} The list of new nodes.
 * @private
 */
sre.SemanticTree.prototype.makeMultipleContentNodes_ = function(num, content) {
  var nodes = [];
  for (var i = 0; i < num; i++) {
    nodes.push(this.makeContentNode_(content));
  }
  return nodes;
};


/**
 * Create a leaf node.
 * @param {Node} mml The MathML tree.
 * @return {!sre.SemanticTree.Node} The new node.
 * @private
 */
sre.SemanticTree.prototype.makeLeafNode_ = function(mml) {
  if (!mml.textContent) {
    return this.makeEmptyNode_();
  }
  var node = this.makeContentNode_(mml.textContent);
  //node.mathml = [mml];
  node.font = mml.getAttribute('mathvariant') || node.font;
  return node;
};


/**
 * Create a branching node.
 * @param {!sre.SemanticAttr.Type} type The type of the node.
 * @param {!Array.<sre.SemanticTree.Node>} children The child nodes.
 * @param {!Array.<sre.SemanticTree.Node>} contentNodes The content Nodes.
 * @param {string=} opt_content Content string if there is any.
 * @return {!sre.SemanticTree.Node} The new node.
 * @private
 */
sre.SemanticTree.prototype.makeBranchNode_ = function(
    type, children, contentNodes, opt_content) {
  var node = this.createNode_();
  if (opt_content) {
    node.updateContent_(opt_content);
  }
  node.type = type;
  node.childNodes = children;
  node.contentNodes = contentNodes;
  children.concat(contentNodes).forEach(
      function(x) {
        x.parent = node;
        node.addMathmlNodes_(x.mathml);
      });
  return node;
};


/**
 * Create an identifier node, with particular emphasis on font disambiguation.
 * @param {Node} mml The MathML MI node.
 * @return {!sre.SemanticTree.Node} The new semantic identifier node.
 * @private
 */
sre.SemanticTree.prototype.makeIdentifierNode_ = function(mml) {
  var leaf = this.makeLeafNode_(mml);
  var variant = mml.getAttribute('mathvariant');
  if (mml.getAttribute('class') === 'MathML-Unit') {
    leaf.type = sre.SemanticAttr.Type.IDENTIFIER;
    leaf.role = sre.SemanticAttr.Role.UNIT;
  } else if (!variant && leaf.textContent.length == 1 &&
             (leaf.role == sre.SemanticAttr.Role.INTEGER ||
              leaf.role == sre.SemanticAttr.Role.LATINLETTER ||
              leaf.role == sre.SemanticAttr.Role.GREEKLETTER) &&
             leaf.font == sre.SemanticAttr.Font.NORMAL) {
    // If single letter or single integer and font normal but no mathvariant
    // then this letter/number should be in italic font.
    leaf.font = sre.SemanticAttr.Font.ITALIC;
    return leaf;
  }
  if (leaf.type == sre.SemanticAttr.Type.UNKNOWN) {
    leaf.type = sre.SemanticAttr.Type.IDENTIFIER;
  }
  sre.SemanticTree.exprFont_(leaf);
  return leaf;
};


/**
 * Create a branching node for an implicit operation, currently assumed to
 * be of multiplicative type.
 * @param {!Array.<!sre.SemanticTree.Node>} nodes The operands.
 * @return {!sre.SemanticTree.Node} The new branch node.
 * @private
 */
sre.SemanticTree.prototype.makeImplicitNode_ = function(nodes) {
  nodes = this.getMixedNumbers_(nodes);
  nodes = this.combineUnits_(nodes);
  if (nodes.length == 1) {
    return nodes[0];
  }
  var operators = this.makeMultipleContentNodes_(
      nodes.length - 1, sre.SemanticAttr.invisibleTimes());
  // For now we assume this is a multiplication using invisible times.
  var newNode = this.makeInfixNode_(
      nodes, /**@type{!sre.SemanticTree.Node}*/(operators[0]));
  newNode.role = sre.SemanticAttr.Role.IMPLICIT;
  operators.forEach(function(op) {op.parent = newNode;});
  newNode.contentNodes = operators;
  return newNode;
};


/**
 * Create a branching node for an infix operation.
 * @param {!Array.<sre.SemanticTree.Node>} children The operands.
 * @param {!sre.SemanticTree.Node} opNode The operator.
 * @return {!sre.SemanticTree.Node} The new branch node.
 * @private
 */
sre.SemanticTree.prototype.makeInfixNode_ = function(children, opNode) {
  var node = this.makeBranchNode_(
      sre.SemanticAttr.Type.INFIXOP, children, [opNode],
      sre.SemanticTree.getEmbellishedInner_(opNode).textContent);
  node.role = opNode.role;
  return node;
};


/**
 * Creates a node of the specified type by collapsing the given node list into
 * one content (thereby concatenating the content of each node into a single
 * content string) with the inner node as a child.
 * @param {!sre.SemanticTree.Node} inner The inner node.
 * @param {!Array.<sre.SemanticTree.Node>} nodeList List of nodes.
 * @param {!sre.SemanticAttr.Type} type The new type of the node.
 * @return {!sre.SemanticTree.Node} The new branch node.
 * @private
 */
sre.SemanticTree.prototype.makeConcatNode_ = function(inner, nodeList, type) {
  if (nodeList.length == 0) {
    return inner;
  }
  var content = nodeList.map(function(x) {
    return sre.SemanticTree.getEmbellishedInner_(x).textContent;
  }).join(' ');
  var newNode = this.makeBranchNode_(type, [inner], nodeList, content);
  if (nodeList.length > 1) {
    newNode.role = sre.SemanticAttr.Role.MULTIOP;
  }
  return newNode;
};


/**
 * Wraps a node into prefix operators.
 * Example: + - a becomes (+ (- (a)))
 * Input: a  [+, -] ->  Output: content: '+ -', child: a
 * @param {!sre.SemanticTree.Node} node The inner node.
 * @param {!Array.<sre.SemanticTree.Node>} prefixes Prefix operators
 * from the outermost to the innermost.
 * @return {!sre.SemanticTree.Node} The new branch node.
 * @private
 */
sre.SemanticTree.prototype.makePrefixNode_ = function(node, prefixes) {
  var negatives = sre.SemanticTree.partitionNodes_(
      prefixes, sre.SemanticTree.attrPred_('role', 'SUBTRACTION'));
  var newNode = this.makeConcatNode_(
      node, negatives.comp.pop(), sre.SemanticAttr.Type.PREFIXOP);

  while (negatives.rel.length > 0) {
    newNode = this.makeConcatNode_(
        newNode, [negatives.rel.pop()], sre.SemanticAttr.Type.PREFIXOP);
    newNode.role = sre.SemanticAttr.Role.NEGATIVE;
    newNode = this.makeConcatNode_(
        newNode, negatives.comp.pop(), sre.SemanticAttr.Type.PREFIXOP);
  }
  return newNode;
};


/**
 * Wraps a node into postfix operators.
 * Example: a - + becomes (((a) -) +)
 * Input: a  [-, +] ->  Output: content: '- +', child: a
 * @param {!sre.SemanticTree.Node} node The inner node.
 * @param {!Array.<sre.SemanticTree.Node>} postfixes Postfix operators from
 * innermost to outermost.
 * @return {!sre.SemanticTree.Node} The new branch node.
 * @private
 */
sre.SemanticTree.prototype.makePostfixNode_ = function(node, postfixes) {
  if (!postfixes.length) {
    return node;
  }
  return this.makeConcatNode_(
      node, postfixes, sre.SemanticAttr.Type.POSTFIXOP);
};


/**
 * Processes a list of nodes, combining expressions by delimiters, tables,
 * punctuation sequences, function/big operator/integral applications to
 * generate a syntax tree with relation and operator precedence.
 *
 * This is the main heuristic to rewrite a flat row of terms into a meaningful
 * term tree.
 * @param {!Array.<sre.SemanticTree.Node>} nodes The list of nodes.
 * @return {!sre.SemanticTree.Node} The root node of the syntax tree.
 * @private
 */
sre.SemanticTree.prototype.processRow_ = function(nodes) {
  nodes = nodes.filter(function(x) {
    return !sre.SemanticTree.attrPred_('type', 'EMPTY')(x);
  });
  if (nodes.length == 0) {
    return this.makeEmptyNode_();
  }
  nodes = this.getFencesInRow_(nodes);
  nodes = this.processTablesInRow_(nodes);
  nodes = this.getPunctuationInRow_(nodes);
  nodes = this.getTextInRow_(nodes);
  nodes = this.getFunctionsInRow_(nodes);
  return this.processRelationsInRow_(nodes);
};


/**
 * Combines adjacent units in
 * @param {!Array.<!sre.SemanticTree.Node>} nodes The list of nodes.
 * @return {!Array.<!sre.SemanticTree.Node>} The new list of nodes.
 * @private
 */
sre.SemanticTree.prototype.combineUnits_ = function(nodes) {
  var partition = sre.SemanticTree.partitionNodes_(
      nodes, function(x) {
        return !sre.SemanticTree.attrPred_('role', 'UNIT')(x);
      }
      );
  if (nodes.length === partition.rel.length) {
    return partition.rel;
  }
  var result = [];
  do {
    var comp = partition.comp.shift();
    var rel = partition.rel.shift();
    if (comp.length == 1) {
      result = result.concat(comp);
    }
    if (comp.length > 1) {
      var operator = this.makeContentNode_(sre.SemanticAttr.invisibleTimes());
      // For now we assume this is a multiplication using invisible times.
      var unitNode = this.makeInfixNode_(comp, operator);
      unitNode.role = sre.SemanticAttr.Role.UNIT;
      result.push(unitNode);
    }
    if (rel) {
      result.push(rel);
    }
  } while (rel);
  return result;
};


/**
 * Finds mixed numbers in a list of single nodes. A mixed number is an integer
 * followed by a vulgar fraction.
 * @param {!Array.<!sre.SemanticTree.Node>} nodes The list of nodes.
 * @return {!Array.<!sre.SemanticTree.Node>} The new list of nodes.
 * @private
 */
sre.SemanticTree.prototype.getMixedNumbers_ = function(nodes) {
  var partition = sre.SemanticTree.partitionNodes_(
      nodes, function(x) {
        return sre.SemanticTree.attrPred_('type', 'FRACTION')(x) &&
            sre.SemanticTree.attrPred_('role', 'VULGAR')(x);});
  if (!partition.rel.length) {
    return nodes;
  }
  var result = [];
  for (var i = 0, rel; rel = partition.rel[i]; i++) {
    var comp = partition.comp[i];
    var last = comp.length - 1;
    if (comp[last] &&
        sre.SemanticTree.attrPred_('type', 'NUMBER')(comp[last]) &&
        sre.SemanticTree.attrPred_('role', 'INTEGER')(comp[last])) {
      var newNode = this.makeBranchNode_(
          sre.SemanticAttr.Type.NUMBER, [comp[last], rel], []);
      newNode.role = sre.SemanticAttr.Role.MIXED;
      result = result.concat(comp.slice(0, last));
      result.push(newNode);
    } else {
      result = result.concat(comp);
      result.push(rel);
    }
  }
  return result.concat(partition.comp[partition.comp.length - 1]);
};


/**
 * Seperates text from math content and combines them into a punctuated node,
 * with dummy punctuation invisible comma.
 * @param {!Array.<sre.SemanticTree.Node>} nodes The list of nodes.
 * @return {!Array.<sre.SemanticTree.Node>} The new list of nodes.
 * @private
 */
sre.SemanticTree.prototype.getTextInRow_ = function(nodes) {
  if (nodes.length <= 1) {
    return nodes;
  }
  var partition = sre.SemanticTree.partitionNodes_(
      nodes, sre.SemanticTree.attrPred_('type', 'TEXT'));
  if (partition.rel.length == 0) {
    return nodes;
  }
  var result = [];
  var nextComp = partition.comp[0];
  if (nextComp.length > 0) {
    result.push(this.processRow_(nextComp));
  }
  for (var i = 0, text; text = partition.rel[i]; i++) {
    result.push(text);
    nextComp = partition.comp[i + 1];
    if (nextComp.length > 0) {
      result.push(this.processRow_(nextComp));
    }
  }
  return [this.makeDummyNode_(result)];
};


/**
 * Constructs a syntax tree with relation and operator precedence from a list
 * of nodes.
 * @param {!Array.<!sre.SemanticTree.Node>} nodes The list of nodes.
 * @return {!sre.SemanticTree.Node} The root node of the syntax tree.
 * @private
 */
sre.SemanticTree.prototype.processRelationsInRow_ = function(nodes) {
  var partition = sre.SemanticTree.partitionNodes_(
      nodes, sre.SemanticTree.isRelation_);
  var firstRel = partition.rel[0];

  if (!firstRel) {
    return this.processOperationsInRow_(nodes);
  }
  if (nodes.length == 1) {
    return nodes[0];
  }
  var children = partition.comp.map(
      goog.bind(this.processOperationsInRow_, this));
  if (partition.rel.some(
      function(x) {return !x.equals(firstRel);})) {
    var node = this.makeBranchNode_(
        sre.SemanticAttr.Type.MULTIREL, children, partition.rel);
    if (partition.rel.every(
        function(x) {return x.role === firstRel.role;})) {
      node.role = firstRel.role;
    }
    return node;
  }
  node = this.makeBranchNode_(sre.SemanticAttr.Type.RELSEQ,
      children, partition.rel,
      sre.SemanticTree.getEmbellishedInner_(firstRel).textContent);
  node.role = firstRel.role;
  return node;
};


/**
 * Constructs a syntax tree with operator precedence from a list nodes.
 * @param {!Array.<!sre.SemanticTree.Node>} nodes The list of nodes.
 * @return {!sre.SemanticTree.Node} The root node of the syntax tree.
 * @private
 */
sre.SemanticTree.prototype.processOperationsInRow_ = function(nodes) {
  if (nodes.length == 0) {
    return this.makeEmptyNode_();
  }
  if (nodes.length == 1) {
    return nodes[0];
  }

  var prefix = [];
  while (nodes.length > 0 &&
         sre.SemanticTree.isOperator_(nodes[0])) {
    prefix.push(nodes.shift());
  }
  // Pathological case: only operators in row.
  if (nodes.length == 0) {
    return this.makePrefixNode_(prefix.pop(), prefix);
  }
  if (nodes.length == 1) {
    return this.makePrefixNode_(nodes[0], prefix);
  }

  var split = sre.SemanticTree.sliceNodes_(
      nodes, sre.SemanticTree.isOperator_);
  // At this point, we know that split.head is not empty!
  var node = this.makePrefixNode_(
      this.makeImplicitNode_(
          /** @type {!Array.<!sre.SemanticTree.Node>} */ (split.head)),
      prefix);
  if (!split.div) {
    return node;
  }
  return this.makeOperationsTree_(split.tail, node, split.div);
};


/**
 * Recursively constructs syntax tree with operator precedence from a list nodes
 * given a initial root node.
 * @param {!Array.<sre.SemanticTree.Node>} nodes The list of nodes.
 * @param {!sre.SemanticTree.Node} root Initial tree.
 * @param {!sre.SemanticTree.Node} lastop Last operator that has not been
 * processed yet.
 * @param {Array.<sre.SemanticTree.Node>=} opt_prefixes Operator nodes that
 * will become prefix operation (or postfix in case they come after last
 * operand).
 * @return {!sre.SemanticTree.Node} The root node of the syntax tree.
 * @private
 */
sre.SemanticTree.prototype.makeOperationsTree_ = function(
    nodes, root, lastop, opt_prefixes) {
  var prefixes = opt_prefixes || [];

  if (nodes.length == 0) {
    // Left over prefixes become postfixes.
    prefixes.unshift(lastop);
    if (root.type == sre.SemanticAttr.Type.INFIXOP) {
      // We assume prefixes bind stronger than postfixes.
      var node = this.makePostfixNode_(
          // Here we know that the childNodes are not empty!
          /** @type {!sre.SemanticTree.Node} */ (root.childNodes.pop()),
          prefixes);
      root.appendChild_(node);
      return root;
    }
    return this.makePostfixNode_(root, prefixes);
  }

  var split = sre.SemanticTree.sliceNodes_(
      nodes, sre.SemanticTree.isOperator_);

  if (split.head.length == 0) {
    prefixes.push(split.div);
    return this.makeOperationsTree_(split.tail, root, lastop, prefixes);
  }

  var node = this.makePrefixNode_(
      this.makeImplicitNode_(split.head), prefixes);
  var newNode = this.appendOperand_(root, lastop, node);
  if (!split.div) {
    return newNode;
  }

  return this.makeOperationsTree_(split.tail, newNode, split.div, []);
};


// TODO (sorge) The following four functions could be combined into
// a single one. Currently it is clearer the way it is, though.
/**
 * Appends an operand at the right place in an operator tree.
 * @param {!sre.SemanticTree.Node} root The operator tree.
 * @param {!sre.SemanticTree.Node} op The operator node.
 * @param {!sre.SemanticTree.Node} node The node to be added.
 * @return {!sre.SemanticTree.Node} The modified root node.
 * @private
 */
sre.SemanticTree.prototype.appendOperand_ = function(root, op, node) {
  // In general our operator tree will have the form that additions and
  // subtractions are stacked, while multiplications are subordinate.
  if (root.type != sre.SemanticAttr.Type.INFIXOP) {
    return this.makeInfixNode_([root, node], op);
  }
  if (this.appendExistingOperator_(root, op, node)) {
    return root;
  }
  return op.role == sre.SemanticAttr.Role.MULTIPLICATION ?
      this.appendMultiplicativeOp_(root, op, node) :
      this.appendAdditiveOp_(root, op, node);
};


/**
 * Appends a multiplicative operator and operand.
 * @param {!sre.SemanticTree.Node} root The root node.
 * @param {!sre.SemanticTree.Node} op The operator node.
 * @param {!sre.SemanticTree.Node} node The operand node to be added.
 * @return {!sre.SemanticTree.Node} The modified root node.
 * @private
 */
sre.SemanticTree.prototype.appendMultiplicativeOp_ = function(root, op, node) {
  // This ensures that implicit nodes stay together, which is probably what
  // we want.
  if (root.role == sre.SemanticAttr.Role.IMPLICIT) {
    return this.makeInfixNode_([root, node], op);
  }
  var lastRoot = root;
  var lastChild = root.childNodes[root.childNodes.length - 1];
  while (lastChild && lastChild.type == sre.SemanticAttr.Type.INFIXOP) {
    lastRoot = lastChild;
    lastChild = lastRoot.childNodes[root.childNodes.length - 1];
  }
  var newNode = this.makeInfixNode_([lastRoot.childNodes.pop(), node], op);
  lastRoot.appendChild_(newNode);
  return root;
};


/**
 * Appends an additive/substractive operator and operand.
 * @param {!sre.SemanticTree.Node} root The old root node.
 * @param {!sre.SemanticTree.Node} op The operator node.
 * @param {!sre.SemanticTree.Node} node The operand node to be added.
 * @return {!sre.SemanticTree.Node} The new root node.
 * @private
 */
sre.SemanticTree.prototype.appendAdditiveOp_ = function(root, op, node) {
  return this.makeInfixNode_([root, node], op);
};


/**
 * Adds an operand to an operator node if it is the continuation of an existing
 * operation.
 * @param {!sre.SemanticTree.Node} root The root node.
 * @param {!sre.SemanticTree.Node} op The operator node.
 * @param {!sre.SemanticTree.Node} node The operand node to be added.
 * @return {boolean} True if operator was successfully appended.
 * @private
 */
sre.SemanticTree.prototype.appendExistingOperator_ = function(root, op, node) {
  if (!root || root.type != sre.SemanticAttr.Type.INFIXOP ||
      // This ensures that implicit nodes stay together, which is probably what
      // we want.
      root.role === sre.SemanticAttr.Role.IMPLICIT) {
    return false;
  }
  if (root.contentNodes[0].equals(op)) {
    root.appendContentNode_(op);
    root.appendChild_(node);
    return true;
  }
  return this.appendExistingOperator_(
      // Again, if this is an INFIXOP node, we know it has a child!
      /** @type {!sre.SemanticTree.Node} */
      (root.childNodes[root.childNodes.length - 1]),
      op, node);
};


// TODO (sorge) The following procedure needs a rational reconstruction. It
// contains a number of similar cases which should be combined.
/**
 * Combines delimited expressions in a list of nodes.
 *
 * The basic idea of the heuristic is as follows:
 * 1. Opening and closing delimiters are matched regardless of the actual shape
 *    of the fence. These are turned into fenced nodes.
 * 2. Neutral fences are matched only with neutral fences of the same shape.
 * 3. For a collection of unmatched neutral fences we try to get a maximum
 *    number of matching fences. E.g. || a|b || would be turned into a fenced
 *    node with fences || and content a|b.
 * 4. Any remaining unmatched delimiters are turned into punctuation nodes.
 * @param {!Array.<!sre.SemanticTree.Node>} nodes The list of nodes.
 * @return {!Array.<!sre.SemanticTree.Node>} The new list of nodes.
 * @private
 */
sre.SemanticTree.prototype.getFencesInRow_ = function(nodes) {
  var partition = sre.SemanticTree.partitionNodes_(
      nodes,
      sre.SemanticTree.isFence_);
  partition = sre.SemanticTree.purgeFences_(partition);
  var felem = partition.comp.shift();
  return this.processFences_(partition.rel, partition.comp, [], [felem]);
};


/**
 * Recursively processes a list of nodes and combines all the fenced expressions
 * into single nodes. It also processes singular fences, building expressions
 * that are only fenced left or right.
 * @param {!Array.<sre.SemanticTree.Node>} fences FIFO queue of fence nodes.
 * @param {!Array.<Array.<sre.SemanticTree.Node>>} content FIFO queue content
 *     between fences.
 * @param {!Array.<sre.SemanticTree.Node>} openStack LIFO stack of open fences.
 * @param {!Array.<!Array.<sre.SemanticTree.Node>>} contentStack LIFO stack of
 *     content between fences yet to be processed.
 * @return {!Array.<sre.SemanticTree.Node>} A list of nodes with all fenced
 *     expressions processed.
 * @private
 */
sre.SemanticTree.prototype.processFences_ = function(
    fences, content, openStack, contentStack) {
  // Base case 1: Everything is used up.
  if (fences.length == 0 && openStack.length == 0) {
    return contentStack[0];
  }
  var openPred = sre.SemanticTree.attrPred_('role', 'OPEN');
  // Base case 2: Only open and neutral fences are left on the stack.
  if (fences.length == 0) {
    // Basic idea:
    // - make punctuation nodes from open fences
    // - combine as many neutral fences as possible, if the are not separated by
    //   open fences.
    // The idea is to allow for things like case statements etc. and not bury
    // them inside a neutral fenced expression.
    //
    // 0. We process the list from left to right. Hence the first element on the
    //    content stack are actually left most elements in the expression.
    // 1. Slice at open fence.
    // 2. On tail optimize for neutral fences.
    // 3. Repeat until fence stack is exhausted.
    // Push rightmost elements onto the result.
    var result = contentStack.shift();
    while (openStack.length > 0) {
      if (openPred(openStack[0])) {
        var firstOpen = openStack.shift();
        sre.SemanticTree.fenceToPunct_(firstOpen);
        result.push(firstOpen);
      } else {
        var split = sre.SemanticTree.sliceNodes_(openStack, openPred);
        var cutLength = split.head.length - 1;
        var innerNodes = this.processNeutralFences_(
            split.head, contentStack.slice(0, cutLength));
        contentStack = contentStack.slice(cutLength);
        //var rightContent = contentStack.shift();
        result.push.apply(result, innerNodes);
        //result.push.apply(result, rightContent);
        if (split.div) {
          split.tail.unshift(split.div);
        }
        openStack = split.tail;
      }
      result.push.apply(result, contentStack.shift());
    }
    return result;
  }
  var lastOpen = openStack[openStack.length - 1];
  var firstRole = fences[0].role;
  // General opening case.
  // Either we have an open fence.
  if (firstRole == sre.SemanticAttr.Role.OPEN ||
      // Or we have a neutral fence that does not have a counter part.
          (firstRole == sre.SemanticAttr.Role.NEUTRAL &&
              (!lastOpen ||
               // COMPARISON (neutral fences)
                  fences[0].textContent != lastOpen.textContent))) {
    openStack.push(fences.shift());
    var cont = content.shift();
    if (cont) {
      contentStack.push(cont);
    }
    // contentStack.push(content.shift());
    return this.processFences_(fences, content, openStack, contentStack);
  }
  // General closing case.
  if (lastOpen && (
      // Closing fence for some opening fence.
      (firstRole == sre.SemanticAttr.Role.CLOSE &&
          lastOpen.role == sre.SemanticAttr.Role.OPEN) ||
      // Neutral fence with exact counter part.
      (firstRole == sre.SemanticAttr.Role.NEUTRAL &&
       // COMPARISON (neutral fences)
          fences[0].textContent == lastOpen.textContent))) {
    var fenced = this.makeHorizontalFencedNode_(
        openStack.pop(), fences.shift(), contentStack.pop());
    contentStack.push(contentStack.pop().concat([fenced], content.shift()));
    return this.processFences_(fences, content, openStack, contentStack);
  }
  // Closing with a neutral fence on the stack.
  if (lastOpen && firstRole == sre.SemanticAttr.Role.CLOSE &&
      lastOpen.role == sre.SemanticAttr.Role.NEUTRAL &&
          openStack.some(openPred)) {
    // Steps of the algorithm:
    // 1. Split list at right most opening bracket.
    // 2. Cut content list at corresponding length.
    // 3. Optimise the neutral fences.
    // 4. Make fenced node.
    //
    // Careful, this reverses openStack!
    var split = sre.SemanticTree.sliceNodes_(openStack, openPred, true);
    // We know that
    // (a) div & tail exist,
    // (b) all are combined in this step into a single fenced node,
    // (c) head is the new openStack,
    // (d) the new contentStack is remainder of contentStack + new fenced node +
    // shift of content.
    var rightContent = contentStack.pop();
    var cutLength = contentStack.length - split.tail.length + 1;
    var innerNodes = this.processNeutralFences_(
        split.tail, contentStack.slice(cutLength));
    contentStack = contentStack.slice(0, cutLength);
    var fenced = this.makeHorizontalFencedNode_(
        split.div, fences.shift(),
        contentStack.pop().concat(innerNodes, rightContent));
    contentStack.push(contentStack.pop().concat([fenced], content.shift()));
    return this.processFences_(fences, content, split.head, contentStack);
  }
  // Final Case: A singular closing fence.
  // We turn the fence into a punctuation.
  var fenced = fences.shift();
  sre.SemanticTree.fenceToPunct_(fenced);
  contentStack.push(contentStack.pop().concat([fenced], content.shift()));
  return this.processFences_(fences, content, openStack, contentStack);
};


// TODO (sorge) The following could be done with linear programming.
/**
 * Trys to combine neutral fences as much as possible.
 * @param {!Array.<!sre.SemanticTree.Node>} fences A list of neutral fences.
 * @param {!Array.<!Array.<sre.SemanticTree.Node>>} content Intermediate
 *     content. Observe that |content| = |fences| - 1
 * @return {!Array.<sre.SemanticTree.Node>} List of node with fully fenced
 *     nodes.
 * @private
 */
sre.SemanticTree.prototype.processNeutralFences_ = function(fences, content) {
  if (fences.length == 0) {
    return fences;
  }
  if (fences.length == 1) {
    sre.SemanticTree.fenceToPunct_(fences[0]);
    return fences;
  }
  var firstFence = fences.shift();
  var split = sre.SemanticTree.sliceNodes_(
      // COMPARISON (neutral fences)
      fences, function(x) {
        return sre.SemanticTree.getEmbellishedInner_(x).textContent ==
            sre.SemanticTree.getEmbellishedInner_(firstFence).textContent;});
  if (!split.div) {
    sre.SemanticTree.fenceToPunct_(firstFence);
    var restContent = content.shift();
    restContent.unshift(firstFence);
    return restContent.concat(this.processNeutralFences_(fences, content));
  }
  var newContent = this.combineFencedContent_(
      firstFence, split.div, split.head, content);
  if (split.tail.length > 0) {
    var leftContent = newContent.shift();
    var result = this.processNeutralFences_(split.tail, newContent);
    return leftContent.concat(result);
  }
  return newContent[0];
};


/**
 * Combines nodes framed by two matching fences using the given content.
 * Example: leftFence: [, rightFence: ], midFences: |, |
 *          content: c1, c2, c3, c4, ... cn
 *          return: [c1 | c2 | c3 ], c4, ... cn
 * @param {!sre.SemanticTree.Node} leftFence The left fence.
 * @param {!sre.SemanticTree.Node} rightFence The right fence.
 * @param {!Array.<sre.SemanticTree.Node>} midFences A list of intermediate
 *     fences.
 * @param {!Array.<!Array.<sre.SemanticTree.Node>>} content Intermediate
 *     content. Observe that |content| = |fences| - 1 + k where k >= 0 is the
 *     remainder.
 * @return {!Array.<!Array.<sre.SemanticTree.Node>>} List of content nodes
 *     where the first is the fully fenced node wrt. the given left and right
 *     fence.
 * @private
 */
sre.SemanticTree.prototype.combineFencedContent_ = function(
    leftFence, rightFence, midFences, content) {

  if (midFences.length == 0) {
    var fenced = this.makeHorizontalFencedNode_(
        leftFence, rightFence, content.shift());
    if (content.length > 0) {
      content[0].unshift(fenced);
    } else {
      content = [[fenced]];
    }
    return content;
  }

  var leftContent = content.shift();
  var cutLength = midFences.length - 1;
  var midContent = content.slice(0, cutLength);
  content = content.slice(cutLength);
  var rightContent = content.shift();
  var innerNodes = this.processNeutralFences_(midFences, midContent);
  leftContent.push.apply(leftContent, innerNodes);
  leftContent.push.apply(leftContent, rightContent);
  var fenced = this.makeHorizontalFencedNode_(
      leftFence, rightFence, leftContent);
  if (content.length > 0) {
    content[0].unshift(fenced);
  } else {
    content = [[fenced]];
  }
  return content;
};


/**
 * Rewrite fences into punctuation. This is done with any "leftover" fence.
 * @param {sre.SemanticTree.Node} fence Fence.
 * @private
 */
sre.SemanticTree.fenceToPunct_ = function(fence) {
  var newRole;
  switch (fence.role) {
    case sre.SemanticAttr.Role.NEUTRAL:
      newRole = sre.SemanticAttr.Role.VBAR;
      break;
    case sre.SemanticAttr.Role.OPEN:
      newRole = sre.SemanticAttr.Role.OPENFENCE;
      break;
    case sre.SemanticAttr.Role.CLOSE:
      newRole = sre.SemanticAttr.Role.CLOSEFENCE;
      break;
    default:
      return;
  }
  while (fence.embellished) {
    fence.embellished = sre.SemanticAttr.Type.PUNCTUATION;
    fence.role = newRole;
    fence = fence.childNodes[0];
  }
  fence.type = sre.SemanticAttr.Type.PUNCTUATION;
  fence.role = newRole;
};


/**
 * Create a fenced node.
 * @param {sre.SemanticTree.Node} ofence Opening fence.
 * @param {sre.SemanticTree.Node} cfence Closing fence.
 * @param {!Array.<sre.SemanticTree.Node>} content The content
 *     between the fences.
 * @return {!sre.SemanticTree.Node} The new node.
 * @private
 */
sre.SemanticTree.prototype.makeHorizontalFencedNode_ = function(
    ofence, cfence, content) {
  var childNode = this.processRow_(content);
  var newNode = this.makeBranchNode_(
      sre.SemanticAttr.Type.FENCED, [childNode], [ofence, cfence]);
  if (ofence.role == sre.SemanticAttr.Role.OPEN) {
    newNode.role = sre.SemanticAttr.Role.LEFTRIGHT;
  } else {
    newNode.role = ofence.role;
  }
  return sre.SemanticTree.rewriteFencedNode_(newNode);
};


/**
 * Combines sequences of punctuated expressions in a list of nodes.
 * @param {!Array.<sre.SemanticTree.Node>} nodes The list of nodes.
 * @return {!Array.<sre.SemanticTree.Node>} The new list of nodes.
 * @private
 */
sre.SemanticTree.prototype.getPunctuationInRow_ = function(nodes) {
  // For now we just make a punctuation node with a particular role. This is
  // similar to an mrow. The only exception are ellipses, which we assume to be
  // in lieu of identifiers.
  // In addition we keep the single punctuation nodes as content.
  var partition = sre.SemanticTree.partitionNodes_(
      nodes, function(x) {
        return sre.SemanticTree.isPunctuation_(x) &&
            !sre.SemanticTree.attrPred_('role', 'ELLIPSIS')(x);});
  if (partition.rel.length == 0) {
    return nodes;
  }
  var newNodes = [];
  var firstComp = partition.comp.shift();
  if (firstComp.length > 0) {
    newNodes.push(this.processRow_(firstComp));
  }
  var relCounter = 0;
  while (partition.comp.length > 0) {
    newNodes.push(partition.rel[relCounter++]);
    firstComp = partition.comp.shift();
    if (firstComp.length > 0) {
      newNodes.push(this.processRow_(firstComp));
    }
  }
  return [this.makePunctuatedNode_(newNodes, partition.rel)];
};


/**
 * Create a punctuated node.
 * @param {!Array.<!sre.SemanticTree.Node>} nodes List of all nodes separated
 * by punctuations.
 * @param {!Array.<!sre.SemanticTree.Node>} punctuations List of all separating
 * punctations. Observe that punctations is a subset of nodes.
 * @return {!sre.SemanticTree.Node}
 * @private
 */
sre.SemanticTree.prototype.makePunctuatedNode_ = function(
    nodes, punctuations) {
  var newNode = this.makeBranchNode_(
      sre.SemanticAttr.Type.PUNCTUATED, nodes, punctuations);
  if (punctuations.length == nodes.length) {
    var firstRole = punctuations[0].role;
    if (firstRole != sre.SemanticAttr.Role.UNKNOWN &&
        punctuations.every(function(punct) {return punct.role == firstRole;})) {
      newNode.role = firstRole;
      return newNode;
    }
  }
  if (punctuations.length == 1 &&
      nodes[0].type == sre.SemanticAttr.Type.PUNCTUATION) {
    newNode.role = sre.SemanticAttr.Role.STARTPUNCT;
  } else if (punctuations.length == 1 &&
      nodes[nodes.length - 1].type == sre.SemanticAttr.Type.PUNCTUATION) {
    newNode.role = sre.SemanticAttr.Role.ENDPUNCT;
  } else if (punctuations.every(sre.SemanticTree.attrPred_('role', 'DUMMY'))) {
    newNode.role = sre.SemanticAttr.Role.TEXT;
  } else {
    newNode.role = sre.SemanticAttr.Role.SEQUENCE;
  }
  return newNode;
};


/**
 * Create an dummy punctuated node.
 * @param {!Array.<!sre.SemanticTree.Node>} children The child nodes to be
 *     separated by invisible comma.
 * @return {!sre.SemanticTree.Node} The new node.
 * @private
 */
sre.SemanticTree.prototype.makeDummyNode_ = function(children) {
  var commata = this.makeMultipleContentNodes_(
      children.length - 1, sre.SemanticAttr.invisibleComma());
  commata.forEach(function(comma) {comma.role = sre.SemanticAttr.Role.DUMMY;});
  return this.makePunctuatedNode_(children, commata);
};


/**
 * Creates a limit node from a sub/superscript or over/under node if the central
 * element is a big operator. Otherwise it creates the standard elements.
 * @param {string} mmlTag The tag name of the original node.
 * @param {!Array.<!sre.SemanticTree.Node>} children The children of the
 *     original node.
 * @return {!sre.SemanticTree.Node} The newly created limit node.
 * @private
 */
sre.SemanticTree.prototype.makeLimitNode_ = function(mmlTag, children) {
  var center = children[0];
  var isFunction = sre.SemanticTree.attrPred_('type', 'FUNCTION')(center);
  // TODO (sorge) Put this into a single function.
  var isLimit = sre.SemanticTree.attrPred_('type', 'LARGEOP')(center) ||
      sre.SemanticTree.attrPred_('type', 'LIMBOTH')(center) ||
      sre.SemanticTree.attrPred_('type', 'LIMLOWER')(center) ||
      sre.SemanticTree.attrPred_('type', 'LIMUPPER')(center) ||
      (isFunction && sre.SemanticTree.attrPred_('role', 'LIMFUNC')(center));
  var type = sre.SemanticAttr.Type.UNKNOWN;
  // TODO (sorge) Make use of the difference in information on sub vs under etc.
  if (isLimit) {
    switch (mmlTag) {
      case 'MSUB':
      case 'MUNDER':
        type = sre.SemanticAttr.Type.LIMLOWER;
        break;
      case 'MSUP':
      case 'MOVER':
        type = sre.SemanticAttr.Type.LIMUPPER;
        break;
      case 'MSUBSUP':
      case 'MUNDEROVER':
        type = sre.SemanticAttr.Type.LIMBOTH;
        break;
    }
  } else {
    switch (mmlTag) {
      case 'MSUB':
        type = sre.SemanticAttr.Type.SUBSCRIPT;
        break;
      case 'MSUP':
        type = sre.SemanticAttr.Type.SUPERSCRIPT;
        break;
      case 'MSUBSUP':
        var innerNode = this.makeBranchNode_(sre.SemanticAttr.Type.SUBSCRIPT,
            [center, children[1]], []);
        innerNode.role = sre.SemanticAttr.Role.SUBSUP;
        children = [innerNode, children[2]];
        type = sre.SemanticAttr.Type.SUPERSCRIPT;
        break;
      // TODO (sorge) Refactor the following.
      case 'MOVER':
        type = sre.SemanticAttr.Type.OVERSCORE;
        if (sre.SemanticTree.isAccent_(children[1])) {
          children[1].role = sre.SemanticAttr.Role.OVERACCENT;
        }
        break;
      case 'MUNDER':
        type = sre.SemanticAttr.Type.UNDERSCORE;
        if (sre.SemanticTree.isAccent_(children[1])) {
          children[1].role = sre.SemanticAttr.Role.UNDERACCENT;
        }
        break;
      case 'MUNDEROVER':
      default:
        var underAccent = sre.SemanticTree.isAccent_(children[1]);
        var overAccent = sre.SemanticTree.isAccent_(children[2]);
        if (underAccent) {
          children[1].role = sre.SemanticAttr.Role.UNDERACCENT;
        }
        if (overAccent) {
          children[2].role = sre.SemanticAttr.Role.OVERACCENT;
        }
        if (overAccent && !underAccent) {
          innerNode = this.makeBranchNode_(sre.SemanticAttr.Type.OVERSCORE,
                                           [center, children[2]], []);
          innerNode.role = center.role;
          children = [innerNode, children[1]];
          type = sre.SemanticAttr.Type.UNDERSCORE;
        } else {
          innerNode = this.makeBranchNode_(sre.SemanticAttr.Type.UNDERSCORE,
                                           [center, children[1]], []);
          innerNode.role = sre.SemanticAttr.Role.UNDEROVER;
          children = [innerNode, children[2]];
          type = sre.SemanticAttr.Type.OVERSCORE;
        }
        break;
    }
  }
  var newNode = this.makeBranchNode_(type, children, []);
  var embellished = sre.SemanticTree.isEmbellished_(center);
  if (innerNode) {
    innerNode.embellished = embellished;
  }
  newNode.embellished = embellished;
  newNode.role = center.role;
  return newNode;
};


/**
 * Checks whether a character can be considered as accent.
 * @param {!sre.SemanticTree.Node} node The node to be tested.
 * @return {boolean} True if the node is a punctuation, fence or operator.
 * @private
 */
sre.SemanticTree.isAccent_ = function(node) {
  return sre.SemanticTree.attrPred_('type', 'FENCE')(node) ||
      sre.SemanticTree.attrPred_('type', 'PUNCTUATION')(node) ||
      sre.SemanticTree.attrPred_('type', 'OPERATOR')(node) ||
      sre.SemanticTree.attrPred_('type', 'RELATION')(node) ||
      // TODO (sorge) Simplify this once meaning of all characters is fully
      // defined.
      (sre.SemanticTree.attrPred_('type', 'IDENTIFIER')(node) &&
      sre.SemanticTree.attrPred_('role', 'UNKNOWN')(node) &&
      !node.textContent.match(new RegExp(
         (sre.SemanticAttr.getInstance()).allLetters.join('|'))));
};


/**
 * Recursive method to accumulate function expressions.
 *
 * The idea is to process functions in a row from left to right combining them
 * with their arguments. Thereby we take the notion of a function rather broadly
 * as a functional expressions that consists of a prefix and some arguments.
 * In particular we distinguish four types of functional expressions:
 * - integral: Integral expression.
 * - bigop: A big operator expression like a sum.
 * - prefix: A well defined prefix function such as sin, cos or a limit
 *           functions like lim, max.
 * - simple: An expression consisting of letters that are potentially a function
 *           symbol. If we have an explicit function application symbol
 *           following the expression we turn into a prefix function. Otherwise
 *           we decide heuristically if we could have a function application.
 * @param {!Array.<sre.SemanticTree.Node>} restNodes The remainder list of
 *     nodes.
 * @param {!Array.<sre.SemanticTree.Node>=} opt_result The result node list.
 * @return {!Array.<!sre.SemanticTree.Node>} The fully processed list.
 * @private
 */
sre.SemanticTree.prototype.getFunctionsInRow_ = function(
    restNodes, opt_result) {
  var result = opt_result || [];
  // Base case.
  if (restNodes.length == 0) {
    return result;
  }
  var firstNode = /** @type {!sre.SemanticTree.Node} */ (restNodes.shift());
  var heuristic = sre.SemanticTree.classifyFunction_(firstNode, restNodes);
  // First node is not a function node.
  if (!heuristic) {
    result.push(firstNode);
    return this.getFunctionsInRow_(restNodes, result);
  }
  // Combine functions in the rest of the row.
  var processedRest = this.getFunctionsInRow_(restNodes, []);
  var newRest = this.getFunctionArgs_(firstNode, processedRest, heuristic);
  return result.concat(newRest);
};


/**
 * Classifies a function wrt. the heuristic that should be applied.
 * @param {!sre.SemanticTree.Node} funcNode The node to be classified.
 * @param {!Array.<sre.SemanticTree.Node>} restNodes The remainder list of
 *     nodes. They can be useful to look ahead if there is an explicit function
 *     application. If there is one, it will be destructively removed!
 * @return {!string} The string specifying the heuristic.
 * @private
 */
sre.SemanticTree.classifyFunction_ = function(funcNode, restNodes) {
  //  We do not allow double function application. This is not lambda calculus!
  if (funcNode.type == sre.SemanticAttr.Type.APPL ||
      funcNode.type == sre.SemanticAttr.Type.BIGOP ||
      funcNode.type == sre.SemanticAttr.Type.INTEGRAL) {
    return '';
  }
  // Find and remove explicit function applications.
  // We now treat funcNode as a prefix function, regardless of what its actual
  // content is.
  if (restNodes[0] &&
      restNodes[0].textContent == sre.SemanticAttr.functionApplication()) {
    // Remove explicit function application. This is destructive on the
    // underlying list.
    // TODO (sorge) This should not be distructive!
    restNodes.shift();
    var role = sre.SemanticAttr.Role.SIMPLEFUNC;
    if (funcNode.role === sre.SemanticAttr.Role.PREFIXFUNC ||
        funcNode.role === sre.SemanticAttr.Role.LIMFUNC) {
      role = funcNode.role;
    }
    sre.SemanticTree.propagateFunctionRole_(funcNode, role);
    return 'prefix';
  }
  switch (funcNode.role) {
    case sre.SemanticAttr.Role.INTEGRAL:
      return 'integral';
      break;
    case sre.SemanticAttr.Role.SUM:
      return 'bigop';
      break;
    case sre.SemanticAttr.Role.PREFIXFUNC:
    case sre.SemanticAttr.Role.LIMFUNC:
      return 'prefix';
      break;
    default:
      if (funcNode.type == sre.SemanticAttr.Type.IDENTIFIER ||
          funcNode.role == sre.SemanticAttr.Role.LATINLETTER ||
          funcNode.role == sre.SemanticAttr.Role.GREEKLETTER ||
          funcNode.role == sre.SemanticAttr.Role.OTHERLETTER) {
        return 'simple';
      }
  }
  return '';
};


/**
 * Propagates a function role in a node.
 * @param {sre.SemanticTree.Node} funcNode The node whose role is to be
 *     rewritten.
 * @param {sre.SemanticAttr.Role} tag The function role to be inserted.
 * @private
 */
sre.SemanticTree.propagateFunctionRole_ = function(funcNode, tag) {
  if (funcNode) {
    if (!sre.SemanticTree.attrPred_('role', 'SUBSUP')(funcNode)) {
      funcNode.role = tag;
    }
    sre.SemanticTree.propagateFunctionRole_(funcNode.childNodes[0], tag);
  }
};


/**
 * Computes the arguments for a function from a list of nodes depending on the
 * given heuristic.
 * @param {!sre.SemanticTree.Node} func A function node.
 * @param {!Array.<sre.SemanticTree.Node>} rest List of nodes to choose
 *     arguments from.
 * @param {!string} heuristic The heuristic to follow.
 * @return {!Array.<!sre.SemanticTree.Node>} The function and the remainder of
 *     the rest list.
 * @private
 */
sre.SemanticTree.prototype.getFunctionArgs_ = function(func, rest, heuristic) {
  switch (heuristic) {
    case 'integral':
      var components = this.getIntegralArgs_(rest);
      var integrand = this.processRow_(components.integrand);
      var funcNode = this.makeIntegralNode_(func, integrand, components.intvar);
      components.rest.unshift(funcNode);
      return components.rest;
      break;
    case 'prefix':
      if (rest[0] && rest[0].type == sre.SemanticAttr.Type.FENCED) {
        funcNode = this.makeFunctionNode_(
            func, /** @type {!sre.SemanticTree.Node} */ (rest.shift()));
        rest.unshift(funcNode);
        return rest;
      }
    case 'bigop':
      var partition = sre.SemanticTree.sliceNodes_(
          rest, sre.SemanticTree.prefixFunctionBoundary_);
      if (!partition.head.length) {
        rest.unshift(func);
        return rest;
      }
      var arg = this.processRow_(partition.head);
      if (heuristic == 'prefix') {
        funcNode = this.makeFunctionNode_(func, arg);
      } else {
        funcNode = this.makeBigOpNode_(func, arg);
      }
      if (partition.div) {
        partition.tail.unshift(partition.div);
      }
      partition.tail.unshift(funcNode);
      return partition.tail;
      break;
    case 'simple':
    default:
      if (rest.length == 0) {
        return [func];
      }
      var firstArg = rest[0];
      if (firstArg.type == sre.SemanticAttr.Type.FENCED &&
          firstArg.role != sre.SemanticAttr.Role.NEUTRAL &&
          this.simpleFunctionHeuristic_(firstArg)) {
        sre.SemanticTree.propagateFunctionRole_(
            func, sre.SemanticAttr.Role.SIMPLEFUNC);
        funcNode = this.makeFunctionNode_(
            func, /** @type {!sre.SemanticTree.Node} */ (rest.shift()));
        rest.unshift(funcNode);
        return rest;
      }
      rest.unshift(func);
      return rest;
      break;
  }
};


/**
 * Tail recursive function to obtain integral arguments.
 * @param {!Array.<sre.SemanticTree.Node>} nodes List of nodes to take
 * arguments from.
 * @param {Array.<sre.SemanticTree.Node>=} opt_args List of integral arguments.
 * @return {{integrand: !Array.<sre.SemanticTree.Node>,
 *     intvar: sre.SemanticTree.Node,
 *     rest: !Array.<sre.SemanticTree.Node>}}
 *     Result split into integrand, integral variable and the remaining
 *     elements.
 * @private
 */
sre.SemanticTree.prototype.getIntegralArgs_ = function(nodes, opt_args) {
  var args = opt_args || [];
  if (nodes.length == 0) {
    return {integrand: args, intvar: null, rest: nodes};
  }
  var firstNode = nodes[0];
  if (sre.SemanticTree.generalFunctionBoundary_(firstNode)) {
    return {integrand: args, intvar: null, rest: nodes};
  }
  if (sre.SemanticTree.integralDxBoundarySingle_(firstNode)) {
    return {integrand: args, intvar: firstNode, rest: nodes.slice(1)};
  }
  if (nodes[1] && sre.SemanticTree.integralDxBoundary_(firstNode, nodes[1])) {
    var comma = this.makeContentNode_(sre.SemanticAttr.invisibleComma());
    var intvar = this.makePunctuatedNode_(
        [firstNode, comma, nodes[1]], [comma]);
    intvar.role = sre.SemanticAttr.Role.INTEGRAL;
    return {integrand: args, intvar: intvar, rest: nodes.slice(2)};
  }
  args.push(nodes.shift());
  return this.getIntegralArgs_(nodes, args);
};


/**
 * Create a function node.
 * @param {!sre.SemanticTree.Node} func The function operator.
 * @param {!sre.SemanticTree.Node} arg The argument.
 * @return {!sre.SemanticTree.Node} The new function node.
 * @private
 */
sre.SemanticTree.prototype.makeFunctionNode_ = function(func, arg) {
  var applNode = this.makeContentNode_(sre.SemanticAttr.functionApplication());
  applNode.type = sre.SemanticAttr.Type.PUNCTUATION;
  applNode.role = sre.SemanticAttr.Role.APPLICATION;
  var funcop = sre.SemanticTree.getFunctionOp_(
      func, function(node) {
        return sre.SemanticTree.attrPred_('type', 'FUNCTION')(node) ||
            (sre.SemanticTree.attrPred_('type', 'IDENTIFIER')(node) &&
             sre.SemanticTree.attrPred_('role', 'SIMPLEFUNC')(node));
      }
      );
  return this.makeFunctionalNode_(sre.SemanticAttr.Type.APPL, [func, arg],
                                  funcop, [applNode]);
};


/**
 * Create a big operator node.
 * @param {!sre.SemanticTree.Node} bigOp The big operator.
 * @param {!sre.SemanticTree.Node} arg The argument.
 * @return {!sre.SemanticTree.Node} The new big operator node.
 * @private
 */
sre.SemanticTree.prototype.makeBigOpNode_ = function(bigOp, arg) {
  var largeop = sre.SemanticTree.getFunctionOp_(
      bigOp, sre.SemanticTree.attrPred_('type', 'LARGEOP'));
  return this.makeFunctionalNode_(sre.SemanticAttr.Type.BIGOP,
                                  [bigOp, arg], largeop, []);
};


/**
 * Create an integral node. It has three children: integral, integrand and
 * integration variable. The latter two can be omitted.
 * @param {!sre.SemanticTree.Node} integral The integral operator.
 * @param {sre.SemanticTree.Node} integrand The integrand.
 * @param {sre.SemanticTree.Node} intvar The integral variable.
 * @return {!sre.SemanticTree.Node} The new integral node.
 * @private
 */
sre.SemanticTree.prototype.makeIntegralNode_ = function(
    integral, integrand, intvar) {
  integrand = integrand || this.makeEmptyNode_();
  intvar = intvar || this.makeEmptyNode_();
  var largeop = sre.SemanticTree.getFunctionOp_(
      integral, sre.SemanticTree.attrPred_('type', 'LARGEOP'));
  return this.makeFunctionalNode_(sre.SemanticAttr.Type.INTEGRAL,
                                  [integral, integrand, intvar], largeop, []);
};


/**
 * Creates a functional node, i.e., integral, bigop, simple function. If the
 * operator is given, it takes care that th eoperator is contained as a content
 * node, and that the original parent pointer of the operator node is retained.
 *
 * Example: Function application sin^2(x). The pointer from sin should remain to
 *          the superscript node, although sin is given as a content node.
 * @param {!sre.SemanticAttr.Type} type The type of the node.
 * @param {!Array.<!sre.SemanticTree.Node>} children The children of the
 *     functional node. The first child must be given is understood to be the
 *     functional operator.
 * @param {?sre.SemanticTree.Node} operator The innermost operator (e.g., in the
 *     case of embellished functions or operators with limits).
 * @param {!Array.<sre.SemanticTree.Node>} content The list of additional
 *     content nodes.
 * @return {!sre.SemanticTree.Node} The new functional node.
 * @private
 */
sre.SemanticTree.prototype.makeFunctionalNode_ = function(
    type, children, operator, content) {
  var funcop = children[0];
  if (operator) {
    var oldParent = operator.parent;
    content.push(operator);
  }
  var newNode = this.makeBranchNode_(type, children, content);
  newNode.role = funcop.role;
  if (oldParent) {
    operator.parent = oldParent;
  }
  return newNode;
};


/**
 * Finds the function operator in a partial semantic tree if it exists.
 * @param {!sre.SemanticTree.Node} tree The partial tree.
 * @param {!function(sre.SemanticTree.Node): boolean} pred Predicate for the
 *    function operator.
 * @return {sre.SemanticTree.Node} The function operator.
 * @private
 */
sre.SemanticTree.getFunctionOp_ = function(tree, pred) {
  if (pred(tree)) {
    return tree;
  }
  for (var i = 0, child; child = tree.childNodes[i]; i++) {
    var op = sre.SemanticTree.getFunctionOp_(child, pred);
    if (op) {
      return op;
    }
  }
  return null;
};


/**
 * Predicate implementing the boundary criteria for simple functions:
 *
 * @param {!sre.SemanticTree.Node} node A semantic node of type fenced.
 * @return {boolean} True if the node meets the boundary criteria.
 * @private
 */
sre.SemanticTree.prototype.simpleFunctionHeuristic_ = function(node) {
  var children = node.childNodes;
  if (children.length == 0) {
    return true;
  }
  if (children.length > 1) {
    return false;
  }
  var child = children[0];
  if (child.type == sre.SemanticAttr.Type.INFIXOP) {
    if (child.role != sre.SemanticAttr.Role.IMPLICIT) {
      return false;
    }
    if (child.childNodes.some(sre.SemanticTree.attrPred_('type', 'INFIXOP'))) {
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
 * @param {sre.SemanticTree.Node} node A semantic node.
 * @return {boolean} True if the node meets the boundary criteria.
 * @private
 */
sre.SemanticTree.prefixFunctionBoundary_ = function(node) {
  return sre.SemanticTree.isOperator_(node) ||
      sre.SemanticTree.generalFunctionBoundary_(node);
};


/**
 * Predicate implementing the boundary criteria for integrals dx on two nodes.
 * @param {sre.SemanticTree.Node} firstNode A semantic node.
 * @param {sre.SemanticTree.Node} secondNode The direct neighbour of first
 *     Node.
 * @return {boolean} True if the second node exists and the first node is a 'd'.
 * @private
 */
sre.SemanticTree.integralDxBoundary_ = function(
    firstNode, secondNode) {
  return !!secondNode &&
      sre.SemanticTree.attrPred_('type', 'IDENTIFIER')(secondNode) &&
          sre.SemanticAttr.isCharacterD(firstNode.textContent);
};


/**
 * Predicate implementing the boundary criteria for integrals dx on a single
 * node.
 * @param {sre.SemanticTree.Node} node A semantic node.
 * @return {boolean} True if the node meets the boundary criteria.
 * @private
 */
sre.SemanticTree.integralDxBoundarySingle_ = function(node) {
  if (sre.SemanticTree.attrPred_('type', 'IDENTIFIER')(node)) {
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
 * @param {sre.SemanticTree.Node} node A semantic node.
 * @return {boolean} True if the node meets the boundary criteria.
 * @private
 */
sre.SemanticTree.generalFunctionBoundary_ = function(node) {
  return sre.SemanticTree.isRelation_(node) ||
      sre.SemanticTree.isPunctuation_(node);
};


//TODO: (MOSS) WP 2.1
// Improve table recognition, multiline alignments for pausing.
// Maybe labels, interspersed text etc.
//
/**
 * Rewrites tables into matrices or case statements in a list of nodes.
 * @param {!Array.<!sre.SemanticTree.Node>} nodes List of nodes to rewrite.
 * @return {!Array.<!sre.SemanticTree.Node>} The new list of nodes.
 * @private
 */
sre.SemanticTree.prototype.processTablesInRow_ = function(nodes) {
  // First we process all matrices:
  var partition = sre.SemanticTree.partitionNodes_(
      nodes, sre.SemanticTree.tableIsMatrixOrVector_);
  var result = [];
  for (var i = 0, matrix; matrix = partition.rel[i]; i++) {
    result = result.concat(partition.comp.shift());
    result.push(this.tableToMatrixOrVector_(matrix));
  }
  result = result.concat(partition.comp.shift());
  // Process the remaining tables for cases.
  partition = sre.SemanticTree.partitionNodes_(
      result, sre.SemanticTree.isTableOrMultiline_);
  result = [];
  for (var i = 0, table; table = partition.rel[i]; i++) {
    var prevNodes = partition.comp.shift();
    if (sre.SemanticTree.tableIsCases_(table, prevNodes)) {
      this.tableToCases_(
          table, /** @type {!sre.SemanticTree.Node} */ (prevNodes.pop()));
    }
    result = result.concat(prevNodes);
    result.push(table);
  }
  return result.concat(partition.comp.shift());
};


/**
 * Decides if a node is a table or multiline element.
 * @param {sre.SemanticTree.Node} node A node.
 * @return {boolean} True if node is either table or multiline.
 * @private
 */
sre.SemanticTree.isTableOrMultiline_ = function(node) {
  return !!node && (sre.SemanticTree.attrPred_('type', 'TABLE')(node) ||
      sre.SemanticTree.attrPred_('type', 'MULTILINE')(node));
};


/**
 * Heuristic to decide if we have a matrix: An expression fenced on both sides
 * without any other content is considered a fenced node.
 * @param {sre.SemanticTree.Node} node A node.
 * @return {boolean} True if we believe we have a matrix.
 * @private
 */
sre.SemanticTree.tableIsMatrixOrVector_ = function(node) {
  return !!node && sre.SemanticTree.attrPred_('type', 'FENCED')(node) &&
      (sre.SemanticTree.attrPred_('role', 'LEFTRIGHT')(node) ||
       sre.SemanticTree.attrPred_('role', 'NEUTRAL')(node)) &&
          node.childNodes.length == 1 &&
              sre.SemanticTree.isTableOrMultiline_(node.childNodes[0]);
};


/**
 * Replaces a fenced node by a matrix or vector node and possibly specialises
 * it's role.
 * @param {!sre.SemanticTree.Node} node The fenced node to be rewritten.
 * @return {!sre.SemanticTree.Node} The matrix or vector node.
 * @private
 */
sre.SemanticTree.prototype.tableToMatrixOrVector_ = function(node) {
  var matrix = node.childNodes[0];
  sre.SemanticTree.attrPred_('type', 'MULTILINE')(matrix) ?
      this.tableToVector_(node) : this.tableToMatrix_(node);
  node.contentNodes.forEach(goog.bind(matrix.appendContentNode_, matrix));
  for (var i = 0, row; row = matrix.childNodes[i]; i++) {
    sre.SemanticTree.assignRoleToRow_(
        row, sre.SemanticTree.getComponentRoles_(matrix));
  }
  matrix.parent = null;
  return matrix;
};


/**
 * Assigns a specialised roles to a vector node inside the given fenced node.
 * @param {!sre.SemanticTree.Node} node The fenced node containing the vector.
 * @private
 */
sre.SemanticTree.prototype.tableToVector_ = function(node) {
  var vector = node.childNodes[0];
  vector.type = sre.SemanticAttr.Type.VECTOR;
  if (vector.childNodes.length === 1) {
    this.tableToSquare_(node);
    return;
  }
  if (vector.childNodes.length === 2) {
    vector.role = sre.SemanticAttr.Role.BINOMIAL;
  }
};


/**
 * Assigns a specialised roles to a matrix node inside the given fenced node.
 * @param {!sre.SemanticTree.Node} node The fenced node containing the matrix.
 * @private
 */
sre.SemanticTree.prototype.tableToMatrix_ = function(node) {
  var matrix = node.childNodes[0];
  matrix.type = sre.SemanticAttr.Type.MATRIX;
  if (matrix.childNodes && matrix.childNodes.length > 0 &&
      matrix.childNodes[0].childNodes &&
      matrix.childNodes.length === matrix.childNodes[0].childNodes.length) {
    this.tableToSquare_(node);
    return;
  }
  if (matrix.childNodes && matrix.childNodes.length === 1) {
    matrix.role = sre.SemanticAttr.Role.ROWVECTOR;
  }
};


/**
 * Assigns a role to a square, fenced table.
 * @param {!sre.SemanticTree.Node} node The fenced node containing a square
 *     table.
 * @private
 */
sre.SemanticTree.prototype.tableToSquare_ = function(node) {
  var matrix = node.childNodes[0];
  if (sre.SemanticTree.attrPred_('role', 'NEUTRAL')(node)) {
    matrix.role = sre.SemanticAttr.Role.DETERMINANT;
    return;
  }
  matrix.role = sre.SemanticAttr.Role.SQUAREMATRIX;
};


/**
 * Cmoputes the role for the components of a matrix. It is either the role of
 * that matrix or its type.
 * @param {!sre.SemanticTree.Node} node The matrix or vector node.
 * @return {!sre.SemanticAttr.Role} The role to be assigned to the components.
 * @private
 */
sre.SemanticTree.getComponentRoles_ = function(node) {
  var role = node.role;
  if (role && role !== sre.SemanticAttr.Role.UNKNOWN) {
    return role;
  }
  return sre.SemanticAttr.Role[node.type.toUpperCase()] ||
      sre.SemanticAttr.Role.UNKNOWN;
};


/**
 * Heuristic to decide if we have a case statement: An expression with a
 * singular open fence before it.
 * @param {!sre.SemanticTree.Node} table A table node.
 * @param {!Array.<sre.SemanticTree.Node>} prevNodes A list of previous nodes.
 * @return {boolean} True if we believe we have a case statement.
 * @private
 */
sre.SemanticTree.tableIsCases_ = function(table, prevNodes) {
  return prevNodes.length > 0 &&
      sre.SemanticTree.attrPred_('role', 'OPENFENCE')(
          prevNodes[prevNodes.length - 1]);
};


/**
 * Makes case node out of a table and a fence.
 * @param {!sre.SemanticTree.Node} table The table containing the cases.
 * @param {!sre.SemanticTree.Node} openFence The left delimiter of the case
 *     statement.
 * @return {!sre.SemanticTree.Node} The cases node.
 * @private
 */
sre.SemanticTree.prototype.tableToCases_ = function(table, openFence) {
  for (var i = 0, row; row = table.childNodes[i]; i++) {
    sre.SemanticTree.assignRoleToRow_(row, sre.SemanticAttr.Role.CASES);
  }
  table.type = sre.SemanticAttr.Type.CASES;
  table.appendContentNode_(openFence);
  return table;
};


// TODO (sorge) This heuristic is very primitive. We could start reworking
// multilines, by combining all cells, semantically rewriting the entire line
// and see if there are any similarities. Alternatively, we could look for
// similarities in columns (e.g., single relation symbols, like equalities or
// inequalities in the same column could indicate an equation array).
/**
 * Heuristic to decide if we have a multiline formula. A table is considered a
 * multiline formula if it does not have any separate cells.
 * @param {!sre.SemanticTree.Node} table A table node.
 * @return {boolean} True if we believe we have a mulitline formula.
 * @private
 */
sre.SemanticTree.tableIsMultiline_ = function(table) {
  return table.childNodes.every(
      function(row) {
        var length = row.childNodes.length;
        return length <= 1;});
};


/**
 * Rewrites a table to multiline structure, simplifying it by getting rid of the
 * cell hierarchy level.
 * @param {!sre.SemanticTree.Node} table The node to be rewritten a multiline.
 * @private
 */
sre.SemanticTree.prototype.tableToMultiline_ = function(table) {
  table.type = sre.SemanticAttr.Type.MULTILINE;
  for (var i = 0, row; row = table.childNodes[i]; i++) {
    sre.SemanticTree.rowToLine_(row, sre.SemanticAttr.Role.MULTILINE);
  }
};


/**
 * Converts a row that only contains one cell into a single line.
 * @param {!sre.SemanticTree.Node} row The row to convert.
 * @param {sre.SemanticAttr.Role=} opt_role The new role for the line.
 * @private
 */
sre.SemanticTree.rowToLine_ = function(row, opt_role) {
  var role = opt_role || sre.SemanticAttr.Role.UNKNOWN;
  if (sre.SemanticTree.attrPred_('type', 'ROW')(row) &&
      row.childNodes.length == 1 &&
          sre.SemanticTree.attrPred_('type', 'CELL')(row.childNodes[0])) {
    row.type = sre.SemanticAttr.Type.LINE;
    row.role = role;
    row.childNodes = row.childNodes[0].childNodes;
  }
};


/**
 * Assign a row and its contained cells a new role value.
 * @param {!sre.SemanticTree.Node} row The row to be updated.
 * @param {!sre.SemanticAttr.Role} role The new role for the row and its cells.
 * @private
 */
sre.SemanticTree.assignRoleToRow_ = function(row, role) {
  if (sre.SemanticTree.attrPred_('type', 'LINE')(row)) {
    row.role = role;
    return;
  }
  if (sre.SemanticTree.attrPred_('type', 'ROW')(row)) {
    row.role = role;
    var cellPred = sre.SemanticTree.attrPred_('type', 'CELL');
    row.childNodes.forEach(function(cell) {
      if (cellPred(cell)) {
        cell.role = role;
      }
    });
  }
};


/**
 * Splits a list of nodes wrt. to a given predicate.
 * @param {Array.<sre.SemanticTree.Node>} nodes A list of nodes.
 * @param {!function(sre.SemanticTree.Node): boolean} pred Predicate for the
 *    partitioning relation.
 * @param {boolean=} opt_reverse If true slicing is done from the end.
 * @return {{head: !Array.<sre.SemanticTree.Node>,
 *           div: sre.SemanticTree.Node,
 *           tail: !Array.<sre.SemanticTree.Node>}} The split list.
 * @private
 */
sre.SemanticTree.sliceNodes_ = function(nodes, pred, opt_reverse) {
  if (opt_reverse) {
    nodes.reverse();
  }
  var head = [];
  for (var i = 0, node; node = nodes[i]; i++) {
    if (pred(node)) {
      if (opt_reverse) {
        return {head: nodes.slice(i + 1).reverse(),
          div: node,
          tail: head.reverse()};
      }
      return {head: head,
        div: node,
        tail: nodes.slice(i + 1)};
    }
    head.push(node);
  }
  if (opt_reverse) {
    return {head: [], div: null, tail: head.reverse()};
  }
  return {head: head, div: null, tail: []};
};


/**
 * Partitions a list of nodes wrt. to a given predicate. Effectively works like
 * a PER on the ordered set of nodes.
 * @param {!Array.<!sre.SemanticTree.Node>} nodes A list of nodes.
 * @param {!function(sre.SemanticTree.Node): boolean} pred Predicate for the
 *    partitioning relation.
 * @return {{rel: !Array.<sre.SemanticTree.Node>,
 *           comp: !Array.<!Array.<sre.SemanticTree.Node>>}}
 *    The partitioning given in terms of a collection of elements satisfying
 *    the predicate and a collection of complementary sets lying inbetween the
 *    related elements. Observe that we always have |comp| = |rel| + 1.
 *
 * Example: On input [a, r_1, b, c, r_2, d, e, r_3] where P(r_i) holds, we
 *    get as output: {rel: [r_1, r_2, r_3], comp: [[a], [b, c], [d, e], []].
 * @private
 */
sre.SemanticTree.partitionNodes_ = function(nodes, pred) {
  var restNodes = nodes;
  var rel = [];
  var comp = [];

  do {
    var result = sre.SemanticTree.sliceNodes_(restNodes, pred);
    comp.push(result.head);
    rel.push(result.div);
    restNodes = result.tail;
  } while (result.div);
  rel.pop();
  return {rel: rel, comp: comp};
};


/**
 * Constructs a predicate to check the semantic attribute of a node.
 * @param {!string} prop The property of a node.
 * @param {!string} attr The attribute.
 * @return {function(sre.SemanticTree.Node): boolean} The predicate.
 * @private
 */

sre.SemanticTree.attrPred_ = function(prop, attr) {
  var getAttr = function(prop) {
    switch (prop) {
      case 'role': return sre.SemanticAttr.Role[attr];
      case 'font': return sre.SemanticAttr.Font[attr];
      case 'embellished':
      case 'type':
      default: return sre.SemanticAttr.Type[attr];
    }
  };

  return function(node) {return node[prop] == getAttr(prop);};
};


/**
 * Process an mfenced node.
 * @param {!Element} mfenced The Mfenced node.
 * @param {!Array.<sre.SemanticTree.Node>} children List of already translated
 *     children.
 * @return {!sre.SemanticTree.Node} The semantic node.
 * @private
 */
sre.SemanticTree.prototype.processMfenced_ = function(mfenced, children) {
  var sepValue = sre.SemanticTree.getAttribute_(mfenced, 'separators', ',');
  var open = sre.SemanticTree.getAttribute_(mfenced, 'open', '(');
  var close = sre.SemanticTree.getAttribute_(mfenced, 'close', ')');
  if (sepValue && children.length > 0) {
    var separators = sre.MathUtil.nextSeparatorFunction(sepValue);
    var newChildren = [children.shift()];
    children.forEach(goog.bind(function(child) {
      newChildren.push(this.makeContentNode_(separators()));
      newChildren.push(child);
    }, this));
    children = newChildren;
  }
  // If both open and close are given, we assume those elements to be fences,
  // regardless of their initial semantic interpretation. However, if only one
  // of the fences is given we do not explicitly interfere with the semantic
  // interpretation. In other worde the mfence is ignored and the content is
  // interpreted as usual. The only effect of the mfence node here is that the
  // content will be interpreted into a single node.
  if (open && close) {
    return this.makeHorizontalFencedNode_(this.makeContentNode_(open),
                                          this.makeContentNode_(close),
                                          children);
  }
  if (open) {
    children.unshift(this.makeContentNode_(open));
  }
  if (close) {
    children.push(this.makeContentNode_(close));
  }
  return this.processRow_(children);
};


/**
 * Get an attribute from a node and provide a default if it does not exist.  It
 * returns null if attribute is empty string or whitespace only.
 * @param {!Element} node The node from which to retrieve the attribute.
 * @param {string} attr The attribute.
 * @param {string} def The default return value.
 * @return {?string} The value of the attribute or null.
 * @private
 */
sre.SemanticTree.getAttribute_ = function(node, attr, def) {
  if (!node.hasAttribute(attr)) {
    return def;
  }
  var value = node.getAttribute(attr);
  if (value.match(/^\s*$/)) {
    return null;
  }
  return value;
};


// TODO (sorge) Clean those predicates up!
/**
 * Compute the role of a number if it does not have one already.
 * @param {!sre.SemanticTree.Node} node The semantic tree node.
 * @private
 */
sre.SemanticTree.numberRole_ = function(node) {
  if (node.role !== sre.SemanticAttr.Role.UNKNOWN) {
    return;
  }
  var content = sre.SemanticUtil.splitUnicode(node.textContent);
  var meaning = content.map(sre.SemanticAttr.lookupMeaning);
  if (meaning.every(function(x) {
    return (x.type == sre.SemanticAttr.Type.NUMBER &&
            x.role == sre.SemanticAttr.Role.INTEGER) ||
        (x.type == sre.SemanticAttr.Type.PUNCTUATION &&
        x.role == sre.SemanticAttr.Role.COMMA);})) {
    node.role = sre.SemanticAttr.Role.INTEGER;
    return; }
  if (meaning.every(function(x) {
    return (x.type == sre.SemanticAttr.Type.NUMBER &&
            x.role == sre.SemanticAttr.Role.INTEGER) ||
        x.type == sre.SemanticAttr.Type.PUNCTUATION;})) {
    node.role = sre.SemanticAttr.Role.FLOAT;
    return; }
  node.role = sre.SemanticAttr.Role.OTHERNUMBER;
};


/**
 * Updates the font of a node if a single font can be determined.
 * @param {!sre.SemanticTree.Node} node The semantic tree node.
 * @private
 */
sre.SemanticTree.exprFont_ = function(node) {
  if (node.font !== sre.SemanticAttr.Font.UNKNOWN) {
    return;
  }
  var content = sre.SemanticUtil.splitUnicode(node.textContent);
  var meaning = content.map(sre.SemanticAttr.lookupMeaning);
  var singleFont = meaning.reduce(
      function(prev, curr) {
        if (!prev || !curr.font || curr.font == sre.SemanticAttr.Font.UNKNOWN ||
            curr.font == prev) {
          return prev;
        }
        if (prev == sre.SemanticAttr.Font.UNKNOWN) {
          return curr.font;
        }
        return null;
      },
      sre.SemanticAttr.Font.UNKNOWN);
  if (singleFont) {
    node.font = singleFont;
  }
};


/**
 * Creates a fraction node with the appropriate role.
 * @param {!sre.SemanticTree.Node} denom The denominator node.
 * @param {!sre.SemanticTree.Node} enume The enumerator node.
 * @return {!sre.SemanticTree.Node} The new fraction node.
 * @private
 */
sre.SemanticTree.prototype.makeFractionNode_ = function(denom, enume) {
  var newNode = this.makeBranchNode_(
      sre.SemanticAttr.Type.FRACTION, [denom, enume], []);
  newNode.role = newNode.childNodes.every(function(x) {
    return sre.SemanticTree.attrPred_('role', 'INTEGER')(x);
  }) ? sre.SemanticAttr.Role.VULGAR :
      newNode.childNodes.every(function(x) {
        return sre.SemanticTree.attrPred_('role', 'UNIT')(x);
      }) ? sre.SemanticAttr.Role.UNIT : sre.SemanticAttr.Role.DIVISION;
  return newNode;
};


/**
 * Processes a mmultiscript node into a tensor representation.
 * @param {!Array.<Element>} children The nodes children.
 * @return {!sre.SemanticTree.Node} The semantic tensor node.
 * @private
 */
sre.SemanticTree.prototype.processMultiScript_ = function(children) {
  // Empty node. Illegal MathML markup, but valid in MathJax.
  if (!children.length) {
    return this.makeEmptyNode_();
  }
  var base = this.parseMathml_(/** @type {!Element} */(children.shift()));
  if (!children.length) {
    return base;
  }
  var lsup = [];
  var lsub = [];
  var rsup = [];
  var rsub = [];
  var prescripts = false;
  var scriptcount = 0;
  for (var i = 0, child; child = children[i]; i++) {
    if (sre.SemanticUtil.tagName(child) === 'MPRESCRIPTS') {
      prescripts = true;
      scriptcount = 0;
      continue;
    }
    prescripts ?
        (scriptcount & 1 ? lsup.push(child) : lsub.push(child)) :
        (scriptcount & 1 ? rsup.push(child) : rsub.push(child));
    scriptcount++;
  }
  // This is the pathological msubsup case.
  //
  // We retain NONE nodes if necessary, i.e., in a non-empty sub- or
  // superscript.
  if (!sre.SemanticUtil.purgeNodes(lsup).length &&
      !sre.SemanticUtil.purgeNodes(lsub).length) {
    var rsupPurged = sre.SemanticUtil.purgeNodes(rsup);
    var rsubPurged = sre.SemanticUtil.purgeNodes(rsub);
    if (!rsupPurged.length && !rsubPurged.length) {
      return base;
    }
    var mmlTag = rsubPurged.length ?
        (rsupPurged.length ? 'MSUBSUP' : 'MSUB') : 'MSUP';
    var mmlchild = [base];
    if (rsubPurged.length) {
      mmlchild.push(this.makeScriptNode_(
          rsub, sre.SemanticAttr.Role.RIGHTSUB, true));
    }
    if (rsupPurged.length) {
      mmlchild.push(this.makeScriptNode_(
          rsup, sre.SemanticAttr.Role.RIGHTSUPER, true));
    }
    return this.makeLimitNode_(mmlTag, mmlchild);
  }
  // We really deal with a multiscript tensor.
  //
  var newNode = this.makeBranchNode_(
      sre.SemanticAttr.Type.TENSOR,
      [
       base,
       this.makeScriptNode_(lsub, sre.SemanticAttr.Role.LEFTSUB),
       this.makeScriptNode_(lsup, sre.SemanticAttr.Role.LEFTSUPER),
       this.makeScriptNode_(rsub, sre.SemanticAttr.Role.RIGHTSUB),
       this.makeScriptNode_(rsup, sre.SemanticAttr.Role.RIGHTSUPER)
      ],
      []);
  newNode.role = base.role;
  newNode.embellished = sre.SemanticTree.isEmbellished_(base);
  return newNode;
};


/**
 * Creates a script node for a tensor, which is effectively a dummy punctuation.
 * @param {!Array.<Element>} nodes A list of unprocessed nodes for
 *      that script.
 * @param {sre.SemanticAttr.Role} role The role of the dummy node.
 * @param {boolean=} opt_noSingle Flag indicating whether role should be set
 *      for a single node.
 * @return {!sre.SemanticTree.Node} The semantic tensor node.
 * @private
 */
sre.SemanticTree.prototype.makeScriptNode_ = function(
    nodes, role, opt_noSingle) {
  switch (nodes.length) {
    case 0:
      var newNode = this.makeEmptyNode_();
      break;
    case 1:
      newNode = this.parseMathml_(/** @type {!Element} */(nodes[0]));
      if (opt_noSingle) {
        return newNode;
      }
      break;
    default:
      newNode = this.makeDummyNode_(this.parseMathmlChildren_(nodes));
  }
  newNode.role = role;
  return newNode;
};


/**
 * Determines if a node is embellished and returns its type in case it is.
 * @param {sre.SemanticTree.Node} node A node to test.
 * @return {?sre.SemanticAttr.Type} The type of the node that is embellished.
 * @private
 */
sre.SemanticTree.isEmbellished_ = function(node) {
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
 * @param {sre.SemanticTree.Node} node A node to test.
 * @return {boolean} True if the node is considered as operator.
 * @private
 */
sre.SemanticTree.isOperator_ = function(node) {
  return sre.SemanticTree.attrPred_('type', 'OPERATOR')(node) ||
      sre.SemanticTree.attrPred_('embellished', 'OPERATOR')(node);
};


/**
 * Determines if a node is an relation, regular or embellished.
 * @param {sre.SemanticTree.Node} node A node to test.
 * @return {boolean} True if the node is considered as relation.
 * @private
 */
sre.SemanticTree.isRelation_ = function(node) {
  return sre.SemanticTree.attrPred_('type', 'RELATION')(node) ||
      sre.SemanticTree.attrPred_('embellished', 'RELATION')(node);
};


/**
 * Determines if a node is an punctuation, regular or embellished.
 * @param {sre.SemanticTree.Node} node A node to test.
 * @return {boolean} True if the node is considered as punctuation.
 * @private
 */
sre.SemanticTree.isPunctuation_ = function(node) {
  return sre.SemanticTree.attrPred_('type', 'PUNCTUATION')(node) ||
      sre.SemanticTree.attrPred_('embellished', 'PUNCTUATION')(node);
};


/**
 * Determines if a node is an fence, regular or embellished.
 * @param {sre.SemanticTree.Node} node A node to test.
 * @return {boolean} True if the node is considered as fence.
 * @private
 */
sre.SemanticTree.isFence_ = function(node) {
  return sre.SemanticTree.attrPred_('type', 'FENCE')(node) ||
      sre.SemanticTree.attrPred_('embellished', 'FENCE')(node);
};


/**
 * Finds the innermost element of an embellished operator node.
 * @param {sre.SemanticTree.Node} node The embellished node.
 * @return {sre.SemanticTree.Node} The innermost node.
 * @private
 */
sre.SemanticTree.getEmbellishedInner_ = function(node) {
  if (node && node.embellished && node.childNodes.length > 0) {
    return sre.SemanticTree.getEmbellishedInner_(node.childNodes[0]);
  }
  return node;
};


/**
 * Rewrites a fences partition to remove non-eligible embellished fences.
 * It rewrites all other fences into punctuations.
 * For eligibility see sre.SemanticTree.isElligibleFence_
 * @param {{rel: !Array.<sre.SemanticTree.Node>,
 *          comp: !Array.<!Array.<sre.SemanticTree.Node>>}} partition
 *        A partition for fences.
 * @return {{rel: !Array.<sre.SemanticTree.Node>,
 *           comp: !Array.<!Array.<sre.SemanticTree.Node>>}}
 *    The cleansed partition.
 * @private
 */
sre.SemanticTree.purgeFences_ = function(partition) {
  var rel = partition.rel;
  var comp = partition.comp;
  var newRel = [];
  var newComp = [];

  while (rel.length > 0) {
    var currentRel = rel.shift();
    var currentComp = comp.shift();
    if (sre.SemanticTree.isElligibleFence_(currentRel)) {
      newRel.push(currentRel);
      newComp.push(currentComp);
      continue;
    }
    sre.SemanticTree.fenceToPunct_(currentRel);
    currentComp.push(currentRel);
    currentComp = currentComp.concat(comp.shift());
    comp.unshift(currentComp);
  }
  newComp.push(comp.shift());
  return {rel: newRel, comp: newComp};
};


/**
 * Determines if a fence is eligible.
 *
 * Currently fences are not eligible if they are opening fences with right
 * indices, closing fences with left indices or fences with both left and right
 * indices.
 * @param {sre.SemanticTree.Node} node A node to test.
 * @return {boolean} True if the node is considered as fence.
 * @private
 */
sre.SemanticTree.isElligibleFence_ = function(node) {
  if (!node || !sre.SemanticTree.isFence_(node)) {
    return false;
  }
  if (!node.embellished) {
    return true;
  }
  var bothSide = function(node) {
    return sre.SemanticTree.attrPred_('type', 'TENSOR')(node) &&
        (!sre.SemanticTree.attrPred_('type', 'EMPTY')(node.childNodes[1]) ||
         !sre.SemanticTree.attrPred_('type', 'EMPTY')(node.childNodes[2])) &&
        (!sre.SemanticTree.attrPred_('type', 'EMPTY')(node.childNodes[3]) ||
         !sre.SemanticTree.attrPred_('type', 'EMPTY')(node.childNodes[4]));
  };
  var recurseBaseNode = function(node) {
    if (!node.embellished) {
      return true;
    }
    if (bothSide(node)) {
      return false;
    }
    if (sre.SemanticTree.attrPred_('role', 'CLOSE')(node) &&
        sre.SemanticTree.attrPred_('type', 'TENSOR')(node)) {
      return false;
    }
    if (sre.SemanticTree.attrPred_('role', 'OPEN')(node) &&
        (sre.SemanticTree.attrPred_('type', 'SUBSCRIPT')(node) ||
         sre.SemanticTree.attrPred_('type', 'SUPERSCRIPT')(node))) {
      return false;
    }
    return recurseBaseNode(node.childNodes[0]);
  };
  return recurseBaseNode(node);
};


/**
 * Rewrites a fenced node by pulling some embellishments from fences to the
 * outside.
 * @param {!sre.SemanticTree.Node} fenced The fenced node.
 * @return {!sre.SemanticTree.Node} The rewritten node.
 * @private
 */
sre.SemanticTree.rewriteFencedNode_ = function(fenced) {
  var ofence = /** @type {!sre.SemanticTree.Node} */ (fenced.contentNodes[0]);
  var cfence = /** @type {!sre.SemanticTree.Node} */ (fenced.contentNodes[1]);
  var rewritten = sre.SemanticTree.rewriteFence_(fenced, ofence);
  fenced.contentNodes[0] = rewritten.fence;
  rewritten = sre.SemanticTree.rewriteFence_(rewritten.node, cfence);
  fenced.contentNodes[1] = rewritten.fence;
  fenced.contentNodes[0].parent = fenced;
  fenced.contentNodes[1].parent = fenced;
  rewritten.node.parent = null;
  return rewritten.node;
};


/**
 * Rewrites a fence by removing embellishments and putting them around the
 * node. The only embellishments that are not pulled out are overscore and
           * underscore.
 * @param {!sre.SemanticTree.Node} node The original fenced node.
 * @param {!sre.SemanticTree.Node} fence The fence node.
 * @return {{node: !sre.SemanticTree.Node,
 *           fence: !sre.SemanticTree.Node}} The rewritten node and fence.
 * @private
 */
// TODO (sorge) Maybe remove the superfluous MathML element.
sre.SemanticTree.rewriteFence_ = function(node, fence) {
  if (!fence.embellished) {
    return {node: node, fence: fence};
  }
  var newFence = /** @type {!sre.SemanticTree.Node} */(fence.childNodes[0]);
  var rewritten = sre.SemanticTree.rewriteFence_(node, newFence);
  if (sre.SemanticTree.attrPred_('type', 'SUPERSCRIPT')(fence) ||
      sre.SemanticTree.attrPred_('type', 'SUBSCRIPT')(fence) ||
      sre.SemanticTree.attrPred_('type', 'TENSOR')(fence)) {
    // Fence is embellished and needs to be rewritten.
    if (!sre.SemanticTree.attrPred_('role', 'SUBSUP')(fence)) {
      fence.role = node.role;
    }
    if (newFence !== rewritten.node) {
      fence.replaceChild_(newFence, rewritten.node);
      newFence.parent = node;
    }
    sre.SemanticTree.propagateFencePointer_(fence, newFence);
    return {node: fence, fence: rewritten.fence};
  }
  fence.replaceChild_(newFence, rewritten.fence);
  if (fence.mathmlTree && fence.mathml.indexOf(fence.mathmlTree) === -1) {
    fence.mathml.push(fence.mathmlTree);
  }
  return {node: rewritten.node, fence: fence};
};


/**
 * Propagates the fence pointer, that is, the embellishing node links to the
 * actual fence it embellishes. If the link is valid on the new node, the old
 * node will point to that link as well. Note, that this fence might still be
 * embellished itself, e.g. with under or overscore.
 * @param {!sre.SemanticTree.Node} oldNode The old embellished node.
 * @param {!sre.SemanticTree.Node} newNode The new embellished node.
 * @private
 */
sre.SemanticTree.propagateFencePointer_ = function(oldNode, newNode) {
  oldNode.fencePointer = newNode.fencePointer || newNode.id.toString();
  oldNode.embellished = null;
};


/**
 * Convenience method to display the whole tree and its elements.
 */
sre.SemanticTree.prototype.displayTree = function() {
  this.root.displayTree(0);
};


/**
 * Convenience method to display the whole tree and its elements.
 * @param {!number} depth The depth of the tree.
 */
sre.SemanticTree.Node.prototype.displayTree = function(depth) {
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
 * @return {!string} The MathML tree as string or EMPTY.
 * @private
 */
sre.SemanticTree.Node.prototype.mathmlTreeString_ = function() {
  return this.mathmlTree ? this.mathmlTree.toString() : 'EMPTY';
};


// '<math><mo>(</mo><mi>x</mi><msup><munder><msub><mover><mo>)</mo><mn>4</mn></mover><mn>2</mn></msub><mn>3</mn></munder><mn>1</mn></msup></math>'
// '<math><mo>(</mo><mi>x</mi><msup><munder><msub><mo>)</mo><mn>2</mn></msub><mn>3</mn></munder><mn>1</mn></msup></math>'
//  '<math><mo>(</mo><mi>x</mi><msub><munder><msup><mo>)</mo><mn>2</mn></msup><mn>3</mn></munder><mn>1</mn></msub></math>'
//  '<math><mo>(</mo><mi>x</mi><msup><mo>)</mo><mn>2</mn></msup></math>'
//  '<math><mo>(</mo><mi>x</mi><msub><msup><mo>)</mo><mn>2</mn></msup><mn>1</mn></msub></math>'

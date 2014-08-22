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

goog.require('goog.array');
goog.require('sre.DomUtil');
goog.require('sre.SemanticAttr');
goog.require('sre.SemanticUtil');



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

  /** @type {sre.SemanticTree.Node} */
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

  /** @type {!Array.<sre.SemanticTree.Node>} */
  this.childNodes = [];

  /** @type {string} */
  this.textContent = '';

  /**
   * Branch nodes can store additional nodes that can be useful.
   * E.g. a node of type FENCED can have the opening and closing fences here.
   * @type {!Array.<sre.SemanticTree.Node>}
   */
  this.contentNodes = [];
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
  * @return {Node} The XML representation of the tree.
  */
sre.SemanticTree.prototype.xml = function(opt_brief) {
  var dp = new sre.SystemExternal.xmldom.DOMParser();  // just for now VS
  var xml = dp.parseFromString('<stree></stree>', 'text/xml');
  return this.root.xml(xml, opt_brief);
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
  return sre.SemanticTree.formatXml(xml);
};


/**
 * Pretty prints an XML representation.
 * @param {string} xml The serialised XML string.
 * @return {string} The formatted string.
 */
sre.SemanticTree.formatXml = function(xml) {
  var reg = /(>)(<)(\/*)/g;
  xml = xml.replace(reg, '$1\r\n$2$3');
  reg = /(>)(.+)(<c)/g;
  xml = xml.replace(reg, '$1\r\n$2\r\n$3');
  var formatted = '';
  var padding = '';
  xml.split('\r\n')
      .forEach(function(node) {
        if (node.match(/.+<\/\w[^>]*>$/)) {
          // Node with content.
          formatted += padding + node + '\r\n';
        } else if (node.match(/^<\/\w/)) {
          if (padding) {
            // Closing tag
            padding = padding.slice(2);
            formatted += padding + node + '\r\n';
          }
        } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
          // Opening tag
          formatted += padding + node + '\r\n';
          padding += '  ';
        } else {
          // Empty tag
          formatted += padding + node + '\r\n';
        }
      });
  return formatted;
};


/**
 * Serializes the XML representation of a node.
 * @param {boolean=} opt_brief If attributes are to be omitted.
 * @return {string} Serialized string.
 */
sre.SemanticTree.Node.prototype.toString = function(opt_brief) {
  var xmls = new sre.SystemExternal.xmldom.XMLSerializer();
  var dp = new sre.SystemExternal.xmldom.DOMParser();
  // That does not seem to work in NodeJS. Need to look into.
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
 * @private
 */
sre.SemanticTree.prototype.replaceNode_ = function(oldNode, newNode) {
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
 * @param {Array.<Node>} mmlNodes List of MathML nodes.
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
 * @param {Array.<Node>} mmlNodes List of MathML nodes.
 * @private
 */
sre.SemanticTree.Node.prototype.removeMathmlNodes_ = function(mmlNodes) {
  var mmlList = this.mathml;
  for (var i = 0, mml; mml = mmlNodes[i]; i++) {
    var index = mmlList.indexOf(mml);
    if (index != -1) {
      goog.array.removeAt(mmlList, index);
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
  newNode.parent = this;
  oldNode.parent = null;
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
 * @private
 */
sre.SemanticTree.Node.prototype.removeContentNode_ = function(node) {
  if (node) {
    var index = this.contentNodes.indexOf(node);
    if (index != -1) {
      goog.array.removeAt(this.contentNodes, index);
    }
  }
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
  switch (sre.SemanticUtil.tagName(mml)) {
    case 'MATH':
    case 'MROW':
    case 'MPADDED':
    case 'MSTYLE':
      children = sre.SemanticUtil.purgeNodes(children);
      // Single child node, i.e. the row is meaningless.
      if (children.length == 1) {
        return this.parseMathml_(/** @type {!Element} */(children[0]));
      }
      // Case of a 'meaningful' row, even if they are empty.
      return this.processRow_(this.parseMathmlChildren_(children));
      break;
    case 'MFRAC':
      var newNode = this.makeBranchNode_(
          sre.SemanticAttr.Type.FRACTION,
          [this.parseMathml_(children[0]), this.parseMathml_(children[1])],
          []);
      newNode.role = sre.SemanticAttr.Role.DIVISION;
      return newNode;
      break;
    case 'MSUB':
    case 'MSUP':
    case 'MSUBSUP':
    case 'MOVER':
    case 'MUNDER':
    case 'MUNDEROVER':
      return this.makeLimitNode_(sre.SemanticUtil.tagName(mml),
                                 this.parseMathmlChildren_(children));
      break;
    case 'MROOT':
      return this.makeBranchNode_(
          sre.SemanticAttr.Type.ROOT,
          [this.parseMathml_(children[0]), this.parseMathml_(children[1])],
          []);
      break;
    case 'MSQRT':
      children = this.parseMathmlChildren_(
          sre.SemanticUtil.purgeNodes(children));
      return this.makeBranchNode_(
          sre.SemanticAttr.Type.SQRT, [this.processRow_(children)], []);
      break;
    case 'MTABLE':
      newNode = this.makeBranchNode_(
          sre.SemanticAttr.Type.TABLE,
          this.parseMathmlChildren_(children), []);
      if (sre.SemanticTree.tableIsMultiline_(newNode)) {
        this.tableToMultiline_(newNode);
      }
      return newNode;
      break;
    case 'MTR':
      newNode = this.makeBranchNode_(
          sre.SemanticAttr.Type.ROW,
          this.parseMathmlChildren_(children), []);
      newNode.role = sre.SemanticAttr.Role.TABLE;
      return newNode;
      break;
    case 'MTD':
      children = this.parseMathmlChildren_(
          sre.SemanticUtil.purgeNodes(children));
      newNode = this.makeBranchNode_(
          sre.SemanticAttr.Type.CELL, [this.processRow_(children)], []);
      newNode.role = sre.SemanticAttr.Role.TABLE;
      return newNode;
      break;
    case 'MTEXT':
      var leaf = this.makeLeafNode_(mml);
      leaf.type = sre.SemanticAttr.Type.TEXT;
      return leaf;
      break;
    // TODO (sorge) Role and font of multi-character and digits unicode strings.
    // TODO (sorge) Reclassify wrongly tagged numbers or identifiers.
    // TODO (sorge) Put this all in a single clean reclassification method.
    case 'MI':
      leaf = this.makeLeafNode_(mml);
      if (leaf.type == sre.SemanticAttr.Type.UNKNOWN) {
        leaf.type = sre.SemanticAttr.Type.IDENTIFIER;
      }
      return leaf;
      break;
    case 'MN':
      leaf = this.makeLeafNode_(mml);
      if (leaf.type == sre.SemanticAttr.Type.UNKNOWN) {
        leaf.type = sre.SemanticAttr.Type.NUMBER;
      }
      return leaf;
      break;
    case 'MO':
      leaf = this.makeLeafNode_(mml);
      if (leaf.type == sre.SemanticAttr.Type.UNKNOWN) {
        leaf.type = sre.SemanticAttr.Type.OPERATOR;
      }
      return leaf;
      break;
    // TODO (sorge) Do something useful with error and phantom symbols.
    default:
      // Ordinarilly at this point we should not get any other tag.
      return this.makeUnprocessed_(mml);
  }
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
 * Create a leaf node.
 * @param {Node} mml The MathML tree.
 * @return {!sre.SemanticTree.Node} The new node.
 * @private
 */
sre.SemanticTree.prototype.makeLeafNode_ = function(mml) {
  var node = this.createNode_();
  node.mathml = [mml];
  node.updateContent_(mml.textContent);
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
  children.concat(contentNodes)
      .forEach(
          function(x) {
            x.parent = node;
            node.addMathmlNodes_(x.mathml);
          });
  return node;
};


/**
 * Create a branching node for an implicit operation, currently assumed to
 * be of multiplicative type.
 * @param {!Array.<!sre.SemanticTree.Node>} nodes The operands.
 * @return {!sre.SemanticTree.Node} The new branch node.
 * @private
 */
sre.SemanticTree.prototype.makeImplicitNode_ = function(nodes) {
  if (nodes.length == 1) {
    return nodes[0];
  }
  var operator = this.createNode_();
  // For now we assume this is a multiplication using invisible times.
  operator.updateContent_(sre.SemanticAttr.invisibleTimes());
  var newNode = this.makeInfixNode_(nodes, operator);
  newNode.role = sre.SemanticAttr.Role.IMPLICIT;
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
  return this.makeBranchNode_(
      sre.SemanticAttr.Type.INFIXOP, children, [opNode], opNode.textContent);
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
  var content = nodeList.map(function(x) {return x.textContent;}).join(' ');
  var newNode = this.makeBranchNode_(type, [inner], nodeList, content);
  if (nodeList.length > 0) {
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
  return this.makeConcatNode_(
      node, postfixes, sre.SemanticAttr.Type.POSTFIXOP);
};


// TODO (sorge) Separate out interspersed text before the relations in row
// heuristic otherwise we get them as implicit operations!
// Currently we handle that later in the rules, which is rather messy.
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
  if (nodes.length == 0) {
    return this.makeEmptyNode_();
  }
  nodes = this.getFencesInRow_(nodes);
  nodes = this.processTablesInRow_(nodes);
  nodes = this.getPunctuationInRow_(nodes);
  nodes = this.getFunctionsInRow_(nodes);
  return this.processRelationsInRow_(nodes);
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
      nodes, sre.SemanticTree.attrPred_('type', 'RELATION'));
  var firstRel = partition.rel[0];

  if (!firstRel) {
    return this.processOperationsInRow_(nodes);
  }
  if (nodes.length == 1) {
    return nodes[0];
  }
  var children = partition.comp.map(
      goog.bind(this.processOperationsInRow_, this));
  if (partition.rel.every(
      function(x) {return x.textContent == firstRel.textContent;})) {
    return this.makeBranchNode_(
        sre.SemanticAttr.Type.RELSEQ, children, partition.rel,
        firstRel.textContent);
  }
  return this.makeBranchNode_(
      sre.SemanticAttr.Type.MULTIREL, children, partition.rel);
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
      nodes[0].type == sre.SemanticAttr.Type.OPERATOR) {
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
      nodes, sre.SemanticTree.attrPred_('type', 'OPERATOR'));
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
      nodes, sre.SemanticTree.attrPred_('type', 'OPERATOR'));

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
  if (!root || root.type != sre.SemanticAttr.Type.INFIXOP) {
    return false;
  }
  if (root.textContent == op.textContent) {
    root.appendContentNode_(op);
    root.appendChild_(node);
    return true;
  }
  this.appendExistingOperator_(
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
      nodes, sre.SemanticTree.attrPred_('type', 'FENCE'));
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
                  fences[0].textContent != lastOpen.textContent))) {
    openStack.push(fences.shift());
    contentStack.push(content.shift());
    return this.processFences_(fences, content, openStack, contentStack);
  }
  // General closing case.
  if (lastOpen && (
      // Closing fence for some opening fence.
      (firstRole == sre.SemanticAttr.Role.CLOSE &&
          lastOpen.role == sre.SemanticAttr.Role.OPEN) ||
      // Netural fence with exact counter part.
      (firstRole == sre.SemanticAttr.Role.NEUTRAL &&
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
      fences, function(x) {return x.textContent == firstFence.textContent;});
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
    content.unshift(fenced);
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
  fence.type = sre.SemanticAttr.Type.PUNCTUATION;
  switch (fence.role) {
    case sre.SemanticAttr.Role.NEUTRAL:
      fence.role = sre.SemanticAttr.Role.VBAR;
      break;
    case sre.SemanticAttr.Role.OPEN:
      fence.role = sre.SemanticAttr.Role.OPENFENCE;
      break;
    case sre.SemanticAttr.Role.CLOSE:
      fence.role = sre.SemanticAttr.Role.CLOSEFENCE;
      break;
  }
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
  return newNode;
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
        return sre.SemanticTree.attrPred_('type', 'PUNCTUATION')(x) &&
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

  if (punctuations.length == 1 &&
      nodes[0].type == sre.SemanticAttr.Type.PUNCTUATION) {
    newNode.role = sre.SemanticAttr.Role.STARTPUNCT;
  } else if (punctuations.length == 1 &&
      nodes[nodes.length - 1].type == sre.SemanticAttr.Type.PUNCTUATION) {
    newNode.role = sre.SemanticAttr.Role.ENDPUNCT;
  } else {
    newNode.role = sre.SemanticAttr.Role.SEQUENCE;
  }
  return newNode;
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
        innerNode.role = center.role;
        children = [innerNode, children[2]];
        type = sre.SemanticAttr.Type.SUPERSCRIPT;
        break;
      case 'MOVER':
        type = sre.SemanticAttr.Type.OVERSCORE;
        break;
      case 'MUNDER':
        type = sre.SemanticAttr.Type.UNDERSCORE;
        break;
      case 'MUNDEROVER':
      default:
        var innerNode = this.makeBranchNode_(sre.SemanticAttr.Type.UNDERSCORE,
            [center, children[1]], []);
        innerNode.role = center.role;
        children = [innerNode, children[2]];
        type = sre.SemanticAttr.Type.OVERSCORE;
        break;
    }
  }
  var newNode = this.makeBranchNode_(type, children, []);
  newNode.role = center.role;
  return newNode;
};


/**
 * Recursive method to accumulate function expressions.
 *
 * The idea is to process functions in a row from left to right combining them
 * with there arguments. Thereby we take the notion of a function rather broadly
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
 *     nodes. They can useful to look ahead if there is an explicit function
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
    restNodes.shift();
    sre.SemanticTree.propagatePrefixFunc_(funcNode);
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
      if (funcNode.type == sre.SemanticAttr.Type.IDENTIFIER) {
        return 'simple';
      }
  }
  return '';
};


/**
 * Propagates a prefix function role in a node.
 * @param {sre.SemanticTree.Node} funcNode The node whose role is to be
 * rewritten.
 * @private
 */
sre.SemanticTree.propagatePrefixFunc_ = function(funcNode) {
  if (funcNode) {
    funcNode.role = sre.SemanticAttr.Role.PREFIXFUNC;
    sre.SemanticTree.propagatePrefixFunc_(funcNode.childNodes[0]);
  }
};


/**
 * Computes the arguments for a function from a list of nodes depending on the
 * given heuristic.
 * @param {!sre.SemanticTree.Node} func A function node.
 * @param {!Array.<sre.SemanticTree.Node>} rest List of nodes to choose
 *     arguments from.
 * @param {string} heuristic The heuristic to follow.
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
      if (rest.length == 0) {
        return [func];
      }
      var firstArg = rest[0];
      if (firstArg.type == sre.SemanticAttr.Type.FENCED &&
          firstArg.role != sre.SemanticAttr.Role.NEUTRAL &&
          this.simpleFunctionHeuristic_(firstArg)) {
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
    var comma = this.createNode_();
    comma.updateContent_(sre.SemanticAttr.invisibleComma());
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
  var applNode = this.createNode_();
  applNode.updateContent_(sre.SemanticAttr.functionApplication());
  applNode.type = sre.SemanticAttr.Type.PUNCTUATION;
  applNode.role = sre.SemanticAttr.Role.APPLICATION;
  var newNode = this.makeBranchNode_(sre.SemanticAttr.Type.APPL, [func, arg],
      [applNode]);
  newNode.role = func.role;
  return newNode;
};


/**
 * Create a big operator node.
 * @param {!sre.SemanticTree.Node} bigOp The big operator.
 * @param {!sre.SemanticTree.Node} arg The argument.
 * @return {!sre.SemanticTree.Node} The new big operator node.
 * @private
 */
sre.SemanticTree.prototype.makeBigOpNode_ = function(bigOp, arg) {
  var newNode = this.makeBranchNode_(
      sre.SemanticAttr.Type.BIGOP, [bigOp, arg], []);
  newNode.role = bigOp.role;
  return newNode;
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
  var newNode = this.makeBranchNode_(sre.SemanticAttr.Type.INTEGRAL,
      [integral, integrand, intvar], []);
  newNode.role = integral.role;
  return newNode;
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
  return sre.SemanticTree.attrPred_('type', 'OPERATOR')(node) ||
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
  return sre.SemanticTree.attrPred_('type', 'RELATION')(node) ||
      sre.SemanticTree.attrPred_('type', 'PUNCTUATION')(node);
};


/**
 * Rewrites tables into matrices or case statements in a list of nodes.
 * @param {!Array.<sre.SemanticTree.Node>} nodes List of nodes to rewrite.
 * @return {!Array.<sre.SemanticTree.Node>} The new list of nodes.
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
      sre.SemanticTree.attrPred_('role', 'LEFTRIGHT')(node) &&
          node.childNodes.length == 1 &&
              sre.SemanticTree.isTableOrMultiline_(node.childNodes[0]);
};


/**
 * Replaces a fenced node by a matrix or vector node.
 * @param {!sre.SemanticTree.Node} node The fenced node to be rewritten.
 * @return {!sre.SemanticTree.Node} The matrix or vector node.
 * @private
 */
sre.SemanticTree.prototype.tableToMatrixOrVector_ = function(node) {
  var matrix = node.childNodes[0];
  var type = sre.SemanticTree.attrPred_('type', 'MULTILINE')(matrix) ?
      'VECTOR' : 'MATRIX';
  matrix.type = sre.SemanticAttr.Type[type];
  node.contentNodes.forEach(goog.bind(matrix.appendContentNode_, matrix));
  for (var i = 0, row; row = matrix.childNodes[i]; i++) {
    sre.SemanticTree.assignRoleToRow_(row, sre.SemanticAttr.Role[type]);
  }
  return matrix;
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
    // }
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
      case 'type': return sre.SemanticAttr.Type[attr];
      case 'role': return sre.SemanticAttr.Role[attr];
      case 'font': return sre.SemanticAttr.Font[attr];
    }
  };

  return function(node) {return node[prop] == getAttr(prop);};
};


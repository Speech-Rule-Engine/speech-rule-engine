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
goog.require('sre.SemanticAttr');
goog.require('sre.SemanticNode');
goog.require('sre.SemanticNodeFactory');
goog.require('sre.SemanticPred');
goog.require('sre.SemanticProcessor');
goog.require('sre.SemanticUtil');
goog.require('sre.SystemExternal');



/**
 * Create an initial semantic tree.
 * @param {!Element} mml The original MathML node.
 * @constructor
 */
sre.SemanticTree = function(mml) {

  /** ID counter.
   * @type {sre.SemanticNodeFactory}
   * @private
   */
  this.factory_ = new sre.SemanticNodeFactory();
  sre.SemanticTree.factory_ = this.factory_;
  sre.SemanticProcessor.getInstance().setNodeFactory(this.factory_);

  /** Original MathML tree.
   * @type {Node}
   */
  this.mathml = mml;

  /** @type {!sre.SemanticNode} */
  this.root = sre.SemanticTree.parseMathml_(mml);

};


/**
 * @type {?sre.SemanticNodeFactory}
 * @private
 */
sre.SemanticTree.factory_ = null;


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
  this.root.displayTree(0);
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
 * This is the main function that creates the semantic tree by recursively
 * parsing the initial MathML tree and bottom up assembling the tree.
 * @param {!Element} mml The MathML tree.
 * @return {!sre.SemanticNode} The root of the new tree.
 * @private
 */
sre.SemanticTree.parseMathml_ = function(mml) {
  var children = sre.DomUtil.toArray(mml.childNodes);
  var newNode;
  switch (sre.DomUtil.tagName(mml)) {
    case 'SEMANTICS':
      if (children.length > 0) {
        newNode = sre.SemanticTree.parseMathml_(
            /** @type {!Element} */(children[0]));
        break;
      }
    case 'MATH':
    case 'MROW':
    case 'MPADDED':
    case 'MSTYLE':
      children = sre.SemanticUtil.purgeNodes(children);
      // Single child node, i.e. the row is meaningless.
      if (children.length === 1) {
        newNode = sre.SemanticTree.parseMathml_(
            /** @type {!Element} */(children[0]));
      } else {
        // Case of a 'meaningful' row, even if they are empty.
        newNode = sre.SemanticProcessor.getInstance().row(
            sre.SemanticTree.parseMathmlChildren_(children));
      }
      newNode.mathml.unshift(mml);
      return newNode;
    case 'MFRAC':
      newNode = sre.SemanticProcessor.getInstance().fractionLikeNode(
          mml.getAttribute('linethickness'),
          sre.SemanticTree.parseMathml_(children[0]),
          sre.SemanticTree.parseMathml_(children[1]));
      break;
    case 'MSUB':
    case 'MSUP':
    case 'MSUBSUP':
    case 'MOVER':
    case 'MUNDER':
    case 'MUNDEROVER':
      newNode = sre.SemanticProcessor.getInstance().limitNode(
          sre.DomUtil.tagName(mml),
          sre.SemanticTree.parseMathmlChildren_(children));
      break;
    case 'MROOT':
      newNode = sre.SemanticTree.factory_.makeBranchNode(
          sre.SemanticAttr.Type.ROOT,
          [sre.SemanticTree.parseMathml_(children[1]),
           sre.SemanticTree.parseMathml_(children[0])],
          []);
      break;
    case 'MSQRT':
      children = sre.SemanticTree.parseMathmlChildren_(
          sre.SemanticUtil.purgeNodes(children));
      newNode = sre.SemanticTree.factory_.makeBranchNode(
          sre.SemanticAttr.Type.SQRT,
          [sre.SemanticProcessor.getInstance().row(children)], []);
      break;
    case 'MTABLE':
      newNode = sre.SemanticTree.factory_.makeBranchNode(
          sre.SemanticAttr.Type.TABLE,
          sre.SemanticTree.parseMathmlChildren_(children), []);
      if (sre.SemanticPred.tableIsMultiline(newNode)) {
        sre.SemanticProcessor.tableToMultiline(newNode);
      }
      break;
    case 'MTR':
      newNode = sre.SemanticTree.factory_.makeBranchNode(
          sre.SemanticAttr.Type.ROW,
          sre.SemanticTree.parseMathmlChildren_(children), []);
      newNode.role = sre.SemanticAttr.Role.TABLE;
      break;
    case 'MTD':
      children = sre.SemanticTree.parseMathmlChildren_(
          sre.SemanticUtil.purgeNodes(children));
      newNode = sre.SemanticTree.factory_.makeBranchNode(
          sre.SemanticAttr.Type.CELL,
          [sre.SemanticProcessor.getInstance().row(children)], []);
      newNode.role = sre.SemanticAttr.Role.TABLE;
      break;
    case 'MS':
    case 'MTEXT':
    case 'ANNOTATION-XML':
    newNode = sre.SemanticProcessor.getInstance().text(
      mml.textContent,
      /** @type {sre.SemanticAttr.Font} */(mml.getAttribute('mathvariant')),
      sre.DomUtil.tagName(mml));
      break;
    // TODO (sorge) Role and font of multi-character and digits unicode strings.
    // TODO (sorge) Reclassify wrongly tagged numbers or identifiers more
    //              systematically.
    // TODO (sorge) Put this all in a single clean reclassification method.
    case 'MI':
      newNode = sre.SemanticTree.parseIdentifierNode_(mml);
      break;
    case 'MN':
      newNode = sre.SemanticTree.parseLeafNode_(mml);
      sre.SemanticProcessor.number(newNode);
      break;
    case 'MO':
      newNode = sre.SemanticTree.parseLeafNode_(mml);
      if (newNode.type === sre.SemanticAttr.Type.UNKNOWN) {
        newNode.type = sre.SemanticAttr.Type.OPERATOR;
      }
      break;
    case 'MFENCED':
      newNode = sre.SemanticTree.parseMfenced_(
          mml, sre.SemanticTree.parseMathmlChildren_(
          sre.SemanticUtil.purgeNodes(children)));
      var nodes = sre.SemanticProcessor.getInstance().tablesInRow([newNode]);
      newNode = nodes[0];
      break;
    case 'MENCLOSE':
      children = sre.SemanticTree.parseMathmlChildren_(
          sre.SemanticUtil.purgeNodes(children));
      newNode = sre.SemanticTree.factory_.makeBranchNode(
          sre.SemanticAttr.Type.ENCLOSE,
          [sre.SemanticProcessor.getInstance().row(children)], []);
      newNode.role =
          /** @type {!sre.SemanticAttr.Role} */(mml.getAttribute('notation')) ||
          sre.SemanticAttr.Role.UNKNOWN;
      break;
    case 'MMULTISCRIPTS':
      newNode = sre.SemanticTree.parseMultiScript_(children);
      break;
    case 'ANNOTATION':
    case 'NONE':
      newNode = sre.SemanticTree.factory_.makeEmptyNode();
      break;
    case 'MACTION':
      // This here is currently geared towards our collapse actions!
      if (children.length > 1) {
        newNode = sre.SemanticTree.parseMathml_(children[1]);
      } else {
        newNode = sre.SemanticTree.factory_.makeUnprocessed(mml);
      }
      break;
    // TODO (sorge) Do something useful with error and phantom symbols.
    default:
      // Ordinarilly at this point we should not get any other tag.
      newNode = sre.SemanticTree.factory_.makeUnprocessed(mml);
      break;
  }
  newNode.mathml.unshift(mml);
  newNode.mathmlTree = mml;
  return newNode;
};


/**
 * Parse a list of MathML nodes into a list of semantic nodes.
 * @param {Array.<Element>} mmls A list of MathML nodes.
 * @return {!Array.<sre.SemanticNode>} The list of resulting semantic
 *     node.
 * @private
 */
sre.SemanticTree.parseMathmlChildren_ = function(mmls) {
  var result = [];
  for (var i = 0, mml; mml = mmls[i]; i++) {
    result.push(sre.SemanticTree.parseMathml_(mml));
  }
  return result;
};


/**
 * Creates a leaf node fro MathML node.
 * @param {Node} mml The MathML tree.
 * @return {!sre.SemanticNode} The new node.
 * @private
 */
sre.SemanticTree.parseLeafNode_ = function(mml) {
  return sre.SemanticTree.factory_.makeLeafNode(mml.textContent,
                                        mml.getAttribute('mathvariant'));
};


/**
 * Create an identifier node, with particular emphasis on font disambiguation.
 * @param {Node} mml The MathML MI node.
 * @return {!sre.SemanticNode} The new semantic identifier node.
 * @private
 */
sre.SemanticTree.parseIdentifierNode_ = function(mml) {
  return sre.SemanticProcessor.getInstance().identifierNode(
      mml.textContent,
      mml.getAttribute('mathvariant'),
      mml.getAttribute('class'));
};


/**
 * Process an mfenced node.
 * @param {!Element} mfenced The Mfenced node.
 * @param {!Array.<sre.SemanticNode>} children List of already translated
 *     children.
 * @return {!sre.SemanticNode} The semantic node.
 * @private
 */
sre.SemanticTree.parseMfenced_ = function(mfenced, children) {
  var sepValue = sre.SemanticTree.getAttribute_(mfenced, 'separators', ',');
  var open = sre.SemanticTree.getAttribute_(mfenced, 'open', '(');
  var close = sre.SemanticTree.getAttribute_(mfenced, 'close', ')');
  return sre.SemanticProcessor.getInstance().mfenced(
      open, close, sepValue, children);
};


/**
 * Processes a mmultiscript node into a tensor representation.
 * @param {!Array.<Element>} children The nodes children.
 * @return {!sre.SemanticNode} The semantic tensor node.
 * @private
 */
sre.SemanticTree.parseMultiScript_ = function(children) {
  // Empty node. Illegal MathML markup, but valid in MathJax.
  if (!children.length) {
    return sre.SemanticTree.factory_.makeEmptyNode();
  }
  var base = sre.SemanticTree.parseMathml_(
      /** @type {!Element} */(children.shift()));
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
    if (sre.DomUtil.tagName(child) === 'MPRESCRIPTS') {
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
    return sre.SemanticProcessor.getInstance().pseudoTensor(
        base,
        sre.SemanticTree.parseMathmlChildren_(rsub),
        sre.SemanticTree.parseMathmlChildren_(rsup));
  }
  // We really deal with a multiscript tensor.
  //
  return sre.SemanticProcessor.getInstance().tensor(
      base,
      sre.SemanticTree.parseMathmlChildren_(lsub),
      sre.SemanticTree.parseMathmlChildren_(lsup),
      sre.SemanticTree.parseMathmlChildren_(rsub),
      sre.SemanticTree.parseMathmlChildren_(rsup));
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


// '<math><mo>(</mo><mi>x</mi><msup><munder><msub><mover><mo>)</mo><mn>4</mn></mover><mn>2</mn></msub><mn>3</mn></munder><mn>1</mn></msup></math>'
// '<math><mo>(</mo><mi>x</mi><msup><munder><msub><mo>)</mo><mn>2</mn></msub><mn>3</mn></munder><mn>1</mn></msup></math>'
//  '<math><mo>(</mo><mi>x</mi><msub><munder><msup><mo>)</mo><mn>2</mn></msup><mn>3</mn></munder><mn>1</mn></msub></math>'
//  '<math><mo>(</mo><mi>x</mi><msup><mo>)</mo><mn>2</mn></msup></math>'
//  '<math><mo>(</mo><mi>x</mi><msub><msup><mo>)</mo><mn>2</mn></msup><mn>1</mn></msub></math>'

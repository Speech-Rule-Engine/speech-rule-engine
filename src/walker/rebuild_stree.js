// Copyright (c) 2016 Volker Sorge
// Copyright (c) 2016 The MathJax Consortium
//
// Licensed under the Apache on 2.0 (the "License");
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
 * @fileoverview Procedure to reassemble the semantic tree from an enriched
 *    MathML expression.
 *
 * @author v.sorge@mathjax.org (Volker Sorge)
 */

goog.provide('sre.RebuildStree');

goog.require('sre.Semantic');



// Note that reassemble tree will not give you exactly the original tree, as the
// mathml nodes and mathml tree components can not be reconstructed.
//TODO: This is probably not a class but just a utility procedure.
/**
 * @constructor
 * @param {!Element} mathml The enriched MathML node.
 */
sre.RebuildStree = function(mathml) {

  /**
   * @type {!Object.<string, !sre.SemanticTree.Node>}
   */
  this.nodeDict = {};
  
  this.mathml = mathml;

  this.mmlRoot = sre.WalkerUtil.getSemanticRoot(mathml);

  this.streeRoot = this.assembleTree(this.mmlRoot);

  this.stree = sre.SemanticTree.fromNode(this.streeRoot, this.mathml);

  this.xml = this.stree.xml();

};


/**
 * @return {sre.SemanticTree} The rebuilt semantic tree.
 */
sre.RebuildStree.prototype.getTree = function() {
  return this.stree;
};


/**
 * Assembles the semantic tree from the data attributes of the MathML node.
 * @param {!Node} node The MathML node.
 * @return {!sre.SemanticTree.Node} The corresponding semantic tree node.
 */
sre.RebuildStree.prototype.assembleTree = function(node) {
  var snode = this.makeNode(node);
  var children = sre.WalkerUtil.splitAttribute(
      sre.WalkerUtil.getAttribute(node, sre.EnrichMathml.Attribute.CHILDREN));
  var content = sre.WalkerUtil.splitAttribute(
      sre.WalkerUtil.getAttribute(node, sre.EnrichMathml.Attribute.CONTENT));
  if (content.length === 0 && children.length === 0) {
    snode.textContent = node.textContent;
    return snode;
  }
  if (content.length > 0) {
    var fcontent = sre.WalkerUtil.getBySemanticId(node, content[0]);
    if (fcontent) {
      var operator = sre.WalkerUtil.splitAttribute(
          sre.WalkerUtil.getAttribute(
              fcontent, sre.EnrichMathml.Attribute.OPERATOR));
      if (operator.length > 1) {
        snode.textContent = operator[1];
      }
    }
  }
  var setParent = function(n) {
    var mml = sre.WalkerUtil.getBySemanticId(node, n);
    var sn = this.assembleTree(mml);
    sn.parent = snode;
    return sn;
  };
  snode.contentNodes = content.map(goog.bind(setParent, this));
  snode.childNodes = children.map(goog.bind(setParent, this));
  var collapsed = sre.WalkerUtil.getAttribute(
      node, sre.EnrichMathml.Attribute.COLLAPSED);
  if (collapsed) {
    return this.postProcess(snode, collapsed);
  }
  return snode;
};


/**
 * Creates a new semantic node from the data in the MathML node.
 * @param {!Node} node The enriched MathML node.
 * @return {!sre.SemanticTree.Node} The reconstructed semantic tree node.
 */
sre.RebuildStree.prototype.makeNode = function(node) {
  var type = sre.WalkerUtil.getAttribute(node, sre.EnrichMathml.Attribute.TYPE);
  var role = sre.WalkerUtil.getAttribute(node, sre.EnrichMathml.Attribute.ROLE);
  var font = sre.WalkerUtil.getAttribute(node, sre.EnrichMathml.Attribute.FONT);
  var id = sre.WalkerUtil.getAttribute(node, sre.EnrichMathml.Attribute.ID);
  var embellished = sre.WalkerUtil.getAttribute(
      node, sre.EnrichMathml.Attribute.EMBELLISHED);
  var fencepointer = sre.WalkerUtil.getAttribute(
      node, sre.EnrichMathml.Attribute.FENCEPOINTER);
  var snode = this.createNode(parseInt(id, 10));
  snode.type = /** @type {sre.SemanticAttr.Type} */(type);
  snode.role = /** @type {sre.SemanticAttr.Role} */(role);
  snode.font = font ? /** @type {sre.SemanticAttr.Font} */(font) :
      sre.SemanticAttr.Font.UNKNOWN;
  if (fencepointer) {
    snode.fencePointer = fencepointer;
  }
  if (embellished) {
    snode.embellished = /** @type {sre.SemanticAttr.Type} */(embellished);
  }
  return snode;
};


/**
 * Rearranges semantic node if there is a collapse structure.
 * @param {!sre.SemanticTree.Node} snode The semantic node.
 * @param {!string} collapsed The collapse structure.
 * @return {!sre.SemanticTree.Node} The semantic node.
 */
sre.RebuildStree.prototype.postProcess = function(snode, collapsed) {
  var array = sre.RebuildStree.parseCollapsed_(collapsed);
  if (snode.type === sre.SemanticAttr.Role.SUBSUP) {
    var subscript = this.createNode(array[1][0]);
    subscript.type = sre.SemanticAttr.Type.SUBSCRIPT;
    subscript.role = sre.SemanticAttr.Role.SUBSUP;
    snode.type = sre.SemanticAttr.Type.SUPERSCRIPT;
    subscript.embellished = snode.embellished;
    subscript.fencePointer = snode.fencePointer;
    sre.RebuildStree.collapsedChildren_(snode, [subscript], array);
    return snode;
  }
  if (snode.type === sre.SemanticAttr.Role.UNDEROVER) {
    var underscore = this.createNode(array[1][0]);
    underscore.type = sre.SemanticAttr.Type.UNDERSCORE;
    underscore.role = sre.SemanticAttr.Role.UNDEROVER;
    snode.type = sre.SemanticAttr.Type.OVERSCORE;
    underscore.embellished = snode.embellished;
    underscore.fencePointer = snode.fencePointer;
    sre.RebuildStree.collapsedChildren_(snode, [underscore], array);
    return snode;
  }

  return snode;
};


/**
 * Creates a new semantic tree node and stores it.
 * @param {number} id The id for that node.
 * @return {sre.SemanticTree.Node} The newly created node.
 */
sre.RebuildStree.prototype.createNode = function(id) {
  var node = new sre.SemanticTree.Node(id);
  this.nodeDict[id.toString()] = node;
  return node;
};

    
/**
 * Re-generates collapsed semantic nodes given a node and its already existing
 * children.
 * @param {!sre.SemanticTree.Node} oldNode The node containing the
 *     collapsed element.
 * @param {!Array.<sre.SemanticTree.Node>} newNodes The already existing child
 *     nodes.
 * @param {!Array} collapsed Array of integer arrays.
 * @private
 */
sre.RebuildStree.collapsedChildren_ = function(oldNode, newNodes, collapsed) {
  newNodes.unshift(oldNode);
  newNodes = newNodes.concat(oldNode.childNodes);
  var nodeDict = {};
  for (var i = 0, node; node = newNodes[i]; i++) {
    nodeDict[node.id] = node;
  }
  var recurseCollapsed = function(coll) {
    var parent = nodeDict[coll[0]];
    parent.childNodes = [];
    for (var j = 1, l = coll.length; j < l; j++) {
      if (typeof coll[j] === 'number') {
        parent.childNodes.push(nodeDict[coll[j]]);
      } else {
        parent.childNodes.push(recurseCollapsed(coll[j]));
      }
    }
    return parent;
  };
  recurseCollapsed(collapsed);
};


/**
 * Parses the collapsed structure into an array of integer arrays.
 * @param {!string} collapsed String containing the collapsed structure.
 * @return {!Array} The array of integer arrays.
 * @private
 */
sre.RebuildStree.parseCollapsed_ = function(collapsed) {
  var str = collapsed.replace(/\(/g, '[');
  str = str.replace(/\)/g, ']');
  str = str.replace(/ /g, ',');
  return /** @type {!Array} */(JSON.parse(str));
};


/**
 * Internal method to experiment with semantic tree rebuilding.
 * @param {string} expr The MathML expression.
 * @return {boolean} True if the rebuilt semantic is the same as the one
 *     originally constructed for the MathML expression.
 */
sre.RebuildStree.experiment__ = function(expr) {
  var mml = sre.DomUtil.parseInput('<math>' + expr + '</math>');
  var stree = new sre.SemanticTree(mml);
  var str1 = stree.toString();
  var emml = sre.EnrichMathml.enrich(mml, stree);
  var reass = new sre.RebuildStree(emml);
  var str2 = reass.toString();
  return str1 === str2;
};

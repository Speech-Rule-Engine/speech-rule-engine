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
 * @param {!Node} mathml The enriched MathML node.
 * @return {sre.SemanticTree} The rebuilt semantic tree.
 */
sre.RebuildStree = function(mathml) {

  this.mathml = mathml;

  this.mmlRoot = sre.WalkerUtil.getSemanticRoot(mathml);

  this.streeRoot = this.assembleTree(this.mmlRoot);
  
  this.stree = this.makeTree();
  
  var dp = new sre.SystemExternal.xmldom.DOMParser();
  var xml = dp.parseFromString('<stree></stree>', 'text/xml');
  return this.stree;
};
//goog.addSingletonGetter(sre.RebuildStree);


sre.RebuildStree.prototype.makeTree = function() {
  var empty = sre.DomUtil.parseInput('<math/>');
  var dummy = new sre.SemanticTree(empty);
  dummy.root = this.streeRoot;
  dummy.mathml = this.mathml;
  return dummy;
};


sre.RebuildStree.prototype.assembleTree = function(node) {
  // if (this.frontier.length === 0) return;
  // var current = this.frontier.shift();
  var snode = sre.RebuildStree.makeNode(node);
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
    return sre.RebuildStree.postProcess(snode, collapsed);
  }
  return snode;
};


sre.RebuildStree.makeNode = function(node) {
  var type = sre.WalkerUtil.getAttribute(node, sre.EnrichMathml.Attribute.TYPE);
  var role = sre.WalkerUtil.getAttribute(node, sre.EnrichMathml.Attribute.ROLE);
  var font = sre.WalkerUtil.getAttribute(node, sre.EnrichMathml.Attribute.FONT);
  var id = sre.WalkerUtil.getAttribute(node, sre.EnrichMathml.Attribute.ID);
  var embellished = sre.WalkerUtil.getAttribute(
      node, sre.EnrichMathml.Attribute.EMBELLISHED);
  var fencepointer = sre.WalkerUtil.getAttribute(
      node, sre.EnrichMathml.Attribute.FENCEPOINTER);
  var snode = new sre.SemanticTree.Node(parseInt(id, 10));
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
sre.RebuildStree.postProcess = function(snode, collapsed) {
  var array = sre.RebuildStree.parseCollapsed_(collapsed);
  if (snode.type === sre.SemanticAttr.Role.SUBSUP) {
    var subscript = new sre.SemanticTree.Node(array[1][0]);
    subscript.type = sre.SemanticAttr.Type.SUBSCRIPT;
    subscript.role = sre.SemanticAttr.Role.SUBSUP;
    snode.type = sre.SemanticAttr.Type.SUPERSCRIPT;
    sre.RebuildStree.collapsedChildren_(snode, [subscript], array);
    return snode;
  }
  // if (snode.type === sre.SemanticAttr.Role.OVERSCORE) {
  //   var underscore = new sre.SemanticTree.Node(array[1][0]);
  //   underscore.type = sre.SemanticAttr.Type.OVERSCORE;
  //   subscript.role = sre.SemanticAttr.Role.SUBSUP;
  //   snode.type = sre.SemanticAttr.Type.SUPERSCRIPT;
  //   sre.RebuildStree.collapsedChildren_(snode, [subscript], array);
  //   return snode;
  // }
  return snode;
};


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
 */
sre.RebuildStree.parseCollapsed_ = function(collapsed) {
  var str = collapsed.replace(/\(/g, '[');
  str = str.replace(/\)/g, ']');
  str = str.replace(/ /g, ',');
  return /** @type {!Array} */(JSON.parse(str));
};


sre.RebuildStree.experiment__ = function(expr) {
  var mml = sre.DomUtil.parseInput('<math>' + expr + '</math>');
  console.log(mml.toString());
  var stree = new sre.SemanticTree(mml);
  var emml = sre.EnrichMathml.enrich(mml, stree);
  console.log(emml.toString());
  var reass = new sre.RebuildStree(emml);

  var str1 = stree.toString();
  var str2 = reass.toString();
  console.log(str1);
  console.log(str2);
  return str1 === str2;
};

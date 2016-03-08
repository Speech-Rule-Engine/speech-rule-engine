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

goog.provide('sre.ReassembleStree');

goog.require('sre.Semantic');



// Note that reassemble tree will not give you exactly the original tree, as the
// mathml nodes and mathml tree components can not be reconstructed.
/**
 * @constructor
 * @param {!Node} mathml The enriched MathML node.
 * @return {sre.SemanticTree} The rebuilt semantic tree.
 */
sre.ReassembleStree = function(mathml) {

  this.mathml = mathml;

  this.mmlRoot = sre.WalkerUtil.getSemanticRoot(mathml);

  this.streeRoot = this.assembleTree(this.mmlRoot);
  
  this.stree = this.makeTree();
  
  var dp = new sre.SystemExternal.xmldom.DOMParser();
  var xml = dp.parseFromString('<stree></stree>', 'text/xml');
  //xml.childNodes[0].appendChild();
  return this.stree;
};
//goog.addSingletonGetter(sre.ReassembleStree);


sre.ReassembleStree.prototype.makeTree = function() {
  var empty = sre.DomUtil.parseInput('<math/>');
  var dummy = new sre.SemanticTree(empty);
  dummy.root = this.streeRoot;
  dummy.mathml = this.mathml;
  return dummy;
};


sre.ReassembleStree.prototype.assembleTree = function(node) {
  console.log(node.toString());
  // if (this.frontier.length === 0) return;
  // var current = this.frontier.shift();
  var snode = sre.ReassembleStree.makeNode(node);
  var children = sre.WalkerUtil.splitAttribute(
    sre.WalkerUtil.getAttribute(node, sre.EnrichMathml.Attribute.CHILDREN));
  var content = sre.WalkerUtil.splitAttribute(
    sre.WalkerUtil.getAttribute(node, sre.EnrichMathml.Attribute.CONTENT));
  snode.content = content.map(goog.bind(this.assembleTree, this));
  snode.children = children.map(goog.bind(this.assembleTree, this));
  return snode;
};


sre.ReassembleStree.makeNode = function(node) {
  console.log(sre.EnrichMathml.Attribute.TYPE);
  var type = sre.WalkerUtil.getAttribute(node, sre.EnrichMathml.Attribute.TYPE);
  var role = sre.WalkerUtil.getAttribute(node, sre.EnrichMathml.Attribute.ROLE);
  var font = sre.WalkerUtil.getAttribute(node, sre.EnrichMathml.Attribute.FONT);
  var id = sre.WalkerUtil.getAttribute(node, sre.EnrichMathml.Attribute.ID);
  var snode = new sre.SemanticTree.Node(parseInt(id, 10));
  snode.type = /** @type {sre.SemanticAttr.Type} */(type);
  snode.role = /** @type {sre.SemanticAttr.Role} */(role);
  snode.font = /** @type {sre.SemanticAttr.Font} */(font);
  return snode;
};

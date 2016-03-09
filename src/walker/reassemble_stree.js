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
//TODO: This is probably not a class but just a utility procedure.
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
  // if (this.frontier.length === 0) return;
  // var current = this.frontier.shift();
  var snode = sre.ReassembleStree.makeNode(node);
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
  return snode;
};


sre.ReassembleStree.makeNode = function(node) {
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


sre.ReassembleStree.experiment__ = function(expr) {
  var mml = sre.DomUtil.parseInput('<math>' + expr + '</math>');
  var stree = new sre.SemanticTree(mml);
  var emml = sre.EnrichMathml.enrich(mml, stree);
  var reass = new sre.ReassembleStree(emml);

  var str1 = stree.toString();
  var str2 = reass.toString();
  console.log(str1);
  console.log(str2);
  return str1 === str2;
};

// Copyright 2015 Volker Sorge
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
 * @fileoverview Inject semantic information into MathML
 *
 * Take a MathML element, compute the semantic tree and reinject the semantic
 * information into the MathML.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.SemanticMathml');


// All this code is experimental and will eventually need refactoring!

goog.require('sre.SemanticTree');



/**
 * Create the namespace
 * @constructor
 */
sre.SemanticMathml = function() {
};


/**
 * Creates formated output  for tMathML and semantic tree expression.
 * REMARK: Helper function.
 * @param {!Element} expr The MathML expression as a string without math tags.
 * @param {!sre.SemanticTree} tree The semantic tree.
 */
sre.SemanticMathml.formattedOutput = function(expr, tree) {
  console.log(sre.SemanticTree.formatXml(tree.toString()));
  console.log(sre.SemanticTree.formatXml(expr.toString()));
};


// Some questions:
// 1) Should we rewrite the existing element or simply build a new one?
//
/**
 * Enriches a MathML element with semantics from the tree.
 * REMARK: Very experimental!
 * @param {!Element} mml The MathML element.
 * @param {!sre.SemanticTree} semantic The semantic tree.
 * @return {!Element} The modified MathML element.
 */
sre.SemanticMathml.enrich = function(mml, semantic) {
  var newMml = sre.SemanticMathml.walkTree_(semantic.root);
  sre.SemanticMathml.formattedOutput(newMml, semantic);
  return newMml;
};


/**
 * Adds ids to the MathML nodes corresponding to the leafs of a semantic tree.
 * @param {!sre.SemanticTree.Node} semantic The semantic tree.
 * @private
 */
sre.SemanticMathml.addLeafId_ = function(semantic) {
  if (semantic.mathml.length === 1) {
    semantic.mathml[0].setAttribute('id', semantic.id);
    return;
  }
  for (var i = 0, content; content = semantic.contentNodes[i]; i++) {
    sre.SemanticMathml.addLeafId_(content);
  }
  for (var j = 0, child; child = semantic.childNodes[j]; j++) {
    sre.SemanticMathml.addLeafId_(child);
  }
};


/**
 * Walks the semantic tree and reassembles a new semantically enriched MathML
 * expression.
 *
 * Note that the original MathML nodes are cloned!
 * @param {!sre.SemanticTree.Node} semantic The semantic tree.
 * @return {!Element} The enriched MathML element.
 * @private
 */
sre.SemanticMathml.walkTree_ = function(semantic) {
  if (semantic.mathml.length === 1) {
    var clone = semantic.mathml[0].cloneNode(true);
    sre.SemanticMathml.setAttributes_(clone, semantic);
    return clone;
  }
  var newContent = semantic.contentNodes.map(
      /**@type{Function}*/(sre.SemanticMathml.walkTree_));
  var newChildren = semantic.childNodes.map(
      /**@type{Function}*/(sre.SemanticMathml.walkTree_));
  var newNode = sre.SystemExternal.document.createElement('mrow');
  sre.SemanticMathml.setAttributes_(newNode, semantic);
  if (newContent.length > 0) {
    newNode.setAttribute('semantic-content',
                         sre.SemanticMathml.makeIdList_(newContent));
  }
  newNode.setAttribute('semantic-children',
                       sre.SemanticMathml.makeIdList_(newChildren));
  var childrenList = sre.SemanticMathml.combineContentChildren_(
      semantic, newContent, newChildren);
  console.log(childrenList.length);
  for (var i = 0, child; child = childrenList[i]; i++) {
    newNode.appendChild(child);
    child.setAttribute('semantic-parent', child.getAttribute('id'));
  }
  return newNode;
};


/**
 * Concatenates node ids into a comma separated lists.
 * @param {!Array.<!Element>} nodes The list of nodes.
 * @return {!string} The comma separated lists.
 * @private
 */
sre.SemanticMathml.makeIdList_ = function(nodes) {
  return nodes.map(function(node) {
    return node.getAttribute('id');
  }).join(',');
};


/**
 * Sets semantic attributes in a MathML node.
 * @param {!Element} mml The MathML node.
 * @param {!sre.SemanticTree.Node} semantic The semantic tree node.
 * @private
 */
sre.SemanticMathml.setAttributes_ = function(mml, semantic) {
  mml.setAttribute('semantic-type', semantic.type);
  mml.setAttribute('semantic-role', semantic.role);
  mml.setAttribute('id', semantic.id);
};


/**
 * Combines contet and children lists depending ont the type of the semantic
 * node.
 * @param {!sre.SemanticTree.Node} semantic The semantic tree node.
 * @param {!Array.<!Element>} content The list of content nodes.
 * @param {!Array.<!Element>} children The list of child nodes.
 * @return {!Array.<!Element>} The combined list.
 * @private
 */
sre.SemanticMathml.combineContentChildren_ = function(
    semantic, content, children) {
  switch (semantic.type) {
    case sre.SemanticAttr.Type.RELSEQ:
    case sre.SemanticAttr.Type.INFIXOP:
      content.forEach(function(c) {
        c.setAttribute('semantic-operator', semantic.textContent);
      });
      return sre.SemanticMathml.interleave_(content, children);
    case sre.SemanticAttr.Type.PREFIXOP:
      content.forEach(function(c) {
        c.setAttribute('semantic-operator', semantic.textContent);
      });
      return content.concat(children);
    case sre.SemanticAttr.Type.POSTFIXOP:
      content.forEach(function(c) {
        c.setAttribute('semantic-operator', semantic.textContent);
      });
      return children.concat(content);
    case sre.SemanticAttr.Type.MULTIREL:
    default:
      return content;
  }
};


/**
 * Interleaves a list of content and child nodes. The former is exactly one less
 * than the latter.
 * @param {!Array.<Element>} content The list of content nodes.
 * @param {!Array.<!Element>} children The list of child nodes.
 * @return {!Array.<!Element>} The combined list.
 * @private
 */
sre.SemanticMathml.interleave_ = function(content, children) {
  var result = [children.shift()];
  for (var i = 0; i <= children.length; i++) {
    result.push(content.shift());
    result.push(children.shift());
  }
  return result;
};

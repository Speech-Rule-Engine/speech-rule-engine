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

goog.require('sre.SemanticTree');



/**
 * Create the namespace
 * @constructor
 */
sre.SemanticMathml = function() {
};


/**
 * Mapping for attributes used in semantic enrichment.
 * @enum {string}
 */
sre.SemanticMathml.Attribute = {
  CHILDREN: 'semantic-children',
  CONTENT: 'semantic-content',
  FONT: 'semantic-font',
  ID: 'semantic-id',
  OPERATOR: 'semantic-operator',
  PARENT: 'semantic-parent',
  ROLE: 'semantic-role',
  TYPE: 'semantic-type'
};


/**
 * Creates formatted output  for MathML and semantic tree expression.
 * REMARK: Helper function.
 * @param {!Element} mml The original MathML expression.
 * @param {!Element} expr The enriched MathML expression.
 * @param {!sre.SemanticTree} tree The semantic tree.
 * @param {boolean=} opt_wiki Flag to specify wiki output.
 */
sre.SemanticMathml.formattedOutput = function(mml, expr, tree, opt_wiki) {
  var wiki = opt_wiki || false;
  sre.SemanticMathml.formattedOutput_(mml, 'Original MathML', wiki);
  sre.SemanticMathml.formattedOutput_(tree, 'Semantic Tree', wiki);
  sre.SemanticMathml.formattedOutput_(expr, 'Semantically enriched MathML',
                                      wiki);
};


/**
 * Prints formatted output for MathML and semantic tree expression. Depending on
 * the wiki flag it might wrap it into markup useful for GitHub wikis.
 * REMARK: Helper function.
 * @param {!(Element|sre.SemanticTree)} element The original MathML expression.
 * @param {string} name The name of the expression to be printed in the wiki.
 * @param {boolean} wiki Flag to specify wiki output.
 * @private
 */
sre.SemanticMathml.formattedOutput_ = function(element, name, wiki) {
  var output = sre.SemanticTree.formatXml(element.toString());
  if (!wiki) {
    console.log(output);
    return;
  }
  console.log(name + ':\n```html\n' + output + '\n```\n');
};


/**
 * Enriches a MathML element with semantics from the tree.
 * REMARK: Very experimental! mml is not really necessary!
 * @param {!Element} mml The MathML element.
 * @param {!sre.SemanticTree} semantic The semantic tree.
 * @return {!Element} The modified MathML element.
 */
sre.SemanticMathml.enrich = function(mml, semantic) {
  var newMml = sre.SemanticMathml.walkTree_(semantic.root);
  sre.SemanticMathml.formattedOutput(mml, newMml, semantic, true);
  return newMml;
};


/**
 * Adds ids to the MathML nodes corresponding to the leafs of a semantic tree.
 * @param {!sre.SemanticTree.Node} semantic The semantic tree.
 * @private
 */
sre.SemanticMathml.addLeafId_ = function(semantic) {
  if (semantic.mathml.length === 1) {
    semantic.mathml[0].setAttribute(sre.SemanticMathml.Attribute.ID,
                                    semantic.id);
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
  var newNode = sre.SemanticMathml.specialCase_(semantic);
  if (newNode) {
    return sre.SemanticMathml.wrapNewNode_(newNode, semantic.mathmlTree,
                                           semantic.mathml);
  }
  var newContent = semantic.contentNodes.map(
      /**@type{Function}*/(sre.SemanticMathml.walkTree_));
  var newChildren = semantic.childNodes.map(
      /**@type{Function}*/(sre.SemanticMathml.walkTree_));
  if (semantic.mathmlTree === null) {
    if (semantic.mathml[0] &&
        sre.SemanticUtil.EMPTYTAGS.
            indexOf(sre.SemanticUtil.tagName(semantic.mathml[0])) !== -1) {
      newNode = semantic.mathml[0].cloneNode(false);
    } else {
      newNode = sre.SystemExternal.document.createElement('mrow');
    }
  } else {
    newNode = semantic.mathmlTree.cloneNode(false);
  }
  sre.SemanticMathml.setAttributes_(newNode, semantic);
  newNode.setAttribute(sre.SemanticMathml.Attribute.CHILDREN,
                       sre.SemanticMathml.makeIdList_(newChildren));
  if (newContent.length > 0) {
    newNode.setAttribute(sre.SemanticMathml.Attribute.CONTENT,
                         sre.SemanticMathml.makeIdList_(newContent));
    var childrenList = sre.SemanticMathml.combineContentChildren_(
        semantic, newContent, newChildren);
  } else {
    childrenList = newChildren;
  }
  for (var i = 0, child; child = childrenList[i]; i++) {
    newNode.appendChild(child);
    child.setAttribute(sre.SemanticMathml.Attribute.PARENT,
                       newNode.getAttribute(sre.SemanticMathml.Attribute.ID));
  }
  if (semantic.mathmlTree === null ||
      semantic.mathmlTree === semantic.mathml[0]) {
    return newNode;
  }
  return sre.SemanticMathml.wrapNewNode_(newNode, semantic.mathmlTree,
                                         semantic.mathml);
};


/**
 * Dealing with special cases in the semantic enrichment.
 * @param {!sre.SemanticTree.Node} semantic The semantic node.
 * @return {Element} The enriched MathML node if the node is a special case.
 * @private
 */
sre.SemanticMathml.specialCase_ = function(semantic) {
  // TODO (sorge) Maybe check with via the subscript role?
  if (semantic.mathmlTree && 
      sre.SemanticUtil.tagName(semantic.mathmlTree) === 'MSUBSUP' &&
      semantic.type === sre.SemanticAttr.Type.SUPERSCRIPT) {
    var sup = sre.SemanticMathml.walkTree_(
        /** @type {!sre.SemanticTree.Node} */(semantic.childNodes[1]));
    var mmlsub = semantic.childNodes[0];
    var base = sre.SemanticMathml.walkTree_(
        /** @type {!sre.SemanticTree.Node} */(mmlsub.childNodes[0]));
    var sub = sre.SemanticMathml.walkTree_(
        /** @type {!sre.SemanticTree.Node} */(mmlsub.childNodes[1]));
    var newChildren = [base, sub, sup];
    var newNode = semantic.mathmlTree.cloneNode(false);
    sre.SemanticMathml.setAttributes_(newNode, semantic);
    newNode.setAttribute(sre.SemanticMathml.Attribute.CHILDREN,
                         sre.SemanticMathml.makeIdList_(newChildren));
    for (var i = 0, child; child = newChildren[i]; i++) {
      newNode.appendChild(child);
      child.setAttribute(sre.SemanticMathml.Attribute.PARENT,
                         newNode.getAttribute(sre.SemanticMathml.Attribute.ID));
    }
    newNode.setAttribute(sre.SemanticMathml.Attribute.TYPE,
                         mmlsub.role);
    return newNode;
  }
  return null;
};


/**
 * Wraps a new node into a layer of empty layout node from the original MathML
 * expression.
 * @param {!Element} newNode The node currently under consideration.
 * @param {!Element} mathmlTree The MathML node associated with newNode.
 * @param {!Array<Element>} mathml List of MathML elements.
 * @return {!Element} The wrapped node.
 * @private
 */
sre.SemanticMathml.wrapNewNode_ = function(newNode, mathmlTree, mathml) {
  // TODO (sorge) We might need to clone all these elements!
  //     Deep or shallow?
  var prefix = [];
  var currentFirst = mathml[0];
  var i = 0;
  while (currentFirst && currentFirst !== mathmlTree) {
    prefix.push(currentFirst);
    i++;
    currentFirst = mathml[i];
  }
  if (!currentFirst) {
    return newNode;
  }
  currentFirst.parentNode.insertBefore(newNode, currentFirst);
  currentFirst.parentNode.removeChild(currentFirst);
  return /** @type {!Element} */(mathml[0]);
};


/**
 * Concatenates node ids into a comma separated lists.
 * @param {!Array.<!Element>} nodes The list of nodes.
 * @return {!string} The comma separated lists.
 * @private
 */
sre.SemanticMathml.makeIdList_ = function(nodes) {
  return nodes.map(function(node) {
    return node.getAttribute(sre.SemanticMathml.Attribute.ID);
  }).join(',');
};


/**
 * Sets semantic attributes in a MathML node.
 * @param {!Element} mml The MathML node.
 * @param {!sre.SemanticTree.Node} semantic The semantic tree node.
 * @private
 */
sre.SemanticMathml.setAttributes_ = function(mml, semantic) {
  mml.setAttribute(sre.SemanticMathml.Attribute.TYPE, semantic.type);
  mml.setAttribute(sre.SemanticMathml.Attribute.ROLE, semantic.role);
  mml.setAttribute(sre.SemanticMathml.Attribute.ID, semantic.id);
};


/**
 * Combines content and children lists depending ont the type of the semantic
 * node.
 * @param {!sre.SemanticTree.Node} semantic The semantic tree node.
 * @param {!Array.<!Element>} content The list of content nodes.
 * @param {!Array.<!Element>} children The list of child nodes.
 * @return {!Array.<!Element>} The combined list.
 * @private
 */
sre.SemanticMathml.combineContentChildren_ = function(
    semantic, content, children) {
  sre.SemanticMathml.setOperatorAttribute_(semantic, content);
  switch (semantic.type) {
    case sre.SemanticAttr.Type.RELSEQ:
    case sre.SemanticAttr.Type.INFIXOP:
    case sre.SemanticAttr.Type.MULTIREL:
      return sre.SemanticMathml.interleave_(content, children);
    case sre.SemanticAttr.Type.PREFIXOP:
      return content.concat(children);
    case sre.SemanticAttr.Type.POSTFIXOP:
      return children.concat(content);
    case sre.SemanticAttr.Type.FENCED:
      children.unshift(content[0]);
      children.push(content[1]);
      return children;
    case sre.SemanticAttr.Type.PUNCTUATED:
      var markupList = [];
      for (var i = 0, j = 0, child, cont;
           child = children[i], cont = content[j]; i++) {
        if (child.getAttribute(sre.SemanticMathml.Attribute.ID) ==
            cont.getAttribute(sre.SemanticMathml.Attribute.ID)) {
          j++;
          markupList.push(child);
        }
      }
      sre.SemanticMathml.setOperatorAttribute_(semantic, markupList);
      return children;
    case sre.SemanticAttr.Type.APPL:
      return [children[0], content[0], children[1]];
    default:
      return content;
  }
};


/**
 * Adds a relevant operator attribute to the a list of content nodes.
 * @param {!sre.SemanticTree.Node} semantic The semantic tree node.
 * @param {!Array.<!Element>} content The list of content nodes.
 * @private
 */
sre.SemanticMathml.setOperatorAttribute_ = function(semantic, content) {
  var operator = semantic.type +
          (semantic.textContent ? ',' + semantic.textContent : '');
  content.forEach(function(c) {
    c.setAttribute(sre.SemanticMathml.Attribute.OPERATOR, operator);});
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

// Copyright 2015 Volker Sorge
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
 * @fileoverview Inject semantic information into MathML
 *
 * Take a MathML element, compute the semantic tree and reinject the semantic
 * information into the MathML.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.SemanticMathml');

goog.require('sre.Debugger');
goog.require('sre.SemanticTree');



/**
 * Create the namespace
 * @constructor
 */
sre.SemanticMathml = function() {
};


/**
 * Object containing settings for the semantic enrichment.
 * @type {{collapsed: boolean,
 *         implicit : boolean}}
 * @const
 */
sre.SemanticMathml.SETTINGS = {
  collapsed: true,
  implicit: true
};


/**
 * Prefix for semantic attributes.
 * @type {string}
 * @const
 * @private
 */
sre.SemanticMathml.ATTRIBUTE_PREFIX_ = 'data-semantic-';


/**
 * Mapping for attributes used in semantic enrichment.
 * @enum {string}
 */
sre.SemanticMathml.Attribute = {
  ADDED: sre.SemanticMathml.ATTRIBUTE_PREFIX_ + 'added',
  CHILDREN: sre.SemanticMathml.ATTRIBUTE_PREFIX_ + 'children',
  COLLAPSED: sre.SemanticMathml.ATTRIBUTE_PREFIX_ + 'collapsed',
  CONTENT: sre.SemanticMathml.ATTRIBUTE_PREFIX_ + 'content',
  FONT: sre.SemanticMathml.ATTRIBUTE_PREFIX_ + 'font',
  ID: sre.SemanticMathml.ATTRIBUTE_PREFIX_ + 'id',
  OPERATOR: sre.SemanticMathml.ATTRIBUTE_PREFIX_ + 'operator',
  PARENT: sre.SemanticMathml.ATTRIBUTE_PREFIX_ + 'parent',
  ROLE: sre.SemanticMathml.ATTRIBUTE_PREFIX_ + 'role',
  TYPE: sre.SemanticMathml.ATTRIBUTE_PREFIX_ + 'type'
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
  console.log(name + ':\n```html\n' +
              sre.SemanticMathml.removeAttributePrefix(output) + '\n```\n');
};


/**
 * Enriches a MathML element with semantics from the tree.
 *
 * NOTE: This is destructive on the MathML expression underlying the semantic
 *     tree! Make sure to copy the original, if necessary!
 * @param {!Element} mml The MathML element.
 * @param {!sre.SemanticTree} semantic The semantic tree.
 * @return {!Element} The modified MathML element.
 */
sre.SemanticMathml.enrich = function(mml, semantic) {
  // The first line is only to preserve output. This should eventually be
  // deleted.
  var oldMml = mml.cloneNode(true);
  var newMml = sre.SemanticMathml.walkTree_(semantic.root);
  sre.Debugger.getInstance().generateOutput(
      function() {
        sre.SemanticMathml.formattedOutput(oldMml, newMml, semantic, true);
      });
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
    var newNode = /**@type{!Element}*/(semantic.mathml[0]);
    sre.SemanticMathml.setAttributes_(newNode, semantic);
    return sre.SemanticMathml.ascendNewNode_(newNode);
  }

  newNode = sre.SemanticMathml.specialCase_(semantic);
  if (newNode) {
    return sre.SemanticMathml.ascendNewNode_(newNode);
  }

  var newContent = semantic.contentNodes.map(
      /**@type{Function}*/(sre.SemanticMathml.cloneContentNode_));
  var newChildren = semantic.childNodes.map(
      /**@type{Function}*/(function(x) {
        return sre.SemanticMathml.walkTree_(x);}));
  var childrenList = sre.SemanticMathml.combineContentChildren_(
      semantic, newContent, newChildren);
  if (semantic.mathmlTree === null) {
    // In case we do not have an original MathML element, we need to find the
    // MathML node where to attach the semantically enriched children. We do
    // this by computing their LCA.
    //
    var newNodeInfo = sre.SemanticMathml.mathmlLca_(childrenList);
    newNode = newNodeInfo.node;
    if (newNodeInfo.valid && sre.SemanticUtil.EMPTYTAGS.
        indexOf(sre.SemanticUtil.tagName(newNode)) !== -1) {
      // If we have an LCA containing all children, then we simply replace it.
      //
      var oldNode = /**@type{!Element}*/(newNode);
      newNode = sre.SemanticMathml.cloneNode_(oldNode);
      sre.DomUtil.replaceNode(oldNode, newNode);
    } else {
      // If we have an LCA containing only some children, then we replace those
      // children only and add a new mrow.
      //
      // TODO (sorge) Here we have to check if the remaining children are ignore
      // tags only. We then have to return the parent node of the mrow.
      //
      newNode = sre.SystemExternal.document.createElement('mrow');
      if (childrenList[0]) {
        // If childrenList is empty we get an empty mrow element representing a
        // node of type empty.
        //
        sre.DomUtil.replaceNode(childrenList[0], newNode);
      }
    }
  } else {
    newNode = sre.SemanticMathml.cloneNode_(semantic.mathmlTree);
    sre.DomUtil.replaceNode(semantic.mathmlTree, newNode);
  }
  sre.SemanticMathml.setAttributes_(newNode, semantic);
  for (var i = 0, child; child = childrenList[i]; i++) {
    newNode.appendChild(child);
  }

  return sre.SemanticMathml.ascendNewNode_(newNode);
};


/**
 * Finds the least common ancestor for a list of MathML nodes in the MathML
 * expression.
 * @param {!Array.<Element>} children A list of MathML nodes.
 * @return {{valid: boolean, node: Element}} Structure indicating if the node
 *     representing the LCA is valid and the least common ancestor if it exits.
 * @private
 */
sre.SemanticMathml.mathmlLca_ = function(children) {
  // Need to avoid newly created children (invisible operators).
  var leftMost = sre.SemanticMathml.attachedElement_(children);
  if (!leftMost) {
    return {valid: false, node: null};
  }
  var rightMost = /**@type{!Element}*/(sre.SemanticMathml.attachedElement_(
      children.slice().reverse()));
  if (leftMost === rightMost) {
    return {valid: true,
      node: sre.SemanticMathml.ascendNewNode_(leftMost)};
  }
  var leftPath = sre.SemanticMathml.pathToRoot_(leftMost);
  var rightPath = sre.SemanticMathml.pathToRoot_(
      rightMost, function(x) {return leftPath.indexOf(x) !== -1;});
  var lca = rightPath[0];
  var lIndex = leftPath.indexOf(lca);
  if (lIndex === -1) {
    return {valid: false, node: null};
  }
  return {valid:
        sre.SemanticMathml.validLca_(leftPath[lIndex + 1], rightPath[1]),
    node: lca};
};


/**
 * Finds the first elements in a list of nodes that has a parent pointer.
 * @param {!Array.<Element>} nodes A list of elements.
 * @return {Element} The first element node with a parent pointer if it exists.
 * @private
 */
sre.SemanticMathml.attachedElement_ = function(nodes) {
  var count = 0;
  var attached = null;
  while (!attached && count < nodes.length) {
    if (nodes[count].parentNode) {
      attached = nodes[count];
    }
    count++;
  }
  return attached;
};


/**
 * Type annotation to get around Closure parsing problems for functions as
 * optional parameters.
 * @typedef{function(!Element): boolean}
 * @private
 */
sre.SemanticMathml.ElementTest_;


/**
 * Computes the path from a node in the MathML tree to the root or until the
 * optional test fires.
 * @param {!Element} node The tree node from where to start.
 * @param {sre.SemanticMathml.ElementTest_=} opt_test The optional test that
 *     stops path computation if it fires.
 * @return {!Array.<!Element>} Path from root to node. That is, node is the last
 *     element in the array and array contains at least the original node.
 * @private
 */
sre.SemanticMathml.pathToRoot_ = function(node, opt_test) {
  var test = opt_test || function(x) {return false;};
  var path = [node];
  while (!test(node) && sre.SemanticUtil.tagName(node) !== 'MATH' &&
         node.parentNode) {
    node = sre.SemanticMathml.parentNode_(node);
    path.unshift(node);
  }
  return path;
};


/**
 * Checks if a LCA of two nodes is valid. It takes the penultimate node in the
 * paths of the original nodes to the LCA and sees if they have no siblings.  In
 * case the have siblings, we can not simply replace the LCA with the node
 * comprising the children.
 * @param {Element} left Left path element.
 * @param {Element} right Right path element.
 * @return {boolean} True if valid LCA. False if either left or right empty or
 *     there exist siblings further to the left or right.
 * @private
 */
sre.SemanticMathml.validLca_ = function(left, right) {
  // TODO (sorge) Here we have to account for ignored tags.
  return !!(left && right && !left.previousSibling && !right.nextSibling);
};


/**
 * Computes the empty layout node that is the highest parent of the given node
 * and that only has one child.
 * @param {!Element} newNode The node currently under consideration.
 * @return {!Element} The parent node.
 * @private
 */
sre.SemanticMathml.ascendNewNode_ = function(newNode) {
  while (sre.SemanticUtil.tagName(newNode) !== 'MATH' &&
         newNode.parentNode &&
         sre.SemanticUtil.EMPTYTAGS.
         indexOf(sre.SemanticUtil.tagName(
             sre.SemanticMathml.parentNode_(newNode))) !== -1 &&
         newNode.parentNode.childNodes.length === 1) {
    newNode = sre.SemanticMathml.parentNode_(newNode);
  }
  return newNode;
};


/**
 * Returns the parent node of the element in the correct type.
 * @param {!Element} element The parent of the element.
 * @return {!Element} Parent element.
 * @private
 */
sre.SemanticMathml.parentNode_ = function(element) {
  return /**@type{!Element}*/(element.parentNode);
};


/**
 * Dealing with special cases in the semantic enrichment.
 * @param {!sre.SemanticTree.Node} semantic The semantic node.
 * @return {Element} The enriched MathML node if the node is a special case.
 * @private
 */
sre.SemanticMathml.specialCase_ = function(semantic) {
  if (semantic.mathmlTree &&
      sre.SemanticUtil.tagName(semantic.mathmlTree) === 'MSUBSUP' &&
      semantic.type === sre.SemanticAttr.Type.SUPERSCRIPT) {
    // TODO (sorge) Needs some refactoring!
    var supSem = /**@type{!sre.SemanticTree.Node}*/(semantic.childNodes[1]);
    var ignore = semantic.childNodes[0];
    var baseSem = /**@type {!sre.SemanticTree.Node}*/(ignore.childNodes[0]);
    var subSem = /**@type {!sre.SemanticTree.Node}*/(ignore.childNodes[1]);
    var supMml = sre.SemanticMathml.walkTree_(supSem);
    var baseMml = sre.SemanticMathml.walkTree_(baseSem);
    var subMml = sre.SemanticMathml.walkTree_(subSem);
    var newChildren = [baseMml, subMml, supMml];
    var newNode = semantic.mathmlTree;
    sre.SemanticMathml.setAttributes_(newNode, semantic);
    newNode.setAttribute(sre.SemanticMathml.Attribute.CHILDREN,
                         sre.SemanticMathml.makeIdListOld_(newChildren));
    for (var i = 0, child; child = newChildren[i]; i++) {
      newNode.appendChild(child);
      child.setAttribute(sre.SemanticMathml.Attribute.PARENT,
                         newNode.getAttribute(sre.SemanticMathml.Attribute.ID));
    }
    newNode.setAttribute(sre.SemanticMathml.Attribute.TYPE,
                         ignore.role);
    // TODO (sorge) Put this into separate function when doing the mmultiscript
    //     work.
    newNode.setAttribute(sre.SemanticMathml.Attribute.COLLAPSED,
                         '(' + semantic.id +
                         ' (' + ignore.id + ' ' + baseSem.id + ' ' +
                         subSem.id + ') ' + supSem.id + ')');
    return newNode;
  }
  return null;
};


/**
 * Clones a content node.
 * @param {!sre.SemanticTree.Node} content The content node.
 * @return {!Element} The corresponding MathML node.
 * @private
 */
sre.SemanticMathml.cloneContentNode_ = function(content) {
  if (content.mathml.length > 0) {
    return sre.SemanticMathml.walkTree_(content);
    // sre.SemanticMathml.setAttributes_(
    //     content.mathml[content.mathml.length - 1], content);
    // return content.mathml[content.mathml.length - 1];
  }
  var clone = sre.SemanticMathml.SETTINGS.implicit ?
      sre.SemanticMathml.createInvisibleOperator_(content) :
      sre.SystemExternal.document.createElement('mrow');
  sre.SemanticMathml.setAttributes_(clone, content);
  return clone;
};


/**
 * Concatenates node ids into a comma separated lists.
 * @param {!Array.<!sre.SemanticTree.Node>} nodes The list of nodes.
 * @return {!string} The comma separated lists.
 * @private
 */
sre.SemanticMathml.makeIdList_ = function(nodes) {
  return nodes.map(function(node) {
    return node.id;
  }).join(',');
};


/**
 * Concatenates node ids into a comma separated lists.
 * @param {!Array.<!Element>} nodes The list of nodes.
 * @return {!string} The comma separated lists.
 * @private
 */
sre.SemanticMathml.makeIdListOld_ = function(nodes) {
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
  if (semantic.childNodes.length > 0) {
    mml.setAttribute(sre.SemanticMathml.Attribute.CHILDREN,
                     sre.SemanticMathml.makeIdList_(semantic.childNodes));
  }
  if (semantic.contentNodes.length > 0) {
    mml.setAttribute(sre.SemanticMathml.Attribute.CONTENT,
                     sre.SemanticMathml.makeIdList_(semantic.contentNodes));
  }
  if (semantic.parent) {
    mml.setAttribute(sre.SemanticMathml.Attribute.PARENT, semantic.parent.id);
  }
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
      if (semantic.role === sre.SemanticAttr.Role.TEXT) {
        return sre.SemanticMathml.interleave_(content, children);
      }
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
    case sre.SemanticAttr.Type.ROOT:
      return [children[1], children[0]];
    default:
      return children;
  }
};


/**
 * Makes a new MathML element for an invisible operator.
 * @param {!sre.SemanticTree.Node} operator The semantic node with the operator.
 * @return {!Element} The newly created MathML element.
 * @private
 */
sre.SemanticMathml.createInvisibleOperator_ = function(operator) {
  var moNode = sre.SystemExternal.document.createElement('mo');
  var text = sre.SystemExternal.document.
      createTextNode(operator.textContent);
  moNode.appendChild(text);
  sre.SemanticMathml.setAttributes_(moNode, operator);
  moNode.setAttribute(sre.SemanticMathml.Attribute.ADDED, 'true');
  return moNode;
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
    (sre.SemanticMathml.getInnerNode_(c)).setAttribute(
        sre.SemanticMathml.Attribute.OPERATOR, operator);});
};


/**
 * Finds the innermost element node of a MathML node with only one child.
 * @param {!Element} content The MathML content node to process.
 * @return {!Element} The innermost element node.
 * @private
 */
sre.SemanticMathml.getInnerNode_ = function(content) {
  while (content.childNodes && content.childNodes.length === 1 &&
      content.childNodes[0].nodeType === sre.DomUtil.NodeType.ELEMENT_NODE) {
    content = content.childNodes[0];
  }
  return content;
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
  while (children.length > 0 && content.length > 0) {
    result.push(content.shift());
    result.push(children.shift());
  }
  return result;
};


/**
 * Clones an original MathML node. Deep clone only if it is a leave node or was
 * originally ignored.
 * @param {!Element} mml The MathML node to clone.
 * @return {!Element} The cloned node.
 * @private
 */
sre.SemanticMathml.cloneNode_ = function(mml) {
  // TODO (sorge) Ignored elements do not work yet.
  var tagName = sre.SemanticUtil.tagName(mml);
  if (sre.SemanticUtil.LEAFTAGS.indexOf(tagName) !== -1 ||
      sre.SemanticUtil.IGNORETAGS.indexOf(tagName) !== -1) {
    return mml.cloneNode(true);
  }
  return mml.cloneNode(false);
};


/**
 * Removes the semantic prefix from the attributes of an enriched MathML element
 * given as a serialised string. This is useful for more concise display.
 *
 * NOTE THAT THIS METHOD IS FRAGILE!
 *
 * The result is not necessarily a meaningful XML expression. Attributes might
 * overwrite or be shadowed by other attributes already in the node. For
 * example, with both PREFIX-attr and attr present, the latter is overwritten by
 * the operation.
 * @param {!string} mml The MathML node.
 * @return {!string} The MathML node with rewritten attributes.
 */
sre.SemanticMathml.removeAttributePrefix = function(mml) {
  return mml.toString().replace(
      new RegExp(sre.SemanticMathml.ATTRIBUTE_PREFIX_, 'g'), '');
};


/**
 * Prints a list of nodes.
 * @param {string} title A string to print first.
 * @param {!NodeList} nodes A list of nodes.
 */
sre.SemanticMathml.printNodeList__ = function(title, nodes) {
  console.log(title);
  sre.DomUtil.toArray(nodes).forEach(function(x) {console.log(x.toString());});
  console.log('<<<<<<<<<<<<<<<<<');
};


/**
 * Tests for an expression with debugger outp
 * @param {string} expr MathML expression.
 */
sre.SemanticMathml.testTranslation__ = function(expr) {
  sre.Debugger.getInstance().init();
  sre.SemanticMathml.removeAttributePrefix(
      sre.Semantic.enrichMathml('<math>' + expr + '</math>').toString());
};

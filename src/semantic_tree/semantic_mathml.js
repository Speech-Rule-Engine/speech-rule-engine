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
        sre.SemanticMathml.formattedOutput(oldMml, mml, semantic, true);
      });
  return mml;
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
    sre.Debugger.getInstance().output('Walktree Case 0');
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
      /**@type{Function}*/(sre.SemanticMathml.walkTree_));
  var childrenList = sre.SemanticMathml.combineContentChildren_(
      semantic, newContent, newChildren);
  newNode = semantic.mathmlTree;
  if (newNode === null) {
    sre.Debugger.getInstance().output('Walktree Case 1');
    newNode = sre.SemanticMathml.introduceNewLayer_(childrenList);
  } else {
    var attached = sre.SemanticMathml.attachedElement_(childrenList);
    sre.Debugger.getInstance().output('Walktree Case 2');
    if (attached) {
      sre.Debugger.getInstance().output('Walktree Case 2.1');
      newNode = /**@type{!Element}*/(attached.parentNode);
    } else {
      sre.Debugger.getInstance().output('Walktree Case 2.2');
      newNode = sre.SemanticMathml.getInnerNode_(/**@type{!Element}*/(newNode));
    }
  }
  newNode = sre.SemanticMathml.rewriteMfenced_(newNode);
  sre.SemanticMathml.mergeChildren_(newNode, childrenList);
  sre.SemanticMathml.setAttributes_(newNode, semantic);
  return sre.SemanticMathml.ascendNewNode_(newNode);
};


/**
 * Sorts a list of children into the MathML tree. It introduces a new layer into
 * the MathML tree, if necessary, in case the semantic node has not been
 * generated from an original MathML element or the list of children is empty.
 *
 * In case we do not have an original MathML element, we need to find the
 * MathML node where to attach the semantically enriched children. We do
 * this by computing their LCA.
 *
 * If the LCA contains only (a subset) of the given children, it is returned.
 *
 * If children is not empty we return a new empty mrow element.
 *
 * If we have an LCA containing only some children, then we group the children
 * together with any interspersed ignored nodes into new mrow and attach this in
 * place of the original children.
 *
 * @param {!Array.<Element>} children The list of children of the MathML
 *     element.
 * @return {!Element} The node containing the children.
 * @private
 */
sre.SemanticMathml.introduceNewLayer_ = function(children) {
  var newNodeInfo = sre.SemanticMathml.mathmlLca_(children);
  var newNode = newNodeInfo.node;
  if (!newNodeInfo.valid || !sre.SemanticUtil.hasEmptyTag(newNode)) {
    sre.Debugger.getInstance().output('Walktree Case 1.1');
    newNode = sre.SystemExternal.document.createElement('mrow');
    if (children[0]) {
      sre.Debugger.getInstance().output('Walktree Case 1.1.1');
      var node = sre.SemanticMathml.attachedElement_(children);
      var oldChildren = sre.SemanticMathml.childrenSubset_(
          /**@type{!Element}*/(node.parentNode), children);
      sre.DomUtil.replaceNode(node, newNode);
      oldChildren.forEach(function(x) {newNode.appendChild(x);});
    }
  }
  return /**@type{!Element}*/(newNode);
};


/**
 * Retrieves a minimal subset of children of the node that contain all the nodes
 * in the newChildren list. If there are elements in newChildren not in the
 * children of node, these are ignored.
 * @param {!Element} node The node whose children are picked.
 * @param {!Array<Element>} newChildren The list of new children.
 * @return {!Array<Element>} The minimal subset.
 * @private
 */
sre.SemanticMathml.childrenSubset_ = function(node, newChildren) {
  var oldChildren = sre.DomUtil.toArray(node.childNodes);
  var leftIndex = +Infinity;
  var rightIndex = -Infinity;
  newChildren.forEach(function(child) {
    var index = oldChildren.indexOf(child);
    if (index !== -1) {
      leftIndex = Math.min(leftIndex, index);
      rightIndex = Math.max(rightIndex, index);
    }
  });
  return oldChildren.slice(leftIndex, rightIndex + 1);
};


/**
 * Merges a list of new children with the children of the given node.
 * @param {!Element} node The node whose children are merged.
 * @param {!Array<Element>} newChildren The list of children to be merged.
 * @private
 */
sre.SemanticMathml.mergeChildren_ = function(node, newChildren) {
  var oldChildren = node.childNodes;
  if (!oldChildren.length) {
    newChildren.forEach(function(x) {node.appendChild(x);});
    return;
  }
  var oldCounter = 0;
  while (newChildren.length) {
    // TODO (sorge) This special case is only necessary, because explicit
    // function applications are destructively dropped in the semantic tree
    // computation. This should be addressed in the future!
    //
    if (oldChildren[oldCounter] === newChildren[0] ||
        sre.SemanticMathml.functionApplication_(
        oldChildren[oldCounter], newChildren[0])) {
      newChildren.shift();
      oldCounter++;
      continue;
    }
    if (oldChildren[oldCounter] &&
        newChildren.indexOf(oldChildren[oldCounter]) === -1) {
      oldCounter++;
      continue;
    }
    node.insertBefore(newChildren[0], oldChildren[oldCounter]);
    newChildren.shift();
  }
};


/**
 * Checks if both old and new Node are invisible function applications and if
 * the new node has been explicitly added. If true it replaces the old for the
 * new node destructively.
 * @param {Element} oldNode The old node.
 * @param {Element} newNode The new, possibly added node.
 * @return {boolean} True if condition holds.
 * @private
 */
sre.SemanticMathml.functionApplication_ = function(oldNode, newNode) {
  var appl = sre.SemanticAttr.functionApplication();
  if (oldNode && newNode && oldNode.textContent && newNode.textContent &&
      oldNode.textContent === appl && newNode.textContent === appl &&
      newNode.getAttribute(sre.SemanticMathml.Attribute.ADDED) === 'true') {
    sre.DomUtil.replaceNode(oldNode, newNode);
    return true;
  }
  return false;
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
      node: leftMost}; //sre.SemanticMathml.ascendNewNode_(leftMost)};
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
 * Type annotation for arrays representing collapsed node structures.
 * @typedef{number|Array.<sre.SemanticMathml.Collapsed_>}
 * @private
 */
sre.SemanticMathml.Collapsed_;


/**
 * Checks if the structure is simple, i.e., a single id number.
 * @param {sre.SemanticMathml.Collapsed_} strct The structure.
 * @return {boolean} True if a simple number.
 * @private
 */
sre.SemanticMathml.simpleCollapseStructure_ = function(strct) {
  return (typeof strct === 'number');
};


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
  while (!test(node) && !sre.SemanticUtil.hasMathTag(node) && node.parentNode) {
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
  while (!sre.SemanticUtil.hasMathTag(newNode) &&
         sre.SemanticMathml.unitChild_(newNode)) {
    newNode = sre.SemanticMathml.parentNode_(newNode);
  }
  return newNode;
};


/**
 * Checks if the node is a unit child, meaning it is the only child of its
 * parent modulo ignored nodes.
 * @param {!Element} node The node to be tested.
 * @return {boolean} True if node is a legal unit child.
 * @private
 */
sre.SemanticMathml.unitChild_ = function(node) {
  var parent = sre.SemanticMathml.parentNode_(node);
  if (!parent || !sre.SemanticUtil.hasEmptyTag(parent)) {
    return false;
  }
  return sre.DomUtil.toArray(parent.childNodes).every(
      function(child) {
        return child === node || sre.SemanticUtil.hasIgnoreTag(child);
      });
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
  if (!semantic.mathmlTree) {
    return null;
  }
  var mml = semantic.mathmlTree;
  var mmlTag = sre.SemanticUtil.tagName(mml);
  if ((mmlTag === 'MSUBSUP' &&
       semantic.type === sre.SemanticAttr.Type.SUPERSCRIPT) ||
       (mmlTag === 'MUNDEROVER' &&
        semantic.type === sre.SemanticAttr.Type.OVERSCORE)) {
    return sre.SemanticMathml.doubleScriptCase_(semantic);
  }
  if (semantic.type === sre.SemanticAttr.Type.TENSOR) {
    return sre.SemanticMathml.tensorCase_(semantic);
  }
  if (mmlTag === 'MMULTISCRIPTS' &&
      (semantic.type === sre.SemanticAttr.Type.SUPERSCRIPT ||
       semantic.type === sre.SemanticAttr.Type.SUBSCRIPT)) {
    return sre.SemanticMathml.mmultiscriptCase_(semantic);
  }
  if (semantic.type === sre.SemanticAttr.Type.LINE) {
    if (semantic.childNodes.length) {
      sre.SemanticMathml.walkTree_(
          /**@type{!sre.SemanticTree.Node}*/(semantic.childNodes[0]));
    }
    sre.SemanticMathml.setAttributes_(mml, semantic);
    return sre.SemanticMathml.ascendNewNode_(mml);
  }
  if (semantic.type === sre.SemanticAttr.Type.MATRIX ||
      semantic.type === sre.SemanticAttr.Type.VECTOR ||
      semantic.type === sre.SemanticAttr.Type.CASES) {
    var lfence = sre.SemanticMathml.cloneContentNode_(
        /**@type{!sre.SemanticTree.Node}*/(semantic.contentNodes[0]));
    var rfence = semantic.contentNodes[1] ?
        sre.SemanticMathml.cloneContentNode_(
            /**@type{!sre.SemanticTree.Node}*/(semantic.contentNodes[1])) :
        null;
    semantic.childNodes.map(/**@type{Function}*/(sre.SemanticMathml.walkTree_));
    if (mmlTag === 'MFENCED') {
      var children = mml.childNodes;
      mml.insertBefore(lfence, children[0]);
      rfence && mml.appendChild(rfence);
      mml = sre.SemanticMathml.rewriteMfenced_(mml);
    } else {
      var newChildren = [lfence, mml];
      rfence && newChildren.push(rfence);
      mml = sre.SemanticMathml.introduceNewLayer_(newChildren);
    }
    sre.SemanticMathml.setAttributes_(mml, semantic);
    return sre.SemanticMathml.ascendNewNode_(mml);
  }
  return null;
};


/**
 * Deals with double scripts as in msubsup or munderover.
 * @param {!sre.SemanticTree.Node} semantic The semantic node.
 * @return {Element} The enriched MathML node for the special case.
 * @private
 */
sre.SemanticMathml.doubleScriptCase_ = function(semantic) {
  // TODO (sorge) Needs some refactoring!
  //
  var supSem = /**@type{!sre.SemanticTree.Node}*/(semantic.childNodes[1]);
  var ignore = semantic.childNodes[0];
  var baseSem = /**@type {!sre.SemanticTree.Node}*/(ignore.childNodes[0]);
  var subSem = /**@type {!sre.SemanticTree.Node}*/(ignore.childNodes[1]);
  var supMml = sre.SemanticMathml.walkTree_(supSem);
  var baseMml = sre.SemanticMathml.walkTree_(baseSem);
  var subMml = sre.SemanticMathml.walkTree_(subSem);
  var newNode = /**@type{!Element}*/(semantic.mathmlTree);
  sre.SemanticMathml.setAttributes_(newNode, semantic);
  newNode.setAttribute(
      sre.SemanticMathml.Attribute.CHILDREN,
      sre.SemanticMathml.makeIdList_([baseSem, subSem, supSem]));
  [baseMml, subMml, supMml].forEach(function(child) {
    (sre.SemanticMathml.getInnerNode_(child)).setAttribute(
        sre.SemanticMathml.Attribute.PARENT,
        newNode.getAttribute(sre.SemanticMathml.Attribute.ID));
  });
  newNode.setAttribute(sre.SemanticMathml.Attribute.TYPE,
      ignore.role);
  sre.SemanticMathml.addCollapsedAttribute_(
      newNode, [semantic.id, [ignore.id, baseSem.id, subSem.id], supSem.id]);
  return newNode;
};


/**
 * Deals with degenerated Tensors.
 * @param {!sre.SemanticTree.Node} tensor The tensor node.
 * @return {Element} The enriched MathML node for that tensor.
 * @private
 */
sre.SemanticMathml.mmultiscriptCase_ = function(tensor) {
  var newNode = /**@type{!Element}*/(tensor.mathmlTree);
  sre.SemanticMathml.setAttributes_(newNode, tensor);
  if (tensor.childNodes[0] &&
      tensor.childNodes[0].role === sre.SemanticAttr.Role.SUBSUP) {
    var ignore = tensor.childNodes[0];
    var baseSem = /**@type {!sre.SemanticTree.Node}*/(ignore.childNodes[0]);
    var rsup = sre.SemanticMathml.multiscriptIndex_(tensor.childNodes[1]);
    var rsub = sre.SemanticMathml.multiscriptIndex_(ignore.childNodes[1]);
    var collapsed = [tensor.id, [ignore.id, baseSem.id, rsub], rsup];
    sre.SemanticMathml.addCollapsedAttribute_(newNode, collapsed);
    newNode.setAttribute(sre.SemanticMathml.Attribute.TYPE,
                         ignore.role);
    sre.SemanticMathml.completeMultiscript_(
        tensor, newNode,
        sre.SemanticMathml.interleaveIds_(rsub, rsup),
        []);
  } else {
    var baseSem = /**@type {!sre.SemanticTree.Node}*/(tensor.childNodes[0]);
    var rsup = sre.SemanticMathml.multiscriptIndex_(tensor.childNodes[1]);
    if (!sre.SemanticMathml.simpleCollapseStructure_(rsup)) {
      var collapsed = [tensor.id, baseSem.id, rsup];
      sre.SemanticMathml.addCollapsedAttribute_(newNode, collapsed);
    }
  }
  var childIds = sre.SemanticMathml.collapsedLeafs_(rsub || [], rsup);
  var base = sre.SemanticMathml.walkTree_(baseSem);
  sre.SemanticMathml.getInnerNode_(base).setAttribute(
      sre.SemanticMathml.Attribute.PARENT, tensor.id);
  childIds.unshift(baseSem.id);
  newNode.setAttribute(sre.SemanticMathml.Attribute.CHILDREN,
                       childIds.join(','));
  return sre.SemanticMathml.ascendNewNode_(newNode);
};


/**
 * Deals with tensor nodes by readjusting the index structure.
 * @param {!sre.SemanticTree.Node} tensor The tensor node.
 * @return {Element} The enriched MathML node for that tensor.
 * @private
 */
sre.SemanticMathml.tensorCase_ = function(tensor) {
  sre.SemanticMathml.walkTree_(
      /**@type{!sre.SemanticTree.Node}*/(tensor.childNodes[0]));
  var lsub = sre.SemanticMathml.multiscriptIndex_(tensor.childNodes[1]);
  var lsup = sre.SemanticMathml.multiscriptIndex_(tensor.childNodes[2]);
  var rsub = sre.SemanticMathml.multiscriptIndex_(tensor.childNodes[3]);
  var rsup = sre.SemanticMathml.multiscriptIndex_(tensor.childNodes[4]);
  var newNode = /**@type{!Element}*/(tensor.mathmlTree);
  sre.SemanticMathml.setAttributes_(newNode, tensor);
  var collapsed = [tensor.id, lsub, lsup, rsub, rsup];
  if (!collapsed.every(sre.SemanticMathml.simpleCollapseStructure_)) {
    sre.SemanticMathml.addCollapsedAttribute_(newNode, collapsed);
  }
  var childIds = sre.SemanticMathml.collapsedLeafs_(lsub, lsup, rsub, rsup);
  childIds.unshift(tensor.childNodes[0].id);
  newNode.setAttribute(sre.SemanticMathml.Attribute.CHILDREN,
                       childIds.join(','));
  sre.SemanticMathml.completeMultiscript_(
      tensor, newNode,
      sre.SemanticMathml.interleaveIds_(rsub, rsup),
      sre.SemanticMathml.interleaveIds_(lsub, lsup));
  return sre.SemanticMathml.ascendNewNode_(newNode);
};


/**
 * Interleaves the ids of two index lists.
 * @param {!sre.SemanticMathml.Collapsed_} first A structured list of
 *     ids.
 * @param {!sre.SemanticMathml.Collapsed_} second A structured list of
 *     ids.
 * @return {!sre.SemanticMathml.Collapsed_} A simple list of ids.
 * @private
 */
sre.SemanticMathml.interleaveIds_ = function(first, second) {
  return sre.SemanticMathml.interleaveLists_(
      sre.SemanticMathml.collapsedLeafs_(first),
      sre.SemanticMathml.collapsedLeafs_(second));
};


/**
 * Returns a list of the leaf ids for the given collapsed structures.
 * @param {...sre.SemanticMathml.Collapsed_} var_args The collapsed structure
 *     annotations.
 * @return {!Array.<number>} The leafs of the structure annotations.
 * @private
 */
sre.SemanticMathml.collapsedLeafs_ = function(var_args) {
  var collapseStructure = function(coll) {
    if (sre.SemanticMathml.simpleCollapseStructure_(coll)) {
      return [coll];
    }
    return coll.slice(1);
  };
  return Array.prototype.slice.call(arguments, 0).
      reduce(function(x, y) {
        return x.concat(collapseStructure(y));
      }, []);
};


/**
 * Adds a collapsed attribute to the given node, according to the collapsed
 * structure.
 * @param {!Element} node The MathML node.
 * @param {!sre.SemanticMathml.Collapsed_} collapsed The collapsed structure
 *    annotations.
 * @private
 */
sre.SemanticMathml.addCollapsedAttribute_ = function(node, collapsed) {
  /**
   * @param {!sre.SemanticMathml.Collapsed_} struct Collapse structure.
   * @return {!string} The structure as string.
   */
  var collapseString = function(struct) {
    if (sre.SemanticMathml.simpleCollapseStructure_(struct)) {
      return struct.toString();
    }
    return '(' + struct.map(collapseString).join(' ') + ')';
  };
  node.setAttribute(sre.SemanticMathml.Attribute.COLLAPSED,
                    collapseString(collapsed));
};


/**
 * Completes the mmultiscript by adding missing None nodes and sorting out the
 * right order of children.
 * @param {!sre.SemanticTree.Node} tensor The semantic tensor node.
 * @param {!Element} multiscript Its MathML counterpart.
 * @param {!sre.SemanticMathml.Collapsed_} rightIndices The ids of the leaf
 *     nodes of the right indices.
 * @param {!sre.SemanticMathml.Collapsed_} leftIndices The ids of the leaf
 *     nodes of the left indices.
 * @private
 */
sre.SemanticMathml.completeMultiscript_ = function(
    tensor, multiscript, rightIndices, leftIndices) {
  var children = sre.DomUtil.toArray(multiscript.childNodes).slice(1);
  var childCounter = 0;
  var completeIndices = function(indices) {
    for (var i = 0, index; index = indices[i]; i++) {
      var child = children[childCounter];
      if (!child ||
          index != sre.SemanticMathml.getInnerNode_(child).
              getAttribute(sre.SemanticMathml.Attribute.ID)) {
        var query = tensor.querySelectorAll(
            function(x) {return x.id === index;});
        multiscript.insertBefore(
            sre.SemanticMathml.createNone_(query[0]), child);
      } else {
        sre.SemanticMathml.getInnerNode_(child).
            setAttribute(sre.SemanticMathml.Attribute.PARENT, tensor.id);
        childCounter++;
      }
    }
  };
  // right sub and superscripts
  completeIndices(rightIndices);
  // mprescripts
  if (children[childCounter] &&
      sre.SemanticUtil.tagName(children[childCounter]) !== 'MPRESCRIPTS') {
    multiscript.insertBefore(
        children[childCounter],
        sre.SystemExternal.document.createElement('mprescripts'));
  } else {
    childCounter++;
  }
  // left sub and superscripts
  completeIndices(leftIndices);
};


/**
 * Creates a None node.
 * @param {sre.SemanticTree.Node} semantic An empty semantic node.
 * @return {!Element} The corresponding MathML <None/> node.
 * @private
 */
sre.SemanticMathml.createNone_ = function(semantic) {
  var newNode = sre.SystemExternal.document.createElement('none');
  if (semantic) {
    sre.SemanticMathml.setAttributes_(newNode, semantic);
  }
  newNode.setAttribute(sre.SemanticMathml.Attribute.ADDED, 'true');
  return newNode;
};


/**
 * Treats the index nodes of a multiscript tensor, possibly collapsing dummy
 * punctuations.
 * @param {sre.SemanticTree.Node} index The index node of a tensor.
 * @return {!sre.SemanticMathml.Collapsed_} If the index node was a
 *     dummy punctuation, i.e. consisted of more than one index, a list of
 *     strings for the collapsed structure is returned, otherwise the node id.
 * @private
 */
sre.SemanticMathml.multiscriptIndex_ = function(index) {
  if (index.type === sre.SemanticAttr.Type.PUNCTUATED &&
      index.contentNodes[0].role === sre.SemanticAttr.Role.DUMMY) {
    var role = index.role;
    var parentId = index.parent.id;
    var childIds = [index.id];
    for (var i = 0, child; child = index.childNodes[i]; i++) {
      var mmlChild = sre.SemanticMathml.walkTree_(child);
      var innerNode = sre.SemanticMathml.getInnerNode_(mmlChild);
      innerNode.setAttribute(sre.SemanticMathml.Attribute.PARENT, parentId);
      innerNode.setAttribute(sre.SemanticMathml.Attribute.ROLE, role);
      childIds.push(child.id);
    }
    return childIds;
  }
  sre.SemanticMathml.walkTree_(index);
  return index.id;
};


/**
 * Clones a content node.
 * @param {!sre.SemanticTree.Node} content The content node.
 * @return {!Element} The corresponding MathML node.
 * @private
 */
sre.SemanticMathml.cloneContentNode_ = function(content) {
  if (content.mathml.length) {
    return sre.SemanticMathml.walkTree_(content);
  }
  var clone = sre.SemanticMathml.SETTINGS.implicit ?
      sre.SemanticMathml.createInvisibleOperator_(content) :
      sre.SystemExternal.document.createElement('mrow');
  content.mathml = [clone];
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
  if (semantic.childNodes.length) {
    mml.setAttribute(sre.SemanticMathml.Attribute.CHILDREN,
                     sre.SemanticMathml.makeIdList_(semantic.childNodes));
  }
  if (semantic.contentNodes.length) {
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
      return sre.SemanticMathml.interleaveLists_(children, content);
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
        return sre.SemanticMathml.interleaveLists_(children, content);
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
 * Rewrites an mfenced node to an mrow node.
 * @param {!Element} mml The MathML node.
 * @return {!Element} The rewritten element.
 * @private
 */
sre.SemanticMathml.rewriteMfenced_ = function(mml) {
  if (sre.SemanticUtil.tagName(mml) !== 'MFENCED') {
    return mml;
  }
  var newNode = sre.SystemExternal.document.createElement('mrow');
  for (var i = 0, attr; attr = mml.attributes[i]; i++) {
    if (['open', 'close', 'separators'].indexOf(attr.name) === -1) {
      newNode.setAttribute(attr.name, attr.value);
    }
  }
  sre.DomUtil.toArray(mml.childNodes).
      forEach(function(x) {newNode.appendChild(x);});
  sre.DomUtil.replaceNode(mml, newNode);
  return newNode;
};


/**
 * Makes a new MathML element for an invisible operator or one added by mfenced.
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
 * Recursively computes the innermost element node. That is for an element it
 * descends empty tags like mrow, ignoring ignore tags like merror, etc. as long
 * as there is a single non-trivial node. Returns the non-trivial node lowest in
 * the tree.
 * @param {!Element} node The MathML element to process.
 * @return {!Element} The innermost element node, which can be the original node
 *     itself.
 * @private
 */
sre.SemanticMathml.getInnerNode_ = function(node) {
  var children = sre.DomUtil.toArray(node.childNodes);
  if (!children) {
    return node;
  }
  var remainder = children.filter(function(child) {
    return child.nodeType === sre.DomUtil.NodeType.ELEMENT_NODE &&
        !sre.SemanticUtil.hasIgnoreTag(child);
  });
  var result = [];
  for (var i = 0, remain; remain = remainder[i]; i++) {
    if (sre.SemanticUtil.hasEmptyTag(remain)) {
      var nextInner = sre.SemanticMathml.getInnerNode_(remain);
      if (nextInner && nextInner !== remain) {
        result.push(nextInner);
      }
    } else {
      result.push(remain);
    }
  }
  if (result.length === 1) {
    return result[0];
  }
  return node;
};


/**
 * Interleaves two lists, starting with the first. If either list is longer, it
 * will be appended at the end.
 * @param {!Array.<*>} list1 The first list.
 * @param {!Array.<*>} list2 The second list.
 * @return {!Array.<*>} The combined list.
 * @private
 */
sre.SemanticMathml.interleaveLists_ = function(list1, list2) {
  var result = [];
  while (list1.length || list2.length) {
    list1.length && result.push(list1.shift());
    list2.length && result.push(list2.shift());
  }
  return result;
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

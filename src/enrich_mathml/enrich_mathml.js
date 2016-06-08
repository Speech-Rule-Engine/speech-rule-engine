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

goog.provide('sre.EnrichMathml');
goog.provide('sre.EnrichMathml.Attribute');
goog.provide('sre.EnrichMathml.Error');

goog.require('sre.BaseUtil');
goog.require('sre.Debugger');
goog.require('sre.DomUtil');
goog.require('sre.EnrichCaseFactory');
goog.require('sre.Semantic');



/**
 * Error object for signaling enirchment errors.
 * @param {string} msg The error message.
 * @constructor
 * @extends {Error}
 */
sre.EnrichMathml.Error = function(msg) {
  goog.base(this);
  this.message = msg || '';
  this.name = 'MathML Enrichment Error';
};
goog.inherits(sre.EnrichMathml.Error, Error);


/**
 * Object containing settings for the semantic enrichment.
 * @type {{collapsed: boolean,
 *         implicit : boolean}}
 * @const
 */
sre.EnrichMathml.SETTINGS = {
  collapsed: true,
  implicit: true
};


/**
 * Prefix for semantic attributes.
 * @type {string}
 * @const
 * @private
 */
sre.EnrichMathml.ATTRIBUTE_PREFIX_ = 'data-semantic-';


/**
 * Mapping for attributes used in semantic enrichment.
 * @enum {string}
 */
sre.EnrichMathml.Attribute = {
  ADDED: sre.EnrichMathml.ATTRIBUTE_PREFIX_ + 'added',
  ALTERNATIVE: sre.EnrichMathml.ATTRIBUTE_PREFIX_ + 'alternative',
  CHILDREN: sre.EnrichMathml.ATTRIBUTE_PREFIX_ + 'children',
  COLLAPSED: sre.EnrichMathml.ATTRIBUTE_PREFIX_ + 'collapsed',
  CONTENT: sre.EnrichMathml.ATTRIBUTE_PREFIX_ + 'content',
  EMBELLISHED: sre.EnrichMathml.ATTRIBUTE_PREFIX_ + 'embellished',
  FENCEPOINTER: sre.EnrichMathml.ATTRIBUTE_PREFIX_ + 'fencepointer',
  FONT: sre.EnrichMathml.ATTRIBUTE_PREFIX_ + 'font',
  ID: sre.EnrichMathml.ATTRIBUTE_PREFIX_ + 'id',
  OPERATOR: sre.EnrichMathml.ATTRIBUTE_PREFIX_ + 'operator',
  PARENT: sre.EnrichMathml.ATTRIBUTE_PREFIX_ + 'parent',
  PREFIX: sre.EnrichMathml.ATTRIBUTE_PREFIX_ + 'prefix',
  ROLE: sre.EnrichMathml.ATTRIBUTE_PREFIX_ + 'role',
  SPEECH: sre.EnrichMathml.ATTRIBUTE_PREFIX_ + 'speech',
  TYPE: sre.EnrichMathml.ATTRIBUTE_PREFIX_ + 'type'
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
sre.EnrichMathml.enrich = function(mml, semantic) {
  // The first line is only to preserve output. This should eventually be
  // deleted.
  var oldMml = mml.cloneNode(true);
  var newMml = sre.EnrichMathml.walkTree(semantic.root);
  sre.Debugger.getInstance().generateOutput(
      function() {
        sre.EnrichMathml.formattedOutput(oldMml, mml, semantic, true);
        return [];
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
 */
sre.EnrichMathml.walkTree = function(semantic) {
  var specialCase = sre.EnrichCaseFactory.getCase(semantic);

  if (specialCase) {
    var newNode = specialCase.getMathml();
    return sre.EnrichMathml.ascendNewNode(newNode);
  }
  if (semantic.mathml.length === 1) {
    sre.Debugger.getInstance().output('Walktree Case 0');
    newNode = /**@type{!Element}*/(semantic.mathml[0]);
    sre.EnrichMathml.setAttributes(newNode, semantic);
    return sre.EnrichMathml.ascendNewNode(newNode);
  }

  var newContent = semantic.contentNodes.map(
      /**@type{Function}*/(sre.EnrichMathml.cloneContentNode));
  var newChildren = semantic.childNodes.map(
      /**@type{Function}*/(sre.EnrichMathml.walkTree));
  var childrenList = sre.EnrichMathml.combineContentChildren_(
      semantic, newContent, newChildren);
  newNode = semantic.mathmlTree;
  if (newNode === null) {
    sre.Debugger.getInstance().output('Walktree Case 1');
    newNode = sre.EnrichMathml.introduceNewLayer(childrenList);
  } else {
    var attached = sre.EnrichMathml.attachedElement_(childrenList);
    sre.Debugger.getInstance().output('Walktree Case 2');
    if (attached) {
      sre.Debugger.getInstance().output('Walktree Case 2.1');
      newNode = /**@type{!Element}*/(attached.parentNode);
    } else {
      sre.Debugger.getInstance().output('Walktree Case 2.2');
      newNode = sre.EnrichMathml.getInnerNode(newNode);
    }
  }
  newNode = sre.EnrichMathml.rewriteMfenced(newNode);
  sre.EnrichMathml.mergeChildren_(newNode, childrenList);
  sre.EnrichMathml.setAttributes(newNode, semantic);
  return sre.EnrichMathml.ascendNewNode(newNode);
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
 */
sre.EnrichMathml.introduceNewLayer = function(children) {
  var newNodeInfo = sre.EnrichMathml.mathmlLca_(children);
  var newNode = newNodeInfo.node;
  if (!newNodeInfo.valid || !sre.SemanticUtil.hasEmptyTag(newNode)) {
    sre.Debugger.getInstance().output('Walktree Case 1.1');
    newNode = sre.DomUtil.createElement('mrow');
    if (children[0]) {
      sre.Debugger.getInstance().output('Walktree Case 1.1.1');
      var node = sre.EnrichMathml.attachedElement_(children);
      var oldChildren = sre.EnrichMathml.childrenSubset_(
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
 * @param {!Array.<Element>} newChildren The list of new children.
 * @return {!Array.<Element>} The minimal subset.
 * @private
 */
sre.EnrichMathml.childrenSubset_ = function(node, newChildren) {
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
 * @param {!Array.<Element>} newChildren The list of children to be merged.
 * @private
 */
sre.EnrichMathml.mergeChildren_ = function(node, newChildren) {
  var oldChildren = /**@type{!NodeList.<Element>}*/ (node.childNodes);
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
        sre.EnrichMathml.functionApplication_(
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
sre.EnrichMathml.functionApplication_ = function(oldNode, newNode) {
  var appl = sre.SemanticAttr.functionApplication();
  if (oldNode && newNode && oldNode.textContent && newNode.textContent &&
      oldNode.textContent === appl && newNode.textContent === appl &&
      newNode.getAttribute(sre.EnrichMathml.Attribute.ADDED) === 'true') {
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
sre.EnrichMathml.mathmlLca_ = function(children) {
  // Need to avoid newly created children (invisible operators).
  var leftMost = sre.EnrichMathml.attachedElement_(children);
  if (!leftMost) {
    return {valid: false, node: null};
  }
  var rightMost = /**@type{!Element}*/(sre.EnrichMathml.attachedElement_(
      children.slice().reverse()));
  if (leftMost === rightMost) {
    return {valid: true,
      node: leftMost};
  }
  var leftPath = sre.EnrichMathml.pathToRoot_(leftMost);
  var rightPath = sre.EnrichMathml.pathToRoot_(
      rightMost, function(x) {return leftPath.indexOf(x) !== -1;});
  var lca = rightPath[0];
  var lIndex = leftPath.indexOf(lca);
  if (lIndex === -1) {
    return {valid: false, node: null};
  }
  return {valid:
        sre.EnrichMathml.validLca_(leftPath[lIndex + 1], rightPath[1]),
    node: lca};
};


/**
 * Finds the first elements in a list of nodes that has a parent pointer.
 * @param {!Array.<Element>} nodes A list of elements.
 * @return {Element} The first element node with a parent pointer if it exists.
 * @private
 */
sre.EnrichMathml.attachedElement_ = function(nodes) {
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
 * @typedef {function(!Element): boolean}
 * @private
 */
sre.EnrichMathml.ElementTest_;


/**
 * Computes the path from a node in the MathML tree to the root or until the
 * optional test fires.
 * @param {!Element} node The tree node from where to start.
 * @param {sre.EnrichMathml.ElementTest_=} opt_test The optional test that
 *     stops path computation if it fires.
 * @return {!Array.<!Element>} Path from root to node. That is, node is the last
 *     element in the array and array contains at least the original node.
 * @private
 */
sre.EnrichMathml.pathToRoot_ = function(node, opt_test) {
  var test = opt_test || function(x) {return false;};
  var path = [node];
  while (!test(node) && !sre.SemanticUtil.hasMathTag(node) && node.parentNode) {
    node = sre.EnrichMathml.parentNode_(node);
    path.unshift(node);
  }
  return path;
};


/**
 * Checks if a LCA of two nodes is valid. It takes the penultimate node in the
 * paths of the original nodes to the LCA and sees if they have no siblings.  In
 * case they have siblings, we can not simply replace the LCA with the node
 * comprising the children.
 * @param {Element} left Left path element.
 * @param {Element} right Right path element.
 * @return {boolean} True if valid LCA. False if either left or right empty or
 *     there exist siblings further to the left or right.
 * @private
 */
sre.EnrichMathml.validLca_ = function(left, right) {
  // TODO (sorge) Here we have to account for ignored tags.
  return !!(left && right && !left.previousSibling && !right.nextSibling);
};


/**
 * Computes the empty layout node that is the highest parent of the given node
 * and that only has one child.
 * @param {!Element} newNode The node currently under consideration.
 * @return {!Element} The parent node.
 */
sre.EnrichMathml.ascendNewNode = function(newNode) {
  while (!sre.SemanticUtil.hasMathTag(newNode) &&
         sre.EnrichMathml.unitChild_(newNode)) {
    newNode = sre.EnrichMathml.parentNode_(newNode);
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
sre.EnrichMathml.unitChild_ = function(node) {
  var parent = sre.EnrichMathml.parentNode_(node);
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
sre.EnrichMathml.parentNode_ = function(element) {
  return /**@type{!Element}*/(element.parentNode);
};


// TODO (sorge) Refactor collapsed structures into a dedicated class.
/**
 * Type annotation for arrays representing collapsed node structures.
 * @typedef {number|Array.<sre.EnrichMathml.Collapsed_>}
 * @private
 */
sre.EnrichMathml.Collapsed_;


/**
 * Checks if the structure is simple, i.e., a single id number.
 * @param {sre.EnrichMathml.Collapsed_} strct The structure.
 * @return {boolean} True if a simple number.
 */
sre.EnrichMathml.simpleCollapseStructure = function(strct) {
  return (typeof strct === 'number');
};


/**
 * Interleaves the ids of two index lists.
 * @param {!sre.EnrichMathml.Collapsed_} first A structured list of
 *     ids.
 * @param {!sre.EnrichMathml.Collapsed_} second A structured list of
 *     ids.
 * @return {!sre.EnrichMathml.Collapsed_} A simple list of ids.
 */
sre.EnrichMathml.interleaveIds = function(first, second) {
  return sre.BaseUtil.interleaveLists(
      sre.EnrichMathml.collapsedLeafs(first),
      sre.EnrichMathml.collapsedLeafs(second));
};


/**
 * Returns a list of the leaf ids for the given collapsed structures.
 * @param {...sre.EnrichMathml.Collapsed_} var_args The collapsed structure
 *     annotations.
 * @return {!Array.<number>} The leafs of the structure annotations.
 */
sre.EnrichMathml.collapsedLeafs = function(var_args) {
  var collapseStructure = function(coll) {
    if (sre.EnrichMathml.simpleCollapseStructure(coll)) {
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
 * @param {!sre.EnrichMathml.Collapsed_} collapsed The collapsed structure
 *    annotations.
 */
sre.EnrichMathml.addCollapsedAttribute = function(node, collapsed) {
  /**
   * @param {!sre.EnrichMathml.Collapsed_} struct Collapse structure.
   * @return {!string} The structure as string.
   */
  var collapseString = function(struct) {
    if (sre.EnrichMathml.simpleCollapseStructure(struct)) {
      return struct.toString();
    }
    return '(' + struct.map(collapseString).join(' ') + ')';
  };
  node.setAttribute(sre.EnrichMathml.Attribute.COLLAPSED,
                    collapseString(collapsed));
};


/**
 * Clones a content node.
 * @param {!sre.SemanticTree.Node} content The content node.
 * @return {!Element} The corresponding MathML node.
 */
sre.EnrichMathml.cloneContentNode = function(content) {
  if (content.mathml.length) {
    return sre.EnrichMathml.walkTree(content);
  }
  var clone = sre.EnrichMathml.SETTINGS.implicit ?
      sre.EnrichMathml.createInvisibleOperator_(content) :
      sre.DomUtil.createElement('mrow');
  content.mathml = [clone];
  return clone;
};


/**
 * Concatenates node ids into a comma separated lists.
 * @param {!Array.<!sre.SemanticTree.Node>} nodes The list of nodes.
 * @return {!string} The comma separated lists.
 */
sre.EnrichMathml.makeIdList = function(nodes) {
  return nodes.map(function(node) {
    return node.id;
  }).join(',');
};


/**
 * Sets semantic attributes in a MathML node.
 * @param {!Element} mml The MathML node.
 * @param {!sre.SemanticTree.Node} semantic The semantic tree node.
 */
sre.EnrichMathml.setAttributes = function(mml, semantic) {
  mml.setAttribute(sre.EnrichMathml.Attribute.TYPE, semantic.type);
  mml.setAttribute(sre.EnrichMathml.Attribute.ROLE, semantic.role);
  if (semantic.font != sre.SemanticAttr.Font.UNKNOWN) {
    mml.setAttribute(sre.EnrichMathml.Attribute.FONT, semantic.font);
  }
  mml.setAttribute(sre.EnrichMathml.Attribute.ID, semantic.id);
  if (semantic.childNodes.length) {
    mml.setAttribute(sre.EnrichMathml.Attribute.CHILDREN,
                     sre.EnrichMathml.makeIdList(semantic.childNodes));
  }
  if (semantic.contentNodes.length) {
    mml.setAttribute(sre.EnrichMathml.Attribute.CONTENT,
                     sre.EnrichMathml.makeIdList(semantic.contentNodes));
  }
  if (semantic.parent) {
    mml.setAttribute(sre.EnrichMathml.Attribute.PARENT, semantic.parent.id);
  }
  if (semantic.embellished) {
    mml.setAttribute(sre.EnrichMathml.Attribute.EMBELLISHED,
                     semantic.embellished);
  }
  if (semantic.fencePointer) {
    mml.setAttribute(sre.EnrichMathml.Attribute.FENCEPOINTER,
                     semantic.fencePointer);
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
sre.EnrichMathml.combineContentChildren_ = function(
    semantic, content, children) {
  sre.EnrichMathml.setOperatorAttribute_(semantic, content);
  switch (semantic.type) {
    case sre.SemanticAttr.Type.RELSEQ:
    case sre.SemanticAttr.Type.INFIXOP:
    case sre.SemanticAttr.Type.MULTIREL:
      return sre.BaseUtil.interleaveLists(children, content);
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
        return sre.BaseUtil.interleaveLists(children, content);
      }
      var markupList = [];
      for (var i = 0, j = 0, child, cont;
           child = children[i], cont = content[j]; i++) {
        if (child.getAttribute(sre.EnrichMathml.Attribute.ID) ==
            cont.getAttribute(sre.EnrichMathml.Attribute.ID)) {
          j++;
          markupList.push(child);
        }
      }
      sre.EnrichMathml.setOperatorAttribute_(semantic, markupList);
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
 */
sre.EnrichMathml.rewriteMfenced = function(mml) {
  if (sre.SemanticUtil.tagName(mml) !== 'MFENCED') {
    return mml;
  }
  var newNode = sre.DomUtil.createElement('mrow');
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
sre.EnrichMathml.createInvisibleOperator_ = function(operator) {
  var moNode = sre.DomUtil.createElement('mo');
  var text = sre.DomUtil.createTextNode(operator.textContent);
  moNode.appendChild(text);
  sre.EnrichMathml.setAttributes(moNode, operator);
  moNode.setAttribute(sre.EnrichMathml.Attribute.ADDED, 'true');
  return moNode;
};


/**
 * Adds a relevant operator attribute to the a list of content nodes.
 * @param {!sre.SemanticTree.Node} semantic The semantic tree node.
 * @param {!Array.<!Element>} content The list of content nodes.
 * @private
 */
sre.EnrichMathml.setOperatorAttribute_ = function(semantic, content) {
  var operator = semantic.type +
          (semantic.textContent ? ',' + semantic.textContent : '');
  content.forEach(function(c) {
    (sre.EnrichMathml.getInnerNode(c)).setAttribute(
        sre.EnrichMathml.Attribute.OPERATOR, operator);});
};


/**
 * Recursively computes the innermost element node. That is for an element it
 * descends empty tags like mrow, ignoring ignore tags like merror, etc. as long
 * as there is a single non-trivial node. Returns the non-trivial node lowest in
 * the tree.
 * @param {!Element} node The MathML element to process.
 * @return {!Element} The innermost element node, which can be the original node
 *     itself.
 */
sre.EnrichMathml.getInnerNode = function(node) {
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
      var nextInner = sre.EnrichMathml.getInnerNode(remain);
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
 * Creates formatted output  for MathML and semantic tree expression.
 * REMARK: Helper function.
 * @param {!Element} mml The original MathML expression.
 * @param {!Element} expr The enriched MathML expression.
 * @param {!sre.SemanticTree} tree The semantic tree.
 * @param {boolean=} opt_wiki Flag to specify wiki output.
 */
sre.EnrichMathml.formattedOutput = function(mml, expr, tree, opt_wiki) {
  var wiki = opt_wiki || false;
  sre.EnrichMathml.formattedOutput_(mml, 'Original MathML', wiki);
  sre.EnrichMathml.formattedOutput_(tree, 'Semantic Tree', wiki);
  sre.EnrichMathml.formattedOutput_(expr, 'Semantically enriched MathML',
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
sre.EnrichMathml.formattedOutput_ = function(element, name, wiki) {
  var output = sre.DomUtil.formatXml(element.toString());
  if (!wiki) {
    console.log(output);
    return;
  }
  console.log(name + ':\n```html\n' +
              sre.EnrichMathml.removeAttributePrefix(output) + '\n```\n');
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
sre.EnrichMathml.removeAttributePrefix = function(mml) {
  return mml.toString().replace(
      new RegExp(sre.EnrichMathml.ATTRIBUTE_PREFIX_, 'g'), '');
};


/**
 * Prints a list of nodes.
 * @param {string} title A string to print first.
 * @param {!NodeList} nodes A list of nodes.
 */
sre.EnrichMathml.printNodeList__ = function(title, nodes) {
  console.log(title);
  sre.DomUtil.toArray(nodes).forEach(function(x) {console.log(x.toString());});
  console.log('<<<<<<<<<<<<<<<<<');
};

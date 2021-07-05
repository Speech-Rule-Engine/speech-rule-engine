//
// Copyright 2015-21 Volker Sorge
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

import {Debugger} from '../common/debugger';
import * as DomUtil from '../common/dom_util';
import {Engine} from '../common/engine';
import {SemanticAttr, SemanticRole, SemanticType} from '../semantic_tree/semantic_attr';
import {SemanticHeuristics} from '../semantic_tree/semantic_heuristics';
import {SemanticNode} from '../semantic_tree/semantic_node';
import {SemanticSkeleton, Sexp} from '../semantic_tree/semantic_skeleton';
import {SemanticTree} from '../semantic_tree/semantic_tree';
import * as SemanticUtil from '../semantic_tree/semantic_util';

import EnrichCaseFactory from './enrich_case_factory';


/**
 * Object containing settings for the semantic enrichment.
 */
export const SETTINGS: {collapsed: boolean, implicit: boolean} = {
  collapsed: true,
  implicit: true
};


/**
 * Prefix for semantic attributes.
 */
export const ATTRIBUTE_PREFIX_: string = 'data-semantic-';


// TODO (TS): Do something about the prefix computation.
/**
 * Mapping for attributes used in semantic enrichment.
 */
export enum Attribute {
  ADDED = 'data-semantic-added',
  ALTERNATIVE = 'data-semantic-alternative',
  CHILDREN = 'data-semantic-children',
  COLLAPSED = 'data-semantic-collapsed',
  CONTENT = 'data-semantic-content',
  EMBELLISHED = 'data-semantic-embellished',
  FENCEPOINTER = 'data-semantic-fencepointer',
  FONT = 'data-semantic-font',
  ID = 'data-semantic-id',
  ANNOTATION = 'data-semantic-annotation',
  OPERATOR = 'data-semantic-operator',
  OWNS = 'data-semantic-owns',
  PARENT = 'data-semantic-parent',
  POSTFIX = 'data-semantic-postfix',
  PREFIX = 'data-semantic-prefix',
  ROLE = 'data-semantic-role',
  SPEECH = 'data-semantic-speech',
  STRUCTURE = 'data-semantic-structure',
  TYPE = 'data-semantic-type'
}

export const EnrichAttributes: string[] = [
  Attribute.ADDED,
  Attribute.ALTERNATIVE,
  Attribute.CHILDREN,
  Attribute.COLLAPSED,
  Attribute.CONTENT,
  Attribute.EMBELLISHED,
  Attribute.FENCEPOINTER,
  Attribute.FONT,
  Attribute.ID,
  Attribute.ANNOTATION,
  Attribute.OPERATOR,
  Attribute.OWNS,
  Attribute.PARENT,
  Attribute.POSTFIX,
  Attribute.PREFIX,
  Attribute.ROLE,
  Attribute.SPEECH,
  Attribute.STRUCTURE,
  Attribute.TYPE
];

/**
 * Enriches a MathML element with semantics from the tree.
 *
 * NOTE: This is destructive on the MathML expression underlying the semantic
 *     tree! Make sure to copy the original, if necessary!
 * @param mml The MathML element.
 * @param semantic The semantic tree.
 * @return The modified MathML element.
 */
export function enrich(mml: Element, semantic: SemanticTree): Element {
  // The first line is only to preserve output. This should eventually be
  // deleted.
  let oldMml = mml.cloneNode(true) as Element;
  walkTree(semantic.root);
  if (Engine.getInstance().structure) {
    mml.setAttribute(
        Attribute.STRUCTURE,
        SemanticSkeleton.fromStructure(mml, semantic).toString());
  }
  Debugger.getInstance().generateOutput(function() {
    formattedOutput(oldMml, mml, semantic, true);
    return [];
  });
  return mml;
}


/**
 * Walks the semantic tree and reassembles a new semantically enriched MathML
 * expression.
 *
 * Note that the original MathML nodes are cloned!
 * @param semantic The semantic tree.
 * @return The enriched MathML element.
 */
export function walkTree(semantic: SemanticNode): Element {
  let specialCase = EnrichCaseFactory.getCase(semantic);
  let newNode: Element;
  if (specialCase) {
    newNode = specialCase.getMathml();
    return ascendNewNode(newNode);
  }
  if (semantic.mathml.length === 1) {
    Debugger.getInstance().output('Walktree Case 0');
    newNode = (semantic.mathml[0] as Element);
    setAttributes(newNode, semantic);
    if (semantic.childNodes.length) {
      // These children should all be empty.
      Debugger.getInstance().output('Walktree Case 0.1');
      semantic.childNodes.forEach(function(child) {
        if (child.type === SemanticType.EMPTY) {
          newNode.appendChild(walkTree(child));
        }
      });
    }
    return ascendNewNode(newNode);
  }

  let newContent = semantic.contentNodes.map(cloneContentNode);
  setOperatorAttribute_(semantic, newContent);
  let newChildren = semantic.childNodes.map(walkTree);
  let childrenList = SemanticSkeleton.combineContentChildren<Element>(
      semantic, newContent, newChildren);
  newNode = semantic.mathmlTree;
  if (newNode === null) {
    Debugger.getInstance().output('Walktree Case 1');
    newNode = introduceNewLayer(childrenList, semantic);
  } else {
    let attached = attachedElement_(childrenList);
    Debugger.getInstance().output('Walktree Case 2');
    if (attached) {
      Debugger.getInstance().output('Walktree Case 2.1');
      newNode = (attached.parentNode as Element);
    } else {
      Debugger.getInstance().output('Walktree Case 2.2');
      newNode = getInnerNode(newNode);
    }
  }
  newNode = rewriteMfenced(newNode);
  mergeChildren_(newNode, childrenList, semantic);
  setAttributes(newNode, semantic);
  return ascendNewNode(newNode);
}


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
 * @param children The list of children of the MathML
 *     element.
 * @param semantic The semantic node for which a new layer
 *     is introduced.
 * @return The node containing the children.
 */
export function introduceNewLayer(
    children: Element[], semantic: SemanticNode): Element {
  let lca = mathmlLca_(children);
  let newNode = lca.node;
  let info = lca.type;
  if (info !== lcaType.VALID || !SemanticUtil.hasEmptyTag(newNode)) {
    Debugger.getInstance().output('Walktree Case 1.1');
    newNode = DomUtil.createElement('mrow');
    if (info === lcaType.PRUNED) {
      Debugger.getInstance().output('Walktree Case 1.1.0');
      newNode =
          introduceLayerAboveLca(newNode, (lca.node as Element), children);
    } else if (children[0]) {
      Debugger.getInstance().output('Walktree Case 1.1.1');
      let node = attachedElement_(children);
      let oldChildren = childrenSubset_((node.parentNode as Element), children);
      DomUtil.replaceNode(node, newNode);
      oldChildren.forEach(function(x) {
        newNode.appendChild(x);
      });
    }
  }
  if (!semantic.mathmlTree) {
    semantic.mathmlTree = newNode;
  }
  return (newNode as Element);
}


/**
 * Introduces a new layer above an LCA, in case the path to root was pruned due
 * to LCA being an actual inner child node.
 * Possibly rewrites the root node (math tag) in case it is the lca.
 * @param mrow The empty mrow node for the new layer.
 * @param lca The actual lca.
 * @param children The children that contain the lca.
 * @return The new introduced mrow node, or possibly the math node.
 */
export function introduceLayerAboveLca(
    mrow: Element, lca: Element, children: Element[]): Element {
  let innerNode = descendNode_(lca);
  // Case if lca is actually the MathML root node.
  if (SemanticUtil.hasMathTag(innerNode)) {
    Debugger.getInstance().output('Walktree Case 1.1.0.0');
    moveSemanticAttributes_(innerNode, mrow);
    DomUtil.toArray(innerNode.childNodes).forEach(function(x) {
      mrow.appendChild(x);
    });
    let auxNode = mrow;
    mrow = innerNode;
    innerNode = auxNode;
  }
  let index = children.indexOf(lca);
  children[index] = innerNode;
  DomUtil.replaceNode(innerNode, mrow);
  mrow.appendChild(innerNode);
  children.forEach(function(x) {
    mrow.appendChild(x);
  });
  return mrow;
}


/**
 * Moves semantic attributes from one node to another.
 * @param oldNode The node whose semantic attributes are removed.
 * @param newNode The node which receives the semantic attributes.
 */
export function moveSemanticAttributes_(oldNode: Element, newNode: Element) {
  for (let attr of EnrichAttributes) {
    if (oldNode.hasAttribute(attr)) {
      newNode.setAttribute(attr, oldNode.getAttribute(attr));
      oldNode.removeAttribute(attr);
    }
  }
}


/**
 * Retrieves a minimal subset of children of the node that contain all the nodes
 * in the newChildren list. If there are elements in newChildren not in the
 * children of node, these are ignored.
 * @param node The node whose children are picked.
 * @param newChildren The list of new children.
 * @return The minimal subset.
 */
export function childrenSubset_(
    node: Element, newChildren: Element[]): Element[] {
  let oldChildren = DomUtil.toArray(node.childNodes);
  let leftIndex = +Infinity;
  let rightIndex = -Infinity;
  newChildren.forEach(function(child) {
    let index = oldChildren.indexOf(child);
    if (index !== -1) {
      leftIndex = Math.min(leftIndex, index);
      rightIndex = Math.max(rightIndex, index);
    }
  });
  return oldChildren.slice(leftIndex, rightIndex + 1);
}


/**
 * Collates the childnodes in the light of potential contractions of the combine
 * juxtaposition heuristic. This extends the list of know children by those
 * deeper in the tree.
 * @param node The node whose children are picked.
 * @param children The current list of children to be merged.
 * @param semantic The semantic node.
 * @return The collated list of children to be merged.
 */
export function collateChildNodes_(
    node: Element, children: Element[], semantic: SemanticNode): Element[] {
  let oldChildren = [];
  let newChildren = DomUtil.toArray(node.childNodes);
  let notFirst = false;
  while (newChildren.length) {
    let child = newChildren.shift();
    if (child.hasAttribute(Attribute.TYPE)) {
      oldChildren.push(child);
      continue;
    }
    let collect = collectChildNodes_(child);
    if (collect.length === 0) {
      continue;
    }
    if (collect.length === 1) {
      oldChildren.push(child);
      continue;
    }
    if (notFirst) {
      child.setAttribute('AuxiliaryImplicit', true);
    } else {
      notFirst = true;
    }
    newChildren = collect.concat(newChildren);
  }
  // If there is a trailing row with further factors.
  let rear = [];
  let semChildren = semantic.childNodes.map(function(x) {
    return x.mathmlTree;
  });
  while (semChildren.length) {
    let schild = semChildren.pop();
    if (!schild) {
      continue;
    }
    if (oldChildren.indexOf(schild) !== -1) {
      break;
    }
    if (children.indexOf(schild) !== -1) {
      rear.unshift(schild);
    }
  }
  return oldChildren.concat(rear);
}


/**
 * Collects child nodes that belong to a juxtaposition tree, but that are
 * embedded deeper in the tree. The algorithm descends through nodes that are
 * not semantically enriched.
 * @param node The top level node.
 * @return The lower level children.
 */
export function collectChildNodes_(node: Element): Element[] {
  let collect = [];
  let newChildren = DomUtil.toArray(node.childNodes);
  while (newChildren.length) {
    let child = newChildren.shift();
    if (child.nodeType !== DomUtil.NodeType.ELEMENT_NODE) {
      continue;
    }
    if (child.hasAttribute(Attribute.TYPE)) {
      collect.push(child);
      continue;
    }
    newChildren = DomUtil.toArray(child.childNodes).concat(newChildren);
  }
  return collect;
}


/**
 * Merges a list of new children with the children of the given node.
 * @param node The node whose children are merged.
 * @param newChildren The list of children to be merged.
 * @param semantic The semantic node whose children are
 *     merged.
 */
export function mergeChildren_(
    node: Element, newChildren: Element[], semantic: SemanticNode) {
  let oldChildren = semantic.role === SemanticRole.IMPLICIT &&
          SemanticHeuristics.flags.combine_juxtaposition ?
      collateChildNodes_(node, newChildren, semantic) :
      DomUtil.toArray(node.childNodes);
  if (!oldChildren.length) {
    newChildren.forEach(function(x) {
      node.appendChild(x);
    });
    return;
  }
  let oldCounter = 0;
  while (newChildren.length) {
    let newChild = (newChildren[0] as Element);
    if (oldChildren[oldCounter] === newChild ||
        functionApplication_(oldChildren[oldCounter], newChild)) {
      // newChild same as oldChild. Advance both.
      newChildren.shift();
      oldCounter++;
      continue;
    }
    if (oldChildren[oldCounter] &&
        newChildren.indexOf(oldChildren[oldCounter]) === -1) {
      // oldChild not related to the current semantic node is skipped.
      oldCounter++;
      continue;
    }
    if (isDescendant_(newChild, node)) {
      // newChild is an existing descendant of the node, i.e., somewhere beneath
      // but not contained in oldChildren. No need to rearrange.
      newChildren.shift();
      continue;
    }
    // newChild is indeed new and needs to be added.
    insertNewChild_(node, oldChildren[oldCounter], newChild);
    newChildren.shift();
  }
}


/**
 * Inserts a new child into the mml tree at the right position.
 * @param node The parent node.
 * @param oldChild The reference where newChild is inserted.
 * @param newChild The new child to be inserted.
 */
export function insertNewChild_(
    node: Element, oldChild: Element, newChild: Element) {
  if (!oldChild) {
    node.insertBefore(newChild, null);
    return;
  }
  let parent = oldChild;
  let next = parentNode_(parent);
  while (next && next.firstChild === parent &&
         !parent.hasAttribute('AuxiliaryImplicit') && next !== node) {
    parent = next;
    next = parentNode_(parent);
  }
  if (next) {
    next.insertBefore(newChild, parent);
    parent.removeAttribute('AuxiliaryImplicit');
  }
}


/**
 * Checks if one node is a proper descendant of another.
 * @param child The potential descendant node.
 * @param node The potential ancestor node.
 * @return True if child is a descendant of node.
 */
export function isDescendant_(child: Node, node: Node): boolean {
  if (!child) {
    return false;
  }
  do {
    child = child.parentNode;
    if (child === node) {
      return true;
    }
  } while (child);
  return false;
}


/**
 * Checks if both old and new Node are invisible function applications and if
 * the new node has been explicitly added. If true it replaces the old for the
 * new node destructively.
 * @param oldNode The old node.
 * @param newNode The new, possibly added node.
 * @return True if condition holds.
 */
export function functionApplication_(
    oldNode: Element, newNode: Element): boolean {
  let appl = SemanticAttr.functionApplication();
  if (oldNode && newNode && oldNode.textContent && newNode.textContent &&
      oldNode.textContent === appl && newNode.textContent === appl &&
      newNode.getAttribute(Attribute.ADDED) === 'true') {
    for (let i = 0, attr; attr = oldNode.attributes[i]; i++) {
      if (!newNode.hasAttribute(attr.nodeName)) {
        newNode.setAttribute(attr.nodeName, attr.nodeValue);
      }
    }
    DomUtil.replaceNode(oldNode, newNode);
    return true;
  }
  return false;
}


export enum lcaType {
  VALID = 'valid',
  INVALID = 'invalid',
  PRUNED = 'pruned'
}


/**
 * Finds the least common ancestor for a list of MathML nodes in the MathML
 * expression.
 * @param children A list of MathML nodes.
 * @return Structure indicating if the node representing the LCA is valid and
 *     the least common ancestor if it exits.
 */
export function mathmlLca_(children: Element[]):
    {type: lcaType, node: Element} {
  // Need to avoid newly created children (invisible operators).
  let leftMost = attachedElement_(children);
  if (!leftMost) {
    return {type: lcaType.INVALID, node: null};
  }
  let rightMost = (attachedElement_(children.slice().reverse()) as Element);
  if (leftMost === rightMost) {
    return {type: lcaType.VALID, node: leftMost};
  }
  let leftPath = pathToRoot_(leftMost);
  let newLeftPath = prunePath_(leftPath, children);
  let rightPath = pathToRoot_(rightMost, function(x) {
    return newLeftPath.indexOf(x) !== -1;
  });
  let lca = rightPath[0];
  let lIndex = newLeftPath.indexOf(lca);
  if (lIndex === -1) {
    return {type: lcaType.INVALID, node: null};
  }
  return {
    type: newLeftPath.length !== leftPath.length ?
        lcaType.PRUNED :
        validLca_(newLeftPath[lIndex + 1], rightPath[1]) ? lcaType.VALID :
                                                           lcaType.INVALID,
    node: lca
  };
}


/**
 * Prunes a path from a child element to the root node (where the root node is
 * first in the list), if the LCA is actually an member of the children list.
 * It then returns the shortend path, from the root element to the potential
 * LCA.
 * @return The pruned path.
 */
export function prunePath_(path: Element[], children: Element[]): Element[] {
  let i = 0;
  while (path[i] && children.indexOf(path[i]) === -1) {
    i++;
  }
  return path.slice(0, i + 1);
}


/**
 * Finds the first elements in a list of nodes that has a parent pointer.
 * @param nodes A list of elements.
 * @return The first element node with a parent pointer if it exists.
 */
export function attachedElement_(nodes: Element[]): Element {
  let count = 0;
  let attached = null;
  while (!attached && count < nodes.length) {
    if (nodes[count].parentNode) {
      attached = nodes[count];
    }
    count++;
  }
  return attached;
}


/**
 * Computes the path from a node in the MathML tree to the root or until the
 * optional test fires.
 * @param node The tree node from where to start.
 * @param opt_test The optional test that
 *     stops path computation if it fires.
 * @return Path from root to node. That is, node is the last
 *     element in the array and array contains at least the original node.
 */
export function pathToRoot_(
    node: Element, opt_test?: (p1: Element) => boolean): Element[] {
  let test = opt_test || ((_x) => false);
  let path = [node];
  while (!test(node) && !SemanticUtil.hasMathTag(node) && node.parentNode) {
    node = parentNode_(node);
    path.unshift(node);
  }
  return path;
}


/**
 * Checks if a LCA of two nodes is valid. It takes the penultimate node in the
 * paths of the original nodes to the LCA and sees if they have no siblings.  In
 * case they have siblings, we can not simply replace the LCA with the node
 * comprising the children.
 * @param left Left path element.
 * @param right Right path element.
 * @return True if valid LCA. False if either left or right empty or
 *     there exist siblings further to the left or right.
 */
export function validLca_(left: Element, right: Element): boolean {
  // TODO (sorge) Here we have to account for ignored tags.
  return !!(left && right && !left.previousSibling && !right.nextSibling);
}


/**
 * Computes the empty layout node that is the highest parent of the given node
 * and that only has one child.
 * @param newNode The node currently under consideration.
 * @return The parent node.
 */
export function ascendNewNode(newNode: Element): Element {
  while (!SemanticUtil.hasMathTag(newNode) && unitChild_(newNode)) {
    newNode = parentNode_(newNode);
  }
  return newNode;
}


/**
 * Descends a node as long as it only contains single empty tags, that do not
 * have semantic annotations already, while ignoring tags like merror, etc.
 * @param node The node from which to descend.
 * @return The inner most node with empty tag without semantic
 *    annotations.
 */
export function descendNode_(node: Element): Element {
  let children = DomUtil.toArray(node.childNodes);
  if (!children) {
    return node;
  }
  let remainder = children.filter(function(child) {
    return child.nodeType === DomUtil.NodeType.ELEMENT_NODE &&
        !SemanticUtil.hasIgnoreTag(child);
  });
  if (remainder.length === 1 && SemanticUtil.hasEmptyTag(remainder[0]) &&
      !remainder[0].hasAttribute(Attribute.TYPE)) {
    return descendNode_(remainder[0]);
  }
  return node;
}


/**
 * Checks if the node is a unit child, annotation it is the only child of its
 * parent modulo ignored nodes.
 * @param node The node to be tested.
 * @return True if node is a legal unit child.
 */
export function unitChild_(node: Element): boolean {
  let parent = parentNode_(node);
  if (!parent || !SemanticUtil.hasEmptyTag(parent)) {
    return false;
  }
  return DomUtil.toArray(parent.childNodes).every(function(child) {
    return child === node || isIgnorable_(child);
  });
}


/**
 * Checks recursively if the node is an element that can be ignored, i.e., only
 * has empty and ignored tags.
 * @param node The node to be tested.
 * @return True if the node is ignorable.
 */
export function isIgnorable_(node: Element): boolean {
  if (node.nodeType !== DomUtil.NodeType.ELEMENT_NODE) {
    return true;
  }
  if (!node || SemanticUtil.hasIgnoreTag(node)) {
    return true;
  }
  let children = DomUtil.toArray(node.childNodes);
  if (!SemanticUtil.hasEmptyTag(node) && children.length ||
      SemanticUtil.hasDisplayTag(node) || node.hasAttribute(Attribute.TYPE) ||
      SemanticUtil.isOrphanedGlyph(node)) {
    return false;
  }
  return DomUtil.toArray(node.childNodes).every(isIgnorable_);
}


/**
 * Returns the parent node of the element in the correct type.
 * @param element The parent of the element.
 * @return Parent element.
 */
export function parentNode_(element: Element): Element {
  return (element.parentNode as Element);
}


/**
 * Adds a collapsed attribute to the given node, according to the collapsed
 * structure.
 * @param node The MathML node.
 * @param collapsed The collapsed structure
 *    annotations.
 */
export function addCollapsedAttribute(node: Element, collapsed: Sexp) {
  let skeleton = new SemanticSkeleton(collapsed);
  node.setAttribute(Attribute.COLLAPSED, skeleton.toString());
}


/**
 * Clones a content node.
 * @param content The content node.
 * @return The corresponding MathML node.
 */
export function cloneContentNode(content: SemanticNode): Element {
  if (content.mathml.length) {
    return walkTree(content);
  }
  let clone = SETTINGS.implicit ? createInvisibleOperator_(content) :
                                  DomUtil.createElement('mrow');
  content.mathml = [clone];
  return clone;
}


/**
 * Concatenates node ids into a comma separated lists.
 * @param nodes The list of nodes.
 * @return The comma separated lists.
 */
export function makeIdList(nodes: SemanticNode[]): string {
  return nodes
      .map(function(node) {
        return node.id;
      })
      .join(',');
}


/**
 * Sets semantic attributes in a MathML node.
 * @param mml The MathML node.
 * @param semantic The semantic tree node.
 */
export function setAttributes(mml: Element, semantic: SemanticNode) {
  mml.setAttribute(Attribute.TYPE, semantic.type);
  let attributes = semantic.allAttributes();
  for (let i = 0, attr; attr = attributes[i]; i++) {
    mml.setAttribute(ATTRIBUTE_PREFIX_ + attr[0].toLowerCase(), attr[1]);
  }
  if (semantic.childNodes.length) {
    mml.setAttribute(Attribute.CHILDREN, makeIdList(semantic.childNodes));
  }
  if (semantic.contentNodes.length) {
    mml.setAttribute(Attribute.CONTENT, makeIdList(semantic.contentNodes));
  }
  if (semantic.parent) {
    mml.setAttribute(Attribute.PARENT, semantic.parent.id.toString());
  }
  setPostfix(mml, semantic);
}


/**
 * Sets postfix attributes to surface properties via suffixes. Examples: link,
 * image, etc.
 * @param mml The MathML node.
 * @param semantic The semantic tree node.
 */
export function setPostfix(mml: Element, semantic: SemanticNode) {
  let postfix = [];
  if (semantic.role === SemanticRole.MGLYPH) {
    postfix.push('image');
  }
  if (semantic.attributes['href']) {
    postfix.push('link');
  }
  if (postfix.length) {
    mml.setAttribute(Attribute.POSTFIX, postfix.join(' '));
  }
}


/**
 * Rewrites an mfenced node to an mrow node.
 * @param mml The MathML node.
 * @return The rewritten element.
 */
export function rewriteMfenced(mml: Element): Element {
  if (DomUtil.tagName(mml) !== 'MFENCED') {
    return mml;
  }
  let newNode = DomUtil.createElement('mrow');
  for (let i = 0, attr; attr = mml.attributes[i]; i++) {
    if (['open', 'close', 'separators'].indexOf(attr.name) === -1) {
      newNode.setAttribute(attr.name, attr.value);
    }
  }
  DomUtil.toArray(mml.childNodes).forEach(function(x) {
    newNode.appendChild(x);
  });
  DomUtil.replaceNode(mml, newNode);
  return newNode;
}


/**
 * Makes a new MathML element for an invisible operator or one added
 * by mfenced.
 * @param operator The semantic node with the operator.
 * @return The newly created MathML element.
 */
export function createInvisibleOperator_(operator: SemanticNode): Element {
  let moNode = DomUtil.createElement('mo');
  let text = DomUtil.createTextNode(operator.textContent);
  moNode.appendChild(text);
  setAttributes(moNode, operator);
  moNode.setAttribute(Attribute.ADDED, 'true');
  return moNode;
}


/**
 * Adds a relevant operator attribute to the a list of content nodes.
 * @param semantic The semantic tree node.
 * @param content The list of content nodes.
 */
export function setOperatorAttribute_(
    semantic: SemanticNode, content: Element[]) {
  let operator =
      semantic.type + (semantic.textContent ? ',' + semantic.textContent : '');
  content.forEach(function(c) {
    getInnerNode(c).setAttribute(Attribute.OPERATOR, operator);
  });
}


/**
 * Recursively computes the innermost element node. That is for an element it
 * descends empty tags like mrow, ignoring ignore tags like merror, etc. as long
 * as there is a single non-trivial node. Returns the non-trivial node lowest in
 * the tree.
 * @param node The MathML element to process.
 * @return The innermost element node, which can be the original node
 *     itself.
 */
export function getInnerNode(node: Element): Element {
  let children = DomUtil.toArray(node.childNodes);
  if (!children) {
    return node;
  }
  let remainder = children.filter(function(child) {
    return !isIgnorable_(child);
  });
  let result = [];
  for (let i = 0, remain; remain = remainder[i]; i++) {
    if (SemanticUtil.hasEmptyTag(remain)) {
      let nextInner = getInnerNode(remain);
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
}


/**
 * Creates formatted output  for MathML and semantic tree expression.
 * REMARK: Helper function.
 * @param mml The original MathML expression.
 * @param expr The enriched MathML expression.
 * @param tree The semantic tree.
 * @param opt_wiki Flag to specify wiki output.
 */
export function formattedOutput(
    mml: Element, expr: Element, tree: SemanticTree, opt_wiki?: boolean) {
  let wiki = opt_wiki || false;
  formattedOutput_(mml, 'Original MathML', wiki);
  formattedOutput_(tree, 'Semantic Tree', wiki);
  formattedOutput_(expr, 'Semantically enriched MathML', wiki);
}


/**
 * Prints formatted output for MathML and semantic tree expression. Depending on
 * the wiki flag it might wrap it into markup useful for GitHub wikis.
 * REMARK: Helper function.
 * @param element The original MathML expression.
 * @param name The name of the expression to be printed in the wiki.
 * @param wiki Flag to specify wiki output.
 */
export function formattedOutput_(
    element: Element|SemanticTree, name: string, wiki: boolean) {
  let output = DomUtil.formatXml(element.toString());
  if (!wiki) {
    console.info(output);
    return;
  }
  console.info(
      name + ':\n```html\n' + removeAttributePrefix(output) + '\n```\n');
}


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
 * @param mml The MathML node.
 * @return The MathML node with rewritten attributes.
 */
export function removeAttributePrefix(mml: string): string {
  return mml.toString().replace(new RegExp(ATTRIBUTE_PREFIX_, 'g'), '');
}


/**
 * Creates an data semantic attribute by adding the correct prefix.
 * @param attr The attribute.
 * @return The completed attribute.
 */
// TODO (TS): Again this should have been return time Attribute
export function addPrefix(attr: string): Attribute {
  return ATTRIBUTE_PREFIX_ + attr as Attribute;
}


/**
 * Collapses a punctuated node that only contains invisible separators.
 * @param semantic The punctuated node.
 * @param opt_children A list of children where the child
 * elements of the MathML are appended.
 * @return If the index node was a
 *     dummy punctuation, i.e. consisted of more than one index, a list of
 *     strings for the collapsed structure is returned, otherwise the node id.
 */
export function collapsePunctuated(
    semantic: SemanticNode, opt_children?: Element[]): Sexp {
  let optional = !!opt_children;
  let children = opt_children || [];
  let parent = semantic.parent;
  let contentIds = semantic.contentNodes.map(function(x) {
    return x.id;
  });
  // TODO (TS):  work out the type for Sexp properly.
  (contentIds as any).unshift('c');
  let childIds = [semantic.id, contentIds];
  for (let i = 0, child; child = semantic.childNodes[i]; i++) {
    let mmlChild = walkTree(child);
    children.push(mmlChild);
    let innerNode = getInnerNode(mmlChild);
    if (parent && !optional) {
      innerNode.setAttribute(Attribute.PARENT, parent.id.toString());
    }
    childIds.push(child.id);
  }
  return childIds;
}


/**
 * Prints a list of nodes.
 * @param title A string to print first.
 * @param nodes A list of nodes.
 */
export function printNodeList__(title: string, nodes: NodeList) {
  console.info(title);
  DomUtil.toArray(nodes).forEach(function(x) {
    console.info(x.toString());
  });
  console.info('<<<<<<<<<<<<<<<<<');
}

//
// Copyright (c) 2016-21 Volker Sorge
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

import {Attribute} from '../enrich_mathml/enrich_mathml';
import {SemanticAttr} from '../semantic_tree/semantic_attr';
import {SemanticNode} from '../semantic_tree/semantic_node';
import {SemanticNodeFactory} from '../semantic_tree/semantic_node_factory';
import {SemanticProcessor} from '../semantic_tree/semantic_processor';
import * as SemanticSkeletonExports from '../semantic_tree/semantic_skeleton';
import {SemanticSkeleton} from '../semantic_tree/semantic_skeleton';
import {SemanticTree} from '../semantic_tree/semantic_tree';

import * as WalkerUtil from './walker_util';



// Note that reassemble tree will not give you exactly the original tree, as the
// mathml nodes and mathml tree components can not be reconstructed.
/**
 * @param mathml The enriched MathML node.
 */
export class RebuildStree {
  factory: SemanticNodeFactory;

  nodeDict: {[key: string]: SemanticNode} = {};

  mmlRoot: Node;

  streeRoot: SemanticNode;

  stree: SemanticTree;

  xml: Node;
  constructor(public mathml: Element) {
    this.factory = new SemanticNodeFactory();
    this.mmlRoot = WalkerUtil.getSemanticRoot(mathml);
    this.streeRoot = this.assembleTree(this.mmlRoot);
    this.stree = SemanticTree.fromNode(this.streeRoot, this.mathml);
    this.xml = this.stree.xml();
    SemanticProcessor.getInstance().setNodeFactory(this.factory);
  }


  /**
   * @return The rebuilt semantic tree.
   */
  getTree(): SemanticTree {
    return this.stree;
  }


  /**
   * Adds external attributes if they exists. Recurses one level if we have a
   * leaf element with a none-text child.
   * @param snode The semantic node.
   * @param node The mml node.
   * @param leaf True if it is a leaf node.
   */
  static addAttributes(snode: SemanticNode, node: Node, leaf: boolean) {
    if (leaf && node.childNodes.length === 1 &&
        node.childNodes[0].nodeType !== sre.DomUtil.NodeType.TEXT_NODE) {
      sre.SemanticUtil.addAttributes(snode, node.childNodes[0]);
    }
    sre.SemanticUtil.addAttributes(snode, node);
  }


  /**
   * Assembles the semantic tree from the data attributes of the MathML node.
   * @param node The MathML node.
   * @return The corresponding semantic tree node.
   */
  assembleTree(node: Node): SemanticNode {
    let snode = this.makeNode(node);
    let children = WalkerUtil.splitAttribute(
        WalkerUtil.getAttribute(node, Attribute.CHILDREN));
    let content = WalkerUtil.splitAttribute(
        WalkerUtil.getAttribute(node, Attribute.CONTENT));
    RebuildStree.addAttributes(
        snode, node, !(children.length || content.length));
    if (content.length === 0 && children.length === 0) {
      RebuildStree.textContent(snode, node);
      return snode;
    }
    if (content.length > 0) {
      let fcontent = WalkerUtil.getBySemanticId(this.mathml, content[0]);
      if (fcontent) {
        RebuildStree.textContent(snode, fcontent, true);
      }
    }
    let setParent = function(n) {
      let mml = WalkerUtil.getBySemanticId(this.mathml, n);
      let sn = this.assembleTree(mml);
      sn.parent = snode;
      return sn;
    };
    snode.contentNodes = content.map(goog.bind(setParent, this));
    snode.childNodes = children.map(goog.bind(setParent, this));
    let collapsed = WalkerUtil.getAttribute(node, Attribute.COLLAPSED);
    return collapsed ? this.postProcess(snode, collapsed) : snode;
  }


  /**
   * Sets the text content of the semantic node. If no text content is available
   * or it is ignored, but an operator is given, it uses that.
   * @param snode The semantic node.
   * @param node The mml node.
   * @param opt_ignore Ignores using text content.
   */
  static textContent(snode: SemanticNode, node: Node, opt_ignore?: boolean) {
    if (!opt_ignore && node.textContent) {
      snode.textContent = node.textContent;
      return;
    }
    let operator = WalkerUtil.splitAttribute(
        WalkerUtil.getAttribute(node, Attribute.OPERATOR));
    if (operator.length > 1) {
      snode.textContent = operator[1];
    }
  }


  /**
   * Creates a new semantic node from the data in the MathML node.
   * @param node The enriched MathML node.
   * @return The reconstructed semantic tree node.
   */
  makeNode(node: Node): SemanticNode {
    let type = WalkerUtil.getAttribute(node, Attribute.TYPE);
    let role = WalkerUtil.getAttribute(node, Attribute.ROLE);
    let font = WalkerUtil.getAttribute(node, Attribute.FONT);
    let annotation = WalkerUtil.getAttribute(node, Attribute.ANNOTATION) || '';
    let id = WalkerUtil.getAttribute(node, Attribute.ID);
    let embellished = WalkerUtil.getAttribute(node, Attribute.EMBELLISHED);
    let fencepointer = WalkerUtil.getAttribute(node, Attribute.FENCEPOINTER);
    let snode = this.createNode(parseInt(id, 10));
    snode.type = (type as SemanticAttr.Type);
    snode.role = (role as SemanticAttr.Role);
    snode.font = font ? (font as SemanticAttr.Font) : SemanticAttr.Font.UNKNOWN;
    snode.parseAnnotation(annotation);
    if (fencepointer) {
      snode.fencePointer = fencepointer;
    }
    if (embellished) {
      snode.embellished = (embellished as SemanticAttr.Type);
    }
    return snode;
  }


  /**
   * Tests is a collapsed attribute belongs to a punctuated index.
   * @param collapsed A skeleton structure.
   * @return True if the skeleton indicates a collapsed punctuated
   *     element.
   */
  static isPunctuated(collapsed: SemanticSkeletonExports.Sexp): boolean {
    return !SemanticSkeleton.simpleCollapseStructure(collapsed) &&
        collapsed[1] && SemanticSkeleton.contentCollapseStructure(collapsed[1]);
  }


  /**
   * Creates a punctuation node containing an invisible comma.
   * @param id The id of the new node.
   * @return The newly created punctuation node.
   */
  makePunctuation(id: number): SemanticNode {
    let node = this.createNode(id);
    node.updateContent(SemanticAttr.invisibleComma());
    node.role = SemanticAttr.Role.DUMMY;
    return node;
  }


  /**
   * Creates a punctuated node that serves as an index.
   * @param snode The semantic node that is being rebuilt.
   * @param collapsed A skeleton structure.
   * @param role The role of the new index node.
   */
  makePunctuated(
      snode: SemanticNode, collapsed: SemanticSkeletonExports.Sexp,
      role: SemanticAttr.Role) {
    let punctuated = this.createNode(collapsed[0]);
    punctuated.type = SemanticAttr.Type.PUNCTUATED;
    punctuated.embellished = snode.embellished;
    punctuated.fencePointer = snode.fencePointer;
    punctuated.role = role;
    let cont = collapsed.splice(1, 1)[0].slice(1);
    punctuated.contentNodes = cont.map(goog.bind(this.makePunctuation, this));
    this.collapsedChildren_(collapsed);
  }


  /**
   * Creates an empty node that serves as an index.
   * @param snode The semantic node that is being rebuilt.
   * @param collapsed A skeleton structure.
   * @param role The role of the new index node.
   */
  makeEmpty(snode: SemanticNode, collapsed: number, role: SemanticAttr.Role) {
    let empty = this.createNode(collapsed);
    empty.type = SemanticAttr.Type.EMPTY;
    empty.embellished = snode.embellished;
    empty.fencePointer = snode.fencePointer;
    empty.role = role;
  }


  /**
   * Creates an index node.
   * @param snode The semantic node that is being rebuilt.
   * @param collapsed A skeleton structure.
   * @param role The role of the new index node.
   */
  makeIndex(
      snode: SemanticNode, collapsed: SemanticSkeletonExports.Sexp,
      role: SemanticAttr.Role) {
    if (RebuildStree.isPunctuated(collapsed)) {
      this.makePunctuated(snode, collapsed, role);
      collapsed = collapsed[0];
      return;
    }
    if (SemanticSkeleton.simpleCollapseStructure(collapsed) &&
        !this.nodeDict[collapsed.toString()]) {
      this.makeEmpty(snode, (collapsed as number), role);
    }
  }


  /**
   * Rearranges semantic node if there is a collapse structure.
   * @param snode The semantic node.
   * @param collapsed The collapse structure.
   * @return The semantic node.
   */
  postProcess(snode: SemanticNode, collapsed: string): SemanticNode {
    let array = SemanticSkeleton.fromString(collapsed).array;
    if (snode.type === SemanticAttr.Role.SUBSUP) {
      let subscript = this.createNode(array[1][0]);
      subscript.type = SemanticAttr.Type.SUBSCRIPT;
      subscript.role = SemanticAttr.Role.SUBSUP;
      snode.type = SemanticAttr.Type.SUPERSCRIPT;
      subscript.embellished = snode.embellished;
      subscript.fencePointer = snode.fencePointer;
      this.makeIndex(snode, array[1][2], SemanticAttr.Role.RIGHTSUB);
      this.makeIndex(snode, array[2], SemanticAttr.Role.RIGHTSUPER);
      this.collapsedChildren_(array);
      return snode;
    }
    if (snode.type === SemanticAttr.Type.SUBSCRIPT) {
      this.makeIndex(snode, array[2], SemanticAttr.Role.RIGHTSUB);
      this.collapsedChildren_(array);
      return snode;
    }
    if (snode.type === SemanticAttr.Type.SUPERSCRIPT) {
      this.makeIndex(snode, array[2], SemanticAttr.Role.RIGHTSUPER);
      this.collapsedChildren_(array);
      return snode;
    }
    if (snode.type === SemanticAttr.Type.TENSOR) {
      this.makeIndex(snode, array[2], SemanticAttr.Role.LEFTSUB);
      this.makeIndex(snode, array[3], SemanticAttr.Role.LEFTSUPER);
      this.makeIndex(snode, array[4], SemanticAttr.Role.RIGHTSUB);
      this.makeIndex(snode, array[5], SemanticAttr.Role.RIGHTSUPER);
      this.collapsedChildren_(array);
      return snode;
    }
    if (snode.type === SemanticAttr.Type.PUNCTUATED) {
      if (RebuildStree.isPunctuated(array)) {
        let cont = array.splice(1, 1)[0].slice(1);
        snode.contentNodes = cont.map(goog.bind(this.makePunctuation, this));
      }
      return snode;
    }
    if (snode.type === SemanticAttr.Role.UNDEROVER) {
      let score = this.createNode(array[1][0]);
      if (snode.childNodes[1].role === SemanticAttr.Role.OVERACCENT) {
        score.type = SemanticAttr.Type.OVERSCORE;
        snode.type = SemanticAttr.Type.UNDERSCORE;
      } else {
        score.type = SemanticAttr.Type.UNDERSCORE;
        snode.type = SemanticAttr.Type.OVERSCORE;
      }
      score.role = SemanticAttr.Role.UNDEROVER;
      score.embellished = snode.embellished;
      score.fencePointer = snode.fencePointer;
      this.collapsedChildren_(array);
      return snode;
    }
    return snode;
  }


  /**
   * Creates a new semantic tree node and stores it.
   * @param id The id for that node.
   * @return The newly created node.
   */
  createNode(id: number): SemanticNode {
    let node = this.factory.makeNode(id);
    this.nodeDict[id.toString()] = node;
    return node;
  }


  /**
   * Recombines semantic nodes and children according to a given skeleton
   * structure.
   * @param collapsed Array of integer arrays.
   */
  private collapsedChildren_(collapsed: SemanticSkeletonExports.Sexp) {
    let recurseCollapsed = goog.bind(function(coll) {
      let parent = this.nodeDict[coll[0]];
      parent.childNodes = [];
      for (let j = 1, l = coll.length; j < l; j++) {
        let id = coll[j];
        parent.childNodes.push(
            SemanticSkeleton.simpleCollapseStructure(id) ?
                this.nodeDict[id] :
                recurseCollapsed(id));
      }
      return parent;
    }, this);
    recurseCollapsed(collapsed);
  }
}

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
 * @file Procedure to reassemble the semantic tree from an enriched
 *    MathML expression.
 * @author v.sorge@mathjax.org (Volker Sorge)
 */

import * as DomUtil from '../common/dom_util';
import { Attribute } from '../enrich_mathml/enrich_attr';
import { invisibleComma } from '../semantic_tree/semantic_attr';
import {
  SemanticFont,
  SemanticRole,
  SemanticType
} from '../semantic_tree/semantic_meaning';
import { SemanticNode } from '../semantic_tree/semantic_node';
import { SemanticNodeFactory } from '../semantic_tree/semantic_node_factory';
import SemanticProcessor from '../semantic_tree/semantic_processor';
import { SemanticSkeleton, Sexp } from '../semantic_tree/semantic_skeleton';
import { SemanticTree } from '../semantic_tree/semantic_tree';
import * as SemanticUtil from '../semantic_tree/semantic_util';
import * as WalkerUtil from './walker_util';

// Note that reassemble tree will not give you exactly the original tree, as the
// mathml nodes and mathml tree components can not be reconstructed.
export class RebuildStree {
  /**
   * The node factory.
   */
  public factory: SemanticNodeFactory = new SemanticNodeFactory();

  /**
   * A dictionary to keep track of produced nodes.
   */
  public nodeDict: { [key: string]: SemanticNode } = {};

  /**
   * The semantic root node in the mml structure.
   */
  public mmlRoot: Element;

  /**
   * The semantic root node in the mml structure.
   */
  public streeRoot: SemanticNode;

  /**
   * The semantic tree to be computed.
   */
  public stree: SemanticTree;

  /**
   * The xml representation of semantic tree.
   */
  public xml: Element;

  /**
   * Adds external attributes if they exists. Recurses one level if we have a
   * leaf element with a none-text child.
   *
   * @param snode The semantic node.
   * @param node The mml node.
   * @param leaf True if it is a leaf node.
   */
  public static addAttributes(
    snode: SemanticNode,
    node: Element,
    leaf: boolean
  ) {
    if (
      leaf &&
      node.childNodes.length === 1 &&
      node.childNodes[0].nodeType !== DomUtil.NodeType.TEXT_NODE
    ) {
      SemanticUtil.addAttributes(snode, node.childNodes[0] as Element);
    }
    SemanticUtil.addAttributes(snode, node);
  }

  /**
   * Sets the text content of the semantic node. If no text content is available
   * or it is ignored, but an operator is given, it uses that.
   *
   * @param snode The semantic node.
   * @param node The mml node.
   * @param ignore Ignores using text content.
   */
  public static textContent(
    snode: SemanticNode,
    node: Element,
    ignore?: boolean
  ) {
    if (!ignore && node.textContent) {
      snode.textContent = node.textContent;
      return;
    }
    const operator = WalkerUtil.splitAttribute(
      WalkerUtil.getAttribute(node, Attribute.OPERATOR)
    );
    if (operator.length > 1) {
      snode.textContent = operator[1];
    }
  }

  /**
   * Tests if a collapsed attribute belongs to a punctuated index.
   *
   * @param collapsed A skeleton structure.
   * @returns True if the skeleton indicates a collapsed punctuated
   *     element.
   */
  public static isPunctuated(collapsed: Sexp): boolean {
    return (
      !SemanticSkeleton.simpleCollapseStructure(collapsed) &&
      (collapsed as any)[1] &&
      SemanticSkeleton.contentCollapseStructure((collapsed as any)[1])
    );
  }

  /**
   * @param mathml The enriched MathML node.
   */
  constructor(public mathml: Element) {
    this.mmlRoot = WalkerUtil.getSemanticRoot(mathml);
    this.streeRoot = this.assembleTree(this.mmlRoot);
    this.stree = SemanticTree.fromNode(this.streeRoot, this.mathml);
    this.xml = this.stree.xml();
    SemanticProcessor.getInstance().setNodeFactory(this.factory);
  }

  /**
   * @returns The rebuilt semantic tree.
   */
  public getTree(): SemanticTree {
    return this.stree;
  }

  /**
   * Assembles the semantic tree from the data attributes of the MathML node.
   *
   * @param node The MathML node.
   * @returns The corresponding semantic tree node.
   */
  public assembleTree(node: Element): SemanticNode {
    const snode = this.makeNode(node);
    const children = WalkerUtil.splitAttribute(
      WalkerUtil.getAttribute(node, Attribute.CHILDREN)
    );
    const content = WalkerUtil.splitAttribute(
      WalkerUtil.getAttribute(node, Attribute.CONTENT)
    );
    RebuildStree.addAttributes(
      snode,
      node,
      !(children.length || content.length)
    );
    if (content.length === 0 && children.length === 0) {
      RebuildStree.textContent(snode, node);
      return snode;
    }
    if (content.length > 0) {
      const fcontent = WalkerUtil.getBySemanticId(this.mathml, content[0]);
      if (fcontent) {
        RebuildStree.textContent(snode, fcontent, true);
      }
    }
    snode.contentNodes = content.map((id) => this.setParent(id, snode));
    snode.childNodes = children.map((id) => this.setParent(id, snode));
    const collapsed = WalkerUtil.getAttribute(node, Attribute.COLLAPSED);
    return collapsed ? this.postProcess(snode, collapsed) : snode;
  }

  /**
   * Creates a new semantic node from the data in the MathML node.
   *
   * @param node The enriched MathML node.
   * @returns The reconstructed semantic tree node.
   */
  public makeNode(node: Element): SemanticNode {
    const type = WalkerUtil.getAttribute(node, Attribute.TYPE);
    const role = WalkerUtil.getAttribute(node, Attribute.ROLE);
    const font = WalkerUtil.getAttribute(node, Attribute.FONT);
    const annotation =
      WalkerUtil.getAttribute(node, Attribute.ANNOTATION) || '';
    const id = WalkerUtil.getAttribute(node, Attribute.ID);
    const embellished = WalkerUtil.getAttribute(node, Attribute.EMBELLISHED);
    const fencepointer = WalkerUtil.getAttribute(node, Attribute.FENCEPOINTER);
    const snode = this.createNode(parseInt(id, 10));
    snode.type = type as SemanticType;
    snode.role = role as SemanticRole;
    snode.font = font ? (font as SemanticFont) : SemanticFont.UNKNOWN;
    snode.parseAnnotation(annotation);
    if (fencepointer) {
      snode.fencePointer = fencepointer;
    }
    if (embellished) {
      snode.embellished = embellished as SemanticType;
    }
    return snode;
  }

  /**
   * Creates a punctuation node containing an invisible comma.
   *
   * @param id The id of the new node.
   * @returns The newly created punctuation node.
   */
  public makePunctuation(id: number): SemanticNode {
    const node = this.createNode(id);
    node.updateContent(invisibleComma());
    node.role = SemanticRole.DUMMY;
    return node;
  }

  /**
   * Creates a punctuated node that serves as an index.
   *
   * @param snode The semantic node that is being rebuilt.
   * @param collapsed A skeleton structure.
   * @param role The role of the new index node.
   */
  // TODO (TS):  any to Sexp!
  public makePunctuated(
    snode: SemanticNode,
    collapsed: any,
    role: SemanticRole
  ) {
    const punctuated = this.createNode(collapsed[0]);
    punctuated.type = SemanticType.PUNCTUATED;
    punctuated.embellished = snode.embellished;
    punctuated.fencePointer = snode.fencePointer;
    punctuated.role = role;
    const cont = collapsed.splice(1, 1)[0].slice(1);
    punctuated.contentNodes = cont.map(this.makePunctuation.bind(this));
    this.collapsedChildren_(collapsed);
  }

  /**
   * Creates an empty node that serves as an index.
   *
   * @param snode The semantic node that is being rebuilt.
   * @param collapsed A skeleton structure.
   * @param role The role of the new index node.
   */
  public makeEmpty(snode: SemanticNode, collapsed: number, role: SemanticRole) {
    const empty = this.createNode(collapsed);
    empty.type = SemanticType.EMPTY;
    empty.embellished = snode.embellished;
    empty.fencePointer = snode.fencePointer;
    empty.role = role;
  }

  /**
   * Creates an index node.
   *
   * @param snode The semantic node that is being rebuilt.
   * @param collapsed A skeleton structure.
   * @param role The role of the new index node.
   */
  public makeIndex(snode: SemanticNode, collapsed: Sexp, role: SemanticRole) {
    if (RebuildStree.isPunctuated(collapsed)) {
      this.makePunctuated(snode, collapsed, role);
      collapsed = (collapsed as any)[0];
      return;
    }
    if (
      SemanticSkeleton.simpleCollapseStructure(collapsed) &&
      !this.nodeDict[collapsed.toString()]
    ) {
      this.makeEmpty(snode, collapsed as number, role);
    }
  }

  /**
   * Rearranges semantic node if there is a collapse structure.
   *
   * @param snode The semantic node.
   * @param collapsed The collapse structure.
   * @returns The semantic node.
   */
  public postProcess(snode: SemanticNode, collapsed: string): SemanticNode {
    const array = SemanticSkeleton.fromString(collapsed).array as any;
    // TODO (TS): Semantic types used as roles.
    if ((snode.type as any as SemanticRole) === SemanticRole.SUBSUP) {
      const subscript = this.createNode(array[1][0]);
      subscript.type = SemanticType.SUBSCRIPT;
      subscript.role = SemanticRole.SUBSUP;
      snode.type = SemanticType.SUPERSCRIPT;
      subscript.embellished = snode.embellished;
      subscript.fencePointer = snode.fencePointer;
      this.makeIndex(snode, array[1][2], SemanticRole.RIGHTSUB);
      this.makeIndex(snode, array[2], SemanticRole.RIGHTSUPER);
      this.collapsedChildren_(array);
      return snode;
    }
    if (snode.type === SemanticType.SUBSCRIPT) {
      this.makeIndex(snode, array[2], SemanticRole.RIGHTSUB);
      this.collapsedChildren_(array);
      return snode;
    }
    if (snode.type === SemanticType.SUPERSCRIPT) {
      this.makeIndex(snode, array[2], SemanticRole.RIGHTSUPER);
      this.collapsedChildren_(array);
      return snode;
    }
    if (snode.type === SemanticType.TENSOR) {
      this.makeIndex(snode, array[2], SemanticRole.LEFTSUB);
      this.makeIndex(snode, array[3], SemanticRole.LEFTSUPER);
      this.makeIndex(snode, array[4], SemanticRole.RIGHTSUB);
      this.makeIndex(snode, array[5], SemanticRole.RIGHTSUPER);
      this.collapsedChildren_(array);
      return snode;
    }
    if (snode.type === SemanticType.PUNCTUATED) {
      if (RebuildStree.isPunctuated(array)) {
        const cont = array.splice(1, 1)[0].slice(1);
        snode.contentNodes = cont.map(this.makePunctuation.bind(this));
      }
      return snode;
    }
    if ((snode.type as any as SemanticRole) === SemanticRole.UNDEROVER) {
      const score = this.createNode(array[1][0]);
      if (snode.childNodes[1].role === SemanticRole.OVERACCENT) {
        score.type = SemanticType.OVERSCORE;
        snode.type = SemanticType.UNDERSCORE;
      } else {
        score.type = SemanticType.UNDERSCORE;
        snode.type = SemanticType.OVERSCORE;
      }
      score.role = SemanticRole.UNDEROVER;
      score.embellished = snode.embellished;
      score.fencePointer = snode.fencePointer;
      this.collapsedChildren_(array);
      return snode;
    }
    return snode;
  }

  /**
   * Creates a new semantic tree node and stores it.
   *
   * @param id The id for that node.
   * @returns The newly created node.
   */
  public createNode(id: number): SemanticNode {
    const node = this.factory.makeNode(id);
    this.nodeDict[id.toString()] = node;
    return node;
  }

  /**
   * Recombines semantic nodes and children according to a given skeleton
   * structure.
   *
   * @param collapsed Array of integer arrays.
   */
  private collapsedChildren_(collapsed: Sexp) {
    const recurseCollapsed = (coll: any) => {
      const parent = this.nodeDict[coll[0]];
      parent.childNodes = [];
      for (let j = 1, l = coll.length; j < l; j++) {
        const id = coll[j];
        parent.childNodes.push(
          SemanticSkeleton.simpleCollapseStructure(id)
            ? this.nodeDict[id]
            : recurseCollapsed(id)
        );
      }
      return parent;
    };
    recurseCollapsed(collapsed);
  }

  /**
   * Sets a parent for a node.
   *
   * @param id of the node.
   * @param snode The parent node.
   * @returns The newly assembled child node.
   */
  private setParent(id: string, snode: SemanticNode): SemanticNode {
    const mml = WalkerUtil.getBySemanticId(this.mathml, id);
    const sn = this.assembleTree(mml);
    sn.parent = snode;
    return sn;
  }
}

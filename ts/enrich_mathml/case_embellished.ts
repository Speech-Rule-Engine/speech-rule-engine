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
 * @file Specialist computations to deal with embellished fences.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import * as DomUtil from '../common/dom_util';
import { SemanticRole, SemanticType } from '../semantic_tree/semantic_meaning';
import { SemanticNode } from '../semantic_tree/semantic_node';

import { AbstractEnrichCase } from './abstract_enrich_case';
import { CaseDoubleScript } from './case_double_script';
import { CaseMultiscripts } from './case_multiscripts';
import { CaseTensor } from './case_tensor';
import * as EnrichMathml from './enrich_mathml';
import { setAttributes, Attribute } from './enrich_attr';

export class CaseEmbellished extends AbstractEnrichCase {
  /**
   * Fenced semantic node.
   */
  public fenced: SemanticNode = null;

  /**
   * Fenced mml node.
   */
  public fencedMml: Element = null;

  /**
   * List of all fenced mml nodes. `fencedMml` is the first.
   */
  public fencedMmlNodes: Element[] = [];

  /**
   * Open Fenced semantic node.
   */
  public ofence: SemanticNode = null;

  /**
   * Open Fenced mml node.
   */
  public ofenceMml: Element = null;

  /**
   * Open Fenced node map.
   */
  public ofenceMap: { [key: number]: Element } = {};

  /**
   * Closed Fenced semantic node.
   */
  public cfence: SemanticNode = null;

  /**
   * Closed Fenced node map.
   */
  public cfenceMml: Element = null;

  /**
   * Closed Fenced semantic node.
   */
  public cfenceMap: { [key: number]: Element } = {};

  /**
   * List of elements that need to get the parents reset.
   */
  public parentCleanup: Element[] = [];

  /**
   * Applicability test of the case. This method also prevents walking
   * embellished punctuations twice as they might have already been walked as
   * content nodes.
   *
   * @param semantic The semantic node.
   * @returns True if case is applicable.
   */
  public static test(semantic: SemanticNode): boolean {
    return !!(
      semantic.mathmlTree &&
      semantic.fencePointer &&
      // TODO: This needs a cleaner solution at some point.
      !semantic.mathmlTree.getAttribute('data-semantic-type')
    );
  }

  /**
   * Creates an empty semantic node with an associated empty mrow MathML
   * element.
   *
   * @param id The id number of the node.
   * @returns The new empty node.
   */
  private static makeEmptyNode_(id: number): SemanticNode {
    const mrow = DomUtil.createElement('mrow');
    const empty = new SemanticNode(id);
    empty.type = SemanticType.EMPTY;
    empty.mathmlTree = mrow;
    return empty;
  }

  /**
   * Collates the id numbers of the fenced node.
   *
   * @param fence The fence expression.
   * @param ids The list of id numbers.
   */
  private static fencedMap_(
    fence: SemanticNode,
    ids: { [key: number]: Element }
  ) {
    ids[fence.id] = fence.mathmlTree;
    if (!fence.embellished) {
      return;
    }
    CaseEmbellished.fencedMap_(fence.childNodes[0], ids);
  }

  /**
   * @override
   */
  constructor(semantic: SemanticNode) {
    super(semantic);
  }

  /**
   * @override
   */
  public getMathml() {
    this.getFenced_();
    // This is the first fenced node, but there can be more than one!
    this.fencedMml = EnrichMathml.walkTree(this.fenced as SemanticNode);
    this.getFencesMml_();
    if (this.fenced.type === SemanticType.EMPTY && !this.fencedMml.parentNode) {
      // Fenced element is empty and new. Insert it before the closing fence so
      // it can be walked as usual.
      this.fencedMml.setAttribute(Attribute.ADDED, 'true');
      this.cfenceMml.parentNode.insertBefore(this.fencedMml, this.cfenceMml);
    }
    this.getFencedMml_();
    const rewrite = this.rewrite_();
    return rewrite;
  }

  /**
   * Checks if the node is fenced, including vectors, matrices etc.
   *
   * @param node A semantic node.
   * @returns True if the node is a fenced elementd type.
   */
  private fencedElement(node: SemanticNode) {
    return (
      node.type === SemanticType.FENCED ||
      node.type === SemanticType.MATRIX ||
      node.type === SemanticType.VECTOR
    );
  }

  /**
   * Computes the components of the actual fenced node.
   */
  private getFenced_() {
    let currentNode = this.semantic;
    while (!this.fencedElement(currentNode)) {
      currentNode = currentNode.childNodes[0];
    }
    this.fenced = currentNode.childNodes[0];
    this.ofence = currentNode.contentNodes[0];
    this.cfence = currentNode.contentNodes[1];
    CaseEmbellished.fencedMap_(this.ofence, this.ofenceMap);
    CaseEmbellished.fencedMap_(this.cfence, this.cfenceMap);
  }

  /**
   * Retrieve the list of MathMl elements that are fenced.
   */
  private getFencedMml_() {
    let sibling = this.ofenceMml.nextSibling;
    sibling = sibling === this.fencedMml ? sibling : this.fencedMml;
    while (sibling && sibling !== this.cfenceMml) {
      this.fencedMmlNodes.push(sibling as Element);
      sibling = sibling.nextSibling;
    }
  }

  /**
   * Retrieve the actual MathMl element that forms the outermost layer of the
   * fences.
   */
  private getFencesMml_() {
    let currentNode = this.semantic;
    const ofenceIds = Object.keys(this.ofenceMap);
    const cfenceIds = Object.keys(this.cfenceMap);
    while (
      (!this.ofenceMml || !this.cfenceMml) &&
      currentNode !== this.fenced
    ) {
      if (
        ofenceIds.indexOf(currentNode.fencePointer) !== -1 &&
        !this.ofenceMml
      ) {
        this.ofenceMml = currentNode.mathmlTree;
      }
      if (
        cfenceIds.indexOf(currentNode.fencePointer) !== -1 &&
        !this.cfenceMml
      ) {
        this.cfenceMml = currentNode.mathmlTree;
      }
      currentNode = currentNode.childNodes[0];
    }
    if (!this.ofenceMml) {
      this.ofenceMml = this.ofence.mathmlTree;
    }
    if (!this.cfenceMml) {
      this.cfenceMml = this.cfence.mathmlTree;
    }
    if (this.ofenceMml) {
      this.ofenceMml = EnrichMathml.ascendNewNode(this.ofenceMml);
    }
    if (this.cfenceMml) {
      this.cfenceMml = EnrichMathml.ascendNewNode(this.cfenceMml);
    }
  }

  /**
   * Rewrites the MathML node with embellished fences.
   *
   * @returns The new MathML element.
   */
  private rewrite_(): Element {
    let currentNode = this.semantic;
    let result = null;
    const newNode = this.introduceNewLayer_();
    // Sets the basics composition.
    setAttributes(newNode, this.fenced.parent as SemanticNode);

    while (!this.fencedElement(currentNode)) {
      // Outer embellished node is the one with the fence pointer.
      const mml = currentNode.mathmlTree as Element;
      const specialCase = this.specialCase_(currentNode, mml);
      if (specialCase) {
        currentNode = specialCase;
      } else {
        setAttributes(mml, currentNode);
        const mmlChildren = [];
        // The base node is rewritten. Walk the remaining nodes.
        for (let i = 1, child; (child = currentNode.childNodes[i]); i++) {
          mmlChildren.push(EnrichMathml.walkTree(child));
        }
        currentNode = currentNode.childNodes[0];
      }

      // Reordering the nodes in the tree.
      const dummy = DomUtil.createElement('dummy');
      const saveChild = mml.childNodes[0];

      DomUtil.replaceNode(mml, dummy);
      DomUtil.replaceNode(newNode, mml);
      DomUtil.replaceNode(mml.childNodes[0], newNode);
      DomUtil.replaceNode(dummy, saveChild);
      if (!result) {
        result = mml;
      }
    }

    // Walk the actual fences.
    EnrichMathml.walkTree(this.ofence as SemanticNode);
    EnrichMathml.walkTree(this.cfence as SemanticNode);

    this.cleanupParents_();
    return result || newNode;
  }

  /**
   * Treatment of special cases like msubsup and rewritten mmultiscripts.
   *
   * @param semantic The current semantic node.
   * @param mml The MathML node associated with the semantic node.
   * @returns The next semantic node to be rewritten, if
   *     the original semantic node was a special case.
   */
  private specialCase_(semantic: SemanticNode, mml: Element): SemanticNode {
    const mmlTag = DomUtil.tagName(mml);
    let parent = null;
    let caller;
    if (mmlTag === 'MSUBSUP') {
      parent = semantic.childNodes[0];
      caller = CaseDoubleScript;
    } else if (mmlTag === 'MMULTISCRIPTS') {
      if (
        semantic.type === SemanticType.SUPERSCRIPT ||
        semantic.type === SemanticType.SUBSCRIPT
      ) {
        caller = CaseMultiscripts;
      } else if (semantic.type === SemanticType.TENSOR) {
        caller = CaseTensor;
      }
      if (
        caller &&
        semantic.childNodes[0] &&
        semantic.childNodes[0].role === SemanticRole.SUBSUP
      ) {
        parent = semantic.childNodes[0];
      } else {
        parent = semantic;
      }
    }
    if (!parent) {
      return null;
    }
    const base = parent.childNodes[0];
    const empty = CaseEmbellished.makeEmptyNode_(base.id);
    parent.childNodes[0] = empty;
    mml = new caller(semantic).getMathml();
    parent.childNodes[0] = base;
    this.parentCleanup.push(mml);
    return parent.childNodes[0];
  }

  /**
   * Introduces a new layer if necessary before rewriting the fence.
   *
   * @returns The node representing the active layer.
   */
  private introduceNewLayer_(): Element {
    const fullOfence = this.fullFence(this.ofenceMml);
    const fullCfence = this.fullFence(this.cfenceMml);
    // Introduce a definite new layer.
    let newNode = DomUtil.createElement('mrow');
    DomUtil.replaceNode(this.fencedMml as Element, newNode);
    this.fencedMmlNodes.forEach((node) => newNode.appendChild(node));
    newNode.insertBefore(fullOfence, this.fencedMml);
    newNode.appendChild(fullCfence);
    // The case of top element math.
    if (!newNode.parentNode) {
      const mrow = DomUtil.createElement('mrow');
      while (newNode.childNodes.length > 0) {
        mrow.appendChild(newNode.childNodes[0]);
      }
      newNode.appendChild(mrow);
      newNode = mrow;
    }
    return newNode;
  }

  /**
   * Retrieves the original embellished fence for the given fence.
   *
   * @param fence A simple fence.
   * @returns The embellished version of that fence. Can be the fence
   *     itself if it was not embellished.
   */
  private fullFence(fence: Element): Element {
    const parent = this.fencedMml.parentNode;
    let currentFence = fence;
    while (currentFence.parentNode && currentFence.parentNode !== parent) {
      currentFence = currentFence.parentNode as Element;
    }
    return currentFence as Element;
  }

  /**
   * Sets the correct parent pointer for MathML nodes treated and collated in
   * the special cases. In particular we set the parent of the first child of a
   * node to the parent of the remaining children.
   */
  private cleanupParents_() {
    this.parentCleanup.forEach(function (x) {
      const parent = (x.childNodes[1] as Element).getAttribute(
        Attribute.PARENT
      );
      (x.childNodes[0] as Element).setAttribute(Attribute.PARENT, parent);
    });
  }
}

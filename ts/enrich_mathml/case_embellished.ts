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
 * @fileoverview Specialist computations to deal with embellished fences.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */


import * as DomUtil from '../common/dom_util';
import {SemanticAttr} from '../semantic_tree/semantic_attr';
import {SemanticNode} from '../semantic_tree/semantic_node';

import {AbstractEnrichCase} from './abstract_enrich_case';
import {CaseDoubleScript} from './case_double_script';
import {CaseMultiscripts} from './case_multiscripts';
import * as EnrichMathml from './enrich_mathml';



/**
 * @override
 * @final
 */
export class CaseEmbellished extends sre.AbstractEnrichCase {
  fenced: SemanticNode = null;

  fencedMml: Element = null;

  ofence: SemanticNode = null;

  ofenceMml: Element = null;

  ofenceMap: {[key: number]: Element} = {};

  cfence: SemanticNode = null;

  cfenceMml: Element = null;

  cfenceMap: {[key: number]: Element} = {};

  /**
   * List of elements that need to get the parents reset.
   */
  parentCleanup: Element[] = [];
  constructor(semantic) {
    super(semantic);
  }


  /**
   * Applicability test of the case. This method also prevents walking
   * embellished punctuations twice as they might have already been walked as
   * content nodes.
   * @param semantic The semantic node.
   * @return True if case is applicable.
   */
  static test(semantic: SemanticNode): boolean {
    return !!(
        semantic.mathmlTree && semantic.fencePointer &&
        // TODO: This needs a cleaner solution at some point.
        !semantic.mathmlTree.getAttribute('data-semantic-type'));
  }


  /**
   * @override
   */
  getMathml() {
    this.getFenced_();
    this.fencedMml = EnrichMathml.walkTree((this.fenced as SemanticNode));
    this.getFencesMml_();
    if (this.fenced.type === SemanticAttr.Type.EMPTY &&
        !this.fencedMml.parentNode) {
      // Fenced element is empty and new. Insert it before the closing fence so
      // it can be walked as usual.
      this.fencedMml.setAttribute(EnrichMathml.Attribute.ADDED, 'true');
      this.cfenceMml.parentNode.insertBefore(this.fencedMml, this.cfenceMml);
    }
    return this.rewrite_();
  }


  /**
   * Computes the components of the actual fenced node.
   */
  private getFenced_() {
    let currentNode = this.semantic;
    while (currentNode.type !== SemanticAttr.Type.FENCED) {
      currentNode = currentNode.childNodes[0];
    }
    this.fenced = currentNode.childNodes[0];
    this.ofence = currentNode.contentNodes[0];
    this.cfence = currentNode.contentNodes[1];
    CaseEmbellished.fencedMap_(this.ofence, this.ofenceMap);
    CaseEmbellished.fencedMap_(this.cfence, this.cfenceMap);
  }


  /**
   * Collates the id numbers of the fenced node.
   * @param fence The fence expression.
   * @param ids The list of id numbers.
   */
  private static fencedMap_(
      fence: SemanticNode, ids: {[key: number]: Element}) {
    ids[fence.id] = fence.mathmlTree;
    if (!fence.embellished) {
      return;
    }
    CaseEmbellished.fencedMap_(fence.childNodes[0], ids);
  }


  /**
   * Retrieve the actual MathMl element that forms the outermost layer of the
   * fences.
   */
  private getFencesMml_() {
    let currentNode = this.semantic;
    let ofenceIds = Object.keys(this.ofenceMap);
    let cfenceIds = Object.keys(this.cfenceMap);
    while ((!this.ofenceMml || !this.cfenceMml) &&
           currentNode !== this.fenced) {
      if (ofenceIds.indexOf(currentNode.fencePointer) !== -1 &&
          !this.ofenceMml) {
        this.ofenceMml = currentNode.mathmlTree;
      }
      if (cfenceIds.indexOf(currentNode.fencePointer) !== -1 &&
          !this.cfenceMml) {
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
   * @return The new MathML element.
   */
  private rewrite_(): Element {
    let currentNode = this.semantic;
    let result = null;
    let newNode = this.introduceNewLayer_();
    // Sets the basics composition.
    EnrichMathml.setAttributes(newNode, (this.fenced.parent as SemanticNode));

    while (currentNode.type !== SemanticAttr.Type.FENCED) {
      // Outer embellished node is the one with the fence pointer.
      let mml = (currentNode.mathmlTree as Element);
      let specialCase = this.specialCase_(currentNode, mml);
      if (specialCase) {
        currentNode = specialCase;
      } else {
        EnrichMathml.setAttributes(mml, currentNode);
        let mmlChildren = [];
        // The base node is rewritten. Walk the remaining nodes.
        for (let i = 1, child; child = currentNode.childNodes[i]; i++) {
          mmlChildren.push(EnrichMathml.walkTree(child));
        }
        currentNode = currentNode.childNodes[0];
      }

      // Reordering the nodes in the tree.
      let dummy = DomUtil.createElement('dummy');
      let saveParent = newNode.parentNode;
      let saveChild = mml.childNodes[0];

      DomUtil.replaceNode(mml, dummy);
      DomUtil.replaceNode(newNode, mml);
      DomUtil.replaceNode(mml.childNodes[0], newNode);
      DomUtil.replaceNode(dummy, saveChild);
      mml.parentNode = saveParent;

      newNode = (mml.childNodes[0] as Element);
      if (!result) {
        result = mml;
      }
    }

    // Walk the actual fences.
    EnrichMathml.walkTree((this.ofence as SemanticNode));
    EnrichMathml.walkTree((this.cfence as SemanticNode));

    this.cleanupParents_();
    return result || newNode;
  }


  /**
   * Treatment of special cases like msubsup and rewritten mmultiscripts.
   * @param semantic The current semantic node.
   * @param mml The MathML node associated with the semantic node.
   * @return The next semantic node to be rewritten, if
   *     the original semantic node was a special case.
   */
  private specialCase_(semantic: SemanticNode, mml: Element): SemanticNode {
    let mmlTag = DomUtil.tagName(mml);
    let parent = null;
    let caller;
    if (mmlTag === 'MSUBSUP') {
      parent = semantic.childNodes[0];
      caller = CaseDoubleScript;
    } else if (mmlTag === 'MMULTISCRIPTS') {
      if (semantic.type === SemanticAttr.Type.SUPERSCRIPT ||
          semantic.type === SemanticAttr.Type.SUBSCRIPT) {
        caller = CaseMultiscripts;
      } else if (semantic.type === SemanticAttr.Type.TENSOR) {
        caller = sre.CaseTensor;
      }
      if (caller && semantic.childNodes[0] &&
          semantic.childNodes[0].role === SemanticAttr.Role.SUBSUP) {
        parent = semantic.childNodes[0];
      } else {
        parent = semantic;
      }
    }
    if (!parent) {
      return null;
    }
    let base = parent.childNodes[0];
    let empty = CaseEmbellished.makeEmptyNode_(base.id);
    parent.childNodes[0] = empty;
    mml = (new caller(semantic)).getMathml();
    parent.childNodes[0] = base;
    this.parentCleanup.push(mml);
    return parent.childNodes[0];
  }


  /**
   * Creates an empty semantic node with an associated empty mrow MathML
   * element.
   * @param id The id number of the node.
   * @return The new empty node.
   */
  private static makeEmptyNode_(id: number): SemanticNode {
    let mrow = DomUtil.createElement('mrow');
    let empty = new SemanticNode(id);
    empty.type = SemanticAttr.Type.EMPTY;
    empty.mathmlTree = mrow;
    return empty;
  }


  /**
   * Introduces a new layer if necessary before rewriting the fence.
   * @return The node representing the active layer.
   */
  private introduceNewLayer_(): Element {
    let fullOfence = this.fullFence(this.ofenceMml);
    let fullCfence = this.fullFence(this.cfenceMml);
    // Introduce a definite new layer.
    let newNode = DomUtil.createElement('mrow');
    DomUtil.replaceNode((this.fencedMml as Element), newNode);
    newNode.appendChild(this.fencedMml);
    newNode.insertBefore(fullOfence, this.fencedMml);
    newNode.appendChild(fullCfence);
    // The case of top element math.
    if (!newNode.parentNode) {
      let mrow = DomUtil.createElement('mrow');
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
   * @param fence A simple fence.
   * @return The embellished version of that fence. Can be the fence
   *     itself if it was not embellished.
   */
  fullFence(fence: Element): Element {
    let parent = this.fencedMml.parentNode;
    let currentFence = fence;
    while (currentFence.parentNode && currentFence.parentNode !== parent) {
      currentFence = currentFence.parentNode;
    }
    return (currentFence as Element);
  }


  /**
   * Sets the correct parent pointer for MathML nodes treated and collated in
   * the special cases. In particular we set the parent of the first child of a
   * node to the parent of the remaining children.
   */
  private cleanupParents_() {
    this.parentCleanup.forEach(function(x) {
      let parent = x.childNodes[1].getAttribute(EnrichMathml.Attribute.PARENT);
      x.childNodes[0].setAttribute(EnrichMathml.Attribute.PARENT, parent);
    });
  }
}

goog.inherits(CaseEmbellished, AbstractEnrichCase);

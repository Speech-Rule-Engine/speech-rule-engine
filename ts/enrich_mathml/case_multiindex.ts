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
 * @file Abstract class for cases of multiindex structures.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import * as DomUtil from '../common/dom_util.js';
import {
  SemanticRole,
  SemanticType
} from '../semantic_tree/semantic_meaning.js';
import { SemanticNode } from '../semantic_tree/semantic_node.js';
import { Sexp } from '../semantic_tree/semantic_skeleton.js';
import { MMLTAGS } from '../semantic_tree/semantic_util.js';

import { AbstractEnrichCase } from './abstract_enrich_case.js';
import * as EnrichMathml from './enrich_mathml.js';
import { setAttributes, Attribute } from './enrich_attr.js';

export abstract class CaseMultiindex extends AbstractEnrichCase {
  /**
   * The actual mml tree.
   */
  public mml: Element;

  /**
   * Treats the index nodes of a multiscript tensor, possibly collapsing dummy
   * punctuations.
   *
   * @param index The index node of a tensor.
   * @returns If the index node was a
   *     dummy punctuation, i.e. consisted of more than one index, a list of
   *     strings for the collapsed structure is returned, otherwise the node id.
   */
  public static multiscriptIndex(index: SemanticNode): Sexp {
    if (
      index.type === SemanticType.PUNCTUATED &&
      index.contentNodes[0].role === SemanticRole.DUMMY
    ) {
      return EnrichMathml.collapsePunctuated(index);
    }
    EnrichMathml.walkTree(index);
    return index.id;
  }

  /**
   * Creates a None node.
   *
   * @param semantic An empty semantic node.
   * @returns The corresponding MathML <None/> node.
   */
  private static createNone_(semantic: SemanticNode): Element {
    const newNode = DomUtil.createElement('none');
    if (semantic) {
      setAttributes(newNode, semantic);
    }
    newNode.setAttribute(Attribute.ADDED, 'true');
    return newNode;
  }

  /**
   * @override
   */
  constructor(semantic: SemanticNode) {
    super(semantic);
    this.mml = semantic.mathmlTree;
  }

  /**
   * Completes the mmultiscript by adding missing None nodes and sorting out the
   * right order of children.
   *
   * @param rightIndices The ids of the leaf
   *     nodes of the right indices.
   * @param leftIndices The ids of the leaf
   *     nodes of the left indices.
   */
  protected completeMultiscript(rightIndices: Sexp, leftIndices: Sexp) {
    const children = DomUtil.toArray(this.mml.childNodes).slice(1);
    let childCounter = 0;
    const completeIndices = (indices: number[]) => {
      for (let i = 0, index: number; (index = indices[i]); i++) {
        const child = children[childCounter];
        if (
          !child ||
          index !==
            parseInt(
              EnrichMathml.getInnerNode(child).getAttribute(Attribute.ID)
            )
        ) {
          const query = this.semantic.querySelectorAll((x) => x.id === index);
          this.mml.insertBefore(
            CaseMultiindex.createNone_(query[0]),
            child || null
          );
        } else {
          EnrichMathml.getInnerNode(child).setAttribute(
            Attribute.PARENT,
            this.semantic.id.toString()
          );
          childCounter++;
        }
      }
    };
    // right sub and superscripts
    completeIndices(rightIndices as number[]);
    // mprescripts
    if (
      children[childCounter] &&
      DomUtil.tagName(children[childCounter]) !== MMLTAGS.MPRESCRIPTS
    ) {
      this.mml.insertBefore(
        children[childCounter],
        DomUtil.createElement('mprescripts')
      );
    } else {
      childCounter++;
    }
    // left sub and superscripts
    completeIndices(leftIndices as number[]);
  }
}

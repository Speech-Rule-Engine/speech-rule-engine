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
 * @fileoverview Abstract class for cases of multiindex structures.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import * as DomUtil from '../common/dom_util';
import {SemanticAttr} from '../semantic_tree/semantic_attr';
import {SemanticNode} from '../semantic_tree/semantic_node';
import {Sexp} from '../semantic_tree/semantic_skeleton';

import {AbstractEnrichCase} from './abstract_enrich_case';
import * as EnrichMathml from './enrich_mathml';



/**
 * @override
 */
export class CaseMultiindex extends sre.AbstractEnrichCase {
  mml: Element;
  constructor(semantic) {
    super(semantic);
    this.mml = semantic.mathmlTree;
  }


  /**
   * Completes the mmultiscript by adding missing None nodes and sorting out the
   * right order of children.
   * @param rightIndices The ids of the leaf
   *     nodes of the right indices.
   * @param leftIndices The ids of the leaf
   *     nodes of the left indices.
   */
  protected completeMultiscript(rightIndices: Sexp, leftIndices: Sexp) {
    let children = DomUtil.toArray(this.mml.childNodes).slice(1);
    let childCounter = 0;
    let completeIndices = goog.bind(function(indices) {
      for (let i = 0, index; index = indices[i]; i++) {
        let child = children[childCounter];
        if (!child ||
            index !=
                EnrichMathml.getInnerNode(child).getAttribute(
                    EnrichMathml.Attribute.ID)) {
          let query = this.semantic.querySelectorAll(function(x) {
            return x.id === index;
          });
          this.mml.insertBefore(
              CaseMultiindex.createNone_(query[0]), child || null);
        } else {
          EnrichMathml.getInnerNode(child).setAttribute(
              EnrichMathml.Attribute.PARENT, this.semantic.id);
          childCounter++;
        }
      }
    }, this);
    // right sub and superscripts
    completeIndices(rightIndices);
    // mprescripts
    if (children[childCounter] &&
        DomUtil.tagName(children[childCounter]) !== 'MPRESCRIPTS') {
      this.mml.insertBefore(
          children[childCounter], DomUtil.createElement('mprescripts'));
    } else {
      childCounter++;
    }
    // left sub and superscripts
    completeIndices(leftIndices);
  }


  /**
   * Creates a None node.
   * @param semantic An empty semantic node.
   * @return The corresponding MathML <None/> node.
   */
  private static createNone_(semantic: SemanticNode): Element {
    let newNode = DomUtil.createElement('none');
    if (semantic) {
      EnrichMathml.setAttributes(newNode, semantic);
    }
    newNode.setAttribute(EnrichMathml.Attribute.ADDED, 'true');
    return newNode;
  }


  /**
   * Treats the index nodes of a multiscript tensor, possibly collapsing dummy
   * punctuations.
   * @param index The index node of a tensor.
   * @return If the index node was a
   *     dummy punctuation, i.e. consisted of more than one index, a list of
   *     strings for the collapsed structure is returned, otherwise the node id.
   */
  static multiscriptIndex(index: SemanticNode): Sexp {
    if (index.type === SemanticAttr.Type.PUNCTUATED &&
        index.contentNodes[0].role === SemanticAttr.Role.DUMMY) {
      return EnrichMathml.collapsePunctuated(index);
    }
    EnrichMathml.walkTree(index);
    return index.id;
  }
}

goog.inherits(CaseMultiindex, AbstractEnrichCase);

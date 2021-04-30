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
 * @fileoverview Specialist computations to deal with table elements.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import * as DomUtil from '../common/dom_util';
import {SemanticAttr} from '../semantic_tree/semantic_attr';
import {SemanticNode} from '../semantic_tree/semantic_node';

import {AbstractEnrichCase} from './abstract_enrich_case';
import * as EnrichMathml from './enrich_mathml';



/**
 * @override
 */
export class CaseTable extends sre.AbstractEnrichCase {
  mml: Element;

  inner: Element[] = [];
  constructor(semantic) {
    super(semantic);
    this.mml = semantic.mathmlTree;
  }


  /**
   * Applicability test of the case.
   * @param semantic The semantic node.
   * @return True if case is applicable.
   */
  static test(semantic: SemanticNode): boolean {
    return semantic.type === SemanticType.MATRIX ||
        semantic.type === SemanticType.VECTOR ||
        semantic.type === SemanticType.CASES;
  }


  /**
   * @override
   */
  getMathml() {
    let lfence = EnrichMathml.cloneContentNode(
        (this.semantic.contentNodes[0] as SemanticNode));
    let rfence = this.semantic.contentNodes[1] ?
        EnrichMathml.cloneContentNode(
            (this.semantic.contentNodes[1] as SemanticNode)) :
        null;
    this.inner =
        this.semantic.childNodes.map((EnrichMathml.walkTree as Function));
    if (!this.mml) {
      this.mml = EnrichMathml.introduceNewLayer(
          [lfence, this.inner, rfence], this.semantic);
    } else if (DomUtil.tagName(this.mml) === 'MFENCED') {
      let children = this.mml.childNodes;
      this.mml.insertBefore(lfence, children[0] || null);
      rfence && this.mml.appendChild(rfence);
      this.mml = EnrichMathml.rewriteMfenced(this.mml);
    } else {
      let newChildren = [lfence, this.mml];
      rfence && newChildren.push(rfence);
      this.mml = EnrichMathml.introduceNewLayer(newChildren, this.semantic);
    }
    EnrichMathml.setAttributes(this.mml, this.semantic);
    return this.mml;
  }
}

goog.inherits(CaseTable, AbstractEnrichCase);

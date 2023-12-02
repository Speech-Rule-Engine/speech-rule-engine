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
 * @file Specialist computations to deal with table elements.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import * as DomUtil from '../common/dom_util.js';
import { SemanticType } from '../semantic_tree/semantic_meaning.js';
import { SemanticNode } from '../semantic_tree/semantic_node.js';
import { MMLTAGS } from '../semantic_tree/semantic_util.js';

import { AbstractEnrichCase } from './abstract_enrich_case.js';
import * as EnrichMathml from './enrich_mathml.js';
import { setAttributes } from './enrich_attr.js';

export class CaseTable extends AbstractEnrichCase {
  /**
   * The actual mml tree.
   */
  public mml: Element;

  /**
   * The inner elements of the table.
   */
  public inner: Element[] = [];

  /**
   * Applicability test of the case.
   *
   * @param semantic The semantic node.
   * @returns True if case is applicable.
   */
  public static test(semantic: SemanticNode): boolean {
    return (
      semantic.type === SemanticType.MATRIX ||
      semantic.type === SemanticType.VECTOR ||
      semantic.type === SemanticType.CASES
    );
  }

  /**
   * @override
   */
  constructor(semantic: SemanticNode) {
    super(semantic);
    this.mml = semantic.mathmlTree;
  }

  /**
   * @override
   */
  public getMathml() {
    const lfence = EnrichMathml.cloneContentNode(
      this.semantic.contentNodes[0] as SemanticNode
    );
    const rfence = this.semantic.contentNodes[1]
      ? EnrichMathml.cloneContentNode(
          this.semantic.contentNodes[1] as SemanticNode
        )
      : null;
    this.inner = this.semantic.childNodes.map(EnrichMathml.walkTree);
    if (!this.mml) {
      this.mml = EnrichMathml.introduceNewLayer(
        // TODO (TS): changed this here to create a single list!
        [lfence].concat(this.inner, [rfence]),
        this.semantic
      );
    } else if (DomUtil.tagName(this.mml) === MMLTAGS.MFENCED) {
      const children = this.mml.childNodes;
      this.mml.insertBefore(lfence, children[0] || null);
      rfence && this.mml.appendChild(rfence);
      this.mml = EnrichMathml.rewriteMfenced(this.mml);
    } else {
      const newChildren = [lfence, this.mml];
      rfence && newChildren.push(rfence);
      this.mml = EnrichMathml.introduceNewLayer(newChildren, this.semantic);
    }
    setAttributes(this.mml, this.semantic);
    return this.mml;
  }
}

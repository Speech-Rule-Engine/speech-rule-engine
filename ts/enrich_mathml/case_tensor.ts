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
 * @file Specialist computations to deal with tensor elements.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import { SemanticType } from '../semantic_tree/semantic_meaning.js';
import { SemanticNode } from '../semantic_tree/semantic_node.js';
import { SemanticSkeleton } from '../semantic_tree/semantic_skeleton.js';

import { CaseMultiindex } from './case_multiindex.js';
import * as EnrichMathml from './enrich_mathml.js';
import { setAttributes, Attribute } from './enrich_attr.js';

export class CaseTensor extends CaseMultiindex {
  /**
   * Applicability test of the case.
   *
   * @param semantic The semantic node.
   * @returns True if case is applicable.
   */
  public static test(semantic: SemanticNode): boolean {
    return !!semantic.mathmlTree && semantic.type === SemanticType.TENSOR;
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
    EnrichMathml.walkTree(this.semantic.childNodes[0] as SemanticNode);
    const lsub = CaseMultiindex.multiscriptIndex(this.semantic.childNodes[1]);
    const lsup = CaseMultiindex.multiscriptIndex(this.semantic.childNodes[2]);
    const rsub = CaseMultiindex.multiscriptIndex(this.semantic.childNodes[3]);
    const rsup = CaseMultiindex.multiscriptIndex(this.semantic.childNodes[4]);
    setAttributes(this.mml, this.semantic);
    const collapsed = [
      this.semantic.id,
      this.semantic.childNodes[0].id,
      lsub,
      lsup,
      rsub,
      rsup
    ];
    EnrichMathml.addCollapsedAttribute(this.mml, collapsed);
    const childIds = SemanticSkeleton.collapsedLeafs(lsub, lsup, rsub, rsup);
    childIds.unshift(this.semantic.childNodes[0].id);
    this.mml.setAttribute(Attribute.CHILDREN, childIds.join(','));
    this.completeMultiscript(
      SemanticSkeleton.interleaveIds(rsub, rsup),
      SemanticSkeleton.interleaveIds(lsub, lsup)
    );
    return this.mml;
  }
}

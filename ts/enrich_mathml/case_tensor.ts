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
 * @fileoverview Specialist computations to deal with tensor elements.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import {SemanticAttr} from '../semantic_tree/semantic_attr';
import {SemanticNode} from '../semantic_tree/semantic_node';
import * as SemanticSkeletonExports from '../semantic_tree/semantic_skeleton';
import {SemanticSkeleton} from '../semantic_tree/semantic_skeleton';

import {CaseMultiindex} from './case_multiindex';
import * as EnrichMathml from './enrich_mathml';



/**
 * @override
 * @final
 */
export class CaseTensor extends sre.CaseMultiindex {
  constructor(semantic) {
    super(semantic);
  }


  /**
   * Applicability test of the case.
   * @param semantic The semantic node.
   * @return True if case is applicable.
   */
  static test(semantic: SemanticNode): boolean {
    return !!semantic.mathmlTree && semantic.type === SemanticAttr.Type.TENSOR;
  }


  /**
   * @override
   */
  getMathml() {
    EnrichMathml.walkTree((this.semantic.childNodes[0] as SemanticNode));
    let lsub = CaseMultiindex.multiscriptIndex(this.semantic.childNodes[1]);
    let lsup = CaseMultiindex.multiscriptIndex(this.semantic.childNodes[2]);
    let rsub = CaseMultiindex.multiscriptIndex(this.semantic.childNodes[3]);
    let rsup = CaseMultiindex.multiscriptIndex(this.semantic.childNodes[4]);
    EnrichMathml.setAttributes(this.mml, this.semantic);
    let collapsed = [
      this.semantic.id, this.semantic.childNodes[0].id, lsub, lsup, rsub, rsup
    ];
    EnrichMathml.addCollapsedAttribute(this.mml, collapsed);
    let childIds = SemanticSkeleton.collapsedLeafs(lsub, lsup, rsub, rsup);
    childIds.unshift(this.semantic.childNodes[0].id);
    this.mml.setAttribute(EnrichMathml.Attribute.CHILDREN, childIds.join(','));
    this.completeMultiscript(
        SemanticSkeleton.interleaveIds(rsub, rsup),
        SemanticSkeleton.interleaveIds(lsub, lsup));
    return this.mml;
  }
}
goog.inherits(CaseTensor, CaseMultiindex);

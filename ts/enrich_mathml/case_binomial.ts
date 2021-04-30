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
 * @fileoverview Specialist computations to deal with line elements.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import {SemanticAttr} from '../semantic_tree/semantic_attr';
import {SemanticNode} from '../semantic_tree/semantic_node';

import {AbstractEnrichCase} from './abstract_enrich_case';
import * as EnrichMathml from './enrich_mathml';



/**
 * @override
 * @final
 */
export class CaseBinomial extends sre.AbstractEnrichCase {
  mml: Element;
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
    return !semantic.mathmlTree && semantic.type === SemanticType.LINE &&
        semantic.role === SemanticRole.BINOMIAL;
  }


  /**
   * @override
   */
  getMathml() {
    if (!this.semantic.childNodes.length) {
      return this.mml;
    }
    let child = this.semantic.childNodes[0];
    this.mml = EnrichMathml.walkTree((child as SemanticNode));
    // Adds a redundant mrow to include the line information.
    if (this.mml.hasAttribute(EnrichMathml.Attribute.TYPE)) {
      let mrow = sre.DomUtil.createElement('mrow');
      mrow.setAttribute(EnrichMathml.Attribute.ADDED, 'true');
      sre.DomUtil.replaceNode(this.mml, mrow);
      mrow.appendChild(this.mml);
      this.mml = mrow;
    }
    EnrichMathml.setAttributes(this.mml, this.semantic);
    return this.mml;
  }
}

goog.inherits(CaseBinomial, AbstractEnrichCase);

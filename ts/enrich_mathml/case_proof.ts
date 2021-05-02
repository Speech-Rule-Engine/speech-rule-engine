//
// Copyright 2018-21 Volker Sorge
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
 * @fileoverview Specialist computations to deal with proofs and inferences.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import {SemanticType} from '../semantic_tree/semantic_attr';
import {SemanticNode} from '../semantic_tree/semantic_node';

import {AbstractEnrichCase} from './abstract_enrich_case';
import * as EnrichMathml from './enrich_mathml';


export class CaseProof extends AbstractEnrichCase {

  /**
   * The actual mml tree.
   */
  public mml: Element;


  /**
   * Applicability test of the case.
   * @param semantic The semantic node.
   * @return True if case is applicable.
   */
  public static test(semantic: SemanticNode): boolean {
    return !!semantic.mathmlTree &&
        (semantic.type === SemanticType.INFERENCE ||
         semantic.type === SemanticType.PREMISES);
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
    if (!this.semantic.childNodes.length) {
      return this.mml;
    }
    this.semantic.contentNodes.forEach(function(x) {
      EnrichMathml.walkTree((x as SemanticNode));
      // TODO: This needs to be done more principled.
      EnrichMathml.setAttributes((x.mathmlTree as Element), x);
    });
    this.semantic.childNodes.forEach(function(x) {
      EnrichMathml.walkTree((x as SemanticNode));
    });
    EnrichMathml.setAttributes(this.mml, this.semantic);
    // TODO: The obsolete parent pointer is related to the issue above.
    if (this.mml.getAttribute('data-semantic-id') ===
        this.mml.getAttribute('data-semantic-parent')) {
      this.mml.removeAttribute('data-semantic-parent');
    }
    return this.mml;
  }
}

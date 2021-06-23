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

import {SemanticType} from '../semantic_tree/semantic_attr';
import {SemanticNode} from '../semantic_tree/semantic_node';

import {AbstractEnrichCase} from './abstract_enrich_case';
import * as EnrichMathml from './enrich_mathml';


export class CaseLine extends AbstractEnrichCase {


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
    return !!semantic.mathmlTree && semantic.type === SemanticType.LINE;
  }


  /**
   * @override
   * @final
   */
  constructor(semantic: SemanticNode) {
    super(semantic);
    this.mml = semantic.mathmlTree;
  }


  /**
   * @override
   */
  public getMathml() {
    if (this.semantic.contentNodes.length) {
      EnrichMathml.walkTree((this.semantic.contentNodes[0] as SemanticNode));
    }
    if (this.semantic.childNodes.length) {
      EnrichMathml.walkTree((this.semantic.childNodes[0] as SemanticNode));
    }
    EnrichMathml.setAttributes(this.mml, this.semantic);
    return this.mml;
  }
}

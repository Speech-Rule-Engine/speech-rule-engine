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
 * @file Specialist computations to deal collapsed script elements steming from
 *    the combineScripts heuristics.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import { SemanticNode } from '../semantic_tree/semantic_node.js';
import { AbstractEnrichCase } from './abstract_enrich_case.js';
import { introduceNewLayer, walkTree } from './enrich_mathml.js';
import { setAttributes } from './enrich_attr.js';

export class CaseCollapsedScript extends AbstractEnrichCase {

  /**
   * Applicability test of the case. In our case all elements that have a
   * collapsed annotation.
   *
   * @param semantic The semantic node.
   * @returns True if case is applicable.
   */
  public static test(semantic: SemanticNode): boolean {
    const ann = semantic.getAnnotation('collapsed');
    if (!ann.length) {
      return false;
    }
    return semantic.mathmlTree?.parentNode?.childNodes.length > 2;
  }

  /**
   * @override
   */
  public getMathml() {
    walkTree(this.semantic.childNodes[0]);
    walkTree(this.semantic.childNodes[1]);
    const collapsed = this.semantic.mathmlTree;
    const script = this.semantic.childNodes[0].mathmlTree;
    const newNode = introduceNewLayer([script, collapsed], this.semantic);
    setAttributes(newNode, this.semantic);
    return newNode;
  }
}

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
 * @file Specialist computations to deal with proofs and inferences.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import * as DomUtil from '../common/dom_util.js';
import { SemanticType } from '../semantic_tree/semantic_meaning.js';
import { SemanticNode } from '../semantic_tree/semantic_node.js';

import { AbstractEnrichCase } from './abstract_enrich_case.js';
import * as EnrichMathml from './enrich_mathml.js';
import { Attribute, EnrichAttributes, setAttributes } from './enrich_attr.js';

export class CaseProof extends AbstractEnrichCase {
  /**
   * The actual mml tree.
   */
  public mml: Element;

  /**
   * Applicability test of the case.
   *
   * @param semantic The semantic node.
   * @returns True if case is applicable.
   */
  public static test(semantic: SemanticNode): boolean {
    return (
      !!semantic.mathmlTree &&
      (semantic.type === SemanticType.INFERENCE ||
        semantic.type === SemanticType.PREMISES)
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
    if (!this.semantic.childNodes.length) {
      return this.mml;
    }
    this.semantic.contentNodes.forEach(function (x) {
      const walked = EnrichMathml.walkTree(x as SemanticNode);
      // TODO: This needs to be done more principled.
      // The walk can annotate a sole-child wrapper element above the label's
      // own mathmlTree. As the label is annotated on its mathmlTree below,
      // remove such stray annotations, so the semantic id is not duplicated
      // in the enriched expression.
      const strays = DomUtil.querySelectorAllByAttrValue(
        walked,
        Attribute.ID,
        x.id.toString()
      );
      if (walked.getAttribute(Attribute.ID) === x.id.toString()) {
        strays.unshift(walked);
      }
      strays.forEach((stray) => {
        if (stray !== x.mathmlTree) {
          EnrichAttributes.forEach((attr) => stray.removeAttribute(attr));
        }
      });
      setAttributes(x.mathmlTree as Element, x);
    });
    this.semantic.childNodes.forEach(function (x) {
      EnrichMathml.walkTree(x as SemanticNode);
    });
    setAttributes(this.mml, this.semantic);
    return this.mml;
  }
}

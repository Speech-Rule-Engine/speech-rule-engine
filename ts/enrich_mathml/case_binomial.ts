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
 * @file Specialist computations to deal with line elements.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import * as DomUtil from '../common/dom_util.js';
import {
  SemanticRole,
  SemanticType
} from '../semantic_tree/semantic_meaning.js';
import { SemanticNode } from '../semantic_tree/semantic_node.js';
import { AbstractEnrichCase } from './abstract_enrich_case.js';
import { walkTree } from './enrich_mathml.js';
import { addMrow, setAttributes, Attribute } from './enrich_attr.js';

export class CaseBinomial extends AbstractEnrichCase {
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
      !semantic.mathmlTree &&
      semantic.type === SemanticType.LINE &&
      semantic.role === SemanticRole.BINOMIAL
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
    const child = this.semantic.childNodes[0];
    this.mml = walkTree(child as SemanticNode);
    // Adds a redundant mrow to include the line information.
    if (this.mml.hasAttribute(Attribute.TYPE)) {
      const mrow = addMrow();
      DomUtil.replaceNode(this.mml, mrow);
      mrow.appendChild(this.mml);
      this.mml = mrow;
    }
    setAttributes(this.mml, this.semantic);
    return this.mml;
  }
}

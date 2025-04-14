//
// Copyright 2020-21 Volker Sorge
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
 * @file Specialist computations to deal with restructured limit
 *     elements.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import * as DomUtil from '../common/dom_util.js';
import { SemanticType } from '../semantic_tree/semantic_meaning.js';
import { SemanticNode } from '../semantic_tree/semantic_node.js';
import { MMLTAGS } from '../semantic_tree/semantic_util.js';

import { AbstractEnrichCase } from './abstract_enrich_case.js';
import * as EnrichMathml from './enrich_mathml.js';
import { setAttributes } from './enrich_attr.js';
export class CaseLimit extends AbstractEnrichCase {
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
    if (!semantic.mathmlTree || !semantic.childNodes.length) {
      return false;
    }
    const mmlTag = DomUtil.tagName(semantic.mathmlTree);
    const type = semantic.type;
    return (
      ((type === SemanticType.LIMUPPER || type === SemanticType.LIMLOWER) &&
        (mmlTag === MMLTAGS.MSUBSUP || mmlTag === MMLTAGS.MUNDEROVER)) ||
      (type === SemanticType.LIMBOTH &&
        (mmlTag === MMLTAGS.MSUB ||
          mmlTag === MMLTAGS.MUNDER ||
          mmlTag === MMLTAGS.MSUP ||
          mmlTag === MMLTAGS.MOVER))
    );
  }

  /**
   * Enriches a semantic node if it is given.
   *
   * @param node The semantic node.
   */
  private static walkTree_(node: SemanticNode) {
    if (node) {
      EnrichMathml.walkTree(node as SemanticNode);
    }
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
    const children = this.semantic.childNodes;
    if (
      this.semantic.type !== SemanticType.LIMBOTH &&
      this.mml.childNodes.length >= 3
    ) {
      // Extra layer only necessary if a split upper/lower script. Second
      // condition excludes incomplete elements.
      this.mml = EnrichMathml.introduceNewLayer([this.mml], this.semantic);
    }
    setAttributes(this.mml, this.semantic);
    if (!children[0].mathmlTree) {
      children[0].mathmlTree = this.semantic.mathmlTree;
    }
    children.forEach(CaseLimit.walkTree_);
    return this.mml;
  }
}

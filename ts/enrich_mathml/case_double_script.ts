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
 * @file Specialist computations to deal with double script elements.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import * as DomUtil from '../common/dom_util.js';
import { SemanticRole } from '../semantic_tree/semantic_meaning.js';
import { SemanticNode } from '../semantic_tree/semantic_node.js';
import { MMLTAGS } from '../semantic_tree/semantic_util.js';

import { AbstractEnrichCase } from './abstract_enrich_case.js';
import * as EnrichMathml from './enrich_mathml.js';
import { makeIdList, setAttributes, Attribute } from './enrich_attr.js';

export class CaseDoubleScript extends AbstractEnrichCase {
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
    const role = semantic.childNodes[0].role;
    return (
      (mmlTag === MMLTAGS.MSUBSUP && role === SemanticRole.SUBSUP) ||
      (mmlTag === MMLTAGS.MUNDEROVER && role === SemanticRole.UNDEROVER)
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
    const ignore = this.semantic.childNodes[0];
    const baseSem = ignore.childNodes[0] as SemanticNode;
    const supSem = this.semantic.childNodes[1] as SemanticNode;
    const subSem = ignore.childNodes[1] as SemanticNode;
    const supMml = EnrichMathml.walkTree(supSem);
    const baseMml = EnrichMathml.walkTree(baseSem);
    const subMml = EnrichMathml.walkTree(subSem);
    setAttributes(this.mml, this.semantic);
    this.mml.setAttribute(
      Attribute.CHILDREN,
      makeIdList([baseSem, subSem, supSem])
    );
    [baseMml, subMml, supMml].forEach((child) =>
      EnrichMathml.getInnerNode(child).setAttribute(
        Attribute.PARENT,
        this.mml.getAttribute(Attribute.ID)
      )
    );
    this.mml.setAttribute(Attribute.TYPE, ignore.role);
    EnrichMathml.addCollapsedAttribute(this.mml, [
      this.semantic.id,
      [ignore.id, baseSem.id, subSem.id],
      supSem.id
    ]);
    return this.mml;
  }
}

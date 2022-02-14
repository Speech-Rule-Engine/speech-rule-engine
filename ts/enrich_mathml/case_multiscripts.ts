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
 * @file Specialist computations to deal with multiscripts elements.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import * as DomUtil from '../common/dom_util.js';
import { SemanticRole, SemanticType } from '../semantic_tree/semantic_meaning.js';
import { SemanticNode } from '../semantic_tree/semantic_node.js';
import { SemanticSkeleton } from '../semantic_tree/semantic_skeleton.js';
import { CaseMultiindex } from './case_multiindex.js';
import * as EnrichMathml from './enrich_mathml.js';
import { setAttributes, Attribute } from './enrich_attr.js';

export class CaseMultiscripts extends CaseMultiindex {
  /**
   * Applicability test of the case.
   *
   * @param semantic The semantic node.
   * @returns True if case is applicable.
   */
  public static test(semantic: SemanticNode): boolean {
    if (!semantic.mathmlTree) {
      return false;
    }
    const mmlTag = DomUtil.tagName(semantic.mathmlTree);
    return (
      mmlTag === 'MMULTISCRIPTS' &&
      (semantic.type === SemanticType.SUPERSCRIPT ||
        semantic.type === SemanticType.SUBSCRIPT)
    );
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
    setAttributes(this.mml, this.semantic);
    let baseSem, rsup, rsub;
    if (
      this.semantic.childNodes[0] &&
      this.semantic.childNodes[0].role === SemanticRole.SUBSUP
    ) {
      const ignore = this.semantic.childNodes[0];
      baseSem = ignore.childNodes[0];
      rsup = CaseMultiindex.multiscriptIndex(this.semantic.childNodes[1]);
      rsub = CaseMultiindex.multiscriptIndex(ignore.childNodes[1]);
      const collapsed = [this.semantic.id, [ignore.id, baseSem.id, rsub], rsup];
      EnrichMathml.addCollapsedAttribute(this.mml, collapsed);
      this.mml.setAttribute(Attribute.TYPE, ignore.role);
      this.completeMultiscript(SemanticSkeleton.interleaveIds(rsub, rsup), []);
    } else {
      baseSem = this.semantic.childNodes[0];
      rsup = CaseMultiindex.multiscriptIndex(this.semantic.childNodes[1]);
      const collapsed = [this.semantic.id, baseSem.id, rsup];
      EnrichMathml.addCollapsedAttribute(this.mml, collapsed);
    }
    const childIds = SemanticSkeleton.collapsedLeafs(rsub || [], rsup);
    const base = EnrichMathml.walkTree(baseSem as SemanticNode);
    EnrichMathml.getInnerNode(base).setAttribute(
      Attribute.PARENT,
      this.semantic.id.toString()
    );
    childIds.unshift(baseSem.id);
    this.mml.setAttribute(Attribute.CHILDREN, childIds.join(','));
    return this.mml;
  }
}

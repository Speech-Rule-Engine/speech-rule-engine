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
 * @fileoverview Specialist computations to deal with multiscripts elements.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import * as DomUtil from '../common/dom_util';
import {SemanticAttr} from '../semantic_tree/semantic_attr';
import {SemanticNode} from '../semantic_tree/semantic_node';

import {CaseMultiindex} from './case_multiindex';
import * as EnrichMathml from './enrich_mathml';



/**
 * @override
 * @final
 */
export class CaseMultiscripts extends sre.CaseMultiindex {
  constructor(semantic) {
    super(semantic);
  }


  /**
   * Applicability test of the case.
   * @param semantic The semantic node.
   * @return True if case is applicable.
   */
  static test(semantic: SemanticNode): boolean {
    if (!semantic.mathmlTree) {
      return false;
    }
    let mmlTag = DomUtil.tagName(semantic.mathmlTree);
    return mmlTag === 'MMULTISCRIPTS' &&
        (semantic.type === SemanticAttr.Type.SUPERSCRIPT ||
         semantic.type === SemanticAttr.Type.SUBSCRIPT);
  }


  /**
   * @override
   */
  getMathml() {
    EnrichMathml.setAttributes(this.mml, this.semantic);
    if (this.semantic.childNodes[0] &&
        this.semantic.childNodes[0].role === SemanticAttr.Role.SUBSUP) {
      let ignore = this.semantic.childNodes[0];
      let baseSem = ignore.childNodes[0];
      let rsup = CaseMultiindex.multiscriptIndex(this.semantic.childNodes[1]);
      let rsub = CaseMultiindex.multiscriptIndex(ignore.childNodes[1]);
      let collapsed = [this.semantic.id, [ignore.id, baseSem.id, rsub], rsup];
      EnrichMathml.addCollapsedAttribute(this.mml, collapsed);
      this.mml.setAttribute(EnrichMathml.Attribute.TYPE, ignore.role);
      this.completeMultiscript(
          sre.SemanticSkeleton.interleaveIds(rsub, rsup), []);
    } else {
      let baseSem = this.semantic.childNodes[0];
      let rsup = CaseMultiindex.multiscriptIndex(this.semantic.childNodes[1]);
      let collapsed = [this.semantic.id, baseSem.id, rsup];
      EnrichMathml.addCollapsedAttribute(this.mml, collapsed);
    }
    let childIds = sre.SemanticSkeleton.collapsedLeafs(rsub || [], rsup);
    let base = EnrichMathml.walkTree((baseSem as SemanticNode));
    EnrichMathml.getInnerNode(base).setAttribute(
        EnrichMathml.Attribute.PARENT, this.semantic.id);
    childIds.unshift(baseSem.id);
    this.mml.setAttribute(EnrichMathml.Attribute.CHILDREN, childIds.join(','));
    return this.mml;
  }
}
goog.inherits(CaseMultiscripts, CaseMultiindex);

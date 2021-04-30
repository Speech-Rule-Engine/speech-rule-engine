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
 * @fileoverview Specialist computations to deal with double script elements.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import * as DomUtil from '../common/dom_util';
import {SemanticAttr} from '../semantic_tree/semantic_attr';
import {SemanticNode} from '../semantic_tree/semantic_node';

import {AbstractEnrichCase} from './abstract_enrich_case';
import * as EnrichMathml from './enrich_mathml';



/**
 * @override
 * @final
 */
export class CaseDoubleScript extends sre.AbstractEnrichCase {
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
    if (!semantic.mathmlTree || !semantic.childNodes.length) {
      return false;
    }
    let mmlTag = DomUtil.tagName(semantic.mathmlTree);
    let role = semantic.childNodes[0].role;
    return mmlTag === 'MSUBSUP' && role === SemanticRole.SUBSUP ||
        mmlTag === 'MUNDEROVER' && role === SemanticRole.UNDEROVER;
  }


  /**
   * @override
   */
  getMathml() {
    let ignore = this.semantic.childNodes[0];
    let baseSem = (ignore.childNodes[0] as SemanticNode);
    let supSem = (this.semantic.childNodes[1] as SemanticNode);
    let subSem = (ignore.childNodes[1] as SemanticNode);
    let supMml = EnrichMathml.walkTree(supSem);
    let baseMml = EnrichMathml.walkTree(baseSem);
    let subMml = EnrichMathml.walkTree(subSem);
    EnrichMathml.setAttributes(this.mml, this.semantic);
    this.mml.setAttribute(
        EnrichMathml.Attribute.CHILDREN,
        EnrichMathml.makeIdList([baseSem, subSem, supSem]));
    [baseMml, subMml, supMml].forEach(goog.bind(function(child) {
      EnrichMathml.getInnerNode(child).setAttribute(
          EnrichMathml.Attribute.PARENT,
          this.mml.getAttribute(EnrichMathml.Attribute.ID));
    }, this));
    this.mml.setAttribute(EnrichMathml.Attribute.TYPE, ignore.role);
    EnrichMathml.addCollapsedAttribute(
        this.mml,
        [this.semantic.id, [ignore.id, baseSem.id, subSem.id], supSem.id]);
    return this.mml;
  }
}

goog.inherits(CaseDoubleScript, AbstractEnrichCase);

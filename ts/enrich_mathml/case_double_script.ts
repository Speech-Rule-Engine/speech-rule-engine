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
import {SemanticRole} from '../semantic_tree/semantic_attr';
import {SemanticNode} from '../semantic_tree/semantic_node';

import {AbstractEnrichCase} from './abstract_enrich_case';
import * as EnrichMathml from './enrich_mathml';


export class CaseDoubleScript extends AbstractEnrichCase {

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
    [baseMml, subMml, supMml].forEach((child) =>
      EnrichMathml.getInnerNode(child).setAttribute(
          EnrichMathml.Attribute.PARENT,
        this.mml.getAttribute(EnrichMathml.Attribute.ID)));
    this.mml.setAttribute(EnrichMathml.Attribute.TYPE, ignore.role);
    EnrichMathml.addCollapsedAttribute(
        this.mml,
        [this.semantic.id, [ignore.id, baseSem.id, subSem.id], supSem.id]);
    return this.mml;
  }
}

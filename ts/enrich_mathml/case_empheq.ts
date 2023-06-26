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
 * @file Specialist computations to deal with tables from empheq.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import { SemanticNode } from '../semantic_tree/semantic_node.js';
import { AbstractEnrichCase } from './abstract_enrich_case.js';
import * as EnrichMathml from './enrich_mathml.js';
import { addMrow, setAttributes } from './enrich_attr.js';
import * as DomUtil from '../common/dom_util.js';

export class CaseEmpheq extends AbstractEnrichCase {
  /**
   * The actual mml tree.
   */
  public mml: Element;

  private mrows: Element[] = [];

  /**
   * Applicability test of the case.
   *
   * @param semantic The semantic node.
   * @returns True if case is applicable.
   */
  public static test(semantic: SemanticNode): boolean {
    return !!semantic.mathmlTree && semantic.hasAnnotation('Emph', 'top');
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
    // Basic idea:
    // Recurse until we find the table.
    // Every node that has a mathmlTree should be inserted directly.
    // For every node that does not have one a new mrow is inserted.
    // For every added operation (implicit, dummy) a new mo is inserted.
    // Only insert new mrows without children.
    this.recurseToTable(this.semantic);
    if (this.mrows.length) {
      const newRow = addMrow();
      const parent = this.mml.parentNode;
      parent.insertBefore(newRow, this.mml);
      for (const mrow of this.mrows) {
        newRow.appendChild(mrow);
      }
      newRow.appendChild(this.mml);
    }
    return this.mml;
  }

  private recurseToTable(node: SemanticNode) {
    if (
      !(
        node.hasAnnotation('Emph', 'top') || node.hasAnnotation('Emph', 'fence')
      ) &&
      (node.hasAnnotation('Emph', 'left') ||
        node.hasAnnotation('Emph', 'right'))
    ) {
      EnrichMathml.walkTree(node);
      return;
    }
    if (
      !node.mathmlTree ||
      (DomUtil.tagName(node.mathmlTree) === 'MTABLE' &&
        node.annotation['Emph']?.length &&
        node.annotation['Emph'][0] !== 'table')
    ) {
      // Add an empty mrow.
      const newNode = addMrow();
      setAttributes(newNode, node);
      this.mrows.unshift(newNode);
    } else {
      if (
        DomUtil.tagName(node.mathmlTree) === 'MTABLE' &&
        node.annotation['Emph']?.length &&
        node.annotation['Emph'][0] === 'table'
      ) {
        this.finalizeTable(node);
        return;
      }
      setAttributes(node.mathmlTree, node);
    }
    node.childNodes.forEach(this.recurseToTable.bind(this));
    if (node.textContent || node.type === 'punctuated') {
      const newContent = node.contentNodes.map((x) => {
        const newNode = EnrichMathml.cloneContentNode(x);
        if (newNode.hasAttribute('data-semantic-added')) {
          this.mrows.unshift(newNode);
        } else {
          this.recurseToTable(x);
        }
        return newNode;
      });
      EnrichMathml.setOperatorAttribute(node, newContent);
      return;
    }
    node.contentNodes.forEach(this.recurseToTable.bind(this));
  }

  private finalizeTable(node: SemanticNode) {
    setAttributes(node.mathmlTree, node);
    node.contentNodes.forEach((x) => {
      EnrichMathml.walkTree(x);
    });
    node.childNodes.forEach((x) => {
      EnrichMathml.walkTree(x);
    });
  }
}

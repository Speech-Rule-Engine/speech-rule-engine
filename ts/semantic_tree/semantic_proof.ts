//
// Copyright 2023-26 Volker Sorge
//
// Licensed under the Apache License, Version 2.0 (the "License");
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
 * @file A parser for proofs and inference rules (Simons).
 *
 * Proofs are parsed top down from the semantics attributes bussproofs
 * generates, so the regular bottom-up parser has to be kept available.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import * as DomUtil from '../common/dom_util.js';
import { SemanticRole, SemanticType } from './semantic_meaning.js';
import { SemanticNode } from './semantic_node.js';
import { SemanticNodeFactory } from './semantic_node_factory.js';
import { MMLTAGS } from './semantic_util.js';

type Semantics = { [key: string]: string };

export class SemanticProofParser {
  /**
   * A parser for a single proof, sharing the state of the bottom-up parser.
   *
   * @param factory The semantic node factory of the current parse.
   * @param parse The current semantic parser for lists of nodes.
   * @param row The row processor combining lists of semantic nodes.
   */
  constructor(
    private factory: SemanticNodeFactory,
    private parse: (nodes: Element[]) => SemanticNode[],
    private row: (nodes: SemanticNode[]) => SemanticNode
  ) {}

  /**
   * Parses a proof node.
   *
   * @param node The node.
   * @param semantics Its semantics attribute value.
   * @returns The semantic node for the proof.
   */
  public proof(node: Element, semantics: string): SemanticNode {
    const attrs = separateSemantics(semantics);
    if (attrs['axiom']) {
      return this.axiom(node, attrs);
    }
    const inference = this.inference(node, attrs);
    if (attrs['proof']) {
      inference.role = SemanticRole.PROOF;
      inference.childNodes[0].role = SemanticRole.FINAL;
    }
    return inference;
  }

  /**
   * Parses an axiom node, i.e., an inference rule without premises.
   *
   * @param node The node.
   * @param semantics Association of semantic keys to values.
   * @returns The semantic node for the axiom.
   */
  private axiom(node: Element, semantics: Semantics): SemanticNode {
    let axiom: SemanticNode;
    if (semantics['sequent']) {
      axiom = this.factory.makeBranchNode(
        SemanticType.INFERENCE,
        [this.getSequent(node.childNodes[0])],
        []
      );
    } else {
      const cleaned = this.cleanInference(node.childNodes);
      axiom = cleaned.length
        ? this.factory.makeBranchNode(
            SemanticType.INFERENCE,
            this.parse(cleaned),
            []
          )
        : this.factory.makeEmptyNode();
    }
    axiom.role = SemanticRole.AXIOM;
    axiom.mathmlTree = node;
    return axiom;
  }

  /**
   * Parses a single inference node.
   *
   * @param node The node.
   * @param semantics Association of semantic keys to values.
   * @returns The semantic node for the inference.
   */
  private inference(node: Element, semantics: Semantics): SemanticNode {
    if (semantics['inferenceRule']) {
      const formulas = this.getFormulas(node, []);
      return this.factory.makeBranchNode(
        SemanticType.INFERENCE,
        [formulas.conclusion, formulas.premises],
        []
      );
    }
    const label = semantics['labelledRule'];
    const children = DomUtil.toArray(node.childNodes);
    const content = [SemanticRole.LEFT, SemanticRole.RIGHT]
      .filter((side) => label === side || label === 'both')
      .map((side) => this.getLabel(children, side))
      .filter((sem) => sem);
    const formulas = this.getFormulas(node, children);
    const inference = this.factory.makeBranchNode(
      SemanticType.INFERENCE,
      [formulas.conclusion, formulas.premises],
      content
    );
    inference.mathmlTree = node;
    return inference;
  }

  /**
   * Parses the label of an inference rule.
   *
   * @param children The inference node's children containing the label.
   * @param side The side the label is on.
   * @returns The semantic node for the label, or null if none was found.
   */
  private getLabel(
    children: Element[],
    side: SemanticRole
  ): SemanticNode | null {
    const label = this.findNestedRow(children, 'prooflabel', side);
    if (!label) {
      return null;
    }
    const sem = this.factory.makeBranchNode(
      SemanticType.RULELABEL,
      this.parse(DomUtil.toArray(label.childNodes)),
      []
    );
    sem.role = side;
    sem.mathmlTree = label;
    return sem;
  }

  /**
   * Retrieves and parses premises and conclusion of an inference rule.
   *
   * @param node The inference rule node.
   * @param children The node's children containing the formulas.
   * @returns A pair of conclusion and premises.
   */
  private getFormulas(
    node: Element,
    children: Element[]
  ): { conclusion: SemanticNode; premises: SemanticNode } {
    const inf = children.length
      ? this.findNestedRow(children, 'inferenceRule') ||
        children.find((child) => DomUtil.tagName(child) === MMLTAGS.MTABLE) ||
        node
      : node;
    const up = getSemantics(inf)['inferenceRule'] === 'up';
    const premRow = up ? inf.childNodes[1] : inf.childNodes[0];
    const concRow = up ? inf.childNodes[0] : inf.childNodes[1];
    const premTable = premRow.childNodes[0].childNodes[0];
    const topRow = DomUtil.toArray(premTable.childNodes[0].childNodes);
    // Every second cell is a spacer column.
    const premises = topRow
      .filter((_cell, index) => !(index % 2))
      .map((cell) => this.formula([cell.childNodes[0]]));
    const concs = DomUtil.toArray(concRow.childNodes[0].childNodes);
    const conclusion = this.formula(concs);
    const prem = this.factory.makeBranchNode(
      SemanticType.PREMISES,
      premises,
      []
    );
    prem.mathmlTree = premTable as Element;
    const conc = this.factory.makeBranchNode(
      SemanticType.CONCLUSION,
      [conclusion],
      []
    );
    conc.mathmlTree = concRow.childNodes[0].childNodes[0] as Element;
    return { conclusion: conc, premises: prem };
  }

  /**
   * Parses a formula of an inference rule. Sequent axioms are handled by the
   * axiom case of the proof method, which the parser dispatches to.
   *
   * @param nodes The node list constituting the formula.
   * @returns The semantic node for the formula.
   */
  private formula(nodes: Element[]): SemanticNode {
    const semantics = getSemantics(nodes[0]);
    return semantics && semantics['sequent'] && !semantics['axiom']
      ? this.getSequent(nodes[0].childNodes[0])
      : this.parse(nodes)[0];
  }

  /**
   * Searches the given row of elements for the first element with the given
   * semantic key or key/value pair if a value is given. Ignores space elements
   * and descends at most 3 levels.
   *
   * @param nodes A node list.
   * @param semantic A semantic key.
   * @param value Optionally the semantic value.
   * @param level The current nesting level.
   * @returns The first matching element in the row.
   */
  private findNestedRow(
    nodes: Element[],
    semantic: string,
    value?: string,
    level: number = 0
  ): Element {
    if (level > 3) {
      return null;
    }
    for (let i = 0, node; (node = nodes[i]); i++) {
      const tag = DomUtil.tagName(node);
      if (tag === MMLTAGS.MSPACE) {
        continue;
      }
      if (tag === MMLTAGS.MROW) {
        return this.findNestedRow(
          DomUtil.toArray(node.childNodes),
          semantic,
          value,
          level + 1
        );
      }
      if (findSemantics(node, semantic, value)) {
        return node;
      }
    }
    return null;
  }

  /**
   * Cleans and assembles sequent nodes.
   *
   * @param node The sequent node.
   * @returns The semantic node for the sequent, with empty nodes if necessary.
   */
  private getSequent(node: Node): SemanticNode {
    const getChildren = (index: number) => {
      const child = node.childNodes[index];
      return child
        ? this.row(this.parse(this.cleanInference(child.childNodes)))
        : this.factory.makeEmptyNode();
    };
    const newNode = this.factory.makeBranchNode(
      SemanticType.RELSEQ,
      [getChildren(0), getChildren(2)],
      [getChildren(1)]
    );
    newNode.role = SemanticRole.SEQUENT;
    newNode.mathmlTree = node as Element;
    return newNode;
  }

  /**
   * Removes mspaces in a row.
   *
   * @param nodes The list of nodes.
   * @returns The list with all space elements removed.
   */
  private cleanInference(nodes: NodeList): Element[] {
    return DomUtil.toArray(nodes).filter(
      (node) => DomUtil.tagName(node) !== MMLTAGS.MSPACE
    );
  }
}

/**
 * Separates a semantic attribute into its components.
 *
 * @param attr Content of the semantic attribute.
 * @returns Association list of semantic attributes.
 */
function separateSemantics(attr: string): Semantics {
  const result: Semantics = {};
  attr.split(';').forEach((sem) => {
    const [name, value] = sem.split(':');
    result[removePrefix(name)] = value;
  });
  return result;
}

/**
 * Removes the prefix from a semantic attribute.
 *
 * @param name The semantic attribute.
 * @returns Name with prefix removed.
 */
function removePrefix(name: string): string {
  const [, ...rest] = name.split('_');
  return rest.join('_');
}

/**
 * Retrieves the content of a semantic attribute in a node as an association
 * list.
 *
 * @param node The mml node.
 * @returns The association list.
 */
function getSemantics(node: Element): Semantics {
  const semantics = node.getAttribute('semantics');
  return semantics ? separateSemantics(semantics) : null;
}

/**
 * Checks if a semantic attribute is in the node.
 *
 * @param node The mml node.
 * @param attr The attribute name.
 * @param value Optionally the attribute value.
 * @returns True if the semantic attribute is in the node.
 */
function findSemantics(node: Element, attr: string, value?: string): boolean {
  const semantics = getSemantics(node);
  if (!semantics || !semantics[attr]) {
    return false;
  }
  return value == null ? true : semantics[attr] === value;
}

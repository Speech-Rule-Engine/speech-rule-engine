//
// Copyright 2013 Google Inc.
// Copyright 2014-21 Volker Sorge
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
 * @file A semantic tree for MathML expressions.
 *
 * This file contains functionality to compute a semantic interpretation from a
 * given MathML expression. This is a very heuristic approach that assumes a
 * fairly simple default semantic which is suitable for K-12 and simple UG
 * mathematics.
 * @author sorge@google.com (Volker Sorge)
 */

import * as DomUtil from '../common/dom_util';

import { annotate } from './semantic_annotations';
import { SemanticVisitor } from './semantic_annotator';
import { SemanticRole, SemanticType } from './semantic_meaning';
import { SemanticMeaningCollator } from './semantic_default';
import { SemanticMathml } from './semantic_mathml';
import { SemanticNode } from './semantic_node';
import { SemanticParser } from './semantic_parser';
import * as SemanticPred from './semantic_pred';
import './semantic_heuristics';

export class SemanticTree {
  /**
   * The root of the tree.
   */
  public parser: SemanticParser<Element> = new SemanticMathml();

  /**
   * The root of the tree.
   */
  public root: SemanticNode;

  /**
   * The root of the tree.
   */
  public collator: SemanticMeaningCollator;

  /**
   * Generate an empty semantic tree.
   *
   * @returns The empty semantic tree.
   */
  public static empty(): SemanticTree {
    const empty = DomUtil.parseInput('<math/>');
    const stree = new SemanticTree(empty);
    stree.mathml = empty;
    return stree;
  }

  /**
   * Generate a semantic tree for a given node.
   *
   * @param semantic The semantic node that will become
   *     the root.
   * @param opt_mathml Optionally a MathML node corresponding to the
   *     semantic node.
   * @returns The empty semantic tree.
   */
  public static fromNode(
    semantic: SemanticNode,
    opt_mathml?: Element
  ): SemanticTree {
    const stree = SemanticTree.empty();
    stree.root = semantic;
    if (opt_mathml) {
      stree.mathml = opt_mathml;
    }
    return stree;
  }

  /**
   * Generate a semantic tree for a given node
   *
   * @param semantic The semantic node that will become
   *     the root.
   * @param opt_mathml Optionally a MathML node corresponding to the
   *     semantic node.
   * @returns The empty semantic tree.
   */
  public static fromRoot(
    semantic: SemanticNode,
    opt_mathml?: Element
  ): SemanticTree {
    let root = semantic;
    while (root.parent) {
      root = root.parent;
    }
    const stree = SemanticTree.fromNode(root);
    if (opt_mathml) {
      stree.mathml = opt_mathml;
    }
    return stree;
  }

  /**
   * Generates a semantic tree from its XML representation.
   *
   * @param xml The XML representation.
   * @returns The generated semantic tree.
   */
  public static fromXml(xml: Element): SemanticTree {
    const stree = SemanticTree.empty();
    if (xml.childNodes[0]) {
      stree.root = SemanticNode.fromXml(xml.childNodes[0] as Element);
    }
    return stree;
  }

  /**
   * Create an initial semantic tree.
   *
   * @param mathml The original MathML node.
   */
  constructor(public mathml: Element) {
    this.root = this.parser.parse(mathml);
    this.collator = this.parser.getFactory().leafMap.collateMeaning();

    const newDefault = this.collator.newDefault();
    if (newDefault) {
      // Reparse!
      this.parser = new SemanticMathml();
      this.parser.getFactory().defaultMap = newDefault;
      this.root = this.parser.parse(mathml);
    }
    unitVisitor.visit(this.root, {});

    annotate(this.root);
  }

  /**
   * Returns an XML representation of the tree.
   *
   * @param opt_brief If set attributes are omitted.
   * @returns The XML representation of the tree.
   */
  public xml(opt_brief?: boolean): Element {
    const xml = DomUtil.parseInput('<stree></stree>');
    const xmlRoot = this.root.xml(xml.ownerDocument, opt_brief);
    xml.appendChild(xmlRoot);
    return xml;
  }

  /**
   * Serializes the XML representation of the tree.
   *
   * @param opt_brief If set attributes are omitted.
   * @returns Serialized string.
   */
  public toString(opt_brief?: boolean): string {
    return DomUtil.serializeXml(this.xml(opt_brief));
  }

  /**
   * Pretty print the XML representation of the tree.
   *
   * @param opt_brief If set attributes are omitted.
   * @returns The formatted string.
   */
  public formatXml(opt_brief?: boolean): string {
    const xml = this.toString(opt_brief);
    return DomUtil.formatXml(xml);
  }

  /**
   * Convenience method to display the whole tree and its elements.
   */
  public displayTree() {
    this.root.displayTree();
  }

  /**
   * Replaces a node in the tree. Updates the root node if necessary.
   *
   * @param oldNode The node to be replaced.
   * @param newNode The new node.
   */
  public replaceNode(oldNode: SemanticNode, newNode: SemanticNode) {
    const parent = oldNode.parent;
    if (!parent) {
      this.root = newNode;
      return;
    }
    parent.replaceChild(oldNode, newNode);
  }

  /**
   * Turns tree into JSON format.
   *
   * @returns The JSON object for the tree.
   */
  // TODO (TS): JSON type.
  public toJson(): any {
    const json = {} as any;
    json['stree'] = this.root.toJson();
    return json;
  }
}

/**
 * Visitor to propagate unit expressions if possible.
 */
const unitVisitor = new SemanticVisitor('general', 'unit', (node, _info) => {
  if (
    node.type === SemanticType.INFIXOP &&
    (node.role === SemanticRole.MULTIPLICATION ||
      node.role === SemanticRole.IMPLICIT)
  ) {
    const children = node.childNodes;
    if (
      children.length &&
      (SemanticPred.isPureUnit(children[0]) ||
        SemanticPred.isUnitCounter(children[0])) &&
      node.childNodes.slice(1).every(SemanticPred.isPureUnit)
    ) {
      node.role = SemanticRole.UNIT;
    }
  }
  return false;
});

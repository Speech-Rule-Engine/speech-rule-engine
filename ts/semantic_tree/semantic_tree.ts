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
 * @fileoverview A semantic tree for MathML expressions.
 *
 * This file contains functionality to compute a semantic interpretation from a
 * given MathML expression. This is a very heuristic approach that assumes a
 * fairly simple default semantic which is suitable for K-12 and simple UG
 * mathematics.
 *
 * @author sorge@google.com (Volker Sorge)
 */

import * as DomUtil from '../common/dom_util';
import {SystemExternal} from '../common/system_external';

import {SemanticAnnotations} from './semantic_annotations';
import {SemanticVisitor} from './semantic_annotator';
import {SemanticMathml} from './semantic_mathml';
import {SemanticNode} from './semantic_node';
import {SemanticParser} from './semantic_parser';



/**
 * Create an initial semantic tree.
 * @param mml The original MathML node.
 */
export class SemanticTree {
  private static unitVisitor_: SemanticVisitor;

  mathml: Node;

  parser: SemanticParser;

  root: SemanticNode;

  collator: any;
  constructor(mml: Element) {
    /**
     * Original MathML tree.
     */
    this.mathml = mml;
    this.parser = new SemanticMathml();
    this.root = this.parser.parse(mml);
    this.collator = this.parser.getFactory().leafMap.collateMeaning();

    let newDefault = this.collator.newDefault();
    if (newDefault) {
      // Reparse!
      this.parser = new SemanticMathml();
      this.parser.getFactory().defaultMap = newDefault;
      this.root = this.parser.parse(mml);
    }
    SemanticTree.unitVisitor_.visit(this.root, {});

    SemanticAnnotations.getInstance().annotate(this.root);
  }


  /**
   * Generate an empty semantic tree.
   * @return The empty semantic tree.
   */
  static empty(): SemanticTree {
    let empty = DomUtil.parseInput('<math/>');
    let stree = new SemanticTree(empty);
    stree.mathml = empty;
    return stree;
  }


  /**
   * Generate a semantic tree for a given node.
   * @param semantic The semantic node that will become
   *     the root.
   * @param opt_mathml Optionally a MathML node corresponding to the
   *     semantic node.
   * @return The empty semantic tree.
   */
  static fromNode(semantic: SemanticNode, opt_mathml?: Element): SemanticTree {
    let stree = SemanticTree.empty();
    stree.root = semantic;
    if (opt_mathml) {
      stree.mathml = opt_mathml;
    }
    return stree;
  }


  /**
   * Generate a semantic tree for a given node
   * @param semantic The semantic node that will become
   *     the root.
   * @param opt_mathml Optionally a MathML node corresponding to the
   *     semantic node.
   * @return The empty semantic tree.
   */
  static fromRoot(semantic: SemanticNode, opt_mathml?: Element): SemanticTree {
    let root = semantic;
    while (root.parent) {
      root = root.parent;
    }
    let stree = SemanticTree.fromNode(root);
    if (opt_mathml) {
      stree.mathml = opt_mathml;
    }
    return stree;
  }


  /**
   * Returns an XML representation of the tree.
   * @param opt_brief If set attributes are omitted.
   * @return The XML representation of the tree.
   */
  xml(opt_brief?: boolean): Node {
    let xml = DomUtil.parseInput('<stree></stree>');
    let xmlRoot = this.root.xml(xml.ownerDocument, opt_brief);
    xml.appendChild(xmlRoot);
    return xml;
  }


  /**
   * Serializes the XML representation of the tree.
   * @param opt_brief If set attributes are omitted.
   * @return Serialized string.
   */
  toString(opt_brief?: boolean): string {
    let xmls = new SystemExternal.xmldom.XMLSerializer();
    return xmls.serializeToString(this.xml(opt_brief));
  }


  /**
   * Pretty print the XML representation of the tree.
   * @param opt_brief If set attributes are omitted.
   * @return The formatted string.
   */
  formatXml(opt_brief?: boolean): string {
    let xml = this.toString(opt_brief);
    return DomUtil.formatXml(xml);
  }


  /**
   * Convenience method to display the whole tree and its elements.
   */
  displayTree() {
    this.root.displayTree();
  }


  /**
   * Replaces a node in the tree. Updates the root node if necessary.
   * @param oldNode The node to be replaced.
   * @param newNode The new node.
   */
  replaceNode(oldNode: SemanticNode, newNode: SemanticNode) {
    let parent = oldNode.parent;
    if (!parent) {
      this.root = newNode;
      return;
    }
    parent.replaceChild(oldNode, newNode);
  }


  /**
   * Turns tree into JSON format.
   * @return The JSON object for the tree.
   */
  toJson(): JSONType {
    let json = ({} as JSONType);
    json['stree'] = this.root.toJson();
    return json;
  }


  /**
   * Generates a semantic tree from its XML representation.
   * @param xml The XML representation.
   * @return The generated semantic tree.
   */
  static fromXml(xml: Element): SemanticTree {
    let stree = SemanticTree.empty();
    if (xml.childNodes[0]) {
      stree.root = SemanticNode.fromXml((xml.childNodes[0] as Element));
    }
    return stree;
  }
}

/**
 * Visitor to propagate unit expressions if possible.
 */
SemanticTree.unitVisitor_ =
    new SemanticVisitor('general', 'unit', function(node, info) {
      if (node.type === sre.SemanticAttr.Type.INFIXOP &&
          (node.role === sre.SemanticAttr.Role.MULTIPLICATION ||
           node.role === sre.SemanticAttr.Role.IMPLICIT)) {
        let children = node.childNodes;
        if (children.length &&
            (sre.SemanticPred.isPureUnit(children[0]) ||
             sre.SemanticPred.isUnitCounter(children[0])) &&
            node.childNodes.slice(1).every(sre.SemanticPred.isPureUnit)) {
          node.role = sre.SemanticAttr.Role.UNIT;
        }
      }
      return false;
    });

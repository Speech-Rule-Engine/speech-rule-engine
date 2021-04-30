//
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
 * @fileoverview A mathml parser for building semantic trees.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */


import * as DomUtil from '../common/dom_util';

import {SemanticNode} from './semantic_node';
import {SemanticAbstractParser} from './semantic_parser';
import {SemanticParser} from './semantic_parser';
import {SemanticProcessor} from './semantic_processor';



export class SemanticMathml extends sre.SemanticAbstractParser implements
    SemanticParser<Element> {
  private parseMap_: {[key: string]: (p1: Element, p2: Element[]) => SemanticNode};
  constructor() {
    super('MathML');
    this.parseMap_ = {
      'SEMANTICS': goog.bind(this.semantics_, this),
      'MATH': goog.bind(this.rows_, this),
      'MROW': goog.bind(this.rows_, this),
      'MPADDED': goog.bind(this.rows_, this),
      'MSTYLE': goog.bind(this.rows_, this),
      'MFRAC': goog.bind(this.fraction_, this),
      'MSUB': goog.bind(this.limits_, this),
      'MSUP': goog.bind(this.limits_, this),
      'MSUBSUP': goog.bind(this.limits_, this),
      'MOVER': goog.bind(this.limits_, this),
      'MUNDER': goog.bind(this.limits_, this),
      'MUNDEROVER': goog.bind(this.limits_, this),
      'MROOT': goog.bind(this.root_, this),
      'MSQRT': goog.bind(this.sqrt_, this),
      'MTABLE': goog.bind(this.table_, this),
      'MLABELEDTR': goog.bind(this.tableLabeledRow_, this),
      'MTR': goog.bind(this.tableRow_, this),
      'MTD': goog.bind(this.tableCell_, this),
      'MS': goog.bind(this.text_, this),
      'MTEXT': goog.bind(this.text_, this),
      'MSPACE': goog.bind(this.space_, this),
      'ANNOTATION-XML': goog.bind(this.text_, this),
      'MI': goog.bind(this.identifier_, this),
      'MN': goog.bind(this.number_, this),
      'MO': goog.bind(this.operator_, this),
      'MFENCED': goog.bind(this.fenced_, this),
      'MENCLOSE': goog.bind(this.enclosed_, this),
      'MMULTISCRIPTS': goog.bind(this.multiscripts_, this),
      'ANNOTATION': goog.bind(this.empty_, this),
      'NONE': goog.bind(this.empty_, this),
      'MACTION': goog.bind(this.action_, this)
    };

    let meaning = {
      type: SemanticType.IDENTIFIER,
      role: SemanticRole.NUMBERSET,
      font: SemanticFont.DOUBLESTRUCK
    };
    ['C', 'H', 'N', 'P', 'Q', 'R', 'Z', 'ℂ', 'ℍ', 'ℕ', 'ℙ', 'ℚ', 'ℝ', 'ℤ']
        .forEach(function(x) {
          this.getFactory().defaultMap.add(x, meaning);
        }.bind(this));
  }


  /**
   * @override
   */
  parse(mml) {
    SemanticProcessor.getInstance().setNodeFactory(this.getFactory());
    let children = DomUtil.toArray(mml.childNodes);
    let tag = DomUtil.tagName(mml);
    let func = this.parseMap_[tag];
    let newNode = (func ? func : goog.bind(this.dummy_, this))(mml, children);
    sre.SemanticUtil.addAttributes(newNode, mml);
    if (['MATH', 'MROW', 'MPADDED', 'MSTYLE', 'SEMANTICS'].indexOf(tag) !==
        -1) {
      return newNode;
    }
    newNode.mathml.unshift(mml);
    newNode.mathmlTree = mml;
    return newNode;
  }


  /**
   * Parses semantics elements.
   * @param node A MathML node.
   * @param children The children of the node.
   * @return The newly created semantic node.
   */
  private semantics_(node: Element, children: Element[]): SemanticNode {
    return children.length ? this.parse(children[0]) :
                             this.getFactory().makeEmptyNode();
  }


  /**
   * Parses inferred row elements.
   * @param node A MathML node.
   * @param children The children of the node.
   * @return The newly created semantic node.
   */
  private rows_(node: Element, children: Element[]): SemanticNode {
    // Special cases:
    let semantics = node.getAttribute('semantics');
    if (semantics && semantics.match('bspr_')) {
      return SemanticProcessor.proof(
          node, semantics, goog.bind(this.parseList, this));
    }
    // End special cases.
    children = sre.SemanticUtil.purgeNodes(children);
    // Single child node, i.e. the row is meaningless.
    if (children.length === 1) {
      // TODO: Collate external attributes!
      let newNode = this.parse(children[0]);
      if (newNode.type === SemanticType.EMPTY && !newNode.mathmlTree) {
        newNode.mathmlTree = node;
      }
    } else {
      // Case of a 'meaningful' row, even if they are empty.
      newNode = SemanticProcessor.getInstance().row(this.parseList(children));
    }
    newNode.mathml.unshift(node);
    return newNode;
  }


  /**
   * Parses fraction like elements.
   * @param node A MathML node.
   * @param children The children of the node.
   * @return The newly created semantic node.
   */
  private fraction_(node: Element, children: Element[]): SemanticNode {
    if (!children.length) {
      return this.getFactory().makeEmptyNode();
    }
    let upper = this.parse(children[0]);
    let lower = children[1] ? this.parse(children[1]) :
                              this.getFactory().makeEmptyNode();
    let sem = SemanticProcessor.getInstance().fractionLikeNode(
        upper, lower, node.getAttribute('linethickness'),
        node.getAttribute('bevelled') === 'true');
    return sem;
  }


  /**
   * Parses an expression with bounds.
   * @param node A MathML node.
   * @param children The children of the node.
   * @return The newly created semantic node.
   */
  private limits_(node: Element, children: Element[]): SemanticNode {
    return SemanticProcessor.getInstance().limitNode(
        DomUtil.tagName(node), this.parseList(children));
  }


  /**
   * Parses a general root element.
   * @param node A MathML node.
   * @param children The children of the node.
   * @return The newly created semantic node.
   */
  private root_(node: Element, children: Element[]): SemanticNode {
    if (!children[1]) {
      return this.sqrt_(node, children);
    }
    return this.getFactory().makeBranchNode(
        SemanticType.ROOT,
        [this.parse(children[1]), this.parse(children[0])], []);
  }


  /**
   * Parses a square root element.
   * @param node A MathML node.
   * @param children The children of the node.
   * @return The newly created semantic node.
   */
  private sqrt_(node: Element, children: Element[]): SemanticNode {
    let semNodes = this.parseList(sre.SemanticUtil.purgeNodes(children));
    return this.getFactory().makeBranchNode(
        SemanticType.SQRT,
        [SemanticProcessor.getInstance().row(semNodes)], []);
  }


  /**
   * Parses a table structure.
   * @param node A MathML node.
   * @param children The children of the node.
   * @return The newly created semantic node.
   */
  private table_(node: Element, children: Element[]): SemanticNode {
    let semantics = node.getAttribute('semantics');
    if (semantics && semantics.match('bspr_')) {
      return SemanticProcessor.proof(
          node, semantics, goog.bind(this.parseList, this));
    }
    let newNode = this.getFactory().makeBranchNode(
        SemanticType.TABLE, this.parseList(children), []);
    SemanticProcessor.tableToMultiline(newNode);
    return newNode;
  }


  /**
   * Parses a row of a table.
   * @param node A MathML node.
   * @param children The children of the node.
   * @return The newly created semantic node.
   */
  private tableRow_(node: Element, children: Element[]): SemanticNode {
    let newNode = this.getFactory().makeBranchNode(
        SemanticType.ROW, this.parseList(children), []);
    newNode.role = SemanticRole.TABLE;
    return newNode;
  }


  /**
   * Parses a row of a table.
   * @param node A MathML node.
   * @param children The children of the node.
   * @return The newly created semantic node.
   */
  private tableLabeledRow_(node: Element, children: Element[]): SemanticNode {
    if (!children.length) {
      return this.tableRow_(node, children);
    }
    let label = this.parse(children[0]);
    label.role = SemanticRole.LABEL;
    let newNode = this.getFactory().makeBranchNode(
        SemanticType.ROW, this.parseList(children.slice(1)), [label]);
    newNode.role = SemanticRole.TABLE;
    return newNode;
  }


  /**
   * Parses a table cell.
   * @param node A MathML node.
   * @param children The children of the node.
   * @return The newly created semantic node.
   */
  private tableCell_(node: Element, children: Element[]): SemanticNode {
    let semNodes = this.parseList(sre.SemanticUtil.purgeNodes(children));
    let childNodes;
    if (!semNodes.length) {
      childNodes = [];
    } else if (
        semNodes.length === 1 &&
        sre.SemanticPred.isAttribute('type', 'EMPTY')(semNodes[0])) {
      // In case we have an explicit empty node, we do not want to process it
      // again. However, we know there will be a mathml node to embed the
      // semantic information into if necessary.
      childNodes = semNodes;
    } else {
      childNodes = [SemanticProcessor.getInstance().row(semNodes)];
    }
    let newNode = this.getFactory().makeBranchNode(
        SemanticType.CELL, childNodes, []);
    newNode.role = SemanticRole.TABLE;
    return newNode;
  }


  /**
   * Parse a space element. If sufficiently wide, create an empty text element.
   * alpha only: ignore, em pc >= .5, cm >= .4, ex >= 1, in >= .15, pt mm >= 5.
   * @param node A MathML node.
   * @param children The children of the node.
   * @return The newly created semantic node.
   */
  private space_(node: Element, children: Element[]): SemanticNode {
    let width = node.getAttribute('width');
    let match = width && width.match(/[a-z]*$/);
    if (!match) {
      return this.empty_(node, children);
    }
    let sizes =
        {'cm': .4, 'pc': .5, 'em': .5, 'ex': 1, 'in': .15, 'pt': 5, 'mm': 5};
    let unit = match[0];
    let measure = parseFloat(width.slice(0, match.index));
    let size = sizes[unit];
    if (!size || isNaN(measure) || measure < size) {
      return this.empty_(node, children);
    }
    let newNode = this.getFactory().makeUnprocessed(node);
    return SemanticProcessor.getInstance().text(newNode, DomUtil.tagName(node));
  }


  /**
   * Parses a text element.
   * @param node A MathML node.
   * @param children The children of the node.
   * @return The newly created semantic node.
   */
  private text_(node: Element, children: Element[]): SemanticNode {
    let newNode = this.leaf_(node, children);
    if (!node.textContent) {
      return newNode;
    }
    newNode.updateContent(node.textContent, true);
    return SemanticProcessor.getInstance().text(newNode, DomUtil.tagName(node));
  }


  /**
   * Create an identifier node, with particular emphasis on font disambiguation.
   * @param node A MathML node.
   * @param children The children of the node.
   * @return The new semantic identifier node.
   */
  private identifier_(node: Element, children: Element[]): SemanticNode {
    let newNode = this.leaf_(node, children);
    return SemanticProcessor.getInstance().identifierNode(
        newNode,
        SemanticProcessor.getInstance().font(node.getAttribute('mathvariant')),
        node.getAttribute('class'));
  }


  /**
   * Parses a number.
   * @param node A MathML node.
   * @param children The children of the node.
   * @return The newly created semantic node.
   */
  private number_(node: Element, children: Element[]): SemanticNode {
    let newNode = this.leaf_(node, children);
    SemanticProcessor.number(newNode);
    return newNode;
  }


  /**
   * Parses an operator.
   * @param node A MathML node.
   * @param children The children of the node.
   * @return The newly created semantic node.
   */
  private operator_(node: Element, children: Element[]): SemanticNode {
    let newNode = this.leaf_(node, children);
    SemanticProcessor.getInstance().operatorNode(newNode);
    return newNode;
  }


  /**
   * Parses a fenced element.
   * @param node A MathML node.
   * @param children The children of the node.
   * @return The newly created semantic node.
   */
  private fenced_(node: Element, children: Element[]): SemanticNode {
    let semNodes = this.parseList(sre.SemanticUtil.purgeNodes(children));
    let sepValue = SemanticMathml.getAttribute_(node, 'separators', ',');
    let open = SemanticMathml.getAttribute_(node, 'open', '(');
    let close = SemanticMathml.getAttribute_(node, 'close', ')');
    let newNode = SemanticProcessor.getInstance().mfenced(
        open, close, sepValue, semNodes);
    let nodes = SemanticProcessor.getInstance().tablesInRow([newNode]);
    return nodes[0];
  }


  /**
   * Parses an enclosed element.
   * @param node A MathML node.
   * @param children The children of the node.
   * @return The newly created semantic node.
   */
  private enclosed_(node: Element, children: Element[]): SemanticNode {
    let semNodes = this.parseList(sre.SemanticUtil.purgeNodes(children));
    let newNode = this.getFactory().makeBranchNode(
        SemanticType.ENCLOSE,
        [SemanticProcessor.getInstance().row(semNodes)], []);
    newNode.role = (node.getAttribute('notation') as SemanticRole) ||
        SemanticRole.UNKNOWN;
    return newNode;
  }


  /**
   * Parses a mmultiscript node into a tensor representation.
   * @param node A MathML node.
   * @param children The nodes children.
   * @return The semantic tensor node.
   */
  private multiscripts_(node: Element, children: Element[]): SemanticNode {
    // Empty node. Illegal MathML markup, but valid in MathJax.
    if (!children.length) {
      return this.getFactory().makeEmptyNode();
    }
    let base = this.parse((children.shift() as Element));
    if (!children.length) {
      return base;
    }
    let lsup = [];
    let lsub = [];
    let rsup = [];
    let rsub = [];
    let prescripts = false;
    let scriptcount = 0;
    for (let i = 0, child; child = children[i]; i++) {
      if (DomUtil.tagName(child) === 'MPRESCRIPTS') {
        prescripts = true;
        scriptcount = 0;
        continue;
      }
      prescripts ? scriptcount&1 ? lsup.push(child) : lsub.push(child) :
                   scriptcount&1 ? rsup.push(child) : rsub.push(child);
      scriptcount++;
    }
    // This is the pathological msubsup case.
    // We retain NONE nodes if necessary, i.e., in a non-empty sub- or
    // superscript.
    if (!sre.SemanticUtil.purgeNodes(lsup).length &&
        !sre.SemanticUtil.purgeNodes(lsub).length) {
      return SemanticProcessor.getInstance().pseudoTensor(
          base, this.parseList(rsub), this.parseList(rsup));
    }
    // We really deal with a multiscript tensor.
    return SemanticProcessor.getInstance().tensor(
        base, this.parseList(lsub), this.parseList(lsup), this.parseList(rsub),
        this.parseList(rsup));
  }


  /**
   * Parses an empty element.
   * @param node A MathML node.
   * @param children The children of the node.
   * @return The newly created semantic node.
   */
  private empty_(node: Element, children: Element[]): SemanticNode {
    return this.getFactory().makeEmptyNode();
  }


  /**
   * Parses an actionable element.
   * @param node A MathML node.
   * @param children The children of the node.
   * @return The newly created semantic node.
   */
  private action_(node: Element, children: Element[]): SemanticNode {
    // This here is currently geared towards our collapse actions!
    return children.length > 1 ? this.parse(children[1]) :
                                 this.getFactory().makeUnprocessed(node);
  }


  /**
   * Parses a dummy element for which no other case is known.
   * @param node A MathML node.
   * @param children The children of the node.
   * @return The newly created semantic node.
   */
  private dummy_(node: Element, children: Element[]): SemanticNode {
    let unknown = this.getFactory().makeUnprocessed(node);
    unknown.role = (node.tagName as SemanticRole);
    unknown.textContent = node.textContent;
    return unknown;
  }


  /**
   * Creates a leaf node from MathML node.
   * @param mml The MathML node.
   * @param children Its child nodes.
   * @return The new node.
   */
  private leaf_(mml: Element, children: Element[]): SemanticNode {
    if (children.length === 1 &&
        children[0].nodeType !== DomUtil.NodeType.TEXT_NODE) {
      let node = this.getFactory().makeUnprocessed(mml);
      node.role = (children[0].tagName as SemanticRole);
      sre.SemanticUtil.addAttributes(node, children[0]);
      return node;
    }
    return this.getFactory().makeLeafNode(
        mml.textContent,
        SemanticProcessor.getInstance().font(mml.getAttribute('mathvariant')));
  }


  /**
   * Get an attribute from a node and provide a default if it does not exist. It
   * returns null if attribute is empty string or whitespace only.
   * @param node The node from which to retrieve the attribute.
   * @param attr The attribute.
   * @param def The default return value.
   * @return The value of the attribute or null.
   */
  private static getAttribute_(node: Element, attr: string, def: string): string
      |null {
    if (!node.hasAttribute(attr)) {
      return def;
    }
    let value = node.getAttribute(attr);
    if (value.match(/^\s*$/)) {
      return null;
    }
    return value;
  }
}

goog.inherits(SemanticMathml, SemanticAbstractParser);

// TODO (sorge) Role and font of multi-character and digits unicode strings.
// TODO (sorge) Reclassify wrongly tagged numbers or identifiers more
//              systematically.
// TODO (sorge) Put this all in a single clean reclassification method.
// TODO (sorge) Do something useful with error and phantom symbols.

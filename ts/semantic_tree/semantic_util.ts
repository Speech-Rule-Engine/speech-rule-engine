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
 * @fileoverview Utility functions for semantic tree computations.
 * @author sorge@google.com (Volker Sorge)
 */

import * as DomUtil from '../common/dom_util';

import {SemanticNode} from './semantic_node';



export class SemanticUtil {
  /**
   * List of MathML Tags that are considered to be leafs.
   */
  static readonly LEAFTAGS: string[] =
      ['MO', 'MI', 'MN', 'MTEXT', 'MS', 'MSPACE'];


  /**
   * List of MathML Tags that are to be ignored.
   */
  static readonly IGNORETAGS: string[] = [
    'MERROR', 'MPHANTOM', 'MALIGNGROUP', 'MALIGNMARK', 'MPRESCRIPTS',
    'ANNOTATION', 'ANNOTATION-XML'
  ];


  /**
   * List of MathML Tags to be ignore if they have no children.
   */
  static readonly EMPTYTAGS: string[] =
      ['MATH', 'MROW', 'MPADDED', 'MACTION', 'NONE', 'MSTYLE', 'SEMANTICS'];


  /**
   * List of MathML Tags that draw something and can therefore not be ignored if
   * they have no children.
   */
  static readonly DISPLAYTAGS: string[] = ['MROOT', 'MSQRT'];


  /**
   * List of potential attributes that should be used as speech directly.
   */
  static directSpeechKeys: string[] = ['aria-label', 'exact-speech', 'alt'];


  /**
   * Merges keys of objects into an array.
   * @param var_args Optional objects.
   * @return Array of all keys of the objects.
   */
  static objectsToKeys(...var_args: ({[key: any]: string})[]): string[] {
    var_args = Array.prototype.slice.call(arguments, 0);
    let keys = [];
    return keys.concat.apply(keys, var_args.map(Object.keys));
  }


  /**
   * Merges values of objects into an array.
   * @param var_args Optional objects.
   * @return Array of all values of the objects.
   */
  static objectsToValues(...var_args: ({[key: any]: string})[]): string[] {
    var_args = Array.prototype.slice.call(arguments, 0);
    let result = [];
    let collectValues = function(obj) {
      for (let key in obj) {
        result.push(obj[key]);
      }
    };
    var_args.forEach(collectValues);
    return result;
  }


  /**
   * Transforms a unicode character into numeric representation. Returns null if
   * the input string is not a valid unicode character.
   * @param unicode Character.
   * @return The decimal representation if it exists.
   */
  static unicodeToNumber(unicode: string): number|null {
    if (!unicode || unicode.length > 2) {
      return null;
    }
    // Treating surrogate pairs.
    if (unicode.length == 2) {
      let hi = unicode.charCodeAt(0);
      let low = unicode.charCodeAt(1);
      if (0xD800 <= hi && hi <= 0xDBFF && !isNaN(low)) {
        return (hi - 0xD800) * 0x400 + (low - 0xDC00) + 0x10000;
      }
      return null;
    }
    return unicode.charCodeAt(0);
  }


  // TODO: Refactor with similar function in MathSimpleStore.
  /**
   * Transforms a numberic representation of a unicode character into its
   * corresponding string.
   * @param number Unicode point.
   * @return The string representation.
   */
  static numberToUnicode(number: number): string {
    if (number < 0x10000) {
      return String.fromCharCode(number);
    }
    let hi = (number - 0x10000) / 0x0400 + 0xD800;
    let lo = (number - 0x10000) % 0x0400 + 0xDC00;
    return String.fromCharCode(hi, lo);
  }


  /**
   * Splits a unicode string into array of characters. In particular deals
   * properly with surrogate pairs.
   * @param str The string to split.
   * @return List of single characters.
   */
  static splitUnicode(str: string): string[] {
    let split = str.split('');
    let result = [];
    for (let i = 0, chr; chr = split[i]; i++) {
      if ('\uD800' <= chr && chr <= '\uDBFF' && split[i + 1]) {
        result.push(chr + split[++i]);
      } else {
        result.push(chr);
      }
    }
    return result;
  }


  /**
   * Checks if an element is a node with a math tag.
   * @param node The node to check.
   * @return True if element is an math node.
   */
  static hasMathTag(node: Element): boolean {
    return !!node && DomUtil.tagName(node) === 'MATH';
  }


  /**
   * Checks if an element is a node with leaf tag.
   * @param node The node to check.
   * @return True if element is an leaf node.
   */
  static hasLeafTag(node: Element): boolean {
    return !!node &&
        SemanticUtil.LEAFTAGS.indexOf(DomUtil.tagName(node)) !== -1;
  }


  /**
   * Checks if an element is a node with ignore tag.
   * @param node The node to check.
   * @return True if element is an ignore node.
   */
  static hasIgnoreTag(node: Element): boolean {
    return !!node &&
        SemanticUtil.IGNORETAGS.indexOf(DomUtil.tagName(node)) !== -1;
  }


  /**
   * Checks if an element is a node with empty tag.
   * @param node The node to check.
   * @return True if element is an empty node.
   */
  static hasEmptyTag(node: Element): boolean {
    return !!node &&
        SemanticUtil.EMPTYTAGS.indexOf(DomUtil.tagName(node)) !== -1;
  }


  /**
   * Checks if an element is a node with display tag.
   * @param node The node to check.
   * @return True if element is an display node.
   */
  static hasDisplayTag(node: Element): boolean {
    return !!node &&
        SemanticUtil.DISPLAYTAGS.indexOf(DomUtil.tagName(node)) !== -1;
  }


  /**
   * Checks if an element is a node a glyph node that is not in a leaf.
   * @param node The node to check.
   * @return True if element is an orphaned glyph.
   */
  static isOrphanedGlyph(node: Element): boolean {
    return !!node &&
        (DomUtil.tagName(node) === 'MGLYPH' &&
         !SemanticUtil.hasLeafTag((node.parentNode as Element)));
  }


  /**
   * Removes elements from a list of MathML nodes that are either to be ignored
   * or ignored if they have empty children. Observe that this is currently not
   * recursive, i.e. will not take care of pathological cases, where content is
   * hidden in incorrectly used tags!
   * @param nodes The node list to be cleaned.
   * @return The cleansed list.
   */
  static purgeNodes(nodes: Element[]): Element[] {
    let nodeArray = [];
    for (let i = 0, node; node = nodes[i]; i++) {
      if (node.nodeType !== DomUtil.NodeType.ELEMENT_NODE) {
        continue;
      }
      let tagName = DomUtil.tagName(node);
      if (SemanticUtil.IGNORETAGS.indexOf(tagName) != -1) {
        continue;
      }
      if (SemanticUtil.EMPTYTAGS.indexOf(tagName) != -1 &&
          node.childNodes.length == 0) {
        continue;
      }
      nodeArray.push(node);
    }
    return nodeArray;
  }


  /**
   * Determines if an attribute represents zero or negative length.
   * @param length The lenght value.
   * @return True if the attribute represents zero length.
   */
  static isZeroLength(length: string): boolean {
    if (!length) {
      return false;
    }
    let negativeNamedSpaces = [
      'negativeveryverythinmathspace', 'negativeverythinmathspace',
      'negativethinmathspace', 'negativemediummathspace',
      'negativethickmathspace', 'negativeverythickmathspace',
      'negativeveryverythickmathspace'
    ];
    if (negativeNamedSpaces.indexOf(length) !== -1) {
      return true;
    }
    let value = length.match(/[0-9\.]+/);
    if (!value) {
      return false;
    }
    return parseFloat(value) === 0 ? true : false;
  }


  /**
   * Retains external attributes from the source node to the semantic node.
   * @param to The target node.
   * @param from The source node.
   */
  static addAttributes(to: SemanticNode, from: Node) {
    // TODO:
    // Propagate external attributes from singleton mrow-like elements.
    // Cleaner dealing with no breaking attributes.
    if (from.hasAttributes()) {
      let attrs = from.attributes;
      for (let i = attrs.length - 1; i >= 0; i--) {
        let key = attrs[i].name;
        if (key.match(/^ext/)) {
          to.attributes[key] = attrs[i].value;
          to.nobreaking = true;
        }
        if (SemanticUtil.directSpeechKeys.indexOf(key) !== -1) {
          to.attributes['ext-speech'] = attrs[i].value;
          to.nobreaking = true;
        }
        if (key.match(/texclass$/)) {
          to.attributes['texclass'] = attrs[i].value;
        }
        if (key === 'href') {
          to.attributes['href'] = attrs[i].value;
          to.nobreaking = true;
        }
      }
    }
  }


  /**
   * Finds the innermost element of an embellished operator node.
   * @param node The embellished node.
   * @return The innermost node.
   */
  static getEmbellishedInner(node: SemanticNode): SemanticNode {
    if (node && node.embellished && node.childNodes.length > 0) {
      return SemanticUtil.getEmbellishedInner(node.childNodes[0]);
    }
    return node;
  }


  /**
   * Splits a list of nodes wrt. to a given predicate.
   * @param nodes A list of nodes.
   * @param pred Predicate for the
   *    partitioning relation.
   * @param opt_reverse If true slicing is done from the end.
   * @return {{head: !Array.<sre.SemanticNode>,
   *           div: sre.SemanticNode,
   *           tail: !Array.<sre.SemanticNode>}} The split list.
   */
  static sliceNodes(
      nodes: SemanticNode[], pred: (p1: SemanticNode) => boolean,
      opt_reverse?: boolean):
      {head: SemanticNode[], div: SemanticNode, tail: SemanticNode[]} {
    if (opt_reverse) {
      nodes.reverse();
    }
    let head = [];
    for (let i = 0, node; node = nodes[i]; i++) {
      if (pred(node)) {
        if (opt_reverse) {
          return {
            head: nodes.slice(i + 1).reverse(),
            div: node,
            tail: head.reverse()
          };
        }
        return {head: head, div: node, tail: nodes.slice(i + 1)};
      }
      head.push(node);
    }
    if (opt_reverse) {
      return {head: [], div: null, tail: head.reverse()};
    }
    return {head: head, div: null, tail: []};
  }


  /**
   * Partitions a list of nodes wrt. to a given predicate. Effectively works
   * like a PER on the ordered set of nodes.
   * @param nodes A list of nodes.
   * @param pred Predicate for the
   *    partitioning relation.
   * @return The partitioning given in terms of a collection of elements
   *     satisfying
   *    the predicate and a collection of complementary sets lying inbetween the
   *    related elements. Observe that we always have |comp| = |rel| + 1.
   *
   * Example: On input [a, r_1, b, c, r_2, d, e, r_3] where P(r_i) holds, we
   *    get as output: {rel: [r_1, r_2, r_3], comp: [[a], [b, c], [d, e], []].
   */
  static partitionNodes(
      nodes: SemanticNode[],
      pred: (p1: SemanticNode) => boolean): SemanticUtil.Partition {
    let restNodes = nodes;
    let rel = [];
    let comp = [];

    do {
      let result = SemanticUtil.sliceNodes(restNodes, pred);
      comp.push(result.head);
      rel.push(result.div);
      restNodes = result.tail;
    } while (result.div);
    rel.pop();
    return {rel: rel, comp: comp};
  }
}
export interface Partition {
  rel: SemanticNode[];
  comp: SemanticNode[][];
}
export {SemanticUtil};

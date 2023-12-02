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
 * @file Utility functions for semantic tree computations.
 * @author sorge@google.com (Volker Sorge)
 */

import * as DomUtil from '../common/dom_util.js';

import { SemanticNode } from './semantic_node.js';

export enum MMLTAGS {
  ANNOTATION = 'ANNOTATION',
  ANNOTATIONXML = 'ANNOTATION-XML',
  MACTION = 'MACTION',
  MALIGNGROUP = 'MALIGNGROUP',
  MALIGNMARK = 'MALIGNMARK',
  MATH = 'MATH',
  MENCLOSE = 'MENCLOSE',
  MERROR = 'MERROR',
  MFENCED = 'MFENCED',
  MFRAC = 'MFRAC',
  MGLYPH = 'MGLYPH',
  MI = 'MI',
  MLABELEDTR = 'MLABELEDTR',
  MMULTISCRIPTS = 'MMULTISCRIPTS',
  MN = 'MN',
  MO = 'MO',
  MOVER = 'MOVER',
  MPADDED = 'MPADDED',
  MPHANTOM = 'MPHANTOM',
  MPRESCRIPTS = 'MPRESCRIPTS',
  MROOT = 'MROOT',
  MROW = 'MROW',
  MS = 'MS',
  MSPACE = 'MSPACE',
  MSQRT = 'MSQRT',
  MSTYLE = 'MSTYLE',
  MSUB = 'MSUB',
  MSUBSUP = 'MSUBSUP',
  MSUP = 'MSUP',
  MTABLE = 'MTABLE',
  MTD = 'MTD',
  MTEXT = 'MTEXT',
  MTR = 'MTR',
  MUNDER = 'MUNDER',
  MUNDEROVER = 'MUNDEROVER',
  NONE = 'NONE',
  SEMANTICS = 'SEMANTICS',
}


/**
 * List of MathML Tags that are considered to be leafs.
 */
const LEAFTAGS: string[] = [
  MMLTAGS.MO,
  MMLTAGS.MI,
  MMLTAGS.MN,
  MMLTAGS.MTEXT,
  MMLTAGS.MS,
  MMLTAGS.MSPACE
];

/**
 * List of MathML Tags that are to be ignored.
 */
const IGNORETAGS: string[] = [
  MMLTAGS.MERROR,
  MMLTAGS.MPHANTOM,
  MMLTAGS.MALIGNGROUP,
  MMLTAGS.MALIGNMARK,
  MMLTAGS.MPRESCRIPTS,
  MMLTAGS.ANNOTATION,
  MMLTAGS.ANNOTATIONXML
];

/**
 * List of MathML Tags to be ignore if they have no children.
 */
const EMPTYTAGS: string[] = [
  MMLTAGS.MATH,
  MMLTAGS.MROW,
  MMLTAGS.MPADDED,
  MMLTAGS.MACTION,
  MMLTAGS.NONE,
  MMLTAGS.MSTYLE,
  MMLTAGS.SEMANTICS
];

/**
 * List of MathML Tags that draw something and can therefore not be ignored if
 * they have no children.
 */
const DISPLAYTAGS: string[] = [
  MMLTAGS.MROOT,
  MMLTAGS.MSQRT
];

/**
 * List of potential attributes that should be used as speech directly.
 */
const directSpeechKeys: string[] = ['aria-label', 'exact-speech', 'alt'];

/**
 * Checks if an element is a node with a math tag.
 *
 * @param node The node to check.
 * @returns True if element is an math node.
 */
export function hasMathTag(node: Element): boolean {
  return !!node && DomUtil.tagName(node) === MMLTAGS.MATH;
}

/**
 * Checks if an element is a node with leaf tag.
 *
 * @param node The node to check.
 * @returns True if element is an leaf node.
 */
function hasLeafTag(node: Element): boolean {
  return !!node && LEAFTAGS.indexOf(DomUtil.tagName(node)) !== -1;
}

/**
 * Checks if an element is a node with ignore tag.
 *
 * @param node The node to check.
 * @returns True if element is an ignore node.
 */
export function hasIgnoreTag(node: Element): boolean {
  return !!node && IGNORETAGS.indexOf(DomUtil.tagName(node)) !== -1;
}

/**
 * Checks if an element is a node with empty tag.
 *
 * @param node The node to check.
 * @returns True if element is an empty node.
 */
export function hasEmptyTag(node: Element): boolean {
  return !!node && EMPTYTAGS.indexOf(DomUtil.tagName(node)) !== -1;
}

/**
 * Checks if an element is a node with display tag.
 *
 * @param node The node to check.
 * @returns True if element is an display node.
 */
export function hasDisplayTag(node: Element): boolean {
  return !!node && DISPLAYTAGS.indexOf(DomUtil.tagName(node)) !== -1;
}

/**
 * Checks if an element is a node a glyph node that is not in a leaf.
 *
 * @param node The node to check.
 * @returns True if element is an orphaned glyph.
 */
export function isOrphanedGlyph(node: Element): boolean {
  return (
    !!node &&
      DomUtil.tagName(node) === MMLTAGS.MGLYPH &&
    !hasLeafTag(node.parentNode as Element)
  );
}

/**
 * Removes elements from a list of MathML nodes that are either to be ignored
 * or ignored if they have empty children. Observe that this is currently not
 * recursive, i.e. will not take care of pathological cases, where content is
 * hidden in incorrectly used tags!
 *
 * @param nodes The node list to be cleaned.
 * @returns The cleansed list.
 */
export function purgeNodes(nodes: Element[]): Element[] {
  const nodeArray = [];
  for (let i = 0, node; (node = nodes[i]); i++) {
    if (node.nodeType !== DomUtil.NodeType.ELEMENT_NODE) {
      continue;
    }
    const tagName = DomUtil.tagName(node);
    if (IGNORETAGS.indexOf(tagName) !== -1) {
      continue;
    }
    if (EMPTYTAGS.indexOf(tagName) !== -1 && node.childNodes.length === 0) {
      continue;
    }
    nodeArray.push(node);
  }
  return nodeArray;
}

/**
 * Determines if an attribute represents zero or negative length.
 *
 * @param length The lenght value.
 * @returns True if the attribute represents zero length.
 */
export function isZeroLength(length: string): boolean {
  if (!length) {
    return false;
  }
  const negativeNamedSpaces = [
    'negativeveryverythinmathspace',
    'negativeverythinmathspace',
    'negativethinmathspace',
    'negativemediummathspace',
    'negativethickmathspace',
    'negativeverythickmathspace',
    'negativeveryverythickmathspace'
  ];
  if (negativeNamedSpaces.indexOf(length) !== -1) {
    return true;
  }
  const value = length.match(/[0-9.]+/);
  if (!value) {
    return false;
  }
  return parseFloat(value[0]) === 0;
}

/**
 * Retains external attributes from the source node to the semantic node.
 *
 * @param to The target node.
 * @param from The source node.
 */
export function addAttributes(to: SemanticNode, from: Element) {
  // TODO:
  // Propagate external attributes from singleton mrow-like elements.
  // Cleaner dealing with no breaking attributes.
  if (from.hasAttributes()) {
    const attrs = from.attributes;
    for (let i = attrs.length - 1; i >= 0; i--) {
      const key = attrs[i].name;
      if (key.match(/^ext/)) {
        to.attributes[key] = attrs[i].value;
        to.nobreaking = true;
      }
      if (directSpeechKeys.indexOf(key) !== -1) {
        to.attributes['ext-speech'] = attrs[i].value;
        to.nobreaking = true;
      }
      if (key.match(/texclass$/)) {
        to.attributes['texclass'] = attrs[i].value;
      }
      if (key.toLowerCase() === 'data-latex') {
        to.attributes['latex'] = attrs[i].value;
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
 *
 * @param node The embellished node.
 * @returns The innermost node.
 */
export function getEmbellishedInner(node: SemanticNode): SemanticNode {
  if (node && node.embellished && node.childNodes.length > 0) {
    return getEmbellishedInner(node.childNodes[0]);
  }
  return node;
}

export interface Slice {
  head: SemanticNode[];
  div: SemanticNode;
  tail: SemanticNode[];
}

/**
 * Splits a list of nodes wrt. to a given predicate.
 *
 * @param nodes A list of nodes.
 * @param pred Predicate for the
 *    partitioning relation.
 * @param opt_reverse If true slicing is done from the end.
 * @returns The split list as a slice structure.
 */
export function sliceNodes(
  nodes: SemanticNode[],
  pred: (p1: SemanticNode) => boolean,
  opt_reverse?: boolean
): Slice {
  if (opt_reverse) {
    nodes.reverse();
  }
  const head = [];
  for (let i = 0, node; (node = nodes[i]); i++) {
    if (pred(node)) {
      if (opt_reverse) {
        return {
          head: nodes.slice(i + 1).reverse(),
          div: node,
          tail: head.reverse()
        };
      }
      return { head: head, div: node, tail: nodes.slice(i + 1) };
    }
    head.push(node);
  }
  if (opt_reverse) {
    return { head: [], div: null, tail: head.reverse() };
  }
  return { head: head, div: null, tail: [] };
}

export interface Partition {
  rel: SemanticNode[];
  comp: SemanticNode[][];
}

/**
 * Partitions a list of nodes wrt. to a given predicate. Effectively works
 * like a PER on the ordered set of nodes.
 *
 * @param nodes A list of nodes.
 * @param pred Predicate for the
 *    partitioning relation.
 * @returns The partitioning given in terms of a collection of elements
 *     satisfying
 *    the predicate and a collection of complementary sets lying inbetween the
 *    related elements. Observe that we always have |comp| = |rel| + 1.
 *
 * Example: On input [a, r_1, b, c, r_2, d, e, r_3] where P(r_i) holds, we
 *    get as output: {rel: [r_1, r_2, r_3], comp: [[a], [b, c], [d, e], []].
 */
export function partitionNodes(
  nodes: SemanticNode[],
  pred: (p1: SemanticNode) => boolean
): Partition {
  let restNodes = nodes;
  const rel = [];
  const comp = [];
  let result: Slice = null;

  do {
    result = sliceNodes(restNodes, pred);
    comp.push(result.head);
    rel.push(result.div);
    restNodes = result.tail;
  } while (result.div);
  rel.pop();
  return { rel: rel, comp: comp };
}

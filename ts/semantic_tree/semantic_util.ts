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
import { SREError } from '../common/engine.js';

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
  SEMANTICS = 'SEMANTICS'
}

/**
 * List of all MathML Tags.
 */
const ALLTAGS: string[] = Object.values(MMLTAGS);

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
 * MathML elements whose children have fixed positional semantics. Inserting an
 * extra child inside one of these would corrupt the structure when re-parsed.
 */
const STRUCTURAL: string[] = [
  MMLTAGS.MFRAC,
  MMLTAGS.MSUP,
  MMLTAGS.MSUB,
  MMLTAGS.MSUBSUP,
  MMLTAGS.MOVER,
  MMLTAGS.MUNDER,
  MMLTAGS.MUNDEROVER,
  MMLTAGS.MROOT,
  MMLTAGS.MMULTISCRIPTS
];

/**
 * List of MathML Tags that draw something and can therefore not be ignored if
 * they have no children.
 */
const DISPLAYTAGS: string[] = [MMLTAGS.MROOT, MMLTAGS.MSQRT];

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
  return !!node && LEAFTAGS.includes(DomUtil.tagName(node));
}

/**
 * Checks if an element is a node with ignore tag.
 *
 * @param node The node to check.
 * @returns True if element is an ignore node.
 */
export function hasIgnoreTag(node: Element): boolean {
  return (
    !!node &&
    (IGNORETAGS.includes(DomUtil.tagName(node)) ||
      !ALLTAGS.includes(DomUtil.tagName(node)))
  );
}

/**
 * Checks if an element is a node with empty tag.
 *
 * @param node The node to check.
 * @returns True if element is an empty node.
 */
export function hasEmptyTag(node: Element): boolean {
  return !!node && EMPTYTAGS.includes(DomUtil.tagName(node));
}

/**
 * Checks if an element is a node with display tag.
 *
 * @param node The node to check.
 * @returns True if element is an display node.
 */
export function hasDisplayTag(node: Element): boolean {
  return !!node && DISPLAYTAGS.includes(DomUtil.tagName(node));
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
 * Checks if an element is a node with a structural parent tag.
 *
 * @param node The node to check.
 * @returns True if element is a structural parent node.
 */
export function isStructuralParent(node: Element): boolean {
  return STRUCTURAL.includes(DomUtil.tagName(node));
}

/**
 * Default upper bound for {@link loopGuard}. Real MathML nesting depth stays
 * well below this, so exceeding it indicates a malformed (cyclic) DOM.
 */
export const LOOP_LIMIT = 10000;

/**
 * Creates a guard against runaway loops in tree-walking helpers. Call the
 * returned function once per iteration; it throws once `limit` iterations have
 * been exceeded.
 *
 * Note, this is temporary to avoid page crashes in MathJax!
 *
 * @param limit Maximum number of iterations to allow.
 * @param message Error message, or a function computing one lazily from the
 *     loop's current state (useful since that state is only known at the
 *     call site).
 * @returns A function to invoke on every loop iteration.
 */
export function loopGuard(
  limit: number,
  message: string | (() => string)
): () => void {
  let count = 0;
  return () => {
    if (++count > limit) {
      throw new SREError(typeof message === 'function' ? message() : message);
    }
  };
}

/**
 * Checks if one node is a proper descendant of another, i.e. `node` is a strict
 * ancestor of `descendant`. The walk is guarded so a malformed, cyclic DOM
 * cannot cause an infinite loop.
 *
 * @param descendant The potential descendant node.
 * @param node The potential ancestor node.
 * @returns True if descendant is a proper descendant of node.
 */
export function isDescendant(descendant: Element, node: Element): boolean {
  if (!descendant) {
    return false;
  }
  const guard = loopGuard(LOOP_LIMIT, 'isDescendant cycle');
  let current = descendant.parentNode as Element;
  while (current) {
    guard();
    if (current === node) {
      return true;
    }
    current = current.parentNode as Element;
  }
  return false;
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
    if (IGNORETAGS.includes(tagName)) {
      continue;
    }
    if (EMPTYTAGS.includes(tagName) && node.childNodes.length === 0) {
      continue;
    }
    nodeArray.push(node);
  }
  return nodeArray;
}

/**
 * Check if an empty row element presents an omitted ordinal.
 *
 * @param node The node to test.
 * @returns True if the node is an mrow ordinal without children.
 */
export function ordRow(node: Element): boolean {
  return DomUtil.tagName(node) === MMLTAGS.MROW &&
    node.getAttribute('data-mjx-texclass') === 'ORD' &&
    node.childNodes.length === 0;
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
  if (negativeNamedSpaces.includes(length)) {
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
  if (from.attributes?.length) {
    const attrs = from.attributes;
    for (let i = attrs.length - 1; i >= 0; i--) {
      const key = attrs[i].name;
      if (key.match(/^ext/)) {
        to.attributes[key] = attrs[i].value;
        to.nobreaking = true;
      }
      if (directSpeechKeys.includes(key)) {
        to.attributes['ext-speech'] = attrs[i].value;
        to.nobreaking = true;
      }
      if (key === 'href') {
        to.attributes['href'] = attrs[i].value;
        to.nobreaking = true;
      }
      if (key.toLowerCase() === 'data-latex' || key.toLowerCase() === 'latex') {
        to.attributes['latex'] = attrs[i].value;
      }
      if (key.match(/texclass$/)) {
        to.attributes['texclass'] = attrs[i].value;
      }
      if (key === 'color' || key === 'mathcolor') {
        to.attributes['color'] = attrs[i].value;
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

/**
 * Checks if a node has an ancestor contained in the given set.
 *
 * @param node The node to check.
 * @param ancestors The candidate ancestor elements.
 * @returns True if some strict ancestor of node is in ancestors.
 */
function hasAncestorIn(node: Element, ancestors: Set<Element>): boolean {
  let parent = node.parentElement;
  while (parent) {
    if (ancestors.has(parent)) return true;
    parent = parent.parentElement;
  }
  return false;
}

/**
 * Heuristic to find a mathml Tree for a newly introduced node. Tries to find
 * something like an mrow which is "unused" and which contains all the given
 * child nodes.
 *
 * @param newNode The newly introduced node.
 * @param nodeList The child nodes.
 */
export function findMathmlTree(newNode: SemanticNode, nodeList: SemanticNode[]) {
  if (newNode.mathmlTree) return;
  const parentTrees = new Set<Element>();
  nodeList.forEach((x) => parentTrees.add(x.mathmlTree?.parentElement || null));

  // Case 1: If all nodes have the same mathml tree parent, we can use that
  // for the new node.
  if (parentTrees.size === 1 && !parentTrees.has(null)) {
    const singleton = [...parentTrees][0];
    if (
      hasEmptyTag(singleton) &&
        singleton.childNodes.length === nodeList.length
    ) {
      newNode.mathmlTree = singleton;
      return;
    }
    return;
  }

  // Case 2: Some nodes do not yet have a mathml tree of their own (e.g.,
  // newly synthesised nodes). If the nodes that do have one agree on a
  // parent, and the constituent mathml elements of the remaining nodes (if
  // any) also live under that same parent, we can use it for the new node.
  // Only the topmost elements of such a node's mathml are considered: if one
  // of its elements is a descendant of another (e.g. a row that already
  // accounts for its own leaves), the descendant is subsumed and must not be
  // used to introduce an unrelated parent into the candidate set.
  if (parentTrees.has(null) && parentTrees.size <= 2) {
    parentTrees.delete(null);
    nodeList.forEach((x) => {
      if (!x.mathmlTree) {
        const elements = new Set(x.mathml);
        x.mathml.forEach((m) => {
          if (m.parentElement && !hasAncestorIn(m, elements)) {
            parentTrees.add(m.parentElement);
          }
        });
      }
    });
  }
  if (parentTrees.size === 1 && !parentTrees.has(null)) {
    const singleton = [...parentTrees][0];
    if (hasEmptyTag(singleton)
      && DomUtil.toArray(singleton.childNodes).every(x => newNode.mathml.includes(x))) {
      newNode.mathmlTree = singleton;
      return;
    }
  }
}

/**
 * Test if node is a mspace element and has a meaningful size.
 *
 * @param node The node to test.
 * @returns True if the size is large enough to warrant semantic meaning.
 */
export function meaningfulSpace(node: Element): boolean {
  if (!node || DomUtil.tagName(node) !== MMLTAGS.MSPACE) {
    return false;
  }
    const width = node.getAttribute('width');
    const match = width && width.match(/[a-z]*$/);
    if (!match) {
      return false;
    }
    const sizes: { [key: string]: number } = {
      cm: 0.4,
      pc: 0.5,
      em: 0.5,
      ex: 1,
      in: 0.15,
      pt: 5,
      mm: 5
    };
    const unit = match[0];
    const measure = parseFloat(width.slice(0, match.index));
    const size = sizes[unit];
    if (!size || isNaN(measure) || measure < size) {
      return false;
    }
  return true;
}

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
 * @file Utility functions for nemeth rules.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import { AuditoryDescription } from '../audio/auditory_description.js';
import { Span } from '../audio/span.js';
import * as DomUtil from '../common/dom_util.js';
import * as XpathUtil from '../common/xpath_util.js';
import { Grammar, correctFont } from '../rule_engine/grammar.js';
import { Engine } from '../common/engine.js';
import { register, activate } from '../semantic_tree/semantic_annotations.js';
import { SemanticVisitor } from '../semantic_tree/semantic_annotator.js';
import {
  SemanticRole,
  SemanticType
} from '../semantic_tree/semantic_meaning.js';
import { SemanticNode } from '../semantic_tree/semantic_node.js';

import { LOCALE } from '../l10n/locale.js';
import * as MathspeakUtil from './mathspeak_util.js';
import { contentIterator as suCI } from '../rule_engine/store_util.js';

/**
 * Opening string for fractions in linear Nemeth.
 *
 * @param node The fraction node.
 * @returns The opening string.
 */
export function openingFraction(node: Element): Span[] {
  const depth = MathspeakUtil.fractionNestingDepth(node);
  return Span.singleton(
    new Array(depth).join(LOCALE.MESSAGES.MS.FRACTION_REPEAT) +
      LOCALE.MESSAGES.MS.FRACTION_START
  );
}

/**
 * Closing string for fractions in linear Nemeth.
 *
 * @param node The fraction node.
 * @returns The closing string.
 */
export function closingFraction(node: Element): Span[] {
  const depth = MathspeakUtil.fractionNestingDepth(node);
  return Span.singleton(
    new Array(depth).join(LOCALE.MESSAGES.MS.FRACTION_REPEAT) +
      LOCALE.MESSAGES.MS.FRACTION_END
  );
}

/**
 * Middle string for fractions in linear Nemeth.
 *
 * @param node The fraction node.
 * @returns The middle string.
 */
export function overFraction(node: Element): Span[] {
  const depth = MathspeakUtil.fractionNestingDepth(node);
  return Span.singleton(
    new Array(depth).join(LOCALE.MESSAGES.MS.FRACTION_REPEAT) +
      LOCALE.MESSAGES.MS.FRACTION_OVER
  );
}

/**
 * Middle string for bevelled fractions in Nemeth.
 *
 * @param node The fraction node.
 * @returns The middle string.
 */
export function overBevelledFraction(node: Element): Span[] {
  const depth = MathspeakUtil.fractionNestingDepth(node);
  return Span.singleton(
    new Array(depth).join(LOCALE.MESSAGES.MS.FRACTION_REPEAT) +
      '⠸' +
      LOCALE.MESSAGES.MS.FRACTION_OVER
  );
}

/**
 * Checks if node is the boundary of a hyperfraction.
 *
 * @param node The node to test.
 * @returns The array with the node if it is a hyperfraction boundary. Otherwise
 * empty array.
 */
export function hyperFractionBoundary(node: Element): Element[] {
  return LOCALE.MESSAGES.regexp.HYPER ===
    MathspeakUtil.fractionNestingDepth(node).toString()
    ? [node]
    : [];
}

/**
 * Nested Braille radicals in Nemeth putting together the nesting counter with
 * the correct indicator string as postfix.
 *
 * @param node The radical node.
 * @param postfix A postfix string.
 * @returns The opening string.
 */
function nestedRadical(node: Element, postfix: string): Span[] {
  const depth = radicalNestingDepth(node);
  return Span.singleton(
    depth === 1
      ? postfix
      : new Array(depth).join(LOCALE.MESSAGES.MS.NESTED) + postfix
  );
}

/**
 * Computes and returns the nesting depth of radical nodes.
 *
 * @param node The radical node.
 * @param opt_depth The optional depth.
 * @returns The nesting depth. 0 if the node is not a radical.
 */
function radicalNestingDepth(node: Element, opt_depth?: number): number {
  const depth = opt_depth || 0;
  if (!node.parentNode) {
    return depth;
  }
  return radicalNestingDepth(
    node.parentNode as Element,
    node.tagName === 'root' || node.tagName === 'sqrt' ? depth + 1 : depth
  );
}

/**
 * Opening string for radicals in Nemeth.
 *
 * @param node The radical node.
 * @returns The opening string.
 */
export function openingRadical(node: Element): Span[] {
  return nestedRadical(node, LOCALE.MESSAGES.MS.STARTROOT);
}

/**
 * Closing string for radicals in Nemeth.
 *
 * @param node The radical node.
 * @returns The closing string.
 */
export function closingRadical(node: Element): Span[] {
  return nestedRadical(node, LOCALE.MESSAGES.MS.ENDROOT);
}

/**
 * Middle string for radicals in Nemeth.
 *
 * @param node The radical node.
 * @returns The middle string.
 */
export function indexRadical(node: Element): Span[] {
  return nestedRadical(node, LOCALE.MESSAGES.MS.ROOTINDEX);
}

/**
 * Enlarges a fence operator. The enlargement indicator might need to be
 * interspersed if multiple neutral fences are used.
 *
 * @param text The text representing the fence.
 * @returns The fence with the enlargment indicator.
 */
function enlargeFence(text: string): string {
  const start = '⠠';
  if (text.length === 1) {
    return start + text;
  }
  const neut = '⠳';
  const split = text.split('');
  if (
    split.every(function (x) {
      return x === neut;
    })
  ) {
    return start + split.join(start);
  }
  return text.slice(0, -1) + start + text.slice(-1);
}

Grammar.getInstance().setCorrection('enlargeFence', enlargeFence);

const NUMBER_PROPAGATORS: SemanticType[] = [
  SemanticType.MULTIREL,
  SemanticType.RELSEQ,
  SemanticType.APPL,
  SemanticType.ROW,
  SemanticType.LINE
];

const NUMBER_INHIBITORS: SemanticType[] = [
  SemanticType.SUBSCRIPT,
  SemanticType.SUPERSCRIPT,
  SemanticType.OVERSCORE,
  SemanticType.UNDERSCORE
];

/**
 * Checks if a Nemeth number indicator has to be propagated beyond the node's
 * parent.
 *
 * @param node The node which can get a number indicator.
 * @param info True if we are in an enclosed list.
 * @returns True if parent is a relation, punctuation or application or
 *     a negative sign.
 */
function checkParent(
  node: SemanticNode,
  info: { [key: string]: boolean }
): boolean {
  const parent = node.parent;
  if (!parent) {
    return false;
  }
  const type = parent.type;
  if (
    NUMBER_PROPAGATORS.indexOf(type) !== -1 ||
    (type === SemanticType.PREFIXOP &&
      parent.role === SemanticRole.NEGATIVE &&
      !info.script &&
      !info.enclosed) ||
    (type === SemanticType.PREFIXOP &&
      // TODO: This needs to be rewritten once there is a better treatment
      // of prefixop.
      parent.role === SemanticRole.GEOMETRY)
  ) {
    return true;
  }
  if (type === SemanticType.PUNCTUATED) {
    if (!info.enclosed || parent.role === SemanticRole.TEXT) {
      return true;
    }
  }
  return false;
}

/**
 * Propagates annotation for the Nemeth number indicator.
 *
 * @param node The semantic node.
 * @param info The info structure on the type of number.
 * @returns Info pair consisting of a string and the updated
 *     information object.
 */
function propagateNumber(
  node: SemanticNode,
  info: { [key: string]: any }
): any[] {
  // TODO: Font indicator followed by number.
  // TODO: Check for enclosed list
  if (!node.childNodes.length) {
    if (checkParent(node, info)) {
      info.number = true;
      info.script = false;
      info.enclosed = false;
    }
    return [
      info['number'] ? 'number' : '',
      { number: false, enclosed: info.enclosed, script: info.script }
    ];
  }
  if (NUMBER_INHIBITORS.indexOf(node.type) !== -1) {
    info.script = true;
  }
  if (node.type === SemanticType.FENCED) {
    info.number = false;
    info.enclosed = true;
    return ['', info];
  }
  if (
    node.type === SemanticType.PREFIXOP &&
    node.role !== SemanticRole.GEOMETRY &&
    node.role !== SemanticRole.NEGATIVE
  ) {
    info.number = false;
    return ['', info];
  }
  if (checkParent(node, info)) {
    info.number = true;
    info.enclosed = false;
  }
  return ['', info];
}

register(
  new SemanticVisitor('nemeth', 'number', propagateNumber, { number: true })
);

/**
 * Annotator that adds a tree depth annotation for each node.
 *
 * @param node The node to annotate.
 * @returns Array with the current depth in the tree.
 */
function annotateDepth(node: SemanticNode): any[] {
  if (!node.parent) {
    return [1];
  }
  const depth = parseInt(node.parent.annotation['depth'][0]);
  return [depth + 1];
}

register(new SemanticVisitor('depth', 'depth', annotateDepth));
activate('depth', 'depth');

/**
 * Iterates over the list of relation nodes and intersperses Braille spaces if
 * necessary.
 *
 * @param nodes A node array.
 * @param context A context string.
 * @returns A closure that returns
 *     the content of the next content node. Returns only context string if list
 *     is exhausted.
 */
export function relationIterator(
  nodes: Element[],
  context: string
): () => AuditoryDescription[] {
  const childNodes = nodes.slice(0);
  let first = true;
  const parentNode = nodes[0].parentNode.parentNode as Element;
  const match = parentNode.getAttribute('annotation')?.match(/depth:(\d+)/);
  const depth = match ? match[1] : '';
  let contentNodes: Element[];
  if (nodes.length > 0) {
    contentNodes = XpathUtil.evalXPath('./content/*', parentNode) as Element[];
  } else {
    contentNodes = [];
  }
  return function () {
    const content = contentNodes.shift();
    const leftChild = childNodes.shift();
    const rightChild = childNodes[0];
    const contextDescr = context
      ? [AuditoryDescription.create({ text: context }, { translate: true })]
      : [];
    if (!content) {
      return contextDescr;
    }
    const base = leftChild
      ? MathspeakUtil.nestedSubSuper(leftChild, '', {
          sup: LOCALE.MESSAGES.MS.SUPER,
          sub: LOCALE.MESSAGES.MS.SUB
        })
      : '';
    const left =
      (leftChild && DomUtil.tagName(leftChild) !== 'EMPTY') ||
      (first && parentNode && parentNode.previousSibling)
        ? [
            AuditoryDescription.create(
              { text: LOCALE.MESSAGES.regexp.SPACE + base },
              {}
            )
          ]
        : [];
    const right =
      (rightChild && DomUtil.tagName(rightChild) !== 'EMPTY') ||
      (!contentNodes.length && parentNode && parentNode.nextSibling)
        ? [
            AuditoryDescription.create(
              { text: LOCALE.MESSAGES.regexp.SPACE },
              {}
            )
          ]
        : [];
    const descrs = Engine.evaluateNode(content);
    // TODO: Combine with similar code in speech_rule_engine.
    descrs.unshift(
      new AuditoryDescription({ text: '', layout: `beginrel${depth}` })
    );
    descrs.push(
      new AuditoryDescription({ text: '', layout: `endrel${depth}` })
    );
    first = false;
    // TODO: Check with the context!
    return contextDescr.concat(left, descrs, right);
  };
}
/**
 * Iterates over the list of juxtapositions and inserts spaces between two
 * numbers.
 *
 * @param nodes A node array.
 * @param context A context string.
 * @returns A closure that returns
 *     the content of the next content node. Returns only context string if list
 *     is exhausted.
 */
export function implicitIterator(
  nodes: Element[],
  context: string
): () => AuditoryDescription[] {
  const childNodes = nodes.slice(0);
  let contentNodes: Element[];
  if (nodes.length > 0) {
    contentNodes = XpathUtil.evalXPath(
      '../../content/*',
      nodes[0]
    ) as Element[];
  } else {
    contentNodes = [];
  }
  return function () {
    const leftChild = childNodes.shift();
    const rightChild = childNodes[0];
    const content = contentNodes.shift();
    const contextDescr = context
      ? [AuditoryDescription.create({ text: context }, { translate: true })]
      : [];
    if (!content) {
      return contextDescr;
    }
    const left = leftChild && DomUtil.tagName(leftChild) === 'NUMBER';
    const right = rightChild && DomUtil.tagName(rightChild) === 'NUMBER';
    return contextDescr.concat(
      left && right && content.getAttribute('role') === SemanticRole.SPACE
        ? [
            AuditoryDescription.create(
              { text: LOCALE.MESSAGES.regexp.SPACE },
              {}
            )
          ]
        : []
    );
  };
}

/**
 * Ignore English language modifier if not necessary.
 *
 * @param text The current Nemeth Braille string.
 * @returns The corrected Braille string.
 */
function ignoreEnglish(text: string) {
  return correctFont(text, LOCALE.ALPHABETS.languagePrefix.english);
}

Grammar.getInstance().setCorrection('ignoreEnglish', ignoreEnglish);

/**
 * Iterates over the list of content nodes of the parent of the given nodes.
 *
 * @param nodes A node array.
 * @param context A context string.
 * @returns A closure that returns
 *     the content of the next content node. Returns only context string if list
 *     is exhausted.
 */
export function contentIterator(nodes: Element[], context: string) {
  const func = suCI(nodes, context);
  const parentNode = nodes[0].parentNode.parentNode as Element;
  const match = parentNode.getAttribute('annotation')?.match(/depth:(\d+)/);
  const depth = match ? match[1] : '';
  return function () {
    const descrs = func();
    descrs.unshift(
      new AuditoryDescription({ text: '', layout: `beginrel${depth}` })
    );
    descrs.push(
      new AuditoryDescription({ text: '', layout: `endrel${depth}` })
    );
    return descrs;
  };
}

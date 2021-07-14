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
 * @fileoverview Utility functions for nemeth rules.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import {AuditoryDescription} from '../audio/auditory_description';
import * as DomUtil from '../common/dom_util';
import XpathUtil from '../common/xpath_util';
import {Grammar} from '../rule_engine/grammar';
import {SpeechRuleEngine} from '../rule_engine/speech_rule_engine';
import {SemanticAnnotations} from '../semantic_tree/semantic_annotations';
import {SemanticVisitor} from '../semantic_tree/semantic_annotator';
import {SemanticRole, SemanticType} from '../semantic_tree/semantic_attr';
import {SemanticNode} from '../semantic_tree/semantic_node';

import {LOCALE} from '../l10n/locale';
import * as MathspeakUtil from './mathspeak_util';


/**
 * Opening string for fractions in linear Nemeth.
 * @param node The fraction node.
 * @return The opening string.
 */
export function openingFraction(node: Element): string {
  let depth = MathspeakUtil.fractionNestingDepth(node);
  return (new Array(depth)).join(LOCALE.MESSAGES.MS.FRACTION_REPEAT) +
      LOCALE.MESSAGES.MS.FRACTION_START;
}


/**
 * Closing string for fractions in linear Nemeth.
 * @param node The fraction node.
 * @return The closing string.
 */
export function closingFraction(node: Element): string {
  let depth = MathspeakUtil.fractionNestingDepth(node);
  return (new Array(depth)).join(LOCALE.MESSAGES.MS.FRACTION_REPEAT) + LOCALE.MESSAGES.MS.FRACTION_END;
}


/**
 * Middle string for fractions in linear Nemeth.
 * @param node The fraction node.
 * @return The middle string.
 */
export function overFraction(node: Element): string {
  let depth = MathspeakUtil.fractionNestingDepth(node);
  return (new Array(depth)).join(LOCALE.MESSAGES.MS.FRACTION_REPEAT) + LOCALE.MESSAGES.MS.FRACTION_OVER;
}


/**
 * Middle string for bevelled fractions in Nemeth.
 * @param node The fraction node.
 * @return The middle string.
 */
export function overBevelledFraction(node: Element): string {
  let depth = MathspeakUtil.fractionNestingDepth(node);
  return (new Array(depth)).join(LOCALE.MESSAGES.MS.FRACTION_REPEAT) + '⠸' +
      LOCALE.MESSAGES.MS.FRACTION_OVER;
}


/**
 * Nested Braille radicals in Nemeth putting together the nesting counter with
 * the correct indicator string as postfix.
 * @param node The radical node.
 * @param postfix A postfix string.
 * @return The opening string.
 */
export function nestedRadical(node: Element, postfix: string): string {
  let depth = radicalNestingDepth(node);
  if (depth === 1) {
    return postfix;
  }
  return (new Array(depth)).join(LOCALE.MESSAGES.MS.NESTED) + postfix;
}


/**
 * Computes and returns the nesting depth of radical nodes.
 * @param node The radical node.
 * @param opt_depth The optional depth.
 * @return The nesting depth. 0 if the node is not a radical.
 */
export function radicalNestingDepth(node: Element, opt_depth?: number): number {
  let depth = opt_depth || 0;
  if (!node.parentNode) {
    return depth;
  }
  return radicalNestingDepth(
      node.parentNode as Element,
      node.tagName === 'root' || node.tagName === 'sqrt' ? depth + 1 : depth);
}


/**
 * Opening string for radicals in Nemeth.
 * @param node The radical node.
 * @return The opening string.
 */
export function openingRadical(node: Element): string {
  return nestedRadical(node, LOCALE.MESSAGES.MS.STARTROOT);
}


/**
 * Closing string for radicals in Nemeth.
 * @param node The radical node.
 * @return The closing string.
 */
export function closingRadical(node: Element): string {
  return nestedRadical(node, LOCALE.MESSAGES.MS.ENDROOT);
}


/**
 * Middle string for radicals in Nemeth.
 * @param node The radical node.
 * @return The middle string.
 */
export function indexRadical(node: Element): string {
  return nestedRadical(node, LOCALE.MESSAGES.MS.ROOTINDEX);
}


/**
 * Enlarges a fence operator. The enlargement indicator might need to be
 * interspersed if multiple neutral fences are used.
 * @param text The text representing the fence.
 * @return The fence with the enlargment indicator.
 */
export function enlargeFence(text: string): string {
  let start = '⠠';
  if (text.length === 1) {
    return start + text;
  }
  let neut = '⠳';
  let split = text.split('');
  if (split.every(function(x) {
        return x === neut;
      })) {
    return start + split.join(start);
  }
  return text.slice(0, 1) + start + text.slice(1);
}


Grammar.getInstance().setCorrection('enlargeFence', enlargeFence);


export const NUMBER_PROPAGATORS_: SemanticType[] = [
  SemanticType.MULTIREL, SemanticType.RELSEQ,
  SemanticType.APPL, SemanticType.ROW,
  SemanticType.LINE
];


export const NUMBER_INHIBITORS_: SemanticType[] = [
  SemanticType.SUBSCRIPT, SemanticType.SUPERSCRIPT,
  SemanticType.OVERSCORE, SemanticType.UNDERSCORE
];


/**
 * Checks if a Nemeth number indicator has to be propagated beyond the node's
 * parent.
 * @param node The node which can get a number indicator.
 * @param info True if we are in an enclosed list.
 * @return True if parent is a relation, punctuation or application or
 *     a negative sign.
 */
export function checkParent_(
    node: SemanticNode, info: {[key: string]: boolean}): boolean {
  let parent = node.parent;
  if (!parent) {
    return false;
  }
  let type = parent.type;
  if (NUMBER_PROPAGATORS_.indexOf(type) !== -1 ||
      type === SemanticType.PREFIXOP &&
          parent.role === SemanticRole.NEGATIVE && !info.script ||
      type === SemanticType.PREFIXOP &&
          // TODO: This needs to be rewritten once there is a better treatment
          // of prefixop.
          parent.role === SemanticRole.GEOMETRY) {
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
 * @param node The semantic node.
 * @param.
 * @return Info pair consisting of a string and the updated
 *     information object.
 */
export function propagateNumber(
    node: SemanticNode, info: {[key: string]: any}): any[] {
  // TODO: Font indicator followed by number.
  // TODO: Check for enclosed list
  if (!node.childNodes.length) {
    if (checkParent_(node, info)) {
      info.number = true;
      info.script = false;
      info.enclosed = false;
    }
    return [
      info['number'] ? 'number' : '',
      {number: false, enclosed: info.enclosed, script: info.script}
    ];
  }
  if (NUMBER_INHIBITORS_.indexOf(node.type) !== -1) {
    info.script = true;
  }
  if (node.type === SemanticType.FENCED) {
    info.number = false;
    info.enclosed = true;
    return ['', info];
  }
  if (checkParent_(node, info)) {
    info.number = true;
    info.enclosed = false;
  }
  return ['', info];
}


SemanticAnnotations.register(
    new SemanticVisitor('nemeth', 'number', propagateNumber, {number: true}));


/**
 * Iterates over the list of relation nodes and intersperses Braille spaces if
 * necessary.
 * @param nodes A node array.
 * @param context A context string.
 * @return A closure that returns
 *     the content of the next content node. Returns only context string if list
 *     is exhausted.
 */
export function relationIterator(nodes: Element[], context: string): () =>
    AuditoryDescription[] {
  let childNodes = nodes.slice(0);
  let first = true;
  let contentNodes: Element[];
  if (nodes.length > 0) {
    contentNodes = XpathUtil.evalXPath('../../content/*', nodes[0]) as Element[];
  } else {
    contentNodes = [];
  }
  return function() {
    let content = contentNodes.shift();
    let leftChild = childNodes.shift();
    let rightChild = childNodes[0];
    let contextDescr = context ?
        [AuditoryDescription.create({text: context}, {translate: true})] :
        [];
    if (!content) {
      return contextDescr;
    }
    let base = leftChild ?
        MathspeakUtil.nestedSubSuper(
            leftChild, '', {sup: LOCALE.MESSAGES.MS.SUPER, sub: LOCALE.MESSAGES.MS.SUB}) :
        '';
    let left = leftChild && DomUtil.tagName(leftChild) !== 'EMPTY' ||
            first && content.parentNode.parentNode &&
                content.parentNode.parentNode.previousSibling ?
        [AuditoryDescription.create({text: '⠀' + base}, {})] :
        [];
    let right = rightChild && DomUtil.tagName(rightChild) !== 'EMPTY' ||
            !contentNodes.length && content.parentNode.parentNode &&
                content.parentNode.parentNode.nextSibling ?
        [AuditoryDescription.create({text: '⠀'}, {})] :
        [];
    let descrs = SpeechRuleEngine.getInstance().evaluateNode(content);
    first = false;
    return contextDescr.concat(left, descrs, right);
  };
}
/**
 * Iterates over the list of juxtapositions and inserts spaces between two
 * numbers.
 * @param nodes A node array.
 * @param context A context string.
 * @return A closure that returns
 *     the content of the next content node. Returns only context string if list
 *     is exhausted.
 */
export function implicitIterator(nodes: Element[], context: string): () =>
    AuditoryDescription[] {
  let childNodes = nodes.slice(0);
  let contentNodes: Element[];
  if (nodes.length > 0) {
    contentNodes = XpathUtil.evalXPath('../../content/*', nodes[0]) as Element[];
  } else {
    contentNodes = [];
  }
  return function() {
    let leftChild = childNodes.shift();
    let rightChild = childNodes[0];
    let content = contentNodes.shift();
    let contextDescr = context ?
        [AuditoryDescription.create({text: context}, {translate: true})] :
        [];
    if (!content) {
      return contextDescr;
    }
    let left = leftChild && DomUtil.tagName(leftChild) === 'NUMBER';
    let right = rightChild && DomUtil.tagName(rightChild) === 'NUMBER';
    return contextDescr.concat(
        left && right &&
                content.getAttribute('role') === SemanticRole.SPACE ?
            [AuditoryDescription.create({text: '⠀'}, {})] :
            []);
  };
}

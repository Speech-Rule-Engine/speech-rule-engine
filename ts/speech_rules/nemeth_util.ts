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
import {MathStore} from '../rule_engine/math_store';
import {SemanticVisitor} from '../semantic_tree/semantic_annotator';
import {SemanticNode} from '../semantic_tree/semantic_node';

import * as MathspeakUtil from './mathspeak_util';



/**
 * Opening string for fractions in linear Nemeth.
 * @param node The fraction node.
 * @return The opening string.
 */
export function openingFraction(node: Node): string {
  let depth = MathspeakUtil.fractionNestingDepth(node);
  return (new Array(depth)).join(msg.MS.FRACTION_REPEAT) +
      msg.MS.FRACTION_START;
}


/**
 * Closing string for fractions in linear Nemeth.
 * @param node The fraction node.
 * @return The closing string.
 */
export function closingFraction(node: Node): string {
  let depth = MathspeakUtil.fractionNestingDepth(node);
  return (new Array(depth)).join(msg.MS.FRACTION_REPEAT) + msg.MS.FRACTION_END;
}


/**
 * Middle string for fractions in linear Nemeth.
 * @param node The fraction node.
 * @return The middle string.
 */
export function overFraction(node: Node): string {
  let depth = MathspeakUtil.fractionNestingDepth(node);
  return (new Array(depth)).join(msg.MS.FRACTION_REPEAT) + msg.MS.FRACTION_OVER;
}


/**
 * Middle string for bevelled fractions in Nemeth.
 * @param node The fraction node.
 * @return The middle string.
 */
export function overBevelledFraction(node: Node): string {
  let depth = MathspeakUtil.fractionNestingDepth(node);
  return (new Array(depth)).join(msg.MS.FRACTION_REPEAT) + '⠸' +
      msg.MS.FRACTION_OVER;
}


/**
 * Nested Braille radicals in Nemeth putting together the nesting counter with
 * the correct indicator string as postfix.
 * @param node The radical node.
 * @param postfix A postfix string.
 * @return The opening string.
 */
export function nestedRadical(node: Node, postfix: string): string {
  let depth = radicalNestingDepth(node);
  if (depth === 1) {
    return postfix;
  }
  return (new Array(depth)).join(msg.MS.NESTED) + postfix;
}


/**
 * Computes and returns the nesting depth of radical nodes.
 * @param node The radical node.
 * @param opt_depth The optional depth.
 * @return The nesting depth. 0 if the node is not a radical.
 */
export function radicalNestingDepth(node: Node, opt_depth?: number): number {
  let depth = opt_depth || 0;
  if (!node.parentNode) {
    return depth;
  }
  return radicalNestingDepth(
      node.parentNode,
      node.tagName === 'root' || node.tagName === 'sqrt' ? depth + 1 : depth);
}


/**
 * Opening string for radicals in Nemeth.
 * @param node The radical node.
 * @return The opening string.
 */
export function openingRadical(node: Node): string {
  return nestedRadical(node, msg.MS.STARTROOT);
}


/**
 * Closing string for radicals in Nemeth.
 * @param node The radical node.
 * @return The closing string.
 */
export function closingRadical(node: Node): string {
  return nestedRadical(node, msg.MS.ENDROOT);
}


/**
 * Middle string for radicals in Nemeth.
 * @param node The radical node.
 * @return The middle string.
 */
export function indexRadical(node: Node): string {
  return nestedRadical(node, msg.MS.ROOTINDEX);
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


sre.Grammar.getInstance().setCorrection('enlargeFence', enlargeFence);


export const NUMBER_PROPAGATORS_: SemanticAttr.Type[] = [
  sre.SemanticAttr.Type.MULTIREL, sre.SemanticAttr.Type.RELSEQ,
  sre.SemanticAttr.Type.APPL, sre.SemanticAttr.Type.ROW,
  sre.SemanticAttr.Type.LINE
];


export const NUMBER_INHIBITORS_: SemanticAttr.Type[] = [
  sre.SemanticAttr.Type.SUBSCRIPT, sre.SemanticAttr.Type.SUPERSCRIPT,
  sre.SemanticAttr.Type.OVERSCORE, sre.SemanticAttr.Type.UNDERSCORE
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
    node: SemanticNode, info: {[key: any]: boolean}): boolean {
  let parent = node.parent;
  if (!parent) {
    return false;
  }
  let type = parent.type;
  if (NUMBER_PROPAGATORS_.indexOf(type) !== -1 ||
      type === sre.SemanticAttr.Type.PREFIXOP &&
          parent.role === sre.SemanticAttr.Role.NEGATIVE && !info.script ||
      type === sre.SemanticAttr.Type.PREFIXOP &&
          // TODO: This needs to be rewritten once there is a better treatment
          // of prefixop.
          parent.role === sre.SemanticAttr.Role.GEOMETRY) {
    return true;
  }
  if (type === sre.SemanticAttr.Type.PUNCTUATED) {
    if (!info.enclosed || parent.role === sre.SemanticAttr.Role.TEXT) {
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
    node: SemanticNode, info: {[key: any]: any}): any[] {
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
  if (node.type === sre.SemanticAttr.Type.FENCED) {
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


sre.SemanticAnnotations.getInstance().register(
    new SemanticVisitor('nemeth', 'number', propagateNumber, {number: true}));


/**
 * Component strings for tensor speech rules.
 */
export enum componentString_ {
  2 = 'CSFbaseline',
  1 = 'CSFsubscript',
  0 = 'CSFsuperscript'
}


/**
 * Child number translation for tensor speech rules.
 */
export enum childNumber_ {
  4 = 2,
  3,
  2 = 1,
  1 = 4,
  0
}


/**
 * Generates the rule strings and constraints for tensor rules.
 * @param constellation Bitvector representing of possible tensor
 *     constellation.
 * @return A list consisting of additional constraints for the
 *     tensor rule plus the strings for the rule.
 */
export function generateTensorRuleStrings_(constellation: string): string[] {
  let constraints = [];
  let verbString = '';
  let constel = parseInt(constellation, 2);

  for (let i = 0; i < 5; i++) {
    let childString = 'children/*[' + childNumber_[i] + ']';
    if (constel & 1) {
      let compString = componentString_[i % 3];
      verbString = '[t] ' + compString + 'Verbose; [n] ' + childString + ';' +
          verbString;
    } else {
      constraints.unshift('name(' + childString + ')="empty"');
    }
    constel >>= 1;
  }
  constraints.push(verbString);
  return constraints;
}
/**
 * Generator for tensor speech rules.
 * @param store The mathstore to which the rules are added.
 */
export function generateTensorRules(store: MathStore) {
  // Constellations are built as bitvectors with the meaning:
  //  lsub lsuper base rsub rsuper
  let defineRule = goog.bind(store.defineRule, store);
  let defineRulesAlias = goog.bind(store.defineRulesAlias, store);
  let constellations = [
    '11111', '11110', '11101', '11100', '10111', '10110', '10101', '10100',
    '01111', '01110', '01101', '01100'
  ];
  for (let i = 0, constel; constel = constellations[i]; i++) {
    let name = 'tensor' + constel;
    let components = generateTensorRuleStrings_(constel);
    let verbStr = components.pop();
    let verbList =
        [name, 'default', verbStr, 'self::tensor'].concat(components);
    // Rules without neighbour.
    defineRule.apply(null, verbList);
    // Rules with baseline.
    let baselineStr = componentString_[2];
    verbStr += '; [t]' + baselineStr + 'Verbose';
    name = name + '-baseline';
    verbList = [
      name, 'default', verbStr, 'self::tensor', 'following-sibling::*'
    ].concat(components);
    defineRule.apply(null, verbList);
    // Rules without neighbour but baseline.
    let aliasList = [
      name, 'self::tensor', 'not(following-sibling::*)',
      'ancestor::fraction|ancestor::punctuated|' +
          'ancestor::fenced|ancestor::root|ancestor::sqrt|' +
          'ancestor::relseq|ancestor::multirel|' +
          '@embellished'
    ].concat(components);
    defineRulesAlias.apply(null, aliasList);
  }
}


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
  if (nodes.length > 0) {
    let contentNodes = sre.XpathUtil.evalXPath('../../content/*', nodes[0]);
  } else {
    let contentNodes = [];
  }
  return function() {
    let content = contentNodes.shift();
    let leftChild = childNodes.shift();
    let rightChild = childNodes[0];
    let contextDescr = context ?
        [sre.AuditoryDescription.create({text: context}, {translate: true})] :
        [];
    if (!content) {
      return contextDescr;
    }
    let base = leftChild ?
        MathspeakUtil.nestedSubSuper(
            leftChild, '', {sup: msg.MS.SUPER, sub: msg.MS.SUB}) :
        '';
    let left = leftChild && sre.DomUtil.tagName(leftChild) !== 'EMPTY' ||
            first && content.parentNode.parentNode &&
                content.parentNode.parentNode.previousSibling ?
        [sre.AuditoryDescription.create({text: '⠀' + base}, {})] :
        [];
    let right = rightChild && sre.DomUtil.tagName(rightChild) !== 'EMPTY' ||
            !contentNodes.length && content.parentNode.parentNode &&
                content.parentNode.parentNode.nextSibling ?
        [sre.AuditoryDescription.create({text: '⠀'}, {})] :
        [];
    let descrs = sre.SpeechRuleEngine.getInstance().evaluateNode(content);
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
  if (nodes.length > 0) {
    let contentNodes = sre.XpathUtil.evalXPath('../../content/*', nodes[0]);
  } else {
    let contentNodes = [];
  }
  return function() {
    let leftChild = childNodes.shift();
    let rightChild = childNodes[0];
    let content = contentNodes.shift();
    let contextDescr = context ?
        [sre.AuditoryDescription.create({text: context}, {translate: true})] :
        [];
    if (!content) {
      return contextDescr;
    }
    let left = leftChild && sre.DomUtil.tagName(leftChild) === 'NUMBER';
    let right = rightChild && sre.DomUtil.tagName(rightChild) === 'NUMBER';
    return contextDescr.concat(
        left && right &&
                content.getAttribute('role') === sre.SemanticAttr.Role.SPACE ?
            [sre.AuditoryDescription.create({text: '⠀'}, {})] :
            []);
  };
}

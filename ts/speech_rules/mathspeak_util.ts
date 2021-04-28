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
 * @fileoverview Utility functions for mathspeak rules.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import * as BaseUtil from '../common/base_util';
import * as DomUtil from '../common/dom_util';
import {SystemExternal} from '../common/system_external';
import * as XpathUtil from '../common/xpath_util';
import * as Messages from '../l10n/messages';
import {MathStore} from '../rule_engine/math_store';
import * as Semantic from '../semantic_tree/semantic';
import {SemanticNode} from '../semantic_tree/semantic_node';
import {SemanticProcessor} from '../semantic_tree/semantic_processor';

import * as NumbersUtil from './numbers_util';



/**
 * String function to separate text into single characters by adding
 * intermittent spaces.
 * @param node The node to be processed.
 * @return The spaced out text.
 */
export function spaceoutText(node: Node): string {
  return Array.from(node.textContent).join(' ');
}


/**
 * Spaces out content of the given node into new elements with single character
 * content.
 * @param node The node to be processed.
 * @param correction A correction function applied
 *     to the newly created semantic node with single characters.
 * @return List of single nodes.
 */
export function spaceoutNodes(
    node: Node, correction: (p1: SemanticNode) => any): Node[] {
  let content = Array.from(node.textContent);
  let result = [];
  let processor = SemanticProcessor.getInstance();
  let doc = node.ownerDocument;
  for (let i = 0, chr; chr = content[i]; i++) {
    let leaf =
        processor.getNodeFactory().makeLeafNode(chr, Semantic.Font.UNKNOWN);
    let sn = processor.identifierNode(leaf, Semantic.Font.UNKNOWN, '');
    correction(sn);
    result.push(sn.xml(doc));
  }
  return result;
}



/**
 * Query function that splits into number nodes and content nodes.
 * @param node The node to be processed.
 * @return List of single number nodes.
 */
export function spaceoutNumber(node: Node): Node[] {
  return spaceoutNodes(node, function(sn) {
    if (!sn.textContent.match(/\W/)) {
      sn.type = Semantic.Type.NUMBER;
    }
  });
}


/**
 * Query function that splits into number nodes and content nodes.
 * @param node The node to be processed.
 * @return List of single identifier nodes.
 */
export function spaceoutIdentifier(node: Node): Node[] {
  return spaceoutNodes(node, function(sn) {
    sn.font = Semantic.Font.UNKNOWN;
    sn.type = Semantic.Type.IDENTIFIER;
  });
}


/**
 * Tags that serve as a nesting barrier by default.
 */
export const nestingBarriers: Semantic.Type[] = [
  Semantic.Type.CASES, Semantic.Type.CELL, Semantic.Type.INTEGRAL,
  Semantic.Type.LINE, Semantic.Type.MATRIX, Semantic.Type.MULTILINE,
  Semantic.Type.OVERSCORE, Semantic.Type.ROOT, Semantic.Type.ROW,
  Semantic.Type.SQRT, Semantic.Type.SUBSCRIPT, Semantic.Type.SUPERSCRIPT,
  Semantic.Type.TABLE, Semantic.Type.UNDERSCORE, Semantic.Type.VECTOR
];


/**
 * Resets the nesting depth parameters. Method should be used on every new
 * expression.
 * @param node The node to translate.
 * @return Array containing the original node only.
 */
export function resetNestingDepth(node: Node): Node[] {
  nestingDepth = {};
  return [node];
}


/**
 * Computes the depth of nested descendants of a particular set of tags for a
 * node.
 * @param type The type of nesting depth.
 * @param node The XML node to check.
 * @param tags The tags to be considered for the nesting depth.
 * @param opt_barrierTags Optional list of tags
 *     that serve as barrier.
 * @param opt_barrierAttrs Attribute value pairs that
 *     serve as barrier.
 * @param opt_func A function that overrides both
 *     tags and attribute barriers, i.e., if function returns true it will be
 *     considered as barrier, otherwise tags and attributes will be considered.
 * @return The nesting depth.
 */
export function getNestingDepth(
    type: string, node: Node, tags: string[], opt_barrierTags?: Semantic.Attr[],
    opt_barrierAttrs?: {[key: string]: string},
    opt_func?: (p1: Node) => boolean): number {
  opt_barrierTags = opt_barrierTags || nestingBarriers;
  opt_barrierAttrs = opt_barrierAttrs || {};
  opt_func = opt_func || function(node) {
    return false;
  };
  let xmlText =
      (new SystemExternal.xmldom.XMLSerializer()).serializeToString(node);
  if (!nestingDepth[type]) {
    nestingDepth[type] = {};
  }
  if (nestingDepth[type][xmlText]) {
    return nestingDepth[type][xmlText];
  }
  if (opt_func(node) || tags.indexOf(node.tagName) < 0) {
    return 0;
  }
  let depth = computeNestingDepth_(
      node, tags, BaseUtil.setdifference(opt_barrierTags, tags),
      opt_barrierAttrs, opt_func, 0);
  nestingDepth[type][xmlText] = depth;
  return depth;
}


/**
 * Checks if a node contains given attribute value pairs.
 * @param node The XML node to check.
 * @param attrs Attribute value pairs.
 * @return True if all attributes are contained and have the given
 *     values.
 */
export function containsAttr(node: Node, attrs: {[key: string]: string}): boolean {
  if (!node.attributes) {
    return false;
  }
  let attributes = DomUtil.toArray(node.attributes);
  for (let i = 0, attr; attr = attributes[i]; i++) {
    if (attrs[attr.nodeName] === attr.nodeValue) {
      return true;
    }
  }
  return false;
}


/**
 * Computes the depth of nested descendants of a particular set of tags for a
 * node recursively.
 * @param node The XML node to process.
 * @param tags The tags to be considered for the nesting depth.
 * @param barriers List of tags that serve as barrier.
 * @param attrs Attribute value pairs that serve as
 *     barrier.
 * @param func A function that overrides both tags
 *     and attribute barriers, i.e., if function returns true it will be
 *     considered as barrier, otherwise tags and attributes will be considered.
 * @param depth Accumulator for the nesting depth that is computed.
 * @return The nesting depth.
 */
export function computeNestingDepth_(
    node: Node, tags: string[], barriers: string[], attrs: {[key: string]: string},
    func: (p1: Node) => boolean, depth: number): number {
  if (func(node) || barriers.indexOf(node.tagName) > -1 ||
      containsAttr(node, attrs)) {
    return depth;
  }
  if (tags.indexOf(node.tagName) > -1) {
    depth++;
  }
  if (!node.childNodes || node.childNodes.length === 0) {
    return depth;
  }
  let children = DomUtil.toArray(node.childNodes);
  return Math.max.apply(null, children.map(function(subNode) {
    return computeNestingDepth_(subNode, tags, barriers, attrs, func, depth);
  }));
}


// TODO (sorge) Refactor the following to functions wrt. style attribute.
/**
 * Computes and returns the nesting depth of fraction nodes.
 * @param node The fraction node.
 * @return The nesting depth. 0 if the node is not a fraction.
 */
export function fractionNestingDepth(node: Node): number {
  return getNestingDepth(
      'fraction', node, ['fraction'], nestingBarriers, {},
      msg.MS_FUNC.FRAC_NEST_DEPTH);
}


/**
 * Computes disambiguations for nested fractions.
 * @param node The fraction node.
 * @param expr The disambiguating expression.
 * @param opt_end Optional end expression.
 * @return The disambiguating string.
 */
export function nestedFraction(
    node: Node, expr: string, opt_end?: string): string {
  let depth = fractionNestingDepth(node);
  let annotation = Array.apply(null, Array(depth)).map((x) => expr);
  if (opt_end) {
    annotation.push(opt_end);
  }
  return annotation.join(msg.REGEXP.JOINER_FRAC);
}


/**
 * Opening string for fractions in Mathspeak verbose mode.
 * @param node The fraction node.
 * @return The opening string.
 */
export function openingFractionVerbose(node: Node): string {
  return nestedFraction(node, msg.MS.START, msg.MS.FRAC_V);
}


/**
 * Closing string for fractions in Mathspeak verbose mode.
 * @param node The fraction node.
 * @return The closing string.
 */
export function closingFractionVerbose(node: Node): string {
  return nestedFraction(node, msg.MS.END, msg.MS.FRAC_V);
}


/**
 * Middle string for fractions in Mathspeak verbose mode.
 * @param node The fraction node.
 * @return The middle string.
 */
export function overFractionVerbose(node: Node): string {
  return nestedFraction(node, msg.MS.FRAC_OVER);
}


/**
 * Opening string for fractions in Mathspeak brief mode.
 * @param node The fraction node.
 * @return The opening string.
 */
export function openingFractionBrief(node: Node): string {
  return nestedFraction(node, msg.MS.START, msg.MS.FRAC_B);
}


/**
 * Closing string for fractions in Mathspeak brief mode.
 * @param node The fraction node.
 * @return The closing string.
 */
export function closingFractionBrief(node: Node): string {
  return nestedFraction(node, msg.MS.END, msg.MS.FRAC_B);
}


/**
 * Opening string for fractions in Mathspeak superbrief mode.
 * @param node The fraction node.
 * @return The opening string.
 */
export function openingFractionSbrief(node: Node): string {
  let depth = fractionNestingDepth(node);
  if (depth === 1) {
    return msg.MS.FRAC_S;
  }
  return msg.MS_FUNC.COMBINE_NESTED_FRACTION(
      msg.MS.NEST_FRAC, msg.MS_FUNC.RADICAL_NEST_DEPTH(depth - 1),
      msg.MS.FRAC_S);
}


/**
 * Closing string for fractions in Mathspeak superbrief mode.
 * @param node The fraction node.
 * @return The closing string.
 */
export function closingFractionSbrief(node: Node): string {
  let depth = fractionNestingDepth(node);
  if (depth === 1) {
    return msg.MS.ENDFRAC;
  }
  return msg.MS_FUNC.COMBINE_NESTED_FRACTION(
      msg.MS.NEST_FRAC, msg.MS_FUNC.RADICAL_NEST_DEPTH(depth - 1),
      msg.MS.ENDFRAC);
}


/**
 * Middle string for fractions in Mathspeak superbrief mode.
 * @param node The fraction node.
 * @return The middle string.
 */
export function overFractionSbrief(node: Node): string {
  let depth = fractionNestingDepth(node);
  if (depth === 1) {
    return msg.MS.FRAC_OVER;
  }
  return msg.MS_FUNC.COMBINE_NESTED_FRACTION(
      msg.MS.NEST_FRAC, msg.MS_FUNC.RADICAL_NEST_DEPTH(depth - 1),
      msg.MS.FRAC_OVER);
}


/**
 * Custom query function to check if a vulgar fraction is small enough to be
 * spoken as numbers in MathSpeak.
 * @param node Fraction node to be tested.
 * @return List containing the node if it is eligible. Otherwise
 *     empty.
 */
export function isSmallVulgarFraction(node: Node): Node[] {
  return NumbersUtil.vulgarFractionSmall(node, 10, 100) ? [node] : [];
}


/**
 * Computes prefix for sub and superscript nodes.
 * @param node Subscript node.
 * @param init Initial prefix string.
 * @param replace Prefix strings for sub and
 *     superscript.
 * @return The complete prefix string.
 */
export function nestedSubSuper(
    node: Node, init: string, replace: {sup: string, sub: string}): string {
  while (node.parentNode) {
    let children = node.parentNode;
    let parent = children.parentNode;
    if (!parent) {
      break;
    }
    let nodeRole = node.getAttribute && node.getAttribute('role');
    if (parent.tagName === Semantic.Type.SUBSCRIPT &&
            node === children.childNodes[1] ||
        parent.tagName === Semantic.Type.TENSOR && nodeRole &&
            (nodeRole === Semantic.Role.LEFTSUB ||
             nodeRole === Semantic.Role.RIGHTSUB)) {
      init = replace.sub + msg.REGEXP.JOINER_SUBSUPER + init;
    }
    if (parent.tagName === Semantic.Type.SUPERSCRIPT &&
            node === children.childNodes[1] ||
        parent.tagName === Semantic.Type.TENSOR && nodeRole &&
            (nodeRole === Semantic.Role.LEFTSUPER ||
             nodeRole === Semantic.Role.RIGHTSUPER)) {
      init = replace.sup + msg.REGEXP.JOINER_SUBSUPER + init;
    }
    node = parent;
  }
  return init.trim();
}


/**
 * Computes subscript prefix in verbose mode.
 * @param node Subscript node.
 * @return The prefix string.
 */
export function subscriptVerbose(node: Node): string {
  return nestedSubSuper(
      node, msg.MS.SUBSCRIPT, {sup: msg.MS.SUPER, sub: msg.MS.SUB});
}


/**
 * Computes subscript prefix in brief mode.
 * @param node Subscript node.
 * @return The prefix string.
 */
export function subscriptBrief(node: Node): string {
  return nestedSubSuper(node, msg.MS.SUB, {sup: msg.MS.SUP, sub: msg.MS.SUB});
}


/**
 * Computes subscript prefix in verbose mode.
 * @param node Subscript node.
 * @return The prefix string.
 */
export function superscriptVerbose(node: Node): string {
  return nestedSubSuper(
      node, msg.MS.SUPERSCRIPT, {sup: msg.MS.SUPER, sub: msg.MS.SUB});
}


/**
 * Computes subscript prefix in brief mode.
 * @param node Subscript node.
 * @return The prefix string.
 */
export function superscriptBrief(node: Node): string {
  return nestedSubSuper(node, msg.MS.SUP, {sup: msg.MS.SUP, sub: msg.MS.SUB});
}


/**
 * Computes subscript prefix in verbose mode.
 * @param node Subscript node.
 * @return The prefix string.
 */
export function baselineVerbose(node: Node): string {
  let baseline = nestedSubSuper(node, '', {sup: msg.MS.SUPER, sub: msg.MS.SUB});
  if (!baseline) {
    return msg.MS.BASELINE;
  }
  return baseline.replace(new RegExp(msg.MS.SUB + '$'), msg.MS.SUBSCRIPT)
      .replace(new RegExp(msg.MS.SUPER + '$'), msg.MS.SUPERSCRIPT);
}


/**
 * Computes subscript prefix in brief mode.
 * @param node Subscript node.
 * @return The prefix string.
 */
export function baselineBrief(node: Node): string {
  let baseline = nestedSubSuper(node, '', {sup: msg.MS.SUP, sub: msg.MS.SUB});
  return baseline || msg.MS.BASE;
}


// TODO (sorge) Refactor the following to functions wrt. style attribute.
/**
 * Computes and returns the nesting depth of radical nodes.
 * @param node The radical node.
 * @return The nesting depth. 0 if the node is not a radical.
 */
export function radicalNestingDepth(node: Node): number {
  return getNestingDepth(
      'radical', node, ['sqrt', 'root'], nestingBarriers, {});
}


/**
 * Nested string for radicals in Mathspeak mode putting together the nesting
 * depth with a pre- and postfix string that depends on the speech style.
 * @param node The radical node.
 * @param prefix A prefix string.
 * @param postfix A postfix string.
 * @return The opening string.
 */
export function nestedRadical(
    node: Node, prefix: string, postfix: string): string {
  let depth = radicalNestingDepth(node);
  let index = getRootIndex(node);
  postfix = index ? msg.MS_FUNC.COMBINE_ROOT_INDEX(postfix, index) : postfix;
  if (depth === 1) {
    return postfix;
  }
  return msg.MS_FUNC.COMBINE_NESTED_RADICAL(
      prefix, msg.MS_FUNC.RADICAL_NEST_DEPTH(depth - 1), postfix);
}


/**
 * A string indexing the root.
 * @param node The radical node.
 * @return The localised indexing string if it exists.
 */
export function getRootIndex(node: Node): string {
  let content = node.tagName === 'sqrt' ? '2' :
                                          // TODO (sorge): Make that safer?
      XpathUtil.evalXPath('children/*[1]', node)[0].textContent.trim();
  return msg.MS_ROOT_INDEX[content] || '';
}
/**
 * Opening string for radicals in Mathspeak verbose mode.
 * @param node The radical node.
 * @return The opening string.
 */
export function openingRadicalVerbose(node: Node): string {
  return nestedRadical(node, msg.MS.NESTED, msg.MS.STARTROOT);
}


/**
 * Closing string for radicals in Mathspeak verbose mode.
 * @param node The radical node.
 * @return The closing string.
 */
export function closingRadicalVerbose(node: Node): string {
  return nestedRadical(node, msg.MS.NESTED, msg.MS.ENDROOT);
}


/**
 * Middle string for radicals in Mathspeak verbose mode.
 * @param node The radical node.
 * @return The middle string.
 */
export function indexRadicalVerbose(node: Node): string {
  return nestedRadical(node, msg.MS.NESTED, msg.MS.ROOTINDEX);
}


/**
 * Opening string for radicals in Mathspeak brief mode.
 * @param node The radical node.
 * @return The opening string.
 */
export function openingRadicalBrief(node: Node): string {
  return nestedRadical(node, msg.MS.NEST_ROOT, msg.MS.STARTROOT);
}


/**
 * Closing string for radicals in Mathspeak brief mode.
 * @param node The radical node.
 * @return The closing string.
 */
export function closingRadicalBrief(node: Node): string {
  return nestedRadical(node, msg.MS.NEST_ROOT, msg.MS.ENDROOT);
}


/**
 * Middle string for radicals in Mathspeak superbrief mode.
 * @param node The radical node.
 * @return The middle string.
 */
export function indexRadicalBrief(node: Node): string {
  return nestedRadical(node, msg.MS.NEST_ROOT, msg.MS.ROOTINDEX);
}


/**
 * Opening string for radicals in Mathspeak superbrief mode.
 * @param node The radical node.
 * @return The opening string.
 */
export function openingRadicalSbrief(node: Node): string {
  return nestedRadical(node, msg.MS.NEST_ROOT, msg.MS.ROOT);
}


/**
 * Middle string for radicals in Mathspeak superbrief mode.
 * @param node The radical node.
 * @return The middle string.
 */
export function indexRadicalSbrief(node: Node): string {
  return nestedRadical(node, msg.MS.NEST_ROOT, msg.MS.INDEX);
}


/**
 * Computes and returns the nesting depth of underscore nodes.
 * @param node The underscore node.
 * @return The nesting depth. 0 if the node is not an underscore.
 */
export function underscoreNestingDepth(node: Node): number {
  return getNestingDepth(
      'underscore', node, ['underscore'], nestingBarriers, {}, function(node) {
        return node.tagName && node.tagName === Semantic.Type.UNDERSCORE &&
            node.childNodes[0].childNodes[1].getAttribute('role') ===
            Semantic.Role.UNDERACCENT;
      });
}


/**
 * String function to construct and underscript prefix.
 * @param node The underscore node.
 * @return The correct prefix string.
 */
export function nestedUnderscore(node: Node): string {
  let depth = underscoreNestingDepth(node);
  return Array(depth).join(msg.MS.UNDER) + msg.MS.UNDERSCRIPT;
}


/**
 * Computes and returns the nesting depth of overscore nodes.
 * @param node The overscore node.
 * @return The nesting depth. 0 if the node is not an overscore.
 */
export function overscoreNestingDepth(node: Node): number {
  return getNestingDepth(
      'overscore', node, ['overscore'], nestingBarriers, {}, function(node) {
        return node.tagName && node.tagName === Semantic.Type.OVERSCORE &&
            node.childNodes[0].childNodes[1].getAttribute('role') ===
            Semantic.Role.OVERACCENT;
      });
}


/**
 * String function to construct and overscript prefix.
 * @param node The overscore node.
 * @return The correct prefix string.
 */
export function nestedOverscore(node: Node): string {
  let depth = overscoreNestingDepth(node);
  return Array(depth).join(msg.MS.OVER) + msg.MS.OVERSCRIPT;
}


/**
 * Query function that Checks if we have a simple determinant in the sense that
 * every cell only contains single letters or numbers.
 * @param node The determinant node.
 * @return List containing input node if true.
 */
export function determinantIsSimple(node: Node): Node[] {
  if (node.tagName !== Semantic.Type.MATRIX ||
      node.getAttribute('role') !== Semantic.Role.DETERMINANT) {
    return [];
  }
  let cells =
      XpathUtil.evalXPath('children/row/children/cell/children/*', node);
  for (let i = 0, cell; cell = cells[i]; i++) {
    if (cell.tagName === Semantic.Type.NUMBER) {
      continue;
    }
    if (cell.tagName === Semantic.Type.IDENTIFIER) {
      let role = cell.getAttribute('role');
      if (role === Semantic.Role.LATINLETTER ||
          role === Semantic.Role.GREEKLETTER ||
          role === Semantic.Role.OTHERLETTER) {
        continue;
      }
    }
    return [];
  }
  return [node];
}
/**
 * Generate constraints for the specialised baseline rules of relation
 * sequences.
 * @return The constraint strings.
 */
export function generateBaselineConstraint(): string[] {
  let ignoreElems = ['subscript', 'superscript', 'tensor'];
  let mainElems = ['relseq', 'multrel'];
  let breakElems = ['fraction', 'punctuation', 'fenced', 'sqrt', 'root'];

  let ancestrify = function(elemList) {
    return elemList.map(function(elem) {
      return 'ancestor::' + elem;
    });
  };

  let notify = function(elem) {
    return 'not(' + elem + ')';
  };

  let prefix = 'ancestor::*/following-sibling::*';
  let middle = notify(ancestrify(ignoreElems).join(' or '));
  let mainList = ancestrify(mainElems);
  let breakList = ancestrify(breakElems);
  let breakCstrs = [];
  for (let i = 0, brk; brk = breakList[i]; i++) {
    breakCstrs = breakCstrs.concat(mainList.map(function(elem) {
      return brk + '/' + elem;
    }));
  }
  let postfix = notify(breakCstrs.join(' | '));
  return [[prefix, middle, postfix].join(' and ')];
}


/**
 * Removes parentheses around a label.
 * @param node The label to be processed.
 * @return The text of the label.
 */
export function removeParens(node: Node): string {
  if (!node.childNodes.length || !node.childNodes[0].childNodes.length ||
      !node.childNodes[0].childNodes[0].childNodes.length) {
    return '';
  }
  let content = node.childNodes[0].childNodes[0].childNodes[0].textContent;
  return content.match(/^\(.+\)$/) ? content.slice(1, -1) : content;
}


// Generating rules for tensors.
/**
 * Component strings for tensor speech rules.
 */
export enum componentString_ {
  3 = 'CSFleftsuperscript',
  4 = 'CSFleftsubscript',
  2 = 'CSFbaseline',
  1 = 'CSFrightsubscript',
  0 = 'CSFrightsuperscript'
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
 *     tensor rule, plus the strings for the verbose and brief rule, in that
 *     order.
 */
export function generateTensorRuleStrings_(constellation: string): string[] {
  let constraints = [];
  let verbString = '';
  let briefString = '';
  let constel = parseInt(constellation, 2);

  for (let i = 0; i < 5; i++) {
    let childString = 'children/*[' + childNumber_[i] + ']';
    if (constel & 1) {
      let compString = componentString_[i % 5];
      verbString = '[t] ' + compString + 'Verbose; [n] ' + childString + ';' +
          verbString;
      briefString =
          '[t] ' + compString + 'Brief; [n] ' + childString + ';' + briefString;
    } else {
      constraints.unshift('name(' + childString + ')="empty"');
    }
    constel >>= 1;
  }
  constraints.push(verbString);
  constraints.push(briefString);
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
  let defineSpecialisedRule = goog.bind(store.defineSpecialisedRule, store);
  let constellations = [
    '11111', '11110', '11101', '11100', '10111', '10110', '10101', '10100',
    '01111', '01110', '01101', '01100'
  ];
  for (let i = 0, constel; constel = constellations[i]; i++) {
    let name = 'tensor' + constel;
    let components = generateTensorRuleStrings_(constel);
    let briefStr = components.pop();
    let verbStr = components.pop();
    let verbList =
        [name, 'default', verbStr, 'self::tensor'].concat(components);
    let briefList =
        [name, 'brief', briefStr, 'self::tensor'].concat(components);
    // Rules without neighbour.
    defineRule.apply(null, verbList);
    defineRule.apply(null, briefList);
    defineSpecialisedRule(name, 'brief', 'sbrief');
    // Rules with baseline.
    let baselineStr = componentString_[2];
    verbStr += '; [t]' + baselineStr + 'Verbose';
    briefStr += '; [t]' + baselineStr + 'Brief';
    name = name + '-baseline';
    let cstr = '((.//*[not(*)])[last()]/@id)!=(((.//ancestor::fraction|' +
        'ancestor::root|ancestor::sqrt|ancestor::cell|ancestor::line|' +
        'ancestor::stree)[1]//*[not(*)])[last()]/@id)';
    verbList =
        [name, 'default', verbStr, 'self::tensor', cstr].concat(components);
    briefList =
        [name, 'brief', briefStr, 'self::tensor', cstr].concat(components);
    defineRule.apply(null, verbList);
    defineRule.apply(null, briefList);
    defineSpecialisedRule(name, 'brief', 'sbrief');
  }
}

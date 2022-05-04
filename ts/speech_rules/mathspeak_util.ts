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
 * @file Utility functions for mathspeak rules.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import * as BaseUtil from '../common/base_util';
import * as DomUtil from '../common/dom_util';
import * as XpathUtil from '../common/xpath_util';
import { LOCALE } from '../l10n/locale';

import { SpeechRuleStore } from '../rule_engine/speech_rule_store';
import * as Semantic from '../semantic_tree/semantic';
import {
  SemanticFont,
  SemanticRole,
  SemanticType
} from '../semantic_tree/semantic_meaning';
import { SemanticNode } from '../semantic_tree/semantic_node';
import SemanticProcessor from '../semantic_tree/semantic_processor';

// import * as NumbersUtil from './numbers_util';

/**
 * Dictionary to store the nesting depth of each node.
 */
let nestingDepth: { [k1: string]: { [k2: string]: number } } = {};

/**
 * String function to separate text into single characters by adding
 * intermittent spaces.
 *
 * @param node The node to be processed.
 * @returns The spaced out text.
 */
export function spaceoutText(node: Element): string {
  return Array.from(node.textContent).join(' ');
}

/**
 * Spaces out content of the given node into new elements with single character
 * content.
 *
 * @param node The node to be processed.
 * @param correction A correction function applied
 *     to the newly created semantic node with single characters.
 * @returns List of single nodes.
 */
export function spaceoutNodes(
  node: Element,
  correction: (p1: SemanticNode) => any
): Element[] {
  const content = Array.from(node.textContent);
  const result = [];
  const processor = SemanticProcessor.getInstance();
  const doc = node.ownerDocument;
  for (let i = 0, chr; (chr = content[i]); i++) {
    const leaf = processor
      .getNodeFactory()
      .makeLeafNode(chr, SemanticFont.UNKNOWN);
    const sn = processor.identifierNode(leaf, SemanticFont.UNKNOWN, '');
    correction(sn);
    result.push(sn.xml(doc));
  }
  return result as Element[];
}

/**
 * Query function that splits into number nodes and content nodes.
 *
 * @param node The node to be processed.
 * @returns List of single number nodes.
 */
export function spaceoutNumber(node: Element): Element[] {
  return spaceoutNodes(node, function (sn) {
    if (!sn.textContent.match(/\W/)) {
      sn.type = SemanticType.NUMBER;
    }
  });
}

/**
 * Query function that splits into number nodes and content nodes.
 *
 * @param node The node to be processed.
 * @returns List of single identifier nodes.
 */
export function spaceoutIdentifier(node: Element): Element[] {
  return spaceoutNodes(node, function (sn) {
    sn.font = SemanticFont.UNKNOWN;
    sn.type = SemanticType.IDENTIFIER;
  });
}

/**
 * Tags that serve as a nesting barrier by default.
 */
export const nestingBarriers: SemanticType[] = [
  SemanticType.CASES,
  SemanticType.CELL,
  SemanticType.INTEGRAL,
  SemanticType.LINE,
  SemanticType.MATRIX,
  SemanticType.MULTILINE,
  SemanticType.OVERSCORE,
  SemanticType.ROOT,
  SemanticType.ROW,
  SemanticType.SQRT,
  SemanticType.SUBSCRIPT,
  SemanticType.SUPERSCRIPT,
  SemanticType.TABLE,
  SemanticType.UNDERSCORE,
  SemanticType.VECTOR
];

/**
 * Resets the nesting depth parameters. Method should be used on every new
 * expression.
 *
 * @param node The node to translate.
 * @returns Array containing the original node only.
 */
export function resetNestingDepth(node: Element): Element[] {
  nestingDepth = {};
  return [node];
}

/**
 * Computes the depth of nested descendants of a particular set of tags for a
 * node.
 *
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
 * @returns The nesting depth.
 */
export function getNestingDepth(
  type: string,
  node: Element,
  tags: string[],
  opt_barrierTags?: Semantic.Attr[],
  opt_barrierAttrs?: { [key: string]: string },
  opt_func?: (p1: Element) => boolean
): number {
  opt_barrierTags = opt_barrierTags || nestingBarriers;
  opt_barrierAttrs = opt_barrierAttrs || {};
  opt_func =
    opt_func ||
    function (_node) {
      return false;
    };
  const xmlText = DomUtil.serializeXml(node);
  if (!nestingDepth[type]) {
    nestingDepth[type] = {};
  }
  if (nestingDepth[type][xmlText]) {
    return nestingDepth[type][xmlText];
  }
  if (opt_func(node) || tags.indexOf(node.tagName) < 0) {
    return 0;
  }
  const depth = computeNestingDepth_(
    node,
    tags,
    BaseUtil.setdifference(opt_barrierTags, tags),
    opt_barrierAttrs,
    opt_func,
    0
  );
  nestingDepth[type][xmlText] = depth;
  return depth;
}

/**
 * Checks if a node contains given attribute value pairs.
 *
 * @param node The XML node to check.
 * @param attrs Attribute value pairs.
 * @returns True if all attributes are contained and have the given
 *     values.
 */
export function containsAttr(
  node: Element,
  attrs: { [key: string]: string }
): boolean {
  if (!node.attributes) {
    return false;
  }
  const attributes = DomUtil.toArray(node.attributes);
  for (let i = 0, attr; (attr = attributes[i]); i++) {
    if (attrs[attr.nodeName] === attr.nodeValue) {
      return true;
    }
  }
  return false;
}

/**
 * Computes the depth of nested descendants of a particular set of tags for a
 * node recursively.
 *
 * @param node The XML node to process.
 * @param tags The tags to be considered for the nesting depth.
 * @param barriers List of tags that serve as barrier.
 * @param attrs Attribute value pairs that serve as
 *     barrier.
 * @param func A function that overrides both tags
 *     and attribute barriers, i.e., if function returns true it will be
 *     considered as barrier, otherwise tags and attributes will be considered.
 * @param depth Accumulator for the nesting depth that is computed.
 * @returns The nesting depth.
 */
export function computeNestingDepth_(
  node: Element,
  tags: string[],
  barriers: string[],
  attrs: { [key: string]: string },
  func: (p1: Element) => boolean,
  depth: number
): number {
  if (
    func(node) ||
    barriers.indexOf(node.tagName) > -1 ||
    containsAttr(node, attrs)
  ) {
    return depth;
  }
  if (tags.indexOf(node.tagName) > -1) {
    depth++;
  }
  if (!node.childNodes || node.childNodes.length === 0) {
    return depth;
  }
  const children = DomUtil.toArray(node.childNodes);
  return Math.max.apply(
    null,
    children.map(function (subNode) {
      return computeNestingDepth_(subNode, tags, barriers, attrs, func, depth);
    })
  );
}

// TODO (sorge) Refactor the following to functions wrt. style attribute.
/**
 * Computes and returns the nesting depth of fraction nodes.
 *
 * @param node The fraction node.
 * @returns The nesting depth. 0 if the node is not a fraction.
 */
export function fractionNestingDepth(node: Element): number {
  return getNestingDepth(
    'fraction',
    node,
    ['fraction'],
    nestingBarriers,
    {},
    // TODO (TS): Make this a proper type.
    LOCALE.FUNCTIONS.fracNestDepth as (n: Element) => boolean
  );
}

/**
 * Computes disambiguations for nested fractions.
 *
 * @param node The fraction node.
 * @param expr The disambiguating expression.
 * @param opt_end Optional end expression.
 * @returns The disambiguating string.
 */
export function nestedFraction(
  node: Element,
  expr: string,
  opt_end?: string
): string {
  const depth = fractionNestingDepth(node);
  const annotation = Array(depth).fill(expr);
  if (opt_end) {
    annotation.push(opt_end);
  }
  return annotation.join(LOCALE.MESSAGES.regexp.JOINER_FRAC);
}

/**
 * Opening string for fractions in Mathspeak verbose mode.
 *
 * @param node The fraction node.
 * @returns The opening string.
 */
export function openingFractionVerbose(node: Element): string {
  return nestedFraction(
    node,
    LOCALE.MESSAGES.MS.START,
    LOCALE.MESSAGES.MS.FRAC_V
  );
}

/**
 * Closing string for fractions in Mathspeak verbose mode.
 *
 * @param node The fraction node.
 * @returns The closing string.
 */
export function closingFractionVerbose(node: Element): string {
  return nestedFraction(
    node,
    LOCALE.MESSAGES.MS.END,
    LOCALE.MESSAGES.MS.FRAC_V
  );
}

/**
 * Middle string for fractions in Mathspeak verbose mode.
 *
 * @param node The fraction node.
 * @returns The middle string.
 */
export function overFractionVerbose(node: Element): string {
  return nestedFraction(node, LOCALE.MESSAGES.MS.FRAC_OVER);
}

/**
 * Opening string for fractions in Mathspeak brief mode.
 *
 * @param node The fraction node.
 * @returns The opening string.
 */
export function openingFractionBrief(node: Element): string {
  return nestedFraction(
    node,
    LOCALE.MESSAGES.MS.START,
    LOCALE.MESSAGES.MS.FRAC_B
  );
}

/**
 * Closing string for fractions in Mathspeak brief mode.
 *
 * @param node The fraction node.
 * @returns The closing string.
 */
export function closingFractionBrief(node: Element): string {
  return nestedFraction(
    node,
    LOCALE.MESSAGES.MS.END,
    LOCALE.MESSAGES.MS.FRAC_B
  );
}

/**
 * Opening string for fractions in Mathspeak superbrief mode.
 *
 * @param node The fraction node.
 * @returns The opening string.
 */
export function openingFractionSbrief(node: Element): string {
  const depth = fractionNestingDepth(node);
  if (depth === 1) {
    return LOCALE.MESSAGES.MS.FRAC_S;
  }
  return LOCALE.FUNCTIONS.combineNestedFraction(
    LOCALE.MESSAGES.MS.NEST_FRAC,
    LOCALE.FUNCTIONS.radicalNestDepth(depth - 1),
    LOCALE.MESSAGES.MS.FRAC_S
  );
}

/**
 * Closing string for fractions in Mathspeak superbrief mode.
 *
 * @param node The fraction node.
 * @returns The closing string.
 */
export function closingFractionSbrief(node: Element): string {
  const depth = fractionNestingDepth(node);
  if (depth === 1) {
    return LOCALE.MESSAGES.MS.ENDFRAC;
  }
  return LOCALE.FUNCTIONS.combineNestedFraction(
    LOCALE.MESSAGES.MS.NEST_FRAC,
    LOCALE.FUNCTIONS.radicalNestDepth(depth - 1),
    LOCALE.MESSAGES.MS.ENDFRAC
  );
}

/**
 * Middle string for fractions in Mathspeak superbrief mode.
 *
 * @param node The fraction node.
 * @returns The middle string.
 */
export function overFractionSbrief(node: Element): string {
  const depth = fractionNestingDepth(node);
  if (depth === 1) {
    return LOCALE.MESSAGES.MS.FRAC_OVER;
  }
  return LOCALE.FUNCTIONS.combineNestedFraction(
    LOCALE.MESSAGES.MS.NEST_FRAC,
    LOCALE.FUNCTIONS.radicalNestDepth(depth - 1),
    LOCALE.MESSAGES.MS.FRAC_OVER
  );
}

/**
 * Custom query function to check if a vulgar fraction is small enough to be
 * spoken as numbers in MathSpeak.
 *
 * @param node Fraction node to be tested.
 * @returns List containing the node if it is eligible. Otherwise
 *     empty.
 */
export function isSmallVulgarFraction(node: Element): Element[] {
  return LOCALE.FUNCTIONS.fracNestDepth(node) ? [node] : [];
}

/**
 * Computes prefix for sub and superscript nodes.
 *
 * @param node Subscript node.
 * @param init Initial prefix string.
 * @param replace Prefix strings for sub and superscript.
 * @param replace.sup Superscript prefixes.
 * @param replace.sub Subscript prefixes.
 * @returns The complete prefix string.
 */
export function nestedSubSuper(
  node: Element,
  init: string,
  replace: { sup: string; sub: string }
): string {
  while (node.parentNode) {
    const children = node.parentNode;
    const parent = children.parentNode as Element;
    if (!parent) {
      break;
    }
    const nodeRole = node.getAttribute && node.getAttribute('role');
    if (
      (parent.tagName === SemanticType.SUBSCRIPT &&
        node === children.childNodes[1]) ||
      (parent.tagName === SemanticType.TENSOR &&
        nodeRole &&
        (nodeRole === SemanticRole.LEFTSUB ||
          nodeRole === SemanticRole.RIGHTSUB))
    ) {
      init = replace.sub + LOCALE.MESSAGES.regexp.JOINER_SUBSUPER + init;
    }
    if (
      (parent.tagName === SemanticType.SUPERSCRIPT &&
        node === children.childNodes[1]) ||
      (parent.tagName === SemanticType.TENSOR &&
        nodeRole &&
        (nodeRole === SemanticRole.LEFTSUPER ||
          nodeRole === SemanticRole.RIGHTSUPER))
    ) {
      init = replace.sup + LOCALE.MESSAGES.regexp.JOINER_SUBSUPER + init;
    }
    node = parent;
  }
  return init.trim();
}

/**
 * Computes subscript prefix in verbose mode.
 *
 * @param node Subscript node.
 * @returns The prefix string.
 */
export function subscriptVerbose(node: Element): string {
  return nestedSubSuper(node, LOCALE.MESSAGES.MS.SUBSCRIPT, {
    sup: LOCALE.MESSAGES.MS.SUPER,
    sub: LOCALE.MESSAGES.MS.SUB
  });
}

/**
 * Computes subscript prefix in brief mode.
 *
 * @param node Subscript node.
 * @returns The prefix string.
 */
export function subscriptBrief(node: Element): string {
  return nestedSubSuper(node, LOCALE.MESSAGES.MS.SUB, {
    sup: LOCALE.MESSAGES.MS.SUP,
    sub: LOCALE.MESSAGES.MS.SUB
  });
}

/**
 * Computes subscript prefix in verbose mode.
 *
 * @param node Subscript node.
 * @returns The prefix string.
 */
export function superscriptVerbose(node: Element): string {
  return nestedSubSuper(node, LOCALE.MESSAGES.MS.SUPERSCRIPT, {
    sup: LOCALE.MESSAGES.MS.SUPER,
    sub: LOCALE.MESSAGES.MS.SUB
  });
}

/**
 * Computes subscript prefix in brief mode.
 *
 * @param node Subscript node.
 * @returns The prefix string.
 */
export function superscriptBrief(node: Element): string {
  return nestedSubSuper(node, LOCALE.MESSAGES.MS.SUP, {
    sup: LOCALE.MESSAGES.MS.SUP,
    sub: LOCALE.MESSAGES.MS.SUB
  });
}

/**
 * Computes subscript prefix in verbose mode.
 *
 * @param node Subscript node.
 * @returns The prefix string.
 */
export function baselineVerbose(node: Element): string {
  const baseline = nestedSubSuper(node, '', {
    sup: LOCALE.MESSAGES.MS.SUPER,
    sub: LOCALE.MESSAGES.MS.SUB
  });
  if (!baseline) {
    return LOCALE.MESSAGES.MS.BASELINE;
  }
  return baseline
    .replace(
      new RegExp(LOCALE.MESSAGES.MS.SUB + '$'),
      LOCALE.MESSAGES.MS.SUBSCRIPT
    )
    .replace(
      new RegExp(LOCALE.MESSAGES.MS.SUPER + '$'),
      LOCALE.MESSAGES.MS.SUPERSCRIPT
    );
}

/**
 * Computes subscript prefix in brief mode.
 *
 * @param node Subscript node.
 * @returns The prefix string.
 */
export function baselineBrief(node: Element): string {
  const baseline = nestedSubSuper(node, '', {
    sup: LOCALE.MESSAGES.MS.SUP,
    sub: LOCALE.MESSAGES.MS.SUB
  });
  return baseline || LOCALE.MESSAGES.MS.BASE;
}

// TODO (sorge) Refactor the following to functions wrt. style attribute.
/**
 * Computes and returns the nesting depth of radical nodes.
 *
 * @param node The radical node.
 * @returns The nesting depth. 0 if the node is not a radical.
 */
export function radicalNestingDepth(node: Element): number {
  return getNestingDepth(
    'radical',
    node,
    ['sqrt', 'root'],
    nestingBarriers,
    {}
  );
}

/**
 * Nested string for radicals in Mathspeak mode putting together the nesting
 * depth with a pre- and postfix string that depends on the speech style.
 *
 * @param node The radical node.
 * @param prefix A prefix string.
 * @param postfix A postfix string.
 * @returns The opening string.
 */
export function nestedRadical(
  node: Element,
  prefix: string,
  postfix: string
): string {
  const depth = radicalNestingDepth(node);
  const index = getRootIndex(node);
  postfix = index ? LOCALE.FUNCTIONS.combineRootIndex(postfix, index) : postfix;
  if (depth === 1) {
    return postfix;
  }
  return LOCALE.FUNCTIONS.combineNestedRadical(
    prefix,
    LOCALE.FUNCTIONS.radicalNestDepth(depth - 1),
    postfix
  );
}

/**
 * A string indexing the root.
 *
 * @param node The radical node.
 * @returns The localised indexing string if it exists.
 */
export function getRootIndex(node: Element): string {
  const content =
    node.tagName === 'sqrt'
      ? '2'
      : // TODO (sorge): Make that safer?
        XpathUtil.evalXPath('children/*[1]', node)[0].textContent.trim();
  return LOCALE.MESSAGES.MSroots[content] || '';
}
/**
 * Opening string for radicals in Mathspeak verbose mode.
 *
 * @param node The radical node.
 * @returns The opening string.
 */
export function openingRadicalVerbose(node: Element): string {
  return nestedRadical(
    node,
    LOCALE.MESSAGES.MS.NESTED,
    LOCALE.MESSAGES.MS.STARTROOT
  );
}

/**
 * Closing string for radicals in Mathspeak verbose mode.
 *
 * @param node The radical node.
 * @returns The closing string.
 */
export function closingRadicalVerbose(node: Element): string {
  return nestedRadical(
    node,
    LOCALE.MESSAGES.MS.NESTED,
    LOCALE.MESSAGES.MS.ENDROOT
  );
}

/**
 * Middle string for radicals in Mathspeak verbose mode.
 *
 * @param node The radical node.
 * @returns The middle string.
 */
export function indexRadicalVerbose(node: Element): string {
  return nestedRadical(
    node,
    LOCALE.MESSAGES.MS.NESTED,
    LOCALE.MESSAGES.MS.ROOTINDEX
  );
}

/**
 * Opening string for radicals in Mathspeak brief mode.
 *
 * @param node The radical node.
 * @returns The opening string.
 */
export function openingRadicalBrief(node: Element): string {
  return nestedRadical(
    node,
    LOCALE.MESSAGES.MS.NEST_ROOT,
    LOCALE.MESSAGES.MS.STARTROOT
  );
}

/**
 * Closing string for radicals in Mathspeak brief mode.
 *
 * @param node The radical node.
 * @returns The closing string.
 */
export function closingRadicalBrief(node: Element): string {
  return nestedRadical(
    node,
    LOCALE.MESSAGES.MS.NEST_ROOT,
    LOCALE.MESSAGES.MS.ENDROOT
  );
}

/**
 * Middle string for radicals in Mathspeak superbrief mode.
 *
 * @param node The radical node.
 * @returns The middle string.
 */
export function indexRadicalBrief(node: Element): string {
  return nestedRadical(
    node,
    LOCALE.MESSAGES.MS.NEST_ROOT,
    LOCALE.MESSAGES.MS.ROOTINDEX
  );
}

/**
 * Opening string for radicals in Mathspeak superbrief mode.
 *
 * @param node The radical node.
 * @returns The opening string.
 */
export function openingRadicalSbrief(node: Element): string {
  return nestedRadical(
    node,
    LOCALE.MESSAGES.MS.NEST_ROOT,
    LOCALE.MESSAGES.MS.ROOT
  );
}

/**
 * Middle string for radicals in Mathspeak superbrief mode.
 *
 * @param node The radical node.
 * @returns The middle string.
 */
export function indexRadicalSbrief(node: Element): string {
  return nestedRadical(
    node,
    LOCALE.MESSAGES.MS.NEST_ROOT,
    LOCALE.MESSAGES.MS.INDEX
  );
}

/**
 * Computes and returns the nesting depth of underscore nodes.
 *
 * @param node The underscore node.
 * @returns The nesting depth. 0 if the node is not an underscore.
 */
export function underscoreNestingDepth(node: Element): number {
  return getNestingDepth(
    'underscore',
    node,
    ['underscore'],
    nestingBarriers,
    {},
    function (node) {
      return (
        node.tagName &&
        node.tagName === SemanticType.UNDERSCORE &&
        (node.childNodes[0].childNodes[1] as Element).getAttribute('role') ===
          SemanticRole.UNDERACCENT
      );
    }
  );
}

/**
 * String function to construct and underscript prefix.
 *
 * @param node The underscore node.
 * @returns The correct prefix string.
 */
export function nestedUnderscript(node: Element): string {
  const depth = underscoreNestingDepth(node);
  return (
    Array(depth).join(LOCALE.MESSAGES.MS.UNDER) + LOCALE.MESSAGES.MS.UNDERSCRIPT
  );
}

/**
 * Computes and returns the nesting depth of overscore nodes.
 *
 * @param node The overscore node.
 * @returns The nesting depth. 0 if the node is not an overscore.
 */
export function overscoreNestingDepth(node: Element): number {
  return getNestingDepth(
    'overscore',
    node,
    ['overscore'],
    nestingBarriers,
    {},
    function (node) {
      return (
        node.tagName &&
        node.tagName === SemanticType.OVERSCORE &&
        (node.childNodes[0].childNodes[1] as Element).getAttribute('role') ===
          SemanticRole.OVERACCENT
      );
    }
  );
}

/**
 * @param _node The node, which is ignored.
 * @returns The endscripts message for the current locale.
 */
export function endscripts(_node: Element) {
  return LOCALE.MESSAGES.MS.ENDSCRIPTS;
}

/**
 * String function to construct and overscript prefix.
 *
 * @param node The overscore node.
 * @returns The correct prefix string.
 */
export function nestedOverscript(node: Element): string {
  const depth = overscoreNestingDepth(node);
  return (
    Array(depth).join(LOCALE.MESSAGES.MS.OVER) + LOCALE.MESSAGES.MS.OVERSCRIPT
  );
}

/**
 * Query function that Checks if we have a simple determinant in the sense that
 * every cell only contains single letters or numbers.
 *
 * @param node The determinant node.
 * @returns List containing input node if true.
 */
export function determinantIsSimple(node: Element): Element[] {
  if (
    node.tagName !== SemanticType.MATRIX ||
    node.getAttribute('role') !== SemanticRole.DETERMINANT
  ) {
    return [];
  }
  const cells = XpathUtil.evalXPath(
    'children/row/children/cell/children/*',
    node
  ) as Element[];
  for (let i = 0, cell; (cell = cells[i]); i++) {
    if (cell.tagName === SemanticType.NUMBER) {
      continue;
    }
    if (cell.tagName === SemanticType.IDENTIFIER) {
      const role = cell.getAttribute('role');
      if (
        role === SemanticRole.LATINLETTER ||
        role === SemanticRole.GREEKLETTER ||
        role === SemanticRole.OTHERLETTER
      ) {
        continue;
      }
    }
    return [];
  }
  return [node];
}
/**
 * Generate constraints for the specialized baseline rules of relation
 * sequences.
 *
 * @returns The constraint strings.
 */
export function generateBaselineConstraint(): string[] {
  const ignoreElems = ['subscript', 'superscript', 'tensor'];
  const mainElems = ['relseq', 'multrel'];
  const breakElems = ['fraction', 'punctuation', 'fenced', 'sqrt', 'root'];

  const ancestrify = (elemList: string[]) =>
    elemList.map((elem) => 'ancestor::' + elem);

  const notify = (elem: string) => 'not(' + elem + ')';

  const prefix = 'ancestor::*/following-sibling::*';
  const middle = notify(ancestrify(ignoreElems).join(' or '));
  const mainList = ancestrify(mainElems);
  const breakList = ancestrify(breakElems);
  let breakCstrs: string[] = [];
  for (let i = 0, brk: string; (brk = breakList[i]); i++) {
    breakCstrs = breakCstrs.concat(
      mainList.map(function (elem) {
        return brk + '/' + elem;
      })
    );
  }
  const postfix = notify(breakCstrs.join(' | '));
  return [[prefix, middle, postfix].join(' and ')];
}

/**
 * Removes parentheses around a label.
 *
 * @param node The label to be processed.
 * @returns The text of the label.
 */
export function removeParens(node: Element): string {
  if (
    !node.childNodes.length ||
    !node.childNodes[0].childNodes.length ||
    !node.childNodes[0].childNodes[0].childNodes.length
  ) {
    return '';
  }
  const content = node.childNodes[0].childNodes[0].childNodes[0].textContent;
  return content.match(/^\(.+\)$/) ? content.slice(1, -1) : content;
}

// Generating rules for tensors.
/**
 * Component strings for tensor speech rules.
 */
const componentString: Map<number, string> = new Map([
  [3, 'CSFleftsuperscript'],
  [4, 'CSFleftsubscript'],
  [2, 'CSFbaseline'],
  [1, 'CSFrightsubscript'],
  [0, 'CSFrightsuperscript']
]);

/**
 * Child number translation for tensor speech rules.
 */
const childNumber: Map<number, number> = new Map([
  [4, 2],
  [3, 3],
  [2, 1],
  [1, 4],
  [0, 5]
]);

/**
 * Generates the rule strings and constraints for tensor rules.
 *
 * @param constellation Bitvector representing of possible tensor
 *     constellation.
 * @returns A list consisting of additional constraints for the
 *     tensor rule, plus the strings for the verbose and brief rule, in that
 *     order.
 */
function generateTensorRuleStrings_(
  constellation: string
): [string[], string, string] {
  const constraints = [];
  let verbString = '';
  let briefString = '';
  let constel = parseInt(constellation, 2);

  for (let i = 0; i < 5; i++) {
    const childString = 'children/*[' + childNumber.get(i) + ']';
    if (constel & 1) {
      const compString = componentString.get(i % 5);
      verbString =
        '[t] ' + compString + 'Verbose; [n] ' + childString + ';' + verbString;
      briefString =
        '[t] ' + compString + 'Brief; [n] ' + childString + ';' + briefString;
    } else {
      constraints.unshift('name(' + childString + ')="empty"');
    }
    constel >>= 1;
  }
  return [constraints, verbString, briefString];
}

/**
 * Generator for tensor speech rules.
 *
 * @param store The mathstore to which the rules are added.
 * @param brief Flag for brief style rule.
 */
export function generateTensorRules(store: SpeechRuleStore, brief = true) {
  // Constellations are built as bitvectors with the meaning:
  //  lsub lsuper base rsub rsuper
  const constellations = [
    '11111',
    '11110',
    '11101',
    '11100',
    '10111',
    '10110',
    '10101',
    '10100',
    '01111',
    '01110',
    '01101',
    '01100'
  ];
  for (let i = 0, constel; (constel = constellations[i]); i++) {
    let name = 'tensor' + constel;
    let [components, verbStr, briefStr] = generateTensorRuleStrings_(constel);
    // Rules without neighbour.
    store.defineRule(name, 'default', verbStr, 'self::tensor', ...components);
    if (brief) {
      store.defineRule(name, 'brief', briefStr, 'self::tensor', ...components);
      store.defineRule(name, 'sbrief', briefStr, 'self::tensor', ...components);
    }
    // Rules with baseline.
    const baselineStr = componentString.get(2);
    verbStr += '; [t]' + baselineStr + 'Verbose';
    briefStr += '; [t]' + baselineStr + 'Brief';
    name = name + '-baseline';
    const cstr =
      '((.//*[not(*)])[last()]/@id)!=(((.//ancestor::fraction|' +
      'ancestor::root|ancestor::sqrt|ancestor::cell|ancestor::line|' +
      'ancestor::stree)[1]//*[not(*)])[last()]/@id)';
    store.defineRule(
      name,
      'default',
      verbStr,
      'self::tensor',
      cstr,
      ...components
    );
    if (brief) {
      store.defineRule(
        name,
        'brief',
        briefStr,
        'self::tensor',
        cstr,
        ...components
      );
      store.defineRule(
        name,
        'sbrief',
        briefStr,
        'self::tensor',
        cstr,
        ...components
      );
    }
  }
}

/**
 * Predicate to decide if a root has a small index, i.e., between 1 and 10.
 *
 * @param node The root node.
 * @returns The list with the given node, if it is a root with a
 *     small index.
 */
export function smallRoot(node: Element): Element[] {
  let max = Object.keys(LOCALE.MESSAGES.MSroots).length;
  if (!max) {
    return [];
  } else {
    max++;
  }
  if (
    !node.childNodes ||
    node.childNodes.length === 0 ||
    !node.childNodes[0].childNodes
  ) {
    return [];
  }
  const index = node.childNodes[0].childNodes[0].textContent;
  if (!/^\d+$/.test(index)) {
    return [];
  }
  const num = parseInt(index, 10);
  return num > 1 && num <= max ? [node] : [];
}

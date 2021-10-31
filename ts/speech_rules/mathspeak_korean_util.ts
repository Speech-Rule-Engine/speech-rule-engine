//
// Copyright 2019-21 Volker Sorge
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

//
// This work was sponsored by TextHelp
//

import * as MathspeakUtil from './mathspeak_util';
import {LOCALE} from '../l10n/locale';
import {AuditoryDescription} from '../audio/auditory_description';
import XpathUtil from '../common/xpath_util';
import { SpeechRuleEngine } from '../rule_engine/speech_rule_engine';


namespace MathspeakKoreanUtil {

/**
 * Computes disambiguations for nested fractions.
 * @param node The fraction node.
 * @param expr The disambiguating expression.
 * @param opt_end Optional end expression.
 * @return The disambiguating string.
 */
export function nestedFraction( node: Element, expr: string, opt_end?: string): string {
  let depth = MathspeakUtil.fractionNestingDepth(node);
  let annotation = Array.apply(null, Array(depth)).map((_x: string) => expr);
  if (opt_end) {
    annotation.unshift(opt_end);
  }
  return annotation.join(LOCALE.MESSAGES.regexp.JOINER_FRAC);
}

/**
 * Opening string for fractions in Mathspeak verbose mode.
 * @param node The fraction node.
 * @return The opening string.
 */
export function openingFractionVerbose(node: Element): string {
  return nestedFraction(node, LOCALE.MESSAGES.MS.START, LOCALE.MESSAGES.MS.FRAC_V);
}


/**
 * Closing string for fractions in Mathspeak verbose mode.
 * @param node The fraction node.
 * @return The closing string.
 */
export function closingFractionVerbose(node: Element): string {
  return nestedFraction(node, LOCALE.MESSAGES.MS.END, LOCALE.MESSAGES.MS.FRAC_V);
}


/**
 * Opening string for fractions in Mathspeak brief mode.
 * @param node The fraction node.
 * @return The opening string.
 */
export function openingFractionBrief(node: Element): string {
  return nestedFraction(node, LOCALE.MESSAGES.MS.START, LOCALE.MESSAGES.MS.FRAC_B);
}


/**
 * Closing string for fractions in Mathspeak brief mode.
 * @param node The fraction node.
 * @return The closing string.
 */
export function closingFractionBrief(node: Element): string {
  return nestedFraction(node, LOCALE.MESSAGES.MS.END, LOCALE.MESSAGES.MS.FRAC_B);
}

/**
 * Opening string for fractions in Mathspeak superbrief mode.
 * @param node The fraction node.
 * @return The opening string.
 */
 export function openingFractionSbrief(node: Element): string {
  let depth = MathspeakUtil.fractionNestingDepth(node);
  if (depth === 1) {
    return LOCALE.MESSAGES.MS.FRAC_S;
  }
  return LOCALE.FUNCTIONS.combineNestedFraction(
      LOCALE.FUNCTIONS.radicalNestDepth(depth - 1), LOCALE.MESSAGES.MS.NEST_FRAC,
      LOCALE.MESSAGES.MS.FRAC_S);
}


/**
 * Closing string for fractions in Mathspeak superbrief mode.
 * @param node The fraction node.
 * @return The closing string.
 */
export function closingFractionSbrief(node: Element): string {
  let depth = MathspeakUtil.fractionNestingDepth(node);
  if (depth === 1) {
    return LOCALE.MESSAGES.MS.ENDFRAC;
  }
  return LOCALE.FUNCTIONS.combineNestedFraction(
      LOCALE.FUNCTIONS.radicalNestDepth(depth - 1), LOCALE.MESSAGES.MS.NEST_FRAC,
      LOCALE.MESSAGES.MS.ENDFRAC);
}


/**
 * Middle string for fractions in Mathspeak superbrief mode.
 * @param node The fraction node.
 * @return The middle string.
 */
export function overFractionSbrief(node: Element): string {
  let depth = MathspeakUtil.fractionNestingDepth(node);
  if (depth === 1) {
    return LOCALE.MESSAGES.MS.FRAC_OVER;
  }
  return LOCALE.FUNCTIONS.combineNestedFraction(
      LOCALE.FUNCTIONS.radicalNestDepth(depth - 1), LOCALE.MESSAGES.MS.NEST_FRAC,
      LOCALE.MESSAGES.MS.FRAC_OVER);
}

/**
 * Query function that Checks if we have a simple index in the sense that
 * every cell only contains single letters or numbers.
 * @param node The root node.
 * @return List containing input node if true.
 */
export function isSimpleIndex(node: Element): Element[] {
  let index = XpathUtil.evalXPath('children/*[1]', node)[0].toString().match(/[^>⁢>]+<\/[^>]*>/g);

  return (index.length === 1) ?  [node] : [];
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
    node: Element, prefix: string, postfix: string): string {
  let depth = MathspeakUtil.radicalNestingDepth(node);
 
  if (depth === 1) { return postfix; }
  return LOCALE.FUNCTIONS.combineNestedRadical(
      LOCALE.FUNCTIONS.radicalNestDepth(depth - 1), prefix, postfix);
}


/**
 * Opening string for radicals in Mathspeak verbose mode.
 * @param node The radical node.
 * @return The opening string.
 */
export function openingRadicalVerbose(node: Element): string {
  return nestedRadical(node, LOCALE.MESSAGES.MS.NESTED, LOCALE.MESSAGES.MS.STARTROOT);
}


/**
 * Closing string for radicals in Mathspeak verbose mode.
 * @param node The radical node.
 * @return The closing string.
 */
export function closingRadicalVerbose(node: Element): string {
  return nestedRadical(node, LOCALE.MESSAGES.MS.NESTED, LOCALE.MESSAGES.MS.ENDROOT);
}


/**
 * Opening string for radicals in Mathspeak brief mode.
 * @param node The radical node.
 * @return The opening string.
 */
export function openingRadicalBrief(node: Element): string {
  return nestedRadical(node, LOCALE.MESSAGES.MS.NEST_ROOT, LOCALE.MESSAGES.MS.STARTROOT);
}


/**
 * Closing string for radicals in Mathspeak brief mode.
 * @param node The radical node.
 * @return The closing string.
 */
export function closingRadicalBrief(node: Element): string {
  return nestedRadical(node, LOCALE.MESSAGES.MS.NEST_ROOT, LOCALE.MESSAGES.MS.ENDROOT);
}

/**
 * Opening string for radicals in Mathspeak superbrief mode.
 * @param node The radical node.
 * @return The opening string.
 */
export function openingRadicalSbrief(node: Element): string {
  return nestedRadical(node, LOCALE.MESSAGES.MS.NEST_ROOT, LOCALE.MESSAGES.MS.ROOT);
}


/**
 * A string indexing the root.
 * @param node The radical node.
 * @return The localised indexing string.
 */
export function getRootIndex(node: Element): string {
  let content = XpathUtil.evalXPath('children/*[1]', node)[0].textContent.trim();

  return LOCALE.MESSAGES.MSroots[content] || content + "제곱근";
}


/**
 * Indexing string for radicals in Mathspeak mode putting together.
 * @param node The radical node.
 * @param postfix A postfix string.
 * @return The indexing string.
 */
export function indexRadical(
    node: Element, postfix: string): string {
  let index = getRootIndex(node);

  return index ? index : postfix;
}


/**
 * Non-simple indexing string for radicals in Mathspeak verbose mode.
 * @param node The radical node.
 * @return The indexing string.
 */
export function indexRadicalVerbose(node: Element): string {
  return indexRadical(node, LOCALE.MESSAGES.MS.ROOTINDEX);
}



/**
 * Non-simple indexing string for radicals in Mathspeak brief mode.
 * @param node The radical node.
 * @return The indexing string.
 */
export function indexRadicalBrief(node: Element): string {
  return indexRadical(node, LOCALE.MESSAGES.MS.ROOTINDEX);
}


/**
 * Non-simple indexing string for radicals in Mathspeak superbrief mode.
 * @param node The radical node.
 * @return The indexing string.
 */
export function indexRadicalSbrief(node: Element): string {
  return indexRadical(node, LOCALE.MESSAGES.MS.INDEX);
}


/**
 * String function to turn a child position into an ordinal.
 * @param node The node for the string function.
 * @return The ordinal string corresponding to the child position of
 *     the node.
 */
export function ordinalConversion(node: Element): string {
  let children = XpathUtil.evalXPath('children/*', node) as Element[];

  return LOCALE.NUMBERS.wordOrdinal(children.length);
}


/**
 * String function to turn a child position into an ordinal.
 * @param node The node for the string function.
 * @return The ordinal string corresponding to the child position of
 *     the node.
 */
export function decreasedOrdinalConversion(node: Element): string {
  let children = XpathUtil.evalXPath('children/*', node) as Element[];

  return LOCALE.NUMBERS.wordOrdinal(children.length - 1);
}


/**
 * String function to turn a child position into an ordinal.
 * @param node The node for the string function.
 * @return The ordinal string corresponding to the child position of
 *     the node.
 */
export function listOrdinalConversion(node: Element): string {
  let children = XpathUtil.evalXPath('children/*', node) as Element[];
  let content = XpathUtil.evalXPath('content/*', node) as Element[];

  return LOCALE.NUMBERS.wordOrdinal(children.length - content.length);
}


/**
 * Iterates over the list of content nodes of the parent of the given nodes.
 * @param nodes A node array.
 * @param context A context string.
 * @return A closure that returns
 *     the content of the next content node. Returns only context string if list
 *     is exhausted.
 */
export function contentIteratorArticle(nodes: Element[]): () =>
    AuditoryDescription[] {
  
  let contentNodes: Element[];
  if (nodes.length > 0) {
    contentNodes =
        XpathUtil.evalXPath('../../content/*', nodes[0]) as Element[];
  } else {
    contentNodes = [];
  }
  return function() {
    let content = contentNodes.shift();
    let contextDescr = [AuditoryDescription.create({text: ''}, {translate: true})];
    if (!content) {
      return contextDescr;
    }
    let descrs = SpeechRuleEngine.getInstance().evaluateNode(content);
    LOCALE.CORRECTIONS.article(descrs[0].text);
    return contextDescr.concat(descrs);
  };
}


}
export default MathspeakKoreanUtil;
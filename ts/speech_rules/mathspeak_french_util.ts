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


namespace MathspeakFrenchUtil {

/**
 * Predicate to decide if a root has a small index, i.e., between 1 and 10.
 * @param node The root node.
 * @return The list with the given node, if it is a root with a
 *     small index.
 */
export function smallRoot(node: Element): Element[] {
  if (!node.childNodes || node.childNodes.length === 0 ||
      !node.childNodes[0].childNodes) {
    return [];
  }
  let index = node.childNodes[0].childNodes[0].textContent;
  if (!/^\d+$/.test(index)) {
    return [];
  }
  let num = parseInt(index, 10);
  return num > 1 && num <= 3 ? [node] : [];
}


/**
 * Computes baseline prefix in verbose mode.
 * @param node Subscript node.
 * @return The prefix string.
 */
export function baselineVerbose(node: Element): string {
  let baseline = MathspeakUtil.baselineVerbose(node);
  return baseline.replace(/\-$/, '');
}


/**
 * Computes baseline prefix in brief mode.
 * @param node Subscript node.
 * @return The prefix string.
 */
export function baselineBrief(node: Element): string {
  let baseline = MathspeakUtil.baselineBrief(node);
  return baseline.replace(/\-$/, '');
}


/**
 * Computes left superscript prefix in verbose mode.
 * @param node Tensor node.
 * @return The prefix string.
 */
export function leftSuperscriptVerbose(node: Element): string {
  let leftIndex = MathspeakUtil.superscriptVerbose(node);
  return leftIndex.replace(/^exposant/, 'exposant gauche');
}


/**
 * Computes left subscript prefix in verbose mode.
 * @param node Tensor node.
 * @return The prefix string.
 */
export function leftSubscriptVerbose(node: Element): string {
  let leftIndex = MathspeakUtil.subscriptVerbose(node);
  return leftIndex.replace(/^indice/, 'indice gauche');
}


/**
 * Computes left superscript prefix in brief mode.
 * @param node Tensor node.
 * @return The prefix string.
 */
export function leftSuperscriptBrief(node: Element): string {
  let leftIndex = MathspeakUtil.superscriptBrief(node);
  return leftIndex.replace(/^sup/, 'sup gauche');
}


/**
 * Computes left subscript prefix in brief mode.
 * @param node Tensor node.
 * @return The prefix string.
 */
export function leftSubscriptBrief(node: Element): string {
  let leftIndex = MathspeakUtil.subscriptBrief(node);
  return leftIndex.replace(/^sub/, 'sub gauche');
}

}

export default MathspeakFrenchUtil;

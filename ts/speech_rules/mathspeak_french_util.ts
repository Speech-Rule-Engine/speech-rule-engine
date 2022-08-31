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
 * @file Utility functions for mathspeak rules.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

//
// This work was sponsored by TextHelp
//

import { Span } from '../audio/span';
import * as MathspeakUtil from './mathspeak_util';

/**
 * Computes baseline prefix in verbose mode.
 *
 * @param node Subscript node.
 * @returns The prefix string.
 */
export function baselineVerbose(node: Element): Span[] {
  const baseline = MathspeakUtil.baselineVerbose(node);
  baseline[0].speech = baseline[0].speech.replace(/-$/, '');
  return baseline;
}

/**
 * Computes baseline prefix in brief mode.
 *
 * @param node Subscript node.
 * @returns The prefix string.
 */
export function baselineBrief(node: Element): Span[] {
  const baseline = MathspeakUtil.baselineBrief(node);
  baseline[0].speech = baseline[0].speech.replace(/-$/, '');
  return baseline;
}

/**
 * Computes left superscript prefix in verbose mode.
 *
 * @param node Tensor node.
 * @returns The prefix string.
 */
export function leftSuperscriptVerbose(node: Element): Span[] {
  const leftIndex = MathspeakUtil.superscriptVerbose(node);
  leftIndex[0].speech = leftIndex[0].speech.replace(/^exposant/, 'exposant gauche');
  return leftIndex;
}

/**
 * Computes left subscript prefix in verbose mode.
 *
 * @param node Tensor node.
 * @returns The prefix string.
 */
export function leftSubscriptVerbose(node: Element): Span[] {
  const leftIndex = MathspeakUtil.subscriptVerbose(node);
  leftIndex[0].speech = leftIndex[0].speech.replace(/^indice/, 'indice gauche');
  return leftIndex;
}

/**
 * Computes left superscript prefix in brief mode.
 *
 * @param node Tensor node.
 * @returns The prefix string.
 */
export function leftSuperscriptBrief(node: Element): Span[] {
  const leftIndex = MathspeakUtil.superscriptBrief(node);
  leftIndex[0].speech = leftIndex[0].speech.replace(/^sup/, 'sup gauche');
  return leftIndex;
}

/**
 * Computes left subscript prefix in brief mode.
 *
 * @param node Tensor node.
 * @returns The prefix string.
 */
export function leftSubscriptBrief(node: Element): Span[] {
  const leftIndex = MathspeakUtil.subscriptBrief(node);
  leftIndex[0].speech = leftIndex[0].speech.replace(/^sub/, 'sub gauche');
  return leftIndex;
}

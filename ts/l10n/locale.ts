//
// Copyright 2017-21 Volker Sorge
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
 * @fileoverview Basic locale file providing namespace and utilities.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */


import {Grammar} from '../rule_engine/grammar';
import * as MathspeakUtil from '../speech_rules/mathspeak_util';
import * as Messages from './messages';
type Messages = {
  MS: {[key: any]: string},
  MS_FUNC: {[key: any]: Function},
  MS_ROOT_INDEX: {[key: any]: string},
  FONT: {[key: any]: SemanticAttr.Font|SemanticAttr.Font[]},
  ROLE: {[key: any]: SemanticAttr.Role},
  ENCLOSE: {[key: any]: SemanticAttr.Role},
  NAVIGATE: {[key: any]: string},
  REGEXP: {[key: any]: string},
  NUMBERS: {[key: any]: Function|string},
  ALPHABETS: {[key: any]: string[]},
  ALPHABET_PREFIXES: {[key: any]: {[key: any]: string}},
  ALPHABET_TRANSFORMERS: {[key: any]: {[key: any]: Transformer}},
  ALPHABET_COMBINER: Combiner
};
export {Messages};


/**
 * Translation for count word in superbrief nesting description.
 * @param count The counting parameter.
 * @return The corresponding string.
 */
export function nestingToString(count: number): string {
  switch (count) {
    case 1:
      return Messages.MS.ONCE || '';
    case 2:
      return Messages.MS.TWICE;
    default:
      return count.toString();
  }
}


/**
 * Sets the nesting depth of a fraction to end at vulgar fraction.
 * @param node The node to check.
 * @return True if a vulgar fraction.
 */
export function vulgarNestingDepth(node: Node): boolean {
  return !!MathspeakUtil.isSmallVulgarFraction(node).length;
}


/**
 * Generates a root ending message by combining the end message (postfix) with
 * the index. Example: Start Root Cubic ... End Root Cubic.
 * @param postfix The postfix.
 * @param index The index.
 * @return The combined string, postfix plus index.
 */
export function combinePostfixIndex(postfix: string, index: string): string {
  return postfix === Messages.MS.ROOTINDEX || postfix === Messages.MS.INDEX ?
      postfix :
      postfix + ' ' + index;
}


/**
 * Localizes the font name.
 * @param font The font name.
 * @return The localized font name.
 */
export function localFont(font: string): string {
  let realFont = Messages.FONT[font];
  if (realFont === undefined) {
    realFont = font || '';
  }
  return typeof realFont === 'string' ? realFont : realFont[0];
}


Grammar.getInstance().setCorrection('localFont', localFont);


/**
 * Localizes the role name.
 * @param role The role name.
 * @return The localized role name.
 */
export function localRole(role: string): string {
  return Messages.ROLE[role] || role;
}


Grammar.getInstance().setCorrection('localRole', localRole);


/**
 * Localizes the enclose name.
 * @param enclose The enclose name.
 * @return The localized enclose name.
 */
export function localEnclose(enclose: string): string {
  return Messages.ENCLOSE[enclose] || enclose;
}


Grammar.getInstance().setCorrection('localEnclose', localEnclose);
type Transformer = (p1: string|number) => string;
export {Transformer};
type Combiner = (p1: string, p2: string, p3: string) => string;
export {Combiner};


/**
 * A combiner adding the font name before the letter. Empty strings are ignored.
 * @param letter The letter.
 * @param font The font name.
 * @param cap Capitalisation expression.
 * @return The speech string as `font cap letter`.
 */
export function prefixCombiner(
    letter: string, font: string, cap: string): string {
  letter = cap ? cap + ' ' + letter : letter;
  return font ? font + ' ' + letter : letter;
}


/**
 * A combiner adding the font name after the letter. Empty strings are ignored.
 * @param letter The letter.
 * @param font The font name.
 * @param cap Capitalisation expression.
 * @return The speech string as `cap letter font`.
 */
export function postfixCombiner(
    letter: string, font: string, cap: string): string {
  letter = cap ? cap + ' ' + letter : letter;
  return font ? letter + ' ' + font : letter;
}

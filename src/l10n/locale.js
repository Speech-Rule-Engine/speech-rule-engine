// Copyright 2017 Volker Sorge
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
goog.provide('sre.Locale');
goog.provide('sre.Locale.Messages');

goog.require('sre.Grammar');
goog.require('sre.MathspeakUtil');
goog.require('sre.Messages');


/**
 * @typedef {{
 *   MS: Object.<string>,
 *   MS_FUNC: Object.<Function>,
 *   MS_ROOT_INDEX: Object.<string>,
 *   FONT: Object.<sre.SemanticAttr.Font|
                   Array.<sre.SemanticAttr.Font, Function>>,
 *   ROLE: Object.<sre.SemanticAttr.Role>,
 *   ENCLOSE: Object.<sre.SemanticAttr.Role>,
 *   NAVIGATE: Object.<string>,
 *   REGEXP: Object.<string>,
 *   NUMBERS: Object.<Function|string>,
 *   ALPHABETS: Object.<Array.<string>>,
 *   ALPHABET_PREFIXES: Object.<Object.<string>>,
 *   ALPHABET_TRANSFORMERS: Object.<Object.<sre.Locale.Transformer>>,
 *   ALPHABET_COMBINER: sre.Locale.Combiner
 * }}
 */
sre.Locale.Messages;


/**
 * Translation for count word in superbrief nesting description.
 * @param {number} count The counting parameter.
 * @return {string} The corresponding string.
 */
sre.Locale.nestingToString = function(count) {
  switch (count) {
    case 1:
      return sre.Messages.MS.ONCE || '';
    case 2:
      return sre.Messages.MS.TWICE;
    default:
      return count.toString();
  }
};


/**
 * Sets the nesting depth of a fraction to end at vulgar fraction.
 * @param {!Node} node The node to check.
 * @return {boolean} True if a vulgar fraction.
 */
sre.Locale.vulgarNestingDepth = function(node) {
  return !!sre.MathspeakUtil.isSmallVulgarFraction(node).length;
};


/**
 * Generates a root ending message by combining the end message (postfix) with
 * the index. Example: Start Root Cubic ... End Root Cubic.
 * @param {string} postfix The postfix.
 * @param {string} index The index.
 * @return {string} The combined string, postfix plus index.
 */
sre.Locale.combinePostfixIndex = function(postfix, index) {
  return (postfix === sre.Messages.MS.ROOTINDEX ||
          postfix === sre.Messages.MS.INDEX) ?
      postfix : postfix + ' ' + index;
};


/**
 * Localizes the font name.
 * @param {string} font The font name.
 * @return {string} The localized font name.
 */
sre.Locale.localFont = function(font) {
  let realFont = sre.Messages.FONT[font];
  if (realFont === undefined) {
    realFont = font || '';
  }
  return (typeof realFont === 'string') ? realFont : realFont[0];
};


sre.Grammar.getInstance().setCorrection(
    'localFont', sre.Locale.localFont
);


/**
 * Localizes the role name.
 * @param {string} role The role name.
 * @return {string} The localized role name.
 */
sre.Locale.localRole = function(role) {
  return sre.Messages.ROLE[role] || role;
};


sre.Grammar.getInstance().setCorrection(
    'localRole', sre.Locale.localRole
);


/**
 * Localizes the enclose name.
 * @param {string} enclose The enclose name.
 * @return {string} The localized enclose name.
 */
sre.Locale.localEnclose = function(enclose) {
  return sre.Messages.ENCLOSE[enclose] || enclose;
};


sre.Grammar.getInstance().setCorrection(
    'localEnclose', sre.Locale.localEnclose
);


/**
 * @typedef {function((string|number)): string}
 */
sre.Locale.Transformer;


/**
 * @typedef {function(string, string, string): string}
 */
sre.Locale.Combiner;


/**
 * A combiner adding the font name before the letter. Empty strings are ignored.
 * @param {string} letter The letter.
 * @param {string} font The font name.
 * @param {string} cap Capitalisation expression.
 * @return {string} The speech string as `font cap letter`.
 */
sre.Locale.prefixCombiner = function(letter, font, cap) {
  letter = cap ? cap + ' ' + letter : letter;
  return font ? font + ' ' + letter : letter;
};


/**
 * A combiner adding the font name after the letter. Empty strings are ignored.
 * @param {string} letter The letter.
 * @param {string} font The font name.
 * @param {string} cap Capitalisation expression.
 * @return {string} The speech string as `cap letter font`.
 */
sre.Locale.postfixCombiner = function(letter, font, cap) {
  letter = cap ? cap + ' ' + letter : letter;
  return font ? letter + ' ' + font : letter;
};

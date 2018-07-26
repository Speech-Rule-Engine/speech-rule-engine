// Copyright 2014-18 Volker Sorge
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

goog.provide('sre.NemethUtil');

goog.require('sre.MathspeakUtil');


goog.scope(function() {
var msg = sre.Messages;

/**
 * Opening string for fractions in Mathspeak verbose mode.
 * @param {!Node} node The fraction node.
 * @return {string} The opening string.
 */
sre.NemethUtil.openingFraction = function(node) {
  var depth = sre.MathspeakUtil.fractionNestingDepth(node);
  return new Array(depth).join(msg.MS.FRACTION_REPEAT) + msg.MS.FRACTION_START;
};


/**
 * Closing string for fractions in Mathspeak verbose mode.
 * @param {!Node} node The fraction node.
 * @return {string} The closing string.
 */
sre.NemethUtil.closingFraction = function(node) {
  var depth = sre.MathspeakUtil.fractionNestingDepth(node);
  return new Array(depth).join(msg.MS.FRACTION_REPEAT) + msg.MS.FRACTION_END;
};


/**
 * Middle string for fractions in Mathspeak verbose mode.
 * @param {!Node} node The fraction node.
 * @return {string} The middle string.
 */
sre.NemethUtil.overFraction = function(node) {
  var depth = sre.MathspeakUtil.fractionNestingDepth(node);
  return new Array(depth).join(msg.MS.FRACTION_REPEAT) + msg.MS.FRACTION_OVER;
};


/**
 * Nested string for radicals in Mathspeak mode putting together the nesting
 * depth with a pre- and postfix string that depends on the speech style.
 * @param {!Node} node The radical node.
 * @param {string} prefix A prefix string.
 * @param {string} postfix A postfix string.
 * @return {string} The opening string.
 */
sre.NemethUtil.nestedRadical = function(node, prefix, postfix) {
  var depth = sre.MathspeakUtil.radicalNestingDepth(node);
  console.log(depth);
  var index = sre.MathspeakUtil.getRootIndex(node);
  postfix = index ? msg.MS_FUNC.COMBINE_ROOT_INDEX(postfix, index) : postfix;
  console.log(depth);
  if (depth === 1) {
    return postfix;
  }
  return prefix + msg.MS_FUNC.RADICAL_NEST_DEPTH(depth - 1) + postfix;
};


/**
 * Opening string for radicals in Mathspeak verbose mode.
 * @param {!Node} node The radical node.
 * @return {string} The opening string.
 */
sre.NemethUtil.openingRadical = function(node) {
  return sre.NemethUtil.nestedRadical(node, msg.MS.NESTED, msg.MS.STARTROOT);
};


/**
 * Closing string for radicals in Nemeth verbose mode.
 * @param {!Node} node The radical node.
 * @return {string} The closing string.
 */
sre.NemethUtil.closingRadical = function(node) {
  return sre.NemethUtil.nestedRadical(node, msg.MS.NESTED, msg.MS.ENDROOT);
};


/**
 * Middle string for radicals in Nemeth verbose mode.
 * @param {!Node} node The radical node.
 * @return {string} The middle string.
 */
sre.NemethUtil.indexRadical = function(node) {
  return sre.NemethUtil.nestedRadical(node, msg.MS.NESTED, msg.MS.ROOTINDEX);
};


});  // goog.scope

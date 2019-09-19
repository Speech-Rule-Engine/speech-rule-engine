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
goog.require('sre.SemanticAnnotator');


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
 * Nested Braille radicals in Nemeth putting together the nesting counter with
 * the correct indicator string as postfix.
 * @param {!Node} node The radical node.
 * @param {string} postfix A postfix string.
 * @return {string} The opening string.
 */
sre.NemethUtil.nestedRadical = function(node, postfix) {
  var depth = sre.NemethUtil.radicalNestingDepth(node);
  if (depth === 1) {
    return postfix;
  }
  return new Array(depth).join(msg.MS.NESTED) + postfix;
};


/**
 * Computes and returns the nesting depth of radical nodes.
 * @param {!Node} node The radical node.
 * @param {number=} opt_depth The optional depth.
 * @return {number} The nesting depth. 0 if the node is not a radical.
 */
sre.NemethUtil.radicalNestingDepth = function(node, opt_depth) {
  var depth = opt_depth || 0;
  if (!node.parentNode) {
    return depth;
  }
  return sre.NemethUtil.radicalNestingDepth(
      node.parentNode,
      (node.tagName === 'root' || node.tagName === 'sqrt') ? depth + 1 : depth);
};


/**
 * Opening string for radicals in Mathspeak verbose mode.
 * @param {!Node} node The radical node.
 * @return {string} The opening string.
 */
sre.NemethUtil.openingRadical = function(node) {
  return sre.NemethUtil.nestedRadical(node, msg.MS.STARTROOT);
};


/**
 * Closing string for radicals in Nemeth verbose mode.
 * @param {!Node} node The radical node.
 * @return {string} The closing string.
 */
sre.NemethUtil.closingRadical = function(node) {
  return sre.NemethUtil.nestedRadical(node, msg.MS.ENDROOT);
};


/**
 * Middle string for radicals in Nemeth verbose mode.
 * @param {!Node} node The radical node.
 * @return {string} The middle string.
 */
sre.NemethUtil.indexRadical = function(node) {
  return sre.NemethUtil.nestedRadical(node, msg.MS.ROOTINDEX);
};

sre.NemethUtil.enlargeFence = function(text) {
  var start = '⠠';
  if (text.length === 1) {
    return start + text;
  }
  var neut = '⠳';
  var split = text.split('');
  if (split.every(function(x) {return x === neut;})) {
    return start + split.join(start);
  }
  return text.slice(0, 1) + start + text.slice(1);
};


sre.Grammar.getInstance().setCorrection('enlargeFence',
                                        sre.NemethUtil.enlargeFence);


/**
 * 
 * @param {sre.SemanticNode} node 
 * @param {Object.<boolean>} info
 * @return {*}
 */
sre.NemethUtil.propagateNumber = function(node, info) {
  if (!info) {
    return ['number', {number: true}];
  }
  if (node) {
    
  }
};
  

/**
 * @return {sre.SemanticAnnotator} A semantic annotator for unit expressions.
 */
sre.NemethUtil.numberIndicator = function() {
  return new sre.SemanticAnnotator(
      'nemeth', sre.NemethUtil.propagateNumber);
};


});  // goog.scope

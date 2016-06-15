// Copyright 2013 Google Inc.
// Copyright 2014 Volker Sorge
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
 * @fileoverview Utility functions for semantic tree computations.
 * @author sorge@google.com (Volker Sorge)
 */

goog.provide('sre.SemanticUtil');



/**
 * @constructor
 */
sre.SemanticUtil = function() { };


/**
 * Merges keys of objects into an array.
 * @param {...Object.<string, string>} var_args Optional objects.
 * @return {Array.<string>} Array of all keys of the objects.
 */
sre.SemanticUtil.objectsToKeys = function(var_args) {
  var_args = Array.prototype.slice.call(arguments, 0);
  var keys = [];
  return keys.concat.apply(keys, var_args.map(Object.keys));
};


/**
 * Merges values of objects into an array.
 * @param {...Object.<string, string>} var_args Optional objects.
 * @return {Array.<string>} Array of all values of the objects.
 */
sre.SemanticUtil.objectsToValues = function(var_args) {
  var_args = Array.prototype.slice.call(arguments, 0);
  var result = [];
  var collectValues = function(obj) {
    for (var key in obj) {
      result.push(obj[key]);
    }
  };
  var_args.forEach(collectValues);
  return result;
};


/**
 * Transforms a unicode character into numeric representation. Returns null if
 * the input string is not a valid unicode character.
 * @param {string} unicode Character.
 * @return {?number} The decimal representation if it exists.
 */
sre.SemanticUtil.unicodeToNumber = function(unicode) {
  if (!unicode || unicode.length > 2) {
    return null;
  }
  // Treating surrogate pairs.
  if (unicode.length == 2) {
    var hi = unicode.charCodeAt(0);
    var low = unicode.charCodeAt(1);
    if (0xD800 <= hi && hi <= 0xDBFF && !isNaN(low)) {
      return ((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000;
    }
    return null;
  }
  return unicode.charCodeAt(0);
};


/**
 * Transforms a numberic representation of a unicode character into its
 * corresponding string.
 * @param {number} number Unicode point.
 * @return {string} The string representation.
 */
sre.SemanticUtil.numberToUnicode = function(number) {
  if (number >= 0x10000) {
    var hi = (number - 0x10000) / 0x0400 + 0xD800;
    var lo = (number - 0x10000) % 0x0400 + 0xDC00;
    return String.fromCharCode(hi, lo);
  }
  return String.fromCharCode(number);
};


/**
 * Splits a unicode string into array of characters. In particular deals
 * properly with surrogate pairs.
 * @param {string} str The string to split.
 * @return {Array.<string>} List of single characters.
 */
sre.SemanticUtil.splitUnicode = function(str) {
  var split = str.split('');
  var result = [];
  for (var i = 0, chr; chr = split[i]; i++) {
    if ('\uD800' <= chr && chr <= '\uDBFF' && split[i + 1]) {
      result.push(chr + split[++i]);
    } else {
      result.push(chr);
    }
  }
  return result;
};


/**
 * Returns the tagname of an element node in upper case.
 * @param {Element} node The node.
 * @return {string} The node's tagname.
 */
sre.SemanticUtil.tagName = function(node) {
  return node.tagName.toUpperCase();
};


/**
 * List of MathML Tags that are considered to be leafs.
 * @type {Array.<string>}
 * @const
 */
sre.SemanticUtil.LEAFTAGS = ['MO', 'MI', 'MN', 'MTEXT', 'MS'];


/**
 * List of MathML Tags that are to be ignored.
 * @type {Array.<string>}
 * @const
 */
sre.SemanticUtil.IGNORETAGS = [
  'MERROR', 'MPHANTOM', 'MSPACE', 'MALIGNGROUP', 'MALIGNMARK',
  'MPRESCRIPTS', 'ANNOTATION', 'ANNOTATION-XML'
];


/**
 * List of MathML Tags to be ignore if they have no children.
 * @type {Array.<string>}
 * @const
 */
sre.SemanticUtil.EMPTYTAGS = [
  'MATH', 'MROW', 'MPADDED', 'MACTION', 'NONE', 'MSTYLE', 'SEMANTICS'
];


/**
 * Checks if an element is a node with a math tag.
 * @param {Element} node The node to check.
 * @return {boolean} True if element is an math node.
 */
sre.SemanticUtil.hasMathTag = function(node) {
  return !!node && sre.SemanticUtil.tagName(node) === 'MATH';
};


/**
 * Checks if an element is a node with ignore tag.
 * @param {Element} node The node to check.
 * @return {boolean} True if element is an ignore node.
 */
sre.SemanticUtil.hasIgnoreTag = function(node) {
  return !!node &&
      sre.SemanticUtil.IGNORETAGS.indexOf(
          sre.SemanticUtil.tagName(node)) !== -1;
};


/**
 * Checks if an element is a node with empty tag.
 * @param {Element} node The node to check.
 * @return {boolean} True if element is an empty node.
 */
sre.SemanticUtil.hasEmptyTag = function(node) {
  return !!node &&
      sre.SemanticUtil.EMPTYTAGS.indexOf(sre.SemanticUtil.tagName(node)) !== -1;
};


/**
 * Removes elements from a list of MathML nodes that are either to be ignored or
 * ignored if they have empty children.
 * Observe that this is currently not recursive, i.e. will not take care of
 * pathological cases, where content is hidden in incorrectly used tags!
 * @param {Array.<Element>} nodes The node list to be cleaned.
 * @return {Array.<Element>} The cleansed list.
 */
sre.SemanticUtil.purgeNodes = function(nodes) {
  var nodeArray = [];
  for (var i = 0, node; node = nodes[i]; i++) {
    var tagName = sre.SemanticUtil.tagName(node);
    if (sre.SemanticUtil.IGNORETAGS.indexOf(tagName) != -1) continue;
    if (sre.SemanticUtil.EMPTYTAGS.indexOf(tagName) != -1 &&
        node.childNodes.length == 0)
      continue;
    nodeArray.push(node);
  }
  return nodeArray;
};


/**
 * Determines if an attribute represents zero or negative length.
 * @param {string} length The lenght value.
 * @return {boolean} True if the attribute represents zero length.
 */
sre.SemanticUtil.isZeroLength = function(length) {
  if (!length) {
    return false;
  }
  var negativeNamedSpaces = [
    'negativeveryverythinmathspace', 'negativeverythinmathspace',
    'negativethinmathspace', 'negativemediummathspace',
    'negativethickmathspace', 'negativeverythickmathspace',
    'negativeveryverythickmathspace'];
  if (negativeNamedSpaces.indexOf(length) !== -1) {
    return true;
  }
  var value = length.match(/[0-9\.]+/);
  if (!value) {
    return false;
  }
  return parseFloat(value) === 0 ? true : false;
};



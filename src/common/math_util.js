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
 * @fileoverview DOM utility functions to aid in math expressions navigation.
 *
 * @author sorge@google.com (Volker Sorge)
 */

goog.provide('sre.MathUtil');


/**
 * Checks if a node is in a given class of MathML nodes.
 * @private
 * @param {!Node} node The node to test.
 * @param {Array.<string>} tags List of tag names.
 * @return {boolean} True if node has a tag name included in tags.
 */
sre.MathUtil.isMathmlNodeOfClass_ = function(node, tags) {
  return tags.indexOf(node.tagName.toUpperCase()) != -1;
};


/**
 * Checks if a node is in a given class of MathJax nodes.
 * @private
 * @param {!Node} node The node to test.
 * @param {Array.<string>} tags List of tag names.
 * @return {boolean} True if node has a tag name included in tags.
 */
sre.MathUtil.isMathjaxNodeOfClass_ = function(node, tags) {
  if (node.tagName == 'SPAN') {
    var classes = node.className.split(' ');
    return classes.some(function(x)
                        {return tags.indexOf(x.toUpperCase()) != -1;});
  }
  return false;
};


/**
 * Checks if a node is an element node that belongs to a given class
 * of MathML or MathJax nodes.
 * @private
 * @param {!Node} node The node to test.
 * @param {Array.<string>} tags List of tag names.
 * @return {boolean} True if node has a tag name included in tags.
 */
sre.MathUtil.isMathNodeOfClass_ = function(node, tags) {
  return (node.nodeType == sre.Engine.NodeType.ELEMENT_NODE &&
          (sre.MathUtil.isMathmlNodeOfClass_(node, tags) ||
           sre.MathUtil.isMathjaxNodeOfClass_(node, tags)));
};


/**
 * Array of MathML Token Elements.
 * @type {!Array.<string>}
 */
sre.MathUtil.TOKEN_LIST = ['MI', 'MN', 'MO', 'MTEXT', 'MSPACE', 'MS'];


/**
 *  Checks if an element of a math expression is a Token Element.
 * Token elements are the following:
 * <mi> identifier.
 * <mn> number.
 * <mo> operator, fence, or separator.
 * <mtext> text.
 * <mspace> space.
 * <ms> string literal.
 * @param {!Node} element The element of the math expression.
 * @return {boolean} True if element is a token.
 */
sre.MathUtil.isToken = function(element) {
  return sre.MathUtil.isMathNodeOfClass_(element, sre.MathUtil.TOKEN_LIST);
};


/**
 * Array of MathML Layout Schemata.
 * @type {!Array.<string>}
 */
sre.MathUtil.LAYOUT_LIST = ['MROW', 'MFRAC', 'MSQRT', 'MROOT', 'MSTYLE',
  'MERROR', 'MPADDED', 'MPHANTOM', 'MFENCED',
  'MENCLOSE'];


/**
 *  Checks if an element of a math expression is a Layout Schema.
 * Layout elements are the following:
 * <mrow> group any number of sub-expressions horizontally
 * <mfrac> form a fraction from two sub-expressions
 * <msqrt> form a square root (radical without an index)
 * <mroot> form a radical with specified index
 * <mstyle> style change
 * <merror> enclose a syntax error message from a preprocessor
 * <mpadded> adjust space around content
 * <mphantom> make content invisible but preserve its size
 * <mfenced> surround content with a pair of fences
 * <menclose> enclose content with a stretching symbol such as a long
 * division sign.
 * @param {!Node} element The element of the math expression.
 * @return {boolean} True if element is a layout schema.
 */
sre.MathUtil.isLayout = function(element) {
  return sre.MathUtil.isMathNodeOfClass_(element, sre.MathUtil.LAYOUT_LIST);
};


/**
 * Array of MathML Script Schemata.
 * @type {!Array.<string>}
 */
sre.MathUtil.SCRIPT_LIST = ['MSUB', 'MSUP', 'MSUBSUP', 'MUNDER', 'MOVER',
  'MUNDEROVER', 'MMULTISCRIPTS', 'MPRESCRIPTS'];


/**
 *  Checks if an element of a math expression is a Script Schema.
 * Script elements are the following:
 * <msub> attach a subscript to a base.
 * <msup> attach a superscript to a base.
 * <msubsup> attach a subscript-superscript pair to a base.
 * <munder> attach an underscript to a base.
 * <mover> attach an overscript to a base.
 * <munderover> attach an underscript-overscript pair to a base.
 * <mmultiscripts> attach prescripts and tensor indices to a base.
 * Prescripts are optional.
 * <mprescripts> two elements prescripts of mmultiscripts. Only makes sense
 * in that environment (although not illegal outside)!  Two
 * arguments mandatory (can be <none/>).
 * @param {!Node} element The element of the math expression.
 * @return {boolean} True if element is a script schema.
 */
sre.MathUtil.isScript = function(element) {
  return sre.MathUtil.isMathNodeOfClass_(element, sre.MathUtil.SCRIPT_LIST);
};


/**
 * Array of MathML Table and Matrix tokens.
 * @type {!Array.<string>}
 */
sre.MathUtil.TABLES_LIST = ['MTABLE', 'MLABELEDTR', 'MTR', 'MTD',
  'MALIGNGROUP', 'MALIGNMARK'];


/**
 *  Checks if an element of a math expression is a Tables Schema.
 * Tables elements are the following:
 * <mtable> table or matrix.
 * <mlabeledtr> row in a table or matrix with a label or equation number.
 * <mtr> row in a table or matrix.
 * <mtd> one entry in a table or matrix.
 * <maligngroup> and
 * <malignmark> alignment markers.
 * @param {!Node} element The element of the math expression.
 * @return {boolean} True if element is a tables schema.
 */
sre.MathUtil.isTables = function(element) {
  return sre.MathUtil.isMathNodeOfClass_(element, sre.MathUtil.TABLES_LIST);
};


/**
 * Array of MathML Elementary Layout Schemata.
 * @type {!Array.<string>}
 */
sre.MathUtil.ELEMENTARY_LIST = ['MSTACK', 'MLONGDIV', 'MSGROUP', 'MSROW',
  'MSCARRIES', 'MSCARRY', 'MSLINE'];


/**
 *  Checks if an element of a math expression is a Elementary Schema.
 * Elementary elements are the following:
 * <mstack> columns of aligned characters.
 * <mlongdiv> similar to msgroup, with the addition of a divisor and result.
 * <msgroup> a group of rows in an mstack that are shifted by similar amounts.
 * <msrow> a row in an mstack.
 * <mscarries> row in an mstack that whose contents represent carries
 *             or borrows.
 * <mscarry> one entry in an mscarries.
 * <msline> horizontal line inside of mstack.
 * @param {!Node} element The element of the math expression.
 * @return {boolean} True if element is a elementary schema.
 */
sre.MathUtil.isElementary = function(element) {
  return sre.MathUtil.isMathNodeOfClass_(element,
      sre.MathUtil.ELEMENTARY_LIST);
};


/**
 * Array of all valid tags in a MathML expression.
 * This is a union of all other token lists.
 * @type {!Array.<string>}
 */
sre.MathUtil.MATHML_TAG_LIST = [
  sre.MathUtil.TOKEN_LIST,
  sre.MathUtil.LAYOUT_LIST,
  sre.MathUtil.SCRIPT_LIST,
  sre.MathUtil.TABLES_LIST,
  sre.MathUtil.ELEMENTARY_LIST].reduce(
    function(x, y) { return x.concat(y); });


/**
 * Checks if a node is valid element of a MathML expression.
 * @param {!Node} element The element of the math expression.
 * @return {boolean} True if element has a valid MathML tag.
 */
sre.MathUtil.isMathmlTag = function(element) {
  return sre.MathUtil.isMathNodeOfClass_(element,
      sre.MathUtil.MATHML_TAG_LIST);
};


/**
 * Array of MathML Whitespace and Alignment tokens.
 * These are elements that can occur in the other token lists.
 * @type {!Array.<string>}
 */
sre.MathUtil.WHITESPACE_LIST = ['MSROW', 'MROW', 'MSPACE',
  'MPHANTOM', 'MPADDED'];


/**
 * Checks if an element of a math expression is whitespace or an
 * alignment marker.
 * @param {!Node} element The element of the math expression.
 * @return {boolean} True if element is a whitespace node.
 */
sre.MathUtil.isWhitespace = function(element) {
  return sre.MathUtil.isMathNodeOfClass_(element,
      sre.MathUtil.WHITESPACE_LIST);
};


/**
 * Checks if an element of a math expression is a legal mathml markup element
 * but not a whitespace or an alignment marker.
 * @param {!Node} element The element of the math expression.
 * @return {boolean} True if element is a non-whitespace node.
 */
sre.MathUtil.isNotWhitespace = function(element) {
  return (sre.MathUtil.isMathmlTag(element) &&
          !sre.MathUtil.isWhitespace(element));
};


/**
 * Computes the difference of two arrays.
 * @param {Array} a An array.
 * @param {Array} b Another array.
 * @return {Array} Difference of a and b, i.e. a-b.
 */
sre.MathUtil.setdifference = function(a, b) {
  return a.filter(function(x) {return b.indexOf(x) < 0;});
};


/**
 * Computes the union of two arrays (not in a strictly set theoretical sense
 * as all duplicate elements in either array still remain as duplicates!).
 * @param {Array} a An array.
 * @param {Array} b Another array.
 * @return {Array} Union of a and b.
 */
sre.MathUtil.union = function(a, b) {
  return a.concat(sre.MathUtil.setdifference(b, a));
};


/**
 * Constructs a closure that returns separators for an MathML mfenced
 * expression.
 * Separators in MathML are represented by a list and used up one by one
 * until the final element is used as the default.
 * Example: a b c d e  and separators [+,-,*]
 * would result in a + b - c * d * e.
 * @param {string} separators String representing a list of mfenced separators.
 * @return {?function(): string} A closure that returns the next separator
 * for an mfenced expression starting with the first node in nodes.
 */
sre.MathUtil.nextSeparatorFunction = function(separators) {
  if (separators) {
    // Mathjax does not expand empty separators.
    if (separators.match(/^\s+$/)) {
      return null;
    } else {
      var sepList = separators.replace(/\s/g, '')
          .split('')
              .filter(function(x) {return x;});
    }
  } else {
    // When no separator is given MathML uses comma as default.
    var sepList = [','];
  }

  return function() {
    if (sepList.length > 1) {
      return sepList.shift();
    }
    return sepList[0];
  };
};

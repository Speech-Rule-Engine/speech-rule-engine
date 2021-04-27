// Copyright 2013 Google Inc.
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
 * @fileoverview Utility functions for semantic tree computations.
 * @author sorge@google.com (Volker Sorge)
 */

goog.provide('sre.SemanticUtil');

goog.require('sre.DomUtil');



/**
 * @constructor
 */
sre.SemanticUtil = function() { };


/**
 * Merges keys of objects into an array.
 * @param {...Object.<string>} var_args Optional objects.
 * @return {Array.<string>} Array of all keys of the objects.
 */
sre.SemanticUtil.objectsToKeys = function(var_args) {
  var_args = Array.prototype.slice.call(arguments, 0);
  var keys = [];
  return keys.concat.apply(keys, var_args.map(Object.keys));
};


/**
 * Merges values of objects into an array.
 * @param {...Object.<string>} var_args Optional objects.
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


// TODO: Refactor with similar function in MathSimpleStore.
/**
 * Transforms a numberic representation of a unicode character into its
 * corresponding string.
 * @param {number} number Unicode point.
 * @return {string} The string representation.
 */
sre.SemanticUtil.numberToUnicode = function(number) {
  if (number < 0x10000) {
    return String.fromCharCode(number);
  }
  var hi = (number - 0x10000) / 0x0400 + 0xD800;
  var lo = (number - 0x10000) % 0x0400 + 0xDC00;
  return String.fromCharCode(hi, lo);
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
 * List of MathML Tags that are considered to be leafs.
 * @type {Array.<string>}
 * @const
 */
sre.SemanticUtil.LEAFTAGS = ['MO', 'MI', 'MN', 'MTEXT', 'MS', 'MSPACE'];


/**
 * List of MathML Tags that are to be ignored.
 * @type {Array.<string>}
 * @const
 */
sre.SemanticUtil.IGNORETAGS = [
  'MERROR', 'MPHANTOM', 'MALIGNGROUP', 'MALIGNMARK',
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
 * List of MathML Tags that draw something and can therefore not be ignored if
 * they have no children.
 * @type {Array.<string>}
 * @const
 */
sre.SemanticUtil.DISPLAYTAGS = ['MROOT', 'MSQRT'];


/**
 * Checks if an element is a node with a math tag.
 * @param {Element} node The node to check.
 * @return {boolean} True if element is an math node.
 */
sre.SemanticUtil.hasMathTag = function(node) {
  return !!node && sre.DomUtil.tagName(node) === 'MATH';
};


/**
 * Checks if an element is a node with leaf tag.
 * @param {Element} node The node to check.
 * @return {boolean} True if element is an leaf node.
 */
sre.SemanticUtil.hasLeafTag = function(node) {
  return !!node &&
      sre.SemanticUtil.LEAFTAGS.indexOf(sre.DomUtil.tagName(node)) !== -1;
};


/**
 * Checks if an element is a node with ignore tag.
 * @param {Element} node The node to check.
 * @return {boolean} True if element is an ignore node.
 */
sre.SemanticUtil.hasIgnoreTag = function(node) {
  return !!node &&
      sre.SemanticUtil.IGNORETAGS.indexOf(
          sre.DomUtil.tagName(node)) !== -1;
};


/**
 * Checks if an element is a node with empty tag.
 * @param {Element} node The node to check.
 * @return {boolean} True if element is an empty node.
 */
sre.SemanticUtil.hasEmptyTag = function(node) {
  return !!node &&
      sre.SemanticUtil.EMPTYTAGS.indexOf(sre.DomUtil.tagName(node)) !== -1;
};


/**
 * Checks if an element is a node with display tag.
 * @param {Element} node The node to check.
 * @return {boolean} True if element is an display node.
 */
sre.SemanticUtil.hasDisplayTag = function(node) {
  return !!node &&
      sre.SemanticUtil.DISPLAYTAGS.indexOf(sre.DomUtil.tagName(node)) !== -1;
};


/**
 * Checks if an element is a node a glyph node that is not in a leaf.
 * @param {Element} node The node to check.
 * @return {boolean} True if element is an orphaned glyph.
 */
sre.SemanticUtil.isOrphanedGlyph = function(node) {
  return !!node &&
      (sre.DomUtil.tagName(node) === 'MGLYPH' &&
       !sre.SemanticUtil.hasLeafTag(/** @type {Element} */(node.parentNode)));
};


/**
 * Removes elements from a list of MathML nodes that are either to be ignored or
 * ignored if they have empty children.
 * Observe that this is currently not recursive, i.e. will not take care of
 * pathological cases, where content is hidden in incorrectly used tags!
 * @param {!Array.<Element>} nodes The node list to be cleaned.
 * @return {!Array.<Element>} The cleansed list.
 */
sre.SemanticUtil.purgeNodes = function(nodes) {
  var nodeArray = [];
  for (var i = 0, node; node = nodes[i]; i++) {
    if (node.nodeType !== sre.DomUtil.NodeType.ELEMENT_NODE) continue;
    var tagName = sre.DomUtil.tagName(node);
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


/**
 * List of potential attributes that should be used as speech directly.
 * @type {Array.<string>}
 */
sre.SemanticUtil.directSpeechKeys = ['aria-label', 'exact-speech', 'alt'];


/**
 * Retains external attributes from the source node to the semantic node.
 * @param {sre.SemanticNode} to The target node.
 * @param {Node} from The source node.
 */
sre.SemanticUtil.addAttributes = function(to, from) {
  // TODO:
  // Propagate external attributes from singleton mrow-like elements.
  // Cleaner dealing with no breaking attributes.
  if (from.hasAttributes()) {
    var attrs = from.attributes;
    for (var i = attrs.length - 1; i >= 0; i--) {
      var key = attrs[i].name;
      if (key.match(/^ext/)) {
        to.attributes[key] = attrs[i].value;
        to.nobreaking = true;
      }
      if (sre.SemanticUtil.directSpeechKeys.indexOf(key) !== -1) {
        to.attributes['ext-speech'] = attrs[i].value;
        to.nobreaking = true;
      }
      if (key.match(/texclass$/)) {
        to.attributes['texclass'] = attrs[i].value;
      }
      if (key === 'href') {
        to.attributes['href'] = attrs[i].value;
        to.nobreaking = true;
      }
    }
  }
};


/**
 * Finds the innermost element of an embellished operator node.
 * @param {sre.SemanticNode} node The embellished node.
 * @return {sre.SemanticNode} The innermost node.
 */
sre.SemanticUtil.getEmbellishedInner = function(node) {
  if (node && node.embellished && node.childNodes.length > 0) {
    return sre.SemanticUtil.getEmbellishedInner(node.childNodes[0]);
  }
  return node;
};


/**
 * Splits a list of nodes wrt. to a given predicate.
 * @param {Array.<sre.SemanticNode>} nodes A list of nodes.
 * @param {function(sre.SemanticNode): boolean} pred Predicate for the
 *    partitioning relation.
 * @param {boolean=} opt_reverse If true slicing is done from the end.
 * @return {{head: !Array.<sre.SemanticNode>,
 *           div: sre.SemanticNode,
 *           tail: !Array.<sre.SemanticNode>}} The split list.
 */
sre.SemanticUtil.sliceNodes = function(nodes, pred, opt_reverse) {
  if (opt_reverse) {
    nodes.reverse();
  }
  var head = [];
  for (var i = 0, node; node = nodes[i]; i++) {
    if (pred(node)) {
      if (opt_reverse) {
        return {head: nodes.slice(i + 1).reverse(),
          div: node,
          tail: head.reverse()};
      }
      return {head: head,
        div: node,
        tail: nodes.slice(i + 1)};
    }
    head.push(node);
  }
  if (opt_reverse) {
    return {head: [], div: null, tail: head.reverse()};
  }
  return {head: head, div: null, tail: []};
};


/**
 * @typedef {{rel: !Array.<sre.SemanticNode>,
 *            comp: !Array.<!Array.<sre.SemanticNode>>}}
 */
sre.SemanticUtil.Partition;


/**
 * Partitions a list of nodes wrt. to a given predicate. Effectively works like
 * a PER on the ordered set of nodes.
 * @param {!Array.<!sre.SemanticNode>} nodes A list of nodes.
 * @param {function(sre.SemanticNode): boolean} pred Predicate for the
 *    partitioning relation.
 * @return {sre.SemanticUtil.Partition}
 *    The partitioning given in terms of a collection of elements satisfying
 *    the predicate and a collection of complementary sets lying inbetween the
 *    related elements. Observe that we always have |comp| = |rel| + 1.
 *
 * Example: On input [a, r_1, b, c, r_2, d, e, r_3] where P(r_i) holds, we
 *    get as output: {rel: [r_1, r_2, r_3], comp: [[a], [b, c], [d, e], []].
 */
sre.SemanticUtil.partitionNodes = function(nodes, pred) {
  var restNodes = nodes;
  var rel = [];
  var comp = [];

  do {
    var result = sre.SemanticUtil.sliceNodes(restNodes, pred);
    comp.push(result.head);
    rel.push(result.div);
    restNodes = result.tail;
  } while (result.div);
  rel.pop();
  return {rel: rel, comp: comp};
};



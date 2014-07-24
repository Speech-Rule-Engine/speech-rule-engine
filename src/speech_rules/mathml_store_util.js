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
 * @fileoverview Utility functions for mathml and mathjax rule store.
 * @author sorge@google.com (Volker Sorge)
 */

goog.provide('sre.MathmlStoreUtil');

goog.require('sre.Engine');
goog.require('sre.MathUtil');
goog.require('sre.XpathUtil');


/**
 * Retrieves MathML sub element with same id as MathJax node.
 * @param {!Node} inner A node internal to a MathJax node.
 * @return {Node} The internal MathML node corresponding to the MathJax node.
 */
sre.MathmlStoreUtil.matchMathjaxToMathml = function(inner) {
  var mml = sre.Engine.getInstance().alternativeHost;
  return mml.querySelector('#' + inner.id);
};


/**
 * Retrieve an extender symbol for a given node.
 * @param {!Node} jax The MathJax node.
 * @return {Array.<Node>} The resulting node list.
 */
sre.MathmlStoreUtil.retrieveMathjaxExtender = function(jax) {
  var ext = sre.MathmlStoreUtil.matchMathjaxToMathml(jax);
  if (ext) {
    return [ext];
  }
  return [];
};


/**
 * Retrieve an extender symbol for a given node.
 * @param {!Node} jax The MathJax node.
 * @return {Array.<Node>} The resulting node list.
 */
sre.MathmlStoreUtil.retrieveMathjaxLeaf = function(jax) {
  var leaf = sre.MathmlStoreUtil.matchMathjaxToMathml(jax);
  if (leaf) {
    return [leaf];
  }
  return [];
};


/**
 * For a given MathJax node it returns the equivalent MathML node,
 * if it is of the right tag.
 * @param {!Node} jax The Mathjax node.
 * @param {!string} tag The required tag.
 * @return {Array.<Node>} The resulting node list.
 */
sre.MathmlStoreUtil.checkMathjaxTag = function(jax, tag) {
  var node = sre.MathmlStoreUtil.matchMathjaxToMathml(jax);
  if (node && node.tagName.toUpperCase() == tag) {
    return [node];
  }
  return [];
};


/**
 * Returns MathML node if MathJax is munder.
 * @param {!Node} jax The Mathjax node.
 * @return {Array.<Node>} The resulting node list.
 */
sre.MathmlStoreUtil.checkMathjaxMunder = function(jax) {
  return sre.MathmlStoreUtil.checkMathjaxTag(jax, 'MUNDER');
};


/**
 * Returns MathML node if MathJax is mover.
 * @param {!Node} jax The Mathjax node.
 * @return {Array.<Node>} The resulting node list.
 */
sre.MathmlStoreUtil.checkMathjaxMover = function(jax) {
  return sre.MathmlStoreUtil.checkMathjaxTag(jax, 'MOVER');
};


/**
 * Returns MathML node if MathJax is msub.
 * @param {!Node} jax The Mathjax node.
 * @return {Array.<Node>} The resulting node list.
 */
sre.MathmlStoreUtil.checkMathjaxMsub = function(jax) {
  return sre.MathmlStoreUtil.checkMathjaxTag(jax, 'MSUB');
};


/**
 * Returns MathML node if MathJax is msup.
 * @param {!Node} jax The Mathjax node.
 * @return {Array.<Node>} The resulting node list.
 */
sre.MathmlStoreUtil.checkMathjaxMsup = function(jax) {
  return sre.MathmlStoreUtil.checkMathjaxTag(jax, 'MSUP');
};


/**
 * Constructs a closure that returns separators for an MathML mfenced
 * expression.
 * Separators in MathML are represented by a list and used up one by one
 * until the final element is used as the default.
 * Example: a b c d e  and separators [+,-,*]
 * would result in a + b - c * d * e.
 * @param {string} separators String representing a list of mfenced separators.
 * @return {function(): string|null} A closure that returns the next separator
 * for an mfenced expression starting with the first node in nodes.
 */
sre.MathmlStoreUtil.nextSeparatorFunction = function(separators) {
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


/**
 * Computes the correct separators for each node.
 * @param {Array.<Node>} nodes A node array.
 * @param {string} context A context string.
 * @return {function(): string} A closure that returns the next separator for an
 * mfenced expression starting with the first node in nodes.
 */
sre.MathmlStoreUtil.mfencedSeparators = function(nodes, context) {
  var nextSeparator = sre.MathmlStoreUtil.nextSeparatorFunction(context);
  return function() {
    return nextSeparator ? nextSeparator() : '';
  };
};


/**
 * Iterates over the list of content nodes of the parent of the given nodes.
 * @param {Array.<Node>} nodes A node array.
 * @param {string} context A context string.
 * @return {function(): string} A closure that returns the content of the next
 *     content node. Returns only context string if list is exhausted.
 */
sre.MathmlStoreUtil.contentIterator = function(nodes, context) {
  if (nodes.length > 0) {
    var contentNodes = sre.XpathUtil.evalXPath('../../content/*', nodes[0]);
  } else {
    var contentNodes = [];
  }
  return function() {
    var content = contentNodes.shift();
    return context + (content ? content.textContent : '');
  };
};

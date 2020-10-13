// Copyright 2019 Volker Sorge
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

goog.provide('sre.MathspeakFrenchUtil');


/**
 * Predicate to decide if a root has a small index, i.e., between 1 and 10.
 * @param {Node} node The root node.
 * @return {Array.<Node>} The list with the given node, if it is a root with a
 *     small index.
 */
sre.MathspeakFrenchUtil.smallRoot = function(node) {
  if (!node.childNodes || node.childNodes.length === 0 ||
      !node.childNodes[0].childNodes) {
    return [];
  }
  var index = node.childNodes[0].childNodes[0].textContent;
  if (!/^\d+$/.test(index)) {
    return [];
  }
  var number = parseInt(index, 10);
  return (number > 1 && number <= 3) ? [node] : [];
};


/**
 * Computes baseline prefix in verbose mode.
 * @param {!Node} node Subscript node.
 * @return {string} The prefix string.
 */
sre.MathspeakFrenchUtil.baselineVerbose = function(node) {
  var baseline = sre.MathspeakUtil.baselineVerbose(node);
  return baseline.replace(/\-$/, '');
};


/**
 * Computes baseline prefix in brief mode.
 * @param {!Node} node Subscript node.
 * @return {string} The prefix string.
 */
sre.MathspeakFrenchUtil.baselineBrief = function(node) {
  var baseline = sre.MathspeakUtil.baselineBrief(node);
  return baseline.replace(/\-$/, '');
};


/**
 * Computes left superscript prefix in verbose mode.
 * @param {!Node} node Tensor node.
 * @return {string} The prefix string.
 */
sre.MathspeakFrenchUtil.leftSuperscriptVerbose = function(node) {
  var leftIndex = sre.MathspeakUtil.superscriptVerbose(node);
  return leftIndex.replace(/^exposant/, 'exposant gauche');
};


/**
 * Computes left subscript prefix in verbose mode.
 * @param {!Node} node Tensor node.
 * @return {string} The prefix string.
 */
sre.MathspeakFrenchUtil.leftSubscriptVerbose = function(node) {
  var leftIndex = sre.MathspeakUtil.subscriptVerbose(node);
  return leftIndex.replace(/^indice/, 'indice gauche');
};


/**
 * Computes left superscript prefix in brief mode.
 * @param {!Node} node Tensor node.
 * @return {string} The prefix string.
 */
sre.MathspeakFrenchUtil.leftSuperscriptBrief = function(node) {
  var leftIndex = sre.MathspeakUtil.superscriptBrief(node);
  return leftIndex.replace(/^sup/, 'sup gauche');
};


/**
 * Computes left subscript prefix in brief mode.
 * @param {!Node} node Tensor node.
 * @return {string} The prefix string.
 */
sre.MathspeakFrenchUtil.leftSubscriptBrief = function(node) {
  var leftIndex = sre.MathspeakUtil.subscriptBrief(node);
  return leftIndex.replace(/^sub/, 'sub gauche');
};

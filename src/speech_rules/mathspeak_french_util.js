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

goog.require('sre.BaseUtil');
goog.require('sre.DomUtil');
goog.require('sre.Messages');
goog.require('sre.Semantic');
goog.require('sre.SemanticProcessor');
goog.require('sre.SystemExternal');
goog.require('sre.XpathUtil');


goog.scope(function() {
var msg = sre.Messages;

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


sre.MathspeakFrenchUtil.baselineVerbose = function(node) {
  var baseline = sre.MathspeakUtil.baselineVerbose(node);
  // return baseline === msg.MS.BASELINE ? baseline :
  //   'position-' + baseline.replace(/\-$/, '');
  return baseline.replace(/\-$/, '');
};


sre.MathspeakFrenchUtil.baselineBrief = function(node) {
  var baseline = sre.MathspeakUtil.baselineBrief(node);
  // return baseline === msg.MS.BASE ? baseline :
  //   'position-' + baseline.replace(/\-$/, '');
  return baseline.replace(/\-$/, '');
};

sre.MathspeakFrenchUtil.leftSuperscriptVerbose = function(node) {
  var leftIndex = sre.MathspeakUtil.superscriptVerbose(node);
  return leftIndex.replace(/^exposant/, 'exposant gauche');
};

sre.MathspeakFrenchUtil.leftSubscriptVerbose = function(node) {
  var leftIndex = sre.MathspeakUtil.subscriptVerbose(node);
  return leftIndex.replace(/^indice/, 'indice gauche');
};

sre.MathspeakFrenchUtil.leftSuperscriptBrief = function(node) {
  var leftIndex = sre.MathspeakUtil.superscriptBrief(node);
  return leftIndex.replace(/^sup/, 'sup gauche');
};

sre.MathspeakFrenchUtil.leftSubscriptBrief = function(node) {
  var leftIndex = sre.MathspeakUtil.subscriptBrief(node);
  return leftIndex.replace(/^sub/, 'sub gauche');
};


});  // goog.scope

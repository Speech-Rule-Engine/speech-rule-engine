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
 * @fileoverview General utility functions for rule stores.
 * @author sorge@google.com (Volker Sorge)
 */

goog.provide('sre.StoreUtil');


/**
 * Count list of nodes and concatenate this with the context string.
 * Returns a closure with a local state.
 * @param {Array.<Node>} nodes A node array.
 * @param {?string} context A context string.
 * @return {function(): string} A function returning a string.
 */
sre.StoreUtil.nodeCounter = function(nodes, context) {
  // Local state.
  var localLength = nodes.length;
  var localCounter = 0;
  var localContext = context;
  if (!context) {
    localContext = '';
  }
  return function() {
    if (localCounter < localLength) {
      localCounter += 1;
    }
    return localContext + ' ' + localCounter;
  };
};


/**
 * Returns a separating pause element.
 * @param {Array.<Node>} nodes A node array.
 * @param {string} context A pause value string.
 * @return {function(): Array.<sre.AuditoryDescription>} A closure that
 *     returns a personality description of a single pause.
 */
sre.StoreUtil.pauseSeparator = function(nodes, context) {
  var numeral = parseFloat(context);
  var value = isNaN(numeral) ? context : numeral;
  return function() {
    return [sre.AuditoryDescription.create(
        {text: '', personality: {pause: value}})];
  };
};


/**
 * Iterates over the list of content nodes of the parent of the given nodes.
 * @param {Array.<Node>} nodes A node array.
 * @param {string} context A context string.
 * @return {function(): Array.<sre.AuditoryDescription>} A closure that returns
 *     the content of the next content node. Returns only context string if list
 *     is exhausted.
 */
sre.StoreUtil.contentIterator = function(nodes, context) {
  if (nodes.length > 0) {
    var contentNodes = sre.XpathUtil.evalXPath('../../content/*', nodes[0]);
  } else {
    var contentNodes = [];
  }
  return function() {
    var content = contentNodes.shift();
    var contextDescr = context ?
        [sre.AuditoryDescription.create(
            {text: context}, {translate: true})] :
        [];
    if (!content) {
      return contextDescr;
    }
    var descrs = sre.SpeechRuleEngine.getInstance().evaluateNode(content);
    return contextDescr.concat(descrs);
  };
};

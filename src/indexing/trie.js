// Copyright 2016 Volker Sorge
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
//
// Supported by the Mozilla Foundation.

/**
 * @fileoverview Generalised trie for indexing speech rule.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.Trie');

goog.require('sre.Engine');
goog.require('sre.TrieNode');
goog.require('sre.TrieNodeFactory');



/**
 * @constructor
 * @param {sre.SpeechRuleStore} store The store the trie belongs to.
 */
sre.Trie = function(store) {
  this.store = store;
  this.root = sre.TrieNodeFactory.getNode(
    sre.TrieNode.Kind.ROOT, '', this.store);
};


/**
 * Inserts a speech rule into the trie.
 * @param {sre.SpeechRule} rule The speech rule to add.
 */
sre.Trie.prototype.addRule = function(rule) {
  var runningNode = this.root;
  var dynamicCstr = rule.dynamicCstr.getValues();
  for (var i = 0, l = dynamicCstr.length; i < l; i++) {
    var currentNode = runningNode.getChild(dynamicCstr[i]);
    if (!currentNode) {
      currentNode = sre.TrieNodeFactory.getNode(
        sre.TrieNode.Kind.DYNAMIC, dynamicCstr[i], this.store);
      runningNode.addChild(currentNode);
    }
    runningNode = currentNode;
  }
  var query = rule.precondition.query;
  currentNode = runningNode.getChild(query);
  if (!currentNode) {
    currentNode = sre.TrieNodeFactory.getNode(
      sre.TrieNode.Kind.QUERY, query, this.store);
    runningNode.addChild(currentNode);
  }
  runningNode = currentNode;
  var booleans = rule.precondition.constraints;
  for (var i = 0, l = booleans.length; i < l; i++) {
    currentNode = runningNode.getChild(booleans[i]);
    if (!currentNode) {
      currentNode = sre.TrieNodeFactory.getNode(
        sre.TrieNode.Kind.BOOLEAN, booleans[i], this.store);
      runningNode.addChild(currentNode);
    }
    runningNode = currentNode;
  }
  runningNode.setRule(rule);
};


// TODO
sre.Trie.prototype.deleteRule = function(rule) {
  
};


/**
 * @override
 */
sre.Trie.prototype.toString = function() {
  return sre.Trie.printWithDepth_(this.root, 0, '');
};


/**
 * Prints tree to a string.
 * @param {sre.TrieNode} node The current try node to print.
 * @param {number} depth The current depth of the node.
 * @param {string} str The string that has already been assembled.
 * @return {string}
 * @private
 */
sre.Trie.printWithDepth_ = function(node, depth, str) {
  var prefix = new Array(depth + 2).join(depth) + ': ';
  str += prefix + node.toString() + '\n';
  var children = node.getChildren();
  for (var i = 0, child; child = children[i]; i++) {
    str = sre.Trie.printWithDepth_(child, depth + 1, str);
  }
  return str;
};


sre.Trie.maxOrder = function(node) {
  var children = node.getChildren();
  if (!children.length) {
    return 0;
  }
  var max = Math.max.apply(null, children.map(sre.Trie.maxOrder));
  return Math.max(children.length, max);
};

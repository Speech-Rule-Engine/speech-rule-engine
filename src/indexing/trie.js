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
 * As trie is a pure indexing structure, we currently assume that we will not
 * remove rules from the trie. I.e., if a rule is removed from a speech rule
 * store, we have to rebuild the trie. This is the same worst case complexity as
 * removing a single rule.
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
  var node = this.root;
  var dynamicCstr = rule.dynamicCstr.getValues();
  for (var i = 0, l = dynamicCstr.length; i < l; i++) {
    node = this.addNode_(node, dynamicCstr[i], sre.TrieNode.Kind.DYNAMIC);
  }
  node = this.addNode_(node, rule.precondition.query, sre.TrieNode.Kind.QUERY);
  var booleans = rule.precondition.constraints;
  for (i = 0, l = booleans.length; i < l; i++) {
    node = this.addNode_(node, booleans[i], sre.TrieNode.Kind.BOOLEAN);
  }
  node.setRule(rule);
};


/**
 * Retrieves node for the given constraint. Adds a new node if necessary.
 * @param {sre.TrieNode} node The current node in the trie.
 * @param {string} constraint The constraint string.
 * @param {sre.TrieNode.Kind} kind The kind of node.
 * @return {sre.TrieNode} The trie node corresponding to the constraint.
 * @private
 */
sre.Trie.prototype.addNode_ = function(node, constraint, kind) {
  var nextNode = node.getChild(constraint);
  if (!nextNode) {
    nextNode = sre.TrieNodeFactory.getNode(kind, constraint, this.store);
    node.addChild(nextNode);
  }
  return nextNode;
};


/**
 * Retrieves a set of speech rules that are applicable to a given XML node
 * wrt. to a dynamic constraint.
 * @param {!Node} xml An XML node.
 * @param {sre.DynamicCstr} dynamic A dynamic constraint.
 * @return {!Array.<sre.SpeechRule>} The speech rules that can be applied to the
 *     given node.
 */
sre.Trie.prototype.lookupRules = function(xml, dynamic) {
  var nodes = [this.root];
  var rules = [];
  var dynamicSets = this.dynamicCstrSets_(dynamic);
  // Algorithm:
  // Pop node, get children,
  // add child if constraint is correct.
  // add rule if child has a rule.
  //
  // First deal with dynamic constraints.
  while (dynamicSets.length) {
    var dynamicSet = dynamicSets.shift();
    var newNodes = [];
    while (nodes.length) {
      var node = nodes.shift();
      var children = node.getChildren();
      children.forEach(
        function(child) {
          if (child.getKind() !== sre.TrieNode.Kind.DYNAMIC ||
              dynamicSet.indexOf(child.getConstraint()) !== -1) {
            newNodes.push(child);
          }
        });
    }
    nodes = newNodes.slice();
  }
  // Then we deal with static constraints, while collecting rules.
  while (nodes.length) {
    node = nodes.shift();
    if (node.getRule) {
      var rule = node.getRule();
      if (rule) {
        rules.push(rule);
      }
    }
    children = node.findChildren(xml);
    nodes = nodes.concat(children);
  }
  return rules;
};


// TODO: This is temporary until it is finalised how to deal with default
// constraints.
/**
 * Enriches the dynamic constraint into sets containing default values.
 * @param {sre.DynamicCstr} dynamic A dynamic constraint.
 * @return {!Array.<Array<string>>} Sets of dynamic constraint values.
 * @private
 */
sre.Trie.prototype.dynamicCstrSets_ = function(dynamic) {
  var values = dynamic.getValues();
  if (sre.Engine.getInstance().strict) {
    return values.map(function(value) {return [value];});
  }
  return values.map(function(value) {
    return value === 'default' ? [value] : [value, 'default'];
  });
};


/**
 * @override
 */
sre.Trie.prototype.toString = function() {
  return sre.Trie.printWithDepth_(this.root, 0, '');
};


/**
 * @return {!Array.<sre.SpeechRule>} Set of speech rules in the trie.
 */
sre.Trie.prototype.collectRules = function() {
  var rules = [];
  var collectRules = function(node) {
    if (node.getKind() === sre.TrieNode.Kind.QUERY ||
        node.getKind() === sre.TrieNode.Kind.BOOLEAN) {
      var rule = node.getRule();
      if (rule) rules.unshift(rule);
    }
    node.getChildren().forEach(collectRules);
  };
  collectRules(this.root);
  return rules;
};


/**
 * @return {number} The order of the trie.
 */
sre.Trie.prototype.order = function() {
  return sre.Trie.order_(this.root);
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


/**
 * Computes the maximal order of the trie beneath the given node.
 * @param {sre.TrieNode} node The trie node considered as root.
 * @return {number} The order of the trie.
 * @private
 */
sre.Trie.order_ = function(node) {
  var children = node.getChildren();
  if (!children.length) {
    return 0;
  }
  var max = Math.max.apply(null, children.map(sre.Trie.order_));
  return Math.max(children.length, max);
};


// 566 test successful.
// Time for tests: 173650ms

// 564 test successful.
// Time for tests: 49412ms

// 566 test successful.
// Time for tests: 48076ms

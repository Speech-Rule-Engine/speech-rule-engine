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
 * @fileoverview Interface for generalised trie nodes.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.TrieNode');



/**
 * @interface
 * @template T
 */
sre.TrieNode = function() { };


/**
 * @return {string} The constraint the node represents.
 */
sre.TrieNode.prototype.getConstraint = function() { };


/**
 * @return {sre.TrieNode.Kind} The kind of trie node.
 */
sre.TrieNode.prototype.getKind = function() { };


/**
 * @param {T} object The object.
 * @return {boolean} The static method which tests the constraint.
 */
sre.TrieNode.prototype.applyTest = function(object) { };


/**
 * Adds a child to this node.
 * @param {sre.TrieNode} node A new child node for this node.
 * @return {?sre.TrieNode} The old node if one was replaced.
 */
sre.TrieNode.prototype.addChild = function(node) { };


/**
 * Get the child registered in the node for the given constraint.
 * @param {string} constraint The constraint string.
 * @return {?sre.TrieNode} The child node if it exists.
 */
sre.TrieNode.prototype.getChild = function(constraint) { };


/**
 * Get a list of children of the node.
 * @return {!Array.<sre.TrieNode>} The children of the node.
 */
sre.TrieNode.prototype.getChildren = function() { };


/**
 * Select children of the node by applying the constraint test.
 * @param {!T} object The object to which to apply the test.
 * @return {!Array.<sre.TrieNode>} The child node if it exists.
 */
sre.TrieNode.prototype.findChildren = function(object) { };



/**
 * Remove the child registered in the node for the given constraint.
 * @param {string} constraint The constraint string.
 */
sre.TrieNode.prototype.removeChild = function(constraint) { };


/**
 * @enum {string}
 */
sre.TrieNode.Kind = {
  ROOT: 'root',
  DYNAMIC: 'dynamic',
  QUERY: 'query',
  BOOLEAN: 'boolean',
  STATIC: 'static'
};

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
 * @fileoverview Abstract classes of generalised trie nodes.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.AbstractTrieNode');
goog.provide('sre.ConstraintTrieNode');

goog.require('sre.TrieNode');



/**
 * @constructor
 * @implements {sre.TrieNode}
 * @template T
 * @param {string} constraint The constraint the node represents.
 * @param {function(T): boolean} test The constraint test of this node.
 */
sre.AbstractTrieNode = function(constraint, test) {
  /**
   * @type {string}
   * @private
   */
  this.constraint_ = constraint;

  /**
   * @type {function(T): boolean}
   * @private
   */
  this.test_ = test;

  /**
   * @type {!Object.<string, sre.TrieNode>}
   * @private
   */
  this.children_ = {};

  /**
   * @type {sre.TrieNode.Kind}
   */
  this.kind = sre.TrieNode.Kind.ROOT;

};


/**
 * @override
 */
sre.AbstractTrieNode.prototype.getConstraint = function() {
  return this.constraint_;
};


/**
 * @override
 */
sre.AbstractTrieNode.prototype.getKind = function() {
  return this.kind;
};


/**
 * @override
 */
sre.AbstractTrieNode.prototype.getTest = function() {
  return this.test_;
};


/**
 * @override
 */
sre.AbstractTrieNode.prototype.addChild = function(node) {
  var constraint = node.getConstraint();
  var child = this.children_[constraint];
  this.children_[constraint] = node;
  return child;
};


/**
 * @override
 */
sre.AbstractTrieNode.prototype.getChild = function(constraint) {
  return this.children_[constraint];
};


/**
 * @override
 */
sre.AbstractTrieNode.prototype.getChildren = function() {
  var children = [];
  for (var key in this.children_) {
    children.push(this.children_[key]);
  }
  return children;
};


/**
 * @override
 */
sre.AbstractTrieNode.prototype.findChildren = function(object) {
  var children = [];
  for (var key in this.children_) {
    var child = this.children_[key];
    if (child.getTest()(object)) {
      children.push(child);
    }
  }
  return children;
};


/**
 * @override
 */
sre.AbstractTrieNode.prototype.toString = function() {
  return this.constraint_;
};


/**
 * @constructor
 * @extends {sre.AbstractTrieNode<Node>}
 * @param {string} constraint The constraint the node represents.
 * @param {function(Node): boolean} test The constraint test of this node.
 */
sre.ConstraintTrieNode = function(constraint, test) {
  sre.ConstraintTrieNode.base(this, 'constructor', constraint, test);
  this.kind = sre.TrieNode.Kind.CONSTRAINT;

  /**
   * @type {?sre.SpeechRule}
   * @private
   */
  this.rule_ = null;

};
goog.inherits(sre.ConstraintTrieNode, sre.AbstractTrieNode);


/**
 * @return {?sre.SpeechRule} The speech rule of the node.
 */
sre.ConstraintTrieNode.prototype.getRule = function() {
  return this.rule_;
};


/**
 * @param {sre.SpeechRule} rule speech rule of the node.
 */
sre.ConstraintTrieNode.prototype.setRule = function(rule) {
  if (this.rule_) {
    sre.Debugger.getInstance().output(
      'Replacing rule ' + this.rule_ + ' with ' + rule);
  }
  this.rule_ = rule;
};


/**
 * @override
 */
sre.ConstraintTrieNode.prototype.toString = function() {
  var rule = this.getRule();
  return rule ?
    this.constraint_ + '\n' + '==> ' + this.getRule().action : this.constraint_;
};

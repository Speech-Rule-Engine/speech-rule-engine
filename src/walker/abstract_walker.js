// Copyright 2015 Volker Sorge
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
 * @fileoverview Abstract class implementation of the walker interface.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.AbstractWalker');

goog.require('sre.EnrichMathml');
goog.require('sre.EventUtil.KeyCode');
goog.require('sre.WalkerInterface');



/**
 * @constructor
 * @implements {sre.WalkerInterface}
 * @param {!Node} node The node on which the walker is called.
 * @param {!sre.SpeechGeneratorInterface} generator The speech generator for
 *     this walker.
 * @override
 */
sre.AbstractWalker = function(node, generator) {
  /**
   * The math expression on which the walker is called.
   * @type {!Node}
   */
  this.node = node;

  /**
   * @type {!sre.SpeechGeneratorInterface}
   */
  this.generator = generator;

  /**
   * @type {boolean}
   * @private
   */
  this.active_ = false;

  /**
   * @type {Object.<sre.EventUtil.KeyCode, function()>}
   * @private
   */
  this.keyMapping_ = {};
  this.keyMapping_[sre.EventUtil.KeyCode.UP] = goog.bind(this.up, this);
  this.keyMapping_[sre.EventUtil.KeyCode.DOWN] = goog.bind(this.down, this);
  this.keyMapping_[sre.EventUtil.KeyCode.RIGHT] = goog.bind(this.right, this);
  this.keyMapping_[sre.EventUtil.KeyCode.LEFT] = goog.bind(this.left, this);

  this.dummy_ = function() {};
  this.keyMapping_[sre.EventUtil.KeyCode.TAB] = goog.bind(this.dummy_, this);
  this.keyMapping_[sre.EventUtil.KeyCode.ENTER] = goog.bind(this.dummy_, this);
  this.keyMapping_[sre.EventUtil.KeyCode.SPACE] = goog.bind(this.dummy_, this);

  /**
   * The node that currently inspected. Initially this is the entire math
   * expression.
   * @type {!Node}
   */
  this.currentNode = this.getRoot_(node);
};


/**
 * @override
 */
sre.AbstractWalker.prototype.isActive = function() {
  return this.active_;
};


/**
 * Toggles the activity indicator of the walker.
 * @private
 */
sre.AbstractWalker.prototype.toggleActive_ = function() {
  this.active_ = !this.active_;
};


/**
 * @override
 */
sre.AbstractWalker.prototype.activate = function() {
  if (this.isActive()) {
    return;
  }
  this.generator.start();
  this.toggleActive_();
};


/**
 * @override
 */
sre.AbstractWalker.prototype.deactivate = function() {
  if (!this.isActive()) {
    return;
  }
  this.generator.end();
  this.toggleActive_();
};


/**
 * @override
 */
sre.AbstractWalker.prototype.getCurrentNode = function() {
  return this.currentNode;
};


/**
 * @override
 */
sre.AbstractWalker.prototype.speech = function() {
  return this.generator.getSpeech(this.currentNode);
};


/**
 * @override
 */
sre.AbstractWalker.prototype.move = function(key) {
  var direction = this.keyMapping_[key];
  if (!direction) {
    return null;
  }
  var node = direction();
  if (!node || node === this.currentNode) {
    return false;
  }
  this.currentNode = node;
  return true;
};


/**
 * Moves up from the current node if possible.
 * @return {?Node}
 * @protected
 */
sre.AbstractWalker.prototype.up = goog.abstractMethod;


/**
 * Moves down from the current node if possible.
 * @return {?Node}
 * @protected
 */
sre.AbstractWalker.prototype.down = goog.abstractMethod;


/**
 * Moves left from the current node if possible.
 * @return {?Node}
 * @protected
 */
sre.AbstractWalker.prototype.left = goog.abstractMethod;


/**
 * Moves right from the current node if possible.
 * @return {?Node}
 * @protected
 */
sre.AbstractWalker.prototype.right = goog.abstractMethod;


/**
 * Retrieves the root node of the semantic tree.
 * @param {!Node} node The math node.
 * @return {!Node} The root node. If we cannot find one, the input node is
 *     returned.
 * @private
 */
sre.AbstractWalker.prototype.getRoot_ = function(node) {
  if (node.hasAttribute(sre.EnrichMathml.Attribute.SPEECH) &&
      !node.hasAttribute(sre.EnrichMathml.Attribute.PARENT)) {
    return node;
  }
  var speechNodes = node.querySelectorAll(
      '[' + sre.EnrichMathml.Attribute.SPEECH + ']');
  for (var i = 0, speechNode; speechNode = speechNodes[i]; i++) {
    if (!speechNode.hasAttribute(sre.EnrichMathml.Attribute.PARENT)) {
      return speechNode;
    }
  }
  return node;
};

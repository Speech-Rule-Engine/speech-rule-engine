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
 * @fileoverview Abstract class implementation of the walker interface.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.AbstractWalker');

goog.require('sre.EventUtil.KeyCode');
goog.require('sre.WalkerInterface');



/**
 * @constructor
 * @implements {sre.WalkerInterface}
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
  this.keyMapping_[sre.EventUtil.KeyCode.UP] = this.up;
  this.keyMapping_[sre.EventUtil.KeyCode.DOWN] = this.down;
  this.keyMapping_[sre.EventUtil.KeyCode.RIGHT] = this.right;
  this.keyMapping_[sre.EventUtil.KeyCode.LEFT] = this.left;
  
  /**
   * The node that currently inspected. Initially this is the entire math
   * expression.
   * @type {!Node}
   */
  this.currentNode = node;
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
sre.AbstractWalker.prototype.getSpeech = function(key) {
  var direction = this.keyMapping_[key];
  console.log(direction);
  console.log(this.up);
  if (!direction) {
    return null;
  }
  var node = direction();
  if (!node || node === this.currentNode) {
    return null;
  } 
  return this.generator.getSpeech(this.currentNode);
};


/**
 * @override
 */
sre.AbstractWalker.prototype.up = goog.abstractMethod;


/**
 * @override
 */
sre.AbstractWalker.prototype.down = goog.abstractMethod;


/**
 * @override
 */
sre.AbstractWalker.prototype.left = goog.abstractMethod;


/**
 * @override
 */
sre.AbstractWalker.prototype.right = goog.abstractMethod;

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
goog.require('sre.Focus');
goog.require('sre.WalkerInterface');
goog.require('sre.WalkerUtil');



/**
 * @constructor
 * @implements {sre.WalkerInterface}
 * @param {!Node} node The (rendered) node on which the walker is called.
 * @param {!sre.SpeechGeneratorInterface} generator The speech generator for
 *     this walker.
 * @param {!string} xml The original xml/mathml node on which the walker is
 *      called as a string.
 * @override
 */
sre.AbstractWalker = function(node, generator, xml) {
  /**
   * The math expression on which the walker is called.
   * @type {!Node}
   */
  this.node = node;

  /**
   * The original xml/mathml node on which the walker is called.
   * @type {!Element}
   */
  this.xml = sre.DomUtil.parseInput(xml);

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

  var rootNode = this.getRoot_(node);
  /**
   * The node that currently inspected. Initially this is the entire math
   * expression.
   * @type {!sre.Focus}
   * @private
   */
  this.focus_ = new sre.Focus({nodes: [rootNode], primary: rootNode});

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
sre.AbstractWalker.prototype.getFocus = function() {
  return this.focus_;
};


/**
 * @override
 */
sre.AbstractWalker.prototype.speech = function() {
  return this.focus_.getNodes().map(
      goog.bind(function(x) {return this.generator.getSpeech(x, this.xml);}, this))
      .join(' ');
};


/**
 * @override
 */
sre.AbstractWalker.prototype.move = function(key) {
  var direction = this.keyMapping_[key];
  if (!direction) {
    return null;
  }
  var focus = direction();
  if (!focus || focus === this.focus_) {
    return false;
  }
  this.focus_ = focus;
  return true;
};


/**
 * Moves up from the current node if possible.
 * @return {?sre.Focus}
 * @protected
 */
sre.AbstractWalker.prototype.up = goog.abstractMethod;


/**
 * Moves down from the current node if possible.
 * @return {?sre.Focus}
 * @protected
 */
sre.AbstractWalker.prototype.down = goog.abstractMethod;


/**
 * Moves left from the current node if possible.
 * @return {?sre.Focus}
 * @protected
 */
sre.AbstractWalker.prototype.left = goog.abstractMethod;


/**
 * Moves right from the current node if possible.
 * @return {?sre.Focus}
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
  if (node.hasAttribute(sre.EnrichMathml.Attribute.TYPE) &&
      !node.hasAttribute(sre.EnrichMathml.Attribute.PARENT)) {
    return node;
  }
  var semanticNodes = node.querySelectorAll(
      '[' + sre.EnrichMathml.Attribute.TYPE + ']');
  for (var i = 0, semanticNode; semanticNode = semanticNodes[i]; i++) {
    if (!semanticNode.hasAttribute(sre.EnrichMathml.Attribute.PARENT)) {
      return semanticNode;
    }
  }
  return node;
};


/**
 * Retrieves a node containing a given semantic id.
 * @param {string} id The id of a semantic node.
 * @return {Node} The node for that id.
 */
sre.AbstractWalker.prototype.getBySemanticId = function(id) {
  return sre.WalkerUtil.getBySemanticId(this.node, id);
};


/**
 * Retrieves an attribute from the primary focused node if it exists.
 * @param {sre.EnrichMathml.Attribute} attr The attribute to retrieves.
 * @return {string} The value of the attribute for the primary node of the
 *     focus.
 */
sre.AbstractWalker.prototype.primaryAttribute = function(attr) {
  var primary = this.focus_.getPrimary();
  return primary ? sre.WalkerUtil.getAttribute(primary, attr) : '';
};


/**
 * @return {string} The id of the primary node of the current focus.
 */
sre.AbstractWalker.prototype.primaryId = function() {
  return this.primaryAttribute(sre.EnrichMathml.Attribute.ID);
};

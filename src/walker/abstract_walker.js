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

goog.require('sre.DomUtil');
goog.require('sre.EnrichMathml.Attribute');
goog.require('sre.EventUtil.KeyCode');
goog.require('sre.Focus');
goog.require('sre.Highlighter');
goog.require('sre.RebuildStree');
goog.require('sre.SpeechGenerator');
goog.require('sre.SpeechGeneratorUtil');
goog.require('sre.Walker');
goog.require('sre.WalkerUtil');



/**
 * @constructor
 * @implements {sre.Walker}
 * @param {!Node} node The (rendered) node on which the walker is called.
 * @param {!sre.SpeechGenerator} generator The speech generator for
 *     this walker.
 * @param {!sre.Highlighter} highlighter The currently active
 *     highlighter.
 * @param {!string} xml The original xml/mathml node on which the walker is
 *      called as a string.
 * @override
 */
sre.AbstractWalker = function(node, generator, highlighter, xml) {

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
   * @type {!sre.SpeechGenerator}
   */
  this.generator = generator;

  /**
   * @type {!sre.RebuildStree}
   */
  this.rebuilt = this.rebuildStree_();
  this.generator.setRebuilt(this.rebuilt);

  //TODO: This is problematic as it will sometimes not be instantiated if called
  //      from MathJax.
  /**
   * @type {!sre.Highlighter}
   */
  this.highlighter = highlighter;

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
  this.keyMapping_[sre.EventUtil.KeyCode.TAB] = goog.bind(this.repeat, this);
  this.keyMapping_[sre.EventUtil.KeyCode.ENTER] = goog.bind(this.expand, this);
  this.keyMapping_[sre.EventUtil.KeyCode.SPACE] = goog.bind(this.depth, this);

  this.dummy_ = function() {};

  /**
   * The span in the math expression that corresponds to the root of the
   * semantic tree.
   * @type {!Node}
   */
  this.rootNode = sre.WalkerUtil.getSemanticRoot(node);

  /**
   * The node that currently inspected. Initially this is the entire math
   * expression.
   * @type {!sre.Focus}
   * @private
   */
  this.focus_ = new sre.Focus([this.rootNode], this.rootNode);

  /**
   * Flag indicating whether the last move actually moved focus.
   * @type {sre.AbstractWalker.move}
   */
  this.moved = sre.AbstractWalker.move.ENTER;

};


/**
 * Enumerator for different types of moves.
 * @enum {string}
 */
sre.AbstractWalker.move = {
  UP: 'up',
  DOWN: 'down',
  LEFT: 'left',
  RIGHT: 'right',
  REPEAT: 'repeat',
  DEPTH: 'depth',
  ENTER: 'enter',
  EXPAND: 'expand'
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
  this.highlighter.setState(this.node.id, this.primaryId());
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
sre.AbstractWalker.prototype.getDepth = goog.abstractMethod;


/**
 * @override
 */
sre.AbstractWalker.prototype.speech = function() {
  var nodes = this.focus_.getNodes();
  var prefix = nodes.length > 0 ? sre.WalkerUtil.getAttribute(
      /** @type {!Node} */(nodes[0]), sre.EnrichMathml.Attribute.PREFIX) : '';
  if (this.moved === sre.AbstractWalker.move.DEPTH) {
    return this.levelAnnouncement_(prefix);
  }
  var speech = nodes.map(
      goog.bind(function(x) {
        return this.generator.getSpeech(x, this.xml);
      }, this));
  if (prefix) speech.unshift(prefix);
  return speech.join(' ');
};


/**
 * Puts together an announcement string with level of the element, its meaning
 * in the expression, as well as whether or not it is expandable or collapsible.
 * @param {string} prefix The prefix of that element, representing its
 *     positional meaning.
 * @return {string} The announcement string.
 * @private
 */
sre.AbstractWalker.prototype.levelAnnouncement_ = function(prefix) {
  var primary = this.focus_.getPrimary();
  var expand = (this.expandable(primary) && ' expandable') ||
      (this.collapsible(primary) && ' collapsible') || '';
  return 'Level ' + this.getDepth() + (prefix ? ' ' + prefix : '') + expand;
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
sre.AbstractWalker.prototype.up = function() {
  this.moved = sre.AbstractWalker.move.UP;
  return this.focus_;
};


/**
 * Moves down from the current node if possible.
 * @return {?sre.Focus}
 * @protected
 */
sre.AbstractWalker.prototype.down = function() {
  this.moved = sre.AbstractWalker.move.DOWN;
  return this.focus_;
};


/**
 * Moves left from the current node if possible.
 * @return {?sre.Focus}
 * @protected
 */
sre.AbstractWalker.prototype.left = function() {
  this.moved = sre.AbstractWalker.move.LEFT;
  return this.focus_;
};


/**
 * Moves right from the current node if possible.
 * @return {?sre.Focus}
 * @protected
 */
sre.AbstractWalker.prototype.right = function() {
  this.moved = sre.AbstractWalker.move.RIGHT;
  return this.focus_;
};


/**
 * Stays on the current node and repeats it.
 * @return {?sre.Focus}
 * @protected
 */
sre.AbstractWalker.prototype.repeat = function() {
  this.moved = sre.AbstractWalker.move.REPEAT;
  return this.focus_.clone();
};


/**
 * Makes a depth announcement.
 * @return {?sre.Focus}
 * @protected
 */
sre.AbstractWalker.prototype.depth = function() {
  this.moved = sre.AbstractWalker.move.DEPTH;
  return this.focus_.clone();
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


/**
 * Expands or collapses a node if it is actionable.
 * @return {sre.Focus} New focus element if actionable. O/w old focus.
 */
sre.AbstractWalker.prototype.expand = function() {
  var primary = this.focus_.getPrimary();
  var expandable = this.actionable_(primary);
  if (!expandable) {
    return this.focus_;
  }
  this.moved = sre.AbstractWalker.move.EXPAND;
  expandable.onclick();
  return this.focus_.clone();
};


/**
 * Checks if a node is actionable, i.e., corresponds to an maction.
 * @param {Node} node The (rendered) node under consideration.
 * @return {Node} The node corresponding to an maction element.
 * @private
 */
sre.AbstractWalker.prototype.actionable_ = function(node) {
  return node && node.parentNode &&
      this.highlighter.isMactionNode(node.parentNode) ?
      node.parentNode : null;
};


/**
 * Checks if a node is expandable.
 * @param {Node} node The (rendered) node under consideration.
 * @return {boolean} True if the node is expandable.
 */
sre.AbstractWalker.prototype.expandable = function(node) {
  var parent = !!this.actionable_(node);
  return parent && node.childNodes.length === 0;
};


/**
 * Checks if a node can be collapsed.
 * @param {Node} node The (rendered) node under consideration.
 * @return {boolean} True if the node is collapsible.
 */
sre.AbstractWalker.prototype.collapsible = function(node) {
  var parent = !!this.actionable_(node);
  return parent && node.childNodes.length > 0;
};


/**
 * Restores the previous state for a node.
 */
sre.AbstractWalker.prototype.restoreState = function() {
  if (!this.highlighter) return;
  var state = this.highlighter.getState(this.node.id);
  if (!state) return;
  var node = this.rebuilt.nodeDict[state];
  var path = [];
  while (node) {
    path.push(node.id);
    node = node.parent;
  }
  path.pop();
  while (path.length > 0) {
    this.down();
    var id = path.pop();
    var focus = this.findFocusOnLevel(id);
    if (!focus) break;
    this.focus_ = focus;
  }
  this.moved = sre.AbstractWalker.move.ENTER;
};


/**
 * Finds the focus on the current level for a given node id.
 * @param {!number} id The id number.
 * @return {sre.Focus} The focus on a particular level.
 */
sre.AbstractWalker.prototype.findFocusOnLevel = goog.abstractMethod;


/**
 * Rebuilds the semantic tree given in the input xml element fully connected
 * with maction elements.
 * @return {!sre.RebuildStree} The reconstructed semantic tree.
 * @private
 */
sre.AbstractWalker.prototype.rebuildStree_ = function() {
  var rebuilt = new sre.RebuildStree(this.xml);
  sre.SpeechGeneratorUtil.connectMactions(this.node, this.xml, rebuilt.xml);
  return rebuilt;
};

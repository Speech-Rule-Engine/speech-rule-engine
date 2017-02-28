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

goog.require('sre.AuditoryDescription');
goog.require('sre.AuralRendering');
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
 * @template T
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
  this.keyMapping_[sre.EventUtil.KeyCode.HOME] = goog.bind(this.home, this);
  this.keyMapping_[sre.EventUtil.KeyCode.X] = goog.bind(this.summary, this);
  this.keyMapping_[sre.EventUtil.KeyCode.Z] = goog.bind(this.detail, this);

  this.dummy_ = function() {};

  /**
   * The span in the math expression that corresponds to the root of the
   * semantic tree.
   * @type {!Node}
   */
  this.rootNode = sre.WalkerUtil.getSemanticRoot(node);

  this.rootId = this.rebuilt.stree.root.id.toString();
  /**
   * The node that currently inspected. Initially this is the entire math
   * expression.
   * @type {!sre.Focus}
   * @private
   */
  this.focus_ = sre.Focus.factory(
      this.rootId, [this.rootId], this.rebuilt, this.node);

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
  EXPAND: 'expand',
  HOME: 'home',
  SUMMARY: 'summary',
  DETAIL: 'detail'
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
sre.AbstractWalker.prototype.setFocus = function(focus) {
  this.focus_ = focus;
};


/**
 * @override
 */
sre.AbstractWalker.prototype.getDepth = function() {
  return this.levels.depth() - 1;
};


/**
 * @override
 */
sre.AbstractWalker.prototype.speech = function() {
  var nodes = this.focus_.getDomNodes();
  var snodes = this.focus_.getSemanticNodes();
  if (!nodes.length) return '';
  // TODO: This should be more efficient. Recompute only when walker is
  // restarted.
  var prefix = nodes[0] ? sre.WalkerUtil.getAttribute(
      /** @type {!Node} */(nodes[0]), sre.EnrichMathml.Attribute.PREFIX) :
      sre.SpeechGeneratorUtil.retrievePrefix(snodes[0]);
  if (this.moved === sre.AbstractWalker.move.DEPTH) {
    return this.levelAnnouncement_(prefix);
  }
  if (this.moved === sre.AbstractWalker.move.SUMMARY ||
      this.moved === sre.AbstractWalker.move.DETAIL) {
    var summary = this.summary_();
    return prefix ?
      sre.AuralRendering.getInstance().merge([prefix, summary]) : summary;
  }
  var speech = [];
  for (var i = 0, l = nodes.length; i < l; i++) {
    var node = nodes[i];
    var snode = /** @type {!sre.SemanticNode} */(snodes[i]);
    speech.push(node ? this.generator.getSpeech(node, this.xml) :
                sre.SpeechGeneratorUtil.retrieveSpeech(this.xml, snode));
  }
  if (prefix) speech.unshift(prefix);
  return sre.AuralRendering.getInstance().merge(speech);
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
  var primary = this.focus_.getDomPrimary();
  var expand = (this.expandable(primary) && 'expandable') ||
      (this.collapsible(primary) && 'collapsible') || '';
  var descr = [sre.AuralRendering.getInstance().markup(
      [new sre.AuditoryDescription({text: 'Level ' + this.getDepth(),
         personality: {}})])];
  if (prefix) {
    descr.push(prefix);
  }
  if (expand) {
    descr.push(expand);
  }
  return sre.AuralRendering.getInstance().merge(descr);
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
  if (this.moved === sre.AbstractWalker.move.HOME) {
    this.levels = this.initLevels();
  }
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
 * Moving to the home position.
 * @return {?sre.Focus}
 * @protected
 */
sre.AbstractWalker.prototype.home = function() {
  this.moved = sre.AbstractWalker.move.HOME;
  return sre.Focus.factory(this.rootId, [this.rootId], this.rebuilt, this.node);
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
 * @return {string} The id of the primary node of the current focus.
 */
sre.AbstractWalker.prototype.primaryId = function() {
  return this.focus_.getSemanticPrimary().id.toString();
};


/**
 * Expands or collapses a node if it is actionable.
 * @return {sre.Focus} New focus element if actionable. O/w old focus.
 */
sre.AbstractWalker.prototype.expand = function() {
  var primary = this.focus_.getDomPrimary();
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
 * Returns a new, initialised level structure suitable for the walker.
 * @return {!sre.Levels} The new level structure initialised with root focus.
 */
sre.AbstractWalker.prototype.initLevels = goog.abstractMethod;


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


/**
 * Computes the previous level by Returning the id of the parent.
 * @return {?string} The previous level.
 */
sre.AbstractWalker.prototype.previousLevel = function() {
  var dnode = this.focus_.getDomPrimary();
  return dnode ?
      sre.WalkerUtil.getAttribute(dnode, sre.EnrichMathml.Attribute.PARENT) :
      this.focus_.getSemanticPrimary().parent.id.toString();
};


/**
 * Computes the next lower level from children and content.
 * @return {!Array.<T>} The next lower level.
 */
sre.AbstractWalker.prototype.nextLevel = function() {
  var dnode = this.focus_.getDomPrimary();
  if (dnode) {
    var children = sre.WalkerUtil.splitAttribute(
        sre.WalkerUtil.getAttribute(dnode,
                                    sre.EnrichMathml.Attribute.CHILDREN));
    var content = sre.WalkerUtil.splitAttribute(
        sre.WalkerUtil.getAttribute(dnode, sre.EnrichMathml.Attribute.CONTENT));
    var type = sre.WalkerUtil.getAttribute(
        dnode, sre.EnrichMathml.Attribute.TYPE);
    var role = sre.WalkerUtil.getAttribute(
        dnode, sre.EnrichMathml.Attribute.ROLE);
    return this.combineContentChildren(
        /** @type {!sre.SemanticAttr.Type} */ (type),
        /** @type {!sre.SemanticAttr.Role} */ (role),
        content, children);
  }
  var toIds = function(x) { return x.id.toString(); };
  var snode = this.rebuilt.nodeDict[this.primaryId()];
  children = snode.childNodes.map(toIds);
  content = snode.contentNodes.map(toIds);
  if (children.length === 0) return [];
  return this.combineContentChildren(
      snode.type, snode.role, content, children);
};


/**
 * Combines content and children lists depending on semantic type and role.
 * @param {!sre.SemanticAttr.Type} type The semantic type.
 * @param {!sre.SemanticAttr.Role} role The semantic role.
 * @param {!Array.<string>} content The list of content nodes.
 * @param {!Array.<string>} children The list of child nodes.
 * @return {!Array.<T>} The list of focus elements.
 */
sre.AbstractWalker.prototype.combineContentChildren = goog.abstractMethod;


/**
 * Creates a simple focus for a solitary node.
 * @param {string} id The semantic id of the focus node.
 * @return {!sre.Focus} A focus containing only this node and the other
 *     properties of the old focus.
 */
sre.AbstractWalker.prototype.singletonFocus = function(id) {
  return this.focusFromId(id, [id]);
};


/**
 * Makes a focus for a primary node and a node list, all given by their ids.
 * @param {string} id The semantic id of the primary node.
 * @param {!Array.<string>} ids The semantic id of the node list.
 * @return {!sre.Focus} The new focus.
 */
sre.AbstractWalker.prototype.focusFromId = function(id, ids) {
  return sre.Focus.factory(id, ids, this.rebuilt, this.node);
};


// TODO: Refactor similar code.
/**
 * Indicates if a virtual summary is possible.
 * @return {?sre.Focus}
 * @protected
 */
sre.AbstractWalker.prototype.summary = function() {
  var primary = this.focus_.getDomPrimary();
  if (this.collapsible(primary)) {
    this.moved = sre.AbstractWalker.move.SUMMARY;
    return this.focus_.clone();
  }
  return this.focus_;
};


/**
 * @return {string} The virtual summary of an element.
 * @private
 */
sre.AbstractWalker.prototype.summary_ = function() {
  var sprimary = this.focus_.getSemanticPrimary();
  var sid = sprimary.id.toString();
  var snode = this.rebuilt.xml.getAttribute('id') === sid ? this.rebuilt.xml :
      sre.DomUtil.querySelectorAllByAttrValue(this.rebuilt.xml, 'id', sid)[0];
  this.moved === sre.AbstractWalker.move.SUMMARY ?
    snode.setAttribute('alternative', sid) : 
    snode.removeAttribute('alternative');
  var descrs = sre.SpeechGeneratorUtil.computeSpeech(
    /** @type{!Node} */(snode));
  descrs = sre.AbstractWalker.removeCollapsed(descrs);
  return sre.AuralRendering.getInstance().markup(descrs);
};


/**
 * Indicates if a virtual detail is possible.
 * @return {?sre.Focus}
 * @protected
 */
sre.AbstractWalker.prototype.detail = function() {
  var primary = this.focus_.getDomPrimary();
  if (this.expandable(primary)) {
    this.moved = sre.AbstractWalker.move.DETAIL;
    return this.focus_.clone();
  }
  return this.focus_;
};


// TODO: Fit this into the grammar structure.
/**
 * Removes a leading collapsed text from a list of descriptions.
 * @param {!Array.<sre.AuditoryDescription>} descrs A list of descriptions.
 * @return {!Array.<sre.AuditoryDescription>} The reduced list.
 */
sre.AbstractWalker.removeCollapsed = function(descrs) {
  return (descrs.length && descrs[0].text === 'collapsed') ?
    descrs.slice(1) : descrs;
};

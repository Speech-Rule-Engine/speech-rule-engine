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
goog.require('sre.ClearspeakPreferences');
goog.require('sre.DomUtil');
goog.require('sre.EnrichMathml.Attribute');
goog.require('sre.EventUtil.KeyCode');
goog.require('sre.Focus');
goog.require('sre.Highlighter');
goog.require('sre.Levels');
goog.require('sre.Messages');
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
 * @param {string} xml The original xml/mathml node on which the walker is
 *      called as a string.
 * @override
 */
sre.AbstractWalker = function(node, generator, highlighter, xml) {

  /**
   * The math expression on which the walker is called.
   * @type {!Node}
   */
  this.node = node;
  if (this.node.id) {
    this.id = this.node.id;
  } else if (this.node.hasAttribute(sre.AbstractWalker.SRE_ID_ATTR)) {
    this.id = this.node.getAttribute(sre.AbstractWalker.SRE_ID_ATTR);
  } else {
    this.node.setAttribute(sre.AbstractWalker.SRE_ID_ATTR, sre.AbstractWalker.ID_COUNTER);
    this.id = sre.AbstractWalker.ID_COUNTER++;
  }

  /**
   * @type {!sre.SpeechGenerator}
   */
  this.generator = generator;

  //TODO: This is problematic as it will sometimes not be instantiated if called
  //      from MathJax.
  /**
   * @type {!sre.Highlighter}
   */
  this.highlighter = highlighter;

  /**
   * The span in the math expression that corresponds to the root of the
   * semantic tree.
   * @type {!Node}
   */
  this.rootNode = sre.WalkerUtil.getSemanticRoot(node);

  /**
   * Id of the root element of the semantic tree.
   * @type {string}
   */
  this.rootId = this.rootNode.getAttribute(sre.EnrichMathml.Attribute.ID);

  // All of these need to be initialised later!
  /**
   * The original xml/mathml node on which the walker is called.
   * @type {Element}
   */ // Change!
  this.xml_ = null;

  this.xmlString_ = xml;

  /**
   * @type {sre.RebuildStree}
   * @private
   */
  this.rebuilt_ = null;

  /**
   * The node that currently inspected. Initially this is the entire math
   * expression.
   * @type {null|sre.Focus}
   * @private
   */
  this.focus_ = null;
  // End of uninitialised fields.

  /**
   * @type {Object.<sre.EventUtil.KeyCode, function()>}
   */
  this.keyMapping = {};
  this.keyMapping[sre.EventUtil.KeyCode.UP] = goog.bind(this.up, this);
  this.keyMapping[sre.EventUtil.KeyCode.DOWN] = goog.bind(this.down, this);
  this.keyMapping[sre.EventUtil.KeyCode.RIGHT] = goog.bind(this.right, this);
  this.keyMapping[sre.EventUtil.KeyCode.LEFT] = goog.bind(this.left, this);
  this.keyMapping[sre.EventUtil.KeyCode.TAB] = goog.bind(this.repeat, this);
  this.keyMapping[sre.EventUtil.KeyCode.DASH] = goog.bind(this.expand, this);
  this.keyMapping[sre.EventUtil.KeyCode.SPACE] = goog.bind(this.depth, this);
  this.keyMapping[sre.EventUtil.KeyCode.HOME] = goog.bind(this.home, this);
  this.keyMapping[sre.EventUtil.KeyCode.X] = goog.bind(this.summary, this);
  this.keyMapping[sre.EventUtil.KeyCode.Z] = goog.bind(this.detail, this);
  this.keyMapping[sre.EventUtil.KeyCode.V] = goog.bind(this.virtualize, this);
  this.keyMapping[sre.EventUtil.KeyCode.P] = goog.bind(this.previous, this);
  this.keyMapping[sre.EventUtil.KeyCode.U] = goog.bind(this.undo, this);
  this.keyMapping[sre.EventUtil.KeyCode.LESS] = goog.bind(this.previousRules,
                                                          this);
  this.keyMapping[sre.EventUtil.KeyCode.GREATER] = goog.bind(this.nextRules,
                                                             this);

  /**
   * @type {boolean}
   * @private
   */
  this.active_ = false;

  /**
   * Flag indicating whether the last move actually moved focus.
   * @type {sre.Walker.move}
   */
  this.moved = sre.Walker.move.ENTER;

  /**
   * Stack of virtual cursors.
   * @type {Array.<sre.Walker.Cursor>}
   */
  this.cursors = [];
};


sre.AbstractWalker.prototype.getXml = function() {
  if (!this.xml_) {
    this.xml_ = sre.DomUtil.parseInput(this.xmlString_);
  }
  return this.xml_;
};

/**
 * @override
 */
sre.AbstractWalker.prototype.getRebuilt = function() {
  if (!this.rebuilt_) {
    this.rebuilt_ = this.rebuildStree();
  }
  return this.rebuilt_;
};


/**
 * Unique id counter for walkers. Needed to regain states on rerendering.
 * @type {number}
 */
sre.AbstractWalker.ID_COUNTER = 0;
sre.AbstractWalker.SRE_ID_ATTR = 'sre-explorer-id';


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
  sre.Walker.setState(this.id, this.primaryId());
  this.generator.end();
  this.toggleActive_();
};


/**
 * @override
 */
sre.AbstractWalker.prototype.getFocus = function(opt_update) {
  if (!this.focus_) {
    this.focus_ = sre.Focus.factory(
      this.rootId, [this.rootId], this.getRebuilt(), this.node);
  }
  if (opt_update) {
    this.updateFocus();
  }
  return /** @type {!sre.Focus} */(this.focus_);
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


sre.AbstractWalker.prototype.isSpeech = function() {
  return this.generator.modality === sre.EnrichMathml.Attribute.SPEECH;
};


/**
 * @override
 */
sre.AbstractWalker.prototype.speech = function() {
  var nodes = this.getFocus().getDomNodes();
  if (!nodes.length) return '';
  var special = this.specialMove();
  if (special !== null) {
    return special;
  }
  switch (this.moved) {
    case sre.Walker.move.DEPTH:
      return this.depth_();
    case sre.Walker.move.SUMMARY:
      return this.summary_();
    case sre.Walker.move.DETAIL:
      return this.detail_();
    default:
      var speech = [];
      var snodes = this.getFocus().getSemanticNodes();
      for (var i = 0, l = nodes.length; i < l; i++) {
        var node = nodes[i];
        var snode = /** @type {!sre.SemanticNode} */(snodes[i]);
        speech.push(node ? this.generator.getSpeech(node, this.getXml()) :
                    sre.SpeechGeneratorUtil.retrieveSpeech(snode));
      }
      return this.mergePrefix_(speech);
  }
};


/**
 * Merges a prefix into a list of speech strings.
 * @param {Array.<string>} speech The speech strings.
 * @param {Array.<string>=} opt_pre A list of strings that should precede the
 *     prefix.
 * @return {string} The merged speech string.
 * @private
 */
sre.AbstractWalker.prototype.mergePrefix_ = function(speech, opt_pre) {
  var pre = opt_pre || [];
  var prefix = this.isSpeech() ? this.prefix_() : '';
  var aural = sre.AuralRendering.getInstance();
  if (prefix) speech.unshift(prefix);
  return aural.finalize(aural.merge(pre.concat(speech)));
};


/**
 * @return {string} The prefix of the currently focused element.
 * @private
 */
sre.AbstractWalker.prototype.prefix_ = function() {
  var nodes = this.getFocus().getDomNodes();
  var snodes = this.getFocus().getSemanticNodes();
  return nodes[0] ? sre.WalkerUtil.getAttribute(
      /** @type {!Node} */(nodes[0]), sre.EnrichMathml.Attribute.PREFIX) :
      sre.SpeechGeneratorUtil.retrievePrefix(snodes[0]);
};


/**
 * @override
 */
sre.AbstractWalker.prototype.move = function(key) {
  var direction = this.keyMapping[key];
  if (!direction) {
    return null;
  }
  var focus = direction();
  if (!focus || focus === this.getFocus()) {
    return false;
  }
  this.setFocus(focus);
  if (this.moved === sre.Walker.move.HOME) {
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
  this.moved = sre.Walker.move.UP;
  return this.getFocus();
};


/**
 * Moves down from the current node if possible.
 * @return {?sre.Focus}
 * @protected
 */
sre.AbstractWalker.prototype.down = function() {
  this.moved = sre.Walker.move.DOWN;
  return this.getFocus();
};


/**
 * Moves left from the current node if possible.
 * @return {?sre.Focus}
 * @protected
 */
sre.AbstractWalker.prototype.left = function() {
  this.moved = sre.Walker.move.LEFT;
  return this.getFocus();
};


/**
 * Moves right from the current node if possible.
 * @return {?sre.Focus}
 * @protected
 */
sre.AbstractWalker.prototype.right = function() {
  this.moved = sre.Walker.move.RIGHT;
  return this.getFocus();
};


/**
 * Stays on the current node and repeats it.
 * @return {?sre.Focus}
 * @protected
 */
sre.AbstractWalker.prototype.repeat = function() {
  this.moved = sre.Walker.move.REPEAT;
  return this.getFocus().clone();
};


/**
 * Makes a depth announcement.
 * @return {?sre.Focus}
 * @protected
 */
sre.AbstractWalker.prototype.depth = function() {
  this.moved = this.isSpeech() ? sre.Walker.move.DEPTH : sre.Walker.move.REPEAT;
  return this.getFocus().clone();
};


/**
 * @return {string} The depth announcement for the currently focused element.
 * @private
 */
sre.AbstractWalker.prototype.depth_ = function() {
  var oldDepth = sre.Grammar.getInstance().getParameter('depth');
  sre.Grammar.getInstance().setParameter('depth', true);
  var primary = this.getFocus().getDomPrimary();
  var expand = (this.expandable(primary) &&
                [sre.Messages.NAVIGATE.EXPANDABLE]) ||
      (this.collapsible(primary) && [sre.Messages.NAVIGATE.COLLAPSIBLE]) || [];
  var level = [sre.AuralRendering.getInstance().markup(
      [new sre.AuditoryDescription({text: sre.Messages.NAVIGATE.LEVEL +
         ' ' + this.getDepth(),
        personality: {}})])];
  var snodes = this.getFocus().getSemanticNodes();
  var prefix = sre.SpeechGeneratorUtil.retrievePrefix(snodes[0]);
  var aural = sre.AuralRendering.getInstance();
  if (prefix) {
    level.push(prefix);
  }
  sre.Grammar.getInstance().setParameter('depth', oldDepth);
  return aural.finalize(aural.merge(level.concat(expand)));
};


/**
 * Moving to the home position.
 * @return {?sre.Focus}
 * @protected
 */
sre.AbstractWalker.prototype.home = function() {
  this.moved = sre.Walker.move.HOME;
  var focus = sre.Focus.factory(
      this.rootId, [this.rootId], this.getRebuilt(), this.node);
  return focus;
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
  return this.getFocus().getSemanticPrimary().id.toString();
};


/**
 * Expands or collapses a node if it is actionable.
 * @return {sre.Focus} New focus element if actionable. O/w old focus.
 */
sre.AbstractWalker.prototype.expand = function() {
  var primary = this.getFocus().getDomPrimary();
  var expandable = this.actionable_(primary);
  if (!expandable) {
    return this.getFocus();
  }
  this.moved = sre.Walker.move.EXPAND;
  expandable.dispatchEvent(new Event('click'));
  return this.getFocus().clone();
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
  var state = sre.Walker.getState(this.id);
  if (!state) return;
  var node = this.getRebuilt().nodeDict[state];
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
    this.setFocus(focus);
  }
  this.moved = sre.Walker.move.ENTER;
};


/**
 * Updates the walker's focus by recomputing the DOM elements.
 */
sre.AbstractWalker.prototype.updateFocus = function() {
  this.setFocus(sre.Focus.factory(
      this.getFocus().getSemanticPrimary().id.toString(),
      this.getFocus().getSemanticNodes().map(x => x.id),
      this.getRebuilt(), this.node));
};


/**
 * Finds the focus on the current level for a given semantic node id.
 * @param {number} id The id number.
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
 * @protected
 */
sre.AbstractWalker.prototype.rebuildStree = function() {
  var rebuilt = new sre.RebuildStree(this.getXml());
  this.rootId = rebuilt.stree.root.id.toString();
  this.generator.setRebuilt(rebuilt);
  this.focus_ = sre.Focus.factory(
    this.rootId, [this.rootId], rebuilt, this.node);
  this.levels = this.initLevels();
  sre.SpeechGeneratorUtil.connectMactions(this.node, this.getXml(), rebuilt.xml);
  return rebuilt;
};


/**
 * Computes the previous level by Returning the id of the parent.
 * @return {?string} The previous level.
 */
sre.AbstractWalker.prototype.previousLevel = function() {
  var dnode = this.getFocus().getDomPrimary();
  return dnode ?
      sre.WalkerUtil.getAttribute(dnode, sre.EnrichMathml.Attribute.PARENT) :
      this.getFocus().getSemanticPrimary().parent.id.toString();
};


/**
 * Computes the next lower level from children and content.
 * @return {!Array.<T>} The next lower level.
 */
sre.AbstractWalker.prototype.nextLevel = function() {
  var dnode = this.getFocus().getDomPrimary();
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
  var snode = this.getRebuilt().nodeDict[this.primaryId()];
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
  return sre.Focus.factory(id, ids, this.getRebuilt(), this.node);
};


/**
 * Voicing a virtual summary.
 * @return {?sre.Focus}
 * @protected
 */
sre.AbstractWalker.prototype.summary = function() {
  this.moved = this.isSpeech() ? sre.Walker.move.SUMMARY : sre.Walker.move.REPEAT;
  return this.getFocus().clone();
};


/**
 * @return {string} The virtual summary of an element.
 * @private
 */
sre.AbstractWalker.prototype.summary_ = function() {
  var sprimary = this.getFocus().getSemanticPrimary();
  var sid = sprimary.id.toString();
  var snode = this.getRebuilt().xml.getAttribute('id') === sid ? this.getRebuilt().xml :
      sre.DomUtil.querySelectorAllByAttrValue(this.getRebuilt().xml, 'id', sid)[0];
  var summary = sre.SpeechGeneratorUtil.retrieveSummary(snode);
  var speech = this.mergePrefix_([summary]);
  return speech;
};


/**
 * Voices details of a collapsed element without expansion.
 * @return {?sre.Focus}
 * @protected
 */
sre.AbstractWalker.prototype.detail = function() {
  this.moved = this.isSpeech() ? sre.Walker.move.DETAIL : sre.Walker.move.REPEAT;
  return this.getFocus().clone();
};


/**
 * @return {string} The virtual detail of a collapsed element.
 * @private
 */
sre.AbstractWalker.prototype.detail_ = function() {
  var sprimary = this.getFocus().getSemanticPrimary();
  var sid = sprimary.id.toString();
  var snode = this.getRebuilt().xml.getAttribute('id') === sid ? this.getRebuilt().xml :
      sre.DomUtil.querySelectorAllByAttrValue(this.getRebuilt().xml, 'id', sid)[0];
  var oldAlt = snode.getAttribute('alternative');
  snode.removeAttribute('alternative');
  var descrs = sre.SpeechGeneratorUtil.computeSpeechWithoutCache(
      /** @type {!Node} */(snode));
  var detail = sre.AuralRendering.getInstance().markup(descrs);
  var speech = this.mergePrefix_([detail]);
  snode.setAttribute('alternative', oldAlt);
  return speech;
};


/**
 * This methods can contain special moves for specialised walkers.
 * @return {?string} The result of the special move.
 * @protected
 */
sre.AbstractWalker.prototype.specialMove = function() {
  return null;
};


// Virtual Cursors:
/**
 * Initialises a new virtual cursor.
 * @param {boolean=} opt_undo Flag specifying if this is an undo jump point.
 * @return {sre.Focus} The new focus.
 */
sre.AbstractWalker.prototype.virtualize = function(opt_undo) {
  this.cursors.push({focus: this.getFocus(), levels: this.levels,
    undo: opt_undo || !this.cursors.length});
  this.levels = this.levels.clone();
  return this.getFocus().clone();
};


/**
 * Returns to previous cursor setting.
 * @return {sre.Focus} The previous focus.
 */
sre.AbstractWalker.prototype.previous = function() {
  var previous = this.cursors.pop();
  if (!previous) {
    return this.getFocus();
  }
  this.levels = previous.levels;
  return previous.focus;
};


/**
 * Undoes a series of virtual cursor generations.
 * @return {sre.Focus} A previous focus.
 */
sre.AbstractWalker.prototype.undo = function() {
  do {
    var previous = this.cursors.pop();
  } while (previous && !previous.undo);
  if (!previous) {
    return this.getFocus();
  }
  this.levels = previous.levels;
  return previous.focus;
};


/**
 * @override
 */
sre.AbstractWalker.prototype.update = function(options) {
  this.generator.setOptions(options);
  sre.System.getInstance().setupEngine(options);
  sre.SpeechGeneratorFactory.generator('Tree').getSpeech(this.node, this.getXml());
};


// Facilities for keyboard driven rules cycling.
// TODO: Refactor this into the speech generators.
sre.AbstractWalker.prototype.nextRules = function() {
  var options = this.generator.getOptions();
  if (options.modality !== 'speech') {
    return this.getFocus();
  }
  // TODO: Check if domains exist for the current locale.
  sre.Engine.DOMAIN_TO_STYLES[options.domain] = options.style;
  options.domain = (options.domain === 'mathspeak') ? 'clearspeak' : 'mathspeak';
  options.style = sre.Engine.DOMAIN_TO_STYLES[options.domain];
  this.update(options);
  this.moved = sre.Walker.move.REPEAT;
  return this.getFocus().clone();
};


sre.AbstractWalker.prototype.nextStyle = function(domain, style) {
  if (domain === 'mathspeak') {
    var styles = ['default', 'brief', 'sbrief'];
    var index = styles.indexOf(style);
    if (index === -1) {
      return style;
    }
    return (index >= styles.length - 1) ? styles[0] : styles[index + 1];
  }
  if (domain === 'clearspeak') {
    var prefs = sre.ClearspeakPreferences.getLocalePreferences();
    var loc = prefs['en']; // TODO: use correct locale.
    if (!loc) {
      return 'default';  // TODO: return the previous one?
    }
    var smart = sre.ClearspeakPreferences.relevantPreferences(
        this.getFocus().getSemanticPrimary());
    var current = sre.ClearspeakPreferences.findPreference(style, smart);
    var options = loc[smart].map(function(x) {
      return x.split('_')[1];
    });
    var index = options.indexOf(current);
    if (index === -1) {
      return style;
    }
    var next = (index >= options.length - 1) ? options[0] : options[index + 1];
    var result = sre.ClearspeakPreferences.addPreference(style, smart, next);
    return result;
  }
  return style;
};


sre.AbstractWalker.prototype.previousRules = function() {
  var options = this.generator.getOptions();
  if (options.modality !== 'speech') {
    return this.getFocus();
  }
  options.style = this.nextStyle(options.domain, options.style);
  this.update(options);
  this.moved = sre.Walker.move.REPEAT;
  return this.getFocus().clone();
};

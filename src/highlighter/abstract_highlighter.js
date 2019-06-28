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
 * @fileoverview Abstract class implementing highlighters.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.AbstractHighlighter');

goog.require('sre.ColorPicker');
goog.require('sre.EnrichMathml.Attribute');
goog.require('sre.Highlighter');



/**
 * @constructor
 * @implements {sre.Highlighter}
 */
sre.AbstractHighlighter = function() {
  /**
   * List of currently highlighted nodes and their original background color.
   * @type {!Array.<Array.<{node: !Node, opacity: (undefined|string),
   *          background: (undefined|string), foreground: (undefined|string)}
   *         >>}
   * @private
   */
  this.currentHighlights_ = [];

  /**
   * @type {sre.ColorPicker}
   * @protected
   */
  this.color = null;

  /**
   * @type {string}
   * @protected
   */
  this.mactionName = '';

  /**
   * @type {!Object.<string>}
   * @private
   */
  this.state_ = {};

};


/**
 * @type {string}
 */
sre.AbstractHighlighter.ATTR = 'sre-highlight';

/**
 * @override
 */
sre.AbstractHighlighter.prototype.highlight = function(nodes) {
  this.currentHighlights_.push(nodes.map(
      goog.bind(function(node) {
        node.setAttribute(sre.AbstractHighlighter.ATTR, true);
        return this.highlightNode(node);
      }, this)));
};


/**
 * Highlights a single node.
 * @param {!Node} node The node to be highlighted.
 * @return {{node: !Node, opacity: (undefined|string), background:
 *          (undefined|string), foreground: (undefined|string)} } The old node
 *          information.
 * @protected
 */
sre.AbstractHighlighter.prototype.highlightNode = goog.abstractMethod;


/**
 * @override
 */
sre.AbstractHighlighter.prototype.highlightAll = function(node) {
  var mactions = this.getMactionNodes(node);
  for (var i = 0, maction; maction = mactions[i]; i++) {
    this.highlight([maction]);
  }
};


/**
 * @override
 */
sre.AbstractHighlighter.prototype.unhighlight = function() {
  var nodes = this.currentHighlights_.pop();
  if (!nodes) return;
  nodes.forEach(
      goog.bind(function(node) {
        node.node.removeAttribute(sre.AbstractHighlighter.ATTR);
        return this.unhighlightNode(node);
      }, this));
};


/**
 * Unhighlights a single node.
 * @param {{node: !Node, opacity: (undefined|string),
 *          background: (undefined|string), foreground: (undefined|string)}
 *         } info The info for the
 *     node to be unhighlighted.
 * @protected
 */
sre.AbstractHighlighter.prototype.unhighlightNode = goog.abstractMethod;


/**
 * @override
 */
sre.AbstractHighlighter.prototype.unhighlightAll = function() {
  while (this.currentHighlights_.length > 0) {
    this.unhighlight();
  }
};


/**
 * @override
 */
sre.AbstractHighlighter.prototype.setColor = function(color) {
  this.color = color;
};


/**
 * Turns the current color into a string representation.
 * @return {sre.ColorPicker.String} The color string, by default as rgba.
 * @protected
 */
sre.AbstractHighlighter.prototype.colorString = function() {
  return this.color.rgba();
};


/**
 * @override
 */
sre.AbstractHighlighter.prototype.addEvents = function(node, events) {
  var mactions = this.getMactionNodes(node);
  for (var i = 0, maction; maction = mactions[i]; i++) {
    for (var event in events) {
      maction.addEventListener(event, events[event]);
    }
  }
};


/**
 * Returns the maction sub nodes of a given node.
 * @param {!Node} node The root node.
 * @return {NodeList|Array<Node>} The list of maction sub nodes.
 */
sre.AbstractHighlighter.prototype.getMactionNodes = function(node) {
  return node.getElementsByClassName(this.mactionName);
};


/**
 * Predicate to check if a node is an maction node.
 * @param {!Node} node A DOM node.
 * @return {boolean} True if the node is an maction node.
 */
sre.AbstractHighlighter.prototype.isMactionNode = function(node) {
  var className = node.className || node.getAttribute('class');
  return className ? className.match(new RegExp(this.mactionName)) : false;
};


/**
 * Removes a state for a particular node.
 * @param {string} id A node id.
 */
sre.AbstractHighlighter.prototype.resetState = function(id) {
  delete(this.state_[id]);
};


/**
 * Sets a state value for a particular node.
 * @param {string} id A node id.
 * @param {string} value The state value.
 */
sre.AbstractHighlighter.prototype.setState = function(id, value) {
  this.state_[id] = value;
};


/**
 * Returns the state a particular node if it exists.
 * @param {string} id The node id.
 * @return {string} The state value.
 */
sre.AbstractHighlighter.prototype.getState = function(id) {
  return this.state_[id];
};


sre.AbstractHighlighter.prototype.colorizeAll = function(node) {
  var allNodes = sre.XpathUtil.evalXPath(
    './/*[@' + sre.EnrichMathml.Attribute.ID + ']', node);
  allNodes.forEach(goog.bind(function(x) {this.colorize(x);}, this));
};


sre.AbstractHighlighter.prototype.uncolorizeAll = function(node) {
  var allNodes = sre.XpathUtil.evalXPath(
    './/*[@' + sre.EnrichMathml.Attribute.ID + ']', node);
  allNodes.forEach(goog.bind(function(x) {this.uncolorize(x);}, this));
};


// TODO: Generalise this to use the highlighter method and background.
sre.AbstractHighlighter.prototype.colorize = function(node) {
  var fore = sre.EnrichMathml.addPrefix('foreground');
  if (node.hasAttribute(fore)) {
    node.setAttribute(fore + '-old', node.style.color);
    node.style.color = node.getAttribute(fore);
  }
};


sre.AbstractHighlighter.prototype.uncolorize = function(node) {
  var fore = sre.EnrichMathml.addPrefix('foreground') + '-old';
  if (node.hasAttribute(fore)) {
    node.style.color = node.getAttribute(fore);
  }
};

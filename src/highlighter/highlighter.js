// Copyright 2015-21 Volker Sorge
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
 * @fileoverview Interface for element highlighters.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.Highlighter');

goog.require('sre.ColorPicker');



/**
 * @interface
 */
sre.Highlighter = function() { };


/**
 * Sets highlighting on a node.
 * @param {!Array<Node>} nodes The node to highlight.
 */
sre.Highlighter.prototype.highlight = function(nodes) { };


/**
 * Unhighlights the last node that highlighted.
 */
sre.Highlighter.prototype.unhighlight = function() { };


/**
 * Sets highlighting on all maction-like sub nodes of the given node.
 * @param {!Node} node The node to highlight.
 */
sre.Highlighter.prototype.highlightAll = function(node) { };


/**
 * Unhighlights all currently highlighted nodes.
 */
sre.Highlighter.prototype.unhighlightAll = function() { };


/**
 * Sets of the color the highlighter is using.
 * @param {sre.ColorPicker} color The new color to use.
 */
sre.Highlighter.prototype.setColor = function(color) { };


/**
 * Adds events to the nodes that can by highlighted.
 * @param {!Node} node The base node for highlighting.
 * @param {Object.<Function>} events The events to attach given as event
 *     type and function to execute
 */
sre.Highlighter.prototype.addEvents = function(node, events) { };

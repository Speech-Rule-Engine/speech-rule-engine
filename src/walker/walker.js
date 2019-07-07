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
 * @fileoverview Interface for Math Element Walkers.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.Walker');

goog.require('sre.EventUtil.KeyCode');
goog.require('sre.Focus');



/**
 * @interface
 */
sre.Walker = function() {};


/**
 * Indicator if the walker is active.
 * @return {boolean} True if walker is active.
 */
sre.Walker.prototype.isActive = function() {};


/**
 * Activates the walker.
 */
sre.Walker.prototype.activate = function() {};


/**
 * Deactivates the walker.
 */
sre.Walker.prototype.deactivate = function() {};


/**
 * Computes the speech string of the currently examined node.
 * @return {string} The current speech string.
 */
sre.Walker.prototype.speech = function() {};


/**
 * The node the walker currently sits on.
 * @param {boolean=} opt_update Flag indicating if the state should be
 *     updated. This can be useful if the underlying DOM elements might have
 *     changed.
 * @return {!sre.Focus} The current focus.
 */
sre.Walker.prototype.getFocus = function(opt_update) {};


/**
 * @param {!sre.Focus} focus The new focus.
 */
sre.Walker.prototype.setFocus = function(focus) {};


/**
 * Returns the current depth of the walker, starting at 0.
 * @return {number} The current depth of the walker.
 */
sre.Walker.prototype.getDepth = function() {};


/**
 * Performs the next move depending on the key event.
 * @param {!sre.EventUtil.KeyCode} key The input key code.
 * @return {?boolean} True if the move was successful, false, if it was not, and
 *     null if there was no move of the key.
 */
sre.Walker.prototype.move = function(key) {};


/**
 * Enumerator for different types of moves.
 * @enum {string}
 */
sre.Walker.move = {
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
  DETAIL: 'detail',
  ROW: 'row',
  CELL: 'cell'
};


/**
 * @typedef {{focus: !sre.Focus, levels: !sre.Levels, undo: boolean}}
 */
sre.Walker.Cursor;


/**
 * @type {!Object.<string>}
 * @private
 */
sre.Walker.STATE_ = {};

/**
 * Removes a state for a particular node.
 * @param {string} id A node id.
 */
sre.Walker.resetState = function(id) {
  delete(sre.Walker.STATE_[id]);
};


/**
 * Sets a state value for a particular node.
 * @param {string} id A node id.
 * @param {string} value The state value.
 */
sre.Walker.setState = function(id, value) {
  sre.Walker.STATE_[id] = value;
};


/**
 * Returns the state a particular node if it exists.
 * @param {string} id The node id.
 * @return {string} The state value.
 */
sre.Walker.getState = function(id) {
  console.log(sre.Walker.STATE_);
  return sre.Walker.STATE_[id];
};

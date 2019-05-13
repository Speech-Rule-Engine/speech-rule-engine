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
 * @fileoverview Utility functions for events.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.EventUtil.Event');
goog.provide('sre.EventUtil.EventType');
goog.provide('sre.EventUtil.KeyCode');


/**
 * Key codes.
 * @enum {number}
 */
sre.EventUtil.KeyCode = {
  ENTER: 13,
  ESC: 27,
  SPACE: 32,
  PAGE_UP: 33,    // also NUM_NORTH_EAST
  PAGE_DOWN: 34,  // also NUM_SOUTH_EAST
  END: 35,        // also NUM_SOUTH_WEST
  HOME: 36,       // also NUM_NORTH_WEST
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  TAB: 9,
  LESS: 188,
  GREATER: 190,
  // Numeric
  0: 48,
  1: 49,
  2: 50,
  3: 51,
  4: 52,
  5: 53,
  6: 54,
  7: 55,
  8: 56,
  9: 57,
  // Alpha
  A: 65,
  B: 66,
  C: 67,
  D: 68,
  E: 69,
  F: 70,
  G: 71,
  H: 72,
  I: 73,
  J: 74,
  K: 75,
  L: 76,
  M: 77,
  N: 78,
  O: 79,
  P: 80,
  Q: 81,
  R: 82,
  S: 83,
  T: 84,
  U: 85,
  V: 86,
  W: 87,
  X: 88,
  Y: 89,
  Z: 90
};


/**
 * Constants for event names.
 * @enum {string}
 */
sre.EventUtil.EventType = {
  // Mouse events
  CLICK: 'click',
  DBLCLICK: 'dblclick',
  MOUSEDOWN: 'mousedown',
  MOUSEUP: 'mouseup',
  MOUSEOVER: 'mouseover',
  MOUSEOUT: 'mouseout',
  MOUSEMOVE: 'mousemove',
  SELECTSTART: 'selectstart', // IE, Safari, Chrome

  // Key events
  KEYPRESS: 'keypress',
  KEYDOWN: 'keydown',
  KEYUP: 'keyup',

  // WebKit touch events.
  TOUCHSTART: 'touchstart',
  TOUCHMOVE: 'touchmove',
  TOUCHEND: 'touchend',
  TOUCHCANCEL: 'touchcancel'

};



/**
 * The type of events.
 * @param {Node} src The target element of the event.
 * @param {sre.EventUtil.EventType} type The event type.
 * @param {function(Event)} callback The event handler function.
 * @constructor
 */
sre.EventUtil.Event = function(src, type, callback) {
  this.src = src;
  this.type = type;
  this.callback = callback;
};


/**
 * Registers the event listener with its source element.
 */
sre.EventUtil.Event.prototype.add = function() {
  this.src.addEventListener(this.type, this.callback);
};


/**
 * Removes the event listener from the source element.
 */
sre.EventUtil.Event.prototype.remove = function() {
  this.src.removeEventListener(this.type, this.callback);
};

//
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
 * @fileoverview Utility functions for events.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */


/**
 * Key codes.
 */
export enum KeyCode {
  ENTER = 13,
  ESC = 27,
  SPACE = 32,
  PAGE_UP,
  // also NUM_NORTH_EAST
  PAGE_DOWN,
  // also NUM_SOUTH_EAST
  END,
  // also NUM_SOUTH_WEST
  HOME,
  // also NUM_NORTH_WEST
  LEFT,
  UP,
  RIGHT,
  DOWN,
  TAB = 9,
  LESS = 188,
  GREATER = 190,
  DASH = 189,
  // Numeric
  0 = 48,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  // Alpha
  A = 65,
  B,
  C,
  D,
  E,
  F,
  G,
  H,
  I,
  J,
  K,
  L,
  M,
  N,
  O,
  P,
  Q,
  R,
  S,
  T,
  U,
  V,
  W,
  X,
  Y,
  Z
}


/**
 * Key codes to move names.
 */
sre.EventUtil.Move = function() {
  let ret = {};
  for (let key in KeyCode) {
    ret[KeyCode[key]] = key;
  }
  return ret;
}();


/**
 * Constants for event names.
 */
export enum EventType {
  // Mouse events
  CLICK = 'click',
  DBLCLICK = 'dblclick',
  MOUSEDOWN = 'mousedown',
  MOUSEUP = 'mouseup',
  MOUSEOVER = 'mouseover',
  MOUSEOUT = 'mouseout',
  MOUSEMOVE = 'mousemove',
  SELECTSTART = 'selectstart',
  // IE, Safari, Chrome

  // Key events
  KEYPRESS = 'keypress',
  KEYDOWN = 'keydown',
  KEYUP = 'keyup',

  // WebKit touch events.
  TOUCHSTART = 'touchstart',
  TOUCHMOVE = 'touchmove',
  TOUCHEND = 'touchend',
  TOUCHCANCEL = 'touchcancel'
}



/**
 * The type of events.
 * @param src The target element of the event.
 * @param type The event type.
 * @param callback The event handler function.
 */
export class Event {
  src: any;
  type: any;
  callback: any;
  constructor(src: Node, type: EventType, callback: (p1: Event) => any) {
    this.src = src;
    this.type = type;
    this.callback = callback;
  }


  /**
   * Registers the event listener with its source element.
   */
  add() {
    this.src.addEventListener(this.type, this.callback);
  }


  /**
   * Removes the event listener from the source element.
   */
  remove() {
    this.src.removeEventListener(this.type, this.callback);
  }
}

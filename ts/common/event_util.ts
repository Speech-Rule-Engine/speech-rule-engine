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
  PAGE_UP = 33,    // also NUM_NORTH_EAST
  PAGE_DOWN = 34,  // also NUM_SOUTH_EAST
  END = 35,        // also NUM_SOUTH_WEST
  HOME = 36,       // also NUM_NORTH_WEST
  LEFT = 37,
  UP = 38,
  RIGHT = 39,
  DOWN = 40,
  TAB = 9,
  LESS = 188,
  GREATER = 190,
  DASH = 189,
  // Numeric
  ZERO = 48,
  ONE = 49,
  TWO = 50,
  THREE = 51,
  FOUR = 52,
  FIVE = 53,
  SIX = 54,
  SEVEN = 55,
  EIGHT = 56,
  NINE = 57,
  // Alpha
  A = 65,
  B = 66,
  C = 67,
  D = 68,
  E = 69,
  F = 70,
  G = 71,
  H = 72,
  I = 73,
  J = 74,
  K = 75,
  L = 76,
  M = 77,
  N = 78,
  O = 79,
  P = 80,
  Q = 81,
  R = 82,
  S = 83,
  T = 84,
  U = 85,
  V = 86,
  W = 87,
  X = 88,
  Y = 89,
  Z = 90
}


/**
 * Key codes to move names.
 */
export const Move = new Map([
  [13, 'ENTER'],
  [27, 'ESC'],
  [32, 'SPACE'],
  [33, 'PAGE_UP'],
  [34, 'PAGE_DOWN'],
  [35, 'END'],
  [36, 'HOME'],
  [37, 'LEFT'],
  [38, 'UP'],
  [39, 'RIGHT'],
  [40, 'DOWN'],
  [9, 'TAB'],
  [188, 'LESS'],
  [190, 'GREATER'],
  [189, 'DASH'],
  [48, 'ZERO'],
  [49, 'ONE'],
  [50, 'TWO'],
  [51, 'THREE'],
  [52, 'FOUR'],
  [53, 'FIVE'],
  [54, 'SIX'],
  [55, 'SEVEN'],
  [56, 'EIGHT'],
  [57, 'NINE'],
  [65, 'A'],
  [66, 'B'],
  [67, 'C'],
  [68, 'D'],
  [69, 'E'],
  [70, 'F'],
  [71, 'G'],
  [72, 'H'],
  [73, 'I'],
  [74, 'J'],
  [75, 'K'],
  [76, 'L'],
  [77, 'M'],
  [78, 'N'],
  [79, 'O'],
  [80, 'P'],
  [81, 'Q'],
  [82, 'R'],
  [83, 'S'],
  [84, 'T'],
  [85, 'U'],
  [86, 'V'],
  [87, 'W'],
  [88, 'X'],
  [89, 'Y'],
  [90, 'Z']
]);


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



export class Event {

  /**
   * The type of events.
   * @param src The target element of the event.
   * @param type The event type.
   * @param callback The event handler function.
   */
  constructor(public src: Node, public type: EventType,
              public callback: EventListener) {
  }


  /**
   * Registers the event listener with its source element.
   */
  public add() {
    this.src.addEventListener(this.type, this.callback);
  }


  /**
   * Removes the event listener from the source element.
   */
  public remove() {
    this.src.removeEventListener(this.type, this.callback);
  }
}

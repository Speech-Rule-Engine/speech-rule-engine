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
 * @file Interface for Math Element Walkers.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import { KeyCode } from '../common/event_util.js';
import { AxisMap } from '../rule_engine/dynamic_cstr.js';

import { Focus } from './focus.js';
import { RebuildStree } from './rebuild_stree.js';

export interface Walker {
  modifier: boolean;

  /**
   * Indicator if the walker is active.
   *
   * @returns True if walker is active.
   */
  isActive(): boolean;

  /**
   * Activates the walker.
   */
  activate(): void;

  /**
   * Deactivates the walker.
   */
  deactivate(): void;

  /**
   * Computes the speech string of the currently examined node.
   *
   * @returns The current speech string.
   */
  speech(): string;

  /**
   * @returns The XML element.
   */
  getXml(): Element;

  /**
   * @returns The rebuilt semantic tree for the walker.
   */
  getRebuilt(): RebuildStree;

  /**
   * The node the walker currently sits on.
   *
   * @param opt_update Flag indicating if the state should be
   *     updated. This can be useful if the underlying DOM elements might have
   *     changed.
   * @returns The current focus.
   */
  getFocus(opt_update?: boolean): Focus;

  /**
   * @param focus The new focus.
   */
  setFocus(focus: Focus): void;

  /**
   * Returns the current depth of the walker, starting at 0.
   *
   * @returns The current depth of the walker.
   */
  getDepth(): number;

  /**
   * Performs the next move depending on the key event.
   *
   * @param key The input key code.
   * @returns True if the move was successful, false, if it was not, and
   *     null if there was no move of the key.
   */
  move(key: KeyCode): boolean | null;

  /**
   * Updates speech in case of option changes.
   *
   * @param options The dynamic constraint.
   */
  update(options: AxisMap): void;

  /**
   * Refocuses in case levels have been altered outside the walker's control.
   */
  refocus(): void;
}

/**
 * Enumerator for different types of moves.
 */
export enum WalkerMoves {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right',
  REPEAT = 'repeat',
  DEPTH = 'depth',
  ENTER = 'enter',
  EXPAND = 'expand',
  HOME = 'home',
  SUMMARY = 'summary',
  DETAIL = 'detail',
  ROW = 'row',
  CELL = 'cell'
}

export class WalkerState {
  // TODO (ts): Replace with a Map.
  private static STATE: { [id: string]: string } = {};

  /**
   * Removes a state for a particular node.
   *
   * @param id A node id.
   */
  public static resetState(id: string) {
    delete WalkerState.STATE[id];
  }

  /**
   * Sets a state value for a particular node.
   *
   * @param id A node id.
   * @param value The state value.
   */
  public static setState(id: string, value: string) {
    WalkerState.STATE[id] = value;
  }

  /**
   * Returns the state a particular node if it exists.
   *
   * @param id The node id.
   * @returns The state value.
   */
  public static getState(id: string): string {
    return WalkerState.STATE[id];
  }
}

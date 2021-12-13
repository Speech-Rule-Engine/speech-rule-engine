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
 * @fileoverview Interface for element highlighters.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */


import {ColorPicker, StringColor} from './color_picker';


export interface Highlighter {
  /**
   * Sets highlighting on a node.
   * @param nodes The node to highlight.
   */
  highlight(nodes: HTMLElement[]): void;


  /**
   * Unhighlights the last node that highlighted.
   */
  unhighlight(): void;


  /**
   * Sets highlighting on all maction-like sub nodes of the given node.
   * @param node The node to highlight.
   */
  highlightAll(node: HTMLElement): void;


  /**
   * Unhighlights all currently highlighted nodes.
   */
  unhighlightAll(): void;


  /**
   * Predicate to check if a node is an maction node.
   * @param node A DOM node.
   * @return True if the node is an maction node.
   */
  isMactionNode(node: Element): boolean;

  /**
   * Sets of the color the highlighter is using.
   * @param color The new color to use.
   */
  setColor(color: ColorPicker): void;


  /**
   * Turns the current color into a string representation.
   * @return The color string, by default as rgba.
   */
  colorString(): StringColor;


  /**
   * Adds events to the nodes that can by highlighted.
   * @param node The base node for highlighting.
   * @param events The events to attach given as event
   *     type and function to execute
   */
  addEvents(node: HTMLElement, events: {[key: string]: EventListener}): void;
}

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
 * @file Abstract class implementing highlighters.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import * as XpathUtil from '../common/xpath_util.js';
import { addPrefix, Attribute } from '../enrich_mathml/enrich_attr.js';
import { ColorPicker, StringColor } from './color_picker.js';
import { Highlighter } from './highlighter.js';

/**
 * Highlight information consisting of node, opacity, fore and background color.
 */
export interface Highlight {
  node: HTMLElement;
  opacity?: string;
  background?: string;
  foreground?: string;
  // The following is for the CSS highlighter
  box?: HTMLElement;
  position?: string;
}

let counter = 0;

export abstract class AbstractHighlighter implements Highlighter {
  public counter = counter++;

  /**
   * The Attribute for marking highlighted nodes.
   */
  protected ATTR = 'sre-highlight-' + this.counter.toString();

  /**
   * The color picker.
   */
  protected color: ColorPicker = null;

  /**
   * The maction name/class for a highlighter.
   */
  protected mactionName = '';

  /**
   * List of currently highlighted nodes and their original background color.
   */
  private currentHighlights: Highlight[][] = [];

  /**
   * Highlights a single node.
   *
   * @param node The node to be highlighted.
   * @returns The old node information.
   */
  protected abstract highlightNode(node: HTMLElement): Highlight;

  /**
   * Unhighlights a single node.
   *
   * @param highlight The highlight info for the node to be unhighlighted.
   */
  protected abstract unhighlightNode(highlight: Highlight): void;

  /**
   * @override
   */
  public highlight(nodes: HTMLElement[]) {
    this.currentHighlights.push(
      nodes.map((node) => {
        const info = this.highlightNode(node);
        this.setHighlighted(node);
        return info;
      })
    );
  }

  /**
   * @override
   */
  public highlightAll(node: HTMLElement) {
    const mactions = this.getMactionNodes(node);
    for (let i = 0, maction; (maction = mactions[i]); i++) {
      this.highlight([maction]);
    }
  }

  /**
   * @override
   */
  public unhighlight() {
    const nodes = this.currentHighlights.pop();
    if (!nodes) {
      return;
    }
    nodes.forEach((highlight: Highlight) => {
      if (this.isHighlighted(highlight.node)) {
        this.unhighlightNode(highlight);
        this.unsetHighlighted(highlight.node);
      }
    });
  }

  /**
   * @override
   */
  public unhighlightAll() {
    while (this.currentHighlights.length > 0) {
      this.unhighlight();
    }
  }

  /**
   * @override
   */
  public setColor(color: ColorPicker) {
    this.color = color;
  }

  /**
   * @override
   */
  public colorString(): StringColor {
    return this.color.rgba();
  }

  /**
   * @override
   */
  public addEvents(
    node: HTMLElement,
    events: { [key: string]: EventListener }
  ) {
    const mactions = this.getMactionNodes(node);
    for (let i = 0, maction; (maction = mactions[i]); i++) {
      for (const [key, event] of Object.entries(events)) {
        maction.addEventListener(key, event);
      }
    }
  }

  /**
   * Returns the maction sub nodes of a given node.
   *
   * @param node The root node.
   * @returns The list of maction sub nodes.
   */
  public getMactionNodes(node: HTMLElement): HTMLElement[] {
    return Array.from(
      node.getElementsByClassName(this.mactionName)
    ) as HTMLElement[];
  }

  /**
   * @override
   */
  public isMactionNode(node: Element): boolean {
    const className = node.className || node.getAttribute('class');
    return className ? !!className.match(new RegExp(this.mactionName)) : false;
  }

  /**
   * Check if a node is already highlighted.
   *
   * @param node The node.
   * @returns True if already highlighted.
   */
  public isHighlighted(node: HTMLElement): boolean {
    return node.hasAttribute(this.ATTR);
  }

  /**
   * Sets the indicator attribute that node is already highlighted.
   *
   * @param node The node.
   */
  public setHighlighted(node: HTMLElement) {
    node.setAttribute(this.ATTR, 'true');
  }

  /**
   * Removes the indicator attribute that node is already highlighted.
   *
   * @param node The node.
   */
  public unsetHighlighted(node: HTMLElement) {
    node.removeAttribute(this.ATTR);
  }

  /**
   * Tree colorization method for all sub-expressions.
   *
   * @param node The node.
   */
  public colorizeAll(node: HTMLElement) {
    // The following solves the Firefox xpath issue!
    XpathUtil.updateEvaluator(node);
    const allNodes = XpathUtil.evalXPath(`.//*[@${Attribute.ID}]`, node);
    allNodes.forEach((x: Element) => this.colorize(x as HTMLElement));
  }

  /**
   * Removes tree colorization.
   *
   * @param node The node.
   */
  public uncolorizeAll(node: HTMLElement) {
    const allNodes = XpathUtil.evalXPath(`.//*[@${Attribute.ID}]`, node);
    allNodes.forEach((x) => this.uncolorize(x as HTMLElement));
  }

  /**
   * Tree colors a single node.
   *
   * @param node The node.
   */
  // TODO: Generalise this to use the highlighter method and background.
  public colorize(node: HTMLElement) {
    const fore = addPrefix('foreground');
    if (node.hasAttribute(fore)) {
      node.setAttribute(fore + '-old', node.style.color);
      node.style.color = node.getAttribute(fore);
    }
  }

  /**
   * Removes tree coloring from a single node.
   *
   * @param node The node.
   */
  public uncolorize(node: HTMLElement) {
    const fore = addPrefix('foreground') + '-old';
    if (node.hasAttribute(fore)) {
      node.style.color = node.getAttribute(fore);
    }
  }
}

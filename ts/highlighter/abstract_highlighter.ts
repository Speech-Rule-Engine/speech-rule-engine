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
 * @fileoverview Abstract class implementing highlighters.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */


import * as XpathUtil from '../common/xpath_util';
import * as EnrichMathml from '../enrich_mathml/enrich_mathml';
import {ColorPicker, StringColor} from './color_picker';
import {Highlighter} from './highlighter';


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

export abstract class AbstractHighlighter implements Highlighter {

  /**
   * The Attribute for marking highlighted nodes.
   */
  protected static ATTR: string = 'sre-highlight';

  /**
   * The color picker.
   */
  protected color: ColorPicker = null;

  /**
   * The maction name/class for a highlighter.
   */
  protected mactionName: string = '';

  /**
   * List of currently highlighted nodes and their original background color.
   */
  private currentHighlights: Highlight[][] = [];


  /**
   * Highlights a single node.
   *
   * @param node The node to be highlighted.
   * @return The old node information.
   */
  protected abstract highlightNode(node: HTMLElement): Highlight;


  /**
   * Unhighlights a single node.
   * @param highlight The highlight info for the node to be unhighlighted.
   */
  protected abstract unhighlightNode(highlight: Highlight): void;

  /**
   * @override
   */
  public highlight(nodes: HTMLElement[]) {
    this.currentHighlights.push(
      nodes.map((node) => {
        let info = this.highlightNode(node);
        this.setHighlighted(node);
        return info;
      }));
  }


  /**
   * @override
   */
  public highlightAll(node: HTMLElement) {
    let mactions = this.getMactionNodes(node);
    for (let i = 0, maction; maction = mactions[i]; i++) {
      this.highlight([maction]);
    }
  }


  /**
   * @override
   */
  public unhighlight() {
    let nodes = this.currentHighlights.pop();
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
   * Turns the current color into a string representation.
   * @return The color string, by default as rgba.
   */
  protected colorString(): StringColor {
    return this.color.rgba();
  }


  /**
   * @override
   */
  public addEvents(node: HTMLElement, events: {[key: string]: EventListener}) {
    let mactions = this.getMactionNodes(node);
    for (let i = 0, maction; maction = mactions[i]; i++) {
      for (let event in events) {
        maction.addEventListener(event, events[event]);
      }
    }
  }


  /**
   * Returns the maction sub nodes of a given node.
   * @param node The root node.
   * @return The list of maction sub nodes.
   */
  public getMactionNodes(node: HTMLElement): HTMLElement[] {
    return Array.from(
      node.getElementsByClassName(this.mactionName)) as HTMLElement[];
  }


  /**
   * Predicate to check if a node is an maction node.
   * @param node A DOM node.
   * @return True if the node is an maction node.
   */
  public isMactionNode(node: HTMLElement): boolean {
    let className = node.className || node.getAttribute('class');
    return className ? !!className.match(new RegExp(this.mactionName)) : false;
  }


  /**
   * Check if a node is already highlighted.
   * @param node The node.
   * @return True if already highlighted.
   */
  public isHighlighted(node: HTMLElement): boolean {
    return node.hasAttribute(AbstractHighlighter.ATTR);
  }


  /**
   * Sets the indicator attribute that node is already highlighted.
   * @param node The node.
   */
  public setHighlighted(node: HTMLElement) {
    node.setAttribute(AbstractHighlighter.ATTR, 'true');
  }


  /**
   * Removes the indicator attribute that node is already highlighted.
   * @param node The node.
   */
  public unsetHighlighted(node: HTMLElement) {
    node.removeAttribute(AbstractHighlighter.ATTR);
  }


  /**
   * Tree colorization method for all sub-expressions.
   * @param node The node.
   */
  public colorizeAll(node: HTMLElement) {
    let allNodes = XpathUtil.evalXPath(
        `.//*[@${EnrichMathml.Attribute.ID}]`, node);
    allNodes.forEach(x => this.colorize(x as HTMLElement));
  }

  /**
   * Removes tree colorization.
   * @param node The node.
   */
  public uncolorizeAll(node: HTMLElement) {
    let allNodes = XpathUtil.evalXPath(
        `.//*[@${EnrichMathml.Attribute.ID}]`, node);
    allNodes.forEach(x => this.uncolorize(x as HTMLElement));
  }

  /**
   * Tree colors a single node.
   * @param node The node.
   */
  // TODO: Generalise this to use the highlighter method and background.
  public colorize(node: HTMLElement) {
    let fore = EnrichMathml.addPrefix('foreground');
    if (node.hasAttribute(fore)) {
      node.setAttribute(fore + '-old', node.style.color);
      node.style.color = node.getAttribute(fore);
    }
  }


  /**
   * Removes tree coloring from a single node.
   * @param node The node.
   */
  public uncolorize(node: HTMLElement) {
    let fore = EnrichMathml.addPrefix('foreground') + '-old';
    if (node.hasAttribute(fore)) {
      node.style.color = node.getAttribute(fore);
    }
  }
}

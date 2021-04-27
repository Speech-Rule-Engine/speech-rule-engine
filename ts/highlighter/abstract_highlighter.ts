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


import {Attribute} from '../enrich_mathml/enrich_mathml';

import {ColorPicker} from './color_picker';
import {Highlighter} from './highlighter';



export class AbstractHighlighter implements Highlighter {
  static ATTR: string = 'sre-highlight';


  protected highlightNode: any;


  protected unhighlightNode: any;
  /**
   * List of currently highlighted nodes and their original background color.
   */
  private currentHighlights_:
      {node: Node,
       opacity?: string,
       background?: string,
       foreground?: string}[][] = [];

  protected color: ColorPicker = null;

  protected mactionName: string = '';


  /**
   * @override
   */
  highlight(nodes) {
    this.currentHighlights_.push(nodes.map(goog.bind(function(node) {
      let info = this.highlightNode(node);
      this.setHighlighted(node);
      return info;
    }, this)));
  }


  /**
   * @override
   */
  highlightAll(node) {
    let mactions = this.getMactionNodes(node);
    for (let i = 0, maction; maction = mactions[i]; i++) {
      this.highlight([maction]);
    }
  }


  /**
   * @override
   */
  unhighlight() {
    let nodes = this.currentHighlights_.pop();
    if (!nodes) {
      return;
    }
    nodes.forEach(goog.bind(function(node) {
      if (this.isHighlighted(node.node)) {
        this.unhighlightNode(node);
        this.unsetHighlighted(node.node);
      }
    }, this));
  }


  /**
   * @override
   */
  unhighlightAll() {
    while (this.currentHighlights_.length > 0) {
      this.unhighlight();
    }
  }


  /**
   * @override
   */
  setColor(color) {
    this.color = color;
  }


  /**
   * Turns the current color into a string representation.
   * @return The color string, by default as rgba.
   */
  protected colorString(): ColorPicker.String {
    return this.color.rgba();
  }


  /**
   * @override
   */
  addEvents(node, events) {
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
  getMactionNodes(node: Node): NodeList|Node[] {
    return node.getElementsByClassName(this.mactionName);
  }


  /**
   * Predicate to check if a node is an maction node.
   * @param node A DOM node.
   * @return True if the node is an maction node.
   */
  isMactionNode(node: Node): boolean {
    let className = node.className || node.getAttribute('class');
    return className ? className.match(new RegExp(this.mactionName)) : false;
  }


  /**
   * Check if a node is already highlighted.
   * @param node The node.
   * @return True if already highlighted.
   */
  isHighlighted(node: Node): boolean {
    return node.hasAttribute(AbstractHighlighter.ATTR);
  }


  /**
   * Sets the indicator attribute that node is already highlighted.
   * @param node The node.
   */
  setHighlighted(node: Node) {
    node.setAttribute(AbstractHighlighter.ATTR, true);
  }


  /**
   * Removes the indicator attribute that node is already highlighted.
   * @param node The node.
   */
  unsetHighlighted(node: Node) {
    node.removeAttribute(AbstractHighlighter.ATTR);
  }


  /**
   * Tree colorization method for all sub-expressions.
   * @param node The node.
   */
  colorizeAll(node: Node) {
    let allNodes = sre.XpathUtil.evalXPath('.//*[@' + Attribute.ID + ']', node);
    allNodes.forEach(goog.bind(function(x) {
      this.colorize(x);
    }, this));
  }
  /**
   * Removes tree colorization.
   * @param node The node.
   */
  uncolorizeAll(node: Node) {
    let allNodes = sre.XpathUtil.evalXPath('.//*[@' + Attribute.ID + ']', node);
    allNodes.forEach(goog.bind(function(x) {
      this.uncolorize(x);
    }, this));
  }
  /**
   * Tree colors a single node.
   * @param node The node.
   */
  // TODO: Generalise this to use the highlighter method and background.
  colorize(node: Node) {
    let fore = sre.EnrichMathml.addPrefix('foreground');
    if (node.hasAttribute(fore)) {
      node.setAttribute(fore + '-old', node.style.color);
      node.style.color = node.getAttribute(fore);
    }
  }


  /**
   * Removes tree coloring from a single node.
   * @param node The node.
   */
  uncolorize(node: Node) {
    let fore = sre.EnrichMathml.addPrefix('foreground') + '-old';
    if (node.hasAttribute(fore)) {
      node.style.color = node.getAttribute(fore);
    }
  }
}

/**
 * Highlights a single node.
 * @param node The node to be highlighted.
 * @return {{node: !Node, opacity: (undefined|string), background:
 *          (undefined|string), foreground: (undefined|string)} } The old node
 *          information.
 */
AbstractHighlighter.prototype.highlightNode = goog.abstractMethod;
/**
 * Unhighlights a single node.
 * @param {{node: !Node, opacity: (undefined|string),
 *          background: (undefined|string), foreground: (undefined|string)} }
 * info The info for the node to be unhighlighted.
 */
AbstractHighlighter.prototype.unhighlightNode = goog.abstractMethod;

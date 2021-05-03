//
// Copyright 2019-21 Volker Sorge
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
 * @fileoverview Class highlighting SVG elements in MJ V3.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */


import * as DomUtil from '../common/dom_util';
import XpathUtil from '../common/xpath_util';
import {AbstractHighlighter, Highlight} from './abstract_highlighter';
import {ColorPicker} from './color_picker';
import {SvgHighlighter} from './svg_highlighter';


export class SvgV3Highlighter extends SvgHighlighter {

  /**
   * @override
   */
  constructor() {
    super();
    this.mactionName = 'maction';
  }


  /**
   * @override
   */
  public highlightNode(node: HTMLElement) {
    let info: Highlight;
    if (this.isHighlighted(node)) {
      info = {
        node: node,
        background: this.colorString().background,
        foreground: this.colorString().foreground
      };
      return info;
    }
    if (node.tagName === 'svg' || node.tagName === 'MJX-CONTAINER') {
      info = {
        node: node,
        background: node.style.backgroundColor,
        foreground: node.style.color
      };
      node.style.backgroundColor = this.colorString().background;
      node.style.color = this.colorString().foreground;
      return info;
    }
    let rect = DomUtil.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute(
        'sre-highlighter-added',  // Mark highlighting rect.
        'true');
    let padding = 40;
    let bbox: SVGRect = ((node as any) as SVGGraphicsElement).getBBox();
    rect.setAttribute('x', (bbox.x - padding).toString());
    rect.setAttribute('y', (bbox.y - padding).toString());
    rect.setAttribute('width', (bbox.width + 2 * padding).toString());
    rect.setAttribute('height', (bbox.height + 2 * padding).toString());
    let transform = node.getAttribute('transform');
    if (transform) {
      rect.setAttribute('transform', transform);
    }
    rect.setAttribute('fill', this.colorString().background);
    node.setAttribute(AbstractHighlighter.ATTR, 'true');
    node.parentNode.insertBefore(rect, node);
    info = {node: node, foreground: node.getAttribute('fill')};
    if (node.nodeName === 'rect') {
      let picker = new ColorPicker({alpha: 0, color: 'black'});
      node.setAttribute('fill', picker.rgba().foreground);
    } else {
      node.setAttribute('fill', this.colorString().foreground);
    }
    return info;
  }


  /**
   * @override
   */
  public unhighlightNode(info: Highlight) {
    let previous = info.node.previousSibling as HTMLElement;
    if (previous && previous.hasAttribute('sre-highlighter-added')) {
      info.foreground ? info.node.setAttribute('fill', info.foreground) :
                        info.node.removeAttribute('fill');
      info.node.parentNode.removeChild(previous);
      return;
    }
    info.node.style.backgroundColor = info.background;
    info.node.style.color = info.foreground;
  }


  /**
   * @override
   */
  public isMactionNode(node: HTMLElement) {
    return node.getAttribute('data-mml-node') === this.mactionName;
  }


  /**
   * @override
   */
  public getMactionNodes(node: HTMLElement) {
    return Array.from(XpathUtil.evalXPath(
        `.//*[@data-mml-node="${this.mactionName}"]`, node)) as HTMLElement[];
  }
}


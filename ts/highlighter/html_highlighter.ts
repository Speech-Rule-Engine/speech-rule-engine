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
 * @fileoverview Class highlighting HTML-CSS elements.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */


import * as DomUtil from '../common/dom_util';

import {AbstractHighlighter} from './abstract_highlighter';



export class HtmlHighlighter extends sre.AbstractHighlighter {
  mactionName = 'maction';
  mode: any;
  constructor() {
    super();
  }


  /**
   * Set the mode of the highlighter.
   * @param mode The mode indicator.
   */
  setMode(mode: string) {
    this.mode = mode;
  }


  /**
   * @override
   */
  highlightNode(node) {
    let info = {
      node: node,
      foreground: node.style.color,
      position: node.style.position
    };
    let color = this.color.rgb();
    node.style.color = color.foreground;
    node.style.position = 'relative';
    let bbox = node.bbox;
    if (bbox && bbox.w) {
      // vertical and horizontal padding
      let vpad = 0.05;
      let hpad = 0;
      let span = DomUtil.createElement('span');
      let left = parseFloat(node.style.paddingLeft || '0');
      span.style.backgroundColor = color.background;
      span.style.opacity = color.alphaback.toString();
      span.style.display = 'inline-block';
      span.style.height = bbox.h + bbox.d + 2 * vpad + 'em';
      span.style.verticalAlign = -bbox.d + 'em';
      span.style.marginTop = span.style.marginBottom = -vpad + 'em';
      span.style.width = bbox.w + 2 * hpad + 'em';
      span.style.marginLeft = left - hpad + 'em';
      span.style.marginRight = -bbox.w - hpad - left + 'em';
      node.parentNode.insertBefore(span, node);
      info.box = span;
    }
    return info;
  }


  /**
   * @override
   */
  unhighlightNode(info) {
    let node = info.node;
    node.style.color = info.foreground;
    node.style.position = info.position;
    if (info.box) {
      info.box.parentNode.removeChild(info.box);
    }
  }
}

goog.inherits(HtmlHighlighter, AbstractHighlighter);

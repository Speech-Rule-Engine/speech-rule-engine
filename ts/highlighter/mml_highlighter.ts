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
 * @fileoverview Highlighter for pure (or poor) MathML implementations, using
 * mathcolor and mathbackground instead of CSS style attributes. For example,
 * Firefox with native MathML.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */


import {AbstractHighlighter} from './abstract_highlighter';



export class MmlHighlighter extends sre.AbstractHighlighter {
  mactionName = 'maction';
  constructor() {
    super();
  }


  /**
   * @override
   */
  highlightNode(node) {
    let style = node.getAttribute('style');
    style += ';background-color: ' + this.colorString().background;
    style += ';color: ' + this.colorString().foreground;
    node.setAttribute('style', style);
    return {node: node};
  }


  /**
   * @override
   */
  unhighlightNode(info) {
    let style = info.node.getAttribute('style');
    style = style.replace(
        ';background-color: ' + this.colorString().background, '');
    style = style.replace(';color: ' + this.colorString().foreground, '');
    info.node.setAttribute('style', style);
  }


  /**
   * @override
   */
  colorString() {
    return this.color.rgba();
  }


  /**
   * @override
   */
  getMactionNodes(node) {
    return node.getElementsByTagName(this.mactionName);
  }


  /**
   * @override
   */
  isMactionNode(node) {
    return node.tagName === this.mactionName;
  }
}
goog.inherits(MmlHighlighter, AbstractHighlighter);

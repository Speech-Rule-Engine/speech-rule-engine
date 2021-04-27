//
// Copyright 2015-2021 Volker Sorge
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
 * @fileoverview Highlighter for native MathML implementations that fully
 * support CSS.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */


import {CssHighlighter} from './css_highlighter';



export class MmlCssHighlighter extends sre.CssHighlighter {
  mactionName = 'maction';
  constructor() {
    super();
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
goog.inherits(MmlCssHighlighter, CssHighlighter);

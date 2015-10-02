// Copyright 2015 Volker Sorge
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
 * @fileoverview Class highlighting MML elements.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.MmlHighlighter');

goog.require('sre.CssHighlighter');



/**
 * @constructor
 * @extends {sre.CssHighlighter}
 */
sre.MmlHighlighter = function() {
  goog.base(this);

  /**
   * @type {!string}
   */
  this.browser = '';
};
goog.inherits(sre.MmlHighlighter, sre.CssHighlighter);


/**
 * Set the browser name using the highlighter.
 * @param {!string} browser The browser name.
 */
sre.MmlHighlighter.prototype.setBrowser = function(browser) {
  this.browser = browser;
};


/**
 * @override
 */
sre.MmlHighlighter.prototype.highlightNode = function(node) {
  if (this.browser !== 'Firefox') {
    return goog.base(this, 'highlightNode', node);
  }
  var style = document.createElementNS(
      'http://www.w3.org/1998/Math/MathML', 'mstyle');
  style.setAttribute('mathbackground', this.colorString().background);
  style.setAttribute('mathcolor', this.colorString().foreground);
  node.parentNode.replaceChild(style, node);
  style.appendChild(node);
  return {node: style};
};


/**
 * @override
 */
sre.MmlHighlighter.prototype.unhighlightNode = function(info) {
  if (this.browser !== 'Firefox') {
    goog.base(this, 'unhighlightNode', info);
    return;
  }
  var node = info.node;
  node.parentNode.replaceChild(node.firstElementChild, node);
};


/**
 * @override
 */
sre.MmlHighlighter.prototype.colorString = function() {
  return this.browser === 'Firefox' ? this.color.hex() : this.color.rgba();
};

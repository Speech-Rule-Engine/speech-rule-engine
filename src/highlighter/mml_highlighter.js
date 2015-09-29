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

goog.require('sre.AbstractHighlighter');



/**
 * @constructor
 * @extends {sre.AbstractHighlighter}
 */
sre.MmlHighlighter = function() {
  goog.base(this);
};
goog.inherits(sre.MmlHighlighter, sre.AbstractHighlighter);


/**
 * @override
 */
sre.MmlHighlighter.prototype.highlightNode = function(node) {
  var style = document.createElementNS(
      'http://www.w3.org/1998/Math/MathML', 'mstyle');
  style.setAttribute('mathbackground', this.colorString());
  node.parentNode.replaceChild(style, node);
  style.appendChild(node);
  return {node: style};
};


/**
 * @override
 */
sre.MmlHighlighter.prototype.unhighlightNode = function(info) {
  var node = info.node;
  node.parentNode.replaceChild(node.firstElementChild, node);
};


/**
 * @override
 */
sre.MmlHighlighter.prototype.colorString = function() {
  return '#' + sre.MmlHighlighter.toHex_(this.color.red) +
      sre.MmlHighlighter.toHex_(this.color.green) +
      sre.MmlHighlighter.toHex_(this.color.blue);
};


/**
 * Turns a decimal number into a two digit hex string.
 * @param {number} number The decimal.
 * @return {string} The hex string.
 * @private
 */
sre.MmlHighlighter.toHex_ = function(number) {
  var hex = number.toString(16);
  return hex.length === 1 ? '0' + hex : hex;
};

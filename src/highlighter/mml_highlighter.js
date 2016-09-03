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
 * @fileoverview Highlighter for pure (or poor) MathML implementations, using
 * mathcolor and mathbackground instead of CSS style attributes. For example,
 * Firefox with native MathML.
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

  this.mactionName = 'maction';
};
goog.inherits(sre.MmlHighlighter, sre.AbstractHighlighter);


/**
 * @override
 */
sre.MmlHighlighter.prototype.highlightNode = function(node) {
  var style = node.getAttribute('style');
  style += ';background-color: ' + this.colorString().background;
  style += ';color: ' + this.colorString().foreground;
  node.setAttribute('style', style);
  return {node: node};
};


/**
 * @override
 */
sre.MmlHighlighter.prototype.unhighlightNode = function(info) {
  var style = info.node.getAttribute('style');
  style = style.replace(';background-color: ' +
                        this.colorString().background, '');
  style = style.replace(';color: ' + this.colorString().foreground, '');
  info.node.setAttribute('style', style);
};


/**
 * @override
 */
sre.MmlHighlighter.prototype.colorString = function() {
  return this.color.rgba();
};


/**
 * @override
 */
sre.MmlHighlighter.prototype.getMactionNodes = function(node) {
  return node.getElementsByTagName(this.mactionName);
};


/**
 * @override
 */
sre.MmlHighlighter.prototype.isMactionNode = function(node) {
  return node.tagName === this.mactionName;
};

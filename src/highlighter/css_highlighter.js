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
 * @fileoverview Class highlighting CSS elements.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.CssHighlighter');

goog.require('sre.AbstractHighlighter');



/**
 * @constructor
 * @extends {sre.AbstractHighlighter}
 */
sre.CssHighlighter = function() {
  goog.base(this);
};
goog.inherits(sre.CssHighlighter, sre.AbstractHighlighter);


/**
 * @override
 */
sre.CssHighlighter.prototype.highlightNode = function(node) {
  var info = {node: node,
              background: node.style.backgroundColor,
              foreground: node.style.color};
  var color = this.colorString();
  node.style.backgroundColor = color.background;
  node.style.color = color.foreground;
  return info;
};


/**
 * @override
 */
sre.CssHighlighter.prototype.unhighlightNode = function(info) {
  info.node.style.backgroundColor = info.background;
  info.node.style.color = info.foreground;
};

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
 * @fileoverview Class highlighting HTML-CSS elements.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.HtmlHighlighter');

goog.require('sre.CssHighlighter');



/**
 * @constructor
 * @extends {sre.CssHighlighter}
 */
sre.HtmlHighlighter = function() {
  goog.base(this);

  this.mactionName = 'maction';

};
goog.inherits(sre.HtmlHighlighter, sre.CssHighlighter);


/**
 * Set the mode of the highlighter.
 * @param {!string} mode The mode indicator.
 */
sre.HtmlHighlighter.prototype.setMode = function(mode) {
  this.mode = mode;
};


/**
 * @override
 */
sre.HtmlHighlighter.prototype.highlightNode = function(node) {
  var info = {
    node: node,
    foreground: node.style.color,
    position: node.style.position
  };
  var color = this.color.rgb();
  node.style.color = color.foreground;
  node.style.position = 'relative';
  var bbox = node.bbox;
  if (bbox && bbox.w) {
    // vertical and horizontal padding
    var vpad = 0.05;
    var hpad = 0;
    var span = document.createElement('span');
    var left = parseFloat(node.style.paddingLeft || '0');
    span.style.backgroundColor = color.background;
    span.style.opacity = color.alphaback.toString();
    span.style.display = 'inline-block';
    span.style.height = (bbox.h + bbox.d + 2 * vpad) + 'em';
    span.style.verticalAlign = (-bbox.d) + 'em';
    span.style.marginTop = span.style.marginBottom = (-vpad) + 'em';
    span.style.width = (bbox.w + 2 * hpad) + 'em';
    span.style.marginLeft = (left - hpad) + 'em';
    span.style.marginRight = (-bbox.w - hpad - left) + 'em';
    node.parentNode.insertBefore(span, node);
    info.box = span;
  }
  return info;
};


/**
 * @override
 */
sre.HtmlHighlighter.prototype.unhighlightNode = function(info) {
  var node = info.node;
  node.style.color = info.foreground;
  node.style.position = info.position;
  if (info.box) info.box.parentNode.removeChild(info.box);
};

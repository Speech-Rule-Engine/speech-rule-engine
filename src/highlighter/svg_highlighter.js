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
 * @fileoverview Class highlighting SVG elements.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.SvgHighlighter');

goog.require('sre.AbstractHighlighter');



/**
 * @constructor
 * @extends {sre.AbstractHighlighter}
 */
sre.SvgHighlighter = function() {
  goog.base(this);
};
goog.inherits(sre.SvgHighlighter, sre.AbstractHighlighter);


/**
 * @override
 */
sre.SvgHighlighter.prototype.highlightNode = function(node) {
  if (node.tagName === 'svg') {
    var info = {node: node, oldColor: node.style.backgroundColor};
    node.style.backgroundColor = this.colorString();
    return info;
  }
  var bbox = node.getBBox();
  var rect = document.createElementNS(
      'http://www.w3.org/2000/svg', 'rect');
  rect.setAttribute('x', bbox.x);
  rect.setAttribute('y', bbox.y);
  rect.setAttribute('width', bbox.width);
  rect.setAttribute('height', bbox.height);
  var transform = node.getAttribute('transform');
  if (transform) {
    rect.setAttribute('transform', transform);
  }
  rect.setAttribute('fill', this.colorString());
  node.parentNode.insertBefore(rect, node);
  return {node: rect};
};


/**
 * @override
 */
sre.SvgHighlighter.prototype.unhighlightNode = function(info) {
  info.oldColor ? info.node.style = info.oldColor :
      info.node.parentNode.removeChild(info.node);
};

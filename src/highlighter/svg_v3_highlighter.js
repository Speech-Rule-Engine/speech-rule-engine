// Copyright 2019 Volker Sorge
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

goog.provide('sre.SvgV3Highlighter');

goog.require('sre.DomUtil');
goog.require('sre.SvgHighlighter');
goog.require('sre.XpathUtil');



/**
 * @constructor
 * @extends {sre.SvgHighlighter}
 */
sre.SvgV3Highlighter = function() {
  sre.SvgV3Highlighter.base(this, 'constructor');

  this.mactionName = 'maction';
};
goog.inherits(sre.SvgV3Highlighter, sre.SvgHighlighter);


/**
 * @override
 */
sre.SvgV3Highlighter.prototype.highlightNode = function(node) {
  if (node.tagName === 'svg' || node.tagName === 'MJX-CONTAINER') {
    var info = {node: node,
      background: node.style.backgroundColor,
      foreground: node.style.color};
    node.style.backgroundColor = this.colorString().background;
    node.style.color = this.colorString().foreground;
    return info;
  }
  var rect = sre.DomUtil.createElementNS('http://www.w3.org/2000/svg', 'rect');
  var padding = 40, bbox;
  bbox = node.getBBox();
  rect.setAttribute('x', bbox.x - padding);
  rect.setAttribute('y', bbox.y - padding);
  rect.setAttribute('width', bbox.width + 2 * padding);
  rect.setAttribute('height', bbox.height + 2 * padding);
  var transform = node.getAttribute('transform');
  if (transform) {
    rect.setAttribute('transform', transform);
  }
  rect.setAttribute('fill', this.colorString().background);
  node.parentNode.insertBefore(rect, node);
  info = {node: rect, foreground: node.getAttribute('fill')};
  // node.setAttribute('fill', this.colorString().foreground);
  return info;
};


/**
 * @override
 */
sre.SvgV3Highlighter.prototype.isMactionNode = function(node) {
    return node.getAttribute('data-mml-node') === this.mactionName;
};


/**
 * @override
 */
sre.SvgV3Highlighter.prototype.getMactionNodes = function(node) {
  return sre.XpathUtil.evalXPath(
      './/*[@data-mml-node="' + this.mactionName + '"]', node);
};



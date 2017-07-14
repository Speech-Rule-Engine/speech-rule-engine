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
  sre.SvgHighlighter.base(this, 'constructor');

  this.mactionName = 'mjx-svg-maction';
};
goog.inherits(sre.SvgHighlighter, sre.AbstractHighlighter);


/**
 * @override
 */
sre.SvgHighlighter.prototype.highlightNode = function(node) {
  if (node.tagName === 'svg') {
    var info = {node: node,
      background: node.style.backgroundColor,
      foreground: node.style.color};
    node.style.backgroundColor = this.colorString().background;
    node.style.color = this.colorString().foreground;
    return info;
  }
  var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  var padding = 40, bbox;
  if (node.nodeName === 'use') {
    //
    //  WebKit has a bug where the x and y attributes for a <use> element
    //  are not taken into account in the getBBox() call
    //  (see https://code.google.com/p/chromium/issues/detail?id=512081)
    //  so we temporarily wrap the <use> in a <g> and use getBBox() on that.
    //
    var g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    node.parentNode.insertBefore(g, node);
    g.appendChild(node);
    bbox = g.getBBox();
    g.parentNode.replaceChild(node, g);
  } else {
    bbox = node.getBBox();
  }
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
  node.setAttribute('fill', this.colorString().foreground);
  return info;
};


/**
 * @override
 */
sre.SvgHighlighter.prototype.unhighlightNode = function(info) {
  if ('background' in info) {
    info.node.style.backgroundColor = info.background;
    info.node.style.color = info.foreground;
    return;
  }
  info.foreground ?
      info.node.nextSibling.setAttribute('fill', info.foreground) :
      info.node.nextSibling.removeAttribute('fill');
  info.node.parentNode.removeChild(info.node);
};


/**
 * @override
 */
sre.SvgHighlighter.prototype.isMactionNode = function(node) {
  var className = node.className || node.getAttribute('class');
  className = className.baseVal ? className.baseVal : className;
  return className ? className.match(new RegExp(this.mactionName)) : false;
};

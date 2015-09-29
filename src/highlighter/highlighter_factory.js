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
 * @fileoverview Factory for generating highlighters.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.HighlighterFactory');

goog.require('sre.ColorPicker');
goog.require('sre.CssHighlighter');
goog.require('sre.MmlHighlighter');
goog.require('sre.SvgHighlighter');



/**
 * Produces a highlighter that goes with the current Mathjax renderer if
 * highlighting is possible.
 * @param {string} renderer The name of the renderer.
 * @param {sre.ColorPicker.Color} color A color specification.
 * @return {?sre.HighlighterInterface} A new highlighter.
 */
sre.HighlighterFactory.highlighter = function(renderer, color) {
  var colorPicker = new sre.ColorPicker(color);
  var constructor = sre.HighlighterFactory.highlighterMapping_[renderer];
  if (!constructor) return null;
  var highlighter = new constructor();
  highlighter.setColor(colorPicker);
  return highlighter;
};


/**
 * @type {Object.<string, function(new:sre.HighlighterInterface)>}
 * @private
 */
sre.HighlighterFactory.highlighterMapping_ = {
  'SVG': sre.SvgHighlighter,
  'NativeMML': sre.MmlHighlighter,
  'HTML-CSS': sre.CssHighlighter,
  'CommonHTML': sre.CssHighlighter
};

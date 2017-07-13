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
goog.require('sre.HtmlHighlighter');
goog.require('sre.MmlCssHighlighter');
goog.require('sre.MmlHighlighter');
goog.require('sre.SvgHighlighter');


/**
 * Produces a highlighter that goes with the current Mathjax renderer if
 * highlighting is possible.
 * @param {sre.ColorPicker.Color} back A background color specification.
 * @param {sre.ColorPicker.Color} fore A foreground color specification.
 * @param {{renderer: string,
 *          browser: (undefined|string)}} rendererInfo
 *     Information on renderer, browser. Has to at least contain the
 *     renderer field.
 * @return {?sre.Highlighter} A new highlighter.
 */
sre.HighlighterFactory.highlighter = function(back, fore, rendererInfo) {
  var colorPicker = new sre.ColorPicker(back, fore);
  var renderer = (rendererInfo.renderer === 'NativeMML' &&
                  rendererInfo.browser === 'Safari') ?
      'MML-CSS' : rendererInfo.renderer;
  var highlighter =
      sre.HighlighterFactory.highlighterMapping_[renderer];
  if (!highlighter) return null;
  highlighter.setColor(colorPicker);
  return highlighter;
};


/**
 * Adds highlighter specific events depending on the current Mathjax renderer.
 * @param {!Node} node  The base node for highlighting.
 * @param {Object.<Function>} events The events to attach given as event
 *     type and function to execute
 * @param {{renderer: string,
 *          browser: (undefined|string)}} rendererInfo
 *     Information on renderer, browser. Has to at least contain the
 *     renderer field.
 */
sre.HighlighterFactory.addEvents = function(node, events, rendererInfo) {
  var highlighter =
      sre.HighlighterFactory.highlighterMapping_[rendererInfo.renderer];
  if (highlighter) {
    highlighter.addEvents(node, events);
  }
};


/**
 * @type {Object.<sre.Highlighter>}
 * @private
 */
sre.HighlighterFactory.highlighterMapping_ = {
  'SVG': new sre.SvgHighlighter(),
  'NativeMML': new sre.MmlHighlighter(),
  'HTML-CSS': new sre.HtmlHighlighter(),
  'MML-CSS': new sre.MmlCssHighlighter(),
  'CommonHTML': new sre.CssHighlighter()
};


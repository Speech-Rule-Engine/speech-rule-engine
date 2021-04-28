//
// Copyright 2015-21 Volker Sorge
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


import {ChtmlHighlighter} from './chtml_highlighter';
import {Color, ColorPicker} from './color_picker';
import {CssHighlighter} from './css_highlighter';
import {Highlighter} from './highlighter';
import {HtmlHighlighter} from './html_highlighter';
import {MmlCssHighlighter} from './mml_css_highlighter';
import {MmlHighlighter} from './mml_highlighter';
import {SvgHighlighter} from './svg_highlighter';
import {SvgV3Highlighter} from './svg_v3_highlighter';


/**
 * Produces a highlighter that goes with the current Mathjax renderer if
 * highlighting is possible.
 * @param back A background color specification.
 * @param fore A foreground color specification.
 * @param {{renderer: string,
 *          browser: (undefined|string)}} rendererInfo Information on renderer,
 * browser. Has to at least contain the renderer field.
 * @return A new highlighter.
 */
export function highlighter(
    back: Color, fore: Color,
    rendererInfo: {renderer: string, browser?: string}): Highlighter {
  let colorPicker = new ColorPicker(back, fore);
  let renderer = rendererInfo.renderer === 'NativeMML' &&
          rendererInfo.browser === 'Safari' ?
      'MML-CSS' :
      rendererInfo.renderer === 'SVG' && rendererInfo.browser === 'v3' ?
      'SVG-V3' :
      rendererInfo.renderer;
  let highlighter =
      new (highlighterMapping_[renderer] || highlighterMapping_['NativeMML'])();
  highlighter.setColor(colorPicker);
  return highlighter;
}


/**
 * Adds highlighter specific events depending on the current Mathjax renderer.
 * @param node  The base node for highlighting.
 * @param events The events to attach given as event
 *     type and function to execute
 * @param rendererInfo Information on renderer,
 * browser. Has to at least contain the renderer field.
 */
export function addEvents(
    node: HTMLElement, events: {[key: string]: EventListener},
    rendererInfo: {renderer: string, browser?: string}) {
  let highlight = highlighterMapping_[rendererInfo.renderer];
  if (highlight) {
    (new highlight()).addEvents(node, events);
  }
}


export const highlighterMapping_: {[key: string]: new () => Highlighter} = {
  'SVG': SvgHighlighter,
  'SVG-V3': SvgV3Highlighter,
  'NativeMML': MmlHighlighter,
  'HTML-CSS': HtmlHighlighter,
  'MML-CSS': MmlCssHighlighter,
  'CommonHTML': CssHighlighter,
  'CHTML': ChtmlHighlighter
};

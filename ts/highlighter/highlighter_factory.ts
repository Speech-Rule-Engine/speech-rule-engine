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
 * @file Factory for generating highlighters.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import { ChtmlHighlighter } from './chtml_highlighter.js';
import { Color, ColorPicker } from './color_picker.js';
import { CssHighlighter } from './css_highlighter.js';
import { Highlighter } from './highlighter.js';
import { HtmlHighlighter } from './html_highlighter.js';
import { MmlCssHighlighter } from './mml_css_highlighter.js';
import { MmlHighlighter } from './mml_highlighter.js';
import { SvgHighlighter } from './svg_highlighter.js';
import { SvgV3Highlighter } from './svg_v3_highlighter.js';

/**
 * Produces a highlighter that goes with the current Mathjax renderer if
 * highlighting is possible.
 *
 * @param back A background color specification.
 * @param fore A foreground color specification.
 * @param rendererInfo Information on renderer,
 * browser. Has to at least contain the renderer field.
 * @param rendererInfo.renderer The renderer name.
 * @param rendererInfo.browser The browser name.
 * @returns A new highlighter.
 */
export function highlighter(
  back: Color,
  fore: Color,
  rendererInfo: { renderer: string; browser?: string }
): Highlighter {
  const colorPicker = new ColorPicker(back, fore);
  const renderer =
    rendererInfo.renderer === 'NativeMML' && rendererInfo.browser === 'Safari'
      ? 'MML-CSS'
      : rendererInfo.renderer === 'SVG' && rendererInfo.browser === 'v3'
      ? 'SVG-V3'
      : rendererInfo.renderer;
  const highlighter = new (highlighterMapping[renderer] ||
    highlighterMapping['NativeMML'])();
  highlighter.setColor(colorPicker);
  return highlighter;
}

/**
 * Updates the color setting for the given highlighter using named colors.
 * Note, this is only used outside SRE, hence exported!
 *
 * @param back Background color as a named color.
 * @param fore Foreground color as a named color.
 * @param highlighter The highlighter to update.
 */
export function update(back: Color, fore: Color, highlighter: Highlighter) {
  const colorPicker = new ColorPicker(back, fore);
  highlighter.setColor(colorPicker);
}

/**
 * Adds highlighter specific events depending on the current Mathjax renderer.
 * This is used up to MathJax 2.7!
 *
 * @param node  The base node for highlighting.
 * @param events The events to attach given as event
 *     type and function to execute
 * @param rendererInfo Information on renderer,
 * browser. Has to at least contain the renderer field.
 * @param rendererInfo.renderer The renderer name.
 * @param rendererInfo.browser The browser name.
 */
export function addEvents(
  node: HTMLElement,
  events: { [key: string]: EventListener },
  rendererInfo: { renderer: string; browser?: string }
) {
  const highlight = highlighterMapping[rendererInfo.renderer];
  if (highlight) {
    new highlight().addEvents(node, events);
  }
}

const highlighterMapping: { [key: string]: new () => Highlighter } = {
  SVG: SvgHighlighter,
  'SVG-V3': SvgV3Highlighter,
  NativeMML: MmlHighlighter,
  'HTML-CSS': HtmlHighlighter,
  'MML-CSS': MmlCssHighlighter,
  CommonHTML: CssHighlighter,
  CHTML: ChtmlHighlighter
};

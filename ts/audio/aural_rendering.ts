//
// Copyright 2017-21 Volker Sorge
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
 * @fileoverview A factory for rendering speech output depending on the selected
 *     markup.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */


import * as EngineExports from '../common/engine';
import {Engine} from '../common/engine';

import {AcssRenderer} from './acss_renderer';
import {AudioRenderer} from './audio_renderer';
import {PunctuationRenderer} from './punctuation_renderer';
import {SableRenderer} from './sable_renderer';
import {SsmlRenderer} from './ssml_renderer';
import {SsmlStepRenderer} from './ssml_step_renderer';
import {StringRenderer} from './string_renderer';



export class AuralRendering implements AudioRenderer {
  private static rendererMapping_: {[key: Engine.Markup]: AudioRenderer} = {};


  static xmlInstance: AudioRenderer;


  /**
   * @override
   */
  setSeparator(sep) {
    let renderer = AuralRendering.rendererMapping_[Engine.getInstance().markup];
    if (renderer) {
      renderer.setSeparator(sep);
    }
  }


  /**
   * @override
   */
  getSeparator() {
    let renderer = AuralRendering.rendererMapping_[Engine.getInstance().markup];
    return renderer ? renderer.getSeparator() : '';
  }


  /**
   * @override
   */
  markup(descrs) {
    let renderer = AuralRendering.rendererMapping_[Engine.getInstance().markup];
    if (!renderer) {
      return '';
    }
    return renderer.markup(descrs);
  }


  /**
   * @override
   */
  merge(strs) {
    let span = strs.map(function(s) {
      return {string: s, attributes: {}};
    });
    let renderer = AuralRendering.rendererMapping_[Engine.getInstance().markup];
    if (!renderer) {
      return strs.join();
    }
    return renderer.merge(span);
  }


  /**
   * @override
   */
  finalize(str) {
    let renderer = AuralRendering.rendererMapping_[Engine.getInstance().markup];
    if (!renderer) {
      return str;
    }
    return renderer.finalize(str);
  }


  /**
   * @override
   */
  error(key) {
    let renderer = AuralRendering.rendererMapping_[Engine.getInstance().markup];
    if (!renderer) {
      return '';
    }
    return renderer.error(key);
  }


  /**
   * Registers a new renderer.
   * @param type The markup type.
   * @param renderer The audio renderer.
   */
  static registerRenderer(type: Engine.Markup, renderer: AudioRenderer) {
    AuralRendering.rendererMapping_[type] = renderer;
  }


  /**
   * Checks if the current renderer is of a given type.
   * @param type This is a type.
   * @return True if it is an instance of the given type.
   */
  static ofType(type: () => any): boolean {
    return AuralRendering
               .rendererMapping_[Engine.getInstance().markup] instanceof
        type;
  }
}
goog.addSingletonGetter(AuralRendering);



AuralRendering.registerRenderer(Engine.Markup.NONE, new StringRenderer());
AuralRendering.registerRenderer(
    Engine.Markup.PUNCTUATION, new PunctuationRenderer());
AuralRendering.registerRenderer(Engine.Markup.ACSS, new AcssRenderer());
AuralRendering.registerRenderer(Engine.Markup.SABLE, new SableRenderer());
AuralRendering.xmlInstance = new SsmlRenderer();
AuralRendering.registerRenderer(
    Engine.Markup.VOICEXML, AuralRendering.xmlInstance);
AuralRendering.registerRenderer(Engine.Markup.SSML, AuralRendering.xmlInstance);
AuralRendering.registerRenderer(
    Engine.Markup.SSML_STEP, new SsmlStepRenderer());

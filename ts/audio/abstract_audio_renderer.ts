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
 * @fileoverview Abstract class for audio renderers.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */


import * as EngineExports from '../common/engine';
import {Engine} from '../common/engine';

import {AudioRenderer} from './audio_renderer';



export class AbstractAudioRenderer implements AudioRenderer {
  markup: any;

  private separator_: string = ' ';


  /**
   * @override
   */
  setSeparator(sep) {
    this.separator_ = sep;
  }


  /**
   * @override
   */
  getSeparator() {
    // TODO: (Span) Do this via setSeparator.
    return Engine.getInstance().modality === 'braille' ? '' : this.separator_;
  }


  /**
   * @override
   */
  error(key) {
    return null;
  }


  /**
   * @override
   */
  merge(spans) {
    let str = '';
    let len = spans.length - 1;
    for (let i = 0, span; span = spans[i]; i++) {
      str += span.string;
      if (i < len) {
        let sep = span.attributes['separator'];
        str += sep !== undefined ? sep : this.getSeparator();
      }
    }
    return str;
  }


  /**
   * @override
   */
  finalize(str) {
    return str;
  }


  /**
   * Maps named pauses to numerical values.
   * @param value The alpha value for the pause.
   * @return The corresponding numerical value.
   */
  pauseValue(value: string): number {
    let numeric;
    switch (value) {
      case 'long':
        numeric = 750;
        break;
      case 'medium':
        numeric = 500;
        break;
      case 'short':
        numeric = 250;
        break;
      default:
        numeric = parseInt(value, 10);
    }
    return Math.floor(
        numeric * parseInt(Engine.getInstance().getRate(), 10) / 100);
  }
}

/**
 * @override
 */
AbstractAudioRenderer.prototype.markup = goog.abstractMethod;

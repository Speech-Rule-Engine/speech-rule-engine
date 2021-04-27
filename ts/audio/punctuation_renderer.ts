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
 * @fileoverview A simple audio renderer that interprets pauses of varying
 *     length as punctuation.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */


import {AbstractAudioRenderer} from './abstract_audio_renderer';



export class PunctuationRenderer extends sre.AbstractAudioRenderer {
  /**
   * Alpha values for pauses.
   */
  private static PAUSE_PUNCTUATION_ = {
    'short': ',',
    'medium': ';',
    'long': '.'
  };
  constructor() {
    super();
  }


  /**
   * @override
   */
  markup(descrs) {
    let markup = sre.AudioUtil.personalityMarkup(descrs);
    let str = '';
    let pause = null;
    let span = false;
    for (let i = 0, descr; descr = markup[i]; i++) {
      if (sre.AudioUtil.isMarkupElement(descr)) {
        continue;
      }
      if (sre.AudioUtil.isPauseElement(descr)) {
        if (span) {
          pause = sre.AudioUtil.mergePause(
              pause, (descr as {pause: number}), Math.max);
        }
        continue;
      }
      if (pause) {
        str += this.pause(pause[sre.Engine.personalityProps.PAUSE]);
        pause = null;
      }
      str += (span ? this.getSeparator() : '') + this.merge(descr.span);
      span = true;
    }
    return str;
  }


  /**
   * Transforms numeric pauses into alpha versions.
   * @param pause The pause length.
   * @return The alpha equivalent.
   */
  pause(pause: number): string {
    if (typeof pause === 'number') {
      if (pause <= 250) {
        let newPause = 'short';
      } else if (pause <= 500) {
        newPause = 'medium';
      } else {
        newPause = 'long';
      }
    } else {
      newPause = pause;
    }
    return PunctuationRenderer.PAUSE_PUNCTUATION_[newPause] || '';
  }
}
goog.inherits(PunctuationRenderer, AbstractAudioRenderer);

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


import {EngineConst} from '../common/engine';
import {AbstractAudioRenderer} from './abstract_audio_renderer';
import * as AudioUtil from './audio_util';
import {AuditoryDescription} from './auditory_description';


export class PunctuationRenderer extends AbstractAudioRenderer {

  /**
   * Alpha values for pauses.
   */
  private static PAUSE_PUNCTUATION = new Map([
    ['short', ','],
    ['medium', ';'],
    ['long', '.']
  ]);

  /**
   * @override
   */
  public markup(descrs: AuditoryDescription[]) {
    let markup = AudioUtil.personalityMarkup(descrs);
    let str = '';
    let pause = null;
    let span = false;
    for (let i = 0, descr; descr = markup[i]; i++) {
      if (AudioUtil.isMarkupElement(descr)) {
        continue;
      }
      if (AudioUtil.isPauseElement(descr)) {
        if (span) {
          pause = AudioUtil.mergePause(
              pause, (descr as {pause: number}), Math.max);
        }
        continue;
      }
      if (pause) {
        str += this.pause(pause[EngineConst.personalityProps.PAUSE]);
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
  public pause(pause: AudioUtil.PauseValue): string {
    let newPause;
    if (typeof pause === 'number') {
      if (pause <= 250) {
        newPause = 'short';
      } else if (pause <= 500) {
        newPause = 'medium';
      } else {
        newPause = 'long';
      }
    } else {
      newPause = pause;
    }
    return PunctuationRenderer.PAUSE_PUNCTUATION.get(newPause) || '';
  }
}

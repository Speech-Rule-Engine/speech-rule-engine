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
 * @fileoverview An audio CSS renderer with prosody markup mainly aimed at Emacs
 *     speak.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */


import {EngineConst} from '../common/engine';
import * as EventUtil from '../common/event_util';
import * as AudioUtil from './audio_util';
import {AuditoryDescription} from './auditory_description';
import {MarkupRenderer} from './markup_renderer';


export class AcssRenderer extends MarkupRenderer {

  /**
   * @override
   */
  public markup(descrs: AuditoryDescription[]) {
    // TODO: Include personality range computations.
    this.setScaleFunction(-2, 2, 0, 10, 0);
    let markup = AudioUtil.personalityMarkup(descrs);
    let result = [];
    let currentPers: AudioUtil.Tags = {open: []};
    let pause = null;
    let isString = false;
    for (let i = 0, descr; descr = markup[i]; i++) {
      if (AudioUtil.isMarkupElement(descr)) {
        AudioUtil.mergeMarkup(currentPers, descr);
        continue;
      }
      if (AudioUtil.isPauseElement(descr)) {
        if (isString) {
          // TODO: (MS 2.3) Sort out this type and the merge function!
          pause =
              (AudioUtil.mergePause(
                   pause, (descr as {pause: number}), Math.max) as
               {pause: number});
        }
        continue;
      }
      let str = '"' + this.merge(descr.span) + '"';
      // var str = '"' + descr.span.join(this.getSeparator()) + '"';
      // var str = '"' + descr.string.join(this.getSeparator()) + '"';
      isString = true;
      if (pause) {
        result.push(this.pause(pause));
        pause = null;
      }
      let prosody = this.prosody_(currentPers);
      result.push(prosody ? '(text (' + prosody + ') ' + str + ')' : str);
    }
    return '(exp ' + result.join(' ') + ')';
  }


  /**
   * @override
   */
  public error(key: number) {
    return '(error "' + EventUtil.Move.get(key) + '")';
  }


  /**
   * @override
   */
  public prosodyElement(key: EngineConst.personalityProps, value: number) {
    value = this.applyScaleFunction(value);
    switch (key) {
      case EngineConst.personalityProps.RATE:
        return '(richness . ' + value + ')';
      case EngineConst.personalityProps.PITCH:
        return '(average-pitch . ' + value + ')';
      case EngineConst.personalityProps.VOLUME:
        return '(stress . ' + value + ')';
    }
    return '(value . ' + value + ')';
  }


  /**
   * @override
   */
  public pause(pause: AudioUtil.Pause) {
    return '(pause . ' +
        this.pauseValue(
        pause[EngineConst.personalityProps.PAUSE] as string) + ')';
  }


  /**
   * Transforms a prosody element into an S-expression.
   * @param pros The prosody element.
   * @return The S-expression.
   */
  private prosody_(pros: AudioUtil.Tags): string {
    let keys: EngineConst.personalityProps[] = pros.open;
    let result = [];
    for (let i = 0, key; key = keys[i]; i++) {
      result.push(this.prosodyElement(key, pros[key]));
    }
    return result.join(' ');
  }

}


/**
 * @override
 */
// sre.AcssRenderer.prototype.merge = function(strs) {
//   console.log('when');
//   return '(exp ' +
//       strs.map(function(str) {
//         return str.string.replace(/^\(exp /, '').
//             replace(/\)$/, '');}).join(' ') +
//       ')';
// };

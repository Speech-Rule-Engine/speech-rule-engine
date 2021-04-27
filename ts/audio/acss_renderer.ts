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


import * as AudioUtil from './audio_util';
import {MarkupRenderer} from './markup_renderer';



export class AcssRenderer extends sre.MarkupRenderer {
  constructor() {
    super();
  }


  /**
   * @override
   */
  markup(descrs) {
    // TODO: Include personality range computations.
    this.setScaleFunction(-2, 2, 0, 10, 0);
    let markup = AudioUtil.personalityMarkup(descrs);
    let result = [];
    let currentPers = {open: []};
    let pause = null;
    let string = false;
    for (let i = 0, descr; descr = markup[i]; i++) {
      if (AudioUtil.isMarkupElement(descr)) {
        AudioUtil.mergeMarkup(currentPers, descr);
        continue;
      }
      if (AudioUtil.isPauseElement(descr)) {
        if (string) {
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
      string = true;
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
  error(key) {
    return '(error "' + sre.EventUtil.Move[key.toString()] + '")';
  }


  /**
   * Transforms a prosody element into an S-expression.
   * @param pros The prosody element.
   * @return The S-expression.
   */
  private prosody_(pros: {[key: any]: number}): string {
    let keys = pros.open;
    let result = [];
    for (let i = 0, key; key = keys[i]; i++) {
      result.push(this.prosodyElement(key, pros[key]));
    }
    return result.join(' ');
  }


  /**
   * @override
   */
  prosodyElement(key, value) {
    value = this.applyScaleFunction(value);
    switch (key) {
      case sre.Engine.personalityProps.RATE:
        return '(richness . ' + value + ')';
        break;
      case sre.Engine.personalityProps.PITCH:
        return '(average-pitch . ' + value + ')';
        break;
      case sre.Engine.personalityProps.VOLUME:
        return '(stress . ' + value + ')';
        break;
    }
    return '(value . ' + value + ')';
  }


  /**
   * @override
   */
  pause(pause) {
    return '(pause . ' +
        this.pauseValue(pause[sre.Engine.personalityProps.PAUSE]) + ')';
  }
}
goog.inherits(AcssRenderer, MarkupRenderer);


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

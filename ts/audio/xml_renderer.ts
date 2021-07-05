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
 * @fileoverview An abstract class for audio renderer with XML markup.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */


import {EngineConst, SREError} from '../common/engine';
import * as AudioUtil from './audio_util';
import {AuditoryDescription} from './auditory_description';
import {MarkupRenderer} from './markup_renderer';


export abstract class XmlRenderer extends MarkupRenderer {

  /**
   * Computes the closing tag for a personality property.
   * @param tag The tagname.
   */
  public abstract closeTag(tag: EngineConst.personalityProps): void;

  // TODO: Remove redundant markup and start/end pauses.
  /**
   * @override
   */
  public markup(descrs: AuditoryDescription[]) {
    // TODO: Include personality range computations.
    this.setScaleFunction(-2, 2, -100, 100, 2);
    let markup = AudioUtil.personalityMarkup(descrs);
    let result = [];
    let currentOpen: EngineConst.personalityProps[] = [];
    for (let i = 0, descr: AudioUtil.Markup; descr = markup[i]; i++) {
      if (descr.span) {
        result.push(this.merge(descr.span));
        continue;
      }
      if (AudioUtil.isPauseElement(descr)) {
        result.push(this.pause((descr as {pause: number})));
        continue;
      }
      if (descr.close.length) {
        for (let j = 0; j < descr.close.length; j++) {
          let last = currentOpen.pop();
          if (descr.close.indexOf(last) === -1) {
            throw new SREError('Unknown closing markup element: ' + last);
          }
          result.push(this.closeTag(last));
        }
      }
      if (descr.open.length) {
        let open = AudioUtil.sortClose(descr.open.slice(), markup.slice(i + 1));
        open.forEach(o => {
          result.push(this.prosodyElement(o, descr[o]));
          currentOpen.push(o);
        });
      }
    }
    return result.join(' ');  // this.merge(result);
  }
}

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
 * @file A simple audio renderer that ignores all prosody.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import Engine from '../common/engine.js';
import { AbstractAudioRenderer } from './abstract_audio_renderer.js';
import { personalityMarkup } from './audio_util.js';
import { AuditoryDescription } from './auditory_description.js';

export class StringRenderer extends AbstractAudioRenderer {

  /**
   * @override
   */
  public markup(descrs: AuditoryDescription[]) {
    let str = '';
    const markup = personalityMarkup(descrs);
    const clean = markup.filter((x) => x.span);
    if (!clean.length) {
      return str;
    }
    const len = clean.length - 1;
    for (let i = 0, descr; (descr = clean[i]); i++) {
      if (descr.span) {
        str += this.merge(descr.span);
      }
      if (i >= len) {
        continue;
      }
      const join = descr.join;
      str += typeof join === 'undefined' ? this.separator : join;
    }
    return str;
  }
}

/**
 * Auxiliary rendering to add counter or reference elments for reading output.
 */
export class CountingRenderer extends StringRenderer {

  /**
   * @override
   */
  public finalize(str: string): string {
    const output = super.finalize(str);
    const count = (Engine.getInstance().stringFeatures.get('modality') === 'braille') ?
      '⣿⠀⣿⠀⣿⠀⣿⠀⣿⠀': '0123456789';
    let second = new Array(Math.trunc(output.length / 10) + 1).join(count);
    second += count.slice(0, output.length % 10);
    return output + '\n' + second;
  }

}

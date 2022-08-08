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
 * @file Class for MathLive's SSML rendering of descriptions.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import Engine from '../common/engine';
import { AuditoryDescription } from './auditory_description';
import { Span } from './span';
import { SsmlRenderer } from './ssml_renderer';

export class SsmlStepRenderer extends SsmlRenderer {

  public static MARK_ONCE = false;
  public static MARK_KIND = true;

  private static CHARACTER_ATTR = 'character';

  /**
   * Record for remembering mark ids.
   */
  private static MARKS: { [key: string]: boolean } = {};

  /**
   * @override
   */
  public markup(descrs: AuditoryDescription[]) {
    SsmlStepRenderer.MARKS = {};
    return super.markup(descrs);
  }

  /**
   * @override
   */
  public merge(spans: Span[]): string {
    const result = [];
    // Keeping the last mark is necessary to combine consecutive marks.
    let lastMark = '';
    for (let i = 0; i < spans.length; i++) {
      const span = spans[i];
      const kind = SsmlStepRenderer.MARK_KIND ? span.attributes['kind'] : '';
      const id = Engine.getInstance().automark ?
        span.attributes['id'] :
        span.attributes['extid'];
      if (id && id !== lastMark &&
        !(SsmlStepRenderer.MARK_ONCE && SsmlStepRenderer.MARKS[id])) {
        result.push(kind ?
          `<mark name="${id}" kind="${kind}"/>` : `<mark name="${id}"/>`);
        lastMark = id;
        SsmlStepRenderer.MARKS[id] = true;
      }
      if (span.speech.length === 1 && span.speech.match(/[a-zA-Z]/)) {
        result.push(
          '<say-as interpret-as="' +
            SsmlStepRenderer.CHARACTER_ATTR +
            '">' +
            span.speech +
            '</say-as>'
        );
      } else {
        result.push(span.speech);
      }
    }
    return result.join(this.getSeparator());
  }
}

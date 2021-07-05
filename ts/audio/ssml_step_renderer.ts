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
 * @fileoverview Class for MathLive's SSML rendering of descriptions.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */


import {AuditoryDescription} from './auditory_description';
import {Span} from './span';
import {SsmlRenderer} from './ssml_renderer';


export class SsmlStepRenderer extends SsmlRenderer {


  private static CHARACTER_ATTR: string = 'character';

  /**
   * Record for remembering mark ids.
   */
  private static MARKS: {[key: string]: boolean} = {};


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
    let result = [];
    for (let i = 0; i < spans.length; i++) {
      let span = spans[i];
      let id = span.attributes['extid'];
      if (id && !SsmlStepRenderer.MARKS[id]) {
        result.push('<mark name="' + id + '"/>');
        SsmlStepRenderer.MARKS[id] = true;
      }
      if (span.speech.length === 1 && span.speech.match(/[a-zA-Z]/)) {
        result.push(
            '<say-as interpret-as="' + SsmlStepRenderer.CHARACTER_ATTR + '">' +
            span.speech + '</say-as>');
      } else {
        result.push(span.speech);
      }
    }
    return result.join(this.getSeparator());
  }

}

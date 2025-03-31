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
 * @file Class for SSML rendering of descriptions.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import { Engine } from '../common/engine.js';
import * as EngineConst from '../common/engine_const.js';
import { Pause } from './audio_util.js';
import { AuditoryDescription } from './auditory_description.js';
import { Span } from './span.js';
import { XmlRenderer } from './xml_renderer.js';

// New options:
// Marking, automarking, character marking, pausing auto removed start/end
export class SsmlRenderer extends XmlRenderer {
  /**
   * @override
   */
  public finalize(str: string) {
    return (
      '<?xml version="1.0"?><speak version="1.1"' +
      ' xmlns="http://www.w3.org/2001/10/synthesis"' +
      ` xml:lang="${Engine.getInstance().locale}">` +
      '<prosody rate="' +
      Engine.getInstance().getRate() +
      '%">' +
      this.separator +
      str +
      this.separator +
      '</prosody></speak>'
    );
  }

  /**
   * @override
   */
  public pause(pause: Pause) {
    return (
      '<break ' +
      'time="' +
      this.pauseValue(pause[EngineConst.personalityProps.PAUSE] as string) +
      'ms"/>'
    );
  }

  /**
   * @override
   */
  public prosodyElement(attr: string, value: number) {
    value = Math.floor(this.applyScaleFunction(value));
    const valueStr = value < 0 ? value.toString() : '+' + value.toString();
    return (
      '<prosody ' +
      attr.toLowerCase() +
      '="' +
      valueStr +
      (attr === EngineConst.personalityProps.VOLUME ? '>' : '%">')
    );
  }

  /**
   * @override
   */
  public closeTag(_tag: string) {
    return '</prosody>';
  }

  // Marks have to be unique. That is we cannot mark/highlight a node twice.
  public static MARK_ONCE = false;

  // Output of kind in the mark tag.
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
    SsmlRenderer.MARKS = {};
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
      if (this.isEmptySpan(span)) continue;
      const kind = SsmlRenderer.MARK_KIND ? span.attributes['kind'] : '';
      const id = Engine.getInstance().automark
        ? span.attributes['id']
        : Engine.getInstance().mark
          ? span.attributes['extid']
          : '';
      // TODO:
      //   * combine say as character
      //   * mark again with kind?
      if (
        id &&
        id !== lastMark &&
        !(SsmlRenderer.MARK_ONCE && SsmlRenderer.MARKS[id])
      ) {
        result.push(
          kind ? `<mark name="${id}" kind="${kind}"/>` : `<mark name="${id}"/>`
        );
        lastMark = id;
        SsmlRenderer.MARKS[id] = true;
      }
      if (
        Engine.getInstance().character &&
        span.speech.length === 1 &&
        span.speech.match(/[a-zA-Z]/)
      ) {
        result.push(
          '<say-as interpret-as="' +
            SsmlRenderer.CHARACTER_ATTR +
            '">' +
            span.speech +
            '</say-as>'
        );
      } else {
        result.push(span.speech);
      }
    }
    return result.join(this.separator);
  }

  /**
   * Predicate to test if a span is empty.
   *
   * @param span The span in question.
   * @returns True if span is empty.
   */
  private isEmptySpan(span: Span) {
    const sep = span.attributes['separator'];
    return span.speech.match(/^\s*$/) && (!sep || sep.match(/^\s*$/));
  }
}

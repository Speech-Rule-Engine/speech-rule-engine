//
// Copyright 2014-21 Volker Sorge
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
 * @file Rule store for braille rules.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

//
// This work was sponsored by BTAA (Big Ten Academic Alliance).
//

import { AuditoryDescription } from '../audio/auditory_description.js';
import { activate } from '../semantic_tree/semantic_annotations.js';
import { MathStore } from './math_store.js';

/**
 * Braille rule store.
 */
export class BrailleStore extends MathStore {
  /**
   * @override
   */
  public modality = 'braille';

  /**
   * @override
   */
  public customTranscriptions = { '\u22ca': '⠈⠡⠳' };

  /**
   * @override
   */
  public evaluateString(str: string) {
    const descs: AuditoryDescription[] = [];
    const text = Array.from(str);
    for (let i = 0; i < text.length; i++) {
      descs.push(this.evaluateCharacter(text[i]));
    }
    return descs;
  }

  /**
   * @override
   */
  public annotations() {
    for (let i = 0, annotator; (annotator = this.annotators[i]); i++) {
      activate(this.locale, annotator);
    }
  }
}

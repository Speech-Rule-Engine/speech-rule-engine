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

import { MathStore } from './math_store';
import { AuditoryDescription } from '../audio/auditory_description';
import { activate } from '../semantic_tree/semantic_annotations';
import { SemanticMap } from '../semantic_tree/semantic_attr';
import { SemanticType } from '../semantic_tree/semantic_meaning';

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
  public customTranscriptions: {[key: string]: string} = {
    '\u22ca': '⠈⠡⠳'
  };

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

/**
 * Euro Braille rule store.
 */
export class EuroStore extends BrailleStore {
  /**
   * @override
   */
  public locale = 'euro';

  /**
   * @override
   */
  public customTranscriptions = { };

  public customCommands: {[key: string]: string} = {
    '\\cdot': '*'
  }

  /**
   * @override
   */
  public evaluateString(str: string) {
    const regexp = /(\\[a-z]+)/i;
    let split = str.split(regexp);
    return super.evaluateString(this.cleanup(split).join(''));
  }

  protected cleanup(commands: string[]): string[] {
    let result: string[] = [];
    for (let command of commands) {
      if (command.match(/^\\/)) {
        let custom = this.customCommands[command];
        result.push(custom ? custom : command);
        continue;
      }
      command.split('').forEach(x => {
        let meaning = SemanticMap.Meaning.get(x);
        if (meaning.type === SemanticType.OPERATOR ||
          meaning.type === SemanticType.RELATION) {
          let last = result.pop();
          if (last) {
            // Makes sure we only have one space before relations/operators.
            result.push(last.trimEnd());
            result.push('⠀');
          }
        }
        result.push(x);
      });
    }
    return result;
  }

}

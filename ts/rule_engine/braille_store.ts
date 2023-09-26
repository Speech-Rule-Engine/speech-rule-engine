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

import { MathStore } from './math_store.js';
import { AuditoryDescription } from '../audio/auditory_description.js';
import { activate } from '../semantic_tree/semantic_annotations.js';
import { SemanticMap } from '../semantic_tree/semantic_attr.js';
import { SemanticType, SemanticRole } from '../semantic_tree/semantic_meaning.js';

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
  public customTranscriptions: { [key: string]: string } = {
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
  public customTranscriptions = {};

  public customCommands: {[key: string]: string} = {
    '\\cdot': '*',
    '\\lt': '<',
    '\\gt': '>'
  }

  /**
   * @override
   */
  public evaluateString(str: string) {
    const regexp = /(\\[a-z]+|\\{|\\}|\\\\)/i;
    let split = str.split(regexp);
    let cleaned = this.cleanup(split);
    return super.evaluateString(cleaned);
  }


  /**
   * Cleaning up the command sequence:
   * * Remove unnecessary spaces.
   * * Replace commands if necessary.
   * * Add spaces before relations and operators.
   * * Add spaces between two consecutive commands.
   *
   * @param commands The list of commands and intermediate strings.
   * @return A string with the cleanedup latex expression.
   */
  protected cleanup(commands: string[]): string {
    let cleaned: string[] = [];
    let intext = false;
    let lastcom = null;
    for (let command of commands) {
      if (command.match(/^\\/)) {
        if (command === '\\text') {
          intext = true;
        }
        if (this.addSpace(SemanticMap.LatexCommands.get(command))) {
          cleaned.push(' ');
        }
        command = this.customCommands[command] || command;
        let newcom = command.match(/^\\/);
        if (newcom && command.match(/^\\[a-zA-Z]+$/) && lastcom) {
          cleaned.push(' ');
        }
        lastcom = newcom ? command : null;
        cleaned.push(command);
        continue;
      }
      let rest = command.split('');
      for (let char of rest) {
        // TODO (Euro): This is still rather naive.
        if (intext) {
          cleaned.push(char);
          intext = char !== '}';
          lastcom = null;
          continue;
        }
        if (char.match(/[a-z]/i) && lastcom) {
          lastcom = null;
          cleaned.push(' ');
          cleaned.push(char);
          continue;
        }
        if (char.match(/\s/)) continue;
        if (this.addSpace(char)) {
          cleaned.push(' ');
        }
        cleaned.push(char);
        lastcom = null;
      }
    }
    return cleaned.join('');
  }

  private lastSpecial = false;
  private specialChars = ['^', '_', '{', '}'];

  /**
   * Determines if spaces should be added.
   *
   * @param char The character.
   * @return True if a space should be added before the character.
   */
  private addSpace(char: string): boolean {
    if (!char) return false;
    if (this.specialChars.indexOf(char) !== -1) {
      this.lastSpecial = true;
      return false;
    }
    if (this.lastSpecial) {
      this.lastSpecial = false;
      return false;
    }
    let meaning = SemanticMap.Meaning.get(char);
    return meaning.type === SemanticType.OPERATOR ||
      meaning.type === SemanticType.RELATION ||
      (meaning.type === SemanticType.PUNCTUATION &&
        meaning.role === SemanticRole.COLON);
  }
}

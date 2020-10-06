//
// Copyright 2019 Volker Sorge
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//      http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Abstract class for test cases of single characters.
 * @author Volker.Sorge@gmail.com (Volker Sorge)
 */

import {sre} from '../base/test_external';
import {SpeechTest} from './speech_test';

export class SymbolTest extends SpeechTest {

  public styles: string[] = [];

  public type: string = 'character';

  public pickFields = ['name', 'expected'];
  constructor() {
    super();
  }

  /**
   * Tests speech translation for single characters.
   * @param char The Unicode character.
   * @param answers List of expected speech translations for each
   *     available style.
   */
  public executeCharTest(char: string, answers: string[]) {
    for (let i = 0; i < answers.length; i++) {
      try {
        this.executeTest(char, answers[i], this.styles[i]);
      } catch (err) {
        console.info('\nFailed Character: ' + char + ' (' +
          this.domain + '.' + this.styles[i] + ')');
        throw err;
      }
    }
  }

  /**
   * Execute test for a single unit string.
   * @param char The character or string representing the unit.
   * @param answers A list of answers.
   */
  public executeUnitTest(char: string, answers: string[]) {
    sre.Grammar.getInstance().pushState({annotation: 'unit'});
    try {
      this.executeCharTest(char, answers);
    } catch (err) {
      throw err;
    } finally {
      sre.Grammar.getInstance().popState();
    }
  }

  /**
   * @override
   */
  public executeTest(text: string, answer: string, style?: string) {
    style = style || this.style;
    sre.SpeechRuleEngine.getInstance().clearCache();
    sre.System.getInstance().setupEngine(
      {domain: this.domain, style: style,
       modality: this.modality, rules: this.rules, locale: this.locale});
    let actual = this.getSpeech(text);
    let expected = this.actual ? actual : answer;
    this.appendRuleExample(text, expected, style);
    this.assert.equal(actual, expected);
  }

  /**
   * @override
   */
  public getSpeech(text: string) {
    let aural = sre.AuralRendering.getInstance();
    let descrs = [sre.AuditoryDescription.create(
      {text: text}, {adjust: true, translate: true})];
    return aural.finalize(aural.markup(descrs));
  }

  /**
   * @override
   */
  public prepare() {
    try {
      super.prepare();
    } catch (e) {
      throw e;
    } finally {
      this.styles = this.jsonTests.styles || [];
      this.type = this.baseTests.type || 'character';
    }
  }

  /**
   * @override
   */
  public method(...args: any[]) {
    this.type === 'unit' ? this.executeUnitTest(args[0], args[1]) :
      this.executeCharTest(args[0], args[1]);
  }
}

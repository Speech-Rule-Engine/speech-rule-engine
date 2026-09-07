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
 * @file Abstract class for test cases of single characters.
 * @author Volker.Sorge@gmail.com (Volker Sorge)
 */

import * as DomUtil from '#js/common/dom_util.js';
import * as System from '#js/common/system.js';
import { SpeechRuleEngine } from '#js/rule_engine/speech_rule_engine.js';
import { Grammar } from '#js/rule_engine/grammar.js';
import { cleanupUeb } from '#js/rule_engine/braille_store.js';
import * as AuralRendering from '#js/audio/aural_rendering.js';
import { AuditoryDescription } from '#js/audio/auditory_description.js';

import { SpeechTest } from './speech_test.js';

export class SymbolTest extends SpeechTest {
  /**
   * The type of symbol that is tested.
   */
  public kind = 'character';

  /**
   * A grammar annotation.
   */
  public grammar: { [name: string]: string | boolean } = {};

  /**
   * @override
   */
  public pickFields = ['name', 'key', 'expected', 'style', 'domain'];

  /**
   * @override
   */
  public executeTest(text: string, answer: string, style?: string) {
    style = style || this.style;
    System.setupEngine({
      domain: this.domain,
      style: style,
      modality: this.modality,
      locale: this.locale
    });
    const actual = this.getSpeech(text);
    const expected = this.actual ? actual : answer;
    this.appendRuleExample(text, expected, style, this.domain);
    this.assert.equal(actual, expected);
  }

  /**
   * @override
   */
  public getSpeech(text: string) {
    let descrs = [];
    if (this.modality === 'braille') {
      if (text.match(/^\s+$/)) {
        // TODO: This is just a temporary fix.
        return '⠀';
      }
      const node = DomUtil.parseInput('<mi></mi>');
      node.textContent = text;
      const evaluator = SpeechRuleEngine.getInstance().getEvaluator(
        this.locale,
        this.modality
      );
      descrs = evaluator(node);
    } else {
      descrs = [
        AuditoryDescription.create(
          { text: text },
          { adjust: true, translate: true }
        )
      ];
    }
    const result = AuralRendering.finalize(AuralRendering.markup(descrs));
    return this.locale === 'ueb' && this.modality === 'braille'
      ? cleanupUeb(result)
      : result;
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
      this.kind = this.baseTests.type || this.jsonTests.type || 'character';
      this.grammar =
        this.baseTests.grammar || this.jsonTests.grammar || this.grammar;
    }
  }

  /**
   * @override
   */
  public method() {
    const key = this.field('key') ? this.field('key') : this.field('name');
    this.domain = this.field('domain') || this.domain;
    this.executeTest(key, this.field('expected'), this.field('style'));
  }

  /**
   * @override
   */
  public async setUpTest() {
    Grammar.getInstance().pushState(Object.assign({}, this.grammar));
    return super.setUpTest();
  }

  /**
   * @override
   */
  public async tearDownTest() {
    Grammar.getInstance().popState();
    return super.tearDownTest();
  }
}

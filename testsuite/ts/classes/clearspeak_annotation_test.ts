//
// Copyright 2017 Volker Sorge
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

// With support from the Mozilla Foundation under a MOSS grant.

/**
 * @file Test simple annotations for Clearspeak.
 * @author Volker.Sorge@gmail.com (Volker Sorge)
 */

import { annotators } from '../../speech-rule-engine/js/semantic_tree/semantic_annotations.js';
import { Engine } from '../../speech-rule-engine/js/common/engine.js';
import * as Semantic from '../../speech-rule-engine/js/semantic_tree/semantic.js';
import { ClearspeakPreferences } from '../../speech-rule-engine/js/speech_rules/clearspeak_preferences.js';
import * as System from '../../speech-rule-engine/js/common/system.js';
import * as Enrich from '../../speech-rule-engine/js/enrich_mathml/enrich.js';
import { DummySpeechGenerator } from '../../speech-rule-engine/js/speech_generator/dummy_speech_generator.js';

import { AbstractJsonTest } from './abstract_test.js';

export class ClearspeakAnnotationTest extends AbstractJsonTest {
  /**
   * @override
   */
  public information = 'Clearspeak Simple Expression tests.';

  /**
   * The clearspeak annotator to test.
   */
  public annotator: any = annotators.get('clearspeak:simple');

  /**
   * Tests simple annotator for Clearspeak.
   *
   * @param mml Snippet of a MathML expression.
   * @param expected The expression is simple or not.
   */
  public executeTest(mml: string, expected: boolean) {
    const mathMl =
      '<math xmlns="http://www.w3.org/1998/Math/MathML">' + mml + '</math>';
    const semantic = Semantic.getTreeFromString(mathMl, Engine.getInstance().options);
    this.annotator.annotate(semantic.root);
    this.assert.equal(
      semantic.root.hasAnnotation('clearspeak', 'simple'),
      expected
    );
  }

  /**
   * @override
   */
  public method() {
    this.executeTest(this.field('input'), this.field('expected'));
  }
}


export class ClearspeakPreferencesTest extends AbstractJsonTest {
  /**
   * @override
   */
  public information = 'Clearspeak Preference tests.';

  /**
   * Tests simple annotator for Clearspeak.
   *
   * @param mml Snippet of a MathML expression.
   * @param expected The expression is simple or not.
   */
  public executeTest(mml: string, expected: boolean, id?: number) {
    const mathMl =
      '<math xmlns="http://www.w3.org/1998/Math/MathML">' + mml + '</math>';
    const semantic = Semantic.getTreeFromString(mathMl, Engine.getInstance().options);
    this.assert.equal(
      ClearspeakPreferences.relevantPreferences(
        (id == null) ? semantic.root :
          semantic.root.querySelectorAll((x) => x.id === id)[0]),
      expected
    );
  }

  /**
   * @class
   */
  public constructor() {
    super();
    this.pickFields.push('id');
  }

  /**
   * @override
   */
  public async setUpTest() {
    await super.setUpTest();
    return System.setupEngine({
      domain: 'clearspeak'
    });
  }

  /**
   * @override
   */
  public method() {
    this.executeTest(
      this.field('input'), this.field('expected'), this.field('id')
    );
  }
}

export class NextStyleTest extends AbstractJsonTest {
  /**
   * @override
   */
  public information = 'Next Style and Preference tests.';

  public domain = 'clearspeak';
  /**
   * Tests simple annotator for Clearspeak.
   *
   * @param mml Snippet of a MathML expression.
   * @param expected The expression is simple or not.
   */
  public executeTest(mml: string, expected: boolean, id?: number) {
    const mathMl =
      '<math xmlns="http://www.w3.org/1998/Math/MathML">' + mml + '</math>';
    const emml = Enrich.semanticMathmlSync(mathMl, Engine.getInstance().options);
    const generator = new DummySpeechGenerator();
    generator.setOptions({
      locale: 'en',
      modality: this.field('modality') || 'speech',
      style: 'default',
      domain: this.field('domain') || this.domain
    });
    generator.computeRebuilt(emml);
    this.assert.deepEqual(this.styleSequence(generator, id), expected);
  }

  private styleSequence(generator: DummySpeechGenerator, id: number) {
    const sid = (id == null ? generator.getRebuilt().stree.root.id : id).toString();
    const result: string[] = [];
    let style;
    do {
      generator.nextStyle(sid);
      style = generator.getOptions().style;
      result.push(style);
    } while (!style.match('_Auto') && style !== 'default')
    return result;
  }

  /**
   * @class
   */
  public constructor() {
    super();
    this.pickFields.push('id');
    this.pickFields.push('domain');
    this.pickFields.push('modality');
  }

  /**
   * @override
   */
  public async setUpTest() {
    await super.setUpTest();
    return System.setupEngine({
      domain: this.field('domain')
    });
  }

  /**
   * @override
   */
  public prepare() {
    super.prepare();
    this.domain = this.jsonTests.domain || this.domain;
  }

  /**
   * @override
   */
  public method() {
    this.executeTest(
      this.field('input'), this.field('expected'), this.field('id')
    );
  }
}

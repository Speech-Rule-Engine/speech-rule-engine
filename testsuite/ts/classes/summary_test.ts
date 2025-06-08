//
// Copyright (c) 2019 Volker Sorge
//
//
// Copyright (c) 2019 The MathJax Consortium
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
 * @file Testcases for summary speech generation.
 * @author v.sorge@mathjax.org (Volker Sorge)
 */

import * as ProcessorFactory from '../../speech-rule-engine/js/common/processor_factory.js';
import { Key } from './keycodes.js';

import { SpeechTest } from './speech_test.js';

export class SummaryTest extends SpeechTest {
  /**
   * @override
   */
  public information = 'Summary Rule tests.';

  /**
   * @override
   */
  public domain = 'mathspeak';

  /**
   * @override
   */
  public modality = 'speech';

  /**
   * Keyboard steps preceding speech computation.
   */
  public steps: string[] = null;

  /**
   * Summary tests class.
   *
   * @class
   */
  public constructor() {
    super();
    this.pickFields.push('steps');
  }

  /**
   * @override
   */
  public getSpeech(mathMl: string) {
    ProcessorFactory.process('walker', mathMl);
    if (this.steps) {
      this.steps.forEach((step) => {
        ProcessorFactory.process('move', Key.get(step) as any);
      });
    }
    return this.computeSpeech();
  }

  /**
   * @param _mathMl The original input.
   * @returns Computes the speech output.
   */
  protected computeSpeech(): string {
    return ProcessorFactory.process('move', Key.get('X') as any) as string;
  }

  /**
   * @override
   */
  public method() {
    this.steps = this.field('steps');
    super.method();
    this.steps = null;
  }
}

export class SummarySpeechTest extends SummaryTest {
  /**
   * @override
   */
  protected computeSpeech(): string {
    return ProcessorFactory.process('move', Key.get('TAB') as any) as string;
  }
}

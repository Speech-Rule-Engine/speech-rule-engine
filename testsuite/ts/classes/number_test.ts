//
// Copyright (c) 2021 Volker Sorge
//
//
// Copyright (c) 2021 The MathJax Consortium
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
 * @file Testcases for number words.
 * @author v.sorge@mathjax.org (Volker Sorge)
 */

import { LOCALE } from '../../speech-rule-engine/js/l10n/locale.js';

import { SpeechTest } from './speech_test.js';

export class NumberTest extends SpeechTest {
  protected num = 1;

  private kind = 'numberToWords';

  /**
   * @override
   */
  public method() {
    this.num =
      this.field('input') === undefined ? 0 : parseInt(this.field('input'), 10);
    this.executeTest(
      this.field('input'),
      this.field('expected'),
      this.field('preference')
    );
  }

  /**
   * @override
   */
  public prepare() {
    super.prepare();
    this.kind = this.jsonTests.kind || this.kind;
  }

  /**
   * @override
   */
  public getSpeech(_mml: string) {
    return (LOCALE.NUMBERS as any)[this.kind](this.num);
  }

  /**
   * @override
   */
  public appendRuleExample(
    _input: string,
    output: string,
    style: string,
    ...rest: string[]
  ) {
    super.appendRuleExample(this.num.toString(), output, style, ...rest);
  }
}

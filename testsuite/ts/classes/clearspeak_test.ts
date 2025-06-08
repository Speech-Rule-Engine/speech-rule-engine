//
// Copyright 2019 Volker Sorge
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
 * @file Abstract class for clearspeak rule tests.
 * @author Volker.Sorge@gmail.com (Volker Sorge)
 */

import * as EngineConst from '../../speech-rule-engine/js/common/engine_const.js';
import * as System from '../../speech-rule-engine/js/common/system.js';

import { SpeechTest } from './speech_test.js';

export class ClearspeakTest extends SpeechTest {
  /**
   * @override
   */
  public domain = 'clearspeak';

  /**
   * @override
   */
  public async setUpTest() {
    await super.setUpTest();
    return System.setupEngine({ markup: EngineConst.Markup.PUNCTUATION });
  }

  /**
   * @override
   */
  public async tearDownTest() {
    await System.setupEngine({ markup: EngineConst.Markup.NONE });
    return super.tearDownTest();
  }
}

export class SpeechMarkupTest extends ClearspeakTest {

  /**
   * The markup to use.
   */
  public markup: string = EngineConst.Markup.SSML;

  protected automark: boolean = true;

  /**
   * @override
   */
  public async setUpTest() {
    await super.setUpTest();
    return System.setupEngine({
      automark: this.automark,
      cleanpause: true,
      markup: this.markup
    });
  }

  /**
   * @override
   */
  public prepare() {
    super.prepare();
    this.markup = this.jsonTests.markup || this.markup;
    this.automark = this.jsonTests.automark || this.automark;
  }

}

export class BrailleLayoutTest extends SpeechTest {
  /**
   * @override
   */
  public domain = 'nemeth';

  /**
   * @override
   */
  public async setUpTest() {
    await super.setUpTest();
    return System.setupEngine({ markup: EngineConst.Markup.LAYOUT });
  }

  /**
   * @override
   */
  public async tearDownTest() {
    await System.setupEngine({ markup: EngineConst.Markup.NONE });
    return super.tearDownTest();
  }

  /**
   * @override
   */
  public appendRuleExample(
    input: string,
    output: string,
    style: string,
    ...rest: string[]
  ) {
    output = output.replace(/\n/g, '<br>\n');
    super.appendRuleExample(input, output, style, ...rest);
  }
}

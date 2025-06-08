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
// Partially funded by the Diagram Project.

/**
 * @file Tests of markup output.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import * as EngineConst from '../../speech-rule-engine/js/common/engine_const.js';
import * as System from '../../speech-rule-engine/js/common/system.js';
import * as AuralRendering from '../../speech-rule-engine/js/audio/aural_rendering.js';

import { AbstractJsonTest } from '../classes/abstract_test.js';

export class MarkupTest extends AbstractJsonTest {
  /**
   * The quadratic equation as a MathML string with some external markup.
   */
  public static QUADRATIC: string =
    '<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">' +
    '<mi extid="0">x</mi>' +
    '<mo extid="1">=</mo>' +
    '<mfrac extid="3">' +
    '<mrow extid="4">' +
    '<mo extid="5">&#x2212;<!-- − --></mo>' +
    '<mi extid="6">b</mi>' +
    '<mo extid="7">&#x00B1;<!-- ± --></mo>' +
    '<msqrt extid="8">' +
    '<msup extid="9">' +
    '<mi extid="10">b</mi>' +
    '<mn extid="11">2</mn>' +
    '</msup>' +
    '<mo extid="12">&#x2212;<!-- − --></mo>' +
    '<mn extid="13">4</mn>' +
    '<mi extid="14">a</mi>' +
    '<mi extid="15">c</mi>' +
    '</msqrt>' +
    '</mrow>' +
    '<mrow extid="16">' +
    '<mn extid="17">2</mn>' +
    '<mi extid="18">a</mi>' +
    '</mrow>' +
    '</mfrac>' +
    '</math>';

  private defaults: {[key: string]: boolean} = {
    automark: false,
    mark: false,
    character: false,
    cleanpause: false
  }

  /**
   * @override
   */
  public constructor() {
    super();
    this.pickFields.push('markup', 'domain', 'options');
  }

  /**
   * @override
   */
  public async setUpTest() {
    await super.setUpTest();
    return System.setupEngine({
      modality: 'speech',
      locale: 'en',
      style: 'default'
    });
  }

  /**
   * @override
   */
  public async tearDownTest() {
    await System.setupEngine({ markup: EngineConst.Markup.NONE });
    return super.tearDownTest();
  }

  /**
   * Executes single markup tests.
   *
   * @param expr The input expression.
   * @param result The expected result.
   * @param markup The markup to test.
   * @param domain The domain for the engine.
   */
  public executeTest(
    expr: string,
    result: string,
    markup: string,
    domain: string,
    options: {[key: string]: boolean}
  ) {
    expr = expr || MarkupTest.QUADRATIC;
    const features = Object.assign({}, {
      domain: domain || 'default',
      markup: markup ? markup.toLowerCase() : EngineConst.Markup.NONE
    }, this.defaults, options);
    System.setupEngine(features)
    const descrs = System.toDescription(expr);
    const output = AuralRendering.markup(descrs);
    this.assert.equal(output, result);
  }

  /**
   * @override
   */
  public method() {
    this.executeTest(
      ...(this.pickFields.map((x) => this.field(x)) as [
        string,
        string,
        string,
        string,
        {[key: string]: boolean}
      ])
    );
  }
}

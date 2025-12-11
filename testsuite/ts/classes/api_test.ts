//
// Copyright 2016 Volker Sorge
//
//
// Copyright (c) 2016 The MathJax Consortium
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
 * @file Tests of API functions.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import * as EngineConst from '#js/common/engine_const.js';
import * as System from '#js/common/system.js';
import {
  deactivate
} from '#js/semantic_tree/semantic_annotations.js';
import { Key } from './keycodes.js';

import { AbstractJsonTest } from './abstract_test.js';
import { jest, expect } from '@jest/globals';

enum Expression {
  Quadratic = 'quadratic',
  Square = 'square',
  Maction = 'maction',
  Href = 'href'
}

const Samples: Record<Expression, string> = {
  [Expression.Quadratic]:
  '<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">' +
    '<mi>x</mi>' +
    '<mo>=</mo>' +
    '<mfrac>' +
    '<mrow>' +
    '<mo>&#x2212;<!-- − --></mo>' +
    '<mi>b</mi>' +
    '<mo>&#x00B1;<!-- ± --></mo>' +
    '<msqrt>' +
    '<msup>' +
    '<mi>b</mi>' +
    '<mn>2</mn>' +
    '</msup>' +
    '<mo>&#x2212;<!-- − --></mo>' +
    '<mn>4</mn>' +
    '<mi>a</mi>' +
    '<mi>c</mi>' +
    '</msqrt>' +
    '</mrow>' +
    '<mrow>' +
    '<mn>2</mn>' +
    '<mi>a</mi>' +
    '</mrow>' +
    '</mfrac>' +
    '</math>',
  [Expression.Square]:
  '<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">' +
    '<msup>' +
    '<mi>x</mi>' +
    '<mn>2</mn>' +
    '</msup>' +
    '</math>',
  [Expression.Maction]: 
  '<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">' +
    '<maction actiontype="toggle" selection="2" data-collapsible="true" id="mjx-collapse-0">' +
    '<mtext>&#x25C2;f()&#x25B8;</mtext>' +
    '<mrow>' +
    '<mi>f</mi>' +
    '<mo>&#x2061;</mo>' +
    '<maction actiontype="toggle" selection="2" data-collapsible="true" id="mjx-collapse-1">' +
    '<mtext>&#x25C2;()&#x25B8;</mtext>' +
    '<mrow>' +
    '<mo stretchy="false">(</mo>' +
    '<mrow>' +
    '<mi>a</mi>' +
    '<mo>+</mo>' +
    '<mi>b</mi>' +
    '<mo>+</mo>' +
    '<mi>c</mi>' +
    '<mo>+</mo>' +
    '<mi>d</mi>' +
    '</mrow>' +
    '<mo stretchy="false">)</mo>' +
    '</mrow>' +
    '</maction>' +
    '</mrow>' +
    '</maction>' +
    '</math>',
  [Expression.Href]:
  '<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">' +
    '<mrow href="c">' +
    '<mi href="a">a</mi>' +
    '<mo>+</mo>' +
    '<mi href="b">b</mi>' +
    '</mrow>' +
    '</math>'
}

export class ApiTest extends AbstractJsonTest {
  /**
   * Feature vector for setting up the engine.
   */
  public static SETUP: { [key: string]: string | boolean } = {
    domain: 'mathspeak',
    style: 'default',
    modality: 'speech',
    speech: EngineConst.Speech.NONE
  };

  /**
   * @override
   */
  public information = 'API function test.';

  /**
   * @override
   */
  public pickFields = ['type', 'input', 'expected', 'setup', 'json', 'move'];

  /**
   * @override
   */
  public async setUpTest() {
    deactivate('nemeth', 'number');
    return System.setupEngine({
      locale: 'en'
    });
  }

  /**
   * The sample equations.
   */
  protected static SAMPLES: Record<Expression, string> = Samples;

  /*
   * Quadratic equation as a MathML string. By default tests are run against
   * the quadratic equation unless a different input is provided.
   */
  protected getSample(expr: Expression) {
    return ApiTest.SAMPLES[expr] || ApiTest.SAMPLES[Expression.Quadratic];
  }

  /**
   * Executes single API tests.
   *
   * @param func The API function to test.
   * @param expr The input expression.
   * @param result The expected result.
   * @param feature Feature vector for engine setup.
   * @param json Json output expected?
   * @param move Is this a move with some keyboard input?
   */
  public executeTest(
    func: string,
    input: any,
    result: string | null,
    feature: { [key: string]: string },
    json: boolean,
    move: boolean
  ) {
    System.setupEngine(feature || ApiTest.SETUP);
    const expr = move ? Key.get(input) : this.getSample(input);
    let output = (System as any)[func](expr);
    output = output
      ? json
        ? JSON.stringify(output)
        : output.toString()
      : output;
    this.assert.equal(output, result);
  }

  /**
   * @override
   */
  public async method() {
    await this.executeTest(
      this.field('type'),
      this.field('input'),
      this.field('expected'),
      this.field('setup'),
      this.field('json'),
      this.field('move')
    );
  }
}

import { semanticMathmlSync } from '#js/enrich_mathml/enrich.js';

export class WorkerTest extends ApiTest {

  /**
   * Executes single API tests.
   *
   * @param func The API function to test.
   * @param expr The input expression.
   * @param result The expected result.
   * @param feature Feature vector for engine setup.
   * @param json Json output expected?
   * @param move Is this a move with some keyboard input?
   */
  public async executeTest(
    func: string,
    input: Expression,
    result: string | null,
    feature: { [key: string]: string },
    json: boolean,
    _move: boolean
  ) {
    const sample = this.getSample(input);
    const options = Object.assign({}, feature, ApiTest.SETUP);
    await System.setupEngine(options);
    const sxml = semanticMathmlSync(sample, options as any);
    let promise = (System as any)[func](sxml.toString(), options);
    promise.catch((err: Error) => console.log(`THIS PROMISE ERROR: ${err}`));
    let output = await promise;
    output = output
      ? json
        ? JSON.stringify(output)
        : output.toString()
      : output;
    this.assert.equal(output, result);
  }

  /**
   * @override
   */
  public async setUpTest() {
    ApiTest.SETUP['locale'] = 'en';
    ApiTest.SETUP['braille'] = 'nemeth';
    return super.setUpTest();
  }

}


export class DebugTest extends ApiTest {

  /**
   * @override
   */
  public information = 'Debugger test.';

  private oldDebug: boolean | string = null;
  
  constructor() {
    super();
    this.pickFields.push('strings');
  }

  /**
   * @override
   */
  public async setUpTest() {
    this.oldDebug = ApiTest.SETUP['debug'] ?? null;
    ApiTest.SETUP['debug'] = true;
    jest.clearAllMocks();
    return super.setUpTest();
  }

  /**
   * @override
   */
  public async tearDownTest(): Promise<string> {
    if (this.oldDebug === null) {
      delete ApiTest.SETUP['debug'];
    } else {
      ApiTest.SETUP['debug'] = this.oldDebug;
    }
    jest.clearAllMocks();
    return super.tearDownTest();
  }

  /**
   * @override
   */
  public async executeTest(
    func: string,
    input: string,
    result: string,
    feature: { [key: string]: string },
    _json: boolean,
    _move: boolean
  ) {
    await System.setupEngine(feature || ApiTest.SETUP);
    console.info = jest.fn();
    await (System as any)[func](input);
    expect(console.info).toHaveBeenCalledTimes(parseInt(result, 10));
    const strings = Object.entries(this.field('strings') as null | { [key: string]: string[]});
    for (let [index, res] of strings) {
      expect(console.info).
        toHaveBeenNthCalledWith(parseInt(index, 10), "Speech Rule Engine Debugger:", ...res);
    }
  }

}

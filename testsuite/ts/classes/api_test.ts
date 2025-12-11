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
   * The quadratic equation as a MathML string. By default tests are run against
   * the quadratic equation unless a different input is provided.
   */
  public static QUADRATIC: string;

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
    expr: any,
    result: string | null,
    feature: { [key: string]: string },
    json: boolean,
    move: boolean
  ) {
    System.setupEngine(feature || ApiTest.SETUP);
    expr = move ? Key.get(expr) : expr || ApiTest.QUADRATIC;
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

ApiTest.QUADRATIC =
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
  '</math>';


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
    expr: string,
    result: string | null,
    feature: { [key: string]: string },
    json: boolean,
    _move: boolean
  ) {
    expr = expr || ApiTest.QUADRATIC;
    const options = Object.assign({}, feature, ApiTest.SETUP);
    await System.setupEngine(options);
    const sxml = semanticMathmlSync(expr, options as any);
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


  constructor() {
    super();
    this.pickFields.push('strings');
  }

  /**
   * @override
   */
  public async setUpTest() {
    ApiTest.SETUP['debug'] = true;
    jest.clearAllMocks();
    return super.setUpTest();
  }

  /**
   * @override
   */
  public async tearDownTest(): Promise<string> {
    ApiTest.SETUP['debug'] = false;
    jest.clearAllMocks();
    return super.tearDownTest();
  }

  /**
   * @override
   */
  public async executeTest(
    func: string,
    expr: any,
    result: string,
    feature: { [key: string]: string },
    _json: boolean,
    move: boolean
  ) {
    await System.setupEngine(feature || ApiTest.SETUP);
    expr = move ? Key.get(expr) : expr || ApiTest.QUADRATIC;
    console.info = jest.fn();
    await (System as any)[func](expr);
    expect(console.info).toHaveBeenCalledTimes(parseInt(result, 10));
    const strings = Object.entries(this.field('strings') as null | { [key: string]: string[]});
    for (let [index, res] of strings) {
      expect(console.info).toHaveBeenNthCalledWith(parseInt(index, 10), "Speech Rule Engine Debugger:", ...res);
    }
  }

}

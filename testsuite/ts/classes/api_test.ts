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
// For the workers
import { semanticMathmlSync } from '#js/enrich_mathml/enrich.js';

// Mocking the filesystem methods.

import { Debugger } from '#js/common/debugger.js';
import { SystemExternal } from '#js/common/system_external.js';

const mockStreamWrite: any = jest.fn();
const mockStreamEnd: any = jest.fn((_data: any, _encoding: any, callback: () => void) => {
  // Simulate stream ending and executing callback
  if (callback) callback();
});
const mockStreamOn: any = jest.fn();
const mockCreateWriteStream: any = jest.fn(() => ({
  write: mockStreamWrite,
  end: mockStreamEnd,
  on: mockStreamOn,
}));

// --- Mock File Handle Component ---
const mockOpen: any = jest.fn((_filename: string, _mode: string) => {
  return Promise.resolve({
  // The file handle needs to provide a method to create a write stream
    createWriteStream: mockCreateWriteStream,
  })});


// Some standard expressions.
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

type FeatureVector = { [key: string]: string | boolean };

export class ApiTest extends AbstractJsonTest {
  /**
   * Feature vector for setting up the engine.
   */
  public static SETUP: FeatureVector  = {
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

  private oldSetup: FeatureVector;

  /**
   * @override
   */
  public async setUpTest() {
    this.oldSetup = Object.assign({}, System.engineSetup());
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
  public async executeTest(
    func: string,
    input: any,
    result: string | null,
    feature: FeatureVector,
    json: boolean,
    move: boolean
  ) {
    await System.setupEngine(feature || ApiTest.SETUP);
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

  /**
   * @override
   */
  public async tearDownTest(): Promise<string> {
    await System.setupEngine(this.oldSetup);
    return super.tearDownTest();
  }

}

export class ApiFileTest extends ApiTest {

  /**
   * Executes single API File tests.
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
    feature: FeatureVector,
    _json: boolean,
    _move: boolean
  ) {
    const sample = this.getSample(input);
    await System.setupEngine(feature || ApiTest.SETUP);
    SystemExternal.fs.promises.readFile = jest.fn((_file: string) => {
      return Promise.resolve(sample);
    });
    SystemExternal.fs.promises.writeFile = jest.fn();
    let promise = (System.file as any)[func]('input', 'output');
    promise.catch((err: Error) => console.log(`THIS PROMISE ERROR: ${err}`));
    let output = await promise;
    this.assert.equal(output.toString(), result);
  }

  /**
   * @override
   */
  public async setUpTest() {
    ApiTest.SETUP['locale'] = 'en';
    ApiTest.SETUP['braille'] = 'nemeth';
    jest.clearAllMocks();
    return super.setUpTest();
  }

}

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
    feature: FeatureVector,
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
    console.info = jest.fn();
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
    feature: FeatureVector,
    _json: boolean,
    _move: boolean
  ) {
    await System.setupEngine(feature || ApiTest.SETUP);
    await (System as any)[func](input);
    expect(console.info).toHaveBeenCalledTimes(parseInt(result, 10));
    const strings = Object.entries(this.field('strings') as null | { [key: string]: string[]});
    for (let [index, res] of strings) {
      expect(console.info).
        toHaveBeenNthCalledWith(parseInt(index, 10), "Speech Rule Engine Debugger:", ...res);
    }
  }

}

export class DebugFileTest extends DebugTest {

  private static testFilename = 'test_debug.log';

  /**
   * @override
   */
  public async setUpTest() {
    SystemExternal.fs.promises.open = mockOpen;
    return super.setUpTest();
  }

  /**
   * @override
   */
  public async executeTest(
    func: string,
    input: string,
    result: string,
    feature: FeatureVector,
    _json: boolean,
    _move: boolean
  ) {
    await Debugger.getInstance().init(DebugFileTest.testFilename);
    await System.setupEngine(feature || ApiTest.SETUP);
    await (System as any)[func](input);
    const strings = Object.entries(this.field('strings') as null | { [key: string]: string[]});
    expect(console.info).toHaveBeenCalledTimes(0);
    expect(mockStreamWrite).toHaveBeenCalledTimes(parseInt(result, 10) * 2);
    expect(mockOpen).toHaveBeenCalledWith(DebugFileTest.testFilename, 'w');
    for (let [index, res] of strings) {
      expect(mockStreamWrite).
        toHaveBeenNthCalledWith(
          ((parseInt(index, 10) - 1) * 2) + 1,
          ["Speech Rule Engine Debugger:", ...res].join(' '));
    }
  }

  /**
   * @override
   */
  public async tearDownTest(): Promise<string> {
    // TODO: change this to exit.
    (Debugger.getInstance() as any).stream_ = null;
    return super.tearDownTest();
  }
}

//
// Copyright 2019-21 Volker Sorge
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @file Processors acting on input/output streams.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import { Highlighter } from '../highlighter/highlighter';
import { SpeechGenerator } from '../speech_generator/speech_generator';
import { Walker } from '../walker/walker';
import { KeyCode } from './event_util';

export class Processor<T> {
  /**
   * A state object for stateful processors.
   */
  public static LocalState: {
    walker: Walker;
    speechGenerator: SpeechGenerator;
    highlighter: Highlighter;
  } = { walker: null, speechGenerator: null, highlighter: null };

  /**
   * processor The actual processing method.
   */
  public process: (p1: string) => T;

  /**
   * postprocessor Optional postprocessing of the result.
   */
  public postprocess: (p1: T, p2: string) => T;

  /**
   * print The printing method. If none is given, defaults to toString().
   */
  public print: (p1: T) => string;

  /**
   * pprint The pretty printing method. If none is given, defaults print.
   */
  public pprint: (p1: T) => string;

  /**
   *  The combined processing method. Runs first the process method followed by
   *  the postprocessor method if the latter exists.
   */
  public processor: (p1: string) => T;

  /**
   * Default method to stringify processed data.
   *
   * @param x Input data.
   * @returns Resulting string.
   */
  private static stringify_<T>(x: T): string {
    return x ? x.toString() : (x as any as string);
  }

  /**
   * Processors bundles a processing method with a collection of output methods.
   *
   * @param name The name of the processor.
   * @param {{processor: function(string): T,
   *          postprocessor: (undefined|function(T, string): T),
   *          print: (undefined|function(T): string),
   *          pprint: (undefined|function(T): string)}} methods
   * @param methods.processor
   * @param methods.postprocessor
   * @param methods.print
   * @param methods.pprint
   */
  constructor(
    public name: string,
    methods: {
      processor: (p1: string) => T;
      postprocessor?: (p1: T, p2: string) => T;
      print?: (p1: T) => string;
      pprint?: (p1: T) => string;
    }
  ) {
    this.process = methods.processor;
    this.postprocess =
      methods.postprocessor || (((x, _y) => x) as (p1: T, p2: string) => T);
    this.processor = this.postprocess
      ? (function (x) {
          return this.postprocess(this.process(x), x);
        } as (p1: string) => T)
      : this.process;
    this.print = methods.print || Processor.stringify_;
    this.pprint = methods.pprint || this.print;
  }
}

export class KeyProcessor<T> extends Processor<T> {
  /**
   * The method handling the keypress.
   */
  public key: (p1: KeyCode | string) => KeyCode;

  /**
   * Default method to stringify input key codes. If the key code is already a
   * string, it is returned.
   *
   * @param key The key code.
   * @returns The corresponding string.
   */
  private static getKey_(key: KeyCode | string): KeyCode {
    return typeof key === 'string'
      ? // TODO (TS): Check if this really works!
        KeyCode[key.toUpperCase() as keyof typeof KeyCode]
      : key;
  }

  /**
   * @param name The name of the processor.
   * @param {{processor: function(string): T,
   *          key: (undefined|function((sre.EventUtil.KeyCode|string)):
   *                              sre.EventUtil.KeyCode),
   *          print: (undefined|function(T): string),
   *          pprint: (undefined|function(T): string)}} methods
   * @override
   */
  constructor(
    name: string,
    methods: {
      processor: (p1: string) => T;
      key?: (p1: KeyCode | string) => KeyCode;
      print?: (p1: T) => string;
      pprint?: (p1: T) => string;
    }
  ) {
    super(name, methods);
    /**
     * Transforms key values into strings.
     */
    this.key = methods.key || KeyProcessor.getKey_;
  }
}

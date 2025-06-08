//
// Copyright 2013 Google Inc.
//
//
// Copyright 2014 Volker Sorge
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
 * @file Testcases for math speech rules. Running directly with Jest.
 * @author sorge@google.com (Volker Sorge)
 */

import { AbstractJsonTest } from './abstract_test.js';
import {
  Component,
  Action
} from '../../speech-rule-engine/js/rule_engine/speech_rule.js';

export class SpeechRuleTest extends AbstractJsonTest {
  private _fromString: Map<string, (p1: string) => any> = new Map([
    ['Grammar', Component.grammarFromString as (p1: string) => any],
    ['Attributes', Component.attributesFromString as (p1: string) => any],
    ['Components', Component.fromString as (p1: string) => any],
    ['Actions', Action.fromString as (p1: string) => any],
    [
      'AttributesList',
      (inp: string) => Component.fromString(inp).getAttributes()
    ]
  ]);

  private _toString = new Map([
    ['Grammar', (inp: any) => inp.grammarToString()],
    ['Attributes', (inp: any) => inp.attributesToString()],
    ['Components', (inp: any) => inp.toString()]
  ]);

  /**
   * @override
   */
  public constructor() {
    super();
    this.pickFields.push('kind', 'string', 'pick');
  }

  /**
   * Test objects for structural equality using JSON, otherwise use
   * normal equality.
   *
   * @param expected Expected value.
   * @param actual The actual computed value.
   */
  public assertStructEquals(expected: any, actual: any) {
    this.assert.deepEqual(
      JSON.parse(JSON.stringify(expected)),
      JSON.parse(JSON.stringify(actual))
    );
  }

  /**
   * @override
   */
  public method() {
    const fromString = this._fromString.get(this.field('kind'));
    if (!fromString) {
      this.assert.fail();
    }
    const received = this.pickComponent(
      fromString(this.field('input')),
      this.field('pick')
    );
    if (this.field('string')) {
      const toString = this._toString.get(this.field('string'));
      if (!toString) {
        this.assert.fail();
      }
      this.assert.equal(toString(received), this.field('expected'));
    } else {
      this.assertStructEquals(received, this.field('expected'));
    }
  }

  /**
   * Picks components from a speech rule element.
   *
   * @param element The element.
   * @param components Components list to pick, as key value pairs. Note that if
   *     the value is -1 the entire component will be picked.
   */
  private pickComponent(element: any, components: [string, string | number][]) {
    if (!components) {
      return element;
    }
    for (const [key, position] of components) {
      element = position === -1 ? element[key] : element[key][position];
    }
    return element;
  }
}

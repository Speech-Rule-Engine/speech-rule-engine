/**
 * @fileoverview Testcases for math speech rules.
 * @author sorge@google.com (Volker Sorge)
 */
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

import {sre} from '../base/test_external';
import {AbstractTest} from '../classes/abstract_test';

export class SpeechRuleTest extends AbstractTest {

  /**
     * @override
     */
  public information = 'Speech rule tests.';
  constructor() {
    super();
  }

  /** Test objects for structural equality using JSON, otherwise use
   * normal equality.
   * @param expected Expected value.
   * @param actual The actual computed value.
   */
  public assertStructEquals(expected: any, actual: any): boolean {
    if (typeof expected == 'object' && typeof actual == 'object') {
      return this.assert.deepEqual(JSON.stringify(expected),
      JSON.stringify(actual));
    }
    return this.assert.deepEqual(expected, actual);
  }

  /** Test speech rule grammar annotations.
   * @export
   */
  public testGrammar() {
    this.assertStructEquals(
    {'font': true,
    'annotation': '"unit"'},
    sre.SpeechRule.Component.grammarFromString(
    'font:annotation="unit"'));
    this.assertStructEquals(
    {'font': false,
    'annotation': '@unit'},
    sre.SpeechRule.Component.grammarFromString(
    '!font:annotation=@unit'));
    // Whitespace test.
    this.assertStructEquals(
    {'font': false,
    'annotation': '@unit'},
    sre.SpeechRule.Component.grammarFromString(
    ' !font : annotation = @unit '));
  }

  /** Test speech rule attributes.
   * @export
   */
  public testAttributes() {
    this.assertStructEquals(
    {'ctxtfunc': 'element',
    'separator': '"plus"',
    'volume': '0.5'},
    sre.SpeechRule.Component.attributesFromString(
    '(ctxtfunc:element,separator:"plus", volume:0.5)'));
    this.assertStructEquals(
    {'context': '"node"',
    'pitch': '0.5',
    'difference': 'true'},
    sre.SpeechRule.Component.attributesFromString(
    '(context:"node",pitch:0.5,difference)'));
    this.assertStructEquals(
    {'context': '"node"',
    'grammar': {
    'font': true,
    'annotation': '"unit"'}},
    sre.SpeechRule.Component.attributesFromString(
    '(context:"node",grammar:font:annotation="unit")'));
    this.assertStructEquals(
    {'grammar': {
    'font': true,
    'annotation': '"unit"'}},
    sre.SpeechRule.Component.attributesFromString(
    '(grammar:font:annotation="unit")'));
    // Whitespace test.
    this.assertStructEquals(
    {'context': '"node"',
    'pitch': '0.5',
    'difference': 'true'},
    sre.SpeechRule.Component.attributesFromString(
    '( context : "node" , pitch : 0.5 , difference )'));
  }

  /** Test simple speech rule components.
   * @export
   */
  public testSimpleComponents() {
    this.assertStructEquals(
    {'type': sre.SpeechRule.Type.MULTI,
    'content': './*'}, sre.SpeechRule.Component.fromString('[m] ./*'));
    this.assertStructEquals({'type': sre.SpeechRule.Type.NODE, 'content': './*[1]'}, sre.SpeechRule.Component.fromString('[n] ./*[1]'));
    this.assertStructEquals({'type': sre.SpeechRule.Type.PERSONALITY, 'attributes': {'pause': '200'}}, sre.SpeechRule.Component.fromString('[p] (pause:200)'));
    this.assertStructEquals({'type': sre.SpeechRule.Type.TEXT, 'content': '"super"'}, sre.SpeechRule.Component.fromString('[t] "super"'));
    this.assertStructEquals({'type': sre.SpeechRule.Type.TEXT, 'content': 'text()'}, sre.SpeechRule.Component.fromString('[t] text()'));
  }
  /** Test speech rule components with attributes.
   * @export
   */
  public testComplexComponents() {
    this.assertStructEquals(
    {'type': sre.SpeechRule.Type.MULTI,
    'content': './*', 'attributes': {'ctxtfunc': 'element', 'separator': '"plus"', 'volume': '0.5'}}, sre.SpeechRule.Component.fromString('[m] ./* (ctxtfunc:element,separator:"plus", volume:0.5)'));
    this.assertStructEquals({'type': sre.SpeechRule.Type.NODE, 'content': './*[1]', 'attributes': {'context': '"node"', 'pitch': '0.5'}}, sre.SpeechRule.Component.fromString('[n] ./*[1] (context:"node",pitch:0.5)'));
    this.assertStructEquals({'type': sre.SpeechRule.Type.NODE, 'content': './*[1]', 'attributes': {'context': '"node"'}, 'grammar': {'font': true, 'annotation': '"unit"'}}, sre.SpeechRule.Component.fromString('[n] ./*[1] (context:"node",grammar:font:annotation="unit")'));
    this.assertStructEquals({'type': sre.SpeechRule.Type.NODE, 'content': './*[1]', 'grammar': {'font': true, 'annotation': '"unit"'}}, sre.SpeechRule.Component.fromString('[n] ./*[1] (grammar:font:annotation="unit")'));
  }
  /** Test speech rules.
   * @export
   */
  public testRules() {
    this.assertStructEquals(
    [
    {'type': sre.SpeechRule.Type.TEXT,
    'content': '"Square root of"'},
    {'type': sre.SpeechRule.Type.NODE,
    'content': './*[1]', 'attributes': {'rate': '0.2'}}, {'type': sre.SpeechRule.Type.PERSONALITY, 'attributes': {'pause': '400'}}], sre.SpeechRule.Action.fromString('[t] "Square root of"; [n] ./*[1] (rate:0.2); [p] (pause:400)').components);
    this.assertStructEquals([{'type': sre.SpeechRule.Type.NODE, 'content': './*[1]/*[1]/*[1]'}, {'type': sre.SpeechRule.Type.TEXT, 'content': '"sub"'}, {'type': sre.SpeechRule.Type.NODE, 'content': './*[1]/*[3]/*[1]', 'attributes': {'pitch': '-0.35'}}, {'type': sre.SpeechRule.Type.PERSONALITY, 'attributes': {'pause': '200'}}, {'type': sre.SpeechRule.Type.TEXT, 'content': '"super"'}, {'type': sre.SpeechRule.Type.NODE,
    'content': './*[1]/*[2]/*[1]', 'attributes': {'pitch': '0.35'}}, {'type': sre.SpeechRule.Type.PERSONALITY, 'attributes': {'pause': '300'}}], sre.SpeechRule.Action.fromString('[n] ./*[1]/*[1]/*[1]; [t] "sub"; [n] ./*[1]/*[3]/*[1] ' + '(pitch:-0.35) ;[p](pause:200); [t] "super";' + '[n] ./*[1]/*[2]/*[1] (pitch:0.35) ;  [p] (pause:300)   ').components);
  }
  /** Test translation of speech rule attributes.
   * @export
   */
  public testAttributesList() {
    this.assertStructEquals(
    ['context:"node"', 'pitch:0.5'],
    sre.SpeechRule.Component.fromString(
    '[n] ./ (context:"node", pitch:0.5)').getAttributes());

    this.assertStructEquals(
    ['ctxtfunc:element', 'separator:"plus"', 'volume:0.5'],
    sre.SpeechRule.Component.fromString(
    '[t] "irrelevant" (ctxtfunc:element,' +
    'separator:"plus",' +
    'volume:0.5)').getAttributes());
  }

  /** Test speech rule grammar annotations.
   * @export
   */
  public testGrammarString() {
    let grammar1 = 'font:annotation="unit"';
    this.assertStructEquals(
    grammar1,
    sre.SpeechRule.Component.fromString('[p] (grammar:' + grammar1 + ')').grammarToString());
    let grammar2 = '!font:annotation=@unit';
    this.assertStructEquals(
    grammar2,
    sre.SpeechRule.Component.fromString('[p] (grammar:' + grammar2 + ')').grammarToString());
  }

  /** Test speech rule attributes.
   * @export
   */
  public testAttributesString() {
    let attrs1 = '(ctxtfunc:element, separator:"plus", volume:0.5)';
    this.assertStructEquals(
    attrs1,
    sre.SpeechRule.Component.fromString('[p] ' + attrs1).attributesToString());
    let attrs2 = '(context:"node", pitch:0.5, difference)';
    this.assertStructEquals(
    attrs2,
    sre.SpeechRule.Component.fromString('[p] ' + attrs2).attributesToString());
    let attrs3 = '(context:"node", grammar:font:annotation="unit")';
    this.assertStructEquals(
    attrs3,
    sre.SpeechRule.Component.fromString('[p] ' + attrs3).attributesToString());
    let attrs4 = '(grammar:font:annotation="unit")';
    this.assertStructEquals(
    attrs4,
    sre.SpeechRule.Component.fromString('[p] ' + attrs4).attributesToString());
  }

  /** Test translation of simple speech rule components.
   * @export
   */
  public testSimpleComponentsString() {
    this.assertStructEquals(
    '[m] ./*', sre.SpeechRule.Component.fromString('[m] ./*').toString());
    this.assertStructEquals('[n] ./*[1]', sre.SpeechRule.Component.fromString('[n] ./*[1]').toString());
    this.assertStructEquals('[p] (pause:200)', sre.SpeechRule.Component.fromString('[p] (pause:200)').toString());
    this.assertStructEquals('[t] "super"', sre.SpeechRule.Component.fromString('[t] "super"').toString());
    this.assertStructEquals('[t] text()', sre.SpeechRule.Component.fromString('[t] text()').toString());
  }
  /** Test translation of speech rule components with attributes.
   * @export
   */
  public testComplexComponentsString() {
    let comp1 = '[m] ./* (ctxtfunc:element, separator:"plus", volume:0.5)';
    this.assertStructEquals(comp1, sre.SpeechRule.Component.fromString(comp1).toString());
    let comp2 = '[n] ./*[1] (context:"node", pitch:0.5)';
    this.assertStructEquals(comp2, sre.SpeechRule.Component.fromString(comp2).toString());
    let comp3 = '[n] ./*[1] (context:"node", grammar:font:annotation="unit")';
    this.assertStructEquals(comp3, sre.SpeechRule.Component.fromString(comp3).toString());
    let comp4 = '[n] ./*[1] (grammar:font:annotation="unit")';
    this.assertStructEquals(comp4, sre.SpeechRule.Component.fromString(comp4).toString());
  }
  /** Test translation of speech rules.
   * @export
   */
  public testRulesString() {
    let rule1 = '[t] "Square root of"; [n] ./*[1] (rate:0.2); [p] (pause:400)';
    this.assertStructEquals(rule1, sre.SpeechRule.Action.fromString(rule1).toString());
    let rule2 = '[n] ./*[1]/*[1]/*[1]; [t] "sub"; [n] ./*[1]/*[3]/*[1] ' + '(pitch:-0.35); [p] (pause:200); [t] "super";' + ' [n] ./*[1]/*[2]/*[1] (pitch:0.35); [p] (pause:300)';
    this.assertStructEquals(rule2, sre.SpeechRule.Action.fromString(rule2).toString());
  }
  /** Tests for double quoted string syntax.
   * @export
   */
  public testSeparatorsInStrings() {
    let rule1 = '[t] "matrix; 3 by 3"; [n] ./*[1]';
    this.assertStructEquals(rule1, sre.SpeechRule.Action.fromString(rule1).toString());
    let rule2 = '[t] "matrix; 3;""by 3"; [n] ./*[1]';
    this.assertStructEquals(rule2, sre.SpeechRule.Action.fromString(rule2).toString());
    let rule3 = '[t] "matrix; by 3"; [n] ./*[1] ' + '(context:"where, who; why, when", separator:@separator)';
    let sprule3 = sre.SpeechRule.Action.fromString(rule3);
    this.assertStructEquals(rule3, sprule3.toString());
    this.assert.equal('[t] "matrix; by 3"', sprule3.components[0].toString());
    this.assert.equal('"where, who; why, when"', sprule3.components[1].attributes['context']);
  }
}

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
 * @file Testcases for ChromeVox's speech rules.
 *     Abstract superclass that provides facilities to parameterize the speech
 *     rule engine and to execute rule tests on math expressions.
 * @author Volker.Sorge@gmail.com (Volker Sorge)
 */

import * as System from '../../speech-rule-engine/js/common/system.js';
import {
  Axis,
  DynamicCstr
} from '../../speech-rule-engine/js/rule_engine/dynamic_cstr.js';

import { TestUtil } from '../base/test_util.js';
import { AbstractExamples } from './abstract_examples.js';

export class SpeechTest extends AbstractExamples {
  /**
   * The speech style of the tests.
   */
  public style: string = DynamicCstr.DEFAULT_VALUES[Axis.STYLE];

  /**
   * The speech rules for the tests.
   */
  public domain: string = DynamicCstr.DEFAULT_VALUES[Axis.DOMAIN];

  /**
   * The locale for the tests.
   */
  public locale: string = DynamicCstr.DEFAULT_VALUES[Axis.LOCALE];

  /**
   * The subiso for the tests.
   */
  public subiso: string = '';

  /**
   * The modality for the tests.
   */
  public modality: string = DynamicCstr.DEFAULT_VALUES[Axis.MODALITY];

  /**
   * Flag indicating if the actual output should be written to the HTML example
   * file, rather than the expected output.
   */
  public actual = false;

  /**
   * Flag indicating if English output should be generate for comparison.
   */
  public compare = false;

  /**
   * Wraps an entry into an HTML cell.
   *
   * @param entries A list of entries.
   * @returns The HTML cell.
   */
  public static htmlRow(entries: (number | string)[]): string {
    return entries.map(SpeechTest.htmlCell_).join('');
  }

  /**
   * Maps a style name to its English equivalent and does some pretty printing.
   *
   * @param style The style name.
   * @returns The prettier name.
   */
  private static styleMap_(style: string): string {
    const map: { [key: string]: string } = {
      default: 'verbose',
      sbrief: 'superbrief'
    };
    const newStyle = map[style] || style;
    return TestUtil.capitalize(newStyle);
  }

  /**
   * Wraps an entry into an HTML cell.
   *
   * @param entry A single entry.
   * @returns The HTML cell.
   */
  private static htmlCell_(entry: number | string): string {
    return '<td>' + entry + '</td>';
  }

  /**
   * @class
   */
  public constructor() {
    super();
    this.pickFields.push('preference');
  }

  /**
   * @override
   */
  public async setUpTest() {
    await super.setUpTest();
    return System.setupEngine({
      domain: this.domain,
      modality: this.modality,
      locale: this.locale,
      subiso: this.subiso
    });
  }

  /**
   * @override
   */
  public setActive(file: string, ext?: string) {
    this.fileDirectory = this.fileDirectory + this.locale + '/';
    super.setActive(file, ext);
  }

  /**
   * Tests if for speech translation of a given html snippet is equal to the
   * answer provided.
   *
   * @param mml Snippet of a MathML expression.
   * @param answer Expected speech translation of MathML expression.
   * @param opt_style Mathspeak style for translation.
   */
  public executeTest(mml: string, answer: string, opt_style?: string) {
    const style = opt_style || this.style;
    const mathMl =
      '<math xmlns="http://www.w3.org/1998/Math/MathML">' + mml + '</math>';
    System.setupEngine({
      domain: this.domain,
      style: style,
      modality: this.modality,
      locale: this.locale,
      subiso: this.subiso
    });
    const actual = this.getSpeech(mathMl);
    const expected = this.actual ? actual : answer;
    this.appendRuleExample(mathMl, expected, style);
    this.assert.equal(actual, expected);
  }

  /**
   * Retrieves the speech for a MathML element.
   *
   * @param mathMl The element to transcribe.
   * @returns The resulting speech.
   */
  public getSpeech(mathMl: string): string {
    return System.toSpeech(mathMl);
  }

  /**
   * Appends a single example to the HTML example output.
   *
   * @param input The input expression.
   * @param output The expected output.
   * @param style The speech style.
   * @param opt_rest The rest that is to be appended.
   * @param {...any} rest
   */
  public appendRuleExample(
    input: string,
    output: string,
    style: string,
    ...rest: string[]
  ) {
    const id =
      this.information.replace(/\s|\./g, '_') + '_' + this.locale + '_' + style;
    const key =
      '<h2 id="' +
      id +
      '">' +
      this.information +
      ' Locale: ' +
      this.locale +
      ', Style: ' +
      SpeechTest.htmlCell_(SpeechTest.styleMap_(style)) +
      '.</h2>';
    const outList = [input];
    if (this.compare) {
      System.setupEngine({
        domain: this.domain,
        style: style,
        locale: 'en',
        modality: this.modality === 'braille' ? 'speech' : this.modality
      });
      outList.push(this.getSpeech(input));
    }
    outList.push(output);
    this.appendExamples(key, SpeechTest.htmlRow(outList.concat(rest)));
  }

  /**
   * @override
   */
  public join(map: Map<string, string[]>) {
    let i = 0;
    let result = [];
    for (let [, examples] of [...map].sort(([a], [b]) => a.localeCompare(b))) {
      for (let example of examples) {
        result.push('<tr>' + SpeechTest.htmlCell_(i) + example + '</tr>');
        i++;
      }
    }
    return '\n<table>\n' + result.join('\n') + '\n</table>\n';
  }

  /**
   * @override
   */
  public header() {
    const mathjax =
      '<script src="https://polyfill.io/v3/polyfill.min.js?features=es6">' +
      '</script>\n<script id="MathJax-script" async ' +
      'src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js">' +
      '</script>';
    const style =
      '\n<style>\n table, th, td {\n' +
      '  border: 1px solid black; }\n</style>\n';
    return (
      '<!DOCTYPE html>' +
      '<html> <head>\n' +
      '<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>\n' +
      mathjax +
      '\n<title>' +
      this.information +
      '</title>\n' +
      style +
      '\n</head>\n<body>\n'
    );
  }

  /**
   * @override
   */
  public footer() {
    return '\n</body>\n</html>';
  }

  /**
   * @override
   */
  public prepare() {
    super.prepare();
    this.modality = this.jsonTests.modality || this.modality;
    this.locale = this.jsonTests.locale || this.locale;
    this.domain = this.jsonTests.domain || this.domain;
    this.style = this.jsonTests.style || this.style;
    this.subiso = this.jsonTests.subiso || this.subiso;
    this.actual = this.jsonTests.actual || this.actual;
    this.compare = this.jsonTests.compare || this.compare;
    if (this.jsonTests.active) {
      this.setActive(this.jsonTests.active);
    }
  }

  /**
   * @override
   */
  public method() {
    this.executeTest(
      this.field('input'),
      this.field('expected'),
      this.field('preference')
    );
  }
}

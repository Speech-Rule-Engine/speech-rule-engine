/**
 * @fileoverview Testcases for ChromeVox's speech rules.
 *     Abstract superclass that provides facilities to parameterize the speech
 *     rule engine and to execute rule tests on math expressions.
 * @author Volker.Sorge@gmail.com (Volker Sorge)
 */ 
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



import{AbstractExamples}from './abstract_examples';


export class SpeechTest extends AbstractExamples {

  style:string;

  domain:string;

  locale:string;

  modality:string;

  /**
     * Specify particular rule sets for a test. By default all available rule sets
     * are used.
     */ 
  rules:string[] = null;

  /**
     * Flag indicating if the actual output should be written to the HTML example
     * file, rather than the expected output.
     */ 
  actual:boolean = false;

  /**
     * Flag indicating if English output should be generate for comparison.
     */ 
  compare:boolean = false;
  fileDirectory:any;
  constructor() {
    super();
    this.style = sre.DynamicCstr.DEFAULT_VALUES[sre.DynamicCstr.Axis.STYLE];
    this.domain = sre.DynamicCstr.DEFAULT_VALUES[sre.DynamicCstr.Axis.DOMAIN];
    this.locale = sre.DynamicCstr.DEFAULT_VALUES[sre.DynamicCstr.Axis.LOCALE];
    this.modality = sre.DynamicCstr.DEFAULT_VALUES[sre.DynamicCstr.Axis.MODALITY];

    this.pickFields.push('preference');
  }


  /**
   * @override
   */ 
  setActive(file, opt_ext) {
    this.fileDirectory = this.fileDirectory + this.locale + '/';
    super.setActive(file, opt_ext);
  }


  /**
   * Tests if for speech translation of a given html snippet is equal to the
   * answer provided.
   * @param mml Snippet of a MathML expression.
   * @param answer Expected speech translation of MathML expression.
   * @param opt_style Mathspeak style for translation.
   */ 
  executeTest(mml: string, answer: string, 
  opt_style?: string) {
    let style = opt_style || this.style;
    let mathMl = '<math xmlns="http://www.w3.org/1998/Math/MathML">' + 
    mml + '</math>';
    sre.SpeechRuleEngine.getInstance().clearCache();
    sre.System.getInstance().setupEngine(
    {domain:this.domain, style:style, 
    modality:this.modality, rules:this.rules, locale:this.locale});
    let actual = this.getSpeech(mathMl);
    let expected = this.actual ? actual : answer;
    this.appendRuleExample(mathMl, expected, style);
    this.assert.equal(actual, expected);
  }


  /**
   * Retrieves the speech for a MathML element.
   * @param mathMl The element to transcribe.
   * @return The resulting speech.
   */ 
  getSpeech(mathMl: string): string {
    return sre.System.getInstance().toSpeech(mathMl);
  }


  /**
   * Appends a single example to the HTML example output.
   * @param input The input expression.
   * @param output The expected output.
   * @param style The speech style.
   * @param opt_rest The rest that is to be appended.
   */ 
  appendRuleExample(
  input: string, output: string, style: string, opt_rest?: string[]) {
    let rest = opt_rest || [];
    let key = '<h2>' + this.information + ' Locale: ' + this.locale + 
    ', Style: ' + 
    SpeechTest.htmlCell_(SpeechTest.styleMap_(style)) + 
    '.</h2>';
    let outList = [input];
    if (this.compare) {
      sre.System.getInstance().setupEngine(
      {domain:this.domain, style:style, 
      modality:this.modality, rules:this.rules, locale:'en'});
      outList.push(this.getSpeech(input));
    }
    outList.push(output);
    this.appendExamples(
    key, SpeechTest.htmlRow(outList.concat(rest)));
  }


  /**
   * Maps a style name to its English equivalent and does some pretty printing.
   * @param style The style name.
   * @return The prettier name.
   */ 
  private static styleMap_(style: string): string {
    let map = {'default':'verbose', 
    'sbrief':'superbrief'};
    let newStyle = map[style] || style;
    return newStyle.charAt(0).toUpperCase() + newStyle.slice(1);
  }


  /**
   * Wraps an entry into an HTML cell.
   * @param entry A single entry.
   * @return The HTML cell.
   */ 
  private static htmlCell_(entry: number | string): string {
    return '<td>' + entry + '</td>';
  }


  /**
   * Wraps an entry into an HTML cell.
   * @param entries A list of entries.
   * @return The HTML cell.
   */ 
  static htmlRow(entries: (number | string)[]): string {
    return entries.map(SpeechTest.htmlCell_).join('');
  }


  /**
   * @override
   */ 
  join(examples) {
    for (let i = 0, l = examples.length; i < l; i++) {
      examples[i] = '<tr>' + 
      SpeechTest.htmlCell_(i) + examples[i] + 
      '</tr>';
    }
    return '\n<table>\n' + examples.join('\n') + '\n</table>\n';
  }


  /**
   * @override
   */ 
  header() {
    let mathjax = 
    '<script src="https://polyfill.io/v3/polyfill.min.js?features=es6">' + 
    '</script>\n<script id="MathJax-script" async ' + 
    'src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js">' + 
    '</script>';
    let style = '\n<style>\n table, th, td {\n' + 
    '  border: 1px solid black; }\n</style>\n';
    return '<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML//EN">' + 
    '<html> <head>\n' + 
    '<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>\n' + 
    mathjax + 
    '\n<title>' + this.information + '</title>\n' + style + 
    '\n</head>\n<body>\n';
  }


  /**
   * @override
   */ 
  footer() {
    return '\n</body>\n</html>';
  }


  /**
   * @override
   */ 
  prepare() {
    super.prepare();
    this.modality = this.jsonTests.modality || this.modality;
    this.locale = this.jsonTests.locale || this.locale;
    this.domain = this.jsonTests.domain || this.domain;
    this.style = this.jsonTests.style || this.style;
    this.actual = this.jsonTests.actual || this.actual;
    this.compare = this.jsonTests.compare || this.compare;
    if (this.jsonTests.active) {
      this.setActive(this.jsonTests.active);
    }
  }


  /**
   * @override
   */ 
  method(var_args) {
    let args = Array.prototype.slice.call(arguments, 0);
    this.executeTest(args[0], args[1], args[2]);
  }
}


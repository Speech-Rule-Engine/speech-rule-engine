// Copyright 2014 Volker Sorge
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
 * @fileoverview Testcases for ChromeVox's speech rules.
 *     Abstract superclass that provides facilities to parameterize the speech
 *     rule engine and to execute rule tests on math expressions.
 * @author Volker.Sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.AbstractRuleTest');

goog.require('sre.AbstractExamples');



/**
 * @constructor
 * @extends {sre.AbstractExamples}
 */
sre.AbstractRuleTest = function() {
  sre.AbstractRuleTest.base(this, 'constructor');

  /**
   * @type {string}
   */
  this.style = 'default';

  /**
   * @type {string}
   */
  this.domain = 'default';

  /**
   * @type {boolean}
   */
  this.semantics = false;

  /**
   * Specify particular rule sets for a test. By default all available rule sets
   * are used.
   * @type {Array.<string>}
   */
  this.rules = null;

};
goog.inherits(sre.AbstractRuleTest, sre.AbstractExamples);


/**
 * Tests if for speech translation of a given html snippet is equal to the
 * answer provided.
 * @param {string} mml Snippet of a MathML expression.
 * @param {string} answer Expected speech translation of MathML expression.
 * @param {string=} opt_style Mathspeak style for translation.
 */
sre.AbstractRuleTest.prototype.executeRuleTest = function(mml, answer,
                                                          opt_style) {
  opt_style = opt_style || this.style;
  var mathMl = '<math xmlns="http://www.w3.org/1998/Math/MathML">' +
          mml + '</math>';
  // this.appendExamples(mathMl);
  this.appendExamples('<h2>MathSpeak English ' +
                      sre.AbstractRuleTest.htmlCell_(
                        sre.AbstractRuleTest.styleMap_(opt_style)) +
                      ' Style </h2>',
                      sre.AbstractRuleTest.htmlCell_(mathMl) +
                      sre.AbstractRuleTest.htmlCell_(answer)
                      );
  sre.SpeechRuleEngine.getInstance().clearCache();
  sre.System.getInstance().setupEngine(
      {semantics: this.semantics, domain: this.domain, style: opt_style,
        rules: this.rules});
  var result = sre.System.getInstance().toSpeech(mathMl);
  this.assert.equal(result, answer);
};


/**
 * Maps a style name to its English equivalent and does some pretty printing.
 * @param {string} style The style name.
 * @return {string} The prettier name.
 * @private
 */
sre.AbstractRuleTest.styleMap_ = function(style) {
  var map = {'default': 'verbose',
             'sbrief': 'superbrief'};
  var newStyle = map[style] || style;
  return newStyle.charAt(0).toUpperCase() + newStyle.slice(1);
};


/**
 * Wraps an entry into an HTML cell.
 * @param {string} entry A single entry.
 * @return {string} The HTML cell.
 * @private
 */
sre.AbstractRuleTest.htmlCell_ = function(entry) {
  return '<td>' + entry + '</td>';
};


/**
 * Cleans the output example depending on the test requirements.
 * @param {string} example The example string.
 * @return {string} The cleaned string.
 */
sre.AbstractRuleTest.prototype.cleanup = function(example) {
  return example;
};


/**
 * Joins the formatted examples. Can be specialised depending on the test suite.
 * @param {Array.<string>} examples List of formatted examples.
 * @return {string} The final, joined HTML page.
 */
sre.AbstractRuleTest.prototype.join = function(examples) {
  var mathjax = '<script type="text/javascript" async ' +
      'src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/' +
      'MathJax.js?config=TeX-AMS-MML_HTMLorMML-full">' +
      '</script>';
  var style = '\n<style>\n' +
      'table, th, td {\n' +
      '  border: 1px solid black;' +
      '}\n</style>\n';
  var head = '<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML//EN">' +
      '<html> <head>\n' +
      '<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>\n' +
      mathjax +
      '\n<title>' + this.information + '</title>\n' +
      '\n</head>\n<body>\n<table>\n';
  var end = '\n</table>\n</body>\n</html>';
  for (var i = 0, l = examples.length; i < l; i++) {
    examples[i] = '<tr>' +
      sre.AbstractRuleTest.htmlCell_(i) + examples[i] +
      '</tr>';
  }
  return head + style + examples.join('\n') + end;
};

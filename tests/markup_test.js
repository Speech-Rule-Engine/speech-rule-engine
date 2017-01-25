// Copyright 2017 Volker Sorge
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
//
// Partially funded by the Diagram Project.


/**
 * @fileoverview Tests of markup output.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.MarkupTest');

goog.require('sre.AbstractTest');
goog.require('sre.Engine');
goog.require('sre.System');



/**
 * @constructor
 * @extends {sre.AbstractTest}
 */
sre.MarkupTest = function() {
  sre.MarkupTest.base(this, 'constructor');

  this.information = 'Markup function test.';

};
goog.inherits(sre.MarkupTest, sre.AbstractTest);


/**
 * @override
 */
sre.MarkupTest.prototype.setUpTest = function() {
  sre.System.getInstance().setupEngine(
      {semantics: true, domain: 'default', style: 'short'});
};


/**
 * @override
 */
sre.MarkupTest.prototype.tearDownTest = function() {
  sre.Engine.getInstance().semantics = false;
};


/**
 * The quadratic equation as a MathML string.
 * @type {!Node}
 */
sre.MarkupTest.QUADRATIC = sre.DomUtil.parseInput(
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
    '</math>');


/**
 * Executes single markup tests.
 * @param {!Node} expr The input expression.
 * @param {string} result The expected result.
 * @param {sre.Engine.Markup} markup The markup to test.
 */
sre.MarkupTest.prototype.executeTest = function(expr, result, markup) {
  sre.Engine.getInstance().markup = markup;
  var descrs = sre.SpeechGeneratorUtil.computeSpeech(expr);
  var output = sre.AuditoryDescription.speechString(descrs);
  this.assert.equal(output, result);
  sre.Engine.getInstance().markup = sre.Engine.Markup.NONE;
};


/**
 * Test for simple speech.
 */
sre.MarkupTest.prototype.testSimpleString = function() {
  this.executeTest(
      sre.MarkupTest.QUADRATIC,
      'x equals start frac minus b plus minus Square root of b square minus' +
      ' four a c over two a end frac',
      sre.Engine.Markup.NONE);
};


/**
 * Test for ACSS markup.
 */
sre.MarkupTest.prototype.testAcss = function() {
  this.executeTest(
      sre.MarkupTest.QUADRATIC,
      '(exp "x" (text ((richness . 5)) "equals") (pause . 200) "start frac" (text ((average-pitch . 6) (richness . 5)) "minus") (text ((average-pitch . 6)) "b") (text ((average-pitch . 6) (richness . 5)) "plus minus") (text ((average-pitch . 6)) "Square root of") (text ((average-pitch . 6) (richness . 6)) "b") (text ((average-pitch . 7) (richness . 6)) "square") (pause . 300) (text ((richness . 5) (average-pitch . 6)) "minus") (text ((average-pitch . 6) (richness . 6)) "four a c") (pause . 400) "over" (text ((average-pitch . 4)) "two a") (pause . 400) "end frac")',
      sre.Engine.Markup.ACSS);
};


/**
 * Test for Sable markup.
 */
sre.MarkupTest.prototype.testSable = function() {
  this.executeTest(
      sre.MarkupTest.QUADRATIC,
      'x equals start frac minus b plus minus Square root of b square minus' +
      ' four a c over two a end frac',
      sre.Engine.Markup.SABLE);
};


/**
 * Test for SSML markup.
 */
sre.MarkupTest.prototype.testSsml = function() {
  this.executeTest(
      sre.MarkupTest.QUADRATIC,
      'x equals start frac minus b plus minus Square root of b square minus' +
      ' four a c over two a end frac',
      sre.Engine.Markup.SSML);
};


/**
 * Test for VoiceXML markup.
 * (Currently that is the same as SSML.)
 */
sre.MarkupTest.prototype.testVoiceXml = function() {
  this.executeTest(
      sre.MarkupTest.QUADRATIC,
      'x equals start frac minus b plus minus Square root of b square minus' +
      ' four a c over two a end frac',
      sre.Engine.Markup.VOICEXML);
};

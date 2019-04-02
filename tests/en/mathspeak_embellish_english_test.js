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
 * @fileoverview Testcases for embellished symbols for Mathspeak rules.
 * @author Volker.Sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.MathspeakEmbellishEnglishTest');

goog.require('sre.AbstractRuleTest');



/**
 * @constructor
 * @extends {sre.AbstractRuleTest}
 */
sre.MathspeakEmbellishEnglishTest = function() {
  sre.MathspeakEmbellishEnglishTest.base(this, 'constructor');

  /**
   * @override
   */
  this.information = 'Mathspeak Embellished Symbols tests.';

  /**
   * @override
   */
  this.domain = 'mathspeak';

  /**
   * @override
   */
  this.semantics = true;

  this.setActive('EmbellishEnglishedSymbolsEnglish');
};
goog.inherits(sre.MathspeakEmbellishEnglishTest, sre.AbstractRuleTest);


// mml = '<mi>a</mi><msubsup><mo>+</mo><mn>m</mn><mn>\'</mn>' +
//   '</msubsup><mi>b</mi><msubsup><mo>+</mo><mn>m</mn><mn>\'</mn>' +
//   '</msubsup><mi>c</mi>';
// this.executeRuleTest(mml, 'a plus prime Subscript m Baseline b', 'default');
// this.executeRuleTest(mml, 'a plus prime Sub m Base b', 'brief');
// this.executeRuleTest(mml, 'a plus prime Sub m Base b', 'sbrief');


/**
 * Testing operator embellished with subscript.
 */
sre.MathspeakEmbellishEnglishTest.prototype.testEmbellOpSubscript = function() {
  var mml = '<mi>a</mi><msub><mo>+</mo><mn>2</mn></msub><mi>b</mi>';
  this.executeRuleTest(mml, 'a plus Subscript 2 Baseline b', 'default');
  this.executeRuleTest(mml, 'a plus Sub 2 Base b', 'brief');
  this.executeRuleTest(mml, 'a plus Sub 2 Base b', 'sbrief');
};


/**
 * Testing operator embellished with superscript. Making sure cases of squared
 * and cube are not used.
 */
sre.MathspeakEmbellishEnglishTest.prototype.testEmbellOpSuperscript = function() {
  var mml = '<mi>a</mi><msup><mo>+</mo><mn>2</mn></msup><mi>b</mi>';
  this.executeRuleTest(mml, 'a plus Superscript 2 Baseline b', 'default');
  this.executeRuleTest(mml, 'a plus Sup 2 Base b', 'brief');
  this.executeRuleTest(mml, 'a plus Sup 2 Base b', 'sbrief');
  mml = '<mi>a</mi><msup><mo>+</mo><mn>3</mn></msup><mi>b</mi>';
  this.executeRuleTest(mml, 'a plus Superscript 3 Baseline b', 'default');
  this.executeRuleTest(mml, 'a plus Sup 3 Base b', 'brief');
  this.executeRuleTest(mml, 'a plus Sup 3 Base b', 'sbrief');
  mml = '<mi>a</mi><msup><mo>+</mo><mn>n</mn></msup><mi>b</mi>';
  this.executeRuleTest(mml, 'a plus Superscript n Baseline b', 'default');
  this.executeRuleTest(mml, 'a plus Sup n Base b', 'brief');
  this.executeRuleTest(mml, 'a plus Sup n Base b', 'sbrief');
  mml = '<mi>a</mi><msup><mo>+</mo><mo>\'</mo></msup><mi>b</mi>';
  this.executeRuleTest(mml, 'a plus prime b', 'default');
  this.executeRuleTest(mml, 'a plus prime b', 'brief');
  this.executeRuleTest(mml, 'a plus prime b', 'sbrief');
};


/**
 * Testing operator embellished with sub and superscript. Making sure cases of
 * squared and cube are not used.
 */
sre.MathspeakEmbellishEnglishTest.prototype.testEmbellOpSubSuper = function() {
  var mml = '<mi>a</mi><msubsup><mo>+</mo><mi>m</mi><mn>2</mn>' +
      '</msubsup><mi>b</mi>';
  this.executeRuleTest(mml, 'a plus Subscript m Superscript 2 Baseline b',
                       'default');
  this.executeRuleTest(mml, 'a plus Sub m Sup 2 Base b', 'brief');
  this.executeRuleTest(mml, 'a plus Sub m Sup 2 Base b', 'sbrief');
  mml = '<mi>a</mi><msubsup><mo>+</mo><mi>m</mi><mn>3</mn></msubsup><mi>b</mi>';
  this.executeRuleTest(mml, 'a plus Subscript m Superscript 3 Baseline b',
                       'default');
  this.executeRuleTest(mml, 'a plus Sub m Sup 3 Base b', 'brief');
  this.executeRuleTest(mml, 'a plus Sub m Sup 3 Base b', 'sbrief');
  mml = '<mi>a</mi><msubsup><mo>+</mo><mi>m</mi><mn>n</mn></msubsup><mi>b</mi>';
  this.executeRuleTest(mml, 'a plus Subscript m Superscript n Baseline b',
                       'default');
  this.executeRuleTest(mml, 'a plus Sub m Sup n Base b', 'brief');
  this.executeRuleTest(mml, 'a plus Sub m Sup n Base b', 'sbrief');
  mml = '<mi>a</mi><msubsup><mo>+</mo><mi>m</mi><mn>\'</mn>' +
      '</msubsup><mi>b</mi>';
  this.executeRuleTest(mml, 'a plus prime Subscript m Baseline b', 'default');
  this.executeRuleTest(mml, 'a plus prime Sub m Base b', 'brief');
  this.executeRuleTest(mml, 'a plus prime Sub m Base b', 'sbrief');
};


/**
 * Testing operator embellished also from the left.
 */
sre.MathspeakEmbellishEnglishTest.prototype.testEmbellOpTensor = function() {
  var mml = '<mi>a</mi><mmultiscripts><mo>+</mo><mi>m</mi><mn>2</mn>' +
      '</mmultiscripts><mi>b</mi>';
  this.executeRuleTest(mml, 'a plus Subscript m Superscript 2 Baseline b',
                       'default');
  this.executeRuleTest(mml, 'a plus Sub m Sup 2 Base b', 'brief');
  this.executeRuleTest(mml, 'a plus Sub m Sup 2 Base b', 'sbrief');
  mml = '<mi>a</mi><mmultiscripts><mo>+</mo><mi>m</mi><mn>2</mn>' +
        '<mprescripts/><none/><mn>3</mn></mmultiscripts><mi>b</mi>';
  this.executeRuleTest(mml, 'a Superscript 3 Baseline plus Subscript m' +
                       ' Superscript 2 Baseline b', 'default');
  this.executeRuleTest(mml, 'a Sup 3 Base plus Sub m Sup 2 Base b', 'brief');
  this.executeRuleTest(mml, 'a Sup 3 Base plus Sub m Sup 2 Base b', 'sbrief');
  mml = '<mi>a</mi><mmultiscripts><mo>+</mo><mi>m</mi><mn>2</mn>' +
        '<mprescripts/><mn>3</mn></mmultiscripts><mi>b</mi>';
  this.executeRuleTest(mml, 'a Subscript 3 Baseline plus Subscript m' +
                       ' Superscript 2 Baseline b', 'default');
  this.executeRuleTest(mml, 'a Sub 3 Base plus Sub m Sup 2 Base b', 'brief');
  this.executeRuleTest(mml, 'a Sub 3 Base plus Sub m Sup 2 Base b', 'sbrief');
  mml = '<mi>a</mi><mmultiscripts><mo>+</mo><mi>m</mi><mn>2</mn>' +
        '<mprescripts/><mn>3</mn><mi>n</mi></mmultiscripts><mi>b</mi>';
  this.executeRuleTest(mml, 'a Subscript 3 Superscript n Baseline plus' +
                       ' Subscript m Superscript 2 Baseline b', 'default');
  this.executeRuleTest(mml, 'a Sub 3 Sup n Base plus Sub m Sup 2 Base b',
                       'brief');
  this.executeRuleTest(mml, 'a Sub 3 Sup n Base plus Sub m Sup 2 Base b',
                       'sbrief');
};


/**
 * Testing relation embellished with subscript.
 */
sre.MathspeakEmbellishEnglishTest.prototype.testEmbellRelSubscript = function() {
  var mml = '<mi>a</mi><msub><mo>=</mo><mn>2</mn></msub><mi>b</mi>';
  this.executeRuleTest(mml, 'a equals Subscript 2 Baseline b', 'default');
  this.executeRuleTest(mml, 'a equals Sub 2 Base b', 'brief');
  this.executeRuleTest(mml, 'a equals Sub 2 Base b', 'sbrief');
};


/**
 * Testing relation embellished with superscript. Making sure cases of squared
 * and cube are not used.
 */
sre.MathspeakEmbellishEnglishTest.prototype.testEmbellRelSuperscript = function() {
  var mml = '<mi>a</mi><msup><mo>=</mo><mn>2</mn></msup><mi>b</mi>';
  this.executeRuleTest(mml, 'a equals Superscript 2 Baseline b', 'default');
  this.executeRuleTest(mml, 'a equals Sup 2 Base b', 'brief');
  this.executeRuleTest(mml, 'a equals Sup 2 Base b', 'sbrief');
  mml = '<mi>a</mi><msup><mo>=</mo><mn>3</mn></msup><mi>b</mi>';
  this.executeRuleTest(mml, 'a equals Superscript 3 Baseline b', 'default');
  this.executeRuleTest(mml, 'a equals Sup 3 Base b', 'brief');
  this.executeRuleTest(mml, 'a equals Sup 3 Base b', 'sbrief');
  mml = '<mi>a</mi><msup><mo>=</mo><mn>n</mn></msup><mi>b</mi>';
  this.executeRuleTest(mml, 'a equals Superscript n Baseline b', 'default');
  this.executeRuleTest(mml, 'a equals Sup n Base b', 'brief');
  this.executeRuleTest(mml, 'a equals Sup n Base b', 'sbrief');
  mml = '<mi>a</mi><msup><mo>=</mo><mo>\'</mo></msup><mi>b</mi>';
  this.executeRuleTest(mml, 'a equals prime b', 'default');
  this.executeRuleTest(mml, 'a equals prime b', 'brief');
  this.executeRuleTest(mml, 'a equals prime b', 'sbrief');
};


/**
 * Testing relation embellished with sub and superscript. Making sure cases of
 * squared and cube are not used.
 */
sre.MathspeakEmbellishEnglishTest.prototype.testEmbellRelSubSuper = function() {
  var mml = '<mi>a</mi><msubsup><mo>=</mo><mi>m</mi><mn>2</mn>' +
      '</msubsup><mi>b</mi>';
  this.executeRuleTest(mml, 'a equals Subscript m Superscript 2 Baseline b',
                       'default');
  this.executeRuleTest(mml, 'a equals Sub m Sup 2 Base b', 'brief');
  this.executeRuleTest(mml, 'a equals Sub m Sup 2 Base b', 'sbrief');
  mml = '<mi>a</mi><msubsup><mo>=</mo><mi>m</mi><mn>3</mn></msubsup><mi>b</mi>';
  this.executeRuleTest(mml, 'a equals Subscript m Superscript 3 Baseline b',
                       'default');
  this.executeRuleTest(mml, 'a equals Sub m Sup 3 Base b', 'brief');
  this.executeRuleTest(mml, 'a equals Sub m Sup 3 Base b', 'sbrief');
  mml = '<mi>a</mi><msubsup><mo>=</mo><mi>m</mi><mn>n</mn></msubsup><mi>b</mi>';
  this.executeRuleTest(mml, 'a equals Subscript m Superscript n Baseline b',
                       'default');
  this.executeRuleTest(mml, 'a equals Sub m Sup n Base b', 'brief');
  this.executeRuleTest(mml, 'a equals Sub m Sup n Base b', 'sbrief');
  mml = '<mi>a</mi><msubsup><mo>=</mo><mi>m</mi><mn>\'</mn>' +
      '</msubsup><mi>b</mi>';
  this.executeRuleTest(mml, 'a equals prime Subscript m Baseline b', 'default');
  this.executeRuleTest(mml, 'a equals prime Sub m Base b', 'brief');
  this.executeRuleTest(mml, 'a equals prime Sub m Base b', 'sbrief');
};


/**
 * Testing relation embellished also from the left.
 */
sre.MathspeakEmbellishEnglishTest.prototype.testEmbellRelTensor = function() {
  var mml = '<mi>a</mi><mmultiscripts><mo>=</mo><mi>m</mi><mn>2</mn>' +
      '</mmultiscripts><mi>b</mi>';
  this.executeRuleTest(mml, 'a equals Subscript m Superscript 2 Baseline b',
                       'default');
  this.executeRuleTest(mml, 'a equals Sub m Sup 2 Base b', 'brief');
  this.executeRuleTest(mml, 'a equals Sub m Sup 2 Base b', 'sbrief');
  mml = '<mi>a</mi><mmultiscripts><mo>=</mo><mi>m</mi><mn>2</mn>' +
        '<mprescripts/><none/><mn>3</mn></mmultiscripts><mi>b</mi>';
  this.executeRuleTest(mml, 'a Superscript 3 Baseline equals Subscript m' +
                       ' Superscript 2 Baseline b', 'default');
  this.executeRuleTest(mml, 'a Sup 3 Base equals Sub m Sup 2 Base b', 'brief');
  this.executeRuleTest(mml, 'a Sup 3 Base equals Sub m Sup 2 Base b', 'sbrief');
  mml = '<mi>a</mi><mmultiscripts><mo>=</mo><mi>m</mi><mn>2</mn>' +
        '<mprescripts/><mn>3</mn></mmultiscripts><mi>b</mi>';
  this.executeRuleTest(mml, 'a Subscript 3 Baseline equals Subscript m' +
                       ' Superscript 2 Baseline b', 'default');
  this.executeRuleTest(mml, 'a Sub 3 Base equals Sub m Sup 2 Base b', 'brief');
  this.executeRuleTest(mml, 'a Sub 3 Base equals Sub m Sup 2 Base b', 'sbrief');
  mml = '<mi>a</mi><mmultiscripts><mo>=</mo><mi>m</mi><mn>2</mn>' +
        '<mprescripts/><mn>3</mn><mi>n</mi></mmultiscripts><mi>b</mi>';
  this.executeRuleTest(mml, 'a Subscript 3 Superscript n Baseline equals' +
                       ' Subscript m Superscript 2 Baseline b', 'default');
  this.executeRuleTest(mml, 'a Sub 3 Sup n Base equals Sub m Sup 2 Base b',
                       'brief');
  this.executeRuleTest(mml, 'a Sub 3 Sup n Base equals Sub m Sup 2 Base b',
                       'sbrief');
};


/**
 * Testing multiple embellished relations.
 */
sre.MathspeakEmbellishEnglishTest.prototype.testEmbellMultRelSubscript = function() {
  var mml = '<mi>a</mi><msub><mo>=</mo><mn>2</mn></msub><mi>b</mi>' +
      '<mo>=</mo><mi>c</mi>';
  this.executeRuleTest(mml, 'a equals Subscript 2 Baseline b equals c',
                       'default');
  this.executeRuleTest(mml, 'a equals Sub 2 Base b equals c', 'brief');
  this.executeRuleTest(mml, 'a equals Sub 2 Base b equals c', 'sbrief');
};


/**
 * Testing punctuation embellished with subscript.
 */
sre.MathspeakEmbellishEnglishTest.prototype.testEmbellPunctSubscript = function() {
  var mml = '<mi>a</mi><msub><mo>:</mo><mn>2</mn></msub><mi>b</mi>';
  this.executeRuleTest(mml, 'a colon Subscript 2 Baseline b', 'default');
  this.executeRuleTest(mml, 'a colon Sub 2 Base b', 'brief');
  this.executeRuleTest(mml, 'a colon Sub 2 Base b', 'sbrief');
};


/**
 * Testing punctuation embellished with superscript. Making sure cases of
 * squared and cube are not used.
 */
sre.MathspeakEmbellishEnglishTest.prototype.testEmbellPunctSuperscript = function() {
  var mml = '<mi>a</mi><msup><mo>:</mo><mn>2</mn></msup><mi>b</mi>';
  this.executeRuleTest(mml, 'a colon Superscript 2 Baseline b', 'default');
  this.executeRuleTest(mml, 'a colon Sup 2 Base b', 'brief');
  this.executeRuleTest(mml, 'a colon Sup 2 Base b', 'sbrief');
  mml = '<mi>a</mi><msup><mo>:</mo><mn>3</mn></msup><mi>b</mi>';
  this.executeRuleTest(mml, 'a colon Superscript 3 Baseline b', 'default');
  this.executeRuleTest(mml, 'a colon Sup 3 Base b', 'brief');
  this.executeRuleTest(mml, 'a colon Sup 3 Base b', 'sbrief');
  mml = '<mi>a</mi><msup><mo>:</mo><mn>n</mn></msup><mi>b</mi>';
  this.executeRuleTest(mml, 'a colon Superscript n Baseline b', 'default');
  this.executeRuleTest(mml, 'a colon Sup n Base b', 'brief');
  this.executeRuleTest(mml, 'a colon Sup n Base b', 'sbrief');
  mml = '<mi>a</mi><msup><mo>:</mo><mo>\'</mo></msup><mi>b</mi>';
  this.executeRuleTest(mml, 'a colon prime b', 'default');
  this.executeRuleTest(mml, 'a colon prime b', 'brief');
  this.executeRuleTest(mml, 'a colon prime b', 'sbrief');
};


/**
 * Testing punctuation embellished with sub and superscript. Making sure cases
 * of squared and cube are not used.
 */
sre.MathspeakEmbellishEnglishTest.prototype.testEmbellPunctSubSuper = function() {
  var mml = '<mi>a</mi><msubsup><mo>:</mo><mi>m</mi><mn>2</mn>' +
      '</msubsup><mi>b</mi>';
  this.executeRuleTest(mml, 'a colon Subscript m Superscript 2 Baseline b',
                       'default');
  this.executeRuleTest(mml, 'a colon Sub m Sup 2 Base b', 'brief');
  this.executeRuleTest(mml, 'a colon Sub m Sup 2 Base b', 'sbrief');
  mml = '<mi>a</mi><msubsup><mo>:</mo><mi>m</mi><mn>3</mn></msubsup><mi>b</mi>';
  this.executeRuleTest(mml, 'a colon Subscript m Superscript 3 Baseline b',
                       'default');
  this.executeRuleTest(mml, 'a colon Sub m Sup 3 Base b', 'brief');
  this.executeRuleTest(mml, 'a colon Sub m Sup 3 Base b', 'sbrief');
  mml = '<mi>a</mi><msubsup><mo>:</mo><mi>m</mi><mn>n</mn></msubsup><mi>b</mi>';
  this.executeRuleTest(mml, 'a colon Subscript m Superscript n Baseline b',
                       'default');
  this.executeRuleTest(mml, 'a colon Sub m Sup n Base b', 'brief');
  this.executeRuleTest(mml, 'a colon Sub m Sup n Base b', 'sbrief');
  mml = '<mi>a</mi><msubsup><mo>:</mo><mi>m</mi><mn>\'</mn>' +
      '</msubsup><mi>b</mi>';
  this.executeRuleTest(mml, 'a colon prime Subscript m Baseline b', 'default');
  this.executeRuleTest(mml, 'a colon prime Sub m Base b', 'brief');
  this.executeRuleTest(mml, 'a colon prime Sub m Base b', 'sbrief');
};


/**
 * Testing punctuation embellished also from the left.
 */
sre.MathspeakEmbellishEnglishTest.prototype.testEmbellPunctTensor = function() {
  var mml = '<mi>a</mi><mmultiscripts><mo>:</mo><mi>m</mi><mn>2</mn>' +
      '</mmultiscripts><mi>b</mi>';
  this.executeRuleTest(mml, 'a colon Subscript m Superscript 2 Baseline b',
                       'default');
  this.executeRuleTest(mml, 'a colon Sub m Sup 2 Base b', 'brief');
  this.executeRuleTest(mml, 'a colon Sub m Sup 2 Base b', 'sbrief');
  mml = '<mi>a</mi><mmultiscripts><mo>:</mo><mi>m</mi><mn>2</mn>' +
        '<mprescripts/><none/><mn>3</mn></mmultiscripts><mi>b</mi>';
  this.executeRuleTest(mml, 'a Superscript 3 Baseline colon Subscript m' +
                       ' Superscript 2 Baseline b', 'default');
  this.executeRuleTest(mml, 'a Sup 3 Base colon Sub m Sup 2 Base b', 'brief');
  this.executeRuleTest(mml, 'a Sup 3 Base colon Sub m Sup 2 Base b', 'sbrief');
  mml = '<mi>a</mi><mmultiscripts><mo>:</mo><mi>m</mi><mn>2</mn>' +
        '<mprescripts/><mn>3</mn></mmultiscripts><mi>b</mi>';
  this.executeRuleTest(mml, 'a Subscript 3 Baseline colon Subscript m' +
                       ' Superscript 2 Baseline b', 'default');
  this.executeRuleTest(mml, 'a Sub 3 Base colon Sub m Sup 2 Base b', 'brief');
  this.executeRuleTest(mml, 'a Sub 3 Base colon Sub m Sup 2 Base b', 'sbrief');
  mml = '<mi>a</mi><mmultiscripts><mo>:</mo><mi>m</mi><mn>2</mn>' +
        '<mprescripts/><mn>3</mn><mi>n</mi></mmultiscripts><mi>b</mi>';
  this.executeRuleTest(mml, 'a Subscript 3 Superscript n Baseline colon' +
                       ' Subscript m Superscript 2 Baseline b', 'default');
  this.executeRuleTest(mml, 'a Sub 3 Sup n Base colon Sub m Sup 2 Base b',
                       'brief');
  this.executeRuleTest(mml, 'a Sub 3 Sup n Base colon Sub m Sup 2 Base b',
                       'sbrief');
};


/**
 * Testing multiple embellished punctuations.
 */
sre.MathspeakEmbellishEnglishTest.prototype.testEmbellMultPunctSubscript = function() {
  var mml = '<mi>a</mi><msub><mo>:</mo><mn>2</mn></msub><mi>b</mi>' +
      '<mo>:</mo><mi>c</mi>';
  this.executeRuleTest(mml, 'a colon Subscript 2 Baseline b colon c',
                       'default');
  this.executeRuleTest(mml, 'a colon Sub 2 Base b colon c', 'brief');
  this.executeRuleTest(mml, 'a colon Sub 2 Base b colon c', 'sbrief');
};


/**
 * Expressions with semantic elements.
 */
sre.MathspeakEmbellishEnglishTest.prototype.testSemanticsElement = function() {
  var mml = '<semantics></semantics>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
  mml = '<semantics><mi>a</mi></semantics>';
  this.executeRuleTest(mml, 'a', 'default');
  this.executeRuleTest(mml, 'a', 'brief');
  this.executeRuleTest(mml, 'a', 'sbrief');
  mml = '<semantics><mrow><mi>a</mi><mo>+</mo><mi>b</mi></mrow></semantics>';
  this.executeRuleTest(mml, 'a plus b', 'default');
  this.executeRuleTest(mml, 'a plus b', 'brief');
  this.executeRuleTest(mml, 'a plus b', 'sbrief');
  mml = '<mi>a</mi><mo>+</mo><semantics><mi>b</mi></semantics>';
  this.executeRuleTest(mml, 'a plus b', 'default');
  this.executeRuleTest(mml, 'a plus b', 'brief');
  this.executeRuleTest(mml, 'a plus b', 'sbrief');
};


/**
 * Expressions with semantic elements and annotations.
 */
sre.MathspeakEmbellishEnglishTest.prototype.testSemanticsAnnotation = function() {
  // This is not really legal markup.
  var mml = '<semantics><annotation>something</annotation></semantics>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
  mml = '<mi>a</mi><semantics><annotation><content>something</content>' +
      '</annotation></semantics>';
  this.executeRuleTest(mml, 'a', 'default');
  this.executeRuleTest(mml, 'a', 'brief');
  this.executeRuleTest(mml, 'a', 'sbrief');
  mml = '<semantics><mi>a</mi><annotation>something</annotation></semantics>';
  this.executeRuleTest(mml, 'a', 'default');
  this.executeRuleTest(mml, 'a', 'brief');
  this.executeRuleTest(mml, 'a', 'sbrief');
  mml = '<semantics><mrow><mi>a</mi><mo>+</mo><mi>b</mi></mrow>' +
      '<annotation>something</annotation></semantics>';
  this.executeRuleTest(mml, 'a plus b', 'default');
  this.executeRuleTest(mml, 'a plus b', 'brief');
  this.executeRuleTest(mml, 'a plus b', 'sbrief');
  mml = '<mi>a</mi><mo>+</mo><semantics><mi>b</mi>' +
      '<annotation>something</annotation></semantics>';
  this.executeRuleTest(mml, 'a plus b', 'default');
  this.executeRuleTest(mml, 'a plus b', 'brief');
  this.executeRuleTest(mml, 'a plus b', 'sbrief');
};


/**
 * Expressions with semantic elements and xml annotations.
 */
sre.MathspeakEmbellishEnglishTest.prototype.testSemanticsAnnotationXml = function() {
  // This is not really legal markup.
  var mml = '<semantics><annotation-xml><content>something</content>' +
      '</annotation-xml></semantics>';
  this.executeRuleTest(mml, 'something', 'default');
  this.executeRuleTest(mml, 'something', 'brief');
  this.executeRuleTest(mml, 'something', 'sbrief');
  mml = '<mi>a</mi><semantics><annotation-xml><content>something</content>' +
      '</annotation-xml></semantics>';
  this.executeRuleTest(mml, 'a something', 'default');
  this.executeRuleTest(mml, 'a something', 'brief');
  this.executeRuleTest(mml, 'a something', 'sbrief');
  mml = '<semantics><mi>a</mi><annotation-xml><content>something</content>' +
      '</annotation-xml></semantics>';
  this.executeRuleTest(mml, 'a', 'default');
  this.executeRuleTest(mml, 'a', 'brief');
  this.executeRuleTest(mml, 'a', 'sbrief');
  mml = '<semantics><mrow><mi>a</mi><mo>+</mo><mi>b</mi></mrow>' +
      '<annotation-xml><content>something</content>' +
      '</annotation-xml></semantics>';
  this.executeRuleTest(mml, 'a plus b', 'default');
  this.executeRuleTest(mml, 'a plus b', 'brief');
  this.executeRuleTest(mml, 'a plus b', 'sbrief');
  mml = '<mi>a</mi><mo>+</mo><semantics><mi>b</mi><annotation-xml>' +
      '<content>something</content></annotation-xml></semantics>';
  this.executeRuleTest(mml, 'a plus b', 'default');
  this.executeRuleTest(mml, 'a plus b', 'brief');
  this.executeRuleTest(mml, 'a plus b', 'sbrief');
};

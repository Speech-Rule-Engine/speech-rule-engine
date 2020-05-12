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

goog.provide('sre.MathspeakEmbellishSpanishTest');

goog.require('sre.AbstractRuleTest');



/**
 * @constructor
 * @extends {sre.AbstractRuleTest}
 */
sre.MathspeakEmbellishSpanishTest = function() {
  sre.MathspeakEmbellishSpanishTest.base(this, 'constructor');

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
  this.locale = 'es';

  this.setActive('EmbellishedSymbolsSpanish');
};
goog.inherits(sre.MathspeakEmbellishSpanishTest, sre.AbstractRuleTest);


/**
 * Testing operator embellished with subscript.
 */
sre.MathspeakEmbellishSpanishTest.prototype.testEmbellOpSubscript = function() {
  var mml = '<mi>a</mi><msub><mo>+</mo><mn>2</mn></msub><mi>b</mi>';
  this.executeRuleTest(mml, 'a más subíndice 2 línea base b', 'default');
  this.executeRuleTest(mml, 'a más sub 2 b', 'brief');
  this.executeRuleTest(mml, 'a más sub 2 b', 'sbrief');
};


/**
 * Testing operator embellished with superscript. Making sure cases of squared
 * and cube are not used.
 */
sre.MathspeakEmbellishSpanishTest.prototype.testEmbellOpSuperscript = function()
    {
  var mml = '<mi>a</mi><msup><mo>+</mo><mn>2</mn></msup><mi>b</mi>';
  this.executeRuleTest(mml, 'a más superíndice 2 línea base b', 'default');
  this.executeRuleTest(mml, 'a más sup 2 b', 'brief');
  this.executeRuleTest(mml, 'a más sup 2 b', 'sbrief');
  mml = '<mi>a</mi><msup><mo>+</mo><mn>3</mn></msup><mi>b</mi>';
  this.executeRuleTest(mml, 'a más superíndice 3 línea base b', 'default');
  this.executeRuleTest(mml, 'a más sup 3 b', 'brief');
  this.executeRuleTest(mml, 'a más sup 3 b', 'sbrief');
  mml = '<mi>a</mi><msup><mo>+</mo><mn>n</mn></msup><mi>b</mi>';
  this.executeRuleTest(mml, 'a más superíndice n línea base b', 'default');
  this.executeRuleTest(mml, 'a más sup n b', 'brief');
  this.executeRuleTest(mml, 'a más sup n b', 'sbrief');
  mml = '<mi>a</mi><msup><mo>+</mo><mo>\'</mo></msup><mi>b</mi>';
  this.executeRuleTest(mml, 'a más prima b', 'default');
  this.executeRuleTest(mml, 'a más prima b', 'brief');
  this.executeRuleTest(mml, 'a más prima b', 'sbrief');
};


/**
 * Testing operator embellished with sub and superscript. Making sure cases of
 * squared and cube are not used.
 */
sre.MathspeakEmbellishSpanishTest.prototype.testEmbellOpSubSuper = function() {
  var mml = '<mi>a</mi><msubsup><mo>+</mo><mi>m</mi><mn>2</mn>' +
      '</msubsup><mi>b</mi>';
  this.executeRuleTest(mml, 'a más subíndice m superíndice 2 línea base b',
                       'default');
  this.executeRuleTest(mml, 'a más sub m sup 2 b', 'brief');
  this.executeRuleTest(mml, 'a más sub m sup 2 b', 'sbrief');
  mml = '<mi>a</mi><msubsup><mo>+</mo><mi>m</mi><mn>3</mn></msubsup><mi>b</mi>';
  this.executeRuleTest(mml, 'a más subíndice m superíndice 3 línea base b',
                       'default');
  this.executeRuleTest(mml, 'a más sub m sup 3 b', 'brief');
  this.executeRuleTest(mml, 'a más sub m sup 3 b', 'sbrief');
  mml = '<mi>a</mi><msubsup><mo>+</mo><mi>m</mi><mn>n</mn></msubsup><mi>b</mi>';
  this.executeRuleTest(mml, 'a más subíndice m superíndice n línea base b',
                       'default');
  this.executeRuleTest(mml, 'a más sub m sup n b', 'brief');
  this.executeRuleTest(mml, 'a más sub m sup n b', 'sbrief');
  mml = '<mi>a</mi><msubsup><mo>+</mo><mi>m</mi><mn>\'</mn>' +
      '</msubsup><mi>b</mi>';
  this.executeRuleTest(mml, 'a más prima subíndice m línea base b', 'default');
  this.executeRuleTest(mml, 'a más prima sub m b', 'brief');
  this.executeRuleTest(mml, 'a más prima sub m b', 'sbrief');
};


/**
 * Testing operator embellished also from the left.
 */
sre.MathspeakEmbellishSpanishTest.prototype.testEmbellOpTensor = function() {
  var mml = '<mi>a</mi><mmultiscripts><mo>+</mo><mi>m</mi><mn>2</mn>' +
      '</mmultiscripts><mi>b</mi>';
  this.executeRuleTest(mml, 'a más subíndice m superíndice 2 línea base b',
                       'default');
  this.executeRuleTest(mml, 'a más sub m sup 2 b', 'brief');
  this.executeRuleTest(mml, 'a más sub m sup 2 b', 'sbrief');
  mml = '<mi>a</mi><mmultiscripts><mo>+</mo><mi>m</mi><mn>2</mn>' +
      '<mprescripts/><none/><mn>3</mn></mmultiscripts><mi>b</mi>';
  this.executeRuleTest(mml, 'a superíndice 3 línea base más subíndice m' +
                       ' superíndice 2 línea base b', 'default');
  this.executeRuleTest(mml, 'a sup 3 más sub m sup 2 b', 'brief');
  this.executeRuleTest(mml, 'a sup 3 más sub m sup 2 b', 'sbrief');
  mml = '<mi>a</mi><mmultiscripts><mo>+</mo><mi>m</mi><mn>2</mn>' +
      '<mprescripts/><mn>3</mn></mmultiscripts><mi>b</mi>';
  this.executeRuleTest(mml, 'a subíndice 3 línea base más subíndice m' +
                       ' superíndice 2 línea base b', 'default');
  this.executeRuleTest(mml, 'a sub 3 más sub m sup 2 b', 'brief');
  this.executeRuleTest(mml, 'a sub 3 más sub m sup 2 b', 'sbrief');
  mml = '<mi>a</mi><mmultiscripts><mo>+</mo><mi>m</mi><mn>2</mn>' +
      '<mprescripts/><mn>3</mn><mi>n</mi></mmultiscripts><mi>b</mi>';
  this.executeRuleTest(mml, 'a subíndice 3 superíndice n línea base más' +
                       ' subíndice m superíndice 2 línea base b', 'default');
  this.executeRuleTest(mml, 'a sub 3 sup n más sub m sup 2 b', 'brief');
  this.executeRuleTest(mml, 'a sub 3 sup n más sub m sup 2 b', 'sbrief');
};


/**
 * Testing relation embellished with subscript.
 */
sre.MathspeakEmbellishSpanishTest.prototype.testEmbellRelSubscript = function()
    {
  var mml = '<mi>a</mi><msub><mo>=</mo><mn>2</mn></msub><mi>b</mi>';
  this.executeRuleTest(mml, 'a igual subíndice 2 línea base b', 'default');
  this.executeRuleTest(mml, 'a igual sub 2 b', 'brief');
  this.executeRuleTest(mml, 'a igual sub 2 b', 'sbrief');
};


/**
 * Testing relation embellished with superscript. Making sure cases of squared
 * and cube are not used.
 */
sre.MathspeakEmbellishSpanishTest.prototype.testEmbellRelSuperscript =
    function() {
  var mml = '<mi>a</mi><msup><mo>=</mo><mn>2</mn></msup><mi>b</mi>';
  this.executeRuleTest(mml, 'a igual superíndice 2 línea base b', 'default');
  this.executeRuleTest(mml, 'a igual sup 2 b', 'brief');
  this.executeRuleTest(mml, 'a igual sup 2 b', 'sbrief');
  mml = '<mi>a</mi><msup><mo>=</mo><mn>3</mn></msup><mi>b</mi>';
  this.executeRuleTest(mml, 'a igual superíndice 3 línea base b', 'default');
  this.executeRuleTest(mml, 'a igual sup 3 b', 'brief');
  this.executeRuleTest(mml, 'a igual sup 3 b', 'sbrief');
  mml = '<mi>a</mi><msup><mo>=</mo><mn>n</mn></msup><mi>b</mi>';
  this.executeRuleTest(mml, 'a igual superíndice n línea base b', 'default');
  this.executeRuleTest(mml, 'a igual sup n b', 'brief');
  this.executeRuleTest(mml, 'a igual sup n b', 'sbrief');
  mml = '<mi>a</mi><msup><mo>=</mo><mo>\'</mo></msup><mi>b</mi>';
  this.executeRuleTest(mml, 'a igual prima b', 'default');
  this.executeRuleTest(mml, 'a igual prima b', 'brief');
  this.executeRuleTest(mml, 'a igual prima b', 'sbrief');
};


/**
 * Testing relation embellished with sub and superscript. Making sure cases of
 * squared and cube are not used.
 */
sre.MathspeakEmbellishSpanishTest.prototype.testEmbellRelSubSuper = function() {
  var mml = '<mi>a</mi><msubsup><mo>=</mo><mi>m</mi><mn>2</mn>' +
      '</msubsup><mi>b</mi>';
  this.executeRuleTest(mml, 'a igual subíndice m superíndice 2 línea base b',
                       'default');
  this.executeRuleTest(mml, 'a igual sub m sup 2 b', 'brief');
  this.executeRuleTest(mml, 'a igual sub m sup 2 b', 'sbrief');
  mml = '<mi>a</mi><msubsup><mo>=</mo><mi>m</mi><mn>3</mn></msubsup><mi>b</mi>';
  this.executeRuleTest(mml, 'a igual subíndice m superíndice 3 línea base b',
                       'default');
  this.executeRuleTest(mml, 'a igual sub m sup 3 b', 'brief');
  this.executeRuleTest(mml, 'a igual sub m sup 3 b', 'sbrief');
  mml = '<mi>a</mi><msubsup><mo>=</mo><mi>m</mi><mn>n</mn></msubsup><mi>b</mi>';
  this.executeRuleTest(mml, 'a igual subíndice m superíndice n línea base b',
                       'default');
  this.executeRuleTest(mml, 'a igual sub m sup n b', 'brief');
  this.executeRuleTest(mml, 'a igual sub m sup n b', 'sbrief');
  mml = '<mi>a</mi><msubsup><mo>=</mo><mi>m</mi><mn>\'</mn>' +
      '</msubsup><mi>b</mi>';
  this.executeRuleTest(mml, 'a igual prima subíndice m línea base b',
                       'default');
  this.executeRuleTest(mml, 'a igual prima sub m b', 'brief');
  this.executeRuleTest(mml, 'a igual prima sub m b', 'sbrief');
};


/**
 * Testing relation embellished also from the left.
 */
sre.MathspeakEmbellishSpanishTest.prototype.testEmbellRelTensor = function() {
  var mml = '<mi>a</mi><mmultiscripts><mo>=</mo><mi>m</mi><mn>2</mn>' +
      '</mmultiscripts><mi>b</mi>';
  this.executeRuleTest(mml, 'a igual subíndice m superíndice 2 línea base b',
                       'default');
  this.executeRuleTest(mml, 'a igual sub m sup 2 b', 'brief');
  this.executeRuleTest(mml, 'a igual sub m sup 2 b', 'sbrief');
  mml = '<mi>a</mi><mmultiscripts><mo>=</mo><mi>m</mi><mn>2</mn>' +
      '<mprescripts/><none/><mn>3</mn></mmultiscripts><mi>b</mi>';
  this.executeRuleTest(mml, 'a superíndice 3 línea base igual subíndice m' +
                       ' superíndice 2 línea base b', 'default');
  this.executeRuleTest(mml, 'a sup 3 igual sub m sup 2 b', 'brief');
  this.executeRuleTest(mml, 'a sup 3 igual sub m sup 2 b', 'sbrief');
  mml = '<mi>a</mi><mmultiscripts><mo>=</mo><mi>m</mi><mn>2</mn>' +
      '<mprescripts/><mn>3</mn></mmultiscripts><mi>b</mi>';
  this.executeRuleTest(mml, 'a subíndice 3 línea base igual subíndice m' +
                       ' superíndice 2 línea base b', 'default');
  this.executeRuleTest(mml, 'a sub 3 igual sub m sup 2 b', 'brief');
  this.executeRuleTest(mml, 'a sub 3 igual sub m sup 2 b', 'sbrief');
  mml = '<mi>a</mi><mmultiscripts><mo>=</mo><mi>m</mi><mn>2</mn>' +
      '<mprescripts/><mn>3</mn><mi>n</mi></mmultiscripts><mi>b</mi>';
  this.executeRuleTest(mml, 'a subíndice 3 superíndice n línea base igual' +
                       ' subíndice m superíndice 2 línea base b', 'default');
  this.executeRuleTest(mml, 'a sub 3 sup n igual sub m sup 2 b', 'brief');
  this.executeRuleTest(mml, 'a sub 3 sup n igual sub m sup 2 b', 'sbrief');
};


/**
 * Testing multiple embellished relations.
 */
sre.MathspeakEmbellishSpanishTest.prototype.testEmbellMultRelSubscript =
    function() {
  var mml = '<mi>a</mi><msub><mo>=</mo><mn>2</mn></msub><mi>b</mi>' +
          '<mo>=</mo><mi>c</mi>';
  this.executeRuleTest(mml, 'a igual subíndice 2 línea base b igual c',
      'default');
  this.executeRuleTest(mml, 'a igual sub 2 b igual c', 'brief');
  this.executeRuleTest(mml, 'a igual sub 2 b igual c', 'sbrief');
};


/**
 * Testing punctuation embellished with subscript.
 */
sre.MathspeakEmbellishSpanishTest.prototype.testEmbellPunctSubscript =
    function() {
  var mml = '<mi>a</mi><msub><mo>:</mo><mn>2</mn></msub><mi>b</mi>';
  this.executeRuleTest(mml, 'a dos puntos subíndice 2 línea base b',
      'default');
  this.executeRuleTest(mml, 'a dos puntos sub 2 b', 'brief');
  this.executeRuleTest(mml, 'a dos puntos sub 2 b', 'sbrief');
};


/**
 * Testing punctuation embellished with superscript. Making sure cases of
 * squared and cube are not used.
 */
sre.MathspeakEmbellishSpanishTest.prototype.testEmbellPunctSuperscript =
    function() {
  var mml = '<mi>a</mi><msup><mo>:</mo><mn>2</mn></msup><mi>b</mi>';
  this.executeRuleTest(mml, 'a dos puntos superíndice 2 línea base b',
      'default');
  this.executeRuleTest(mml, 'a dos puntos sup 2 b', 'brief');
  this.executeRuleTest(mml, 'a dos puntos sup 2 b', 'sbrief');
  mml = '<mi>a</mi><msup><mo>:</mo><mn>3</mn></msup><mi>b</mi>';
  this.executeRuleTest(mml, 'a dos puntos superíndice 3 línea base b',
      'default');
  this.executeRuleTest(mml, 'a dos puntos sup 3 b', 'brief');
  this.executeRuleTest(mml, 'a dos puntos sup 3 b', 'sbrief');
  mml = '<mi>a</mi><msup><mo>:</mo><mn>n</mn></msup><mi>b</mi>';
  this.executeRuleTest(mml, 'a dos puntos superíndice n línea base b',
      'default');
  this.executeRuleTest(mml, 'a dos puntos sup n b', 'brief');
  this.executeRuleTest(mml, 'a dos puntos sup n b', 'sbrief');
  mml = '<mi>a</mi><msup><mo>:</mo><mo>\'</mo></msup><mi>b</mi>';
  this.executeRuleTest(mml, 'a dos puntos prima b', 'default');
  this.executeRuleTest(mml, 'a dos puntos prima b', 'brief');
  this.executeRuleTest(mml, 'a dos puntos prima b', 'sbrief');
};


/**
 * Testing punctuation embellished with sub and superscript. Making sure cases
 * of squared and cube are not used.
 */
sre.MathspeakEmbellishSpanishTest.prototype.testEmbellPunctSubSuper =
    function() {
  var mml = '<mi>a</mi><msubsup><mo>:</mo><mi>m</mi><mn>2</mn>' +
          '</msubsup><mi>b</mi>';
  this.executeRuleTest(mml, 'a dos puntos subíndice m superíndice 2 línea' +
      ' base b', 'default');
  this.executeRuleTest(mml, 'a dos puntos sub m sup 2 b', 'brief');
  this.executeRuleTest(mml, 'a dos puntos sub m sup 2 b', 'sbrief');
  mml = '<mi>a</mi><msubsup><mo>:</mo><mi>m</mi><mn>3</mn></msubsup><mi>b' +
      '</mi>';
  this.executeRuleTest(mml, 'a dos puntos subíndice m superíndice 3 línea' +
      ' base b', 'default');
  this.executeRuleTest(mml, 'a dos puntos sub m sup 3 b', 'brief');
  this.executeRuleTest(mml, 'a dos puntos sub m sup 3 b', 'sbrief');
  mml = '<mi>a</mi><msubsup><mo>:</mo><mi>m</mi><mn>n</mn></msubsup><mi>b' +
      '</mi>';
  this.executeRuleTest(mml, 'a dos puntos subíndice m superíndice n línea' +
      ' base b', 'default');
  this.executeRuleTest(mml, 'a dos puntos sub m sup n b', 'brief');
  this.executeRuleTest(mml, 'a dos puntos sub m sup n b', 'sbrief');
  mml = '<mi>a</mi><msubsup><mo>:</mo><mi>m</mi><mn>\'</mn>' +
      '</msubsup><mi>b</mi>';
  this.executeRuleTest(mml, 'a dos puntos prima subíndice m línea base b',
      'default');
  this.executeRuleTest(mml, 'a dos puntos prima sub m b', 'brief');
  this.executeRuleTest(mml, 'a dos puntos prima sub m b', 'sbrief');
};


/**
 * Testing punctuation embellished also from the left.
 */
sre.MathspeakEmbellishSpanishTest.prototype.testEmbellPunctTensor = function() {
  var mml = '<mi>a</mi><mmultiscripts><mo>:</mo><mi>m</mi><mn>2</mn>' +
      '</mmultiscripts><mi>b</mi>';
  this.executeRuleTest(mml, 'a dos puntos subíndice m superíndice 2 línea' +
                       ' base b', 'default');
  this.executeRuleTest(mml, 'a dos puntos sub m sup 2 b', 'brief');
  this.executeRuleTest(mml, 'a dos puntos sub m sup 2 b', 'sbrief');
  mml = '<mi>a</mi><mmultiscripts><mo>:</mo><mi>m</mi><mn>2</mn>' +
      '<mprescripts/><none/><mn>3</mn></mmultiscripts><mi>b</mi>';
  this.executeRuleTest(mml, 'a superíndice 3 línea base dos puntos' +
                       ' subíndice m superíndice 2 línea base b', 'default');
  this.executeRuleTest(mml, 'a sup 3 dos puntos sub m sup 2 b', 'brief');
  this.executeRuleTest(mml, 'a sup 3 dos puntos sub m sup 2 b', 'sbrief');
  mml = '<mi>a</mi><mmultiscripts><mo>:</mo><mi>m</mi><mn>2</mn>' +
      '<mprescripts/><mn>3</mn></mmultiscripts><mi>b</mi>';
  this.executeRuleTest(mml, 'a subíndice 3 línea base dos puntos subíndice' +
                       ' m superíndice 2 línea base b', 'default');
  this.executeRuleTest(mml, 'a sub 3 dos puntos sub m sup 2 b', 'brief');
  this.executeRuleTest(mml, 'a sub 3 dos puntos sub m sup 2 b', 'sbrief');
  mml = '<mi>a</mi><mmultiscripts><mo>:</mo><mi>m</mi><mn>2</mn>' +
      '<mprescripts/><mn>3</mn><mi>n</mi></mmultiscripts><mi>b</mi>';
  this.executeRuleTest(mml, 'a subíndice 3 superíndice n línea base dos' +
                       ' puntos subíndice m superíndice 2 línea base b',
                       'default');
  this.executeRuleTest(mml, 'a sub 3 sup n dos puntos sub m sup 2 b', 'brief');
  this.executeRuleTest(mml, 'a sub 3 sup n dos puntos sub m sup 2 b', 'sbrief');
};


/**
 * Testing multiple embellished punctuations.
 */
sre.MathspeakEmbellishSpanishTest.prototype.testEmbellMultPunctSubscript =
    function() {
  var mml = '<mi>a</mi><msub><mo>:</mo><mn>2</mn></msub><mi>b</mi>' +
          '<mo>:</mo><mi>c</mi>';
  this.executeRuleTest(mml, 'a dos puntos subíndice 2 línea base b dos' +
      ' puntos c', 'default');
  this.executeRuleTest(mml, 'a dos puntos sub 2 b dos puntos c', 'brief');
  this.executeRuleTest(mml, 'a dos puntos sub 2 b dos puntos c', 'sbrief');
};


/**
 * Expressions with semantic elements.
 */
sre.MathspeakEmbellishSpanishTest.prototype.testSemanticsElement = function() {
  var mml = '<semantics></semantics>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
  mml = '<semantics><mi>a</mi></semantics>';
  this.executeRuleTest(mml, 'a', 'default');
  this.executeRuleTest(mml, 'a', 'brief');
  this.executeRuleTest(mml, 'a', 'sbrief');
  mml = '<semantics><mrow><mi>a</mi><mo>+</mo><mi>b</mi></mrow></semantics>';
  this.executeRuleTest(mml, 'a más b', 'default');
  this.executeRuleTest(mml, 'a más b', 'brief');
  this.executeRuleTest(mml, 'a más b', 'sbrief');
  mml = '<mi>a</mi><mo>+</mo><semantics><mi>b</mi></semantics>';
  this.executeRuleTest(mml, 'a más b', 'default');
  this.executeRuleTest(mml, 'a más b', 'brief');
  this.executeRuleTest(mml, 'a más b', 'sbrief');
};


/**
 * Expressions with semantic elements and annotations.
 */
sre.MathspeakEmbellishSpanishTest.prototype.testSemanticsAnnotation = function()
    {
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
  this.executeRuleTest(mml, 'a más b', 'default');
  this.executeRuleTest(mml, 'a más b', 'brief');
  this.executeRuleTest(mml, 'a más b', 'sbrief');
  mml = '<mi>a</mi><mo>+</mo><semantics><mi>b</mi>' +
      '<annotation>something</annotation></semantics>';
  this.executeRuleTest(mml, 'a más b', 'default');
  this.executeRuleTest(mml, 'a más b', 'brief');
  this.executeRuleTest(mml, 'a más b', 'sbrief');
};


/**
 * Expressions with semantic elements and xml annotations.
 */
sre.MathspeakEmbellishSpanishTest.prototype.testSemanticsAnnotationXml =
    function() {
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
  this.executeRuleTest(mml, 'a más b', 'default');
  this.executeRuleTest(mml, 'a más b', 'brief');
  this.executeRuleTest(mml, 'a más b', 'sbrief');
  mml = '<mi>a</mi><mo>+</mo><semantics><mi>b</mi><annotation-xml>' +
      '<content>something</content></annotation-xml></semantics>';
  this.executeRuleTest(mml, 'a más b', 'default');
  this.executeRuleTest(mml, 'a más b', 'brief');
  this.executeRuleTest(mml, 'a más b', 'sbrief');
};

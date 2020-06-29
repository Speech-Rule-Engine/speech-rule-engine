// Copyright 2020 Volker Sorge
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
// This work was sponsored by ETH Zurich
//

/**
 * @fileoverview Testcases for embellished symbols for Mathspeak rules.
 * @author Volker.Sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.MathspeakEmbellishGermanTest');

goog.require('sre.AbstractRuleTest');



/**
 * @constructor
 * @extends {sre.AbstractRuleTest}
 */
sre.MathspeakEmbellishGermanTest = function() {
  sre.MathspeakEmbellishGermanTest.base(this, 'constructor');

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
  this.locale = 'de';

  this.setActive('EmbellishedSymbolsGerman');
};
goog.inherits(sre.MathspeakEmbellishGermanTest, sre.AbstractRuleTest);


/**
 * Testing operator embellished with subscript.
 */
sre.MathspeakEmbellishGermanTest.prototype.testEmbellOpSubscript = function() {
  var mml = '<mi>a</mi><msub><mo>+</mo><mn>2</mn></msub><mi>b</mi>';
  this.executeRuleTest(mml, 'a plus Index 2 Grundlinie b', 'default');
  this.executeRuleTest(mml, 'a plus Index 2 Grund b', 'brief');
  this.executeRuleTest(mml, 'a plus Index 2 Grund b', 'sbrief');
};


/**
 * Testing operator embellished with superscript. Making sure cases of squared
 * and cube are not used.
 */
sre.MathspeakEmbellishGermanTest.prototype.testEmbellOpSuperscript = function()
    {
  var mml = '<mi>a</mi><msup><mo>+</mo><mn>2</mn></msup><mi>b</mi>';
  this.executeRuleTest(mml, 'a plus hoch 2 Grundlinie b', 'default');
  this.executeRuleTest(mml, 'a plus hoch 2 Grund b', 'brief');
  this.executeRuleTest(mml, 'a plus hoch 2 Grund b', 'sbrief');
  mml = '<mi>a</mi><msup><mo>+</mo><mn>3</mn></msup><mi>b</mi>';
  this.executeRuleTest(mml, 'a plus hoch 3 Grundlinie b', 'default');
  this.executeRuleTest(mml, 'a plus hoch 3 Grund b', 'brief');
  this.executeRuleTest(mml, 'a plus hoch 3 Grund b', 'sbrief');
  mml = '<mi>a</mi><msup><mo>+</mo><mn>n</mn></msup><mi>b</mi>';
  this.executeRuleTest(mml, 'a plus hoch n Grundlinie b', 'default');
  this.executeRuleTest(mml, 'a plus hoch n Grund b', 'brief');
  this.executeRuleTest(mml, 'a plus hoch n Grund b', 'sbrief');
  mml = '<mi>a</mi><msup><mo>+</mo><mo>\'</mo></msup><mi>b</mi>';
  this.executeRuleTest(mml, 'a plus Hochkomma b', 'default');
  this.executeRuleTest(mml, 'a plus Hochkomma b', 'brief');
  this.executeRuleTest(mml, 'a plus Hochkomma b', 'sbrief');
};


/**
 * Testing operator embellished with sub and superscript. Making sure cases of
 * squared and cube are not used.
 */
sre.MathspeakEmbellishGermanTest.prototype.testEmbellOpSubSuper = function() {
  var mml = '<mi>a</mi><msubsup><mo>+</mo><mi>m</mi><mn>2</mn>' +
      '</msubsup><mi>b</mi>';
  this.executeRuleTest(mml, 'a plus Index m hoch 2 Grundlinie b', 'default');
  this.executeRuleTest(mml, 'a plus Index m hoch 2 Grund b', 'brief');
  this.executeRuleTest(mml, 'a plus Index m hoch 2 Grund b', 'sbrief');
  mml = '<mi>a</mi><msubsup><mo>+</mo><mi>m</mi><mn>3</mn></msubsup><mi>b</mi>';
  this.executeRuleTest(mml, 'a plus Index m hoch 3 Grundlinie b', 'default');
  this.executeRuleTest(mml, 'a plus Index m hoch 3 Grund b', 'brief');
  this.executeRuleTest(mml, 'a plus Index m hoch 3 Grund b', 'sbrief');
  mml = '<mi>a</mi><msubsup><mo>+</mo><mi>m</mi><mn>n</mn></msubsup><mi>b</mi>';
  this.executeRuleTest(mml, 'a plus Index m hoch n Grundlinie b', 'default');
  this.executeRuleTest(mml, 'a plus Index m hoch n Grund b', 'brief');
  this.executeRuleTest(mml, 'a plus Index m hoch n Grund b', 'sbrief');
  mml = '<mi>a</mi><msubsup><mo>+</mo><mi>m</mi><mn>\'</mn>' +
      '</msubsup><mi>b</mi>';
  this.executeRuleTest(mml, 'a plus Hochkomma Index m Grundlinie b', 'default');
  this.executeRuleTest(mml, 'a plus Hochkomma Index m Grund b', 'brief');
  this.executeRuleTest(mml, 'a plus Hochkomma Index m Grund b', 'sbrief');
};


/**
 * Testing operator embellished also from the left.
 */
sre.MathspeakEmbellishGermanTest.prototype.testEmbellOpTensor = function() {
  var mml = '<mi>a</mi><mmultiscripts><mo>+</mo><mi>m</mi><mn>2</mn>' +
      '</mmultiscripts><mi>b</mi>';
  this.executeRuleTest(mml, 'a plus Index m hoch 2 Grundlinie b', 'default');
  this.executeRuleTest(mml, 'a plus Index m hoch 2 Grund b', 'brief');
  this.executeRuleTest(mml, 'a plus Index m hoch 2 Grund b', 'sbrief');
  mml = '<mi>a</mi><mmultiscripts><mo>+</mo><mi>m</mi><mn>2</mn>' +
      '<mprescripts/><none/><mn>3</mn></mmultiscripts><mi>b</mi>';
  this.executeRuleTest(mml, 'a hoch 3 Grundlinie plus Index m hoch 2 Grundlinie b', 'default');
  this.executeRuleTest(mml, 'a hoch 3 Grund plus Index m hoch 2 Grund b', 'brief');
  this.executeRuleTest(mml, 'a hoch 3 Grund plus Index m hoch 2 Grund b', 'sbrief');
  mml = '<mi>a</mi><mmultiscripts><mo>+</mo><mi>m</mi><mn>2</mn>' +
      '<mprescripts/><mn>3</mn></mmultiscripts><mi>b</mi>';
  this.executeRuleTest(mml, 'a Index 3 Grundlinie plus Index m hoch 2 Grundlinie b', 'default');
  this.executeRuleTest(mml, 'a Index 3 Grund plus Index m hoch 2 Grund b', 'brief');
  this.executeRuleTest(mml, 'a Index 3 Grund plus Index m hoch 2 Grund b', 'sbrief');
  mml = '<mi>a</mi><mmultiscripts><mo>+</mo><mi>m</mi><mn>2</mn>' +
      '<mprescripts/><mn>3</mn><mi>n</mi></mmultiscripts><mi>b</mi>';
  this.executeRuleTest(mml, 'a Index 3 hoch n Grundlinie plus Index m hoch 2 Grundlinie b', 'default');
  this.executeRuleTest(mml, 'a Index 3 hoch n Grund plus Index m hoch 2 Grund b', 'brief');
  this.executeRuleTest(mml, 'a Index 3 hoch n Grund plus Index m hoch 2 Grund b', 'sbrief');
};


/**
 * Testing relation embellished with subscript.
 */
sre.MathspeakEmbellishGermanTest.prototype.testEmbellRelSubscript = function()
    {
  var mml = '<mi>a</mi><msub><mo>=</mo><mn>2</mn></msub><mi>b</mi>';
  this.executeRuleTest(mml, 'a ist gleich Index 2 Grundlinie b', 'default');
  this.executeRuleTest(mml, 'a ist gleich Index 2 Grund b', 'brief');
  this.executeRuleTest(mml, 'a ist gleich Index 2 Grund b', 'sbrief');
};


/**
 * Testing relation embellished with superscript. Making sure cases of squared
 * and cube are not used.
 */
sre.MathspeakEmbellishGermanTest.prototype.testEmbellRelSuperscript =
    function() {
  var mml = '<mi>a</mi><msup><mo>=</mo><mn>2</mn></msup><mi>b</mi>';
  this.executeRuleTest(mml, 'a ist gleich hoch 2 Grundlinie b', 'default');
  this.executeRuleTest(mml, 'a ist gleich hoch 2 Grund b', 'brief');
  this.executeRuleTest(mml, 'a ist gleich hoch 2 Grund b', 'sbrief');
  mml = '<mi>a</mi><msup><mo>=</mo><mn>3</mn></msup><mi>b</mi>';
  this.executeRuleTest(mml, 'a ist gleich hoch 3 Grundlinie b', 'default');
  this.executeRuleTest(mml, 'a ist gleich hoch 3 Grund b', 'brief');
  this.executeRuleTest(mml, 'a ist gleich hoch 3 Grund b', 'sbrief');
  mml = '<mi>a</mi><msup><mo>=</mo><mn>n</mn></msup><mi>b</mi>';
  this.executeRuleTest(mml, 'a ist gleich hoch n Grundlinie b', 'default');
  this.executeRuleTest(mml, 'a ist gleich hoch n Grund b', 'brief');
  this.executeRuleTest(mml, 'a ist gleich hoch n Grund b', 'sbrief');
  mml = '<mi>a</mi><msup><mo>=</mo><mo>\'</mo></msup><mi>b</mi>';
  this.executeRuleTest(mml, 'a ist gleich Hochkomma b', 'default');
  this.executeRuleTest(mml, 'a ist gleich Hochkomma b', 'brief');
  this.executeRuleTest(mml, 'a ist gleich Hochkomma b', 'sbrief');
};


/**
 * Testing relation embellished with sub and superscript. Making sure cases of
 * squared and cube are not used.
 */
sre.MathspeakEmbellishGermanTest.prototype.testEmbellRelSubSuper = function() {
  var mml = '<mi>a</mi><msubsup><mo>=</mo><mi>m</mi><mn>2</mn>' +
      '</msubsup><mi>b</mi>';
  this.executeRuleTest(mml, 'a ist gleich Index m hoch 2 Grundlinie b', 'default');
  this.executeRuleTest(mml, 'a ist gleich Index m hoch 2 Grund b', 'brief');
  this.executeRuleTest(mml, 'a ist gleich Index m hoch 2 Grund b', 'sbrief');
  mml = '<mi>a</mi><msubsup><mo>=</mo><mi>m</mi><mn>3</mn></msubsup><mi>b</mi>';
  this.executeRuleTest(mml, 'a ist gleich Index m hoch 3 Grundlinie b', 'default');
  this.executeRuleTest(mml, 'a ist gleich Index m hoch 3 Grund b', 'brief');
  this.executeRuleTest(mml, 'a ist gleich Index m hoch 3 Grund b', 'sbrief');
  mml = '<mi>a</mi><msubsup><mo>=</mo><mi>m</mi><mn>n</mn></msubsup><mi>b</mi>';
  this.executeRuleTest(mml, 'a ist gleich Index m hoch n Grundlinie b', 'default');
  this.executeRuleTest(mml, 'a ist gleich Index m hoch n Grund b', 'brief');
  this.executeRuleTest(mml, 'a ist gleich Index m hoch n Grund b', 'sbrief');
  mml = '<mi>a</mi><msubsup><mo>=</mo><mi>m</mi><mn>\'</mn>' +
      '</msubsup><mi>b</mi>';
  this.executeRuleTest(mml, 'a ist gleich Hochkomma Index m Grundlinie b', 'default');
  this.executeRuleTest(mml, 'a ist gleich Hochkomma Index m Grund b', 'brief');
  this.executeRuleTest(mml, 'a ist gleich Hochkomma Index m Grund b', 'sbrief');
};


/**
 * Testing relation embellished also from the left.
 */
sre.MathspeakEmbellishGermanTest.prototype.testEmbellRelTensor = function() {
  var mml = '<mi>a</mi><mmultiscripts><mo>=</mo><mi>m</mi><mn>2</mn>' +
      '</mmultiscripts><mi>b</mi>';
  this.executeRuleTest(mml, 'a ist gleich Index m hoch 2 Grundlinie b', 'default');
  this.executeRuleTest(mml, 'a ist gleich Index m hoch 2 Grund b', 'brief');
  this.executeRuleTest(mml, 'a ist gleich Index m hoch 2 Grund b', 'sbrief');
  mml = '<mi>a</mi><mmultiscripts><mo>=</mo><mi>m</mi><mn>2</mn>' +
      '<mprescripts/><none/><mn>3</mn></mmultiscripts><mi>b</mi>';
  this.executeRuleTest(mml, 'a hoch 3 Grundlinie ist gleich Index m hoch 2 Grundlinie b', 'default');
  this.executeRuleTest(mml, 'a hoch 3 Grund ist gleich Index m hoch 2 Grund b', 'brief');
  this.executeRuleTest(mml, 'a hoch 3 Grund ist gleich Index m hoch 2 Grund b', 'sbrief');
  mml = '<mi>a</mi><mmultiscripts><mo>=</mo><mi>m</mi><mn>2</mn>' +
      '<mprescripts/><mn>3</mn></mmultiscripts><mi>b</mi>';
  this.executeRuleTest(mml, 'a Index 3 Grundlinie ist gleich Index m hoch 2 Grundlinie b', 'default');
  this.executeRuleTest(mml, 'a Index 3 Grund ist gleich Index m hoch 2 Grund b', 'brief');
  this.executeRuleTest(mml, 'a Index 3 Grund ist gleich Index m hoch 2 Grund b', 'sbrief');
  mml = '<mi>a</mi><mmultiscripts><mo>=</mo><mi>m</mi><mn>2</mn>' +
      '<mprescripts/><mn>3</mn><mi>n</mi></mmultiscripts><mi>b</mi>';
  this.executeRuleTest(mml, 'a Index 3 hoch n Grundlinie ist gleich Index m hoch 2 Grundlinie b', 'default');
  this.executeRuleTest(mml, 'a Index 3 hoch n Grund ist gleich Index m hoch 2 Grund b', 'brief');
  this.executeRuleTest(mml, 'a Index 3 hoch n Grund ist gleich Index m hoch 2 Grund b', 'sbrief');
};


/**
 * Testing multiple embellished relations.
 */
sre.MathspeakEmbellishGermanTest.prototype.testEmbellMultRelSubscript =
    function() {
  var mml = '<mi>a</mi><msub><mo>=</mo><mn>2</mn></msub><mi>b</mi>' +
          '<mo>=</mo><mi>c</mi>';
  this.executeRuleTest(mml, 'a ist gleich Index 2 Grundlinie b ist gleich c', 'default');
  this.executeRuleTest(mml, 'a ist gleich Index 2 Grund b ist gleich c', 'brief');
  this.executeRuleTest(mml, 'a ist gleich Index 2 Grund b ist gleich c', 'sbrief');
};


/**
 * Testing punctuation embellished with subscript.
 */
sre.MathspeakEmbellishGermanTest.prototype.testEmbellPunctSubscript =
    function() {
  var mml = '<mi>a</mi><msub><mo>:</mo><mn>2</mn></msub><mi>b</mi>';
  this.executeRuleTest(mml, 'a Doppelpunkt Index 2 Grundlinie b', 'default');
  this.executeRuleTest(mml, 'a Doppelpunkt Index 2 Grund b', 'brief');
  this.executeRuleTest(mml, 'a Doppelpunkt Index 2 Grund b', 'sbrief');
};


/**
 * Testing punctuation embellished with superscript. Making sure cases of
 * squared and cube are not used.
 */
sre.MathspeakEmbellishGermanTest.prototype.testEmbellPunctSuperscript =
    function() {
  var mml = '<mi>a</mi><msup><mo>:</mo><mn>2</mn></msup><mi>b</mi>';
  this.executeRuleTest(mml, 'a Doppelpunkt hoch 2 Grundlinie b', 'default');
  this.executeRuleTest(mml, 'a Doppelpunkt hoch 2 Grund b', 'brief');
  this.executeRuleTest(mml, 'a Doppelpunkt hoch 2 Grund b', 'sbrief');
  mml = '<mi>a</mi><msup><mo>:</mo><mn>3</mn></msup><mi>b</mi>';
  this.executeRuleTest(mml, 'a Doppelpunkt hoch 3 Grundlinie b', 'default');
  this.executeRuleTest(mml, 'a Doppelpunkt hoch 3 Grund b', 'brief');
  this.executeRuleTest(mml, 'a Doppelpunkt hoch 3 Grund b', 'sbrief');
  mml = '<mi>a</mi><msup><mo>:</mo><mn>n</mn></msup><mi>b</mi>';
  this.executeRuleTest(mml, 'a Doppelpunkt hoch n Grundlinie b', 'default');
  this.executeRuleTest(mml, 'a Doppelpunkt hoch n Grund b', 'brief');
  this.executeRuleTest(mml, 'a Doppelpunkt hoch n Grund b', 'sbrief');
  mml = '<mi>a</mi><msup><mo>:</mo><mo>\'</mo></msup><mi>b</mi>';
  this.executeRuleTest(mml, 'a Doppelpunkt Hochkomma b', 'default');
  this.executeRuleTest(mml, 'a Doppelpunkt Hochkomma b', 'brief');
  this.executeRuleTest(mml, 'a Doppelpunkt Hochkomma b', 'sbrief');
};


/**
 * Testing punctuation embellished with sub and superscript. Making sure cases
 * of squared and cube are not used.
 */
sre.MathspeakEmbellishGermanTest.prototype.testEmbellPunctSubSuper =
    function() {
  var mml = '<mi>a</mi><msubsup><mo>:</mo><mi>m</mi><mn>2</mn>' +
          '</msubsup><mi>b</mi>';
  this.executeRuleTest(mml, 'a Doppelpunkt Index m hoch 2 Grundlinie b', 'default');
  this.executeRuleTest(mml, 'a Doppelpunkt Index m hoch 2 Grund b', 'brief');
  this.executeRuleTest(mml, 'a Doppelpunkt Index m hoch 2 Grund b', 'sbrief');
  mml = '<mi>a</mi><msubsup><mo>:</mo><mi>m</mi><mn>3</mn></msubsup><mi>b' +
      '</mi>';
  this.executeRuleTest(mml, 'a Doppelpunkt Index m hoch 3 Grundlinie b', 'default');
  this.executeRuleTest(mml, 'a Doppelpunkt Index m hoch 3 Grund b', 'brief');
  this.executeRuleTest(mml, 'a Doppelpunkt Index m hoch 3 Grund b', 'sbrief');
  mml = '<mi>a</mi><msubsup><mo>:</mo><mi>m</mi><mn>n</mn></msubsup><mi>b' +
      '</mi>';
  this.executeRuleTest(mml, 'a Doppelpunkt Index m hoch n Grundlinie b', 'default');
  this.executeRuleTest(mml, 'a Doppelpunkt Index m hoch n Grund b', 'brief');
  this.executeRuleTest(mml, 'a Doppelpunkt Index m hoch n Grund b', 'sbrief');
  mml = '<mi>a</mi><msubsup><mo>:</mo><mi>m</mi><mn>\'</mn>' +
      '</msubsup><mi>b</mi>';
  this.executeRuleTest(mml, 'a Doppelpunkt Hochkomma Index m Grundlinie b', 'default');
  this.executeRuleTest(mml, 'a Doppelpunkt Hochkomma Index m Grund b', 'brief');
  this.executeRuleTest(mml, 'a Doppelpunkt Hochkomma Index m Grund b', 'sbrief');
};


/**
 * Testing punctuation embellished also from the left.
 */
sre.MathspeakEmbellishGermanTest.prototype.testEmbellPunctTensor = function() {
  var mml = '<mi>a</mi><mmultiscripts><mo>:</mo><mi>m</mi><mn>2</mn>' +
      '</mmultiscripts><mi>b</mi>';
  this.executeRuleTest(mml, 'a Doppelpunkt Index m hoch 2 Grundlinie b', 'default');
  this.executeRuleTest(mml, 'a Doppelpunkt Index m hoch 2 Grund b', 'brief');
  this.executeRuleTest(mml, 'a Doppelpunkt Index m hoch 2 Grund b', 'sbrief');
  mml = '<mi>a</mi><mmultiscripts><mo>:</mo><mi>m</mi><mn>2</mn>' +
      '<mprescripts/><none/><mn>3</mn></mmultiscripts><mi>b</mi>';
  this.executeRuleTest(mml, 'a hoch 3 Grundlinie Doppelpunkt Index m hoch 2 Grundlinie b', 'default');
  this.executeRuleTest(mml, 'a hoch 3 Grund Doppelpunkt Index m hoch 2 Grund b', 'brief');
  this.executeRuleTest(mml, 'a hoch 3 Grund Doppelpunkt Index m hoch 2 Grund b', 'sbrief');
  mml = '<mi>a</mi><mmultiscripts><mo>:</mo><mi>m</mi><mn>2</mn>' +
      '<mprescripts/><mn>3</mn></mmultiscripts><mi>b</mi>';
  this.executeRuleTest(mml, 'a Index 3 Grundlinie Doppelpunkt Index m hoch 2 Grundlinie b', 'default');
  this.executeRuleTest(mml, 'a Index 3 Grund Doppelpunkt Index m hoch 2 Grund b', 'brief');
  this.executeRuleTest(mml, 'a Index 3 Grund Doppelpunkt Index m hoch 2 Grund b', 'sbrief');
  mml = '<mi>a</mi><mmultiscripts><mo>:</mo><mi>m</mi><mn>2</mn>' +
      '<mprescripts/><mn>3</mn><mi>n</mi></mmultiscripts><mi>b</mi>';
  this.executeRuleTest(mml, 'a Index 3 hoch n Grundlinie Doppelpunkt Index m hoch 2 Grundlinie b', 'default');
  this.executeRuleTest(mml, 'a Index 3 hoch n Grund Doppelpunkt Index m hoch 2 Grund b', 'brief');
  this.executeRuleTest(mml, 'a Index 3 hoch n Grund Doppelpunkt Index m hoch 2 Grund b', 'sbrief');
};


/**
 * Testing multiple embellished punctuations.
 */
sre.MathspeakEmbellishGermanTest.prototype.testEmbellMultPunctSubscript =
    function() {
  var mml = '<mi>a</mi><msub><mo>:</mo><mn>2</mn></msub><mi>b</mi>' +
          '<mo>:</mo><mi>c</mi>';
  this.executeRuleTest(mml, 'a Doppelpunkt Index 2 Grundlinie b Doppelpunkt c', 'default');
  this.executeRuleTest(mml, 'a Doppelpunkt Index 2 Grund b Doppelpunkt c', 'brief');
  this.executeRuleTest(mml, 'a Doppelpunkt Index 2 Grund b Doppelpunkt c', 'sbrief');
};


/**
 * Expressions with semantic elements.
 */
sre.MathspeakEmbellishGermanTest.prototype.testSemanticsElement = function() {
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
sre.MathspeakEmbellishGermanTest.prototype.testSemanticsAnnotation = function()
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
sre.MathspeakEmbellishGermanTest.prototype.testSemanticsAnnotationXml =
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
  this.executeRuleTest(mml, 'a plus b', 'default');
  this.executeRuleTest(mml, 'a plus b', 'brief');
  this.executeRuleTest(mml, 'a plus b', 'sbrief');
  mml = '<mi>a</mi><mo>+</mo><semantics><mi>b</mi><annotation-xml>' +
      '<content>something</content></annotation-xml></semantics>';
  this.executeRuleTest(mml, 'a plus b', 'default');
  this.executeRuleTest(mml, 'a plus b', 'brief');
  this.executeRuleTest(mml, 'a plus b', 'sbrief');
};

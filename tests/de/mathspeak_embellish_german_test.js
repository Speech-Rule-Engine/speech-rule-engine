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
  this.semantics = true;

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
  this.executeRuleTest(mml, 'a plus indice 2 position de base b', 'default');
  this.executeRuleTest(mml, 'a plus sub 2 position de base b', 'brief');
  this.executeRuleTest(mml, 'a plus sub 2 position de base b', 'sbrief');
};


/**
 * Testing operator embellished with superscript. Making sure cases of squared
 * and cube are not used.
 */
sre.MathspeakEmbellishGermanTest.prototype.testEmbellOpSuperscript = function()
    {
  var mml = '<mi>a</mi><msup><mo>+</mo><mn>2</mn></msup><mi>b</mi>';
  this.executeRuleTest(mml, 'a plus exposant 2 position de base b', 'default');
  this.executeRuleTest(mml, 'a plus sup 2 position de base b', 'brief');
  this.executeRuleTest(mml, 'a plus sup 2 position de base b', 'sbrief');
  mml = '<mi>a</mi><msup><mo>+</mo><mn>3</mn></msup><mi>b</mi>';
  this.executeRuleTest(mml, 'a plus exposant 3 position de base b', 'default');
  this.executeRuleTest(mml, 'a plus sup 3 position de base b', 'brief');
  this.executeRuleTest(mml, 'a plus sup 3 position de base b', 'sbrief');
  mml = '<mi>a</mi><msup><mo>+</mo><mn>n</mn></msup><mi>b</mi>';
  this.executeRuleTest(mml, 'a plus exposant n position de base b', 'default');
  this.executeRuleTest(mml, 'a plus sup n position de base b', 'brief');
  this.executeRuleTest(mml, 'a plus sup n position de base b', 'sbrief');
  mml = '<mi>a</mi><msup><mo>+</mo><mo>\'</mo></msup><mi>b</mi>';
  this.executeRuleTest(mml, 'a plus prime b', 'default');
  this.executeRuleTest(mml, 'a plus prime b', 'brief');
  this.executeRuleTest(mml, 'a plus prime b', 'sbrief');
};


/**
 * Testing operator embellished with sub and superscript. Making sure cases of
 * squared and cube are not used.
 */
sre.MathspeakEmbellishGermanTest.prototype.testEmbellOpSubSuper = function() {
  var mml = '<mi>a</mi><msubsup><mo>+</mo><mi>m</mi><mn>2</mn>' +
      '</msubsup><mi>b</mi>';
  this.executeRuleTest(mml, 'a plus indice m exposant 2 position de base b',
                       'default');
  this.executeRuleTest(mml, 'a plus sub m sup 2 position de base b', 'brief');
  this.executeRuleTest(mml, 'a plus sub m sup 2 position de base b', 'sbrief');
  mml = '<mi>a</mi><msubsup><mo>+</mo><mi>m</mi><mn>3</mn></msubsup><mi>b</mi>';
  this.executeRuleTest(mml, 'a plus indice m exposant 3 position de base b',
                       'default');
  this.executeRuleTest(mml, 'a plus sub m sup 3 position de base b', 'brief');
  this.executeRuleTest(mml, 'a plus sub m sup 3 position de base b', 'sbrief');
  mml = '<mi>a</mi><msubsup><mo>+</mo><mi>m</mi><mn>n</mn></msubsup><mi>b</mi>';
  this.executeRuleTest(mml, 'a plus indice m exposant n position de base b',
                       'default');
  this.executeRuleTest(mml, 'a plus sub m sup n position de base b', 'brief');
  this.executeRuleTest(mml, 'a plus sub m sup n position de base b', 'sbrief');
  mml = '<mi>a</mi><msubsup><mo>+</mo><mi>m</mi><mn>\'</mn>' +
      '</msubsup><mi>b</mi>';
  this.executeRuleTest(mml, 'a plus prime indice m position de base b', 'default');
  this.executeRuleTest(mml, 'a plus prime sub m position de base b', 'brief');
  this.executeRuleTest(mml, 'a plus prime sub m position de base b', 'sbrief');
};


/**
 * Testing operator embellished also from the left.
 */
sre.MathspeakEmbellishGermanTest.prototype.testEmbellOpTensor = function() {
  var mml = '<mi>a</mi><mmultiscripts><mo>+</mo><mi>m</mi><mn>2</mn>' +
      '</mmultiscripts><mi>b</mi>';
  this.executeRuleTest(mml, 'a plus indice m exposant 2 position de base b',
                       'default');
  this.executeRuleTest(mml, 'a plus sub m sup 2 position de base b', 'brief');
  this.executeRuleTest(mml, 'a plus sub m sup 2 position de base b', 'sbrief');
  mml = '<mi>a</mi><mmultiscripts><mo>+</mo><mi>m</mi><mn>2</mn>' +
      '<mprescripts/><none/><mn>3</mn></mmultiscripts><mi>b</mi>';
  this.executeRuleTest(mml, 'a exposant gauche 3 position de base plus indice m exposant 2 position de base b', 'default');
  this.executeRuleTest(mml, 'a sup gauche 3 position de base plus sub m sup 2 position de base b', 'brief');
  this.executeRuleTest(mml, 'a sup gauche 3 position de base plus sub m sup 2 position de base b', 'sbrief');
  mml = '<mi>a</mi><mmultiscripts><mo>+</mo><mi>m</mi><mn>2</mn>' +
      '<mprescripts/><mn>3</mn></mmultiscripts><mi>b</mi>';
  this.executeRuleTest(mml, 'a indice gauche 3 position de base plus indice m exposant 2 position de base b', 'default');
  this.executeRuleTest(mml, 'a sub gauche 3 position de base plus sub m sup 2 position de base b', 'brief');
  this.executeRuleTest(mml, 'a sub gauche 3 position de base plus sub m sup 2 position de base b', 'sbrief');
  mml = '<mi>a</mi><mmultiscripts><mo>+</mo><mi>m</mi><mn>2</mn>' +
      '<mprescripts/><mn>3</mn><mi>n</mi></mmultiscripts><mi>b</mi>';
  this.executeRuleTest(mml, 'a indice gauche 3 exposant gauche n position de base plus indice m exposant 2 position de base b', 'default');
  this.executeRuleTest(mml, 'a sub gauche 3 sup gauche n position de base plus sub m sup 2 position de base b', 'brief');
  this.executeRuleTest(mml, 'a sub gauche 3 sup gauche n position de base plus sub m sup 2 position de base b', 'sbrief');
};


/**
 * Testing relation embellished with subscript.
 */
sre.MathspeakEmbellishGermanTest.prototype.testEmbellRelSubscript = function()
    {
  var mml = '<mi>a</mi><msub><mo>=</mo><mn>2</mn></msub><mi>b</mi>';
  this.executeRuleTest(mml, 'a égale indice 2 position de base b', 'default');
  this.executeRuleTest(mml, 'a égale sub 2 position de base b', 'brief');
  this.executeRuleTest(mml, 'a égale sub 2 position de base b', 'sbrief');
};


/**
 * Testing relation embellished with superscript. Making sure cases of squared
 * and cube are not used.
 */
sre.MathspeakEmbellishGermanTest.prototype.testEmbellRelSuperscript =
    function() {
  var mml = '<mi>a</mi><msup><mo>=</mo><mn>2</mn></msup><mi>b</mi>';
  this.executeRuleTest(mml, 'a égale exposant 2 position de base b', 'default');
  this.executeRuleTest(mml, 'a égale sup 2 position de base b', 'brief');
  this.executeRuleTest(mml, 'a égale sup 2 position de base b', 'sbrief');
  mml = '<mi>a</mi><msup><mo>=</mo><mn>3</mn></msup><mi>b</mi>';
  this.executeRuleTest(mml, 'a égale exposant 3 position de base b', 'default');
  this.executeRuleTest(mml, 'a égale sup 3 position de base b', 'brief');
  this.executeRuleTest(mml, 'a égale sup 3 position de base b', 'sbrief');
  mml = '<mi>a</mi><msup><mo>=</mo><mn>n</mn></msup><mi>b</mi>';
  this.executeRuleTest(mml, 'a égale exposant n position de base b', 'default');
  this.executeRuleTest(mml, 'a égale sup n position de base b', 'brief');
  this.executeRuleTest(mml, 'a égale sup n position de base b', 'sbrief');
  mml = '<mi>a</mi><msup><mo>=</mo><mo>\'</mo></msup><mi>b</mi>';
  this.executeRuleTest(mml, 'a égale prime b', 'default');
  this.executeRuleTest(mml, 'a égale prime b', 'brief');
  this.executeRuleTest(mml, 'a égale prime b', 'sbrief');
};


/**
 * Testing relation embellished with sub and superscript. Making sure cases of
 * squared and cube are not used.
 */
sre.MathspeakEmbellishGermanTest.prototype.testEmbellRelSubSuper = function() {
  var mml = '<mi>a</mi><msubsup><mo>=</mo><mi>m</mi><mn>2</mn>' +
      '</msubsup><mi>b</mi>';
  this.executeRuleTest(mml, 'a égale indice m exposant 2 position de base b',
                       'default');
  this.executeRuleTest(mml, 'a égale sub m sup 2 position de base b', 'brief');
  this.executeRuleTest(mml, 'a égale sub m sup 2 position de base b', 'sbrief');
  mml = '<mi>a</mi><msubsup><mo>=</mo><mi>m</mi><mn>3</mn></msubsup><mi>b</mi>';
  this.executeRuleTest(mml, 'a égale indice m exposant 3 position de base b',
                       'default');
  this.executeRuleTest(mml, 'a égale sub m sup 3 position de base b', 'brief');
  this.executeRuleTest(mml, 'a égale sub m sup 3 position de base b', 'sbrief');
  mml = '<mi>a</mi><msubsup><mo>=</mo><mi>m</mi><mn>n</mn></msubsup><mi>b</mi>';
  this.executeRuleTest(mml, 'a égale indice m exposant n position de base b',
                       'default');
  this.executeRuleTest(mml, 'a égale sub m sup n position de base b', 'brief');
  this.executeRuleTest(mml, 'a égale sub m sup n position de base b', 'sbrief');
  mml = '<mi>a</mi><msubsup><mo>=</mo><mi>m</mi><mn>\'</mn>' +
      '</msubsup><mi>b</mi>';
  this.executeRuleTest(mml, 'a égale prime indice m position de base b',
                       'default');
  this.executeRuleTest(mml, 'a égale prime sub m position de base b', 'brief');
  this.executeRuleTest(mml, 'a égale prime sub m position de base b', 'sbrief');
};


/**
 * Testing relation embellished also from the left.
 */
sre.MathspeakEmbellishGermanTest.prototype.testEmbellRelTensor = function() {
  var mml = '<mi>a</mi><mmultiscripts><mo>=</mo><mi>m</mi><mn>2</mn>' +
      '</mmultiscripts><mi>b</mi>';
  this.executeRuleTest(mml, 'a égale indice m exposant 2 position de base b',
                       'default');
  this.executeRuleTest(mml, 'a égale sub m sup 2 position de base b', 'brief');
  this.executeRuleTest(mml, 'a égale sub m sup 2 position de base b', 'sbrief');
  mml = '<mi>a</mi><mmultiscripts><mo>=</mo><mi>m</mi><mn>2</mn>' +
      '<mprescripts/><none/><mn>3</mn></mmultiscripts><mi>b</mi>';
  this.executeRuleTest(mml, 'a exposant gauche 3 position de base égale indice m exposant 2 position de base b', 'default');
  this.executeRuleTest(mml, 'a sup gauche 3 position de base égale sub m sup 2 position de base b', 'brief');
  this.executeRuleTest(mml, 'a sup gauche 3 position de base égale sub m sup 2 position de base b', 'sbrief');
  mml = '<mi>a</mi><mmultiscripts><mo>=</mo><mi>m</mi><mn>2</mn>' +
      '<mprescripts/><mn>3</mn></mmultiscripts><mi>b</mi>';
  this.executeRuleTest(mml, 'a indice gauche 3 position de base égale indice m exposant 2 position de base b', 'default');
  this.executeRuleTest(mml, 'a sub gauche 3 position de base égale sub m sup 2 position de base b', 'brief');
  this.executeRuleTest(mml, 'a sub gauche 3 position de base égale sub m sup 2 position de base b', 'sbrief');
  mml = '<mi>a</mi><mmultiscripts><mo>=</mo><mi>m</mi><mn>2</mn>' +
      '<mprescripts/><mn>3</mn><mi>n</mi></mmultiscripts><mi>b</mi>';
  this.executeRuleTest(mml, 'a indice gauche 3 exposant gauche n position de base égale indice m exposant 2 position de base b', 'default');
  this.executeRuleTest(mml, 'a sub gauche 3 sup gauche n position de base égale sub m sup 2 position de base b', 'brief');
  this.executeRuleTest(mml, 'a sub gauche 3 sup gauche n position de base égale sub m sup 2 position de base b', 'sbrief');
};


/**
 * Testing multiple embellished relations.
 */
sre.MathspeakEmbellishGermanTest.prototype.testEmbellMultRelSubscript =
    function() {
  var mml = '<mi>a</mi><msub><mo>=</mo><mn>2</mn></msub><mi>b</mi>' +
          '<mo>=</mo><mi>c</mi>';
  this.executeRuleTest(mml, 'a égale indice 2 position de base b égale c',
      'default');
  this.executeRuleTest(mml, 'a égale sub 2 position de base b égale c', 'brief');
  this.executeRuleTest(mml, 'a égale sub 2 position de base b égale c', 'sbrief');
};


/**
 * Testing punctuation embellished with subscript.
 */
sre.MathspeakEmbellishGermanTest.prototype.testEmbellPunctSubscript =
    function() {
  var mml = '<mi>a</mi><msub><mo>:</mo><mn>2</mn></msub><mi>b</mi>';
  this.executeRuleTest(mml, 'a deux points indice 2 position de base b',
      'default');
  this.executeRuleTest(mml, 'a deux points sub 2 position de base b', 'brief');
  this.executeRuleTest(mml, 'a deux points sub 2 position de base b', 'sbrief');
};


/**
 * Testing punctuation embellished with superscript. Making sure cases of
 * squared and cube are not used.
 */
sre.MathspeakEmbellishGermanTest.prototype.testEmbellPunctSuperscript =
    function() {
  var mml = '<mi>a</mi><msup><mo>:</mo><mn>2</mn></msup><mi>b</mi>';
  this.executeRuleTest(mml, 'a deux points exposant 2 position de base b',
      'default');
  this.executeRuleTest(mml, 'a deux points sup 2 position de base b', 'brief');
  this.executeRuleTest(mml, 'a deux points sup 2 position de base b', 'sbrief');
  mml = '<mi>a</mi><msup><mo>:</mo><mn>3</mn></msup><mi>b</mi>';
  this.executeRuleTest(mml, 'a deux points exposant 3 position de base b',
      'default');
  this.executeRuleTest(mml, 'a deux points sup 3 position de base b', 'brief');
  this.executeRuleTest(mml, 'a deux points sup 3 position de base b', 'sbrief');
  mml = '<mi>a</mi><msup><mo>:</mo><mn>n</mn></msup><mi>b</mi>';
  this.executeRuleTest(mml, 'a deux points exposant n position de base b',
      'default');
  this.executeRuleTest(mml, 'a deux points sup n position de base b', 'brief');
  this.executeRuleTest(mml, 'a deux points sup n position de base b', 'sbrief');
  mml = '<mi>a</mi><msup><mo>:</mo><mo>\'</mo></msup><mi>b</mi>';
  this.executeRuleTest(mml, 'a deux points prime b', 'default');
  this.executeRuleTest(mml, 'a deux points prime b', 'brief');
  this.executeRuleTest(mml, 'a deux points prime b', 'sbrief');
};


/**
 * Testing punctuation embellished with sub and superscript. Making sure cases
 * of squared and cube are not used.
 */
sre.MathspeakEmbellishGermanTest.prototype.testEmbellPunctSubSuper =
    function() {
  var mml = '<mi>a</mi><msubsup><mo>:</mo><mi>m</mi><mn>2</mn>' +
          '</msubsup><mi>b</mi>';
  this.executeRuleTest(mml, 'a deux points indice m exposant 2 position de base b', 'default');
  this.executeRuleTest(mml, 'a deux points sub m sup 2 position de base b', 'brief');
  this.executeRuleTest(mml, 'a deux points sub m sup 2 position de base b', 'sbrief');
  mml = '<mi>a</mi><msubsup><mo>:</mo><mi>m</mi><mn>3</mn></msubsup><mi>b' +
      '</mi>';
  this.executeRuleTest(mml, 'a deux points indice m exposant 3 position de base b', 'default');
  this.executeRuleTest(mml, 'a deux points sub m sup 3 position de base b', 'brief');
  this.executeRuleTest(mml, 'a deux points sub m sup 3 position de base b', 'sbrief');
  mml = '<mi>a</mi><msubsup><mo>:</mo><mi>m</mi><mn>n</mn></msubsup><mi>b' +
      '</mi>';
  this.executeRuleTest(mml, 'a deux points indice m exposant n position de base b', 'default');
  this.executeRuleTest(mml, 'a deux points sub m sup n position de base b', 'brief');
  this.executeRuleTest(mml, 'a deux points sub m sup n position de base b', 'sbrief');
  mml = '<mi>a</mi><msubsup><mo>:</mo><mi>m</mi><mn>\'</mn>' +
      '</msubsup><mi>b</mi>';
  this.executeRuleTest(mml, 'a deux points prime indice m position de base b',
      'default');
  this.executeRuleTest(mml, 'a deux points prime sub m position de base b', 'brief');
  this.executeRuleTest(mml, 'a deux points prime sub m position de base b', 'sbrief');
};


/**
 * Testing punctuation embellished also from the left.
 */
sre.MathspeakEmbellishGermanTest.prototype.testEmbellPunctTensor = function() {
  var mml = '<mi>a</mi><mmultiscripts><mo>:</mo><mi>m</mi><mn>2</mn>' +
      '</mmultiscripts><mi>b</mi>';
  this.executeRuleTest(mml, 'a deux points indice m exposant 2 position de base b', 'default');
  this.executeRuleTest(mml, 'a deux points sub m sup 2 position de base b', 'brief');
  this.executeRuleTest(mml, 'a deux points sub m sup 2 position de base b', 'sbrief');
  mml = '<mi>a</mi><mmultiscripts><mo>:</mo><mi>m</mi><mn>2</mn>' +
      '<mprescripts/><none/><mn>3</mn></mmultiscripts><mi>b</mi>';
  this.executeRuleTest(mml, 'a exposant gauche 3 position de base deux points indice m exposant 2 position de base b', 'default');
  this.executeRuleTest(mml, 'a sup gauche 3 position de base deux points sub m sup 2 position de base b', 'brief');
  this.executeRuleTest(mml, 'a sup gauche 3 position de base deux points sub m sup 2 position de base b', 'sbrief');
  mml = '<mi>a</mi><mmultiscripts><mo>:</mo><mi>m</mi><mn>2</mn>' +
      '<mprescripts/><mn>3</mn></mmultiscripts><mi>b</mi>';
  this.executeRuleTest(mml, 'a indice gauche 3 position de base deux points indice m exposant 2 position de base b', 'default');
  this.executeRuleTest(mml, 'a sub gauche 3 position de base deux points sub m sup 2 position de base b', 'brief');
  this.executeRuleTest(mml, 'a sub gauche 3 position de base deux points sub m sup 2 position de base b', 'sbrief');
  mml = '<mi>a</mi><mmultiscripts><mo>:</mo><mi>m</mi><mn>2</mn>' +
      '<mprescripts/><mn>3</mn><mi>n</mi></mmultiscripts><mi>b</mi>';
  this.executeRuleTest(mml, 'a indice gauche 3 exposant gauche n position de base deux points indice m exposant 2 position de base b',
                       'default');
  this.executeRuleTest(mml, 'a sub gauche 3 sup gauche n position de base deux points sub m sup 2 position de base b', 'brief');
  this.executeRuleTest(mml, 'a sub gauche 3 sup gauche n position de base deux points sub m sup 2 position de base b', 'sbrief');
};


/**
 * Testing multiple embellished punctuations.
 */
sre.MathspeakEmbellishGermanTest.prototype.testEmbellMultPunctSubscript =
    function() {
  var mml = '<mi>a</mi><msub><mo>:</mo><mn>2</mn></msub><mi>b</mi>' +
          '<mo>:</mo><mi>c</mi>';
  this.executeRuleTest(mml, 'a deux points indice 2 position de base b deux points c', 'default');
  this.executeRuleTest(mml, 'a deux points sub 2 position de base b deux points c', 'brief');
  this.executeRuleTest(mml, 'a deux points sub 2 position de base b deux points c', 'sbrief');
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

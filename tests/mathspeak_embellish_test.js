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

goog.provide('sre.MathspeakEmbellishTest');

goog.require('sre.AbstractRuleTest');



/**
 * @constructor
 * @extends {sre.AbstractRuleTest}
 */
sre.MathspeakEmbellishTest = function() {
  goog.base(this);

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
};
goog.inherits(sre.MathspeakEmbellishTest, sre.AbstractRuleTest);


// mml = '<mi>a</mi><msubsup><mo>+</mo><mn>m</mn><mn>\'</mn>' +
//   '</msubsup><mi>b</mi><msubsup><mo>+</mo><mn>m</mn><mn>\'</mn>' +
//   '</msubsup><mi>c</mi>';
// this.executeRuleTest(mml, 'a plus prime Subscript m Baseline b', 'default');
// this.executeRuleTest(mml, 'a plus prime Sub m Base b', 'brief');
// this.executeRuleTest(mml, 'a plus prime Sub m Base b', 'sbrief');


/**
 * Testing operator embellished also from the left.
 */
sre.MathspeakEmbellishTest.prototype.testEmbellOpTensor = function() {
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
 * Testing operator embellished with sub and superscript. Making sure cases of
 * squared and cube are not used.
 */
sre.MathspeakEmbellishTest.prototype.testEmbellOpSubSuper = function() {
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
 * Testing operator embellished with superscript. Making sure cases of squared
 * and cube are not used.
 */
sre.MathspeakEmbellishTest.prototype.testEmbellOpSuperscript = function() {
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
 * Testing operator embellished with subscript.
 */
sre.MathspeakEmbellishTest.prototype.testEmbellOpSubscript = function() {
  var mml = '<mi>a</mi><msub><mo>+</mo><mn>2</mn></msub><mi>b</mi>';
  this.executeRuleTest(mml, 'a plus Subscript 2 Baseline b', 'default');
  this.executeRuleTest(mml, 'a plus Sub 2 Base b', 'brief');
  this.executeRuleTest(mml, 'a plus Sub 2 Base b', 'sbrief');
};

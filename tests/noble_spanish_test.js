// Copyright 2016 Volker Sorge
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
 * @fileoverview Testcases for mathspeak speech rules from Steve Nobles test
 *     set.
 * @author Volker.Sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.NobleSpanishTest');

goog.require('sre.AbstractRuleTest');



/**
 * @constructor
 * @extends {sre.AbstractRuleTest}
 */
sre.NobleSpanishTest = function() {
  sre.NobleSpanishTest.base(this, 'constructor');

  /**
   * @override
   */
  this.information = 'Steve Noble\'s samples Spanish tests.';

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
  this.locale = 'es';

  /**
   * @override
   */
  this.rules = ['MathspeakRules', 'MathspeakSpanish'];

  this.setActive('NobleSamplesSpanish');
  this.actual = true;
};
goog.inherits(sre.NobleSpanishTest, sre.AbstractRuleTest);


/**
 * Testing Sample 1
 */
sre.NobleSpanishTest.prototype.testSample_1 = function() {
  var mml = '<mrow>' +
      '<mo>&#x2212;</mo><mn>5</mn><mfrac>' +
      '<mn>1</mn>' +
      '<mn>5</mn>' +
      '</mfrac>' +
      '<mo>&#x2212;</mo><mn>6</mn><mfrac>' +
      '<mn>2</mn>' +
      '<mn>3</mn>' +
      '</mfrac>' +
      '<mo>=</mo>' +
      '</mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 2
 */
sre.NobleSpanishTest.prototype.testSample_2 = function() {
  var mml = '<mrow>' +
      '<mo>&#x2212;</mo><mn>7</mn><mfrac>' +
      '<mn>3</mn>' +
      '<mn>4</mn>' +
      '</mfrac>' +
      '<mo>&#x2212;</mo><mrow><mo>(</mo>' +
      '<mrow>' +
      '<mo>&#x2212;</mo><mn>4</mn><mfrac>' +
      '<mn>7</mn>' +
      '<mn>8</mn>' +
      '</mfrac>' +
      '</mrow>' +
      '<mo>)</mo></mrow><mo>=</mo>' +
      '</mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 3
 */
sre.NobleSpanishTest.prototype.testSample_3 = function() {
  var mml = '<mrow>' +
      '<mo>&#x2212;</mo><mn>24.15</mn><mo>&#x2212;</mo><mrow><mo>(</mo>' +
      '<mrow>' +
      '<mn>13.7</mn>' +
      '</mrow>' +
      '<mo>)</mo></mrow><mo>=</mo>' +
      '</mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 4
 */
sre.NobleSpanishTest.prototype.testSample_4 = function() {
  var mml = '<mrow>' +
      '<mrow><mo>(</mo>' +
      '<mrow>' +
      '<mo>&#x2212;</mo><mn>4</mn>' +
      '</mrow>' +
      '<mo>)</mo></mrow><mo>&#x00D7;</mo><mn>3</mn><mo>=</mo><mo>&#x2212;' +
      '</mo><mn>12</mn>' +
      '</mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 5
 */
sre.NobleSpanishTest.prototype.testSample_5 = function() {
  var mml = '<mrow>' +
      '<mo>&#x2212;</mo><mn>12</mn><mo>&#x00F7;</mo><mn>3</mn><mo>=</mo>' +
      '<mo>&#x2212;</mo><mn>4</mn>' +
      '</mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 6
 */
sre.NobleSpanishTest.prototype.testSample_6 = function() {
  var mml = '<mrow>' +
      '<mo>&#x2212;</mo><mn>12</mn><mo>&#x00F7;</mo><mrow><mo>(</mo>' +
      '<mrow>' +
      '<mo>&#x2212;</mo><mn>4</mn>' +
      '</mrow>' +
      '<mo>)</mo></mrow><mo>=</mo><mn>3</mn>' +
      '</mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 7
 */
sre.NobleSpanishTest.prototype.testSample_7 = function() {
  var mml = '<mrow>' +
      '<mn>6</mn><mo>&#x00D7;</mo><mn>5</mn>' +
      '</mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 8
 */
sre.NobleSpanishTest.prototype.testSample_8 = function() {
  var mml = '<mrow>' +
      '<mn>6</mn><mo>&#x00D7;</mo><mrow><mo>(</mo>' +
      '<mrow>' +
      '<mo>&#x2212;</mo><mn>5</mn>' +
      '</mrow>' +
      '<mo>)</mo></mrow>' +
      '</mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 9
 */
sre.NobleSpanishTest.prototype.testSample_9 = function() {
  var mml = '<mrow>' +
      '<mo>&#x2212;</mo><mn>6</mn><mo>&#x00D7;</mo><mn>5</mn>' +
      '</mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 10
 */
sre.NobleSpanishTest.prototype.testSample_10 = function() {
  var mml = '<mrow>' +
      '<mo>&#x2212;</mo><mn>6</mn><mo>&#x00D7;</mo><mrow><mo>(</mo>' +
      '<mrow>' +
      '<mo>&#x2212;</mo><mn>5</mn>' +
      '</mrow>' +
      '<mo>)</mo></mrow>' +
      '</mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 11
 */
sre.NobleSpanishTest.prototype.testSample_11 = function() {
  var mml = '<mrow>' +
      '<mo>&#x2212;</mo><mn>8</mn><mo>&#x00D7;</mo><mn>7</mn>' +
      '</mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 12
 */
sre.NobleSpanishTest.prototype.testSample_12 = function() {
  var mml = '<mrow>' +
      '<mo>&#x2212;</mo><mn>8</mn><mo>&#x00D7;</mo><mrow><mo>(</mo>' +
      '<mrow>' +
      '<mo>&#x2212;</mo><mn>7</mn>' +
      '</mrow>' +
      '<mo>)</mo></mrow>' +
      '</mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 13
 */
sre.NobleSpanishTest.prototype.testSample_13 = function() {
  var mml = '<mrow>' +
      '<mn>8</mn><mo>&#x00D7;</mo><mrow><mo>(</mo>' +
      '<mrow>' +
      '<mo>&#x2212;</mo><mn>7</mn>' +
      '</mrow>' +
      '<mo>)</mo></mrow>' +
      '</mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 14
 */
sre.NobleSpanishTest.prototype.testSample_14 = function() {
  var mml = '<mrow><mn>8</mn><mo>&#x00D7;</mo><mn>7</mn>' +
      '</mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 15
 */
sre.NobleSpanishTest.prototype.testSample_15 = function() {
  var mml = '<mrow>' +
      '<mi>m</mi><mo>&#x2220;</mo><mn>1</mn><mo>=</mo><mi>30°</mi>' +
      '</mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 16
 */
sre.NobleSpanishTest.prototype.testSample_16 = function() {
  var mml = '<mrow>' +
      '<mi>m</mi><mo>&#x2220;</mo><mn>2</mn><mo>=</mo>' +
      '<mi>60°</mi>  </mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 17
 */
sre.NobleSpanishTest.prototype.testSample_17 = function() {
  var mml = '<mrow>' +
      '<mi>m</mi><mo>&#x2220;</mo><mn>1</mn><mo>+</mo><mi>m</mi>' +
      '<mo>&#x2220;</mo><mn>2</mn><mo>=</mo>' +
      '<mi>90°</mi>  </mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 18
 */
sre.NobleSpanishTest.prototype.testSample_18 = function() {
  var mml = '<mrow>' +
      '<mi>m</mi><mo>&#x2220;</mo><mi>M</mi><mo>+</mo><mi>m</mi>' +
      '<mo>&#x2220;</mo><mi>N</mi><mo>=</mo>' +
      '<mi>180°</mi>  </mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 19
 */
sre.NobleSpanishTest.prototype.testSample_19 = function() {
  var mml = '<mrow>' +
      '<mi>A</mi><mo>=</mo><mfrac>' +
      '<mn>1</mn>' +
      '<mn>2</mn>' +
      '</mfrac>' +
      '<mi>b</mi><mi>h</mi>' +
      '</mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 20
 */
sre.NobleSpanishTest.prototype.testSample_20 = function() {
  var mml = '<mrow>' +
      '<mfrac>' +
      '<mrow>' +
      '<mtext>area&#x00A0;of&#x00A0;triangle</mtext>' +
      '</mrow>' +
      '<mrow>' +
      '<mtext>area&#x00A0;of&#x00A0;square</mtext>' +
      '</mrow>' +
      '</mfrac>' +
      '<mo>=</mo><mfrac>' +
      '<mrow>' +
      '<msup>' +
      '<mrow>' +
      '<mtext>1&#x00A0;unit</mtext>' +
      '</mrow>' +
      '<mn>2</mn>' +
      '</msup>' +
      '</mrow>' +
      '<mrow>' +
      '<msup>' +
      '<mrow>' +
      '<mtext>16&#x00A0;units</mtext>' +
      '</mrow>' +
      '<mn>2</mn>' +
      '</msup>' +
      '</mrow>' +
      '</mfrac>' +
      '</mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 21
 */
sre.NobleSpanishTest.prototype.testSample_21 = function() {
  var mml = '<mrow>' +
      '<msup>' +
      '<mrow>' +
      '<mn>0.6</mn>' +
      '</mrow>' +
      '<mn>2</mn>' +
      '</msup>' +
      '</mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 22
 */
sre.NobleSpanishTest.prototype.testSample_22 = function() {
  var mml = '<mrow>' +
      '<msup>' +
      '<mrow>' +
      '<mn>1.5</mn>' +
      '</mrow>' +
      '<mn>2</mn>' +
      '</msup>    ' +
      '</mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 23
 */
sre.NobleSpanishTest.prototype.testSample_23 = function() {
  var mml = '<mrow>' +
      '<mn>4</mn><mrow><mo>(</mo>' +
      '<mrow>' +
      '<mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>x</mi>' +
      '</mrow>' +
      '<mo>)</mo></mrow>' +
      '</mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 24
 */
sre.NobleSpanishTest.prototype.testSample_24 = function() {
  var mml = '<mrow>' +
      '<mn>36</mn><mo>+</mo><mn>4</mn><mi>y</mi><mo>&#x2212;</mo><mn>1</mn>' +
      '<msup>' +
      '<mi>y</mi>' +
      '<mn>2</mn>' +
      '</msup>' +
      '<mo>+</mo><mn>5</mn><msup>' +
      '<mi>y</mi>' +
      '<mn>2</mn>' +
      '</msup>' +
      '<mo>&#x2212;</mo><mn>2</mn>' +
      '</mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 25
 */
sre.NobleSpanishTest.prototype.testSample_25 = function() {
  var mml = '<mrow>' +
      '<mrow><mo>(</mo>' +
      '<mrow>' +
      '<mn>5</mn><mo>+</mo><mn>9</mn>' +
      '</mrow>' +
      '<mo>)</mo></mrow><mo>&#x2212;</mo><mn>4</mn><mo>+</mo><mn>3</mn>' +
      '<mo>=</mo>' +
      '</mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 26
 */
sre.NobleSpanishTest.prototype.testSample_26 = function() {
  var mml = '<mrow>' +
      '<mover accent="true">' +
      '<mrow>' +
      '<mi>B</mi><mi>C</mi>' +
      '</mrow>' +
      '<mo stretchy="true">&#x2194;</mo>' +
      '</mover>' +
      '</mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 27
 */
sre.NobleSpanishTest.prototype.testSample_27 = function() {
  var mml = '<mrow>' +
      '<mover accent="true">' +
      '<mrow>' +
      '<mi>P</mi><mi>Q</mi>' +
      '</mrow>' +
      '<mo stretchy="true">&#x2192;</mo>' +
      '</mover>' +
      '</mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 28
 */
sre.NobleSpanishTest.prototype.testSample_28 = function() {
  var mml = '<mrow>' +
      '<mover accent="true">' +
      '<mrow>' +
      '<mi>G</mi><mi>H</mi>' +
      '</mrow>' +
      '<mo stretchy="true">&#x00AF;</mo>' +
      '</mover>' +
      '</mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 29
 */
sre.NobleSpanishTest.prototype.testSample_29 = function() {
  var mml = '<mrow>' +
      '<mover accent="true">' +
      '<mrow>' +
      '<mi>W</mi><mi>X</mi>' +
      '</mrow>' +
      '<mo stretchy="true">&#x00AF;</mo>' +
      '</mover>' +
      '<mo>&#x2245;</mo><mover accent="true">' +
      '<mrow>' +
      '<mi>Y</mi><mi>Z</mi>' +
      '</mrow>' +
      '<mo stretchy="true">&#x00AF;</mo>' +
      '</mover>' +
      '</mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 30
 */
sre.NobleSpanishTest.prototype.testSample_30 = function() {
  var mml = '<mrow>' +
      '<mo>&#x2220;</mo><mi>B</mi><mi>E</mi><mi>F</mi>' +
      '</mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 31
 */
sre.NobleSpanishTest.prototype.testSample_31 = function() {
  var mml = '<mrow>' +
      '<mo>&#x2220;</mo><mi>B</mi><mi>E</mi><mi>D</mi>' +
      '</mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 32
 */
sre.NobleSpanishTest.prototype.testSample_32 = function() {
  var mml = '<mrow>' +
      '<mo>&#x2220;</mo><mi>D</mi><mi>E</mi><mi>F</mi>' +
      '</mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 33
 */
sre.NobleSpanishTest.prototype.testSample_33 = function() {
  var mml = '<mrow>' +
      '<mi>x</mi>' +
      '<mo>=</mo>' +
      '<mfrac>' +
      '<mrow>' +
      '<mo>−</mo>' +
      '<mi>b</mi>' +
      '<mo>±</mo>' +
      '<msqrt>' +
      '<mrow>' +
      '<msup>' +
      '<mrow>' +
      '<mi>b</mi>' +
      '</mrow>' +
      '<mrow>' +
      '<mn>2</mn>' +
      '</mrow>' +
      '</msup>' +
      '<mo>−</mo>' +
      '<mn>4</mn>' +
      '<mi>a</mi>' +
      '<mi>c</mi>' +
      '</mrow>' +
      '</msqrt>' +
      '</mrow>' +
      '<mrow>' +
      '<mn>2</mn>' +
      '<mi>a</mi>' +
      '</mrow>' +
      '</mfrac>' +
      '</mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 34
 */
sre.NobleSpanishTest.prototype.testSample_34 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><msup><mrow><mi>x</mi></mrow><mrow>' +
      '<mn>2</mn></mrow></msup><mo>+</mo><mn>8</mn><mi>x</mi><mo>+</mo>' +
      '<mn>16</mn></mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 35
 */
sre.NobleSpanishTest.prototype.testSample_35 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><mfrac><mrow><mn>1</mn></mrow><mrow>' +
      '<mn>3</mn></mrow></mfrac><mrow><mo>(</mo><msup><mrow><mn>3</mn>' +
      '</mrow><mrow><mi>x</mi></mrow></msup><mo>)</mo></mrow></mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 36
 */
sre.NobleSpanishTest.prototype.testSample_36 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><mn>10</mn><mo>−</mo><mn>2</mn><mi>x' +
      '</mi></mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 37
 */
sre.NobleSpanishTest.prototype.testSample_37 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><mn>2</mn><msup><mrow><mi>x</mi>' +
      '</mrow><mrow><mn>3</mn></mrow></msup><mo>+</mo><mn>5</mn></mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 38
 */
sre.NobleSpanishTest.prototype.testSample_38 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><mo>(</mo><msup><mrow><mo/><mi>x' +
      '</mi></mrow><mrow><mn>2</mn></mrow></msup><mo>+</mo><mn>1</mn>' +
      '<mrow><mo>)</mo><mo>(</mo><msup><mrow><mi>x</mi></mrow><mrow><mn>2' +
      '</mn></mrow></msup></mrow><mo>+</mo><mn>3</mn><mo>)</mo></mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 39
 */
sre.NobleSpanishTest.prototype.testSample_39 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><msup><mrow><mn>0.5</mn></mrow>' +
      '<mrow><mi>x</mi></mrow></msup></mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 40
 */
sre.NobleSpanishTest.prototype.testSample_40 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><mn>22</mn><mo>−</mo><mn>2</mn><mi>x' +
      '</mi></mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 41
 */
sre.NobleSpanishTest.prototype.testSample_41 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><mfrac><mrow><mn>3</mn></mrow><mrow>' +
      '<mi>x</mi></mrow></mfrac></mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 42
 */
sre.NobleSpanishTest.prototype.testSample_42 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><mo>(</mo><mi>x</mi><mo>+</mo><mn>4' +
      '</mn><mo>)</mo><mo>(</mo><mi>x</mi><mo>+</mo><mn>4</mn><mo>)</mo>' +
      '</mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 43
 */
sre.NobleSpanishTest.prototype.testSample_43 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><mo>(</mo><mn>4</mn><mi>x</mi><mo>−' +
      '</mo><mn>3</mn><mo>)</mo><mo>(</mo><mi>x</mi><mo>+</mo><mn>1</mn>' +
      '<mo>)</mo></mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 44
 */
sre.NobleSpanishTest.prototype.testSample_44 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><mn>20</mn><mi>x</mi><mo>−</mo><mn>4' +
      '</mn><msup><mrow><mi>x</mi></mrow><mrow><mn>2</mn></mrow></msup>' +
      '</mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 45
 */
sre.NobleSpanishTest.prototype.testSample_45 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><msup><mrow><mi>x</mi></mrow><mrow>' +
      '<mn>2</mn></mrow></msup></mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 46
 */
sre.NobleSpanishTest.prototype.testSample_46 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><msup><mrow><mn>3</mn></mrow><mrow>' +
      '<mi>x</mi><mo>−</mo><mn>1</mn></mrow></msup></mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 47
 */
sre.NobleSpanishTest.prototype.testSample_47 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><mn>16</mn><mo>−</mo><mn>2</mn><mo>(' +
      '</mo><mi>x</mi><mo>+</mo><mn>3</mn><mo>)</mo></mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 48
 */
sre.NobleSpanishTest.prototype.testSample_48 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><mn>4</mn><msup><mrow><mi>x</mi>' +
      '</mrow><mrow><mn>2</mn></mrow></msup><mo>−</mo><mi>x</mi><mo>−' +
      '</mo><mn>3</mn></mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 49
 */
sre.NobleSpanishTest.prototype.testSample_49 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><mi>x</mi><mo>+</mo><mfrac><mrow>' +
      '<mn>1</mn></mrow><mrow><mi>x</mi></mrow></mfrac></mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 50
 */
sre.NobleSpanishTest.prototype.testSample_50 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><mn>4</mn><mi>x</mi><mo>(</mo><mn>5' +
      '</mn><mo>−</mo><mi>x</mi><mo>)</mo></mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 51
 */
sre.NobleSpanishTest.prototype.testSample_51 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><mn>2</mn><mo>(</mo><mi>x</mi><mo>−' +
      '</mo><mn>3</mn><mo>)</mo><mo>+</mo><mn>6</mn><mo>(</mo><mn>1</mn>' +
      '<mo>−</mo><mi>x</mi><mo>)</mo></mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 52
 */
sre.NobleSpanishTest.prototype.testSample_52 = function() {
  var mml = '<mrow>' +
      '<mn>0.25</mn><mo>&#x003E;</mo><mfrac>' +
      '<mn>5</mn>' +
      '<mrow>' +
      '<mn>16</mn>' +
      '</mrow>' +
      '</mfrac>    ' +
      '</mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 53
 */
sre.NobleSpanishTest.prototype.testSample_53 = function() {
  var mml = '<mrow>' +
      '<mn>32</mn><mo>&#x22C5;</mo><mrow><mo>(</mo>' +
      '<mrow>' +
      '<mn>5</mn><mo>&#x22C5;</mo><mn>7</mn>' +
      '</mrow>' +
      '<mo>)</mo></mrow>' +
      '</mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 54
 */
sre.NobleSpanishTest.prototype.testSample_54 = function() {
  var mml = '<mrow><mrow><mo>(</mo><mfrac><mrow><mn>1</mn></mrow><mrow>' +
      '<mn>2</mn></mrow></mfrac><mo>×</mo><mfrac><mrow><mn>1</mn></mrow>' +
      '<mrow><mn>2</mn></mrow></mfrac><mo>×</mo><mi>π</mi><mo>×</mo><mn>2' +
      '</mn><mo>)</mo></mrow><mo>+</mo><mrow><mo>(</mo><mn>2</mn><mo>×' +
      '</mo><mfrac><mrow><mn>1</mn></mrow><mrow><mn>2</mn></mrow></mfrac>' +
      '<mo>×</mo><mi>π</mi><mo>×</mo><mn>5</mn><mo>)</mo></mrow></mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 55
 */
sre.NobleSpanishTest.prototype.testSample_55 = function() {
  var mml = '<mrow><munder><mtext>liminf</mtext><mrow><mi>n</mi>' +
      '<mo>&#x2192;</mo><mi>&#x221E;</mi></mrow></munder><msub><mi>E</mi>' +
      '<mrow><mi>n</mi></mrow></msub><mo>=</mo><munder><mo>&#x22C3;</mo>' +
      '<mrow><mi>n</mi><mo>&#x2265;</mo><mn>1</mn></mrow></munder>' +
      '<munder><mo>&#x22C2;</mo><mrow><mi>k</mi><mo>&#x2265;</mo><mi>n' +
      '</mi></mrow></munder><msub><mi>E</mi><mrow><mi>k</mi></mrow>' +
      '</msub><mo>,</mo><mspace width="0.2em" /><munder><mtext>limsup' +
      '</mtext><mrow><mi>n</mi><mo>&#x2192;</mo><mi>&#x221E;</mi></mrow>' +
      '</munder><msub><mi>E</mi><mrow><mi>n</mi></mrow></msub><mo>=</mo>' +
      '<munder><mo>&#x22C2;</mo><mrow><mi>n</mi><mo>&#x2265;</mo><mn>1' +
      '</mn></mrow></munder><munder><mo>&#x22C3;</mo><mrow><mi>k</mi>' +
      '<mo>&#x2265;</mo><mi>n</mi></mrow></munder><msub><mi>E</mi><mrow>' +
      '<mi>k</mi></mrow></msub><mo>.</mo></mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 56
 */
sre.NobleSpanishTest.prototype.testSample_56 = function() {
  var mml = '<mrow><mtable columnalign="left"><mtr><mtd columnalign="left">' +
      '<mrow><mtext>(i)</mtext></mrow></mtd><mtd columnalign="left">' +
      '<mrow><mspace width="0.2em" /><mi>&#x1D4AE;</mi><mo>&#x2208;</mo>' +
      '<mi>&#x1D49C;</mi><mo>;</mo></mrow></mtd></mtr><mtr><mtd' +
      ' columnalign="right" columnspan="1"><mrow><mtext>(ii)</mtext>' +
      '</mrow></mtd><mtd columnalign="left"><mrow><mspace width="0.2em"' +
      ' /><mtext>if</mtext><mi>E</mi><mo>&#x2208;</mo><mi>&#x1D49C;</mi>' +
      '<mspace width="0.2em" /><mtext>then</mtext><mspace width="0.2em"' +
      ' /><mover><mrow><mi>E</mi></mrow><mrow><mrow /><mo>&#x203E;</mo>' +
      '</mrow></mover><mo>&#x2208;</mo><mi>&#x1D49C;</mi><mo>;</mo>' +
      '</mrow></mtd></mtr><mtr><mtd columnalign="right" columnspan="1">' +
      '<mrow><mtext>(iii)</mtext></mrow></mtd><mtd columnalign="left">' +
      '<mrow><mspace width="0.2em" /><mtext>if</mtext><msub><mi>E</mi>' +
      '<mrow><mn>1</mn></mrow></msub><mo>,</mo><msub><mi>E</mi><mrow>' +
      '<mn>2</mn></mrow></msub><mo>&#x2208;</mo><mi>&#x1D49C;</mi><mspace' +
      ' width="0.2em" /><mtext>then</mtext><mspace width="0.2em" /><msub>' +
      '<mi>E</mi><mrow><mn>1</mn></mrow></msub><mo>&#x222A;</mo><msub>' +
      '<mi>E</mi><mrow><mn>2</mn></mrow></msub><mo>&#x2208;</mo>' +
      '<mi>&#x1D49C;</mi><mo>.</mo></mrow></mtd></mtr></mtable></mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 57
 */
sre.NobleSpanishTest.prototype.testSample_57 = function() {
  var mml = '<mrow><mtable columnalign="left"><mtr><mtd columnalign="left">' +
      '<mrow /></mtd><mtd columnalign="left"><mrow /></mtd><mtd' +
      ' columnalign="left"><mrow><mo stretchy="false">(</mo><mi' +
      ' mathvariant="normal">A</mi><mo mathvariant="normal">.</mo><mn>1' +
      '</mn><mo stretchy="false">)</mo><mspace width="0.2em" /><mi' +
      ' mathvariant="normal">If</mi><mspace width="0.2em" /><mi>A</mi>' +
      '<mo>&#x2208;</mo><mrow><mi>&#x2131;</mi></mrow><mspace' +
      ' width="0.2em" /><mi mathvariant="normal">then</mi><mspace' +
      ' width="0.2em" /><mn>0</mn><mo>&#x2264;</mo><mi>P</mi><mo' +
      ' stretchy="false">{</mo><mi>A</mi><mo stretchy="false">}</mo>' +
      '<mo>&#x2264;</mo><mn>1</mn><mo>.</mo></mrow></mtd><mtd' +
      ' columnalign="left"><mo stretchy="false">(</mo><mn>1</mn><mo' +
      ' stretchy="false">)</mo></mtd></mtr><mtr><mtd columnalign="right"' +
      ' columnspan="1"><mrow /></mtd><mtd columnalign="left"><mrow />' +
      '</mtd><mtd columnalign="left"><mrow><mo stretchy="false">(</mo><mi' +
      ' mathvariant="normal">A</mi><mo mathvariant="normal">.</mo><mn>2' +
      '</mn><mo stretchy="false">)</mo><mspace width="0.2em" /><mi>P</mi>' +
      '<mo stretchy="false">{</mo><mrow><mi>&#x1D4AE;</mi></mrow><mo' +
      ' stretchy="false">}</mo><mo>=</mo><mn>1</mn><mo>.</mo></mrow>' +
      '</mtd><mtd columnalign="left"><mo stretchy="false">(</mo><mn>2' +
      '</mn><mo stretchy="false">)</mo></mtd></mtr><mtr><mtd' +
      ' columnalign="right" columnspan="1"><mrow /></mtd><mtd' +
      ' columnalign="left"><mrow /></mtd><mtd columnalign="left"><mrow>' +
      '<mo stretchy="false">(</mo><mi mathvariant="normal">A</mi><mo' +
      ' mathvariant="normal">.</mo><mn>3</mn><mo stretchy="false">)</mo>' +
      '<mspace width="0.2em" /><mi mathvariant="normal">If</mi><mspace' +
      ' width="0.2em" /><mo stretchy="false">{</mo><msub><mi>E</mi><mrow>' +
      '<mi>n</mi></mrow></msub><mo>,</mo><mi>n</mi><mo>&#x2265;</mo><mn>1' +
      '</mn><mo stretchy="false">}</mo><mo>&#x2208;</mo><mrow>' +
      '<mi>&#x2131;</mi></mrow><mspace width="0.2em" /><mtext>is a' +
      ' sequence of</mtext><mspace width="0.2em" /><mtext>disjoint' +
      '</mtext></mrow></mtd><mtd columnalign="left"><mo' +
      ' stretchy="false">(</mo><mn>3</mn><mo stretchy="false">)</mo>' +
      '</mtd></mtr></mtable></mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 58
 */
sre.NobleSpanishTest.prototype.testSample_58 = function() {
  var mml = '<mrow><mi>P</mi><mo stretchy="false">{</mo><msub><mi>B</mi>' +
      '<mrow><mi>j</mi></mrow></msub><mi>|</mi><mi>A</mi><mo' +
      ' stretchy="false">}</mo><mo>=</mo><mfrac><mrow><mi>P</mi><mo' +
      ' stretchy="false">{</mo><msub><mi>B</mi><mrow><mi>j</mi></mrow>' +
      '</msub><mo stretchy="false">}</mo><mi>P</mi><mo stretchy="false">{' +
      '</mo><mi>A</mi><mi>|</mi><msub><mi>B</mi><mrow><mi>j</mi></mrow>' +
      '</msub><mo stretchy="false">}</mo></mrow><mrow><munder>' +
      '<mo>&#x2211;</mo><mrow><mi>j</mi><mo>&#x2032;</mo><mo>&#x2208;' +
      '</mo><mi>J</mi></mrow></munder><mi>P</mi><mo stretchy="false">{' +
      '</mo><msub><mi>B</mi><mrow><mi>j</mi><mo>&#x2032;</mo></mrow>' +
      '</msub><mo stretchy="false">}</mo><mi>P</mi><mo stretchy="false">{' +
      '</mo><mi>A</mi><mi>|</mi><msub><mi>B</mi><mrow><mi>j</mi>' +
      '<mo>&#x2032;</mo></mrow></msub><mo stretchy="false">}</mo></mrow>' +
      '</mfrac><mo>.</mo></mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 59
 */
sre.NobleSpanishTest.prototype.testSample_59 = function() {
  var mml = '<mrow><msub><mi>&#x03BC;</mi><mrow><mn>1</mn></mrow></msub><mo' +
      ' stretchy="false">(</mo><mi>B</mi><mo stretchy="false">)</mo><mo>=' +
      '</mo><msub><mo>&#x222B;</mo><mrow><mi>B</mi></mrow></msub><mi>f' +
      '</mi><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)' +
      '</mo><mi>d</mi><msub><mi>&#x03BC;</mi><mrow><mn>2</mn></mrow>' +
      '</msub><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)' +
      '</mo></mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 60
 */
sre.NobleSpanishTest.prototype.testSample_60 = function() {
  var mml = '<mrow><munder><mtext>lim</mtext><mrow><mi>n</mi><mo>&#x2192;' +
      '</mo><mi>&#x221E;</mi></mrow></munder><mi>E</mi><mo' +
      ' stretchy="false">{</mo><mo>&#x007C;</mo><msub><mi>X</mi><mrow>' +
      '<mi>n</mi></mrow></msub><mo>&#x2212;</mo><mi>X</mi><mo>&#x007C;' +
      '</mo><mo stretchy="false">}</mo><mo>=</mo><mi>E</mi><mrow><mo>{' +
      '</mo><munder><mtext>lim</mtext><mrow><mi>n</mi><mo>&#x2192;</mo>' +
      '<mi>&#x221E;</mi></mrow></munder><mo>&#x007C;</mo><msub><mi>X</mi>' +
      '<mrow><mi>n</mi></mrow></msub><mo>&#x2212;</mo><mi>X</mi>' +
      '<mo>&#x007C;</mo><mo>}</mo></mrow><mo>=</mo><mn>0</mn><mo>.</mo>' +
      '</mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 61
 */
sre.NobleSpanishTest.prototype.testSample_61 = function() {
  var mml = '<mrow><mtable columnalign="left"><mtr><mtd' +
      ' columnalign="left"><mrow><msub><mi>P</mi><mrow><mi>&#x03BC;' +
      '</mi><mo>,</mo>' +
      '<mi>&#x03C3;</mi></mrow></msub><mo stretchy="false">{</mo><mi>Y' +
      '</mi><mo>&#x2265;</mo><msub><mi>l</mi><mrow><mi>&#x03B2;</mi>' +
      '</mrow></msub><mo stretchy="false">(</mo><msub><mover><mrow><mi>Y' +
      '</mi></mrow><mrow><mrow /><mo>&#x203E;</mo></mrow></mover><mrow>' +
      '<mi>n</mi></mrow></msub><mo>,</mo><msub><mi>S</mi><mrow><mi>n</mi>' +
      '</mrow></msub><mo stretchy="false">)</mo><mo stretchy="false">}' +
      '</mo><mo>=</mo><msub><mi>P</mi><mrow><mi>&#x03BC;</mi><mo>,</mo>' +
      '<mi>&#x03C3;</mi></mrow></msub><mo stretchy="false">{</mo><mo' +
      ' stretchy="false">(</mo><mi>Y</mi><mo>&#x2212;</mo><msub><mover>' +
      '<mrow><mi>Y</mi></mrow><mrow><mrow /><mo>&#x203E;</mo></mrow>' +
      '</mover><mrow><mi>n</mi></mrow></msub><mo stretchy="false">)</mo>' +
      '<mo>/</mo><mrow><mo>(</mo><mi>S</mi><mo>&#x00B7;</mo><msup><mrow>' +
      '<mo>(</mo><mn>1</mn><mo>+</mo><mfrac><mrow><mn>1</mn></mrow><mrow>' +
      '<mi>n</mi></mrow></mfrac><mo>)</mo></mrow><mrow><mn>1</mn><mo>/' +
      '</mo><mn>2</mn></mrow></msup><mo>)</mo></mrow><mo>&#x2265;</mo>' +
      '<mo>&#x2212;</mo><msub><mi>t</mi><mrow><mi>&#x03B2;</mi></mrow>' +
      '</msub><mo stretchy="false">[</mo><mi>n</mi><mo>&#x2212;</mo><mn>1' +
      '</mn><mo stretchy="false">]</mo><mo stretchy="false">}</mo><mo>=' +
      '</mo><mi>&#x03B2;</mi><mo>,</mo></mrow></mtd></mtr><mtr><mtd' +
      ' columnalign="right" columnspan="1"><mrow /></mtd><mtd' +
      ' columnalign="left"><mo stretchy="false">(</mo><mn>1</mn><mo' +
      ' stretchy="false">)</mo></mtd></mtr></mtable></mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 62
 */
sre.NobleSpanishTest.prototype.testSample_62 = function() {
  var mml = '<mrow><mi>L</mi><mo>=</mo><mrow><mo>(</mo><mtable><mtr><mtd' +
      ' columnalign="center"><mrow><mn>1</mn></mrow></mtd><mtd' +
      ' columnalign="center"><mrow><mspace width="0.2em" /><mo>&#x2212;' +
      '</mo><mn>1</mn></mrow></mtd><mtd columnalign="center"><mrow>' +
      '<mspace width="0.2em" /></mrow></mtd><mtd columnalign="center">' +
      '<mrow><mspace width="0.2em" /></mrow></mtd><mtd' +
      ' columnalign="center"><mrow><mspace width="0.2em" /></mrow></mtd>' +
      '<mtd columnalign="center"><mrow><mspace width="0.2em" /></mrow>' +
      '</mtd></mtr><mtr><mtd columnalign="center"><mrow /></mtd><mtd' +
      ' columnalign="center"><mrow><mspace width="0.2em" /><mn>1</mn>' +
      '</mrow></mtd><mtd columnalign="center"><mrow><mspace width="0.2em"' +
      ' /><mo>&#x2212;</mo><mn>1</mn></mrow></mtd><mtd' +
      ' columnalign="center"><mrow><mspace width="0.2em" /></mrow></mtd>' +
      '<mtd columnalign="center"><mrow><mspace width="0.2em" /><mn>0</mn>' +
      '</mrow></mtd><mtd columnalign="center"><mrow><mspace width="0.2em"' +
      ' /></mrow></mtd></mtr><mtr><mtd columnalign="center"><mrow />' +
      '</mtd><mtd columnalign="center"><mrow><mspace width="0.2em" />' +
      '</mrow></mtd><mtd columnalign="center"><mrow><mspace width="0.2em"' +
      ' /></mrow></mtd><mtd columnalign="center"><mrow><mspace' +
      ' width="0.2em" /></mrow></mtd><mtd columnalign="center"><mrow>' +
      '<mspace width="0.2em" /></mrow></mtd><mtd columnalign="center">' +
      '<mrow><mspace width="0.2em" /></mrow></mtd></mtr><mtr><mtd' +
      ' columnalign="center"><mrow /></mtd><mtd columnalign="center">' +
      '<mrow><mspace width="0.2em" /><mn>0</mn></mrow></mtd><mtd' +
      ' columnalign="center"><mrow><mspace width="0.2em" /></mrow></mtd>' +
      '<mtd columnalign="center"><mrow><mspace width="0.2em" /></mrow>' +
      '</mtd><mtd columnalign="center"><mrow><mspace width="0.2em" />' +
      '</mrow></mtd><mtd columnalign="center"><mrow><mspace width="0.2em"' +
      ' /></mrow></mtd></mtr><mtr><mtd columnalign="center"><mrow />' +
      '</mtd><mtd columnalign="center"><mrow><mspace width="0.2em" />' +
      '</mrow></mtd><mtd columnalign="center"><mrow><mspace width="0.2em"' +
      ' /></mrow></mtd><mtd columnalign="center"><mrow><mspace' +
      ' width="0.2em" /></mrow></mtd><mtd columnalign="center"><mrow>' +
      '<mspace width="0.2em" /><mn>1</mn></mrow></mtd><mtd' +
      ' columnalign="center"><mrow><mspace width="0.2em" /><mo>&#x2212;' +
      '</mo><mn>1</mn></mrow></mtd></mtr></mtable><mo>)</mo></mrow><mo>.' +
      '</mo></mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 63
 */
sre.NobleSpanishTest.prototype.testSample_63 = function() {
  var mml = '<mrow><msqrt><mrow><mi>n</mi></mrow></msqrt><mo' +
      ' stretchy="false">[</mo><msub><mover><mrow><mi>Y</mi></mrow><mrow>' +
      '<mrow /><mo>&#x203E;</mo></mrow></mover><mrow><mi>n</mi></mrow>' +
      '</msub><mo>&#x2212;</mo><mo stretchy="false">(</mo><mi>&#x03BC;' +
      '</mi><mo>+</mo><msub><mi>z</mi><mrow><mi>&#x03B2;</mi></mrow>' +
      '</msub><mi>&#x03C3;</mi><mo stretchy="false">)</mo><mo' +
      ' stretchy="false">]</mo><mo>/</mo><msub><mi>S</mi><mrow><mi>n</mi>' +
      '</mrow></msub><mo>~</mo><mfrac><mrow><mi>U</mi><mo>+</mo><msqrt>' +
      '<mrow><mi>n</mi></mrow></msqrt><mspace width="0.2em" /><msub><mi>z' +
      '</mi><mrow><mn>1</mn><mo>&#x2212;</mo><mi>&#x03B2;</mi></mrow>' +
      '</msub></mrow><mrow><mo stretchy="false">(</mo><msup><mi>&#x03C7;' +
      '</mi><mrow><mn>2</mn></mrow></msup><mo stretchy="false">[</mo>' +
      '<mi>n</mi><mo>&#x2212;</mo><mn>1</mn><mo stretchy="false">]</mo>' +
      '<mo>/</mo><mo stretchy="false">(</mo><mi>n</mi><mo>&#x2212;</mo>' +
      '<mn>1</mn><mo stretchy="false">)</mo><mo stretchy="false">)</mo>' +
      '<msup><mi /><mrow><mn>1</mn><mo>/</mo><mn>2</mn></mrow></msup>' +
      '</mrow></mfrac><mo>~</mo><mi>t</mi><mo stretchy="false">[</mo>' +
      '<mi>n</mi><mo>&#x2212;</mo><mn>1</mn><mo>;</mo><msqrt><mrow><mi>n' +
      '</mi></mrow></msqrt><mspace width="0.2em" /><msub><mi>z</mi><mrow>' +
      '<mn>1</mn><mo>&#x2212;</mo><mi>&#x03B2;</mi></mrow></msub><mo' +
      ' stretchy="false">]</mo><mo>,</mo></mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 64
 */
sre.NobleSpanishTest.prototype.testSample_64 = function() {
  var mml = '<mrow><mtable columnalign="left"><mtr><mtd columnalign="left">' +
      '<mrow><mi>&#x03B3;</mi></mrow></mtd><mtd columnalign="left"><mrow>' +
      '<mo>=</mo><mi>P</mi><mo stretchy="false">{</mo><msub><mi>E</mi>' +
      '<mrow><mi>p</mi><mo>,</mo><mi>q</mi></mrow></msub><mo>&#x2282;' +
      '</mo><mo stretchy="false">(</mo><msub><mi>X</mi><mrow><mo' +
      ' stretchy="false">(</mo><mi>r</mi><mo stretchy="false">)</mo>' +
      '</mrow></msub><mo>,</mo><msub><mi>X</mi><mrow><mo' +
      ' stretchy="false">(</mo><mi>s</mi><mo stretchy="false">)</mo>' +
      '</mrow></msub><mo stretchy="false">}</mo></mrow></mtd></mtr><mtr>' +
      '<mtd columnalign="right" columnspan="1"><mrow /></mtd><mtd' +
      ' columnalign="left"><mrow><mo>=</mo><mfrac><mrow><mi>n</mi><mo>!' +
      '</mo></mrow><mrow><mo stretchy="false">(</mo><mi>r</mi>' +
      '<mo>&#x2212;</mo><mn>1</mn><mo stretchy="false">)</mo><mo>!</mo>' +
      '</mrow></mfrac><munderover><mo>&#x2211;</mo><mrow><mi>j</mi><mo>=' +
      '</mo><mn>0</mn> </mrow><mrow><mi>s</mi><mo>&#x2212;</mo><mi>r</mi>' +
      '<mo>&#x2212;</mo><mn>1</mn></mrow></munderover><mo' +
      ' stretchy="false">(</mo><mo>&#x2212;</mo><mn>1</mn><mo' +
      ' stretchy="false">)</mo><msup><mi /><mrow><mi>j</mi></mrow></msup>' +
      '<mfrac><mrow><msup><mi>p</mi><mrow><mi>r</mi><mo>+</mo><mi>j</mi>' +
      '</mrow></msup></mrow><mrow><mo stretchy="false">(</mo><mi>n</mi>' +
      '<mo>&#x2212;</mo><mi>r</mi><mo>&#x2212;</mo><mi>j</mi><mo' +
      ' stretchy="false">)</mo><mo>!</mo><mi>j</mi><mo>!</mo></mrow>' +
      '</mfrac><msub><mi>I</mi><mrow><mn>1</mn><mo>&#x2212;</mo><mi>q' +
      '</mi></mrow></msub><mo stretchy="false">(</mo><mi>n</mi>' +
      '<mo>&#x2212;</mo><mi>s</mi><mo>+</mo><mn>1</mn><mo>,</mo><mi>s' +
      '</mi><mo>&#x2212;</mo><mi>r</mi><mo>&#x2212;</mo><mi>j</mi><mo' +
      ' stretchy="false">)</mo><mo>.</mo></mrow></mtd></mtr></mtable></mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 65
 */
sre.NobleSpanishTest.prototype.testSample_65 = function() {
  var mml = '<mrow><msub><mrow><mi>S</mi></mrow><mrow><mi>i</mi></mrow>' +
      '</msub><mfenced open="[" close="]"><mrow><mtable><mtr><mtd><mi>t' +
      '</mi></mtd></mtr><mtr><mtd><mi>x</mi></mtd></mtr></mtable></mrow>' +
      '</mfenced><mo>=</mo><mfenced open="[" close="]"><mrow><mtable>' +
      '<mtr><mtd><mn>1</mn><mo stretchy="false">/</mo><mi>m</mi></mtd>' +
      '<mtd><mn>0</mn></mtd></mtr><mtr><mtd><msub><mrow><mi>a</mi></mrow>' +
      '<mrow><mi>i</mi></mrow></msub></mtd><mtd><msub><mrow><mi>r</mi>' +
      '</mrow><mrow><mi>i</mi></mrow></msub></mtd></mtr></mtable></mrow>' +
      '</mfenced><mfenced open="[" close="]"><mrow><mtable><mtr><mtd>' +
      '<mi>t</mi></mtd></mtr><mtr><mtd><mi>x</mi></mtd></mtr></mtable>' +
      '</mrow></mfenced><mo>+</mo><mfenced open="[" close="]"><mrow>' +
      '<mtable><mtr><mtd><mo stretchy="false">(</mo><mi>i</mi>' +
      '<mo>&#x2212;</mo><mn>1</mn><mo stretchy="false">)</mo><mo' +
      ' stretchy="false">/</mo><mi>m</mi></mtd></mtr><mtr><mtd><msub>' +
      '<mrow><mi>b</mi></mrow><mrow><mi>i</mi></mrow></msub></mtd></mtr>' +
      '</mtable></mrow></mfenced><mo>,</mo></mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 66
 */
sre.NobleSpanishTest.prototype.testSample_66 = function() {
  var mml = '<mrow><msub><mrow><mi>c</mi></mrow><mrow><mn>1</mn></mrow>' +
      '</msub><msup><mrow><mi>h</mi></mrow><mrow><mn>4</mn><mo>&#x2212;' +
      '</mo><mn>2</mn><mi>s</mi></mrow></msup><mo>&#x2264;</mo><mfrac>' +
      '<mrow><mn>1</mn></mrow><mrow><mn>2</mn><mi>T</mi></mrow></mfrac>' +
      '<msubsup><mrow><mo>&#x222B;</mo></mrow><mrow><mo>&#x2212;</mo>' +
      '<mi>T</mi></mrow><mrow><mi>T</mi></mrow></msubsup><msup><mrow><mo' +
      ' stretchy="false">(</mo><mi>f</mi><mo stretchy="false">(</mo><mi>t' +
      '</mi><mo>+</mo><mi>h</mi><mo stretchy="false">)</mo><mo>&#x2212;' +
      '</mo><mi>f</mi><mo stretchy="false">(</mo><mi>t</mi><mo' +
      ' stretchy="false">)</mo><mo stretchy="false">)</mo></mrow><mrow>' +
      '<mn>2</mn></mrow></msup><mi mathvariant="normal">d</mi><mi>t</mi>' +
      '<mo>&#x2264;</mo><msub><mrow><mi>c</mi></mrow><mrow><mn>2</mn>' +
      '</mrow></msub><msup><mrow><mi>h</mi></mrow><mrow><mn>4</mn>' +
      '<mo>&#x2212;</mo><mn>2</mn><mi>s</mi></mrow></msup></mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 67
 */
sre.NobleSpanishTest.prototype.testSample_67 = function() {
  var mml = '<mrow><mi>C</mi><mo stretchy="false">(</mo><mn>0</mn><mo' +
      ' stretchy="false">)</mo><mo>&#x2212;</mo><mi>C</mi><mo' +
      ' stretchy="false">(</mo><mi>h</mi><mo stretchy="false">)</mo>' +
      '<mo>&#x2243;</mo><mi>c</mi><msup><mrow><mi>h</mi></mrow><mrow>' +
      '<mn>4</mn><mo>&#x2212;</mo><mn>2</mn><mi>s</mi></mrow></msup></mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 68
 */
sre.NobleSpanishTest.prototype.testSample_68 = function() {
  var mml = '<mrow><mi>S</mi><mo stretchy="false">(</mo><mi>&#x03C9;</mi>' +
      '<mo stretchy="false">)</mo><mo>=</mo><munder><mrow><mi>lim</mi>' +
      '</mrow><mrow><mi>T</mi><mo>&#x2192;</mo><mi>&#x221E;</mi></mrow>' +
      '</munder><mfrac><mrow><mn>1</mn></mrow><mrow><mn>2</mn><mi>T</mi>' +
      '</mrow></mfrac><msup><mrow><mfenced open="|" close="|"><msubsup>' +
      '<mrow><mo>&#x222B;</mo></mrow><mrow><mo>&#x2212;</mo><mi>T</mi>' +
      '</mrow><mrow><mi>T</mi></mrow></msubsup><mi>f</mi><mo' +
      ' stretchy="false">(</mo><mi>t</mi><mo stretchy="false">)</mo>' +
      '<msup><mrow><mi mathvariant="normal">e</mi></mrow><mrow><mi' +
      ' mathvariant="italic">it</mi><mi>&#x03C9;</mi></mrow></msup><mi' +
      ' mathvariant="normal">d</mi><mi>t</mi></mfenced></mrow><mrow><mn>2' +
      '</mn></mrow></msup><mo>.</mo></mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 69
 */
sre.NobleSpanishTest.prototype.testSample_69 = function() {
  var mml = '<mrow><msubsup><mrow><mo>&#x222B;</mo></mrow><mrow><mn>0</mn>' +
      '</mrow><mrow><mn>1</mn></mrow></msubsup><mspace width="-0.2em" />' +
      '<msubsup><mrow><mo>&#x222B;</mo></mrow><mrow><mn>0</mn></mrow>' +
      '<mrow><mn>1</mn></mrow></msubsup><msup><mrow><mrow><mo' +
      ' stretchy="false">[</mo><mrow><mo>&#x007C;</mo><mi>f</mi><mo' +
      ' stretchy="false">(</mo><mi>t</mi><mo stretchy="false">)</mo>' +
      '<mo>&#x2212;</mo><mi>f</mi><mo stretchy="false">(</mo><mi>u</mi>' +
      '<mo stretchy="false">)</mo><msup><mrow><mo>&#x007C;</mo></mrow>' +
      '<mrow><mn>2</mn></mrow></msup><mo>+</mo><mo>&#x007C;</mo><mi>t' +
      '</mi><mo>&#x2212;</mo><mi>u</mi><msup><mrow><mo>&#x007C;</mo>' +
      '</mrow><mrow><mn>2</mn></mrow></msup></mrow><mo stretchy="false">]' +
      '</mo></mrow></mrow><mrow><mo>&#x2212;</mo><mi>s</mi><mo' +
      ' stretchy="false">/</mo><mn>2</mn></mrow></msup><mi' +
      ' mathvariant="normal">d</mi><mi>t</mi><mi mathvariant="normal">d' +
      '</mi><mi>u</mi><mo>&lt;</mo><mi>&#x221E;</mi></mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 70
 */
sre.NobleSpanishTest.prototype.testSample_70 = function() {
  var mml = '<mrow><mi mathvariant="sans-serif">E</mi><mfenced open="("' +
      ' close=")"><mrow><munder><mrow><mo stretchy="true">&#x2211;</mo>' +
      '</mrow><mrow><mi>I</mi><mo>&#x2208;</mo><msub><mrow><mi>E</mi>' +
      '</mrow><mrow><mi>k</mi><mo>+</mo><mn>1</mn></mrow></msub></mrow>' +
      '</munder><mo>&#x007C;</mo><mi>I</mi><msup><mrow><mo>&#x007C;</mo>' +
      '</mrow><mrow><mi>s</mi></mrow></msup></mrow></mfenced><mo>=</mo>' +
      '<mi mathvariant="sans-serif">E</mi><mfenced open="(" close=")">' +
      '<mrow><munder><mrow><mo stretchy="true">&#x2211;</mo></mrow><mrow>' +
      '<mi>I</mi><mo>&#x2208;</mo><msub><mrow><mi>E</mi></mrow><mrow>' +
      '<mi>k</mi></mrow></msub></mrow></munder><mo>&#x007C;</mo><mi>I' +
      '</mi><msup><mrow><mo>&#x007C;</mo></mrow><mrow><mi>s</mi></mrow>' +
      '</msup></mrow></mfenced><mi mathvariant="sans-serif">E</mi><mo' +
      ' stretchy="false">(</mo><msubsup><mrow><mi>R</mi></mrow><mrow>' +
      '<mn>1</mn></mrow><mrow><mi>s</mi></mrow></msubsup><mo>+</mo>' +
      '<msubsup><mrow><mi>R</mi></mrow><mrow><mn>2</mn></mrow><mrow><mi>s' +
      '</mi></mrow></msubsup><mo stretchy="false">)</mo><mo>.</mo></mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 71
 */
sre.NobleSpanishTest.prototype.testSample_71 = function() {
  var mml = '<mrow>' +
      '<mo stretchy="false">(</mo><msub>' +
      '<mi>x</mi>' +
      '<mn>1</mn>' +
      '</msub>' +
      '<mo>,</mo><msub>' +
      '<mi>y</mi>' +
      '<mn>1</mn>' +
      '</msub>' +
      '<mo stretchy="false">)</mo></mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 72
 */
sre.NobleSpanishTest.prototype.testSample_72 = function() {
  var mml = '<mrow>' +
      '<mo stretchy="false">(</mo><msub>' +
      '<mi>x</mi>' +
      '<mn>2</mn>' +
      '</msub>' +
      '<mo>,</mo><msub>' +
      '<mi>y</mi>' +
      '<mn>2</mn>' +
      '</msub>' +
      '<mo stretchy="false">)</mo></mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 73
 */
sre.NobleSpanishTest.prototype.testSample_73 = function() {
  var mml = '<mrow>' +
      '<mi>d</mi><mo>=</mo><msqrt>' +
      '<mrow>' +
      '<msup>' +
      '<mrow>' +
      '<mo stretchy="false">(</mo><msub>' +
      '<mi>x</mi>' +
      '<mn>2</mn>' +
      '</msub>' +
      '<mo>&#x2212;</mo><msub>' +
      '<mi>x</mi>' +
      '<mn>1</mn>' +
      '</msub>' +
      '<mo stretchy="false">)</mo></mrow>' +
      '<mn>2</mn>' +
      '</msup>' +
      '<mo>+</mo><msup>' +
      '<mrow>' +
      '<mo stretchy="false">(</mo><msub>' +
      '<mi>y</mi>' +
      '<mn>2</mn>' +
      '</msub>' +
      '<mo>&#x2212;</mo><msub>' +
      '<mi>y</mi>' +
      '<mn>1</mn>' +
      '</msub>' +
      '<mo stretchy="false">)</mo></mrow>' +
      '<mn>2</mn>' +
      '</msup>' +
      '</mrow>' +
      '</msqrt>' +
      '</mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 74
 */
sre.NobleSpanishTest.prototype.testSample_74 = function() {
  var mml = '<mi>&#x211D;</mi>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 75
 */
sre.NobleSpanishTest.prototype.testSample_75 = function() {
  var mml = '<mrow>' +
      '<mi>&#x211D;</mi><mo>=</mo><mrow><mo>(</mo>' +
      '<mrow>' +
      '<mo>&#x2212;</mo><mi>&#x221E;</mi><mo>,</mo><mi>&#x221E;</mi></mrow>' +
      '<mo>)</mo></mrow></mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 76
 */
sre.NobleSpanishTest.prototype.testSample_76 = function() {
  var mml = '<mrow><mrow><mo>{</mo> <mrow>' +
      '<mn>1</mn><mo>,</mo><mn>2</mn><mo>,</mo><mn>3</mn></mrow> <mo>}</mo>' +
      '</mrow></mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 77
 */
sre.NobleSpanishTest.prototype.testSample_77 = function() {
  var mml = '<mrow>' +
      '<mn>1</mn><mo>&#x2208;</mo><mi>S</mi></mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 78
 */
sre.NobleSpanishTest.prototype.testSample_78 = function() {
  var mml = '<mrow>' +
      '<mn>3</mn><mo>&#x2208;</mo><mi>S</mi></mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 79
 */
sre.NobleSpanishTest.prototype.testSample_79 = function() {
  var mml = '<mrow>' +
      '<mn>4</mn><mo>&#x2209;</mo><mi>S</mi></mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 80
 */
sre.NobleSpanishTest.prototype.testSample_80 = function() {
  var mml = '<mrow>' +
      '<mi>a</mi><mo>=</mo><msqrt>' +
      '<mrow>' +
      '<mn>3</mn><mi>x</mi><mo>&#x2212;</mo><mn>1</mn></mrow>' +
      '</msqrt>' +
      '<mo>+</mo><msup>' +
      '<mrow>' +
      '<mo stretchy="false">(</mo><mn>1</mn><mo>+</mo><mi>x</mi><mo' +
      ' stretchy="false">)</mo></mrow>' +
      '<mn>2</mn>' +
      '</msup>' +
      '</mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 81
 */
sre.NobleSpanishTest.prototype.testSample_81 = function() {
  var mml = '<mrow>' +
      '<mi>a</mi><mo>=</mo><mfrac>' +
      '<mrow>' +
      '<msup>' +
      '<mrow>' +
      '<mrow><mo>(</mo>' +
      '<mrow>' +
      '<mi>b</mi><mo>+</mo><mi>c</mi></mrow>' +
      '<mo>)</mo></mrow></mrow>' +
      '<mn>2</mn>' +
      '</msup>' +
      '</mrow>' +
      '<mi>d</mi>' +
      '</mfrac>' +
      '<mo>+</mo><mfrac>' +
      '<mrow>' +
      '<msup>' +
      '<mrow>' +
      '<mrow><mo>(</mo>' +
      '<mrow>' +
      '<mi>e</mi><mo>+</mo><mi>f</mi></mrow>' +
      '<mo>)</mo></mrow></mrow>' +
      '<mn>2</mn>' +
      '</msup>' +
      '</mrow>' +
      '<mi>g</mi>' +
      '</mfrac>' +
      '</mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 82
 */
sre.NobleSpanishTest.prototype.testSample_82 = function() {
  var mml = '<mrow><mi>x</mi><mo>=</mo><mrow><mo>[</mo> <mrow>' +
      '<msup>' +
      '<mrow>' +
      '<mrow><mo>(</mo>' +
      '<mrow>' +
      '<mi>a</mi><mo>+</mo><mi>b</mi></mrow>' +
      '<mo>)</mo></mrow></mrow>' +
      '<mn>2</mn>' +
      '</msup>' +
      '<msup>' +
      '<mrow>' +
      '<mrow><mo>(</mo>' +
      '<mrow>' +
      '<mi>c</mi><mo>&#x2212;</mo><mi>b</mi></mrow>' +
      '<mo>)</mo></mrow></mrow>' +
      '<mn>2</mn>' +
      '</msup>' +
      '</mrow> <mo>]</mo></mrow><mo>+</mo><mrow><mo>[</mo> <mrow>' +
      '<msup>' +
      '<mrow>' +
      '<mrow><mo>(</mo>' +
      '<mrow>' +
      '<mi>d</mi><mo>+</mo><mi>e</mi></mrow>' +
      '<mo>)</mo></mrow></mrow>' +
      '<mn>2</mn>' +
      '</msup>' +
      '<msup>' +
      '<mrow>' +
      '<mrow><mo>(</mo>' +
      '<mrow>' +
      '<mi>f</mi><mo>&#x2212;</mo><mi>e</mi></mrow>' +
      '<mo>)</mo></mrow></mrow>' +
      '<mn>2</mn>' +
      '</msup>' +
      '</mrow> <mo>]</mo></mrow></mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 83
 */
sre.NobleSpanishTest.prototype.testSample_83 = function() {
  var mml = '<mrow>' +
      '<mi>x</mi><mo>=</mo><mrow><mo>[</mo> <mrow>' +
      '<msup>' +
      '<mrow>' +
      '<mrow><mo>(</mo>' +
      '<mrow>' +
      '<mi>a</mi><mo>+</mo><mi>b</mi></mrow>' +
      '<mo>)</mo></mrow></mrow>' +
      '<mn>2</mn>' +
      '</msup>' +
      '</mrow> <mo>]</mo></mrow><mo>+</mo><mrow><mo>[</mo> <mrow>' +
      '<msup>' +
      '<mrow>' +
      '<mrow><mo>(</mo>' +
      '<mrow>' +
      '<mi>f</mi><mo>&#x2212;</mo><mi>e</mi></mrow>' +
      '<mo>)</mo></mrow></mrow>' +
      '<mn>2</mn>' +
      '</msup>' +
      '</mrow> <mo>]</mo></mrow></mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 84
 */
sre.NobleSpanishTest.prototype.testSample_84 = function() {
  var mml = '<mrow>' +
      '<mi>x</mi><mo>=</mo><mrow><mo>[</mo> <mrow>' +
      '<msup>' +
      '<mrow>' +
      '<mrow><mo>(</mo>' +
      '<mrow>' +
      '<mi>a</mi><mo>+</mo><mi>b</mi></mrow>' +
      '<mo>)</mo></mrow></mrow>' +
      '<mn>2</mn>' +
      '</msup>' +
      '</mrow> <mo>]</mo></mrow></mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 85
 */
sre.NobleSpanishTest.prototype.testSample_85 = function() {
  var mml = '<mrow>' +
      '<mi>x</mi><mo>=</mo><msup>' +
      '<mrow>' +
      '<mrow><mo>(</mo>' +
      '<mrow>' +
      '<mi>a</mi><mo>+</mo><mi>b</mi></mrow>' +
      '<mo>)</mo></mrow></mrow>' +
      '<mn>2</mn>' +
      '</msup>' +
      '</mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 86
 */
sre.NobleSpanishTest.prototype.testSample_86 = function() {
  var mml = '<mrow><mi>x</mi><mo>=</mo><mi>a</mi><mo>+</mo><msup>' +
      '<mi>b</mi>' +
      '<mn>2</mn>' +
      '</msup>' +
      '</mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 87
 */
sre.NobleSpanishTest.prototype.testSample_87 = function() {
  var mml = '<mrow>' +
      '<mfrac>' +
      '<mrow>' +
      '<mfrac>' +
      '<mn>1</mn>' +
      '<mn>2</mn>' +
      '</mfrac>' +
      '</mrow>' +
      '<mrow>' +
      '<mfrac>' +
      '<mn>3</mn>' +
      '<mn>4</mn>' +
      '</mfrac>' +
      '</mrow>' +
      '</mfrac>' +
      '<mo>=</mo><mfrac>' +
      '<mn>2</mn>' +
      '<mn>3</mn>' +
      '</mfrac>' +
      '</mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 88
 */
sre.NobleSpanishTest.prototype.testSample_88 = function() {
  var mml = '<mrow>' +
      '<mn>2</mn><mrow><mo>(</mo>' +
      '<mrow>' +
      '<mrow><mo>(</mo>' +
      '<mrow>' +
      '<mi>x</mi><mo>+</mo><mn>1</mn></mrow>' +
      '<mo>)</mo></mrow><mrow><mo>(</mo>' +
      '<mrow>' +
      '<mi>x</mi><mo>+</mo><mn>3</mn></mrow>' +
      '<mo>)</mo></mrow><mo>&#x2212;</mo><mn>4</mn><mrow><mo>(</mo>' +
      '<mrow>' +
      '<mrow><mo>(</mo>' +
      '<mrow>' +
      '<mi>x</mi><mo>&#x2212;</mo><mn>1</mn></mrow>' +
      '<mo>)</mo></mrow><mrow><mo>(</mo>' +
      '<mrow>' +
      '<mi>x</mi><mo>+</mo><mn>2</mn></mrow>' +
      '<mo>)</mo></mrow><mo>&#x2212;</mo><mn>3</mn></mrow>' +
      '<mo>)</mo></mrow></mrow>' +
      '<mo>)</mo></mrow><mo>=</mo><mi>y</mi></mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 89
 */
sre.NobleSpanishTest.prototype.testSample_89 = function() {
  var mml = '<mrow><mi>cos</mi><mi>x</mi><mo>=</mo><mn>1</mn>' +
      '<mo>&#x2212;</mo><mfrac>' +
      '<mrow>' +
      '<msup>' +
      '<mi>x</mi>' +
      '<mn>2</mn>' +
      '</msup>' +
      '</mrow>' +
      '<mrow>' +
      '<mn>2</mn><mo>!</mo></mrow>' +
      '</mfrac>' +
      '<mo>+</mo><mfrac>' +
      '<mrow>' +
      '<msup>' +
      '<mi>x</mi>' +
      '<mn>4</mn>' +
      '</msup>' +
      '</mrow>' +
      '<mrow>' +
      '<mn>4</mn><mo>!</mo></mrow>' +
      '</mfrac>' +
      '<mo>&#x2212;</mo><mo>&#x2026;</mo></mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 90
 */
sre.NobleSpanishTest.prototype.testSample_90 = function() {
  var mml = '<mrow><mi>x</mi><mo>=</mo><mfrac>' +
      '<mrow>' +
      '<mo>&#x2212;</mo><mi>b</mi><mo>&#x00B1;</mo><msqrt>' +
      '<mrow>' +
      '<msup>' +
      '<mi>b</mi>' +
      '<mn>2</mn>' +
      '</msup>' +
      '<mo>&#x2212;</mo><mn>4</mn><mi>a</mi><mi>c</mi></mrow>' +
      '</msqrt>' +
      '</mrow>' +
      '<mrow>' +
      '<mn>2</mn><mi>a</mi></mrow>' +
      '</mfrac>' +
      '</mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 91
 */
sre.NobleSpanishTest.prototype.testSample_91 = function() {
  var mml = '<mrow><mi>x</mi><mo>+</mo><msup>' +
      '<mi>y</mi>' +
      '<mrow>' +
      '<mfrac>' +
      '<mn>2</mn>' +
      '<mrow>' +
      '<mi>k</mi><mo>+</mo><mn>1</mn></mrow>' +
      '</mfrac>' +
      '</mrow>' +
      '</msup>' +
      '</mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 92
 */
sre.NobleSpanishTest.prototype.testSample_92 = function() {
  var mml = '<mrow><munder>' +
      '<mrow>' +
      '<mi>lim</mi></mrow>' +
      '<mrow>' +
      '<mi>x</mi><mo>&#x2192;</mo><mn>0</mn></mrow>' +
      '</munder>' +
      '<mfrac>' +
      '<mrow>' +
      '<mi>sin</mi><mi>x</mi></mrow>' +
      '<mi>x</mi>' +
      '</mfrac>' +
      '<mo>=</mo><mn>1</mn></mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 93
 */
sre.NobleSpanishTest.prototype.testSample_93 = function() {
  var mml = '<mrow><mi>d</mi><mo>=</mo><msqrt>' +
      '<mrow>' +
      '<msup>' +
      '<mrow>' +
      '<mo stretchy="false">(</mo><msub>' +
      '<mi>x</mi>' +
      '<mn>2</mn>' +
      '</msub>' +
      '<mo>&#x2212;</mo><msub>' +
      '<mi>x</mi>' +
      '<mn>1</mn>' +
      '</msub>' +
      '<mo stretchy="false">)</mo></mrow>' +
      '<mn>2</mn>' +
      '</msup>' +
      '<mo>+</mo><msup>' +
      '<mrow>' +
      '<mo stretchy="false">(</mo><msub>' +
      '<mi>y</mi>' +
      '<mn>2</mn>' +
      '</msub>' +
      '<mo>&#x2212;</mo><msub>' +
      '<mi>y</mi>' +
      '<mn>1</mn>' +
      '</msub>' +
      '<mo stretchy="false">)</mo></mrow>' +
      '<mn>2</mn>' +
      '</msup>' +
      '</mrow>' +
      '</msqrt>' +
      '</mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 94
 */
sre.NobleSpanishTest.prototype.testSample_94 = function() {
  var mml = '<mrow>' +
      '<msub>' +
      '<mi>F</mi>' +
      '<mi>n</mi>' +
      '</msub>' +
      '<mo>=</mo><msub>' +
      '<mi>F</mi>' +
      '<mrow>' +
      '<mi>n</mi><mo>&#x2212;</mo><mn>1</mn></mrow>' +
      '</msub>' +
      '<mo>+</mo><msub>' +
      '<mi>F</mi>' +
      '<mrow>' +
      '<mi>n</mi><mo>&#x2212;</mo><mn>2</mn></mrow>' +
      '</msub>' +
      '</mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 95
 */
sre.NobleSpanishTest.prototype.testSample_95 = function() {
  var mml = '<mrow>' +
      '<mi mathvariant="bold">Π</mi>' +
      '<mo>=</mo>' +
      '<mo>(</mo>' +
      '<mtable>' +
      '<mtr>' +
      '<mtd columnalign="right">' +
      '<msub>' +
      '<mi>π</mi>' +
      '<mn>11</mn>' +
      '</msub>' +
      '</mtd>' +
      '<mtd columnalign="center">' +
      '<msub>' +
      '<mi>π</mi>' +
      '<mn>12</mn>' +
      '</msub>' +
      '</mtd>' +
      '<mtd columnalign="left">' +
      '<msub>' +
      '<mi>π</mi>' +
      '<mn>12</mn>' +
      '</msub>' +
      '</mtd>' +
      '<mtd columnalign="center">' +
      '<mn>0</mn>' +
      '</mtd>' +
      '<mtd columnalign="center">' +
      '<mn>0</mn>' +
      '</mtd>' +
      '<mtd columnalign="center">' +
      '<mn>0</mn>' +
      '</mtd>' +
      '</mtr>' +
      '<mtr>' +
      '<mtd columnalign="right">' +
      '<msub>' +
      '<mi>π</mi>' +
      '<mn>12</mn>' +
      '</msub>' +
      '</mtd>' +
      '<mtd columnalign="center">' +
      '<msub>' +
      '<mi>π</mi>' +
      '<mn>11</mn>' +
      '</msub>' +
      '</mtd>' +
      '<mtd columnalign="left">' +
      '<msub>' +
      '<mi>π</mi>' +
      '<mn>12</mn>' +
      '</msub>' +
      '</mtd>' +
      '<mtd columnalign="center">' +
      '<mn>0</mn>' +
      '</mtd>' +
      '<mtd columnalign="center">' +
      '<mn>0</mn>' +
      '</mtd>' +
      '<mtd columnalign="center">' +
      '<mn>0</mn>' +
      '</mtd>' +
      '</mtr>' +
      '<mtr>' +
      '<mtd columnalign="right">' +
      '<msub>' +
      '<mi>π</mi>' +
      '<mn>12</mn>' +
      '</msub>' +
      '</mtd>' +
      '<mtd columnalign="center">' +
      '<msub>' +
      '<mi>π</mi>' +
      '<mn>12</mn>' +
      '</msub>' +
      '</mtd>' +
      '<mtd columnalign="left">' +
      '<msub>' +
      '<mi>π</mi>' +
      '<mn>11</mn>' +
      '</msub>' +
      '</mtd>' +
      '<mtd columnalign="center">' +
      '<mn>0</mn>' +
      '</mtd>' +
      '<mtd columnalign="center">' +
      '<mn>0</mn>' +
      '</mtd>' +
      '<mtd columnalign="center">' +
      '<mn>0</mn>' +
      '</mtd>' +
      '</mtr>' +
      '<mtr>' +
      '<mtd columnalign="right">' +
      '<mn>0</mn>' +
      '</mtd>' +
      '<mtd columnalign="center">' +
      '<mn>0</mn>' +
      '</mtd>' +
      '<mtd columnalign="left">' +
      '<mn>0</mn>' +
      '</mtd>' +
      '<mtd columnalign="center">' +
      '<msub>' +
      '<mi>π</mi>' +
      '<mn>44</mn>' +
      '</msub>' +
      '</mtd>' +
      '<mtd columnalign="center">' +
      '<mn>0</mn>' +
      '</mtd>' +
      '<mtd columnalign="center">' +
      '<mn>0</mn>' +
      '</mtd>' +
      '</mtr>' +
      '<mtr>' +
      '<mtd columnalign="right">' +
      '<mn>0</mn>' +
      '</mtd>' +
      '<mtd columnalign="center">' +
      '<mn>0</mn>' +
      '</mtd>' +
      '<mtd columnalign="left">' +
      '<mn>0</mn>' +
      '</mtd>' +
      '<mtd columnalign="center">' +
      '<mn>0</mn>' +
      '</mtd>' +
      '<mtd columnalign="center">' +
      '<msub>' +
      '<mi>π</mi>' +
      '<mn>44</mn>' +
      '</msub>' +
      '</mtd>' +
      '<mtd columnalign="center">' +
      '<mn>0</mn>' +
      '</mtd>' +
      '</mtr>' +
      '<mtr>' +
      '<mtd columnalign="right">' +
      '<mn>0</mn>' +
      '</mtd>' +
      '<mtd columnalign="center">' +
      '<mn>0</mn>' +
      '</mtd>' +
      '<mtd columnalign="left">' +
      '<mn>0</mn>' +
      '</mtd>' +
      '<mtd columnalign="center">' +
      '<mn>0</mn>' +
      '</mtd>' +
      '<mtd columnalign="center">' +
      '<mn>0</mn>' +
      '</mtd>' +
      '<mtd columnalign="center">' +
      '<msub>' +
      '<mi>π</mi>' +
      '<mn>44</mn>' +
      '</msub>' +
      '</mtd>' +
      '</mtr>' +
      '</mtable>' +
      '<mo>)</mo>' +
      '</mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 96
 */
sre.NobleSpanishTest.prototype.testSample_96 = function() {
  var mml = '<mrow>' +
      '<msub>' +
      '<mi>s</mi>' +
      '<mn>11</mn>' +
      '</msub>' +
      '<mo>=</mo>' +
      '<mfrac>' +
      '<mrow>' +
      '<msub>' +
      '<mi>c</mi>' +
      '<mn>11</mn>' +
      '</msub>' +
      '<mo>+</mo>' +
      '<msub>' +
      '<mi>c</mi>' +
      '<mn>12</mn>' +
      '</msub>' +
      '</mrow>' +
      '<mrow>' +
      '<mfenced open="(" close=")">' +
      '<mrow>' +
      '<msub>' +
      '<mi>c</mi>' +
      '<mn>11</mn>' +
      '</msub>' +
      '<mo>−</mo>' +
      '<msub>' +
      '<mi>c</mi>' +
      '<mn>12</mn>' +
      '</msub>' +
      '</mrow>' +
      '</mfenced>' +
      '<mfenced open="(" close=")">' +
      '<mrow>' +
      '<msub>' +
      '<mi>c</mi>' +
      '<mn>11</mn>' +
      '</msub>' +
      '<mo>+</mo>' +
      '<mrow>' +
      '<mn>2</mn>' +
      '<msub>' +
      '<mi>c</mi>' +
      '<mn>12</mn>' +
      '</msub>' +
      '</mrow>' +
      '</mrow>' +
      '</mfenced>' +
      '</mrow>' +
      '</mfrac>' +
      '</mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 97
 */
sre.NobleSpanishTest.prototype.testSample_97 = function() {
  var mml = '<mrow>' +
      '<mi mathvariant="normal">Si</mi>' +
      '<msub><mi mathvariant="normal">O</mi>' +
      '<mn>2</mn>' +
      '</msub>' +
      '<mo>+</mo>    ' +
      '<mn>6</mn>' +
      '<mi mathvariant="normal">H</mi>' +
      '<mi mathvariant="normal">F</mi>' +
      '<mo>&#x2192;</mo>        ' +
      '<msub>' +
      '<mi mathvariant="normal">H</mi>' +
      '<mn>2</mn>' +
      '</msub>    ' +
      '<mi mathvariant="normal">Si</mi>' +
      '<msub><mi mathvariant="normal">F</mi>' +
      '<mn>6</mn>' +
      '</msub>' +
      '<mo>+</mo>    ' +
      '<mn>2</mn>' +
      '<msub>' +
      '<mi mathvariant="normal">H</mi>' +
      '<mn>2</mn>' +
      '</msub>' +
      '<mi mathvariant="normal">O</mi>    ' +
      '</mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 98
 */
sre.NobleSpanishTest.prototype.testSample_98 = function() {
  var mml = '<mrow>' +
      '<mfrac>' +
      '<mtext>d</mtext>' +
      '<mrow>' +
      '<mtext>d</mtext>' +
      '<mi>x</mi>' +
      '</mrow>' +
      '</mfrac>' +
      '<mrow>' +
      '<mo stretchy="true">(</mo>' +
      '<mrow>' +
      '<mi>E</mi>' +
      '<mo stretchy="false">(</mo>' +
      '<mi>x</mi>' +
      '<mo stretchy="false">)</mo>' +
      '<mi>A</mi>' +
      '<mo stretchy="false">(</mo>' +
      '<mi>x</mi>' +
      '<mo stretchy="false">)</mo>' +
      '<mfrac>' +
      '<mrow>' +
      '<mtext>d</mtext>' +
      '<mi>w</mi>' +
      '<mo stretchy="false">(</mo>' +
      '<mi>x</mi>' +
      '<mo stretchy="false">)</mo>' +
      '</mrow>' +
      '<mrow>' +
      '<mtext>d</mtext>' +
      '<mi>x</mi>' +
      '</mrow>' +
      '</mfrac>' +
      '</mrow>' +
      '<mo stretchy="true">)</mo>' +
      '</mrow>' +
      '<mo>+</mo>' +
      '<mi>p</mi>' +
      '<mo stretchy="false">(</mo>' +
      '<mi>x</mi>' +
      '<mo stretchy="false">)</mo>' +
      '<mo>=</mo>' +
      '<mn>0</mn>' +
      '</mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 99
 */
sre.NobleSpanishTest.prototype.testSample_99 = function() {
  var mml = '<mrow><msub>' +
      '<mtext>TCS</mtext>' +
      '<mtext>gas</mtext>' +
      '</msub>' +
      '<mo>=</mo>' +
      '<mrow>' +
      '<mo>−</mo>' +
      '<mrow>' +
      '<mfrac>' +
      '<mn>1</mn>' +
      '<mn>2</mn>' +
      '</mfrac>' +
      '<mfenced open="(" close=")">' +
      '<mfrac>' +
      '<msub>' +
      '<mi>P</mi>' +
      '<mtext>seal</mtext>' +
      '</msub>' +
      '<msub>' +
      '<mi>P</mi>' +
      '<mtext>max</mtext>' +
      '</msub>' +
      '</mfrac>' +
      '</mfenced>' +
      '<mfenced open="(" close=")">' +
      '<mfrac>' +
      '<mn>1</mn>' +
      '<msub>' +
      '<mi>T</mi>' +
      '<mtext>seal</mtext>' +
      '</msub>' +
      '</mfrac>' +
      '</mfenced>' +
      '</mrow>' +
      '</mrow>' +
      '</mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 100
 */
sre.NobleSpanishTest.prototype.testSample_100 = function() {
  var mml = '<mrow>' +
      '<msub>' +
      '<mi>B</mi>' +
      '<mi>p</mi>' +
      '</msub>' +
      '<mo>=</mo>' +
      '<mfrac>' +
      '<mrow>' +
      '<mrow>' +
      '<mfrac>' +
      '<mrow>' +
      '<mn>7</mn>' +
      '<mo>−</mo>' +
      '<msup>' +
      '<mi>v</mi>' +
      '<mn>2</mn>' +
      '</msup>' +
      '</mrow>' +
      '<mn>3</mn>' +
      '</mfrac>' +
      '<mfenced open="(" close=")">' +
      '<mrow>' +
      '<mn>1</mn>' +
      '<mo>+</mo>' +
      '<mfrac>' +
      '<msup>' +
      '<mi>c</mi>' +
      '<mn>2</mn>' +
      '</msup>' +
      '<msup>' +
      '<mi>a</mi>' +
      '<mn>2</mn>' +
      '</msup>' +
      '</mfrac>' +
      '<mo>+</mo>' +
      '<mfrac>' +
      '<msup>' +
      '<mi>c</mi>' +
      '<mn>4</mn>' +
      '</msup>' +
      '<msup>' +
      '<mi>a</mi>' +
      '<mn>4</mn>' +
      '</msup>' +
      '</mfrac>' +
      '</mrow>' +
      '</mfenced>' +
      '</mrow>' +
      '<mo>+</mo>' +
      '<mfrac>' +
      '<mrow>' +
      '<msup>' +
      '<mfenced open="(" close=")">' +
      '<mrow>' +
      '<mn>3</mn>' +
      '<mo>−</mo>' +
      '<mi>v</mi>' +
      '</mrow>' +
      '</mfenced>' +
      '<mn>2</mn>' +
      '</msup>' +
      '<msup>' +
      '<mi>c</mi>' +
      '<mn>2</mn>' +
      '</msup>' +
      '</mrow>' +
      '<mrow>' +
      '<mfenced open="(" close=")">' +
      '<mrow>' +
      '<mn>1</mn>' +
      '<mo>+</mo>' +
      '<mi>v</mi>' +
      '</mrow>' +
      '</mfenced>' +
      '<msup>' +
      '<mi>a</mi>' +
      '<mn>2</mn>' +
      '</msup>' +
      '</mrow>' +
      '</mfrac>' +
      '</mrow>' +
      '<mrow>' +
      '<mfenced open="(" close=")">' +
      '<mrow>' +
      '<mn>1</mn>' +
      '<mo>−</mo>' +
      '<mi>v</mi>' +
      '</mrow>' +
      '</mfenced>' +
      '<mfenced open="(" close=")">' +
      '<mrow>' +
      '<mn>1</mn>' +
      '<mo>−</mo>' +
      '<mfrac>' +
      '<msup>' +
      '<mi>c</mi>' +
      '<mn>4</mn>' +
      '</msup>' +
      '<msup>' +
      '<mi>a</mi>' +
      '<mn>4</mn>' +
      '</msup>' +
      '</mfrac>' +
      '</mrow>' +
      '</mfenced>' +
      '<mfenced open="(" close=")">' +
      '<mrow>' +
      '<mn>1</mn>' +
      '<mo>−</mo>' +
      '<mfrac>' +
      '<msup>' +
      '<mi>c</mi>' +
      '<mn>2</mn>' +
      '</msup>' +
      '<msup>' +
      '<mi>a</mi>' +
      '<mn>2</mn>' +
      '</msup>' +
      '</mfrac>' +
      '</mrow>' +
      '</mfenced>' +
      '</mrow>' +
      '</mfrac>' +
      '</mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 101
 */
sre.NobleSpanishTest.prototype.testSample_101 = function() {
  var mml = '<mrow>' +
      '<msubsup>' +
      '<mi>Q</mi>' +
      '<mtext>tank</mtext>' +
      '<mtext>series</mtext>' +
      '</msubsup>' +
      '<mo>=</mo>' +
      '<mrow>' +
      '<mfrac>' +
      '<mn>1</mn>' +
      '<msub>' +
      '<mi>R</mi>' +
      '<mtext>s</mtext>' +
      '</msub>' +
      '</mfrac>' +
      '<msqrt>' +
      '<mfrac>' +
      '<msub>' +
      '<mi>L</mi>' +
      '<mtext>s</mtext>' +
      '</msub>' +
      '<msub>' +
      '<mi>C</mi>' +
      '<mtext>s</mtext>' +
      '</msub>' +
      '</mfrac>' +
      '</msqrt>' +
      '</mrow>' +
      '</mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 102
 */
sre.NobleSpanishTest.prototype.testSample_102 = function() {
  var mml = '<mrow><mtext>Δ</mtext>' +
      '<msub>' +
      '<mi>ϕ</mi>' +
      '<mtext>peak</mtext>' +
      '</msub>' +
      '<mo>=</mo>' +
      '<msup>' +
      '<mo>tan</mo>' +
      '<mrow>' +
      '<mo>−</mo>' +
      '<mn>1</mn>' +
      '</mrow>' +
      '</msup>' +
      '<mo>(</mo>' +
      '<msup>' +
      '<mi>k</mi>' +
      '<mn>2</mn>' +
      '</msup>' +
      '<msubsup>' +
      '<mi>Q</mi>' +
      '<mtext>tank</mtext>' +
      '<mtext>series</mtext>' +
      '</msubsup>' +
      '<mo>)</mo>' +
      '</mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 103
 */
sre.NobleSpanishTest.prototype.testSample_103 = function() {
  var mml = '<mrow><mi>f</mi>' +
      '<mo>=</mo>' +
      '<mn>1.013</mn>' +
      '<mfrac>' +
      '<mi>W</mi>' +
      '<msup>' +
      '<mi>L</mi>' +
      '<mn>2</mn>' +
      '</msup>' +
      '</mfrac>' +
      '<msqrt>' +
      '<mfrac>' +
      '<mi>E</mi>' +
      '<mi>ρ</mi>' +
      '</mfrac>' +
      '</msqrt>' +
      '<msqrt>' +
      '<mo>(</mo>' +
      '<mn>1</mn>' +
      '<mo>+</mo>' +
      '<mn>0.293</mn>' +
      '<mfrac>' +
      '<msup>' +
      '<mi>L</mi>' +
      '<mn>2</mn>' +
      '</msup>' +
      '<mrow>' +
      '<msup>' +
      '<mtext>EW</mtext>' +
      '<mn>2</mn>' +
      '</msup>' +
      '</mrow>' +
      '</mfrac>' +
      '<mi>σ</mi>' +
      '<mo>)</mo>' +
      '</msqrt>' +
      '</mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 104
 */
sre.NobleSpanishTest.prototype.testSample_104 = function() {
  var mml = '<mrow><mrow>' +
      '<msub>' +
      '<mi>u</mi>' +
      '<mi>n</mi>' +
      '</msub>' +
      '<mfenced open="(" close=")">' +
      '<mi>x</mi>' +
      '</mfenced>' +
      '</mrow>' +
      '<mo>=</mo>' +
      '<mrow>' +
      '<mrow>' +
      '<msub>' +
      '<mi>γ</mi>' +
      '<mi>n</mi>' +
      '</msub>' +
      '<mfenced open="(" close=")">' +
      '<mrow>' +
      '<mrow>' +
      '<mi>cosh</mi>' +
      '<msub>' +
      '<mi>k</mi>' +
      '<mi>n</mi>' +
      '</msub>' +
      '<mi>x</mi>' +
      '</mrow>' +
      '<mo>−</mo>' +
      '<mrow>' +
      '<mi>cos</mi>' +
      '<msub>' +
      '<mi>k</mi>' +
      '<mi>n</mi>' +
      '</msub>' +
      '<mi>x</mi>' +
      '</mrow>' +
      '</mrow>' +
      '</mfenced>' +
      '</mrow>' +
      '<mo>+</mo>' +
      '<mfenced open="(" close=")">' +
      '<mrow>' +
      '<mrow>' +
      '<mi>sinh</mi>' +
      '<msub>' +
      '<mi>k</mi>' +
      '<mi>n</mi>' +
      '</msub>' +
      '<mi>x</mi>' +
      '</mrow>' +
      '<mo>−</mo>' +
      '<mrow>' +
      '<mi>sin</mi>' +
      '<msub>' +
      '<mi>k</mi>' +
      '<mi>n</mi>' +
      '</msub>' +
      '<mi>x</mi>' +
      '</mrow>' +
      '</mrow>' +
      '</mfenced>' +
      '</mrow>' +
      '</mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 105
 */
sre.NobleSpanishTest.prototype.testSample_105 = function() {
  var mml = '<mtable><mtr>' +
      '<mtd columnalign="left">' +
      '<mi>B</mi>' +
      '</mtd>' +
      '<mtd columnalign="left">' +
      '<mo>=</mo>' +
      '<mfrac>' +
      '<mfrac>' +
      '<msub>' +
      '<mi>F</mi>' +
      '<mn>0</mn>' +
      '</msub>' +
      '<mi>m</mi>' +
      '</mfrac>' +
      '<mrow>' +
      '<msqrt>' +
      '<mo stretchy="false">(</mo>' +
      '<msubsup>' +
      '<mi>ω</mi>' +
      '<mn>0</mn>' +
      '<mn>2</mn>' +
      '</msubsup>' +
      '<mo>−</mo>' +
      '<msup>' +
      '<mi>ω</mi>' +
      '<mn>2</mn>' +
      '</msup>' +
      '<msup>' +
      '<mo stretchy="false">)</mo>' +
      '<mn>2</mn>' +
      '</msup>' +
      '<mo>+</mo>' +
      '<mn>4</mn>' +
      '<msup>' +
      '<mi>n</mi>' +
      '<mn>2</mn>' +
      '</msup>' +
      '<msup>' +
      '<mi>ω</mi>' +
      '<mn>2</mn>' +
      '</msup>' +
      '</msqrt>' +
      '</mrow>' +
      '</mfrac>' +
      '</mtd>' +
      '</mtr>' +
      '<mtr>' +
      '<mtd/>' +
      '<mtd columnalign="left">' +
      '<mo>=</mo>' +
      '<mfrac>' +
      '<mfrac>' +
      '<mrow>' +
      '<msub>' +
      '<mi>F</mi>' +
      '<mn>0</mn>' +
      '</msub>' +
      '</mrow>' +
      '<mi>k</mi>' +
      '</mfrac>' +
      '<mrow>' +
      '<msqrt>' +
      '<mo>(</mo>' +
      '<mn>1</mn>' +
      '<mo>−</mo>' +
      '<mo stretchy="false">(</mo>' +
      '<mi>ω</mi>' +
      '<mo stretchy="true">/</mo>' +
      '<msubsup>' +
      '<mi>ω</mi>' +
      '<mn>0</mn>' +
      '<mn>2</mn>' +
      '</msubsup>' +
      '<msup>' +
      '<mo stretchy="false">)</mo>' +
      '<mn>2</mn>' +
      '</msup>' +
      '<msup>' +
      '<mo>)</mo>' +
      '<mn>2</mn>' +
      '</msup>' +
      '<mo>+</mo>' +
      '<mn>4</mn>' +
      '<mo stretchy="false">(</mo>' +
      '<mi>n</mi>' +
      '<mo stretchy="true">/</mo>' +
      '<msub>' +
      '<mi>ω</mi>' +
      '<mn>0</mn>' +
      '</msub>' +
      '<msup>' +
      '<mo stretchy="false">)</mo>' +
      '<mn>2</mn>' +
      '</msup>' +
      '<mo stretchy="false">(</mo>' +
      '<mi>ω</mi>' +
      '<mo stretchy="true">/</mo>' +
      '<msub>' +
      '<mi>ω</mi>' +
      '<mn>0</mn>' +
      '</msub>' +
      '<msup>' +
      '<mo stretchy="false">)</mo>' +
      '<mn>2</mn>' +
      '</msup>' +
      '</msqrt>' +
      '</mrow>' +
      '</mfrac>' +
      '</mtd>' +
      '</mtr>' +
      '</mtable>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 106
 */
sre.NobleSpanishTest.prototype.testSample_106 = function() {
  var mml = '<mrow>' +
      '<mi mathvariant="normal">p</mi>' +
      '<mo>(</mo>' +
      '<mi>A</mi>' +
      '<mspace width="3.33333pt"/>' +
      '<mi>and</mi>' +
      '<mspace width="3.33333pt"/>' +
      '<mi>B</mi>' +
      '<mo>)</mo>' +
      '<mo>=</mo>' +
      '<mi mathvariant="normal">p</mi>' +
      '<mo>(</mo>' +
      '<mi>A</mi>' +
      '<mo>)</mo>' +
      '<mspace width="3.33333pt"/>' +
      '<mi mathvariant="normal">p</mi>' +
      '<mo>(</mo>' +
      '<mi>B</mi>' +
      '<mo>|</mo>' +
      '<mi>A</mi>' +
      '<mo>)</mo>' +
      '</mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 107
 */
sre.NobleSpanishTest.prototype.testSample_107 = function() {
  var mml = '<mrow>' +
      '<mi>PMF</mi>' +
      '<mrow>' +
      '<mo>(</mo>' +
      '<mi>x</mi>' +
      '<mo>)</mo>' +
      '</mrow>' +
      '<mo>∝</mo>' +
      '<msup>' +
      '<mfenced close=")" open="(" separators="">' +
      '<mfrac>' +
      '<mn>1</mn>' +
      '<mi>x</mi>' +
      '</mfrac>' +
      '</mfenced>' +
      '<mi>α</mi>' +
      '</msup>' +
      '</mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 108
 */
sre.NobleSpanishTest.prototype.testSample_108 = function() {
  var mml = '<mrow>' +
      '<mi>f</mi>' +
      '<mrow>' +
      '<mo>(</mo>' +
      '<mi>x</mi>' +
      '<mo>)</mo>' +
      '</mrow>' +
      '<mo>=</mo>' +
      '<mfrac>' +
      '<mn>1</mn>' +
      '<msqrt>' +
      '<mrow>' +
      '<mn>2</mn>' +
      '<mi>π</mi>' +
      '</mrow>' +
      '</msqrt>' +
      '</mfrac>' +
      '<mo form="prefix">exp</mo>' +
      '<mrow>' +
      '<mo>(</mo>' +
      '<mo>-</mo>' +
      '<msup>' +
      '<mi>x</mi>' +
      '<mn>2</mn>' +
      '</msup>' +
      '<mo>/2)</mo>' +
      '</mrow>' +
      '</mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 109
 */
sre.NobleSpanishTest.prototype.testSample_109 = function() {
  var mml = '<mrow><mfrac>' +
      '<mrow>' +
      '<mi>d</mi>' +
      '<mi>x</mi>' +
      '</mrow>' +
      '<mrow>' +
      '<mi>d</mi>' +
      '<mi>θ</mi>' +
      '</mrow>' +
      '</mfrac>' +
      '<mo>=</mo>' +
      '<mfrac>' +
      '<mi>β</mi>' +
      '<mrow>' +
      '<msup>' +
      '<mo form="prefix">cos</mo>' +
      '<mn>2</mn>' +
      '</msup>' +
      '<mi>θ</mi>' +
      '</mrow>' +
      '</mfrac>' +
      '</mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Sample 110
 */
sre.NobleSpanishTest.prototype.testSample_110 = function() {
  var mml = '<mrow><mi>s</mi>' +
      '<mo>/</mo>' +
      '<msqrt>' +
      '<mrow>' +
      '<mn>2</mn>' +
      '<mo>(</mo>' +
      '<mi>n</mi>' +
      '<mo>-</mo>' +
      '<mn>1</mn>' +
      '<mo>)</mo>' +
      '</mrow>' +
      '</msqrt>' +
      '</mrow>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


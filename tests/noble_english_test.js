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

goog.provide('sre.NobleEnglishTest');

goog.require('sre.AbstractRuleTest');



/**
 * @constructor
 * @extends {sre.AbstractRuleTest}
 */
sre.NobleEnglishTest = function() {
  sre.NobleEnglishTest.base(this, 'constructor');

  /**
   * @override
   */
  this.information = 'Steve Noble\'s samples English tests.';

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
  this.rules = ['MathspeakRules'];

  this.setActive('NobleSamplesEnglish');
};
goog.inherits(sre.NobleEnglishTest, sre.AbstractRuleTest);


/**
 * Testing Sample 1
 */
sre.NobleEnglishTest.prototype.testSample_1 = function() {
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
  this.executeRuleTest(mml, 'negative 5 and one fifth minus 6 and' +
                       ' two thirds equals', 'default');
  this.executeRuleTest(mml, 'negative 5 and one fifth minus 6 and' +
                       ' two thirds equals', 'brief');
  this.executeRuleTest(mml, 'negative 5 and one fifth minus 6 and' +
                       ' two thirds equals', 'sbrief');
};


/**
 * Testing Sample 2
 */
sre.NobleEnglishTest.prototype.testSample_2 = function() {
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
  this.executeRuleTest(mml, 'negative 7 and three fourths minus' +
                       ' left-parenthesis negative 4 and seven eighths' +
                       ' right-parenthesis equals', 'default');
  this.executeRuleTest(mml, 'negative 7 and three fourths minus left-p\'ren' +
                       ' negative 4 and seven eighths right-p\'ren equals',
                       'brief');
  this.executeRuleTest(mml, 'negative 7 and three fourths minus L p\'ren' +
                       ' negative 4 and seven eighths R p\'ren equals',
                       'sbrief');
};


/**
 * Testing Sample 3
 */
sre.NobleEnglishTest.prototype.testSample_3 = function() {
  var mml = '<mrow>' +
      '<mo>&#x2212;</mo><mn>24.15</mn><mo>&#x2212;</mo><mrow><mo>(</mo>' +
      '<mrow>' +
      '<mn>13.7</mn>' +
      '</mrow>' +
      '<mo>)</mo></mrow><mo>=</mo>' +
      '</mrow>';
  this.executeRuleTest(mml, 'negative 24.15 minus left-parenthesis 13.7' +
                       ' right-parenthesis equals', 'default');
  this.executeRuleTest(mml, 'negative 24.15 minus left-p\'ren 13.7' +
                       ' right-p\'ren equals', 'brief');
  this.executeRuleTest(mml, 'negative 24.15 minus L p\'ren 13.7 R p\'ren' +
                       ' equals', 'sbrief');
};


/**
 * Testing Sample 4
 */
sre.NobleEnglishTest.prototype.testSample_4 = function() {
  var mml = '<mrow>' +
      '<mrow><mo>(</mo>' +
      '<mrow>' +
      '<mo>&#x2212;</mo><mn>4</mn>' +
      '</mrow>' +
      '<mo>)</mo></mrow><mo>&#x00D7;</mo><mn>3</mn><mo>=</mo><mo>&#x2212;' +
      '</mo><mn>12</mn>' +
      '</mrow>';
  this.executeRuleTest(mml, 'left-parenthesis negative 4 right-parenthesis' +
                       ' times 3 equals negative 12', 'default');
  this.executeRuleTest(mml, 'left-p\'ren negative 4 right-p\'ren times 3' +
                       ' equals negative 12', 'brief');
  this.executeRuleTest(mml, 'L p\'ren negative 4 R p\'ren times 3 equals' +
                       ' negative 12', 'sbrief');
};


/**
 * Testing Sample 5
 */
sre.NobleEnglishTest.prototype.testSample_5 = function() {
  var mml = '<mrow>' +
      '<mo>&#x2212;</mo><mn>12</mn><mo>&#x00F7;</mo><mn>3</mn><mo>=</mo>' +
      '<mo>&#x2212;</mo><mn>4</mn>' +
      '</mrow>';
  this.executeRuleTest(mml, 'negative 12 division-sign 3 equals negative' +
                       ' 4', 'default');
  this.executeRuleTest(mml, 'negative 12 division-sign 3 equals negative' +
                       ' 4', 'brief');
  this.executeRuleTest(mml, 'negative 12 division-sign 3 equals negative' +
                       ' 4', 'sbrief');
};


/**
 * Testing Sample 6
 */
sre.NobleEnglishTest.prototype.testSample_6 = function() {
  var mml = '<mrow>' +
      '<mo>&#x2212;</mo><mn>12</mn><mo>&#x00F7;</mo><mrow><mo>(</mo>' +
      '<mrow>' +
      '<mo>&#x2212;</mo><mn>4</mn>' +
      '</mrow>' +
      '<mo>)</mo></mrow><mo>=</mo><mn>3</mn>' +
      '</mrow>';
  this.executeRuleTest(mml, 'negative 12 division-sign left-parenthesis' +
                       ' negative 4 right-parenthesis equals 3', 'default');
  this.executeRuleTest(mml, 'negative 12 division-sign left-p\'ren negative' +
                       ' 4 right-p\'ren equals 3', 'brief');
  this.executeRuleTest(mml, 'negative 12 division-sign L p\'ren negative 4' +
                       ' R p\'ren equals 3', 'sbrief');
};


/**
 * Testing Sample 7
 */
sre.NobleEnglishTest.prototype.testSample_7 = function() {
  var mml = '<mrow>' +
      '<mn>6</mn><mo>&#x00D7;</mo><mn>5</mn>' +
      '</mrow>';
  this.executeRuleTest(mml, '6 times 5', 'default');
  this.executeRuleTest(mml, '6 times 5', 'brief');
  this.executeRuleTest(mml, '6 times 5', 'sbrief');
};


/**
 * Testing Sample 8
 */
sre.NobleEnglishTest.prototype.testSample_8 = function() {
  var mml = '<mrow>' +
      '<mn>6</mn><mo>&#x00D7;</mo><mrow><mo>(</mo>' +
      '<mrow>' +
      '<mo>&#x2212;</mo><mn>5</mn>' +
      '</mrow>' +
      '<mo>)</mo></mrow>' +
      '</mrow>';
  this.executeRuleTest(mml, '6 times left-parenthesis negative 5' +
                       ' right-parenthesis', 'default');
  this.executeRuleTest(mml, '6 times left-p\'ren negative 5 right-p\'ren',
                       'brief');
  this.executeRuleTest(mml, '6 times L p\'ren negative 5 R p\'ren', 'sbrief');
};


/**
 * Testing Sample 9
 */
sre.NobleEnglishTest.prototype.testSample_9 = function() {
  var mml = '<mrow>' +
      '<mo>&#x2212;</mo><mn>6</mn><mo>&#x00D7;</mo><mn>5</mn>' +
      '</mrow>';
  this.executeRuleTest(mml, 'negative 6 times 5', 'default');
  this.executeRuleTest(mml, 'negative 6 times 5', 'brief');
  this.executeRuleTest(mml, 'negative 6 times 5', 'sbrief');
};


/**
 * Testing Sample 10
 */
sre.NobleEnglishTest.prototype.testSample_10 = function() {
  var mml = '<mrow>' +
      '<mo>&#x2212;</mo><mn>6</mn><mo>&#x00D7;</mo><mrow><mo>(</mo>' +
      '<mrow>' +
      '<mo>&#x2212;</mo><mn>5</mn>' +
      '</mrow>' +
      '<mo>)</mo></mrow>' +
      '</mrow>';
  this.executeRuleTest(mml, 'negative 6 times left-parenthesis negative 5' +
                       ' right-parenthesis', 'default');
  this.executeRuleTest(mml, 'negative 6 times left-p\'ren negative 5' +
                       ' right-p\'ren', 'brief');
  this.executeRuleTest(mml, 'negative 6 times L p\'ren negative 5 R p\'ren',
                       'sbrief');
};


/**
 * Testing Sample 11
 */
sre.NobleEnglishTest.prototype.testSample_11 = function() {
  var mml = '<mrow>' +
      '<mo>&#x2212;</mo><mn>8</mn><mo>&#x00D7;</mo><mn>7</mn>' +
      '</mrow>';
  this.executeRuleTest(mml, 'negative 8 times 7', 'default');
  this.executeRuleTest(mml, 'negative 8 times 7', 'brief');
  this.executeRuleTest(mml, 'negative 8 times 7', 'sbrief');
};


/**
 * Testing Sample 12
 */
sre.NobleEnglishTest.prototype.testSample_12 = function() {
  var mml = '<mrow>' +
      '<mo>&#x2212;</mo><mn>8</mn><mo>&#x00D7;</mo><mrow><mo>(</mo>' +
      '<mrow>' +
      '<mo>&#x2212;</mo><mn>7</mn>' +
      '</mrow>' +
      '<mo>)</mo></mrow>' +
      '</mrow>';
  this.executeRuleTest(mml, 'negative 8 times left-parenthesis negative 7' +
                       ' right-parenthesis', 'default');
  this.executeRuleTest(mml, 'negative 8 times left-p\'ren negative 7' +
                       ' right-p\'ren', 'brief');
  this.executeRuleTest(mml, 'negative 8 times L p\'ren negative 7 R' +
                       ' p\'ren', 'sbrief');
};


/**
 * Testing Sample 13
 */
sre.NobleEnglishTest.prototype.testSample_13 = function() {
  var mml = '<mrow>' +
      '<mn>8</mn><mo>&#x00D7;</mo><mrow><mo>(</mo>' +
      '<mrow>' +
      '<mo>&#x2212;</mo><mn>7</mn>' +
      '</mrow>' +
      '<mo>)</mo></mrow>' +
      '</mrow>';
  this.executeRuleTest(mml, '8 times left-parenthesis negative 7' +
                       ' right-parenthesis', 'default');
  this.executeRuleTest(mml, '8 times left-p\'ren negative 7 right-p\'ren',
                       'brief');
  this.executeRuleTest(mml, '8 times L p\'ren negative 7 R p\'ren', 'sbrief');
};


/**
 * Testing Sample 14
 */
sre.NobleEnglishTest.prototype.testSample_14 = function() {
  var mml = '<mrow><mn>8</mn><mo>&#x00D7;</mo><mn>7</mn>' +
      '</mrow>';
  this.executeRuleTest(mml, '8 times 7', 'default');
  this.executeRuleTest(mml, '8 times 7', 'brief');
  this.executeRuleTest(mml, '8 times 7', 'sbrief');
};


/**
 * Testing Sample 15
 */
sre.NobleEnglishTest.prototype.testSample_15 = function() {
  var mml = '<mrow>' +
      '<mi>m</mi><mo>&#x2220;</mo><mn>1</mn><mo>=</mo><mi>30°</mi>' +
      '</mrow>';
  this.executeRuleTest(mml, 'm angle 1 equals 30 degree', 'default');
  this.executeRuleTest(mml, 'm angle 1 equals 30 degree', 'brief');
  this.executeRuleTest(mml, 'm angle 1 equals 30 degree', 'sbrief');
};


/**
 * Testing Sample 16
 */
sre.NobleEnglishTest.prototype.testSample_16 = function() {
  var mml = '<mrow>' +
      '<mi>m</mi><mo>&#x2220;</mo><mn>2</mn><mo>=</mo>' +
      '<mi>60°</mi>  </mrow>';
  this.executeRuleTest(mml, 'm angle 2 equals 60 degree', 'default');
  this.executeRuleTest(mml, 'm angle 2 equals 60 degree', 'brief');
  this.executeRuleTest(mml, 'm angle 2 equals 60 degree', 'sbrief');
};


/**
 * Testing Sample 17
 */
sre.NobleEnglishTest.prototype.testSample_17 = function() {
  var mml = '<mrow>' +
      '<mi>m</mi><mo>&#x2220;</mo><mn>1</mn><mo>+</mo><mi>m</mi>' +
      '<mo>&#x2220;</mo><mn>2</mn><mo>=</mo>' +
      '<mi>90°</mi>  </mrow>';
  this.executeRuleTest(mml, 'm angle 1 plus m angle 2 equals 90 degree',
                       'default');
  this.executeRuleTest(mml, 'm angle 1 plus m angle 2 equals 90 degree',
                       'brief');
  this.executeRuleTest(mml, 'm angle 1 plus m angle 2 equals 90 degree',
                       'sbrief');
};


/**
 * Testing Sample 18
 */
sre.NobleEnglishTest.prototype.testSample_18 = function() {
  var mml = '<mrow>' +
      '<mi>m</mi><mo>&#x2220;</mo><mi>M</mi><mo>+</mo><mi>m</mi>' +
      '<mo>&#x2220;</mo><mi>N</mi><mo>=</mo>' +
      '<mi>180°</mi>  </mrow>';
  this.executeRuleTest(mml, 'm angle upper M plus m angle upper N equals' +
                       ' 180 degree', 'default');
  this.executeRuleTest(mml, 'm angle upper M plus m angle upper N equals' +
                       ' 180 degree', 'brief');
  this.executeRuleTest(mml, 'm angle upper M plus m angle upper N equals' +
                       ' 180 degree', 'sbrief');
};


/**
 * Testing Sample 19
 */
sre.NobleEnglishTest.prototype.testSample_19 = function() {
  var mml = '<mrow>' +
      '<mi>A</mi><mo>=</mo><mfrac>' +
      '<mn>1</mn>' +
      '<mn>2</mn>' +
      '</mfrac>' +
      '<mi>b</mi><mi>h</mi>' +
      '</mrow>';
  this.executeRuleTest(mml, 'upper A equals one half b h', 'default');
  this.executeRuleTest(mml, 'upper A equals one half b h', 'brief');
  this.executeRuleTest(mml, 'upper A equals one half b h', 'sbrief');
};


/**
 * Testing Sample 20
 */
sre.NobleEnglishTest.prototype.testSample_20 = function() {
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
  this.executeRuleTest(mml, 'StartFraction area of triangle Over area of' +
                       ' square EndFraction equals StartFraction 1 unit' +
                       ' squared Over 16 units squared EndFraction', 'default');
  this.executeRuleTest(mml, 'StartFrac area of triangle Over area of square' +
                       ' EndFrac equals StartFrac 1 unit squared Over 16' +
                       ' units squared EndFrac', 'brief');
  this.executeRuleTest(mml, 'Frac area of triangle Over area of square' +
                       ' EndFrac equals Frac 1 unit squared Over 16 units' +
                       ' squared EndFrac', 'sbrief');
};


/**
 * Testing Sample 21
 */
sre.NobleEnglishTest.prototype.testSample_21 = function() {
  var mml = '<mrow>' +
      '<msup>' +
      '<mrow>' +
      '<mn>0.6</mn>' +
      '</mrow>' +
      '<mn>2</mn>' +
      '</msup>' +
      '</mrow>';
  this.executeRuleTest(mml, '0.6 squared', 'default');
  this.executeRuleTest(mml, '0.6 squared', 'brief');
  this.executeRuleTest(mml, '0.6 squared', 'sbrief');
};


/**
 * Testing Sample 22
 */
sre.NobleEnglishTest.prototype.testSample_22 = function() {
  var mml = '<mrow>' +
      '<msup>' +
      '<mrow>' +
      '<mn>1.5</mn>' +
      '</mrow>' +
      '<mn>2</mn>' +
      '</msup>    ' +
      '</mrow>';
  this.executeRuleTest(mml, '1.5 squared', 'default');
  this.executeRuleTest(mml, '1.5 squared', 'brief');
  this.executeRuleTest(mml, '1.5 squared', 'sbrief');
};


/**
 * Testing Sample 23
 */
sre.NobleEnglishTest.prototype.testSample_23 = function() {
  var mml = '<mrow>' +
      '<mn>4</mn><mrow><mo>(</mo>' +
      '<mrow>' +
      '<mn>2</mn><mi>x</mi><mo>+</mo><mn>3</mn><mi>x</mi>' +
      '</mrow>' +
      '<mo>)</mo></mrow>' +
      '</mrow>';
  this.executeRuleTest(mml, '4 left-parenthesis 2 x plus 3 x' +
                       ' right-parenthesis', 'default');
  this.executeRuleTest(mml, '4 left-p\'ren 2 x plus 3 x right-p\'ren', 'brief');
  this.executeRuleTest(mml, '4 L p\'ren 2 x plus 3 x R p\'ren', 'sbrief');
};


/**
 * Testing Sample 24
 */
sre.NobleEnglishTest.prototype.testSample_24 = function() {
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
  this.executeRuleTest(mml, '36 plus 4 y minus 1 y squared plus 5 y squared' +
                       ' minus 2', 'default');
  this.executeRuleTest(mml, '36 plus 4 y minus 1 y squared plus 5 y squared' +
                       ' minus 2', 'brief');
  this.executeRuleTest(mml, '36 plus 4 y minus 1 y squared plus 5 y squared' +
                       ' minus 2', 'sbrief');
};


/**
 * Testing Sample 25
 */
sre.NobleEnglishTest.prototype.testSample_25 = function() {
  var mml = '<mrow>' +
      '<mrow><mo>(</mo>' +
      '<mrow>' +
      '<mn>5</mn><mo>+</mo><mn>9</mn>' +
      '</mrow>' +
      '<mo>)</mo></mrow><mo>&#x2212;</mo><mn>4</mn><mo>+</mo><mn>3</mn>' +
      '<mo>=</mo>' +
      '</mrow>';
  this.executeRuleTest(mml, 'left-parenthesis 5 plus 9 right-parenthesis' +
                       ' minus 4 plus 3 equals', 'default');
  this.executeRuleTest(mml, 'left-p\'ren 5 plus 9 right-p\'ren minus 4 plus' +
                       ' 3 equals', 'brief');
  this.executeRuleTest(mml, 'L p\'ren 5 plus 9 R p\'ren minus 4 plus 3' +
                       ' equals', 'sbrief');
};


/**
 * Testing Sample 26
 */
sre.NobleEnglishTest.prototype.testSample_26 = function() {
  var mml = '<mrow>' +
      '<mover accent="true">' +
      '<mrow>' +
      '<mi>B</mi><mi>C</mi>' +
      '</mrow>' +
      '<mo stretchy="true">&#x2194;</mo>' +
      '</mover>' +
      '</mrow>';
  this.executeRuleTest(mml, 'ModifyingAbove upper B upper C With' +
                       ' left-right-arrow', 'default');
  this.executeRuleTest(mml, 'ModAbove upper B upper C With left-right-arrow',
                       'brief');
  this.executeRuleTest(mml, 'ModAbove upper B upper C With L R arrow',
                       'sbrief');
};


/**
 * Testing Sample 27
 */
sre.NobleEnglishTest.prototype.testSample_27 = function() {
  var mml = '<mrow>' +
      '<mover accent="true">' +
      '<mrow>' +
      '<mi>P</mi><mi>Q</mi>' +
      '</mrow>' +
      '<mo stretchy="true">&#x2192;</mo>' +
      '</mover>' +
      '</mrow>';
  this.executeRuleTest(mml, 'ModifyingAbove upper P upper Q With' +
                       ' right-arrow', 'default');
  this.executeRuleTest(mml, 'ModAbove upper P upper Q With right-arrow',
                       'brief');
  this.executeRuleTest(mml, 'ModAbove upper P upper Q With R arrow', 'sbrief');
};


/**
 * Testing Sample 28
 */
sre.NobleEnglishTest.prototype.testSample_28 = function() {
  var mml = '<mrow>' +
      '<mover accent="true">' +
      '<mrow>' +
      '<mi>G</mi><mi>H</mi>' +
      '</mrow>' +
      '<mo stretchy="true">&#x00AF;</mo>' +
      '</mover>' +
      '</mrow>';
  this.executeRuleTest(mml, 'ModifyingAbove upper G upper H With bar',
                       'default');
  this.executeRuleTest(mml, 'ModAbove upper G upper H With bar', 'brief');
  this.executeRuleTest(mml, 'ModAbove upper G upper H With bar', 'sbrief');
};


/**
 * Testing Sample 29
 */
sre.NobleEnglishTest.prototype.testSample_29 = function() {
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
  this.executeRuleTest(mml, 'ModifyingAbove upper W upper X With bar' +
                       ' approximately-equals ModifyingAbove upper Y upper' +
                       ' Z With bar', 'default');
  this.executeRuleTest(mml, 'ModAbove upper W upper X With bar' +
                       ' approximately-equals ModAbove upper Y upper Z With' +
                       ' bar', 'brief');
  this.executeRuleTest(mml, 'ModAbove upper W upper X With bar' +
                       ' approximately-equals ModAbove upper Y upper Z With' +
                       ' bar', 'sbrief');
};


/**
 * Testing Sample 30
 */
sre.NobleEnglishTest.prototype.testSample_30 = function() {
  var mml = '<mrow>' +
      '<mo>&#x2220;</mo><mi>B</mi><mi>E</mi><mi>F</mi>' +
      '</mrow>';
  this.executeRuleTest(mml, 'angle upper B upper E upper F', 'default');
  this.executeRuleTest(mml, 'angle upper B upper E upper F', 'brief');
  this.executeRuleTest(mml, 'angle upper B upper E upper F', 'sbrief');
};


/**
 * Testing Sample 31
 */
sre.NobleEnglishTest.prototype.testSample_31 = function() {
  var mml = '<mrow>' +
      '<mo>&#x2220;</mo><mi>B</mi><mi>E</mi><mi>D</mi>' +
      '</mrow>';
  this.executeRuleTest(mml, 'angle upper B upper E upper D', 'default');
  this.executeRuleTest(mml, 'angle upper B upper E upper D', 'brief');
  this.executeRuleTest(mml, 'angle upper B upper E upper D', 'sbrief');
};


/**
 * Testing Sample 32
 */
sre.NobleEnglishTest.prototype.testSample_32 = function() {
  var mml = '<mrow>' +
      '<mo>&#x2220;</mo><mi>D</mi><mi>E</mi><mi>F</mi>' +
      '</mrow>';
  this.executeRuleTest(mml, 'angle upper D upper E upper F', 'default');
  this.executeRuleTest(mml, 'angle upper D upper E upper F', 'brief');
  this.executeRuleTest(mml, 'angle upper D upper E upper F', 'sbrief');
};


/**
 * Testing Sample 33
 */
sre.NobleEnglishTest.prototype.testSample_33 = function() {
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
  this.executeRuleTest(mml, 'x equals StartFraction negative b' +
                       ' plus-or-minus StartRoot b squared minus 4 a c' +
                       ' EndRoot Over 2 a EndFraction', 'default');
  this.executeRuleTest(mml, 'x equals StartFrac negative b plus-or-minus' +
                       ' StartRoot b squared minus 4 a c EndRoot Over 2 a' +
                       ' EndFrac', 'brief');
  this.executeRuleTest(mml, 'x equals Frac negative b plus-or-minus Root b' +
                       ' squared minus 4 a c EndRoot Over 2 a EndFrac',
                       'sbrief');
};


/**
 * Testing Sample 34
 */
sre.NobleEnglishTest.prototype.testSample_34 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><msup><mrow><mi>x</mi></mrow><mrow>' +
      '<mn>2</mn></mrow></msup><mo>+</mo><mn>8</mn><mi>x</mi><mo>+</mo>' +
      '<mn>16</mn></mrow>';
  this.executeRuleTest(mml, 'y equals x squared plus 8 x plus 16', 'default');
  this.executeRuleTest(mml, 'y equals x squared plus 8 x plus 16', 'brief');
  this.executeRuleTest(mml, 'y equals x squared plus 8 x plus 16', 'sbrief');
};


/**
 * Testing Sample 35
 */
sre.NobleEnglishTest.prototype.testSample_35 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><mfrac><mrow><mn>1</mn></mrow><mrow>' +
      '<mn>3</mn></mrow></mfrac><mrow><mo>(</mo><msup><mrow><mn>3</mn>' +
      '</mrow><mrow><mi>x</mi></mrow></msup><mo>)</mo></mrow></mrow>';
  this.executeRuleTest(mml, 'y equals one third left-parenthesis 3' +
                       ' Superscript x Baseline right-parenthesis', 'default');
  this.executeRuleTest(mml, 'y equals one third left-p\'ren 3 Sup x Base' +
                       ' right-p\'ren', 'brief');
  this.executeRuleTest(mml, 'y equals one third L p\'ren 3 Sup x Base R' +
                       ' p\'ren', 'sbrief');
};


/**
 * Testing Sample 36
 */
sre.NobleEnglishTest.prototype.testSample_36 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><mn>10</mn><mo>−</mo><mn>2</mn><mi>x' +
      '</mi></mrow>';
  this.executeRuleTest(mml, 'y equals 10 minus 2 x', 'default');
  this.executeRuleTest(mml, 'y equals 10 minus 2 x', 'brief');
  this.executeRuleTest(mml, 'y equals 10 minus 2 x', 'sbrief');
};


/**
 * Testing Sample 37
 */
sre.NobleEnglishTest.prototype.testSample_37 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><mn>2</mn><msup><mrow><mi>x</mi>' +
      '</mrow><mrow><mn>3</mn></mrow></msup><mo>+</mo><mn>5</mn></mrow>';
  this.executeRuleTest(mml, 'y equals 2 x cubed plus 5', 'default');
  this.executeRuleTest(mml, 'y equals 2 x cubed plus 5', 'brief');
  this.executeRuleTest(mml, 'y equals 2 x cubed plus 5', 'sbrief');
};


/**
 * Testing Sample 38
 */
sre.NobleEnglishTest.prototype.testSample_38 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><mo>(</mo><msup><mrow><mo/><mi>x' +
      '</mi></mrow><mrow><mn>2</mn></mrow></msup><mo>+</mo><mn>1</mn>' +
      '<mrow><mo>)</mo><mo>(</mo><msup><mrow><mi>x</mi></mrow><mrow><mn>2' +
      '</mn></mrow></msup></mrow><mo>+</mo><mn>3</mn><mo>)</mo></mrow>';
  this.executeRuleTest(mml, 'y equals left-parenthesis x squared plus 1' +
                       ' right-parenthesis left-parenthesis x squared plus' +
                       ' 3 right-parenthesis', 'default');
  this.executeRuleTest(mml, 'y equals left-p\'ren x squared plus 1' +
                       ' right-p\'ren left-p\'ren x squared plus 3' +
                       ' right-p\'ren', 'brief');
  this.executeRuleTest(mml, 'y equals L p\'ren x squared plus 1 R p\'ren L' +
                       ' p\'ren x squared plus 3 R p\'ren', 'sbrief');
};


/**
 * Testing Sample 39
 */
sre.NobleEnglishTest.prototype.testSample_39 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><msup><mrow><mn>0.5</mn></mrow>' +
      '<mrow><mi>x</mi></mrow></msup></mrow>';
  this.executeRuleTest(mml, 'y equals 0.5 Superscript x', 'default');
  this.executeRuleTest(mml, 'y equals 0.5 Sup x', 'brief');
  this.executeRuleTest(mml, 'y equals 0.5 Sup x', 'sbrief');
};


/**
 * Testing Sample 40
 */
sre.NobleEnglishTest.prototype.testSample_40 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><mn>22</mn><mo>−</mo><mn>2</mn><mi>x' +
      '</mi></mrow>';
  this.executeRuleTest(mml, 'y equals 22 minus 2 x', 'default');
  this.executeRuleTest(mml, 'y equals 22 minus 2 x', 'brief');
  this.executeRuleTest(mml, 'y equals 22 minus 2 x', 'sbrief');
};


/**
 * Testing Sample 41
 */
sre.NobleEnglishTest.prototype.testSample_41 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><mfrac><mrow><mn>3</mn></mrow><mrow>' +
      '<mi>x</mi></mrow></mfrac></mrow>';
  this.executeRuleTest(mml, 'y equals StartFraction 3 Over x EndFraction',
                       'default');
  this.executeRuleTest(mml, 'y equals StartFrac 3 Over x EndFrac', 'brief');
  this.executeRuleTest(mml, 'y equals Frac 3 Over x EndFrac', 'sbrief');
};


/**
 * Testing Sample 42
 */
sre.NobleEnglishTest.prototype.testSample_42 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><mo>(</mo><mi>x</mi><mo>+</mo><mn>4' +
      '</mn><mo>)</mo><mo>(</mo><mi>x</mi><mo>+</mo><mn>4</mn><mo>)</mo>' +
      '</mrow>';
  this.executeRuleTest(mml, 'y equals left-parenthesis x plus 4' +
                       ' right-parenthesis left-parenthesis x plus 4' +
                       ' right-parenthesis', 'default');
  this.executeRuleTest(mml, 'y equals left-p\'ren x plus 4 right-p\'ren' +
                       ' left-p\'ren x plus 4 right-p\'ren', 'brief');
  this.executeRuleTest(mml, 'y equals L p\'ren x plus 4 R p\'ren L p\'ren x' +
                       ' plus 4 R p\'ren', 'sbrief');
};


/**
 * Testing Sample 43
 */
sre.NobleEnglishTest.prototype.testSample_43 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><mo>(</mo><mn>4</mn><mi>x</mi><mo>−' +
      '</mo><mn>3</mn><mo>)</mo><mo>(</mo><mi>x</mi><mo>+</mo><mn>1</mn>' +
      '<mo>)</mo></mrow>';
  this.executeRuleTest(mml, 'y equals left-parenthesis 4 x minus 3' +
                       ' right-parenthesis left-parenthesis x plus 1' +
                       ' right-parenthesis', 'default');
  this.executeRuleTest(mml, 'y equals left-p\'ren 4 x minus 3 right-p\'ren' +
                       ' left-p\'ren x plus 1 right-p\'ren', 'brief');
  this.executeRuleTest(mml, 'y equals L p\'ren 4 x minus 3 R p\'ren L' +
                       ' p\'ren x plus 1 R p\'ren', 'sbrief');
};


/**
 * Testing Sample 44
 */
sre.NobleEnglishTest.prototype.testSample_44 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><mn>20</mn><mi>x</mi><mo>−</mo><mn>4' +
      '</mn><msup><mrow><mi>x</mi></mrow><mrow><mn>2</mn></mrow></msup>' +
      '</mrow>';
  this.executeRuleTest(mml, 'y equals 20 x minus 4 x squared', 'default');
  this.executeRuleTest(mml, 'y equals 20 x minus 4 x squared', 'brief');
  this.executeRuleTest(mml, 'y equals 20 x minus 4 x squared', 'sbrief');
};


/**
 * Testing Sample 45
 */
sre.NobleEnglishTest.prototype.testSample_45 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><msup><mrow><mi>x</mi></mrow><mrow>' +
      '<mn>2</mn></mrow></msup></mrow>';
  this.executeRuleTest(mml, 'y equals x squared', 'default');
  this.executeRuleTest(mml, 'y equals x squared', 'brief');
  this.executeRuleTest(mml, 'y equals x squared', 'sbrief');
};


/**
 * Testing Sample 46
 */
sre.NobleEnglishTest.prototype.testSample_46 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><msup><mrow><mn>3</mn></mrow><mrow>' +
      '<mi>x</mi><mo>−</mo><mn>1</mn></mrow></msup></mrow>';
  this.executeRuleTest(mml, 'y equals 3 Superscript x minus 1', 'default');
  this.executeRuleTest(mml, 'y equals 3 Sup x minus 1', 'brief');
  this.executeRuleTest(mml, 'y equals 3 Sup x minus 1', 'sbrief');
};


/**
 * Testing Sample 47
 */
sre.NobleEnglishTest.prototype.testSample_47 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><mn>16</mn><mo>−</mo><mn>2</mn><mo>(' +
      '</mo><mi>x</mi><mo>+</mo><mn>3</mn><mo>)</mo></mrow>';
  this.executeRuleTest(mml, 'y equals 16 minus 2 left-parenthesis x plus 3' +
                       ' right-parenthesis', 'default');
  this.executeRuleTest(mml, 'y equals 16 minus 2 left-p\'ren x plus 3' +
                       ' right-p\'ren', 'brief');
  this.executeRuleTest(mml, 'y equals 16 minus 2 L p\'ren x plus 3 R' +
                       ' p\'ren', 'sbrief');
};


/**
 * Testing Sample 48
 */
sre.NobleEnglishTest.prototype.testSample_48 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><mn>4</mn><msup><mrow><mi>x</mi>' +
      '</mrow><mrow><mn>2</mn></mrow></msup><mo>−</mo><mi>x</mi><mo>−' +
      '</mo><mn>3</mn></mrow>';
  this.executeRuleTest(mml, 'y equals 4 x squared minus x minus 3', 'default');
  this.executeRuleTest(mml, 'y equals 4 x squared minus x minus 3', 'brief');
  this.executeRuleTest(mml, 'y equals 4 x squared minus x minus 3', 'sbrief');
};


/**
 * Testing Sample 49
 */
sre.NobleEnglishTest.prototype.testSample_49 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><mi>x</mi><mo>+</mo><mfrac><mrow>' +
      '<mn>1</mn></mrow><mrow><mi>x</mi></mrow></mfrac></mrow>';
  this.executeRuleTest(mml, 'y equals x plus StartFraction 1 Over x' +
                       ' EndFraction', 'default');
  this.executeRuleTest(mml, 'y equals x plus StartFrac 1 Over x EndFrac',
                       'brief');
  this.executeRuleTest(mml, 'y equals x plus Frac 1 Over x EndFrac', 'sbrief');
};


/**
 * Testing Sample 50
 */
sre.NobleEnglishTest.prototype.testSample_50 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><mn>4</mn><mi>x</mi><mo>(</mo><mn>5' +
      '</mn><mo>−</mo><mi>x</mi><mo>)</mo></mrow>';
  this.executeRuleTest(mml, 'y equals 4 x left-parenthesis 5 minus x' +
                       ' right-parenthesis', 'default');
  this.executeRuleTest(mml, 'y equals 4 x left-p\'ren 5 minus x' +
                       ' right-p\'ren', 'brief');
  this.executeRuleTest(mml, 'y equals 4 x L p\'ren 5 minus x R p\'ren',
                       'sbrief');
};


/**
 * Testing Sample 51
 */
sre.NobleEnglishTest.prototype.testSample_51 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><mn>2</mn><mo>(</mo><mi>x</mi><mo>−' +
      '</mo><mn>3</mn><mo>)</mo><mo>+</mo><mn>6</mn><mo>(</mo><mn>1</mn>' +
      '<mo>−</mo><mi>x</mi><mo>)</mo></mrow>';
  this.executeRuleTest(mml, 'y equals 2 left-parenthesis x minus 3' +
                       ' right-parenthesis plus 6 left-parenthesis 1 minus' +
                       ' x right-parenthesis', 'default');
  this.executeRuleTest(mml, 'y equals 2 left-p\'ren x minus 3 right-p\'ren' +
                       ' plus 6 left-p\'ren 1 minus x right-p\'ren', 'brief');
  this.executeRuleTest(mml, 'y equals 2 L p\'ren x minus 3 R p\'ren plus 6' +
                       ' L p\'ren 1 minus x R p\'ren', 'sbrief');
};


/**
 * Testing Sample 52
 */
sre.NobleEnglishTest.prototype.testSample_52 = function() {
  var mml = '<mrow>' +
      '<mn>0.25</mn><mo>&#x003E;</mo><mfrac>' +
      '<mn>5</mn>' +
      '<mrow>' +
      '<mn>16</mn>' +
      '</mrow>' +
      '</mfrac>    ' +
      '</mrow>';
  this.executeRuleTest(mml, '0.25 greater-than five sixteenths', 'default');
  this.executeRuleTest(mml, '0.25 greater-than five sixteenths', 'brief');
  this.executeRuleTest(mml, '0.25 greater-than five sixteenths', 'sbrief');
};


/**
 * Testing Sample 53
 */
sre.NobleEnglishTest.prototype.testSample_53 = function() {
  var mml = '<mrow>' +
      '<mn>32</mn><mo>&#x22C5;</mo><mrow><mo>(</mo>' +
      '<mrow>' +
      '<mn>5</mn><mo>&#x22C5;</mo><mn>7</mn>' +
      '</mrow>' +
      '<mo>)</mo></mrow>' +
      '</mrow>';
  this.executeRuleTest(mml, '32 dot left-parenthesis 5 dot 7' +
                       ' right-parenthesis', 'default');
  this.executeRuleTest(mml, '32 dot left-p\'ren 5 dot 7 right-p\'ren', 'brief');
  this.executeRuleTest(mml, '32 dot L p\'ren 5 dot 7 R p\'ren', 'sbrief');
};


/**
 * Testing Sample 54
 */
sre.NobleEnglishTest.prototype.testSample_54 = function() {
  var mml = '<mrow><mrow><mo>(</mo><mfrac><mrow><mn>1</mn></mrow><mrow>' +
      '<mn>2</mn></mrow></mfrac><mo>×</mo><mfrac><mrow><mn>1</mn></mrow>' +
      '<mrow><mn>2</mn></mrow></mfrac><mo>×</mo><mi>π</mi><mo>×</mo><mn>2' +
      '</mn><mo>)</mo></mrow><mo>+</mo><mrow><mo>(</mo><mn>2</mn><mo>×' +
      '</mo><mfrac><mrow><mn>1</mn></mrow><mrow><mn>2</mn></mrow></mfrac>' +
      '<mo>×</mo><mi>π</mi><mo>×</mo><mn>5</mn><mo>)</mo></mrow></mrow>';
  this.executeRuleTest(mml, 'left-parenthesis one half times one half times' +
                       ' pi times 2 right-parenthesis plus left-parenthesis' +
                       ' 2 times one half times pi times 5' +
                       ' right-parenthesis', 'default');
  this.executeRuleTest(mml, 'left-p\'ren one half times one half times pi' +
                       ' times 2 right-p\'ren plus left-p\'ren 2 times' +
                       ' one half times pi times 5 right-p\'ren', 'brief');
  this.executeRuleTest(mml, 'L p\'ren one half times one half times pi' +
                       ' times 2 R p\'ren plus L p\'ren 2 times one half' +
                       ' times pi times 5 R p\'ren', 'sbrief');
};


/**
 * Testing Sample 55
 */
sre.NobleEnglishTest.prototype.testSample_55 = function() {
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
  this.executeRuleTest(mml, 'liminf Underscript n right-arrow infinity' +
                       ' Endscripts upper E Subscript n Baseline equals' +
                       ' union Underscript n greater-than-or-equal-to 1' +
                       ' Endscripts intersection Underscript k' +
                       ' greater-than-or-equal-to n Endscripts upper E' +
                       ' Subscript k Baseline comma limsup Underscript n' +
                       ' right-arrow infinity Endscripts upper E Subscript' +
                       ' n Baseline equals intersection Underscript n' +
                       ' greater-than-or-equal-to 1 Endscripts union' +
                       ' Underscript k greater-than-or-equal-to n' +
                       ' Endscripts upper E Subscript k Baseline period',
                       'default');
  this.executeRuleTest(mml, 'liminf Underscript n right-arrow infinity' +
                       ' Endscripts upper E Sub n Base equals union' +
                       ' Underscript n greater-than-or-equal-to 1' +
                       ' Endscripts intersection Underscript k' +
                       ' greater-than-or-equal-to n Endscripts upper E Sub' +
                       ' k Base comma limsup Underscript n right-arrow' +
                       ' infinity Endscripts upper E Sub n Base equals' +
                       ' intersection Underscript n' +
                       ' greater-than-or-equal-to 1 Endscripts union' +
                       ' Underscript k greater-than-or-equal-to n' +
                       ' Endscripts upper E Sub k Base period', 'brief');
  this.executeRuleTest(mml, 'liminf Underscript n R arrow infinity' +
                       ' Endscripts upper E Sub n Base equals union' +
                       ' Underscript n greater-than-or-equal-to 1' +
                       ' Endscripts intersection Underscript k' +
                       ' greater-than-or-equal-to n Endscripts upper E Sub' +
                       ' k Base comma limsup Underscript n R arrow infinity' +
                       ' Endscripts upper E Sub n Base equals intersection' +
                       ' Underscript n greater-than-or-equal-to 1' +
                       ' Endscripts union Underscript k' +
                       ' greater-than-or-equal-to n Endscripts upper E Sub' +
                       ' k Base period', 'sbrief');
};


/**
 * Testing Sample 56
 */
sre.NobleEnglishTest.prototype.testSample_56 = function() {
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
  this.executeRuleTest(mml, 'StartLayout 1st Row 1st Column' +
                       ' left-parenthesis i right-parenthesis 2nd Column' +
                       ' script upper S element-of script upper A semicolon' +
                       ' 2nd Row 1st Column left-parenthesis ii' +
                       ' right-parenthesis 2nd Column if upper E element-of' +
                       ' script upper A then upper E overbar element-of' +
                       ' script upper A semicolon 3rd Row 1st Column' +
                       ' left-parenthesis iii right-parenthesis 2nd Column' +
                       ' if upper E 1 comma upper E 2 element-of script' +
                       ' upper A then upper E 1 union upper E 2 element-of' +
                       ' script upper A period EndLayout', 'default');
  this.executeRuleTest(mml, 'StartLayout 1st Row 1st Column left-p\'ren i' +
                       ' right-p\'ren 2nd Column script upper S element-of' +
                       ' script upper A semicolon 2nd Row 1st Column' +
                       ' left-p\'ren ii right-p\'ren 2nd Column if upper E' +
                       ' element-of script upper A then upper E overBar' +
                       ' element-of script upper A semicolon 3rd Row 1st' +
                       ' Column left-p\'ren iii right-p\'ren 2nd Column if' +
                       ' upper E 1 comma upper E 2 element-of script upper' +
                       ' A then upper E 1 union upper E 2 element-of script' +
                       ' upper A period EndLayout', 'brief');
  this.executeRuleTest(mml, 'Layout 1st Row 1st Column L p\'ren i R p\'ren' +
                       ' 2nd Column script upper S element-of script upper' +
                       ' A semicolon 2nd Row 1st Column L p\'ren ii R' +
                       ' p\'ren 2nd Column if upper E element-of script' +
                       ' upper A then upper E overBar element-of script' +
                       ' upper A semicolon 3rd Row 1st Column L p\'ren iii' +
                       ' R p\'ren 2nd Column if upper E 1 comma upper E 2' +
                       ' element-of script upper A then upper E 1 union' +
                       ' upper E 2 element-of script upper A period' +
                       ' EndLayout', 'sbrief');
};


/**
 * Testing Sample 57
 */
sre.NobleEnglishTest.prototype.testSample_57 = function() {
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
  this.executeRuleTest(mml, 'StartLayout 1st Row 1st Column Blank 2nd' +
                       ' Column Blank 3rd Column left-parenthesis normal' +
                       ' upper A period 1 right-parenthesis upper I f upper' +
                       ' A element-of script upper F t h e n 0' +
                       ' less-than-or-equal-to upper P left-brace upper A' +
                       ' right-brace less-than-or-equal-to 1 period 4th' +
                       ' Column left-parenthesis 1 right-parenthesis 2nd' +
                       ' Row 1st Column Blank 2nd Column Blank 3rd Column' +
                       ' left-parenthesis normal upper A period 2' +
                       ' right-parenthesis upper P left-brace script upper' +
                       ' S right-brace equals 1 period 4th Column' +
                       ' left-parenthesis 2 right-parenthesis 3rd Row 1st' +
                       ' Column Blank 2nd Column Blank 3rd Column' +
                       ' left-parenthesis normal upper A period 3' +
                       ' right-parenthesis upper I f left-brace upper E' +
                       ' Subscript n Baseline comma n' +
                       ' greater-than-or-equal-to 1 right-brace element-of' +
                       ' script upper F is a sequence of disjoint 4th' +
                       ' Column left-parenthesis 3 right-parenthesis' +
                       ' EndLayout', 'default');
  this.executeRuleTest(mml, 'StartLayout 1st Row 1st Column Blank 2nd' +
                       ' Column Blank 3rd Column left-p\'ren normal upper A' +
                       ' period 1 right-p\'ren upper I f upper A element-of' +
                       ' script upper F t h e n 0 less-than-or-equal-to' +
                       ' upper P left-brace upper A right-brace' +
                       ' less-than-or-equal-to 1 period 4th Column' +
                       ' left-p\'ren 1 right-p\'ren 2nd Row 1st Column' +
                       ' Blank 2nd Column Blank 3rd Column left-p\'ren' +
                       ' normal upper A period 2 right-p\'ren upper P' +
                       ' left-brace script upper S right-brace equals 1' +
                       ' period 4th Column left-p\'ren 2 right-p\'ren 3rd' +
                       ' Row 1st Column Blank 2nd Column Blank 3rd Column' +
                       ' left-p\'ren normal upper A period 3 right-p\'ren' +
                       ' upper I f left-brace upper E Sub n Base comma n' +
                       ' greater-than-or-equal-to 1 right-brace element-of' +
                       ' script upper F is a sequence of disjoint 4th' +
                       ' Column left-p\'ren 3 right-p\'ren EndLayout', 'brief');
  this.executeRuleTest(mml, 'Layout 1st Row 1st Column Blank 2nd Column' +
                       ' Blank 3rd Column L p\'ren normal upper A period 1' +
                       ' R p\'ren upper I f upper A element-of script upper' +
                       ' F t h e n 0 less-than-or-equal-to upper P L brace' +
                       ' upper A R brace less-than-or-equal-to 1 period 4th' +
                       ' Column L p\'ren 1 R p\'ren 2nd Row 1st Column' +
                       ' Blank 2nd Column Blank 3rd Column L p\'ren normal' +
                       ' upper A period 2 R p\'ren upper P L brace script' +
                       ' upper S R brace equals 1 period 4th Column L' +
                       ' p\'ren 2 R p\'ren 3rd Row 1st Column Blank 2nd' +
                       ' Column Blank 3rd Column L p\'ren normal upper A' +
                       ' period 3 R p\'ren upper I f L brace upper E Sub n' +
                       ' Base comma n greater-than-or-equal-to 1 R brace' +
                       ' element-of script upper F is a sequence of' +
                       ' disjoint 4th Column L p\'ren 3 R p\'ren' +
                       ' EndLayout', 'sbrief');
};


/**
 * Testing Sample 58
 */
sre.NobleEnglishTest.prototype.testSample_58 = function() {
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
  this.executeRuleTest(mml, 'upper P left-brace upper B Subscript j' +
                       ' Baseline vertical-bar upper A right-brace equals' +
                       ' StartFraction upper P left-brace upper B Subscript' +
                       ' j Baseline right-brace upper P left-brace upper A' +
                       ' vertical-bar upper B Subscript j Baseline' +
                       ' right-brace Over sigma-summation Underscript j' +
                       ' prime element-of upper J Endscripts upper P' +
                       ' left-brace upper B Subscript j prime Baseline' +
                       ' right-brace upper P left-brace upper A' +
                       ' vertical-bar upper B Subscript j prime Baseline' +
                       ' right-brace EndFraction period', 'default');
  this.executeRuleTest(mml, 'upper P left-brace upper B Sub j Base' +
                       ' vertical-bar upper A right-brace equals StartFrac' +
                       ' upper P left-brace upper B Sub j Base right-brace' +
                       ' upper P left-brace upper A vertical-bar upper B' +
                       ' Sub j Base right-brace Over sigma-summation' +
                       ' Underscript j prime element-of upper J Endscripts' +
                       ' upper P left-brace upper B Sub j prime Base' +
                       ' right-brace upper P left-brace upper A' +
                       ' vertical-bar upper B Sub j prime Base right-brace' +
                       ' EndFrac period', 'brief');
  this.executeRuleTest(mml, 'upper P L brace upper B Sub j Base' +
                       ' vertical-bar upper A R brace equals Frac upper P L' +
                       ' brace upper B Sub j Base R brace upper P L brace' +
                       ' upper A vertical-bar upper B Sub j Base R brace' +
                       ' Over sigma-summation Underscript j prime' +
                       ' element-of upper J Endscripts upper P L brace' +
                       ' upper B Sub j prime Base R brace upper P L brace' +
                       ' upper A vertical-bar upper B Sub j prime Base R' +
                       ' brace EndFrac period', 'sbrief');
};


/**
 * Testing Sample 59
 */
sre.NobleEnglishTest.prototype.testSample_59 = function() {
  var mml = '<mrow><msub><mi>&#x03BC;</mi><mrow><mn>1</mn></mrow></msub><mo' +
      ' stretchy="false">(</mo><mi>B</mi><mo stretchy="false">)</mo><mo>=' +
      '</mo><msub><mo>&#x222B;</mo><mrow><mi>B</mi></mrow></msub><mi>f' +
      '</mi><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)' +
      '</mo><mi>d</mi><msub><mi>&#x03BC;</mi><mrow><mn>2</mn></mrow>' +
      '</msub><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)' +
      '</mo></mrow>';
  this.executeRuleTest(mml, 'mu 1 left-parenthesis upper B' +
                       ' right-parenthesis equals integral Underscript' +
                       ' upper B Endscripts f left-parenthesis x' +
                       ' right-parenthesis d mu 2 left-parenthesis x' +
                       ' right-parenthesis', 'default');
  this.executeRuleTest(mml, 'mu 1 left-p\'ren upper B right-p\'ren equals' +
                       ' integral Underscript upper B Endscripts f' +
                       ' left-p\'ren x right-p\'ren d mu 2 left-p\'ren x' +
                       ' right-p\'ren', 'brief');
  this.executeRuleTest(mml, 'mu 1 L p\'ren upper B R p\'ren equals integral' +
                       ' Underscript upper B Endscripts f L p\'ren x R' +
                       ' p\'ren d mu 2 L p\'ren x R p\'ren', 'sbrief');
};


/**
 * Testing Sample 60
 */
sre.NobleEnglishTest.prototype.testSample_60 = function() {
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
  this.executeRuleTest(mml, 'limit Underscript n right-arrow infinity' +
                       ' Endscripts upper E left-brace StartAbsoluteValue' +
                       ' upper X Subscript n Baseline minus upper X' +
                       ' EndAbsoluteValue right-brace equals upper E' +
                       ' left-brace limit Underscript n right-arrow' +
                       ' infinity Endscripts StartAbsoluteValue upper X' +
                       ' Subscript n Baseline minus upper X' +
                       ' EndAbsoluteValue right-brace equals 0 period',
                       'default');
  this.executeRuleTest(mml, 'limit Underscript n right-arrow infinity' +
                       ' Endscripts upper E left-brace StartAbsoluteValue' +
                       ' upper X Sub n Base minus upper X EndAbsoluteValue' +
                       ' right-brace equals upper E left-brace limit' +
                       ' Underscript n right-arrow infinity Endscripts' +
                       ' StartAbsoluteValue upper X Sub n Base minus upper' +
                       ' X EndAbsoluteValue right-brace equals 0 period',
                       'brief');
  this.executeRuleTest(mml, 'limit Underscript n R arrow infinity' +
                       ' Endscripts upper E L brace AbsoluteValue upper X' +
                       ' Sub n Base minus upper X EndAbsoluteValue R brace' +
                       ' equals upper E L brace limit Underscript n R arrow' +
                       ' infinity Endscripts AbsoluteValue upper X Sub n' +
                       ' Base minus upper X EndAbsoluteValue R brace equals' +
                       ' 0 period', 'sbrief');
};


/**
 * Testing Sample 61
 */
sre.NobleEnglishTest.prototype.testSample_61 = function() {
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
  this.executeRuleTest(mml, 'StartLayout 1st Row 1st Column upper P' +
                       ' Subscript mu comma sigma Baseline left-brace upper' +
                       ' Y greater-than-or-equal-to l Subscript beta' +
                       ' Baseline left-parenthesis upper Y overbar' +
                       ' Subscript n Baseline comma upper S Subscript n' +
                       ' Baseline right-parenthesis right-brace equals' +
                       ' upper P Subscript mu comma sigma Baseline' +
                       ' left-brace left-parenthesis upper Y minus upper Y' +
                       ' overbar Subscript n Baseline right-parenthesis' +
                       ' slash left-parenthesis upper S dot' +
                       ' left-parenthesis 1 plus StartFraction 1 Over n' +
                       ' EndFraction right-parenthesis Superscript 1 slash' +
                       ' 2 Baseline right-parenthesis' +
                       ' greater-than-or-equal-to minus t Subscript beta' +
                       ' Baseline left-bracket n minus 1 right-bracket' +
                       ' right-brace equals beta comma 2nd Row 1st Column' +
                       ' Blank 2nd Column left-parenthesis 1' +
                       ' right-parenthesis EndLayout', 'default');
  this.executeRuleTest(mml, 'StartLayout 1st Row 1st Column upper P Sub mu' +
                       ' comma sigma Base left-brace upper Y' +
                       ' greater-than-or-equal-to l Sub beta Base' +
                       ' left-p\'ren upper Y overBar Sub n Base comma upper' +
                       ' S Sub n Base right-p\'ren right-brace equals upper' +
                       ' P Sub mu comma sigma Base left-brace left-p\'ren' +
                       ' upper Y minus upper Y overBar Sub n Base' +
                       ' right-p\'ren slash left-p\'ren upper S dot' +
                       ' left-p\'ren 1 plus StartFrac 1 Over n EndFrac' +
                       ' right-p\'ren Sup 1 slash 2 Base right-p\'ren' +
                       ' greater-than-or-equal-to minus t Sub beta Base' +
                       ' left-brack n minus 1 right-brack right-brace' +
                       ' equals beta comma 2nd Row 1st Column Blank 2nd' +
                       ' Column left-p\'ren 1 right-p\'ren EndLayout', 'brief');
  this.executeRuleTest(mml, 'Layout 1st Row 1st Column upper P Sub mu comma' +
                       ' sigma Base L brace upper Y' +
                       ' greater-than-or-equal-to l Sub beta Base L p\'ren' +
                       ' upper Y overBar Sub n Base comma upper S Sub n' +
                       ' Base R p\'ren R brace equals upper P Sub mu comma' +
                       ' sigma Base L brace L p\'ren upper Y minus upper Y' +
                       ' overBar Sub n Base R p\'ren slash L p\'ren upper S' +
                       ' dot L p\'ren 1 plus Frac 1 Over n EndFrac R p\'ren' +
                       ' Sup 1 slash 2 Base R p\'ren' +
                       ' greater-than-or-equal-to minus t Sub beta Base L' +
                       ' brack n minus 1 R brack R brace equals beta comma' +
                       ' 2nd Row 1st Column Blank 2nd Column L p\'ren 1 R' +
                       ' p\'ren EndLayout', 'sbrief');
};


/**
 * Testing Sample 62
 */
sre.NobleEnglishTest.prototype.testSample_62 = function() {
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
  this.executeRuleTest(mml, 'upper L equals Start 5 By 6 Matrix 1st Row 1st' +
                       ' Column 1 2nd Column negative 1 3rd Column Blank' +
                       ' 4th Column Blank 5th Column Blank 6th Column Blank' +
                       ' 2nd Row 1st Column Blank 2nd Column 1 3rd Column' +
                       ' negative 1 4th Column Blank 5th Column 0 6th' +
                       ' Column Blank 3rd Row 1st Column Blank 2nd Column' +
                       ' Blank 3rd Column Blank 4th Column Blank 5th Column' +
                       ' Blank 6th Column Blank 4th Row 1st Column Blank' +
                       ' 2nd Column 0 3rd Column Blank 4th Column Blank 5th' +
                       ' Column Blank 6th Column Blank 5th Row 1st Column' +
                       ' Blank 2nd Column Blank 3rd Column Blank 4th Column' +
                       ' Blank 5th Column 1 6th Column negative 1 EndMatrix' +
                       ' period', 'default');
  this.executeRuleTest(mml, 'upper L equals Start 5 By 6 Matrix 1st Row 1st' +
                       ' Column 1 2nd Column negative 1 3rd Column Blank' +
                       ' 4th Column Blank 5th Column Blank 6th Column Blank' +
                       ' 2nd Row 1st Column Blank 2nd Column 1 3rd Column' +
                       ' negative 1 4th Column Blank 5th Column 0 6th' +
                       ' Column Blank 3rd Row 1st Column Blank 2nd Column' +
                       ' Blank 3rd Column Blank 4th Column Blank 5th Column' +
                       ' Blank 6th Column Blank 4th Row 1st Column Blank' +
                       ' 2nd Column 0 3rd Column Blank 4th Column Blank 5th' +
                       ' Column Blank 6th Column Blank 5th Row 1st Column' +
                       ' Blank 2nd Column Blank 3rd Column Blank 4th Column' +
                       ' Blank 5th Column 1 6th Column negative 1 EndMatrix' +
                       ' period', 'brief');
  this.executeRuleTest(mml, 'upper L equals 5 By 6 Matrix 1st Row 1st' +
                       ' Column 1 2nd Column negative 1 3rd Column Blank' +
                       ' 4th Column Blank 5th Column Blank 6th Column Blank' +
                       ' 2nd Row 1st Column Blank 2nd Column 1 3rd Column' +
                       ' negative 1 4th Column Blank 5th Column 0 6th' +
                       ' Column Blank 3rd Row 1st Column Blank 2nd Column' +
                       ' Blank 3rd Column Blank 4th Column Blank 5th Column' +
                       ' Blank 6th Column Blank 4th Row 1st Column Blank' +
                       ' 2nd Column 0 3rd Column Blank 4th Column Blank 5th' +
                       ' Column Blank 6th Column Blank 5th Row 1st Column' +
                       ' Blank 2nd Column Blank 3rd Column Blank 4th Column' +
                       ' Blank 5th Column 1 6th Column negative 1 EndMatrix' +
                       ' period', 'sbrief');
};


/**
 * Testing Sample 63
 */
sre.NobleEnglishTest.prototype.testSample_63 = function() {
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
  this.executeRuleTest(mml, 'StartRoot n EndRoot left-bracket upper Y' +
                       ' overbar Subscript n Baseline minus' +
                       ' left-parenthesis mu plus z Subscript beta Baseline' +
                       ' sigma right-parenthesis right-bracket slash upper' +
                       ' S Subscript n Baseline tilde StartFraction upper U' +
                       ' plus StartRoot n EndRoot z Subscript 1 minus beta' +
                       ' Baseline Over left-parenthesis chi squared' +
                       ' left-bracket n minus 1 right-bracket slash' +
                       ' left-parenthesis n minus 1 right-parenthesis' +
                       ' right-parenthesis Superscript 1 slash 2 Baseline' +
                       ' EndFraction tilde t left-bracket n minus 1' +
                       ' semicolon StartRoot n EndRoot z Subscript 1 minus' +
                       ' beta Baseline right-bracket comma', 'default');
  this.executeRuleTest(mml, 'StartRoot n EndRoot left-brack upper Y overBar' +
                       ' Sub n Base minus left-p\'ren mu plus z Sub beta' +
                       ' Base sigma right-p\'ren right-brack slash upper S' +
                       ' Sub n Base tilde StartFrac upper U plus StartRoot' +
                       ' n EndRoot z Sub 1 minus beta Base Over left-p\'ren' +
                       ' chi squared left-brack n minus 1 right-brack slash' +
                       ' left-p\'ren n minus 1 right-p\'ren right-p\'ren' +
                       ' Sup 1 slash 2 Base EndFrac tilde t left-brack n' +
                       ' minus 1 semicolon StartRoot n EndRoot z Sub 1' +
                       ' minus beta Base right-brack comma', 'brief');
  this.executeRuleTest(mml, 'Root n EndRoot L brack upper Y overBar Sub n' +
                       ' Base minus L p\'ren mu plus z Sub beta Base sigma' +
                       ' R p\'ren R brack slash upper S Sub n Base tilde' +
                       ' Frac upper U plus Root n EndRoot z Sub 1 minus' +
                       ' beta Base Over L p\'ren chi squared L brack n' +
                       ' minus 1 R brack slash L p\'ren n minus 1 R p\'ren' +
                       ' R p\'ren Sup 1 slash 2 Base EndFrac tilde t L' +
                       ' brack n minus 1 semicolon Root n EndRoot z Sub 1' +
                       ' minus beta Base R brack comma', 'sbrief');
};


/**
 * Testing Sample 64
 */
sre.NobleEnglishTest.prototype.testSample_64 = function() {
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
  this.executeRuleTest(mml, 'StartLayout 1st Row 1st Column gamma 2nd' +
                       ' Column equals upper P left-brace upper E Subscript' +
                       ' p comma q Baseline subset-of left-parenthesis' +
                       ' upper X Subscript left-parenthesis r' +
                       ' right-parenthesis Baseline comma upper X Subscript' +
                       ' left-parenthesis s right-parenthesis Baseline' +
                       ' right-brace 2nd Row 1st Column Blank 2nd Column' +
                       ' equals StartFraction n factorial Over' +
                       ' left-parenthesis r minus 1 right-parenthesis' +
                       ' factorial EndFraction sigma-summation Underscript' +
                       ' j equals 0 Overscript s minus r minus 1 Endscripts' +
                       ' left-parenthesis negative 1 right-parenthesis' +
                       ' Superscript j Baseline StartFraction p Superscript' +
                       ' r plus j Baseline Over left-parenthesis n minus r' +
                       ' minus j right-parenthesis factorial j factorial' +
                       ' EndFraction upper I Subscript 1 minus q Baseline' +
                       ' left-parenthesis n minus s plus 1 comma s minus r' +
                       ' minus j right-parenthesis period EndLayout',
                       'default');
  this.executeRuleTest(mml, 'StartLayout 1st Row 1st Column gamma 2nd' +
                       ' Column equals upper P left-brace upper E Sub p' +
                       ' comma q Base subset-of left-p\'ren upper X Sub' +
                       ' left-p\'ren r right-p\'ren Base comma upper X Sub' +
                       ' left-p\'ren s right-p\'ren Base right-brace 2nd' +
                       ' Row 1st Column Blank 2nd Column equals StartFrac n' +
                       ' factorial Over left-p\'ren r minus 1 right-p\'ren' +
                       ' factorial EndFrac sigma-summation Underscript j' +
                       ' equals 0 Overscript s minus r minus 1 Endscripts' +
                       ' left-p\'ren negative 1 right-p\'ren Sup j Base' +
                       ' StartFrac p Sup r plus j Base Over left-p\'ren n' +
                       ' minus r minus j right-p\'ren factorial j factorial' +
                       ' EndFrac upper I Sub 1 minus q Base left-p\'ren n' +
                       ' minus s plus 1 comma s minus r minus j' +
                       ' right-p\'ren period EndLayout', 'brief');
  this.executeRuleTest(mml, 'Layout 1st Row 1st Column gamma 2nd Column' +
                       ' equals upper P L brace upper E Sub p comma q Base' +
                       ' subset-of L p\'ren upper X Sub L p\'ren r R p\'ren' +
                       ' Base comma upper X Sub L p\'ren s R p\'ren Base R' +
                       ' brace 2nd Row 1st Column Blank 2nd Column equals' +
                       ' Frac n factorial Over L p\'ren r minus 1 R p\'ren' +
                       ' factorial EndFrac sigma-summation Underscript j' +
                       ' equals 0 Overscript s minus r minus 1 Endscripts L' +
                       ' p\'ren negative 1 R p\'ren Sup j Base Frac p Sup r' +
                       ' plus j Base Over L p\'ren n minus r minus j R' +
                       ' p\'ren factorial j factorial EndFrac upper I Sub 1' +
                       ' minus q Base L p\'ren n minus s plus 1 comma s' +
                       ' minus r minus j R p\'ren period EndLayout', 'sbrief');
};


/**
 * Testing Sample 65
 */
sre.NobleEnglishTest.prototype.testSample_65 = function() {
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
  this.executeRuleTest(mml, 'upper S Subscript i Baseline' +
                       ' StartBinomialOrMatrix t Choose x' +
                       ' EndBinomialOrMatrix equals Start 2 By 2 Matrix 1st' +
                       ' Row 1st Column 1 slash m 2nd Column 0 2nd Row 1st' +
                       ' Column a Subscript i Baseline 2nd Column r' +
                       ' Subscript i Baseline EndMatrix' +
                       ' StartBinomialOrMatrix t Choose x' +
                       ' EndBinomialOrMatrix plus StartBinomialOrMatrix' +
                       ' left-parenthesis i minus 1 right-parenthesis slash' +
                       ' m Choose b Subscript i Baseline' +
                       ' EndBinomialOrMatrix comma', 'default');
  this.executeRuleTest(mml, 'upper S Sub i Base StartBinomialOrMatrix t' +
                       ' Choose x EndBinomialOrMatrix equals Start 2 By 2' +
                       ' Matrix 1st Row 1st Column 1 slash m 2nd Column 0' +
                       ' 2nd Row 1st Column a Sub i Base 2nd Column r Sub i' +
                       ' Base EndMatrix StartBinomialOrMatrix t Choose x' +
                       ' EndBinomialOrMatrix plus StartBinomialOrMatrix' +
                       ' left-p\'ren i minus 1 right-p\'ren slash m Choose' +
                       ' b Sub i Base EndBinomialOrMatrix comma', 'brief');
  this.executeRuleTest(mml, 'upper S Sub i Base BinomialOrMatrix t Choose x' +
                       ' EndBinomialOrMatrix equals 2 By 2 Matrix 1st Row' +
                       ' 1st Column 1 slash m 2nd Column 0 2nd Row 1st' +
                       ' Column a Sub i Base 2nd Column r Sub i Base' +
                       ' EndMatrix BinomialOrMatrix t Choose x' +
                       ' EndBinomialOrMatrix plus BinomialOrMatrix L p\'ren' +
                       ' i minus 1 R p\'ren slash m Choose b Sub i Base' +
                       ' EndBinomialOrMatrix comma', 'sbrief');
};


/**
 * Testing Sample 66
 */
sre.NobleEnglishTest.prototype.testSample_66 = function() {
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
  this.executeRuleTest(mml, 'c 1 h Superscript 4 minus 2 s Baseline' +
                       ' less-than-or-equal-to StartFraction 1 Over 2 upper' +
                       ' T EndFraction integral Subscript negative upper T' +
                       ' Superscript upper T Baseline left-parenthesis f' +
                       ' left-parenthesis t plus h right-parenthesis minus' +
                       ' f left-parenthesis t right-parenthesis' +
                       ' right-parenthesis squared normal d t' +
                       ' less-than-or-equal-to c 2 h Superscript 4 minus 2' +
                       ' s', 'default');
  this.executeRuleTest(mml, 'c 1 h Sup 4 minus 2 s Base' +
                       ' less-than-or-equal-to StartFrac 1 Over 2 upper T' +
                       ' EndFrac integral Sub negative upper T Sup upper T' +
                       ' Base left-p\'ren f left-p\'ren t plus h' +
                       ' right-p\'ren minus f left-p\'ren t right-p\'ren' +
                       ' right-p\'ren squared normal d t' +
                       ' less-than-or-equal-to c 2 h Sup 4 minus 2 s', 'brief');
  this.executeRuleTest(mml, 'c 1 h Sup 4 minus 2 s Base' +
                       ' less-than-or-equal-to Frac 1 Over 2 upper T' +
                       ' EndFrac integral Sub negative upper T Sup upper T' +
                       ' Base L p\'ren f L p\'ren t plus h R p\'ren minus f' +
                       ' L p\'ren t R p\'ren R p\'ren squared normal d t' +
                       ' less-than-or-equal-to c 2 h Sup 4 minus 2 s',
                       'sbrief');
};


/**
 * Testing Sample 67
 */
sre.NobleEnglishTest.prototype.testSample_67 = function() {
  var mml = '<mrow><mi>C</mi><mo stretchy="false">(</mo><mn>0</mn><mo' +
      ' stretchy="false">)</mo><mo>&#x2212;</mo><mi>C</mi><mo' +
      ' stretchy="false">(</mo><mi>h</mi><mo stretchy="false">)</mo>' +
      '<mo>&#x2243;</mo><mi>c</mi><msup><mrow><mi>h</mi></mrow><mrow>' +
      '<mn>4</mn><mo>&#x2212;</mo><mn>2</mn><mi>s</mi></mrow></msup></mrow>';
  this.executeRuleTest(mml, 'upper C left-parenthesis 0 right-parenthesis' +
                       ' minus upper C left-parenthesis h right-parenthesis' +
                       ' asymptotically-equals c h Superscript 4 minus 2' +
                       ' s', 'default');
  this.executeRuleTest(mml, 'upper C left-p\'ren 0 right-p\'ren minus upper' +
                       ' C left-p\'ren h right-p\'ren asymptotically-equals' +
                       ' c h Sup 4 minus 2 s', 'brief');
  this.executeRuleTest(mml, 'upper C L p\'ren 0 R p\'ren minus upper C L' +
                       ' p\'ren h R p\'ren asymptotically-equals c h Sup 4' +
                       ' minus 2 s', 'sbrief');
};


/**
 * Testing Sample 68
 */
sre.NobleEnglishTest.prototype.testSample_68 = function() {
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
  this.executeRuleTest(mml, 'upper S left-parenthesis omega' +
                       ' right-parenthesis equals limit Underscript upper T' +
                       ' right-arrow infinity Endscripts StartFraction 1' +
                       ' Over 2 upper T EndFraction StartAbsoluteValue' +
                       ' integral Subscript negative upper T Superscript' +
                       ' upper T Baseline comma f comma left-parenthesis' +
                       ' comma t comma right-parenthesis comma normal e' +
                       ' Superscript italic i t omega Baseline comma normal' +
                       ' d comma t EndAbsoluteValue squared period', 'default');
  this.executeRuleTest(mml, 'upper S left-p\'ren omega right-p\'ren equals' +
                       ' limit Underscript upper T right-arrow infinity' +
                       ' Endscripts StartFrac 1 Over 2 upper T EndFrac' +
                       ' StartAbsoluteValue integral Sub negative upper T' +
                       ' Sup upper T Base comma f comma left-p\'ren comma t' +
                       ' comma right-p\'ren comma normal e Sup italic i t' +
                       ' omega Base comma normal d comma t EndAbsoluteValue' +
                       ' squared period', 'brief');
  this.executeRuleTest(mml, 'upper S L p\'ren omega R p\'ren equals limit' +
                       ' Underscript upper T R arrow infinity Endscripts' +
                       ' Frac 1 Over 2 upper T EndFrac AbsoluteValue' +
                       ' integral Sub negative upper T Sup upper T Base' +
                       ' comma f comma L p\'ren comma t comma R p\'ren' +
                       ' comma normal e Sup italic i t omega Base comma' +
                       ' normal d comma t EndAbsoluteValue squared period',
                       'sbrief');
};


/**
 * Testing Sample 69
 */
sre.NobleEnglishTest.prototype.testSample_69 = function() {
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
  this.executeRuleTest(mml, 'integral Subscript 0 Superscript 1 Baseline' +
                       ' integral Subscript 0 Superscript 1 Baseline' +
                       ' left-bracket StartAbsoluteValue f left-parenthesis' +
                       ' t right-parenthesis minus f left-parenthesis u' +
                       ' right-parenthesis EndAbsoluteValue squared plus' +
                       ' StartAbsoluteValue t minus u EndAbsoluteValue' +
                       ' squared right-bracket Superscript negative s slash' +
                       ' 2 Baseline normal d t normal d u less-than' +
                       ' infinity', 'default');
  this.executeRuleTest(mml, 'integral Sub 0 Sup 1 Base integral Sub 0 Sup 1' +
                       ' Base left-brack StartAbsoluteValue f left-p\'ren t' +
                       ' right-p\'ren minus f left-p\'ren u right-p\'ren' +
                       ' EndAbsoluteValue squared plus StartAbsoluteValue t' +
                       ' minus u EndAbsoluteValue squared right-brack Sup' +
                       ' negative s slash 2 Base normal d t normal d u' +
                       ' less-than infinity', 'brief');
  this.executeRuleTest(mml, 'integral Sub 0 Sup 1 Base integral Sub 0 Sup 1' +
                       ' Base L brack AbsoluteValue f L p\'ren t R p\'ren' +
                       ' minus f L p\'ren u R p\'ren EndAbsoluteValue' +
                       ' squared plus AbsoluteValue t minus u' +
                       ' EndAbsoluteValue squared R brack Sup negative s' +
                       ' slash 2 Base normal d t normal d u less-than' +
                       ' infinity', 'sbrief');
};


/**
 * Testing Sample 70
 */
sre.NobleEnglishTest.prototype.testSample_70 = function() {
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
  this.executeRuleTest(mml, 'sans-serif upper E left-parenthesis' +
                       ' sigma-summation Underscript upper I element-of' +
                       ' upper E Subscript k plus 1 Baseline Endscripts' +
                       ' StartAbsoluteValue upper I EndAbsoluteValue' +
                       ' Superscript s Baseline right-parenthesis equals' +
                       ' sans-serif upper E left-parenthesis' +
                       ' sigma-summation Underscript upper I element-of' +
                       ' upper E Subscript k Baseline Endscripts' +
                       ' StartAbsoluteValue upper I EndAbsoluteValue' +
                       ' Superscript s Baseline right-parenthesis' +
                       ' sans-serif upper E left-parenthesis upper R 1' +
                       ' Superscript s Baseline plus upper R 2 Superscript' +
                       ' s Baseline right-parenthesis period', 'default');
  this.executeRuleTest(mml, 'sans-serif upper E left-p\'ren sigma-summation' +
                       ' Underscript upper I element-of upper E Sub k plus' +
                       ' 1 Base Endscripts StartAbsoluteValue upper I' +
                       ' EndAbsoluteValue Sup s Base right-p\'ren equals' +
                       ' sans-serif upper E left-p\'ren sigma-summation' +
                       ' Underscript upper I element-of upper E Sub k Base' +
                       ' Endscripts StartAbsoluteValue upper I' +
                       ' EndAbsoluteValue Sup s Base right-p\'ren' +
                       ' sans-serif upper E left-p\'ren upper R 1 Sup s' +
                       ' Base plus upper R 2 Sup s Base right-p\'ren' +
                       ' period', 'brief');
  this.executeRuleTest(mml, 'sans-serif upper E L p\'ren sigma-summation' +
                       ' Underscript upper I element-of upper E Sub k plus' +
                       ' 1 Base Endscripts AbsoluteValue upper I' +
                       ' EndAbsoluteValue Sup s Base R p\'ren equals' +
                       ' sans-serif upper E L p\'ren sigma-summation' +
                       ' Underscript upper I element-of upper E Sub k Base' +
                       ' Endscripts AbsoluteValue upper I EndAbsoluteValue' +
                       ' Sup s Base R p\'ren sans-serif upper E L p\'ren' +
                       ' upper R 1 Sup s Base plus upper R 2 Sup s Base R' +
                       ' p\'ren period', 'sbrief');
};


/**
 * Testing Sample 71
 */
sre.NobleEnglishTest.prototype.testSample_71 = function() {
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
  this.executeRuleTest(mml, 'left-parenthesis x 1 comma y 1' +
                       ' right-parenthesis', 'default');
  this.executeRuleTest(mml, 'left-p\'ren x 1 comma y 1 right-p\'ren', 'brief');
  this.executeRuleTest(mml, 'L p\'ren x 1 comma y 1 R p\'ren', 'sbrief');
};


/**
 * Testing Sample 72
 */
sre.NobleEnglishTest.prototype.testSample_72 = function() {
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
  this.executeRuleTest(mml, 'left-parenthesis x 2 comma y 2' +
                       ' right-parenthesis', 'default');
  this.executeRuleTest(mml, 'left-p\'ren x 2 comma y 2 right-p\'ren', 'brief');
  this.executeRuleTest(mml, 'L p\'ren x 2 comma y 2 R p\'ren', 'sbrief');
};


/**
 * Testing Sample 73
 */
sre.NobleEnglishTest.prototype.testSample_73 = function() {
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
  this.executeRuleTest(mml, 'd equals StartRoot left-parenthesis x 2 minus' +
                       ' x 1 right-parenthesis squared plus' +
                       ' left-parenthesis y 2 minus y 1 right-parenthesis' +
                       ' squared EndRoot', 'default');
  this.executeRuleTest(mml, 'd equals StartRoot left-p\'ren x 2 minus x 1' +
                       ' right-p\'ren squared plus left-p\'ren y 2 minus y' +
                       ' 1 right-p\'ren squared EndRoot', 'brief');
  this.executeRuleTest(mml, 'd equals Root L p\'ren x 2 minus x 1 R p\'ren' +
                       ' squared plus L p\'ren y 2 minus y 1 R p\'ren' +
                       ' squared EndRoot', 'sbrief');
};


/**
 * Testing Sample 74
 */
sre.NobleEnglishTest.prototype.testSample_74 = function() {
  var mml = '<mi>&#x211D;</mi>';
  this.executeRuleTest(mml, 'double-struck upper R', 'default');
  this.executeRuleTest(mml, 'double-struck upper R', 'brief');
  this.executeRuleTest(mml, 'double-struck upper R', 'sbrief');
};


/**
 * Testing Sample 75
 */
sre.NobleEnglishTest.prototype.testSample_75 = function() {
  var mml = '<mrow>' +
      '<mi>&#x211D;</mi><mo>=</mo><mrow><mo>(</mo>' +
      '<mrow>' +
      '<mo>&#x2212;</mo><mi>&#x221E;</mi><mo>,</mo><mi>&#x221E;</mi></mrow>' +
      '<mo>)</mo></mrow></mrow>';
  this.executeRuleTest(mml, 'double-struck upper R equals left-parenthesis' +
                       ' negative infinity comma infinity' +
                       ' right-parenthesis', 'default');
  this.executeRuleTest(mml, 'double-struck upper R equals left-p\'ren' +
                       ' negative infinity comma infinity right-p\'ren',
                       'brief');
  this.executeRuleTest(mml, 'double-struck upper R equals L p\'ren negative' +
                       ' infinity comma infinity R p\'ren', 'sbrief');
};


/**
 * Testing Sample 76
 */
sre.NobleEnglishTest.prototype.testSample_76 = function() {
  var mml = '<mrow><mrow><mo>{</mo> <mrow>' +
      '<mn>1</mn><mo>,</mo><mn>2</mn><mo>,</mo><mn>3</mn></mrow> <mo>}</mo>' +
      '</mrow></mrow>';
  this.executeRuleTest(mml, 'StartSet 1 comma 2 comma 3 EndSet', 'default');
  this.executeRuleTest(mml, 'StartSet 1 comma 2 comma 3 EndSet', 'brief');
  this.executeRuleTest(mml, 'Set 1 comma 2 comma 3 EndSet', 'sbrief');
};


/**
 * Testing Sample 77
 */
sre.NobleEnglishTest.prototype.testSample_77 = function() {
  var mml = '<mrow>' +
      '<mn>1</mn><mo>&#x2208;</mo><mi>S</mi></mrow>';
  this.executeRuleTest(mml, '1 element-of upper S', 'default');
  this.executeRuleTest(mml, '1 element-of upper S', 'brief');
  this.executeRuleTest(mml, '1 element-of upper S', 'sbrief');
};


/**
 * Testing Sample 78
 */
sre.NobleEnglishTest.prototype.testSample_78 = function() {
  var mml = '<mrow>' +
      '<mn>3</mn><mo>&#x2208;</mo><mi>S</mi></mrow>';
  this.executeRuleTest(mml, '3 element-of upper S', 'default');
  this.executeRuleTest(mml, '3 element-of upper S', 'brief');
  this.executeRuleTest(mml, '3 element-of upper S', 'sbrief');
};


/**
 * Testing Sample 79
 */
sre.NobleEnglishTest.prototype.testSample_79 = function() {
  var mml = '<mrow>' +
      '<mn>4</mn><mo>&#x2209;</mo><mi>S</mi></mrow>';
  this.executeRuleTest(mml, '4 not-an-element-of upper S', 'default');
  this.executeRuleTest(mml, '4 not-an-element-of upper S', 'brief');
  this.executeRuleTest(mml, '4 not-an-element-of upper S', 'sbrief');
};


/**
 * Testing Sample 80
 */
sre.NobleEnglishTest.prototype.testSample_80 = function() {
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
  this.executeRuleTest(mml, 'a equals StartRoot 3 x minus 1 EndRoot plus' +
                       ' left-parenthesis 1 plus x right-parenthesis' +
                       ' squared', 'default');
  this.executeRuleTest(mml, 'a equals StartRoot 3 x minus 1 EndRoot plus' +
                       ' left-p\'ren 1 plus x right-p\'ren squared', 'brief');
  this.executeRuleTest(mml, 'a equals Root 3 x minus 1 EndRoot plus L' +
                       ' p\'ren 1 plus x R p\'ren squared', 'sbrief');
};


/**
 * Testing Sample 81
 */
sre.NobleEnglishTest.prototype.testSample_81 = function() {
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
  this.executeRuleTest(mml, 'a equals StartFraction left-parenthesis b plus' +
                       ' c right-parenthesis squared Over d EndFraction' +
                       ' plus StartFraction left-parenthesis e plus f' +
                       ' right-parenthesis squared Over g EndFraction',
                       'default');
  this.executeRuleTest(mml, 'a equals StartFrac left-p\'ren b plus c' +
                       ' right-p\'ren squared Over d EndFrac plus StartFrac' +
                       ' left-p\'ren e plus f right-p\'ren squared Over g' +
                       ' EndFrac', 'brief');
  this.executeRuleTest(mml, 'a equals Frac L p\'ren b plus c R p\'ren' +
                       ' squared Over d EndFrac plus Frac L p\'ren e plus f' +
                       ' R p\'ren squared Over g EndFrac', 'sbrief');
};


/**
 * Testing Sample 82
 */
sre.NobleEnglishTest.prototype.testSample_82 = function() {
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
  this.executeRuleTest(mml, 'x equals left-bracket left-parenthesis a plus' +
                       ' b right-parenthesis squared left-parenthesis c' +
                       ' minus b right-parenthesis squared right-bracket' +
                       ' plus left-bracket left-parenthesis d plus e' +
                       ' right-parenthesis squared left-parenthesis f minus' +
                       ' e right-parenthesis squared right-bracket', 'default');
  this.executeRuleTest(mml, 'x equals left-brack left-p\'ren a plus b' +
                       ' right-p\'ren squared left-p\'ren c minus b' +
                       ' right-p\'ren squared right-brack plus left-brack' +
                       ' left-p\'ren d plus e right-p\'ren squared' +
                       ' left-p\'ren f minus e right-p\'ren squared' +
                       ' right-brack', 'brief');
  this.executeRuleTest(mml, 'x equals L brack L p\'ren a plus b R p\'ren' +
                       ' squared L p\'ren c minus b R p\'ren squared R' +
                       ' brack plus L brack L p\'ren d plus e R p\'ren' +
                       ' squared L p\'ren f minus e R p\'ren squared R' +
                       ' brack', 'sbrief');
};


/**
 * Testing Sample 83
 */
sre.NobleEnglishTest.prototype.testSample_83 = function() {
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
  this.executeRuleTest(mml, 'x equals left-bracket left-parenthesis a plus' +
                       ' b right-parenthesis squared right-bracket plus' +
                       ' left-bracket left-parenthesis f minus e' +
                       ' right-parenthesis squared right-bracket', 'default');
  this.executeRuleTest(mml, 'x equals left-brack left-p\'ren a plus b' +
                       ' right-p\'ren squared right-brack plus left-brack' +
                       ' left-p\'ren f minus e right-p\'ren squared' +
                       ' right-brack', 'brief');
  this.executeRuleTest(mml, 'x equals L brack L p\'ren a plus b R p\'ren' +
                       ' squared R brack plus L brack L p\'ren f minus e R' +
                       ' p\'ren squared R brack', 'sbrief');
};


/**
 * Testing Sample 84
 */
sre.NobleEnglishTest.prototype.testSample_84 = function() {
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
  this.executeRuleTest(mml, 'x equals left-bracket left-parenthesis a plus' +
                       ' b right-parenthesis squared right-bracket', 'default');
  this.executeRuleTest(mml, 'x equals left-brack left-p\'ren a plus b' +
                       ' right-p\'ren squared right-brack', 'brief');
  this.executeRuleTest(mml, 'x equals L brack L p\'ren a plus b R p\'ren' +
                       ' squared R brack', 'sbrief');
};


/**
 * Testing Sample 85
 */
sre.NobleEnglishTest.prototype.testSample_85 = function() {
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
  this.executeRuleTest(mml, 'x equals left-parenthesis a plus b' +
                       ' right-parenthesis squared', 'default');
  this.executeRuleTest(mml, 'x equals left-p\'ren a plus b right-p\'ren' +
                       ' squared', 'brief');
  this.executeRuleTest(mml, 'x equals L p\'ren a plus b R p\'ren squared',
                       'sbrief');
};


/**
 * Testing Sample 86
 */
sre.NobleEnglishTest.prototype.testSample_86 = function() {
  var mml = '<mrow><mi>x</mi><mo>=</mo><mi>a</mi><mo>+</mo><msup>' +
      '<mi>b</mi>' +
      '<mn>2</mn>' +
      '</msup>' +
      '</mrow>';
  this.executeRuleTest(mml, 'x equals a plus b squared', 'default');
  this.executeRuleTest(mml, 'x equals a plus b squared', 'brief');
  this.executeRuleTest(mml, 'x equals a plus b squared', 'sbrief');
};


/**
 * Testing Sample 87
 */
sre.NobleEnglishTest.prototype.testSample_87 = function() {
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
  this.executeRuleTest(mml, 'StartFraction one half Over three fourths' +
                       ' EndFraction equals two thirds', 'default');
  this.executeRuleTest(mml, 'StartFrac one half Over three fourths EndFrac' +
                       ' equals two thirds', 'brief');
  this.executeRuleTest(mml, 'Frac one half Over three fourths EndFrac' +
                       ' equals two thirds', 'sbrief');
};


/**
 * Testing Sample 88
 */
sre.NobleEnglishTest.prototype.testSample_88 = function() {
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
  this.executeRuleTest(mml, '2 left-parenthesis left-parenthesis x plus 1' +
                       ' right-parenthesis left-parenthesis x plus 3' +
                       ' right-parenthesis minus 4 left-parenthesis' +
                       ' left-parenthesis x minus 1 right-parenthesis' +
                       ' left-parenthesis x plus 2 right-parenthesis minus' +
                       ' 3 right-parenthesis right-parenthesis equals y',
                       'default');
  this.executeRuleTest(mml, '2 left-p\'ren left-p\'ren x plus 1' +
                       ' right-p\'ren left-p\'ren x plus 3 right-p\'ren' +
                       ' minus 4 left-p\'ren left-p\'ren x minus 1' +
                       ' right-p\'ren left-p\'ren x plus 2 right-p\'ren' +
                       ' minus 3 right-p\'ren right-p\'ren equals y', 'brief');
  this.executeRuleTest(mml, '2 L p\'ren L p\'ren x plus 1 R p\'ren L p\'ren' +
                       ' x plus 3 R p\'ren minus 4 L p\'ren L p\'ren x' +
                       ' minus 1 R p\'ren L p\'ren x plus 2 R p\'ren minus' +
                       ' 3 R p\'ren R p\'ren equals y', 'sbrief');
};


/**
 * Testing Sample 89
 */
sre.NobleEnglishTest.prototype.testSample_89 = function() {
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
  this.executeRuleTest(mml, 'cosine x equals 1 minus StartFraction x' +
                       ' squared Over 2 factorial EndFraction plus' +
                       ' StartFraction x Superscript 4 Baseline Over 4' +
                       ' factorial EndFraction minus ellipsis', 'default');
  this.executeRuleTest(mml, 'cosine x equals 1 minus StartFrac x squared' +
                       ' Over 2 factorial EndFrac plus StartFrac x Sup 4' +
                       ' Base Over 4 factorial EndFrac minus ellipsis',
                       'brief');
  this.executeRuleTest(mml, 'cosine x equals 1 minus Frac x squared Over 2' +
                       ' factorial EndFrac plus Frac x Sup 4 Base Over 4' +
                       ' factorial EndFrac minus ellipsis', 'sbrief');
};


/**
 * Testing Sample 90
 */
sre.NobleEnglishTest.prototype.testSample_90 = function() {
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
  this.executeRuleTest(mml, 'x equals StartFraction negative b' +
                       ' plus-or-minus StartRoot b squared minus 4 a c' +
                       ' EndRoot Over 2 a EndFraction', 'default');
  this.executeRuleTest(mml, 'x equals StartFrac negative b plus-or-minus' +
                       ' StartRoot b squared minus 4 a c EndRoot Over 2 a' +
                       ' EndFrac', 'brief');
  this.executeRuleTest(mml, 'x equals Frac negative b plus-or-minus Root b' +
                       ' squared minus 4 a c EndRoot Over 2 a EndFrac',
                       'sbrief');
};


/**
 * Testing Sample 91
 */
sre.NobleEnglishTest.prototype.testSample_91 = function() {
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
  this.executeRuleTest(mml, 'x plus y Superscript StartFraction 2 Over k' +
                       ' plus 1 EndFraction', 'default');
  this.executeRuleTest(mml, 'x plus y Sup StartFrac 2 Over k plus 1' +
                       ' EndFrac', 'brief');
  this.executeRuleTest(mml, 'x plus y Sup Frac 2 Over k plus 1 EndFrac',
                       'sbrief');
};


/**
 * Testing Sample 92
 */
sre.NobleEnglishTest.prototype.testSample_92 = function() {
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
  this.executeRuleTest(mml, 'limit Underscript x right-arrow 0 Endscripts' +
                       ' StartFraction sine x Over x EndFraction equals 1',
                       'default');
  this.executeRuleTest(mml, 'limit Underscript x right-arrow 0 Endscripts' +
                       ' StartFrac sine x Over x EndFrac equals 1', 'brief');
  this.executeRuleTest(mml, 'limit Underscript x R arrow 0 Endscripts Frac' +
                       ' sine x Over x EndFrac equals 1', 'sbrief');
};


/**
 * Testing Sample 93
 */
sre.NobleEnglishTest.prototype.testSample_93 = function() {
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
  this.executeRuleTest(mml, 'd equals StartRoot left-parenthesis x 2 minus' +
                       ' x 1 right-parenthesis squared plus' +
                       ' left-parenthesis y 2 minus y 1 right-parenthesis' +
                       ' squared EndRoot', 'default');
  this.executeRuleTest(mml, 'd equals StartRoot left-p\'ren x 2 minus x 1' +
                       ' right-p\'ren squared plus left-p\'ren y 2 minus y' +
                       ' 1 right-p\'ren squared EndRoot', 'brief');
  this.executeRuleTest(mml, 'd equals Root L p\'ren x 2 minus x 1 R p\'ren' +
                       ' squared plus L p\'ren y 2 minus y 1 R p\'ren' +
                       ' squared EndRoot', 'sbrief');
};


/**
 * Testing Sample 94
 */
sre.NobleEnglishTest.prototype.testSample_94 = function() {
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
  this.executeRuleTest(mml, 'upper F Subscript n Baseline equals upper F' +
                       ' Subscript n minus 1 Baseline plus upper F' +
                       ' Subscript n minus 2', 'default');
  this.executeRuleTest(mml, 'upper F Sub n Base equals upper F Sub n minus' +
                       ' 1 Base plus upper F Sub n minus 2', 'brief');
  this.executeRuleTest(mml, 'upper F Sub n Base equals upper F Sub n minus' +
                       ' 1 Base plus upper F Sub n minus 2', 'sbrief');
};


/**
 * Testing Sample 95
 */
sre.NobleEnglishTest.prototype.testSample_95 = function() {
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
  this.executeRuleTest(mml, 'bold upper Pi equals Start 6 By 6 Matrix 1st' +
                       ' Row 1st Column pi 11 2nd Column pi 12 3rd Column' +
                       ' pi 12 4th Column 0 5th Column 0 6th Column 0 2nd' +
                       ' Row 1st Column pi 12 2nd Column pi 11 3rd Column' +
                       ' pi 12 4th Column 0 5th Column 0 6th Column 0 3rd' +
                       ' Row 1st Column pi 12 2nd Column pi 12 3rd Column' +
                       ' pi 11 4th Column 0 5th Column 0 6th Column 0 4th' +
                       ' Row 1st Column 0 2nd Column 0 3rd Column 0 4th' +
                       ' Column pi 44 5th Column 0 6th Column 0 5th Row 1st' +
                       ' Column 0 2nd Column 0 3rd Column 0 4th Column 0' +
                       ' 5th Column pi 44 6th Column 0 6th Row 1st Column 0' +
                       ' 2nd Column 0 3rd Column 0 4th Column 0 5th Column' +
                       ' 0 6th Column pi 44 EndMatrix', 'default');
  this.executeRuleTest(mml, 'bold upper Pi equals Start 6 By 6 Matrix 1st' +
                       ' Row 1st Column pi 11 2nd Column pi 12 3rd Column' +
                       ' pi 12 4th Column 0 5th Column 0 6th Column 0 2nd' +
                       ' Row 1st Column pi 12 2nd Column pi 11 3rd Column' +
                       ' pi 12 4th Column 0 5th Column 0 6th Column 0 3rd' +
                       ' Row 1st Column pi 12 2nd Column pi 12 3rd Column' +
                       ' pi 11 4th Column 0 5th Column 0 6th Column 0 4th' +
                       ' Row 1st Column 0 2nd Column 0 3rd Column 0 4th' +
                       ' Column pi 44 5th Column 0 6th Column 0 5th Row 1st' +
                       ' Column 0 2nd Column 0 3rd Column 0 4th Column 0' +
                       ' 5th Column pi 44 6th Column 0 6th Row 1st Column 0' +
                       ' 2nd Column 0 3rd Column 0 4th Column 0 5th Column' +
                       ' 0 6th Column pi 44 EndMatrix', 'brief');
  this.executeRuleTest(mml, 'bold upper Pi equals 6 By 6 Matrix 1st Row 1st' +
                       ' Column pi 11 2nd Column pi 12 3rd Column pi 12 4th' +
                       ' Column 0 5th Column 0 6th Column 0 2nd Row 1st' +
                       ' Column pi 12 2nd Column pi 11 3rd Column pi 12 4th' +
                       ' Column 0 5th Column 0 6th Column 0 3rd Row 1st' +
                       ' Column pi 12 2nd Column pi 12 3rd Column pi 11 4th' +
                       ' Column 0 5th Column 0 6th Column 0 4th Row 1st' +
                       ' Column 0 2nd Column 0 3rd Column 0 4th Column pi' +
                       ' 44 5th Column 0 6th Column 0 5th Row 1st Column 0' +
                       ' 2nd Column 0 3rd Column 0 4th Column 0 5th Column' +
                       ' pi 44 6th Column 0 6th Row 1st Column 0 2nd Column' +
                       ' 0 3rd Column 0 4th Column 0 5th Column 0 6th' +
                       ' Column pi 44 EndMatrix', 'sbrief');
};


/**
 * Testing Sample 96
 */
sre.NobleEnglishTest.prototype.testSample_96 = function() {
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
  this.executeRuleTest(mml, 's 11 equals StartFraction c 11 plus c 12 Over' +
                       ' left-parenthesis c 11 minus c 12 right-parenthesis' +
                       ' left-parenthesis c 11 plus 2 c 12' +
                       ' right-parenthesis EndFraction', 'default');
  this.executeRuleTest(mml, 's 11 equals StartFrac c 11 plus c 12 Over' +
                       ' left-p\'ren c 11 minus c 12 right-p\'ren' +
                       ' left-p\'ren c 11 plus 2 c 12 right-p\'ren' +
                       ' EndFrac', 'brief');
  this.executeRuleTest(mml, 's 11 equals Frac c 11 plus c 12 Over L p\'ren' +
                       ' c 11 minus c 12 R p\'ren L p\'ren c 11 plus 2 c 12' +
                       ' R p\'ren EndFrac', 'sbrief');
};


/**
 * Testing Sample 97
 */
sre.NobleEnglishTest.prototype.testSample_97 = function() {
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
  this.executeRuleTest(mml, 'upper S i normal upper O 2 plus 6 normal upper' +
                       ' H normal upper F right-arrow normal upper H 2' +
                       ' upper S i normal upper F 6 plus 2 normal upper H 2' +
                       ' normal upper O', 'default');
  this.executeRuleTest(mml, 'upper S i normal upper O 2 plus 6 normal upper' +
                       ' H normal upper F right-arrow normal upper H 2' +
                       ' upper S i normal upper F 6 plus 2 normal upper H 2' +
                       ' normal upper O', 'brief');
  this.executeRuleTest(mml, 'upper S i normal upper O 2 plus 6 normal upper' +
                       ' H normal upper F R arrow normal upper H 2 upper S' +
                       ' i normal upper F 6 plus 2 normal upper H 2 normal' +
                       ' upper O', 'sbrief');
};


/**
 * Testing Sample 98
 */
sre.NobleEnglishTest.prototype.testSample_98 = function() {
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
  this.executeRuleTest(mml, 'StartFraction d Over d x EndFraction' +
                       ' left-parenthesis upper E left-parenthesis x' +
                       ' right-parenthesis upper A left-parenthesis x' +
                       ' right-parenthesis StartFraction d w' +
                       ' left-parenthesis x right-parenthesis Over d x' +
                       ' EndFraction right-parenthesis plus p' +
                       ' left-parenthesis x right-parenthesis equals 0',
                       'default');
  this.executeRuleTest(mml, 'StartFrac d Over d x EndFrac left-p\'ren upper' +
                       ' E left-p\'ren x right-p\'ren upper A left-p\'ren x' +
                       ' right-p\'ren StartFrac d w left-p\'ren x' +
                       ' right-p\'ren Over d x EndFrac right-p\'ren plus p' +
                       ' left-p\'ren x right-p\'ren equals 0', 'brief');
  this.executeRuleTest(mml, 'Frac d Over d x EndFrac L p\'ren upper E L' +
                       ' p\'ren x R p\'ren upper A L p\'ren x R p\'ren Frac' +
                       ' d w L p\'ren x R p\'ren Over d x EndFrac R p\'ren' +
                       ' plus p L p\'ren x R p\'ren equals 0', 'sbrief');
};


/**
 * Testing Sample 99
 */
sre.NobleEnglishTest.prototype.testSample_99 = function() {
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
  this.executeRuleTest(mml, 'TCS Subscript gas Baseline equals minus' +
                       ' one half left-parenthesis StartFraction upper P' +
                       ' Subscript seal Baseline Over upper P Subscript max' +
                       ' Baseline EndFraction right-parenthesis' +
                       ' left-parenthesis StartFraction 1 Over upper T' +
                       ' Subscript seal Baseline EndFraction' +
                       ' right-parenthesis', 'default');
  this.executeRuleTest(mml, 'TCS Sub gas Base equals minus one half' +
                       ' left-p\'ren StartFrac upper P Sub seal Base Over' +
                       ' upper P Sub max Base EndFrac right-p\'ren' +
                       ' left-p\'ren StartFrac 1 Over upper T Sub seal Base' +
                       ' EndFrac right-p\'ren', 'brief');
  this.executeRuleTest(mml, 'TCS Sub gas Base equals minus one half L' +
                       ' p\'ren Frac upper P Sub seal Base Over upper P Sub' +
                       ' max Base EndFrac R p\'ren L p\'ren Frac 1 Over' +
                       ' upper T Sub seal Base EndFrac R p\'ren', 'sbrief');
};


/**
 * Testing Sample 100
 */
sre.NobleEnglishTest.prototype.testSample_100 = function() {
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
  this.executeRuleTest(mml, 'upper B Subscript p Baseline equals' +
                       ' StartStartFraction StartFraction 7 minus v squared' +
                       ' Over 3 EndFraction left-parenthesis 1 plus' +
                       ' StartFraction c squared Over a squared EndFraction' +
                       ' plus StartFraction c Superscript 4 Baseline Over a' +
                       ' Superscript 4 Baseline EndFraction' +
                       ' right-parenthesis plus StartFraction' +
                       ' left-parenthesis 3 minus v right-parenthesis' +
                       ' squared c squared Over left-parenthesis 1 plus v' +
                       ' right-parenthesis a squared EndFraction OverOver' +
                       ' left-parenthesis 1 minus v right-parenthesis' +
                       ' left-parenthesis 1 minus StartFraction c' +
                       ' Superscript 4 Baseline Over a Superscript 4' +
                       ' Baseline EndFraction right-parenthesis' +
                       ' left-parenthesis 1 minus StartFraction c squared' +
                       ' Over a squared EndFraction right-parenthesis' +
                       ' EndEndFraction', 'default');
  this.executeRuleTest(mml, 'upper B Sub p Base equals StartStartFrac' +
                       ' StartFrac 7 minus v squared Over 3 EndFrac' +
                       ' left-p\'ren 1 plus StartFrac c squared Over a' +
                       ' squared EndFrac plus StartFrac c Sup 4 Base Over a' +
                       ' Sup 4 Base EndFrac right-p\'ren plus StartFrac' +
                       ' left-p\'ren 3 minus v right-p\'ren squared c' +
                       ' squared Over left-p\'ren 1 plus v right-p\'ren a' +
                       ' squared EndFrac OverOver left-p\'ren 1 minus v' +
                       ' right-p\'ren left-p\'ren 1 minus StartFrac c Sup 4' +
                       ' Base Over a Sup 4 Base EndFrac right-p\'ren' +
                       ' left-p\'ren 1 minus StartFrac c squared Over a' +
                       ' squared EndFrac right-p\'ren EndEndFrac', 'brief');
  this.executeRuleTest(mml, 'upper B Sub p Base equals NestFrac Frac 7' +
                       ' minus v squared Over 3 EndFrac L p\'ren 1 plus' +
                       ' Frac c squared Over a squared EndFrac plus Frac c' +
                       ' Sup 4 Base Over a Sup 4 Base EndFrac R p\'ren plus' +
                       ' Frac L p\'ren 3 minus v R p\'ren squared c squared' +
                       ' Over L p\'ren 1 plus v R p\'ren a squared EndFrac' +
                       ' NestOver L p\'ren 1 minus v R p\'ren L p\'ren 1' +
                       ' minus Frac c Sup 4 Base Over a Sup 4 Base EndFrac' +
                       ' R p\'ren L p\'ren 1 minus Frac c squared Over a' +
                       ' squared EndFrac R p\'ren NestEndFrac', 'sbrief');
};


/**
 * Testing Sample 101
 */
sre.NobleEnglishTest.prototype.testSample_101 = function() {
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
  this.executeRuleTest(mml, 'upper Q Subscript tank Superscript series' +
                       ' Baseline equals StartFraction 1 Over upper R' +
                       ' Subscript s Baseline EndFraction StartRoot' +
                       ' StartFraction upper L Subscript s Baseline Over' +
                       ' upper C Subscript s Baseline EndFraction EndRoot',
                       'default');
  this.executeRuleTest(mml, 'upper Q Sub tank Sup series Base equals' +
                       ' StartFrac 1 Over upper R Sub s Base EndFrac' +
                       ' StartRoot StartFrac upper L Sub s Base Over upper' +
                       ' C Sub s Base EndFrac EndRoot', 'brief');
  this.executeRuleTest(mml, 'upper Q Sub tank Sup series Base equals Frac 1' +
                       ' Over upper R Sub s Base EndFrac Root Frac upper L' +
                       ' Sub s Base Over upper C Sub s Base EndFrac' +
                       ' EndRoot', 'sbrief');
};


/**
 * Testing Sample 102
 */
sre.NobleEnglishTest.prototype.testSample_102 = function() {
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
  this.executeRuleTest(mml, 'upper Delta phi Subscript peak Baseline equals' +
                       ' tangent Superscript negative 1 Baseline' +
                       ' left-parenthesis k squared upper Q Subscript tank' +
                       ' Superscript series Baseline right-parenthesis',
                       'default');
  this.executeRuleTest(mml, 'upper Delta phi Sub peak Base equals tangent' +
                       ' Sup negative 1 Base left-p\'ren k squared upper Q' +
                       ' Sub tank Sup series Base right-p\'ren', 'brief');
  this.executeRuleTest(mml, 'upper Delta phi Sub peak Base equals tangent' +
                       ' Sup negative 1 Base L p\'ren k squared upper Q Sub' +
                       ' tank Sup series Base R p\'ren', 'sbrief');
};


/**
 * Testing Sample 103
 */
sre.NobleEnglishTest.prototype.testSample_103 = function() {
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
  this.executeRuleTest(mml, 'f equals 1.013 StartFraction upper W Over' +
                       ' upper L squared EndFraction StartRoot' +
                       ' StartFraction upper E Over rho EndFraction EndRoot' +
                       ' StartRoot left-parenthesis 1 plus 0.293' +
                       ' StartFraction upper L squared Over EW squared' +
                       ' EndFraction sigma right-parenthesis EndRoot',
                       'default');
  this.executeRuleTest(mml, 'f equals 1.013 StartFrac upper W Over upper L' +
                       ' squared EndFrac StartRoot StartFrac upper E Over' +
                       ' rho EndFrac EndRoot StartRoot left-p\'ren 1 plus' +
                       ' 0.293 StartFrac upper L squared Over EW squared' +
                       ' EndFrac sigma right-p\'ren EndRoot', 'brief');
  this.executeRuleTest(mml, 'f equals 1.013 Frac upper W Over upper L' +
                       ' squared EndFrac Root Frac upper E Over rho EndFrac' +
                       ' EndRoot Root L p\'ren 1 plus 0.293 Frac upper L' +
                       ' squared Over EW squared EndFrac sigma R p\'ren' +
                       ' EndRoot', 'sbrief');
};


/**
 * Testing Sample 104
 */
sre.NobleEnglishTest.prototype.testSample_104 = function() {
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
  this.executeRuleTest(mml, 'u Subscript n Baseline left-parenthesis x' +
                       ' right-parenthesis equals gamma Subscript n' +
                       ' Baseline left-parenthesis hyperbolic cosine k' +
                       ' Subscript n Baseline x minus cosine k Subscript n' +
                       ' Baseline x right-parenthesis plus left-parenthesis' +
                       ' hyperbolic sine k Subscript n Baseline x minus' +
                       ' sine k Subscript n Baseline x right-parenthesis',
                       'default');
  this.executeRuleTest(mml, 'u Sub n Base left-p\'ren x right-p\'ren equals' +
                       ' gamma Sub n Base left-p\'ren hyperbolic cosine k' +
                       ' Sub n Base x minus cosine k Sub n Base x' +
                       ' right-p\'ren plus left-p\'ren hyperbolic sine k' +
                       ' Sub n Base x minus sine k Sub n Base x' +
                       ' right-p\'ren', 'brief');
  this.executeRuleTest(mml, 'u Sub n Base L p\'ren x R p\'ren equals gamma' +
                       ' Sub n Base L p\'ren hyperbolic cosine k Sub n Base' +
                       ' x minus cosine k Sub n Base x R p\'ren plus L' +
                       ' p\'ren hyperbolic sine k Sub n Base x minus sine k' +
                       ' Sub n Base x R p\'ren', 'sbrief');
};


/**
 * Testing Sample 105
 */
sre.NobleEnglishTest.prototype.testSample_105 = function() {
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
  this.executeRuleTest(mml, 'StartLayout 1st Row 1st Column upper B 2nd' +
                       ' Column equals StartStartFraction StartFraction' +
                       ' upper F 0 Over m EndFraction OverOver StartRoot' +
                       ' left-parenthesis omega 0 squared minus omega' +
                       ' squared right-parenthesis squared plus 4 n squared' +
                       ' omega squared EndRoot EndEndFraction 2nd Row 1st' +
                       ' Column Blank 2nd Column equals StartStartFraction' +
                       ' StartFraction upper F 0 Over k EndFraction' +
                       ' OverOver StartRoot left-parenthesis 1 minus' +
                       ' left-parenthesis omega slash omega 0 squared' +
                       ' right-parenthesis squared right-parenthesis' +
                       ' squared plus 4 left-parenthesis n slash omega 0' +
                       ' right-parenthesis squared left-parenthesis omega' +
                       ' slash omega 0 right-parenthesis squared EndRoot' +
                       ' EndEndFraction EndLayout', 'default');
  this.executeRuleTest(mml, 'StartLayout 1st Row 1st Column upper B 2nd' +
                       ' Column equals StartStartFrac StartFrac upper F 0' +
                       ' Over m EndFrac OverOver StartRoot left-p\'ren' +
                       ' omega 0 squared minus omega squared right-p\'ren' +
                       ' squared plus 4 n squared omega squared EndRoot' +
                       ' EndEndFrac 2nd Row 1st Column Blank 2nd Column' +
                       ' equals StartStartFrac StartFrac upper F 0 Over k' +
                       ' EndFrac OverOver StartRoot left-p\'ren 1 minus' +
                       ' left-p\'ren omega slash omega 0 squared' +
                       ' right-p\'ren squared right-p\'ren squared plus 4' +
                       ' left-p\'ren n slash omega 0 right-p\'ren squared' +
                       ' left-p\'ren omega slash omega 0 right-p\'ren' +
                       ' squared EndRoot EndEndFrac EndLayout', 'brief');
  this.executeRuleTest(mml, 'Layout 1st Row 1st Column upper B 2nd Column' +
                       ' equals NestFrac Frac upper F 0 Over m EndFrac' +
                       ' NestOver Root L p\'ren omega 0 squared minus omega' +
                       ' squared R p\'ren squared plus 4 n squared omega' +
                       ' squared EndRoot NestEndFrac 2nd Row 1st Column' +
                       ' Blank 2nd Column equals NestFrac Frac upper F 0' +
                       ' Over k EndFrac NestOver Root L p\'ren 1 minus L' +
                       ' p\'ren omega slash omega 0 squared R p\'ren' +
                       ' squared R p\'ren squared plus 4 L p\'ren n slash' +
                       ' omega 0 R p\'ren squared L p\'ren omega slash' +
                       ' omega 0 R p\'ren squared EndRoot NestEndFrac' +
                       ' EndLayout', 'sbrief');
};


/**
 * Testing Sample 106
 */
sre.NobleEnglishTest.prototype.testSample_106 = function() {
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
  this.executeRuleTest(mml, 'normal p left-parenthesis upper A a n d upper' +
                       ' B right-parenthesis equals normal p' +
                       ' left-parenthesis upper A right-parenthesis normal' +
                       ' p left-parenthesis upper B vertical-bar upper A' +
                       ' right-parenthesis', 'default');
  this.executeRuleTest(mml, 'normal p left-p\'ren upper A a n d upper B' +
                       ' right-p\'ren equals normal p left-p\'ren upper A' +
                       ' right-p\'ren normal p left-p\'ren upper B' +
                       ' vertical-bar upper A right-p\'ren', 'brief');
  this.executeRuleTest(mml, 'normal p L p\'ren upper A a n d upper B R' +
                       ' p\'ren equals normal p L p\'ren upper A R p\'ren' +
                       ' normal p L p\'ren upper B vertical-bar upper A R' +
                       ' p\'ren', 'sbrief');
};


/**
 * Testing Sample 107
 */
sre.NobleEnglishTest.prototype.testSample_107 = function() {
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
  this.executeRuleTest(mml, 'upper P upper M upper F left-parenthesis x' +
                       ' right-parenthesis proportional-to left-parenthesis' +
                       ' StartFraction 1 Over x EndFraction' +
                       ' right-parenthesis Superscript alpha', 'default');
  this.executeRuleTest(mml, 'upper P upper M upper F left-p\'ren x' +
                       ' right-p\'ren proportional-to left-p\'ren StartFrac' +
                       ' 1 Over x EndFrac right-p\'ren Sup alpha', 'brief');
  this.executeRuleTest(mml, 'upper P upper M upper F L p\'ren x R p\'ren' +
                       ' proportional-to L p\'ren Frac 1 Over x EndFrac R' +
                       ' p\'ren Sup alpha', 'sbrief');
};


/**
 * Testing Sample 108
 */
sre.NobleEnglishTest.prototype.testSample_108 = function() {
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
  this.executeRuleTest(mml, 'f left-parenthesis x right-parenthesis equals' +
                       ' StartFraction 1 Over StartRoot 2 pi EndRoot' +
                       ' EndFraction exp left-parenthesis minus x squared' +
                       ' slash 2 right-parenthesis', 'default');
  this.executeRuleTest(mml, 'f left-p\'ren x right-p\'ren equals StartFrac' +
                       ' 1 Over StartRoot 2 pi EndRoot EndFrac exp' +
                       ' left-p\'ren minus x squared slash 2 right-p\'ren',
                       'brief');
  this.executeRuleTest(mml, 'f L p\'ren x R p\'ren equals Frac 1 Over Root' +
                       ' 2 pi EndRoot EndFrac exp L p\'ren minus x squared' +
                       ' slash 2 R p\'ren', 'sbrief');
};


/**
 * Testing Sample 109
 */
sre.NobleEnglishTest.prototype.testSample_109 = function() {
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
  this.executeRuleTest(mml, 'StartFraction d x Over d theta EndFraction' +
                       ' equals StartFraction beta Over cosine squared' +
                       ' theta EndFraction', 'default');
  this.executeRuleTest(mml, 'StartFrac d x Over d theta EndFrac equals' +
                       ' StartFrac beta Over cosine squared theta EndFrac',
                       'brief');
  this.executeRuleTest(mml, 'Frac d x Over d theta EndFrac equals Frac beta' +
                       ' Over cosine squared theta EndFrac', 'sbrief');
};


/**
 * Testing Sample 110
 */
sre.NobleEnglishTest.prototype.testSample_110 = function() {
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
  this.executeRuleTest(mml, 's slash StartRoot 2 left-parenthesis n minus 1' +
                       ' right-parenthesis EndRoot', 'default');
  this.executeRuleTest(mml, 's slash StartRoot 2 left-p\'ren n minus 1' +
                       ' right-p\'ren EndRoot', 'brief');
  this.executeRuleTest(mml, 's slash Root 2 L p\'ren n minus 1 R p\'ren' +

                       ' EndRoot', 'sbrief');
};

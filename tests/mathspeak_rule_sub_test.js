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
 * @fileoverview Testcases for mathspeak speech rules.
 * @author sorge@google.com (Volker Sorge)
 */

goog.provide('sre.MathspeakRuleSubTest');

goog.require('sre.AbstractTest');
goog.require('sre.MathspeakRuleTest');



/**
 * @constructor
 * @extends {sre.MathspeakRuleTest}
 */
sre.MathspeakRuleSubTest = function() {
  goog.base(this);

  /**
   * @override
   */
  this.information = 'Mathspeak rule special tests.';
};
goog.inherits(sre.MathspeakRuleSubTest, sre.MathspeakRuleTest);


/**
 * Testing Rule 9.1, Example 1.
 */
sre.MathspeakRuleSubTest.prototype.testSample_9_1_1 = function() {
  var mml = '<msqrt><mn>2</mn></msqrt>';
  this.executeRuleTest(mml, 'StartRoot 2 EndRoot', 'default');
  this.executeRuleTest(mml, 'StartRoot 2 EndRoot', 'brief');
  this.executeRuleTest(mml, 'Root 2 EndRoot', 'sbrief');
};


/**
 * Testing Rule 9.1, Example 2.
 */
sre.MathspeakRuleSubTest.prototype.testSample_9_1_2 = function() {
  var mml = '<msqrt><mrow><mi>m</mi><mo>+</mo><mi>n</mi></mrow></msqrt>';
  this.executeRuleTest(mml, 'StartRoot m plus n EndRoot', 'default');
  this.executeRuleTest(mml, 'StartRoot m plus n EndRoot', 'brief');
  this.executeRuleTest(mml, 'Root m plus n EndRoot', 'sbrief');
};


/**
 * Testing Rule 9.2, Example 1.
 */
sre.MathspeakRuleSubTest.prototype.testSample_9_2_1 = function() {
  var mml = '<mroot><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mrow>' +
      '<mi>m</mi><mo>+</mo><mi>n</mi></mrow></mroot>';
  this.executeRuleTest(mml, 'RootIndex m plus n StartRoot x plus y EndRoot',
                       'default');
  this.executeRuleTest(mml, 'RootIndex m plus n StartRoot x plus y EndRoot',
                       'brief');
  this.executeRuleTest(mml, 'Index m plus n Root x plus y EndRoot', 'sbrief');
};


/**
 * Testing Rule 9.2, Example 2.
 */
sre.MathspeakRuleSubTest.prototype.testSample_9_2_2 = function() {
  var mml = '<mrow><mroot><msup><mi>x</mi><mi>m</mi></msup><mi>n</mi>' +
      '</mroot><mo>=</mo><msup><mfenced separators="" open="(" close=")">' +
      '<mroot><mi>x</mi><mi>n</mi></mroot></mfenced><mi>m</mi></msup>' +
      '<mo>=</mo><msup><mi>x</mi><mfrac><mi>m</mi><mi>n</mi></mfrac>' +
      '</msup><mo>,</mo><mi>x</mi><mo>></mo><mn>0</mn></mrow>';
  this.executeRuleTest(mml, 'RootIndex n StartRoot x Superscript m Baseline' +
                       ' EndRoot equals left-parenthesis RootIndex n' +
                       ' StartRoot x EndRoot right-parenthesis Superscript m' +
                       ' Baseline equals x Superscript StartFraction m Over' +
                       ' n EndFraction Baseline comma x greater-than 0',
                       'default');
  this.executeRuleTest(mml, 'RootIndex n StartRoot x Sup m Base EndRoot' +
                       ' equals left-pren RootIndex n StartRoot x EndRoot' +
                       ' right-pren Sup m Base equals x Sup StartFrac m' +
                       ' Over n EndFrac Base comma x greater-than 0', 'brief');
  this.executeRuleTest(mml, 'Index n Root x Sup m Base EndRoot equals L' +
                       ' pren Index n Root x EndRoot R pren Sup m Base' +
                       ' equals x Sup Frac m Over n EndFrac Base comma x' +
                       ' greater-than 0', 'sbrief');
};


/**
 * Testing Rule 9.2, Example 3.
 */
sre.MathspeakRuleSubTest.prototype.testSample_9_2_3 = function() {
  var mml = '<mrow><mroot><mi>x</mi><mn>3</mn></mroot><mo>=</mo><msup>' +
      '<mi>x</mi><mfrac><mn>1</mn><mn>3</mn></mfrac></msup></mrow>';
  this.executeRuleTest(mml, 'RootIndex 3 StartRoot x EndRoot equals x' +
                       ' Superscript one-third', 'default');
  this.executeRuleTest(mml, 'RootIndex 3 StartRoot x EndRoot equals x Sup' +
                       ' one-third', 'brief');
  this.executeRuleTest(mml, 'Index 3 Root x EndRoot equals x Sup one-third',
                       'sbrief');
};


/**
 * Testing Rule 9.3, Example 1.
 */
sre.MathspeakRuleSubTest.prototype.testSample_9_3_1 = function() {
  var mml = '<msqrt><mrow><msqrt><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow>' +
      '</msqrt><mo>+</mo><msqrt><mrow><mi>y</mi><mo>+</mo><mn>1</mn>' +
      '</mrow></msqrt></mrow></msqrt>';
  this.executeRuleTest(mml, 'NestedStartRoot StartRoot x plus 1 EndRoot plus' +
                       ' StartRoot y plus 1 EndRoot NestedEndRoot', 'default');
  this.executeRuleTest(mml, 'NestStartRoot StartRoot x plus 1 EndRoot plus' +
                       ' StartRoot y plus 1 EndRoot NestEndRoot', 'brief');
  this.executeRuleTest(mml, 'NestRoot Root x plus 1 EndRoot plus Root y plus' +
                       ' 1 EndRoot NestEndRoot', 'sbrief');
};


/**
 * Testing Rule 9.3, Example 2.
 */
sre.MathspeakRuleSubTest.prototype.testSample_9_3_2 = function() {
  var mml = '<mrow><mroot><mroot><mi>x</mi><mi>m</mi></mroot><mi>n</mi>' +
      '</mroot><mo>=</mo><mroot><mroot><mi>x</mi><mi>n</mi></mroot>' +
      '<mi>m</mi></mroot></mrow>';
  this.executeRuleTest(mml, 'NestedRootIndex n NestedStartRoot RootIndex m' +
                       ' StartRoot x EndRoot NestedEndRoot equals' +
                       ' NestedRootIndex m NestedStartRoot RootIndex n' +
                       ' StartRoot x EndRoot NestedEndRoot', 'default');
  this.executeRuleTest(mml, 'NestRootIndex n NestStartRoot RootIndex m' +
                       ' StartRoot x EndRoot NestEndRoot equals' +
                       ' NestRootIndex m NestStartRoot RootIndex n StartRoot' +
                       ' x EndRoot NestEndRoot', 'brief');
  this.executeRuleTest(mml, 'NestIndex n NestRoot Index m Root x EndRoot' +
                       ' NestEndRoot equals NestIndex m NestRoot Index n' +
                       ' Root x EndRoot NestEndRoot', 'sbrief');
};


/**
 * Testing Rule 9.3, Example 3.
 */
sre.MathspeakRuleSubTest.prototype.testSample_9_3_3 = function() {
  var mml = '<mrow><msup><mi>x</mi><mrow><mi>e</mi><mo>-</mo><mn>2</mn>' +
      '</mrow></msup><mo>=</mo><msqrt><mrow><mi>x</mi><mroot><mrow>' +
      '<mi>x</mi><mroot><mrow><mi>x</mi><mroot><mrow><mi>x</mi>' +
      '<mo>&#x2026;</mo></mrow><mn>5</mn></mroot></mrow><mn>4</mn></mroot>' +
      '</mrow><mn>3</mn></mroot></mrow></msqrt><mo>,</mo><mi>x</mi>' +
      '<mo>∈</mo><mi>ℝ</mi></mrow>';
  this.executeRuleTest(mml, 'x Superscript e minus 2 Baseline equals' +
                       ' Nested3StartRoot x NestedTwiceRootIndex 3' +
                       ' NestedTwiceStartRoot x NestedRootIndex 4' +
                       ' NestedStartRoot x RootIndex 5 StartRoot x ellipsis' +
                       ' EndRoot NestedEndRoot NestedTwiceEndRoot' +
                       ' Nested3EndRoot comma x element-of double-struck' +
                       ' upper R', 'default');
  this.executeRuleTest(mml, 'x Sup e minus 2 Base equals Nest3StartRoot x' +
                       ' NestTwiceRootIndex 3 NestTwiceStartRoot x' +
                       ' NestRootIndex 4 NestStartRoot x RootIndex 5' +
                       ' StartRoot x ellipsis EndRoot NestEndRoot' +
                       ' NestTwiceEndRoot Nest3EndRoot comma x element-of' +
                       ' double-struck upper R', 'brief');
  this.executeRuleTest(mml, 'x Sup e minus 2 Base equals Nest3Root x' +
                       ' NestTwiceIndex 3 NestTwiceRoot x NestIndex 4' +
                       ' NestRoot x Index 5 Root x ellipsis EndRoot' +
                       ' NestEndRoot NestTwiceEndRoot Nest3EndRoot comma x' +
                       ' element-of double-struck upper R', 'sbrief');
};


/**
 * Testing Rule 9.3, Example 4.
 */
sre.MathspeakRuleSubTest.prototype.testSample_9_3_4 = function() {
  var mml = '<mrow><mfrac><mn>2</mn><mi>π</mi></mfrac><mo>=</mo>' +
      '<mfrac><msqrt><mn>2</mn></msqrt><mn>2</mn></mfrac>' +
      '<mfrac><msqrt><mrow><mn>2</mn><mo>+</mo><msqrt><mn>2</mn></msqrt>' +
      '</mrow></msqrt><mn>2</mn></mfrac><mfrac><msqrt><mrow><mn>2</mn>' +
      '<mo>+</mo><msqrt><mrow><mn>2</mn><mo>+</mo><msqrt><mn>2</mn>' +
      '</msqrt></mrow></msqrt></mrow></msqrt><mn>2</mn></mfrac>' +
      '<mo>&#x2026;</mo></mrow>';
  this.executeRuleTest(mml, 'StartFraction 2 Over pi EndFraction equals' +
                       ' StartFraction StartRoot 2 EndRoot Over 2' +
                       ' EndFraction StartFraction NestedStartRoot 2 plus' +
                       ' StartRoot 2 EndRoot NestedEndRoot Over 2' +
                       ' EndFraction StartFraction NestedTwiceStartRoot 2' +
                       ' plus NestedStartRoot 2 plus StartRoot 2 EndRoot' +
                       ' NestedEndRoot NestedTwiceEndRoot Over 2 EndFraction' +
                       ' ellipsis', 'default');
  this.executeRuleTest(mml, 'StartFrac 2 Over pi EndFrac equals StartFrac' +
                       ' StartRoot 2 EndRoot Over 2 EndFrac StartFrac' +
                       ' NestStartRoot 2 plus StartRoot 2 EndRoot' +
                       ' NestEndRoot Over 2 EndFrac StartFrac' +
                       ' NestTwiceStartRoot 2 plus NestStartRoot 2 plus' +
                       ' StartRoot 2 EndRoot NestEndRoot NestTwiceEndRoot' +
                       ' Over 2 EndFrac ellipsis', 'brief');
  this.executeRuleTest(mml, 'Frac 2 Over pi EndFrac equals Frac Root 2' +
                       ' EndRoot Over 2 EndFrac Frac NestRoot 2 plus Root 2' +
                       ' EndRoot NestEndRoot Over 2 EndFrac Frac' +
                       ' NestTwiceRoot 2 plus NestRoot 2 plus Root 2 EndRoot' +
                       ' NestEndRoot NestTwiceEndRoot Over 2 EndFrac' +
                       ' ellipsis', 'sbrief');
};



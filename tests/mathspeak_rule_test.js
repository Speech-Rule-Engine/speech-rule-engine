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

goog.provide('sre.MathspeakRuleTest');

goog.require('sre.AbstractTest');



/**
 * @constructor
 * @extends {sre.AbstractTest}
 */
sre.MathspeakRuleTest = function() {
  goog.base(this);

  /**
   * @override
   */
  this.information = 'Mathspeak rule tests.';
};
goog.inherits(sre.MathspeakRuleTest, sre.AbstractTest);


/**
 * Tests if for a given html snippet the applicable rule is indeed the same
 * as the one provided.
 * @param {string} mml Snippet of a MathML expression.
 * @param {string} answer Expected speech translation of MathML expression.
 * @param {string} style Mathspeak style for translation.
 */
sre.MathspeakRuleTest.prototype.executeRuleTest = function(mml, answer, style) {
  var mathMl = '<math xmlns="http://www.w3.org/1998/Math/MathML">' +
          mml + '</math>';
  sre.System.getInstance().setupEngine({semantics: true,
    domain: 'mathspeak',
    style: style});
  var result = sre.System.getInstance().processExpression(mathMl);
  this.assert.equal(result, answer);
};


// In the following default is the verbose version of MathSpeak.
/**
 * Testing Rule 1.1, Example 1.
 */
sre.MathspeakRuleTest.prototype.testSample_1_1_1 = function() {
  var mml = '<mrow><mi>π</mi><mo>≈</mo><mn>3.14159</mn></mrow>';
  this.executeRuleTest(mml, 'pi almost equals 3.14159', 'default');
  this.executeRuleTest(mml, 'pi almost equals 3.14159', 'brief');
  this.executeRuleTest(mml, 'pi almost equals 3.14159', 'sbrief');
};


/**
 * Testing Rule 1.1, Example 2.
 */
sre.MathspeakRuleTest.prototype.testSample_1_1_2 = function() {
  var mml = '<mrow><mn>102</mn><mo>+</mo><mn>2,214</mn><mo>+</mo><mn>15</mn>' +
      '<mo>=</mo><mn>2,331</mn></mrow>';
  this.executeRuleTest(mml, '102 plus 2,214 plus 15 equals 2,331', 'default');
  this.executeRuleTest(mml, '102 plus 2,214 plus 15 equals 2,331', 'brief');
  this.executeRuleTest(mml, '102 plus 2,214 plus 15 equals 2,331', 'sbrief');
};


/**
 * Testing Rule 1.1, Example 3.
 */
sre.MathspeakRuleTest.prototype.testSample_1_1_3 = function() {
  var mml = '<mrow><mn>59</mn><mo>×</mo><mn>0</mn><mo>=</mo><mn>0</mn></mrow>';
  this.executeRuleTest(mml, '59 times 0 equals 0', 'default');
  this.executeRuleTest(mml, '59 times 0 equals 0', 'brief');
  this.executeRuleTest(mml, '59 times 0 equals 0', 'sbrief');
};


/**
 * Testing Rule 1.2, Example 1.
 */
sre.MathspeakRuleTest.prototype.testSample_1_2_1 = function() {
  var mml = '<mrow><mn>3</mn><mo>-</mo><mo>-</mo><mn>2</mn></mrow>';
  this.executeRuleTest(mml, '3 minus negative 2', 'default');
  this.executeRuleTest(mml, '3 minus negative 2', 'brief');
  this.executeRuleTest(mml, '3 minus negative 2', 'sbrief');
};


/**
 * Testing Rule 1.2, Example 2.
 */
sre.MathspeakRuleTest.prototype.testSample_1_2_2 = function() {
  var mml = '<mrow><mo>-</mo><mi>y</mi></mrow>';
  this.executeRuleTest(mml, 'negative y', 'default');
  this.executeRuleTest(mml, 'negative y', 'brief');
  this.executeRuleTest(mml, 'negative y', 'sbrief');
};


/**
 * Testing Rule 1.2, Example 3.
 */
sre.MathspeakRuleTest.prototype.testSample_1_2_3 = function() {
  var mml = '<mrow><mo>-</mo><mn>32</mn></mrow>';
  this.executeRuleTest(mml, 'negative 32', 'default');
  this.executeRuleTest(mml, 'negative 32', 'brief');
  this.executeRuleTest(mml, 'negative 32', 'sbrief');
};


/**
 * Testing Rule 1.4, Example 1.
 */
sre.MathspeakRuleTest.prototype.testSample_1_4_1 = function() {
  var mml = '<mrow><mn>t2e4</mn></mrow>';
  this.executeRuleTest(mml, 'Number t 2 e 4', 'default');
  this.executeRuleTest(mml, 'Num t 2 e 4', 'brief');
  this.executeRuleTest(mml, 'Num t 2 e 4', 'sbrief');
};


/**
 * Testing Rule 1.4, Example 2.
 */
sre.MathspeakRuleTest.prototype.testSample_1_4_2 = function() {
  var mml = '<mrow><mn>#FF0000</mn></mrow>';
  this.executeRuleTest(mml, 'Number number sign F F 0 0 0 0', 'default');
  this.executeRuleTest(mml, 'Num num sign F F 0 0 0 0', 'brief');
  this.executeRuleTest(mml, 'Num num sign F F 0 0 0 0', 'sbrief');
};


/**
 * Testing Rule 1.4, Example 3.
 */
sre.MathspeakRuleTest.prototype.testSample_1_4_3 = function() {
  var mml = '<mrow><mn>0x15FF</mn><mo>+</mo><mn>0x2B01</mn><mo>=</mo>' +
      '<mn>0x4100</mn></mrow>';
  this.executeRuleTest(mml, 'Number 0 x 1 5 F F plus Number 0 x 2 B 0 1' +
                       ' equals Number 0 x 4 1 0 0', 'default');
  this.executeRuleTest(mml, 'Num 0 x 1 5 F F plus Num 0 x 2 B 0 1 equals Num' +
                       ' 0 x 4 1 0 0', 'brief');
  this.executeRuleTest(mml, 'Num 0 x 1 5 F F plus Num 0 x 2 B 0 1 equals Num' +
                       ' 0 x 4 1 0 0', 'sbrief');
};


/**
 * Testing Rule 1.5, Example 1.
 */
sre.MathspeakRuleTest.prototype.testSample_1_5_1 = function() {
  var mml = '<mrow><mn>I</mn><mo>,</mo><mn>II</mn><mo>,</mo><mn>III</mn>' +
      '<mo>,</mo><mn>IV</mn><mo>,</mo><mn>V</mn><mo>.</mo></mrow>';
  this.executeRuleTest(mml, 'upper I comma UpperWord I I comma UpperWord I I' +
                       ' I comma UpperWord I V comma upper V period',
                       'default');
  this.executeRuleTest(mml, 'upper I comma UpperWord I I comma UpperWord I I' +
                       ' I comma UpperWord I V comma upper V period', 'brief');
  this.executeRuleTest(mml, 'upper I comma UpperWord I I comma UpperWord I I' +
                       ' I comma UpperWord I V comma upper V period', 'sbrief');
};


// Not yet possible, as we do not yet handle mstack.
/**
 * Testing Rule 1.6, Example 1.
 */
sre.MathspeakRuleTest.prototype.untestSample_1_6_1 = function() {
  var mml = '<mrow><mfrac><mn>22</mn><mn>7</mn></mfrac><mo>=</mo>' +
      '<mstack stackalign="right"><msline length="6"/><mn>3.142857</mn>' +
      '</mstack></mrow>';
  this.executeRuleTest(mml, 'startfraction 22 over 7 endfraction equals 3' +
                       ' point modifyingabove 1 4 2 8 5 7 with bar',
                       'default');
  this.executeRuleTest(mml, 'startfrac 22 over 7 endfrac equals 3 point' +
                       ' modabove 1 4 2 8 5 7 with bar', 'brief');
  this.executeRuleTest(mml, 'frac 22 over 7 endfrac equals 3 point modabove' +
                       ' 1 4 2 8 5 7 with bar', 'sbrief');
};


/**
 * Testing Rule 2.1, Example 1.
 */
sre.MathspeakRuleTest.prototype.untestSample_2_1_1 = function() {
  var mml = '<mrow><mi>d</mi><mo>=</mo><msqrt><mrow><msup><mrow><mo>(</mo>' +
      '<mi>X</mi><mo>-</mo><mi>x</mi><mo>)</mo></mrow><mn>2</mn></msup>' +
      '<mo>-</mo><msup><mrow><mo>(</mo><mi>Y</mi><mo>-</mo><mi>y</mi>' +
      '<mo>)</mo></mrow><mn>2</mn></msup></mrow></msqrt></mrow>';
  this.executeRuleTest(mml, 'd equals startroot left-parenthesis upper x' +
                       ' minus x right-parenthesis squared minus' +
                       ' left-parenthesis upper y minus y right-parenthesis' +
                       ' squared endroot', 'default');
  this.executeRuleTest(mml, 'd equals startroot left-pren upper x minus x' +
                       ' right-pren squared minus left-pren upper y minus' +
                       ' y right-pren squared endroot', 'brief');
  this.executeRuleTest(mml, 'd equals root l pren upper x minus x r pren' +
                       ' squared minus l pren upper y minus y r pren' +
                       ' squared endroot', 'sbrief');
};


/**
 * Testing Rule 2.3, Example 1.
 */
sre.MathspeakRuleTest.prototype.testSample_2_3_1 = function() {
  var mml = '<mrow><mtext>If</mtext><mspace width="4.pt"/><mi>A</mi>' +
      '<mo>→</mo><mi>B</mi><mspace width="4.pt"/><mtext>and</mtext>' +
      '<mspace width="4.pt"/><mi>B</mi><mo>→</mo><mi>C</mi>' +
      '<mspace width="4.pt"/><mtext>then</mtext><mspace width="4.pt"/>' +
      '<mi>A</mi><mo>→</mo><mi>C</mi><mo>.</mo></mrow>';
  this.executeRuleTest(mml, 'If upper A right-arrow upper B and upper B' +
                       ' right-arrow upper C then upper A right-arrow upper C' +
                       ' period', 'default');
  this.executeRuleTest(mml, 'If upper A right-arrow upper B and upper B' +
                       ' right-arrow upper C then upper A right-arrow upper' +
                       ' C period', 'brief');
  this.executeRuleTest(mml, 'If upper A r arrow upper B and upper B r arrow' +
                       ' upper C then upper A r arrow upper C period',
                       'sbrief');
};


/**
 * Testing Rule 2.6, Example 1.
 */
sre.MathspeakRuleTest.prototype.untestSample_2_6_1 = function() {
  var mml = '<mrow><mo mathvariant="bold">[</mo><mi>x</mi>' +
      '<mo mathvariant="bold">]</mo></mrow>';
  this.executeRuleTest(mml, 'bold left-bracket x bold right-bracket',
                       'default');
  this.executeRuleTest(mml, 'bold left-brack x bold right-brack', 'brief');
  this.executeRuleTest(mml, 'bold l brack x bold r brack', 'sbrief');
};


/**
 * Testing Rule 2.6, Example 2.
 */
sre.MathspeakRuleTest.prototype.untestSample_2_6_2 = function() {
  var mml = '<mrow><mo>∮</mo><mi>E</mi><mo>·</mo><mi>d</mi><mi>I</mi>' +
      '<mo>=</mo><mfrac><mrow><mi>d</mi><mi>Φ</mi><mi>B</mi></mrow><mrow>' +
      '<mi>d</mi><mi>t</mi></mrow></mfrac></mrow>';
  this.executeRuleTest(mml, 'contour integral upper e dot d bold l equals' +
                       ' minus startfraction d upper phi upper b over d t' +
                       ' endfraction', 'default');
  this.executeRuleTest(mml, 'contour integral upper e dot d bold l equals' +
                       ' minus startfrac d upper phi upper b over d t' +
                       ' endfrac', 'brief');
  this.executeRuleTest(mml, 'contour integral upper e dot d bold l equals' +
                       ' minus frac d upper phi upper b over d t endfrac',
                       'sbrief');
};


/**
 * Testing Rule 4.2, Example 1.
 */
sre.MathspeakRuleTest.prototype.testSample_4_2_1 = function() {
  var mml = '<mrow><mi> Uppercase </mi><mo>(</mo><mo>{</mo><mi>α</mi>' +
      '<mo>,</mo><mi>β</mi><mo>,</mo><mi>γ</mi><mo>,</mo><mi>δ</mi>' +
      '<mo>,</mo><mi>ϵ</mi><mo>,</mo><mi>φ</mi><mo>}</mo><mo>)</mo>' +
      '<mo>=</mo><mo>{</mo><mi>Α</mi><mo>,</mo><mi>Β</mi><mo>,</mo>' +
      '<mi>Γ</mi><mo>,</mo><mi>Δ</mi><mo>,</mo><mi>Ε</mi><mo>,</mo>' +
      '<mi>Φ</mi><mo>}</mo></mrow>';
  this.executeRuleTest(mml, 'Uppercase left-parenthesis startset alpha comma' +
                       ' beta comma gamma comma delta comma epsilon comma phi' +
                       ' endset right-parenthesis equals startset upper' +
                       ' Alpha comma upper Beta comma upper Gamma comma upper' +
                       ' Delta comma upper Epsilon comma upper Phi endset',
                       'default');
  this.executeRuleTest(mml, 'Uppercase left-pren startset alpha comma beta' +
                       ' comma gamma comma delta comma epsilon comma phi' +
                       ' endset right-pren equals startset upper Alpha' +
                       ' comma upper Beta comma upper Gamma comma upper Delta' +
                       ' comma upper Epsilon comma upper Phi endset', 'brief');
  this.executeRuleTest(mml, 'Uppercase l pren set alpha comma beta comma' +
                       ' gamma comma delta comma epsilon comma phi endset r' +
                       ' pren equals set upper Alpha comma upper Beta comma' +
                       ' upper Gamma comma upper Delta comma upper Epsilon' +
                       ' comma upper Phi endset', 'sbrief');
};


/**
 * Testing Rule 5.1, Example 1.
 */
sre.MathspeakRuleTest.prototype.testSample_5_1_1 = function() {
  var mml = '<mrow><mi>y</mi><mo>-</mo><mn>1</mn></mrow>';
  this.executeRuleTest(mml, 'y minus 1', 'default');
  this.executeRuleTest(mml, 'y minus 1', 'brief');
  this.executeRuleTest(mml, 'y minus 1', 'sbrief');
};


/**
 * Testing Rule 5.1, Example 2.
 */
sre.MathspeakRuleTest.prototype.testSample_5_1_2 = function() {
  var mml = '<mrow><mo>(</mo><mn>1</mn><mtext>-to-</mtext>' +
      '<mn>1</mn><mo>)</mo></mrow>';
  this.executeRuleTest(mml, 'left-parenthesis 1 hyphen to hyphen 1' +
                       ' right-parenthesis', 'default');
  this.executeRuleTest(mml, 'left-pren 1 hyphen to hyphen 1 right-pren',
                       'brief');
  this.executeRuleTest(mml, 'l pren 1 hyphen to hyphen 1 r pren', 'sbrief');
};


/**
 * Testing Rule 5.1, Example 3.
 */
sre.MathspeakRuleTest.prototype.testSample_5_1_3 = function() {
  var mml = '<mrow><mo>-</mo><mn>1</mn></mrow>';
  this.executeRuleTest(mml, 'negative 1', 'default');
  this.executeRuleTest(mml, 'negative 1', 'brief');
  this.executeRuleTest(mml, 'negative 1', 'sbrief');
};


/**
 * Testing Rule 6.1, Example 1.
 */
sre.MathspeakRuleTest.prototype.untestSample_6_1_1 = function() {
  var mml = '<mtext>The Fibonacci numbers are: </mtext><mrow><mo>{</mo>' +
      '<mn>0</mn><mo>,</mo><mn>1</mn><mo>,</mo><mn>1</mn><mo>,</mo>' +
      '<mn>2</mn><mo>,</mo><mn>3</mn><mo>,</mo><mn>5</mn><mo>,</mo>' +
      '<mn>8</mn><mo>,</mo><mo>...</mo><mo>}</mo></mrow>';
  this.executeRuleTest(mml, 'the fibonacci numbers are colon startset 0' +
                       ' comma 1 comma 1 comma 2 comma 3 comma 5 comma 8' +
                       ' comma ellipsis endset', 'default');
  this.executeRuleTest(mml, 'the fibonacci numbers are colon startset 0' +
                       ' comma 1 comma 1 comma 2 comma 3 comma 5 comma 8' +
                       ' comma ellipsis endset', 'brief');
  this.executeRuleTest(mml, 'the fibonacci numbers are colon set 0 comma 1' +
                       ' comma 1 comma 2 comma 3 comma 5 comma 8 comma' +
                       ' ellipsis endset', 'sbrief');
};


/**
 * Testing Rule 6.2, Example 1.
 */
sre.MathspeakRuleTest.prototype.testSample_6_2_1 = function() {
  var mml = '<mrow><mo>|</mo><mn>4</mn><mo>-</mo><mn>7</mn><mo>|</mo>' +
      '<mo>=</mo><mn>3</mn></mrow>';
  this.executeRuleTest(mml, 'startabsolutevalue 4 minus 7 endabsolutevalue' +
                       ' equals 3', 'default');
  this.executeRuleTest(mml, 'startabsolutevalue 4 minus 7 endabsolutevalue' +
                       ' equals 3', 'brief');
  this.executeRuleTest(mml, 'absolutevalue 4 minus 7 endabsolutevalue equals' +
                       ' 3', 'sbrief');
};


/**
 * Testing Rule 6.2, Example 2.
 */
sre.MathspeakRuleTest.prototype.untestSample_6_2_2 = function() {
  var mml = '<mrow><mfenced separators="" open="|" close="|"><mi>a</mi>' +
      '<mfenced separators="" open="|" close="|"><mo>±</mo><mi>b</mi>' +
      '</mfenced><mo>-</mo><mn>15</mn></mfenced><mo>≠</mo>' +
      '<mfenced open="|" close="|"><mi>a</mi></mfenced><mo>±</mo>' +
      '<mi>b</mi><mfenced separators="" open="|" close="|"><mo>-</mo>' +
      '<mn>15</mn></mfenced></mrow>';
  this.executeRuleTest(mml, 'startabsolutevalue a startabsolutevalue' +
                       ' plus-or-minus b endabsolutevalue minus 15' +
                       ' endabsolutevalue not-equals startabsolutevalue a' +
                       ' endabsolutevalue plus-or-minus b startabsolutevalue' +
                       ' minus 15 endabsolutevalue', 'default');
  this.executeRuleTest(mml, 'startabsolutevalue a startabsolutevalue' +
                       ' plus-or-minus b endabsolutevalue minus 15' +
                       ' endabsolutevalue not-equals startabsolutevalue a' +
                       ' endabsolutevalue plus-or-minus b startabsolutevalue' +
                       ' minus 15 endabsolutevalue', 'brief');
  this.executeRuleTest(mml, 'absolutevalue a absolutevalue plus-or-minus b' +
                       ' endabsolutevalue minus 15 endabsolutevalue' +
                       ' not-equals absolutevalue a endabsolutevalue' +
                       ' plus-or-minus b absolutevalue minus 15' +
                       ' endabsolutevalue', 'sbrief');
};


/**
 * Testing Rule 7.1, Example 1.
 */
sre.MathspeakRuleTest.prototype.untestSample_7_1_1 = function() {
  var mml = '<mfrac><mn>1</mn><mi>x</mi></mfrac>';
  this.executeRuleTest(mml, 'startfraction 1 over x endfraction', 'default');
  this.executeRuleTest(mml, 'startfrac 1 over x endfrac', 'brief');
  this.executeRuleTest(mml, 'frac 1 over x endfrac', 'sbrief');
};


/**
 * Testing Rule 7.1, Example 2.
 */
sre.MathspeakRuleTest.prototype.untestSample_7_1_2 = function() {
  var mml = '<mrow><mi>a</mi><mo>-</mo><mfrac><mrow><mi>b</mi><mo>+</mo>' +
      '<mi>c</mi></mrow><mrow><mi>d</mi><mo>-</mo><mi>e</mi></mrow>' +
      '</mfrac><mo>×</mo><mi>f</mi></mrow>';
  this.executeRuleTest(mml, 'a minus startfraction b plus c over d minus e' +
                       ' endfraction times f', 'default');
  this.executeRuleTest(mml, 'a minus startfrac b plus c over d minus e' +
                       ' endfrac times f', 'brief');
  this.executeRuleTest(mml, 'a minus frac b plus c over d minus e endfrac' +
                       ' times f', 'sbrief');
};


/**
 * Testing Rule 7.2, Example 1.
 */
sre.MathspeakRuleTest.prototype.untestSample_7_2_1 = function() {
  var mml = '<mrow><mfrac><mfrac><mi>x</mi><mi>y</mi></mfrac><mi>z</mi>' +
      '</mfrac><mo>≠</mo><mfrac><mi>x</mi><mfrac><mi>y</mi><mi>z</mi>' +
      '</mfrac></mfrac></mrow>';
  this.executeRuleTest(mml, 'startstartfraction startfraction x over y' +
                       ' endfraction overover z endendfraction not-equals' +
                       ' startstartfraction x overover startfraction y over' +
                       ' z endfraction endendfraction', 'default');
  this.executeRuleTest(mml, 'startstartfrac startfrac x over y endfrac' +
                       ' overover z endendfrac not-equals startstartfrac x' +
                       ' overover startfrac y over z endfrac endendfrac',
                       'brief');
  this.executeRuleTest(mml, 'nestfrac frac x over y endfrac nestover z' +
                       ' nestendfrac not-equals nestfrac x nestover frac y' +
                       ' over z endfrac nestendfrac', 'sbrief');
};


/**
 * Testing Rule 7.3, Example 1.
 */
sre.MathspeakRuleTest.prototype.untestSample_7_3_1 = function() {
  var mml = '<mfrac><mfrac><mrow><mfenced separators="" open="(" close=")">' +
      '<mn>1</mn><mo>-</mo><mi>x</mi></mfenced><mfrac><mi>d</mi><mrow>' +
      '<mi>d</mi><mi>x</mi></mrow></mfrac>' +
      '<mfenced separators="" open="(" close=")"><mn>2</mn><mi>x</mi>' +
      '</mfenced><mo>-</mo><mn>2</mn><mi>x</mi><mfrac><mi>d</mi><mrow>' +
      '<mi>d</mi><mi>x</mi></mrow></mfrac>' +
      '<mfenced separators="" open="(" close=")"><mn>1</mn><mo>-</mo>' +
      '<mi>x</mi></mfenced></mrow><msup>' +
      '<mfenced separators="" open="(" close=")"><mn>1</mn><mo>-</mo>' +
      '<mi>x</mi></mfenced><mn>2</mn></msup></mfrac><mrow><mn>1</mn>' +
      '<mo>+</mo><msup><mfenced separators="" open="(" close=")"><mfrac>' +
      '<mrow><mn>2</mn><mi>x</mi></mrow><mrow><mn>1</mn><mo>-</mo>' +
      '<mi>x</mi></mrow></mfrac></mfenced><mn>2</mn></msup></mrow></mfrac>';
  this.executeRuleTest(mml, 'startstartstartfraction startstartfraction' +
                       ' left-parenthesis 1 minus x right-parenthesis' +
                       ' startfraction d over d x endfraction' +
                       ' left-parenthesis 2 x right-parenthesis minus 2 x' +
                       ' startfraction d over d x endfraction' +
                       ' left-parenthesis 1 minus x right-parenthesis' +
                       ' overover left-parenthesis 1 minus x' +
                       ' right-parenthesis squared endendfraction' +
                       ' overoverover 1 plus left-parenthesis startfraction' +
                       ' 2 x over 1 minus x endfraction right-parenthesis' +
                       ' squared endendendfraction', 'default');
  this.executeRuleTest(mml, 'startstartstartfrac startstartfrac left-pren 1' +
                       ' minus x right-pren startfrac d over d x endfrac' +
                       ' left-pren 2 x right-pren minus 2 x startfrac d' +
                       ' over d x endfrac left-pren 1 minus x right-pren' +
                       ' overover left-pren 1 minus x right-pren squared' +
                       ' endendfrac overoverover 1 plus left-pren startfrac' +
                       ' 2 x over 1 minus x endfrac right-pren squared' +
                       ' endendendfrac', 'brief');
  this.executeRuleTest(mml, 'nesttwicefrac nestfrac l pren 1 minus x r' +
                       ' pren frac d over d x endfrac l pren 2 x r pren' +
                       ' minus 2 x frac d over d x endfrac l pren 1 minus x' +
                       ' r pren nestover l pren 1 minus x r pren squared' +
                       ' nestendfrac nesttwiceover 1 plus l pren frac 2 x' +
                       ' over 1 minus x endfrac r pren squared' +
                       ' nesttwiceendfrac', 'sbrief');
};


/**
 * Testing Rule 7.3, Example 2.
 */
sre.MathspeakRuleTest.prototype.untestSample_7_3_2 = function() {
  var mml = '<mrow><msub><mi>a</mi><mn>0</mn></msub><mo>+</mo><mfrac>' +
      '<mn>1</mn><mrow><msub><mi>a</mi><mn>1</mn></msub><mo>+</mo><mfrac>' +
      '<mn>1</mn><mrow><msub><mi>a</mi><mn>2</mn></msub><mo>+</mo><mfrac>' +
      '<mn>1</mn><mrow><mo>...</mo><mo>+</mo><mfrac><mn>1</mn><msub>' +
      '<mi>a</mi><mi>n</mi></msub></mfrac></mrow></mfrac></mrow></mfrac>' +
      '</mrow></mfrac></mrow>';
  this.executeRuleTest(mml, 'a 0 plus startstartstartstartfraction 1' +
                       ' overoveroverover a 1 plus startstartstartfraction 1' +
                       ' overoverover a 2 plus startstartfraction 1 overover' +
                       ' ellipsis plus startfraction 1 over a subscript n' +
                       ' baseline endfraction endendfraction' +
                       ' endendendfraction endendendendfraction', 'default');
  this.executeRuleTest(mml, 'a 0 plus startstartstartstartfrac 1' +
                       ' overoveroverover a 1 plus startstartstartfrac 1' +
                       ' overoverover a 2 plus startstartfrac 1 overover' +
                       ' ellipsis plus startfrac 1 over a sub n base endfrac' +
                       ' endendfrac endendendfrac endendendendfrac', 'brief');
  this.executeRuleTest(mml, 'a 0 plus nest3frac 1 nest3over a 1 plus' +
                       ' nesttwicefrac 1 nesttwiceover a 2 plus nestfrac 1' +
                       ' nestover ellipsis plus frac 1 over a sub n base' +
                       ' endfrac nestendfrac nesttwiceendfrac nest3endfrac',
                       'sbrief');
};


/**
 * Testing Rule 7.4, Example 1.
 */
sre.MathspeakRuleTest.prototype.untestSample_7_4_1 = function() {
  var mml = '<mrow><mfrac><mn>1</mn><mn>2</mn></mfrac><mo>+</mo><mfrac>' +
      '<mn>2</mn><mn>2</mn></mfrac><mo>+</mo><mfrac><mn>3</mn><mn>2</mn>' +
      '</mfrac><mo>+</mo><mfrac><mn>4</mn><mn>2</mn></mfrac><mo>+</mo>' +
      '<mo>...</mo><mo>=</mo><munderover><mo>∑</mo><mrow><mi>n</mi>' +
      '<mo>=</mo><mn>1</mn></mrow>' +
      '<mo movablelimits="true" form="prefix">inf</mo></munderover><mfrac>' +
      '<mi>n</mi><mn>2</mn></mfrac></mrow>';
  this.executeRuleTest(mml, 'one-half plus two-halves plus three-halves plus' +
                       ' four-halves plus ellipsis equals sigma-summation' +
                       ' underscript n equals 1 overscript infinity' +
                       ' endscripts startfraction n over 2 endfraction',
                       'default');
  this.executeRuleTest(mml, 'one-half plus two-halves plus three-halves plus' +
                       ' four-halves plus ellipsis equals sigma-summation' +
                       ' underscript n equals 1 overscript infinity' +
                       ' endscripts startfrac n over 2 endfrac', 'brief');
  this.executeRuleTest(mml, 'one-half plus two-halves plus three-halves plus' +
                       ' four-halves plus ellipsis equals sigma-summation' +
                       ' underscript n equals 1 overscript infinity' +
                       ' endscripts frac n over 2 endfrac', 'sbrief');
};


/**
 * Testing Rule 7.4, Example 2.
 */
sre.MathspeakRuleTest.prototype.untestSample_7_4_2 = function() {
  var mml = '<mrow><mfrac><mn>20</mn><mn>5</mn></mfrac><mo>×</mo><mfrac>' +
      '<mn>1</mn><mn>100</mn></mfrac><mo>=</mo><mfrac><mn>1</mn>' +
      '<mn>25</mn></mfrac></mrow>';
  this.executeRuleTest(mml, 'startfraction 20 over 5 endfraction times' +
                       ' startfraction 1 over 100 endfraction equals' +
                       ' one-twenty-fifth', 'default');
  this.executeRuleTest(mml, 'startfrac 20 over 5 endfrac times startfrac 1' +
                       ' over 100 endfrac equals one-twenty-fifth', 'brief');
  this.executeRuleTest(mml, 'frac 20 over 5 endfrac times frac 1 over 100' +
                       ' endfrac equals one-twenty-fifth', 'sbrief');
};


/**
 * Testing Rule 7.4, Example 3.
 */
sre.MathspeakRuleTest.prototype.untestSample_7_4_3 = function() {
  var mml = '<mrow><mfrac><mfrac><mn>3</mn><mn>5</mn></mfrac><mn>8</mn>' +
      '</mfrac><mo>=</mo><mfrac><mn>3</mn><mn>5</mn></mfrac><mo>×</mo>' +
      '<mfrac><mn>1</mn><mn>8</mn></mfrac></mrow>';
  this.executeRuleTest(mml, 'startfraction three-fifths over 8 endfraction' +
                       ' equals three-fifths times one-eighth', 'default');
  this.executeRuleTest(mml, 'startfrac three-fifths over 8 endfrac equals' +
                       ' three-fifths times one-eighth', 'brief');
  this.executeRuleTest(mml, 'frac three-fifths over 8 endfrac equals' +
                       ' three-fifths times one-eighth', 'sbrief');
};


/**
 * Testing Rule 7.5, Example 1.
 */
sre.MathspeakRuleTest.prototype.untestSample_7_5_1 = function() {
  var mml = '<mrow><mn>3</mn><mfrac><mn>5</mn><mn>8</mn></mfrac><mo>=</mo>' +
      '<mfrac><mn>29</mn><mn>8</mn></mfrac></mrow>';
  this.executeRuleTest(mml, '3 and five-eighths equals startfraction 29 over' +
                       ' 8 endfraction', 'default');
  this.executeRuleTest(mml, '3 and five-eighths equals startfrac 29 over 8' +
                       ' endfrac', 'brief');
  this.executeRuleTest(mml, '3 and five-eighths equals frac 29 over 8' +
                       ' endfrac', 'sbrief');
};


/**
 * Testing Rule 7.6, Example 1.
 */
sre.MathspeakRuleTest.prototype.untestSample_7_6_1 = function() {
  var mml = '<mrow><msub><mi>a</mi><mn>0</mn></msub><mo>+</mo><mfrac><msub>' +
      '<mi>b</mi><mn>1</mn></msub><mrow><msub><mi>a</mi><mn>1</mn></msub>' +
      '<mo>+</mo><mfrac><msub><mi>b</mi><mn>2</mn></msub><mrow><msub>' +
      '<mi>a</mi><mn>2</mn></msub><mo>+</mo><mfrac><msub><mi>b</mi>' +
      '<mn>3</mn></msub><mrow><msub><mi>a</mi><mn>3</mn></msub><mo>+</mo>' +
      '<mo>...</mo></mrow></mfrac></mrow></mfrac></mrow></mfrac><mo>=</mo>' +
      '<msub><mi>a</mi><mn>0</mn></msub><mo>+</mo><mfrac><msub><mi>b</mi>' +
      '<mn>1</mn></msub><msub><mi>a</mi><mn>1</mn></msub></mfrac>' +
      '<mo>+</mo><mfrac><msub><mi>b</mi><mn>2</mn></msub><msub><mi>a</mi>' +
      '<mn>2</mn></msub></mfrac><mo>+</mo><mo>...</mo></mrow>';
  this.executeRuleTest(mml, 'a 0 plus continuedfraction b 1 over a 1 plus' +
                       ' startfraction b 2 over a 2 plus startfraction b 3' +
                       ' over a 3 plus ellipsis equals a 0 plus' +
                       ' startfraction b 1 over a 1 endfraction plus' +
                       ' startfraction b 2 over a 2 endfraction plus ellipsis',
                       'default');
  this.executeRuleTest(mml, 'a 0 plus continuedfrac b 1 over a 1 plus' +
                       ' startfrac b 2 over a 2 plus startfrac b 3 over a 3' +
                       ' plus ellipsis equals a 0 plus startfrac b 1 over a' +
                       ' 1 endfrac plus startfrac b 2 over a 2 endfrac plus' +
                       ' ellipsis', 'brief');
  this.executeRuleTest(mml, 'a 0 plus continuedfrac b 1 over a 1 plus frac b' +
                       ' 2 over a 2 plus frac b 3 over a 3 plus ellipsis' +
                       ' equals a 0 plus frac b 1 over a 1 endfrac plus frac' +
                       ' b 2 over a 2 endfrac plus ellipsis', 'sbrief');
};


/**
 * Testing Rule 8.10, Example 1.
 */
sre.MathspeakRuleTest.prototype.untestSample_8_10_1 = function() {
  var mml = '<mrow><msup><mi>ρ</mi><mo>\'</mo></msup><mo>=</mo><msubsup>' +
      '<mi>ρ</mi><mo>+</mo><mo>\'</mo></msubsup><mo>+</mo><msubsup>' +
      '<mi>ρ</mi><mo>-</mo><mo>\'</mo></msubsup></mrow>';
  this.executeRuleTest(mml, 'rho prime equals rho prime subscript plus' +
                       ' baseline plus rho prime subscript minus', 'default');
  this.executeRuleTest(mml, 'rho prime equals rho prime sub plus base plus' +
                       ' rho prime sub minus', 'brief');
  this.executeRuleTest(mml, 'rho prime equals rho prime sub plus base plus' +
                       ' rho prime sub minus', 'sbrief');
};


/**
 * Testing Rule 8.10, Example 2.
 */
sre.MathspeakRuleTest.prototype.untestSample_8_10_2 = function() {
  var mml = '<msubsup><mi>x</mi><mn>10</mn><mo>\'</mo></msubsup>';
  this.executeRuleTest(mml, 'x prime 10', 'default');
  this.executeRuleTest(mml, 'x prime 10', 'brief');
  this.executeRuleTest(mml, 'x prime 10', 'sbrief');
};


/**
 * Testing Rule 8.10, Example 3.
 */
sre.MathspeakRuleTest.prototype.untestSample_8_10_3 = function() {
  var mml = '<msubsup><mi>T</mi><mi>n</mi><mo>\'</mo></msubsup>';
  this.executeRuleTest(mml, 'upper t prime subscript n', 'default');
  this.executeRuleTest(mml, 'upper t prime sub n', 'brief');
  this.executeRuleTest(mml, 'upper t prime sub n', 'sbrief');
};


/**
 * Testing Rule 8.11, Example 1.
 */
sre.MathspeakRuleTest.prototype.untestSample_8_11_1 = function() {
  var mml = '<mfenced open="[" close="]"><mtable><mtr><mtd><msup><mi>x</mi>' +
      '<mi>n</mi></msup></mtd><mtd><msup><mi>y</mi><mi>n</mi></msup></mtd>' +
      '<mtd><msup><mi>z</mi><mi>n</mi></msup></mtd></mtr><mtr><mtd><msup>' +
      '<mi>x</mi><mrow><mi>n</mi><mo>+</mo><mn>1</mn></mrow></msup></mtd>' +
      '<mtd><msup><mi>y</mi><mrow><mi>n</mi><mo>+</mo><mn>1</mn></mrow>' +
      '</msup></mtd><mtd><msup><mi>z</mi><mrow><mi>n</mi><mo>+</mo>' +
      '<mn>1</mn></mrow></msup></mtd></mtr></mtable></mfenced>';
  this.executeRuleTest(mml, 'start 2 by 3 matrix 1st row 1st column x' +
                       ' superscript n 2nd column y superscript n 3rd column' +
                       ' z superscript n 2nd row 1st column x superscript n' +
                       ' plus 1 2nd column y superscript n plus 1 3rd column' +
                       ' z superscript n plus 1 endmatrix', 'default');
  this.executeRuleTest(mml, 'start 2 by 3 matrix 1st row 1st column x sup n' +
                       ' 2nd column y sup n 3rd column z sup n 2nd row 1st' +
                       ' column x sup n plus 1 2nd column y sup n plus 1 3rd' +
                       ' column z sup n plus 1 endmatrix', 'brief');
  this.executeRuleTest(mml, '2 by 3 matrix 1st row 1st column x sup n 2nd' +
                       ' column y sup n 3rd column z sup n 2nd row 1st' +
                       ' column x sup n plus 1 2nd column y sup n plus 1 3rd' +
                       ' column z sup n plus 1 endmatrix', 'sbrief');
};


/**
 * Testing Rule 8.1, Example 1.
 */
sre.MathspeakRuleTest.prototype.untestSample_8_1_1 = function() {
  var mml = '<mrow><msup><mi>x</mi><mn>3</mn></msup><mo>+</mo><mn>6</mn>' +
      '<msup><mi>x</mi><mn>2</mn></msup><mo>-</mo><mi>x</mi><mo>=</mo>' +
      '<mn>30</mn></mrow>';
  this.executeRuleTest(mml, 'x cubed plus 6 x squared minus x equals 30',
                       'default');
  this.executeRuleTest(mml, 'x cubed plus 6 x squared minus x equals 30',
                       'brief');
  this.executeRuleTest(mml, 'x cubed plus 6 x squared minus x equals 30',
                       'sbrief');
};


/**
 * Testing Rule 8.12, Example 1.
 */
sre.MathspeakRuleTest.prototype.untestSample_8_12_1 = function() {
  var mml = '<msup><mrow><msub><mi>x</mi><mi>a</mi></msub></mrow><mi>b</mi>' +
      '</msup>';
  this.executeRuleTest(mml, 'x subscript a baseline superscript b', 'default');
  this.executeRuleTest(mml, 'x sub a base sup b', 'brief');
  this.executeRuleTest(mml, 'x sub a base sup b', 'sbrief');
};


/**
 * Testing Rule 8.12, Example 2.
 */
sre.MathspeakRuleTest.prototype.untestSample_8_12_2 = function() {
  var mml = '<msub><mrow><msup><mi>x</mi><mi>b</mi></msup></mrow><mi>a</mi>' +
      '</msub>';
  this.executeRuleTest(mml, 'x superscript b baseline subscript a', 'default');
  this.executeRuleTest(mml, 'x sup b base sub a', 'brief');
  this.executeRuleTest(mml, 'x sup b base sub a', 'sbrief');
};


/**
 * Testing Rule 8.1, Example 2.
 */
sre.MathspeakRuleTest.prototype.untestSample_8_1_2 = function() {
  var mml = '<mrow><mfrac><mrow><msup><mi>d</mi><mn>2</mn></msup><mi>y</mi>' +
      '</mrow><mrow><mi>d</mi><msup><mi>x</mi><mn>2</mn></msup></mrow>' +
      '</mfrac><mo>+</mo><mfenced separators="" open="(" close=")">' +
      '<mi>a</mi><msup><mi>x</mi><mn>2</mn></msup><mo>+</mo><mi>b</mi>' +
      '<mi>x</mi><mo>+</mo><mi>c</mi></mfenced><mi>y</mi><mo>=</mo>' +
      '<mn>0</mn></mrow>';
  this.executeRuleTest(mml, 'startfraction d squared y over d x squared' +
                       ' endfraction plus left-parenthesis a x squared plus' +
                       ' b x plus c right-parenthesis y equals 0', 'default');
  this.executeRuleTest(mml, 'startfrac d squared y over d x squared endfrac' +
                       ' plus left-pren a x squared plus b x plus c' +
                       ' right-pren y equals 0', 'brief');
  this.executeRuleTest(mml, 'frac d squared y over d x squared endfrac plus' +
                       ' l pren a x squared plus b x plus c r pren y' +
                       ' equals 0', 'sbrief');
};


/**
 * Testing Rule 8.13, Example 1.
 */
sre.MathspeakRuleTest.prototype.untestSample_8_13_1 = function() {
  var mml = '<mrow><msup><mo form="prefix">log</mo><mn>4</mn></msup><msup>' +
      '<mrow/><mi>b</mi></msup><mi>x</mi></mrow>';
  this.executeRuleTest(mml, 'log superscript 4 superscript b baseline x',
                       'default');
  this.executeRuleTest(mml, 'log sup 4 sup b base x', 'brief');
  this.executeRuleTest(mml, 'log sup 4 sup b base x', 'sbrief');
};


/**
 * Testing Rule 8.13, Example 2.
 */
sre.MathspeakRuleTest.prototype.untestSample_8_13_2 = function() {
  var mml = '<mrow><msub><mi>T</mi><mi>n</mi></msub><msub><mrow/><mi>a</mi>' +
      '</msub><mi>y</mi></mrow>';
  this.executeRuleTest(mml, 'upper t subscript n subscript a baseline y',
                       'default');
  this.executeRuleTest(mml, 'upper t sub n sub a base y', 'brief');
  this.executeRuleTest(mml, 'upper t sub n sub a base y', 'sbrief');
};


/**
 * Testing Rule 8.2, Example 1.
 */
sre.MathspeakRuleTest.prototype.untestSample_8_2_1 = function() {
  var mml = '<msup><mi>x</mi><mfrac><mn>1</mn><mn>2</mn></mfrac></msup>';
  this.executeRuleTest(mml, 'x superscript one-half', 'default');
  this.executeRuleTest(mml, 'x sup one-half', 'brief');
  this.executeRuleTest(mml, 'x sup one-half', 'sbrief');
};


/**
 * Testing Rule 8.2, Example 2.
 */
sre.MathspeakRuleTest.prototype.untestSample_8_2_2 = function() {
  var mml = '<msub><mi>x</mi><mi>n</mi></msub>';
  this.executeRuleTest(mml, 'x subscript n', 'default');
  this.executeRuleTest(mml, 'x sub n', 'brief');
  this.executeRuleTest(mml, 'x sub n', 'sbrief');
};


/**
 * Testing Rule 8.2, Example 3.
 */
sre.MathspeakRuleTest.prototype.untestSample_8_2_3 = function() {
  var mml = '<msup><mi>x</mi><mi>a</mi></msup>';
  this.executeRuleTest(mml, 'x superscript a', 'default');
  this.executeRuleTest(mml, 'x sup a', 'brief');
  this.executeRuleTest(mml, 'x sup a', 'sbrief');
};


/**
 * Testing Rule 8.3, Example 1.
 */
sre.MathspeakRuleTest.prototype.untestSample_8_3_1 = function() {
  var mml = '<msup><mi>x</mi><mrow><mi>m</mi><mo>+</mo><mi>n</mi></mrow>' +
      '</msup>';
  this.executeRuleTest(mml, 'x superscript m plus n', 'default');
  this.executeRuleTest(mml, 'x sup m plus n', 'brief');
  this.executeRuleTest(mml, 'x sup m plus n', 'sbrief');
};


/**
 * Testing Rule 8.3, Example 2.
 */
sre.MathspeakRuleTest.prototype.untestSample_8_3_2 = function() {
  var mml = '<mrow><msub><mi>T</mi><mrow><mi>n</mi><mo>-</mo><mn>1</mn>' +
      '</mrow></msub><mo>+</mo><mn>5</mn><mo>=</mo><mn>0</mn></mrow>';
  this.executeRuleTest(mml, 'upper t subscript n minus 1 baseline plus 5' +
                       ' equals 0', 'default');
  this.executeRuleTest(mml, 'upper t sub n minus 1 base plus 5 equals 0',
                       'brief');
  this.executeRuleTest(mml, 'upper t sub n minus 1 base plus 5 equals 0',
                       'sbrief');
};


/**
 * Testing Rule 8.3, Example 3.
 */
sre.MathspeakRuleTest.prototype.untestSample_8_3_3 = function() {
  var mml = '<mrow><msup><mi>x</mi><mrow><mi>m</mi><mo>+</mo><mi>n</mi>' +
      '</mrow></msup><mo>=</mo><msup><mi>x</mi><mi>m</mi></msup><msup>' +
      '<mi>x</mi><mi>n</mi></msup></mrow>';
  this.executeRuleTest(mml, 'x superscript m plus n baseline equals x' +
                       ' superscript m baseline x superscript n', 'default');
  this.executeRuleTest(mml, 'x sup m plus n base equals x sup m base x sup n',
                       'brief');
  this.executeRuleTest(mml, 'x sup m plus n base equals x sup m base x sup n',
                       'sbrief');
};


/**
 * Testing Rule 8.4, Example 1.
 */
sre.MathspeakRuleTest.prototype.untestSample_8_4_1 = function() {
  var mml = '<msup><mi>x</mi><mrow><msub><mi>a</mi><mi>n</mi></msub>' +
      '<mo>+</mo><msub><mi>a</mi><mrow><mi>n</mi><mo>-</mo><mn>1</mn>' +
      '</mrow></msub></mrow></msup>';
  this.executeRuleTest(mml, 'x superscript a super subscript n superscript' +
                       ' plus a super subscript n minus 1', 'default');
  this.executeRuleTest(mml, 'x sup a sup sub n sup plus a sup sub n minus' +
                       ' 1', 'brief');
  this.executeRuleTest(mml, 'x sup a sup sub n sup plus a sup sub n minus' +
                       ' 1', 'sbrief');
};


/**
 * Testing Rule 8.4, Example 2.
 */
sre.MathspeakRuleTest.prototype.untestSample_8_4_2 = function() {
  var mml = '<msup><mi>x</mi><msub><mi>a</mi><mi>b</mi></msub></msup>';
  this.executeRuleTest(mml, 'x superscript a super subscript b', 'default');
  this.executeRuleTest(mml, 'x sup a sup sub b', 'brief');
  this.executeRuleTest(mml, 'x sup a sup sub b', 'sbrief');
};


/**
 * Testing Rule 8.4, Example 3.
 */
sre.MathspeakRuleTest.prototype.untestSample_8_4_3 = function() {
  var mml = '<msub><mi>x</mi><msup><mi>a</mi><mi>b</mi></msup></msub>';
  this.executeRuleTest(mml, 'x subscript a sub superscript b', 'default');
  this.executeRuleTest(mml, 'x sub a sub sup b', 'brief');
  this.executeRuleTest(mml, 'x sub a sub sup b', 'sbrief');
};


/**
 * Testing Rule 8.4, Example 4.
 */
sre.MathspeakRuleTest.prototype.untestSample_8_4_4 = function() {
  var mml = '<mrow><msup><mi>y</mi><msup><mi>a</mi><msub><mi>b</mi>' +
      '<mi>c</mi></msub></msup></msup><mo>≠</mo><msup><mi>y</mi><mrow>' +
      '<msup><mi>a</mi><mi>b</mi></msup><mi>c</mi></mrow></msup></mrow>';
  this.executeRuleTest(mml, 'y superscript a super superscript b super super' +
                       ' subscript c baseline not-equals y superscript a' +
                       ' super superscript b superscript c', 'default');
  this.executeRuleTest(mml, 'y sup a sup sup b sup sup sub c base not-equals' +
                       ' y sup a sup sup b sup c', 'brief');
  this.executeRuleTest(mml, 'y sup a sup sup b sup sup sub c base not-equals' +
                       ' y sup a sup sup b sup c', 'sbrief');
};


/**
 * Testing Rule 8.4, Example 5.
 */
sre.MathspeakRuleTest.prototype.untestSample_8_4_5 = function() {
  var mml = '<msup><mi>y</mi><msup><mi>a</mi><mrow><msub><mrow/><mi>c</mi>' +
      '</msub><mi>b</mi></mrow></msup></msup>';
  this.executeRuleTest(mml, 'y superscript a super super subscript c super' +
                       ' superscript b', 'default');
  this.executeRuleTest(mml, 'y sup a sup sup sub c sup sup b', 'brief');
  this.executeRuleTest(mml, 'y sup a sup sup sub c sup sup b', 'sbrief');
};


/**
 * Testing Rule 8.4, Example 6.
 */
sre.MathspeakRuleTest.prototype.untestSample_8_4_6 = function() {
  var mml = '<msup><mi>x</mi><msup><mi>a</mi><mi>b</mi></msup></msup>';
  this.executeRuleTest(mml, 'x superscript a super superscript b', 'default');
  this.executeRuleTest(mml, 'x sup a sup sup b', 'brief');
  this.executeRuleTest(mml, 'x sup a sup sup b', 'sbrief');
};


/**
 * Testing Rule 8.4, Example 7.
 */
sre.MathspeakRuleTest.prototype.untestSample_8_4_7 = function() {
  var mml = '<msub><mi>x</mi><msub><mi>a</mi><mi>b</mi></msub></msub>';
  this.executeRuleTest(mml, 'x subscript a sub subscript b', 'default');
  this.executeRuleTest(mml, 'x sub a sub sub b', 'brief');
  this.executeRuleTest(mml, 'x sub a sub sub b', 'sbrief');
};


/**
 * Testing Rule 8.4, Example 8.
 */
sre.MathspeakRuleTest.prototype.untestSample_8_4_8 = function() {
  var mml = '<msup><mi>T</mi><mfenced separators="" open="(" close=")">' +
      '<msup><mi>x</mi><mi>a</mi></msup><mo>+</mo><msup><mi>y</mi>' +
      '<mi>b</mi></msup></mfenced></msup>';
  this.executeRuleTest(mml, 'upper t superscript left-parenthesis x super' +
                       ' superscript a superscript plus y super superscript' +
                       ' b superscript right-parenthesis', 'default');
  this.executeRuleTest(mml, 'upper t sup left-pren x sup sup a sup plus y' +
                       ' sup sup b sup right-pren', 'brief');
  this.executeRuleTest(mml, 'upper t sup l pren x sup sup a sup plus y sup' +
                       ' sup b sup r pren', 'sbrief');
};


/**
 * Testing Rule 8.5, Example 10.
 */
sre.MathspeakRuleTest.prototype.untestSample_8_5_10 = function() {
  var mml = '<mrow><mo form="prefix">ln</mo><mi>x</mi><mo>=</mo><msubsup>' +
      '<mo>∫</mo><mn>1</mn><mi>x</mi></msubsup><mfrac><mrow><mi>d</mi>' +
      '<mi>t</mi></mrow><mi>t</mi></mfrac></mrow>';
  this.executeRuleTest(mml, 'l n x equals integral subscript 1 superscript x' +
                       ' baseline startfraction d t over t endfraction',
                       'default');
  this.executeRuleTest(mml, 'l n x equals integral sub 1 sup x base' +
                       ' startfrac d t over t endfrac', 'brief');
  this.executeRuleTest(mml, 'l n x equals integral sub 1 sup x base frac d t' +
                       ' over t endfrac', 'sbrief');
};


/**
 * Testing Rule 8.5, Example 1.
 */
sre.MathspeakRuleTest.prototype.untestSample_8_5_1 = function() {
  var mml = '<msub><mi>x</mi><mn>1</mn></msub>';
  this.executeRuleTest(mml, 'x 1', 'default');
  this.executeRuleTest(mml, 'x 1', 'brief');
  this.executeRuleTest(mml, 'x 1', 'sbrief');
};


/**
 * Testing Rule 8.5, Example 2.
 */
sre.MathspeakRuleTest.prototype.untestSample_8_5_2 = function() {
  var mml = '<msub><mi>x</mi><mrow><mo>-</mo><mn>1</mn></mrow></msub>';
  this.executeRuleTest(mml, 'x subscript negative 1', 'default');
  this.executeRuleTest(mml, 'x sub negative 1', 'brief');
  this.executeRuleTest(mml, 'x sub negative 1', 'sbrief');
};


/**
 * Testing Rule 8.5, Example 3.
 */
sre.MathspeakRuleTest.prototype.untestSample_8_5_3 = function() {
  var mml = '<msub><mi>x</mi><mrow><mn>10</mn><mo>,</mo><mn>000</mn></mrow>' +
      '</msub>';
  this.executeRuleTest(mml, 'x 10,000', 'default');
  this.executeRuleTest(mml, 'x 10,000', 'brief');
  this.executeRuleTest(mml, 'x 10,000', 'sbrief');
};


/**
 * Testing Rule 8.5, Example 4.
 */
sre.MathspeakRuleTest.prototype.untestSample_8_5_4 = function() {
  var mml = '<msub><mi>x</mi><mrow><mn>1</mn><mo>.</mo><mn>3</mn></mrow>' +
      '</msub>';
  this.executeRuleTest(mml, 'x 1.3', 'default');
  this.executeRuleTest(mml, 'x 1.3', 'brief');
  this.executeRuleTest(mml, 'x 1.3', 'sbrief');
};


/**
 * Testing Rule 8.5, Example 5.
 */
sre.MathspeakRuleTest.prototype.untestSample_8_5_5 = function() {
  var mml = '<mrow><mn>4</mn><mi>F</mi><mi>e</mi><mo>+</mo><mn>3</mn><msub>' +
      '<mi>O</mi><mn>2</mn></msub><mo>→</mo><mn>2</mn><mi>F</mi><msub>' +
      '<mi>e</mi><mn>2</mn></msub><msub><mn>0</mn><mn>3</mn></msub></mrow>';
  this.executeRuleTest(mml, '4 upper f e plus 3 upper o 2 right-arrow 2' +
                       ' upper f e 2 upper o 3', 'default');
  this.executeRuleTest(mml, '4 upper f e plus 3 upper o 2 right-arrow 2' +
                       ' upper f e 2 upper o 3', 'brief');
  this.executeRuleTest(mml, '4 upper f e plus 3 upper o 2 r arrow 2 upper f' +
                       ' e 2 upper o 3', 'sbrief');
};


/**
 * Testing Rule 8.5, Example 6.
 */
sre.MathspeakRuleTest.prototype.untestSample_8_5_6 = function() {
  var mml = '<msub><mi>a</mi><mrow><mn>2</mn><mo>,</mo><mn>3</mn></mrow>' +
      '</msub>';
  this.executeRuleTest(mml, 'a subscript 2 comma 3', 'default');
  this.executeRuleTest(mml, 'a sub 2 comma 3', 'brief');
  this.executeRuleTest(mml, 'a sub 2 comma 3', 'sbrief');
};


/**
 * Testing Rule 8.5, Example 7.
 */
sre.MathspeakRuleTest.prototype.untestSample_8_5_7 = function() {
  var mml = '<msub><mi>T</mi><mrow><msub><mi>n</mi><mn>1</mn></msub>' +
      '<mo>+</mo><msub><mi>n</mi><mn>0</mn></msub></mrow></msub>';
  this.executeRuleTest(mml, 'upper t subscript n 1 plus n 0', 'default');
  this.executeRuleTest(mml, 'upper t sub n 1 plus n 0', 'brief');
  this.executeRuleTest(mml, 'upper t sub n 1 plus n 0', 'sbrief');
};


/**
 * Testing Rule 8.5, Example 8.
 */
sre.MathspeakRuleTest.prototype.untestSample_8_5_8 = function() {
  var mml = '<mrow><mi>l</mi><mi>o</mi><msub><mi>g</mi><mn>2</mn></msub>' +
      '<mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow><mo>=</mo><mfrac><mrow>' +
      '<msub><mo form="prefix">log</mo><mn>10</mn></msub><mrow><mo>(</mo>' +
      '<mi>X</mi><mo>)</mo></mrow></mrow><mrow><msub>' +
      '<mo form="prefix">log</mo><mn>10</mn></msub><mrow><mo>(</mo>' +
      '<mn>2</mn><mo>)</mo></mrow></mrow></mfrac></mrow>';
  this.executeRuleTest(mml, 'log subscript 2 baseline left-parenthesis x' +
                       ' right-parenthesis equals startfraction log' +
                       ' subscript 10 baseline left-parenthesis x' +
                       ' right-parenthesis over log subscript 10 baseline' +
                       ' left-parenthesis 2 right-parenthesis endfraction',
                       'default');
  this.executeRuleTest(mml, 'log sub 2 base left-pren x right-pren equals' +
                       ' startfrac log sub 10 base left-pren x right-pren' +
                       ' over log sub 10 base left-pren 2 right-pren' +
                       ' endfrac', 'brief');
  this.executeRuleTest(mml, 'log sub 2 base l pren x r pren equals frac' +
                       ' log sub 10 base l pren x r pren over log sub 10' +
                       ' base l pren 2 r pren endfrac', 'sbrief');
};


/**
 * Testing Rule 8.5, Example 9.
 */
sre.MathspeakRuleTest.prototype.untestSample_8_5_9 = function() {
  var mml = '<msub><mi>Φ</mi><mn>5</mn></msub>';
  this.executeRuleTest(mml, 'upper phi 5', 'default');
  this.executeRuleTest(mml, 'upper phi 5', 'brief');
  this.executeRuleTest(mml, 'upper phi 5', 'sbrief');
};


/**
 * Testing Rule 8.6, Example 1.
 */
sre.MathspeakRuleTest.prototype.untestSample_8_6_1 = function() {
  var mml = '<mrow><mi>$</mi><mi>n</mi><mn>2</mn><mo>=</mo><mn>2</mn>' +
      '<mo>*</mo><mi>$</mi><mi>n</mi><mo>+</mo><mn>1</mn><mo>;</mo></mrow>';
  this.executeRuleTest(mml, 'dollar-sign n baseline 2 equals 2 asterisk' +
                       ' dollar-sign n plus 1 semicolon', 'default');
  this.executeRuleTest(mml, 'dollar-sign n base 2 equals 2 asterisk' +
                       ' dollar-sign n plus 1 semicolon', 'brief');
  this.executeRuleTest(mml, 'dollar-sign n base 2 equals 2 asterisk' +
                       ' dollar-sign n plus 1 semicolon', 'sbrief');
};


/**
 * Testing Rule 8.8, Example 1.
 */
sre.MathspeakRuleTest.prototype.untestSample_8_8_1 = function() {
  var mml = '<mmultiscripts><mi>x</mi><mrow><mi>e</mi><mi>f</mi></mrow>' +
      '<mrow><mi>g</mi><mi>h</mi></mrow><mprescripts/><mrow><mi>c</mi>' +
      '<mi>d</mi></mrow><mrow><mi>a</mi><mi>b</mi></mrow></mmultiscripts>';
  this.executeRuleTest(mml, 'subscript c d superscript a b baseline x' +
                       ' subscript e f superscript g h', 'default');
  this.executeRuleTest(mml, 'sub c d sup a b base x sub e f sup g h', 'brief');
  this.executeRuleTest(mml, 'sub c d sup a b base x sub e f sup g h', 'sbrief');
};


/**
 * Testing Rule 8.8, Example 2.
 */
sre.MathspeakRuleTest.prototype.untestSample_8_8_2 = function() {
  var mml = '<msubsup><mi>T</mi><mrow><mi>n</mi><mo>-</mo><mn>1</mn></mrow>' +
      '<mn>2</mn></msubsup>';
  this.executeRuleTest(mml, 'upper t subscript n minus 1 superscript 2',
                       'default');
  this.executeRuleTest(mml, 'upper t sub n minus 1 sup 2', 'brief');
  this.executeRuleTest(mml, 'upper t sub n minus 1 sup 2', 'sbrief');
};


/**
 * Testing Rule 8.9, Example 1.
 */
sre.MathspeakRuleTest.prototype.untestSample_8_9_1 = function() {
  var mml = '<msup><mi>x</mi><mo>\'</mo></msup>';
  this.executeRuleTest(mml, 'x prime', 'default');
  this.executeRuleTest(mml, 'x prime', 'brief');
  this.executeRuleTest(mml, 'x prime', 'sbrief');
};


/**
 * Testing Rule 8.9, Example 2.
 */
sre.MathspeakRuleTest.prototype.untestSample_8_9_2 = function() {
  var mml = '<mrow><msup><mi>f</mi><mrow><mo>\'</mo><mo>\'</mo><mo>\'</mo>' +
      '</mrow></msup><mrow><mo>(</mo><mi>y</mi><mo>)</mo></mrow><mo>=</mo>' +
      '<mfrac><mrow><mi>d</mi><msup><mi>f</mi><mrow><mo>\'</mo><mo>\'</mo>' +
      '</mrow></msup><mrow><mo>(</mo><mi>y</mi><mo>)</mo></mrow></mrow>' +
      '<mrow><mi>d</mi><mi>y</mi></mrow></mfrac></mrow>';
  this.executeRuleTest(mml, 'f triple-prime left-parenthesis y' +
                       ' right-parenthesis equals startfraction d f' +
                       ' double-prime left-parenthesis y right-parenthesis' +
                       ' over d y endfraction', 'default');
  this.executeRuleTest(mml, 'f triple-prime left-pren y right-pren equals' +
                       ' startfrac d f double-prime left-pren y right-pren' +
                       ' over d y endfrac', 'brief');
  this.executeRuleTest(mml, 'f triple-prime l pren y r pren equals frac d' +
                       ' f double-prime l pren y r pren over d y endfrac',
                       'sbrief');
};


/**
 * Testing Rule 9.1, Example 1.
 */
sre.MathspeakRuleTest.prototype.untestSample_9_1_1 = function() {
  var mml = '<msqrt><mn>2</mn></msqrt>';
  this.executeRuleTest(mml, 'startroot 2 endroot', 'default');
  this.executeRuleTest(mml, 'startroot 2 endroot', 'brief');
  this.executeRuleTest(mml, 'root 2 endroot', 'sbrief');
};


/**
 * Testing Rule 9.1, Example 2.
 */
sre.MathspeakRuleTest.prototype.untestSample_9_1_2 = function() {
  var mml = '<msqrt><mrow><mi>m</mi><mo>+</mo><mi>n</mi></mrow></msqrt>';
  this.executeRuleTest(mml, 'startroot m plus n endroot', 'default');
  this.executeRuleTest(mml, 'startroot m plus n endroot', 'brief');
  this.executeRuleTest(mml, 'root m plus n endroot', 'sbrief');
};


/**
 * Testing Rule 9.2, Example 1.
 */
sre.MathspeakRuleTest.prototype.untestSample_9_2_1 = function() {
  var mml = '<mroot><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mrow>' +
      '<mi>m</mi><mo>+</mo><mi>n</mi></mrow></mroot>';
  this.executeRuleTest(mml, 'rootindex m plus n startroot x plus y endroot',
                       'default');
  this.executeRuleTest(mml, 'rootindex m plus n startroot x plus y endroot',
                       'brief');
  this.executeRuleTest(mml, 'index m plus n root x plus y endroot', 'sbrief');
};


/**
 * Testing Rule 9.2, Example 2.
 */
sre.MathspeakRuleTest.prototype.untestSample_9_2_2 = function() {
  var mml = '<mrow><mroot><msup><mi>x</mi><mi>m</mi></msup><mi>n</mi>' +
      '</mroot><mo>=</mo><msup><mfenced separators="" open="(" close=")">' +
      '<mroot><mi>x</mi><mi>n</mi></mroot></mfenced><mi>m</mi></msup>' +
      '<mo>=</mo><msup><mi>x</mi><mfrac><mi>m</mi><mi>n</mi></mfrac>' +
      '</msup><mo>,</mo><mi>x</mi><mo>></mo><mn>0</mn></mrow>';
  this.executeRuleTest(mml, 'rootindex n startroot x superscript m baseline' +
                       ' endroot equals left-parenthesis rootindex n' +
                       ' startroot x endroot right-parenthesis superscript m' +
                       ' baseline equals x superscript startfraction m over' +
                       ' n endfraction baseline comma x greater-than 0',
                       'default');
  this.executeRuleTest(mml, 'rootindex n startroot x sup m base endroot' +
                       ' equals left-pren rootindex n startroot x endroot' +
                       ' right-pren sup m base equals x sup startfrac m' +
                       ' over n endfrac base comma x greater-than 0', 'brief');
  this.executeRuleTest(mml, 'index n root x sup m base endroot equals l' +
                       ' pren index n root x endroot r pren sup m base' +
                       ' equals x sup frac m over n endfrac base comma x' +
                       ' greater-than 0', 'sbrief');
};


/**
 * Testing Rule 9.2, Example 3.
 */
sre.MathspeakRuleTest.prototype.untestSample_9_2_3 = function() {
  var mml = '<mrow><mroot><mi>x</mi><mn>3</mn></mroot><mo>=</mo><msup>' +
      '<mi>x</mi><mfrac><mn>1</mn><mn>3</mn></mfrac></msup></mrow>';
  this.executeRuleTest(mml, 'rootindex 3 startroot x endroot equals x' +
                       ' superscript one-third', 'default');
  this.executeRuleTest(mml, 'rootindex 3 startroot x endroot equals x sup' +
                       ' one-third', 'brief');
  this.executeRuleTest(mml, 'index 3 root x endroot equals x sup one-third',
                       'sbrief');
};


/**
 * Testing Rule 9.3, Example 1.
 */
sre.MathspeakRuleTest.prototype.untestSample_9_3_1 = function() {
  var mml = '<msqrt><mrow><msqrt><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow>' +
      '</msqrt><mo>+</mo><msqrt><mrow><mi>y</mi><mo>+</mo><mn>1</mn>' +
      '</mrow></msqrt></mrow></msqrt>';
  this.executeRuleTest(mml, 'nestedstartroot startroot x plus 1 endroot plus' +
                       ' startroot y plus 1 endroot nestedendroot', 'default');
  this.executeRuleTest(mml, 'neststartroot startroot x plus 1 endroot plus' +
                       ' startroot y plus 1 endroot nestendroot', 'brief');
  this.executeRuleTest(mml, 'nestroot root x plus 1 endroot plus root y plus' +
                       ' 1 endroot nestendroot', 'sbrief');
};


/**
 * Testing Rule 9.3, Example 2.
 */
sre.MathspeakRuleTest.prototype.untestSample_9_3_2 = function() {
  var mml = '<mrow><mroot><mroot><mi>x</mi><mi>m</mi></mroot><mi>n</mi>' +
      '</mroot><mo>=</mo><mroot><mroot><mi>x</mi><mi>n</mi></mroot>' +
      '<mi>m</mi></mroot></mrow>';
  this.executeRuleTest(mml, 'nestedrootindex n nestedstartroot rootindex m' +
                       ' startroot x endroot nestedendroot equals' +
                       ' nestedrootindex m nestedstartroot rootindex n' +
                       ' startroot x endroot nestedendroot', 'default');
  this.executeRuleTest(mml, 'nestrootindex n neststartroot rootindex m' +
                       ' startroot x endroot nestendroot equals' +
                       ' nestrootindex m neststartroot rootindex n startroot' +
                       ' x endroot nestendroot', 'brief');
  this.executeRuleTest(mml, 'nestindex n nestroot index m root x endroot' +
                       ' nestendroot equals nestindex m nestroot index n' +
                       ' root x endroot nestendroot', 'sbrief');
};


/**
 * Testing Rule 9.3, Example 3.
 */
sre.MathspeakRuleTest.prototype.untestSample_9_3_3 = function() {
  var mml = '<mrow><msup><mi>x</mi><mrow><mi>e</mi><mo>-</mo><mn>2</mn>' +
      '</mrow></msup><mo>=</mo><msqrt><mrow><mi>x</mi><mroot><mrow>' +
      '<mi>x</mi><mroot><mrow><mi>x</mi><mroot><mrow><mi>x</mi>' +
      '<mo>...</mo></mrow><mn>5</mn></mroot></mrow><mn>4</mn></mroot>' +
      '</mrow><mn>3</mn></mroot></mrow></msqrt><mo>,</mo><mi>x</mi>' +
      '<mo>∈</mo><mi>ℝ</mi></mrow>';
  this.executeRuleTest(mml, 'x superscript e minus 2 baseline equals' +
                       ' nested3startroot x nestedtwicerootindex 3' +
                       ' nestedtwicestartroot x nestedrootindex 4' +
                       ' nestedstartroot x rootindex 5 startroot x ellipsis' +
                       ' endroot nestedendroot nestedtwiceendroot' +
                       ' nested3endroot comma x element-of double-struck' +
                       ' upper r', 'default');
  this.executeRuleTest(mml, 'x sup e minus 2 base equals nest3startroot x' +
                       ' nesttwicerootindex 3 nesttwicestartroot x' +
                       ' nestrootindex 4 neststartroot x rootindex 5' +
                       ' startroot x ellipsis endroot nestendroot' +
                       ' nesttwiceendroot nest3endroot comma x element-of' +
                       ' double-struck upper r', 'brief');
  this.executeRuleTest(mml, 'x sup e minus 2 base equals nest3root x' +
                       ' nesttwiceindex 3 nesttwiceroot x nestindex 4' +
                       ' nestroot x index 5 root x ellipsis endroot' +
                       ' nestendroot nesttwiceendroot nest3endroot comma x' +
                       ' element-of double-struck upper r', 'sbrief');
};


/**
 * Testing Rule 9.3, Example 4.
 */
sre.MathspeakRuleTest.prototype.untestSample_9_3_4 = function() {
  var mml = '<mrow><mfrac><mn>2</mn><mi>π</mi></mfrac><mo>=</mo><mfrac>' +
      '<mrow><msqrt><mn>2</mn></msqrt><mn>2</mn></mrow><mn>2</mn></mfrac>' +
      '<mfrac><msqrt><mrow><mn>2</mn><mo>+</mo><msqrt><mn>2</mn></msqrt>' +
      '</mrow></msqrt><mn>2</mn></mfrac><mfrac><msqrt><mrow><mn>2</mn>' +
      '<mo>+</mo><msqrt><mrow><mn>2</mn><mo>+</mo><msqrt><mn>2</mn>' +
      '</msqrt></mrow></msqrt></mrow></msqrt><mn>2</mn></mfrac>' +
      '<mo>...</mo></mrow>';
  this.executeRuleTest(mml, 'startfraction 2 over pi endfraction equals' +
                       ' startfraction startroot 2 endroot over 2' +
                       ' endfraction startfraction nestedstartroot 2 plus' +
                       ' startroot 2 endroot nestedendroot over 2' +
                       ' endfraction startfraction nestedtwicestartroot 2' +
                       ' plus nestedstartroot 2 plus startroot 2 endroot' +
                       ' nestedendroot nestedtwiceendroot over 2 endfraction' +
                       ' ellipsis', 'default');
  this.executeRuleTest(mml, 'startfrac 2 over pi endfrac equals startfrac' +
                       ' startroot 2 endroot over 2 endfrac startfrac' +
                       ' neststartroot 2 plus startroot 2 endroot' +
                       ' nestendroot over 2 endfrac startfrac' +
                       ' nesttwicestartroot 2 plus neststartroot 2 plus' +
                       ' startroot 2 endroot nestendroot nesttwiceendroot' +
                       ' over 2 endfrac ellipsis', 'brief');
  this.executeRuleTest(mml, 'frac 2 over pi endfrac equals frac root 2' +
                       ' endroot over 2 endfrac frac nestroot 2 plus root 2' +
                       ' endroot nestendroot over 2 endfrac frac' +
                       ' nesttwiceroot 2 plus nestroot 2 plus root 2 endroot' +
                       ' nestendroot nesttwiceendroot over 2 endfrac' +
                       ' ellipsis', 'sbrief');
};


/**
 * Testing Rule 10.1, Example 1.
 */
sre.MathspeakRuleTest.prototype.untestSample_10_1_1 = function() {
  var mml = '<mrow><mfrac><mrow><mn>5</mn><mi>x</mi>' +
      '<menclose notation="updiagonalstrike"><mi>y</mi></menclose></mrow>' +
      '<mrow><mn>2</mn><menclose notation="updiagonalstrike"><mi>y</mi>' +
      '</menclose></mrow></mfrac><mo>=</mo><mfrac><mn>5</mn><mn>2</mn>' +
      '</mfrac><mi>x</mi></mrow>';
  this.executeRuleTest(mml, 'startfraction 5 x crossout y endcrossout over 2' +
                       ' crossout y endcrossout endfraction equals' +
                       ' five-halves x', 'default');
  this.executeRuleTest(mml, 'startfrac 5 x crossout y endcrossout over 2' +
                       ' crossout y endcrossout endfrac equals five-halves' +
                       ' x', 'brief');
  this.executeRuleTest(mml, 'frac 5 x crossout y endcrossout over 2 crossout' +
                       ' y endcrossout endfrac equals five-halves x', 'sbrief');
};


/**
 * Testing Rule 10.2, Example 1.
 */
sre.MathspeakRuleTest.prototype.untestSample_10_2_1 = function() {
  var mml = '<mrow><mfrac><mn>12</mn><mn>18</mn></mfrac><mo>=</mo><mfrac>' +
      '<mover><menclose notation="updiagonalstrike"><mn>12</mn></menclose>' +
      '<mn>2</mn></mover><munder><menclose notation="updiagonalstrike">' +
      '<mn>18</mn></menclose><mn>3</mn></munder></mfrac><mo>=</mo><mfrac>' +
      '<mn>2</mn><mn>3</mn></mfrac></mrow>';
  this.executeRuleTest(mml, 'startfraction 12 over 18 endfraction equals' +
                       ' startfraction crossout 12 with 2 endcrossout over' +
                       ' crossout 18 with 3 endcrossout endfraction equals' +
                       ' two-thirds', 'default');
  this.executeRuleTest(mml, 'startfrac 12 over 18 endfrac equals startfrac' +
                       ' crossout 12 with 2 endcrossout over crossout 18' +
                       ' with 3 endcrossout endfrac equals two-thirds',
                       'brief');
  this.executeRuleTest(mml, 'frac 12 over 18 endfrac equals frac crossout 12' +
                       ' with 2 endcrossout over crossout 18 with 3' +
                       ' endcrossout endfrac equals two-thirds', 'sbrief');
};


/**
 * Testing Rule 11.1, Example 1.
 */
sre.MathspeakRuleTest.prototype.untestSample_11_1_1 = function() {
  var mml = '<mover accent="true"><mi>x</mi><mo>¨</mo></mover>';
  this.executeRuleTest(mml, 'modifyingabove x with two-dots', 'default');
  this.executeRuleTest(mml, 'modabove x with two-dots', 'brief');
  this.executeRuleTest(mml, 'modabove x with two-dots', 'sbrief');
};


/**
 * Testing Rule 11.1, Example 2.
 */
sre.MathspeakRuleTest.prototype.untestSample_11_1_2 = function() {
  var mml = '<mover accent="true"><mrow><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '</mrow><mo>→</mo></mover>';
  this.executeRuleTest(mml, 'modifyingabove x plus y with right-arrow',
                       'default');
  this.executeRuleTest(mml, 'modabove x plus y with right-arrow', 'brief');
  this.executeRuleTest(mml, 'modabove x plus y with r arrow', 'sbrief');
};


/**
 * Testing Rule 11.1, Example 3.
 */
sre.MathspeakRuleTest.prototype.untestSample_11_1_3 = function() {
  var mml = '<mover accent="true"><mi>x</mi><mo>^</mo></mover>';
  this.executeRuleTest(mml, 'modifyingabove x with caret', 'default');
  this.executeRuleTest(mml, 'modabove x with caret', 'brief');
  this.executeRuleTest(mml, 'modabove x with caret', 'sbrief');
};


/**
 * Testing Rule 11.2, Example 1.
 */
sre.MathspeakRuleTest.prototype.untestSample_11_2_1 = function() {
  var mml = '<munder accent="true"><mi>x</mi><mi>˙</mi></munder>';
  this.executeRuleTest(mml, 'modifyingbelow x with dot', 'default');
  this.executeRuleTest(mml, 'modbelow x with dot', 'brief');
  this.executeRuleTest(mml, 'modbelow x with dot', 'sbrief');
};


/**
 * Testing Rule 11.3, Example 1.
 */
sre.MathspeakRuleTest.prototype.untestSample_11_3_1 = function() {
  var mml = '<mover accent="true"><mi>x</mi><mo>˜</mo></mover>';
  this.executeRuleTest(mml, 'x overtilde', 'default');
  this.executeRuleTest(mml, 'x overtilde', 'brief');
  this.executeRuleTest(mml, 'x overtilde', 'sbrief');
};


/**
 * Testing Rule 11.3, Example 2.
 */
sre.MathspeakRuleTest.prototype.untestSample_11_3_2 = function() {
  var mml = '<mover accent="true"><mi>x</mi><mo>¯</mo></mover>';
  this.executeRuleTest(mml, 'x overbar', 'default');
  this.executeRuleTest(mml, 'x overbar', 'brief');
  this.executeRuleTest(mml, 'x overbar', 'sbrief');
};


/**
 * Testing Rule 11.3, Example 3.
 */
sre.MathspeakRuleTest.prototype.untestSample_11_3_3 = function() {
  var mml = '<munder accentunder="true"><mi>y</mi><mo>˜</mo></munder>';
  this.executeRuleTest(mml, 'y undertilde', 'default');
  this.executeRuleTest(mml, 'y undertilde', 'brief');
  this.executeRuleTest(mml, 'y undertilde', 'sbrief');
};


/**
 * Testing Rule 11.4, Example 1.
 */
sre.MathspeakRuleTest.prototype.untestSample_11_4_1 = function() {
  var mml = '<mover accent="true"><mover accent="true"><mi>x</mi><mo>¯</mo>' +
      '</mover><mo>¯</mo></mover>';
  this.executeRuleTest(mml, 'x overbar overbar', 'default');
  this.executeRuleTest(mml, 'x overbar overbar', 'brief');
  this.executeRuleTest(mml, 'x overbar overbar', 'sbrief');
};


/**
 * Testing Rule 11.4, Example 2.
 */
sre.MathspeakRuleTest.prototype.untestSample_11_4_2 = function() {
  var mml = '<mover accent="true"><munder><mover accent="true"><munder>' +
      '<mi>y</mi><mo>̲</mo></munder><mo>¯</mo></mover><mo>̲</mo></munder>' +
      '<mo>¯</mo></mover>';
  this.executeRuleTest(mml, 'y overbar overbar underbar underbar', 'default');
  this.executeRuleTest(mml, 'y overbar overbar underbar underbar', 'brief');
  this.executeRuleTest(mml, 'y overbar overbar underbar underbar', 'sbrief');
};


/**
 * Testing Rule 11.6, Example 1.
 */
sre.MathspeakRuleTest.prototype.untestSample_11_6_1 = function() {
  var mml = '<munder accentunder="true"><munder><mrow><mi>a</mi><mo>+</mo>' +
      '<mi>b</mi></mrow><mo>̲</mo></munder><mo>*</mo></munder>';
  this.executeRuleTest(mml, 'modifyingbelow below modifyingbelow a plus b' +
                       ' with bar with asterisk', 'default');
  this.executeRuleTest(mml, 'modbelow below modbelow a plus b with bar with' +
                       ' asterisk', 'brief');
  this.executeRuleTest(mml, 'modbelow below modbelow a plus b with bar with' +
                       ' asterisk', 'sbrief');
};


/**
 * Testing Rule 11.6, Example 2.
 */
sre.MathspeakRuleTest.prototype.untestSample_11_6_2 = function() {
  var mml = '<munder accentunder="true"><munder accentunder="true">' +
      '<mover accent="true"><mover accent="true"><mrow><mi>a</mi>' +
      '<mo>+</mo><mi>b</mi></mrow><mo>→</mo></mover><mo>˙</mo></mover>' +
      '<mo>←</mo></munder><mo>˙</mo></munder>';
  this.executeRuleTest(mml, 'modifyingabove modifyingbelow a plus b with' +
                       ' left-arrow with right-arrow underscript dot' +
                       ' overscript dot endscripts', 'default');
  this.executeRuleTest(mml, 'modabove modbelow a plus b with left-arrow with' +
                       ' right-arrow underscript dot overscript dot' +
                       ' endscripts', 'brief');
  this.executeRuleTest(mml, 'modabove modbelow a plus b with l arrow with r' +
                       ' arrow underscript dot overscript dot endscripts',
                       'sbrief');
};


/**
 * Testing Rule 11.6, Example 3.
 */
sre.MathspeakRuleTest.prototype.untestSample_11_6_3 = function() {
  var mml = '<mover><mover accent="true"><mrow><mi>x</mi><mo>+</mo>' +
      '<mi>y</mi></mrow><mo>˜</mo></mover><mo>¯</mo></mover>';
  this.executeRuleTest(mml, 'modifyingabove above modifyingabove x plus y' +
                       ' with tilde with bar', 'default');
  this.executeRuleTest(mml, 'modabove above modabove x plus y with tilde' +
                       ' with bar', 'brief');
  this.executeRuleTest(mml, 'modabove above modabove x plus y with tilde' +
                       ' with bar', 'sbrief');
};


/**
 * Testing Rule 11.7, Example 1.
 */
sre.MathspeakRuleTest.prototype.untestSample_11_7_1 = function() {
  var mml = '<mrow><munderover><mo>∑</mo><mrow><mi>n</mi><mo>=</mo>' +
      '<mn>1</mn></mrow><mi>∞</mi></munderover><msub><mi>a</mi><mi>n</mi>' +
      '</msub></mrow>';
  this.executeRuleTest(mml, 'sigma-summation underscript n equals 1' +
                       ' overscript infinity endscripts a subscript' +
                       ' n', 'default');
  this.executeRuleTest(mml, 'sigma-summation underscript n equals 1' +
                       ' overscript infinity endscripts a sub n', 'brief');
  this.executeRuleTest(mml, 'sigma-summation underscript n equals 1' +
                       ' overscript infinity endscripts a sub n', 'sbrief');
};


/**
 * Testing Rule 11.8, Example 1.
 */
sre.MathspeakRuleTest.prototype.untestSample_11_8_1 = function() {
  var mml = '<mrow><mover><mstyle scriptlevel="2" displaystyle="false">' +
      '<mrow/></mstyle><mo>[</mo></mover><mtable><mtr><mtd><mrow>' +
      '<mi>a</mi><mo>=</mo><mn>5</mn></mrow></mtd></mtr><mtr><mtd><mrow>' +
      '<mi>b</mi><mo>=</mo><mn>3</mn></mrow></mtd></mtr></mtable><mrow>' +
      '<mo>]</mo></mrow><munder><mrow><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '</mrow><mo>̲</mo></munder><mrow/></mrow>';
  this.executeRuleTest(mml, 'modifyingbelow x plus y with bar underscript a' +
                       ' equals 5 underunderscript b equals 3 endscripts',
                       'default');
  this.executeRuleTest(mml, 'modbelow x plus y with bar underscript a equals' +
                       ' 5 underunderscript b equals 3 endscripts', 'brief');
  this.executeRuleTest(mml, 'modbelow x plus y with bar underscript a equals' +
                       ' 5 underunderscript b equals 3 endscripts', 'sbrief');
};


/**
 * Testing Rule 11.8, Example 2.
 */
sre.MathspeakRuleTest.prototype.untestSample_11_8_2 = function() {
  var mml = '<mrow><mover><mover><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow>' +
      '<mo>¯</mo></mover><mstyle scriptlevel="2" displaystyle="false">' +
      '<mtable><mtr><mtd><mrow><mi>m</mi><mo>=</mo><mn>2</mn></mrow></mtd>' +
      '</mtr><mtr><mtd><mrow><mi>n</mi><mo>=</mo><mn>1</mn></mrow></mtd>' +
      '</mtr></mtable></mstyle></mover><mrow/></mrow>';
  this.executeRuleTest(mml, 'modifyingabove x plus y with bar overscript n' +
                       ' equals 1 overoverscript m equals 2 endscripts',
                       'default');
  this.executeRuleTest(mml, 'modabove x plus y with bar overscript n equals' +
                       ' 1 overoverscript m equals 2 endscripts', 'brief');
  this.executeRuleTest(mml, 'modabove x plus y with bar overscript n equals' +
                       ' 1 overoverscript m equals 2 endscripts', 'sbrief');
};


/**
 * Testing Rule 11.9, Example 1.
 */
sre.MathspeakRuleTest.prototype.untestSample_11_9_1 = function() {
  var mml = '<mrow><mfrac><mn>7</mn><mn>12</mn></mfrac><mo>=</mo><mo>.</mo>' +
      '<mn>58</mn><mover accent="true"><mn>3</mn><mo>˙</mo></mover>' +
      '<mover accent="true"><mn>3</mn><mo>˙</mo></mover>' +
      '<mover accent="true"><mn>3</mn><mo>˙</mo></mover></mrow>';
  this.executeRuleTest(mml, 'seven-twelfths equals .58 modifyingeachabove 3' +
                       ' 3 3 with dot', 'default');
  this.executeRuleTest(mml, 'seven-twelfths equals .58 modeachabove 3 3 3' +
                       ' with dot', 'brief');
  this.executeRuleTest(mml, 'seven-twelfths equals .58 modeachabove 3 3 3' +
                       ' with dot', 'sbrief');
};


/**
 * Testing Rule 12.1, Example 1.
 */
sre.MathspeakRuleTest.prototype.untestSample_12_1_1 = function() {
  var mml = '<mrow><msub><mo form="prefix">log</mo><mi>b</mi></msub>' +
      '<mi>x</mi></mrow>';
  this.executeRuleTest(mml, 'log subscript b baseline x', 'default');
  this.executeRuleTest(mml, 'log sub b base x', 'brief');
  this.executeRuleTest(mml, 'log sub b base x', 'sbrief');
};


/**
 * Testing Rule 12.1, Example 2.
 */
sre.MathspeakRuleTest.prototype.untestSample_12_1_2 = function() {
  var mml = '<mrow><mo form="prefix">cos</mo><mi>y</mi></mrow>';
  this.executeRuleTest(mml, 'cosine y', 'default');
  this.executeRuleTest(mml, 'cosine y', 'brief');
  this.executeRuleTest(mml, 'cosine y', 'sbrief');
};


/**
 * Testing Rule 12.1, Example 3.
 */
sre.MathspeakRuleTest.prototype.untestSample_12_1_3 = function() {
  var mml = '<mrow><mo form="prefix">sin</mo><mi>x</mi></mrow>';
  this.executeRuleTest(mml, 'sine x', 'default');
  this.executeRuleTest(mml, 'sine x', 'brief');
  this.executeRuleTest(mml, 'sine x', 'sbrief');
};


/**
 * Testing Rule 13.1, Example 1.
 */
sre.MathspeakRuleTest.prototype.untestSample_13_1_1 = function() {
  var mml = '<mrow><mfrac><mrow><mn>60</mn>' +
      '<menclose notation="updiagonalstrike"><mtext>mi</mtext></menclose>' +
      '</mrow><menclose notation="updiagonalstrike"><mtext>hr</mtext>' +
      '</menclose></mfrac><mo>×</mo><mfrac><mrow><mn>5</mn><mo>,</mo>' +
      '<mn>280</mn><mtext>ft</mtext></mrow><mrow><mn>1</mn>' +
      '<menclose notation="updiagonalstrike"><mtext>mi</mtext></menclose>' +
      '</mrow></mfrac><mo>×</mo><mfrac><mrow><mn>1</mn>' +
      '<menclose notation="updiagonalstrike"><mtext>mi</mtext></menclose>' +
      '</mrow><mrow><mn>60</mn><mtext>min</mtext></mrow></mfrac><mo>=</mo>' +
      '<mfrac><mrow><mn>5</mn><mo>,</mo><mn>280</mn><mtext>ft</mtext>' +
      '</mrow><mtext>min</mtext></mfrac></mrow>';
  this.executeRuleTest(mml, 'startfraction 60 crossout miles endcrossout' +
                       ' over crossout hours endcrossout endfraction times' +
                       ' startfraction 5,280 feet over 1 crossout miles' +
                       ' endcrossout endfraction times startfraction 1' +
                       ' crossout hours endcrossout over 60 minutes' +
                       ' endfraction equals startfraction 5,280 feet over' +
                       ' minutes endfraction', 'default');
  this.executeRuleTest(mml, 'startfrac 60 crossout miles endcrossout over' +
                       ' crossout hours endcrossout endfrac times startfrac' +
                       ' 5,280 feet over 1 crossout miles endcrossout' +
                       ' endfrac times startfrac 1 crossout hours' +
                       ' endcrossout over 60 minutes endfrac equals' +
                       ' startfrac 5,280 feet over minutes endfrac', 'brief');
  this.executeRuleTest(mml, 'frac 60 crossout miles endcrossout over' +
                       ' crossout hours endcrossout endfrac times frac 5,280' +
                       ' feet over 1 crossout miles endcrossout endfrac' +
                       ' times frac 1 crossout hours endcrossout over 60' +
                       ' minutes endfrac equals frac 5,280 feet over minutes' +
                       ' endfrac', 'sbrief');
};


/**
 * Testing Rule 13.1, Example 2.
 */
sre.MathspeakRuleTest.prototype.untestSample_13_1_2 = function() {
  var mml = '<mrow><mn>1</mn><mtext>J</mtext><mo>=</mo><mn>1</mn>' +
      '<mtext>kg</mtext><mo>·</mo><msup><mtext>m</mtext><mn>2</mn></msup>' +
      '<mo>·</mo><msup><mtext>s</mtext><mrow><mo>-</mo><mn>2</mn></mrow>' +
      '</msup><mi>x</mi></mrow>';
  this.executeRuleTest(mml, '1 joules equals 1 kilograms dot meters squared' +
                       ' dot seconds superscript minus 2', 'default');
  this.executeRuleTest(mml, '1 joules equals 1 kilograms dot meters squared' +
                       ' dot seconds sup minus 2', 'brief');
  this.executeRuleTest(mml, '1 joules equals 1 kilograms dot meters squared' +
                       ' dot seconds sup minus 2', 'sbrief');
};


/**
 * Testing Rule 13.1, Example 3.
 */
sre.MathspeakRuleTest.prototype.untestSample_13_1_3 = function() {
  var mml = '<mrow><mi>m</mi><mtext>m</mtext><mo>=</mo><mn>100</mn>' +
      '<mi>m</mi><mtext>cm</mtext><mo>=</mo><mfrac><mi>m</mi><mrow>' +
      '<mn>1</mn><mo>,</mo><mn>000</mn></mrow></mfrac><mtext>km</mtext>' +
      '</mrow>';
  this.executeRuleTest(mml, 'm meters equals 100 m centimeters equals' +
                       ' startfraction m over 1,000 endfraction kilometers',
                       'default');
  this.executeRuleTest(mml, 'm meters equals 100 m centimeters equals' +
                       ' startfrac m over 1,000 endfrac kilometers', 'brief');
  this.executeRuleTest(mml, 'm meters equals 100 m centimeters equals frac m' +
                       ' over 1,000 endfrac kilometers', 'sbrief');
};


/**
 * Testing Rule 13.1, Example 4.
 */
sre.MathspeakRuleTest.prototype.untestSample_13_1_4 = function() {
  var mml = '<mrow><mn>1</mn><mtext>in</mtext><mo>=</mo><mn>2</mn><mo>,</mo>' +
      '<mn>54</mn><mtext>cm</mtext></mrow>';
  this.executeRuleTest(mml, '1 miles almost-equals 1.6 kilometers', 'default');
  this.executeRuleTest(mml, '1 miles almost-equals 1.6 kilometers', 'brief');
  this.executeRuleTest(mml, '1 miles almost-equals 1.6 kilometers', 'sbrief');
};


/**
 * Testing Rule 14.1, Example 1.
 */
sre.MathspeakRuleTest.prototype.untestSample_14_1_1 = function() {
  var mml = '<mtable><mtr><mtd><msub><mi>H</mi><mn>2</mn></msub></mtd><mtd>' +
      '<mo>+</mo></mtd><mtd><msub><mi>F</mi><mn>2</mn></msub></mtd><mtd>' +
      '<mo>→</mo></mtd><mtd><mrow><mn>2</mn><mi>H</mi><mi>F</mi></mrow>' +
      '</mtd></mtr><mtr><mtd><mtext>hydorgen</mtext></mtd><mtd/><mtd>' +
      '<mtext>flourine</mtext></mtd><mtd/><mtd><mrow>' +
      '<mtext>hydrogen</mtext><mspace width="4.pt"/>' +
      '<mtext>flouride</mtext></mrow></mtd></mtr></mtable>';
  this.executeRuleTest(mml, 'startlayout 1st row 1st column upper h 2 2nd' +
                       ' column plus 3rd column upper f 2 4th column' +
                       ' right-arrow 5th column 2 upper h upper f 2nd row' +
                       ' 1st column hydrogen 2nd column blank 3rd column' +
                       ' flourine 4th column blank 5th column hydrogen' +
                       ' fluoride endlayout', 'default');
  this.executeRuleTest(mml, 'startlayout 1st row 1st column upper h 2 2nd' +
                       ' column plus 3rd column upper f 2 4th column' +
                       ' right-arrow 5th column 2 upper h upper f 2nd row' +
                       ' 1st column hydrogen 2nd column blank 3rd column' +
                       ' flourine 4th column blank 5th column hydrogen' +
                       ' fluoride endlayout', 'brief');
  this.executeRuleTest(mml, 'layout 1st row 1st column upper h 2 2nd column' +
                       ' plus 3rd column upper f 2 4th column r arrow 5th' +
                       ' column 2 upper h upper f 2nd row 1st column' +
                       ' hydrogen 2nd column blank 3rd column flourine 4th' +
                       ' column blank 5th column hydrogen fluoride' +
                       ' endlayout', 'sbrief');
};


/**
 * Testing Rule 14.3, Example 1.
 */
sre.MathspeakRuleTest.prototype.untestSample_14_3_1 = function() {
  var mml = '<mrow><mi>x</mi><mo>=</mo>' +
      '<mfenced separators="" open="{" close=""><mtable><mtr><mtd><mrow>' +
      '<mi>y</mi><mo>&lt;</mo><mn>0</mn></mrow></mtd><mtd><mn>0</mn></mtd>' +
      '</mtr><mtr><mtd><mrow><mi>y</mi><mo>≥</mo><mn>0</mn></mrow></mtd>' +
      '<mtd><mrow><mn>2</mn><mi>y</mi></mrow></mtd></mtr></mtable>' +
      '</mfenced></mrow>';
  this.executeRuleTest(mml, 'x equals startlayout enlarged left-brace 1st' +
                       ' row 1st column y less-than 0 2nd column 0 2nd row' +
                       ' 1st column y greater-than-or-equal-to 0 2nd column' +
                       ' 2 y endlayout', 'default');
  this.executeRuleTest(mml, 'x equals startlayout enlarged left-brace 1st' +
                       ' row 1st column y less-than 0 2nd column 0 2nd row' +
                       ' 1st column y greater-than-or-equal-to 0 2nd column' +
                       ' 2 y endlayout', 'brief');
  this.executeRuleTest(mml, 'x equals layout enlarged l brace 1st row 1st' +
                       ' column y less-than 0 2nd column 0 2nd row 1st' +
                       ' column y greater-than-or-equal-to 0 2nd column 2 y' +
                       ' endlayout', 'sbrief');
};


/**
 * Testing Rule 15.1, Example 1.
 */
sre.MathspeakRuleTest.prototype.untestSample_15_1_1 = function() {
  var mml = '<mfenced open="[" close="]"><mtable><mtr><mtd><mrow><mi>x</mi>' +
      '<mo>+</mo><mi>a</mi></mrow></mtd><mtd><mrow><mi>x</mi><mo>+</mo>' +
      '<mi>b</mi></mrow></mtd><mtd><mrow><mi>x</mi><mo>+</mo><mi>c</mi>' +
      '</mrow></mtd></mtr><mtr><mtd><mrow><mi>y</mi><mo>+</mo><mi>a</mi>' +
      '</mrow></mtd><mtd><mrow><mi>y</mi><mo>+</mo><mi>b</mi></mrow></mtd>' +
      '<mtd><mrow><mi>y</mi><mo>+</mo><mi>c</mi></mrow></mtd></mtr><mtr>' +
      '<mtd><mrow><mi>z</mi><mo>+</mo><mi>a</mi></mrow></mtd><mtd><mrow>' +
      '<mi>z</mi><mo>+</mo><mi>b</mi></mrow></mtd><mtd><mrow><mi>z</mi>' +
      '<mo>+</mo><mi>c</mi></mrow></mtd></mtr></mtable></mfenced>';
  this.executeRuleTest(mml, 'start 3 by 3 matrix 1st row 1st column x plus a' +
                       ' 2nd column x plus b 3rd column x plus c 2nd row 1st' +
                       ' column y plus a 2nd column y plus b 3rd column y' +
                       ' plus c 3rd row 1st column z plus a 2nd column z' +
                       ' plus b 3rd column z plus c endmatrix', 'default');
  this.executeRuleTest(mml, 'start 3 by 3 matrix 1st row 1st column x plus a' +
                       ' 2nd column x plus b 3rd column x plus c 2nd row 1st' +
                       ' column y plus a 2nd column y plus b 3rd column y' +
                       ' plus c 3rd row 1st column z plus a 2nd column z' +
                       ' plus b 3rd column z plus c endmatrix', 'brief');
  this.executeRuleTest(mml, '3 by 3 matrix 1st row 1st column x plus a 2nd' +
                       ' column x plus b 3rd column x plus c 2nd row 1st' +
                       ' column y plus a 2nd column y plus b 3rd column y' +
                       ' plus c 3rd row 1st column z plus a 2nd column z' +
                       ' plus b 3rd column z plus c endmatrix', 'sbrief');
};


/**
 * Testing Rule 15.2, Example 1.
 */
sre.MathspeakRuleTest.prototype.untestSample_15_2_1 = function() {
  var mml = '<mrow><mfenced open="|" close="|"><mtable><mtr><mtd><mrow>' +
      '<mi>a</mi><mo>+</mo><mn>1</mn></mrow></mtd><mtd><mi>b</mi></mtd>' +
      '</mtr><mtr><mtd><mi>c</mi></mtd><mtd><mi>d</mi></mtd></mtr>' +
      '</mtable></mfenced><mo>=</mo><mrow><mo>(</mo><mi>a</mi><mo>+</mo>' +
      '<mn>1</mn><mo>)</mo></mrow><mi>d</mi><mo>-</mo><mi>b</mi><mi>c</mi>' +
      '</mrow>';
  this.executeRuleTest(mml, 'start 2 by 2 determinant 1st row 1st column a' +
                       ' plus 1 2nd column b 2nd row 1st column c 2nd column' +
                       ' d enddeterminant equals left-parenthesis a plus 1' +
                       ' right-parenthesis d minus b c', 'default');
  this.executeRuleTest(mml, 'start 2 by 2 determinant 1st row 1st column a' +
                       ' plus 1 2nd column b 2nd row 1st column c 2nd column' +
                       ' d enddeterminant equals left-pren a plus 1' +
                       ' right-pren d minus b c', 'brief');
  this.executeRuleTest(mml, '2 by 2 determinant 1st row 1st column a plus 1' +
                       ' 2nd column b 2nd row 1st column c 2nd column d' +
                       ' enddeterminant equals l pren a plus 1 r pren d' +
                       ' minus b c', 'sbrief');
};


/**
 * Testing Rule 15.4, Example 1.
 */
sre.MathspeakRuleTest.prototype.untestSample_15_4_1 = function() {
  var mml = '<mrow><mfenced open="|" close="|"><mtable><mtr><mtd><mi>a</mi>' +
      '</mtd><mtd><mi>b</mi></mtd></mtr><mtr><mtd><mi>c</mi></mtd><mtd>' +
      '<mi>d</mi></mtd></mtr></mtable></mfenced><mo>=</mo><mi>a</mi>' +
      '<mi>d</mi><mo>-</mo><mi>b</mi><mi>c</mi></mrow>';
  this.executeRuleTest(mml, 'start 2 by 2 determinant 1st row a b 2nd row c' +
                       ' d enddeterminant equals a d minus b c', 'default');
  this.executeRuleTest(mml, 'start 2 by 2 determinant 1st row a b 2nd row c' +
                       ' d enddeterminant equals a d minus b c', 'brief');
  this.executeRuleTest(mml, '2 by 2 determinant 1st row a b 2nd row c d' +
                       ' enddeterminant equals a d minus b c', 'sbrief');
};


/**
 * Testing Rule 15.6, Example 1.
 */
sre.MathspeakRuleTest.prototype.untestSample_15_6_1 = function() {
  var mml = '<mfenced open="(" close=")"><mtable><mtr><mtd><mi>x</mi></mtd>' +
      '</mtr><mtr><mtd><mi>y</mi></mtd></mtr></mtable></mfenced>';
  this.executeRuleTest(mml, 'startbinomialormatrix x choose y' +
                       ' endbinomialormatrix', 'default');
  this.executeRuleTest(mml, 'startbinomialormatrix x choose y' +
                       ' endbinomialormatrix', 'brief');
  this.executeRuleTest(mml, 'binomialormatrix x choose y' +
                       ' endbinomialormatrix', 'sbrief');
};

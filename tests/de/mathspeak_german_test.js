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
 * @fileoverview Testcases for mathspeak speech rules.
 * @author Volker.Sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.MathspeakGermanTest');

goog.require('sre.AbstractRuleTest');



/**
 * @constructor
 * @extends {sre.AbstractRuleTest}
 */
sre.MathspeakGermanTest = function() {
  sre.MathspeakGermanTest.base(this, 'constructor');

  /**
   * @override
   */
  this.information = 'Mathspeak German tests.';

  /**
   * @override
   */
  this.domain = 'mathspeak';

  /**
   * @override
   */
  this.locale = 'de';

  this.compare = true;
  
  this.setActive('MathspeakGerman');
};
goog.inherits(sre.MathspeakGermanTest, sre.AbstractRuleTest);


/**
 * Testing Rule 1.1, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_1_1_1 = function() {
  var mml = '<mrow><mi>π</mi><mo>≈</mo><mn>3,14159</mn></mrow>';
  this.executeRuleTest(mml, 'pi beinahe gleich 3,141 59', 'default');
  this.executeRuleTest(mml, 'pi beinahe gleich 3,141 59', 'brief');
  this.executeRuleTest(mml, 'pi beinahe gleich 3,141 59', 'sbrief');
};


/**
 * Testing Rule 1.1, Example 2.
 */
sre.MathspeakGermanTest.prototype.testSample_1_1_2 = function() {
  var mml = '<mrow><mn>102</mn><mo>+</mo><mn>2214</mn><mo>+</mo><mn>15</mn>' +
      '<mo>=</mo><mn>2331</mn></mrow>';
  this.executeRuleTest(mml, '102 plus 2214 plus 15 ist gleich 2331', 'default');
  this.executeRuleTest(mml, '102 plus 2214 plus 15 ist gleich 2331', 'brief');
  this.executeRuleTest(mml, '102 plus 2214 plus 15 ist gleich 2331', 'sbrief');
};


/**
 * Testing Rule 1.1, Example 3.
 */
sre.MathspeakGermanTest.prototype.testSample_1_1_3 = function() {
  var mml = '<mrow><mn>59</mn><mo>×</mo><mn>0</mn><mo>=</mo><mn>0</mn></mrow>';
  this.executeRuleTest(mml, '59 mal 0 ist gleich 0', 'default');
  this.executeRuleTest(mml, '59 mal 0 ist gleich 0', 'brief');
  this.executeRuleTest(mml, '59 mal 0 ist gleich 0', 'sbrief');
};


/**
 * Testing Rule 1.2, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_1_2_1 = function() {
  var mml = '<mrow><mn>3</mn><mo>-</mo><mo>-</mo><mn>2</mn></mrow>';
  this.executeRuleTest(mml, '3 minus minus 2', 'default');
  this.executeRuleTest(mml, '3 minus minus 2', 'brief');
  this.executeRuleTest(mml, '3 minus minus 2', 'sbrief');
};


/**
 * Testing Rule 1.2, Example 2.
 */
sre.MathspeakGermanTest.prototype.testSample_1_2_2 = function() {
  var mml = '<mrow><mo>-</mo><mi>y</mi></mrow>';
  this.executeRuleTest(mml, 'minus y', 'default');
  this.executeRuleTest(mml, 'minus y', 'brief');
  this.executeRuleTest(mml, 'minus y', 'sbrief');
};


/**
 * Testing Rule 1.2, Example 3.
 */
sre.MathspeakGermanTest.prototype.testSample_1_2_3 = function() {
  var mml = '<mrow><mo>-</mo><mn>32</mn></mrow>';
  this.executeRuleTest(mml, 'minus 32', 'default');
  this.executeRuleTest(mml, 'minus 32', 'brief');
  this.executeRuleTest(mml, 'minus 32', 'sbrief');
};


/**
 * Testing Rule 1.4, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_1_4_1 = function() {
  var mml = '<mrow><mn>t2e4</mn></mrow>';
  this.executeRuleTest(mml, 'Zahl t 2 e 4', 'default');
  this.executeRuleTest(mml, 'Zahl t 2 e 4', 'brief');
  this.executeRuleTest(mml, 'Zahl t 2 e 4', 'sbrief');
};


/**
 * Testing Rule 1.4, Example 2.
 */
sre.MathspeakGermanTest.prototype.testSample_1_4_2 = function() {
  var mml = '<mrow><mn>#FF0000</mn></mrow>';
  this.executeRuleTest(mml, 'Zahl Nummernzeichen F F 0 0 0 0', 'default');
  this.executeRuleTest(mml, 'Zahl Nummernzeichen F F 0 0 0 0', 'brief');
  this.executeRuleTest(mml, 'Zahl Nummernzeichen F F 0 0 0 0', 'sbrief');
};


/**
 * Testing Rule 1.4, Example 3.
 */
sre.MathspeakGermanTest.prototype.testSample_1_4_3 = function() {
  var mml = '<mrow><mn>0x15FF</mn><mo>+</mo><mn>0x2B01</mn><mo>=</mo>' +
      '<mn>0x4100</mn></mrow>';
  this.executeRuleTest(mml, 'Zahl 0 x 1 5 F F plus Zahl 0 x 2 B 0 1 ist gleich Zahl 0 x 4 1 0 0', 'default');
  this.executeRuleTest(mml, 'Zahl 0 x 1 5 F F plus Zahl 0 x 2 B 0 1 ist gleich Zahl 0 x 4 1 0 0', 'brief');
  this.executeRuleTest(mml, 'Zahl 0 x 1 5 F F plus Zahl 0 x 2 B 0 1 ist gleich Zahl 0 x 4 1 0 0', 'sbrief');
};


/**
 * Testing Rule 1.5, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_1_5_1 = function() {
  var mml = '<mrow><mn>I</mn><mo>,</mo><mn>II</mn><mo>,</mo><mn>III</mn>' +
      '<mo>,</mo><mn>IV</mn><mo>,</mo><mn>V</mn><mo>.</mo></mrow>';
  this.executeRuleTest(mml, 'großes I Komma Wort groß I I Komma Wort groß I I I Komma Wort groß I V Komma großes V Punkt', 'default');
  this.executeRuleTest(mml, 'großes I Komma Wort groß I I Komma Wort groß I I I Komma Wort groß I V Komma großes V Punkt', 'brief');
  this.executeRuleTest(mml, 'großes I Komma Wort groß I I Komma Wort groß I I I Komma Wort groß I V Komma großes V Punkt', 'sbrief');
};


/**
 * Testing Rule 2.1, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_2_1_1 = function() {
  var mml = '<mrow><mi>d</mi><mo>=</mo><msqrt><mrow><msup><mrow><mo>(</mo>' +
      '<mi>X</mi><mo>-</mo><mi>x</mi><mo>)</mo></mrow><mn>2</mn></msup>' +
      '<mo>-</mo><msup><mrow><mo>(</mo><mi>Y</mi><mo>-</mo><mi>y</mi>' +
      '<mo>)</mo></mrow><mn>2</mn></msup></mrow></msqrt></mrow>';
  this.executeRuleTest(mml, 'd ist gleich Anfang Quadratwurzel Klammer auf großes X minus x Klammer zu Quadrat minus Klammer auf großes Y minus y Klammer zu Quadrat Ende Quadratwurzel', 'default');
  this.executeRuleTest(mml, 'd ist gleich Anfang Quadratwurzel Klammer auf großes X minus x Klammer zu Quadrat minus Klammer auf großes Y minus y Klammer zu Quadrat Ende Quadratwurzel', 'brief');
  this.executeRuleTest(mml, 'd ist gleich Quadratwurzel Klammer auf großes X minus x Klammer zu Quadrat minus Klammer auf großes Y minus y Klammer zu Quadrat Ende Quadratwurzel', 'sbrief');
};


/**
 * Testing Rule 2.3, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_2_3_1 = function() {
  var mml = '<mrow><mtext>Wenn</mtext><mspace width="4.pt"/><mi>A</mi>' +
      '<mo>→</mo><mi>B</mi><mspace width="4.pt"/><mtext>und</mtext>' +
      '<mspace width="4.pt"/><mi>B</mi><mo>→</mo><mi>C</mi>' +
      '<mspace width="4.pt"/><mtext>dann</mtext><mspace width="4.pt"/>' +
      '<mi>A</mi><mo>→</mo><mi>C</mi><mo>.</mo></mrow>';
  this.executeRuleTest(mml, 'Wenn großes A Pfeil nach rechts großes B und großes B Pfeil nach rechts großes C dann großes A Pfeil nach rechts großes C Punkt', 'default');
  this.executeRuleTest(mml, 'Wenn großes A Pfeil nach rechts großes B und großes B Pfeil nach rechts großes C dann großes A Pfeil nach rechts großes C Punkt', 'brief');
  this.executeRuleTest(mml, 'Wenn großes A Pfeil nach rechts großes B und großes B Pfeil nach rechts großes C dann großes A Pfeil nach rechts großes C Punkt', 'sbrief');
};


/**
 * Testing Rule 2.6, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_2_6_1 = function() {
  var mml = '<mrow><mo mathvariant="bold">[</mo><mi>x</mi>' +
      '<mo mathvariant="bold">]</mo></mrow>';
  this.executeRuleTest(mml, 'fettes eckige Klammer auf x fettes eckige Klammer zu', 'default');
  this.executeRuleTest(mml, 'fettes eckige Klammer auf x fettes eckige Klammer zu', 'brief');
  this.executeRuleTest(mml, 'fettes eckige Klammer auf x fettes eckige Klammer zu', 'sbrief');
};


/**
 * Testing Rule 2.6, Example 2.
 */
sre.MathspeakGermanTest.prototype.testSample_2_6_2 = function() {
  var mml = '<mrow><mo>∮</mo><mi>E</mi><mo>·</mo><mi>d</mi>' +
      '<mi mathvariant="bold">l</mi><mo>=</mo><mo>-</mo><mfrac><mrow>' +
      '<mi>d</mi><mi>Φ</mi><mi>B</mi></mrow><mrow><mi>d</mi><mi>t</mi>' +
      '</mrow></mfrac></mrow>';
  this.executeRuleTest(mml, 'Randintegral großes E mal d fettes l ist gleich minus Anfang Bruch d großes Phi großes B durch d t Ende Bruch', 'default');
  this.executeRuleTest(mml, 'Randintegral großes E mal d fettes l ist gleich minus Anfang Bruch d großes Phi großes B durch d t Ende Bruch', 'brief');
  this.executeRuleTest(mml, 'Randintegral großes E mal d fettes l ist gleich minus Bruch d großes Phi großes B durch d t Ende Bruch', 'sbrief');
};


/**
 * Testing prefix operation as negative or minus.
 */
sre.MathspeakGermanTest.prototype.testNegativeVsMinus = function() {
  var mml = '<mrow><mo>-</mo><mfrac><mn>1</mn><mi>b</mi></mfrac></mrow>';
  this.executeRuleTest(mml, 'minus Anfang Bruch 1 durch b Ende Bruch', 'default');
  mml = '<mrow><mo>-</mo><mfrac><mi>a</mi><mi>b</mi></mfrac></mrow>';
  this.executeRuleTest(mml, 'minus Anfang Bruch a durch b Ende Bruch', 'default');
  mml = '<mrow><mo>-</mo><mn>3</mn><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow>';
  this.executeRuleTest(mml, 'minus 3 ein halb', 'default');
};


/**
 * Testing Rule 4.2, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_4_2_1 = function() {
  var mml = '<mrow><mtext>Gross</mtext><mo>(</mo><mo>{</mo><mi>α</mi>' +
      '<mo>,</mo><mi>β</mi><mo>,</mo><mi>γ</mi><mo>,</mo><mi>δ</mi>' +
      '<mo>,</mo><mi>ϵ</mi><mo>,</mo><mi>φ</mi><mo>}</mo><mo>)</mo>' +
      '<mo>=</mo><mo>{</mo><mi>Α</mi><mo>,</mo><mi>Β</mi><mo>,</mo>' +
      '<mi>Γ</mi><mo>,</mo><mi>Δ</mi><mo>,</mo><mi>Ε</mi><mo>,</mo>' +
      '<mi>Φ</mi><mo>}</mo></mrow>';
  this.executeRuleTest(mml, 'Gross Klammer auf Anfang Menge alpha Komma beta Komma gamma Komma delta Komma epsilon Komma phi Ende Menge Klammer zu ist gleich Anfang Menge großes Alpha Komma großes Beta Komma großes Gamma Komma großes Delta Komma großes Epsilon Komma großes Phi Ende Menge', 'default');
  this.executeRuleTest(mml, 'Gross Klammer auf Anfang Menge alpha Komma beta Komma gamma Komma delta Komma epsilon Komma phi Ende Menge Klammer zu ist gleich Anfang Menge großes Alpha Komma großes Beta Komma großes Gamma Komma großes Delta Komma großes Epsilon Komma großes Phi Ende Menge', 'brief');
  this.executeRuleTest(mml, 'Gross Klammer auf Menge alpha Komma beta Komma gamma Komma delta Komma epsilon Komma phi Ende Menge Klammer zu ist gleich Menge großes Alpha Komma großes Beta Komma großes Gamma Komma großes Delta Komma großes Epsilon Komma großes Phi Ende Menge', 'sbrief');
};


/**
 * Testing Rule 5.1, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_5_1_1 = function() {
  var mml = '<mrow><mi>y</mi><mo>-</mo><mn>1</mn></mrow>';
  this.executeRuleTest(mml, 'y minus 1', 'default');
  this.executeRuleTest(mml, 'y minus 1', 'brief');
  this.executeRuleTest(mml, 'y minus 1', 'sbrief');
};


/**
 * Testing Rule 5.1, Example 2.
 */
sre.MathspeakGermanTest.prototype.testSample_5_1_2 = function() {
  var mml = '<mrow><mo>(</mo><mn>1</mn><mtext> a </mtext>' +
      '<mn>1</mn><mo>)</mo></mrow>';
  this.executeRuleTest(mml, 'Klammer auf 1 a 1 Klammer zu', 'default');
  this.executeRuleTest(mml, 'Klammer auf 1 a 1 Klammer zu', 'brief');
  this.executeRuleTest(mml, 'Klammer auf 1 a 1 Klammer zu', 'sbrief');
};


/**
 * Testing Rule 5.1, Example 3.
 */
sre.MathspeakGermanTest.prototype.testSample_5_1_3 = function() {
  var mml = '<mrow><mo>-</mo><mn>1</mn></mrow>';
  this.executeRuleTest(mml, 'minus 1', 'default');
  this.executeRuleTest(mml, 'minus 1', 'brief');
  this.executeRuleTest(mml, 'minus 1', 'sbrief');
};


/**
 * Testing Rule 6.1, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_6_1_1 = function() {
  var mml = '<mtext>Die Fibonaccizahlen sind: </mtext><mrow><mo>{</mo>' +
      '<mn>0</mn><mo>,</mo><mn>1</mn><mo>,</mo><mn>1</mn><mo>,</mo>' +
      '<mn>2</mn><mo>,</mo><mn>3</mn><mo>,</mo><mn>5</mn><mo>,</mo>' +
      '<mn>8</mn><mo>,</mo><mo>&#x2026;</mo><mo>}</mo></mrow>';
  this.executeRuleTest(mml, 'Die Fibonaccizahlen sind Doppelpunkt Anfang Menge 0 Komma 1 Komma 1 Komma 2 Komma 3 Komma 5 Komma 8 Komma horizontale Ellipsis Ende Menge', 'default');
  this.executeRuleTest(mml, 'Die Fibonaccizahlen sind Doppelpunkt Anfang Menge 0 Komma 1 Komma 1 Komma 2 Komma 3 Komma 5 Komma 8 Komma horizontale Ellipsis Ende Menge', 'brief');
  this.executeRuleTest(mml, 'Die Fibonaccizahlen sind Doppelpunkt Menge 0 Komma 1 Komma 1 Komma 2 Komma 3 Komma 5 Komma 8 Komma horizontale Ellipsis Ende Menge', 'sbrief');
};


/**
 * Testing Rule 6.2, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_6_2_1 = function() {
  var mml = '<mrow><mo>|</mo><mn>4</mn><mo>-</mo><mn>7</mn><mo>|</mo>' +
      '<mo>=</mo><mn>3</mn></mrow>';
  this.executeRuleTest(mml, 'Anfang Betrag 4 minus 7 Ende Betrag ist gleich 3', 'default');
  this.executeRuleTest(mml, 'Anfang Betrag 4 minus 7 Ende Betrag ist gleich 3', 'brief');
  this.executeRuleTest(mml, 'Betrag 4 minus 7 Ende Betrag ist gleich 3', 'sbrief');
};


/**
 * Testing Rule 6.2, Example 2.
 * This equation does not make sense! We can do it purely syntactically!
 */
sre.MathspeakGermanTest.prototype.testSample_6_2_2 = function() {
  var mml = '<mrow><mfenced separators="" open="|" close="|"><mi>a</mi>' +
      '<mo>&#xb1;</mo><mfenced separators="" open="|" close="|"><mi>b</mi>' +
      '<mo>-</mo><mi>c</mi></mfenced></mfenced><mo>&#x2260;</mo>' +
      '<mfenced open="|" close="|"><mi>a</mi></mfenced><mo>&#xb1;</mo>' +
      '<mfenced separators="" open="|" close="|"><mi>b</mi><mo>-</mo>' +
      '<mi>c</mi></mfenced></mrow>';
  this.executeRuleTest(mml, 'Anfang Betrag a plus minus Anfang Betrag b minus c Ende Betrag Ende Betrag ungleich Anfang Betrag a Ende Betrag plus minus Anfang Betrag b minus c Ende Betrag', 'default');
  this.executeRuleTest(mml, 'Anfang Betrag a plus minus Anfang Betrag b minus c Ende Betrag Ende Betrag ungleich Anfang Betrag a Ende Betrag plus minus Anfang Betrag b minus c Ende Betrag', 'brief');
  this.executeRuleTest(mml, 'Betrag a plus minus Betrag b minus c Ende Betrag Ende Betrag ungleich Betrag a Ende Betrag plus minus Betrag b minus c Ende Betrag', 'sbrief');
};


/**
 * Testing Rule 7.1, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_7_1_1 = function() {
  var mml = '<mfrac><mn>1</mn><mi>x</mi></mfrac>';
  this.executeRuleTest(mml, 'Anfang Bruch 1 durch x Ende Bruch', 'default');
  this.executeRuleTest(mml, 'Anfang Bruch 1 durch x Ende Bruch', 'brief');
  this.executeRuleTest(mml, 'Bruch 1 durch x Ende Bruch', 'sbrief');
};


/**
 * Testing Rule 7.1, Example 2.
 */
sre.MathspeakGermanTest.prototype.testSample_7_1_2 = function() {
  var mml = '<mrow><mi>a</mi><mo>-</mo><mfrac><mrow><mi>b</mi><mo>+</mo>' +
      '<mi>c</mi></mrow><mrow><mi>d</mi><mo>-</mo><mi>e</mi></mrow>' +
      '</mfrac><mo>×</mo><mi>f</mi></mrow>';
  this.executeRuleTest(mml, 'a minus Anfang Bruch b plus c durch d minus e Ende Bruch mal f', 'default');
  this.executeRuleTest(mml, 'a minus Anfang Bruch b plus c durch d minus e Ende Bruch mal f', 'brief');
  this.executeRuleTest(mml, 'a minus Bruch b plus c durch d minus e Ende Bruch mal f', 'sbrief');
};


/**
 * Testing Rule 7.2, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_7_2_1 = function() {
  var mml = '<mrow><mfrac><mfrac><mi>x</mi><mi>y</mi></mfrac><mi>z</mi>' +
      '</mfrac><mo>≠</mo><mfrac><mi>x</mi><mfrac><mi>y</mi><mi>z</mi>' +
      '</mfrac></mfrac></mrow>';
  this.executeRuleTest(mml, 'Anfang Anfang Bruch Anfang Bruch x durch y Ende Bruch durch durch z Ende Ende Bruch ungleich Anfang Anfang Bruch x durch durch Anfang Bruch y durch z Ende Bruch Ende Ende Bruch', 'default');
  this.executeRuleTest(mml, 'Anfang Anfang Bruch Anfang Bruch x durch y Ende Bruch durch durch z Ende Ende Bruch ungleich Anfang Anfang Bruch x durch durch Anfang Bruch y durch z Ende Bruch Ende Ende Bruch', 'brief');
  this.executeRuleTest(mml, 'geschachteltBruch Bruch x durch y Ende Bruch geschachteltdurch z geschachteltEnde Bruch ungleich geschachteltBruch x geschachteltdurch Bruch y durch z Ende Bruch geschachteltEnde Bruch', 'sbrief');
};


/**
 * Testing Rule 7.3, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_7_3_1 = function() {
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
  this.executeRuleTest(mml, 'Anfang Anfang Anfang Bruch Anfang Anfang Bruch Klammer auf 1 minus x Klammer zu Anfang Bruch d durch d x Ende Bruch Klammer auf 2 x Klammer zu minus 2 x Anfang Bruch d durch d x Ende Bruch Klammer auf 1 minus x Klammer zu durch durch Klammer auf 1 minus x Klammer zu Quadrat Ende Ende Bruch durch durch durch 1 plus Klammer auf Anfang Bruch 2 x durch 1 minus x Ende Bruch Klammer zu Quadrat Ende Ende Ende Bruch', 'default');
  this.executeRuleTest(mml, 'Anfang Anfang Anfang Bruch Anfang Anfang Bruch Klammer auf 1 minus x Klammer zu Anfang Bruch d durch d x Ende Bruch Klammer auf 2 x Klammer zu minus 2 x Anfang Bruch d durch d x Ende Bruch Klammer auf 1 minus x Klammer zu durch durch Klammer auf 1 minus x Klammer zu Quadrat Ende Ende Bruch durch durch durch 1 plus Klammer auf Anfang Bruch 2 x durch 1 minus x Ende Bruch Klammer zu Quadrat Ende Ende Ende Bruch', 'brief');
  this.executeRuleTest(mml, 'geschachteltzweifachBruch geschachteltBruch Klammer auf 1 minus x Klammer zu Bruch d durch d x Ende Bruch Klammer auf 2 x Klammer zu minus 2 x Bruch d durch d x Ende Bruch Klammer auf 1 minus x Klammer zu geschachteltdurch Klammer auf 1 minus x Klammer zu Quadrat geschachteltEnde Bruch geschachteltzweifachdurch 1 plus Klammer auf Bruch 2 x durch 1 minus x Ende Bruch Klammer zu Quadrat geschachteltzweifachEnde Bruch', 'sbrief');
};


/**
 * Testing Rule 7.3, Example 2.
 */
sre.MathspeakGermanTest.prototype.testSample_7_3_2 = function() {
  var mml = '<mrow><msub><mi>a</mi><mn>0</mn></msub><mo>+</mo><mfrac>' +
      '<mn>1</mn><mrow><msub><mi>a</mi><mn>1</mn></msub><mo>+</mo><mfrac>' +
      '<mn>1</mn><mrow><msub><mi>a</mi><mn>2</mn></msub><mo>+</mo><mfrac>' +
      '<mn>1</mn><mrow><mo>&#x2026;</mo><mo>+</mo><mfrac><mn>1</mn><msub>' +
      '<mi>a</mi><mi>n</mi></msub></mfrac></mrow></mfrac></mrow></mfrac>' +
      '</mrow></mfrac></mrow>';
  this.executeRuleTest(mml, 'a 0 plus Anfang Anfang Anfang Anfang Bruch 1 durch durch durch durch a 1 plus Anfang Anfang Anfang Bruch 1 durch durch durch a 2 plus Anfang Anfang Bruch 1 durch durch horizontale Ellipsis plus Anfang Bruch 1 durch a Index n Grundlinie Ende Bruch Ende Ende Bruch Ende Ende Ende Bruch Ende Ende Ende Ende Bruch', 'default');
  this.executeRuleTest(mml, 'a 0 plus Anfang Anfang Anfang Anfang Bruch 1 durch durch durch durch a 1 plus Anfang Anfang Anfang Bruch 1 durch durch durch a 2 plus Anfang Anfang Bruch 1 durch durch horizontale Ellipsis plus Anfang Bruch 1 durch a Index n Grund Ende Bruch Ende Ende Bruch Ende Ende Ende Bruch Ende Ende Ende Ende Bruch', 'brief');
  this.executeRuleTest(mml, 'a 0 plus geschachteltdreifachBruch 1 geschachteltdreifachdurch a 1 plus geschachteltzweifachBruch 1 geschachteltzweifachdurch a 2 plus geschachteltBruch 1 geschachteltdurch horizontale Ellipsis plus Bruch 1 durch a Index n Grund Ende Bruch geschachteltEnde Bruch geschachteltzweifachEnde Bruch geschachteltdreifachEnde Bruch', 'sbrief');
};


/**
 * Testing Rule 7.4, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_7_4_1 = function() {
  var mml = '<mrow><mfrac><mn>1</mn><mn>2</mn></mfrac><mo>+</mo><mfrac>' +
      '<mn>2</mn><mn>2</mn></mfrac><mo>+</mo><mfrac><mn>3</mn><mn>2</mn>' +
      '</mfrac><mo>+</mo><mfrac><mn>4</mn><mn>2</mn></mfrac><mo>+</mo>' +
      '<mo>&#x2026;</mo><mo>=</mo><munderover><mo>∑</mo><mrow><mi>n</mi>' +
      '<mo>=</mo><mn>1</mn></mrow>' +
      '<mo movablelimits="true" form="prefix">∞</mo></munderover><mfrac>' +
      '<mi>n</mi><mn>2</mn></mfrac></mrow>';
  this.executeRuleTest(mml, 'ein halb plus zwei halbe plus drei halbe plus vier halbe plus horizontale Ellipsis ist gleich Summe Unterschrift n ist gleich 1 Überschrift unendlich Ende Überschrift Anfang Bruch n durch 2 Ende Bruch', 'default');
  this.executeRuleTest(mml, 'ein halb plus zwei halbe plus drei halbe plus vier halbe plus horizontale Ellipsis ist gleich Summe Unterschrift n ist gleich 1 Überschrift unendlich Ende Überschrift Anfang Bruch n durch 2 Ende Bruch', 'brief');
  this.executeRuleTest(mml, 'ein halb plus zwei halbe plus drei halbe plus vier halbe plus horizontale Ellipsis ist gleich Summe Unterschrift n ist gleich 1 Überschrift unendlich Ende Überschrift Bruch n durch 2 Ende Bruch', 'sbrief');
};


/**
 * Testing Rule 7.4, Example 2.
 */
sre.MathspeakGermanTest.prototype.testSample_7_4_2 = function() {
  var mml = '<mrow><mfrac><mn>20</mn><mn>5</mn></mfrac><mo>×</mo><mfrac>' +
      '<mn>1</mn><mn>100</mn></mfrac><mo>=</mo><mfrac><mn>1</mn>' +
      '<mn>25</mn></mfrac></mrow>';
  this.executeRuleTest(mml, 'Anfang Bruch 20 durch 5 Ende Bruch mal Anfang Bruch 1 durch 100 Ende Bruch ist gleich ein fünfundzwanzigstel', 'default');
  this.executeRuleTest(mml, 'Anfang Bruch 20 durch 5 Ende Bruch mal Anfang Bruch 1 durch 100 Ende Bruch ist gleich ein fünfundzwanzigstel', 'brief');
  this.executeRuleTest(mml, 'Bruch 20 durch 5 Ende Bruch mal Bruch 1 durch 100 Ende Bruch ist gleich ein fünfundzwanzigstel', 'sbrief');
};


/**
 * Testing Rule 7.4, Example 3.
 */
sre.MathspeakGermanTest.prototype.testSample_7_4_3 = function() {
  var mml = '<mrow><mfrac><mfrac><mn>3</mn><mn>5</mn></mfrac><mn>8</mn>' +
      '</mfrac><mo>=</mo><mfrac><mn>3</mn><mn>5</mn></mfrac><mo>×</mo>' +
      '<mfrac><mn>1</mn><mn>8</mn></mfrac></mrow>';
  this.executeRuleTest(mml, 'Anfang Bruch drei fünftel durch 8 Ende Bruch ist gleich drei fünftel mal ein achtel', 'default');
  this.executeRuleTest(mml, 'Anfang Bruch drei fünftel durch 8 Ende Bruch ist gleich drei fünftel mal ein achtel', 'brief');
  this.executeRuleTest(mml, 'Bruch drei fünftel durch 8 Ende Bruch ist gleich drei fünftel mal ein achtel', 'sbrief');
};


/**
 * Testing Rule 7.5, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_7_5_1 = function() {
  var mml = '<mrow><mn>3</mn><mfrac><mn>5</mn><mn>8</mn></mfrac><mo>=</mo>' +
      '<mfrac><mn>29</mn><mn>8</mn></mfrac></mrow>';
  this.executeRuleTest(mml, '3 fünf achtel ist gleich Anfang Bruch 29 durch 8 Ende Bruch', 'default');
  this.executeRuleTest(mml, '3 fünf achtel ist gleich Anfang Bruch 29 durch 8 Ende Bruch', 'brief');
  this.executeRuleTest(mml, '3 fünf achtel ist gleich Bruch 29 durch 8 Ende Bruch', 'sbrief');
};


/**
 * Testing Rule 7.6, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_7_6_1 = function() {
  var mml = '<mrow><msub><mi>a</mi><mn>0</mn></msub><mo>+</mo><mfrac><msub>' +
      '<mi>b</mi><mn>1</mn></msub><mrow><msub><mi>a</mi><mn>1</mn></msub>' +
      '<mo>+</mo><mfrac><msub><mi>b</mi><mn>2</mn></msub><mrow><msub>' +
      '<mi>a</mi><mn>2</mn></msub><mo>+</mo><mfrac><msub><mi>b</mi>' +
      '<mn>3</mn></msub><mrow><msub><mi>a</mi><mn>3</mn></msub><mo>+</mo>' +
      '<mo>&#x2026;</mo></mrow></mfrac></mrow></mfrac></mrow></mfrac>' +
      '<mo>=</mo><msub><mi>a</mi><mn>0</mn></msub><mo>+</mo><mfrac><msub>' +
      '<mi>b</mi><mn>1</mn></msub><msub><mi>a</mi><mn>1</mn></msub></mfrac>' +
      '<mo>+</mo><mfrac><msub><mi>b</mi><mn>2</mn></msub><msub><mi>a</mi>' +
      '<mn>2</mn></msub></mfrac><mo>+</mo><mo>&#x2026;</mo></mrow>';
  this.executeRuleTest(mml, 'a 0 plus Kettenbruch b 1 durch a 1 plus Anfang Bruch b 2 durch a 2 plus Anfang Bruch b 3 durch a 3 plus horizontale Ellipsis ist gleich a 0 plus Anfang Bruch b 1 durch a 1 Ende Bruch plus Anfang Bruch b 2 durch a 2 Ende Bruch plus horizontale Ellipsis', 'default');
  this.executeRuleTest(mml, 'a 0 plus Anfang Anfang Anfang Bruch b 1 durch durch durch a 1 plus Anfang Anfang Bruch b 2 durch durch a 2 plus Anfang Bruch b 3 durch a 3 plus horizontale Ellipsis Ende Bruch Ende Ende Bruch Ende Ende Ende Bruch ist gleich a 0 plus Anfang Bruch b 1 durch a 1 Ende Bruch plus Anfang Bruch b 2 durch a 2 Ende Bruch plus horizontale Ellipsis', 'brief');
  this.executeRuleTest(mml, 'a 0 plus geschachteltzweifachBruch b 1 geschachteltzweifachdurch a 1 plus Bruch b 2 durch a 2 plus Bruch b 3 durch a 3 plus horizontale Ellipsis geschachteltzweifachEnde Bruch ist gleich a 0 plus Bruch b 1 durch a 1 Ende Bruch plus Bruch b 2 durch a 2 Ende Bruch plus horizontale Ellipsis', 'sbrief');
};


/**
 * Testing Rule 8.1, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_8_1_1 = function() {
  var mml = '<mrow><msup><mi>x</mi><mn>3</mn></msup><mo>+</mo><mn>6</mn>' +
      '<msup><mi>x</mi><mn>2</mn></msup><mo>-</mo><mi>x</mi><mo>=</mo>' +
      '<mn>30</mn></mrow>';
  this.executeRuleTest(mml, 'x Kubik plus 6 x Quadrat minus x ist gleich 30', 'default');
  this.executeRuleTest(mml, 'x Kubik plus 6 x Quadrat minus x ist gleich 30', 'brief');
  this.executeRuleTest(mml, 'x Kubik plus 6 x Quadrat minus x ist gleich 30', 'sbrief');
};


/**
 * Testing Rule 8.1, Example 2.
 */
sre.MathspeakGermanTest.prototype.testSample_8_1_2 = function() {
  var mml = '<mrow><mfrac><mrow><msup><mi>d</mi><mn>2</mn></msup><mi>y</mi>' +
      '</mrow><mrow><mi>d</mi><msup><mi>x</mi><mn>2</mn></msup></mrow>' +
      '</mfrac><mo>+</mo><mfenced separators="" open="(" close=")">' +
      '<mi>a</mi><msup><mi>x</mi><mn>2</mn></msup><mo>+</mo><mi>b</mi>' +
      '<mi>x</mi><mo>+</mo><mi>c</mi></mfenced><mi>y</mi><mo>=</mo>' +
      '<mn>0</mn></mrow>';
  this.executeRuleTest(mml, 'Anfang Bruch d Quadrat y durch d x Quadrat Ende Bruch plus Klammer auf a x Quadrat plus b x plus c Klammer zu y ist gleich 0', 'default');
  this.executeRuleTest(mml, 'Anfang Bruch d Quadrat y durch d x Quadrat Ende Bruch plus Klammer auf a x Quadrat plus b x plus c Klammer zu y ist gleich 0', 'brief');
  this.executeRuleTest(mml, 'Bruch d Quadrat y durch d x Quadrat Ende Bruch plus Klammer auf a x Quadrat plus b x plus c Klammer zu y ist gleich 0', 'sbrief');
};


/**
 * Testing Rule 8.2, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_8_2_1 = function() {
  var mml = '<msup><mi>x</mi><mfrac><mn>1</mn><mn>2</mn></mfrac></msup>';
  this.executeRuleTest(mml, 'x hoch ein halb', 'default');
  this.executeRuleTest(mml, 'x hoch ein halb', 'brief');
  this.executeRuleTest(mml, 'x hoch ein halb', 'sbrief');
};


/**
 * Testing Rule 8.2, Example 2.
 */
sre.MathspeakGermanTest.prototype.testSample_8_2_2 = function() {
  var mml = '<msub><mi>x</mi><mi>n</mi></msub>';
  this.executeRuleTest(mml, 'x Index n', 'default');
  this.executeRuleTest(mml, 'x Index n', 'brief');
  this.executeRuleTest(mml, 'x Index n', 'sbrief');
};


/**
 * Testing Rule 8.2, Example 3.
 */
sre.MathspeakGermanTest.prototype.testSample_8_2_3 = function() {
  var mml = '<msup><mi>x</mi><mi>a</mi></msup>';
  this.executeRuleTest(mml, 'x hoch a', 'default');
  this.executeRuleTest(mml, 'x hoch a', 'brief');
  this.executeRuleTest(mml, 'x hoch a', 'sbrief');
};


/**
 * Testing Rule 8.3, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_8_3_1 = function() {
  var mml = '<msup><mi>x</mi><mrow><mi>m</mi><mo>+</mo><mi>n</mi></mrow>' +
      '</msup>';
  this.executeRuleTest(mml, 'x hoch m plus n', 'default');
  this.executeRuleTest(mml, 'x hoch m plus n', 'brief');
  this.executeRuleTest(mml, 'x hoch m plus n', 'sbrief');
};


/**
 * Testing Rule 8.3, Example 2.
 */
sre.MathspeakGermanTest.prototype.testSample_8_3_2 = function() {
  var mml = '<mrow><msub><mi>T</mi><mrow><mi>n</mi><mo>-</mo><mn>1</mn>' +
      '</mrow></msub><mo>+</mo><mn>5</mn><mo>=</mo><mn>0</mn></mrow>';
  this.executeRuleTest(mml, 'großes T Index n minus 1 Grundlinie plus 5 ist gleich 0', 'default');
  this.executeRuleTest(mml, 'großes T Index n minus 1 Grund plus 5 ist gleich 0', 'brief');
  this.executeRuleTest(mml, 'großes T Index n minus 1 Grund plus 5 ist gleich 0', 'sbrief');
};


/**
 * Testing Rule 8.3, Example 3.
 */
sre.MathspeakGermanTest.prototype.testSample_8_3_3 = function() {
  var mml = '<mrow><msup><mi>x</mi><mrow><mi>m</mi><mo>+</mo><mi>n</mi>' +
      '</mrow></msup><mo>=</mo><msup><mi>x</mi><mi>m</mi></msup><msup>' +
      '<mi>x</mi><mi>n</mi></msup></mrow>';
  this.executeRuleTest(mml, 'x hoch m plus n Grundlinie ist gleich x hoch m Grundlinie x hoch n', 'default');
  this.executeRuleTest(mml, 'x hoch m plus n Grund ist gleich x hoch m Grund x hoch n', 'brief');
  this.executeRuleTest(mml, 'x hoch m plus n Grund ist gleich x hoch m Grund x hoch n', 'sbrief');
};


/**
 * Testing Rule 8.4, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_8_4_1 = function() {
  var mml = '<msup><mi>x</mi><mrow><msub><mi>a</mi><mi>n</mi></msub>' +
      '<mo>+</mo><msub><mi>a</mi><mrow><mi>n</mi><mo>-</mo><mn>1</mn>' +
      '</mrow></msub></mrow></msup>';
  this.executeRuleTest(mml, 'x hoch a hoch Index n hoch plus a hoch Index n minus 1', 'default');
  this.executeRuleTest(mml, 'x hoch a hoch Index n hoch plus a hoch Index n minus 1', 'brief');
  this.executeRuleTest(mml, 'x hoch a hoch Index n hoch plus a hoch Index n minus 1', 'sbrief');
};


/**
 * Testing Rule 8.4, Example 2.
 */
sre.MathspeakGermanTest.prototype.testSample_8_4_2 = function() {
  var mml = '<msup><mi>x</mi><msub><mi>a</mi><mi>b</mi></msub></msup>';
  this.executeRuleTest(mml, 'x hoch a hoch Index b', 'default');
  this.executeRuleTest(mml, 'x hoch a hoch Index b', 'brief');
  this.executeRuleTest(mml, 'x hoch a hoch Index b', 'sbrief');
};


/**
 * Testing Rule 8.4, Example 3.
 */
sre.MathspeakGermanTest.prototype.testSample_8_4_3 = function() {
  var mml = '<msub><mi>x</mi><msup><mi>a</mi><mi>b</mi></msup></msub>';
  this.executeRuleTest(mml, 'x Index a Index hoch b', 'default');
  this.executeRuleTest(mml, 'x Index a Index hoch b', 'brief');
  this.executeRuleTest(mml, 'x Index a Index hoch b', 'sbrief');
};


/**
 * Testing Rule 8.4, Example 4.
 */
sre.MathspeakGermanTest.prototype.testSample_8_4_4 = function() {
  var mml = '<mrow><msup><mi>y</mi><msup><mi>a</mi><msub><mi>b</mi>' +
      '<mi>c</mi></msub></msup></msup><mo>≠</mo><msup><mi>y</mi><mrow>' +
      '<msup><mi>a</mi><mi>b</mi></msup><mi>c</mi></mrow></msup></mrow>';
  this.executeRuleTest(mml, 'y hoch a hoch hoch b hoch hoch Index c Grundlinie ungleich y hoch a hoch hoch b hoch c', 'default');
  this.executeRuleTest(mml, 'y hoch a hoch hoch b hoch hoch Index c Grund ungleich y hoch a hoch hoch b hoch c', 'brief');
  this.executeRuleTest(mml, 'y hoch a hoch hoch b hoch hoch Index c Grund ungleich y hoch a hoch hoch b hoch c', 'sbrief');
};


/**
 * Testing Rule 8.4, Example 5.
 */
sre.MathspeakGermanTest.prototype.testSample_8_4_5 = function() {
  var mml = '<msup><mi>y</mi><msup><mi>a</mi><mrow><msub><mrow/><mi>c</mi>' +
      '</msub><mi>b</mi></mrow></msup></msup>';
  this.executeRuleTest(mml, 'y hoch a hoch hoch Index c hoch hoch b', 'default');
  this.executeRuleTest(mml, 'y hoch a hoch hoch Index c hoch hoch b', 'brief');
  this.executeRuleTest(mml, 'y hoch a hoch hoch Index c hoch hoch b', 'sbrief');
};


/**
 * Testing Rule 8.4, Example 5, short.
 */
sre.MathspeakGermanTest.prototype.testSample_8_4_5Short = function() {
  var mml = '<msup><mi>y</mi><msup><mi>a</mi><mrow><msub><mrow/><mi>c</mi>' +
      '</msub></mrow></msup></msup>';
  this.executeRuleTest(mml, 'y hoch a hoch hoch Index c', 'default');
  this.executeRuleTest(mml, 'y hoch a hoch hoch Index c', 'brief');
  this.executeRuleTest(mml, 'y hoch a hoch hoch Index c', 'sbrief');
};


/**
 * Testing Rule 8.4, Example 5, Sup/Sub inversed.
 */
sre.MathspeakGermanTest.prototype.testSample_8_4_5Inv = function() {
  var mml = '<msub><mi>y</mi><msub><mi>a</mi><mrow><msup><mrow/><mi>c</mi>' +
      '</msup></mrow></msub></msub>';
  this.executeRuleTest(mml, 'y Index a Index Index hoch c', 'default');
  this.executeRuleTest(mml, 'y Index a Index Index hoch c', 'brief');
  this.executeRuleTest(mml, 'y Index a Index Index hoch c', 'sbrief');
};


/**
 * Testing Rule 8.4, Example 5, Sup/Sub inversed, short.
 */
sre.MathspeakGermanTest.prototype.testSample_8_4_5InvShort = function() {
  var mml = '<msub><mi>y</mi><msub><mi>a</mi><mrow><msup><mrow/><mi>c</mi>' +
      '</msup><mi>b</mi></mrow></msub></msub>';
  this.executeRuleTest(mml, 'y Index a Index Index hoch c Index Index b', 'default');
  this.executeRuleTest(mml, 'y Index a Index Index hoch c Index Index b', 'brief');
  this.executeRuleTest(mml, 'y Index a Index Index hoch c Index Index b', 'sbrief');
};


/**
 * Testing Rule 8.4, Example 6.
 */
sre.MathspeakGermanTest.prototype.testSample_8_4_6 = function() {
  var mml = '<msup><mi>x</mi><msup><mi>a</mi><mi>b</mi></msup></msup>';
  this.executeRuleTest(mml, 'x hoch a hoch hoch b', 'default');
  this.executeRuleTest(mml, 'x hoch a hoch hoch b', 'brief');
  this.executeRuleTest(mml, 'x hoch a hoch hoch b', 'sbrief');
};


/**
 * Testing Rule 8.4, Example 7.
 */
sre.MathspeakGermanTest.prototype.testSample_8_4_7 = function() {
  var mml = '<msub><mi>x</mi><msub><mi>a</mi><mi>b</mi></msub></msub>';
  this.executeRuleTest(mml, 'x Index a Index Index b', 'default');
  this.executeRuleTest(mml, 'x Index a Index Index b', 'brief');
  this.executeRuleTest(mml, 'x Index a Index Index b', 'sbrief');
};


/**
 * Testing Rule 8.4, Example 8.
 */
sre.MathspeakGermanTest.prototype.testSample_8_4_8 = function() {
  var mml = '<msup><mi>T</mi><mfenced separators="" open="(" close=")">' +
      '<msup><mi>x</mi><mi>a</mi></msup><mo>+</mo><msup><mi>y</mi>' +
      '<mi>b</mi></msup></mfenced></msup>';
  this.executeRuleTest(mml, 'großes T hoch Klammer auf x hoch hoch a hoch plus y hoch hoch b hoch Klammer zu', 'default');
  this.executeRuleTest(mml, 'großes T hoch Klammer auf x hoch hoch a hoch plus y hoch hoch b hoch Klammer zu', 'brief');
  this.executeRuleTest(mml, 'großes T hoch Klammer auf x hoch hoch a hoch plus y hoch hoch b hoch Klammer zu', 'sbrief');
};


/**
 * Testing Rule 8.5, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_8_5_1 = function() {
  var mml = '<msub><mi>x</mi><mn>1</mn></msub>';
  this.executeRuleTest(mml, 'x 1', 'default');
  this.executeRuleTest(mml, 'x 1', 'brief');
  this.executeRuleTest(mml, 'x 1', 'sbrief');
};


/**
 * Testing Rule 8.5, Example 2.
 */
sre.MathspeakGermanTest.prototype.testSample_8_5_2 = function() {
  var mml = '<msub><mi>x</mi><mrow><mo>-</mo><mn>1</mn></mrow></msub>';
  this.executeRuleTest(mml, 'x Index minus 1', 'default');
  this.executeRuleTest(mml, 'x Index minus 1', 'brief');
  this.executeRuleTest(mml, 'x Index minus 1', 'sbrief');
};


/**
 * Testing Rule 8.5, Example 3.
 */
sre.MathspeakGermanTest.prototype.testSample_8_5_3 = function() {
  var mml = '<msub><mi>x</mi><mrow><mn>10000</mn></mrow>' +
      '</msub>';
  this.executeRuleTest(mml, 'x 10000', 'default');
  this.executeRuleTest(mml, 'x 10000', 'brief');
  this.executeRuleTest(mml, 'x 10000', 'sbrief');
};


// TODO: 1,3 comes out as ,1,3,,,,,
// There must be something wrong with the regexp.
/**
 * Testing Rule 8.5, Example 4.
 */
sre.MathspeakGermanTest.prototype.testSample_8_5_4 = function() {
  var mml = '<msub><mi>x</mi><mrow><mn>1,3</mn></mrow>' +
      '</msub>';
  this.executeRuleTest(mml, 'x 1,3', 'default');
  this.executeRuleTest(mml, 'x 1,3', 'brief');
  this.executeRuleTest(mml, 'x 1,3', 'sbrief');
};


/**
 * Testing Rule 8.5, Example 5. (WORKS!)
 */
sre.MathspeakGermanTest.prototype.testSample_8_5_5 = function() {
  var mml = '<mrow><mn>4</mn><mi>Fe</mi><mo>+</mo><mn>3</mn><msub>' +
      '<mi>O</mi><mn>2</mn></msub><mo>→</mo><mn>2</mn><msub><mi>Fe</mi>' +
      '<mn>2</mn></msub><msub><mi>O</mi><mn>3</mn></msub></mrow>';
  this.executeRuleTest(mml, '4 normales großes F e plus 3 großes O 2 Pfeil nach rechts 2 normales großes F e 2 großes O 3', 'default');
  this.executeRuleTest(mml, '4 normales großes F e plus 3 großes O 2 Pfeil nach rechts 2 normales großes F e 2 großes O 3', 'brief');
  this.executeRuleTest(mml, '4 normales großes F e plus 3 großes O 2 Pfeil nach rechts 2 normales großes F e 2 großes O 3', 'sbrief');
};


/**
 * Testing Rule 8.5, Example 6.
 */
sre.MathspeakGermanTest.prototype.testSample_8_5_6 = function() {
  var mml = '<msub><mi>a</mi><mrow><mn>2</mn><mo>,</mo><mn>3</mn></mrow>' +
      '</msub>';
  this.executeRuleTest(mml, 'a Index 2 Komma 3', 'default');
  this.executeRuleTest(mml, 'a Index 2 Komma 3', 'brief');
  this.executeRuleTest(mml, 'a Index 2 Komma 3', 'sbrief');
};


/**
 * Testing Rule 8.5, Example 7.
 */
sre.MathspeakGermanTest.prototype.testSample_8_5_7 = function() {
  var mml = '<msub><mi>T</mi><mrow><msub><mi>n</mi><mn>1</mn></msub>' +
      '<mo>+</mo><msub><mi>n</mi><mn>0</mn></msub></mrow></msub>';
  this.executeRuleTest(mml, 'großes T Index n 1 plus n 0', 'default');
  this.executeRuleTest(mml, 'großes T Index n 1 plus n 0', 'brief');
  this.executeRuleTest(mml, 'großes T Index n 1 plus n 0', 'sbrief');
};


/**
 * Testing Rule 8.5, Example 8.
 */
sre.MathspeakGermanTest.prototype.testSample_8_5_8 = function() {
  var mml = '<mrow><msub><mo form="prefix">log</mo><mn>2</mn></msub>' +
      '<mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow><mo>=</mo><mfrac><mrow>' +
      '<msub><mo form="prefix">log</mo><mn>10</mn></msub><mrow><mo>(</mo>' +
      '<mi>x</mi><mo>)</mo></mrow></mrow><mrow><msub>' +
      '<mo form="prefix">log</mo><mn>10</mn></msub><mrow><mo>(</mo>' +
      '<mn>2</mn><mo>)</mo></mrow></mrow></mfrac></mrow>';
  this.executeRuleTest(mml, 'Logarithmus Index 2 Grundlinie Klammer auf x Klammer zu ist gleich Anfang Bruch Logarithmus Index 10 Grundlinie Klammer auf x Klammer zu durch Logarithmus Index 10 Grundlinie Klammer auf 2 Klammer zu Ende Bruch', 'default');
  this.executeRuleTest(mml, 'Logarithmus Index 2 Grund Klammer auf x Klammer zu ist gleich Anfang Bruch Logarithmus Index 10 Grund Klammer auf x Klammer zu durch Logarithmus Index 10 Grund Klammer auf 2 Klammer zu Ende Bruch', 'brief');
  this.executeRuleTest(mml, 'Logarithmus Index 2 Grund Klammer auf x Klammer zu ist gleich Bruch Logarithmus Index 10 Grund Klammer auf x Klammer zu durch Logarithmus Index 10 Grund Klammer auf 2 Klammer zu Ende Bruch', 'sbrief');
};


/**
 * Testing Rule 8.5, Example 9.
 */
sre.MathspeakGermanTest.prototype.testSample_8_5_9 = function() {
  var mml = '<msub><mi>Φ</mi><mn>5</mn></msub>';
  this.executeRuleTest(mml, 'großes Phi 5', 'default');
  this.executeRuleTest(mml, 'großes Phi 5', 'brief');
  this.executeRuleTest(mml, 'großes Phi 5', 'sbrief');
};


/**
 * Testing Rule 8.5, Example 10.  (INTEGRAL! Maybe more tests!)
 */
sre.MathspeakGermanTest.prototype.testSample_8_5_10 = function() {
  var mml = '<mrow><mo form="prefix">ln</mo><mi>x</mi><mo>=</mo><msubsup>' +
      '<mo>∫</mo><mn>1</mn><mi>x</mi></msubsup><mfrac><mrow><mi>d</mi>' +
      '<mi>t</mi></mrow><mi>t</mi></mfrac></mrow>';
  this.executeRuleTest(mml, 'natürlicher Logarithmus x ist gleich Integral Index 1 Hoch x Grundlinie Anfang Bruch d t durch t Ende Bruch', 'default');
  this.executeRuleTest(mml, 'natürlicher Logarithmus x ist gleich Integral Index 1 Hoch x Base Anfang Bruch d t durch t Ende Bruch', 'brief');
  this.executeRuleTest(mml, 'natürlicher Logarithmus x ist gleich Integral Index 1 Hoch x Base Bruch d t durch t Ende Bruch', 'sbrief');
};


/**
 * Testing Rule 8.6, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_8_6_1 = function() {
  var mml = '<mrow><mi>$</mi><mi>n</mi><mn>2</mn><mo>=</mo><mn>2</mn>' +
      '<mo>*</mo><mi>$</mi><mi>n</mi><mo>+</mo><mn>1</mn><mo>;</mo></mrow>';
  this.executeRuleTest(mml, 'Dollar n Grundlinie 2 ist gleich 2 times Dollar n plus 1 Strichpunkt', 'default');
  this.executeRuleTest(mml, 'Dollar n Grund 2 ist gleich 2 times Dollar n plus 1 Strichpunkt', 'brief');
  this.executeRuleTest(mml, 'Dollar n Grund 2 ist gleich 2 times Dollar n plus 1 Strichpunkt', 'sbrief');
};


/**
 * Testing Rule 8.8, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_8_8_1_naive = function() {
  var mml = '<mmultiscripts><mi>x</mi><mrow><mi>e</mi><mi>f</mi></mrow>' +
      '<mrow><mi>g</mi><mi>h</mi></mrow><mprescripts/><mrow><mi>c</mi>' +
      '<mi>d</mi></mrow><mrow><mi>a</mi><mi>b</mi></mrow></mmultiscripts>';
  this.executeRuleTest(mml, 'Index c d hoch a b Grundlinie x Index e f hoch g h', 'default');
  this.executeRuleTest(mml, 'Index c d hoch a b Grund x Index e f hoch g h', 'brief');
  this.executeRuleTest(mml, 'Index c d hoch a b Grund x Index e f hoch g h', 'sbrief');
};


/**
 * Testing Rule 8.8, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_8_8_1 = function() {
  var mml = '<mmultiscripts><mi>x</mi><mi>e</mi>' +
      '<mi>g</mi><mi>f</mi><mi>h</mi><mprescripts/><mi>c</mi>' +
      '<mi>a</mi><mi>d</mi><mi>b</mi></mmultiscripts>';
  this.executeRuleTest(mml, 'Index c d hoch a b Grundlinie x Index e f hoch g h', 'default');
  this.executeRuleTest(mml, 'Index c d hoch a b Grund x Index e f hoch g h', 'brief');
  this.executeRuleTest(mml, 'Index c d hoch a b Grund x Index e f hoch g h', 'sbrief');
};


/**
 * Testing tensors Multi scripts.
 */
sre.MathspeakGermanTest.prototype.testSampleTensorMultiSimpleABC = function() {
  var mml = '<mmultiscripts><mi>x</mi><msup><mi>c</mi><mi>l</mi></msup>' +
      '<mprescripts/><mi>a</mi><mi>b</mi></mmultiscripts>';
  this.executeRuleTest(mml, 'Index a hoch b Grundlinie x Index c Index hoch l', 'default');
  this.executeRuleTest(mml, 'Index a hoch b Grund x Index c Index hoch l', 'brief');
  this.executeRuleTest(mml, 'Index a hoch b Grund x Index c Index hoch l', 'sbrief');
};


/**
 * Testing tensors Multi scripts.
 */
sre.MathspeakGermanTest.prototype.testSampleTensorMultiSub = function() {
  var mml = '<mmultiscripts><mi>x</mi><msub><mi>c</mi><mi>l</mi></msub>' +
      '<mi>d</mi><mprescripts/><mi>a</mi><mi>b</mi></mmultiscripts>';
  this.executeRuleTest(mml, 'Index a hoch b Grundlinie x Index c Index Index l hoch d', 'default');
  this.executeRuleTest(mml, 'Index a hoch b Grund x Index c Index Index l hoch d', 'brief');
  this.executeRuleTest(mml, 'Index a hoch b Grund x Index c Index Index l hoch d', 'sbrief');
};


/**
 * Testing tensors Multi scripts.
 */
sre.MathspeakGermanTest.prototype.testSampleTensorMultiSubSup = function() {
  var mml = '<mmultiscripts><mi>x</mi><msub><mi>c</mi><msup><mi>l</mi>' +
      '<mi>k</mi></msup></msub><mi>d</mi><mi>e</mi><none/>' +
      '<mprescripts/><mi>a</mi><mi>b</mi></mmultiscripts>';
  this.executeRuleTest(mml, 'Index a hoch b Grundlinie x Index c Index Index l Index Index hoch k Index e hoch d', 'default');
  this.executeRuleTest(mml, 'Index a hoch b Grund x Index c Index Index l Index Index hoch k Index e hoch d', 'brief');
  this.executeRuleTest(mml, 'Index a hoch b Grund x Index c Index Index l Index Index hoch k Index e hoch d', 'sbrief');
};


/**
 * Testing tensors Multi scripts.
 */
sre.MathspeakGermanTest.prototype.testSampleTensorMultiSimple = function() {
  var mml = '<mmultiscripts><mi>x</mi><msup><mi>c</mi><mi>l</mi></msup>' +
      '<mi>d</mi><mprescripts/><mi>a</mi><mi>b</mi></mmultiscripts>';
  this.executeRuleTest(mml, 'Index a hoch b Grundlinie x Index c Index hoch l hoch d', 'default');
  this.executeRuleTest(mml, 'Index a hoch b Grund x Index c Index hoch l hoch d', 'brief');
  this.executeRuleTest(mml, 'Index a hoch b Grund x Index c Index hoch l hoch d', 'sbrief');
};


/**
 * Testing tensors Multi scripts.
 */
sre.MathspeakGermanTest.prototype.testSampleTensorMultiComplex = function() {
  var mml = '<mmultiscripts><mi>x</mi><mrow><mi>c</mi><msup><mi>k</mi>' +
      '<mi>l</mi></msup></mrow><mi>d</mi>' +
      '<mprescripts/><mi>a</mi><mi>b</mi></mmultiscripts>';
  this.executeRuleTest(mml, 'Index a hoch b Grundlinie x Index c k Index hoch l hoch d', 'default');
  this.executeRuleTest(mml, 'Index a hoch b Grund x Index c k Index hoch l hoch d', 'brief');
  this.executeRuleTest(mml, 'Index a hoch b Grund x Index c k Index hoch l hoch d', 'sbrief');
};


/**
 * Testing tensors ABCD.
 */
sre.MathspeakGermanTest.prototype.testSampleTwoTensors = function() {
  var mml = '<mmultiscripts><mi>x</mi><mi>c</mi><mi>d</mi>' +
      '<mprescripts/><mi>a</mi><mi>b</mi></mmultiscripts>' +
      '<mmultiscripts><mi>x</mi><mi>c</mi><mi>d</mi>' +
      '<mprescripts/><mi>a</mi><mi>b</mi></mmultiscripts>';
  this.executeRuleTest(mml, 'Index a hoch b Grundlinie x Index c hoch d Grundlinie Index a hoch b Grundlinie x Index c hoch d', 'default');
  this.executeRuleTest(mml, 'Index a hoch b Grund x Index c hoch d Grund Index a hoch b Grund x Index c hoch d', 'brief');
  this.executeRuleTest(mml, 'Index a hoch b Grund x Index c hoch d Grund Index a hoch b Grund x Index c hoch d', 'sbrief');
};


// Tensor tests are named with the convention of including the indices that are
// present:
//
//   B      D
//     Base     R
//   A      C
//  Where R is the rest.
/**
 * Testing tensors ABCD.
 */
sre.MathspeakGermanTest.prototype.testSamplePartialTensorABCD = function() {
  var mml = '<mmultiscripts><mi>x</mi><mi>c</mi><mi>d</mi>' +
      '<mprescripts/><mi>a</mi><mi>b</mi></mmultiscripts>';
  this.executeRuleTest(mml, 'Index a hoch b Grundlinie x Index c hoch d', 'default');
  this.executeRuleTest(mml, 'Index a hoch b Grund x Index c hoch d', 'brief');
  this.executeRuleTest(mml, 'Index a hoch b Grund x Index c hoch d', 'sbrief');
};


/**
 * Testing tensors ABC.
 */
sre.MathspeakGermanTest.prototype.testSamplePartialTensorABC = function() {
  var mml = '<mmultiscripts><mi>x</mi><mi>c</mi>' +
      '<mprescripts/><mi>a</mi><mi>b</mi></mmultiscripts>';
  this.executeRuleTest(mml, 'Index a hoch b Grundlinie x Index c', 'default');
  this.executeRuleTest(mml, 'Index a hoch b Grund x Index c', 'brief');
  this.executeRuleTest(mml, 'Index a hoch b Grund x Index c', 'sbrief');
};


/**
 * Testing tensors ABD.
 */
sre.MathspeakGermanTest.prototype.testSamplePartialTensorABD = function() {
  var mml = '<mmultiscripts><mi>x</mi><none/><mi>d</mi>' +
      '<mprescripts/><mi>a</mi><mi>b</mi></mmultiscripts>';
  this.executeRuleTest(mml, 'Index a hoch b Grundlinie x hoch d', 'default');
  this.executeRuleTest(mml, 'Index a hoch b Grund x hoch d', 'brief');
  this.executeRuleTest(mml, 'Index a hoch b Grund x hoch d', 'sbrief');
};


/**
 * Testing tensors AB.
 */
sre.MathspeakGermanTest.prototype.testSamplePartialTensorAB = function() {
  var mml = '<mmultiscripts><mi>x</mi>' +
      '<mprescripts/><mi>a</mi><mi>b</mi></mmultiscripts>';
  this.executeRuleTest(mml, 'Index a hoch b Grundlinie x', 'default');
  this.executeRuleTest(mml, 'Index a hoch b Grund x', 'brief');
  this.executeRuleTest(mml, 'Index a hoch b Grund x', 'sbrief');
};


/**
 * Testing tensors ABCR.
 */
sre.MathspeakGermanTest.prototype.testSamplePartialTensorABCR = function() {
  var mml = '<mmultiscripts><mi>x</mi><mi>c</mi>' +
      '<mprescripts/><mi>a</mi><mi>b</mi></mmultiscripts><mi>r</mi>';
  this.executeRuleTest(mml, 'Index a hoch b Grundlinie x Index c Grundlinie r', 'default');
  this.executeRuleTest(mml, 'Index a hoch b Grund x Index c Grund r', 'brief');
  this.executeRuleTest(mml, 'Index a hoch b Grund x Index c Grund r', 'sbrief');
};


/**
 * Testing tensors ABCDR.
 */
sre.MathspeakGermanTest.prototype.testSamplePartialTensorABCDR = function() {
  var mml = '<mmultiscripts><mi>x</mi><mi>c</mi><mi>d</mi>' +
      '<mprescripts/><mi>a</mi><mi>b</mi></mmultiscripts><mi>r</mi>';
  this.executeRuleTest(mml, 'Index a hoch b Grundlinie x Index c hoch d Grundlinie r', 'default');
  this.executeRuleTest(mml, 'Index a hoch b Grund x Index c hoch d Grund r', 'brief');
  this.executeRuleTest(mml, 'Index a hoch b Grund x Index c hoch d Grund r', 'sbrief');
};


/**
 * Testing tensors Root of ABCD.
 */
sre.MathspeakGermanTest.prototype.testSamplePartialTensorABCDRoot =
    function() {
  var mml = '<msqrt><mmultiscripts><mi>x</mi><mi>c</mi><mi>d</mi>' +
      '<mprescripts/><mi>a</mi><mi>b</mi></mmultiscripts></msqrt>';
  this.executeRuleTest(mml, 'Anfang Quadratwurzel Index a hoch b Grundlinie x Index c hoch d Grundlinie Ende Quadratwurzel', 'default');
  this.executeRuleTest(mml, 'Anfang Quadratwurzel Index a hoch b Grund x Index c hoch d Grund Ende Quadratwurzel', 'brief');
  this.executeRuleTest(mml, 'Quadratwurzel Index a hoch b Grund x Index c hoch d Grund Ende Quadratwurzel', 'sbrief');
};


/**
 * Testing tensors Root ABCD . R.
 */
sre.MathspeakGermanTest.prototype.testSamplePartialTensorABCDRootR =
    function() {
  var mml = '<msqrt><mmultiscripts><mi>x</mi><mi>c</mi><mi>d</mi>' +
      '<mprescripts/><mi>a</mi><mi>b</mi></mmultiscripts></msqrt><mi>r</mi>';
  this.executeRuleTest(mml, 'Anfang Quadratwurzel Index a hoch b Grundlinie x Index c hoch d Grundlinie Ende Quadratwurzel r', 'default');
  this.executeRuleTest(mml, 'Anfang Quadratwurzel Index a hoch b Grund x Index c hoch d Grund Ende Quadratwurzel r', 'brief');
  this.executeRuleTest(mml, 'Quadratwurzel Index a hoch b Grund x Index c hoch d Grund Ende Quadratwurzel r', 'sbrief');
};


/**
 * Testing tensors Frac of ABCD.
 */
sre.MathspeakGermanTest.prototype.testSamplePartialTensorABCDFrac =
    function() {
  var mml = '<mfrac><mn>1</mn><mmultiscripts><mi>x</mi><mi>c</mi><mi>d</mi>' +
      '<mprescripts/><mi>a</mi><mi>b</mi></mmultiscripts></mfrac>';
  this.executeRuleTest(mml, 'Anfang Bruch 1 durch Index a hoch b Grundlinie x Index c hoch d Grundlinie Ende Bruch', 'default');
  this.executeRuleTest(mml, 'Anfang Bruch 1 durch Index a hoch b Grund x Index c hoch d Grund Ende Bruch', 'brief');
  this.executeRuleTest(mml, 'Bruch 1 durch Index a hoch b Grund x Index c hoch d Grund Ende Bruch', 'sbrief');
};


/**
 * Testing tensors Frac ABCD . R.
 */
sre.MathspeakGermanTest.prototype.testSamplePartialTensorABCDFracR =
    function() {
  var mml = '<mfrac><mn>1</mn><mmultiscripts><mi>x</mi><mi>c</mi><mi>d</mi>' +
      '<mprescripts/><mi>a</mi><mi>b</mi></mmultiscripts></mfrac><mi>r</mi>';
  this.executeRuleTest(mml, 'Anfang Bruch 1 durch Index a hoch b Grundlinie x Index c hoch d Grundlinie Ende Bruch r', 'default');
  this.executeRuleTest(mml, 'Anfang Bruch 1 durch Index a hoch b Grund x Index c hoch d Grund Ende Bruch r', 'brief');
  this.executeRuleTest(mml, 'Bruch 1 durch Index a hoch b Grund x Index c hoch d Grund Ende Bruch r', 'sbrief');
};


/**
 * Testing Rule additional examples for simple subscripts with square.
 */
sre.MathspeakGermanTest.prototype.testSampleSimpleSquare = function() {
  var mml = '<msubsup><mi>T</mi><mn>0</mn><mn>2</mn></msubsup>';
  this.executeRuleTest(mml, 'großes T 0 Quadrat', 'default');
  mml = '<msup><msub><mi>T</mi><mn>0</mn></msub><mn>2</mn></msup>';
  this.executeRuleTest(mml, 'großes T 0 Quadrat', 'default');
  this.executeRuleTest(mml, 'großes T 0 Quadrat', 'brief');
  this.executeRuleTest(mml, 'großes T 0 Quadrat', 'sbrief');
};


/**
 * Testing Rule additional examples for simple subscripts with cube.
 */
sre.MathspeakGermanTest.prototype.testSampleSimpleCube = function() {
  var mml = '<msubsup><mi>T</mi><mn>0</mn><mn>3</mn></msubsup>';
  this.executeRuleTest(mml, 'großes T 0 Kubik', 'default');
  mml = '<msup><msub><mi>T</mi><mn>0</mn></msub><mn>3</mn></msup>';
  this.executeRuleTest(mml, 'großes T 0 Kubik', 'default');
  this.executeRuleTest(mml, 'großes T 0 Kubik', 'brief');
  this.executeRuleTest(mml, 'großes T 0 Kubik', 'sbrief');
};


/**
 * Testing Rule 8.8, Example 2.
 */
sre.MathspeakGermanTest.prototype.testSample_8_8_2 = function() {
  var mml = '<msubsup><mi>T</mi><mrow><mi>n</mi><mo>-</mo><mn>1</mn></mrow>' +
      '<mn>2</mn></msubsup>';
  this.executeRuleTest(mml, 'großes T Index n minus 1 hoch 2', 'default');
  this.executeRuleTest(mml, 'großes T Index n minus 1 hoch 2', 'brief');
  this.executeRuleTest(mml, 'großes T Index n minus 1 hoch 2', 'sbrief');
};


/**
 * Testing Rule 8.9, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_8_9_1 = function() {
  var mml = '<msup><mi>x</mi><mo>\'</mo></msup>';
  this.executeRuleTest(mml, 'x Hochkomma', 'default');
  this.executeRuleTest(mml, 'x Hochkomma', 'brief');
  this.executeRuleTest(mml, 'x Hochkomma', 'sbrief');
};


/**
 * Testing Rule 8.9, Example 2.
 */
sre.MathspeakGermanTest.prototype.testSample_8_9_2 = function() {
  var mml = '<mrow><msup><mi>f</mi><mrow><mo>\'</mo><mo>\'</mo><mo>\'</mo>' +
      '</mrow></msup><mrow><mo>(</mo><mi>y</mi><mo>)</mo></mrow><mo>=</mo>' +
      '<mfrac><mrow><mi>d</mi><msup><mi>f</mi><mrow><mo>\'</mo><mo>\'</mo>' +
      '</mrow></msup><mrow><mo>(</mo><mi>y</mi><mo>)</mo></mrow></mrow>' +
      '<mrow><mi>d</mi><mi>y</mi></mrow></mfrac></mrow>';
  this.executeRuleTest(mml, 'f drei Strich Klammer auf y Klammer zu ist gleich Anfang Bruch d f zwei Strich Klammer auf y Klammer zu durch d y Ende Bruch', 'default');
  this.executeRuleTest(mml, 'f drei Strich Klammer auf y Klammer zu ist gleich Anfang Bruch d f zwei Strich Klammer auf y Klammer zu durch d y Ende Bruch', 'brief');
  this.executeRuleTest(mml, 'f drei Strich Klammer auf y Klammer zu ist gleich Bruch d f zwei Strich Klammer auf y Klammer zu durch d y Ende Bruch', 'sbrief');
};


/**
 * Testing Rule 8.10, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_8_10_1 = function() {
  var mml = '<mrow><msup><mi>ρ</mi><mo>\'</mo></msup><mo>=</mo><msubsup>' +
      '<mi>ρ</mi><mo>+</mo><mo>\'</mo></msubsup><mo>+</mo><msubsup>' +
      '<mi>ρ</mi><mo>-</mo><mo>\'</mo></msubsup></mrow>';
  this.executeRuleTest(mml, 'rho Hochkomma ist gleich rho Hochkomma Index plus Grundlinie plus rho Hochkomma Index minus', 'default');
  this.executeRuleTest(mml, 'rho Hochkomma ist gleich rho Hochkomma Index plus Grund plus rho Hochkomma Index minus', 'brief');
  this.executeRuleTest(mml, 'rho Hochkomma ist gleich rho Hochkomma Index plus Grund plus rho Hochkomma Index minus', 'sbrief');
};


/**
 * Testing Rule 8.10, Example 2.
 */
sre.MathspeakGermanTest.prototype.testSample_8_10_2 = function() {
  var mml = '<msubsup><mi>x</mi><mn>10</mn><mo>\'</mo></msubsup>';
  this.executeRuleTest(mml, 'x Hochkomma 10', 'default');
  this.executeRuleTest(mml, 'x Hochkomma 10', 'brief');
  this.executeRuleTest(mml, 'x Hochkomma 10', 'sbrief');
};


/**
 * Testing Rule 8.10, Example 3.
 */
sre.MathspeakGermanTest.prototype.testSample_8_10_3 = function() {
  var mml = '<msubsup><mi>T</mi><mi>n</mi><mo>\'</mo></msubsup>';
  this.executeRuleTest(mml, 'großes T Hochkomma Index n', 'default');
  this.executeRuleTest(mml, 'großes T Hochkomma Index n', 'brief');
  this.executeRuleTest(mml, 'großes T Hochkomma Index n', 'sbrief');
};


/**
 * Testing Rule 8.11, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_8_11_1 = function() {
  var mml = '<mfenced open="[" close="]"><mtable><mtr><mtd><msup><mi>x</mi>' +
      '<mi>n</mi></msup></mtd><mtd><msup><mi>y</mi><mi>n</mi></msup></mtd>' +
      '<mtd><msup><mi>z</mi><mi>n</mi></msup></mtd></mtr><mtr><mtd><msup>' +
      '<mi>x</mi><mrow><mi>n</mi><mo>+</mo><mn>1</mn></mrow></msup></mtd>' +
      '<mtd><msup><mi>y</mi><mrow><mi>n</mi><mo>+</mo><mn>1</mn></mrow>' +
      '</msup></mtd><mtd><msup><mi>z</mi><mrow><mi>n</mi><mo>+</mo>' +
      '<mn>1</mn></mrow></msup></mtd></mtr></mtable></mfenced>';
  this.executeRuleTest(mml, 'Anfang 2 mal 3 Matrize 1. Zeile 1. Spalte x hoch n 2. Spalte y hoch n 3. Spalte z hoch n 2. Zeile 1. Spalte x hoch n plus 1 2. Spalte y hoch n plus 1 3. Spalte z hoch n plus 1 Ende Matrize', 'default');
  this.executeRuleTest(mml, 'Anfang 2 mal 3 Matrize 1. Zeile 1. Spalte x hoch n 2. Spalte y hoch n 3. Spalte z hoch n 2. Zeile 1. Spalte x hoch n plus 1 2. Spalte y hoch n plus 1 3. Spalte z hoch n plus 1 Ende Matrize', 'brief');
  this.executeRuleTest(mml, '2 mal 3 Matrize 1. Zeile 1. Spalte x hoch n 2. Spalte y hoch n 3. Spalte z hoch n 2. Zeile 1. Spalte x hoch n plus 1 2. Spalte y hoch n plus 1 3. Spalte z hoch n plus 1 Ende Matrize', 'sbrief');
};


/**
 * Testing Rule 8.12, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_8_12_1 = function() {
  var mml = '<msup><mrow><msub><mi>x</mi><mi>a</mi></msub></mrow><mi>b</mi>' +
      '</msup>';
  this.executeRuleTest(mml, 'x Index a Grundlinie hoch b', 'default');
  this.executeRuleTest(mml, 'x Index a Grund hoch b', 'brief');
  this.executeRuleTest(mml, 'x Index a Grund hoch b', 'sbrief');
};


/**
 * Testing Rule 8.12, Example 2.
 */
sre.MathspeakGermanTest.prototype.testSample_8_12_2 = function() {
  var mml = '<msub><mrow><msup><mi>x</mi><mi>b</mi></msup></mrow><mi>a</mi>' +
      '</msub>';
  this.executeRuleTest(mml, 'x hoch b Grundlinie Index a', 'default');
  this.executeRuleTest(mml, 'x hoch b Grund Index a', 'brief');
  this.executeRuleTest(mml, 'x hoch b Grund Index a', 'sbrief');
};


/**
 * Testing Rule 8.13, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_8_13_1 = function() {
  var mml = '<mrow><msup><mo form="prefix">log</mo><mn>4</mn></msup><mmultiscripts>' +
      '<mi>x</mi><mprescripts/><none/><mi>b</mi></mmultiscripts></mrow>';
  this.executeRuleTest(mml, 'Logarithmus hoch 4 Grundlinie hoch b Grundlinie x', 'default');
  this.executeRuleTest(mml, 'Logarithmus hoch 4 Grund hoch b Grund x', 'brief');
  this.executeRuleTest(mml, 'Logarithmus hoch 4 Grund hoch b Grund x', 'sbrief');
};


/**
 * Testing Rule 8.13, Example 2.
 */
sre.MathspeakGermanTest.prototype.testSample_8_13_2 = function() {
  var mml = '<mrow><msub><mi>T</mi><mi>n</mi></msub><mmultiscripts><mi>y</mi>' +
      '<mprescripts/><mi>a</mi></mmultiscripts></mrow>';
  this.executeRuleTest(mml, 'großes T Index n Grundlinie Index a Grundlinie y', 'default');
  this.executeRuleTest(mml, 'großes T Index n Grund Index a Grund y', 'brief');
  this.executeRuleTest(mml, 'großes T Index n Grund Index a Grund y', 'sbrief');
};


/**
 * Testing Rule 9.1, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_9_1_1 = function() {
  var mml = '<msqrt><mn>2</mn></msqrt>';
  this.executeRuleTest(mml, 'Anfang Quadratwurzel 2 Ende Quadratwurzel', 'default');
  this.executeRuleTest(mml, 'Anfang Quadratwurzel 2 Ende Quadratwurzel', 'brief');
  this.executeRuleTest(mml, 'Quadratwurzel 2 Ende Quadratwurzel', 'sbrief');
};


// TODO: Get rid of indices for roots <= 10.
// TODO: Check out blackboard R.
/**
 * Testing Rule 9.1, Example 2.
 */
sre.MathspeakGermanTest.prototype.testSample_9_1_2 = function() {
  var mml = '<msqrt><mrow><mi>m</mi><mo>+</mo><mi>n</mi></mrow></msqrt>';
  this.executeRuleTest(mml, 'Anfang Quadratwurzel m plus n Ende Quadratwurzel', 'default');
  this.executeRuleTest(mml, 'Anfang Quadratwurzel m plus n Ende Quadratwurzel', 'brief');
  this.executeRuleTest(mml, 'Quadratwurzel m plus n Ende Quadratwurzel', 'sbrief');
};


/**
 * Testing Rule 9.2, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_9_2_1 = function() {
  var mml = '<mroot><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mrow>' +
      '<mi>m</mi><mo>+</mo><mi>n</mi></mrow></mroot>';
  this.executeRuleTest(mml, 'Wurzelexponent m plus n Anfang Wurzel x plus y Ende Wurzel', 'default');
  this.executeRuleTest(mml, 'Wurzelexponent m plus n Anfang Wurzel x plus y Ende Wurzel', 'brief');
  this.executeRuleTest(mml, 'Exponent m plus n Wurzel x plus y Ende Wurzel', 'sbrief');
};


/**
 * Testing Rule 9.2, Example 2.
 */
sre.MathspeakGermanTest.prototype.testSample_9_2_2 = function() {
  var mml = '<mrow><mroot><msup><mi>x</mi><mi>m</mi></msup><mi>n</mi>' +
      '</mroot><mo>=</mo><msup><mfenced separators="" open="(" close=")">' +
      '<mroot><mi>x</mi><mi>n</mi></mroot></mfenced><mi>m</mi></msup>' +
      '<mo>=</mo><msup><mi>x</mi><mfrac><mi>m</mi><mi>n</mi></mfrac>' +
      '</msup><mo>,</mo><mi>x</mi><mo>></mo><mn>0</mn></mrow>';
  this.executeRuleTest(mml, 'Wurzelexponent n Anfang Wurzel x hoch m Grundlinie Ende Wurzel ist gleich Klammer auf Wurzelexponent n Anfang Wurzel x Ende Wurzel Klammer zu hoch m Grundlinie ist gleich x hoch Anfang Bruch m durch n Ende Bruch Grundlinie Komma x größer als 0', 'default');
  this.executeRuleTest(mml, 'Wurzelexponent n Anfang Wurzel x hoch m Grund Ende Wurzel ist gleich Klammer auf Wurzelexponent n Anfang Wurzel x Ende Wurzel Klammer zu hoch m Grund ist gleich x hoch Anfang Bruch m durch n Ende Bruch Grund Komma x größer als 0', 'brief');
  this.executeRuleTest(mml, 'Exponent n Wurzel x hoch m Grund Ende Wurzel ist gleich Klammer auf Exponent n Wurzel x Ende Wurzel Klammer zu hoch m Grund ist gleich x hoch Bruch m durch n Ende Bruch Grund Komma x größer als 0', 'sbrief');
};


/**
 * Testing Rule 9.2, Example 3.
 */
sre.MathspeakGermanTest.prototype.testSample_9_2_3 = function() {
  var mml = '<mrow><mroot><mi>x</mi><mn>3</mn></mroot><mo>=</mo><msup>' +
      '<mi>x</mi><mfrac><mn>1</mn><mn>3</mn></mfrac></msup></mrow>';
  this.executeRuleTest(mml, 'Anfang Kubikwurzel x Ende Kubikwurzel ist gleich x hoch ein drittel', 'default');
  this.executeRuleTest(mml, 'Anfang Kubikwurzel x Ende Kubikwurzel ist gleich x hoch ein drittel', 'brief');
  this.executeRuleTest(mml, 'Kubikwurzel x Ende Kubikwurzel ist gleich x hoch ein drittel', 'sbrief');
};


/**
 * Testing Rule 9.3, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_9_3_1 = function() {
  var mml = '<msqrt><mrow><msqrt><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow>' +
      '</msqrt><mo>+</mo><msqrt><mrow><mi>y</mi><mo>+</mo><mn>1</mn>' +
      '</mrow></msqrt></mrow></msqrt>';
  this.executeRuleTest(mml, 'Anfang geschachtelte Quadratwurzel Anfang Quadratwurzel x plus 1 Ende Quadratwurzel plus Anfang Quadratwurzel y plus 1 Ende Quadratwurzel Ende geschachtelte Quadratwurzel', 'default');
  this.executeRuleTest(mml, 'Anfang geschachtelte Quadratwurzel Anfang Quadratwurzel x plus 1 Ende Quadratwurzel plus Anfang Quadratwurzel y plus 1 Ende Quadratwurzel Ende geschachtelte Quadratwurzel', 'brief');
  this.executeRuleTest(mml, 'geschachtelte Quadratwurzel Quadratwurzel x plus 1 Ende Quadratwurzel plus Quadratwurzel y plus 1 Ende Quadratwurzel Ende geschachtelte Quadratwurzel', 'sbrief');
};


/**
 * Testing Rule 9.3, Example 2.
 */
sre.MathspeakGermanTest.prototype.testSample_9_3_2 = function() {
  var mml = '<mrow><mroot><mroot><mi>x</mi><mi>m</mi></mroot><mi>n</mi>' +
      '</mroot><mo>=</mo><mroot><mroot><mi>x</mi><mi>n</mi></mroot>' +
      '<mi>m</mi></mroot></mrow>';
  this.executeRuleTest(mml, 'geschachtelter Wurzelexponent n Anfang geschachtelte Wurzel Wurzelexponent m Anfang Wurzel x Ende Wurzel Ende geschachtelte Wurzel ist gleich geschachtelter Wurzelexponent m Anfang geschachtelte Wurzel Wurzelexponent n Anfang Wurzel x Ende Wurzel Ende geschachtelte Wurzel', 'default');
  this.executeRuleTest(mml, 'geschachtelter Wurzelexponent n Anfang geschachtelte Wurzel Wurzelexponent m Anfang Wurzel x Ende Wurzel Ende geschachtelte Wurzel ist gleich geschachtelter Wurzelexponent m Anfang geschachtelte Wurzel Wurzelexponent n Anfang Wurzel x Ende Wurzel Ende geschachtelte Wurzel', 'brief');
  this.executeRuleTest(mml, 'geschachtelte Exponent n geschachtelte Wurzel Exponent m Wurzel x Ende Wurzel Ende geschachtelte Wurzel ist gleich geschachtelte Exponent m geschachtelte Wurzel Exponent n Wurzel x Ende Wurzel Ende geschachtelte Wurzel', 'sbrief');
};


/**
 * Testing Rule 9.3, Example 3.
 */
sre.MathspeakGermanTest.prototype.testSample_9_3_3 = function() {
  var mml = '<mrow><msup><mi>x</mi><mrow><mi>e</mi><mo>-</mo><mn>2</mn>' +
      '</mrow></msup><mo>=</mo><msqrt><mrow><mi>x</mi><mroot><mrow>' +
      '<mi>x</mi><mroot><mrow><mi>x</mi><mroot><mrow><mi>x</mi>' +
      '<mo>&#x2026;</mo></mrow><mn>5</mn></mroot></mrow><mn>4</mn></mroot>' +
      '</mrow><mn>3</mn></mroot></mrow></msqrt><mo>,</mo><mi>x</mi>' +
      '<mo>∈</mo><mi>ℝ</mi></mrow>';
  this.executeRuleTest(mml, 'x hoch e minus 2 Grundlinie ist gleich Anfang dreifach geschachtelte Quadratwurzel x Anfang zweifach geschachtelte Kubikwurzel x geschachtelter Wurzelexponent 4 Anfang geschachtelte Wurzel x Wurzelexponent 5 Anfang Wurzel x horizontale Ellipsis Ende Wurzel Ende geschachtelte Wurzel Ende zweifach geschachtelte Kubikwurzel Ende dreifach geschachtelte Quadratwurzel Komma x Element von großes R mit Doppelstrich', 'default');
  this.executeRuleTest(mml, 'x hoch e minus 2 Grund ist gleich Anfang dreifach geschachtelte Quadratwurzel x Anfang zweifach geschachtelte Kubikwurzel x geschachtelter Wurzelexponent 4 Anfang geschachtelte Wurzel x Wurzelexponent 5 Anfang Wurzel x horizontale Ellipsis Ende Wurzel Ende geschachtelte Wurzel Ende zweifach geschachtelte Kubikwurzel Ende dreifach geschachtelte Quadratwurzel Komma x Element von großes R mit Doppelstrich', 'brief');
  this.executeRuleTest(mml, 'x hoch e minus 2 Grund ist gleich dreifach geschachtelte Quadratwurzel x zweifach geschachtelte Kubikwurzel x geschachtelte Exponent 4 geschachtelte Wurzel x Exponent 5 Wurzel x horizontale Ellipsis Ende Wurzel Ende geschachtelte Wurzel Ende zweifach geschachtelte Kubikwurzel Ende dreifach geschachtelte Quadratwurzel Komma x Element von großes R mit Doppelstrich', 'sbrief');
};


/**
 * Testing Rule 9.3, Example 4.
 */
sre.MathspeakGermanTest.prototype.testSample_9_3_4 = function() {
  var mml = '<mrow><mfrac><mn>2</mn><mi>π</mi></mfrac><mo>=</mo>' +
      '<mfrac><msqrt><mn>2</mn></msqrt><mn>2</mn></mfrac>' +
      '<mfrac><msqrt><mrow><mn>2</mn><mo>+</mo><msqrt><mn>2</mn></msqrt>' +
      '</mrow></msqrt><mn>2</mn></mfrac><mfrac><msqrt><mrow><mn>2</mn>' +
      '<mo>+</mo><msqrt><mrow><mn>2</mn><mo>+</mo><msqrt><mn>2</mn>' +
      '</msqrt></mrow></msqrt></mrow></msqrt><mn>2</mn></mfrac>' +
      '<mo>&#x2026;</mo></mrow>';
  this.executeRuleTest(mml, 'Anfang Bruch 2 durch pi Ende Bruch ist gleich Anfang Bruch Anfang Quadratwurzel 2 Ende Quadratwurzel durch 2 Ende Bruch Anfang Bruch Anfang geschachtelte Quadratwurzel 2 plus Anfang Quadratwurzel 2 Ende Quadratwurzel Ende geschachtelte Quadratwurzel durch 2 Ende Bruch Anfang Bruch Anfang zweifach geschachtelte Quadratwurzel 2 plus Anfang geschachtelte Quadratwurzel 2 plus Anfang Quadratwurzel 2 Ende Quadratwurzel Ende geschachtelte Quadratwurzel Ende zweifach geschachtelte Quadratwurzel durch 2 Ende Bruch horizontale Ellipsis', 'default');
  this.executeRuleTest(mml, 'Anfang Bruch 2 durch pi Ende Bruch ist gleich Anfang Bruch Anfang Quadratwurzel 2 Ende Quadratwurzel durch 2 Ende Bruch Anfang Bruch Anfang geschachtelte Quadratwurzel 2 plus Anfang Quadratwurzel 2 Ende Quadratwurzel Ende geschachtelte Quadratwurzel durch 2 Ende Bruch Anfang Bruch Anfang zweifach geschachtelte Quadratwurzel 2 plus Anfang geschachtelte Quadratwurzel 2 plus Anfang Quadratwurzel 2 Ende Quadratwurzel Ende geschachtelte Quadratwurzel Ende zweifach geschachtelte Quadratwurzel durch 2 Ende Bruch horizontale Ellipsis', 'brief');
  this.executeRuleTest(mml, 'Bruch 2 durch pi Ende Bruch ist gleich Bruch Quadratwurzel 2 Ende Quadratwurzel durch 2 Ende Bruch Bruch geschachtelte Quadratwurzel 2 plus Quadratwurzel 2 Ende Quadratwurzel Ende geschachtelte Quadratwurzel durch 2 Ende Bruch Bruch zweifach geschachtelte Quadratwurzel 2 plus geschachtelte Quadratwurzel 2 plus Quadratwurzel 2 Ende Quadratwurzel Ende geschachtelte Quadratwurzel Ende zweifach geschachtelte Quadratwurzel durch 2 Ende Bruch horizontale Ellipsis', 'sbrief');
};


/**
 * Testing Rule 10.1, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_10_1_1 = function() {
  var mml = '<mrow><mfrac><mrow><mn>5</mn><mi>x</mi>' +
      '<menclose notation="updiagonalstrike"><mi>y</mi></menclose></mrow>' +
      '<mrow><mn>2</mn><menclose notation="updiagonalstrike"><mi>y</mi>' +
      '</menclose></mrow></mfrac><mo>=</mo><mfrac><mn>5</mn><mn>2</mn>' +
      '</mfrac><mi>x</mi></mrow>';
  this.executeRuleTest(mml, 'Anfang Bruch 5 x durchgestrichen y Ende duchgestrichen durch 2 durchgestrichen y Ende duchgestrichen Ende Bruch ist gleich fünf halbe x', 'default');
  this.executeRuleTest(mml, 'Anfang Bruch 5 x durchgestrichen y Ende duchgestrichen durch 2 durchgestrichen y Ende duchgestrichen Ende Bruch ist gleich fünf halbe x', 'brief');
  this.executeRuleTest(mml, 'Bruch 5 x durchgestrichen y Ende duchgestrichen durch 2 durchgestrichen y Ende duchgestrichen Ende Bruch ist gleich fünf halbe x', 'sbrief');
};


/**
 * Testing Rule 10.2, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_10_2_1 = function() {
  var mml = '<mrow><mfrac><mn>12</mn><mn>18</mn></mfrac><mo>=</mo><mfrac>' +
      '<mover><menclose notation="updiagonalstrike"><mn>12</mn></menclose>' +
      '<mn>2</mn></mover><munder><menclose notation="updiagonalstrike">' +
      '<mn>18</mn></menclose><mn>3</mn></munder></mfrac><mo>=</mo><mfrac>' +
      '<mn>2</mn><mn>3</mn></mfrac></mrow>';
  this.executeRuleTest(mml, 'Anfang Bruch 12 durch 18 Ende Bruch ist gleich Anfang Bruch durchgestrichen 12 mit 2 Ende duchgestrichen durch durchgestrichen 18 mit 3 Ende duchgestrichen Ende Bruch ist gleich zwei drittel', 'default');
  this.executeRuleTest(mml, 'Anfang Bruch 12 durch 18 Ende Bruch ist gleich Anfang Bruch durchgestrichen 12 mit 2 Ende duchgestrichen durch durchgestrichen 18 mit 3 Ende duchgestrichen Ende Bruch ist gleich zwei drittel', 'brief');
  this.executeRuleTest(mml, 'Bruch 12 durch 18 Ende Bruch ist gleich Bruch durchgestrichen 12 mit 2 Ende duchgestrichen durch durchgestrichen 18 mit 3 Ende duchgestrichen Ende Bruch ist gleich zwei drittel', 'sbrief');
};


/**
 * Reversed version of the above example.
 * Testing Rule 10.2, Example 2.
 */
sre.MathspeakGermanTest.prototype.testSample_10_2_2 = function() {
  var mml = '<mrow><mfrac><mn>12</mn><mn>18</mn></mfrac><mo>=</mo><mfrac>' +
      '<munder><mn>2</mn><menclose notation="updiagonalstrike"><mn>12</mn>' +
      '</menclose></munder><mover><mn>3</mn>' +
      '<menclose notation="updiagonalstrike">' +
      '<mn>18</mn></menclose></mover></mfrac><mo>=</mo><mfrac>' +
      '<mn>2</mn><mn>3</mn></mfrac></mrow>';
  this.executeRuleTest(mml, 'Anfang Bruch 12 durch 18 Ende Bruch ist gleich Anfang Bruch durchgestrichen 12 mit 2 Ende duchgestrichen durch durchgestrichen 18 mit 3 Ende duchgestrichen Ende Bruch ist gleich zwei drittel', 'default');
  this.executeRuleTest(mml, 'Anfang Bruch 12 durch 18 Ende Bruch ist gleich Anfang Bruch durchgestrichen 12 mit 2 Ende duchgestrichen durch durchgestrichen 18 mit 3 Ende duchgestrichen Ende Bruch ist gleich zwei drittel', 'brief');
  this.executeRuleTest(mml, 'Bruch 12 durch 18 Ende Bruch ist gleich Bruch durchgestrichen 12 mit 2 Ende duchgestrichen durch durchgestrichen 18 mit 3 Ende duchgestrichen Ende Bruch ist gleich zwei drittel', 'sbrief');
};


/**
 * Testing Rule 11.1, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_11_1_1 = function() {
  var mml = '<mover accent="true"><mi>x</mi><mo>¨</mo></mover>';
  this.executeRuleTest(mml, 'modifiziert oben x mit diaeresis', 'default');
  this.executeRuleTest(mml, 'mod oben x mit diaeresis', 'brief');
  this.executeRuleTest(mml, 'mod oben x mit diaeresis', 'sbrief');
};


/**
 * Testing Rule 11.1, Example 2.
 */
sre.MathspeakGermanTest.prototype.testSample_11_1_2 = function() {
  var mml = '<mover accent="true"><mrow><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '</mrow><mo>→</mo></mover>';
  this.executeRuleTest(mml, 'modifiziert oben x plus y mit Pfeil nach rechts', 'default');
  this.executeRuleTest(mml, 'mod oben x plus y mit Pfeil nach rechts', 'brief');
  this.executeRuleTest(mml, 'mod oben x plus y mit Pfeil nach rechts', 'sbrief');
};


/**
 * Testing Rule 11.1, Example 3.
 */
sre.MathspeakGermanTest.prototype.testSample_11_1_3 = function() {
  var mml = '<mover accent="true"><mi>x</mi><mo>^</mo></mover>';
  this.executeRuleTest(mml, 'modifiziert oben x mit circumflex', 'default');
  this.executeRuleTest(mml, 'mod oben x mit circumflex', 'brief');
  this.executeRuleTest(mml, 'mod oben x mit circumflex', 'sbrief');
};


/**
 * Testing Rule 11.2, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_11_2_1 = function() {
  var mml = '<munder accent="true"><mi>x</mi><mi>˙</mi></munder>';
  this.executeRuleTest(mml, 'modifiziert unten x mit Überpunkt', 'default');
  this.executeRuleTest(mml, 'mod unten x mit Überpunkt', 'brief');
  this.executeRuleTest(mml, 'mod unten x mit Überpunkt', 'sbrief');
};


/**
 * Testing Rule 11.3, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_11_3_1 = function() {
  var mml = '<mover accent="true"><mi>x</mi><mo>˜</mo></mover>';
  this.executeRuleTest(mml, 'x Tilde oben', 'default');
  this.executeRuleTest(mml, 'mod oben x mit Tilde', 'brief');
  this.executeRuleTest(mml, 'mod oben x mit Tilde', 'sbrief');
};


/**
 * Testing Rule 11.3, Example 2.
 */
sre.MathspeakGermanTest.prototype.testSample_11_3_2 = function() {
  var mml = '<mover accent="true"><mi>x</mi><mo>¯</mo></mover>';
  this.executeRuleTest(mml, 'x Überstrich', 'default');
  this.executeRuleTest(mml, 'mod oben x mit Überstrich', 'brief');
  this.executeRuleTest(mml, 'mod oben x mit Überstrich', 'sbrief');
};


/**
 * Testing Rule 11.3, Example 3.
 */
sre.MathspeakGermanTest.prototype.testSample_11_3_3 = function() {
  var mml = '<munder accentunder="true"><mi>y</mi><mo>˜</mo></munder>';
  this.executeRuleTest(mml, 'y Tilde unten', 'default');
  this.executeRuleTest(mml, 'mod unten y mit Tilde', 'brief');
  this.executeRuleTest(mml, 'mod unten y mit Tilde', 'sbrief');
};


/**
 * Testing Rule 11.4, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_11_4_1 = function() {
  var mml = '<mover accent="true"><mover accent="true"><mi>x</mi><mo>¯</mo>' +
      '</mover><mo>¯</mo></mover>';
  this.executeRuleTest(mml, 'x Überstrich Überstrich', 'default');
  this.executeRuleTest(mml, 'mod oben oben mod oben x mit Überstrich mit Überstrich', 'brief');
  this.executeRuleTest(mml, 'mod oben oben mod oben x mit Überstrich mit Überstrich', 'sbrief');
};


/**
 * Testing Rule 11.4, Example 2.
 */
sre.MathspeakGermanTest.prototype.testSample_11_4_2 = function() {
  var mml = '<munder><munder><mover accent="true"><mover accent="true">' +
      '<mi>y</mi><mo>¯</mo></mover><mo>¯</mo></mover>' +
      '<mo>\u005F</mo></munder><mo>\u005F</mo></munder>';
  this.executeRuleTest(mml, 'y Überstrich Überstrich Unterstrich Unterstrich', 'default');
  this.executeRuleTest(mml, 'mod unten unten mod unten mod oben oben mod oben y mit Überstrich mit Überstrich mit Unterstrich mit Unterstrich', 'brief');
  this.executeRuleTest(mml, 'mod unten unten mod unten mod oben oben mod oben y mit Überstrich mit Überstrich mit Unterstrich mit Unterstrich', 'sbrief');
};


/**
 * Testing Rule 11.6, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_11_6_1 = function() {
  var mml = '<munder accentunder="true"><munder><mrow><mi>a</mi><mo>+</mo>' +
      '<mi>b</mi></mrow><mo>\u005F</mo></munder><mo>*</mo></munder>';
  this.executeRuleTest(mml, 'modifiziert unten unten modifiziert unten a plus b mit Unterstrich mit times', 'default');
  this.executeRuleTest(mml, 'mod unten unten mod unten a plus b mit Unterstrich mit times', 'brief');
  this.executeRuleTest(mml, 'mod unten unten mod unten a plus b mit Unterstrich mit times', 'sbrief');
};


/**
 * Testing Rule 11.6, Example 3.
 */
sre.MathspeakGermanTest.prototype.testSample_11_6_3 = function() {
  var mml = '<mover><mover accent="true"><mrow><mi>x</mi><mo>+</mo>' +
      '<mi>y</mi></mrow><mo>˜</mo></mover><mo>¯</mo></mover>';
  this.executeRuleTest(mml, 'modifiziert oben oben modifiziert oben x plus y mit Tilde mit Überstrich', 'default');
  this.executeRuleTest(mml, 'mod oben oben mod oben x plus y mit Tilde mit Überstrich', 'brief');
  this.executeRuleTest(mml, 'mod oben oben mod oben x plus y mit Tilde mit Überstrich', 'sbrief');
};


/**
 * Testing Rule 11.7, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_11_7_1 = function() {
  var mml = '<mrow><munderover><mo>∑</mo><mrow><mi>n</mi><mo>=</mo>' +
      '<mn>1</mn></mrow><mi>∞</mi></munderover><msub><mi>a</mi><mi>n</mi>' +
      '</msub></mrow>';
  this.executeRuleTest(mml, 'Summe Unterschrift n ist gleich 1 Überschrift unendlich Ende Überschrift a Index n', 'default');
  this.executeRuleTest(mml, 'Summe Unterschrift n ist gleich 1 Überschrift unendlich Ende Überschrift a Index n', 'brief');
  this.executeRuleTest(mml, 'Summe Unterschrift n ist gleich 1 Überschrift unendlich Ende Überschrift a Index n', 'sbrief');
};


/**
 * Testing Rule 11.8, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_11_8_1 = function() {
  var mml = '<mrow><munder><munder><munder><mrow><mi>x</mi><mo>+</mo>' +
      '<mi>y</mi></mrow> <mo>\u005F</mo></munder><mrow><mi>a</mi>' +
      '<mo>=</mo><mn>5</mn></mrow></munder><mrow><mi>b</mi><mo>=</mo>' +
      '<mn>3</mn></mrow></munder></mrow>';
  this.executeRuleTest(mml, 'modifiziert unten x plus y mit Unterstrich Unterschrift a ist gleich 5 UnterUnterschrift b ist gleich 3 Ende Unterschrift', 'default');
  this.executeRuleTest(mml, 'mod unten x plus y mit Unterstrich Unterschrift a ist gleich 5 UnterUnterschrift b ist gleich 3 Ende Unterschrift', 'brief');
  this.executeRuleTest(mml, 'mod unten x plus y mit Unterstrich Unterschrift a ist gleich 5 UnterUnterschrift b ist gleich 3 Ende Unterschrift', 'sbrief');
};


/**
 * Testing Rule 11.8, Example 2.
 */
sre.MathspeakGermanTest.prototype.testSample_11_8_2 = function() {
  var mml = '<mrow><mover><mover><mover><mrow><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '</mrow><mo>¯</mo></mover><mrow><mi>n</mi><mo>=</mo><mn>1</mn></mrow>' +
      '</mover><mrow><mi>m</mi><mo>=</mo><mn>2</mn></mrow></mover></mrow>';
  this.executeRuleTest(mml, 'modifiziert oben x plus y mit Überstrich Überschrift n ist gleich 1 ÜberÜberschrift m ist gleich 2 Ende Überschrift', 'default');
  this.executeRuleTest(mml, 'mod oben x plus y mit Überstrich Überschrift n ist gleich 1 ÜberÜberschrift m ist gleich 2 Ende Überschrift', 'brief');
  this.executeRuleTest(mml, 'mod oben x plus y mit Überstrich Überschrift n ist gleich 1 ÜberÜberschrift m ist gleich 2 Ende Überschrift', 'sbrief');
};


/**
 * Testing Rule 12.1, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_12_1_1 = function() {
  var mml = '<mrow><msub><mo form="prefix">log</mo><mi>b</mi></msub>' +
      '<mi>x</mi></mrow>';
  this.executeRuleTest(mml, 'Logarithmus Index b Grundlinie x', 'default');
  this.executeRuleTest(mml, 'Logarithmus Index b Grund x', 'brief');
  this.executeRuleTest(mml, 'Logarithmus Index b Grund x', 'sbrief');
};


/**
 * Testing Rule 12.1, Example 2.
 */
sre.MathspeakGermanTest.prototype.testSample_12_1_2 = function() {
  var mml = '<mrow><mo form="prefix">cos</mo><mi>y</mi></mrow>';
  this.executeRuleTest(mml, 'Kosinus y', 'default');
  this.executeRuleTest(mml, 'Kosinus y', 'brief');
  this.executeRuleTest(mml, 'Kosinus y', 'sbrief');
};


/**
 * Testing Rule 12.1, Example 3.
 */
sre.MathspeakGermanTest.prototype.testSample_12_1_3 = function() {
  var mml = '<mrow><mo form="prefix">sin</mo><mi>x</mi></mrow>';
  this.executeRuleTest(mml, 'Sinus x', 'default');
  this.executeRuleTest(mml, 'Sinus x', 'brief');
  this.executeRuleTest(mml, 'Sinus x', 'sbrief');
};


/**
 * Testing Rule 13.1, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_13_1_1 = function() {
  var mml = '<mrow><mfrac><mrow><mn>60</mn>' +
      '<menclose notation="updiagonalstrike"><mi mathvariant="normal"' +
      ' class="MathML-Unit">mi</mi></menclose>' +
      '</mrow><menclose notation="updiagonalstrike"><mi mathvariant="normal"' +
      ' class="MathML-Unit">hr</mi>' +
      '</menclose></mfrac><mo>×</mo><mfrac><mrow><mn>5,280</mn>' +
      '<mi mathvariant="normal" class="MathML-Unit">ft</mi></mrow><mrow>' +
      '<mn>1</mn><menclose notation="updiagonalstrike">' +
      '<mi mathvariant="normal" class="MathML-Unit">mi</mi></menclose>' +
      '</mrow></mfrac><mo>×</mo><mfrac><mrow><mn>1</mn>' +
      '<menclose notation="updiagonalstrike"><mi mathvariant="normal"' +
      ' class="MathML-Unit">hr</mi></menclose>' +
      '</mrow><mrow><mn>60</mn><mi mathvariant="normal"' +
      ' class="MathML-Unit">min</mi></mrow></mfrac><mo>=</mo>' +
      '<mfrac><mrow><mn>5,280</mn><mi mathvariant="normal"' +
      ' class="MathML-Unit">ft</mi>' +
      '</mrow><mi mathvariant="normal" class="MathML-Unit">min</mi>' +
      '</mfrac></mrow>';
  this.executeRuleTest(mml, 'Anfang Bruch 60 durchgestrichen Meilen Ende duchgestrichen durch durchgestrichen Stunden Ende duchgestrichen Ende Bruch mal Anfang Bruch 5,280 Fuß durch 1 durchgestrichen Meilen Ende duchgestrichen Ende Bruch mal Anfang Bruch 1 durchgestrichen Stunden Ende duchgestrichen durch 60 Minuten Ende Bruch ist gleich Anfang Bruch 5,280 Fuß durch Minuten Ende Bruch', 'default');
  this.executeRuleTest(mml, 'Anfang Bruch 60 durchgestrichen Meilen Ende duchgestrichen durch durchgestrichen Stunden Ende duchgestrichen Ende Bruch mal Anfang Bruch 5,280 Fuß durch 1 durchgestrichen Meilen Ende duchgestrichen Ende Bruch mal Anfang Bruch 1 durchgestrichen Stunden Ende duchgestrichen durch 60 Minuten Ende Bruch ist gleich Anfang Bruch 5,280 Fuß durch Minuten Ende Bruch', 'brief');
  this.executeRuleTest(mml, 'Bruch 60 durchgestrichen Meilen Ende duchgestrichen durch durchgestrichen Stunden Ende duchgestrichen Ende Bruch mal Bruch 5,280 Fuß durch 1 durchgestrichen Meilen Ende duchgestrichen Ende Bruch mal Bruch 1 durchgestrichen Stunden Ende duchgestrichen durch 60 Minuten Ende Bruch ist gleich Bruch 5,280 Fuß durch Minuten Ende Bruch', 'sbrief');
};


// TODO: Get the Units right!
/**
 * Testing Rule 13.1, Example 2.
 */
sre.MathspeakGermanTest.prototype.testSample_13_1_2 = function() {
  var mml = '<mrow><mn>1</mn><mi mathvariant="normal"' +
      ' class="MathML-Unit">J</mi><mo>=</mo><mn>1</mn>' +
      '<mi mathvariant="normal" class="MathML-Unit">kg</mi><mo>·</mo><msup>' +
      '<mi mathvariant="normal" class="MathML-Unit">m</mi><mn>2</mn></msup>' +
      '<mo>·</mo><msup><mi mathvariant="normal" class="MathML-Unit">s</mi>' +
      '<mrow><mo>-</mo><mn>2</mn></mrow>' +
      '</msup></mrow>';
  this.executeRuleTest(mml, '1 Joules ist gleich 1 Kilogramm mal Meter Quadrat mal Sekunden hoch minus 2', 'default');
  this.executeRuleTest(mml, '1 Joules ist gleich 1 Kilogramm mal Meter Quadrat mal Sekunden hoch minus 2', 'brief');
  this.executeRuleTest(mml, '1 Joules ist gleich 1 Kilogramm mal Meter Quadrat mal Sekunden hoch minus 2', 'sbrief');
};


/**
 * Testing Rule 13.1, Example 3.
 */
sre.MathspeakGermanTest.prototype.testSample_13_1_3 = function() {
  var mml = '<mrow><mi>m</mi><mi mathvariant="normal"' +
      ' class="MathML-Unit">m</mi></mrow><mo>=</mo><mn>100</mn>' +
      '<mi>m</mi><mi mathvariant="normal" class="MathML-Unit">cm</mi>' +
      '<mo>=</mo><mrow><mfrac><mi>m</mi><mn>1,000</mn></mfrac>' +
      '<mi mathvariant="normal" class="MathML-Unit">km</mi></mrow>';
  this.executeRuleTest(mml, 'm Meter ist gleich 100 m Zentimeter ist gleich Anfang Bruch m durch 1,000 Ende Bruch Kilometer', 'default');
  this.executeRuleTest(mml, 'm Meter ist gleich 100 m Zentimeter ist gleich Anfang Bruch m durch 1,000 Ende Bruch Kilometer', 'brief');
  this.executeRuleTest(mml, 'm Meter ist gleich 100 m Zentimeter ist gleich Bruch m durch 1,000 Ende Bruch Kilometer', 'sbrief');
};


/**
 * Testing Rule 13.1, Example 4.
 */
sre.MathspeakGermanTest.prototype.testSample_13_1_4 = function() {
  var mml = '<mrow><mn>1</mn><mi mathvariant="normal"' +
      ' class="MathML-Unit">mi</mi></mrow><mo>≈</mo>' +
      '<mrow><mn>1.6</mn><mi mathvariant="normal"' +
      ' class="MathML-Unit">km</mi></mrow>';
  this.executeRuleTest(mml, '1 Meilen beinahe gleich 1\\,6 Kilometer', 'default');
  this.executeRuleTest(mml, '1 Meilen beinahe gleich 1\\,6 Kilometer', 'brief');
  this.executeRuleTest(mml, '1 Meilen beinahe gleich 1\\,6 Kilometer', 'sbrief');
};


/**
 * Testing Rule 13.1, Example 5.
 */
sre.MathspeakGermanTest.prototype.testSample_13_1_5 = function() {
  var mml = '<mrow><mn>1</mn><mi mathvariant="normal"' +
      ' class="MathML-Unit">in</mi><mo>=</mo><mn>2.54</mn>' +
      '<mi mathvariant="normal" class="MathML-Unit">cm</mi></mrow>';
  this.executeRuleTest(mml, '1 Zoll ist gleich 2\\,54 Zentimeter', 'default');
  this.executeRuleTest(mml, '1 Zoll ist gleich 2\\,54 Zentimeter', 'brief');
  this.executeRuleTest(mml, '1 Zoll ist gleich 2\\,54 Zentimeter', 'sbrief');
};


/**
 * Testing Rule 14.1, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_14_1_1 = function() {
  var mml = '<mtable><mtr><mtd><msub><mi>H</mi><mn>2</mn></msub></mtd><mtd>' +
      '<mo>+</mo></mtd><mtd><msub><mi>F</mi><mn>2</mn></msub></mtd><mtd>' +
      '<mo>→</mo></mtd><mtd><mrow><mn>2</mn><mi>H</mi><mi>F</mi></mrow>' +
      '</mtd></mtr><mtr><mtd><mtext>hydrogen</mtext></mtd><mtd/><mtd>' +
      '<mtext>fluorine</mtext></mtd><mtd/><mtd><mrow>' +
      '<mtext>hydrogen</mtext><mspace width="4.pt"/>' +
      '<mtext>fluoride</mtext></mrow></mtd></mtr></mtable>';
  this.executeRuleTest(mml, 'Anfang Anordnung 1. Zeile 1. Spalte großes H 2 2. Spalte plus 3. Spalte großes F 2 4. Spalte Pfeil nach rechts 5. Spalte 2 großes H großes F 2. Zeile 1. Spalte hydrogen 2. Spalte leer 3. Spalte fluorine 4. Spalte leer 5. Spalte hydrogen fluoride Ende Anordnung', 'default');
  this.executeRuleTest(mml, 'Anfang Anordnung 1. Zeile 1. Spalte großes H 2 2. Spalte plus 3. Spalte großes F 2 4. Spalte Pfeil nach rechts 5. Spalte 2 großes H großes F 2. Zeile 1. Spalte hydrogen 2. Spalte leer 3. Spalte fluorine 4. Spalte leer 5. Spalte hydrogen fluoride Ende Anordnung', 'brief');
  this.executeRuleTest(mml, 'Anordnung 1. Zeile 1. Spalte großes H 2 2. Spalte plus 3. Spalte großes F 2 4. Spalte Pfeil nach rechts 5. Spalte 2 großes H großes F 2. Zeile 1. Spalte hydrogen 2. Spalte leer 3. Spalte fluorine 4. Spalte leer 5. Spalte hydrogen fluoride Ende Anordnung', 'sbrief');
};


/**
 * Testing Rule 14.3, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_14_3_1 = function() {
  var mml = '<mrow><mi>x</mi><mo>=</mo>' +
      '<mfenced separators="" open="{" close=""><mtable><mtr><mtd><mrow>' +
      '<mi>y</mi><mo>&lt;</mo><mn>0</mn></mrow></mtd><mtd><mn>0</mn></mtd>' +
      '</mtr><mtr><mtd><mrow><mi>y</mi><mo>≥</mo><mn>0</mn></mrow></mtd>' +
      '<mtd><mrow><mn>2</mn><mi>y</mi></mrow></mtd></mtr></mtable>' +
      '</mfenced></mrow>';
  this.executeRuleTest(mml, 'x ist gleich Anfang Fallunterscheidung große geschwungene Klammer auf 1. Zeile 1. Spalte y kleiner als 0 2. Spalte 0 2. Zeile 1. Spalte y größer oder gleich 0 2. Spalte 2 y Ende Fallunterscheidung', 'default');
  this.executeRuleTest(mml, 'x ist gleich Anfang Fälle große geschwungene Klammer auf 1. Zeile 1. Spalte y kleiner als 0 2. Spalte 0 2. Zeile 1. Spalte y größer oder gleich 0 2. Spalte 2 y Ende Fälle', 'brief');
  this.executeRuleTest(mml, 'x ist gleich Fälle große geschwungene Klammer auf 1. Zeile 1. Spalte y kleiner als 0 2. Spalte 0 2. Zeile 1. Spalte y größer oder gleich 0 2. Spalte 2 y Ende Fälle', 'sbrief');
};


/**
 * Testing Rule 15.1, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_15_1_1 = function() {
  var mml = '<mfenced open="[" close="]"><mtable><mtr><mtd><mrow><mi>x</mi>' +
      '<mo>+</mo><mi>a</mi></mrow></mtd><mtd><mrow><mi>x</mi><mo>+</mo>' +
      '<mi>b</mi></mrow></mtd><mtd><mrow><mi>x</mi><mo>+</mo><mi>c</mi>' +
      '</mrow></mtd></mtr><mtr><mtd><mrow><mi>y</mi><mo>+</mo><mi>a</mi>' +
      '</mrow></mtd><mtd><mrow><mi>y</mi><mo>+</mo><mi>b</mi></mrow></mtd>' +
      '<mtd><mrow><mi>y</mi><mo>+</mo><mi>c</mi></mrow></mtd></mtr><mtr>' +
      '<mtd><mrow><mi>z</mi><mo>+</mo><mi>a</mi></mrow></mtd><mtd><mrow>' +
      '<mi>z</mi><mo>+</mo><mi>b</mi></mrow></mtd><mtd><mrow><mi>z</mi>' +
      '<mo>+</mo><mi>c</mi></mrow></mtd></mtr></mtable></mfenced>';
  this.executeRuleTest(mml, 'Anfang 3 mal 3 Matrize 1. Zeile 1. Spalte x plus a 2. Spalte x plus b 3. Spalte x plus c 2. Zeile 1. Spalte y plus a 2. Spalte y plus b 3. Spalte y plus c 3. Zeile 1. Spalte z plus a 2. Spalte z plus b 3. Spalte z plus c Ende Matrize', 'default');
  this.executeRuleTest(mml, 'Anfang 3 mal 3 Matrize 1. Zeile 1. Spalte x plus a 2. Spalte x plus b 3. Spalte x plus c 2. Zeile 1. Spalte y plus a 2. Spalte y plus b 3. Spalte y plus c 3. Zeile 1. Spalte z plus a 2. Spalte z plus b 3. Spalte z plus c Ende Matrize', 'brief');
  this.executeRuleTest(mml, '3 mal 3 Matrize 1. Zeile 1. Spalte x plus a 2. Spalte x plus b 3. Spalte x plus c 2. Zeile 1. Spalte y plus a 2. Spalte y plus b 3. Spalte y plus c 3. Zeile 1. Spalte z plus a 2. Spalte z plus b 3. Spalte z plus c Ende Matrize', 'sbrief');
};


/**
 * Testing Rule 15.2, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_15_2_1 = function() {
  var mml = '<mrow><mfenced open="|" close="|"><mtable><mtr><mtd><mrow>' +
      '<mi>a</mi><mo>+</mo><mn>1</mn></mrow></mtd><mtd><mi>b</mi></mtd>' +
      '</mtr><mtr><mtd><mi>c</mi></mtd><mtd><mi>d</mi></mtd></mtr>' +
      '</mtable></mfenced><mo>=</mo><mrow><mo>(</mo><mi>a</mi><mo>+</mo>' +
      '<mn>1</mn><mo>)</mo></mrow><mi>d</mi><mo>-</mo><mi>b</mi><mi>c</mi>' +
      '</mrow>';
  this.executeRuleTest(mml, 'Anfang 2 mal 2 Determinante 1. Zeile 1. Spalte a plus 1 2. Spalte b 2. Zeile 1. Spalte c 2. Spalte d Ende Determinante ist gleich Klammer auf a plus 1 Klammer zu d minus b c', 'default');
  this.executeRuleTest(mml, 'Anfang 2 mal 2 Determinante 1. Zeile 1. Spalte a plus 1 2. Spalte b 2. Zeile 1. Spalte c 2. Spalte d Ende Determinante ist gleich Klammer auf a plus 1 Klammer zu d minus b c', 'brief');
  this.executeRuleTest(mml, '2 mal 2 Determinante 1. Zeile 1. Spalte a plus 1 2. Spalte b 2. Zeile 1. Spalte c 2. Spalte d Ende Determinante ist gleich Klammer auf a plus 1 Klammer zu d minus b c', 'sbrief');
};


/**
 * Testing Rule 15.4, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_15_4_1 = function() {
  var mml = '<mrow><mfenced open="|" close="|"><mtable><mtr><mtd><mi>a</mi>' +
      '</mtd><mtd><mi>b</mi></mtd></mtr><mtr><mtd><mi>c</mi></mtd><mtd>' +
      '<mi>d</mi></mtd></mtr></mtable></mfenced><mo>=</mo><mi>a</mi>' +
      '<mi>d</mi><mo>-</mo><mi>b</mi><mi>c</mi></mrow>';
  this.executeRuleTest(mml, 'Anfang 2 mal 2 Determinante 1. Zeile a b 2. Zeile c d Ende Determinante ist gleich a d minus b c', 'default');
  this.executeRuleTest(mml, 'Anfang 2 mal 2 Determinante 1. Zeile a b 2. Zeile c d Ende Determinante ist gleich a d minus b c', 'brief');
  this.executeRuleTest(mml, '2 mal 2 Determinante 1. Zeile a b 2. Zeile c d Ende Determinante ist gleich a d minus b c', 'sbrief');
};


/**
 * Testing Rule 15.6, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_15_6_1 = function() {
  var mml = '<mfenced open="(" close=")"><mtable><mtr><mtd><mi>x</mi></mtd>' +
      '</mtr><mtr><mtd><mi>y</mi></mtd></mtr></mtable></mfenced>';
  this.executeRuleTest(mml, 'Anfang Binomialkoeffizient y aus x Ende Binomialkoeffizient', 'default');
  this.executeRuleTest(mml, 'Anfang Binomial y aus x Ende Binomial', 'brief');
  this.executeRuleTest(mml, 'Binomial y aus x Ende Binomial', 'sbrief');
};

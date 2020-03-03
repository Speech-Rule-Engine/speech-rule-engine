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

  /**
   * @override
   */
  this.semantics = true;

  this.setActive('MathspeakGerman');
};
goog.inherits(sre.MathspeakGermanTest, sre.AbstractRuleTest);


/**
 * Testing Rule 1.1, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_1_1_1 = function() {
  var mml = '<mrow><mi>π</mi><mo>≈</mo><mn>3,14159</mn></mrow>';
  this.executeRuleTest(mml, 'pi presque égal à 3,14159', 'default');
  this.executeRuleTest(mml, 'pi presque égal à 3,14159', 'brief');
  this.executeRuleTest(mml, 'pi presque égal à 3,14159', 'sbrief');
};


/**
 * Testing Rule 1.1, Example 2.
 */
sre.MathspeakGermanTest.prototype.testSample_1_1_2 = function() {
  var mml = '<mrow><mn>102</mn><mo>+</mo><mn>2214</mn><mo>+</mo><mn>15</mn>' +
      '<mo>=</mo><mn>2331</mn></mrow>';
  this.executeRuleTest(mml, '102 plus 2214 plus 15 égale 2331', 'default');
  this.executeRuleTest(mml, '102 plus 2214 plus 15 égale 2331', 'brief');
  this.executeRuleTest(mml, '102 plus 2214 plus 15 égale 2331', 'sbrief');
};


/**
 * Testing Rule 1.1, Example 3.
 */
sre.MathspeakGermanTest.prototype.testSample_1_1_3 = function() {
  var mml = '<mrow><mn>59</mn><mo>×</mo><mn>0</mn><mo>=</mo><mn>0</mn></mrow>';
  this.executeRuleTest(mml, '59 multiplié par 0 égale 0', 'default');
  this.executeRuleTest(mml, '59 multiplié par 0 égale 0', 'brief');
  this.executeRuleTest(mml, '59 multiplié par 0 égale 0', 'sbrief');
};


/**
 * Testing Rule 1.2, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_1_2_1 = function() {
  var mml = '<mrow><mn>3</mn><mo>-</mo><mo>-</mo><mn>2</mn></mrow>';
  this.executeRuleTest(mml, '3 moins négatif 2', 'default');
  this.executeRuleTest(mml, '3 moins négatif 2', 'brief');
  this.executeRuleTest(mml, '3 moins négatif 2', 'sbrief');
};


/**
 * Testing Rule 1.2, Example 2.
 */
sre.MathspeakGermanTest.prototype.testSample_1_2_2 = function() {
  var mml = '<mrow><mo>-</mo><mi>y</mi></mrow>';
  this.executeRuleTest(mml, 'négatif y', 'default');
  this.executeRuleTest(mml, 'négatif y', 'brief');
  this.executeRuleTest(mml, 'négatif y', 'sbrief');
};


/**
 * Testing Rule 1.2, Example 3.
 */
sre.MathspeakGermanTest.prototype.testSample_1_2_3 = function() {
  var mml = '<mrow><mo>-</mo><mn>32</mn></mrow>';
  this.executeRuleTest(mml, 'négatif 32', 'default');
  this.executeRuleTest(mml, 'négatif 32', 'brief');
  this.executeRuleTest(mml, 'négatif 32', 'sbrief');
};


/**
 * Testing Rule 1.4, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_1_4_1 = function() {
  var mml = '<mrow><mn>t2e4</mn></mrow>';
  this.executeRuleTest(mml, 'nombre t 2 e 4', 'default');
  this.executeRuleTest(mml, 'nombre t 2 e 4', 'brief');
  this.executeRuleTest(mml, 'nombre t 2 e 4', 'sbrief');
};


/**
 * Testing Rule 1.4, Example 2.
 */
sre.MathspeakGermanTest.prototype.testSample_1_4_2 = function() {
  var mml = '<mrow><mn>#FF0000</mn></mrow>';
  this.executeRuleTest(mml, 'nombre dièse F majuscule F majuscule 0 0 0 0', 'default');
  this.executeRuleTest(mml, 'nombre dièse F majuscule F majuscule 0 0 0 0', 'brief');
  this.executeRuleTest(mml, 'nombre dièse F majuscule F majuscule 0 0 0 0', 'sbrief');
};


/**
 * Testing Rule 1.4, Example 3.
 */
sre.MathspeakGermanTest.prototype.testSample_1_4_3 = function() {
  var mml = '<mrow><mn>0x15FF</mn><mo>+</mo><mn>0x2B01</mn><mo>=</mo>' +
      '<mn>0x4100</mn></mrow>';
  this.executeRuleTest(mml, 'nombre 0 x 1 5 F majuscule F majuscule plus nombre 0 x 2 B majuscule 0 1 égale nombre 0 x 4 1 0 0', 'default');
  this.executeRuleTest(mml, 'nombre 0 x 1 5 F majuscule F majuscule plus nombre 0 x 2 B majuscule 0 1 égale nombre 0 x 4 1 0 0', 'brief');
  this.executeRuleTest(mml, 'nombre 0 x 1 5 F majuscule F majuscule plus nombre 0 x 2 B majuscule 0 1 égale nombre 0 x 4 1 0 0', 'sbrief');
};


/**
 * Testing Rule 1.5, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_1_5_1 = function() {
  var mml = '<mrow><mn>I</mn><mo>,</mo><mn>II</mn><mo>,</mo><mn>III</mn>' +
      '<mo>,</mo><mn>IV</mn><mo>,</mo><mn>V</mn><mo>.</mo></mrow>';
  this.executeRuleTest(mml, 'I majuscule virgule MotMajuscule I I virgule MotMajuscule I I I virgule MotMajuscule I V virgule V majuscule point',
                       'default');
  this.executeRuleTest(mml, 'I majuscule virgule MotMajuscule I I virgule MotMajuscule I I I virgule MotMajuscule I V virgule V majuscule point',
                       'brief');
  this.executeRuleTest(mml, 'I majuscule virgule MotMajuscule I I virgule MotMajuscule I I I virgule MotMajuscule I V virgule V majuscule point',
                       'sbrief');
};


/**
 * Testing Rule 2.1, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_2_1_1 = function() {
  var mml = '<mrow><mi>d</mi><mo>=</mo><msqrt><mrow><msup><mrow><mo>(</mo>' +
      '<mi>X</mi><mo>-</mo><mi>x</mi><mo>)</mo></mrow><mn>2</mn></msup>' +
      '<mo>-</mo><msup><mrow><mo>(</mo><mi>Y</mi><mo>-</mo><mi>y</mi>' +
      '<mo>)</mo></mrow><mn>2</mn></msup></mrow></msqrt></mrow>';
  this.executeRuleTest(mml, 'd égale début racine carrée parenthèse gauche X majuscule moins x parenthèse droite au carré moins parenthèse gauche Y majuscule moins y parenthèse droite au carré fin racine carrée', 'default');
  this.executeRuleTest(mml, 'd égale début racine carrée parenthèse gauche X majuscule moins x parenthèse droite au carré moins parenthèse gauche Y majuscule moins y parenthèse droite au carré fin racine carrée', 'brief');
  this.executeRuleTest(mml, 'd égale racine carrée parenthèse gauche X majuscule moins x parenthèse droite au carré moins parenthèse gauche Y majuscule moins y parenthèse droite au carré fin racine carrée', 'sbrief');
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
  this.executeRuleTest(mml, 'Si A majuscule flèche droite B majuscule et B majuscule flèche droite C majuscule alors A majuscule flèche droite C majuscule point',
                       'default');
  this.executeRuleTest(mml, 'Si A majuscule flèche droite B majuscule et B majuscule flèche droite C majuscule alors A majuscule flèche droite C majuscule point',
                       'brief');
  this.executeRuleTest(mml, 'Si A majuscule flèche droite B majuscule et B majuscule flèche droite C majuscule alors A majuscule flèche droite C majuscule point',
                       'sbrief');
};


/**
 * Testing Rule 2.6, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_2_6_1 = function() {
  var mml = '<mrow><mo mathvariant="bold">[</mo><mi>x</mi>' +
      '<mo mathvariant="bold">]</mo></mrow>';
  this.executeRuleTest(mml, 'crochet gauche en gras x crochet droit en gras', 'default');
  this.executeRuleTest(mml, 'crochet gauche en gras x crochet droit en gras', 'brief');
  this.executeRuleTest(mml, 'crochet gauche en gras x crochet droit en gras', 'sbrief');
};


/**
 * Testing Rule 2.6, Example 2.
 */
sre.MathspeakGermanTest.prototype.testSample_2_6_2 = function() {
  var mml = '<mrow><mo>∮</mo><mi>E</mi><mo>·</mo><mi>d</mi>' +
      '<mi mathvariant="bold">l</mi><mo>=</mo><mo>-</mo><mfrac><mrow>' +
      '<mi>d</mi><mi>Φ</mi><mi>B</mi></mrow><mrow><mi>d</mi><mi>t</mi>' +
      '</mrow></mfrac></mrow>';
  this.executeRuleTest(mml, 'intégrale de contour E majuscule point médian d l en gras égale négatif début fraction d Phi majuscule B majuscule sur d t fin fraction',
                       'default');
  this.executeRuleTest(mml, 'intégrale de contour E majuscule point médian d l en gras égale négatif début frac d Phi majuscule B majuscule sur d t fin frac', 'brief');
  this.executeRuleTest(mml, 'intégrale de contour E majuscule point médian d l en gras égale négatif frac d Phi majuscule B majuscule sur d t fin frac', 'sbrief');
};


/**
 * Testing prefix operation as negative or minus.
 */
sre.MathspeakGermanTest.prototype.testNegativeVsMinus = function() {
  var mml = '<mrow><mo>-</mo><mfrac><mn>1</mn><mi>b</mi></mfrac></mrow>';
  this.executeRuleTest(mml, 'négatif début fraction 1 sur b fin fraction', 'default');
  mml = '<mrow><mo>-</mo><mfrac><mi>a</mi><mi>b</mi></mfrac></mrow>';
  this.executeRuleTest(mml, 'négatif début fraction a sur b fin fraction', 'default');
  mml = '<mrow><mo>-</mo><mn>3</mn><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow>';
  this.executeRuleTest(mml, 'négatif 3 et un-demi', 'default');
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
  this.executeRuleTest(mml, 'Majuscule parenthèse gauche début ensemble alpha virgule bêta virgule gamma virgule delta virgule epsilon virgule phi fin ensemble parenthèse droite égale début ensemble Alpha majuscule virgule Bêta majuscule virgule Gamma majuscule virgule Delta majuscule virgule Epsilon majuscule virgule Phi majuscule fin ensemble', 'default');
  this.executeRuleTest(mml, 'Majuscule parenthèse gauche début ensemble alpha virgule bêta virgule gamma virgule delta virgule epsilon virgule phi fin ensemble parenthèse droite égale début ensemble Alpha majuscule virgule Bêta majuscule virgule Gamma majuscule virgule Delta majuscule virgule Epsilon majuscule virgule Phi majuscule fin ensemble',
                       'brief');
  this.executeRuleTest(mml, 'Majuscule parenthèse gauche ensemble alpha virgule bêta virgule gamma virgule delta virgule epsilon virgule phi fin ensemble parenthèse droite égale ensemble Alpha majuscule virgule Bêta majuscule virgule Gamma majuscule virgule Delta majuscule virgule Epsilon majuscule virgule Phi majuscule fin ensemble', 'sbrief');
};


/**
 * Testing Rule 5.1, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_5_1_1 = function() {
  var mml = '<mrow><mi>y</mi><mo>-</mo><mn>1</mn></mrow>';
  this.executeRuleTest(mml, 'y moins 1', 'default');
  this.executeRuleTest(mml, 'y moins 1', 'brief');
  this.executeRuleTest(mml, 'y moins 1', 'sbrief');
};


/**
 * Testing Rule 5.1, Example 2.
 */
sre.MathspeakGermanTest.prototype.testSample_5_1_2 = function() {
  var mml = '<mrow><mo>(</mo><mn>1</mn><mtext> a </mtext>' +
      '<mn>1</mn><mo>)</mo></mrow>';
  this.executeRuleTest(mml, 'parenthèse gauche 1 a 1 parenthèse droite',
                       'default');
  this.executeRuleTest(mml, 'parenthèse gauche 1 a 1 parenthèse droite',
                       'brief');
  this.executeRuleTest(mml, 'parenthèse gauche 1 a 1 parenthèse droite',
                       'sbrief');
};


/**
 * Testing Rule 5.1, Example 3.
 */
sre.MathspeakGermanTest.prototype.testSample_5_1_3 = function() {
  var mml = '<mrow><mo>-</mo><mn>1</mn></mrow>';
  this.executeRuleTest(mml, 'négatif 1', 'default');
  this.executeRuleTest(mml, 'négatif 1', 'brief');
  this.executeRuleTest(mml, 'négatif 1', 'sbrief');
};


/**
 * Testing Rule 6.1, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_6_1_1 = function() {
  var mml = '<mtext>Die Fibonaccizahlen sind: </mtext><mrow><mo>{</mo>' +
      '<mn>0</mn><mo>,</mo><mn>1</mn><mo>,</mo><mn>1</mn><mo>,</mo>' +
      '<mn>2</mn><mo>,</mo><mn>3</mn><mo>,</mo><mn>5</mn><mo>,</mo>' +
      '<mn>8</mn><mo>,</mo><mo>&#x2026;</mo><mo>}</mo></mrow>';
  this.executeRuleTest(mml, 'Les numéros de Fibonacci sont deux points début ensemble 0 virgule 1 virgule 1 virgule 2 virgule 3 virgule 5 virgule 8 virgule points de suspension fin ensemble',
                       'default');
  this.executeRuleTest(mml, 'Les numéros de Fibonacci sont deux points début ensemble 0 virgule 1 virgule 1 virgule 2 virgule 3 virgule 5 virgule 8 virgule points de suspension fin ensemble',
                       'brief');
  this.executeRuleTest(mml, 'Les numéros de Fibonacci sont deux points ensemble 0 virgule 1 virgule 1 virgule 2 virgule 3 virgule 5 virgule 8 virgule points de suspension fin ensemble', 'sbrief');
};


/**
 * Testing Rule 6.2, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_6_2_1 = function() {
  var mml = '<mrow><mo>|</mo><mn>4</mn><mo>-</mo><mn>7</mn><mo>|</mo>' +
      '<mo>=</mo><mn>3</mn></mrow>';
  this.executeRuleTest(mml, 'début valeur absolue 4 moins 7 fin valeur absolue égale 3', 'default');
  this.executeRuleTest(mml, 'début valeur absolue 4 moins 7 fin valeur absolue égale 3', 'brief');
  this.executeRuleTest(mml, 'valeur absolue 4 moins 7 fin valeur absolue égale 3', 'sbrief');
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
  this.executeRuleTest(mml, 'début valeur absolue a plus ou moins début valeur absolue b moins c fin valeur absolue fin valeur absolue pas égal à début valeur absolue a fin valeur absolue plus ou moins début valeur absolue b moins c fin valeur absolue', 'default');
  this.executeRuleTest(mml, 'début valeur absolue a plus ou moins début valeur absolue b moins c fin valeur absolue fin valeur absolue pas égal à début valeur absolue a fin valeur absolue plus ou moins début valeur absolue b moins c fin valeur absolue', 'brief');
  this.executeRuleTest(mml, 'valeur absolue a plus ou moins valeur absolue b moins c fin valeur absolue fin valeur absolue pas égal à valeur absolue a fin valeur absolue plus ou moins valeur absolue b moins c fin valeur absolue', 'sbrief');
};


/**
 * Testing Rule 7.1, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_7_1_1 = function() {
  var mml = '<mfrac><mn>1</mn><mi>x</mi></mfrac>';
  this.executeRuleTest(mml, 'début fraction 1 sur x fin fraction', 'default');
  this.executeRuleTest(mml, 'début frac 1 sur x fin frac', 'brief');
  this.executeRuleTest(mml, 'frac 1 sur x fin frac', 'sbrief');
};


/**
 * Testing Rule 7.1, Example 2.
 */
sre.MathspeakGermanTest.prototype.testSample_7_1_2 = function() {
  var mml = '<mrow><mi>a</mi><mo>-</mo><mfrac><mrow><mi>b</mi><mo>+</mo>' +
      '<mi>c</mi></mrow><mrow><mi>d</mi><mo>-</mo><mi>e</mi></mrow>' +
      '</mfrac><mo>×</mo><mi>f</mi></mrow>';
  this.executeRuleTest(mml, 'a moins début fraction b plus c sur d moins e fin fraction multiplié par f', 'default');
  this.executeRuleTest(mml, 'a moins début frac b plus c sur d moins e fin frac multiplié par f', 'brief');
  this.executeRuleTest(mml, 'a moins frac b plus c sur d moins e fin frac multiplié par f',
                       'sbrief');
};


/**
 * Testing Rule 7.2, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_7_2_1 = function() {
  var mml = '<mrow><mfrac><mfrac><mi>x</mi><mi>y</mi></mfrac><mi>z</mi>' +
      '</mfrac><mo>≠</mo><mfrac><mi>x</mi><mfrac><mi>y</mi><mi>z</mi>' +
      '</mfrac></mfrac></mrow>';
  this.executeRuleTest(mml, 'début début fraction début fraction x sur y fin fraction sur sur z fin fin fraction pas égal à début début fraction x sur sur début fraction y sur z fin fraction fin fin fraction',
                       'default');
  this.executeRuleTest(mml, 'début début frac début frac x sur y fin frac sur sur z fin fin frac pas égal à début début frac x sur sur début frac y sur z fin frac fin fin frac', 'brief');
  this.executeRuleTest(mml, 'frac1imbriquée frac x sur y fin frac sur1imbriquée z fin frac1imbriquée pas égal à frac1imbriquée x sur1imbriquée frac y sur z fin frac fin frac1imbriquée', 'sbrief');
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
  this.executeRuleTest(mml, 'début début début fraction début début fraction parenthèse gauche 1 moins x parenthèse droite début fraction d sur d x fin fraction parenthèse gauche 2 x parenthèse droite moins 2 x début fraction d sur d x fin fraction parenthèse gauche 1 moins x parenthèse droite sur sur parenthèse gauche 1 moins x parenthèse droite au carré fin fin fraction sur sur sur 1 plus parenthèse gauche début fraction 2 x sur 1 moins x fin fraction parenthèse droite au carré fin fin fin fraction', 'default');
  this.executeRuleTest(mml, 'début début début frac début début frac parenthèse gauche 1 moins x parenthèse droite début frac d sur d x fin frac parenthèse gauche 2 x parenthèse droite moins 2 x début frac d sur d x fin frac parenthèse gauche 1 moins x parenthèse droite sur sur parenthèse gauche 1 moins x parenthèse droite au carré fin fin frac sur sur sur 1 plus parenthèse gauche début frac 2 x sur 1 moins x fin frac parenthèse droite au carré fin fin fin frac', 'brief');
  this.executeRuleTest(mml, 'frac2imbriquée frac1imbriquée parenthèse gauche 1 moins x parenthèse droite frac d sur d x fin frac parenthèse gauche 2 x parenthèse droite moins 2 x frac d sur d x fin frac parenthèse gauche 1 moins x parenthèse droite sur1imbriquée parenthèse gauche 1 moins x parenthèse droite au carré fin frac1imbriquée sur2imbriquée 1 plus parenthèse gauche frac 2 x sur 1 moins x fin frac parenthèse droite au carré fin frac2imbriquée', 'sbrief');
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
  this.executeRuleTest(mml, 'a indice 0 position de base plus début début début début fraction 1 sur sur sur sur a indice 1 position de base plus début début début fraction 1 sur sur sur a indice 2 position de base plus début début fraction 1 sur sur points de suspension plus début fraction 1 sur a indice n position de base fin fraction fin fin fraction fin fin fin fraction fin fin fin fin fraction', 'default');
  this.executeRuleTest(mml, 'a 0 plus début début début début frac 1 sur sur sur sur a 1 plus début début début frac 1 sur sur sur a 2 plus début début frac 1 sur sur points de suspension plus début frac 1 sur a sub n position de base fin frac fin fin frac fin fin fin frac fin fin fin fin frac', 'brief');
  this.executeRuleTest(mml, 'a 0 plus frac3imbriquée 1 sur3imbriquée a 1 plus frac2imbriquée 1 sur2imbriquée a 2 plus frac1imbriquée 1 sur1imbriquée points de suspension plus frac 1 sur a sub n position de base fin frac fin frac1imbriquée fin frac2imbriquée fin frac3imbriquée', 'sbrief');
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
  this.executeRuleTest(mml, 'un-demi plus deux-demis plus trois-demis plus quatre-demis plus points de suspension égale sommation début souscript n égale 1 début suscript infini fin scripts début fraction n sur 2 fin fraction',
                       'default');
  this.executeRuleTest(mml, 'un-demi plus deux-demis plus trois-demis plus quatre-demis plus points de suspension égale sommation début souscript n égale 1 début suscript infini fin scripts début frac n sur 2 fin frac', 'brief');
  this.executeRuleTest(mml, 'un-demi plus deux-demis plus trois-demis plus quatre-demis plus points de suspension égale sommation début souscript n égale 1 début suscript infini fin scripts frac n sur 2 fin frac', 'sbrief');
};


/**
 * Testing Rule 7.4, Example 2.
 */
sre.MathspeakGermanTest.prototype.testSample_7_4_2 = function() {
  var mml = '<mrow><mfrac><mn>20</mn><mn>5</mn></mfrac><mo>×</mo><mfrac>' +
      '<mn>1</mn><mn>100</mn></mfrac><mo>=</mo><mfrac><mn>1</mn>' +
      '<mn>25</mn></mfrac></mrow>';
  this.executeRuleTest(mml, 'début fraction 20 sur 5 fin fraction multiplié par début fraction 1 sur 100 fin fraction égale un-vingt-cinquième', 'default');
  this.executeRuleTest(mml, 'début frac 20 sur 5 fin frac multiplié par début frac 1 sur 100 fin frac égale un-vingt-cinquième', 'brief');
  this.executeRuleTest(mml, 'frac 20 sur 5 fin frac multiplié par frac 1 sur 100 fin frac égale un-vingt-cinquième', 'sbrief');
};


/**
 * Testing Rule 7.4, Example 3.
 */
sre.MathspeakGermanTest.prototype.testSample_7_4_3 = function() {
  var mml = '<mrow><mfrac><mfrac><mn>3</mn><mn>5</mn></mfrac><mn>8</mn>' +
      '</mfrac><mo>=</mo><mfrac><mn>3</mn><mn>5</mn></mfrac><mo>×</mo>' +
      '<mfrac><mn>1</mn><mn>8</mn></mfrac></mrow>';
  this.executeRuleTest(mml, 'début début fraction trois-cinquièmes sur sur 8 fin fin fraction égale trois-cinquièmes multiplié par un-huitième', 'default');
  this.executeRuleTest(mml, 'début début frac trois-cinquièmes sur sur 8 fin fin frac égale trois-cinquièmes multiplié par un-huitième', 'brief');
  this.executeRuleTest(mml, 'frac1imbriquée trois-cinquièmes sur1imbriquée 8 fin frac1imbriquée égale trois-cinquièmes multiplié par un-huitième', 'sbrief');
};


/**
 * Testing Rule 7.5, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_7_5_1 = function() {
  var mml = '<mrow><mn>3</mn><mfrac><mn>5</mn><mn>8</mn></mfrac><mo>=</mo>' +
      '<mfrac><mn>29</mn><mn>8</mn></mfrac></mrow>';
  this.executeRuleTest(mml, '3 et cinq-huitièmes égale début fraction 29 sur 8 fin fraction', 'default');
  this.executeRuleTest(mml, '3 et cinq-huitièmes égale début frac 29 sur 8 fin frac',
                       'brief');
  this.executeRuleTest(mml, '3 et cinq-huitièmes égale frac 29 sur 8 fin frac',
                       'sbrief');
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
  this.executeRuleTest(mml, 'a indice 0 position de base plus fraction continue b indice 1 position de base sur a indice 1 position de base plus début fraction b indice 2 position de base sur a indice 2 position de base plus début fraction b indice 3 position de base sur a indice 3 position de base plus points de suspension égale a indice 0 position de base plus début fraction b indice 1 position de base sur a indice 1 position de base fin fraction plus début fraction b indice 2 position de base sur a indice 2 position de base fin fraction plus points de suspension', 'default');
  this.executeRuleTest(mml, 'a 0 plus frac continue b 1 sur a 1 plus début frac b 2 sur a 2 plus début frac b 3 sur a 3 plus points de suspension égale a 0 plus début frac b 1 sur a 1 fin frac plus début frac b 2 sur a 2 fin frac plus points de suspension', 'brief');
  this.executeRuleTest(mml, 'a 0 plus frac continue b 1 sur a 1 plus frac b 2 sur a 2 plus frac b 3 sur a 3 plus points de suspension égale a 0 plus frac b 1 sur a 1 fin frac plus frac b 2 sur a 2 fin frac plus points de suspension', 'sbrief');
};


/**
 * Testing Rule 8.1, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_8_1_1 = function() {
  var mml = '<mrow><msup><mi>x</mi><mn>3</mn></msup><mo>+</mo><mn>6</mn>' +
      '<msup><mi>x</mi><mn>2</mn></msup><mo>-</mo><mi>x</mi><mo>=</mo>' +
      '<mn>30</mn></mrow>';
  this.executeRuleTest(mml, 'x cubique plus 6 x au carré moins x égale 30', 'default');
  this.executeRuleTest(mml, 'x cubique plus 6 x au carré moins x égale 30', 'brief');
  this.executeRuleTest(mml, 'x cubique plus 6 x au carré moins x égale 30', 'sbrief');
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
  this.executeRuleTest(mml, 'début fraction d au carré y sur d x au carré fin fraction plus parenthèse gauche a x au carré plus b x plus c parenthèse droite y égale 0', 'default');
  this.executeRuleTest(mml, 'début frac d au carré y sur d x au carré fin frac plus parenthèse gauche a x au carré plus b x plus c parenthèse droite y égale 0', 'brief');
  this.executeRuleTest(mml, 'frac d au carré y sur d x au carré fin frac plus parenthèse gauche a x au carré plus b x plus c parenthèse droite y égale 0', 'sbrief');
};


/**
 * Testing Rule 8.2, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_8_2_1 = function() {
  var mml = '<msup><mi>x</mi><mfrac><mn>1</mn><mn>2</mn></mfrac></msup>';
  this.executeRuleTest(mml, 'x exposant un-demi', 'default');
  this.executeRuleTest(mml, 'x sup un-demi',
                       'brief');
  this.executeRuleTest(mml, 'x sup un-demi', 'sbrief');
};


/**
 * Testing Rule 8.2, Example 2.
 */
sre.MathspeakGermanTest.prototype.testSample_8_2_2 = function() {
  var mml = '<msub><mi>x</mi><mi>n</mi></msub>';
  this.executeRuleTest(mml, 'x indice n', 'default');
  this.executeRuleTest(mml, 'x sub n', 'brief');
  this.executeRuleTest(mml, 'x sub n', 'sbrief');
};


/**
 * Testing Rule 8.2, Example 3.
 */
sre.MathspeakGermanTest.prototype.testSample_8_2_3 = function() {
  var mml = '<msup><mi>x</mi><mi>a</mi></msup>';
  this.executeRuleTest(mml, 'x exposant a', 'default');
  this.executeRuleTest(mml, 'x sup a', 'brief');
  this.executeRuleTest(mml, 'x sup a', 'sbrief');
};


/**
 * Testing Rule 8.3, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_8_3_1 = function() {
  var mml = '<msup><mi>x</mi><mrow><mi>m</mi><mo>+</mo><mi>n</mi></mrow>' +
      '</msup>';
  this.executeRuleTest(mml, 'x exposant m plus n', 'default');
  this.executeRuleTest(mml, 'x sup m plus n', 'brief');
  this.executeRuleTest(mml, 'x sup m plus n', 'sbrief');
};


/**
 * Testing Rule 8.3, Example 2.
 */
sre.MathspeakGermanTest.prototype.testSample_8_3_2 = function() {
  var mml = '<mrow><msub><mi>T</mi><mrow><mi>n</mi><mo>-</mo><mn>1</mn>' +
      '</mrow></msub><mo>+</mo><mn>5</mn><mo>=</mo><mn>0</mn></mrow>';
  this.executeRuleTest(mml, 'T majuscule indice n moins 1 position de base plus 5 égale 0', 'default');
  this.executeRuleTest(mml, 'T majuscule sub n moins 1 position de base plus 5 égale 0', 'brief');
  this.executeRuleTest(mml, 'T majuscule sub n moins 1 position de base plus 5 égale 0',
                       'sbrief');
};


/**
 * Testing Rule 8.3, Example 3.
 */
sre.MathspeakGermanTest.prototype.testSample_8_3_3 = function() {
  var mml = '<mrow><msup><mi>x</mi><mrow><mi>m</mi><mo>+</mo><mi>n</mi>' +
      '</mrow></msup><mo>=</mo><msup><mi>x</mi><mi>m</mi></msup><msup>' +
      '<mi>x</mi><mi>n</mi></msup></mrow>';
  this.executeRuleTest(mml, 'x exposant m plus n position de base égale x exposant m position de base x exposant n', 'default');
  this.executeRuleTest(mml, 'x sup m plus n position de base égale x sup m position de base x sup n', 'brief');
  this.executeRuleTest(mml, 'x sup m plus n position de base égale x sup m position de base x sup n', 'sbrief');
};


/**
 * Testing Rule 8.4, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_8_4_1 = function() {
  var mml = '<msup><mi>x</mi><mrow><msub><mi>a</mi><mi>n</mi></msub>' +
      '<mo>+</mo><msub><mi>a</mi><mrow><mi>n</mi><mo>-</mo><mn>1</mn>' +
      '</mrow></msub></mrow></msup>';
  this.executeRuleTest(mml, 'x exposant a sup-indice n sup plus a sup-indice n moins 1', 'default');
  this.executeRuleTest(mml, 'x sup a sup-sub n sup plus a sup-sub n moins 1',
                       'brief');
  this.executeRuleTest(mml, 'x sup a sup-sub n sup plus a sup-sub n moins 1',
                       'sbrief');
};


/**
 * Testing Rule 8.4, Example 2.
 */
sre.MathspeakGermanTest.prototype.testSample_8_4_2 = function() {
  var mml = '<msup><mi>x</mi><msub><mi>a</mi><mi>b</mi></msub></msup>';
  this.executeRuleTest(mml, 'x exposant a sup-indice b', 'default');
  this.executeRuleTest(mml, 'x sup a sup-sub b', 'brief');
  this.executeRuleTest(mml, 'x sup a sup-sub b', 'sbrief');
};


/**
 * Testing Rule 8.4, Example 3.
 */
sre.MathspeakGermanTest.prototype.testSample_8_4_3 = function() {
  var mml = '<msub><mi>x</mi><msup><mi>a</mi><mi>b</mi></msup></msub>';
  this.executeRuleTest(mml, 'x indice a sub-exposant b', 'default');
  this.executeRuleTest(mml, 'x sub a sub-sup b', 'brief');
  this.executeRuleTest(mml, 'x sub a sub-sup b', 'sbrief');
};


/**
 * Testing Rule 8.4, Example 4.
 */
sre.MathspeakGermanTest.prototype.testSample_8_4_4 = function() {
  var mml = '<mrow><msup><mi>y</mi><msup><mi>a</mi><msub><mi>b</mi>' +
      '<mi>c</mi></msub></msup></msup><mo>≠</mo><msup><mi>y</mi><mrow>' +
      '<msup><mi>a</mi><mi>b</mi></msup><mi>c</mi></mrow></msup></mrow>';
  this.executeRuleTest(mml, 'y exposant a sup-exposant b sup-sup-indice c position de base pas égal à y exposant a sup-exposant b sup c',
                       'default');
  this.executeRuleTest(mml, 'y sup a sup-sup b sup-sup-sub c position de base pas égal à y sup a sup-sup b sup c', 'brief');
  this.executeRuleTest(mml, 'y sup a sup-sup b sup-sup-sub c position de base pas égal à y sup a sup-sup b sup c', 'sbrief');
};


/**
 * Testing Rule 8.4, Example 5.
 */
sre.MathspeakGermanTest.prototype.testSample_8_4_5 = function() {
  var mml = '<msup><mi>y</mi><msup><mi>a</mi><mrow><msub><mrow/><mi>c</mi>' +
      '</msub><mi>b</mi></mrow></msup></msup>';
  this.executeRuleTest(mml, 'y exposant a sup-sup-indice c sup-sup b', 'default');
  this.executeRuleTest(mml, 'y sup a sup-sup-sub c sup-sup b', 'brief');
  this.executeRuleTest(mml, 'y sup a sup-sup-sub c sup-sup b', 'sbrief');
};


/**
 * Testing Rule 8.4, Example 5, short.
 */
sre.MathspeakGermanTest.prototype.testSample_8_4_5Short = function() {
  var mml = '<msup><mi>y</mi><msup><mi>a</mi><mrow><msub><mrow/><mi>c</mi>' +
      '</msub></mrow></msup></msup>';
  this.executeRuleTest(mml, 'y exposant a sup-sup-indice c',
                       'default');
  this.executeRuleTest(mml, 'y sup a sup-sup-sub c', 'brief');
  this.executeRuleTest(mml, 'y sup a sup-sup-sub c', 'sbrief');
};


/**
 * Testing Rule 8.4, Example 5, Sup/Sub inversed.
 */
sre.MathspeakGermanTest.prototype.testSample_8_4_5Inv = function() {
  var mml = '<msub><mi>y</mi><msub><mi>a</mi><mrow><msup><mrow/><mi>c</mi>' +
      '</msup></mrow></msub></msub>';
  this.executeRuleTest(mml, 'y indice a sub-sub-exposant c', 'default');
  this.executeRuleTest(mml, 'y sub a sub-sub-sup c', 'brief');
  this.executeRuleTest(mml, 'y sub a sub-sub-sup c', 'sbrief');
};


/**
 * Testing Rule 8.4, Example 5, Sup/Sub inversed, short.
 */
sre.MathspeakGermanTest.prototype.testSample_8_4_5InvShort = function() {
  var mml = '<msub><mi>y</mi><msub><mi>a</mi><mrow><msup><mrow/><mi>c</mi>' +
      '</msup><mi>b</mi></mrow></msub></msub>';
  this.executeRuleTest(mml, 'y indice a sub-sub-exposant c sub-sub b', 'default');
  this.executeRuleTest(mml, 'y sub a sub-sub-sup c sub-sub b', 'brief');
  this.executeRuleTest(mml, 'y sub a sub-sub-sup c sub-sub b', 'sbrief');
};


/**
 * Testing Rule 8.4, Example 6.
 */
sre.MathspeakGermanTest.prototype.testSample_8_4_6 = function() {
  var mml = '<msup><mi>x</mi><msup><mi>a</mi><mi>b</mi></msup></msup>';
  this.executeRuleTest(mml, 'x exposant a sup-exposant b', 'default');
  this.executeRuleTest(mml, 'x sup a sup-sup b', 'brief');
  this.executeRuleTest(mml, 'x sup a sup-sup b', 'sbrief');
};


/**
 * Testing Rule 8.4, Example 7.
 */
sre.MathspeakGermanTest.prototype.testSample_8_4_7 = function() {
  var mml = '<msub><mi>x</mi><msub><mi>a</mi><mi>b</mi></msub></msub>';
  this.executeRuleTest(mml, 'x indice a sub-indice b', 'default');
  this.executeRuleTest(mml, 'x sub a sub-sub b', 'brief');
  this.executeRuleTest(mml, 'x sub a sub-sub b', 'sbrief');
};


/**
 * Testing Rule 8.4, Example 8.
 */
sre.MathspeakGermanTest.prototype.testSample_8_4_8 = function() {
  var mml = '<msup><mi>T</mi><mfenced separators="" open="(" close=")">' +
      '<msup><mi>x</mi><mi>a</mi></msup><mo>+</mo><msup><mi>y</mi>' +
      '<mi>b</mi></msup></mfenced></msup>';
  this.executeRuleTest(mml, 'T majuscule exposant parenthèse gauche x sup-exposant a sup plus y sup-exposant b sup parenthèse droite',
                       'default');
  this.executeRuleTest(mml, 'T majuscule sup parenthèse gauche x sup-sup a sup plus y sup-sup b sup parenthèse droite', 'brief');
  this.executeRuleTest(mml, 'T majuscule sup parenthèse gauche x sup-sup a sup plus y sup-sup b sup parenthèse droite', 'sbrief');
};


/**
 * Testing Rule 8.5, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_8_5_1 = function() {
  var mml = '<msub><mi>x</mi><mn>1</mn></msub>';
  this.executeRuleTest(mml, 'x indice 1', 'default');
  this.executeRuleTest(mml, 'x 1', 'brief');
  this.executeRuleTest(mml, 'x 1', 'sbrief');
};


/**
 * Testing Rule 8.5, Example 2.
 */
sre.MathspeakGermanTest.prototype.testSample_8_5_2 = function() {
  var mml = '<msub><mi>x</mi><mrow><mo>-</mo><mn>1</mn></mrow></msub>';
  this.executeRuleTest(mml, 'x indice négatif 1', 'default');
  this.executeRuleTest(mml, 'x sub négatif 1', 'brief');
  this.executeRuleTest(mml, 'x sub négatif 1', 'sbrief');
};


/**
 * Testing Rule 8.5, Example 3.
 */
sre.MathspeakGermanTest.prototype.testSample_8_5_3 = function() {
  var mml = '<msub><mi>x</mi><mrow><mn>10000</mn></mrow>' +
      '</msub>';
  this.executeRuleTest(mml, 'x indice 10000', 'default');
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
  this.executeRuleTest(mml, 'x indice 1,3', 'default');
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
  this.executeRuleTest(mml, '4 F majuscule e plus 3 O majuscule indice 2 position de base flèche droite 2 F majuscule e indice 2 position de base O majuscule indice 3',
                       'default');
  this.executeRuleTest(mml, '4 F majuscule e plus 3 O majuscule 2 flèche droite 2 F majuscule e 2 O majuscule 3',
                       'brief');
  this.executeRuleTest(mml, '4 F majuscule e plus 3 O majuscule 2 flèche droite 2 F majuscule e 2 O majuscule 3',
                       'sbrief');
};


/**
 * Testing Rule 8.5, Example 6.
 */
sre.MathspeakGermanTest.prototype.testSample_8_5_6 = function() {
  var mml = '<msub><mi>a</mi><mrow><mn>2</mn><mo>,</mo><mn>3</mn></mrow>' +
      '</msub>';
  this.executeRuleTest(mml, 'a indice 2 virgule 3', 'default');
  this.executeRuleTest(mml, 'a sub 2 virgule 3', 'brief');
  this.executeRuleTest(mml, 'a sub 2 virgule 3', 'sbrief');
};


/**
 * Testing Rule 8.5, Example 7.
 */
sre.MathspeakGermanTest.prototype.testSample_8_5_7 = function() {
  var mml = '<msub><mi>T</mi><mrow><msub><mi>n</mi><mn>1</mn></msub>' +
      '<mo>+</mo><msub><mi>n</mi><mn>0</mn></msub></mrow></msub>';
  this.executeRuleTest(mml, 'T majuscule indice n sub-indice 1 sub plus n sub-indice 0', 'default');
  this.executeRuleTest(mml, 'T majuscule sub n 1 plus n 0',
                       'brief');
  this.executeRuleTest(mml, 'T majuscule sub n 1 plus n 0',
                       'sbrief');
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
  this.executeRuleTest(mml, 'log base 2 parenthèse gauche x parenthèse droite égale début fraction log base 10 parenthèse gauche x parenthèse droite sur log base 10 parenthèse gauche 2 parenthèse droite fin fraction', 'default');
  this.executeRuleTest(mml, 'log base 2 parenthèse gauche x parenthèse droite égale début frac log base 10 parenthèse gauche x parenthèse droite sur log base 10 parenthèse gauche 2 parenthèse droite fin frac', 'brief');
  this.executeRuleTest(mml, 'log base 2 parenthèse gauche x parenthèse droite égale frac log base 10 parenthèse gauche x parenthèse droite sur log base 10 parenthèse gauche 2 parenthèse droite fin frac', 'sbrief');
};


/**
 * Testing Rule 8.5, Example 9.
 */
sre.MathspeakGermanTest.prototype.testSample_8_5_9 = function() {
  var mml = '<msub><mi>Φ</mi><mn>5</mn></msub>';
  this.executeRuleTest(mml, 'Phi majuscule indice 5', 'default');
  this.executeRuleTest(mml, 'Phi majuscule 5', 'brief');
  this.executeRuleTest(mml, 'Phi majuscule 5', 'sbrief');
};


/**
 * Testing Rule 8.5, Example 10.  (INTEGRAL! Maybe more tests!)
 */
sre.MathspeakGermanTest.prototype.testSample_8_5_10 = function() {
  var mml = '<mrow><mo form="prefix">ln</mo><mi>x</mi><mo>=</mo><msubsup>' +
      '<mo>∫</mo><mn>1</mn><mi>x</mi></msubsup><mfrac><mrow><mi>d</mi>' +
      '<mi>t</mi></mrow><mi>t</mi></mfrac></mrow>';
  this.executeRuleTest(mml, 'logarithme népérien x égale intégrale indice inférieur 1 indice supérieur x position de base début fraction d t sur t fin fraction', 'default');
  this.executeRuleTest(mml, 'logarithme népérien x égale intégrale inf 1 sup x position de base début frac d t sur t fin frac',
                       'brief');
  this.executeRuleTest(mml, 'logarithme népérien x égale intégrale inf 1 sup x position de base frac d t sur t fin frac', 'sbrief');
};


/**
 * Testing Rule 8.6, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_8_6_1 = function() {
  var mml = '<mrow><mi>$</mi><mi>n</mi><mn>2</mn><mo>=</mo><mn>2</mn>' +
      '<mo>*</mo><mi>$</mi><mi>n</mi><mo>+</mo><mn>1</mn><mo>;</mo></mrow>';
  this.executeRuleTest(mml, 'dollars n position de base 2 égale 2 astérisque dollars n plus 1 point virgule', 'default');
  this.executeRuleTest(mml, 'dollars n base 2 égale 2 astérisque dollars n plus 1 point virgule', 'brief');
  this.executeRuleTest(mml, 'dollars n base 2 égale 2 astérisque dollars n plus 1 point virgule', 'sbrief');
};


/**
 * Testing Rule 8.8, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_8_8_1_naive = function() {
  var mml = '<mmultiscripts><mi>x</mi><mrow><mi>e</mi><mi>f</mi></mrow>' +
      '<mrow><mi>g</mi><mi>h</mi></mrow><mprescripts/><mrow><mi>c</mi>' +
      '<mi>d</mi></mrow><mrow><mi>a</mi><mi>b</mi></mrow></mmultiscripts>';
  this.executeRuleTest(mml, 'indice gauche c d exposant gauche a b position de base x indice e f exposant g h', 'default');
  this.executeRuleTest(mml, 'sub gauche c d sup gauche a b position de base x sub e f sup g h', 'brief');
  this.executeRuleTest(mml, 'sub gauche c d sup gauche a b position de base x sub e f sup g h', 'sbrief');
};


/**
 * Testing Rule 8.8, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_8_8_1 = function() {
  var mml = '<mmultiscripts><mi>x</mi><mi>e</mi>' +
      '<mi>g</mi><mi>f</mi><mi>h</mi><mprescripts/><mi>c</mi>' +
      '<mi>a</mi><mi>d</mi><mi>b</mi></mmultiscripts>';
  this.executeRuleTest(mml, 'indice gauche c d exposant gauche a b position de base x indice e f exposant g h', 'default');
  this.executeRuleTest(mml, 'sub gauche c d sup gauche a b position de base x sub e f sup g h', 'brief');
  this.executeRuleTest(mml, 'sub gauche c d sup gauche a b position de base x sub e f sup g h', 'sbrief');
};


/**
 * Testing tensors Multi scripts.
 */
sre.MathspeakGermanTest.prototype.testSampleTensorMultiSimpleABC = function() {
  var mml = '<mmultiscripts><mi>x</mi><msup><mi>c</mi><mi>l</mi></msup>' +
      '<mprescripts/><mi>a</mi><mi>b</mi></mmultiscripts>';
  this.executeRuleTest(mml, 'indice gauche a exposant gauche b position de base x indice c sub-exposant l', 'default');
  this.executeRuleTest(mml, 'sub gauche a sup gauche b position de base x sub c sub-sup l', 'brief');
  this.executeRuleTest(mml, 'sub gauche a sup gauche b position de base x sub c sub-sup l', 'sbrief');
};


/**
 * Testing tensors Multi scripts.
 */
sre.MathspeakGermanTest.prototype.testSampleTensorMultiSub = function() {
  var mml = '<mmultiscripts><mi>x</mi><msub><mi>c</mi><mi>l</mi></msub>' +
      '<mi>d</mi><mprescripts/><mi>a</mi><mi>b</mi></mmultiscripts>';
  this.executeRuleTest(mml, 'indice gauche a exposant gauche b position de base x indice c sub-indice l exposant d', 'default');
  this.executeRuleTest(mml, 'sub gauche a sup gauche b position de base x sub c sub-sub l sup d', 'brief');
  this.executeRuleTest(mml, 'sub gauche a sup gauche b position de base x sub c sub-sub l sup d', 'sbrief');
};


/**
 * Testing tensors Multi scripts.
 */
sre.MathspeakGermanTest.prototype.testSampleTensorMultiSubSup = function() {
  var mml = '<mmultiscripts><mi>x</mi><msub><mi>c</mi><msup><mi>l</mi>' +
      '<mi>k</mi></msup></msub><mi>d</mi><mi>e</mi><none/>' +
      '<mprescripts/><mi>a</mi><mi>b</mi></mmultiscripts>';
  this.executeRuleTest(mml, 'indice gauche a exposant gauche b position de base x indice c sub-indice l sub-sub-exposant k sub e exposant d', 'default');
  this.executeRuleTest(mml, 'sub gauche a sup gauche b position de base x sub c sub-sub l sub-sub-sup k sub e sup d', 'brief');
  this.executeRuleTest(mml, 'sub gauche a sup gauche b position de base x sub c sub-sub l sub-sub-sup k sub e sup d', 'sbrief');
};


/**
 * Testing tensors Multi scripts.
 */
sre.MathspeakGermanTest.prototype.testSampleTensorMultiSimple = function() {
  var mml = '<mmultiscripts><mi>x</mi><msup><mi>c</mi><mi>l</mi></msup>' +
      '<mi>d</mi><mprescripts/><mi>a</mi><mi>b</mi></mmultiscripts>';
  this.executeRuleTest(mml, 'indice gauche a exposant gauche b position de base x indice c sub-exposant l exposant d',
                       'default');
  this.executeRuleTest(mml, 'sub gauche a sup gauche b position de base x sub c sub-sup l sup d', 'brief');
  this.executeRuleTest(mml, 'sub gauche a sup gauche b position de base x sub c sub-sup l sup d', 'sbrief');
};


/**
 * Testing tensors Multi scripts.
 */
sre.MathspeakGermanTest.prototype.testSampleTensorMultiComplex = function() {
  var mml = '<mmultiscripts><mi>x</mi><mrow><mi>c</mi><msup><mi>k</mi>' +
      '<mi>l</mi></msup></mrow><mi>d</mi>' +
      '<mprescripts/><mi>a</mi><mi>b</mi></mmultiscripts>';
  this.executeRuleTest(mml, 'indice gauche a exposant gauche b position de base x indice c k sub-exposant l exposant d',
                       'default');
  this.executeRuleTest(mml, 'sub gauche a sup gauche b position de base x sub c k sub-sup l sup d', 'brief');
  this.executeRuleTest(mml, 'sub gauche a sup gauche b position de base x sub c k sub-sup l sup d', 'sbrief');
};


/**
 * Testing tensors ABCD.
 */
sre.MathspeakGermanTest.prototype.testSampleTwoTensors = function() {
  var mml = '<mmultiscripts><mi>x</mi><mi>c</mi><mi>d</mi>' +
      '<mprescripts/><mi>a</mi><mi>b</mi></mmultiscripts>' +
      '<mmultiscripts><mi>x</mi><mi>c</mi><mi>d</mi>' +
      '<mprescripts/><mi>a</mi><mi>b</mi></mmultiscripts>';
  this.executeRuleTest(mml, 'indice gauche a exposant gauche b position de base x indice c exposant d position de base indice gauche a exposant gauche b position de base x indice c exposant d',
                       'default');
  this.executeRuleTest(mml, 'sub gauche a sup gauche b position de base x sub c sup d position de base sub gauche a sup gauche b position de base x sub c sup d', 'brief');
  this.executeRuleTest(mml, 'sub gauche a sup gauche b position de base x sub c sup d position de base sub gauche a sup gauche b position de base x sub c sup d', 'sbrief');
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
  this.executeRuleTest(mml, 'indice gauche a exposant gauche b position de base x indice c exposant d', 'default');
  this.executeRuleTest(mml, 'sub gauche a sup gauche b position de base x sub c sup d', 'brief');
  this.executeRuleTest(mml, 'sub gauche a sup gauche b position de base x sub c sup d', 'sbrief');
};


/**
 * Testing tensors ABC.
 */
sre.MathspeakGermanTest.prototype.testSamplePartialTensorABC = function() {
  var mml = '<mmultiscripts><mi>x</mi><mi>c</mi>' +
      '<mprescripts/><mi>a</mi><mi>b</mi></mmultiscripts>';
  this.executeRuleTest(mml, 'indice gauche a exposant gauche b position de base x indice c', 'default');
  this.executeRuleTest(mml, 'sub gauche a sup gauche b position de base x sub c', 'brief');
  this.executeRuleTest(mml, 'sub gauche a sup gauche b position de base x sub c', 'sbrief');
};


/**
 * Testing tensors ABD.
 */
sre.MathspeakGermanTest.prototype.testSamplePartialTensorABD = function() {
  var mml = '<mmultiscripts><mi>x</mi><none/><mi>d</mi>' +
      '<mprescripts/><mi>a</mi><mi>b</mi></mmultiscripts>';
  this.executeRuleTest(mml, 'indice gauche a exposant gauche b position de base x exposant d', 'default');
  this.executeRuleTest(mml, 'sub gauche a sup gauche b position de base x sup d', 'brief');
  this.executeRuleTest(mml, 'sub gauche a sup gauche b position de base x sup d', 'sbrief');
};


/**
 * Testing tensors AB.
 */
sre.MathspeakGermanTest.prototype.testSamplePartialTensorAB = function() {
  var mml = '<mmultiscripts><mi>x</mi>' +
      '<mprescripts/><mi>a</mi><mi>b</mi></mmultiscripts>';
  this.executeRuleTest(mml, 'indice gauche a exposant gauche b position de base x',
                       'default');
  this.executeRuleTest(mml, 'sub gauche a sup gauche b position de base x', 'brief');
  this.executeRuleTest(mml, 'sub gauche a sup gauche b position de base x', 'sbrief');
};


/**
 * Testing tensors ABCR.
 */
sre.MathspeakGermanTest.prototype.testSamplePartialTensorABCR = function() {
  var mml = '<mmultiscripts><mi>x</mi><mi>c</mi>' +
      '<mprescripts/><mi>a</mi><mi>b</mi></mmultiscripts><mi>r</mi>';
  this.executeRuleTest(mml, 'indice gauche a exposant gauche b position de base x indice c position de base r', 'default');
  this.executeRuleTest(mml, 'sub gauche a sup gauche b position de base x sub c position de base r', 'brief');
  this.executeRuleTest(mml, 'sub gauche a sup gauche b position de base x sub c position de base r', 'sbrief');
};


/**
 * Testing tensors ABCDR.
 */
sre.MathspeakGermanTest.prototype.testSamplePartialTensorABCDR = function() {
  var mml = '<mmultiscripts><mi>x</mi><mi>c</mi><mi>d</mi>' +
      '<mprescripts/><mi>a</mi><mi>b</mi></mmultiscripts><mi>r</mi>';
  this.executeRuleTest(mml, 'indice gauche a exposant gauche b position de base x indice c exposant d position de base r', 'default');
  this.executeRuleTest(mml, 'sub gauche a sup gauche b position de base x sub c sup d position de base r', 'brief');
  this.executeRuleTest(mml, 'sub gauche a sup gauche b position de base x sub c sup d position de base r', 'sbrief');
};


/**
 * Testing tensors Root of ABCD.
 */
sre.MathspeakGermanTest.prototype.testSamplePartialTensorABCDRoot =
    function() {
  var mml = '<msqrt><mmultiscripts><mi>x</mi><mi>c</mi><mi>d</mi>' +
      '<mprescripts/><mi>a</mi><mi>b</mi></mmultiscripts></msqrt>';
  this.executeRuleTest(mml, 'début racine carrée indice gauche a exposant gauche b position de base x indice c exposant d position de base fin racine carrée', 'default');
  this.executeRuleTest(mml, 'début racine carrée sub gauche a sup gauche b position de base x sub c sup d position de base fin racine carrée', 'brief');
  this.executeRuleTest(mml, 'racine carrée sub gauche a sup gauche b position de base x sub c sup d position de base fin racine carrée', 'sbrief');
};


/**
 * Testing tensors Root ABCD . R.
 */
sre.MathspeakGermanTest.prototype.testSamplePartialTensorABCDRootR =
    function() {
  var mml = '<msqrt><mmultiscripts><mi>x</mi><mi>c</mi><mi>d</mi>' +
      '<mprescripts/><mi>a</mi><mi>b</mi></mmultiscripts></msqrt><mi>r</mi>';
  this.executeRuleTest(mml, 'début racine carrée indice gauche a exposant gauche b position de base x indice c exposant d position de base fin racine carrée r', 'default');
  this.executeRuleTest(mml, 'début racine carrée sub gauche a sup gauche b position de base x sub c sup d position de base fin racine carrée r', 'brief');
  this.executeRuleTest(mml, 'racine carrée sub gauche a sup gauche b position de base x sub c sup d position de base fin racine carrée r', 'sbrief');
};


/**
 * Testing tensors Frac of ABCD.
 */
sre.MathspeakGermanTest.prototype.testSamplePartialTensorABCDFrac =
    function() {
  var mml = '<mfrac><mn>1</mn><mmultiscripts><mi>x</mi><mi>c</mi><mi>d</mi>' +
      '<mprescripts/><mi>a</mi><mi>b</mi></mmultiscripts></mfrac>';
  this.executeRuleTest(mml, 'début fraction 1 sur indice gauche a exposant gauche b position de base x indice c exposant d position de base fin fraction', 'default');
  this.executeRuleTest(mml, 'début frac 1 sur sub gauche a sup gauche b position de base x sub c sup d position de base fin frac', 'brief');
  this.executeRuleTest(mml, 'frac 1 sur sub gauche a sup gauche b position de base x sub c sup d position de base fin frac',
      'sbrief');
};


/**
 * Testing tensors Frac ABCD . R.
 */
sre.MathspeakGermanTest.prototype.testSamplePartialTensorABCDFracR =
    function() {
  var mml = '<mfrac><mn>1</mn><mmultiscripts><mi>x</mi><mi>c</mi><mi>d</mi>' +
      '<mprescripts/><mi>a</mi><mi>b</mi></mmultiscripts></mfrac><mi>r</mi>';
  this.executeRuleTest(mml, 'début fraction 1 sur indice gauche a exposant gauche b position de base x indice c exposant d position de base fin fraction r', 'default');
  this.executeRuleTest(mml, 'début frac 1 sur sub gauche a sup gauche b position de base x sub c sup d position de base fin frac r', 'brief');
  this.executeRuleTest(mml, 'frac 1 sur sub gauche a sup gauche b position de base x sub c sup d position de base fin frac r',
      'sbrief');
};


/**
 * Testing Rule additional examples for simple subscripts with square.
 */
sre.MathspeakGermanTest.prototype.testSampleSimpleSquare = function() {
  var mml = '<msubsup><mi>T</mi><mn>0</mn><mn>2</mn></msubsup>';
  this.executeRuleTest(mml, 'T majuscule indice 0 au carré', 'default');
  mml = '<msup><msub><mi>T</mi><mn>0</mn></msub><mn>2</mn></msup>';
  this.executeRuleTest(mml, 'T majuscule indice 0 position de base au carré',
                       'default');
  this.executeRuleTest(mml, 'T majuscule 0 au carré', 'brief');
  this.executeRuleTest(mml, 'T majuscule 0 au carré', 'sbrief');
};


/**
 * Testing Rule additional examples for simple subscripts with cube.
 */
sre.MathspeakGermanTest.prototype.testSampleSimpleCube = function() {
  var mml = '<msubsup><mi>T</mi><mn>0</mn><mn>3</mn></msubsup>';
  this.executeRuleTest(mml, 'T majuscule indice 0 cubique', 'default');
  mml = '<msup><msub><mi>T</mi><mn>0</mn></msub><mn>3</mn></msup>';
  this.executeRuleTest(mml, 'T majuscule indice 0 position de base cubique',
                       'default');
  this.executeRuleTest(mml, 'T majuscule 0 cubique', 'brief');
  this.executeRuleTest(mml, 'T majuscule 0 cubique', 'sbrief');
};


/**
 * Testing Rule 8.8, Example 2.
 */
sre.MathspeakGermanTest.prototype.testSample_8_8_2 = function() {
  var mml = '<msubsup><mi>T</mi><mrow><mi>n</mi><mo>-</mo><mn>1</mn></mrow>' +
      '<mn>2</mn></msubsup>';
  this.executeRuleTest(mml, 'T majuscule indice n moins 1 exposant 2',
                       'default');
  this.executeRuleTest(mml, 'T majuscule sub n moins 1 sup 2', 'brief');
  this.executeRuleTest(mml, 'T majuscule sub n moins 1 sup 2', 'sbrief');
};


/**
 * Testing Rule 8.9, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_8_9_1 = function() {
  var mml = '<msup><mi>x</mi><mo>\'</mo></msup>';
  this.executeRuleTest(mml, 'x prime', 'default');
  this.executeRuleTest(mml, 'x prime', 'brief');
  this.executeRuleTest(mml, 'x prime', 'sbrief');
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
  this.executeRuleTest(mml, 'f triple prime parenthèse gauche y parenthèse droite égale début fraction d f double prime parenthèse gauche y parenthèse droite sur d y fin fraction', 'default');
  this.executeRuleTest(mml, 'f triple prime parenthèse gauche y parenthèse droite égale début frac d f double prime parenthèse gauche y parenthèse droite sur d y fin frac', 'brief');
  this.executeRuleTest(mml, 'f triple prime parenthèse gauche y parenthèse droite égale frac d f double prime parenthèse gauche y parenthèse droite sur d y fin frac', 'sbrief');
};


/**
 * Testing Rule 8.10, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_8_10_1 = function() {
  var mml = '<mrow><msup><mi>ρ</mi><mo>\'</mo></msup><mo>=</mo><msubsup>' +
      '<mi>ρ</mi><mo>+</mo><mo>\'</mo></msubsup><mo>+</mo><msubsup>' +
      '<mi>ρ</mi><mo>-</mo><mo>\'</mo></msubsup></mrow>';
  this.executeRuleTest(mml, 'rhô prime égale rhô prime indice plus position de base plus rhô prime indice moins', 'default');
  this.executeRuleTest(mml, 'rhô prime égale rhô prime sub plus position de base plus rhô prime sub moins', 'brief');
  this.executeRuleTest(mml, 'rhô prime égale rhô prime sub plus position de base plus rhô prime sub moins', 'sbrief');
};


/**
 * Testing Rule 8.10, Example 2.
 */
sre.MathspeakGermanTest.prototype.testSample_8_10_2 = function() {
  var mml = '<msubsup><mi>x</mi><mn>10</mn><mo>\'</mo></msubsup>';
  this.executeRuleTest(mml, 'x prime indice 10', 'default');
  this.executeRuleTest(mml, 'x prime 10', 'brief');
  this.executeRuleTest(mml, 'x prime 10', 'sbrief');
};


/**
 * Testing Rule 8.10, Example 3.
 */
sre.MathspeakGermanTest.prototype.testSample_8_10_3 = function() {
  var mml = '<msubsup><mi>T</mi><mi>n</mi><mo>\'</mo></msubsup>';
  this.executeRuleTest(mml, 'T majuscule prime indice n', 'default');
  this.executeRuleTest(mml, 'T majuscule prime sub n', 'brief');
  this.executeRuleTest(mml, 'T majuscule prime sub n', 'sbrief');
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
  this.executeRuleTest(mml, 'début matrice 2 par 3 1re rangée 1re colonne x exposant n 2e colonne y exposant n 3e colonne z exposant n 2e rangée 1re colonne x exposant n plus 1 2e colonne y exposant n plus 1 3e colonne z exposant n plus 1 fin matrice',
                       'default');
  this.executeRuleTest(mml, 'début matrice 2 par 3 1re rangée 1re colonne x sup n 2e colonne y sup n 3e colonne z sup n 2e rangée 1re colonne x sup n plus 1 2e colonne y sup n plus 1 3e colonne z sup n plus 1 fin matrice', 'brief');
  this.executeRuleTest(mml, 'matrice 2 par 3 1re rangée 1re colonne x sup n 2e colonne y sup n 3e colonne z sup n 2e rangée 1re colonne x sup n plus 1 2e colonne y sup n plus 1 3e colonne z sup n plus 1 fin matrice', 'sbrief');
};


/**
 * Testing Rule 8.12, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_8_12_1 = function() {
  var mml = '<msup><mrow><msub><mi>x</mi><mi>a</mi></msub></mrow><mi>b</mi>' +
      '</msup>';
  this.executeRuleTest(mml, 'x indice a position de base exposant b',
                       'default');
  this.executeRuleTest(mml, 'x sub a position de base sup b', 'brief');
  this.executeRuleTest(mml, 'x sub a position de base sup b', 'sbrief');
};


/**
 * Testing Rule 8.12, Example 2.
 */
sre.MathspeakGermanTest.prototype.testSample_8_12_2 = function() {
  var mml = '<msub><mrow><msup><mi>x</mi><mi>b</mi></msup></mrow><mi>a</mi>' +
      '</msub>';
  this.executeRuleTest(mml, 'x exposant b position de base indice a',
                       'default');
  this.executeRuleTest(mml, 'x sup b position de base sub a', 'brief');
  this.executeRuleTest(mml, 'x sup b position de base sub a', 'sbrief');
};


/**
 * Testing Rule 8.13, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_8_13_1 = function() {
  var mml = '<mrow><msup><mo form="prefix">log</mo><mn>4</mn></msup><mmultiscripts>' +
      '<mi>x</mi><mprescripts/><none/><mi>b</mi></mmultiscripts></mrow>';
  this.executeRuleTest(mml, 'log exposant 4 position de base exposant gauche b position de base x', 'default');
  this.executeRuleTest(mml, 'log sup 4 position de base sup gauche b position de base x', 'brief');
  this.executeRuleTest(mml, 'log sup 4 position de base sup gauche b position de base x', 'sbrief');
};


/**
 * Testing Rule 8.13, Example 2.
 */
sre.MathspeakGermanTest.prototype.testSample_8_13_2 = function() {
  var mml = '<mrow><msub><mi>T</mi><mi>n</mi></msub><mmultiscripts><mi>y</mi>' +
      '<mprescripts/><mi>a</mi></mmultiscripts></mrow>';
  this.executeRuleTest(mml, 'T majuscule indice n position de base indice gauche a position de base y', 'default');
  this.executeRuleTest(mml, 'T majuscule sub n position de base sub gauche a position de base y', 'brief');
  this.executeRuleTest(mml, 'T majuscule sub n position de base sub gauche a position de base y', 'sbrief');
};


/**
 * Testing Rule 9.1, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_9_1_1 = function() {
  var mml = '<msqrt><mn>2</mn></msqrt>';
  this.executeRuleTest(mml, 'début racine carrée 2 fin racine carrée', 'default');
  this.executeRuleTest(mml, 'début racine carrée 2 fin racine carrée', 'brief');
  this.executeRuleTest(mml, 'racine carrée 2 fin racine carrée',
                       'sbrief');
};


// TODO: Get rid of indices for roots <= 10.
// TODO: Check out blackboard R.
/**
 * Testing Rule 9.1, Example 2.
 */
sre.MathspeakGermanTest.prototype.testSample_9_1_2 = function() {
  var mml = '<msqrt><mrow><mi>m</mi><mo>+</mo><mi>n</mi></mrow></msqrt>';
  this.executeRuleTest(mml, 'début racine carrée m plus n fin racine carrée', 'default');
  this.executeRuleTest(mml, 'début racine carrée m plus n fin racine carrée', 'brief');
  this.executeRuleTest(mml, 'racine carrée m plus n fin racine carrée',
                       'sbrief');
};


/**
 * Testing Rule 9.2, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_9_2_1 = function() {
  var mml = '<mroot><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mrow>' +
      '<mi>m</mi><mo>+</mo><mi>n</mi></mrow></mroot>';
  this.executeRuleTest(mml, 'indice du radical m plus n début racine x plus y fin racine', 'default');
  this.executeRuleTest(mml, 'indice du radical m plus n début racine x plus y fin racine', 'brief');
  this.executeRuleTest(mml, 'indice m plus n racine x plus y fin racine', 'sbrief');
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
  this.executeRuleTest(mml, 'indice du radical n début racine x exposant m position de base fin racine égale parenthèse gauche indice du radical n début racine x fin racine parenthèse droite exposant m position de base égale x exposant début fraction m sur n fin fraction position de base virgule x supérieur à 0', 'default');
  this.executeRuleTest(mml, 'indice du radical n début racine x sup m position de base fin racine égale parenthèse gauche indice du radical n début racine x fin racine parenthèse droite sup m position de base égale x sup début frac m sur n fin frac position de base virgule x supérieur à 0', 'brief');
  this.executeRuleTest(mml, 'indice n racine x sup m position de base fin racine égale parenthèse gauche indice n racine x fin racine parenthèse droite sup m position de base égale x sup frac m sur n fin frac position de base virgule x supérieur à 0', 'sbrief');
};


/**
 * Testing Rule 9.2, Example 3.
 */
sre.MathspeakGermanTest.prototype.testSample_9_2_3 = function() {
  var mml = '<mrow><mroot><mi>x</mi><mn>3</mn></mroot><mo>=</mo><msup>' +
      '<mi>x</mi><mfrac><mn>1</mn><mn>3</mn></mfrac></msup></mrow>';
  this.executeRuleTest(mml, 'début racine cubique x fin racine cubique égale x exposant un-tiers', 'default');
  this.executeRuleTest(mml, 'début racine cubique x fin racine cubique égale x sup un-tiers', 'brief');
  this.executeRuleTest(mml, 'racine cubique x fin racine cubique égale x sup un-tiers', 'sbrief');
};


/**
 * Testing Rule 9.3, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_9_3_1 = function() {
  var mml = '<msqrt><mrow><msqrt><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow>' +
      '</msqrt><mo>+</mo><msqrt><mrow><mi>y</mi><mo>+</mo><mn>1</mn>' +
      '</mrow></msqrt></mrow></msqrt>';
  this.executeRuleTest(mml, 'début racine carrée imbriquée début racine carrée x plus 1 fin racine carrée plus début racine carrée y plus 1 fin racine carrée fin racine carrée imbriquée', 'default');
  this.executeRuleTest(mml, 'début racine carrée imbriquée début racine carrée x plus 1 fin racine carrée plus début racine carrée y plus 1 fin racine carrée fin racine carrée imbriquée', 'brief');
  this.executeRuleTest(mml, 'racine carrée imbriquée racine carrée x plus 1 fin racine carrée plus racine carrée y plus 1 fin racine carrée fin racine carrée imbriquée', 'sbrief');
};


/**
 * Testing Rule 9.3, Example 2.
 */
sre.MathspeakGermanTest.prototype.testSample_9_3_2 = function() {
  var mml = '<mrow><mroot><mroot><mi>x</mi><mi>m</mi></mroot><mi>n</mi>' +
      '</mroot><mo>=</mo><mroot><mroot><mi>x</mi><mi>n</mi></mroot>' +
      '<mi>m</mi></mroot></mrow>';
  this.executeRuleTest(mml, 'indice du radical imbriquée n début racine imbriquée indice du radical m début racine x fin racine fin racine imbriquée égale indice du radical imbriquée m début racine imbriquée indice du radical n début racine x fin racine fin racine imbriquée',
                       'default');
  this.executeRuleTest(mml, 'indice du radical imbriquée n début racine imbriquée indice du radical m début racine x fin racine fin racine imbriquée égale indice du radical imbriquée m début racine imbriquée indice du radical n début racine x fin racine fin racine imbriquée',
                       'brief');
  this.executeRuleTest(mml, 'indice imbriquée n racine imbriquée indice m racine x fin racine fin racine imbriquée égale indice imbriquée m racine imbriquée indice n racine x fin racine fin racine imbriquée', 'sbrief');
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
  this.executeRuleTest(mml, 'x exposant e moins 2 position de base égale début racine carrée imbriquée x début racine cubique imbriquée x indice du radical imbriquée 4 début racine imbriquée x indice du radical 5 début racine x points de suspension fin racine fin racine imbriquée fin racine cubique imbriquée fin racine carrée imbriquée virgule x appartient à R majuscule ajouré',
                       'default');
  this.executeRuleTest(mml, 'x sup e moins 2 position de base égale début racine carrée imbriquée x début racine cubique imbriquée x indice du radical imbriquée 4 début racine imbriquée x indice du radical 5 début racine x points de suspension fin racine fin racine imbriquée fin racine cubique imbriquée fin racine carrée imbriquée virgule x appartient à R majuscule ajouré', 'brief');
  this.executeRuleTest(mml, 'x sup e moins 2 position de base égale racine carrée imbriquée x racine cubique imbriquée x indice imbriquée 4 racine imbriquée x indice 5 racine x points de suspension fin racine fin racine imbriquée fin racine cubique imbriquée fin racine carrée imbriquée virgule x appartient à R majuscule ajouré', 'sbrief');
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
  this.executeRuleTest(mml, 'début fraction 2 sur pi fin fraction égale début fraction début racine carrée 2 fin racine carrée sur 2 fin fraction début fraction début racine carrée imbriquée 2 plus début racine carrée 2 fin racine carrée fin racine carrée imbriquée sur 2 fin fraction début fraction début racine carrée imbriquée 2 plus début racine carrée imbriquée 2 plus début racine carrée 2 fin racine carrée fin racine carrée imbriquée fin racine carrée imbriquée sur 2 fin fraction points de suspension', 'default');
  this.executeRuleTest(mml, 'début frac 2 sur pi fin frac égale début frac début racine carrée 2 fin racine carrée sur 2 fin frac début frac début racine carrée imbriquée 2 plus début racine carrée 2 fin racine carrée fin racine carrée imbriquée sur 2 fin frac début frac début racine carrée imbriquée 2 plus début racine carrée imbriquée 2 plus début racine carrée 2 fin racine carrée fin racine carrée imbriquée fin racine carrée imbriquée sur 2 fin frac points de suspension', 'brief');
  this.executeRuleTest(mml, 'frac 2 sur pi fin frac égale frac racine carrée 2 fin racine carrée sur 2 fin frac frac racine carrée imbriquée 2 plus racine carrée 2 fin racine carrée fin racine carrée imbriquée sur 2 fin frac frac racine carrée imbriquée 2 plus racine carrée imbriquée 2 plus racine carrée 2 fin racine carrée fin racine carrée imbriquée fin racine carrée imbriquée sur 2 fin frac points de suspension', 'sbrief');
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
  this.executeRuleTest(mml, 'début fraction 5 x début biffé y fin biffé sur 2 début biffé y fin biffé fin fraction égale cinq-demis x', 'default');
  this.executeRuleTest(mml, 'début frac 5 x début biffé y fin biffé sur 2 début biffé y fin biffé fin frac égale cinq-demis x',
                       'brief');
  this.executeRuleTest(mml, 'frac 5 x début biffé y fin biffé sur 2 début biffé y fin biffé fin frac égale cinq-demis x', 'sbrief');
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
  this.executeRuleTest(mml, 'début fraction 12 sur 18 fin fraction égale début fraction début biffé 12 avec 2 fin biffé sur début biffé 18 avec 3 fin biffé fin fraction égale deux-tiers', 'default');
  this.executeRuleTest(mml, 'début frac 12 sur 18 fin frac égale début frac début biffé 12 avec 2 fin biffé sur début biffé 18 avec 3 fin biffé fin frac égale deux-tiers',
                       'brief');
  this.executeRuleTest(mml, 'frac 12 sur 18 fin frac égale frac début biffé 12 avec 2 fin biffé sur début biffé 18 avec 3 fin biffé fin frac égale deux-tiers', 'sbrief');
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
  this.executeRuleTest(mml, 'début fraction 12 sur 18 fin fraction égale début fraction début biffé 12 avec 2 fin biffé sur début biffé 18 avec 3 fin biffé fin fraction égale deux-tiers', 'default');
  this.executeRuleTest(mml, 'début frac 12 sur 18 fin frac égale début frac début biffé 12 avec 2 fin biffé sur début biffé 18 avec 3 fin biffé fin frac égale deux-tiers',
                       'brief');
  this.executeRuleTest(mml, 'frac 12 sur 18 fin frac égale frac début biffé 12 avec 2 fin biffé sur début biffé 18 avec 3 fin biffé fin frac égale deux-tiers', 'sbrief');
};


/**
 * Testing Rule 11.1, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_11_1_1 = function() {
  var mml = '<mover accent="true"><mi>x</mi><mo>¨</mo></mover>';
  this.executeRuleTest(mml, 'suscrire x avec tréma', 'default');
  this.executeRuleTest(mml, 'suscrire x avec tréma', 'brief');
  this.executeRuleTest(mml, 'suscrire x avec tréma', 'sbrief');
};


/**
 * Testing Rule 11.1, Example 2.
 */
sre.MathspeakGermanTest.prototype.testSample_11_1_2 = function() {
  var mml = '<mover accent="true"><mrow><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '</mrow><mo>→</mo></mover>';
  this.executeRuleTest(mml, 'suscrire x plus y avec flèche droite', 'default');
  this.executeRuleTest(mml, 'suscrire x plus y avec flèche droite', 'brief');
  this.executeRuleTest(mml, 'suscrire x plus y avec flèche droite',
                       'sbrief');
};


/**
 * Testing Rule 11.1, Example 3.
 */
sre.MathspeakGermanTest.prototype.testSample_11_1_3 = function() {
  var mml = '<mover accent="true"><mi>x</mi><mo>^</mo></mover>';
  this.executeRuleTest(mml, 'suscrire x avec circonflexe',
                       'default');
  this.executeRuleTest(mml, 'suscrire x avec circonflexe', 'brief');
  this.executeRuleTest(mml, 'suscrire x avec circonflexe', 'sbrief');
};


/**
 * Testing Rule 11.2, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_11_2_1 = function() {
  var mml = '<munder accent="true"><mi>x</mi><mi>˙</mi></munder>';
  this.executeRuleTest(mml, 'souscrire x avec point en chef',
                       'default');
  this.executeRuleTest(mml, 'souscrire x avec point en chef',
                       'brief');
  this.executeRuleTest(mml, 'souscrire x avec point en chef',
                       'sbrief');
};


/**
 * Testing Rule 11.3, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_11_3_1 = function() {
  var mml = '<mover accent="true"><mi>x</mi><mo>˜</mo></mover>';
  this.executeRuleTest(mml, 'suscrire x avec tilde', 'default');
  this.executeRuleTest(mml, 'suscrire x avec tilde', 'brief');
  this.executeRuleTest(mml, 'suscrire x avec tilde', 'sbrief');
};


/**
 * Testing Rule 11.3, Example 2.
 */
sre.MathspeakGermanTest.prototype.testSample_11_3_2 = function() {
  var mml = '<mover accent="true"><mi>x</mi><mo>¯</mo></mover>';
  this.executeRuleTest(mml, 'suscrire x avec macron', 'default');
  this.executeRuleTest(mml, 'suscrire x avec macron', 'brief');
  this.executeRuleTest(mml, 'suscrire x avec macron', 'sbrief');
};


/**
 * Testing Rule 11.3, Example 3.
 */
sre.MathspeakGermanTest.prototype.testSample_11_3_3 = function() {
  var mml = '<munder accentunder="true"><mi>y</mi><mo>˜</mo></munder>';
  this.executeRuleTest(mml, 'souscrire y avec tilde', 'default');
  this.executeRuleTest(mml, 'souscrire y avec tilde', 'brief');
  this.executeRuleTest(mml, 'souscrire y avec tilde', 'sbrief');
};


/**
 * Testing Rule 11.4, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_11_4_1 = function() {
  var mml = '<mover accent="true"><mover accent="true"><mi>x</mi><mo>¯</mo>' +
      '</mover><mo>¯</mo></mover>';
  this.executeRuleTest(mml, 'sus-suscrire suscrire x avec macron avec macron', 'default');
  this.executeRuleTest(mml, 'sus-suscrire suscrire x avec macron avec macron', 'brief');
  this.executeRuleTest(mml, 'sus-suscrire suscrire x avec macron avec macron', 'sbrief');
};


/**
 * Testing Rule 11.4, Example 2.
 */
sre.MathspeakGermanTest.prototype.testSample_11_4_2 = function() {
  var mml = '<munder><munder><mover accent="true"><mover accent="true">' +
      '<mi>y</mi><mo>¯</mo></mover><mo>¯</mo></mover>' +
      '<mo>\u005F</mo></munder><mo>\u005F</mo></munder>';
  this.executeRuleTest(mml, 'sous-souscrire souscrire sus-suscrire suscrire y avec macron avec macron avec tiret bas avec tiret bas', 'default');
  this.executeRuleTest(mml, 'sous-souscrire souscrire sus-suscrire suscrire y avec macron avec macron avec tiret bas avec tiret bas', 'brief');
  this.executeRuleTest(mml, 'sous-souscrire souscrire sus-suscrire suscrire y avec macron avec macron avec tiret bas avec tiret bas', 'sbrief');
};


/**
 * Testing Rule 11.6, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_11_6_1 = function() {
  var mml = '<munder accentunder="true"><munder><mrow><mi>a</mi><mo>+</mo>' +
      '<mi>b</mi></mrow><mo>\u005F</mo></munder><mo>*</mo></munder>';
  this.executeRuleTest(mml, 'sous-souscrire souscrire a plus b avec tiret bas avec astérisque', 'default');
  this.executeRuleTest(mml, 'sous-souscrire souscrire a plus b avec tiret bas avec astérisque', 'brief');
  this.executeRuleTest(mml, 'sous-souscrire souscrire a plus b avec tiret bas avec astérisque', 'sbrief');
};


/**
 * Testing Rule 11.6, Example 3.
 */
sre.MathspeakGermanTest.prototype.testSample_11_6_3 = function() {
  var mml = '<mover><mover accent="true"><mrow><mi>x</mi><mo>+</mo>' +
      '<mi>y</mi></mrow><mo>˜</mo></mover><mo>¯</mo></mover>';
  this.executeRuleTest(mml, 'sus-suscrire suscrire x plus y avec tilde avec macron', 'default');
  this.executeRuleTest(mml, 'sus-suscrire suscrire x plus y avec tilde avec macron', 'brief');
  this.executeRuleTest(mml, 'sus-suscrire suscrire x plus y avec tilde avec macron', 'sbrief');
};


/**
 * Testing Rule 11.7, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_11_7_1 = function() {
  var mml = '<mrow><munderover><mo>∑</mo><mrow><mi>n</mi><mo>=</mo>' +
      '<mn>1</mn></mrow><mi>∞</mi></munderover><msub><mi>a</mi><mi>n</mi>' +
      '</msub></mrow>';
  this.executeRuleTest(mml, 'sommation début souscript n égale 1 début suscript infini fin scripts a indice n', 'default');
  this.executeRuleTest(mml, 'sommation début souscript n égale 1 début suscript infini fin scripts a sub n', 'brief');
  this.executeRuleTest(mml, 'sommation début souscript n égale 1 début suscript infini fin scripts a sub n', 'sbrief');
};


/**
 * Testing Rule 11.8, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_11_8_1 = function() {
  var mml = '<mrow><munder><munder><munder><mrow><mi>x</mi><mo>+</mo>' +
      '<mi>y</mi></mrow> <mo>\u005F</mo></munder><mrow><mi>a</mi>' +
      '<mo>=</mo><mn>5</mn></mrow></munder><mrow><mi>b</mi><mo>=</mo>' +
      '<mn>3</mn></mrow></munder></mrow>';
  this.executeRuleTest(mml, 'souscrire x plus y avec tiret bas début souscript a égale 5 début soussouscript b égale 3 fin scripts', 'default');
  this.executeRuleTest(mml, 'souscrire x plus y avec tiret bas début souscript a égale 5 début soussouscript b égale 3 fin scripts', 'brief');
  this.executeRuleTest(mml, 'souscrire x plus y avec tiret bas début souscript a égale 5 début soussouscript b égale 3 fin scripts', 'sbrief');
};


/**
 * Testing Rule 11.8, Example 2.
 */
sre.MathspeakGermanTest.prototype.testSample_11_8_2 = function() {
  var mml = '<mrow><mover><mover><mover><mrow><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '</mrow><mo>¯</mo></mover><mrow><mi>n</mi><mo>=</mo><mn>1</mn></mrow>' +
      '</mover><mrow><mi>m</mi><mo>=</mo><mn>2</mn></mrow></mover></mrow>';
  this.executeRuleTest(mml, 'suscrire x plus y avec macron début suscript n égale 1 début sussuscript m égale 2 fin scripts', 'default');
  this.executeRuleTest(mml, 'suscrire x plus y avec macron début suscript n égale 1 début sussuscript m égale 2 fin scripts', 'brief');
  this.executeRuleTest(mml, 'suscrire x plus y avec macron début suscript n égale 1 début sussuscript m égale 2 fin scripts', 'sbrief');
};


/**
 * Testing Rule 12.1, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_12_1_1 = function() {
  var mml = '<mrow><msub><mo form="prefix">log</mo><mi>b</mi></msub>' +
      '<mi>x</mi></mrow>';
  this.executeRuleTest(mml, 'log base b x', 'default');
  this.executeRuleTest(mml, 'log base b x', 'brief');
  this.executeRuleTest(mml, 'log base b x', 'sbrief');
};


/**
 * Testing Rule 12.1, Example 2.
 */
sre.MathspeakGermanTest.prototype.testSample_12_1_2 = function() {
  var mml = '<mrow><mo form="prefix">cos</mo><mi>y</mi></mrow>';
  this.executeRuleTest(mml, 'cosinus y', 'default');
  this.executeRuleTest(mml, 'cosinus y', 'brief');
  this.executeRuleTest(mml, 'cosinus y', 'sbrief');
};


/**
 * Testing Rule 12.1, Example 3.
 */
sre.MathspeakGermanTest.prototype.testSample_12_1_3 = function() {
  var mml = '<mrow><mo form="prefix">sin</mo><mi>x</mi></mrow>';
  this.executeRuleTest(mml, 'sinus x', 'default');
  this.executeRuleTest(mml, 'sinus x', 'brief');
  this.executeRuleTest(mml, 'sinus x', 'sbrief');
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
  this.executeRuleTest(mml, 'début fraction 60 début biffé miles fin biffé sur début biffé hour fin biffé fin fraction multiplié par début fraction 5,280 pieds sur 1 début biffé miles fin biffé fin fraction multiplié par début fraction 1 début biffé hour fin biffé sur 60 minute fin fraction égale début fraction 5,280 pieds sur minute fin fraction', 'default');
  this.executeRuleTest(mml, 'début frac 60 début biffé miles fin biffé sur début biffé hour fin biffé fin frac multiplié par début frac 5,280 pieds sur 1 début biffé miles fin biffé fin frac multiplié par début frac 1 début biffé hour fin biffé sur 60 minute fin frac égale début frac 5,280 pieds sur minute fin frac', 'brief');
  this.executeRuleTest(mml, 'frac 60 début biffé miles fin biffé sur début biffé hour fin biffé fin frac multiplié par frac 5,280 pieds sur 1 début biffé miles fin biffé fin frac multiplié par frac 1 début biffé hour fin biffé sur 60 minute fin frac égale frac 5,280 pieds sur minute fin frac',
                       'sbrief');
};


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
  this.executeRuleTest(mml, '1 joules égale 1 kilogram point médian mètres au carré point médian secondes exposant négatif 2', 'default');
  this.executeRuleTest(mml, '1 joules égale 1 kilogram point médian mètres au carré point médian secondes sup négatif 2', 'brief');
  this.executeRuleTest(mml, '1 joules égale 1 kilogram point médian mètres au carré point médian secondes sup négatif 2', 'sbrief');
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
  this.executeRuleTest(mml, 'm mètres égale 100 m centimeter égale début fraction m sur 1,000 fin fraction kilometer',
                       'default');
  this.executeRuleTest(mml, 'm mètres égale 100 m centimeter égale début frac m sur 1,000 fin frac kilometer', 'brief');
  this.executeRuleTest(mml, 'm mètres égale 100 m centimeter égale frac m sur 1,000 fin frac kilometer', 'sbrief');
};


/**
 * Testing Rule 13.1, Example 4.
 */
sre.MathspeakGermanTest.prototype.testSample_13_1_4 = function() {
  var mml = '<mrow><mn>1</mn><mi mathvariant="normal"' +
      ' class="MathML-Unit">mi</mi></mrow><mo>≈</mo>' +
      '<mrow><mn>1.6</mn><mi mathvariant="normal"' +
      ' class="MathML-Unit">km</mi></mrow>';
  this.executeRuleTest(mml, '1 miles presque égal à 1,6 kilometer', 'default');
  this.executeRuleTest(mml, '1 miles presque égal à 1,6 kilometer', 'brief');
  this.executeRuleTest(mml, '1 miles presque égal à 1,6 kilometer', 'sbrief');
};


/**
 * Testing Rule 13.1, Example 5.
 */
sre.MathspeakGermanTest.prototype.testSample_13_1_5 = function() {
  var mml = '<mrow><mn>1</mn><mi mathvariant="normal"' +
      ' class="MathML-Unit">in</mi><mo>=</mo><mn>2.54</mn>' +
      '<mi mathvariant="normal" class="MathML-Unit">cm</mi></mrow>';
  this.executeRuleTest(mml, '1 pouces égale 2,54 centimeter', 'default');
  this.executeRuleTest(mml, '1 pouces égale 2,54 centimeter', 'brief');
  this.executeRuleTest(mml, '1 pouces égale 2,54 centimeter', 'sbrief');
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
  this.executeRuleTest(mml, 'début tableau 1re rangée 1re colonne H majuscule indice 2 2e colonne plus 3e colonne F majuscule indice 2 4e colonne flèche droite 5e colonne 2 H majuscule F majuscule 2e rangée 1re colonne hydrogen 2e colonne vide 3e colonne fluorine 4e colonne vide 5e colonne hydrogen fluoride fin tableau', 'default');
  this.executeRuleTest(mml, 'début tableau 1re rangée 1re colonne H majuscule 2 2e colonne plus 3e colonne F majuscule 2 4e colonne flèche droite 5e colonne 2 H majuscule F majuscule 2e rangée 1re colonne hydrogen 2e colonne vide 3e colonne fluorine 4e colonne vide 5e colonne hydrogen fluoride fin tableau', 'brief');
  this.executeRuleTest(mml, 'tableau 1re rangée 1re colonne H majuscule 2 2e colonne plus 3e colonne F majuscule 2 4e colonne flèche droite 5e colonne 2 H majuscule F majuscule 2e rangée 1re colonne hydrogen 2e colonne vide 3e colonne fluorine 4e colonne vide 5e colonne hydrogen fluoride fin tableau', 'sbrief');
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
  this.executeRuleTest(mml, 'x égale début tableau accolade gauche élargie 1re rangée 1re colonne y inférieur à 0 2e colonne 0 2e rangée 1re colonne y plus grand ou égal à 0 2e colonne 2 y fin tableau', 'default');
  this.executeRuleTest(mml, 'x égale début tableau accolade gauche élargie 1re rangée 1re colonne y inférieur à 0 2e colonne 0 2e rangée 1re colonne y plus grand ou égal à 0 2e colonne 2 y fin tableau', 'brief');
  this.executeRuleTest(mml, 'x égale tableau accolade gauche élargie 1re rangée 1re colonne y inférieur à 0 2e colonne 0 2e rangée 1re colonne y plus grand ou égal à 0 2e colonne 2 y fin tableau', 'sbrief');
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
  this.executeRuleTest(mml, 'début matrice 3 par 3 1re rangée 1re colonne x plus a 2e colonne x plus b 3e colonne x plus c 2e rangée 1re colonne y plus a 2e colonne y plus b 3e colonne y plus c 3e rangée 1re colonne z plus a 2e colonne z plus b 3e colonne z plus c fin matrice', 'default');
  this.executeRuleTest(mml, 'début matrice 3 par 3 1re rangée 1re colonne x plus a 2e colonne x plus b 3e colonne x plus c 2e rangée 1re colonne y plus a 2e colonne y plus b 3e colonne y plus c 3e rangée 1re colonne z plus a 2e colonne z plus b 3e colonne z plus c fin matrice', 'brief');
  this.executeRuleTest(mml, 'matrice 3 par 3 1re rangée 1re colonne x plus a 2e colonne x plus b 3e colonne x plus c 2e rangée 1re colonne y plus a 2e colonne y plus b 3e colonne y plus c 3e rangée 1re colonne z plus a 2e colonne z plus b 3e colonne z plus c fin matrice', 'sbrief');
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
  this.executeRuleTest(mml, 'début déterminant 2 par 2 1re rangée 1re colonne a plus 1 2e colonne b 2e rangée 1re colonne c 2e colonne d fin déterminant égale parenthèse gauche a plus 1 parenthèse droite d moins b c', 'default');
  this.executeRuleTest(mml, 'début déterminant 2 par 2 1re rangée 1re colonne a plus 1 2e colonne b 2e rangée 1re colonne c 2e colonne d fin déterminant égale parenthèse gauche a plus 1 parenthèse droite d moins b c', 'brief');
  this.executeRuleTest(mml, 'déterminant 2 par 2 1re rangée 1re colonne a plus 1 2e colonne b 2e rangée 1re colonne c 2e colonne d fin déterminant égale parenthèse gauche a plus 1 parenthèse droite d moins b c', 'sbrief');
};


/**
 * Testing Rule 15.4, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_15_4_1 = function() {
  var mml = '<mrow><mfenced open="|" close="|"><mtable><mtr><mtd><mi>a</mi>' +
      '</mtd><mtd><mi>b</mi></mtd></mtr><mtr><mtd><mi>c</mi></mtd><mtd>' +
      '<mi>d</mi></mtd></mtr></mtable></mfenced><mo>=</mo><mi>a</mi>' +
      '<mi>d</mi><mo>-</mo><mi>b</mi><mi>c</mi></mrow>';
  this.executeRuleTest(mml, 'début déterminant 2 par 2 1re rangée a b 2e rangée c d fin déterminant égale a d moins b c', 'default');
  this.executeRuleTest(mml, 'début déterminant 2 par 2 1re rangée a b 2e rangée c d fin déterminant égale a d moins b c', 'brief');
  this.executeRuleTest(mml, 'déterminant 2 par 2 1re rangée a b 2e rangée c d fin déterminant égale a d moins b c', 'sbrief');
};


/**
 * Testing Rule 15.6, Example 1.
 */
sre.MathspeakGermanTest.prototype.testSample_15_6_1 = function() {
  var mml = '<mfenced open="(" close=")"><mtable><mtr><mtd><mi>x</mi></mtd>' +
      '</mtr><mtr><mtd><mi>y</mi></mtd></mtr></mtable></mfenced>';
  this.executeRuleTest(mml, 'début binomiale y parmi x fin binomiale',
                       'default');
  this.executeRuleTest(mml, 'début binomiale y parmi x fin binomiale',
                       'brief');
  this.executeRuleTest(mml, 'binomiale x parmi y fin binomiale', 'sbrief');
};

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
  this.executeRuleTest(mml, 'menos 5 más empezar fracción 1 entre 5' +
                       ' finalizar fracción menos 6 más empezar fracción 2' +
                       ' entre 3 finalizar fracción igual', 'default');
  this.executeRuleTest(mml, 'menos 5 más empezar frac 1 entre 5 finalizar' +
                       ' frac menos 6 más empezar frac 2 entre 3 finalizar' +
                       ' frac igual', 'brief');
  this.executeRuleTest(mml, 'menos 5 más frac 1 entre  5 menos 6 más frac 2' +
                       ' entre  3 igual', 'sbrief');
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
  this.executeRuleTest(mml, 'menos 7 más empezar fracción 3 entre 4' +
                       ' finalizar fracción menos paréntesis izquierdo' +
                       ' menos 4 más empezar fracción 7 entre 8 finalizar' +
                       ' fracción paréntesis derecho igual', 'default');
  this.executeRuleTest(mml, 'menos 7 más empezar frac 3 entre 4 finalizar' +
                       ' frac menos paréntesis izquierdo menos 4 más' +
                       ' empezar frac 7 entre 8 finalizar frac paréntesis' +
                       ' derecho igual', 'brief');
  this.executeRuleTest(mml, 'menos 7 más frac 3 entre  4 menos paréntesis' +
                       ' izquierdo menos 4 más frac 7 entre  8 paréntesis' +
                       ' derecho igual', 'sbrief');
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
  this.executeRuleTest(mml, 'menos 24,15 menos paréntesis izquierdo 13,7' +
                       ' paréntesis derecho igual', 'default');
  this.executeRuleTest(mml, 'menos 24,15 menos paréntesis izquierdo 13,7' +
                       ' paréntesis derecho igual', 'brief');
  this.executeRuleTest(mml, 'menos 24,15 menos paréntesis izquierdo 13,7' +
                       ' paréntesis derecho igual', 'sbrief');
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
  this.executeRuleTest(mml, 'paréntesis izquierdo menos 4 paréntesis' +
                       ' derecho por 3 igual menos 12', 'default');
  this.executeRuleTest(mml, 'paréntesis izquierdo menos 4 paréntesis' +
                       ' derecho por 3 igual menos 12', 'brief');
  this.executeRuleTest(mml, 'paréntesis izquierdo menos 4 paréntesis' +
                       ' derecho por 3 igual menos 12', 'sbrief');
};


/**
 * Testing Sample 5
 */
sre.NobleSpanishTest.prototype.testSample_5 = function() {
  var mml = '<mrow>' +
      '<mo>&#x2212;</mo><mn>12</mn><mo>&#x00F7;</mo><mn>3</mn><mo>=</mo>' +
      '<mo>&#x2212;</mo><mn>4</mn>' +
      '</mrow>';
  this.executeRuleTest(mml, 'menos 12 dividido 3 igual menos 4', 'default');
  this.executeRuleTest(mml, 'menos 12 dividido 3 igual menos 4', 'brief');
  this.executeRuleTest(mml, 'menos 12 dividido 3 igual menos 4', 'sbrief');
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
  this.executeRuleTest(mml, 'menos 12 dividido paréntesis izquierdo menos 4' +
                       ' paréntesis derecho igual 3', 'default');
  this.executeRuleTest(mml, 'menos 12 dividido paréntesis izquierdo menos 4' +
                       ' paréntesis derecho igual 3', 'brief');
  this.executeRuleTest(mml, 'menos 12 dividido paréntesis izquierdo menos 4' +
                       ' paréntesis derecho igual 3', 'sbrief');
};


/**
 * Testing Sample 7
 */
sre.NobleSpanishTest.prototype.testSample_7 = function() {
  var mml = '<mrow>' +
      '<mn>6</mn><mo>&#x00D7;</mo><mn>5</mn>' +
      '</mrow>';
  this.executeRuleTest(mml, '6 por 5', 'default');
  this.executeRuleTest(mml, '6 por 5', 'brief');
  this.executeRuleTest(mml, '6 por 5', 'sbrief');
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
  this.executeRuleTest(mml, '6 por paréntesis izquierdo menos 5 paréntesis' +
                       ' derecho', 'default');
  this.executeRuleTest(mml, '6 por paréntesis izquierdo menos 5 paréntesis' +
                       ' derecho', 'brief');
  this.executeRuleTest(mml, '6 por paréntesis izquierdo menos 5 paréntesis' +
                       ' derecho', 'sbrief');
};


/**
 * Testing Sample 9
 */
sre.NobleSpanishTest.prototype.testSample_9 = function() {
  var mml = '<mrow>' +
      '<mo>&#x2212;</mo><mn>6</mn><mo>&#x00D7;</mo><mn>5</mn>' +
      '</mrow>';
  this.executeRuleTest(mml, 'menos 6 por 5', 'default');
  this.executeRuleTest(mml, 'menos 6 por 5', 'brief');
  this.executeRuleTest(mml, 'menos 6 por 5', 'sbrief');
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
  this.executeRuleTest(mml, 'menos 6 por paréntesis izquierdo menos 5' +
                       ' paréntesis derecho', 'default');
  this.executeRuleTest(mml, 'menos 6 por paréntesis izquierdo menos 5' +
                       ' paréntesis derecho', 'brief');
  this.executeRuleTest(mml, 'menos 6 por paréntesis izquierdo menos 5' +
                       ' paréntesis derecho', 'sbrief');
};


/**
 * Testing Sample 11
 */
sre.NobleSpanishTest.prototype.testSample_11 = function() {
  var mml = '<mrow>' +
      '<mo>&#x2212;</mo><mn>8</mn><mo>&#x00D7;</mo><mn>7</mn>' +
      '</mrow>';
  this.executeRuleTest(mml, 'menos 8 por 7', 'default');
  this.executeRuleTest(mml, 'menos 8 por 7', 'brief');
  this.executeRuleTest(mml, 'menos 8 por 7', 'sbrief');
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
  this.executeRuleTest(mml, 'menos 8 por paréntesis izquierdo menos 7' +
                       ' paréntesis derecho', 'default');
  this.executeRuleTest(mml, 'menos 8 por paréntesis izquierdo menos 7' +
                       ' paréntesis derecho', 'brief');
  this.executeRuleTest(mml, 'menos 8 por paréntesis izquierdo menos 7' +
                       ' paréntesis derecho', 'sbrief');
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
  this.executeRuleTest(mml, '8 por paréntesis izquierdo menos 7 paréntesis' +
                       ' derecho', 'default');
  this.executeRuleTest(mml, '8 por paréntesis izquierdo menos 7 paréntesis' +
                       ' derecho', 'brief');
  this.executeRuleTest(mml, '8 por paréntesis izquierdo menos 7 paréntesis' +
                       ' derecho', 'sbrief');
};


/**
 * Testing Sample 14
 */
sre.NobleSpanishTest.prototype.testSample_14 = function() {
  var mml = '<mrow><mn>8</mn><mo>&#x00D7;</mo><mn>7</mn>' +
      '</mrow>';
  this.executeRuleTest(mml, '8 por 7', 'default');
  this.executeRuleTest(mml, '8 por 7', 'brief');
  this.executeRuleTest(mml, '8 por 7', 'sbrief');
};


/**
 * Testing Sample 15
 */
sre.NobleSpanishTest.prototype.testSample_15 = function() {
  var mml = '<mrow>' +
      '<mi>m</mi><mo>&#x2220;</mo><mn>1</mn><mo>=</mo><mi>30°</mi>' +
      '</mrow>';
  this.executeRuleTest(mml, 'm ángulo 1 igual 30 grado', 'default');
  this.executeRuleTest(mml, 'm ángulo 1 igual 30 grado', 'brief');
  this.executeRuleTest(mml, 'm ángulo 1 igual 30 grado', 'sbrief');
};


/**
 * Testing Sample 16
 */
sre.NobleSpanishTest.prototype.testSample_16 = function() {
  var mml = '<mrow>' +
      '<mi>m</mi><mo>&#x2220;</mo><mn>2</mn><mo>=</mo>' +
      '<mi>60°</mi>  </mrow>';
  this.executeRuleTest(mml, 'm ángulo 2 igual 60 grado', 'default');
  this.executeRuleTest(mml, 'm ángulo 2 igual 60 grado', 'brief');
  this.executeRuleTest(mml, 'm ángulo 2 igual 60 grado', 'sbrief');
};


/**
 * Testing Sample 17
 */
sre.NobleSpanishTest.prototype.testSample_17 = function() {
  var mml = '<mrow>' +
      '<mi>m</mi><mo>&#x2220;</mo><mn>1</mn><mo>+</mo><mi>m</mi>' +
      '<mo>&#x2220;</mo><mn>2</mn><mo>=</mo>' +
      '<mi>90°</mi>  </mrow>';
  this.executeRuleTest(mml, 'm ángulo 1 más m ángulo 2 igual 90 grado',
                       'default');
  this.executeRuleTest(mml, 'm ángulo 1 más m ángulo 2 igual 90 grado',
                       'brief');
  this.executeRuleTest(mml, 'm ángulo 1 más m ángulo 2 igual 90 grado',
                       'sbrief');
};


/**
 * Testing Sample 18
 */
sre.NobleSpanishTest.prototype.testSample_18 = function() {
  var mml = '<mrow>' +
      '<mi>m</mi><mo>&#x2220;</mo><mi>M</mi><mo>+</mo><mi>m</mi>' +
      '<mo>&#x2220;</mo><mi>N</mi><mo>=</mo>' +
      '<mi>180°</mi>  </mrow>';
  this.executeRuleTest(mml, 'm ángulo mayúscula M más m ángulo mayúscula N' +
                       ' igual 180 grado', 'default');
  this.executeRuleTest(mml, 'm ángulo mayúscula M más m ángulo mayúscula N' +
                       ' igual 180 grado', 'brief');
  this.executeRuleTest(mml, 'm ángulo mayúscula M más m ángulo mayúscula N' +
                       ' igual 180 grado', 'sbrief');
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
  this.executeRuleTest(mml, 'mayúscula A igual empezar fracción 1 entre 2' +
                       ' finalizar fracción b h', 'default');
  this.executeRuleTest(mml, 'mayúscula A igual empezar frac 1 entre 2' +
                       ' finalizar frac b h', 'brief');
  this.executeRuleTest(mml, 'mayúscula A igual frac 1 entre  2 b h', 'sbrief');
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
  this.executeRuleTest(mml, 'empezar fracción area of triangle entre area' +
                       ' of square finalizar fracción igual empezar' +
                       ' fracción 1 unit al cuadrado entre 16 units al' +
                       ' cuadrado finalizar fracción', 'default');
  this.executeRuleTest(mml, 'empezar frac area of triangle entre area of' +
                       ' square finalizar frac igual empezar frac 1 unit al' +
                       ' cuadrado entre 16 units al cuadrado finalizar' +
                       ' frac', 'brief');
  this.executeRuleTest(mml, 'frac area of triangle entre  area of square' +
                       ' igual frac 1 unit al cuadrado entre  16 units al' +
                       ' cuadrado', 'sbrief');
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
  this.executeRuleTest(mml, '0,6 al cuadrado', 'default');
  this.executeRuleTest(mml, '0,6 al cuadrado', 'brief');
  this.executeRuleTest(mml, '0,6 al cuadrado', 'sbrief');
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
  this.executeRuleTest(mml, '1,5 al cuadrado', 'default');
  this.executeRuleTest(mml, '1,5 al cuadrado', 'brief');
  this.executeRuleTest(mml, '1,5 al cuadrado', 'sbrief');
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
  this.executeRuleTest(mml, '4 paréntesis izquierdo 2 x más 3 x paréntesis' +
                       ' derecho', 'default');
  this.executeRuleTest(mml, '4 paréntesis izquierdo 2 x más 3 x paréntesis' +
                       ' derecho', 'brief');
  this.executeRuleTest(mml, '4 paréntesis izquierdo 2 x más 3 x paréntesis' +
                       ' derecho', 'sbrief');
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
  this.executeRuleTest(mml, '36 más 4 y menos 1 y al cuadrado más 5 y al' +
                       ' cuadrado menos 2', 'default');
  this.executeRuleTest(mml, '36 más 4 y menos 1 y al cuadrado más 5 y al' +
                       ' cuadrado menos 2', 'brief');
  this.executeRuleTest(mml, '36 más 4 y menos 1 y al cuadrado más 5 y al' +
                       ' cuadrado menos 2', 'sbrief');
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
  this.executeRuleTest(mml, 'paréntesis izquierdo 5 más 9 paréntesis' +
                       ' derecho menos 4 más 3 igual', 'default');
  this.executeRuleTest(mml, 'paréntesis izquierdo 5 más 9 paréntesis' +
                       ' derecho menos 4 más 3 igual', 'brief');
  this.executeRuleTest(mml, 'paréntesis izquierdo 5 más 9 paréntesis' +
                       ' derecho menos 4 más 3 igual', 'sbrief');
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
  this.executeRuleTest(mml, 'modificando superior mayúscula B mayúscula C' +
                       ' con flecha izquierda y derecha', 'default');
  this.executeRuleTest(mml, 'mod superior mayúscula B mayúscula C con' +
                       ' flecha izquierda y derecha', 'brief');
  this.executeRuleTest(mml, 'mod superior mayúscula B mayúscula C con' +
                       ' flecha izquierda y derecha', 'sbrief');
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
  this.executeRuleTest(mml, 'modificando superior mayúscula P mayúscula Q' +
                       ' con flecha derecha', 'default');
  this.executeRuleTest(mml, 'mod superior mayúscula P mayúscula Q con' +
                       ' flecha derecha', 'brief');
  this.executeRuleTest(mml, 'mod superior mayúscula P mayúscula Q con' +
                       ' flecha derecha', 'sbrief');
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
  this.executeRuleTest(mml, 'modificando superior mayúscula G mayúscula H' +
                       ' con barra', 'default');
  this.executeRuleTest(mml, 'mod superior mayúscula G mayúscula H con' +
                       ' barra', 'brief');
  this.executeRuleTest(mml, 'mod superior mayúscula G mayúscula H con' +
                       ' barra', 'sbrief');
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
  this.executeRuleTest(mml, 'modificando superior mayúscula W mayúscula X' +
                       ' con barra aproximadamente igual a modificando' +
                       ' superior mayúscula Y mayúscula Z con barra',
                       'default');
  this.executeRuleTest(mml, 'mod superior mayúscula W mayúscula X con barra' +
                       ' aproximadamente igual a mod superior mayúscula Y' +
                       ' mayúscula Z con barra', 'brief');
  this.executeRuleTest(mml, 'mod superior mayúscula W mayúscula X con barra' +
                       ' aproximadamente igual a mod superior mayúscula Y' +
                       ' mayúscula Z con barra', 'sbrief');
};


/**
 * Testing Sample 30
 */
sre.NobleSpanishTest.prototype.testSample_30 = function() {
  var mml = '<mrow>' +
      '<mo>&#x2220;</mo><mi>B</mi><mi>E</mi><mi>F</mi>' +
      '</mrow>';
  this.executeRuleTest(mml, 'ángulo mayúscula B mayúscula E mayúscula F',
                       'default');
  this.executeRuleTest(mml, 'ángulo mayúscula B mayúscula E mayúscula F',
                       'brief');
  this.executeRuleTest(mml, 'ángulo mayúscula B mayúscula E mayúscula F',
                       'sbrief');
};


/**
 * Testing Sample 31
 */
sre.NobleSpanishTest.prototype.testSample_31 = function() {
  var mml = '<mrow>' +
      '<mo>&#x2220;</mo><mi>B</mi><mi>E</mi><mi>D</mi>' +
      '</mrow>';
  this.executeRuleTest(mml, 'ángulo mayúscula B mayúscula E mayúscula D',
                       'default');
  this.executeRuleTest(mml, 'ángulo mayúscula B mayúscula E mayúscula D',
                       'brief');
  this.executeRuleTest(mml, 'ángulo mayúscula B mayúscula E mayúscula D',
                       'sbrief');
};


/**
 * Testing Sample 32
 */
sre.NobleSpanishTest.prototype.testSample_32 = function() {
  var mml = '<mrow>' +
      '<mo>&#x2220;</mo><mi>D</mi><mi>E</mi><mi>F</mi>' +
      '</mrow>';
  this.executeRuleTest(mml, 'ángulo mayúscula D mayúscula E mayúscula F',
                       'default');
  this.executeRuleTest(mml, 'ángulo mayúscula D mayúscula E mayúscula F',
                       'brief');
  this.executeRuleTest(mml, 'ángulo mayúscula D mayúscula E mayúscula F',
                       'sbrief');
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
  this.executeRuleTest(mml, 'x igual empezar fracción menos b más menos' +
                       ' empezar raíz cuadrada b al cuadrado menos 4 a c' +
                       ' finalizar raíz cuadrada entre 2 a finalizar' +
                       ' fracción', 'default');
  this.executeRuleTest(mml, 'x igual empezar frac menos b más menos empezar' +
                       ' raíz cuadrada b al cuadrado menos 4 a c finalizar' +
                       ' raíz cuadrada entre 2 a finalizar frac', 'brief');
  this.executeRuleTest(mml, 'x igual frac menos b más menos raíz cuadrada b' +
                       ' al cuadrado menos 4 a c finalizar raíz cuadrada' +
                       ' entre  2 a', 'sbrief');
};


/**
 * Testing Sample 34
 */
sre.NobleSpanishTest.prototype.testSample_34 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><msup><mrow><mi>x</mi></mrow><mrow>' +
      '<mn>2</mn></mrow></msup><mo>+</mo><mn>8</mn><mi>x</mi><mo>+</mo>' +
      '<mn>16</mn></mrow>';
  this.executeRuleTest(mml, 'y igual x al cuadrado más 8 x más 16', 'default');
  this.executeRuleTest(mml, 'y igual x al cuadrado más 8 x más 16', 'brief');
  this.executeRuleTest(mml, 'y igual x al cuadrado más 8 x más 16', 'sbrief');
};


/**
 * Testing Sample 35
 */
sre.NobleSpanishTest.prototype.testSample_35 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><mfrac><mrow><mn>1</mn></mrow><mrow>' +
      '<mn>3</mn></mrow></mfrac><mrow><mo>(</mo><msup><mrow><mn>3</mn>' +
      '</mrow><mrow><mi>x</mi></mrow></msup><mo>)</mo></mrow></mrow>';
  this.executeRuleTest(mml, 'y igual empezar fracción 1 entre 3 finalizar' +
                       ' fracción paréntesis izquierdo 3 superíndice x' +
                       ' línea base paréntesis derecho', 'default');
  this.executeRuleTest(mml, 'y igual empezar frac 1 entre 3 finalizar frac' +
                       ' paréntesis izquierdo 3 sup x paréntesis derecho',
                       'brief');
  this.executeRuleTest(mml, 'y igual frac 1 entre  3 paréntesis izquierdo 3' +
                       ' sup x paréntesis derecho', 'sbrief');
};


/**
 * Testing Sample 36
 */
sre.NobleSpanishTest.prototype.testSample_36 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><mn>10</mn><mo>−</mo><mn>2</mn><mi>x' +
      '</mi></mrow>';
  this.executeRuleTest(mml, 'y igual 10 menos 2 x', 'default');
  this.executeRuleTest(mml, 'y igual 10 menos 2 x', 'brief');
  this.executeRuleTest(mml, 'y igual 10 menos 2 x', 'sbrief');
};


/**
 * Testing Sample 37
 */
sre.NobleSpanishTest.prototype.testSample_37 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><mn>2</mn><msup><mrow><mi>x</mi>' +
      '</mrow><mrow><mn>3</mn></mrow></msup><mo>+</mo><mn>5</mn></mrow>';
  this.executeRuleTest(mml, 'y igual 2 x al cubo más 5', 'default');
  this.executeRuleTest(mml, 'y igual 2 x al cubo más 5', 'brief');
  this.executeRuleTest(mml, 'y igual 2 x al cubo más 5', 'sbrief');
};


/**
 * Testing Sample 38
 */
sre.NobleSpanishTest.prototype.testSample_38 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><mo>(</mo><msup><mrow><mo/><mi>x' +
      '</mi></mrow><mrow><mn>2</mn></mrow></msup><mo>+</mo><mn>1</mn>' +
      '<mrow><mo>)</mo><mo>(</mo><msup><mrow><mi>x</mi></mrow><mrow><mn>2' +
      '</mn></mrow></msup></mrow><mo>+</mo><mn>3</mn><mo>)</mo></mrow>';
  this.executeRuleTest(mml, 'y igual paréntesis izquierdo x al cuadrado más' +
                       ' 1 paréntesis derecho paréntesis izquierdo x al' +
                       ' cuadrado más 3 paréntesis derecho', 'default');
  this.executeRuleTest(mml, 'y igual paréntesis izquierdo x al cuadrado más' +
                       ' 1 paréntesis derecho paréntesis izquierdo x al' +
                       ' cuadrado más 3 paréntesis derecho', 'brief');
  this.executeRuleTest(mml, 'y igual paréntesis izquierdo x al cuadrado más' +
                       ' 1 paréntesis derecho paréntesis izquierdo x al' +
                       ' cuadrado más 3 paréntesis derecho', 'sbrief');
};


/**
 * Testing Sample 39
 */
sre.NobleSpanishTest.prototype.testSample_39 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><msup><mrow><mn>0.5</mn></mrow>' +
      '<mrow><mi>x</mi></mrow></msup></mrow>';
  this.executeRuleTest(mml, 'y igual 0,5 superíndice x', 'default');
  this.executeRuleTest(mml, 'y igual 0,5 sup x', 'brief');
  this.executeRuleTest(mml, 'y igual 0,5 sup x', 'sbrief');
};


/**
 * Testing Sample 40
 */
sre.NobleSpanishTest.prototype.testSample_40 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><mn>22</mn><mo>−</mo><mn>2</mn><mi>x' +
      '</mi></mrow>';
  this.executeRuleTest(mml, 'y igual 22 menos 2 x', 'default');
  this.executeRuleTest(mml, 'y igual 22 menos 2 x', 'brief');
  this.executeRuleTest(mml, 'y igual 22 menos 2 x', 'sbrief');
};


/**
 * Testing Sample 41
 */
sre.NobleSpanishTest.prototype.testSample_41 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><mfrac><mrow><mn>3</mn></mrow><mrow>' +
      '<mi>x</mi></mrow></mfrac></mrow>';
  this.executeRuleTest(mml, 'y igual empezar fracción 3 entre x finalizar' +
                       ' fracción', 'default');
  this.executeRuleTest(mml, 'y igual empezar frac 3 entre x finalizar' +
                       ' frac', 'brief');
  this.executeRuleTest(mml, 'y igual frac 3 entre  x', 'sbrief');
};


/**
 * Testing Sample 42
 */
sre.NobleSpanishTest.prototype.testSample_42 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><mo>(</mo><mi>x</mi><mo>+</mo><mn>4' +
      '</mn><mo>)</mo><mo>(</mo><mi>x</mi><mo>+</mo><mn>4</mn><mo>)</mo>' +
      '</mrow>';
  this.executeRuleTest(mml, 'y igual paréntesis izquierdo x más 4' +
                       ' paréntesis derecho paréntesis izquierdo x más 4' +
                       ' paréntesis derecho', 'default');
  this.executeRuleTest(mml, 'y igual paréntesis izquierdo x más 4' +
                       ' paréntesis derecho paréntesis izquierdo x más 4' +
                       ' paréntesis derecho', 'brief');
  this.executeRuleTest(mml, 'y igual paréntesis izquierdo x más 4' +
                       ' paréntesis derecho paréntesis izquierdo x más 4' +
                       ' paréntesis derecho', 'sbrief');
};


/**
 * Testing Sample 43
 */
sre.NobleSpanishTest.prototype.testSample_43 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><mo>(</mo><mn>4</mn><mi>x</mi><mo>−' +
      '</mo><mn>3</mn><mo>)</mo><mo>(</mo><mi>x</mi><mo>+</mo><mn>1</mn>' +
      '<mo>)</mo></mrow>';
  this.executeRuleTest(mml, 'y igual paréntesis izquierdo 4 x menos 3' +
                       ' paréntesis derecho paréntesis izquierdo x más 1' +
                       ' paréntesis derecho', 'default');
  this.executeRuleTest(mml, 'y igual paréntesis izquierdo 4 x menos 3' +
                       ' paréntesis derecho paréntesis izquierdo x más 1' +
                       ' paréntesis derecho', 'brief');
  this.executeRuleTest(mml, 'y igual paréntesis izquierdo 4 x menos 3' +
                       ' paréntesis derecho paréntesis izquierdo x más 1' +
                       ' paréntesis derecho', 'sbrief');
};


/**
 * Testing Sample 44
 */
sre.NobleSpanishTest.prototype.testSample_44 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><mn>20</mn><mi>x</mi><mo>−</mo><mn>4' +
      '</mn><msup><mrow><mi>x</mi></mrow><mrow><mn>2</mn></mrow></msup>' +
      '</mrow>';
  this.executeRuleTest(mml, 'y igual 20 x menos 4 x al cuadrado', 'default');
  this.executeRuleTest(mml, 'y igual 20 x menos 4 x al cuadrado', 'brief');
  this.executeRuleTest(mml, 'y igual 20 x menos 4 x al cuadrado', 'sbrief');
};


/**
 * Testing Sample 45
 */
sre.NobleSpanishTest.prototype.testSample_45 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><msup><mrow><mi>x</mi></mrow><mrow>' +
      '<mn>2</mn></mrow></msup></mrow>';
  this.executeRuleTest(mml, 'y igual x al cuadrado', 'default');
  this.executeRuleTest(mml, 'y igual x al cuadrado', 'brief');
  this.executeRuleTest(mml, 'y igual x al cuadrado', 'sbrief');
};


/**
 * Testing Sample 46
 */
sre.NobleSpanishTest.prototype.testSample_46 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><msup><mrow><mn>3</mn></mrow><mrow>' +
      '<mi>x</mi><mo>−</mo><mn>1</mn></mrow></msup></mrow>';
  this.executeRuleTest(mml, 'y igual 3 superíndice x menos 1', 'default');
  this.executeRuleTest(mml, 'y igual 3 sup x menos 1', 'brief');
  this.executeRuleTest(mml, 'y igual 3 sup x menos 1', 'sbrief');
};


/**
 * Testing Sample 47
 */
sre.NobleSpanishTest.prototype.testSample_47 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><mn>16</mn><mo>−</mo><mn>2</mn><mo>(' +
      '</mo><mi>x</mi><mo>+</mo><mn>3</mn><mo>)</mo></mrow>';
  this.executeRuleTest(mml, 'y igual 16 menos 2 paréntesis izquierdo x más' +
                       ' 3 paréntesis derecho', 'default');
  this.executeRuleTest(mml, 'y igual 16 menos 2 paréntesis izquierdo x más' +
                       ' 3 paréntesis derecho', 'brief');
  this.executeRuleTest(mml, 'y igual 16 menos 2 paréntesis izquierdo x más' +
                       ' 3 paréntesis derecho', 'sbrief');
};


/**
 * Testing Sample 48
 */
sre.NobleSpanishTest.prototype.testSample_48 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><mn>4</mn><msup><mrow><mi>x</mi>' +
      '</mrow><mrow><mn>2</mn></mrow></msup><mo>−</mo><mi>x</mi><mo>−' +
      '</mo><mn>3</mn></mrow>';
  this.executeRuleTest(mml, 'y igual 4 x al cuadrado menos x menos 3',
                       'default');
  this.executeRuleTest(mml, 'y igual 4 x al cuadrado menos x menos 3', 'brief');
  this.executeRuleTest(mml, 'y igual 4 x al cuadrado menos x menos 3',
                       'sbrief');
};


/**
 * Testing Sample 49
 */
sre.NobleSpanishTest.prototype.testSample_49 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><mi>x</mi><mo>+</mo><mfrac><mrow>' +
      '<mn>1</mn></mrow><mrow><mi>x</mi></mrow></mfrac></mrow>';
  this.executeRuleTest(mml, 'y igual x más empezar fracción 1 entre x' +
                       ' finalizar fracción', 'default');
  this.executeRuleTest(mml, 'y igual x más empezar frac 1 entre x finalizar' +
                       ' frac', 'brief');
  this.executeRuleTest(mml, 'y igual x más frac 1 entre  x', 'sbrief');
};


/**
 * Testing Sample 50
 */
sre.NobleSpanishTest.prototype.testSample_50 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><mn>4</mn><mi>x</mi><mo>(</mo><mn>5' +
      '</mn><mo>−</mo><mi>x</mi><mo>)</mo></mrow>';
  this.executeRuleTest(mml, 'y igual 4 x paréntesis izquierdo 5 menos x' +
                       ' paréntesis derecho', 'default');
  this.executeRuleTest(mml, 'y igual 4 x paréntesis izquierdo 5 menos x' +
                       ' paréntesis derecho', 'brief');
  this.executeRuleTest(mml, 'y igual 4 x paréntesis izquierdo 5 menos x' +
                       ' paréntesis derecho', 'sbrief');
};


/**
 * Testing Sample 51
 */
sre.NobleSpanishTest.prototype.testSample_51 = function() {
  var mml = '<mrow><mi>y</mi><mo>=</mo><mn>2</mn><mo>(</mo><mi>x</mi><mo>−' +
      '</mo><mn>3</mn><mo>)</mo><mo>+</mo><mn>6</mn><mo>(</mo><mn>1</mn>' +
      '<mo>−</mo><mi>x</mi><mo>)</mo></mrow>';
  this.executeRuleTest(mml, 'y igual 2 paréntesis izquierdo x menos 3' +
                       ' paréntesis derecho más 6 paréntesis izquierdo 1' +
                       ' menos x paréntesis derecho', 'default');
  this.executeRuleTest(mml, 'y igual 2 paréntesis izquierdo x menos 3' +
                       ' paréntesis derecho más 6 paréntesis izquierdo 1' +
                       ' menos x paréntesis derecho', 'brief');
  this.executeRuleTest(mml, 'y igual 2 paréntesis izquierdo x menos 3' +
                       ' paréntesis derecho más 6 paréntesis izquierdo 1' +
                       ' menos x paréntesis derecho', 'sbrief');
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
  this.executeRuleTest(mml, '0,25 mayor que empezar fracción 5 entre 16' +
                       ' finalizar fracción', 'default');
  this.executeRuleTest(mml, '0,25 mayor que empezar frac 5 entre 16' +
                       ' finalizar frac', 'brief');
  this.executeRuleTest(mml, '0,25 mayor que frac 5 entre  16', 'sbrief');
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
  this.executeRuleTest(mml, '32 punto paréntesis izquierdo 5 punto 7' +
                       ' paréntesis derecho', 'default');
  this.executeRuleTest(mml, '32 punto paréntesis izquierdo 5 punto 7' +
                       ' paréntesis derecho', 'brief');
  this.executeRuleTest(mml, '32 punto paréntesis izquierdo 5 punto 7' +
                       ' paréntesis derecho', 'sbrief');
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
  this.executeRuleTest(mml, 'paréntesis izquierdo empezar fracción 1 entre' +
                       ' 2 finalizar fracción por empezar fracción 1 entre' +
                       ' 2 finalizar fracción por pi por 2 paréntesis' +
                       ' derecho más paréntesis izquierdo 2 por empezar' +
                       ' fracción 1 entre 2 finalizar fracción por pi por 5' +
                       ' paréntesis derecho', 'default');
  this.executeRuleTest(mml, 'paréntesis izquierdo empezar frac 1 entre 2' +
                       ' finalizar frac por empezar frac 1 entre 2' +
                       ' finalizar frac por pi por 2 paréntesis derecho más' +
                       ' paréntesis izquierdo 2 por empezar frac 1 entre 2' +
                       ' finalizar frac por pi por 5 paréntesis derecho',
                       'brief');
  this.executeRuleTest(mml, 'paréntesis izquierdo frac 1 entre  2 por frac' +
                       ' 1 entre  2 por pi por 2 paréntesis derecho más' +
                       ' paréntesis izquierdo 2 por frac 1 entre  2 por pi' +
                       ' por 5 paréntesis derecho', 'sbrief');
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
  this.executeRuleTest(mml, 'liminf bajoíndice n flecha derecha infinito' +
                       ' finalizar índices mayúscula E subíndice n línea' +
                       ' base igual unión bajoíndice n mayor o igual que 1' +
                       ' finalizar índices intersección bajoíndice k mayor' +
                       ' o igual que n finalizar índices mayúscula E' +
                       ' subíndice k línea base coma limsup bajoíndice n' +
                       ' flecha derecha infinito finalizar índices' +
                       ' mayúscula E subíndice n línea base igual' +
                       ' intersección bajoíndice n mayor o igual que 1' +
                       ' finalizar índices unión bajoíndice k mayor o igual' +
                       ' que n finalizar índices mayúscula E subíndice k' +
                       ' línea base punto', 'default');
  this.executeRuleTest(mml, 'liminf bajoíndice n flecha derecha infinito' +
                       ' finalizar índices mayúscula E sub n igual unión' +
                       ' bajoíndice n mayor o igual que 1 finalizar índices' +
                       ' intersección bajoíndice k mayor o igual que n' +
                       ' finalizar índices mayúscula E sub k coma limsup' +
                       ' bajoíndice n flecha derecha infinito finalizar' +
                       ' índices mayúscula E sub n igual intersección' +
                       ' bajoíndice n mayor o igual que 1 finalizar índices' +
                       ' unión bajoíndice k mayor o igual que n finalizar' +
                       ' índices mayúscula E sub k punto', 'brief');
  this.executeRuleTest(mml, 'liminf bajoíndice n flecha derecha infinito' +
                       ' finalizar índices mayúscula E sub n igual unión' +
                       ' bajoíndice n mayor o igual que 1 finalizar índices' +
                       ' intersección bajoíndice k mayor o igual que n' +
                       ' finalizar índices mayúscula E sub k coma limsup' +
                       ' bajoíndice n flecha derecha infinito finalizar' +
                       ' índices mayúscula E sub n igual intersección' +
                       ' bajoíndice n mayor o igual que 1 finalizar índices' +
                       ' unión bajoíndice k mayor o igual que n finalizar' +
                       ' índices mayúscula E sub k punto', 'sbrief');
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
  this.executeRuleTest(mml, 'empezar esquema primera fila primera columna' +
                       ' paréntesis izquierdo i paréntesis derecho segunda' +
                       ' columna script mayúscula S perteneciente a script' +
                       ' mayúscula A punto y coma segunda fila primera' +
                       ' columna paréntesis izquierdo ii paréntesis derecho' +
                       ' segunda columna if mayúscula E perteneciente a' +
                       ' script mayúscula A then mayúscula E barra' +
                       ' perteneciente a script mayúscula A punto y coma' +
                       ' tercera fila primera columna paréntesis izquierdo' +
                       ' iii paréntesis derecho segunda columna if' +
                       ' mayúscula E subíndice 1 línea base coma mayúscula' +
                       ' E subíndice 2 línea base perteneciente a script' +
                       ' mayúscula A then mayúscula E subíndice 1 línea' +
                       ' base unión mayúscula E subíndice 2 línea base' +
                       ' perteneciente a script mayúscula A punto finalizar' +
                       ' esquema', 'default');
  this.executeRuleTest(mml, 'empezar esquema primera fila primera columna' +
                       ' paréntesis izquierdo i paréntesis derecho segunda' +
                       ' columna script mayúscula S perteneciente a script' +
                       ' mayúscula A punto y coma segunda fila primera' +
                       ' columna paréntesis izquierdo ii paréntesis derecho' +
                       ' segunda columna if mayúscula E perteneciente a' +
                       ' script mayúscula A then mayúscula E barra' +
                       ' perteneciente a script mayúscula A punto y coma' +
                       ' tercera fila primera columna paréntesis izquierdo' +
                       ' iii paréntesis derecho segunda columna if' +
                       ' mayúscula E sub 1 coma mayúscula E sub 2' +
                       ' perteneciente a script mayúscula A then mayúscula' +
                       ' E sub 1 unión mayúscula E sub 2 perteneciente a' +
                       ' script mayúscula A punto finalizar esquema', 'brief');
  this.executeRuleTest(mml, 'esquema primera fila primera columna' +
                       ' paréntesis izquierdo i paréntesis derecho segunda' +
                       ' columna script mayúscula S perteneciente a script' +
                       ' mayúscula A punto y coma segunda fila primera' +
                       ' columna paréntesis izquierdo ii paréntesis derecho' +
                       ' segunda columna if mayúscula E perteneciente a' +
                       ' script mayúscula A then mayúscula E barra' +
                       ' perteneciente a script mayúscula A punto y coma' +
                       ' tercera fila primera columna paréntesis izquierdo' +
                       ' iii paréntesis derecho segunda columna if' +
                       ' mayúscula E sub 1 coma mayúscula E sub 2' +
                       ' perteneciente a script mayúscula A then mayúscula' +
                       ' E sub 1 unión mayúscula E sub 2 perteneciente a' +
                       ' script mayúscula A punto finalizar esquema', 'sbrief');
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
  this.executeRuleTest(mml, 'empezar esquema primera fila primera columna' +
                       ' espacio segunda columna espacio tercera columna' +
                       ' paréntesis izquierdo normal mayúscula A punto 1' +
                       ' paréntesis derecho mayúscula I f mayúscula A' +
                       ' perteneciente a script mayúscula F t h e n 0 menor' +
                       ' o igual que mayúscula P llave izquierda mayúscula' +
                       ' A llaves derecha menor o igual que 1 punto cuarta' +
                       ' columna paréntesis izquierdo 1 paréntesis derecho' +
                       ' segunda fila primera columna espacio segunda' +
                       ' columna espacio tercera columna paréntesis' +
                       ' izquierdo normal mayúscula A punto 2 paréntesis' +
                       ' derecho mayúscula P llave izquierda script' +
                       ' mayúscula S llaves derecha igual 1 punto cuarta' +
                       ' columna paréntesis izquierdo 2 paréntesis derecho' +
                       ' tercera fila primera columna espacio segunda' +
                       ' columna espacio tercera columna paréntesis' +
                       ' izquierdo normal mayúscula A punto 3 paréntesis' +
                       ' derecho mayúscula I f llave izquierda mayúscula E' +
                       ' subíndice n línea base coma n mayor o igual que 1' +
                       ' llaves derecha perteneciente a script mayúscula F' +
                       ' is a sequence of disjoint cuarta columna' +
                       ' paréntesis izquierdo 3 paréntesis derecho' +
                       ' finalizar esquema', 'default');
  this.executeRuleTest(mml, 'empezar esquema primera fila primera columna' +
                       ' espacio segunda columna espacio tercera columna' +
                       ' paréntesis izquierdo normal mayúscula A punto 1' +
                       ' paréntesis derecho mayúscula I f mayúscula A' +
                       ' perteneciente a script mayúscula F t h e n 0 menor' +
                       ' o igual que mayúscula P llave izquierda mayúscula' +
                       ' A llaves derecha menor o igual que 1 punto cuarta' +
                       ' columna paréntesis izquierdo 1 paréntesis derecho' +
                       ' segunda fila primera columna espacio segunda' +
                       ' columna espacio tercera columna paréntesis' +
                       ' izquierdo normal mayúscula A punto 2 paréntesis' +
                       ' derecho mayúscula P llave izquierda script' +
                       ' mayúscula S llaves derecha igual 1 punto cuarta' +
                       ' columna paréntesis izquierdo 2 paréntesis derecho' +
                       ' tercera fila primera columna espacio segunda' +
                       ' columna espacio tercera columna paréntesis' +
                       ' izquierdo normal mayúscula A punto 3 paréntesis' +
                       ' derecho mayúscula I f llave izquierda mayúscula E' +
                       ' sub n coma n mayor o igual que 1 llaves derecha' +
                       ' perteneciente a script mayúscula F is a sequence' +
                       ' of disjoint cuarta columna paréntesis izquierdo 3' +
                       ' paréntesis derecho finalizar esquema', 'brief');
  this.executeRuleTest(mml, 'esquema primera fila primera columna espacio' +
                       ' segunda columna espacio tercera columna paréntesis' +
                       ' izquierdo normal mayúscula A punto 1 paréntesis' +
                       ' derecho mayúscula I f mayúscula A perteneciente a' +
                       ' script mayúscula F t h e n 0 menor o igual que' +
                       ' mayúscula P llave izquierda mayúscula A llaves' +
                       ' derecha menor o igual que 1 punto cuarta columna' +
                       ' paréntesis izquierdo 1 paréntesis derecho segunda' +
                       ' fila primera columna espacio segunda columna' +
                       ' espacio tercera columna paréntesis izquierdo' +
                       ' normal mayúscula A punto 2 paréntesis derecho' +
                       ' mayúscula P llave izquierda script mayúscula S' +
                       ' llaves derecha igual 1 punto cuarta columna' +
                       ' paréntesis izquierdo 2 paréntesis derecho tercera' +
                       ' fila primera columna espacio segunda columna' +
                       ' espacio tercera columna paréntesis izquierdo' +
                       ' normal mayúscula A punto 3 paréntesis derecho' +
                       ' mayúscula I f llave izquierda mayúscula E sub n' +
                       ' coma n mayor o igual que 1 llaves derecha' +
                       ' perteneciente a script mayúscula F is a sequence' +
                       ' of disjoint cuarta columna paréntesis izquierdo 3' +
                       ' paréntesis derecho finalizar esquema', 'sbrief');
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
  this.executeRuleTest(mml, 'mayúscula P llave izquierda mayúscula B' +
                       ' subíndice j línea base barra vertical mayúscula A' +
                       ' llaves derecha igual empezar fracción mayúscula P' +
                       ' llave izquierda mayúscula B subíndice j línea base' +
                       ' llaves derecha mayúscula P llave izquierda' +
                       ' mayúscula A barra vertical mayúscula B subíndice j' +
                       ' línea base llaves derecha entre sumatorio' +
                       ' bajoíndice j prima perteneciente a mayúscula J' +
                       ' finalizar índices mayúscula P llave izquierda' +
                       ' mayúscula B subíndice j prima línea base llaves' +
                       ' derecha mayúscula P llave izquierda mayúscula A' +
                       ' barra vertical mayúscula B subíndice j prima línea' +
                       ' base llaves derecha finalizar fracción punto',
                       'default');
  this.executeRuleTest(mml, 'mayúscula P llave izquierda mayúscula B sub j' +
                       ' barra vertical mayúscula A llaves derecha igual' +
                       ' empezar frac mayúscula P llave izquierda mayúscula' +
                       ' B sub j llaves derecha mayúscula P llave izquierda' +
                       ' mayúscula A barra vertical mayúscula B sub j' +
                       ' llaves derecha entre sumatorio bajoíndice j prima' +
                       ' perteneciente a mayúscula J finalizar índices' +
                       ' mayúscula P llave izquierda mayúscula B sub j' +
                       ' prima llaves derecha mayúscula P llave izquierda' +
                       ' mayúscula A barra vertical mayúscula B sub j prima' +
                       ' llaves derecha finalizar frac punto', 'brief');
  this.executeRuleTest(mml, 'mayúscula P llave izquierda mayúscula B sub j' +
                       ' barra vertical mayúscula A llaves derecha igual' +
                       ' frac mayúscula P llave izquierda mayúscula B sub j' +
                       ' llaves derecha mayúscula P llave izquierda' +
                       ' mayúscula A barra vertical mayúscula B sub j' +
                       ' llaves derecha entre  sumatorio bajoíndice j prima' +
                       ' perteneciente a mayúscula J finalizar índices' +
                       ' mayúscula P llave izquierda mayúscula B sub j' +
                       ' prima llaves derecha mayúscula P llave izquierda' +
                       ' mayúscula A barra vertical mayúscula B sub j prima' +
                       ' llaves derecha punto', 'sbrief');
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
  this.executeRuleTest(mml, 'mi subíndice 1 línea base paréntesis izquierdo' +
                       ' mayúscula B paréntesis derecho igual integral' +
                       ' bajoíndice mayúscula B finalizar índices f' +
                       ' paréntesis izquierdo x paréntesis derecho d mi' +
                       ' subíndice 2 línea base paréntesis izquierdo x' +
                       ' paréntesis derecho', 'default');
  this.executeRuleTest(mml, 'mi sub 1 paréntesis izquierdo mayúscula B' +
                       ' paréntesis derecho igual integral bajoíndice' +
                       ' mayúscula B finalizar índices f paréntesis' +
                       ' izquierdo x paréntesis derecho d mi sub 2' +
                       ' paréntesis izquierdo x paréntesis derecho', 'brief');
  this.executeRuleTest(mml, 'mi sub 1 paréntesis izquierdo mayúscula B' +
                       ' paréntesis derecho igual integral bajoíndice' +
                       ' mayúscula B finalizar índices f paréntesis' +
                       ' izquierdo x paréntesis derecho d mi sub 2' +
                       ' paréntesis izquierdo x paréntesis derecho', 'sbrief');
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
  this.executeRuleTest(mml, 'lim bajoíndice n flecha derecha infinito' +
                       ' finalizar índices mayúscula E llave izquierda' +
                       ' empezar valor absoluto mayúscula X subíndice n' +
                       ' línea base menos mayúscula X finalizar valor' +
                       ' absoluto llaves derecha igual mayúscula E llave' +
                       ' izquierda lim bajoíndice n flecha derecha infinito' +
                       ' finalizar índices empezar valor absoluto mayúscula' +
                       ' X subíndice n línea base menos mayúscula X' +
                       ' finalizar valor absoluto llaves derecha igual 0' +
                       ' punto', 'default');
  this.executeRuleTest(mml, 'lim bajoíndice n flecha derecha infinito' +
                       ' finalizar índices mayúscula E llave izquierda' +
                       ' empezar valor absoluto mayúscula X sub n menos' +
                       ' mayúscula X finalizar valor absoluto llaves' +
                       ' derecha igual mayúscula E llave izquierda lim' +
                       ' bajoíndice n flecha derecha infinito finalizar' +
                       ' índices empezar valor absoluto mayúscula X sub n' +
                       ' menos mayúscula X finalizar valor absoluto llaves' +
                       ' derecha igual 0 punto', 'brief');
  this.executeRuleTest(mml, 'lim bajoíndice n flecha derecha infinito' +
                       ' finalizar índices mayúscula E llave izquierda' +
                       ' valor absoluto mayúscula X sub n menos mayúscula X' +
                       ' finalizar valor absoluto llaves derecha igual' +
                       ' mayúscula E llave izquierda lim bajoíndice n' +
                       ' flecha derecha infinito finalizar índices valor' +
                       ' absoluto mayúscula X sub n menos mayúscula X' +
                       ' finalizar valor absoluto llaves derecha igual 0' +
                       ' punto', 'sbrief');
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
  this.executeRuleTest(mml, 'empezar esquema primera fila primera columna' +
                       ' mayúscula P subíndice mi coma sigma línea base' +
                       ' llave izquierda mayúscula Y mayor o igual que l' +
                       ' subíndice beta línea base paréntesis izquierdo' +
                       ' mayúscula Y barra subíndice n línea base coma' +
                       ' mayúscula S subíndice n línea base paréntesis' +
                       ' derecho llaves derecha igual mayúscula P subíndice' +
                       ' mi coma sigma línea base llave izquierda' +
                       ' paréntesis izquierdo mayúscula Y menos mayúscula Y' +
                       ' barra subíndice n línea base paréntesis derecho' +
                       ' barra oblicua paréntesis izquierdo mayúscula S' +
                       ' punto medio paréntesis izquierdo 1 más empezar' +
                       ' fracción 1 entre n finalizar fracción paréntesis' +
                       ' derecho superíndice 1 barra oblicua 2 línea base' +
                       ' paréntesis derecho mayor o igual que menos t' +
                       ' subíndice beta línea base corchete izquierdo n' +
                       ' menos 1 corchete derecho llaves derecha igual beta' +
                       ' coma segunda fila primera columna espacio segunda' +
                       ' columna paréntesis izquierdo 1 paréntesis derecho' +
                       ' finalizar esquema', 'default');
  this.executeRuleTest(mml, 'empezar esquema primera fila primera columna' +
                       ' mayúscula P sub mi coma sigma llave izquierda' +
                       ' mayúscula Y mayor o igual que l sub beta' +
                       ' paréntesis izquierdo mayúscula Y barra sub n coma' +
                       ' mayúscula S sub n paréntesis derecho llaves' +
                       ' derecha igual mayúscula P sub mi coma sigma llave' +
                       ' izquierda paréntesis izquierdo mayúscula Y menos' +
                       ' mayúscula Y barra sub n paréntesis derecho barra' +
                       ' oblicua paréntesis izquierdo mayúscula S punto' +
                       ' medio paréntesis izquierdo 1 más empezar frac 1' +
                       ' entre n finalizar frac paréntesis derecho sup 1' +
                       ' barra oblicua 2 paréntesis derecho mayor o igual' +
                       ' que menos t sub beta corchete izquierdo n menos 1' +
                       ' corchete derecho llaves derecha igual beta coma' +
                       ' segunda fila primera columna espacio segunda' +
                       ' columna paréntesis izquierdo 1 paréntesis derecho' +
                       ' finalizar esquema', 'brief');
  this.executeRuleTest(mml, 'esquema primera fila primera columna mayúscula' +
                       ' P sub mi coma sigma llave izquierda mayúscula Y' +
                       ' mayor o igual que l sub beta paréntesis izquierdo' +
                       ' mayúscula Y barra sub n coma mayúscula S sub n' +
                       ' paréntesis derecho llaves derecha igual mayúscula' +
                       ' P sub mi coma sigma llave izquierda paréntesis' +
                       ' izquierdo mayúscula Y menos mayúscula Y barra sub' +
                       ' n paréntesis derecho barra oblicua paréntesis' +
                       ' izquierdo mayúscula S punto medio paréntesis' +
                       ' izquierdo 1 más frac 1 entre  n paréntesis derecho' +
                       ' sup 1 barra oblicua 2 paréntesis derecho mayor o' +
                       ' igual que menos t sub beta corchete izquierdo n' +
                       ' menos 1 corchete derecho llaves derecha igual beta' +
                       ' coma segunda fila primera columna espacio segunda' +
                       ' columna paréntesis izquierdo 1 paréntesis derecho' +
                       ' finalizar esquema', 'sbrief');
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
  this.executeRuleTest(mml, 'mayúscula L igual empezar matriz 5 por 6' +
                       ' primera fila primera columna 1 segunda columna' +
                       ' menos 1 tercera columna espacio cuarta columna' +
                       ' espacio quinta columna espacio sexta columna' +
                       ' espacio segunda fila primera columna espacio' +
                       ' segunda columna 1 tercera columna menos 1 cuarta' +
                       ' columna espacio quinta columna 0 sexta columna' +
                       ' espacio tercera fila primera columna espacio' +
                       ' segunda columna espacio tercera columna espacio' +
                       ' cuarta columna espacio quinta columna espacio' +
                       ' sexta columna espacio cuarta fila primera columna' +
                       ' espacio segunda columna 0 tercera columna espacio' +
                       ' cuarta columna espacio quinta columna espacio' +
                       ' sexta columna espacio quinta fila primera columna' +
                       ' espacio segunda columna espacio tercera columna' +
                       ' espacio cuarta columna espacio quinta columna 1' +
                       ' sexta columna menos 1 finalizar matriz punto',
                       'default');
  this.executeRuleTest(mml, 'mayúscula L igual empezar matriz 5 por 6' +
                       ' primera fila primera columna 1 segunda columna' +
                       ' menos 1 tercera columna espacio cuarta columna' +
                       ' espacio quinta columna espacio sexta columna' +
                       ' espacio segunda fila primera columna espacio' +
                       ' segunda columna 1 tercera columna menos 1 cuarta' +
                       ' columna espacio quinta columna 0 sexta columna' +
                       ' espacio tercera fila primera columna espacio' +
                       ' segunda columna espacio tercera columna espacio' +
                       ' cuarta columna espacio quinta columna espacio' +
                       ' sexta columna espacio cuarta fila primera columna' +
                       ' espacio segunda columna 0 tercera columna espacio' +
                       ' cuarta columna espacio quinta columna espacio' +
                       ' sexta columna espacio quinta fila primera columna' +
                       ' espacio segunda columna espacio tercera columna' +
                       ' espacio cuarta columna espacio quinta columna 1' +
                       ' sexta columna menos 1 finalizar matriz punto',
                       'brief');
  this.executeRuleTest(mml, 'mayúscula L igual matriz 5 por 6 primera ' +
                       ' primera columna 1 segunda columna menos 1 tercera' +
                       ' columna espacio cuarta columna espacio quinta' +
                       ' columna espacio sexta columna espacio segunda ' +
                       ' primera columna espacio segunda columna 1 tercera' +
                       ' columna menos 1 cuarta columna espacio quinta' +
                       ' columna 0 sexta columna espacio tercera  primera' +
                       ' columna espacio segunda columna espacio tercera' +
                       ' columna espacio cuarta columna espacio quinta' +
                       ' columna espacio sexta columna espacio cuarta ' +
                       ' primera columna espacio segunda columna 0 tercera' +
                       ' columna espacio cuarta columna espacio quinta' +
                       ' columna espacio sexta columna espacio quinta ' +
                       ' primera columna espacio segunda columna espacio' +
                       ' tercera columna espacio cuarta columna espacio' +
                       ' quinta columna 1 sexta columna menos 1 finalizar' +
                       ' matriz punto', 'sbrief');
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
  this.executeRuleTest(mml, 'empezar raíz cuadrada n finalizar raíz' +
                       ' cuadrada corchete izquierdo mayúscula Y barra' +
                       ' subíndice n línea base menos paréntesis izquierdo' +
                       ' mi más z subíndice beta línea base sigma' +
                       ' paréntesis derecho corchete derecho barra oblicua' +
                       ' mayúscula S subíndice n línea base tilde empezar' +
                       ' fracción mayúscula U más empezar raíz cuadrada n' +
                       ' finalizar raíz cuadrada z subíndice 1 menos beta' +
                       ' línea base entre paréntesis izquierdo ji al' +
                       ' cuadrado corchete izquierdo n menos 1 corchete' +
                       ' derecho barra oblicua paréntesis izquierdo n menos' +
                       ' 1 paréntesis derecho paréntesis derecho' +
                       ' superíndice 1 barra oblicua 2 línea base finalizar' +
                       ' fracción tilde t corchete izquierdo n menos 1' +
                       ' punto y coma empezar raíz cuadrada n finalizar' +
                       ' raíz cuadrada z subíndice 1 menos beta línea base' +
                       ' corchete derecho coma', 'default');
  this.executeRuleTest(mml, 'empezar raíz cuadrada n finalizar raíz' +
                       ' cuadrada corchete izquierdo mayúscula Y barra sub' +
                       ' n menos paréntesis izquierdo mi más z sub beta' +
                       ' sigma paréntesis derecho corchete derecho barra' +
                       ' oblicua mayúscula S sub n tilde empezar frac' +
                       ' mayúscula U más empezar raíz cuadrada n finalizar' +
                       ' raíz cuadrada z sub 1 menos beta entre paréntesis' +
                       ' izquierdo ji al cuadrado corchete izquierdo n' +
                       ' menos 1 corchete derecho barra oblicua paréntesis' +
                       ' izquierdo n menos 1 paréntesis derecho paréntesis' +
                       ' derecho sup 1 barra oblicua 2 finalizar frac tilde' +
                       ' t corchete izquierdo n menos 1 punto y coma' +
                       ' empezar raíz cuadrada n finalizar raíz cuadrada z' +
                       ' sub 1 menos beta corchete derecho coma', 'brief');
  this.executeRuleTest(mml, 'raíz cuadrada n finalizar raíz cuadrada' +
                       ' corchete izquierdo mayúscula Y barra sub n menos' +
                       ' paréntesis izquierdo mi más z sub beta sigma' +
                       ' paréntesis derecho corchete derecho barra oblicua' +
                       ' mayúscula S sub n tilde frac mayúscula U más raíz' +
                       ' cuadrada n finalizar raíz cuadrada z sub 1 menos' +
                       ' beta entre  paréntesis izquierdo ji al cuadrado' +
                       ' corchete izquierdo n menos 1 corchete derecho' +
                       ' barra oblicua paréntesis izquierdo n menos 1' +
                       ' paréntesis derecho paréntesis derecho sup 1 barra' +
                       ' oblicua 2 tilde t corchete izquierdo n menos 1' +
                       ' punto y coma raíz cuadrada n finalizar raíz' +
                       ' cuadrada z sub 1 menos beta corchete derecho coma',
                       'sbrief');
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
  this.executeRuleTest(mml, 'empezar esquema primera fila primera columna' +
                       ' gamma segunda columna igual mayúscula P llave' +
                       ' izquierda mayúscula E subíndice p coma q línea' +
                       ' base incluido en paréntesis izquierdo mayúscula X' +
                       ' subíndice paréntesis izquierdo r paréntesis' +
                       ' derecho línea base coma mayúscula X subíndice' +
                       ' paréntesis izquierdo s paréntesis derecho línea' +
                       ' base llaves derecha segunda fila primera columna' +
                       ' espacio segunda columna igual empezar fracción n' +
                       ' factorial entre paréntesis izquierdo r menos 1' +
                       ' paréntesis derecho factorial finalizar fracción' +
                       ' sumatorio bajoíndice j igual 0 sobreíndice s menos' +
                       ' r menos 1 finalizar índices paréntesis izquierdo' +
                       ' menos 1 paréntesis derecho superíndice j línea' +
                       ' base empezar fracción p superíndice r más j línea' +
                       ' base entre paréntesis izquierdo n menos r menos j' +
                       ' paréntesis derecho factorial j factorial finalizar' +
                       ' fracción mayúscula I subíndice 1 menos q línea' +
                       ' base paréntesis izquierdo n menos s más 1 coma s' +
                       ' menos r menos j paréntesis derecho punto finalizar' +
                       ' esquema', 'default');
  this.executeRuleTest(mml, 'empezar esquema primera fila primera columna' +
                       ' gamma segunda columna igual mayúscula P llave' +
                       ' izquierda mayúscula E sub p coma q incluido en' +
                       ' paréntesis izquierdo mayúscula X sub paréntesis' +
                       ' izquierdo r paréntesis derecho coma mayúscula X' +
                       ' sub paréntesis izquierdo s paréntesis derecho' +
                       ' llaves derecha segunda fila primera columna' +
                       ' espacio segunda columna igual empezar frac n' +
                       ' factorial entre paréntesis izquierdo r menos 1' +
                       ' paréntesis derecho factorial finalizar frac' +
                       ' sumatorio bajoíndice j igual 0 sobreíndice s menos' +
                       ' r menos 1 finalizar índices paréntesis izquierdo' +
                       ' menos 1 paréntesis derecho sup j empezar frac p' +
                       ' sup r más j entre paréntesis izquierdo n menos r' +
                       ' menos j paréntesis derecho factorial j factorial' +
                       ' finalizar frac mayúscula I sub 1 menos q' +
                       ' paréntesis izquierdo n menos s más 1 coma s menos' +
                       ' r menos j paréntesis derecho punto finalizar' +
                       ' esquema', 'brief');
  this.executeRuleTest(mml, 'esquema primera fila primera columna gamma' +
                       ' segunda columna igual mayúscula P llave izquierda' +
                       ' mayúscula E sub p coma q incluido en paréntesis' +
                       ' izquierdo mayúscula X sub paréntesis izquierdo r' +
                       ' paréntesis derecho coma mayúscula X sub paréntesis' +
                       ' izquierdo s paréntesis derecho llaves derecha' +
                       ' segunda fila primera columna espacio segunda' +
                       ' columna igual frac n factorial entre  paréntesis' +
                       ' izquierdo r menos 1 paréntesis derecho factorial' +
                       ' sumatorio bajoíndice j igual 0 sobreíndice s menos' +
                       ' r menos 1 finalizar índices paréntesis izquierdo' +
                       ' menos 1 paréntesis derecho sup j frac p sup r más' +
                       ' j entre  paréntesis izquierdo n menos r menos j' +
                       ' paréntesis derecho factorial j factorial mayúscula' +
                       ' I sub 1 menos q paréntesis izquierdo n menos s más' +
                       ' 1 coma s menos r menos j paréntesis derecho punto' +
                       ' finalizar esquema', 'sbrief');
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
  this.executeRuleTest(mml, 'mayúscula S subíndice i línea base empezar' +
                       ' binomial t en x finalizar binomial igual empezar' +
                       ' matriz 2 por 2 primera fila primera columna 1' +
                       ' barra oblicua m segunda columna 0 segunda fila' +
                       ' primera columna a subíndice i línea base segunda' +
                       ' columna r subíndice i línea base finalizar matriz' +
                       ' empezar binomial t en x finalizar binomial más' +
                       ' empezar binomial paréntesis izquierdo i menos 1' +
                       ' paréntesis derecho barra oblicua m en b subíndice' +
                       ' i línea base finalizar binomial coma', 'default');
  this.executeRuleTest(mml, 'mayúscula S sub i empezar binomial t en x' +
                       ' finalizar binomial igual empezar matriz 2 por 2' +
                       ' primera fila primera columna 1 barra oblicua m' +
                       ' segunda columna 0 segunda fila primera columna a' +
                       ' sub i segunda columna r sub i finalizar matriz' +
                       ' empezar binomial t en x finalizar binomial más' +
                       ' empezar binomial paréntesis izquierdo i menos 1' +
                       ' paréntesis derecho barra oblicua m en b sub i' +
                       ' finalizar binomial coma', 'brief');
  this.executeRuleTest(mml, 'mayúscula S sub i binomial t en x finalizar' +
                       ' binomial igual matriz 2 por 2 primera  primera' +
                       ' columna 1 barra oblicua m segunda columna 0' +
                       ' segunda  primera columna a sub i segunda columna r' +
                       ' sub i finalizar matriz binomial t en x finalizar' +
                       ' binomial más binomial paréntesis izquierdo i menos' +
                       ' 1 paréntesis derecho barra oblicua m en b sub i' +
                       ' finalizar binomial coma', 'sbrief');
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
  this.executeRuleTest(mml, 'c subíndice 1 línea base h superíndice 4 menos' +
                       ' 2 s línea base menor o igual que empezar fracción' +
                       ' 1 entre 2 mayúscula T finalizar fracción integral' +
                       ' definida subíndice menos mayúscula T superíndice' +
                       ' mayúscula T línea base paréntesis izquierdo f' +
                       ' paréntesis izquierdo t más h paréntesis derecho' +
                       ' menos f paréntesis izquierdo t paréntesis derecho' +
                       ' paréntesis derecho al cuadrado normal d t menor o' +
                       ' igual que c subíndice 2 línea base h superíndice 4' +
                       ' menos 2 s', 'default');
  this.executeRuleTest(mml, 'c sub 1 h sup 4 menos 2 s menor o igual que' +
                       ' empezar frac 1 entre 2 mayúscula T finalizar frac' +
                       ' integral Sub menos mayúscula T Sup mayúscula T' +
                       ' Base paréntesis izquierdo f paréntesis izquierdo t' +
                       ' más h paréntesis derecho menos f paréntesis' +
                       ' izquierdo t paréntesis derecho paréntesis derecho' +
                       ' al cuadrado normal d t menor o igual que c sub 2 h' +
                       ' sup 4 menos 2 s', 'brief');
  this.executeRuleTest(mml, 'c sub 1 h sup 4 menos 2 s menor o igual que' +
                       ' frac 1 entre  2 mayúscula T integral Sub menos' +
                       ' mayúscula T Sup mayúscula T Base paréntesis' +
                       ' izquierdo f paréntesis izquierdo t más h' +
                       ' paréntesis derecho menos f paréntesis izquierdo t' +
                       ' paréntesis derecho paréntesis derecho al cuadrado' +
                       ' normal d t menor o igual que c sub 2 h sup 4 menos' +
                       ' 2 s', 'sbrief');
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
  this.executeRuleTest(mml, 'mayúscula C paréntesis izquierdo 0 paréntesis' +
                       ' derecho menos mayúscula C paréntesis izquierdo h' +
                       ' paréntesis derecho asintóticamente igual a c h' +
                       ' superíndice 4 menos 2 s', 'default');
  this.executeRuleTest(mml, 'mayúscula C paréntesis izquierdo 0 paréntesis' +
                       ' derecho menos mayúscula C paréntesis izquierdo h' +
                       ' paréntesis derecho asintóticamente igual a c h sup' +
                       ' 4 menos 2 s', 'brief');
  this.executeRuleTest(mml, 'mayúscula C paréntesis izquierdo 0 paréntesis' +
                       ' derecho menos mayúscula C paréntesis izquierdo h' +
                       ' paréntesis derecho asintóticamente igual a c h sup' +
                       ' 4 menos 2 s', 'sbrief');
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
  this.executeRuleTest(mml, 'mayúscula S paréntesis izquierdo omega' +
                       ' paréntesis derecho igual límite bajoíndice' +
                       ' mayúscula T flecha derecha infinito finalizar' +
                       ' índices empezar fracción 1 entre 2 mayúscula T' +
                       ' finalizar fracción empezar valor absoluto integral' +
                       ' definida subíndice menos mayúscula T superíndice' +
                       ' mayúscula T línea base coma f coma paréntesis' +
                       ' izquierdo coma t coma paréntesis derecho coma' +
                       ' normal e superíndice cursiva i t omega línea base' +
                       ' coma normal d coma t finalizar valor absoluto al' +
                       ' cuadrado punto', 'default');
  this.executeRuleTest(mml, 'mayúscula S paréntesis izquierdo omega' +
                       ' paréntesis derecho igual límite bajoíndice' +
                       ' mayúscula T flecha derecha infinito finalizar' +
                       ' índices empezar frac 1 entre 2 mayúscula T' +
                       ' finalizar frac empezar valor absoluto integral Sub' +
                       ' menos mayúscula T Sup mayúscula T Base coma f coma' +
                       ' paréntesis izquierdo coma t coma paréntesis' +
                       ' derecho coma normal e sup cursiva i t omega coma' +
                       ' normal d coma t finalizar valor absoluto al' +
                       ' cuadrado punto', 'brief');
  this.executeRuleTest(mml, 'mayúscula S paréntesis izquierdo omega' +
                       ' paréntesis derecho igual límite bajoíndice' +
                       ' mayúscula T flecha derecha infinito finalizar' +
                       ' índices frac 1 entre  2 mayúscula T valor absoluto' +
                       ' integral Sub menos mayúscula T Sup mayúscula T' +
                       ' Base coma f coma paréntesis izquierdo coma t coma' +
                       ' paréntesis derecho coma normal e sup cursiva i t' +
                       ' omega coma normal d coma t finalizar valor' +
                       ' absoluto al cuadrado punto', 'sbrief');
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
  this.executeRuleTest(mml, 'integral definida subíndice 0 superíndice 1' +
                       ' línea base integral definida subíndice 0' +
                       ' superíndice 1 línea base corchete izquierdo' +
                       ' empezar valor absoluto f paréntesis izquierdo t' +
                       ' paréntesis derecho menos f paréntesis izquierdo u' +
                       ' paréntesis derecho finalizar valor absoluto al' +
                       ' cuadrado más empezar valor absoluto t menos u' +
                       ' finalizar valor absoluto al cuadrado corchete' +
                       ' derecho superíndice menos s barra oblicua 2 línea' +
                       ' base normal d t normal d u menor que infinito',
                       'default');
  this.executeRuleTest(mml, 'integral Sub 0 Sup 1 Base integral Sub 0 Sup 1' +
                       ' Base corchete izquierdo empezar valor absoluto f' +
                       ' paréntesis izquierdo t paréntesis derecho menos f' +
                       ' paréntesis izquierdo u paréntesis derecho' +
                       ' finalizar valor absoluto al cuadrado más empezar' +
                       ' valor absoluto t menos u finalizar valor absoluto' +
                       ' al cuadrado corchete derecho sup menos s barra' +
                       ' oblicua 2 normal d t normal d u menor que infinito',
                       'brief');
  this.executeRuleTest(mml, 'integral Sub 0 Sup 1 Base integral Sub 0 Sup 1' +
                       ' Base corchete izquierdo valor absoluto f' +
                       ' paréntesis izquierdo t paréntesis derecho menos f' +
                       ' paréntesis izquierdo u paréntesis derecho' +
                       ' finalizar valor absoluto al cuadrado más valor' +
                       ' absoluto t menos u finalizar valor absoluto al' +
                       ' cuadrado corchete derecho sup menos s barra' +
                       ' oblicua 2 normal d t normal d u menor que' +
                       ' infinito', 'sbrief');
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
  this.executeRuleTest(mml, 'sans-serif mayúscula E paréntesis izquierdo' +
                       ' sumatorio bajoíndice mayúscula I perteneciente a' +
                       ' mayúscula E subíndice k más 1 línea base finalizar' +
                       ' índices empezar valor absoluto mayúscula I' +
                       ' finalizar valor absoluto superíndice s línea base' +
                       ' paréntesis derecho igual sans-serif mayúscula E' +
                       ' paréntesis izquierdo sumatorio bajoíndice' +
                       ' mayúscula I perteneciente a mayúscula E subíndice' +
                       ' k línea base finalizar índices empezar valor' +
                       ' absoluto mayúscula I finalizar valor absoluto' +
                       ' superíndice s línea base paréntesis derecho' +
                       ' sans-serif mayúscula E paréntesis izquierdo' +
                       ' mayúscula R subíndice 1 superíndice s línea base' +
                       ' más mayúscula R subíndice 2 superíndice s línea' +
                       ' base paréntesis derecho punto', 'default');
  this.executeRuleTest(mml, 'sans-serif mayúscula E paréntesis izquierdo' +
                       ' sumatorio bajoíndice mayúscula I perteneciente a' +
                       ' mayúscula E sub k más 1 finalizar índices empezar' +
                       ' valor absoluto mayúscula I finalizar valor' +
                       ' absoluto sup s paréntesis derecho igual sans-serif' +
                       ' mayúscula E paréntesis izquierdo sumatorio' +
                       ' bajoíndice mayúscula I perteneciente a mayúscula E' +
                       ' sub k finalizar índices empezar valor absoluto' +
                       ' mayúscula I finalizar valor absoluto sup s' +
                       ' paréntesis derecho sans-serif mayúscula E' +
                       ' paréntesis izquierdo mayúscula R sub 1 sup s más' +
                       ' mayúscula R sub 2 sup s paréntesis derecho punto',
                       'brief');
  this.executeRuleTest(mml, 'sans-serif mayúscula E paréntesis izquierdo' +
                       ' sumatorio bajoíndice mayúscula I perteneciente a' +
                       ' mayúscula E sub k más 1 finalizar índices valor' +
                       ' absoluto mayúscula I finalizar valor absoluto sup' +
                       ' s paréntesis derecho igual sans-serif mayúscula E' +
                       ' paréntesis izquierdo sumatorio bajoíndice' +
                       ' mayúscula I perteneciente a mayúscula E sub k' +
                       ' finalizar índices valor absoluto mayúscula I' +
                       ' finalizar valor absoluto sup s paréntesis derecho' +
                       ' sans-serif mayúscula E paréntesis izquierdo' +
                       ' mayúscula R sub 1 sup s más mayúscula R sub 2 sup' +
                       ' s paréntesis derecho punto', 'sbrief');
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
  this.executeRuleTest(mml, 'paréntesis izquierdo x subíndice 1 línea base' +
                       ' coma y subíndice 1 línea base paréntesis derecho',
                       'default');
  this.executeRuleTest(mml, 'paréntesis izquierdo x sub 1 coma y sub 1' +
                       ' paréntesis derecho', 'brief');
  this.executeRuleTest(mml, 'paréntesis izquierdo x sub 1 coma y sub 1' +
                       ' paréntesis derecho', 'sbrief');
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
  this.executeRuleTest(mml, 'paréntesis izquierdo x subíndice 2 línea base' +
                       ' coma y subíndice 2 línea base paréntesis derecho',
                       'default');
  this.executeRuleTest(mml, 'paréntesis izquierdo x sub 2 coma y sub 2' +
                       ' paréntesis derecho', 'brief');
  this.executeRuleTest(mml, 'paréntesis izquierdo x sub 2 coma y sub 2' +
                       ' paréntesis derecho', 'sbrief');
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
  this.executeRuleTest(mml, 'd igual empezar raíz cuadrada paréntesis' +
                       ' izquierdo x subíndice 2 línea base menos x' +
                       ' subíndice 1 línea base paréntesis derecho al' +
                       ' cuadrado más paréntesis izquierdo y subíndice 2' +
                       ' línea base menos y subíndice 1 línea base' +
                       ' paréntesis derecho al cuadrado finalizar raíz' +
                       ' cuadrada', 'default');
  this.executeRuleTest(mml, 'd igual empezar raíz cuadrada paréntesis' +
                       ' izquierdo x sub 2 menos x sub 1 paréntesis derecho' +
                       ' al cuadrado más paréntesis izquierdo y sub 2 menos' +
                       ' y sub 1 paréntesis derecho al cuadrado finalizar' +
                       ' raíz cuadrada', 'brief');
  this.executeRuleTest(mml, 'd igual raíz cuadrada paréntesis izquierdo x' +
                       ' sub 2 menos x sub 1 paréntesis derecho al cuadrado' +
                       ' más paréntesis izquierdo y sub 2 menos y sub 1' +
                       ' paréntesis derecho al cuadrado finalizar raíz' +
                       ' cuadrada', 'sbrief');
};


/**
 * Testing Sample 74
 */
sre.NobleSpanishTest.prototype.testSample_74 = function() {
  var mml = '<mi>&#x211D;</mi>';
  this.executeRuleTest(mml, 'negrita de pizarra mayúscula R', 'default');
  this.executeRuleTest(mml, 'negrita de pizarra mayúscula R', 'brief');
  this.executeRuleTest(mml, 'negrita de pizarra mayúscula R', 'sbrief');
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
  this.executeRuleTest(mml, 'negrita de pizarra mayúscula R igual' +
                       ' paréntesis izquierdo menos infinito coma infinito' +
                       ' paréntesis derecho', 'default');
  this.executeRuleTest(mml, 'negrita de pizarra mayúscula R igual' +
                       ' paréntesis izquierdo menos infinito coma infinito' +
                       ' paréntesis derecho', 'brief');
  this.executeRuleTest(mml, 'negrita de pizarra mayúscula R igual' +
                       ' paréntesis izquierdo menos infinito coma infinito' +
                       ' paréntesis derecho', 'sbrief');
};


/**
 * Testing Sample 76
 */
sre.NobleSpanishTest.prototype.testSample_76 = function() {
  var mml = '<mrow><mrow><mo>{</mo> <mrow>' +
      '<mn>1</mn><mo>,</mo><mn>2</mn><mo>,</mo><mn>3</mn></mrow> <mo>}</mo>' +
      '</mrow></mrow>';
  this.executeRuleTest(mml, 'empezar llave 1 coma 2 coma 3 finalizar' +
                       ' llave', 'default');
  this.executeRuleTest(mml, 'empezar llave 1 coma 2 coma 3 finalizar' +
                       ' llave', 'brief');
  this.executeRuleTest(mml, 'llave 1 coma 2 coma 3 finalizar llave', 'sbrief');
};


/**
 * Testing Sample 77
 */
sre.NobleSpanishTest.prototype.testSample_77 = function() {
  var mml = '<mrow>' +
      '<mn>1</mn><mo>&#x2208;</mo><mi>S</mi></mrow>';
  this.executeRuleTest(mml, '1 perteneciente a mayúscula S', 'default');
  this.executeRuleTest(mml, '1 perteneciente a mayúscula S', 'brief');
  this.executeRuleTest(mml, '1 perteneciente a mayúscula S', 'sbrief');
};


/**
 * Testing Sample 78
 */
sre.NobleSpanishTest.prototype.testSample_78 = function() {
  var mml = '<mrow>' +
      '<mn>3</mn><mo>&#x2208;</mo><mi>S</mi></mrow>';
  this.executeRuleTest(mml, '3 perteneciente a mayúscula S', 'default');
  this.executeRuleTest(mml, '3 perteneciente a mayúscula S', 'brief');
  this.executeRuleTest(mml, '3 perteneciente a mayúscula S', 'sbrief');
};


/**
 * Testing Sample 79
 */
sre.NobleSpanishTest.prototype.testSample_79 = function() {
  var mml = '<mrow>' +
      '<mn>4</mn><mo>&#x2209;</mo><mi>S</mi></mrow>';
  this.executeRuleTest(mml, '4 no perteneciente a mayúscula S', 'default');
  this.executeRuleTest(mml, '4 no perteneciente a mayúscula S', 'brief');
  this.executeRuleTest(mml, '4 no perteneciente a mayúscula S', 'sbrief');
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
  this.executeRuleTest(mml, 'a igual empezar raíz cuadrada 3 x menos 1' +
                       ' finalizar raíz cuadrada más paréntesis izquierdo 1' +
                       ' más x paréntesis derecho al cuadrado', 'default');
  this.executeRuleTest(mml, 'a igual empezar raíz cuadrada 3 x menos 1' +
                       ' finalizar raíz cuadrada más paréntesis izquierdo 1' +
                       ' más x paréntesis derecho al cuadrado', 'brief');
  this.executeRuleTest(mml, 'a igual raíz cuadrada 3 x menos 1 finalizar' +
                       ' raíz cuadrada más paréntesis izquierdo 1 más x' +
                       ' paréntesis derecho al cuadrado', 'sbrief');
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
  this.executeRuleTest(mml, 'a igual empezar fracción paréntesis izquierdo' +
                       ' b más c paréntesis derecho al cuadrado entre d' +
                       ' finalizar fracción más empezar fracción paréntesis' +
                       ' izquierdo e más f paréntesis derecho al cuadrado' +
                       ' entre g finalizar fracción', 'default');
  this.executeRuleTest(mml, 'a igual empezar frac paréntesis izquierdo b' +
                       ' más c paréntesis derecho al cuadrado entre d' +
                       ' finalizar frac más empezar frac paréntesis' +
                       ' izquierdo e más f paréntesis derecho al cuadrado' +
                       ' entre g finalizar frac', 'brief');
  this.executeRuleTest(mml, 'a igual frac paréntesis izquierdo b más c' +
                       ' paréntesis derecho al cuadrado entre  d más frac' +
                       ' paréntesis izquierdo e más f paréntesis derecho al' +
                       ' cuadrado entre  g', 'sbrief');
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
  this.executeRuleTest(mml, 'x igual corchete izquierdo paréntesis' +
                       ' izquierdo a más b paréntesis derecho al cuadrado' +
                       ' paréntesis izquierdo c menos b paréntesis derecho' +
                       ' al cuadrado corchete derecho más corchete' +
                       ' izquierdo paréntesis izquierdo d más e paréntesis' +
                       ' derecho al cuadrado paréntesis izquierdo f menos e' +
                       ' paréntesis derecho al cuadrado corchete derecho',
                       'default');
  this.executeRuleTest(mml, 'x igual corchete izquierdo paréntesis' +
                       ' izquierdo a más b paréntesis derecho al cuadrado' +
                       ' paréntesis izquierdo c menos b paréntesis derecho' +
                       ' al cuadrado corchete derecho más corchete' +
                       ' izquierdo paréntesis izquierdo d más e paréntesis' +
                       ' derecho al cuadrado paréntesis izquierdo f menos e' +
                       ' paréntesis derecho al cuadrado corchete derecho',
                       'brief');
  this.executeRuleTest(mml, 'x igual corchete izquierdo paréntesis' +
                       ' izquierdo a más b paréntesis derecho al cuadrado' +
                       ' paréntesis izquierdo c menos b paréntesis derecho' +
                       ' al cuadrado corchete derecho más corchete' +
                       ' izquierdo paréntesis izquierdo d más e paréntesis' +
                       ' derecho al cuadrado paréntesis izquierdo f menos e' +
                       ' paréntesis derecho al cuadrado corchete derecho',
                       'sbrief');
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
  this.executeRuleTest(mml, 'x igual corchete izquierdo paréntesis' +
                       ' izquierdo a más b paréntesis derecho al cuadrado' +
                       ' corchete derecho más corchete izquierdo paréntesis' +
                       ' izquierdo f menos e paréntesis derecho al cuadrado' +
                       ' corchete derecho', 'default');
  this.executeRuleTest(mml, 'x igual corchete izquierdo paréntesis' +
                       ' izquierdo a más b paréntesis derecho al cuadrado' +
                       ' corchete derecho más corchete izquierdo paréntesis' +
                       ' izquierdo f menos e paréntesis derecho al cuadrado' +
                       ' corchete derecho', 'brief');
  this.executeRuleTest(mml, 'x igual corchete izquierdo paréntesis' +
                       ' izquierdo a más b paréntesis derecho al cuadrado' +
                       ' corchete derecho más corchete izquierdo paréntesis' +
                       ' izquierdo f menos e paréntesis derecho al cuadrado' +
                       ' corchete derecho', 'sbrief');
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
  this.executeRuleTest(mml, 'x igual corchete izquierdo paréntesis' +
                       ' izquierdo a más b paréntesis derecho al cuadrado' +
                       ' corchete derecho', 'default');
  this.executeRuleTest(mml, 'x igual corchete izquierdo paréntesis' +
                       ' izquierdo a más b paréntesis derecho al cuadrado' +
                       ' corchete derecho', 'brief');
  this.executeRuleTest(mml, 'x igual corchete izquierdo paréntesis' +
                       ' izquierdo a más b paréntesis derecho al cuadrado' +
                       ' corchete derecho', 'sbrief');
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
  this.executeRuleTest(mml, 'x igual paréntesis izquierdo a más b' +
                       ' paréntesis derecho al cuadrado', 'default');
  this.executeRuleTest(mml, 'x igual paréntesis izquierdo a más b' +
                       ' paréntesis derecho al cuadrado', 'brief');
  this.executeRuleTest(mml, 'x igual paréntesis izquierdo a más b' +
                       ' paréntesis derecho al cuadrado', 'sbrief');
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
  this.executeRuleTest(mml, 'x igual a más b al cuadrado', 'default');
  this.executeRuleTest(mml, 'x igual a más b al cuadrado', 'brief');
  this.executeRuleTest(mml, 'x igual a más b al cuadrado', 'sbrief');
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
  this.executeRuleTest(mml, 'empezar empezar fracción empezar fracción 1' +
                       ' entre 2 finalizar fracción entre entre empezar' +
                       ' fracción 3 entre 4 finalizar fracción finalizar' +
                       ' finalizar fracción igual empezar fracción 2 entre' +
                       ' 3 finalizar fracción', 'default');
  this.executeRuleTest(mml, 'empezar empezar frac empezar frac 1 entre 2' +
                       ' finalizar frac entre entre empezar frac 3 entre 4' +
                       ' finalizar frac finalizar finalizar frac igual' +
                       ' empezar frac 2 entre 3 finalizar frac', 'brief');
  this.executeRuleTest(mml, 'frac frac 1 entre  2 sobre frac 3 entre  4' +
                       ' igual frac 2 entre  3', 'sbrief');
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
  this.executeRuleTest(mml, '2 paréntesis izquierdo paréntesis izquierdo x' +
                       ' más 1 paréntesis derecho paréntesis izquierdo x' +
                       ' más 3 paréntesis derecho menos 4 paréntesis' +
                       ' izquierdo paréntesis izquierdo x menos 1' +
                       ' paréntesis derecho paréntesis izquierdo x más 2' +
                       ' paréntesis derecho menos 3 paréntesis derecho' +
                       ' paréntesis derecho igual y', 'default');
  this.executeRuleTest(mml, '2 paréntesis izquierdo paréntesis izquierdo x' +
                       ' más 1 paréntesis derecho paréntesis izquierdo x' +
                       ' más 3 paréntesis derecho menos 4 paréntesis' +
                       ' izquierdo paréntesis izquierdo x menos 1' +
                       ' paréntesis derecho paréntesis izquierdo x más 2' +
                       ' paréntesis derecho menos 3 paréntesis derecho' +
                       ' paréntesis derecho igual y', 'brief');
  this.executeRuleTest(mml, '2 paréntesis izquierdo paréntesis izquierdo x' +
                       ' más 1 paréntesis derecho paréntesis izquierdo x' +
                       ' más 3 paréntesis derecho menos 4 paréntesis' +
                       ' izquierdo paréntesis izquierdo x menos 1' +
                       ' paréntesis derecho paréntesis izquierdo x más 2' +
                       ' paréntesis derecho menos 3 paréntesis derecho' +
                       ' paréntesis derecho igual y', 'sbrief');
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
  this.executeRuleTest(mml, 'coseno x igual 1 menos empezar fracción x al' +
                       ' cuadrado entre 2 factorial finalizar fracción más' +
                       ' empezar fracción x superíndice 4 línea base entre' +
                       ' 4 factorial finalizar fracción menos puntos' +
                       ' suspensivos', 'default');
  this.executeRuleTest(mml, 'coseno x igual 1 menos empezar frac x al' +
                       ' cuadrado entre 2 factorial finalizar frac más' +
                       ' empezar frac x sup 4 entre 4 factorial finalizar' +
                       ' frac menos puntos suspensivos', 'brief');
  this.executeRuleTest(mml, 'coseno x igual 1 menos frac x al cuadrado' +
                       ' entre  2 factorial más frac x sup 4 entre  4' +
                       ' factorial menos puntos suspensivos', 'sbrief');
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
  this.executeRuleTest(mml, 'x igual empezar fracción menos b más menos' +
                       ' empezar raíz cuadrada b al cuadrado menos 4 a c' +
                       ' finalizar raíz cuadrada entre 2 a finalizar' +
                       ' fracción', 'default');
  this.executeRuleTest(mml, 'x igual empezar frac menos b más menos empezar' +
                       ' raíz cuadrada b al cuadrado menos 4 a c finalizar' +
                       ' raíz cuadrada entre 2 a finalizar frac', 'brief');
  this.executeRuleTest(mml, 'x igual frac menos b más menos raíz cuadrada b' +
                       ' al cuadrado menos 4 a c finalizar raíz cuadrada' +
                       ' entre  2 a', 'sbrief');
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
  this.executeRuleTest(mml, 'x más y superíndice empezar fracción 2 entre k' +
                       ' más 1 finalizar fracción', 'default');
  this.executeRuleTest(mml, 'x más y sup empezar frac 2 entre k más 1' +
                       ' finalizar frac', 'brief');
  this.executeRuleTest(mml, 'x más y sup frac 2 entre  k más 1', 'sbrief');
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
  this.executeRuleTest(mml, 'límite bajoíndice x flecha derecha 0 finalizar' +
                       ' índices empezar fracción seno x entre x finalizar' +
                       ' fracción igual 1', 'default');
  this.executeRuleTest(mml, 'límite bajoíndice x flecha derecha 0 finalizar' +
                       ' índices empezar frac seno x entre x finalizar frac' +
                       ' igual 1', 'brief');
  this.executeRuleTest(mml, 'límite bajoíndice x flecha derecha 0 finalizar' +
                       ' índices frac seno x entre  x igual 1', 'sbrief');
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
  this.executeRuleTest(mml, 'd igual empezar raíz cuadrada paréntesis' +
                       ' izquierdo x subíndice 2 línea base menos x' +
                       ' subíndice 1 línea base paréntesis derecho al' +
                       ' cuadrado más paréntesis izquierdo y subíndice 2' +
                       ' línea base menos y subíndice 1 línea base' +
                       ' paréntesis derecho al cuadrado finalizar raíz' +
                       ' cuadrada', 'default');
  this.executeRuleTest(mml, 'd igual empezar raíz cuadrada paréntesis' +
                       ' izquierdo x sub 2 menos x sub 1 paréntesis derecho' +
                       ' al cuadrado más paréntesis izquierdo y sub 2 menos' +
                       ' y sub 1 paréntesis derecho al cuadrado finalizar' +
                       ' raíz cuadrada', 'brief');
  this.executeRuleTest(mml, 'd igual raíz cuadrada paréntesis izquierdo x' +
                       ' sub 2 menos x sub 1 paréntesis derecho al cuadrado' +
                       ' más paréntesis izquierdo y sub 2 menos y sub 1' +
                       ' paréntesis derecho al cuadrado finalizar raíz' +
                       ' cuadrada', 'sbrief');
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
  this.executeRuleTest(mml, 'mayúscula F subíndice n línea base igual' +
                       ' mayúscula F subíndice n menos 1 línea base más' +
                       ' mayúscula F subíndice n menos 2', 'default');
  this.executeRuleTest(mml, 'mayúscula F sub n igual mayúscula F sub n' +
                       ' menos 1 más mayúscula F sub n menos 2', 'brief');
  this.executeRuleTest(mml, 'mayúscula F sub n igual mayúscula F sub n' +
                       ' menos 1 más mayúscula F sub n menos 2', 'sbrief');
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
  this.executeRuleTest(mml, 'negrita mayúscula Pi igual empezar matriz 6' +
                       ' por 6 primera fila primera columna pi subíndice 11' +
                       ' línea base segunda columna pi subíndice 12 línea' +
                       ' base tercera columna pi subíndice 12 línea base' +
                       ' cuarta columna 0 quinta columna 0 sexta columna 0' +
                       ' segunda fila primera columna pi subíndice 12 línea' +
                       ' base segunda columna pi subíndice 11 línea base' +
                       ' tercera columna pi subíndice 12 línea base cuarta' +
                       ' columna 0 quinta columna 0 sexta columna 0 tercera' +
                       ' fila primera columna pi subíndice 12 línea base' +
                       ' segunda columna pi subíndice 12 línea base tercera' +
                       ' columna pi subíndice 11 línea base cuarta columna' +
                       ' 0 quinta columna 0 sexta columna 0 cuarta fila' +
                       ' primera columna 0 segunda columna 0 tercera' +
                       ' columna 0 cuarta columna pi subíndice 44 línea' +
                       ' base quinta columna 0 sexta columna 0 quinta fila' +
                       ' primera columna 0 segunda columna 0 tercera' +
                       ' columna 0 cuarta columna 0 quinta columna pi' +
                       ' subíndice 44 línea base sexta columna 0 sexta fila' +
                       ' primera columna 0 segunda columna 0 tercera' +
                       ' columna 0 cuarta columna 0 quinta columna 0 sexta' +
                       ' columna pi subíndice 44 finalizar matriz', 'default');
  this.executeRuleTest(mml, 'negrita mayúscula Pi igual empezar matriz 6' +
                       ' por 6 primera fila primera columna pi sub 11' +
                       ' segunda columna pi sub 12 tercera columna pi sub' +
                       ' 12 cuarta columna 0 quinta columna 0 sexta columna' +
                       ' 0 segunda fila primera columna pi sub 12 segunda' +
                       ' columna pi sub 11 tercera columna pi sub 12 cuarta' +
                       ' columna 0 quinta columna 0 sexta columna 0 tercera' +
                       ' fila primera columna pi sub 12 segunda columna pi' +
                       ' sub 12 tercera columna pi sub 11 cuarta columna 0' +
                       ' quinta columna 0 sexta columna 0 cuarta fila' +
                       ' primera columna 0 segunda columna 0 tercera' +
                       ' columna 0 cuarta columna pi sub 44 quinta columna' +
                       ' 0 sexta columna 0 quinta fila primera columna 0' +
                       ' segunda columna 0 tercera columna 0 cuarta columna' +
                       ' 0 quinta columna pi sub 44 sexta columna 0 sexta' +
                       ' fila primera columna 0 segunda columna 0 tercera' +
                       ' columna 0 cuarta columna 0 quinta columna 0 sexta' +
                       ' columna pi sub 44 finalizar matriz', 'brief');
  this.executeRuleTest(mml, 'negrita mayúscula Pi igual matriz 6 por 6' +
                       ' primera  primera columna pi sub 11 segunda columna' +
                       ' pi sub 12 tercera columna pi sub 12 cuarta columna' +
                       ' 0 quinta columna 0 sexta columna 0 segunda ' +
                       ' primera columna pi sub 12 segunda columna pi sub' +
                       ' 11 tercera columna pi sub 12 cuarta columna 0' +
                       ' quinta columna 0 sexta columna 0 tercera  primera' +
                       ' columna pi sub 12 segunda columna pi sub 12' +
                       ' tercera columna pi sub 11 cuarta columna 0 quinta' +
                       ' columna 0 sexta columna 0 cuarta  primera columna' +
                       ' 0 segunda columna 0 tercera columna 0 cuarta' +
                       ' columna pi sub 44 quinta columna 0 sexta columna 0' +
                       ' quinta  primera columna 0 segunda columna 0' +
                       ' tercera columna 0 cuarta columna 0 quinta columna' +
                       ' pi sub 44 sexta columna 0 sexta  primera columna 0' +
                       ' segunda columna 0 tercera columna 0 cuarta columna' +
                       ' 0 quinta columna 0 sexta columna pi sub 44' +
                       ' finalizar matriz', 'sbrief');
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
  this.executeRuleTest(mml, 's subíndice 11 línea base igual empezar' +
                       ' fracción c subíndice 11 línea base más c subíndice' +
                       ' 12 línea base entre paréntesis izquierdo c' +
                       ' subíndice 11 línea base menos c subíndice 12 línea' +
                       ' base paréntesis derecho paréntesis izquierdo c' +
                       ' subíndice 11 línea base más 2 c subíndice 12 línea' +
                       ' base paréntesis derecho finalizar fracción',
                       'default');
  this.executeRuleTest(mml, 's sub 11 igual empezar frac c sub 11 más c sub' +
                       ' 12 entre paréntesis izquierdo c sub 11 menos c sub' +
                       ' 12 paréntesis derecho paréntesis izquierdo c sub' +
                       ' 11 más 2 c sub 12 paréntesis derecho finalizar' +
                       ' frac', 'brief');
  this.executeRuleTest(mml, 's sub 11 igual frac c sub 11 más c sub 12' +
                       ' entre  paréntesis izquierdo c sub 11 menos c sub' +
                       ' 12 paréntesis derecho paréntesis izquierdo c sub' +
                       ' 11 más 2 c sub 12 paréntesis derecho', 'sbrief');
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
  this.executeRuleTest(mml, 'mayúscula S i normal mayúscula O subíndice 2' +
                       ' línea base más 6 normal mayúscula H normal' +
                       ' mayúscula F flecha derecha normal mayúscula H' +
                       ' subíndice 2 línea base mayúscula S i normal' +
                       ' mayúscula F subíndice 6 línea base más 2 normal' +
                       ' mayúscula H subíndice 2 línea base normal' +
                       ' mayúscula O', 'default');
  this.executeRuleTest(mml, 'mayúscula S i normal mayúscula O sub 2 más 6' +
                       ' normal mayúscula H normal mayúscula F flecha' +
                       ' derecha normal mayúscula H sub 2 mayúscula S i' +
                       ' normal mayúscula F sub 6 más 2 normal mayúscula H' +
                       ' sub 2 normal mayúscula O', 'brief');
  this.executeRuleTest(mml, 'mayúscula S i normal mayúscula O sub 2 más 6' +
                       ' normal mayúscula H normal mayúscula F flecha' +
                       ' derecha normal mayúscula H sub 2 mayúscula S i' +
                       ' normal mayúscula F sub 6 más 2 normal mayúscula H' +
                       ' sub 2 normal mayúscula O', 'sbrief');
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
  this.executeRuleTest(mml, 'empezar fracción d entre d x finalizar' +
                       ' fracción paréntesis izquierdo mayúscula E' +
                       ' paréntesis izquierdo x paréntesis derecho' +
                       ' mayúscula A paréntesis izquierdo x paréntesis' +
                       ' derecho empezar fracción d w paréntesis izquierdo' +
                       ' x paréntesis derecho entre d x finalizar fracción' +
                       ' paréntesis derecho más p paréntesis izquierdo x' +
                       ' paréntesis derecho igual 0', 'default');
  this.executeRuleTest(mml, 'empezar frac d entre d x finalizar frac' +
                       ' paréntesis izquierdo mayúscula E paréntesis' +
                       ' izquierdo x paréntesis derecho mayúscula A' +
                       ' paréntesis izquierdo x paréntesis derecho empezar' +
                       ' frac d w paréntesis izquierdo x paréntesis derecho' +
                       ' entre d x finalizar frac paréntesis derecho más p' +
                       ' paréntesis izquierdo x paréntesis derecho igual' +
                       ' 0', 'brief');
  this.executeRuleTest(mml, 'frac d entre  d x paréntesis izquierdo' +
                       ' mayúscula E paréntesis izquierdo x paréntesis' +
                       ' derecho mayúscula A paréntesis izquierdo x' +
                       ' paréntesis derecho frac d w paréntesis izquierdo x' +
                       ' paréntesis derecho entre  d x paréntesis derecho' +
                       ' más p paréntesis izquierdo x paréntesis derecho' +
                       ' igual 0', 'sbrief');
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
  this.executeRuleTest(mml, 'TCS subíndice gas línea base igual menos' +
                       ' empezar fracción 1 entre 2 finalizar fracción' +
                       ' paréntesis izquierdo empezar fracción mayúscula P' +
                       ' subíndice seal línea base entre mayúscula P' +
                       ' subíndice max línea base finalizar fracción' +
                       ' paréntesis derecho paréntesis izquierdo empezar' +
                       ' fracción 1 entre mayúscula T subíndice seal línea' +
                       ' base finalizar fracción paréntesis derecho',
                       'default');
  this.executeRuleTest(mml, 'TCS sub gas igual menos empezar frac 1 entre 2' +
                       ' finalizar frac paréntesis izquierdo empezar frac' +
                       ' mayúscula P sub seal entre mayúscula P sub max' +
                       ' finalizar frac paréntesis derecho paréntesis' +
                       ' izquierdo empezar frac 1 entre mayúscula T sub' +
                       ' seal finalizar frac paréntesis derecho', 'brief');
  this.executeRuleTest(mml, 'TCS sub gas igual menos frac 1 entre  2' +
                       ' paréntesis izquierdo frac mayúscula P sub seal' +
                       ' entre  mayúscula P sub max paréntesis derecho' +
                       ' paréntesis izquierdo frac 1 entre  mayúscula T sub' +
                       ' seal paréntesis derecho', 'sbrief');
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
  this.executeRuleTest(mml, 'mayúscula B subíndice p línea base igual' +
                       ' empezar empezar fracción empezar fracción 7 menos' +
                       ' v al cuadrado entre 3 finalizar fracción' +
                       ' paréntesis izquierdo 1 más empezar fracción c al' +
                       ' cuadrado entre a al cuadrado finalizar fracción' +
                       ' más empezar fracción c superíndice 4 línea base' +
                       ' entre a superíndice 4 línea base finalizar' +
                       ' fracción paréntesis derecho más empezar fracción' +
                       ' paréntesis izquierdo 3 menos v paréntesis derecho' +
                       ' al cuadrado c al cuadrado entre paréntesis' +
                       ' izquierdo 1 más v paréntesis derecho a al cuadrado' +
                       ' finalizar fracción entre entre paréntesis' +
                       ' izquierdo 1 menos v paréntesis derecho paréntesis' +
                       ' izquierdo 1 menos empezar fracción c superíndice 4' +
                       ' línea base entre a superíndice 4 línea base' +
                       ' finalizar fracción paréntesis derecho paréntesis' +
                       ' izquierdo 1 menos empezar fracción c al cuadrado' +
                       ' entre a al cuadrado finalizar fracción paréntesis' +
                       ' derecho finalizar finalizar fracción', 'default');
  this.executeRuleTest(mml, 'mayúscula B sub p igual empezar empezar frac' +
                       ' empezar frac 7 menos v al cuadrado entre 3' +
                       ' finalizar frac paréntesis izquierdo 1 más empezar' +
                       ' frac c al cuadrado entre a al cuadrado finalizar' +
                       ' frac más empezar frac c sup 4 entre a sup 4' +
                       ' finalizar frac paréntesis derecho más empezar frac' +
                       ' paréntesis izquierdo 3 menos v paréntesis derecho' +
                       ' al cuadrado c al cuadrado entre paréntesis' +
                       ' izquierdo 1 más v paréntesis derecho a al cuadrado' +
                       ' finalizar frac entre entre paréntesis izquierdo 1' +
                       ' menos v paréntesis derecho paréntesis izquierdo 1' +
                       ' menos empezar frac c sup 4 entre a sup 4 finalizar' +
                       ' frac paréntesis derecho paréntesis izquierdo 1' +
                       ' menos empezar frac c al cuadrado entre a al' +
                       ' cuadrado finalizar frac paréntesis derecho' +
                       ' finalizar finalizar frac', 'brief');
  this.executeRuleTest(mml, 'mayúscula B sub p igual frac frac 7 menos v al' +
                       ' cuadrado entre  3 paréntesis izquierdo 1 más frac' +
                       ' c al cuadrado entre  a al cuadrado más frac c sup' +
                       ' 4 entre  a sup 4 paréntesis derecho más frac' +
                       ' paréntesis izquierdo 3 menos v paréntesis derecho' +
                       ' al cuadrado c al cuadrado entre  paréntesis' +
                       ' izquierdo 1 más v paréntesis derecho a al cuadrado' +
                       ' sobre paréntesis izquierdo 1 menos v paréntesis' +
                       ' derecho paréntesis izquierdo 1 menos frac c sup 4' +
                       ' entre  a sup 4 paréntesis derecho paréntesis' +
                       ' izquierdo 1 menos frac c al cuadrado entre  a al' +
                       ' cuadrado paréntesis derecho', 'sbrief');
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
  this.executeRuleTest(mml, 'mayúscula Q subíndice tank superíndice series' +
                       ' línea base igual empezar fracción 1 entre' +
                       ' mayúscula R subíndice s línea base finalizar' +
                       ' fracción empezar raíz cuadrada empezar fracción' +
                       ' mayúscula L subíndice s línea base entre mayúscula' +
                       ' C subíndice s línea base finalizar fracción' +
                       ' finalizar raíz cuadrada', 'default');
  this.executeRuleTest(mml, 'mayúscula Q sub tank sup series igual empezar' +
                       ' frac 1 entre mayúscula R sub s finalizar frac' +
                       ' empezar raíz cuadrada empezar frac mayúscula L sub' +
                       ' s entre mayúscula C sub s finalizar frac finalizar' +
                       ' raíz cuadrada', 'brief');
  this.executeRuleTest(mml, 'mayúscula Q sub tank sup series igual frac 1' +
                       ' entre  mayúscula R sub s raíz cuadrada frac' +
                       ' mayúscula L sub s entre  mayúscula C sub s' +
                       ' finalizar raíz cuadrada', 'sbrief');
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
  this.executeRuleTest(mml, 'mayúscula Delta phi recta subíndice peak línea' +
                       ' base igual tangente superíndice menos 1 línea base' +
                       ' paréntesis izquierdo k al cuadrado mayúscula Q' +
                       ' subíndice tank superíndice series línea base' +
                       ' paréntesis derecho', 'default');
  this.executeRuleTest(mml, 'mayúscula Delta phi recta sub peak igual' +
                       ' tangente sup menos 1 paréntesis izquierdo k al' +
                       ' cuadrado mayúscula Q sub tank sup series' +
                       ' paréntesis derecho', 'brief');
  this.executeRuleTest(mml, 'mayúscula Delta phi recta sub peak igual' +
                       ' tangente sup menos 1 paréntesis izquierdo k al' +
                       ' cuadrado mayúscula Q sub tank sup series' +
                       ' paréntesis derecho', 'sbrief');
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
  this.executeRuleTest(mml, 'f igual 1,013 empezar fracción mayúscula W' +
                       ' entre mayúscula L al cuadrado finalizar fracción' +
                       ' empezar raíz cuadrada empezar fracción mayúscula E' +
                       ' entre rho finalizar fracción finalizar raíz' +
                       ' cuadrada empezar raíz cuadrada paréntesis' +
                       ' izquierdo 1 más 0,293 empezar fracción mayúscula L' +
                       ' al cuadrado entre EW al cuadrado finalizar' +
                       ' fracción sigma paréntesis derecho finalizar raíz' +
                       ' cuadrada', 'default');
  this.executeRuleTest(mml, 'f igual 1,013 empezar frac mayúscula W entre' +
                       ' mayúscula L al cuadrado finalizar frac empezar' +
                       ' raíz cuadrada empezar frac mayúscula E entre rho' +
                       ' finalizar frac finalizar raíz cuadrada empezar' +
                       ' raíz cuadrada paréntesis izquierdo 1 más 0,293' +
                       ' empezar frac mayúscula L al cuadrado entre EW al' +
                       ' cuadrado finalizar frac sigma paréntesis derecho' +
                       ' finalizar raíz cuadrada', 'brief');
  this.executeRuleTest(mml, 'f igual 1,013 frac mayúscula W entre ' +
                       ' mayúscula L al cuadrado raíz cuadrada frac' +
                       ' mayúscula E entre  rho finalizar raíz cuadrada' +
                       ' raíz cuadrada paréntesis izquierdo 1 más 0,293' +
                       ' frac mayúscula L al cuadrado entre  EW al cuadrado' +
                       ' sigma paréntesis derecho finalizar raíz cuadrada',
                       'sbrief');
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
  this.executeRuleTest(mml, 'u subíndice n línea base paréntesis izquierdo' +
                       ' x paréntesis derecho igual gamma subíndice n línea' +
                       ' base paréntesis izquierdo coseno hiperbólico k' +
                       ' subíndice n línea base x menos coseno k subíndice' +
                       ' n línea base x paréntesis derecho más paréntesis' +
                       ' izquierdo seno hiperbólico k subíndice n línea' +
                       ' base x menos seno k subíndice n línea base x' +
                       ' paréntesis derecho', 'default');
  this.executeRuleTest(mml, 'u sub n paréntesis izquierdo x paréntesis' +
                       ' derecho igual gamma sub n paréntesis izquierdo' +
                       ' coseno hiperbólico k sub n x menos coseno k sub n' +
                       ' x paréntesis derecho más paréntesis izquierdo seno' +
                       ' hiperbólico k sub n x menos seno k sub n x' +
                       ' paréntesis derecho', 'brief');
  this.executeRuleTest(mml, 'u sub n paréntesis izquierdo x paréntesis' +
                       ' derecho igual gamma sub n paréntesis izquierdo' +
                       ' coseno hiperbólico k sub n x menos coseno k sub n' +
                       ' x paréntesis derecho más paréntesis izquierdo seno' +
                       ' hiperbólico k sub n x menos seno k sub n x' +
                       ' paréntesis derecho', 'sbrief');
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
  this.executeRuleTest(mml, 'empezar esquema primera fila primera columna' +
                       ' mayúscula B segunda columna igual empezar empezar' +
                       ' fracción empezar fracción mayúscula F subíndice 0' +
                       ' línea base entre m finalizar fracción entre entre' +
                       ' empezar raíz cuadrada paréntesis izquierdo omega' +
                       ' subíndice 0 al cuadrado menos omega al cuadrado' +
                       ' paréntesis derecho al cuadrado más 4 n al cuadrado' +
                       ' omega al cuadrado finalizar raíz cuadrada' +
                       ' finalizar finalizar fracción segunda fila primera' +
                       ' columna espacio segunda columna igual empezar' +
                       ' empezar fracción empezar fracción mayúscula F' +
                       ' subíndice 0 línea base entre k finalizar fracción' +
                       ' entre entre empezar raíz cuadrada paréntesis' +
                       ' izquierdo 1 menos paréntesis izquierdo omega barra' +
                       ' oblicua omega subíndice 0 al cuadrado paréntesis' +
                       ' derecho al cuadrado paréntesis derecho al cuadrado' +
                       ' más 4 paréntesis izquierdo n barra oblicua omega' +
                       ' subíndice 0 línea base paréntesis derecho al' +
                       ' cuadrado paréntesis izquierdo omega barra oblicua' +
                       ' omega subíndice 0 línea base paréntesis derecho al' +
                       ' cuadrado finalizar raíz cuadrada finalizar' +
                       ' finalizar fracción finalizar esquema', 'default');
  this.executeRuleTest(mml, 'empezar esquema primera fila primera columna' +
                       ' mayúscula B segunda columna igual empezar empezar' +
                       ' frac empezar frac mayúscula F sub 0 entre m' +
                       ' finalizar frac entre entre empezar raíz cuadrada' +
                       ' paréntesis izquierdo omega sub 0 al cuadrado menos' +
                       ' omega al cuadrado paréntesis derecho al cuadrado' +
                       ' más 4 n al cuadrado omega al cuadrado finalizar' +
                       ' raíz cuadrada finalizar finalizar frac segunda' +
                       ' fila primera columna espacio segunda columna igual' +
                       ' empezar empezar frac empezar frac mayúscula F sub' +
                       ' 0 entre k finalizar frac entre entre empezar raíz' +
                       ' cuadrada paréntesis izquierdo 1 menos paréntesis' +
                       ' izquierdo omega barra oblicua omega sub 0 al' +
                       ' cuadrado paréntesis derecho al cuadrado paréntesis' +
                       ' derecho al cuadrado más 4 paréntesis izquierdo n' +
                       ' barra oblicua omega sub 0 paréntesis derecho al' +
                       ' cuadrado paréntesis izquierdo omega barra oblicua' +
                       ' omega sub 0 paréntesis derecho al cuadrado' +
                       ' finalizar raíz cuadrada finalizar finalizar frac' +
                       ' finalizar esquema', 'brief');
  this.executeRuleTest(mml, 'esquema primera fila primera columna mayúscula' +
                       ' B segunda columna igual frac frac mayúscula F sub' +
                       ' 0 entre  m sobre raíz cuadrada paréntesis' +
                       ' izquierdo omega sub 0 al cuadrado menos omega al' +
                       ' cuadrado paréntesis derecho al cuadrado más 4 n al' +
                       ' cuadrado omega al cuadrado finalizar raíz cuadrada' +
                       ' segunda fila primera columna espacio segunda' +
                       ' columna igual frac frac mayúscula F sub 0 entre  k' +
                       ' sobre raíz cuadrada paréntesis izquierdo 1 menos' +
                       ' paréntesis izquierdo omega barra oblicua omega sub' +
                       ' 0 al cuadrado paréntesis derecho al cuadrado' +
                       ' paréntesis derecho al cuadrado más 4 paréntesis' +
                       ' izquierdo n barra oblicua omega sub 0 paréntesis' +
                       ' derecho al cuadrado paréntesis izquierdo omega' +
                       ' barra oblicua omega sub 0 paréntesis derecho al' +
                       ' cuadrado finalizar raíz cuadrada finalizar' +
                       ' esquema', 'sbrief');
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
  this.executeRuleTest(mml, 'normal p paréntesis izquierdo mayúscula A a n' +
                       ' d mayúscula B paréntesis derecho igual normal p' +
                       ' paréntesis izquierdo mayúscula A paréntesis' +
                       ' derecho normal p paréntesis izquierdo mayúscula B' +
                       ' barra vertical mayúscula A paréntesis derecho',
                       'default');
  this.executeRuleTest(mml, 'normal p paréntesis izquierdo mayúscula A a n' +
                       ' d mayúscula B paréntesis derecho igual normal p' +
                       ' paréntesis izquierdo mayúscula A paréntesis' +
                       ' derecho normal p paréntesis izquierdo mayúscula B' +
                       ' barra vertical mayúscula A paréntesis derecho',
                       'brief');
  this.executeRuleTest(mml, 'normal p paréntesis izquierdo mayúscula A a n' +
                       ' d mayúscula B paréntesis derecho igual normal p' +
                       ' paréntesis izquierdo mayúscula A paréntesis' +
                       ' derecho normal p paréntesis izquierdo mayúscula B' +
                       ' barra vertical mayúscula A paréntesis derecho',
                       'sbrief');
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
  this.executeRuleTest(mml, 'mayúscula P mayúscula M mayúscula F paréntesis' +
                       ' izquierdo x paréntesis derecho proporcional a' +
                       ' paréntesis izquierdo empezar fracción 1 entre x' +
                       ' finalizar fracción paréntesis derecho superíndice' +
                       ' alfa', 'default');
  this.executeRuleTest(mml, 'mayúscula P mayúscula M mayúscula F paréntesis' +
                       ' izquierdo x paréntesis derecho proporcional a' +
                       ' paréntesis izquierdo empezar frac 1 entre x' +
                       ' finalizar frac paréntesis derecho sup alfa', 'brief');
  this.executeRuleTest(mml, 'mayúscula P mayúscula M mayúscula F paréntesis' +
                       ' izquierdo x paréntesis derecho proporcional a' +
                       ' paréntesis izquierdo frac 1 entre  x paréntesis' +
                       ' derecho sup alfa', 'sbrief');
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
  this.executeRuleTest(mml, 'f paréntesis izquierdo x paréntesis derecho' +
                       ' igual empezar fracción 1 entre empezar raíz' +
                       ' cuadrada 2 pi finalizar raíz cuadrada finalizar' +
                       ' fracción exponente paréntesis izquierdo menos x al' +
                       ' cuadrado barra oblicua 2 paréntesis derecho',
                       'default');
  this.executeRuleTest(mml, 'f paréntesis izquierdo x paréntesis derecho' +
                       ' igual empezar frac 1 entre empezar raíz cuadrada 2' +
                       ' pi finalizar raíz cuadrada finalizar frac' +
                       ' exponente paréntesis izquierdo menos x al cuadrado' +
                       ' barra oblicua 2 paréntesis derecho', 'brief');
  this.executeRuleTest(mml, 'f paréntesis izquierdo x paréntesis derecho' +
                       ' igual frac 1 entre  raíz cuadrada 2 pi finalizar' +
                       ' raíz cuadrada exponente paréntesis izquierdo menos' +
                       ' x al cuadrado barra oblicua 2 paréntesis derecho',
                       'sbrief');
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
  this.executeRuleTest(mml, 'empezar fracción d x entre d theta finalizar' +
                       ' fracción igual empezar fracción beta entre coseno' +
                       ' al cuadrado theta finalizar fracción', 'default');
  this.executeRuleTest(mml, 'empezar frac d x entre d theta finalizar frac' +
                       ' igual empezar frac beta entre coseno al cuadrado' +
                       ' theta finalizar frac', 'brief');
  this.executeRuleTest(mml, 'frac d x entre  d theta igual frac beta entre ' +
                       ' coseno al cuadrado theta', 'sbrief');
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
  this.executeRuleTest(mml, 's barra oblicua empezar raíz cuadrada 2' +
                       ' paréntesis izquierdo n menos 1 paréntesis derecho' +
                       ' finalizar raíz cuadrada', 'default');
  this.executeRuleTest(mml, 's barra oblicua empezar raíz cuadrada 2' +
                       ' paréntesis izquierdo n menos 1 paréntesis derecho' +
                       ' finalizar raíz cuadrada', 'brief');
  this.executeRuleTest(mml, 's barra oblicua raíz cuadrada 2 paréntesis' +
                       ' izquierdo n menos 1 paréntesis derecho finalizar' +
                       ' raíz cuadrada', 'sbrief');
};


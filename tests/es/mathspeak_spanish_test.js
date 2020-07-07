// Copyright 2017 Volker Sorge
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
 * @author Volker.Sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.MathspeakSpanishTest');

goog.require('sre.AbstractRuleTest');



/**
 * @constructor
 * @extends {sre.AbstractRuleTest}
 */
sre.MathspeakSpanishTest = function() {
  sre.MathspeakSpanishTest.base(this, 'constructor');

  /**
   * @override
   */
  this.information = 'Mathspeak Spanish tests.';

  /**
   * @override
   */
  this.domain = 'mathspeak';

  /**
   * @override
   */
  this.locale = 'es';

  this.setActive('MathspeakSpanish');

};
goog.inherits(sre.MathspeakSpanishTest, sre.AbstractRuleTest);


/**
 * Testing Rule 1.1, Example 1.
 */
sre.MathspeakSpanishTest.prototype.testSample_1_1_1 = function() {
  var mml = '<mrow><mi>π</mi><mo>≈</mo><mn>3.14159</mn></mrow>';
  this.executeRuleTest(mml, 'pi aproximado 3,14159', 'default');
  this.executeRuleTest(mml, 'pi aproximado 3,14159', 'brief');
  this.executeRuleTest(mml, 'pi aproximado 3,14159', 'sbrief');
};


/**
 * Testing Rule 1.1, Example 2.
 */
sre.MathspeakSpanishTest.prototype.testSample_1_1_2 = function() {
  var mml = '<mrow><mn>102</mn><mo>+</mo><mn>2214</mn><mo>+</mo><mn>15</mn>' +
      '<mo>=</mo><mn>2331</mn></mrow>';
  this.executeRuleTest(mml, '102 más 2214 más 15 igual 2331', 'default');
  this.executeRuleTest(mml, '102 más 2214 más 15 igual 2331', 'brief');
  this.executeRuleTest(mml, '102 más 2214 más 15 igual 2331', 'sbrief');
};


/**
 * Testing Rule 1.1, Example 3.
 */
sre.MathspeakSpanishTest.prototype.testSample_1_1_3 = function() {
  var mml = '<mrow><mn>59</mn><mo>×</mo><mn>0</mn><mo>=</mo><mn>0</mn></mrow>';
  this.executeRuleTest(mml, '59 por 0 igual 0', 'default');
  this.executeRuleTest(mml, '59 por 0 igual 0', 'brief');
  this.executeRuleTest(mml, '59 por 0 igual 0', 'sbrief');
};


/**
 * Testing Rule 1.2, Example 1.
 */
sre.MathspeakSpanishTest.prototype.testSample_1_2_1 = function() {
  var mml = '<mrow><mn>3</mn><mo>-</mo><mo>-</mo><mn>2</mn></mrow>';
  this.executeRuleTest(mml, '3 menos menos 2', 'default');
  this.executeRuleTest(mml, '3 menos menos 2', 'brief');
  this.executeRuleTest(mml, '3 menos menos 2', 'sbrief');
};


/**
 * Testing Rule 1.2, Example 2.
 */
sre.MathspeakSpanishTest.prototype.testSample_1_2_2 = function() {
  var mml = '<mrow><mo>-</mo><mi>y</mi></mrow>';
  this.executeRuleTest(mml, 'menos y', 'default');
  this.executeRuleTest(mml, 'menos y', 'brief');
  this.executeRuleTest(mml, 'menos y', 'sbrief');
};


/**
 * Testing Rule 1.2, Example 3.
 */
sre.MathspeakSpanishTest.prototype.testSample_1_2_3 = function() {
  var mml = '<mrow><mo>-</mo><mn>32</mn></mrow>';
  this.executeRuleTest(mml, 'menos 32', 'default');
  this.executeRuleTest(mml, 'menos 32', 'brief');
  this.executeRuleTest(mml, 'menos 32', 'sbrief');
};


/**
 * Testing Rule 1.4, Example 1.
 */
sre.MathspeakSpanishTest.prototype.testSample_1_4_1 = function() {
  var mml = '<mrow><mn>t2e4</mn></mrow>';
  this.executeRuleTest(mml, 'número t 2 e 4', 'default');
  this.executeRuleTest(mml, 'núm t 2 e 4', 'brief');
  this.executeRuleTest(mml, 'núm t 2 e 4', 'sbrief');
};


/**
 * Testing Rule 1.4, Example 2.
 */
sre.MathspeakSpanishTest.prototype.testSample_1_4_2 = function() {
  var mml = '<mrow><mn>#FF0000</mn></mrow>';
  this.executeRuleTest(mml, 'número almuhadilla F F 0 0 0 0', 'default');
  this.executeRuleTest(mml, 'núm almuhadilla F F 0 0 0 0', 'brief');
  this.executeRuleTest(mml, 'núm almuhadilla F F 0 0 0 0', 'sbrief');
};


/**
 * Testing Rule 1.4, Example 3.
 */
sre.MathspeakSpanishTest.prototype.testSample_1_4_3 = function() {
  var mml = '<mrow><mn>0x15FF</mn><mo>+</mo><mn>0x2B01</mn><mo>=</mo>' +
      '<mn>0x4100</mn></mrow>';
  this.executeRuleTest(mml, 'número 0 x 1 5 F F más número 0 x 2 B 0 1' +
                       ' igual número 0 x 4 1 0 0', 'default');
  this.executeRuleTest(mml, 'núm 0 x 1 5 F F más núm 0 x 2 B 0 1 igual núm' +
                       ' 0 x 4 1 0 0', 'brief');
  this.executeRuleTest(mml, 'núm 0 x 1 5 F F más núm 0 x 2 B 0 1 igual núm' +
                       ' 0 x 4 1 0 0', 'sbrief');
};


/**
 * Testing Rule 1.5, Example 1.
 */
sre.MathspeakSpanishTest.prototype.testSample_1_5_1 = function() {
  var mml = '<mrow><mn>I</mn><mo>,</mo><mn>II</mn><mo>,</mo><mn>III</mn>' +
      '<mo>,</mo><mn>IV</mn><mo>,</mo><mn>V</mn><mo>.</mo></mrow>';
  this.executeRuleTest(mml, 'mayúscula I coma mayúscula I I coma mayúscula' +
                       ' I I I coma mayúscula I V coma mayúscula V punto',
                       'default');
  this.executeRuleTest(mml, 'mayúscula I coma mayúscula I I coma mayúscula' +
                       ' I I I coma mayúscula I V coma mayúscula V punto',
                       'brief');
  this.executeRuleTest(mml, 'mayúscula I coma mayúscula I I coma mayúscula' +
                       ' I I I coma mayúscula I V coma mayúscula V punto',
                       'sbrief');
};


/**
 * Testing Rule 2.1, Example 1.
 */
sre.MathspeakSpanishTest.prototype.testSample_2_1_1 = function() {
  var mml = '<mrow><mi>d</mi><mo>=</mo><msqrt><mrow><msup><mrow><mo>(</mo>' +
      '<mi>X</mi><mo>-</mo><mi>x</mi><mo>)</mo></mrow><mn>2</mn></msup>' +
      '<mo>-</mo><msup><mrow><mo>(</mo><mi>Y</mi><mo>-</mo><mi>y</mi>' +
      '<mo>)</mo></mrow><mn>2</mn></msup></mrow></msqrt></mrow>';
  this.executeRuleTest(mml, 'd igual empezar raíz cuadrada paréntesis' +
                       ' izquierdo mayúscula X menos x paréntesis derecho' +
                       ' al cuadrado menos paréntesis izquierdo mayúscula Y' +
                       ' menos y paréntesis derecho al cuadrado finalizar' +
                       ' raíz cuadrada', 'default');
  this.executeRuleTest(mml, 'd igual empezar raíz cuadrada paréntesis' +
                       ' izquierdo mayúscula X menos x paréntesis derecho' +
                       ' al cuadrado menos paréntesis izquierdo mayúscula Y' +
                       ' menos y paréntesis derecho al cuadrado finalizar' +
                       ' raíz cuadrada', 'brief');
  this.executeRuleTest(mml, 'd igual raíz cuadrada paréntesis izquierdo' +
                       ' mayúscula X menos x paréntesis derecho al cuadrado' +
                       ' menos paréntesis izquierdo mayúscula Y menos y' +
                       ' paréntesis derecho al cuadrado finalizar raíz' +
                       ' cuadrada', 'sbrief');
};


/**
 * Testing Rule 2.3, Example 1.
 */
sre.MathspeakSpanishTest.prototype.testSample_2_3_1 = function() {
  var mml = '<mrow><mtext>Si</mtext><mspace width="4.pt"/><mi>A</mi>' +
      '<mo>→</mo><mi>B</mi><mspace width="4.pt"/><mtext>y</mtext>' +
      '<mspace width="4.pt"/><mi>B</mi><mo>→</mo><mi>C</mi>' +
      '<mspace width="4.pt"/><mtext>entonces</mtext><mspace width="4.pt"/>' +
      '<mi>A</mi><mo>→</mo><mi>C</mi><mo>.</mo></mrow>';
  this.executeRuleTest(mml, 'Si mayúscula A flecha derecha mayúscula B y' +
                       ' mayúscula B flecha derecha mayúscula C entonces' +
                       ' mayúscula A flecha derecha mayúscula C punto',
                       'default');
  this.executeRuleTest(mml, 'Si mayúscula A flecha derecha mayúscula B y' +
                       ' mayúscula B flecha derecha mayúscula C entonces' +
                       ' mayúscula A flecha derecha mayúscula C punto',
                       'brief');
  this.executeRuleTest(mml, 'Si mayúscula A flecha derecha mayúscula B y' +
                       ' mayúscula B flecha derecha mayúscula C entonces' +
                       ' mayúscula A flecha derecha mayúscula C punto',
                       'sbrief');
};


/**
 * Testing Rule 2.6, Example 1.
 */
sre.MathspeakSpanishTest.prototype.testSample_2_6_1 = function() {
  var mml = '<mrow><mo mathvariant="bold">[</mo><mi>x</mi>' +
      '<mo mathvariant="bold">]</mo></mrow>';
  this.executeRuleTest(mml, 'negrita corchete izquierdo x negrita corchete' +
                       ' derecho', 'default');
  this.executeRuleTest(mml, 'negrita corchete izquierdo x negrita corchete' +
                       ' derecho', 'brief');
  this.executeRuleTest(mml, 'negrita corchete izquierdo x negrita corchete' +
                       ' derecho', 'sbrief');
};


/**
 * Testing Rule 2.6, Example 2.
 */
sre.MathspeakSpanishTest.prototype.testSample_2_6_2 = function() {
  var mml = '<mrow><mo>∮</mo><mi>E</mi><mo>·</mo><mi>d</mi>' +
      '<mi mathvariant="bold">l</mi><mo>=</mo><mo>-</mo><mfrac><mrow>' +
      '<mi>d</mi><mi>Φ</mi><mi>B</mi></mrow><mrow><mi>d</mi><mi>t</mi>' +
      '</mrow></mfrac></mrow>';
  this.executeRuleTest(mml, 'integral de contorno mayúscula E punto medio d' +
                       ' negrita l igual menos empezar fracción d mayúscula' +
                       ' Phi mayúscula B entre d t finalizar fracción',
                       'default');
  this.executeRuleTest(mml, 'integral de contorno mayúscula E punto medio d' +
                       ' negrita l igual menos empezar frac d mayúscula Phi' +
                       ' mayúscula B entre d t finalizar frac', 'brief');
  this.executeRuleTest(mml, 'integral de contorno mayúscula E punto medio d' +
                       ' negrita l igual menos frac d mayúscula Phi' +
                       ' mayúscula B entre d t', 'sbrief');
};


/**
 * Testing prefix operation as negative or minus.
 */
sre.MathspeakSpanishTest.prototype.testNegativeVsMinus = function() {
  var mml = '<mrow><mo>-</mo><mfrac><mn>1</mn><mi>b</mi></mfrac></mrow>';
  this.executeRuleTest(mml, 'menos empezar fracción 1 entre b finalizar' +
                       ' fracción', 'default');
  mml = '<mrow><mo>-</mo><mfrac><mi>a</mi><mi>b</mi></mfrac></mrow>';
  this.executeRuleTest(mml, 'menos empezar fracción a entre b finalizar' +
                       ' fracción', 'default');
  mml = '<mrow><mo>-</mo><mn>3</mn><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow>';
  this.executeRuleTest(mml, 'menos 3 más empezar fracción 1 entre 2' +
                       ' finalizar fracción', 'default');
};


/**
 * Testing Rule 4.2, Example 1.
 */
sre.MathspeakSpanishTest.prototype.testSample_4_2_1 = function() {
  var mml = '<mrow><mtext>Mayúscula</mtext><mo>(</mo><mo>{</mo><mi>α</mi>' +
      '<mo>,</mo><mi>β</mi><mo>,</mo><mi>γ</mi><mo>,</mo><mi>δ</mi>' +
      '<mo>,</mo><mi>ϵ</mi><mo>,</mo><mi>φ</mi><mo>}</mo><mo>)</mo>' +
      '<mo>=</mo><mo>{</mo><mi>Α</mi><mo>,</mo><mi>Β</mi><mo>,</mo>' +
      '<mi>Γ</mi><mo>,</mo><mi>Δ</mi><mo>,</mo><mi>Ε</mi><mo>,</mo>' +
      '<mi>Φ</mi><mo>}</mo></mrow>';
  this.executeRuleTest(mml, 'Mayúscula paréntesis izquierdo empezar llave' +
                       ' alfa coma beta coma gamma coma delta coma épsilon' +
                       ' coma phi finalizar llave paréntesis derecho igual' +
                       ' empezar llave mayúscula Alfa coma mayúscula Beta' +
                       ' coma mayúscula Gamma coma mayúscula Delta coma' +
                       ' mayúscula Épsilon coma mayúscula Phi finalizar' +
                       ' llave', 'default');
  this.executeRuleTest(mml, 'Mayúscula paréntesis izquierdo empezar llave' +
                       ' alfa coma beta coma gamma coma delta coma épsilon' +
                       ' coma phi finalizar llave paréntesis derecho igual' +
                       ' empezar llave mayúscula Alfa coma mayúscula Beta' +
                       ' coma mayúscula Gamma coma mayúscula Delta coma' +
                       ' mayúscula Épsilon coma mayúscula Phi finalizar llave',
                       'brief');
  this.executeRuleTest(mml, 'Mayúscula paréntesis izquierdo llave alfa coma' +
                       ' beta coma gamma coma delta coma épsilon coma phi' +
                       ' finalizar llave paréntesis derecho igual llave' +
                       ' mayúscula Alfa coma mayúscula Beta coma mayúscula' +
                       ' Gamma coma mayúscula Delta coma mayúscula Épsilon' +
                       ' coma mayúscula Phi finalizar llave', 'sbrief');
};


/**
 * Testing Rule 5.1, Example 1.
 */
sre.MathspeakSpanishTest.prototype.testSample_5_1_1 = function() {
  var mml = '<mrow><mi>y</mi><mo>-</mo><mn>1</mn></mrow>';
  this.executeRuleTest(mml, 'y menos 1', 'default');
  this.executeRuleTest(mml, 'y menos 1', 'brief');
  this.executeRuleTest(mml, 'y menos 1', 'sbrief');
};


/**
 * Testing Rule 5.1, Example 2.
 */
sre.MathspeakSpanishTest.prototype.testSample_5_1_2 = function() {
  var mml = '<mrow><mo>(</mo><mn>1</mn><mtext> a </mtext>' +
      '<mn>1</mn><mo>)</mo></mrow>';
  this.executeRuleTest(mml, 'paréntesis izquierdo 1 a 1 paréntesis derecho',
                       'default');
  this.executeRuleTest(mml, 'paréntesis izquierdo 1 a 1 paréntesis derecho',
                       'brief');
  this.executeRuleTest(mml, 'paréntesis izquierdo 1 a 1 paréntesis derecho',
                       'sbrief');
};


/**
 * Testing Rule 5.1, Example 3.
 */
sre.MathspeakSpanishTest.prototype.testSample_5_1_3 = function() {
  var mml = '<mrow><mo>-</mo><mn>1</mn></mrow>';
  this.executeRuleTest(mml, 'menos 1', 'default');
  this.executeRuleTest(mml, 'menos 1', 'brief');
  this.executeRuleTest(mml, 'menos 1', 'sbrief');
};


/**
 * Testing Rule 6.1, Example 1.
 */
sre.MathspeakSpanishTest.prototype.testSample_6_1_1 = function() {
  var mml = '<mtext>Los números de Fibonacci son: </mtext><mrow><mo>{</mo>' +
      '<mn>0</mn><mo>,</mo><mn>1</mn><mo>,</mo><mn>1</mn><mo>,</mo>' +
      '<mn>2</mn><mo>,</mo><mn>3</mn><mo>,</mo><mn>5</mn><mo>,</mo>' +
      '<mn>8</mn><mo>,</mo><mo>&#x2026;</mo><mo>}</mo></mrow>';
  this.executeRuleTest(mml, 'Los números de Fibonacci son dos puntos' +
                       ' empezar llave 0 coma 1 coma 1 coma 2 coma 3 coma 5' +
                       ' coma 8 coma puntos suspensivos finalizar llave',
                       'default');
  this.executeRuleTest(mml, 'Los números de Fibonacci son dos puntos' +
                       ' empezar llave 0 coma 1 coma 1 coma 2 coma 3 coma 5' +
                       ' coma 8 coma puntos suspensivos finalizar llave',
                       'brief');
  this.executeRuleTest(mml, 'Los números de Fibonacci son dos puntos llave' +
                       ' 0 coma 1 coma 1 coma 2 coma 3 coma 5 coma 8 coma' +
                       ' puntos suspensivos finalizar llave', 'sbrief');
};


/**
 * Testing Rule 6.2, Example 1.
 */
sre.MathspeakSpanishTest.prototype.testSample_6_2_1 = function() {
  var mml = '<mrow><mo>|</mo><mn>4</mn><mo>-</mo><mn>7</mn><mo>|</mo>' +
      '<mo>=</mo><mn>3</mn></mrow>';
  this.executeRuleTest(mml, 'empezar valor absoluto 4 menos 7 finalizar' +
                       ' valor absoluto igual 3', 'default');
  this.executeRuleTest(mml, 'empezar valor absoluto 4 menos 7 finalizar' +
                       ' valor absoluto igual 3', 'brief');
  this.executeRuleTest(mml, 'valor absoluto 4 menos 7 finalizar valor' +
                       ' absoluto igual 3', 'sbrief');
};


/**
 * Testing Rule 6.2, Example 2.
 * This equation does not make sense! We can do it purely syntactically!
 */
sre.MathspeakSpanishTest.prototype.testSample_6_2_2 = function() {
  var mml = '<mrow><mfenced separators="" open="|" close="|"><mi>a</mi>' +
      '<mo>&#xb1;</mo><mfenced separators="" open="|" close="|"><mi>b</mi>' +
      '<mo>-</mo><mi>c</mi></mfenced></mfenced><mo>&#x2260;</mo>' +
      '<mfenced open="|" close="|"><mi>a</mi></mfenced><mo>&#xb1;</mo>' +
      '<mfenced separators="" open="|" close="|"><mi>b</mi><mo>-</mo>' +
      '<mi>c</mi></mfenced></mrow>';
  this.executeRuleTest(mml, 'empezar valor absoluto a más menos empezar' +
                       ' valor absoluto b menos c finalizar valor absoluto' +
                       ' finalizar valor absoluto no es igual a empezar' +
                       ' valor absoluto a finalizar valor absoluto más' +
                       ' menos empezar valor absoluto b menos c finalizar' +
                       ' valor absoluto', 'default');
  this.executeRuleTest(mml, 'empezar valor absoluto a más menos empezar' +
                       ' valor absoluto b menos c finalizar valor absoluto' +
                       ' finalizar valor absoluto no es igual a empezar' +
                       ' valor absoluto a finalizar valor absoluto más' +
                       ' menos empezar valor absoluto b menos c finalizar' +
                       ' valor absoluto', 'brief');
  this.executeRuleTest(mml, 'valor absoluto a más menos valor absoluto b' +
                       ' menos c finalizar valor absoluto finalizar valor' +
                       ' absoluto no es igual a valor absoluto a finalizar' +
                       ' valor absoluto más menos valor absoluto b menos c' +
                       ' finalizar valor absoluto', 'sbrief');
};


/**
 * Testing Rule 7.1, Example 1.
 */
sre.MathspeakSpanishTest.prototype.testSample_7_1_1 = function() {
  var mml = '<mfrac><mn>1</mn><mi>x</mi></mfrac>';
  this.executeRuleTest(mml, 'empezar fracción 1 entre x finalizar' +
                       ' fracción', 'default');
  this.executeRuleTest(mml, 'empezar frac 1 entre x finalizar frac', 'brief');
  this.executeRuleTest(mml, 'frac 1 entre x', 'sbrief');
};


/**
 * Testing Rule 7.1, Example 2.
 */
sre.MathspeakSpanishTest.prototype.testSample_7_1_2 = function() {
  var mml = '<mrow><mi>a</mi><mo>-</mo><mfrac><mrow><mi>b</mi><mo>+</mo>' +
      '<mi>c</mi></mrow><mrow><mi>d</mi><mo>-</mo><mi>e</mi></mrow>' +
      '</mfrac><mo>×</mo><mi>f</mi></mrow>';
  this.executeRuleTest(mml, 'a menos empezar fracción b más c entre d menos' +
                       ' e finalizar fracción por f', 'default');
  this.executeRuleTest(mml, 'a menos empezar frac b más c entre d menos e' +
                       ' finalizar frac por f', 'brief');
  this.executeRuleTest(mml, 'a menos frac b más c entre d menos e por f',
                       'sbrief');
};


/**
 * Testing Rule 7.2, Example 1.
 */
sre.MathspeakSpanishTest.prototype.testSample_7_2_1 = function() {
  var mml = '<mrow><mfrac><mfrac><mi>x</mi><mi>y</mi></mfrac><mi>z</mi>' +
      '</mfrac><mo>≠</mo><mfrac><mi>x</mi><mfrac><mi>y</mi><mi>z</mi>' +
      '</mfrac></mfrac></mrow>';
  this.executeRuleTest(mml, 'empezar empezar fracción empezar fracción x' +
                       ' entre y finalizar fracción entre entre z finalizar' +
                       ' finalizar fracción no es igual a empezar empezar' +
                       ' fracción x entre entre empezar fracción y entre z' +
                       ' finalizar fracción finalizar finalizar fracción',
                       'default');
  this.executeRuleTest(mml, 'empezar empezar frac empezar frac x entre y' +
                       ' finalizar frac entre entre z finalizar finalizar' +
                       ' frac no es igual a empezar empezar frac x entre' +
                       ' entre empezar frac y entre z finalizar frac' +
                       ' finalizar finalizar frac', 'brief');
  this.executeRuleTest(mml, 'frac frac x entre y entre z no es igual a' +
                       ' frac x entre frac y entre z', 'sbrief');
};


/**
 * Testing Rule 7.3, Example 1.
 */
sre.MathspeakSpanishTest.prototype.testSample_7_3_1 = function() {
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
  this.executeRuleTest(mml, 'empezar empezar empezar fracción empezar' +
                       ' empezar fracción paréntesis izquierdo 1 menos x' +
                       ' paréntesis derecho empezar fracción d entre d x' +
                       ' finalizar fracción paréntesis izquierdo 2 x' +
                       ' paréntesis derecho menos 2 x empezar fracción d' +
                       ' entre d x finalizar fracción paréntesis izquierdo' +
                       ' 1 menos x paréntesis derecho entre entre' +
                       ' paréntesis izquierdo 1 menos x paréntesis derecho' +
                       ' al cuadrado finalizar finalizar fracción entre' +
                       ' entre entre 1 más paréntesis izquierdo empezar' +
                       ' fracción 2 x entre 1 menos x finalizar fracción' +
                       ' paréntesis derecho al cuadrado finalizar finalizar' +
                       ' finalizar fracción', 'default');
  this.executeRuleTest(mml, 'empezar empezar empezar frac empezar empezar' +
                       ' frac paréntesis izquierdo 1 menos x paréntesis' +
                       ' derecho empezar frac d entre d x finalizar frac' +
                       ' paréntesis izquierdo 2 x paréntesis derecho menos' +
                       ' 2 x empezar frac d entre d x finalizar frac' +
                       ' paréntesis izquierdo 1 menos x paréntesis derecho' +
                       ' entre entre paréntesis izquierdo 1 menos x' +
                       ' paréntesis derecho al cuadrado finalizar finalizar' +
                       ' frac entre entre entre 1 más paréntesis izquierdo' +
                       ' empezar frac 2 x entre 1 menos x finalizar frac' +
                       ' paréntesis derecho al cuadrado finalizar finalizar' +
                       ' finalizar frac', 'brief');
  this.executeRuleTest(mml, 'frac frac paréntesis izquierdo 1 menos x' +
                       ' paréntesis derecho frac d entre d x paréntesis' +
                       ' izquierdo 2 x paréntesis derecho menos 2 x frac d' +
                       ' entre d x paréntesis izquierdo 1 menos x' +
                       ' paréntesis derecho entre paréntesis izquierdo 1' +
                       ' menos x paréntesis derecho al cuadrado entre 1 más' +
                       ' paréntesis izquierdo frac 2 x entre 1 menos x' +
                       ' paréntesis derecho al cuadrado', 'sbrief');
};


/**
 * Testing Rule 7.3, Example 2.
 */
sre.MathspeakSpanishTest.prototype.testSample_7_3_2 = function() {
  var mml = '<mrow><msub><mi>a</mi><mn>0</mn></msub><mo>+</mo><mfrac>' +
      '<mn>1</mn><mrow><msub><mi>a</mi><mn>1</mn></msub><mo>+</mo><mfrac>' +
      '<mn>1</mn><mrow><msub><mi>a</mi><mn>2</mn></msub><mo>+</mo><mfrac>' +
      '<mn>1</mn><mrow><mo>&#x2026;</mo><mo>+</mo><mfrac><mn>1</mn><msub>' +
      '<mi>a</mi><mi>n</mi></msub></mfrac></mrow></mfrac></mrow></mfrac>' +
      '</mrow></mfrac></mrow>';
  this.executeRuleTest(mml, 'a subíndice 0 línea base más empezar empezar' +
                       ' empezar empezar fracción 1 entre entre entre entre' +
                       ' a subíndice 1 línea base más empezar empezar' +
                       ' empezar fracción 1 entre entre entre a subíndice 2' +
                       ' línea base más empezar empezar fracción 1 entre' +
                       ' entre puntos suspensivos más empezar fracción 1' +
                       ' entre a subíndice n línea base finalizar fracción' +
                       ' finalizar finalizar fracción finalizar finalizar' +
                       ' finalizar fracción finalizar finalizar finalizar' +
                       ' finalizar fracción', 'default');
  this.executeRuleTest(mml, 'a sub 0 más empezar empezar empezar empezar' +
                       ' frac 1 entre entre entre entre a sub 1 más empezar' +
                       ' empezar empezar frac 1 entre entre entre a sub 2' +
                       ' más empezar empezar frac 1 entre entre puntos' +
                       ' suspensivos más empezar frac 1 entre a sub n' +
                       ' finalizar frac finalizar finalizar frac finalizar' +
                       ' finalizar finalizar frac finalizar finalizar' +
                       ' finalizar finalizar frac', 'brief');
  this.executeRuleTest(mml, 'a sub 0 más frac 1 entre a sub 1 más frac 1' +
                       ' entre a sub 2 más frac 1 entre puntos suspensivos' +
                       ' más frac 1 entre a sub n', 'sbrief');
};


/**
 * Testing Rule 7.4, Example 1.
 */
sre.MathspeakSpanishTest.prototype.testSample_7_4_1 = function() {
  var mml = '<mrow><mfrac><mn>1</mn><mn>2</mn></mfrac><mo>+</mo><mfrac>' +
      '<mn>2</mn><mn>2</mn></mfrac><mo>+</mo><mfrac><mn>3</mn><mn>2</mn>' +
      '</mfrac><mo>+</mo><mfrac><mn>4</mn><mn>2</mn></mfrac><mo>+</mo>' +
      '<mo>&#x2026;</mo><mo>=</mo><munderover><mo>∑</mo><mrow><mi>n</mi>' +
      '<mo>=</mo><mn>1</mn></mrow>' +
      '<mo movablelimits="true" form="prefix">∞</mo></munderover><mfrac>' +
      '<mi>n</mi><mn>2</mn></mfrac></mrow>';
  this.executeRuleTest(mml, 'empezar fracción 1 entre 2 finalizar fracción' +
                       ' más empezar fracción 2 entre 2 finalizar fracción' +
                       ' más empezar fracción 3 entre 2 finalizar fracción' +
                       ' más empezar fracción 4 entre 2 finalizar fracción' +
                       ' más puntos suspensivos igual sumatorio bajoíndice' +
                       ' n igual 1 sobreíndice infinito finalizar índices' +
                       ' empezar fracción n entre 2 finalizar fracción',
                       'default');
  this.executeRuleTest(mml, 'empezar frac 1 entre 2 finalizar frac más' +
                       ' empezar frac 2 entre 2 finalizar frac más empezar' +
                       ' frac 3 entre 2 finalizar frac más empezar frac 4' +
                       ' entre 2 finalizar frac más puntos suspensivos' +
                       ' igual sumatorio bajoíndice n igual 1 sobreíndice' +
                       ' infinito finalizar índices empezar frac n entre 2' +
                       ' finalizar frac', 'brief');
  this.executeRuleTest(mml, 'frac 1 entre 2 más frac 2 entre 2 más frac 3' +
                       ' entre 2 más frac 4 entre 2 más puntos' +
                       ' suspensivos igual sumatorio bajoíndice n igual 1' +
                       ' sobreíndice infinito finalizar índices frac n' +
                       ' entre 2', 'sbrief');
};


/**
 * Testing Rule 7.4, Example 2.
 */
sre.MathspeakSpanishTest.prototype.testSample_7_4_2 = function() {
  var mml = '<mrow><mfrac><mn>20</mn><mn>5</mn></mfrac><mo>×</mo><mfrac>' +
      '<mn>1</mn><mn>100</mn></mfrac><mo>=</mo><mfrac><mn>1</mn>' +
      '<mn>25</mn></mfrac></mrow>';
  this.executeRuleTest(mml, 'empezar fracción 20 entre 5 finalizar fracción' +
                       ' por empezar fracción 1 entre 100 finalizar' +
                       ' fracción igual empezar fracción 1 entre 25' +
                       ' finalizar fracción', 'default');
  this.executeRuleTest(mml, 'empezar frac 20 entre 5 finalizar frac por' +
                       ' empezar frac 1 entre 100 finalizar frac igual' +
                       ' empezar frac 1 entre 25 finalizar frac', 'brief');
  this.executeRuleTest(mml, 'frac 20 entre 5 por frac 1 entre 100 igual' +
                       ' frac 1 entre 25', 'sbrief');
};


/**
 * Testing Rule 7.4, Example 3.
 */
sre.MathspeakSpanishTest.prototype.testSample_7_4_3 = function() {
  var mml = '<mrow><mfrac><mfrac><mn>3</mn><mn>5</mn></mfrac><mn>8</mn>' +
      '</mfrac><mo>=</mo><mfrac><mn>3</mn><mn>5</mn></mfrac><mo>×</mo>' +
      '<mfrac><mn>1</mn><mn>8</mn></mfrac></mrow>';
  this.executeRuleTest(mml, 'empezar empezar fracción empezar fracción 3' +
                       ' entre 5 finalizar fracción entre entre 8 finalizar' +
                       ' finalizar fracción igual empezar fracción 3 entre' +
                       ' 5 finalizar fracción por empezar fracción 1 entre' +
                       ' 8 finalizar fracción', 'default');
  this.executeRuleTest(mml, 'empezar empezar frac empezar frac 3 entre 5' +
                       ' finalizar frac entre entre 8 finalizar finalizar' +
                       ' frac igual empezar frac 3 entre 5 finalizar frac' +
                       ' por empezar frac 1 entre 8 finalizar frac', 'brief');
  this.executeRuleTest(mml, 'frac frac 3 entre 5 entre 8 igual frac 3' +
                       ' entre 5 por frac 1 entre 8', 'sbrief');
};


/**
 * Testing Rule 7.5, Example 1.
 */
sre.MathspeakSpanishTest.prototype.testSample_7_5_1 = function() {
  var mml = '<mrow><mn>3</mn><mfrac><mn>5</mn><mn>8</mn></mfrac><mo>=</mo>' +
      '<mfrac><mn>29</mn><mn>8</mn></mfrac></mrow>';
  this.executeRuleTest(mml, '3 más empezar fracción 5 entre 8 finalizar' +
                       ' fracción igual empezar fracción 29 entre 8' +
                       ' finalizar fracción', 'default');
  this.executeRuleTest(mml, '3 más empezar frac 5 entre 8 finalizar frac' +
                       ' igual empezar frac 29 entre 8 finalizar frac',
                       'brief');
  this.executeRuleTest(mml, '3 más frac 5 entre 8 igual frac 29 entre 8',
                       'sbrief');
};


/**
 * Testing Rule 7.6, Example 1.
 */
sre.MathspeakSpanishTest.prototype.testSample_7_6_1 = function() {
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
  this.executeRuleTest(mml, 'a subíndice 0 línea base más fracción continua' +
                       ' b subíndice 1 línea base entre a subíndice 1 línea' +
                       ' base más empezar fracción b subíndice 2 línea base' +
                       ' entre a subíndice 2 línea base más empezar' +
                       ' fracción b subíndice 3 línea base entre a' +
                       ' subíndice 3 línea base más puntos suspensivos' +
                       ' igual a subíndice 0 línea base más empezar' +
                       ' fracción b subíndice 1 línea base entre a' +
                       ' subíndice 1 línea base finalizar fracción más' +
                       ' empezar fracción b subíndice 2 línea base entre a' +
                       ' subíndice 2 línea base finalizar fracción más' +
                       ' puntos suspensivos', 'default');
  this.executeRuleTest(mml, 'a sub 0 más frac continua b sub 1 entre a sub' +
                       ' 1 más empezar frac b sub 2 entre a sub 2 más' +
                       ' empezar frac b sub 3 entre a sub 3 más puntos' +
                       ' suspensivos igual a sub 0 más empezar frac b sub 1' +
                       ' entre a sub 1 finalizar frac más empezar frac b' +
                       ' sub 2 entre a sub 2 finalizar frac más puntos' +
                       ' suspensivos', 'brief');
  this.executeRuleTest(mml, 'a sub 0 más frac continua b sub 1 entre a sub' +
                       ' 1 más frac b sub 2 entre a sub 2 más frac b sub 3' +
                       ' entre a sub 3 más puntos suspensivos igual a sub 0' +
                       ' más frac b sub 1 entre a sub 1 más frac b sub 2' +
                       ' entre a sub 2 más puntos suspensivos', 'sbrief');
};


/**
 * Testing Rule 8.1, Example 1.
 */
sre.MathspeakSpanishTest.prototype.testSample_8_1_1 = function() {
  var mml = '<mrow><msup><mi>x</mi><mn>3</mn></msup><mo>+</mo><mn>6</mn>' +
      '<msup><mi>x</mi><mn>2</mn></msup><mo>-</mo><mi>x</mi><mo>=</mo>' +
      '<mn>30</mn></mrow>';
  this.executeRuleTest(mml, 'x al cubo más 6 x al cuadrado menos x igual' +
                       ' 30', 'default');
  this.executeRuleTest(mml, 'x al cubo más 6 x al cuadrado menos x igual' +
                       ' 30', 'brief');
  this.executeRuleTest(mml, 'x al cubo más 6 x al cuadrado menos x igual' +
                       ' 30', 'sbrief');
};


/**
 * Testing Rule 8.1, Example 2.
 */
sre.MathspeakSpanishTest.prototype.testSample_8_1_2 = function() {
  var mml = '<mrow><mfrac><mrow><msup><mi>d</mi><mn>2</mn></msup><mi>y</mi>' +
      '</mrow><mrow><mi>d</mi><msup><mi>x</mi><mn>2</mn></msup></mrow>' +
      '</mfrac><mo>+</mo><mfenced separators="" open="(" close=")">' +
      '<mi>a</mi><msup><mi>x</mi><mn>2</mn></msup><mo>+</mo><mi>b</mi>' +
      '<mi>x</mi><mo>+</mo><mi>c</mi></mfenced><mi>y</mi><mo>=</mo>' +
      '<mn>0</mn></mrow>';
  this.executeRuleTest(mml, 'empezar fracción d al cuadrado y entre d x al' +
                       ' cuadrado finalizar fracción más paréntesis' +
                       ' izquierdo a x al cuadrado más b x más c paréntesis' +
                       ' derecho y igual 0', 'default');
  this.executeRuleTest(mml, 'empezar frac d al cuadrado y entre d x al' +
                       ' cuadrado finalizar frac más paréntesis izquierdo a' +
                       ' x al cuadrado más b x más c paréntesis derecho y' +
                       ' igual 0', 'brief');
  this.executeRuleTest(mml, 'frac d al cuadrado y entre d x al cuadrado' +
                       ' más paréntesis izquierdo a x al cuadrado más b x' +
                       ' más c paréntesis derecho y igual 0', 'sbrief');
};


/**
 * Testing Rule 8.2, Example 1.
 */
sre.MathspeakSpanishTest.prototype.testSample_8_2_1 = function() {
  var mml = '<msup><mi>x</mi><mfrac><mn>1</mn><mn>2</mn></mfrac></msup>';
  this.executeRuleTest(mml, 'x superíndice empezar fracción 1 entre 2' +
                       ' finalizar fracción', 'default');
  this.executeRuleTest(mml, 'x sup empezar frac 1 entre 2 finalizar frac',
                       'brief');
  this.executeRuleTest(mml, 'x sup frac 1 entre 2', 'sbrief');
};


/**
 * Testing Rule 8.2, Example 2.
 */
sre.MathspeakSpanishTest.prototype.testSample_8_2_2 = function() {
  var mml = '<msub><mi>x</mi><mi>n</mi></msub>';
  this.executeRuleTest(mml, 'x subíndice n', 'default');
  this.executeRuleTest(mml, 'x sub n', 'brief');
  this.executeRuleTest(mml, 'x sub n', 'sbrief');
};


/**
 * Testing Rule 8.2, Example 3.
 */
sre.MathspeakSpanishTest.prototype.testSample_8_2_3 = function() {
  var mml = '<msup><mi>x</mi><mi>a</mi></msup>';
  this.executeRuleTest(mml, 'x superíndice a', 'default');
  this.executeRuleTest(mml, 'x sup a', 'brief');
  this.executeRuleTest(mml, 'x sup a', 'sbrief');
};


/**
 * Testing Rule 8.3, Example 1.
 */
sre.MathspeakSpanishTest.prototype.testSample_8_3_1 = function() {
  var mml = '<msup><mi>x</mi><mrow><mi>m</mi><mo>+</mo><mi>n</mi></mrow>' +
      '</msup>';
  this.executeRuleTest(mml, 'x superíndice m más n', 'default');
  this.executeRuleTest(mml, 'x sup m más n', 'brief');
  this.executeRuleTest(mml, 'x sup m más n', 'sbrief');
};


/**
 * Testing Rule 8.3, Example 2.
 */
sre.MathspeakSpanishTest.prototype.testSample_8_3_2 = function() {
  var mml = '<mrow><msub><mi>T</mi><mrow><mi>n</mi><mo>-</mo><mn>1</mn>' +
      '</mrow></msub><mo>+</mo><mn>5</mn><mo>=</mo><mn>0</mn></mrow>';
  this.executeRuleTest(mml, 'mayúscula T subíndice n menos 1 línea base más' +
                       ' 5 igual 0', 'default');
  this.executeRuleTest(mml, 'mayúscula T sub n menos 1 más 5 igual 0', 'brief');
  this.executeRuleTest(mml, 'mayúscula T sub n menos 1 más 5 igual 0',
                       'sbrief');
};


/**
 * Testing Rule 8.3, Example 3.
 */
sre.MathspeakSpanishTest.prototype.testSample_8_3_3 = function() {
  var mml = '<mrow><msup><mi>x</mi><mrow><mi>m</mi><mo>+</mo><mi>n</mi>' +
      '</mrow></msup><mo>=</mo><msup><mi>x</mi><mi>m</mi></msup><msup>' +
      '<mi>x</mi><mi>n</mi></msup></mrow>';
  this.executeRuleTest(mml, 'x superíndice m más n línea base igual x' +
                       ' superíndice m línea base x superíndice n', 'default');
  this.executeRuleTest(mml, 'x sup m más n igual x sup m x sup n', 'brief');
  this.executeRuleTest(mml, 'x sup m más n igual x sup m x sup n', 'sbrief');
};


/**
 * Testing Rule 8.4, Example 1.
 */
sre.MathspeakSpanishTest.prototype.testSample_8_4_1 = function() {
  var mml = '<msup><mi>x</mi><mrow><msub><mi>a</mi><mi>n</mi></msub>' +
      '<mo>+</mo><msub><mi>a</mi><mrow><mi>n</mi><mo>-</mo><mn>1</mn>' +
      '</mrow></msub></mrow></msup>';
  this.executeRuleTest(mml, 'x superíndice a super subíndice n superíndice' +
                       ' más a super subíndice n menos 1', 'default');
  this.executeRuleTest(mml, 'x sup a sup sub n más a sup sub n menos 1',
                       'brief');
  this.executeRuleTest(mml, 'x sup a sup sub n más a sup sub n menos 1',
                       'sbrief');
};


/**
 * Testing Rule 8.4, Example 2.
 */
sre.MathspeakSpanishTest.prototype.testSample_8_4_2 = function() {
  var mml = '<msup><mi>x</mi><msub><mi>a</mi><mi>b</mi></msub></msup>';
  this.executeRuleTest(mml, 'x superíndice a super subíndice b', 'default');
  this.executeRuleTest(mml, 'x sup a sup sub b', 'brief');
  this.executeRuleTest(mml, 'x sup a sup sub b', 'sbrief');
};


/**
 * Testing Rule 8.4, Example 3.
 */
sre.MathspeakSpanishTest.prototype.testSample_8_4_3 = function() {
  var mml = '<msub><mi>x</mi><msup><mi>a</mi><mi>b</mi></msup></msub>';
  this.executeRuleTest(mml, 'x subíndice a sub superíndice b', 'default');
  this.executeRuleTest(mml, 'x sub a sub sup b', 'brief');
  this.executeRuleTest(mml, 'x sub a sub sup b', 'sbrief');
};


/**
 * Testing Rule 8.4, Example 4.
 */
sre.MathspeakSpanishTest.prototype.testSample_8_4_4 = function() {
  var mml = '<mrow><msup><mi>y</mi><msup><mi>a</mi><msub><mi>b</mi>' +
      '<mi>c</mi></msub></msup></msup><mo>≠</mo><msup><mi>y</mi><mrow>' +
      '<msup><mi>a</mi><mi>b</mi></msup><mi>c</mi></mrow></msup></mrow>';
  this.executeRuleTest(mml, 'y superíndice a super superíndice b super' +
                       ' super subíndice c línea base no es igual a y' +
                       ' superíndice a super superíndice b superíndice c',
                       'default');
  this.executeRuleTest(mml, 'y sup a sup sup b sup sup sub c no es igual a' +
                       ' y sup a sup sup b c', 'brief');
  this.executeRuleTest(mml, 'y sup a sup sup b sup sup sub c no es igual a' +
                       ' y sup a sup sup b c', 'sbrief');
};


/**
 * Testing Rule 8.4, Example 5.
 */
sre.MathspeakSpanishTest.prototype.testSample_8_4_5 = function() {
  var mml = '<msup><mi>y</mi><msup><mi>a</mi><mrow><msub><mrow/><mi>c</mi>' +
      '</msub><mi>b</mi></mrow></msup></msup>';
  this.executeRuleTest(mml, 'y superíndice a super super subíndice c super' +
                       ' superíndice b', 'default');
  this.executeRuleTest(mml, 'y sup a sup sup sub c b', 'brief');
  this.executeRuleTest(mml, 'y sup a sup sup sub c b', 'sbrief');
};


/**
 * Testing Rule 8.4, Example 5, short.
 */
sre.MathspeakSpanishTest.prototype.testSample_8_4_5Short = function() {
  var mml = '<msup><mi>y</mi><msup><mi>a</mi><mrow><msub><mrow/><mi>c</mi>' +
      '</msub></mrow></msup></msup>';
  this.executeRuleTest(mml, 'y superíndice a super super subíndice c',
                       'default');
  this.executeRuleTest(mml, 'y sup a sup sup sub c', 'brief');
  this.executeRuleTest(mml, 'y sup a sup sup sub c', 'sbrief');
};


/**
 * Testing Rule 8.4, Example 5, Sup/Sub inversed.
 */
sre.MathspeakSpanishTest.prototype.testSample_8_4_5Inv = function() {
  var mml = '<msub><mi>y</mi><msub><mi>a</mi><mrow><msup><mrow/><mi>c</mi>' +
      '</msup></mrow></msub></msub>';
  this.executeRuleTest(mml, 'y subíndice a sub sub superíndice c', 'default');
  this.executeRuleTest(mml, 'y sub a sub sub sup c', 'brief');
  this.executeRuleTest(mml, 'y sub a sub sub sup c', 'sbrief');
};


/**
 * Testing Rule 8.4, Example 5, Sup/Sub inversed, short.
 */
sre.MathspeakSpanishTest.prototype.testSample_8_4_5InvShort = function() {
  var mml = '<msub><mi>y</mi><msub><mi>a</mi><mrow><msup><mrow/><mi>c</mi>' +
      '</msup><mi>b</mi></mrow></msub></msub>';
  this.executeRuleTest(mml, 'y subíndice a sub sub superíndice c sub' +
                       ' subíndice b', 'default');
  this.executeRuleTest(mml, 'y sub a sub sub sup c b', 'brief');
  this.executeRuleTest(mml, 'y sub a sub sub sup c b', 'sbrief');
};


/**
 * Testing Rule 8.4, Example 6.
 */
sre.MathspeakSpanishTest.prototype.testSample_8_4_6 = function() {
  var mml = '<msup><mi>x</mi><msup><mi>a</mi><mi>b</mi></msup></msup>';
  this.executeRuleTest(mml, 'x superíndice a super superíndice b', 'default');
  this.executeRuleTest(mml, 'x sup a sup sup b', 'brief');
  this.executeRuleTest(mml, 'x sup a sup sup b', 'sbrief');
};


/**
 * Testing Rule 8.4, Example 7.
 */
sre.MathspeakSpanishTest.prototype.testSample_8_4_7 = function() {
  var mml = '<msub><mi>x</mi><msub><mi>a</mi><mi>b</mi></msub></msub>';
  this.executeRuleTest(mml, 'x subíndice a sub subíndice b', 'default');
  this.executeRuleTest(mml, 'x sub a sub sub b', 'brief');
  this.executeRuleTest(mml, 'x sub a sub sub b', 'sbrief');
};


/**
 * Testing Rule 8.4, Example 8.
 */
sre.MathspeakSpanishTest.prototype.testSample_8_4_8 = function() {
  var mml = '<msup><mi>T</mi><mfenced separators="" open="(" close=")">' +
      '<msup><mi>x</mi><mi>a</mi></msup><mo>+</mo><msup><mi>y</mi>' +
      '<mi>b</mi></msup></mfenced></msup>';
  this.executeRuleTest(mml, 'mayúscula T superíndice paréntesis izquierdo x' +
                       ' super superíndice a superíndice más y super' +
                       ' superíndice b superíndice paréntesis derecho',
                       'default');
  this.executeRuleTest(mml, 'mayúscula T sup paréntesis izquierdo x sup sup' +
                       ' a más y sup sup b paréntesis derecho', 'brief');
  this.executeRuleTest(mml, 'mayúscula T sup paréntesis izquierdo x sup sup' +
                       ' a más y sup sup b paréntesis derecho', 'sbrief');
};


/**
 * Testing Rule 8.5, Example 1.
 */
sre.MathspeakSpanishTest.prototype.testSample_8_5_1 = function() {
  var mml = '<msub><mi>x</mi><mn>1</mn></msub>';
  this.executeRuleTest(mml, 'x subíndice 1', 'default');
  this.executeRuleTest(mml, 'x sub 1', 'brief');
  this.executeRuleTest(mml, 'x sub 1', 'sbrief');
};


/**
 * Testing Rule 8.5, Example 2.
 */
sre.MathspeakSpanishTest.prototype.testSample_8_5_2 = function() {
  var mml = '<msub><mi>x</mi><mrow><mo>-</mo><mn>1</mn></mrow></msub>';
  this.executeRuleTest(mml, 'x subíndice menos 1', 'default');
  this.executeRuleTest(mml, 'x sub menos 1', 'brief');
  this.executeRuleTest(mml, 'x sub menos 1', 'sbrief');
};


/**
 * Testing Rule 8.5, Example 3.
 */
sre.MathspeakSpanishTest.prototype.testSample_8_5_3 = function() {
  var mml = '<msub><mi>x</mi><mrow><mn>10000</mn></mrow>' +
      '</msub>';
  this.executeRuleTest(mml, 'x subíndice 10000', 'default');
  this.executeRuleTest(mml, 'x sub 10000', 'brief');
  this.executeRuleTest(mml, 'x sub 10000', 'sbrief');
};


/**
 * Testing Rule 8.5, Example 4.
 */
sre.MathspeakSpanishTest.prototype.testSample_8_5_4 = function() {
  var mml = '<msub><mi>x</mi><mrow><mn>1.3</mn></mrow>' +
      '</msub>';
  this.executeRuleTest(mml, 'x subíndice 1,3', 'default');
  this.executeRuleTest(mml, 'x sub 1,3', 'brief');
  this.executeRuleTest(mml, 'x sub 1,3', 'sbrief');
};


/**
 * Testing Rule 8.5, Example 5. (WORKS!)
 */
sre.MathspeakSpanishTest.prototype.testSample_8_5_5 = function() {
  var mml = '<mrow><mn>4</mn><mi>Fe</mi><mo>+</mo><mn>3</mn><msub>' +
      '<mi>O</mi><mn>2</mn></msub><mo>→</mo><mn>2</mn><msub><mi>Fe</mi>' +
      '<mn>2</mn></msub><msub><mi>O</mi><mn>3</mn></msub></mrow>';
  this.executeRuleTest(mml, '4 mayúscula F e más 3 mayúscula O subíndice 2' +
                       ' línea base flecha derecha 2 mayúscula F e' +
                       ' subíndice 2 línea base mayúscula O subíndice 3',
                       'default');
  this.executeRuleTest(mml, '4 mayúscula F e más 3 mayúscula O sub 2 flecha' +
                       ' derecha 2 mayúscula F e sub 2 mayúscula O sub 3',
                       'brief');
  this.executeRuleTest(mml, '4 mayúscula F e más 3 mayúscula O sub 2 flecha' +
                       ' derecha 2 mayúscula F e sub 2 mayúscula O sub 3',
                       'sbrief');
};


/**
 * Testing Rule 8.5, Example 6.
 */
sre.MathspeakSpanishTest.prototype.testSample_8_5_6 = function() {
  var mml = '<msub><mi>a</mi><mrow><mn>2</mn><mo>,</mo><mn>3</mn></mrow>' +
      '</msub>';
  this.executeRuleTest(mml, 'a subíndice 2 coma 3', 'default');
  this.executeRuleTest(mml, 'a sub 2 coma 3', 'brief');
  this.executeRuleTest(mml, 'a sub 2 coma 3', 'sbrief');
};


/**
 * Testing Rule 8.5, Example 7.
 */
sre.MathspeakSpanishTest.prototype.testSample_8_5_7 = function() {
  var mml = '<msub><mi>T</mi><mrow><msub><mi>n</mi><mn>1</mn></msub>' +
      '<mo>+</mo><msub><mi>n</mi><mn>0</mn></msub></mrow></msub>';
  this.executeRuleTest(mml, 'mayúscula T subíndice n sub subíndice 1' +
                       ' subíndice más n sub subíndice 0', 'default');
  this.executeRuleTest(mml, 'mayúscula T sub n sub sub 1 más n sub sub 0',
                       'brief');
  this.executeRuleTest(mml, 'mayúscula T sub n sub sub 1 más n sub sub 0',
                       'sbrief');
};


/**
 * Testing Rule 8.5, Example 8.
 */
sre.MathspeakSpanishTest.prototype.testSample_8_5_8 = function() {
  var mml = '<mrow><msub><mo form="prefix">log</mo><mn>2</mn></msub>' +
      '<mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow><mo>=</mo><mfrac><mrow>' +
      '<msub><mo form="prefix">log</mo><mn>10</mn></msub><mrow><mo>(</mo>' +
      '<mi>x</mi><mo>)</mo></mrow></mrow><mrow><msub>' +
      '<mo form="prefix">log</mo><mn>10</mn></msub><mrow><mo>(</mo>' +
      '<mn>2</mn><mo>)</mo></mrow></mrow></mfrac></mrow>';
  this.executeRuleTest(mml, 'logaritmo subíndice 2 línea base paréntesis' +
                       ' izquierdo x paréntesis derecho igual empezar' +
                       ' fracción logaritmo subíndice 10 línea base' +
                       ' paréntesis izquierdo x paréntesis derecho entre' +
                       ' logaritmo subíndice 10 línea base paréntesis' +
                       ' izquierdo 2 paréntesis derecho finalizar' +
                       ' fracción', 'default');
  this.executeRuleTest(mml, 'logaritmo sub 2 paréntesis izquierdo x' +
                       ' paréntesis derecho igual empezar frac logaritmo' +
                       ' sub 10 paréntesis izquierdo x paréntesis derecho' +
                       ' entre logaritmo sub 10 paréntesis izquierdo 2' +
                       ' paréntesis derecho finalizar frac', 'brief');
  this.executeRuleTest(mml, 'logaritmo sub 2 paréntesis izquierdo x' +
                       ' paréntesis derecho igual frac logaritmo sub 10' +
                       ' paréntesis izquierdo x paréntesis derecho entre' +
                       ' logaritmo sub 10 paréntesis izquierdo 2 paréntesis' +
                       ' derecho', 'sbrief');
};


/**
 * Testing Rule 8.5, Example 9.
 */
sre.MathspeakSpanishTest.prototype.testSample_8_5_9 = function() {
  var mml = '<msub><mi>Φ</mi><mn>5</mn></msub>';
  this.executeRuleTest(mml, 'mayúscula Phi subíndice 5', 'default');
  this.executeRuleTest(mml, 'mayúscula Phi sub 5', 'brief');
  this.executeRuleTest(mml, 'mayúscula Phi sub 5', 'sbrief');
};


/**
 * Testing Rule 8.5, Example 10.  (INTEGRAL! Maybe more tests!)
 */
sre.MathspeakSpanishTest.prototype.testSample_8_5_10 = function() {
  var mml = '<mrow><mo form="prefix">ln</mo><mi>x</mi><mo>=</mo><msubsup>' +
      '<mo>∫</mo><mn>1</mn><mi>x</mi></msubsup><mfrac><mrow><mi>d</mi>' +
      '<mi>t</mi></mrow><mi>t</mi></mfrac></mrow>';
  this.executeRuleTest(mml, 'logaritmo neperiano x igual integral definida' +
                       ' subíndice 1 superíndice x línea base empezar' +
                       ' fracción d t entre t finalizar fracción', 'default');
  this.executeRuleTest(mml, 'logaritmo neperiano x igual integral Sub 1 Sup' +
                       ' x Base empezar frac d t entre t finalizar frac',
                       'brief');
  this.executeRuleTest(mml, 'logaritmo neperiano x igual integral Sub 1 Sup' +
                       ' x Base frac d t entre t', 'sbrief');
};


/**
 * Testing Rule 8.6, Example 1.
 */
sre.MathspeakSpanishTest.prototype.testSample_8_6_1 = function() {
  var mml = '<mrow><mi>$</mi><mi>n</mi><mn>2</mn><mo>=</mo><mn>2</mn>' +
      '<mo>*</mo><mi>$</mi><mi>n</mi><mo>+</mo><mn>1</mn><mo>;</mo></mrow>';
  this.executeRuleTest(mml, 'dólar n línea base 2 igual 2 por dólar n más 1' +
                       ' punto y coma', 'default');
  this.executeRuleTest(mml, 'dólar n base 2 igual 2 por dólar n más 1 punto' +
                       ' y coma', 'brief');
  this.executeRuleTest(mml, 'dólar n base 2 igual 2 por dólar n más 1 punto' +
                       ' y coma', 'sbrief');
};


/**
 * Testing Rule 8.8, Example 1.
 */
sre.MathspeakSpanishTest.prototype.testSample_8_8_1_naive = function() {
  var mml = '<mmultiscripts><mi>x</mi><mrow><mi>e</mi><mi>f</mi></mrow>' +
      '<mrow><mi>g</mi><mi>h</mi></mrow><mprescripts/><mrow><mi>c</mi>' +
      '<mi>d</mi></mrow><mrow><mi>a</mi><mi>b</mi></mrow></mmultiscripts>';
  this.executeRuleTest(mml, 'subíndice c d superíndice a b línea base x' +
                       ' subíndice e f superíndice g h', 'default');
  this.executeRuleTest(mml, 'sub c d sup a b x sub e f sup g h', 'brief');
  this.executeRuleTest(mml, 'sub c d sup a b x sub e f sup g h', 'sbrief');
};


/**
 * Testing Rule 8.8, Example 1.
 */
sre.MathspeakSpanishTest.prototype.testSample_8_8_1 = function() {
  var mml = '<mmultiscripts><mi>x</mi><mi>e</mi>' +
      '<mi>g</mi><mi>f</mi><mi>h</mi><mprescripts/><mi>c</mi>' +
      '<mi>a</mi><mi>d</mi><mi>b</mi></mmultiscripts>';
  this.executeRuleTest(mml, 'subíndice c d superíndice a b línea base x' +
                       ' subíndice e f superíndice g h', 'default');
  this.executeRuleTest(mml, 'sub c d sup a b x sub e f sup g h', 'brief');
  this.executeRuleTest(mml, 'sub c d sup a b x sub e f sup g h', 'sbrief');
};


/**
 * Testing tensors Multi scripts.
 */
sre.MathspeakSpanishTest.prototype.testSampleTensorMultiSimpleABC = function() {
  var mml = '<mmultiscripts><mi>x</mi><msup><mi>c</mi><mi>l</mi></msup>' +
      '<mprescripts/><mi>a</mi><mi>b</mi></mmultiscripts>';
  this.executeRuleTest(mml, 'subíndice a superíndice b línea base x' +
                       ' subíndice c sub superíndice l', 'default');
  this.executeRuleTest(mml, 'sub a sup b x sub c sub sup l', 'brief');
  this.executeRuleTest(mml, 'sub a sup b x sub c sub sup l', 'sbrief');
};


/**
 * Testing tensors Multi scripts.
 */
sre.MathspeakSpanishTest.prototype.testSampleTensorMultiSub = function() {
  var mml = '<mmultiscripts><mi>x</mi><msub><mi>c</mi><mi>l</mi></msub>' +
      '<mi>d</mi><mprescripts/><mi>a</mi><mi>b</mi></mmultiscripts>';
  this.executeRuleTest(mml, 'subíndice a superíndice b línea base x' +
                       ' subíndice c sub subíndice l superíndice d', 'default');
  this.executeRuleTest(mml, 'sub a sup b x sub c sub sub l sup d', 'brief');
  this.executeRuleTest(mml, 'sub a sup b x sub c sub sub l sup d', 'sbrief');
};


/**
 * Testing tensors Multi scripts.
 */
sre.MathspeakSpanishTest.prototype.testSampleTensorMultiSubSup = function() {
  var mml = '<mmultiscripts><mi>x</mi><msub><mi>c</mi><msup><mi>l</mi>' +
      '<mi>k</mi></msup></msub><mi>d</mi><mi>e</mi><none/>' +
      '<mprescripts/><mi>a</mi><mi>b</mi></mmultiscripts>';
  this.executeRuleTest(mml, 'subíndice a superíndice b línea base x' +
                       ' subíndice c sub subíndice l sub sub superíndice k' +
                       ' subíndice e superíndice d', 'default');
  this.executeRuleTest(mml, 'sub a sup b x sub c sub sub l sub sub sup k e' +
                       ' sup d', 'brief');
  this.executeRuleTest(mml, 'sub a sup b x sub c sub sub l sub sub sup k e' +
                       ' sup d', 'sbrief');
};


/**
 * Testing tensors Multi scripts.
 */
sre.MathspeakSpanishTest.prototype.testSampleTensorMultiSimple = function() {
  var mml = '<mmultiscripts><mi>x</mi><msup><mi>c</mi><mi>l</mi></msup>' +
      '<mi>d</mi><mprescripts/><mi>a</mi><mi>b</mi></mmultiscripts>';
  this.executeRuleTest(mml, 'subíndice a superíndice b línea base x' +
                       ' subíndice c sub superíndice l superíndice d',
                       'default');
  this.executeRuleTest(mml, 'sub a sup b x sub c sub sup l sup d', 'brief');
  this.executeRuleTest(mml, 'sub a sup b x sub c sub sup l sup d', 'sbrief');
};


/**
 * Testing tensors Multi scripts.
 */
sre.MathspeakSpanishTest.prototype.testSampleTensorMultiComplex = function() {
  var mml = '<mmultiscripts><mi>x</mi><mrow><mi>c</mi><msup><mi>k</mi>' +
      '<mi>l</mi></msup></mrow><mi>d</mi>' +
      '<mprescripts/><mi>a</mi><mi>b</mi></mmultiscripts>';
  this.executeRuleTest(mml, 'subíndice a superíndice b línea base x' +
                       ' subíndice c k sub superíndice l superíndice d',
                       'default');
  this.executeRuleTest(mml, 'sub a sup b x sub c k sub sup l sup d', 'brief');
  this.executeRuleTest(mml, 'sub a sup b x sub c k sub sup l sup d', 'sbrief');
};


/**
 * Testing tensors ABCD.
 */
sre.MathspeakSpanishTest.prototype.testSampleTwoTensors = function() {
  var mml = '<mmultiscripts><mi>x</mi><mi>c</mi><mi>d</mi>' +
      '<mprescripts/><mi>a</mi><mi>b</mi></mmultiscripts>' +
      '<mmultiscripts><mi>x</mi><mi>c</mi><mi>d</mi>' +
      '<mprescripts/><mi>a</mi><mi>b</mi></mmultiscripts>';
  this.executeRuleTest(mml, 'subíndice a superíndice b línea base x' +
                       ' subíndice c superíndice d línea base subíndice a' +
                       ' superíndice b línea base x subíndice c superíndice d',
                       'default');
  this.executeRuleTest(mml, 'sub a sup b x sub c sup d sub a sup b x sub c' +
                       ' sup d', 'brief');
  this.executeRuleTest(mml, 'sub a sup b x sub c sup d sub a sup b x sub c' +
                       ' sup d', 'sbrief');
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
sre.MathspeakSpanishTest.prototype.testSamplePartialTensorABCD = function() {
  var mml = '<mmultiscripts><mi>x</mi><mi>c</mi><mi>d</mi>' +
      '<mprescripts/><mi>a</mi><mi>b</mi></mmultiscripts>';
  this.executeRuleTest(mml, 'subíndice a superíndice b línea base x' +
                       ' subíndice c superíndice d', 'default');
  this.executeRuleTest(mml, 'sub a sup b x sub c sup d', 'brief');
  this.executeRuleTest(mml, 'sub a sup b x sub c sup d', 'sbrief');
};


/**
 * Testing tensors ABC.
 */
sre.MathspeakSpanishTest.prototype.testSamplePartialTensorABC = function() {
  var mml = '<mmultiscripts><mi>x</mi><mi>c</mi>' +
      '<mprescripts/><mi>a</mi><mi>b</mi></mmultiscripts>';
  this.executeRuleTest(mml, 'subíndice a superíndice b línea base x' +
                       ' subíndice c', 'default');
  this.executeRuleTest(mml, 'sub a sup b x sub c', 'brief');
  this.executeRuleTest(mml, 'sub a sup b x sub c', 'sbrief');
};


/**
 * Testing tensors ABD.
 */
sre.MathspeakSpanishTest.prototype.testSamplePartialTensorABD = function() {
  var mml = '<mmultiscripts><mi>x</mi><none/><mi>d</mi>' +
      '<mprescripts/><mi>a</mi><mi>b</mi></mmultiscripts>';
  this.executeRuleTest(mml, 'subíndice a superíndice b línea base x' +
                       ' superíndice d', 'default');
  this.executeRuleTest(mml, 'sub a sup b x sup d', 'brief');
  this.executeRuleTest(mml, 'sub a sup b x sup d', 'sbrief');
};


/**
 * Testing tensors AB.
 */
sre.MathspeakSpanishTest.prototype.testSamplePartialTensorAB = function() {
  var mml = '<mmultiscripts><mi>x</mi>' +
      '<mprescripts/><mi>a</mi><mi>b</mi></mmultiscripts>';
  this.executeRuleTest(mml, 'subíndice a superíndice b línea base x',
                       'default');
  this.executeRuleTest(mml, 'sub a sup b x', 'brief');
  this.executeRuleTest(mml, 'sub a sup b x', 'sbrief');
};


/**
 * Testing tensors ABCR.
 */
sre.MathspeakSpanishTest.prototype.testSamplePartialTensorABCR = function() {
  var mml = '<mmultiscripts><mi>x</mi><mi>c</mi>' +
      '<mprescripts/><mi>a</mi><mi>b</mi></mmultiscripts><mi>r</mi>';
  this.executeRuleTest(mml, 'subíndice a superíndice b línea base x' +
                       ' subíndice c línea base r', 'default');
  this.executeRuleTest(mml, 'sub a sup b x sub c r', 'brief');
  this.executeRuleTest(mml, 'sub a sup b x sub c r', 'sbrief');
};


/**
 * Testing tensors ABCDR.
 */
sre.MathspeakSpanishTest.prototype.testSamplePartialTensorABCDR = function() {
  var mml = '<mmultiscripts><mi>x</mi><mi>c</mi><mi>d</mi>' +
      '<mprescripts/><mi>a</mi><mi>b</mi></mmultiscripts><mi>r</mi>';
  this.executeRuleTest(mml, 'subíndice a superíndice b línea base x' +
                       ' subíndice c superíndice d línea base r', 'default');
  this.executeRuleTest(mml, 'sub a sup b x sub c sup d r', 'brief');
  this.executeRuleTest(mml, 'sub a sup b x sub c sup d r', 'sbrief');
};


/**
 * Testing tensors Root of ABCD.
 */
sre.MathspeakSpanishTest.prototype.testSamplePartialTensorABCDRoot =
    function() {
  var mml = '<msqrt><mmultiscripts><mi>x</mi><mi>c</mi><mi>d</mi>' +
      '<mprescripts/><mi>a</mi><mi>b</mi></mmultiscripts></msqrt>';
  this.executeRuleTest(mml, 'empezar raíz cuadrada subíndice a superíndice' +
                       ' b línea base x subíndice c superíndice d línea' +
                       ' base finalizar raíz cuadrada', 'default');
  this.executeRuleTest(mml, 'empezar raíz cuadrada sub a sup b x sub c sup' +
                       ' d finalizar raíz cuadrada', 'brief');
  this.executeRuleTest(mml, 'raíz cuadrada sub a sup b x sub c sup d' +
                       ' finalizar raíz cuadrada', 'sbrief');
};


/**
 * Testing tensors Root ABCD . R.
 */
sre.MathspeakSpanishTest.prototype.testSamplePartialTensorABCDRootR =
    function() {
  var mml = '<msqrt><mmultiscripts><mi>x</mi><mi>c</mi><mi>d</mi>' +
      '<mprescripts/><mi>a</mi><mi>b</mi></mmultiscripts></msqrt><mi>r</mi>';
  this.executeRuleTest(mml, 'empezar raíz cuadrada subíndice a superíndice' +
                       ' b línea base x subíndice c superíndice d línea' +
                       ' base finalizar raíz cuadrada r', 'default');
  this.executeRuleTest(mml, 'empezar raíz cuadrada sub a sup b x sub c sup' +
                       ' d finalizar raíz cuadrada r', 'brief');
  this.executeRuleTest(mml, 'raíz cuadrada sub a sup b x sub c sup d' +
                       ' finalizar raíz cuadrada r', 'sbrief');
};


/**
 * Testing tensors Frac of ABCD.
 */
sre.MathspeakSpanishTest.prototype.testSamplePartialTensorABCDFrac =
    function() {
  var mml = '<mfrac><mn>1</mn><mmultiscripts><mi>x</mi><mi>c</mi><mi>d</mi>' +
      '<mprescripts/><mi>a</mi><mi>b</mi></mmultiscripts></mfrac>';
  this.executeRuleTest(mml, 'empezar fracción 1 entre subíndice a' +
                       ' superíndice b línea base x subíndice c superíndice' +
                       ' d línea base finalizar fracción', 'default');
  this.executeRuleTest(mml, 'empezar frac 1 entre sub a sup b x sub c sup d' +
                       ' finalizar frac', 'brief');
  this.executeRuleTest(mml, 'frac 1 entre sub a sup b x sub c sup d',
      'sbrief');
};


/**
 * Testing tensors Frac ABCD . R.
 */
sre.MathspeakSpanishTest.prototype.testSamplePartialTensorABCDFracR =
    function() {
  var mml = '<mfrac><mn>1</mn><mmultiscripts><mi>x</mi><mi>c</mi><mi>d</mi>' +
      '<mprescripts/><mi>a</mi><mi>b</mi></mmultiscripts></mfrac><mi>r</mi>';
  this.executeRuleTest(mml, 'empezar fracción 1 entre subíndice a' +
                       ' superíndice b línea base x subíndice c superíndice' +
                       ' d línea base finalizar fracción r', 'default');
  this.executeRuleTest(mml, 'empezar frac 1 entre sub a sup b x sub c sup d' +
                       ' finalizar frac r', 'brief');
  this.executeRuleTest(mml, 'frac 1 entre sub a sup b x sub c sup d r',
      'sbrief');
};


/**
 * Testing Rule additional examples for simple subscripts with square.
 */
sre.MathspeakSpanishTest.prototype.testSampleSimpleSquare = function() {
  var mml = '<msubsup><mi>T</mi><mn>0</mn><mn>2</mn></msubsup>';
  this.executeRuleTest(mml, 'mayúscula T subíndice 0 al cuadrado', 'default');
  mml = '<msup><msub><mi>T</mi><mn>0</mn></msub><mn>2</mn></msup>';
  this.executeRuleTest(mml, 'mayúscula T subíndice 0 línea base al cuadrado',
                       'default');
  this.executeRuleTest(mml, 'mayúscula T sub 0 al cuadrado', 'brief');
  this.executeRuleTest(mml, 'mayúscula T sub 0 al cuadrado', 'sbrief');
};


/**
 * Testing Rule additional examples for simple subscripts with cube.
 */
sre.MathspeakSpanishTest.prototype.testSampleSimpleCube = function() {
  var mml = '<msubsup><mi>T</mi><mn>0</mn><mn>3</mn></msubsup>';
  this.executeRuleTest(mml, 'mayúscula T subíndice 0 al cubo', 'default');
  mml = '<msup><msub><mi>T</mi><mn>0</mn></msub><mn>3</mn></msup>';
  this.executeRuleTest(mml, 'mayúscula T subíndice 0 línea base al cubo',
                       'default');
  this.executeRuleTest(mml, 'mayúscula T sub 0 al cubo', 'brief');
  this.executeRuleTest(mml, 'mayúscula T sub 0 al cubo', 'sbrief');
};


/**
 * Testing Rule 8.8, Example 2.
 */
sre.MathspeakSpanishTest.prototype.testSample_8_8_2 = function() {
  var mml = '<msubsup><mi>T</mi><mrow><mi>n</mi><mo>-</mo><mn>1</mn></mrow>' +
      '<mn>2</mn></msubsup>';
  this.executeRuleTest(mml, 'mayúscula T subíndice n menos 1 superíndice 2',
                       'default');
  this.executeRuleTest(mml, 'mayúscula T sub n menos 1 sup 2', 'brief');
  this.executeRuleTest(mml, 'mayúscula T sub n menos 1 sup 2', 'sbrief');
};


/**
 * Testing Rule 8.9, Example 1.
 */
sre.MathspeakSpanishTest.prototype.testSample_8_9_1 = function() {
  var mml = '<msup><mi>x</mi><mo>\'</mo></msup>';
  this.executeRuleTest(mml, 'x prima', 'default');
  this.executeRuleTest(mml, 'x prima', 'brief');
  this.executeRuleTest(mml, 'x prima', 'sbrief');
};


/**
 * Testing Rule 8.9, Example 2.
 */
sre.MathspeakSpanishTest.prototype.testSample_8_9_2 = function() {
  var mml = '<mrow><msup><mi>f</mi><mrow><mo>\'</mo><mo>\'</mo><mo>\'</mo>' +
      '</mrow></msup><mrow><mo>(</mo><mi>y</mi><mo>)</mo></mrow><mo>=</mo>' +
      '<mfrac><mrow><mi>d</mi><msup><mi>f</mi><mrow><mo>\'</mo><mo>\'</mo>' +
      '</mrow></msup><mrow><mo>(</mo><mi>y</mi><mo>)</mo></mrow></mrow>' +
      '<mrow><mi>d</mi><mi>y</mi></mrow></mfrac></mrow>';
  this.executeRuleTest(mml, 'f triple prima paréntesis izquierdo y' +
                       ' paréntesis derecho igual empezar fracción d f' +
                       ' doble prima paréntesis izquierdo y paréntesis' +
                       ' derecho entre d y finalizar fracción', 'default');
  this.executeRuleTest(mml, 'f triple prima paréntesis izquierdo y' +
                       ' paréntesis derecho igual empezar frac d f doble' +
                       ' prima paréntesis izquierdo y paréntesis derecho' +
                       ' entre d y finalizar frac', 'brief');
  this.executeRuleTest(mml, 'f triple prima paréntesis izquierdo y' +
                       ' paréntesis derecho igual frac d f doble prima' +
                       ' paréntesis izquierdo y paréntesis derecho entre d' +
                       ' y', 'sbrief');
};


/**
 * Testing Rule 8.10, Example 1.
 */
sre.MathspeakSpanishTest.prototype.testSample_8_10_1 = function() {
  var mml = '<mrow><msup><mi>ρ</mi><mo>\'</mo></msup><mo>=</mo><msubsup>' +
      '<mi>ρ</mi><mo>+</mo><mo>\'</mo></msubsup><mo>+</mo><msubsup>' +
      '<mi>ρ</mi><mo>-</mo><mo>\'</mo></msubsup></mrow>';
  this.executeRuleTest(mml, 'rho prima igual rho prima subíndice más línea' +
                       ' base más rho prima subíndice menos', 'default');
  this.executeRuleTest(mml, 'rho prima igual rho prima sub más más rho' +
                       ' prima sub menos', 'brief');
  this.executeRuleTest(mml, 'rho prima igual rho prima sub más más rho' +
                       ' prima sub menos', 'sbrief');
};


/**
 * Testing Rule 8.10, Example 2.
 */
sre.MathspeakSpanishTest.prototype.testSample_8_10_2 = function() {
  var mml = '<msubsup><mi>x</mi><mn>10</mn><mo>\'</mo></msubsup>';
  this.executeRuleTest(mml, 'x prima subíndice 10', 'default');
  this.executeRuleTest(mml, 'x prima sub 10', 'brief');
  this.executeRuleTest(mml, 'x prima sub 10', 'sbrief');
};


/**
 * Testing Rule 8.10, Example 3.
 */
sre.MathspeakSpanishTest.prototype.testSample_8_10_3 = function() {
  var mml = '<msubsup><mi>T</mi><mi>n</mi><mo>\'</mo></msubsup>';
  this.executeRuleTest(mml, 'mayúscula T prima subíndice n', 'default');
  this.executeRuleTest(mml, 'mayúscula T prima sub n', 'brief');
  this.executeRuleTest(mml, 'mayúscula T prima sub n', 'sbrief');
};


/**
 * Testing Rule 8.11, Example 1.
 */
sre.MathspeakSpanishTest.prototype.testSample_8_11_1 = function() {
  var mml = '<mfenced open="[" close="]"><mtable><mtr><mtd><msup><mi>x</mi>' +
      '<mi>n</mi></msup></mtd><mtd><msup><mi>y</mi><mi>n</mi></msup></mtd>' +
      '<mtd><msup><mi>z</mi><mi>n</mi></msup></mtd></mtr><mtr><mtd><msup>' +
      '<mi>x</mi><mrow><mi>n</mi><mo>+</mo><mn>1</mn></mrow></msup></mtd>' +
      '<mtd><msup><mi>y</mi><mrow><mi>n</mi><mo>+</mo><mn>1</mn></mrow>' +
      '</msup></mtd><mtd><msup><mi>z</mi><mrow><mi>n</mi><mo>+</mo>' +
      '<mn>1</mn></mrow></msup></mtd></mtr></mtable></mfenced>';
  this.executeRuleTest(mml, 'empezar matriz 2 por 3 primera fila primera' +
                       ' columna x superíndice n segunda columna y' +
                       ' superíndice n tercera columna z superíndice n' +
                       ' segunda fila primera columna x superíndice n más 1' +
                       ' segunda columna y superíndice n más 1 tercera' +
                       ' columna z superíndice n más 1 finalizar matriz',
                       'default');
  this.executeRuleTest(mml, 'empezar matriz 2 por 3 primera fila primera' +
                       ' columna x sup n segunda columna y sup n tercera' +
                       ' columna z sup n segunda fila primera columna x sup' +
                       ' n más 1 segunda columna y sup n más 1 tercera' +
                       ' columna z sup n más 1 finalizar matriz', 'brief');
  this.executeRuleTest(mml, 'matriz 2 por 3 primera  primera columna x sup' +
                       ' n segunda columna y sup n tercera columna z sup n' +
                       ' segunda  primera columna x sup n más 1 segunda' +
                       ' columna y sup n más 1 tercera columna z sup n más' +
                       ' 1 finalizar matriz', 'sbrief');
};


/**
 * Testing Rule 8.12, Example 1.
 */
sre.MathspeakSpanishTest.prototype.testSample_8_12_1 = function() {
  var mml = '<msup><mrow><msub><mi>x</mi><mi>a</mi></msub></mrow><mi>b</mi>' +
      '</msup>';
  this.executeRuleTest(mml, 'x subíndice a línea base superíndice b',
                       'default');
  this.executeRuleTest(mml, 'x sub a sup b', 'brief');
  this.executeRuleTest(mml, 'x sub a sup b', 'sbrief');
};


/**
 * Testing Rule 8.12, Example 2.
 */
sre.MathspeakSpanishTest.prototype.testSample_8_12_2 = function() {
  var mml = '<msub><mrow><msup><mi>x</mi><mi>b</mi></msup></mrow><mi>a</mi>' +
      '</msub>';
  this.executeRuleTest(mml, 'x superíndice b línea base subíndice a',
                       'default');
  this.executeRuleTest(mml, 'x sup b sub a', 'brief');
  this.executeRuleTest(mml, 'x sup b sub a', 'sbrief');
};


/**
 * Testing Rule 8.13, Example 1.
 */
sre.MathspeakSpanishTest.prototype.testSample_8_13_1 = function() {
  var mml = '<mrow><msup><mo form="prefix">log</mo><mn>4</mn></msup><msup>' +
      '<mrow/><mi>b</mi></msup><mi>x</mi></mrow>';
  this.executeRuleTest(mml, 'logaritmo superíndice 4 superíndice b línea' +
                       ' base x', 'default');
  this.executeRuleTest(mml, 'logaritmo sup 4 sup b x', 'brief');
  this.executeRuleTest(mml, 'logaritmo sup 4 sup b x', 'sbrief');
};


/**
 * Testing Rule 8.13, Example 2.
 */
sre.MathspeakSpanishTest.prototype.testSample_8_13_2 = function() {
  var mml = '<mrow><msub><mi>T</mi><mi>n</mi></msub><msub><mrow/><mi>a</mi>' +
      '</msub><mi>y</mi></mrow>';
  this.executeRuleTest(mml, 'mayúscula T subíndice n subíndice a línea base' +
                       ' y', 'default');
  this.executeRuleTest(mml, 'mayúscula T sub n sub a y', 'brief');
  this.executeRuleTest(mml, 'mayúscula T sub n sub a y', 'sbrief');
};


/**
 * Testing Rule 9.1, Example 1.
 */
sre.MathspeakSpanishTest.prototype.testSample_9_1_1 = function() {
  var mml = '<msqrt><mn>2</mn></msqrt>';
  this.executeRuleTest(mml, 'empezar raíz cuadrada 2 finalizar raíz' +
                       ' cuadrada', 'default');
  this.executeRuleTest(mml, 'empezar raíz cuadrada 2 finalizar raíz' +
                       ' cuadrada', 'brief');
  this.executeRuleTest(mml, 'raíz cuadrada 2 finalizar raíz cuadrada',
                       'sbrief');
};


// TODO: Get rid of indices for roots <= 10.
// TODO: Check out blackboard R.
/**
 * Testing Rule 9.1, Example 2.
 */
sre.MathspeakSpanishTest.prototype.testSample_9_1_2 = function() {
  var mml = '<msqrt><mrow><mi>m</mi><mo>+</mo><mi>n</mi></mrow></msqrt>';
  this.executeRuleTest(mml, 'empezar raíz cuadrada m más n finalizar raíz' +
                       ' cuadrada', 'default');
  this.executeRuleTest(mml, 'empezar raíz cuadrada m más n finalizar raíz' +
                       ' cuadrada', 'brief');
  this.executeRuleTest(mml, 'raíz cuadrada m más n finalizar raíz cuadrada',
                       'sbrief');
};


/**
 * Testing Rule 9.2, Example 1.
 */
sre.MathspeakSpanishTest.prototype.testSample_9_2_1 = function() {
  var mml = '<mroot><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mrow>' +
      '<mi>m</mi><mo>+</mo><mi>n</mi></mrow></mroot>';
  this.executeRuleTest(mml, 'índice de raíz m más n empezar raíz x más y' +
                       ' finalizar raíz', 'default');
  this.executeRuleTest(mml, 'índice de raíz m más n empezar raíz x más y' +
                       ' finalizar raíz', 'brief');
  this.executeRuleTest(mml, 'm más n raíz x más y finalizar raíz', 'sbrief');
};


/**
 * Testing Rule 9.2, Example 2.
 */
sre.MathspeakSpanishTest.prototype.testSample_9_2_2 = function() {
  var mml = '<mrow><mroot><msup><mi>x</mi><mi>m</mi></msup><mi>n</mi>' +
      '</mroot><mo>=</mo><msup><mfenced separators="" open="(" close=")">' +
      '<mroot><mi>x</mi><mi>n</mi></mroot></mfenced><mi>m</mi></msup>' +
      '<mo>=</mo><msup><mi>x</mi><mfrac><mi>m</mi><mi>n</mi></mfrac>' +
      '</msup><mo>,</mo><mi>x</mi><mo>></mo><mn>0</mn></mrow>';
  this.executeRuleTest(mml, 'índice de raíz n empezar raíz x superíndice m' +
                       ' línea base finalizar raíz igual paréntesis' +
                       ' izquierdo índice de raíz n empezar raíz x' +
                       ' finalizar raíz paréntesis derecho superíndice m' +
                       ' línea base igual x superíndice empezar fracción m' +
                       ' entre n finalizar fracción línea base coma x mayor' +
                       ' que 0', 'default');
  this.executeRuleTest(mml, 'índice de raíz n empezar raíz x sup m' +
                       ' finalizar raíz igual paréntesis izquierdo índice' +
                       ' de raíz n empezar raíz x finalizar raíz paréntesis' +
                       ' derecho sup m igual x sup empezar frac m entre n' +
                       ' finalizar frac coma x mayor que 0', 'brief');
  this.executeRuleTest(mml, 'n raíz x sup m finalizar raíz igual paréntesis' +
                       ' izquierdo n raíz x finalizar raíz paréntesis' +
                       ' derecho sup m igual x sup frac m entre n coma x' +
                       ' mayor que 0', 'sbrief');
};


/**
 * Testing Rule 9.2, Example 3.
 */
sre.MathspeakSpanishTest.prototype.testSample_9_2_3 = function() {
  var mml = '<mrow><mroot><mi>x</mi><mn>3</mn></mroot><mo>=</mo><msup>' +
      '<mi>x</mi><mfrac><mn>1</mn><mn>3</mn></mfrac></msup></mrow>';
  this.executeRuleTest(mml, 'empezar raíz cúbica x finalizar raíz cúbica' +
                       ' igual x superíndice empezar fracción 1 entre 3' +
                       ' finalizar fracción', 'default');
  this.executeRuleTest(mml, 'empezar raíz cúbica x finalizar raíz cúbica' +
                       ' igual x sup empezar frac 1 entre 3 finalizar' +
                       ' frac', 'brief');
  this.executeRuleTest(mml, 'raíz cúbica x finalizar raíz cúbica igual x' +
                       ' sup frac 1 entre 3', 'sbrief');
};


/**
 * Testing Rule 9.3, Example 1.
 */
sre.MathspeakSpanishTest.prototype.testSample_9_3_1 = function() {
  var mml = '<msqrt><mrow><msqrt><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow>' +
      '</msqrt><mo>+</mo><msqrt><mrow><mi>y</mi><mo>+</mo><mn>1</mn>' +
      '</mrow></msqrt></mrow></msqrt>';
  this.executeRuleTest(mml, 'empezar raíz cuadrada empezar raíz cuadrada x' +
                       ' más 1 finalizar raíz cuadrada más empezar raíz' +
                       ' cuadrada y más 1 finalizar raíz cuadrada finalizar' +
                       ' raíz cuadrada', 'default');
  this.executeRuleTest(mml, 'empezar raíz cuadrada empezar raíz cuadrada x' +
                       ' más 1 finalizar raíz cuadrada más empezar raíz' +
                       ' cuadrada y más 1 finalizar raíz cuadrada finalizar' +
                       ' raíz cuadrada', 'brief');
  this.executeRuleTest(mml, 'raíz cuadrada raíz cuadrada x más 1 finalizar' +
                       ' raíz cuadrada más raíz cuadrada y más 1 finalizar' +
                       ' raíz cuadrada finalizar raíz cuadrada', 'sbrief');
};


/**
 * Testing Rule 9.3, Example 2.
 */
sre.MathspeakSpanishTest.prototype.testSample_9_3_2 = function() {
  var mml = '<mrow><mroot><mroot><mi>x</mi><mi>m</mi></mroot><mi>n</mi>' +
      '</mroot><mo>=</mo><mroot><mroot><mi>x</mi><mi>n</mi></mroot>' +
      '<mi>m</mi></mroot></mrow>';
  this.executeRuleTest(mml, 'índice de raíz n empezar raíz índice de raíz m' +
                       ' empezar raíz x finalizar raíz finalizar raíz igual' +
                       ' índice de raíz m empezar raíz índice de raíz n' +
                       ' empezar raíz x finalizar raíz finalizar raíz',
                       'default');
  this.executeRuleTest(mml, 'índice de raíz n empezar raíz índice de raíz m' +
                       ' empezar raíz x finalizar raíz finalizar raíz igual' +
                       ' índice de raíz m empezar raíz índice de raíz n' +
                       ' empezar raíz x finalizar raíz finalizar raíz',
                       'brief');
  this.executeRuleTest(mml, 'n raíz m raíz x finalizar raíz finalizar raíz' +
                       ' igual m raíz n raíz x finalizar raíz finalizar' +
                       ' raíz', 'sbrief');
};


/**
 * Testing Rule 9.3, Example 3.
 */
sre.MathspeakSpanishTest.prototype.testSample_9_3_3 = function() {
  var mml = '<mrow><msup><mi>x</mi><mrow><mi>e</mi><mo>-</mo><mn>2</mn>' +
      '</mrow></msup><mo>=</mo><msqrt><mrow><mi>x</mi><mroot><mrow>' +
      '<mi>x</mi><mroot><mrow><mi>x</mi><mroot><mrow><mi>x</mi>' +
      '<mo>&#x2026;</mo></mrow><mn>5</mn></mroot></mrow><mn>4</mn></mroot>' +
      '</mrow><mn>3</mn></mroot></mrow></msqrt><mo>,</mo><mi>x</mi>' +
      '<mo>∈</mo><mi>ℝ</mi></mrow>';
  this.executeRuleTest(mml, 'x superíndice e menos 2 línea base igual' +
                       ' empezar raíz cuadrada x empezar raíz cúbica x' +
                       ' empezar raíz a la cuarta x empezar raíz a la' +
                       ' quinta x puntos suspensivos finalizar raíz a la' +
                       ' quinta finalizar raíz a la cuarta finalizar raíz' +
                       ' cúbica finalizar raíz cuadrada coma x' +
                       ' perteneciente a negrita de pizarra mayúscula R',
                       'default');
  this.executeRuleTest(mml, 'x sup e menos 2 igual empezar raíz cuadrada x' +
                       ' empezar raíz cúbica x empezar raíz a la cuarta x' +
                       ' empezar raíz a la quinta x puntos suspensivos' +
                       ' finalizar raíz a la quinta finalizar raíz a la' +
                       ' cuarta finalizar raíz cúbica finalizar raíz' +
                       ' cuadrada coma x perteneciente a negrita de pizarra' +
                       ' mayúscula R', 'brief');
  this.executeRuleTest(mml, 'x sup e menos 2 igual raíz cuadrada x raíz' +
                       ' cúbica x raíz a la cuarta x raíz a la quinta x' +
                       ' puntos suspensivos finalizar raíz a la quinta' +
                       ' finalizar raíz a la cuarta finalizar raíz cúbica' +
                       ' finalizar raíz cuadrada coma x perteneciente a' +
                       ' negrita de pizarra mayúscula R', 'sbrief');
};


/**
 * Testing Rule 9.3, Example 4.
 */
sre.MathspeakSpanishTest.prototype.testSample_9_3_4 = function() {
  var mml = '<mrow><mfrac><mn>2</mn><mi>π</mi></mfrac><mo>=</mo>' +
      '<mfrac><msqrt><mn>2</mn></msqrt><mn>2</mn></mfrac>' +
      '<mfrac><msqrt><mrow><mn>2</mn><mo>+</mo><msqrt><mn>2</mn></msqrt>' +
      '</mrow></msqrt><mn>2</mn></mfrac><mfrac><msqrt><mrow><mn>2</mn>' +
      '<mo>+</mo><msqrt><mrow><mn>2</mn><mo>+</mo><msqrt><mn>2</mn>' +
      '</msqrt></mrow></msqrt></mrow></msqrt><mn>2</mn></mfrac>' +
      '<mo>&#x2026;</mo></mrow>';
  this.executeRuleTest(mml, 'empezar fracción 2 entre pi finalizar fracción' +
                       ' igual empezar fracción empezar raíz cuadrada 2' +
                       ' finalizar raíz cuadrada entre 2 finalizar fracción' +
                       ' empezar fracción empezar raíz cuadrada 2 más' +
                       ' empezar raíz cuadrada 2 finalizar raíz cuadrada' +
                       ' finalizar raíz cuadrada entre 2 finalizar fracción' +
                       ' empezar fracción empezar raíz cuadrada 2 más' +
                       ' empezar raíz cuadrada 2 más empezar raíz cuadrada' +
                       ' 2 finalizar raíz cuadrada finalizar raíz cuadrada' +
                       ' finalizar raíz cuadrada entre 2 finalizar fracción' +
                       ' puntos suspensivos', 'default');
  this.executeRuleTest(mml, 'empezar frac 2 entre pi finalizar frac igual' +
                       ' empezar frac empezar raíz cuadrada 2 finalizar' +
                       ' raíz cuadrada entre 2 finalizar frac empezar frac' +
                       ' empezar raíz cuadrada 2 más empezar raíz cuadrada' +
                       ' 2 finalizar raíz cuadrada finalizar raíz cuadrada' +
                       ' entre 2 finalizar frac empezar frac empezar raíz' +
                       ' cuadrada 2 más empezar raíz cuadrada 2 más empezar' +
                       ' raíz cuadrada 2 finalizar raíz cuadrada finalizar' +
                       ' raíz cuadrada finalizar raíz cuadrada entre 2' +
                       ' finalizar frac puntos suspensivos', 'brief');
  this.executeRuleTest(mml, 'frac 2 entre pi igual frac raíz cuadrada 2' +
                       ' finalizar raíz cuadrada entre 2 frac raíz' +
                       ' cuadrada 2 más raíz cuadrada 2 finalizar raíz' +
                       ' cuadrada finalizar raíz cuadrada entre 2 frac' +
                       ' raíz cuadrada 2 más raíz cuadrada 2 más raíz' +
                       ' cuadrada 2 finalizar raíz cuadrada finalizar raíz' +
                       ' cuadrada finalizar raíz cuadrada entre 2 puntos' +
                       ' suspensivos', 'sbrief');
};


/**
 * Testing Rule 10.1, Example 1.
 */
sre.MathspeakSpanishTest.prototype.testSample_10_1_1 = function() {
  var mml = '<mrow><mfrac><mrow><mn>5</mn><mi>x</mi>' +
      '<menclose notation="updiagonalstrike"><mi>y</mi></menclose></mrow>' +
      '<mrow><mn>2</mn><menclose notation="updiagonalstrike"><mi>y</mi>' +
      '</menclose></mrow></mfrac><mo>=</mo><mfrac><mn>5</mn><mn>2</mn>' +
      '</mfrac><mi>x</mi></mrow>';
  this.executeRuleTest(mml, 'empezar fracción 5 x tachado y finalizar' +
                       ' tachado entre 2 tachado y finalizar tachado' +
                       ' finalizar fracción igual empezar fracción 5 entre' +
                       ' 2 finalizar fracción x', 'default');
  this.executeRuleTest(mml, 'empezar frac 5 x tachado y finalizar tachado' +
                       ' entre 2 tachado y finalizar tachado finalizar frac' +
                       ' igual empezar frac 5 entre 2 finalizar frac x',
                       'brief');
  this.executeRuleTest(mml, 'frac 5 x tachado y finalizar tachado entre 2' +
                       ' tachado y finalizar tachado igual frac 5 entre 2' +
                       ' x', 'sbrief');
};


/**
 * Testing Rule 10.2, Example 1.
 */
sre.MathspeakSpanishTest.prototype.testSample_10_2_1 = function() {
  var mml = '<mrow><mfrac><mn>12</mn><mn>18</mn></mfrac><mo>=</mo><mfrac>' +
      '<mover><menclose notation="updiagonalstrike"><mn>12</mn></menclose>' +
      '<mn>2</mn></mover><munder><menclose notation="updiagonalstrike">' +
      '<mn>18</mn></menclose><mn>3</mn></munder></mfrac><mo>=</mo><mfrac>' +
      '<mn>2</mn><mn>3</mn></mfrac></mrow>';
  this.executeRuleTest(mml, 'empezar fracción 12 entre 18 finalizar' +
                       ' fracción igual empezar fracción tachado 12 con 2' +
                       ' finalizar tachado entre tachado 18 con 3 finalizar' +
                       ' tachado finalizar fracción igual empezar fracción' +
                       ' 2 entre 3 finalizar fracción', 'default');
  this.executeRuleTest(mml, 'empezar frac 12 entre 18 finalizar frac igual' +
                       ' empezar frac tachado 12 con 2 finalizar tachado' +
                       ' entre tachado 18 con 3 finalizar tachado finalizar' +
                       ' frac igual empezar frac 2 entre 3 finalizar frac',
                       'brief');
  this.executeRuleTest(mml, 'frac 12 entre 18 igual frac tachado 12 con 2' +
                       ' finalizar tachado entre tachado 18 con 3' +
                       ' finalizar tachado igual frac 2 entre 3', 'sbrief');
};


/**
 * Reversed version of the above example.
 * Testing Rule 10.2, Example 2.
 */
sre.MathspeakSpanishTest.prototype.testSample_10_2_2 = function() {
  var mml = '<mrow><mfrac><mn>12</mn><mn>18</mn></mfrac><mo>=</mo><mfrac>' +
      '<munder><mn>2</mn><menclose notation="updiagonalstrike"><mn>12</mn>' +
      '</menclose></munder><mover><mn>3</mn>' +
      '<menclose notation="updiagonalstrike">' +
      '<mn>18</mn></menclose></mover></mfrac><mo>=</mo><mfrac>' +
      '<mn>2</mn><mn>3</mn></mfrac></mrow>';
  this.executeRuleTest(mml, 'empezar fracción 12 entre 18 finalizar' +
                       ' fracción igual empezar fracción tachado 12 con 2' +
                       ' finalizar tachado entre tachado 18 con 3 finalizar' +
                       ' tachado finalizar fracción igual empezar fracción' +
                       ' 2 entre 3 finalizar fracción', 'default');
  this.executeRuleTest(mml, 'empezar frac 12 entre 18 finalizar frac igual' +
                       ' empezar frac tachado 12 con 2 finalizar tachado' +
                       ' entre tachado 18 con 3 finalizar tachado finalizar' +
                       ' frac igual empezar frac 2 entre 3 finalizar frac',
                       'brief');
  this.executeRuleTest(mml, 'frac 12 entre 18 igual frac tachado 12 con 2' +
                       ' finalizar tachado entre tachado 18 con 3' +
                       ' finalizar tachado igual frac 2 entre 3', 'sbrief');
};


/**
 * Testing Rule 11.1, Example 1.
 */
sre.MathspeakSpanishTest.prototype.testSample_11_1_1 = function() {
  var mml = '<mover accent="true"><mi>x</mi><mo>¨</mo></mover>';
  this.executeRuleTest(mml, 'modificando superior x con diéresis', 'default');
  this.executeRuleTest(mml, 'mod superior x con diéresis', 'brief');
  this.executeRuleTest(mml, 'mod superior x con diéresis', 'sbrief');
};


/**
 * Testing Rule 11.1, Example 2.
 */
sre.MathspeakSpanishTest.prototype.testSample_11_1_2 = function() {
  var mml = '<mover accent="true"><mrow><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '</mrow><mo>→</mo></mover>';
  this.executeRuleTest(mml, 'modificando superior x más y con flecha' +
                       ' derecha', 'default');
  this.executeRuleTest(mml, 'mod superior x más y con flecha derecha', 'brief');
  this.executeRuleTest(mml, 'mod superior x más y con flecha derecha',
                       'sbrief');
};


/**
 * Testing Rule 11.1, Example 3.
 */
sre.MathspeakSpanishTest.prototype.testSample_11_1_3 = function() {
  var mml = '<mover accent="true"><mi>x</mi><mo>^</mo></mover>';
  this.executeRuleTest(mml, 'modificando superior x con circunflejo',
                       'default');
  this.executeRuleTest(mml, 'mod superior x con circunflejo', 'brief');
  this.executeRuleTest(mml, 'mod superior x con circunflejo', 'sbrief');
};


/**
 * Testing Rule 11.2, Example 1.
 */
sre.MathspeakSpanishTest.prototype.testSample_11_2_1 = function() {
  var mml = '<munder accent="true"><mi>x</mi><mi>˙</mi></munder>';
  this.executeRuleTest(mml, 'modificando inferior x con punto en superescrito',
                       'default');
  this.executeRuleTest(mml, 'mod inferior x con punto en superescrito',
                       'brief');
  this.executeRuleTest(mml, 'mod inferior x con punto en superescrito',
                       'sbrief');
};


/**
 * Testing Rule 11.3, Example 1.
 */
sre.MathspeakSpanishTest.prototype.testSample_11_3_1 = function() {
  var mml = '<mover accent="true"><mi>x</mi><mo>˜</mo></mover>';
  this.executeRuleTest(mml, 'x tilde', 'default');
  this.executeRuleTest(mml, 'x tilde', 'brief');
  this.executeRuleTest(mml, 'x tilde', 'sbrief');
};


/**
 * Testing Rule 11.3, Example 2.
 */
sre.MathspeakSpanishTest.prototype.testSample_11_3_2 = function() {
  var mml = '<mover accent="true"><mi>x</mi><mo>¯</mo></mover>';
  this.executeRuleTest(mml, 'x barra', 'default');
  this.executeRuleTest(mml, 'x barra', 'brief');
  this.executeRuleTest(mml, 'x barra', 'sbrief');
};


/**
 * Testing Rule 11.3, Example 3.
 */
sre.MathspeakSpanishTest.prototype.testSample_11_3_3 = function() {
  var mml = '<munder accentunder="true"><mi>y</mi><mo>˜</mo></munder>';
  this.executeRuleTest(mml, 'y subtilde', 'default');
  this.executeRuleTest(mml, 'y subtilde', 'brief');
  this.executeRuleTest(mml, 'y subtilde', 'sbrief');
};


/**
 * Testing Rule 11.4, Example 1.
 */
sre.MathspeakSpanishTest.prototype.testSample_11_4_1 = function() {
  var mml = '<mover accent="true"><mover accent="true"><mi>x</mi><mo>¯</mo>' +
      '</mover><mo>¯</mo></mover>';
  this.executeRuleTest(mml, 'x barra barra', 'default');
  this.executeRuleTest(mml, 'x barra barra', 'brief');
  this.executeRuleTest(mml, 'x barra barra', 'sbrief');
};


/**
 * Testing Rule 11.4, Example 2.
 */
sre.MathspeakSpanishTest.prototype.testSample_11_4_2 = function() {
  var mml = '<munder><munder><mover accent="true"><mover accent="true">' +
      '<mi>y</mi><mo>¯</mo></mover><mo>¯</mo></mover>' +
      '<mo>\u005F</mo></munder><mo>\u005F</mo></munder>';
  this.executeRuleTest(mml, 'y barra barra subbarra subbarra', 'default');
  this.executeRuleTest(mml, 'y barra barra subbarra subbarra', 'brief');
  this.executeRuleTest(mml, 'y barra barra subbarra subbarra', 'sbrief');
};


/**
 * Testing Rule 11.6, Example 1.
 */
sre.MathspeakSpanishTest.prototype.testSample_11_6_1 = function() {
  var mml = '<munder accentunder="true"><munder><mrow><mi>a</mi><mo>+</mo>' +
      '<mi>b</mi></mrow><mo>\u005F</mo></munder><mo>*</mo></munder>';
  this.executeRuleTest(mml, 'modificando inferior inferior modificando' +
                       ' inferior a más b con subrayado con por', 'default');
  this.executeRuleTest(mml, 'mod inferior inferior mod inferior a más b con' +
                       ' subrayado con por', 'brief');
  this.executeRuleTest(mml, 'mod inferior inferior mod inferior a más b con' +
                       ' subrayado con por', 'sbrief');
};


/**
 * Testing Rule 11.6, Example 3.
 */
sre.MathspeakSpanishTest.prototype.testSample_11_6_3 = function() {
  var mml = '<mover><mover accent="true"><mrow><mi>x</mi><mo>+</mo>' +
      '<mi>y</mi></mrow><mo>˜</mo></mover><mo>¯</mo></mover>';
  this.executeRuleTest(mml, 'modificando superior superior modificando' +
                       ' superior x más y con tilde con barra', 'default');
  this.executeRuleTest(mml, 'mod superior superior mod superior x más y con' +
                       ' tilde con barra', 'brief');
  this.executeRuleTest(mml, 'mod superior superior mod superior x más y con' +
                       ' tilde con barra', 'sbrief');
};


/**
 * Testing Rule 11.7, Example 1.
 */
sre.MathspeakSpanishTest.prototype.testSample_11_7_1 = function() {
  var mml = '<mrow><munderover><mo>∑</mo><mrow><mi>n</mi><mo>=</mo>' +
      '<mn>1</mn></mrow><mi>∞</mi></munderover><msub><mi>a</mi><mi>n</mi>' +
      '</msub></mrow>';
  this.executeRuleTest(mml, 'sumatorio bajoíndice n igual 1 sobreíndice' +
                       ' infinito finalizar índices a subíndice n', 'default');
  this.executeRuleTest(mml, 'sumatorio bajoíndice n igual 1 sobreíndice' +
                       ' infinito finalizar índices a sub n', 'brief');
  this.executeRuleTest(mml, 'sumatorio bajoíndice n igual 1 sobreíndice' +
                       ' infinito finalizar índices a sub n', 'sbrief');
};


/**
 * Testing Rule 11.8, Example 1.
 */
sre.MathspeakSpanishTest.prototype.testSample_11_8_1 = function() {
  var mml = '<mrow><munder><munder><munder><mrow><mi>x</mi><mo>+</mo>' +
      '<mi>y</mi></mrow> <mo>\u005F</mo></munder><mrow><mi>a</mi>' +
      '<mo>=</mo><mn>5</mn></mrow></munder><mrow><mi>b</mi><mo>=</mo>' +
      '<mn>3</mn></mrow></munder></mrow>';
  this.executeRuleTest(mml, 'modificando inferior x más y con subrayado' +
                       ' bajoíndice a igual 5 bajobajoíndice b igual 3' +
                       ' finalizar índices', 'default');
  this.executeRuleTest(mml, 'mod inferior x más y con subrayado bajoíndice' +
                       ' a igual 5 bajobajoíndice b igual 3 finalizar' +
                       ' índices', 'brief');
  this.executeRuleTest(mml, 'mod inferior x más y con subrayado bajoíndice' +
                       ' a igual 5 bajobajoíndice b igual 3 finalizar' +
                       ' índices', 'sbrief');
};


/**
 * Testing Rule 11.8, Example 2.
 */
sre.MathspeakSpanishTest.prototype.testSample_11_8_2 = function() {
  var mml = '<mrow><mover><mover><mover><mrow><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '</mrow><mo>¯</mo></mover><mrow><mi>n</mi><mo>=</mo><mn>1</mn></mrow>' +
      '</mover><mrow><mi>m</mi><mo>=</mo><mn>2</mn></mrow></mover></mrow>';
  this.executeRuleTest(mml, 'modificando superior x más y con barra' +
                       ' sobreíndice n igual 1 sobresobreíndice m igual 2' +
                       ' finalizar índices', 'default');
  this.executeRuleTest(mml, 'mod superior x más y con barra sobreíndice n' +
                       ' igual 1 sobresobreíndice m igual 2 finalizar' +
                       ' índices', 'brief');
  this.executeRuleTest(mml, 'mod superior x más y con barra sobreíndice n' +
                       ' igual 1 sobresobreíndice m igual 2 finalizar' +
                       ' índices', 'sbrief');
};


/**
 * Testing Rule 12.1, Example 1.
 */
sre.MathspeakSpanishTest.prototype.testSample_12_1_1 = function() {
  var mml = '<mrow><msub><mo form="prefix">log</mo><mi>b</mi></msub>' +
      '<mi>x</mi></mrow>';
  this.executeRuleTest(mml, 'logaritmo subíndice b línea base x', 'default');
  this.executeRuleTest(mml, 'logaritmo sub b x', 'brief');
  this.executeRuleTest(mml, 'logaritmo sub b x', 'sbrief');
};


/**
 * Testing Rule 12.1, Example 2.
 */
sre.MathspeakSpanishTest.prototype.testSample_12_1_2 = function() {
  var mml = '<mrow><mo form="prefix">cos</mo><mi>y</mi></mrow>';
  this.executeRuleTest(mml, 'coseno y', 'default');
  this.executeRuleTest(mml, 'coseno y', 'brief');
  this.executeRuleTest(mml, 'coseno y', 'sbrief');
};


/**
 * Testing Rule 12.1, Example 3.
 */
sre.MathspeakSpanishTest.prototype.testSample_12_1_3 = function() {
  var mml = '<mrow><mo form="prefix">sin</mo><mi>x</mi></mrow>';
  this.executeRuleTest(mml, 'seno x', 'default');
  this.executeRuleTest(mml, 'seno x', 'brief');
  this.executeRuleTest(mml, 'seno x', 'sbrief');
};


/**
 * Testing Rule 13.1, Example 1.
 */
sre.MathspeakSpanishTest.prototype.testSample_13_1_1 = function() {
  var mml = '<mrow><mfrac><mrow><mn>60</mn>' +
      '<menclose notation="updiagonalstrike"><mi mathvariant="normal"' +
      ' class="MathML-Unit">mi</mi></menclose>' +
      '</mrow><menclose notation="updiagonalstrike"><mi mathvariant="normal"' +
      ' class="MathML-Unit">hr</mi>' +
      '</menclose></mfrac><mo>×</mo><mfrac><mrow><mn>5280</mn>' +
      '<mi mathvariant="normal" class="MathML-Unit">ft</mi></mrow><mrow>' +
      '<mn>1</mn><menclose notation="updiagonalstrike">' +
      '<mi mathvariant="normal" class="MathML-Unit">mi</mi></menclose>' +
      '</mrow></mfrac><mo>×</mo><mfrac><mrow><mn>1</mn>' +
      '<menclose notation="updiagonalstrike"><mi mathvariant="normal"' +
      ' class="MathML-Unit">hr</mi></menclose>' +
      '</mrow><mrow><mn>60</mn><mi mathvariant="normal"' +
      ' class="MathML-Unit">min</mi></mrow></mfrac><mo>=</mo>' +
      '<mfrac><mrow><mn>5280</mn><mi mathvariant="normal"' +
      ' class="MathML-Unit">ft</mi>' +
      '</mrow><mi mathvariant="normal" class="MathML-Unit">min</mi>' +
      '</mfrac></mrow>';
  this.executeRuleTest(mml, 'empezar fracción 60 tachado millas finalizar' +
                       ' tachado entre tachado horas finalizar tachado' +
                       ' finalizar fracción por empezar fracción 5280 pies' +
                       ' entre 1 tachado millas finalizar tachado finalizar' +
                       ' fracción por empezar fracción 1 tachado horas' +
                       ' finalizar tachado entre 60 minutos finalizar' +
                       ' fracción igual empezar fracción 5280 pies entre' +
                       ' minutos finalizar fracción', 'default');
  this.executeRuleTest(mml, 'empezar frac 60 tachado millas finalizar' +
                       ' tachado entre tachado horas finalizar tachado' +
                       ' finalizar frac por empezar frac 5280 pies entre 1' +
                       ' tachado millas finalizar tachado finalizar frac' +
                       ' por empezar frac 1 tachado horas finalizar tachado' +
                       ' entre 60 minutos finalizar frac igual empezar frac' +
                       ' 5280 pies entre minutos finalizar frac', 'brief');
  this.executeRuleTest(mml, 'frac 60 tachado millas finalizar tachado entre' +
                       ' tachado horas finalizar tachado por frac 5280' +
                       ' pies entre 1 tachado millas finalizar tachado por' +
                       ' frac 1 tachado horas finalizar tachado entre 60' +
                       ' minutos igual frac 5280 pies entre minutos',
                       'sbrief');
};


/**
 * Testing Rule 13.1, Example 2.
 */
sre.MathspeakSpanishTest.prototype.testSample_13_1_2 = function() {
  var mml = '<mrow><mn>1</mn><mi mathvariant="normal"' +
      ' class="MathML-Unit">J</mi><mo>=</mo><mn>1</mn>' +
      '<mi mathvariant="normal" class="MathML-Unit">kg</mi><mo>·</mo><msup>' +
      '<mi mathvariant="normal" class="MathML-Unit">m</mi><mn>2</mn></msup>' +
      '<mo>·</mo><msup><mi mathvariant="normal" class="MathML-Unit">s</mi>' +
      '<mrow><mo>-</mo><mn>2</mn></mrow>' +
      '</msup></mrow>';
  this.executeRuleTest(mml, '1 Joule igual 1 kilogramo por metros al' +
                       ' cuadrado por segundos superíndice menos 2', 'default');
  this.executeRuleTest(mml, '1 Joule igual 1 kilogramo por metros al' +
                       ' cuadrado por segundos sup menos 2', 'brief');
  this.executeRuleTest(mml, '1 Joule igual 1 kilogramo por metros al' +
                       ' cuadrado por segundos sup menos 2', 'sbrief');
};


/**
 * Testing Rule 13.1, Example 3.
 */
sre.MathspeakSpanishTest.prototype.testSample_13_1_3 = function() {
  var mml = '<mrow><mi>m</mi><mi mathvariant="normal"' +
      ' class="MathML-Unit">m</mi></mrow><mo>=</mo><mn>100</mn>' +
      '<mi>m</mi><mi mathvariant="normal" class="MathML-Unit">cm</mi>' +
      '<mo>=</mo><mrow><mfrac><mi>m</mi><mn>1000</mn></mfrac>' +
      '<mi mathvariant="normal" class="MathML-Unit">km</mi></mrow>';
  this.executeRuleTest(mml, 'm metros igual 100 m centímetros igual empezar' +
                       ' fracción m entre 1000 finalizar fracción kilómetros',
                       'default');
  this.executeRuleTest(mml, 'm metros igual 100 m centímetros igual empezar' +
                       ' frac m entre 1000 finalizar frac kilómetros', 'brief');
  this.executeRuleTest(mml, 'm metros igual 100 m centímetros igual frac m' +
                       ' entre 1000 kilómetros', 'sbrief');
};


/**
 * Testing Rule 13.1, Example 4.
 */
sre.MathspeakSpanishTest.prototype.testSample_13_1_4 = function() {
  var mml = '<mrow><mn>1</mn><mi mathvariant="normal"' +
      ' class="MathML-Unit">mi</mi></mrow><mo>≈</mo>' +
      '<mrow><mn>1.6</mn><mi mathvariant="normal"' +
      ' class="MathML-Unit">km</mi></mrow>';
  this.executeRuleTest(mml, '1 milla aproximado 1,6 kilómetros', 'default');
  this.executeRuleTest(mml, '1 milla aproximado 1,6 kilómetros', 'brief');
  this.executeRuleTest(mml, '1 milla aproximado 1,6 kilómetros', 'sbrief');
};


/**
 * Testing Rule 13.1, Example 5.
 */
sre.MathspeakSpanishTest.prototype.testSample_13_1_5 = function() {
  var mml = '<mrow><mn>1</mn><mi mathvariant="normal"' +
      ' class="MathML-Unit">in</mi><mo>=</mo><mn>2.54</mn>' +
      '<mi mathvariant="normal" class="MathML-Unit">cm</mi></mrow>';
  this.executeRuleTest(mml, '1 pulgada igual 2,54 centímetros', 'default');
  this.executeRuleTest(mml, '1 pulgada igual 2,54 centímetros', 'brief');
  this.executeRuleTest(mml, '1 pulgada igual 2,54 centímetros', 'sbrief');
};


/**
 * Testing Rule 14.1, Example 1.
 */
sre.MathspeakSpanishTest.prototype.testSample_14_1_1 = function() {
  var mml = '<mtable><mtr><mtd><msub><mi>H</mi><mn>2</mn></msub></mtd><mtd>' +
      '<mo>+</mo></mtd><mtd><msub><mi>F</mi><mn>2</mn></msub></mtd><mtd>' +
      '<mo>→</mo></mtd><mtd><mrow><mn>2</mn><mi>H</mi><mi>F</mi></mrow>' +
      '</mtd></mtr><mtr><mtd><mtext>hydrogen</mtext></mtd><mtd/><mtd>' +
      '<mtext>fluorine</mtext></mtd><mtd/><mtd><mrow>' +
      '<mtext>hydrogen</mtext><mspace width="4.pt"/>' +
      '<mtext>fluoride</mtext></mrow></mtd></mtr></mtable>';
  this.executeRuleTest(mml, 'empezar esquema primera fila primera columna' +
                       ' mayúscula H subíndice 2 segunda columna más' +
                       ' tercera columna mayúscula F subíndice 2 cuarta' +
                       ' columna flecha derecha quinta columna 2 mayúscula' +
                       ' H mayúscula F segunda fila primera columna' +
                       ' hydrogen segunda columna espacio tercera columna' +
                       ' fluorine cuarta columna espacio quinta columna' +
                       ' hydrogen fluoride finalizar esquema', 'default');
  this.executeRuleTest(mml, 'empezar esquema primera fila primera columna' +
                       ' mayúscula H sub 2 segunda columna más tercera' +
                       ' columna mayúscula F sub 2 cuarta columna flecha' +
                       ' derecha quinta columna 2 mayúscula H mayúscula F' +
                       ' segunda fila primera columna hydrogen segunda' +
                       ' columna espacio tercera columna fluorine cuarta' +
                       ' columna espacio quinta columna hydrogen fluoride' +
                       ' finalizar esquema', 'brief');
  this.executeRuleTest(mml, 'esquema primera fila primera columna mayúscula' +
                       ' H sub 2 segunda columna más tercera columna' +
                       ' mayúscula F sub 2 cuarta columna flecha derecha' +
                       ' quinta columna 2 mayúscula H mayúscula F segunda' +
                       ' fila primera columna hydrogen segunda columna' +
                       ' espacio tercera columna fluorine cuarta columna' +
                       ' espacio quinta columna hydrogen fluoride finalizar' +
                       ' esquema', 'sbrief');
};


/**
 * Testing Rule 14.3, Example 1.
 */
sre.MathspeakSpanishTest.prototype.testSample_14_3_1 = function() {
  var mml = '<mrow><mi>x</mi><mo>=</mo>' +
      '<mfenced separators="" open="{" close=""><mtable><mtr><mtd><mrow>' +
      '<mi>y</mi><mo>&lt;</mo><mn>0</mn></mrow></mtd><mtd><mn>0</mn></mtd>' +
      '</mtr><mtr><mtd><mrow><mi>y</mi><mo>≥</mo><mn>0</mn></mrow></mtd>' +
      '<mtd><mrow><mn>2</mn><mi>y</mi></mrow></mtd></mtr></mtable>' +
      '</mfenced></mrow>';
  this.executeRuleTest(mml, 'x igual empezar esquema llave izquierda' +
                       ' alargada primera fila primera columna y menor que' +
                       ' 0 segunda columna 0 segunda fila primera columna y' +
                       ' mayor o igual que 0 segunda columna 2 y finalizar' +
                       ' esquema', 'default');
  this.executeRuleTest(mml, 'x igual empezar esquema llave izquierda' +
                       ' alargada primera fila primera columna y menor que' +
                       ' 0 segunda columna 0 segunda fila primera columna y' +
                       ' mayor o igual que 0 segunda columna 2 y finalizar' +
                       ' esquema', 'brief');
  this.executeRuleTest(mml, 'x igual esquema llave izquierda alargada' +
                       ' primera fila primera columna y menor que 0 segunda' +
                       ' columna 0 segunda fila primera columna y mayor o' +
                       ' igual que 0 segunda columna 2 y finalizar' +
                       ' esquema', 'sbrief');
};


/**
 * Testing Rule 15.1, Example 1.
 */
sre.MathspeakSpanishTest.prototype.testSample_15_1_1 = function() {
  var mml = '<mfenced open="[" close="]"><mtable><mtr><mtd><mrow><mi>x</mi>' +
      '<mo>+</mo><mi>a</mi></mrow></mtd><mtd><mrow><mi>x</mi><mo>+</mo>' +
      '<mi>b</mi></mrow></mtd><mtd><mrow><mi>x</mi><mo>+</mo><mi>c</mi>' +
      '</mrow></mtd></mtr><mtr><mtd><mrow><mi>y</mi><mo>+</mo><mi>a</mi>' +
      '</mrow></mtd><mtd><mrow><mi>y</mi><mo>+</mo><mi>b</mi></mrow></mtd>' +
      '<mtd><mrow><mi>y</mi><mo>+</mo><mi>c</mi></mrow></mtd></mtr><mtr>' +
      '<mtd><mrow><mi>z</mi><mo>+</mo><mi>a</mi></mrow></mtd><mtd><mrow>' +
      '<mi>z</mi><mo>+</mo><mi>b</mi></mrow></mtd><mtd><mrow><mi>z</mi>' +
      '<mo>+</mo><mi>c</mi></mrow></mtd></mtr></mtable></mfenced>';
  this.executeRuleTest(mml, 'empezar matriz 3 por 3 primera fila primera' +
                       ' columna x más a segunda columna x más b tercera' +
                       ' columna x más c segunda fila primera columna y más' +
                       ' a segunda columna y más b tercera columna y más c' +
                       ' tercera fila primera columna z más a segunda' +
                       ' columna z más b tercera columna z más c finalizar' +
                       ' matriz', 'default');
  this.executeRuleTest(mml, 'empezar matriz 3 por 3 primera fila primera' +
                       ' columna x más a segunda columna x más b tercera' +
                       ' columna x más c segunda fila primera columna y más' +
                       ' a segunda columna y más b tercera columna y más c' +
                       ' tercera fila primera columna z más a segunda' +
                       ' columna z más b tercera columna z más c finalizar' +
                       ' matriz', 'brief');
  this.executeRuleTest(mml, 'matriz 3 por 3 primera  primera columna x más' +
                       ' a segunda columna x más b tercera columna x más c' +
                       ' segunda  primera columna y más a segunda columna y' +
                       ' más b tercera columna y más c tercera  primera' +
                       ' columna z más a segunda columna z más b tercera' +
                       ' columna z más c finalizar matriz', 'sbrief');
};


/**
 * Testing Rule 15.2, Example 1.
 */
sre.MathspeakSpanishTest.prototype.testSample_15_2_1 = function() {
  var mml = '<mrow><mfenced open="|" close="|"><mtable><mtr><mtd><mrow>' +
      '<mi>a</mi><mo>+</mo><mn>1</mn></mrow></mtd><mtd><mi>b</mi></mtd>' +
      '</mtr><mtr><mtd><mi>c</mi></mtd><mtd><mi>d</mi></mtd></mtr>' +
      '</mtable></mfenced><mo>=</mo><mrow><mo>(</mo><mi>a</mi><mo>+</mo>' +
      '<mn>1</mn><mo>)</mo></mrow><mi>d</mi><mo>-</mo><mi>b</mi><mi>c</mi>' +
      '</mrow>';
  this.executeRuleTest(mml, 'empezar determinante 2 por 2 primera fila' +
                       ' primera columna a más 1 segunda columna b segunda' +
                       ' fila primera columna c segunda columna d finalizar' +
                       ' determinante igual paréntesis izquierdo a más 1' +
                       ' paréntesis derecho d menos b c', 'default');
  this.executeRuleTest(mml, 'empezar determinante 2 por 2 primera fila' +
                       ' primera columna a más 1 segunda columna b segunda' +
                       ' fila primera columna c segunda columna d finalizar' +
                       ' determinante igual paréntesis izquierdo a más 1' +
                       ' paréntesis derecho d menos b c', 'brief');
  this.executeRuleTest(mml, 'determinante 2 por 2 primera fila primera' +
                       ' columna a más 1 segunda columna b segunda fila' +
                       ' primera columna c segunda columna d finalizar' +
                       ' determinante igual paréntesis izquierdo a más 1' +
                       ' paréntesis derecho d menos b c', 'sbrief');
};


/**
 * Testing Rule 15.4, Example 1.
 */
sre.MathspeakSpanishTest.prototype.testSample_15_4_1 = function() {
  var mml = '<mrow><mfenced open="|" close="|"><mtable><mtr><mtd><mi>a</mi>' +
      '</mtd><mtd><mi>b</mi></mtd></mtr><mtr><mtd><mi>c</mi></mtd><mtd>' +
      '<mi>d</mi></mtd></mtr></mtable></mfenced><mo>=</mo><mi>a</mi>' +
      '<mi>d</mi><mo>-</mo><mi>b</mi><mi>c</mi></mrow>';
  this.executeRuleTest(mml, 'empezar determinante 2 por 2 primera fila a b' +
                       ' segunda fila c d finalizar determinante igual a d' +
                       ' menos b c', 'default');
  this.executeRuleTest(mml, 'empezar determinante 2 por 2 primera fila a b' +
                       ' segunda fila c d finalizar determinante igual a d' +
                       ' menos b c', 'brief');
  this.executeRuleTest(mml, 'determinante 2 por 2 primera fila a b segunda' +
                       ' fila c d finalizar determinante igual a d menos b' +
                       ' c', 'sbrief');
};


/**
 * Testing Rule 15.6, Example 1.
 */
sre.MathspeakSpanishTest.prototype.testSample_15_6_1 = function() {
  var mml = '<mfenced open="(" close=")"><mtable><mtr><mtd><mi>x</mi></mtd>' +
      '</mtr><mtr><mtd><mi>y</mi></mtd></mtr></mtable></mfenced>';
  this.executeRuleTest(mml, 'empezar binomial x en y finalizar binomial',
                       'default');
  this.executeRuleTest(mml, 'empezar binomial x en y finalizar binomial',
                       'brief');
  this.executeRuleTest(mml, 'binomial x en y finalizar binomial', 'sbrief');
};

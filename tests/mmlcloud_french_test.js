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
 * @fileoverview Testcases resulting from Mathml Cloud project, often inspired
 *     by bugs.
 * @author Volker.Sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.MmlcloudFrenchTest');

goog.require('sre.AbstractRuleTest');



/**
 * @constructor
 * @extends {sre.AbstractRuleTest}
 */
sre.MmlcloudFrenchTest = function() {
  sre.MmlcloudFrenchTest.base(this, 'constructor');

  /**
   * @override
   */
  this.information = 'Mathml Cloud French tests.';

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
  this.locale = 'fr';

  /**
   * @override
   */
  this.rules = ['MathspeakRules', 'MathspeakFrench'];

  this.actual = true;
  this.setActive('MathmlCloudFrench');

};
goog.inherits(sre.MmlcloudFrenchTest, sre.AbstractRuleTest);


/**
 * Testing for correct treatment of special HTML entities: non-breaking spaces,
 * left and right angle bracket.
 */
sre.MmlcloudFrenchTest.prototype.testHtmlEntities = function() {
  var mml = '<mo>&lt;</mo>';
  this.executeRuleTest(mml, 'menor que', 'default');
  mml = '<mo>&gt;</mo>';
  this.executeRuleTest(mml, 'mayor que', 'default');
  mml = '<mi>n&nbsp;</mi>';
  this.executeRuleTest(mml, 'n', 'default');
  mml = '<mi>&nbsp;m</mi>';
  this.executeRuleTest(mml, 'm', 'default');
  mml = '<mi>n&nbsp;m</mi>';
  this.executeRuleTest(mml, 'n m', 'default');
  mml = '<mi>&nbsp;&nbsp;n&nbsp;&nbsp;m&nbsp;&nbsp;</mi>';
  this.executeRuleTest(mml, 'n m', 'default');
};


/**
 * Testing binomial coefficients made from fractions.
 */
sre.MmlcloudFrenchTest.prototype.testBinomialFromFrac = function() {
  var mml = '<mfenced><mfrac linethickness="0pt"><mi>n</mi>' +
      '<mi>k</mi></mfrac></mfenced>';
  this.executeRuleTest(mml, 'empezar binomial n en k finalizar binomial',
                       'default');
  mml = '<mfenced><mfrac linethickness="0.0em"><mi>n</mi>' +
        '<mi>k</mi></mfrac></mfenced>';
  this.executeRuleTest(mml, 'empezar binomial n en k finalizar binomial',
                       'default');
  mml = '<mfenced><mfrac linethickness="negativeverythinmathspace"><mi>n</mi>' +
        '<mi>k</mi></mfrac></mfenced>';
  this.executeRuleTest(mml, 'empezar binomial n en k finalizar binomial',
                       'default');
  mml = '<mfenced><mfrac linethickness="verythinmathspace"><mi>n</mi>' +
        '<mi>k</mi></mfrac></mfenced>';
  this.executeRuleTest(mml, 'paréntesis izquierdo empezar fracción n entre' +
                       ' k finalizar fracción paréntesis derecho', 'default');
  mml = '<mfenced><mfrac linethickness="1pt"><mi>n</mi>' +
        '<mi>k</mi></mfrac></mfenced>';
  this.executeRuleTest(mml, 'paréntesis izquierdo empezar fracción n entre' +
                       ' k finalizar fracción paréntesis derecho', 'default');
  mml = '<mfenced><mfrac linethickness="0.5pt"><mi>n</mi>' +
        '<mi>k</mi></mfrac></mfenced>';
  this.executeRuleTest(mml, 'paréntesis izquierdo empezar fracción n entre' +
                       ' k finalizar fracción paréntesis derecho', 'default');
};


/**
 * Test unnecessary spaces.
 */
sre.MmlcloudFrenchTest.prototype.testUnnecessarySpaces = function() {
  var mml = '<mn> 5 </mn>';
  this.executeRuleTest(mml, '5', 'default');
  mml = '<mn> &nbsp; 5 &nbsp; </mn>';
  this.executeRuleTest(mml, '5', 'default');
};


/**
 * Absolute values versus other netural fences.
 */
sre.MmlcloudFrenchTest.prototype.testAbsValueVsNeutral = function() {
  var mml = '<mo>|</mo><mi>a</mi><mo>|</mo>';
  this.executeRuleTest(mml, 'empezar valor absoluto a finalizar valor absoluto',
                       'default');
  this.executeRuleTest(mml, 'empezar valor absoluto a finalizar valor absoluto',
                       'brief');
  this.executeRuleTest(mml, 'valor absoluto a finalizar valor absoluto',
                       'sbrief');
  mml = '<mo>｜</mo><mi>a</mi><mo>｜</mo>';
  this.executeRuleTest(mml, 'empezar valor absoluto a finalizar valor absoluto',
                       'default');
  this.executeRuleTest(mml, 'valor absoluto a finalizar valor absoluto',
                       'sbrief');
  mml = '<mo>｜</mo><mi>a</mi><mo>‖</mo>';
  this.executeRuleTest(mml, 'barra vertical a doble barra vertical', 'default');
  mml = '<mo>‖</mo><mi>a</mi><mo>‖</mo>';
  this.executeRuleTest(mml, 'doble barra vertical a doble barra vertical',
                       'default');
  mml = '<mo>¦</mo><mi>a</mi><mo>¦</mo>';
  this.executeRuleTest(mml, 'barra vertical partida a barra vertical partida',
                       'default');
};


/**
 * Negative vulgar fraction.
 */
sre.MmlcloudFrenchTest.prototype.testNegativeVulgarFraction = function() {
  var mml = '<mo>-</mo><mfrac><mn>5</mn><mn>18</mn></mfrac>';
  this.executeRuleTest(mml, 'menos empezar fracción 5 entre 18 finalizar' +
                       ' fracción', 'default');
  this.executeRuleTest(mml, 'menos empezar frac 5 entre 18 finalizar frac',
                       'brief');
  this.executeRuleTest(mml, 'menos frac 5 entre  18', 'sbrief');
  mml = '<mfrac><mn>1</mn><mn>2</mn></mfrac><mo>-</mo>' +
      '<mfrac><mn>5</mn><mn>18</mn></mfrac>';
  this.executeRuleTest(mml, 'empezar fracción 1 entre 2 finalizar fracción' +
                       ' menos empezar fracción 5 entre 18 finalizar' +
                       ' fracción', 'default');
  mml = '<mo>-</mo><mfrac><mn>5.2</mn><mi>a</mi></mfrac>';
  this.executeRuleTest(mml, 'menos empezar fracción 5,2 entre a finalizar' +
                       ' fracción', 'default');
  mml = '<mo>-</mo><mfrac><mn>5.2</mn><mn>18</mn></mfrac>';
  this.executeRuleTest(mml, 'menos empezar fracción 5,2 entre 18 finalizar' +
                       ' fracción', 'default');
};


/**
 * Testing trivial things.
 */
sre.MmlcloudFrenchTest.prototype.testTrivialStuff = function() {
  var mml = '<mtext>a</mtext><mo>=</mo><mi>b</mi>';
  this.executeRuleTest(mml, 'a igual b', 'default');
  mml = '<mo>"</mo>';
  this.executeRuleTest(mml, 'comillas', 'default');
  mml = '<mo>"</mo><mi>x</mi><mo>"</mo>';
  this.executeRuleTest(mml, 'comillas x comillas', 'default');
  mml = '<mo>\'</mo>';
  this.executeRuleTest(mml, 'prima', 'default');
};


/**
 * Testing German fonts.
 */
sre.MmlcloudFrenchTest.prototype.testGermanFonts = function() {
  var mml = '<mi mathvariant="fraktur">A</mi>';
  this.executeRuleTest(mml, 'Fraktur mayúscula A', 'default');
  mml = '<mi mathvariant="bold-fraktur">A</mi>';
  this.executeRuleTest(mml, 'negrita Fraktur mayúscula A', 'default');
  this.executeRuleTest('<mi>&#x1D504;</mi>', 'Fraktur mayúscula A', 'default');
  this.executeRuleTest('<mi>&#x1D56C;</mi>', 'negrita Fraktur mayúscula A',
                       'default');
  mml = '<mtext mathvariant="bold-fraktur">abc</mtext>';
  this.executeRuleTest(mml, 'negrita Fraktur abc', 'default');
  mml = '<mtext mathvariant="bold-fraktur">ABC</mtext>';
  this.executeRuleTest(mml, 'negrita Fraktur ABC', 'default');
  mml = '<mi mathvariant="bold-fraktur">ABC</mi>';
  this.executeRuleTest(mml, 'negrita Fraktur mayúscula A mayúscula B' +
                       ' mayúscula C', 'default');
};


/**
 * Testing other fonts.
 */
sre.MmlcloudFrenchTest.prototype.testOtherFonts = function() {
  this.executeRuleTest('<mi>m</mi>', 'm', 'default');
  this.executeRuleTest('<mi mathvariant="normal">m</mi>', 'normal m',
                       'default');
  this.executeRuleTest('<mi>mi</mi>', 'm i', 'default');
  this.executeRuleTest('<mi mathvariant="italic">mi</mi>', 'cursiva m i',
                       'default');
  this.executeRuleTest('<mi>30</mi>', '30', 'default');
  this.executeRuleTest('<mi>3</mi>', 'cursiva 3', 'default');
  this.executeRuleTest('<mi>30°</mi>', '30 grado', 'default');
  this.executeRuleTest('<mi>30mA</mi>', '3 0 m mayúscula A', 'default');
};


/**
 * Testing non-alpha identifier.
 */
sre.MmlcloudFrenchTest.prototype.testNonalphaIdentifier = function() {
  var mml = '<mi>30°</mi>';
  this.executeRuleTest(mml, '30 grado', 'default');
  this.executeRuleTest(mml, '30 grado', 'brief');
  this.executeRuleTest(mml, '30 grado', 'sbrief');
};


/**
 * Testing Chemistry Upper.
 */
sre.MmlcloudFrenchTest.prototype.testMixedIdentifier = function() {
  var mml = '<mrow><mi mathvariant="normal">Si</mi><msub>' +
      '<mi mathvariant="normal">O</mi><mn>2</mn></msub><mo>+</mo><mn>6</mn>' +
      '<mi mathvariant="normal">H</mi><mi mathvariant="normal">F</mi>' +
      '<mo>&#x2192;</mo><msub><mi mathvariant="normal">H</mi><mn>2</mn>' +
      '</msub><mi mathvariant="normal">Si</mi><msub>' +
      '<mi mathvariant="normal">F</mi><mn>6</mn></msub><mo>+</mo><mn>2</mn>' +
      '<msub><mi mathvariant="normal">H</mi><mn>2</mn></msub>' +
      '<mi mathvariant="normal">O</mi></mrow>';
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


// TODO (sorge) Test currently fails as the parenthesis is seen to be
//     embellished! Should work again once embellished parenthesis are fully
//     rewritten.
/**
 * Testing Parenthesis with Superscript.
 * Simplified test case for expression 95.
 */
sre.MmlcloudFrenchTest.prototype.testParenSuper = function() {
  var mml = '<mo>(</mo><mi>a</mi><msup><mo>)</mo><mn>2</mn></msup>';
  this.executeRuleTest(mml, 'paréntesis izquierdo a paréntesis derecho al' +
                       ' cuadrado', 'default');
  this.executeRuleTest(mml, 'paréntesis izquierdo a paréntesis derecho al' +
                       ' cuadrado', 'brief');
  this.executeRuleTest(mml, 'paréntesis izquierdo a paréntesis derecho al' +
                       ' cuadrado', 'sbrief');
};


/**
 * Testing Parenthesis with convoluted operator.
 * Simplified test case for expression 98.
 */
sre.MmlcloudFrenchTest.prototype.testParenConvoluted = function() {
  var mml = '<mo>(</mo><mo>-</mo><msup><mi>x</mi><mn>2</mn></msup>' +
          '<mo>/2)</mo>';
  this.executeRuleTest(mml, 'paréntesis izquierdo menos x al cuadrado barra' +
                       ' oblicua 2 paréntesis derecho', 'default');
  this.executeRuleTest(mml, 'paréntesis izquierdo menos x al cuadrado barra' +
                       ' oblicua 2 paréntesis derecho', 'brief');
  this.executeRuleTest(mml, 'paréntesis izquierdo menos x al cuadrado barra' +
                       ' oblicua 2 paréntesis derecho', 'sbrief');
};


/**
 * Testing Superscript Baseline expression in relation-sequence
 * Simplified test case for expression 62.
 */
sre.MmlcloudFrenchTest.prototype.testSupBaseRelseq = function() {
  var mml = '<mrow><msub><mrow><mi>c</mi></mrow><mrow><mn>1</mn></mrow>' +
      '</msub><msup><mrow><mi>h</mi></mrow><mrow><mn>4</mn><mo>-</mo>' +
      '<mn>2</mn><mi>s</mi></mrow></msup><mo>&#x2264;</mo><mfrac>' +
      '<mrow><mn>1</mn></mrow><mrow><mn>2</mn><mi>T</mi></mrow></mfrac>' +
      '<mo>&#x2264;</mo><msub><mrow><mi>c</mi></mrow><mrow><mn>2</mn>' +
      '</mrow></msub><msup><mrow><mi>h</mi></mrow><mrow><mn>4</mn>' +
      '<mo>-</mo><mn>2</mn><mi>s</mi></mrow></msup></mrow>';
  this.executeRuleTest(mml, 'c subíndice 1 línea base h superíndice 4 menos' +
                       ' 2 s línea base menor o igual que empezar fracción' +
                       ' 1 entre 2 mayúscula T finalizar fracción menor o' +
                       ' igual que c subíndice 2 línea base h superíndice 4' +
                       ' menos 2 s', 'default');
  this.executeRuleTest(mml, 'c sub 1 h sup 4 menos 2 s menor o igual que' +
                       ' empezar frac 1 entre 2 mayúscula T finalizar frac' +
                       ' menor o igual que c sub 2 h sup 4 menos 2 s', 'brief');
  this.executeRuleTest(mml, 'c sub 1 h sup 4 menos 2 s menor o igual que' +
                       ' frac 1 entre  2 mayúscula T menor o igual que c' +
                       ' sub 2 h sup 4 menos 2 s', 'sbrief');
};


/**
 * Testing Superscript Baseline expression in multi-relation.
 * Simplified test case similar to expression 62.
 */
sre.MmlcloudFrenchTest.prototype.testSupBaseMultirel = function() {
  var mml = '<mrow><msub><mrow><mi>c</mi></mrow><mrow><mn>1</mn></mrow>' +
      '</msub><msup><mrow><mi>h</mi></mrow><mrow><mn>4</mn><mo>-</mo>' +
      '<mn>2</mn><mi>s</mi></mrow></msup><mo>&#x2264;</mo><mfrac><mrow>' +
      '<mn>1</mn></mrow><mrow><mn>2</mn><mi>T</mi></mrow></mfrac><mo>=</mo>' +
      '<msub><mrow><mi>c</mi></mrow><mrow><mn>2</mn></mrow></msub><msup>' +
      '<mrow><mi>h</mi></mrow><mrow><mn>4</mn><mo>-</mo><mn>2</mn>' +
      '<mi>s</mi></mrow></msup></mrow>';
  this.executeRuleTest(mml, 'c subíndice 1 línea base h superíndice 4 menos' +
                       ' 2 s línea base menor o igual que empezar fracción' +
                       ' 1 entre 2 mayúscula T finalizar fracción igual c' +
                       ' subíndice 2 línea base h superíndice 4 menos 2 s',
                       'default');
  this.executeRuleTest(mml, 'c sub 1 h sup 4 menos 2 s menor o igual que' +
                       ' empezar frac 1 entre 2 mayúscula T finalizar frac' +
                       ' igual c sub 2 h sup 4 menos 2 s', 'brief');
  this.executeRuleTest(mml, 'c sub 1 h sup 4 menos 2 s menor o igual que' +
                       ' frac 1 entre  2 mayúscula T igual c sub 2 h sup 4' +
                       ' menos 2 s', 'sbrief');
};


/**
 * Testing Subscript Baseline expression in relation-sequence
 * Simplified test case for expressions similar to 62.
 */
sre.MmlcloudFrenchTest.prototype.testSubBaseRelseq = function() {
  var mml = '<msub><mi>h</mi><mi>s</mi></msub><mo>&#x2264;</mo>' +
      '<mfrac><mn>1</mn><mrow><mn>2</mn><mi>T</mi></mrow></mfrac>' +
      '<mo>&#x2264;</mo><msub><mi>h</mi><mi>s</mi></msub>';
  this.executeRuleTest(mml, 'h subíndice s línea base menor o igual que' +
                       ' empezar fracción 1 entre 2 mayúscula T finalizar' +
                       ' fracción menor o igual que h subíndice s', 'default');
  this.executeRuleTest(mml, 'h sub s menor o igual que empezar frac 1 entre' +
                       ' 2 mayúscula T finalizar frac menor o igual que h' +
                       ' sub s', 'brief');
  this.executeRuleTest(mml, 'h sub s menor o igual que frac 1 entre  2' +
                       ' mayúscula T menor o igual que h sub s', 'sbrief');
};


/**
 * Testing Subscript Baseline expression in multi-relation
 * Simplified test case for expressions similar to 62.
 */
sre.MmlcloudFrenchTest.prototype.testSubBaseMultirel = function() {
  var mml = '<msub><mi>h</mi><mi>s</mi></msub><mo>&#x2264;</mo>' +
      '<mfrac><mn>1</mn><mrow><mn>2</mn><mi>T</mi></mrow></mfrac>' +
      '<mo>=</mo><msub><mi>h</mi><mi>s</mi></msub>';
  this.executeRuleTest(mml, 'h subíndice s línea base menor o igual que' +
                       ' empezar fracción 1 entre 2 mayúscula T finalizar' +
                       ' fracción igual h subíndice s', 'default');
  this.executeRuleTest(mml, 'h sub s menor o igual que empezar frac 1 entre' +
                       ' 2 mayúscula T finalizar frac igual h sub s', 'brief');
  this.executeRuleTest(mml, 'h sub s menor o igual que frac 1 entre  2' +
                       ' mayúscula T igual h sub s', 'sbrief');
};


/**
 * Testing SubSuperscript Baseline expression in relation-sequence
 * Simplified test case for expressions similar to 62.
 */
sre.MmlcloudFrenchTest.prototype.testSubSuperBaseRelseq = function() {
  var mml = '<msubsup><mi>h</mi><mi>s</mi><mi>t</mi></msubsup>' +
      '<mo>&#x2264;</mo><mfrac><mn>1</mn><mrow><mn>2</mn><mi>T</mi>' +
      '</mrow></mfrac><mo>&#x2264;</mo><msubsup><mi>h</mi><mi>s</mi>' +
      '<mi>t</mi></msubsup>';
  this.executeRuleTest(mml, 'h subíndice s superíndice t línea base menor o' +
                       ' igual que empezar fracción 1 entre 2 mayúscula T' +
                       ' finalizar fracción menor o igual que h subíndice s' +
                       ' superíndice t', 'default');
  this.executeRuleTest(mml, 'h sub s sup t menor o igual que empezar frac 1' +
                       ' entre 2 mayúscula T finalizar frac menor o igual' +
                       ' que h sub s sup t', 'brief');
  this.executeRuleTest(mml, 'h sub s sup t menor o igual que frac 1 entre ' +
                       ' 2 mayúscula T menor o igual que h sub s sup t',
                       'sbrief');
};


/**
 * Testing SubSuperscript Baseline expression in multi-relation
 * Simplified test case for expressions similar to 62.
 */
sre.MmlcloudFrenchTest.prototype.testSubSuperBaseMultirel = function() {
  var mml = '<msubsup><mi>h</mi><mi>s</mi><mi>t</mi></msubsup>' +
      '<mo>&#x2264;</mo><mfrac><mn>1</mn><mrow><mn>2</mn><mi>T</mi>' +
      '</mrow></mfrac><mo>=</mo><msubsup><mi>h</mi><mi>s</mi>' +
      '<mi>t</mi></msubsup>';
  this.executeRuleTest(mml, 'h subíndice s superíndice t línea base menor o' +
                       ' igual que empezar fracción 1 entre 2 mayúscula T' +
                       ' finalizar fracción igual h subíndice s superíndice' +
                       ' t', 'default');
  this.executeRuleTest(mml, 'h sub s sup t menor o igual que empezar frac 1' +
                       ' entre 2 mayúscula T finalizar frac igual h sub s' +
                       ' sup t', 'brief');
  this.executeRuleTest(mml, 'h sub s sup t menor o igual que frac 1 entre ' +
                       ' 2 mayúscula T igual h sub s sup t', 'sbrief');
};


/**
 * Testing Square and Cubes with text children.
 * Test case for expression 18 (adapted to include cubed).
 */
sre.MmlcloudFrenchTest.prototype.testSquareWithText = function() {
  var mml = '<mrow><mfrac><mrow><mtext>area&#x00A0;of&#x00A0;triangle</mtext>' +
      '</mrow><mrow><mtext>area&#x00A0;of&#x00A0;square</mtext></mrow>' +
      '</mfrac><mo>=</mo><mfrac><mrow><msup><mrow>' +
      '<mtext>1&#x00A0;unit</mtext></mrow><mn>2</mn></msup></mrow><mrow>' +
      '<msup><mrow><mtext>16&#x00A0;units</mtext></mrow><mn>3</mn></msup>' +
      '</mrow></mfrac></mrow>';
  this.executeRuleTest(mml, 'empezar fracción area of triangle entre area' +
                       ' of square finalizar fracción igual empezar' +
                       ' fracción 1 unit al cuadrado entre 16 units al cubo' +
                       ' finalizar fracción', 'default');
  this.executeRuleTest(mml, 'empezar frac area of triangle entre area of' +
                       ' square finalizar frac igual empezar frac 1 unit al' +
                       ' cuadrado entre 16 units al cubo finalizar frac',
                       'brief');
  this.executeRuleTest(mml, 'frac area of triangle entre  area of square' +
                       ' igual frac 1 unit al cuadrado entre  16 units al' +
                       ' cubo', 'sbrief');
};


// TODO: (v2.3.0) Remove the personality lookup error.
/**
 * Testing SubSuperscript Baseline expression in multi-relation
 * Simplified test case for expressions similar to 18.
 */
sre.MmlcloudFrenchTest.prototype.untestFootnoteWithText = function() {
  var mml = '<mrow><mtext>area&#x00A0;of&#x00A0;triangle</mtext>' +
      '<mtext>&#x00A0;</mtext>' +
      '<msup><mrow><mtext>area&#x00A0;of&#x00A0;square</mtext>' +
      '</mrow><mn>1</mn></msup><mtext>&#x00A0;</mtext>' +
      '<msup><mrow><mtext>1&#x00A0;unit</mtext></mrow><mn>2</mn></msup>' +
      '<mtext>&#x00A0;</mtext>' +
      '<msup><mrow><mtext>16&#x00A0;units</mtext></mrow><mn>3</mn></msup>' +
      '</mrow>';
  this.executeRuleTest(mml, 'area of triangle area of square superíndice 1' +
                       ' línea base 1 unit superíndice 2 línea base 16' +
                       ' units superíndice 3', 'default');
  this.executeRuleTest(mml, 'area of triangle area of square sup 1 1 unit' +
                       ' sup 2 16 units sup 3', 'brief');
  this.executeRuleTest(mml, 'area of triangle area of square sup 1 1 unit' +
                       ' sup 2 16 units sup 3', 'sbrief');
};


// TODO: (v2.3.0) Fix this error.
/**
 * Testing SubSuperscript Baseline expression in multi-relation
 * Simplified test case for expressions similar to 18.
 */
sre.MmlcloudFrenchTest.prototype.untestFootnoteWithSimpleText = function() {
  var mml = '<msup><mtext>area&#x00A0;of&#x00A0;triangle</mtext>' +
      '<mn>2</mn></msup>';
  this.executeRuleTest(mml, 'area of triangle superíndice 2', 'default');
  this.executeRuleTest(mml, 'area of triangle sup 2', 'brief');
  this.executeRuleTest(mml, 'area of triangle sup 2', 'sbrief');
};


/**
 * Tests multiline tables.
 */
sre.MmlcloudFrenchTest.prototype.testMultiline = function() {
  this.executeRuleTest(
      '<mtable><mtr><mtd><mi>a</mi></mtd></mtr><mtr><mtd><mi>b</mi></mtd>' +
      '</mtr></mtable>',
      'empezar esquema primera fila  a segunda fila  b finalizar esquema',
      'default');
  this.executeRuleTest(
      '<mtable><mtr><mtd><mi>a</mi></mtd><mtd><mi>c</mi></mtd></mtr>' +
      '<mtr><mtd><mi>b</mi></mtd><mtd><mi>d</mi></mtd></mtr></mtable>',
      'empezar esquema primera fila primera columna a segunda columna c' +
      ' segunda fila primera columna b segunda columna d finalizar' +
      ' esquema', 'default');
};


/**
 * Tests relation sequences with empty starts.
 */
sre.MmlcloudFrenchTest.prototype.testRelationsWithEmpty = function() {
  this.executeRuleTest(
      '<mo>&#x2264;</mo><mn>2</mn>',
      'menor o igual que 2');
  this.executeRuleTest(
      '<mo>=</mo><mn>2</mn><mo>=</mo>',
      'igual 2 igual');
  this.executeRuleTest(
      '<mo>&#x2264;</mo><mn>2</mn><mo>=</mo>',
      'menor o igual que 2 igual');
  this.executeRuleTest(
      '<mtable><mtr><mtd><mn>1</mn></mtd><mtd><mi></mi><mo>&#x2264;</mo><mn>2' +
      '</mn></mtd></mtr></mtable>',
      'empezar esquema primera fila primera columna 1 segunda columna menor' +
      ' o igual que 2 finalizar esquema');
};


/**
 * Tests for rows with labels.
 */
sre.MmlcloudFrenchTest.prototype.testLabelledRow = function() {
  var mml = '<mtable><mlabeledtr><mtd><mi>(1)</mi></mtd>' +
      '<mtd><mi>a</mi></mtd><mtd><mi>b</mi></mtd></mlabeledtr></mtable>';
  this.executeRuleTest(mml, 'empezar esquema primera fila  con etiqueta' +
                       ' paréntesis izquierdo 1 paréntesis derecho' +
                       ' finalizar etiqueta primera columna a segunda' +
                       ' columna b finalizar esquema', 'default');
  this.executeRuleTest(mml, 'empezar esquema primera fila  etiqueta' +
                       ' paréntesis izquierdo 1 paréntesis derecho primera' +
                       ' columna a segunda columna b finalizar esquema',
                       'brief');
  this.executeRuleTest(mml, 'esquema primera fila  etiqueta paréntesis' +
                       ' izquierdo 1 paréntesis derecho primera columna a' +
                       ' segunda columna b finalizar esquema', 'sbrief');
};


/**
 * Tests for lines with labels.
 */
sre.MmlcloudFrenchTest.prototype.testLabelledLine = function() {
  var mml = '<mtable><mlabeledtr><mtd><mi>(1)</mi></mtd>' +
      '<mtd><mi>a</mi></mtd></mlabeledtr></mtable>';
  this.executeRuleTest(mml, 'empezar esquema primera fila  con etiqueta' +
                       ' paréntesis izquierdo 1 paréntesis derecho' +
                       ' finalizar etiqueta a finalizar esquema', 'default');
  this.executeRuleTest(mml, 'empezar esquema primera fila  etiqueta' +
                       ' paréntesis izquierdo 1 paréntesis derecho a' +
                       ' finalizar esquema',
                       'brief');
  this.executeRuleTest(mml, 'esquema primera fila  etiqueta paréntesis' +
                       ' izquierdo 1 paréntesis derecho a finalizar' +
                       ' esquema', 'sbrief');
};


/**
 * Tests for empty lines with labels.
 */
sre.MmlcloudFrenchTest.prototype.testLabelledEmptyLine = function() {
  var mml = '<mtable><mlabeledtr><mtd><mi>(1)</mi></mtd>' +
      '<mtd></mtd></mlabeledtr></mtable>';
  this.executeRuleTest(mml, 'empezar esquema primera fila  con etiqueta' +
                       ' paréntesis izquierdo 1 paréntesis derecho' +
                       ' finalizar etiqueta espacio finalizar esquema',
                       'default');
  this.executeRuleTest(mml, 'empezar esquema primera fila  etiqueta' +
                       ' paréntesis izquierdo 1 paréntesis derecho espacio' +
                       ' finalizar esquema', 'brief');
  this.executeRuleTest(mml, 'esquema primera fila  etiqueta paréntesis' +
                       ' izquierdo 1 paréntesis derecho espacio finalizar' +
                       ' esquema', 'sbrief');
};


/**
 * Tests for empty lines.
 */
sre.MmlcloudFrenchTest.prototype.testEmptyLine = function() {
  var mml = '<mtable><mtr><mtd></mtd></mtr></mtable>';
  this.executeRuleTest(mml, 'empezar esquema primera fila  espacio' +
                       ' finalizar esquema', 'default');
  this.executeRuleTest(mml, 'empezar esquema primera fila  espacio' +
                       ' finalizar esquema', 'brief');
  this.executeRuleTest(mml, 'esquema primera fila  espacio finalizar' +
                       ' esquema', 'sbrief');
};


/**
 * Tests for empty lines with labels.
 */
sre.MmlcloudFrenchTest.prototype.testTextLabelledLine = function() {
  var mml = '<mtable><mlabeledtr><mtd><mtext>(1)</mtext></mtd>' +
      '<mtd><mi>a</mi></mtd></mlabeledtr></mtable>';
  this.executeRuleTest(mml, 'empezar esquema primera fila  con etiqueta' +
                       ' paréntesis izquierdo 1 paréntesis derecho' +
                       ' finalizar etiqueta a finalizar esquema', 'default');
  this.executeRuleTest(mml, 'empezar esquema primera fila  etiqueta' +
                       ' paréntesis izquierdo 1 paréntesis derecho a' +
                       ' finalizar esquema', 'brief');
  this.executeRuleTest(mml, 'esquema primera fila  etiqueta 1 a finalizar' +
                       ' esquema', 'sbrief');
};


/**
 * Test for general enclose.
 */
sre.MmlcloudFrenchTest.prototype.untestEncloseGeneral = function() {
  this.executeRuleTest('<menclose notation="circle"><mi>a</mi></menclose>',
                       'StartEnclose circle a EndEnclose', 'default');
};


/**
 * Test for general enclose overbar
 */
sre.MmlcloudFrenchTest.prototype.testEncloseOverbar = function() {
  this.executeRuleTest('<menclose notation="top"><mi>a</mi></menclose>',
                       'a barra', 'default');
  this.executeRuleTest('<menclose notation="top"><mi>a</mi></menclose>',
                       'a barra', 'brief');
  this.executeRuleTest('<menclose notation="top"><mi>a</mi></menclose>',
                       'a barra', 'sbrief');
};


/**
 * Test for general enclose underbar
 */
sre.MmlcloudFrenchTest.prototype.testEncloseUnderbar = function() {
  this.executeRuleTest('<menclose notation="bottom"><mi>a</mi></menclose>',
                       'a subbarra', 'default');
  this.executeRuleTest('<menclose notation="bottom"><mi>a</mi></menclose>',
                       'a subbarra', 'brief');
  this.executeRuleTest('<menclose notation="bottom"><mi>a</mi></menclose>',
                       'a subbarra', 'sbrief');
};


/**
 * Test for general enclose leftbar
 */
sre.MmlcloudFrenchTest.prototype.testEncloseLeftbar = function() {
  this.executeRuleTest('<menclose notation="left"><mi>a</mi></menclose>',
                       'barra vertical a', 'default');
};


/**
 * Test for general enclose rightbar
 */
sre.MmlcloudFrenchTest.prototype.testEncloseRightbar = function() {
  this.executeRuleTest('<menclose notation="right"><mi>a</mi></menclose>',
                       'a barra vertical', 'default');
};

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
  this.executeRuleTest(mml, '', 'default');
  mml = '<mo>&gt;</mo>';
  this.executeRuleTest(mml, '', 'default');
  mml = '<mi>n&nbsp;</mi>';
  this.executeRuleTest(mml, '', 'default');
  mml = '<mi>&nbsp;m</mi>';
  this.executeRuleTest(mml, '', 'default');
  mml = '<mi>n&nbsp;m</mi>';
  this.executeRuleTest(mml, '', 'default');
  mml = '<mi>&nbsp;&nbsp;n&nbsp;&nbsp;m&nbsp;&nbsp;</mi>';
  this.executeRuleTest(mml, '', 'default');
};


/**
 * Testing binomial coefficients made from fractions.
 */
sre.MmlcloudFrenchTest.prototype.testBinomialFromFrac = function() {
  var mml = '<mfenced><mfrac linethickness="0pt"><mi>n</mi>' +
      '<mi>k</mi></mfrac></mfenced>';
  this.executeRuleTest(mml, '',
                       'default');
  mml = '<mfenced><mfrac linethickness="0.0em"><mi>n</mi>' +
        '<mi>k</mi></mfrac></mfenced>';
  this.executeRuleTest(mml, '',
                       'default');
  mml = '<mfenced><mfrac linethickness="negativeverythinmathspace"><mi>n</mi>' +
        '<mi>k</mi></mfrac></mfenced>';
  this.executeRuleTest(mml, '',
                       'default');
  mml = '<mfenced><mfrac linethickness="verythinmathspace"><mi>n</mi>' +
        '<mi>k</mi></mfrac></mfenced>';
  this.executeRuleTest(mml, '', 'default');
  mml = '<mfenced><mfrac linethickness="1pt"><mi>n</mi>' +
        '<mi>k</mi></mfrac></mfenced>';
  this.executeRuleTest(mml, '', 'default');
  mml = '<mfenced><mfrac linethickness="0.5pt"><mi>n</mi>' +
        '<mi>k</mi></mfrac></mfenced>';
  this.executeRuleTest(mml, '', 'default');
};


/**
 * Test unnecessary spaces.
 */
sre.MmlcloudFrenchTest.prototype.testUnnecessarySpaces = function() {
  var mml = '<mn> 5 </mn>';
  this.executeRuleTest(mml, '', 'default');
  mml = '<mn> &nbsp; 5 &nbsp; </mn>';
  this.executeRuleTest(mml, '', 'default');
};


/**
 * Absolute values versus other netural fences.
 */
sre.MmlcloudFrenchTest.prototype.testAbsValueVsNeutral = function() {
  var mml = '<mo>|</mo><mi>a</mi><mo>|</mo>';
  this.executeRuleTest(mml, '',
                       'default');
  this.executeRuleTest(mml, '',
                       'brief');
  this.executeRuleTest(mml, '',
                       'sbrief');
  mml = '<mo>｜</mo><mi>a</mi><mo>｜</mo>';
  this.executeRuleTest(mml, '',
                       'default');
  this.executeRuleTest(mml, '',
                       'sbrief');
  mml = '<mo>｜</mo><mi>a</mi><mo>‖</mo>';
  this.executeRuleTest(mml, '', 'default');
  mml = '<mo>‖</mo><mi>a</mi><mo>‖</mo>';
  this.executeRuleTest(mml, '',
                       'default');
  mml = '<mo>¦</mo><mi>a</mi><mo>¦</mo>';
  this.executeRuleTest(mml, '',
                       'default');
};


/**
 * Negative vulgar fraction.
 */
sre.MmlcloudFrenchTest.prototype.testNegativeVulgarFraction = function() {
  var mml = '<mo>-</mo><mfrac><mn>5</mn><mn>18</mn></mfrac>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '',
                       'brief');
  this.executeRuleTest(mml, '', 'sbrief');
  mml = '<mfrac><mn>1</mn><mn>2</mn></mfrac><mo>-</mo>' +
      '<mfrac><mn>5</mn><mn>18</mn></mfrac>';
  this.executeRuleTest(mml, '', 'default');
  mml = '<mo>-</mo><mfrac><mn>5.2</mn><mi>a</mi></mfrac>';
  this.executeRuleTest(mml, '', 'default');
  mml = '<mo>-</mo><mfrac><mn>5.2</mn><mn>18</mn></mfrac>';
  this.executeRuleTest(mml, '', 'default');
};


/**
 * Testing trivial things.
 */
sre.MmlcloudFrenchTest.prototype.testTrivialStuff = function() {
  var mml = '<mtext>a</mtext><mo>=</mo><mi>b</mi>';
  this.executeRuleTest(mml, '', 'default');
  mml = '<mo>"</mo>';
  this.executeRuleTest(mml, '', 'default');
  mml = '<mo>"</mo><mi>x</mi><mo>"</mo>';
  this.executeRuleTest(mml, '', 'default');
  mml = '<mo>\'</mo>';
  this.executeRuleTest(mml, '', 'default');
};


/**
 * Testing German fonts.
 */
sre.MmlcloudFrenchTest.prototype.testGermanFonts = function() {
  var mml = '<mi mathvariant="fraktur">A</mi>';
  this.executeRuleTest(mml, '', 'default');
  mml = '<mi mathvariant="bold-fraktur">A</mi>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest('', 'Fraktur mayúscula A', 'default');
  this.executeRuleTest('', 'negrita Fraktur mayúscula A',
                       'default');
  mml = '<mtext mathvariant="bold-fraktur">abc</mtext>';
  this.executeRuleTest(mml, '', 'default');
  mml = '<mtext mathvariant="bold-fraktur">ABC</mtext>';
  this.executeRuleTest(mml, '', 'default');
  mml = '<mi mathvariant="bold-fraktur">ABC</mi>';
  this.executeRuleTest(mml, '', 'default');
};


/**
 * Testing other fonts.
 */
sre.MmlcloudFrenchTest.prototype.testOtherFonts = function() {
  this.executeRuleTest('', 'm', 'default');
  this.executeRuleTest('', 'normal m',
                       'default');
  this.executeRuleTest('', 'm i', 'default');
  this.executeRuleTest('', 'cursiva m i',
                       'default');
  this.executeRuleTest('', '30', 'default');
  this.executeRuleTest('', 'cursiva 3', 'default');
  this.executeRuleTest('', '30 grado', 'default');
  this.executeRuleTest('', '3 0 m mayúscula A', 'default');
};


/**
 * Testing non-alpha identifier.
 */
sre.MmlcloudFrenchTest.prototype.testNonalphaIdentifier = function() {
  var mml = '<mi>30°</mi>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
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
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
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
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Parenthesis with convoluted operator.
 * Simplified test case for expression 98.
 */
sre.MmlcloudFrenchTest.prototype.testParenConvoluted = function() {
  var mml = '<mo>(</mo><mo>-</mo><msup><mi>x</mi><mn>2</mn></msup>' +
          '<mo>/2)</mo>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
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
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
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
  this.executeRuleTest(mml, '',
                       'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Subscript Baseline expression in relation-sequence
 * Simplified test case for expressions similar to 62.
 */
sre.MmlcloudFrenchTest.prototype.testSubBaseRelseq = function() {
  var mml = '<msub><mi>h</mi><mi>s</mi></msub><mo>&#x2264;</mo>' +
      '<mfrac><mn>1</mn><mrow><mn>2</mn><mi>T</mi></mrow></mfrac>' +
      '<mo>&#x2264;</mo><msub><mi>h</mi><mi>s</mi></msub>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Testing Subscript Baseline expression in multi-relation
 * Simplified test case for expressions similar to 62.
 */
sre.MmlcloudFrenchTest.prototype.testSubBaseMultirel = function() {
  var mml = '<msub><mi>h</mi><mi>s</mi></msub><mo>&#x2264;</mo>' +
      '<mfrac><mn>1</mn><mrow><mn>2</mn><mi>T</mi></mrow></mfrac>' +
      '<mo>=</mo><msub><mi>h</mi><mi>s</mi></msub>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
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
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '',
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
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
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
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '',
                       'brief');
  this.executeRuleTest(mml, '', 'sbrief');
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
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


// TODO: (v2.3.0) Fix this error.
/**
 * Testing SubSuperscript Baseline expression in multi-relation
 * Simplified test case for expressions similar to 18.
 */
sre.MmlcloudFrenchTest.prototype.untestFootnoteWithSimpleText = function() {
  var mml = '<msup><mtext>area&#x00A0;of&#x00A0;triangle</mtext>' +
      '<mn>2</mn></msup>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Tests multiline tables.
 */
sre.MmlcloudFrenchTest.prototype.testMultiline = function() {
  this.executeRuleTest(
      '',
      'empezar esquema primera fila  a segunda fila  b finalizar esquema',
      'default');
  this.executeRuleTest(
      '',
      'empezar esquema primera fila primera columna a segunda columna c' +
      ' segunda fila primera columna b segunda columna d finalizar' +
      ' esquema', 'default');
};


/**
 * Tests relation sequences with empty starts.
 */
sre.MmlcloudFrenchTest.prototype.testRelationsWithEmpty = function() {
  this.executeRuleTest(
      '',
      'menor o igual que 2');
  this.executeRuleTest(
      '',
      'igual 2 igual');
  this.executeRuleTest(
      '',
      'menor o igual que 2 igual');
  this.executeRuleTest(
      '',
      'empezar esquema primera fila primera columna 1 segunda columna menor' +
      ' o igual que 2 finalizar esquema');
};


/**
 * Tests for rows with labels.
 */
sre.MmlcloudFrenchTest.prototype.testLabelledRow = function() {
  var mml = '<mtable><mlabeledtr><mtd><mi>(1)</mi></mtd>' +
      '<mtd><mi>a</mi></mtd><mtd><mi>b</mi></mtd></mlabeledtr></mtable>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '',
                       'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Tests for lines with labels.
 */
sre.MmlcloudFrenchTest.prototype.testLabelledLine = function() {
  var mml = '<mtable><mlabeledtr><mtd><mi>(1)</mi></mtd>' +
      '<mtd><mi>a</mi></mtd></mlabeledtr></mtable>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '',
                       'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Tests for empty lines with labels.
 */
sre.MmlcloudFrenchTest.prototype.testLabelledEmptyLine = function() {
  var mml = '<mtable><mlabeledtr><mtd><mi>(1)</mi></mtd>' +
      '<mtd></mtd></mlabeledtr></mtable>';
  this.executeRuleTest(mml, '',
                       'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Tests for empty lines.
 */
sre.MmlcloudFrenchTest.prototype.testEmptyLine = function() {
  var mml = '<mtable><mtr><mtd></mtd></mtr></mtable>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Tests for empty lines with labels.
 */
sre.MmlcloudFrenchTest.prototype.testTextLabelledLine = function() {
  var mml = '<mtable><mlabeledtr><mtd><mtext>(1)</mtext></mtd>' +
      '<mtd><mi>a</mi></mtd></mlabeledtr></mtable>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Test for general enclose.
 */
sre.MmlcloudFrenchTest.prototype.untestEncloseGeneral = function() {
  this.executeRuleTest('<menclose notation="circle"><mi>a</mi></menclose>',
                       '', 'default');
};


/**
 * Test for general enclose overbar
 */
sre.MmlcloudFrenchTest.prototype.testEncloseOverbar = function() {
  this.executeRuleTest('<menclose notation="top"><mi>a</mi></menclose>',
                       '', 'default');
  this.executeRuleTest('<menclose notation="top"><mi>a</mi></menclose>',
                       '', 'brief');
  this.executeRuleTest('<menclose notation="top"><mi>a</mi></menclose>',
                       '', 'sbrief');
};


/**
 * Test for general enclose underbar
 */
sre.MmlcloudFrenchTest.prototype.testEncloseUnderbar = function() {
  this.executeRuleTest('<menclose notation="bottom"><mi>a</mi></menclose>',
                       '', 'default');
  this.executeRuleTest('<menclose notation="bottom"><mi>a</mi></menclose>',
                       '', 'brief');
  this.executeRuleTest('<menclose notation="bottom"><mi>a</mi></menclose>',
                       '', 'sbrief');
};


/**
 * Test for general enclose leftbar
 */
sre.MmlcloudFrenchTest.prototype.testEncloseLeftbar = function() {
  this.executeRuleTest('<menclose notation="left"><mi>a</mi></menclose>',
                       '', 'default');
};


/**
 * Test for general enclose rightbar
 */
sre.MmlcloudFrenchTest.prototype.testEncloseRightbar = function() {
  this.executeRuleTest('<menclose notation="right"><mi>a</mi></menclose>',
                       '', 'default');
};


/**
 * Test for Unicode Latin mathfonts on the upper plane.
 */
sre.MmlcloudFrenchTest.prototype.testLatinMathfonts = function() {
  this.executeRuleTest('<mi>&#x1D504;</mi>', '', 'default');
  this.executeRuleTest('<mi>&#x1D56C;</mi>', '', 'default');
  this.executeRuleTest('<mi>&#x1D4D0;</mi>', '', 'default');
  this.executeRuleTest('<mi>&#x1D400;</mi>', '', 'default');
  this.executeRuleTest('<mi>&#x1D468;</mi>', '', 'default');
  this.executeRuleTest('<mi>&#x1D538;</mi>', '', 'default');
  this.executeRuleTest('<mi>&#x1D434;</mi>', '', 'default');
  this.executeRuleTest('<mi>&#x1D670;</mi>', '', 'default');
  this.executeRuleTest('<mi>&#x1D5D4;</mi>', '', 'default');
  this.executeRuleTest('<mi>&#x1D608;</mi>', '', 'default');
  this.executeRuleTest('<mi>&#x1D63C;</mi>', '', 'default');
  this.executeRuleTest('<mi>&#x1D5A0;</mi>', '', 'default');
  this.executeRuleTest('<mi>&#x1D49C;</mi>', '', 'default');
};


/**
 * Test for Unicode Greek mathfonts on the majuscule plane.
 */
sre.MmlcloudFrenchTest.prototype.testGreekMathfonts = function() {
  this.executeRuleTest('<mi>&#x1D6A8;</mi>', '', 'default');
  this.executeRuleTest('<mi>&#x1D6E2;</mi>', '', 'default');
  this.executeRuleTest('<mi>&#x1D71C;</mi>', '', 'default');
  this.executeRuleTest('<mi>&#x1D756;</mi>', '', 'default');
  this.executeRuleTest('<mi>&#x1D790;</mi>', '', 'default');
};

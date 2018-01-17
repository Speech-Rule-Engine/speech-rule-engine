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
 * @fileoverview Testcases resulting from Mathml Cloud and Mathjax project,
 *     often inspired by bugs.
 *
 * @author Volker.Sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.MmlcloudEnglishTest');

goog.require('sre.AbstractRuleTest');



/**
 * @constructor
 * @extends {sre.AbstractRuleTest}
 */
sre.MmlcloudEnglishTest = function() {
  sre.MmlcloudEnglishTest.base(this, 'constructor');

  /**
   * @override
   */
  this.information = 'Mathml Cloud English tests.';

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

  this.setActive('MathmlCloudEnglish');
};
goog.inherits(sre.MmlcloudEnglishTest, sre.AbstractRuleTest);


/**
 * Testing for correct treatment of special HTML entities: non-breaking spaces,
 * left and right angle bracket.
 */
sre.MmlcloudEnglishTest.prototype.testHtmlEntities = function() {
  var mml = '<mo>&lt;</mo>';
  this.executeRuleTest(mml, 'less-than', 'default');
  mml = '<mo>&gt;</mo>';
  this.executeRuleTest(mml, 'greater-than', 'default');
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
sre.MmlcloudEnglishTest.prototype.testBinomialFromFrac = function() {
  var mml = '<mfenced><mfrac linethickness="0pt"><mi>n</mi>' +
      '<mi>k</mi></mfrac></mfenced>';
  this.executeRuleTest(mml, 'StartBinomialOrMatrix n Choose k' +
                       ' EndBinomialOrMatrix', 'default');
  mml = '<mfenced><mfrac linethickness="0.0em"><mi>n</mi>' +
        '<mi>k</mi></mfrac></mfenced>';
  this.executeRuleTest(mml, 'StartBinomialOrMatrix n Choose k' +
                       ' EndBinomialOrMatrix', 'default');
  mml = '<mfenced><mfrac linethickness="negativeverythinmathspace"><mi>n</mi>' +
        '<mi>k</mi></mfrac></mfenced>';
  this.executeRuleTest(mml, 'StartBinomialOrMatrix n Choose k' +
                       ' EndBinomialOrMatrix', 'default');
  mml = '<mfenced><mfrac linethickness="verythinmathspace"><mi>n</mi>' +
        '<mi>k</mi></mfrac></mfenced>';
  this.executeRuleTest(mml, 'left-parenthesis StartFraction n Over k ' +
                       'EndFraction right-parenthesis', 'default');
  mml = '<mfenced><mfrac linethickness="1pt"><mi>n</mi>' +
        '<mi>k</mi></mfrac></mfenced>';
  this.executeRuleTest(mml, 'left-parenthesis StartFraction n Over k ' +
                       'EndFraction right-parenthesis', 'default');
  mml = '<mfenced><mfrac linethickness="0.5pt"><mi>n</mi>' +
        '<mi>k</mi></mfrac></mfenced>';
  this.executeRuleTest(mml, 'left-parenthesis StartFraction n Over k ' +
                       'EndFraction right-parenthesis', 'default');
};


/**
 * Test unnecessary spaces.
 */
sre.MmlcloudEnglishTest.prototype.testUnnecessarySpaces = function() {
  var mml = '<mn> 5 </mn>';
  this.executeRuleTest(mml, '5', 'default');
  mml = '<mn> &nbsp; 5 &nbsp; </mn>';
  this.executeRuleTest(mml, '5', 'default');
};


/**
 * Absolute values versus other netural fences.
 */
sre.MmlcloudEnglishTest.prototype.testAbsValueVsNeutral = function() {
  var mml = '<mo>|</mo><mi>a</mi><mo>|</mo>';
  this.executeRuleTest(mml, 'StartAbsoluteValue a EndAbsoluteValue', 'default');
  this.executeRuleTest(mml, 'StartAbsoluteValue a EndAbsoluteValue', 'brief');
  this.executeRuleTest(mml, 'AbsoluteValue a EndAbsoluteValue', 'sbrief');
  mml = '<mo>｜</mo><mi>a</mi><mo>｜</mo>';
  this.executeRuleTest(mml, 'StartAbsoluteValue a EndAbsoluteValue', 'default');
  this.executeRuleTest(mml, 'AbsoluteValue a EndAbsoluteValue', 'sbrief');
  mml = '<mo>｜</mo><mi>a</mi><mo>‖</mo>';
  this.executeRuleTest(mml, 'vertical-bar a double-vertical-bar', 'default');
  mml = '<mo>‖</mo><mi>a</mi><mo>‖</mo>';
  this.executeRuleTest(mml, 'double-vertical-bar a double-vertical-bar',
                       'default');
  mml = '<mo>¦</mo><mi>a</mi><mo>¦</mo>';
  this.executeRuleTest(mml, 'broken-vertical-bar a broken-vertical-bar',
                       'default');
};


/**
 * Negative vulgar fraction.
 */
sre.MmlcloudEnglishTest.prototype.testNegativeVulgarFraction = function() {
  var mml = '<mo>-</mo><mfrac><mn>5</mn><mn>18</mn></mfrac>';
  this.executeRuleTest(mml, 'negative five-eighteenths', 'default');
  this.executeRuleTest(mml, 'negative five-eighteenths', 'brief');
  this.executeRuleTest(mml, 'negative five-eighteenths', 'sbrief');
  mml = '<mfrac><mn>1</mn><mn>2</mn></mfrac><mo>-</mo>' +
      '<mfrac><mn>5</mn><mn>18</mn></mfrac>';
  this.executeRuleTest(mml, 'one-half minus five-eighteenths', 'default');
  mml = '<mo>-</mo><mfrac><mn>5.2</mn><mi>a</mi></mfrac>';
  this.executeRuleTest(mml, 'minus StartFraction 5.2 Over a EndFraction',
                       'default');
  mml = '<mo>-</mo><mfrac><mn>5.2</mn><mn>18</mn></mfrac>';
  this.executeRuleTest(mml, 'minus StartFraction 5.2 Over 18 EndFraction',
                       'default');
};


/**
 * Testing trivial things.
 */
sre.MmlcloudEnglishTest.prototype.testTrivialStuff = function() {
  var mml = '<mtext>a</mtext><mo>=</mo><mi>b</mi>';
  this.executeRuleTest(mml, 'a equals b', 'default');
  mml = '<mo>"</mo>';
  this.executeRuleTest(mml, 'quotation-mark', 'default');
  mml = '<mo>"</mo><mi>x</mi><mo>"</mo>';
  this.executeRuleTest(mml, 'quotation-mark x quotation-mark', 'default');
  mml = '<mo>\'</mo>';
  this.executeRuleTest(mml, 'prime', 'default');
};


/**
 * Testing German fonts.
 */
sre.MmlcloudEnglishTest.prototype.testGermanFonts = function() {
  var mml = '<mi mathvariant="fraktur">A</mi>';
  this.executeRuleTest(mml, 'German upper A', 'default');
  mml = '<mi mathvariant="bold-fraktur">A</mi>';
  this.executeRuleTest(mml, 'bold German upper A', 'default');
  this.executeRuleTest('<mi>&#x1D504;</mi>', 'German upper A', 'default');
  this.executeRuleTest('<mi>&#x1D56C;</mi>', 'bold German upper A', 'default');
  mml = '<mtext mathvariant="bold-fraktur">abc</mtext>';
  this.executeRuleTest(mml, 'bold German abc', 'default');
  mml = '<mtext mathvariant="bold-fraktur">ABC</mtext>';
  this.executeRuleTest(mml, 'bold German ABC', 'default');
  mml = '<mi mathvariant="bold-fraktur">ABC</mi>';
  this.executeRuleTest(mml, 'bold German upper A upper B upper C', 'default');
};


/**
 * Testing other fonts.
 */
sre.MmlcloudEnglishTest.prototype.testOtherFonts = function() {
  this.executeRuleTest('<mi>m</mi>', 'm');
  this.executeRuleTest('<mi mathvariant="normal">m</mi>', 'normal m');
  this.executeRuleTest('<mi>mi</mi>', 'm i');
  this.executeRuleTest('<mi mathvariant="italic">mi</mi>', 'italic m i');
  this.executeRuleTest('<mi>30</mi>', '30');
  this.executeRuleTest('<mi>3</mi>', 'italic 3');
  this.executeRuleTest('<mi>30°</mi>', '30 degree');
  this.executeRuleTest('<mi>30mA</mi>', '3 0 m upper A');
};


/**
 * Testing non-alpha identifier.
 */
sre.MmlcloudEnglishTest.prototype.testNonalphaIdentifier = function() {
  var mml = '<mi>30°</mi>';
  this.executeRuleTest(mml, '30 degree', 'default');
  this.executeRuleTest(mml, '30 degree', 'brief');
  this.executeRuleTest(mml, '30 degree', 'sbrief');
};


/**
 * Testing Chemistry Upper.
 */
sre.MmlcloudEnglishTest.prototype.testMixedIdentifier = function() {
  var mml = '<mrow><mi mathvariant="normal">Si</mi><msub>' +
      '<mi mathvariant="normal">O</mi><mn>2</mn></msub><mo>+</mo><mn>6</mn>' +
      '<mi mathvariant="normal">H</mi><mi mathvariant="normal">F</mi>' +
      '<mo>&#x2192;</mo><msub><mi mathvariant="normal">H</mi><mn>2</mn>' +
      '</msub><mi mathvariant="normal">Si</mi><msub>' +
      '<mi mathvariant="normal">F</mi><mn>6</mn></msub><mo>+</mo><mn>2</mn>' +
      '<msub><mi mathvariant="normal">H</mi><mn>2</mn></msub>' +
      '<mi mathvariant="normal">O</mi></mrow>';
  this.executeRuleTest(mml, 'upper S i normal upper O 2 plus 6 normal upper' +
                       ' H normal upper F right-arrow normal upper H 2 upper' +
                       ' S i normal upper F 6 plus 2 normal upper H 2 normal' +
                       ' upper O', 'default');
  this.executeRuleTest(mml, 'upper S i normal upper O 2 plus 6 normal upper' +
                       ' H normal upper F right-arrow normal upper H 2 upper' +
                       ' S i normal upper F 6 plus 2 normal upper H 2 normal' +
                       ' upper O', 'brief');
  this.executeRuleTest(mml, 'upper S i normal upper O 2 plus 6 normal upper' +
                       ' H normal upper F R arrow normal upper H 2 upper' +
                       ' S i normal upper F 6 plus 2 normal upper H 2 normal' +
                       ' upper O', 'sbrief');
};


// TODO (sorge) Test currently fails as the parenthesis is seen to be
//     embellished! Should work again once embellished parenthesis are fully
//     rewritten.
/**
 * Testing Parenthesis with Superscript.
 * Simplified test case for expression 95.
 */
sre.MmlcloudEnglishTest.prototype.testParenSuper = function() {
  var mml = '<mo>(</mo><mi>a</mi><msup><mo>)</mo><mn>2</mn></msup>';
  this.executeRuleTest(mml, 'left-parenthesis a right-parenthesis squared',
                       'default');
  this.executeRuleTest(mml, 'left-p\'ren a right-p\'ren squared', 'brief');
  this.executeRuleTest(mml, 'L p\'ren a R p\'ren squared', 'sbrief');
};


/**
 * Testing Parenthesis with convoluted operator.
 * Simplified test case for expression 98.
 */
sre.MmlcloudEnglishTest.prototype.testParenConvoluted = function() {
  var mml = '<mo>(</mo><mo>-</mo><msup><mi>x</mi><mn>2</mn></msup>' +
          '<mo>/2)</mo>';
  this.executeRuleTest(mml, 'left-parenthesis minus x squared slash' +
                       ' 2 right-parenthesis', 'default');
  this.executeRuleTest(mml, 'left-p\'ren minus x squared slash 2 right-p\'ren',
                       'brief');
  this.executeRuleTest(mml, 'L p\'ren minus x squared slash 2 R p\'ren',
                       'sbrief');
};


/**
 * Testing Superscript Baseline expression in relation-sequence
 * Simplified test case for expression 62.
 */
sre.MmlcloudEnglishTest.prototype.testSupBaseRelseq = function() {
  var mml = '<mrow><msub><mrow><mi>c</mi></mrow><mrow><mn>1</mn></mrow>' +
      '</msub><msup><mrow><mi>h</mi></mrow><mrow><mn>4</mn><mo>-</mo>' +
      '<mn>2</mn><mi>s</mi></mrow></msup><mo>&#x2264;</mo><mfrac>' +
      '<mrow><mn>1</mn></mrow><mrow><mn>2</mn><mi>T</mi></mrow></mfrac>' +
      '<mo>&#x2264;</mo><msub><mrow><mi>c</mi></mrow><mrow><mn>2</mn>' +
      '</mrow></msub><msup><mrow><mi>h</mi></mrow><mrow><mn>4</mn>' +
      '<mo>-</mo><mn>2</mn><mi>s</mi></mrow></msup></mrow>';
  this.executeRuleTest(mml, 'c 1 h Superscript 4 minus 2 s Baseline' +
                       ' less-than-or-equal-to StartFraction 1 Over 2' +
                       ' upper T EndFraction less-than-or-equal-to c 2 h' +
                       ' Superscript 4 minus 2 s', 'default');
  this.executeRuleTest(mml, 'c 1 h Sup 4 minus 2 s Base' +
                       ' less-than-or-equal-to StartFrac 1 Over 2 upper T' +
                       ' EndFrac less-than-or-equal-to c 2 h Sup 4 minus 2 s',
                       'brief');
  this.executeRuleTest(mml, 'c 1 h Sup 4 minus 2 s Base less-than-or-equal-to' +
                       ' Frac 1 Over 2 upper T EndFrac less-than-or-equal-to' +
                       ' c 2 h Sup 4 minus 2 s', 'sbrief');
};


/**
 * Testing Superscript Baseline expression in multi-relation.
 * Simplified test case similar to expression 62.
 */
sre.MmlcloudEnglishTest.prototype.testSupBaseMultirel = function() {
  var mml = '<mrow><msub><mrow><mi>c</mi></mrow><mrow><mn>1</mn></mrow>' +
      '</msub><msup><mrow><mi>h</mi></mrow><mrow><mn>4</mn><mo>-</mo>' +
      '<mn>2</mn><mi>s</mi></mrow></msup><mo>&#x2264;</mo><mfrac><mrow>' +
      '<mn>1</mn></mrow><mrow><mn>2</mn><mi>T</mi></mrow></mfrac><mo>=</mo>' +
      '<msub><mrow><mi>c</mi></mrow><mrow><mn>2</mn></mrow></msub><msup>' +
      '<mrow><mi>h</mi></mrow><mrow><mn>4</mn><mo>-</mo><mn>2</mn>' +
      '<mi>s</mi></mrow></msup></mrow>';
  this.executeRuleTest(mml, 'c 1 h Superscript 4 minus 2 s Baseline' +
                       ' less-than-or-equal-to StartFraction 1 Over 2 upper T' +
                       ' EndFraction equals c 2 h Superscript 4 minus 2 s',
                       'default');
  this.executeRuleTest(mml, 'c 1 h Sup 4 minus 2 s Base less-than-or-equal-to' +
                       ' StartFrac 1 Over 2 upper T EndFrac equals c 2 h Sup' +
                       ' 4 minus 2 s', 'brief');
  this.executeRuleTest(mml, 'c 1 h Sup 4 minus 2 s Base' +
                       ' less-than-or-equal-to Frac 1 Over 2 upper T EndFrac' +
                       ' equals c 2 h Sup 4 minus 2 s', 'sbrief');

};


/**
 * Testing Subscript Baseline expression in relation-sequence
 * Simplified test case for expressions similar to 62.
 */
sre.MmlcloudEnglishTest.prototype.testSubBaseRelseq = function() {
  var mml = '<msub><mi>h</mi><mi>s</mi></msub><mo>&#x2264;</mo>' +
      '<mfrac><mn>1</mn><mrow><mn>2</mn><mi>T</mi></mrow></mfrac>' +
      '<mo>&#x2264;</mo><msub><mi>h</mi><mi>s</mi></msub>';
  this.executeRuleTest(mml, 'h Subscript s Baseline less-than-or-equal-to' +
                       ' StartFraction 1 Over 2 upper T EndFraction' +
                       ' less-than-or-equal-to h Subscript s', 'default');
  this.executeRuleTest(mml, 'h Sub s Base less-than-or-equal-to StartFrac' +
                       ' 1 Over 2 upper T EndFrac less-than-or-equal-to h' +
                       ' Sub s', 'brief');
  this.executeRuleTest(mml, 'h Sub s Base less-than-or-equal-to Frac 1 Over' +
                       ' 2 upper T EndFrac less-than-or-equal-to h Sub s',
                       'sbrief');
};


/**
 * Testing Subscript Baseline expression in multi-relation
 * Simplified test case for expressions similar to 62.
 */
sre.MmlcloudEnglishTest.prototype.testSubBaseMultirel = function() {
  var mml = '<msub><mi>h</mi><mi>s</mi></msub><mo>&#x2264;</mo>' +
      '<mfrac><mn>1</mn><mrow><mn>2</mn><mi>T</mi></mrow></mfrac>' +
      '<mo>=</mo><msub><mi>h</mi><mi>s</mi></msub>';
  this.executeRuleTest(mml, 'h Subscript s Baseline less-than-or-equal-to' +
                       ' StartFraction 1 Over 2 upper T EndFraction' +
                       ' equals h Subscript s', 'default');
  this.executeRuleTest(mml, 'h Sub s Base less-than-or-equal-to StartFrac' +
                       ' 1 Over 2 upper T EndFrac equals h' +
                       ' Sub s', 'brief');
  this.executeRuleTest(mml, 'h Sub s Base less-than-or-equal-to Frac 1 Over' +
                       ' 2 upper T EndFrac equals h Sub s',
                       'sbrief');
};


/**
 * Testing SubSuperscript Baseline expression in relation-sequence
 * Simplified test case for expressions similar to 62.
 */
sre.MmlcloudEnglishTest.prototype.testSubSuperBaseRelseq = function() {
  var mml = '<msubsup><mi>h</mi><mi>s</mi><mi>t</mi></msubsup>' +
      '<mo>&#x2264;</mo><mfrac><mn>1</mn><mrow><mn>2</mn><mi>T</mi>' +
      '</mrow></mfrac><mo>&#x2264;</mo><msubsup><mi>h</mi><mi>s</mi>' +
      '<mi>t</mi></msubsup>';
  this.executeRuleTest(mml, 'h Subscript s Superscript t Baseline' +
                       ' less-than-or-equal-to StartFraction 1 Over 2 upper' +
                       ' T EndFraction less-than-or-equal-to h Subscript' +
                       ' s Superscript t', 'default');
  this.executeRuleTest(mml, 'h Sub s Sup t Base less-than-or-equal-to' +
                       ' StartFrac 1 Over 2 upper T EndFrac' +
                       ' less-than-or-equal-to h Sub s Sup t', 'brief');
  this.executeRuleTest(mml, 'h Sub s Sup t Base less-than-or-equal-to Frac' +
                       ' 1 Over 2 upper T EndFrac less-than-or-equal-to' +
                       ' h Sub s Sup t', 'sbrief');
};


/**
 * Testing SubSuperscript Baseline expression in multi-relation
 * Simplified test case for expressions similar to 62.
 */
sre.MmlcloudEnglishTest.prototype.testSubSuperBaseMultirel = function() {
  var mml = '<msubsup><mi>h</mi><mi>s</mi><mi>t</mi></msubsup>' +
      '<mo>&#x2264;</mo><mfrac><mn>1</mn><mrow><mn>2</mn><mi>T</mi>' +
      '</mrow></mfrac><mo>=</mo><msubsup><mi>h</mi><mi>s</mi>' +
      '<mi>t</mi></msubsup>';
  this.executeRuleTest(mml, 'h Subscript s Superscript t Baseline' +
                       ' less-than-or-equal-to StartFraction 1 Over 2 upper' +
                       ' T EndFraction equals h Subscript s Superscript t',
                       'default');
  this.executeRuleTest(mml, 'h Sub s Sup t Base less-than-or-equal-to' +
                       ' StartFrac 1 Over 2 upper T EndFrac' +
                       ' equals h Sub s Sup t', 'brief');
  this.executeRuleTest(mml, 'h Sub s Sup t Base less-than-or-equal-to Frac' +
                       ' 1 Over 2 upper T EndFrac equals h Sub s Sup t',
                       'sbrief');
};


/**
 * Testing Square and Cubes with text children.
 * Test case for expression 18 (adapted to include cubed).
 */
sre.MmlcloudEnglishTest.prototype.testSquareWithText = function() {
  var mml = '<mrow><mfrac><mrow><mtext>area&#x00A0;of&#x00A0;triangle</mtext>' +
      '</mrow><mrow><mtext>area&#x00A0;of&#x00A0;square</mtext></mrow>' +
      '</mfrac><mo>=</mo><mfrac><mrow><msup><mrow>' +
      '<mtext>1&#x00A0;unit</mtext></mrow><mn>2</mn></msup></mrow><mrow>' +
      '<msup><mrow><mtext>16&#x00A0;units</mtext></mrow><mn>3</mn></msup>' +
      '</mrow></mfrac></mrow>';
  this.executeRuleTest(mml, 'StartFraction area of triangle Over area of' +
                       ' square EndFraction equals StartFraction 1 unit' +
                       ' squared Over 16 units cubed EndFraction', 'default');
  this.executeRuleTest(mml, 'StartFrac area of triangle Over area of square' +
                       ' EndFrac equals StartFrac 1 unit squared Over 16' +
                       ' units cubed EndFrac', 'brief');
  this.executeRuleTest(mml, 'Frac area of triangle Over area of square' +
                       ' EndFrac equals Frac 1 unit squared Over 16 units' +
                       ' cubed EndFrac', 'sbrief');
};


/**
 * Testing SubSuperscript Baseline expression in multi-relation
 * Simplified test case for expressions similar to 18.
 */
sre.MmlcloudEnglishTest.prototype.testFootnoteWithText = function() {
  var mml = '<mrow><mtext>area&#x00A0;of&#x00A0;triangle</mtext>' +
      '<mtext>&#x00A0;</mtext>' +
      '<msup><mrow><mtext>area&#x00A0;of&#x00A0;square</mtext>' +
      '</mrow><mn>1</mn></msup><mtext>&#x00A0;</mtext>' +
      '<msup><mrow><mtext>1&#x00A0;unit</mtext></mrow><mn>2</mn></msup>' +
      '<mtext>&#x00A0;</mtext>' +
      '<msup><mrow><mtext>16&#x00A0;units</mtext></mrow><mn>3</mn></msup>' +
      '</mrow>';
  this.executeRuleTest(mml, 'area of triangle area of square' +
                       ' Superscript 1 Baseline 1 unit Superscript 2' +
                       ' Baseline 16 units Superscript 3', 'default');
  this.executeRuleTest(mml, 'area of triangle area of' +
                       ' square Sup 1 Base 1 unit' +
                       ' Sup 2 Base 16 units Sup 3', 'brief');
  this.executeRuleTest(mml, 'area of triangle area of' +
                       ' square Sup 1 Base 1 unit' +
                       ' Sup 2 Base 16 units Sup 3', 'sbrief');
};


/**
 * Testing SubSuperscript Baseline expression in multi-relation
 * Simplified test case for expressions similar to 18.
 */
sre.MmlcloudEnglishTest.prototype.testFootnoteWithSimpleText = function() {
  var mml = '<msup><mtext>area&#x00A0;of&#x00A0;triangle</mtext>' +
      '<mn>2</mn></msup>';
  this.executeRuleTest(mml, 'area of triangle Superscript 2', 'default');
  this.executeRuleTest(mml, 'area of triangle Sup 2', 'brief');
  this.executeRuleTest(mml, 'area of triangle Sup 2', 'sbrief');
};


/**
 * Tests multiline tables.
 */
sre.MmlcloudEnglishTest.prototype.testMultiline = function() {
  this.executeRuleTest(
      '<mtable><mtr><mtd><mi>a</mi></mtd></mtr><mtr><mtd><mi>b</mi></mtd>' +
      '</mtr></mtable>',
      'StartLayout 1st Row  a 2nd Row  b EndLayout');
  this.executeRuleTest(
      '<mtable><mtr><mtd><mi>a</mi></mtd><mtd><mi>c</mi></mtd></mtr>' +
      '<mtr><mtd><mi>b</mi></mtd><mtd><mi>d</mi></mtd></mtr></mtable>',
      'StartLayout 1st Row 1st Column a 2nd Column c 2nd Row 1st Column b' +
      ' 2nd Column d EndLayout');
};


/**
 * Tests relation sequences with empty starts.
 */
sre.MmlcloudEnglishTest.prototype.testRelationsWithEmpty = function() {
  this.executeRuleTest(
      '<mo>&#x2264;</mo><mn>2</mn>',
      'less-than-or-equal-to 2');
  this.executeRuleTest(
      '<mo>=</mo><mn>2</mn><mo>=</mo>',
      'equals 2 equals');
  this.executeRuleTest(
      '<mo>&#x2264;</mo><mn>2</mn><mo>=</mo>',
      'less-than-or-equal-to 2 equals');
  this.executeRuleTest(
      '<mtable><mtr><mtd><mn>1</mn></mtd><mtd><mi></mi><mo>&#x2264;</mo><mn>2' +
      '</mn></mtd></mtr></mtable>',
      'StartLayout 1st Row 1st Column 1 2nd Column less-than-or-equal-to 2' +
      ' EndLayout');
};


/**
 * Tests for rows with labels.
 */
sre.MmlcloudEnglishTest.prototype.testLabelledRow = function() {
  var mml = '<mtable><mlabeledtr><mtd><mi>(1)</mi></mtd>' +
        '<mtd><mi>a</mi></mtd><mtd><mi>b</mi></mtd></mlabeledtr></mtable>';
  this.executeRuleTest(mml, 'StartLayout 1st Row  with Label' +
                       ' left-parenthesis 1 right-parenthesis EndLabel 1st' +
                       ' Column a 2nd Column b EndLayout', 'default');
  this.executeRuleTest(mml, 'StartLayout 1st Row  Label left-p\'ren 1' +
                       ' right-p\'ren 1st Column a 2nd Column b EndLayout',
                       'brief');
  this.executeRuleTest(mml, 'Layout 1st Row  Label L p\'ren 1 R p\'ren 1st' +
                       ' Column a 2nd Column b EndLayout', 'sbrief');
};


/**
 * Tests for lines with labels.
 */
sre.MmlcloudEnglishTest.prototype.testLabelledLine = function() {
  var mml = '<mtable><mlabeledtr><mtd><mi>(1)</mi></mtd>' +
        '<mtd><mi>a</mi></mtd></mlabeledtr></mtable>';
  this.executeRuleTest(mml, 'StartLayout 1st Row  with Label' +
                       ' left-parenthesis 1 right-parenthesis EndLabel' +
                       ' a EndLayout', 'default');
  this.executeRuleTest(mml, 'StartLayout 1st Row  Label left-p\'ren 1' +
                       ' right-p\'ren a EndLayout',
                       'brief');
  this.executeRuleTest(mml, 'Layout 1st Row  Label L p\'ren 1 R p\'ren' +
                       ' a EndLayout', 'sbrief');
};


/**
 * Tests for empty lines with labels.
 */
sre.MmlcloudEnglishTest.prototype.testLabelledEmptyLine = function() {
  var mml = '<mtable><mlabeledtr><mtd><mi>(1)</mi></mtd>' +
        '<mtd></mtd></mlabeledtr></mtable>';
  this.executeRuleTest(mml, 'StartLayout 1st Row  with Label' +
                       ' left-parenthesis 1 right-parenthesis EndLabel' +
                       ' Blank EndLayout', 'default');
  this.executeRuleTest(mml, 'StartLayout 1st Row  Label left-p\'ren 1' +
                       ' right-p\'ren Blank EndLayout', 'brief');
  this.executeRuleTest(mml, 'Layout 1st Row  Label L p\'ren 1 R p\'ren' +
                       ' Blank EndLayout', 'sbrief');
};


/**
 * Tests for empty lines.
 */
sre.MmlcloudEnglishTest.prototype.testEmptyLine = function() {
  var mml = '<mtable><mtr><mtd></mtd></mtr></mtable>';
  this.executeRuleTest(mml, 'StartLayout 1st Row  Blank EndLayout', 'default');
  this.executeRuleTest(mml, 'StartLayout 1st Row  Blank EndLayout', 'brief');
  this.executeRuleTest(mml, 'Layout 1st Row  Blank EndLayout', 'sbrief');
};


/**
 * Tests for empty lines with labels.
 */
sre.MmlcloudEnglishTest.prototype.testTextLabelledLine = function() {
  var mml = '<mtable><mlabeledtr><mtd><mtext>(1)</mtext></mtd>' +
        '<mtd><mi>a</mi></mtd></mlabeledtr></mtable>';
  this.executeRuleTest(mml, 'StartLayout 1st Row  with Label' +
                       ' left-parenthesis 1 right-parenthesis EndLabel a' +
                       ' EndLayout', 'default');
  this.executeRuleTest(mml, 'StartLayout 1st Row  Label left-p\'ren 1' +
                       ' right-p\'ren a EndLayout', 'brief');
  this.executeRuleTest(mml, 'Layout 1st Row  Label 1 a EndLayout', 'sbrief');
};

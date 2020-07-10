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
 * @fileoverview Testcases resulting from Mathml Cloud project, often inspired
 *     by bugs.
 * @author Volker.Sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.MmlcloudGermanTest');

goog.require('sre.AbstractRuleTest');



/**
 * @constructor
 * @extends {sre.AbstractRuleTest}
 */
sre.MmlcloudGermanTest = function() {
  sre.MmlcloudGermanTest.base(this, 'constructor');

  /**
   * @override
   */
  this.information = 'Mathml Cloud German tests.';

  /**
   * @override
   */
  this.domain = 'mathspeak';

  /**
   * @override
   */
  this.locale = 'de';

  this.setActive('MathmlCloudGerman');
};
goog.inherits(sre.MmlcloudGermanTest, sre.AbstractRuleTest);


// Special tests for roots
sre.MmlcloudGermanTest.prototype.testMathspeakRoots = function() {
  this.executeRuleTest(
    '<msqrt><mi>a</mi></msqrt>',
    'Anfang Quadratwurzel a Ende Quadratwurzel', 'default');
  this.executeRuleTest(
    '<mroot><mi>a</mi><mn>2</mn></mroot>',
    'Anfang Quadratwurzel a Ende Quadratwurzel', 'default');
  this.executeRuleTest(
    '<mroot><mi>a</mi><mn>3</mn></mroot>',
    'Anfang Kubikwurzel a Ende Kubikwurzel', 'default');
  this.executeRuleTest(
    '<mroot><mi>a</mi><mn>4</mn></mroot>',
    'Wurzelexponent 4 Anfang Wurzel a Ende Wurzel', 'default');
  this.executeRuleTest(
    '<msqrt><msqrt><mi>a</mi></msqrt></msqrt>',
    'Anfang geschachtelte Quadratwurzel Anfang Quadratwurzel a Ende Quadratwurzel Ende geschachtelte Quadratwurzel', 'default');
  this.executeRuleTest(
    '<msqrt><msqrt><msqrt><mi>a</mi></msqrt></msqrt></msqrt>',
    'Anfang zweifach geschachtelte Quadratwurzel Anfang geschachtelte Quadratwurzel Anfang Quadratwurzel a Ende Quadratwurzel Ende geschachtelte Quadratwurzel Ende zweifach geschachtelte Quadratwurzel', 'default');
  this.executeRuleTest(
    '<mroot><mroot><mi>a</mi><mn>2</mn></mroot><mn>2</mn></mroot>',
    'Anfang geschachtelte Quadratwurzel Anfang Quadratwurzel a Ende Quadratwurzel Ende geschachtelte Quadratwurzel', 'default');
  this.executeRuleTest(
    '<mroot><mroot><mroot><mi>a</mi><mn>2</mn></mroot><mn>2</mn></mroot><mn>2</mn></mroot>',
    'Anfang zweifach geschachtelte Quadratwurzel Anfang geschachtelte Quadratwurzel Anfang Quadratwurzel a Ende Quadratwurzel Ende geschachtelte Quadratwurzel Ende zweifach geschachtelte Quadratwurzel', 'default');
  this.executeRuleTest(
    '<mroot><mroot><mi>a</mi><mn>3</mn></mroot><mn>3</mn></mroot>',
    'Anfang geschachtelte Kubikwurzel Anfang Kubikwurzel a Ende Kubikwurzel Ende geschachtelte Kubikwurzel', 'default');
  this.executeRuleTest(
    '<mroot><mroot><mroot><mi>a</mi><mn>3</mn></mroot><mn>3</mn></mroot><mn>3</mn></mroot>',
    'Anfang zweifach geschachtelte Kubikwurzel Anfang geschachtelte Kubikwurzel Anfang Kubikwurzel a Ende Kubikwurzel Ende geschachtelte Kubikwurzel Ende zweifach geschachtelte Kubikwurzel', 'default');
  this.executeRuleTest(
    '<mroot><mroot><mi>a</mi><mn>4</mn></mroot><mn>4</mn></mroot>',
    'geschachtelter Wurzelexponent 4 Anfang geschachtelte Wurzel Wurzelexponent 4 Anfang Wurzel a Ende Wurzel Ende geschachtelte Wurzel', 'default');
  this.executeRuleTest(
    '<mroot><mroot><mroot><mi>a</mi><mn>4</mn></mroot><mn>4</mn></mroot><mn>4</mn></mroot>',
    'zweifach geschachtelter Wurzelexponent 4 Anfang zweifach geschachtelte Wurzel geschachtelter Wurzelexponent 4 Anfang geschachtelte Wurzel Wurzelexponent 4 Anfang Wurzel a Ende Wurzel Ende geschachtelte Wurzel Ende zweifach geschachtelte Wurzel', 'default');
  this.executeRuleTest(
    '<mroot><mroot><mroot><mi>a</mi><mn>4</mn></mroot><mn>3</mn></mroot><mn>2</mn></mroot>',
    'Anfang zweifach geschachtelte Quadratwurzel Anfang geschachtelte Kubikwurzel Wurzelexponent 4 Anfang Wurzel a Ende Wurzel Ende geschachtelte Kubikwurzel Ende zweifach geschachtelte Quadratwurzel', 'default');
  this.executeRuleTest(
    '<mroot><mroot><mroot><mi>a</mi><mn>2</mn></mroot><mn>3</mn></mroot><mn>4</mn></mroot>',
    'zweifach geschachtelter Wurzelexponent 4 Anfang zweifach geschachtelte Wurzel Anfang geschachtelte Kubikwurzel Anfang Quadratwurzel a Ende Quadratwurzel Ende geschachtelte Kubikwurzel Ende zweifach geschachtelte Wurzel', 'default');
};


/**
 * Testing for correct treatment of special HTML entities: non-breaking spaces,
 * left and right angle bracket.
 */
sre.MmlcloudGermanTest.prototype.testHtmlEntities = function() {
  var mml = '<mo>&lt;</mo>';
  this.executeRuleTest(mml, 'kleiner als', 'default');
  mml = '<mo>&gt;</mo>';
  this.executeRuleTest(mml, 'größer als', 'default');
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
sre.MmlcloudGermanTest.prototype.testBinomialFromFrac = function() {
  var mml = '<mfenced><mfrac linethickness="0pt"><mi>n</mi>' +
      '<mi>k</mi></mfrac></mfenced>';
  this.executeRuleTest(mml, 'Anfang Binomialkoeffizient k aus n Ende Binomialkoeffizient',
                       'default');
  mml = '<mfenced><mfrac linethickness="0.0em"><mi>n</mi>' +
        '<mi>k</mi></mfrac></mfenced>';
  this.executeRuleTest(mml, 'Anfang Binomialkoeffizient k aus n Ende Binomialkoeffizient',
                       'default');
  mml = '<mfenced><mfrac linethickness="negativeverythinmathspace"><mi>n</mi>' +
        '<mi>k</mi></mfrac></mfenced>';
  this.executeRuleTest(mml, 'Anfang Binomialkoeffizient k aus n Ende Binomialkoeffizient',
                       'default');
  mml = '<mfenced><mfrac linethickness="verythinmathspace"><mi>n</mi>' +
        '<mi>k</mi></mfrac></mfenced>';
  this.executeRuleTest(mml, 'Klammer auf Anfang Bruch n durch k Ende Bruch Klammer zu', 'default');
  mml = '<mfenced><mfrac linethickness="1pt"><mi>n</mi>' +
        '<mi>k</mi></mfrac></mfenced>';
  this.executeRuleTest(mml, 'Klammer auf Anfang Bruch n durch k Ende Bruch Klammer zu', 'default');
  mml = '<mfenced><mfrac linethickness="0.5pt"><mi>n</mi>' +
        '<mi>k</mi></mfrac></mfenced>';
  this.executeRuleTest(mml, 'Klammer auf Anfang Bruch n durch k Ende Bruch Klammer zu', 'default');
};


/**
 * Test unnecessary spaces.
 */
sre.MmlcloudGermanTest.prototype.testUnnecessarySpaces = function() {
  var mml = '<mn> 5 </mn>';
  this.executeRuleTest(mml, '5', 'default');
  mml = '<mn> &nbsp; 5 &nbsp; </mn>';
  this.executeRuleTest(mml, '5', 'default');
};


/**
 * Absolute values versus other netural fences.
 */
sre.MmlcloudGermanTest.prototype.testAbsValueVsNeutral = function() {
  var mml = '<mo>|</mo><mi>a</mi><mo>|</mo>';
  this.executeRuleTest(mml, 'Anfang Betrag a Ende Betrag',
                       'default');
  this.executeRuleTest(mml, 'Anfang Betrag a Ende Betrag',
                       'brief');
  this.executeRuleTest(mml, 'Betrag a Ende Betrag',
                       'sbrief');
  mml = '<mo>｜</mo><mi>a</mi><mo>｜</mo>';
  this.executeRuleTest(mml, 'Anfang Betrag a Ende Betrag',
                       'default');
  this.executeRuleTest(mml, 'Betrag a Ende Betrag',
                       'sbrief');
  mml = '<mo>｜</mo><mi>a</mi><mo>‖</mo>';
  this.executeRuleTest(mml, 'vollbreites Vertikale Linie a Doppelte vertikale Linie', 'default');
  mml = '<mo>‖</mo><mi>a</mi><mo>‖</mo>';
  this.executeRuleTest(mml, 'Doppelte vertikale Linie a Doppelte vertikale Linie',
                       'default');
  mml = '<mo>¦</mo><mi>a</mi><mo>¦</mo>';
  this.executeRuleTest(mml, 'gebrochene Linie a gebrochene Linie',
                       'default');
};


/**
 * Negative vulgar fraction.
 */
sre.MmlcloudGermanTest.prototype.testNegativeVulgarFraction = function() {
  var mml = '<mo>-</mo><mfrac><mn>5</mn><mn>18</mn></mfrac>';
  this.executeRuleTest(mml, 'minus fünf achtzehntel', 'default');
  this.executeRuleTest(mml, 'minus fünf achtzehntel',
                       'brief');
  this.executeRuleTest(mml, 'minus fünf achtzehntel', 'sbrief');
  mml = '<mfrac><mn>1</mn><mn>2</mn></mfrac><mo>-</mo>' +
      '<mfrac><mn>5</mn><mn>18</mn></mfrac>';
  this.executeRuleTest(mml, 'ein halb minus fünf achtzehntel', 'default');
  mml = '<mo>-</mo><mfrac><mn>5.2</mn><mi>a</mi></mfrac>';
  this.executeRuleTest(mml, 'minus Anfang Bruch 5,2 durch a Ende Bruch', 'default');
  mml = '<mo>-</mo><mfrac><mn>5.2</mn><mn>18</mn></mfrac>';
  this.executeRuleTest(mml, 'minus Anfang Bruch 5,2 durch 18 Ende Bruch', 'default');
};


/**
 * Testing trivial things.
 */
sre.MmlcloudGermanTest.prototype.testTrivialStuff = function() {
  var mml = '<mtext>a</mtext><mo>=</mo><mi>b</mi>';
  this.executeRuleTest(mml, 'a ist gleich b', 'default');
  mml = '<mo>"</mo>';
  this.executeRuleTest(mml, 'Anführungszeichen', 'default');
  mml = '<mo>"</mo><mi>x</mi><mo>"</mo>';
  this.executeRuleTest(mml, 'Anführungszeichen x Anführungszeichen', 'default');
  mml = '<mo>\'</mo>';
  this.executeRuleTest(mml, 'Hochkomma', 'default');
};


/**
 * Testing German fonts.
 */
sre.MmlcloudGermanTest.prototype.testGermanFonts = function() {
  var mml = '<mi mathvariant="fraktur">A</mi>';
  this.executeRuleTest(mml, 'Fraktur großes A', 'default');
  mml = '<mi mathvariant="bold-fraktur">A</mi>';
  this.executeRuleTest(mml, 'fettes Fraktur großes A', 'default');
  this.executeRuleTest('<mi>&#x1D504;</mi>', 'Fraktur großes A', 'default');
  this.executeRuleTest('<mi>&#x1D56C;</mi>', 'fettes Fraktur großes A',
                       'default');
  mml = '<mtext mathvariant="bold-fraktur">abc</mtext>';
  this.executeRuleTest(mml, 'fettes Fraktur abc', 'default');
  mml = '<mtext mathvariant="bold-fraktur">ABC</mtext>';
  this.executeRuleTest(mml, 'fettes Fraktur ABC', 'default');
  mml = '<mi mathvariant="bold-fraktur">ABC</mi>';
  this.executeRuleTest(mml, 'fettes Fraktur großes A großes B großes C', 'default');
};


/**
 * Testing other fonts.
 */
sre.MmlcloudGermanTest.prototype.testOtherFonts = function() {
  this.executeRuleTest('<mi>m</mi>', 'm');
  this.executeRuleTest('<mi mathvariant="normal">m</mi>', 'normales m');
  this.executeRuleTest('<mi>mi</mi>', 'normales m i');
  this.executeRuleTest('<mi mathvariant="italic">mi</mi>', 'm i');
  this.executeRuleTest('<mi>30</mi>', 'normales 30');
  this.executeRuleTest('<mi>3</mi>', 'kursive 3');
  this.executeRuleTest('<mi>30°</mi>', '30 Grad');
  this.executeRuleTest('<mi>30mA</mi>', '3 0 m großes A');
};


/**
 * Testing non-alpha identifier.
 */
sre.MmlcloudGermanTest.prototype.testNonalphaIdentifier = function() {
  var mml = '<mi>30°</mi>';
  this.executeRuleTest(mml, '30 Grad', 'default');
  this.executeRuleTest(mml, '30 Grad', 'brief');
  this.executeRuleTest(mml, '30 Grad', 'sbrief');
};


/**
 * Testing Chemistry Upper.
 */
sre.MmlcloudGermanTest.prototype.testMixedIdentifier = function() {
  var mml = '<mrow><mi mathvariant="normal">Si</mi><msub>' +
      '<mi mathvariant="normal">O</mi><mn>2</mn></msub><mo>+</mo><mn>6</mn>' +
      '<mi mathvariant="normal">H</mi><mi mathvariant="normal">F</mi>' +
      '<mo>&#x2192;</mo><msub><mi mathvariant="normal">H</mi><mn>2</mn>' +
      '</msub><mi mathvariant="normal">Si</mi><msub>' +
      '<mi mathvariant="normal">F</mi><mn>6</mn></msub><mo>+</mo><mn>2</mn>' +
      '<msub><mi mathvariant="normal">H</mi><mn>2</mn></msub>' +
      '<mi mathvariant="normal">O</mi></mrow>';
  this.executeRuleTest(mml, 'normales großes S i normales großes O 2 plus 6 normales großes H normales großes F Pfeil nach rechts normales großes H 2 normales großes S i normales großes F 6 plus 2 normales großes H 2 normales großes O', 'default');
  this.executeRuleTest(mml, 'normales großes S i normales großes O 2 plus 6 normales großes H normales großes F Pfeil nach rechts normales großes H 2 normales großes S i normales großes F 6 plus 2 normales großes H 2 normales großes O', 'brief');
  this.executeRuleTest(mml, 'normales großes S i normales großes O 2 plus 6 normales großes H normales großes F Pfeil nach rechts normales großes H 2 normales großes S i normales großes F 6 plus 2 normales großes H 2 normales großes O', 'sbrief');
};


// TODO (sorge) Test currently fails as the parenthesis is seen to be
//     embellished! Should work again once embellished parenthesis are fully
//     rewritten.
/**
 * Testing Parenthesis with Superscript.
 * Simplified test case for expression 95.
 */
sre.MmlcloudGermanTest.prototype.testParenSuper = function() {
  var mml = '<mo>(</mo><mi>a</mi><msup><mo>)</mo><mn>2</mn></msup>';
  this.executeRuleTest(mml, 'Klammer auf a Klammer zu Quadrat', 'default');
  this.executeRuleTest(mml, 'Klammer auf a Klammer zu Quadrat', 'brief');
  this.executeRuleTest(mml, 'Klammer auf a Klammer zu Quadrat', 'sbrief');
};


/**
 * Testing Parenthesis with convoluted operator.
 * Simplified test case for expression 98.
 */
sre.MmlcloudGermanTest.prototype.testParenConvoluted = function() {
  var mml = '<mo>(</mo><mo>-</mo><msup><mi>x</mi><mn>2</mn></msup>' +
          '<mo>/2)</mo>';
  this.executeRuleTest(mml, 'Klammer auf minus x Quadrat Schrägstrich 2 Klammer zu', 'default');
  this.executeRuleTest(mml, 'Klammer auf minus x Quadrat Schrägstrich 2 Klammer zu', 'brief');
  this.executeRuleTest(mml, 'Klammer auf minus x Quadrat Schrägstrich 2 Klammer zu', 'sbrief');
};


/**
 * Testing Superscript Baseline expression in relation-sequence
 * Simplified test case for expression 62.
 */
sre.MmlcloudGermanTest.prototype.testSupBaseRelseq = function() {
  var mml = '<mrow><msub><mrow><mi>c</mi></mrow><mrow><mn>1</mn></mrow>' +
      '</msub><msup><mrow><mi>h</mi></mrow><mrow><mn>4</mn><mo>-</mo>' +
      '<mn>2</mn><mi>s</mi></mrow></msup><mo>&#x2264;</mo><mfrac>' +
      '<mrow><mn>1</mn></mrow><mrow><mn>2</mn><mi>T</mi></mrow></mfrac>' +
      '<mo>&#x2264;</mo><msub><mrow><mi>c</mi></mrow><mrow><mn>2</mn>' +
      '</mrow></msub><msup><mrow><mi>h</mi></mrow><mrow><mn>4</mn>' +
      '<mo>-</mo><mn>2</mn><mi>s</mi></mrow></msup></mrow>';
  this.executeRuleTest(mml, 'c 1 h hoch 4 minus 2 s Grundlinie kleiner oder gleich Anfang Bruch 1 durch 2 großes T Ende Bruch kleiner oder gleich c 2 h hoch 4 minus 2 s', 'default');
  this.executeRuleTest(mml, 'c 1 h hoch 4 minus 2 s Grund kleiner oder gleich Anfang Bruch 1 durch 2 großes T Ende Bruch kleiner oder gleich c 2 h hoch 4 minus 2 s', 'brief');
  this.executeRuleTest(mml, 'c 1 h hoch 4 minus 2 s Grund kleiner oder gleich Bruch 1 durch 2 großes T Ende Bruch kleiner oder gleich c 2 h hoch 4 minus 2 s', 'sbrief');
};


/**
 * Testing Superscript Baseline expression in multi-relation.
 * Simplified test case similar to expression 62.
 */
sre.MmlcloudGermanTest.prototype.testSupBaseMultirel = function() {
  var mml = '<mrow><msub><mrow><mi>c</mi></mrow><mrow><mn>1</mn></mrow>' +
      '</msub><msup><mrow><mi>h</mi></mrow><mrow><mn>4</mn><mo>-</mo>' +
      '<mn>2</mn><mi>s</mi></mrow></msup><mo>&#x2264;</mo><mfrac><mrow>' +
      '<mn>1</mn></mrow><mrow><mn>2</mn><mi>T</mi></mrow></mfrac><mo>=</mo>' +
      '<msub><mrow><mi>c</mi></mrow><mrow><mn>2</mn></mrow></msub><msup>' +
      '<mrow><mi>h</mi></mrow><mrow><mn>4</mn><mo>-</mo><mn>2</mn>' +
      '<mi>s</mi></mrow></msup></mrow>';
  this.executeRuleTest(mml, 'c 1 h hoch 4 minus 2 s Grundlinie kleiner oder gleich Anfang Bruch 1 durch 2 großes T Ende Bruch ist gleich c 2 h hoch 4 minus 2 s',
                       'default');
  this.executeRuleTest(mml, 'c 1 h hoch 4 minus 2 s Grund kleiner oder gleich Anfang Bruch 1 durch 2 großes T Ende Bruch ist gleich c 2 h hoch 4 minus 2 s', 'brief');
  this.executeRuleTest(mml, 'c 1 h hoch 4 minus 2 s Grund kleiner oder gleich Bruch 1 durch 2 großes T Ende Bruch ist gleich c 2 h hoch 4 minus 2 s', 'sbrief');
};


/**
 * Testing Subscript Baseline expression in relation-sequence
 * Simplified test case for expressions similar to 62.
 */
sre.MmlcloudGermanTest.prototype.testSubBaseRelseq = function() {
  var mml = '<msub><mi>h</mi><mi>s</mi></msub><mo>&#x2264;</mo>' +
      '<mfrac><mn>1</mn><mrow><mn>2</mn><mi>T</mi></mrow></mfrac>' +
      '<mo>&#x2264;</mo><msub><mi>h</mi><mi>s</mi></msub>';
  this.executeRuleTest(mml, 'h Index s Grundlinie kleiner oder gleich Anfang Bruch 1 durch 2 großes T Ende Bruch kleiner oder gleich h Index s', 'default');
  this.executeRuleTest(mml, 'h Index s Grund kleiner oder gleich Anfang Bruch 1 durch 2 großes T Ende Bruch kleiner oder gleich h Index s', 'brief');
  this.executeRuleTest(mml, 'h Index s Grund kleiner oder gleich Bruch 1 durch 2 großes T Ende Bruch kleiner oder gleich h Index s', 'sbrief');
};


/**
 * Testing Subscript Baseline expression in multi-relation
 * Simplified test case for expressions similar to 62.
 */
sre.MmlcloudGermanTest.prototype.testSubBaseMultirel = function() {
  var mml = '<msub><mi>h</mi><mi>s</mi></msub><mo>&#x2264;</mo>' +
      '<mfrac><mn>1</mn><mrow><mn>2</mn><mi>T</mi></mrow></mfrac>' +
      '<mo>=</mo><msub><mi>h</mi><mi>s</mi></msub>';
  this.executeRuleTest(mml, 'h Index s Grundlinie kleiner oder gleich Anfang Bruch 1 durch 2 großes T Ende Bruch ist gleich h Index s', 'default');
  this.executeRuleTest(mml, 'h Index s Grund kleiner oder gleich Anfang Bruch 1 durch 2 großes T Ende Bruch ist gleich h Index s', 'brief');
  this.executeRuleTest(mml, 'h Index s Grund kleiner oder gleich Bruch 1 durch 2 großes T Ende Bruch ist gleich h Index s', 'sbrief');
};


/**
 * Testing SubSuperscript Baseline expression in relation-sequence
 * Simplified test case for expressions similar to 62.
 */
sre.MmlcloudGermanTest.prototype.testSubSuperBaseRelseq = function() {
  var mml = '<msubsup><mi>h</mi><mi>s</mi><mi>t</mi></msubsup>' +
      '<mo>&#x2264;</mo><mfrac><mn>1</mn><mrow><mn>2</mn><mi>T</mi>' +
      '</mrow></mfrac><mo>&#x2264;</mo><msubsup><mi>h</mi><mi>s</mi>' +
      '<mi>t</mi></msubsup>';
  this.executeRuleTest(mml, 'h Index s hoch t Grundlinie kleiner oder gleich Anfang Bruch 1 durch 2 großes T Ende Bruch kleiner oder gleich h Index s hoch t', 'default');
  this.executeRuleTest(mml, 'h Index s hoch t Grund kleiner oder gleich Anfang Bruch 1 durch 2 großes T Ende Bruch kleiner oder gleich h Index s hoch t', 'brief');
  this.executeRuleTest(mml, 'h Index s hoch t Grund kleiner oder gleich Bruch 1 durch 2 großes T Ende Bruch kleiner oder gleich h Index s hoch t',
                       'sbrief');
};


/**
 * Testing SubSuperscript Baseline expression in multi-relation
 * Simplified test case for expressions similar to 62.
 */
sre.MmlcloudGermanTest.prototype.testSubSuperBaseMultirel = function() {
  var mml = '<msubsup><mi>h</mi><mi>s</mi><mi>t</mi></msubsup>' +
      '<mo>&#x2264;</mo><mfrac><mn>1</mn><mrow><mn>2</mn><mi>T</mi>' +
      '</mrow></mfrac><mo>=</mo><msubsup><mi>h</mi><mi>s</mi>' +
      '<mi>t</mi></msubsup>';
  this.executeRuleTest(mml, 'h Index s hoch t Grundlinie kleiner oder gleich Anfang Bruch 1 durch 2 großes T Ende Bruch ist gleich h Index s hoch t', 'default');
  this.executeRuleTest(mml, 'h Index s hoch t Grund kleiner oder gleich Anfang Bruch 1 durch 2 großes T Ende Bruch ist gleich h Index s hoch t', 'brief');
  this.executeRuleTest(mml, 'h Index s hoch t Grund kleiner oder gleich Bruch 1 durch 2 großes T Ende Bruch ist gleich h Index s hoch t', 'sbrief');
};


/**
 * Testing Square and Cubes with text children.
 * Test case for expression 18 (adapted to include cubed).
 */
sre.MmlcloudGermanTest.prototype.testSquareWithText = function() {
  var mml = '<mrow><mfrac><mrow><mtext>area&#x00A0;of&#x00A0;triangle</mtext>' +
      '</mrow><mrow><mtext>area&#x00A0;of&#x00A0;square</mtext></mrow>' +
      '</mfrac><mo>=</mo><mfrac><mrow><msup><mrow>' +
      '<mtext>1&#x00A0;unit</mtext></mrow><mn>2</mn></msup></mrow><mrow>' +
      '<msup><mrow><mtext>16&#x00A0;units</mtext></mrow><mn>3</mn></msup>' +
      '</mrow></mfrac></mrow>';
  this.executeRuleTest(mml, 'Anfang Bruch area of triangle durch area of square Ende Bruch ist gleich Anfang Bruch 1 unit Quadrat durch 16 units Kubik Ende Bruch', 'default');
  this.executeRuleTest(mml, 'Anfang Bruch area of triangle durch area of square Ende Bruch ist gleich Anfang Bruch 1 unit Quadrat durch 16 units Kubik Ende Bruch',
                       'brief');
  this.executeRuleTest(mml, 'Bruch area of triangle durch area of square Ende Bruch ist gleich Bruch 1 unit Quadrat durch 16 units Kubik Ende Bruch', 'sbrief');
};


// TODO: (v2.3.0) Remove the personality lookup error.
/**
 * Testing SubSuperscript Baseline expression in multi-relation
 * Simplified test case for expressions similar to 18.
 */
sre.MmlcloudGermanTest.prototype.testFootnoteWithText = function() {
  var mml = '<mrow><mtext>area&#x00A0;of&#x00A0;triangle</mtext>' +
      '<mtext>&#x00A0;</mtext>' +
      '<msup><mrow><mtext>area&#x00A0;of&#x00A0;square</mtext>' +
      '</mrow><mn>1</mn></msup><mtext>&#x00A0;</mtext>' +
      '<msup><mrow><mtext>1&#x00A0;unit</mtext></mrow><mn>2</mn></msup>' +
      '<mtext>&#x00A0;</mtext>' +
      '<msup><mrow><mtext>16&#x00A0;units</mtext></mrow><mn>3</mn></msup>' +
      '</mrow>';
  this.executeRuleTest(mml, 'area of triangle area of square hoch 1 Grundlinie 1 unit hoch 2 Grundlinie 16 units hoch 3', 'default');
  this.executeRuleTest(mml, 'area of triangle area of square hoch 1 Grund 1 unit hoch 2 Grund 16 units hoch 3', 'brief');
  this.executeRuleTest(mml, 'area of triangle area of square hoch 1 Grund 1 unit hoch 2 Grund 16 units hoch 3', 'sbrief');
};


// TODO: (v2.3.0) Fix this error.
/**
 * Testing SubSuperscript Baseline expression in multi-relation
 * Simplified test case for expressions similar to 18.
 */
sre.MmlcloudGermanTest.prototype.testFootnoteWithSimpleText = function() {
  var mml = '<msup><mtext>area&#x00A0;of&#x00A0;triangle</mtext>' +
      '<mn>2</mn></msup>';
  this.executeRuleTest(mml, 'area of triangle hoch 2', 'default');
  this.executeRuleTest(mml, 'area of triangle hoch 2', 'brief');
  this.executeRuleTest(mml, 'area of triangle hoch 2', 'sbrief');
};


/**
 * Tests multiline tables.
 */
sre.MmlcloudGermanTest.prototype.testMultiline = function() {
  this.executeRuleTest(
      '<mtable><mtr><mtd><mi>a</mi></mtd></mtr><mtr><mtd><mi>b</mi></mtd>' +
      '</mtr></mtable>',
      'Anfang Anordnung 1. Zeile  a 2. Zeile  b Ende Anordnung');
  this.executeRuleTest(
      '<mtable><mtr><mtd><mi>a</mi></mtd><mtd><mi>c</mi></mtd></mtr>' +
      '<mtr><mtd><mi>b</mi></mtd><mtd><mi>d</mi></mtd></mtr></mtable>',
      'Anfang Anordnung 1. Zeile 1. Spalte a 2. Spalte c 2. Zeile 1. Spalte b 2. Spalte d Ende Anordnung');
};


/**
 * Tests relation sequences with empty starts.
 */
sre.MmlcloudGermanTest.prototype.testRelationsWithEmpty = function() {
  this.executeRuleTest(
      '<mo>&#x2264;</mo><mn>2</mn>',
      'kleiner oder gleich 2');
  this.executeRuleTest(
      '<mo>=</mo><mn>2</mn><mo>=</mo>',
      'ist gleich 2 ist gleich');
  this.executeRuleTest(
      '<mo>&#x2264;</mo><mn>2</mn><mo>=</mo>',
      'kleiner oder gleich 2 ist gleich');
  this.executeRuleTest(
      '<mtable><mtr><mtd><mn>1</mn></mtd><mtd><mi></mi><mo>&#x2264;</mo><mn>2' +
      '</mn></mtd></mtr></mtable>',
      'Anfang Anordnung 1. Zeile 1. Spalte 1 2. Spalte kleiner oder gleich 2 Ende Anordnung');
};


/**
 * Tests for rows with labels.
 */
sre.MmlcloudGermanTest.prototype.testLabelledRow = function() {
  var mml = '<mtable><mlabeledtr><mtd><mi>(1)</mi></mtd>' +
      '<mtd><mi>a</mi></mtd><mtd><mi>b</mi></mtd></mlabeledtr></mtable>';
  this.executeRuleTest(mml, 'Anfang Anordnung 1. Zeile  mit Bezeichner Klammer auf 1 Klammer zu Ende Bezeichner 1. Spalte a 2. Spalte b Ende Anordnung', 'default');
  this.executeRuleTest(mml, 'Anfang Anordnung 1. Zeile  Bezeichner Klammer auf 1 Klammer zu 1. Spalte a 2. Spalte b Ende Anordnung',
                       'brief');
  this.executeRuleTest(mml, 'Anordnung 1. Zeile  Bezeichner Klammer auf 1 Klammer zu 1. Spalte a 2. Spalte b Ende Anordnung', 'sbrief');
};


/**
 * Tests for lines with labels.
 */
sre.MmlcloudGermanTest.prototype.testLabelledLine = function() {
  var mml = '<mtable><mlabeledtr><mtd><mi>(1)</mi></mtd>' +
      '<mtd><mi>a</mi></mtd></mlabeledtr></mtable>';
  this.executeRuleTest(mml, 'Anfang Anordnung 1. Zeile  mit Bezeichner Klammer auf 1 Klammer zu Ende Bezeichner a Ende Anordnung', 'default');
  this.executeRuleTest(mml, 'Anfang Anordnung 1. Zeile  Bezeichner Klammer auf 1 Klammer zu a Ende Anordnung',
                       'brief');
  this.executeRuleTest(mml, 'Anordnung 1. Zeile  Bezeichner Klammer auf 1 Klammer zu a Ende Anordnung', 'sbrief');
};


/**
 * Tests for empty lines with labels.
 */
sre.MmlcloudGermanTest.prototype.testLabelledEmptyLine = function() {
  var mml = '<mtable><mlabeledtr><mtd><mi>(1)</mi></mtd>' +
      '<mtd></mtd></mlabeledtr></mtable>';
  this.executeRuleTest(mml, 'Anfang Anordnung 1. Zeile  mit Bezeichner Klammer auf 1 Klammer zu Ende Bezeichner leer Ende Anordnung',
                       'default');
  this.executeRuleTest(mml, 'Anfang Anordnung 1. Zeile  Bezeichner Klammer auf 1 Klammer zu leer Ende Anordnung', 'brief');
  this.executeRuleTest(mml, 'Anordnung 1. Zeile  Bezeichner Klammer auf 1 Klammer zu leer Ende Anordnung', 'sbrief');
};


/**
 * Tests for empty lines.
 */
sre.MmlcloudGermanTest.prototype.testEmptyLine = function() {
  var mml = '<mtable><mtr><mtd></mtd></mtr></mtable>';
  this.executeRuleTest(mml, 'Anfang Anordnung 1. Zeile  leer Ende Anordnung', 'default');
  this.executeRuleTest(mml, 'Anfang Anordnung 1. Zeile  leer Ende Anordnung', 'brief');
  this.executeRuleTest(mml, 'Anordnung 1. Zeile  leer Ende Anordnung', 'sbrief');
};


/**
 * Tests for empty lines with labels.
 */
sre.MmlcloudGermanTest.prototype.testTextLabelledLine = function() {
  var mml = '<mtable><mlabeledtr><mtd><mtext>(1)</mtext></mtd>' +
      '<mtd><mi>a</mi></mtd></mlabeledtr></mtable>';
  this.executeRuleTest(mml, 'Anfang Anordnung 1. Zeile  mit Bezeichner Klammer auf 1 Klammer zu Ende Bezeichner a Ende Anordnung', 'default');
  this.executeRuleTest(mml, 'Anfang Anordnung 1. Zeile  Bezeichner Klammer auf 1 Klammer zu a Ende Anordnung', 'brief');
  this.executeRuleTest(mml, 'Anordnung 1. Zeile  Bezeichner 1 a Ende Anordnung', 'sbrief');
};


/**
 * Test for general enclose.
 */
sre.MmlcloudGermanTest.prototype.testEncloseGeneral = function() {
  this.executeRuleTest('<menclose notation="circle"><mi>a</mi></menclose>',
                       'Anfang Umschließung kreisähnliche Umrandung a Ende Umschließung', 'default');
};


/**
 * Test for general enclose overbar
 */
sre.MmlcloudGermanTest.prototype.testEncloseOverbar = function() {
  this.executeRuleTest('<menclose notation="top"><mi>a</mi></menclose>',
                       'a Überstrich', 'default');
  this.executeRuleTest('<menclose notation="top"><mi>a</mi></menclose>',
                       'a Überstrich', 'brief');
  this.executeRuleTest('<menclose notation="top"><mi>a</mi></menclose>',
                       'a Überstrich', 'sbrief');
};


/**
 * Test for general enclose underbar
 */
sre.MmlcloudGermanTest.prototype.testEncloseUnderbar = function() {
  this.executeRuleTest('<menclose notation="bottom"><mi>a</mi></menclose>',
                       'a Unterstrich', 'default');
  this.executeRuleTest('<menclose notation="bottom"><mi>a</mi></menclose>',
                       'a Unterstrich', 'brief');
  this.executeRuleTest('<menclose notation="bottom"><mi>a</mi></menclose>',
                       'a Unterstrich', 'sbrief');
};


/**
 * Test for general enclose leftbar
 */
sre.MmlcloudGermanTest.prototype.testEncloseLeftbar = function() {
  this.executeRuleTest('<menclose notation="left"><mi>a</mi></menclose>',
                       'senkrechter Strich a', 'default');
};


/**
 * Test for general enclose rightbar
 */
sre.MmlcloudGermanTest.prototype.testEncloseRightbar = function() {
  this.executeRuleTest('<menclose notation="right"><mi>a</mi></menclose>',
                       'a senkrechter Strich', 'default');
};

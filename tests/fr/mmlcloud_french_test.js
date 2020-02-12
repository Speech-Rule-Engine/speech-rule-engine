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

  this.setActive('MathmlCloudFrench');
};
goog.inherits(sre.MmlcloudFrenchTest, sre.AbstractRuleTest);


/**
 * Testing for correct treatment of special HTML entities: non-breaking spaces,
 * left and right angle bracket.
 */
sre.MmlcloudFrenchTest.prototype.testHtmlEntities = function() {
  var mml = '<mo>&lt;</mo>';
  this.executeRuleTest(mml, 'inférieur à', 'default');
  mml = '<mo>&gt;</mo>';
  this.executeRuleTest(mml, 'supérieur à', 'default');
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
  this.executeRuleTest(mml, 'début binomiale k parmi n fin binomiale',
                       'default');
  mml = '<mfenced><mfrac linethickness="0.0em"><mi>n</mi>' +
        '<mi>k</mi></mfrac></mfenced>';
  this.executeRuleTest(mml, 'début binomiale k parmi n fin binomiale',
                       'default');
  mml = '<mfenced><mfrac linethickness="negativeverythinmathspace"><mi>n</mi>' +
        '<mi>k</mi></mfrac></mfenced>';
  this.executeRuleTest(mml, 'début binomiale k parmi n fin binomiale',
                       'default');
  mml = '<mfenced><mfrac linethickness="verythinmathspace"><mi>n</mi>' +
        '<mi>k</mi></mfrac></mfenced>';
  this.executeRuleTest(mml, 'parenthèse gauche début fraction n sur k fin fraction parenthèse droite', 'default');
  mml = '<mfenced><mfrac linethickness="1pt"><mi>n</mi>' +
        '<mi>k</mi></mfrac></mfenced>';
  this.executeRuleTest(mml, 'parenthèse gauche début fraction n sur k fin fraction parenthèse droite', 'default');
  mml = '<mfenced><mfrac linethickness="0.5pt"><mi>n</mi>' +
        '<mi>k</mi></mfrac></mfenced>';
  this.executeRuleTest(mml, 'parenthèse gauche début fraction n sur k fin fraction parenthèse droite', 'default');
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
  this.executeRuleTest(mml, 'début valeur absolue a fin valeur absolue',
                       'default');
  this.executeRuleTest(mml, 'début valeur absolue a fin valeur absolue',
                       'brief');
  this.executeRuleTest(mml, 'valeur absolue a fin valeur absolue',
                       'sbrief');
  mml = '<mo>｜</mo><mi>a</mi><mo>｜</mo>';
  this.executeRuleTest(mml, 'début valeur absolue a fin valeur absolue',
                       'default');
  this.executeRuleTest(mml, 'valeur absolue a fin valeur absolue',
                       'sbrief');
  mml = '<mo>｜</mo><mi>a</mi><mo>‖</mo>';
  this.executeRuleTest(mml, 'vertical bar a double ligne verticale', 'default');
  mml = '<mo>‖</mo><mi>a</mi><mo>‖</mo>';
  this.executeRuleTest(mml, 'double ligne verticale a double ligne verticale',
                       'default');
  mml = '<mo>¦</mo><mi>a</mi><mo>¦</mo>';
  this.executeRuleTest(mml, 'barre déjointe a barre déjointe',
                       'default');
};


/**
 * Negative vulgar fraction.
 */
sre.MmlcloudFrenchTest.prototype.testNegativeVulgarFraction = function() {
  var mml = '<mo>-</mo><mfrac><mn>5</mn><mn>18</mn></mfrac>';
  this.executeRuleTest(mml, 'négatif cinq-dix-huitièmes', 'default');
  this.executeRuleTest(mml, 'négatif cinq-dix-huitièmes',
                       'brief');
  this.executeRuleTest(mml, 'négatif cinq-dix-huitièmes', 'sbrief');
  mml = '<mfrac><mn>1</mn><mn>2</mn></mfrac><mo>-</mo>' +
      '<mfrac><mn>5</mn><mn>18</mn></mfrac>';
  this.executeRuleTest(mml, 'un-demi moins cinq-dix-huitièmes', 'default');
  mml = '<mo>-</mo><mfrac><mn>5.2</mn><mi>a</mi></mfrac>';
  this.executeRuleTest(mml, 'négatif début fraction 5,2 sur a fin fraction', 'default');
  mml = '<mo>-</mo><mfrac><mn>5.2</mn><mn>18</mn></mfrac>';
  this.executeRuleTest(mml, 'négatif début fraction 5,2 sur 18 fin fraction', 'default');
};


/**
 * Testing trivial things.
 */
sre.MmlcloudFrenchTest.prototype.testTrivialStuff = function() {
  var mml = '<mtext>a</mtext><mo>=</mo><mi>b</mi>';
  this.executeRuleTest(mml, 'a égale b', 'default');
  mml = '<mo>"</mo>';
  this.executeRuleTest(mml, 'petit guillemet', 'default');
  mml = '<mo>"</mo><mi>x</mi><mo>"</mo>';
  this.executeRuleTest(mml, 'petit guillemet x petit guillemet', 'default');
  mml = '<mo>\'</mo>';
  this.executeRuleTest(mml, 'prime', 'default');
};


/**
 * Testing German fonts.
 */
sre.MmlcloudFrenchTest.prototype.testGermanFonts = function() {
  var mml = '<mi mathvariant="fraktur">A</mi>';
  this.executeRuleTest(mml, 'A majuscule en gothique', 'default');
  mml = '<mi mathvariant="bold-fraktur">A</mi>';
  this.executeRuleTest(mml, 'A majuscule en gothique gras', 'default');
  this.executeRuleTest('<mi>&#x1D504;</mi>', 'A majuscule en gothique', 'default');
  this.executeRuleTest('<mi>&#x1D56C;</mi>', 'A majuscule en gothique gras',
                       'default');
  mml = '<mtext mathvariant="bold-fraktur">abc</mtext>';
  this.executeRuleTest(mml, 'abc en gothique gras', 'default');
  mml = '<mtext mathvariant="bold-fraktur">ABC</mtext>';
  this.executeRuleTest(mml, 'ABC en gothique gras', 'default');
  mml = '<mi mathvariant="bold-fraktur">ABC</mi>';
  this.executeRuleTest(mml, 'A majuscule B majuscule C majuscule en gothique gras', 'default');
};


/**
 * Testing other fonts.
 */
sre.MmlcloudFrenchTest.prototype.testOtherFonts = function() {
  this.executeRuleTest('<mi>m</mi>', 'm');
  this.executeRuleTest('<mi mathvariant="normal">m</mi>', 'm en normal');
  this.executeRuleTest('<mi>mi</mi>', 'm i');
  this.executeRuleTest('<mi mathvariant="italic">mi</mi>', 'm i en italique');
  this.executeRuleTest('<mi>30</mi>', '30');
  this.executeRuleTest('<mi>3</mi>', '3 en italique');
  this.executeRuleTest('<mi>30°</mi>', '30 degrés');
  this.executeRuleTest('<mi>30mA</mi>', '3 0 m A majuscule');
};


/**
 * Testing non-alpha identifier.
 */
sre.MmlcloudFrenchTest.prototype.testNonalphaIdentifier = function() {
  var mml = '<mi>30°</mi>';
  this.executeRuleTest(mml, '30 degrés', 'default');
  this.executeRuleTest(mml, '30 degrés', 'brief');
  this.executeRuleTest(mml, '30 degrés', 'sbrief');
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
  this.executeRuleTest(mml, 'S majuscule i O majuscule en normal indice 2 position de base plus 6 H majuscule en normal F majuscule en normal flèche droite H majuscule en normal indice 2 position de base S majuscule i F majuscule en normal indice 6 position de base plus 2 H majuscule en normal indice 2 position de base O majuscule en normal', 'default');
  this.executeRuleTest(mml, 'S majuscule i O majuscule en normal 2 plus 6 H majuscule en normal F majuscule en normal flèche droite H majuscule en normal 2 S majuscule i F majuscule en normal 6 plus 2 H majuscule en normal 2 O majuscule en normal', 'brief');
  this.executeRuleTest(mml, 'S majuscule i O majuscule en normal 2 plus 6 H majuscule en normal F majuscule en normal flèche droite H majuscule en normal 2 S majuscule i F majuscule en normal 6 plus 2 H majuscule en normal 2 O majuscule en normal', 'sbrief');
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
  this.executeRuleTest(mml, 'parenthèse gauche a parenthèse droite au carré', 'default');
  this.executeRuleTest(mml, 'parenthèse gauche a parenthèse droite au carré', 'brief');
  this.executeRuleTest(mml, 'parenthèse gauche a parenthèse droite au carré', 'sbrief');
};


/**
 * Testing Parenthesis with convoluted operator.
 * Simplified test case for expression 98.
 */
sre.MmlcloudFrenchTest.prototype.testParenConvoluted = function() {
  var mml = '<mo>(</mo><mo>-</mo><msup><mi>x</mi><mn>2</mn></msup>' +
          '<mo>/2)</mo>';
  this.executeRuleTest(mml, 'parenthèse gauche négatif x au carré barre oblique 2 parenthèse droite', 'default');
  this.executeRuleTest(mml, 'parenthèse gauche négatif x au carré barre oblique 2 parenthèse droite', 'brief');
  this.executeRuleTest(mml, 'parenthèse gauche négatif x au carré barre oblique 2 parenthèse droite', 'sbrief');
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
  this.executeRuleTest(mml, 'c indice 1 position de base h exposant 4 moins 2 s position de base plus petit ou égal à début fraction 1 sur 2 T majuscule fin fraction plus petit ou égal à c indice 2 position de base h exposant 4 moins 2 s', 'default');
  this.executeRuleTest(mml, 'c 1 h sup 4 moins 2 s position de base plus petit ou égal à début frac 1 sur 2 T majuscule fin frac plus petit ou égal à c 2 h sup 4 moins 2 s', 'brief');
  this.executeRuleTest(mml, 'c 1 h sup 4 moins 2 s position de base plus petit ou égal à frac 1 sur 2 T majuscule fin frac plus petit ou égal à c 2 h sup 4 moins 2 s', 'sbrief');
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
  this.executeRuleTest(mml, 'c indice 1 position de base h exposant 4 moins 2 s position de base plus petit ou égal à début fraction 1 sur 2 T majuscule fin fraction égale c indice 2 position de base h exposant 4 moins 2 s',
                       'default');
  this.executeRuleTest(mml, 'c 1 h sup 4 moins 2 s position de base plus petit ou égal à début frac 1 sur 2 T majuscule fin frac égale c 2 h sup 4 moins 2 s', 'brief');
  this.executeRuleTest(mml, 'c 1 h sup 4 moins 2 s position de base plus petit ou égal à frac 1 sur 2 T majuscule fin frac égale c 2 h sup 4 moins 2 s', 'sbrief');
};


/**
 * Testing Subscript Baseline expression in relation-sequence
 * Simplified test case for expressions similar to 62.
 */
sre.MmlcloudFrenchTest.prototype.testSubBaseRelseq = function() {
  var mml = '<msub><mi>h</mi><mi>s</mi></msub><mo>&#x2264;</mo>' +
      '<mfrac><mn>1</mn><mrow><mn>2</mn><mi>T</mi></mrow></mfrac>' +
      '<mo>&#x2264;</mo><msub><mi>h</mi><mi>s</mi></msub>';
  this.executeRuleTest(mml, 'h indice s position de base plus petit ou égal à début fraction 1 sur 2 T majuscule fin fraction plus petit ou égal à h indice s', 'default');
  this.executeRuleTest(mml, 'h sub s position de base plus petit ou égal à début frac 1 sur 2 T majuscule fin frac plus petit ou égal à h sub s', 'brief');
  this.executeRuleTest(mml, 'h sub s position de base plus petit ou égal à frac 1 sur 2 T majuscule fin frac plus petit ou égal à h sub s', 'sbrief');
};


/**
 * Testing Subscript Baseline expression in multi-relation
 * Simplified test case for expressions similar to 62.
 */
sre.MmlcloudFrenchTest.prototype.testSubBaseMultirel = function() {
  var mml = '<msub><mi>h</mi><mi>s</mi></msub><mo>&#x2264;</mo>' +
      '<mfrac><mn>1</mn><mrow><mn>2</mn><mi>T</mi></mrow></mfrac>' +
      '<mo>=</mo><msub><mi>h</mi><mi>s</mi></msub>';
  this.executeRuleTest(mml, 'h indice s position de base plus petit ou égal à début fraction 1 sur 2 T majuscule fin fraction égale h indice s', 'default');
  this.executeRuleTest(mml, 'h sub s position de base plus petit ou égal à début frac 1 sur 2 T majuscule fin frac égale h sub s', 'brief');
  this.executeRuleTest(mml, 'h sub s position de base plus petit ou égal à frac 1 sur 2 T majuscule fin frac égale h sub s', 'sbrief');
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
  this.executeRuleTest(mml, 'h indice s exposant t position de base plus petit ou égal à début fraction 1 sur 2 T majuscule fin fraction plus petit ou égal à h indice s exposant t', 'default');
  this.executeRuleTest(mml, 'h sub s sup t position de base plus petit ou égal à début frac 1 sur 2 T majuscule fin frac plus petit ou égal à h sub s sup t', 'brief');
  this.executeRuleTest(mml, 'h sub s sup t position de base plus petit ou égal à frac 1 sur 2 T majuscule fin frac plus petit ou égal à h sub s sup t',
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
  this.executeRuleTest(mml, 'h indice s exposant t position de base plus petit ou égal à début fraction 1 sur 2 T majuscule fin fraction égale h indice s exposant t', 'default');
  this.executeRuleTest(mml, 'h sub s sup t position de base plus petit ou égal à début frac 1 sur 2 T majuscule fin frac égale h sub s sup t', 'brief');
  this.executeRuleTest(mml, 'h sub s sup t position de base plus petit ou égal à frac 1 sur 2 T majuscule fin frac égale h sub s sup t', 'sbrief');
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
  this.executeRuleTest(mml, 'début fraction area of triangle sur area of square fin fraction égale début fraction 1 unit au carré sur 16 units cubique fin fraction', 'default');
  this.executeRuleTest(mml, 'début frac area of triangle sur area of square fin frac égale début frac 1 unit au carré sur 16 units cubique fin frac',
                       'brief');
  this.executeRuleTest(mml, 'frac area of triangle sur area of square fin frac égale frac 1 unit au carré sur 16 units cubique fin frac', 'sbrief');
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
      '<mtable><mtr><mtd><mi>a</mi></mtd></mtr><mtr><mtd><mi>b</mi></mtd>' +
      '</mtr></mtable>',
      'début tableau 1re rangée  a 2e rangée  b fin tableau');
  this.executeRuleTest(
      '<mtable><mtr><mtd><mi>a</mi></mtd><mtd><mi>c</mi></mtd></mtr>' +
      '<mtr><mtd><mi>b</mi></mtd><mtd><mi>d</mi></mtd></mtr></mtable>',
      'début tableau 1re rangée 1re colonne a 2e colonne c 2e rangée 1re colonne b 2e colonne d fin tableau');
};


/**
 * Tests relation sequences with empty starts.
 */
sre.MmlcloudFrenchTest.prototype.testRelationsWithEmpty = function() {
  this.executeRuleTest(
      '<mo>&#x2264;</mo><mn>2</mn>',
      'plus petit ou égal à 2');
  this.executeRuleTest(
      '<mo>=</mo><mn>2</mn><mo>=</mo>',
      'égale 2 égale');
  this.executeRuleTest(
      '<mo>&#x2264;</mo><mn>2</mn><mo>=</mo>',
      'plus petit ou égal à 2 égale');
  this.executeRuleTest(
      '<mtable><mtr><mtd><mn>1</mn></mtd><mtd><mi></mi><mo>&#x2264;</mo><mn>2' +
      '</mn></mtd></mtr></mtable>',
      'début tableau 1re rangée 1re colonne 1 2e colonne plus petit ou égal à 2 fin tableau');
};


/**
 * Tests for rows with labels.
 */
sre.MmlcloudFrenchTest.prototype.testLabelledRow = function() {
  var mml = '<mtable><mlabeledtr><mtd><mi>(1)</mi></mtd>' +
      '<mtd><mi>a</mi></mtd><mtd><mi>b</mi></mtd></mlabeledtr></mtable>';
  this.executeRuleTest(mml, 'début tableau 1re rangée  avec étiquette parenthèse gauche 1 parenthèse droite fin étiquette 1re colonne a 2e colonne b fin tableau', 'default');
  this.executeRuleTest(mml, 'début tableau 1re rangée  étiquette parenthèse gauche 1 parenthèse droite 1re colonne a 2e colonne b fin tableau',
                       'brief');
  this.executeRuleTest(mml, 'tableau 1re rangée  étiquette parenthèse gauche 1 parenthèse droite 1re colonne a 2e colonne b fin tableau', 'sbrief');
};


/**
 * Tests for lines with labels.
 */
sre.MmlcloudFrenchTest.prototype.testLabelledLine = function() {
  var mml = '<mtable><mlabeledtr><mtd><mi>(1)</mi></mtd>' +
      '<mtd><mi>a</mi></mtd></mlabeledtr></mtable>';
  this.executeRuleTest(mml, 'début tableau 1re rangée  avec etiquette parenthèse gauche 1 parenthèse droite fin etiquette a fin tableau', 'default');
  this.executeRuleTest(mml, 'début tableau 1re rangée  etiquette parenthèse gauche 1 parenthèse droite a fin tableau',
                       'brief');
  this.executeRuleTest(mml, 'tableau 1re rangée  etiquette parenthèse gauche 1 parenthèse droite a fin tableau', 'sbrief');
};


/**
 * Tests for empty lines with labels.
 */
sre.MmlcloudFrenchTest.prototype.testLabelledEmptyLine = function() {
  var mml = '<mtable><mlabeledtr><mtd><mi>(1)</mi></mtd>' +
      '<mtd></mtd></mlabeledtr></mtable>';
  this.executeRuleTest(mml, 'début tableau 1re rangée  avec etiquette parenthèse gauche 1 parenthèse droite fin etiquette vide fin tableau',
                       'default');
  this.executeRuleTest(mml, 'début tableau 1re rangée  etiquette parenthèse gauche 1 parenthèse droite vide fin tableau', 'brief');
  this.executeRuleTest(mml, 'tableau 1re rangée  etiquette parenthèse gauche 1 parenthèse droite vide fin tableau', 'sbrief');
};


/**
 * Tests for empty lines.
 */
sre.MmlcloudFrenchTest.prototype.testEmptyLine = function() {
  var mml = '<mtable><mtr><mtd></mtd></mtr></mtable>';
  this.executeRuleTest(mml, 'début tableau 1re rangée  vide fin tableau', 'default');
  this.executeRuleTest(mml, 'début tableau 1re rangée  vide fin tableau', 'brief');
  this.executeRuleTest(mml, 'tableau 1re rangée  vide fin tableau', 'sbrief');
};


/**
 * Tests for empty lines with labels.
 */
sre.MmlcloudFrenchTest.prototype.testTextLabelledLine = function() {
  var mml = '<mtable><mlabeledtr><mtd><mtext>(1)</mtext></mtd>' +
      '<mtd><mi>a</mi></mtd></mlabeledtr></mtable>';
  this.executeRuleTest(mml, 'début tableau 1re rangée  avec etiquette parenthèse gauche 1 parenthèse droite fin etiquette a fin tableau', 'default');
  this.executeRuleTest(mml, 'début tableau 1re rangée  etiquette parenthèse gauche 1 parenthèse droite a fin tableau', 'brief');
  this.executeRuleTest(mml, 'tableau 1re rangée  etiquette 1 a fin tableau', 'sbrief');
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
                       'début trait suscrit a fin trait suscrit', 'default');
  this.executeRuleTest('<menclose notation="top"><mi>a</mi></menclose>',
                       'début trait suscrit a fin trait suscrit', 'brief');
  this.executeRuleTest('<menclose notation="top"><mi>a</mi></menclose>',
                       'début trait suscrit a fin trait suscrit', 'sbrief');
};


/**
 * Test for general enclose underbar
 */
sre.MmlcloudFrenchTest.prototype.testEncloseUnderbar = function() {
  this.executeRuleTest('<menclose notation="bottom"><mi>a</mi></menclose>',
                       'début trait souscrit a fin trait souscrit', 'default');
  this.executeRuleTest('<menclose notation="bottom"><mi>a</mi></menclose>',
                       'début trait souscrit a fin trait souscrit', 'brief');
  this.executeRuleTest('<menclose notation="bottom"><mi>a</mi></menclose>',
                       'début trait souscrit a fin trait souscrit', 'sbrief');
};


/**
 * Test for general enclose leftbar
 */
sre.MmlcloudFrenchTest.prototype.testEncloseLeftbar = function() {
  this.executeRuleTest('<menclose notation="left"><mi>a</mi></menclose>',
                       'barre verticale a', 'default');
};


/**
 * Test for general enclose rightbar
 */
sre.MmlcloudFrenchTest.prototype.testEncloseRightbar = function() {
  this.executeRuleTest('<menclose notation="right"><mi>a</mi></menclose>',
                       'a barre verticale', 'default');
};

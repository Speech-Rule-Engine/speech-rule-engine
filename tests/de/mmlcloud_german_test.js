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
  this.semantics = true;

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
sre.MmlcloudGermanTest.prototype.testBinomialFromFrac = function() {
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
  this.executeRuleTest(mml, 'barre verticale a double ligne verticale', 'default');
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
sre.MmlcloudGermanTest.prototype.testNegativeVulgarFraction = function() {
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
sre.MmlcloudGermanTest.prototype.testTrivialStuff = function() {
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
sre.MmlcloudGermanTest.prototype.testGermanFonts = function() {
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
sre.MmlcloudGermanTest.prototype.testOtherFonts = function() {
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
sre.MmlcloudGermanTest.prototype.testNonalphaIdentifier = function() {
  var mml = '<mi>30°</mi>';
  this.executeRuleTest(mml, '30 degrés', 'default');
  this.executeRuleTest(mml, '30 degrés', 'brief');
  this.executeRuleTest(mml, '30 degrés', 'sbrief');
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
sre.MmlcloudGermanTest.prototype.testParenSuper = function() {
  var mml = '<mo>(</mo><mi>a</mi><msup><mo>)</mo><mn>2</mn></msup>';
  this.executeRuleTest(mml, 'parenthèse gauche a parenthèse droite au carré', 'default');
  this.executeRuleTest(mml, 'parenthèse gauche a parenthèse droite au carré', 'brief');
  this.executeRuleTest(mml, 'parenthèse gauche a parenthèse droite au carré', 'sbrief');
};


/**
 * Testing Parenthesis with convoluted operator.
 * Simplified test case for expression 98.
 */
sre.MmlcloudGermanTest.prototype.testParenConvoluted = function() {
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
sre.MmlcloudGermanTest.prototype.testSupBaseRelseq = function() {
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
sre.MmlcloudGermanTest.prototype.testSupBaseMultirel = function() {
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
sre.MmlcloudGermanTest.prototype.testSubBaseRelseq = function() {
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
sre.MmlcloudGermanTest.prototype.testSubBaseMultirel = function() {
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
sre.MmlcloudGermanTest.prototype.testSubSuperBaseRelseq = function() {
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
sre.MmlcloudGermanTest.prototype.testSubSuperBaseMultirel = function() {
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
sre.MmlcloudGermanTest.prototype.testSquareWithText = function() {
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
sre.MmlcloudGermanTest.prototype.testFootnoteWithText = function() {
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
sre.MmlcloudGermanTest.prototype.testFootnoteWithSimpleText = function() {
  var mml = '<msup><mtext>area&#x00A0;of&#x00A0;triangle</mtext>' +
      '<mn>2</mn></msup>';
  this.executeRuleTest(mml, '', 'default');
  this.executeRuleTest(mml, '', 'brief');
  this.executeRuleTest(mml, '', 'sbrief');
};


/**
 * Tests multiline tables.
 */
sre.MmlcloudGermanTest.prototype.testMultiline = function() {
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
sre.MmlcloudGermanTest.prototype.testRelationsWithEmpty = function() {
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
sre.MmlcloudGermanTest.prototype.testLabelledRow = function() {
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
sre.MmlcloudGermanTest.prototype.testLabelledLine = function() {
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
sre.MmlcloudGermanTest.prototype.testLabelledEmptyLine = function() {
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
sre.MmlcloudGermanTest.prototype.testEmptyLine = function() {
  var mml = '<mtable><mtr><mtd></mtd></mtr></mtable>';
  this.executeRuleTest(mml, 'début tableau 1re rangée  vide fin tableau', 'default');
  this.executeRuleTest(mml, 'début tableau 1re rangée  vide fin tableau', 'brief');
  this.executeRuleTest(mml, 'tableau 1re rangée  vide fin tableau', 'sbrief');
};


/**
 * Tests for empty lines with labels.
 */
sre.MmlcloudGermanTest.prototype.testTextLabelledLine = function() {
  var mml = '<mtable><mlabeledtr><mtd><mtext>(1)</mtext></mtd>' +
      '<mtd><mi>a</mi></mtd></mlabeledtr></mtable>';
  this.executeRuleTest(mml, 'début tableau 1re rangée  avec etiquette parenthèse gauche 1 parenthèse droite fin etiquette a fin tableau', 'default');
  this.executeRuleTest(mml, 'début tableau 1re rangée  etiquette parenthèse gauche 1 parenthèse droite a fin tableau', 'brief');
  this.executeRuleTest(mml, 'tableau 1re rangée  etiquette 1 a fin tableau', 'sbrief');
};


/**
 * Test for general enclose.
 */
sre.MmlcloudGermanTest.prototype.testEncloseGeneral = function() {
  this.executeRuleTest('<menclose notation="circle"><mi>a</mi></menclose>',
                       '', 'default');
};


/**
 * Test for general enclose overbar
 */
sre.MmlcloudGermanTest.prototype.testEncloseOverbar = function() {
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
sre.MmlcloudGermanTest.prototype.testEncloseUnderbar = function() {
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
sre.MmlcloudGermanTest.prototype.testEncloseLeftbar = function() {
  this.executeRuleTest('<menclose notation="left"><mi>a</mi></menclose>',
                       'barre verticale a', 'default');
};


/**
 * Test for general enclose rightbar
 */
sre.MmlcloudGermanTest.prototype.testEncloseRightbar = function() {
  this.executeRuleTest('<menclose notation="right"><mi>a</mi></menclose>',
                       'a barre verticale', 'default');
};

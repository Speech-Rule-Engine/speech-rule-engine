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
 * @fileoverview Testcases for math node functions.
 * @author sorge@google.com (Volker Sorge)
 */

goog.provide('sre.MathmlRuleTest');

goog.require('sre.AbstractRuleTest');



/**
 * @constructor
 * @extends {sre.AbstractRuleTest}
 */
sre.MathmlRuleTest = function() {
  sre.MathmlRuleTest.base(this, 'constructor');

  /**
   * @override
   */
  this.information = 'Mathml rule tests.';

  /**
   * @override
   */
  this.semantics = false;

};
goog.inherits(sre.MathmlRuleTest, sre.AbstractRuleTest);


/**
 * Test MathML rules for space elements.
 * @export
 */
sre.MathmlRuleTest.prototype.testMathmlEmpty = function() {
  this.executeRuleTest('<mspace depth="40px"/>', '');
  this.executeRuleTest(
      '<mstyle displaystyle="true"><mn>1</mn></mstyle>', 'digit one');
  this.executeRuleTest(
      '<mpadded height="+150px"><mn>1</mn></mpadded>', 'digit one');
  this.executeRuleTest('<merror><mn>1</mn></merror>', 'digit one');
  this.executeRuleTest('<mphantom><mn>1</mn></mphantom>', 'digit one');
};


/**
 * Test MathML rules for simple token elements.
 * @export
 */
sre.MathmlRuleTest.prototype.testMathmlToken = function() {
  this.executeRuleTest('<mi>x</mi>', 'latin small letter x');
  this.executeRuleTest('<mi mathvariant="normal" class="MathML-Unit">km</mi>',
                       'kilometers');
  this.executeRuleTest('<mn>1</mn>', 'digit one');
  this.executeRuleTest('<mo>+</mo>', 'plus sign');
  this.executeRuleTest('<mtext>therefore we have</mtext>', 'therefore we have');
  this.executeRuleTest('<ms>therefore we have</ms>',
                       'string therefore we have');
};


/**
 * Test MathML rules for token elements involving font declarations.
 * @export
 */
sre.MathmlRuleTest.prototype.testMathmlFont = function() {

  this.executeRuleTest('<mi mathvariant="normal">N</mi>',
                       'latin capital letter n');
  this.executeRuleTest('<mi mathvariant="double-struck">N</mi>',
                       'double-struck latin capital letter n');

  this.executeRuleTest('<mn mathvariant="normal">1</mn>',
                       'digit one');
  this.executeRuleTest('<mn mathvariant="fraktur">1</mn>',
                       'fraktur digit one');

  this.executeRuleTest('<mo mathvariant="normal">+</mo>',
                       'plus sign');
  this.executeRuleTest('<mo mathvariant="monospace">+</mo>',
                       'monospace plus sign');

  this.executeRuleTest(
      '<mtext mathvariant="normal">therefore we have</mtext>',
      'therefore we have');
  this.executeRuleTest(
      '<mtext mathvariant="bold">therefore we have</mtext>',
      'begin bold therefore we have end bold');
};


/**
 * Test MathML rules for script elements.
 * @export
 */
sre.MathmlRuleTest.prototype.testMathmlScript = function() {

  this.executeRuleTest('<msup><mi>R</mi><mi>n</mi></msup>',
                       'latin capital letter r super latin small letter n');
  this.executeRuleTest('<msub><mi>Z</mi><mi>n</mi></msub>',
                       'latin capital letter z sub latin small letter n');
  this.executeRuleTest(
      '<msubsup><mi>Z</mi><mi>n</mi><mi>r</mi></msubsup>',
      'latin capital letter z sub latin small letter n super latin small' +
      ' letter r');
  this.executeRuleTest(
      '<munder><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow>' +
      '<mo>&#x23DF;</mo></munder>',
      'bottom curly bracket under latin small letter x plus sign latin small' +
      ' letter y');
  this.executeRuleTest(
      '<mover><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow>' +
      '<mo>&#x23DE;</mo></mover>',
      'top curly bracket over latin small letter x plus sign latin small' +
      ' letter y');
  this.executeRuleTest(
      '<munderover><mo>&#x222B;</mo><mn>0</mn><mi>&#x221E;</mi></munderover>',
      'digit zero under and infinity over integral');
};


/**
 * Test MathML rules for layout elements.
 * @export
 */
sre.MathmlRuleTest.prototype.testMathmlLayout = function() {
  this.executeRuleTest('<mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow>',
                       'latin small letter x plus sign latin small letter y');
  this.executeRuleTest('<msqrt><mi>x</mi></msqrt>',
                       'Square root of latin small letter x');
  this.executeRuleTest('<mroot><mi>x</mi><mn>3</mn></mroot>',
                       'root of order digit three of latin small letter x');
  this.executeRuleTest('<mfrac><mn>1</mn><mi>n</mi></mfrac>',
                       'digit one divided by latin small letter n');
};


/**
 * Test MathML specialist rules for square, cube, etc.
 * @export
 */
sre.MathmlRuleTest.prototype.testMathmlSpecialization = function() {

  this.executeRuleTest('<msup><mi>Z</mi><mn>2</mn></msup>',
                       'latin capital letter z square');
  this.executeRuleTest(
      '<msup><mi>Z</mi><mrow><mn>2</mn></mrow></msup>',
      'latin capital letter z square');

  this.executeRuleTest('<msup><mi>Z</mi><mn>3</mn></msup>',
                       'latin capital letter z cube');
  this.executeRuleTest(
      '<msup><mi>Z</mi><mrow><mn>3</mn></mrow></msup>',
      'latin capital letter z cube');

  this.executeRuleTest(
      '<msubsup><mi>Z</mi><mi>n</mi><mn>2</mn></msubsup>',
      'latin capital letter z sub latin small letter n square');
  this.executeRuleTest(
      '<msubsup><mi>Z</mi><mi>n</mi><mrow><mn>2</mn></mrow></msubsup>',
      'latin capital letter z sub latin small letter n square');

  this.executeRuleTest(
      '<msubsup><mi>Z</mi><mi>n</mi><mn>3</mn></msubsup>',
      'latin capital letter z sub latin small letter n cube');
  this.executeRuleTest(
      '<msubsup><mi>Z</mi><mi>n</mi><mrow><mn>3</mn></mrow></msubsup>',
      'latin capital letter z sub latin small letter n cube');

};


/**
 * Test MathML rules involving mfenced expressions.
 * @export
 */
sre.MathmlRuleTest.prototype.testMathmlMfencedSingleSep = function() {
  this.executeRuleTest(
      '<mfenced open="{" close="}" separators=";"><mi>a</mi><mi>b</mi>' +
      '<mi>c</mi><mi>d</mi><mi>e</mi></mfenced>',
      'left curly bracket latin small letter a semicolon latin small letter b' +
      ' semicolon latin small letter c semicolon latin small letter d' +
      ' semicolon latin small letter e right curly bracket');
  this.executeRuleTest(
      '<mfenced close="}" separators=";"><mi>a</mi><mi>b</mi>' +
      '<mi>c</mi><mi>d</mi><mi>e</mi></mfenced>',
      'left parenthesis latin small letter a semicolon latin small letter b' +
      ' semicolon latin small letter c semicolon latin small letter d' +
      ' semicolon latin small letter e right curly bracket');
  this.executeRuleTest(
      '<mfenced separators=";"><mi>a</mi><mi>b</mi>' +
      '<mi>c</mi><mi>d</mi><mi>e</mi></mfenced>',
      'left parenthesis latin small letter a semicolon latin small letter b' +
      ' semicolon latin small letter c semicolon latin small letter d' +
      ' semicolon latin small letter e right parenthesis');
  this.executeRuleTest(
      '<mfenced open="{" separators=";"><mi>a</mi><mi>b</mi>' +
      '<mi>c</mi><mi>d</mi><mi>e</mi></mfenced>',
      'left curly bracket latin small letter a semicolon latin small letter b' +
      ' semicolon latin small letter c semicolon latin small letter d' +
      ' semicolon latin small letter e right parenthesis');
};


/**
 * Test MathML rules involving mfenced expressions.
 * @export
 */
sre.MathmlRuleTest.prototype.testMathmlMfencedSpaceSep = function() {
  this.executeRuleTest(
      '<mfenced open="{" close="}" separators=" "><mi>a</mi><mi>b</mi>' +
      '<mi>c</mi><mi>d</mi><mi>e</mi></mfenced>',
      'left curly bracket latin small letter a latin small letter b latin' +
      ' small letter c latin small letter d latin small letter e right' +
      ' curly bracket');
  this.executeRuleTest(
      '<mfenced close="}" separators=" "><mi>a</mi><mi>b</mi>' +
      '<mi>c</mi><mi>d</mi><mi>e</mi></mfenced>',
      'left parenthesis latin small letter a latin small letter b latin small' +
      ' letter c latin small letter d latin small letter e right curly' +
      ' bracket');
  this.executeRuleTest(
      '<mfenced open="{" separators=" "><mi>a</mi><mi>b</mi>' +
      '<mi>c</mi><mi>d</mi><mi>e</mi></mfenced>',
      'left curly bracket latin small letter a latin small letter b latin' +
      ' small letter c latin small letter d latin small letter e right' +
      ' parenthesis');
  this.executeRuleTest(
      '<mfenced separators=" "><mi>a</mi><mi>b</mi>' +
      '<mi>c</mi><mi>d</mi><mi>e</mi></mfenced>',
      'left parenthesis latin small letter a latin small letter b latin small' +
      ' letter c latin small letter d latin small letter e right parenthesis');
};


/**
 * Test MathML rules involving mfenced expressions.
 * @export
 */
sre.MathmlRuleTest.prototype.testMathmlMfencedEmptySep = function() {
  this.executeRuleTest(
      '<mfenced open="{" close="}" separators=""><mi>a</mi><mi>b</mi>' +
      '<mi>c</mi><mi>d</mi><mi>e</mi></mfenced>',
      'left curly bracket latin small letter a latin small letter b latin' +
      ' small letter c latin small letter d latin small letter e right' +
      ' curly bracket');
  this.executeRuleTest(
      '<mfenced close="}" separators=""><mi>a</mi><mi>b</mi>' +
      '<mi>c</mi><mi>d</mi><mi>e</mi></mfenced>',
      'left parenthesis latin small letter a latin small letter b latin small' +
      ' letter c latin small letter d latin small letter e right curly' +
      ' bracket');
  this.executeRuleTest(
      '<mfenced open="{" separators=""><mi>a</mi><mi>b</mi>' +
      '<mi>c</mi><mi>d</mi><mi>e</mi></mfenced>',
      'left curly bracket latin small letter a latin small letter b latin' +
      ' small letter c latin small letter d latin small letter e right' +
      ' parenthesis');
  this.executeRuleTest(
      '<mfenced separators=""><mi>a</mi><mi>b</mi>' +
      '<mi>c</mi><mi>d</mi><mi>e</mi></mfenced>',
      'left parenthesis latin small letter a latin small letter b latin small' +
      ' letter c latin small letter d latin small letter e right parenthesis');
};


/**
 * Test MathML rules involving mfenced expressions.
 * @export
 */
sre.MathmlRuleTest.prototype.testMathmlMfencedNoSep = function() {
  this.executeRuleTest(
      '<mfenced open="{" close="}"><mi>a</mi><mi>b</mi>' +
      '<mi>c</mi><mi>d</mi><mi>e</mi></mfenced>',
      'left curly bracket latin small letter a comma latin small letter b' +
      ' comma latin small letter c comma latin small letter d comma latin' +
      ' small letter e right curly bracket');
  this.executeRuleTest(
      '<mfenced close="}"><mi>a</mi><mi>b</mi>' +
      '<mi>c</mi><mi>d</mi><mi>e</mi></mfenced>',
      'left parenthesis latin small letter a comma latin small letter b comma' +
      ' latin small letter c comma latin small letter d comma latin small' +
      ' letter e right curly bracket');
  this.executeRuleTest(
      '<mfenced open="{"><mi>a</mi><mi>b</mi>' +
      '<mi>c</mi><mi>d</mi><mi>e</mi></mfenced>',
      'left curly bracket latin small letter a comma latin small letter b' +
      ' comma latin small letter c comma latin small letter d comma latin' +
      ' small letter e right parenthesis');
  this.executeRuleTest(
      '<mfenced><mi>a</mi><mi>b</mi>' +
      '<mi>c</mi><mi>d</mi><mi>e</mi></mfenced>',
      'left parenthesis latin small letter a comma latin small letter b comma' +
      ' latin small letter c comma latin small letter d comma latin small' +
      ' letter e right parenthesis');
};


/**
 * Test MathML rules involving mfenced expressions.
 * @export
 */
sre.MathmlRuleTest.prototype.testMathmlMfencedMultipleSep = function() {
  this.executeRuleTest(
      '<mfenced open="{" close="}" separators=";;,"><mi>a</mi><mi>b</mi>' +
      '<mi>c</mi><mi>d</mi><mi>e</mi></mfenced>',
      'left curly bracket latin small letter a semicolon latin small letter b' +
      ' semicolon latin small letter c comma latin small letter d comma' +
      ' latin small letter e right curly bracket');
  this.executeRuleTest(
      '<mfenced close="}" separators=";;,"><mi>a</mi><mi>b</mi>' +
      '<mi>c</mi><mi>d</mi><mi>e</mi></mfenced>',
      'left parenthesis latin small letter a semicolon latin small letter b' +
      ' semicolon latin small letter c comma latin small letter d comma' +
      ' latin small letter e right curly bracket');
  this.executeRuleTest(
      '<mfenced open="{" separators=";;,"><mi>a</mi><mi>b</mi>' +
      '<mi>c</mi><mi>d</mi><mi>e</mi></mfenced>',
      'left curly bracket latin small letter a semicolon latin small letter b' +
      ' semicolon latin small letter c comma latin small letter d comma' +
      ' latin small letter e right parenthesis');
  this.executeRuleTest(
      '<mfenced separators=";;,"><mi>a</mi><mi>b</mi>' +
      '<mi>c</mi><mi>d</mi><mi>e</mi></mfenced>',
      'left parenthesis latin small letter a semicolon latin small letter b' +
      ' semicolon latin small letter c comma latin small letter d comma' +
      ' latin small letter e right parenthesis');
};


/**
 * Test MathML rules involving matrix expressions.
 * @export
 */
sre.MathmlRuleTest.prototype.testMathmlMtable = function() {

  this.executeRuleTest(
      '<mtable><mtr><mtd><mi>A</mi></mtd><mtd><mi>B</mi></mtd></mtr>' +
      '<mtr><mtd><mi>C</mi></mtd><mtd><mi>D</mi></mtd></mtr></mtable>',
      'matrix row 1column 1 latin capital letter a column 2 latin capital' +
      ' letter b row 2column 1 latin capital letter c column 2 latin' +
      ' capital letter d');
  this.executeRuleTest(
      '<mtr><mtd><mi>A</mi></mtd><mtd><mi>B</mi></mtd></mtr>',
      'column 1 latin capital letter a column 2 latin capital letter b');
  this.executeRuleTest('<mtd><mi>A</mi></mtd>',
                       'latin capital letter a');
};


/**
 * Test MathML rules involving mmultiscripts expressions.
 * @export
 */
sre.MathmlRuleTest.prototype.testMathmlMultiscript = function() {

  this.executeRuleTest(
      '<mmultiscripts><mi>A</mi><mn>1</mn><mn>2</mn>' +
          '<mprescripts/><mn>3</mn><mn>4</mn></mmultiscripts>',
      'latin capital letter a left sub digit three left super digit four' +
      ' right sub digit one right super digit two');

  this.executeRuleTest(
      '<mmultiscripts><mi>A</mi><none/><mn>2</mn>' +
          '<mprescripts/><mn>3</mn><mn>4</mn></mmultiscripts>',
      'latin capital letter a left sub digit three left super digit four' +
      ' right super digit two');
  this.executeRuleTest(
      '<mmultiscripts><mi>A</mi><mn>1</mn><none/>' +
          '<mprescripts/><mn>3</mn><mn>4</mn></mmultiscripts>',
      'latin capital letter a left sub digit three left super digit four' +
      ' right sub digit one');
  this.executeRuleTest(
      '<mmultiscripts><mi>A</mi><mn>1</mn><mn>2</mn>' +
          '<mprescripts/><none/><mn>4</mn></mmultiscripts>',
      'latin capital letter a left super digit four right sub digit one' +
      ' right super digit two');
  this.executeRuleTest(
      '<mmultiscripts><mi>A</mi><mn>1</mn><mn>2</mn>' +
          '<mprescripts/><mn>3</mn><none/></mmultiscripts>',
      'latin capital letter a left sub digit three right sub digit one' +
      ' right super digit two');

  this.executeRuleTest(
      '<mmultiscripts><mi>A</mi><none/><none/>' +
          '<mprescripts/><mn>3</mn><mn>4</mn></mmultiscripts>',
      'latin capital letter a left sub digit three left super digit four');

  this.executeRuleTest(
      '<mmultiscripts><mi>A</mi><none/><none/>' +
          '<mprescripts/><none/><mn>4</mn></mmultiscripts>',
      'latin capital letter a left super digit four');
  this.executeRuleTest(
      '<mmultiscripts><mi>A</mi><none/><none/>' +
          '<mprescripts/><mn>3</mn><none/></mmultiscripts>',
      'latin capital letter a left sub digit three');
};

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
      '<mstyle displaystyle="true"><mn>1</mn></mstyle>', 'one');
  this.executeRuleTest(
      '<mpadded height="+150px"><mn>1</mn></mpadded>', 'one');
  this.executeRuleTest('<merror><mn>1</mn></merror>', 'one');
  this.executeRuleTest('<mphantom><mn>1</mn></mphantom>', 'one');
};


/**
 * Test MathML rules for simple token elements.
 * @export
 */
sre.MathmlRuleTest.prototype.testMathmlToken = function() {
  this.executeRuleTest('<mi>x</mi>', 'x');
  this.executeRuleTest('<mi mathvariant="normal" class="MathML-Unit">km</mi>',
                       'kilometer');
  this.executeRuleTest('<mn>1</mn>', 'one');
  this.executeRuleTest('<mo>+</mo>', 'plus');
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
                       'cap N');
  this.executeRuleTest('<mi mathvariant="double-struck">N</mi>',
                       'double-struck cap N');

  this.executeRuleTest('<mn mathvariant="normal">1</mn>',
                       'one');
  this.executeRuleTest('<mn mathvariant="fraktur">1</mn>',
                       'fraktur one');

  this.executeRuleTest('<mo mathvariant="normal">+</mo>',
                       'plus');
  this.executeRuleTest('<mo mathvariant="monospace">+</mo>',
                       'monospace plus');

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
                       'cap R super n');
  this.executeRuleTest('<msub><mi>Z</mi><mi>n</mi></msub>',
                       'cap Z sub n');
  this.executeRuleTest(
      '<msubsup><mi>Z</mi><mi>n</mi><mi>r</mi></msubsup>',
      'cap Z sub n super r');
  this.executeRuleTest(
      '<munder><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow>' +
      '<mo>&#x23DF;</mo></munder>',
      'bottom brace under x plus y');
  this.executeRuleTest(
      '<mover><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow>' +
      '<mo>&#x23DE;</mo></mover>',
      'top brace over x plus y');
  this.executeRuleTest(
      '<munderover><mo>&#x222B;</mo><mn>0</mn><mi>&#x221E;</mi></munderover>',
      'zero under and infinity over integral');
};


/**
 * Test MathML rules for layout elements.
 * @export
 */
sre.MathmlRuleTest.prototype.testMathmlLayout = function() {
  this.executeRuleTest('<mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow>',
                       'x plus y');
  this.executeRuleTest('<msqrt><mi>x</mi></msqrt>',
                       'Square root of x');
  this.executeRuleTest('<mroot><mi>x</mi><mn>3</mn></mroot>',
                       'root of order three of x');
  this.executeRuleTest('<mfrac><mn>1</mn><mi>n</mi></mfrac>',
                       'one divided by n');
};


/**
 * Test MathML specialist rules for square, cube, etc.
 * @export
 */
sre.MathmlRuleTest.prototype.testMathmlSpecialization = function() {

  this.executeRuleTest('<msup><mi>Z</mi><mn>2</mn></msup>',
                       'cap Z square');
  this.executeRuleTest(
      '<msup><mi>Z</mi><mrow><mn>2</mn></mrow></msup>',
      'cap Z square');

  this.executeRuleTest('<msup><mi>Z</mi><mn>3</mn></msup>',
                       'cap Z cube');
  this.executeRuleTest(
      '<msup><mi>Z</mi><mrow><mn>3</mn></mrow></msup>',
      'cap Z cube');

  this.executeRuleTest(
      '<msubsup><mi>Z</mi><mi>n</mi><mn>2</mn></msubsup>',
      'cap Z sub n square');
  this.executeRuleTest(
      '<msubsup><mi>Z</mi><mi>n</mi><mrow><mn>2</mn></mrow></msubsup>',
      'cap Z sub n square');

  this.executeRuleTest(
      '<msubsup><mi>Z</mi><mi>n</mi><mn>3</mn></msubsup>',
      'cap Z sub n cube');
  this.executeRuleTest(
      '<msubsup><mi>Z</mi><mi>n</mi><mrow><mn>3</mn></mrow></msubsup>',
      'cap Z sub n cube');

};


/**
 * Test MathML rules involving mfenced expressions.
 * @export
 */
sre.MathmlRuleTest.prototype.testMathmlMfencedSingleSep = function() {
  this.executeRuleTest(
      '<mfenced open="{" close="}" separators=";"><mi>a</mi><mi>b</mi>' +
      '<mi>c</mi><mi>d</mi><mi>e</mi></mfenced>',
      'left brace a semicolon b semicolon c semicolon d semicolon e right' +
      ' brace');
  this.executeRuleTest(
      '<mfenced close="}" separators=";"><mi>a</mi><mi>b</mi>' +
      '<mi>c</mi><mi>d</mi><mi>e</mi></mfenced>',
      'left parenthesis a semicolon b semicolon c semicolon d semicolon e' +
      ' right brace');
  this.executeRuleTest(
      '<mfenced separators=";"><mi>a</mi><mi>b</mi>' +
      '<mi>c</mi><mi>d</mi><mi>e</mi></mfenced>',
      'left parenthesis a semicolon b semicolon c semicolon d semicolon e' +
      ' right parenthesis');
  this.executeRuleTest(
      '<mfenced open="{" separators=";"><mi>a</mi><mi>b</mi>' +
      '<mi>c</mi><mi>d</mi><mi>e</mi></mfenced>',
      'left brace a semicolon b semicolon c semicolon d semicolon e right' +
      ' parenthesis');
};


/**
 * Test MathML rules involving mfenced expressions.
 * @export
 */
sre.MathmlRuleTest.prototype.testMathmlMfencedSpaceSep = function() {
  this.executeRuleTest(
      '<mfenced open="{" close="}" separators=" "><mi>a</mi><mi>b</mi>' +
      '<mi>c</mi><mi>d</mi><mi>e</mi></mfenced>',
      'left brace a b c d e right brace');
  this.executeRuleTest(
      '<mfenced close="}" separators=" "><mi>a</mi><mi>b</mi>' +
      '<mi>c</mi><mi>d</mi><mi>e</mi></mfenced>',
      'left parenthesis a b c d e right brace');
  this.executeRuleTest(
      '<mfenced open="{" separators=" "><mi>a</mi><mi>b</mi>' +
      '<mi>c</mi><mi>d</mi><mi>e</mi></mfenced>',
      'left brace a b c d e right parenthesis');
  this.executeRuleTest(
      '<mfenced separators=" "><mi>a</mi><mi>b</mi>' +
      '<mi>c</mi><mi>d</mi><mi>e</mi></mfenced>',
      'left parenthesis a b c d e right parenthesis');
};


/**
 * Test MathML rules involving mfenced expressions.
 * @export
 */
sre.MathmlRuleTest.prototype.testMathmlMfencedEmptySep = function() {
  this.executeRuleTest(
      '<mfenced open="{" close="}" separators=""><mi>a</mi><mi>b</mi>' +
      '<mi>c</mi><mi>d</mi><mi>e</mi></mfenced>',
      'left brace a b c d e right brace');
  this.executeRuleTest(
      '<mfenced close="}" separators=""><mi>a</mi><mi>b</mi>' +
      '<mi>c</mi><mi>d</mi><mi>e</mi></mfenced>',
      'left parenthesis a b c d e right brace');
  this.executeRuleTest(
      '<mfenced open="{" separators=""><mi>a</mi><mi>b</mi>' +
      '<mi>c</mi><mi>d</mi><mi>e</mi></mfenced>',
      'left brace a b c d e right parenthesis');
  this.executeRuleTest(
      '<mfenced separators=""><mi>a</mi><mi>b</mi>' +
      '<mi>c</mi><mi>d</mi><mi>e</mi></mfenced>',
      'left parenthesis a b c d e right parenthesis');
};


/**
 * Test MathML rules involving mfenced expressions.
 * @export
 */
sre.MathmlRuleTest.prototype.testMathmlMfencedNoSep = function() {
  this.executeRuleTest(
      '<mfenced open="{" close="}"><mi>a</mi><mi>b</mi>' +
      '<mi>c</mi><mi>d</mi><mi>e</mi></mfenced>',
      'left brace a comma b comma c comma d comma e right brace');
  this.executeRuleTest(
      '<mfenced close="}"><mi>a</mi><mi>b</mi>' +
      '<mi>c</mi><mi>d</mi><mi>e</mi></mfenced>',
      'left parenthesis a comma b comma c comma d comma e right brace');
  this.executeRuleTest(
      '<mfenced open="{"><mi>a</mi><mi>b</mi>' +
      '<mi>c</mi><mi>d</mi><mi>e</mi></mfenced>',
      'left brace a comma b comma c comma d comma e right parenthesis');
  this.executeRuleTest(
      '<mfenced><mi>a</mi><mi>b</mi>' +
      '<mi>c</mi><mi>d</mi><mi>e</mi></mfenced>',
      'left parenthesis a comma b comma c comma d comma e right parenthesis');
};


/**
 * Test MathML rules involving mfenced expressions.
 * @export
 */
sre.MathmlRuleTest.prototype.testMathmlMfencedMultipleSep = function() {
  this.executeRuleTest(
      '<mfenced open="{" close="}" separators=";;,"><mi>a</mi><mi>b</mi>' +
      '<mi>c</mi><mi>d</mi><mi>e</mi></mfenced>',
      'left brace a semicolon b semicolon c comma d comma e right brace');
  this.executeRuleTest(
      '<mfenced close="}" separators=";;,"><mi>a</mi><mi>b</mi>' +
      '<mi>c</mi><mi>d</mi><mi>e</mi></mfenced>',
      'left parenthesis a semicolon b semicolon c comma d comma e right brace');
  this.executeRuleTest(
      '<mfenced open="{" separators=";;,"><mi>a</mi><mi>b</mi>' +
      '<mi>c</mi><mi>d</mi><mi>e</mi></mfenced>',
      'left brace a semicolon b semicolon c comma d comma e right parenthesis');
  this.executeRuleTest(
      '<mfenced separators=";;,"><mi>a</mi><mi>b</mi>' +
      '<mi>c</mi><mi>d</mi><mi>e</mi></mfenced>',
      'left parenthesis a semicolon b semicolon c comma d comma e right' +
      ' parenthesis');
};


/**
 * Test MathML rules involving matrix expressions.
 * @export
 */
sre.MathmlRuleTest.prototype.testMathmlMtable = function() {

  this.executeRuleTest(
      '<mtable><mtr><mtd><mi>A</mi></mtd><mtd><mi>B</mi></mtd></mtr>' +
      '<mtr><mtd><mi>C</mi></mtd><mtd><mi>D</mi></mtd></mtr></mtable>',
      'matrix row 1column 1 cap A column 2 cap B row 2column 1 cap C column' +
      ' 2 cap D');
  this.executeRuleTest(
      '<mtr><mtd><mi>A</mi></mtd><mtd><mi>B</mi></mtd></mtr>',
      'column 1 cap A column 2 cap B');
  this.executeRuleTest('<mtd><mi>A</mi></mtd>',
                       'cap A');
};


/**
 * Test MathML rules involving mmultiscripts expressions.
 * @export
 */
sre.MathmlRuleTest.prototype.testMathmlMultiscript = function() {

  this.executeRuleTest(
      '<mmultiscripts><mi>A</mi><mn>1</mn><mn>2</mn>' +
          '<mprescripts/><mn>3</mn><mn>4</mn></mmultiscripts>',
      'cap A left sub three left super four right sub one right super two');

  this.executeRuleTest(
      '<mmultiscripts><mi>A</mi><none/><mn>2</mn>' +
          '<mprescripts/><mn>3</mn><mn>4</mn></mmultiscripts>',
      'cap A left sub three left super four right super two');
  this.executeRuleTest(
      '<mmultiscripts><mi>A</mi><mn>1</mn><none/>' +
          '<mprescripts/><mn>3</mn><mn>4</mn></mmultiscripts>',
      'cap A left sub three left super four right sub one');
  this.executeRuleTest(
      '<mmultiscripts><mi>A</mi><mn>1</mn><mn>2</mn>' +
          '<mprescripts/><none/><mn>4</mn></mmultiscripts>',
      'cap A left super four right sub one right super two');
  this.executeRuleTest(
      '<mmultiscripts><mi>A</mi><mn>1</mn><mn>2</mn>' +
          '<mprescripts/><mn>3</mn><none/></mmultiscripts>',
      'cap A left sub three right sub one right super two');

  this.executeRuleTest(
      '<mmultiscripts><mi>A</mi><none/><none/>' +
          '<mprescripts/><mn>3</mn><mn>4</mn></mmultiscripts>',
      'cap A left sub three left super four');

  this.executeRuleTest(
      '<mmultiscripts><mi>A</mi><none/><none/>' +
          '<mprescripts/><none/><mn>4</mn></mmultiscripts>',
      'cap A left super four');
  this.executeRuleTest(
      '<mmultiscripts><mi>A</mi><none/><none/>' +
          '<mprescripts/><mn>3</mn><none/></mmultiscripts>',
      'cap A left sub three');
};

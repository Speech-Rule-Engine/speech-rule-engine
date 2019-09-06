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

goog.provide('sre.MathmlStoreTest');

goog.require('sre.AbstractTest');
goog.require('sre.DomUtil');
goog.require('sre.DynamicCstr');
goog.require('sre.MathmlStore');
goog.require('sre.MathmlStoreRules');



/**
 * @constructor
 * @extends {sre.AbstractTest}
 */
sre.MathmlStoreTest = function() {
  sre.MathmlStoreTest.base(this, 'constructor');

  /**
   * @override
   */
  this.information = 'Mathml store tests.';

  this.cstr =
      new sre.DynamicCstr({locale: 'en', modality: 'speech',
        domain: 'default', style: 'default'});

  sre.Engine.getInstance().comparator =
      new sre.DynamicCstr.DefaultComparator(
      this.cstr,
      sre.DynamicProperties.create(
      [sre.DynamicCstr.DEFAULT_VALUES[sre.DynamicCstr.Axis.LOCALE]],
      [sre.DynamicCstr.DEFAULT_VALUES[sre.DynamicCstr.Axis.MODALITY]],
      [sre.DynamicCstr.DEFAULT_VALUES[sre.DynamicCstr.Axis.DOMAIN]],
      [sre.DynamicCstr.DEFAULT_VALUES[sre.DynamicCstr.Axis.STYLE]]));
};
goog.inherits(sre.MathmlStoreTest, sre.AbstractTest);


/**
 * @override
 */
sre.MathmlStoreTest.prototype.setUpTest = function() {
  this.store = sre.MathmlStoreRules.getInstance();
  this.store.initialize();
};


/**
 * Tests if for a given html snippet the applicable rule is indeed the same
 * as the one provided.
 * @param {string} mml Snippet of a MathML expression.
 * @param {string} ruleName Key of the rule that is expected to be applied.
 */
sre.MathmlStoreTest.prototype.executeStoreTest = function(mml, ruleName) {
  var mathMl = '<math xmlns="http://www.w3.org/1998/Math/MathML">' +
          mml + '</math>';
  var node = sre.DomUtil.parseInput(mathMl);
  var rule = this.store.lookupRule(node.childNodes[0], this.cstr);
  this.assert.equal(ruleName, rule.name);
};


/**
 * Test MathML rules for space elements.
 * @export
 */
sre.MathmlStoreTest.prototype.testMathmlEmpty = function() {
  this.executeStoreTest('<mspace depth="40px"/>', 'mspace');
  this.executeStoreTest(
      '<mstyle displaystyle="true"><mn>1</mn></mstyle>', 'mstyle');
  this.executeStoreTest(
      '<mpadded height="+150px"><mn>1</mn></mpadded>', 'mpadded');
  this.executeStoreTest('<merror><mn>1</mn></merror>', 'merror');
  this.executeStoreTest('<mphantom><mn>1</mn></mphantom>', 'mphantom');
};


/**
 * Test MathML rules for simple token elements.
 * @export
 */
sre.MathmlStoreTest.prototype.testMathmlToken = function() {
  this.executeStoreTest('<mi>x</mi>', 'mi');
  this.executeStoreTest('<mi mathvariant="normal" class="MathML-Unit">km</mi>',
      'unit');
  this.executeStoreTest('<mn>1</mn>', 'mn');
  this.executeStoreTest('<mo>+</mo>', 'mo');
  this.executeStoreTest('<mtext>therefore we have</mtext>', 'mtext');
  this.executeStoreTest('<ms>therefore we have</ms>', 'ms');
};


/**
 * Test MathML rules for token elements involving font declarations.
 * @export
 */
sre.MathmlStoreTest.prototype.testMathmlFont = function() {

  this.executeStoreTest('<mi mathvariant="normal">N</mi>', 'mi');
  this.executeStoreTest('<mi mathvariant="double-struck">N</mi>', 'mi-variant');

  this.executeStoreTest('<mn mathvariant="normal">1</mn>', 'mn');
  this.executeStoreTest('<mn mathvariant="fraktur">1</mn>', 'mi-variant');

  this.executeStoreTest('<mo mathvariant="normal">+</mo>', 'mo');
  this.executeStoreTest('<mo mathvariant="monospace">+</mo>', 'mo-variant');

  this.executeStoreTest(
      '<mtext mathvariant="normal">therefore we have</mtext>', 'mtext');
  this.executeStoreTest(
      '<mtext mathvariant="bold">therefore we have</mtext>', 'mtext-variant');
};


/**
 * Test MathML rules for script elements.
 * @export
 */
sre.MathmlStoreTest.prototype.testMathmlScript = function() {

  this.executeStoreTest('<msup><mi>R</mi><mi>n</mi></msup>', 'msup');
  this.executeStoreTest('<msub><mi>Z</mi><mi>n</mi></msub>', 'msub');
  this.executeStoreTest(
      '<msubsup><mi>Z</mi><mi>n</mi><mi>r</mi></msubsup>', 'msubsup');
  this.executeStoreTest(
      '<munder><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow>' +
          '<mo>&#x23DF;</mo></munder>', 'munder');
  this.executeStoreTest(
      '<mover><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow>' +
          '<mo>&#x23DE;</mo></mover>', 'mover');
  this.executeStoreTest(
      '<munderover><mo>&#x222B;</mo><mn>0</mn><mi>&#x221E;</mi></munderover>',
      'munderover');
};


/**
 * Test MathML rules for layout elements.
 * @export
 */
sre.MathmlStoreTest.prototype.testMathmlLayout = function() {

  this.executeStoreTest('<mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow>', 'mrow');
  this.executeStoreTest('<msqrt><mi>x</mi></msqrt>', 'msqrt');
  this.executeStoreTest('<mroot><mi>x</mi><mn>3</mn></mroot>', 'mroot');
  this.executeStoreTest('<mfrac><mn>1</mn><mi>n</mi></mfrac>', 'mfrac');
};


/**
 * Test MathML specialist rules for square, cube, etc.
 * @export
 */
sre.MathmlStoreTest.prototype.testMathmlSpecialization = function() {

  this.executeStoreTest('<msup><mi>Z</mi><mn>2</mn></msup>', 'square');
  this.executeStoreTest(
      '<msup><mi>Z</mi><mrow><mn>2</mn></mrow></msup>', 'square');

  this.executeStoreTest('<msup><mi>Z</mi><mn>3</mn></msup>', 'cube');
  this.executeStoreTest(
      '<msup><mi>Z</mi><mrow><mn>3</mn></mrow></msup>', 'cube');

  this.executeStoreTest(
      '<msubsup><mi>Z</mi><mi>n</mi><mn>2</mn></msubsup>', 'square-sub');
  this.executeStoreTest(
      '<msubsup><mi>Z</mi><mi>n</mi><mrow><mn>2</mn></mrow></msubsup>',
      'square-sub');

  this.executeStoreTest(
      '<msubsup><mi>Z</mi><mi>n</mi><mn>3</mn></msubsup>', 'cube-sub');
  this.executeStoreTest(
      '<msubsup><mi>Z</mi><mi>n</mi><mrow><mn>3</mn></mrow></msubsup>',
      'cube-sub');

};


/**
 * Test MathML rules involving mfenced expressions.
 * @export
 */
sre.MathmlStoreTest.prototype.testMathmlMfencedSingleSep = function() {
  this.executeStoreTest(
      '<mfenced open="{" close="}" separators=";"><mi>a</mi><mi>b</mi>' +
      '<mi>c</mi><mi>d</mi><mi>e</mi></mfenced>', 'mfenced-single');
  this.executeStoreTest(
      '<mfenced close="}" separators=";"><mi>a</mi><mi>b</mi>' +
      '<mi>c</mi><mi>d</mi><mi>e</mi></mfenced>', 'mfenced-single');
  this.executeStoreTest(
      '<mfenced open="{" close="}" separators=";"><mi>a</mi><mi>b</mi>' +
      '<mi>c</mi><mi>d</mi><mi>e</mi></mfenced>', 'mfenced-single');
  this.executeStoreTest(
      '<mfenced close="}" separators=";"><mi>a</mi><mi>b</mi>' +
      '<mi>c</mi><mi>d</mi><mi>e</mi></mfenced>', 'mfenced-single');
};


/**
 * Test MathML rules involving mfenced expressions.
 * @export
 */
sre.MathmlStoreTest.prototype.testMathmlMfencedSpaceSep = function() {
  this.executeStoreTest(
      '<mfenced open="{" close="}" separators=" "><mi>a</mi><mi>b</mi>' +
      '<mi>c</mi><mi>d</mi><mi>e</mi></mfenced>', 'mfenced-omit');
  this.executeStoreTest(
      '<mfenced close="}" separators=" "><mi>a</mi><mi>b</mi>' +
      '<mi>c</mi><mi>d</mi><mi>e</mi></mfenced>', 'mfenced-omit');
  this.executeStoreTest(
      '<mfenced open="{" separators=" "><mi>a</mi><mi>b</mi>' +
      '<mi>c</mi><mi>d</mi><mi>e</mi></mfenced>', 'mfenced-omit');
  this.executeStoreTest(
      '<mfenced separators=" "><mi>a</mi><mi>b</mi>' +
      '<mi>c</mi><mi>d</mi><mi>e</mi></mfenced>', 'mfenced-omit');
};


/**
 * Test MathML rules involving mfenced expressions.
 * @export
 */
sre.MathmlStoreTest.prototype.testMathmlMfencedEmptySep = function() {
  this.executeStoreTest(
      '<mfenced open="{" close="}" separators=""><mi>a</mi><mi>b</mi>' +
      '<mi>c</mi><mi>d</mi><mi>e</mi></mfenced>', 'mfenced-omit');
  this.executeStoreTest(
      '<mfenced close="}" separators=""><mi>a</mi><mi>b</mi>' +
      '<mi>c</mi><mi>d</mi><mi>e</mi></mfenced>', 'mfenced-omit');
  this.executeStoreTest(
      '<mfenced open="{" separators=""><mi>a</mi><mi>b</mi>' +
      '<mi>c</mi><mi>d</mi><mi>e</mi></mfenced>', 'mfenced-omit');
  this.executeStoreTest(
      '<mfenced separators=""><mi>a</mi><mi>b</mi>' +
      '<mi>c</mi><mi>d</mi><mi>e</mi></mfenced>', 'mfenced-omit');
};


/**
 * Test MathML rules involving mfenced expressions.
 * @export
 */
sre.MathmlStoreTest.prototype.testMathmlMfencedNoSep = function() {
  this.executeStoreTest('<mfenced open="{" close="}"><mi>a</mi><mi>b</mi>' +
      '<mi>c</mi><mi>d</mi><mi>e</mi></mfenced>', 'mfenced-comma');
  this.executeStoreTest('<mfenced close="}"><mi>a</mi><mi>b</mi>' +
      '<mi>c</mi><mi>d</mi><mi>e</mi></mfenced>', 'mfenced-comma');
  this.executeStoreTest('<mfenced open="{"><mi>a</mi><mi>b</mi>' +
      '<mi>c</mi><mi>d</mi><mi>e</mi></mfenced>', 'mfenced-comma');
  this.executeStoreTest('<mfenced><mi>a</mi><mi>b</mi>' +
      '<mi>c</mi><mi>d</mi><mi>e</mi></mfenced>', 'mfenced-comma');
};


/**
 * Test MathML rules involving mfenced expressions.
 * @export
 */
sre.MathmlStoreTest.prototype.testMathmlMfencedMultipleSep = function() {
  this.executeStoreTest(
      '<mfenced open="{" close="}" separators=";;,"><mi>a</mi><mi>b</mi>' +
      '<mi>c</mi><mi>d</mi><mi>e</mi></mfenced>', 'mfenced-multi');
  this.executeStoreTest(
      '<mfenced close="}" separators=";;,"><mi>a</mi><mi>b</mi>' +
      '<mi>c</mi><mi>d</mi><mi>e</mi></mfenced>', 'mfenced-multi');
  this.executeStoreTest(
      '<mfenced open="{" separators=";;,"><mi>a</mi><mi>b</mi>' +
      '<mi>c</mi><mi>d</mi><mi>e</mi></mfenced>', 'mfenced-multi');
  this.executeStoreTest(
      '<mfenced separators=";;,"><mi>a</mi><mi>b</mi>' +
      '<mi>c</mi><mi>d</mi><mi>e</mi></mfenced>', 'mfenced-multi');
};


/**
 * Test MathML rules involving matrix expressions.
 * @export
 */
sre.MathmlStoreTest.prototype.testMathmlMtable = function() {

  this.executeStoreTest(
      '<mtable><mtr><mtd><mi>A</mi></mtd><mtd><mi>B</mi></mtd></mtr>' +
      '<mtr><mtd><mi>C</mi></mtd><mtd><mi>D</mi></mtd></mtr></mtable>',
      'mtable');
  this.executeStoreTest(
      '<mtr><mtd><mi>A</mi></mtd><mtd><mi>B</mi></mtd></mtr>', 'mtr');
  this.executeStoreTest('<mtd><mi>A</mi></mtd>', 'mtd');
};


/**
 * Test MathML rules involving mmultiscripts expressions.
 * @export
 */
sre.MathmlStoreTest.prototype.testMathmlMultiscript = function() {

  this.executeStoreTest(
      '<mmultiscripts><mi>A</mi><mn>1</mn><mn>2</mn>' +
          '<mprescripts/><mn>3</mn><mn>4</mn></mmultiscripts>',
      'mmultiscripts-4');

  this.executeStoreTest(
      '<mmultiscripts><mi>A</mi><none/><mn>2</mn>' +
          '<mprescripts/><mn>3</mn><mn>4</mn></mmultiscripts>',
      'mmultiscripts-3-1');
  this.executeStoreTest(
      '<mmultiscripts><mi>A</mi><mn>1</mn><none/>' +
          '<mprescripts/><mn>3</mn><mn>4</mn></mmultiscripts>',
      'mmultiscripts-3-2');
  this.executeStoreTest(
      '<mmultiscripts><mi>A</mi><mn>1</mn><mn>2</mn>' +
          '<mprescripts/><none/><mn>4</mn></mmultiscripts>',
      'mmultiscripts-3-3');
  this.executeStoreTest(
      '<mmultiscripts><mi>A</mi><mn>1</mn><mn>2</mn>' +
          '<mprescripts/><mn>3</mn><none/></mmultiscripts>',
      'mmultiscripts-3-4');

  this.executeStoreTest(
      '<mmultiscripts><mi>A</mi><none/><none/>' +
          '<mprescripts/><mn>3</mn><mn>4</mn></mmultiscripts>',
      'mmultiscripts-2-1');

  this.executeStoreTest(
      '<mmultiscripts><mi>A</mi><none/><none/>' +
          '<mprescripts/><none/><mn>4</mn></mmultiscripts>',
      'mmultiscripts-1-1');
  this.executeStoreTest(
      '<mmultiscripts><mi>A</mi><none/><none/>' +
          '<mprescripts/><mn>3</mn><none/></mmultiscripts>',
      'mmultiscripts-1-2');
};

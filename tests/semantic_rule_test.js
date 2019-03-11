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
 * @fileoverview Testcases for ChromeVox's semantic speech rules.
 * @author Volker.Sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.SemanticRuleTest');

goog.require('sre.AbstractRuleTest');



/**
 * @constructor
 * @extends {sre.AbstractRuleTest}
 */
sre.SemanticRuleTest = function() {
  sre.SemanticRuleTest.base(this, 'constructor');

  /**
   * @override
   */
  this.information = 'Semantic rule tests.';

  /**
   * @override
   */
  this.style = 'short';

  /**
   * @override
   */
  this.semantics = true;

  this.setActive('SemanticTreeRules');
};
goog.inherits(sre.SemanticRuleTest, sre.AbstractRuleTest);


/**
 * Testing rules for singleton units.
 */
sre.SemanticRuleTest.prototype.testUnitsSingle = function() {
  this.executeRuleTest(
      '<mi mathvariant="normal" class="MathML-Unit">km</mi>',
      'kilometers'
  );
  this.executeRuleTest(
      '<mi mathvariant="normal" class="MathML-Unit">A</mi>',
      'amperes'
  );
  this.executeRuleTest(
      '<mi mathvariant="normal" class="MathML-Unit">\u03A9</mi>',
      'ohms'
  );
  this.executeRuleTest(
      '<mi mathvariant="normal" class="MathML-Unit">k\u03A9</mi>',
      'kilohms'
  );
  this.executeRuleTest(
      '<mi mathvariant="normal" class="MathML-Unit">\u00B0C</mi>',
      'Celsius'
  );
};


// In the following default is the verbose version of MathSpeak.
/**
 * Testing rules for simple units.
 */
sre.SemanticRuleTest.prototype.testUnitsSimple = function() {
  this.executeRuleTest(
      '<mi>min</mi><mi mathvariant="normal" class="MathML-Unit">min</mi>',
      'min of minutes'
  );
  this.executeRuleTest(
      '<mn>3</mn><mi mathvariant="normal" class="MathML-Unit">km</mi>',
      'three times kilometers');
  this.executeRuleTest(
      '<mi mathvariant="normal" class="MathML-Unit">km</mi>' +
      '<mo>+</mo><mi mathvariant="normal" class="MathML-Unit">s</mi>',
      'kilometers plus seconds');
};


/**
 * Testing rules for units with superscript
 */
sre.SemanticRuleTest.prototype.testUnitsSuperscript = function() {
  this.executeRuleTest(
      '<msup><mi mathvariant="normal" class="MathML-Unit">km</mi>' +
      '<mn>2</mn></msup>',
      'square kilometers');
  this.executeRuleTest(
      '<msup><mi mathvariant="normal" class="MathML-Unit">m</mi>' +
      '<mn>3</mn></msup>',
      'cubic meters');
  this.executeRuleTest(
      '<msup><mi mathvariant="normal" class="MathML-Unit">km</mi>' +
      '<mn>4</mn></msup>',
      'kilometers super four');
  this.executeRuleTest(
      '<msup><mi mathvariant="normal" class="MathML-Unit">m</mi>' +
      '<mrow><mo>-</mo><mn>1</mn></mrow></msup>',
      'reciprocal meters');
  this.executeRuleTest(
      '<mi mathvariant="normal" class="MathML-Unit">s</mi>' +
      '<msup><mi mathvariant="normal" class="MathML-Unit">m</mi>' +
      '<mrow><mo>-</mo><mn>1</mn></mrow></msup>',
      'seconds per meters');
  this.executeRuleTest(
      '<msup><mfrac><mi mathvariant="normal" class="MathML-Unit">s</mi>' +
      '<mi mathvariant="normal" class="MathML-Unit">m</mi></mfrac>' +
      '<mrow><mo>-</mo><mn>1</mn></mrow></msup>',
      'seconds per meters super negative one');
  this.executeRuleTest(
      '<msup><mfrac><mi mathvariant="normal" class="MathML-Unit">s</mi>' +
      '<mi mathvariant="normal" class="MathML-Unit">m</mi></mfrac>' +
      '<mrow><mo>-</mo><mn>1</mn></mrow></msup>',
      'seconds per meters super negative one');
  this.executeRuleTest(
      '<mn>3</mn><msup><mi mathvariant="normal" class="MathML-Unit">m</mi>' +
      '<mrow><mo>-</mo><mn>1</mn></mrow></msup>',
      'three times reciprocal meters');
  this.executeRuleTest(
      '<mfrac><mi mathvariant="normal" class="MathML-Unit">km</mi>' +
      '<mi mathvariant="normal" class="MathML-Unit">h</mi></mfrac>',
      'kilometers per hours');
  this.executeRuleTest(
      '<mi mathvariant="normal" class="MathML-Unit">N</mi>' +
      '<mfrac><mi mathvariant="normal" class="MathML-Unit">km</mi>' +
      '<mi mathvariant="normal" class="MathML-Unit">h</mi></mfrac>',
      'Newtons kilometers per hours');
  this.executeRuleTest(
      '<mfrac><mi>m</mi>' +
      '<mi mathvariant="normal" class="MathML-Unit">km</mi></mfrac>',
      'm divided by kilometers');
  this.executeRuleTest(
      '<mn>3</mn><mi mathvariant="normal" class="MathML-Unit">km</mi>' +
      '<mi mathvariant="normal" class="MathML-Unit">h</mi>',
      'three times kilometers hours'
  );
};


/**
 * Tests more complex expressions containing units.
 */
sre.SemanticRuleTest.prototype.testUnitsExpressions = function() {
  this.executeRuleTest(
      '<mi mathvariant="normal" class="MathML-Unit">s</mi>' +
      '<mn>3</mn><mi>m</mi>' +
      '<mi mathvariant="normal" class="MathML-Unit">km</mi>' +
      '<mi mathvariant="normal" class="MathML-Unit">h</mi>',
      'seconds times three times m times kilometers hours'
  );
  this.executeRuleTest(
      '<mi mathvariant="normal" class="MathML-Unit">km</mi>' +
      '<msup>' +
      '<mi mathvariant="normal" class="MathML-Unit">s</mi>' +
      '<mn>2</mn></msup>' +
      '<mn>3</mn><mi>m</mi>' +
      '<mi mathvariant="normal" class="MathML-Unit">km</mi>' +
      '<mi mathvariant="normal" class="MathML-Unit">h</mi>',
      'kilometers square seconds times three times m times ' +
      'kilometers hours'
  );
  this.executeRuleTest(
      '<mn>3</mn><mi>m</mi>' +
      '<mi mathvariant="normal" class="MathML-Unit">km</mi>' +
      '<mi mathvariant="normal" class="MathML-Unit">h</mi>' +
      '<mfrac>' +
      '<mi>N</mi>' +
      '<msup>' +
      '<mi mathvariant="normal" class="MathML-Unit">s</mi>' +
      '<mn>2</mn></msup></mfrac>',
      'three times m times kilometers hours times cap n divided' +
      ' by square seconds'
  );
  this.executeRuleTest(
      '<mn>3</mn><mi>m</mi>' +
      '<mi mathvariant="normal" class="MathML-Unit">km</mi>' +
      '<mi mathvariant="normal" class="MathML-Unit">h</mi>' +
      '<mfrac>' +
      '<mi mathvariant="normal" class="MathML-Unit">N</mi>' +
      '<msup>' +
      '<mi mathvariant="normal" class="MathML-Unit">s</mi>' +
      '<mn>2</mn></msup></mfrac>',
      'three times m times kilometers hours Newtons per square seconds'
  );
};


/**
 * Tests more complex expressions containing units.
 */
sre.SemanticRuleTest.prototype.testFonts = function() {
  this.executeRuleTest('<mi>m</mi>', 'm');
  this.executeRuleTest('<mi mathvariant="normal">m</mi>', 'normal m');
  this.executeRuleTest('<mi>mi</mi>', 'mi');
  this.executeRuleTest('<mi mathvariant="italic">mi</mi>', 'italic mi');
  this.executeRuleTest('<mi>3</mi>', 'italic three');
  this.executeRuleTest('<mi>30</mi>', '30');
};


/**
 * Tests tables and layout structures.
 */
sre.SemanticRuleTest.prototype.testMultiline = function() {
  this.executeRuleTest(
      '<mtable><mtr><mtd><mi>a</mi></mtd></mtr><mtr><mtd><mi>b</mi></mtd>' +
      '</mtr></mtable>',
      'multiline equation line 1 a line 2 b');
  this.executeRuleTest(
      '<mtable><mtr><mtd><mi>a</mi></mtd><mtd><mi>c</mi></mtd></mtr>' +
      '<mtr><mtd><mi>b</mi></mtd><mtd><mi>d</mi></mtd></mtr></mtable>',
      'multiline equation row 1 a c row 2 b d');
};


/**
 * Tests for mixed numbers. MJ a11y issue #225.
 */
sre.SemanticRuleTest.prototype.testMixedNumbers = function() {
  this.executeRuleTest(
      '<mn>4</mn><mfrac><mn>1</mn><mn>3</mn></mfrac>',
      'four and one divided by three'
  );
};


/**
 * Testing the quadratic for different locales. For the base rules we generally
 * get mixed language output.
 */
sre.SemanticRuleTest.prototype.testQuadratic = function() {
  var mml = '<mrow><mi>x</mi><mo>=</mo><mfrac><mrow><mo>&#x2212;</mo>' +
      '<mi>b</mi><mo>&#xB1;</mo><msqrt><mrow><msup><mi>b</mi><mn>2</mn>' +
      '</msup><mo>&#x2212;</mo><mn>4</mn><mi>a</mi><mi>c</mi></mrow></msqrt>' +
      '</mrow><mrow><mn>2</mn><mi>a</mi></mrow></mfrac></mrow>';
  this.executeRuleTest(
      mml,
      'x equals negative b plus minus Square root of b squared minus four' +
      ' times a times c divided by two times a'
  );
  this.locale = 'es';
  this.executeRuleTest(
      mml,
      'x igual negative b más menos Square root of b squared menos four por' +
      ' a por c divided by two por a'
  );
};

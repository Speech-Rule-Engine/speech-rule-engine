// Copyright 2018 Volker Sorge
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
// Tests from the issues discovered in ClearspeakEnglish rules.
//


goog.provide('sre.ClearspeakEnglishIssues');

goog.require('sre.ClearspeakEnglishRuleTest');



/**
* @constructor
* @extends {sre.ClearspeakEnglishRuleTest}
*/
sre.ClearspeakEnglishIssues = function() {
  sre.ClearspeakEnglishIssues.base(this, 'constructor');

  /**
   * @override
   */
  this.information = 'ClearspeakEnglish Issues tests.';

};
goog.inherits(sre.ClearspeakEnglishIssues, sre.ClearspeakEnglishRuleTest);



//
// Issues
//


sre.ClearspeakEnglishIssues.prototype.testIssue230 = function() {
  var preference = 'default';
  this.executeRuleTest(
      '<mn>5</mn><mfrac><mn>3</mn><mn>224</mn></mfrac>',
      '5 and, 3 over 224', preference);
  this.executeRuleTest(
      '<mn>5</mn><mfrac><mn>3</mn><mn>4</mn></mfrac>',
      '5 and three fourths', preference);
};


sre.ClearspeakEnglishIssues.prototype.testIssueNumbers = function() {
  var preference = 'default';
  this.executeRuleTest(
      '<mrow><mn>t2e4</mn></mrow>', 'number t 2 e 4', preference);
  this.executeRuleTest(
      '<mrow><mn>#FF0000</mn></mrow>',
      'number number sign F F 0 0 0 0', preference);
  this.executeRuleTest(
      '<mrow><mn>#FFFF</mn></mrow>',
      'number number sign F F F F', preference);
};


/**
 * Tests for issue #320 and related expressions.
 */
sre.ClearspeakEnglishIssues.prototype.testIssue320 = function() {
  this.executeRuleTest(
      '<mo>∂</mo>', 'partial differential');
  this.executeRuleTest(
      '<mi>x</mi><mo>!</mo>', 'x factorial');
  this.executeRuleTest(
      '<mo>-</mo><mo>-</mo><mi>x</mi>', 'negative negative x');
  this.executeRuleTest(
      '<mo>+</mo><mo>+</mo><mi>x</mi>', 'plus plus x');
  this.executeRuleTest(
      '<mi>sin</mi><mi>sin</mi><mi>x</mi>', 'sine sine x');
  this.executeRuleTest(
      '<mo>∂</mo><mo>∂</mo><mi>x</mi>',
      'partial differential partial differential x');
  this.executeRuleTest(
      '<mrow><mrow><mo>(</mo><mfrac><msup><mo>∂</mo><mn>2</mn></msup>' +
      '<mrow><mo>∂</mo><msup><mi>x</mi><mn>2</mn></msup></mrow></mfrac>' +
      '<mo>+</mo><mfrac><msup><mo>∂</mo><mn>2</mn></msup><mrow><mo>∂</mo>' +
      '<msup><mi>y</mi><mn>2</mn></msup></mrow></mfrac><mo>)</mo></mrow>' +
      '<msup><mrow><mo minsize="150%">|</mo><mi>φ <!-- \varphi --></mi>' +
      '<mo stretchy="false">(</mo><mi>x</mi><mo>+</mo>' +
      '<mi mathvariant="normal">i</mi><mi>y</mi><mo stretchy="false">)</mo>' +
      '<mo minsize="150%">|</mo></mrow><mn>2</mn></msup><mo>=</mo>' +
      '<mn>0</mn></mrow>',
      'open paren, the fraction with numerator partial differential squared, ' +
      'and denominator partial differential x squared, plus, the ' +
      'fraction with numerator partial differential squared, and ' +
      'denominator partial differential y squared, close paren, ' +
      'times, the absolute value of phi times, open paren, x plus normal i, ' +
      'y, close paren, squared equals 0');
};

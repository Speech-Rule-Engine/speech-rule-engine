// Copyright 2015 Volker Sorge
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
 * @fileoverview Testcases for enriching mathml with semantic information.
 * @author sorge@google.com (Volker Sorge)
 */

goog.provide('sre.SemanticMathmlTest');

goog.require('sre.AbstractTest');
goog.require('sre.Semantic');



/**
 * @constructor
 * @extends {sre.AbstractTest}
 */
sre.SemanticMathmlTest = function() {
  goog.base(this);

  /**
   * @override
   */
  this.information = 'Semantic enrichment tests.';
};
goog.inherits(sre.SemanticMathmlTest, sre.AbstractTest);


/**
 * Tests if for a given mathml snippet results in a particular semantic tree.
 * @param {string} mml MathML expression.
 * @param {string} smml MathML snippet for the semantic information.
 */
sre.SemanticMathmlTest.prototype.executeMathmlTest = function(mml, smml) {
  var mathMl = '<math>' + mml + '</math>';
  var node = sre.Semantic.enrichMathml(mathMl);
  var dp = new sre.SystemExternal.xmldom.DOMParser();
  var xml = dp.parseFromString(smml);
  var xmls = new sre.SystemExternal.xmldom.XMLSerializer();
  this.assert.equal(
      sre.SemanticMathml.removeAttributePrefix(xmls.serializeToString(node)),
      xmls.serializeToString(xml));
};


// Numbers.
/**
 * Test number representations.
 */
sre.SemanticMathmlTest.prototype.testNumbers = function() {
  this.brief = false;
  this.executeMathmlTest(
      '<mn>2</mn>',
      '<math>' +
      '<mn type="number" role="integer" id="0" children="">2</mn>' +
      '</math>');
  this.executeMathmlTest(
      '<mn>2.0</mn>',
      '<math>' +
      '<mn type="number" role="float" id="0" children="">2.0</mn>' +
      '</math>');
  this.executeMathmlTest(
      '<mn>2t3</mn>',
      '<math>' +
      '<mn type="number" role="othernumber" id="0" children="">2t3</mn>' +
      '</math>');
  this.executeMathmlTest(
      '<mfrac><mn>1</mn><mn>2</mn></mfrac>',
      '<math>' +
      '<mfrac type="fraction" role="vulgar" id="2" children="0,1">' +
      '<mn type="number" role="integer" id="0" parent="2">1</mn>' +
      '<mn type="number" role="integer" id="1" parent="2">2</mn>' +
      '</mfrac>' +
      '</math>');
  this.executeMathmlTest(
      '<mfrac><mn>1</mn><mn>2.5</mn></mfrac>',
      '<math>' +
      '<mfrac type="fraction" role="division" id="2" children="0,1">' +
      '<mn type="number" role="integer" id="0" parent="2">1</mn>' +
      '<mn type="number" role="float" id="1" parent="2">2.5</mn>' +
      '</mfrac>' +
      '</math>');
};


/**
 * Test mixed number representations.
 */
sre.SemanticMathmlTest.prototype.testStreeMixedNumbers = function() {
  this.executeMathmlTest(
      '<mn>3</mn><mfrac><mn>1</mn><mn>2</mn></mfrac>',
      '<math type="number" role="mixed" id="4" children="0,3">' +
      '<mn type="number" role="integer" id="0" parent="4">3</mn>' +
      '<mfrac type="fraction" role="vulgar" id="3" children="1,2" parent="4">' +
      '<mn type="number" role="integer" id="1" parent="3">1</mn>' +
      '<mn type="number" role="integer" id="2" parent="3">2</mn>' +
      '</mfrac></math>'
  );
  this.executeMathmlTest(
      '<mfrac><mn>1</mn><mn>2</mn></mfrac><mn>3</mn>',
      '<math type="infixop" role="implicit" id="5"' +
      ' children="2,3" content="4">' +
      '<mfrac type="fraction" role="vulgar" id="2" children="0,1" parent="5">' +
      '<mn type="number" role="integer" id="0" parent="2">1</mn>' +
      '<mn type="number" role="integer" id="1" parent="2">2</mn>' +
      '</mfrac>' +
      '<mo type="operator" role="multiplication" id="4" added="true"' +
      ' operator="infixop,⁢" parent="5">⁢</mo>' +
      '<mn type="number" role="integer" id="3" parent="5">3</mn>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<mn>3.0</mn><mfrac><mn>1</mn><mn>2</mn></mfrac>',
    '<math type="infixop" role="implicit" id="5" children="0,3" content="4"><mn type="number" role="float" id="0" parent="5">3.0</mn><mo type="operator" role="multiplication" id="4" added="true" operator="infixop,⁢" parent="5">⁢</mo><mfrac type="fraction" role="vulgar" id="3" children="1,2" parent="5"><mn type="number" role="integer" id="1" parent="3">1</mn><mn type="number" role="integer" id="2" parent="3">2</mn></mfrac></math>'
  );
  this.executeMathmlTest(
      '<mfrac><mn>1</mn><mn>2</mn></mfrac><mn>3.0</mn>',
    '<math type="infixop" role="implicit" id="5" children="2,3" content="4"><mfrac type="fraction" role="vulgar" id="2" children="0,1" parent="5"><mn type="number" role="integer" id="0" parent="2">1</mn><mn type="number" role="integer" id="1" parent="2">2</mn></mfrac><mo type="operator" role="multiplication" id="4" added="true" operator="infixop,⁢" parent="5">⁢</mo><mn type="number" role="float" id="3" parent="5">3.0</mn></math>'
  );
  this.executeMathmlTest(
      '<mn>3</mn><mfrac><mn>1</mn><mn>2</mn></mfrac><mi>a</mi>',
    '<math type="infixop" role="implicit" id="7" children="5,4" content="6"><mrow type="number" role="mixed" id="5" children="0,3" parent="7"><mn type="number" role="integer" id="0" parent="5">3</mn><mfrac type="fraction" role="vulgar" id="3" children="1,2" parent="5"><mn type="number" role="integer" id="1" parent="3">1</mn><mn type="number" role="integer" id="2" parent="3">2</mn></mfrac></mrow><mo type="operator" role="multiplication" id="6" added="true" operator="infixop,⁢" parent="7">⁢</mo><mi type="identifier" role="latinletter" id="4" parent="7">a</mi></math>'
  );
  this.executeMathmlTest(
      '<mi>b</mi><mn>3</mn><mfrac><mn>1</mn><mn>2</mn></mfrac><mi>a</mi>',
    '<math type="infixop" role="implicit" id="9" children="0,6,5" content="7,8"><mi type="identifier" role="latinletter" id="0" parent="9">b</mi><mo type="operator" role="multiplication" id="7" added="true" operator="infixop,⁢" parent="9">⁢</mo><mrow type="number" role="mixed" id="6" children="1,4" parent="9"><mn type="number" role="integer" id="1" parent="6">3</mn><mfrac type="fraction" role="vulgar" id="4" children="2,3" parent="6"><mn type="number" role="integer" id="2" parent="4">1</mn><mn type="number" role="integer" id="3" parent="4">2</mn></mfrac></mrow><mo type="operator" role="multiplication" id="8" added="true" operator="infixop,⁢" parent="9">⁢</mo><mi type="identifier" role="latinletter" id="5" parent="9">a</mi></math>'
  );
};


// Relations.
/**
 * Test relation trees.
 */
sre.SemanticMathmlTest.prototype.testStreeRelations = function() {
  this.brief = true;
  this.executeMathmlTest(
      '<mo>=</mo>',
    '<math><mo type="relation" role="equality" id="0" children="">=</mo></math>'
  );
  this.executeMathmlTest(
      '<mi>a</mi><mo>=</mo><mi>b</mi>',
    '<math type="relseq" role="equality" id="3" children="0,2" content="1"><mi type="identifier" role="latinletter" id="0" parent="3">a</mi><mo type="relation" role="equality" id="1" operator="relseq,=" parent="3">=</mo><mi type="identifier" role="latinletter" id="2" parent="3">b</mi></math>'
  );
  this.executeMathmlTest(
      '<mi>a</mi><mo>=</mo><mi>b</mi><mo>=</mo><mi>c</mi>',
    '<math type="relseq" role="equality" id="5" children="0,2,4" content="1,3"><mi type="identifier" role="latinletter" id="0" parent="5">a</mi><mo type="relation" role="equality" id="1" operator="relseq,=" parent="5">=</mo><mi type="identifier" role="latinletter" id="2" parent="5">b</mi><mo type="relation" role="equality" id="3" operator="relseq,=" parent="5">=</mo><mi type="identifier" role="latinletter" id="4" parent="5">c</mi></math>'
  );
  this.executeMathmlTest(
      '<mi>a</mi><mo>=</mo><mi>b</mi><mo>=</mo><mi>c</mi>' +
          '<mo>\u2264</mo><mi>d</mi>',
    '<math type="multirel" role="unknown" id="7" children="0,2,4,6" content="1,3,5"><mi type="identifier" role="latinletter" id="0" parent="7">a</mi><mo type="relation" role="equality" id="1" operator="multirel" parent="7">=</mo><mi type="identifier" role="latinletter" id="2" parent="7">b</mi><mo type="relation" role="equality" id="3" operator="multirel" parent="7">=</mo><mi type="identifier" role="latinletter" id="4" parent="7">c</mi></math>'
  );
};


// Operators.
/**
 * Test operator trees with pre- and postfixes.
 */
sre.SemanticMathmlTest.prototype.testStreePrePostfixOperators = function() {
  this.brief = true;
  // Pathological operator only case.
  this.executeMathmlTest(
      '<mo>+</mo><mo>-</mo><mo>+</mo>',
    '<math type="prefixop" role="multiop" id="4" children="3" content="0"><mo type="operator" role="addition" id="0" operator="prefixop,+" parent="4">+</mo><mrow type="prefixop" role="negative" id="3" children="2" content="1" parent="4"><mo type="operator" role="subtraction" id="1" operator="prefixop,-" parent="3">-</mo><mo type="operator" role="addition" id="2" parent="3">+</mo></mrow></math>'
  );
  // Single identifier with prefixes.
  this.executeMathmlTest(
      '<mo>+</mo><mo>+</mo><mi>a</mi>',
    '<math type="prefixop" role="multiop" id="3" children="2" content="0,1"><mo type="operator" role="addition" id="0" operator="prefixop,+ +" parent="3">+</mo><mo type="operator" role="addition" id="1" operator="prefixop,+ +" parent="3">+</mo><mi type="identifier" role="latinletter" id="2" parent="3">a</mi></math>'
  );
  // Single identifier with prefix and negative.
  this.executeMathmlTest(
      '<mo>+</mo><mo>-</mo><mi>a</mi>',
    '<math type="prefixop" role="multiop" id="4" children="3" content="0"><mo type="operator" role="addition" id="0" operator="prefixop,+" parent="4">+</mo><mrow type="prefixop" role="negative" id="3" children="2" content="1" parent="4"><mo type="operator" role="subtraction" id="1" operator="prefixop,-" parent="3">-</mo><mi type="identifier" role="latinletter" id="2" parent="3">a</mi></mrow></math>'
  );
  // Single identifier with postfixes.
  this.executeMathmlTest(
      '<mi>a</mi><mo>+</mo><mo>-</mo>',
    '<math type="postfixop" role="multiop" id="3" children="0" content="1,2"><mi type="identifier" role="latinletter" id="0" parent="3">a</mi><mo type="operator" role="addition" id="1" operator="postfixop,+ -" parent="3">+</mo><mo type="operator" role="subtraction" id="2" operator="postfixop,+ -" parent="3">-</mo></math>'
  );
  // Single identifier with pre- and postfixes.
  this.executeMathmlTest(
      '<mo>+</mo><mo>+</mo><mi>a</mi><mo>+</mo><mo>+</mo>',
    '<math type="postfixop" role="multiop" id="6" children="5" content="3,4"><mrow type="prefixop" role="multiop" id="5" children="2" content="0,1" parent="6"><mo type="operator" role="addition" id="0" operator="prefixop,+ +" parent="5">+</mo><mo type="operator" role="addition" id="1" operator="prefixop,+ +" parent="5">+</mo><mi type="identifier" role="latinletter" id="2" parent="5">a</mi></mrow><mo type="operator" role="addition" id="3" operator="postfixop,+ +" parent="6">+</mo><mo type="operator" role="addition" id="4" operator="postfixop,+ +" parent="6">+</mo></math>'
  );
  // Single identifier with mixed pre- and postfixes.
  this.executeMathmlTest(
      '<mo>\u2213</mo><mo>+</mo><mi>a</mi><mo>\u2213</mo><mo>+</mo>',
    '<math type="postfixop" role="multiop" id="6" children="5" content="3,4"><mrow type="prefixop" role="multiop" id="5" children="2" content="0,1" parent="6"><mo type="operator" role="addition" id="0" operator="prefixop,∓ +" parent="5">∓</mo><mo type="operator" role="addition" id="1" operator="prefixop,∓ +" parent="5">+</mo><mi type="identifier" role="latinletter" id="2" parent="5">a</mi></mrow><mo type="operator" role="addition" id="3" operator="postfixop,∓ +" parent="6">∓</mo><mo type="operator" role="addition" id="4" operator="postfixop,∓ +" parent="6">+</mo></math>'
  );
  // Two identifiers with pre- and postfixes.
  this.executeMathmlTest(
      '<mo>+</mo><mo>+</mo><mi>a</mi><mo>\u2213</mo><mo>+</mo>' +
          '<mi>b</mi><mo>+</mo>',
    '<math type="infixop" role="addition" id="9" children="7,10" content="3"><mrow type="prefixop" role="multiop" id="7" children="2" content="0,1" parent="9"><mo type="operator" role="addition" id="0" operator="prefixop,+ +" parent="7">+</mo><mo type="operator" role="addition" id="1" operator="prefixop,+ +" parent="7">+</mo><mi type="identifier" role="latinletter" id="2" parent="7">a</mi></mrow><mo type="operator" role="addition" id="3" operator="infixop,∓" parent="9">∓</mo><mrow type="postfixop" role="multiop" id="10" children="8" content="6" parent="9"><mrow type="prefixop" role="multiop" id="8" children="5" content="4" parent="10"><mo type="operator" role="addition" id="4" operator="prefixop,+" parent="8">+</mo><mi type="identifier" role="latinletter" id="5" parent="8">b</mi></mrow><mo type="operator" role="addition" id="6" operator="postfixop,+" parent="10">+</mo></mrow></math>'
  );
  // Three identifiers with pre- and postfixes.
  this.executeMathmlTest(
      '<mo>+</mo><mo>+</mo><mi>a</mi><mo>\u2213</mo><mo>+</mo>' +
          '<mi>b</mi><mo>+</mo><mo>\u2213</mo><mi>c</mi><mo>+</mo>',
    '<math type="infixop" role="addition" id="14" children="12,15" content="6"><mrow type="infixop" role="addition" id="12" children="10,11" content="3" parent="14"><mrow type="prefixop" role="multiop" id="10" children="2" content="0,1" parent="12"><mo type="operator" role="addition" id="0" operator="prefixop,+ +" parent="10">+</mo><mo type="operator" role="addition" id="1" operator="prefixop,+ +" parent="10">+</mo><mi type="identifier" role="latinletter" id="2" parent="10">a</mi></mrow><mo type="operator" role="addition" id="3" operator="infixop,∓" parent="12">∓</mo><mrow type="prefixop" role="multiop" id="11" children="5" content="4" parent="12"><mo type="operator" role="addition" id="4" operator="prefixop,+" parent="11">+</mo><mi type="identifier" role="latinletter" id="5" parent="11">b</mi></mrow></mrow><mo type="operator" role="addition" id="6" operator="infixop,+" parent="14">+</mo><mrow type="postfixop" role="multiop" id="15" children="13" content="9" parent="14"><mrow type="prefixop" role="multiop" id="13" children="8" content="7" parent="15"><mo type="operator" role="addition" id="7" operator="prefixop,∓" parent="13">∓</mo><mi type="identifier" role="latinletter" id="8" parent="13">c</mi></mrow><mo type="operator" role="addition" id="9" operator="postfixop,+" parent="15">+</mo></mrow></math>'
  );
};



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


// Sub, Superscripts.
/**
 * Test for sub super and subsuper scripts.
 */
sre.SemanticMathmlTest.prototype.testMathmlScripts = function() {
  this.executeMathmlTest(
      '<msub><mi>a</mi><mi>b</mi></msub>',
      '<math>' +
      '<msub type="subscript" role="latinletter" id="2" children="0,1">' +
      '<mi type="identifier" role="latinletter" id="0" parent="2">a</mi>' +
      '<mi type="identifier" role="latinletter" id="1" parent="2">b</mi>' +
      '</msub></math>');
  this.executeMathmlTest(
      '<msup><mi>a</mi><mi>b</mi></msup>',
      '<math>' +
      '<msup type="superscript" role="latinletter" id="2" children="0,1">' +
      '<mi type="identifier" role="latinletter" id="0" parent="2">a</mi>' +
      '<mi type="identifier" role="latinletter" id="1" parent="2">b</mi>' +
      '</msup></math>');
  this.executeMathmlTest(
      '<msubsup><mi>a</mi><mi>b</mi><mi>c</mi></msubsup>',
      '<math>' +
      '<msubsup type="subsup" role="latinletter" id="4" children="0,1,2"' +
      ' collapsed="(4 (3 0 1) 2)">' +
      '<mi type="identifier" role="latinletter" id="0" parent="4">a</mi>' +
      '<mi type="identifier" role="latinletter" id="1" parent="4">b</mi>' +
      '<mi type="identifier" role="latinletter" id="2" parent="4">c</mi>' +
      '</msubsup></math>');
};


// Numbers.
/**
 * Test number representations.
 */
sre.SemanticMathmlTest.prototype.testMathmlNumbers = function() {
  this.executeMathmlTest(
      '<mn>2</mn>',
      '<math>' +
      '<mn type="number" role="integer" id="0">2</mn>' +
      '</math>');
  this.executeMathmlTest(
      '<mn>2.0</mn>',
      '<math>' +
      '<mn type="number" role="float" id="0">2.0</mn>' +
      '</math>');
  this.executeMathmlTest(
      '<mn>2t3</mn>',
      '<math>' +
      '<mn type="number" role="othernumber" id="0">2t3</mn>' +
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
sre.SemanticMathmlTest.prototype.testMathmlMixedNumbers = function() {
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
      '<mo type="operator" role="multiplication" id="4"' +
      ' parent="5" added="true" operator="infixop,⁢">⁢</mo>' +
      '<mn type="number" role="integer" id="3" parent="5">3</mn>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<mn>3.0</mn><mfrac><mn>1</mn><mn>2</mn></mfrac>',
      '<math type="infixop" role="implicit" id="5" children="0,3"' +
      ' content="4">' +
      '<mn type="number" role="float" id="0" parent="5">3.0</mn>' +
      '<mo type="operator" role="multiplication" id="4" parent="5"' +
      ' added="true"' +
      ' operator="infixop,⁢">⁢</mo>' +
      '<mfrac type="fraction" role="vulgar" id="3" children="1,2" parent="5">' +
      '<mn type="number" role="integer" id="1" parent="3">1</mn>' +
      '<mn type="number" role="integer" id="2" parent="3">2</mn>' +
      '</mfrac>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<mfrac><mn>1</mn><mn>2</mn></mfrac><mn>3.0</mn>',
      '<math type="infixop" role="implicit" id="5" children="2,3"' +
      ' content="4">' +
      '<mfrac type="fraction" role="vulgar" id="2" children="0,1" parent="5">' +
      '<mn type="number" role="integer" id="0" parent="2">1</mn>' +
      '<mn type="number" role="integer" id="1" parent="2">2</mn>' +
      '</mfrac>' +
      '<mo type="operator" role="multiplication" id="4" parent="5"' +
      ' added="true" operator="infixop,⁢">⁢</mo>' +
      '<mn type="number" role="float" id="3" parent="5">3.0</mn>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<mn>3</mn><mfrac><mn>1</mn><mn>2</mn></mfrac><mi>a</mi>',
      '<math type="infixop" role="implicit" id="7" children="5,4"' +
      ' content="6">' +
      '<mrow type="number" role="mixed" id="5" children="0,3" parent="7">' +
      '<mn type="number" role="integer" id="0" parent="5">3</mn>' +
      '<mfrac type="fraction" role="vulgar" id="3" children="1,2" parent="5">' +
      '<mn type="number" role="integer" id="1" parent="3">1</mn>' +
      '<mn type="number" role="integer" id="2" parent="3">2</mn>' +
      '</mfrac>' +
      '</mrow>' +
      '<mo type="operator" role="multiplication" id="6" parent="7"' +
      ' added="true" operator="infixop,⁢">⁢</mo>' +
      '<mi type="identifier" role="latinletter" id="4" parent="7">a</mi>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<mi>b</mi><mn>3</mn><mfrac><mn>1</mn><mn>2</mn></mfrac><mi>a</mi>',
      '<math type="infixop" role="implicit" id="9" children="0,6,5"' +
      ' content="7,8">' +
      '<mi type="identifier" role="latinletter" id="0" parent="9">b</mi>' +
      '<mo type="operator" role="multiplication" id="7" parent="9"' +
      ' added="true" operator="infixop,⁢">⁢</mo>' +
      '<mrow type="number" role="mixed" id="6" children="1,4" parent="9">' +
      '<mn type="number" role="integer" id="1" parent="6">3</mn>' +
      '<mfrac type="fraction" role="vulgar" id="4" children="2,3" parent="6">' +
      '<mn type="number" role="integer" id="2" parent="4">1</mn>' +
      '<mn type="number" role="integer" id="3" parent="4">2</mn>' +
      '</mfrac>' +
      '</mrow>' +
      '<mo type="operator" role="multiplication" id="8" parent="9"' +
      ' added="true" operator="infixop,⁢">⁢</mo>' +
      '<mi type="identifier" role="latinletter" id="5" parent="9">a</mi>' +
      '</math>'
  );
};


// Relations.
/**
 * Test relation trees.
 */
sre.SemanticMathmlTest.prototype.testMathmlRelations = function() {
  this.executeMathmlTest(
      '<mo>=</mo>',
      '<math><mo type="relation" role="equality" id="0">=</mo></math>'
  );
  this.executeMathmlTest(
      '<mi>a</mi><mo>=</mo><mi>b</mi>',
      '<math type="relseq" role="equality" id="3" children="0,2" content="1">' +
      '<mi type="identifier" role="latinletter" id="0" parent="3">a</mi>' +
      '<mo type="relation" role="equality" id="1" parent="3"' +
      ' operator="relseq,=">=</mo>' +
      '<mi type="identifier" role="latinletter" id="2" parent="3">b</mi>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<mi>a</mi><mo>=</mo><mi>b</mi><mo>=</mo><mi>c</mi>',
      '<math type="relseq" role="equality" id="5" children="0,2,4"' +
      ' content="1,3">' +
      '<mi type="identifier" role="latinletter" id="0" parent="5">a</mi>' +
      '<mo type="relation" role="equality" id="1" parent="5"' +
      ' operator="relseq,=">=</mo>' +
      '<mi type="identifier" role="latinletter" id="2" parent="5">b</mi>' +
      '<mo type="relation" role="equality" id="3" parent="5"' +
      ' operator="relseq,=">=</mo>' +
      '<mi type="identifier" role="latinletter" id="4" parent="5">c</mi>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<mi>a</mi><mo>=</mo><mi>b</mi><mo>=</mo><mi>c</mi>' +
          '<mo>\u2264</mo><mi>d</mi>',
      '<math type="multirel" role="unknown" id="7"' +
      ' children="0,2,4,6" content="1,3,5">' +
      '<mi type="identifier" role="latinletter" id="0" parent="7">a</mi>' +
      '<mo type="relation" role="equality" id="1" parent="7"' +
      ' operator="multirel">=</mo>' +
      '<mi type="identifier" role="latinletter" id="2" parent="7">b</mi>' +
      '<mo type="relation" role="equality" id="3" parent="7"' +
      ' operator="multirel">=</mo>' +
      '<mi type="identifier" role="latinletter" id="4" parent="7">c</mi>' +
      '<mo type="relation" role="inequality" id="5" parent="7"' +
      ' operator="multirel">≤</mo>' +
      '<mi type="identifier" role="latinletter" id="6" parent="7">d</mi>' +
      '</math>'
  );
};


// Operators.
/**
 * Test operator trees with pre- and postfixes.
 */
sre.SemanticMathmlTest.prototype.testMathmlPrePostfixOperators = function() {
  // Pathological operator only case.
  this.executeMathmlTest(
      '<mo>+</mo><mo>-</mo><mo>+</mo>',
      '<math type="prefixop" role="multiop" id="4" children="3" content="0">' +
      '<mo type="operator" role="addition" id="0" parent="4"' +
      ' operator="prefixop,+">+</mo>' +
      '<mrow type="prefixop" role="negative" id="3" children="2"' +
      ' content="1" parent="4">' +
      '<mo type="operator" role="subtraction" id="1" parent="3"' +
      ' operator="prefixop,-">-</mo>' +
      '<mo type="operator" role="addition" id="2" parent="3">+</mo>' +
      '</mrow>' +
      '</math>'
  );
  // Single identifier with prefixes.
  this.executeMathmlTest(
      '<mo>+</mo><mo>+</mo><mi>a</mi>',
      '<math type="prefixop" role="multiop" id="3" children="2"' +
      ' content="0,1">' +
      '<mo type="operator" role="addition" id="0" parent="3"' +
      ' operator="prefixop,+ +">+</mo>' +
      '<mo type="operator" role="addition" id="1" parent="3"' +
      ' operator="prefixop,+ +">+</mo>' +
      '<mi type="identifier" role="latinletter" id="2" parent="3">a</mi>' +
      '</math>'
  );
  // Single identifier with prefix and negative.
  this.executeMathmlTest(
      '<mo>+</mo><mo>-</mo><mi>a</mi>',
      '<math type="prefixop" role="multiop" id="4" children="3" content="0">' +
      '<mo type="operator" role="addition" id="0" parent="4"' +
      ' operator="prefixop,+">+</mo>' +
      '<mrow type="prefixop" role="negative" id="3" children="2"' +
      ' content="1" parent="4">' +
      '<mo type="operator" role="subtraction" id="1" parent="3"' +
      ' operator="prefixop,-">-</mo>' +
      '<mi type="identifier" role="latinletter" id="2" parent="3">a</mi>' +
      '</mrow>' +
      '</math>'
  );
  // Single identifier with postfixes.
  this.executeMathmlTest(
      '<mi>a</mi><mo>+</mo><mo>-</mo>',
      '<math type="postfixop" role="multiop" id="3" children="0"' +
      ' content="1,2">' +
      '<mi type="identifier" role="latinletter" id="0" parent="3">a</mi>' +
      '<mo type="operator" role="addition" id="1" parent="3"' +
      ' operator="postfixop,+ -">+</mo>' +
      '<mo type="operator" role="subtraction" id="2" parent="3"' +
      ' operator="postfixop,+ -">-</mo>' +
      '</math>'
  );
  // Single identifier with pre- and postfixes.
  this.executeMathmlTest(
      '<mo>+</mo><mo>+</mo><mi>a</mi><mo>+</mo><mo>+</mo>',
      '<math type="postfixop" role="multiop" id="6" children="5"' +
      ' content="3,4">' +
      '<mrow type="prefixop" role="multiop" id="5" children="2"' +
      ' content="0,1" parent="6">' +
      '<mo type="operator" role="addition" id="0" parent="5"' +
      ' operator="prefixop,+ +">+</mo>' +
      '<mo type="operator" role="addition" id="1" parent="5"' +
      ' operator="prefixop,+ +">+</mo>' +
      '<mi type="identifier" role="latinletter" id="2" parent="5">a</mi>' +
      '</mrow>' +
      '<mo type="operator" role="addition" id="3" parent="6"' +
      ' operator="postfixop,+ +">+</mo>' +
      '<mo type="operator" role="addition" id="4" parent="6"' +
      ' operator="postfixop,+ +">+</mo>' +
      '</math>'
  );
  // Single identifier with mixed pre- and postfixes.
  this.executeMathmlTest(
      '<mo>\u2213</mo><mo>+</mo><mi>a</mi><mo>\u2213</mo><mo>+</mo>',
      '<math type="postfixop" role="multiop" id="6" children="5"' +
      ' content="3,4">' +
      '<mrow type="prefixop" role="multiop" id="5" children="2"' +
      ' content="0,1" parent="6">' +
      '<mo type="operator" role="addition" id="0" parent="5"' +
      ' operator="prefixop,∓ +">∓</mo>' +
      '<mo type="operator" role="addition" id="1" parent="5"' +
      ' operator="prefixop,∓ +">+</mo>' +
      '<mi type="identifier" role="latinletter" id="2" parent="5">a</mi>' +
      '</mrow>' +
      '<mo type="operator" role="addition" id="3" parent="6"' +
      ' operator="postfixop,∓ +">∓</mo>' +
      '<mo type="operator" role="addition" id="4" parent="6"' +
      ' operator="postfixop,∓ +">+</mo>' +
      '</math>'
  );
  // Two identifiers with pre- and postfixes.
  this.executeMathmlTest(
      '<mo>+</mo><mo>+</mo><mi>a</mi><mo>\u2213</mo><mo>+</mo>' +
          '<mi>b</mi><mo>+</mo>',
      '<math type="infixop" role="addition" id="9" children="7,10"' +
      ' content="3">' +
      '<mrow type="prefixop" role="multiop" id="7" children="2"' +
      ' content="0,1" parent="9">' +
      '<mo type="operator" role="addition" id="0" parent="7"' +
      ' operator="prefixop,+ +">+</mo>' +
      '<mo type="operator" role="addition" id="1" parent="7"' +
      ' operator="prefixop,+ +">+</mo>' +
      '<mi type="identifier" role="latinletter" id="2"' +
      ' parent="7">a</mi></mrow>' +
      '<mo type="operator" role="addition" id="3" parent="9"' +
      ' operator="infixop,∓">∓</mo>' +
      '<mrow type="postfixop" role="multiop" id="10" children="8"' +
      ' content="6" parent="9">' +
      '<mrow type="prefixop" role="multiop" id="8" children="5" content="4"' +
      ' parent="10">' +
      '<mo type="operator" role="addition" id="4" parent="8"' +
      ' operator="prefixop,+">+</mo>' +
      '<mi type="identifier" role="latinletter" id="5"' +
      ' parent="8">b</mi></mrow>' +
      '<mo type="operator" role="addition" id="6" parent="10"' +
      ' operator="postfixop,+">+</mo>' +
      '</mrow></math>'
  );
  // Three identifiers with pre- and postfixes.
  this.executeMathmlTest(
      '<mo>+</mo><mo>+</mo><mi>a</mi><mo>\u2213</mo><mo>+</mo>' +
          '<mi>b</mi><mo>+</mo><mo>\u2213</mo><mi>c</mi><mo>+</mo>',
      '<math type="infixop" role="addition" id="14" children="12,15"' +
      ' content="6">' +
      '<mrow type="infixop" role="addition" id="12" children="10,11"' +
      ' content="3" parent="14">' +
      '<mrow type="prefixop" role="multiop" id="10" children="2"' +
      ' content="0,1" parent="12">' +
      '<mo type="operator" role="addition" id="0" parent="10"' +
      ' operator="prefixop,+ +">+</mo>' +
      '<mo type="operator" role="addition" id="1" parent="10"' +
      ' operator="prefixop,+ +">+</mo>' +
      '<mi type="identifier" role="latinletter" id="2" parent="10">a</mi>' +
      '</mrow>' +
      '<mo type="operator" role="addition" id="3" parent="12"' +
      ' operator="infixop,∓">∓</mo>' +
      '<mrow type="prefixop" role="multiop" id="11" children="5"' +
      ' content="4" parent="12">' +
      '<mo type="operator" role="addition" id="4" parent="11"' +
      ' operator="prefixop,+">+</mo>' +
      '<mi type="identifier" role="latinletter" id="5" parent="11">b</mi>' +
      '</mrow>' +
      '</mrow>' +
      '<mo type="operator" role="addition" id="6" parent="14"' +
      ' operator="infixop,+">+</mo>' +
      '<mrow type="postfixop" role="multiop" id="15" children="13"' +
      ' content="9" parent="14">' +
      '<mrow type="prefixop" role="multiop" id="13" children="8"' +
      ' content="7" parent="15">' +
      '<mo type="operator" role="addition" id="7" parent="13"' +
      ' operator="prefixop,∓">∓</mo>' +
      '<mi type="identifier" role="latinletter" id="8" parent="13">c</mi>' +
      '</mrow>' +
      '<mo type="operator" role="addition" id="9" parent="15"' +
      ' operator="postfixop,+">+</mo>' +
      '</mrow>' +
      '</math>'
  );
};


/**
 * Test operator trees with single operator.
 */
sre.SemanticMathmlTest.prototype.testMathmlSingleOperators = function() {
  // Single identifier.
  this.executeMathmlTest(
    '<mi>a</mi>',
    '<math>' +
      '<mi type="identifier" role="latinletter" id="0">a</mi>' +
      '</math>'
  );
  // Single implicit node.
  this.executeMathmlTest(
    '<mi>a</mi><mi>b</mi>',
    '<math type="infixop" role="implicit" id="3" children="0,1" content="2">' +
      '<mi type="identifier" role="latinletter" id="0" parent="3">a</mi>' +
      '<mo type="operator" role="multiplication" id="2" parent="3" added="true" operator="infixop,⁢">⁢</mo>' +
      '<mi type="identifier" role="latinletter" id="1" parent="3">b</mi>' +
      '</math>'
  );
  // Implicit multi node.
  this.executeMathmlTest(
    '<mi>a</mi><mi>b</mi><mi>c</mi>',
    '<math type="infixop" role="implicit" id="5" children="0,1,2" content="3,4">' +
      '<mi type="identifier" role="latinletter" id="0" parent="5">a</mi>' +
      '<mo type="operator" role="multiplication" id="3" parent="5" added="true" operator="infixop,⁢">⁢</mo>' +
      '<mi type="identifier" role="latinletter" id="1" parent="5">b</mi>' +
      '<mo type="operator" role="multiplication" id="4" parent="5" added="true" operator="infixop,⁢">⁢</mo>' +
      '<mi type="identifier" role="latinletter" id="2" parent="5">c</mi>' +
      '</math>'
  );
  // Single addition.
  this.executeMathmlTest(
    '<mi>a</mi><mo>+</mo><mi>b</mi>',
    '<math type="infixop" role="addition" id="3" children="0,2" content="1">' +
      '<mi type="identifier" role="latinletter" id="0" parent="3">a</mi>' +
      '<mo type="operator" role="addition" id="1" parent="3" operator="infixop,+">+</mo>' +
      '<mi type="identifier" role="latinletter" id="2" parent="3">b</mi>' +
      '</math>'
  );
  // Multi addition.
  this.executeMathmlTest(
    '<mi>a</mi><mo>+</mo><mi>b</mi><mo>+</mo><mi>c</mi>',
    '<math type="infixop" role="addition" id="5" children="0,2,4" content="1,3">' +
      '<mi type="identifier" role="latinletter" id="0" parent="5">a</mi>' +
      '<mo type="operator" role="addition" id="1" parent="5" operator="infixop,+">+</mo>' +
      '<mi type="identifier" role="latinletter" id="2" parent="5">b</mi>' +
      '<mo type="operator" role="addition" id="3" parent="5" operator="infixop,+">+</mo>' +
      '<mi type="identifier" role="latinletter" id="4" parent="5">c</mi>' +
      '</math>'
  );
  // Multi addition with implicit node.
  this.executeMathmlTest(
    '<mi>a</mi><mo>+</mo><mi>b</mi><mi>c</mi><mo>+</mo><mi>d</mi>',
    '<math type="infixop" role="addition" id="8" children="0,7,5" content="1,4">' +
      '<mi type="identifier" role="latinletter" id="0" parent="8">a</mi>' +
      '<mo type="operator" role="addition" id="1" parent="8" operator="infixop,+">+</mo>' +
      '<mrow type="infixop" role="implicit" id="7" children="2,3" content="6" parent="8">' +
      '<mi type="identifier" role="latinletter" id="2" parent="7">b</mi>' +
      '<mo type="operator" role="multiplication" id="6" parent="7" added="true" operator="infixop,⁢">⁢</mo>' +
      '<mi type="identifier" role="latinletter" id="3" parent="7">c</mi>' +
      '</mrow>' +
      '<mo type="operator" role="addition" id="4" parent="8" operator="infixop,+">+</mo>' +
      '<mi type="identifier" role="latinletter" id="5" parent="8">d</mi>' +
      '</math>'
  );
};


/**
 * Test operator trees with multiple operators.
 */
sre.SemanticMathmlTest.prototype.testMathmlMultipleOperators = function() {
  // Addition and subtraction.
  this.executeMathmlTest(
    '<mi>a</mi><mo>+</mo><mi>b</mi><mo>-</mo><mi>c</mi><mo>+</mo><mi>d</mi>',
    '<math type="infixop" role="addition" id="9" children="8,6" content="5">' +
      '<mrow type="infixop" role="subtraction" id="8" children="7,4" content="3" parent="9">' +
      '<mrow type="infixop" role="addition" id="7" children="0,2" content="1" parent="8">' +
      '<mi type="identifier" role="latinletter" id="0" parent="7">a</mi>' +
      '<mo type="operator" role="addition" id="1" parent="7" operator="infixop,+">+</mo>' +
      '<mi type="identifier" role="latinletter" id="2" parent="7">b</mi>' +
      '</mrow>' +
      '<mo type="operator" role="subtraction" id="3" parent="8" operator="infixop,-">-</mo>' +
      '<mi type="identifier" role="latinletter" id="4" parent="8">c</mi>' +
      '</mrow>' +
      '<mo type="operator" role="addition" id="5" parent="9" operator="infixop,+">+</mo>' +
      '<mi type="identifier" role="latinletter" id="6" parent="9">d</mi>' +
      '</math>'
  );
  // Addition and subtraction.
  this.executeMathmlTest(
    '<mi>a</mi><mo>+</mo><mi>b</mi><mo>+</mo><mi>c</mi><mo>-</mo>' +
      '<mi>d</mi><mo>-</mo><mi>e</mi>',
    '<math type="infixop" role="subtraction" id="10" children="9,6,8" content="5,7">' +
      '<mrow type="infixop" role="addition" id="9" children="0,2,4" content="1,3" parent="10">' +
      '<mi type="identifier" role="latinletter" id="0" parent="9">a</mi>' +
      '<mo type="operator" role="addition" id="1" parent="9" operator="infixop,+">+</mo>' +
      '<mi type="identifier" role="latinletter" id="2" parent="9">b</mi>' +
      '<mo type="operator" role="addition" id="3" parent="9" operator="infixop,+">+</mo>' +
      '<mi type="identifier" role="latinletter" id="4" parent="9">c</mi>' +
      '</mrow>' +
      '<mo type="operator" role="subtraction" id="5" parent="10" operator="infixop,-">-</mo>' +
      '<mi type="identifier" role="latinletter" id="6" parent="10">d</mi>' +
      '<mo type="operator" role="subtraction" id="7" parent="10" operator="infixop,-">-</mo>' +
      '<mi type="identifier" role="latinletter" id="8" parent="10">e</mi>' +
      '</math>'
  );
  // Addition and explicit multiplication.
  this.executeMathmlTest(
    '<mi>a</mi><mo>+</mo><mi>b</mi><mo>\u2218</mo><mi>c</mi><mo>+</mo><mi>d</mi>',
    '<math type="infixop" role="addition" id="7" children="0,8,6" content="1,5">' +
      '<mi type="identifier" role="latinletter" id="0" parent="7">a</mi>' +
      '<mo type="operator" role="addition" id="1" parent="7" operator="infixop,+">+</mo>' +
      '<mrow type="infixop" role="multiplication" id="8" children="2,4" content="3" parent="7">' +
      '<mi type="identifier" role="latinletter" id="2" parent="8">b</mi>' +
      '<mo type="operator" role="multiplication" id="3" parent="8" operator="infixop,∘">∘</mo>' +
      '<mi type="identifier" role="latinletter" id="4" parent="8">c</mi>' +
      '</mrow>' +
      '<mo type="operator" role="addition" id="5" parent="7" operator="infixop,+">+</mo>' +
      '<mi type="identifier" role="latinletter" id="6" parent="7">d</mi>' +
      '</math>'
  );
  // Addition with explicit and implicit multiplication.
  this.executeMathmlTest(
    '<mi>a</mi><mo>+</mo><mi>b</mi><mo>\u2218</mo><mi>c</mi><mi>d</mi>' +
      '<mo>+</mo><mi>e</mi><mo>\u2218</mo><mi>f</mi>',
    '<math type="infixop" role="addition" id="10" children="0,13,14" content="1,6">' +
      '<mi type="identifier" role="latinletter" id="0" parent="10">a</mi>' +
      '<mo type="operator" role="addition" id="1" parent="10" operator="infixop,+">+</mo>' +
      '<mrow type="infixop" role="multiplication" id="13" children="2,12" content="3" parent="10">' +
      '<mi type="identifier" role="latinletter" id="2" parent="13">b</mi>' +
      '<mo type="operator" role="multiplication" id="3" parent="13" operator="infixop,∘">∘</mo>' +
      '<mrow type="infixop" role="implicit" id="12" children="4,5" content="11" parent="13">' +
      '<mi type="identifier" role="latinletter" id="4" parent="12">c</mi>' +
      '<mo type="operator" role="multiplication" id="11" parent="12" added="true" operator="infixop,⁢">⁢</mo>' +
      '<mi type="identifier" role="latinletter" id="5" parent="12">d</mi>' +
      '</mrow>' +
      '</mrow>' +
      '<mo type="operator" role="addition" id="6" parent="10" operator="infixop,+">+</mo>' +
      '<mrow type="infixop" role="multiplication" id="14" children="7,9" content="8" parent="10">' +
      '<mi type="identifier" role="latinletter" id="7" parent="14">e</mi>' +
      '<mo type="operator" role="multiplication" id="8" parent="14" operator="infixop,∘">∘</mo>' +
      '<mi type="identifier" role="latinletter" id="9" parent="14">f</mi>' +
      '</mrow>' +
      '</math>'
  );
  // Two Additions, subtraction plus explicit and implicit multiplication,
  // one prefix and one postfix.
  this.executeMathmlTest(
    '<mi>a</mi><mo>+</mo><mi>b</mi><mo>+</mo><mi>c</mi><mi>d</mi>' +
      '<mo>+</mo><mi>e</mi><mo>\u2218</mo><mi>f</mi><mo>-</mo><mi>g</mi>' +
      '<mo>+</mo><mo>+</mo><mi>h</mi><mo>\u2295</mo><mi>i</mi>' +
      '<mo>\u2295</mo><mi>j</mi><mo>+</mo><mo>+</mo>',
    '<math type="infixop" role="addition" id="28" children="27,16,29" content="15,17">' +
      '<mrow type="infixop" role="addition" id="27" children="25,26" content="12" parent="28">' +
      '<mrow type="infixop" role="subtraction" id="25" children="21,11" content="10" parent="27">' +
      '<mrow type="infixop" role="addition" id="21" children="0,2,23,24" content="1,3,6" parent="25">' +
      '<mi type="identifier" role="latinletter" id="0" parent="21">a</mi>' +
      '<mo type="operator" role="addition" id="1" parent="21" operator="infixop,+">+</mo>' +
      '<mi type="identifier" role="latinletter" id="2" parent="21">b</mi>' +
      '<mo type="operator" role="addition" id="3" parent="21" operator="infixop,+">+</mo>' +
      '<mrow type="infixop" role="implicit" id="23" children="4,5" content="22" parent="21">' +
      '<mi type="identifier" role="latinletter" id="4" parent="23">c</mi>' +
      '<mo type="operator" role="multiplication" id="22" parent="23" added="true" operator="infixop,⁢">⁢</mo>' +
      '<mi type="identifier" role="latinletter" id="5" parent="23">d</mi>' +
      '</mrow>' +
      '<mo type="operator" role="addition" id="6" parent="21" operator="infixop,+">+</mo>' +
      '<mrow type="infixop" role="multiplication" id="24" children="7,9" content="8" parent="21">' +
      '<mi type="identifier" role="latinletter" id="7" parent="24">e</mi>' +
      '<mo type="operator" role="multiplication" id="8" parent="24" operator="infixop,∘">∘</mo>' +
      '<mi type="identifier" role="latinletter" id="9" parent="24">f</mi>' +
      '</mrow>' +
      '</mrow>' +
      '<mo type="operator" role="subtraction" id="10" parent="25" operator="infixop,-">-</mo>' +
      '<mi type="identifier" role="latinletter" id="11" parent="25">g</mi>' +
      '</mrow>' +
      '<mo type="operator" role="addition" id="12" parent="27" operator="infixop,+">+</mo>' +
      '<mrow type="prefixop" role="multiop" id="26" children="14" content="13" parent="27">' +
      '<mo type="operator" role="addition" id="13" parent="26" operator="prefixop,+">+</mo>' +
      '<mi type="identifier" role="latinletter" id="14" parent="26">h</mi>' +
      '</mrow>' +
      '</mrow>' +
      '<mo type="operator" role="addition" id="15" parent="28" operator="infixop,⊕">⊕</mo>' +
      '<mi type="identifier" role="latinletter" id="16" parent="28">i</mi>' +
      '<mo type="operator" role="addition" id="17" parent="28" operator="infixop,⊕">⊕</mo>' +
      '<mrow type="postfixop" role="multiop" id="29" children="18" content="19,20" parent="28">' +
      '<mi type="identifier" role="latinletter" id="18" parent="29">j</mi>' +
      '<mo type="operator" role="addition" id="19" parent="29" operator="postfixop,+ +">+</mo>' +
      '<mo type="operator" role="addition" id="20" parent="29" operator="postfixop,+ +">+</mo>' +
      '</mrow>' +
      '</math>'
  );
};


/**
 * Test operator trees with multiplication operators.
 */
sre.SemanticMathmlTest.prototype.testMathmlMultiplicationOperators = function() {
  // Addition and subtraction.
  this.executeMathmlTest(
      '<mi>a</mi><mo>*</mo><mi>b</mi><mo>*</mo><mi>c</mi><mo>*</mo><mi>d</mi>',
    '<math type="infixop" role="multiplication" id="7" children="0,2,4,6" content="1,3,5">' +
      '<mi type="identifier" role="latinletter" id="0" parent="7">a</mi>' +
      '<mo type="operator" role="multiplication" id="1" parent="7" operator="infixop,*">*</mo>' +
      '<mi type="identifier" role="latinletter" id="2" parent="7">b</mi>' +
      '<mo type="operator" role="multiplication" id="3" parent="7" operator="infixop,*">*</mo>' +
      '<mi type="identifier" role="latinletter" id="4" parent="7">c</mi>' +
      '<mo type="operator" role="multiplication" id="5" parent="7" operator="infixop,*">*</mo>' +
      '<mi type="identifier" role="latinletter" id="6" parent="7">d</mi>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<mrow>' +
      '<mn>1</mn><mi>a</mi><mo>\u00B7</mo><mi>m</mi>' +
      '</mrow>',
    '<math>' +
      '<mrow type="infixop" role="multiplication" id="6" children="5,3" content="2">' +
      '<mrow type="infixop" role="implicit" id="5" children="0,1" content="4" parent="6">' +
      '<mn type="number" role="integer" id="0" parent="5">1</mn>' +
      '<mo type="operator" role="multiplication" id="4" parent="5" added="true" operator="infixop,⁢">⁢</mo>' +
      '<mi type="identifier" role="latinletter" id="1" parent="5">a</mi>' +
      '</mrow>' +
      '<mo type="operator" role="multiplication" id="2" parent="6" operator="infixop,·">·</mo>' +
      '<mi type="identifier" role="latinletter" id="3" parent="6">m</mi>' +
      '</mrow>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<mrow>' +
      '<mn>1</mn><mi>a</mi><mo>\u00B7</mo>' +
      '<mi>m</mi><mo>\u00B7</mo><mi>s</mi>' +
      '</mrow>',
    '<math>' +
      '<mrow type="infixop" role="multiplication" id="8" children="7,3,5" content="2,4">' +
      '<mrow type="infixop" role="implicit" id="7" children="0,1" content="6" parent="8">' +
      '<mn type="number" role="integer" id="0" parent="7">1</mn>' +
      '<mo type="operator" role="multiplication" id="6" parent="7" added="true" operator="infixop,⁢">⁢</mo>' +
      '<mi type="identifier" role="latinletter" id="1" parent="7">a</mi>' +
      '</mrow>' +
      '<mo type="operator" role="multiplication" id="2" parent="8" operator="infixop,·">·</mo>' +
      '<mi type="identifier" role="latinletter" id="3" parent="8">m</mi>' +
      '<mo type="operator" role="multiplication" id="4" parent="8" operator="infixop,·">·</mo>' +
      '<mi type="identifier" role="latinletter" id="5" parent="8">s</mi>' +
      '</mrow>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<mrow>' +
      '<mn>1</mn><mi>a</mi><mo>\u00B7</mo>' +
      '<mi>m</mi><mo>\u00B7</mo>' +
      '<mi>s</mi><mo>\u00B7</mo>' +
      '<mi>c</mi><mi>b</mi><mo>\u00B7</mo>' +
      '<mi>k</mi>' +
      '</mrow>',
    '<math>' +
      '<mrow type="infixop" role="multiplication" id="13" children="12,3,5,15,10" content="2,4,6,9">' +
      '<mrow type="infixop" role="implicit" id="12" children="0,1" content="11" parent="13">' +
      '<mn type="number" role="integer" id="0" parent="12">1</mn>' +
      '<mo type="operator" role="multiplication" id="11" parent="12" added="true" operator="infixop,⁢">⁢</mo>' +
      '<mi type="identifier" role="latinletter" id="1" parent="12">a</mi>' +
      '</mrow>' +
      '<mo type="operator" role="multiplication" id="2" parent="13" operator="infixop,·">·</mo>' +
      '<mi type="identifier" role="latinletter" id="3" parent="13">m</mi>' +
      '<mo type="operator" role="multiplication" id="4" parent="13" operator="infixop,·">·</mo>' +
      '<mi type="identifier" role="latinletter" id="5" parent="13">s</mi>' +
      '<mo type="operator" role="multiplication" id="6" parent="13" operator="infixop,·">·</mo>' +
      '<mrow type="infixop" role="implicit" id="15" children="7,8" content="14" parent="13">' +
      '<mi type="identifier" role="latinletter" id="7" parent="15">c</mi>' +
      '<mo type="operator" role="multiplication" id="14" parent="15" added="true" operator="infixop,⁢">⁢</mo>' +
      '<mi type="identifier" role="latinletter" id="8" parent="15">b</mi>' +
      '</mrow>' +
      '<mo type="operator" role="multiplication" id="9" parent="13" operator="infixop,·">·</mo>' +
      '<mi type="identifier" role="latinletter" id="10" parent="13">k</mi>' +
      '</mrow>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<mrow>' +
      '<mn>1</mn><mi>a</mi><mo>\u00B7</mo>' +
      '<msup><mi>m</mi><mn>2</mn></msup>' +
      '<mo>\u00B7</mo>' +
      '<msup><mi>s</mi><mrow><mo>-</mo><mn>2</mn></mrow>' +
      '</msup></mrow>',
    '<math>' +
      '<mrow type="infixop" role="multiplication" id="14" children="13,5,11" content="2,6">' +
      '<mrow type="infixop" role="implicit" id="13" children="0,1" content="12" parent="14">' +
      '<mn type="number" role="integer" id="0" parent="13">1</mn>' +
      '<mo type="operator" role="multiplication" id="12" parent="13" added="true" operator="infixop,⁢">⁢</mo>' +
      '<mi type="identifier" role="latinletter" id="1" parent="13">a</mi>' +
      '</mrow>' +
      '<mo type="operator" role="multiplication" id="2" parent="14" operator="infixop,·">·</mo>' +
      '<msup type="superscript" role="latinletter" id="5" children="3,4" parent="14">' +
      '<mi type="identifier" role="latinletter" id="3" parent="5">m</mi>' +
      '<mn type="number" role="integer" id="4" parent="5">2</mn>' +
      '</msup>' +
      '<mo type="operator" role="multiplication" id="6" parent="14" operator="infixop,·">·</mo>' +
      '<msup type="superscript" role="latinletter" id="11" children="7,10" parent="14">' +
      '<mi type="identifier" role="latinletter" id="7" parent="11">s</mi>' +
      '<mrow type="prefixop" role="negative" id="10" children="9" content="8" parent="11">' +
      '<mo type="operator" role="subtraction" id="8" parent="10" operator="prefixop,-">-</mo>' +
      '<mn type="number" role="integer" id="9" parent="10">2</mn>' +
      '</mrow>' +
      '</msup>' +
      '</mrow>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<mrow><mn>1</mn><mi>J</mi><mo>=</mo><mn>1</mn>' +
      '<mi>a</mi><mo>\u00B7</mo>' +
      '<msup><mi>m</mi><mn>2</mn></msup>' +
      '<mo>\u00B7</mo>' +
      '<msup><mi>s</mi><mrow><mo>-</mo><mn>2</mn></mrow>' +
      '</msup></mrow>',
    '<math>' +
      '<mrow type="relseq" role="equality" id="20" children="16,19" content="2">' +
      '<mrow type="infixop" role="implicit" id="16" children="0,1" content="15" parent="20">' +
      '<mn type="number" role="integer" id="0" parent="16">1</mn>' +
      '<mo type="operator" role="multiplication" id="15" parent="16" added="true" operator="infixop,⁢">⁢</mo>' +
      '<mi type="identifier" role="latinletter" id="1" parent="16">J</mi>' +
      '</mrow>' +
      '<mo type="relation" role="equality" id="2" parent="20" operator="relseq,=">=</mo>' +
      '<mrow type="infixop" role="multiplication" id="19" children="18,8,14" content="5,9" parent="20">' +
      '<mrow type="infixop" role="implicit" id="18" children="3,4" content="17" parent="19">' +
      '<mn type="number" role="integer" id="3" parent="18">1</mn>' +
      '<mo type="operator" role="multiplication" id="17" parent="18" added="true" operator="infixop,⁢">⁢</mo>' +
      '<mi type="identifier" role="latinletter" id="4" parent="18">a</mi>' +
      '</mrow>' +
      '<mo type="operator" role="multiplication" id="5" parent="19" operator="infixop,·">·</mo>' +
      '<msup type="superscript" role="latinletter" id="8" children="6,7" parent="19">' +
      '<mi type="identifier" role="latinletter" id="6" parent="8">m</mi>' +
      '<mn type="number" role="integer" id="7" parent="8">2</mn>' +
      '</msup>' +
      '<mo type="operator" role="multiplication" id="9" parent="19" operator="infixop,·">·</mo>' +
      '<msup type="superscript" role="latinletter" id="14" children="10,13" parent="19">' +
      '<mi type="identifier" role="latinletter" id="10" parent="14">s</mi>' +
      '<mrow type="prefixop" role="negative" id="13" children="12" content="11" parent="14">' +
      '<mo type="operator" role="subtraction" id="11" parent="13" operator="prefixop,-">-</mo>' +
      '<mn type="number" role="integer" id="12" parent="13">2</mn>' +
      '</mrow>' +
      '</msup>' +
      '</mrow>' +
      '</mrow>' +
      '</math>'
  );
};



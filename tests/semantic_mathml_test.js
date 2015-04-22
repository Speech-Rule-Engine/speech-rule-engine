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
      '<mrow type="operator" role="multiplication" id="4" children=""' +
      ' operator="infixop,⁢" parent="5"/>' +
      '<mn type="number" role="integer" id="3" parent="5">3</mn>' +
      '</math>'
  );
};




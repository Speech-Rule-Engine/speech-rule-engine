// Copyright 2013 Google Inc.
// Copyright 2014-16 Volker Sorge
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
 * @fileoverview Testcases for the semantic API.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sretest.SemanticApiTest');

goog.require('sretest.AbstractTest');
goog.require('sretest.TestExternal');



/**
 * @constructor
 * @extends {sretest.AbstractTest}
 */
sretest.SemanticApiTest = function() {
  sretest.SemanticApiTest.base(this, 'constructor');

  /**
   * @override
   */
  this.information = 'Semantic API tests.';
};
goog.inherits(sretest.SemanticApiTest, sretest.AbstractTest);


/**
 * Some test cases.
 * @type {Array.<string>}
 */
sretest.SemanticApiTest.TEST_CASES = [
  '<mn>3</mn><mfrac><mn>1</mn><mn>2</mn></mfrac><mi>a</mi>',
  '<mi>b</mi><mn>3</mn><mfrac><mn>1</mn><mn>2</mn></mfrac><mi>a</mi>',
  '<mi>a</mi><mo>=</mo><mi>b</mi><mo>=</mo><mi>c</mi>' +
      '<mo>\u2264</mo><mi>d</mi>',
  '<mi>a</mi><mo>+</mo><semantics><mi>b</mi><annotation-xml>' +
      '<content>something</content></annotation-xml></semantics>',
  '<mfenced open="(" close=")"><mtable>' +
      '<mtr><mtd><mi>n</mi></mtd></mtr>' +
      '</mtable></mfenced>',
  '<mmultiscripts><mo>|</mo><mprescripts/><mn>4</mn><mn>3</mn>' +
      '</mmultiscripts><mi>x</mi><msubsup><mo>|</mo><mn>1</mn><mn>2</mn>' +
      '</msubsup>'
];


/**
 * Tests Tree generation vs Xml output.
 */
sretest.SemanticApiTest.prototype.testTreeVsXml = function() {
  var test = goog.bind(function(expr) {
    var mml = sretest.TestExternal.sre.DomUtil.parseInput('<math>' + expr + '</math>');
    var xmls = new sretest.TestExternal.xmldom.XMLSerializer();
    this.assert.equal(xmls.serializeToString(sretest.TestExternal.sre.Semantic.getTree(mml).xml()),
                      xmls.serializeToString(sretest.TestExternal.sre.Semantic.xmlTree(mml)));
  }, this);
  sretest.SemanticApiTest.TEST_CASES.forEach(test);
};


/**
 * Tests Tree generation vs Xml output.
 */
sretest.SemanticApiTest.prototype.testStringVsXml = function() {
  var test = goog.bind(function(expr) {
    var mstr = '<math>' + expr + '</math>';
    var mml = sretest.TestExternal.sre.DomUtil.parseInput(mstr);
    var xmls = new sretest.TestExternal.xmldom.XMLSerializer();
    this.assert.equal(xmls.serializeToString(
        sretest.TestExternal.sre.Semantic.getTreeFromString(mstr).xml()),
                      xmls.serializeToString(sretest.TestExternal.sre.Semantic.xmlTree(mml)));
  }, this);
  sretest.SemanticApiTest.TEST_CASES.forEach(test);
};


/**
 * Tests Tree generation vs Xml output.
 */
sretest.SemanticApiTest.prototype.testStringVsTree = function() {
  var test = goog.bind(function(expr) {
    var mstr = '<math>' + expr + '</math>';
    var mml = sretest.TestExternal.sre.DomUtil.parseInput(mstr);
    var xmls = new sretest.TestExternal.xmldom.XMLSerializer();
    this.assert.equal(xmls.serializeToString(
        sretest.TestExternal.sre.Semantic.getTreeFromString(mstr).xml()),
                      xmls.serializeToString(sretest.TestExternal.sre.Semantic.getTree(mml).xml()));
  }, this);
  sretest.SemanticApiTest.TEST_CASES.forEach(test);
};

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

/**
 * @fileoverview Testcases for DOM and Xpath functionality.
 * @author sorge@google.com (Volker Sorge)
 */

goog.provide('sretest.DomTest');

goog.require('sretest.AbstractTest');



/**
 * @constructor
 * @extends {sretest.AbstractTest}
 */
sretest.DomTest = function() {
  sretest.DomTest.base(this, 'constructor');

  /**
   * @override
   */
  this.information = 'DOM utility tests.';
};
goog.inherits(sretest.DomTest, sretest.AbstractTest);


/**
 * Executes entity tests.
 * @param {string} xml The XML input string.
 * @param {string} result The expected output.
 */
sretest.DomTest.prototype.entitiesTest = function(xml, result) {
  var parsed = sretest.TestExternal.sre.DomUtil.parseInput(xml);
  this.assert.equal(parsed.toString(), result);
};


/**
 * XML Entities.
 */
sretest.DomTest.prototype.testXmlEntities = function() {
  this.entitiesTest('<a>&lt;</a>', '<a>&lt;</a>');
  this.entitiesTest('<a>&amp;</a>', '<a>&amp;</a>');
};


/**
 * HTML4 Entities.
 */
sretest.DomTest.prototype.testHtml4Entities = function() {
  this.entitiesTest('<a>&Eacute;</a>',
                    '<a xmlns="http://www.w3.org/1999/xhtml">É</a>');
  this.entitiesTest('<a>&Icirc;</a>',
                    '<a xmlns="http://www.w3.org/1999/xhtml">Î</a>');
};


/**
 * HTML5 Entities.
 */
sretest.DomTest.prototype.testHtml5Entities = function() {
  this.entitiesTest('<a>&ncup;</a>',
                    '<a xmlns="http://www.w3.org/1999/xhtml">⩂</a>');
  this.entitiesTest('<a>&varsubsetneq;</a>',
                    '<a xmlns="http://www.w3.org/1999/xhtml">⊊︀</a>');
  this.entitiesTest('<a>&Vfr;</a>',
                    '<a xmlns="http://www.w3.org/1999/xhtml">𝔙</a>');
};


/**
 * XPath evaluation test.
 */
sretest.DomTest.prototype.testXpathEvaluate = function() {
  var xml = sretest.TestExternal.sre.DomUtil.parseInput('<a><b>c</b><d>e</d></a>');
  this.assert.equal(sretest.TestExternal.sre.XpathUtil.evalXPath('//b', xml).toString(), '<b>c</b>');
  this.assert.equal(sretest.TestExternal.sre.XpathUtil.evalXPath('//b/text()', xml).toString(), 'c');
  this.assert.equal(
      sretest.TestExternal.sre.XpathUtil.evalXPath('//b/following-sibling::*', xml).toString(),
      '<d>e</d>');
};


/**
 * XPath boolean constraint test.
 */
sretest.DomTest.prototype.testXpathBoolean = function() {
  var xml = sretest.TestExternal.sre.DomUtil.parseInput('<a><b>c</b><d>e</d></a>');
  this.assert.equal(sretest.TestExternal.sre.XpathUtil.evaluateBoolean('//b', xml), true);
  this.assert.equal(sretest.TestExternal.sre.XpathUtil.evaluateBoolean('//c', xml), false);
  this.assert.equal(sretest.TestExternal.sre.XpathUtil.evaluateBoolean(
      '//b/following-sibling::*', xml), true);
};


/**
 * XPath string computation.
 */
sretest.DomTest.prototype.testXpathString = function() {
  var xml = sretest.TestExternal.sre.DomUtil.parseInput('<a l="1"><b m="2">c</b><d>e</d></a>');
  this.assert.equal(sretest.TestExternal.sre.XpathUtil.evaluateString('@l', xml), '1');
  this.assert.equal(sretest.TestExternal.sre.XpathUtil.evaluateString('//*/@m', xml), '2');
  this.assert.equal(sretest.TestExternal.sre.XpathUtil.evaluateString(
      '//b/following-sibling::*', xml), 'e');
};

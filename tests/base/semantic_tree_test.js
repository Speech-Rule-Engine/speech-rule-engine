// Copyright 2013 Google Inc.
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
 * @fileoverview Testcases for the semantic tree.
 * @author sorge@google.com (Volker Sorge)
 */

goog.provide('sre.SemanticTreeTest');
goog.provide('sre.SemanticTest');

goog.require('sre.AbstractExamples');
goog.require('sre.AbstractTest');
goog.require('sre.DomUtil');
goog.require('sre.SemanticAttr');
goog.require('sre.SemanticTree');
goog.require('sre.SemanticUtil');
goog.require('sre.SystemExternal');
goog.require('sre.TestUtil');
goog.require('sre.XpathUtil');


/**
 * Base class for all the semantic tree related tests.
 * @constructor
 * @extends {sre.AbstractExamples}
 * @param {string} tests The json file with expected output and tests.
 * @param {string=} opt_base The file with basic tests.
 */
sre.SemanticTest = function(tests, opt_base) {
  sre.SemanticTest.base(this, 'constructor', tests, opt_base);
};
goog.inherits(sre.SemanticTest, sre.AbstractExamples);


/**
 * @override
 */
sre.SemanticTest.prototype.pick = function(json) {
  return [json.mathml];
};


sre.SemanticTest.prototype.prepare = function() {
  sre.SemanticTest.base(this, 'prepare');
  let [tests, warn] = sre.TestUtil.combineTests(
    this.jsonTests.tests, this.jsonTests.tests, []);
  this.inputTests = tests;
  if (warn.length) {
    throw new sre.TestUtil.Error('Missing Results', warn);
  }
};


/**
 * @override
 */
sre.SemanticTest.prototype.method = function(var_args) {
  let args = Array.prototype.slice.call(arguments, 0);
  this.executeTest(args[0], args[1]);
};


/**
 * Executes a single test. This is called by the method.
 * @param {string} input The input element.
 * @param {string} expected The expected output.
 */
sre.SemanticTest.prototype.executeTest = goog.abstractMethod;


/**
 * @constructor
 * @extends {sre.AbstractTest}
 */
sre.SemanticTreeTest = function() {
  sre.SemanticTreeTest.base(this, 'constructor');

  /**
   * @override
   */
  this.information = 'Semantic tree tests.';

  /**
   * @type {Object.<sre.SemanticAnnotator>}
   */
  this.annotations = null;

  /**
   * @type {Object.<sre.SemanticVisitor>}
   */
  this.visitors = null;

};
goog.inherits(sre.SemanticTreeTest, sre.AbstractTest);


/**
 * @override
 */
sre.SemanticTreeTest.prototype.setUpTest = function() {
  this.xpathBlacklist = [];
  this.brief = true;
  this.annotations = sre.SemanticAnnotations.getInstance().annotators;
  this.visitors = sre.SemanticAnnotations.getInstance().visitors;
  sre.SemanticAnnotations.getInstance().annotators = {};
  sre.SemanticAnnotations.getInstance().visitors = {};
  sre.SemanticTreeTest.setupAttributes();
};


/**
 * @override
 */
sre.SemanticTreeTest.prototype.tearDownTest = function() {
  sre.SemanticAnnotations.getInstance().annotators = this.annotations;
  sre.SemanticAnnotations.getInstance().visitors = this.visitors;
};


/**
 * Adds some unicode characters via hex code to the right category.
 *
 * This method is necessary as the test framework can not handle code containing
 * utf-8 encoded characters.
 */
sre.SemanticTreeTest.setupAttributes = function() {
  var attr = sre.SemanticAttr.getInstance();
  attr.neutralFences.unshift(sre.SemanticUtil.numberToUnicode(0x00A6));
  attr.dashes.unshift(sre.SemanticUtil.numberToUnicode(0x2015));
  attr.neutralFences.unshift(sre.SemanticUtil.numberToUnicode(0x2016));
  attr.arrows.unshift(sre.SemanticUtil.numberToUnicode(0x2192));
  attr.sumOps.unshift(sre.SemanticUtil.numberToUnicode(0x2211));
  attr.additions.unshift(sre.SemanticUtil.numberToUnicode(0x2213));
  attr.multiplications.unshift(sre.SemanticUtil.numberToUnicode(0x2218));
  attr.intOps.unshift(sre.SemanticUtil.numberToUnicode(0x222B));
  attr.inequalities.unshift(sre.SemanticUtil.numberToUnicode(0x2264));
  attr.additions.unshift(sre.SemanticUtil.numberToUnicode(0x2295));
  var open = sre.SemanticUtil.numberToUnicode(0x3008);
  var close = sre.SemanticUtil.numberToUnicode(0x3009);
  attr.openClosePairs[open] = close;
  attr.leftFences.unshift(open);
  attr.rightFences.unshift(close);
};


/**
 * Removes XML nodes according to the XPath elements in the blacklist.
 * @param {Node} xml Xml representation of the semantic node.
 */
sre.SemanticTreeTest.prototype.customizeXml = function(xml) {
  this.xpathBlacklist.forEach(
      function(xpath) {
        var removes = sre.XpathUtil.evalXPath(xpath, xml);
        removes.forEach(
            function(node) {
              node.parentNode.removeChild(node);
            });
      });
};


/**
 * Tests if for a given mathml snippet results in a particular semantic tree.
 * @param {string} mml MathML expression.
 * @param {string} sml XML snippet for the semantic tree.
 */
sre.SemanticTreeTest.prototype.executeTreeTest = function(mml, sml) {
  var mathMl = '<math xmlns="http://www.w3.org/1998/Math/MathML">' +
          mml + '</math>';
  var node = sre.DomUtil.parseInput(mathMl);
  var sxml = new sre.SemanticTree(node).xml(this.brief);
  this.customizeXml(sxml);
  var dp = new sre.SystemExternal.xmldom.DOMParser();
  var xml = dp.parseFromString('<stree>' + sml + '</stree>', 'text/xml');
  var xmls = new sre.SystemExternal.xmldom.XMLSerializer();
  this.assert.equal(xmls.serializeToString(xml), xmls.serializeToString(sxml));
};



sre.SemanticTest.tests = function() {
  return [new sre.SemanticTest('./json/base/stree.json')];
};

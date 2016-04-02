// Copyright (c) 2016 Volker Sorge
// Copyright (c) 2016 The MathJax Consortium
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
 * @fileoverview Testcases for prefix speech generation in MathML enrichment.
 * 
 * @author v.sorge@mathjax.org (Volker Sorge)
 */

goog.provide('sre.PrefixRuleTest');

goog.require('sre.AbstractTest');



/**
 * @constructor
 * @extends {sre.AbstractTest}
 */
sre.PrefixRuleTest = function() {
  goog.base(this);

  /**
   * @override
   */
  this.information = 'Prefix rule tests.';

};
goog.inherits(sre.PrefixRuleTest, sre.AbstractTest);



/**
 * Executes the prefix rule tests.
 * @param {string} expr The semantic tree as an XML string.
 * @param {number} id The id of the node to be considered.
 * @param {string} result The expected result.
 */
sre.PrefixRuleTest.prototype.executeTest = function(expr, id, result) {
  var xml = sre.DomUtil.parseInput('<stree>' + expr + '</stree>',
                                   sre.EnrichMathml.Error);
  var node = sre.XpathUtil.evalXPath('.//*[@id="' + id + '"]', xml)[0];
  if (!node) {
    this.assert.fail();
    return;
  }
  var descrs = sre.EnrichMathml.computePrefix(node);
  var speech = sre.AuditoryDescription.speechString(descrs);
  this.assert.equal(speech, result);
};


sre.PrefixRuleTest.prototype.setUpTest = function() {
  sre.System.getInstance().setupEngine(
      {speech: true});
};


sre.PrefixRuleTest.prototype.tearDownTest = function() {
  sre.System.getInstance().setupEngine(
      {speech: false});
};


/**
 * Testing sub/superscripts.
 */
sre.PrefixRuleTest.prototype.testSubSuper = function() {
  this.executeTest('<subscript id="2"><children>' +
                   '<identifier id="1">a</identifier>' +
                   '<identifier id="0">b</identifier>' +
                   '</children></subscript>',
                   1, 'base');
  this.executeTest('<subscript id="2"><children>' +
                   '<identifier id="1">a</identifier>' +
                   '<identifier id="0">b</identifier>' +
                   '</children></subscript>',
                   0, 'subscript');
  this.executeTest('<superscript id="2"><children>' +
                   '<identifier id="1">a</identifier>' +
                   '<identifier id="0">b</identifier>' +
                   '</children></superscript>',
                   1, 'base');
  this.executeTest('<superscript id="2"><children>' +
                   '<identifier id="1">a</identifier>' +
                   '<identifier id="0">b</identifier>' +
                   '</children></superscript>',
                   0, 'exponent');
};


/**
 * Testing over/underscripts.
 */
sre.PrefixRuleTest.prototype.testOverUnder = function() {
  this.executeTest('<overscore id="2"><children>' +
                   '<identifier id="1">a</identifier>' +
                   '<identifier id="0">b</identifier>' +
                   '</children></overscore>',
                   1, 'base');
  this.executeTest('<overscore id="2"><children>' +
                   '<identifier id="1">a</identifier>' +
                   '<identifier id="0">b</identifier>' +
                   '</children></overscore>',
                   0, 'overscript');
  this.executeTest('<underscore id="2"><children>' +
                   '<identifier id="1">a</identifier>' +
                   '<identifier id="0">b</identifier>' +
                   '</children></underscore>',
                   1, 'base');
  this.executeTest('<underscore id="2"><children>' +
                   '<identifier id="1">a</identifier>' +
                   '<identifier id="0">b</identifier>' +
                   '</children></underscore>',
                   0, 'underscript');
};


/**
 * Testing fractions.
 */
sre.PrefixRuleTest.prototype.testFractions = function() {
  this.executeTest('<fraction id="2"><children>' +
                   '<identifier id="1">a</identifier>' +
                   '<identifier id="0">b</identifier>' +
                   '</children></fraction>',
                   1, 'numerator');
  this.executeTest('<fraction id="2"><children>' +
                   '<identifier id="1">a</identifier>' +
                   '<identifier id="0">b</identifier>' +
                   '</children></fraction>',
                   0, 'denominator');
};


/**
 * Testing roots.
 */
sre.PrefixRuleTest.prototype.testRoots = function() {
  this.executeTest('<sqrt id="1"><children>' +
                   '<identifier id="0">a</identifier>' +
                   '</children></sqrt>',
                   0, 'radicand');
  this.executeTest('<root id="2"><children>' +
                   '<identifier id="1">a</identifier>' +
                   '<identifier id="0">b</identifier>' +
                   '</children></root>',
                   0, 'radicand');
  this.executeTest('<root id="2"><children>' +
                   '<identifier id="1">a</identifier>' +
                   '<identifier id="0">b</identifier>' +
                   '</children></root>',
                   1, 'index');
};

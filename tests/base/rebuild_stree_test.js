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
 * @fileoverview Testcases for reconstructing semantic trees from enriched
 *    mathml.
 * @author v.sorge@mathjax.org (Volker Sorge)
 */

goog.provide('sre.RebuildStreeTest');

goog.require('sre.AbstractJsonTest');
goog.require('sre.DomUtil');
goog.require('sre.Enrich');
goog.require('sre.RebuildStree');
goog.require('sre.SemanticTree');
goog.require('sre.TestUtil');



/**
 * @constructor
 * @extends {sre.AbstractJsonTest}
 */
sre.RebuildStreeTest = function(file) {
  sre.RebuildStreeTest.base(this, 'constructor', file);

  /**
   * @override
   */
  this.information = 'Semantic tree rebuilding tests.';

};
goog.inherits(sre.RebuildStreeTest, sre.AbstractJsonTest);


/**
 * Tests if for a given mathml snippet results in a particular semantic tree.
 * @param {string} expr MathML expression.
 */
sre.RebuildStreeTest.prototype.executeRebuildTest = function(expr) {
  var mathMl = sre.Enrich.prepareMmlString(expr);
  var mml = sre.DomUtil.parseInput(mathMl);
  var stree = new sre.SemanticTree(mml);
  var emml = sre.EnrichMathml.enrich(mml, stree);
  var reass = (new sre.RebuildStree(emml)).getTree();

  this.assert.equal(stree.toString(), reass.toString());
};


/**
 * @override
 */
sre.RebuildStreeTest.prototype.pick = function(json) {
  return [json.mathml];
};


sre.RebuildStreeTest.prototype.prepare = function() {
  sre.RebuildStreeTest.base(this, 'prepare');
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
sre.RebuildStreeTest.prototype.method = function(var_args) {
  let args = Array.prototype.slice.call(arguments, 0);
  this.executeRebuildTest(args[0]);
};


sre.RebuildStreeTest.tests = function() {
  return [new sre.RebuildStreeTest('./json/base/stree.json')];
};

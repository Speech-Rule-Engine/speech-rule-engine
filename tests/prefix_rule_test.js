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

goog.require('sre.AbstractRuleTest');
goog.require('sre.DynamicCstr');
goog.require('sre.Semantic');
goog.require('sre.SpeechGeneratorUtil');



/**
 * @constructor
 * @extends {sre.AbstractRuleTest}
 */
sre.PrefixRuleTest = function() {
  sre.PrefixRuleTest.base(this, 'constructor');

  /**
   * @override
   */
  this.information = 'Prefix rule tests.';

  /**
   * @override
   */
  this.modality = 'prefix';

  /**
   * @type {number}
   */
  this.id = 0;

  /**
   * @type {Element}
   */
  this.subExpr = null;
};
goog.inherits(sre.PrefixRuleTest, sre.AbstractRuleTest);


/**
 * Executes the prefix rule tests.
 * @param {string} expr The semantic tree as an XML string.
 * @param {number} id The id of the node to be considered.
 * @param {string} result The expected result.
 */
sre.PrefixRuleTest.prototype.executeTest = function(expr, id, result) {
  this.id = id;
  this.executeRuleTest(expr, result);
};


/**
 * @override
 */
sre.PrefixRuleTest.prototype.getSpeech = function(mml) {
  var stree = sre.Semantic.getTreeFromString(mml);
  var node = stree.root.querySelectorAll(
      goog.bind(function(x) {return x.id === this.id;}, this))[0];
  this.subExpr = node.mathmlTree;
  if (!node) {
    this.assert.fail();
    return '';
  }
  return sre.SpeechGeneratorUtil.retrievePrefix(node);
};


/**
 * @override
 */
sre.PrefixRuleTest.prototype.appendRuleExample = function(
    input, output, style, rest) {
  var sub = this.subExpr ? '<math>' + this.subExpr.toString() + '</math>' : '';
  sre.PrefixRuleTest.base(
      this, 'appendRuleExample', input, output, style, [sub]);
};



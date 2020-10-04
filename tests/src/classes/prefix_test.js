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

goog.provide('sretest.PrefixTest');

goog.require('sretest.SpeechTest');



/**
 * @constructor
 * @extends {sretest.SpeechTest}
 */
sretest.PrefixTest = function() {
  sretest.PrefixTest.base(this, 'constructor');

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

  this.pickFields[2] = 'id';
};
goog.inherits(sretest.PrefixTest, sretest.SpeechTest);


/**
 * @override
 */
sretest.PrefixTest.prototype.method = function(var_args) {
  let args = Array.prototype.slice.call(arguments, 0);
  this.id = args[2];
  sretest.PrefixTest.base(this, 'method', args[0], args[1]);
};


/**
 * @override
 */
sretest.PrefixTest.prototype.getSpeech = function(mml) {
  var stree = sretest.TestExternal.sre.Semantic.getTreeFromString(mml);
  var node = stree.root.querySelectorAll(
      goog.bind(function(x) {return x.id === this.id;}, this))[0];
  this.subExpr = node.mathmlTree;
  if (!node) {
    this.assert.fail();
    return '';
  }
  return sretest.TestExternal.sre.SpeechGeneratorUtil.retrievePrefix(node);
};


/**
 * @override
 */
sretest.PrefixTest.prototype.appendRuleExample = function(
    input, output, style, rest) {
  var sub = this.subExpr ? '<math>' + this.subExpr.toString() + '</math>' : '';
  sretest.PrefixTest.base(
      this, 'appendRuleExample', input, output, style, [sub]);
};

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

goog.provide('sre.EnrichSpeechTest');

goog.require('sre.AbstractJsonTest');
goog.require('sre.Engine');
goog.require('sre.Enrich');
goog.require('sre.System');
goog.require('sre.WalkerUtil');
goog.require('sre.TestUtil');



/**
 * @constructor
 * @extends {sre.AbstractJsonTest}
 */
sre.EnrichSpeechTest = function(file) {
  sre.EnrichSpeechTest.base(this, 'constructor', file);

  /**
   * @override
   */
  this.information = 'Tests API consistency for speech generation.';
};
goog.inherits(sre.EnrichSpeechTest, sre.AbstractJsonTest);


/**
 * @override
 */
sre.EnrichSpeechTest.prototype.setUpTest = function() {
  sre.System.getInstance().setupEngine(
      {domain: 'mathspeak',
        style: 'default',
        speech: sre.Engine.Speech.SHALLOW
      });
};


/**
 * @override
 */
sre.EnrichSpeechTest.prototype.tearDownTest = function() {
  sre.System.getInstance().setupEngine(
      {domain: 'default',
        style: 'default',
        speech: sre.Engine.Speech.NONE
      });
};


/**
 * Tests if speech strings computed directly for a MathML expression are
 * equivalent to those computed for enriched expressions.
 * @param {string} expr MathML expression.
 */
sre.EnrichSpeechTest.prototype.executeSpeechTest = function(expr) {
  var mml = sre.Enrich.prepareMmlString(expr);
  var sysSpeech = sre.System.getInstance().toSpeech(mml);
  var enr = sre.WalkerUtil.getSemanticRoot(
      sre.System.getInstance().toEnriched(mml));
  var enrSpeech = enr.getAttribute(sre.EnrichMathml.Attribute.SPEECH);
  this.assert.equal(sysSpeech, enrSpeech);
};


/**
 * @override
 */
sre.EnrichSpeechTest.prototype.pick = function(json) {
  return [json.mathml];
};


sre.EnrichSpeechTest.prototype.prepare = function() {
  sre.EnrichSpeechTest.base(this, 'prepare');
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
sre.EnrichSpeechTest.prototype.method = function(var_args) {
  let args = Array.prototype.slice.call(arguments, 0);
  this.executeSpeechTest(args[0]);
};


sre.EnrichSpeechTest.tests = function() {
  return [new sre.EnrichSpeechTest('./json/base/stree.json')];
};

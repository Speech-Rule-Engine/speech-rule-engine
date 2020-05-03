// Copyright 2016-18 Volker Sorge
// Copyright (c) 2016-18 Progressive Accessibility Solutions
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
 * @fileoverview Tests for walkers with various markup.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.WalkerMarkupTest');

goog.require('sre.AbstractTest');
goog.require('sre.DomUtil');
goog.require('sre.Engine');
goog.require('sre.SpeechGeneratorFactory');
goog.require('sre.System');
goog.require('sre.WalkerFactory');



/**
 * @constructor
 * @extends {sre.AbstractTest}
 */
sre.WalkerMarkupTest = function() {
  sre.WalkerMarkupTest.base(this, 'constructor');

  this.information = 'Walker with different markup test.';

  /**
   * @type {!sre.System}
   */
  this.system = sre.System.getInstance();

  this.div = sre.DomUtil.parseInput(sre.WalkerMarkupTest.DIV_RENDERED);

  // this.mml = sre.DomUtil.parseInput(sre.WalkerMarkupTest.DIV_MML);

  this.walker = null;

};
goog.inherits(sre.WalkerMarkupTest, sre.AbstractTest);


/**
 * @override
 */
sre.WalkerMarkupTest.prototype.setUpTest = function() {
  this.system.setupEngine(
      {semantics: true, locale: 'en', domain: 'default', style: 'short',
        speech: sre.Engine.Speech.NONE});
};


/**
 * @override
 */
sre.WalkerMarkupTest.prototype.tearDownTest = function() {
  this.system.setupEngine(
      {semantics: false, domain: 'default', style: 'short',
        markup: sre.Engine.Markup.NONE, speech: sre.Engine.Speech.NONE});
  // TODO: Reset the rule sets.
};


/**
 * @type {string}
 */
sre.WalkerMarkupTest.DIV_MML =
    '<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">' +
    '<mfrac><mi>x</mi><mi>y</mi></mfrac></math>';


/**
 * @type {string}
 */
sre.WalkerMarkupTest.DIV_RENDERED =
    '<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">' +
    '<mfrac data-semantic-type="fraction" data-semantic-role="division"' +
    ' data-semantic-id="2" data-semantic-children="0,1">' +
    '<mi data-semantic-type="identifier" data-semantic-role="latinletter"' +
    ' data-semantic-font="italic" data-semantic-id="0"' +
    ' data-semantic-parent="2">x</mi>' +
    '<mi data-semantic-type="identifier" data-semantic-role="latinletter"' +
    ' data-semantic-font="italic" data-semantic-id="1"' +
    ' data-semantic-parent="2">y</mi></mfrac></math>';


/**
 * Executes single walker moves and tests the resulting speech.
 * @param {?string} move The move of the walker.
 * @param {?(string)} result The expected result.
 * @private
 */
sre.WalkerMarkupTest.prototype.executeTest_ = function(move, result) {
  console.log('Move: ' + move);
  if (move) {
    this.walker.move(sre.EventUtil.KeyCode[move]);
  }
  this.assert.equal(this.walker.speech(), result);
};


/**
 * Starts the walker on the current node.
 * @private
 */
sre.WalkerMarkupTest.prototype.startWalker_ = function() {
  this.walker = sre.WalkerFactory.walker(
      'Syntax', this.div, sre.SpeechGeneratorFactory.generator('Node'),
      /** @type {!sre.Highlighter} */(sre.HighlighterFactory.highlighter(
      {color: 'black'}, {color: 'white'}, {renderer: 'NativeMML'})),
      sre.WalkerMarkupTest.DIV_RENDERED);
};


/**
 * Runs a sequence of move tests on the current node.
 * @param {sre.Engine.Markup} markup The markup that is used for the results.
 * @private
 */
sre.WalkerMarkupTest.prototype.runMoveTests_ = function(markup) {
  sre.Engine.getInstance().markup = markup;
  this.startWalker_();
  this.executeTest_(null,
      'x equals StartFraction negative b plus or minus StartRoot' +
      ' b squared minus 4 a c EndRoot Over 2 a EndFraction');
  this.executeTest_('X', 'equality');
  this.executeTest_('DOWN', 'x');
  this.executeTest_('RIGHT',
      'equals StartFraction negative b plus or minus StartRoot' +
      ' b squared minus 4 a c EndRoot Over 2 a EndFraction');
};


/**
 * Tests for SSML markup.
 */
sre.WalkerMarkupTest.prototype.untestSsml = function() {
  this.runMoveTests_(sre.Engine.Markup.SSML);
};

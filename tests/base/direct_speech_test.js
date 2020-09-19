// Copyright 2020 Volker Sorge
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
 * @fileoverview Testcases for direct speech integration.
 * @author Volker.Sorge@mathjax.org (Volker Sorge)
 */

goog.provide('sre.DirectSpeechTest');

goog.require('sre.AbstractRuleTest');



/**
 * @constructor
 * @extends {sre.AbstractRuleTest}
 */
sre.DirectSpeechTest = function() {
  sre.DirectSpeechTest.base(this, 'constructor');

  /**
   * @override
   */
  this.information = 'Tests for Direct speech attributes.';

  this.setActive('DirectSpeech');
};
goog.inherits(sre.DirectSpeechTest, sre.AbstractRuleTest);


/**
 * Testing Aria Labels.
 */
sre.DirectSpeechTest.prototype.testAriaLabels = function() {
  var mml = '<mover> <mi>AC</mi> <mo stretchy="true" aria-label="line">↔</mo> </mover>';
  this.domain = 'mathspeak';
  this.executeRuleTest(mml, 'ModifyingAbove upper A upper C With line');
  this.domain = 'clearspeak';
  this.executeRuleTest(mml, 'AC line');
  mml = '<mover aria-label="derivative of x"><mi>x</mi><mo>&#x02D9;<!-- ˙ --></mo>' +
      '</mover><mi></mi><mo aria-label="is equal to">=</mo>' +
      '<mi aria-label="sigma">&#x03C3;<!-- σ --></mi><mrow>' +
      '<mo aria-label="left parenthesis" stretchy="false">(</mo>' +
      '<mi aria-label="y">y</mi><mo aria-label="minus">&#x2212;<!-- − --></mo>' +
      '<mi aria-label="x">x</mi>' +
      '<mo aria-label="right parenthesis" stretchy="false">)</mo></mrow>';
  this.domain = 'mathspeak';
  this.executeRuleTest(mml, 'derivative of x is equal to sigma left parenthesis y minus x right parenthesis');
  this.domain = 'clearspeak';
  this.executeRuleTest(mml, 'derivative of x is equal to sigma times left parenthesis y minus x right parenthesis');
};


/**
 * Testing Alt Text.
 */
sre.DirectSpeechTest.prototype.testAltText = function() {
  var mml = '<math alt="A C under line"><mover> <mi>AC</mi>' +
      ' <mo stretchy="true">↔</mo> </mover></math>';
  this.domain = 'mathspeak';
  this.executeRuleTest(mml, 'A C under line');
  this.domain = 'clearspeak';
  this.executeRuleTest(mml, 'A C under line');
  mml = '<mover> <mi>AC</mi>' +
      ' <mo stretchy="true" alt="line">↔</mo> </mover>';
  this.domain = 'mathspeak';
  this.executeRuleTest(mml, 'ModifyingAbove upper A upper C With line');
  this.domain = 'clearspeak';
  this.executeRuleTest(mml, 'AC line');
};


/**
 * Testing Exact Speech.
 */
sre.DirectSpeechTest.prototype.testExactSpeech = function() {
  var mml = '<math exact-speech="A C under line"><mover> <mi>AC</mi>' +
      ' <mo stretchy="true">↔</mo> </mover></math>';
  this.domain = 'mathspeak';
  this.executeRuleTest(mml, 'A C under line');
  this.domain = 'clearspeak';
  this.executeRuleTest(mml, 'A C under line');
  mml = '<mover> <mi>AC</mi>' +
      ' <mo stretchy="true" exact-speech="line">↔</mo> </mover>';
  this.domain = 'mathspeak';
  this.executeRuleTest(mml, 'ModifyingAbove upper A upper C With line');
  this.domain = 'clearspeak';
  this.executeRuleTest(mml, 'AC line');
};


/**
 * Testing mglpyhs in tokens.
 */
sre.DirectSpeechTest.prototype.testMglyphTokens = function() {
  this.domain = 'mathspeak';
  // mi
  var mml = '<mi><mglyph src="my-glyph.png" alt="my glyph"/></mi>';
  this.executeRuleTest(mml, 'my glyph');
  mml = '<mi aria-label="your glyph"><mglyph src="my-glyph.png" alt="my glyph"/></mi>';
  this.executeRuleTest(mml, 'your glyph');
  // mo
  mml = '<mo><mglyph src="my-glyph.png" alt="my glyph"/></mo>';
  this.executeRuleTest(mml, 'my glyph');
  mml = '<mo aria-label="your glyph"><mglyph src="my-glyph.png" alt="my glyph"/></mo>';
  this.executeRuleTest(mml, 'your glyph');
  // mn
  mml = '<mn><mglyph src="my-glyph.png" alt="my glyph"/></mn>';
  this.executeRuleTest(mml, 'my glyph');
  mml = '<mn aria-label="your glyph"><mglyph src="my-glyph.png" alt="my glyph"/></mn>';
  this.executeRuleTest(mml, 'your glyph');
  // mtext
  mml = '<mtext><mglyph src="my-glyph.png" alt="my glyph"/></mtext>';
  this.executeRuleTest(mml, 'my glyph');
  mml = '<mtext aria-label="your glyph"><mglyph src="my-glyph.png" alt="my glyph"/></mtext>';
  this.executeRuleTest(mml, 'your glyph');
  // ms
  mml = '<ms><mglyph src="my-glyph.png" alt="my glyph"/></ms>';
  this.executeRuleTest(mml, 'my glyph');
  mml = '<ms aria-label="your glyph"><mglyph src="my-glyph.png" alt="my glyph"/></ms>';
  this.executeRuleTest(mml, 'your glyph');
};


/**
 * Testing mglpyhs.
 */
sre.DirectSpeechTest.prototype.testMglyphGeneral = function() {
  this.domain = 'mathspeak';
  var mml = '<mi><mglyph src="my-braid-23.png" alt="23braid"/></mi>' +
      '<mo>+</mo><mi><mglyph src="my-braid-132.png" alt="132braid"/></mi>' +
      '<mo>=</mo><mi><mglyph src="my-braid-13.png" alt="13braid"/></mi>';
  this.executeRuleTest(mml, '23braid plus 132braid equals 13braid');
  mml = '<mrow><mi>N</mi><msub><mi>M</mi><mrow class="MJX-TeXAtom-ORD">' +
      '<mn>1</mn><mo>⊂</mo><mrow class="MJX-TeXAtom-VCENTER">' +
      '<mglyph src="Images/img64cf9bc6538bb7137dab7b360f92afb4.svg" width="13pt"' +
      ' height="6pt" alt="mfin"></mglyph></mrow></mrow></msub></mrow>';
  this.executeRuleTest(mml, 'upper N upper M Subscript 1 subset of mfin');
};

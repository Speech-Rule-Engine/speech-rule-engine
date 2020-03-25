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

goog.require('sre.AbstractTest');
goog.require('sre.Engine');
goog.require('sre.Enrich');
goog.require('sre.System');
goog.require('sre.WalkerUtil');



/**
 * @constructor
 * @extends {sre.AbstractTest}
 */
sre.EnrichSpeechTest = function() {
  sre.EnrichSpeechTest.base(this, 'constructor');

  /**
   * @override
   */
  this.information = 'Tests API consistency for speech generation.';
};
goog.inherits(sre.EnrichSpeechTest, sre.AbstractTest);


/**
 * @override
 */
sre.EnrichSpeechTest.prototype.setUpTest = function() {
  sre.System.getInstance().setupEngine(
      {domain: 'mathspeak',
        style: 'default',
        speech: sre.Engine.Speech.SHALLOW,
        semantics: true});
};


/**
 * @override
 */
sre.EnrichSpeechTest.prototype.tearDownTest = function() {
  sre.System.getInstance().setupEngine(
      {domain: 'default',
        style: 'short',
        speech: sre.Engine.Speech.NONE,
        semantics: false});
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


// Empty wrappers.
/**
 * Test for empty wrapping elements.
 */
sre.EnrichSpeechTest.prototype.testSpeechWrappers = function() {
  this.executeSpeechTest(
      '<mrow><mrow><mi>a</mi></mrow></mrow><mrow><mi>b</mi></mrow>');
  this.executeSpeechTest(
      '<mstyle><mi>q</mi><mpadded><mstyle><mrow><mi>x</mi><mo>+</mo>' +
      '</mrow></mstyle><mpadded><mrow><mi>a</mi></mrow><mrow><mi>a</mi>' +
      '</mrow></mpadded><mtext>nix</mtext></mpadded></mstyle>');
  this.executeSpeechTest(
      '<mrow class="MJX-TeXAtom-ORD"><mo stretchy="false">|</mo></mrow>' +
      '<mi>x</mi>' +
      '<mrow class="MJX-TeXAtom-ORD"><mo stretchy="false">|</mo></mrow>');
};


// Sub, Superscripts.
/**
 * Test for sub super and subsuper scripts.
 */
sre.EnrichSpeechTest.prototype.testSpeechScripts = function() {
  this.executeSpeechTest(
      '<msub><mi>a</mi><mi>b</mi></msub>');
  this.executeSpeechTest(
      '<msubsup><mi>a</mi><mi>b</mi><mi>c</mi></msubsup>');
  this.executeSpeechTest(
      '<mphantom/><msub><mi>a</mi><mpadded><mi>b</mi></mpadded></msub>' +
      '<merror/>');
  this.executeSpeechTest(
      '<mphantom/><msup><mi>a</mi><mpadded><mi>b</mi></mpadded></msup>' +
      '<merror/>');
  this.executeSpeechTest(
      '<mphantom/><msubsup><mi>a</mi><mpadded><mi>b</mi></mpadded>' +
      '<mpadded><mi>c</mi></mpadded></msubsup><merror/>');
  this.executeSpeechTest(
      '<mphantom/><msubsup><mpadded><mi>a</mi></mpadded><mi>b</mi>' +
      '<mpadded><mi>c</mi></mpadded></msubsup><merror/>');
  this.executeSpeechTest(
      '<mphantom/><msubsup><mi>a</mi><mpadded><mi>b</mi><mi>d</mi></mpadded>' +
      '<mpadded><mi>c</mi></mpadded></msubsup><merror/>');
};


// Numbers.
/**
 * Test number representations.
 */
sre.EnrichSpeechTest.prototype.testSpeechNumbers = function() {
  this.executeSpeechTest(
      '<mn>2</mn>');
  this.executeSpeechTest(
      '<mn>2.0</mn>');
  this.executeSpeechTest(
      '<mn>2t3</mn>');
  this.executeSpeechTest(
      '<mfrac><mn>1</mn><mn>2</mn></mfrac>');
  this.executeSpeechTest(
      '<mfrac><mn>1</mn><mn>2.5</mn></mfrac>');
};


/**
 * Test mixed number representations.
 */
sre.EnrichSpeechTest.prototype.testSpeechMixedNumbers = function() {
  this.executeSpeechTest(
      '<mn>3</mn><mfrac><mn>1</mn><mn>2</mn></mfrac>');
  this.executeSpeechTest(
      '<mfrac><mn>1</mn><mn>2</mn></mfrac><mn>3</mn>');
  this.executeSpeechTest(
      '<mn>3.0</mn><mfrac><mn>1</mn><mn>2</mn></mfrac>');
  this.executeSpeechTest(
      '<mfrac><mn>1</mn><mn>2</mn></mfrac><mn>3.0</mn>');
  this.executeSpeechTest(
      '<mn>3</mn><mfrac><mn>1</mn><mn>2</mn></mfrac><mi>a</mi>');
  this.executeSpeechTest(
      '<mi>b</mi><mn>3</mn><mfrac><mn>1</mn><mn>2</mn></mfrac><mi>a</mi>');
};


// Fractions.
/**
 * Test (nested) fraction representations.
 */
sre.EnrichSpeechTest.prototype.testSpeechFractions = function() {
  this.executeSpeechTest(
      '<mfrac><mi>a</mi><mi>b</mi></mfrac>');
  this.executeSpeechTest(
      '<mfrac><mi>a</mi><mfrac><mi>b</mi><mi>c</mi></mfrac></mfrac>');
  this.executeSpeechTest(
      '<mfrac><mfrac><mi>a</mi><mi>b</mi></mfrac><mi>c</mi></mfrac>');
};


// Relations.
/**
 * Test relation trees.
 */
sre.EnrichSpeechTest.prototype.testSpeechRelations = function() {
  this.executeSpeechTest(
      '<mo>=</mo>');
  this.executeSpeechTest(
      '<mi>a</mi><mo>=</mo><mi>b</mi>');
  this.executeSpeechTest(
      '<mi>a</mi><mo>=</mo><mi>b</mi><mo>=</mo><mi>c</mi>');
  this.executeSpeechTest(
      '<mi>a</mi><mo>=</mo><mi>b</mi><mo>=</mo><mi>c</mi>' +
      '<mo>&#x2264;</mo><mi>d</mi>');
};


// Operators.
/**
 * Test operator trees with pre- and postfixes.
 */
sre.EnrichSpeechTest.prototype.testSpeechPrePostfixOperators = function() {
  // Pathological operator only case.
  this.executeSpeechTest(
      '<mo>+</mo><mo>-</mo><mo>+</mo>');
  // Single identifier with prefixes.
  this.executeSpeechTest(
      '<mo>+</mo><mo>+</mo><mi>a</mi>');
  // Single identifier with prefix and negative.
  this.executeSpeechTest(
      '<mo>+</mo><mo>-</mo><mi>a</mi>');
  // Single identifier with postfixes.
  this.executeSpeechTest(
      '<mi>a</mi><mo>+</mo><mo>-</mo>');
  // Single identifier with pre- and postfixes.
  this.executeSpeechTest(
      '<mo>+</mo><mo>+</mo><mi>a</mi><mo>+</mo><mo>+</mo>');
  // Single identifier with mixed pre- and postfixes.
  this.executeSpeechTest(
      '<mo>&#x2213;</mo><mo>+</mo><mi>a</mi><mo>&#x2213;</mo><mo>+</mo>');
  // Two identifiers with pre- and postfixes.
  this.executeSpeechTest(
      '<mo>+</mo><mo>+</mo><mi>a</mi><mo>&#x2213;</mo><mo>+</mo>' +
      '<mi>b</mi><mo>+</mo>');
  // Three identifiers with pre- and postfixes.
  this.executeSpeechTest(
      '<mo>+</mo><mo>+</mo><mi>a</mi><mo>&#x2213;</mo><mo>+</mo>' +
      '<mi>b</mi><mo>+</mo><mo>&#x2213;</mo><mi>c</mi><mo>+</mo>');
};


/**
 * Test operator trees with single operator.
 */
sre.EnrichSpeechTest.prototype.testSpeechSingleOperators = function() {
  // Single identifier.
  this.executeSpeechTest(
      '<mi>a</mi>');
  // Single implicit node.
  this.executeSpeechTest(
      '<mi>a</mi><mi>b</mi>');
  // Implicit multi node.
  this.executeSpeechTest(
      '<mi>a</mi><mi>b</mi><mi>c</mi>');
  // Single addition.
  this.executeSpeechTest(
      '<mi>a</mi><mo>+</mo><mi>b</mi>');
  // Multi addition.
  this.executeSpeechTest(
      '<mi>a</mi><mo>+</mo><mi>b</mi><mo>+</mo><mi>c</mi>');
  // Multi addition with implicit node.
  this.executeSpeechTest(
      '<mi>a</mi><mo>+</mo><mi>b</mi><mi>c</mi><mo>+</mo><mi>d</mi>');
};


/**
 * Test operator trees with multiple operators.
 */
sre.EnrichSpeechTest.prototype.testSpeechMultipleOperators = function() {
  // Addition and subtraction.
  this.executeSpeechTest(
      '<mi>a</mi><mo>+</mo><mi>b</mi><mo>-</mo><mi>c</mi><mo>+</mo><mi>d</mi>');
  // Addition and subtraction.
  this.executeSpeechTest(
      '<mi>a</mi><mo>+</mo><mi>b</mi><mo>+</mo><mi>c</mi><mo>-</mo>' +
      '<mi>d</mi><mo>-</mo><mi>e</mi>');
  // Addition and explicit multiplication.
  this.executeSpeechTest(
      '<mi>a</mi><mo>+</mo><mi>b</mi><mo>&#x2218;</mo><mi>c</mi><mo>+</mo>' +
      '<mi>d</mi>');
  // Addition with explicit and implicit multiplication.
  this.executeSpeechTest(
      '<mi>a</mi><mo>+</mo><mi>b</mi><mo>&#x2218;</mo><mi>c</mi><mi>d</mi>' +
      '<mo>+</mo><mi>e</mi><mo>&#x2218;</mo><mi>f</mi>');
  // Two Additions, subtraction plus explicit and implicit multiplication,
  // one prefix and one postfix.
  this.executeSpeechTest(
      '<mi>a</mi><mo>+</mo><mi>b</mi><mo>+</mo><mi>c</mi><mi>d</mi>' +
      '<mo>+</mo><mi>e</mi><mo>&#x2218;</mo><mi>f</mi><mo>-</mo><mi>g</mi>' +
      '<mo>+</mo><mo>+</mo><mi>h</mi><mo>&#x2295;</mo><mi>i</mi>' +
      '<mo>&#x2295;</mo><mi>j</mi><mo>+</mo><mo>+</mo>');
};


/**
 * Test operator trees with multiplication operators.
 */
sre.EnrichSpeechTest.prototype.testSpeechMultiplicationOperators =
    function() {
  // Addition and subtraction.
  this.executeSpeechTest(
      '<mi>a</mi><mo>*</mo><mi>b</mi><mo>*</mo><mi>c</mi><mo>*</mo><mi>d</mi>');
  this.executeSpeechTest(
      '<mrow>' +
      '<mn>1</mn><mi>a</mi><mo>&#x00B7;</mo><mi>m</mi>' +
      '</mrow>');
  this.executeSpeechTest(
      '<mrow>' +
      '<mn>1</mn><mi>a</mi><mo>&#x00B7;</mo>' +
      '<mi>m</mi><mo>&#x00B7;</mo><mi>s</mi>' +
      '</mrow>');
  this.executeSpeechTest(
      '<mrow>' +
      '<mn>1</mn><mi>a</mi><mo>&#x00B7;</mo>' +
      '<mi>m</mi><mo>&#x00B7;</mo>' +
      '<mi>s</mi><mo>&#x00B7;</mo>' +
      '<mi>c</mi><mi>b</mi><mo>&#x00B7;</mo>' +
      '<mi>k</mi>' +
      '</mrow>');
  this.executeSpeechTest(
      '<mrow>' +
      '<mn>1</mn><mi>a</mi><mo>&#x00B7;</mo>' +
      '<msup><mi>m</mi><mn>2</mn></msup>' +
      '<mo>&#x00B7;</mo>' +
      '<msup><mi>s</mi><mrow><mo>-</mo><mn>2</mn></mrow>' +
      '</msup></mrow>');
  this.executeSpeechTest(
      '<mrow><mn>1</mn><mi>J</mi><mo>=</mo><mn>1</mn>' +
      '<mi>a</mi><mo>&#x00B7;</mo>' +
      '<msup><mi>m</mi><mn>2</mn></msup>' +
      '<mo>&#x00B7;</mo>' +
      '<msup><mi>s</mi><mrow><mo>-</mo><mn>2</mn></mrow>' +
      '</msup></mrow>');
};


// Fences.
/**
 * Test regular directed fences.
 */
sre.EnrichSpeechTest.prototype.testSpeechRegularFences = function() {
  // No fence.
  this.executeSpeechTest(
      '<mrow><mi>a</mi><mo>+</mo><mi>b</mi></mrow>');
  // Empty parentheses.
  this.executeSpeechTest(
      '<mo>(</mo><mo>)</mo>');
  // Single Fenced Expression.
  this.executeSpeechTest(
      '<mrow><mo>(</mo><mi>a</mi><mo>+</mo><mi>b</mi><mo>)</mo></mrow>');
  // Single Fenced Expression and operators.
  this.executeSpeechTest(
      '<mrow><mi>a</mi><mo>+</mo><mo>(</mo><mi>b</mi><mo>+</mo><mi>c</mi>' +
      '<mo>)</mo><mo>+</mo><mi>d</mi></mrow>');
  // Parallel Parenthesis.
  this.executeSpeechTest(
      '<mrow><mo>(</mo><mi>a</mi><mo>+</mo><mi>b</mi><mo>)</mo><mo>(</mo>' +
      '<mi>c</mi><mo>+</mo><mi>d</mi><mo>)</mo></mrow>');
  // Nested Parenthesis.
  this.executeSpeechTest(
      '<mrow><mo>(</mo><mo>(</mo><mi>a</mi><mo>+</mo><mi>b</mi><mo>)</mo>' +
      '<mo>(</mo><mi>c</mi><mo>+</mo><mi>d</mi><mo>)</mo><mo>)</mo></mrow>');
  // Nested parenthesis and brackets.
  this.executeSpeechTest(
      '<mrow><mo>(</mo><mo>[</mo><mi>a</mi><mo>+</mo><mi>b</mi><mo>+</mo>' +
      '<mi>c</mi><mo>]</mo><mo>+</mo><mi>d</mi><mo>)</mo></mrow>');
  // Nested parenthesis, brackets, braces and superscript operator.
  this.executeSpeechTest(
      '<mrow><mo>(</mo><msup><mi>a</mi><mrow><mn>2</mn><mo>[</mo><mi>i</mi>' +
      '<mo>+</mo><mi>n</mi><mo>]</mo></mrow></msup><mo>+</mo><mi>b</mi>' +
      '<mo>)</mo><mo>+</mo><mo>{</mo><mi>c</mi><mi>d</mi><mo>-</mo><mo>[</mo>' +
      '<mi>e</mi><mo>+</mo><mi>f</mi><mo>]</mo><mo>}</mo></mrow>');
};


/**
 * Test neutral fences.
 */
sre.EnrichSpeechTest.prototype.testSpeechNeutralFences = function() {
  // Empty bars.
  this.executeSpeechTest(
      '<mrow><mo>|</mo><mo>|</mo></mrow>');
  // Simple bar fence.
  this.executeSpeechTest(
      '<mrow><mo>|</mo><mi>a</mi><mo>|</mo></mrow>');
  // Parallel bar fences.
  this.executeSpeechTest(
      '<mrow><mo>|</mo><mi>a</mi><mo>|</mo><mi>b</mi><mo>+</mo>' +
      '<mo>&#x00A6;</mo><mi>c</mi><mo>&#x00A6;</mo></mrow>');
  // Nested bar fences.
  this.executeSpeechTest(
      '<mrow><mo>&#x00A6;</mo><mo>|</mo><mi>a</mi><mo>|</mo><mi>b</mi>' +
      '<mo>+</mo><mi>c</mi><mo>&#x00A6;</mo></mrow>');
};


/**
 * Mixed neutral and regular fences.
 */
sre.EnrichSpeechTest.prototype.testSpeechMixedFences = function() {
  // Empty parenthsis inside bars.
  this.executeSpeechTest(
      '<mrow><mo>|</mo><mo>(</mo><mo>)</mo><mo>|</mo></mrow>');
  // Bars inside parentheses.
  this.executeSpeechTest(
      '<mrow><mo>(</mo><mo>|</mo><mi>a</mi><mo>|</mo><mi>b</mi>' +
      '<mo>&#x00A6;</mo><mi>c</mi><mo>&#x00A6;</mo><mi>d</mi>' +
      '<mo>)</mo></mrow>');
  // Parentheses inside bards.
  this.executeSpeechTest(
      '<mrow><mo>|</mo><mo>(</mo><mi>a</mi><mo>+</mo><mi>b</mi><mo>)</mo>' +
      '<mo>&#x00A6;</mo><mi>c</mi><mo>&#x00A6;</mo><mi>d</mi><mo>|</mo></mrow>');
  // Parentheses inside bards.
  this.executeSpeechTest(
      '<mrow><mo>[</mo><mo>|</mo><mi>a</mi><mo>+</mo><mi>b</mi><mo>|</mo>' +
      '<mo>+</mo><mi>c</mi><mo>]</mo><mo>+</mo><mo>&#x00A6;</mo><mi>d</mi>' +
      '<mo>+</mo><mo>(</mo><mi>e</mi><mo>+</mo><mi>f</mi><mo>)</mo>' +
      '<mo>&#x00A6;</mo></mrow>');
};


/**
 * Mixed with isolated bars.
 */
sre.EnrichSpeechTest.prototype.testSpeechMixedFencesWithBars = function() {
  // Set notation.
  this.executeSpeechTest(
      '<mrow><mo>{</mo><mo>(</mo><mi>x</mi><mo>,</mo><mi>y</mi><mo>,</mo>' +
      '<mi>z</mi><mo>)</mo><mo>|</mo><mi>x</mi><mi>y</mi><mo>=</mo>' +
      '<mo>z</mo><mo>}</mo></mrow>');
  // Disjunction of bracketed parallel statements.
  this.executeSpeechTest(
      '<mrow><mo>[</mo><mi>a</mi><mo>&#x2016;</mo><mi>b</mi><mo>]</mo>' +
      '<mo>|</mo><mo>[</mo><mi>x</mi><mo>&#x2016;</mo><mi>y</mi><mo>]</mo>' +
      '</mrow>');
  // Metric over the above.
  this.executeSpeechTest(
      '<mrow><mo>&#x2016;</mo><mo>[</mo><mi>a</mi><mo>&#x2016;</mo>' +
      '<mi>b</mi><mo>]</mo><mo>|</mo><mo>[</mo><mi>x</mi><mo>&#x2016;</mo>' +
      '<mi>y</mi><mo>]</mo><mo>&#x2016;</mo></mrow>');
  // Mix of metrics and bracketed expression and single bars.
  this.executeSpeechTest(
      '<mrow><mo>&#x2016;</mo><mo>[</mo><mi>a</mi><mo>&#x2016;</mo><mi>b</mi>' +
      '<mo>]</mo><mo>|</mo><mo>[</mo><mi>c</mi><mo>&#x2016;</mo>' +
      '<mo>&#x00A6;</mo><mi>d</mi><mo>]</mo><mo>&#x2016;</mo><mo>[</mo>' +
      '<mi>u</mi><mo>&#x2016;</mo><mi>v</mi><mo>]</mo><mo>|</mo><mi>x</mi>' +
      '<mo>&#x2016;</mo><mi>y</mi><mo>&#x00A6;</mo><mi>z</mi></mrow>');
};


/**
 * Pathological cases with only opening fences.
 */
sre.EnrichSpeechTest.prototype.testSpeechOpeningFencesOnly = function() {
  // Single.
  this.executeSpeechTest(
      '<mrow><mo>[</mo></mrow>');
  // Single right.
  this.executeSpeechTest(
      '<mrow><mi>a</mi><mo>[</mo></mrow>');
  // Single middle.
  this.executeSpeechTest(
      '<mrow><mi>a</mi><mo>[</mo><mi>b</mi></mrow>');
  // Single left.
  this.executeSpeechTest(
      '<mrow><mo>[</mo><mi>b</mi></mrow>');
  // Multiple.
  this.executeSpeechTest(
      '<mrow><mi>a</mi><mo>[</mo><mi>b</mi><mi>c</mi><mo>(</mo><mi>d</mi>' +
      '<mo>{</mo><mi>e</mi><mo>&#x3008;</mo><mi>f</mi></mrow>');
  // Multiple plus inner fenced.
  this.executeSpeechTest(
      '<mrow><mi>a</mi><mo>[</mo><mi>b</mi><mo>[</mo><mo>(</mo><mo>(</mo>' +
      '<mi>c</mi><mo>)</mo><mi>d</mi><mo>{</mo><mi>e</mi><mo>&#x3008;</mo>' +
      '<mi>f</mi></mrow>');
};


/**
 * Pathological cases with only closing fences.
 */
sre.EnrichSpeechTest.prototype.testSpeechClosingFencesOnly = function() {
  // Single.
  this.executeSpeechTest(
      '<mrow><mo>]</mo></mrow>');
  // Single right.
  this.executeSpeechTest(
      '<mrow><mi>a</mi><mo>]</mo></mrow>');
  // Single middle.
  this.executeSpeechTest(
      '<mrow><mi>a</mi><mo>]</mo><mi>b</mi></mrow>');
  // Single left.
  this.executeSpeechTest(
      '<mrow><mo>]</mo><mi>b</mi></mrow>');
  // Multiple.
  this.executeSpeechTest(
      '<mrow><mi>a</mi><mo>]</mo><mi>b</mi><mi>c</mi><mo>)</mo><mi>d</mi>' +
      '<mo>}</mo><mi>e</mi><mo>&#x3009;</mo><mi>f</mi></mrow>');
  // Multiple plus inner fenced.
  this.executeSpeechTest(
      '<mrow><mi>a</mi><mo>]</mo><mi>b</mi><mo>]</mo><mo>(</mo><mi>c</mi>' +
      '<mo>)</mo><mo>)</mo><mi>d</mi><mo>}</mo><mi>e</mi><mo>&#x3009;</mo>' +
      '<mi>f</mi></mrow>');
};


/**
 * Pathological cases with only neutral fences.
 */
sre.EnrichSpeechTest.prototype.testSpeechNeutralFencesOnly = function() {
  // Single.
  this.executeSpeechTest(
      '<mrow><mo>|</mo></mrow>');
  // Single right.
  this.executeSpeechTest(
      '<mrow><mi>a</mi><mo>|</mo></mrow>');
  // Single middle.
  this.executeSpeechTest(
      '<mrow><mi>a</mi><mo>|</mo><mi>b</mi></mrow>');
  // Single left.
  this.executeSpeechTest(
      '<mrow><mo>|</mo><mi>b</mi></mrow>');
  // Two different bars.
  this.executeSpeechTest(
      '<mrow><mi>a</mi><mo>|</mo><mi>b</mi><mo>&#x00A6;</mo><mi>c</mi></mrow>');
  // Three different bars.
  this.executeSpeechTest(
      '<mrow><mi>a</mi><mo>&#x2016;</mo><mi>b</mi><mo>|</mo><mi>c</mi>' +
      '<mo>&#x00A6;</mo><mi>d</mi></mrow>');
  // Multiple plus inner fenced.
  this.executeSpeechTest(
      '<mrow><mo>&#x2016;</mo><mo>[</mo><mi>a</mi><mo>&#x2016;</mo><mi>b</mi>' +
      '<mo>]</mo><mo>&#x2016;</mo><mo>|</mo><mi>x</mi><mo>&#x2016;</mo>' +
      '<mi>y</mi><mo>&#x00A6;</mo><mi>z</mi></mrow>');
};


/**
 * Pathological cases with mixed fences.
 */
sre.EnrichSpeechTest.prototype.testSpeechMixedUnmatchedFences = function() {
  // Close, );
  // Neutrals and close.
  this.executeSpeechTest(
      '<mrow><mi>a</mi><mo>&#x2016;</mo><mi>b</mi><mo>|</mo><mi>c</mi>' +
      '<mo>&#x00A6;</mo><mi>d</mi><mo>]</mo><mi>e</mi></mrow>');
  // Neutrals and open.
  this.executeSpeechTest(
      '<mrow><mo>[</mo><mi>a</mi><mo>&#x2016;</mo><mi>b</mi><mo>|</mo>' +
      '<mi>c</mi><mo>&#x00A6;</mo><mi>d</mi></mrow>');
  // Multiple fences, fenced and operations
  this.executeSpeechTest(
      '<mrow><mo>&#x2016;</mo><mo>[</mo><mi>a</mi><mo>&#x2016;</mo><mi>b</mi>' +
      '<mo>]</mo><mo>|</mo><mo>[</mo><mi>c</mi><mo>&#x2016;</mo>' +
      '<mo>&#x00A6;</mo><mi>d</mi><mo>]</mo><mo>&#x2016;</mo><mo>|</mo>' +
      '<mi>x</mi><mo>&#x2016;</mo><mi>y</mi><mo>&#x00A6;</mo><mi>z</mi>' +
      '<mo>]</mo></mrow>');
  // Multiple fences, fenced and operations
  this.executeSpeechTest(
      '<mrow><mo>&#x2016;</mo><mo>]</mo><mo>&#x00A6;</mo><mo>&#x2016;</mo>' +
      '<mo>[</mo><mo>|</mo><mo>[</mo><mi>a</mi><mo>&#x2016;</mo><mi>b</mi>' +
      '<mo>]</mo><mo>&#x2016;</mo><mo>|</mo><mi>[</mi><mo>&#x2016;</mo>' +
      '<mi>y</mi><mo>&#x00A6;</mo><mi>z</mi></mrow>');
  // Multiple fences, fenced and operations
  this.executeSpeechTest(
      '<mrow><mo>&#x2016;</mo><mo>[</mo><mi>a</mi><mo>&#x00A6;</mo>' +
      '<mo>&#x2016;</mo><mo>[</mo><mo>+</mo><mo>[</mo><mi>b</mi>' +
      '<mo>&#x2016;</mo><mi>c</mi><mo>]</mo><mo>+</mo><mo>&#x2016;</mo>' +
      '<mo>|</mo><mi>d</mi><mo>+</mo><mi>e</mi><mi>[</mi><mo>&#x2016;</mo>' +
      '<mi>y</mi><mo>&#x00A6;</mo><mo>+</mo><mi>z</mi></mrow>');
};


/**
 * Square roots
 */
sre.EnrichSpeechTest.prototype.testSpeechSquareRoots = function() {
  this.executeSpeechTest(
      '<msqrt></msqrt>');
  this.executeSpeechTest(
      '<msqrt><mi>x</mi></msqrt>');
  this.executeSpeechTest(
      '<msqrt><msqrt><mi>x</mi></msqrt></msqrt>');
  this.executeSpeechTest(
      '<msqrt><mi>x</mi><mi>n</mi></msqrt>');
  this.executeSpeechTest(
      '<msqrt><msqrt><msqrt><mi>x</mi></msqrt></msqrt><mi>y</mi></msqrt>');
};


/**
 * Regular roots
 */
sre.EnrichSpeechTest.prototype.testSpeechRegularRoots = function() {
  // Not sure if that makes even sense.
  // this.executeSpeechTest('<mroot></mroot>');
  this.executeSpeechTest(
      '<mroot><mi>x</mi><mi>n</mi></mroot>');
  this.executeSpeechTest(
      '<mroot><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mrow><mi>n</mi>' +
      '<mo>+</mo><mn>1</mn></mrow></mroot>');
  this.executeSpeechTest(
      '<mroot><mroot><mi>x</mi><mi>n</mi></mroot><mi>m</mi></mroot>');
  this.executeSpeechTest(
      '<mroot><mrow><mroot><mi>x</mi><mi>n</mi></mroot><mroot><mi>y</mi>' +
      '<mi>l</mi></mroot></mrow><mi>m</mi></mroot>');
};


/**
 * Mixed roots
 */
sre.EnrichSpeechTest.prototype.testSpeechMixedRoots = function() {
  this.executeSpeechTest(
      '<msqrt><mroot><mi>x</mi><mi>n</mi></mroot></msqrt>');
  this.executeSpeechTest(
      '<mroot><msqrt><mi>x</mi></msqrt><mi>n</mi></mroot>');
  this.executeSpeechTest(
      '<mroot><msqrt><mi>x</mi><mi>y</mi></msqrt><mi>n</mi></mroot>');
};


/**
 * Simple function applications
 */
sre.EnrichSpeechTest.prototype.testSpeechSimpleFuncsSingle = function() {
  this.executeSpeechTest(
      '<mrow><mi>f</mi></mrow>');

  this.executeSpeechTest(
      '<mrow><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo></mrow>');

  this.executeSpeechTest(
      '<mrow><mi>f</mi><mo>(</mo><mi>x</mi><mi>y</mi><mo>)</mo></mrow>');

  this.executeSpeechTest(
      '<mrow><mi>f</mi><mo>(</mo><mi>x</mi><mo>,</mo><mi>y</mi>' +
      '<mo>,</mo><mi>z</mi><mo>)</mo></mrow>');

  this.executeSpeechTest(
      '<mrow><mi>f</mi><mo>(</mo><msup><mi>x</mi><mn>2</mn></msup>' +
      '<mo>)</mo></mrow>');

  this.executeSpeechTest(
      '<mrow><mi>f</mi><mo>(</mo><msub><mi>x</mi><mn>2</mn></msub>' +
      '<mo>)</mo></mrow>');

  this.executeSpeechTest(
      '<mrow><mi>f</mi><mo>(</mo><msubsup><mi>x</mi><mn>2</mn>' +
      '<mn>1</mn></msubsup><mo>)</mo></mrow>');

  this.executeSpeechTest(
      '<mrow><mi>f</mi><mo>(</mo><mover><mi>x</mi><mn>2</mn></mover>' +
      '<mo>)</mo></mrow>');
  this.executeSpeechTest(
      '<mrow><mi>f</mi><mo>(</mo><munder><mi>x</mi><mn>2</mn></munder>' +
      '<mo>)</mo></mrow>');
  this.executeSpeechTest(
      '<mrow><mi>f</mi><mo>(</mo><munderover><mi>x</mi><mn>2</mn>' +
      '<mn>1</mn></munderover><mo>)</mo></mrow>');
  this.executeSpeechTest(
      '<mrow><mi>f</mi><mo>(</mo><mfrac><mn>1</mn><mn>2</mn></mfrac>' +
      '<mo>)</mo></mrow>');
  this.executeSpeechTest(
      '<mrow><mi>f</mi><mo>(</mo><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '<mo>)</mo></mrow>');
};


/**
 * Simple functions with surrounding operators.
 */
sre.EnrichSpeechTest.prototype.testSpeechSimpleFuncsWithOps = function() {
  this.executeSpeechTest(
      '<mrow><mn>1</mn><mo>+</mo><mi>f</mi><mo>(</mo><mi>x</mi>' +
      '<mo>)</mo></mrow>');
  this.executeSpeechTest(
      '<mrow><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>+</mo>' +
      '<mn>2</mn></mrow>');
  this.executeSpeechTest(
      '<mrow><mn>1</mn><mo>+</mo><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '<mo>+</mo><mn>2</mn></mrow>');
  this.executeSpeechTest(
      '<mrow><mo>a</mo><mo>+</mo><mi>f</mi><mo>(</mo><mi>x</mi>' +
      '<mo>)</mo></mrow>');
  this.executeSpeechTest(
      '<mrow><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>+</mo>' +
      '<mo>b</mo></mrow>');
  this.executeSpeechTest(
      '<mrow><mo>a</mo><mo>+</mo><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '<mo>+</mo><mo>b</mo></mrow>');
  this.executeSpeechTest(
      '<mrow><mo>a</mo><mo>=</mo><mi>f</mi><mo>(</mo><mi>x</mi>' +
      '<mo>)</mo></mrow>');
  this.executeSpeechTest(
      '<mrow><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>=</mo>' +
      '<mo>b</mo></mrow>');
  this.executeSpeechTest(
      '<mrow><mo>a</mo><mo>=</mo><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '<mo>=</mo><mo>b</mo></mrow>');
};


/**
 * Multiple simple functions.
 */
sre.EnrichSpeechTest.prototype.testSpeechSimpleFuncsMulti = function() {
  this.executeSpeechTest(
      '<mrow><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>+</mo><mi>g</mi>' +
      '<mo>(</mo><mi>x</mi><mo>)</mo></mrow>');
  this.executeSpeechTest(
      '<mrow><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>+</mo><mi>g</mi>' +
      '<mo>(</mo><mi>x</mi><mo>)</mo><mo>=</mo><mi>h</mi><mo>(</mo>' +
      '<mi>x</mi><mo>)</mo></mrow>');
  this.executeSpeechTest(
      '<mrow><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>+</mo><mi>g</mi>' +
      '<mo>(</mo><mi>y</mi><mo>)</mo><mo>=</mo><mi>h</mi><mo>(</mo>' +
      '<mi>x</mi><mi>y</mi><mo>)</mo></mrow>');
};


/**
 * Nested simple functions.
 */
sre.EnrichSpeechTest.prototype.testSpeechSimpleFuncsNested = function() {
  this.executeSpeechTest(
      '<mrow><mi>g</mi><mo>(</mo><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '<mo>)</mo></mrow>');
  this.executeSpeechTest(
      '<mrow><mi>h</mi><mo>(</mo><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '<mi>g</mi><mo>(</mo><mi>y</mi><mo>)</mo><mo>)</mo></mrow>');
  this.executeSpeechTest(
      '<mrow><mi>h</mi><mo>(</mo><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '<mo>+</mo><mi>g</mi><mo>(</mo><mi>y</mi><mo>)</mo><mo>)</mo></mrow>');
  this.executeSpeechTest(
      '<mi>P</mi><mo>[</mo><mi>x</mi><mo>=</mo><mn>2</mn><mo>]</mo>');
};


/**
 * Simple functions with explicit function application.
 */
sre.EnrichSpeechTest.prototype.testSpeechSimpleFuncsExplicitApp = function() {
  this.executeSpeechTest(
      '<mi>f</mi><mo>&#x2061;</mo><mo>(</mo><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '<mo>)</mo>');
  this.executeSpeechTest(
      '<mi>f</mi><mo>&#x2061;</mo><mo>(</mo><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '<mo>)</mo><mo>+</mo><mi>f</mi><mo>(</mo><mi>x</mi><mo>+</mo>' +
      '<mi>y</mi><mo>)</mo>');
  this.executeSpeechTest(
      '<msub><mi>f</mi><mn>1</mn></msub><mo>&#x2061;</mo><mo>(</mo><mi>x</mi>' +
      '<mo>+</mo><mi>y</mi><mo>)</mo>');
  this.executeSpeechTest(
      '<msup><msub><mi>f</mi><mi>n</mi></msub><mn>2</mn></msup>' +
      '<mo>&#x2061;</mo><mo>(</mo><mi>x</mi><mo>+</mo><mi>y</mi><mo>)</mo>' +
      '<mo>+</mo><msup><msub><mi>f</mi><mi>m</mi></msub><mn>2</mn></msup>' +
      '<mo>(</mo><mi>x</mi><mo>+</mo><mi>y</mi><mo>)</mo>');
};


/**
 * Prefix function applications
 */
sre.EnrichSpeechTest.prototype.testSpeechPrefixFuncsSingle = function() {
  this.executeSpeechTest(
      '<mrow><mi>sin</mi><mo>(</mo><mi>x</mi><mo>)</mo></mrow>');

  this.executeSpeechTest(
      '<mrow><mi>sin</mi><mo>(</mo><mi>x</mi><mi>y</mi><mo>)</mo></mrow>');

  this.executeSpeechTest(
      '<mrow><mi>sin</mi><mo>(</mo><msup><mi>x</mi><mn>2</mn></msup>' +
      '<mo>)</mo></mrow>');

  this.executeSpeechTest(
      '<mrow><mi>sin</mi><mo>(</mo><msub><mi>x</mi><mn>2</mn></msub>' +
      '<mo>)</mo></mrow>');

  this.executeSpeechTest(
      '<mrow><mi>sin</mi><mo>(</mo><msubsup><mi>x</mi><mn>2</mn>' +
      '<mn>1</mn></msubsup><mo>)</mo></mrow>');

  this.executeSpeechTest(
      '<mrow><mi>sin</mi><mo>(</mo><mover><mi>x</mi><mn>2</mn></mover>' +
      '<mo>)</mo></mrow>');

  this.executeSpeechTest(
      '<mrow><mi>sin</mi><mo>(</mo><munder><mi>x</mi><mn>2</mn></munder>' +
      '<mo>)</mo></mrow>');

  this.executeSpeechTest(
      '<mrow><mi>sin</mi><mo>(</mo><munderover><mi>x</mi><mn>2</mn>' +
      '<mn>1</mn></munderover><mo>)</mo></mrow>');

  this.executeSpeechTest(
      '<mrow><mi>sin</mi><mo>(</mo><mfrac><mn>1</mn><mn>2</mn></mfrac>' +
      '<mo>)</mo></mrow>');

  this.executeSpeechTest(
      '<mrow><mi>sin</mi><mo>(</mo><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '<mo>)</mo></mrow>');
};


/**
 * Prefix functions applications with surrounding operators.
 */
sre.EnrichSpeechTest.prototype.testSpeechPrefixFuncsWithOps = function() {
  this.executeSpeechTest(
      '<mrow><mn>1</mn><mo>+</mo><mi>sin</mi><mo>(</mo><mi>x</mi>' +
      '<mo>)</mo></mrow>');

  this.executeSpeechTest(
      '<mrow><mi>sin</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>+</mo>' +
      '<mn>2</mn></mrow>');

  this.executeSpeechTest(
      '<mrow><mn>1</mn><mo>+</mo><mi>sin</mi><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '<mo>+</mo><mn>2</mn></mrow>');

  this.executeSpeechTest(
      '<mrow><mo>a</mo><mo>+</mo><mi>sin</mi><mo>(</mo><mi>x</mi>' +
      '<mo>)</mo></mrow>');

  this.executeSpeechTest(
      '<mrow><mi>sin</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>+</mo>' +
      '<mo>b</mo></mrow>');

  this.executeSpeechTest(
      '<mrow><mo>a</mo><mo>+</mo><mi>sin</mi><mo>(</mo><mi>x</mi>' +
      '<mo>)</mo><mo>+</mo><mo>b</mo></mrow>');

  this.executeSpeechTest(
      '<mrow><mo>a</mo><mo>=</mo><mi>sin</mi><mo>(</mo><mi>x</mi>' +
      '<mo>)</mo></mrow>');

  this.executeSpeechTest(
      '<mrow><mi>sin</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>=</mo>' +
      '<mo>b</mo></mrow>');

  this.executeSpeechTest(
      '<mrow><mo>a</mo><mo>=</mo><mi>sin</mi><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '<mo>=</mo><mo>b</mo></mrow>');
};


/**
 * Multiple prefix function applications.
 */
sre.EnrichSpeechTest.prototype.testSpeechPrefixFuncsMulti = function() {
  this.executeSpeechTest(
      '<mrow><mi>sin</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>+</mo><mi>cos</mi>' +
      '<mo>(</mo><mi>x</mi><mo>)</mo></mrow>');

  this.executeSpeechTest(
      '<mrow><mi>sin</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>+</mo><mi>cos</mi>' +
      '<mo>(</mo><mi>x</mi><mo>)</mo><mo>=</mo><mi>tan</mi><mo>(</mo>' +
      '<mi>x</mi><mo>)</mo></mrow>');

  this.executeSpeechTest(
      '<mrow><mi>sin</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>+</mo><mi>cos</mi>' +
      '<mo>(</mo><mi>y</mi><mo>)</mo><mo>=</mo><mi>tan</mi><mo>(</mo>' +
      '<mi>x</mi><mi>y</mi><mo>)</mo></mrow>');
};


/**
 * Prefix function applications with sub- and superscripts.
 */
sre.EnrichSpeechTest.prototype.testSpeechPrefixFuncsScripts = function() {
  this.executeSpeechTest(
      '<mrow><msup><mi>sin</mi><mn>2</mn></msup><mo>(</mo><mi>x</mi>' +
      '<mo>)</mo></mrow>');

  this.executeSpeechTest(
      '<mrow><msub><mi>sin</mi><mn>1</mn></msub><mo>(</mo><mi>x</mi>' +
      '<mo>)</mo></mrow>');

  this.executeSpeechTest(
      '<mrow><msubsup><mi>sin</mi><mn>2</mn><mn>1</mn></msubsup><mo>(</mo>' +
      '<mi>x</mi><mo>)</mo></mrow>');

  this.executeSpeechTest(
      '<mrow><msup><mi>sin</mi><mn>2</mn></msup><mo>(</mo><mi>x</mi>' +
      '<mo>)</mo><mo>+</mo><msup><mi>cos</mi><mn>2</mn></msup><mo>(</mo>' +
      '<mi>y</mi><mo>)</mo><mo>=</mo><mn>1</mn></mrow>');
};


/**
 * Prefix function applications with unfenced arguments.
 */
sre.EnrichSpeechTest.prototype.testSpeechPrefixFuncsUnfenced = function() {
  this.executeSpeechTest(
      '<mrow><mi>sin</mi><mi>x</mi></mrow>');

  this.executeSpeechTest(
      '<mrow><mi>sin</mi><mi>x</mi><mi>y</mi></mrow>');

  this.executeSpeechTest(
      '<mrow><mi>sin</mi><msup><mi>x</mi><mn>2</mn></msup></mrow>');

  this.executeSpeechTest(
      '<mrow><mi>sin</mi><msub><mi>x</mi><mn>2</mn></msub></mrow>');

  this.executeSpeechTest(
      '<mrow><mi>sin</mi><msubsup><mi>x</mi><mn>2</mn><mn>1</mn>' +
      '</msubsup></mrow>');

  this.executeSpeechTest(
      '<mrow><mi>sin</mi><mover><mi>x</mi><mn>2</mn></mover></mrow>');

  this.executeSpeechTest(
      '<mrow><mi>sin</mi><munder><mi>x</mi><mn>2</mn></munder></mrow>');

  this.executeSpeechTest(
      '<mrow><mi>sin</mi><munderover><mi>x</mi><mn>2</mn><mn>1</mn>' +
      '</munderover></mrow>');

  this.executeSpeechTest(
      '<mrow><mi>sin</mi><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow>');
};


/**
 * Prefix function applications with unfenced arguments in an operator
 * expression.
 */
sre.EnrichSpeechTest.prototype.testSpeechPrefixFuncsUnfencedOps = function() {
  this.executeSpeechTest(
      '<mrow><mn>1</mn><mo>+</mo><mi>sin</mi><mi>x</mi></mrow>');

  this.executeSpeechTest(
      '<mrow><mi>sin</mi><mi>x</mi><mo>+</mo><mn>2</mn></mrow>');

  this.executeSpeechTest(
      '<mrow><mn>1</mn><mo>+</mo><mi>sin</mi><mi>x</mi><mo>+</mo>' +
      '<mn>2</mn></mrow>');

  this.executeSpeechTest(
      '<mrow><mo>a</mo><mo>+</mo><mi>sin</mi><mi>x</mi></mrow>');

  this.executeSpeechTest(
      '<mrow><mi>sin</mi><mi>x</mi><mo>+</mo><mo>b</mo></mrow>');

  this.executeSpeechTest(
      '<mrow><mo>a</mo><mo>+</mo><mi>sin</mi><mi>x</mi><mo>+</mo>' +
      '<mo>b</mo></mrow>');

  this.executeSpeechTest(
      '<mrow><mo>a</mo><mo>=</mo><mi>sin</mi><mi>x</mi></mrow>');

  this.executeSpeechTest(
      '<mrow><mi>sin</mi><mi>x</mi><mo>=</mo><mo>b</mo></mrow>');

  this.executeSpeechTest(
      '<mrow><mo>a</mo><mo>=</mo><mi>sin</mi><mi>x</mi><mo>=</mo>' +
      '<mo>b</mo></mrow>');
};


/**
 * Multiple prefix function applications with unfenced arguments.
 */
sre.EnrichSpeechTest.prototype.testSpeechPrefixFuncsMultiUnfenced =
    function() {
  this.executeSpeechTest(
      '<mrow><mi>sin</mi><mi>x</mi><mo>+</mo><mi>cos</mi><mi>x</mi></mrow>');

  this.executeSpeechTest(
      '<mrow><mi>sin</mi><mi>x</mi><mo>+</mo><mi>cos</mi><mi>x</mi><mo>=</mo>' +
      '<mi>tan</mi><mi>x</mi></mrow>');

  this.executeSpeechTest(
      '<mrow><mi>sin</mi><mi>x</mi><mo>+</mo><mi>cos</mi><mi>y</mi><mo>=</mo>' +
      '<mi>tan</mi><mi>x</mi><mi>y</mi></mrow>');
};


/**
 * Prefix function applications with sub- and superscripts and unfenced
 * arguments.
 */
sre.EnrichSpeechTest.prototype.testSpeechPrefixFuncsScriptUnfenced =
    function() {
  this.executeSpeechTest(
      '<mrow><msup><mi>sin</mi><mn>2</mn></msup><mi>x</mi></mrow>');

  this.executeSpeechTest(
      '<mrow><msub><mi>sin</mi><mn>1</mn></msub><mi>x</mi></mrow>');

  this.executeSpeechTest(
      '<mrow><msubsup><mi>sin</mi><mn>2</mn><mn>1</mn></msubsup>' +
      '<mi>x</mi></mrow>');

  this.executeSpeechTest(
      '<mrow><msup><mi>sin</mi><mn>2</mn></msup><mi>x</mi><mo>+</mo><msup>' +
      '<mi>cos</mi><mn>2</mn></msup><mi>y</mi><mo>=</mo><mn>1</mn></mrow>');
  this.executeSpeechTest(
      '<mrow><msubsup><msubsup><mi>sin</mi><mn>2</mn><mn>1</mn>' +
      '</msubsup><mi>n</mi><mi>m</mi></msubsup><mi>x</mi></mrow>');
};


/**
 * Prefix functions without arguments.
 */
sre.EnrichSpeechTest.prototype.testSpeechPrefixFuncsNoArgs = function() {
  this.executeSpeechTest(
      '<mi>sin</mi>');

  this.executeSpeechTest(
      '<msup><mi>sin</mi><mn>2</mn></msup>');
  this.executeSpeechTest(
      '<msup><mi>sin</mi><mn>2</mn></msup><mo>+</mo><msup><mi>cos</mi>' +
      '<mn>2</mn></msup>');
  this.executeSpeechTest(
      '<mrow><msup><mi>sin</mi><mn>2</mn></msup><mo>+</mo>' +
      '<msup><mi>cos</mi><mn>2</mn></msup><mo>=</mo><mn>1</mn></mrow>');
  this.executeSpeechTest(
      '<mrow><mi>sin</mi><mo>=</mo><mfrac><mn>1</mn>' +
      '<mi>csc</mi></mfrac></mrow>');
};


/**
 * Nested prefix function applications, both with and without fenced arguments.
 */
sre.EnrichSpeechTest.prototype.testSpeechPrefixFuncsNested = function() {
  this.executeSpeechTest(
      '<mrow><mi>log</mi><mi>cos</mi><mi>x</mi></mrow>');

  this.executeSpeechTest(
      '<mrow><mi>ln</mi><mo>(</mo><mi>sin</mi>' +
      '<mo>(</mo><mi>x</mi><mo>)</mo><mo>)</mo></mrow>');

  this.executeSpeechTest(
      '<mrow><mi>log</mi><mi>cos</mi><mi>x</mi><mo>=</mo><mi>ln</mi>' +
      '<mo>(</mo><mi>sin</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>)</mo></mrow>');
};


/**
 * Variations of matrices and their roles as determinants, square matrices or
 * rowvectors.
 */
sre.EnrichSpeechTest.prototype.testSpeechMatrices = function() {
  this.executeSpeechTest(
      '<mrow class="MJX-TeXAtom-ORD"><mi mathvariant="bold">A</mi>' +
      '<mo>=</mo><mo>[</mo><mtable rowspacing="4pt" columnspacing="1em">' +
      '<mtr><mtd><mn>0</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd>' +
      '<mn>2</mn></mtd><mtd><mn>3</mn></mtd></mtr></mtable><mo>]</mo>' +
      '</mrow>');

  this.executeSpeechTest(
      '<mo>[</mo><mtable rowspacing="4pt" columnspacing="1em">' +
      '<mtr><mtd><mn>0</mn></mtd><mtd><mn>1</mn></mtd></mtr>' +
      '<mtr><mtd><mn>2</mn></mtd><mtd><mn>3</mn></mtd></mtr>' +
      '<mtr><mtd><mn>4</mn></mtd><mtd><mn>5</mn></mtd></mtr>' +
      '</mtable><mo>]</mo>');

  this.executeSpeechTest(
      '<mo>[</mo><mtable rowspacing="4pt" columnspacing="1em">' +
      '<mtr><mtd><mn>0</mn></mtd><mtd><mn>1</mn></mtd></mtr>' +
      '<mtr><mtd><mn>2</mn></mtd><mtd><mn>3</mn></mtd></mtr>' +
      '</mtable><mo>]</mo>');
  this.executeSpeechTest(
      '<mfenced open="|" close="|"><mtable>' +
      '<mtr><mtd><mn>0</mn></mtd><mtd><mn>1</mn></mtd></mtr>' +
      '<mtr><mtd><mn>2</mn></mtd><mtd><mn>3</mn></mtd></mtr>' +
      '<mtr><mtd><mn>4</mn></mtd><mtd><mn>5</mn></mtd></mtr>' +
      '</mtable></mfenced>');
  this.executeSpeechTest(
      '<mfenced open="|" close="|"><mtable>' +
      '<mtr><mtd><mn>0</mn></mtd><mtd><mn>1</mn></mtd></mtr>' +
      '<mtr><mtd><mn>2</mn></mtd><mtd><mn>3</mn></mtd></mtr>' +
      '</mtable></mfenced>');
  this.executeSpeechTest(
      '<mfenced open="(" close=")"><mtable>' +
      '<mtr><mtd><mn>0</mn></mtd><mtd><mn>1</mn></mtd>' +
      '<mtd><mn>2</mn></mtd><mtd><mn>3</mn></mtd></mtr>' +
      '</mtable></mfenced>');
};


/**
 * Variations of vectors and their roles as determinants or binomial
 * coefficients.
 */
sre.EnrichSpeechTest.prototype.testSpeechVectors = function() {
  this.executeSpeechTest(
      '<mrow class="MJX-TeXAtom-ORD"><mi mathvariant="bold">V</mi>' +
      '<mo>=</mo><mo>[</mo><mtable rowspacing="4pt" columnspacing="1em">' +
      '<mtr><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr>' +
      '<mtr><mtd><mn>3</mn></mtd></mtr></mtable><mo>]</mo></mrow>');

  this.executeSpeechTest(
      '<mo>[</mo><mtable rowspacing="4pt" columnspacing="1em">' +
      '<mtr><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr>' +
      '<mtr><mtd><mn>3</mn></mtd></mtr></mtable><mo>]</mo>');
  this.executeSpeechTest(
      '<mfenced open="(" close=")"><mtable>' +
      '<mtr><mtd><mi>n</mi></mtd></mtr><mtr><mtd><mi>k</mi></mtd></mtr>' +
      '</mtable></mfenced>');
  this.executeSpeechTest(
      '<mfenced open="|" close="|"><mtable>' +
      '<mtr><mtd><mi>n</mi></mtd></mtr>' +
      '</mtable></mfenced>');
  this.executeSpeechTest(
      '<mfenced open="(" close=")"><mtable>' +
      '<mtr><mtd><mi>n</mi></mtd></mtr>' +
      '</mtable></mfenced>');

};


/**
 * Variations of tables representing case statements,
 * multiline equations and regular tables.
 */
sre.EnrichSpeechTest.prototype.testSpeechTables = function() {
  this.executeSpeechTest(
      '<mrow><mo>{</mo><mtable><mtr><mtd><mi>a</mi></mtd><mtd>' +
      '<mtext>often</mtext></mtd></mtr><mtr><mtd><mi>b</mi></mtd>' +
      '<mtd><mtext>sometimes</mtext></mtd></mtr></mtable></mrow>');

  this.executeSpeechTest(
      '<mrow><mi mathvariant="bold">A</mi><mo>=</mo><mo>{</mo><mtable>' +
      '<mtr><mtd><mi>a</mi></mtd><mtd><mtext>often</mtext></mtd></mtr>' +
      '<mtr><mtd><mi>b</mi></mtd><mtd><mtext>sometimes</mtext></mtd></mtr>' +
      '</mtable></mrow>');

  this.executeSpeechTest(
      '<mrow><mo>{</mo><mtable><mtr><mtd><mi>a</mi></mtd><mtd>' +
      '<mtext>often</mtext></mtd></mtr><mtr><mtd><mi>b</mi></mtd><mtd>' +
      '<mtext>sometimes</mtext></mtd></mtr></mtable><mo>.</mo></mrow>');

  this.executeSpeechTest(
      '<mrow><mo>{</mo><mtable><mtr><mtd><mi>a</mi></mtd>' +
      '<mtd><mtext>often</mtext></mtd></mtr><mtr><mtd><mi>b</mi></mtd>' +
      '<mtd><mtext>sometimes</mtext></mtd></mtr></mtable>' +
      '<mo>,</mo><mi>b</mi><mo>,</mo><mi>c</mi><mo>.</mo></mrow>');

  this.executeSpeechTest(
      '<mrow><mo>{</mo><mtable><mtr><mtd><mi>a</mi><mo>,</mo>' +
      '<mtext>often</mtext></mtd></mtr><mtr><mtd><mi>b</mi><mo>,</mo>' +
      '<mtext>sometimes</mtext></mtd></mtr></mtable><mo>,</mo><mi>b</mi>' +
      '<mo>,</mo><mi>c</mi><mo>.</mo></mrow>');

  this.executeSpeechTest(
      '<mtable><mtr><mtd><mi>x</mi><maligngroup/><mo>=</mo><mn>4</mn>' +
      '</mtd></mtr><mtr><mtd><mi>y</mi><maligngroup/><mo>=</mo><mn>2</mn>' +
      '</mtd></mtr><mtr><mtd><mi>x</mi><mi>y</mi><maligngroup/><mo>=</mo>' +
      '<mn>6</mn></mtd></mtr></mtable>');

  this.executeSpeechTest(
      '<mtable><mtr><mtd><mi>x</mi></mtd><mtd><mo>=</mo></mtd><mtd><mn>4</mn>' +
      '</mtd></mtr><mtr><mtd><mi>y</mi></mtd><mtd><mo>=</mo></mtd><mtd>' +
      '<mn>2</mn></mtd></mtr><mtr><mtd><mi>x</mi><mi>y</mi></mtd><mtd>' +
      '<mo>=</mo></mtd><mtd><mn>6</mn></mtd></mtr></mtable>');
};


/**
 * Tabular structures with fences that have are interspersed with ignored
 * elements, like merror.
 */
sre.EnrichSpeechTest.prototype.testSpeechMatricesWithIgnores = function() {
  this.executeSpeechTest(
      '<mi>A</mi><mo>=</mo><mrow><mpadded><mo>[</mo></mpadded><mrow>' +
      '<mtable rowspacing="4pt" columnspacing="1em">' +
      '<mtr><mtd><mn>0</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd>' +
      '<mn>2</mn></mtd><mtd><mn>3</mn></mtd></mtr></mtable></mrow>' +
      '<merror><mtext>nothing</mtext></merror><mo>]</mo></mrow>');
  this.executeSpeechTest(
      '<mrow class="MJX-TeXAtom-ORD"><mi mathvariant="bold">V</mi>' +
      '<mo>=</mo><mpadded><mo>[</mo></mpadded>' +
      '<mtable rowspacing="4pt" columnspacing="1em">' +
      '<mtr><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr>' +
      '<mtr><mtd><mn>3</mn></mtd></mtr></mtable><merror><mtext>nothing' +
      '</mtext></merror><mo>]</mo></mrow>');
  this.executeSpeechTest(
      '<mi>f</mi><mo>=</mo><mrow><mpadded><mo>{</mo></mpadded>' +
      '<merror><mtext>nothing</mtext></merror><mtable>' +
      '<mtr><mtd><mi>a</mi></mtd><mtd><mtext>often</mtext></mtd></mtr>' +
      '<mtr><mtd><mi>b</mi></mtd><mtd><mtext>sometimes</mtext></mtd></mtr>' +
      '</mtable></mrow>');
  this.executeSpeechTest(
      '<mi>f</mi><mo>=</mo><mpadded><mo>{</mo></mpadded>' +
      '<merror><mtext>nothing</mtext></merror>' +
      '<mtable><mtr><mtd><mi>x</mi><maligngroup/><mo>=</mo><mn>4</mn>' +
      '</mtd></mtr><mtr><mtd><mi>y</mi><maligngroup/><mo>=</mo><mn>2</mn>' +
      '</mtd></mtr><mtr><mtd><mi>x</mi><mi>y</mi><maligngroup/><mo>=</mo>' +
      '<mn>6</mn></mtd></mtr></mtable>');
};


/**
 * Limit functions.
 */
sre.EnrichSpeechTest.prototype.testSpeechLimitFunctions = function() {
  this.executeSpeechTest(
      '<mrow><munder><mi>lim</mi><mrow><mi>x</mi><mo>&#x2192;</mo>' +
      '<mi>&#x221E;</mi></mrow></munder><mo>(</mo><mi>x</mi><mo>)</mo></mrow>');

  this.executeSpeechTest(
      '<mrow><mi>a</mi><mo>+</mo><munder><mi>lim</mi><mrow><mi>x</mi>' +
      '<mo>&#x2192;</mo><mi>&#x221E;</mi></mrow></munder><mo>(</mo><mi>x</mi>' +
      '<mo>)</mo><mo>+</mo><mi>b</mi></mrow>');

  this.executeSpeechTest(
      '<mrow><msup><munder><mi>lim</mi><mrow><mi>x</mi><mo>&#x2192;</mo>' +
      '<mi>&#x221E;</mi></mrow></munder><mo>+</mo></msup><mo>(</mo><mi>x</mi>' +
      '<mo>)</mo></mrow>');

  this.executeSpeechTest(
      '<mrow><munderover><mi>lim</mi><mo>&#x2015;</mo><mrow><mi>x</mi>' +
      '<mo>&#x2192;</mo><mi>&#x221E;</mi></mrow></munderover><mo>(</mo>' +
      '<mi>x</mi><mo>)</mo></mrow>');

  this.executeSpeechTest(
      '<mrow><munder><mi>liminf</mi><mrow><mi>x</mi><mo>&#x2192;</mo>' +
      '<mi>&#x221E;</mi></mrow></munder><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '<mo>+</mo><munder><mi>limsup</mi><mrow><mi>y</mi><mo>&#x2192;</mo>' +
      '<mi>&#x221E;</mi></mrow></munder><mo>(</mo><mi>y</mi><mo>)</mo></mrow>');

  this.executeSpeechTest(
      '<mrow><mi>a</mi><mo>+</mo><munder><mi>lim</mi><mrow><mi>x</mi>' +
      '<mo>&#x2192;</mo><mi>&#x221E;</mi></mrow></munder><mi>x</mi><mo>+</mo>' +
      '<mi>b</mi></mrow>');

  this.executeSpeechTest(
      '<mrow><munder><mi>lim</mi><mrow><mi>x</mi><mo>&#x2192;</mo>' +
      '<mi>&#x221E;</mi></mrow></munder><munder><mi>lim</mi><mrow><mi>y</mi>' +
      '<mo>&#x2192;</mo><mi>&#x221E;</mi></mrow></munder><mi>x</mi>' +
      '<mi>y</mi></mrow>');
};


/**
 * Limit functions without arguments.
 */
sre.EnrichSpeechTest.prototype.testSpeechLimitFunctionsNoArgs = function() {
  this.executeSpeechTest(
      '<mi>liminf</mi>');

  this.executeSpeechTest(
      '<munder><mi>lim</mi><mrow><mi>x</mi><mo>&#x2192;</mo><mi>&#x221E;</mi>' +
      '</mrow></munder>');

  this.executeSpeechTest(
      '<mi>liminf</mi><mo>+</mo><mi>limsup</mi><mo>=</mo><mi>lim</mi>');
};


/**
 * Variations of big operators.
 */
sre.EnrichSpeechTest.prototype.testSpeechBigOps = function() {
  this.executeSpeechTest(
      '<mrow><munderover><mi>&#x2211;</mi><mrow><mi>n</mi><mo>=</mo>' +
      '<mn>0</mn></mrow><mi>&#x221E;</mi></munderover><msup><mi>n</mi>' +
      '<mn>2</mn></msup></mrow>');

  this.executeSpeechTest(
      '<mrow><munderover><mi>&#x2211;</mi><mrow><mi>n</mi><mo>=</mo>' +
      '<mn>0</mn></mrow><mi>&#x221E;</mi></munderover><munderover>' +
      '<mi>&#x2211;</mi><mrow><mi>m</mi><mo>=</mo><mn>0</mn></mrow>' +
      '<mi>&#x221E;</mi></munderover><msup><mi>n</mi><mi>m</mi></msup></mrow>');

  this.executeSpeechTest(
      '<mrow><munder><mi>&#x2211;</mi><mrow><mi>n</mi><mo>=</mo>' +
      '<mn>0</mn></mrow></munder><msup><mi>n</mi><mn>2</mn></msup></mrow>');
};


/**
 * Big operators without Arguments.
 */
sre.EnrichSpeechTest.prototype.testSpeechBigOpsNoArgs = function() {
  this.executeSpeechTest(
      '<mi>&#x2211;</mi>');
  this.executeSpeechTest(
      '<munder><mi>&#x220F;</mi><mi>n</mi></munder>');
  this.executeSpeechTest(
      '<munderover><mi>&#x2211;</mi><mrow><mi>n</mi><mo>=</mo><mn>0</mn>' +
      '</mrow><mi>&#x221E;</mi></munderover>');
  this.executeSpeechTest(
      '<mi>&#x2211;</mi><mo>+</mo><mi>&#x2211;</mi><mo>=</mo><mi>&#x2211;</mi>');
  this.executeSpeechTest(
      '<munder><mi>&#x220F;</mi><mi>n</mi></munder><mo>+</mo>' +
      '<munder><mi>&#x220F;</mi><mi>m</mi></munder><mo>=</mo>' +
      '<munder><mi>&#x220F;</mi><mrow><mi>n</mi><mo>,</mo><mi>m</mi>' +
      '</mrow></munder>');
  this.executeSpeechTest(
      '<mrow><munderover><mi>&#x2211;</mi><mrow><mi>n</mi><mo>=</mo>' +
      '<mn>0</mn></mrow><mi>&#x221E;</mi></munderover><mo>+</mo>' +
      '<munderover><mi>&#x2211;</mi><mrow><mi>m</mi><mo>=</mo><mn>0</mn>' +
      '</mrow><mi>&#x221E;</mi></munderover><mo>=</mo>' +
      '<munderover><mi>&#x2211;</mi><mrow><mi>n</mi><mo>,</mo><mi>m</mi>' +
      '<mo>=</mo><mn>0</mn></mrow><mi>&#x221E;</mi></munderover></mrow>');
};


/**
 * Variations of integrals.
 */
sre.EnrichSpeechTest.prototype.testSpeechIntegrals = function() {
  this.executeSpeechTest(
      '<mi>&#x222B;</mi>');

  this.executeSpeechTest(
      '<mi>&#x222B;</mi><mi>dx</mi>');

  this.executeSpeechTest(
      '<mrow><mi>&#x222B;</mi><mi>x</mi><mi>dx</mi></mrow>');

  this.executeSpeechTest(
      '<mrow><mi>&#x222B;</mi><mi>x</mi><mi>d</mi><mi>x</mi></mrow>');

  this.executeSpeechTest(
      '<mrow><mi>&#x222B;</mi><mi>x</mi><mo>+</mo><mi>y</mi><mi>d</mi>' +
      '<mi>x</mi></mrow>');

  this.executeSpeechTest(
      '<munderover><mi>&#x222B;</mi><mn>0</mn><mn>10</mn></munderover>');

  this.executeSpeechTest(
      '<munder><mi>&#x222B;</mi><mi>X</mi></munder>');

  this.executeSpeechTest(
      '<munderover><mi>&#x222B;</mi><mn>0</mn>' +
      '<mn>10</mn></munderover><mi>x</mi>' +
      '<mi>d</mi><mi>x</mi>');

  this.executeSpeechTest(
      '<munder><mi>&#x222B;</mi><mi>X</mi></munder><mi>x</mi><mi>dx</mi>');

  this.executeSpeechTest(
      '<munderover><mi>&#x222B;</mi><mn>0</mn><mn>10</mn></munderover>' +
      '<mi>x</mi><mi>dx</mi><mo>+</mo><munderover><mi>&#x222B;</mi>' +
      '<mn>10</mn><mn>20</mn></munderover><mi>x</mi><mi>dx</mi><mo>=</mo>' +
      '<munderover><mi>&#x222B;</mi><mn>0</mn><mn>20</mn></munderover>' +
      '<mi>x</mi><mi>dx</mi>');

  this.executeSpeechTest(
      '<mi>&#x222B;</mi><mi>&#x222B;</mi><mi>&#x222B;</mi><mi>dx</mi>' +
      '<mi>dy</mi><mi>dz</mi>');
};


/**
 * Translation of text elements.
 */
sre.EnrichSpeechTest.prototype.testSpeechText = function() {
  this.executeSpeechTest(
      '<mtext>text only</mtext>');

  this.executeSpeechTest(
      '<mi>a</mi><mtext>to</mtext>');

  this.executeSpeechTest(
      '<mtext>to</mtext><mi>b</mi>');

  this.executeSpeechTest(
      '<mi>a</mi><mtext>to</mtext><mi>b</mi><mtext>to</mtext><mi>c</mi>');

  this.executeSpeechTest(
      '<mrow><mi>a</mi><mo>+</mo><mi>b</mi>' +
      '<mtext>is generally not the same as</mtext>' +
      '<mi>a</mi><mi>b</mi><mo>.</mo></mrow>');

  this.executeSpeechTest(
      '<mrow><mi>a</mi><mo>+</mo><mi>b</mi>' +
      '<mtext>is not the same as</mtext>' +
      '<mi>a</mi><mi>b</mi><mtext>in general.</mtext></mrow>');
};


/**
 * Translation of mfenced elements.
 */
sre.EnrichSpeechTest.prototype.testSpeechMfenced = function() {
  this.executeSpeechTest(
      '<mfenced open="[" close="]" separators="+ - ;"/>');

  this.executeSpeechTest(
      '<mfenced open="[" separators=""/>');

  this.executeSpeechTest(
      '<mfenced open="[" close="]"/>');

  this.executeSpeechTest(
      '<mfenced close=")"/>');

  this.executeSpeechTest(
      '<mfenced open="[" close="]" separators="+"><mi>x</mi><mfrac>' +
      '<mi>x</mi><mi>y</mi></mfrac><mn>5</mn></mfenced>');

  this.executeSpeechTest(
      '<mfenced open="[" close="]" separators="+ - ;">' +
      '<mi>x</mi>' +
      '<mfrac>' +
      '<mi>x</mi>' +
      '<mi>y</mi>' +
      '</mfrac>' +
      '<mn>5</mn>' +
      '<mn>5</mn>' +
      '<mn>5</mn>' +
      '<mn>5</mn>' +
      '</mfenced>');

  this.executeSpeechTest(
      '<mfenced open="[" close="]">' +
      '<mi>x</mi>' +
      '<mfrac>' +
      '<mi>x</mi>' +
      '<mi>y</mi>' +
      '</mfrac>' +
      '<mn>5</mn>' +
      '<mn>5</mn>' +
      '<mn>5</mn>' +
      '<mn>5</mn>' +
      '</mfenced>');

  this.executeSpeechTest(
      '<mfenced close="]" separators=" ">' +
      '<mi>x</mi>' +
      '<mfrac>' +
      '<mi>x</mi>' +
      '<mi>y</mi>' +
      '</mfrac>' +
      '<mn>5</mn>' +
      '<mn>5</mn>' +
      '<mn>5</mn>' +
      '<mn>5</mn>' +
      '</mfenced>');

  this.executeSpeechTest(
      '<mfenced close="]">' +
      '<mn>1</mn>' +
      '<mn>2</mn>' +
      '<mn>3</mn>' +
      '<mn>4</mn>' +
      '</mfenced>');

  this.executeSpeechTest(
      '<mfenced>' +
      '<mn>1</mn>' +
      '<mn>2</mn>' +
      '<mn>3</mn>' +
      '<mn>4</mn>' +
      '</mfenced>');

  this.executeSpeechTest(
      '<mfenced open="[">' +
      '<mn>1</mn>' +
      '<mn>2</mn>' +
      '<mn>3</mn>' +
      '<mn>4</mn>' +
      '</mfenced>');

  this.executeSpeechTest(
      '<mfenced open="[" close="">' +
      '<mn>1</mn>' +
      '<mn>2</mn>' +
      '<mn>3</mn>' +
      '<mn>4</mn>' +
      '</mfenced>');

  this.executeSpeechTest(
      '<mfenced open="" close="]">' +
      '<mn>1</mn>' +
      '<mn>2</mn>' +
      '<mn>3</mn>' +
      '<mn>4</mn>' +
      '</mfenced>');

  this.executeSpeechTest(
      '<mfenced open=" " close=" " separators=" ">' +
      '<mn>1</mn>' +
      '<mn>2</mn>' +
      '<mn>3</mn>' +
      '<mn>4</mn>' +
      '</mfenced>');

  // this.executeSpeechTest(
  //     '<mfenced open="55" close=" ">' +
  //     '<mn>1</mn>' +
  //     '<mn>2</mn>' +
  //     '<mn>3</mn>' +
  //     '<mn>4</mn>' +
  //     '</mfenced>');

  this.executeSpeechTest(
      '<mfenced open="" close="" separators="">' +
      '<mn>1</mn>' +
      '<mn>2</mn>' +
      '<mn>3</mn>' +
      '<mn>4</mn>' +
      '</mfenced>');

  this.executeSpeechTest(
      '<mrow>' +
      '<mfenced separators="" open="|" close="|">' +
      '<mi>a</mi>' +
      '<mo>&#xb1;</mo>' +
      '<mfenced separators="" open="|" close="|">' +
      '<mi>b</mi>' +
      '<mo>-</mo>' +
      '<mi>c</mi>' +
      '</mfenced>' +
      '</mfenced>' +
      '<mo>&#x2260;</mo>' +
      '<mfenced open="|" close="|">' +
      '<mi>a</mi>' +
      '</mfenced>' +
      '<mo>&#xb1;</mo>' +
      '<mfenced separators="" open="|" close="|">' +
      '<mi>b</mi>' +
      '<mo>-</mo>' +
      '<mi>c</mi>' +
      '</mfenced>' +
      '</mrow>');
};


/**
 * Punctuated elements.
 */
sre.EnrichSpeechTest.prototype.testSpeechPunctuated = function() {
  this.executeSpeechTest(
      '<mi>a</mi><mo>,</mo><mi>b</mi><mo>,</mo><mi>c</mi><mo>,</mo><mi>d</mi>');
  this.executeSpeechTest(
      '<mo>,</mo><mi>b</mi><mo>,</mo><mi>c</mi><mo>,</mo><mi>d</mi>');

  this.executeSpeechTest(
      '<msub><mi>b</mi><mn>1</mn></msub><mo>!</mo>');
  this.executeSpeechTest(
      '<mo>:</mo><msub><mi>b</mi><mn>1</mn></msub>');
  this.executeSpeechTest(
      '<mo>:</mo><msub><mi>b</mi><mn>1</mn></msub><mo>!</mo>');
  this.executeSpeechTest(
      '<mo>,</mo><mo>,</mo><mo>,</mo><mo>!</mo>');
  this.executeSpeechTest(
      '<mo>,</mo><mo>,</mo><mo>,</mo><mo>,</mo>');
  this.executeSpeechTest(
      '<mo>\'</mo><mo>\'</mo><mo>\'</mo><mo>\'</mo>');
  this.executeSpeechTest(
      '<mo>\'</mo><mo>\'</mo><mo>,</mo><mo>\'</mo>');
  this.executeSpeechTest(
      '<mo>!</mo><mo>!</mo><mo>!</mo><mo>!</mo>');
};


// Units.
/**
 * Tests simple expressions containing units.
 */
sre.EnrichSpeechTest.prototype.testSpeechSimpleUnits = function() {
  this.executeSpeechTest(
      '<mi mathvariant="normal" class="MathML-Unit">km</mi>');
  this.executeSpeechTest(
      '<mi>min</mi><mi mathvariant="normal" class="MathML-Unit">min</mi>');
  this.executeSpeechTest(
      '<msup><mi mathvariant="normal" class="MathML-Unit">km</mi>' +
      '<mn>2</mn></msup>');
  this.executeSpeechTest(
      '<mfrac><mi mathvariant="normal" class="MathML-Unit">km</mi>' +
      '<mi mathvariant="normal" class="MathML-Unit">h</mi></mfrac>');
  this.executeSpeechTest(
      '<mfrac><mi>m</mi>' +
      '<mi mathvariant="normal" class="MathML-Unit">km</mi></mfrac>');
  this.executeSpeechTest(
      '<mn>3</mn><mi mathvariant="normal" class="MathML-Unit">km</mi>');
  this.executeSpeechTest(
      '<mn>3</mn><mi mathvariant="normal" class="MathML-Unit">km</mi>' +
      '<mi mathvariant="normal" class="MathML-Unit">h</mi>');
};


/**
 * Tests more complex expressions containing units.
 */
sre.EnrichSpeechTest.prototype.testSpeechComplexUnits = function() {
  this.executeSpeechTest(
      '<mi mathvariant="normal" class="MathML-Unit">s</mi>' +
      '<mn>3</mn><mi>m</mi>' +
      '<mi mathvariant="normal" class="MathML-Unit">km</mi>' +
      '<mi mathvariant="normal" class="MathML-Unit">h</mi>');
  this.executeSpeechTest(
      '<mi mathvariant="normal" class="MathML-Unit">km</mi>' +
      '<msup>' +
      '<mi mathvariant="normal" class="MathML-Unit">s</mi>' +
      '<mn>2</mn></msup>' +
      '<mn>3</mn><mi>m</mi>' +
      '<mi mathvariant="normal" class="MathML-Unit">km</mi>' +
      '<mi mathvariant="normal" class="MathML-Unit">h</mi>');
  this.executeSpeechTest(
      '<mn>3</mn><mi>m</mi>' +
      '<mi mathvariant="normal" class="MathML-Unit">km</mi>' +
      '<mi mathvariant="normal" class="MathML-Unit">h</mi>' +
      '<mfrac>' +
      '<mi>N</mi>' +
      '<msup>' +
      '<mi mathvariant="normal" class="MathML-Unit">s</mi>' +
      '<mn>2</mn></msup></mfrac>');
  this.executeSpeechTest(
      '<mn>3</mn><mi>m</mi>' +
      '<mi mathvariant="normal" class="MathML-Unit">km</mi>' +
      '<mi mathvariant="normal" class="MathML-Unit">h</mi>' +
      '<mfrac>' +
      '<mi mathvariant="normal" class="MathML-Unit">N</mi>' +
      '<msup>' +
      '<mi mathvariant="normal" class="MathML-Unit">s</mi>' +
      '<mn>2</mn></msup></mfrac>');
};


// Tensors.
/**
 * Pathological multiscripts expressions that are actually empty.
 */
sre.EnrichSpeechTest.prototype.testSpeechEmptyTensors = function() {
  this.executeSpeechTest(
      '<mmultiscripts></mmultiscripts>');
  this.executeSpeechTest(
      '<mmultiscripts><none/></mmultiscripts>');
  this.executeSpeechTest(
      '<mmultiscripts><none/><mprescripts/></mmultiscripts>');
  this.executeSpeechTest(
      '<mmultiscripts><none/><mprescripts/><none/></mmultiscripts>');
  this.executeSpeechTest(
      '<mmultiscripts><none/><none/><mprescripts/><none/></mmultiscripts>');
  this.executeSpeechTest(
      '<mmultiscripts><none/><none/><none/>' +
      '<mprescripts/><none/></mmultiscripts>');
  this.executeSpeechTest(
      '<mmultiscripts><none/><none/><none/><mprescripts/>' +
      '<none/><mpadded/></mmultiscripts>');
};


/**
 * Pathological multiscript expressions that are just the base element.
 */
sre.EnrichSpeechTest.prototype.testSpeechBaseTensors = function() {
  this.executeSpeechTest(
      '<mmultiscripts><mi>X</mi></mmultiscripts>');
  this.executeSpeechTest(
      '<mmultiscripts><mi>X</mi><none/></mmultiscripts>');
  this.executeSpeechTest(
      '<mmultiscripts><mi>X</mi><none/><mprescripts/></mmultiscripts>');
  this.executeSpeechTest(
      '<mmultiscripts><mi>X</mi><none/><mprescripts/><none/></mmultiscripts>');
  this.executeSpeechTest(
      '<mmultiscripts><mi>X</mi><none/><none/><none/><mprescripts/><none/>' +
      '</mmultiscripts>');
  this.executeSpeechTest(
      '<mmultiscripts><mrow><mi>X</mi><mo>+</mo><mi>Y</mi></mrow>' +
      '<none/><mpadded/></mmultiscripts>');
};


/**
 * Pathological multiscript expressions that are actually on right
 * sub/superscripts.
 */
sre.EnrichSpeechTest.prototype.testSpeechRightScriptTensors = function() {
  this.executeSpeechTest(
      '<mmultiscripts><mi>X</mi><mi>i</mi></mmultiscripts>');
  this.executeSpeechTest(
      '<mmultiscripts><mi>X</mi><mi>i</mi><none/></mmultiscripts>');
  this.executeSpeechTest(
      '<mmultiscripts><mi>X</mi><none/><mi>i</mi></mmultiscripts>');
  this.executeSpeechTest(
      '<mmultiscripts><mi>X</mi><mi>i</mi><mi>j</mi></mmultiscripts>');
  this.executeSpeechTest(
      '<mmultiscripts><mpadded><mi>X</mi></mpadded><mi>i</mi>' +
      '<mpadded><mi>j</mi></mpadded></mmultiscripts>');
  this.executeSpeechTest(
      '<mmultiscripts><mi>X</mi><mi>i</mi><mi>j</mi>' +
      '<mprescripts/><none/></mmultiscripts>');
  this.executeSpeechTest(
      '<mmultiscripts><mi>X</mi><mi>i</mi><mi>j</mi><mi>k</mi><mi>l</mi>' +
      '<mprescripts/><none/></mmultiscripts>');
  this.executeSpeechTest(
      '<mmultiscripts><mi>X</mi><mi>i</mi><none/><mi>j</mi><none/>' +
      '<mprescripts/><none/></mmultiscripts>');
  this.executeSpeechTest(
      '<mmultiscripts><mi>X</mi><none/><mi>i</mi><none/><mi>j</mi>' +
      '<mprescripts/><none/></mmultiscripts>');
};


/**
 * Simple multiscript expressions with some scripts on the left.
 */
sre.EnrichSpeechTest.prototype.testSpeechSimpleTensors = function() {
  this.executeSpeechTest(
      '<mmultiscripts><mi>A</mi><mn>1</mn><mn>2</mn><mprescripts/>' +
      '<mn>3</mn><mn>4</mn></mmultiscripts>');
  this.executeSpeechTest(
      '<mmultiscripts><mi>A</mi><mn>1</mn><none/><mprescripts/>' +
      '<mn>3</mn><mn>4</mn></mmultiscripts>');
  this.executeSpeechTest(
      '<mmultiscripts><mi>A</mi><mn>1</mn><mprescripts/>' +
      '<mn>3</mn><mn>4</mn></mmultiscripts>');
  this.executeSpeechTest(
      '<mmultiscripts><mi>A</mi><none/><mn>2</mn><mprescripts/>' +
      '<mn>3</mn><mn>4</mn></mmultiscripts>');
  this.executeSpeechTest(
      '<mmultiscripts><mi>A</mi><none/><none/><mprescripts/>' +
      '<mn>3</mn><mn>4</mn></mmultiscripts>');
  this.executeSpeechTest(
      '<mmultiscripts><mi>A</mi><mpadded/><mprescripts/>' +
      '<mn>3</mn><mn>4</mn></mmultiscripts>');
  this.executeSpeechTest(
      '<mmultiscripts><mi>A</mi><mprescripts/>' +
      '<mn>3</mn><mn>4</mn></mmultiscripts>');
  this.executeSpeechTest(
      '<mmultiscripts><mi>A</mi><mprescripts/>' +
      '<mn>3</mn></mmultiscripts>');
  this.executeSpeechTest(
      '<mmultiscripts><mi>A</mi><mprescripts/>' +
      '<none/><mn>4</mn></mmultiscripts>');
  this.executeSpeechTest(
      '<mmultiscripts><mi>A</mi><mn>1</mn><mprescripts/>' +
      '<none/><mn>4</mn></mmultiscripts>');
  this.executeSpeechTest(
      '<mmultiscripts><mi>A</mi><none/><mn>2</mn><mprescripts/>' +
      '<mn>3</mn></mmultiscripts>');
  this.executeSpeechTest(
      '<mmultiscripts><mpadded><mi>A</mi></mpadded><none/>' +
      '<mpadded><mn>2</mn></mpadded><mprescripts/>' +
      '<mn>3</mn></mmultiscripts>');
};


/**
 * Complex multiscript expressions with some scripts on the left.
 */
sre.EnrichSpeechTest.prototype.testSpeechComplexTensors = function() {
  this.executeSpeechTest(
      '<mmultiscripts><mi>A</mi><mn>3</mn><mn>4</mn><mi>k</mi><mi>l</mi>' +
      '<mprescripts/><mn>1</mn><mn>2</mn><mi>i</mi><mi>j</mi></mmultiscripts>');
  this.executeSpeechTest(
      '<mmultiscripts><mi>A</mi><mn>3</mn><none/><mi>k</mi><mi>l</mi>' +
      '<mprescripts/><mn>1</mn><none/><none/><mi>j</mi></mmultiscripts>');
  this.executeSpeechTest(
      '<mmultiscripts><mi>A</mi><mn>1</mn><mn>2</mn><mn>3</mn><mprescripts/>' +
      '<mn>4</mn></mmultiscripts>');
  this.executeSpeechTest(
      '<mmultiscripts><mi>A</mi><mn>1</mn><mn>2</mn><mn>3</mn><mprescripts/>' +
      '<mn>5</mn><mn>4</mn><mn>6</mn></mmultiscripts>');
  this.executeSpeechTest(
      '<mmultiscripts><mpadded><mi>A</mi></mpadded><mpadded><mn>1</mn>' +
      '</mpadded><mpadded><mn>2</mn></mpadded><mpadded><mn>3</mn>' +
      '</mpadded><mprescripts/>' +
      '<mpadded><mn>5</mn></mpadded><mpadded><mn>4</mn></mpadded>' +
      '<mpadded><mn>6</mn></mpadded></mmultiscripts>');
  this.executeSpeechTest(
      '<mmultiscripts><mrow><mi>X</mi><mo>+</mo><mi>Y</mi></mrow>' +
      '<mn>1</mn><mn>2</mn><mprescripts/><none/><mn>3</mn></mmultiscripts>');
};


// Expressions containing ignored tags.
/**
 * Expressions containing pseudo unit children, i.e., children whose only
 * siblings are ignored nodes.
 */
sre.EnrichSpeechTest.prototype.testSpeechPseudoUnitChildren = function() {
  this.executeSpeechTest(
      '<mi>a</mi><mspace/>');
  this.executeSpeechTest(
      '<mi>i</mi><merror><mi>Y</mi></merror>');
  this.executeSpeechTest(
      '<mphantom><mtext>nix</mtext></mphantom><mi>i</mi>' +
      '<merror><mi>Y</mi></merror>');
  this.executeSpeechTest(
      '<mrow><mphantom><mtext>nix</mtext></mphantom><mi>i</mi>' +
      '<merror><mi>Y</mi></merror></mrow>');
  this.executeSpeechTest(
      '<mrow><mphantom><mtext>nix</mtext></mphantom><mi>i</mi>' +
      '<merror><mi>Y</mi></merror></mrow>' +
      '<merror><mtext>nothing</mtext></merror>');
  this.executeSpeechTest(
      '<mrow><mphantom><mtext>nix</mtext></mphantom><mrow><mi>i</mi></mrow>' +
      '<merror><mi>Y</mi></merror></mrow><merror>' +
      '<mtext>nothing</mtext></merror>');
  this.executeSpeechTest(
      '<mrow><mphantom><mtext>nix</mtext></mphantom><mrow><mi>i</mi' +
      '><mi>j</mi></mrow><merror><mi>Y</mi></merror></mrow>' +
      '<merror><mtext>nothing</mtext></merror>');
};


/**
 * Expressions with ignore tags, introducing a new mrow.
 */
sre.EnrichSpeechTest.prototype.testSpeechInterspersedIgnore = function() {
  this.executeSpeechTest(
      '<mphantom><mtext>nix</mtext></mphantom><mi>i</mi><mi>j</mi>' +
      '<merror><mi>Y</mi></merror>');
  this.executeSpeechTest(
      '<mphantom><mtext>nix</mtext></mphantom><mi>i</mi><mo>+</mo><mi>j</mi>' +
      '<merror><mi>Y</mi></merror>');
  this.executeSpeechTest(
      '<mi>i</mi><merror><mtext>nothing</mtext></merror><mo>+</mo><mi>j</mi>');
  this.executeSpeechTest(
      '<mi>i</mi><merror><mtext>nothing</mtext></merror><mi>j</mi>');
  this.executeSpeechTest(
      '<mphantom><mtext>nix</mtext></mphantom><mi>i</mi><merror>' +
      '<mtext>nothing</mtext></merror><mo>+</mo>' +
      '<mi>j</mi><merror><mi>Y</mi></merror>');
};


/**
 * Expressions with over and under scores.
 */
sre.EnrichSpeechTest.prototype.testSpeechMunderOver = function() {
  this.executeSpeechTest(
      '<munder><mo>&#x2192;</mo><mi>n</mi></munder>');
  this.executeSpeechTest(
      '<mover><mo>&#x2192;</mo><mtext>above</mtext></mover>');
  this.executeSpeechTest(
      '<munderover><mo>&#x2192;</mo><mi>n</mi><mtext>above</mtext>' +
      '</munderover>');
};


// Embellished operators.
/**
 * Simple embellished arguments.
 */
sre.EnrichSpeechTest.prototype.testSpeechSimpleEmbellishment = function() {
  this.executeSpeechTest(
      '<msup><mi>\u222B</mi><mn>2</mn></msup>');
  this.executeSpeechTest(
      '<msup><mi>f</mi><mn>2</mn></msup>');
  this.executeSpeechTest(
      '<msup><mo>(</mo><mn>2</mn></msup>');
  this.executeSpeechTest(
      '<msup><mo>=</mo><mn>2</mn></msup>');
  this.executeSpeechTest(
      '<msup><mo>+</mo><mn>2</mn></msup>');
  this.executeSpeechTest(
      '<msup><mo>,</mo><mn>2</mn></msup>');
};


/**
 * Multi embellished arguments.
 */
sre.EnrichSpeechTest.prototype.testSpeechMultiEmbellishment = function() {
  this.executeSpeechTest(
      '<msub><msup><mo>+</mo><mn>2</mn></msup><mi>x</mi></msub>');
  this.executeSpeechTest(
      '<mmultiscripts><mo>+</mo><mn>2</mn><mi>x</mi></mmultiscripts>');
  this.executeSpeechTest(
      '<mover><msub><msup><mo>+</mo><mn>2</mn></msup><mi>x</mi>' +
      '</msub><mo>-</mo></mover>');
  this.executeSpeechTest(
      '<msup><mo>+</mo><msub><mi>x</mi><mn>2</mn></msub></msup>');
  this.executeSpeechTest(
      '<msub><munder><mo>+</mo><mn>2</mn></munder><mi>x</mi></msub>');
  this.executeSpeechTest(
      '<mmultiscripts><mi>(</mi><none/><none/>' +
      '<mprescripts/><mn>1</mn><mi>j</mi></mmultiscripts>');
  this.executeSpeechTest(
      '<mmultiscripts><mi>(</mi><none/><mi>K</mi>' +
      '<mprescripts/><mn>1</mn><mi>j</mi></mmultiscripts>');
  this.executeSpeechTest(
      '<mmultiscripts><mi>(</mi><mn>1</mn><mi>j</mi></mmultiscripts>');
};


/**
 * Expressions with embellished operators and relations.
 */
sre.EnrichSpeechTest.prototype.testSpeechComplexEmbellishment = function() {
  this.executeSpeechTest(
      '<mi>a</mi><msub><mo>=</mo><mn>2</mn></msub><mi>x</mi><msub><mo>=</mo>' +
      '<mn>2</mn></msub><mi>z</mi>');
  this.executeSpeechTest(
      '<mi>a</mi><msub><mo>=</mo><mn>2</mn></msub><mi>x</mi><msub><mo>=</mo>' +
      '<mn>4</mn></msub><mi>z</mi>');
  this.executeSpeechTest(
      '<mi>a</mi><msub><mo>+</mo><mn>2</mn></msub><mi>x</mi><msub><mo>+</mo>' +
      '<mn>2</mn></msub><mi>z</mi>');
  this.executeSpeechTest(
      '<mi>a</mi><msub><mo>+</mo><mn>2</mn></msub><mi>x</mi><msub><mo>+</mo>' +
      '<mn>4</mn></msub><mi>z</mi>');
  this.executeSpeechTest(
      '<mi>a</mi><msub><mo>+</mo><mn>2</mn></msub><mi>b</mi><msup><mo>=</mo>' +
      '<mo>\'</mo></msup><mi>x</mi><msub><mo>+</mo><mn>4</mn></msub><mi>z</mi>');
  this.executeSpeechTest(
      '<mi>a</mi><msub><mo>:</mo><mn>2</mn></msub><mi>b</mi><msup><mo>,</mo>' +
      '<mo>\'</mo></msup><mi>x</mi><msub><mo>:</mo><mn>4</mn></msub><mi>z</mi>');
  this.executeSpeechTest(
      '<msub><mo>+</mo><mn>2</mn></msub><msub><mo>+</mo>' +
      '<mn>3</mn></msub><mi>x</mi>');
  this.executeSpeechTest(
      '<mi>x</mi><msub><mo>+</mo><mn>2</mn></msub><msub><mo>+</mo>' +
      '<mn>3</mn></msub>');
};


// Embellished Fences
/**
 * Expressions with embellished fences right.
 */
sre.EnrichSpeechTest.prototype.testSpeechEmbellishedRightFence = function() {
  this.executeSpeechTest(
      '<mo>(</mo><mi>x</mi><msup><mo>)</mo><mn>4</mn></msup>');
  this.executeSpeechTest(
      '<mo>(</mo><mi>x</mi><msub><msup><mo>)</mo><mn>4</mn></msup>' +
      '<mn>2</mn></msub>');
  this.executeSpeechTest(
      '<mo>(</mo><mi>x</mi><msubsup><mo>)</mo><mn>4</mn><mn>2</mn></msubsup>');
  this.executeSpeechTest(
      '<mo>(</mo><mi>x</mi><mmultiscripts><mo>)</mo><mn>4</mn><mn>2</mn>' +
      '</mmultiscripts>');
  this.executeSpeechTest(
      '<mo>(</mo><mi>x</mi><msup><munder><msub><mover><mo>)</mo><mo>^</mo>' +
      '</mover><mn>2</mn></msub><mo>~</mo></munder><mn>1</mn></msup>');
  this.executeSpeechTest(
      '<mo>(</mo><mi>x</mi><mpadded><msup><munder><msub><mover><mo>)</mo>' +
      '<mo>^</mo></mover><mn>2</mn></msub><mo>~</mo></munder><mn>3</mn>' +
      '</msup></mpadded>');
};


/**
 * Expressions with embellished fences left.
 */
sre.EnrichSpeechTest.prototype.testSpeechEmbellishedLeftFence = function() {
  this.executeSpeechTest(
      '<msup><mo>(</mo><mn>4</mn></msup><mi>x</mi><mo>)</mo>');
  this.executeSpeechTest(
      '<mmultiscripts><mo>(</mo><mn>4</mn></mmultiscripts><mi>x</mi><mo>)</mo>');
  this.executeSpeechTest(
      '<mmultiscripts><mo>(</mo><mprescripts/><mn>4</mn></mmultiscripts>' +
      '<mi>x</mi><mo>)</mo>');
  this.executeSpeechTest(
      '<mmultiscripts><mo>(</mo><mprescripts/><mn>4</mn><mn>3</mn>' +
      '</mmultiscripts><mi>x</mi><mo>)</mo>');
  this.executeSpeechTest(
      '<mmultiscripts><mo>(</mo><mn>2</mn><mprescripts/><mn>4</mn><mn>3</mn>' +
      '</mmultiscripts><mi>x</mi><mo>)</mo>');
  this.executeSpeechTest(
      '<mmultiscripts><munder><mo>(</mo><mo>~</mo></munder>' +
      '<mprescripts/><mn>4</mn><mn>3</mn>' +
      '</mmultiscripts><mi>x</mi><mo>)</mo>');
  this.executeSpeechTest(
      '<mmultiscripts><mover><mmultiscripts><munder><mo>(</mo><mo>~</mo>' +
      '</munder><mprescripts/><none/><mn>3</mn></mmultiscripts><mo>^</mo>' +
      '</mover><mprescripts/><mn>4</mn>' +
      '</mmultiscripts><mi>x</mi><mo>)</mo>');
};


/**
 * Expressions with embellished fences on both sides.
 */
sre.EnrichSpeechTest.prototype.testSpeechEmbellishedBothFences = function() {
  this.executeSpeechTest(
      '<mmultiscripts><mo>(</mo><mprescripts/><mn>4</mn></mmultiscripts>' +
      '<mi>x</mi><msup><mo>)</mo><mn>2</mn></msup>');
  this.executeSpeechTest(
      '<mmultiscripts><mo>(</mo><mprescripts/><mn>4</mn><mn>3</mn>' +
      '</mmultiscripts><mi>x</mi><msubsup><mo>)</mo><mn>1</mn>' +
      '<mn>2</mn></msubsup>');
  this.executeSpeechTest(
      '<munder><mmultiscripts><mo>(</mo><mprescripts/><mn>4</mn><mn>3</mn>' +
      '</mmultiscripts><mo>~</mo></munder>' +
      '<mi>x</mi><mover><msubsup><mo>)</mo><mn>1</mn><mn>2</mn>' +
      '</msubsup><mo>^</mo></mover>');
};


/**
 * Expressions with padded background.
 */
sre.EnrichSpeechTest.prototype.testSpeechEmbellishedPaddedFences =
    function() {
  this.executeSpeechTest(
      '<mo>(</mo><mi>x</mi><mpadded mathbackground="red"><msup><munder>' +
      '<msub><mover><mo>)</mo>' +
      '<mo>^</mo></mover><mn>2</mn></msub><mo>~</mo></munder><mn>3</mn>' +
      '</msup></mpadded>');
  this.executeSpeechTest(
      '<mpadded mathbackground="red"><mmultiscripts><mover><mmultiscripts>' +
      '<munder><mo>(</mo><mo>~</mo>' +
      '</munder><mprescripts/><none/><mn>3</mn></mmultiscripts><mo>^</mo>' +
      '</mover><mprescripts/><mn>4</mn>' +
      '</mmultiscripts></mpadded><mi>x</mi><mo>)</mo>');
  this.executeSpeechTest(
      '<mpadded mathbackground="blue"><munder><mmultiscripts><mo>(</mo>' +
      '<mprescripts/><mn>4</mn><mn>3</mn>' +
      '</mmultiscripts><mo>~</mo></munder></mpadded>' +
      '<mi>x</mi><mpadded mathbackground="red"><mover><msubsup><mo>)</mo>' +
      '<mn>1</mn><mn>2</mn></msubsup><mo>^</mo></mover></mpadded>');
};


/**
 * Expressions with embellished right fences as a sub-expression.
 */
sre.EnrichSpeechTest.prototype.testSpeechEmbellRightSubexpr = function() {
  this.executeSpeechTest(
      '<mo>(</mo><mi>x</mi><msup><mo>)</mo><mn>4</mn></msup>' +
      '<mo>+</mo><mn>1</mn>');
  this.executeSpeechTest(
      '<mn>2</mn><mo>+</mo>' +
      '<mo>(</mo><mi>x</mi><msup><mo>)</mo><mn>4</mn></msup>' +
      '<mo>+</mo><mn>1</mn>');
  this.executeSpeechTest(
      '<mo>-</mo>' +
      '<mo>(</mo><mi>x</mi><msup><mo>)</mo><mn>4</mn></msup>' +
      '<mo>+</mo><mn>1</mn>');
};


/**
 * Expressions with embellished left fences as a sub-expression.
 */
sre.EnrichSpeechTest.prototype.testSpeechEmbellLeftSubexpr = function() {
  this.executeSpeechTest(
      '<mmultiscripts><mo>(</mo><mprescripts/><mn>4</mn><mn>3</mn>' +
      '</mmultiscripts><mi>x</mi><mo>)</mo><mo>+</mo><mn>1</mn>');
  this.executeSpeechTest(
      '<mo>-</mo><mmultiscripts><mo>(</mo><mprescripts/><mn>4</mn><mn>3</mn>' +
      '</mmultiscripts><mi>x</mi><mo>)</mo><mo>+</mo><mn>1</mn>');
  this.executeSpeechTest(
      '<mi>k</mi><mo>+</mo><mmultiscripts><mo>(</mo><mprescripts/><mn>4</mn>' +
      '<mn>3</mn></mmultiscripts><mi>x</mi><mo>)</mo><mo>+</mo><mn>1</mn>');
};


/**
 * Expressions with embellished both fences as a sub-expression.
 */
sre.EnrichSpeechTest.prototype.testSpeechEmbellBothSubexpr = function() {
  this.executeSpeechTest(
      '<mmultiscripts><mo>(</mo><mprescripts/><mn>4</mn><mn>3</mn>' +
      '</mmultiscripts><mi>x</mi><msubsup><mo>)</mo><mn>1</mn>' +
      '<mn>2</mn></msubsup><mo>+</mo><mn>1</mn>');
  this.executeSpeechTest(
      '<mo>-</mo><mmultiscripts><mo>(</mo><mprescripts/><mn>4</mn><mn>3</mn>' +
      '</mmultiscripts><mi>x</mi><msubsup><mo>)</mo><mn>1</mn>' +
      '<mn>2</mn></msubsup><mo>+</mo><mn>1</mn>');
  this.executeSpeechTest(
      '<mi>k</mi><mo>-</mo><mmultiscripts><mo>(</mo><mprescripts/><mn>4</mn>' +
      '<mn>3</mn></mmultiscripts><mi>x</mi><msubsup><mo>)</mo><mn>1</mn>' +
      '<mn>2</mn></msubsup><mo>+</mo><mn>1</mn>');
};


/**
 * Expressions with embellished fences right and complex content.
 */
sre.EnrichSpeechTest.prototype.testSpeechComplexEmbellRight = function() {
  this.executeSpeechTest(
      '<mo>(</mo><mi>x</mi><mo>+</mo><mi>y</mi><msup><mo>)</mo>' +
      '<mn>4</mn></msup>');
  this.executeSpeechTest(
      '<mo>(</mo><mi>x</mi><mo>+</mo><mi>y</mi><msub><mo>)</mo>' +
      '<mn>4</mn></msub>');
};


/**
 * Set expressions.
 */
sre.EnrichSpeechTest.prototype.testSpeechSets = function() {
  this.executeSpeechTest('<mo>{</mo><mo>}</mo>');
  this.executeSpeechTest('<mo>{</mo><mi>x</mi><mo>}</mo>');
  this.executeSpeechTest('<mo>{</mo><mi>x</mi><mo>|</mo><mi>y</mi><mo>}</mo>');
  this.executeSpeechTest('<mo>{</mo><mi>x</mi><mo>:</mo><mi>y</mi><mo>}</mo>');
  this.executeSpeechTest('<mo>{</mo><mi>x</mi><mo>+</mo><mi>y</mi><mo>}</mo>');
  this.executeSpeechTest('<mo>{</mo><mi>x</mi><mi>y</mi><mo>}</mo>');
  this.executeSpeechTest('<mo>{</mo><mfrac><mi>x</mi><mi>y</mi></mfrac>' +
                         '<mo>}</mo>');
  this.executeSpeechTest('<mi>P</mi><mo>{</mo><mi>x</mi><mo>}</mo>');
};

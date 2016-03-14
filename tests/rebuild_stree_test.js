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

goog.require('sre.AbstractTest');
goog.require('sre.DomUtil');
goog.require('sre.Enrich');
goog.require('sre.RebuildStree');



/**
 * @constructor
 * @extends {sre.AbstractTest}
 */
sre.RebuildStreeTest = function() {
  goog.base(this);

  /**
   * @override
   */
  this.information = 'Semantic tree rebuilding tests.';

  sre.Engine.getInstance().mathmlSpeech = false;
};
goog.inherits(sre.RebuildStreeTest, sre.AbstractTest);


/**
 * Tests if for a given mathml snippet results in a particular semantic tree.
 * @param {string} expr MathML expression.
 */
sre.RebuildStreeTest.prototype.executeRebuildTest = function(expr) {
  var mathMl = sre.Enrich.prepareMmlString(expr);
  var mml = sre.DomUtil.parseInput(mathMl);
  var stree = new sre.SemanticTree(mml);
  var emml = sre.EnrichMathml.enrich(mml, stree);
  var reass = new sre.RebuildStree(emml);

  this.assert.equal(stree.toString(), reass.toString());
};


// Empty wrappers.
/**
 * Test for empty wrapping elements.
 */
sre.RebuildStreeTest.prototype.testRebuildWrappers = function() {
  this.executeRebuildTest(
      '<mrow><mrow><mi>a</mi></mrow></mrow><mrow><mi>b</mi></mrow>');
  this.executeRebuildTest(
      '<mstyle><mi>q</mi><mpadded><mstyle><mrow><mi>x</mi><mo>+</mo>' +
      '</mrow></mstyle><mpadded><mrow><mi>a</mi></mrow><mrow><mi>a</mi>' +
      '</mrow></mpadded><mtext>nix</mtext></mpadded></mstyle>');
  this.executeRebuildTest(
      '<mrow class="MJX-TeXAtom-ORD"><mo stretchy="false">|</mo></mrow>' +
      '<mi>x</mi>' +
      '<mrow class="MJX-TeXAtom-ORD"><mo stretchy="false">|</mo></mrow>');
};


// Sub, Superscripts.
/**
 * Test for sub super and subsuper scripts.
 */
sre.RebuildStreeTest.prototype.testRebuildScripts = function() {
  this.executeRebuildTest(
      '<msub><mi>a</mi><mi>b</mi></msub>');
  this.executeRebuildTest(
      '<msubsup><mi>a</mi><mi>b</mi><mi>c</mi></msubsup>');
  this.executeRebuildTest(
      '<mphantom/><msub><mi>a</mi><mpadded><mi>b</mi></mpadded></msub>' +
      '<merror/>');
  this.executeRebuildTest(
      '<mphantom/><msup><mi>a</mi><mpadded><mi>b</mi></mpadded></msup>' +
      '<merror/>');
  this.executeRebuildTest(
      '<mphantom/><msubsup><mi>a</mi><mpadded><mi>b</mi></mpadded>' +
      '<mpadded><mi>c</mi></mpadded></msubsup><merror/>');
  this.executeRebuildTest(
      '<mphantom/><msubsup><mpadded><mi>a</mi></mpadded><mi>b</mi>' +
      '<mpadded><mi>c</mi></mpadded></msubsup><merror/>');
  this.executeRebuildTest(
      '<mphantom/><msubsup><mi>a</mi><mpadded><mi>b</mi><mi>d</mi></mpadded>' +
      '<mpadded><mi>c</mi></mpadded></msubsup><merror/>');
};


// Numbers.
/**
 * Test number representations.
 */
sre.RebuildStreeTest.prototype.testRebuildNumbers = function() {
  this.executeRebuildTest(
      '<mn>2</mn>');
  this.executeRebuildTest(
      '<mn>2.0</mn>');
  this.executeRebuildTest(
      '<mn>2t3</mn>');
  this.executeRebuildTest(
      '<mfrac><mn>1</mn><mn>2</mn></mfrac>');
  this.executeRebuildTest(
      '<mfrac><mn>1</mn><mn>2.5</mn></mfrac>');
};


/**
 * Test mixed number representations.
 */
sre.RebuildStreeTest.prototype.testRebuildMixedNumbers = function() {
  this.executeRebuildTest(
      '<mn>3</mn><mfrac><mn>1</mn><mn>2</mn></mfrac>');
  this.executeRebuildTest(
      '<mfrac><mn>1</mn><mn>2</mn></mfrac><mn>3</mn>');
  this.executeRebuildTest(
      '<mn>3.0</mn><mfrac><mn>1</mn><mn>2</mn></mfrac>');
  this.executeRebuildTest(
      '<mfrac><mn>1</mn><mn>2</mn></mfrac><mn>3.0</mn>');
  this.executeRebuildTest(
      '<mn>3</mn><mfrac><mn>1</mn><mn>2</mn></mfrac><mi>a</mi>');
  this.executeRebuildTest(
      '<mi>b</mi><mn>3</mn><mfrac><mn>1</mn><mn>2</mn></mfrac><mi>a</mi>');
};


// Relations.
/**
 * Test relation trees.
 */
sre.RebuildStreeTest.prototype.testRebuildRelations = function() {
  this.executeRebuildTest(
      '<mo>=</mo>');
  this.executeRebuildTest(
      '<mi>a</mi><mo>=</mo><mi>b</mi>');
  this.executeRebuildTest(
      '<mi>a</mi><mo>=</mo><mi>b</mi><mo>=</mo><mi>c</mi>');
  this.executeRebuildTest(
      '<mi>a</mi><mo>=</mo><mi>b</mi><mo>=</mo><mi>c</mi>' +
      '<mo>&#x2264;</mo><mi>d</mi>');
};


// Operators.
/**
 * Test operator trees with pre- and postfixes.
 */
sre.RebuildStreeTest.prototype.testRebuildPrePostfixOperators = function() {
  // Pathological operator only case.
  this.executeRebuildTest(
      '<mo>+</mo><mo>-</mo><mo>+</mo>');
  // Single identifier with prefixes.
  this.executeRebuildTest(
      '<mo>+</mo><mo>+</mo><mi>a</mi>');
  // Single identifier with prefix and negative.
  this.executeRebuildTest(
      '<mo>+</mo><mo>-</mo><mi>a</mi>');
  // Single identifier with postfixes.
  this.executeRebuildTest(
      '<mi>a</mi><mo>+</mo><mo>-</mo>');
  // Single identifier with pre- and postfixes.
  this.executeRebuildTest(
      '<mo>+</mo><mo>+</mo><mi>a</mi><mo>+</mo><mo>+</mo>');
  // Single identifier with mixed pre- and postfixes.
  this.executeRebuildTest(
      '<mo>&#x2213;</mo><mo>+</mo><mi>a</mi><mo>&#x2213;</mo><mo>+</mo>');
  // Two identifiers with pre- and postfixes.
  this.executeRebuildTest(
      '<mo>+</mo><mo>+</mo><mi>a</mi><mo>&#x2213;</mo><mo>+</mo>' +
      '<mi>b</mi><mo>+</mo>');
  // Three identifiers with pre- and postfixes.
  this.executeRebuildTest(
      '<mo>+</mo><mo>+</mo><mi>a</mi><mo>&#x2213;</mo><mo>+</mo>' +
      '<mi>b</mi><mo>+</mo><mo>&#x2213;</mo><mi>c</mi><mo>+</mo>');
};


/**
 * Test operator trees with single operator.
 */
sre.RebuildStreeTest.prototype.testRebuildSingleOperators = function() {
  // Single identifier.
  this.executeRebuildTest(
      '<mi>a</mi>');
  // Single implicit node.
  this.executeRebuildTest(
      '<mi>a</mi><mi>b</mi>');
  // Implicit multi node.
  this.executeRebuildTest(
      '<mi>a</mi><mi>b</mi><mi>c</mi>');
  // Single addition.
  this.executeRebuildTest(
      '<mi>a</mi><mo>+</mo><mi>b</mi>');
  // Multi addition.
  this.executeRebuildTest(
      '<mi>a</mi><mo>+</mo><mi>b</mi><mo>+</mo><mi>c</mi>');
  // Multi addition with implicit node.
  this.executeRebuildTest(
      '<mi>a</mi><mo>+</mo><mi>b</mi><mi>c</mi><mo>+</mo><mi>d</mi>');
};


/**
 * Test operator trees with multiple operators.
 */
sre.RebuildStreeTest.prototype.testRebuildMultipleOperators = function() {
  // Addition and subtraction.
  this.executeRebuildTest(
      '<mi>a</mi><mo>+</mo><mi>b</mi><mo>-</mo><mi>c</mi><mo>+</mo><mi>d</mi>');
  // Addition and subtraction.
  this.executeRebuildTest(
      '<mi>a</mi><mo>+</mo><mi>b</mi><mo>+</mo><mi>c</mi><mo>-</mo>' +
      '<mi>d</mi><mo>-</mo><mi>e</mi>');
  // Addition and explicit multiplication.
  this.executeRebuildTest(
      '<mi>a</mi><mo>+</mo><mi>b</mi><mo>&#x2218;</mo><mi>c</mi><mo>+</mo>' +
      '<mi>d</mi>');
  // Addition with explicit and implicit multiplication.
  this.executeRebuildTest(
      '<mi>a</mi><mo>+</mo><mi>b</mi><mo>&#x2218;</mo><mi>c</mi><mi>d</mi>' +
      '<mo>+</mo><mi>e</mi><mo>&#x2218;</mo><mi>f</mi>');
  // Two Additions, subtraction plus explicit and implicit multiplication,
  // one prefix and one postfix.
  this.executeRebuildTest(
      '<mi>a</mi><mo>+</mo><mi>b</mi><mo>+</mo><mi>c</mi><mi>d</mi>' +
      '<mo>+</mo><mi>e</mi><mo>&#x2218;</mo><mi>f</mi><mo>-</mo><mi>g</mi>' +
      '<mo>+</mo><mo>+</mo><mi>h</mi><mo>&#x2295;</mo><mi>i</mi>' +
      '<mo>&#x2295;</mo><mi>j</mi><mo>+</mo><mo>+</mo>');
};


/**
 * Test operator trees with multiplication operators.
 */
sre.RebuildStreeTest.prototype.testRebuildMultiplicationOperators =
    function() {
  // Addition and subtraction.
  this.executeRebuildTest(
      '<mi>a</mi><mo>*</mo><mi>b</mi><mo>*</mo><mi>c</mi><mo>*</mo><mi>d</mi>');
  this.executeRebuildTest(
      '<mrow>' +
      '<mn>1</mn><mi>a</mi><mo>&#x00B7;</mo><mi>m</mi>' +
      '</mrow>');
  this.executeRebuildTest(
      '<mrow>' +
      '<mn>1</mn><mi>a</mi><mo>&#x00B7;</mo>' +
      '<mi>m</mi><mo>&#x00B7;</mo><mi>s</mi>' +
      '</mrow>');
  this.executeRebuildTest(
      '<mrow>' +
      '<mn>1</mn><mi>a</mi><mo>&#x00B7;</mo>' +
      '<mi>m</mi><mo>&#x00B7;</mo>' +
      '<mi>s</mi><mo>&#x00B7;</mo>' +
      '<mi>c</mi><mi>b</mi><mo>&#x00B7;</mo>' +
      '<mi>k</mi>' +
      '</mrow>');
  this.executeRebuildTest(
      '<mrow>' +
      '<mn>1</mn><mi>a</mi><mo>&#x00B7;</mo>' +
      '<msup><mi>m</mi><mn>2</mn></msup>' +
      '<mo>&#x00B7;</mo>' +
      '<msup><mi>s</mi><mrow><mo>-</mo><mn>2</mn></mrow>' +
      '</msup></mrow>');
  this.executeRebuildTest(
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
sre.RebuildStreeTest.prototype.testRebuildRegularFences = function() {
  // No fence.
  this.executeRebuildTest(
      '<mrow><mi>a</mi><mo>+</mo><mi>b</mi></mrow>');
  // Empty parentheses.
  this.executeRebuildTest(
      '<mo>(</mo><mo>)</mo>');
  // Single Fenced Expression.
  this.executeRebuildTest(
      '<mrow><mo>(</mo><mi>a</mi><mo>+</mo><mi>b</mi><mo>)</mo></mrow>');
  // Single Fenced Expression and operators.
  this.executeRebuildTest(
      '<mrow><mi>a</mi><mo>+</mo><mo>(</mo><mi>b</mi><mo>+</mo><mi>c</mi>' +
      '<mo>)</mo><mo>+</mo><mi>d</mi></mrow>');
  // Parallel Parenthesis.
  this.executeRebuildTest(
      '<mrow><mo>(</mo><mi>a</mi><mo>+</mo><mi>b</mi><mo>)</mo><mo>(</mo>' +
      '<mi>c</mi><mo>+</mo><mi>d</mi><mo>)</mo></mrow>');
  // Nested Parenthesis.
  this.executeRebuildTest(
      '<mrow><mo>(</mo><mo>(</mo><mi>a</mi><mo>+</mo><mi>b</mi><mo>)</mo>' +
      '<mo>(</mo><mi>c</mi><mo>+</mo><mi>d</mi><mo>)</mo><mo>)</mo></mrow>');
  // Nested parenthesis and brackets.
  this.executeRebuildTest(
      '<mrow><mo>(</mo><mo>[</mo><mi>a</mi><mo>+</mo><mi>b</mi><mo>+</mo>' +
      '<mi>c</mi><mo>]</mo><mo>+</mo><mi>d</mi><mo>)</mo></mrow>');
  // Nested parenthesis, brackets, braces and superscript operator.
  this.executeRebuildTest(
      '<mrow><mo>(</mo><msup><mi>a</mi><mrow><mn>2</mn><mo>[</mo><mi>i</mi>' +
      '<mo>+</mo><mi>n</mi><mo>]</mo></mrow></msup><mo>+</mo><mi>b</mi>' +
      '<mo>)</mo><mo>+</mo><mo>{</mo><mi>c</mi><mi>d</mi><mo>-</mo><mo>[</mo>' +
      '<mi>e</mi><mo>+</mo><mi>f</mi><mo>]</mo><mo>}</mo></mrow>');
};


/**
 * Test neutral fences.
 */
sre.RebuildStreeTest.prototype.testRebuildNeutralFences = function() {
  // Empty bars.
  this.executeRebuildTest(
      '<mrow><mo>|</mo><mo>|</mo></mrow>');
  // Simple bar fence.
  this.executeRebuildTest(
      '<mrow><mo>|</mo><mi>a</mi><mo>|</mo></mrow>');
  // Parallel bar fences.
  this.executeRebuildTest(
      '<mrow><mo>|</mo><mi>a</mi><mo>|</mo><mi>b</mi><mo>+</mo>' +
      '<mo>&#x00A6;</mo><mi>c</mi><mo>&#x00A6;</mo></mrow>');
  // Nested bar fences.
  this.executeRebuildTest(
      '<mrow><mo>&#x00A6;</mo><mo>|</mo><mi>a</mi><mo>|</mo><mi>b</mi>' +
      '<mo>+</mo><mi>c</mi><mo>&#x00A6;</mo></mrow>');
};


/**
 * Mixed neutral and regular fences.
 */
sre.RebuildStreeTest.prototype.testRebuildMixedFences = function() {
  // Empty parenthsis inside bars.
  this.executeRebuildTest(
      '<mrow><mo>|</mo><mo>(</mo><mo>)</mo><mo>|</mo></mrow>');
  // Bars inside parentheses.
  this.executeRebuildTest(
      '<mrow><mo>(</mo><mo>|</mo><mi>a</mi><mo>|</mo><mi>b</mi>' +
      '<mo>&#x00A6;</mo><mi>c</mi><mo>&#x00A6;</mo><mi>d</mi>' +
      '<mo>)</mo></mrow>');
  // Parentheses inside bards.
  this.executeRebuildTest(
      '<mrow><mo>|</mo><mo>(</mo><mi>a</mi><mo>+</mo><mi>b</mi><mo>)</mo>' +
      '<mo>&#x00A6;</mo><mi>c</mi><mo>&#x00A6;</mo><mi>d</mi><mo>|</mo></mrow>');
  // Parentheses inside bards.
  this.executeRebuildTest(
      '<mrow><mo>[</mo><mo>|</mo><mi>a</mi><mo>+</mo><mi>b</mi><mo>|</mo>' +
      '<mo>+</mo><mi>c</mi><mo>]</mo><mo>+</mo><mo>&#x00A6;</mo><mi>d</mi>' +
      '<mo>+</mo><mo>(</mo><mi>e</mi><mo>+</mo><mi>f</mi><mo>)</mo>' +
      '<mo>&#x00A6;</mo></mrow>');
};


/**
 * Mixed with isolated bars.
 */
sre.RebuildStreeTest.prototype.testRebuildMixedFencesWithBars = function() {
  // Set notation.
  this.executeRebuildTest(
      '<mrow><mo>{</mo><mo>(</mo><mi>x</mi><mo>,</mo><mi>y</mi><mo>,</mo>' +
      '<mi>z</mi><mo>)</mo><mo>|</mo><mi>x</mi><mi>y</mi><mo>=</mo>' +
      '<mo>z</mo><mo>}</mo></mrow>');
  // Disjunction of bracketed parallel statements.
  this.executeRebuildTest(
      '<mrow><mo>[</mo><mi>a</mi><mo>&#x2016;</mo><mi>b</mi><mo>]</mo>' +
      '<mo>|</mo><mo>[</mo><mi>x</mi><mo>&#x2016;</mo><mi>y</mi><mo>]</mo>' +
      '</mrow>');
  // Metric over the above.
  this.executeRebuildTest(
      '<mrow><mo>&#x2016;</mo><mo>[</mo><mi>a</mi><mo>&#x2016;</mo>' +
      '<mi>b</mi><mo>]</mo><mo>|</mo><mo>[</mo><mi>x</mi><mo>&#x2016;</mo>' +
      '<mi>y</mi><mo>]</mo><mo>&#x2016;</mo></mrow>');
  // Mix of metrics and bracketed expression and single bars.
  this.executeRebuildTest(
      '<mrow><mo>&#x2016;</mo><mo>[</mo><mi>a</mi><mo>&#x2016;</mo><mi>b</mi>' +
      '<mo>]</mo><mo>|</mo><mo>[</mo><mi>c</mi><mo>&#x2016;</mo>' +
      '<mo>&#x00A6;</mo><mi>d</mi><mo>]</mo><mo>&#x2016;</mo><mo>[</mo>' +
      '<mi>u</mi><mo>&#x2016;</mo><mi>v</mi><mo>]</mo><mo>|</mo><mi>x</mi>' +
      '<mo>&#x2016;</mo><mi>y</mi><mo>&#x00A6;</mo><mi>z</mi></mrow>');
};


/**
 * Pathological cases with only opening fences.
 */
sre.RebuildStreeTest.prototype.testRebuildOpeningFencesOnly = function() {
  // Single.
  this.executeRebuildTest(
      '<mrow><mo>[</mo></mrow>');
  // Single right.
  this.executeRebuildTest(
      '<mrow><mi>a</mi><mo>[</mo></mrow>');
  // Single middle.
  this.executeRebuildTest(
      '<mrow><mi>a</mi><mo>[</mo><mi>b</mi></mrow>');
  // Single left.
  this.executeRebuildTest(
      '<mrow><mo>[</mo><mi>b</mi></mrow>');
  // Multiple.
  this.executeRebuildTest(
      '<mrow><mi>a</mi><mo>[</mo><mi>b</mi><mi>c</mi><mo>(</mo><mi>d</mi>' +
      '<mo>{</mo><mi>e</mi><mo>&#x3008;</mo><mi>f</mi></mrow>');
  // Multiple plus inner fenced.
  this.executeRebuildTest(
      '<mrow><mi>a</mi><mo>[</mo><mi>b</mi><mo>[</mo><mo>(</mo><mo>(</mo>' +
      '<mi>c</mi><mo>)</mo><mi>d</mi><mo>{</mo><mi>e</mi><mo>&#x3008;</mo>' +
      '<mi>f</mi></mrow>');
};


/**
 * Pathological cases with only closing fences.
 */
sre.RebuildStreeTest.prototype.testRebuildClosingFencesOnly = function() {
  // Single.
  this.executeRebuildTest(
      '<mrow><mo>]</mo></mrow>');
  // Single right.
  this.executeRebuildTest(
      '<mrow><mi>a</mi><mo>]</mo></mrow>');
  // Single middle.
  this.executeRebuildTest(
      '<mrow><mi>a</mi><mo>]</mo><mi>b</mi></mrow>');
  // Single left.
  this.executeRebuildTest(
      '<mrow><mo>]</mo><mi>b</mi></mrow>');
  // Multiple.
  this.executeRebuildTest(
      '<mrow><mi>a</mi><mo>]</mo><mi>b</mi><mi>c</mi><mo>)</mo><mi>d</mi>' +
      '<mo>}</mo><mi>e</mi><mo>&#x3009;</mo><mi>f</mi></mrow>');
  // Multiple plus inner fenced.
  this.executeRebuildTest(
      '<mrow><mi>a</mi><mo>]</mo><mi>b</mi><mo>]</mo><mo>(</mo><mi>c</mi>' +
      '<mo>)</mo><mo>)</mo><mi>d</mi><mo>}</mo><mi>e</mi><mo>&#x3009;</mo>' +
      '<mi>f</mi></mrow>');
};


/**
 * Pathological cases with only neutral fences.
 */
sre.RebuildStreeTest.prototype.testRebuildNeutralFencesOnly = function() {
  // Single.
  this.executeRebuildTest(
      '<mrow><mo>|</mo></mrow>');
  // Single right.
  this.executeRebuildTest(
      '<mrow><mi>a</mi><mo>|</mo></mrow>');
  // Single middle.
  this.executeRebuildTest(
      '<mrow><mi>a</mi><mo>|</mo><mi>b</mi></mrow>');
  // Single left.
  this.executeRebuildTest(
      '<mrow><mo>|</mo><mi>b</mi></mrow>');
  // Two different bars.
  this.executeRebuildTest(
      '<mrow><mi>a</mi><mo>|</mo><mi>b</mi><mo>&#x00A6;</mo><mi>c</mi></mrow>');
  // Three different bars.
  this.executeRebuildTest(
      '<mrow><mi>a</mi><mo>&#x2016;</mo><mi>b</mi><mo>|</mo><mi>c</mi>' +
      '<mo>&#x00A6;</mo><mi>d</mi></mrow>');
  // Multiple plus inner fenced.
  this.executeRebuildTest(
      '<mrow><mo>&#x2016;</mo><mo>[</mo><mi>a</mi><mo>&#x2016;</mo><mi>b</mi>' +
      '<mo>]</mo><mo>&#x2016;</mo><mo>|</mo><mi>x</mi><mo>&#x2016;</mo>' +
      '<mi>y</mi><mo>&#x00A6;</mo><mi>z</mi></mrow>');
};


/**
 * Pathological cases with mixed fences.
 */
sre.RebuildStreeTest.prototype.testRebuildMixedUnmatchedFences = function() {
  // Close, );
  // Neutrals and close.
  this.executeRebuildTest(
      '<mrow><mi>a</mi><mo>&#x2016;</mo><mi>b</mi><mo>|</mo><mi>c</mi>' +
      '<mo>&#x00A6;</mo><mi>d</mi><mo>]</mo><mi>e</mi></mrow>');
  // Neutrals and open.
  this.executeRebuildTest(
      '<mrow><mo>[</mo><mi>a</mi><mo>&#x2016;</mo><mi>b</mi><mo>|</mo>' +
      '<mi>c</mi><mo>&#x00A6;</mo><mi>d</mi></mrow>');
  // Multiple fences, fenced and operations
  this.executeRebuildTest(
      '<mrow><mo>&#x2016;</mo><mo>[</mo><mi>a</mi><mo>&#x2016;</mo><mi>b</mi>' +
      '<mo>]</mo><mo>|</mo><mo>[</mo><mi>c</mi><mo>&#x2016;</mo>' +
      '<mo>&#x00A6;</mo><mi>d</mi><mo>]</mo><mo>&#x2016;</mo><mo>|</mo>' +
      '<mi>x</mi><mo>&#x2016;</mo><mi>y</mi><mo>&#x00A6;</mo><mi>z</mi>' +
      '<mo>]</mo></mrow>');
  // Multiple fences, fenced and operations
  this.executeRebuildTest(
      '<mrow><mo>&#x2016;</mo><mo>]</mo><mo>&#x00A6;</mo><mo>&#x2016;</mo>' +
      '<mo>[</mo><mo>|</mo><mo>[</mo><mi>a</mi><mo>&#x2016;</mo><mi>b</mi>' +
      '<mo>]</mo><mo>&#x2016;</mo><mo>|</mo><mi>[</mi><mo>&#x2016;</mo>' +
      '<mi>y</mi><mo>&#x00A6;</mo><mi>z</mi></mrow>');
  // Multiple fences, fenced and operations
  this.executeRebuildTest(
      '<mrow><mo>&#x2016;</mo><mo>[</mo><mi>a</mi><mo>&#x00A6;</mo>' +
      '<mo>&#x2016;</mo><mo>[</mo><mo>+</mo><mo>[</mo><mi>b</mi>' +
      '<mo>&#x2016;</mo><mi>c</mi><mo>]</mo><mo>+</mo><mo>&#x2016;</mo>' +
      '<mo>|</mo><mi>d</mi><mo>+</mo><mi>e</mi><mi>[</mi><mo>&#x2016;</mo>' +
      '<mi>y</mi><mo>&#x00A6;</mo><mo>+</mo><mi>z</mi></mrow>');
};


/**
 * Square roots
 */
sre.RebuildStreeTest.prototype.testRebuildSquareRoots = function() {
  this.executeRebuildTest(
      '<msqrt></msqrt>');
  this.executeRebuildTest(
      '<msqrt><mi>x</mi></msqrt>');
  this.executeRebuildTest(
      '<msqrt><msqrt><mi>x</mi></msqrt></msqrt>');
  this.executeRebuildTest(
      '<msqrt><mi>x</mi><mi>n</mi></msqrt>');
  this.executeRebuildTest(
      '<msqrt><msqrt><msqrt><mi>x</mi></msqrt></msqrt><mi>y</mi></msqrt>');
};


/**
 * Regular roots
 */
sre.RebuildStreeTest.prototype.testRebuildRegularRoots = function() {
  // Not sure if that makes even sense.
  // this.executeRebuildTest('<mroot></mroot>');
  this.executeRebuildTest(
      '<mroot><mi>x</mi><mi>n</mi></mroot>');
  this.executeRebuildTest(
      '<mroot><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mrow><mi>n</mi>' +
      '<mo>+</mo><mn>1</mn></mrow></mroot>');
  this.executeRebuildTest(
      '<mroot><mroot><mi>x</mi><mi>n</mi></mroot><mi>m</mi></mroot>');
  this.executeRebuildTest(
      '<mroot><mrow><mroot><mi>x</mi><mi>n</mi></mroot><mroot><mi>y</mi>' +
      '<mi>l</mi></mroot></mrow><mi>m</mi></mroot>');
};


/**
 * Mixed roots
 */
sre.RebuildStreeTest.prototype.testRebuildMixedRoots = function() {
  this.executeRebuildTest(
      '<msqrt><mroot><mi>x</mi><mi>n</mi></mroot></msqrt>');
  this.executeRebuildTest(
      '<mroot><msqrt><mi>x</mi></msqrt><mi>n</mi></mroot>');
  this.executeRebuildTest(
      '<mroot><msqrt><mi>x</mi><mi>y</mi></msqrt><mi>n</mi></mroot>');
};


/**
 * Simple function applications
 */
sre.RebuildStreeTest.prototype.testRebuildSimpleFuncsSingle = function() {
  this.executeRebuildTest(
      '<mrow><mi>f</mi></mrow>');

  this.executeRebuildTest(
      '<mrow><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo></mrow>');

  this.executeRebuildTest(
      '<mrow><mi>f</mi><mo>(</mo><mi>x</mi><mi>y</mi><mo>)</mo></mrow>');

  this.executeRebuildTest(
      '<mrow><mi>f</mi><mo>(</mo><mi>x</mi><mo>,</mo><mi>y</mi>' +
      '<mo>,</mo><mi>z</mi><mo>)</mo></mrow>');

  this.executeRebuildTest(
      '<mrow><mi>f</mi><mo>(</mo><msup><mi>x</mi><mn>2</mn></msup>' +
      '<mo>)</mo></mrow>');

  this.executeRebuildTest(
      '<mrow><mi>f</mi><mo>(</mo><msub><mi>x</mi><mn>2</mn></msub>' +
      '<mo>)</mo></mrow>');

  this.executeRebuildTest(
      '<mrow><mi>f</mi><mo>(</mo><msubsup><mi>x</mi><mn>2</mn>' +
      '<mn>1</mn></msubsup><mo>)</mo></mrow>');

  this.executeRebuildTest(
      '<mrow><mi>f</mi><mo>(</mo><mover><mi>x</mi><mn>2</mn></mover>' +
      '<mo>)</mo></mrow>');
  this.executeRebuildTest(
      '<mrow><mi>f</mi><mo>(</mo><munder><mi>x</mi><mn>2</mn></munder>' +
      '<mo>)</mo></mrow>');
  this.executeRebuildTest(
      '<mrow><mi>f</mi><mo>(</mo><munderover><mi>x</mi><mn>2</mn>' +
      '<mn>1</mn></munderover><mo>)</mo></mrow>');
  this.executeRebuildTest(
      '<mrow><mi>f</mi><mo>(</mo><mfrac><mn>1</mn><mn>2</mn></mfrac>' +
      '<mo>)</mo></mrow>');
  this.executeRebuildTest(
      '<mrow><mi>f</mi><mo>(</mo><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '<mo>)</mo></mrow>');
};


/**
 * Simple functions with surrounding operators.
 */
sre.RebuildStreeTest.prototype.testRebuildSimpleFuncsWithOps = function() {
  this.executeRebuildTest(
      '<mrow><mn>1</mn><mo>+</mo><mi>f</mi><mo>(</mo><mi>x</mi>' +
      '<mo>)</mo></mrow>');
  this.executeRebuildTest(
      '<mrow><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>+</mo>' +
      '<mn>2</mn></mrow>');
  this.executeRebuildTest(
      '<mrow><mn>1</mn><mo>+</mo><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '<mo>+</mo><mn>2</mn></mrow>');
  this.executeRebuildTest(
      '<mrow><mo>a</mo><mo>+</mo><mi>f</mi><mo>(</mo><mi>x</mi>' +
      '<mo>)</mo></mrow>');
  this.executeRebuildTest(
      '<mrow><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>+</mo>' +
      '<mo>b</mo></mrow>');
  this.executeRebuildTest(
      '<mrow><mo>a</mo><mo>+</mo><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '<mo>+</mo><mo>b</mo></mrow>');
  this.executeRebuildTest(
      '<mrow><mo>a</mo><mo>=</mo><mi>f</mi><mo>(</mo><mi>x</mi>' +
      '<mo>)</mo></mrow>');
  this.executeRebuildTest(
      '<mrow><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>=</mo>' +
      '<mo>b</mo></mrow>');
  this.executeRebuildTest(
      '<mrow><mo>a</mo><mo>=</mo><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '<mo>=</mo><mo>b</mo></mrow>');
};


/**
 * Multiple simple functions.
 */
sre.RebuildStreeTest.prototype.testRebuildSimpleFuncsMulti = function() {
  this.executeRebuildTest(
      '<mrow><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>+</mo><mi>g</mi>' +
      '<mo>(</mo><mi>x</mi><mo>)</mo></mrow>');
  this.executeRebuildTest(
      '<mrow><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>+</mo><mi>g</mi>' +
      '<mo>(</mo><mi>x</mi><mo>)</mo><mo>=</mo><mi>h</mi><mo>(</mo>' +
      '<mi>x</mi><mo>)</mo></mrow>');
  this.executeRebuildTest(
      '<mrow><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>+</mo><mi>g</mi>' +
      '<mo>(</mo><mi>y</mi><mo>)</mo><mo>=</mo><mi>h</mi><mo>(</mo>' +
      '<mi>x</mi><mi>y</mi><mo>)</mo></mrow>');
};


/**
 * Nested simple functions.
 */
sre.RebuildStreeTest.prototype.testRebuildSimpleFuncsNested = function() {
  this.executeRebuildTest(
      '<mrow><mi>g</mi><mo>(</mo><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '<mo>)</mo></mrow>');
  this.executeRebuildTest(
      '<mrow><mi>h</mi><mo>(</mo><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '<mi>g</mi><mo>(</mo><mi>y</mi><mo>)</mo><mo>)</mo></mrow>');
  this.executeRebuildTest(
      '<mrow><mi>h</mi><mo>(</mo><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '<mo>+</mo><mi>g</mi><mo>(</mo><mi>y</mi><mo>)</mo><mo>)</mo></mrow>');
  this.executeRebuildTest(
      '<mi>P</mi><mo>[</mo><mi>x</mi><mo>=</mo><mn>2</mn><mo>]</mo>');
};


/**
 * Simple functions with explicit function application.
 */
sre.RebuildStreeTest.prototype.testRebuildSimpleFuncsExplicitApp = function() {
  this.executeRebuildTest(
      '<mi>f</mi><mo>&#x2061;</mo><mo>(</mo><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '<mo>)</mo>');
  this.executeRebuildTest(
      '<mi>f</mi><mo>&#x2061;</mo><mo>(</mo><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '<mo>)</mo><mo>+</mo><mi>f</mi><mo>(</mo><mi>x</mi><mo>+</mo>' +
      '<mi>y</mi><mo>)</mo>');
  this.executeRebuildTest(
      '<msub><mi>f</mi><mn>1</mn></msub><mo>&#x2061;</mo><mo>(</mo><mi>x</mi>' +
      '<mo>+</mo><mi>y</mi><mo>)</mo>');
  this.executeRebuildTest(
      '<msup><msub><mi>f</mi><mi>n</mi></msub><mn>2</mn></msup>' +
      '<mo>&#x2061;</mo><mo>(</mo><mi>x</mi><mo>+</mo><mi>y</mi><mo>)</mo>' +
      '<mo>+</mo><msup><msub><mi>f</mi><mi>m</mi></msub><mn>2</mn></msup>' +
      '<mo>(</mo><mi>x</mi><mo>+</mo><mi>y</mi><mo>)</mo>');
};


/**
 * Prefix function applications
 */
sre.RebuildStreeTest.prototype.testRebuildPrefixFuncsSingle = function() {
  this.executeRebuildTest(
      '<mrow><mi>sin</mi><mo>(</mo><mi>x</mi><mo>)</mo></mrow>');

  this.executeRebuildTest(
      '<mrow><mi>sin</mi><mo>(</mo><mi>x</mi><mi>y</mi><mo>)</mo></mrow>');

  this.executeRebuildTest(
      '<mrow><mi>sin</mi><mo>(</mo><msup><mi>x</mi><mn>2</mn></msup>' +
      '<mo>)</mo></mrow>');

  this.executeRebuildTest(
      '<mrow><mi>sin</mi><mo>(</mo><msub><mi>x</mi><mn>2</mn></msub>' +
      '<mo>)</mo></mrow>');

  this.executeRebuildTest(
      '<mrow><mi>sin</mi><mo>(</mo><msubsup><mi>x</mi><mn>2</mn>' +
      '<mn>1</mn></msubsup><mo>)</mo></mrow>');

  this.executeRebuildTest(
      '<mrow><mi>sin</mi><mo>(</mo><mover><mi>x</mi><mn>2</mn></mover>' +
      '<mo>)</mo></mrow>');

  this.executeRebuildTest(
      '<mrow><mi>sin</mi><mo>(</mo><munder><mi>x</mi><mn>2</mn></munder>' +
      '<mo>)</mo></mrow>');

  this.executeRebuildTest(
      '<mrow><mi>sin</mi><mo>(</mo><munderover><mi>x</mi><mn>2</mn>' +
      '<mn>1</mn></munderover><mo>)</mo></mrow>');

  this.executeRebuildTest(
      '<mrow><mi>sin</mi><mo>(</mo><mfrac><mn>1</mn><mn>2</mn></mfrac>' +
      '<mo>)</mo></mrow>');

  this.executeRebuildTest(
      '<mrow><mi>sin</mi><mo>(</mo><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '<mo>)</mo></mrow>');
};


/**
 * Prefix functions applications with surrounding operators.
 */
sre.RebuildStreeTest.prototype.testRebuildPrefixFuncsWithOps = function() {
  this.executeRebuildTest(
      '<mrow><mn>1</mn><mo>+</mo><mi>sin</mi><mo>(</mo><mi>x</mi>' +
      '<mo>)</mo></mrow>');

  this.executeRebuildTest(
      '<mrow><mi>sin</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>+</mo>' +
      '<mn>2</mn></mrow>');

  this.executeRebuildTest(
      '<mrow><mn>1</mn><mo>+</mo><mi>sin</mi><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '<mo>+</mo><mn>2</mn></mrow>');

  this.executeRebuildTest(
      '<mrow><mo>a</mo><mo>+</mo><mi>sin</mi><mo>(</mo><mi>x</mi>' +
      '<mo>)</mo></mrow>');

  this.executeRebuildTest(
      '<mrow><mi>sin</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>+</mo>' +
      '<mo>b</mo></mrow>');

  this.executeRebuildTest(
      '<mrow><mo>a</mo><mo>+</mo><mi>sin</mi><mo>(</mo><mi>x</mi>' +
      '<mo>)</mo><mo>+</mo><mo>b</mo></mrow>');

  this.executeRebuildTest(
      '<mrow><mo>a</mo><mo>=</mo><mi>sin</mi><mo>(</mo><mi>x</mi>' +
      '<mo>)</mo></mrow>');

  this.executeRebuildTest(
      '<mrow><mi>sin</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>=</mo>' +
      '<mo>b</mo></mrow>');

  this.executeRebuildTest(
      '<mrow><mo>a</mo><mo>=</mo><mi>sin</mi><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '<mo>=</mo><mo>b</mo></mrow>');
};


/**
 * Multiple prefix function applications.
 */
sre.RebuildStreeTest.prototype.testRebuildPrefixFuncsMulti = function() {
  this.executeRebuildTest(
      '<mrow><mi>sin</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>+</mo><mi>cos</mi>' +
      '<mo>(</mo><mi>x</mi><mo>)</mo></mrow>');

  this.executeRebuildTest(
      '<mrow><mi>sin</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>+</mo><mi>cos</mi>' +
      '<mo>(</mo><mi>x</mi><mo>)</mo><mo>=</mo><mi>tan</mi><mo>(</mo>' +
      '<mi>x</mi><mo>)</mo></mrow>');

  this.executeRebuildTest(
      '<mrow><mi>sin</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>+</mo><mi>cos</mi>' +
      '<mo>(</mo><mi>y</mi><mo>)</mo><mo>=</mo><mi>tan</mi><mo>(</mo>' +
      '<mi>x</mi><mi>y</mi><mo>)</mo></mrow>');
};


/**
 * Prefix function applications with sub- and superscripts.
 */
sre.RebuildStreeTest.prototype.testRebuildPrefixFuncsScripts = function() {
  this.executeRebuildTest(
      '<mrow><msup><mi>sin</mi><mn>2</mn></msup><mo>(</mo><mi>x</mi>' +
      '<mo>)</mo></mrow>');

  this.executeRebuildTest(
      '<mrow><msub><mi>sin</mi><mn>1</mn></msub><mo>(</mo><mi>x</mi>' +
      '<mo>)</mo></mrow>');

  this.executeRebuildTest(
      '<mrow><msubsup><mi>sin</mi><mn>2</mn><mn>1</mn></msubsup><mo>(</mo>' +
      '<mi>x</mi><mo>)</mo></mrow>');

  this.executeRebuildTest(
      '<mrow><msup><mi>sin</mi><mn>2</mn></msup><mo>(</mo><mi>x</mi>' +
      '<mo>)</mo><mo>+</mo><msup><mi>cos</mi><mn>2</mn></msup><mo>(</mo>' +
      '<mi>y</mi><mo>)</mo><mo>=</mo><mn>1</mn></mrow>');
};


/**
 * Prefix function applications with unfenced arguments.
 */
sre.RebuildStreeTest.prototype.testRebuildPrefixFuncsUnfenced = function() {
  this.executeRebuildTest(
      '<mrow><mi>sin</mi><mi>x</mi></mrow>');

  this.executeRebuildTest(
      '<mrow><mi>sin</mi><mi>x</mi><mi>y</mi></mrow>');

  this.executeRebuildTest(
      '<mrow><mi>sin</mi><msup><mi>x</mi><mn>2</mn></msup></mrow>');

  this.executeRebuildTest(
      '<mrow><mi>sin</mi><msub><mi>x</mi><mn>2</mn></msub></mrow>');

  this.executeRebuildTest(
      '<mrow><mi>sin</mi><msubsup><mi>x</mi><mn>2</mn><mn>1</mn>' +
      '</msubsup></mrow>');

  this.executeRebuildTest(
      '<mrow><mi>sin</mi><mover><mi>x</mi><mn>2</mn></mover></mrow>');

  this.executeRebuildTest(
      '<mrow><mi>sin</mi><munder><mi>x</mi><mn>2</mn></munder></mrow>');

  this.executeRebuildTest(
      '<mrow><mi>sin</mi><munderover><mi>x</mi><mn>2</mn><mn>1</mn>' +
      '</munderover></mrow>');

  this.executeRebuildTest(
      '<mrow><mi>sin</mi><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow>');
};


/**
 * Prefix function applications with unfenced arguments in an operator
 * expression.
 */
sre.RebuildStreeTest.prototype.testRebuildPrefixFuncsUnfencedOps = function() {
  this.executeRebuildTest(
      '<mrow><mn>1</mn><mo>+</mo><mi>sin</mi><mi>x</mi></mrow>');

  this.executeRebuildTest(
      '<mrow><mi>sin</mi><mi>x</mi><mo>+</mo><mn>2</mn></mrow>');

  this.executeRebuildTest(
      '<mrow><mn>1</mn><mo>+</mo><mi>sin</mi><mi>x</mi><mo>+</mo>' +
      '<mn>2</mn></mrow>');

  this.executeRebuildTest(
      '<mrow><mo>a</mo><mo>+</mo><mi>sin</mi><mi>x</mi></mrow>');

  this.executeRebuildTest(
      '<mrow><mi>sin</mi><mi>x</mi><mo>+</mo><mo>b</mo></mrow>');

  this.executeRebuildTest(
      '<mrow><mo>a</mo><mo>+</mo><mi>sin</mi><mi>x</mi><mo>+</mo>' +
      '<mo>b</mo></mrow>');

  this.executeRebuildTest(
      '<mrow><mo>a</mo><mo>=</mo><mi>sin</mi><mi>x</mi></mrow>');

  this.executeRebuildTest(
      '<mrow><mi>sin</mi><mi>x</mi><mo>=</mo><mo>b</mo></mrow>');

  this.executeRebuildTest(
      '<mrow><mo>a</mo><mo>=</mo><mi>sin</mi><mi>x</mi><mo>=</mo>' +
      '<mo>b</mo></mrow>');
};


/**
 * Multiple prefix function applications with unfenced arguments.
 */
sre.RebuildStreeTest.prototype.testRebuildPrefixFuncsMultiUnfenced =
    function() {
  this.executeRebuildTest(
      '<mrow><mi>sin</mi><mi>x</mi><mo>+</mo><mi>cos</mi><mi>x</mi></mrow>');

  this.executeRebuildTest(
      '<mrow><mi>sin</mi><mi>x</mi><mo>+</mo><mi>cos</mi><mi>x</mi><mo>=</mo>' +
      '<mi>tan</mi><mi>x</mi></mrow>');

  this.executeRebuildTest(
      '<mrow><mi>sin</mi><mi>x</mi><mo>+</mo><mi>cos</mi><mi>y</mi><mo>=</mo>' +
      '<mi>tan</mi><mi>x</mi><mi>y</mi></mrow>');
};


/**
 * Prefix function applications with sub- and superscripts and unfenced
 * arguments.
 */
sre.RebuildStreeTest.prototype.testRebuildPrefixFuncsScriptUnfenced =
    function() {
  this.executeRebuildTest(
      '<mrow><msup><mi>sin</mi><mn>2</mn></msup><mi>x</mi></mrow>');

  this.executeRebuildTest(
      '<mrow><msub><mi>sin</mi><mn>1</mn></msub><mi>x</mi></mrow>');

  this.executeRebuildTest(
      '<mrow><msubsup><mi>sin</mi><mn>2</mn><mn>1</mn></msubsup>' +
      '<mi>x</mi></mrow>');

  this.executeRebuildTest(
      '<mrow><msup><mi>sin</mi><mn>2</mn></msup><mi>x</mi><mo>+</mo><msup>' +
      '<mi>cos</mi><mn>2</mn></msup><mi>y</mi><mo>=</mo><mn>1</mn></mrow>');
  this.executeRebuildTest(
      '<mrow><msubsup><msubsup><mi>sin</mi><mn>2</mn><mn>1</mn>' +
      '</msubsup><mi>n</mi><mi>m</mi></msubsup><mi>x</mi></mrow>');
};


/**
 * Prefix functions without arguments.
 */
sre.RebuildStreeTest.prototype.testRebuildPrefixFuncsNoArgs = function() {
  this.executeRebuildTest(
      '<mi>sin</mi>');

  this.executeRebuildTest(
      '<msup><mi>sin</mi><mn>2</mn></msup>');
  this.executeRebuildTest(
      '<msup><mi>sin</mi><mn>2</mn></msup><mo>+</mo><msup><mi>cos</mi>' +
      '<mn>2</mn></msup>');
  this.executeRebuildTest(
      '<mrow><msup><mi>sin</mi><mn>2</mn></msup><mo>+</mo>' +
      '<msup><mi>cos</mi><mn>2</mn></msup><mo>=</mo><mn>1</mn></mrow>');
  this.executeRebuildTest(
      '<mrow><mi>sin</mi><mo>=</mo><mfrac><mn>1</mn>' +
      '<mi>csc</mi></mfrac></mrow>');
};


/**
 * Nested prefix function applications, both with and without fenced arguments.
 */
sre.RebuildStreeTest.prototype.testRebuildPrefixFuncsNested = function() {
  this.executeRebuildTest(
      '<mrow><mi>log</mi><mi>cos</mi><mi>x</mi></mrow>');

  this.executeRebuildTest(
      '<mrow><mi>ln</mi><mo>(</mo><mi>sin</mi>' +
      '<mo>(</mo><mi>x</mi><mo>)</mo><mo>)</mo></mrow>');

  this.executeRebuildTest(
      '<mrow><mi>log</mi><mi>cos</mi><mi>x</mi><mo>=</mo><mi>ln</mi>' +
      '<mo>(</mo><mi>sin</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>)</mo></mrow>');
};


/**
 * Variations of matrices and their roles as determinants, square matrices or
 * rowvectors.
 */
sre.RebuildStreeTest.prototype.testRebuildMatrices = function() {
  this.executeRebuildTest(
      '<mrow class="MJX-TeXAtom-ORD"><mi mathvariant="bold">A</mi>' +
      '<mo>=</mo><mo>[</mo><mtable rowspacing="4pt" columnspacing="1em">' +
      '<mtr><mtd><mn>0</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd>' +
      '<mn>2</mn></mtd><mtd><mn>3</mn></mtd></mtr></mtable><mo>]</mo>' +
      '</mrow>');

  this.executeRebuildTest(
      '<mo>[</mo><mtable rowspacing="4pt" columnspacing="1em">' +
      '<mtr><mtd><mn>0</mn></mtd><mtd><mn>1</mn></mtd></mtr>' +
      '<mtr><mtd><mn>2</mn></mtd><mtd><mn>3</mn></mtd></mtr>' +
      '<mtr><mtd><mn>4</mn></mtd><mtd><mn>5</mn></mtd></mtr>' +
      '</mtable><mo>]</mo>');

  this.executeRebuildTest(
      '<mo>[</mo><mtable rowspacing="4pt" columnspacing="1em">' +
      '<mtr><mtd><mn>0</mn></mtd><mtd><mn>1</mn></mtd></mtr>' +
      '<mtr><mtd><mn>2</mn></mtd><mtd><mn>3</mn></mtd></mtr>' +
      '</mtable><mo>]</mo>');
  this.executeRebuildTest(
      '<mfenced open="|" close="|"><mtable>' +
      '<mtr><mtd><mn>0</mn></mtd><mtd><mn>1</mn></mtd></mtr>' +
      '<mtr><mtd><mn>2</mn></mtd><mtd><mn>3</mn></mtd></mtr>' +
      '<mtr><mtd><mn>4</mn></mtd><mtd><mn>5</mn></mtd></mtr>' +
      '</mtable></mfenced>');
  this.executeRebuildTest(
      '<mfenced open="|" close="|"><mtable>' +
      '<mtr><mtd><mn>0</mn></mtd><mtd><mn>1</mn></mtd></mtr>' +
      '<mtr><mtd><mn>2</mn></mtd><mtd><mn>3</mn></mtd></mtr>' +
      '</mtable></mfenced>');
  this.executeRebuildTest(
      '<mfenced open="(" close=")"><mtable>' +
      '<mtr><mtd><mn>0</mn></mtd><mtd><mn>1</mn></mtd>' +
      '<mtd><mn>2</mn></mtd><mtd><mn>3</mn></mtd></mtr>' +
      '</mtable></mfenced>');
};


/**
 * Variations of vectors and their roles as determinants or binomial
 * coefficients.
 */
sre.RebuildStreeTest.prototype.testRebuildVectors = function() {
  this.executeRebuildTest(
      '<mrow class="MJX-TeXAtom-ORD"><mi mathvariant="bold">V</mi>' +
      '<mo>=</mo><mo>[</mo><mtable rowspacing="4pt" columnspacing="1em">' +
      '<mtr><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr>' +
      '<mtr><mtd><mn>3</mn></mtd></mtr></mtable><mo>]</mo></mrow>');

  this.executeRebuildTest(
      '<mo>[</mo><mtable rowspacing="4pt" columnspacing="1em">' +
      '<mtr><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr>' +
      '<mtr><mtd><mn>3</mn></mtd></mtr></mtable><mo>]</mo>');
  this.executeRebuildTest(
      '<mfenced open="(" close=")"><mtable>' +
      '<mtr><mtd><mi>n</mi></mtd></mtr><mtr><mtd><mi>k</mi></mtd></mtr>' +
      '</mtable></mfenced>');
  this.executeRebuildTest(
      '<mfenced open="|" close="|"><mtable>' +
      '<mtr><mtd><mi>n</mi></mtd></mtr>' +
      '</mtable></mfenced>');
  this.executeRebuildTest(
      '<mfenced open="(" close=")"><mtable>' +
      '<mtr><mtd><mi>n</mi></mtd></mtr>' +
      '</mtable></mfenced>');

};


/**
 * Variations of tables representing case statements,
 * multiline equations and regular tables.
 */
sre.RebuildStreeTest.prototype.testRebuildTables = function() {
  this.executeRebuildTest(
      '<mrow><mo>{</mo><mtable><mtr><mtd><mi>a</mi></mtd><mtd>' +
      '<mtext>often</mtext></mtd></mtr><mtr><mtd><mi>b</mi></mtd>' +
      '<mtd><mtext>sometimes</mtext></mtd></mtr></mtable></mrow>');

  this.executeRebuildTest(
      '<mrow><mi mathvariant="bold">A</mi><mo>=</mo><mo>{</mo><mtable>' +
      '<mtr><mtd><mi>a</mi></mtd><mtd><mtext>often</mtext></mtd></mtr>' +
      '<mtr><mtd><mi>b</mi></mtd><mtd><mtext>sometimes</mtext></mtd></mtr>' +
      '</mtable></mrow>');

  this.executeRebuildTest(
      '<mrow><mo>{</mo><mtable><mtr><mtd><mi>a</mi></mtd><mtd>' +
      '<mtext>often</mtext></mtd></mtr><mtr><mtd><mi>b</mi></mtd><mtd>' +
      '<mtext>sometimes</mtext></mtd></mtr></mtable><mo>.</mo></mrow>');

  this.executeRebuildTest(
      '<mrow><mo>{</mo><mtable><mtr><mtd><mi>a</mi></mtd>' +
      '<mtd><mtext>often</mtext></mtd></mtr><mtr><mtd><mi>b</mi></mtd>' +
      '<mtd><mtext>sometimes</mtext></mtd></mtr></mtable>' +
      '<mo>,</mo><mi>b</mi><mo>,</mo><mi>c</mi><mo>.</mo></mrow>');

  this.executeRebuildTest(
      '<mrow><mo>{</mo><mtable><mtr><mtd><mi>a</mi><mo>,</mo>' +
      '<mtext>often</mtext></mtd></mtr><mtr><mtd><mi>b</mi><mo>,</mo>' +
      '<mtext>sometimes</mtext></mtd></mtr></mtable><mo>,</mo><mi>b</mi>' +
      '<mo>,</mo><mi>c</mi><mo>.</mo></mrow>');

  this.executeRebuildTest(
      '<mtable><mtr><mtd><mi>x</mi><maligngroup/><mo>=</mo><mn>4</mn>' +
      '</mtd></mtr><mtr><mtd><mi>y</mi><maligngroup/><mo>=</mo><mn>2</mn>' +
      '</mtd></mtr><mtr><mtd><mi>x</mi><mi>y</mi><maligngroup/><mo>=</mo>' +
      '<mn>6</mn></mtd></mtr></mtable>');

  this.executeRebuildTest(
      '<mtable><mtr><mtd><mi>x</mi></mtd><mtd><mo>=</mo></mtd><mtd><mn>4</mn>' +
      '</mtd></mtr><mtr><mtd><mi>y</mi></mtd><mtd><mo>=</mo></mtd><mtd>' +
      '<mn>2</mn></mtd></mtr><mtr><mtd><mi>x</mi><mi>y</mi></mtd><mtd>' +
      '<mo>=</mo></mtd><mtd><mn>6</mn></mtd></mtr></mtable>');
};


/**
 * Tabular structures with fences that have are interspersed with ignored
 * elements, like merror.
 */
sre.RebuildStreeTest.prototype.testRebuildMatricesWithIgnores = function() {
  this.executeRebuildTest(
      '<mi>A</mi><mo>=</mo><mrow><mpadded><mo>[</mo></mpadded><mrow>' +
      '<mtable rowspacing="4pt" columnspacing="1em">' +
      '<mtr><mtd><mn>0</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd>' +
      '<mn>2</mn></mtd><mtd><mn>3</mn></mtd></mtr></mtable></mrow>' +
      '<merror><mtext>nothing</mtext></merror><mo>]</mo></mrow>');
  this.executeRebuildTest(
      '<mrow class="MJX-TeXAtom-ORD"><mi mathvariant="bold">V</mi>' +
      '<mo>=</mo><mpadded><mo>[</mo></mpadded>' +
      '<mtable rowspacing="4pt" columnspacing="1em">' +
      '<mtr><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr>' +
      '<mtr><mtd><mn>3</mn></mtd></mtr></mtable><merror><mtext>nothing' +
      '</mtext></merror><mo>]</mo></mrow>');
  this.executeRebuildTest(
      '<mi>f</mi><mo>=</mo><mrow><mpadded><mo>{</mo></mpadded>' +
      '<merror><mtext>nothing</mtext></merror><mtable>' +
      '<mtr><mtd><mi>a</mi></mtd><mtd><mtext>often</mtext></mtd></mtr>' +
      '<mtr><mtd><mi>b</mi></mtd><mtd><mtext>sometimes</mtext></mtd></mtr>' +
      '</mtable></mrow>');
  this.executeRebuildTest(
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
sre.RebuildStreeTest.prototype.testRebuildLimitFunctions = function() {
  this.executeRebuildTest(
      '<mrow><munder><mi>lim</mi><mrow><mi>x</mi><mo>&#x2192;</mo>' +
      '<mi>&#x221E;</mi></mrow></munder><mo>(</mo><mi>x</mi><mo>)</mo></mrow>');

  this.executeRebuildTest(
      '<mrow><mi>a</mi><mo>+</mo><munder><mi>lim</mi><mrow><mi>x</mi>' +
      '<mo>&#x2192;</mo><mi>&#x221E;</mi></mrow></munder><mo>(</mo><mi>x</mi>' +
      '<mo>)</mo><mo>+</mo><mi>b</mi></mrow>');

  this.executeRebuildTest(
      '<mrow><msup><munder><mi>lim</mi><mrow><mi>x</mi><mo>&#x2192;</mo>' +
      '<mi>&#x221E;</mi></mrow></munder><mo>+</mo></msup><mo>(</mo><mi>x</mi>' +
      '<mo>)</mo></mrow>');

  this.executeRebuildTest(
      '<mrow><munderover><mi>lim</mi><mo>&#x2015;</mo><mrow><mi>x</mi>' +
      '<mo>&#x2192;</mo><mi>&#x221E;</mi></mrow></munderover><mo>(</mo>' +
      '<mi>x</mi><mo>)</mo></mrow>');

  this.executeRebuildTest(
      '<mrow><munder><mi>liminf</mi><mrow><mi>x</mi><mo>&#x2192;</mo>' +
      '<mi>&#x221E;</mi></mrow></munder><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '<mo>+</mo><munder><mi>limsup</mi><mrow><mi>y</mi><mo>&#x2192;</mo>' +
      '<mi>&#x221E;</mi></mrow></munder><mo>(</mo><mi>y</mi><mo>)</mo></mrow>');

  this.executeRebuildTest(
      '<mrow><mi>a</mi><mo>+</mo><munder><mi>lim</mi><mrow><mi>x</mi>' +
      '<mo>&#x2192;</mo><mi>&#x221E;</mi></mrow></munder><mi>x</mi><mo>+</mo>' +
      '<mi>b</mi></mrow>');

  this.executeRebuildTest(
      '<mrow><munder><mi>lim</mi><mrow><mi>x</mi><mo>&#x2192;</mo>' +
      '<mi>&#x221E;</mi></mrow></munder><munder><mi>lim</mi><mrow><mi>y</mi>' +
      '<mo>&#x2192;</mo><mi>&#x221E;</mi></mrow></munder><mi>x</mi>' +
      '<mi>y</mi></mrow>');
};


/**
 * Limit functions without arguments.
 */
sre.RebuildStreeTest.prototype.testRebuildLimitFunctionsNoArgs = function() {
  this.executeRebuildTest(
      '<mi>liminf</mi>');

  this.executeRebuildTest(
      '<munder><mi>lim</mi><mrow><mi>x</mi><mo>&#x2192;</mo><mi>&#x221E;</mi>' +
      '</mrow></munder>');

  this.executeRebuildTest(
      '<mi>liminf</mi><mo>+</mo><mi>limsup</mi><mo>=</mo><mi>lim</mi>');
};


/**
 * Variations of big operators.
 */
sre.RebuildStreeTest.prototype.testRebuildBigOps = function() {
  this.executeRebuildTest(
      '<mrow><munderover><mi>&#x2211;</mi><mrow><mi>n</mi><mo>=</mo>' +
      '<mn>0</mn></mrow><mi>&#x221E;</mi></munderover><msup><mi>n</mi>' +
      '<mn>2</mn></msup></mrow>');

  this.executeRebuildTest(
      '<mrow><munderover><mi>&#x2211;</mi><mrow><mi>n</mi><mo>=</mo>' +
      '<mn>0</mn></mrow><mi>&#x221E;</mi></munderover><munderover>' +
      '<mi>&#x2211;</mi><mrow><mi>m</mi><mo>=</mo><mn>0</mn></mrow>' +
      '<mi>&#x221E;</mi></munderover><msup><mi>n</mi><mi>m</mi></msup></mrow>');

  this.executeRebuildTest(
      '<mrow><munder><mi>&#x2211;</mi><mrow><mi>n</mi><mo>=</mo>' +
      '<mn>0</mn></mrow></munder><msup><mi>n</mi><mn>2</mn></msup></mrow>');
};


/**
 * Big operators without Arguments.
 */
sre.RebuildStreeTest.prototype.testRebuildBigOpsNoArgs = function() {
  this.brief = true;
  this.executeRebuildTest(
      '<mi>&#x2211;</mi>');
  this.executeRebuildTest(
      '<munder><mi>&#x220F;</mi><mi>n</mi></munder>');
  this.executeRebuildTest(
      '<munderover><mi>&#x2211;</mi><mrow><mi>n</mi><mo>=</mo><mn>0</mn>' +
      '</mrow><mi>&#x221E;</mi></munderover>');
  this.executeRebuildTest(
      '<mi>&#x2211;</mi><mo>+</mo><mi>&#x2211;</mi><mo>=</mo><mi>&#x2211;</mi>');
  this.executeRebuildTest(
      '<munder><mi>&#x220F;</mi><mi>n</mi></munder><mo>+</mo>' +
      '<munder><mi>&#x220F;</mi><mi>m</mi></munder><mo>=</mo>' +
      '<munder><mi>&#x220F;</mi><mrow><mi>n</mi><mo>,</mo><mi>m</mi>' +
      '</mrow></munder>');
  this.executeRebuildTest(
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
sre.RebuildStreeTest.prototype.testRebuildIntegrals = function() {
  this.executeRebuildTest(
      '<mi>&#x222B;</mi>');

  this.executeRebuildTest(
      '<mi>&#x222B;</mi><mi>dx</mi>');

  this.executeRebuildTest(
      '<mrow><mi>&#x222B;</mi><mi>x</mi><mi>dx</mi></mrow>');

  this.executeRebuildTest(
      '<mrow><mi>&#x222B;</mi><mi>x</mi><mi>d</mi><mi>x</mi></mrow>');

  this.executeRebuildTest(
      '<mrow><mi>&#x222B;</mi><mi>x</mi><mo>+</mo><mi>y</mi><mi>d</mi>' +
      '<mi>x</mi></mrow>');

  this.executeRebuildTest(
      '<munderover><mi>&#x222B;</mi><mn>0</mn><mn>10</mn></munderover>');

  this.executeRebuildTest(
      '<munder><mi>&#x222B;</mi><mi>X</mi></munder>');

  this.executeRebuildTest(
      '<munderover><mi>&#x222B;</mi><mn>0</mn>' +
      '<mn>10</mn></munderover><mi>x</mi>' +
      '<mi>d</mi><mi>x</mi>');

  this.executeRebuildTest(
      '<munder><mi>&#x222B;</mi><mi>X</mi></munder><mi>x</mi><mi>dx</mi>');

  this.executeRebuildTest(
      '<munderover><mi>&#x222B;</mi><mn>0</mn><mn>10</mn></munderover>' +
      '<mi>x</mi><mi>dx</mi><mo>+</mo><munderover><mi>&#x222B;</mi>' +
      '<mn>10</mn><mn>20</mn></munderover><mi>x</mi><mi>dx</mi><mo>=</mo>' +
      '<munderover><mi>&#x222B;</mi><mn>0</mn><mn>20</mn></munderover>' +
      '<mi>x</mi><mi>dx</mi>');

  this.executeRebuildTest(
      '<mi>&#x222B;</mi><mi>&#x222B;</mi><mi>&#x222B;</mi><mi>dx</mi>' +
      '<mi>dy</mi><mi>dz</mi>');
};


/**
 * Translation of text elements.
 */
sre.RebuildStreeTest.prototype.testRebuildText = function() {
  this.executeRebuildTest(
      '<mtext>text only</mtext>');

  this.executeRebuildTest(
      '<mi>a</mi><mtext>to</mtext>');

  this.executeRebuildTest(
      '<mtext>to</mtext><mi>b</mi>');

  this.executeRebuildTest(
      '<mi>a</mi><mtext>to</mtext><mi>b</mi><mtext>to</mtext><mi>c</mi>');

  this.executeRebuildTest(
      '<mrow><mi>a</mi><mo>+</mo><mi>b</mi>' +
      '<mtext>is generally not the same as</mtext>' +
      '<mi>a</mi><mi>b</mi><mo>.</mo></mrow>');

  this.executeRebuildTest(
      '<mrow><mi>a</mi><mo>+</mo><mi>b</mi>' +
      '<mtext>is not the same as</mtext>' +
      '<mi>a</mi><mi>b</mi><mtext>in general.</mtext></mrow>');
};


/**
 * Translation of mfenced elements.
 */
sre.RebuildStreeTest.prototype.testRebuildMfenced = function() {
  this.executeRebuildTest(
      '<mfenced open="[" close="]" separators="+ - ;"/>');

  this.executeRebuildTest(
      '<mfenced open="[" separators=""/>');

  this.executeRebuildTest(
      '<mfenced open="[" close="]"/>');

  this.executeRebuildTest(
      '<mfenced close=")"/>');

  this.executeRebuildTest(
      '<mfenced open="[" close="]" separators="+"><mi>x</mi><mfrac>' +
      '<mi>x</mi><mi>y</mi></mfrac><mn>5</mn></mfenced>');

  this.executeRebuildTest(
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

  this.executeRebuildTest(
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

  this.executeRebuildTest(
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

  this.executeRebuildTest(
      '<mfenced close="]">' +
      '<mn>1</mn>' +
      '<mn>2</mn>' +
      '<mn>3</mn>' +
      '<mn>4</mn>' +
      '</mfenced>');

  this.executeRebuildTest(
      '<mfenced>' +
      '<mn>1</mn>' +
      '<mn>2</mn>' +
      '<mn>3</mn>' +
      '<mn>4</mn>' +
      '</mfenced>');

  this.executeRebuildTest(
      '<mfenced open="[">' +
      '<mn>1</mn>' +
      '<mn>2</mn>' +
      '<mn>3</mn>' +
      '<mn>4</mn>' +
      '</mfenced>');

  this.executeRebuildTest(
      '<mfenced open="[" close="">' +
      '<mn>1</mn>' +
      '<mn>2</mn>' +
      '<mn>3</mn>' +
      '<mn>4</mn>' +
      '</mfenced>');

  this.executeRebuildTest(
      '<mfenced open="" close="]">' +
      '<mn>1</mn>' +
      '<mn>2</mn>' +
      '<mn>3</mn>' +
      '<mn>4</mn>' +
      '</mfenced>');

  this.executeRebuildTest(
      '<mfenced open=" " close=" " separators=" ">' +
      '<mn>1</mn>' +
      '<mn>2</mn>' +
      '<mn>3</mn>' +
      '<mn>4</mn>' +
      '</mfenced>');

  // this.executeRebuildTest(
  //     '<mfenced open="55" close=" ">' +
  //     '<mn>1</mn>' +
  //     '<mn>2</mn>' +
  //     '<mn>3</mn>' +
  //     '<mn>4</mn>' +
  //     '</mfenced>');

  this.executeRebuildTest(
      '<mfenced open="" close="" separators="">' +
      '<mn>1</mn>' +
      '<mn>2</mn>' +
      '<mn>3</mn>' +
      '<mn>4</mn>' +
      '</mfenced>');

  this.executeRebuildTest(
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
sre.RebuildStreeTest.prototype.testRebuildPunctuated = function() {
  this.executeRebuildTest(
      '<mi>a</mi><mo>,</mo><mi>b</mi><mo>,</mo><mi>c</mi><mo>,</mo><mi>d</mi>');
  this.executeRebuildTest(
      '<mo>,</mo><mi>b</mi><mo>,</mo><mi>c</mi><mo>,</mo><mi>d</mi>');

  this.executeRebuildTest(
      '<msub><mi>b</mi><mn>1</mn></msub><mo>!</mo>');
  this.executeRebuildTest(
      '<mo>:</mo><msub><mi>b</mi><mn>1</mn></msub>');
  this.executeRebuildTest(
      '<mo>:</mo><msub><mi>b</mi><mn>1</mn></msub><mo>!</mo>');
  this.executeRebuildTest(
      '<mo>,</mo><mo>,</mo><mo>,</mo><mo>!</mo>');
  this.executeRebuildTest(
      '<mo>,</mo><mo>,</mo><mo>,</mo><mo>,</mo>');
  this.executeRebuildTest(
      '<mo>\'</mo><mo>\'</mo><mo>\'</mo><mo>\'</mo>');
  this.executeRebuildTest(
      '<mo>\'</mo><mo>\'</mo><mo>,</mo><mo>\'</mo>');
  this.executeRebuildTest(
      '<mo>!</mo><mo>!</mo><mo>!</mo><mo>!</mo>');
};


// Units.
/**
 * Tests simple expressions containing units.
 */
sre.RebuildStreeTest.prototype.testRebuildSimpleUnits = function() {
  this.executeRebuildTest(
      '<mi mathvariant="normal" class="MathML-Unit">km</mi>');
  this.executeRebuildTest(
      '<mi>min</mi><mi mathvariant="normal" class="MathML-Unit">min</mi>');
  this.executeRebuildTest(
      '<msup><mi mathvariant="normal" class="MathML-Unit">km</mi>' +
      '<mn>2</mn></msup>');
  this.executeRebuildTest(
      '<mfrac><mi mathvariant="normal" class="MathML-Unit">km</mi>' +
      '<mi mathvariant="normal" class="MathML-Unit">h</mi></mfrac>');
  this.executeRebuildTest(
      '<mfrac><mi>m</mi>' +
      '<mi mathvariant="normal" class="MathML-Unit">km</mi></mfrac>');
  this.executeRebuildTest(
      '<mn>3</mn><mi mathvariant="normal" class="MathML-Unit">km</mi>');
  this.executeRebuildTest(
      '<mn>3</mn><mi mathvariant="normal" class="MathML-Unit">km</mi>' +
      '<mi mathvariant="normal" class="MathML-Unit">h</mi>');
};


/**
 * Tests more complex expressions containing units.
 */
sre.RebuildStreeTest.prototype.testRebuildComplexUnits = function() {
  this.executeRebuildTest(
      '<mi mathvariant="normal" class="MathML-Unit">s</mi>' +
      '<mn>3</mn><mi>m</mi>' +
      '<mi mathvariant="normal" class="MathML-Unit">km</mi>' +
      '<mi mathvariant="normal" class="MathML-Unit">h</mi>');
  this.executeRebuildTest(
      '<mi mathvariant="normal" class="MathML-Unit">km</mi>' +
      '<msup>' +
      '<mi mathvariant="normal" class="MathML-Unit">s</mi>' +
      '<mn>2</mn></msup>' +
      '<mn>3</mn><mi>m</mi>' +
      '<mi mathvariant="normal" class="MathML-Unit">km</mi>' +
      '<mi mathvariant="normal" class="MathML-Unit">h</mi>');
  this.executeRebuildTest(
      '<mn>3</mn><mi>m</mi>' +
      '<mi mathvariant="normal" class="MathML-Unit">km</mi>' +
      '<mi mathvariant="normal" class="MathML-Unit">h</mi>' +
      '<mfrac>' +
      '<mi>N</mi>' +
      '<msup>' +
      '<mi mathvariant="normal" class="MathML-Unit">s</mi>' +
      '<mn>2</mn></msup></mfrac>');
  this.executeRebuildTest(
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
sre.RebuildStreeTest.prototype.testRebuildEmptyTensors = function() {
  this.executeRebuildTest(
      '<mmultiscripts></mmultiscripts>');
  this.executeRebuildTest(
      '<mmultiscripts><none/></mmultiscripts>');
  this.executeRebuildTest(
      '<mmultiscripts><none/><mprescripts/></mmultiscripts>');
  this.executeRebuildTest(
      '<mmultiscripts><none/><mprescripts/><none/></mmultiscripts>');
  this.executeRebuildTest(
      '<mmultiscripts><none/><none/><mprescripts/><none/></mmultiscripts>');
  this.executeRebuildTest(
      '<mmultiscripts><none/><none/><none/>' +
      '<mprescripts/><none/></mmultiscripts>');
  this.executeRebuildTest(
      '<mmultiscripts><none/><none/><none/><mprescripts/>' +
      '<none/><mpadded/></mmultiscripts>');
};


/**
 * Pathological multiscript expressions that are just the base element.
 */
sre.RebuildStreeTest.prototype.testRebuildBaseTensors = function() {
  this.executeRebuildTest(
      '<mmultiscripts><mi>X</mi></mmultiscripts>');
  this.executeRebuildTest(
      '<mmultiscripts><mi>X</mi><none/></mmultiscripts>');
  this.executeRebuildTest(
      '<mmultiscripts><mi>X</mi><none/><mprescripts/></mmultiscripts>');
  this.executeRebuildTest(
      '<mmultiscripts><mi>X</mi><none/><mprescripts/><none/></mmultiscripts>');
  this.executeRebuildTest(
      '<mmultiscripts><mi>X</mi><none/><none/><none/><mprescripts/><none/>' +
      '</mmultiscripts>');
  this.executeRebuildTest(
      '<mmultiscripts><mrow><mi>X</mi><mo>+</mo><mi>Y</mi></mrow>' +
      '<none/><mpadded/></mmultiscripts>');
};


//
//TODO: Some tensors do not yet work due to collapsed content nodes that are not
// being recorded
//
/**
 * Pathological multiscript expressions that are actually on right
 * sub/superscripts.
 */
sre.RebuildStreeTest.prototype.testRebuildRightScriptTensors = function() {
  this.executeRebuildTest(
      '<mmultiscripts><mi>X</mi><mi>i</mi></mmultiscripts>');
  this.executeRebuildTest(
      '<mmultiscripts><mi>X</mi><mi>i</mi><none/></mmultiscripts>');
  this.executeRebuildTest(
      '<mmultiscripts><mi>X</mi><none/><mi>i</mi></mmultiscripts>');
  this.executeRebuildTest(
      '<mmultiscripts><mi>X</mi><mi>i</mi><mi>j</mi></mmultiscripts>');
  this.executeRebuildTest(
      '<mmultiscripts><mpadded><mi>X</mi></mpadded><mi>i</mi>' +
      '<mpadded><mi>j</mi></mpadded></mmultiscripts>');
  this.executeRebuildTest(
      '<mmultiscripts><mi>X</mi><mi>i</mi><mi>j</mi>' +
      '<mprescripts/><none/></mmultiscripts>');
  // this.executeRebuildTest(
  //     '<mmultiscripts><mi>X</mi><mi>i</mi><mi>j</mi><mi>k</mi><mi>l</mi>' +
  //     '<mprescripts/><none/></mmultiscripts>');
  // this.executeRebuildTest(
  //     '<mmultiscripts><mi>X</mi><mi>i</mi><none/><mi>j</mi><none/>' +
  //     '<mprescripts/><none/></mmultiscripts>');
  // this.executeRebuildTest(
  //     '<mmultiscripts><mi>X</mi><none/><mi>i</mi><none/><mi>j</mi>' +
  //     '<mprescripts/><none/></mmultiscripts>');
};


/**
 * Simple multiscript expressions with some scripts on the left.
 */
sre.RebuildStreeTest.prototype.testRebuildSimpleTensors = function() {
  this.executeRebuildTest(
      '<mmultiscripts><mi>A</mi><mn>1</mn><mn>2</mn><mprescripts/>' +
      '<mn>3</mn><mn>4</mn></mmultiscripts>');
  this.executeRebuildTest(
      '<mmultiscripts><mi>A</mi><mn>1</mn><none/><mprescripts/>' +
      '<mn>3</mn><mn>4</mn></mmultiscripts>');
  this.executeRebuildTest(
      '<mmultiscripts><mi>A</mi><mn>1</mn><mprescripts/>' +
      '<mn>3</mn><mn>4</mn></mmultiscripts>');
  this.executeRebuildTest(
      '<mmultiscripts><mi>A</mi><none/><mn>2</mn><mprescripts/>' +
      '<mn>3</mn><mn>4</mn></mmultiscripts>');
  this.executeRebuildTest(
      '<mmultiscripts><mi>A</mi><none/><none/><mprescripts/>' +
      '<mn>3</mn><mn>4</mn></mmultiscripts>');
  this.executeRebuildTest(
      '<mmultiscripts><mi>A</mi><mpadded/><mprescripts/>' +
      '<mn>3</mn><mn>4</mn></mmultiscripts>');
  this.executeRebuildTest(
      '<mmultiscripts><mi>A</mi><mprescripts/>' +
      '<mn>3</mn><mn>4</mn></mmultiscripts>');
  this.executeRebuildTest(
      '<mmultiscripts><mi>A</mi><mprescripts/>' +
      '<mn>3</mn></mmultiscripts>');
  this.executeRebuildTest(
      '<mmultiscripts><mi>A</mi><mprescripts/>' +
      '<none/><mn>4</mn></mmultiscripts>');
  this.executeRebuildTest(
      '<mmultiscripts><mi>A</mi><mn>1</mn><mprescripts/>' +
      '<none/><mn>4</mn></mmultiscripts>');
  this.executeRebuildTest(
      '<mmultiscripts><mi>A</mi><none/><mn>2</mn><mprescripts/>' +
      '<mn>3</mn></mmultiscripts>');
  this.executeRebuildTest(
      '<mmultiscripts><mpadded><mi>A</mi></mpadded><none/>' +
      '<mpadded><mn>2</mn></mpadded><mprescripts/>' +
      '<mn>3</mn></mmultiscripts>');
};


/**
 * Complex multiscript expressions with some scripts on the left.
 */
sre.RebuildStreeTest.prototype.untestRebuildComplexTensors = function() {
  this.executeRebuildTest(
      '<mmultiscripts><mi>A</mi><mn>3</mn><mn>4</mn><mi>k</mi><mi>l</mi>' +
      '<mprescripts/><mn>1</mn><mn>2</mn><mi>i</mi><mi>j</mi></mmultiscripts>');
  this.executeRebuildTest(
      '<mmultiscripts><mi>A</mi><mn>3</mn><none/><mi>k</mi><mi>l</mi>' +
      '<mprescripts/><mn>1</mn><none/><none/><mi>j</mi></mmultiscripts>');
  this.executeRebuildTest(
      '<mmultiscripts><mi>A</mi><mn>1</mn><mn>2</mn><mn>3</mn><mprescripts/>' +
      '<mn>4</mn></mmultiscripts>');
  this.executeRebuildTest(
      '<mmultiscripts><mi>A</mi><mn>1</mn><mn>2</mn><mn>3</mn><mprescripts/>' +
      '<mn>5</mn><mn>4</mn><mn>6</mn></mmultiscripts>');
  this.executeRebuildTest(
      '<mmultiscripts><mpadded><mi>A</mi></mpadded><mpadded><mn>1</mn>' +
      '</mpadded><mpadded><mn>2</mn></mpadded><mpadded><mn>3</mn>' +
      '</mpadded><mprescripts/>' +
      '<mpadded><mn>5</mn></mpadded><mpadded><mn>4</mn></mpadded>' +
      '<mpadded><mn>6</mn></mpadded></mmultiscripts>');
  this.executeRebuildTest(
      '<mmultiscripts><mrow><mi>X</mi><mo>+</mo><mi>Y</mi></mrow>' +
      '<mn>1</mn><mn>2</mn><mprescripts/><none/><mn>3</mn></mmultiscripts>');
};


// Expressions containing ignored tags.
/**
 * Expressions containing pseudo unit children, i.e., children whose only
 * siblings are ignored nodes.
 */
sre.RebuildStreeTest.prototype.testRebuildPseudoUnitChildren = function() {
  this.executeRebuildTest(
      '<mi>a</mi><mspace/>');
  this.executeRebuildTest(
      '<mi>i</mi><merror><mi>Y</mi></merror>');
  this.executeRebuildTest(
      '<mphantom><mtext>nix</mtext></mphantom><mi>i</mi>' +
      '<merror><mi>Y</mi></merror>');
  this.executeRebuildTest(
      '<mrow><mphantom><mtext>nix</mtext></mphantom><mi>i</mi>' +
      '<merror><mi>Y</mi></merror></mrow>');
  this.executeRebuildTest(
      '<mrow><mphantom><mtext>nix</mtext></mphantom><mi>i</mi>' +
      '<merror><mi>Y</mi></merror></mrow>' +
      '<merror><mtext>nothing</mtext></merror>');
  this.executeRebuildTest(
      '<mrow><mphantom><mtext>nix</mtext></mphantom><mrow><mi>i</mi></mrow>' +
      '<merror><mi>Y</mi></merror></mrow><merror>' +
      '<mtext>nothing</mtext></merror>');
  this.executeRebuildTest(
      '<mrow><mphantom><mtext>nix</mtext></mphantom><mrow><mi>i</mi' +
      '><mi>j</mi></mrow><merror><mi>Y</mi></merror></mrow>' +
      '<merror><mtext>nothing</mtext></merror>');
};


/**
 * Expressions with ignore tags, introducing a new mrow.
 */
sre.RebuildStreeTest.prototype.testRebuildInterspersedIgnore = function() {
  this.executeRebuildTest(
      '<mphantom><mtext>nix</mtext></mphantom><mi>i</mi><mi>j</mi>' +
      '<merror><mi>Y</mi></merror>');
  this.executeRebuildTest(
      '<mphantom><mtext>nix</mtext></mphantom><mi>i</mi><mo>+</mo><mi>j</mi>' +
      '<merror><mi>Y</mi></merror>');
  this.executeRebuildTest(
      '<mi>i</mi><merror><mtext>nothing</mtext></merror><mo>+</mo><mi>j</mi>');
  this.executeRebuildTest(
      '<mi>i</mi><merror><mtext>nothing</mtext></merror><mi>j</mi>');
  this.executeRebuildTest(
      '<mphantom><mtext>nix</mtext></mphantom><mi>i</mi><merror>' +
      '<mtext>nothing</mtext></merror><mo>+</mo>' +
      '<mi>j</mi><merror><mi>Y</mi></merror>');
};


/**
 * Expressions with over and under scores.
 */
sre.RebuildStreeTest.prototype.testRebuildMunderOver = function() {
  this.executeRebuildTest(
      '<munder><mo>&#x2192;</mo><mi>n</mi></munder>');
  this.executeRebuildTest(
      '<mover><mo>&#x2192;</mo><mtext>above</mtext></mover>');
  this.executeRebuildTest(
      '<munderover><mo>&#x2192;</mo><mi>n</mi><mtext>above</mtext>' +
      '</munderover>');
};


// Embellished operators.
/**
 * Simple embellished arguments.
 */
sre.RebuildStreeTest.prototype.testRebuildSimpleEmbellishment = function() {
  this.brief = false;
  this.executeRebuildTest(
      '<msup><mi>\u222B</mi><mn>2</mn></msup>');
  this.executeRebuildTest(
      '<msup><mi>f</mi><mn>2</mn></msup>');
  this.executeRebuildTest(
      '<msup><mo>(</mo><mn>2</mn></msup>');
  this.executeRebuildTest(
      '<msup><mo>=</mo><mn>2</mn></msup>');
  this.executeRebuildTest(
      '<msup><mo>+</mo><mn>2</mn></msup>');
  this.executeRebuildTest(
      '<msup><mo>,</mo><mn>2</mn></msup>');
};


/**
 * Multi embellished arguments.
 */
sre.RebuildStreeTest.prototype.testRebuildMultiEmbellishment = function() {
  this.brief = false;
  this.executeRebuildTest(
      '<msub><msup><mo>+</mo><mn>2</mn></msup><mi>x</mi></msub>');
  this.executeRebuildTest(
      '<mmultiscripts><mo>+</mo><mn>2</mn><mi>x</mi></mmultiscripts>');
  this.executeRebuildTest(
      '<mover><msub><msup><mo>+</mo><mn>2</mn></msup><mi>x</mi>' +
      '</msub><mo>-</mo></mover>');
  this.executeRebuildTest(
      '<msup><mo>+</mo><msub><mi>x</mi><mn>2</mn></msub></msup>');
  this.executeRebuildTest(
      '<msub><munder><mo>+</mo><mn>2</mn></munder><mi>x</mi></msub>');
  this.executeRebuildTest(
      '<mmultiscripts><mi>(</mi><none/><none/>' +
      '<mprescripts/><mn>1</mn><mi>j</mi></mmultiscripts>');
  this.executeRebuildTest(
      '<mmultiscripts><mi>(</mi><none/><mi>K</mi>' +
      '<mprescripts/><mn>1</mn><mi>j</mi></mmultiscripts>');
  this.executeRebuildTest(
      '<mmultiscripts><mi>(</mi><mn>1</mn><mi>j</mi></mmultiscripts>');
};


/**
 * Expressions with embellished operators and relations.
 */
sre.RebuildStreeTest.prototype.testRebuildComplexEmbellishment = function() {
  this.executeRebuildTest(
      '<mi>a</mi><msub><mo>=</mo><mn>2</mn></msub><mi>x</mi><msub><mo>=</mo>' +
      '<mn>2</mn></msub><mi>z</mi>');
  this.executeRebuildTest(
      '<mi>a</mi><msub><mo>=</mo><mn>2</mn></msub><mi>x</mi><msub><mo>=</mo>' +
      '<mn>4</mn></msub><mi>z</mi>');
  this.executeRebuildTest(
      '<mi>a</mi><msub><mo>+</mo><mn>2</mn></msub><mi>x</mi><msub><mo>+</mo>' +
      '<mn>2</mn></msub><mi>z</mi>');
  this.executeRebuildTest(
      '<mi>a</mi><msub><mo>+</mo><mn>2</mn></msub><mi>x</mi><msub><mo>+</mo>' +
      '<mn>4</mn></msub><mi>z</mi>');
  this.executeRebuildTest(
      '<mi>a</mi><msub><mo>+</mo><mn>2</mn></msub><mi>b</mi><msup><mo>=</mo>' +
      '<mo>\'</mo></msup><mi>x</mi><msub><mo>+</mo><mn>4</mn></msub><mi>z</mi>');
  this.executeRebuildTest(
      '<mi>a</mi><msub><mo>:</mo><mn>2</mn></msub><mi>b</mi><msup><mo>,</mo>' +
      '<mo>\'</mo></msup><mi>x</mi><msub><mo>:</mo><mn>4</mn></msub><mi>z</mi>');
  this.executeRebuildTest(
      '<msub><mo>+</mo><mn>2</mn></msub><msub><mo>+</mo>' +
      '<mn>3</mn></msub><mi>x</mi>');
  this.executeRebuildTest(
      '<mi>x</mi><msub><mo>+</mo><mn>2</mn></msub><msub><mo>+</mo>' +
      '<mn>3</mn></msub>');
};


// Embellished Fences
/**
 * Expressions with embellished fences right.
 */
sre.RebuildStreeTest.prototype.testRebuildEmbellishedRightFence = function() {
  this.executeRebuildTest(
      '<mo>(</mo><mi>x</mi><msup><mo>)</mo><mn>4</mn></msup>');
  this.executeRebuildTest(
      '<mo>(</mo><mi>x</mi><msub><msup><mo>)</mo><mn>4</mn></msup>' +
      '<mn>2</mn></msub>');
  this.executeRebuildTest(
      '<mo>(</mo><mi>x</mi><msubsup><mo>)</mo><mn>4</mn><mn>2</mn></msubsup>');
  this.executeRebuildTest(
      '<mo>(</mo><mi>x</mi><mmultiscripts><mo>)</mo><mn>4</mn><mn>2</mn>' +
      '</mmultiscripts>');
  this.executeRebuildTest(
      '<mo>(</mo><mi>x</mi><msup><munder><msub><mover><mo>)</mo><mo>^</mo>' +
      '</mover><mn>2</mn></msub><mo>~</mo></munder><mn>1</mn></msup>');
  this.executeRebuildTest(
      '<mo>(</mo><mi>x</mi><mpadded><msup><munder><msub><mover><mo>)</mo>' +
      '<mo>^</mo></mover><mn>2</mn></msub><mo>~</mo></munder><mn>3</mn>' +
      '</msup></mpadded>');
};


/**
 * Expressions with embellished fences left.
 */
sre.RebuildStreeTest.prototype.testRebuildEmbellishedLeftFence = function() {
  this.executeRebuildTest(
      '<msup><mo>(</mo><mn>4</mn></msup><mi>x</mi><mo>)</mo>');
  this.executeRebuildTest(
      '<mmultiscripts><mo>(</mo><mn>4</mn></mmultiscripts><mi>x</mi><mo>)</mo>');
  // this.executeRebuildTest(
  //     '<mmultiscripts><mo>(</mo><mprescripts/><mn>4</mn></mmultiscripts>' +
  //     '<mi>x</mi><mo>)</mo>');
  // this.executeRebuildTest(
  //     '<mmultiscripts><mo>(</mo><mprescripts/><mn>4</mn><mn>3</mn>' +
  //     '</mmultiscripts><mi>x</mi><mo>)</mo>');
  // this.executeRebuildTest(
  //     '<mmultiscripts><mo>(</mo><mn>2</mn><mprescripts/><mn>4</mn>' +
  //     '<mn>3</mn></mmultiscripts><mi>x</mi><mo>)</mo>');
  // this.executeRebuildTest(
  //     '<mmultiscripts><munder><mo>(</mo><mo>~</mo></munder>' +
  //     '<mprescripts/><mn>4</mn><mn>3</mn>' +
  //     '</mmultiscripts><mi>x</mi><mo>)</mo>');
  // this.executeRebuildTest(
  //     '<mmultiscripts><mover><mmultiscripts><munder><mo>(</mo><mo>~</mo>' +
  //     '</munder><mprescripts/><none/><mn>3</mn></mmultiscripts><mo>^</mo>' +
  //     '</mover><mprescripts/><mn>4</mn>' +
  //     '</mmultiscripts><mi>x</mi><mo>)</mo>');
};


/**
 * Expressions with embellished fences on both sides.
 */
sre.RebuildStreeTest.prototype.untestRebuildEmbellishedBothFences = function() {
  this.executeRebuildTest(
      '<mmultiscripts><mo>(</mo><mprescripts/><mn>4</mn></mmultiscripts>' +
      '<mi>x</mi><msup><mo>)</mo><mn>2</mn></msup>');
  this.executeRebuildTest(
      '<mmultiscripts><mo>(</mo><mprescripts/><mn>4</mn><mn>3</mn>' +
      '</mmultiscripts><mi>x</mi><msubsup><mo>)</mo><mn>1</mn>' +
      '<mn>2</mn></msubsup>');
  this.executeRebuildTest(
      '<munder><mmultiscripts><mo>(</mo><mprescripts/><mn>4</mn><mn>3</mn>' +
      '</mmultiscripts><mo>~</mo></munder>' +
      '<mi>x</mi><mover><msubsup><mo>)</mo><mn>1</mn><mn>2</mn>' +
      '</msubsup><mo>^</mo></mover>');
};


/**
 * Expressions with padded background.
 */
sre.RebuildStreeTest.prototype.testRebuildEmbellishedPaddedFences =
    function() {
  this.executeRebuildTest(
      '<mo>(</mo><mi>x</mi><mpadded mathbackground="red"><msup><munder>' +
      '<msub><mover><mo>)</mo>' +
      '<mo>^</mo></mover><mn>2</mn></msub><mo>~</mo></munder><mn>3</mn>' +
      '</msup></mpadded>');
  // this.executeRebuildTest(
  //     '<mpadded mathbackground="red"><mmultiscripts><mover><mmultiscripts>' +
  //     '<munder><mo>(</mo><mo>~</mo>' +
  //     '</munder><mprescripts/><none/><mn>3</mn></mmultiscripts><mo>^</mo>' +
  //     '</mover><mprescripts/><mn>4</mn>' +
  //     '</mmultiscripts></mpadded><mi>x</mi><mo>)</mo>');
  // this.executeRebuildTest(
  //     '<mpadded mathbackground="blue"><munder><mmultiscripts><mo>(</mo>' +
  //     '<mprescripts/><mn>4</mn><mn>3</mn>' +
  //     '</mmultiscripts><mo>~</mo></munder></mpadded>' +
  //     '<mi>x</mi><mpadded mathbackground="red"><mover><msubsup><mo>)</mo>' +
  //     '<mn>1</mn><mn>2</mn></msubsup><mo>^</mo></mover></mpadded>');
};


/**
 * Expressions with embellished right fences as a sub-expression.
 */
sre.RebuildStreeTest.prototype.testRebuildEmbellRightSubexpr = function() {
  this.executeRebuildTest(
      '<mo>(</mo><mi>x</mi><msup><mo>)</mo><mn>4</mn></msup>' +
      '<mo>+</mo><mn>1</mn>');
  this.executeRebuildTest(
      '<mn>2</mn><mo>+</mo>' +
      '<mo>(</mo><mi>x</mi><msup><mo>)</mo><mn>4</mn></msup>' +
      '<mo>+</mo><mn>1</mn>');
  this.executeRebuildTest(
      '<mo>-</mo>' +
      '<mo>(</mo><mi>x</mi><msup><mo>)</mo><mn>4</mn></msup>' +
      '<mo>+</mo><mn>1</mn>');
};


/**
 * Expressions with embellished left fences as a sub-expression.
 */
sre.RebuildStreeTest.prototype.untestRebuildEmbellLeftSubexpr = function() {
  this.executeRebuildTest(
      '<mmultiscripts><mo>(</mo><mprescripts/><mn>4</mn><mn>3</mn>' +
      '</mmultiscripts><mi>x</mi><mo>)</mo><mo>+</mo><mn>1</mn>');
  this.executeRebuildTest(
      '<mo>-</mo><mmultiscripts><mo>(</mo><mprescripts/><mn>4</mn><mn>3</mn>' +
      '</mmultiscripts><mi>x</mi><mo>)</mo><mo>+</mo><mn>1</mn>');
  this.executeRebuildTest(
      '<mi>k</mi><mo>+</mo><mmultiscripts><mo>(</mo><mprescripts/><mn>4</mn>' +
      '<mn>3</mn></mmultiscripts><mi>x</mi><mo>)</mo><mo>+</mo><mn>1</mn>');
};


/**
 * Expressions with embellished both fences as a sub-expression.
 */
sre.RebuildStreeTest.prototype.untestRebuildEmbellBothSubexpr = function() {
  this.executeRebuildTest(
      '<mmultiscripts><mo>(</mo><mprescripts/><mn>4</mn><mn>3</mn>' +
      '</mmultiscripts><mi>x</mi><msubsup><mo>)</mo><mn>1</mn>' +
      '<mn>2</mn></msubsup><mo>+</mo><mn>1</mn>');
  this.executeRebuildTest(
      '<mo>-</mo><mmultiscripts><mo>(</mo><mprescripts/><mn>4</mn><mn>3</mn>' +
      '</mmultiscripts><mi>x</mi><msubsup><mo>)</mo><mn>1</mn>' +
      '<mn>2</mn></msubsup><mo>+</mo><mn>1</mn>');
  this.executeRebuildTest(
      '<mi>k</mi><mo>-</mo><mmultiscripts><mo>(</mo><mprescripts/><mn>4</mn>' +
      '<mn>3</mn></mmultiscripts><mi>x</mi><msubsup><mo>)</mo><mn>1</mn>' +
      '<mn>2</mn></msubsup><mo>+</mo><mn>1</mn>');
};


/**
 * Expressions with embellished fences right and complex content.
 */
sre.RebuildStreeTest.prototype.testRebuildComplexEmbellRight = function() {
  this.executeRebuildTest(
      '<mo>(</mo><mi>x</mi><mo>+</mo><mi>y</mi><msup><mo>)</mo>' +
      '<mn>4</mn></msup>');
  this.executeRebuildTest(
      '<mo>(</mo><mi>x</mi><mo>+</mo><mi>y</mi><msub><mo>)</mo>' +
      '<mn>4</mn></msub>');
};

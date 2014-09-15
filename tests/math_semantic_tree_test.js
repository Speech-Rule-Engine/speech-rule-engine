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

goog.require('sre.AbstractTest');
goog.require('sre.SemanticAttr');
goog.require('sre.SemanticTree');
goog.require('sre.SemanticUtil');
goog.require('sre.XpathUtil');



/**
 * @constructor
 * @extends {sre.AbstractTest}
 */
sre.SemanticTreeTest = function() {
  goog.base(this);

  /**
   * @override
   */
  this.information = 'Semantic tree tests.';
};
goog.inherits(sre.SemanticTreeTest, sre.AbstractTest);


/**
 * @override
 */
sre.SemanticTreeTest.prototype.setUpTest = function() {
  this.xpathBlacklist = [];
  this.brief = true;
  sre.SemanticTreeTest.setupAttributes();
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
  var node = sre.System.getInstance().parseInput(mathMl);
  var stree = new sre.SemanticTree(node);
  var sxml = sre.System.getInstance().parseInput(
      stree.xml(this.brief).toString());
  this.customizeXml(sxml);
  var dp = new sre.SystemExternal.xmldom.DOMParser();
  var xml = dp.parseFromString('<stree>' + sml + '</stree>', 'text/xml');
  var xmls = new sre.SystemExternal.xmldom.XMLSerializer();
  this.assert.equal(xmls.serializeToString(xml), xmls.serializeToString(sxml));
};


// Relations.
/**
 * Test relation trees.
 */
sre.SemanticTreeTest.prototype.testStreeRelations = function() {
  this.brief = true;
  this.executeTreeTest(
      '<mo>=</mo>',
      '<relation>=</relation>');
  this.executeTreeTest(
      '<mi>a</mi><mo>=</mo><mi>b</mi>',
      '<relseq>=' +
          '<content><relation>=</relation></content>' +
          '<children>' +
          '<identifier>a</identifier>' +
          '<identifier>b</identifier>' +
          '</children>' +
          '</relseq>');
  this.executeTreeTest(
      '<mi>a</mi><mo>=</mo><mi>b</mi><mo>=</mo><mi>c</mi>',
      '<relseq>=' +
          '<content><relation>=</relation><relation>=</relation></content>' +
          '<children>' +
          '<identifier>a</identifier>' +
          '<identifier>b</identifier>' +
          '<identifier>c</identifier>' +
          '</children>' +
          '</relseq>');
  this.executeTreeTest(
      '<mi>a</mi><mo>=</mo><mi>b</mi><mo>=</mo><mi>c</mi>' +
          '<mo>\u2264</mo><mi>d</mi>',
      '<multirel>' +
          '<content><relation>=</relation><relation>=</relation>' +
          '<relation>\u2264</relation></content>' +
          '<children>' +
          '<identifier>a</identifier>' +
          '<identifier>b</identifier>' +
          '<identifier>c</identifier>' +
          '<identifier>d</identifier>' +
          '</children>' +
          '</multirel>');
};


// Operators.
/**
 * Test operator trees with pre- and postfixes.
 */
sre.SemanticTreeTest.prototype.testStreePrePostfixOperators = function() {
  this.brief = true;
  // Pathological operator only case.
  this.executeTreeTest(
      '<mo>+</mo><mo>-</mo><mo>+</mo>',
      '<prefixop>+' +
          '<content><operator>+</operator></content>' +
          '<children>' +
          '<prefixop>-' +
          '<content><operator>-</operator></content>' +
          '<children>' +
          '<operator>+</operator>' +
          '</children>' +
          '</prefixop>' +
          '</children>' +
          '</prefixop>');
  // Single identifier with prefixes.
  this.executeTreeTest(
      '<mo>+</mo><mo>+</mo><mi>a</mi>',
      '<prefixop>+ +' +
          '<content><operator>+</operator><operator>+</operator></content>' +
          '<children>' +
          '<identifier>a</identifier>' +
          '</children>' +
          '</prefixop>');
  // Single identifier with prefix and negative.
  this.executeTreeTest(
      '<mo>+</mo><mo>-</mo><mi>a</mi>',
      '<prefixop>+' +
          '<content><operator>+</operator></content>' +
          '<children>' +
          '<prefixop>-' +
          '<content><operator>-</operator></content>' +
          '<children>' +
          '<identifier>a</identifier>' +
          '</children>' +
          '</prefixop>' +
          '</children>' +
          '</prefixop>');
  // Single identifier with postfixes.
  this.executeTreeTest(
      '<mi>a</mi><mo>+</mo><mo>-</mo>',
      '<postfixop>+ -' +
          '<content><operator>+</operator><operator>-</operator></content>' +
          '<children>' +
          '<identifier>a</identifier>' +
          '</children>' +
          '</postfixop>');
  // Single identifier with pre- and postfixes.
  this.executeTreeTest(
      '<mo>+</mo><mo>+</mo><mi>a</mi><mo>+</mo><mo>+</mo>',
      '<postfixop>+ +' +
          '<content><operator>+</operator><operator>+</operator></content>' +
          '<children>' +
          '<prefixop>+ +' +
          '<content><operator>+</operator><operator>+</operator></content>' +
          '<children>' +
          '<identifier>a</identifier>' +
          '</children>' +
          '</prefixop>' +
          '</children>' +
          '</postfixop>');
  // Single identifier with mixed pre- and postfixes.
  this.executeTreeTest(
      '<mo>\u2213</mo><mo>+</mo><mi>a</mi><mo>\u2213</mo><mo>+</mo>',
      '<postfixop>\u2213 +' +
          '<content>' +
          '<operator>\u2213</operator><operator>+</operator>' +
          '</content>' +
          '<children>' +
          '<prefixop>\u2213 +' +
          '<content>' +
          '<operator>\u2213</operator><operator>+</operator>' +
          '</content>' +
          '<children>' +
          '<identifier>a</identifier>' +
          '</children>' +
          '</prefixop>' +
          '</children>' +
          '</postfixop>');
  // Two identifiers with pre- and postfixes.
  this.executeTreeTest(
      '<mo>+</mo><mo>+</mo><mi>a</mi><mo>\u2213</mo><mo>+</mo>' +
          '<mi>b</mi><mo>+</mo>',
      '<infixop>\u2213' +
          '<content><operator>\u2213</operator></content>' +
          '<children>' +
          '<prefixop>+ +' +
          '<content><operator>+</operator><operator>+</operator></content>' +
          '<children>' +
          '<identifier>a</identifier>' +
          '</children>' +
          '</prefixop>' +
          '<postfixop>+' +
          '<content><operator>+</operator></content>' +
          '<children>' +
          '<prefixop>+' +
          '<content><operator>+</operator></content>' +
          '<children>' +
          '<identifier>b</identifier>' +
          '</children>' +
          '</prefixop>' +
          '</children>' +
          '</postfixop>' +
          '</children>' +
          '</infixop>');
  // Three identifiers with pre- and postfixes.
  this.executeTreeTest(
      '<mo>+</mo><mo>+</mo><mi>a</mi><mo>\u2213</mo><mo>+</mo>' +
          '<mi>b</mi><mo>+</mo><mo>\u2213</mo><mi>c</mi><mo>+</mo>',
      '<infixop>+' +
          '<content><operator>+</operator></content>' +
          '<children>' +
          '<infixop>\u2213' +
          '<content><operator>\u2213</operator></content>' +
          '<children>' +
          '<prefixop>+ +' +
          '<content><operator>+</operator><operator>+</operator></content>' +
          '<children>' +
          '<identifier>a</identifier>' +
          '</children>' +
          '</prefixop>' +
          '<prefixop>+' +
          '<content><operator>+</operator></content>' +
          '<children>' +
          '<identifier>b</identifier>' +
          '</children>' +
          '</prefixop>' +
          '</children>' +
          '</infixop>' +
          '<postfixop>+' +
          '<content><operator>+</operator></content>' +
          '<children>' +
          '<prefixop>\u2213' +
          '<content><operator>\u2213</operator></content>' +
          '<children>' +
          '<identifier>c</identifier>' +
          '</children>' +
          '</prefixop>' +
          '</children>' +
          '</postfixop>' +
          '</children>' +
          '</infixop>');
};


/**
 * Test operator trees with single operator.
 */
sre.SemanticTreeTest.prototype.testStreeSingleOperators = function() {
  this.brief = true;
  // Single identifier.
  this.executeTreeTest(
      '<mi>a</mi>',
      '<identifier>a</identifier>');
  // Single implicit node.
  this.executeTreeTest(
      '<mi>a</mi><mi>b</mi>',
      '<infixop>\u2062' +
          '<content><operator>\u2062</operator></content>' +
          '<children>' +
          '<identifier>a</identifier>' +
          '<identifier>b</identifier>' +
          '</children>' +
          '</infixop>');
  // Implicit multi node.
  this.executeTreeTest(
      '<mi>a</mi><mi>b</mi><mi>c</mi>',
      '<infixop>\u2062' +
          '<content><operator>\u2062</operator></content>' +
          '<children>' +
          '<identifier>a</identifier>' +
          '<identifier>b</identifier>' +
          '<identifier>c</identifier>' +
          '</children>' +
          '</infixop>');
  // Single addition.
  this.executeTreeTest(
      '<mi>a</mi><mo>+</mo><mi>b</mi>',
      '<infixop>+' +
          '<content><operator>+</operator></content>' +
          '<children>' +
          '<identifier>a</identifier>' +
          '<identifier>b</identifier>' +
          '</children>' +
          '</infixop>');
  // Multi addition.
  this.executeTreeTest(
      '<mi>a</mi><mo>+</mo><mi>b</mi><mo>+</mo><mi>c</mi>',
      '<infixop>+' +
          '<content><operator>+</operator><operator>+</operator></content>' +
          '<children>' +
          '<identifier>a</identifier>' +
          '<identifier>b</identifier>' +
          '<identifier>c</identifier>' +
          '</children>' +
          '</infixop>');
  // Multi addition with implicit node.
  this.executeTreeTest(
      '<mi>a</mi><mo>+</mo><mi>b</mi><mi>c</mi><mo>+</mo><mi>d</mi>',
      '<infixop>+' +
          '<content><operator>+</operator><operator>+</operator></content>' +
          '<children>' +
          '<identifier>a</identifier>' +
          '<infixop>\u2062' +
          '<content><operator>\u2062</operator></content>' +
          '<children>' +
          '<identifier>b</identifier>' +
          '<identifier>c</identifier>' +
          '</children>' +
          '</infixop>' +
          '<identifier>d</identifier>' +
          '</children>' +
          '</infixop>');
};


/**
 * Test operator trees with multiple operators.
 */
sre.SemanticTreeTest.prototype.testStreeMultipleOperators = function() {
  this.brief = true;
  // Addition and subtraction.
  this.executeTreeTest(
      '<mi>a</mi><mo>+</mo><mi>b</mi><mo>-</mo><mi>c</mi><mo>+</mo><mi>d</mi>',
      '<infixop>+' +
          '<content><operator>+</operator></content>' +
          '<children>' +
          '<infixop>-' +
          '<content><operator>-</operator></content>' +
          '<children>' +
          '<infixop>+' +
          '<content><operator>+</operator></content>' +
          '<children>' +
          '<identifier>a</identifier>' +
          '<identifier>b</identifier>' +
          '</children>' +
          '</infixop>' +
          '<identifier>c</identifier>' +
          '</children>' +
          '</infixop>' +
          '<identifier>d</identifier>' +
          '</children>' +
          '</infixop>');
  // Addition and subtraction.
  this.executeTreeTest(
      '<mi>a</mi><mo>+</mo><mi>b</mi><mo>+</mo><mi>c</mi><mo>-</mo>' +
          '<mi>d</mi><mo>-</mo><mi>e</mi>',
      '<infixop>-' +
          '<content><operator>-</operator><operator>-</operator></content>' +
          '<children>' +
          '<infixop>+' +
          '<content><operator>+</operator><operator>+</operator></content>' +
          '<children>' +
          '<identifier>a</identifier>' +
          '<identifier>b</identifier>' +
          '<identifier>c</identifier>' +
          '</children>' +
          '</infixop>' +
          '<identifier>d</identifier>' +
          '<identifier>e</identifier>' +
          '</children>' +
          '</infixop>');
  // Addition and explicit multiplication.
  this.executeTreeTest(
      '<mi>a</mi><mo>+</mo><mi>b</mi><mo>\u2218</mo><mi>c</mi><mo>+</mo><mi>d</mi>',
      '<infixop>+' +
          '<content><operator>+</operator><operator>+</operator></content>' +
          '<children>' +
          '<identifier>a</identifier>' +
          '<infixop>\u2218' +
          '<content><operator>\u2218</operator></content>' +
          '<children>' +
          '<identifier>b</identifier>' +
          '<identifier>c</identifier>' +
          '</children>' +
          '</infixop>' +
          '<identifier>d</identifier>' +
          '</children>' +
          '</infixop>');
  // Addition with explicit and implicit multiplication.
  this.executeTreeTest(
      '<mi>a</mi><mo>+</mo><mi>b</mi><mo>\u2218</mo><mi>c</mi><mi>d</mi>' +
      '<mo>+</mo><mi>e</mi><mo>\u2218</mo><mi>f</mi>',
      '<infixop>+' +
          '<content><operator>+</operator><operator>+</operator></content>' +
          '<children>' +
          '<identifier>a</identifier>' +
          '<infixop>\u2218' +
          '<content><operator>\u2218</operator></content>' +
          '<children>' +
          '<identifier>b</identifier>' +
          '<infixop>\u2062' +
          '<content><operator>\u2062</operator></content>' +
          '<children>' +
          '<identifier>c</identifier>' +
          '<identifier>d</identifier>' +
          '</children>' +
          '</infixop>' +
          '</children>' +
          '</infixop>' +
          '<infixop>\u2218' +
          '<content><operator>\u2218</operator></content>' +
          '<children>' +
          '<identifier>e</identifier>' +
          '<identifier>f</identifier>' +
          '</children>' +
          '</infixop>' +
          '</children>' +
          '</infixop>');
  // Two Additions, subtraction plus explicit and implicit multiplication,
  // one prefix and one postfix.
  this.executeTreeTest(
      '<mi>a</mi><mo>+</mo><mi>b</mi><mo>+</mo><mi>c</mi><mi>d</mi>' +
          '<mo>+</mo><mi>e</mi><mo>\u2218</mo><mi>f</mi><mo>-</mo><mi>g</mi>' +
          '<mo>+</mo><mo>+</mo><mi>h</mi><mo>\u2295</mo><mi>i</mi>' +
          '<mo>\u2295</mo><mi>j</mi><mo>+</mo><mo>+</mo>',
      '<infixop>\u2295' +
          '<content><operator>\u2295</operator>' +
          '<operator>\u2295</operator></content>' +
          '<children>' +
          '<infixop>+' +
          '<content><operator>+</operator></content>' +
          '<children>' +
          '<infixop>-' +
          '<content><operator>-</operator></content>' +
          '<children>' +
          '<infixop>+' +
          '<content><operator>+</operator>' +
          '<operator>+</operator><operator>+</operator></content>' +
          '<children>' +
          '<identifier>a</identifier>' +
          '<identifier>b</identifier>' +
          '<infixop>\u2062' +
          '<content><operator>\u2062</operator></content>' +
          '<children>' +
          '<identifier>c</identifier>' +
          '<identifier>d</identifier>' +
          '</children>' +
          '</infixop>' +
          '<infixop>\u2218' +
          '<content><operator>\u2218</operator></content>' +
          '<children>' +
          '<identifier>e</identifier>' +
          '<identifier>f</identifier>' +
          '</children>' +
          '</infixop>' +
          '</children>' +
          '</infixop>' +
          '<identifier>g</identifier>' +
          '</children>' +
          '</infixop>' +
          '<prefixop>+' +
          '<content><operator>+</operator></content>' +
          '<children>' +
          '<identifier>h</identifier>' +
          '</children>' +
          '</prefixop>' +
          '</children>' +
          '</infixop>' +
          '<identifier>i</identifier>' +
          '<postfixop>+ +' +
          '<content><operator>+</operator><operator>+</operator></content>' +
          '<children>' +
          '<identifier>j</identifier>' +
          '</children>' +
          '</postfixop>' +
          '</children>' +
          '</infixop>');
};


// Fences.
/**
 * Test regular directed fences.
 */
sre.SemanticTreeTest.prototype.testStreeRegularFences = function() {
  this.brief = true;
  // No fence.
  this.executeTreeTest(
      '<mrow><mi>a</mi><mo>+</mo><mi>b</mi></mrow>',
      '<infixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<identifier>a</identifier>' +
      '<identifier>b</identifier>' +
      '</children>' +
      '</infixop>');
  // Empty parentheses.
  this.executeTreeTest(
      '<mrow><mo>(</mo><mo>)</mo></mrow>',
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<empty/>' +
      '</children>' +
      '</fenced>');
  // Single Fenced Expression.
  this.executeTreeTest(
      '<mrow><mo>(</mo><mi>a</mi><mo>+</mo><mi>b</mi><mo>)</mo></mrow>',
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<infixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<identifier>a</identifier>' +
      '<identifier>b</identifier>' +
      '</children>' +
      '</infixop>' +
      '</children>' +
      '</fenced>');
  // Single Fenced Expression and operators.
  this.executeTreeTest(
      '<mrow><mi>a</mi><mo>+</mo><mo>(</mo><mi>b</mi><mo>+</mo><mi>c</mi>' +
      '<mo>)</mo><mo>+</mo><mi>d</mi></mrow>',
      '<infixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<identifier>a</identifier>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<infixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<identifier>b</identifier>' +
      '<identifier>c</identifier>' +
      '</children>' +
      '</infixop>' +
      '</children>' +
      '</fenced>' +
      '<identifier>d</identifier>' +
      '</children>' +
      '</infixop>');
  // Parallel Parenthesis.
  this.executeTreeTest(
      '<mrow><mo>(</mo><mi>a</mi><mo>+</mo><mi>b</mi><mo>)</mo><mo>(</mo>' +
      '<mi>c</mi><mo>+</mo><mi>d</mi><mo>)</mo></mrow>',
      '<infixop>\u2062' +
      '<content>' +
      '<operator>\u2062</operator>' +
      '</content>' +
      '<children>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<infixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<identifier>a</identifier>' +
      '<identifier>b</identifier>' +
      '</children>' +
      '</infixop>' +
      '</children>' +
      '</fenced>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<infixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<identifier>c</identifier>' +
      '<identifier>d</identifier>' +
      '</children>' +
      '</infixop>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</infixop>');
  // Nested Parenthesis.
  this.executeTreeTest(
      '<mrow><mo>(</mo><mo>(</mo><mi>a</mi><mo>+</mo><mi>b</mi><mo>)</mo>' +
      '<mo>(</mo><mi>c</mi><mo>+</mo><mi>d</mi><mo>)</mo><mo>)</mo></mrow>',
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<infixop>\u2062' +
      '<content>' +
      '<operator>\u2062</operator>' +
      '</content>' +
      '<children>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<infixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<identifier>a</identifier>' +
      '<identifier>b</identifier>' +
      '</children>' +
      '</infixop>' +
      '</children>' +
      '</fenced>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<infixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<identifier>c</identifier>' +
      '<identifier>d</identifier>' +
      '</children>' +
      '</infixop>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</infixop>' +
      '</children>' +
      '</fenced>');
  // Nested parenthesis and brackets.
  this.executeTreeTest(
      '<mrow><mo>(</mo><mo>[</mo><mi>a</mi><mo>+</mo><mi>b</mi><mo>+</mo>' +
      '<mi>c</mi><mo>]</mo><mo>+</mo><mi>d</mi><mo>)</mo></mrow>',
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<infixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<fenced>' +
      '<content>' +
      '<fence>[</fence>' +
      '<fence>]</fence>' +
      '</content>' +
      '<children>' +
      '<infixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<identifier>a</identifier>' +
      '<identifier>b</identifier>' +
      '<identifier>c</identifier>' +
      '</children>' +
      '</infixop>' +
      '</children>' +
      '</fenced>' +
      '<identifier>d</identifier>' +
      '</children>' +
      '</infixop>' +
      '</children>' +
      '</fenced>');
  // Nested parenthesis, brackets, braces and superscript operator.
  this.executeTreeTest(
      '<mrow><mo>(</mo><msup><mi>a</mi><mrow><mn>2</mn><mo>[</mo><mi>i</mi>' +
      '<mo>+</mo><mi>n</mi><mo>]</mo></mrow></msup><mo>+</mo><mi>b</mi>' +
      '<mo>)</mo><mo>+</mo><mo>{</mo><mi>c</mi><mi>d</mi><mo>-</mo><mo>[</mo>' +
      '<mi>e</mi><mo>+</mo><mi>f</mi><mo>]</mo><mo>}</mo></mrow>',
      '<infixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<infixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<superscript>' +
      '<children>' +
      '<identifier>a</identifier>' +
      '<infixop>\u2062' +
      '<content>' +
      '<operator>\u2062</operator>' +
      '</content>' +
      '<children>' +
      '<number>2</number>' +
      '<fenced>' +
      '<content>' +
      '<fence>[</fence>' +
      '<fence>]</fence>' +
      '</content>' +
      '<children>' +
      '<infixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<identifier>i</identifier>' +
      '<identifier>n</identifier>' +
      '</children>' +
      '</infixop>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</infixop>' +
      '</children>' +
      '</superscript>' +
      '<identifier>b</identifier>' +
      '</children>' +
      '</infixop>' +
      '</children>' +
      '</fenced>' +
      '<fenced>' +
      '<content>' +
      '<fence>{</fence>' +
      '<fence>}</fence>' +
      '</content>' +
      '<children>' +
      '<infixop>-' +
      '<content>' +
      '<operator>-</operator>' +
      '</content>' +
      '<children>' +
      '<infixop>\u2062' +
      '<content>' +
      '<operator>\u2062</operator>' +
      '</content>' +
      '<children>' +
      '<identifier>c</identifier>' +
      '<identifier>d</identifier>' +
      '</children>' +
      '</infixop>' +
      '<fenced>' +
      '<content>' +
      '<fence>[</fence>' +
      '<fence>]</fence>' +
      '</content>' +
      '<children>' +
      '<infixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<identifier>e</identifier>' +
      '<identifier>f</identifier>' +
      '</children>' +
      '</infixop>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</infixop>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</infixop>');
};


/**
 * Test neutral fences.
 */
sre.SemanticTreeTest.prototype.testStreeNeutralFences = function() {
  this.brief = true;
  // Empty bars.
  this.executeTreeTest(
      '<mrow><mo>|</mo><mo>|</mo></mrow>',
      '<fenced>' +
      '<content>' +
      '<fence>|</fence>' +
      '<fence>|</fence>' +
      '</content>' +
      '<children>' +
      '<empty/>' +
      '</children>' +
      '</fenced>');
  // Simple bar fence.
  this.executeTreeTest(
      '<mrow><mo>|</mo><mi>a</mi><mo>|</mo></mrow>',
      '<fenced>' +
      '<content>' +
      '<fence>|</fence>' +
      '<fence>|</fence>' +
      '</content>' +
      '<children>' +
      '<identifier>a</identifier>' +
      '</children>' +
      '</fenced>');
  // Parallel bar fences.
  this.executeTreeTest(
      '<mrow><mo>|</mo><mi>a</mi><mo>|</mo><mi>b</mi><mo>+</mo>' +
      '<mo>\u00A6</mo><mi>c</mi><mo>\u00A6</mo></mrow>',
      '<infixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<infixop>\u2062' +
      '<content>' +
      '<operator>\u2062</operator>' +
      '</content>' +
      '<children>' +
      '<fenced>' +
      '<content>' +
      '<fence>|</fence>' +
      '<fence>|</fence>' +
      '</content>' +
      '<children>' +
      '<identifier>a</identifier>' +
      '</children>' +
      '</fenced>' +
      '<identifier>b</identifier>' +
      '</children>' +
      '</infixop>' +
      '<fenced>' +
      '<content>' +
      '<fence>\u00A6</fence>' +
      '<fence>\u00A6</fence>' +
      '</content>' +
      '<children>' +
      '<identifier>c</identifier>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</infixop>');
  // Nested bar fences.
  this.executeTreeTest(
      '<mrow><mo>\u00A6</mo><mo>|</mo><mi>a</mi><mo>|</mo><mi>b</mi>' +
      '<mo>+</mo><mi>c</mi><mo>\u00A6</mo></mrow>',
      '<fenced>' +
      '<content>' +
      '<fence>\u00A6</fence>' +
      '<fence>\u00A6</fence>' +
      '</content>' +
      '<children>' +
      '<infixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<infixop>\u2062' +
      '<content>' +
      '<operator>\u2062</operator>' +
      '</content>' +
      '<children>' +
      '<fenced>' +
      '<content>' +
      '<fence>|</fence>' +
      '<fence>|</fence>' +
      '</content>' +
      '<children>' +
      '<identifier>a</identifier>' +
      '</children>' +
      '</fenced>' +
      '<identifier>b</identifier>' +
      '</children>' +
      '</infixop>' +
      '<identifier>c</identifier>' +
      '</children>' +
      '</infixop>' +
      '</children>' +
      '</fenced>');
};


/**
 * Mixed neutral and regular fences.
 */
sre.SemanticTreeTest.prototype.testStreeMixedFences = function() {
  this.brief = true;
  // Empty parenthsis inside bars.
  this.executeTreeTest(
      '<mrow><mo>|</mo><mo>(</mo><mo>)</mo><mo>|</mo></mrow>',
      '<fenced>' +
      '<content>' +
      '<fence>|</fence>' +
      '<fence>|</fence>' +
      '</content>' +
      '<children>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<empty/>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</fenced>');
  // Bars inside parentheses.
  this.executeTreeTest(
      '<mrow><mo>(</mo><mo>|</mo><mi>a</mi><mo>|</mo><mi>b</mi>' +
      '<mo>&#x00A6;</mo><mi>c</mi><mo>&#x00A6;</mo><mi>d</mi>' +
      '<mo>)</mo></mrow>',
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<infixop>\u2062' +
      '<content>' +
      '<operator>\u2062</operator>' +
      '</content>' +
      '<children>' +
      '<fenced>' +
      '<content>' +
      '<fence>|</fence>' +
      '<fence>|</fence>' +
      '</content>' +
      '<children>' +
      '<identifier>a</identifier>' +
      '</children>' +
      '</fenced>' +
      '<identifier>b</identifier>' +
      '<fenced>' +
      '<content>' +
      '<fence>\u00A6</fence>' +
      '<fence>\u00A6</fence>' +
      '</content>' +
      '<children>' +
      '<identifier>c</identifier>' +
      '</children>' +
      '</fenced>' +
      '<identifier>d</identifier>' +
      '</children>' +
      '</infixop>' +
      '</children>' +
      '</fenced>');
  // Parentheses inside bards.
  this.executeTreeTest(
      '<mrow><mo>|</mo><mo>(</mo><mi>a</mi><mo>+</mo><mi>b</mi><mo>)</mo>' +
      '<mo>&#x00A6;</mo><mi>c</mi><mo>&#x00A6;</mo><mi>d</mi><mo>|</mo></mrow>',
      '<fenced>' +
      '<content>' +
      '<fence>|</fence>' +
      '<fence>|</fence>' +
      '</content>' +
      '<children>' +
      '<infixop>\u2062' +
      '<content>' +
      '<operator>\u2062</operator>' +
      '</content>' +
      '<children>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<infixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<identifier>a</identifier>' +
      '<identifier>b</identifier>' +
      '</children>' +
      '</infixop>' +
      '</children>' +
      '</fenced>' +
      '<fenced>' +
      '<content>' +
      '<fence>\u00A6</fence>' +
      '<fence>\u00A6</fence>' +
      '</content>' +
      '<children>' +
      '<identifier>c</identifier>' +
      '</children>' +
      '</fenced>' +
      '<identifier>d</identifier>' +
      '</children>' +
      '</infixop>' +
      '</children>' +
      '</fenced>');
  // Parentheses inside bards.
  this.executeTreeTest(
      '<mrow><mo>[</mo><mo>|</mo><mi>a</mi><mo>+</mo><mi>b</mi><mo>|</mo>' +
      '<mo>+</mo><mi>c</mi><mo>]</mo><mo>+</mo><mo>\u00A6</mo><mi>d</mi>' +
      '<mo>+</mo><mo>(</mo><mi>e</mi><mo>+</mo><mi>f</mi><mo>)</mo>' +
      '<mo>\u00A6</mo></mrow>',
      '<infixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<fenced>' +
      '<content>' +
      '<fence>[</fence>' +
      '<fence>]</fence>' +
      '</content>' +
      '<children>' +
      '<infixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<fenced>' +
      '<content>' +
      '<fence>|</fence>' +
      '<fence>|</fence>' +
      '</content>' +
      '<children>' +
      '<infixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<identifier>a</identifier>' +
      '<identifier>b</identifier>' +
      '</children>' +
      '</infixop>' +
      '</children>' +
      '</fenced>' +
      '<identifier>c</identifier>' +
      '</children>' +
      '</infixop>' +
      '</children>' +
      '</fenced>' +
      '<fenced>' +
      '<content>' +
      '<fence>\u00A6</fence>' +
      '<fence>\u00A6</fence>' +
      '</content>' +
      '<children>' +
      '<infixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<identifier>d</identifier>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<infixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<identifier>e</identifier>' +
      '<identifier>f</identifier>' +
      '</children>' +
      '</infixop>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</infixop>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</infixop>');
};


/**
 * Mixed with isolated bars.
 */
sre.SemanticTreeTest.prototype.testStreeMixedFencesWithBars = function() {
  this.brief = true;
  this.xpathBlacklist = ['descendant::punctuated/content'];
  // Set notation.
  this.executeTreeTest(
      '<mrow><mo>{</mo><mo>(</mo><mi>x</mi><mo>,</mo><mi>y</mi><mo>,</mo>' +
      '<mi>z</mi><mo>)</mo><mo>|</mo><mi>x</mi><mi>y</mi><mo>=</mo>' +
      '<mo>z</mo><mo>}</mo></mrow>',
      '<fenced>' +
      '<content>' +
      '<fence>{</fence>' +
      '<fence>}</fence>' +
      '</content>' +
      '<children>' +
      '<punctuated>' +
      '<children>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<punctuated>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '<punctuation>,</punctuation>' +
      '<identifier>y</identifier>' +
      '<punctuation>,</punctuation>' +
      '<identifier>z</identifier>' +
      '</children>' +
      '</punctuated>' +
      '</children>' +
      '</fenced>' +
      '<punctuation>|</punctuation>' +
      '<relseq>=' +
      '<content>' +
      '<relation>=</relation>' +
      '</content>' +
      '<children>' +
      '<infixop>\u2062' +
      '<content>' +
      '<operator>\u2062</operator>' +
      '</content>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '<identifier>y</identifier>' +
      '</children>' +
      '</infixop>' +
      '<identifier>z</identifier>' +
      '</children>' +
      '</relseq>' +
      '</children>' +
      '</punctuated>' +
      '</children>' +
      '</fenced>');
  // Disjunction of bracketed parallel statements.
  this.executeTreeTest(
      '<mrow><mo>[</mo><mi>a</mi><mo>&#x2016;</mo><mi>b</mi><mo>]</mo>' +
      '<mo>|</mo><mo>[</mo><mi>x</mi><mo>&#x2016;</mo><mi>y</mi><mo>]</mo>' +
      '</mrow>',
      '<punctuated>' +
      '<children>' +
      '<fenced>' +
      '<content>' +
      '<fence>[</fence>' +
      '<fence>]</fence>' +
      '</content>' +
      '<children>' +
      '<punctuated>' +
      '<children>' +
      '<identifier>a</identifier>' +
      '<punctuation>\u2016</punctuation>' +
      '<identifier>b</identifier>' +
      '</children>' +
      '</punctuated>' +
      '</children>' +
      '</fenced>' +
      '<punctuation>|</punctuation>' +
      '<fenced>' +
      '<content>' +
      '<fence>[</fence>' +
      '<fence>]</fence>' +
      '</content>' +
      '<children>' +
      '<punctuated>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '<punctuation>\u2016</punctuation>' +
      '<identifier>y</identifier>' +
      '</children>' +
      '</punctuated>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</punctuated>'
  );
  // Metric over the above.
  this.executeTreeTest(
      '<mrow><mo>&#x2016;</mo><mo>[</mo><mi>a</mi><mo>&#x2016;</mo>' +
      '<mi>b</mi><mo>]</mo><mo>|</mo><mo>[</mo><mi>x</mi><mo>&#x2016;</mo>' +
      '<mi>y</mi><mo>]</mo><mo>&#x2016;</mo></mrow>',
      '<fenced>' +
      '<content>' +
      '<fence>\u2016</fence>' +
      '<fence>\u2016</fence>' +
      '</content>' +
      '<children>' +
      '<punctuated>' +
      '<children>' +
      '<fenced>' +
      '<content>' +
      '<fence>[</fence>' +
      '<fence>]</fence>' +
      '</content>' +
      '<children>' +
      '<punctuated>' +
      '<children>' +
      '<identifier>a</identifier>' +
      '<punctuation>\u2016</punctuation>' +
      '<identifier>b</identifier>' +
      '</children>' +
      '</punctuated>' +
      '</children>' +
      '</fenced>' +
      '<punctuation>|</punctuation>' +
      '<fenced>' +
      '<content>' +
      '<fence>[</fence>' +
      '<fence>]</fence>' +
      '</content>' +
      '<children>' +
      '<punctuated>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '<punctuation>\u2016</punctuation>' +
      '<identifier>y</identifier>' +
      '</children>' +
      '</punctuated>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</punctuated>' +
      '</children>' +
      '</fenced>');
  // Mix of metrics and bracketed expression and single bars.
  this.executeTreeTest(
      '<mrow><mo>&#x2016;</mo><mo>[</mo><mi>a</mi><mo>&#x2016;</mo><mi>b</mi>' +
      '<mo>]</mo><mo>|</mo><mo>[</mo><mi>c</mi><mo>&#x2016;</mo>' +
      '<mo>&#x00A6;</mo><mi>d</mi><mo>]</mo><mo>&#x2016;</mo><mo>[</mo>' +
      '<mi>u</mi><mo>&#x2016;</mo><mi>v</mi><mo>]</mo><mo>|</mo><mi>x</mi>' +
      '<mo>&#x2016;</mo><mi>y</mi><mo>&#x00A6;</mo><mi>z</mi></mrow>',
      '<punctuated>' +
      '<children>' +
      '<infixop>\u2062' +
      '<content>' +
      '<operator>\u2062</operator>' +
      '</content>' +
      '<children>' +
      '<fenced>' +
      '<content>' +
      '<fence>\u2016</fence>' +
      '<fence>\u2016</fence>' +
      '</content>' +
      '<children>' +
      '<punctuated>' +
      '<children>' +
      '<fenced>' +
      '<content>' +
      '<fence>[</fence>' +
      '<fence>]</fence>' +
      '</content>' +
      '<children>' +
      '<punctuated>' +
      '<children>' +
      '<identifier>a</identifier>' +
      '<punctuation>\u2016</punctuation>' +
      '<identifier>b</identifier>' +
      '</children>' +
      '</punctuated>' +
      '</children>' +
      '</fenced>' +
      '<punctuation>|</punctuation>' +
      '<fenced>' +
      '<content>' +
      '<fence>[</fence>' +
      '<fence>]</fence>' +
      '</content>' +
      '<children>' +
      '<punctuated>' +
      '<children>' +
      '<identifier>c</identifier>' +
      '<punctuation>\u2016</punctuation>' +
      '<punctuation>\u00A6</punctuation>' +
      '<identifier>d</identifier>' +
      '</children>' +
      '</punctuated>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</punctuated>' +
      '</children>' +
      '</fenced>' +
      '<fenced>' +
      '<content>' +
      '<fence>[</fence>' +
      '<fence>]</fence>' +
      '</content>' +
      '<children>' +
      '<punctuated>' +
      '<children>' +
      '<identifier>u</identifier>' +
      '<punctuation>\u2016</punctuation>' +
      '<identifier>v</identifier>' +
      '</children>' +
      '</punctuated>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</infixop>' +
      '<punctuation>|</punctuation>' +
      '<identifier>x</identifier>' +
      '<punctuation>\u2016</punctuation>' +
      '<identifier>y</identifier>' +
      '<punctuation>\u00A6</punctuation>' +
      '<identifier>z</identifier>' +
      '</children>' +
      '</punctuated>');
  this.xpathBlacklist = [];
};


/**
 * Pathological cases with only opening fences.
 */
sre.SemanticTreeTest.prototype.testStreeOpeningFencesOnly = function() {
  this.brief = true;
  this.xpathBlacklist = ['descendant::punctuated/content'];
  // Single.
  this.executeTreeTest(
      '<mrow><mo>[</mo></mrow>',
      '<fence>[</fence>');
  // Single right.
  this.executeTreeTest(
      '<mrow><mi>a</mi><mo>[</mo></mrow>',
      '<punctuated>' +
      '<children>' +
      '<identifier>a</identifier>' +
      '<punctuation>[</punctuation>' +
      '</children>' +
      '</punctuated>');
  // Single middle.
  this.executeTreeTest(
      '<mrow><mi>a</mi><mo>[</mo><mi>b</mi></mrow>',
      '<punctuated>' +
      '<children>' +
      '<identifier>a</identifier>' +
      '<punctuation>[</punctuation>' +
      '<identifier>b</identifier>' +
      '</children>' +
      '</punctuated>');
  // Single left.
  this.executeTreeTest(
      '<mrow><mo>[</mo><mi>b</mi></mrow>',
      '<punctuated>' +
      '<children>' +
      '<punctuation>[</punctuation>' +
      '<identifier>b</identifier>' +
      '</children>' +
      '</punctuated>');
  // Multiple.
  this.executeTreeTest(
      '<mrow><mi>a</mi><mo>[</mo><mi>b</mi><mi>c</mi><mo>(</mo><mi>d</mi>' +
      '<mo>{</mo><mi>e</mi><mo>&#x3008;</mo><mi>f</mi></mrow>',
      '<punctuated>' +
      '<children>' +
      '<identifier>a</identifier>' +
      '<punctuation>[</punctuation>' +
      '<infixop>\u2062' +
      '<content>' +
      '<operator>\u2062</operator>' +
      '</content>' +
      '<children>' +
      '<identifier>b</identifier>' +
      '<identifier>c</identifier>' +
      '</children>' +
      '</infixop>' +
      '<punctuation>(</punctuation>' +
      '<identifier>d</identifier>' +
      '<punctuation>{</punctuation>' +
      '<identifier>e</identifier>' +
      '<punctuation>\u3008</punctuation>' +
      '<identifier>f</identifier>' +
      '</children>' +
      '</punctuated>');
  // Multiple plus inner fenced.
  this.executeTreeTest(
      '<mrow><mi>a</mi><mo>[</mo><mi>b</mi><mo>[</mo><mo>(</mo><mo>(</mo>' +
      '<mi>c</mi><mo>)</mo><mi>d</mi><mo>{</mo><mi>e</mi><mo>&#x3008;</mo>' +
      '<mi>f</mi></mrow>',
      '<punctuated>' +
      '<children>' +
      '<identifier>a</identifier>' +
      '<punctuation>[</punctuation>' +
      '<identifier>b</identifier>' +
      '<punctuation>[</punctuation>' +
      '<punctuation>(</punctuation>' +
      '<infixop>\u2062' +
      '<content>' +
      '<operator>\u2062</operator>' +
      '</content>' +
      '<children>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<identifier>c</identifier>' +
      '</children>' +
      '</fenced>' +
      '<identifier>d</identifier>' +
      '</children>' +
      '</infixop>' +
      '<punctuation>{</punctuation>' +
      '<identifier>e</identifier>' +
      '<punctuation>\u3008</punctuation>' +
      '<identifier>f</identifier>' +
      '</children>' +
      '</punctuated>');
  this.xpathBlacklist = [];
};


/**
 * Pathological cases with only closing fences.
 */
sre.SemanticTreeTest.prototype.testStreeClosingFencesOnly = function() {
  this.brief = true;
  this.xpathBlacklist = ['descendant::punctuated/content'];
  // Single.
  this.executeTreeTest(
      '<mrow><mo>]</mo></mrow>',
      '<fence>]</fence>');
  // Single right.
  this.executeTreeTest(
      '<mrow><mi>a</mi><mo>]</mo></mrow>',
      '<punctuated>' +
      '<children>' +
      '<identifier>a</identifier>' +
      '<punctuation>]</punctuation>' +
      '</children>' +
      '</punctuated>');
  // Single middle.
  this.executeTreeTest(
      '<mrow><mi>a</mi><mo>]</mo><mi>b</mi></mrow>',
      '<punctuated>' +
      '<children>' +
      '<identifier>a</identifier>' +
      '<punctuation>]</punctuation>' +
      '<identifier>b</identifier>' +
      '</children>' +
      '</punctuated>');
  // Single left.
  this.executeTreeTest(
      '<mrow><mo>]</mo><mi>b</mi></mrow>',
      '<punctuated>' +
      '<children>' +
      '<punctuation>]</punctuation>' +
      '<identifier>b</identifier>' +
      '</children>' +
      '</punctuated>');
  // Multiple.
  this.executeTreeTest(
      '<mrow><mi>a</mi><mo>]</mo><mi>b</mi><mi>c</mi><mo>)</mo><mi>d</mi>' +
      '<mo>}</mo><mi>e</mi><mo>&#x3009;</mo><mi>f</mi></mrow>',
      '<punctuated>' +
      '<children>' +
      '<identifier>a</identifier>' +
      '<punctuation>]</punctuation>' +
      '<infixop>\u2062' +
      '<content>' +
      '<operator>\u2062</operator>' +
      '</content>' +
      '<children>' +
      '<identifier>b</identifier>' +
      '<identifier>c</identifier>' +
      '</children>' +
      '</infixop>' +
      '<punctuation>)</punctuation>' +
      '<identifier>d</identifier>' +
      '<punctuation>}</punctuation>' +
      '<identifier>e</identifier>' +
      '<punctuation>\u3009</punctuation>' +
      '<identifier>f</identifier>' +
      '</children>' +
      '</punctuated>');
  // Multiple plus inner fenced.
  this.executeTreeTest(
      '<mrow><mi>a</mi><mo>]</mo><mi>b</mi><mo>]</mo><mo>(</mo><mi>c</mi>' +
      '<mo>)</mo><mo>)</mo><mi>d</mi><mo>}</mo><mi>e</mi><mo>&#x3009;</mo>' +
      '<mi>f</mi></mrow>',
      '<punctuated>' +
      '<children>' +
      '<identifier>a</identifier>' +
      '<punctuation>]</punctuation>' +
      '<identifier>b</identifier>' +
      '<punctuation>]</punctuation>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<identifier>c</identifier>' +
      '</children>' +
      '</fenced>' +
      '<punctuation>)</punctuation>' +
      '<identifier>d</identifier>' +
      '<punctuation>}</punctuation>' +
      '<identifier>e</identifier>' +
      '<punctuation>\u3009</punctuation>' +
      '<identifier>f</identifier>' +
      '</children>' +
      '</punctuated>');
  this.xpathBlacklist = [];
};


/**
 * Pathological cases with only neutral fences.
 */
sre.SemanticTreeTest.prototype.testStreeNeutralFencesOnly = function() {
  this.brief = true;
  this.xpathBlacklist = ['descendant::punctuated/content'];
  // Single.
  this.executeTreeTest(
      '<mrow><mo>|</mo></mrow>',
      '<fence>|</fence>');
  // Single right.
  this.executeTreeTest(
      '<mrow><mi>a</mi><mo>|</mo></mrow>',
      '<punctuated>' +
      '<children>' +
      '<identifier>a</identifier>' +
      '<punctuation>|</punctuation>' +
      '</children>' +
      '</punctuated>');
  // Single middle.
  this.executeTreeTest(
      '<mrow><mi>a</mi><mo>|</mo><mi>b</mi></mrow>',
      '<punctuated>' +
      '<children>' +
      '<identifier>a</identifier>' +
      '<punctuation>|</punctuation>' +
      '<identifier>b</identifier>' +
      '</children>' +
      '</punctuated>');
  // Single left.
  this.executeTreeTest(
      '<mrow><mo>|</mo><mi>b</mi></mrow>',
      '<punctuated>' +
      '<children>' +
      '<punctuation>|</punctuation>' +
      '<identifier>b</identifier>' +
      '</children>' +
      '</punctuated>');
  // Two different bars.
  this.executeTreeTest(
      '<mrow><mi>a</mi><mo>|</mo><mi>b</mi><mo>&#x00A6;</mo><mi>c</mi></mrow>',
      '<punctuated>' +
      '<children>' +
      '<identifier>a</identifier>' +
      '<punctuation>|</punctuation>' +
      '<identifier>b</identifier>' +
      '<punctuation>\u00A6</punctuation>' +
      '<identifier>c</identifier>' +
      '</children>' +
      '</punctuated>');
  // Three different bars.
  this.executeTreeTest(
      '<mrow><mi>a</mi><mo>&#x2016;</mo><mi>b</mi><mo>|</mo><mi>c</mi>' +
      '<mo>&#x00A6;</mo><mi>d</mi></mrow>',
      '<punctuated>' +
      '<children>' +
      '<identifier>a</identifier>' +
      '<punctuation>\u2016</punctuation>' +
      '<identifier>b</identifier>' +
      '<punctuation>|</punctuation>' +
      '<identifier>c</identifier>' +
      '<punctuation>\u00A6</punctuation>' +
      '<identifier>d</identifier>' +
      '</children>' +
      '</punctuated>');
  // Multiple plus inner fenced.
  this.executeTreeTest(
      '<mrow><mo>&#x2016;</mo><mo>[</mo><mi>a</mi><mo>&#x2016;</mo><mi>b</mi>' +
      '<mo>]</mo><mo>&#x2016;</mo><mo>|</mo><mi>x</mi><mo>&#x2016;</mo>' +
      '<mi>y</mi><mo>&#x00A6;</mo><mi>z</mi></mrow>',
      '<punctuated>' +
      '<children>' +
      '<fenced>' +
      '<content>' +
      '<fence>\u2016</fence>' +
      '<fence>\u2016</fence>' +
      '</content>' +
      '<children>' +
      '<fenced>' +
      '<content>' +
      '<fence>[</fence>' +
      '<fence>]</fence>' +
      '</content>' +
      '<children>' +
      '<punctuated>' +
      '<children>' +
      '<identifier>a</identifier>' +
      '<punctuation>\u2016</punctuation>' +
      '<identifier>b</identifier>' +
      '</children>' +
      '</punctuated>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</fenced>' +
      '<punctuation>|</punctuation>' +
      '<identifier>x</identifier>' +
      '<punctuation>\u2016</punctuation>' +
      '<identifier>y</identifier>' +
      '<punctuation>\u00A6</punctuation>' +
      '<identifier>z</identifier>' +
      '</children>' +
      '</punctuated>');
  this.xpathBlacklist = [];
};


/**
 * Pathological cases with mixed fences.
 */
sre.SemanticTreeTest.prototype.testStreeMixedUnmatchedFences = function() {
  this.brief = true;
  this.xpathBlacklist = ['descendant::punctuated/content'];
  // Close, neutral, open.
  this.executeTreeTest(
      '<mrow><mo>]</mo><mo>&#x2016;</mo><mi>b</mi><mo>|</mo><mi>c</mi>' +
      '<mo>(</mo></mrow>',
      '<punctuated>' +
      '<children>' +
      '<punctuation>]</punctuation>' +
      '<punctuation>\u2016</punctuation>' +
      '<identifier>b</identifier>' +
      '<punctuation>|</punctuation>' +
      '<identifier>c</identifier>' +
      '<punctuation>(</punctuation>' +
      '</children>' +
      '</punctuated>');
  // Neutrals and close.
  this.executeTreeTest(
      '<mrow><mi>a</mi><mo>&#x2016;</mo><mi>b</mi><mo>|</mo><mi>c</mi>' +
      '<mo>&#x00A6;</mo><mi>d</mi><mo>]</mo><mi>e</mi></mrow>',
      '<punctuated>' +
      '<children>' +
      '<identifier>a</identifier>' +
      '<punctuation>\u2016</punctuation>' +
      '<identifier>b</identifier>' +
      '<punctuation>|</punctuation>' +
      '<identifier>c</identifier>' +
      '<punctuation>\u00A6</punctuation>' +
      '<identifier>d</identifier>' +
      '<punctuation>]</punctuation>' +
      '<identifier>e</identifier>' +
      '</children>' +
      '</punctuated>');
  // Neutrals and open.
  this.executeTreeTest(
      '<mrow><mo>[</mo><mi>a</mi><mo>&#x2016;</mo><mi>b</mi><mo>|</mo>' +
      '<mi>c</mi><mo>&#x00A6;</mo><mi>d</mi></mrow>',
      '<punctuated>' +
      '<children>' +
      '<punctuation>[</punctuation>' +
      '<identifier>a</identifier>' +
      '<punctuation>\u2016</punctuation>' +
      '<identifier>b</identifier>' +
      '<punctuation>|</punctuation>' +
      '<identifier>c</identifier>' +
      '<punctuation>\u00A6</punctuation>' +
      '<identifier>d</identifier>' +
      '</children>' +
      '</punctuated>');
  // Multiple fences, fenced and operations
  this.executeTreeTest(
      '<mrow><mo>&#x2016;</mo><mo>[</mo><mi>a</mi><mo>&#x2016;</mo><mi>b</mi>' +
      '<mo>]</mo><mo>|</mo><mo>[</mo><mi>c</mi><mo>&#x2016;</mo>' +
      '<mo>&#x00A6;</mo><mi>d</mi><mo>]</mo><mo>&#x2016;</mo><mo>|</mo>' +
      '<mi>x</mi><mo>&#x2016;</mo><mi>y</mi><mo>&#x00A6;</mo><mi>z</mi>' +
      '<mo>]</mo></mrow>',
      '<punctuated>' +
      '<children>' +
      '<fenced>' +
      '<content>' +
      '<fence>\u2016</fence>' +
      '<fence>\u2016</fence>' +
      '</content>' +
      '<children>' +
      '<punctuated>' +
      '<children>' +
      '<fenced>' +
      '<content>' +
      '<fence>[</fence>' +
      '<fence>]</fence>' +
      '</content>' +
      '<children>' +
      '<punctuated>' +
      '<children>' +
      '<identifier>a</identifier>' +
      '<punctuation>\u2016</punctuation>' +
      '<identifier>b</identifier>' +
      '</children>' +
      '</punctuated>' +
      '</children>' +
      '</fenced>' +
      '<punctuation>|</punctuation>' +
      '<fenced>' +
      '<content>' +
      '<fence>[</fence>' +
      '<fence>]</fence>' +
      '</content>' +
      '<children>' +
      '<punctuated>' +
      '<children>' +
      '<identifier>c</identifier>' +
      '<punctuation>\u2016</punctuation>' +
      '<punctuation>\u00A6</punctuation>' +
      '<identifier>d</identifier>' +
      '</children>' +
      '</punctuated>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</punctuated>' +
      '</children>' +
      '</fenced>' +
      '<punctuation>|</punctuation>' +
      '<identifier>x</identifier>' +
      '<punctuation>\u2016</punctuation>' +
      '<identifier>y</identifier>' +
      '<punctuation>\u00A6</punctuation>' +
      '<identifier>z</identifier>' +
      '<punctuation>]</punctuation>' +
      '</children>' +
      '</punctuated>');
  // Multiple fences, fenced and operations
  this.executeTreeTest(
      '<mrow><mo>&#x2016;</mo><mo>]</mo><mo>&#x00A6;</mo><mo>&#x2016;</mo>' +
      '<mo>[</mo><mo>|</mo><mo>[</mo><mi>a</mi><mo>&#x2016;</mo><mi>b</mi>' +
      '<mo>]</mo><mo>&#x2016;</mo><mo>|</mo><mi>[</mi><mo>&#x2016;</mo>' +
      '<mi>y</mi><mo>&#x00A6;</mo><mi>z</mi></mrow>',
      '<punctuated>' +
      '<children>' +
      '<fenced>' +
      '<content>' +
      '<fence>\u2016</fence>' +
      '<fence>\u2016</fence>' +
      '</content>' +
      '<children>' +
      '<punctuated>' +
      '<children>' +
      '<punctuation>]</punctuation>' +
      '<punctuation>\u00A6</punctuation>' +
      '</children>' +
      '</punctuated>' +
      '</children>' +
      '</fenced>' +
      '<punctuation>[</punctuation>' +
      '<fenced>' +
      '<content>' +
      '<fence>|</fence>' +
      '<fence>|</fence>' +
      '</content>' +
      '<children>' +
      '<punctuated>' +
      '<children>' +
      '<fenced>' +
      '<content>' +
      '<fence>[</fence>' +
      '<fence>]</fence>' +
      '</content>' +
      '<children>' +
      '<punctuated>' +
      '<children>' +
      '<identifier>a</identifier>' +
      '<punctuation>\u2016</punctuation>' +
      '<identifier>b</identifier>' +
      '</children>' +
      '</punctuated>' +
      '</children>' +
      '</fenced>' +
      '<punctuation>\u2016</punctuation>' +
      '</children>' +
      '</punctuated>' +
      '</children>' +
      '</fenced>' +
      '<punctuation>[</punctuation>' +
      '<punctuation>\u2016</punctuation>' +
      '<identifier>y</identifier>' +
      '<punctuation>\u00A6</punctuation>' +
      '<identifier>z</identifier>' +
      '</children>' +
      '</punctuated>');
  // Multiple fences, fenced and operations
  this.executeTreeTest(
      '<mrow><mo>&#x2016;</mo><mo>[</mo><mi>a</mi><mo>&#x00A6;</mo>' +
      '<mo>&#x2016;</mo><mo>[</mo><mo>+</mo><mo>[</mo><mi>b</mi>' +
      '<mo>&#x2016;</mo><mi>c</mi><mo>]</mo><mo>+</mo><mo>&#x2016;</mo>' +
      '<mo>|</mo><mi>d</mi><mo>+</mo><mi>e</mi><mi>[</mi><mo>&#x2016;</mo>' +
      '<mi>y</mi><mo>&#x00A6;</mo><mo>+</mo><mi>z</mi></mrow>',
      '<punctuated>' +
      '<children>' +
      '<punctuation>\u2016</punctuation>' +
      '<punctuation>[</punctuation>' +
      '<identifier>a</identifier>' +
      '<punctuation>\u00A6</punctuation>' +
      '<punctuation>\u2016</punctuation>' +
      '<punctuation>[</punctuation>' +
      '<postfixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<prefixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<fenced>' +
      '<content>' +
      '<fence>[</fence>' +
      '<fence>]</fence>' +
      '</content>' +
      '<children>' +
      '<punctuated>' +
      '<children>' +
      '<identifier>b</identifier>' +
      '<punctuation>\u2016</punctuation>' +
      '<identifier>c</identifier>' +
      '</children>' +
      '</punctuated>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</prefixop>' +
      '</children>' +
      '</postfixop>' +
      '<punctuation>\u2016</punctuation>' +
      '<punctuation>|</punctuation>' +
      '<infixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<identifier>d</identifier>' +
      '<identifier>e</identifier>' +
      '</children>' +
      '</infixop>' +
      '<punctuation>[</punctuation>' +
      '<punctuation>\u2016</punctuation>' +
      '<identifier>y</identifier>' +
      '<punctuation>\u00A6</punctuation>' +
      '<prefixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<identifier>z</identifier>' +
      '</children>' +
      '</prefixop>' +
      '</children>' +
      '</punctuated>');
  this.xpathBlacklist = [];
};


/**
 * Simple function applications
 */
sre.SemanticTreeTest.prototype.testStreeSimpleFuncsSingle = function() {
  this.brief = true;
  this.executeTreeTest(
      '<mrow><mi>f</mi></mrow>',
      '<identifier>f</identifier>');

  this.executeTreeTest(
      '<mrow><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo></mrow>',
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<identifier>f</identifier>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>');

  this.executeTreeTest(
      '<mrow><mi>f</mi><mo>(</mo><mi>x</mi><mi>y</mi><mo>)</mo></mrow>',
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<identifier>f</identifier>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<infixop>\u2062' +
      '<content>' +
      '<operator>\u2062</operator>' +
      '</content>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '<identifier>y</identifier>' +
      '</children>' +
      '</infixop>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>');

  this.executeTreeTest(
      '<mrow><mi>f</mi><mo>(</mo><mi>x</mi><mo>,</mo><mi>y</mi>' +
      '<mo>,</mo><mi>z</mi><mo>)</mo></mrow>',
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<identifier>f</identifier>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<punctuated>' +
      '<content>' +
      '<punctuation>,</punctuation>' +
      '<punctuation>,</punctuation>' +
      '</content>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '<punctuation>,</punctuation>' +
      '<identifier>y</identifier>' +
      '<punctuation>,</punctuation>' +
      '<identifier>z</identifier>' +
      '</children>' +
      '</punctuated>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>');

  this.executeTreeTest(
      '<mrow><mi>f</mi><mo>(</mo><msup><mi>x</mi><mn>2</mn></msup>' +
      '<mo>)</mo></mrow>',
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<identifier>f</identifier>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<superscript>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '<number>2</number>' +
      '</children>' +
      '</superscript>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>');

  this.executeTreeTest(
      '<mrow><mi>f</mi><mo>(</mo><msub><mi>x</mi><mn>2</mn></msub>' +
      '<mo>)</mo></mrow>',
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<identifier>f</identifier>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<subscript>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '<number>2</number>' +
      '</children>' +
      '</subscript>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>');

  this.executeTreeTest(
      '<mrow><mi>f</mi><mo>(</mo><msubsup><mi>x</mi><mn>2</mn>' +
      '<mn>1</mn></msubsup><mo>)</mo></mrow>',
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<identifier>f</identifier>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<superscript>' +
      '<children>' +
      '<subscript>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '<number>2</number>' +
      '</children>' +
      '</subscript>' +
      '<number>1</number>' +
      '</children>' +
      '</superscript>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>');

  this.executeTreeTest(
      '<mrow><mi>f</mi><mo>(</mo><mover><mi>x</mi><mn>2</mn></mover>' +
      '<mo>)</mo></mrow>',
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<identifier>f</identifier>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<overscore>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '<number>2</number>' +
      '</children>' +
      '</overscore>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>');

  this.executeTreeTest(
      '<mrow><mi>f</mi><mo>(</mo><munder><mi>x</mi><mn>2</mn></munder>' +
      '<mo>)</mo></mrow>',
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<identifier>f</identifier>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<underscore>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '<number>2</number>' +
      '</children>' +
      '</underscore>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>');

  this.executeTreeTest(
      '<mrow><mi>f</mi><mo>(</mo><munderover><mi>x</mi><mn>2</mn>' +
      '<mn>1</mn></munderover><mo>)</mo></mrow>',
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<identifier>f</identifier>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<overscore>' +
      '<children>' +
      '<underscore>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '<number>2</number>' +
      '</children>' +
      '</underscore>' +
      '<number>1</number>' +
      '</children>' +
      '</overscore>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>');

  this.executeTreeTest(
      '<mrow><mi>f</mi><mo>(</mo><mfrac><mn>1</mn><mn>2</mn></mfrac>' +
      '<mo>)</mo></mrow>',
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<identifier>f</identifier>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<fraction>' +
      '<children>' +
      '<number>1</number>' +
      '<number>2</number>' +
      '</children>' +
      '</fraction>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>');

  this.executeTreeTest(
      '<mrow><mi>f</mi><mo>(</mo><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '<mo>)</mo></mrow>',
      '<infixop>\u2062' +
      '<content>' +
      '<operator>\u2062</operator>' +
      '</content>' +
      '<children>' +
      '<identifier>f</identifier>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<infixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '<identifier>y</identifier>' +
      '</children>' +
      '</infixop>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</infixop>');
};


/**
 * Simple functions with surrounding operators.
 */
sre.SemanticTreeTest.prototype.testStreeSimpleFuncsWithOps = function() {
  this.brief = true;
  this.executeTreeTest(
      '<mrow><mn>1</mn><mo>+</mo><mi>f</mi><mo>(</mo><mi>x</mi>' +
      '<mo>)</mo></mrow>',
      '<infixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<number>1</number>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<identifier>f</identifier>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>' +
      '</children>' +
      '</infixop>');

  this.executeTreeTest(
      '<mrow><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>+</mo>' +
      '<mn>2</mn></mrow>',
      '<infixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<identifier>f</identifier>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>' +
      '<number>2</number>' +
      '</children>' +
      '</infixop>');

  this.executeTreeTest(
      '<mrow><mn>1</mn><mo>+</mo><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '<mo>+</mo><mn>2</mn></mrow>',
      '<infixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<number>1</number>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<identifier>f</identifier>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>' +
      '<number>2</number>' +
      '</children>' +
      '</infixop>');

  this.executeTreeTest(
      '<mrow><mo>a</mo><mo>+</mo><mi>f</mi><mo>(</mo><mi>x</mi>' +
      '<mo>)</mo></mrow>',
      '<infixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<identifier>a</identifier>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<identifier>f</identifier>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>' +
      '</children>' +
      '</infixop>');

  this.executeTreeTest(
      '<mrow><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>+</mo>' +
      '<mo>b</mo></mrow>',
      '<infixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<identifier>f</identifier>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>' +
      '<identifier>b</identifier>' +
      '</children>' +
      '</infixop>');

  this.executeTreeTest(
      '<mrow><mo>a</mo><mo>+</mo><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '<mo>+</mo><mo>b</mo></mrow>',
      '<infixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<identifier>a</identifier>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<identifier>f</identifier>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>' +
      '<identifier>b</identifier>' +
      '</children>' +
      '</infixop>');

  this.executeTreeTest(
      '<mrow><mo>a</mo><mo>=</mo><mi>f</mi><mo>(</mo><mi>x</mi>' +
      '<mo>)</mo></mrow>',
      '<relseq>=' +
      '<content>' +
      '<relation>=</relation>' +
      '</content>' +
      '<children>' +
      '<identifier>a</identifier>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<identifier>f</identifier>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>' +
      '</children>' +
      '</relseq>');

  this.executeTreeTest(
      '<mrow><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>=</mo>' +
      '<mo>b</mo></mrow>',
      '<relseq>=' +
      '<content>' +
      '<relation>=</relation>' +
      '</content>' +
      '<children>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<identifier>f</identifier>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>' +
      '<identifier>b</identifier>' +
      '</children>' +
      '</relseq>');

  this.executeTreeTest(
      '<mrow><mo>a</mo><mo>=</mo><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '<mo>=</mo><mo>b</mo></mrow>',
      '<relseq>=' +
      '<content>' +
      '<relation>=</relation>' +
      '<relation>=</relation>' +
      '</content>' +
      '<children>' +
      '<identifier>a</identifier>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<identifier>f</identifier>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>' +
      '<identifier>b</identifier>' +
      '</children>' +
      '</relseq>');
};


/**
 * Multiple simple functions.
 */
sre.SemanticTreeTest.prototype.testStreeSimpleFuncsMulti = function() {
  this.brief = true;
  this.executeTreeTest(
      '<mrow><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>+</mo><mi>g</mi>' +
      '<mo>(</mo><mi>x</mi><mo>)</mo></mrow>',
      '<infixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<identifier>f</identifier>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<identifier>g</identifier>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>' +
      '</children>' +
      '</infixop>');

  this.executeTreeTest(
      '<mrow><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>+</mo><mi>g</mi>' +
      '<mo>(</mo><mi>x</mi><mo>)</mo><mo>=</mo><mi>h</mi><mo>(</mo>' +
      '<mi>x</mi><mo>)</mo></mrow>',
      '<relseq>=' +
      '<content>' +
      '<relation>=</relation>' +
      '</content>' +
      '<children>' +
      '<infixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<identifier>f</identifier>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<identifier>g</identifier>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>' +
      '</children>' +
      '</infixop>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<identifier>h</identifier>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>' +
      '</children>' +
      '</relseq>');

  this.executeTreeTest(
      '<mrow><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>+</mo><mi>g</mi>' +
      '<mo>(</mo><mi>y</mi><mo>)</mo><mo>=</mo><mi>h</mi><mo>(</mo>' +
      '<mi>x</mi><mi>y</mi><mo>)</mo></mrow>',
      '<relseq>=' +
      '<content>' +
      '<relation>=</relation>' +
      '</content>' +
      '<children>' +
      '<infixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<identifier>f</identifier>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<identifier>g</identifier>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<identifier>y</identifier>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>' +
      '</children>' +
      '</infixop>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<identifier>h</identifier>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<infixop>\u2062' +
      '<content>' +
      '<operator>\u2062</operator>' +
      '</content>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '<identifier>y</identifier>' +
      '</children>' +
      '</infixop>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>' +
      '</children>' +
      '</relseq>');
};


/**
 * Nested simple functions.
 */
sre.SemanticTreeTest.prototype.testStreeSimpleFuncsNested = function() {
  this.brief = true;
  this.executeTreeTest(
      '<mrow><mi>g</mi><mo>(</mo><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '<mo>)</mo></mrow>',
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<identifier>g</identifier>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<identifier>f</identifier>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>');

  this.executeTreeTest(
      '<mrow><mi>h</mi><mo>(</mo><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '<mi>g</mi><mo>(</mo><mi>y</mi><mo>)</mo><mo>)</mo></mrow>',
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<identifier>h</identifier>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<infixop>\u2062' +
      '<content>' +
      '<operator>\u2062</operator>' +
      '</content>' +
      '<children>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<identifier>f</identifier>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<identifier>g</identifier>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<identifier>y</identifier>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>' +
      '</children>' +
      '</infixop>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>');

  this.executeTreeTest(
      '<mrow><mi>h</mi><mo>(</mo><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '<mo>+</mo><mi>g</mi><mo>(</mo><mi>y</mi><mo>)</mo><mo>)</mo></mrow>',
      '<infixop>\u2062' +
      '<content>' +
      '<operator>\u2062</operator>' +
      '</content>' +
      '<children>' +
      '<identifier>h</identifier>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<infixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<identifier>f</identifier>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<identifier>g</identifier>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<identifier>y</identifier>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>' +
      '</children>' +
      '</infixop>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</infixop>');

  this.executeTreeTest(
      '<mi>P</mi><mo>[</mo><mi>x</mi><mo>=</mo><mn>2</mn><mo>]</mo>',
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<identifier>P</identifier>' +
      '<fenced>' +
      '<content>' +
      '<fence>[</fence>' +
      '<fence>]</fence>' +
      '</content>' +
      '<children>' +
      '<relseq>=' +
      '<content>' +
      '<relation>=</relation>' +
      '</content>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '<number>2</number>' +
      '</children>' +
      '</relseq>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>');
};


/**
 * Simple functions with explicit function application.
 */
sre.SemanticTreeTest.prototype.testStreeSimpleFuncsExplicitApp = function() {
  this.brief = true;
  this.executeTreeTest(
      '<mi>f</mi><mo>\u2061</mo><mo>(</mo><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '<mo>)</mo>',
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<identifier>f</identifier>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<infixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '<identifier>y</identifier>' +
      '</children>' +
      '</infixop>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>');

  this.executeTreeTest(
      '<mi>f</mi><mo>\u2061</mo><mo>(</mo><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '<mo>)</mo><mo>+</mo><mi>f</mi><mo>(</mo><mi>x</mi><mo>+</mo>' +
      '<mi>y</mi><mo>)</mo>',
      '<infixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<identifier>f</identifier>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<infixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '<identifier>y</identifier>' +
      '</children>' +
      '</infixop>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>' +
      '<infixop>\u2062' +
      '<content>' +
      '<operator>\u2062</operator>' +
      '</content>' +
      '<children>' +
      '<identifier>f</identifier>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<infixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '<identifier>y</identifier>' +
      '</children>' +
      '</infixop>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</infixop>' +
      '</children>' +
      '</infixop>');

  this.executeTreeTest(
      '<msub><mi>f</mi><mn>1</mn></msub><mo>\u2061</mo><mo>(</mo><mi>x</mi>' +
      '<mo>+</mo><mi>y</mi><mo>)</mo>',
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<subscript>' +
      '<children>' +
      '<identifier>f</identifier>' +
      '<number>1</number>' +
      '</children>' +
      '</subscript>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<infixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '<identifier>y</identifier>' +
      '</children>' +
      '</infixop>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>');

  this.executeTreeTest(
      '<msup><msub><mi>f</mi><mn>n</mn></msub><mn>2</mn></msup>' +
      '<mo>\u2061</mo><mo>(</mo><mi>x</mi><mo>+</mo><mi>y</mi><mo>)</mo>' +
      '<mo>+</mo><msup><msub><mi>f</mi><mn>m</mn></msub><mn>2</mn></msup>' +
      '<mo>(</mo><mi>x</mi><mo>+</mo><mi>y</mi><mo>)</mo>',
      '<infixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<superscript>' +
      '<children>' +
      '<subscript>' +
      '<children>' +
      '<identifier>f</identifier>' +
      '<identifier>n</identifier>' +
      '</children>' +
      '</subscript>' +
      '<number>2</number>' +
      '</children>' +
      '</superscript>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<infixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '<identifier>y</identifier>' +
      '</children>' +
      '</infixop>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>' +
      '<infixop>\u2062' +
      '<content>' +
      '<operator>\u2062</operator>' +
      '</content>' +
      '<children>' +
      '<superscript>' +
      '<children>' +
      '<subscript>' +
      '<children>' +
      '<identifier>f</identifier>' +
      '<identifier>m</identifier>' +
      '</children>' +
      '</subscript>' +
      '<number>2</number>' +
      '</children>' +
      '</superscript>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<infixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '<identifier>y</identifier>' +
      '</children>' +
      '</infixop>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</infixop>' +
      '</children>' +
      '</infixop>');
};


/**
 * Prefix function applications
 */
sre.SemanticTreeTest.prototype.testStreePrefixFuncsSingle = function() {
  this.brief = true;
  this.executeTreeTest(
      '<mrow><mi>sin</mi><mo>(</mo><mi>x</mi><mo>)</mo></mrow>',
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<function>sin</function>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>');

  this.executeTreeTest(
      '<mrow><mi>sin</mi><mo>(</mo><mi>x</mi><mi>y</mi><mo>)</mo></mrow>',
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<function>sin</function>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<infixop>\u2062' +
      '<content>' +
      '<operator>\u2062</operator>' +
      '</content>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '<identifier>y</identifier>' +
      '</children>' +
      '</infixop>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>');

  this.executeTreeTest(
      '<mrow><mi>sin</mi><mo>(</mo><msup><mi>x</mi><mn>2</mn></msup>' +
      '<mo>)</mo></mrow>',
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<function>sin</function>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<superscript>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '<number>2</number>' +
      '</children>' +
      '</superscript>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>');

  this.executeTreeTest(
      '<mrow><mi>sin</mi><mo>(</mo><msub><mi>x</mi><mn>2</mn></msub>' +
      '<mo>)</mo></mrow>',
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<function>sin</function>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<subscript>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '<number>2</number>' +
      '</children>' +
      '</subscript>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>');

  this.executeTreeTest(
      '<mrow><mi>sin</mi><mo>(</mo><msubsup><mi>x</mi><mn>2</mn>' +
      '<mn>1</mn></msubsup><mo>)</mo></mrow>',
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<function>sin</function>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<superscript>' +
      '<children>' +
      '<subscript>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '<number>2</number>' +
      '</children>' +
      '</subscript>' +
      '<number>1</number>' +
      '</children>' +
      '</superscript>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>');

  this.executeTreeTest(
      '<mrow><mi>sin</mi><mo>(</mo><mover><mi>x</mi><mn>2</mn></mover>' +
      '<mo>)</mo></mrow>',
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<function>sin</function>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<overscore>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '<number>2</number>' +
      '</children>' +
      '</overscore>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>');

  this.executeTreeTest(
      '<mrow><mi>sin</mi><mo>(</mo><munder><mi>x</mi><mn>2</mn></munder>' +
      '<mo>)</mo></mrow>',
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<function>sin</function>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<underscore>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '<number>2</number>' +
      '</children>' +
      '</underscore>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>');

  this.executeTreeTest(
      '<mrow><mi>sin</mi><mo>(</mo><munderover><mi>x</mi><mn>2</mn>' +
      '<mn>1</mn></munderover><mo>)</mo></mrow>',
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<function>sin</function>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<overscore>' +
      '<children>' +
      '<underscore>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '<number>2</number>' +
      '</children>' +
      '</underscore>' +
      '<number>1</number>' +
      '</children>' +
      '</overscore>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>');

  this.executeTreeTest(
      '<mrow><mi>sin</mi><mo>(</mo><mfrac><mn>1</mn><mn>2</mn></mfrac>' +
      '<mo>)</mo></mrow>',
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<function>sin</function>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<fraction>' +
      '<children>' +
      '<number>1</number>' +
      '<number>2</number>' +
      '</children>' +
      '</fraction>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>');

  this.executeTreeTest(
      '<mrow><mi>sin</mi><mo>(</mo><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '<mo>)</mo></mrow>',
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<function>sin</function>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<infixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '<identifier>y</identifier>' +
      '</children>' +
      '</infixop>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>');
};


/**
 * Prefix functions applications with surrounding operators.
 */
sre.SemanticTreeTest.prototype.testStreePrefixFuncsWithOps = function() {
  this.brief = true;
  this.executeTreeTest(
      '<mrow><mn>1</mn><mo>+</mo><mi>sin</mi><mo>(</mo><mi>x</mi>' +
      '<mo>)</mo></mrow>',
      '<infixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<number>1</number>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<function>sin</function>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>' +
      '</children>' +
      '</infixop>');

  this.executeTreeTest(
      '<mrow><mi>sin</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>+</mo>' +
      '<mn>2</mn></mrow>',
      '<infixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<function>sin</function>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>' +
      '<number>2</number>' +
      '</children>' +
      '</infixop>');

  this.executeTreeTest(
      '<mrow><mn>1</mn><mo>+</mo><mi>sin</mi><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '<mo>+</mo><mn>2</mn></mrow>',
      '<infixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<number>1</number>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<function>sin</function>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>' +
      '<number>2</number>' +
      '</children>' +
      '</infixop>');

  this.executeTreeTest(
      '<mrow><mo>a</mo><mo>+</mo><mi>sin</mi><mo>(</mo><mi>x</mi>' +
      '<mo>)</mo></mrow>',
      '<infixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<identifier>a</identifier>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<function>sin</function>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>' +
      '</children>' +
      '</infixop>');

  this.executeTreeTest(
      '<mrow><mi>sin</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>+</mo>' +
      '<mo>b</mo></mrow>',
      '<infixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<function>sin</function>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>' +
      '<identifier>b</identifier>' +
      '</children>' +
      '</infixop>');

  this.executeTreeTest(
      '<mrow><mo>a</mo><mo>+</mo><mi>sin</mi><mo>(</mo><mi>x</mi>' +
      '<mo>)</mo><mo>+</mo><mo>b</mo></mrow>',
      '<infixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<identifier>a</identifier>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<function>sin</function>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>' +
      '<identifier>b</identifier>' +
      '</children>' +
      '</infixop>');

  this.executeTreeTest(
      '<mrow><mo>a</mo><mo>=</mo><mi>sin</mi><mo>(</mo><mi>x</mi>' +
      '<mo>)</mo></mrow>',
      '<relseq>=' +
      '<content>' +
      '<relation>=</relation>' +
      '</content>' +
      '<children>' +
      '<identifier>a</identifier>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<function>sin</function>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>' +
      '</children>' +
      '</relseq>');

  this.executeTreeTest(
      '<mrow><mi>sin</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>=</mo>' +
      '<mo>b</mo></mrow>',
      '<relseq>=' +
      '<content>' +
      '<relation>=</relation>' +
      '</content>' +
      '<children>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<function>sin</function>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>' +
      '<identifier>b</identifier>' +
      '</children>' +
      '</relseq>');

  this.executeTreeTest(
      '<mrow><mo>a</mo><mo>=</mo><mi>sin</mi><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '<mo>=</mo><mo>b</mo></mrow>',
      '<relseq>=' +
      '<content>' +
      '<relation>=</relation>' +
      '<relation>=</relation>' +
      '</content>' +
      '<children>' +
      '<identifier>a</identifier>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<function>sin</function>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>' +
      '<identifier>b</identifier>' +
      '</children>' +
      '</relseq>');
};


/**
 * Multiple prefix function applications.
 */
sre.SemanticTreeTest.prototype.testStreePrefixFuncsMulti = function() {
  this.brief = true;
  this.executeTreeTest(
      '<mrow><mi>sin</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>+</mo><mi>cos</mi>' +
      '<mo>(</mo><mi>x</mi><mo>)</mo></mrow>',
      '<infixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<function>sin</function>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<function>cos</function>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>' +
      '</children>' +
      '</infixop>');

  this.executeTreeTest(
      '<mrow><mi>sin</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>+</mo><mi>cos</mi>' +
      '<mo>(</mo><mi>x</mi><mo>)</mo><mo>=</mo><mi>tan</mi><mo>(</mo>' +
      '<mi>x</mi><mo>)</mo></mrow>',
      '<relseq>=' +
      '<content>' +
      '<relation>=</relation>' +
      '</content>' +
      '<children>' +
      '<infixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<function>sin</function>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<function>cos</function>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>' +
      '</children>' +
      '</infixop>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<function>tan</function>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>' +
      '</children>' +
      '</relseq>');

  this.executeTreeTest(
      '<mrow><mi>sin</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>+</mo><mi>cos</mi>' +
      '<mo>(</mo><mi>y</mi><mo>)</mo><mo>=</mo><mi>tan</mi><mo>(</mo>' +
      '<mi>x</mi><mi>y</mi><mo>)</mo></mrow>',
      '<relseq>=' +
      '<content>' +
      '<relation>=</relation>' +
      '</content>' +
      '<children>' +
      '<infixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<function>sin</function>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<function>cos</function>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<identifier>y</identifier>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>' +
      '</children>' +
      '</infixop>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<function>tan</function>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<infixop>\u2062' +
      '<content>' +
      '<operator>\u2062</operator>' +
      '</content>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '<identifier>y</identifier>' +
      '</children>' +
      '</infixop>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>' +
      '</children>' +
      '</relseq>');
};


/**
 * Prefix function applications with sub- and superscripts.
 */
sre.SemanticTreeTest.prototype.testStreePrefixFuncsScripts = function() {
  this.brief = true;
  this.executeTreeTest(
      '<mrow><msup><mi>sin</mi><mn>2</mn></msup><mo>(</mo><mi>x</mi>' +
      '<mo>)</mo></mrow>',
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<superscript>' +
      '<children>' +
      '<function>sin</function>' +
      '<number>2</number>' +
      '</children>' +
      '</superscript>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>');

  this.executeTreeTest(
      '<mrow><msub><mi>sin</mi><mn>1</mn></msub><mo>(</mo><mi>x</mi>' +
      '<mo>)</mo></mrow>',
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<subscript>' +
      '<children>' +
      '<function>sin</function>' +
      '<number>1</number>' +
      '</children>' +
      '</subscript>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>');

  this.executeTreeTest(
      '<mrow><msubsup><mi>sin</mi><mn>2</mn><mn>1</mn></msubsup><mo>(</mo>' +
      '<mi>x</mi><mo>)</mo></mrow>',
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<superscript>' +
      '<children>' +
      '<subscript>' +
      '<children>' +
      '<function>sin</function>' +
      '<number>2</number>' +
      '</children>' +
      '</subscript>' +
      '<number>1</number>' +
      '</children>' +
      '</superscript>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>');

  this.executeTreeTest(
      '<mrow><msup><mi>sin</mi><mn>2</mn></msup><mo>(</mo><mi>x</mi>' +
      '<mo>)</mo><mo>+</mo><msup><mi>cos</mi><mn>2</mn></msup><mo>(</mo>' +
      '<mi>y</mi><mo>)</mo><mo>=</mo><mn>1</mn></mrow>',
      '<relseq>=' +
      '<content>' +
      '<relation>=</relation>' +
      '</content>' +
      '<children>' +
      '<infixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<superscript>' +
      '<children>' +
      '<function>sin</function>' +
      '<number>2</number>' +
      '</children>' +
      '</superscript>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<superscript>' +
      '<children>' +
      '<function>cos</function>' +
      '<number>2</number>' +
      '</children>' +
      '</superscript>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<identifier>y</identifier>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>' +
      '</children>' +
      '</infixop>' +
      '<number>1</number>' +
      '</children>' +
      '</relseq>');
};


/**
 * Prefix function applications with unfenced arguments.
 */
sre.SemanticTreeTest.prototype.testStreePrefixFuncsUnfenced = function() {
  this.brief = true;
  this.executeTreeTest(
      '<mrow><mi>sin</mi><mi>x</mi></mrow>',
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<function>sin</function>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</appl>');

  this.executeTreeTest(
      '<mrow><mi>sin</mi><mi>x</mi><mi>y</mi></mrow>',
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<function>sin</function>' +
      '<infixop>\u2062' +
      '<content>' +
      '<operator>\u2062</operator>' +
      '</content>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '<identifier>y</identifier>' +
      '</children>' +
      '</infixop>' +
      '</children>' +
      '</appl>');

  this.executeTreeTest(
      '<mrow><mi>sin</mi><msup><mi>x</mi><mn>2</mn></msup></mrow>',
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<function>sin</function>' +
      '<superscript>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '<number>2</number>' +
      '</children>' +
      '</superscript>' +
      '</children>' +
      '</appl>');

  this.executeTreeTest(
      '<mrow><mi>sin</mi><msub><mi>x</mi><mn>2</mn></msub></mrow>',
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<function>sin</function>' +
      '<subscript>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '<number>2</number>' +
      '</children>' +
      '</subscript>' +
      '</children>' +
      '</appl>');

  this.executeTreeTest(
      '<mrow><mi>sin</mi><msubsup><mi>x</mi><mn>2</mn><mn>1</mn>' +
      '</msubsup></mrow>',
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<function>sin</function>' +
      '<superscript>' +
      '<children>' +
      '<subscript>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '<number>2</number>' +
      '</children>' +
      '</subscript>' +
      '<number>1</number>' +
      '</children>' +
      '</superscript>' +
      '</children>' +
      '</appl>');

  this.executeTreeTest(
      '<mrow><mi>sin</mi><mover><mi>x</mi><mn>2</mn></mover></mrow>',
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<function>sin</function>' +
      '<overscore>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '<number>2</number>' +
      '</children>' +
      '</overscore>' +
      '</children>' +
      '</appl>');

  this.executeTreeTest(
      '<mrow><mi>sin</mi><munder><mi>x</mi><mn>2</mn></munder></mrow>',
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<function>sin</function>' +
      '<underscore>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '<number>2</number>' +
      '</children>' +
      '</underscore>' +
      '</children>' +
      '</appl>');

  this.executeTreeTest(
      '<mrow><mi>sin</mi><munderover><mi>x</mi><mn>2</mn><mn>1</mn>' +
      '</munderover></mrow>',
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<function>sin</function>' +
      '<overscore>' +
      '<children>' +
      '<underscore>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '<number>2</number>' +
      '</children>' +
      '</underscore>' +
      '<number>1</number>' +
      '</children>' +
      '</overscore>' +
      '</children>' +
      '</appl>');

  this.executeTreeTest(
      '<mrow><mi>sin</mi><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow>',
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<function>sin</function>' +
      '<fraction>' +
      '<children>' +
      '<number>1</number>' +
      '<number>2</number>' +
      '</children>' +
      '</fraction>' +
      '</children>' +
      '</appl>');
};


/**
 * Prefix function applications with unfenced arguments in an operator
 * expression.
 */
sre.SemanticTreeTest.prototype.testStreePrefixFuncsUnfencedOps = function() {
  this.brief = true;
  this.executeTreeTest(
      '<mrow><mn>1</mn><mo>+</mo><mi>sin</mi><mi>x</mi></mrow>',
      '<infixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<number>1</number>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<function>sin</function>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</appl>' +
      '</children>' +
      '</infixop>');

  this.executeTreeTest(
      '<mrow><mi>sin</mi><mi>x</mi><mo>+</mo><mn>2</mn></mrow>',
      '<infixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<function>sin</function>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</appl>' +
      '<number>2</number>' +
      '</children>' +
      '</infixop>');

  this.executeTreeTest(
      '<mrow><mn>1</mn><mo>+</mo><mi>sin</mi><mi>x</mi><mo>+</mo>' +
      '<mn>2</mn></mrow>',
      '<infixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<number>1</number>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<function>sin</function>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</appl>' +
      '<number>2</number>' +
      '</children>' +
      '</infixop>');

  this.executeTreeTest(
      '<mrow><mo>a</mo><mo>+</mo><mi>sin</mi><mi>x</mi></mrow>',
      '<infixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<identifier>a</identifier>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<function>sin</function>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</appl>' +
      '</children>' +
      '</infixop>');

  this.executeTreeTest(
      '<mrow><mi>sin</mi><mi>x</mi><mo>+</mo><mo>b</mo></mrow>',
      '<infixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<function>sin</function>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</appl>' +
      '<identifier>b</identifier>' +
      '</children>' +
      '</infixop>');

  this.executeTreeTest(
      '<mrow><mo>a</mo><mo>+</mo><mi>sin</mi><mi>x</mi><mo>+</mo>' +
      '<mo>b</mo></mrow>',
      '<infixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<identifier>a</identifier>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<function>sin</function>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</appl>' +
      '<identifier>b</identifier>' +
      '</children>' +
      '</infixop>');

  this.executeTreeTest(
      '<mrow><mo>a</mo><mo>=</mo><mi>sin</mi><mi>x</mi></mrow>',
      '<relseq>=' +
      '<content>' +
      '<relation>=</relation>' +
      '</content>' +
      '<children>' +
      '<identifier>a</identifier>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<function>sin</function>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</appl>' +
      '</children>' +
      '</relseq>');

  this.executeTreeTest(
      '<mrow><mi>sin</mi><mi>x</mi><mo>=</mo><mo>b</mo></mrow>',
      '<relseq>=' +
      '<content>' +
      '<relation>=</relation>' +
      '</content>' +
      '<children>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<function>sin</function>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</appl>' +
      '<identifier>b</identifier>' +
      '</children>' +
      '</relseq>');

  this.executeTreeTest(
      '<mrow><mo>a</mo><mo>=</mo><mi>sin</mi><mi>x</mi><mo>=</mo>' +
      '<mo>b</mo></mrow>',
      '<relseq>=' +
      '<content>' +
      '<relation>=</relation>' +
      '<relation>=</relation>' +
      '</content>' +
      '<children>' +
      '<identifier>a</identifier>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<function>sin</function>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</appl>' +
      '<identifier>b</identifier>' +
      '</children>' +
      '</relseq>');
};


/**
 * Multiple prefix function applications with unfenced arguments.
 */
sre.SemanticTreeTest.prototype.testStreePrefixFuncsMultiUnfenced = function() {
  this.brief = true;
  this.executeTreeTest(
      '<mrow><mi>sin</mi><mi>x</mi><mo>+</mo><mi>cos</mi><mi>x</mi></mrow>',
      '<infixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<function>sin</function>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</appl>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<function>cos</function>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</appl>' +
      '</children>' +
      '</infixop>');

  this.executeTreeTest(
      '<mrow><mi>sin</mi><mi>x</mi><mo>+</mo><mi>cos</mi><mi>x</mi><mo>=</mo>' +
      '<mi>tan</mi><mi>x</mi></mrow>',
      '<relseq>=' +
      '<content>' +
      '<relation>=</relation>' +
      '</content>' +
      '<children>' +
      '<infixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<function>sin</function>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</appl>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<function>cos</function>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</appl>' +
      '</children>' +
      '</infixop>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<function>tan</function>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</appl>' +
      '</children>' +
      '</relseq>');

  this.executeTreeTest(
      '<mrow><mi>sin</mi><mi>x</mi><mo>+</mo><mi>cos</mi><mi>y</mi><mo>=</mo>' +
      '<mi>tan</mi><mi>x</mi><mi>y</mi></mrow>',
      '<relseq>=' +
      '<content>' +
      '<relation>=</relation>' +
      '</content>' +
      '<children>' +
      '<infixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<function>sin</function>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</appl>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<function>cos</function>' +
      '<identifier>y</identifier>' +
      '</children>' +
      '</appl>' +
      '</children>' +
      '</infixop>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<function>tan</function>' +
      '<infixop>\u2062' +
      '<content>' +
      '<operator>\u2062</operator>' +
      '</content>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '<identifier>y</identifier>' +
      '</children>' +
      '</infixop>' +
      '</children>' +
      '</appl>' +
      '</children>' +
      '</relseq>');
};


/**
 * Prefix function applications with sub- and superscripts and unfenced
 * arguments.
 */
sre.SemanticTreeTest.prototype.testStreePrefixFuncsScriptUnfenced =
    function() {
  this.brief = true;
  this.executeTreeTest(
      '<mrow><msup><mi>sin</mi><mn>2</mn></msup><mi>x</mi></mrow>',
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<superscript>' +
      '<children>' +
      '<function>sin</function>' +
      '<number>2</number>' +
      '</children>' +
      '</superscript>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</appl>');

  this.executeTreeTest(
      '<mrow><msub><mi>sin</mi><mn>1</mn></msub><mi>x</mi></mrow>',
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<subscript>' +
      '<children>' +
      '<function>sin</function>' +
      '<number>1</number>' +
      '</children>' +
      '</subscript>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</appl>');

  this.executeTreeTest(
      '<mrow><msubsup><mi>sin</mi><mn>2</mn><mn>1</mn></msubsup>' +
      '<mi>x</mi></mrow>',
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<superscript>' +
      '<children>' +
      '<subscript>' +
      '<children>' +
      '<function>sin</function>' +
      '<number>2</number>' +
      '</children>' +
      '</subscript>' +
      '<number>1</number>' +
      '</children>' +
      '</superscript>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</appl>');

  this.executeTreeTest(
      '<mrow><msup><mi>sin</mi><mn>2</mn></msup><mi>x</mi><mo>+</mo><msup>' +
      '<mi>cos</mi><mn>2</mn></msup><mi>y</mi><mo>=</mo><mn>1</mn></mrow>',
      '<relseq>=' +
      '<content>' +
      '<relation>=</relation>' +
      '</content>' +
      '<children>' +
      '<infixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<superscript>' +
      '<children>' +
      '<function>sin</function>' +
      '<number>2</number>' +
      '</children>' +
      '</superscript>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</appl>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<superscript>' +
      '<children>' +
      '<function>cos</function>' +
      '<number>2</number>' +
      '</children>' +
      '</superscript>' +
      '<identifier>y</identifier>' +
      '</children>' +
      '</appl>' +
      '</children>' +
      '</infixop>' +
      '<number>1</number>' +
      '</children>' +
      '</relseq>');
  this.executeTreeTest(
      '<mrow><msubsup><msubsup><mi>sin</mi><mn>2</mn><mn>1</mn>' +
      '</msubsup><mi>n</mi><mi>m</mi></msubsup><mi>x</mi></mrow>',
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<superscript>' +
      '<children>' +
      '<subscript>' +
      '<children>' +
      '<superscript>' +
      '<children>' +
      '<subscript>' +
      '<children>' +
      '<function>sin</function>' +
      '<number>2</number>' +
      '</children>' +
      '</subscript>' +
      '<number>1</number>' +
      '</children>' +
      '</superscript>' +
      '<identifier>n</identifier>' +
      '</children>' +
      '</subscript>' +
      '<identifier>m</identifier>' +
      '</children>' +
      '</superscript>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</appl>');
};


/**
 * Prefix functions without arguments.
 */
sre.SemanticTreeTest.prototype.testStreePrefixFuncsNoArgs = function() {
  this.brief = true;
  this.executeTreeTest(
      '<mi>sin</mi>',
      '<function>sin</function>');

  this.executeTreeTest(
      '<msup><mi>sin</mi><mn>2</mn></msup>',
      '<superscript>' +
      '<children>' +
      '<function>sin</function>' +
      '<number>2</number>' +
      '</children>' +
      '</superscript>');

  this.executeTreeTest(
      '<msup><mi>sin</mi><mn>2</mn></msup><mo>+</mo><msup><mi>cos</mi>' +
      '<mn>2</mn></msup>',
      '<infixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<superscript>' +
      '<children>' +
      '<function>sin</function>' +
      '<number>2</number>' +
      '</children>' +
      '</superscript>' +
      '<empty/>' +
      '</children>' +
      '</appl>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<superscript>' +
      '<children>' +
      '<function>cos</function>' +
      '<number>2</number>' +
      '</children>' +
      '</superscript>' +
      '<empty/>' +
      '</children>' +
      '</appl>' +
      '</children>' +
      '</infixop>');

  this.executeTreeTest(
      '<mrow><msup><mi>sin</mi><mn>2</mn></msup><mo>+</mo>' +
      '<msup><mi>cos</mi><mn>2</mn></msup><mo>=</mo><mn>1</mn></mrow>',
      '<relseq>=' +
      '<content>' +
      '<relation>=</relation>' +
      '</content>' +
      '<children>' +
      '<infixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<superscript>' +
      '<children>' +
      '<function>sin</function>' +
      '<number>2</number>' +
      '</children>' +
      '</superscript>' +
      '<empty/>' +
      '</children>' +
      '</appl>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<superscript>' +
      '<children>' +
      '<function>cos</function>' +
      '<number>2</number>' +
      '</children>' +
      '</superscript>' +
      '<empty/>' +
      '</children>' +
      '</appl>' +
      '</children>' +
      '</infixop>' +
      '<number>1</number>' +
      '</children>' +
      '</relseq>');

  this.executeTreeTest(
      '<mrow><mi>sin</mi><mo>=</mo><mfrac><mn>1</mn>' +
      '<mi>csc</mi></mfrac></mrow>',
      '<relseq>=' +
      '<content>' +
      '<relation>=</relation>' +
      '</content>' +
      '<children>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<function>sin</function>' +
      '<empty/>' +
      '</children>' +
      '</appl>' +
      '<fraction>' +
      '<children>' +
      '<number>1</number>' +
      '<function>csc</function>' +
      '</children>' +
      '</fraction>' +
      '</children>' +
      '</relseq>');
};


/**
 * Nested prefix function applications, both with and without fenced arguments.
 */
sre.SemanticTreeTest.prototype.testStreePrefixFuncsNested = function() {
  this.brief = true;
  this.executeTreeTest(
      '<mrow><mi>log</mi><mi>cos</mi><mi>x</mi></mrow>',
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<function>log</function>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<function>cos</function>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</appl>' +
      '</children>' +
      '</appl>');

  this.executeTreeTest(
      '<mrow><mi>ln</mi><mo>(</mo><mi>sin</mi>' +
      '<mo>(</mo><mi>x</mi><mo>)</mo><mo>)</mo></mrow>',
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<function>ln</function>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<function>sin</function>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>');

  this.executeTreeTest(
      '<mrow><mi>log</mi><mi>cos</mi><mi>x</mi><mo>=</mo><mi>ln</mi>' +
      '<mo>(</mo><mi>sin</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>)</mo></mrow>',
      '<relseq>=' +
      '<content>' +
      '<relation>=</relation>' +
      '</content>' +
      '<children>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<function>log</function>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<function>cos</function>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</appl>' +
      '</children>' +
      '</appl>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<function>ln</function>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<function>sin</function>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>' +
      '</children>' +
      '</relseq>');
};


/**
 * Variations of tables representing matrices, vectors, case statements,
 * multiline equations and regular tables.
 */
sre.SemanticTreeTest.prototype.testStreeTables = function() {
  this.brief = false;
  this.executeTreeTest(
      '<mrow class="MJX-TeXAtom-ORD"><mi mathvariant="bold">A</mi>' +
      '<mo>=</mo><mo>[</mo><mtable rowspacing="4pt" columnspacing="1em">' +
      '<mtr><mtd><mn>0</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd>' +
      '<mn>2</mn></mtd><mtd><mn>3</mn></mtd></mtr></mtable><mo>]</mo>' +
      '</mrow>',
      '<relseq role="equality" id="16">=' +
      '<content>' +
      '<relation role="equality" id="1">=</relation>' +
      '</content>' +
      '<children>' +
      '<identifier role="latinletter" font="bold" id="0">A</identifier>' +
      '<matrix role="unknown" id="13">' +
      '<content>' +
      '<fence role="open" id="2">[</fence>' +
      '<fence role="close" id="14">]</fence>' +
      '</content>' +
      '<children>' +
      '<row role="matrix" id="7">' +
      '<children>' +
      '<cell role="matrix" id="4">' +
      '<children>' +
      '<number role="integer" font="normal" id="3">0</number>' +
      '</children>' +
      '</cell>' +
      '<cell role="matrix" id="6">' +
      '<children>' +
      '<number role="integer" font="normal" id="5">1</number>' +
      '</children>' +
      '</cell>' +
      '</children>' +
      '</row>' +
      '<row role="matrix" id="12">' +
      '<children>' +
      '<cell role="matrix" id="9">' +
      '<children>' +
      '<number role="integer" font="normal" id="8">2</number>' +
      '</children>' +
      '</cell>' +
      '<cell role="matrix" id="11">' +
      '<children>' +
      '<number role="integer" font="normal" id="10">3</number>' +
      '</children>' +
      '</cell>' +
      '</children>' +
      '</row>' +
      '</children>' +
      '</matrix>' +
      '</children>' +
      '</relseq>');

  this.executeTreeTest(
      '<mo>[</mo><mtable rowspacing="4pt" columnspacing="1em"><mtr>' +
      '<mtd><mn>0</mn></mtd><mtd><mn>1</mn></mtd></mtr><mtr><mtd>' +
      '<mn>2</mn></mtd><mtd><mn>3</mn></mtd></mtr></mtable>' +
      '<mo>]</mo>',
      '<matrix role="unknown" id="11">' +
      '<content>' +
      '<fence role="open" id="0">[</fence>' +
      '<fence role="close" id="12">]</fence>' +
      '</content>' +
      '<children>' +
      '<row role="matrix" id="5">' +
      '<children>' +
      '<cell role="matrix" id="2">' +
      '<children>' +
      '<number role="integer" font="normal" id="1">0</number>' +
      '</children>' +
      '</cell>' +
      '<cell role="matrix" id="4">' +
      '<children>' +
      '<number role="integer" font="normal" id="3">1</number>' +
      '</children>' +
      '</cell>' +
      '</children>' +
      '</row>' +
      '<row role="matrix" id="10">' +
      '<children>' +
      '<cell role="matrix" id="7">' +
      '<children>' +
      '<number role="integer" font="normal" id="6">2</number>' +
      '</children>' +
      '</cell>' +
      '<cell role="matrix" id="9">' +
      '<children>' +
      '<number role="integer" font="normal" id="8">3</number>' +
      '</children>' +
      '</cell>' +
      '</children>' +
      '</row>' +
      '</children>' +
      '</matrix>');

  this.executeTreeTest(
      '<mrow class="MJX-TeXAtom-ORD"><mi mathvariant="bold">V</mi>' +
      '<mo>=</mo><mo>[</mo><mtable rowspacing="4pt" columnspacing="1em">' +
      '<mtr><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr>' +
      '<mtr><mtd><mn>3</mn></mtd></mtr></mtable><mo>]</mo></mrow>',
      '<relseq role="equality" id="15">=' +
      '<content>' +
      '<relation role="equality" id="1">=</relation>' +
      '</content>' +
      '<children>' +
      '<identifier role="latinletter" font="bold" id="0">V</identifier>' +
      '<vector role="unknown" id="12">' +
      '<content>' +
      '<fence role="open" id="2">[</fence>' +
      '<fence role="close" id="13">]</fence>' +
      '</content>' +
      '<children>' +
      '<line role="vector" id="5">' +
      '<children>' +
      '<number role="integer" font="normal" id="3">1</number>' +
      '</children>' +
      '</line>' +
      '<line role="vector" id="8">' +
      '<children>' +
      '<number role="integer" font="normal" id="6">2</number>' +
      '</children>' +
      '</line>' +
      '<line role="vector" id="11">' +
      '<children>' +
      '<number role="integer" font="normal" id="9">3</number>' +
      '</children>' +
      '</line>' +
      '</children>' +
      '</vector>' +
      '</children>' +
      '</relseq>');

  this.executeTreeTest(
      '<mo>[</mo><mtable rowspacing="4pt" columnspacing="1em">' +
      '<mtr><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr>' +
      '<mtr><mtd><mn>3</mn></mtd></mtr></mtable><mo>]</mo>',
      '<vector role="unknown" id="10">' +
      '<content>' +
      '<fence role="open" id="0">[</fence>' +
      '<fence role="close" id="11">]</fence>' +
      '</content>' +
      '<children>' +
      '<line role="vector" id="3">' +
      '<children>' +
      '<number role="integer" font="normal" id="1">1</number>' +
      '</children>' +
      '</line>' +
      '<line role="vector" id="6">' +
      '<children>' +
      '<number role="integer" font="normal" id="4">2</number>' +
      '</children>' +
      '</line>' +
      '<line role="vector" id="9">' +
      '<children>' +
      '<number role="integer" font="normal" id="7">3</number>' +
      '</children>' +
      '</line>' +
      '</children>' +
      '</vector>');


  this.executeTreeTest(
      '<mrow><mo>{</mo><mtable><mtr><mtd><mi>a</mi></mtd><mtd>' +
      '<mtext>often</mtext></mtd></mtr><mtr><mtd><mi>b</mi></mtd>' +
      '<mtd><mtext>sometimes</mtext></mtd></mtr></mtable></mrow>',
      '<cases role="unknown" id="11">' +
      '<content>' +
      '<punctuation role="openfence" id="0">{</punctuation>' +
      '</content>' +
      '<children>' +
      '<row role="cases" id="5">' +
      '<children>' +
      '<cell role="cases" id="2">' +
      '<children>' +
      '<identifier role="latinletter" font="normal" id="1">a</identifier>' +
      '</children>' +
      '</cell>' +
      '<cell role="cases" id="4">' +
      '<children>' +
      '<text role="unknown" id="3">often</text>' +
      '</children>' +
      '</cell>' +
      '</children>' +
      '</row>' +
      '<row role="cases" id="10">' +
      '<children>' +
      '<cell role="cases" id="7">' +
      '<children>' +
      '<identifier role="latinletter" font="normal" id="6">b</identifier>' +
      '</children>' +
      '</cell>' +
      '<cell role="cases" id="9">' +
      '<children>' +
      '<text role="unknown" id="8">sometimes</text>' +
      '</children>' +
      '</cell>' +
      '</children>' +
      '</row>' +
      '</children>' +
      '</cases>');

  this.executeTreeTest(
      '<mrow><mi mathvariant="bold">A</mi><mo>=</mo><mo>{</mo><mtable>' +
      '<mtr><mtd><mi>a</mi></mtd><mtd><mtext>often</mtext></mtd></mtr>' +
      '<mtr><mtd><mi>b</mi></mtd><mtd><mtext>sometimes</mtext></mtd></mtr>' +
      '</mtable></mrow>',
      '<relseq role="equality" id="14">=' +
      '<content>' +
      '<relation role="equality" id="1">=</relation>' +
      '</content>' +
      '<children>' +
      '<identifier role="latinletter" font="bold" id="0">A</identifier>' +
      '<cases role="unknown" id="13">' +
      '<content>' +
      '<punctuation role="openfence" id="2">{</punctuation>' +
      '</content>' +
      '<children>' +
      '<row role="cases" id="7">' +
      '<children>' +
      '<cell role="cases" id="4">' +
      '<children>' +
      '<identifier role="latinletter" font="normal" id="3">a</identifier>' +
      '</children>' +
      '</cell>' +
      '<cell role="cases" id="6">' +
      '<children>' +
      '<text role="unknown" id="5">often</text>' +
      '</children>' +
      '</cell>' +
      '</children>' +
      '</row>' +
      '<row role="cases" id="12">' +
      '<children>' +
      '<cell role="cases" id="9">' +
      '<children>' +
      '<identifier role="latinletter" font="normal" id="8">b</identifier>' +
      '</children>' +
      '</cell>' +
      '<cell role="cases" id="11">' +
      '<children>' +
      '<text role="unknown" id="10">sometimes</text>' +
      '</children>' +
      '</cell>' +
      '</children>' +
      '</row>' +
      '</children>' +
      '</cases>' +
      '</children>' +
      '</relseq>');

  this.executeTreeTest(
      '<mrow><mo>{</mo><mtable><mtr><mtd><mi>a</mi></mtd><mtd>' +
      '<mtext>often</mtext></mtd></mtr><mtr><mtd><mi>b</mi></mtd><mtd>' +
      '<mtext>sometimes</mtext></mtd></mtr></mtable><mo>.</mo></mrow>',
      '<punctuated role="endpunct" id="13">' +
      '<content>' +
      '<punctuation role="fullstop" id="12">.</punctuation>' +
      '</content>' +
      '<children>' +
      '<cases role="unknown" id="11">' +
      '<content>' +
      '<punctuation role="openfence" id="0">{</punctuation>' +
      '</content>' +
      '<children>' +
      '<row role="cases" id="5">' +
      '<children>' +
      '<cell role="cases" id="2">' +
      '<children>' +
      '<identifier role="latinletter" font="normal" id="1">a</identifier>' +
      '</children>' +
      '</cell>' +
      '<cell role="cases" id="4">' +
      '<children>' +
      '<text role="unknown" id="3">often</text>' +
      '</children>' +
      '</cell>' +
      '</children>' +
      '</row>' +
      '<row role="cases" id="10">' +
      '<children>' +
      '<cell role="cases" id="7">' +
      '<children>' +
      '<identifier role="latinletter" font="normal" id="6">b</identifier>' +
      '</children>' +
      '</cell>' +
      '<cell role="cases" id="9">' +
      '<children>' +
      '<text role="unknown" id="8">sometimes</text>' +
      '</children>' +
      '</cell>' +
      '</children>' +
      '</row>' +
      '</children>' +
      '</cases>' +
      '<punctuation role="fullstop" id="12">.</punctuation>' +
      '</children>' +
      '</punctuated>');

  this.executeTreeTest(
      '<mrow><mo>{</mo><mtable><mtr><mtd><mi>a</mi></mtd>' +
      '<mtd><mtext>often</mtext></mtd></mtr><mtr><mtd><mi>b</mi></mtd>' +
      '<mtd><mtext>sometimes</mtext></mtd></mtr></mtable>' +
      '<mo>,</mo><mi>b</mi><mo>,</mo><mi>c</mi><mo>.</mo></mrow>',
      '<punctuated role="sequence" id="17">' +
      '<content>' +
      '<punctuation role="unknown" id="12">,</punctuation>' +
      '<punctuation role="unknown" id="14">,</punctuation>' +
      '<punctuation role="fullstop" id="16">.</punctuation>' +
      '</content>' +
      '<children>' +
      '<cases role="unknown" id="11">' +
      '<content>' +
      '<punctuation role="openfence" id="0">{</punctuation>' +
      '</content>' +
      '<children>' +
      '<row role="cases" id="5">' +
      '<children>' +
      '<cell role="cases" id="2">' +
      '<children>' +
      '<identifier role="latinletter" font="normal" id="1">a</identifier>' +
      '</children>' +
      '</cell>' +
      '<cell role="cases" id="4">' +
      '<children>' +
      '<text role="unknown" id="3">often</text>' +
      '</children>' +
      '</cell>' +
      '</children>' +
      '</row>' +
      '<row role="cases" id="10">' +
      '<children>' +
      '<cell role="cases" id="7">' +
      '<children>' +
      '<identifier role="latinletter" font="normal" id="6">b</identifier>' +
      '</children>' +
      '</cell>' +
      '<cell role="cases" id="9">' +
      '<children>' +
      '<text role="unknown" id="8">sometimes</text>' +
      '</children>' +
      '</cell>' +
      '</children>' +
      '</row>' +
      '</children>' +
      '</cases>' +
      '<punctuation role="unknown" id="12">,</punctuation>' +
      '<identifier role="latinletter" font="normal" id="13">b</identifier>' +
      '<punctuation role="unknown" id="14">,</punctuation>' +
      '<identifier role="latinletter" font="normal" id="15">c</identifier>' +
      '<punctuation role="fullstop" id="16">.</punctuation>' +
      '</children>' +
      '</punctuated>');

  this.executeTreeTest(
      '<mrow><mo>{</mo><mtable><mtr><mtd><mi>a</mi><mo>,</mo>' +
      '<mtext>often</mtext></mtd></mtr><mtr><mtd><mi>b</mi><mo>,</mo>' +
      '<mtext>sometimes</mtext></mtd></mtr></mtable><mo>,</mo><mi>b</mi>' +
      '<mo>,</mo><mi>c</mi><mo>.</mo></mrow>',
      '<punctuated role="sequence" id="19">' +
      '<content>' +
      '<punctuation role="unknown" id="14">,</punctuation>' +
      '<punctuation role="unknown" id="16">,</punctuation>' +
      '<punctuation role="fullstop" id="18">.</punctuation>' +
      '</content>' +
      '<children>' +
      '<cases role="unknown" id="13">' +
      '<content>' +
      '<punctuation role="openfence" id="0">{</punctuation>' +
      '</content>' +
      '<children>' +
      '<line role="cases" id="6">' +
      '<children>' +
      '<punctuated role="sequence" id="4">' +
      '<content>' +
      '<punctuation role="unknown" id="2">,</punctuation>' +
      '</content>' +
      '<children>' +
      '<identifier role="latinletter" font="normal" id="1">a</identifier>' +
      '<punctuation role="unknown" id="2">,</punctuation>' +
      '<text role="unknown" id="3">often</text>' +
      '</children>' +
      '</punctuated>' +
      '</children>' +
      '</line>' +
      '<line role="cases" id="12">' +
      '<children>' +
      '<punctuated role="sequence" id="10">' +
      '<content>' +
      '<punctuation role="unknown" id="8">,</punctuation>' +
      '</content>' +
      '<children>' +
      '<identifier role="latinletter" font="normal" id="7">b</identifier>' +
      '<punctuation role="unknown" id="8">,</punctuation>' +
      '<text role="unknown" id="9">sometimes</text>' +
      '</children>' +
      '</punctuated>' +
      '</children>' +
      '</line>' +
      '</children>' +
      '</cases>' +
      '<punctuation role="unknown" id="14">,</punctuation>' +
      '<identifier role="latinletter" font="normal" id="15">b</identifier>' +
      '<punctuation role="unknown" id="16">,</punctuation>' +
      '<identifier role="latinletter" font="normal" id="17">c</identifier>' +
      '<punctuation role="fullstop" id="18">.</punctuation>' +
      '</children>' +
      '</punctuated>');

  this.executeTreeTest(
      '<mtable><mtr><mtd><mi>x</mi><maligngroup/><mo>=</mo><mn>4</mn>' +
      '</mtd></mtr><mtr><mtd><mi>y</mi><maligngroup/><mo>=</mo><mn>2</mn>' +
      '</mtd></mtr><mtr><mtd><mi>x</mi><mi>y</mi><maligngroup/><mo>=</mo>' +
      '<mn>6</mn></mtd></mtr></mtable>',
      '<multiline role="unknown" id="21">' +
      '<children>' +
      '<line role="multiline" id="5">' +
      '<children>' +
      '<relseq role="equality" id="3">=' +
      '<content>' +
      '<relation role="equality" id="1">=</relation>' +
      '</content>' +
      '<children>' +
      '<identifier role="latinletter" font="normal" id="0">x</identifier>' +
      '<number role="integer" font="normal" id="2">4</number>' +
      '</children>' +
      '</relseq>' +
      '</children>' +
      '</line>' +
      '<line role="multiline" id="11">' +
      '<children>' +
      '<relseq role="equality" id="9">=' +
      '<content>' +
      '<relation role="equality" id="7">=</relation>' +
      '</content>' +
      '<children>' +
      '<identifier role="latinletter" font="normal" id="6">y</identifier>' +
      '<number role="integer" font="normal" id="8">2</number>' +
      '</children>' +
      '</relseq>' +
      '</children>' +
      '</line>' +
      '<line role="multiline" id="20">' +
      '<children>' +
      '<relseq role="equality" id="18">=' +
      '<content>' +
      '<relation role="equality" id="14">=</relation>' +
      '</content>' +
      '<children>' +
      '<infixop role="implicit" id="17">\u2062' +
      '<content>' +
      '<operator role="multiplication" id="16">\u2062</operator>' +
      '</content>' +
      '<children>' +
      '<identifier role="latinletter" font="normal" id="12">x</identifier>' +
      '<identifier role="latinletter" font="normal" id="13">y</identifier>' +
      '</children>' +
      '</infixop>' +
      '<number role="integer" font="normal" id="15">6</number>' +
      '</children>' +
      '</relseq>' +
      '</children>' +
      '</line>' +
      '</children>' +
      '</multiline>');

  this.executeTreeTest(
      '<mtable><mtr><mtd><mi>x</mi></mtd><mtd><mo>=</mo></mtd><mtd><mn>4</mn>' +
      '</mtd></mtr><mtr><mtd><mi>y</mi></mtd><mtd><mo>=</mo></mtd><mtd>' +
      '<mn>2</mn></mtd></mtr><mtr><mtd><mi>x</mi><mi>y</mi></mtd><mtd>' +
      '<mo>=</mo></mtd><mtd><mn>6</mn></mtd></mtr></mtable>',
      '<table role="unknown" id="24">' +
      '<children>' +
      '<row role="table" id="6">' +
      '<children>' +
      '<cell role="table" id="1">' +
      '<children>' +
      '<identifier role="latinletter" font="normal" id="0">x</identifier>' +
      '</children>' +
      '</cell>' +
      '<cell role="table" id="3">' +
      '<children>' +
      '<relation role="equality" id="2">=</relation>' +
      '</children>' +
      '</cell>' +
      '<cell role="table" id="5">' +
      '<children>' +
      '<number role="integer" font="normal" id="4">4</number>' +
      '</children>' +
      '</cell>' +
      '</children>' +
      '</row>' +
      '<row role="table" id="13">' +
      '<children>' +
      '<cell role="table" id="8">' +
      '<children>' +
      '<identifier role="latinletter" font="normal" id="7">y</identifier>' +
      '</children>' +
      '</cell>' +
      '<cell role="table" id="10">' +
      '<children>' +
      '<relation role="equality" id="9">=</relation>' +
      '</children>' +
      '</cell>' +
      '<cell role="table" id="12">' +
      '<children>' +
      '<number role="integer" font="normal" id="11">2</number>' +
      '</children>' +
      '</cell>' +
      '</children>' +
      '</row>' +
      '<row role="table" id="23">' +
      '<children>' +
      '<cell role="table" id="18">' +
      '<children>' +
      '<infixop role="implicit" id="17">\u2062' +
      '<content>' +
      '<operator role="multiplication" id="16">\u2062</operator>' +
      '</content>' +
      '<children>' +
      '<identifier role="latinletter" font="normal" id="14">x</identifier>' +
      '<identifier role="latinletter" font="normal" id="15">y</identifier>' +
      '</children>' +
      '</infixop>' +
      '</children>' +
      '</cell>' +
      '<cell role="table" id="20">' +
      '<children>' +
      '<relation role="equality" id="19">=</relation>' +
      '</children>' +
      '</cell>' +
      '<cell role="table" id="22">' +
      '<children>' +
      '<number role="integer" font="normal" id="21">6</number>' +
      '</children>' +
      '</cell>' +
      '</children>' +
      '</row>' +
      '</children>' +
      '</table>');
};


/**
 * Limit functions.
 */
sre.SemanticTreeTest.prototype.testStreeLimitFunctions = function() {
  this.brief = true;
  this.executeTreeTest(
      '<mrow><munder><mi>lim</mi><mrow><mi>x</mi><mo>\u2192</mo>' +
      '<mi>\u221E</mi></mrow></munder><mo>(</mo><mi>x</mi><mo>)</mo></mrow>',
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<limlower>' +
      '<children>' +
      '<function>lim</function>' +
      '<relseq>\u2192' +
      '<content>' +
      '<relation>\u2192</relation>' +
      '</content>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '<identifier>\u221E</identifier>' +
      '</children>' +
      '</relseq>' +
      '</children>' +
      '</limlower>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>');

  this.executeTreeTest(
      '<mrow><mi>a</mi><mo>+</mo><munder><mi>lim</mi><mrow><mi>x</mi>' +
      '<mo>\u2192</mo><mi>\u221E</mi></mrow></munder><mo>(</mo><mi>x</mi>' +
      '<mo>)</mo><mo>+</mo><mi>b</mi></mrow>',
      '<infixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<identifier>a</identifier>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<limlower>' +
      '<children>' +
      '<function>lim</function>' +
      '<relseq>\u2192' +
      '<content>' +
      '<relation>\u2192</relation>' +
      '</content>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '<identifier>\u221E</identifier>' +
      '</children>' +
      '</relseq>' +
      '</children>' +
      '</limlower>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>' +
      '<identifier>b</identifier>' +
      '</children>' +
      '</infixop>');

  this.executeTreeTest(
      '<mrow><msup><munder><mi>lim</mi><mrow><mi>x</mi><mo>\u2192</mo>' +
      '<mi>\u221E</mi></mrow></munder><mo>+</mo></msup><mo>(</mo><mi>x</mi>' +
      '<mo>)</mo></mrow>',
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<limupper>' +
      '<children>' +
      '<limlower>' +
      '<children>' +
      '<function>lim</function>' +
      '<relseq>\u2192' +
      '<content>' +
      '<relation>\u2192</relation>' +
      '</content>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '<identifier>\u221E</identifier>' +
      '</children>' +
      '</relseq>' +
      '</children>' +
      '</limlower>' +
      '<operator>+</operator>' +
      '</children>' +
      '</limupper>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>');

  this.executeTreeTest(
      '<mrow><munderover><mi>lim</mi><mo>\u2015</mo><mrow><mi>x</mi>' +
      '<mo>\u2192</mo><mi>\u221E</mi></mrow></munderover><mo>(</mo>' +
      '<mi>x</mi><mo>)</mo></mrow>',
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<limboth>' +
      '<children>' +
      '<function>lim</function>' +
      '<punctuation>\u2015</punctuation>' +
      '<relseq>\u2192' +
      '<content>' +
      '<relation>\u2192</relation>' +
      '</content>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '<identifier>\u221E</identifier>' +
      '</children>' +
      '</relseq>' +
      '</children>' +
      '</limboth>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>');

  this.executeTreeTest(
      '<mrow><munder><mi>liminf</mi><mrow><mi>x</mi><mo>\u2192</mo>' +
      '<mi>\u221E</mi></mrow></munder><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '<mo>+</mo><munder><mi>limsup</mi><mrow><mi>y</mi><mo>\u2192</mo>' +
      '<mi>\u221E</mi></mrow></munder><mo>(</mo><mi>y</mi><mo>)</mo></mrow>',
      '<infixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<limlower>' +
      '<children>' +
      '<function>liminf</function>' +
      '<relseq>\u2192' +
      '<content>' +
      '<relation>\u2192</relation>' +
      '</content>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '<identifier>\u221E</identifier>' +
      '</children>' +
      '</relseq>' +
      '</children>' +
      '</limlower>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<limlower>' +
      '<children>' +
      '<function>limsup</function>' +
      '<relseq>\u2192' +
      '<content>' +
      '<relation>\u2192</relation>' +
      '</content>' +
      '<children>' +
      '<identifier>y</identifier>' +
      '<identifier>\u221E</identifier>' +
      '</children>' +
      '</relseq>' +
      '</children>' +
      '</limlower>' +
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<identifier>y</identifier>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>' +
      '</children>' +
      '</infixop>');

  this.executeTreeTest(
      '<mrow><mi>a</mi><mo>+</mo><munder><mi>lim</mi><mrow><mi>x</mi>' +
      '<mo>\u2192</mo><mi>\u221E</mi></mrow></munder><mi>x</mi><mo>+</mo>' +
      '<mi>b</mi></mrow>',
      '<infixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<identifier>a</identifier>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<limlower>' +
      '<children>' +
      '<function>lim</function>' +
      '<relseq>\u2192' +
      '<content>' +
      '<relation>\u2192</relation>' +
      '</content>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '<identifier>\u221E</identifier>' +
      '</children>' +
      '</relseq>' +
      '</children>' +
      '</limlower>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</appl>' +
      '<identifier>b</identifier>' +
      '</children>' +
      '</infixop>');

  this.executeTreeTest(
      '<mrow><munder><mi>lim</mi><mrow><mi>x</mi><mo>\u2192</mo>' +
      '<mi>\u221E</mi></mrow></munder><mi>lim</mi><munder><mrow><mi>y</mi>' +
      '<mo>\u2192</mo><mi>\u221E</mi></mrow></munder><mi>x</mi>' +
      '<mi>y</mi></mrow>',
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<limlower>' +
      '<children>' +
      '<function>lim</function>' +
      '<relseq>\u2192' +
      '<content>' +
      '<relation>\u2192</relation>' +
      '</content>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '<identifier>\u221E</identifier>' +
      '</children>' +
      '</relseq>' +
      '</children>' +
      '</limlower>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<function>lim</function>' +
      '<infixop>\u2062' +
      '<content>' +
      '<operator>\u2062</operator>' +
      '</content>' +
      '<children>' +
      '<underscore>' +
      '<children>' +
      '<relseq>\u2192' +
      '<content>' +
      '<relation>\u2192</relation>' +
      '</content>' +
      '<children>' +
      '<identifier>y</identifier>' +
      '<identifier>\u221E</identifier>' +
      '</children>' +
      '</relseq>' +
      '</children>' +
      '</underscore>' +
      '<identifier>x</identifier>' +
      '<identifier>y</identifier>' +
      '</children>' +
      '</infixop>' +
      '</children>' +
      '</appl>' +
      '</children>' +
      '</appl>');

  this.executeTreeTest(
      '<mi>liminf</mi>',
      '<function>liminf</function>');

  this.executeTreeTest(
      '<munder><mi>lim</mi><mrow><mi>x</mi><mo>\u2192</mo><mi>\u221E</mi>' +
      '</mrow></munder>',
      '<limlower>' +
      '<children>' +
      '<function>lim</function>' +
      '<relseq>\u2192' +
      '<content>' +
      '<relation>\u2192</relation>' +
      '</content>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '<identifier>\u221E</identifier>' +
      '</children>' +
      '</relseq>' +
      '</children>' +
      '</limlower>');

  this.executeTreeTest(
      '<mi>liminf</mi><mo>+</mo><mi>limsup</mi><mo>=</mo><mi>lim</mi>',
      '<relseq>=' +
      '<content>' +
      '<relation>=</relation>' +
      '</content>' +
      '<children>' +
      '<infixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<function>liminf</function>' +
      '<empty/>' +
      '</children>' +
      '</appl>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<function>limsup</function>' +
      '<empty/>' +
      '</children>' +
      '</appl>' +
      '</children>' +
      '</infixop>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '</content>' +
      '<children>' +
      '<function>lim</function>' +
      '<empty/>' +
      '</children>' +
      '</appl>' +
      '</children>' +
      '</relseq>');
};


/**
 * Variations of big operators.
 */
sre.SemanticTreeTest.prototype.testStreeBigOps = function() {
  this.brief = true;
  this.executeTreeTest(
      '<mrow><munderover><mi>\u2211</mi><mrow><mi>n</mi><mo>=</mo><mn>0</mn>' +
      '</mrow><mi>\u221E</mi></munderover><msup><mi>n</mi><mn>2</mn>' +
      '</msup></mrow>',
      '<bigop>' +
      '<children>' +
      '<limboth>' +
      '<children>' +
      '<largeop>\u2211</largeop>' +
      '<relseq>=' +
      '<content>' +
      '<relation>=</relation>' +
      '</content>' +
      '<children>' +
      '<identifier>n</identifier>' +
      '<number>0</number>' +
      '</children>' +
      '</relseq>' +
      '<identifier>\u221E</identifier>' +
      '</children>' +
      '</limboth>' +
      '<superscript>' +
      '<children>' +
      '<identifier>n</identifier>' +
      '<number>2</number>' +
      '</children>' +
      '</superscript>' +
      '</children>' +
      '</bigop>');

  this.executeTreeTest(
      '<mrow><munderover><mi>\u2211</mi><mrow><mi>n</mi><mo>=</mo><mn>0</mn>' +
      '</mrow><mi>\u221E</mi></munderover><munderover><mi>\u2211</mi><mrow>' +
      '<mi>m</mi><mo>=</mo><mn>0</mn></mrow><mi>\u221E</mi></munderover>' +
      '<msup><mi>n</mi><mn>m</mn></msup></mrow>',
      '<bigop>' +
      '<children>' +
      '<limboth>' +
      '<children>' +
      '<largeop>\u2211</largeop>' +
      '<relseq>=' +
      '<content>' +
      '<relation>=</relation>' +
      '</content>' +
      '<children>' +
      '<identifier>n</identifier>' +
      '<number>0</number>' +
      '</children>' +
      '</relseq>' +
      '<identifier>\u221E</identifier>' +
      '</children>' +
      '</limboth>' +
      '<bigop>' +
      '<children>' +
      '<limboth>' +
      '<children>' +
      '<largeop>\u2211</largeop>' +
      '<relseq>=' +
      '<content>' +
      '<relation>=</relation>' +
      '</content>' +
      '<children>' +
      '<identifier>m</identifier>' +
      '<number>0</number>' +
      '</children>' +
      '</relseq>' +
      '<identifier>\u221E</identifier>' +
      '</children>' +
      '</limboth>' +
      '<superscript>' +
      '<children>' +
      '<identifier>n</identifier>' +
      '<identifier>m</identifier>' +
      '</children>' +
      '</superscript>' +
      '</children>' +
      '</bigop>' +
      '</children>' +
      '</bigop>');

  this.executeTreeTest(
      '<mrow><munder><mi>\u2211</mi><mrow><mi>n</mi><mo>=</mo>' +
      '<mn>0</mn></mrow></munder><msup><mi>n</mi><mn>2</mn></msup></mrow>',
      '<bigop>' +
      '<children>' +
      '<limlower>' +
      '<children>' +
      '<largeop>\u2211</largeop>' +
      '<relseq>=' +
      '<content>' +
      '<relation>=</relation>' +
      '</content>' +
      '<children>' +
      '<identifier>n</identifier>' +
      '<number>0</number>' +
      '</children>' +
      '</relseq>' +
      '</children>' +
      '</limlower>' +
      '<superscript>' +
      '<children>' +
      '<identifier>n</identifier>' +
      '<number>2</number>' +
      '</children>' +
      '</superscript>' +
      '</children>' +
      '</bigop>');
};


/**
 * Variations of integrals.
 */
sre.SemanticTreeTest.prototype.testStreeIntegrals = function() {
  this.brief = true;
  this.executeTreeTest(
      '<mi>\u222B</mi>',
      '<largeop>\u222B</largeop>');

  this.executeTreeTest(
      '<mi>\u222B</mi><mi>dx</mi>',
      '<integral>' +
      '<children>' +
      '<largeop>\u222B</largeop>' +
      '<empty/>' +
      '<identifier>dx</identifier>' +
      '</children>' +
      '</integral>');

  this.executeTreeTest(
      '<mrow><mi>\u222B</mi><mi>x</mi><mi>dx</mi></mrow>',
      '<integral>' +
      '<children>' +
      '<largeop>\u222B</largeop>' +
      '<identifier>x</identifier>' +
      '<identifier>dx</identifier>' +
      '</children>' +
      '</integral>');

  this.executeTreeTest(
      '<mrow><mi>\u222B</mi><mi>x</mi><mi>d</mi><mi>x</mi></mrow>',
      '<integral>' +
      '<children>' +
      '<largeop>\u222B</largeop>' +
      '<identifier>x</identifier>' +
      '<punctuated>' +
      '<content>' +
      '<punctuation>\u2063</punctuation>' +
      '</content>' +
      '<children>' +
      '<identifier>d</identifier>' +
      '<punctuation>\u2063</punctuation>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</punctuated>' +
      '</children>' +
      '</integral>');

  this.executeTreeTest(
      '<mrow><mi>\u222B</mi><mi>x</mi><mo>+</mo><mi>y</mi><mi>d</mi><mi>x</mi></mrow>',
      '<integral>' +
      '<children>' +
      '<largeop>\u222B</largeop>' +
      '<infixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '<identifier>y</identifier>' +
      '</children>' +
      '</infixop>' +
      '<punctuated>' +
      '<content>' +
      '<punctuation>\u2063</punctuation>' +
      '</content>' +
      '<children>' +
      '<identifier>d</identifier>' +
      '<punctuation>\u2063</punctuation>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</punctuated>' +
      '</children>' +
      '</integral>');

  this.executeTreeTest(
      '<munderover><mi>\u222B</mi><mn>0</mn><mn>10</mn></munderover>',
      '<limboth>' +
      '<children>' +
      '<largeop>\u222B</largeop>' +
      '<number>0</number>' +
      '<number>10</number>' +
      '</children>' +
      '</limboth>');

  this.executeTreeTest(
      '<munder><mi>\u222B</mi><mn>X</mn></munder>',
      '<limlower>' +
      '<children>' +
      '<largeop>\u222B</largeop>' +
      '<identifier>X</identifier>' +
      '</children>' +
      '</limlower>');

  this.executeTreeTest(
      '<munderover><mi>\u222B</mi><mn>0</mn>' +
      '<mn>10</mn></munderover><mi>x</mi>' +
      '<mi>d</mi><mi>x</mi>',
      '<integral>' +
      '<children>' +
      '<limboth>' +
      '<children>' +
      '<largeop>\u222B</largeop>' +
      '<number>0</number>' +
      '<number>10</number>' +
      '</children>' +
      '</limboth>' +
      '<identifier>x</identifier>' +
      '<punctuated>' +
      '<content>' +
      '<punctuation>\u2063</punctuation>' +
      '</content>' +
      '<children>' +
      '<identifier>d</identifier>' +
      '<punctuation>\u2063</punctuation>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</punctuated>' +
      '</children>' +
      '</integral>');

  this.executeTreeTest(
      '<munder><mi>\u222B</mi><mn>X</mn></munder><mi>x</mi><mi>dx</mi>',
      '<integral>' +
      '<children>' +
      '<limlower>' +
      '<children>' +
      '<largeop>\u222B</largeop>' +
      '<identifier>X</identifier>' +
      '</children>' +
      '</limlower>' +
      '<identifier>x</identifier>' +
      '<identifier>dx</identifier>' +
      '</children>' +
      '</integral>');

  this.executeTreeTest(
      '<munderover><mi>\u222B</mi><mn>0</mn><mn>10</mn></munderover>' +
      '<mi>x</mi><mi>dx</mi><mo>+</mo><munderover><mi>\u222B</mi><mn>10</mn>' +
      '<mn>20</mn></munderover><mi>x</mi><mi>dx</mi><mo>=</mo><munderover>' +
      '<mi>\u222B</mi><mn>0</mn><mn>20</mn></munderover><mi>x</mi><mi>dx</mi>',
      '<relseq>=' +
      '<content>' +
      '<relation>=</relation>' +
      '</content>' +
      '<children>' +
      '<infixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<integral>' +
      '<children>' +
      '<limboth>' +
      '<children>' +
      '<largeop>\u222B</largeop>' +
      '<number>0</number>' +
      '<number>10</number>' +
      '</children>' +
      '</limboth>' +
      '<identifier>x</identifier>' +
      '<identifier>dx</identifier>' +
      '</children>' +
      '</integral>' +
      '<integral>' +
      '<children>' +
      '<limboth>' +
      '<children>' +
      '<largeop>\u222B</largeop>' +
      '<number>10</number>' +
      '<number>20</number>' +
      '</children>' +
      '</limboth>' +
      '<identifier>x</identifier>' +
      '<identifier>dx</identifier>' +
      '</children>' +
      '</integral>' +
      '</children>' +
      '</infixop>' +
      '<integral>' +
      '<children>' +
      '<limboth>' +
      '<children>' +
      '<largeop>\u222B</largeop>' +
      '<number>0</number>' +
      '<number>20</number>' +
      '</children>' +
      '</limboth>' +
      '<identifier>x</identifier>' +
      '<identifier>dx</identifier>' +
      '</children>' +
      '</integral>' +
      '</children>' +
      '</relseq>');

  this.executeTreeTest(
      '<mi>\u222B</mi><mi>\u222B</mi><mi>\u222B</mi><mi>dx</mi><mi>dy</mi><mi>dz</mi>',
      '<integral>' +
      '<children>' +
      '<largeop>\u222B</largeop>' +
      '<integral>' +
      '<children>' +
      '<largeop>\u222B</largeop>' +
      '<integral>' +
      '<children>' +
      '<largeop>\u222B</largeop>' +
      '<empty/>' +
      '<identifier>dx</identifier>' +
      '</children>' +
      '</integral>' +
      '<identifier>dy</identifier>' +
      '</children>' +
      '</integral>' +
      '<identifier>dz</identifier>' +
      '</children>' +
      '</integral>');
};


/**
 * Translation of text elements.
 */
sre.SemanticTreeTest.prototype.testStreeText = function() {
  this.brief = false;
  this.executeTreeTest(
      '<mtext>text only</mtext>',
      '<text role="unknown" id="0">text only</text>'
  );

  this.executeTreeTest(
      '<mi>a</mi><mtext>to</mtext>',
      '<punctuated role="text" id="3">' +
      '<content>' +
      '<punctuation role="dummy" id="2">\u2063</punctuation>' +
      '</content>' +
      '<children>' +
      '<identifier role="latinletter" font="normal" id="0">a</identifier>' +
      '<text role="unknown" id="1">to</text>' +
      '</children>' +
      '</punctuated>'
  );

  this.executeTreeTest(
      '<mtext>to</mtext><mi>b</mi>',
      '<punctuated role="text" id="3">' +
      '<content>' +
      '<punctuation role="dummy" id="2">\u2063</punctuation>' +
      '</content>' +
      '<children>' +
      '<text role="unknown" id="0">to</text>' +
      '<identifier role="latinletter" font="normal" id="1">b</identifier>' +
      '</children>' +
      '</punctuated>'
  );

  this.executeTreeTest(
      '<mi>a</mi><mtext>to</mtext><mi>b</mi><mtext>to</mtext><mi>c</mi>',
      '<punctuated role="text" id="6">' +
      '<content>' +
      '<punctuation role="dummy" id="5">\u2063</punctuation>' +
      '</content>' +
      '<children>' +
      '<identifier role="latinletter" font="normal" id="0">a</identifier>' +
      '<text role="unknown" id="1">to</text>' +
      '<identifier role="latinletter" font="normal" id="2">b</identifier>' +
      '<text role="unknown" id="3">to</text>' +
      '<identifier role="latinletter" font="normal" id="4">c</identifier>' +
      '</children>' +
      '</punctuated>'
  );

  this.brief = true;
  this.executeTreeTest(
      '<mrow><mi>a</mi><mo>+</mo><mi>b</mi>' +
      '<mtext>is generally not the same as</mtext>' +
      '<mi>a</mi><mi>b</mi><mo>.</mo></mrow>',
      '<punctuated>' +
      '<content>' +
      '<punctuation>.</punctuation>' +
      '</content>' +
      '<children>' +
      '<punctuated>' +
      '<content>' +
      '<punctuation>\u2063</punctuation>' +
      '</content>' +
      '<children>' +
      '<infixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<identifier>a</identifier>' +
      '<identifier>b</identifier>' +
      '</children>' +
      '</infixop>' +
      '<text>is generally not the same as</text>' +
      '<infixop>\u2062' +
      '<content>' +
      '<operator>\u2062</operator>' +
      '</content>' +
      '<children>' +
      '<identifier>a</identifier>' +
      '<identifier>b</identifier>' +
      '</children>' +
      '</infixop>' +
      '</children>' +
      '</punctuated>' +
      '<punctuation>.</punctuation>' +
      '</children>' +
      '</punctuated>'
  );

  this.executeTreeTest(
      '<mrow><mi>a</mi><mo>+</mo><mi>b</mi>' +
      '<mtext>is not the same as</mtext>' +
      '<mi>a</mi><mi>b</mi><mtext>in general.</mtext></mrow>',
      '<punctuated>' +
      '<content>' +
      '<punctuation>\u2063</punctuation>' +
      '</content>' +
      '<children>' +
      '<infixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<identifier>a</identifier>' +
      '<identifier>b</identifier>' +
      '</children>' +
      '</infixop>' +
      '<text>is not the same as</text>' +
      '<infixop>\u2062' +
      '<content>' +
      '<operator>\u2062</operator>' +
      '</content>' +
      '<children>' +
      '<identifier>a</identifier>' +
      '<identifier>b</identifier>' +
      '</children>' +
      '</infixop>' +
      '<text>in general.</text>' +
      '</children>' +
      '</punctuated>'
  );
};


/**
 * Translation of mfenced elements.
 */
sre.SemanticTreeTest.prototype.testStreeMfenced = function() {
  this.brief = true;
  this.executeTreeTest(
      '<mfenced open="[" close="]" separators="+ - ;"/>',
      '<fenced>' +
      '<content>' +
      '<fence>[</fence>' +
      '<fence>]</fence>' +
      '</content>' +
      '<children>' +
      '<empty/>' +
      '</children>' +
      '</fenced>'
  );

  this.executeTreeTest(
      '<mfenced open="[" separators=""/>',
      '<fenced>' +
      '<content>' +
      '<fence>[</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<empty/>' +
      '</children>' +
      '</fenced>'
  );

  this.executeTreeTest(
      '<mfenced open="[" close="]"/>',
      '<fenced>' +
      '<content>' +
      '<fence>[</fence>' +
      '<fence>]</fence>' +
      '</content>' +
      '<children>' +
      '<empty/>' +
      '</children>' +
      '</fenced>'
  );

  this.executeTreeTest(
      '<mfenced close=")">',
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<empty/>' +
      '</children>' +
      '</fenced>'
  );

  this.executeTreeTest(
      '<mfenced open="[" close="]" separators="+"><mi> x </mi><mfrac>' +
      '<mi> x </mi><mi> y </mi></mfrac><mn> 5 </mn></mfenced>',
      '<fenced>' +
      '<content>' +
      '<fence>[</fence>' +
      '<fence>]</fence>' +
      '</content>' +
      '<children>' +
      '<infixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '<fraction>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '<identifier>y</identifier>' +
      '</children>' +
      '</fraction>' +
      '<number>5</number>' +
      '</children>' +
      '</infixop>' +
      '</children>' +
      '</fenced>'
  );

};


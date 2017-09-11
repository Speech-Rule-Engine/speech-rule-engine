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
goog.require('sre.DomUtil');
goog.require('sre.SemanticAttr');
goog.require('sre.SemanticTree');
goog.require('sre.SemanticUtil');
goog.require('sre.SystemExternal');
goog.require('sre.XpathUtil');



/**
 * @constructor
 * @extends {sre.AbstractTest}
 */
sre.SemanticTreeTest = function() {
  sre.SemanticTreeTest.base(this, 'constructor');

  /**
   * @override
   */
  this.information = 'Semantic tree tests.';

  /**
   * @type {Object.<sre.SemanticAnnotator>}
   */
  this.annotations = null;
};
goog.inherits(sre.SemanticTreeTest, sre.AbstractTest);


/**
 * @override
 */
sre.SemanticTreeTest.prototype.setUpTest = function() {
  this.xpathBlacklist = [];
  this.brief = true;
  this.annotations = sre.SemanticAnnotations.getInstance().annotators;
  sre.SemanticAnnotations.getInstance().annotators = {};
  sre.SemanticTreeTest.setupAttributes();
};


/**
 * @override
 */
sre.SemanticTreeTest.prototype.tearDownTest = function() {
  sre.SemanticAnnotations.getInstance().annotators = this.annotations;
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
  var node = sre.DomUtil.parseInput(mathMl);
  var sxml = new sre.SemanticTree(node).xml(this.brief);
  this.customizeXml(sxml);
  var dp = new sre.SystemExternal.xmldom.DOMParser();
  var xml = dp.parseFromString('<stree>' + sml + '</stree>', 'text/xml');
  var xmls = new sre.SystemExternal.xmldom.XMLSerializer();
  this.assert.equal(xmls.serializeToString(xml), xmls.serializeToString(sxml));
};


// Numbers.
/**
 * Test number representations.
 */
sre.SemanticTreeTest.prototype.testStreeNumbers = function() {
  this.brief = false;
  this.executeTreeTest(
      '<mn>2</mn>',
      '<number role="integer" font="normal" id="0">2</number>');
  this.executeTreeTest(
      '<mn>2.0</mn>',
      '<number role="float" font="normal" id="0">2.0</number>');
  this.executeTreeTest(
      '<mn>2t3</mn>',
      '<number role="othernumber" font="normal" id="0">2t3</number>');
  this.executeTreeTest(
      '<mfrac><mn>1</mn><mn>2</mn></mfrac>',
      '<fraction role="vulgar" id="2">' +
      '<children>' +
      '<number role="integer" font="normal" id="0">1</number>' +
      '<number role="integer" font="normal" id="1">2</number>' +
      '</children>' +
      '</fraction>');
  this.executeTreeTest(
      '<mfrac><mn>1</mn><mn>2.5</mn></mfrac>',
      '<fraction role="division" id="2">' +
      '<children>' +
      '<number role="integer" font="normal" id="0">1</number>' +
      '<number role="float" font="normal" id="1">2.5</number>' +
      '</children>' +
      '</fraction>');
};


/**
 * Test mixed number representations.
 */
sre.SemanticTreeTest.prototype.testStreeMixedNumbers = function() {
  this.brief = false;
  this.executeTreeTest(
      '<mn>3</mn><mfrac><mn>1</mn><mn>2</mn></mfrac>',
      '<number role="mixed" id="4">' +
      '<children>' +
      '<number role="integer" font="normal" id="0">3</number>' +
      '<fraction role="vulgar" id="3">' +
      '<children>' +
      '<number role="integer" font="normal" id="1">1</number>' +
      '<number role="integer" font="normal" id="2">2</number>' +
      '</children>' +
      '</fraction>' +
      '</children>' +
      '</number>'
  );
  this.brief = true;
  this.executeTreeTest(
      '<mfrac><mn>1</mn><mn>2</mn></mfrac><mn>3</mn>',
      '<infixop>\u2062' +
          '<content><operator>\u2062</operator></content>' +
      '<children>' +
      '<fraction>' +
      '<children>' +
      '<number>1</number>' +
      '<number>2</number>' +
      '</children>' +
      '</fraction>' +
      '<number>3</number>' +
      '</children>' +
      '</infixop>'
  );
  this.executeTreeTest(
      '<mn>3.0</mn><mfrac><mn>1</mn><mn>2</mn></mfrac>',
      '<infixop>\u2062' +
          '<content><operator>\u2062</operator></content>' +
      '<children>' +
      '<number>3.0</number>' +
      '<fraction>' +
      '<children>' +
      '<number>1</number>' +
      '<number>2</number>' +
      '</children>' +
      '</fraction>' +
      '</children>' +
      '</infixop>'
  );
  this.executeTreeTest(
      '<mfrac><mn>1</mn><mn>2</mn></mfrac><mn>3.0</mn>',
      '<infixop>\u2062' +
          '<content><operator>\u2062</operator></content>' +
      '<children>' +
      '<fraction>' +
      '<children>' +
      '<number>1</number>' +
      '<number>2</number>' +
      '</children>' +
      '</fraction>' +
      '<number>3.0</number>' +
      '</children>' +
      '</infixop>'
  );
  this.executeTreeTest(
      '<mn>3</mn><mfrac><mn>1</mn><mn>2</mn></mfrac><mi>a</mi>',
      '<infixop>\u2062' +
          '<content><operator>\u2062</operator></content>' +
      '<children>' +
      '<number>' +
      '<children>' +
      '<number>3</number>' +
      '<fraction>' +
      '<children>' +
      '<number>1</number>' +
      '<number>2</number>' +
      '</children>' +
      '</fraction>' +
      '</children>' +
      '</number>' +
      '<identifier>a</identifier>' +
      '</children>' +
      '</infixop>'
  );
  this.executeTreeTest(
      '<mi>b</mi><mn>3</mn><mfrac><mn>1</mn><mn>2</mn></mfrac><mi>a</mi>',
      '<infixop>\u2062' +
          '<content><operator>\u2062</operator>' +
      '<operator>\u2062</operator></content>' +
      '<children>' +
      '<identifier>b</identifier>' +
      '<number>' +
      '<children>' +
      '<number>3</number>' +
      '<fraction>' +
      '<children>' +
      '<number>1</number>' +
      '<number>2</number>' +
      '</children>' +
      '</fraction>' +
      '</children>' +
      '</number>' +
      '<identifier>a</identifier>' +
      '</children>' +
      '</infixop>'
  );
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
          '<content><operator>\u2062</operator>' +
          '<operator>\u2062</operator></content>' +
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
      '<mi>a</mi><mo>+</mo><mi>b</mi><mo>\u2218</mo><mi>c</mi><mo>+</mo>' +
      '<mi>d</mi>',
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


/**
 * Test operator trees with multiplication operators.
 */
sre.SemanticTreeTest.prototype.testStreeMultiplicationOperators = function() {
  this.brief = true;
  // Addition and subtraction.
  this.executeTreeTest(
      '<mi>a</mi><mo>*</mo><mi>b</mi><mo>*</mo><mi>c</mi><mo>*</mo><mi>d</mi>',
      '<infixop>*' +
      '<content>' +
      '<operator>*</operator>' +
      '<operator>*</operator>' +
      '<operator>*</operator>' +
      '</content>' +
      '<children>' +
      '<identifier>a</identifier>' +
      '<identifier>b</identifier>' +
      '<identifier>c</identifier>' +
      '<identifier>d</identifier>' +
      '</children>' +
      '</infixop>'
  );
  this.executeTreeTest(
      '<mrow>' +
      '<mn>1</mn><mi>a</mi><mo>\u00B7</mo><mi>m</mi>' +
      '</mrow>',
      '<infixop>\u00B7' +
      '<content>' +
      '<operator>\u00B7</operator>' +
      '</content>' +
      '<children>' +
      '<infixop>\u2062' +
      '<content>' +
      '<operator>\u2062</operator>' +
      '</content>' +
      '<children>' +
      '<number>1</number>' +
      '<identifier>a</identifier>' +
      '</children>' +
      '</infixop>' +
      '<identifier>m</identifier>' +
      '</children>' +
      '</infixop>'
  );
  this.executeTreeTest(
      '<mrow>' +
      '<mn>1</mn><mi>a</mi><mo>\u00B7</mo>' +
      '<mi>m</mi><mo>\u00B7</mo><mi>s</mi>' +
      '</mrow>',
      '<infixop>\u00B7' +
      '<content>' +
      '<operator>\u00B7</operator>' +
      '<operator>\u00B7</operator>' +
      '</content>' +
      '<children>' +
      '<infixop>\u2062' +
      '<content>' +
      '<operator>\u2062</operator>' +
      '</content>' +
      '<children>' +
      '<number>1</number>' +
      '<identifier>a</identifier>' +
      '</children>' +
      '</infixop>' +
      '<identifier>m</identifier>' +
      '<identifier>s</identifier>' +
      '</children>' +
      '</infixop>'
  );
  this.executeTreeTest(
      '<mrow>' +
      '<mn>1</mn><mi>a</mi><mo>\u00B7</mo>' +
      '<mi>m</mi><mo>\u00B7</mo>' +
      '<mi>s</mi><mo>\u00B7</mo>' +
      '<mi>c</mi><mi>b</mi><mo>\u00B7</mo>' +
      '<mi>k</mi>' +
      '</mrow>',
      '<infixop>\u00B7' +
      '<content>' +
      '<operator>\u00B7</operator>' +
      '<operator>\u00B7</operator>' +
      '<operator>\u00B7</operator>' +
      '<operator>\u00B7</operator>' +
      '</content>' +
      '<children>' +
      '<infixop>\u2062' +
      '<content>' +
      '<operator>\u2062</operator>' +
      '</content>' +
      '<children>' +
      '<number>1</number>' +
      '<identifier>a</identifier>' +
      '</children>' +
      '</infixop>' +
      '<identifier>m</identifier>' +
      '<identifier>s</identifier>' +
      '<infixop>\u2062' +
      '<content>' +
      '<operator>\u2062</operator>' +
      '</content>' +
      '<children>' +
      '<identifier>c</identifier>' +
      '<identifier>b</identifier>' +
      '</children>' +
      '</infixop>' +
      '<identifier>k</identifier>' +
      '</children>' +
      '</infixop>'
  );
  this.executeTreeTest(
      '<mrow>' +
      '<mn>1</mn><mi>a</mi><mo>\u00B7</mo>' +
      '<msup><mi>m</mi><mn>2</mn></msup>' +
      '<mo>\u00B7</mo>' +
      '<msup><mi>s</mi><mrow><mo>-</mo><mn>2</mn></mrow>' +
      '</msup></mrow>',
      '<infixop>\u00B7' +
      '<content>' +
      '<operator>\u00B7</operator>' +
      '<operator>\u00B7</operator>' +
      '</content>' +
      '<children>' +
      '<infixop>\u2062' +
      '<content>' +
      '<operator>\u2062</operator>' +
      '</content>' +
      '<children>' +
      '<number>1</number>' +
      '<identifier>a</identifier>' +
      '</children>' +
      '</infixop>' +
      '<superscript>' +
      '<children>' +
      '<identifier>m</identifier>' +
      '<number>2</number>' +
      '</children>' +
      '</superscript>' +
      '<superscript>' +
      '<children>' +
      '<identifier>s</identifier>' +
      '<prefixop>-' +
      '<content>' +
      '<operator>-</operator>' +
      '</content>' +
      '<children>' +
      '<number>2</number>' +
      '</children>' +
      '</prefixop>' +
      '</children>' +
      '</superscript>' +
      '</children>' +
      '</infixop>'
  );
  this.executeTreeTest(
      '<mrow><mn>1</mn><mi>J</mi><mo>=</mo><mn>1</mn>' +
      '<mi>a</mi><mo>\u00B7</mo>' +
      '<msup><mi>m</mi><mn>2</mn></msup>' +
      '<mo>\u00B7</mo>' +
      '<msup><mi>s</mi><mrow><mo>-</mo><mn>2</mn></mrow>' +
      '</msup></mrow>',
      '<relseq>=' +
      '<content>' +
      '<relation>=</relation>' +
      '</content>' +
      '<children>' +
      '<infixop>\u2062<content>' +
      '<operator>\u2062</operator>' +
      '</content>' +
      '<children>' +
      '<number>1</number>' +
      '<identifier>J</identifier>' +
      '</children>' +
      '</infixop>' +
      '<infixop>\u00B7' +
      '<content>' +
      '<operator>\u00B7</operator>' +
      '<operator>\u00B7</operator>' +
      '</content>' +
      '<children>' +
      '<infixop>\u2062' +
      '<content>' +
      '<operator>\u2062</operator>' +
      '</content>' +
      '<children>' +
      '<number>1</number>' +
      '<identifier>a</identifier>' +
      '</children>' +
      '</infixop>' +
      '<superscript>' +
      '<children>' +
      '<identifier>m</identifier>' +
      '<number>2</number>' +
      '</children>' +
      '</superscript>' +
      '<superscript>' +
      '<children>' +
      '<identifier>s</identifier>' +
      '<prefixop>-' +
      '<content>' +
      '<operator>-</operator>' +
      '</content>' +
      '<children>' +
      '<number>2</number>' +
      '</children>' +
      '</prefixop>' +
      '</children>' +
      '</superscript>' +
      '</children>' +
      '</infixop>' +
      '</children>' +
      '</relseq>'
  );
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
      '<operator>\u2062</operator>' +
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
 * Square roots
 */
sre.SemanticTreeTest.prototype.testStreeSquareRoots = function() {
  this.brief = false;
  this.executeTreeTest(
      '<msqrt></msqrt>',
      '<sqrt role="unknown" id="1">' +
      '<children>' +
      '<empty role="unknown" id="0"/>' +
      '</children>' +
      '</sqrt>'
  );
  this.executeTreeTest(
      '<msqrt><mi>x</mi></msqrt>',
      '<sqrt role="unknown" id="1">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="0">x</identifier>' +
      '</children>' +
      '</sqrt>'
  );
  this.executeTreeTest(
      '<msqrt><msqrt><mi>x</mi></msqrt></msqrt>',
      '<sqrt role="unknown" id="2">' +
      '<children>' +
      '<sqrt role="unknown" id="1">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="0">x</identifier>' +
      '</children>' +
      '</sqrt>' +
      '</children>' +
      '</sqrt>'
  );
  this.executeTreeTest(
      '<msqrt><mi>x</mi><mi>n</mi></msqrt>',
      '<sqrt role="unknown" id="4">' +
      '<children>' +
      '<infixop role="implicit" id="3">' +
      '⁢' +
      '<content>' +
      '<operator role="multiplication" id="2">⁢</operator>' +
      '</content>' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="0">x</identifier>' +
      '<identifier role="latinletter" font="italic" id="1">n</identifier>' +
      '</children>' +
      '</infixop>' +
      '</children>' +
      '</sqrt>'
  );
  this.executeTreeTest(
      '<msqrt><msqrt><msqrt><mi>x</mi></msqrt></msqrt><mi>y</mi></msqrt>',
      '<sqrt role="unknown" id="6">' +
      '<children>' +
      '<infixop role="implicit" id="5">' +
      '⁢' +
      '<content>' +
      '<operator role="multiplication" id="4">⁢</operator>' +
      '</content>' +
      '<children>' +
      '<sqrt role="unknown" id="2">' +
      '<children>' +
      '<sqrt role="unknown" id="1">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="0">x</identifier>' +
      '</children>' +
      '</sqrt>' +
      '</children>' +
      '</sqrt>' +
      '<identifier role="latinletter" font="italic" id="3">y</identifier>' +
      '</children>' +
      '</infixop>' +
      '</children>' +
      '</sqrt>'
  );
};


/**
 * Regular roots
 */
sre.SemanticTreeTest.prototype.testStreeRegularRoots = function() {
  this.brief = false;
  // Not sure if that makes even sense.
  // this.executeTreeTest('<mroot></mroot>');
  this.executeTreeTest(
      '<mroot><mi>x</mi><mi>n</mi></mroot>',
      '<root role="unknown" id="2">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="0">n</identifier>' +
      '<identifier role="latinletter" font="italic" id="1">x</identifier>' +
      '</children>' +
      '</root>'
  );
  this.executeTreeTest(
      '<mroot><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mrow><mi>n</mi>' +
      '<mo>+</mo><mn>1</mn></mrow></mroot>',
      '<root role="unknown" id="8">' +
      '<children>' +
      '<infixop role="addition" id="3">' +
      '+' +
      '<content>' +
      '<operator role="addition" id="1">+</operator>' +
      '</content>' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="0">n</identifier>' +
      '<number role="integer" font="normal" id="2">1</number>' +
      '</children>' +
      '</infixop>' +
      '<infixop role="addition" id="7">' +
      '+' +
      '<content>' +
      '<operator role="addition" id="5">+</operator>' +
      '</content>' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="4">x</identifier>' +
      '<identifier role="latinletter" font="italic" id="6">y</identifier>' +
      '</children>' +
      '</infixop>' +
      '</children>' +
      '</root>'
  );
  this.executeTreeTest(
      '<mroot><mroot><mi>x</mi><mi>n</mi></mroot><mi>m</mi></mroot>',
      '<root role="unknown" id="4">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="0">m</identifier>' +
      '<root role="unknown" id="3">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="1">n</identifier>' +
      '<identifier role="latinletter" font="italic" id="2">x</identifier>' +
      '</children>' +
      '</root>' +
      '</children>' +
      '</root>'
  );
  this.executeTreeTest(
      '<mroot><mrow><mroot><mi>x</mi><mi>n</mi></mroot><mroot><mi>y</mi>' +
      '<mi>l</mi></mroot></mrow><mi>m</mi></mroot>',
      '<root role="unknown" id="9">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="0">m</identifier>' +
      '<infixop role="implicit" id="8">' +
      '⁢' +
      '<content>' +
      '<operator role="multiplication" id="7">⁢</operator>' +
      '</content>' +
      '<children>' +
      '<root role="unknown" id="3">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="1">n</identifier>' +
      '<identifier role="latinletter" font="italic" id="2">x</identifier>' +
      '</children>' +
      '</root>' +
      '<root role="unknown" id="6">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="4">l</identifier>' +
      '<identifier role="latinletter" font="italic" id="5">y</identifier>' +
      '</children>' +
      '</root>' +
      '</children>' +
      '</infixop>' +
      '</children>' +
      '</root>'
  );
};


/**
 * Mixed roots
 */
sre.SemanticTreeTest.prototype.testStreeMixedRoots = function() {
  this.brief = false;
  this.executeTreeTest(
      '<msqrt><mroot><mi>x</mi><mi>n</mi></mroot></msqrt>',
      '<sqrt role="unknown" id="3">' +
      '<children>' +
      '<root role="unknown" id="2">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="0">n</identifier>' +
      '<identifier role="latinletter" font="italic" id="1">x</identifier>' +
      '</children>' +
      '</root>' +
      '</children>' +
      '</sqrt>'
  );
  this.executeTreeTest(
      '<mroot><msqrt><mi>x</mi></msqrt><mi>n</mi></mroot>',
      '<root role="unknown" id="3">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="0">n</identifier>' +
      '<sqrt role="unknown" id="2">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="1">x</identifier>' +
      '</children>' +
      '</sqrt>' +
      '</children>' +
      '</root>'
  );
  this.executeTreeTest(
      '<mroot><msqrt><mi>x</mi><mi>y</mi></msqrt><mi>n</mi></mroot>',
      '<root role="unknown" id="6">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="0">n</identifier>' +
      '<sqrt role="unknown" id="5">' +
      '<children>' +
      '<infixop role="implicit" id="4">⁢' +
      '<content>' +
      '<operator role="multiplication" id="3">⁢</operator>' +
      '</content>' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="1">x</identifier>' +
      '<identifier role="latinletter" font="italic" id="2">y</identifier>' +
      '</children>' +
      '</infixop>' +
      '</children>' +
      '</sqrt>' +
      '</children>' +
      '</root>'
  );
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
      '<identifier>f</identifier>' +
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
      '<identifier>f</identifier>' +
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
      '<identifier>f</identifier>' +
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
      '<identifier>f</identifier>' +
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
      '<identifier>f</identifier>' +
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
      '<identifier>f</identifier>' +
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
      '<identifier>f</identifier>' +
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
      '<identifier>f</identifier>' +
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
      '<identifier>f</identifier>' +
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
      '<identifier>f</identifier>' +
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
      '<identifier>f</identifier>' +
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
      '<identifier>f</identifier>' +
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
      '<identifier>f</identifier>' +
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
      '<identifier>f</identifier>' +
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
      '<identifier>f</identifier>' +
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
      '<identifier>f</identifier>' +
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
      '<identifier>f</identifier>' +
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
      '<identifier>f</identifier>' +
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
      '<identifier>f</identifier>' +
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
      '<identifier>f</identifier>' +
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
      '<identifier>g</identifier>' +
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
      '<identifier>f</identifier>' +
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
      '<identifier>g</identifier>' +
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
      '<identifier>h</identifier>' +
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
      '<identifier>f</identifier>' +
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
      '<identifier>g</identifier>' +
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
      '<identifier>h</identifier>' +
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
      '<identifier>g</identifier>' +
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
      '<identifier>f</identifier>' +
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
      '<identifier>h</identifier>' +
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
      '<identifier>f</identifier>' +
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
      '<identifier>g</identifier>' +
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
      '<identifier>f</identifier>' +
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
      '<identifier>g</identifier>' +
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
      '<identifier>P</identifier>' +
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
      '<identifier>f</identifier>' +
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
      '<identifier>f</identifier>' +
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
      '<identifier>f</identifier>' +
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
      '<msup><msub><mi>f</mi><mi>n</mi></msub><mn>2</mn></msup>' +
      '<mo>\u2061</mo><mo>(</mo><mi>x</mi><mo>+</mo><mi>y</mi><mo>)</mo>' +
      '<mo>+</mo><msup><msub><mi>f</mi><mi>m</mi></msub><mn>2</mn></msup>' +
      '<mo>(</mo><mi>x</mi><mo>+</mo><mi>y</mi><mo>)</mo>',
      '<infixop>+' +
      '<content>' +
      '<operator>+</operator>' +
      '</content>' +
      '<children>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '<identifier>f</identifier>' +
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
      '<function>sin</function>' +
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
      '<function>sin</function>' +
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
      '<function>sin</function>' +
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
      '<function>sin</function>' +
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
      '<function>sin</function>' +
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
      '<function>sin</function>' +
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
      '<function>sin</function>' +
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
      '<function>sin</function>' +
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
      '<function>sin</function>' +
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
      '<function>sin</function>' +
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
      '<function>sin</function>' +
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
      '<function>sin</function>' +
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
      '<function>sin</function>' +
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
      '<function>sin</function>' +
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
      '<function>sin</function>' +
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
      '<function>sin</function>' +
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
      '<function>sin</function>' +
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
      '<function>sin</function>' +
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
      '<function>sin</function>' +
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
      '<function>sin</function>' +
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
      '<function>cos</function>' +
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
      '<function>sin</function>' +
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
      '<function>cos</function>' +
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
      '<function>tan</function>' +
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
      '<function>sin</function>' +
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
      '<function>cos</function>' +
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
      '<function>tan</function>' +
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
      '<function>sin</function>' +
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
      '<function>sin</function>' +
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
      '<function>sin</function>' +
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
      '<function>sin</function>' +
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
      '<function>cos</function>' +
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
      '<function>sin</function>' +
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
      '<function>sin</function>' +
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
      '<function>sin</function>' +
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
      '<function>sin</function>' +
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
      '<function>sin</function>' +
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
      '<function>sin</function>' +
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
      '<function>sin</function>' +
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
      '<function>sin</function>' +
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
      '<function>sin</function>' +
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
      '<function>sin</function>' +
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
      '<function>sin</function>' +
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
      '<function>sin</function>' +
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
      '<function>sin</function>' +
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
      '<function>sin</function>' +
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
      '<function>sin</function>' +
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
      '<function>sin</function>' +
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
      '<function>sin</function>' +
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
      '<function>sin</function>' +
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
      '<function>sin</function>' +
      '</content>' +
      '<children>' +
      '<function>sin</function>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</appl>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '<function>cos</function>' +
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
      '<function>sin</function>' +
      '</content>' +
      '<children>' +
      '<function>sin</function>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</appl>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '<function>cos</function>' +
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
      '<function>tan</function>' +
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
      '<function>sin</function>' +
      '</content>' +
      '<children>' +
      '<function>sin</function>' +
      '<identifier>x</identifier>' +
      '</children>' +
      '</appl>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '<function>cos</function>' +
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
      '<function>tan</function>' +
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
      '<function>sin</function>' +
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
      '<function>sin</function>' +
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
      '<function>sin</function>' +
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
      '<function>sin</function>' +
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
      '<function>cos</function>' +
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
      '<function>sin</function>' +
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
      '<superscript>' +
      '<children>' +
      '<function>sin</function>' +
      '<number>2</number>' +
      '</children>' +
      '</superscript>' +
      '<superscript>' +
      '<children>' +
      '<function>cos</function>' +
      '<number>2</number>' +
      '</children>' +
      '</superscript>' +
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
      '<superscript>' +
      '<children>' +
      '<function>sin</function>' +
      '<number>2</number>' +
      '</children>' +
      '</superscript>' +
      '<superscript>' +
      '<children>' +
      '<function>cos</function>' +
      '<number>2</number>' +
      '</children>' +
      '</superscript>' +
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
      '<function>sin</function>' +
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
      '<function>log</function>' +
      '</content>' +
      '<children>' +
      '<function>log</function>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '<function>cos</function>' +
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
      '<function>ln</function>' +
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
      '<function>sin</function>' +
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
      '<function>log</function>' +
      '</content>' +
      '<children>' +
      '<function>log</function>' +
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '<function>cos</function>' +
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
      '<function>ln</function>' +
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
      '<function>sin</function>' +
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
 * Variations of matrices and their roles as determinants, square matrices or
 * rowvectors.
 */
sre.SemanticTreeTest.prototype.testStreeMatrices = function() {
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
      '<matrix role="squarematrix" id="13">' +
      '<content>' +
      '<fence role="open" id="2">[</fence>' +
      '<fence role="close" id="14">]</fence>' +
      '</content>' +
      '<children>' +
      '<row role="squarematrix" id="7">' +
      '<children>' +
      '<cell role="squarematrix" id="4">' +
      '<children>' +
      '<number role="integer" font="normal" id="3">0</number>' +
      '</children>' +
      '</cell>' +
      '<cell role="squarematrix" id="6">' +
      '<children>' +
      '<number role="integer" font="normal" id="5">1</number>' +
      '</children>' +
      '</cell>' +
      '</children>' +
      '</row>' +
      '<row role="squarematrix" id="12">' +
      '<children>' +
      '<cell role="squarematrix" id="9">' +
      '<children>' +
      '<number role="integer" font="normal" id="8">2</number>' +
      '</children>' +
      '</cell>' +
      '<cell role="squarematrix" id="11">' +
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
      '<mo>[</mo><mtable rowspacing="4pt" columnspacing="1em">' +
      '<mtr><mtd><mn>0</mn></mtd><mtd><mn>1</mn></mtd></mtr>' +
      '<mtr><mtd><mn>2</mn></mtd><mtd><mn>3</mn></mtd></mtr>' +
      '<mtr><mtd><mn>4</mn></mtd><mtd><mn>5</mn></mtd></mtr>' +
      '</mtable><mo>]</mo>',
      '<matrix role="unknown" id="16">' +
      '<content>' +
      '<fence role="open" id="0">[</fence>' +
      '<fence role="close" id="17">]</fence>' +
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
      '<row role="matrix" id="15">' +
      '<children>' +
      '<cell role="matrix" id="12">' +
      '<children>' +
      '<number role="integer" font="normal" id="11">4</number>' +
      '</children>' +
      '</cell>' +
      '<cell role="matrix" id="14">' +
      '<children>' +
      '<number role="integer" font="normal" id="13">5</number>' +
      '</children>' +
      '</cell>' +
      '</children>' +
      '</row>' +
      '</children>' +
      '</matrix>');

  this.executeTreeTest(
      '<mo>[</mo><mtable rowspacing="4pt" columnspacing="1em">' +
      '<mtr><mtd><mn>0</mn></mtd><mtd><mn>1</mn></mtd></mtr>' +
      '<mtr><mtd><mn>2</mn></mtd><mtd><mn>3</mn></mtd></mtr>' +
      '</mtable><mo>]</mo>',
      '<matrix role="squarematrix" id="11">' +
      '<content>' +
      '<fence role="open" id="0">[</fence>' +
      '<fence role="close" id="12">]</fence>' +
      '</content>' +
      '<children>' +
      '<row role="squarematrix" id="5">' +
      '<children>' +
      '<cell role="squarematrix" id="2">' +
      '<children>' +
      '<number role="integer" font="normal" id="1">0</number>' +
      '</children>' +
      '</cell>' +
      '<cell role="squarematrix" id="4">' +
      '<children>' +
      '<number role="integer" font="normal" id="3">1</number>' +
      '</children>' +
      '</cell>' +
      '</children>' +
      '</row>' +
      '<row role="squarematrix" id="10">' +
      '<children>' +
      '<cell role="squarematrix" id="7">' +
      '<children>' +
      '<number role="integer" font="normal" id="6">2</number>' +
      '</children>' +
      '</cell>' +
      '<cell role="squarematrix" id="9">' +
      '<children>' +
      '<number role="integer" font="normal" id="8">3</number>' +
      '</children>' +
      '</cell>' +
      '</children>' +
      '</row>' +
      '</children>' +
      '</matrix>');

  this.executeTreeTest(
      '<mfenced open="|" close="|"><mtable>' +
      '<mtr><mtd><mn>0</mn></mtd><mtd><mn>1</mn></mtd></mtr>' +
      '<mtr><mtd><mn>2</mn></mtd><mtd><mn>3</mn></mtd></mtr>' +
      '<mtr><mtd><mn>4</mn></mtd><mtd><mn>5</mn></mtd></mtr>' +
      '</mtable></mfenced>',
      '<matrix role="unknown" id="15">' +
      '<content>' +
      '<fence role="neutral" id="16">|</fence>' +
      '<fence role="neutral" id="17">|</fence>' +
      '</content>' +
      '<children>' +
      '<row role="matrix" id="4">' +
      '<children>' +
      '<cell role="matrix" id="1">' +
      '<children>' +
      '<number role="integer" font="normal" id="0">0</number>' +
      '</children>' +
      '</cell>' +
      '<cell role="matrix" id="3">' +
      '<children>' +
      '<number role="integer" font="normal" id="2">1</number>' +
      '</children>' +
      '</cell>' +
      '</children>' +
      '</row>' +
      '<row role="matrix" id="9">' +
      '<children>' +
      '<cell role="matrix" id="6">' +
      '<children>' +
      '<number role="integer" font="normal" id="5">2</number>' +
      '</children>' +
      '</cell>' +
      '<cell role="matrix" id="8">' +
      '<children>' +
      '<number role="integer" font="normal" id="7">3</number>' +
      '</children>' +
      '</cell>' +
      '</children>' +
      '</row>' +
      '<row role="matrix" id="14">' +
      '<children>' +
      '<cell role="matrix" id="11">' +
      '<children>' +
      '<number role="integer" font="normal" id="10">4</number>' +
      '</children>' +
      '</cell>' +
      '<cell role="matrix" id="13">' +
      '<children>' +
      '<number role="integer" font="normal" id="12">5</number>' +
      '</children>' +
      '</cell>' +
      '</children>' +
      '</row>' +
      '</children>' +
      '</matrix>');

  this.executeTreeTest(
      '<mfenced open="|" close="|"><mtable>' +
      '<mtr><mtd><mn>0</mn></mtd><mtd><mn>1</mn></mtd></mtr>' +
      '<mtr><mtd><mn>2</mn></mtd><mtd><mn>3</mn></mtd></mtr>' +
      '</mtable></mfenced>',
      '<matrix role="determinant" id="10">' +
      '<content>' +
      '<fence role="neutral" id="11">|</fence>' +
      '<fence role="neutral" id="12">|</fence>' +
      '</content>' +
      '<children>' +
      '<row role="determinant" id="4">' +
      '<children>' +
      '<cell role="determinant" id="1">' +
      '<children>' +
      '<number role="integer" font="normal" id="0">0</number>' +
      '</children>' +
      '</cell>' +
      '<cell role="determinant" id="3">' +
      '<children>' +
      '<number role="integer" font="normal" id="2">1</number>' +
      '</children>' +
      '</cell>' +
      '</children>' +
      '</row>' +
      '<row role="determinant" id="9">' +
      '<children>' +
      '<cell role="determinant" id="6">' +
      '<children>' +
      '<number role="integer" font="normal" id="5">2</number>' +
      '</children>' +
      '</cell>' +
      '<cell role="determinant" id="8">' +
      '<children>' +
      '<number role="integer" font="normal" id="7">3</number>' +
      '</children>' +
      '</cell>' +
      '</children>' +
      '</row>' +
      '</children>' +
      '</matrix>');

  this.executeTreeTest(
      '<mfenced open="(" close=")"><mtable>' +
      '<mtr><mtd><mn>0</mn></mtd><mtd><mn>1</mn></mtd>' +
      '<mtd><mn>2</mn></mtd><mtd><mn>3</mn></mtd></mtr>' +
      '</mtable></mfenced>',
      '<matrix role="rowvector" id="9">' +
      '<content>' +
      '<fence role="open" id="10">(</fence>' +
      '<fence role="close" id="11">)</fence>' +
      '</content>' +
      '<children>' +
      '<row role="rowvector" id="8">' +
      '<children>' +
      '<cell role="rowvector" id="1">' +
      '<children>' +
      '<number role="integer" font="normal" id="0">0</number>' +
      '</children>' +
      '</cell>' +
      '<cell role="rowvector" id="3">' +
      '<children>' +
      '<number role="integer" font="normal" id="2">1</number>' +
      '</children>' +
      '</cell>' +
      '<cell role="rowvector" id="5">' +
      '<children>' +
      '<number role="integer" font="normal" id="4">2</number>' +
      '</children>' +
      '</cell>' +
      '<cell role="rowvector" id="7">' +
      '<children>' +
      '<number role="integer" font="normal" id="6">3</number>' +
      '</children>' +
      '</cell>' +
      '</children>' +
      '</row>' +
      '</children>' +
      '</matrix>');
};


/**
 * Variations of vectors and their roles as determinants or binomial
 * coefficients.
 */
sre.SemanticTreeTest.prototype.testStreeVectors = function() {
  this.brief = false;
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
      '<mfenced open="(" close=")"><mtable>' +
      '<mtr><mtd><mi>n</mi></mtd></mtr><mtr><mtd><mi>k</mi></mtd></mtr>' +
      '</mtable></mfenced>',
      '<vector role="binomial" id="6">' +
      '<content>' +
      '<fence role="open" id="7">(</fence>' +
      '<fence role="close" id="8">)</fence>' +
      '</content>' +
      '<children>' +
      '<line role="binomial" id="2">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="0">n</identifier>' +
      '</children>' +
      '</line>' +
      '<line role="binomial" id="5">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="3">k</identifier>' +
      '</children>' +
      '</line>' +
      '</children>' +
      '</vector>');

  this.executeTreeTest(
      '<mfenced open="|" close="|"><mtable>' +
      '<mtr><mtd><mi>n</mi></mtd></mtr>' +
      '</mtable></mfenced>',
      '<vector role="determinant" id="3">' +
      '<content>' +
      '<fence role="neutral" id="4">|</fence>' +
      '<fence role="neutral" id="5">|</fence>' +
      '</content>' +
      '<children>' +
      '<line role="determinant" id="2">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="0">n</identifier>' +
      '</children>' +
      '</line>' +
      '</children>' +
      '</vector>');

  this.executeTreeTest(
      '<mfenced open="(" close=")"><mtable>' +
      '<mtr><mtd><mi>n</mi></mtd></mtr>' +
      '</mtable></mfenced>',
      '<vector role="squarematrix" id="3">' +
      '<content>' +
      '<fence role="open" id="4">(</fence>' +
      '<fence role="close" id="5">)</fence>' +
      '</content>' +
      '<children>' +
      '<line role="squarematrix" id="2">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="0">n</identifier>' +
      '</children>' +
      '</line>' +
      '</children>' +
      '</vector>');

};


/**
 * Variations of tables representing case statements,
 * multiline equations and regular tables.
 */
sre.SemanticTreeTest.prototype.testStreeTables = function() {
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
      '<identifier role="latinletter" font="italic" id="1">a</identifier>' +
      '</children>' +
      '</cell>' +
      '<cell role="cases" id="4">' +
      '<children>' +
      '<text role="unknown" font="normal" id="3">often</text>' +
      '</children>' +
      '</cell>' +
      '</children>' +
      '</row>' +
      '<row role="cases" id="10">' +
      '<children>' +
      '<cell role="cases" id="7">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="6">b</identifier>' +
      '</children>' +
      '</cell>' +
      '<cell role="cases" id="9">' +
      '<children>' +
      '<text role="unknown" font="normal" id="8">sometimes</text>' +
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
      '<identifier role="latinletter" font="italic" id="3">a</identifier>' +
      '</children>' +
      '</cell>' +
      '<cell role="cases" id="6">' +
      '<children>' +
      '<text role="unknown" font="normal" id="5">often</text>' +
      '</children>' +
      '</cell>' +
      '</children>' +
      '</row>' +
      '<row role="cases" id="12">' +
      '<children>' +
      '<cell role="cases" id="9">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="8">b</identifier>' +
      '</children>' +
      '</cell>' +
      '<cell role="cases" id="11">' +
      '<children>' +
      '<text role="unknown" font="normal" id="10">sometimes</text>' +
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
      '<identifier role="latinletter" font="italic" id="1">a</identifier>' +
      '</children>' +
      '</cell>' +
      '<cell role="cases" id="4">' +
      '<children>' +
      '<text role="unknown" font="normal" id="3">often</text>' +
      '</children>' +
      '</cell>' +
      '</children>' +
      '</row>' +
      '<row role="cases" id="10">' +
      '<children>' +
      '<cell role="cases" id="7">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="6">b</identifier>' +
      '</children>' +
      '</cell>' +
      '<cell role="cases" id="9">' +
      '<children>' +
      '<text role="unknown" font="normal" id="8">sometimes</text>' +
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
      '<punctuation role="comma" id="12">,</punctuation>' +
      '<punctuation role="comma" id="14">,</punctuation>' +
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
      '<identifier role="latinletter" font="italic" id="1">a</identifier>' +
      '</children>' +
      '</cell>' +
      '<cell role="cases" id="4">' +
      '<children>' +
      '<text role="unknown" font="normal" id="3">often</text>' +
      '</children>' +
      '</cell>' +
      '</children>' +
      '</row>' +
      '<row role="cases" id="10">' +
      '<children>' +
      '<cell role="cases" id="7">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="6">b</identifier>' +
      '</children>' +
      '</cell>' +
      '<cell role="cases" id="9">' +
      '<children>' +
      '<text role="unknown" font="normal" id="8">sometimes</text>' +
      '</children>' +
      '</cell>' +
      '</children>' +
      '</row>' +
      '</children>' +
      '</cases>' +
      '<punctuation role="comma" id="12">,</punctuation>' +
      '<identifier role="latinletter" font="italic" id="13">b</identifier>' +
      '<punctuation role="comma" id="14">,</punctuation>' +
      '<identifier role="latinletter" font="italic" id="15">c</identifier>' +
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
      '<punctuation role="comma" id="14">,</punctuation>' +
      '<punctuation role="comma" id="16">,</punctuation>' +
      '<punctuation role="fullstop" id="18">.</punctuation>' +
      '</content>' +
      '<children>' +
      '<cases role="binomial" id="13">' +
      '<content>' +
      '<punctuation role="openfence" id="0">{</punctuation>' +
      '</content>' +
      '<children>' +
      '<line role="binomial" id="6">' +
      '<children>' +
      '<punctuated role="sequence" id="4">' +
      '<content>' +
      '<punctuation role="comma" id="2">,</punctuation>' +
      '</content>' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="1">a</identifier>' +
      '<punctuation role="comma" id="2">,</punctuation>' +
      '<text role="unknown" font="normal" id="3">often</text>' +
      '</children>' +
      '</punctuated>' +
      '</children>' +
      '</line>' +
      '<line role="binomial" id="12">' +
      '<children>' +
      '<punctuated role="sequence" id="10">' +
      '<content>' +
      '<punctuation role="comma" id="8">,</punctuation>' +
      '</content>' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="7">b</identifier>' +
      '<punctuation role="comma" id="8">,</punctuation>' +
      '<text role="unknown" font="normal" id="9">sometimes</text>' +
      '</children>' +
      '</punctuated>' +
      '</children>' +
      '</line>' +
      '</children>' +
      '</cases>' +
      '<punctuation role="comma" id="14">,</punctuation>' +
      '<identifier role="latinletter" font="italic" id="15">b</identifier>' +
      '<punctuation role="comma" id="16">,</punctuation>' +
      '<identifier role="latinletter" font="italic" id="17">c</identifier>' +
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
      '<identifier role="latinletter" font="italic" id="0">x</identifier>' +
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
      '<identifier role="latinletter" font="italic" id="6">y</identifier>' +
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
      '<identifier role="latinletter" font="italic" id="12">x</identifier>' +
      '<identifier role="latinletter" font="italic" id="13">y</identifier>' +
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
      '<identifier role="latinletter" font="italic" id="0">x</identifier>' +
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
      '<identifier role="latinletter" font="italic" id="7">y</identifier>' +
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
      '<identifier role="latinletter" font="italic" id="14">x</identifier>' +
      '<identifier role="latinletter" font="italic" id="15">y</identifier>' +
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

// Missing: MatricesWithIgnores


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
      '<function>lim</function>' +
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
      '<function>lim</function>' +
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
      '<function>lim</function>' +
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
      '<function>lim</function>' +
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
      '<function>liminf</function>' +
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
      '<function>limsup</function>' +
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
      '<function>lim</function>' +
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
      '<mi>\u221E</mi></mrow></munder><munder><mi>lim</mi><mrow><mi>y</mi>' +
      '<mo>\u2192</mo><mi>\u221E</mi></mrow></munder><mi>x</mi>' +
      '<mi>y</mi></mrow>',
      '<appl>' +
      '<content>' +
      '<punctuation>\u2061</punctuation>' +
      '<function>lim</function>' +
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
      '<function>lim</function>' +
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
      '<identifier>y</identifier>' +
      '<identifier>\u221E</identifier>' +
      '</children>' +
      '</relseq>' +
      '</children>' +
      '</limlower>' +
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
      '</appl>');
};


/**
 * Limit functions without arguments.
 */
sre.SemanticTreeTest.prototype.testStreeLimitFunctionsNoArgs = function() {
  this.brief = true;
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
      '<function>liminf</function>' +
      '<function>limsup</function>' +
      '</children>' +
      '</infixop>' +
      '<function>lim</function>' +
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
      '<content><largeop>\u2211</largeop></content>' +
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
      '<msup><mi>n</mi><mi>m</mi></msup></mrow>',
      '<bigop>' +
      '<content><largeop>\u2211</largeop></content>' +
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
      '<content><largeop>\u2211</largeop></content>' +
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
      '<content><largeop>\u2211</largeop></content>' +
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
 * Big operators without Arguments.
 */
sre.SemanticTreeTest.prototype.testStreeBigOpsNoArgs = function() {
  this.brief = true;
  this.executeTreeTest(
      '<mi>\u2211</mi>',
      '<largeop>\u2211</largeop>'
  );
  this.executeTreeTest(
      '<munder><mi>\u220F</mi><mi>n</mi></munder>',
      '<limlower>' +
      '<children>' +
      '<largeop>\u220F</largeop>' +
      '<identifier>n</identifier>' +
      '</children>' +
      '</limlower>'
  );
  this.executeTreeTest(
      '<munderover><mi>\u2211</mi><mrow><mi>n</mi><mo>=</mo><mn>0</mn>' +
      '</mrow><mi>\u221E</mi></munderover>',
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
      '</limboth>'
  );
  this.executeTreeTest(
      '<mi>\u2211</mi><mo>+</mo><mi>\u2211</mi><mo>=</mo><mi>\u2211</mi>',
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
      '<largeop>\u2211</largeop>' +
      '<largeop>\u2211</largeop>' +
      '</children>' +
      '</infixop>' +
      '<largeop>\u2211</largeop>' +
      '</children>' +
      '</relseq>'
  );
  this.executeTreeTest(
      '<munder><mi>\u220F</mi><mi>n</mi></munder><mo>+</mo>' +
      '<munder><mi>\u220F</mi><mi>m</mi></munder><mo>=</mo>' +
      '<munder><mi>\u220F</mi><mrow><mi>n</mi><mo>,</mo><mi>m</mi>' +
      '</mrow></munder>',
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
      '<limlower>' +
      '<children>' +
      '<largeop>\u220F</largeop>' +
      '<identifier>n</identifier>' +
      '</children>' +
      '</limlower>' +
      '<limlower>' +
      '<children>' +
      '<largeop>\u220F</largeop>' +
      '<identifier>m</identifier>' +
      '</children>' +
      '</limlower>' +
      '</children>' +
      '</infixop>' +
      '<limlower>' +
      '<children>' +
      '<largeop>\u220F</largeop>' +
      '<punctuated>' +
      '<content>' +
      '<punctuation>,</punctuation>' +
      '</content>' +
      '<children>' +
      '<identifier>n</identifier>' +
      '<punctuation>,</punctuation>' +
      '<identifier>m</identifier>' +
      '</children>' +
      '</punctuated>' +
      '</children>' +
      '</limlower>' +
      '</children>' +
      '</relseq>'
  );
  this.executeTreeTest(
      '<mrow><munderover><mi>\u2211</mi><mrow><mi>n</mi><mo>=</mo><mn>0</mn>' +
      '</mrow><mi>\u221E</mi></munderover><mo>+</mo>' +
      '<munderover><mi>\u2211</mi><mrow><mi>m</mi><mo>=</mo><mn>0</mn>' +
      '</mrow><mi>\u221E</mi></munderover><mo>=</mo>' +
      '<munderover><mi>\u2211</mi><mrow><mi>n</mi><mo>,</mo><mi>m</mi>' +
      '<mo>=</mo><mn>0</mn></mrow><mi>\u221E</mi></munderover></mrow>',
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
      '</children>' +
      '</infixop>' +
      '<limboth>' +
      '<children>' +
      '<largeop>\u2211</largeop>' +
      '<punctuated>' +
      '<content>' +
      '<punctuation>,</punctuation>' +
      '</content>' +
      '<children>' +
      '<identifier>n</identifier>' +
      '<punctuation>,</punctuation>' +
      '<relseq>=' +
      '<content>' +
      '<relation>=</relation>' +
      '</content>' +
      '<children>' +
      '<identifier>m</identifier>' +
      '<number>0</number>' +
      '</children>' +
      '</relseq>' +
      '</children>' +
      '</punctuated>' +
      '<identifier>\u221E</identifier>' +
      '</children>' +
      '</limboth>' +
      '</children>' +
      '</relseq>'
  );
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
      '<content><largeop>\u222B</largeop></content>' +
      '<children>' +
      '<largeop>\u222B</largeop>' +
      '<empty/>' +
      '<identifier>dx</identifier>' +
      '</children>' +
      '</integral>');

  this.executeTreeTest(
      '<mrow><mi>\u222B</mi><mi>x</mi><mi>dx</mi></mrow>',
      '<integral>' +
      '<content><largeop>\u222B</largeop></content>' +
      '<children>' +
      '<largeop>\u222B</largeop>' +
      '<identifier>x</identifier>' +
      '<identifier>dx</identifier>' +
      '</children>' +
      '</integral>');

  this.executeTreeTest(
      '<mrow><mi>\u222B</mi><mi>x</mi><mi>d</mi><mi>x</mi></mrow>',
      '<integral>' +
      '<content><largeop>\u222B</largeop></content>' +
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
      '<mrow><mi>\u222B</mi><mi>x</mi><mo>+</mo><mi>y</mi><mi>d</mi>' +
      '<mi>x</mi></mrow>',
      '<integral>' +
      '<content><largeop>\u222B</largeop></content>' +
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
      '<munder><mi>\u222B</mi><mi>X</mi></munder>',
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
      '<content><largeop>\u222B</largeop></content>' +
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
      '<munder><mi>\u222B</mi><mi>X</mi></munder><mi>x</mi><mi>dx</mi>',
      '<integral>' +
      '<content><largeop>\u222B</largeop></content>' +
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
      '<content><largeop>\u222B</largeop></content>' +
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
      '<content><largeop>\u222B</largeop></content>' +
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
      '<content><largeop>\u222B</largeop></content>' +
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
      '<mi>\u222B</mi><mi>\u222B</mi><mi>\u222B</mi>' +
      '<mi>dx</mi><mi>dy</mi><mi>dz</mi>',
      '<integral>' +
      '<content><largeop>\u222B</largeop></content>' +
      '<children>' +
      '<largeop>\u222B</largeop>' +
      '<integral>' +
      '<content><largeop>\u222B</largeop></content>' +
      '<children>' +
      '<largeop>\u222B</largeop>' +
      '<integral>' +
      '<content><largeop>\u222B</largeop></content>' +
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

  this.executeTreeTest(
      '<msub><mo>\u222B</mo><mi>X</mi></msub><mrow><msub><mo>\u2211</mo>' +
      '<mi>Y</mi></msub><mi>a</mi></mrow><mi>dx</mi>',
      '<integral>' +
      '<content>' +
      '<largeop>\u222B</largeop>' +
      '</content>' +
      '<children>' +
      '<limlower>' +
      '<children>' +
      '<largeop>\u222B</largeop>' +
      '<identifier>X</identifier>' +
      '</children>' +
      '</limlower>' +
      '<bigop>' +
      '<content>' +
      '<largeop>\u2211</largeop>' +
      '</content>' +
      '<children>' +
      '<limlower>' +
      '<children>' +
      '<largeop>\u2211</largeop>' +
      '<identifier>Y</identifier>' +
      '</children>' +
      '</limlower>' +
      '<identifier>a</identifier>' +
      '</children>' +
      '</bigop>' +
      '<identifier>dx</identifier>' +
      '</children>' +
      '</integral>'
  );
};


/**
 * Translation of text elements.
 */
sre.SemanticTreeTest.prototype.testStreeText = function() {
  this.brief = false;
  this.executeTreeTest(
      '<mtext>text only</mtext>',
      '<text role="unknown" font="normal" id="0">text only</text>'
  );

  this.executeTreeTest(
      '<mi>a</mi><mtext>to</mtext>',
      '<punctuated role="text" id="3">' +
      '<content>' +
      '<punctuation role="dummy" id="2">\u2063</punctuation>' +
      '</content>' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="0">a</identifier>' +
      '<text role="unknown" font="normal" id="1">to</text>' +
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
      '<text role="unknown" font="normal" id="0">to</text>' +
      '<identifier role="latinletter" font="italic" id="1">b</identifier>' +
      '</children>' +
      '</punctuated>'
  );

  this.executeTreeTest(
      '<mi>a</mi><mtext>to</mtext><mi>b</mi><mtext>to</mtext><mi>c</mi>',
      '<punctuated role="text" id="9">' +
      '<content>' +
      '<punctuation role="dummy" id="5">\u2063</punctuation>' +
      '<punctuation role="dummy" id="6">\u2063</punctuation>' +
      '<punctuation role="dummy" id="7">\u2063</punctuation>' +
      '<punctuation role="dummy" id="8">\u2063</punctuation>' +
      '</content>' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="0">a</identifier>' +
      '<text role="unknown" font="normal" id="1">to</text>' +
      '<identifier role="latinletter" font="italic" id="2">b</identifier>' +
      '<text role="unknown" font="normal" id="3">to</text>' +
      '<identifier role="latinletter" font="italic" id="4">c</identifier>' +
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
      '<punctuation>\u2063</punctuation>' +
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
      '<mfenced close=")"/>',
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
      '<mfenced open="[" close="]" separators="+"><mi>x</mi><mfrac>' +
      '<mi>x</mi><mi>y</mi></mfrac><mn>5</mn></mfenced>',
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

  this.executeTreeTest(
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
      '</mfenced>',
      '<fenced>' +
      '<content>' +
      '<fence>[</fence>' +
      '<fence>]</fence>' +
      '</content>' +
      '<children>' +
      '<punctuated>' +
      '<content>' +
      '<punctuation>;</punctuation>' +
      '<punctuation>;</punctuation>' +
      '<punctuation>;</punctuation>' +
      '</content>' +
      '<children>' +
      '<infixop>-' +
      '<content>' +
      '<operator>-</operator>' +
      '</content>' +
      '<children>' +
      '<infixop>+' +
      '<content>' +
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
      '</children>' +
      '</infixop>' +
      '<number>5</number>' +
      '</children>' +
      '</infixop>' +
      '<punctuation>;</punctuation>' +
      '<number>5</number>' +
      '<punctuation>;</punctuation>' +
      '<number>5</number>' +
      '<punctuation>;</punctuation>' +
      '<number>5</number>' +
      '</children>' +
      '</punctuated>' +
      '</children>' +
      '</fenced>'
  );

  this.executeTreeTest(
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
      '</mfenced>',
      '<fenced>' +
      '<content>' +
      '<fence>[</fence>' +
      '<fence>]</fence>' +
      '</content>' +
      '<children>' +
      '<punctuated>' +
      '<content>' +
      '<punctuation>,</punctuation>' +
      '<punctuation>,</punctuation>' +
      '<punctuation>,</punctuation>' +
      '<punctuation>,</punctuation>' +
      '<punctuation>,</punctuation>' +
      '</content>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '<punctuation>,</punctuation>' +
      '<fraction>' +
      '<children>' +
      '<identifier>x</identifier>' +
      '<identifier>y</identifier>' +
      '</children>' +
      '</fraction>' +
      '<punctuation>,</punctuation>' +
      '<number>5</number>' +
      '<punctuation>,</punctuation>' +
      '<number>5</number>' +
      '<punctuation>,</punctuation>' +
      '<number>5</number>' +
      '<punctuation>,</punctuation>' +
      '<number>5</number>' +
      '</children>' +
      '</punctuated>' +
      '</children>' +
      '</fenced>'
  );

  this.executeTreeTest(
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
      '</mfenced>',
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>]</fence>' +
      '</content>' +
      '<children>' +
      '<infixop>\u2062' +
      '<content>' +
      '<operator>\u2062</operator>' +
      '<operator>\u2062</operator>' +
      '<operator>\u2062</operator>' +
      '<operator>\u2062</operator>' +
      '<operator>\u2062</operator>' +
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
      '<number>5</number>' +
      '<number>5</number>' +
      '<number>5</number>' +
      '</children>' +
      '</infixop>' +
      '</children>' +
      '</fenced>'
  );

  this.executeTreeTest(
      '<mfenced close="]">' +
      '<mn>1</mn>' +
      '<mn>2</mn>' +
      '<mn>3</mn>' +
      '<mn>4</mn>' +
      '</mfenced>',
      '<fenced>' +
      '<content>' +
      '<fence>(</fence>' +
      '<fence>]</fence>' +
      '</content>' +
      '<children>' +
      '<punctuated>' +
      '<content>' +
      '<punctuation>,</punctuation>' +
      '<punctuation>,</punctuation>' +
      '<punctuation>,</punctuation>' +
      '</content>' +
      '<children>' +
      '<number>1</number>' +
      '<punctuation>,</punctuation>' +
      '<number>2</number>' +
      '<punctuation>,</punctuation>' +
      '<number>3</number>' +
      '<punctuation>,</punctuation>' +
      '<number>4</number>' +
      '</children>' +
      '</punctuated>' +
      '</children>' +
      '</fenced>'
  );

  this.executeTreeTest(
      '<mfenced>' +
      '<mn>1</mn>' +
      '<mn>2</mn>' +
      '<mn>3</mn>' +
      '<mn>4</mn>' +
      '</mfenced>',
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
      '<punctuation>,</punctuation>' +
      '</content>' +
      '<children>' +
      '<number>1</number>' +
      '<punctuation>,</punctuation>' +
      '<number>2</number>' +
      '<punctuation>,</punctuation>' +
      '<number>3</number>' +
      '<punctuation>,</punctuation>' +
      '<number>4</number>' +
      '</children>' +
      '</punctuated>' +
      '</children>' +
      '</fenced>'
  );

  this.executeTreeTest(
      '<mfenced open="[">' +
      '<mn>1</mn>' +
      '<mn>2</mn>' +
      '<mn>3</mn>' +
      '<mn>4</mn>' +
      '</mfenced>',
      '<fenced>' +
      '<content>' +
      '<fence>[</fence>' +
      '<fence>)</fence>' +
      '</content>' +
      '<children>' +
      '<punctuated>' +
      '<content>' +
      '<punctuation>,</punctuation>' +
      '<punctuation>,</punctuation>' +
      '<punctuation>,</punctuation>' +
      '</content>' +
      '<children>' +
      '<number>1</number>' +
      '<punctuation>,</punctuation>' +
      '<number>2</number>' +
      '<punctuation>,</punctuation>' +
      '<number>3</number>' +
      '<punctuation>,</punctuation>' +
      '<number>4</number>' +
      '</children>' +
      '</punctuated>' +
      '</children>' +
      '</fenced>'
  );

  this.executeTreeTest(
      '<mfenced open="[" close="">' +
      '<mn>1</mn>' +
      '<mn>2</mn>' +
      '<mn>3</mn>' +
      '<mn>4</mn>' +
      '</mfenced>',
      '<punctuated>' +
      '<content>' +
      '<punctuation>[</punctuation>' +
      '<punctuation>,</punctuation>' +
      '<punctuation>,</punctuation>' +
      '<punctuation>,</punctuation>' +
      '</content>' +
      '<children>' +
      '<punctuation>[</punctuation>' +
      '<number>1</number>' +
      '<punctuation>,</punctuation>' +
      '<number>2</number>' +
      '<punctuation>,</punctuation>' +
      '<number>3</number>' +
      '<punctuation>,</punctuation>' +
      '<number>4</number>' +
      '</children>' +
      '</punctuated>'
  );

  this.executeTreeTest(
      '<mfenced open="" close="]">' +
      '<mn>1</mn>' +
      '<mn>2</mn>' +
      '<mn>3</mn>' +
      '<mn>4</mn>' +
      '</mfenced>',
      '<punctuated>' +
      '<content>' +
      '<punctuation>,</punctuation>' +
      '<punctuation>,</punctuation>' +
      '<punctuation>,</punctuation>' +
      '<punctuation>]</punctuation>' +
      '</content>' +
      '<children>' +
      '<number>1</number>' +
      '<punctuation>,</punctuation>' +
      '<number>2</number>' +
      '<punctuation>,</punctuation>' +
      '<number>3</number>' +
      '<punctuation>,</punctuation>' +
      '<number>4</number>' +
      '<punctuation>]</punctuation>' +
      '</children>' +
      '</punctuated>'
  );

  this.executeTreeTest(
      '<mfenced open=" " close=" " separators=" ">' +
      '<mn>1</mn>' +
      '<mn>2</mn>' +
      '<mn>3</mn>' +
      '<mn>4</mn>' +
      '</mfenced>',
      '<infixop>\u2062' +
      '<content>' +
      '<operator>\u2062</operator>' +
      '<operator>\u2062</operator>' +
      '<operator>\u2062</operator>' +
      '</content>' +
      '<children>' +
      '<number>1</number>' +
      '<number>2</number>' +
      '<number>3</number>' +
      '<number>4</number>' +
      '</children>' +
      '</infixop>'
  );

  this.executeTreeTest(
      '<mfenced open="55" close=" ">' +
      '<mn>1</mn>' +
      '<mn>2</mn>' +
      '<mn>3</mn>' +
      '<mn>4</mn>' +
      '</mfenced>',
      '<punctuated>' +
      '<content>' +
      '<punctuation>,</punctuation>' +
      '<punctuation>,</punctuation>' +
      '<punctuation>,</punctuation>' +
      '</content>' +
      '<children>' +
      '<infixop>\u2062' +
      '<content>' +
      '<operator>\u2062</operator>' +
      '</content>' +
      '<children>' +
      '<unknown>55</unknown>' +
      '<number>1</number>' +
      '</children>' +
      '</infixop>' +
      '<punctuation>,</punctuation>' +
      '<number>2</number>' +
      '<punctuation>,</punctuation>' +
      '<number>3</number>' +
      '<punctuation>,</punctuation>' +
      '<number>4</number>' +
      '</children>' +
      '</punctuated>'
  );

  this.executeTreeTest(
      '<mfenced open="" close="" separators="">' +
      '<mn>1</mn>' +
      '<mn>2</mn>' +
      '<mn>3</mn>' +
      '<mn>4</mn>' +
      '</mfenced>',
      '<infixop>\u2062' +
      '<content>' +
      '<operator>\u2062</operator>' +
      '<operator>\u2062</operator>' +
      '<operator>\u2062</operator>' +
      '</content>' +
      '<children>' +
      '<number>1</number>' +
      '<number>2</number>' +
      '<number>3</number>' +
      '<number>4</number>' +
      '</children>' +
      '</infixop>'
  );

  this.executeTreeTest(
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
      '</mrow>',
      '<relseq>\u2260' +
      '<content>' +
      '<relation>\u2260</relation>' +
      '</content>' +
      '<children>' +
      '<fenced>' +
      '<content>' +
      '<fence>|</fence>' +
      '<fence>|</fence>' +
      '</content>' +
      '<children>' +
      '<infixop>\u00b1' +
      '<content>' +
      '<operator>\u00b1</operator>' +
      '</content>' +
      '<children>' +
      '<identifier>a</identifier>' +
      '<fenced>' +
      '<content>' +
      '<fence>|</fence>' +
      '<fence>|</fence>' +
      '</content>' +
      '<children>' +
      '<infixop>-' +
      '<content>' +
      '<operator>-</operator>' +
      '</content>' +
      '<children>' +
      '<identifier>b</identifier>' +
      '<identifier>c</identifier>' +
      '</children>' +
      '</infixop>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</infixop>' +
      '</children>' +
      '</fenced>' +
      '<infixop>\u00b1' +
      '<content>' +
      '<operator>\u00b1</operator>' +
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
      '<fenced>' +
      '<content>' +
      '<fence>|</fence>' +
      '<fence>|</fence>' +
      '</content>' +
      '<children>' +
      '<infixop>-' +
      '<content>' +
      '<operator>-</operator>' +
      '</content>' +
      '<children>' +
      '<identifier>b</identifier>' +
      '<identifier>c</identifier>' +
      '</children>' +
      '</infixop>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</infixop>' +
      '</children>' +
      '</relseq>'
  );
};


/**
 * Punctuated elements.
 */
sre.SemanticTreeTest.prototype.testStreePunctuated = function() {
  this.brief = false;
  this.executeTreeTest(
      '<mi>a</mi><mo>,</mo><mi>b</mi><mo>,</mo><mi>c</mi><mo>,</mo><mi>d</mi>',
      '<punctuated role="sequence" id="7">' +
      '<content>' +
      '<punctuation role="comma" id="1">,</punctuation>' +
      '<punctuation role="comma" id="3">,</punctuation>' +
      '<punctuation role="comma" id="5">,</punctuation>' +
      '</content>' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="0">a</identifier>' +
      '<punctuation role="comma" id="1">,</punctuation>' +
      '<identifier role="latinletter" font="italic" id="2">b</identifier>' +
      '<punctuation role="comma" id="3">,</punctuation>' +
      '<identifier role="latinletter" font="italic" id="4">c</identifier>' +
      '<punctuation role="comma" id="5">,</punctuation>' +
      '<identifier role="latinletter" font="italic" id="6">d</identifier>' +
      '</children>' +
      '</punctuated>');
  this.executeTreeTest(
      '<mo>,</mo><mi>b</mi><mo>,</mo><mi>c</mi><mo>,</mo><mi>d</mi>',
      '<punctuated role="sequence" id="6">' +
      '<content>' +
      '<punctuation role="comma" id="0">,</punctuation>' +
      '<punctuation role="comma" id="2">,</punctuation>' +
      '<punctuation role="comma" id="4">,</punctuation>' +
      '</content>' +
      '<children>' +
      '<punctuation role="comma" id="0">,</punctuation>' +
      '<identifier role="latinletter" font="italic" id="1">b</identifier>' +
      '<punctuation role="comma" id="2">,</punctuation>' +
      '<identifier role="latinletter" font="italic" id="3">c</identifier>' +
      '<punctuation role="comma" id="4">,</punctuation>' +
      '<identifier role="latinletter" font="italic" id="5">d</identifier>' +
      '</children>' +
      '</punctuated>');
  this.executeTreeTest(
      '<msub><mi>b</mi><mn>1</mn></msub><mo>!</mo>',
      '<punctuated role="endpunct" id="4">' +
      '<content>' +
      '<punctuation role="unknown" id="3">!</punctuation>' +
      '</content>' +
      '<children>' +
      '<subscript role="latinletter" id="2">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="0">b</identifier>' +
      '<number role="integer" font="normal" id="1">1</number>' +
      '</children>' +
      '</subscript>' +
      '<punctuation role="unknown" id="3">!</punctuation>' +
      '</children>' +
      '</punctuated>');
  this.executeTreeTest(
      '<mo>:</mo><msub><mi>b</mi><mn>1</mn></msub>',
      '<punctuated role="startpunct" id="4">' +
      '<content>' +
      '<punctuation role="colon" id="0">:</punctuation>' +
      '</content>' +
      '<children>' +
      '<punctuation role="colon" id="0">:</punctuation>' +
      '<subscript role="latinletter" id="3">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="1">b</identifier>' +
      '<number role="integer" font="normal" id="2">1</number>' +
      '</children>' +
      '</subscript>' +
      '</children>' +
      '</punctuated>');
  this.executeTreeTest(
      '<mo>:</mo><msub><mi>b</mi><mn>1</mn></msub><mo>!</mo>',
      '<punctuated role="sequence" id="5">' +
      '<content>' +
      '<punctuation role="colon" id="0">:</punctuation>' +
      '<punctuation role="unknown" id="4">!</punctuation>' +
      '</content>' +
      '<children>' +
      '<punctuation role="colon" id="0">:</punctuation>' +
      '<subscript role="latinletter" id="3">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="1">b</identifier>' +
      '<number role="integer" font="normal" id="2">1</number>' +
      '</children>' +
      '</subscript>' +
      '<punctuation role="unknown" id="4">!</punctuation>' +
      '</children>' +
      '</punctuated>');
  this.executeTreeTest(
      '<mo>,</mo><mo>,</mo><mo>,</mo><mo>!</mo>',
      '<punctuated role="sequence" id="4">' +
      '<content>' +
      '<punctuation role="comma" id="0">,</punctuation>' +
      '<punctuation role="comma" id="1">,</punctuation>' +
      '<punctuation role="comma" id="2">,</punctuation>' +
      '<punctuation role="unknown" id="3">!</punctuation>' +
      '</content>' +
      '<children>' +
      '<punctuation role="comma" id="0">,</punctuation>' +
      '<punctuation role="comma" id="1">,</punctuation>' +
      '<punctuation role="comma" id="2">,</punctuation>' +
      '<punctuation role="unknown" id="3">!</punctuation>' +
      '</children>' +
      '</punctuated>');
  this.executeTreeTest(
      '<mo>,</mo><mo>,</mo><mo>,</mo><mo>,</mo>',
      '<punctuated role="comma" id="4">' +
      '<content>' +
      '<punctuation role="comma" id="0">,</punctuation>' +
      '<punctuation role="comma" id="1">,</punctuation>' +
      '<punctuation role="comma" id="2">,</punctuation>' +
      '<punctuation role="comma" id="3">,</punctuation>' +
      '</content>' +
      '<children>' +
      '<punctuation role="comma" id="0">,</punctuation>' +
      '<punctuation role="comma" id="1">,</punctuation>' +
      '<punctuation role="comma" id="2">,</punctuation>' +
      '<punctuation role="comma" id="3">,</punctuation>' +
      '</children>' +
      '</punctuated>');
  this.executeTreeTest(
      '<mo>\'</mo><mo>\'</mo><mo>\'</mo><mo>\'</mo>',
      '<punctuated role="prime" id="4">' +
      '<content>' +
      '<punctuation role="prime" id="0">\'</punctuation>' +
      '<punctuation role="prime" id="1">\'</punctuation>' +
      '<punctuation role="prime" id="2">\'</punctuation>' +
      '<punctuation role="prime" id="3">\'</punctuation>' +
      '</content>' +
      '<children>' +
      '<punctuation role="prime" id="0">\'</punctuation>' +
      '<punctuation role="prime" id="1">\'</punctuation>' +
      '<punctuation role="prime" id="2">\'</punctuation>' +
      '<punctuation role="prime" id="3">\'</punctuation>' +
      '</children>' +
      '</punctuated>');
  this.executeTreeTest(
      '<mo>\'</mo><mo>\'</mo><mo>,</mo><mo>\'</mo>',
      '<punctuated role="sequence" id="4">' +
      '<content>' +
      '<punctuation role="prime" id="0">\'</punctuation>' +
      '<punctuation role="prime" id="1">\'</punctuation>' +
      '<punctuation role="comma" id="2">,</punctuation>' +
      '<punctuation role="prime" id="3">\'</punctuation>' +
      '</content>' +
      '<children>' +
      '<punctuation role="prime" id="0">\'</punctuation>' +
      '<punctuation role="prime" id="1">\'</punctuation>' +
      '<punctuation role="comma" id="2">,</punctuation>' +
      '<punctuation role="prime" id="3">\'</punctuation>' +
      '</children>' +
      '</punctuated>');
  this.executeTreeTest(
      '<mo>!</mo><mo>!</mo><mo>!</mo><mo>!</mo>',
      '<punctuated role="sequence" id="4">' +
      '<content>' +
      '<punctuation role="unknown" id="0">!</punctuation>' +
      '<punctuation role="unknown" id="1">!</punctuation>' +
      '<punctuation role="unknown" id="2">!</punctuation>' +
      '<punctuation role="unknown" id="3">!</punctuation>' +
      '</content>' +
      '<children>' +
      '<punctuation role="unknown" id="0">!</punctuation>' +
      '<punctuation role="unknown" id="1">!</punctuation>' +
      '<punctuation role="unknown" id="2">!</punctuation>' +
      '<punctuation role="unknown" id="3">!</punctuation>' +
      '</children>' +
      '</punctuated>');
};


// Units.
/**
 * Tests simple expressions containing units.
 */
sre.SemanticTreeTest.prototype.testStreeSimpleUnits = function() {
  this.brief = false;
  this.executeTreeTest(
      '<mi mathvariant="normal" class="MathML-Unit">km</mi>',
      '<identifier role="unit" font="normal" id="0">km</identifier>'
  );
  this.executeTreeTest(
      '<mi>min</mi><mi mathvariant="normal" class="MathML-Unit">min</mi>',
      '<appl role="limit function" id="3">' +
      '<content>' +
      '<punctuation role="application" id="2">⁡</punctuation>' +
      '<function role="limit function" font="normal" id="0">min</function>' +
      '</content>' +
      '<children>' +
      '<function role="limit function" font="normal" id="0">min</function>' +
      '<identifier role="unit" font="normal" id="1">min</identifier>' +
      '</children>' +
      '</appl>'
  );
  this.executeTreeTest(
      '<msup><mi mathvariant="normal" class="MathML-Unit">km</mi>' +
      '<mn>2</mn></msup>',
      '<superscript role="unit" id="2">' +
      '<children>' +
      '<identifier role="unit" font="normal" id="0">km</identifier>' +
      '<number role="integer" font="normal" id="1">2</number>' +
      '</children></superscript>'
  );
  this.executeTreeTest(
      '<mfrac><mi mathvariant="normal" class="MathML-Unit">km</mi>' +
      '<mi mathvariant="normal" class="MathML-Unit">h</mi></mfrac>',
      '<fraction role="unit" id="2">' +
      '<children>' +
      '<identifier role="unit" font="normal" id="0">km</identifier>' +
      '<identifier role="unit" font="normal" id="1">h</identifier>' +
      '</children></fraction>'
  );
  this.executeTreeTest(
      '<mfrac><mi>m</mi>' +
      '<mi mathvariant="normal" class="MathML-Unit">km</mi></mfrac>',
      '<fraction role="division" id="2">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="0">m</identifier>' +
      '<identifier role="unit" font="normal" id="1">km</identifier>' +
      '</children></fraction>'
  );
  this.executeTreeTest(
      '<mn>3</mn><mi mathvariant="normal" class="MathML-Unit">km</mi>',
      '<infixop role="implicit" id="3">\u2062' +
      '<content>' +
      '<operator role="multiplication" id="2">\u2062</operator>' +
      '</content>' +
      '<children>' +
      '<number role="integer" font="normal" id="0">3</number>' +
      '<identifier role="unit" font="normal" id="1">km</identifier>' +
      '</children>' +
      '</infixop>'
  );
  this.executeTreeTest(
      '<mn>3</mn><mi mathvariant="normal" class="MathML-Unit">km</mi>' +
      '<mi mathvariant="normal" class="MathML-Unit">h</mi>',
      '<infixop role="implicit" id="6">\u2062' +
      '<content>' +
      '<operator role="multiplication" id="5">\u2062</operator>' +
      '</content>' +
      '<children>' +
      '<number role="integer" font="normal" id="0">3</number>' +
      '<infixop role="unit" id="4">\u2062' +
      '<content>' +
      '<operator role="multiplication" id="3">\u2062</operator>' +
      '</content>' +
      '<children>' +
      '<identifier role="unit" font="normal" id="1">km</identifier>' +
      '<identifier role="unit" font="normal" id="2">h</identifier>' +
      '</children>' +
      '</infixop>' +
      '</children>' +
      '</infixop>'
  );
};


/**
 * Tests more complex expressions containing units.
 */
sre.SemanticTreeTest.prototype.testStreeComplexUnits = function() {
  this.brief = false;
  this.executeTreeTest(
      '<mi mathvariant="normal" class="MathML-Unit">s</mi>' +
      '<mn>3</mn><mi>m</mi>' +
      '<mi mathvariant="normal" class="MathML-Unit">km</mi>' +
      '<mi mathvariant="normal" class="MathML-Unit">h</mi>',
      '<infixop role="implicit" id="10">\u2062' +
      '<content>' +
      '<operator role="multiplication" id="7">\u2062</operator>' +
      '<operator role="multiplication" id="8">\u2062</operator>' +
      '<operator role="multiplication" id="9">\u2062</operator>' +
      '</content>' +
      '<children>' +
      '<identifier role="unit" font="normal" id="0">s</identifier>' +
      '<number role="integer" font="normal" id="1">3</number>' +
      '<identifier role="latinletter" font="italic" id="2">m</identifier>' +
      '<infixop role="unit" id="6">\u2062' +
      '<content>' +
      '<operator role="multiplication" id="5">\u2062</operator>' +
      '</content>' +
      '<children>' +
      '<identifier role="unit" font="normal" id="3">km</identifier>' +
      '<identifier role="unit" font="normal" id="4">h</identifier>' +
      '</children>' +
      '</infixop>' +
      '</children>' +
      '</infixop>'
  );
  this.executeTreeTest(
      '<mi mathvariant="normal" class="MathML-Unit">km</mi>' +
      '<msup>' +
      '<mi mathvariant="normal" class="MathML-Unit">s</mi>' +
      '<mn>2</mn></msup>' +
      '<mn>3</mn><mi>m</mi>' +
      '<mi mathvariant="normal" class="MathML-Unit">km</mi>' +
      '<mi mathvariant="normal" class="MathML-Unit">h</mi>',
      '<infixop role="implicit" id="15">\u2062' +
      '<content>' +
      '<operator role="multiplication" id="12">\u2062</operator>' +
      '<operator role="multiplication" id="13">\u2062</operator>' +
      '<operator role="multiplication" id="14">\u2062</operator>' +
      '</content>' +
      '<children>' +
      '<infixop role="unit" id="9">\u2062' +
      '<content>' +
      '<operator role="multiplication" id="8">\u2062</operator>' +
      '</content>' +
      '<children>' +
      '<identifier role="unit" font="normal" id="0">km</identifier>' +
      '<superscript role="unit" id="3">' +
      '<children>' +
      '<identifier role="unit" font="normal" id="1">s</identifier>' +
      '<number role="integer" font="normal" id="2">2</number>' +
      '</children></superscript>' +
      '</children>' +
      '</infixop>' +
      '<number role="integer" font="normal" id="4">3</number>' +
      '<identifier role="latinletter" font="italic" id="5">m</identifier>' +
      '<infixop role="unit" id="11">\u2062' +
      '<content>' +
      '<operator role="multiplication" id="10">\u2062</operator>' +
      '</content>' +
      '<children>' +
      '<identifier role="unit" font="normal" id="6">km</identifier>' +
      '<identifier role="unit" font="normal" id="7">h</identifier>' +
      '</children>' +
      '</infixop>' +
      '</children>' +
      '</infixop>'
  );
  this.executeTreeTest(
      '<mn>3</mn><mi>m</mi>' +
      '<mi mathvariant="normal" class="MathML-Unit">km</mi>' +
      '<mi mathvariant="normal" class="MathML-Unit">h</mi>' +
      '<mfrac>' +
      '<mi>N</mi>' +
      '<msup>' +
      '<mi mathvariant="normal" class="MathML-Unit">s</mi>' +
      '<mn>2</mn></msup></mfrac>',
      '<infixop role="implicit" id="14">\u2062' +
      '<content>' +
      '<operator role="multiplication" id="11">\u2062</operator>' +
      '<operator role="multiplication" id="12">\u2062</operator>' +
      '<operator role="multiplication" id="13">\u2062</operator>' +
      '</content>' +
      '<children>' +
      '<number role="integer" font="normal" id="0">3</number>' +
      '<identifier role="latinletter" font="italic" id="1">m</identifier>' +
      '<infixop role="unit" id="10">\u2062' +
      '<content>' +
      '<operator role="multiplication" id="9">\u2062</operator>' +
      '</content>' +
      '<children>' +
      '<identifier role="unit" font="normal" id="2">km</identifier>' +
      '<identifier role="unit" font="normal" id="3">h</identifier>' +
      '</children>' +
      '</infixop>' +
      '<fraction role="division" id="8">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="4">N</identifier>' +
      '<superscript role="unit" id="7">' +
      '<children>' +
      '<identifier role="unit" font="normal" id="5">s</identifier>' +
      '<number role="integer" font="normal" id="6">2</number>' +
      '</children></superscript>' +
      '</children>' +
      '</fraction>' +
      '</children>' +
      '</infixop>'
  );
  this.executeTreeTest(
      '<mn>3</mn><mi>m</mi>' +
      '<mi mathvariant="normal" class="MathML-Unit">km</mi>' +
      '<mi mathvariant="normal" class="MathML-Unit">h</mi>' +
      '<mfrac>' +
      '<mi mathvariant="normal" class="MathML-Unit">N</mi>' +
      '<msup>' +
      '<mi mathvariant="normal" class="MathML-Unit">s</mi>' +
      '<mn>2</mn></msup></mfrac>',
      '<infixop role="implicit" id="13">\u2062' +
      '<content>' +
      '<operator role="multiplication" id="11">\u2062</operator>' +
      '<operator role="multiplication" id="12">\u2062</operator>' +
      '</content>' +
      '<children>' +
      '<number role="integer" font="normal" id="0">3</number>' +
      '<identifier role="latinletter" font="italic" id="1">m</identifier>' +
      '<infixop role="unit" id="10">\u2062' +
      '<content>' +
      '<operator role="multiplication" id="9">\u2062</operator>' +
      '</content>' +
      '<children>' +
      '<identifier role="unit" font="normal" id="2">km</identifier>' +
      '<identifier role="unit" font="normal" id="3">h</identifier>' +
      '<fraction role="unit" id="8">' +
      '<children>' +
      '<identifier role="unit" font="normal" id="4">N</identifier>' +
      '<superscript role="unit" id="7">' +
      '<children>' +
      '<identifier role="unit" font="normal" id="5">s</identifier>' +
      '<number role="integer" font="normal" id="6">2</number>' +
      '</children></superscript>' +
      '</children>' +
      '</fraction>' +
      '</children>' +
      '</infixop>' +
      '</children>' +
      '</infixop>'
  );

};


// Tensors.
/**
 * Pathological multiscripts expressions that are actually empty.
 */
sre.SemanticTreeTest.prototype.testStreeEmptyTensors = function() {
  this.brief = false;
  this.executeTreeTest(
      '<mmultiscripts></mmultiscripts>',
      '<empty role="unknown" id="0"></empty>'
  );
  this.executeTreeTest(
      '<mmultiscripts><none/></mmultiscripts>',
      '<empty role="unknown" id="0"></empty>'
  );
  this.executeTreeTest(
      '<mmultiscripts><none/><mprescripts/></mmultiscripts>',
      '<empty role="unknown" id="0"></empty>'
  );
  this.executeTreeTest(
      '<mmultiscripts><none/><mprescripts/><none/></mmultiscripts>',
      '<empty role="unknown" id="0"></empty>'
  );
  this.executeTreeTest(
      '<mmultiscripts><none/><none/><mprescripts/><none/></mmultiscripts>',
      '<empty role="unknown" id="0"></empty>'
  );
  this.executeTreeTest(
      '<mmultiscripts><none/><none/><none/>' +
      '<mprescripts/><none/></mmultiscripts>',
      '<empty role="unknown" id="0"></empty>'
  );
  this.executeTreeTest(
      '<mmultiscripts><none/><none/><none/><mprescripts/>' +
      '<none/><mpadded/></mmultiscripts>',
      '<empty role="unknown" id="0"></empty>'
  );
};


/**
 * Pathological multiscript expressions that are just the base element.
 */
sre.SemanticTreeTest.prototype.testStreeBaseTensors = function() {
  this.brief = false;
  this.executeTreeTest(
      '<mmultiscripts><mi>X</mi></mmultiscripts>',
      '<identifier role="latinletter" font="italic" id="0">X</identifier>'
  );
  this.executeTreeTest(
      '<mmultiscripts><mi>X</mi><none/></mmultiscripts>',
      '<identifier role="latinletter" font="italic" id="0">X</identifier>'
  );
  this.executeTreeTest(
      '<mmultiscripts><mi>X</mi><none/><mprescripts/></mmultiscripts>',
      '<identifier role="latinletter" font="italic" id="0">X</identifier>'
  );
  this.executeTreeTest(
      '<mmultiscripts><mi>X</mi><none/><mprescripts/><none/></mmultiscripts>',
      '<identifier role="latinletter" font="italic" id="0">X</identifier>'
  );
  this.executeTreeTest(
      '<mmultiscripts><mi>X</mi><none/><none/><none/><mprescripts/><none/>' +
      '</mmultiscripts>',
      '<identifier role="latinletter" font="italic" id="0">X</identifier>'
  );
  this.executeTreeTest(
      '<mmultiscripts><mrow><mi>X</mi><mo>+</mo><mi>Y</mi></mrow>' +
      '<none/><mpadded/></mmultiscripts>',
      '<infixop role="addition" id="3">+' +
      '<content><operator role="addition" id="1">+</operator></content>' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="0">X</identifier>' +
      '<identifier role="latinletter" font="italic" id="2">Y</identifier>' +
      '</children>' +
      '</infixop>'
  );
};


/**
 * Pathological multiscript expressions that are actually on right
 * sub/superscripts.
 */
sre.SemanticTreeTest.prototype.testStreeRightScriptTensors = function() {
  this.brief = false;
  this.executeTreeTest(
      '<mmultiscripts><mi>X</mi><mi>i</mi></mmultiscripts>',
      '<subscript role="latinletter" id="2">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="0">X</identifier>' +
      '<identifier role="latinletter" font="italic" id="1">i</identifier>' +
      '</children>' +
      '</subscript>'
  );
  this.executeTreeTest(
      '<mmultiscripts><mi>X</mi><mi>i</mi><none/></mmultiscripts>',
      '<subscript role="latinletter" id="3">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="0">X</identifier>' +
      '<identifier role="latinletter" font="italic" id="1">i</identifier>' +
      '</children>' +
      '</subscript>'
  );
  this.executeTreeTest(
      '<mmultiscripts><mi>X</mi><none/><mi>i</mi></mmultiscripts>',
      '<superscript role="latinletter" id="3">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="0">X</identifier>' +
      '<identifier role="latinletter" font="italic" id="2">i</identifier>' +
      '</children>' +
      '</superscript>'
  );
  this.executeTreeTest(
      '<mmultiscripts><mi>X</mi><mi>i</mi><mi>j</mi></mmultiscripts>',
      '<superscript role="latinletter" id="4">' +
      '<children>' +
      '<subscript role="subsup" id="3">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="0">X</identifier>' +
      '<identifier role="latinletter" font="italic" id="1">i</identifier>' +
      '</children>' +
      '</subscript>' +
      '<identifier role="latinletter" font="italic" id="2">j</identifier>' +
      '</children>' +
      '</superscript>'
  );
  this.executeTreeTest(
      '<mmultiscripts><mi>X</mi><mi>i</mi><mi>j</mi>' +
      '<mprescripts/><none/></mmultiscripts>',
      '<superscript role="latinletter" id="4">' +
      '<children>' +
      '<subscript role="subsup" id="3">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="0">X</identifier>' +
      '<identifier role="latinletter" font="italic" id="1">i</identifier>' +
      '</children>' +
      '</subscript>' +
      '<identifier role="latinletter" font="italic" id="2">j</identifier>' +
      '</children>' +
      '</superscript>'
  );
  this.executeTreeTest(
      '<mmultiscripts><mi>X</mi><mi>i</mi><none/><none/><mi>l</mi>' +
      '</mmultiscripts>',
      '<superscript role="latinletter" id="10">' +
      '<children>' +
      '<subscript role="subsup" id="9">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="0">X</identifier>' +
      '<punctuated role="rightsub" id="6">' +
      '<content>' +
      '<punctuation role="dummy" id="5">\u2063</punctuation>' +
      '</content>' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="1">i</identifier>' +
      '<empty role="unknown" id="2"></empty>' +
      '</children>' +
      '</punctuated>' +
      '</children>' +
      '</subscript>' +
      '<punctuated role="rightsuper" id="8">' +
      '<content>' +
      '<punctuation role="dummy" id="7">\u2063</punctuation>' +
      '</content>' +
      '<children>' +
      '<empty role="unknown" id="3"></empty>' +
      '<identifier role="latinletter" font="italic" id="4">l</identifier>' +
      '</children>' +
      '</punctuated>' +
      '</children>' +
      '</superscript>'
  );
  this.executeTreeTest(
      '<mmultiscripts><mi>X</mi><mi>i</mi><mi>j</mi><mi>k</mi><mi>l</mi>' +
      '<mprescripts/><none/></mmultiscripts>',
      '<superscript role="latinletter" id="10">' +
      '<children>' +
      '<subscript role="subsup" id="9">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="0">X</identifier>' +
      '<punctuated role="rightsub" id="6">' +
      '<content>' +
      '<punctuation role="dummy" id="5">\u2063</punctuation>' +
      '</content>' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="1">i</identifier>' +
      '<identifier role="latinletter" font="italic" id="2">k</identifier>' +
      '</children>' +
      '</punctuated>' +
      '</children>' +
      '</subscript>' +
      '<punctuated role="rightsuper" id="8">' +
      '<content>' +
      '<punctuation role="dummy" id="7">\u2063</punctuation>' +
      '</content>' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="3">j</identifier>' +
      '<identifier role="latinletter" font="italic" id="4">l</identifier>' +
      '</children>' +
      '</punctuated>' +
      '</children>' +
      '</superscript>'
  );
};


/**
 * Simple multiscript expressions with some scripts on the left.
 */
sre.SemanticTreeTest.prototype.testStreeSimpleTensors = function() {
  this.brief = false;
  this.executeTreeTest(
      '<mmultiscripts><mi>A</mi><mn>1</mn><mn>2</mn><mprescripts/>' +
      '<mn>3</mn><mn>4</mn></mmultiscripts>',
      '<tensor role="latinletter" id="5">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="0">A</identifier>' +
      '<number role="leftsub" font="normal" id="1">3</number>' +
      '<number role="leftsuper" font="normal" id="2">4</number>' +
      '<number role="rightsub" font="normal" id="3">1</number>' +
      '<number role="rightsuper" font="normal" id="4">2</number>' +
      '</children>' +
      '</tensor>'
  );
  this.executeTreeTest(
      '<mmultiscripts><mi>A</mi><mn>1</mn><none/><mprescripts/>' +
      '<mn>3</mn><mn>4</mn></mmultiscripts>',
      '<tensor role="latinletter" id="5">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="0">A</identifier>' +
      '<number role="leftsub" font="normal" id="1">3</number>' +
      '<number role="leftsuper" font="normal" id="2">4</number>' +
      '<number role="rightsub" font="normal" id="3">1</number>' +
      '<empty role="rightsuper" id="4"></empty>' +
      '</children>' +
      '</tensor>'
  );
  this.executeTreeTest(
      '<mmultiscripts><mi>A</mi><mn>1</mn><mprescripts/>' +
      '<mn>3</mn><mn>4</mn></mmultiscripts>',
      '<tensor role="latinletter" id="5">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="0">A</identifier>' +
      '<number role="leftsub" font="normal" id="1">3</number>' +
      '<number role="leftsuper" font="normal" id="2">4</number>' +
      '<number role="rightsub" font="normal" id="3">1</number>' +
      '<empty role="rightsuper" id="4"></empty>' +
      '</children>' +
      '</tensor>'
  );
  this.executeTreeTest(
      '<mmultiscripts><mi>A</mi><none/><mn>2</mn><mprescripts/>' +
      '<mn>3</mn><mn>4</mn></mmultiscripts>',
      '<tensor role="latinletter" id="5">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="0">A</identifier>' +
      '<number role="leftsub" font="normal" id="1">3</number>' +
      '<number role="leftsuper" font="normal" id="2">4</number>' +
      '<empty role="rightsub" id="3"></empty>' +
      '<number role="rightsuper" font="normal" id="4">2</number>' +
      '</children>' +
      '</tensor>'
  );
  this.executeTreeTest(
      '<mmultiscripts><mi>A</mi><none/><none/><mprescripts/>' +
      '<mn>3</mn><mn>4</mn></mmultiscripts>',
      '<tensor role="latinletter" id="5">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="0">A</identifier>' +
      '<number role="leftsub" font="normal" id="1">3</number>' +
      '<number role="leftsuper" font="normal" id="2">4</number>' +
      '<empty role="rightsub" id="3"></empty>' +
      '<empty role="rightsuper" id="4"></empty>' +
      '</children>' +
      '</tensor>'
  );
  this.executeTreeTest(
      '<mmultiscripts><mi>A</mi><mpadded/><mprescripts/>' +
      '<mn>3</mn><mn>4</mn></mmultiscripts>',
      '<tensor role="latinletter" id="5">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="0">A</identifier>' +
      '<number role="leftsub" font="normal" id="1">3</number>' +
      '<number role="leftsuper" font="normal" id="2">4</number>' +
      '<empty role="rightsub" id="3"></empty>' +
      '<empty role="rightsuper" id="4"></empty>' +
      '</children>' +
      '</tensor>'
  );
  this.executeTreeTest(
      '<mmultiscripts><mi>A</mi><mprescripts/>' +
      '<mn>3</mn><mn>4</mn></mmultiscripts>',
      '<tensor role="latinletter" id="5">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="0">A</identifier>' +
      '<number role="leftsub" font="normal" id="1">3</number>' +
      '<number role="leftsuper" font="normal" id="2">4</number>' +
      '<empty role="rightsub" id="3"></empty>' +
      '<empty role="rightsuper" id="4"></empty>' +
      '</children>' +
      '</tensor>'
  );
  this.executeTreeTest(
      '<mmultiscripts><mi>A</mi><mprescripts/>' +
      '<mn>3</mn></mmultiscripts>',
      '<tensor role="latinletter" id="5">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="0">A</identifier>' +
      '<number role="leftsub" font="normal" id="1">3</number>' +
      '<empty role="leftsuper" id="2"></empty>' +
      '<empty role="rightsub" id="3"></empty>' +
      '<empty role="rightsuper" id="4"></empty>' +
      '</children>' +
      '</tensor>'
  );
  this.executeTreeTest(
      '<mmultiscripts><mi>A</mi><mprescripts/>' +
      '<none/><mn>4</mn></mmultiscripts>',
      '<tensor role="latinletter" id="5">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="0">A</identifier>' +
      '<empty role="leftsub" id="1"></empty>' +
      '<number role="leftsuper" font="normal" id="2">4</number>' +
      '<empty role="rightsub" id="3"></empty>' +
      '<empty role="rightsuper" id="4"></empty>' +
      '</children>' +
      '</tensor>'
  );
  this.executeTreeTest(
      '<mmultiscripts><mi>A</mi><mn>1</mn><mprescripts/>' +
      '<none/><mn>4</mn></mmultiscripts>',
      '<tensor role="latinletter" id="5">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="0">A</identifier>' +
      '<empty role="leftsub" id="1"></empty>' +
      '<number role="leftsuper" font="normal" id="2">4</number>' +
      '<number role="rightsub" font="normal" id="3">1</number>' +
      '<empty role="rightsuper" id="4"></empty>' +
      '</children>' +
      '</tensor>'
  );
  this.executeTreeTest(
      '<mmultiscripts><mi>A</mi><none/><mn>2</mn><mprescripts/>' +
      '<mn>3</mn></mmultiscripts>',
      '<tensor role="latinletter" id="5">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="0">A</identifier>' +
      '<number role="leftsub" font="normal" id="1">3</number>' +
      '<empty role="leftsuper" id="4"></empty>' +
      '<empty role="rightsub" id="2"></empty>' +
      '<number role="rightsuper" font="normal" id="3">2</number>' +
      '</children>' +
      '</tensor>'
  );
};


/**
 * Complex multiscript expressions with some scripts on the left.
 */
sre.SemanticTreeTest.prototype.testStreeComplexTensors = function() {
  this.executeTreeTest(
      '<mmultiscripts><mi>A</mi><mn>3</mn><mn>4</mn><mi>k</mi><mi>l</mi>' +
      '<mprescripts/><mn>1</mn><mn>2</mn><mi>i</mi><mi>j</mi></mmultiscripts>',
      '<tensor role="latinletter" id="17">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="0">A</identifier>' +
      '<punctuated role="leftsub" id="10">' +
      '<content>' +
      '<punctuation role="dummy" id="9">\u2063</punctuation>' +
      '</content>' +
      '<children>' +
      '<number role="integer" font="normal" id="1">1</number>' +
      '<identifier role="latinletter" font="italic" id="2">i</identifier>' +
      '</children>' +
      '</punctuated>' +
      '<punctuated role="leftsuper" id="12">' +
      '<content>' +
      '<punctuation role="dummy" id="11">\u2063</punctuation>' +
      '</content>' +
      '<children>' +
      '<number role="integer" font="normal" id="3">2</number>' +
      '<identifier role="latinletter" font="italic" id="4">j</identifier>' +
      '</children>' +
      '</punctuated>' +
      '<punctuated role="rightsub" id="14">' +
      '<content>' +
      '<punctuation role="dummy" id="13">\u2063</punctuation>' +
      '</content>' +
      '<children>' +
      '<number role="integer" font="normal" id="5">3</number>' +
      '<identifier role="latinletter" font="italic" id="6">k</identifier>' +
      '</children>' +
      '</punctuated>' +
      '<punctuated role="rightsuper" id="16">' +
      '<content>' +
      '<punctuation role="dummy" id="15">\u2063</punctuation>' +
      '</content>' +
      '<children>' +
      '<number role="integer" font="normal" id="7">4</number>' +
      '<identifier role="latinletter" font="italic" id="8">l</identifier>' +
      '</children>' +
      '</punctuated>' +
      '</children>' +
      '</tensor>'
  );
  this.executeTreeTest(
      '<mmultiscripts><mi>A</mi><mn>3</mn><none/><mi>k</mi><mi>l</mi>' +
      '<mprescripts/><mn>1</mn><none/><none/><mi>j</mi></mmultiscripts>',
      '<tensor role="latinletter" id="17">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="0">A</identifier>' +
      '<punctuated role="leftsub" id="10">' +
      '<content>' +
      '<punctuation role="dummy" id="9">\u2063</punctuation>' +
      '</content>' +
      '<children>' +
      '<number role="integer" font="normal" id="1">1</number>' +
      '<empty role="unknown" id="2"></empty>' +
      '</children>' +
      '</punctuated>' +
      '<punctuated role="leftsuper" id="12">' +
      '<content>' +
      '<punctuation role="dummy" id="11">\u2063</punctuation>' +
      '</content>' +
      '<children>' +
      '<empty role="unknown" id="3"></empty>' +
      '<identifier role="latinletter" font="italic" id="4">j</identifier>' +
      '</children>' +
      '</punctuated>' +
      '<punctuated role="rightsub" id="14">' +
      '<content>' +
      '<punctuation role="dummy" id="13">\u2063</punctuation>' +
      '</content>' +
      '<children>' +
      '<number role="integer" font="normal" id="5">3</number>' +
      '<identifier role="latinletter" font="italic" id="6">k</identifier>' +
      '</children>' +
      '</punctuated>' +
      '<punctuated role="rightsuper" id="16">' +
      '<content>' +
      '<punctuation role="dummy" id="15">\u2063</punctuation>' +
      '</content>' +
      '<children>' +
      '<empty role="unknown" id="7"></empty>' +
      '<identifier role="latinletter" font="italic" id="8">l</identifier>' +
      '</children>' +
      '</punctuated>' +
      '</children>' +
      '</tensor>'
  );

};


/**
 * Simple embellished arguments.
 */
sre.SemanticTreeTest.prototype.testStreeSimpleEmbellishment = function() {
  this.brief = false;
  this.executeTreeTest(
      '<msup><mi>\u222B</mi><mn>2</mn></msup>',
      '<limupper role="integral" id="2">' +
      '<children>' +
      '<largeop role="integral" id="0">∫</largeop>' +
      '<number role="integer" font="normal" id="1">2</number>' +
      '</children>' +
      '</limupper>'
  );
  this.executeTreeTest(
      '<msup><mi>f</mi><mn>2</mn></msup>',
      '<superscript role="latinletter" id="2">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="0">f</identifier>' +
      '<number role="integer" font="normal" id="1">2</number>' +
      '</children>' +
      '</superscript>'
  );
  this.executeTreeTest(
      '<msup><mo>(</mo><mn>2</mn></msup>',
      '<superscript role="open" embellished="fence" id="2">' +
      '<children>' +
      '<fence role="open" id="0">(</fence>' +
      '<number role="integer" font="normal" id="1">2</number>' +
      '</children>' +
      '</superscript>'
  );
  this.executeTreeTest(
      '<msup><mo>=</mo><mn>2</mn></msup>',
      '<superscript role="equality" embellished="relation" id="2">' +
      '<children>' +
      '<relation role="equality" id="0">=</relation>' +
      '<number role="integer" font="normal" id="1">2</number>' +
      '</children>' +
      '</superscript>'
  );
  this.executeTreeTest(
      '<msup><mo>+</mo><mn>2</mn></msup>',
      '<superscript role="addition" embellished="operator" id="2">' +
      '<children>' +
      '<operator role="addition" id="0">+</operator>' +
      '<number role="integer" font="normal" id="1">2</number>' +
      '</children>' +
      '</superscript>'
  );
  this.executeTreeTest(
      '<msup><mo>,</mo><mn>2</mn></msup>',
      '<superscript role="comma" embellished="punctuation" id="2">' +
      '<children>' +
      '<punctuation role="comma" id="0">,</punctuation>' +
      '<number role="integer" font="normal" id="1">2</number>' +
      '</children>' +
      '</superscript>'
  );
};


/**
 * Multi embellished arguments.
 */
sre.SemanticTreeTest.prototype.testStreeMultiEmbellishment = function() {
  this.brief = false;
  this.executeTreeTest(
      '<msub><msup><mo>+</mo><mn>2</mn></msup><mi>x</mi></msub>',
      '<subscript role="addition" embellished="operator" id="4">' +
      '<children>' +
      '<superscript role="addition" embellished="operator" id="2">' +
      '<children>' +
      '<operator role="addition" id="0">+</operator>' +
      '<number role="integer" font="normal" id="1">2</number>' +
      '</children>' +
      '</superscript>' +
      '<identifier role="latinletter" font="italic" id="3">x</identifier>' +
      '</children>' +
      '</subscript>');
  this.executeTreeTest(
      '<mmultiscripts><mo>+</mo><mn>2</mn><mi>x</mi></mmultiscripts>',
      '<superscript role="addition" embellished="operator" id="4">' +
      '<children>' +
      '<subscript role="subsup" embellished="operator" id="3">' +
      '<children>' +
      '<operator role="addition" id="0">+</operator>' +
      '<number role="integer" font="normal" id="1">2</number>' +
      '</children>' +
      '</subscript>' +
      '<identifier role="latinletter" font="italic" id="2">x</identifier>' +
      '</children>' +
      '</superscript>');
  this.executeTreeTest(
      '<mover><msub><msup><mo>+</mo><mn>2</mn></msup><mi>x</mi>' +
      '</msub><mo>-</mo></mover>',
      '<overscore role="addition" embellished="operator" id="6">' +
      '<children>' +
      '<subscript role="addition" embellished="operator" id="4">' +
      '<children>' +
      '<superscript role="addition" embellished="operator" id="2">' +
      '<children>' +
      '<operator role="addition" id="0">+</operator>' +
      '<number role="integer" font="normal" id="1">2</number>' +
      '</children>' +
      '</superscript>' +
      '<identifier role="latinletter" font="italic" id="3">x</identifier>' +
      '</children>' +
      '</subscript>' +
      '<operator role="overaccent" id="5">-</operator>' +
      '</children>' +
      '</overscore>');
  this.executeTreeTest(
      '<msup><mo>+</mo><msub><mi>x</mi><mn>2</mn></msub></msup>',
      '<superscript role="addition" embellished="operator" id="4">' +
      '<children>' +
      '<operator role="addition" id="0">+</operator>' +
      '<subscript role="latinletter" id="3">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="1">x</identifier>' +
      '<number role="integer" font="normal" id="2">2</number>' +
      '</children>' +
      '</subscript>' +
      '</children>' +
      '</superscript>');
  this.executeTreeTest(
      '<msub><munder><mo>+</mo><mn>2</mn></munder><mi>x</mi></msub>',
      '<subscript role="addition" embellished="operator" id="4">' +
      '<children>' +
      '<underscore role="addition" embellished="operator" id="2">' +
      '<children>' +
      '<operator role="addition" id="0">+</operator>' +
      '<number role="integer" font="normal" id="1">2</number>' +
      '</children>' +
      '</underscore>' +
      '<identifier role="latinletter" font="italic" id="3">x</identifier>' +
      '</children>' +
      '</subscript>');
  this.executeTreeTest(
      '<mmultiscripts><mi>(</mi><none/><none/>' +
      '<mprescripts/><mn>1</mn><mi>j</mi></mmultiscripts>',
      '<tensor role="open" embellished="fence" id="5">' +
      '<children>' +
      '<fence role="open" id="0">(</fence>' +
      '<number role="leftsub" font="normal" id="1">1</number>' +
      '<identifier role="leftsuper" font="italic" id="2">j</identifier>' +
      '<empty role="rightsub" id="3"/>' +
      '<empty role="rightsuper" id="4"/>' +
      '</children>' +
      '</tensor>');
  this.executeTreeTest(
      '<mmultiscripts><mi>(</mi><none/><mi>K</mi>' +
      '<mprescripts/><mn>1</mn><mi>j</mi></mmultiscripts>',
      '<tensor role="open" embellished="fence" id="5">' +
      '<children>' +
      '<fence role="open" id="0">(</fence>' +
      '<number role="leftsub" font="normal" id="1">1</number>' +
      '<identifier role="leftsuper" font="italic" id="2">j</identifier>' +
      '<empty role="rightsub" id="3"/>' +
      '<identifier role="rightsuper" font="italic" id="4">K</identifier>' +
      '</children>' +
      '</tensor>');
  this.executeTreeTest(
      '<mmultiscripts><mi>(</mi><mn>1</mn><mi>j</mi></mmultiscripts>',
      '<superscript role="open" embellished="fence" id="4">' +
      '<children>' +
      '<subscript role="subsup" embellished="fence" id="3">' +
      '<children>' +
      '<fence role="open" id="0">(</fence>' +
      '<number role="integer" font="normal" id="1">1</number>' +
      '</children>' +
      '</subscript>' +
      '<identifier role="latinletter" font="italic" id="2">j</identifier>' +
      '</children>' +
      '</superscript>');
};


/**
 * Expressions with embellished operators and relations.
 */
sre.SemanticTreeTest.prototype.testStreeComplexEmbellishment = function() {
  this.executeTreeTest(
      '<mi>a</mi><msub><mo>=</mo><mn>2</mn></msub><mi>x</mi><msub><mo>=</mo>' +
      '<mn>2</mn></msub><mi>z</mi>',
      '<relseq role="equality" id="9">=' +
      '<content>' +
      '<subscript role="equality" embellished="relation" id="3">' +
      '<children>' +
      '<relation role="equality" id="1">=</relation>' +
      '<number role="integer" font="normal" id="2">2</number>' +
      '</children>' +
      '</subscript>' +
      '<subscript role="equality" embellished="relation" id="7">' +
      '<children>' +
      '<relation role="equality" id="5">=</relation>' +
      '<number role="integer" font="normal" id="6">2</number>' +
      '</children>' +
      '</subscript>' +
      '</content>' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="0">a</identifier>' +
      '<identifier role="latinletter" font="italic" id="4">x</identifier>' +
      '<identifier role="latinletter" font="italic" id="8">z</identifier>' +
      '</children>' +
      '</relseq>'
  );
  this.executeTreeTest(
      '<mi>a</mi><msub><mo>=</mo><mn>2</mn></msub><mi>x</mi><msub><mo>=</mo>' +
      '<mn>4</mn></msub><mi>z</mi>',
      '<multirel role="equality" id="9">' +
      '<content>' +
      '<subscript role="equality" embellished="relation" id="3">' +
      '<children>' +
      '<relation role="equality" id="1">=</relation>' +
      '<number role="integer" font="normal" id="2">2</number>' +
      '</children>' +
      '</subscript>' +
      '<subscript role="equality" embellished="relation" id="7">' +
      '<children>' +
      '<relation role="equality" id="5">=</relation>' +
      '<number role="integer" font="normal" id="6">4</number>' +
      '</children>' +
      '</subscript>' +
      '</content>' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="0">a</identifier>' +
      '<identifier role="latinletter" font="italic" id="4">x</identifier>' +
      '<identifier role="latinletter" font="italic" id="8">z</identifier>' +
      '</children>' +
      '</multirel>'
  );
  this.executeTreeTest(
      '<mi>a</mi><msub><mo>=</mo><mn>2</mn></msub><mi>x</mi><msub>' +
      '<mo>\u2264</mo><mn>4</mn></msub><mi>z</mi>',
      '<multirel role="unknown" id="9">' +
      '<content>' +
      '<subscript role="equality" embellished="relation" id="3">' +
      '<children>' +
      '<relation role="equality" id="1">=</relation>' +
      '<number role="integer" font="normal" id="2">2</number>' +
      '</children>' +
      '</subscript>' +
      '<subscript role="inequality" embellished="relation" id="7">' +
      '<children>' +
      '<relation role="inequality" id="5">\u2264</relation>' +
      '<number role="integer" font="normal" id="6">4</number>' +
      '</children>' +
      '</subscript>' +
      '</content>' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="0">a</identifier>' +
      '<identifier role="latinletter" font="italic" id="4">x</identifier>' +
      '<identifier role="latinletter" font="italic" id="8">z</identifier>' +
      '</children>' +
      '</multirel>'
  );
  this.executeTreeTest(
      '<mi>a</mi><msub><mo>+</mo><mn>2</mn></msub><mi>x</mi><msub><mo>+</mo>' +
      '<mn>2</mn></msub><mi>z</mi>',
      '<infixop role="addition" id="9">+' +
      '<content>' +
      '<subscript role="addition" embellished="operator" id="3">' +
      '<children>' +
      '<operator role="addition" id="1">+</operator>' +
      '<number role="integer" font="normal" id="2">2</number>' +
      '</children>' +
      '</subscript>' +
      '<subscript role="addition" embellished="operator" id="7">' +
      '<children>' +
      '<operator role="addition" id="5">+</operator>' +
      '<number role="integer" font="normal" id="6">2</number>' +
      '</children>' +
      '</subscript>' +
      '</content>' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="0">a</identifier>' +
      '<identifier role="latinletter" font="italic" id="4">x</identifier>' +
      '<identifier role="latinletter" font="italic" id="8">z</identifier>' +
      '</children>' +
      '</infixop>'
  );
  this.executeTreeTest(
      '<mi>a</mi><msub><mo>+</mo><mn>2</mn></msub><mi>x</mi><msub><mo>+</mo>' +
      '<mn>4</mn></msub><mi>z</mi>',
      '<infixop role="addition" id="10">+' +
      '<content>' +
      '<subscript role="addition" embellished="operator" id="7">' +
      '<children>' +
      '<operator role="addition" id="5">+</operator>' +
      '<number role="integer" font="normal" id="6">4</number>' +
      '</children>' +
      '</subscript>' +
      '</content>' +
      '<children>' +
      '<infixop role="addition" id="9">+' +
      '<content>' +
      '<subscript role="addition" embellished="operator" id="3">' +
      '<children>' +
      '<operator role="addition" id="1">+</operator>' +
      '<number role="integer" font="normal" id="2">2</number>' +
      '</children>' +
      '</subscript>' +
      '</content>' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="0">a</identifier>' +
      '<identifier role="latinletter" font="italic" id="4">x</identifier>' +
      '</children>' +
      '</infixop>' +
      '<identifier role="latinletter" font="italic" id="8">z</identifier>' +
      '</children>' +
      '</infixop>'
  );
  this.executeTreeTest(
      '<mi>a</mi><msub><mo>+</mo><mn>2</mn></msub><mi>b</mi><msup><mo>=</mo>' +
      '<mo>\'</mo></msup><mi>x</mi><msub><mo>+</mo><mn>4</mn></msub><mi>z</mi>',
      '<relseq role="equality" id="15">=' +
      '<content>' +
      '<superscript role="equality" embellished="relation" id="7">' +
      '<children>' +
      '<relation role="equality" id="5">=</relation>' +
      '<punctuation role="prime" id="6">\'</punctuation>' +
      '</children>' +
      '</superscript>' +
      '</content>' +
      '<children>' +
      '<infixop role="addition" id="13">+' +
      '<content>' +
      '<subscript role="addition" embellished="operator" id="3">' +
      '<children>' +
      '<operator role="addition" id="1">+</operator>' +
      '<number role="integer" font="normal" id="2">2</number>' +
      '</children>' +
      '</subscript>' +
      '</content>' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="0">a</identifier>' +
      '<identifier role="latinletter" font="italic" id="4">b</identifier>' +
      '</children>' +
      '</infixop>' +
      '<infixop role="addition" id="14">+' +
      '<content>' +
      '<subscript role="addition" embellished="operator" id="11">' +
      '<children>' +
      '<operator role="addition" id="9">+</operator>' +
      '<number role="integer" font="normal" id="10">4</number>' +
      '</children>' +
      '</subscript>' +
      '</content>' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="8">x</identifier>' +
      '<identifier role="latinletter" font="italic" id="12">z</identifier>' +
      '</children>' +
      '</infixop>' +
      '</children>' +
      '</relseq>'
  );
  this.executeTreeTest(
      '<mi>a</mi><msub><mo>:</mo><mn>2</mn></msub><mi>b</mi><msup><mo>,</mo>' +
      '<mo>\'</mo></msup><mi>x</mi><msub><mo>:</mo><mn>4</mn></msub><mi>z</mi>',
      '<punctuated role="sequence" id="13">' +
      '<content>' +
      '<subscript role="colon" embellished="punctuation" id="3">' +
      '<children>' +
      '<punctuation role="colon" id="1">:</punctuation>' +
      '<number role="integer" font="normal" id="2">2</number>' +
      '</children>' +
      '</subscript>' +
      '<superscript role="comma" embellished="punctuation" id="7">' +
      '<children>' +
      '<punctuation role="comma" id="5">,</punctuation>' +
      '<punctuation role="prime" id="6">\'</punctuation>' +
      '</children>' +
      '</superscript>' +
      '<subscript role="colon" embellished="punctuation" id="11">' +
      '<children>' +
      '<punctuation role="colon" id="9">:</punctuation>' +
      '<number role="integer" font="normal" id="10">4</number>' +
      '</children>' +
      '</subscript>' +
      '</content>' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="0">a</identifier>' +
      '<subscript role="colon" embellished="punctuation" id="3">' +
      '<children>' +
      '<punctuation role="colon" id="1">:</punctuation>' +
      '<number role="integer" font="normal" id="2">2</number>' +
      '</children>' +
      '</subscript>' +
      '<identifier role="latinletter" font="italic" id="4">b</identifier>' +
      '<superscript role="comma" embellished="punctuation" id="7">' +
      '<children>' +
      '<punctuation role="comma" id="5">,</punctuation>' +
      '<punctuation role="prime" id="6">\'</punctuation>' +
      '</children>' +
      '</superscript>' +
      '<identifier role="latinletter" font="italic" id="8">x</identifier>' +
      '<subscript role="colon" embellished="punctuation" id="11">' +
      '<children>' +
      '<punctuation role="colon" id="9">:</punctuation>' +
      '<number role="integer" font="normal" id="10">4</number>' +
      '</children>' +
      '</subscript>' +
      '<identifier role="latinletter" font="italic" id="12">z</identifier>' +
      '</children>' +
      '</punctuated>'
  );
  this.executeTreeTest(
      '<msub><mo>+</mo><mn>2</mn></msub><msub><mo>+</mo>' +
      '<mn>3</mn></msub><mi>x</mi>',
      '<prefixop role="multiop" id="7">+ +' +
      '<content>' +
      '<subscript role="addition" embellished="operator" id="2">' +
      '<children>' +
      '<operator role="addition" id="0">+</operator>' +
      '<number role="integer" font="normal" id="1">2</number>' +
      '</children>' +
      '</subscript>' +
      '<subscript role="addition" embellished="operator" id="5">' +
      '<children>' +
      '<operator role="addition" id="3">+</operator>' +
      '<number role="integer" font="normal" id="4">3</number>' +
      '</children>' +
      '</subscript>' +
      '</content>' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="6">x</identifier>' +
      '</children>' +
      '</prefixop>'
  );
  this.executeTreeTest(
      '<mi>x</mi><msub><mo>+</mo><mn>2</mn></msub><msub><mo>+</mo>' +
      '<mn>3</mn></msub>',
      '<postfixop role="multiop" id="7">+ +' +
      '<content>' +
      '<subscript role="addition" embellished="operator" id="3">' +
      '<children>' +
      '<operator role="addition" id="1">+</operator>' +
      '<number role="integer" font="normal" id="2">2</number>' +
      '</children>' +
      '</subscript>' +
      '<subscript role="addition" embellished="operator" id="6">' +
      '<children>' +
      '<operator role="addition" id="4">+</operator>' +
      '<number role="integer" font="normal" id="5">3</number>' +
      '</children>' +
      '</subscript>' +
      '</content>' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="0">x</identifier>' +
      '</children>' +
      '</postfixop>'
  );
};


// Embellished Fences
/**
 * Expressions with embellished fences right.
 */
sre.SemanticTreeTest.prototype.testStreeEmbellishedRightFence = function() {
  this.executeTreeTest(
      '<mo>(</mo><mi>x</mi><msup><mo>)</mo><mn>4</mn></msup>',
      '<superscript role="leftright" fencepointer="2" id="4">' +
      '<children>' +
      '<fenced role="leftright" id="5">' +
      '<content>' +
      '<fence role="open" id="0">(</fence>' +
      '<fence role="close" id="2">)</fence>' +
      '</content>' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="1">x</identifier>' +
      '</children>' +
      '</fenced>' +
      '<number role="integer" font="normal" id="3">4</number>' +
      '</children>' +
      '</superscript>'
  );
  this.executeTreeTest(
      '<mo>(</mo><mi>x</mi><msup><mo>)</mo><mn>4</mn></msup><mo>+</mo>' +
      '<mo>(</mo><mi>y</mi><msup><mo>)</mo><mn>3</mn></msup>',
      '<infixop role="addition" id="13">+' +
      '<content>' +
      '<operator role="addition" id="5">+</operator>' +
      '</content>' +
      '<children>' +
      '<superscript role="leftright" fencepointer="2" id="4">' +
      '<children>' +
      '<fenced role="leftright" id="11">' +
      '<content>' +
      '<fence role="open" id="0">(</fence>' +
      '<fence role="close" id="2">)</fence>' +
      '</content>' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="1">x</identifier>' +
      '</children>' +
      '</fenced>' +
      '<number role="integer" font="normal" id="3">4</number>' +
      '</children>' +
      '</superscript>' +
      '<superscript role="leftright" fencepointer="8" id="10">' +
      '<children>' +
      '<fenced role="leftright" id="12">' +
      '<content>' +
      '<fence role="open" id="6">(</fence>' +
      '<fence role="close" id="8">)</fence>' +
      '</content>' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="7">y</identifier>' +
      '</children>' +
      '</fenced>' +
      '<number role="integer" font="normal" id="9">3</number>' +
      '</children>' +
      '</superscript>' +
      '</children>' +
      '</infixop>'
  );
  this.executeTreeTest(
      '<mo>(</mo><mi>x</mi><msub><msup><mo>)</mo><mn>4</mn></msup>' +
      '<mn>2</mn></msub>',
      '<subscript role="leftright" fencepointer="2" id="6">' +
      '<children>' +
      '<superscript role="leftright" fencepointer="2" id="4">' +
      '<children>' +
      '<fenced role="leftright" id="7">' +
      '<content>' +
      '<fence role="open" id="0">(</fence>' +
      '<fence role="close" id="2">)</fence>' +
      '</content>' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="1">x</identifier>' +
      '</children>' +
      '</fenced>' +
      '<number role="integer" font="normal" id="3">4</number>' +
      '</children>' +
      '</superscript>' +
      '<number role="integer" font="normal" id="5">2</number>' +
      '</children>' +
      '</subscript>'
  );
  this.executeTreeTest(
      '<mo>(</mo><mi>x</mi><msubsup><mo>)</mo><mn>4</mn><mn>2</mn></msubsup>',
      '<superscript role="leftright" fencepointer="2" id="6">' +
      '<children>' +
      '<subscript role="subsup" fencepointer="2" id="5">' +
      '<children>' +
      '<fenced role="leftright" id="7">' +
      '<content>' +
      '<fence role="open" id="0">(</fence>' +
      '<fence role="close" id="2">)</fence>' +
      '</content>' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="1">x</identifier>' +
      '</children>' +
      '</fenced>' +
      '<number role="integer" font="normal" id="3">4</number>' +
      '</children>' +
      '</subscript>' +
      '<number role="integer" font="normal" id="4">2</number>' +
      '</children>' +
      '</superscript>'
  );
  this.executeTreeTest(
      '<mo>(</mo><mi>x</mi><mmultiscripts><mo>)</mo><mn>4</mn><mn>2</mn>' +
      '</mmultiscripts>',
      '<superscript role="leftright" fencepointer="2" id="6">' +
      '<children>' +
      '<subscript role="subsup" fencepointer="2" id="5">' +
      '<children>' +
      '<fenced role="leftright" id="7">' +
      '<content>' +
      '<fence role="open" id="0">(</fence>' +
      '<fence role="close" id="2">)</fence>' +
      '</content>' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="1">x</identifier>' +
      '</children>' +
      '</fenced>' +
      '<number role="integer" font="normal" id="3">4</number>' +
      '</children>' +
      '</subscript>' +
      '<number role="integer" font="normal" id="4">2</number>' +
      '</children>' +
      '</superscript>'
  );
  this.executeTreeTest(
      '<mo>(</mo><mi>x</mi><msup><munder><msub><mover><mo>)</mo><mo>^</mo>' +
      '</mover><mn>2</mn></msub><mo>~</mo></munder><mn>1</mn></msup>',
      '<superscript role="leftright" fencepointer="8" id="10">' +
      '<children>' +
      '<subscript role="leftright" fencepointer="4" id="6">' +
      '<children>' +
      '<fenced role="leftright" id="11">' +
      '<content>' +
      '<fence role="open" id="0">(</fence>' +
      '<underscore role="close" embellished="fence" id="8">' +
      '<children>' +
      '<overscore role="close" embellished="fence" id="4">' +
      '<children>' +
      '<fence role="close" id="2">)</fence>' +
      '<operator role="overaccent" id="3">^</operator>' +
      '</children>' +
      '</overscore>' +
      '<relation role="underaccent" id="7">~</relation>' +
      '</children>' +
      '</underscore>' +
      '</content>' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="1">x</identifier>' +
      '</children>' +
      '</fenced>' +
      '<number role="integer" font="normal" id="5">2</number>' +
      '</children>' +
      '</subscript>' +
      '<number role="integer" font="normal" id="9">1</number>' +
      '</children>' +
      '</superscript>'
  );
  this.executeTreeTest(
      '<mo>(</mo><mi>x</mi><mpadded><msup><munder><msub><mover><mo>)</mo>' +
      '<mo>^</mo></mover><mn>2</mn></msub><mo>~</mo></munder><mn>3</mn>' +
      '</msup></mpadded>',
      '<superscript role="leftright" fencepointer="8" id="10">' +
      '<children>' +
      '<subscript role="leftright" fencepointer="4" id="6">' +
      '<children>' +
      '<fenced role="leftright" id="11">' +
      '<content>' +
      '<fence role="open" id="0">(</fence>' +
      '<underscore role="close" embellished="fence" id="8">' +
      '<children>' +
      '<overscore role="close" embellished="fence" id="4">' +
      '<children>' +
      '<fence role="close" id="2">)</fence>' +
      '<operator role="overaccent" id="3">^</operator>' +
      '</children>' +
      '</overscore>' +
      '<relation role="underaccent" id="7">~</relation>' +
      '</children>' +
      '</underscore>' +
      '</content>' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="1">x</identifier>' +
      '</children>' +
      '</fenced>' +
      '<number role="integer" font="normal" id="5">2</number>' +
      '</children>' +
      '</subscript>' +
      '<number role="integer" font="normal" id="9">3</number>' +
      '</children>' +
      '</superscript>'
  );
};


/**
 * Expressions with embellished fences left.
 */
sre.SemanticTreeTest.prototype.testStreeEmbellishedLeftFence = function() {
  this.executeTreeTest(
      '<msup><mo>(</mo><mn>4</mn></msup><mi>x</mi><mo>)</mo>',
      '<punctuated role="sequence" id="5">' +
      '<content>' +
      '<superscript role="openfence" embellished="punctuation" id="2">' +
      '<children>' +
      '<punctuation role="openfence" id="0">(</punctuation>' +
      '<number role="integer" font="normal" id="1">4</number>' +
      '</children>' +
      '</superscript>' +
      '<punctuation role="closefence" id="4">)</punctuation>' +
      '</content>' +
      '<children>' +
      '<superscript role="openfence" embellished="punctuation" id="2">' +
      '<children>' +
      '<punctuation role="openfence" id="0">(</punctuation>' +
      '<number role="integer" font="normal" id="1">4</number>' +
      '</children>' +
      '</superscript>' +
      '<identifier role="latinletter" font="italic" id="3">x</identifier>' +
      '<punctuation role="closefence" id="4">)</punctuation>' +
      '</children>' +
      '</punctuated>'
  );
  this.executeTreeTest(
      '<mmultiscripts><mo>(</mo><mn>4</mn></mmultiscripts><mi>x</mi><mo>)</mo>',
      '<punctuated role="sequence" id="5">' +
      '<content>' +
      '<subscript role="openfence" embellished="punctuation" id="2">' +
      '<children>' +
      '<punctuation role="openfence" id="0">(</punctuation>' +
      '<number role="integer" font="normal" id="1">4</number>' +
      '</children>' +
      '</subscript>' +
      '<punctuation role="closefence" id="4">)</punctuation>' +
      '</content>' +
      '<children>' +
      '<subscript role="openfence" embellished="punctuation" id="2">' +
      '<children>' +
      '<punctuation role="openfence" id="0">(</punctuation>' +
      '<number role="integer" font="normal" id="1">4</number>' +
      '</children>' +
      '</subscript>' +
      '<identifier role="latinletter" font="italic" id="3">x</identifier>' +
      '<punctuation role="closefence" id="4">)</punctuation>' +
      '</children>' +
      '</punctuated>'
  );
  this.executeTreeTest(
      '<mmultiscripts><mo>(</mo><mprescripts/><mn>4</mn></mmultiscripts>' +
      '<mi>x</mi><mo>)</mo>',
      '<tensor role="leftright" fencepointer="0" id="5">' +
      '<children>' +
      '<fenced role="leftright" id="8">' +
      '<content>' +
      '<fence role="open" id="0">(</fence>' +
      '<fence role="close" id="7">)</fence>' +
      '</content>' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="6">x</identifier>' +
      '</children>' +
      '</fenced>' +
      '<number role="leftsub" font="normal" id="1">4</number>' +
      '<empty role="leftsuper" id="2"/>' +
      '<empty role="rightsub" id="3"/>' +
      '<empty role="rightsuper" id="4"/>' +
      '</children>' +
      '</tensor>'
  );
  this.executeTreeTest(
      '<mmultiscripts><mo>(</mo><mprescripts/><mn>4</mn><mn>3</mn>' +
      '</mmultiscripts><mi>x</mi><mo>)</mo>',
      '<tensor role="leftright" fencepointer="0" id="5">' +
      '<children>' +
      '<fenced role="leftright" id="8">' +
      '<content>' +
      '<fence role="open" id="0">(</fence>' +
      '<fence role="close" id="7">)</fence>' +
      '</content>' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="6">x</identifier>' +
      '</children>' +
      '</fenced>' +
      '<number role="leftsub" font="normal" id="1">4</number>' +
      '<number role="leftsuper" font="normal" id="2">3</number>' +
      '<empty role="rightsub" id="3"/>' +
      '<empty role="rightsuper" id="4"/>' +
      '</children>' +
      '</tensor>'
  );
  this.executeTreeTest(
      '<mmultiscripts><mo>(</mo><mn>2</mn><mprescripts/><mn>4</mn><mn>3</mn>' +
      '</mmultiscripts><mi>x</mi><mo>)</mo>',
      '<punctuated role="sequence" id="8">' +
      '<content>' +
      '<tensor role="openfence" embellished="punctuation" id="5">' +
      '<children>' +
      '<punctuation role="openfence" id="0">(</punctuation>' +
      '<number role="leftsub" font="normal" id="1">4</number>' +
      '<number role="leftsuper" font="normal" id="2">3</number>' +
      '<number role="rightsub" font="normal" id="3">2</number>' +
      '<empty role="rightsuper" id="4"/>' +
      '</children>' +
      '</tensor>' +
      '<punctuation role="closefence" id="7">)</punctuation>' +
      '</content>' +
      '<children>' +
      '<tensor role="openfence" embellished="punctuation" id="5">' +
      '<children>' +
      '<punctuation role="openfence" id="0">(</punctuation>' +
      '<number role="leftsub" font="normal" id="1">4</number>' +
      '<number role="leftsuper" font="normal" id="2">3</number>' +
      '<number role="rightsub" font="normal" id="3">2</number>' +
      '<empty role="rightsuper" id="4"/>' +
      '</children>' +
      '</tensor>' +
      '<identifier role="latinletter" font="italic" id="6">x</identifier>' +
      '<punctuation role="closefence" id="7">)</punctuation>' +
      '</children>' +
      '</punctuated>'
  );
  this.executeTreeTest(
      '<mmultiscripts><munder><mo>(</mo><mo>~</mo></munder>' +
      '<mprescripts/><mn>4</mn><mn>3</mn>' +
      '</mmultiscripts><mi>x</mi><mo>)</mo>',
      '<tensor role="leftright" fencepointer="2" id="7">' +
      '<children>' +
      '<fenced role="leftright" id="10">' +
      '<content>' +
      '<underscore role="open" embellished="fence" id="2">' +
      '<children>' +
      '<fence role="open" id="0">(</fence>' +
      '<relation role="underaccent" id="1">~</relation>' +
      '</children>' +
      '</underscore>' +
      '<fence role="close" id="9">)</fence>' +
      '</content>' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="8">x</identifier>' +
      '</children>' +
      '</fenced>' +
      '<number role="leftsub" font="normal" id="3">4</number>' +
      '<number role="leftsuper" font="normal" id="4">3</number>' +
      '<empty role="rightsub" id="5"/>' +
      '<empty role="rightsuper" id="6"/>' +
      '</children>' +
      '</tensor>'
  );
  this.executeTreeTest(
      '<mmultiscripts><mover><mmultiscripts><munder><mo>(</mo><mo>~</mo>' +
      '</munder><mprescripts/><none/><mn>3</mn></mmultiscripts><mo>^</mo>' +
      '</mover><mprescripts/><mn>4</mn>' +
      '</mmultiscripts><mi>x</mi><mo>)</mo>',
      '<tensor role="leftright" fencepointer="9" id="14">' +
      '<children>' +
      '<tensor role="leftright" fencepointer="2" id="7">' +
      '<children>' +
      '<fenced role="leftright" id="17">' +
      '<content>' +
      '<overscore role="open" embellished="fence" id="9">' +
      '<children>' +
      '<underscore role="open" embellished="fence" id="2">' +
      '<children>' +
      '<fence role="open" id="0">(</fence>' +
      '<relation role="underaccent" id="1">~</relation>' +
      '</children>' +
      '</underscore>' +
      '<operator role="overaccent" id="8">^</operator>' +
      '</children>' +
      '</overscore>' +
      '<fence role="close" id="16">)</fence>' +
      '</content>' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="15">x</identifier>' +
      '</children>' +
      '</fenced>' +
      '<empty role="leftsub" id="3"/>' +
      '<number role="leftsuper" font="normal" id="4">3</number>' +
      '<empty role="rightsub" id="5"/>' +
      '<empty role="rightsuper" id="6"/>' +
      '</children>' +
      '</tensor>' +
      '<number role="leftsub" font="normal" id="10">4</number>' +
      '<empty role="leftsuper" id="11"/>' +
      '<empty role="rightsub" id="12"/>' +
      '<empty role="rightsuper" id="13"/>' +
      '</children>' +
      '</tensor>'
  );
};


/**
 * Expressions with embellished fences on both sides.
 */
sre.SemanticTreeTest.prototype.testStreeEmbellishedBothFences = function() {
  this.executeTreeTest(
      '<mmultiscripts><mo>(</mo><mprescripts/><mn>4</mn></mmultiscripts>' +
      '<mi>x</mi><msup><mo>)</mo><mn>2</mn></msup>',
      '<superscript role="leftright" fencepointer="7" id="9">' +
      '<children>' +
      '<tensor role="leftright" fencepointer="0" id="5">' +
      '<children>' +
      '<fenced role="leftright" id="10">' +
      '<content>' +
      '<fence role="open" id="0">(</fence>' +
      '<fence role="close" id="7">)</fence>' +
      '</content>' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="6">x</identifier>' +
      '</children>' +
      '</fenced>' +
      '<number role="leftsub" font="normal" id="1">4</number>' +
      '<empty role="leftsuper" id="2"/>' +
      '<empty role="rightsub" id="3"/>' +
      '<empty role="rightsuper" id="4"/>' +
      '</children>' +
      '</tensor>' +
      '<number role="integer" font="normal" id="8">2</number>' +
      '</children>' +
      '</superscript>'
  );
  this.executeTreeTest(
      '<mmultiscripts><mo>(</mo><mprescripts/><mn>4</mn><mn>3</mn>' +
      '</mmultiscripts><mi>x</mi><msubsup><mo>)</mo><mn>1</mn>' +
      '<mn>2</mn></msubsup>',
      '<superscript role="leftright" fencepointer="7" id="11">' +
      '<children>' +
      '<subscript role="subsup" fencepointer="7" id="10">' +
      '<children>' +
      '<tensor role="leftright" fencepointer="0" id="5">' +
      '<children>' +
      '<fenced role="leftright" id="12">' +
      '<content>' +
      '<fence role="open" id="0">(</fence>' +
      '<fence role="close" id="7">)</fence>' +
      '</content>' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="6">x</identifier>' +
      '</children>' +
      '</fenced>' +
      '<number role="leftsub" font="normal" id="1">4</number>' +
      '<number role="leftsuper" font="normal" id="2">3</number>' +
      '<empty role="rightsub" id="3"/>' +
      '<empty role="rightsuper" id="4"/>' +
      '</children>' +
      '</tensor>' +
      '<number role="integer" font="normal" id="8">1</number>' +
      '</children>' +
      '</subscript>' +
      '<number role="integer" font="normal" id="9">2</number>' +
      '</children>' +
      '</superscript>'
  );
  this.executeTreeTest(
      '<munder><mmultiscripts><mo>(</mo><mprescripts/><mn>4</mn><mn>3</mn>' +
      '</mmultiscripts><mo>~</mo></munder>' +
      '<mi>x</mi><mover><msubsup><mo>)</mo><mn>1</mn><mn>2</mn>' +
      '</msubsup><mo>^</mo></mover>',
      '<superscript role="leftright" fencepointer="9" id="13">' +
      '<children>' +
      '<subscript role="subsup" fencepointer="9" id="12">' +
      '<children>' +
      '<tensor role="leftright" fencepointer="0" id="5">' +
      '<children>' +
      '<fenced role="leftright" id="16">' +
      '<content>' +
      '<underscore role="open" embellished="fence" id="7">' +
      '<children>' +
      '<fence role="open" id="0">(</fence>' +
      '<relation role="underaccent" id="6">~</relation>' +
      '</children>' +
      '</underscore>' +
      '<overscore role="close" embellished="fence" id="15">' +
      '<children>' +
      '<fence role="close" id="9">)</fence>' +
      '<operator role="overaccent" id="14">^</operator>' +
      '</children>' +
      '</overscore>' +
      '</content>' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="8">x</identifier>' +
      '</children>' +
      '</fenced>' +
      '<number role="leftsub" font="normal" id="1">4</number>' +
      '<number role="leftsuper" font="normal" id="2">3</number>' +
      '<empty role="rightsub" id="3"/>' +
      '<empty role="rightsuper" id="4"/>' +
      '</children>' +
      '</tensor>' +
      '<number role="integer" font="normal" id="10">1</number>' +
      '</children>' +
      '</subscript>' +
      '<number role="integer" font="normal" id="11">2</number>' +
      '</children>' +
      '</superscript>'
  );
};


/**
 * Expressions with padded background.
 */
sre.SemanticTreeTest.prototype.testStreeEmbellishedPaddedFences = function() {
  this.executeTreeTest(
      '<mo>(</mo><mi>x</mi><mpadded mathbackground="red"><msup><munder>' +
      '<msub><mover><mo>)</mo>' +
      '<mo>^</mo></mover><mn>2</mn></msub><mo>~</mo></munder><mn>3</mn>' +
      '</msup></mpadded>',
      '<superscript role="leftright" fencepointer="8" id="10">' +
      '<children>' +
      '<subscript role="leftright" fencepointer="4" id="6">' +
      '<children>' +
      '<fenced role="leftright" id="11">' +
      '<content>' +
      '<fence role="open" id="0">(</fence>' +
      '<underscore role="close" embellished="fence" id="8">' +
      '<children>' +
      '<overscore role="close" embellished="fence" id="4">' +
      '<children>' +
      '<fence role="close" id="2">)</fence>' +
      '<operator role="overaccent" id="3">^</operator>' +
      '</children>' +
      '</overscore>' +
      '<relation role="underaccent" id="7">~</relation>' +
      '</children>' +
      '</underscore>' +
      '</content>' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="1">x</identifier>' +
      '</children>' +
      '</fenced>' +
      '<number role="integer" font="normal" id="5">2</number>' +
      '</children>' +
      '</subscript>' +
      '<number role="integer" font="normal" id="9">3</number>' +
      '</children>' +
      '</superscript>'
  );
  this.executeTreeTest(
      '<mpadded mathbackground="red"><mmultiscripts><mover><mmultiscripts>' +
      '<munder><mo>(</mo><mo>~</mo>' +
      '</munder><mprescripts/><none/><mn>3</mn></mmultiscripts><mo>^</mo>' +
      '</mover><mprescripts/><mn>4</mn>' +
      '</mmultiscripts></mpadded><mi>x</mi><mo>)</mo>',
      '<tensor role="leftright" fencepointer="9" id="14">' +
      '<children>' +
      '<tensor role="leftright" fencepointer="2" id="7">' +
      '<children>' +
      '<fenced role="leftright" id="17">' +
      '<content>' +
      '<overscore role="open" embellished="fence" id="9">' +
      '<children>' +
      '<underscore role="open" embellished="fence" id="2">' +
      '<children>' +
      '<fence role="open" id="0">(</fence>' +
      '<relation role="underaccent" id="1">~</relation>' +
      '</children>' +
      '</underscore>' +
      '<operator role="overaccent" id="8">^</operator>' +
      '</children>' +
      '</overscore>' +
      '<fence role="close" id="16">)</fence>' +
      '</content>' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="15">x</identifier>' +
      '</children>' +
      '</fenced>' +
      '<empty role="leftsub" id="3"/>' +
      '<number role="leftsuper" font="normal" id="4">3</number>' +
      '<empty role="rightsub" id="5"/>' +
      '<empty role="rightsuper" id="6"/>' +
      '</children>' +
      '</tensor>' +
      '<number role="leftsub" font="normal" id="10">4</number>' +
      '<empty role="leftsuper" id="11"/>' +
      '<empty role="rightsub" id="12"/>' +
      '<empty role="rightsuper" id="13"/>' +
      '</children>' +
      '</tensor>'
  );
  this.executeTreeTest(
      '<mpadded mathbackground="blue"><munder><mmultiscripts><mo>(</mo>' +
      '<mprescripts/><mn>4</mn><mn>3</mn>' +
      '</mmultiscripts><mo>~</mo></munder></mpadded>' +
      '<mi>x</mi><mpadded mathbrackground="red"><mover><msubsup><mo>)</mo>' +
      '<mn>1</mn><mn>2</mn></msubsup><mo>^</mo></mover></mpadded>',
      '<superscript role="leftright" fencepointer="9" id="13">' +
      '<children>' +
      '<subscript role="subsup" fencepointer="9" id="12">' +
      '<children>' +
      '<tensor role="leftright" fencepointer="0" id="5">' +
      '<children>' +
      '<fenced role="leftright" id="16">' +
      '<content>' +
      '<underscore role="open" embellished="fence" id="7">' +
      '<children>' +
      '<fence role="open" id="0">(</fence>' +
      '<relation role="underaccent" id="6">~</relation>' +
      '</children>' +
      '</underscore>' +
      '<overscore role="close" embellished="fence" id="15">' +
      '<children>' +
      '<fence role="close" id="9">)</fence>' +
      '<operator role="overaccent" id="14">^</operator>' +
      '</children>' +
      '</overscore>' +
      '</content>' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="8">x</identifier>' +
      '</children>' +
      '</fenced>' +
      '<number role="leftsub" font="normal" id="1">4</number>' +
      '<number role="leftsuper" font="normal" id="2">3</number>' +
      '<empty role="rightsub" id="3"/>' +
      '<empty role="rightsuper" id="4"/>' +
      '</children>' +
      '</tensor>' +
      '<number role="integer" font="normal" id="10">1</number>' +
      '</children>' +
      '</subscript>' +
      '<number role="integer" font="normal" id="11">2</number>' +
      '</children>' +
      '</superscript>'
  );
};


/**
 * Expressions with embellished fences right.
 */
sre.SemanticTreeTest.prototype.testStreeEmbellishedNeutralFences = function() {
  this.executeTreeTest(
      '<mo>|</mo><mi>x</mi><msup><mo>|</mo><mn>4</mn></msup>',
      '<superscript role="neutral" fencepointer="2" id="4">' +
      '<children>' +
      '<fenced role="neutral" id="5">' +
      '<content>' +
      '<fence role="neutral" id="0">|</fence>' +
      '<fence role="neutral" id="2">|</fence>' +
      '</content>' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="1">x</identifier>' +
      '</children>' +
      '</fenced>' +
      '<number role="integer" font="normal" id="3">4</number>' +
      '</children>' +
      '</superscript>'
  );
  this.executeTreeTest(
      '<mo>|</mo><mi>x</mi><msup><mo>|</mo><mn>4</mn></msup><mo>+</mo>' +
      '<mo>|</mo><mi>y</mi><msup><mo>|</mo><mn>3</mn></msup>',
      '<infixop role="addition" id="13">+' +
      '<content>' +
      '<operator role="addition" id="5">+</operator>' +
      '</content>' +
      '<children>' +
      '<superscript role="neutral" fencepointer="2" id="4">' +
      '<children>' +
      '<fenced role="neutral" id="11">' +
      '<content>' +
      '<fence role="neutral" id="0">|</fence>' +
      '<fence role="neutral" id="2">|</fence>' +
      '</content>' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="1">x</identifier>' +
      '</children>' +
      '</fenced>' +
      '<number role="integer" font="normal" id="3">4</number>' +
      '</children>' +
      '</superscript>' +
      '<superscript role="neutral" fencepointer="8" id="10">' +
      '<children>' +
      '<fenced role="neutral" id="12">' +
      '<content>' +
      '<fence role="neutral" id="6">|</fence>' +
      '<fence role="neutral" id="8">|</fence>' +
      '</content>' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="7">y</identifier>' +
      '</children>' +
      '</fenced>' +
      '<number role="integer" font="normal" id="9">3</number>' +
      '</children>' +
      '</superscript>' +
      '</children>' +
      '</infixop>'
  );
  this.executeTreeTest(
      '<mo>|</mo><mi>x</mi><msub><msup><mo>|</mo><mn>4</mn></msup>' +
      '<mn>2</mn></msub>',
      '<subscript role="neutral" fencepointer="2" id="6">' +
      '<children>' +
      '<superscript role="neutral" fencepointer="2" id="4">' +
      '<children>' +
      '<fenced role="neutral" id="7">' +
      '<content>' +
      '<fence role="neutral" id="0">|</fence>' +
      '<fence role="neutral" id="2">|</fence>' +
      '</content>' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="1">x</identifier>' +
      '</children>' +
      '</fenced>' +
      '<number role="integer" font="normal" id="3">4</number>' +
      '</children>' +
      '</superscript>' +
      '<number role="integer" font="normal" id="5">2</number>' +
      '</children>' +
      '</subscript>'
  );
  this.executeTreeTest(
      '<mo>|</mo><mi>x</mi><mpadded mathbackground="blue"><msup><mo>|</mo>' +
      '<mn>4</mn></msup></mpadded>',
      '<superscript role="neutral" fencepointer="2" id="4">' +
      '<children>' +
      '<fenced role="neutral" id="5">' +
      '<content>' +
      '<fence role="neutral" id="0">|</fence>' +
      '<fence role="neutral" id="2">|</fence>' +
      '</content>' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="1">x</identifier>' +
      '</children>' +
      '</fenced>' +
      '<number role="integer" font="normal" id="3">4</number>' +
      '</children>' +
      '</superscript>'
  );
  this.executeTreeTest(
      '<mmultiscripts><mo>|</mo><mprescripts/><mn>4</mn><mn>3</mn>' +
      '</mmultiscripts><mi>x</mi><mo>|</mo>',
      '<tensor role="neutral" fencepointer="0" id="5">' +
      '<children>' +
      '<fenced role="neutral" id="8">' +
      '<content>' +
      '<fence role="neutral" id="0">|</fence>' +
      '<fence role="neutral" id="7">|</fence>' +
      '</content>' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="6">x</identifier>' +
      '</children>' +
      '</fenced>' +
      '<number role="leftsub" font="normal" id="1">4</number>' +
      '<number role="leftsuper" font="normal" id="2">3</number>' +
      '<empty role="rightsub" id="3"/>' +
      '<empty role="rightsuper" id="4"/>' +
      '</children>' +
      '</tensor>'
  );
  this.executeTreeTest(
      '<mmultiscripts><mo>|</mo><mprescripts/><mn>4</mn><mn>3</mn>' +
      '</mmultiscripts><mi>x</mi><msubsup><mo>|</mo><mn>1</mn><mn>2</mn>' +
      '</msubsup>',
      '<superscript role="neutral" fencepointer="7" id="11">' +
      '<children>' +
      '<subscript role="subsup" fencepointer="7" id="10">' +
      '<children>' +
      '<tensor role="neutral" fencepointer="0" id="5">' +
      '<children>' +
      '<fenced role="neutral" id="12">' +
      '<content>' +
      '<fence role="neutral" id="0">|</fence>' +
      '<fence role="neutral" id="7">|</fence>' +
      '</content>' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="6">x</identifier>' +
      '</children>' +
      '</fenced>' +
      '<number role="leftsub" font="normal" id="1">4</number>' +
      '<number role="leftsuper" font="normal" id="2">3</number>' +
      '<empty role="rightsub" id="3"/>' +
      '<empty role="rightsuper" id="4"/>' +
      '</children>' +
      '</tensor>' +
      '<number role="integer" font="normal" id="8">1</number>' +
      '</children>' +
      '</subscript>' +
      '<number role="integer" font="normal" id="9">2</number>' +
      '</children>' +
      '</superscript>'
  );
  this.executeTreeTest(
      '<mo>|</mo><mi>x</mi><mo>\u00A6</mo><mi>y</mi><msup><mo>|</mo><mn>4</mn></msup>',
      '<superscript role="neutral" fencepointer="4" id="6">' +
      '<children>' +
      '<fenced role="neutral" id="8">' +
      '<content>' +
      '<fence role="neutral" id="0">|</fence>' +
      '<fence role="neutral" id="4">|</fence>' +
      '</content>' +
      '<children>' +
      '<punctuated role="sequence" id="7">' +
      '<content>' +
      '<punctuation role="vbar" id="2">¦</punctuation>' +
      '</content>' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="1">x</identifier>' +
      '<punctuation role="vbar" id="2">¦</punctuation>' +
      '<identifier role="latinletter" font="italic" id="3">y</identifier>' +
      '</children>' +
      '</punctuated>' +
      '</children>' +
      '</fenced>' +
      '<number role="integer" font="normal" id="5">4</number>' +
      '</children>' +
      '</superscript>'
  );
};


// Actions.
/**
 * Ignore Mactions!
 */
sre.SemanticTreeTest.prototype.testStreeActions = function() {
  this.brief = true;
  this.executeTreeTest(
      '<maction><mtext>something</mtext><mn>2</mn></maction>',
      '<number>2</number>');
  this.executeTreeTest(
      '<maction><mtext>something</mtext><mi>a</mi></maction>',
      '<identifier>a</identifier>');
};


// Semantics, annotation, annotation-xml
/**
 * Expressions with semantic elements.
 */
sre.SemanticTreeTest.prototype.testSemanticsElement = function() {
  this.brief = true;
  this.executeTreeTest(
      '<semantics></semantics>',
      '<empty/>'
  );
  this.executeTreeTest(
      '<semantics><mi>a</mi></semantics>',
      '<identifier>a</identifier>'
  );
  this.executeTreeTest(
      '<semantics><mrow><mi>a</mi><mo>+</mo><mi>b</mi></mrow></semantics>',
      '<infixop>+' +
      '<content><operator>+</operator></content>' +
      '<children>' +
      '<identifier>a</identifier>' +
      '<identifier>b</identifier>' +
      '</children>' +
      '</infixop>'
  );
  this.executeTreeTest(
      '<mi>a</mi><mo>+</mo><semantics><mi>b</mi></semantics>',
      '<infixop>+' +
      '<content><operator>+</operator></content>' +
      '<children>' +
      '<identifier>a</identifier>' +
      '<identifier>b</identifier>' +
      '</children>' +
      '</infixop>'
  );
};


/**
 * Expressions with semantic elements and annotations.
 */
sre.SemanticTreeTest.prototype.testSemanticsAnnotation = function() {
  this.brief = true;
  // This is not really legal markup.
  this.executeTreeTest(
      '<semantics><annotation>something</annotation></semantics>',
      '<empty/>'
  );
  this.executeTreeTest(
      '<mi>a</mi><semantics><annotation><content>something</content>' +
      '</annotation></semantics>',
      '<identifier>a</identifier>'
  );
  this.executeTreeTest(
      '<semantics><mi>a</mi><annotation>something</annotation></semantics>',
      '<identifier>a</identifier>'
  );
  this.executeTreeTest(
      '<semantics><mrow><mi>a</mi><mo>+</mo><mi>b</mi></mrow>' +
      '<annotation>something</annotation></semantics>',
      '<infixop>+' +
      '<content><operator>+</operator></content>' +
      '<children>' +
      '<identifier>a</identifier>' +
      '<identifier>b</identifier>' +
      '</children>' +
      '</infixop>'
  );
  this.executeTreeTest(
      '<mi>a</mi><mo>+</mo><semantics><mi>b</mi>' +
      '<annotation>something</annotation></semantics>',
      '<infixop>+' +
      '<content><operator>+</operator></content>' +
      '<children>' +
      '<identifier>a</identifier>' +
      '<identifier>b</identifier>' +
      '</children>' +
      '</infixop>'
  );
};


/**
 * Expressions with semantic elements and xml annotations.
 */
sre.SemanticTreeTest.prototype.testSemanticsAnnotationXml = function() {
  this.brief = true;
  // This is not really legal markup.
  this.executeTreeTest(
      '<semantics><annotation-xml><content>something</content>' +
      '</annotation-xml></semantics>',
      '<text>something</text>'
  );
  this.executeTreeTest(
      '<mi>a</mi><semantics><annotation-xml><content>something</content>' +
      '</annotation-xml></semantics>',
      '<punctuated><content><punctuation>⁣</punctuation>' +
      '</content><children><identifier>a</identifier>' +
      '<text>something</text></children></punctuated>'
  );
  this.executeTreeTest(
      '<semantics><mi>a</mi><annotation-xml><content>something</content>' +
      '</annotation-xml></semantics>',
      '<identifier>a</identifier>'
  );
  this.executeTreeTest(
      '<semantics><mrow><mi>a</mi><mo>+</mo><mi>b</mi></mrow>' +
      '<annotation-xml><content>something</content>' +
      '</annotation-xml></semantics>',
      '<infixop>+' +
      '<content><operator>+</operator></content>' +
      '<children>' +
      '<identifier>a</identifier>' +
      '<identifier>b</identifier>' +
      '</children>' +
      '</infixop>'
  );
  this.executeTreeTest(
      '<mi>a</mi><mo>+</mo><semantics><mi>b</mi><annotation-xml>' +
      '<content>something</content></annotation-xml></semantics>',
      '<infixop>+' +
      '<content><operator>+</operator></content>' +
      '<children>' +
      '<identifier>a</identifier>' +
      '<identifier>b</identifier>' +
      '</children>' +
      '</infixop>'
  );
};


/**
 * Binomial coefficients generated with fractions.
 */
sre.SemanticTreeTest.prototype.testStreeBinomial = function() {
  this.brief = false;
  this.executeTreeTest(
      '<mfenced open="(" close=")"><mfrac linethickness="0"><mi>n</mi><mi>k' +
      '</mi></mfrac></mfenced>',
      '<vector role="binomial" id="4">' +
      '<content>' +
      '<fence role="open" id="5">(</fence>' +
      '<fence role="close" id="6">)</fence>' +
      '</content>' +
      '<children>' +
      '<line role="binomial" id="2">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="0">n</identifier>' +
      '</children>' +
      '</line>' +
      '<line role="binomial" id="3">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="1">k</identifier>' +
      '</children>' +
      '</line>' +
      '</children>' +
      '</vector>');
  this.executeTreeTest(
      '<mrow><mrow><mo>(</mo></mrow><mfrac linethickness="0"><mi>n</mi><mi>k' +
      '</mi></mfrac><mrow><mo>)</mo></mrow></mrow>',
      '<vector role="binomial" id="5">' +
      '<content>' +
      '<fence role="open" id="0">(</fence>' +
      '<fence role="close" id="6">)</fence>' +
      '</content>' +
      '<children>' +
      '<line role="binomial" id="3">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="1">n</identifier>' +
      '</children>' +
      '</line>' +
      '<line role="binomial" id="4">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="2">k</identifier>' +
      '</children>' +
      '</line>' +
      '</children>' +
      '</vector>');
  this.executeTreeTest(
      '<mrow><mrow><mo>(</mo></mrow><mfrac linethickness="0"><mi>n</mi><mrow>' +
      '<mi>k</mi><mo>+</mo><mi>l</mi></mrow></mfrac><mrow><mo>)</mo></mrow></mrow>',
      '<vector role="binomial" id="8">' +
      '<content>' +
      '<fence role="open" id="0">(</fence>' +
      '<fence role="close" id="9">)</fence>' +
      '</content>' +
      '<children>' +
      '<line role="binomial" id="6">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="1">n</identifier>' +
      '</children>' +
      '</line>' +
      '<line role="binomial" id="7">' +
      '<children>' +
      '<infixop role="addition" id="5">+' +
      '<content>' +
      '<operator role="addition" id="3">+</operator>' +
      '</content>' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="2">k</identifier>' +
      '<identifier role="latinletter" font="italic" id="4">l</identifier>' +
      '</children>' +
      '</infixop>' +
      '</children>' +
      '</line>' +
      '</children>' +
      '</vector>');
  this.executeTreeTest(
      '<mrow><mrow><mo>(</mo></mrow><mfrac linethickness="0"><mrow><mi>n</mi>' +
      '<mo>+</mo><mi>k</mi><mo>+</mo><mi>l</mi></mrow><mrow><mi>k</mi><mo>+' +
      '</mo><mi>l</mi><mo>-</mo><mn>1</mn></mrow></mfrac><mrow><mo>)</mo>' +
      '</mrow></mrow>',
      '<vector role="binomial" id="16">' +
      '<content>' +
      '<fence role="open" id="0">(</fence>' +
      '<fence role="close" id="17">)</fence>' +
      '</content>' +
      '<children>' +
      '<line role="binomial" id="14">' +
      '<children>' +
      '<infixop role="addition" id="6">+<content>' +
      '<operator role="addition" id="2">+</operator>' +
      '<operator role="addition" id="4">+</operator>' +
      '</content>' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="1">n</identifier>' +
      '<identifier role="latinletter" font="italic" id="3">k</identifier>' +
      '<identifier role="latinletter" font="italic" id="5">l</identifier>' +
      '</children>' +
      '</infixop>' +
      '</children>' +
      '</line>' +
      '<line role="binomial" id="15">' +
      '<children>' +
      '<infixop role="subtraction" id="13">-<content>' +
      '<operator role="subtraction" id="10">-</operator>' +
      '</content>' +
      '<children>' +
      '<infixop role="addition" id="12">+<content>' +
      '<operator role="addition" id="8">+</operator>' +
      '</content>' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="7">k</identifier>' +
      '<identifier role="latinletter" font="italic" id="9">l</identifier>' +
      '</children>' +
      '</infixop>' +
      '<number role="integer" font="normal" id="11">1</number>' +
      '</children>' +
      '</infixop>' +
      '</children>' +
      '</line>' +
      '</children>' +
      '</vector>');
  this.executeTreeTest(
      '<mrow><mo>(</mo><mtable><mtr><mtd><mi>a</mi></mtd></mtr><mtr><mtd>' +
      '<mi>b</mi></mtd></mtr></mtable><mo>)</mo></mrow>',
      '<vector role="binomial" id="7">' +
      '<content>' +
      '<fence role="open" id="0">(</fence>' +
      '<fence role="close" id="8">)</fence>' +
      '</content>' +
      '<children>' +
      '<line role="binomial" id="3">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="1">a</identifier>' +
      '</children>' +
      '</line>' +
      '<line role="binomial" id="6">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="4">b</identifier>' +
      '</children>' +
      '</line>' +
      '</children>' +
      '</vector>');
};


/**
 * Binomial coefficients generated with fractions and redundant elements.
 */
sre.SemanticTreeTest.prototype.testStreeBinomialWithIgnores = function() {
  this.brief = false;
  this.executeTreeTest(
      '<mfenced open="(" close=")"><mfrac linethickness="0">' +
      '<mrow><mi>n</mi></mrow><mi>k</mi></mfrac></mfenced>',
      '<vector role="binomial" id="4">' +
      '<content>' +
      '<fence role="open" id="5">(</fence>' +
      '<fence role="close" id="6">)</fence>' +
      '</content>' +
      '<children>' +
      '<line role="binomial" id="2">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="0">n</identifier>' +
      '</children>' +
      '</line>' +
      '<line role="binomial" id="3">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="1">k</identifier>' +
      '</children>' +
      '</line>' +
      '</children>' +
      '</vector>');
  this.executeTreeTest(
      '<mfenced open="(" close=")"><mfrac linethickness="0">' +
      '<mrow><mi>n</mi></mrow><mpadded><mi>k</mi></mpadded></mfrac></mfenced>',
      '<vector role="binomial" id="4">' +
      '<content>' +
      '<fence role="open" id="5">(</fence>' +
      '<fence role="close" id="6">)</fence>' +
      '</content>' +
      '<children>' +
      '<line role="binomial" id="2">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="0">n</identifier>' +
      '</children>' +
      '</line>' +
      '<line role="binomial" id="3">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="1">k</identifier>' +
      '</children>' +
      '</line>' +
      '</children>' +
      '</vector>');
  this.executeTreeTest(
      '<mfenced open="(" close=")"><mfrac linethickness="0">' +
      '<mi>n</mi><mpadded><mi>k</mi></mpadded></mfrac></mfenced>',
      '<vector role="binomial" id="4">' +
      '<content>' +
      '<fence role="open" id="5">(</fence>' +
      '<fence role="close" id="6">)</fence>' +
      '</content>' +
      '<children>' +
      '<line role="binomial" id="2">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="0">n</identifier>' +
      '</children>' +
      '</line>' +
      '<line role="binomial" id="3">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="1">k</identifier>' +
      '</children>' +
      '</line>' +
      '</children>' +
      '</vector>');
  this.executeTreeTest(
      '<mrow><mrow><mo>(</mo></mrow><mfrac linethickness="0">' +
      '<mrow><mi>n</mi></mrow><mi>k</mi>' +
      '</mfrac><mrow><mo>)</mo></mrow></mrow>',
      '<vector role="binomial" id="5">' +
      '<content>' +
      '<fence role="open" id="0">(</fence>' +
      '<fence role="close" id="6">)</fence>' +
      '</content>' +
      '<children>' +
      '<line role="binomial" id="3">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="1">n</identifier>' +
      '</children>' +
      '</line>' +
      '<line role="binomial" id="4">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="2">k</identifier>' +
      '</children>' +
      '</line>' +
      '</children>' +
      '</vector>');
  this.executeTreeTest(
      '<mrow><mrow><mo>(</mo></mrow><mfrac linethickness="0">' +
      '<mrow><mi>n</mi></mrow><mpadded><mi>k</mi></mpadded>' +
      '</mfrac><mrow><mo>)</mo></mrow></mrow>',
      '<vector role="binomial" id="5">' +
      '<content>' +
      '<fence role="open" id="0">(</fence>' +
      '<fence role="close" id="6">)</fence>' +
      '</content>' +
      '<children>' +
      '<line role="binomial" id="3">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="1">n</identifier>' +
      '</children>' +
      '</line>' +
      '<line role="binomial" id="4">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="2">k</identifier>' +
      '</children>' +
      '</line>' +
      '</children>' +
      '</vector>');
  this.executeTreeTest(
      '<mrow><mrow><mo>(</mo></mrow><mfrac linethickness="0">' +
      '<mi>n</mi><mpadded><mi>k</mi></mpadded>' +
      '</mfrac><mrow><mo>)</mo></mrow></mrow>',
      '<vector role="binomial" id="5">' +
      '<content>' +
      '<fence role="open" id="0">(</fence>' +
      '<fence role="close" id="6">)</fence>' +
      '</content>' +
      '<children>' +
      '<line role="binomial" id="3">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="1">n</identifier>' +
      '</children>' +
      '</line>' +
      '<line role="binomial" id="4">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="2">k</identifier>' +
      '</children>' +
      '</line>' +
      '</children>' +
      '</vector>');
};


/**
 * Binomial coefficient like elements, without fences.
 */
sre.SemanticTreeTest.prototype.testStreeBinomialOther = function() {
  this.brief = false;
  this.executeTreeTest(
      '<mfrac linethickness="0"><mi>n</mi><mi>k</mi></mfrac>',
      '<multiline role="binomial" id="4">' +
      '<children>' +
      '<line role="binomial" id="2">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="0">n</identifier>' +
      '</children>' +
      '</line>' +
      '<line role="binomial" id="3">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="1">k</identifier>' +
      '</children>' +
      '</line>' +
      '</children>' +
      '</multiline>'
  );
  this.executeTreeTest(
      '<mfrac linethickness="0"><mrow><mi>n</mi></mrow><mi>k</mi></mfrac>',
      '<multiline role="binomial" id="4">' +
      '<children>' +
      '<line role="binomial" id="2">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="0">n</identifier>' +
      '</children>' +
      '</line>' +
      '<line role="binomial" id="3">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="1">k</identifier>' +
      '</children>' +
      '</line>' +
      '</children>' +
      '</multiline>'
  );
  this.executeTreeTest(
      '<mfrac linethickness="0"><mi>n</mi>' +
      '<mpadded><mi>k</mi></mpadded></mfrac>',
      '<multiline role="binomial" id="4">' +
      '<children>' +
      '<line role="binomial" id="2">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="0">n</identifier>' +
      '</children>' +
      '</line>' +
      '<line role="binomial" id="3">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="1">k</identifier>' +
      '</children>' +
      '</line>' +
      '</children>' +
      '</multiline>'
  );
  this.executeTreeTest(
      '<mfrac linethickness="0"><mrow><mi>n</mi></mrow>' +
      '<mpadded><mi>k</mi></mpadded></mfrac>',
      '<multiline role="binomial" id="4">' +
      '<children>' +
      '<line role="binomial" id="2">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="0">n</identifier>' +
      '</children>' +
      '</line>' +
      '<line role="binomial" id="3">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="1">k</identifier>' +
      '</children>' +
      '</line>' +
      '</children>' +
      '</multiline>'
  );
  this.executeTreeTest(
      '<mtable><mtr><mtd><mi>a</mi></mtd></mtr><mtr><mtd>' +
      '<mi>b</mi></mtd></mtr></mtable>',
      '<multiline role="binomial" id="6">' +
      '<children>' +
      '<line role="binomial" id="2">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="0">a</identifier>' +
      '</children>' +
      '</line>' +
      '<line role="binomial" id="5">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="3">b</identifier>' +
      '</children>' +
      '</line>' +
      '</children>' +
      '</multiline>'
  );
};


/**
 * Trivially punctuated elements.
 */
sre.SemanticTreeTest.prototype.testStreeTrivialPunctuated = function() {
  this.brief = false;
  this.executeTreeTest(
      '<mo>,</mo>',
      '<punctuation role="comma" id="0">,</punctuation>'
  );
  this.executeTreeTest(
      '<mo>,</mo><mo>,</mo>',
      '<punctuated role="comma" id="2">' +
      '<content>' +
      '<punctuation role="comma" id="0">,</punctuation>' +
      '<punctuation role="comma" id="1">,</punctuation>' +
      '</content>' +
      '<children>' +
      '<punctuation role="comma" id="0">,</punctuation>' +
      '<punctuation role="comma" id="1">,</punctuation>' +
      '</children>' +
      '</punctuated>'
  );
  this.executeTreeTest(
      '<mo>,</mo><mo>;</mo>',
      '<punctuated role="sequence" id="2">' +
      '<content>' +
      '<punctuation role="comma" id="0">,</punctuation>' +
      '<punctuation role="unknown" id="1">;</punctuation>' +
      '</content>' +
      '<children>' +
      '<punctuation role="comma" id="0">,</punctuation>' +
      '<punctuation role="unknown" id="1">;</punctuation>' +
      '</children>' +
      '</punctuated>'
  );
  this.executeTreeTest(
      '<mo>{</mo><mo>,</mo><mo>}</mo>',
      '<fenced role="leftright" id="3">' +
      '<content>' +
      '<fence role="open" id="0">{</fence>' +
      '<fence role="close" id="2">}</fence>' +
      '</content>' +
      '<children>' +
      '<punctuation role="comma" id="1">,</punctuation>' +
      '</children>' +
      '</fenced>'
  );
  this.executeTreeTest(
      '<mo>{</mo><mo>,</mo><mo>,</mo><mo>}</mo>',
      '<fenced role="leftright" id="5">' +
      '<content>' +
      '<fence role="open" id="0">{</fence>' +
      '<fence role="close" id="3">}</fence>' +
      '</content>' +
      '<children>' +
      '<punctuated role="comma" id="4">' +
      '<content>' +
      '<punctuation role="comma" id="1">,</punctuation>' +
      '<punctuation role="comma" id="2">,</punctuation>' +
      '</content>' +
      '<children>' +
      '<punctuation role="comma" id="1">,</punctuation>' +
      '<punctuation role="comma" id="2">,</punctuation>' +
      '</children>' +
      '</punctuated>' +
      '</children>' +
      '</fenced>'
  );
};


/**
 * Trivially punctuated elements.
 */
sre.SemanticTreeTest.prototype.testStreeFonts = function() {
  this.executeTreeTest(
      '<mi>A</mi>',
      '<identifier role="latinletter" font="italic" id="0">A</identifier>'
  );
  this.executeTreeTest(
      '<mi mathvariant="italic">A</mi>',
      '<identifier role="latinletter" font="italic" id="0">A</identifier>'
  );
  this.executeTreeTest(
      '<mi mathvariant="bold">A</mi>',
      '<identifier role="latinletter" font="bold" id="0">A</identifier>'
  );
  this.executeTreeTest(
      '<mi mathvariant="-tex-caligraphic">A</mi>',
      '<identifier role="latinletter" font="caligraphic" id="0">A</identifier>'
  );
  this.executeTreeTest(
      '<mi mathvariant="-tex-oldstyle">A</mi>',
      '<identifier role="latinletter" font="oldstyle" id="0">A</identifier>'
  );
  this.executeTreeTest(
      '<mi>𝝖</mi>',
      '<identifier role="greekletter" font="sans-serif-bold"' +
      ' id="0">𝝖</identifier>'
  );
};


/**
 * Tests for dealing with empty accents and embellishments.
 */
sre.SemanticTreeTest.prototype.testStreeEmptyAccents = function() {
  this.executeTreeTest(
      '<munderover><mo>→</mo><mo>≅</mo><mrow/></munderover>',
      '<overscore role="arrow" embellished="relation" id="4">' +
      '<children>' +
      '<underscore role="underover" embellished="relation" id="3">' +
      '<children>' +
      '<relation role="arrow" id="0">→</relation>' +
      '<relation role="underaccent" id="1">≅</relation>' +
      '</children>' +
      '</underscore>' +
      '<empty role="unknown" id="2"/>' +
      '</children>' +
      '</overscore>'
  );
  this.executeTreeTest(
      '<munderover><mo>→</mo><mrow/><mo>≅</mo></munderover>',
      '<underscore role="arrow" embellished="relation" id="4">' +
      '<children>' +
      '<overscore role="underover" embellished="relation" id="3">' +
      '<children>' +
      '<relation role="arrow" id="0">→</relation>' +
      '<relation role="overaccent" id="2">≅</relation>' +
      '</children>' +
      '</overscore>' +
      '<empty role="unknown" id="1"/>' +
      '</children>' +
      '</underscore>'
  );
  this.executeTreeTest(
      '<munderover><mo>→</mo><mo>≅</mo><mo>=</mo></munderover>',
      '<overscore role="arrow" embellished="relation" id="4">' +
      '<children>' +
      '<underscore role="underover" embellished="relation" id="3">' +
      '<children>' +
      '<relation role="arrow" id="0">→</relation>' +
      '<relation role="underaccent" id="1">≅</relation>' +
      '</children>' +
      '</underscore>' +
      '<relation role="overaccent" id="2">=</relation>' +
      '</children>' +
      '</overscore>'
  );
  this.executeTreeTest(
      '<munderover><mi>A</mi><mo>≅</mo><mrow/></munderover>',
      '<overscore role="latinletter" id="4">' +
      '<children>' +
      '<underscore role="underover" id="3">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="0">A</identifier>' +
      '<relation role="underaccent" id="1">≅</relation>' +
      '</children>' +
      '</underscore>' +
      '<empty role="unknown" id="2"/>' +
      '</children>' +
      '</overscore>'
  );
  this.executeTreeTest(
      '<munderover><mi>A</mi><mrow/><mo>≅</mo></munderover>',
      '<underscore role="latinletter" id="4">' +
      '<children>' +
      '<overscore role="underover" id="3">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="0">A</identifier>' +
      '<relation role="overaccent" id="2">≅</relation>' +
      '</children>' +
      '</overscore>' +
      '<empty role="unknown" id="1"/>' +
      '</children>' +
      '</underscore>'
  );
  this.executeTreeTest(
      '<munderover><mi>A</mi><mo>≅</mo><mo>=</mo></munderover>',
      '<overscore role="latinletter" id="4">' +
      '<children>' +
      '<underscore role="underover" id="3">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="0">A</identifier>' +
      '<relation role="underaccent" id="1">≅</relation>' +
      '</children>' +
      '</underscore>' +
      '<relation role="overaccent" id="2">=</relation>' +
      '</children>' +
      '</overscore>'
  );
  this.executeTreeTest(
      '<msubsup><mo>)</mo><mo>≅</mo><mrow/></msubsup>',
      '<superscript role="close" embellished="fence" id="4">' +
      '<children>' +
      '<subscript role="subsup" embellished="fence" id="3">' +
      '<children>' +
      '<fence role="close" id="0">)</fence>' +
      '<relation role="equality" id="1">≅</relation>' +
      '</children>' +
      '</subscript>' +
      '<empty role="unknown" id="2"/>' +
      '</children>' +
      '</superscript>'
  );
  this.executeTreeTest(
      '<msubsup><mo>)</mo><mrow/><mo>≅</mo></msubsup>',
      '<superscript role="close" embellished="fence" id="4">' +
      '<children>' +
      '<subscript role="subsup" embellished="fence" id="3">' +
      '<children>' +
      '<fence role="close" id="0">)</fence>' +
      '<empty role="unknown" id="1"/>' +
      '</children>' +
      '</subscript>' +
      '<relation role="equality" id="2">≅</relation>' +
      '</children>' +
      '</superscript>'
  );
  this.executeTreeTest(
      '<msubsup><mo>)</mo><mo>≅</mo><mo>=</mo></msubsup>',
      '<superscript role="close" embellished="fence" id="4">' +
      '<children>' +
      '<subscript role="subsup" embellished="fence" id="3">' +
      '<children>' +
      '<fence role="close" id="0">)</fence>' +
      '<relation role="equality" id="1">≅</relation>' +
      '</children>' +
      '</subscript>' +
      '<relation role="equality" id="2">=</relation>' +
      '</children>' +
      '</superscript>'
  );
};


/**
 * Ellipses and explicit spacing.
 */
sre.SemanticTreeTest.prototype.testStreeEllipsesExplicitSpacing = function() {
  this.executeTreeTest(
      '<mtext>&#xA0;</mtext><mo>&#x2026;</mo>',
      '<punctuated role="text" id="3">' +
      '<content>' +
      '<punctuation role="dummy" id="2">⁣</punctuation>' +
      '</content>' +
      '<children>' +
      '<text role="unknown" id="0"> </text>' +
      '<punctuation role="ellipsis" id="1">…</punctuation>' +
      '</children>' +
      '</punctuated>'
  );
  this.executeTreeTest(
      '<mo>&#x2026;</mo><mtext>&#xA0;</mtext>',
      '<punctuated role="text" id="3">' +
      '<content>' +
      '<punctuation role="dummy" id="2">⁣</punctuation>' +
      '</content>' +
      '<children>' +
      '<punctuation role="ellipsis" id="0">…</punctuation>' +
      '<text role="unknown" id="1"> </text>' +
      '</children>' +
      '</punctuated>'
  );
  this.executeTreeTest(
      '<mo>&#x2026;</mo><mtext>&#xA0;</mtext><mo>&#x2026;</mo>',
      '<punctuated role="text" id="5">' +
      '<content>' +
      '<punctuation role="dummy" id="3">⁣</punctuation>' +
      '<punctuation role="dummy" id="4">⁣</punctuation>' +
      '</content>' +
      '<children>' +
      '<punctuation role="ellipsis" id="0">…</punctuation>' +
      '<text role="unknown" id="1"> </text>' +
      '<punctuation role="ellipsis" id="2">…</punctuation>' +
      '</children>' +
      '</punctuated>'
  );
  this.executeTreeTest(
      '<mtext>&#xA0;</mtext><mo>&#x2026;</mo><mtext>&#xA0;</mtext>',
      '<punctuated role="text" id="5">' +
      '<content>' +
      '<punctuation role="dummy" id="3">⁣</punctuation>' +
      '<punctuation role="dummy" id="4">⁣</punctuation>' +
      '</content>' +
      '<children>' +
      '<text role="unknown" id="0"> </text>' +
      '<punctuation role="ellipsis" id="1">…</punctuation>' +
      '<text role="unknown" id="2"> </text>' +
      '</children>' +
      '</punctuated>'
  );
};


/**
 * Set expressions.
 */
sre.SemanticTreeTest.prototype.testStreeSets = function() {
  this.executeTreeTest(
    '<mo>{</mo><mo>}</mo>',
    '<fenced role="set empty" id="3">' +
      '<content>' +
      '<fence role="open" id="0">{</fence>' +
      '<fence role="close" id="1">}</fence>' +
      '</content>' +
      '<children>' +
      '<empty role="unknown" id="2"/>' +
      '</children>' +
      '</fenced>'
  );
  this.executeTreeTest(
    '<mo>{</mo><mi>x</mi><mo>}</mo>',
    '<fenced role="set singleton" id="3">' +
      '<content>' +
      '<fence role="open" id="0">{</fence>' +
      '<fence role="close" id="2">}</fence>' +
      '</content>' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="1">x</identifier>' +
      '</children>' +
      '</fenced>'
  );
  this.executeTreeTest(
    '<mo>{</mo><mi>x</mi><mo>,</mo><mi>y</mi><mo>}</mo>',
    '<fenced role="set collection" id="6">' +
      '<content>' +
      '<fence role="open" id="0">{</fence>' +
      '<fence role="close" id="4">}</fence>' +
      '</content>' +
      '<children>' +
      '<punctuated role="sequence" id="5">' +
      '<content>' +
      '<punctuation role="comma" id="2">,</punctuation>' +
      '</content>' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="1">x</identifier>' +
      '<punctuation role="comma" id="2">,</punctuation>' +
      '<identifier role="latinletter" font="italic" id="3">y</identifier>' +
      '</children>' +
      '</punctuated>' +
      '</children>' +
      '</fenced>'
  );
  this.executeTreeTest(
    '<mo>{</mo><mi>x</mi><mo>|</mo><mi>y</mi><mo>}</mo>',
    '<fenced role="set extended" id="6">' +
      '<content>' +
      '<fence role="open" id="0">{</fence>' +
      '<fence role="close" id="4">}</fence>' +
      '</content>' +
      '<children>' +
      '<punctuated role="sequence" id="5">' +
      '<content>' +
      '<punctuation role="vbar" id="2">|</punctuation>' +
      '</content>' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="1">x</identifier>' +
      '<punctuation role="vbar" id="2">|</punctuation>' +
      '<identifier role="latinletter" font="italic" id="3">y</identifier>' +
      '</children>' +
      '</punctuated>' +
      '</children>' +
      '</fenced>'
  );
  this.executeTreeTest(
    '<mo>{</mo><mi>x</mi><mo>:</mo><mi>y</mi><mo>}</mo>',
    '<fenced role="set extended" id="6">' +
      '<content>' +
      '<fence role="open" id="0">{</fence>' +
      '<fence role="close" id="4">}</fence>' +
      '</content>' +
      '<children>' +
      '<punctuated role="sequence" id="5">' +
      '<content>' +
      '<punctuation role="colon" id="2">:</punctuation>' +
      '</content>' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="1">x</identifier>' +
      '<punctuation role="colon" id="2">:</punctuation>' +
      '<identifier role="latinletter" font="italic" id="3">y</identifier>' +
      '</children>' +
      '</punctuated>' +
      '</children>' +
      '</fenced>'
  );
  this.executeTreeTest(
    '<mo>{</mo><mi>x</mi><mo>+</mo><mi>y</mi><mo>}</mo>',
    '<fenced role="leftright" id="6">' +
      '<content>' +
      '<fence role="open" id="0">{</fence>' +
      '<fence role="close" id="4">}</fence>' +
      '</content>' +
      '<children>' +
      '<infixop role="addition" id="5">+' +
      '<content>' +
      '<operator role="addition" id="2">+</operator>' +
      '</content>' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="1">x</identifier>' +
      '<identifier role="latinletter" font="italic" id="3">y</identifier>' +
      '</children>' +
      '</infixop>' +
      '</children>' +
      '</fenced>'
  );
  this.executeTreeTest(
    '<mo>{</mo><mi>x</mi><mi>y</mi><mo>}</mo>',
    '<fenced role="leftright" id="6">' +
      '<content>' +
      '<fence role="open" id="0">{</fence>' +
      '<fence role="close" id="3">}</fence>' +
      '</content>' +
      '<children>' +
      '<infixop role="implicit" id="5">⁢' +
      '<content>' +
      '<operator role="multiplication" id="4">⁢</operator>' +
      '</content>' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="1">x</identifier>' +
      '<identifier role="latinletter" font="italic" id="2">y</identifier>' +
      '</children>' +
      '</infixop>' +
      '</children>' +
      '</fenced>'
  );
  this.executeTreeTest(
    '<mo>{</mo><mfrac><mi>x</mi><mi>y</mi></mfrac><mo>}</mo>',
    '<fenced role="leftright" id="5">' +
      '<content>' +
      '<fence role="open" id="0">{</fence>' +
      '<fence role="close" id="4">}</fence>' +
      '</content>' +
      '<children>' +
      '<fraction role="division" id="3">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="1">x</identifier>' +
      '<identifier role="latinletter" font="italic" id="2">y</identifier>' +
      '</children>' +
      '</fraction>' +
      '</children>' +
      '</fenced>'
  );
  this.executeTreeTest(
    '<mi>P</mi><mo>{</mo><mi>x</mi><mo>}</mo>',
    '<appl role="simple function" id="6">' +
      '<content>' +
      '<punctuation role="application" id="5">⁡</punctuation>' +
      '<identifier role="simple function" font="italic" id="0">P</identifier>' +
      '</content>' +
      '<children>' +
      '<identifier role="simple function" font="italic" id="0">P</identifier>' +
      '<fenced role="leftright" id="4">' +
      '<content>' +
      '<fence role="open" id="1">{</fence>' +
      '<fence role="close" id="3">}</fence>' +
      '</content>' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="2">x</identifier>' +
      '</children>' +
      '</fenced>' +
      '</children>' +
      '</appl>'
  );
};


sre.SemanticTreeTest.prototype.testStreeVulgarFractions = function() {
  this.executeTreeTest(
    '<mfrac><mn>1</mn><mn>2</mn></mfrac>',
    '<fraction role="vulgar" id="2">' +
      '<children>' +
      '<number role="integer" font="normal" id="0">1</number>' +
      '<number role="integer" font="normal" id="1">2</number>' +
      '</children>' +
      '</fraction>'
  );
  this.executeTreeTest(
    '<mfrac><mn>1.5</mn><mn>2</mn></mfrac>',
    '<fraction role="division" id="2">' +
      '<children>' +
      '<number role="float" font="normal" id="0">1.5</number>' +
      '<number role="integer" font="normal" id="1">2</number>' +
      '</children>' +
      '</fraction>'
  );
  this.executeTreeTest(
    '<mfrac><mn>1</mn><mn>2.5</mn></mfrac>',
    '<fraction role="division" id="2">' +
      '<children>' +
      '<number role="integer" font="normal" id="0">1</number>' +
      '<number role="float" font="normal" id="1">2.5</number>' +
      '</children>' +
      '</fraction>');
  this.executeTreeTest(
    '<mfrac><msup><mn>3</mn><mn>4</mn></msup>' +
      '<msup><mn>8</mn><mn>10</mn></msup></mfrac>',
    '<fraction role="division" id="6">' +
      '<children>' +
      '<superscript role="integer" id="2">' +
      '<children>' +
      '<number role="integer" font="normal" id="0">3</number>' +
      '<number role="integer" font="normal" id="1">4</number>' +
      '</children>' +
      '</superscript>' +
      '<superscript role="integer" id="5">' +
      '<children>' +
      '<number role="integer" font="normal" id="3">8</number>' +
      '<number role="integer" font="normal" id="4">10</number>' +
      '</children>' +
      '</superscript>' +
      '</children>' +
      '</fraction>'
  );
};

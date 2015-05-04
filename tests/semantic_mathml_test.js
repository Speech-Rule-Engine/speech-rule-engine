// Copyright 2015 Volker Sorge
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
 * @fileoverview Testcases for enriching mathml with semantic information.
 * @author sorge@google.com (Volker Sorge)
 */

goog.provide('sre.SemanticMathmlTest');

goog.require('sre.AbstractTest');
goog.require('sre.Semantic');



/**
 * @constructor
 * @extends {sre.AbstractTest}
 */
sre.SemanticMathmlTest = function() {
  goog.base(this);

  /**
   * @override
   */
  this.information = 'Semantic enrichment tests.';

  /**
   * Sets HTML output file for tests.
   * @type {!string}
   */
  this.htmlFile = sre.SemanticMathmlTest.HTML_OUTPUT;

  /**
   * Possible file error.
   * @type {!string}
   */
  this.fileError = '';
};
goog.inherits(sre.SemanticMathmlTest, sre.AbstractTest);


/**
 * An optional file for HTML output.
 * @type {string}
 * @const
 */
sre.SemanticMathmlTest.HTML_OUTPUT = 'output.html';


/**
 * @override
 */
sre.SemanticMathmlTest.prototype.setUpTest = function() {
  try {
    sre.SystemExternal.fs.openSync(this.htmlFile, 'w+');
  } catch (err) {
    this.fileError = 'Bad file name ' + this.htmlFile;
  }
  this.appendToFile('<HTML>\n<HEAD>Mathml Output of' +
                    ' Test Runner</HEAD>\n<BODY>\n\n');
};


/**
 * Appends a string to the HTML file if it exists.
 * @param {string} output The output string.
 */
sre.SemanticMathmlTest.prototype.appendToFile = function(output) {
  // TODO (sorge) Rewrite this asynchronously.
  if (this.htmlFile && !this.fileError) {
    try {
      sre.SystemExternal.fs.appendFileSync(this.htmlFile, output);
    } catch (err) {
      this.fileError = 'Could not append to file ' + this.htmlFile;
    }
  }
};


/**
 * @override
 */
sre.SemanticMathmlTest.prototype.tearDownTest = function() {
  this.appendToFile('\n\n</BODY>\n');
  this.appendToFile('<script src="http://cdn.mathjax.org/mathjax/latest/' +
                    'MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>');
  this.appendToFile('\n<HTML>\n');
  if (this.fileError) {
    throw new sre.System.Error(this.fileError);
  }
};


/**
 * Outputs MathML without and with semantics to the HTML file.
 * @param {string} mml MathML expression.
 * @param {string} smml MathML expression with the semantic information.
 */
sre.SemanticMathmlTest.prototype.htmlOutput = function(mml, smml) {
  var newSmml = smml.replace(/id=/g, 'data-semantic-id=');
  this.appendToFile('<P>\n Original: ' + sre.SemanticTree.formatXml(mml) +
      '\n Enriched: ' + sre.SemanticTree.formatXml(newSmml) + '\n</P>');
};


/**
 * Tests if for a given mathml snippet results in a particular semantic tree.
 * @param {string} mml MathML expression.
 * @param {string} smml MathML snippet for the semantic information.
 */
sre.SemanticMathmlTest.prototype.executeMathmlTest = function(mml, smml) {
  var mathMl = '<math>' + mml + '</math>';
  this.htmlOutput(mathMl, smml);
  var node = sre.Semantic.enrichMathml(mathMl);
  var dp = new sre.SystemExternal.xmldom.DOMParser();
  var xml = dp.parseFromString(smml);
  var xmls = new sre.SystemExternal.xmldom.XMLSerializer();
  this.assert.equal(
      sre.SemanticMathml.removeAttributePrefix(xmls.serializeToString(node)),
      xmls.serializeToString(xml));
};


// Empty wrappers.
/**
 * Test for empty wrapping elements.
 */
sre.SemanticMathmlTest.prototype.testMathmlWrappers = function() {

  this.executeMathmlTest(
      '<mrow><mrow><mi>a</mi></mrow></mrow><mrow><mi>b</mi></mrow>',
      '<math type="infixop" role="implicit" id="3" children="0,1"' +
      ' content="2">' +
      '<mrow>' +
      '<mrow>' +
      '<mi type="identifier" role="latinletter" id="0" parent="3">a</mi>' +
      '</mrow>' +
      '</mrow>' +
      '<mo type="operator" role="multiplication" id="2" parent="3"' +
      ' added="true" operator="infixop,⁢">⁢</mo>' +
      '<mrow>' +
      '<mi type="identifier" role="latinletter" id="1" parent="3">b</mi>' +
      '</mrow>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<mstyle><mi>q</mi><mpadded><mstyle><mrow><mi>x</mi><mo>+</mo>' +
      '</mrow></mstyle><mpadded><mrow><mi>a</mi></mrow><mrow><mi>a</mi>' +
      '</mrow></mpadded><mtext>nix</mtext></mpadded></mstyle>',
      '<math>' +
      '<mstyle type="infixop" role="implicit" id="14" children="0,12"' +
      ' content="13">' +
      '<mi type="identifier" role="latinletter" id="0" parent="14">q</mi>' +
      '<mo type="operator" role="multiplication" id="13" parent="14"' +
      ' added="true" operator="infixop,⁢">⁢</mo>' +
      '<mpadded type="punctuated" role="text" id="12" children="10,8"' +
      ' content="11" parent="14">' +
      '<mrow type="infixop" role="implicit" id="10" children="3,7"' +
      ' content="9" parent="12">' +
      '<mstyle>' +
      '<mrow type="postfixop" role="multiop" id="3" children="1" content="2"' +
      ' parent="10">' +
      '<mi type="identifier" role="latinletter" id="1" parent="3">x</mi>' +
      '<mo type="operator" role="addition" id="2" parent="3"' +
      ' operator="postfixop,+">+</mo>' +
      '</mrow>' +
      '</mstyle>' +
      '<mo type="operator" role="multiplication" id="9" parent="10"' +
      ' added="true" operator="infixop,⁢">⁢</mo>' +
      '<mpadded type="infixop" role="implicit" id="7" children="4,5"' +
      ' content="6" parent="10">' +
      '<mrow>' +
      '<mi type="identifier" role="latinletter" id="4" parent="7">a</mi>' +
      '</mrow>' +
      '<mo type="operator" role="multiplication" id="6" parent="7"' +
      ' added="true" operator="infixop,⁢">⁢</mo>' +
      '<mrow>' +
      '<mi type="identifier" role="latinletter" id="5" parent="7">a</mi>' +
      '</mrow>' +
      '</mpadded>' +
      '</mrow>' +
      '<mo type="punctuation" role="dummy" id="11" parent="12" added="true"' +
      ' operator="punctuated">⁣</mo>' +
      '<mtext type="text" role="unknown" id="8" parent="12">nix</mtext>' +
      '</mpadded>' +
      '</mstyle>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<mrow class="MJX-TeXAtom-ORD"><mo stretchy="false">|</mo></mrow>' +
      '<mi>x</mi>' +
      '<mrow class="MJX-TeXAtom-ORD"><mo stretchy="false">|</mo></mrow>',
      '<math' +
      ' type="fenced" role="neutral" id="3" children="1" content="0,2">' +
      '<mrow class="MJX-TeXAtom-ORD">' +
      '<mo stretchy="false" type="fence" role="neutral" id="0"' +
      ' parent="3" operator="fenced">|</mo>' +
      '</mrow>' +
      '<mi type="identifier" role="latinletter" id="1" parent="3">x</mi>' +
      '<mrow class="MJX-TeXAtom-ORD">' +
      '<mo stretchy="false" type="fence" role="neutral" id="2"' +
      ' parent="3" operator="fenced">|</mo>' +
      '</mrow>' +
      '</math>'
  );



};


// Sub, Superscripts.
/**
 * Test for sub super and subsuper scripts.
 */
sre.SemanticMathmlTest.prototype.testMathmlScripts = function() {
  this.executeMathmlTest(
      '<msub><mi>a</mi><mi>b</mi></msub>',
      '<math>' +
      '<msub type="subscript" role="latinletter" id="2" children="0,1">' +
      '<mi type="identifier" role="latinletter" id="0" parent="2">a</mi>' +
      '<mi type="identifier" role="latinletter" id="1" parent="2">b</mi>' +
      '</msub></math>');
  this.executeMathmlTest(
      '<msup><mi>a</mi><mi>b</mi></msup>',
      '<math>' +
      '<msup type="superscript" role="latinletter" id="2" children="0,1">' +
      '<mi type="identifier" role="latinletter" id="0" parent="2">a</mi>' +
      '<mi type="identifier" role="latinletter" id="1" parent="2">b</mi>' +
      '</msup></math>');
  this.executeMathmlTest(
      '<msubsup><mi>a</mi><mi>b</mi><mi>c</mi></msubsup>',
      '<math>' +
      '<msubsup type="subsup" role="latinletter" id="4" children="0,1,2"' +
      ' collapsed="(4 (3 0 1) 2)">' +
      '<mi type="identifier" role="latinletter" id="0" parent="4">a</mi>' +
      '<mi type="identifier" role="latinletter" id="1" parent="4">b</mi>' +
      '<mi type="identifier" role="latinletter" id="2" parent="4">c</mi>' +
      '</msubsup></math>');
};


// Numbers.
/**
 * Test number representations.
 */
sre.SemanticMathmlTest.prototype.testMathmlNumbers = function() {
  this.executeMathmlTest(
      '<mn>2</mn>',
      '<math>' +
      '<mn type="number" role="integer" id="0">2</mn>' +
      '</math>');
  this.executeMathmlTest(
      '<mn>2.0</mn>',
      '<math>' +
      '<mn type="number" role="float" id="0">2.0</mn>' +
      '</math>');
  this.executeMathmlTest(
      '<mn>2t3</mn>',
      '<math>' +
      '<mn type="number" role="othernumber" id="0">2t3</mn>' +
      '</math>');
  this.executeMathmlTest(
      '<mfrac><mn>1</mn><mn>2</mn></mfrac>',
      '<math>' +
      '<mfrac type="fraction" role="vulgar" id="2" children="0,1">' +
      '<mn type="number" role="integer" id="0" parent="2">1</mn>' +
      '<mn type="number" role="integer" id="1" parent="2">2</mn>' +
      '</mfrac>' +
      '</math>');
  this.executeMathmlTest(
      '<mfrac><mn>1</mn><mn>2.5</mn></mfrac>',
      '<math>' +
      '<mfrac type="fraction" role="division" id="2" children="0,1">' +
      '<mn type="number" role="integer" id="0" parent="2">1</mn>' +
      '<mn type="number" role="float" id="1" parent="2">2.5</mn>' +
      '</mfrac>' +
      '</math>');
};


/**
 * Test mixed number representations.
 */
sre.SemanticMathmlTest.prototype.testMathmlMixedNumbers = function() {
  this.executeMathmlTest(
      '<mn>3</mn><mfrac><mn>1</mn><mn>2</mn></mfrac>',
      '<math type="number" role="mixed" id="4" children="0,3">' +
      '<mn type="number" role="integer" id="0" parent="4">3</mn>' +
      '<mfrac type="fraction" role="vulgar" id="3" children="1,2" parent="4">' +
      '<mn type="number" role="integer" id="1" parent="3">1</mn>' +
      '<mn type="number" role="integer" id="2" parent="3">2</mn>' +
      '</mfrac></math>'
  );
  this.executeMathmlTest(
      '<mfrac><mn>1</mn><mn>2</mn></mfrac><mn>3</mn>',
      '<math type="infixop" role="implicit" id="5"' +
      ' children="2,3" content="4">' +
      '<mfrac type="fraction" role="vulgar" id="2" children="0,1" parent="5">' +
      '<mn type="number" role="integer" id="0" parent="2">1</mn>' +
      '<mn type="number" role="integer" id="1" parent="2">2</mn>' +
      '</mfrac>' +
      '<mo type="operator" role="multiplication" id="4"' +
      ' parent="5" added="true" operator="infixop,⁢">⁢</mo>' +
      '<mn type="number" role="integer" id="3" parent="5">3</mn>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<mn>3.0</mn><mfrac><mn>1</mn><mn>2</mn></mfrac>',
      '<math type="infixop" role="implicit" id="5" children="0,3"' +
      ' content="4">' +
      '<mn type="number" role="float" id="0" parent="5">3.0</mn>' +
      '<mo type="operator" role="multiplication" id="4" parent="5"' +
      ' added="true"' +
      ' operator="infixop,⁢">⁢</mo>' +
      '<mfrac type="fraction" role="vulgar" id="3" children="1,2" parent="5">' +
      '<mn type="number" role="integer" id="1" parent="3">1</mn>' +
      '<mn type="number" role="integer" id="2" parent="3">2</mn>' +
      '</mfrac>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<mfrac><mn>1</mn><mn>2</mn></mfrac><mn>3.0</mn>',
      '<math type="infixop" role="implicit" id="5" children="2,3"' +
      ' content="4">' +
      '<mfrac type="fraction" role="vulgar" id="2" children="0,1" parent="5">' +
      '<mn type="number" role="integer" id="0" parent="2">1</mn>' +
      '<mn type="number" role="integer" id="1" parent="2">2</mn>' +
      '</mfrac>' +
      '<mo type="operator" role="multiplication" id="4" parent="5"' +
      ' added="true" operator="infixop,⁢">⁢</mo>' +
      '<mn type="number" role="float" id="3" parent="5">3.0</mn>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<mn>3</mn><mfrac><mn>1</mn><mn>2</mn></mfrac><mi>a</mi>',
      '<math type="infixop" role="implicit" id="7" children="5,4"' +
      ' content="6">' +
      '<mrow type="number" role="mixed" id="5" children="0,3" parent="7">' +
      '<mn type="number" role="integer" id="0" parent="5">3</mn>' +
      '<mfrac type="fraction" role="vulgar" id="3" children="1,2" parent="5">' +
      '<mn type="number" role="integer" id="1" parent="3">1</mn>' +
      '<mn type="number" role="integer" id="2" parent="3">2</mn>' +
      '</mfrac>' +
      '</mrow>' +
      '<mo type="operator" role="multiplication" id="6" parent="7"' +
      ' added="true" operator="infixop,⁢">⁢</mo>' +
      '<mi type="identifier" role="latinletter" id="4" parent="7">a</mi>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<mi>b</mi><mn>3</mn><mfrac><mn>1</mn><mn>2</mn></mfrac><mi>a</mi>',
      '<math type="infixop" role="implicit" id="9" children="0,6,5"' +
      ' content="7,8">' +
      '<mi type="identifier" role="latinletter" id="0" parent="9">b</mi>' +
      '<mo type="operator" role="multiplication" id="7" parent="9"' +
      ' added="true" operator="infixop,⁢">⁢</mo>' +
      '<mrow type="number" role="mixed" id="6" children="1,4" parent="9">' +
      '<mn type="number" role="integer" id="1" parent="6">3</mn>' +
      '<mfrac type="fraction" role="vulgar" id="4" children="2,3" parent="6">' +
      '<mn type="number" role="integer" id="2" parent="4">1</mn>' +
      '<mn type="number" role="integer" id="3" parent="4">2</mn>' +
      '</mfrac>' +
      '</mrow>' +
      '<mo type="operator" role="multiplication" id="8" parent="9"' +
      ' added="true" operator="infixop,⁢">⁢</mo>' +
      '<mi type="identifier" role="latinletter" id="5" parent="9">a</mi>' +
      '</math>'
  );
};


// Relations.
/**
 * Test relation trees.
 */
sre.SemanticMathmlTest.prototype.testMathmlRelations = function() {
  this.executeMathmlTest(
      '<mo>=</mo>',
      '<math><mo type="relation" role="equality" id="0">=</mo></math>'
  );
  this.executeMathmlTest(
      '<mi>a</mi><mo>=</mo><mi>b</mi>',
      '<math type="relseq" role="equality" id="3" children="0,2" content="1">' +
      '<mi type="identifier" role="latinletter" id="0" parent="3">a</mi>' +
      '<mo type="relation" role="equality" id="1" parent="3"' +
      ' operator="relseq,=">=</mo>' +
      '<mi type="identifier" role="latinletter" id="2" parent="3">b</mi>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<mi>a</mi><mo>=</mo><mi>b</mi><mo>=</mo><mi>c</mi>',
      '<math type="relseq" role="equality" id="5" children="0,2,4"' +
      ' content="1,3">' +
      '<mi type="identifier" role="latinletter" id="0" parent="5">a</mi>' +
      '<mo type="relation" role="equality" id="1" parent="5"' +
      ' operator="relseq,=">=</mo>' +
      '<mi type="identifier" role="latinletter" id="2" parent="5">b</mi>' +
      '<mo type="relation" role="equality" id="3" parent="5"' +
      ' operator="relseq,=">=</mo>' +
      '<mi type="identifier" role="latinletter" id="4" parent="5">c</mi>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<mi>a</mi><mo>=</mo><mi>b</mi><mo>=</mo><mi>c</mi>' +
          '<mo>\u2264</mo><mi>d</mi>',
      '<math type="multirel" role="unknown" id="7"' +
      ' children="0,2,4,6" content="1,3,5">' +
      '<mi type="identifier" role="latinletter" id="0" parent="7">a</mi>' +
      '<mo type="relation" role="equality" id="1" parent="7"' +
      ' operator="multirel">=</mo>' +
      '<mi type="identifier" role="latinletter" id="2" parent="7">b</mi>' +
      '<mo type="relation" role="equality" id="3" parent="7"' +
      ' operator="multirel">=</mo>' +
      '<mi type="identifier" role="latinletter" id="4" parent="7">c</mi>' +
      '<mo type="relation" role="inequality" id="5" parent="7"' +
      ' operator="multirel">≤</mo>' +
      '<mi type="identifier" role="latinletter" id="6" parent="7">d</mi>' +
      '</math>'
  );
};


// Operators.
/**
 * Test operator trees with pre- and postfixes.
 */
sre.SemanticMathmlTest.prototype.testMathmlPrePostfixOperators = function() {
  // Pathological operator only case.
  this.executeMathmlTest(
      '<mo>+</mo><mo>-</mo><mo>+</mo>',
      '<math type="prefixop" role="multiop" id="4" children="3" content="0">' +
      '<mo type="operator" role="addition" id="0" parent="4"' +
      ' operator="prefixop,+">+</mo>' +
      '<mrow type="prefixop" role="negative" id="3" children="2"' +
      ' content="1" parent="4">' +
      '<mo type="operator" role="subtraction" id="1" parent="3"' +
      ' operator="prefixop,-">-</mo>' +
      '<mo type="operator" role="addition" id="2" parent="3">+</mo>' +
      '</mrow>' +
      '</math>'
  );
  // Single identifier with prefixes.
  this.executeMathmlTest(
      '<mo>+</mo><mo>+</mo><mi>a</mi>',
      '<math type="prefixop" role="multiop" id="3" children="2"' +
      ' content="0,1">' +
      '<mo type="operator" role="addition" id="0" parent="3"' +
      ' operator="prefixop,+ +">+</mo>' +
      '<mo type="operator" role="addition" id="1" parent="3"' +
      ' operator="prefixop,+ +">+</mo>' +
      '<mi type="identifier" role="latinletter" id="2" parent="3">a</mi>' +
      '</math>'
  );
  // Single identifier with prefix and negative.
  this.executeMathmlTest(
      '<mo>+</mo><mo>-</mo><mi>a</mi>',
      '<math type="prefixop" role="multiop" id="4" children="3" content="0">' +
      '<mo type="operator" role="addition" id="0" parent="4"' +
      ' operator="prefixop,+">+</mo>' +
      '<mrow type="prefixop" role="negative" id="3" children="2"' +
      ' content="1" parent="4">' +
      '<mo type="operator" role="subtraction" id="1" parent="3"' +
      ' operator="prefixop,-">-</mo>' +
      '<mi type="identifier" role="latinletter" id="2" parent="3">a</mi>' +
      '</mrow>' +
      '</math>'
  );
  // Single identifier with postfixes.
  this.executeMathmlTest(
      '<mi>a</mi><mo>+</mo><mo>-</mo>',
      '<math type="postfixop" role="multiop" id="3" children="0"' +
      ' content="1,2">' +
      '<mi type="identifier" role="latinletter" id="0" parent="3">a</mi>' +
      '<mo type="operator" role="addition" id="1" parent="3"' +
      ' operator="postfixop,+ -">+</mo>' +
      '<mo type="operator" role="subtraction" id="2" parent="3"' +
      ' operator="postfixop,+ -">-</mo>' +
      '</math>'
  );
  // Single identifier with pre- and postfixes.
  this.executeMathmlTest(
      '<mo>+</mo><mo>+</mo><mi>a</mi><mo>+</mo><mo>+</mo>',
      '<math type="postfixop" role="multiop" id="6" children="5"' +
      ' content="3,4">' +
      '<mrow type="prefixop" role="multiop" id="5" children="2"' +
      ' content="0,1" parent="6">' +
      '<mo type="operator" role="addition" id="0" parent="5"' +
      ' operator="prefixop,+ +">+</mo>' +
      '<mo type="operator" role="addition" id="1" parent="5"' +
      ' operator="prefixop,+ +">+</mo>' +
      '<mi type="identifier" role="latinletter" id="2" parent="5">a</mi>' +
      '</mrow>' +
      '<mo type="operator" role="addition" id="3" parent="6"' +
      ' operator="postfixop,+ +">+</mo>' +
      '<mo type="operator" role="addition" id="4" parent="6"' +
      ' operator="postfixop,+ +">+</mo>' +
      '</math>'
  );
  // Single identifier with mixed pre- and postfixes.
  this.executeMathmlTest(
      '<mo>\u2213</mo><mo>+</mo><mi>a</mi><mo>\u2213</mo><mo>+</mo>',
      '<math type="postfixop" role="multiop" id="6" children="5"' +
      ' content="3,4">' +
      '<mrow type="prefixop" role="multiop" id="5" children="2"' +
      ' content="0,1" parent="6">' +
      '<mo type="operator" role="addition" id="0" parent="5"' +
      ' operator="prefixop,∓ +">∓</mo>' +
      '<mo type="operator" role="addition" id="1" parent="5"' +
      ' operator="prefixop,∓ +">+</mo>' +
      '<mi type="identifier" role="latinletter" id="2" parent="5">a</mi>' +
      '</mrow>' +
      '<mo type="operator" role="addition" id="3" parent="6"' +
      ' operator="postfixop,∓ +">∓</mo>' +
      '<mo type="operator" role="addition" id="4" parent="6"' +
      ' operator="postfixop,∓ +">+</mo>' +
      '</math>'
  );
  // Two identifiers with pre- and postfixes.
  this.executeMathmlTest(
      '<mo>+</mo><mo>+</mo><mi>a</mi><mo>\u2213</mo><mo>+</mo>' +
          '<mi>b</mi><mo>+</mo>',
      '<math type="infixop" role="addition" id="9" children="7,10"' +
      ' content="3">' +
      '<mrow type="prefixop" role="multiop" id="7" children="2"' +
      ' content="0,1" parent="9">' +
      '<mo type="operator" role="addition" id="0" parent="7"' +
      ' operator="prefixop,+ +">+</mo>' +
      '<mo type="operator" role="addition" id="1" parent="7"' +
      ' operator="prefixop,+ +">+</mo>' +
      '<mi type="identifier" role="latinletter" id="2"' +
      ' parent="7">a</mi></mrow>' +
      '<mo type="operator" role="addition" id="3" parent="9"' +
      ' operator="infixop,∓">∓</mo>' +
      '<mrow type="postfixop" role="multiop" id="10" children="8"' +
      ' content="6" parent="9">' +
      '<mrow type="prefixop" role="multiop" id="8" children="5" content="4"' +
      ' parent="10">' +
      '<mo type="operator" role="addition" id="4" parent="8"' +
      ' operator="prefixop,+">+</mo>' +
      '<mi type="identifier" role="latinletter" id="5"' +
      ' parent="8">b</mi></mrow>' +
      '<mo type="operator" role="addition" id="6" parent="10"' +
      ' operator="postfixop,+">+</mo>' +
      '</mrow></math>'
  );
  // Three identifiers with pre- and postfixes.
  this.executeMathmlTest(
      '<mo>+</mo><mo>+</mo><mi>a</mi><mo>\u2213</mo><mo>+</mo>' +
          '<mi>b</mi><mo>+</mo><mo>\u2213</mo><mi>c</mi><mo>+</mo>',
      '<math type="infixop" role="addition" id="14" children="12,15"' +
      ' content="6">' +
      '<mrow type="infixop" role="addition" id="12" children="10,11"' +
      ' content="3" parent="14">' +
      '<mrow type="prefixop" role="multiop" id="10" children="2"' +
      ' content="0,1" parent="12">' +
      '<mo type="operator" role="addition" id="0" parent="10"' +
      ' operator="prefixop,+ +">+</mo>' +
      '<mo type="operator" role="addition" id="1" parent="10"' +
      ' operator="prefixop,+ +">+</mo>' +
      '<mi type="identifier" role="latinletter" id="2" parent="10">a</mi>' +
      '</mrow>' +
      '<mo type="operator" role="addition" id="3" parent="12"' +
      ' operator="infixop,∓">∓</mo>' +
      '<mrow type="prefixop" role="multiop" id="11" children="5"' +
      ' content="4" parent="12">' +
      '<mo type="operator" role="addition" id="4" parent="11"' +
      ' operator="prefixop,+">+</mo>' +
      '<mi type="identifier" role="latinletter" id="5" parent="11">b</mi>' +
      '</mrow>' +
      '</mrow>' +
      '<mo type="operator" role="addition" id="6" parent="14"' +
      ' operator="infixop,+">+</mo>' +
      '<mrow type="postfixop" role="multiop" id="15" children="13"' +
      ' content="9" parent="14">' +
      '<mrow type="prefixop" role="multiop" id="13" children="8"' +
      ' content="7" parent="15">' +
      '<mo type="operator" role="addition" id="7" parent="13"' +
      ' operator="prefixop,∓">∓</mo>' +
      '<mi type="identifier" role="latinletter" id="8" parent="13">c</mi>' +
      '</mrow>' +
      '<mo type="operator" role="addition" id="9" parent="15"' +
      ' operator="postfixop,+">+</mo>' +
      '</mrow>' +
      '</math>'
  );
};


/**
 * Test operator trees with single operator.
 */
sre.SemanticMathmlTest.prototype.testMathmlSingleOperators = function() {
  // Single identifier.
  this.executeMathmlTest(
      '<mi>a</mi>',
      '<math>' +
      '<mi type="identifier" role="latinletter" id="0">a</mi>' +
      '</math>'
  );
  // Single implicit node.
  this.executeMathmlTest(
      '<mi>a</mi><mi>b</mi>',
      '<math type="infixop" role="implicit" id="3" children="0,1"' +
      ' content="2">' +
      '<mi type="identifier" role="latinletter" id="0" parent="3">a</mi>' +
      '<mo type="operator" role="multiplication" id="2" parent="3"' +
      ' added="true" operator="infixop,⁢">⁢</mo>' +
      '<mi type="identifier" role="latinletter" id="1" parent="3">b</mi>' +
      '</math>'
  );
  // Implicit multi node.
  this.executeMathmlTest(
      '<mi>a</mi><mi>b</mi><mi>c</mi>',
      '<math type="infixop" role="implicit" id="5" children="0,1,2"' +
      ' content="3,4">' +
      '<mi type="identifier" role="latinletter" id="0" parent="5">a</mi>' +
      '<mo type="operator" role="multiplication" id="3" parent="5"' +
      ' added="true" operator="infixop,⁢">⁢</mo>' +
      '<mi type="identifier" role="latinletter" id="1" parent="5">b</mi>' +
      '<mo type="operator" role="multiplication" id="4" parent="5"' +
      ' added="true" operator="infixop,⁢">⁢</mo>' +
      '<mi type="identifier" role="latinletter" id="2" parent="5">c</mi>' +
      '</math>'
  );
  // Single addition.
  this.executeMathmlTest(
      '<mi>a</mi><mo>+</mo><mi>b</mi>',
      '<math type="infixop" role="addition" id="3" children="0,2"' +
      ' content="1">' +
      '<mi type="identifier" role="latinletter" id="0" parent="3">a</mi>' +
      '<mo type="operator" role="addition" id="1" parent="3"' +
      ' operator="infixop,+">+</mo>' +
      '<mi type="identifier" role="latinletter" id="2" parent="3">b</mi>' +
      '</math>'
  );
  // Multi addition.
  this.executeMathmlTest(
      '<mi>a</mi><mo>+</mo><mi>b</mi><mo>+</mo><mi>c</mi>',
      '<math type="infixop" role="addition" id="5" children="0,2,4"' +
      ' content="1,3">' +
      '<mi type="identifier" role="latinletter" id="0" parent="5">a</mi>' +
      '<mo type="operator" role="addition" id="1" parent="5"' +
      ' operator="infixop,+">+</mo>' +
      '<mi type="identifier" role="latinletter" id="2" parent="5">b</mi>' +
      '<mo type="operator" role="addition" id="3" parent="5"' +
      ' operator="infixop,+">+</mo>' +
      '<mi type="identifier" role="latinletter" id="4" parent="5">c</mi>' +
      '</math>'
  );
  // Multi addition with implicit node.
  this.executeMathmlTest(
      '<mi>a</mi><mo>+</mo><mi>b</mi><mi>c</mi><mo>+</mo><mi>d</mi>',
      '<math type="infixop" role="addition" id="8" children="0,7,5"' +
      ' content="1,4">' +
      '<mi type="identifier" role="latinletter" id="0" parent="8">a</mi>' +
      '<mo type="operator" role="addition" id="1" parent="8"' +
      ' operator="infixop,+">+</mo>' +
      '<mrow type="infixop" role="implicit" id="7" children="2,3"' +
      ' content="6" parent="8">' +
      '<mi type="identifier" role="latinletter" id="2" parent="7">b</mi>' +
      '<mo type="operator" role="multiplication" id="6" parent="7"' +
      ' added="true" operator="infixop,⁢">⁢</mo>' +
      '<mi type="identifier" role="latinletter" id="3" parent="7">c</mi>' +
      '</mrow>' +
      '<mo type="operator" role="addition" id="4" parent="8"' +
      ' operator="infixop,+">+</mo>' +
      '<mi type="identifier" role="latinletter" id="5" parent="8">d</mi>' +
      '</math>'
  );
};


/**
 * Test operator trees with multiple operators.
 */
sre.SemanticMathmlTest.prototype.testMathmlMultipleOperators = function() {
  // Addition and subtraction.
  this.executeMathmlTest(
      '<mi>a</mi><mo>+</mo><mi>b</mi><mo>-</mo><mi>c</mi><mo>+</mo><mi>d</mi>',
      '<math type="infixop" role="addition" id="9" children="8,6"' +
      ' content="5">' +
      '<mrow type="infixop" role="subtraction" id="8" children="7,4"' +
      ' content="3" parent="9">' +
      '<mrow type="infixop" role="addition" id="7" children="0,2"' +
      ' content="1" parent="8">' +
      '<mi type="identifier" role="latinletter" id="0" parent="7">a</mi>' +
      '<mo type="operator" role="addition" id="1" parent="7"' +
      ' operator="infixop,+">+</mo>' +
      '<mi type="identifier" role="latinletter" id="2" parent="7">b</mi>' +
      '</mrow>' +
      '<mo type="operator" role="subtraction" id="3" parent="8"' +
      ' operator="infixop,-">-</mo>' +
      '<mi type="identifier" role="latinletter" id="4" parent="8">c</mi>' +
      '</mrow>' +
      '<mo type="operator" role="addition" id="5" parent="9"' +
      ' operator="infixop,+">+</mo>' +
      '<mi type="identifier" role="latinletter" id="6" parent="9">d</mi>' +
      '</math>'
  );
  // Addition and subtraction.
  this.executeMathmlTest(
      '<mi>a</mi><mo>+</mo><mi>b</mi><mo>+</mo><mi>c</mi><mo>-</mo>' +
      '<mi>d</mi><mo>-</mo><mi>e</mi>',
      '<math type="infixop" role="subtraction" id="10" children="9,6,8"' +
      ' content="5,7">' +
      '<mrow type="infixop" role="addition" id="9" children="0,2,4"' +
      ' content="1,3" parent="10">' +
      '<mi type="identifier" role="latinletter" id="0" parent="9">a</mi>' +
      '<mo type="operator" role="addition" id="1" parent="9"' +
      ' operator="infixop,+">+</mo>' +
      '<mi type="identifier" role="latinletter" id="2" parent="9">b</mi>' +
      '<mo type="operator" role="addition" id="3" parent="9"' +
      ' operator="infixop,+">+</mo>' +
      '<mi type="identifier" role="latinletter" id="4" parent="9">c</mi>' +
      '</mrow>' +
      '<mo type="operator" role="subtraction" id="5" parent="10"' +
      ' operator="infixop,-">-</mo>' +
      '<mi type="identifier" role="latinletter" id="6" parent="10">d</mi>' +
      '<mo type="operator" role="subtraction" id="7" parent="10"' +
      ' operator="infixop,-">-</mo>' +
      '<mi type="identifier" role="latinletter" id="8" parent="10">e</mi>' +
      '</math>'
  );
  // Addition and explicit multiplication.
  this.executeMathmlTest(
      '<mi>a</mi><mo>+</mo><mi>b</mi><mo>\u2218</mo><mi>c</mi><mo>+</mo>' +
      '<mi>d</mi>',
      '<math type="infixop" role="addition" id="7" children="0,8,6"' +
      ' content="1,5">' +
      '<mi type="identifier" role="latinletter" id="0" parent="7">a</mi>' +
      '<mo type="operator" role="addition" id="1" parent="7"' +
      ' operator="infixop,+">+</mo>' +
      '<mrow type="infixop" role="multiplication" id="8" children="2,4"' +
      ' content="3" parent="7">' +
      '<mi type="identifier" role="latinletter" id="2" parent="8">b</mi>' +
      '<mo type="operator" role="multiplication" id="3" parent="8"' +
      ' operator="infixop,∘">∘</mo>' +
      '<mi type="identifier" role="latinletter" id="4" parent="8">c</mi>' +
      '</mrow>' +
      '<mo type="operator" role="addition" id="5" parent="7"' +
      ' operator="infixop,+">+</mo>' +
      '<mi type="identifier" role="latinletter" id="6" parent="7">d</mi>' +
      '</math>'
  );
  // Addition with explicit and implicit multiplication.
  this.executeMathmlTest(
      '<mi>a</mi><mo>+</mo><mi>b</mi><mo>\u2218</mo><mi>c</mi><mi>d</mi>' +
      '<mo>+</mo><mi>e</mi><mo>\u2218</mo><mi>f</mi>',
      '<math type="infixop" role="addition" id="10" children="0,13,14"' +
      ' content="1,6">' +
      '<mi type="identifier" role="latinletter" id="0" parent="10">a</mi>' +
      '<mo type="operator" role="addition" id="1" parent="10"' +
      ' operator="infixop,+">+</mo>' +
      '<mrow type="infixop" role="multiplication" id="13" children="2,12"' +
      ' content="3" parent="10">' +
      '<mi type="identifier" role="latinletter" id="2" parent="13">b</mi>' +
      '<mo type="operator" role="multiplication" id="3" parent="13"' +
      ' operator="infixop,∘">∘</mo>' +
      '<mrow type="infixop" role="implicit" id="12" children="4,5"' +
      ' content="11" parent="13">' +
      '<mi type="identifier" role="latinletter" id="4" parent="12">c</mi>' +
      '<mo type="operator" role="multiplication" id="11" parent="12"' +
      ' added="true" operator="infixop,⁢">⁢</mo>' +
      '<mi type="identifier" role="latinletter" id="5" parent="12">d</mi>' +
      '</mrow>' +
      '</mrow>' +
      '<mo type="operator" role="addition" id="6" parent="10"' +
      ' operator="infixop,+">+</mo>' +
      '<mrow type="infixop" role="multiplication" id="14" children="7,9"' +
      ' content="8" parent="10">' +
      '<mi type="identifier" role="latinletter" id="7" parent="14">e</mi>' +
      '<mo type="operator" role="multiplication" id="8" parent="14"' +
      ' operator="infixop,∘">∘</mo>' +
      '<mi type="identifier" role="latinletter" id="9" parent="14">f</mi>' +
      '</mrow>' +
      '</math>'
  );
  // Two Additions, subtraction plus explicit and implicit multiplication,
  // one prefix and one postfix.
  this.executeMathmlTest(
      '<mi>a</mi><mo>+</mo><mi>b</mi><mo>+</mo><mi>c</mi><mi>d</mi>' +
      '<mo>+</mo><mi>e</mi><mo>\u2218</mo><mi>f</mi><mo>-</mo><mi>g</mi>' +
      '<mo>+</mo><mo>+</mo><mi>h</mi><mo>\u2295</mo><mi>i</mi>' +
      '<mo>\u2295</mo><mi>j</mi><mo>+</mo><mo>+</mo>',
      '<math type="infixop" role="addition" id="28" children="27,16,29"' +
      ' content="15,17">' +
      '<mrow type="infixop" role="addition" id="27" children="25,26"' +
      ' content="12" parent="28">' +
      '<mrow type="infixop" role="subtraction" id="25" children="21,11"' +
      ' content="10" parent="27">' +
      '<mrow type="infixop" role="addition" id="21" children="0,2,23,24"' +
      ' content="1,3,6" parent="25">' +
      '<mi type="identifier" role="latinletter" id="0" parent="21">a</mi>' +
      '<mo type="operator" role="addition" id="1" parent="21"' +
      ' operator="infixop,+">+</mo>' +
      '<mi type="identifier" role="latinletter" id="2" parent="21">b</mi>' +
      '<mo type="operator" role="addition" id="3" parent="21"' +
      ' operator="infixop,+">+</mo>' +
      '<mrow type="infixop" role="implicit" id="23" children="4,5"' +
      ' content="22" parent="21">' +
      '<mi type="identifier" role="latinletter" id="4" parent="23">c</mi>' +
      '<mo type="operator" role="multiplication" id="22" parent="23"' +
      ' added="true" operator="infixop,⁢">⁢</mo>' +
      '<mi type="identifier" role="latinletter" id="5" parent="23">d</mi>' +
      '</mrow>' +
      '<mo type="operator" role="addition" id="6" parent="21"' +
      ' operator="infixop,+">+</mo>' +
      '<mrow type="infixop" role="multiplication" id="24" children="7,9"' +
      ' content="8" parent="21">' +
      '<mi type="identifier" role="latinletter" id="7" parent="24">e</mi>' +
      '<mo type="operator" role="multiplication" id="8" parent="24"' +
      ' operator="infixop,∘">∘</mo>' +
      '<mi type="identifier" role="latinletter" id="9" parent="24">f</mi>' +
      '</mrow>' +
      '</mrow>' +
      '<mo type="operator" role="subtraction" id="10" parent="25"' +
      ' operator="infixop,-">-</mo>' +
      '<mi type="identifier" role="latinletter" id="11" parent="25">g</mi>' +
      '</mrow>' +
      '<mo type="operator" role="addition" id="12" parent="27"' +
      ' operator="infixop,+">+</mo>' +
      '<mrow type="prefixop" role="multiop" id="26" children="14"' +
      ' content="13" parent="27">' +
      '<mo type="operator" role="addition" id="13" parent="26"' +
      ' operator="prefixop,+">+</mo>' +
      '<mi type="identifier" role="latinletter" id="14" parent="26">h</mi>' +
      '</mrow>' +
      '</mrow>' +
      '<mo type="operator" role="addition" id="15" parent="28"' +
      ' operator="infixop,⊕">⊕</mo>' +
      '<mi type="identifier" role="latinletter" id="16" parent="28">i</mi>' +
      '<mo type="operator" role="addition" id="17" parent="28"' +
      ' operator="infixop,⊕">⊕</mo>' +
      '<mrow type="postfixop" role="multiop" id="29" children="18"' +
      ' content="19,20" parent="28">' +
      '<mi type="identifier" role="latinletter" id="18" parent="29">j</mi>' +
      '<mo type="operator" role="addition" id="19" parent="29"' +
      ' operator="postfixop,+ +">+</mo>' +
      '<mo type="operator" role="addition" id="20" parent="29"' +
      ' operator="postfixop,+ +">+</mo>' +
      '</mrow>' +
      '</math>'
  );
};


/**
 * Test operator trees with multiplication operators.
 */
sre.SemanticMathmlTest.prototype.testMathmlMultiplicationOperators =
    function() {
  // Addition and subtraction.
  this.executeMathmlTest(
      '<mi>a</mi><mo>*</mo><mi>b</mi><mo>*</mo><mi>c</mi><mo>*</mo><mi>d</mi>',
      '<math type="infixop" role="multiplication" id="7" children="0,2,4,6"' +
      ' content="1,3,5">' +
      '<mi type="identifier" role="latinletter" id="0" parent="7">a</mi>' +
      '<mo type="operator" role="multiplication" id="1" parent="7"' +
      ' operator="infixop,*">*</mo>' +
      '<mi type="identifier" role="latinletter" id="2" parent="7">b</mi>' +
      '<mo type="operator" role="multiplication" id="3" parent="7"' +
      ' operator="infixop,*">*</mo>' +
      '<mi type="identifier" role="latinletter" id="4" parent="7">c</mi>' +
      '<mo type="operator" role="multiplication" id="5" parent="7"' +
      ' operator="infixop,*">*</mo>' +
      '<mi type="identifier" role="latinletter" id="6" parent="7">d</mi>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<mrow>' +
      '<mn>1</mn><mi>a</mi><mo>\u00B7</mo><mi>m</mi>' +
      '</mrow>',
      '<math>' +
      '<mrow type="infixop" role="multiplication" id="6" children="5,3"' +
      ' content="2">' +
      '<mrow type="infixop" role="implicit" id="5" children="0,1"' +
      ' content="4" parent="6">' +
      '<mn type="number" role="integer" id="0" parent="5">1</mn>' +
      '<mo type="operator" role="multiplication" id="4" parent="5"' +
      ' added="true" operator="infixop,⁢">⁢</mo>' +
      '<mi type="identifier" role="latinletter" id="1" parent="5">a</mi>' +
      '</mrow>' +
      '<mo type="operator" role="multiplication" id="2" parent="6"' +
      ' operator="infixop,·">·</mo>' +
      '<mi type="identifier" role="latinletter" id="3" parent="6">m</mi>' +
      '</mrow>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<mrow>' +
      '<mn>1</mn><mi>a</mi><mo>\u00B7</mo>' +
      '<mi>m</mi><mo>\u00B7</mo><mi>s</mi>' +
      '</mrow>',
      '<math>' +
      '<mrow type="infixop" role="multiplication" id="8" children="7,3,5"' +
      ' content="2,4">' +
      '<mrow type="infixop" role="implicit" id="7" children="0,1"' +
      ' content="6" parent="8">' +
      '<mn type="number" role="integer" id="0" parent="7">1</mn>' +
      '<mo type="operator" role="multiplication" id="6" parent="7"' +
      ' added="true" operator="infixop,⁢">⁢</mo>' +
      '<mi type="identifier" role="latinletter" id="1" parent="7">a</mi>' +
      '</mrow>' +
      '<mo type="operator" role="multiplication" id="2" parent="8"' +
      ' operator="infixop,·">·</mo>' +
      '<mi type="identifier" role="latinletter" id="3" parent="8">m</mi>' +
      '<mo type="operator" role="multiplication" id="4" parent="8"' +
      ' operator="infixop,·">·</mo>' +
      '<mi type="identifier" role="latinletter" id="5" parent="8">s</mi>' +
      '</mrow>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<mrow>' +
      '<mn>1</mn><mi>a</mi><mo>\u00B7</mo>' +
      '<mi>m</mi><mo>\u00B7</mo>' +
      '<mi>s</mi><mo>\u00B7</mo>' +
      '<mi>c</mi><mi>b</mi><mo>\u00B7</mo>' +
      '<mi>k</mi>' +
      '</mrow>',
      '<math>' +
      '<mrow type="infixop" role="multiplication" id="13"' +
      ' children="12,3,5,15,10" content="2,4,6,9">' +
      '<mrow type="infixop" role="implicit" id="12" children="0,1"' +
      ' content="11" parent="13">' +
      '<mn type="number" role="integer" id="0" parent="12">1</mn>' +
      '<mo type="operator" role="multiplication" id="11" parent="12"' +
      ' added="true" operator="infixop,⁢">⁢</mo>' +
      '<mi type="identifier" role="latinletter" id="1" parent="12">a</mi>' +
      '</mrow>' +
      '<mo type="operator" role="multiplication" id="2" parent="13"' +
      ' operator="infixop,·">·</mo>' +
      '<mi type="identifier" role="latinletter" id="3" parent="13">m</mi>' +
      '<mo type="operator" role="multiplication" id="4" parent="13"' +
      ' operator="infixop,·">·</mo>' +
      '<mi type="identifier" role="latinletter" id="5" parent="13">s</mi>' +
      '<mo type="operator" role="multiplication" id="6" parent="13"' +
      ' operator="infixop,·">·</mo>' +
      '<mrow type="infixop" role="implicit" id="15" children="7,8"' +
      ' content="14" parent="13">' +
      '<mi type="identifier" role="latinletter" id="7" parent="15">c</mi>' +
      '<mo type="operator" role="multiplication" id="14" parent="15"' +
      ' added="true" operator="infixop,⁢">⁢</mo>' +
      '<mi type="identifier" role="latinletter" id="8" parent="15">b</mi>' +
      '</mrow>' +
      '<mo type="operator" role="multiplication" id="9" parent="13"' +
      ' operator="infixop,·">·</mo>' +
      '<mi type="identifier" role="latinletter" id="10" parent="13">k</mi>' +
      '</mrow>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<mrow>' +
      '<mn>1</mn><mi>a</mi><mo>\u00B7</mo>' +
      '<msup><mi>m</mi><mn>2</mn></msup>' +
      '<mo>\u00B7</mo>' +
      '<msup><mi>s</mi><mrow><mo>-</mo><mn>2</mn></mrow>' +
      '</msup></mrow>',
      '<math>' +
      '<mrow type="infixop" role="multiplication" id="14" children="13,5,11"' +
      ' content="2,6">' +
      '<mrow type="infixop" role="implicit" id="13" children="0,1"' +
      ' content="12" parent="14">' +
      '<mn type="number" role="integer" id="0" parent="13">1</mn>' +
      '<mo type="operator" role="multiplication" id="12" parent="13"' +
      ' added="true" operator="infixop,⁢">⁢</mo>' +
      '<mi type="identifier" role="latinletter" id="1" parent="13">a</mi>' +
      '</mrow>' +
      '<mo type="operator" role="multiplication" id="2" parent="14"' +
      ' operator="infixop,·">·</mo>' +
      '<msup type="superscript" role="latinletter" id="5" children="3,4"' +
      ' parent="14">' +
      '<mi type="identifier" role="latinletter" id="3" parent="5">m</mi>' +
      '<mn type="number" role="integer" id="4" parent="5">2</mn>' +
      '</msup>' +
      '<mo type="operator" role="multiplication" id="6" parent="14"' +
      ' operator="infixop,·">·</mo>' +
      '<msup type="superscript" role="latinletter" id="11" children="7,10"' +
      ' parent="14">' +
      '<mi type="identifier" role="latinletter" id="7" parent="11">s</mi>' +
      '<mrow type="prefixop" role="negative" id="10" children="9"' +
      ' content="8" parent="11">' +
      '<mo type="operator" role="subtraction" id="8" parent="10"' +
      ' operator="prefixop,-">-</mo>' +
      '<mn type="number" role="integer" id="9" parent="10">2</mn>' +
      '</mrow>' +
      '</msup>' +
      '</mrow>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<mrow><mn>1</mn><mi>J</mi><mo>=</mo><mn>1</mn>' +
      '<mi>a</mi><mo>\u00B7</mo>' +
      '<msup><mi>m</mi><mn>2</mn></msup>' +
      '<mo>\u00B7</mo>' +
      '<msup><mi>s</mi><mrow><mo>-</mo><mn>2</mn></mrow>' +
      '</msup></mrow>',
      '<math>' +
      '<mrow type="relseq" role="equality" id="20" children="16,19"' +
      ' content="2">' +
      '<mrow type="infixop" role="implicit" id="16" children="0,1"' +
      ' content="15" parent="20">' +
      '<mn type="number" role="integer" id="0" parent="16">1</mn>' +
      '<mo type="operator" role="multiplication" id="15" parent="16"' +
      ' added="true" operator="infixop,⁢">⁢</mo>' +
      '<mi type="identifier" role="latinletter" id="1" parent="16">J</mi>' +
      '</mrow>' +
      '<mo type="relation" role="equality" id="2" parent="20"' +
      ' operator="relseq,=">=</mo>' +
      '<mrow type="infixop" role="multiplication" id="19" children="18,8,14"' +
      ' content="5,9" parent="20">' +
      '<mrow type="infixop" role="implicit" id="18" children="3,4"' +
      ' content="17" parent="19">' +
      '<mn type="number" role="integer" id="3" parent="18">1</mn>' +
      '<mo type="operator" role="multiplication" id="17" parent="18"' +
      ' added="true" operator="infixop,⁢">⁢</mo>' +
      '<mi type="identifier" role="latinletter" id="4" parent="18">a</mi>' +
      '</mrow>' +
      '<mo type="operator" role="multiplication" id="5" parent="19"' +
      ' operator="infixop,·">·</mo>' +
      '<msup type="superscript" role="latinletter" id="8" children="6,7"' +
      ' parent="19">' +
      '<mi type="identifier" role="latinletter" id="6" parent="8">m</mi>' +
      '<mn type="number" role="integer" id="7" parent="8">2</mn>' +
      '</msup>' +
      '<mo type="operator" role="multiplication" id="9" parent="19"' +
      ' operator="infixop,·">·</mo>' +
      '<msup type="superscript" role="latinletter" id="14" children="10,13"' +
      ' parent="19">' +
      '<mi type="identifier" role="latinletter" id="10" parent="14">s</mi>' +
      '<mrow type="prefixop" role="negative" id="13" children="12"' +
      ' content="11" parent="14">' +
      '<mo type="operator" role="subtraction" id="11" parent="13"' +
      ' operator="prefixop,-">-</mo>' +
      '<mn type="number" role="integer" id="12" parent="13">2</mn>' +
      '</mrow>' +
      '</msup>' +
      '</mrow>' +
      '</mrow>' +
      '</math>'
  );
};


// Fences.
/**
 * Test regular directed fences.
 */
sre.SemanticMathmlTest.prototype.testMathmlRegularFences = function() {
  // No fence.
  this.executeMathmlTest(
      '<mrow><mi>a</mi><mo>+</mo><mi>b</mi></mrow>',
      '<math>' +
      '<mrow type="infixop" role="addition" id="3" children="0,2"' +
      ' content="1">' +
      '<mi type="identifier" role="latinletter" id="0" parent="3">a</mi>' +
      '<mo type="operator" role="addition" id="1" parent="3"' +
      ' operator="infixop,+">+</mo>' +
      '<mi type="identifier" role="latinletter" id="2" parent="3">b</mi>' +
      '</mrow>' +
      '</math>'
  );
  // Empty parentheses.
  this.executeMathmlTest(
      '<mo>(</mo><mo>)</mo>',
      '<math type="fenced" role="leftright" id="3" children="2"' +
      ' content="0,1">' +
      '<mo type="fence" role="open" id="0" parent="3"' +
      ' operator="fenced">(</mo>' +
      '<mrow type="empty" role="unknown" id="2" parent="3"/>' +
      '<mo type="fence" role="close" id="1" parent="3"' +
      ' operator="fenced">)</mo>' +
      '</math>'
  );
  // Single Fenced Expression.
  this.executeMathmlTest(
      '<mrow><mo>(</mo><mi>a</mi><mo>+</mo><mi>b</mi><mo>)</mo></mrow>',
      '<math>' +
      '<mrow type="fenced" role="leftright" id="6" children="5"' +
      ' content="0,4">' +
      '<mo type="fence" role="open" id="0" parent="6"' +
      ' operator="fenced">(</mo>' +
      '<mrow type="infixop" role="addition" id="5" children="1,3"' +
      ' content="2" parent="6">' +
      '<mi type="identifier" role="latinletter" id="1" parent="5">a</mi>' +
      '<mo type="operator" role="addition" id="2" parent="5"' +
      ' operator="infixop,+">+</mo>' +
      '<mi type="identifier" role="latinletter" id="3" parent="5">b</mi>' +
      '</mrow>' +
      '<mo type="fence" role="close" id="4" parent="6"' +
      ' operator="fenced">)</mo>' +
      '</mrow>' +
      '</math>'
  );
  // Single Fenced Expression and operators.
  this.executeMathmlTest(
      '<mrow><mi>a</mi><mo>+</mo><mo>(</mo><mi>b</mi><mo>+</mo><mi>c</mi>' +
      '<mo>)</mo><mo>+</mo><mi>d</mi></mrow>',
      '<math>' +
      '<mrow type="infixop" role="addition" id="11" children="0,10,8"' +
      ' content="1,7">' +
      '<mi type="identifier" role="latinletter" id="0" parent="11">a</mi>' +
      '<mo type="operator" role="addition" id="1" parent="11"' +
      ' operator="infixop,+">+</mo>' +
      '<mrow type="fenced" role="leftright" id="10" children="9"' +
      ' content="2,6" parent="11">' +
      '<mo type="fence" role="open" id="2" parent="10"' +
      ' operator="fenced">(</mo>' +
      '<mrow type="infixop" role="addition" id="9" children="3,5"' +
      ' content="4" parent="10">' +
      '<mi type="identifier" role="latinletter" id="3" parent="9">b</mi>' +
      '<mo type="operator" role="addition" id="4" parent="9"' +
      ' operator="infixop,+">+</mo>' +
      '<mi type="identifier" role="latinletter" id="5" parent="9">c</mi>' +
      '</mrow>' +
      '<mo type="fence" role="close" id="6" parent="10"' +
      ' operator="fenced">)</mo>' +
      '</mrow>' +
      '<mo type="operator" role="addition" id="7" parent="11"' +
      ' operator="infixop,+">+</mo>' +
      '<mi type="identifier" role="latinletter" id="8" parent="11">d</mi>' +
      '</mrow>' +
      '</math>'
  );
  // Parallel Parenthesis.
  this.executeMathmlTest(
      '<mrow><mo>(</mo><mi>a</mi><mo>+</mo><mi>b</mi><mo>)</mo><mo>(</mo>' +
      '<mi>c</mi><mo>+</mo><mi>d</mi><mo>)</mo></mrow>',
      '<math>' +
      '<mrow type="infixop" role="implicit" id="15" children="11,13"' +
      ' content="14">' +
      '<mrow type="fenced" role="leftright" id="11" children="10"' +
      ' content="0,4" parent="15">' +
      '<mo type="fence" role="open" id="0" parent="11"' +
      ' operator="fenced">(</mo>' +
      '<mrow type="infixop" role="addition" id="10" children="1,3"' +
      ' content="2" parent="11">' +
      '<mi type="identifier" role="latinletter" id="1" parent="10">a</mi>' +
      '<mo type="operator" role="addition" id="2" parent="10"' +
      ' operator="infixop,+">+</mo>' +
      '<mi type="identifier" role="latinletter" id="3" parent="10">b</mi>' +
      '</mrow>' +
      '<mo type="fence" role="close" id="4" parent="11"' +
      ' operator="fenced">)</mo>' +
      '</mrow>' +
      '<mo type="operator" role="multiplication" id="14" parent="15"' +
      ' added="true" operator="infixop,⁢">⁢</mo>' +
      '<mrow type="fenced" role="leftright" id="13" children="12"' +
      ' content="5,9" parent="15">' +
      '<mo type="fence" role="open" id="5" parent="13"' +
      ' operator="fenced">(</mo>' +
      '<mrow type="infixop" role="addition" id="12" children="6,8"' +
      ' content="7" parent="13">' +
      '<mi type="identifier" role="latinletter" id="6" parent="12">c</mi>' +
      '<mo type="operator" role="addition" id="7" parent="12"' +
      ' operator="infixop,+">+</mo>' +
      '<mi type="identifier" role="latinletter" id="8" parent="12">d</mi>' +
      '</mrow>' +
      '<mo type="fence" role="close" id="9" parent="13"' +
      ' operator="fenced">)</mo>' +
      '</mrow>' +
      '</mrow>' +
      '</math>'
  );
  // Nested Parenthesis.
  this.executeMathmlTest(
      '<mrow><mo>(</mo><mo>(</mo><mi>a</mi><mo>+</mo><mi>b</mi><mo>)</mo>' +
      '<mo>(</mo><mi>c</mi><mo>+</mo><mi>d</mi><mo>)</mo><mo>)</mo></mrow>',
      '<math>' +
      '<mrow type="fenced" role="leftright" id="18" children="17"' +
      ' content="0,11">' +
      '<mo type="fence" role="open" id="0" parent="18"' +
      ' operator="fenced">(</mo>' +
      '<mrow type="infixop" role="implicit" id="17" children="13,15"' +
      ' content="16" parent="18">' +
      '<mrow type="fenced" role="leftright" id="13" children="12"' +
      ' content="1,5" parent="17">' +
      '<mo type="fence" role="open" id="1" parent="13"' +
      ' operator="fenced">(</mo>' +
      '<mrow type="infixop" role="addition" id="12" children="2,4"' +
      ' content="3" parent="13">' +
      '<mi type="identifier" role="latinletter" id="2" parent="12">a</mi>' +
      '<mo type="operator" role="addition" id="3" parent="12"' +
      ' operator="infixop,+">+</mo>' +
      '<mi type="identifier" role="latinletter" id="4" parent="12">b</mi>' +
      '</mrow>' +
      '<mo type="fence" role="close" id="5" parent="13"' +
      ' operator="fenced">)</mo>' +
      '</mrow>' +
      '<mo type="operator" role="multiplication" id="16" parent="17"' +
      ' added="true" operator="infixop,⁢">⁢</mo>' +
      '<mrow type="fenced" role="leftright" id="15" children="14"' +
      ' content="6,10" parent="17">' +
      '<mo type="fence" role="open" id="6" parent="15"' +
      ' operator="fenced">(</mo>' +
      '<mrow type="infixop" role="addition" id="14" children="7,9"' +
      ' content="8" parent="15">' +
      '<mi type="identifier" role="latinletter" id="7" parent="14">c</mi>' +
      '<mo type="operator" role="addition" id="8" parent="14"' +
      ' operator="infixop,+">+</mo>' +
      '<mi type="identifier" role="latinletter" id="9" parent="14">d</mi>' +
      '</mrow>' +
      '<mo type="fence" role="close" id="10" parent="15"' +
      ' operator="fenced">)</mo>' +
      '</mrow>' +
      '</mrow>' +
      '<mo type="fence" role="close" id="11" parent="18"' +
      ' operator="fenced">)</mo>' +
      '</mrow>' +
      '</math>'
  );
  // Nested parenthesis and brackets.
  this.executeMathmlTest(
      '<mrow><mo>(</mo><mo>[</mo><mi>a</mi><mo>+</mo><mi>b</mi><mo>+</mo>' +
      '<mi>c</mi><mo>]</mo><mo>+</mo><mi>d</mi><mo>)</mo></mrow>',
      '<math>' +
      '<mrow type="fenced" role="leftright" id="14" children="13"' +
      ' content="0,10">' +
      '<mo type="fence" role="open" id="0" parent="14"' +
      ' operator="fenced">(</mo>' +
      '<mrow type="infixop" role="addition" id="13" children="12,9"' +
      ' content="8" parent="14">' +
      '<mrow type="fenced" role="leftright" id="12" children="11"' +
      ' content="1,7" parent="13">' +
      '<mo type="fence" role="open" id="1" parent="12"' +
      ' operator="fenced">[</mo>' +
      '<mrow type="infixop" role="addition" id="11" children="2,4,6"' +
      ' content="3,5" parent="12">' +
      '<mi type="identifier" role="latinletter" id="2" parent="11">a</mi>' +
      '<mo type="operator" role="addition" id="3" parent="11"' +
      ' operator="infixop,+">+</mo>' +
      '<mi type="identifier" role="latinletter" id="4" parent="11">b</mi>' +
      '<mo type="operator" role="addition" id="5" parent="11"' +
      ' operator="infixop,+">+</mo>' +
      '<mi type="identifier" role="latinletter" id="6" parent="11">c</mi>' +
      '</mrow>' +
      '<mo type="fence" role="close" id="7" parent="12"' +
      ' operator="fenced">]</mo>' +
      '</mrow>' +
      '<mo type="operator" role="addition" id="8" parent="13"' +
      ' operator="infixop,+">+</mo>' +
      '<mi type="identifier" role="latinletter" id="9" parent="13">d</mi>' +
      '</mrow>' +
      '<mo type="fence" role="close" id="10" parent="14"' +
      ' operator="fenced">)</mo>' +
      '</mrow>' +
      '</math>'
  );
  // Nested parenthesis, brackets, braces and superscript operator.
  this.executeMathmlTest(
      '<mrow><mo>(</mo><msup><mi>a</mi><mrow><mn>2</mn><mo>[</mo><mi>i</mi>' +
      '<mo>+</mo><mi>n</mi><mo>]</mo></mrow></msup><mo>+</mo><mi>b</mi>' +
      '<mo>)</mo><mo>+</mo><mo>{</mo><mi>c</mi><mi>d</mi><mo>-</mo><mo>[</mo>' +
      '<mi>e</mi><mo>+</mo><mi>f</mi><mo>]</mo><mo>}</mo></mrow>',
      '<math>' +
      '<mrow type="infixop" role="addition" id="35" children="28,34"' +
      ' content="16">' +
      '<mrow type="fenced" role="leftright" id="28" children="27"' +
      ' content="0,15" parent="35">' +
      '<mo type="fence" role="open" id="0" parent="28"' +
      ' operator="fenced">(</mo>' +
      '<mrow type="infixop" role="addition" id="27" children="12,14"' +
      ' content="13" parent="28">' +
      '<msup type="superscript" role="latinletter" id="12" children="1,11"' +
      ' parent="27">' +
      '<mi type="identifier" role="latinletter" id="1" parent="12">a</mi>' +
      '<mrow type="infixop" role="implicit" id="11" children="2,9"' +
      ' content="10" parent="12">' +
      '<mn type="number" role="integer" id="2" parent="11">2</mn>' +
      '<mo type="operator" role="multiplication" id="10" parent="11"' +
      ' added="true" operator="infixop,⁢">⁢</mo>' +
      '<mrow type="fenced" role="leftright" id="9" children="8"' +
      ' content="3,7" parent="11">' +
      '<mo type="fence" role="open" id="3" parent="9"' +
      ' operator="fenced">[</mo>' +
      '<mrow type="infixop" role="addition" id="8" children="4,6"' +
      ' content="5" parent="9">' +
      '<mi type="identifier" role="latinletter" id="4" parent="8">i</mi>' +
      '<mo type="operator" role="addition" id="5" parent="8"' +
      ' operator="infixop,+">+</mo>' +
      '<mi type="identifier" role="latinletter" id="6" parent="8">n</mi>' +
      '</mrow>' +
      '<mo type="fence" role="close" id="7" parent="9"' +
      ' operator="fenced">]</mo>' +
      '</mrow>' +
      '</mrow>' +
      '</msup>' +
      '<mo type="operator" role="addition" id="13" parent="27"' +
      ' operator="infixop,+">+</mo>' +
      '<mi type="identifier" role="latinletter" id="14" parent="27">b</mi>' +
      '</mrow>' +
      '<mo type="fence" role="close" id="15" parent="28"' +
      ' operator="fenced">)</mo>' +
      '</mrow>' +
      '<mo type="operator" role="addition" id="16" parent="35"' +
      ' operator="infixop,+">+</mo>' +
      '<mrow type="fenced" role="leftright" id="34" children="33"' +
      ' content="17,26" parent="35">' +
      '<mo type="fence" role="open" id="17" parent="34"' +
      ' operator="fenced">{</mo>' +
      '<mrow type="infixop" role="subtraction" id="33" children="32,30"' +
      ' content="20" parent="34">' +
      '<mrow type="infixop" role="implicit" id="32" children="18,19"' +
      ' content="31" parent="33">' +
      '<mi type="identifier" role="latinletter" id="18" parent="32">c</mi>' +
      '<mo type="operator" role="multiplication" id="31" parent="32"' +
      ' added="true" operator="infixop,⁢">⁢</mo>' +
      '<mi type="identifier" role="latinletter" id="19" parent="32">d</mi>' +
      '</mrow>' +
      '<mo type="operator" role="subtraction" id="20" parent="33"' +
      ' operator="infixop,-">-</mo>' +
      '<mrow type="fenced" role="leftright" id="30" children="29"' +
      ' content="21,25" parent="33">' +
      '<mo type="fence" role="open" id="21" parent="30"' +
      ' operator="fenced">[</mo>' +
      '<mrow type="infixop" role="addition" id="29" children="22,24"' +
      ' content="23" parent="30">' +
      '<mi type="identifier" role="latinletter" id="22" parent="29">e</mi>' +
      '<mo type="operator" role="addition" id="23" parent="29"' +
      ' operator="infixop,+">+</mo>' +
      '<mi type="identifier" role="latinletter" id="24" parent="29">f</mi>' +
      '</mrow>' +
      '<mo type="fence" role="close" id="25" parent="30"' +
      ' operator="fenced">]</mo>' +
      '</mrow>' +
      '</mrow>' +
      '<mo type="fence" role="close" id="26" parent="34"' +
      ' operator="fenced">}</mo>' +
      '</mrow>' +
      '</mrow>' +
      '</math>'
  );
};


/**
 * Test neutral fences.
 */
sre.SemanticMathmlTest.prototype.testMathmlNeutralFences = function() {
  // Empty bars.
  this.executeMathmlTest(
      '<mrow><mo>|</mo><mo>|</mo></mrow>',
      '<math>' +
      '<mrow type="fenced" role="neutral" id="3" children="2" content="0,1">' +
      '<mo type="fence" role="neutral" id="0" parent="3"' +
      ' operator="fenced">|</mo>' +
      '<mrow type="empty" role="unknown" id="2" parent="3"/>' +
      '<mo type="fence" role="neutral" id="1" parent="3"' +
      ' operator="fenced">|</mo>' +
      '</mrow>' +
      '</math>'
  );
  // Simple bar fence.
  this.executeMathmlTest(
      '<mrow><mo>|</mo><mi>a</mi><mo>|</mo></mrow>',
      '<math>' +
      '<mrow type="fenced" role="neutral" id="3" children="1" content="0,2">' +
      '<mo type="fence" role="neutral" id="0" parent="3"' +
      ' operator="fenced">|</mo>' +
      '<mi type="identifier" role="latinletter" id="1" parent="3">a</mi>' +
      '<mo type="fence" role="neutral" id="2" parent="3"' +
      ' operator="fenced">|</mo>' +
      '</mrow>' +
      '</math>'
  );
  // Parallel bar fences.
  this.executeMathmlTest(
      '<mrow><mo>|</mo><mi>a</mi><mo>|</mo><mi>b</mi><mo>+</mo>' +
      '<mo>\u00A6</mo><mi>c</mi><mo>\u00A6</mo></mrow>',
      '<math>' +
      '<mrow type="infixop" role="addition" id="12" children="11,9"' +
      ' content="4">' +
      '<mrow type="infixop" role="implicit" id="11" children="8,3"' +
      ' content="10" parent="12">' +
      '<mrow type="fenced" role="neutral" id="8" children="1" content="0,2"' +
      ' parent="11">' +
      '<mo type="fence" role="neutral" id="0" parent="8"' +
      ' operator="fenced">|</mo>' +
      '<mi type="identifier" role="latinletter" id="1" parent="8">a</mi>' +
      '<mo type="fence" role="neutral" id="2" parent="8"' +
      ' operator="fenced">|</mo>' +
      '</mrow>' +
      '<mo type="operator" role="multiplication" id="10" parent="11"' +
      ' added="true" operator="infixop,⁢">⁢</mo>' +
      '<mi type="identifier" role="latinletter" id="3" parent="11">b</mi>' +
      '</mrow>' +
      '<mo type="operator" role="addition" id="4" parent="12"' +
      ' operator="infixop,+">+</mo>' +
      '<mrow type="fenced" role="neutral" id="9" children="6" content="5,7"' +
      ' parent="12">' +
      '<mo type="fence" role="neutral" id="5" parent="9"' +
      ' operator="fenced">¦</mo>' +
      '<mi type="identifier" role="latinletter" id="6" parent="9">c</mi>' +
      '<mo type="fence" role="neutral" id="7" parent="9"' +
      ' operator="fenced">¦</mo>' +
      '</mrow>' +
      '</mrow>' +
      '</math>'
  );
  // Nested bar fences.
  this.executeMathmlTest(
      '<mrow><mo>\u00A6</mo><mo>|</mo><mi>a</mi><mo>|</mo><mi>b</mi>' +
      '<mo>+</mo><mi>c</mi><mo>\u00A6</mo></mrow>',
      '<math>' +
      '<mrow type="fenced" role="neutral" id="12" children="11"' +
      ' content="0,7">' +
      '<mo type="fence" role="neutral" id="0" parent="12"' +
      ' operator="fenced">¦</mo>' +
      '<mrow type="infixop" role="addition" id="11" children="10,6"' +
      ' content="5" parent="12">' +
      '<mrow type="infixop" role="implicit" id="10" children="8,4"' +
      ' content="9" parent="11">' +
      '<mrow type="fenced" role="neutral" id="8" children="2" content="1,3"' +
      ' parent="10">' +
      '<mo type="fence" role="neutral" id="1" parent="8"' +
      ' operator="fenced">|</mo>' +
      '<mi type="identifier" role="latinletter" id="2" parent="8">a</mi>' +
      '<mo type="fence" role="neutral" id="3" parent="8"' +
      ' operator="fenced">|</mo>' +
      '</mrow>' +
      '<mo type="operator" role="multiplication" id="9" parent="10"' +
      ' added="true" operator="infixop,⁢">⁢</mo>' +
      '<mi type="identifier" role="latinletter" id="4" parent="10">b</mi>' +
      '</mrow>' +
      '<mo type="operator" role="addition" id="5" parent="11"' +
      ' operator="infixop,+">+</mo>' +
      '<mi type="identifier" role="latinletter" id="6" parent="11">c</mi>' +
      '</mrow>' +
      '<mo type="fence" role="neutral" id="7" parent="12"' +
      ' operator="fenced">¦</mo>' +
      '</mrow>' +
      '</math>'
  );
};


/**
 * Mixed neutral and regular fences.
 */
sre.SemanticMathmlTest.prototype.testMathmlMixedFences = function() {
  // Empty parenthsis inside bars.
  this.executeMathmlTest(
      '<mrow><mo>|</mo><mo>(</mo><mo>)</mo><mo>|</mo></mrow>',
      '<math>' +
      '<mrow type="fenced" role="neutral" id="6" children="5" content="0,3">' +
      '<mo type="fence" role="neutral" id="0" parent="6"' +
      ' operator="fenced">|</mo>' +
      '<mrow type="fenced" role="leftright" id="5" children="4"' +
      ' content="1,2" parent="6">' +
      '<mo type="fence" role="open" id="1" parent="5"' +
      ' operator="fenced">(</mo>' +
      '<mrow type="empty" role="unknown" id="4" parent="5"/>' +
      '<mo type="fence" role="close" id="2" parent="5"' +
      ' operator="fenced">)</mo>' +
      '</mrow>' +
      '<mo type="fence" role="neutral" id="3" parent="6"' +
      ' operator="fenced">|</mo>' +
      '</mrow>' +
      '</math>'
  );
  // Bars inside parentheses.
  this.executeMathmlTest(
      '<mrow><mo>(</mo><mo>|</mo><mi>a</mi><mo>|</mo><mi>b</mi>' +
      '<mo>&#x00A6;</mo><mi>c</mi><mo>&#x00A6;</mo><mi>d</mi>' +
      '<mo>)</mo></mrow>',
      '<math>' +
      '<mrow type="fenced" role="leftright" id="16" children="15"' +
      ' content="0,9">' +
      '<mo type="fence" role="open" id="0" parent="16"' +
      ' operator="fenced">(</mo>' +
      '<mrow type="infixop" role="implicit" id="15" children="10,4,11,8"' +
      ' content="12,13,14" parent="16">' +
      '<mrow type="fenced" role="neutral" id="10" children="2"' +
      ' content="1,3" parent="15">' +
      '<mo type="fence" role="neutral" id="1" parent="10"' +
      ' operator="fenced">|</mo>' +
      '<mi type="identifier" role="latinletter" id="2" parent="10">a</mi>' +
      '<mo type="fence" role="neutral" id="3" parent="10"' +
      ' operator="fenced">|</mo>' +
      '</mrow>' +
      '<mo type="operator" role="multiplication" id="12" parent="15"' +
      ' added="true" operator="infixop,⁢">⁢</mo>' +
      '<mi type="identifier" role="latinletter" id="4" parent="15">b</mi>' +
      '<mo type="operator" role="multiplication" id="13" parent="15"' +
      ' added="true" operator="infixop,⁢">⁢</mo>' +
      '<mrow type="fenced" role="neutral" id="11" children="6"' +
      ' content="5,7" parent="15">' +
      '<mo type="fence" role="neutral" id="5" parent="11"' +
      ' operator="fenced">¦</mo>' +
      '<mi type="identifier" role="latinletter" id="6" parent="11">c</mi>' +
      '<mo type="fence" role="neutral" id="7" parent="11"' +
      ' operator="fenced">¦</mo>' +
      '</mrow>' +
      '<mo type="operator" role="multiplication" id="14" parent="15"' +
      ' added="true" operator="infixop,⁢">⁢</mo>' +
      '<mi type="identifier" role="latinletter" id="8" parent="15">d</mi>' +
      '</mrow>' +
      '<mo type="fence" role="close" id="9" parent="16"' +
      ' operator="fenced">)</mo>' +
      '</mrow>' +
      '</math>'
  );
  // Parentheses inside bards.
  this.executeMathmlTest(
      '<mrow><mo>|</mo><mo>(</mo><mi>a</mi><mo>+</mo><mi>b</mi><mo>)</mo>' +
      '<mo>&#x00A6;</mo><mi>c</mi><mo>&#x00A6;</mo><mi>d</mi><mo>|</mo></mrow>',
      '<math>' +
      '<mrow type="fenced" role="neutral" id="17" children="16"' +
      ' content="0,10">' +
      '<mo type="fence" role="neutral" id="0" parent="17"' +
      ' operator="fenced">|</mo>' +
      '<mrow type="infixop" role="implicit" id="16" children="12,13,9"' +
      ' content="14,15" parent="17">' +
      '<mrow type="fenced" role="leftright" id="12" children="11"' +
      ' content="1,5" parent="16">' +
      '<mo type="fence" role="open" id="1" parent="12"' +
      ' operator="fenced">(</mo>' +
      '<mrow type="infixop" role="addition" id="11" children="2,4"' +
      ' content="3" parent="12">' +
      '<mi type="identifier" role="latinletter" id="2" parent="11">a</mi>' +
      '<mo type="operator" role="addition" id="3" parent="11"' +
      ' operator="infixop,+">+</mo>' +
      '<mi type="identifier" role="latinletter" id="4" parent="11">b</mi>' +
      '</mrow>' +
      '<mo type="fence" role="close" id="5" parent="12"' +
      ' operator="fenced">)</mo>' +
      '</mrow>' +
      '<mo type="operator" role="multiplication" id="14" parent="16"' +
      ' added="true" operator="infixop,⁢">⁢</mo>' +
      '<mrow type="fenced" role="neutral" id="13" children="7"' +
      ' content="6,8" parent="16">' +
      '<mo type="fence" role="neutral" id="6" parent="13"' +
      ' operator="fenced">¦</mo>' +
      '<mi type="identifier" role="latinletter" id="7" parent="13">c</mi>' +
      '<mo type="fence" role="neutral" id="8" parent="13"' +
      ' operator="fenced">¦</mo>' +
      '</mrow>' +
      '<mo type="operator" role="multiplication" id="15" parent="16"' +
      ' added="true" operator="infixop,⁢">⁢</mo>' +
      '<mi type="identifier" role="latinletter" id="9" parent="16">d</mi>' +
      '</mrow>' +
      '<mo type="fence" role="neutral" id="10" parent="17"' +
      ' operator="fenced">|</mo>' +
      '</mrow>' +
      '</math>'
  );
  // Parentheses inside bards.
  this.executeMathmlTest(
      '<mrow><mo>[</mo><mo>|</mo><mi>a</mi><mo>+</mo><mi>b</mi><mo>|</mo>' +
      '<mo>+</mo><mi>c</mi><mo>]</mo><mo>+</mo><mo>\u00A6</mo><mi>d</mi>' +
      '<mo>+</mo><mo>(</mo><mi>e</mi><mo>+</mo><mi>f</mi><mo>)</mo>' +
      '<mo>\u00A6</mo></mrow>',
      '<math>' +
      '<mrow type="infixop" role="addition" id="27" children="22,26"' +
      ' content="9">' +
      '<mrow type="fenced" role="leftright" id="22" children="21"' +
      ' content="0,8" parent="27">' +
      '<mo type="fence" role="open" id="0" parent="22"' +
      ' operator="fenced">[</mo>' +
      '<mrow type="infixop" role="addition" id="21" children="20,7"' +
      ' content="6" parent="22">' +
      '<mrow type="fenced" role="neutral" id="20" children="19"' +
      ' content="1,5" parent="21">' +
      '<mo type="fence" role="neutral" id="1" parent="20"' +
      ' operator="fenced">|</mo>' +
      '<mrow type="infixop" role="addition" id="19" children="2,4"' +
      ' content="3" parent="20">' +
      '<mi type="identifier" role="latinletter" id="2" parent="19">a</mi>' +
      '<mo type="operator" role="addition" id="3" parent="19"' +
      ' operator="infixop,+">+</mo>' +
      '<mi type="identifier" role="latinletter" id="4" parent="19">b</mi>' +
      '</mrow>' +
      '<mo type="fence" role="neutral" id="5" parent="20"' +
      ' operator="fenced">|</mo>' +
      '</mrow>' +
      '<mo type="operator" role="addition" id="6" parent="21"' +
      ' operator="infixop,+">+</mo>' +
      '<mi type="identifier" role="latinletter" id="7" parent="21">c</mi>' +
      '</mrow>' +
      '<mo type="fence" role="close" id="8" parent="22"' +
      ' operator="fenced">]</mo>' +
      '</mrow>' +
      '<mo type="operator" role="addition" id="9" parent="27"' +
      ' operator="infixop,+">+</mo>' +
      '<mrow type="fenced" role="neutral" id="26" children="25"' +
      ' content="10,18" parent="27">' +
      '<mo type="fence" role="neutral" id="10" parent="26"' +
      ' operator="fenced">¦</mo>' +
      '<mrow type="infixop" role="addition" id="25" children="11,24"' +
      ' content="12" parent="26">' +
      '<mi type="identifier" role="latinletter" id="11" parent="25">d</mi>' +
      '<mo type="operator" role="addition" id="12" parent="25"' +
      ' operator="infixop,+">+</mo>' +
      '<mrow type="fenced" role="leftright" id="24" children="23"' +
      ' content="13,17" parent="25">' +
      '<mo type="fence" role="open" id="13" parent="24"' +
      ' operator="fenced">(</mo>' +
      '<mrow type="infixop" role="addition" id="23" children="14,16"' +
      ' content="15" parent="24">' +
      '<mi type="identifier" role="latinletter" id="14" parent="23">e</mi>' +
      '<mo type="operator" role="addition" id="15" parent="23"' +
      ' operator="infixop,+">+</mo>' +
      '<mi type="identifier" role="latinletter" id="16" parent="23">f</mi>' +
      '</mrow>' +
      '<mo type="fence" role="close" id="17" parent="24"' +
      ' operator="fenced">)</mo>' +
      '</mrow>' +
      '</mrow>' +
      '<mo type="fence" role="neutral" id="18" parent="26"' +
      ' operator="fenced">¦</mo>' +
      '</mrow>' +
      '</mrow>' +
      '</math>'
  );
};


/**
 * Mixed with isolated bars.
 */
sre.SemanticMathmlTest.prototype.testMathmlMixedFencesWithBars = function() {
  // Set notation.
  this.executeMathmlTest(
      '<mrow><mo>{</mo><mo>(</mo><mi>x</mi><mo>,</mo><mi>y</mi><mo>,</mo>' +
      '<mi>z</mi><mo>)</mo><mo>|</mo><mi>x</mi><mi>y</mi><mo>=</mo>' +
      '<mo>z</mo><mo>}</mo></mrow>',
      '<math>' +
      '<mrow type="fenced" role="leftright" id="20" children="19"' +
      ' content="0,13">' +
      '<mo type="fence" role="open" id="0" parent="20"' +
      ' operator="fenced">{</mo>' +
      '<mrow type="punctuated" role="sequence" id="19" children="15,8,18"' +
      ' content="8" parent="20">' +
      '<mrow type="fenced" role="leftright" id="15" children="14"' +
      ' content="1,7" parent="19">' +
      '<mo type="fence" role="open" id="1" parent="15"' +
      ' operator="fenced">(</mo>' +
      '<mrow type="punctuated" role="sequence" id="14" children="2,3,4,5,6"' +
      ' content="3,5" parent="15">' +
      '<mi type="identifier" role="latinletter" id="2" parent="14">x</mi>' +
      '<mo type="punctuation" role="comma" id="3" parent="14"' +
      ' operator="punctuated">,</mo>' +
      '<mi type="identifier" role="latinletter" id="4" parent="14">y</mi>' +
      '<mo type="punctuation" role="comma" id="5" parent="14"' +
      ' operator="punctuated">,</mo>' +
      '<mi type="identifier" role="latinletter" id="6" parent="14">z</mi>' +
      '</mrow>' +
      '<mo type="fence" role="close" id="7" parent="15"' +
      ' operator="fenced">)</mo>' +
      '</mrow>' +
      '<mo type="punctuation" role="vbar" id="8" parent="19"' +
      ' operator="punctuated">|</mo>' +
      '<mrow type="relseq" role="equality" id="18" children="17,12"' +
      ' content="11" parent="19">' +
      '<mrow type="infixop" role="implicit" id="17" children="9,10"' +
      ' content="16" parent="18">' +
      '<mi type="identifier" role="latinletter" id="9" parent="17">x</mi>' +
      '<mo type="operator" role="multiplication" id="16" parent="17"' +
      ' added="true" operator="infixop,⁢">⁢</mo>' +
      '<mi type="identifier" role="latinletter" id="10" parent="17">y</mi>' +
      '</mrow>' +
      '<mo type="relation" role="equality" id="11" parent="18"' +
      ' operator="relseq,=">=</mo>' +
      '<mo type="identifier" role="latinletter" id="12" parent="18">z</mo>' +
      '</mrow>' +
      '</mrow>' +
      '<mo type="fence" role="close" id="13" parent="20"' +
      ' operator="fenced">}</mo>' +
      '</mrow>' +
      '</math>'
  );
  // Disjunction of bracketed parallel statements.
  this.executeMathmlTest(
      '<mrow><mo>[</mo><mi>a</mi><mo>&#x2016;</mo><mi>b</mi><mo>]</mo>' +
      '<mo>|</mo><mo>[</mo><mi>x</mi><mo>&#x2016;</mo><mi>y</mi><mo>]</mo>' +
      '</mrow>',
      '<math>' +
      '<mrow type="punctuated" role="sequence" id="15" children="12,5,14"' +
      ' content="5">' +
      '<mrow type="fenced" role="leftright" id="12" children="11"' +
      ' content="0,4" parent="15">' +
      '<mo type="fence" role="open" id="0" parent="12"' +
      ' operator="fenced">[</mo>' +
      '<mrow type="punctuated" role="sequence" id="11" children="1,2,3"' +
      ' content="2" parent="12">' +
      '<mi type="identifier" role="latinletter" id="1" parent="11">a</mi>' +
      '<mo type="punctuation" role="vbar" id="2" parent="11"' +
      ' operator="punctuated">‖</mo>' +
      '<mi type="identifier" role="latinletter" id="3" parent="11">b</mi>' +
      '</mrow>' +
      '<mo type="fence" role="close" id="4" parent="12"' +
      ' operator="fenced">]</mo>' +
      '</mrow>' +
      '<mo type="punctuation" role="vbar" id="5" parent="15"' +
      ' operator="punctuated">|</mo>' +
      '<mrow type="fenced" role="leftright" id="14" children="13"' +
      ' content="6,10" parent="15">' +
      '<mo type="fence" role="open" id="6" parent="14"' +
      ' operator="fenced">[</mo>' +
      '<mrow type="punctuated" role="sequence" id="13" children="7,8,9"' +
      ' content="8" parent="14">' +
      '<mi type="identifier" role="latinletter" id="7" parent="13">x</mi>' +
      '<mo type="punctuation" role="vbar" id="8" parent="13"' +
      ' operator="punctuated">‖</mo>' +
      '<mi type="identifier" role="latinletter" id="9" parent="13">y</mi>' +
      '</mrow>' +
      '<mo type="fence" role="close" id="10" parent="14"' +
      ' operator="fenced">]</mo>' +
      '</mrow>' +
      '</mrow>' +
      '</math>'
  );
  // Metric over the above.
  this.executeMathmlTest(
      '<mrow><mo>&#x2016;</mo><mo>[</mo><mi>a</mi><mo>&#x2016;</mo>' +
      '<mi>b</mi><mo>]</mo><mo>|</mo><mo>[</mo><mi>x</mi><mo>&#x2016;</mo>' +
      '<mi>y</mi><mo>]</mo><mo>&#x2016;</mo></mrow>',
      '<math>' +
      '<mrow type="fenced" role="neutral" id="18" children="17"' +
      ' content="0,12">' +
      '<mo type="fence" role="neutral" id="0" parent="18"' +
      ' operator="fenced">‖</mo>' +
      '<mrow type="punctuated" role="sequence" id="17" children="14,6,16"' +
      ' content="6" parent="18">' +
      '<mrow type="fenced" role="leftright" id="14" children="13"' +
      ' content="1,5" parent="17">' +
      '<mo type="fence" role="open" id="1" parent="14"' +
      ' operator="fenced">[</mo>' +
      '<mrow type="punctuated" role="sequence" id="13" children="2,3,4"' +
      ' content="3" parent="14">' +
      '<mi type="identifier" role="latinletter" id="2" parent="13">a</mi>' +
      '<mo type="punctuation" role="vbar" id="3" parent="13"' +
      ' operator="punctuated">‖</mo>' +
      '<mi type="identifier" role="latinletter" id="4" parent="13">b</mi>' +
      '</mrow>' +
      '<mo type="fence" role="close" id="5" parent="14"' +
      ' operator="fenced">]</mo>' +
      '</mrow>' +
      '<mo type="punctuation" role="vbar" id="6" parent="17"' +
      ' operator="punctuated">|</mo>' +
      '<mrow type="fenced" role="leftright" id="16" children="15"' +
      ' content="7,11" parent="17">' +
      '<mo type="fence" role="open" id="7" parent="16"' +
      ' operator="fenced">[</mo>' +
      '<mrow type="punctuated" role="sequence" id="15" children="8,9,10"' +
      ' content="9" parent="16">' +
      '<mi type="identifier" role="latinletter" id="8" parent="15">x</mi>' +
      '<mo type="punctuation" role="vbar" id="9" parent="15"' +
      ' operator="punctuated">‖</mo>' +
      '<mi type="identifier" role="latinletter" id="10" parent="15">y</mi>' +
      '</mrow>' +
      '<mo type="fence" role="close" id="11" parent="16"' +
      ' operator="fenced">]</mo>' +
      '</mrow>' +
      '</mrow>' +
      '<mo type="fence" role="neutral" id="12" parent="18"' +
      ' operator="fenced">‖</mo>' +
      '</mrow>' +
      '</math>'
  );
  // Mix of metrics and bracketed expression and single bars.
  this.executeMathmlTest(
      '<mrow><mo>&#x2016;</mo><mo>[</mo><mi>a</mi><mo>&#x2016;</mo><mi>b</mi>' +
      '<mo>]</mo><mo>|</mo><mo>[</mo><mi>c</mi><mo>&#x2016;</mo>' +
      '<mo>&#x00A6;</mo><mi>d</mi><mo>]</mo><mo>&#x2016;</mo><mo>[</mo>' +
      '<mi>u</mi><mo>&#x2016;</mo><mi>v</mi><mo>]</mo><mo>|</mo><mi>x</mi>' +
      '<mo>&#x2016;</mo><mi>y</mi><mo>&#x00A6;</mo><mi>z</mi></mrow>',
      '<math>' +
      '<mrow type="punctuated" role="sequence" id="35"' +
      ' children="34,19,20,21,22,23,24" content="19,21,23">' +
      '<mrow type="infixop" role="implicit" id="34" children="32,30"' +
      ' content="33" parent="35">' +
      '<mrow type="fenced" role="neutral" id="32" children="31"' +
      ' content="0,13" parent="34">' +
      '<mo type="fence" role="neutral" id="0" parent="32"' +
      ' operator="fenced">‖</mo>' +
      '<mrow type="punctuated" role="sequence" id="31" children="26,6,28"' +
      ' content="6" parent="32">' +
      '<mrow type="fenced" role="leftright" id="26" children="25"' +
      ' content="1,5" parent="31">' +
      '<mo type="fence" role="open" id="1" parent="26"' +
      ' operator="fenced">[</mo>' +
      '<mrow type="punctuated" role="sequence" id="25" children="2,3,4"' +
      ' content="3" parent="26">' +
      '<mi type="identifier" role="latinletter" id="2" parent="25">a</mi>' +
      '<mo type="punctuation" role="vbar" id="3" parent="25"' +
      ' operator="punctuated">‖</mo>' +
      '<mi type="identifier" role="latinletter" id="4" parent="25">b</mi>' +
      '</mrow>' +
      '<mo type="fence" role="close" id="5" parent="26"' +
      ' operator="fenced">]</mo>' +
      '</mrow>' +
      '<mo type="punctuation" role="vbar" id="6" parent="31"' +
      ' operator="punctuated">|</mo>' +
      '<mrow type="fenced" role="leftright" id="28" children="27"' +
      ' content="7,12" parent="31">' +
      '<mo type="fence" role="open" id="7" parent="28"' +
      ' operator="fenced">[</mo>' +
      '<mrow type="punctuated" role="sequence" id="27" children="8,9,10,11"' +
      ' content="9,10" parent="28">' +
      '<mi type="identifier" role="latinletter" id="8" parent="27">c</mi>' +
      '<mo type="punctuation" role="vbar" id="9" parent="27"' +
      ' operator="punctuated">‖</mo>' +
      '<mo type="punctuation" role="vbar" id="10" parent="27"' +
      ' operator="punctuated">¦</mo>' +
      '<mi type="identifier" role="latinletter" id="11" parent="27">d</mi>' +
      '</mrow>' +
      '<mo type="fence" role="close" id="12" parent="28"' +
      ' operator="fenced">]</mo>' +
      '</mrow>' +
      '</mrow>' +
      '<mo type="fence" role="neutral" id="13" parent="32"' +
      ' operator="fenced">‖</mo>' +
      '</mrow>' +
      '<mo type="operator" role="multiplication" id="33" parent="34"' +
      ' added="true" operator="infixop,⁢">⁢</mo>' +
      '<mrow type="fenced" role="leftright" id="30" children="29"' +
      ' content="14,18" parent="34">' +
      '<mo type="fence" role="open" id="14" parent="30"' +
      ' operator="fenced">[</mo>' +
      '<mrow type="punctuated" role="sequence" id="29" children="15,16,17"' +
      ' content="16" parent="30">' +
      '<mi type="identifier" role="latinletter" id="15" parent="29">u</mi>' +
      '<mo type="punctuation" role="vbar" id="16" parent="29"' +
      ' operator="punctuated">‖</mo>' +
      '<mi type="identifier" role="latinletter" id="17" parent="29">v</mi>' +
      '</mrow>' +
      '<mo type="fence" role="close" id="18" parent="30"' +
      ' operator="fenced">]</mo>' +
      '</mrow>' +
      '</mrow>' +
      '<mo type="punctuation" role="vbar" id="19" parent="35"' +
      ' operator="punctuated">|</mo>' +
      '<mi type="identifier" role="latinletter" id="20" parent="35">x</mi>' +
      '<mo type="punctuation" role="vbar" id="21" parent="35"' +
      ' operator="punctuated">‖</mo>' +
      '<mi type="identifier" role="latinletter" id="22" parent="35">y</mi>' +
      '<mo type="punctuation" role="vbar" id="23" parent="35"' +
      ' operator="punctuated">¦</mo>' +
      '<mi type="identifier" role="latinletter" id="24" parent="35">z</mi>' +
      '</mrow>' +
      '</math>'
  );
};


/**
 * Pathological cases with only opening fences.
 */
sre.SemanticMathmlTest.prototype.testMathmlOpeningFencesOnly = function() {
  // Single.
  this.executeMathmlTest(
      '<mrow><mo>[</mo></mrow>',
      '<math>' +
      '<mrow>' +
      '<mo type="fence" role="open" id="0">[</mo>' +
      '</mrow>' +
      '</math>'
  );
  // Single right.
  this.executeMathmlTest(
      '<mrow><mi>a</mi><mo>[</mo></mrow>',
      '<math>' +
      '<mrow type="punctuated" role="endpunct" id="2" children="0,1"' +
      ' content="1">' +
      '<mi type="identifier" role="latinletter" id="0" parent="2">a</mi>' +
      '<mo type="punctuation" role="openfence" id="1" parent="2"' +
      ' operator="punctuated">[</mo>' +
      '</mrow>' +
      '</math>'
  );
  // Single middle.
  this.executeMathmlTest(
      '<mrow><mi>a</mi><mo>[</mo><mi>b</mi></mrow>',
      '<math>' +
      '<mrow type="punctuated" role="sequence" id="3" children="0,1,2"' +
      ' content="1">' +
      '<mi type="identifier" role="latinletter" id="0" parent="3">a</mi>' +
      '<mo type="punctuation" role="openfence" id="1" parent="3"' +
      ' operator="punctuated">[</mo>' +
      '<mi type="identifier" role="latinletter" id="2" parent="3">b</mi>' +
      '</mrow>' +
      '</math>'
  );
  // Single left.
  this.executeMathmlTest(
      '<mrow><mo>[</mo><mi>b</mi></mrow>',
      '<math>' +
      '<mrow type="punctuated" role="startpunct" id="2" children="0,1"' +
      ' content="0">' +
      '<mo type="punctuation" role="openfence" id="0" parent="2"' +
      ' operator="punctuated">[</mo>' +
      '<mi type="identifier" role="latinletter" id="1" parent="2">b</mi>' +
      '</mrow>' +
      '</math>'
  );
  // Multiple.
  this.executeMathmlTest(
      '<mrow><mi>a</mi><mo>[</mo><mi>b</mi><mi>c</mi><mo>(</mo><mi>d</mi>' +
      '<mo>{</mo><mi>e</mi><mo>&#x3008;</mo><mi>f</mi></mrow>',
      '<math>' +
      '<mrow type="punctuated" role="sequence" id="12"' +
      ' children="0,1,11,4,5,6,7,8,9" content="1,4,6,8">' +
      '<mi type="identifier" role="latinletter" id="0" parent="12">a</mi>' +
      '<mo type="punctuation" role="openfence" id="1" parent="12"' +
      ' operator="punctuated">[</mo>' +
      '<mrow type="infixop" role="implicit" id="11" children="2,3"' +
      ' content="10" parent="12">' +
      '<mi type="identifier" role="latinletter" id="2" parent="11">b</mi>' +
      '<mo type="operator" role="multiplication" id="10" parent="11"' +
      ' added="true" operator="infixop,⁢">⁢</mo>' +
      '<mi type="identifier" role="latinletter" id="3" parent="11">c</mi>' +
      '</mrow>' +
      '<mo type="punctuation" role="openfence" id="4" parent="12"' +
      ' operator="punctuated">(</mo>' +
      '<mi type="identifier" role="latinletter" id="5" parent="12">d</mi>' +
      '<mo type="punctuation" role="openfence" id="6" parent="12"' +
      ' operator="punctuated">{</mo>' +
      '<mi type="identifier" role="latinletter" id="7" parent="12">e</mi>' +
      '<mo type="punctuation" role="openfence" id="8" parent="12"' +
      ' operator="punctuated">〈</mo>' +
      '<mi type="identifier" role="latinletter" id="9" parent="12">f</mi>' +
      '</mrow>' +
      '</math>'
  );
  // Multiple plus inner fenced.
  this.executeMathmlTest(
      '<mrow><mi>a</mi><mo>[</mo><mi>b</mi><mo>[</mo><mo>(</mo><mo>(</mo>' +
      '<mi>c</mi><mo>)</mo><mi>d</mi><mo>{</mo><mi>e</mi><mo>&#x3008;</mo>' +
      '<mi>f</mi></mrow>',
      '<math>' +
      '<mrow type="punctuated" role="sequence" id="16"' +
      ' children="0,1,2,3,4,15,9,10,11,12" content="1,3,4,9,11">' +
      '<mi type="identifier" role="latinletter" id="0" parent="16">a</mi>' +
      '<mo type="punctuation" role="openfence" id="1" parent="16"' +
      ' operator="punctuated">[</mo>' +
      '<mi type="identifier" role="latinletter" id="2" parent="16">b</mi>' +
      '<mo type="punctuation" role="openfence" id="3" parent="16"' +
      ' operator="punctuated">[</mo>' +
      '<mo type="punctuation" role="openfence" id="4" parent="16"' +
      ' operator="punctuated">(</mo>' +
      '<mrow type="infixop" role="implicit" id="15" children="13,8"' +
      ' content="14" parent="16">' +
      '<mrow type="fenced" role="leftright" id="13" children="6"' +
      ' content="5,7" parent="15">' +
      '<mo type="fence" role="open" id="5" parent="13"' +
      ' operator="fenced">(</mo>' +
      '<mi type="identifier" role="latinletter" id="6" parent="13">c</mi>' +
      '<mo type="fence" role="close" id="7" parent="13"' +
      ' operator="fenced">)</mo>' +
      '</mrow>' +
      '<mo type="operator" role="multiplication" id="14" parent="15"' +
      ' added="true" operator="infixop,⁢">⁢</mo>' +
      '<mi type="identifier" role="latinletter" id="8" parent="15">d</mi>' +
      '</mrow>' +
      '<mo type="punctuation" role="openfence" id="9" parent="16"' +
      ' operator="punctuated">{</mo>' +
      '<mi type="identifier" role="latinletter" id="10" parent="16">e</mi>' +
      '<mo type="punctuation" role="openfence" id="11" parent="16"' +
      ' operator="punctuated">〈</mo>' +
      '<mi type="identifier" role="latinletter" id="12" parent="16">f</mi>' +
      '</mrow>' +
      '</math>'
  );
};


/**
 * Pathological cases with only closing fences.
 */
sre.SemanticMathmlTest.prototype.testMathmlClosingFencesOnly = function() {
  // Single.
  this.executeMathmlTest(
      '<mrow><mo>]</mo></mrow>',
      '<math>' +
      '<mrow>' +
      '<mo type="fence" role="close" id="0">]</mo>' +
      '</mrow>' +
      '</math>'
  );
  // Single right.
  this.executeMathmlTest(
      '<mrow><mi>a</mi><mo>]</mo></mrow>',
      '<math>' +
      '<mrow type="punctuated" role="endpunct" id="2" children="0,1"' +
      ' content="1">' +
      '<mi type="identifier" role="latinletter" id="0" parent="2">a</mi>' +
      '<mo type="punctuation" role="closefence" id="1" parent="2"' +
      ' operator="punctuated">]</mo>' +
      '</mrow>' +
      '</math>'
  );
  // Single middle.
  this.executeMathmlTest(
      '<mrow><mi>a</mi><mo>]</mo><mi>b</mi></mrow>',
      '<math>' +
      '<mrow type="punctuated" role="sequence" id="3" children="0,1,2"' +
      ' content="1">' +
      '<mi type="identifier" role="latinletter" id="0" parent="3">a</mi>' +
      '<mo type="punctuation" role="closefence" id="1" parent="3"' +
      ' operator="punctuated">]</mo>' +
      '<mi type="identifier" role="latinletter" id="2" parent="3">b</mi>' +
      '</mrow>' +
      '</math>'
  );
  // Single left.
  this.executeMathmlTest(
      '<mrow><mo>]</mo><mi>b</mi></mrow>',
      '<math>' +
      '<mrow type="punctuated" role="startpunct" id="2" children="0,1"' +
      ' content="0">' +
      '<mo type="punctuation" role="closefence" id="0" parent="2"' +
      ' operator="punctuated">]</mo>' +
      '<mi type="identifier" role="latinletter" id="1" parent="2">b</mi>' +
      '</mrow>' +
      '</math>'
  );
  // Multiple.
  this.executeMathmlTest(
      '<mrow><mi>a</mi><mo>]</mo><mi>b</mi><mi>c</mi><mo>)</mo><mi>d</mi>' +
      '<mo>}</mo><mi>e</mi><mo>&#x3009;</mo><mi>f</mi></mrow>',
      '<math>' +
      '<mrow type="punctuated" role="sequence" id="12"' +
      ' children="0,1,11,4,5,6,7,8,9" content="1,4,6,8">' +
      '<mi type="identifier" role="latinletter" id="0" parent="12">a</mi>' +
      '<mo type="punctuation" role="closefence" id="1" parent="12"' +
      ' operator="punctuated">]</mo>' +
      '<mrow type="infixop" role="implicit" id="11" children="2,3"' +
      ' content="10" parent="12">' +
      '<mi type="identifier" role="latinletter" id="2" parent="11">b</mi>' +
      '<mo type="operator" role="multiplication" id="10" parent="11"' +
      ' added="true" operator="infixop,⁢">⁢</mo>' +
      '<mi type="identifier" role="latinletter" id="3" parent="11">c</mi>' +
      '</mrow>' +
      '<mo type="punctuation" role="closefence" id="4" parent="12"' +
      ' operator="punctuated">)</mo>' +
      '<mi type="identifier" role="latinletter" id="5" parent="12">d</mi>' +
      '<mo type="punctuation" role="closefence" id="6" parent="12"' +
      ' operator="punctuated">}</mo>' +
      '<mi type="identifier" role="latinletter" id="7" parent="12">e</mi>' +
      '<mo type="punctuation" role="closefence" id="8" parent="12"' +
      ' operator="punctuated">〉</mo>' +
      '<mi type="identifier" role="latinletter" id="9" parent="12">f</mi>' +
      '</mrow>' +
      '</math>'
  );
  // Multiple plus inner fenced.
  this.executeMathmlTest(
      '<mrow><mi>a</mi><mo>]</mo><mi>b</mi><mo>]</mo><mo>(</mo><mi>c</mi>' +
      '<mo>)</mo><mo>)</mo><mi>d</mi><mo>}</mo><mi>e</mi><mo>&#x3009;</mo>' +
      '<mi>f</mi></mrow>',
      '<math>' +
      '<mrow type="punctuated" role="sequence" id="14"' +
      ' children="0,1,2,3,13,7,8,9,10,11,12" content="1,3,7,9,11">' +
      '<mi type="identifier" role="latinletter" id="0" parent="14">a</mi>' +
      '<mo type="punctuation" role="closefence" id="1" parent="14"' +
      ' operator="punctuated">]</mo>' +
      '<mi type="identifier" role="latinletter" id="2" parent="14">b</mi>' +
      '<mo type="punctuation" role="closefence" id="3" parent="14"' +
      ' operator="punctuated">]</mo>' +
      '<mrow type="fenced" role="leftright" id="13" children="5"' +
      ' content="4,6" parent="14">' +
      '<mo type="fence" role="open" id="4" parent="13"' +
      ' operator="fenced">(</mo>' +
      '<mi type="identifier" role="latinletter" id="5" parent="13">c</mi>' +
      '<mo type="fence" role="close" id="6" parent="13"' +
      ' operator="fenced">)</mo>' +
      '</mrow>' +
      '<mo type="punctuation" role="closefence" id="7" parent="14"' +
      ' operator="punctuated">)</mo>' +
      '<mi type="identifier" role="latinletter" id="8" parent="14">d</mi>' +
      '<mo type="punctuation" role="closefence" id="9" parent="14"' +
      ' operator="punctuated">}</mo>' +
      '<mi type="identifier" role="latinletter" id="10" parent="14">e</mi>' +
      '<mo type="punctuation" role="closefence" id="11" parent="14"' +
      ' operator="punctuated">〉</mo>' +
      '<mi type="identifier" role="latinletter" id="12" parent="14">f</mi>' +
      '</mrow>' +
      '</math>'
  );
};


/**
 * Pathological cases with only neutral fences.
 */
sre.SemanticMathmlTest.prototype.testMathmlNeutralFencesOnly = function() {
  // Single.
  this.executeMathmlTest(
      '<mrow><mo>|</mo></mrow>',
      '<math>' +
      '<mrow>' +
      '<mo type="fence" role="neutral" id="0">|</mo>' +
      '</mrow>' +
      '</math>'
  );
  // Single right.
  this.executeMathmlTest(
      '<mrow><mi>a</mi><mo>|</mo></mrow>',
      '<math>' +
      '<mrow type="punctuated" role="endpunct" id="2" children="0,1"' +
      ' content="1">' +
      '<mi type="identifier" role="latinletter" id="0" parent="2">a</mi>' +
      '<mo type="punctuation" role="vbar" id="1" parent="2"' +
      ' operator="punctuated">|</mo>' +
      '</mrow>' +
      '</math>'
  );
  // Single middle.
  this.executeMathmlTest(
      '<mrow><mi>a</mi><mo>|</mo><mi>b</mi></mrow>',
      '<math>' +
      '<mrow type="punctuated" role="sequence" id="3" children="0,1,2"' +
      ' content="1">' +
      '<mi type="identifier" role="latinletter" id="0" parent="3">a</mi>' +
      '<mo type="punctuation" role="vbar" id="1" parent="3"' +
      ' operator="punctuated">|</mo>' +
      '<mi type="identifier" role="latinletter" id="2" parent="3">b</mi>' +
      '</mrow>' +
      '</math>'
  );
  // Single left.
  this.executeMathmlTest(
      '<mrow><mo>|</mo><mi>b</mi></mrow>',
      '<math>' +
      '<mrow type="punctuated" role="startpunct" id="2" children="0,1"' +
      ' content="0">' +
      '<mo type="punctuation" role="vbar" id="0" parent="2"' +
      ' operator="punctuated">|</mo>' +
      '<mi type="identifier" role="latinletter" id="1" parent="2">b</mi>' +
      '</mrow>' +
      '</math>'
  );
  // Two different bars.
  this.executeMathmlTest(
      '<mrow><mi>a</mi><mo>|</mo><mi>b</mi><mo>&#x00A6;</mo><mi>c</mi></mrow>',
      '<math>' +
      '<mrow type="punctuated" role="sequence" id="5" children="0,1,2,3,4"' +
      ' content="1,3">' +
      '<mi type="identifier" role="latinletter" id="0" parent="5">a</mi>' +
      '<mo type="punctuation" role="vbar" id="1" parent="5"' +
      ' operator="punctuated">|</mo>' +
      '<mi type="identifier" role="latinletter" id="2" parent="5">b</mi>' +
      '<mo type="punctuation" role="vbar" id="3" parent="5"' +
      ' operator="punctuated">¦</mo>' +
      '<mi type="identifier" role="latinletter" id="4" parent="5">c</mi>' +
      '</mrow>' +
      '</math>'
  );
  // Three different bars.
  this.executeMathmlTest(
      '<mrow><mi>a</mi><mo>&#x2016;</mo><mi>b</mi><mo>|</mo><mi>c</mi>' +
      '<mo>&#x00A6;</mo><mi>d</mi></mrow>',
      '<math>' +
      '<mrow type="punctuated" role="sequence" id="7"' +
      ' children="0,1,2,3,4,5,6" content="1,3,5">' +
      '<mi type="identifier" role="latinletter" id="0" parent="7">a</mi>' +
      '<mo type="punctuation" role="vbar" id="1" parent="7"' +
      ' operator="punctuated">‖</mo>' +
      '<mi type="identifier" role="latinletter" id="2" parent="7">b</mi>' +
      '<mo type="punctuation" role="vbar" id="3" parent="7"' +
      ' operator="punctuated">|</mo>' +
      '<mi type="identifier" role="latinletter" id="4" parent="7">c</mi>' +
      '<mo type="punctuation" role="vbar" id="5" parent="7"' +
      ' operator="punctuated">¦</mo>' +
      '<mi type="identifier" role="latinletter" id="6" parent="7">d</mi>' +
      '</mrow>' +
      '</math>'
  );
  // Multiple plus inner fenced.
  this.executeMathmlTest(
      '<mrow><mo>&#x2016;</mo><mo>[</mo><mi>a</mi><mo>&#x2016;</mo><mi>b</mi>' +
      '<mo>]</mo><mo>&#x2016;</mo><mo>|</mo><mi>x</mi><mo>&#x2016;</mo>' +
      '<mi>y</mi><mo>&#x00A6;</mo><mi>z</mi></mrow>',
      '<math>' +
      '<mrow type="punctuated" role="sequence" id="16"' +
      ' children="15,7,8,9,10,11,12" content="7,9,11">' +
      '<mrow type="fenced" role="neutral" id="15" children="14"' +
      ' content="0,6" parent="16">' +
      '<mo type="fence" role="neutral" id="0" parent="15"' +
      ' operator="fenced">‖</mo>' +
      '<mrow type="fenced" role="leftright" id="14" children="13"' +
      ' content="1,5" parent="15">' +
      '<mo type="fence" role="open" id="1" parent="14"' +
      ' operator="fenced">[</mo>' +
      '<mrow type="punctuated" role="sequence" id="13" children="2,3,4"' +
      ' content="3" parent="14">' +
      '<mi type="identifier" role="latinletter" id="2" parent="13">a</mi>' +
      '<mo type="punctuation" role="vbar" id="3" parent="13"' +
      ' operator="punctuated">‖</mo>' +
      '<mi type="identifier" role="latinletter" id="4" parent="13">b</mi>' +
      '</mrow>' +
      '<mo type="fence" role="close" id="5" parent="14"' +
      ' operator="fenced">]</mo>' +
      '</mrow>' +
      '<mo type="fence" role="neutral" id="6" parent="15"' +
      ' operator="fenced">‖</mo>' +
      '</mrow>' +
      '<mo type="punctuation" role="vbar" id="7" parent="16"' +
      ' operator="punctuated">|</mo>' +
      '<mi type="identifier" role="latinletter" id="8" parent="16">x</mi>' +
      '<mo type="punctuation" role="vbar" id="9" parent="16"' +
      ' operator="punctuated">‖</mo>' +
      '<mi type="identifier" role="latinletter" id="10" parent="16">y</mi>' +
      '<mo type="punctuation" role="vbar" id="11" parent="16"' +
      ' operator="punctuated">¦</mo>' +
      '<mi type="identifier" role="latinletter" id="12" parent="16">z</mi>' +
      '</mrow>' +
      '</math>'
  );
};


/**
 * Pathological cases with mixed fences.
 */
sre.SemanticMathmlTest.prototype.testMathmlMixedUnmatchedFences = function() {
  // Close, );
  // Neutrals and close.
  this.executeMathmlTest(
      '<mrow><mi>a</mi><mo>&#x2016;</mo><mi>b</mi><mo>|</mo><mi>c</mi>' +
      '<mo>&#x00A6;</mo><mi>d</mi><mo>]</mo><mi>e</mi></mrow>',
      '<math>' +
      '<mrow type="punctuated" role="sequence" id="9"' +
      ' children="0,1,2,3,4,5,6,7,8" content="1,3,5,7">' +
      '<mi type="identifier" role="latinletter" id="0" parent="9">a</mi>' +
      '<mo type="punctuation" role="vbar" id="1" parent="9"' +
      ' operator="punctuated">‖</mo>' +
      '<mi type="identifier" role="latinletter" id="2" parent="9">b</mi>' +
      '<mo type="punctuation" role="vbar" id="3" parent="9"' +
      ' operator="punctuated">|</mo>' +
      '<mi type="identifier" role="latinletter" id="4" parent="9">c</mi>' +
      '<mo type="punctuation" role="vbar" id="5" parent="9"' +
      ' operator="punctuated">¦</mo>' +
      '<mi type="identifier" role="latinletter" id="6" parent="9">d</mi>' +
      '<mo type="punctuation" role="closefence" id="7" parent="9"' +
      ' operator="punctuated">]</mo>' +
      '<mi type="identifier" role="latinletter" id="8" parent="9">e</mi>' +
      '</mrow>' +
      '</math>'
  );
  // Neutrals and open.
  this.executeMathmlTest(
      '<mrow><mo>[</mo><mi>a</mi><mo>&#x2016;</mo><mi>b</mi><mo>|</mo>' +
      '<mi>c</mi><mo>&#x00A6;</mo><mi>d</mi></mrow>',
      '<math>' +
      '<mrow type="punctuated" role="sequence" id="8"' +
      ' children="0,1,2,3,4,5,6,7" content="0,2,4,6">' +
      '<mo type="punctuation" role="openfence" id="0" parent="8"' +
      ' operator="punctuated">[</mo>' +
      '<mi type="identifier" role="latinletter" id="1" parent="8">a</mi>' +
      '<mo type="punctuation" role="vbar" id="2" parent="8"' +
      ' operator="punctuated">‖</mo>' +
      '<mi type="identifier" role="latinletter" id="3" parent="8">b</mi>' +
      '<mo type="punctuation" role="vbar" id="4" parent="8"' +
      ' operator="punctuated">|</mo>' +
      '<mi type="identifier" role="latinletter" id="5" parent="8">c</mi>' +
      '<mo type="punctuation" role="vbar" id="6" parent="8"' +
      ' operator="punctuated">¦</mo>' +
      '<mi type="identifier" role="latinletter" id="7" parent="8">d</mi>' +
      '</mrow>' +
      '</math>'
  );
  // Multiple fences, fenced and operations
  this.executeMathmlTest(
      '<mrow><mo>&#x2016;</mo><mo>[</mo><mi>a</mi><mo>&#x2016;</mo><mi>b</mi>' +
      '<mo>]</mo><mo>|</mo><mo>[</mo><mi>c</mi><mo>&#x2016;</mo>' +
      '<mo>&#x00A6;</mo><mi>d</mi><mo>]</mo><mo>&#x2016;</mo><mo>|</mo>' +
      '<mi>x</mi><mo>&#x2016;</mo><mi>y</mi><mo>&#x00A6;</mo><mi>z</mi>' +
      '<mo>]</mo></mrow>',
      '<math>' +
      '<mrow type="punctuated" role="sequence" id="27"' +
      ' children="26,14,15,16,17,18,19,20" content="14,16,18,20">' +
      '<mrow type="fenced" role="neutral" id="26" children="25"' +
      ' content="0,13" parent="27">' +
      '<mo type="fence" role="neutral" id="0" parent="26"' +
      ' operator="fenced">‖</mo>' +
      '<mrow type="punctuated" role="sequence" id="25" children="22,6,24"' +
      ' content="6" parent="26">' +
      '<mrow type="fenced" role="leftright" id="22" children="21"' +
      ' content="1,5" parent="25">' +
      '<mo type="fence" role="open" id="1" parent="22"' +
      ' operator="fenced">[</mo>' +
      '<mrow type="punctuated" role="sequence" id="21" children="2,3,4"' +
      ' content="3" parent="22">' +
      '<mi type="identifier" role="latinletter" id="2" parent="21">a</mi>' +
      '<mo type="punctuation" role="vbar" id="3" parent="21"' +
      ' operator="punctuated">‖</mo>' +
      '<mi type="identifier" role="latinletter" id="4" parent="21">b</mi>' +
      '</mrow>' +
      '<mo type="fence" role="close" id="5" parent="22"' +
      ' operator="fenced">]</mo>' +
      '</mrow>' +
      '<mo type="punctuation" role="vbar" id="6" parent="25"' +
      ' operator="punctuated">|</mo>' +
      '<mrow type="fenced" role="leftright" id="24" children="23"' +
      ' content="7,12" parent="25">' +
      '<mo type="fence" role="open" id="7" parent="24"' +
      ' operator="fenced">[</mo>' +
      '<mrow type="punctuated" role="sequence" id="23" children="8,9,10,11"' +
      ' content="9,10" parent="24">' +
      '<mi type="identifier" role="latinletter" id="8" parent="23">c</mi>' +
      '<mo type="punctuation" role="vbar" id="9" parent="23"' +
      ' operator="punctuated">‖</mo>' +
      '<mo type="punctuation" role="vbar" id="10" parent="23"' +
      ' operator="punctuated">¦</mo>' +
      '<mi type="identifier" role="latinletter" id="11" parent="23">d</mi>' +
      '</mrow>' +
      '<mo type="fence" role="close" id="12" parent="24"' +
      ' operator="fenced">]</mo>' +
      '</mrow>' +
      '</mrow>' +
      '<mo type="fence" role="neutral" id="13" parent="26"' +
      ' operator="fenced">‖</mo>' +
      '</mrow>' +
      '<mo type="punctuation" role="vbar" id="14" parent="27"' +
      ' operator="punctuated">|</mo>' +
      '<mi type="identifier" role="latinletter" id="15" parent="27">x</mi>' +
      '<mo type="punctuation" role="vbar" id="16" parent="27"' +
      ' operator="punctuated">‖</mo>' +
      '<mi type="identifier" role="latinletter" id="17" parent="27">y</mi>' +
      '<mo type="punctuation" role="vbar" id="18" parent="27"' +
      ' operator="punctuated">¦</mo>' +
      '<mi type="identifier" role="latinletter" id="19" parent="27">z</mi>' +
      '<mo type="punctuation" role="closefence" id="20" parent="27"' +
      ' operator="punctuated">]</mo>' +
      '</mrow>' +
      '</math>'
  );
  // Multiple fences, fenced and operations
  this.executeMathmlTest(
      '<mrow><mo>&#x2016;</mo><mo>]</mo><mo>&#x00A6;</mo><mo>&#x2016;</mo>' +
      '<mo>[</mo><mo>|</mo><mo>[</mo><mi>a</mi><mo>&#x2016;</mo><mi>b</mi>' +
      '<mo>]</mo><mo>&#x2016;</mo><mo>|</mo><mi>[</mi><mo>&#x2016;</mo>' +
      '<mi>y</mi><mo>&#x00A6;</mo><mi>z</mi></mrow>',
      '<math>' +
      '<mrow type="punctuated" role="sequence" id="24"' +
      ' children="21,4,23,13,14,15,16,17" content="4,13,14,16">' +
      '<mrow type="fenced" role="neutral" id="21" children="20"' +
      ' content="0,3" parent="24">' +
      '<mo type="fence" role="neutral" id="0" parent="21"' +
      ' operator="fenced">‖</mo>' +
      '<mrow type="punctuated" role="sequence" id="20" children="1,2"' +
      ' content="1,2" parent="21">' +
      '<mo type="punctuation" role="closefence" id="1" parent="20"' +
      ' operator="punctuated">]</mo>' +
      '<mo type="punctuation" role="vbar" id="2" parent="20"' +
      ' operator="punctuated">¦</mo>' +
      '</mrow>' +
      '<mo type="fence" role="neutral" id="3" parent="21"' +
      ' operator="fenced">‖</mo>' +
      '</mrow>' +
      '<mo type="punctuation" role="openfence" id="4" parent="24"' +
      ' operator="punctuated">[</mo>' +
      '<mrow type="fenced" role="neutral" id="23" children="22"' +
      ' content="5,12" parent="24">' +
      '<mo type="fence" role="neutral" id="5" parent="23"' +
      ' operator="fenced">|</mo>' +
      '<mrow type="punctuated" role="endpunct" id="22" children="19,11"' +
      ' content="11" parent="23">' +
      '<mrow type="fenced" role="leftright" id="19" children="18"' +
      ' content="6,10" parent="22">' +
      '<mo type="fence" role="open" id="6" parent="19"' +
      ' operator="fenced">[</mo>' +
      '<mrow type="punctuated" role="sequence" id="18" children="7,8,9"' +
      ' content="8" parent="19">' +
      '<mi type="identifier" role="latinletter" id="7" parent="18">a</mi>' +
      '<mo type="punctuation" role="vbar" id="8" parent="18"' +
      ' operator="punctuated">‖</mo>' +
      '<mi type="identifier" role="latinletter" id="9" parent="18">b</mi>' +
      '</mrow>' +
      '<mo type="fence" role="close" id="10" parent="19"' +
      ' operator="fenced">]</mo>' +
      '</mrow>' +
      '<mo type="punctuation" role="vbar" id="11" parent="22"' +
      ' operator="punctuated">‖</mo>' +
      '</mrow>' +
      '<mo type="fence" role="neutral" id="12" parent="23"' +
      ' operator="fenced">|</mo>' +
      '</mrow>' +
      '<mi type="punctuation" role="openfence" id="13" parent="24"' +
      ' operator="punctuated">[</mi>' +
      '<mo type="punctuation" role="vbar" id="14" parent="24"' +
      ' operator="punctuated">‖</mo>' +
      '<mi type="identifier" role="latinletter" id="15" parent="24">y</mi>' +
      '<mo type="punctuation" role="vbar" id="16" parent="24"' +
      ' operator="punctuated">¦</mo>' +
      '<mi type="identifier" role="latinletter" id="17" parent="24">z</mi>' +
      '</mrow>' +
      '</math>'
  );
  // Multiple fences, fenced and operations
  this.executeMathmlTest(
      '<mrow><mo>&#x2016;</mo><mo>[</mo><mi>a</mi><mo>&#x00A6;</mo>' +
      '<mo>&#x2016;</mo><mo>[</mo><mo>+</mo><mo>[</mo><mi>b</mi>' +
      '<mo>&#x2016;</mo><mi>c</mi><mo>]</mo><mo>+</mo><mo>&#x2016;</mo>' +
      '<mo>|</mo><mi>d</mi><mo>+</mo><mi>e</mi><mi>[</mi><mo>&#x2016;</mo>' +
      '<mi>y</mi><mo>&#x00A6;</mo><mo>+</mo><mi>z</mi></mrow>',
      '<math>' +
      '<mrow type="punctuated" role="sequence" id="30"' +
      ' children="0,1,2,3,4,5,27,13,14,28,18,19,20,21,29"' +
      ' content="0,1,3,4,5,13,14,18,19,21">' +
      '<mo type="punctuation" role="vbar" id="0" parent="30"' +
      ' operator="punctuated">‖</mo>' +
      '<mo type="punctuation" role="openfence" id="1" parent="30"' +
      ' operator="punctuated">[</mo>' +
      '<mi type="identifier" role="latinletter" id="2" parent="30">a</mi>' +
      '<mo type="punctuation" role="vbar" id="3" parent="30"' +
      ' operator="punctuated">¦</mo>' +
      '<mo type="punctuation" role="vbar" id="4" parent="30"' +
      ' operator="punctuated">‖</mo>' +
      '<mo type="punctuation" role="openfence" id="5" parent="30"' +
      ' operator="punctuated">[</mo>' +
      '<mrow type="postfixop" role="multiop" id="27" children="26"' +
      ' content="12" parent="30">' +
      '<mrow type="prefixop" role="multiop" id="26" children="25"' +
      ' content="6" parent="27">' +
      '<mo type="operator" role="addition" id="6" parent="26"' +
      ' operator="prefixop,+">+</mo>' +
      '<mrow type="fenced" role="leftright" id="25" children="24"' +
      ' content="7,11" parent="26">' +
      '<mo type="fence" role="open" id="7" parent="25"' +
      ' operator="fenced">[</mo>' +
      '<mrow type="punctuated" role="sequence" id="24" children="8,9,10"' +
      ' content="9" parent="25">' +
      '<mi type="identifier" role="latinletter" id="8" parent="24">b</mi>' +
      '<mo type="punctuation" role="vbar" id="9" parent="24"' +
      ' operator="punctuated">‖</mo>' +
      '<mi type="identifier" role="latinletter" id="10" parent="24">c</mi>' +
      '</mrow>' +
      '<mo type="fence" role="close" id="11" parent="25"' +
      ' operator="fenced">]</mo>' +
      '</mrow>' +
      '</mrow>' +
      '<mo type="operator" role="addition" id="12" parent="27"' +
      ' operator="postfixop,+">+</mo>' +
      '</mrow>' +
      '<mo type="punctuation" role="vbar" id="13" parent="30"' +
      ' operator="punctuated">‖</mo>' +
      '<mo type="punctuation" role="vbar" id="14" parent="30"' +
      ' operator="punctuated">|</mo>' +
      '<mrow type="infixop" role="addition" id="28" children="15,17"' +
      ' content="16" parent="30">' +
      '<mi type="identifier" role="latinletter" id="15" parent="28">d</mi>' +
      '<mo type="operator" role="addition" id="16" parent="28"' +
      ' operator="infixop,+">+</mo>' +
      '<mi type="identifier" role="latinletter" id="17" parent="28">e</mi>' +
      '</mrow>' +
      '<mi type="punctuation" role="openfence" id="18" parent="30"' +
      ' operator="punctuated">[</mi>' +
      '<mo type="punctuation" role="vbar" id="19" parent="30"' +
      ' operator="punctuated">‖</mo>' +
      '<mi type="identifier" role="latinletter" id="20" parent="30">y</mi>' +
      '<mo type="punctuation" role="vbar" id="21" parent="30"' +
      ' operator="punctuated">¦</mo>' +
      '<mrow type="prefixop" role="multiop" id="29" children="23"' +
      ' content="22" parent="30">' +
      '<mo type="operator" role="addition" id="22" parent="29"' +
      ' operator="prefixop,+">+</mo>' +
      '<mi type="identifier" role="latinletter" id="23" parent="29">z</mi>' +
      '</mrow>' +
      '</mrow>' +
      '</math>'
  );
};


/**
 * Square roots
 */
sre.SemanticMathmlTest.prototype.testMathmlSquareRoots = function() {
  this.executeMathmlTest(
      '<msqrt></msqrt>',
      '<math>' +
      '<msqrt type="sqrt" role="unknown" id="1" children="0">' +
      '<mrow type="empty" role="unknown" id="0" parent="1"/>' +
      '</msqrt>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<msqrt><mi>x</mi></msqrt>',
      '<math>' +
      '<msqrt type="sqrt" role="unknown" id="1" children="0">' +
      '<mi type="identifier" role="latinletter" id="0" parent="1">x</mi>' +
      '</msqrt>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<msqrt><msqrt><mi>x</mi></msqrt></msqrt>',
      '<math>' +
      '<msqrt type="sqrt" role="unknown" id="2" children="1">' +
      '<msqrt type="sqrt" role="unknown" id="1" children="0" parent="2">' +
      '<mi type="identifier" role="latinletter" id="0" parent="1">x</mi>' +
      '</msqrt>' +
      '</msqrt>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<msqrt><mi>x</mi><mi>n</mi></msqrt>',
      '<math>' +
      '<msqrt type="sqrt" role="unknown" id="4" children="3">' +
      '<mrow type="infixop" role="implicit" id="3" children="0,1"' +
      ' content="2" parent="4">' +
      '<mi type="identifier" role="latinletter" id="0" parent="3">x</mi>' +
      '<mo type="operator" role="multiplication" id="2" parent="3"' +
      ' added="true" operator="infixop,⁢">⁢</mo>' +
      '<mi type="identifier" role="latinletter" id="1" parent="3">n</mi>' +
      '</mrow>' +
      '</msqrt>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<msqrt><msqrt><msqrt><mi>x</mi></msqrt></msqrt><mi>y</mi></msqrt>',
      '<math>' +
      '<msqrt type="sqrt" role="unknown" id="6" children="5">' +
      '<mrow type="infixop" role="implicit" id="5" children="2,3"' +
      ' content="4" parent="6">' +
      '<msqrt type="sqrt" role="unknown" id="2" children="1" parent="5">' +
      '<msqrt type="sqrt" role="unknown" id="1" children="0" parent="2">' +
      '<mi type="identifier" role="latinletter" id="0" parent="1">x</mi>' +
      '</msqrt>' +
      '</msqrt>' +
      '<mo type="operator" role="multiplication" id="4" parent="5"' +
      ' added="true" operator="infixop,⁢">⁢</mo>' +
      '<mi type="identifier" role="latinletter" id="3" parent="5">y</mi>' +
      '</mrow>' +
      '</msqrt>' +
      '</math>'
  );
};


/**
 * Regular roots
 */
sre.SemanticMathmlTest.prototype.testMathmlRegularRoots = function() {
  // Not sure if that makes even sense.
  // this.executeMathmlTest('<mroot></mroot>');
  this.executeMathmlTest(
      '<mroot><mi>x</mi><mi>n</mi></mroot>',
      '<math>' +
      '<mroot type="root" role="unknown" id="2" children="0,1">' +
      '<mi type="identifier" role="latinletter" id="1" parent="2">x</mi>' +
      '<mi type="identifier" role="latinletter" id="0" parent="2">n</mi>' +
      '</mroot>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<mroot><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mrow><mi>n</mi>' +
      '<mo>+</mo><mn>1</mn></mrow></mroot>',
      '<math>' +
      '<mroot type="root" role="unknown" id="8" children="3,7">' +
      '<mrow type="infixop" role="addition" id="7" children="4,6"' +
      ' content="5" parent="8">' +
      '<mi type="identifier" role="latinletter" id="4" parent="7">x</mi>' +
      '<mo type="operator" role="addition" id="5" parent="7"' +
      ' operator="infixop,+">+</mo>' +
      '<mi type="identifier" role="latinletter" id="6" parent="7">y</mi>' +
      '</mrow>' +
      '<mrow type="infixop" role="addition" id="3" children="0,2"' +
      ' content="1" parent="8">' +
      '<mi type="identifier" role="latinletter" id="0" parent="3">n</mi>' +
      '<mo type="operator" role="addition" id="1" parent="3"' +
      ' operator="infixop,+">+</mo>' +
      '<mn type="number" role="integer" id="2" parent="3">1</mn>' +
      '</mrow>' +
      '</mroot>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<mroot><mroot><mi>x</mi><mi>n</mi></mroot><mi>m</mi></mroot>',
      '<math>' +
      '<mroot type="root" role="unknown" id="4" children="0,3">' +
      '<mroot type="root" role="unknown" id="3" children="1,2" parent="4">' +
      '<mi type="identifier" role="latinletter" id="2" parent="3">x</mi>' +
      '<mi type="identifier" role="latinletter" id="1" parent="3">n</mi>' +
      '</mroot>' +
      '<mi type="identifier" role="latinletter" id="0" parent="4">m</mi>' +
      '</mroot>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<mroot><mrow><mroot><mi>x</mi><mi>n</mi></mroot><mroot><mi>y</mi>' +
      '<mi>l</mi></mroot></mrow><mi>m</mi></mroot>',
      '<math>' +
      '<mroot type="root" role="unknown" id="9" children="0,8">' +
      '<mrow type="infixop" role="implicit" id="8" children="3,6"' +
      ' content="7" parent="9">' +
      '<mroot type="root" role="unknown" id="3" children="1,2" parent="8">' +
      '<mi type="identifier" role="latinletter" id="2" parent="3">x</mi>' +
      '<mi type="identifier" role="latinletter" id="1" parent="3">n</mi>' +
      '</mroot>' +
      '<mo type="operator" role="multiplication" id="7" parent="8"' +
      ' added="true" operator="infixop,⁢">⁢</mo>' +
      '<mroot type="root" role="unknown" id="6" children="4,5" parent="8">' +
      '<mi type="identifier" role="latinletter" id="5" parent="6">y</mi>' +
      '<mi type="identifier" role="latinletter" id="4" parent="6">l</mi>' +
      '</mroot>' +
      '</mrow>' +
      '<mi type="identifier" role="latinletter" id="0" parent="9">m</mi>' +
      '</mroot>' +
      '</math>'
  );
};


/**
 * Mixed roots
 */
sre.SemanticMathmlTest.prototype.testMathmlMixedRoots = function() {
  this.executeMathmlTest(
      '<msqrt><mroot><mi>x</mi><mi>n</mi></mroot></msqrt>',
      '<math>' +
      '<msqrt type="sqrt" role="unknown" id="3" children="2">' +
      '<mroot type="root" role="unknown" id="2" children="0,1" parent="3">' +
      '<mi type="identifier" role="latinletter" id="1" parent="2">x</mi>' +
      '<mi type="identifier" role="latinletter" id="0" parent="2">n</mi>' +
      '</mroot>' +
      '</msqrt>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<mroot><msqrt><mi>x</mi></msqrt><mi>n</mi></mroot>',
      '<math>' +
      '<mroot type="root" role="unknown" id="3" children="0,2">' +
      '<msqrt type="sqrt" role="unknown" id="2" children="1" parent="3">' +
      '<mi type="identifier" role="latinletter" id="1" parent="2">x</mi>' +
      '</msqrt>' +
      '<mi type="identifier" role="latinletter" id="0" parent="3">n</mi>' +
      '</mroot>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<mroot><msqrt><mi>x</mi><mi>y</mi></msqrt><mi>n</mi></mroot>',
      '<math>' +
      '<mroot type="root" role="unknown" id="6" children="0,5">' +
      '<msqrt type="sqrt" role="unknown" id="5" children="4" parent="6">' +
      '<mrow type="infixop" role="implicit" id="4" children="1,2"' +
      ' content="3" parent="5">' +
      '<mi type="identifier" role="latinletter" id="1" parent="4">x</mi>' +
      '<mo type="operator" role="multiplication" id="3" parent="4"' +
      ' added="true" operator="infixop,⁢">⁢</mo>' +
      '<mi type="identifier" role="latinletter" id="2" parent="4">y</mi>' +
      '</mrow>' +
      '</msqrt>' +
      '<mi type="identifier" role="latinletter" id="0" parent="6">n</mi>' +
      '</mroot>' +
      '</math>'
  );
};


/**
 * Simple function applications
 */
sre.SemanticMathmlTest.prototype.testMathmlSimpleFuncsSingle = function() {
  this.executeMathmlTest(
      '<mrow><mi>f</mi></mrow>',
      '<math>' +
      '<mrow>' +
      '<mi type="identifier" role="latinletter" id="0">f</mi>' +
      '</mrow>' +
      '</math>'
  );

  this.executeMathmlTest(
      '<mrow><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo></mrow>',
      '<math>' +
      '<mrow type="appl" role="simple function" id="6" children="0,4"' +
      ' content="5,0">' +
      '<mi type="identifier" role="simple function" id="0" parent="6"' +
      ' operator="appl">f</mi>' +
      '<mo type="punctuation" role="application" id="5" parent="6"' +
      ' added="true" operator="appl">⁡</mo>' +
      '<mrow type="fenced" role="leftright" id="4" children="2"' +
      ' content="1,3" parent="6">' +
      '<mo type="fence" role="open" id="1" parent="4"' +
      ' operator="fenced">(</mo>' +
      '<mi type="identifier" role="latinletter" id="2" parent="4">x</mi>' +
      '<mo type="fence" role="close" id="3" parent="4"' +
      ' operator="fenced">)</mo>' +
      '</mrow>' +
      '</mrow>' +
      '</math>'
  );

  this.executeMathmlTest(
      '<mrow><mi>f</mi><mo>(</mo><mi>x</mi><mi>y</mi><mo>)</mo></mrow>',
      '<math>' +
      '<mrow type="appl" role="simple function" id="9" children="0,7"' +
      ' content="8,0">' +
      '<mi type="identifier" role="simple function" id="0" parent="9"' +
      ' operator="appl">f</mi>' +
      '<mo type="punctuation" role="application" id="8" parent="9"' +
      ' added="true" operator="appl">⁡</mo>' +
      '<mrow type="fenced" role="leftright" id="7" children="6"' +
      ' content="1,4" parent="9">' +
      '<mo type="fence" role="open" id="1" parent="7"' +
      ' operator="fenced">(</mo>' +
      '<mrow type="infixop" role="implicit" id="6" children="2,3"' +
      ' content="5" parent="7">' +
      '<mi type="identifier" role="latinletter" id="2" parent="6">x</mi>' +
      '<mo type="operator" role="multiplication" id="5" parent="6"' +
      ' added="true" operator="infixop,⁢">⁢</mo>' +
      '<mi type="identifier" role="latinletter" id="3" parent="6">y</mi>' +
      '</mrow>' +
      '<mo type="fence" role="close" id="4" parent="7"' +
      ' operator="fenced">)</mo>' +
      '</mrow>' +
      '</mrow>' +
      '</math>'
  );

  this.executeMathmlTest(
      '<mrow><mi>f</mi><mo>(</mo><mi>x</mi><mo>,</mo><mi>y</mi>' +
      '<mo>,</mo><mi>z</mi><mo>)</mo></mrow>',
      '<math>' +
      '<mrow type="appl" role="simple function" id="11" children="0,9"' +
      ' content="10,0">' +
      '<mi type="identifier" role="simple function" id="0" parent="11"' +
      ' operator="appl">f</mi>' +
      '<mo type="punctuation" role="application" id="10" parent="11"' +
      ' added="true" operator="appl">⁡</mo>' +
      '<mrow type="fenced" role="leftright" id="9" children="8"' +
      ' content="1,7" parent="11">' +
      '<mo type="fence" role="open" id="1" parent="9"' +
      ' operator="fenced">(</mo>' +
      '<mrow type="punctuated" role="sequence" id="8" children="2,3,4,5,6"' +
      ' content="3,5" parent="9">' +
      '<mi type="identifier" role="latinletter" id="2" parent="8">x</mi>' +
      '<mo type="punctuation" role="comma" id="3" parent="8"' +
      ' operator="punctuated">,</mo>' +
      '<mi type="identifier" role="latinletter" id="4" parent="8">y</mi>' +
      '<mo type="punctuation" role="comma" id="5" parent="8"' +
      ' operator="punctuated">,</mo>' +
      '<mi type="identifier" role="latinletter" id="6" parent="8">z</mi>' +
      '</mrow>' +
      '<mo type="fence" role="close" id="7" parent="9"' +
      ' operator="fenced">)</mo>' +
      '</mrow>' +
      '</mrow>' +
      '</math>'
  );

  this.executeMathmlTest(
      '<mrow><mi>f</mi><mo>(</mo><msup><mi>x</mi><mn>2</mn></msup>' +
      '<mo>)</mo></mrow>',
      '<math>' +
      '<mrow type="appl" role="simple function" id="8" children="0,6"' +
      ' content="7,0">' +
      '<mi type="identifier" role="simple function" id="0" parent="8"' +
      ' operator="appl">f</mi>' +
      '<mo type="punctuation" role="application" id="7" parent="8"' +
      ' added="true" operator="appl">⁡</mo>' +
      '<mrow type="fenced" role="leftright" id="6" children="4"' +
      ' content="1,5" parent="8">' +
      '<mo type="fence" role="open" id="1" parent="6"' +
      ' operator="fenced">(</mo>' +
      '<msup type="superscript" role="latinletter" id="4" children="2,3"' +
      ' parent="6">' +
      '<mi type="identifier" role="latinletter" id="2" parent="4">x</mi>' +
      '<mn type="number" role="integer" id="3" parent="4">2</mn>' +
      '</msup>' +
      '<mo type="fence" role="close" id="5" parent="6"' +
      ' operator="fenced">)</mo>' +
      '</mrow>' +
      '</mrow>' +
      '</math>'
  );

  this.executeMathmlTest(
      '<mrow><mi>f</mi><mo>(</mo><msub><mi>x</mi><mn>2</mn></msub>' +
      '<mo>)</mo></mrow>',
      '<math>' +
      '<mrow type="appl" role="simple function" id="8" children="0,6"' +
      ' content="7,0">' +
      '<mi type="identifier" role="simple function" id="0" parent="8"' +
      ' operator="appl">f</mi>' +
      '<mo type="punctuation" role="application" id="7" parent="8"' +
      ' added="true" operator="appl">⁡</mo>' +
      '<mrow type="fenced" role="leftright" id="6" children="4"' +
      ' content="1,5" parent="8">' +
      '<mo type="fence" role="open" id="1" parent="6"' +
      ' operator="fenced">(</mo>' +
      '<msub type="subscript" role="latinletter" id="4" children="2,3"' +
      ' parent="6">' +
      '<mi type="identifier" role="latinletter" id="2" parent="4">x</mi>' +
      '<mn type="number" role="integer" id="3" parent="4">2</mn>' +
      '</msub>' +
      '<mo type="fence" role="close" id="5" parent="6"' +
      ' operator="fenced">)</mo>' +
      '</mrow>' +
      '</mrow>' +
      '</math>'
  );

  this.executeMathmlTest(
      '<mrow><mi>f</mi><mo>(</mo><msubsup><mi>x</mi><mn>2</mn>' +
      '<mn>1</mn></msubsup><mo>)</mo></mrow>',
      '<math>' +
      '<mrow type="appl" role="simple function" id="10" children="0,8"' +
      ' content="9,0">' +
      '<mi type="identifier" role="simple function" id="0" parent="10"' +
      ' operator="appl">f</mi>' +
      '<mo type="punctuation" role="application" id="9" parent="10"' +
      ' added="true" operator="appl">⁡</mo>' +
      '<mrow type="fenced" role="leftright" id="8" children="6"' +
      ' content="1,7" parent="10">' +
      '<mo type="fence" role="open" id="1" parent="8"' +
      ' operator="fenced">(</mo>' +
      '<msubsup type="subsup" role="latinletter" id="6" children="2,3,4"' +
      ' parent="8" collapsed="(6 (5 2 3) 4)">' +
      '<mi type="identifier" role="latinletter" id="2" parent="6">x</mi>' +
      '<mn type="number" role="integer" id="3" parent="6">2</mn>' +
      '<mn type="number" role="integer" id="4" parent="6">1</mn>' +
      '</msubsup>' +
      '<mo type="fence" role="close" id="7" parent="8"' +
      ' operator="fenced">)</mo>' +
      '</mrow>' +
      '</mrow>' +
      '</math>'
  );

  this.executeMathmlTest(
      '<mrow><mi>f</mi><mo>(</mo><mover><mi>x</mi><mn>2</mn></mover>' +
      '<mo>)</mo></mrow>',
      '<math>' +
      '<mrow type="appl" role="simple function" id="8" children="0,6"' +
      ' content="7,0">' +
      '<mi type="identifier" role="simple function" id="0" parent="8"' +
      ' operator="appl">f</mi>' +
      '<mo type="punctuation" role="application" id="7" parent="8"' +
      ' added="true" operator="appl">⁡</mo>' +
      '<mrow type="fenced" role="leftright" id="6" children="4"' +
      ' content="1,5" parent="8">' +
      '<mo type="fence" role="open" id="1" parent="6"' +
      ' operator="fenced">(</mo>' +
      '<mover type="overscore" role="latinletter" id="4" children="2,3"' +
      ' parent="6">' +
      '<mi type="identifier" role="latinletter" id="2" parent="4">x</mi>' +
      '<mn type="number" role="integer" id="3" parent="4">2</mn>' +
      '</mover>' +
      '<mo type="fence" role="close" id="5" parent="6"' +
      ' operator="fenced">)</mo>' +
      '</mrow>' +
      '</mrow>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<mrow><mi>f</mi><mo>(</mo><munder><mi>x</mi><mn>2</mn></munder>' +
      '<mo>)</mo></mrow>',
      '<math>' +
      '<mrow type="appl" role="simple function" id="8" children="0,6"' +
      ' content="7,0">' +
      '<mi type="identifier" role="simple function" id="0" parent="8"' +
      ' operator="appl">f</mi>' +
      '<mo type="punctuation" role="application" id="7" parent="8"' +
      ' added="true" operator="appl">⁡</mo>' +
      '<mrow type="fenced" role="leftright" id="6" children="4" content="1,5"' +
      ' parent="8">' +
      '<mo type="fence" role="open" id="1" parent="6"' +
      ' operator="fenced">(</mo>' +
      '<munder type="underscore" role="latinletter" id="4" children="2,3"' +
      ' parent="6">' +
      '<mi type="identifier" role="latinletter" id="2" parent="4">x</mi>' +
      '<mn type="number" role="integer" id="3" parent="4">2</mn>' +
      '</munder>' +
      '<mo type="fence" role="close" id="5" parent="6"' +
      ' operator="fenced">)</mo>' +
      '</mrow>' +
      '</mrow>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<mrow><mi>f</mi><mo>(</mo><munderover><mi>x</mi><mn>2</mn>' +
      '<mn>1</mn></munderover><mo>)</mo></mrow>',
      '<math>' +
      '<mrow type="appl" role="simple function" id="10" children="0,8"' +
      ' content="9,0">' +
      '<mi type="identifier" role="simple function" id="0" parent="10"' +
      ' operator="appl">f</mi>' +
      '<mo type="punctuation" role="application" id="9" parent="10"' +
      ' added="true" operator="appl">⁡</mo>' +
      '<mrow type="fenced" role="leftright" id="8" children="6" content="1,7"' +
      ' parent="10">' +
      '<mo type="fence" role="open" id="1" parent="8"' +
      ' operator="fenced">(</mo>' +
      '<munderover type="overscore" role="latinletter" id="6" children="5,4"' +
      ' parent="8">' +
      '<mrow type="underscore" role="latinletter" id="5" children="2,3"' +
      ' parent="6">' +
      '<mi type="identifier" role="latinletter" id="2" parent="5">x</mi>' +
      '<mn type="number" role="integer" id="3" parent="5">2</mn>' +
      '</mrow>' +
      '<mn type="number" role="integer" id="4" parent="6">1</mn>' +
      '</munderover>' +
      '<mo type="fence" role="close" id="7" parent="8"' +
      ' operator="fenced">)</mo>' +
      '</mrow>' +
      '</mrow>' +
      '</math>'
  );

  this.executeMathmlTest(
      '<mrow><mi>f</mi><mo>(</mo><mfrac><mn>1</mn><mn>2</mn></mfrac>' +
      '<mo>)</mo></mrow>',
      '<math>' +
      '<mrow type="appl" role="simple function" id="8" children="0,6"' +
      ' content="7,0">' +
      '<mi type="identifier" role="simple function" id="0" parent="8"' +
      ' operator="appl">f</mi>' +
      '<mo type="punctuation" role="application" id="7" parent="8"' +
      ' added="true" operator="appl">⁡</mo>' +
      '<mrow type="fenced" role="leftright" id="6" children="4"' +
      ' content="1,5" parent="8">' +
      '<mo type="fence" role="open" id="1" parent="6"' +
      ' operator="fenced">(</mo>' +
      '<mfrac type="fraction" role="vulgar" id="4" children="2,3" parent="6">' +
      '<mn type="number" role="integer" id="2" parent="4">1</mn>' +
      '<mn type="number" role="integer" id="3" parent="4">2</mn>' +
      '</mfrac>' +
      '<mo type="fence" role="close" id="5" parent="6"' +
      ' operator="fenced">)</mo>' +
      '</mrow>' +
      '</mrow>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<mrow><mi>f</mi><mo>(</mo><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '<mo>)</mo></mrow>',
      '<math>' +
      '<mrow type="infixop" role="implicit" id="9" children="0,7"' +
      ' content="8">' +
      '<mi type="identifier" role="latinletter" id="0" parent="9">f</mi>' +
      '<mo type="operator" role="multiplication" id="8" parent="9"' +
      ' added="true" operator="infixop,⁢">⁢</mo>' +
      '<mrow type="fenced" role="leftright" id="7" children="6" content="1,5"' +
      ' parent="9">' +
      '<mo type="fence" role="open" id="1" parent="7"' +
      ' operator="fenced">(</mo>' +
      '<mrow type="infixop" role="addition" id="6" children="2,4" content="3"' +
      ' parent="7">' +
      '<mi type="identifier" role="latinletter" id="2" parent="6">x</mi>' +
      '<mo type="operator" role="addition" id="3" parent="6"' +
      ' operator="infixop,+">+</mo>' +
      '<mi type="identifier" role="latinletter" id="4" parent="6">y</mi>' +
      '</mrow>' +
      '<mo type="fence" role="close" id="5" parent="7"' +
      ' operator="fenced">)</mo>' +
      '</mrow>' +
      '</mrow>' +
      '</math>'
  );
};


/**
 * Simple functions with surrounding operators.
 */
sre.SemanticMathmlTest.prototype.testMathmlSimpleFuncsWithOps = function() {
  this.executeMathmlTest(
      '<mrow><mn>1</mn><mo>+</mo><mi>f</mi><mo>(</mo><mi>x</mi>' +
      '<mo>)</mo></mrow>',
      '<math>' +
      '<mrow type="infixop" role="addition" id="9" children="0,8"' +
      ' content="1">' +
      '<mn type="number" role="integer" id="0" parent="9">1</mn>' +
      '<mo type="operator" role="addition" id="1" parent="9"' +
      ' operator="infixop,+">+</mo>' +
      '<mrow type="appl" role="simple function" id="8" children="2,6"' +
      ' content="7,2" parent="9">' +
      '<mi type="identifier" role="simple function" id="2" parent="8"' +
      ' operator="appl">f</mi>' +
      '<mo type="punctuation" role="application" id="7" parent="8"' +
      ' added="true" operator="appl">⁡</mo>' +
      '<mrow type="fenced" role="leftright" id="6" children="4"' +
      ' content="3,5" parent="8">' +
      '<mo type="fence" role="open" id="3" parent="6"' +
      ' operator="fenced">(</mo>' +
      '<mi type="identifier" role="latinletter" id="4" parent="6">x</mi>' +
      '<mo type="fence" role="close" id="5" parent="6"' +
      ' operator="fenced">)</mo>' +
      '</mrow>' +
      '</mrow>' +
      '</mrow>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<mrow><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>+</mo>' +
      '<mn>2</mn></mrow>',
      '<math>' +
      '<mrow type="infixop" role="addition" id="9" children="8,5"' +
      ' content="4">' +
      '<mrow type="appl" role="simple function" id="8" children="0,6"' +
      ' content="7,0" parent="9">' +
      '<mi type="identifier" role="simple function" id="0" parent="8"' +
      ' operator="appl">f</mi>' +
      '<mo type="punctuation" role="application" id="7" parent="8"' +
      ' added="true" operator="appl">⁡</mo>' +
      '<mrow type="fenced" role="leftright" id="6" children="2"' +
      ' content="1,3" parent="8">' +
      '<mo type="fence" role="open" id="1" parent="6"' +
      ' operator="fenced">(</mo>' +
      '<mi type="identifier" role="latinletter" id="2" parent="6">x</mi>' +
      '<mo type="fence" role="close" id="3" parent="6"' +
      ' operator="fenced">)</mo>' +
      '</mrow>' +
      '</mrow>' +
      '<mo type="operator" role="addition" id="4" parent="9"' +
      ' operator="infixop,+">+</mo>' +
      '<mn type="number" role="integer" id="5" parent="9">2</mn>' +
      '</mrow>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<mrow><mn>1</mn><mo>+</mo><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '<mo>+</mo><mn>2</mn></mrow>',
      '<math>' +
      '<mrow type="infixop" role="addition" id="11" children="0,10,7"' +
      ' content="1,6">' +
      '<mn type="number" role="integer" id="0" parent="11">1</mn>' +
      '<mo type="operator" role="addition" id="1" parent="11"' +
      ' operator="infixop,+">+</mo>' +
      '<mrow type="appl" role="simple function" id="10" children="2,8"' +
      ' content="9,2" parent="11">' +
      '<mi type="identifier" role="simple function" id="2" parent="10"' +
      ' operator="appl">f</mi>' +
      '<mo type="punctuation" role="application" id="9" parent="10"' +
      ' added="true" operator="appl">⁡</mo>' +
      '<mrow type="fenced" role="leftright" id="8" children="4"' +
      ' content="3,5" parent="10">' +
      '<mo type="fence" role="open" id="3" parent="8"' +
      ' operator="fenced">(</mo>' +
      '<mi type="identifier" role="latinletter" id="4" parent="8">x</mi>' +
      '<mo type="fence" role="close" id="5" parent="8"' +
      ' operator="fenced">)</mo>' +
      '</mrow>' +
      '</mrow>' +
      '<mo type="operator" role="addition" id="6" parent="11"' +
      ' operator="infixop,+">+</mo>' +
      '<mn type="number" role="integer" id="7" parent="11">2</mn>' +
      '</mrow>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<mrow><mo>a</mo><mo>+</mo><mi>f</mi><mo>(</mo><mi>x</mi>' +
      '<mo>)</mo></mrow>',
      '<math>' +
      '<mrow type="infixop" role="addition" id="9" children="0,8"' +
      ' content="1">' +
      '<mo type="identifier" role="latinletter" id="0" parent="9">a</mo>' +
      '<mo type="operator" role="addition" id="1" parent="9"' +
      ' operator="infixop,+">+</mo>' +
      '<mrow type="appl" role="simple function" id="8" children="2,6"' +
      ' content="7,2" parent="9">' +
      '<mi type="identifier" role="simple function" id="2" parent="8"' +
      ' operator="appl">f</mi>' +
      '<mo type="punctuation" role="application" id="7" parent="8"' +
      ' added="true" operator="appl">⁡</mo>' +
      '<mrow type="fenced" role="leftright" id="6" children="4"' +
      ' content="3,5" parent="8">' +
      '<mo type="fence" role="open" id="3" parent="6"' +
      ' operator="fenced">(</mo>' +
      '<mi type="identifier" role="latinletter" id="4" parent="6">x</mi>' +
      '<mo type="fence" role="close" id="5" parent="6"' +
      ' operator="fenced">)</mo>' +
      '</mrow>' +
      '</mrow>' +
      '</mrow>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<mrow><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>+</mo>' +
      '<mo>b</mo></mrow>',
      '<math>' +
      '<mrow type="infixop" role="addition" id="9" children="8,5"' +
      ' content="4">' +
      '<mrow type="appl" role="simple function" id="8" children="0,6"' +
      ' content="7,0" parent="9">' +
      '<mi type="identifier" role="simple function" id="0" parent="8"' +
      ' operator="appl">f</mi>' +
      '<mo type="punctuation" role="application" id="7" parent="8"' +
      ' added="true" operator="appl">⁡</mo>' +
      '<mrow type="fenced" role="leftright" id="6" children="2"' +
      ' content="1,3" parent="8">' +
      '<mo type="fence" role="open" id="1" parent="6"' +
      ' operator="fenced">(</mo>' +
      '<mi type="identifier" role="latinletter" id="2" parent="6">x</mi>' +
      '<mo type="fence" role="close" id="3" parent="6"' +
      ' operator="fenced">)</mo>' +
      '</mrow>' +
      '</mrow>' +
      '<mo type="operator" role="addition" id="4" parent="9"' +
      ' operator="infixop,+">+</mo>' +
      '<mo type="identifier" role="latinletter" id="5" parent="9">b</mo>' +
      '</mrow>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<mrow><mo>a</mo><mo>+</mo><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '<mo>+</mo><mo>b</mo></mrow>',
      '<math>' +
      '<mrow type="infixop" role="addition" id="11" children="0,10,7"' +
      ' content="1,6">' +
      '<mo type="identifier" role="latinletter" id="0" parent="11">a</mo>' +
      '<mo type="operator" role="addition" id="1" parent="11"' +
      ' operator="infixop,+">+</mo>' +
      '<mrow type="appl" role="simple function" id="10" children="2,8"' +
      ' content="9,2" parent="11">' +
      '<mi type="identifier" role="simple function" id="2" parent="10"' +
      ' operator="appl">f</mi>' +
      '<mo type="punctuation" role="application" id="9" parent="10"' +
      ' added="true" operator="appl">⁡</mo>' +
      '<mrow type="fenced" role="leftright" id="8" children="4"' +
      ' content="3,5" parent="10">' +
      '<mo type="fence" role="open" id="3" parent="8"' +
      ' operator="fenced">(</mo>' +
      '<mi type="identifier" role="latinletter" id="4" parent="8">x</mi>' +
      '<mo type="fence" role="close" id="5" parent="8"' +
      ' operator="fenced">)</mo>' +
      '</mrow>' +
      '</mrow>' +
      '<mo type="operator" role="addition" id="6" parent="11"' +
      ' operator="infixop,+">+</mo>' +
      '<mo type="identifier" role="latinletter" id="7" parent="11">b</mo>' +
      '</mrow>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<mrow><mo>a</mo><mo>=</mo><mi>f</mi><mo>(</mo><mi>x</mi>' +
      '<mo>)</mo></mrow>',
      '<math>' +
      '<mrow type="relseq" role="equality" id="9" children="0,8" content="1">' +
      '<mo type="identifier" role="latinletter" id="0" parent="9">a</mo>' +
      '<mo type="relation" role="equality" id="1" parent="9"' +
      ' operator="relseq,=">=</mo>' +
      '<mrow type="appl" role="simple function" id="8" children="2,6"' +
      ' content="7,2" parent="9">' +
      '<mi type="identifier" role="simple function" id="2" parent="8"' +
      ' operator="appl">f</mi>' +
      '<mo type="punctuation" role="application" id="7" parent="8"' +
      ' added="true" operator="appl">⁡</mo>' +
      '<mrow type="fenced" role="leftright" id="6" children="4"' +
      ' content="3,5" parent="8">' +
      '<mo type="fence" role="open" id="3" parent="6"' +
      ' operator="fenced">(</mo>' +
      '<mi type="identifier" role="latinletter" id="4" parent="6">x</mi>' +
      '<mo type="fence" role="close" id="5" parent="6"' +
      ' operator="fenced">)</mo>' +
      '</mrow>' +
      '</mrow>' +
      '</mrow>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<mrow><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>=</mo>' +
      '<mo>b</mo></mrow>',
      '<math>' +
      '<mrow type="relseq" role="equality" id="9" children="8,5" content="4">' +
      '<mrow type="appl" role="simple function" id="8" children="0,6"' +
      ' content="7,0" parent="9">' +
      '<mi type="identifier" role="simple function" id="0" parent="8"' +
      ' operator="appl">f</mi>' +
      '<mo type="punctuation" role="application" id="7" parent="8"' +
      ' added="true" operator="appl">⁡</mo>' +
      '<mrow type="fenced" role="leftright" id="6" children="2"' +
      ' content="1,3" parent="8">' +
      '<mo type="fence" role="open" id="1" parent="6"' +
      ' operator="fenced">(</mo>' +
      '<mi type="identifier" role="latinletter" id="2" parent="6">x</mi>' +
      '<mo type="fence" role="close" id="3" parent="6"' +
      ' operator="fenced">)</mo>' +
      '</mrow>' +
      '</mrow>' +
      '<mo type="relation" role="equality" id="4" parent="9"' +
      ' operator="relseq,=">=</mo>' +
      '<mo type="identifier" role="latinletter" id="5" parent="9">b</mo>' +
      '</mrow>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<mrow><mo>a</mo><mo>=</mo><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '<mo>=</mo><mo>b</mo></mrow>',
      '<math>' +
      '<mrow type="relseq" role="equality" id="11" children="0,10,7"' +
      ' content="1,6">' +
      '<mo type="identifier" role="latinletter" id="0" parent="11">a</mo>' +
      '<mo type="relation" role="equality" id="1" parent="11"' +
      ' operator="relseq,=">=</mo>' +
      '<mrow type="appl" role="simple function" id="10" children="2,8"' +
      ' content="9,2" parent="11">' +
      '<mi type="identifier" role="simple function" id="2" parent="10"' +
      ' operator="appl">f</mi>' +
      '<mo type="punctuation" role="application" id="9" parent="10"' +
      ' added="true" operator="appl">⁡</mo>' +
      '<mrow type="fenced" role="leftright" id="8" children="4"' +
      ' content="3,5" parent="10">' +
      '<mo type="fence" role="open" id="3" parent="8"' +
      ' operator="fenced">(</mo>' +
      '<mi type="identifier" role="latinletter" id="4" parent="8">x</mi>' +
      '<mo type="fence" role="close" id="5" parent="8"' +
      ' operator="fenced">)</mo>' +
      '</mrow>' +
      '</mrow>' +
      '<mo type="relation" role="equality" id="6" parent="11"' +
      ' operator="relseq,=">=</mo>' +
      '<mo type="identifier" role="latinletter" id="7" parent="11">b</mo>' +
      '</mrow>' +
      '</math>'
  );
};


/**
 * Multiple simple functions.
 */
sre.SemanticMathmlTest.prototype.testMathmlSimpleFuncsMulti = function() {
  this.executeMathmlTest(
      '<mrow><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>+</mo><mi>g</mi>' +
      '<mo>(</mo><mi>x</mi><mo>)</mo></mrow>',
      '<math>' +
      '<mrow type="infixop" role="addition" id="15" children="14,12"' +
      ' content="4">' +
      '<mrow type="appl" role="simple function" id="14" children="0,9"' +
      ' content="13,0" parent="15">' +
      '<mi type="identifier" role="simple function" id="0" parent="14"' +
      ' operator="appl">f</mi>' +
      '<mo type="punctuation" role="application" id="13" parent="14"' +
      ' added="true" operator="appl">⁡</mo>' +
      '<mrow type="fenced" role="leftright" id="9" children="2"' +
      ' content="1,3" parent="14">' +
      '<mo type="fence" role="open" id="1" parent="9"' +
      ' operator="fenced">(</mo>' +
      '<mi type="identifier" role="latinletter" id="2" parent="9">x</mi>' +
      '<mo type="fence" role="close" id="3" parent="9"' +
      ' operator="fenced">)</mo>' +
      '</mrow>' +
      '</mrow>' +
      '<mo type="operator" role="addition" id="4" parent="15"' +
      ' operator="infixop,+">+</mo>' +
      '<mrow type="appl" role="simple function" id="12" children="5,10"' +
      ' content="11,5" parent="15">' +
      '<mi type="identifier" role="simple function" id="5" parent="12"' +
      ' operator="appl">g</mi>' +
      '<mo type="punctuation" role="application" id="11" parent="12"' +
      ' added="true" operator="appl">⁡</mo>' +
      '<mrow type="fenced" role="leftright" id="10" children="7"' +
      ' content="6,8" parent="12">' +
      '<mo type="fence" role="open" id="6" parent="10"' +
      ' operator="fenced">(</mo>' +
      '<mi type="identifier" role="latinletter" id="7" parent="10">x</mi>' +
      '<mo type="fence" role="close" id="8" parent="10"' +
      ' operator="fenced">)</mo>' +
      '</mrow>' +
      '</mrow>' +
      '</mrow>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<mrow><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>+</mo><mi>g</mi>' +
      '<mo>(</mo><mi>x</mi><mo>)</mo><mo>=</mo><mi>h</mi><mo>(</mo>' +
      '<mi>x</mi><mo>)</mo></mrow>',
      '<math>' +
      '<mrow type="relseq" role="equality" id="24" children="23,18"' +
      ' content="9">' +
      '<mrow type="infixop" role="addition" id="23" children="22,20"' +
      ' content="4" parent="24">' +
      '<mrow type="appl" role="simple function" id="22" children="0,14"' +
      ' content="21,0" parent="23">' +
      '<mi type="identifier" role="simple function" id="0" parent="22"' +
      ' operator="appl">f</mi>' +
      '<mo type="punctuation" role="application" id="21" parent="22"' +
      ' added="true" operator="appl">⁡</mo>' +
      '<mrow type="fenced" role="leftright" id="14" children="2"' +
      ' content="1,3" parent="22">' +
      '<mo type="fence" role="open" id="1" parent="14"' +
      ' operator="fenced">(</mo>' +
      '<mi type="identifier" role="latinletter" id="2" parent="14">x</mi>' +
      '<mo type="fence" role="close" id="3" parent="14"' +
      ' operator="fenced">)</mo>' +
      '</mrow>' +
      '</mrow>' +
      '<mo type="operator" role="addition" id="4" parent="23"' +
      ' operator="infixop,+">+</mo>' +
      '<mrow type="appl" role="simple function" id="20" children="5,15"' +
      ' content="19,5" parent="23">' +
      '<mi type="identifier" role="simple function" id="5" parent="20"' +
      ' operator="appl">g</mi>' +
      '<mo type="punctuation" role="application" id="19" parent="20"' +
      ' added="true" operator="appl">⁡</mo>' +
      '<mrow type="fenced" role="leftright" id="15" children="7"' +
      ' content="6,8" parent="20">' +
      '<mo type="fence" role="open" id="6" parent="15"' +
      ' operator="fenced">(</mo>' +
      '<mi type="identifier" role="latinletter" id="7" parent="15">x</mi>' +
      '<mo type="fence" role="close" id="8" parent="15"' +
      ' operator="fenced">)</mo>' +
      '</mrow>' +
      '</mrow>' +
      '</mrow>' +
      '<mo type="relation" role="equality" id="9" parent="24"' +
      ' operator="relseq,=">=</mo>' +
      '<mrow type="appl" role="simple function" id="18" children="10,16"' +
      ' content="17,10" parent="24">' +
      '<mi type="identifier" role="simple function" id="10" parent="18"' +
      ' operator="appl">h</mi>' +
      '<mo type="punctuation" role="application" id="17" parent="18"' +
      ' added="true" operator="appl">⁡</mo>' +
      '<mrow type="fenced" role="leftright" id="16" children="12"' +
      ' content="11,13" parent="18">' +
      '<mo type="fence" role="open" id="11" parent="16"' +
      ' operator="fenced">(</mo>' +
      '<mi type="identifier" role="latinletter" id="12" parent="16">x</mi>' +
      '<mo type="fence" role="close" id="13" parent="16"' +
      ' operator="fenced">)</mo>' +
      '</mrow>' +
      '</mrow>' +
      '</mrow>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<mrow><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>+</mo><mi>g</mi>' +
      '<mo>(</mo><mi>y</mi><mo>)</mo><mo>=</mo><mi>h</mi><mo>(</mo>' +
      '<mi>x</mi><mi>y</mi><mo>)</mo></mrow>',
      '<math>' +
      '<mrow type="relseq" role="equality" id="27" children="26,21"' +
      ' content="9">' +
      '<mrow type="infixop" role="addition" id="26" children="25,23"' +
      ' content="4" parent="27">' +
      '<mrow type="appl" role="simple function" id="25" children="0,15"' +
      ' content="24,0" parent="26">' +
      '<mi type="identifier" role="simple function" id="0" parent="25"' +
      ' operator="appl">f</mi>' +
      '<mo type="punctuation" role="application" id="24" parent="25"' +
      ' added="true" operator="appl">⁡</mo>' +
      '<mrow type="fenced" role="leftright" id="15" children="2"' +
      ' content="1,3" parent="25">' +
      '<mo type="fence" role="open" id="1" parent="15"' +
      ' operator="fenced">(</mo>' +
      '<mi type="identifier" role="latinletter" id="2" parent="15">x</mi>' +
      '<mo type="fence" role="close" id="3" parent="15"' +
      ' operator="fenced">)</mo>' +
      '</mrow>' +
      '</mrow>' +
      '<mo type="operator" role="addition" id="4" parent="26"' +
      ' operator="infixop,+">+</mo>' +
      '<mrow type="appl" role="simple function" id="23" children="5,16"' +
      ' content="22,5" parent="26">' +
      '<mi type="identifier" role="simple function" id="5" parent="23"' +
      ' operator="appl">g</mi>' +
      '<mo type="punctuation" role="application" id="22" parent="23"' +
      ' added="true" operator="appl">⁡</mo>' +
      '<mrow type="fenced" role="leftright" id="16" children="7"' +
      ' content="6,8" parent="23">' +
      '<mo type="fence" role="open" id="6" parent="16"' +
      ' operator="fenced">(</mo>' +
      '<mi type="identifier" role="latinletter" id="7" parent="16">y</mi>' +
      '<mo type="fence" role="close" id="8" parent="16"' +
      ' operator="fenced">)</mo>' +
      '</mrow>' +
      '</mrow>' +
      '</mrow>' +
      '<mo type="relation" role="equality" id="9" parent="27"' +
      ' operator="relseq,=">=</mo>' +
      '<mrow type="appl" role="simple function" id="21" children="10,19"' +
      ' content="20,10" parent="27">' +
      '<mi type="identifier" role="simple function" id="10" parent="21"' +
      ' operator="appl">h</mi>' +
      '<mo type="punctuation" role="application" id="20" parent="21"' +
      ' added="true" operator="appl">⁡</mo>' +
      '<mrow type="fenced" role="leftright" id="19" children="18"' +
      ' content="11,14" parent="21">' +
      '<mo type="fence" role="open" id="11" parent="19"' +
      ' operator="fenced">(</mo>' +
      '<mrow type="infixop" role="implicit" id="18" children="12,13"' +
      ' content="17" parent="19">' +
      '<mi type="identifier" role="latinletter" id="12" parent="18">x</mi>' +
      '<mo type="operator" role="multiplication" id="17" parent="18"' +
      ' added="true" operator="infixop,⁢">⁢</mo>' +
      '<mi type="identifier" role="latinletter" id="13" parent="18">y</mi>' +
      '</mrow>' +
      '<mo type="fence" role="close" id="14" parent="19"' +
      ' operator="fenced">)</mo>' +
      '</mrow>' +
      '</mrow>' +
      '</mrow>' +
      '</math>'
  );
};


/**
 * Nested simple functions.
 */
sre.SemanticMathmlTest.prototype.testMathmlSimpleFuncsNested = function() {
  this.executeMathmlTest(
      '<mrow><mi>g</mi><mo>(</mo><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '<mo>)</mo></mrow>',
      '<math>' +
      '<mrow type="appl" role="simple function" id="12" children="0,10"' +
      ' content="11,0">' +
      '<mi type="identifier" role="simple function" id="0" parent="12"' +
      ' operator="appl">g</mi>' +
      '<mo type="punctuation" role="application" id="11" parent="12"' +
      ' added="true" operator="appl">⁡</mo>' +
      '<mrow type="fenced" role="leftright" id="10" children="9"' +
      ' content="1,6" parent="12">' +
      '<mo type="fence" role="open" id="1" parent="10"' +
      ' operator="fenced">(</mo>' +
      '<mrow type="appl" role="simple function" id="9" children="2,7"' +
      ' content="8,2" parent="10">' +
      '<mi type="identifier" role="simple function" id="2" parent="9"' +
      ' operator="appl">f</mi>' +
      '<mo type="punctuation" role="application" id="8" parent="9"' +
      ' added="true" operator="appl">⁡</mo>' +
      '<mrow type="fenced" role="leftright" id="7" children="4"' +
      ' content="3,5" parent="9">' +
      '<mo type="fence" role="open" id="3" parent="7"' +
      ' operator="fenced">(</mo>' +
      '<mi type="identifier" role="latinletter" id="4" parent="7">x</mi>' +
      '<mo type="fence" role="close" id="5" parent="7"' +
      ' operator="fenced">)</mo>' +
      '</mrow>' +
      '</mrow>' +
      '<mo type="fence" role="close" id="6" parent="10"' +
      ' operator="fenced">)</mo>' +
      '</mrow>' +
      '</mrow>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<mrow><mi>h</mi><mo>(</mo><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '<mi>g</mi><mo>(</mo><mi>y</mi><mo>)</mo><mo>)</mo></mrow>',
      '<math>' +
      '<mrow type="appl" role="simple function" id="21" children="0,19"' +
      ' content="20,0">' +
      '<mi type="identifier" role="simple function" id="0" parent="21"' +
      ' operator="appl">h</mi>' +
      '<mo type="punctuation" role="application" id="20" parent="21"' +
      ' added="true" operator="appl">⁡</mo>' +
      '<mrow type="fenced" role="leftright" id="19" children="18"' +
      ' content="1,10" parent="21">' +
      '<mo type="fence" role="open" id="1" parent="19"' +
      ' operator="fenced">(</mo>' +
      '<mrow type="infixop" role="implicit" id="18" children="16,14"' +
      ' content="17" parent="19">' +
      '<mrow type="appl" role="simple function" id="16" children="2,11"' +
      ' content="15,2" parent="18">' +
      '<mi type="identifier" role="simple function" id="2" parent="16"' +
      ' operator="appl">f</mi>' +
      '<mo type="punctuation" role="application" id="15" parent="16"' +
      ' added="true" operator="appl">⁡</mo>' +
      '<mrow type="fenced" role="leftright" id="11" children="4"' +
      ' content="3,5" parent="16">' +
      '<mo type="fence" role="open" id="3" parent="11"' +
      ' operator="fenced">(</mo>' +
      '<mi type="identifier" role="latinletter" id="4" parent="11">x</mi>' +
      '<mo type="fence" role="close" id="5" parent="11"' +
      ' operator="fenced">)</mo>' +
      '</mrow>' +
      '</mrow>' +
      '<mo type="operator" role="multiplication" id="17" parent="18"' +
      ' added="true" operator="infixop,⁢">⁢</mo>' +
      '<mrow type="appl" role="simple function" id="14" children="6,12"' +
      ' content="13,6" parent="18">' +
      '<mi type="identifier" role="simple function" id="6" parent="14"' +
      ' operator="appl">g</mi>' +
      '<mo type="punctuation" role="application" id="13" parent="14"' +
      ' added="true" operator="appl">⁡</mo>' +
      '<mrow type="fenced" role="leftright" id="12" children="8"' +
      ' content="7,9" parent="14">' +
      '<mo type="fence" role="open" id="7" parent="12"' +
      ' operator="fenced">(</mo>' +
      '<mi type="identifier" role="latinletter" id="8" parent="12">y</mi>' +
      '<mo type="fence" role="close" id="9" parent="12"' +
      ' operator="fenced">)</mo>' +
      '</mrow>' +
      '</mrow>' +
      '</mrow>' +
      '<mo type="fence" role="close" id="10" parent="19"' +
      ' operator="fenced">)</mo>' +
      '</mrow>' +
      '</mrow>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<mrow><mi>h</mi><mo>(</mo><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo>' +
      '<mo>+</mo><mi>g</mi><mo>(</mo><mi>y</mi><mo>)</mo><mo>)</mo></mrow>',
      '<math>' +
      '<mrow type="infixop" role="implicit" id="21" children="0,19"' +
      ' content="20">' +
      '<mi type="identifier" role="latinletter" id="0" parent="21">h</mi>' +
      '<mo type="operator" role="multiplication" id="20" parent="21"' +
      ' added="true" operator="infixop,⁢">⁢</mo>' +
      '<mrow type="fenced" role="leftright" id="19" children="18"' +
      ' content="1,11" parent="21">' +
      '<mo type="fence" role="open" id="1" parent="19"' +
      ' operator="fenced">(</mo>' +
      '<mrow type="infixop" role="addition" id="18" children="17,15"' +
      ' content="6" parent="19">' +
      '<mrow type="appl" role="simple function" id="17" children="2,12"' +
      ' content="16,2" parent="18">' +
      '<mi type="identifier" role="simple function" id="2" parent="17"' +
      ' operator="appl">f</mi>' +
      '<mo type="punctuation" role="application" id="16" parent="17"' +
      ' added="true" operator="appl">⁡</mo>' +
      '<mrow type="fenced" role="leftright" id="12" children="4"' +
      ' content="3,5" parent="17">' +
      '<mo type="fence" role="open" id="3" parent="12"' +
      ' operator="fenced">(</mo>' +
      '<mi type="identifier" role="latinletter" id="4" parent="12">x</mi>' +
      '<mo type="fence" role="close" id="5" parent="12"' +
      ' operator="fenced">)</mo>' +
      '</mrow>' +
      '</mrow>' +
      '<mo type="operator" role="addition" id="6" parent="18"' +
      ' operator="infixop,+">+</mo>' +
      '<mrow type="appl" role="simple function" id="15" children="7,13"' +
      ' content="14,7" parent="18">' +
      '<mi type="identifier" role="simple function" id="7" parent="15"' +
      ' operator="appl">g</mi>' +
      '<mo type="punctuation" role="application" id="14" parent="15"' +
      ' added="true" operator="appl">⁡</mo>' +
      '<mrow type="fenced" role="leftright" id="13" children="9"' +
      ' content="8,10" parent="15">' +
      '<mo type="fence" role="open" id="8" parent="13"' +
      ' operator="fenced">(</mo>' +
      '<mi type="identifier" role="latinletter" id="9" parent="13">y</mi>' +
      '<mo type="fence" role="close" id="10" parent="13"' +
      ' operator="fenced">)</mo>' +
      '</mrow>' +
      '</mrow>' +
      '</mrow>' +
      '<mo type="fence" role="close" id="11" parent="19"' +
      ' operator="fenced">)</mo>' +
      '</mrow>' +
      '</mrow>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<mi>P</mi><mo>[</mo><mi>x</mi><mo>=</mo><mn>2</mn><mo>]</mo>',
      '<math type="appl" role="simple function" id="9" children="0,7"' +
      ' content="8,0">' +
      '<mi type="identifier" role="simple function" id="0" parent="9"' +
      ' operator="appl">P</mi>' +
      '<mo type="punctuation" role="application" id="8" parent="9"' +
      ' added="true" operator="appl">⁡</mo>' +
      '<mrow type="fenced" role="leftright" id="7" children="6"' +
      ' content="1,5" parent="9">' +
      '<mo type="fence" role="open" id="1" parent="7"' +
      ' operator="fenced">[</mo>' +
      '<mrow type="relseq" role="equality" id="6" children="2,4"' +
      ' content="3" parent="7">' +
      '<mi type="identifier" role="latinletter" id="2" parent="6">x</mi>' +
      '<mo type="relation" role="equality" id="3" parent="6"' +
      ' operator="relseq,=">=</mo>' +
      '<mn type="number" role="integer" id="4" parent="6">2</mn>' +
      '</mrow>' +
      '<mo type="fence" role="close" id="5" parent="7"' +
      ' operator="fenced">]</mo>' +
      '</mrow>' +
      '</math>'
  );
};


/**
 * Simple functions with explicit function application.
 */
sre.SemanticMathmlTest.prototype.testMathmlSimpleFuncsExplicitApp = function() {
  this.executeMathmlTest(
      '<mi>f</mi><mo>\u2061</mo><mo>(</mo><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '<mo>)</mo>',
      '<math type="appl" role="simple function" id="10" children="0,8"' +
      ' content="9,0">' +
      '<mi type="identifier" role="simple function" id="0" parent="10"' +
      ' operator="appl">f</mi>' +
      '<mo type="punctuation" role="application" id="9" parent="10"' +
      ' added="true" operator="appl">⁡</mo>' +
      '<mrow type="fenced" role="leftright" id="8" children="7"' +
      ' content="2,6" parent="10">' +
      '<mo type="fence" role="open" id="2" parent="8"' +
      ' operator="fenced">(</mo>' +
      '<mrow type="infixop" role="addition" id="7" children="3,5"' +
      ' content="4" parent="8">' +
      '<mi type="identifier" role="latinletter" id="3" parent="7">x</mi>' +
      '<mo type="operator" role="addition" id="4" parent="7"' +
      ' operator="infixop,+">+</mo>' +
      '<mi type="identifier" role="latinletter" id="5" parent="7">y</mi>' +
      '</mrow>' +
      '<mo type="fence" role="close" id="6" parent="8"' +
      ' operator="fenced">)</mo>' +
      '</mrow>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<mi>f</mi><mo>\u2061</mo><mo>(</mo><mi>x</mi><mo>+</mo><mi>y</mi>' +
      '<mo>)</mo><mo>+</mo><mi>f</mi><mo>(</mo><mi>x</mi><mo>+</mo>' +
      '<mi>y</mi><mo>)</mo>',
      '<math type="infixop" role="addition" id="22" children="19,21"' +
      ' content="7">' +
      '<mrow type="appl" role="simple function" id="19" children="0,15"' +
      ' content="18,0" parent="22">' +
      '<mi type="identifier" role="simple function" id="0" parent="19"' +
      ' operator="appl">f</mi>' +
      '<mo type="punctuation" role="application" id="18" parent="19"' +
      ' added="true" operator="appl">⁡</mo>' +
      '<mrow type="fenced" role="leftright" id="15" children="14"' +
      ' content="2,6" parent="19">' +
      '<mo type="fence" role="open" id="2" parent="15"' +
      ' operator="fenced">(</mo>' +
      '<mrow type="infixop" role="addition" id="14" children="3,5"' +
      ' content="4" parent="15">' +
      '<mi type="identifier" role="latinletter" id="3" parent="14">x</mi>' +
      '<mo type="operator" role="addition" id="4" parent="14"' +
      ' operator="infixop,+">+</mo>' +
      '<mi type="identifier" role="latinletter" id="5" parent="14">y</mi>' +
      '</mrow>' +
      '<mo type="fence" role="close" id="6" parent="15"' +
      ' operator="fenced">)</mo>' +
      '</mrow>' +
      '</mrow>' +
      '<mo type="operator" role="addition" id="7" parent="22"' +
      ' operator="infixop,+">+</mo>' +
      '<mrow type="infixop" role="implicit" id="21" children="8,17"' +
      ' content="20" parent="22">' +
      '<mi type="identifier" role="latinletter" id="8" parent="21">f</mi>' +
      '<mo type="operator" role="multiplication" id="20" parent="21"' +
      ' added="true" operator="infixop,⁢">⁢</mo>' +
      '<mrow type="fenced" role="leftright" id="17" children="16"' +
      ' content="9,13" parent="21">' +
      '<mo type="fence" role="open" id="9" parent="17"' +
      ' operator="fenced">(</mo>' +
      '<mrow type="infixop" role="addition" id="16" children="10,12"' +
      ' content="11" parent="17">' +
      '<mi type="identifier" role="latinletter" id="10" parent="16">x</mi>' +
      '<mo type="operator" role="addition" id="11" parent="16"' +
      ' operator="infixop,+">+</mo>' +
      '<mi type="identifier" role="latinletter" id="12" parent="16">y</mi>' +
      '</mrow>' +
      '<mo type="fence" role="close" id="13" parent="17"' +
      ' operator="fenced">)</mo>' +
      '</mrow>' +
      '</mrow>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<msub><mi>f</mi><mn>1</mn></msub><mo>\u2061</mo><mo>(</mo><mi>x</mi>' +
      '<mo>+</mo><mi>y</mi><mo>)</mo>',
      '<math type="appl" role="simple function" id="12" children="2,10"' +
      ' content="11,0">' +
      '<msub type="subscript" role="simple function" id="2" children="0,1"' +
      ' parent="12">' +
      '<mi type="identifier" role="simple function" id="0" parent="12"' +
      ' operator="appl">f</mi>' +
      '<mn type="number" role="integer" id="1" parent="2">1</mn>' +
      '</msub>' +
      '<mo type="punctuation" role="application" id="11" parent="12"' +
      ' added="true" operator="appl">⁡</mo>' +
      '<mrow type="fenced" role="leftright" id="10" children="9"' +
      ' content="4,8" parent="12">' +
      '<mo type="fence" role="open" id="4" parent="10"' +
      ' operator="fenced">(</mo>' +
      '<mrow type="infixop" role="addition" id="9" children="5,7"' +
      ' content="6" parent="10">' +
      '<mi type="identifier" role="latinletter" id="5" parent="9">x</mi>' +
      '<mo type="operator" role="addition" id="6" parent="9"' +
      ' operator="infixop,+">+</mo>' +
      '<mi type="identifier" role="latinletter" id="7" parent="9">y</mi>' +
      '</mrow>' +
      '<mo type="fence" role="close" id="8" parent="10"' +
      ' operator="fenced">)</mo>' +
      '</mrow>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<msup><msub><mi>f</mi><mi>n</mi></msub><mn>2</mn></msup>' +
      '<mo>\u2061</mo><mo>(</mo><mi>x</mi><mo>+</mo><mi>y</mi><mo>)</mo>' +
      '<mo>+</mo><msup><msub><mi>f</mi><mi>m</mi></msub><mn>2</mn></msup>' +
      '<mo>(</mo><mi>x</mi><mo>+</mo><mi>y</mi><mo>)</mo>',
      '<math type="infixop" role="addition" id="30" children="27,29"' +
      ' content="11">' +
      '<mrow type="appl" role="simple function" id="27" children="4,23"' +
      ' content="26,0" parent="30">' +
      '<msup type="superscript" role="simple function" id="4"' +
      ' children="2,3" parent="27">' +
      '<msub type="subscript" role="simple function" id="2" children="0,1"' +
      ' parent="4">' +
      '<mi type="identifier" role="simple function" id="0" parent="27"' +
      ' operator="appl">f</mi>' +
      '<mi type="identifier" role="latinletter" id="1" parent="2">n</mi>' +
      '</msub>' +
      '<mn type="number" role="integer" id="3" parent="4">2</mn>' +
      '</msup>' +
      '<mo type="punctuation" role="application" id="26" parent="27"' +
      ' added="true" operator="appl">⁡</mo>' +
      '<mrow type="fenced" role="leftright" id="23" children="22"' +
      ' content="6,10" parent="27">' +
      '<mo type="fence" role="open" id="6" parent="23"' +
      ' operator="fenced">(</mo>' +
      '<mrow type="infixop" role="addition" id="22" children="7,9"' +
      ' content="8" parent="23">' +
      '<mi type="identifier" role="latinletter" id="7" parent="22">x</mi>' +
      '<mo type="operator" role="addition" id="8" parent="22"' +
      ' operator="infixop,+">+</mo>' +
      '<mi type="identifier" role="latinletter" id="9" parent="22">y</mi>' +
      '</mrow>' +
      '<mo type="fence" role="close" id="10" parent="23"' +
      ' operator="fenced">)</mo>' +
      '</mrow>' +
      '</mrow>' +
      '<mo type="operator" role="addition" id="11" parent="30"' +
      ' operator="infixop,+">+</mo>' +
      '<mrow type="infixop" role="implicit" id="29" children="16,25"' +
      ' content="28" parent="30">' +
      '<msup type="superscript" role="latinletter" id="16" children="14,15"' +
      ' parent="29">' +
      '<msub type="subscript" role="latinletter" id="14" children="12,13"' +
      ' parent="16">' +
      '<mi type="identifier" role="latinletter" id="12" parent="14">f</mi>' +
      '<mi type="identifier" role="latinletter" id="13" parent="14">m</mi>' +
      '</msub>' +
      '<mn type="number" role="integer" id="15" parent="16">2</mn>' +
      '</msup>' +
      '<mo type="operator" role="multiplication" id="28" parent="29"' +
      ' added="true" operator="infixop,⁢">⁢</mo>' +
      '<mrow type="fenced" role="leftright" id="25" children="24"' +
      ' content="17,21" parent="29">' +
      '<mo type="fence" role="open" id="17" parent="25"' +
      ' operator="fenced">(</mo>' +
      '<mrow type="infixop" role="addition" id="24" children="18,20"' +
      ' content="19" parent="25">' +
      '<mi type="identifier" role="latinletter" id="18" parent="24">x</mi>' +
      '<mo type="operator" role="addition" id="19" parent="24"' +
      ' operator="infixop,+">+</mo>' +
      '<mi type="identifier" role="latinletter" id="20" parent="24">y</mi>' +
      '</mrow>' +
      '<mo type="fence" role="close" id="21" parent="25"' +
      ' operator="fenced">)</mo>' +
      '</mrow>' +
      '</mrow>' +
      '</math>'
  );
};


// Missing tests here!


// Tensors.
/**
 * Pathological multiscripts expressions that are actually empty.
 */
sre.SemanticMathmlTest.prototype.testMathmlEmptyTensors = function() {
  this.executeMathmlTest(
      '<mmultiscripts></mmultiscripts>',
      '<math>' +
      '<mmultiscripts type="empty" role="unknown" id="0"/>' +
      '</math>'
  );
  // Rewrite!
  this.executeMathmlTest(
      '<mmultiscripts><none/></mmultiscripts>',
      '<math>' +
      '<mmultiscripts type="empty" role="unknown" id="0"/>' +
      '</math>'
  );
  // Rewrite!
  this.executeMathmlTest(
      '<mmultiscripts><none/><mprescripts/></mmultiscripts>',
      '<math>' +
      '<mmultiscripts type="empty" role="unknown" id="0"/>' +
      '</math>'
  );
  // Rewrite!
  this.executeMathmlTest(
      '<mmultiscripts><none/><mprescripts/><none/></mmultiscripts>',
      '<math>' +
      '<mmultiscripts type="empty" role="unknown" id="0"/>' +
      '</math>'
  );
  // Rewrite!
  this.executeMathmlTest(
      '<mmultiscripts><none/><none/><mprescripts/><none/></mmultiscripts>',
      '<math>' +
      '<mmultiscripts type="empty" role="unknown" id="0"/>' +
      '</math>'
  );
  // Rewrite!
  this.executeMathmlTest(
      '<mmultiscripts><none/><none/><none/>' +
      '<mprescripts/><none/></mmultiscripts>',
      '<math>' +
      '<mmultiscripts type="empty" role="unknown" id="0"/>' +
      '</math>'
  );
  // Rewrite!
  this.executeMathmlTest(
      '<mmultiscripts><none/><none/><none/><mprescripts/>' +
      '<none/><mpadded/></mmultiscripts>',
      '<math>' +
      '<mmultiscripts type="empty" role="unknown" id="0"/>' +
      '</math>'
  );
};


/**
 * Pathological multiscript expressions that are just the base element.
 */
sre.SemanticMathmlTest.prototype.testMathmlBaseTensors = function() {
  this.executeMathmlTest(
      '<mmultiscripts><mi>X</mi></mmultiscripts>',
      '<math>' +
      '<mmultiscripts type="identifier" role="latinletter" id="0"/>' +
      '</math>'
  );
  // Rewrite!
  this.executeMathmlTest(
      '<mmultiscripts><mi>X</mi><none/></mmultiscripts>',
      '<math>' +
      '<mmultiscripts type="identifier" role="latinletter" id="0"/>' +
      '</math>'
  );
  // Rewrite!
  this.executeMathmlTest(
      '<mmultiscripts><mi>X</mi><none/><mprescripts/></mmultiscripts>',
      '<math>' +
      '<mmultiscripts type="identifier" role="latinletter" id="0"/>' +
      '</math>'
  );
  // Rewrite!
  this.executeMathmlTest(
      '<mmultiscripts><mi>X</mi><none/><mprescripts/><none/></mmultiscripts>',
      '<math>' +
      '<mmultiscripts type="identifier" role="latinletter" id="0"/>' +
      '</math>'
  );
  // Rewrite!
  this.executeMathmlTest(
      '<mmultiscripts><mi>X</mi><none/><none/><none/><mprescripts/><none/>' +
      '</mmultiscripts>',
      '<math>' +
      '<mmultiscripts type="identifier" role="latinletter" id="0"/>' +
      '</math>'
  );
  // Rewrite!
  this.executeMathmlTest(
      '<mmultiscripts><mrow><mi>X</mi><mo>+</mo><mi>Y</mi></mrow>' +
      '<none/><mpadded/></mmultiscripts>',
      '<math>' +
      '<mmultiscripts type="infixop" role="addition" id="3" children="0,2"' +
      ' content="1">' +
      '<mi type="identifier" role="latinletter" id="0" parent="3">X</mi>' +
      '<mo type="operator" role="addition" id="1" parent="3"' +
      ' operator="infixop,+">+</mo>' +
      '<mi type="identifier" role="latinletter" id="2" parent="3">Y</mi>' +
      '</mmultiscripts>' +
      '</math>'
  );
};


/**
 * Pathological multiscript expressions that are actually on right
 * sub/superscripts.
 */
sre.SemanticMathmlTest.prototype.testMathmlRightScriptTensors = function() {
  this.executeMathmlTest(
      '<mmultiscripts><mi>X</mi><mi>i</mi></mmultiscripts>',
      '<math>' +
      '<mmultiscripts type="subscript" role="latinletter" id="2"' +
      ' children="0,1">' +
      '<mi type="identifier" role="latinletter" id="0" parent="2">X</mi>' +
      '<mi type="identifier" role="latinletter" id="1" parent="2">i</mi>' +
      '</mmultiscripts>' +
      '</math>'
  );
  // Rewrite!
  this.executeMathmlTest(
      '<mmultiscripts><mi>X</mi><mi>i</mi><none/></mmultiscripts>',
      '<math>' +
      '<mmultiscripts type="subscript" role="latinletter" id="2"' +
      ' children="0,1">' +
      '<mi type="identifier" role="latinletter" id="0" parent="2">X</mi>' +
      '<mi type="identifier" role="latinletter" id="1" parent="2">i</mi>' +
      '</mmultiscripts>' +
      '</math>'
  );
  // Rewrite!
  this.executeMathmlTest(
      '<mmultiscripts><mi>X</mi><none/><mi>i</mi></mmultiscripts>',
      '<math>' +
      '<mmultiscripts type="superscript" role="latinletter" id="2"' +
      ' children="0,1">' +
      '<mi type="identifier" role="latinletter" id="0" parent="2">X</mi>' +
      '<mi type="identifier" role="latinletter" id="1" parent="2">i</mi>' +
      '</mmultiscripts>' +
      '</math>'
  );
  // Rewrite!
  this.executeMathmlTest(
      '<mmultiscripts><mi>X</mi><mi>i</mi><mi>j</mi></mmultiscripts>',
      '<math>' +
      '<mmultiscripts type="superscript" role="latinletter" id="4"' +
      ' children="3,2">' +
      '<mrow type="subscript" role="subsup" id="3" children="0,1" parent="4">' +
      '<mi type="identifier" role="latinletter" id="0" parent="3">X</mi>' +
      '<mi type="identifier" role="latinletter" id="1" parent="3">i</mi>' +
      '</mrow>' +
      '<mi type="identifier" role="latinletter" id="2" parent="4">j</mi>' +
      '</mmultiscripts>' +
      '</math>'
  );
  // Rewrite!
  this.executeMathmlTest(
      '<mmultiscripts><mi>X</mi><mi>i</mi><mi>j</mi>' +
      '<mprescripts/><none/></mmultiscripts>',
      '<math>' +
      '<mmultiscripts type="superscript" role="latinletter" id="4"' +
      ' children="3,2">' +
      '<mrow type="subscript" role="subsup" id="3" children="0,1" parent="4">' +
      '<mi type="identifier" role="latinletter" id="0" parent="3">X</mi>' +
      '<mi type="identifier" role="latinletter" id="1" parent="3">i</mi>' +
      '</mrow>' +
      '<mi type="identifier" role="latinletter" id="2" parent="4">j</mi>' +
      '</mmultiscripts>' +
      '</math>'
  );
  // Rewrite!
  // this.executeMathmlTest(
  //     '<mmultiscripts><mi>X</mi><mi>i</mi><mi>j</mi><mi>k</mi><mi>l</mi>' +
  //     '<mprescripts/><none/></mmultiscripts>',
  //     '<math>' +
  //     '<mmultiscripts type="superscript" role="latinletter" id="10"' +
  //     ' children="9,8">' +
  //     '<mrow type="subscript" role="subsup" id="9" children="0,4"' +
  //     ' parent="10">' +
  //     '<mi type="identifier" role="latinletter" id="0" parent="9">X</mi>' +
  //     '<mrow type="infixop" role="implicit" id="4" children="1,2"' +
  //     ' content="3" parent="9">' +
  //     '<mi type="identifier" role="latinletter" id="1" parent="4">i</mi>' +
  //     '<mo type="operator" role="multiplication" id="3" parent="4"' +
  //     ' added="true" operator="infixop,⁢">⁢</mo>' +
  //     '<mi type="identifier" role="latinletter" id="2" parent="4">k</mi>' +
  //     '</mrow>' +
  //     '</mrow>' +
  //     '<mrow type="infixop" role="implicit" id="8" children="5,6"' +
  //     ' content="7" parent="10">' +
  //     '<mi type="identifier" role="latinletter" id="5" parent="8">j</mi>' +
  //     '<mo type="operator" role="multiplication" id="7" parent="8"' +
  //     ' added="true" operator="infixop,⁢">⁢</mo>' +
  //     '<mi type="identifier" role="latinletter" id="6" parent="8">l</mi>' +
  //     '</mrow>' +
  //     '</mmultiscripts>' +
  //     '</math>'
  // );
};


/**
 * Simple multiscript expressions with some scripts on the left.
 */
sre.SemanticMathmlTest.prototype.testMathmlSimpleTensors = function() {
  this.executeMathmlTest(
      '<mmultiscripts><mi>A</mi><mn>1</mn><mn>2</mn><mprescripts/>' +
      '<mn>3</mn><mn>4</mn></mmultiscripts>',
      '<math>' +
      '<mmultiscripts type="tensor" role="unknown" id="5" children="1,2,3,4">' +
      '<mi type="identifier" role="latinletter" id="0" parent="5">A</mi>' +
      '<mn type="number" role="rightsub" id="3" parent="5">1</mn>' +
      '<mn type="number" role="rightsuper" id="4" parent="5">2</mn>' +
      '<mprescripts/>' +
      '<mn type="number" role="leftsub" id="1" parent="5">3</mn>' +
      '<mn type="number" role="leftsuper" id="2" parent="5">4</mn>' +
      '</mmultiscripts>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<mmultiscripts><mi>A</mi><mn>1</mn><none/><mprescripts/>' +
      '<mn>3</mn><mn>4</mn></mmultiscripts>',
      '<math>' +
      '<mmultiscripts type="tensor" role="unknown" id="5" children="1,2,3,4">' +
      '<mi type="identifier" role="latinletter" id="0" parent="5">A</mi>' +
      '<mn type="number" role="rightsub" id="3" parent="5">1</mn>' +
      '<none type="empty" role="rightsuper" id="4" parent="5"/>' +
      '<mprescripts/>' +
      '<mn type="number" role="leftsub" id="1" parent="5">3</mn>' +
      '<mn type="number" role="leftsuper" id="2" parent="5">4</mn>' +
      '</mmultiscripts>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<mmultiscripts><mi>A</mi><mn>1</mn><mprescripts/>' +
      '<mn>3</mn><mn>4</mn></mmultiscripts>',
      '<math>' +
      '<mmultiscripts type="tensor" role="unknown" id="5" children="1,2,3,4">' +
      '<mi type="identifier" role="latinletter" id="0" parent="5">A</mi>' +
      '<mn type="number" role="rightsub" id="3" parent="5">1</mn>' +
      '<none type="empty" role="rightsuper" id="4" parent="5" added="true"/>' +
      '<mprescripts/>' +
      '<mn type="number" role="leftsub" id="1" parent="5">3</mn>' +
      '<mn type="number" role="leftsuper" id="2" parent="5">4</mn>' +
      '</mmultiscripts>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<mmultiscripts><mi>A</mi><none/><mn>2</mn><mprescripts/>' +
      '<mn>3</mn><mn>4</mn></mmultiscripts>',
      '<math>' +
      '<mmultiscripts type="tensor" role="unknown" id="5" children="1,2,3,4">' +
      '<mi type="identifier" role="latinletter" id="0" parent="5">A</mi>' +
      '<none type="empty" role="rightsub" id="3" parent="5"/>' +
      '<mn type="number" role="rightsuper" id="4" parent="5">2</mn>' +
      '<mprescripts/>' +
      '<mn type="number" role="leftsub" id="1" parent="5">3</mn>' +
      '<mn type="number" role="leftsuper" id="2" parent="5">4</mn>' +
      '</mmultiscripts>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<mmultiscripts><mi>A</mi><none/><none/><mprescripts/>' +
      '<mn>3</mn><mn>4</mn></mmultiscripts>',
      '<math>' +
      '<mmultiscripts type="tensor" role="unknown" id="5" children="1,2,3,4">' +
      '<mi type="identifier" role="latinletter" id="0" parent="5">A</mi>' +
      '<none type="empty" role="rightsub" id="3" parent="5"/>' +
      '<none type="empty" role="rightsuper" id="4" parent="5"/>' +
      '<mprescripts/>' +
      '<mn type="number" role="leftsub" id="1" parent="5">3</mn>' +
      '<mn type="number" role="leftsuper" id="2" parent="5">4</mn>' +
      '</mmultiscripts>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<mmultiscripts><mi>A</mi><mpadded/><mprescripts/>' +
      '<mn>3</mn><mn>4</mn></mmultiscripts>',
      '<math>' +
      '<mmultiscripts type="tensor" role="unknown" id="5" children="1,2,3,4">' +
      '<mi type="identifier" role="latinletter" id="0" parent="5">A</mi>' +
      '<mpadded type="empty" role="rightsub" id="3" parent="5"/>' +
      '<none type="empty" role="rightsuper" id="4" parent="5" added="true"/>' +
      '<mprescripts/>' +
      '<mn type="number" role="leftsub" id="1" parent="5">3</mn>' +
      '<mn type="number" role="leftsuper" id="2" parent="5">4</mn>' +
      '</mmultiscripts>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<mmultiscripts><mi>A</mi><mprescripts/>' +
      '<mn>3</mn><mn>4</mn></mmultiscripts>',
      '<math>' +
      '<mmultiscripts type="tensor" role="unknown" id="5" children="1,2,3,4">' +
      '<mi type="identifier" role="latinletter" id="0" parent="5">A</mi>' +
      '<none type="empty" role="rightsub" id="3" parent="5" added="true"/>' +
      '<none type="empty" role="rightsuper" id="4" parent="5" added="true"/>' +
      '<mprescripts/>' +
      '<mn type="number" role="leftsub" id="1" parent="5">3</mn>' +
      '<mn type="number" role="leftsuper" id="2" parent="5">4</mn>' +
      '</mmultiscripts>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<mmultiscripts><mi>A</mi><mprescripts/>' +
      '<mn>3</mn></mmultiscripts>',
      '<math>' +
      '<mmultiscripts type="tensor" role="unknown" id="5" children="1,2,3,4">' +
      '<mi type="identifier" role="latinletter" id="0" parent="5">A</mi>' +
      '<none type="empty" role="rightsub" id="3" parent="5" added="true"/>' +
      '<none type="empty" role="rightsuper" id="4" parent="5" added="true"/>' +
      '<mprescripts/>' +
      '<mn type="number" role="leftsub" id="1" parent="5">3</mn>' +
      '<none type="empty" role="leftsuper" id="2" parent="5" added="true"/>' +
      '</mmultiscripts>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<mmultiscripts><mi>A</mi><mprescripts/>' +
      '<none/><mn>4</mn></mmultiscripts>',
      '<math>' +
      '<mmultiscripts type="tensor" role="unknown" id="5" children="1,2,3,4">' +
      '<mi type="identifier" role="latinletter" id="0" parent="5">A</mi>' +
      '<none type="empty" role="rightsub" id="3" parent="5" added="true"/>' +
      '<none type="empty" role="rightsuper" id="4" parent="5" added="true"/>' +
      '<mprescripts/>' +
      '<none type="empty" role="leftsub" id="1" parent="5"/>' +
      '<mn type="number" role="leftsuper" id="2" parent="5">4</mn>' +
      '</mmultiscripts>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<mmultiscripts><mi>A</mi><mn>1</mn><mprescripts/>' +
      '<none/><mn>4</mn></mmultiscripts>',
      '<math>' +
      '<mmultiscripts type="tensor" role="unknown" id="5" children="1,2,3,4">' +
      '<mi type="identifier" role="latinletter" id="0" parent="5">A</mi>' +
      '<mn type="number" role="rightsub" id="3" parent="5">1</mn>' +
      '<none type="empty" role="rightsuper" id="4" parent="5" added="true"/>' +
      '<mprescripts/>' +
      '<none type="empty" role="leftsub" id="1" parent="5"/>' +
      '<mn type="number" role="leftsuper" id="2" parent="5">4</mn>' +
      '</mmultiscripts>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<mmultiscripts><mi>A</mi><none/><mn>2</mn><mprescripts/>' +
      '<mn>3</mn></mmultiscripts>',
      '<math>' +
      '<mmultiscripts type="tensor" role="unknown" id="5" children="1,2,3,4">' +
      '<mi type="identifier" role="latinletter" id="0" parent="5">A</mi>' +
      '<none type="empty" role="rightsub" id="3" parent="5"/>' +
      '<mn type="number" role="rightsuper" id="4" parent="5">2</mn>' +
      '<mprescripts/>' +
      '<mn type="number" role="leftsub" id="1" parent="5">3</mn>' +
      '<none type="empty" role="leftsuper" id="2" parent="5" added="true"/>' +
      '</mmultiscripts>' +
      '</math>'
  );
};


/**
 * Complex multiscript expressions with some scripts on the left.
 */
sre.SemanticMathmlTest.prototype.testMathmlComplexTensors = function() {
  this.executeMathmlTest(
      '<mmultiscripts><mi>A</mi><mn>3</mn><mn>4</mn><mi>k</mi><mi>l</mi>' +
      '<mprescripts/><mn>1</mn><mn>2</mn><mi>i</mi><mi>j</mi></mmultiscripts>',
      '<math>' +
      '<mmultiscripts type="tensor" role="unknown" id="17"' +
      ' children="1,2,5,6,9,10,13,14" collapsed="(17 (4 1 2) (8 5 6) (12 9' +
      ' 10) (16 13 14))">' +
      '<mi type="identifier" role="latinletter" id="0" parent="17">A</mi>' +
      '<mn type="number" role="rightsub" id="9" parent="17">3</mn>' +
      '<mn type="number" role="rightsuper" id="13" parent="17">4</mn>' +
      '<mi type="identifier" role="rightsub" id="10" parent="17">k</mi>' +
      '<mi type="identifier" role="rightsuper" id="14" parent="17">l</mi>' +
      '<mprescripts/>' +
      '<mn type="number" role="leftsub" id="1" parent="17">1</mn>' +
      '<mn type="number" role="leftsuper" id="5" parent="17">2</mn>' +
      '<mi type="identifier" role="leftsub" id="2" parent="17">i</mi>' +
      '<mi type="identifier" role="leftsuper" id="6" parent="17">j</mi>' +
      '</mmultiscripts>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<mmultiscripts><mi>A</mi><mn>3</mn><none/><mi>k</mi><mi>l</mi>' +
      '<mprescripts/><mn>1</mn><none/><none/><mi>j</mi></mmultiscripts>',
      '<math>' +
      '<mmultiscripts type="tensor" role="unknown" id="17"' +
      ' children="1,2,5,6,9,10,13,14" collapsed="(17 (4 1 2) (8 5 6) (12 9' +
      ' 10) (16 13 14))">' +
      '<mi type="identifier" role="latinletter" id="0" parent="17">A</mi>' +
      '<mn type="number" role="rightsub" id="9" parent="17">3</mn>' +
      '<none type="empty" role="rightsuper" id="13" parent="17"/>' +
      '<mi type="identifier" role="rightsub" id="10" parent="17">k</mi>' +
      '<mi type="identifier" role="rightsuper" id="14" parent="17">l</mi>' +
      '<mprescripts/>' +
      '<mn type="number" role="leftsub" id="1" parent="17">1</mn>' +
      '<none type="empty" role="leftsuper" id="5" parent="17"/>' +
      '<none type="empty" role="leftsub" id="2" parent="17"/>' +
      '<mi type="identifier" role="leftsuper" id="6" parent="17">j</mi>' +
      '</mmultiscripts>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<mmultiscripts><mi>A</mi><mn>1</mn><mn>2</mn><mn>3</mn><mprescripts/>' +
      '<mn>4</mn></mmultiscripts>',
      '<math>' +
      '<mmultiscripts type="tensor" role="unknown" id="8"' +
      ' children="1,2,3,4,7" collapsed="(8 1 2 (6 3 4) 7)">' +
      '<mi type="identifier" role="latinletter" id="0" parent="8">A</mi>' +
      '<mn type="number" role="rightsub" id="3" parent="8">1</mn>' +
      '<mn type="number" role="rightsuper" id="7" parent="8">2</mn>' +
      '<mn type="number" role="rightsub" id="4" parent="8">3</mn>' +
      '<mprescripts/>' +
      '<mn type="number" role="leftsub" id="1" parent="8">4</mn>' +
      '<none type="empty" role="leftsuper" id="2" parent="8" added="true"/>' +
      '</mmultiscripts>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<mmultiscripts><mi>A</mi><mn>1</mn><mn>2</mn><mn>3</mn><mprescripts/>' +
      '<mn>5</mn><mn>4</mn><mn>6</mn></mmultiscripts>',
      '<math>' +
      '<mmultiscripts type="tensor" role="unknown" id="11"' +
      ' children="1,2,5,6,7,10" collapsed="(11 (4 1 2) 5 (9 6 7) 10)">' +
      '<mi type="identifier" role="latinletter" id="0" parent="11">A</mi>' +
      '<mn type="number" role="rightsub" id="6" parent="11">1</mn>' +
      '<mn type="number" role="rightsuper" id="10" parent="11">2</mn>' +
      '<mn type="number" role="rightsub" id="7" parent="11">3</mn>' +
      '<mprescripts/>' +
      '<mn type="number" role="leftsub" id="1" parent="11">5</mn>' +
      '<mn type="number" role="leftsuper" id="5" parent="11">4</mn>' +
      '<mn type="number" role="leftsub" id="2" parent="11">6</mn>' +
      '</mmultiscripts>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<mmultiscripts><mrow><mi>X</mi><mo>+</mo><mi>Y</mi></mrow>' +
      '<mn>1</mn><mn>2</mn><mprescripts/><none/><mn>3</mn></mmultiscripts>',
      '<math>' +
      '<mmultiscripts type="tensor" role="unknown" id="8" children="4,5,6,7">' +
      '<mrow type="infixop" role="addition" id="3" children="0,2"' +
      ' content="1" parent="8">' +
      '<mi type="identifier" role="latinletter" id="0" parent="3">X</mi>' +
      '<mo type="operator" role="addition" id="1" parent="3"' +
      '' +
      ' operator="infixop,+">+</mo>' +
      '<mi type="identifier" role="latinletter" id="2" parent="3">Y</mi>' +
      '</mrow>' +
      '<mn type="number" role="rightsub" id="6" parent="8">1</mn>' +
      '<mn type="number" role="rightsuper" id="7" parent="8">2</mn>' +
      '<mprescripts/>' +
      '<none type="empty" role="leftsub" id="4" parent="8"/>' +
      '<mn type="number" role="leftsuper" id="5" parent="8">3</mn>' +
      '</mmultiscripts>' +
      '</math>'
  );
};


// Expressions containing ignored tags.
/**
 * Expressions containing pseudo unit children, i.e., children whose only
 * siblings are ignored nodes.
 */
sre.SemanticMathmlTest.prototype.testMathmlPseudoUnitChildren = function() {
  this.executeMathmlTest(
      '<mi>i</mi><merror>Y</merror>',
      '<math>' +
      '<mi type="identifier" role="latinletter" id="0">i</mi>' +
      '<merror>Y</merror>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<mphantom>nix</mphantom><mi>i</mi><merror>Y</merror>',
      '<math>' +
      '<mphantom>nix</mphantom>' +
      '<mi type="identifier" role="latinletter" id="0">i</mi>' +
      '<merror>Y</merror>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<mrow><mphantom>nix</mphantom><mi>i</mi><merror>Y</merror></mrow>',
      '<math>' +
      '<mrow>' +
      '<mphantom>nix</mphantom>' +
      '<mi type="identifier" role="latinletter" id="0">i</mi>' +
      '<merror>Y</merror>' +
      '</mrow>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<mrow><mphantom>nix</mphantom><mi>i</mi><merror>Y</merror></mrow>' +
      '<merror>nothing</merror>',
      '<math>' +
      '<mrow>' +
      '<mphantom>nix</mphantom>' +
      '<mi type="identifier" role="latinletter" id="0">i</mi>' +
      '<merror>Y</merror>' +
      '</mrow>' +
      '<merror>nothing</merror>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<mrow><mphantom>nix</mphantom><mrow><mi>i</mi></mrow>' +
      '<merror>Y</merror></mrow><merror>nothing</merror>',
      '<math>' +
      '<mrow>' +
      '<mphantom>nix</mphantom>' +
      '<mrow>' +
      '<mi type="identifier" role="latinletter" id="0">i</mi>' +
      '</mrow>' +
      '<merror>Y</merror>' +
      '</mrow>' +
      '<merror>nothing</merror>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<mrow><mphantom>nix</mphantom><mrow><mi>i</mi><mi>j</mi></mrow>' +
      '<merror>Y</merror></mrow><merror>nothing</merror>',
      '<math>' +
      '<mrow>' +
      '<mphantom>nix</mphantom>' +
      '<mrow type="infixop" role="implicit" id="3" children="0,1"' +
      ' content="2">' +
      '<mi type="identifier" role="latinletter" id="0" parent="3">i</mi>' +
      '<mo type="operator" role="multiplication" id="2" parent="3"' +
      ' added="true" operator="infixop,⁢">⁢</mo>' +
      '<mi type="identifier" role="latinletter" id="1" parent="3">j</mi>' +
      '</mrow>' +
      '<merror>Y</merror>' +
      '</mrow>' +
      '<merror>nothing</merror>' +
      '</math>'
  );
};


/**
 * Expressions with ignore tags, introducing a new mrow.
 */
sre.SemanticMathmlTest.prototype.testMathmlInterspersedIgnore = function() {
  this.executeMathmlTest(
      '<mphantom>nix</mphantom><mi>i</mi><mi>j</mi><merror>Y</merror>',
      '<math>' +
      '<mphantom>nix</mphantom>' +
      '<mrow type="infixop" role="implicit" id="3" children="0,1"' +
      ' content="2">' +
      '<mi type="identifier" role="latinletter" id="0" parent="3">i</mi>' +
      '<mo type="operator" role="multiplication" id="2" parent="3"' +
      ' added="true" operator="infixop,⁢">⁢</mo>' +
      '<mi type="identifier" role="latinletter" id="1" parent="3">j</mi>' +
      '</mrow>' +
      '<merror>Y</merror>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<mphantom>nix</mphantom><mi>i</mi><mo>',
      '<math>' +
      '<mphantom>nix</mphantom>' +
      '<mrow type="infixop" role="addition" id="3" children="0,2"' +
      ' content="1">' +
      '<mi type="identifier" role="latinletter" id="0" parent="3">i</mi>' +
      '<mo type="operator" role="addition" id="1" parent="3"' +
      ' operator="infixop,+">+</mo>' +
      '<mi type="identifier" role="latinletter" id="2" parent="3">j</mi>' +
      '</mrow>' +
      '<merror>Y</merror>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<mi>i</mi><merror>nothing</merror><mo>+</mo><mi>j</mi>',
      '<math type="infixop" role="addition" id="3" children="0,2"' +
      ' content="1">' +
      '<mi type="identifier" role="latinletter" id="0" parent="3">i</mi>' +
      '<merror>nothing</merror>' +
      '<mo type="operator" role="addition" id="1" parent="3"' +
      ' operator="infixop,+">+</mo>' +
      '<mi type="identifier" role="latinletter" id="2" parent="3">j</mi>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<mi>i</mi><merror>nothing</merror><mi>j</mi>',
      '<math type="infixop" role="implicit" id="3" children="0,1"' +
      ' content="2">' +
      '<mi type="identifier" role="latinletter" id="0" parent="3">i</mi>' +
      '<mo type="operator" role="multiplication" id="2" parent="3"' +
      ' added="true" operator="infixop,⁢">⁢</mo>' +
      '<mi type="identifier" role="latinletter" id="1" parent="3">j</mi>' +
      '</math>'
  );
  this.executeMathmlTest(
      '<mphantom>nix</mphantom><mi>i</mi><merror>nothing</merror><mo>+</mo>' +
      '<mi>j</mi><merror>Y</merror>',
      '<math>' +
      '<mphantom>nix</mphantom>' +
      '<mrow type="infixop" role="addition" id="3" children="0,2"' +
      ' content="1">' +
      '<mi type="identifier" role="latinletter" id="0" parent="3">i</mi>' +
      '<mo type="operator" role="addition" id="1" parent="3"' +
      ' operator="infixop,+">+</mo>' +
      '<mi type="identifier" role="latinletter" id="2" parent="3">j</mi>' +
      '</mrow>' +
      '<merror>nothing</merror>' +
      '<merror>Y</merror>' +
      '</math>'
  );
};

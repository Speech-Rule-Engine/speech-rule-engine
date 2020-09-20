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

goog.provide('sre.EnrichMathmlTest');
goog.provide('sre.EnrichSpeechTest');
goog.provide('sre.RebuildStreeTest');
goog.provide('sre.SemanticTest');
goog.provide('sre.SemanticTreeTest');

goog.require('sre.AbstractExamples');
goog.require('sre.DomUtil');
goog.require('sre.Engine');
goog.require('sre.Enrich');
goog.require('sre.RebuildStree');
goog.require('sre.SemanticAttr');
goog.require('sre.SemanticTree');
goog.require('sre.SemanticUtil');
goog.require('sre.System');
goog.require('sre.SystemExternal');
goog.require('sre.TestUtil');
goog.require('sre.WalkerUtil');



/**
 * Base class for all the semantic tree related tests.
 * @constructor
 * @extends {sre.AbstractExamples}
 * @param {string} tests The json file with expected output and tests.
 * @param {string} base The file with basic tests.
 */
sre.SemanticTest = function(tests, base) {
  sre.SemanticTest.base(this, 'constructor', tests, base);
};
goog.inherits(sre.SemanticTest, sre.AbstractExamples);


sre.SemanticTest.prototype.prepare = function() {
  sre.SemanticTest.base(this, 'prepare');
  let [tests, warn] = sre.TestUtil.combineTests(
    this.baseTests.tests || {},
    this.jsonTests.tests || {},
    this.jsonTests.exclude || []
  );
  this.inputTests = tests;
  if (warn.length) {
    throw new sre.TestUtil.Error('Missing Results', warn);
  }
};


/**
 * @override
 */
sre.SemanticTest.prototype.method = function(var_args) {
  let args = Array.prototype.slice.call(arguments, 0);
  this.executeTest(args[0], args[1]);
};


/**
 * Executes a single test. This is called by the method.
 * @param {string} input The input element.
 * @param {string} expected The expected output.
 */
sre.SemanticTest.prototype.executeTest = goog.abstractMethod;

//
// Rebuild Tests
// 
// Testcases for reconstructing semantic trees from enriched mathml.
//

/**
 * @constructor
 * @extends {sre.SemanticTest}
 */
sre.RebuildStreeTest = function(tests, base) {
  sre.RebuildStreeTest.base(this, 'constructor', tests, base);
  this.pickFields = ['input'];
};
goog.inherits(sre.RebuildStreeTest, sre.SemanticTest);


/**
 * Tests if for a given mathml snippet results in a particular semantic tree.
 * @param {string} expr MathML expression.
 */
sre.RebuildStreeTest.prototype.executeTest = function(expr) {
  var mathMl = sre.Enrich.prepareMmlString(expr);
  var mml = sre.DomUtil.parseInput(mathMl);
  var stree = new sre.SemanticTree(mml);
  var emml = sre.EnrichMathml.enrich(mml, stree);
  var reass = (new sre.RebuildStree(emml)).getTree();
  this.assert.equal(stree.toString(), reass.toString());
};



//
// Enriched Speech Tests
// 
// Testcases for reconstructing semantic trees from enriched mathml.
//

/**
 * @constructor
 * @extends {sre.SemanticTest}
 */
sre.EnrichSpeechTest = function(tests, base) {
  sre.EnrichSpeechTest.base(this, 'constructor', tests, base);
  this.pickFields = ['input'];
};
goog.inherits(sre.EnrichSpeechTest, sre.SemanticTest);


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
 * @override
 */
sre.EnrichSpeechTest.prototype.executeTest = function(expr) {
  var mml = sre.Enrich.prepareMmlString(expr);
  var sysSpeech = sre.System.getInstance().toSpeech(mml);
  var enr = sre.WalkerUtil.getSemanticRoot(
      sre.System.getInstance().toEnriched(mml));
  var enrSpeech = enr.getAttribute(sre.EnrichMathml.Attribute.SPEECH);
  this.assert.equal(sysSpeech, enrSpeech);
};


//
// Semantic Tree Tests
//

/**
 * @constructor
 * @extends {sre.SemanticTest}
 */
sre.SemanticTreeTest = function(tests, base) {
  sre.SemanticTreeTest.base(this, 'constructor', tests, base);

  /**
   * @type {Object.<sre.SemanticAnnotator>}
   */
  this.annotations = null;

  /**
   * @type {Object.<sre.SemanticVisitor>}
   */
  this.visitors = null;

  this.pickFields.push('brief');

};
goog.inherits(sre.SemanticTreeTest, sre.SemanticTest);


/**
 * @override
 */
sre.SemanticTreeTest.prototype.setUpTest = function() {
  // this.xpathBlacklist = [];
  this.annotations = sre.SemanticAnnotations.getInstance().annotators;
  this.visitors = sre.SemanticAnnotations.getInstance().visitors;
  sre.SemanticAnnotations.getInstance().annotators = {};
  sre.SemanticAnnotations.getInstance().visitors = {};
  sre.SemanticTreeTest.setupAttributes();
};


/**
 * @override
 */
sre.SemanticTreeTest.prototype.tearDownTest = function() {
  sre.SemanticAnnotations.getInstance().annotators = this.annotations;
  sre.SemanticAnnotations.getInstance().visitors = this.visitors;
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
 * @override
 */
sre.SemanticTreeTest.prototype.method = function(var_args) {
  let args = Array.prototype.slice.call(arguments, 0);
  this.executeTest(args[0], args[1], args[2]);
};


/**
 * Tests if for a given mathml snippet results in a particular semantic tree.
 * @param {string} mml MathML expression.
 * @param {string} sml XML snippet for the semantic tree.
 * @param {boolean=} opt_brief Brief XML output.
 */
sre.SemanticTreeTest.prototype.executeTest = function(mml, sml, opt_brief) {
  var mathMl = '<math xmlns="http://www.w3.org/1998/Math/MathML">' +
          mml + '</math>';
  var node = sre.DomUtil.parseInput(mathMl);
  var sxml = new sre.SemanticTree(node).xml(opt_brief);
  var dp = new sre.SystemExternal.xmldom.DOMParser();
  var xml = dp.parseFromString('<stree>' + sml + '</stree>', 'text/xml');
  var xmls = new sre.SystemExternal.xmldom.XMLSerializer();
  this.assert.equal(xmls.serializeToString(sxml), xmls.serializeToString(xml));
};



/**
 * @constructor
 * @extends {sre.SemanticTest}
 */
sre.EnrichMathmlTest = function(tests, base) {
  sre.EnrichMathmlTest.base(this, 'constructor', tests, base);
  this.attrBlacklist = [];
  this.setActive('EnrichExamples', 'js');
};
goog.inherits(sre.EnrichMathmlTest, sre.SemanticTest);


/**
 * @override
 */
sre.EnrichMathmlTest.prototype.setUpTest = function() {
  // Make sure the engine is in a default mode.
  this.attrBlacklist = [
    'data-semantic-annotation',
    'data-semantic-font',
    'data-semantic-embellished',
    'data-semantic-fencepointer',
    'data-semantic-structure'
  ];
  sre.EnrichMathmlTest.base(this, 'setUpTest');
};


/**
 * Tests if for a given mathml snippet results in a particular semantic tree.
 * @param {string} mml MathML expression.
 * @param {string} smml MathML snippet for the semantic information.
 */
sre.EnrichMathmlTest.prototype.executeTest = function(mml, smml) {
  var mathMl = sre.Enrich.prepareMmlString(mml);
  var node = sre.Enrich.semanticMathmlSync(mathMl);
  var dp = new sre.SystemExternal.xmldom.DOMParser();
  var xml = smml ? dp.parseFromString(smml) : '';
  var xmls = new sre.SystemExternal.xmldom.XMLSerializer();
  this.customizeXml(node);
  this.appendExamples('', mml);
  var cleaned = sre.EnrichMathml.removeAttributePrefix(
      xmls.serializeToString(node));
  this.assert.equal(cleaned, xmls.serializeToString(xml));
};


/**
 * Removes XML nodes according to the XPath elements in the blacklist.
 * @param {!Node} xml Xml representation of the semantic node.
 */
sre.EnrichMathmlTest.prototype.customizeXml = function(xml) {
  this.attrBlacklist.forEach(
      function(attr) {
        xml.removeAttribute(attr);
        var removes = sre.DomUtil.querySelectorAllByAttr(xml, attr);
        if (xml.hasAttribute(attr)) {
          removes.push(xml);
        }
        removes.forEach(
            function(node) {
              node.removeAttribute(attr);
            });
      });
};


// Putting it all together! 
sre.SemanticTest.tests = function() {
  let base = './json/base/semantic.json';
  return [
    new sre.RebuildStreeTest('./base/rebuild_stree_test.json', base),
    new sre.EnrichSpeechTest('./base/enrich_speech_test.json', base),
    new sre.SemanticTreeTest('./base/semantic_tree_test.json', base),
    new sre.EnrichMathmlTest('./base/enrich_mathml_test.json', base)
  ];
};

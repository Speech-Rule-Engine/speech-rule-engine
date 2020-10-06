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

goog.provide('sretest.EnrichMathmlTest');
goog.provide('sretest.EnrichSpeechTest');
goog.provide('sretest.RebuildStreeTest');
goog.provide('sretest.SemanticTest');
goog.provide('sretest.SemanticTreeTest');

goog.require('sretest.AbstractExamples');
goog.require('sretest.TestExternal');



/**
 * Base class for all the semantic tree related tests.
 * @constructor
 * @extends {sretest.AbstractExamples}
 */
sretest.SemanticTest = function() {
  sretest.SemanticTest.base(this, 'constructor');
};
goog.inherits(sretest.SemanticTest, sretest.AbstractExamples);


/**
 * @override
 */
sretest.SemanticTest.prototype.method = function(var_args) {
  let args = Array.prototype.slice.call(arguments, 0);
  this.executeTest(args[0], args[1]);
};


/**
 * Executes a single test. This is called by the method.
 * @param {string} input The input element.
 * @param {string} expected The expected output.
 */
sretest.SemanticTest.prototype.executeTest = goog.abstractMethod;



/**
 * Testcases for reconstructing semantic trees from enriched mathml.
 * @constructor
 * @extends {sretest.SemanticTest}
 */
sretest.RebuildStreeTest = function() {
  sretest.RebuildStreeTest.base(this, 'constructor');

  /**
   * @override
   */
  this.pickFields = ['input'];
};
goog.inherits(sretest.RebuildStreeTest, sretest.SemanticTest);


/**
 * Tests if for a given mathml snippet results in a particular semantic tree.
 * @param {string} expr MathML expression.
 */
sretest.RebuildStreeTest.prototype.executeTest = function(expr) {
  var mathMl = sretest.TestExternal.sre.Enrich.prepareMmlString(expr);
  var mml = sretest.TestExternal.sre.DomUtil.parseInput(mathMl);
  var stree = new sretest.TestExternal.sre.SemanticTree(mml);
  var emml = sretest.TestExternal.sre.EnrichMathml.enrich(mml, stree);
  var reass = (new sretest.TestExternal.sre.RebuildStree(emml)).getTree();
  this.assert.equal(stree.toString(), reass.toString());
};



/**
 * Enriched Speech Tests
 * @constructor
 * @extends {sretest.SemanticTest}
 */
sretest.EnrichSpeechTest = function() {
  sretest.EnrichSpeechTest.base(this, 'constructor');
  this.pickFields = ['input'];
};
goog.inherits(sretest.EnrichSpeechTest, sretest.SemanticTest);


/**
 * @override
 */
sretest.EnrichSpeechTest.prototype.setUpTest = function() {
  sretest.EnrichSpeechTest.base(this, 'setUpTest');
  sretest.TestExternal.sre.System.getInstance().setupEngine(
      {domain: 'mathspeak',
        style: 'default',
        speech: sretest.TestExternal.sre.Engine.Speech.SHALLOW
      });
};


/**
 * @override
 */
sretest.EnrichSpeechTest.prototype.tearDownTest = function() {
  sretest.TestExternal.sre.System.getInstance().setupEngine(
      {domain: 'default',
        style: 'default',
        speech: sretest.TestExternal.sre.Engine.Speech.NONE
      });
  sretest.EnrichSpeechTest.base(this, 'tearDownTest');
};


/**
 * Tests if speech strings computed directly for a MathML expression are
 * equivalent to those computed for enriched expressions.
 * @override
 */
sretest.EnrichSpeechTest.prototype.executeTest = function(expr) {
  var mml = sretest.TestExternal.sre.Enrich.prepareMmlString(expr);
  var sysSpeech = sretest.TestExternal.sre.System.getInstance().toSpeech(mml);
  var enr = sretest.TestExternal.sre.WalkerUtil.getSemanticRoot(
      sretest.TestExternal.sre.System.getInstance().toEnriched(mml));
  var enrSpeech = enr.getAttribute(sretest.TestExternal.sre.EnrichMathml.Attribute.SPEECH);
  this.assert.equal(sysSpeech, enrSpeech);
};



/**
 * Semantic Tree Tests
 * @constructor
 * @extends {sretest.SemanticTest}
 */
sretest.SemanticTreeTest = function() {
  sretest.SemanticTreeTest.base(this, 'constructor');

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
goog.inherits(sretest.SemanticTreeTest, sretest.SemanticTest);


/**
 * @override
 */
sretest.SemanticTreeTest.prototype.setUpTest = function() {
  sretest.SemanticTreeTest.base(this, 'setUpTest');
  this.annotations = sretest.TestExternal.sre.SemanticAnnotations.getInstance().annotators;
  this.visitors = sretest.TestExternal.sre.SemanticAnnotations.getInstance().visitors;
  sretest.TestExternal.sre.SemanticAnnotations.getInstance().annotators = {};
  sretest.TestExternal.sre.SemanticAnnotations.getInstance().visitors = {};
  sretest.SemanticTreeTest.setupAttributes();
};


/**
 * @override
 */
sretest.SemanticTreeTest.prototype.tearDownTest = function() {
  sretest.TestExternal.sre.SemanticAnnotations.getInstance().annotators = this.annotations;
  sretest.TestExternal.sre.SemanticAnnotations.getInstance().visitors = this.visitors;
  sretest.SemanticTreeTest.base(this, 'tearDownTest');
};


/**
 * Adds some unicode characters via hex code to the right category.
 *
 * This method is necessary as the test framework can not handle code containing
 * utf-8 encoded characters.
 */
sretest.SemanticTreeTest.setupAttributes = function() {
  var attr = sretest.TestExternal.sre.SemanticAttr.getInstance();
  attr.neutralFences.unshift(sretest.TestExternal.sre.SemanticUtil.numberToUnicode(0x00A6));
  attr.dashes.unshift(sretest.TestExternal.sre.SemanticUtil.numberToUnicode(0x2015));
  attr.neutralFences.unshift(sretest.TestExternal.sre.SemanticUtil.numberToUnicode(0x2016));
  attr.arrows.unshift(sretest.TestExternal.sre.SemanticUtil.numberToUnicode(0x2192));
  attr.sumOps.unshift(sretest.TestExternal.sre.SemanticUtil.numberToUnicode(0x2211));
  attr.additions.unshift(sretest.TestExternal.sre.SemanticUtil.numberToUnicode(0x2213));
  attr.multiplications.unshift(sretest.TestExternal.sre.SemanticUtil.numberToUnicode(0x2218));
  attr.intOps.unshift(sretest.TestExternal.sre.SemanticUtil.numberToUnicode(0x222B));
  attr.inequalities.unshift(sretest.TestExternal.sre.SemanticUtil.numberToUnicode(0x2264));
  attr.additions.unshift(sretest.TestExternal.sre.SemanticUtil.numberToUnicode(0x2295));
  var open = sretest.TestExternal.sre.SemanticUtil.numberToUnicode(0x3008);
  var close = sretest.TestExternal.sre.SemanticUtil.numberToUnicode(0x3009);
  attr.openClosePairs[open] = close;
  attr.leftFences.unshift(open);
  attr.rightFences.unshift(close);
};


/**
 * @override
 */
sretest.SemanticTreeTest.prototype.method = function(var_args) {
  let args = Array.prototype.slice.call(arguments, 0);
  this.executeTest(args[0], args[1], args[2]);
};


/**
 * Tests if for a given mathml snippet results in a particular semantic tree.
 * @param {string} mml MathML expression.
 * @param {string} sml XML snippet for the semantic tree.
 * @param {boolean=} opt_brief Brief XML output.
 */
sretest.SemanticTreeTest.prototype.executeTest = function(mml, sml, opt_brief) {
  var mathMl = '<math xmlns="http://www.w3.org/1998/Math/MathML">' +
          mml + '</math>';
  var node = sretest.TestExternal.sre.DomUtil.parseInput(mathMl);
  var sxml = new sretest.TestExternal.sre.SemanticTree(node).xml(opt_brief);
  var dp = new sretest.TestExternal.xmldom.DOMParser();
  var xml = dp.parseFromString('<stree>' + sml + '</stree>', 'text/xml');
  var xmls = new sretest.TestExternal.xmldom.XMLSerializer();
  this.assert.equal(xmls.serializeToString(sxml), xmls.serializeToString(xml));
};



/**
 * Tests for enriched MathML expressions.
 * @constructor
 * @extends {sretest.SemanticTest}
 */
sretest.EnrichMathmlTest = function() {
  sretest.EnrichMathmlTest.base(this, 'constructor');
  this.attrBlacklist = [];
  this.setActive('EnrichExamples', 'json');
};
goog.inherits(sretest.EnrichMathmlTest, sretest.SemanticTest);


/**
 * @override
 */
sretest.EnrichMathmlTest.prototype.setUpTest = function() {
  sretest.EnrichMathmlTest.base(this, 'setUpTest');
  this.attrBlacklist = [
    'data-semantic-annotation',
    'data-semantic-font',
    'data-semantic-embellished',
    'data-semantic-fencepointer',
    'data-semantic-structure'
  ];
};


/**
 * Tests if for a given mathml snippet results in a particular semantic tree.
 * @param {string} mml MathML expression.
 * @param {string} smml MathML snippet for the semantic information.
 */
sretest.EnrichMathmlTest.prototype.executeTest = function(mml, smml) {
  var mathMl = sretest.TestExternal.sre.Enrich.prepareMmlString(mml);
  var node = sretest.TestExternal.sre.Enrich.semanticMathmlSync(mathMl);
  var dp = new sretest.TestExternal.xmldom.DOMParser();
  var xml = smml ? dp.parseFromString(smml) : '';
  var xmls = new sretest.TestExternal.xmldom.XMLSerializer();
  this.customizeXml(node);
  this.appendExamples('', mml);
  var cleaned = sretest.TestExternal.sre.EnrichMathml.removeAttributePrefix(
      xmls.serializeToString(node));
  this.assert.equal(cleaned, xmls.serializeToString(xml));
};


/**
 * Removes XML nodes according to the XPath elements in the blacklist.
 * @param {!Node} xml Xml representation of the semantic node.
 */
sretest.EnrichMathmlTest.prototype.customizeXml = function(xml) {
  this.attrBlacklist.forEach(
      function(attr) {
        xml.removeAttribute(attr);
        var removes = sretest.TestExternal.sre.DomUtil.querySelectorAllByAttr(xml, attr);
        if (xml.hasAttribute(attr)) {
          removes.push(xml);
        }
        removes.forEach(
            function(node) {
              node.removeAttribute(attr);
            });
      });
};

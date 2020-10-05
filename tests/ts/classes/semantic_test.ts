/**
 * @fileoverview Testcases for the semantic tree.
 * @author sorge@google.com (Volker Sorge)
 */ 
//
// Copyright 2013 Google Inc. 
//
//
// Copyright 2014 Volker Sorge 
//
// Licensed under the Apache License, Version 2.0 (the "License"); 
// you may not use this file except in compliance with the License. 
// You may obtain a copy of the License at 
//      http://www.apache.org/licenses/LICENSE-2.0 
// Unless required by applicable law or agreed to in writing, software 
// distributed under the License is distributed on an "AS IS" BASIS, 
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. 
// See the License for the specific language governing permissions and 
// limitations under the License. 



import{AbstractExamples}from './abstract_examples';
import{TestExternal}from '../base/test_external';



/**
 * Base class for all the semantic tree related tests.
 */ 
export abstract class SemanticTest extends AbstractExamples {

  /**
   * @override
   */ 
  method(...args: any[]) {
    this.executeTest(args[0], args[1]);
  }

  /**
   * Executes a single test. This is called by the method.
   * @param input The input element.
   * @param expected The expected output.
   */ 
  public abstract executeTest(input: string, expected: string): void;

}


/**
 * Testcases for reconstructing semantic trees from enriched mathml.
 */ 
export class RebuildStreeTest extends SemanticTest {

  /**
     * @override
     */ 
  pickFields = ['input'];
  constructor() {
    super();
  }


  /**
   * Tests if for a given mathml snippet results in a particular semantic tree.
   * @param expr MathML expression.
   */ 
  executeTest(expr: string) {
    let mathMl = TestExternal.sre.Enrich.prepareMmlString(expr);
    let mml = TestExternal.sre.DomUtil.parseInput(mathMl);
    let stree = new TestExternal.sre.SemanticTree(mml);
    let emml = TestExternal.sre.EnrichMathml.enrich(mml, stree);
    let reass = (new TestExternal.sre.RebuildStree(emml)).getTree();
    this.assert.equal(stree.toString(), reass.toString());
  }
}



/**
 * Enriched Speech Tests
 */ 
export class EnrichSpeechTest extends SemanticTest {
  pickFields = ['input'];
  constructor() {
    super();
  }


  /**
   * @override
   */ 
  setUpTest() {
    super.setUpTest();
    TestExternal.sre.System.getInstance().setupEngine(
    {domain:'mathspeak', 
    style:'default', 
    speech:TestExternal.sre.Engine.Speech.SHALLOW});
  }


  /**
   * @override
   */ 
  tearDownTest() {
    TestExternal.sre.System.getInstance().setupEngine(
    {domain:'default', 
    style:'default', 
    speech:TestExternal.sre.Engine.Speech.NONE});
    super.tearDownTest();
  }


  /**
   * Tests if speech strings computed directly for a MathML expression are
   * equivalent to those computed for enriched expressions.
   * @override
   */ 
  executeTest(expr) {
    let mml = TestExternal.sre.Enrich.prepareMmlString(expr);
    let sysSpeech = TestExternal.sre.System.getInstance().toSpeech(mml);
    let enr = TestExternal.sre.WalkerUtil.getSemanticRoot(
    TestExternal.sre.System.getInstance().toEnriched(mml));
    let enrSpeech = enr.getAttribute(TestExternal.sre.EnrichMathml.Attribute.SPEECH);
    this.assert.equal(sysSpeech, enrSpeech);
  }
}



/**
 * Semantic Tree Tests
 */ 
export class SemanticTreeTest extends SemanticTest {

  // TODO: type
  // annotations:{[key: string]: sre.SemanticAnnotator} = null;
  annotations:{[key: string]: any} = null;

  // visitors:{[key: string]: sre.SemanticVisitor} = null;
  visitors:{[key: string]: any} = null;

  constructor() {
    super();

    this.pickFields.push('brief');
  }


  /**
   * @override
   */ 
  setUpTest() {
    super.setUpTest();
    this.annotations = TestExternal.sre.SemanticAnnotations.getInstance().annotators;
    this.visitors = TestExternal.sre.SemanticAnnotations.getInstance().visitors;
    TestExternal.sre.SemanticAnnotations.getInstance().annotators = {};
    TestExternal.sre.SemanticAnnotations.getInstance().visitors = {};
    SemanticTreeTest.setupAttributes();
  }


  /**
   * @override
   */ 
  tearDownTest() {
    TestExternal.sre.SemanticAnnotations.getInstance().annotators = this.annotations;
    TestExternal.sre.SemanticAnnotations.getInstance().visitors = this.visitors;
    super.tearDownTest();
  }


  /**
   * Adds some unicode characters via hex code to the right category.
   *
   * This method is necessary as the test framework can not handle code containing
   * utf-8 encoded characters.
   */ 
  static setupAttributes() {
    let attr = TestExternal.sre.SemanticAttr.getInstance();
    attr.neutralFences.unshift(TestExternal.sre.SemanticUtil.numberToUnicode(0x00A6));
    attr.dashes.unshift(TestExternal.sre.SemanticUtil.numberToUnicode(0x2015));
    attr.neutralFences.unshift(TestExternal.sre.SemanticUtil.numberToUnicode(0x2016));
    attr.arrows.unshift(TestExternal.sre.SemanticUtil.numberToUnicode(0x2192));
    attr.sumOps.unshift(TestExternal.sre.SemanticUtil.numberToUnicode(0x2211));
    attr.additions.unshift(TestExternal.sre.SemanticUtil.numberToUnicode(0x2213));
    attr.multiplications.unshift(TestExternal.sre.SemanticUtil.numberToUnicode(0x2218));
    attr.intOps.unshift(TestExternal.sre.SemanticUtil.numberToUnicode(0x222B));
    attr.inequalities.unshift(TestExternal.sre.SemanticUtil.numberToUnicode(0x2264));
    attr.additions.unshift(TestExternal.sre.SemanticUtil.numberToUnicode(0x2295));
    let open = TestExternal.sre.SemanticUtil.numberToUnicode(0x3008);
    let close = TestExternal.sre.SemanticUtil.numberToUnicode(0x3009);
    attr.openClosePairs[open] = close;
    attr.leftFences.unshift(open);
    attr.rightFences.unshift(close);
  }


  /**
   * @override
   */ 
  method(var_args) {
    let args = Array.prototype.slice.call(arguments, 0);
    this.executeTest(args[0], args[1], args[2]);
  }


  /**
   * Tests if for a given mathml snippet results in a particular semantic tree.
   * @param mml MathML expression.
   * @param sml XML snippet for the semantic tree.
   * @param opt_brief Brief XML output.
   */ 
  executeTest(mml: string, sml: string, opt_brief?: boolean) {
    let mathMl = '<math xmlns="http://www.w3.org/1998/Math/MathML">' + 
    mml + '</math>';
    let node = TestExternal.sre.DomUtil.parseInput(mathMl);
    let sxml = (new TestExternal.sre.SemanticTree(node)).xml(opt_brief);
    let dp = new TestExternal.xmldom.DOMParser();
    let xml = dp.parseFromString('<stree>' + sml + '</stree>', 'text/xml');
    let xmls = new TestExternal.xmldom.XMLSerializer();
    this.assert.equal(xmls.serializeToString(sxml), xmls.serializeToString(xml));
  }
}




/**
 * Tests for enriched MathML expressions.
 */ 
export class EnrichMathmlTest extends SemanticTest {
  attrBlacklist = [];
  constructor() {
    super();
    this.setActive('EnrichExamples', 'json');
  }


  /**
   * @override
   */ 
  setUpTest() {
    super.setUpTest();
    this.attrBlacklist = [
    'data-semantic-annotation', 
    'data-semantic-font', 
    'data-semantic-embellished', 
    'data-semantic-fencepointer', 
    'data-semantic-structure'];
  }


  /**
   * Tests if for a given mathml snippet results in a particular semantic tree.
   * @param mml MathML expression.
   * @param smml MathML snippet for the semantic information.
   */ 
  executeTest(mml: string, smml: string) {
    let mathMl = TestExternal.sre.Enrich.prepareMmlString(mml);
    let node = TestExternal.sre.Enrich.semanticMathmlSync(mathMl);
    let dp = new TestExternal.xmldom.DOMParser();
    let xml = smml ? dp.parseFromString(smml) : '';
    let xmls = new TestExternal.xmldom.XMLSerializer();
    this.customizeXml(node);
    this.appendExamples('', mml);
    let cleaned = TestExternal.sre.EnrichMathml.removeAttributePrefix(
    xmls.serializeToString(node));
    this.assert.equal(cleaned, xmls.serializeToString(xml));
  }


  /**
   * Removes XML nodes according to the XPath elements in the blacklist.
   * @param xml Xml representation of the semantic node.
   */ 
  customizeXml(xml: Element) {
    this.attrBlacklist.forEach(
    function(attr) {
      xml.removeAttribute(attr);
      let removes = TestExternal.sre.DomUtil.querySelectorAllByAttr(xml, attr);
      if (xml.hasAttribute(attr)) {
        removes.push(xml);
      }
      removes.forEach(
        function(node: Element) {
        node.removeAttribute(attr);
      });
    });
  }
}

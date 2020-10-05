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

import {AbstractExamples} from './abstract_examples';
import {sre, xmldom} from '../base/test_external';

/**
 * Base class for all the semantic tree related tests.
 */
export abstract class SemanticTest extends AbstractExamples {

  /**
   * @override
   */
  public method(...args: any[]) {
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
  public pickFields = ['input'];
  constructor() {
    super();
  }

  /**
   * Tests if for a given mathml snippet results in a particular semantic tree.
   * @param expr MathML expression.
   */
  public executeTest(expr: string) {
    let mathMl = sre.Enrich.prepareMmlString(expr);
    let mml = sre.DomUtil.parseInput(mathMl);
    let stree = new sre.SemanticTree(mml);
    let emml = sre.EnrichMathml.enrich(mml, stree);
    let reass = (new sre.RebuildStree(emml)).getTree();
    this.assert.equal(stree.toString(), reass.toString());
  }
}

/**
 * Enriched Speech Tests
 */
export class EnrichSpeechTest extends SemanticTest {
  public pickFields = ['input'];
  constructor() {
    super();
  }

  /**
   * @override
   */
  public setUpTest() {
    super.setUpTest();
    sre.System.getInstance().setupEngine(
    {domain: 'mathspeak',
    style: 'default',
    speech: sre.Engine.Speech.SHALLOW});
  }

  /**
   * @override
   */
  public tearDownTest() {
    sre.System.getInstance().setupEngine(
    {domain: 'default',
    style: 'default',
    speech: sre.Engine.Speech.NONE});
    super.tearDownTest();
  }

  /**
   * Tests if speech strings computed directly for a MathML expression are
   * equivalent to those computed for enriched expressions.
   * @override
   */
  public executeTest(expr: string) {
    let mml = sre.Enrich.prepareMmlString(expr);
    let sysSpeech = sre.System.getInstance().toSpeech(mml);
    let enr = sre.WalkerUtil.getSemanticRoot(
    sre.System.getInstance().toEnriched(mml));
    let enrSpeech = enr.getAttribute(sre.EnrichMathml.Attribute.SPEECH);
    this.assert.equal(sysSpeech, enrSpeech);
  }
}

/**
 * Semantic Tree Tests
 */
export class SemanticTreeTest extends SemanticTest {

  // TODO: Type
  // public annotations: {[key: string]: sre.SemanticAnnotator} = null;
  public annotations: {[key: string]: any} = null;

  // public visitors: {[key: string]: sre.SemanticVisitor} = null;
  public visitors: {[key: string]: any} = null;

  /**
   * Adds some unicode characters via hex code to the right category.
   *
   * This method is necessary as the test framework can not handle code containing
   * utf-8 encoded characters.
   */
  public static setupAttributes() {
    let attr = sre.SemanticAttr.getInstance();
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
    let open = sre.SemanticUtil.numberToUnicode(0x3008);
    let close = sre.SemanticUtil.numberToUnicode(0x3009);
    attr.openClosePairs[open] = close;
    attr.leftFences.unshift(open);
    attr.rightFences.unshift(close);
  }

  constructor() {
    super();

    this.pickFields.push('brief');
  }

  /**
   * @override
   */
  public setUpTest() {
    super.setUpTest();
    this.annotations = sre.SemanticAnnotations.getInstance().annotators;
    this.visitors = sre.SemanticAnnotations.getInstance().visitors;
    sre.SemanticAnnotations.getInstance().annotators = {};
    sre.SemanticAnnotations.getInstance().visitors = {};
    SemanticTreeTest.setupAttributes();
  }

  /**
   * @override
   */
  public tearDownTest() {
    sre.SemanticAnnotations.getInstance().annotators = this.annotations;
    sre.SemanticAnnotations.getInstance().visitors = this.visitors;
    super.tearDownTest();
  }

  /**
   * @override
   */
  public method(...args: any[]) {
    this.executeTest(args[0], args[1], args[2]);
  }

  /**
   * Tests if for a given mathml snippet results in a particular semantic tree.
   * @param mml MathML expression.
   * @param sml XML snippet for the semantic tree.
   * @param opt_brief Brief XML output.
   */
  public executeTest(mml: string, sml: string, opt_brief?: boolean) {
    let mathMl = '<math xmlns="http://www.w3.org/1998/Math/MathML">' +
    mml + '</math>';
    let node = sre.DomUtil.parseInput(mathMl);
    let sxml = (new sre.SemanticTree(node)).xml(opt_brief);
    let dp = new xmldom.DOMParser();
    let xml = dp.parseFromString('<stree>' + sml + '</stree>', 'text/xml');
    let xmls = new xmldom.XMLSerializer();
    this.assert.equal(xmls.serializeToString(sxml), xmls.serializeToString(xml));
  }
}

/**
 * Tests for enriched MathML expressions.
 */
export class EnrichMathmlTest extends SemanticTest {
  public attrBlacklist: string[] = [];
  constructor() {
    super();
    this.setActive('EnrichExamples', 'json');
  }

  /**
   * @override
   */
  public setUpTest() {
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
  public executeTest(mml: string, smml: string) {
    let mathMl = sre.Enrich.prepareMmlString(mml);
    let node = sre.Enrich.semanticMathmlSync(mathMl);
    let dp = new xmldom.DOMParser();
    let xml = smml ? dp.parseFromString(smml) : '';
    let xmls = new xmldom.XMLSerializer();
    this.customizeXml(node);
    this.appendExamples('', mml);
    let cleaned = sre.EnrichMathml.removeAttributePrefix(
    xmls.serializeToString(node));
    this.assert.equal(cleaned, xmls.serializeToString(xml));
  }

  /**
   * Removes XML nodes according to the XPath elements in the blacklist.
   * @param xml Xml representation of the semantic node.
   */
  public customizeXml(xml: Element) {
    this.attrBlacklist.forEach(
    function(attr) {
      xml.removeAttribute(attr);
      let removes = sre.DomUtil.querySelectorAllByAttr(xml, attr);
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

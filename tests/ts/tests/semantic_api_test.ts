//
// Copyright 2013 Google Inc.
//
//
// Copyright 2014-16 Volker Sorge
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

/**
 * @fileoverview Testcases for the semantic API.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import {sre, xmldom} from '../base/test_external';
import {AbstractTest} from '../classes/abstract_test';

export class SemanticApiTest extends AbstractTest {

  /**
   * Some test cases.
   */
  public static TEST_CASES: string[] = [
    '<mn>3</mn><mfrac><mn>1</mn><mn>2</mn></mfrac><mi>a</mi>',
    '<mi>b</mi><mn>3</mn><mfrac><mn>1</mn><mn>2</mn></mfrac><mi>a</mi>',
    '<mi>a</mi><mo>=</mo><mi>b</mi><mo>=</mo><mi>c</mi>' +
      '<mo>\u2264</mo><mi>d</mi>',
    '<mi>a</mi><mo>+</mo><semantics><mi>b</mi><annotation-xml>' +
      '<content>something</content></annotation-xml></semantics>',
    '<mfenced open="(" close=")"><mtable>' +
      '<mtr><mtd><mi>n</mi></mtd></mtr>' +
      '</mtable></mfenced>',
    '<mmultiscripts><mo>|</mo><mprescripts/><mn>4</mn><mn>3</mn>' +
      '</mmultiscripts><mi>x</mi><msubsup><mo>|</mo><mn>1</mn><mn>2</mn>' +
      '</msubsup>'];

  /**
   * @override
   */
  public information = 'Semantic API tests.';

  /**
   * Tests Tree generation vs Xml output.
   */
  public testTreeVsXml() {
    let test =
      function(expr: string) {
        let mml = sre.DomUtil.parseInput('<math>' + expr + '</math>');
        let xmls = new xmldom.XMLSerializer();
        this.assert.equal(
          xmls.serializeToString(sre.Semantic.getTree(mml).xml()),
          xmls.serializeToString(sre.Semantic.xmlTree(mml)));
      }.bind(this);
    SemanticApiTest.TEST_CASES.forEach(test);
  }

  /**
   * Tests Tree generation vs Xml output.
   */
  public testStringVsXml() {
    let test =
      function(expr: string) {
        let mstr = '<math>' + expr + '</math>';
        let mml = sre.DomUtil.parseInput(mstr);
        let xmls = new xmldom.XMLSerializer();
        this.assert.equal(xmls.serializeToString(
          sre.Semantic.getTreeFromString(mstr).xml()),
                          xmls.serializeToString(sre.Semantic.xmlTree(mml)));
      }.bind(this);
    SemanticApiTest.TEST_CASES.forEach(test);
  }

  /**
   * Tests Tree generation vs Xml output.
   */
  public testStringVsTree() {
    let test =
      function(expr: string) {
        let mstr = '<math>' + expr + '</math>';
        let mml = sre.DomUtil.parseInput(mstr);
        let xmls = new xmldom.XMLSerializer();
        this.assert.equal(
          xmls.serializeToString(sre.Semantic.getTreeFromString(mstr).xml()),
          xmls.serializeToString(sre.Semantic.getTree(mml).xml()));
      }.bind(this);
    SemanticApiTest.TEST_CASES.forEach(test);
  }
}

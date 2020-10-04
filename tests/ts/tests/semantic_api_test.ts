/**
 * @fileoverview Testcases for the semantic API.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */ 
// Copyright 2013 Google Inc. 
// Copyright 2014-16 Volker Sorge 
// Licensed under the Apache License, Version 2.0 (the "License"); 
// you may not use this file except in compliance with the License. 
// You may obtain a copy of the License at 
//      http://www.apache.org/licenses/LICENSE-2.0 
// Unless required by applicable law or agreed to in writing, software 
// distributed under the License is distributed on an "AS IS" BASIS, 
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. 
// See the License for the specific language governing permissions and 
// limitations under the License. 



import{AbstractTest}from '../classes/abstract_test';
import{TestExternal}from '../base/test_external';



export class SemanticApiTest extends AbstractTest {


  static TEST_CASES:string[];

  /**
     * @override
     */ 
  information = 'Semantic API tests.';
  constructor() {
    super();
  }


  /**
   * Tests Tree generation vs Xml output.
   */ 
  testTreeVsXml() {
    let test = goog.bind( 
    function(expr) {
      let mml = TestExternal.sre.DomUtil.parseInput('<math>' + expr + '</math>');
      let xmls = new TestExternal.xmldom.XMLSerializer();
      this.assert.equal(xmls.serializeToString(TestExternal.sre.Semantic.getTree(mml).xml()), 
      xmls.serializeToString(TestExternal.sre.Semantic.xmlTree(mml)));
    }, 
    this);
    SemanticApiTest.TEST_CASES.forEach(test);
  }


  /**
   * Tests Tree generation vs Xml output.
   */ 
  testStringVsXml() {
    let test = goog.bind( 
    function(expr) {
      let mstr = '<math>' + expr + '</math>';
      let mml = TestExternal.sre.DomUtil.parseInput(mstr);
      let xmls = new TestExternal.xmldom.XMLSerializer();
      this.assert.equal(xmls.serializeToString(
      TestExternal.sre.Semantic.getTreeFromString(mstr).xml()), 
      xmls.serializeToString(TestExternal.sre.Semantic.xmlTree(mml)));
    }, 
    this);
    SemanticApiTest.TEST_CASES.forEach(test);
  }


  /**
   * Tests Tree generation vs Xml output.
   */ 
  testStringVsTree() {
    let test = goog.bind( 
    function(expr) {
      let mstr = '<math>' + expr + '</math>';
      let mml = TestExternal.sre.DomUtil.parseInput(mstr);
      let xmls = new TestExternal.xmldom.XMLSerializer();
      this.assert.equal(xmls.serializeToString(
      TestExternal.sre.Semantic.getTreeFromString(mstr).xml()), 
      xmls.serializeToString(TestExternal.sre.Semantic.getTree(mml).xml()));
    }, 
    this);
    SemanticApiTest.TEST_CASES.forEach(test);
  }
}
/**
 * Some test cases.
 */ 
SemanticApiTest.TEST_CASES = [
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

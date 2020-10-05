/**
 * @fileoverview Testcases for DOM and Xpath functionality.
 * @author sorge@google.com (Volker Sorge)
 */
//
// Copyright 2018 Volker Sorge
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

import {AbstractTest} from '../classes/abstract_test';

export class DomTest extends AbstractTest {

  /**
     * @override
     */
  public information = 'DOM utility tests.';
  constructor() {
    super();
  }

  /**
   * Executes entity tests.
   * @param xml The XML input string.
   * @param result The expected output.
   */
  public entitiesTest(xml: string, result: string) {
    let parsed = sre.DomUtil.parseInput(xml);
    this.assert.equal(parsed.toString(), result);
  }

  /**
   * XML Entities.
   */
  public testXmlEntities() {
    this.entitiesTest('<a>&lt;</a>', '<a>&lt;</a>');
    this.entitiesTest('<a>&amp;</a>', '<a>&amp;</a>');
  }

  /**
   * HTML4 Entities.
   */
  public testHtml4Entities() {
    this.entitiesTest('<a>&Eacute;</a>',
    '<a xmlns="http://www.w3.org/1999/xhtml">É</a>');
    this.entitiesTest('<a>&Icirc;</a>',
    '<a xmlns="http://www.w3.org/1999/xhtml">Î</a>');
  }

  /**
   * HTML5 Entities.
   */
  public testHtml5Entities() {
    this.entitiesTest('<a>&ncup;</a>',
    '<a xmlns="http://www.w3.org/1999/xhtml">⩂</a>');
    this.entitiesTest('<a>&varsubsetneq;</a>',
    '<a xmlns="http://www.w3.org/1999/xhtml">⊊︀</a>');
    this.entitiesTest('<a>&Vfr;</a>',
    '<a xmlns="http://www.w3.org/1999/xhtml">𝔙</a>');
  }

  /**
   * XPath evaluation test.
   */
  public testXpathEvaluate() {
    let xml = sre.DomUtil.parseInput('<a><b>c</b><d>e</d></a>');
    this.assert.equal(sre.XpathUtil.evalXPath('//b', xml).toString(), '<b>c</b>');
    this.assert.equal(sre.XpathUtil.evalXPath('//b/text()', xml).toString(), 'c');
    this.assert.equal(
    sre.XpathUtil.evalXPath('//b/following-sibling::*', xml).toString(),
    '<d>e</d>');
  }

  /**
   * XPath boolean constraint test.
   */
  public testXpathBoolean() {
    let xml = sre.DomUtil.parseInput('<a><b>c</b><d>e</d></a>');
    this.assert.equal(sre.XpathUtil.evaluateBoolean('//b', xml), true);
    this.assert.equal(sre.XpathUtil.evaluateBoolean('//c', xml), false);
    this.assert.equal(sre.XpathUtil.evaluateBoolean(
    '//b/following-sibling::*', xml), true);
  }

  /**
   * XPath string computation.
   */
  public testXpathString() {
    let xml = sre.DomUtil.parseInput('<a l="1"><b m="2">c</b><d>e</d></a>');
    this.assert.equal(sre.XpathUtil.evaluateString('@l', xml), '1');
    this.assert.equal(sre.XpathUtil.evaluateString('//*/@m', xml), '2');
    this.assert.equal(sre.XpathUtil.evaluateString(
    '//b/following-sibling::*', xml), 'e');
  }
}

// Copyright (c) 2016 Volker Sorge
// Copyright (c) 2016 The MathJax Consortium
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
 * @fileoverview Testcases for prefix speech generation in MathML enrichment.
 *
 * @author v.sorge@mathjax.org (Volker Sorge)
 */

goog.provide('sre.PrefixRuleTest');

goog.require('sre.AbstractTest');



/**
 * @constructor
 * @extends {sre.AbstractTest}
 */
sre.PrefixRuleTest = function() {
  goog.base(this);

  /**
   * @override
   */
  this.information = 'Prefix rule tests.';

};
goog.inherits(sre.PrefixRuleTest, sre.AbstractTest);


/**
 * Executes the prefix rule tests.
 * @param {string} expr The semantic tree as an XML string.
 * @param {number} id The id of the node to be considered.
 * @param {string} result The expected result.
 */
sre.PrefixRuleTest.prototype.executeTest = function(expr, id, result) {
  var xml = sre.DomUtil.parseInput('<stree>' + expr + '</stree>',
                                   sre.EnrichMathml.Error);
  var node = sre.XpathUtil.evalXPath('.//*[@id="' + id + '"]', xml)[0];
  if (!node) {
    this.assert.fail();
    return;
  }
  var descrs = sre.Engine.getInstance().runInSetting(
      {'domain': 'prefix', 'style': 'default',
        'strict': true, 'cache': false, 'speech': true},
      function() {return sre.SpeechRuleEngine.getInstance().evaluateNode(node);}
      );
  var speech = sre.AuditoryDescription.speechString(descrs);
  this.assert.equal(speech, result);
};


/**
 * @override
 */
sre.PrefixRuleTest.prototype.setUpTest = function() {
  sre.System.getInstance().setupEngine(
      {speech: true});
};


/**
 * @override
 */
sre.PrefixRuleTest.prototype.tearDownTest = function() {
  sre.System.getInstance().setupEngine(
      {speech: false});
};


/**
 * Testing sub/superscripts.
 */
sre.PrefixRuleTest.prototype.testSubSuper = function() {
  this.executeTest('<subscript id="2"><children>' +
                   '<identifier id="1">a</identifier>' +
                   '<identifier id="0">b</identifier>' +
                   '</children></subscript>',
                   1, 'Base');
  this.executeTest('<subscript id="2"><children>' +
                   '<identifier id="1">a</identifier>' +
                   '<identifier id="0">b</identifier>' +
                   '</children></subscript>',
                   0, 'Subscript');
  this.executeTest('<superscript id="2"><children>' +
                   '<identifier id="1">a</identifier>' +
                   '<identifier id="0">b</identifier>' +
                   '</children></superscript>',
                   1, 'Base');
  this.executeTest('<superscript id="2"><children>' +
                   '<identifier id="1">a</identifier>' +
                   '<identifier id="0">b</identifier>' +
                   '</children></superscript>',
                   0, 'Exponent');
};


/**
 * Testing over/underscripts.
 */
sre.PrefixRuleTest.prototype.testOverUnder = function() {
  this.executeTest('<overscore id="2"><children>' +
                   '<identifier id="1">a</identifier>' +
                   '<identifier id="0">b</identifier>' +
                   '</children></overscore>',
                   1, 'Base');
  this.executeTest('<overscore id="2"><children>' +
                   '<identifier id="1">a</identifier>' +
                   '<identifier id="0">b</identifier>' +
                   '</children></overscore>',
                   0, 'Overscript');
  this.executeTest('<underscore id="2"><children>' +
                   '<identifier id="1">a</identifier>' +
                   '<identifier id="0">b</identifier>' +
                   '</children></underscore>',
                   1, 'Base');
  this.executeTest('<underscore id="2"><children>' +
                   '<identifier id="1">a</identifier>' +
                   '<identifier id="0">b</identifier>' +
                   '</children></underscore>',
                   0, 'Underscript');
};


/**
 * Testing fractions.
 */
sre.PrefixRuleTest.prototype.testFractions = function() {
  this.executeTest('<fraction id="2"><children>' +
                   '<identifier id="1">a</identifier>' +
                   '<identifier id="0">b</identifier>' +
                   '</children></fraction>',
                   1, 'Numerator');
  this.executeTest('<fraction id="2"><children>' +
                   '<identifier id="1">a</identifier>' +
                   '<identifier id="0">b</identifier>' +
                   '</children></fraction>',
                   0, 'Denominator');
};


/**
 * Testing roots.
 */
sre.PrefixRuleTest.prototype.testRoots = function() {
  this.executeTest('<sqrt id="1"><children>' +
                   '<identifier id="0">a</identifier>' +
                   '</children></sqrt>',
                   0, 'Radicand');
  this.executeTest('<root id="2"><children>' +
                   '<identifier id="1">a</identifier>' +
                   '<identifier id="0">b</identifier>' +
                   '</children></root>',
                   0, 'Radicand');
  this.executeTest('<root id="2"><children>' +
                   '<identifier id="1">a</identifier>' +
                   '<identifier id="0">b</identifier>' +
                   '</children></root>',
                   1, 'Index');
};


/**
 * Testing simple tensors.
 */
sre.PrefixRuleTest.prototype.testSimpleTensors = function() {
  this.executeTest('<tensor role="latinletter" id="5">' +
                   '<children>' +
                   '<identifier id="0">A</identifier>' +
                   '<number role="leftsub" id="1">3</number>' +
                   '<number role="leftsuper" id="2">4</number>' +
                   '<number role="rightsub" id="3">1</number>' +
                   '<number role="rightsuper" id="4">2</number>' +
                   '</children>' +
                   '</tensor>',
                   0, 'Base');
  this.executeTest('<tensor role="latinletter" id="5">' +
                   '<children>' +
                   '<identifier id="0">A</identifier>' +
                   '<number role="leftsub" id="1">3</number>' +
                   '<number role="leftsuper" id="2">4</number>' +
                   '<number role="rightsub" id="3">1</number>' +
                   '<number role="rightsuper" id="4">2</number>' +
                   '</children>' +
                   '</tensor>',
                   1, 'Left Subscript');
  this.executeTest('<tensor role="latinletter" id="5">' +
                   '<children>' +
                   '<identifier id="0">A</identifier>' +
                   '<number role="leftsub" id="1">3</number>' +
                   '<number role="leftsuper" id="2">4</number>' +
                   '<number role="rightsub" id="3">1</number>' +
                   '<number role="rightsuper" id="4">2</number>' +
                   '</children>' +
                   '</tensor>',
                   2, 'Left Superscript');
  this.executeTest('<tensor role="latinletter" id="5">' +
                   '<children>' +
                   '<identifier id="0">A</identifier>' +
                   '<number role="leftsub" id="1">3</number>' +
                   '<number role="leftsuper" id="2">4</number>' +
                   '<number role="rightsub" id="3">1</number>' +
                   '<number role="rightsuper" id="4">2</number>' +
                   '</children>' +
                   '</tensor>',
                   3, 'Right Subscript');
  this.executeTest('<tensor role="latinletter" id="5">' +
                   '<children>' +
                   '<identifier id="0">A</identifier>' +
                   '<number role="leftsub" id="1">3</number>' +
                   '<number role="leftsuper" id="2">4</number>' +
                   '<number role="rightsub" id="3">1</number>' +
                   '<number role="rightsuper" id="4">2</number>' +
                   '</children>' +
                   '</tensor>',
                   4, 'Right Superscript');
};


/**
 * Testing complex tensors.
 */
sre.PrefixRuleTest.prototype.testComplexTensors = function() {
  this.executeTest('<tensor role="latinletter" id="17">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="0">A</identifier>' +
      '<punctuated role="leftsub" id="4">' +
      '<content>' +
      '<punctuation role="dummy" id="3">\u2063</punctuation>' +
      '</content>' +
      '<children>' +
      '<number role="integer" font="normal" id="1">1</number>' +
      '<identifier role="latinletter" font="italic" id="2">i</identifier>' +
      '</children>' +
      '</punctuated>' +
      '<punctuated role="leftsuper" id="8">' +
      '<content>' +
      '<punctuation role="dummy" id="7">\u2063</punctuation>' +
      '</content>' +
      '<children>' +
      '<number role="integer" font="normal" id="5">2</number>' +
      '<identifier role="latinletter" font="italic" id="6">j</identifier>' +
      '</children>' +
      '</punctuated>' +
      '<punctuated role="rightsub" id="12">' +
      '<content>' +
      '<punctuation role="dummy" id="11">\u2063</punctuation>' +
      '</content>' +
      '<children>' +
      '<number role="integer" font="normal" id="9">3</number>' +
      '<identifier role="latinletter" font="italic" id="10">k</identifier>' +
      '</children>' +
      '</punctuated>' +
      '<punctuated role="rightsuper" id="16">' +
      '<content>' +
      '<punctuation role="dummy" id="15">\u2063</punctuation>' +
      '</content>' +
      '<children>' +
      '<number role="integer" font="normal" id="13">4</number>' +
      '<identifier role="latinletter" font="italic" id="14">l</identifier>' +
      '</children>' +
      '</punctuated>' +
      '</children>' +
      '</tensor>',
                   0, 'Base');
  this.executeTest('<tensor role="latinletter" id="17">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="0">A</identifier>' +
      '<punctuated role="leftsub" id="4">' +
      '<content>' +
      '<punctuation role="dummy" id="3">\u2063</punctuation>' +
      '</content>' +
      '<children>' +
      '<number role="integer" font="normal" id="1">1</number>' +
      '<identifier role="latinletter" font="italic" id="2">i</identifier>' +
      '</children>' +
      '</punctuated>' +
      '<punctuated role="leftsuper" id="8">' +
      '<content>' +
      '<punctuation role="dummy" id="7">\u2063</punctuation>' +
      '</content>' +
      '<children>' +
      '<number role="integer" font="normal" id="5">2</number>' +
      '<identifier role="latinletter" font="italic" id="6">j</identifier>' +
      '</children>' +
      '</punctuated>' +
      '<punctuated role="rightsub" id="12">' +
      '<content>' +
      '<punctuation role="dummy" id="11">\u2063</punctuation>' +
      '</content>' +
      '<children>' +
      '<number role="integer" font="normal" id="9">3</number>' +
      '<identifier role="latinletter" font="italic" id="10">k</identifier>' +
      '</children>' +
      '</punctuated>' +
      '<punctuated role="rightsuper" id="16">' +
      '<content>' +
      '<punctuation role="dummy" id="15">\u2063</punctuation>' +
      '</content>' +
      '<children>' +
      '<number role="integer" font="normal" id="13">4</number>' +
      '<identifier role="latinletter" font="italic" id="14">l</identifier>' +
      '</children>' +
      '</punctuated>' +
      '</children>' +
      '</tensor>',
                   1, '1st Left Subscript');
  this.executeTest('<tensor role="latinletter" id="17">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="0">A</identifier>' +
      '<punctuated role="leftsub" id="4">' +
      '<content>' +
      '<punctuation role="dummy" id="3">\u2063</punctuation>' +
      '</content>' +
      '<children>' +
      '<number role="integer" font="normal" id="1">1</number>' +
      '<identifier role="latinletter" font="italic" id="2">i</identifier>' +
      '</children>' +
      '</punctuated>' +
      '<punctuated role="leftsuper" id="8">' +
      '<content>' +
      '<punctuation role="dummy" id="7">\u2063</punctuation>' +
      '</content>' +
      '<children>' +
      '<number role="integer" font="normal" id="5">2</number>' +
      '<identifier role="latinletter" font="italic" id="6">j</identifier>' +
      '</children>' +
      '</punctuated>' +
      '<punctuated role="rightsub" id="12">' +
      '<content>' +
      '<punctuation role="dummy" id="11">\u2063</punctuation>' +
      '</content>' +
      '<children>' +
      '<number role="integer" font="normal" id="9">3</number>' +
      '<identifier role="latinletter" font="italic" id="10">k</identifier>' +
      '</children>' +
      '</punctuated>' +
      '<punctuated role="rightsuper" id="16">' +
      '<content>' +
      '<punctuation role="dummy" id="15">\u2063</punctuation>' +
      '</content>' +
      '<children>' +
      '<number role="integer" font="normal" id="13">4</number>' +
      '<identifier role="latinletter" font="italic" id="14">l</identifier>' +
      '</children>' +
      '</punctuated>' +
      '</children>' +
      '</tensor>',
                   2, '2nd Left Subscript');
  this.executeTest('<tensor role="latinletter" id="17">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="0">A</identifier>' +
      '<punctuated role="leftsub" id="4">' +
      '<content>' +
      '<punctuation role="dummy" id="3">\u2063</punctuation>' +
      '</content>' +
      '<children>' +
      '<number role="integer" font="normal" id="1">1</number>' +
      '<identifier role="latinletter" font="italic" id="2">i</identifier>' +
      '</children>' +
      '</punctuated>' +
      '<punctuated role="leftsuper" id="8">' +
      '<content>' +
      '<punctuation role="dummy" id="7">\u2063</punctuation>' +
      '</content>' +
      '<children>' +
      '<number role="integer" font="normal" id="5">2</number>' +
      '<identifier role="latinletter" font="italic" id="6">j</identifier>' +
      '</children>' +
      '</punctuated>' +
      '<punctuated role="rightsub" id="12">' +
      '<content>' +
      '<punctuation role="dummy" id="11">\u2063</punctuation>' +
      '</content>' +
      '<children>' +
      '<number role="integer" font="normal" id="9">3</number>' +
      '<identifier role="latinletter" font="italic" id="10">k</identifier>' +
      '</children>' +
      '</punctuated>' +
      '<punctuated role="rightsuper" id="16">' +
      '<content>' +
      '<punctuation role="dummy" id="15">\u2063</punctuation>' +
      '</content>' +
      '<children>' +
      '<number role="integer" font="normal" id="13">4</number>' +
      '<identifier role="latinletter" font="italic" id="14">l</identifier>' +
      '</children>' +
      '</punctuated>' +
      '</children>' +
      '</tensor>',
                   5, '1st Left Superscript');
  this.executeTest('<tensor role="latinletter" id="17">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="0">A</identifier>' +
      '<punctuated role="leftsub" id="4">' +
      '<content>' +
      '<punctuation role="dummy" id="3">\u2063</punctuation>' +
      '</content>' +
      '<children>' +
      '<number role="integer" font="normal" id="1">1</number>' +
      '<identifier role="latinletter" font="italic" id="2">i</identifier>' +
      '</children>' +
      '</punctuated>' +
      '<punctuated role="leftsuper" id="8">' +
      '<content>' +
      '<punctuation role="dummy" id="7">\u2063</punctuation>' +
      '</content>' +
      '<children>' +
      '<number role="integer" font="normal" id="5">2</number>' +
      '<identifier role="latinletter" font="italic" id="6">j</identifier>' +
      '</children>' +
      '</punctuated>' +
      '<punctuated role="rightsub" id="12">' +
      '<content>' +
      '<punctuation role="dummy" id="11">\u2063</punctuation>' +
      '</content>' +
      '<children>' +
      '<number role="integer" font="normal" id="9">3</number>' +
      '<identifier role="latinletter" font="italic" id="10">k</identifier>' +
      '</children>' +
      '</punctuated>' +
      '<punctuated role="rightsuper" id="16">' +
      '<content>' +
      '<punctuation role="dummy" id="15">\u2063</punctuation>' +
      '</content>' +
      '<children>' +
      '<number role="integer" font="normal" id="13">4</number>' +
      '<identifier role="latinletter" font="italic" id="14">l</identifier>' +
      '</children>' +
      '</punctuated>' +
      '</children>' +
      '</tensor>',
                   6, '2nd Left Superscript');
  this.executeTest('<tensor role="latinletter" id="17">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="0">A</identifier>' +
      '<punctuated role="leftsub" id="4">' +
      '<content>' +
      '<punctuation role="dummy" id="3">\u2063</punctuation>' +
      '</content>' +
      '<children>' +
      '<number role="integer" font="normal" id="1">1</number>' +
      '<identifier role="latinletter" font="italic" id="2">i</identifier>' +
      '</children>' +
      '</punctuated>' +
      '<punctuated role="leftsuper" id="8">' +
      '<content>' +
      '<punctuation role="dummy" id="7">\u2063</punctuation>' +
      '</content>' +
      '<children>' +
      '<number role="integer" font="normal" id="5">2</number>' +
      '<identifier role="latinletter" font="italic" id="6">j</identifier>' +
      '</children>' +
      '</punctuated>' +
      '<punctuated role="rightsub" id="12">' +
      '<content>' +
      '<punctuation role="dummy" id="11">\u2063</punctuation>' +
      '</content>' +
      '<children>' +
      '<number role="integer" font="normal" id="9">3</number>' +
      '<identifier role="latinletter" font="italic" id="10">k</identifier>' +
      '</children>' +
      '</punctuated>' +
      '<punctuated role="rightsuper" id="16">' +
      '<content>' +
      '<punctuation role="dummy" id="15">\u2063</punctuation>' +
      '</content>' +
      '<children>' +
      '<number role="integer" font="normal" id="13">4</number>' +
      '<identifier role="latinletter" font="italic" id="14">l</identifier>' +
      '</children>' +
      '</punctuated>' +
      '</children>' +
      '</tensor>',
                   9, '1st Right Subscript');
  this.executeTest('<tensor role="latinletter" id="17">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="0">A</identifier>' +
      '<punctuated role="leftsub" id="4">' +
      '<content>' +
      '<punctuation role="dummy" id="3">\u2063</punctuation>' +
      '</content>' +
      '<children>' +
      '<number role="integer" font="normal" id="1">1</number>' +
      '<identifier role="latinletter" font="italic" id="2">i</identifier>' +
      '</children>' +
      '</punctuated>' +
      '<punctuated role="leftsuper" id="8">' +
      '<content>' +
      '<punctuation role="dummy" id="7">\u2063</punctuation>' +
      '</content>' +
      '<children>' +
      '<number role="integer" font="normal" id="5">2</number>' +
      '<identifier role="latinletter" font="italic" id="6">j</identifier>' +
      '</children>' +
      '</punctuated>' +
      '<punctuated role="rightsub" id="12">' +
      '<content>' +
      '<punctuation role="dummy" id="11">\u2063</punctuation>' +
      '</content>' +
      '<children>' +
      '<number role="integer" font="normal" id="9">3</number>' +
      '<identifier role="latinletter" font="italic" id="10">k</identifier>' +
      '</children>' +
      '</punctuated>' +
      '<punctuated role="rightsuper" id="16">' +
      '<content>' +
      '<punctuation role="dummy" id="15">\u2063</punctuation>' +
      '</content>' +
      '<children>' +
      '<number role="integer" font="normal" id="13">4</number>' +
      '<identifier role="latinletter" font="italic" id="14">l</identifier>' +
      '</children>' +
      '</punctuated>' +
      '</children>' +
      '</tensor>',
                   10, '2nd Right Subscript');
  this.executeTest('<tensor role="latinletter" id="17">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="0">A</identifier>' +
      '<punctuated role="leftsub" id="4">' +
      '<content>' +
      '<punctuation role="dummy" id="3">\u2063</punctuation>' +
      '</content>' +
      '<children>' +
      '<number role="integer" font="normal" id="1">1</number>' +
      '<identifier role="latinletter" font="italic" id="2">i</identifier>' +
      '</children>' +
      '</punctuated>' +
      '<punctuated role="leftsuper" id="8">' +
      '<content>' +
      '<punctuation role="dummy" id="7">\u2063</punctuation>' +
      '</content>' +
      '<children>' +
      '<number role="integer" font="normal" id="5">2</number>' +
      '<identifier role="latinletter" font="italic" id="6">j</identifier>' +
      '</children>' +
      '</punctuated>' +
      '<punctuated role="rightsub" id="12">' +
      '<content>' +
      '<punctuation role="dummy" id="11">\u2063</punctuation>' +
      '</content>' +
      '<children>' +
      '<number role="integer" font="normal" id="9">3</number>' +
      '<identifier role="latinletter" font="italic" id="10">k</identifier>' +
      '</children>' +
      '</punctuated>' +
      '<punctuated role="rightsuper" id="16">' +
      '<content>' +
      '<punctuation role="dummy" id="15">\u2063</punctuation>' +
      '</content>' +
      '<children>' +
      '<number role="integer" font="normal" id="13">4</number>' +
      '<identifier role="latinletter" font="italic" id="14">l</identifier>' +
      '</children>' +
      '</punctuated>' +
      '</children>' +
      '</tensor>',
                   13, '1st Right Superscript');
  this.executeTest('<tensor role="latinletter" id="17">' +
      '<children>' +
      '<identifier role="latinletter" font="italic" id="0">A</identifier>' +
      '<punctuated role="leftsub" id="4">' +
      '<content>' +
      '<punctuation role="dummy" id="3">\u2063</punctuation>' +
      '</content>' +
      '<children>' +
      '<number role="integer" font="normal" id="1">1</number>' +
      '<identifier role="latinletter" font="italic" id="2">i</identifier>' +
      '</children>' +
      '</punctuated>' +
      '<punctuated role="leftsuper" id="8">' +
      '<content>' +
      '<punctuation role="dummy" id="7">\u2063</punctuation>' +
      '</content>' +
      '<children>' +
      '<number role="integer" font="normal" id="5">2</number>' +
      '<identifier role="latinletter" font="italic" id="6">j</identifier>' +
      '</children>' +
      '</punctuated>' +
      '<punctuated role="rightsub" id="12">' +
      '<content>' +
      '<punctuation role="dummy" id="11">\u2063</punctuation>' +
      '</content>' +
      '<children>' +
      '<number role="integer" font="normal" id="9">3</number>' +
      '<identifier role="latinletter" font="italic" id="10">k</identifier>' +
      '</children>' +
      '</punctuated>' +
      '<punctuated role="rightsuper" id="16">' +
      '<content>' +
      '<punctuation role="dummy" id="15">\u2063</punctuation>' +
      '</content>' +
      '<children>' +
      '<number role="integer" font="normal" id="13">4</number>' +
      '<identifier role="latinletter" font="italic" id="14">l</identifier>' +
      '</children>' +
      '</punctuated>' +
      '</children>' +
      '</tensor>',
                   14, '2nd Right Superscript');
};

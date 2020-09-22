// Copyright (c) 2019 Volker Sorge
// Copyright (c) 2019 The MathJax Consortium
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
 * @fileoverview Testcases for collapse speech generation.
 *
 * @author v.sorge@mathjax.org (Volker Sorge)
 */

goog.provide('sre.CollapseRuleTest');

goog.require('sre.AbstractRuleTest');
goog.require('sre.TestRegister');



/**
 * @constructor
 * @extends {sre.AbstractRuleTest}
 */
sre.CollapseRuleTest = function() {
  sre.CollapseRuleTest.base(this, 'constructor');

  /**
   * @override
   */
  this.information = 'Collapse Rule tests.';

  this.domain = 'mathspeak';

};
goog.inherits(sre.CollapseRuleTest, sre.AbstractRuleTest);


/**
 * @override
 */
sre.CollapseRuleTest.prototype.executeRuleTest = function(
    mml, answer, opt_style) {
  mml = '<maction><mtext>action</mtext><mrow data-semantic-id="A">' +
      mml + '</mrow></maction>';
  sre.CollapseRuleTest.base(this, 'executeRuleTest', mml, answer, opt_style);
};


/**
 * @override
 */
sre.CollapseRuleTest.prototype.header = function() {
  var header = sre.CollapseRuleTest.base(this, 'header');
  var script = 'var toggleAll = function() {' +
      'var actions = document.getElementsByClassName(\'maction\');' +
      ' for (var i = 0, action; action = actions[i]; i++) {' +
      '  action.onclick(); } }';
  return header + '<script type="text/javascript">' + script +
      '</script><button onclick="toggleAll()">Toggle All</button>\n';
};


/**
 * @override
 */
sre.CollapseRuleTest.prototype.getSpeech = function(mathMl) {
  var mml = sre.DomUtil.parseInput(mathMl);
  var stree = sre.Semantic.getTree(mml);
  var xml = stree.xml();
  xml.childNodes[0].setAttribute('id', 'A');
  sre.SpeechGeneratorUtil.connectAllMactions(mml, xml);
  var descrs = sre.SpeechGeneratorUtil.computeSpeech(xml);
  return sre.AuralRendering.getInstance().markup(descrs);
};


sre.CollapseRuleTest.tests = function() {
  let files = [
    'collapse_test.json'
  ];
  for (var locale of sre.Variables.LOCALES) {
    for (var file of files) {
      var test = new sre.CollapseRuleTest();
      test.jsonFile = locale + '/mathspeak/' + file;
      test.locale = locale;
      sre.TestRegister.add(test);
    }
  }
};

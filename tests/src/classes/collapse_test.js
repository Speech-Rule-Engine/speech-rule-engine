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

goog.provide('sre.CollapseTest');

goog.require('sre.SpeechTest');



/**
 * @constructor
 * @extends {sre.SpeechTest}
 */
sre.CollapseTest = function() {
  sre.CollapseTest.base(this, 'constructor');

  /**
   * @override
   */
  this.information = 'Collapse Rule tests.';

  this.domain = 'mathspeak';

};
goog.inherits(sre.CollapseTest, sre.SpeechTest);


/**
 * @override
 */
sre.CollapseTest.prototype.executeTest = function(
    mml, answer, opt_style) {
  mml = '<maction><mtext>action</mtext><mrow data-semantic-id="A">' +
      mml + '</mrow></maction>';
  sre.CollapseTest.base(this, 'executeTest', mml, answer, opt_style);
};


/**
 * @override
 */
sre.CollapseTest.prototype.header = function() {
  var header = sre.CollapseTest.base(this, 'header');
  var script = 'var toggleAll = function() {' +
      'var actions = document.getElementsByTagName(\'mjx-maction\');' +
      ' for (var i = 0, action; action = actions[i]; i++) {' +
      '  action.click(); } }';
  return header + '<script type="text/javascript">' + script +
      '</script><button onclick="toggleAll()">Toggle All</button>\n';
};


/**
 * @override
 */
sre.CollapseTest.prototype.getSpeech = function(mathMl) {
  var mml = sre.DomUtil.parseInput(mathMl);
  var stree = sre.Semantic.getTree(mml);
  var xml = stree.xml();
  xml.childNodes[0].setAttribute('id', 'A');
  sre.SpeechGeneratorUtil.connectAllMactions(mml, xml);
  var descrs = sre.SpeechGeneratorUtil.computeSpeech(xml);
  return sre.AuralRendering.getInstance().markup(descrs);
};


/**
 * @override
 */
sre.CollapseTest.prototype.appendRuleExample = function(
  input, output, style, rest) {
  sre.CollapseTest.base(
    this, 'appendRuleExample', input, output, style, [this.domain]);
};

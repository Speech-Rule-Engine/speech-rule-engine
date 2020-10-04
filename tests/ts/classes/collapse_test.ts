/**
 * @fileoverview Testcases for collapse speech generation.
 *
 * @author v.sorge@mathjax.org (Volker Sorge)
 */ 
// Copyright (c) 2019 Volker Sorge 
// Copyright (c) 2019 The MathJax Consortium 
// Licensed under the Apache License, Version 2.0 (the "License"); 
// you may not use this file except in compliance with the License. 
// You may obtain a copy of the License at 
//      http://www.apache.org/licenses/LICENSE-2.0 
// Unless required by applicable law or agreed to in writing, software 
// distributed under the License is distributed on an "AS IS" BASIS, 
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. 
// See the License for the specific language governing permissions and 
// limitations under the License. 




import{SpeechTest}from './speech_test';



export class CollapseTest extends SpeechTest {

  /**
     * @override
     */ 
  information = 'Collapse Rule tests.';

  domain = 'mathspeak';
  constructor() {
    super();
  }


  /**
   * @override
   */ 
  executeTest(
  mml, answer, opt_style) {
    mml = '<maction><mtext>action</mtext><mrow data-semantic-id="A">' + 
    mml + '</mrow></maction>';
    super.executeTest(mml, answer, opt_style);
  }


  /**
   * @override
   */ 
  header() {
    let header = super.header();
    let script = 'var toggleAll = function() {' + 
    'var actions = document.getElementsByClassName(\'maction\');' + 
    ' for (var i = 0, action; action = actions[i]; i++) {' + 
    '  action.onclick(); } }';
    return header + '<script type="text/javascript">' + script + 
    '</script><button onclick="toggleAll()">Toggle All</button>\n';
  }


  /**
   * @override
   */ 
  getSpeech(mathMl) {
    let mml = sretest.TestExternal.sre.DomUtil.parseInput(mathMl);
    let stree = sretest.TestExternal.sre.Semantic.getTree(mml);
    let xml = stree.xml();
    xml.childNodes[0].setAttribute('id', 'A');
    sretest.TestExternal.sre.SpeechGeneratorUtil.connectAllMactions(mml, xml);
    let descrs = sretest.TestExternal.sre.SpeechGeneratorUtil.computeSpeech(xml);
    return sretest.TestExternal.sre.AuralRendering.getInstance().markup(descrs);
  }
}


/**
 * @fileoverview Testcases for prefix speech generation in MathML enrichment.
 *
 * @author v.sorge@mathjax.org (Volker Sorge)
 */ 
//
// Copyright (c) 2016 Volker Sorge 
//
//
// Copyright (c) 2016 The MathJax Consortium 
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



import{SpeechTest}from './speech_test';



export class PrefixTest extends SpeechTest {

  /**
     * @override
     */ 
  information = 'Prefix rule tests.';

  /**
     * @override
     */ 
  modality = 'prefix';

  id:number = 0;

  subExpr:Element = null;
  constructor() {
    super();

    this.pickFields[2] = 'id';
  }


  /**
   * @override
   */ 
  method(var_args) {
    let args = Array.prototype.slice.call(arguments, 0);
    this.id = args[2];
    super.method(args[0], args[1]);
  }


  /**
   * @override
   */ 
  getSpeech(mml) {
    let stree = sre.Semantic.getTreeFromString(mml);
    let node = stree.root.querySelectorAll(
    function(x) {
      return x.id === this.id;
    }.bind(this))[0];
    this.subExpr = node.mathmlTree;
    if (!node) {
      this.assert.fail();
      return '';
    }
    return sre.SpeechGeneratorUtil.retrievePrefix(node);
  }


  /**
   * @override
   */ 
  appendRuleExample(
  input, output, style, rest) {
    let sub = this.subExpr ? '<math>' + this.subExpr.toString() + '</math>' : '';
    super.appendRuleExample(input, output, style, [sub]);
  }
}

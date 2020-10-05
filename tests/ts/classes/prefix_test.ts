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

/**
 * @fileoverview Testcases for prefix speech generation in MathML enrichment.
 *
 * @author v.sorge@mathjax.org (Volker Sorge)
 */

import {sre} from '../base/test_external';
import {SpeechTest} from './speech_test';

export class PrefixTest extends SpeechTest {

  /**
   * @override
   */
  public information = 'Prefix rule tests.';

  /**
   * @override
   */
  public modality = 'prefix';

  public id: number = 0;

  public subExpr: Element = null;

  constructor() {
    super();
    this.pickFields[2] = 'id';
  }

  /**
   * @override
   */
  public method(...args: string[]) {
    this.id = parseInt(args[2], 10);
    super.method(args[0], args[1]);
  }

  /**
   * @override
   */
  public getSpeech(mml: string) {
    let stree = sre.Semantic.getTreeFromString(mml);
    let node = stree.root.querySelectorAll(
      function(x: Element) {
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
  public appendRuleExample(
    input: string, output: string, style: string, ..._rest: string[]) {
    let sub = this.subExpr ?
      '<math>' + this.subExpr.toString() + '</math>' : '';
    super.appendRuleExample(input, output, style, sub);
  }
}

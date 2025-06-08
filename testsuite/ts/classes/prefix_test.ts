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
 * @file Testcases for prefix speech generation in MathML enrichment.
 * @author v.sorge@mathjax.org (Volker Sorge)
 */

import { Engine } from '../../speech-rule-engine/js/common/engine.js';
import * as System from '../../speech-rule-engine/js/common/system.js';
import * as Enrich from '../../speech-rule-engine/js/enrich_mathml/enrich.js';
import { Grammar } from '../../speech-rule-engine/js/rule_engine/grammar.js';
import * as SpeechGeneratorUtil from '../../speech-rule-engine/js/speech_generator/speech_generator_util.js';
import * as Semantic from '../../speech-rule-engine/js/semantic_tree/semantic.js';
import { SemanticNode } from '../../speech-rule-engine/js/semantic_tree/semantic_node.js';
import * as EngineConst from '../../speech-rule-engine/js/common/engine_const.js';

import { SpeechTest } from './speech_test.js';

export class PrefixTest extends SpeechTest {
  /**
   * @override
   */
  public information = 'Prefix rule tests.';

  /**
   * @override
   */
  public modality = 'prefix';

  /**
   * The id of the subnode. Passed on if one is given.
   */
  public id: number = null;

  /**
   * The subexpression for output file.
   */
  public subExpr: Element = null;

  /**
   * @class
   */
  public constructor() {
    super();
    this.pickFields.push('id', 'grammar');
  }

  /**
   * @override
   */
  public async setUpTest() {
    await super.setUpTest();
    return System.setupEngine({ markup: EngineConst.Markup.PUNCTUATION });
  }

  /**
   * @override
   */
  public async tearDownTest() {
    await System.setupEngine({ markup: EngineConst.Markup.NONE });
    return super.tearDownTest();
  }

  /**
   * @override
   */
  public method() {
    this.id =
      this.field('id') === undefined ? null : parseInt(this.field('id'), 10);
    if (this.field('grammar')) {
      Grammar.getInstance().setParameter(this.field('grammar'), true);
    }
    super.method();
    Grammar.getInstance().clear();
  }

  /**
   * @override
   */
  public getSpeech(mml: string) {
    const stree = Semantic.getTreeFromString(mml, Engine.getInstance().options);
    const node = stree.root.querySelectorAll(
      this.id === null
        ? (x: SemanticNode) => x.attributes['extid'] === 'A'
        : (x: SemanticNode) => x.id === this.id
    )[0];
    if (!node) {
      this.assert.fail();
      return '';
    }
    this.subExpr = node.mathmlTree;
    return SpeechGeneratorUtil.retrievePrefix(node);
  }

  /**
   * @override
   */
  public appendRuleExample(
    input: string,
    output: string,
    style: string,
    ..._rest: string[]
  ) {
    const sub = this.subExpr
      ? Enrich.prepareMmlString(this.subExpr.toString())
      : '';
    super.appendRuleExample(input, output, style, sub);
  }
}

export class PrefixMarkupTest extends PrefixTest {

  /**
   * The markup to use.
   */
  public markup: string = EngineConst.Markup.SSML;

  protected automark: boolean = true;

  /**
   * @override
   */
  public async setUpTest() {
    await super.setUpTest();
    return System.setupEngine({
      automark: this.automark,
      cleanpause: false,
      markup: this.markup
    });
  }

  /**
   * @override
   */
  public prepare() {
    super.prepare();
    this.markup = this.jsonTests.markup || this.markup;
    this.automark = this.jsonTests.automark || this.automark;
  }

}

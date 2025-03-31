//
// Copyright 2015-21 Volker Sorge
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
 * @file Abstract speech generator for classes that work on the rebuilt
 *     semantic tree.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import { setup as EngineSetup } from '../common/engine_setup.js';
import * as EnrichAttr from '../enrich_mathml/enrich_attr.js';
import { AxisMap } from '../rule_engine/dynamic_cstr.js';
import { RebuildStree } from '../walker/rebuild_stree.js';
import { SpeechGenerator } from './speech_generator.js';
import * as SpeechGeneratorUtil from './speech_generator_util.js';
import { LOCALE } from '../l10n/locale.js';

export abstract class AbstractSpeechGenerator implements SpeechGenerator {
  /**
   * @override
   */
  public modality: EnrichAttr.Attribute = EnrichAttr.addPrefix('speech');

  private rebuilt_: RebuildStree = null;

  private options_: { [key: string]: string } = {};

  /**
   * @override
   */
  public abstract getSpeech(
    node: Element,
    xml: Element,
    root?: Element
  ): string;

  /**
   * @override
   */
  public getRebuilt() {
    return this.rebuilt_;
  }

  /**
   * @override
   */
  public setRebuilt(rebuilt: RebuildStree) {
    this.rebuilt_ = rebuilt;
  }

  /**
   * @override
   */
  public computeRebuilt(xml: Element, force: boolean = false) {
    if (!this.rebuilt_ || force) {
      this.rebuilt_ = new RebuildStree(xml);
    }
    return this.rebuilt_;
  }

  /**
   * @override
   */
  public setOptions(options: AxisMap) {
    this.options_ = options || {};
    this.modality = EnrichAttr.addPrefix(this.options_.modality || 'speech');
  }

  /**
   * @override
   */
  public setOption(key: string, value: string) {
    const options = this.getOptions();
    options[key] = value;
    this.setOptions(options);
  }

  /**
   * @override
   */
  public getOptions() {
    return this.options_;
  }

  /**
   * @override
   */
  public generateSpeech(_node: Node, xml: Element): string {
    if (!this.rebuilt_) {
      this.rebuilt_ = new RebuildStree(xml);
    }
    EngineSetup(this.options_);
    return SpeechGeneratorUtil.computeMarkup(this.getRebuilt().xml);
  }

  /**
   * @override
   */
  public nextRules() {
    this.setOptions(SpeechGeneratorUtil.nextRules(this.getOptions()));
  }

  /**
   * @override
   */
  public nextStyle(id: string) {
    this.setOption(
      'style',
      SpeechGeneratorUtil.nextStyle(this.getRebuilt().nodeDict[id], this.getOptions()));
  }

  /**
   * @override
   */
  public getLevel(depth: string) {
    return LOCALE.MESSAGES.navigate.LEVEL + ' ' + depth;
  }

  /**
   * @override
   */
  public getActionable(actionable: number) {
    return actionable
      ? actionable < 0
        ? LOCALE.MESSAGES.navigate.EXPANDABLE
        : LOCALE.MESSAGES.navigate.COLLAPSIBLE
      : '';
  }
}

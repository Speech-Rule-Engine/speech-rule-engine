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
import * as EngineConst from '../common/engine_const.js';
import { SemanticNode } from '../semantic_tree/semantic_node.js';
import { LOCALE } from '../l10n/locale.js';

import { ClearspeakPreferences } from '../speech_rules/clearspeak_preferences.js';

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
    const options = this.getOptions();
    // Rule cycling only makes sense for speech modality.
    if (options.modality !== 'speech') {
      return;
    }
    const prefs = ClearspeakPreferences.getLocalePreferences();
    if (!prefs[options.locale]) {
      return;
    }
    EngineConst.DOMAIN_TO_STYLES[options.domain] = options.style;
    options.domain =
      options.domain === 'mathspeak' ? 'clearspeak' : 'mathspeak';
    options.style = EngineConst.DOMAIN_TO_STYLES[options.domain];
    this.setOptions(options);
  }

  /**
   * @override
   */
  public nextStyle(id: string) {
    this.setOption('style', this.nextStyle_(this.getRebuilt().nodeDict[id]));
  }

  /**
   * Cycles to next style or preference of the speech rule set if possible.
   *
   * @param node The semantic node currently in focus.
   * @returns The new style name.
   */
  private nextStyle_(node: SemanticNode): string {
    const {modality: modality, domain: domain, style: style} = this.getOptions();
    // Rule cycling only makes sense for speech modality.
    if (modality !== 'speech') {
      return style;
    }

    if (domain === 'mathspeak') {
      const styles = ['default', 'brief', 'sbrief'];
      const index = styles.indexOf(style);
      if (index === -1) {
        return style;
      }
      return index >= styles.length - 1 ? styles[0] : styles[index + 1];
    }
    if (domain === 'clearspeak') {
      const prefs = ClearspeakPreferences.getLocalePreferences();
      const loc = prefs['en'];
      // TODO: use correct locale.
      if (!loc) {
        return 'default';
      }
      // TODO: return the previous one?
      const smart = ClearspeakPreferences.relevantPreferences(node);
      const current = ClearspeakPreferences.findPreference(style, smart);
      const options = loc[smart].map(function (x) {
        return x.split('_')[1];
      });
      const index = options.indexOf(current);
      if (index === -1) {
        return style;
      }
      const next =
        index >= options.length - 1 ? options[0] : options[index + 1];
      const result = ClearspeakPreferences.addPreference(style, smart, next);
      return result;
    }
    return style;
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
    return actionable ? (
      actionable < 0 ? LOCALE.MESSAGES.navigate.EXPANDABLE :
        LOCALE.MESSAGES.navigate.COLLAPSIBLE
    ) : '';
  }

  /**
   * @override
   */
  public getSpeechStructure(_node: Element, _xml: Element, _root: Element = null) {
    return {};
  }
}

//
// Copyright 2025-25 Volker Sorge
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may tain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @file Options object for controlling engine behaviour.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import * as EngineConst from './engine_const.js';
import * as Dcstr from '../rule_engine/dynamic_cstr.js';

export class Options {

  /**
   * Binary feature vector.
   */
  public static BINARY_FEATURES: string[] = [
    'automark',
    'mark',
    'character',
    'cleanpause',
    'strict',
    'structure',
    'aria',
    'pprint',
    'cayleyshort',
    'linebreaks',
    'tree'
  ];

  /**
   * String feature vector.
   */
  public static STRING_FEATURES: string[] = [
    'markup',
    'style',
    'domain',
    'speech',
    'walker',
    'locale',
    'delay',
    'modality',
    'rate',
    'rules',
    'subiso',
    'prune'
  ];

  /**
   * Delay flag, to avoid auto setup of engine.
   */
  public delay = false;

  /**
   * Current domain.
   */
  public domain = 'mathspeak';

  /**
   * Current style.
   */
  public style = Dcstr.DynamicCstr.DEFAULT_VALUES[Dcstr.Axis.STYLE];

  /**
   * Current locale.
   */
  public locale = Dcstr.DynamicCstr.DEFAULT_VALUES[Dcstr.Axis.LOCALE];

  /**
   * Current subiso for the locale.
   */
  public subiso = '';

  /**
   * Current modality.
   */
  public modality = Dcstr.DynamicCstr.DEFAULT_VALUES[Dcstr.Axis.MODALITY];

  /**
   * The level to which speech attributes are added to enriched elements
   * (none, shallow, deep).
   */
  public speech: EngineConst.Speech = EngineConst.Speech.NONE;

  /**
   * Caching during speech generation.
   */
  public markup: EngineConst.Markup = EngineConst.Markup.NONE;

  // Markup options
  public mark = true;
  /**
   * Automatic marking of elements for spans.
   */
  public automark = false;
  public character = true;
  public cleanpause = true;

  /**
   * Nemeth layout options
   */
  public cayleyshort = true;
  public linebreaks = false;

  /**
   * Percentage of default rate used by external TTS. This can be used to scale
   * pauses.
   */
  public rate = '100';

  /**
   * Current walker mode.
   */
  public walker = 'Table';

  /**
   * Indicates if skeleton structure attributes are added to enriched elements
   */
  public structure = false;
  public aria = false;
  public tree = false;

  /**
   * Strict interpretations of rules and constraints.
   */
  public strict = false;

  /**
   * Pretty Print mode.
   */
  public pprint = false;

  /**
   * Rules file to load.
   */
  public rules = '';

  /**
   * EngineConstraints to prune given dot separated.
   */
  public prune = '';

  constructor(options: {[key: string]: boolean | string} = {}) {
    this.set(options);
  }

  set(options: {[key: string]: boolean | string}) {
    this.ensureDomain(options);
    for (const [option, value] of Object.entries(options)) {
      if (Options.BINARY_FEATURES.includes(option) || Options.STRING_FEATURES.includes(option)) {
        (this as any)[option] = value;
        continue;
      }
    }
  }

  json(): {[key: string]: boolean | string} {
    const features: { [key: string]: string | boolean } = {};
    const engineFeatures = [].concat(
      Options.STRING_FEATURES,
      Options.BINARY_FEATURES
    );
    engineFeatures.forEach(x => features[x] = (this as any)[x]);
    return features;
  }

  /**
   * Ensures that the domain and preference/style combination in a given feature
   * vector actually exists.
   *
   * @param feature The current SRE feature vector.
   */
  private ensureDomain(feature: { [key: string]: boolean | string }) {
    // This preserves the possibility to specify default as domain.
    // < 3.2  this lead to the use of chromevox rules in English.
    // >= 3.2 this defaults to Mathspeak. It also ensures that in other locales
    // we get a meaningful output.
    if (
      (feature.modality && feature.modality !== 'speech') ||
        (!feature.modality && this.modality !== 'speech')
    ) {
      return;
    }
    if (!feature.domain && !feature.locale) {
      return;
    }
    if (feature.domain === 'default') {
      feature.domain = 'mathspeak';
      return;
    }
    const locale = (feature.locale || this.locale) as string;
    const domain = (feature.domain || this.domain) as string;
    if (MATHSPEAK_ONLY.indexOf(locale) !== -1 && domain !== 'mathspeak') {
      feature.domain = 'mathspeak';
      return;
    }
    if (locale === 'en') {
      if (EN_RULES.indexOf(domain) === -1) {
        feature.domain = 'mathspeak';
      }
      return;
    }
    if (domain !== 'mathspeak' && domain !== 'clearspeak') {
      feature.domain = 'mathspeak';
    }
  }

}

const MATHSPEAK_ONLY: string[] = ['ca', 'da', 'es'];

const EN_RULES: string[] = [
  'chromevox',
  'clearspeak',
  'mathspeak',
  'emacspeak',
  'html'
];

//
// Copyright 2014-21 Volker Sorge
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
 * @file Basic parameters and global machinery for the Speech Rule
 *     Engine.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import { AuditoryDescription } from '../audio/auditory_description.js';
import * as Dcstr from '../rule_engine/dynamic_cstr.js';
import * as EngineConst from './engine_const.js';

import { Debugger } from './debugger.js';
import { Variables } from './variables.js';

export type SreFeature = {
  [key: string]: any;
};

declare const SREfeature: SreFeature;

/**
 * The base error class for signaling SRE errors.
 *
 * @param msg The error message.
 */
export class SREError extends Error {
  /**
   * @override
   */
  public name = 'SRE Error';

  /**
   * @param message The error Message.
   */
  constructor(public message: string = '') {
    super();
  }
}

/**
 * Initializes the basic Speech engine and contains some global context.
 *
 */
export class Engine {
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
    'linebreaks'
  ];

  /**
   * Binary feature vector.
   */
  public binaryFeatures: Map<string, boolean> = new Map([
    // Markup options
    ['mark', true],
    ['automark', false], // Automatic marking of elements for spans.
    ['character', true],
    ['cleanpause', true],
    ['strict', false], // Strict interpretations of rules and constraints.
    // Enrichment options
    ['structure', false], // Skeleton structure attributes are added
    ['aria', false], // Aria attributes are added
    ['pprint', false], // Pretty Print mode
    // Nemeth layout options
    ['cayleyshort', true],
    ['linebreaks', false]
  ]);

  /**
   * String feature vector.
   */
  public static STRING_FEATURES: string[] = [
    'markup',
    'style',
    'domain',
    'speech',
    'walker',
    'defaultLocale',
    'locale',
    'modality',
    'rate',
    'rules',
    'subiso',
    'prune'
  ];

  /**
   * String feature vector.
   */
  public stringFeatures: Map<string, string> = new Map([
    ['markup', EngineConst.Markup.NONE], // EngineConst.Markup
    ['style', Dcstr.DynamicCstr.DEFAULT_VALUES[Dcstr.Axis.STYLE]],
    ['domain', 'mathspeak'],
    // The level to which speech attributes are added to enriched elements
    // (none, shallow, deep).
    ['speech', EngineConst.Speech.NONE], // EngineConst.Speech
    // Current walker mode.
    ['walker', 'Table'],
    ['defaultLocale', Dcstr.DynamicCstr.DEFAULT_VALUES[Dcstr.Axis.LOCALE]],
    ['locale', Dcstr.DynamicCstr.DEFAULT_VALUES[Dcstr.Axis.LOCALE]],
    ['modality', Dcstr.DynamicCstr.DEFAULT_VALUES[Dcstr.Axis.MODALITY]],
    // Percentage of default rate used by external TTS. This can be used to
    // scale pauses.
    ['rate', '100'],
    // Rules file to load.
    ['rules', ''],
    ['subiso', ''],
    // EngineConstraints to prune given dot separated.
    ['prune', '']
  ]);

  public getFeature(feature: string): string | boolean {
    const str = this.stringFeatures.get(feature);
    if (str !== undefined) {
      return str;
    }
    return this.binaryFeatures.get(feature);
  }

  public setFeature(feature: string, value: string | boolean) {
    if (typeof value === 'string') {
      if (feature === 'defaultLocale') {
        value = Variables.ensureLocale(
          value,
          this.stringFeatures.get('defaultLocale')
        );
      }
      this.stringFeatures.set(feature, value);
    } else {
      this.binaryFeatures.set(feature, value);
    }
  }

  // TODO (TS): Keeping this as a singleton for the time being.
  private static instance: Engine;

  /**
   * Custom loader. Promise resolves after load, rejects when something goes
   * wrong.
   */
  public customLoader: (locale: string) => Promise<string> = null;

  public evaluator: (p1: string, p2: Dcstr.DynamicCstr) => string | null;

  public defaultParser: Dcstr.DynamicCstrParser;
  public parser: Dcstr.DynamicCstrParser;
  public parsers: { [key: string]: Dcstr.DynamicCstrParser } = {};

  public dynamicCstr: Dcstr.DynamicCstr;

  public comparator: Dcstr.Comparator = null;

  /**
   * The mode in which the engine is running (sync, async, http).
   */
  public mode: EngineConst.Mode = EngineConst.Mode.SYNC;

  /**
   * Init flag, initially set true. Set to false after first setup.
   */
  public init = true;

  /**
   * Delay flag, to avoid auto setup of engine.
   */
  public delay = false;

  /**
   * Maps domains to comparators.
   */
  public comparators: { [key: string]: () => Dcstr.Comparator } = {};

  /**
   * List of rule sets given as the constructor functions.
   */
  public ruleSets: string[] = [];

  /**
   * Current browser is MS Internet Explorer but not Edge.
   */
  public isIE = false;

  /**
   * Current browser is MS Edge.
   */
  public isEdge = false;

  /**
   * True if configuration block has been applied in HTTP mode.
   */
  private config = false;

  /**
   *
   */
  public rules = '';

  /**
   *
   */
  public prune = '';

  // TODO(cc): This is temporary until we have a full options object passed
  //           around.
  public counter = 0;

  /**
   * @returns The Engine object.
   */
  public static getInstance(): Engine {
    Engine.instance = Engine.instance || new Engine();
    return Engine.instance;
  }

  /**
   * A dummy string evaluator.
   *
   * @param str A string.
   * @param _cstr A dynamic constraint.
   * @returns The evaluated string.
   */
  public static defaultEvaluator(
    str: string,
    _cstr: Dcstr.DynamicCstr
  ): string {
    return str;
  }

  public static nodeEvaluator: (node: Element) => AuditoryDescription[] =
    function (_node: Element) {
      return [];
    };

  public static evaluateNode(node: Element) {
    return Engine.nodeEvaluator(node);
  }

  // TODO: This might need a better place.
  /**
   * @returns The current base rate.
   */
  public getRate(): number {
    const numeric = parseInt(this.stringFeatures.get('rate'), 10);
    return isNaN(numeric) ? 100 : numeric;
  }

  /**
   * Sets the dynamic constraint for the engine.
   *
   * @param opt_dynamic An optional
   *    constraint mapping. If given it is parsed into the engines constraint
   *    parameters.
   */
  public setDynamicCstr(opt_dynamic?: Dcstr.AxisMap) {
    if (this.stringFeatures.get('defaultLocale')) {
      Dcstr.DynamicCstr.DEFAULT_VALUES[Dcstr.Axis.LOCALE] =
        this.stringFeatures.get('defaultLocale');
    }
    if (opt_dynamic) {
      const keys = Object.keys(opt_dynamic);
      for (let i = 0; i < keys.length; i++) {
        const feature = keys[i] as Dcstr.Axis;
        // Checks that we only have correct components.
        if (Dcstr.DynamicCstr.DEFAULT_ORDER.indexOf(feature) !== -1) {
          const value = opt_dynamic[feature];
          // TODO (TS): Make these features cleaner.
          this.stringFeatures.set(feature, value);
        }
      }
    }
    EngineConst.DOMAIN_TO_STYLES[this.stringFeatures.get('domain')] =
      this.stringFeatures.get('style');
    const dynamic = [
      this.stringFeatures.get('locale'),
      this.stringFeatures.get('modality'),
      this.stringFeatures.get('domain'),
      this.stringFeatures.get('style')
    ].join('.');
    const fallback = Dcstr.DynamicProperties.createProp(
      [Dcstr.DynamicCstr.DEFAULT_VALUES[Dcstr.Axis.LOCALE]],
      [Dcstr.DynamicCstr.DEFAULT_VALUES[Dcstr.Axis.MODALITY]],
      [Dcstr.DynamicCstr.DEFAULT_VALUES[Dcstr.Axis.DOMAIN]],
      [Dcstr.DynamicCstr.DEFAULT_VALUES[Dcstr.Axis.STYLE]]
    );
    const comparator = this.comparators[this.stringFeatures.get('domain')];
    const parser = this.parsers[this.stringFeatures.get('domain')];
    this.parser = parser ? parser : this.defaultParser;
    this.dynamicCstr = this.parser.parse(dynamic);
    this.dynamicCstr.updateProperties(fallback.getProperties());
    this.comparator = comparator
      ? comparator()
      : new Dcstr.DefaultComparator(this.dynamicCstr);
  }

  /**
   * Private constructor.
   */
  private constructor() {
    this.stringFeatures.set('locale', this.stringFeatures.get('defaultLocale'));
    this.evaluator = Engine.defaultEvaluator;
    this.defaultParser = new Dcstr.DynamicCstrParser(
      Dcstr.DynamicCstr.DEFAULT_ORDER
    );
    this.parser = this.defaultParser;
    this.dynamicCstr = Dcstr.DynamicCstr.defaultCstr();
  }

  /**
   * The actual configuration method.
   *
   * @param feature An object describing some setup features.
   */
  public configurate(feature: { [key: string]: boolean | string }) {
    if (this.mode === EngineConst.Mode.HTTP && !this.config) {
      configBlocks(feature);
      this.config = true;
    }
    configFeature(feature);
  }

  /**
   * Sets the custom loader.
   *
   * @param fn A custom loader function.
   */
  public setCustomLoader(fn: any) {
    if (fn) {
      this.customLoader = fn;
    }
  }

  public engineSetup(): { [key: string]: boolean | string } {
    const features: { [key: string]: string | boolean } = {
      'mode': this.mode
    };
    Engine.BINARY_FEATURES.forEach(function (x) {
      features[x] = this.binaryFeatures.get(x);
    });
    Engine.STRING_FEATURES.forEach(function (x) {
      features[x] = this.stringFeatures.get(x);
    });
    return features;
  }
}

/**
 * Reads configuration blocks and adds them to the feature vector.
 *
 * @param feature An object describing some setup features.
 */
function configFeature(feature: { [key: string]: boolean | string }) {
  if (typeof SREfeature !== 'undefined') {
    for (const [name, feat] of Object.entries(SREfeature)) {
      feature[name] = feat;
    }
  }
}

/**
 * Reads configuration blocks and adds them to the feature vector.
 *
 * @param feature An object describing some setup features.
 */
function configBlocks(feature: { [key: string]: boolean | string }) {
  const scripts = document.documentElement.querySelectorAll(
    'script[type="text/x-sre-config"]'
  );
  for (let i = 0, m = scripts.length; i < m; i++) {
    let inner;
    try {
      inner = scripts[i].innerHTML;
      const config: { [key: string]: boolean | string } = JSON.parse(inner);
      for (const [key, val] of Object.entries(config)) {
        feature[key] = val;
      }
    } catch (err) {
      Debugger.getInstance().output('Illegal configuration ', inner);
    }
  }
}

export class EnginePromise {
  /**
   * Records if a locale is loaded or failed to load. Value one indicates that
   * loading has been attempted and finished, while value two indicates if it
   * was successful or not.
   */
  public static loaded: { [locale: string]: [boolean, boolean] } = {};

  /**
   * Records the loading promises for each locale.
   */
  public static promises: { [locale: string]: Promise<string> } = {};

  /**
   * Gets a promise for a locale.
   *
   * @param locale The locale to retrieve.
   * @returns The promise for a locale.
   */
  public static get(
    locale: string = Engine.getInstance().stringFeatures.get('locale')
  ): Promise<string> {
    return EnginePromise.promises[locale] || Promise.resolve('');
  }

  /**
   * @returns All promises combined into one.
   */
  public static getall() {
    return Promise.all(Object.values(EnginePromise.promises));
  }
}

/**
 *
 */
export function enginePromise() {
  return EnginePromise.getall();
}

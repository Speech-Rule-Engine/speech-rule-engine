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

import * as Dcstr from '../rule_engine/dynamic_cstr';
import * as EngineConst from './engine_const';

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
export default class Engine {
  /**
   * Binary feature vector.
   */
  public static BINARY_FEATURES: string[] = ['strict', 'structure', 'pprint'];

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
    'modality',
    'rate',
    'rules',
    'prune'
  ];

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
   * Maps domains to comparators.
   */
  public comparators: { [key: string]: () => Dcstr.Comparator } = {};

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

  /**
   * Current walker mode.
   */
  public walker = 'Table';

  /**
   * Indicates if skeleton structure attributes are added to enriched elements
   */
  public structure = false;

  /**
   * List of rule sets given as the constructor functions.
   */
  public ruleSets: string[] = [];

  /**
   * Strict interpretations of rules and constraints.
   */
  public strict = false;

  /**
   * Current browser is MS Internet Explorer but not Edge.
   */
  public isIE = false;

  /**
   * Current browser is MS Edge.
   */
  public isEdge = false;

  /**
   * Percentage of default rate used by external TTS. This can be used to scale
   * pauses.
   */
  public rate = '100';

  /**
   * Pretty Print mode.
   */
  public pprint = false;

  /**
   * True if configuration block has been applied in HTTP mode.
   */
  public config = false;

  /**
   * Rules file to load.
   */
  public rules = '';

  /**
   * EngineConstraints to prune given dot separated.
   */
  public prune = '';

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
   * @param cstr A dynamic constraint.
   * @param _cstr
   * @returns The evaluated string.
   */
  public static defaultEvaluator(
    str: string,
    _cstr: Dcstr.DynamicCstr
  ): string {
    return str;
  }

  // TODO: This might need a better place.
  /**
   * @returns The current base rate.
   */
  public getRate(): number {
    const numeric = parseInt(this.rate, 10);
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
    if (opt_dynamic) {
      const keys = Object.keys(opt_dynamic);
      for (let i = 0; i < keys.length; i++) {
        const feature = keys[i] as Dcstr.Axis;
        // Checks that we only have correct components.
        if (Dcstr.DynamicCstr.DEFAULT_ORDER.indexOf(feature) !== -1) {
          const value = opt_dynamic[feature];
          // TODO (TS): Make these features cleaner.
          (this as any)[feature] = value;
        }
      }
    }
    EngineConst.DOMAIN_TO_STYLES[this.domain] = this.style;
    const dynamic = [this.locale, this.modality, this.domain, this.style].join(
      '.'
    );
    const fallback = Dcstr.DynamicProperties.createProp(
      [Dcstr.DynamicCstr.DEFAULT_VALUES[Dcstr.Axis.LOCALE]],
      [Dcstr.DynamicCstr.DEFAULT_VALUES[Dcstr.Axis.MODALITY]],
      [Dcstr.DynamicCstr.DEFAULT_VALUES[Dcstr.Axis.DOMAIN]],
      [Dcstr.DynamicCstr.DEFAULT_VALUES[Dcstr.Axis.STYLE]]
    );
    const comparator = this.comparators[this.domain];
    const parser = this.parsers[this.domain];
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
    this.evaluator = Engine.defaultEvaluator;
    this.defaultParser = new Dcstr.DynamicCstrParser(
      Dcstr.DynamicCstr.DEFAULT_ORDER
    );
    this.parser = this.defaultParser;
    this.dynamicCstr = Dcstr.DynamicCstr.defaultCstr();
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
   * @param locale
   * @returns The promise for a locale.
   */
  public static get(
    locale: string = Engine.getInstance().locale
  ): Promise<string> {
    return EnginePromise.promises[locale] || Promise.resolve('');
  }

  /**
   * @returns All promises combined into one.
   */
  public static getall() {
    return Promise.allSettled(Object.values(EnginePromise.promises));
  }
}

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
import { EngineFeatures } from './engine_features.js';
import { EngineFixtures } from './engine_fixtures.js';
import { EngineOptions } from './engine_options.js';

import { Debugger } from './debugger.js';
// import { Variables } from './variables.js';

export type SreFeature = {
  [key: string]: any;
};

declare const SREfeature: SreFeature;

/**
 * Initializes the basic Speech engine and contains some global context.
 *
 */
export class Engine {

  public options: EngineOptions = new EngineOptions();

  public features: EngineFeatures = new EngineFeatures();

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
   * Maps domains to comparators.
   */
  public comparators: { [key: string]: () => Dcstr.Comparator } = {};

  /**
   * List of rule sets given as the constructor functions.
   */
  public ruleSets: string[] = [];

  // TODO(cc): This should only be called once and move to fixtures.
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
  // public counter = 0;

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
    const numeric = parseInt(this.features.getString(
      EngineConst.Features.RATE), 10);
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
    if (this.features.is(EngineConst.Features.DEFAULTLOCALE)) {
      EngineFeatures.setDefault(
        EngineConst.Axis.LOCALE,
        this.features.get(EngineConst.Features.DEFAULTLOCALE));
    }
    if (opt_dynamic) {
      const keys = Object.keys(opt_dynamic);
      for (let i = 0; i < keys.length; i++) {
        const feature = keys[i] as EngineConst.Axis;
        // Checks that we only have correct components.
        if (Dcstr.DynamicCstr.DEFAULT_ORDER.indexOf(feature) !== -1) {
          const value = opt_dynamic[feature];
          // TODO (TS): Make these features cleaner.
          this.features.set(feature, value);
        }
      }
    }
    EngineConst.DomainToStyles[this.features.getString(EngineConst.Axis.DOMAIN)] =
      this.features.getString(EngineConst.Axis.STYLE);
    const dynamic = [
      this.features.get(EngineConst.Axis.LOCALE),
      this.features.get(EngineConst.Axis.MODALITY),
      this.features.get(EngineConst.Axis.DOMAIN),
      this.features.get(EngineConst.Axis.STYLE)
    ].join('.');
    const fallback = Dcstr.DynamicProperties.createProp(
      [EngineFeatures.getDefaultString(EngineConst.Axis.LOCALE)],
      [EngineFeatures.getDefaultString(EngineConst.Axis.MODALITY)],
      [EngineFeatures.getDefaultString(EngineConst.Axis.DOMAIN)],
      [EngineFeatures.getDefaultString(EngineConst.Axis.STYLE)]
    );
    const comparator = this.comparators[this.features.getString(EngineConst.Axis.DOMAIN)];
    const parser = this.parsers[this.features.getString(EngineConst.Axis.DOMAIN)];
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
    this.features.set(
      EngineConst.Axis.LOCALE, this.features.get(EngineConst.StringFeatures.DEFAULTLOCALE));
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
    if (EngineFixtures.getInstance().mode === EngineConst.Mode.HTTP && !this.config) {
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
    const features: { [key: string]: string | boolean } = this.features.summary();
    features['mode'] = EngineFixtures.getInstance().mode;
    return features;
  }
}

// TODO(cc): This should only be called once and move to fixtures.
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
    locale: string = Engine.getInstance().features.getString(EngineConst.Axis.LOCALE)
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

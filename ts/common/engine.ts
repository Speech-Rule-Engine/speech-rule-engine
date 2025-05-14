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
import * as FileUtil from './file_util.js';
import { SystemExternal } from './system_external.js';

import { Debugger } from './debugger.js';
import { Variables } from './variables.js';
import { Options } from './options.js';

declare const SREfeature: { [key: string]: any };

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
   * The basic SRE Error class.
   *
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

  public options: Options = new Options();
  
  /**
   * True if configuration block has been applied in HTTP mode.
   */
  public config = false;

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
   * Maps domains to comparators.
   */
  public comparators: { [key: string]: () => Dcstr.Comparator } = {};

  /**
   * The default locale.
   */
  private _defaultLocale = Dcstr.DynamicCstr.DEFAULT_VALUES[Dcstr.Axis.LOCALE];

  /**
   * Sets the default locale for SRE.
   */
  public set defaultLocale(loc: string) {
    this._defaultLocale = Variables.ensureLocale(loc, this._defaultLocale);
  }

  /**
   * @returns The current default locale for SRE.
   */
  public get defaultLocale() {
    return this._defaultLocale;
  }

  /**
   * Current browser is MS Internet Explorer but not Edge.
   */
  public isIE = false;

  /**
   * Current browser is MS Edge.
   */
  public isEdge = false;

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

  /**
   * @param node An XML element.
   * @returns The auditory descriptions after evaluating the node in SRE.
   */
  public static evaluateNode(node: Element) {
    return Engine.nodeEvaluator(node);
  }

  // TODO: This might need a better place.
  /**
   * @returns The current base rate.
   */
  public getRate(): number {
    const numeric = parseInt(this.options.rate, 10);
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
    if (this.defaultLocale) {
      Dcstr.DynamicCstr.DEFAULT_VALUES[Dcstr.Axis.LOCALE] = this.defaultLocale;
    }
    if (opt_dynamic) {
      const keys = Object.keys(opt_dynamic);
      for (let i = 0; i < keys.length; i++) {
        const feature = keys[i] as Dcstr.Axis;
        // Checks that we only have correct components.
        if (Dcstr.DynamicCstr.DEFAULT_ORDER.indexOf(feature) !== -1) {
          const value = opt_dynamic[feature];
          // TODO (TS): Make these features cleaner.
          (this.options as any)[feature] = value;
        }
      }
    }
    EngineConst.DOMAIN_TO_STYLES[this.options.domain] = this.options.style;
    const dynamic = [this.options.locale, this.options.modality, this.options.domain, this.options.style].join(
      '.'
    );
    const fallback = Dcstr.DynamicProperties.createProp(
      [Dcstr.DynamicCstr.DEFAULT_VALUES[Dcstr.Axis.LOCALE]],
      [Dcstr.DynamicCstr.DEFAULT_VALUES[Dcstr.Axis.MODALITY]],
      [Dcstr.DynamicCstr.DEFAULT_VALUES[Dcstr.Axis.DOMAIN]],
      [Dcstr.DynamicCstr.DEFAULT_VALUES[Dcstr.Axis.STYLE]]
    );
    const comparator = this.comparators[this.options.domain];
    const parser = this.parsers[this.options.domain];
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
    this.options.locale = this.defaultLocale;
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
    if (
      this.mode === EngineConst.Mode.HTTP &&
      !SystemExternal.webworker &&
      !this.config
    ) {
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

  /**
   * Method to setup the basic engine parameters and options.
   *
   * @param feature An object describing some setup features.
   */
  public setup(feature: { [key: string]: boolean | string }) {
    // Setting mode first!
    if (typeof feature['mode'] !== 'undefined') {
      this.mode = feature['mode'] as EngineConst.Mode;
    }
    this.configurate(feature);
    this.options.set(feature);
    if (feature.json) {
      SystemExternal.jsonPath = FileUtil.makePath(feature.json as string);
    }
    if (feature.xpath) {
      SystemExternal.WGXpath = feature.xpath as string;
    }
    this.setCustomLoader(feature.custom);
  }

  /**
   * Query the engine setup.
   *
   * @returns Overview of engine setup as a JSON dictionary.
   */
  public json(): { [key: string]: boolean | string } {
    return Object.assign({'mode': this.mode}, this.options.json());
  }

  /**
   * Reset the engine options. This excludes computed elements like mode,
   * comparators etc.
   */
  public reset() {
    this.options = new Options();
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
    } catch (_err) {
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
    locale: string = Engine.getInstance().options.locale
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

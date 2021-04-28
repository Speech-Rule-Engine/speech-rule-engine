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
 * @fileoverview Basic parameters and global machinery for the Speech Rule
 *     Engine.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */


import * as Dcstr from '../rule_engine/dynamic_cstr';
import * as BrowserUtil from './browser_util';


/**
 * Initializes the basic Speech engine and contains some global context.
 *
 */
export class Engine {

  /**
   * Binary feature vector.
   */
  public static BINARY_FEATURES: string[] = ['strict', 'structure', 'pprint'];


  /**
   * String feature vector.
   */
  public static STRING_FEATURES: string[] = [
    'markup', 'style', 'domain', 'speech', 'walker', 'locale', 'modality',
    'rate', 'rules', 'prune'
  ];

  // TODO (TS): Keeping this as a singleton for the time being.
  private static instance: Engine;

  public evaluator: (p1: string, p2: Dcstr.DynamicCstr) => string | null;

  public defaultParser: Dcstr.DynamicCstrParser;
  public parser: Dcstr.DynamicCstrParser;
  public parsers: {[key: string]: Dcstr.DynamicCstrParser} = {};

  public dynamicCstr: Dcstr.DynamicCstr;

  public comparator: Dcstr.Comparator = null;

  /**
   * Maps domains to comparators.
   */
  public comparators: {[key: string]: () => Dcstr.Comparator} = {};

  /**
   * Current domain.
   */
  public domain: string = 'mathspeak';

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
   * The mode in which the engine is running (sync, async, http).
   */
  public mode: EngineConst.Mode = EngineConst.Mode.SYNC;

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
  public walker: string = 'Table';

  /**
   * Indicates if skeleton structure attributes are added to enriched elements
   */
  public structure: boolean = false;

  /**
   * List of rule sets given as the constructor functions.
   */
  public ruleSets: string[] = [];

  /**
   * Strict interpretations of rules and constraints.
   */
  public strict: boolean = false;

  /**
   * Current browser is MS Internet Explorer but not Edge.
   */
  public isIE: boolean = false;

  /**
   * Current browser is MS Edge.
   */
  public isEdge: boolean = false;

  /**
   * Percentage of default rate used by external TTS. This can be used to scale
   * pauses.
   */
  public rate: string = '100';

  /**
   * Pretty Print mode.
   */
  public pprint: boolean = false;

  /**
   * True if configuration block has been applied in HTTP mode.
   */
  public config: boolean = false;

  /**
   * Rules file to load.
   */
  public rules: string = '';

  /**
   * Constraints to prune given dot separated.
   */
  public prune: string = '';

  /**
   * List of predicates for checking if the engine is set up.
   */
  private setupTests_: (() => boolean)[] = [];

  /**
   * @return The Engine object.
   */
  public static getInstance(): Engine {
    Engine.instance = Engine.instance || new Engine();
    return Engine.instance;
  }

  /**
   * A dummy string evaluator.
   * @param str A string.
   * @param cstr A dynamic constraint.
   * @return The evaluated string.
   */
  public static defaultEvaluator(
    str: string, _cstr: Dcstr.DynamicCstr): string {
    return str;
  }


  /**
   * Registers a predicate to test whether the setup of the engine is complete.
   * The basic idea is that different parts of the system that run
   * asynchronously can register a test here and the engine can check if it is
   * set up without the need to know which bits actually run asynchronously.
   * @param pred A predicate that takes no input and returns
   *     a boolean value.
   */
  public static registerTest(pred: () => boolean) {
    Engine.getInstance().setupTests_.push(pred);
  }


  /**
   * Test to see if the engine is fully setup. Important for async and http
   * mode.
   * @return True if the engine has completed its setup.
   */
  public static isReady(): boolean {
    return Engine.getInstance().setupTests_.every(function(pred) {
      return pred();
    });
  }


  /**
   * Sets up browser specific functionality.
   */
  public setupBrowsers() {
    this.isIE = BrowserUtil.detectIE();
    this.isEdge = BrowserUtil.detectEdge();
  }


  /**
   * @return The sets of values
   *     for all constraint attributes.
   */
  public getAxisValues(): Dcstr.AxisProperties {
    return Dcstr.DynamicCstr.getAxisValues();
  }


  // TODO: This might need a better place.
  /**
   * @return The current base rate.
   */
  public getRate(): number {
    let numeric = parseInt(this.rate, 10);
    return isNaN(numeric) ? 100 : numeric;
  }


  /**
   * Sets the dynamic constraint for the engine.
   * @param opt_dynamic An optional
   *    constraint mapping. If given it is parsed into the engines constraint
   *    parameters.
   */
  public setDynamicCstr(opt_dynamic?: Dcstr.AxisMap) {
    if (opt_dynamic) {
      let keys = Object.keys(opt_dynamic);
      for (let i = 0; i < keys.length; i++) {
        let feature = (keys[i] as Dcstr.Axis);
        // Checks that we only have correct components.
        if (Dcstr.DynamicCstr.DEFAULT_ORDER.indexOf(feature) !== -1) {
          let value = opt_dynamic[feature];
          // TODO (TS): Make these features cleaner.
          (this as any)[feature] = value;
        }
      }
    }
    EngineConst.DOMAIN_TO_STYLES[this.domain] = this.style;
    let dynamic =
        [this.locale, this.modality, this.domain, this.style].join('.');
    let fallback = Dcstr.DynamicProperties.createProp(
        [Dcstr.DynamicCstr.DEFAULT_VALUES[Dcstr.Axis.LOCALE]],
        [Dcstr.DynamicCstr.DEFAULT_VALUES[Dcstr.Axis.MODALITY]],
        [Dcstr.DynamicCstr.DEFAULT_VALUES[Dcstr.Axis.DOMAIN]],
        [Dcstr.DynamicCstr.DEFAULT_VALUES[Dcstr.Axis.STYLE]]);
    let comparator = this.comparators[this.domain];
    let parser = this.parsers[this.domain];
    this.parser = parser ? parser : this.defaultParser;
    this.dynamicCstr = this.parser.parse(dynamic);
    this.dynamicCstr.updateProperties(fallback.getProperties());
    this.comparator = comparator ?
        comparator() :
        new Dcstr.DefaultComparator(this.dynamicCstr);
  }

  /**
   * Private constructor.
   */
  private constructor() {
    this.evaluator = Engine.defaultEvaluator;
    this.defaultParser =
        new Dcstr.DynamicCstrParser(Dcstr.DynamicCstr.DEFAULT_ORDER);
    this.parser = this.defaultParser;
    this.dynamicCstr = Dcstr.DynamicCstr.defaultCstr();
  }

}


/**
 *  Namespace for all Engine enum constants.
 */
export namespace EngineConst {

  /**
   * Defines the modes in which the engine can run.
   */
  export enum Mode {
    SYNC = 'sync',
    ASYNC = 'async',
    HTTP = 'http'
  }

  /**
   * Defines the basic personality Properties available.
   */
  export enum personalityProps {
    PITCH = 'pitch',
    RATE = 'rate',
    VOLUME = 'volume',
    PAUSE = 'pause',
    JOIN = 'join'
  }


  /**
   * Defines to what level the engine enriches expressions with speech string
   * attributes.
   */
  export enum Speech {NONE = 'none', SHALLOW = 'shallow', DEEP = 'deep'}


  /**
   * Different markup formats for the speech output.
   * Not all are supported yet.
   */
  export enum Markup {
    NONE = 'none',
    PUNCTUATION = 'punctuation',
    SSML = 'ssml',
    SSML_STEP = 'ssml_step',
    ACSS = 'acss',
    SABLE = 'sable',
    VOICEXML = 'voicexml'
  }

  /**
   * Maps domains to their default style.
   */
  export const DOMAIN_TO_STYLES: {[key: string]: string} = {
    'mathspeak': 'default',
    'clearspeak': 'default'
  };

}


/**
 * The base error class for signaling SRE errors.
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

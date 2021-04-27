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


import * as DynamicCstrExports from '../rule_engine/dynamic_cstr';
import {DynamicCstr} from '../rule_engine/dynamic_cstr';

import * as BrowserUtil from './browser_util';



/**
 * Initializes the basic Speech engine and contains some global context.
 *
 */
export class Engine {
  /**
   * Defines the basic personality Properties available.
   */
  static personalityProps = {
    PITCH: 'pitch',
    RATE: 'rate',
    VOLUME: 'volume',
    PAUSE: 'pause',
    JOIN: 'join'
  };


  /**
   * Defines to what level the engine enriches expressions with speech string
   * attributes.
   */
  static Speech = {NONE: 'none', SHALLOW: 'shallow', DEEP: 'deep'};


  /**
   * Different markup formats for the speech output.
   * Not all are supported yet.
   */
  static Markup = {
    NONE: 'none',
    PUNCTUATION: 'punctuation',
    SSML: 'ssml',
    SSML_STEP: 'ssml_step',
    ACSS: 'acss',
    SABLE: 'sable',
    VOICEXML: 'voicexml'
  };


  /**
   * Binary feature vector.
   */
  static BINARY_FEATURES: string[] = ['strict', 'structure', 'pprint'];


  /**
   * String feature vector.
   */
  static STRING_FEATURES: string[] = [
    'markup', 'style', 'domain', 'speech', 'walker', 'locale', 'modality',
    'rate', 'rules', 'prune'
  ];


  static DOMAIN_TO_STYLES:
      {[key: any]: string} = {'mathspeak': 'default', 'clearspeak': 'default'};

  evaluator: (p1: string, p2: DynamicCstr) => string | null;

  defaultParser: DynamicCstrExports.Parser;
  parser: any;
  parsers = {};

  dynamicCstr: DynamicCstr;

  comparator: DynamicCstrExports.Comparator = null;

  /**
   * Maps domains to comparators.
   */
  comparators: {[key: string]: () => DynamicCstrExports.Comparator} = {};

  /**
   * Current domain.
   */
  domain: string = 'mathspeak';

  style: string;

  locale: string;

  modality: string;

  /**
   * Current walker mode.
   */
  walker: string = 'Table';

  mode: Mode;

  speech: Engine.Speech;

  /**
   * Indicates if skeleton structure attributes are added to enriched elements
   */
  structure: boolean = false;

  /**
   * List of rule sets given as the constructor functions.
   */
  ruleSets: string[] = [];

  markup: Engine.Markup;

  /**
   * Strict interpretations of rules and constraints.
   */
  strict: boolean = false;

  /**
   * Current browser is MS Internet Explorer but not Edge.
   */
  isIE: boolean = false;

  /**
   * Current browser is MS Edge.
   */
  isEdge: boolean = false;

  /**
   * Percentage of default rate used by external TTS. This can be used to scale
   * pauses.
   */
  rate: string = '100';

  pprint: boolean = false;

  /**
   * List of predicates for checking if the engine is set up.
   */
  private setupTests_: (() => boolean)[] = [];

  /**
   * True if configuration block has been applied in HTTP mode.
   */
  config: boolean = false;

  rules: string = '';

  /**
   * Constraints to prune given dot separated.
   */
  prune: string = '';
  constructor() {
    this.evaluator = Engine.defaultEvaluator;
    this.defaultParser =
        new DynamicCstrExports.Parser(DynamicCstr.DEFAULT_ORDER);
    this.parser = this.defaultParser;
    this.dynamicCstr = DynamicCstr.defaultCstr();
    /**
     * Current style.
     */
    this.style = DynamicCstr.DEFAULT_VALUES[DynamicCstrExports.Axis.STYLE];
    /**
     * Current locale.
     */
    this.locale = DynamicCstr.DEFAULT_VALUES[DynamicCstrExports.Axis.LOCALE];
    /**
     * Current modality.
     */
    this.modality =
        DynamicCstr.DEFAULT_VALUES[DynamicCstrExports.Axis.MODALITY];
    /**
     * The mode in which the engine is running (sync, async, http).
     */
    this.mode = Mode.SYNC;
    /**
     * The level to which speech attributes are added to enriched elements
     * (none, shallow, deep).
     */
    this.speech = Engine.Speech.NONE;
    /**
     * Caching during speech generation.
     */
    this.markup = Engine.Markup.NONE;
  }


  /**
   * Registers a predicate to test whether the setup of the engine is complete.
   * The basic idea is that different parts of the system that run
   * asynchronously can register a test here and the engine can check if it is
   * set up without the need to know which bits actually run asynchronously.
   * @param pred A predicate that takes no input and returns
   *     a boolean value.
   */
  static registerTest(pred: () => boolean) {
    Engine.getInstance().setupTests_.push(pred);
  }


  /**
   * Test to see if the engine is fully setup. Important for async and http
   * mode.
   * @return True if the engine has completed its setup.
   */
  static isReady(): boolean {
    return Engine.getInstance().setupTests_.every(function(pred) {
      return pred();
    });
  }


  /**
   * Sets up browser specific functionality.
   */
  setupBrowsers() {
    this.isIE = BrowserUtil.detectIE();
    this.isEdge = BrowserUtil.detectEdge();
  }


  /**
   * @return The sets of values
   *     for all constraint attributes.
   */
  getAxisValues(): {[key: DynamicCstrExports.Axis]: string[]} {
    return DynamicCstr.getAxisValues();
  }


  /**
   * A dummy string evaluator.
   * @param str A string.
   * @param cstr A dynamic constraint.
   * @return The evaluated string.
   */
  static defaultEvaluator(str: string, cstr: DynamicCstr): string {
    return str;
  }


  // TODO: This might need a better place.
  /**
   * @return The current base rate.
   */
  getRate(): number {
    let numeric = parseInt(this.rate, 10);
    return isNaN(numeric) ? 100 : numeric;
  }


  /**
   * Sets the dynamic constraint for the engine.
   * @param opt_dynamic An optional
   *    constraint mapping. If given it is parsed into the engines constraint
   *    parameters.
   */
  setDynamicCstr(opt_dynamic?: DynamicCstrExports.Map) {
    if (opt_dynamic) {
      let keys = Object.keys(opt_dynamic);
      for (let i = 0; i < keys.length; i++) {
        let feature = (keys[i] as DynamicCstrExports.Axis);
        // Checks that we only have correct components.
        if (DynamicCstr.DEFAULT_ORDER.indexOf(feature) !== -1) {
          let value = opt_dynamic[feature];
          this[feature] = value;
        }
      }
    }
    Engine.DOMAIN_TO_STYLES[this.domain] = this.style;
    let dynamic =
        [this.locale, this.modality, this.domain, this.style].join('.');
    let fallback = sre.DynamicProperties.create(
        [DynamicCstr.DEFAULT_VALUES[DynamicCstrExports.Axis.LOCALE]],
        [DynamicCstr.DEFAULT_VALUES[DynamicCstrExports.Axis.MODALITY]],
        [DynamicCstr.DEFAULT_VALUES[DynamicCstrExports.Axis.DOMAIN]],
        [DynamicCstr.DEFAULT_VALUES[DynamicCstrExports.Axis.STYLE]]);
    let comparator = this.comparators[this.domain];
    let parser = this.parsers[this.domain];
    this.parser = parser ? parser : this.defaultParser;
    this.dynamicCstr = this.parser.parse(dynamic);
    this.dynamicCstr.updateProperties(fallback.getProperties());
    this.comparator = comparator ?
        comparator() :
        new DynamicCstr.DefaultComparator(this.dynamicCstr);
  }
}

goog.addSingletonGetter(Engine);


/**
 * Defines the modes in which the engine can run.
 */
export enum Mode {
  SYNC = 'sync',
  ASYNC = 'async',
  HTTP = 'http'
}



/**
 * The base error class for signaling SRE errors.
 * @param msg The error message.
 */
export class Error extends Error {
  message: any;
  name = 'SRE Error';
  constructor(msg: string) {
    super();
    this.message = msg || '';
  }
}

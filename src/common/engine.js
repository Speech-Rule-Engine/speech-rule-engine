// Copyright 2014 Volker Sorge
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
goog.provide('sre.Engine');
goog.provide('sre.Engine.Error');
goog.provide('sre.Engine.Mode');

goog.require('sre.BrowserUtil');
goog.require('sre.DynamicCstr');



/**
 * Initializes the basic Speech engine and contains some global context.
 *
 * @constructor
 */
sre.Engine = function() {
  /**
   * The actual node that is currently being translated.
   * @type {Node}
   */
  this.activeHost = null;

  /**
   * When traversing some nodes one occassionally wants to store and work with
   * an alternative representation.
   * @type {Node}
   */
  this.alternativeHost = null;

  /**
   * @type {function(string, !sre.DynamicCstr): string}
   */
  this.evaluator = sre.Engine.defaultEvaluator;

  /**
   * @type {!sre.DynamicCstr.Parser}
   */
  this.defaultParser = new sre.DynamicCstr.Parser(sre.DynamicCstr.DEFAULT_ORDER);
  this.parser = this.defaultParser;
  this.parsers = {};

  /**
   * @type {!sre.DynamicCstr}
   */
  this.dynamicCstr = sre.DynamicCstr.defaultCstr();

  /**
   * @type {sre.DynamicCstr.Comparator}
   */
  this.comparator = null;

  /**
   * Maps domains to comparators.
   * @type {Object.<string, function():sre.DynamicCstr.Comparator>}
   */
  this.comparators = {};

  /**
   * Current domain.
   * @type {string}
   */
  this.domain = sre.DynamicCstr.DEFAULT_VALUES[sre.DynamicCstr.Axis.DOMAIN];

  /**
   * Current style.
   * @type {string}
   */
  this.style = 'short';

  /**
   * Current locale.
   * @type {string}
   */
  this.locale = sre.DynamicCstr.DEFAULT_VALUES[sre.DynamicCstr.Axis.LOCALE];

  /**
   * Current modality.
   * @type {string}
   */
  this.modality = sre.DynamicCstr.DEFAULT_VALUES[sre.DynamicCstr.Axis.MODALITY];

  /**
   * Current walker mode.
   * @type {string}
   */
  this.walker = 'Table';

  /**
   * Semantics flag.
   * @type {boolean}
   */
  this.semantics = true;

  /**
   * The mode in which the engine is running (sync, async, http).
   * @type {sre.Engine.Mode}
   */
  this.mode = sre.Engine.Mode.SYNC;

  /**
   * The level to which speech attributes are added to enriched elements (none,
   * shallow, deep).
   * @type {sre.Engine.Speech}
   */
  this.speech = sre.Engine.Speech.NONE;

  /**
   * Indicates if skeleton structure attributes are added to enriched elements
   * @type {boolean}
   */
  this.structure = false;

  /**
   * List of rule sets given as the constructor functions.
   * @type {!Array.<string>}
   */
  this.ruleSets = [];

  /**
   * Caching during speech generation.
   * @type {boolean}
   */
  this.cache = true;

  /**
   * Caching during speech generation.
   * @type {sre.Engine.Markup}
   */
  this.markup = sre.Engine.Markup.NONE;

  /**
   * Strict interpretations of rules and constraints.
   * @type {boolean}
   */
  this.strict = false;

  /**
   * Current browser is MS Internet Explorer but not Edge.
   * @type {boolean}
   */
  this.isIE = false;

  /**
   * Current browser is MS Edge.
   * @type {boolean}
   */
  this.isEdge = false;

  /**
   * Percentage of default rate used by external TTS. This can be used to scale
   * pauses.
   * @type {string}
   */
  this.rate = '100';

  /**
   * @type {boolean}
   */
  this.pprint = false;

  /**
   * List of predicates for checking if the engine is set up.
   * @type {!Array.<function():boolean>}
   * @private
   */
  this.setupTests_ = [];
};
goog.addSingletonGetter(sre.Engine);


/**
 * Defines the basic personality Properties available.
 * @enum {string}
 */
sre.Engine.personalityProps = {
  PITCH: 'pitch',
  RATE: 'rate',
  VOLUME: 'volume',
  PAUSE: 'pause',
  JOIN: 'join'
};


/**
 * Defines the modes in which the engine can run.
 * @enum {string}
 */
sre.Engine.Mode = {
  SYNC: 'sync',
  ASYNC: 'async',
  HTTP: 'http'
};


/**
 * Defines to what level the engine enriches expressions with speech string
 * attributes.
 * @enum {string}
 */
sre.Engine.Speech = {
  NONE: 'none',
  SHALLOW: 'shallow',
  DEEP: 'deep'
};


/**
 * Different markup formats for the speech output.
 * Not all are supported yet.
 * @enum {string}
 */
sre.Engine.Markup = {
  NONE: 'none',
  PUNCTUATION: 'punctuation',
  SSML: 'ssml',
  SSML_STEP: 'ssml_step',
  ACSS: 'acss',
  SABLE: 'sable',
  VOICEXML: 'voicexml'
};


/**
 * Registers a predicate to test whether the setup of the engine is complete.
 * The basic idea is that different parts of the system that run asynchronously
 * can register a test here and the engine can check if it is set up without the
 * need to know which bits actually run asynchronously.
 * @param {function():boolean} pred A predicate that takes no input and returns
 *     a boolean value.
 */
sre.Engine.registerTest = function(pred) {
  sre.Engine.getInstance().setupTests_.push(pred);
};


/**
 * Test to see if the engine is fully setup. Important for async and http mode.
 * @return {boolean} True if the engine has completed its setup.
 */
sre.Engine.isReady = function() {
  return sre.Engine.getInstance().setupTests_.every(
      function(pred) { return pred(); }
  );
};


/**
 * Sets up browser specific functionality.
 */
sre.Engine.prototype.setupBrowsers = function() {
  this.isIE = sre.BrowserUtil.detectIE();
  this.isEdge = sre.BrowserUtil.detectEdge();
};


/**
 * @return {!Object.<sre.DynamicCstr.Axis, !Array.<string>>} The sets of values
 *     for all constraint attributes.
 */
sre.Engine.prototype.getAxisValues = function() {
  return sre.DynamicCstr.getAxisValues();
};


/**
 * A dummy string evaluator.
 * @param {string} str A string.
 * @param {sre.DynamicCstr} cstr A dynamic constraint.
 * @return {string} The evaluated string.
 */
sre.Engine.defaultEvaluator = function(str, cstr) {
  return str;
};


// TODO: This might need a better place.
/**
 * @return {number} The current base rate.
 */
sre.Engine.prototype.getRate = function() {
  var numeric = parseInt(this.rate, 10);
  return isNaN(numeric) ? 100 : numeric;
};



/**
 * The base error class for signaling SRE errors.
 * @param {string} msg The error message.
 * @constructor
 * @extends {Error}
 */
sre.Engine.Error = function(msg) {
  sre.Engine.Error.base(this, 'constructor');
  this.message = msg || '';
  this.name = 'SRE Error';
};
goog.inherits(sre.Engine.Error, Error);


sre.Engine.BINARY_FEATURES = [
  'strict', 'cache', 'semantics', 'structure', 'pprint'
];


sre.Engine.STRING_FEATURES = [
  'markup', 'style', 'domain', 'speech', 'walker',
  'locale', 'modality', 'rate'
];


/**
 * Sets the dynamic constraint for the engine.
 * @param {sre.DynamicCstr.Map=} opt_dynamic An optional
 *    constraint mapping. If given it is parsed into the engines constraint
 *    parameters.
 */
sre.Engine.prototype.setDynamicCstr = function(opt_dynamic) {
  if (opt_dynamic) {
    var keys = Object.keys(opt_dynamic);
    for (var i = 0; i < keys.length; i++) {
      var feature = /** @type{sre.DynamicCstr.Axis} */(keys[i]);
      // Checks that we only have correct components.
      if (sre.DynamicCstr.DEFAULT_ORDER.indexOf(feature) !== -1) {
        var value = opt_dynamic[feature];
        this[feature] = value;
      }
    }
  }
  sre.Engine.DOMAIN_TO_STYLES[this.domain] = this.style;
  var dynamic = [this.locale, this.modality, this.domain, this.style].join('.');
  var fallback = sre.DynamicProperties.create(
      [sre.DynamicCstr.DEFAULT_VALUES[sre.DynamicCstr.Axis.LOCALE]],
      [sre.DynamicCstr.DEFAULT_VALUES[sre.DynamicCstr.Axis.MODALITY]],
      [sre.DynamicCstr.DEFAULT_VALUES[sre.DynamicCstr.Axis.DOMAIN]],
      ['short', sre.DynamicCstr.DEFAULT_VALUES[sre.DynamicCstr.Axis.STYLE]]);
  var comparator = this.comparators[this.domain];
  var parser = this.parsers[this.domain];
  this.parser = parser ? parser : this.defaultParser;
  this.dynamicCstr = this.parser.parse(dynamic);
  this.dynamicCstr.updateProperties(fallback.getProperties());
  this.comparator = comparator ? comparator() :
      new sre.DynamicCstr.DefaultComparator(this.dynamicCstr);
};


sre.Engine.DOMAIN_TO_STYLES = {
  'mathspeak': 'default',
  'clearspeak': 'default'
};


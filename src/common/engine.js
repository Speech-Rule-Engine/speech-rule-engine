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
 * @fileoverview Basic functionality for the Speech Rule Engine
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */
goog.provide('sre.Engine');
goog.provide('sre.Engine.Mode');



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

  // TODO (sorge) Refactor into a common dynamic constraints object.
  /**
   * List of domain names.
   * @type {Array.<string>}
   */
  this.allDomains = [];

  /**
   * List of style names.
   * @type {Array.<string>}
   */
  this.allStyles = [];

  /**
   * Current domain.
   * @type {string}
   */
  this.domain = 'default';

  /**
   * Current style.
   * @type {string}
   */
  this.style = 'short';

  /**
   * Semantics flag.
   * @type {boolean}
   */
  this.semantics = false;

   //TODO: Put this into an enum.
  /**
   * The mode in which the engine is running (sync, async, http).
   * @type {sre.Engine.Mode}
   */
  this.mode = sre.Engine.Mode.SYNC;

  /**
   * Flag indicating whether or not speech should be added to enriched MathML.
   * @type {boolean}
   */
  this.mathmlSpeech = true;

  /**
   * List of predicates for checking if the engine is set up.
   * @type {!Array.<function():boolean>}
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
  PAUSE: 'pause'
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

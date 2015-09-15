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
   * @type {string}
   */
  this.mode = 'sync';
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

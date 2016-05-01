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
 * @fileoverview Combination of speech rule stores.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.CombinedStore');

goog.require('sre.AbstractionRules');
goog.require('sre.ClearspeakRules');
goog.require('sre.Engine');
goog.require('sre.MathMap');
goog.require('sre.MathStore');
goog.require('sre.MathmlStore');
goog.require('sre.MathmlStoreRules');
goog.require('sre.MathspeakRules');
goog.require('sre.PrefixRules');
goog.require('sre.SemanticTreeRules');



/**
 * Rule initialization.
 * @constructor
 */
sre.CombinedStore = function() {

  /**
   * @type {sre.MathStore}
   */
  this.store = new sre.MathStore();
  
  /**
   * @type {Array.<function()>}
   */
  this.initializer = [
    sre.MathmlStoreRules, sre.SemanticTreeRules,
    sre.MathspeakRules, sre.ClearspeakRules,
    sre.AbstractionRules, sre.PrefixRules
  ];
};
goog.addSingletonGetter(sre.CombinedStore);


/**
 * Initializes the combined rule store
 */
sre.CombinedStore.prototype.initialize = function() {
  var timeIn = (new Date()).getTime();
  this.store = new sre.MathStore();
  var combined = this.store;
  for (var i = 0, func; func = this.initializer[i]; i++) {
    var store = func.getInstance();
    store.initialize();
    combined.setSpeechRules(
      combined.getSpeechRules().concat(store.getSpeechRules()));
    combined.contextFunctions.addStore(store.contextFunctions);
    combined.customQueries.addStore(store.customQueries);
    combined.customStrings.addStore(store.customStrings);
  }
  this.updateEngine();
  var timeOut = (new Date()).getTime();
  console.log('Time: ' + (timeOut - timeIn));
};


/**
 * Updates adminstrative info in the base Engine.
 */
sre.CombinedStore.prototype.updateEngine = function() {
  var maps = sre.MathMap.getInstance();
  if (!sre.Engine.isReady()) {
    setTimeout(goog.bind(this.updateEngine, this), 500);
    return;
  }
  var engine = sre.Engine.getInstance();
  var dynamicCstr = this.store.getDynamicConstraintValues();
  engine.allDomains = sre.BaseUtil.union(dynamicCstr.domain, maps.allDomains);
  engine.allStyles = sre.BaseUtil.union(dynamicCstr.style, maps.allStyles);
};



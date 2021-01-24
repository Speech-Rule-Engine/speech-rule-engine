// Copyright 2021 Volker Sorge
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
 * @fileoverview Storage facility for context functions.
 * @author v.sorge@mathjax.org (Volker Sorge)
 */


goog.provide('sre.SpeechRules');



/**
 * @constructor
 */
sre.SpeechRules = function() {
  this.store = {};
};
goog.addSingletonGetter(sre.SpeechRules);

sre.SpeechRules.prototype.addStore = function(constr, inherit, store) {
  var values = {};
  if (inherit) {
    var inherits = this.store[inherit] || {};
    Object.assign(values, inherits);
  }
  this.store[constr] = Object.assign(values, store);
};


// Make this robust with dynamic constraints and defaults.
sre.SpeechRules.prototype.getStore = function(locale, modality, domain) {
  return this.store[[locale, modality, domain].join('.')] || {};
};

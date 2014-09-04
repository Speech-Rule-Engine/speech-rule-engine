// Copyright 2013 Google Inc.
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
 * @fileoverview Speech rule store for mathml and mathjax trees.
 * @author sorge@google.com (Volker Sorge)
 */

goog.provide('sre.MathmlStore');

goog.require('sre.MathStore');



/**
 * Rule initialization.
 * @constructor
 * @extends {sre.MathStore}
 */
sre.MathmlStore = function() {
  goog.base(this);
};
goog.inherits(sre.MathmlStore, sre.MathStore);
goog.addSingletonGetter(sre.MathmlStore);


/**
 * Adds a new MathML speech rule.
 * @param {string} name Rule name which corresponds to the MathML tag name.
 * @param {string} domain Domain annotation of the rule.
 * @param {string} rule String version of the speech rule.
 */
sre.MathmlStore.prototype.defineMathmlRule = function(name, domain, rule) {
  this.defineRule(name, domain, rule, 'self::mathml:' + name);
};


/**
 * Adds a new MathML speech rule for the default.default domain.
 * @param {string} name Rule name which corresponds to the MathML tag name.
 * @param {string} rule String version of the speech rule.
 */
sre.MathmlStore.prototype.defineDefaultMathmlRule = function(name,  rule) {
  this.defineRule(name, 'default.default', rule, 'self::mathml:' + name);
};

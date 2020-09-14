// Copyright 2019 Volker Sorge
// Copyright (c) 2019 The MathJax Consortium
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
 * @fileoverview Abstract class for clearspeak rule tests.
 * @author Volker.Sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.ClearspeakRuleTest');

goog.require('sre.AbstractRuleTest');



/**
 * @constructor
 * @extends {sre.AbstractRuleTest}
 */
sre.ClearspeakRuleTest = function() {
  sre.ClearspeakRuleTest.base(this, 'constructor');

  /**
   * @override
   */
  this.domain = 'clearspeak';

};
goog.inherits(sre.ClearspeakRuleTest, sre.AbstractRuleTest);


/**
 * @override
 */
sre.ClearspeakRuleTest.prototype.setUpTest = function() {
  sre.System.getInstance().setupEngine(
      {markup: sre.Engine.Markup.PUNCTUATION});
};


/**
 * @override
 */
sre.ClearspeakRuleTest.prototype.tearDownTest = function() {
  sre.System.getInstance().setupEngine(
      {markup: sre.Engine.Markup.NONE});
  sre.ClearspeakRuleTest.base(this, 'tearDownTest');
};


sre.ClearspeakRuleTest.prototype.prepare = function() {
  sre.ClearspeakRuleTest.base(this, 'prepare');
  this.modality = this.jsonTests.modality || this.modality;
  this.locale = this.jsonTests.locale || this.locale;
  this.domain = this.jsonTests.domain || this.domain;
  this.style = this.jsonTests.style || this.style;
  this.actual = this.jsonTests.actual || this.actual;
  this.compare = this.jsonTests.compare || this.compare;
  this.information = this.jsonTests.information;
  var results = [];
  var tests = this.jsonTests.tests || {};
  for (var key of Object.keys(tests)) {
    if (key.match(/^_/)) continue;
    var json = tests[key];
    if (!json.test) continue;
    json.name = key;
    results.push(json);
  }
  this.jsonTests = results;
};


sre.ClearspeakRuleTest.prototype.pick = function(json) {
  return [json['mathml'], json['speech'], json['preference']];
};

sre.ClearspeakRuleTest.prototype.method = function(var_args) {
  let args = Array.prototype.slice.call(arguments, 0);
  this.executeRuleTest(args[0], args[1], args[2]);
};

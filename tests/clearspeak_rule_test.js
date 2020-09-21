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


sre.ClearspeakRuleTest.locales = {
  'en': 'ClearspeakEnglish',
  'de': 'ClearspeakGerman',
  'fr': 'ClearspeakFrench'
};


sre.ClearspeakRuleTest.tests = function() {
  let files = [
    'clearspeak_absolute_value.json',
    'clearspeak_capital_letters.json',
    'clearspeak_exponents.json',
    'clearspeak_fractions.json',
    'clearspeak_functions.json',
    'clearspeak_implied_times.json',
    'clearspeak_issues.json',
    'clearspeak_logarithms.json',
    'clearspeak_matrices_vectors_and_combinatorics.json',
    'clearspeak_multi_line_entries.json',
    'clearspeak_named_sets.json',
    'clearspeak_parentheses.json',
    'clearspeak_part2_symbols.json',
    'clearspeak_part3_adornments.json',
    'clearspeak_roots.json',
    'clearspeak_sets_enclosed_in_set_brackets.json',
    'clearspeak_trigometry.json'
  ];
  var tests = [];
  for (var locale of Object.keys(sre.ClearspeakRuleTest.locales)) {
    for (var file of files) {
      var test = new sre.ClearspeakRuleTest();
      test.jsonFile = locale + '/clearspeak/' + file;
      test.locale = locale;
      test.compare = locale === 'de';  // tmp!
      test.setActive(sre.ClearspeakRuleTest.locales[locale]);
      test.startExamples();
      tests.push(test);
    }
  }
  return tests;
};

// Copyright 2019 Volker Sorge
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
 * @fileoverview Abstract class for test cases of single characters.
 * @author Volker.Sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.AbstractCharacterTest');

goog.require('sre.AbstractRuleTest');



/**
 * @constructor
 * @extends {sre.AbstractRuleTest}
 */
sre.AbstractCharacterTest = function() {
  sre.AbstractCharacterTest.base(this, 'constructor');

  /**
   * @type {Array.<string>}
   */
  this.styles = [];

  /**
   * @type {string}
   */
  this.type = 'character';

  this.pickFields = ['name', 'expected'];

};
goog.inherits(sre.AbstractCharacterTest, sre.AbstractRuleTest);


/**
 * Tests speech translation for single characters.
 * @param {string} char The Unicode character.
 * @param {Array.<string>} answers List of expected speech translations for each
 *     available style.
 */
sre.AbstractCharacterTest.prototype.executeCharTest = function(char, answers) {
  for (var i = 0; i < answers.length; i++) {
    try {
      this.executeRuleTest(char, answers[i], this.styles[i]);
    } catch (err) {
      console.info('\nFailed Character: ' + char + ' (' +
                   this.domain + '.' + this.styles[i] + ')');
      throw (err);
    }
  }
};


/**
 * Execute test for a single unit string.
 * @param {string} char The character or string representing the unit.
 * @param {Array.<string>} answers A list of answers.
 */
sre.AbstractCharacterTest.prototype.executeUnitTest = function(char, answers) {
  sre.Grammar.getInstance().pushState({annotation: 'unit'});
  try {
    this.executeCharTest(char, answers);
  } catch (err) {
    throw (err);
  } finally {
    sre.Grammar.getInstance().popState();
  }
};


/**
 * @override
 */
sre.AbstractCharacterTest.prototype.executeRuleTest = function(text, answer, opt_style) {
  var style = opt_style || this.style;
  sre.SpeechRuleEngine.getInstance().clearCache();
  sre.System.getInstance().setupEngine(
      {domain: this.domain, style: style,
        modality: this.modality, rules: this.rules, locale: this.locale});
  var actual = this.getSpeech(text);
  var expected = this.actual ? actual : answer;
  this.appendRuleExample(text, expected, style);
  this.assert.equal(actual, expected);
};


/**
 * @override
 */
sre.AbstractCharacterTest.prototype.getSpeech = function(text) {
  var aural = sre.AuralRendering.getInstance();
  var descrs = [
    sre.AuditoryDescription.create({text: text}, {adjust: true, translate: true})];
  return aural.finalize(aural.markup(descrs));
};


/**
 * @override
 */
sre.AbstractCharacterTest.prototype.prepare = function() {
  try {
    sre.AbstractCharacterTest.base(this, 'prepare');
  } catch (e) {
    throw e;
  } finally {
    this.styles = this.jsonTests.styles || [];
    this.type = this.baseTests.type || 'character';
  }
};


/**
 * @override
 */
sre.AbstractCharacterTest.prototype.method = function(var_args) {
  let args = Array.prototype.slice.call(arguments, 0);
  this.type === 'unit' ? this.executeUnitTest(args[0], args[1]) :
    this.executeCharTest(args[0], args[1]);
};


/**
 * Output all the character speech strings.
 * (Temporary Auxiliary Method.)
 */
sre.AbstractCharacterTest.testOutput = function() {

  var constraints = {
    en: {
      default: ['default'],
      mathspeak: ['default', 'brief', 'sbrief'],
      clearspeak: ['default']
    },
    es: {
      default: ['default'],
      mathspeak: ['default', 'brief', 'sbrief']
    },
    fr: {
      default: ['default'],
      mathspeak: ['default', 'brief', 'sbrief'],
      clearspeak: ['default']
    },
    nemeth: {
      default: ['default']
    }
  };
  var stores = sre.MathMap.getInstance().store['subStores_'];
  var allRules = {};
  sre.Variables.LOCALES.forEach(function(loc) {
    allRules[loc] = [];
  });
  var keys = Object.keys(stores);
  for (var loc of Object.keys(constraints)) {
    var modality = loc === 'nemeth' ? 'braille' : 'speech';
    for (var dom of Object.keys(constraints[loc])) {
      for (var key of keys) {
        var aural = sre.AuralRendering.getInstance();
        var result = [loc, modality, dom, key];
        for (var style of constraints[loc][dom]) {
          sre.System.getInstance().setupEngine({
            domain: dom, modality: modality, locale: loc, style: style});
          var comps = key.split(':');
          var grammar = {translate: true};
          if (comps[1] && comps[1] === 'unit') {
            grammar.annotation = 'unit';
          }
          sre.Grammar.getInstance().pushState(grammar);
          var descrs = [
            sre.AuditoryDescription.create({text: comps[0]}, {adjust: true})];
          result.push(aural.finalize(aural.markup(descrs)));
          allRules[loc].push(result);
          sre.Grammar.getInstance().popState();
        }
        console.log(`${result[0]}, ${result[2]}, "${result.slice(3).join('", "')}"`);
      }
    }
  }
};


sre.AbstractCharacterTest.tests = function() {
  let files = [
    'default_characters.json',
    'default_functions.json',
    'default_units.json',
    'mathspeak_characters.json',
    'mathspeak_functions.json',
    'mathspeak_units.json',
    'clearspeak_characters.json',
    'clearspeak_functions.json',
    'clearspeak_units.json'
  ];
  for (var locale of sre.Variables.LOCALES) {
    for (var file of files) {
      var test = new sre.AbstractCharacterTest();
      test.jsonFile = locale + '/chars/' + file;
      test.locale = locale;
      sre.TestRegister.add(test);
    }
  }
};

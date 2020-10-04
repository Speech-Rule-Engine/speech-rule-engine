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

goog.provide('sretest.SymbolTest');

goog.require('sretest.SpeechTest');



/**
 * @constructor
 * @extends {sretest.SpeechTest}
 */
sretest.SymbolTest = function() {
  sretest.SymbolTest.base(this, 'constructor');

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
goog.inherits(sretest.SymbolTest, sretest.SpeechTest);


/**
 * Tests speech translation for single characters.
 * @param {string} char The Unicode character.
 * @param {Array.<string>} answers List of expected speech translations for each
 *     available style.
 */
sretest.SymbolTest.prototype.executeCharTest = function(char, answers) {
  for (var i = 0; i < answers.length; i++) {
    try {
      this.executeTest(char, answers[i], this.styles[i]);
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
sretest.SymbolTest.prototype.executeUnitTest = function(char, answers) {
  sretest.TestExternal.sre.Grammar.getInstance().pushState({annotation: 'unit'});
  try {
    this.executeCharTest(char, answers);
  } catch (err) {
    throw (err);
  } finally {
    sretest.TestExternal.sre.Grammar.getInstance().popState();
  }
};


/**
 * @override
 */
sretest.SymbolTest.prototype.executeTest = function(text, answer, opt_style) {
  var style = opt_style || this.style;
  sretest.TestExternal.sre.SpeechRuleEngine.getInstance().clearCache();
  sretest.TestExternal.sre.System.getInstance().setupEngine(
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
sretest.SymbolTest.prototype.getSpeech = function(text) {
  var aural = sretest.TestExternal.sre.AuralRendering.getInstance();
  var descrs = [sretest.TestExternal.sre.AuditoryDescription.create(
      {text: text}, {adjust: true, translate: true})];
  return aural.finalize(aural.markup(descrs));
};


/**
 * @override
 */
sretest.SymbolTest.prototype.prepare = function() {
  try {
    sretest.SymbolTest.base(this, 'prepare');
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
sretest.SymbolTest.prototype.method = function(var_args) {
  let args = Array.prototype.slice.call(arguments, 0);
  this.type === 'unit' ? this.executeUnitTest(args[0], args[1]) :
      this.executeCharTest(args[0], args[1]);
};

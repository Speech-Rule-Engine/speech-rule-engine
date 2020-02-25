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
      console.log('\nFailed Character: ' + char + ' (' +
                  this.domain + '.' + this.styles[i] + ')');
      console.log(err);
      // throw(err);
    }
  }
};


sre.AbstractCharacterTest.prototype.executeUnitTest = function(char, answers) {
  sre.Grammar.getInstance().pushState({annotation: 'unit'});
  try {
    this.executeCharTest(char, answers);
  } catch (err) {
    throw(err);
  } finally {
    sre.Grammar.getInstance().popState();
  }
};


/**
 * @override
 */
sre.AbstractCharacterTest.prototype.executeRuleTest = function(text, answer, opt_style) {
  var style = opt_style || this.style;
  sre.Grammar.getInstance().pushState({translate: true});
  sre.SpeechRuleEngine.getInstance().clearCache();
  sre.System.getInstance().setupEngine(
      {semantics: this.semantics, domain: this.domain, style: style,
       modality: this.modality, rules: this.rules, locale: this.locale});
  var aural = sre.AuralRendering.getInstance();
  var descrs = [
    sre.AuditoryDescription.create({text: text}, {adjust: true})];
  var result = aural.finalize(aural.markup(descrs));
  var actual = this.actual ? result : answer;
  this.appendRuleExample(text, actual, style);
  try {
    this.assert.equal(actual, result);
  } catch (err) {
    throw(err);
  } finally {
    sre.Grammar.getInstance().popState();
  }
};


/**
 * Output all the character speech strings.
 * (Temporary Auxiliary Method.)
 */
sre.AbstractCharacterTest.testOutput = function() {
  
  var constraints = {
    en: {
      default: ['default', 'short', 'alternative'],
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
    }// ,
    // nemeth: {
    //   default: ['default']
    // }
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



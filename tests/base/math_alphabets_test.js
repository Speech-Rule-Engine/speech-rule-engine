// Copyright 2018 Volker Sorge
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
 * @fileoverview Testcases for math alphabets, i.e., characters in the second
 *     unicode plane as well as characters traditionally in the first plane.
 *
 * @author Volker.Sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.MathAlphabetsTest');

goog.require('sre.AbstractRuleTest');



/**
 * @constructor
 * @extends {sre.AbstractRuleTest}
 */
sre.MathAlphabetsTest = function() {
  sre.MathAlphabetsTest.base(this, 'constructor');

  /**
   * @override
   */
  this.information = 'Math Alphabets tests.';

  /**
   * @override
   */
  this.domain = 'default';

  this.setActive('MathAlphabets');
};
goog.inherits(sre.MathAlphabetsTest, sre.AbstractRuleTest);


/**
 * @param {string} char A single character.
 * @return {string} The character wrapped in an mi and math tag.
 */
sre.MathAlphabetsTest.makeIdentifier = function(char) {
  return '<math><mi>' + char + '</mi></math>';
};


/**
 * Runs single character tests.
 * @param {!Object.<string>} chars Maps characters to speech output.
 */
sre.MathAlphabetsTest.prototype.runCharacterTests = function(chars) {
  for (var char in chars) {
    this.executeRuleTest(sre.MathAlphabetsTest.makeIdentifier(char),
                         chars[char], 'default');
  }
};


/**
 * Testing lower plane latin characters.
 */
sre.MathAlphabetsTest.prototype.testLowerPlaneLatin = function() {
  this.runCharacterTests({
    'ℂ': 'double struck cap C',
    'ℊ': 'script g',
    'ℋ': 'script cap H',
    'ℌ': 'fraktur cap H',
    'ℍ': 'double struck cap H',
    'ℎ': 'h',
    'ℐ': 'script cap I',
    'ℑ': 'fraktur cap I',
    'ℒ': 'script cap L',
    'ℕ': 'double struck cap N',
    'ℙ': 'double struck cap P',
    'ℚ': 'double struck cap Q',
    'ℛ': 'script cap R',
    'ℜ': 'fraktur cap R',
    'ℝ': 'double struck cap R',
    'ℤ': 'double struck cap Z',
    'ℨ': 'fraktur cap Z',
    'ℬ': 'script cap B',
    'ℭ': 'fraktur cap C',
    'ℯ': 'script e',
    'ℰ': 'script cap E',
    'ℱ': 'script cap F',
    'ℳ': 'script cap M',
    'ℴ': 'script o'
  });
};


/**
 * Testing other math alphabet characters.
 */
sre.MathAlphabetsTest.prototype.testOtherCharacters = function() {
  this.runCharacterTests({
    'ℓ': 'script l',
    '℘': 'script cap P',
    'ℼ': 'double struck pi',
    'ℽ': 'double struck gamma',
    'ℾ': 'double struck cap Gamma',
    'ℿ': 'double struck cap Pi',
    '⅀': 'double struck sum',
    'ⅅ': 'double struck italic cap D',
    'ⅆ': 'double struck italic d',
    'ⅇ': 'double struck italic e',
    'ⅈ': 'double struck italic i',
    'ⅉ': 'double struck italic j',
    '𝚤': 'italic dotless i',
    '𝚥': 'italic dotless j'
  });
};


/**
 * Testing upper plane latin alphabets.
 */
sre.MathAlphabetsTest.prototype.testUpperPlaneAlphabetsCaps = function() {
  this.runCharacterTests({
    '𝕬': 'bold fraktur cap A',
    '𝐀': 'bold cap A',
    '𝓐': 'bold script cap A',
    '𝔸': 'double struck cap A',
    '𝔄': 'fraktur cap A',
    '𝐴': 'italic cap A',
    '𝙰': 'monospace cap A',
    '𝗔': 'sans serif bold cap A',
    '𝘈': 'sans serif italic cap A',
    '𝖠': 'sans serif cap A',
    '𝒜': 'script cap A'
  });
};


/**
 * Testing upper plane latin alphabets.
 */
sre.MathAlphabetsTest.prototype.testUpperPlaneAlphabetsLower = function() {
  this.runCharacterTests({
    '𝖆': 'bold fraktur a',
    '𝐚': 'bold a',
    '𝓪': 'bold script a',
    '𝕒': 'double struck a',
    '𝔞': 'fraktur a',
    '𝑎': 'italic a',
    '𝚊': 'monospace a',
    '𝗮': 'sans serif bold a',
    '𝘢': 'sans serif italic a',
    '𝖺': 'sans serif a',
    '𝒶': 'script a'
  });
};


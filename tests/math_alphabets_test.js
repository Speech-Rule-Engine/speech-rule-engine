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
    'ℂ': 'double struck capital c',
    'ℊ': 'script small g',
    'ℋ': 'script capital h',
    'ℌ': 'fraktur capital h',
    'ℍ': 'double struck capital h',
    'ℎ': 'italic small h',
    'ℐ': 'script capital i',
    'ℑ': 'fraktur capital i',
    'ℒ': 'script capital l',
    'ℕ': 'double struck capital n',
    'ℙ': 'double struck capital p',
    'ℚ': 'double struck capital q',
    'ℛ': 'script capital r',
    'ℜ': 'fraktur capital r',
    'ℝ': 'double struck capital r',
    'ℤ': 'double struck capital z',
    'ℨ': 'fraktur capital z',
    'ℬ': 'script capital b',
    'ℭ': 'fraktur capital c',
    'ℯ': 'script small e',
    'ℰ': 'script capital e',
    'ℱ': 'script capital f',
    'ℳ': 'script capital m',
    'ℴ': 'script small o'
  });
};


/**
 * Testing other math alphabet characters.
 */
sre.MathAlphabetsTest.prototype.testOtherCharacters = function() {
  this.runCharacterTests({
    'ℓ': 'script small l',
    '℘': 'script capital p',
    'ℼ': 'double struck small pi',
    'ℽ': 'double struck small gamma',
    'ℾ': 'double struck capital gamma',
    'ℿ': 'double struck capital pi',
    '⅀': 'double struck n ary summation',
    'ⅅ': 'double struck italic capital d',
    'ⅆ': 'double struck italic small d',
    'ⅇ': 'double struck italic small e',
    'ⅈ': 'double struck italic small i',
    'ⅉ': 'double struck italic small j',
    '𝚤': 'italic small dotless i',
    '𝚥': 'italic small dotless j'
  });
};


/**
 * Testing upper plane latin alphabets.
 */
sre.MathAlphabetsTest.prototype.testUpperPlaneAlphabetsCaps = function() {
  this.runCharacterTests({
    '𝕬': 'bold fraktur capital a',
    '𝐀': 'bold capital a',
    '𝓐': 'bold script capital a',
    '𝔸': 'double struck capital a',
    '𝔄': 'fraktur capital a',
    '𝐴': 'italic capital a',
    '𝙰': 'monospace capital a',
    '𝗔': 'sans serif bold capital a',
    '𝘈': 'sans serif italic capital a',
    '𝖠': 'sans serif capital a',
    '𝒜': 'script capital a'
  });
};


/**
 * Testing upper plane latin alphabets.
 */
sre.MathAlphabetsTest.prototype.testUpperPlaneAlphabetsLower = function() {
  this.runCharacterTests({
    '𝖆': 'bold fraktur small a',
    '𝐚': 'bold small a',
    '𝓪': 'bold script small a',
    '𝕒': 'double struck small a',
    '𝔞': 'fraktur small a',
    '𝑎': 'italic small a',
    '𝚊': 'monospace small a',
    '𝗮': 'sans serif bold small a',
    '𝘢': 'sans serif italic small a',
    '𝖺': 'sans serif small a',
    '𝒶': 'script small a'
  });
};

